'use client'

import { deleteSponsor } from "@/actions/sponsors";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import { ImageIcon } from "lucide-react";
import DashboardTableActions from "@/components/dashboard/dashboard-table-actions";
import UpdateSponsorForm from "./update-form";
import { toast } from "sonner";
import { getFileURL } from "@/lib/utils";

export const sponsorColumns: ColumnDef<Sponsor>[] = [
    {
        header: "Logo",
        accessorKey: 'logo',
        cell: ({ row }) => (
            <div className="flex justify-center items-center">
                <Avatar className='size-12'>
                    <AvatarImage className='object-contain p-1' src={getFileURL(row.original.logo)} alt={row.original.name} />
                    <AvatarFallback>
                        <div className='bg-zinc-300 rounded-full p-3'>
                            <ImageIcon />
                        </div>
                    </AvatarFallback>
                </Avatar>
            </div>
        )
    },
    {
        header: 'Nome',
        accessorKey: "name",
    },
    {
        header: "Website",
        accessorKey: "website",
        cell: ({ row }) => (
            row.original.website
        )
    },
    {
        header: "Patrocina Desde",
        accessorKey: "sponsoringSince",
        cell: ({ row }) => new Intl.DateTimeFormat('pt-BR', { dateStyle: "short" }).format(new Date(row.original.sponsoringSince))
    },
    {
        header: "Última atualização",
        accessorKey: "updatedAt",
        cell: ({ row }) =>
            new Intl.DateTimeFormat('pt-BR', {
                dateStyle: "short",
                timeStyle: "short"
            }).format(new Date(row.original.updatedAt))

    },
    {
        header: "",
        accessorKey: "actions",
        cell: ({ row }) => {
            const { id } = row.original;

            return (
                <DashboardTableActions
                    updateForm={<UpdateSponsorForm sponsor={row.original} />}
                    id={id}
                    deleteFn={async () => {
                        try {
                            await deleteSponsor(id);
                            toast.success("Apoiador excluído com sucesso!");
                        } catch {
                            toast.error("Erro ao excluir apoiador");
                        }
                    }}
                />
            );
        }
    }
];
