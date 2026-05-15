/**
 * Clase para simular un evento `mouseover`
 * sobre un elemento HTML después de un tiempo definido.
 *
 * Uso:
 * new MouseOverSimulator(elemento, 2000);
 */
export class MouseOverSimulator {
  /**
   * @param {HTMLElement} element - Elemento objetivo.
   * @param {number} delay - Tiempo en milisegundos antes de ejecutar el mouseover.
   */
  constructor(element, delay = 1000) {
    if (!(element instanceof HTMLElement)) {
      throw new Error("El argumento 'element' debe ser un HTMLElement.");
    }

    if (typeof delay !== "number" || delay < 0) {
      throw new Error("El argumento 'delay' debe ser un número válido.");
    }

    this.element = element;
    this.delay = delay;
    this.timeoutId = null;

    this.start();
  }

  /**
   * Inicia la simulación del mouseover.
   */
  start() {
    this.stop();

    this.timeoutId = setTimeout(() => {
      const event = new MouseEvent("mouseover", {
        bubbles: true,
        cancelable: true,
        view: window,
      });

      this.element.dispatchEvent(event);
    }, this.delay);
  }

  /**
   * Cancela la simulación si aún no se ejecutó.
   */
  stop() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}