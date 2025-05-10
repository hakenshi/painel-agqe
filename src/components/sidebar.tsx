import { CircleDollarSignIcon, HouseIcon, LayoutDashboardIcon, UsersIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { buttonVariants } from './ui/button'

export default function Sidebar() {
    return (
        <aside className='h-full row-span-1 col-start-1 row-start-2'>
            <nav className='px-5 h-full w-full'>
                <ul className='text-primary pt-10 space-y-3 w-full gap-7'>
                    <li className="w-full">
                        <Link className={buttonVariants({ variant: "ghost" }) + " w-full inline-flex justify-start gap-3"} href={"/home"}>
                            <LayoutDashboardIcon /> <span className='font-medium'>Painel</span>
                        </Link>
                    </li>
                    <li className="w-full">
                        <Link className={buttonVariants({ variant: "ghost" }) + " w-full inline-flex justify-start gap-3"} href={"/home"}>
                            <UsersIcon /> <span className='font-medium'>Usuários</span>
                        </Link>
                    </li>
                    <li className="w-full">
                        <Link className={buttonVariants({ variant: "ghost" }) + " w-full inline-flex justify-start gap-3"} href={"/home"}>
                            <CircleDollarSignIcon /> <span className='font-medium'>Doações</span>
                        </Link>
                    </li>
                    <li className="w-full">
                        <Link className={buttonVariants({ variant: "ghost" }) + " w-full inline-flex justify-start gap-3"} href={"/home"}>
                            <HouseIcon /> <span className='font-medium'>Eventos</span>
                        </Link>
                    </li>
                    <li className="w-full">
                        <Link className={buttonVariants({ variant: "ghost" }) + " w-full inline-flex justify-start gap-3"} href={"/home"}>
                            <HouseIcon /> <span className='font-medium'>Apoiadores</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}
