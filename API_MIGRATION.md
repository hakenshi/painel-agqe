# Migração para API Laravel

## Mudanças Realizadas

### 1. Cliente API (`src/lib/api.ts`)
- Criado cliente HTTP centralizado para comunicação com a API Laravel
- Gerenciamento automático de tokens de autenticação
- Suporte a FormData e JSON
- Tratamento de erros padronizado

### 2. Server Actions Atualizadas

#### Autenticação (`src/actions/auth.ts`)
- `login()`: Faz requisição POST para `/api/login`
- `getAuthUser()`: Faz requisição GET para `/api/me`
- `logout()`: Faz requisição POST para `/api/logout`
- Gerenciamento de cookies de autenticação

#### Projetos (`src/actions/projects.ts`)
- `getAllProjects()`: GET `/api/projects`
- `getProjectById(id)`: GET `/api/projects/{id}`
- `createProject(formData)`: POST `/api/projects`
- `updateProject(id, formData)`: PUT `/api/projects/{id}`
- `deleteProject(id)`: DELETE `/api/projects/{id}`

#### Eventos (`src/actions/events.ts`)
- `getAllEvents()`: GET `/api/events`
- `findEvent(id)`: GET `/api/events/{id}`
- `createEvent(formData)`: POST `/api/events`
- `updateEvent(id, formData)`: PUT `/api/events/{id}`
- `deleteEvent(id)`: DELETE `/api/events/{id}`

#### Usuários (`src/actions/user.ts`)
- `getAllUsers()`: GET `/api/users`
- `createUser(formData)`: POST `/api/users`
- `updateUser(id, formData)`: PUT `/api/users/{id}`
- `deleteUser(id)`: DELETE `/api/users/{id}`

#### Apoiadores (`src/actions/sponsors.ts`)
- `getAllSponsors()`: GET `/api/sponsors`
- `createSponsor(formData)`: POST `/api/sponsors`
- `updateSponsor(id, formData)`: PUT `/api/sponsors/{id}`
- `deleteSponsor(id)`: DELETE `/api/sponsors/{id}`

#### Doações (`src/actions/donations.ts`)
- `getAllDonations()`: GET `/api/donations`
- `createDonation(data)`: POST `/api/donations`

#### Imagens de Eventos (`src/actions/event-images.ts`)
- `getEventImages(eventId)`: GET `/api/events/{id}/images`
- `addEventImage(eventId, formData)`: POST `/api/events/{id}/images`
- `deleteEventImage(eventId, imageId)`: DELETE `/api/events/{id}/images/{imageId}`

### 3. Configuração

#### Variáveis de Ambiente
Adicione no arquivo `.env`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

#### Middleware
- Atualizado para usar cookie `auth-token`
- Redirecionamento automático baseado na autenticação

## Como Usar

1. Configure a variável `NEXT_PUBLIC_API_URL` no arquivo `.env`
2. Certifique-se de que a API Laravel está rodando
3. As server actions agora fazem requisições HTTP para a API Laravel
4. O token de autenticação é gerenciado automaticamente via cookies

## Relações e Tabelas Identificadas no Schema Drizzle

### Relações:
- **events ↔ event_images**: Relação 1:N (um evento pode ter várias imagens)
  - `event_images.event_id` referencia `events.id`

### Tabelas:
- **users**: Usuários do sistema
- **sponsors**: Apoiadores/patrocinadores
- **events**: Eventos
- **event_images**: Imagens dos eventos (tabela relacionada)
- **projects**: Projetos
- **donations**: Doações

## Endpoints da API Laravel Esperados

A API Laravel deve implementar os seguintes endpoints:

### Autenticação
- `POST /api/login` - Login do usuário
- `POST /api/logout` - Logout do usuário
- `GET /api/me` - Dados do usuário autenticado

### Recursos (com middleware auth:api)
- `GET|POST /api/users` - Listar/Criar usuários
- `GET|PUT|DELETE /api/users/{id}` - Ver/Atualizar/Excluir usuário
- `GET|POST /api/projects` - Listar/Criar projetos
- `GET|PUT|DELETE /api/projects/{id}` - Ver/Atualizar/Excluir projeto
- `GET|POST /api/events` - Listar/Criar eventos
- `GET|PUT|DELETE /api/events/{id}` - Ver/Atualizar/Excluir evento
- `GET /api/events/slug/{slug}` - Buscar evento por slug (site público)
- `GET|POST /api/events/{id}/images` - Listar/Adicionar imagens do evento
- `DELETE /api/events/{id}/images/{imageId}` - Remover imagem do evento
- `GET|POST /api/sponsors` - Listar/Criar apoiadores
- `GET|PUT|DELETE /api/sponsors/{id}` - Ver/Atualizar/Excluir apoiador
- `GET|POST /api/donations` - Listar/Criar doações

## Notas Importantes

1. Todas as requisições que requerem autenticação incluem automaticamente o header `Authorization: Bearer {token}`
2. FormData é enviado com Content-Type apropriado para upload de arquivos
3. Erros da API são capturados e re-lançados com mensagens apropriadas
4. `revalidatePath()` é chamado após operações de modificação para atualizar o cache do Next.js