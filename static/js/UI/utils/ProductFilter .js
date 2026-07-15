/**
 * ProductFilter
 * -------------
 * Filtra elementos del DOM en función del texto ingresado en uno o varios
 * campos de búsqueda.
 *
 * Requisitos:
 * - Cada elemento filtrable debe tener el atributo:
 *
 *   data-nombre="Nombre del producto"
 *
 * Ejemplo HTML:
 *
 * <input class="filtro-productos" type="text">
 *
 * <button class="producto-btn" data-nombre="Coca Cola">
 *   Coca Cola
 * </button>
 *
 * Uso:
 *
 * import ProductFilter from './ProductFilter.js';
 *
 * const filter = new ProductFilter(
 *   '.filtro-productos',
 *   '.producto-btn'
 * );
 *
 * filter.init();
 */
export class ProductFilter {
    /**
     * @param {string} inputSelector Selector de los inputs de búsqueda.
     * @param {string} itemSelector Selector de los elementos a filtrar.
     *
     * @throws {TypeError}
     */
    constructor(inputSelector, itemSelector) {
        if (
            typeof inputSelector !== 'string' ||
            !inputSelector.trim()
        ) {
            throw new TypeError(
                'inputSelector debe ser un selector CSS válido.'
            );
        }

        if (
            typeof itemSelector !== 'string' ||
            !itemSelector.trim()
        ) {
            throw new TypeError(
                'itemSelector debe ser un selector CSS válido.'
            );
        }

        this.inputSelector = inputSelector.trim();
        this.itemSelector = itemSelector.trim();

        this.inputs = [];
        this.items = [];

        this.handleInput = this.handleInput.bind(this);
    }

    /**
     * Inicializa el filtro.
     *
     * @returns {ProductFilter}
     * @throws {Error}
     */
    init() {
        this.inputs = document.querySelectorAll(
            this.inputSelector
        );

        this.items = document.querySelectorAll(
            this.itemSelector
        );

        if (!this.inputs.length) {
            throw new Error(
                `No se encontraron elementos para "${this.inputSelector}".`
            );
        }

        if (!this.items.length) {
            throw new Error(
                `No se encontraron elementos para "${this.itemSelector}".`
            );
        }

        this.inputs.forEach(input => {
            input.addEventListener(
                'input',
                this.handleInput
            );
        });

        return this;
    }

    /**
     * Libera eventos registrados.
     */
    destroy() {
        this.inputs.forEach(input => {
            input.removeEventListener(
                'input',
                this.handleInput
            );
        });
    }

    /**
     * Ejecuta el filtrado.
     *
     * @param {InputEvent} event
     * @private
     */
    handleInput(event) {
        const filterText = event.target.value
            .trim()
            .toLowerCase();

        this.items.forEach(item => {
            const itemName =
                (item.dataset.nombre || '')
                    .trim()
                    .toLowerCase();

            item.style.display =
                itemName.includes(filterText)
                    ? ''
                    : 'none';
        });
    }

    /**
     * Fuerza una actualización manual del filtro.
     *
     * @param {string} value
     */
    filter(value = '') {
        const filterText = String(value)
            .trim()
            .toLowerCase();

        this.items.forEach(item => {
            const itemName =
                (item.dataset.nombre || '')
                    .trim()
                    .toLowerCase();

            item.style.display =
                itemName.includes(filterText)
                    ? ''
                    : 'none';
        });
    }
}