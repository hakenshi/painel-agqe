'use client'
import { createEvent } from '@/actions/events'
import EventUpdateForm from '@/app/(home)/eventos/update-form'
import ImagePreview from '@/components/image-preview'
import { AutosizeTextarea } from '@/components/ui/auto-resize-textarea'
import { Button, buttonVariants } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { eventsSchema } from '@/db/schema'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { ClockIcon, EyeIcon, InfoIcon, Link, MapIcon, MapPinIcon, PencilIcon, SaveIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'

export default function Evento({ eventData }: { eventData: EventData | null }) {

    const router = useRouter()

    const [isEditing, setIsEditing] = useState(!eventData?.coverImage)
    const [markdown, setMarkdown] = useState(eventData?.markdown)
    const [currentEvent, setCurrentEvent] = useState<EventData | null>(eventData)
    
    const updateEventData = (updates: Partial<EventData>) => {
        setCurrentEvent((prev: EventData) => prev ? { ...prev, ...updates } : null)
    }

    async function submit(e: FormEvent) {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)

        if (!currentEvent) {
            toast.error("Informações sobre o evento não estão presentes")
            return
        }
        Object.entries(currentEvent).forEach(([key, value]) => {
            if (value != null) {
                formData.append(key, String(value))
            }
        })
        const event = await createEvent(formData)

        if (event.success) {
            toast.success(event.message)
            sessionStorage.removeItem('event_data')
            router.push("/eventos")
        } else {
            toast.error(event.error || "Erro ao criar evento")
        }
    }

    return (
        <form onSubmit={submit} className="px-4 lg:px-6 relative">
            {currentEvent ? (
                <div className="flex flex-col lg:flex-row justify-center gap-6 lg:gap-10 items-start">
                    <div className="w-full lg:w-1/3 flex items-center flex-col justify-center lg:top-0 lg:sticky">
                        <div className='inline-flex flex-col text-start justify-start w-full lg:w-9/12'>
                            <p className="text-xs uppercase text-pink-600 font-semibold mb-1">
                                Próximo Evento
                            </p>
                            <h1 className="text-32l lg:text-3xl font-bold text-gray-800 mb-6 leading-tight">
                                {currentEvent.name}
                            </h1>
                        </div>

                        <div className="flex items-center justify-center w-full h-96">
                            <ImagePreview url={currentEvent.coverImage} />
                        </div>
                        <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm space-y-2 w-full max-w-96">
                            <h3 className="text-lg font-semibold text-gray-700 mb-3">
                                Detalhes do Evento
                            </h3>
                            <div className="flex items-center text-gray-600">
                                <MapIcon className="w-5 mr-2 text-purple-600" />
                                {currentEvent.date ? new Date(currentEvent.date).toLocaleDateString("pt-BR", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                }) : 'Data não definida'}
                            </div>
                            <div className="flex items-center text-gray-600">
                                <ClockIcon className="w-5 mr-2 text-purple-600" />
                                {currentEvent.startingTime} - {currentEvent.endingTime}
                            </div>
                            <div className="flex items-center text-gray-600">
                                <MapPinIcon className="w-5 mr-2 text-purple-600" />
                                {currentEvent.location}
                            </div>
                        </div>
                        <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:space-x-3 text-center">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button>
                                        <InfoIcon /> Editar Informações
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                    <DialogHeader>
                                        <DialogTitle>
                                            Editar Evento
                                        </DialogTitle>
                                    </DialogHeader>
                                    <EventUpdateForm onUpdate={updateEventData} event={currentEvent as typeof eventsSchema.$inferSelect} />
                                </DialogContent>
                            </Dialog>
                            {!isEditing ?
                                <Button type="button" onClick={() => setIsEditing(true)}> <PencilIcon /> Editar Markdown</Button> :
                                <Button type="button" onClick={() => setIsEditing(false)}><EyeIcon /> Preview</Button>
                            }
                            <Button>
                                <SaveIcon />
                                Salvar
                            </Button>
                        </div>
                    </div>

                    {/* Conteúdo do evento */}
                    <div className="w-full lg:w-6/12">
                        <article className="space-y-5 prose prose-sm sm:prose-base max-w-none prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-800 overflow-y-scroll">
                            <input name="markdown" type="hidden" value={markdown} />
                            {isEditing ? (<AutosizeTextarea value={markdown} onChange={(e) => {
                                setMarkdown(e.target.value)
                                updateEventData({ markdown: e.target.value })
                            }}></AutosizeTextarea>) : (
                                <Markdown
                                    skipHtml
                                    components={{
                                        code: ({ className, children, ...props }) => {
                                            const isInline = !className;
                                            if (isInline) {
                                                return (
                                                    <code className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-sm font-mono" {...props}>
                                                        {children}
                                                    </code>
                                                );
                                            }
                                            return (
                                                <code className="block bg-gray-700 text-gray-100 p-4 rounded-lg overflow-x-auto font-mono text-sm" {...props}>
                                                    {children}
                                                </code>
                                            );
                                        },
                                        pre: ({ children }) => <div className="my-4">{children}</div>,
                                        h1: ({ children }) => <h1 className="text-3xl font-bold text-gray-700 mb-4">{children}</h1>,
                                        h2: ({ children }) => <h2 className="text-2xl font-semibold text-gray-700 mb-3">{children}</h2>,
                                        h3: ({ children }) => <h3 className="text-xl font-medium text-gray-700 mb-2">{children}</h3>,
                                        blockquote: ({ children }) => (
                                            <blockquote className="border-l-4 border-primary pl-4 italic text-gray-600 my-4">
                                                {children}
                                            </blockquote>
                                        ),
                                        ul: ({ children }) => <ul className="list-disc pl-6 my-4 space-y-1">{children}</ul>,
                                        ol: ({ children }) => <ol className="list-decimal pl-6 my-4 space-y-1">{children}</ol>,
                                        li: ({ children }) => <li className="text-gray-700">{children}</li>,
                                        a: ({ href, children }) => (
                                            <Link href={href || '#'} className={buttonVariants({ variant: "link" })}>
                                                {children}
                                            </Link>
                                        ),
                                        table: ({ children }) => <div className="border rounded p-2"><Table>{children}</Table></div>,
                                        tbody: ({ children }) => <TableBody>{children}</TableBody>,
                                        thead: ({ children }) => <TableHeader>{children}</TableHeader>,
                                        th: ({ children }) => <TableHead>{children}</TableHead>,
                                        tr: ({ children }) => <TableRow>{children}</TableRow>,
                                        td: ({ children }) => <TableCell>{children}</TableCell>,
                                    }}
                                    remarkPlugins={[remarkGfm]}>
                                    {markdown}
                                </Markdown>
                            )}
                        </article>
                    </div>
                </div>) : (
                <div className='h-[75vh] flex items-center justify-center'>
                    <h2 className=''>
                        Evento não encontrado
                    </h2>
                </div>
            )}
        </form>
    )
}