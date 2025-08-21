'use client'

import DatePicker from '@/components/date-picker'
import TimePicker from '@/components/time-picker'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { projectsSchema } from '@/db/schema'
import { UpdateProjectValues, updateProjectSchema } from '@/lib/zod/zod-projects-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const projectTypes = [
    { type: "social", displayName: "Social" },
    { type: "educational", displayName: "Educacional" },
    { type: "environmental", displayName: "Ambiental" },
    { type: "cultural", displayName: "Cultural" },
    { type: "health", displayName: "Saúde" }
]

const projectStatus = [
    { type: "planning", displayName: "Planejamento" },
    { type: "active", displayName: "Ativo" },
    { type: "completed", displayName: "Concluído" },
    { type: "archived", displayName: "Arquivado" }
]

interface ProjectUpdateFormProps {
    project: typeof projectsSchema.$inferSelect
    onUpdate: (updates: Partial<any>) => void
}

export default function ProjectUpdateForm({ project, onUpdate }: ProjectUpdateFormProps) {
    const form = useForm<UpdateProjectValues>({
        resolver: zodResolver(updateProjectSchema),
        defaultValues: {
            name: project.name,
            type: project.projectType,
            status: project.status,
            responsibles: project.responsibles || "",
            location: project.location || "",
            date: project.date ? new Date(project.date) : undefined,
            starting_time: project.startingTime || "",
            ending_time: project.endingTime || "",
            markdown: project.markdown || "",
        },
    })

    async function onSubmit(values: UpdateProjectValues) {
        onUpdate({
            name: values.name,
            projectType: values.type as any,
            status: values.status as any,
            responsibles: values.responsibles,
            location: values.location,
            date: values.date?.toISOString().slice(0, 10),
            startingTime: values.starting_time,
            endingTime: values.ending_time
        })
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome do Projeto</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nome do projeto" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="responsibles"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Responsáveis</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ex: João Silva, Maria Santos" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tipo do Projeto</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl className='w-full'>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o tipo" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {projectTypes.map(({ type, displayName }) => (
                                            <SelectItem key={type} value={type}>
                                                {displayName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status do Projeto</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl className='w-full'>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {projectStatus.map(({ type, displayName }) => (
                                            <SelectItem key={type} value={type}>
                                                {displayName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Localização</FormLabel>
                                <FormControl>
                                    <Input placeholder="Localização do projeto" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <DatePicker field={field} label="Data do Projeto (opcional)" />
                        )}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="starting_time"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Horário de Início (opcional)</FormLabel>
                                    <FormControl>
                                        <TimePicker field={field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="ending_time"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Horário de Término (opcional)</FormLabel>
                                    <FormControl>
                                        <TimePicker field={field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="cover_image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nova Imagem de Capa (opcional)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => field.onChange(e.target.files?.[0])}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-end gap-4">
                        <DialogClose asChild>
                            <Button type="submit">
                                Salvar
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">
                                Cancelar
                            </Button>
                        </DialogClose>
                    </div>
                </form>
            </Form>
        </div>
    )
}