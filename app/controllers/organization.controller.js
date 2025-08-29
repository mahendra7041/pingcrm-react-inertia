import { validate } from "../utils/validator.js";
import prisma from "../services/prisma.service.js";

export async function index(req, res, next) {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = req.query.search || undefined;
  const trashed = req.query.trashed || undefined;

  const query = {
    select: {
      id: true,
      name: true,
      phone: true,
      city: true,
      deletedAt: true,
    },
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  };

  const where = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { city: { contains: search, mode: "insensitive" } },
      { phone: { contains: search, mode: "insensitive" } },
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

  const [data, meta] = await prisma.organization.paginate(query).withPages({
    limit,
    page,
    includePageCount: true,
  });

  res.inertia.render("organizations/index", {
    organizations: {
      data,
      meta,
    },
  });
}

export async function create(req, res, next) {
  res.inertia.render("organizations/create");
}

export async function store(req, res, next) {
  const body = validate(req.body, {
    name: "string|required",
    email: "email|required",
    phone: "phone|required",
    address: "string|required",
    city: "string|required",
    region: "string|required",
    country: "string|required",
    postalCode: "string|required",
  });

  await prisma.organization.create({
    data: {
      ...body,
      deletedAt: null,
      account: {
        connect: {
          id: req.user.account.id,
        },
      },
    },
  });

  req.flash.set("success", "Organization created.");

  res.inertia.redirect("/organizations");
}

export async function edit(req, res, next) {
  const organization = await prisma.organization.findUniqueOrThrow({
    where: {
      id: req.params.id,
    },
    include: {
      contacts: true,
    },
  });
  res.inertia.render("organizations/edit", { organization });
}

export async function update(req, res, next) {
  const body = validate(req.body, {
    name: "string|required",
    email: "email|required",
    phone: "phone|required",
    address: "string|required",
    city: "string|required",
    region: "string|required",
    country: "string|required",
    postalCode: "string|required",
  });

  await prisma.organization.update({
    where: {
      id: req.params.id,
    },
    data: body,
  });

  req.flash.set("success", "Organization updated.");
  res.statusCode === 302;
  res.inertia.redirect("/organizations");
}

export async function destroy(req, res, next) {
  await prisma.organization.update({
    where: {
      id: req.params.id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
  req.flash.set("success", "Organization deleted.");
  res.inertia.redirect("/organizations");
}

export async function restore(req, res, next) {
  await prisma.organization.update({
    where: {
      id: req.params.id,
    },
    data: {
      deletedAt: null,
    },
  });
  req.flash.set("success", "Organization restored.");
  res.inertia.redirect("/organizations");
}
