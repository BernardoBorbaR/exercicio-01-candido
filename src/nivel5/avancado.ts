import { Request, Response, NextFunction } from 'express';

function retornarPrimeiro<T>(arr: T[]): T {
  if (arr.length === 0) {
    throw new Error('Array não pode estar vazio');
  }
  return arr[0];
}

const numeros = [1, 2, 3, 4, 5];
const strings = ["hello", "world", "typescript"];

console.log("=== Nível 5: Avançado - Generics ===");
console.log("Primeiro número:", retornarPrimeiro(numeros));
console.log("Primeira string:", retornarPrimeiro(strings));

interface ErrorResponse {
  error: string;
  code: number;
}

const tratamentoErroGlobal = (
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
): void => {
  console.error('Erro capturado:', err.message);
  
  const errorResponse: ErrorResponse = {
    error: err.message || 'Erro interno do servidor',
    code: 500
  };
  
  res.status(500).json(errorResponse);
};


function logTempoExecucao(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const metodoOriginal = descriptor.value;
  
  descriptor.value = function (...args: any[]) {
    const inicio = Date.now();
    const resultado = metodoOriginal.apply(this, args);
    const fim = Date.now();
    const tempoExecucao = fim - inicio;
    
    console.log(`Método ${propertyName} executado em ${tempoExecucao}ms`);
    
    return resultado;
  };
  
  return descriptor;
}

class CarroComDecorator {
  marca: string;
  modelo: string;
  ano: number;

  constructor(marca: string, modelo: string, ano: number) {
    this.marca = marca;
    this.modelo = modelo;
    this.ano = ano;
  }

  @logTempoExecucao
  obterDetalhes(): string {
    for (let i = 0; i < 1000000; i++) {
    }
    return `${this.marca} ${this.modelo} (${this.ano})`;
  }
}

console.log("=== Nível 5: Avançado - Decorators ===");
const carroComDecorator = new CarroComDecorator("Honda", "Civic", 2023);
console.log("Detalhes:", carroComDecorator.obterDetalhes());

export { 
  retornarPrimeiro, 
  tratamentoErroGlobal, 
  logTempoExecucao, 
  CarroComDecorator
};
export type { ErrorResponse };

