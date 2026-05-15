import { TooltipManager } from './UI/utils/TooltipManager.js';
import { LottieIconManager } from './UI/utils/LottieIconManager.js';
import { BackButtonManager } from './UI/utils/BackWindowButton.js';
import { NumberFormatter } from './UI/utils/NumberFormatter.js';
import { ActiveBordersGroupForm } from './UI/utils/ActiveBordersGroupForm.js';
import { DataTableES } from './UI/utils/DatatableGeneral.js';
import { ConfirmationManager } from './UI/utils/ModalConfirmAction.js';
import { ToastMessagesSweet2 } from './UI/utils/ToastMessagesSweet2.js';

// ===============================
//  CONSTANTES 
// ===============================
const ON = true;
const TOOLTIP_SELECTOR = '[data-bs-toggle="tooltip"]';
const LOTTIE_ICON_SELECTORS = [
    { id: "principal-icon" },
    { id: "home-icon" },
    { id: "user-icon" },
    { id: "ventas-icon" },
    { id: "productos-icon" },
    { id: "bases-icon" },
    { id: "grupos-icon" },
    { id: "arqueos-icon" },
    { id: "cierres-icon" },
    { id: "retiros-icon" },
    { id: "mesas-icon" }
];
const BACK_BUTTON_SELECTOR = '#backButton';
const FORMAT_NUMBERS_SELECTOR = '.format-numbers';
const DATATABLE_GENERAL_SELECTOR = '#mi-tabla';
const ACTIVE_BORDER_ELEMENTS = document.querySelectorAll('.active-border-group');
const MESSAGES = document.getElementById('data-messages')?.dataset.messages;

// ===============================
// APLICACION
// ===============================
try{

    // ===============================
    // Inicializar tooltips Bootstrap
    // ===============================
    new TooltipManager({
        enableFlag: ON, 
        selector: TOOLTIP_SELECTOR
    });

    // ===============================
    // Inicializar iconos Lottie
    // ===============================
    new LottieIconManager({
        enableFlag: ON, 
        selector: LOTTIE_ICON_SELECTORS
    });

    // ===============================
    // Habilitar botón de retroceso
    // ===============================
    new BackButtonManager({
        enableFlag: ON,
        selector: BACK_BUTTON_SELECTOR
    });

    // ===============================
    // Habilitar Formateador numerico
    // ===============================
    new NumberFormatter(FORMAT_NUMBERS_SELECTOR);

    // ===============================
    // Habilitar elemento enfocado
    // ===============================
    new ActiveBordersGroupForm(ACTIVE_BORDER_ELEMENTS);

    // ===============================
    // Habilitar DataTable general
    // ===============================
    new DataTableES(DATATABLE_GENERAL_SELECTOR);

    // ===============================
    // Inicializar Modal confirmacion
    // ===============================

    /* LOGOUT */
    new ConfirmationManager(
        '#logout-btn',
        {
            dataAttr: 'msj_logout',
            onConfirmAction: 'submit',
            enableEnterKey: ON,
        }
    )
    /* CREAR/EDITAR */
    new ConfirmationManager(
        ".save-btn", {
            dataAttr: "msj_create",
            onConfirmAction: "submit",
            enableEnterKey: ON,
            extraSelector: ".valor"
        });

    /* ELIMINAR */
    new ConfirmationManager(
        ".delete-btn", {
            dataAttr: "msj_delete",
            enableEnterKey: ON,
            onConfirmAction: "redirect"
        }
    );

    // ===============================
    //  Inicializar Toasts Sweet2
    // ===============================
    new ToastMessagesSweet2(MESSAGES, ON);

}catch(err){
    console.error(err);
}
