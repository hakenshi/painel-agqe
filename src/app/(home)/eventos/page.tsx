import { getAllEvents } from "@/actions/events"; // Ajuste para a action correta de buscar eventos
import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import DashboardTable from "@/components/dashboard/dashboard-table";
import { eventColumns } from "./columns";

export default async function EventosPage() {

  const events = await getAllEvents(); // Ajuste para a action correta

  return (
    <DashboardShell>
      <DashboardHeader title="Eventos" description="Gerencie os eventos.">
        {/* <CreateEventForm /> */}
      </DashboardHeader>
      <DashboardTable data={events} columns={eventColumns} filterColumns={['eventType']} />
    </DashboardShell>
  );
}
