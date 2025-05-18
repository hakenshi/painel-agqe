'use client'
import InputCPF, { cpfRegex, isValidCPF } from "@/components/input-cpf";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getFileURL } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  cpf: z.string()
    .regex(cpfRegex, "CPF deve estar no formato 000.000.000-00")
    .refine(isValidCPF, { message: "CPF inválido" }),
  password: z.string()
});

interface LoginFormProps {
  loginFn(cpf: string, password: string): Promise<void>
}

export default function LoginForm({ loginFn }: LoginFormProps) {

  const form = useForm<{
    cpf: string;
    password: string;
  }>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      cpf: "",
      password: ""
    }
  })

  const submit = async (values: z.infer<typeof loginSchema>) => {
    await loginFn(values.cpf, values.password)
  }

  return (
    <section className="max-w-3xl md:w-full mx-10">
      <Form {...form}>
        <form className="bg-white h-120 rounded-xl px-10 py-5 gap-5 flex flex-col items-center justify-center border-zinc-100 border-2 z-10" style={{
          boxShadow: "0px 0px 30px rgba(0,0,0,0.25)"
        }} onSubmit={form.handleSubmit(submit)}>
          <div className="flex flex-col items-center gap-5">
            <Image src={`${getFileURL('icons/icon-transparent.png')}`} alt="logo associação e grupo quatro estações" width={150} height={150} />
            <h1 className="font-bold text-pink-700">Painel Associação e Grupo 4 estações</h1>
          </div>
          <div className="space-y-7 w-full">
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem >
                  <FormLabel className="font-bold">CPF</FormLabel>
                  <FormControl>
                    <InputCPF field={field} />
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
                    <Input type="password" placeholder="Insira sua senha" {...field} />
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
