export const createUserSchema = {
  firstName: "string|required",
  lastName: "string|required",
  email: "email|required",
  password: "string|required",
  owner: "boolean|required",
};

export const updateUserSchema = createUserSchema;
