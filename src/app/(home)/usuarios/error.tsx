'use client'

import { ErrorBoundary } from "@/components/error/error-boundary"

export default function UsersError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="p-6">
      <ErrorBoundary 
        error={error}
        reset={reset}
        title="Erro ao carregar usuários"
        message="Não foi possível carregar a lista de usuários do sistema."
      />
    </div>
  )
}