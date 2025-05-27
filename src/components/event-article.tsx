'use client'

import Link from "next/link"
import Markdown from "react-markdown"
import remarkGfm from 'remark-gfm'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { buttonVariants } from "./ui/button"

export default function EventArticle() {

    const text = `# Heading 1
## Heading 2
### Heading 3

**Bold text** and *italic text* and ***bold italic text***

Here is a paragraph with some text. This demonstrates how paragraphs are rendered in markdown.

## Lists

### Unordered List
- First item
- Second item
- Third item
  - Nested item
  - Another nested item

### Ordered List
1. First numbered item
2. Second numbered item
3. Third numbered item

## Links and Images
[This is a link](https://example.com)

## Code

Inline \`code\` example.

Here is some JavaScript code:

~~~js
console.log('It works!')
~~~

## Blockquotes

> This is a blockquote. It can span multiple lines and is useful for highlighting important information or quotes.

## Tables

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

## Horizontal Rule

---

## Strikethrough

~~This text is strikethrough~~

## Line Breaks

This is the first line  
This is the second line with a line break above`


    return (
        <article className="prose prose-sm sm:prose-base max-w-none prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-800">
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
                        <Link href={href || '#'} className={buttonVariants({variant: "link"})}>
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
                {text}
            </Markdown>
        </article>
    )
}
