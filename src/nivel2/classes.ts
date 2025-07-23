class Carro {
  marca: string;
  modelo: string;
  ano: number;

  constructor(marca: string, modelo: string, ano: number) {
    this.marca = marca;
    this.modelo = modelo;
    this.ano = ano;
  }

  obterDetalhes(): string {
    return `${this.marca} ${this.modelo} (${this.ano})`;
  }
}


class CarroEletrico extends Carro {
  autonomiaBateria: number;

  constructor(marca: string, modelo: string, ano: number, autonomiaBateria: number) {
    super(marca, modelo, ano);
    this.autonomiaBateria = autonomiaBateria;
  }

  obterDetalhes(): string {
    return `${super.obterDetalhes()} - Autonomia: ${this.autonomiaBateria}km`;
  }
}

console.log("=== Nível 2: Classes e Orientação a Objetos ===");

const carro = new Carro("Toyota", "Corolla", 2022);
console.log("Carro:", carro.obterDetalhes());

const carroEletrico = new CarroEletrico("Tesla", "Model 3", 2023, 500);
console.log("Carro Elétrico:", carroEletrico.obterDetalhes());

export { Carro, CarroEletrico };

