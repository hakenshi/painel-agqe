'use client'

import { PlusCircleIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useRef, useState } from 'react'

export default function ImagePreview() {
    const fileRef = useRef<HTMLInputElement>(null)
    const [preview, setPreview] = useState<string | null>(null)

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setPreview(url)
        }
    }

    function handleClick() {
        fileRef.current?.click()
    }

    return (
        <button
            type="button"
            className="size-96 bg-zinc-200 border-zinc-300 transition-all ease-in-out duration-200 hover:bg-zinc-300 cursor-pointer border rounded-xl relative flex items-center justify-center group"
            onClick={handleClick}
        >
            <input
                ref={fileRef}
                type="file"
                accept="image/png"
                className="hidden"
                onChange={handleFileChange}
            />
            
            {preview ? (
                <>
                    <Image
                        src={preview}
                        alt="Preview"
                        className="object-cover w-full h-full rounded-xl"
                        width={400}
                        height={400}
                    />
                    <div className="absolute inset-0 bg-zinc-300/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl">
                        <PlusCircleIcon className="w-16 h-16 text-zinc-400" />
                    </div>
                </>
            ) : (
                <PlusCircleIcon className="w-16 h-16 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            )}
        </button>
    )
}
