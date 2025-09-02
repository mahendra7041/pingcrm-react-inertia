export const storeContactSchema = {
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
};

export const updateContactSchema = storeContactSchema;
