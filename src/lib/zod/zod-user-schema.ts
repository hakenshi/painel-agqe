import { cpfRegex, isValidCPF } from "@/components/input-cpf";
import { z } from "zod";

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

const MAX_FILE_SIZE = 1024 * 1024 * 2

const VALID_MIME_TYPES = ['png', 'jpeg', 'jpg', "webp"]

export const userFormSchema = z.object({
    cpf: z.string()
        .trim()
        .regex(cpfRegex)
        .refine(isValidCPF, { message: "CPF Inválido" }),
    color: z.enum([
        "black", "pink", "purple", "blue", "teal", "red", "indigo",
        "yellow", "green", "gray", "orange", "cyan", "lime"
    ]),
    firstName: z.string()
        .trim()
        .min(1, "Nome é obrigatório.")
        .max(255),
    secondName: z.string()
        .trim()
        .min(1, "Sobrenome é obrigatório.")
        .max(255),
    photo: z.instanceof(File)
        .refine(
            (file) => file.size <= MAX_FILE_SIZE,
            { message: "A imagem deve ter no máximo 2 MB" }
        )
        .refine(
            (file) => {
                const extension = file.type.split('/').pop();
                return extension && VALID_MIME_TYPES.includes(extension);
            },
            { message: `A imagem deve seguir um dos seguintes formatos: ${VALID_MIME_TYPES.join(', ')}` }
        )
        .optional()
        .nullable(),
    occupation: z.string()
        .trim()
        .min(1, "Ocupação é obrigatória.")
        .max(255),
    password: z.string()
        .trim()
        .optional()
        .nullable()
        .superRefine((val, ctx) => {
            if (val && val.length > 0) {
                if (val.length < 8) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.too_small,
                        minimum: 8,
                        type: "string",
                        inclusive: true,
                        message: "A senha deve ter no mínimo 8 caractéres"
                    });
                }
                if (val.length > 255) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.too_big,
                        maximum: 255,
                        type: "string",
                        inclusive: true,
                        message: "A senha deve ter no máximo 255 caratéres"
                    });
                }
            }
        }),
    birthDate: z.date({
        required_error: "Data de nascimento é obrigatória.",
    }),
    joinedAt: z.date({
        required_error: "Data de admissão é obrigatória.",
    }),
});

export type UserFormValues = z.infer<typeof userFormSchema>