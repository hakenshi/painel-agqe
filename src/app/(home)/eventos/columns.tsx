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
		cell: ({ row }) => {
			const date = row.original.date;
			if (!date) return "N/A";
			return new Intl.DateTimeFormat("pt-BR", {
				dateStyle: "long",
				timeStyle: "short",
			}).format(new Date(date));
		},
	},
	{
		header: "Localização",
		accessorKey: "location",
	},
	{
		header: "Slug",
		accessorKey: "slug",
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
	// {
	// 	header: "",
	// 	accessorKey: "actions",
	// 	cell: ({ row }) => {
	// 		const { id } = row.original;

	// 		return (
	// 			<DashboardTableActions
	// 				updateForm={<UpdateEventForm event={row.original} />} // Adicione o formulário de atualização
	// 				id={id}
	// 				deleteFn={async () => {
	// 					// Adicionado deleteFn (comentado para implementação futura)
	// 					// await deleteEvent(id); // Implemente e descomente
	// 					// return;
	// 					console.log("Delete function for event ID:", id);
	// 					toast.info("Funcionalidade de deletar evento ainda não implementada.");
	// 				}}
	// 				// itemName={row.original.name} // Mantenha comentado ou ajuste conforme necessário
	// 			/>
	// 		);
	// 	},
	// },
];
