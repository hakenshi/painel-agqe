'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import InputCPF, { cpfRegex, isValidCPF } from "@/components/input-cpf"
import { usersSchema } from "@/db/schema"

const colors = [
    { value: "pink", displayValue: "Rosa" },
    { value: "blue", displayValue: "Azul" },
    { value: "green", displayValue: "Verde" },
    { value: "yellow", displayValue: "Amarelo" },
    { value: "red", displayValue: "Vermelho" },
    { value: "purple", displayValue: "Roxo" },
    { value: "orange", displayValue: "Laranja" },
    { value: "black", displayValue: "Preto" },
    { value: "white", displayValue: "Branco" },
] as const;

const userFormSchema = z.object({
    cpf: z.string().regex(cpfRegex).refine(isValidCPF, { message: "CPF Inválido" }),
    color: z.enum(["pink", "blue", "green", "yellow", "red", "purple", "orange", "black", "white"]),
    firstName: z.string().min(1, "Nome é obrigatório.").max(255),
    secondName: z.string().min(1, "Sobrenome é obrigatório.").max(255),
    photo: z.string().url("URL da foto inválida.").or(z.literal("")),
    occupation: z.string().min(1, "Ocupação é obrigatória.").max(255),
    password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres.").max(255),
    birthDate: z.date({
        required_error: "Data de nascimento é obrigatória.",
    }),
    joinedAt: z.date({
        required_error: "Data de admissão é obrigatória.",
    }),
})

type UserFormValues = z.infer<typeof userFormSchema>

export default function UserForm({ data }: { data?: Partial<typeof usersSchema.$inferInsert> }) {

    const defaultValues: Partial<UserFormValues> = {
        color: data?.color ?? "pink",
        photo: data?.photo ?? "",
    }
    const form = useForm<UserFormValues>({
        resolver: zodResolver(userFormSchema),
        defaultValues,
        mode: "onChange",
    })

    function onSubmit(data: UserFormValues) {
        console.log(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input placeholder="Insira um nome" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="secondName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sobrenome</FormLabel>
                            <FormControl>
                                <Input placeholder="Insira um sobrenome" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="cpf"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>CPF</FormLabel>
                            <FormControl>
                                <InputCPF field={field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cor</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione uma cor" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {colors.map((color) => (
                                        <SelectItem key={color.value} value={color.value}>
                                            {color.displayValue.charAt(0).toUpperCase() + color.displayValue.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <span className="text-xs text-zinc-500">
                                Cor do usuário na página do site
                            </span>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="occupation"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ocupação</FormLabel>
                            <FormControl>
                                <Input placeholder="Insira uma ocupação" {...field} />
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
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Insira uma senha" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Data de Nascimento</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Escolha uma data</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="joinedAt"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Data de Admissão</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "pl-3 text-left font-normal w-full",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Escolha uma data</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date()
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="w-full text-end"><Button type="submit">Salvar Usuário</Button></div>
            </form>
        </Form>
    )
}
