"use client";

import TableIcon from "@/components/table-icon";
import { Button } from "@/components/ui/button";
import { eventsSchema } from "@/db/schema";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon, PencilIcon, TrashIcon } from "lucide-react";

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
			const { id } = row.original;

			return (
				<div className="space-x-3">
					<Button>
						<EyeIcon />
					</Button>
					<Button>
						<PencilIcon />
					</Button>
					<Button>
						<TrashIcon />
					</Button>
				</div>
			);
		},
	},
];
