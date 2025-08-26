'use client'

import { updateUser } from "@/actions/user"
import InputCPF from "@/components/input-cpf"
import DatePicker from "@/components/date-picker"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UpdateUserValues, colors, updateUserSchema } from "@/lib/zod/zod-user-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useState } from "react"

const SANITIZE_REGEX = /[<>"'&]/g;

export default function UpdateUserForm({ data, id }: { data: Partial<User>, id: number }) {
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const form = useForm<UpdateUserValues>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            color: (data?.color as "pink") ?? "pink",
            firstName: data?.firstName?.replace(SANITIZE_REGEX, '') ?? "",
            secondName: data?.secondName?.replace(SANITIZE_REGEX, '') ?? "",
            cpf: data?.cpf ?? "",
            occupation: data?.occupation?.replace(SANITIZE_REGEX, '') ?? "",
            birthDate: data?.birthDate ? new Date(data.birthDate) : undefined,
            joinedAt: data?.joinedAt ? new Date(data.joinedAt) : undefined,
        },
        mode: "onChange",
    })

    async function onSubmit(formData: UpdateUserValues) {
        try {
            setIsLoading(true);
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
            
            const result = await updateUser(id, data);
            if (result.success) {
                toast.success(`Usuário ${result.userData} atualizado com sucesso!`);
                setOpen(false);
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
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Editar</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar</DialogTitle>
                </DialogHeader>
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
                                    <FormLabel>Senha (deixe em branco para manter)</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Nova senha (opcional)" {...field} value={field.value ?? ""} />
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
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading ? "Atualizando..." : "Atualizar"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
