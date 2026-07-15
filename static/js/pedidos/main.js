import { SmoothWheelScroll } from "../UI/utils/SmoothWheelScroll.js";
import { ProductFilter } from "../UI/utils/ProductFilter .js";
import { RadioPanelController } from '../UI/utils/RadioPanelController.js';


//=========================
// CONSTANTES
//=========================
const GRUPOS_CONTAINER_SELECTOR = ".grupos-filters";
const PRODUCTOS_CONTAINER_SELECTOR = ".productos-container";
const FILTER_PRODUCT_SELECTOR = "#product-filter";
const PRODUCT_CARD_SELECTOR = ".panel-products";
const CONFIG_TOGGLE_PANELS = { 
    radioSelector: '.toggle-panel-products',
    panelSelector: PRODUCT_CARD_SELECTOR 
};

//=========================
// APLICACION
//=========================
try {
   new SmoothWheelScroll(GRUPOS_CONTAINER_SELECTOR, {
        speed: 1.5,
        easing: 0.08
    }).init(); 

    new SmoothWheelScroll(PRODUCTOS_CONTAINER_SELECTOR, {
        speed: 1.5,
        easing: 0.08
    }).init(); 

    new ProductFilter(
        FILTER_PRODUCT_SELECTOR,
        PRODUCT_CARD_SELECTOR
    ).init();

    new RadioPanelController(CONFIG_TOGGLE_PANELS).init();

} catch (error) {
    console.error(error);
}
