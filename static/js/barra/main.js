import { MesaUpdater } from "../UI/utils/MesasUpdater.js";
import { NumberFormatter } from "../UI/utils/NumberFormatter.js";


// ===============================
//  CONSTANTES 
// ===============================
const URL = document.getElementById('data-url')?.dataset.url;
const INTERVALO = 1000;
const MAX_INTENTOS = 3;
const INACTIVIDAD_MAXIMA = 10000;
const DEBUG = false;

const NUMBER_FORMATTER_SELECTOR = "#format-number";

// ===============================
// APLICACION
// ===============================
try{
    const mesas = new MesaUpdater({
        url: URL,
        intervalo: INTERVALO,
        maxIntentos: MAX_INTENTOS,
        inactividadMaxima: INACTIVIDAD_MAXIMA,
        debug: DEBUG
    });
    mesas.iniciar();
    new NumberFormatter(NUMBER_FORMATTER_SELECTOR);
} catch (error) {
    console.error(error);
}