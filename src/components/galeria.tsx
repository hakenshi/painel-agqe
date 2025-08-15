'use client'

import { useState } from "react"
import ImagePreview from "./image-preview"
import { Button } from "./ui/button"
import { PlusIcon, SaveIcon } from "lucide-react"

export default function Galeria({ eventData }: { eventData: EventData | null }) {
  const [images, setImages] = useState<File[]>([])

  const addImage = (file: File) => {
    setImages(prev => [...prev, file])
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  if (!eventData) {
    return (
      <div className='h-[75vh] flex items-center justify-center'>
        <h2>Evento não encontrado</h2>
      </div>
    )
  }

  return (
    <div className="px-4 lg:px-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {eventData.name} - Galeria
        </h1>
        <p className="text-gray-600">
          Adicione imagens para a galeria do evento
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <ImagePreview url={URL.createObjectURL(image)} />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => removeImage(index)}
            >
              ×
            </Button>
          </div>
        ))}
        
        <div className="flex items-center justify-center">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                const files = Array.from(e.target.files || [])
                files.forEach(addImage)
              }}
            />
            <div className="size-96 bg-zinc-200 border-zinc-300 border-2 border-dashed rounded-xl flex items-center justify-center hover:bg-zinc-300 transition-colors">
              <div className="text-center">
                <PlusIcon className="w-16 h-16 text-zinc-400 mx-auto mb-2" />
                <p className="text-zinc-600">Adicionar Imagens</p>
              </div>
            </div>
          </label>
        </div>
      </div>

      <div className="text-center">
        <Button>
          <SaveIcon />
          Salvar Galeria
        </Button>
      </div>
    </div>
  )
}