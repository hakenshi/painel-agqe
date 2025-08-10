"use client";

import TableIcon from "@/components/table-icon";
import { Button, buttonVariants } from "@/components/ui/button";
import { eventsSchema } from "@/db/schema";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon, PencilIcon, TrashIcon } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { deleteEvent } from "@/actions/events";
import { toast } from "sonner";
import Link from "next/link";

export const eventColumns: ColumnDef<typeof eventsSchema.$inferSelect>[] = [
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
		header: "Nome do Evento",
		accessorKey: "name",
	},
	{
		header: "Tipo",
		accessorKey: "eventType",
	},
	{
		header: "Horário",
		accessorKey: "startingTime",
		cell: ({ row }) => {
			const startingTime = row.original.startingTime;
			const endingTime = row.original.endingTime;
			if (!startingTime || !endingTime) return "N/A";
			return `${startingTime} - ${endingTime}`;
		},
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
					<Link className={buttonVariants({ variant: "outline" })} target="_blank" href={eventType === "event" || eventType === "event_gallery" ? `${process.env.NEXT_PUBLIC_MAIN_SITE}/eventos/${slug}` : `${process.env.NEXT_PUBLIC_MAIN_SITE}/eventos/${slug}/galeria`}>
						<EyeIcon />
					</Link>
					<Link href={`/eventos/editar/${id}`} className={buttonVariants({variant: "informative"})}>
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
							<p>Tem certeza que deseja excluir este evento?</p>
							<DialogFooter>
								<DialogClose className={buttonVariants({ variant: "outline" })}>Cancelar</DialogClose>
								<Button variant="destructive" onClick={async () => {
									const { message, success } = await deleteEvent(id)
									if (success) {
										toast(message)
									}
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
