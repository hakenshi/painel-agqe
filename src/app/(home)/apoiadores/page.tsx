import { getAllSponsors } from "@/actions/sponsors";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { UserPlusIcon } from "lucide-react";
import { sponsorColumns } from "./columns";
import DashboardTable from "@/components/dashboard/dashboard-table";

export default async function ApoiadoresPage() {
  
  const sponsors = await getAllSponsors()

  return (
    <DashboardShell>
      <DashboardHeader
        description="Organizar, listar e cadastrar apoiadores."
        title="Apoiadores"
        action={<><UserPlusIcon /> Cadastrar Apoiador</>}>
      </DashboardHeader>
      <DashboardTable filterColumns={['']} columns={sponsorColumns} data={sponsors} />
    </DashboardShell>
  )
}
