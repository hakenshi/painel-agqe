'use client'

// import { deleteSponsor } from "@/actions/sponsors"; // Descomente quando a action existir
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import { ImageIcon } from "lucide-react";

export const sponsorColumns: ColumnDef<Sponsor>[] = [
    {
        header: "Logo",
        accessorKey: 'logo',
        cell: ({ row }) => (
            <div className="flex justify-center items-center">
                <Avatar className='size-12'>
                    <AvatarImage className='object-contain p-1' src={row.original.logo} alt={row.original.name} />
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
        // cell: ({ _ }) => {
            // const { id } = row.original;

            // return (
                // "xd"
                // <DashboardTableActions
                //     updateForm={<UpdateSponsorForm sponsor={row.original} />} // Corrigido: passando a prop 'sponsor'
                //     id={id}
                //     deleteFn={async () => { 
                //         // await deleteSponsor(id); // Implemente e descomente
                //         console.log("Delete function for sponsor ID:", id);
                //         // toast.info("Funcionalidade de deletar apoiador ainda não implementada.") // Removido toast daqui
                //     }}
                // />
            // );
        }
    // }
];
