/**
 * SmoothWheelScroll
 * -----------------
 * Aplica un scroll suave con inercia a cualquier contenedor scrollable.
 *
 * Ventajas:
 * - Evita la acumulación de animaciones.
 * - Sensación más natural al usar rueda o touchpad.
 * - Permite configurar velocidad y suavizado.
 *
 * Uso:
 *
 * import SmoothWheelScroll from './SmoothWheelScroll.js';
 *
 * const smoothScroll = new SmoothWheelScroll('.selector', {
 *   speed: 1.2,
 *   easing: 0.12
 * });
 *
 * smoothScroll.init();
 */
export class SmoothWheelScroll {
    /**
     * @param {string} selector Selector CSS.
     * @param {Object} options Configuración.
     * @param {number} [options.speed=1] Multiplicador del desplazamiento.
     * @param {number} [options.easing=0.1] Factor de suavizado (0.01 - 1).
     */
    constructor(selector, options = {}) {
        if (typeof selector !== 'string' || !selector.trim()) {
            throw new TypeError(
                'El selector debe ser una cadena no vacía.'
            );
        }

        this.selector = selector;

        this.options = {
            speed: Number.isFinite(options.speed)
                ? options.speed
                : 1,

            easing: Number.isFinite(options.easing)
                ? Math.min(Math.max(options.easing, 0.01), 1)
                : 0.1
        };

        this.container = null;

        this.currentScroll = 0;
        this.targetScroll = 0;

        this.isAnimating = false;
        this.animationFrame = null;

        this.handleWheel = this.handleWheel.bind(this);
        this.animate = this.animate.bind(this);
    }

    /**
     * Inicializa el comportamiento.
     *
     * @returns {SmoothWheelScroll}
     */
    init() {
        this.container = document.querySelector(this.selector);

        if (!this.container) {
            throw new Error(
                `No existe un elemento para el selector "${this.selector}".`
            );
        }

        this.currentScroll = this.container.scrollTop;
        this.targetScroll = this.currentScroll;

        this.container.addEventListener(
            'wheel',
            this.handleWheel,
            { passive: false }
        );

        return this;
    }

    /**
     * Destruye la instancia y libera recursos.
     */
    destroy() {
        if (!this.container) return;

        this.container.removeEventListener(
            'wheel',
            this.handleWheel
        );

        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }

        this.isAnimating = false;
    }

    /**
     * Gestiona el evento wheel.
     *
     * @param {WheelEvent} event
     * @private
     */
    handleWheel(event) {
        event.preventDefault();

        const maxScroll =
            this.container.scrollHeight -
            this.container.clientHeight;

        this.targetScroll +=
            event.deltaY * this.options.speed;

        this.targetScroll = Math.max(
            0,
            Math.min(this.targetScroll, maxScroll)
        );

        if (!this.isAnimating) {
            this.isAnimating = true;
            this.animate();
        }
    }

    /**
     * Loop de animación.
     *
     * @private
     */
    animate() {
        const distance =
            this.targetScroll - this.currentScroll;

        this.currentScroll +=
            distance * this.options.easing;

        this.container.scrollTop = this.currentScroll;

        if (Math.abs(distance) > 0.5) {
            this.animationFrame =
                requestAnimationFrame(this.animate);
        } else {
            this.currentScroll = this.targetScroll;
            this.container.scrollTop = this.targetScroll;
            this.isAnimating = false;
        }
    }
}