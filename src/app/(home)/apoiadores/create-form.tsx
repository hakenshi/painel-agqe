'use client'

import { createSponsor } from "@/actions/sponsors"
import DatePicker from "@/components/date-picker"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createSponsorSchema, CreateSponsorValues } from "@/lib/zod/zod-sponsors-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserPlusIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export default function CreateSponsorForm() {
    const [open, setOpen] = useState(false);

    const form = useForm<CreateSponsorValues>({
        resolver: zodResolver(createSponsorSchema),
        defaultValues: {
            name: "",
            website: "",
            sponsoringSince: undefined,
        },
        mode: "onChange",
    })

    async function onSubmit(formData: CreateSponsorValues) {
        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    if (value instanceof Date) {
                        data.append(key, value.toISOString());
                    } else {
                        data.append(key, value as string | Blob);
                    }
                }
            });

            const result = await createSponsor(data);

            if (result.success) {
                toast.success("Apoiador criado com sucesso!");
                form.reset();
            } else {
                toast.error("Erro ao criar apoiador");
            }
        } catch {
            toast.error("Erro inesperado ao criar apoiador");
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className="w-full sm:w-auto">
                    <UserPlusIcon className="mr-2 h-4 w-4" />
                    Criar Apoiador
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Criar Apoiador</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nome do apoiador" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Website</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://www.exemplo.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="logo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Logo</FormLabel>
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
                            name="sponsoringSince"
                            render={({ field }) => (
                                <DatePicker field={field} label='Apoiando desde' />
                            )}
                        />
                        <DialogClose asChild>
                            <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
                                {form.formState.isSubmitting ? "Criando..." : "Criar Apoiador"}
                            </Button>
                        </DialogClose>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}