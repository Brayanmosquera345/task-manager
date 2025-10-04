/**
 * Clase base para todas las excepciones del Dominio.
 * Contiene información abstracta del error (mensaje, código interno).
 */
export abstract class DomainError extends Error {
  public readonly data?: Record<string, any>;

  constructor(message: string, data?: Record<string, any>) {
    super(message);
    this.data = data;

    Object.defineProperty(this, 'name', { value: this.constructor.name });
  }
}
