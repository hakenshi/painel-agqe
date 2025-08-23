'use client'

import { createUser } from '@/actions/user'
import DatePicker from '@/components/date-picker'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { colors, createUserSchema, CreateUserValues } from '@/lib/zod/zod-user-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import InputCPF from '../../../components/input-cpf'
import { Button } from '../../../components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../components/ui/form'
import { Input } from '../../../components/ui/input'

export default function CreateUserForm() {
    const form = useForm<CreateUserValues>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            color: "pink",
            firstName: "",
            secondName: "",
            cpf: "",
            occupation: "",
            password: "",
        },
        mode: "onChange",
    })

    async function onSubmit(formData: CreateUserValues) {
        const data = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                data.append(key, value instanceof Date ? value.toISOString() : String(value))
            }
        })
        await createUser(data)
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
                                        if (file) {
                                            field.onChange(file)
                                        }
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
                                <Input type="password" placeholder="Insira uma senha" {...field} value={field.value ?? ''} />
                            </FormControl>
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
                <Button className="w-full" type="submit">
                    Cadastrar
                </Button>
            </form>
        </Form>
    )
}
