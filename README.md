# Projeto TypeScript + Express + Prisma

Este projeto implementa todos os exercícios solicitados de TypeScript, organizados em níveis de dificuldade crescente, com integração completa entre Express.js e Prisma ORM.

## 🚀 Como executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação
```bash
# Instalar dependências
npm install

# Gerar cliente Prisma e executar migrações
npx prisma generate
npx prisma migrate dev

# Executar em modo desenvolvimento
npm run dev

# Executar em modo produção
npm start
```

### Servidor
O servidor estará disponível em: `http://localhost:3000`

## 📚 Estrutura do Projeto

```
src/
├── nivel1/           # Fundamentos de TypeScript
├── nivel2/           # Classes e Orientação a Objetos
├── nivel3/           # Integração com Express
├── nivel4/           # Prisma e Banco de Dados
├── nivel5/           # Recursos Avançados
├── desafio-final/    # Sistema de Biblioteca
└── index.ts          # Arquivo principal
```

## 🎯 Exercícios Implementados

### Nível 1: Fundamentos de TypeScript
- ✅ Tipos básicos (string, number, boolean)
- ✅ Arrays e tuplas
- ✅ Funções tipadas (calcularIMC, classificarIMC)
- ✅ Interfaces (Pessoa)

### Nível 2: Classes e Orientação a Objetos
- ✅ Classe `Carro` com propriedades e métodos
- ✅ Herança com `CarroEletrico`
- ✅ Sobrescrita de métodos

### Nível 3: Integração com Express
- ✅ Rota de health check (`GET /status`)
- ✅ Middleware de validação para tarefas
- ✅ Rotas básicas para CRUD de tarefas

### Nível 4: Prisma e Banco de Dados
- ✅ Query com filtros (`GET /tarefas?concluida=true`)
- ✅ Soft delete com campo `deletadoEm`
- ✅ Operações CRUD completas

### Nível 5: Avançado
- ✅ Generics (`retornarPrimeiro<T>`)
- ✅ Tratamento de erros global
- ✅ Decorators (`@logTempoExecucao`)

### Desafio Final: Sistema de Biblioteca
- ✅ Modelo `Livro` com validações
- ✅ API completa para gerenciamento de livros
- ✅ Sistema de empréstimo/devolução

## 🔗 Endpoints da API

### Status
- `GET /` - Informações da API
- `GET /status` - Health check

### Tarefas
- `GET /tarefas` - Listar tarefas
- `GET /tarefas?concluida=true` - Filtrar por status
- `POST /tarefas` - Criar tarefa
- `PATCH /tarefas/:id` - Atualizar tarefa
- `DELETE /tarefas/:id` - Soft delete

### Biblioteca
- `GET /livros` - Listar livros
- `GET /livros?autor=nome` - Filtrar por autor
- `GET /livros?disponivel=true` - Filtrar por disponibilidade
- `POST /livros` - Criar livro
- `GET /livros/:id` - Buscar livro por ID
- `PATCH /livros/:id/emprestar` - Emprestar livro
- `PATCH /livros/:id/devolver` - Devolver livro

## 📝 Exemplos de Uso

### Criar uma tarefa
```bash
curl -X POST http://localhost:3000/tarefas \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Estudar TypeScript"}'
```

### Criar um livro
```bash
curl -X POST http://localhost:3000/livros \
  -H "Content-Type: application/json" \
  -d '{
    "titulo":"Clean Code",
    "autor":"Robert C. Martin",
    "anoPublicacao":2008
  }'
```

### Emprestar um livro
```bash
curl -X PATCH http://localhost:3000/livros/1/emprestar
```

## 🗄️ Banco de Dados

O projeto usa SQLite com Prisma ORM. Os modelos incluem:

### Tarefa
- `id` (Int, auto-increment)
- `titulo` (String)
- `concluida` (Boolean, default: false)
- `criadoEm` (DateTime)
- `deletadoEm` (DateTime?, para soft delete)

### Livro
- `id` (Int, auto-increment)
- `titulo` (String)
- `autor` (String)
- `anoPublicacao` (Int)
- `disponivel` (Boolean, default: true)
- `criadoEm` (DateTime)

## 🛠️ Tecnologias Utilizadas

- **TypeScript** - Linguagem principal
- **Express.js** - Framework web
- **Prisma** - ORM para banco de dados
- **SQLite** - Banco de dados
- **ts-node-dev** - Desenvolvimento com hot reload

## ✨ Recursos Implementados

- **Tipagem forte** em todo o código
- **Validações** de entrada de dados
- **Tratamento de erros** global
- **Soft delete** para tarefas
- **Filtros** de consulta
- **Decorators** para logging
- **Generics** para reutilização de código
- **Interfaces** bem definidas
- **Middleware** customizado
- **Graceful shutdown** do servidor

## 🧪 Testes

Para testar as funcionalidades, você pode usar:
- **Postman** ou **Insomnia** para testar as rotas
- **curl** para testes via linha de comando
- Os exemplos de uso estão documentados acima

## 📦 Scripts Disponíveis

- `npm start` - Executa o servidor em produção
- `npm run dev` - Executa em modo desenvolvimento com hot reload
- `npx prisma studio` - Interface visual do banco de dados
- `npx prisma migrate dev` - Executa migrações
- `npx tsc --noEmit` - Verifica tipos sem compilar

---

**Desenvolvido como exercício prático de TypeScript, Express e Prisma** 🚀

