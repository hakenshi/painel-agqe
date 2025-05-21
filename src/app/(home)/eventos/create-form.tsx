'use client'

import DatePicker from '@/components/data-picker'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectItem, SelectValue, SelectContent, SelectTrigger } from '@/components/ui/select'
import { EventFormValues, eventsFormSchema } from '@/lib/zod/zod-events-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'

const eventTypes = [
    { type: "event", displayName: "Evento" },
    { type: "gallery", displayName: "Galeria" },
    { type: "event_gallery", displayName: "Evento e Galeria" }
]

export default function CreateEventForm() {
    const form = useForm<EventFormValues>({
        resolver: zodResolver(eventsFormSchema),
        defaultValues: {
            date: undefined,
            location: "",
            name: "",
            type: "event",
        },
    })

    function createEvent() {

    }

    return (
        <Form {...form}>
            <form className='space-y-6' onSubmit={form.handleSubmit(createEvent)}>
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input placeholder='Insira o nome do evento' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='location'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Localização</FormLabel>
                            <FormControl>
                                <Input placeholder='Insira a localização do evento' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='type'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tipo do Evento</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl className='w-full'>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o tipo do evento" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {eventTypes.map(({ type, displayName }) => (
                                        <SelectItem key={type} value={type}>
                                            {displayName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <span className='text-xs text-zinc-500'>Esse campo determina como será a exibição do evento no site principal.</span>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='type'
                    render={({ field }) => (
                        <DatePicker field={field} label='Data do Evento' />
                    )}
                />
                <div className="text-end"><Button type='submit'>Criar Evento</Button></div>
            </form>
        </Form>
    )
}
