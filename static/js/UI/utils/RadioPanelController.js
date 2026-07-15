/**
 * @file RadioPanelController.js
 * @description
 * Controlador de radios tipo "toggle" (seleccionable / deseleccionable)
 * que muestra u oculta paneles asociados mediante data-relation.
 *
 * 🔥 COMPORTAMIENTO PRINCIPAL
 * - Los radios funcionan como toggle (no comportamiento nativo)
 * - Click en un radio:
 *    - si estaba activo → se desactiva
 *    - si no estaba activo → se activa
 *
 * - Si NO hay ningún radio seleccionado:
 *    → se muestran TODOS los paneles del grupo
 *
 * - Si hay uno seleccionado:
 *    → solo se muestra su panel asociado
 *
 * 📌 ESTRUCTURA ESPERADA
 *
 * Radio:
 * <input
 *   type="radio"
 *   class="toggle-panel-products"
 *   name="grupo"
 *   data-relation="1"
 * >
 *
 * Panel:
 * <div
 *   class="panel-products"
 *   data-relation="1"
 * >
 *   ...
 * </div>
 *
 * ⚠️ NOTA:
 * Este comportamiento rompe la semántica estándar de radio buttons,
 * ya que HTML no permite desmarcar radios de forma nativa.
 */

export class RadioPanelController {
  /**
   * @param {Object} options
   * @param {string} options.radioSelector Selector de radios
   * @param {string} options.panelSelector Selector de paneles
   * @param {boolean} [options.useHidden=true] Usa atributo hidden o display none
   */
  constructor({
    radioSelector = '.toggle-panel-products',
    panelSelector = '.panel-products',
    useHidden = true
  } = {}) {
    if (!radioSelector?.trim()) {
      throw new TypeError('radioSelector debe ser un selector válido');
    }

    if (!panelSelector?.trim()) {
      throw new TypeError('panelSelector debe ser un selector válido');
    }

    /** @type {string} */
    this.radioSelector = radioSelector;

    /** @type {string} */
    this.panelSelector = panelSelector;

    /** @type {boolean} */
    this.useHidden = useHidden;

    /** @type {HTMLElement[]} */
    this._radios = [];

    /** @type {Map<string, HTMLElement>} */
    this._panelMap = new Map();

    /** @type {boolean} */
    this._initialized = false;

    /**
     * Guarda último radio activo por grupo
     * @type {Map<string, HTMLInputElement>}
     */
    this._lastChecked = new Map();

    this._handleClick = this._handleClick.bind(this);
  }

  /**
   * Inicializa el controlador y registra eventos.
   * @returns {RadioPanelController}
   */
  init() {
    if (this._initialized) return this;

    this.refresh();

    this._radios.forEach(radio => {
      radio.addEventListener('click', this._handleClick);
    });

    this._initialized = true;
    return this;
  }

  /**
   * Recarga radios y paneles desde el DOM.
   * Útil para contenido dinámico.
   *
   * @returns {RadioPanelController}
   */
  refresh() {
    this._radios = Array.from(
      document.querySelectorAll(this.radioSelector)
    );

    this._panelMap.clear();

    document.querySelectorAll(this.panelSelector).forEach(panel => {
      const relation = panel.dataset.relation?.trim();
      if (!relation) return;

      this._panelMap.set(relation, panel);
    });

    this.sync();
    return this;
  }

  /**
   * Sincroniza todos los grupos de radios.
   * @returns {RadioPanelController}
   */
  sync() {
    const groups = new Set(
      this._radios.map(r => r.name || '__default__')
    );

    groups.forEach(group => this._syncGroup(group));

    return this;
  }

  /**
   * Maneja toggle manual de radios (permitiendo deselección).
   *
   * @param {MouseEvent} event
   * @private
   */
  _handleClick(event) {
    const radio = event.currentTarget;
    const group = radio.name || '__default__';

    const last = this._lastChecked.get(group);

    // Si vuelve a hacer click en el mismo → deseleccionar
    if (last === radio) {
      radio.checked = false;
      this._lastChecked.delete(group);
    } else {
      this._lastChecked.set(group, radio);
      radio.checked = true;
    }

    this._syncGroup(group);
  }

  /**
   * Sincroniza un grupo específico de radios con sus paneles.
   *
   * @param {string} groupName
   * @private
   */
  _syncGroup(groupName) {
    const radios = this._radios.filter(
      r => (r.name || '__default__') === groupName
    );

    const selected = radios.find(r => r.checked);

    // 🟢 Caso: ninguno seleccionado → mostrar todo
    if (!selected) {
      radios.forEach(radio => {
        const panel = this._panelMap.get(radio.dataset.relation);
        if (panel) this._show(panel);
      });
      return;
    }

    // 🔴 Caso: uno seleccionado → mostrar solo ese
    radios.forEach(radio => {
      const panel = this._panelMap.get(radio.dataset.relation);
      if (!panel) return;

      radio === selected ? this._show(panel) : this._hide(panel);
    });
  }

  /**
   * Muestra un panel.
   * @param {HTMLElement} panel
   * @private
   */
  _show(panel) {
    if (this.useHidden) {
      panel.hidden = false;
    } else {
      panel.style.display = '';
    }
  }

  /**
   * Oculta un panel.
   * @param {HTMLElement} panel
   * @private
   */
  _hide(panel) {
    if (this.useHidden) {
      panel.hidden = true;
    } else {
      panel.style.display = 'none';
    }
  }

  /**
   * Limpia eventos y referencias internas.
   * @returns {void}
   */
  destroy() {
    this._radios.forEach(radio => {
      radio.removeEventListener('click', this._handleClick);
    });

    this._radios = [];
    this._panelMap.clear();
    this._lastChecked.clear();
    this._initialized = false;
  }
}