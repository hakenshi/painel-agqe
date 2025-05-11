import { getFileURL } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Icon from "./icon";

export default async function Header() {

    return (
        <header className="border-zinc-200 col-span-2 row-span-1 h-fit">
            <nav className="py-3 mx-5 flex justify-between items-center">
                <div className="flex items-center w-full gap-3">
                    <Image width={75} height={75} alt="teste" src={getFileURL("icons/icon-transparent.png")} />
                    <span className="font-medium text-pink-600">Painel AGQE</span>
                </div>
                <div className="flex gap-5 w-full justify-end items-center">
                    <Button> <SearchIcon /> Buscar</Button>
                    <div>
                        <Icon />
                    </div>
                </div>
            </nav>
        </header>

    )
}
