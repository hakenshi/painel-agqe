// Example usage of modular schemas

import { createUserSchema, updateUserSchema } from "./zod-user-schema";
import { createEventSchema, updateEventSchema } from "./zod-events-schema";
import { createSponsorSchema, updateSponsorSchema } from "./zod-sponsors-schema";

// Example: Create user form
export function validateCreateUser(formData: FormData) {
  const data = {
    cpf: formData.get("cpf") as string,
    firstName: formData.get("firstName") as string,
    secondName: formData.get("secondName") as string,
    // ... other fields
  };
  
  return createUserSchema.parse(data);
}

// Example: Update user form (partial data)
export function validateUpdateUser(formData: FormData) {
  const data = Object.fromEntries(
    Array.from(formData.entries()).filter(([_, value]) => value !== "")
  );
  
  return updateUserSchema.parse(data);
}

// Example: Conditional validation based on operation
export function validateUser(formData: FormData, isUpdate = false) {
  const schema = isUpdate ? updateUserSchema : createUserSchema;
  return schema.parse(Object.fromEntries(formData));
}

// Example: Schema composition for complex forms
export function createUserWithDefaults() {
  return createUserSchema.extend({
    color: createUserSchema.shape.color.default("pink"),
    joinedAt: createUserSchema.shape.joinedAt.default(new Date()),
  });
}