import EventArticle from '@/components/event-article'
import ImagePreview from '@/components/image-preview'
import { Button } from '@/components/ui/button'
import { ClockIcon, MapIcon, MapPinIcon } from 'lucide-react'
import { cookies } from 'next/headers'

type EventData = {
    name: string
    type: "event" | "gallery" | "event_gallery"
    location: string
    date: string
}

export default async function NovoEvento() {

    const cookie = await cookies()

    const eventData: EventData = JSON.parse(cookie.get("event_data")?.value as string)

    return (
        <section className="py-10 bg-white">
            <div className='fixed bottom-10 right-10 z-10'>
                <Button>
                    Salvar
                </Button>
            </div>
            <form className="container mx-auto px-4 lg:px-6">
                {eventData ? (<div className="flex flex-col lg:flex-row justify-center gap-10 items-start">

                    <div className="lg:w-1/3 flex items-center flex-col justify-center">
                        <div className="flex items-center justify-center w-full h-96">
                            <ImagePreview />
                        </div>
                        <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm space-y-2 w-96">
                            <h3 className="text-lg font-semibold text-gray-700 mb-3">
                                Detalhes do Evento
                            </h3>
                            <div className="flex items-center text-gray-600">
                                <MapIcon className="w-5 mr-2 text-purple-600" />
                                {new Date(eventData.date).toLocaleDateString("pt-BR", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </div>
                            <div className="flex items-center text-gray-600">
                                <ClockIcon className="w-5 mr-2 text-purple-600" />
                                {new Date(eventData.date).toLocaleTimeString()}
                            </div>
                            <div className="flex items-center text-gray-600">
                                <MapPinIcon className="w-5 mr-2 text-purple-600" />
                                {eventData.location}
                            </div>
                        </div>
                    </div>

                    {/* Conteúdo do evento */}
                    <div className="lg:w-6/12">
                        <p className="text-sm uppercase text-pink-600 font-semibold mb-1">
                            Próximo Evento
                        </p>
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                            {eventData.name}
                        </h1>
                       <EventArticle />
                    </div>
                </div>) : (
                    <div className='h-[75vh] flex items-center justify-center'>
                        <h2 className=''>
                            Evento não encontrado
                        </h2>
                    </div>
                )}
            </form>
        </section>
    )
}
