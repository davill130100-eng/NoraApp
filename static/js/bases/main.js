import { MouseOverSimulator } from "../UI/utils/MouseOverSimulator.js";
import { InputNumberLimiter } from "../UI/utils/InputNumberLimiter.js";

//=========================
// CONSTANTES
//=========================
const TOOLTIP_SELECTOR = document.querySelector("#show_tip");
const INPUT_BASE_SELECTOR = document.querySelector("#valor_base");

//=========================
// APLICACION
//=========================
try {
    new MouseOverSimulator(TOOLTIP_SELECTOR, 3000);
    const limiter = new InputNumberLimiter(INPUT_BASE_SELECTOR, 10);
    limiter.init();
} catch (error) {
    console.error(error);
}
