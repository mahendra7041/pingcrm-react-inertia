import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";

export async function userFactory(count = 1, overrides = {}) {
  const users = [];

  for (let i = 0; i < count; i++) {
    const password = overrides.password || "secret";
    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({
      firstName: overrides.firstName || faker.person.firstName(),
      lastName: overrides.lastName || faker.person.lastName(),
      email: overrides.email || faker.internet.email(),
      password: hashedPassword,
      ...overrides,
    });
  }

  return users;
}

export async function organizationFactory(count = 1, overrides = {}) {
  const organizations = [];

  for (let i = 0; i < count; i++) {
    organizations.push({
      name: overrides.name || faker.person.fullName(),
      email: overrides.email || faker.internet.email(),
      phone: overrides.phone || faker.phone.number(),
      address: overrides.address || faker.location.streetAddress(),
      city: overrides.city || faker.location.city(),
      region: overrides.region || faker.location.state(),
      country: overrides.country || faker.location.country(),
      postalCode: overrides.postalCode || faker.location.zipCode(),
      ...overrides,
    });
  }

  return organizations;
}

export async function contactFactory(count = 1, overrides = {}) {
  const contacts = [];

  for (let i = 0; i < count; i++) {
    contacts.push({
      firstName: overrides.firstName || faker.person.firstName(),
      lastName: overrides.lastName || faker.person.lastName(),
      email:
        overrides.email || faker.internet.email({ provider: "example.com" }),
      phone: overrides.phone || faker.phone.number("0800-#######"),
      address: overrides.address || faker.location.streetAddress(),
      city: overrides.city || faker.location.city(),
      region: overrides.region || faker.location.state(),
      country: overrides.country || "US",
      postalCode: overrides.postalCode || faker.location.zipCode(),
      ...overrides,
    });
  }

  return contacts;
}
