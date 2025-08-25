import { getAllEvents } from "@/actions/events"; // Ajuste para a action correta de buscar eventos
import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import DashboardTable from "@/components/dashboard/dashboard-table";
import { eventColumns } from "./columns";
import CreateEventForm from "./form";
import { CalendarPlus } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function EventosPage() {

  const events = await getAllEvents();

  return (
    <DashboardShell>
      <DashboardHeader action={<><CalendarPlus /> Criar Evento</>} title="Eventos" description="Gerencie os eventos.">
        <CreateEventForm />
      </DashboardHeader>
      <DashboardTable data={events as Event[]} columns={eventColumns} filterColumns={['eventType']} />
    </DashboardShell>
  );
}
