import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { UserIcon } from 'lucide-react'

export default function TableIcon({ photo }: { photo: string | null }) {
    return (
        <div className="flex justify-center items-center">
            <Avatar className='size-12'>
                <AvatarImage className='object-cover' src={photo ?? undefined} />
                <AvatarFallback>
                    <div className='bg-zinc-300 rounded-full p-3'>
                        <UserIcon />
                    </div>
                </AvatarFallback>
            </Avatar>
        </div>
    )
}
