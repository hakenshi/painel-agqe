'use client'

import { createUser } from "@/actions/user"
import DatePicker from "@/components/date-picker"
import InputCPF from "@/components/input-cpf"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UpdateUserValues, colors, updateUserSchema } from "@/lib/zod/zod-user-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const SANITIZE_REGEX = /[<>"'&]/g;

export default function CreateUserForm() {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<UpdateUserValues>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            color: "pink",
            firstName: "",
            secondName: "",
            cpf: "",
            occupation: "",
            birthDate: undefined,
            joinedAt: undefined,
        },
        mode: "onChange",
    })

    async function onSubmit(formData: UpdateUserValues) {
        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    if (key === 'photo' && value instanceof File) {
                        data.append(key, value);
                    } else if (value instanceof Date) {
                        data.append(key, value.toISOString());
                    } else if (key !== 'photo') {
                        data.append(key, String(value));
                    }
                }
            });

            const result = await createUser(data);
            if (result.success) {
                toast.success(`Usuário ${result.userData} cadastrado com sucesso!`);
            } else {
                toast.error(result.message || "Erro ao atualizar usuário");
            }
        } catch {
            toast.error("Erro inesperado ao atualizar usuário");
        } finally {
            setIsLoading(false);
        }
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
                                <Input
                                    placeholder="Insira um nome"
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value.replace(SANITIZE_REGEX, ''))}
                                />
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
                                <Input
                                    placeholder="Insira um sobrenome"
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value.replace(SANITIZE_REGEX, ''))}
                                />
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
                    name="photo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Foto</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        field.onChange(file || null)
                                    }}
                                />
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
                                <Input
                                    placeholder="Insira uma ocupação"
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value.replace(SANITIZE_REGEX, ''))}
                                />
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
                                <Input type="password" placeholder="Insira uma senha (opcional)" {...field} value={field.value ?? ""} />
                            </FormControl>
                            <p className="text-xs text-zinc-500">Deixe em branco se você quiser barrar o acesso ao painel</p>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                        <DatePicker field={field} label='Data de Nascimento' />
                    )}
                />
                <FormField
                    control={form.control}
                    name="joinedAt"
                    render={({ field }) => (
                        <DatePicker field={field} label='Data de Admissão' />
                    )}
                />
                <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? "Cadastrando..." : "Cadastrar"}
                </Button>
            </form>
        </Form>
    )
}
