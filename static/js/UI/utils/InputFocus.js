/**
 * Clase utilitaria para enfocar un elemento del DOM
 * y disparar manualmente el evento "focus".
 *
 * @example
 * import { ElementFocus } from './ElementFocus.js';
 *
 * const focus = new ElementFocus('#email');
 * focus.apply();
 */
export class ElementFocus {
  /**
   * @type {string}
   * @private
   */
  #selector;

  /**
   * @type {HTMLElement|null}
   * @private
   */
  #element = null;

  /**
   * Crea una nueva instancia de ElementFocus.
   *
   * @param {string} selector - Selector CSS del elemento a enfocar.
   *
   * @throws {TypeError} Si el selector no es un string.
   * @throws {Error} Si el selector está vacío.
   */
  constructor(selector) {
    if (typeof selector !== 'string') {
      throw new TypeError(
        'El parámetro "selector" debe ser un string.'
      );
    }

    if (!selector.trim()) {
      throw new Error(
        'El parámetro "selector" no puede estar vacío.'
      );
    }

    this.#selector = selector.trim();
  }

  /**
   * Obtiene el elemento del DOM.
   *
   * @returns {HTMLElement}
   *
   * @throws {Error} Si el elemento no existe.
   */
  getElement() {
    const element = document.querySelector(this.#selector);

    if (!element) {
      throw new Error(
        `No se encontró ningún elemento con el selector "${this.#selector}".`
      );
    }

    if (!(element instanceof HTMLElement)) {
      throw new Error(
        `El selector "${this.#selector}" no corresponde a un HTMLElement válido.`
      );
    }

    this.#element = element;

    return this.#element;
  }

  /**
   * Verifica si el elemento soporta focus().
   *
   * @param {HTMLElement} element
   *
   * @throws {Error} Si el elemento no puede enfocarse.
   */
  validateFocusable(element) {
    if (typeof element.focus !== 'function') {
      throw new Error(
        `El elemento "${this.#selector}" no soporta focus().`
      );
    }
  }

  /**
   * Dispara manualmente el evento focus.
   *
   * @param {HTMLElement} element
   *
   * @returns {void}
   */
  dispatchFocusEvent(element) {
    const focusEvent = new FocusEvent('focus', {
      bubbles: false,
      cancelable: false,
      composed: true
    });

    element.dispatchEvent(focusEvent);
  }

  /**
   * Enfoca el elemento y dispara el evento focus.
   *
   * @returns {void}
   *
   * @throws {Error} Si no se puede enfocar el elemento.
   */
  apply() {
    const element = this.getElement();

    this.validateFocusable(element);

    element.focus();

    if (document.activeElement !== element) {
      throw new Error(
        `No fue posible enfocar el elemento "${this.#selector}".`
      );
    }

    this.dispatchFocusEvent(element);
  }
}