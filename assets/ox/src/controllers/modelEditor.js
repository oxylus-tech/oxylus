import { cloneDeep, isEqual, pick } from 'lodash';
import { toRaw } from 'vue';
import { State } from '../utils';
import Editor from './editor';
/**
 * Editor sub-class used to edit model instances.
 *
 * Regarding properties ({@link IModelEditorProps}):
 * - `name` defaults to `{model.entity}-edit`.
 * - `repo` is mandatory
 *
 */
export default class ModelEditor extends Editor {
    constructor(options) {
        options.fields = Object.keys(options.props.repo.use.fields());
        options.empty ??= new options.props.repo.use();
        super(options);
    }
    get repo() { return this.props.repo; }
    get name() { return this.props.name || `${this.repo.use.entity}-edit`; }
    isEdited() {
        return !isEqual(pick(this.value, this.fields), pick(this.initial, this.fields));
    }
    get url() {
        const url = super.url || this.repo.use?.meta?.url;
        if (!url)
            throw Error("No url specified as parameter or in Model.meta.");
        return url;
    }
    reset(value) {
        if (!value || !Object.keys(value).length)
            value = this.empty;
        const fields = this.fields.filter(k => k in value);
        this.value = cloneDeep(pick(value, fields)) || {};
        this.state.none();
    }
    serialize(value) {
        const cls = this.repo.use;
        const obj = new cls({ ...this.value });
        return obj.$toJson(null, { relations: false });
    }
    send(value, params = {}) {
        let [func, url] = ["post", this.url];
        if (value.id) {
            url = `${url}${value.id}/`;
            func = "put";
        }
        return this.repo.api()[func](url, value, params).then((result) => State.ok(result.entities[0]), (error) => State.error(error.response.data));
    }
}
