'use client'
import Projeto from "@/components/projeto"
import { useEffect, useState } from "react"

export default function NovoProjeto() {

    const [projectData, setProjectData] = useState<Project | null>(null)

    useEffect(() => {
        if (!projectData) {
            const projectTemporaryData = sessionStorage.getItem('project_data')
            setProjectData(projectTemporaryData ? JSON.parse(projectTemporaryData as string) : null)
        }
    }, [projectData])
    
    return (
        <section className="bg-white">
            <Projeto projectData={projectData} />
        </section>
    )
}
