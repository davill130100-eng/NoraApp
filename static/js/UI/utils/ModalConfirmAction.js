export class ConfirmationManager {

    /**
     * Inicializa los eventos de confirmación.
     *
     * @param {string} selector - Selector CSS de los botones.
     * @param {Object} options - Configuración de comportamiento.
     * @param {string} options.dataAttr - Nombre del data attribute que contiene el mensaje.
     * @param {'submit'|'redirect'} options.onConfirmAction - Acción a ejecutar al confirmar.
     * @param {boolean} [options.enableEnterKey=false] - Habilita confirmación con Enter.
     * @param {string|null} [options.extraSelector=null] - Selector opcional para concatenar valor extra al mensaje.
     */
    constructor(selector, options = {}) {

        if (!selector || typeof selector !== 'string') {
            throw new Error('Debe proporcionar un selector válido.');
        }

        this.selector = selector;

        this.options = {
            dataAttr: options.dataAttr || 'message',
            onConfirmAction: options.onConfirmAction || 'submit',
            enableEnterKey: options.enableEnterKey || false,
            extraSelector: options.extraSelector || null
        };

        this.initialize();
    }

    /**
     * Inicializa los listeners de eventos.
     *
     * @private
     */
    initialize() {

        document.querySelectorAll(this.selector).forEach(button => {

            button.addEventListener('click', (e) => {

                e.preventDefault();

                const form = button.closest('form');

                const customMessage =
                    button.dataset[this.options.dataAttr] || '';

                const extraValue = this.options.extraSelector
                    ? document.querySelector(this.options.extraSelector)?.value || ''
                    : '';

                this.showConfirmationDialog({
                    message: `¿${customMessage} ${extraValue}?`,
                    onConfirm: () => {

                        if (
                            this.options.onConfirmAction === 'submit' &&
                            form
                        ) {
                            form.submit();
                        }

                        if (
                            this.options.onConfirmAction === 'redirect'
                        ) {
                            window.location.href =
                                button.dataset.delete_url;
                        }
                    }
                });
            });

            // Habilitar Enter para confirmar
            if (
                this.options.enableEnterKey &&
                button.closest('form')
            ) {

                button.closest('form')
                    .addEventListener('keydown', (e) => {

                        if (e.key === 'Enter') {

                            e.preventDefault();
                            button.click();
                        }
                    });
            }
        });
    }

    /**
     * Muestra el modal de confirmación usando SweetAlert2.
     *
     * @param {Object} params
     * @param {string} params.message - Mensaje de confirmación.
     * @param {Function} params.onConfirm - Callback ejecutado al confirmar.
     *
     * @private
     */
    showConfirmationDialog({ message, onConfirm }) {
        Swal.fire({
            text: message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText:
                '<i class="bi bi-check-circle"></i> Confirmar',
            cancelButtonText:
                '<i class="bi bi-x-circle"></i> Cancelar',
            background: '#1e272e',
            color: '#f8f9fa',
            width: '300px',

            customClass: {
                popup: 'custom-swal'
            }

        }).then((result) => {

            if (
                result.isConfirmed &&
                typeof onConfirm === 'function'
            ) {
                onConfirm();
            }
        });
    }
}