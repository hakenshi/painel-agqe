import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import DashboardTable from "@/components/dashboard/dashboard-table";
import { projectColumns } from "./columns";
import CreateProjectForm from "./form";
import { FolderPlus } from "lucide-react";
import { projectsSchema } from "@/db/schema";

export default async function ProjetosPage() {
  // TODO: Implementar getAllProjects quando a action estiver pronta
  const projects: typeof projectsSchema.$inferSelect[] = [];

  return (
    <DashboardShell>
      <DashboardHeader action={<><FolderPlus /> Criar Projeto</>} title="Projetos" description="Gerencie os projetos da ONG.">
        <CreateProjectForm />
      </DashboardHeader>
      <DashboardTable data={projects} columns={projectColumns} filterColumns={['projectType', 'status']} />
    </DashboardShell>
  );
}
