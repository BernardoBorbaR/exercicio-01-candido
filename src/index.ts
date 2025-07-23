import express from 'express';
import { PrismaClient } from '@prisma/client';
import { nivel3Router } from './nivel3/routes';
import { nivel4Router } from './nivel4/routes';
import { bibliotecaRouter } from './desafio-final/biblioteca-routes';
import { tratamentoErroGlobal } from './nivel5/avancado';
import './nivel1/tipos-basicos';
import './nivel2/classes';
import './nivel5/avancado';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'API TypeScript + Express + Prisma',
    endpoints: {
      status: 'GET /status',
      tarefas: {
        listar: 'GET /tarefas?concluida=true|false',
        criar: 'POST /tarefas',
        deletar: 'DELETE /tarefas/:id',
        atualizar: 'PATCH /tarefas/:id'
      },
      biblioteca: {
        listarLivros: 'GET /livros?autor=nome&disponivel=true|false',
        criarLivro: 'POST /livros',
        buscarLivro: 'GET /livros/:id',
        emprestarLivro: 'PATCH /livros/:id/emprestar',
        devolverLivro: 'PATCH /livros/:id/devolver'
      }
    }
  });
});

app.use('/', nivel3Router);
app.use('/', nivel4Router);
app.use('/', bibliotecaRouter);

app.use(tratamentoErroGlobal);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
  console.log('\n=== Exercícios TypeScript Executados ===');
  console.log('Nível 1: Fundamentos de TypeScript');
  console.log('Nível 2: Classes e Orientação a Objetos');
  console.log('Nível 3: Integração com Express');
  console.log('Nível 4: Prisma e Banco de Dados');
  console.log('Nível 5: Avançado (Generics, Decorators, Error Handling)');
  console.log('Desafio Final: Sistema de Biblioteca');
});

process.on('SIGINT', async () => {
  console.log('\n🔄 Encerrando servidor...');
  await prisma.$disconnect();
  process.exit(0);
});

export { app, prisma };

