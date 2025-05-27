'use client'

import React from 'react'
import { Input } from './ui/input'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'

interface TimePickerProps<T extends FieldValues> {
    field: ControllerRenderProps<T>
}

export default function TimePicker<T extends FieldValues>({ field }: TimePickerProps<T>) {

    const formatTime = (value: string) => {
        const digits = value.replace(/\D/g, '')
        let hours = digits.slice(0, 2)
        let minutes = digits.slice(2, 4)
        
        // Limitar horas a 23
        if (parseInt(hours) > 23) {
            hours = '23'
        }
        
        // Limitar minutos a 59
        if (parseInt(minutes) > 59) {
            minutes = '59'
        }
        
        if (digits.length >= 2) {
            return `${hours}:${minutes}`
        }
        return digits
    }

    return (
        <Input {...field} placeholder='00:00' value={field.value} onChange={e => field.onChange(formatTime(e.target.value))} />
    )
}
