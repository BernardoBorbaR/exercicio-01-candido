import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.get('/status', (req: Request, res: Response) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString()
  });
});

interface TarefaRequest {
  titulo: string;
}

const validarTarefa = (req: Request, res: Response, next: NextFunction) => {
  const { titulo } = req.body as TarefaRequest;
  
  if (!titulo || typeof titulo !== 'string' || titulo.trim() === '') {
    return res.status(400).json({
      error: "O campo 'titulo' é obrigatório e deve ser uma string não vazia"
    });
  }
  
  next();
};

let tarefas: Array<{
  id: number;
  titulo: string;
  concluida: boolean;
  criadoEm: Date;
}> = [];

let proximoId = 1;

router.post('/tarefas', validarTarefa, (req: Request, res: Response) => {
  const { titulo } = req.body as TarefaRequest;
  
  const novaTarefa = {
    id: proximoId++,
    titulo: titulo.trim(),
    concluida: false,
    criadoEm: new Date()
  };
  
  tarefas.push(novaTarefa);
  
  res.status(201).json(novaTarefa);
});

router.get('/tarefas', (req: Request, res: Response) => {
  res.json(tarefas);
});

export { router as nivel3Router, validarTarefa };

