'use client'
import { createProject, updateProject } from '@/actions/projects'
import ProjectUpdateForm from '@/app/(home)/projetos/update-form'
import ImagePreview from '@/components/image-preview'
import { AutosizeTextarea } from '@/components/ui/auto-resize-textarea'
import { Button, buttonVariants } from '@/components/ui/button'
import { ClockIcon, EyeIcon, MapIcon, MapPinIcon, PencilIcon, SaveIcon, Table, UsersIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { toast } from 'sonner'
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { useRouter } from 'next/navigation'

export default function Projeto({ projectData }: { projectData: Project | null }) {
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(!projectData?.coverImage)
    const [markdown, setMarkdown] = useState(projectData?.markdown)
    const [currentProject, setCurrentProject] = useState<Project | null>(null)

    const updateProjectData = (updates: Partial<Project>) => {
        setCurrentProject((prev) => prev ? { ...prev, ...updates } : null)
    }

    useEffect(() => {
        if (projectData) {
            setCurrentProject(projectData)
        }
    }, [projectData])

    async function submit() {
        const formData = new FormData()

        if (!currentProject) {
            toast.error("Informações sobre o projeto não estão presentes")
            return
        }

        Object.entries(currentProject).forEach(([key, value]) => {
            if (value != null) {
                formData.append(key, String(value))
            }
        })

        try {
            let result
            if (currentProject.id) {
                result = await updateProject(String(currentProject.id), formData)
                console.log("updateProject result:", result)
            } else {
                result = await createProject(formData)
                console.log("createProject result:", result)
            }

            if (result.success) {
                toast.success(result.message || "Projeto salvo com sucesso")
                if (result.project) {
                    setCurrentProject(result.project)
                    router.push("/projetos")
                }
            } else {
                toast.error(result.message || "Erro ao salvar projeto")
            }
        } catch {
            toast.error("Erro ao salvar projeto")
        }
    }

    const statusMap = {
        planning: "Planejamento",
        active: "Ativo",
        completed: "Concluído",
        archived: "Arquivado"
    }

    const typeMap = {
        social: "Social",
        educational: "Educacional",
        environmental: "Ambiental",
        cultural: "Cultural",
        health: "Saúde"
    }

    return (
        <div className="px-4 lg:px-6 relative">
            {currentProject ? (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-4 bg-gradient-to-r from-pink-50 to-pink-100 p-6 rounded-xl border border-pink-200">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">

                            <div className="flex-1">
                                <p className="text-sm uppercase text-pink-600 font-semibold mb-2">
                                    Projeto {typeMap[currentProject.projectType as keyof typeof typeMap] || currentProject.projectType}
                                </p>
                                <h1 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-4">
                                    {currentProject.name}
                                </h1>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                    <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full">
                                        {statusMap[currentProject.status as keyof typeof statusMap] || currentProject.status}
                                    </span>
                                    {currentProject.responsibles && (
                                        <span className="flex items-center">
                                            <UsersIcon className="w-4 mr-1" />
                                            {currentProject.responsibles}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {currentProject.id && (
                                    <ProjectUpdateForm onUpdate={updateProjectData} project={currentProject as Project} />
                                )}
                                <Button type='button' onClick={submit} className="bg-pink-600 hover:bg-pink-700">
                                    <SaveIcon /> Salvar
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar com informações */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                            <div className="flex items-center justify-center w-full h-96">
                                <ImagePreview url={currentProject.coverImage} />
                            </div>
                            {(currentProject.location || currentProject.date || currentProject.startingTime && currentProject.endingTime) && <h3 className="font-semibold text-gray-800 my-3">Detalhes</h3>}
                            <div className="space-y-3 text-sm">
                                {currentProject.location && (
                                    <div className="flex items-start">
                                        <MapPinIcon className="w-4 mr-2 text-pink-600 mt-0.5" />
                                        <span className="text-gray-600">{currentProject.location}</span>
                                    </div>
                                )}
                                {currentProject.date && (
                                    <div className="flex items-start">
                                        <MapIcon className="w-4 mr-2 text-pink-600 mt-0.5" />
                                        <span className="text-gray-600">
                                            {new Date(currentProject.date).toLocaleDateString("pt-BR", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>
                                )}
                                {currentProject.startingTime && currentProject.endingTime && (
                                    <div className="flex items-start">
                                        <ClockIcon className="w-4 mr-2 text-pink-600 mt-0.5" />
                                        <span className="text-gray-600">
                                            {currentProject.startingTime} - {currentProject.endingTime}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>


                    </div>

                    {/* Conteúdo principal */}
                    <div className="lg:col-span-3">
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-gray-800">Descrição do Projeto</h3>
                                {!isEditing ?
                                    <Button type="button" variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                                        <PencilIcon className="w-4" /> Editar
                                    </Button> :
                                    <Button type="button" variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                                        <EyeIcon className="w-4" /> Visualizar
                                    </Button>
                                }
                            </div>
                            <article className="prose prose-sm sm:prose-base max-w-none prose-p:text-gray-700">
                                {isEditing ? (
                                    <AutosizeTextarea
                                        value={markdown as string}
                                        onChange={(e) => {
                                            setMarkdown(e.target.value)
                                            updateProjectData({ markdown: e.target.value })
                                        }}
                                        className="min-h-[400px]"
                                    />
                                ) : (
                                    <Markdown
                                        skipHtml
                                        components={{
                                            code: ({ className, children, ...props }) => {
                                                const isInline = !className;
                                                if (isInline) {
                                                    return (
                                                        <code className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-sm font-mono" {...props}>
                                                            {children}
                                                        </code>
                                                    );
                                                }
                                                return (
                                                    <code className="block bg-gray-700 text-gray-100 p-4 rounded-lg overflow-x-auto font-mono text-sm" {...props}>
                                                        {children}
                                                    </code>
                                                );
                                            },
                                            pre: ({ children }) => <div className="my-4">{children}</div>,
                                            h1: ({ children }) => <h1 className="text-3xl font-bold text-gray-700 mb-4">{children}</h1>,
                                            h2: ({ children }) => <h2 className="text-2xl font-semibold text-gray-700 mb-3">{children}</h2>,
                                            h3: ({ children }) => <h3 className="text-xl font-medium text-gray-700 mb-2">{children}</h3>,
                                            blockquote: ({ children }) => (
                                                <blockquote className="border-l-4 border-primary pl-4 italic text-gray-600 my-4">
                                                    {children}
                                                </blockquote>
                                            ),
                                            ul: ({ children }) => <ul className="list-disc pl-6 my-4 space-y-1">{children}</ul>,
                                            ol: ({ children }) => <ol className="list-decimal pl-6 my-4 space-y-1">{children}</ol>,
                                            li: ({ children }) => <li className="text-gray-700">{children}</li>,
                                            a: ({ href, children }) => (
                                                <Link href={href || '#'} className={buttonVariants({ variant: "link" })}>
                                                    {children}
                                                </Link>
                                            ),
                                            table: ({ children }) => <div className="border rounded p-2"><Table>{children}</Table></div>,
                                            tbody: ({ children }) => <TableBody>{children}</TableBody>,
                                            thead: ({ children }) => <TableHeader>{children}</TableHeader>,
                                            th: ({ children }) => <TableHead>{children}</TableHead>,
                                            tr: ({ children }) => <TableRow>{children}</TableRow>,
                                            td: ({ children }) => <TableCell>{children}</TableCell>,
                                        }}
                                        remarkPlugins={[remarkGfm]}>
                                        {markdown}
                                    </Markdown>
                                )}
                            </article>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='h-[75vh] flex items-center justify-center'>
                    <h2>
                        Projeto não encontrado
                    </h2>
                </div>
            )}
        </div>
    )
}