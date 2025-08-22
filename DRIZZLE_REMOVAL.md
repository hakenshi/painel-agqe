# Remoção do Drizzle ORM

## Arquivos Removidos

### Painel (painel-agqe)
- `src/db/` - Diretório completo do banco de dados
- `drizzle/` - Migrações do Drizzle
- `drizzle.config.ts` - Configuração do Drizzle

### Site Público (agqe.org)
- `src/db/` - Diretório completo do banco de dados
- `drizzle/` - Migrações do Drizzle
- `drizzle.config.ts` - Configuração do Drizzle

## Dependências Removidas

### package.json
- `drizzle-orm`
- `drizzle-kit`
- `pg`
- `@types/pg`

### Scripts Removidos
- `db:generate`
- `db:migrate`
- `db:studio`
- `db:seed`

## Substituições Realizadas

### Tipos TypeScript
Criados arquivos `src/types/api.d.ts` com interfaces globais:
- `User`
- `Sponsor`
- `Event`
- `EventImage`
- `Project`
- `Donation`

### Importações Removidas
Todas as importações `from "@/db/schema"` foram removidas automaticamente.

### Referências aos Schemas
Substituídas automaticamente:
- `typeof usersSchema.$inferSelect` → `User`
- `typeof eventsSchema.$inferSelect` → `Event`
- `typeof projectsSchema.$inferSelect` → `Project`
- `typeof sponsorsSchema.$inferSelect` → `Sponsor`

## Verificação

Executados comandos para confirmar remoção completa:
```bash
grep -r "drizzle|@/db" src/
```

Resultado: Nenhuma referência encontrada em ambos os projetos.

## Próximos Passos

1. Instalar dependências atualizadas: `npm install`
2. Configurar variável `NEXT_PUBLIC_API_URL` no `.env`
3. Garantir que a API Laravel está implementando todos os endpoints necessários
4. Testar todas as funcionalidades migradas