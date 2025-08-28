import prisma from "../services/prisma.service.js";
import { validate } from "../utils/validator.js";
import { excludeFields } from "../utils/helper.js";
import bcrypt from "bcryptjs";
import ValidationException from "../exceptions/validation.exception.js";

export async function index(req, res) {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = req.query.search || undefined;
  const trashed = req.query.trashed || undefined;

  const query = {
    select: {
      id: true,
      name: true,
      email: true,
      owner: true,
      photo: true,
      deletedAt: true,
    },
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  };

  const where = {
    accountId: req.user.accountId,
  };

  if (search) {
    where.OR = [
      { firstName: { contains: search, mode: "insensitive" } },
      { lastName: { contains: search, mode: "insensitive" } },
    ];
  }

  if (trashed === undefined) {
    where.deletedAt = null;
  } else if (trashed === "only") {
    where.deletedAt = { not: null };
  }

  if (Object.keys(where).length > 0) {
    query.where = where;
  }

  const [data, meta] = await prisma.user.paginate(query).withPages({
    limit,
    page,
    includePageCount: true,
  });

  res.inertia.render("users/index", {
    users: {
      data,
      meta,
    },
  });
}

export async function create(req, res) {
  res.inertia.render("users/create");
}

export async function store(req, res, next) {
  try {
    const { password, ...body } = validate(req.body, {
      firstName: "string|required",
      lastName: "string|required",
      email: "email|required",
      password: "string|required",
      owner: "boolean|required",
    });

    const hashPassword = await bcrypt.hash(password, 10);
    if (req.file) {
      Object.assign(body, { photo: `/uploads/${req.file.filename}` });
    }

    await prisma.user.create({
      data: {
        ...body,
        deletedAt: null,
        password: hashPassword,
        owner: !!+body.owner,
        account: {
          connect: {
            id: req.user.accountId,
          },
        },
      },
    });

    req.flash.set("success", "User created.");
    res.inertia.redirect("/users");
  } catch (error) {
    if (error.code == "P2002") {
      return next(
        new ValidationException("Validation Exception", {
          email: "The email has already been taken.",
        })
      );
    }
    next(error);
  }
}

export async function edit(req, res) {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: req.params.id,
    },
  });
  res.inertia.render("users/edit", { user: excludeFields(user, ["password"]) });
}

export async function update(req, res, next) {
  try {
    const { password, ...body } = validate(req.body, {
      firstName: "string|required",
      lastName: "string|required",
      email: "email|required",
      password: "string|required",
      owner: "boolean|required",
    });

    const hashPassword = await bcrypt.hash(password, 10);
    if (req.file) {
      Object.assign(body, { photo: `/uploads/${req.file.filename}` });
    }

    await prisma.user.update({
      where: {
        id: req.params.id,
      },
      data: {
        ...body,
        password: hashPassword,
        owner: !!+body.owner,
      },
    });

    req.flash.set("success", "User updated.");
    res.inertia.redirect("/users");
  } catch (error) {
    if (error.code == "P2002") {
      return next(
        new ValidationException("Validation Exception", {
          email: "The email has already been taken.",
        })
      );
    }
    next(error);
  }
}

export async function destroy(req, res, next) {
  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
  req.flash.set("success", "User deleted.");
  res.inertia.redirect("/users");
}

export async function restore(req, res, next) {
  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      deletedAt: null,
    },
  });
  req.flash.set("success", "User restored.");
  res.inertia.redirect("/users");
}
