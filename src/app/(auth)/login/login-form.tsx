'use client'
import { z } from "zod"
// Validação de CPF com Zod usando expressão regular e função customizada
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

function isValidCPF(cpf: string) {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let sum = 0, rest;
  for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11;
  if ((rest === 10) || (rest === 11)) rest = 0;
  if (rest !== parseInt(cpf.substring(9, 10))) return false;
  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;
  if ((rest === 10) || (rest === 11)) rest = 0;
  if (rest !== parseInt(cpf.substring(10, 11))) return false;
  return true;
}

const loginSchema = z.object({
  cpf: z.string()
    .regex(cpfRegex, "CPF deve estar no formato 000.000.000-00")
    .refine(isValidCPF, { message: "CPF inválido" }),
  password: z.string().max(255)
});

export default function LoginForm() {

  return (
    <div>_login-form</div>
  )
}
