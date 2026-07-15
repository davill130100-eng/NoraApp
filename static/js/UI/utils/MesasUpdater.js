/**
 * @file MesaUpdater.js
 * @description
 * Clase encargada de gestionar la actualización automática de mesas mediante AJAX.
 * Incluye:
 * - Actualización periódica.
 * - Control de inactividad del usuario.
 * - Reinicio automático por interacción.
 * - Límite de intentos fallidos.
 * - Limpieza automática al abandonar la página.
 *
 * Requiere:
 * - jQuery
 * - Endpoint JSON con estructura:
 * {
 *   mesas: [
 *     {
 *       numero_mesa: Number,
 *       estado_mesa: Number,
 *       responsable: String,
 *       total_pedido: String,
 *       pedido_asociado: Number
 *     }
 *   ]
 * }
 */

export class MesaUpdater {

    /**
     * @param {Object} options
     * @param {string} options.url URL del endpoint AJAX.
     * @param {number} [options.intervalo=1000] Intervalo de actualización en ms.
     * @param {number} [options.maxIntentos=3] Máximo de intentos fallidos.
     * @param {number} [options.inactividadMaxima=10000] Tiempo máximo de inactividad en ms.
     * @param {boolean} [options.debug=true] Mostrar logs en consola.
     */
    constructor({
        url,
        intervalo = 1000,
        maxIntentos = 3,
        inactividadMaxima = 10000,
        debug = true
    }) {

        if (!url) {
            throw new Error("La URL es obligatoria.");
        }

        this.url = url;
        this.intervalo = intervalo;
        this.maxIntentos = maxIntentos;
        this.inactividadMaxima = inactividadMaxima;
        this.debug = debug;

        this.mesaInterval = null;
        this.intentosFallidos = 0;
        this.ultimaActividad = Date.now();
        this.ajaxActivo = false;

        this._bindEventos();
    }

    /**
     * Inicializa el sistema de actualización.
     */
    iniciar() {

        try {

            this._log("--Gestión Ajax Actualizar mesas: enable");

            this.iniciarActualizacion();

            // Verificar inactividad periódicamente
            this.controlInactividad = setInterval(() => {

                if (
                    this.ajaxActivo &&
                    Date.now() - this.ultimaActividad > this.inactividadMaxima
                ) {
                    this.detenerActualizacion();
                }

            }, 5000);

        } catch (error) {

            console.error(
                "--Gestión Ajax Actualizar mesas, Error:",
                error
            );

        }
    }

    /**
     * Inicia las actualizaciones periódicas.
     */
    iniciarActualizacion() {

        if (!this.ajaxActivo) {

            this.ajaxActivo = true;

            this.actualizarMesas();

            this.mesaInterval = setInterval(
                () => this.actualizarMesas(),
                this.intervalo
            );
        }
    }

    /**
     * Detiene las actualizaciones periódicas.
     */
    detenerActualizacion() {

        if (this.ajaxActivo) {

            this.ajaxActivo = false;

            clearInterval(this.mesaInterval);

            this._log("Actualización detenida.");

        }
    }

    /**
     * Realiza la petición AJAX y actualiza la interfaz.
     */
    actualizarMesas() {

        $.getJSON(this.url, (data) => {

            this.intentosFallidos = 0;

            data.mesas.forEach((mesa) => {

                const mesaElement = $(".mesa-" + mesa.numero_mesa);
                const cardElement = mesaElement.find(".card");
                const cardElementHeader = mesaElement.find(".card-header");
                const spanInfo = mesaElement.find(".badge");
                const linkElement = mesaElement;

                if (mesa.estado_mesa == 1) {

                    cardElement
                        .removeClass("text-warning border-warning border-opacity-25")
                        .addClass("text-ligth bg-danger-subtle border-danger");

                    spanInfo.removeClass("d-none");

                    mesaElement.attr(
                        "title",
                        "Tomó: " + mesa.responsable
                    );

                    mesaElement.find("p").text("Ocupada");

                    mesaElement.find("small").text(
                        mesa.total_pedido
                    );

                    linkElement.attr(
                        "href",
                        `pedidos/editar/${mesa.pedido_asociado}/`
                    );

                } else {

                    cardElement
                        .removeClass("text-ligth bg-danger-subtle border-danger")
                        .addClass(" text-warning border-warning border-opacity-25");

                    spanInfo.addClass("d-none");

                    mesaElement.attr(
                        "title",
                        "Seleccionar"
                    );

                    mesaElement.find("p").text("Disponible");

                    mesaElement.find("small").text(" ");

                    linkElement.attr(
                        "href",
                        `pedidos/agregar/${mesa.numero_mesa}/`
                    );
                }

            });

        }).fail(() => {

            this.intentosFallidos++;

            console.error(
                `Error al obtener los datos de las mesas (Intento ${this.intentosFallidos} de ${this.maxIntentos})`
            );

            if (this.intentosFallidos >= this.maxIntentos) {

                console.error(
                    "Se alcanzó el límite de intentos fallidos. Deteniendo actualización de mesas."
                );

                this.detenerActualizacion();
            }
        });
    }

    /**
     * Reinicia el temporizador de actividad del usuario.
     * Si el AJAX está detenido, vuelve a iniciarlo.
     */
    registrarActividad() {

        this.ultimaActividad = Date.now();

        if (!this.ajaxActivo) {
            this.iniciarActualizacion();
        }
    }

    /**
     * Destruye completamente la instancia.
     * Limpia intervalos y eventos.
     */
    destruir() {

        this.detenerActualizacion();

        clearInterval(this.controlInactividad);

        $(document).off(
            "mousemove scroll keydown click",
            this._actividadHandler
        );

        $("a").off(
            "click",
            this._actividadHandler
        );

        window.removeEventListener(
            "beforeunload",
            this._beforeUnloadHandler
        );

        this._log("MesaUpdater destruido.");
    }

    /**
     * Asocia eventos globales.
     * @private
     */
    _bindEventos() {

        this._actividadHandler = () => {
            this.registrarActividad();
        };

        $(document).on(
            "mousemove scroll keydown click",
            this._actividadHandler
        );

        $("a").on(
            "click",
            this._actividadHandler
        );

        this._beforeUnloadHandler = () => {
            this.detenerActualizacion();
        };

        window.addEventListener(
            "beforeunload",
            this._beforeUnloadHandler
        );
    }

    /**
     * Muestra logs si debug está habilitado.
     * @param {string} mensaje
     * @private
     */
    _log(mensaje) {

        if (this.debug) {
            console.log(mensaje);
        }
    }
}
