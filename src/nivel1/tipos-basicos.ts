const nome: string = "João Silva";
const idade: number = 30;
const ativo: boolean = true;

const hobbies: string[] = ["leitura", "natação", "programação"];

const ponto: [number, number] = [10, 20];

function calcularIMC(peso: number, altura: number): number {
  return peso / (altura * altura);
}

function classificarIMC(imc: number): string {
  if (imc < 18.5) return "Abaixo do peso";
  if (imc < 25) return "Normal";
  if (imc < 30) return "Sobrepeso";
  return "Obesidade";
}

interface Pessoa {
  nome: string;
  email?: string;
  idade: number;
}

const pessoa: Pessoa = {
  nome: "Maria Santos",
  email: "maria@email.com",
  idade: 25
};

console.log("=== Nível 1: Fundamentos de TypeScript ===");
console.log(`Nome: ${nome}, Idade: ${idade}, Ativo: ${ativo}`);
console.log(`Hobbies: ${hobbies.join(", ")}`);
console.log(`Ponto: x=${ponto[0]}, y=${ponto[1]}`);

const imc = calcularIMC(70, 1.75);
console.log(`IMC: ${imc.toFixed(2)} - ${classificarIMC(imc)}`);

console.log(`Pessoa: ${pessoa.nome}, Email: ${pessoa.email}, Idade: ${pessoa.idade}`);

export { nome, idade, ativo, hobbies, ponto, calcularIMC, classificarIMC, pessoa };
export type { Pessoa };

