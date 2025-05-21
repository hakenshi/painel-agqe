import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'
import { Button } from './ui/button'
import { FormControl, FormItem, FormLabel, FormMessage } from './ui/form'

interface DatePickerProps<T extends FieldValues> {
    field: ControllerRenderProps<T>
    label: string
}

function isValidDate(val: unknown): val is Date {
    return val instanceof Date && !isNaN(val.getTime())
}

export default function DatePicker<T extends FieldValues>({ field, label }: DatePickerProps<T>) {
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => 1900 + i)

    return (
        <FormItem className="flex flex-col">
            <FormLabel>{label}</FormLabel>
            <Popover>
                <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                            variant="outline"
                            className={cn(
                                "w-full pl-3 text-left font-normal",
                                !isValidDate(field.value) && "text-muted-foreground"
                            )}
                        >
                            {isValidDate(field.value) ? (
                                format(field.value, "PPP")
                            ) : (
                                <span>Escolha uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <div className="grid grid-cols-2 gap-2 px-3 pt-3">
                        <select
                            className="border rounded px-2 py-1 text-sm"
                            value={isValidDate(field.value) ? field.value.getFullYear() : currentYear}
                            onChange={e => {
                                const year = Number(e.target.value)
                                const date = isValidDate(field.value) ? field.value : new Date()
                                field.onChange(new Date(year, date.getMonth(), date.getDate()))
                            }}
                        >
                            {years.map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                        <select
                            className="border rounded px-2 py-1 text-sm"
                            value={isValidDate(field.value) ? field.value.getMonth() : new Date().getMonth()}
                            onChange={e => {
                                const month = Number(e.target.value)
                                const date = isValidDate(field.value) ? field.value : new Date()
                                field.onChange(new Date(date.getFullYear(), month, date.getDate()))
                            }}
                        >
                            {Array.from({ length: 12 }).map((_, i) => (
                                <option key={i} value={i}>{format(new Date(2000, i, 1), "MMMM")}</option>
                            ))}
                        </select>
                    </div>
                    <Calendar
                        mode="single"
                        selected={isValidDate(field.value) ? field.value : undefined}
                        onSelect={field.onChange}
                        disabled={date =>
                            date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        month={isValidDate(field.value) ? field.value : new Date()}
                    />
                </PopoverContent>
            </Popover>
            <FormMessage />
        </FormItem>
    )
}
