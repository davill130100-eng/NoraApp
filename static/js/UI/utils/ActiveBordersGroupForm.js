    /* =============================
    ESTILIZADOR BORDES DE GRUPOS HTML
    ==============================*/
    export class ActiveBordersGroupForm {
    /**
    * - Estiliza visualmente los bordes de todo elemento que posea la calse `group_selector` dentro de un formulario de forma dinamica, contempla el enfoque, desenfoque y tabulacion en los campos asociados.
    * @param {HTMLElement} group_selector - Grupos afectar
    */
        constructor(group_selector){

            if (!group_selector) {
                throw new Error('ActiveBordersGroupForm: No se encontro algun elemento con la clase "active-border-group"');
            }     

            this.groups = group_selector;
            this.lastTabDirection  = 'forward';

            this.initActiveBorderGroup();
        }

        initActiveBorderGroup(){

            document.addEventListener('keydown', e => {
                if (e.key === 'Tab') {
                    this.lastTabDirection = e.shiftKey ? 'backward' : 'forward';
                }
            });

            this.groups.forEach(group => {
                group.addEventListener('focusin', e => {
                this.groups.forEach(g => g.classList.remove('is-active'));

                group.classList.add('active-neon-border', 'is-active');
                group.dataset.tabDirection = this.lastTabDirection;
                });

                group.addEventListener('focusout', e => {
                if (!group.contains(e.relatedTarget)) {
                group.classList.remove('is-active');
                }
                });
            });

            document.addEventListener('click', e => {
                if (![...this.groups].some(g => g.contains(e.target))) {
                    this.groups.forEach(g => g.classList.remove('is-active'));
                }
            });

        }
    }