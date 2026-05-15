/* =============================
ALTERNADOR TIPO DE CAMPO POR BTN
==============================*/

export class ToggleTypeInput {
    /**
     * - Alterna el tipo de campo password/text al hacer clic en un botón
     * @param {Object} configs
     * @param {string} configs.inputSelector - Selector del input
     * @param {string} configs.btnSelector - Selector del botón
     */
    constructor(configs) {
        const { inputSelector, btnSelector } = configs;

        if (typeof inputSelector !== 'string' || inputSelector.trim() === '') {
            throw new Error('ToggleTypeInput requiere un inputSelector válido');
        }
        if (typeof btnSelector !== 'string' || btnSelector.trim() === '') {
            throw new Error('ToggleTypeInput requiere un btnSelector válido');
        }

        // Convertimos los selectores a elementos reales del DOM
        this.input = document.querySelector(inputSelector);
        this.button = document.querySelector(btnSelector);

        if (!this.input) {
            throw new Error(`No se encontró el input: ${inputSelector}`);
        }

        if (!this.button) {
            throw new Error(`No se encontró el botón: ${btnSelector}`);
        }

        this.init();
    }

    init() {
        this.button.addEventListener("click", () => {
            const isPassword = this.input.type === "password";
            this.input.type = isPassword ? "text" : "password";

            this.button.innerHTML = isPassword
                ? '<i class="bi bi-eye-slash"></i>'
                : '<i class="bi bi-eye"></i>';

            const tooltip = bootstrap.Tooltip.getInstance(this.button);

            if (tooltip) {
                tooltip.setContent({
                    '.tooltip-inner': this.button.getAttribute('data-bs-title')
                });
            }

            this.button.setAttribute(
                "data-bs-title",
                isPassword ? "Mostrar clave" : "Ocultar clave"
            );
        });
    }
}