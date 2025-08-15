import { getFileURL } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Icon from "./icon";
import Link from "next/link";

export default async function Header() {

    return (
        <header className="border-zinc-200 col-span-1 lg:col-span-2 row-span-1 h-fit">
            <nav className="py-3 mx-3 sm:mx-5 flex justify-between items-center">
                <Link href={"/"} className="flex items-center gap-2 sm:gap-3">
                    <Image width={500} height={500} className="sm:w-[75px] sm:h-[75px]" alt="teste" src={getFileURL("icons/icon-transparent.png")} />
                    <span className="font-medium text-pink-600 text-sm sm:text-base">Painel AGQE</span>
                </Link>
                <div className="flex gap-2 sm:gap-5 items-center">
                    <Button className="hidden sm:flex"> <SearchIcon /> Buscar</Button>
                    <Button size="icon" className="sm:hidden"> <SearchIcon /></Button>
                    <div>
                        <Icon />
                    </div>
                </div>
            </nav>
        </header>

    )
}
