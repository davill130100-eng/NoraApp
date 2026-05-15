import { ArqueoDataTable } from '../UI/utils/DatatableArqueos.js';

// ===============================
//  CONSTANTES 
// ===============================
const ON = true;
const DATATABLE_ARQUEOS_SELECTOR = "#tabla-arqueo";

// ===============================
// APLICACION
// ===============================
try{
    // Inicializar DataTable de arqueos
    new ArqueoDataTable(DATATABLE_ARQUEOS_SELECTOR, ON);
}catch(err){
    console.error(err);
}