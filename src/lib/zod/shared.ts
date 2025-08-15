import { z } from "zod";

// Common constants
export const MAX_FILE_SIZE = 1024 * 1024 * 2; // 2MB
export const VALID_IMAGE_TYPES = ["png", "jpeg", "jpg", "webp"];

// Reusable field schemas
export const imageFileSchema = z.instanceof(File)
  .refine(file => file.size <= MAX_FILE_SIZE, { message: "A imagem deve ter no máximo 2 MB" })
  .refine(
    file => {
      const extension = file.type.split("/").pop();
      return extension && VALID_IMAGE_TYPES.includes(extension);
    },
    { message: `A imagem deve seguir um dos seguintes formatos: ${VALID_IMAGE_TYPES.join(", ")}` }
  );

export const urlSchema = z.string().trim().url("URL inválida");
export const emailSchema = z.string().trim().email("Email inválido");
export const phoneSchema = z.string().trim().regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Formato de telefone inválido");
export const textSchema = (min = 1, max = 255) => z.string().trim().min(min).max(max);
export const optionalTextSchema = (max = 255) => z.string().trim().max(max).optional();

// Common transformations
export const stringToNumber = z.string().transform(val => parseFloat(val));
export const stringToDate = z.string().transform(val => new Date(val));