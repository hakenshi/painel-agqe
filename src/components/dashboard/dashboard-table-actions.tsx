import { Trash } from 'lucide-react'
import { ReactNode, useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'

interface DashboardTableActionsProps {
    id: number
    updateForm: ReactNode
    deleteFn(id: number): Promise<void>
}

export default function DashboardTableActions({ deleteFn, updateForm, id }: DashboardTableActionsProps) {

    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    return (
        <div className="flex items-center gap-3">
            {/* Update Dialog */}
                    {updateForm}
            {/* Delete Dialog */}
            <Dialog onOpenChange={setIsDeleteOpen} open={isDeleteOpen} >
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
                        <Button
                            variant="destructive"
                            onClick={async () => {
                                await deleteFn(id);
                                setIsDeleteOpen(false);
                            }}
                        >
                            Excluir
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
