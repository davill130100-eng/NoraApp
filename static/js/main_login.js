import { TooltipManager } from './UI/utils/TooltipManager.js';
import { ActiveBordersGroupForm } from './UI/utils/ActiveBordersGroupForm.js';
import { AutoFocusEmptyField } from './UI/utils/AutofocusEmptyField.js';
import { ToggleTypeInput } from './UI/utils/ShowPswButton.js';


// ===============================
//  CONSTANTES 
// ===============================
const ON = true;

const TOOLTIP_SELECTOR = '[data-bs-toggle="tooltip"]';
const ACTIVE_BORDER_ELEMENTS = document.querySelectorAll('.active-border-group');
const LOGIN_FORM = '#login-form'
const INPUT_PSW_SELECTOR = '.input-psw'
const BTN_ALTERNATE_SELECTOR = '#togglePassword';
const BTNS_NAV_ASIDE_SELECTOR = ".icons_items";

try{

    // ===============================
    // Inicializar tooltips Bootstrap
    // ===============================
    new TooltipManager({
      enableFlag: ON, 
      selector: TOOLTIP_SELECTOR
    });

    // ===============================
    // Señalizar elemento enfocado
    // ===============================
    new ActiveBordersGroupForm(ACTIVE_BORDER_ELEMENTS);

    // ===============================
    // Enfocar campo vacio
    // ===============================
    new AutoFocusEmptyField({
        formSelector: LOGIN_FORM
    });

    // ===============================
    // Mostrar/ocultar contraseña
    // ===============================
    new ToggleTypeInput({
        inputSelector: INPUT_PSW_SELECTOR, 
        btnSelector: BTN_ALTERNATE_SELECTOR
    });

}catch(err){
    console.error(err);
}