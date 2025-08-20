"use client";

import TableIcon from "@/components/table-icon";
import { Button, buttonVariants } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon, PencilIcon, TrashIcon } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { toast } from "sonner";
import Link from "next/link";

// TODO: Definir tipo do projeto quando schema estiver pronto
type Project = {
  id: number;
  name: string;
  coverImage: string;
  type: string;
  status: string;
  responsibles: string;
  location?: string;
  date?: string;
  updatedAt: string;
  slug: string;
};

export const projectColumns: ColumnDef<Project>[] = [
	{
		header: "",
		accessorKey: "coverImage",
		cell: ({ row: { original: { coverImage } } }) => {
			return (
				<TableIcon photo={coverImage} />
			)
		}
	},
	{
		header: "Nome do Projeto",
		accessorKey: "name",
	},
	{
		header: "Tipo",
		accessorKey: "type",
	},
	{
		header: "Status",
		accessorKey: "status",
		cell: ({ row }) => {
			const status = row.original.status;
			const statusMap = {
				planning: "Planejamento",
				active: "Ativo",
				completed: "Concluído",
				archived: "Arquivado"
			};
			return statusMap[status as keyof typeof statusMap] || status;
		},
	},
	{
		header: "Responsáveis",
		accessorKey: "responsibles",
	},
	{
		header: "Data",
		accessorKey: "date",
		cell: ({ row: { original } }) => {
			const date = original.date;
			if (!date) return "N/A";
			return <div>
				{new Intl.DateTimeFormat("pt-BR", {
					dateStyle: "short",
				}).format(new Date(date))}
			</div>;
		},
	},
	{
		header: "Localização",
		accessorKey: "location",
	},
	{
		header: "Última atualização",
		accessorKey: "updatedAt",
		cell: ({ row }) => {
			const updatedAt = row.original.updatedAt;
			if (!updatedAt) return "N/A";
			return new Intl.DateTimeFormat("pt-BR", {
				dateStyle: "short",
				timeStyle: "short",
			}).format(new Date(updatedAt));
		},
	},
	{
		header: "",
		accessorKey: "actions",
		cell: ({ row }) => {
			const { id, eventType, slug } = row.original;

			return (
				<div className="space-x-3">
					<Link className={buttonVariants({ variant: "outline" })} target="_blank" href={`${process.env.NEXT_PUBLIC_MAIN_SITE}/projetos/${slug}`}>
						<EyeIcon />
					</Link>
					<Link href={`/projetos/editar/${id}`} className={buttonVariants({variant: "informative"})}>
						<PencilIcon />
					</Link>
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="destructive">
								<TrashIcon />
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Confirmar exclusão</DialogTitle>
							</DialogHeader>
							<p>Tem certeza que deseja excluir este projeto?</p>
							<DialogFooter>
								<DialogClose className={buttonVariants({ variant: "outline" })}>Cancelar</DialogClose>
								<Button variant="destructive" onClick={async () => {
									// TODO: Implementar deleteProject
									// const { message, success } = await deleteProject(id)
									// if (success) {
									//   toast(message)
									// }
									toast("Funcionalidade em desenvolvimento")
								}}>
									Excluir
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			);
		},
	},
];
