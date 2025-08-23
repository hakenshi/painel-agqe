'use client'

import DatePicker from '@/components/date-picker'
import TimePicker from '@/components/time-picker'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { UpdateEventValues, updateEventSchema } from '@/lib/zod/zod-events-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const eventTypes = [
    { type: "event", displayName: "Evento" },
    { type: "gallery", displayName: "Galeria" },
    { type: "event_gallery", displayName: "Evento e Galeria" }
]

interface EventUpdateFormProps {
    event: Event
    onUpdate: (updates: Partial<EventData>) => void
}

export default function EventUpdateForm({ event, onUpdate }: EventUpdateFormProps) {
    const form = useForm<UpdateEventValues>({
        resolver: zodResolver(updateEventSchema),
        defaultValues: {
            name: event.name,
            type: event.eventType,
            location: event.location,
            date: new Date(event.date),
            starting_time: event.startingTime,
            ending_time: event.endingTime,
            markdown: event.markdown || "",
        },
    })

    async function onSubmit(values: UpdateEventValues) {
        onUpdate({
            name: values.name,
            eventType: values.type as 'event' | 'gallery' | 'event_gallery',
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
                                <FormLabel>Nome do Evento</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nome do evento" {...field} />
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
                                <FormLabel>Tipo do Evento</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl className='w-full'>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o tipo" />
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
                                    <Input placeholder="Localização do evento" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <DatePicker field={field} label="Data do Evento" />
                        )}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="starting_time"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Horário de Início</FormLabel>
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
                                    <FormLabel>Horário de Término</FormLabel>
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