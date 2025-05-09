'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image";
import { useForm } from "react-hook-form";
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

function maskCPF(value: string) {
  return value
    .replace(/\D/g, "") // Remove tudo que não é dígito
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .slice(0, 14); // Limita ao tamanho do CPF formatado
}

const loginSchema = z.object({
  cpf: z.string()
    .regex(cpfRegex, "CPF deve estar no formato 000.000.000-00")
    .refine(isValidCPF, { message: "CPF inválido" }),
  password: z.string()
});

export default function LoginForm() {

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      cpf: "",
      password: ""
    }
  })

  const submit = (values: z.infer<typeof loginSchema>) => {
    console.log("lmao, we got values:", values)
  }

  return (
    <section className="max-w-3xl md:w-full mx-10">
      <Form {...form}>
        <form className="bg-white h-120 rounded-xl p-5 gap-5 flex flex-col items-center justify-center border-zinc-100 border-2 z-10" style={{
          boxShadow: "0px 0px 30px rgba(0,0,0,0.25)"
        }} onSubmit={form.handleSubmit(submit)}>
          <div className="flex flex-col items-center gap-5">
            <Image src={"/icon-transparent.png"} alt="logo associação e grupo quatro estações" width={150} height={150} />
            <h1 className="font-bold text-pink-700">Painel Associação e Grupo 4 estações</h1>
          </div>
          <div className="space-y-7 w-11/12">
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem >
                  <FormLabel className="font-bold">CPF</FormLabel>
                  <FormControl>
                    <Input placeholder="CPF"
                      {...field}
                      value={field.value}
                      onChange={e => field.onChange(maskCPF(e.target.value))}
                      maxLength={14} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Senha</FormLabel>
                  <FormControl >
                    <Input placeholder="Insira sua senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="font-bold px-8" type="submit">Enviar</Button>
        </form>
      </Form>
    </section>
  )
}
