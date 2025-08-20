import { CalendarIcon, CircleDollarSignIcon, FolderIcon, HandshakeIcon, LayoutDashboardIcon, UsersIcon } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from './ui/button'

export default function Sidebar() {
    return (
        <aside className='h-full row-span-1 col-start-1 row-start-2 lg:row-start-2'>
            <nav className='px-2 sm:px-3 h-full w-full'>
                <ul className='text-primary pt-4 lg:pt-10 w-full flex lg:flex-col gap-2 lg:gap-4 overflow-x-auto lg:overflow-x-visible'>
                    <li className="flex-shrink-0 lg:w-full">
                        <Link className={buttonVariants({ variant: "ghost" }) + " w-full inline-flex justify-center lg:justify-start gap-2 lg:gap-3 px-2 lg:px-4"} href={"/home"}>
                            <LayoutDashboardIcon className="w-5 h-5" /> <span className='font-medium hidden lg:inline'>Painel</span>
                        </Link>
                    </li>
                    <li className="flex-shrink-0 lg:w-full">
                        <Link className={buttonVariants({ variant: "ghost" }) + " w-full inline-flex justify-center lg:justify-start gap-2 lg:gap-3 px-2 lg:px-4"} href={"/usuarios"}>
                            <UsersIcon className="w-5 h-5" /> <span className='font-medium hidden lg:inline'>Usuários</span>
                        </Link>
                    </li>
                    <li className="flex-shrink-0 lg:w-full">
                        <Link className={buttonVariants({ variant: "ghost" }) + " w-full inline-flex justify-center lg:justify-start gap-2 lg:gap-3 px-2 lg:px-4"} href={"/doacoes"}>
                            <CircleDollarSignIcon className="w-5 h-5" /> <span className='font-medium hidden lg:inline'>Doações</span>
                        </Link>
                    </li>
                    <li className="flex-shrink-0 lg:w-full">
                        <Link className={buttonVariants({ variant: "ghost" }) + " w-full inline-flex justify-center lg:justify-start gap-2 lg:gap-3 px-2 lg:px-4"} href={"/eventos"}>
                            <CalendarIcon className="w-5 h-5" /> <span className='font-medium hidden lg:inline'>Eventos</span>
                        </Link>
                    </li>
                    <li className="flex-shrink-0 lg:w-full">
                        <Link className={buttonVariants({ variant: "ghost" }) + " w-full inline-flex justify-center lg:justify-start gap-2 lg:gap-3 px-2 lg:px-4"} href={"/projetos"}>
                            <FolderIcon className="w-5 h-5" /> <span className='font-medium hidden lg:inline'>Projetos</span>
                        </Link>
                    </li>
                    <li className="flex-shrink-0 lg:w-full">
                        <Link className={buttonVariants({ variant: "ghost" }) + " w-full inline-flex justify-center lg:justify-start gap-2 lg:gap-3 px-2 lg:px-4"} href={"/apoiadores"}>
                            <HandshakeIcon className="w-5 h-5" /> <span className='font-medium hidden lg:inline'>Apoiadores</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}
