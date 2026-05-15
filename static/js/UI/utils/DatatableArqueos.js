export class ArqueoDataTable {

    /**
 * Inicializa el DataTable exclusivo para Arqueos.
 *
 * @param {string} selector 
 * - Selector CSS de la tabla.
 * @param {boolean} flag 
 * - Si es true, muestra la datatable personalizada.
 */
    constructor(selector, flag = false) {

        if (!selector || typeof selector !== 'string') {
            throw new Error('Debe proporcionar un selector válido.');
        }

        this.selector = selector;
        this.tableElement = document.querySelector(selector);

        if (!this.tableElement) {
            throw new Error(`No se encontró la tabla: ${selector}`);
        }

        this.flag = flag;
        if(this.flag){
            this.initialize();
        }
    }

    /**
     * Inicializa DataTable con configuración personalizada.
     *
     * @private
     */
    initialize() {

        const dataInfo =
            this.tableElement.dataset.info || '';

        $(this.selector).DataTable({

            responsive: true,

            paging: false,

            searching: false,

            ordering: false,

            info: true,

            select: true,

            language: {

                select: {
                    rows: {
                        1: '1 fila seleccionada'
                    }
                },

                processing: 'Procesando...',

                search: 'Buscar:',

                info: `${dataInfo}`
            }
        });
    }
}