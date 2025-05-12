import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import DashboardTable from "@/components/dashboard/dashboard-table";
import { UserPlusIcon } from "lucide-react";

export default function UsuariosPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        description="Organizar, listar e cadastrar usuários."
        title="Usuários"
        action={<><UserPlusIcon /> Cadastrar Usuário</>}>
        xd
      </DashboardHeader>
      <DashboardTable />
    </DashboardShell >
  )
}
