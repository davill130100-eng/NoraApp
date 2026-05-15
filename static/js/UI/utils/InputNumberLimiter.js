/**
 * Clase para limitar la cantidad de dígitos
 * permitidos en un input.
 *
 * Uso:
 * const limiter = new InputNumberLimiter(inputElement, 5);
 * limiter.init();
 */
export class InputNumberLimiter {
  /**
   * @param {HTMLInputElement} input - Input objetivo.
   * @param {number} maxLength - Cantidad máxima de dígitos permitidos.
   */
  constructor(input, maxLength = 5) {
    if (!(input instanceof HTMLInputElement)) {
      throw new Error("El argumento 'input' debe ser un HTMLInputElement.");
    }

    if (typeof maxLength !== "number" || maxLength <= 0) {
      throw new Error("El argumento 'maxLength' debe ser un número mayor a 0.");
    }

    this.input = input;
    this.maxLength = maxLength;

    this.handleInput = this.handleInput.bind(this);
  }

  /**
   * Inicializa el limitador.
   */
  init() {
    this.input.addEventListener("input", this.handleInput);
  }

  /**
   * Destruye el listener del input.
   */
  destroy() {
    this.input.removeEventListener("input", this.handleInput);
  }

  /**
   * Maneja el evento input.
   * Limita la cantidad de caracteres.
   *
   * @private
   */
  handleInput() {
    // Elimina caracteres no numéricos
    this.input.value = this.input.value.replace(/\D/g, "");

    // Limita longitud
    if (this.input.value.length > this.maxLength) {
      this.input.value = this.input.value.slice(0, this.maxLength);
    }
  }
}