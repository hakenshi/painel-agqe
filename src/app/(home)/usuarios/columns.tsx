'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usersSchema } from "@/db/schema"
import { ColumnDef } from "@tanstack/react-table"
import { UserIcon } from "lucide-react"

export const userColumns: ColumnDef<typeof usersSchema.$inferSelect>[] = [
    {
        header: "Foto",
        accessorKey: 'photo',
        cell: ({ row }) => (
            <div className="flex justify-center items-center">
                <Avatar className='size-12'>
                    <AvatarImage className='object-cover' src={row.original.photo} />
                    <AvatarFallback>
                        <div className='bg-zinc-300 rounded-full p-3'>
                            <UserIcon />
                        </div>
                    </AvatarFallback>
                </Avatar>
            </div>
        )
    },
    {
        header: 'Nome',
        accessorKey: "firstName",
        cell: ({ row }) => `${row.original.firstName} ${row.original.secondName}`
    },
    {
        header: "Cpf",
        accessorKey: "cpf"
    },
    {
        header: "Ocupação",
        accessorKey: "occupation",
    },
    {
        header: "Data de Nascimento",
        accessorKey: "birthDate",
        cell: ({ row }) => new Intl.DateTimeFormat('pt-br', { dateStyle: "short" }).format(new Date(row.original.birthDate))
    },
    {
        header: "Data de admissão",
        accessorKey: "joinedAt",
        cell: ({ row }) => new Intl.DateTimeFormat('pt-br', { dateStyle: "short" }).format(new Date(row.original.joinedAt))
    },
    {
        header: "Última atualização",
        accessorKey: "updatedAt",
        cell: ({ row }) => new Intl.DateTimeFormat('pt-br', {
            dateStyle: "short",
            timeStyle: "short"
        }).format(new Date(row.original.joinedAt))
    }
]