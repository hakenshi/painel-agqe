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
        <div className="inline-flex items-center w-full justify-between">
            <div>
                <h2 className="font-medium text-xl">{title}</h2>
                <p className="text-sm text-zinc-500">{description}</p>
            </div>
            <Dialog>
                <DialogTrigger className={buttonVariants({ variant: "default" })}>
                    {action}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Cadastrar {title}</DialogTitle>
                    </DialogHeader>
                    {children}
                </DialogContent>
            </Dialog>
        </div>
    )
}
