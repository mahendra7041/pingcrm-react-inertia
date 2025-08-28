import { validate } from "../utils/validator.js";
import prisma from "../services/prisma.service.js";

export async function index(req, res) {
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
      organization: {
        select: {
          name: true,
        },
      },
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
      { firstName: { contains: search, mode: "insensitive" } },
      { lastName: { contains: search, mode: "insensitive" } },
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

  const [data, meta] = await prisma.contact.paginate(query).withPages({
    limit,
    page,
    includePageCount: true,
  });

  res.inertia.render("contacts/index", {
    contacts: {
      data,
      meta,
    },
  });
}

export async function create(req, res, next) {
  const organizations = await prisma.organization.findMany({
    where: {
      accountId: req.user.accountId,
    },
    select: {
      id: true,
      name: true,
    },
  });
  res.inertia.render("contacts/create", { organizations });
}

export async function store(req, res, next) {
  const { organizationId, ...body } = validate(req.body, {
    firstName: "string|required",
    lastName: "string|required",
    email: "email|required",
    phone: "phone|required",
    address: "string|required",
    city: "string|required",
    region: "string|required",
    country: "string|required",
    postalCode: "string|required",
    organizationId: "string|required",
  });

  await prisma.contact.create({
    data: {
      ...body,
      deletedAt: null,
      account: {
        connect: {
          id: req.user.account.id,
        },
      },
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });

  req.flash.set("success", "Contact created.");

  res.inertia.redirect("/contacts");
}

export async function edit(req, res, next) {
  const contact = await prisma.contact.findUniqueOrThrow({
    where: {
      id: req.params.id,
    },
  });
  const organizations = await prisma.organization.findMany({
    where: {
      accountId: req.user.accountId,
    },
    select: {
      id: true,
      name: true,
    },
  });
  res.inertia.render("contacts/edit", { contact, organizations });
}

export async function update(req, res, next) {
  const body = validate(req.body, {
    firstName: "string|required",
    lastName: "string|required",
    email: "email|required",
    phone: "phone|required",
    address: "string|required",
    city: "string|required",
    region: "string|required",
    country: "string|required",
    postalCode: "string|required",
    organizationId: "string|required",
  });

  await prisma.contact.update({
    where: {
      id: req.params.id,
    },
    data: body,
  });

  req.flash.set("success", "Contact updated.");
  res.inertia.redirect("/contacts");
}

export async function destroy(req, res, next) {
  await prisma.contact.update({
    where: {
      id: req.params.id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
  req.flash.set("success", "Contact deleted.");
  res.inertia.redirect("/contacts");
}

export async function restore(req, res, next) {
  await prisma.contact.update({
    where: {
      id: req.params.id,
    },
    data: {
      deletedAt: null,
    },
  });
  req.flash.set("success", "Contact restored.");
  res.inertia.redirect("/contacts");
}
