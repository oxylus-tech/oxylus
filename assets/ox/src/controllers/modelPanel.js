import { computed, reactive, toRefs } from 'vue';
import { Model } from '../models';
import { mapToObject } from '../utils';
import { t, tKeys } from '../composables/i18n';
import Panel from './panel';
import { query } from './query';
/** This class handles model panel (used by {@link OxModelPanel}. */
export default class ModelPanel extends Panel {
    showFilters = false;
    constructor(options) {
        super(options);
        this.showFilters = this.props?.showFilters || false;
    }
    /** Current model's repository. */
    get repo() { return this.props.repo; }
    /** Current model. */
    get model() { return this.repo.use; }
    /** Query (shortcut to `this.list.query`). **/
    get query() { return this.list.query; }
    /** Return icon based on props and model **/
    get icon() { return super.icon || this.model.meta?.icon; }
    /** Return panel's title based on view and current item. */
    get title() {
        const { props, list } = this;
        const model = this.repo.use;
        if (model) {
            // many items
            if (this.view?.startsWith('list.'))
                return t(tKeys.model(model), 3);
            if (this.view?.startsWith('detail.')) {
                if (this.value?.$title)
                    return this.value.$title;
                const name = t(tKeys.model(model));
                return this.value?.id
                    ? t(`models._.title`, { model: name, id: this.value.id })
                    : t(`models._.title.new`, { model: name });
            }
        }
        return super.title;
    }
    getUrlParams() {
        const { value = null, ...params } = super.getUrlParams();
        if (value?.id)
            params.id = value.id;
        return params;
    }
    /**
     * Edit a new item.
     *
     * @param view - edit view.
     */
    create(view = 'detail.edit') {
        this.show({ view, value: null });
    }
    /** Called when an item has been created. By default, show edit view. */
    created(value, view = "detail.edit") {
        // this.list.load()
        this.show({ view, value });
    }
    show({ id = null, ...params }) {
        if (id) {
            query(this.repo).fetch({ id, relations: this.relations }).then(r => {
                super.show({ ...params, value: r.entities[0] });
                return r;
            });
        }
        else
            return super.show(params);
    }
}
