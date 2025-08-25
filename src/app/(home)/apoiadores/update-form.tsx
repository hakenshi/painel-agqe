'use client'

import { updateSponsor } from "@/actions/sponsors"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { updateSponsorSchema, UpdateSponsorValues } from "@/lib/zod/zod-sponsors-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useState } from "react"
import DatePicker from "@/components/date-picker"

const SANITIZE_REGEX = /[<>"'&]/g;

export default function UpdateSponsorForm({ sponsor }: { sponsor: Sponsor }) {
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const form = useForm<UpdateSponsorValues>({
        resolver: zodResolver(updateSponsorSchema),
        defaultValues: {
            name: sponsor.name?.replace(SANITIZE_REGEX, '') ?? "",
            website: sponsor.website?.replace(SANITIZE_REGEX, '') ?? "",
            sponsoringSince: sponsor.sponsoringSince ? new Date(sponsor.sponsoringSince) : undefined,
        },
        mode: "onChange",
    })

    async function onSubmit(formData: UpdateSponsorValues) {
        try {
            setIsLoading(true);
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    data.append(key, value instanceof Date ? value.toISOString() : String(value));
                }
            });

            const result = await updateSponsor(sponsor.id, data);
            if (result.success) {
                toast.success("Apoiador atualizado com sucesso!");
                setOpen(false);
            } else {
                toast.error("Erro ao atualizar apoiador");
            }
        } catch {
            toast.error("Erro inesperado ao atualizar apoiador");
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
                    <DialogTitle>Editar Apoiador</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Nome do apoiador"
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
                            name="website"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Website</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="https://exemplo.com"
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
                                <DatePicker field={field} label='Patrocina Desde' />
                            )}
                        />

                        <DialogClose asChild>
                            <Button className="w-full" type="submit" disabled={isLoading}>
                                {isLoading ? "Atualizando..." : "Atualizar"}
                            </Button>
                        </DialogClose>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}