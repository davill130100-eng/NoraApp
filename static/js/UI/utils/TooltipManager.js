  /* =============================
    ACTIVADOR TOOLTIPS
    ==============================*/
    export class TooltipManager {
        /**
         - Añade tooltips informativos de la libreria Bootstrap a cada elemento configurado con `configs.selector`, si `configs.enableFlag` es valido.
        * @param {Object} configs - Configuraciones
        * @param {boolean} configs.enableFlag - Flag inicializador
        * @param {string} configs.selector - Selector afectar
         */
        constructor(configs) {

            const { enableFlag, selector } = configs;

            if (typeof enableFlag !== 'boolean') {
                throw new Error('TooltipManager requiere un flag booleano');
            }
            if (typeof selector !== 'string' || selector.trim() === '') {
                throw new Error('TooltipManager requiere un selector válido');
            }

            this.selector = selector;
            this.tooltips = [];

            // validar que el selector encuentre al menos un elemento
            const matches = document.querySelectorAll(this.selector);

            if (matches.length === 0) {
                throw new Error(`TooltipManager: no se encontraron elementos para selector "${this.selector}"`);
            }

            if (enableFlag) {
                this.init();
            }
        }

        /* ==========================================
        Inicializar tooltips en elementos configurados
        =============================================*/
        init() {
            const triggers = Array.from(document.querySelectorAll(this.selector));
            this.tooltips = triggers.map(el => new bootstrap.Tooltip(el));
            return this.tooltips;
        }
    }