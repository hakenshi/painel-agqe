import React, { PropsWithChildren } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { buttonVariants } from "../ui/button"

interface DasboardHeaderProps extends PropsWithChildren {
    title: string
    description: string
    action?: React.ReactNode
}

export default function DashboardHeader({ title, description, action, children }: DasboardHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center w-full justify-between gap-4">
            <div>
                <h2 className="font-medium text-lg sm:text-xl">{title}</h2>
                <p className="text-sm text-zinc-500">{description}</p>
            </div>
            <Dialog>
                <DialogTrigger className={buttonVariants({ variant: "default" }) + " w-full sm:w-auto"}>
                    {action}
                </DialogTrigger>
                <DialogContent className="w-[95vw] max-w-md">
                    <DialogHeader>
                        <DialogTitle>Cadastrar {title}</DialogTitle>
                    </DialogHeader>
                    {children}
                </DialogContent>
            </Dialog>
        </div>
    )
}
