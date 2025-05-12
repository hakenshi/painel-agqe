import { SearchIcon, FilterIcon } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export default function DashboardTable() {
    return (
        <div className="inline-flex w-full gap-3">
            <div className="relative flex-1">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input className="pl-8 w-full" />
            </div>
            <Button>Ocupação</Button>
            <Button></Button>
            <Button><FilterIcon /></Button>
        </div>
    )
}
