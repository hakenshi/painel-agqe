"use client";

import { eventsSchema } from "@/db/schema";
import { ColumnDef } from "@tanstack/react-table";

export const eventColumns: ColumnDef<typeof eventsSchema.$inferSelect>[] = [
	{
		header: "Nome do Evento",
		accessorKey: "name",
	},
	{
		header: "Tipo",
		accessorKey: "eventType",
	},
	{
		header: "Data",
		accessorKey: "date",
		cell: ({ row: { original } }) => {
			const date = original.date;
			const startingTime = original.startingTime;
			const endingTime = original.endingTime;
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
				id
			);
		},
	},
];
