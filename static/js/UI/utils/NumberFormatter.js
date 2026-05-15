export class NumberFormatter {

    /**
     * Formatea todos los elementos encontrados por el selector.
     *
     * @param {string} selector - Selector CSS de los elementos a formatear.
     *
     * @throws {TypeError} Si el selector no es un string.
     * @throws {Error} Si no se encuentran elementos.
     * @throws {Error} Si un elemento no contiene un valor válido.
     */
     constructor(selector) {

        if (typeof selector !== "string") {
            throw new TypeError(
                "El selector debe ser un string válido."
            );
        }

        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {

            const rawValue = (
                element.tagName === "INPUT"
                    ? element.value
                    : element.innerText
            );

            if (!rawValue || typeof rawValue !== "string") {
                throw new Error(
                    "El elemento no contiene un valor válido."
                );
            }

            const cleanedValue = rawValue.replace(/\D/g, "");

            if (!cleanedValue.length) {
                throw new Error(
                    "El valor no contiene números válidos."
                );
            }

            const number = Number(cleanedValue);

            if (Number.isNaN(number)) {
                throw new Error(
                    "No fue posible convertir el valor a número."
                );
            }

            const formatted = new Intl.NumberFormat("es-ES")
                .format(number);

            if (element.tagName === "INPUT") {
                element.value = formatted;
            } else {
                element.innerText = formatted;
            }

        });
    }
}