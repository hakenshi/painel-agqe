import { getFileURL } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Icon from "./icon";

export default async function Header() {


    return (
        <header className="border-b border-zinc-200">
            <nav className="p-5 mx-15 flex justify-between items-center">
                <div>
                    <Image width={50} height={50} alt="teste" src={getFileURL("icons/icon-transparent.png")} />
                </div>
                {/* <div className="inline-flex gap-5 text-sm text-pink-600">
                    <Link
                    href={"/home"}
                    className={`inline-flex items-center gap-1 ${isActive("/home") ? "font-bold" : "font-medium"}`}
                    >
                    <span>Home</span>
                    </Link>
                    <Link
                    href={"/usuarios"}
                    className={`inline-flex items-center gap-1 ${isActive("/usuarios") ? "font-bold" : "font-medium"}`}
                    >
                    <span>Usuários</span>
                    </Link>
                    <Link
                    href={"/eventos"}
                    className={`inline-flex items-center gap-1 ${isActive("/eventos") ? "font-bold" : "font-medium"}`}
                    >
                    <span>Eventos</span>
                    </Link>
                    <Link
                    href={"/doacoes"}
                    className={`inline-flex items-center gap-1 ${isActive("/doacoes") ? "font-bold" : "font-medium"}`}
                    >
                    <span>Doações</span>
                    </Link>
                    <Link
                    href={"/apoiadores"}
                    className={`inline-flex items-center gap-1 ${isActive("/apoiadores") ? "font-bold" : "font-medium"}`}
                    >
                    <span>Apoiadores</span>
                    </Link>
                    </div> */}
                <div className="flex gap-5 w-full justify-end">
                    <Button> <SearchIcon /> Buscar</Button>
                    <div>
                        <Icon />
                    </div>
                </div>
            </nav>
        </header>

    )
}
