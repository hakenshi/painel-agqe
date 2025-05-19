'use client'

import { createUser } from '@/actions/user'
import { cn } from '@/lib/utils'
import { colors, userFormSchema, UserFormValues } from '@/lib/zod/zod-user-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import InputCPF from '../../../components/input-cpf'
import { Button } from '../../../components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../components/ui/form'
import { Input } from '../../../components/ui/input'

export default function CreateUserForm() {
    const defaultValues: Partial<UserFormValues> = {
        color: "pink",
        photo: undefined,
        firstName: "",
        secondName: "",
        cpf: "",
        occupation: "",
        password: "",
        birthDate: undefined,
        joinedAt: undefined,
    }
    const form = useForm<UserFormValues>({
        resolver: zodResolver(userFormSchema),
        defaultValues,
        mode: "onChange",
    })

    async function onSubmit(formData: UserFormValues) {
        const parsedData = userFormSchema.parse(formData)
        console.log("creating user")
        await createUser(parsedData)
    }

    function getYears(start: number, end: number) {
        const years = []
        for (let y = start; y <= end; y++) years.push(y)
        return years
    }
    const currentYear = new Date().getFullYear()
    const years = useMemo(() => getYears(1900, currentYear), [currentYear])

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
                                    <div className="flex items-center gap-2 px-3 pt-3">
                                        <select
                                            className="border rounded px-2 py-1 text-sm"
                                            value={field.value ? field.value.getFullYear() : currentYear}
                                            onChange={e => {
                                                const year = Number(e.target.value)
                                                const date = field.value ?? new Date()
                                                field.onChange(new Date(year, date.getMonth(), date.getDate()))
                                            }}
                                        >
                                            {years.map(y => (
                                                <option key={y} value={y}>{y}</option>
                                            ))}
                                        </select>
                                        <select
                                            className="border rounded px-2 py-1 text-sm"
                                            value={field.value ? field.value.getMonth() : new Date().getMonth()}
                                            onChange={e => {
                                                const month = Number(e.target.value)
                                                const date = field.value ?? new Date()
                                                field.onChange(new Date(date.getFullYear(), month, date.getDate()))
                                            }}
                                        >
                                            {Array.from({ length: 12 }).map((_, i) => (
                                                <option key={i} value={i}>{format(new Date(2000, i, 1), "MMMM")}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date: Date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                        month={field.value ?? new Date()}
                                        onMonthChange={(month: Date) => field.onChange(month)}
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
                                    <div className="flex items-center gap-2 px-3 pt-3">
                                        <select
                                            className="border rounded px-2 py-1 text-sm"
                                            value={field.value ? field.value.getFullYear() : currentYear}
                                            onChange={e => {
                                                const year = Number(e.target.value)
                                                const date = field.value ?? new Date()
                                                field.onChange(new Date(year, date.getMonth(), date.getDate()))
                                            }}
                                        >
                                            {years.map(y => (
                                                <option key={y} value={y}>{y}</option>
                                            ))}
                                        </select>
                                        <select
                                            className="border rounded px-2 py-1 text-sm"
                                            value={field.value ? field.value.getMonth() : new Date().getMonth()}
                                            onChange={e => {
                                                const month = Number(e.target.value)
                                                const date = field.value ?? new Date()
                                                field.onChange(new Date(date.getFullYear(), month, date.getDate()))
                                            }}
                                        >
                                            {Array.from({ length: 12 }).map((_, i) => (
                                                <option key={i} value={i}>{format(new Date(2000, i, 1), "MMMM")}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date: Date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                        month={field.value ?? new Date()}
                                        onMonthChange={(month: Date) => field.onChange(month)}
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-full" type="submit">
                    Cadastrar
                </Button>
            </form>
        </Form>
    )
}
