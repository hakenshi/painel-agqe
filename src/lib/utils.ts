import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function getFileURL(key: string) {
  return `${process.env.NEXT_PUBLIC_CLOUDFLARE_R2_ENDPOINT}/${key}`
}

