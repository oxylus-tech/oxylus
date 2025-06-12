import { computed, watch } from 'vue';
import { t } from '../composables';
import { assignNonEmpty, State } from '../utils';
/**
 * This is the base class used by panels.
 */
export default class Panel {
    index = 'list.table';
    view = '';
    value = null;
    item = null;
    editions = new Set();
    /**
     * Translation key for message displayed on `confirm()` to leave unsaved
     * changes.
     */
    confirmTKey = "panel.confirm";
    /** Panel name (based on props) **/
    get name() { return this.props?.name || ''; }
    /** Wether there are still edited items on current view. */
    get edited() { return !!this.editions?.size; }
    /** Return adequate icon based on props and model **/
    get icon() { return this.props?.icon || null; }
    /** Return panel's title based on props. */
    get title() { return this.props?.title; }
    constructor(options = null) {
        options && assignNonEmpty(this, options);
        this.view ??= this.index || '';
    }
    /** Return URL GET parameters for the current view */
    getUrlParams() {
        const params = { panel: this.name };
        if (this.view != this.index)
            params.view = this.view;
        if (this.view.startsWith('detail.') && this.value)
            params.value = this.value;
        return params;
    }
    /** Set or remove an edition by name. */
    setEdition(name, edited) {
        if (edited)
            this.editions.add(name);
        else
            this.editions.delete(name);
    }
    /**
     * Show a view, providing optional value.
     * @return - true if view changed
     */
    show({ view = null, value = null, silent = false, force = false } = {}) {
        if ((view != this.view || value != this.value) && (force || this.onLeave())) {
            this.view = view || this.index;
            this.value = value;
            !silent && this.updateLocation();
            return true;
        }
        return false;
    }
    /** Update current location using History api */
    updateLocation() {
        const params = this.getUrlParams();
        if (params) {
            const url = (new URLSearchParams(params)).toString();
            history.pushState(params, "", `?${url}`);
        }
    }
    /**
     * Called when view or panel changes. It returns `true` if view/panel can be changed.
     *
     * Ask user for confirmation if there is unsaved changes (aka editions).
     *
     * @return true if we can proceed to view/panel change.
     */
    onLeave() {
        if (!this.edited)
            return true;
        const msg = t(this.confirmTKey);
        return confirm(msg);
    }
}
