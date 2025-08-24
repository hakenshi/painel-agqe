'use client'

import DatePicker from '@/components/date-picker'
import TimePicker from '@/components/time-picker'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { UpdateProjectValues, updateProjectSchema } from '@/lib/zod/zod-projects-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { InfoIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

const projectTypes = [
  { type: "social", displayName: "Social" },
  { type: "educational", displayName: "Educacional" },
  { type: "environmental", displayName: "Ambiental" },
  { type: "cultural", displayName: "Cultural" },
  { type: "health", displayName: "Saúde" }
]

const projectStatus = [
  { type: "planning", displayName: "Planejamento" },
  { type: "active", displayName: "Ativo" },
  { type: "completed", displayName: "Concluído" },
  { type: "archived", displayName: "Arquivado" }
]

interface ProjectUpdateFormProps {
  onUpdate: (updates: Partial<Project>) => void
  project: Project
}

export default function ProjectUpdateForm({ onUpdate, project }: ProjectUpdateFormProps) {
  const form = useForm<UpdateProjectValues>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      name: project.name?.replace(/[<>"'&]/g, '') ?? "",
      projectType: project.projectType,
      status: project.status,
      responsibles: project.responsibles?.replace(/[<>"'&]/g, '') ?? "",
      location: project.location?.replace(/[<>"'&]/g, '') ?? "",
      date: project.date ? new Date(project.date) : undefined,
      starting_time: project.startingTime ?? "",
      ending_time: project.endingTime ?? "",
      markdown: project.markdown ?? ""
    },
  })

  function handleUpdate(values: UpdateProjectValues) {
    const sanitizedValues = {
      name: values.name?.replace(/[<>"'&]/g, ''),
      projectType: values.projectType,
      status: values.status,
      responsibles: values.responsibles?.replace(/[<>"'&]/g, ''),
      location: values.location?.replace(/[<>"'&]/g, ''),
      date: values.date?.toISOString().split('T')[0],
      startingTime: values.starting_time,
      endingTime: values.ending_time,
      markdown: values.markdown
    }
    onUpdate(sanitizedValues)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-pink-600 text-pink-600 hover:bg-pink-50">
          <InfoIcon /> Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Projeto</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className='space-y-6' onSubmit={form.handleSubmit(handleUpdate)}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Projeto</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Insira o nome do projeto'
                      {...field}
                      onChange={(e) => field.onChange(e.target.value.replace(/[<>"'&]/g, ''))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='responsibles'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Responsáveis</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Ex: João Silva, Maria Santos, Instituto XYZ'
                      {...field}
                      onChange={(e) => field.onChange(e.target.value.replace(/[<>"'&]/g, ''))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='projectType'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo do Projeto</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl className='w-full'>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo do projeto" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {projectTypes.map(({ type, displayName }) => (
                        <SelectItem key={type} value={type}>
                          {displayName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status do Projeto</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl className='w-full'>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {projectStatus.map(({ type, displayName }) => (
                        <SelectItem key={type} value={type}>
                          {displayName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='location'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localização</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Insira a localização do projeto'
                      {...field}
                      onChange={(e) => field.onChange(e.target.value.replace(/[<>"'&]/g, ''))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='date'
              render={({ field }) => (
                <DatePicker field={field} label='Data do Projeto (opcional)' />
              )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name='starting_time'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horário de Início (opcional)</FormLabel>
                    <TimePicker field={field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='ending_time'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horário de Término (opcional)</FormLabel>
                    <TimePicker field={field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="text-end">
              <DialogClose asChild>
                <Button type='submit'>
                  Atualizar Projeto
                </Button>
              </DialogClose>
            </div>
          </form>
        </Form>

      </DialogContent>
    </Dialog>
  )
}