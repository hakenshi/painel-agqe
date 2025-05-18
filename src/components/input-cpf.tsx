import React from 'react'
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import { Input } from './ui/input';

export const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

export function isValidCPF(cpf: string) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let sum = 0, rest;
    for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    rest = (sum * 10) % 11;
    if ((rest === 10) || (rest === 11)) rest = 0;
    if (rest !== parseInt(cpf.substring(9, 10))) return false;
    sum = 0;
    for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    rest = (sum * 10) % 11;
    if ((rest === 10) || (rest === 11)) rest = 0;
    if (rest !== parseInt(cpf.substring(10, 11))) return false;
    return true;
}

function maskCPF(value: string) {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
        .slice(0, 14);
}


export default function InputCPF<T extends FieldValues>({ field }: { field: ControllerRenderProps<T> }) {
    return (
        <Input placeholder="CPF"
            {...field}
            value={field.value}
            onChange={e => field.onChange(maskCPF(e.target.value))}
            maxLength={14} />
    )
}

