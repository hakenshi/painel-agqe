import { getAllSponsors } from "@/actions/sponsors";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import DashboardTable from "@/components/dashboard/dashboard-table";
import { sponsorColumns } from "./columns";
import CreateSponsorForm from "./create-form";

export const dynamic = 'force-dynamic';

export default async function ApoiadoresPage() {

  const sponsors = await getAllSponsors()

  return (
    <DashboardShell>
      <div className="flex flex-col sm:flex-row items-start sm:items-center w-full justify-between gap-4">
        <div>
          <h2 className="font-medium text-lg sm:text-xl">Apoiadores</h2>
          <p className="text-sm text-zinc-500">Organizar, listar e cadastrar apoiadores.</p>
        </div>
        <CreateSponsorForm />
      </div>
      <DashboardTable filterColumns={['']} columns={sponsorColumns} data={sponsors} />
    </DashboardShell>
  )
}
