import { MouseOverSimulator } from "../UI/utils/MouseOverSimulator.js";
import { InputNumberLimiter } from "../UI/utils/InputNumberLimiter.js";
import { ElementFocus } from "../UI/utils/InputFocus.js";


//=========================
// CONSTANTES
//=========================
const TOOLTIP_SELECTOR = document.querySelector("#show_tip");
const INPUT_BASE_SELECTOR = document.querySelector("#valor_base");
const INPUT_BASE_SELECTOR_ID = "#valor_base";

//=========================
// APLICACION
//=========================
try {
    new MouseOverSimulator(TOOLTIP_SELECTOR, 1000);
    const limiter = new InputNumberLimiter(INPUT_BASE_SELECTOR, 10);
    limiter.init();

    const focus = new ElementFocus(INPUT_BASE_SELECTOR_ID);
    focus.apply();
} catch (error) {
    console.error(error);
}
