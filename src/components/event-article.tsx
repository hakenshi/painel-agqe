'use client'

import { EyeIcon, PencilIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Markdown from "react-markdown"
import remarkGfm from 'remark-gfm'
import { AutosizeTextarea } from "./ui/auto-resize-textarea"
import { Button, buttonVariants } from "./ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

export default function EventArticle() {

    const [isEditing, setIsEditing] = useState(true)
    const [markdown, setMarkdown] = useState("")


    return (
        <article className="space-y-5 prose prose-sm sm:prose-base max-w-none prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-800">

            <div className="space-x-10 text-center">
                {!isEditing && <Button type="button" onClick={() => setIsEditing(true)}> <PencilIcon /> Editar Markdown</Button>}
                <Button type="button" onClick={() => setIsEditing(false)}><EyeIcon /> Preview</Button>
            </div>

            {isEditing ? (<AutosizeTextarea value={markdown} onChange={(e) => setMarkdown(e.target.value)}></AutosizeTextarea>) : <Markdown
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
            </Markdown>}
        </article>
    )
}
