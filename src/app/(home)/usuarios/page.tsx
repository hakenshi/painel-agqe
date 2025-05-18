import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import DashboardTable from "@/components/dashboard/dashboard-table";
import { UserPlusIcon } from "lucide-react";
import { userColumns } from "./columns";
import { getAllUsers } from "@/actions/user";

export default async function UsuariosPage() {

  const users = await getAllUsers()

  return (
    <DashboardShell>
      <DashboardHeader
        description="Organizar, listar e cadastrar usuários."
        title="Usuários"
        action={<><UserPlusIcon /> Cadastrar Usuário</>}>
        xd
      </DashboardHeader>
      <DashboardTable filterColumns={['occupation']} columns={userColumns} data={users} />
    </DashboardShell>
  )
}
