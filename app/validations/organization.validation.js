export const createOrganizationSchema = {
  name: "string|required",
  email: "email|required",
  phone: "phone|required",
  address: "string|required",
  city: "string|required",
  region: "string|required",
  country: "string|required",
  postalCode: "string|required",
};

export const updateOrganizationSchema = createOrganizationSchema;
