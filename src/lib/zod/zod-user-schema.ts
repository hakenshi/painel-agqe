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

export const userFormSchema = z.object({
    cpf: z.string().regex(cpfRegex).refine(isValidCPF, { message: "CPF Inválido" }),
    color: z.enum(["black", "pink", "purple", "blue", "teal", "red", "indigo", "yellow", "green", "gray", "orange", "cyan", "lime"]),
    firstName: z.string().min(1, "Nome é obrigatório.").max(255),
    secondName: z.string().min(1, "Sobrenome é obrigatório.").max(255),
    photo: z.string().url("URL da foto inválida.").or(z.literal("")),
    occupation: z.string().min(1, "Ocupação é obrigatória.").max(255),
    password: z.string()
        .refine(
            password => password === "" || password.length >= 8,
            { message: "Senha deve ter no mínimo 8 caracteres." }
        )
        .refine(
            password => password === "" || password.length <= 255,
            { message: "Senha deve ter no máximo 255 caracteres." }
        )
        .optional(),
    birthDate: z.date({
        required_error: "Data de nascimento é obrigatória.",
    }),
    joinedAt: z.date({
        required_error: "Data de admissão é obrigatória.",
    }),
})

export type UserFormValues = z.infer<typeof userFormSchema>