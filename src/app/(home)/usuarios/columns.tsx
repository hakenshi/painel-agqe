'use client'

import { deleteUser } from "@/actions/user"
import DashboardTableActions from "@/components/dashboard/dashboard-table-actions"
import TableIcon from "@/components/table-icon"
import { ColumnDef } from "@tanstack/react-table"
import UpdateUserForm from "./update-form"


export const userColumns: ColumnDef<User>[] = [
    {
        header: "Foto",
        accessorKey: 'photo',
        cell: ({ row: { original: { photo } } }) => (
            <TableIcon photo={photo} />
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
    },
    {
        header: "",
        accessorKey: "actions",
        cell: ({ row }) => {
            const { id } = row.original

            return (
                <DashboardTableActions
                    updateForm={<UpdateUserForm data={row.original} id={id} />}
                    id={id}
                    deleteFn={async () => {
                        await deleteUser(id);
                        return;
                    }} />
            )
        }
    }
]
