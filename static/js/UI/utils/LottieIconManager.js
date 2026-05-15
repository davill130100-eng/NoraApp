/* =============================
ACTIVADOR ICONOS LOTTIE
==============================*/
export class LottieIconManager {
    /**
     * Inicializa animaciones Lottie en elementos configurados.
     * 
     * Cada elemento debe contener:
     * data-path="/ruta/animacion.json"
     * 
     * @param {Object} configs - Configuraciones
     * @param {boolean} configs.enableFlag - Flag inicializador
     * @param {string} configs.selector - Selector de elementos Lottie
     */
    constructor(configs) {

        const { enableFlag, selector } = configs;

        if (typeof enableFlag !== 'boolean') {
            throw new Error('LottieIconManager requiere un flag booleano');
        }

        if (!Array.isArray(selector) || selector.length === 0) {
            throw new Error('Se requiere un array de selectores válido');
        }

        this.selector = selector.map(item => `#${item.id}`).join(', ');
        this.animations = [];

        // validar que el selector encuentre al menos un elemento
        const matches = document.querySelectorAll(this.selector);

        if (matches.length === 0) {
            throw new Error(`LottieIconManager: no se encontraron elementos para selector "${this.selector}"`);
        }

        if (enableFlag) {
            this.init();
        }
    }

    /* ==========================================
    Inicializar iconos Lottie
    =============================================*/
    init() {

        const elements = Array.from(document.querySelectorAll(this.selector));

        this.animations = elements.map(element => {

            const path = element.dataset.path;

            if (!path) {
                console.warn('LottieIconManager: elemento sin data-path', element);
                return null;
            }

            const animation = lottie.loadAnimation({
                container: element,
                renderer: 'svg',
                loop: false,
                autoplay: false,
                path: path
            });

            element.addEventListener('mouseenter', () => {
                animation.play();
            });

            element.addEventListener('mouseleave', () => {
                animation.stop();
            });

            return animation;
        });

        return this.animations;
    }
}