var ae = Object.defineProperty;
var ue = (r, e, t) => e in r ? ae(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var g = (r, e, t) => ue(r, typeof e != "symbol" ? e + "" : e, t);
import { C as le, G as ce, M as he, a as de, P as fe, b as C, U as S, c as Z, g as me, u as z, d as ge, R as pe, e as Y, S as A, r as ye, f as we, h as R, i as ve, j as be, k as De, l as Me, s as Ae, m as Te, n as J, o as Se } from "./vue-i18n-CcErOqM_.js";
import { w as kr, t as Pr, x as Er, q as Cr, v as Fr, p as Ir } from "./vue-i18n-CcErOqM_.js";
import { reactive as w, provide as b, computed as y, unref as D, ref as xe, isRef as Oe, watch as k, nextTick as ke, createApp as Pe, toRefs as Ee, defineAsyncComponent as Ce } from "vue";
import Fe from "axios";
import * as Ie from "ox/vendor";
import { OxList as Re } from "ox/components";
import { c as Ye, p as _, m as Q, a as _e, b as $e, d as Le, e as Ne, f as Ve, g as je, h as Be, D as $, i as L, T as N, I as V, L as j, G as Ue, j as Ke, k as We, l as He } from "./theme-CVupjJDc.js";
const fr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentType: le,
  Group: ce,
  Meta: he,
  Model: de,
  Permission: fe,
  Permissions: C,
  User: S
}, Symbol.toStringTag, { value: "Module" }));
class Ge {
  constructor(e) {
    g(this, "view", "list.table");
    g(this, "index", "list.table");
    g(this, "confirm", "There are unsaved changes on the current page. Are you sure to proceed?");
    Z(this, e);
  }
  static reactive(e) {
    return w(new this(e));
  }
  /**
   * Wether there are still edited items on current view.
   */
  get edited() {
    var e;
    return !!((e = this.editions) != null && e.size);
  }
  /**
   * Set or remove an edition by name.
   */
  setEdition(e, t) {
    t ? this.editions.add(e) : this.editions.delete(e);
  }
  /**
   * Change the current panel and view.
   *
   * @param path - view's path.
   * @param value - value or model instance associated with the view
   * @param options - view's informations.
   * @param reset - if provided, {@link Panel.reset} with these options
   */
  show({ path: e = "", value: t = null, force: n = !1, href: s = "" } = {}, o = null) {
    if (!this.askConfirmation(n))
      return;
    if (s && window.location.pathname != s) {
      window.location.href = `${s}?panel=${e}`;
      return;
    }
    o && this.reset(o);
    const [i, a] = this.splitPath(e);
    i && (this.name = i), this.view = a || this.index, this.value = t, this.editions = /* @__PURE__ */ new Set();
  }
  /**
   * Reset current panel informations.
   *
   * @param options - update those informations;
   * @param name - if provided, only update information if current panel name is this one.
   */
  reset(e, t = null) {
    (!t || t == this.name) && Object.assign(this, e);
  }
  /**
   * Ask user for confirmation if there is unsaved changes (aka editions).
   * @return true if we can discard changes.
   */
  askConfirmation(e = !1) {
    return e || !this.edited ? !0 : confirm(this.confirm);
  }
  splitPath(e) {
    if (!e)
      return ["", ""];
    const t = e.indexOf(".");
    return t < 0 ? [e, ""] : [e.substring(0, t), e.substring(t + 1)];
  }
  /**
   * Return panel's title based on current view and value.
   *
   * @param t - vue-i18n composer.
   * @return a string with the title or empty if none is suitable.
   */
  getTitle() {
    var t, n;
    const e = (t = this.value) == null ? void 0 : t.constructor;
    if (e instanceof Model) {
      if ((n = this.view) != null && n.startsWith("list."))
        return p(O(e), 3);
      if (this.value) {
        if (this.value.title)
          return this.value.title;
        const s = p(O(e));
        return this.value.id ? p("models._.title", { model: s, id: this.value.id }) : p("models._.title.new", { model: s });
      }
    }
    return "";
  }
}
function mr({ name: r = "", relations: e = [], headers: t = [] } = {}) {
  return {
    name: { type: String, default: r },
    tabbed: { type: Boolean, default: !1 },
    relations: { type: Array, default: () => e },
    headers: { type: Array, default: () => [
      ...t,
      { key: "actions", title: "Actions" }
    ] }
  };
}
var qe = Object.defineProperty, Ze = (r, e, t) => e in r ? qe(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, M = (r, e, t) => (Ze(r, typeof e != "symbol" ? e + "" : e, t), t);
class ze {
  /**
   * Create a new response instance.
   */
  constructor(e, t, n) {
    M(this, "repository"), M(this, "config"), M(this, "response"), M(this, "entities", null), M(this, "isSaved", !1), this.repository = e, this.config = t, this.response = n;
  }
  /**
   * Save response data to the store.
   */
  async save() {
    const e = this.getDataFromResponse();
    if (!this.validateData(e)) {
      console.warn(
        "[Pinia ORM Axios] The response data could not be saved to the store because it is not an object or an array. You might want to use `dataTransformer` option to handle non-array/object response before saving it to the store."
      );
      return;
    }
    let t = this.config.persistBy || "save";
    this.validatePersistAction(t) || (console.warn(
      '[Pinia ORM Axios] The "persistBy" option configured is not a recognized value. Response data will be persisted by the default `save` method.'
    ), t = "save");
    const n = await this.repository[t](e);
    this.entities = Array.isArray(n) ? n : [n], this.isSaved = !0;
  }
  /**
   * Delete the entity record where the `delete` option is configured.
   */
  async delete() {
    if (this.config.delete === void 0)
      throw new Error(
        "[Pinia ORM Axios] Could not delete records because the `delete` option is not set."
      );
    await this.repository.query().destroy(this.config.delete);
  }
  /**
   * Get the response data from the axios response object. If a `dataTransformer`
   * option is configured, it will be applied to the response object. If the
   * `dataKey` option is configured, it will return the data from the given
   * property within the response body.
   */
  getDataFromResponse() {
    return this.config.dataTransformer ? this.config.dataTransformer(this.response) : this.config.dataKey ? this.response.data[this.config.dataKey] : this.response.data;
  }
  /**
   * Get persist options if any set in config.
   */
  // protected getPersistOptions (): PersistOptions | undefined {
  //   const persistOptions = this.config.persistOptions
  //
  //   if (!persistOptions || typeof persistOptions !== 'object') {
  //     return
  //   }
  //
  //   return Object.keys(persistOptions)
  //     .filter(this.validatePersistAction) // Filter to avoid polluting the payload.
  //     .reduce((carry, key) => {
  //       carry[key] = persistOptions[key]
  //       return carry
  //     }, {} as PersistOptions)
  // }
  /**
   * Validate the given data to ensure the Pinia ORM persist methods accept it.
   */
  validateData(e) {
    return e !== null && typeof e == "object";
  }
  /**
   * Validate the given string as to ensure it correlates with the available
   * Pinia ORM persist methods.
   */
  validatePersistAction(e) {
    return ["save", "insert"].includes(e);
  }
}
var Je = Object.defineProperty, Qe = (r, e, t) => e in r ? Je(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, B = (r, e, t) => (Qe(r, typeof e != "symbol" ? e + "" : e, t), t);
class Xe {
  /**
   * Create a new api instance.
   */
  constructor(e) {
    B(this, "repository"), B(this, "config", {
      save: !0
    }), this.repository = e, this.registerActions();
  }
  /**
   * Get the axios client.
   */
  get axios() {
    if (!this.repository.axios)
      throw new Error(
        "[Pinia ORM Axios] The axios instance is not registered. Please register the axios instance to the repository."
      );
    return this.repository.axios;
  }
  /**
   * Register actions from the repository config.
   */
  registerActions() {
    var t, n, s;
    const e = { ...(t = this.repository.config.axiosApi) == null ? void 0 : t.actions, ...(s = (n = this.repository.getModel().$config()) == null ? void 0 : n.axiosApi) == null ? void 0 : s.actions };
    if (e)
      for (const o in e) {
        const i = e[o];
        typeof i == "function" ? this.registerFunctionAction(o, i) : this.registerObjectAction(o, i);
      }
  }
  /**
   * Register the given object action.
   */
  registerObjectAction(e, t) {
    this[e] = (n) => this.request({ ...t, ...n });
  }
  /**
   * Register the given function action.
   */
  registerFunctionAction(e, t) {
    this[e] = t.bind(this);
  }
  /**
   * Perform a get request.
   */
  get(e, t = {}) {
    return this.request({ method: "get", url: e, ...t });
  }
  /**
   * Perform a post request.
   */
  post(e, t = {}, n = {}) {
    return this.request({ method: "post", url: e, data: t, ...n });
  }
  /**
   * Perform a put request.
   */
  put(e, t = {}, n = {}) {
    return this.request({ method: "put", url: e, data: t, ...n });
  }
  /**
   * Perform a patch request.
   */
  patch(e, t = {}, n = {}) {
    return this.request({ method: "patch", url: e, data: t, ...n });
  }
  /**
   * Perform a delete request.
   */
  delete(e, t = {}) {
    return this.request({ method: "delete", url: e, ...t });
  }
  /**
   * Perform an api request.
   */
  async request(e) {
    const t = this.createConfig(e), n = await this.axios.request(t);
    return this.createResponse(n, t);
  }
  /**
   * Create a new config by merging the global config, the repository config,
   * and the given config.
   */
  createConfig(e) {
    return {
      ...this.config,
      ...this.repository.globalApiConfig,
      ...this.repository.apiConfig,
      ...e
    };
  }
  /**
   * Create a new response instance by applying a few initialization processes.
   * For example, it saves response data if `save` option id set to `true`.
   */
  async createResponse(e, t) {
    const n = new ze(this.repository, t, e);
    return t.delete !== void 0 ? (await n.delete(), n) : (t.save && await n.save(), n);
  }
}
var et = Object.defineProperty, tt = (r, e, t) => e in r ? et(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, E = (r, e, t) => (tt(r, typeof e != "symbol" ? e + "" : e, t), t);
class U extends pe {
  constructor() {
    var e, t, n;
    super(...arguments), E(this, "axios", ((t = (e = Y) == null ? void 0 : e.axiosApi) == null ? void 0 : t.axios) || null), E(this, "globalApiConfig", ((n = Y) == null ? void 0 : n.axiosApi) || {}), E(this, "apiConfig", {});
  }
  api() {
    return rt(this);
  }
  setAxios(e) {
    return this.axios = e, this;
  }
}
function rt(r) {
  return new Xe(r);
}
function nt(r) {
  const e = me();
  return U.useModel = r, z(U, e);
}
function st(r) {
  return ge((e) => (e.config.axiosApi = r, e));
}
function it(r, e = !0) {
  const t = {};
  Array.isArray(r) || (r = Object.values(r)), e && !r.includes(S) && r.push(S);
  for (const n of r)
    if (n && n.entity) {
      if (n.entity in t)
        continue;
      z(n), t[n.entity] = nt(n);
    }
  return b("models", r), b("repos", t), { models: r, repos: t };
}
function gr() {
  return {
    permissions: [String, Function, Object, Array]
  };
}
function ot(r, e, t) {
  const n = e instanceof C ? e : new C(e), s = y(() => n.can(D(r), D(t)));
  return { permissions: n, allowed: s };
}
class at {
  static reactive(e) {
    const t = w(new this(e));
    return t.user = y(() => {
      var n;
      return new S(((n = t.data) == null ? void 0 : n.user) || {});
    }), t;
  }
  constructor(e = {}) {
    Object.assign(this, e), this.panel = new Ge(), this.state = A.none(), this.showState = !1;
  }
  /**
   * Load data into AppData. If no `value` is provided, read it from
   * source element.
   */
  load(e = void 0) {
    this.dataEl !== void 0 && (e === void 0 && (e = this.readData(this.dataEl)), e.dataEl = this.dataEl, this.data = e, this.panel && this.data.panel && (this.panel.value = e)), this.models !== void 0 && (this.repos = it(this.models).repos);
  }
  /**
   * Read data from the context of provided source element.
   * @param {String} el - id of the DOM element.
   * @return {Object} read data
   */
  readData(e) {
    const t = document.getElementById(e);
    if (!t)
      throw "Element {elementId} not found";
    return t.innerText ? JSON.parse(t.innerText) : {};
  }
}
function pr(r, e = !0) {
  const t = at.reactive(r);
  return e && t.dataEl && t.load(), b("context", t), b("user", t.user), b("panel", t.panel), t;
}
class ut {
  constructor(e, t) {
    Object.assign(this, e), this.props = t, this.processing = xe(!1);
    const n = ot(this.user, t.permissions, t.item);
    this.permissions = n.permissions, this.allowed = n.allowed;
  }
  /**
   * Execute the action.
   */
  async run(...e) {
    if (this.props.confirm && !confirm(this.props.confirm))
      return;
    if (!this.allowed.value)
      throw Error("You are not allowed to execute this action");
    this.processing.value = !0;
    let t = this.props.run(this.user, this.props.item, ...e);
    return t instanceof Promise && (t = await t), this.processing.value = !1, this.emits && this.emits("completed", this.props.item, ...e), t;
  }
}
function yr(r, e) {
  return new ut(r, e);
}
class X {
  static reactive({ initial: e, ...t }) {
    const n = w(new this({ initial: D(e), ...t }));
    return n.edited = y(() => n.isEdited()), Oe(e) && k(e, (s) => n.reset(s)), n;
  }
  constructor(e, t = {}) {
    Object.assign(this, e), Object.assign(this, t), this.state || (this.state = new A()), this.value = {}, this.reset(this.initial);
  }
  get errors() {
    return this.state.isError && this.state.data || null;
  }
  /**
  * Reset editor editor data to initial.
  * When value is provided, reset initial to this value.
  */
  reset(e = null) {
    e !== null ? this.initial = e : e = this.initial, this._reset(e), this.state.none();
  }
  _reset(e) {
    ye(this.value, e);
  }
  isValid() {
    return this._isValid();
  }
  _isValid() {
    return !0;
  }
  isEdited() {
    return Object.keys(this.value).some((e) => this.value[e] != this.initial[e]);
  }
  /**
   * Save data. It will `serialize()` value then `send()` it.
   *
   * Note: default implementation does not provide `send()` method
   * and thus will raise an error.
   *
   * @param [value] if provided use this instead of `this.value`.
   * @return state.
   */
  async save(e = null) {
    var n;
    if (this.state.processing(), !this.isValid())
      return this.state.error({
        _: "Some of the input values are invalid"
      });
    e = this.serialize(e ?? this.value);
    const t = await this.send(e);
    return t.isOk ? (this.reset(t.data), (n = this.saved) == null || n.call(this, this.value, this)) : this.state = t, this.state;
  }
  /**
   * Serialize value before sending
   */
  serialize(e) {
    return e;
  }
  /**
   * Send value (not implemented, MUST BE in subclasses).
   */
  send(e) {
    throw "not implemented";
  }
}
class lt extends X {
  constructor({ repo: e, url: t, ...n }) {
    var s, o;
    t = t || ((o = (s = e.use) == null ? void 0 : s.meta) == null ? void 0 : o.url), super({ url: t, ...n }, { repo: e });
  }
  get fields() {
    return this._fields || (this._fields = Object.keys(this.repo.use.fields())), this._fields;
  }
  _reset(e) {
    this.value = w(new this.initial.constructor()), this.fields.reduce((t, n) => (t[n] = e[n], t), this.value);
  }
  isEdited() {
    return this.fields.some((e) => this.value[e] != this.initial[e]);
  }
  serialize(e) {
    return e.$toJson(null, { relations: !1 });
  }
  send(e) {
    let [t, n] = ["post", this.url];
    return e.id && (n = `${n}${e.id}/`, t = "put"), this.repo.api()[t](n, e).then(
      (s) => A.ok(s.entities[0]),
      (s) => A.error(s.response.data)
    );
  }
}
function ct({ editorClass: r = X, emits: e = null, panel: t = null, ...n }) {
  e && (n.saved ?? (n.saved = (o, i) => e("saved", o, i)));
  const s = r.reactive(n);
  return t && k(() => s.edited, (o) => t.setEdition(s.name, o)), s;
}
function wr(r) {
  return ct({ ...r, editorClass: lt });
}
const P = {
  "001": 1,
  AD: 1,
  AE: 6,
  AF: 6,
  AG: 0,
  AI: 1,
  AL: 1,
  AM: 1,
  AN: 1,
  AR: 1,
  AS: 0,
  AT: 1,
  AU: 1,
  AX: 1,
  AZ: 1,
  BA: 1,
  BD: 0,
  BE: 1,
  BG: 1,
  BH: 6,
  BM: 1,
  BN: 1,
  BR: 0,
  BS: 0,
  BT: 0,
  BW: 0,
  BY: 1,
  BZ: 0,
  CA: 0,
  CH: 1,
  CL: 1,
  CM: 1,
  CN: 1,
  CO: 0,
  CR: 1,
  CY: 1,
  CZ: 1,
  DE: 1,
  DJ: 6,
  DK: 1,
  DM: 0,
  DO: 0,
  DZ: 6,
  EC: 1,
  EE: 1,
  EG: 6,
  ES: 1,
  ET: 0,
  FI: 1,
  FJ: 1,
  FO: 1,
  FR: 1,
  GB: 1,
  "GB-alt-variant": 0,
  GE: 1,
  GF: 1,
  GP: 1,
  GR: 1,
  GT: 0,
  GU: 0,
  HK: 0,
  HN: 0,
  HR: 1,
  HU: 1,
  ID: 0,
  IE: 1,
  IL: 0,
  IN: 0,
  IQ: 6,
  IR: 6,
  IS: 1,
  IT: 1,
  JM: 0,
  JO: 6,
  JP: 0,
  KE: 0,
  KG: 1,
  KH: 0,
  KR: 0,
  KW: 6,
  KZ: 1,
  LA: 0,
  LB: 1,
  LI: 1,
  LK: 1,
  LT: 1,
  LU: 1,
  LV: 1,
  LY: 6,
  MC: 1,
  MD: 1,
  ME: 1,
  MH: 0,
  MK: 1,
  MM: 0,
  MN: 1,
  MO: 0,
  MQ: 1,
  MT: 0,
  MV: 5,
  MX: 0,
  MY: 1,
  MZ: 0,
  NI: 0,
  NL: 1,
  NO: 1,
  NP: 0,
  NZ: 1,
  OM: 6,
  PA: 0,
  PE: 0,
  PH: 0,
  PK: 0,
  PL: 1,
  PR: 0,
  PT: 0,
  PY: 0,
  QA: 6,
  RE: 1,
  RO: 1,
  RS: 1,
  RU: 1,
  SA: 0,
  SD: 6,
  SE: 1,
  SG: 0,
  SI: 1,
  SK: 1,
  SM: 1,
  SV: 0,
  SY: 6,
  TH: 0,
  TJ: 1,
  TM: 1,
  TR: 1,
  TT: 0,
  TW: 0,
  UA: 1,
  UM: 0,
  US: 0,
  UY: 1,
  UZ: 1,
  VA: 1,
  VE: 0,
  VI: 0,
  VN: 1,
  WS: 0,
  XK: 1,
  YE: 0,
  ZA: 0,
  ZW: 0
};
function ht(r, e, t) {
  const n = [];
  let s = [];
  const o = ee(r), i = te(r), a = t ?? P[e.slice(-2).toUpperCase()] ?? 0, u = (o.getDay() - a + 7) % 7, f = (i.getDay() - a + 7) % 7;
  for (let l = 0; l < u; l++) {
    const h = new Date(o);
    h.setDate(h.getDate() - (u - l)), s.push(h);
  }
  for (let l = 1; l <= i.getDate(); l++) {
    const h = new Date(r.getFullYear(), r.getMonth(), l);
    s.push(h), s.length === 7 && (n.push(s), s = []);
  }
  for (let l = 1; l < 7 - f; l++) {
    const h = new Date(i);
    h.setDate(h.getDate() + l), s.push(h);
  }
  return s.length > 0 && n.push(s), n;
}
function dt(r, e, t) {
  const n = t ?? P[e.slice(-2).toUpperCase()] ?? 0, s = new Date(r);
  for (; s.getDay() !== n; )
    s.setDate(s.getDate() - 1);
  return s;
}
function ft(r, e) {
  const t = new Date(r), n = ((P[e.slice(-2).toUpperCase()] ?? 0) + 6) % 7;
  for (; t.getDay() !== n; )
    t.setDate(t.getDate() + 1);
  return t;
}
function ee(r) {
  return new Date(r.getFullYear(), r.getMonth(), 1);
}
function te(r) {
  return new Date(r.getFullYear(), r.getMonth() + 1, 0);
}
function mt(r) {
  const e = r.split("-").map(Number);
  return new Date(e[0], e[1] - 1, e[2]);
}
const gt = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
function re(r) {
  if (r == null) return /* @__PURE__ */ new Date();
  if (r instanceof Date) return r;
  if (typeof r == "string") {
    let e;
    if (gt.test(r))
      return mt(r);
    if (e = Date.parse(r), !isNaN(e)) return new Date(e);
  }
  return null;
}
const K = new Date(2e3, 0, 2);
function pt(r, e) {
  const t = e ?? P[r.slice(-2).toUpperCase()] ?? 0;
  return Ye(7).map((n) => {
    const s = new Date(K);
    return s.setDate(K.getDate() + t + n), new Intl.DateTimeFormat(r, {
      weekday: "narrow"
    }).format(s);
  });
}
function yt(r, e, t, n) {
  const s = re(r) ?? /* @__PURE__ */ new Date(), o = n == null ? void 0 : n[e];
  if (typeof o == "function")
    return o(s, e, t);
  let i = {};
  switch (e) {
    case "fullDate":
      i = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      break;
    case "fullDateWithWeekday":
      i = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      break;
    case "normalDate":
      const a = s.getDate(), u = new Intl.DateTimeFormat(t, {
        month: "long"
      }).format(s);
      return `${a} ${u}`;
    case "normalDateWithWeekday":
      i = {
        weekday: "short",
        day: "numeric",
        month: "short"
      };
      break;
    case "shortDate":
      i = {
        month: "short",
        day: "numeric"
      };
      break;
    case "year":
      i = {
        year: "numeric"
      };
      break;
    case "month":
      i = {
        month: "long"
      };
      break;
    case "monthShort":
      i = {
        month: "short"
      };
      break;
    case "monthAndYear":
      i = {
        month: "long",
        year: "numeric"
      };
      break;
    case "monthAndDate":
      i = {
        month: "long",
        day: "numeric"
      };
      break;
    case "weekday":
      i = {
        weekday: "long"
      };
      break;
    case "weekdayShort":
      i = {
        weekday: "short"
      };
      break;
    case "dayOfMonth":
      return new Intl.NumberFormat(t).format(s.getDate());
    case "hours12h":
      i = {
        hour: "numeric",
        hour12: !0
      };
      break;
    case "hours24h":
      i = {
        hour: "numeric",
        hour12: !1
      };
      break;
    case "minutes":
      i = {
        minute: "numeric"
      };
      break;
    case "seconds":
      i = {
        second: "numeric"
      };
      break;
    case "fullTime":
      i = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: !0
      };
      break;
    case "fullTime12h":
      i = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: !0
      };
      break;
    case "fullTime24h":
      i = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: !1
      };
      break;
    case "fullDateTime":
      i = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: !0
      };
      break;
    case "fullDateTime12h":
      i = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: !0
      };
      break;
    case "fullDateTime24h":
      i = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: !1
      };
      break;
    case "keyboardDate":
      i = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      };
      break;
    case "keyboardDateTime":
      i = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: !1
      };
      break;
    case "keyboardDateTime12h":
      i = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: !0
      };
      break;
    case "keyboardDateTime24h":
      i = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: !1
      };
      break;
    default:
      i = o ?? {
        timeZone: "UTC",
        timeZoneName: "short"
      };
  }
  return new Intl.DateTimeFormat(t, i).format(s);
}
function wt(r, e) {
  const t = r.toJsDate(e), n = t.getFullYear(), s = _(String(t.getMonth() + 1), 2, "0"), o = _(String(t.getDate()), 2, "0");
  return `${n}-${s}-${o}`;
}
function vt(r) {
  const [e, t, n] = r.split("-").map(Number);
  return new Date(e, t - 1, n);
}
function bt(r, e) {
  const t = new Date(r);
  return t.setMinutes(t.getMinutes() + e), t;
}
function Dt(r, e) {
  const t = new Date(r);
  return t.setHours(t.getHours() + e), t;
}
function Mt(r, e) {
  const t = new Date(r);
  return t.setDate(t.getDate() + e), t;
}
function At(r, e) {
  const t = new Date(r);
  return t.setDate(t.getDate() + e * 7), t;
}
function Tt(r, e) {
  const t = new Date(r);
  return t.setDate(1), t.setMonth(t.getMonth() + e), t;
}
function St(r) {
  return r.getFullYear();
}
function xt(r) {
  return r.getMonth();
}
function Ot(r) {
  return r.getDate();
}
function kt(r) {
  return new Date(r.getFullYear(), r.getMonth() + 1, 1);
}
function Pt(r) {
  return new Date(r.getFullYear(), r.getMonth() - 1, 1);
}
function Et(r) {
  return r.getHours();
}
function Ct(r) {
  return r.getMinutes();
}
function Ft(r) {
  return new Date(r.getFullYear(), 0, 1);
}
function It(r) {
  return new Date(r.getFullYear(), 11, 31);
}
function Rt(r, e) {
  return x(r, e[0]) && $t(r, e[1]);
}
function Yt(r) {
  const e = new Date(r);
  return e instanceof Date && !isNaN(e.getTime());
}
function x(r, e) {
  return r.getTime() > e.getTime();
}
function _t(r, e) {
  return x(F(r), F(e));
}
function $t(r, e) {
  return r.getTime() < e.getTime();
}
function W(r, e) {
  return r.getTime() === e.getTime();
}
function Lt(r, e) {
  return r.getDate() === e.getDate() && r.getMonth() === e.getMonth() && r.getFullYear() === e.getFullYear();
}
function Nt(r, e) {
  return r.getMonth() === e.getMonth() && r.getFullYear() === e.getFullYear();
}
function Vt(r, e) {
  return r.getFullYear() === e.getFullYear();
}
function jt(r, e, t) {
  const n = new Date(r), s = new Date(e);
  switch (t) {
    case "years":
      return n.getFullYear() - s.getFullYear();
    case "quarters":
      return Math.floor((n.getMonth() - s.getMonth() + (n.getFullYear() - s.getFullYear()) * 12) / 4);
    case "months":
      return n.getMonth() - s.getMonth() + (n.getFullYear() - s.getFullYear()) * 12;
    case "weeks":
      return Math.floor((n.getTime() - s.getTime()) / (1e3 * 60 * 60 * 24 * 7));
    case "days":
      return Math.floor((n.getTime() - s.getTime()) / (1e3 * 60 * 60 * 24));
    case "hours":
      return Math.floor((n.getTime() - s.getTime()) / (1e3 * 60 * 60));
    case "minutes":
      return Math.floor((n.getTime() - s.getTime()) / (1e3 * 60));
    case "seconds":
      return Math.floor((n.getTime() - s.getTime()) / 1e3);
    default:
      return n.getTime() - s.getTime();
  }
}
function Bt(r, e) {
  const t = new Date(r);
  return t.setHours(e), t;
}
function Ut(r, e) {
  const t = new Date(r);
  return t.setMinutes(e), t;
}
function Kt(r, e) {
  const t = new Date(r);
  return t.setMonth(e), t;
}
function Wt(r, e) {
  const t = new Date(r);
  return t.setDate(e), t;
}
function Ht(r, e) {
  const t = new Date(r);
  return t.setFullYear(e), t;
}
function F(r) {
  return new Date(r.getFullYear(), r.getMonth(), r.getDate(), 0, 0, 0, 0);
}
function Gt(r) {
  return new Date(r.getFullYear(), r.getMonth(), r.getDate(), 23, 59, 59, 999);
}
class qt {
  constructor(e) {
    this.locale = e.locale, this.formats = e.formats;
  }
  date(e) {
    return re(e);
  }
  toJsDate(e) {
    return e;
  }
  toISO(e) {
    return wt(this, e);
  }
  parseISO(e) {
    return vt(e);
  }
  addMinutes(e, t) {
    return bt(e, t);
  }
  addHours(e, t) {
    return Dt(e, t);
  }
  addDays(e, t) {
    return Mt(e, t);
  }
  addWeeks(e, t) {
    return At(e, t);
  }
  addMonths(e, t) {
    return Tt(e, t);
  }
  getWeekArray(e, t) {
    return ht(e, this.locale, t ? Number(t) : void 0);
  }
  startOfWeek(e, t) {
    return dt(e, this.locale, t ? Number(t) : void 0);
  }
  endOfWeek(e) {
    return ft(e, this.locale);
  }
  startOfMonth(e) {
    return ee(e);
  }
  endOfMonth(e) {
    return te(e);
  }
  format(e, t) {
    return yt(e, t, this.locale, this.formats);
  }
  isEqual(e, t) {
    return W(e, t);
  }
  isValid(e) {
    return Yt(e);
  }
  isWithinRange(e, t) {
    return Rt(e, t);
  }
  isAfter(e, t) {
    return x(e, t);
  }
  isAfterDay(e, t) {
    return _t(e, t);
  }
  isBefore(e, t) {
    return !x(e, t) && !W(e, t);
  }
  isSameDay(e, t) {
    return Lt(e, t);
  }
  isSameMonth(e, t) {
    return Nt(e, t);
  }
  isSameYear(e, t) {
    return Vt(e, t);
  }
  setMinutes(e, t) {
    return Ut(e, t);
  }
  setHours(e, t) {
    return Bt(e, t);
  }
  setMonth(e, t) {
    return Kt(e, t);
  }
  setDate(e, t) {
    return Wt(e, t);
  }
  setYear(e, t) {
    return Ht(e, t);
  }
  getDiff(e, t, n) {
    return jt(e, t, n);
  }
  getWeekdays(e) {
    return pt(this.locale, e ? Number(e) : void 0);
  }
  getYear(e) {
    return St(e);
  }
  getMonth(e) {
    return xt(e);
  }
  getDate(e) {
    return Ot(e);
  }
  getNextMonth(e) {
    return kt(e);
  }
  getPreviousMonth(e) {
    return Pt(e);
  }
  getHours(e) {
    return Et(e);
  }
  getMinutes(e) {
    return Ct(e);
  }
  startOfDay(e) {
    return F(e);
  }
  endOfDay(e) {
    return Gt(e);
  }
  startOfYear(e) {
    return Ft(e);
  }
  endOfYear(e) {
    return It(e);
  }
}
const Zt = Symbol.for("vuetify:date-options"), H = Symbol.for("vuetify:date-adapter");
function zt(r, e) {
  const t = Q({
    adapter: qt,
    locale: {
      af: "af-ZA",
      // ar: '', # not the same value for all variants
      bg: "bg-BG",
      ca: "ca-ES",
      ckb: "",
      cs: "cs-CZ",
      de: "de-DE",
      el: "el-GR",
      en: "en-US",
      // es: '', # not the same value for all variants
      et: "et-EE",
      fa: "fa-IR",
      fi: "fi-FI",
      // fr: '', #not the same value for all variants
      hr: "hr-HR",
      hu: "hu-HU",
      he: "he-IL",
      id: "id-ID",
      it: "it-IT",
      ja: "ja-JP",
      ko: "ko-KR",
      lv: "lv-LV",
      lt: "lt-LT",
      nl: "nl-NL",
      no: "no-NO",
      pl: "pl-PL",
      pt: "pt-PT",
      ro: "ro-RO",
      ru: "ru-RU",
      sk: "sk-SK",
      sl: "sl-SI",
      srCyrl: "sr-SP",
      srLatn: "sr-SP",
      sv: "sv-SE",
      th: "th-TH",
      tr: "tr-TR",
      az: "az-AZ",
      uk: "uk-UA",
      vi: "vi-VN",
      zhHans: "zh-CN",
      zhHant: "zh-TW"
    }
  }, r);
  return {
    options: t,
    instance: Jt(t, e)
  };
}
function Jt(r, e) {
  const t = w(typeof r.adapter == "function" ? new r.adapter({
    locale: r.locale[e.current.value] ?? e.current.value,
    formats: r.formats
  }) : r.adapter);
  return k(e.current, (n) => {
    t.locale = r.locale[n] ?? n ?? t.locale;
  }), t;
}
function ne() {
  let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    blueprint: e,
    ...t
  } = r, n = Q(e, t), {
    aliases: s = {},
    components: o = {},
    directives: i = {}
  } = n, a = _e(n.defaults), u = $e(n.display, n.ssr), f = Le(n.theme), l = Ne(n.icons), h = Ve(n.locale), m = zt(n.date, h), T = je(n.goTo, h);
  return {
    install: (c) => {
      for (const d in i)
        c.directive(d, i[d]);
      for (const d in o)
        c.component(d, o[d]);
      for (const d in s)
        c.component(d, Be({
          ...s[d],
          name: d,
          aliasName: s[d].name
        }));
      if (f.install(c), c.provide($, a), c.provide(L, u), c.provide(N, f), c.provide(V, l), c.provide(j, h), c.provide(Zt, m.options), c.provide(H, m.instance), c.provide(Ue, T), Ke && n.ssr)
        if (c.$nuxt)
          c.$nuxt.hook("app:suspense:resolve", () => {
            u.update();
          });
        else {
          const {
            mount: d
          } = c;
          c.mount = function() {
            const oe = d(...arguments);
            return ke(() => u.update()), c.mount = d, oe;
          };
        }
      We.reset(), c.mixin({
        computed: {
          $vuetify() {
            return w({
              defaults: v.call(this, $),
              display: v.call(this, L),
              theme: v.call(this, N),
              icons: v.call(this, V),
              locale: v.call(this, j),
              date: v.call(this, H)
            });
          }
        }
      });
    },
    defaults: a,
    display: u,
    theme: f,
    icons: l,
    locale: h,
    date: m,
    goTo: T
  };
}
const Qt = "3.7.3";
ne.version = Qt;
function v(r) {
  var n, s;
  const e = this.$, t = ((n = e.parent) == null ? void 0 : n.provides) ?? ((s = e.vnode.appContext) == null ? void 0 : s.provides);
  if (t && r in t)
    return t[r];
}
const Xt = {
  defaults: {
    VAppBar: {
      flat: !0
    },
    VAutocomplete: {
      variant: "filled"
    },
    VBanner: {
      color: "primary"
    },
    VBottomSheet: {
      contentClass: "rounded-t-xl overflow-hidden"
    },
    VBtn: {
      color: "primary",
      rounded: "xl"
    },
    VBtnGroup: {
      rounded: "xl",
      VBtn: {
        rounded: null
      }
    },
    VCard: {
      rounded: "lg"
    },
    VCheckbox: {
      color: "secondary",
      inset: !0
    },
    VChip: {
      rounded: "sm"
    },
    VCombobox: {
      variant: "filled"
    },
    VNavigationDrawer: {
      // VList: {
      //   nav: true,
      //   VListItem: {
      //     rounded: 'xl',
      //   },
      // },
    },
    VSelect: {
      variant: "filled"
    },
    VSlider: {
      color: "primary"
    },
    VTabs: {
      color: "primary"
    },
    VTextarea: {
      variant: "filled"
    },
    VTextField: {
      variant: "filled"
    },
    VToolbar: {
      VBtn: {
        color: null
      }
    }
  },
  icons: {
    defaultSet: "mdi",
    sets: {
      mdi: He
    }
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#6750a4",
          secondary: "#b4b0bb",
          tertiary: "#7d5260",
          error: "#b3261e",
          surface: "#fffbfe"
        }
      }
    }
  }
};
function er() {
  const e = (we("lang", ",") || ["en"]).map(
    (t) => t.toLowerCase().replace(/[_-](\w+)/, "")
  ).find((t) => t in R.locales);
  return ve({
    legacy: !1,
    fallbackLocale: "en",
    locale: e
  });
}
const se = er();
function p(...r) {
  return se.global.t(...r);
}
function vr(r, e, t) {
  if (!(t in R.locales))
    throw Error("Locale is not provided by config.");
  r.global.locale.value = t, I(r, e, t), document.querySelector("html").setAttribute("lang", t);
}
const G = /* @__PURE__ */ new Set();
function br({ path: r = "./", fallback: e = !0, ...t } = {}) {
  const n = be(t);
  return q(n, { path: r, fallback: e }), k(() => n.locale, () => q(n, { path: r, fallback: e })), n;
}
async function I(r, e, t) {
  const n = t.replace(/[_-](\w+)/, "");
  if (e = `${e}locales/${n}.json`, G.has(e))
    return;
  G.add(e);
  const s = await fetch(e).then((o) => o.json());
  r.messages.value[t] = {
    ...r.messages.value[t],
    ...s
  };
}
function q(r, { path: e = "./", fallback: t = !0 } = {}) {
  e.startsWith("/") || (e = import.meta.resolve(e)), e.endsWith("/") || (e += "/");
  let n = I(r, e, D(r.locale));
  return t && r.fallbackLocale.value && (n = n.catch((s) => I(r, e, D(r.fallbackLocale))).catch((s) => {
    throw Error(
      `Could not load locale ${r.locale.value} nor its fallback ${r.fallbackLocale.value} (path: ${e}). Error: ${s}`
    );
  })), n;
}
const O = {
  model: (r) => `models.${r.entity}`,
  field: (r) => `fields.${r}`
};
function Dr({ App: r = null, el: e = "#app", onLoad: t = !0, ...n } = {}) {
  function s() {
    const o = tr(r, n), i = e ? o.mount(e) : null;
    return document.body.classList.remove("loading"), { app: o, el: e, vm: i };
  }
  return new Promise((o) => {
    if (t)
      return window.addEventListener(
        "load",
        () => o(s())
      );
    o(s());
  });
}
function tr(r, { props: e = {}, vuetify: t = {}, plugins: n = null } = {}) {
  return r = Pe(r, e), r.config.globalProperties.window = window, r.use(rr(t)), r.use(se), n && n.forEach((s) => r.use(s)), r;
}
function rr({ components: r = {}, ...e }) {
  return e.components = {
    ...Ie,
    ...r
  }, ne({
    blueprint: Xt,
    theme: {},
    ...e
  });
}
function Mr({ axiosConfig: r = null, baseURL: e = null } = {}) {
  e || (e = document.body.dataset.apiUrl);
  const t = De(), n = Me({});
  return n().use(
    st({
      axios: Fe,
      ...r || R.axiosConfig,
      baseURL: e
    })
  ), Ae(t), t.use(n);
}
class ie {
  /**
  * @param {Repos} [repos] all models repositories
  * @param {Repository<M>} [repo] the main repository
  */
  constructor(e, t = null) {
    if (typeof e == "string") {
      if (!t)
        throw Error(`Repository "${e}" is provided as string, but no "repos" argument is provided.`);
      if (!(e in t))
        throw Error(`Repository "${e}" is not present in provided repositories.`);
      this.repo = t[e];
    } else
      this.repo = e;
    this.repos = t;
  }
  /**
   * Fetch items from api.
   *
   * @param [options.ids] select by ids
   * @param {Repository} [options.repo] use this repository instead of \
   * ``Query.repo``.
   * @param [options.url] use this url instead of repository's one.
   * @param [options.lookup] query GET parameters used to get ids.
   * @param [options.params] extra GET parameters
   * @param [options.opts] options passed down to ``repo.api.get``
   */
  async fetch({ ids: e = null, repo: t = null, url: n = null, lookup: s = "id__in", params: o = void 0, relations: i = null, ...a } = {}) {
    var f, l;
    if (t ?? (t = this.repo), n || (n = (l = (f = t.use) == null ? void 0 : f.meta) == null ? void 0 : l.url), !n)
      throw Error("URL must be provided or Model must provide a `meta: Meta` with `url`");
    e && s !== void 0 && (o = { ...o || {} }, o[s] = [...e]);
    const u = await t.api().get(n, { ...a, params: o });
    return i && (u.relations = await this.relations(u.entities, i, { ...a, params: {} })), u;
  }
  /**
   * Fetch all items from api.
   *
   * @param [options.nextKey] response object key to get next url
   * @param [options.limit] max count of consecutive requests
   * @return Response of the first request, whoses ``entities`` has \
   * model instances of all requests.
   */
  async all({ nextKey: e = "next", limit: t = -1, ...n } = {}) {
    const s = await this.fetch(n);
    let o = s.response.data[e];
    for (; o; ) {
      const i = await this.fetch({ ...n, url: o });
      if (i.entities && (s.entities = s.entities !== null ? s.entities.concat(i.entities) : i.entities), o = i.response.data[e], t > 0 && t--, !t) break;
    }
    return s;
  }
  /**
   * Fetch related objects for the provided list and field names.
   *
   * @param objs - the objects to get related ids from.
   * @param options.fields - list of field names.
   * @param options.opts - options to pass down to 'relation'.
   * @return the resulting entities.
   */
  async relations(e, t, n = {}) {
    var i;
    this._ensureRepos("relations");
    const s = {}, o = (i = this.repo.use) == null ? void 0 : i.fields();
    if (o)
      for (const a of t) {
        const u = o[a];
        if (u instanceof Te)
          s[a] = await this.relation(e, u, n);
        else
          throw Error(`Field ${a} is not a relation`);
      }
    return s;
  }
  _ensureRepos(e) {
    if (!this.repos)
      throw Error(`Query.repos is not provided although it is mandatory to call ${e}.`);
  }
  /**
   * Fetch related objects for the provided object list and field name.
   * It uses {@link Query.all} in order to fetch all items.
   *
   * @param objs - the objects to get ids from.
   * @param relation - objects' field or field name.
   * @param [options.thin] if True, only fetch objects not already present in repos.
   * @param options.opts - extra options to pass down to `all()`.
   */
  async relation(e, t, { thin: n = !1, ...s } = {}) {
    var l, h;
    if (this._ensureRepos("relations"), typeof t == "string") {
      const m = (l = this.repo.use) == null ? void 0 : l.fields();
      if (!m || !m[t])
        throw Error(`Field ${t} is not a relation on ${this.repo.use} model`);
      t = m[t];
    }
    const o = t.related.constructor.entity, i = this.repos[o];
    if (!i)
      throw Error(`No repository "${o}" found.`);
    let a = J(e, t.foreignKey), u = null;
    if (n) {
      u = new Set(Object.keys((h = i.pinia.state[o]) == null ? void 0 : h.value.data).filter((T) => T in a));
      const m = a.difference(u);
      m && (a = m);
    }
    const f = await this.all({ ids: a, repo: i, ...s });
    if (n && u) {
      const m = i.whereId(u).get();
      f.entities = [...f.entities || [], ...m];
    }
    return f;
  }
}
function Ar(r, e = null) {
  return new ie(r, e);
}
class nr {
  constructor(e) {
    g(this, "dataKey", "results");
    g(this, "nextKey", "next");
    g(this, "prevKey", "previous");
    g(this, "countKey", "count");
    Z(this, e), this.filters || (this.filters = {}), this.state = A.none(), this.ids = [], this.nextUrl = this.nextUrl ?? null, this.prevUrl = this.prevUrl ?? null;
  }
  /**
   * Return a reactive object version.
   */
  static reactive({ value: e, ...t }) {
    const n = w(new this(t));
    return n.value = e, n.items = y(() => n.getItems()), n.prev = y(() => n.getSibling(n.value, -1)), n.next = y(() => n.getSibling(n.value, 1)), n;
  }
  /**
   * Items' repository
   */
  get repo() {
    return this.query.repo;
  }
  /**
   * Items' model.
   */
  get model() {
    return this.repo.use;
  }
  /**
   * Fetch items from API (using self's {@link Query.fetch}).
   */
  async fetch({ append: e = !1, ...t } = {}) {
    this.state.processing(), t = this.initOptions(t);
    const n = await this.query.fetch(t), s = [...J(n.entities, "id")];
    return this.ids = e ? this.ids.concat(s) : s, this.nextUrl = n.response.data[this.nextKey] || null, this.prevUrl = n.response.data[this.prevKey] || null, this.count = n.response.data[this.countKey] || this.ids.length, this.state.none(), n;
  }
  /**
   * Get siblings of a value for the provided IRList.
   *
   * Arguments are the same as {@link List.getSiblingIndex}.
   *
   * **Note**: this method is only available on the reactive object.
   */
  getSibling(e, t) {
    const n = this.getSiblingIndex(D(e), t);
    return n > -1 ? this.items[n] : null;
  }
  /**
   * Get index of an item's sibling on specified direction.
   *
   * @param value - item to look sibling of.
   * @param dir - direction (next: `1`, previous: `-1`)
   * @return the index of the sibling or `-1` if none found.
   */
  getSiblingIndex(e, t = 1) {
    const n = this.ids.indexOf(e.id);
    if (n == -1)
      return -1;
    const s = n + t;
    return n > -1 && s < (this.count ?? this.ids.length) ? s : -1;
  }
  /**
   * Return list items (fetched from repository)
   * @return an array of items.
   */
  getItems() {
    let e = this.query.repo.whereId(this.ids);
    if (this.relations)
      for (const t of this.relations)
        e = e.with(t);
    return e.get();
  }
  initOptions({ filters: e = null, ...t }) {
    return !t.relations && this.relations && (t.relations = this.relations), !t.dataKey && this.dataKey && (t.dataKey = this.dataKey), !t.url && this.url && (t.url = this.url), e && Object.assign(this.filters, e), this.filters && (t.params = { ...this.filters, ...t.params ?? [] }), t;
  }
  /**
   * Fetch next items from API, override `url` using {@link List.nextUrl}.
   */
  async fetchNext(e) {
    return await this.fetch({ ...e, url: this.nextUrl });
  }
  /**
   * Fetch previous items from API, override `url` using {@link List.prevUrl}.
   */
  async fetchPrev(e) {
    return await this.fetch({ ...e, url: this.prevUrl });
  }
}
function sr({ repo: r = null, repos: e = null, query: t = null, ...n }) {
  t ?? (t = new ie(r, e));
  const s = nr.reactive({ query: t, ...n });
  return b("list", s), s;
}
class ir {
  constructor(e) {
    g(this, "showFilters", !1);
    var t;
    Object.assign(this, e), this.list || (this.list = this.getList()), this.showFilters = ((t = this.props) == null ? void 0 : t.showFilters) || !1;
  }
  /**
   * Instanciate and return a reactive model panel.
   */
  static reactive(e) {
    console.log(e);
    const t = w(new this(e));
    return t.title = y(() => t.getTitle()), t.icon = y(() => t.getIcon()), t;
  }
  /**
   * Current model's repository.
   */
  get repo() {
    return this.props.repo;
  }
  /**
   * Current model.
   */
  get model() {
    return this.repo.use;
  }
  /**
   * Current panel's view.
   */
  get view() {
    return this.panel.view;
  }
  getIcon() {
    var e, t;
    return ((e = this.props) == null ? void 0 : e.icon) || ((t = this.model.meta) == null ? void 0 : t.icon) || null;
  }
  /**
   * Return panel's title based on view and current item.
   */
  getTitle() {
    var o;
    const { props: e, list: t, panel: n } = this;
    if (this.props.title)
      return this.props.title;
    const s = this.repo.use;
    if (s) {
      if ((o = this.view) != null && o.startsWith("list."))
        return p(O.model(s), 3);
      if (n.value) {
        if (n.value.$title)
          return n.value.$title;
        const i = p(O.model(s));
        return n.value.id ? p("models._.title", { model: i, id: n.value.id }) : p("models._.title.new", { model: i });
      }
    }
    return "";
  }
  /**
   * Get instance of list.
   */
  getList() {
    const e = Se(Re.props, this.props), { value: t } = Ee(this.panel);
    return sr({ ...e, value: t, repos: this.repos });
  }
  /**
   * Edit a new item.
   *
   * @param path - path to edit view.
   */
  create(e = ".detail.add") {
    this.panel.show({ path: e, value: new this.model() });
  }
  /**
   * Called when an item has been created. By default, show edit view.
   */
  created(e, t = ".detail.edit") {
    this.panel.show({ path: t, value: e, force: !0 }), this.list.fetch();
  }
}
function Tr(r) {
  return ir.reactive(r);
}
function Sr(r, e) {
  return Ce(() => import(r).then((t) => e ? Object.values(t).filter((s) => s.__name == e)[0] : t));
}
export {
  at as AppContext,
  X as Editor,
  nr as List,
  lt as ModelEditor,
  Ge as Panel,
  ie as Query,
  A as State,
  kr as States,
  Z as assignNonEmpty,
  J as collectAttr,
  R as config,
  tr as createApp,
  er as createI18n,
  Mr as createPinia,
  rr as createVuetify,
  Pr as csrfToken,
  Sr as defineAsyncComponent,
  ct as editor,
  Er as filterSlots,
  Cr as getCookie,
  we as getCookieList,
  Fr as getCsrf,
  se as i18n,
  Dr as init,
  G as loadedLocalePaths,
  Se as mapToObject,
  wr as modelEditor,
  fr as models,
  Ar as query,
  ye as reset,
  vr as setLocale,
  Ir as shallowCopy,
  p as t,
  O as tKeys,
  yr as useAction,
  pr as useAppContext,
  br as useI18n,
  sr as useList,
  Tr as useModelPanel,
  mr as useModelPanelProps,
  it as useModels,
  ot as usePermissions,
  gr as usePermissionsProps
};
//# sourceMappingURL=ox.js.map
