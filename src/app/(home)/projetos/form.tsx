'use client'

import DatePicker from '@/components/date-picker'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectItem, SelectValue, SelectContent, SelectTrigger } from '@/components/ui/select'
import { CreateProjectValues, createProjectSchema } from '@/lib/zod/zod-projects-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import TimePicker from '@/components/time-picker'
import { useRouter } from 'next/navigation'

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

export default function CreateProjectForm({projectData}: {projectData?: Project}) {
    const router = useRouter()
    const form = useForm<CreateProjectValues>({
        resolver: zodResolver(createProjectSchema),
        defaultValues: {
            date: projectData?.date ? new Date(projectData.date) : undefined,
            location: projectData?.location?.replace(/[<>"'&]/g, '') ?? "",
            name: projectData?.name?.replace(/[<>"'&]/g, '') ?? "",
            projectType: projectData?.projectType ?? "social",
            status: projectData?.status ?? "planning",
            responsibles: projectData?.responsibles?.replace(/[<>"'&]/g, '') ?? "",
            ending_time: projectData?.endingTime ?? "",
            starting_time: projectData?.startingTime ?? "",

        },
    })

    async function submitProject(values: CreateProjectValues) {
        const sanitizedValues = {
            ...values,
            name: values.name?.replace(/[<>"'&]/g, ''),
            location: values.location?.replace(/[<>"'&]/g, ''),
            responsibles: values.responsibles?.replace(/[<>"'&]/g, ''),
        }
        sessionStorage.setItem('project_data', JSON.stringify(sanitizedValues))
        router.push("/projetos/novo");
    }

    return (
        <Form {...form}>
            <form className='space-y-6' onSubmit={form.handleSubmit(submitProject)}>
                <FormField<CreateProjectValues>
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome do Projeto</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder='Insira o nome do projeto' 
                                    value={field.value as string || ''}
                                    onChange={(e) => field.onChange(e.target.value.replace(/[<>"'&]/g, ''))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField<CreateProjectValues>
                    control={form.control}
                    name='location'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Localização</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder='Insira a localização do evento' 
                                    value={field.value as string || ''}
                                    onChange={(e) => field.onChange(e.target.value.replace(/[<>"'&]/g, ''))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField<CreateProjectValues>
                    control={form.control}
                    name='responsibles'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Responsáveis</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder='Ex: João Silva, Maria Santos, Instituto XYZ' 
                                    value={field.value as string || ''}
                                    onChange={(e) => field.onChange(e.target.value.replace(/[<>"'&]/g, ''))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField<CreateProjectValues>
                    control={form.control}
                    name='projectType'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tipo do Projeto</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value as string || undefined}>
                                <FormControl className='w-full'>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o tipo do projeto" />
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
                <FormField<CreateProjectValues>
                    control={form.control}
                    name='status'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status do Projeto</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value as string || undefined}>
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
                <FormField<CreateProjectValues>
                    control={form.control}
                    name='date'
                    render={({ field }) => (
                        <DatePicker field={field} label='Data do Projeto (opcional)' />
                    )}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField<CreateProjectValues>
                        control={form.control}
                        name='starting_time'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Horário de Início (opcional)</FormLabel>
                                <TimePicker field={field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField<CreateProjectValues>
                        control={form.control}
                        name='ending_time'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Horário de Término (opcional)</FormLabel>
                                <TimePicker field={field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="text-end"><Button type='submit'>Criar Projeto</Button></div>
            </form>
        </Form>
    )
}
