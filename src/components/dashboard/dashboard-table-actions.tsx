import { Pencil, Trash } from 'lucide-react'
import { ReactNode } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'

interface DashboardTableActionsProps {
    updateForm: ReactNode
    deleteFn: VoidFunction
}

export default function DashboardTableActions({ deleteFn, updateForm }: DashboardTableActionsProps) {
    return (
        <>
            <div className="flex items-center space-x-2"></div>
            {/* Update Dialog */}
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar</DialogTitle>
                    </DialogHeader>
                    {updateForm}
                </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" size="icon" className="text-destructive hover:text-destructive/80">
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirmar Exclusão</DialogTitle>
                        <DialogDescription>
                            Tem certeza de que desja excluir esse item? Essa ação é irreversível.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button variant="destructive" onClick={deleteFn}>
                            Excluir
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
