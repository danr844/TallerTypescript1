
export class Student {
    dato: string;
    valor: string;
  
    constructor(dato: string, valor: string) {
      this.dato = dato;
      this.valor = valor;
    }
  }
export const dataStudent = [
  new Student("Código", "201911345"),
  new Student("Cédula", "12345567"),
  new Student("Edad", "18"),
  new Student("Dirección", "Avenida Siempre Viva 742"),
  new Student("Teléfono", "3115364279")
]