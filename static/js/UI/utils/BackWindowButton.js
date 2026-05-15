/* ?? =============================
?? BOTON REGRESAR VENTANA ANTERIOR
?? ==============================*/

export class BackButtonManager {
    /**
     * Añade funcionalidad de volver a la ventana anterior
     * usando `window.history.back()`.
     * 
     * @param {Object} configs - Configuraciones
     * @param {boolean} configs.enableFlag - Flag inicializador
     * @param {string} configs.selector - Selector del botón
     */
    constructor(configs) {

        const { enableFlag, selector } = configs;

        if (typeof enableFlag !== 'boolean') {
            throw new Error('BackButtonManager requiere un flag booleano');
        }

        if (typeof selector !== 'string' || selector.trim() === '') {
            throw new Error('BackButtonManager requiere un selector válido');
        }

        this.selector = selector;
        this.buttons = [];

        if (enableFlag) {
            this.init();
        }
    }

    /* ==========================================
    Inicializar botones volver
    =============================================*/
    init() {
        this.buttons = Array.from(document.querySelectorAll(this.selector));

        this.buttons.forEach(btn => {
            console.log('--Botón volver: enable');

            btn.addEventListener('click', () => {
                window.history.back();
            });
        });

        return this.buttons;
    }
}