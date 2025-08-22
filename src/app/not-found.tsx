import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <FileQuestion className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Página não encontrada
        </h2>
        <p className="text-gray-600 mb-6">
          A página do painel administrativo que você está procurando não existe.
        </p>
        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href="/home">Voltar ao dashboard</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/login">Fazer login</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}