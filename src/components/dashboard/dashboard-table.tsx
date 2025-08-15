'use client'

import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, FilterIcon, FilterXIcon, SearchIcon } from 'lucide-react'
import { useState } from 'react'
import { Button, buttonVariants } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Input } from '../ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

interface DashboardTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    filterColumns: string[]
}

export default function DashboardTable<TData, TValue>({ columns, data, filterColumns }: DashboardTableProps<TData, TValue>) {

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 9,
    })

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = useState('')

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        state: {
            pagination,
            columnFilters,
            globalFilter
        }
    })

    const columnName = filterColumns[0] ? table.getColumn(filterColumns[0])?.columnDef.header as string : ""
    const columnDef = filterColumns[0] ? table.getColumn(filterColumns[0])?.id as string : ""

    const filterData = columnDef
        ? [...new Set(data.map(d => d[columnDef as keyof TData]))]
        : [];

        const resetFilters = () => {
            table.getColumn(columnDef)?.setFilterValue('')
            setGlobalFilter('')
        }

    return (
        <>
            <div className='flex flex-col sm:flex-row gap-3'>
                <div className="relative flex-1 flex flex-col sm:flex-row gap-3 sm:gap-5">
                    <div className="relative flex-1">
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            value={globalFilter ?? ''}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            className="pl-8" />
                    </div>
                    {columnDef && (
                        <div className="flex gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger className={buttonVariants({ variant: 'default' }) + " flex-1 sm:flex-none"}>
                                    {columnName as string} <FilterIcon />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {filterData.map((fd, i) => (
                                        <DropdownMenuItem
                                            key={i}
                                            onClick={() => table.getColumn(columnDef)?.setFilterValue(fd)}
                                        >
                                            {fd as string}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button onClick={resetFilters} className="flex-1 sm:flex-none">
                                <FilterXIcon />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <div className='overflow-x-auto overflow-y-hidden h-[65.5vh] hide-scrollbar'>
                <Table className="min-w-full">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead className='text-center' key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell className='text-center py-2' key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeft /> Previous
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next <ChevronRight />
                </Button>
            </div>
        </>
    )
}