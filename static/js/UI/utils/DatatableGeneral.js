export class DataTableES {
    /**
     * Inicializa una tabla DataTable.
     *
     * @param {string} selector - Selector CSS de la tabla.
     */
    constructor(selector) {
        if (!selector || typeof selector !== 'string') {
            throw new Error('Debe proporcionar un selector válido.');
        }

        this.selector = selector;
        this.init();
    }

    init() {
        $(this.selector).DataTable({
            responsive: true,
            paging: true,
            searching: false,
            ordering: false,
            info: true,
            select: false,

            language: {
                select: {
                    rows: {
                        1: '1 fila seleccionada'
                    }
                },
                processing: 'Procesando...',
                search: 'Buscar:',
                lengthMenu: 'Mostrar _MENU_ registros',
                info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
                infoEmpty: 'Mostrando 0 a 0 de 0 registros',
                infoFiltered: '(filtrado de _MAX_ registros en total)',
                loadingRecords: 'Cargando...',
                zeroRecords: 'No se encontraron resultados',
                emptyTable: 'No hay datos disponibles en la tabla'
            }
        });
    }
}