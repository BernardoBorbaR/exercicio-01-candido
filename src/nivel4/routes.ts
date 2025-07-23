import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/tarefas', async (req: Request, res: Response) => {
  try {
    const { concluida } = req.query;
    
    let filtro = {};
    
    if (concluida !== undefined) {
      filtro = {
        concluida: concluida === 'true'
      };
    }
    
    const tarefas = await prisma.tarefa.findMany({
      where: {
        ...filtro,
        deletadoEm: null
      },
      orderBy: {
        criadoEm: 'desc'
      }
    });
    
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
});

router.post('/tarefas', async (req: Request, res: Response) => {
  try {
    const { titulo } = req.body;
    
    if (!titulo || typeof titulo !== 'string' || titulo.trim() === '') {
      return res.status(400).json({
        error: "O campo 'titulo' é obrigatório e deve ser uma string não vazia"
      });
    }
    
    const novaTarefa = await prisma.tarefa.create({
      data: {
        titulo: titulo.trim()
      }
    });
    
    res.status(201).json(novaTarefa);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
});

router.delete('/tarefas/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tarefaId = parseInt(id);
    
    if (isNaN(tarefaId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    
    const tarefaExistente = await prisma.tarefa.findFirst({
      where: {
        id: tarefaId,
        deletadoEm: null
      }
    });
    
    if (!tarefaExistente) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    
    const tarefaDeletada = await prisma.tarefa.update({
      where: { id: tarefaId },
      data: {
        deletadoEm: new Date()
      }
    });
    
    res.json({ message: 'Tarefa deletada com sucesso', tarefa: tarefaDeletada });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar tarefa' });
  }
});

router.patch('/tarefas/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { concluida } = req.body;
    const tarefaId = parseInt(id);
    
    if (isNaN(tarefaId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    
    const tarefaAtualizada = await prisma.tarefa.update({
      where: { 
        id: tarefaId,
        deletadoEm: null
      },
      data: {
        concluida: concluida === true
      }
    });
    
    res.json(tarefaAtualizada);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
});

export { router as nivel4Router };

