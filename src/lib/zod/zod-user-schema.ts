import { cpfRegex, isValidCPF } from "@/components/input-cpf";
import { z } from "zod";
import { imageFileSchema, textSchema } from "./shared";

export const colors = [
    { value: "black", displayValue: "Preto" },
    { value: "pink", displayValue: "Rosa" },
    { value: "purple", displayValue: "Roxo" },
    { value: "blue", displayValue: "Azul" },
    { value: "teal", displayValue: "Verde-azulado" },
    { value: "red", displayValue: "Vermelho" },
    { value: "indigo", displayValue: "Índigo" },
    { value: "yellow", displayValue: "Amarelo" },
    { value: "green", displayValue: "Verde" },
    { value: "gray", displayValue: "Cinza" },
    { value: "orange", displayValue: "Laranja" },
    { value: "cyan", displayValue: "Ciano" },
    { value: "lime", displayValue: "Lima" },
];

// Base field schemas
const cpfField = z.string().trim().regex(cpfRegex).refine(isValidCPF, { message: "CPF Inválido" });
const colorField = z.enum(["black", "pink", "purple", "blue", "teal", "red", "indigo", "yellow", "green", "gray", "orange", "cyan", "lime"]);
const nameField = textSchema(1, 255);
const photoField = imageFileSchema;
const passwordField = z.string().trim().min(8, "A senha deve ter no mínimo 8 caractéres").max(255, "A senha deve ter no máximo 255 caractéres");
const dateField = z.date();

// Base schema with all required fields
const baseUserSchema = z.object({
    cpf: cpfField,
    color: colorField,
    firstName: nameField.min(1, "Nome é obrigatório."),
    secondName: nameField.min(1, "Sobrenome é obrigatório."),
    occupation: nameField.min(1, "Ocupação é obrigatória."),
    birthDate: dateField,
    joinedAt: dateField,
});

// Create schema - all fields required, password required, photo optional
export const createUserSchema = baseUserSchema.extend({
    password: passwordField,
    photo: photoField.optional().nullable(),
});

// Update schema - all fields optional except dates, password optional
export const updateUserSchema = baseUserSchema.partial().extend({
    password: passwordField.optional().nullable(),
    photo: photoField.optional().nullable(),
    birthDate: dateField.optional(),
    joinedAt: dateField.optional(),
});

// Legacy export for backward compatibility
export const userFormSchema = createUserSchema;

export type CreateUserValues = z.infer<typeof createUserSchema>;
export type UpdateUserValues = z.infer<typeof updateUserSchema>;
export type UserFormValues = CreateUserValues; // Legacy type