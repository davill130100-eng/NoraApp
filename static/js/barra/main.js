import { MesaUpdater } from "../UI/utils/MesasUpdater.js";

// ===============================
//  CONSTANTES 
// ===============================
const URL = document.getElementById('data-url')?.dataset.url;
const INTERVALO = 1000;
const MAX_INTENTOS = 3;
const INACTIVIDAD_MAXIMA = 10000;
const DEBUG = false;

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
} catch (error) {
    console.error(
        "--Gestión Ajax Actualizar mesas, Error:",
        error
    );
}