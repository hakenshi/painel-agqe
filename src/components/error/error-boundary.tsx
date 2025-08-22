'use client'

import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface ErrorBoundaryProps {
  error?: Error
  reset?: () => void
  title?: string
  message?: string
}

export function ErrorBoundary({  
  reset, 
  title = "Erro no sistema",
  message = "Não foi possível carregar os dados. Tente novamente."
}: ErrorBoundaryProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-red-50">
      <AlertTriangle className="h-8 w-8 text-red-500 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{message}</p>
      {reset && (
        <Button onClick={reset} size="sm" variant="outline">
          Tentar novamente
        </Button>
      )}
    </div>
  )
}