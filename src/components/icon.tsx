import { getAuthUser } from '@/actions/auth'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { UserIcon } from 'lucide-react'

export default async function Icon() {

    const user = await getAuthUser()

    return (
        <Avatar className='size-12'>
            <AvatarImage className='object-cover' src={(user as User)?.photo || ""} />
            <AvatarFallback>
                <div className='bg-zinc-300 rounded-full p-3'>
                    <UserIcon />
                </div>
            </AvatarFallback>
        </Avatar>
    )
}
