/* =============================
AUTOFOCUS EN PRIMER CAMPO VACÍO
==============================*/

export class AutoFocusEmptyField {
    /**
     * - Enfoca el primer campo vacío dentro de un formulario al cargar la página
     * @param {Object} configs
     * @param {string} configs.formSelector - Selector del formulario
     * @param {boolean} [configs.ignoreHidden=true] - Ignorar campos ocultos
     */
    constructor(configs) {
        const { formSelector, ignoreHidden = true } = configs;

        if (typeof formSelector !== 'string' || formSelector.trim() === '') {
            throw new Error('AutoFocusEmptyField requiere un formSelector válido');
        }

        this.form = document.querySelector(formSelector);

        if (!this.form) {
            throw new Error(`No se encontró el formulario: ${formSelector}`);
        }

        this.ignoreHidden = ignoreHidden;

        this.init();
    }

    init() {
        // Esperar a que todo el DOM esté listo
        window.addEventListener('DOMContentLoaded', () => {
            this.focusFirstEmptyField();
        });
    }

    /**
     * - Busca y enfoca el primer campo vacío
     */
    focusFirstEmptyField() {
        // Campos que normalmente se usan en formularios
        const fields = this.form.querySelectorAll(
            'input, textarea, select'
        );

        for (let field of fields) {
            // Ignorar campos deshabilitados
            if (field.disabled) continue;

            // Ignorar tipo hidden si está configurado
            if (this.ignoreHidden && field.type === 'hidden') continue;

            // Ignorar elementos no visibles
            if (this.ignoreHidden && !this.isVisible(field)) continue;

            // Validar si está vacío
            const isEmpty =
                field.value === '' ||
                field.value === null ||
                (field.tagName === 'SELECT' && field.selectedIndex === 0);

            if (isEmpty) {
                field.focus();
                break;
            }
        }
    }

    /**
     * - Verifica si un elemento es visible en el DOM
     * @param {HTMLElement} el
     * @returns {boolean}
     */
    isVisible(el) {
        return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
    }
}