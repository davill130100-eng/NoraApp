export class ToastMessagesSweet2 {

    /**
     * Inicializa las alertas toast.
     *
     * @param {string|Array<Object>} messages
     * - JSON string o arreglo de mensajes.
     *  @param {boolean} [flag=false] 
     * - Si es true, muestra los mensajes al instanciar.
     */
    constructor(messages, flag = false) {

        if (!messages) {
            throw new Error('Debe proporcionar mensajes válidos.');
        }

        this.messages =
            typeof messages === 'string'
                ? JSON.parse(messages)
                : messages;

        this.flag = flag;
        
        if(this.flag){
            this.showMessages();
        }
    }

    /**
     * Recorre y muestra todos los mensajes.
     *
     * @private
     */
    showMessages() {

        this.messages.forEach(message => {

            Swal.fire({
                text: message.text,

                icon: this.getIconType(message.type),

                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,

                didOpen: (toast) => {

                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                },

                background: this.getBackgroundColor(message.type),

                color: this.getTextColor(message.type),

                customClass: {
                    popup: 'custom-swal'
                }
            });
        });
    }

    /**
     * Retorna el tipo de icono.
     *
     * @param {string} type
     * @returns {string}
     *
     * @private
     */
    getIconType(type) {

        switch (type) {

            case 'error':
                return 'error';

            case 'success':
                return 'success';

            case 'warning':
                return 'warning';

            case 'info':
                return 'info';

            default:
                return 'info';
        }
    }

    /**
     * Retorna el color de fondo según el tipo.
     *
     * @param {string} type
     * @returns {string}
     *
     * @private
     */
    getBackgroundColor(type) {

        switch (type) {

            case 'error':
                return '#ff4d4d';

            case 'success':
                return '#28a745';

            case 'warning':
                return '#ffb109';

            case 'info':
                return '#17a2b8';

            default:
                return '#333';
        }
    }

    /**
     * Retorna el color del texto.
     *
     * @param {string} type
     * @returns {string}
     *
     * @private
     */
    getTextColor(type) {

        return type === 'warning'
            ? '#000'
            : '#fff';
    }
}