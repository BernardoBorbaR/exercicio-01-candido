import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

interface CriarLivroRequest {
  titulo: string;
  autor: string;
  anoPublicacao: number;
}

router.post('/livros', async (req: Request, res: Response) => {
  try {
    const { titulo, autor, anoPublicacao } = req.body as CriarLivroRequest;
    
    if (!titulo || typeof titulo !== 'string' || titulo.trim() === '') {
      return res.status(400).json({
        error: "O campo 'titulo' é obrigatório e deve ser uma string não vazia"
      });
    }
    
    if (!autor || typeof autor !== 'string' || autor.trim() === '') {
      return res.status(400).json({
        error: "O campo 'autor' é obrigatório e deve ser uma string não vazia"
      });
    }
    
    if (!anoPublicacao || typeof anoPublicacao !== 'number') {
      return res.status(400).json({
        error: "O campo 'anoPublicacao' é obrigatório e deve ser um número"
      });
    }
    
    const anoAtual = new Date().getFullYear();
    if (anoPublicacao > anoAtual) {
      return res.status(400).json({
        error: "O ano de publicação não pode ser no futuro"
      });
    }
    
    const novoLivro = await prisma.livro.create({
      data: {
        titulo: titulo.trim(),
        autor: autor.trim(),
        anoPublicacao,
        disponivel: true
      }
    });
    
    res.status(201).json(novoLivro);
  } catch (error) {
    console.error('Erro ao criar livro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.get('/livros', async (req: Request, res: Response) => {
  try {
    const { autor, disponivel } = req.query;
    
    let filtro: any = {};
    
    if (autor && typeof autor === 'string') {
      filtro.autor = {
        contains: autor,
        mode: 'insensitive'
      };
    }
    
    if (disponivel !== undefined) {
      filtro.disponivel = disponivel === 'true';
    }
    
    const livros = await prisma.livro.findMany({
      where: filtro,
      orderBy: {
        titulo: 'asc'
      }
    });
    
    res.json(livros);
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.patch('/livros/:id/emprestar', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const livroId = parseInt(id);
    
    if (isNaN(livroId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    
    const livro = await prisma.livro.findUnique({
      where: { id: livroId }
    });
    
    if (!livro) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }
    
    if (!livro.disponivel) {
      return res.status(400).json({ 
        error: 'Livro não está disponível para empréstimo' 
      });
    }
    
    const livroAtualizado = await prisma.livro.update({
      where: { id: livroId },
      data: { disponivel: false }
    });
    
    res.json({
      message: 'Livro emprestado com sucesso',
      livro: livroAtualizado
    });
  } catch (error) {
    console.error('Erro ao emprestar livro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.patch('/livros/:id/devolver', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const livroId = parseInt(id);
    
    if (isNaN(livroId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    
    const livro = await prisma.livro.findUnique({
      where: { id: livroId }
    });
    
    if (!livro) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }
    
    const livroAtualizado = await prisma.livro.update({
      where: { id: livroId },
      data: { disponivel: true }
    });
    
    res.json({
      message: 'Livro devolvido com sucesso',
      livro: livroAtualizado
    });
  } catch (error) {
    console.error('Erro ao devolver livro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.get('/livros/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const livroId = parseInt(id);
    
    if (isNaN(livroId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    
    const livro = await prisma.livro.findUnique({
      where: { id: livroId }
    });
    
    if (!livro) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }
    
    res.json(livro);
  } catch (error) {
    console.error('Erro ao buscar livro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export { router as bibliotecaRouter };

