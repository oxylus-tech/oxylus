var oe = Object.defineProperty;
var ae = (r, e, t) => e in r ? oe(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var d = (r, e, t) => ae(r, typeof e != "symbol" ? e + "" : e, t);
import { a as ue, C as ce, G as le, M as he, b as de, P as fe, c as P, U as S, g as me, u as z, d as ge, R as pe, e as Y, S as T, r as ye, f as we, h as F, i as ve, j as De, k as be, l as Me, s as Te, m as Ae, n as J } from "./vue-i18n-Bk-v3Oxr.js";
import { t as kr, p as Er, x as Pr, o as Ir, q as Cr, y as Fr, v as Rr, w as Yr } from "./vue-i18n-Bk-v3Oxr.js";
import { reactive as D, provide as w, computed as p, unref as v, ref as xe, isRef as Se, watch as A, nextTick as Oe, createApp as ke, toRefs as Ee, defineAsyncComponent as Pe } from "vue";
import Ie from "axios";
import * as Ce from "ox/vendor";
import "ox/components";
import { c as Fe, p as $, m as Q, a as Re, b as Ye, d as $e, e as _e, f as Le, g as Ne, h as Ve, D as _, i as L, T as N, I as V, L as j, G as je, j as Ke, k as Be, l as Ue } from "./theme-CVupjJDc.js";
class R {
  /**
   * Create a new reactive instance of the object.
   * This where you can add watchers and computed properties.
   */
  static reactive(e) {
    return D(new this(e));
  }
  constructor(e = {}) {
    e && ue(this, e);
  }
}
const fr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentType: ce,
  Group: le,
  Meta: he,
  Model: de,
  Permission: fe,
  Permissions: P,
  User: S
}, Symbol.toStringTag, { value: "Module" }));
var We = Object.defineProperty, qe = (r, e, t) => e in r ? We(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, b = (r, e, t) => (qe(r, typeof e != "symbol" ? e + "" : e, t), t);
class He {
  /**
   * Create a new response instance.
   */
  constructor(e, t, n) {
    b(this, "repository"), b(this, "config"), b(this, "response"), b(this, "entities", null), b(this, "isSaved", !1), this.repository = e, this.config = t, this.response = n;
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
var Ge = Object.defineProperty, Ze = (r, e, t) => e in r ? Ge(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, K = (r, e, t) => (Ze(r, typeof e != "symbol" ? e + "" : e, t), t);
class ze {
  /**
   * Create a new api instance.
   */
  constructor(e) {
    K(this, "repository"), K(this, "config", {
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
    const n = new He(this.repository, t, e);
    return t.delete !== void 0 ? (await n.delete(), n) : (t.save && await n.save(), n);
  }
}
var Je = Object.defineProperty, Qe = (r, e, t) => e in r ? Je(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, E = (r, e, t) => (Qe(r, typeof e != "symbol" ? e + "" : e, t), t);
class B extends pe {
  constructor() {
    var e, t, n;
    super(...arguments), E(this, "axios", ((t = (e = Y) == null ? void 0 : e.axiosApi) == null ? void 0 : t.axios) || null), E(this, "globalApiConfig", ((n = Y) == null ? void 0 : n.axiosApi) || {}), E(this, "apiConfig", {});
  }
  api() {
    return Xe(this);
  }
  setAxios(e) {
    return this.axios = e, this;
  }
}
function Xe(r) {
  return new ze(r);
}
function et(r) {
  const e = me();
  return B.useModel = r, z(B, e);
}
function tt(r) {
  return ge((e) => (e.config.axiosApi = r, e));
}
function rt(r, e = !0) {
  const t = {};
  Array.isArray(r) || (r = Object.values(r)), e && !r.includes(S) && r.push(S);
  for (const n of r)
    if (n && n.entity) {
      if (n.entity in t)
        continue;
      z(n), t[n.entity] = et(n);
    }
  return w("models", r), w("repos", t), { models: r, repos: t };
}
function mr() {
  return {
    permissions: [String, Function, Object, Array]
  };
}
function nt(r, e, t) {
  const n = e instanceof P ? e : new P(e), s = p(() => n.can(v(r), v(t)));
  return { permissions: n, allowed: s };
}
class st {
  static reactive(e) {
    const t = D(new this(e));
    return t.user = p(() => {
      var n;
      return new S(((n = t.data) == null ? void 0 : n.user) || {});
    }), t;
  }
  constructor(e = {}) {
    Object.assign(this, e), this.state = T.none(), this.showState = !1;
  }
  /**
   * Load data into AppData. If no `value` is provided, read it from
   * source element.
   */
  load(e = void 0) {
    this.dataEl !== void 0 && (e === void 0 && (e = this.readData(this.dataEl)), e.dataEl = this.dataEl, this.data = e, this.panel && this.data.panel && (this.panel.value = e)), this.models !== void 0 && (this.repos = rt(this.models).repos);
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
function gr(r, e = !0) {
  const t = st.reactive(r);
  return e && t.dataEl && t.load(), w("context", t), w("user", t.user), t;
}
class it {
  constructor(e, t) {
    Object.assign(this, e), this.props = t, this.processing = xe(!1);
    const n = nt(this.user, t.permissions, t.item);
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
function pr(r, e) {
  return new it(r, e);
}
class X {
  static reactive({ initial: e, ...t }) {
    const n = D(new this({ initial: v(e), ...t }));
    return n.edited = p(() => n.isEdited()), Se(e) && A(e, (s) => n.reset(s)), n;
  }
  constructor(e, t = {}) {
    Object.assign(this, e), Object.assign(this, t), this.state || (this.state = new T()), this.value = {}, this.reset(this.initial);
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
class ot extends X {
  constructor({ repo: e, url: t, ...n }) {
    var s, o;
    t = t || ((o = (s = e.use) == null ? void 0 : s.meta) == null ? void 0 : o.url), super({ url: t, ...n }, { repo: e });
  }
  get fields() {
    return this._fields || (this._fields = Object.keys(this.repo.use.fields())), this._fields;
  }
  _reset(e) {
    this.value = D(new this.initial.constructor()), this.fields.reduce((t, n) => (t[n] = e[n], t), this.value);
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
      (s) => T.ok(s.entities[0]),
      (s) => T.error(s.response.data)
    );
  }
}
function at({ editorClass: r = X, emits: e = null, panel: t = null, ...n }) {
  e && (n.saved ?? (n.saved = (o, i) => e("saved", o, i)));
  const s = r.reactive(n);
  return t && A(() => s.edited, (o) => t.setEdition(s.name, o)), s;
}
function yr(r) {
  return at({ ...r, editorClass: ot });
}
const k = {
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
function ut(r, e, t) {
  const n = [];
  let s = [];
  const o = ee(r), i = te(r), u = t ?? k[e.slice(-2).toUpperCase()] ?? 0, a = (o.getDay() - u + 7) % 7, m = (i.getDay() - u + 7) % 7;
  for (let c = 0; c < a; c++) {
    const h = new Date(o);
    h.setDate(h.getDate() - (a - c)), s.push(h);
  }
  for (let c = 1; c <= i.getDate(); c++) {
    const h = new Date(r.getFullYear(), r.getMonth(), c);
    s.push(h), s.length === 7 && (n.push(s), s = []);
  }
  for (let c = 1; c < 7 - m; c++) {
    const h = new Date(i);
    h.setDate(h.getDate() + c), s.push(h);
  }
  return s.length > 0 && n.push(s), n;
}
function ct(r, e, t) {
  const n = t ?? k[e.slice(-2).toUpperCase()] ?? 0, s = new Date(r);
  for (; s.getDay() !== n; )
    s.setDate(s.getDate() - 1);
  return s;
}
function lt(r, e) {
  const t = new Date(r), n = ((k[e.slice(-2).toUpperCase()] ?? 0) + 6) % 7;
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
function ht(r) {
  const e = r.split("-").map(Number);
  return new Date(e[0], e[1] - 1, e[2]);
}
const dt = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
function re(r) {
  if (r == null) return /* @__PURE__ */ new Date();
  if (r instanceof Date) return r;
  if (typeof r == "string") {
    let e;
    if (dt.test(r))
      return ht(r);
    if (e = Date.parse(r), !isNaN(e)) return new Date(e);
  }
  return null;
}
const U = new Date(2e3, 0, 2);
function ft(r, e) {
  const t = e ?? k[r.slice(-2).toUpperCase()] ?? 0;
  return Fe(7).map((n) => {
    const s = new Date(U);
    return s.setDate(U.getDate() + t + n), new Intl.DateTimeFormat(r, {
      weekday: "narrow"
    }).format(s);
  });
}
function mt(r, e, t, n) {
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
      const u = s.getDate(), a = new Intl.DateTimeFormat(t, {
        month: "long"
      }).format(s);
      return `${u} ${a}`;
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
function gt(r, e) {
  const t = r.toJsDate(e), n = t.getFullYear(), s = $(String(t.getMonth() + 1), 2, "0"), o = $(String(t.getDate()), 2, "0");
  return `${n}-${s}-${o}`;
}
function pt(r) {
  const [e, t, n] = r.split("-").map(Number);
  return new Date(e, t - 1, n);
}
function yt(r, e) {
  const t = new Date(r);
  return t.setMinutes(t.getMinutes() + e), t;
}
function wt(r, e) {
  const t = new Date(r);
  return t.setHours(t.getHours() + e), t;
}
function vt(r, e) {
  const t = new Date(r);
  return t.setDate(t.getDate() + e), t;
}
function Dt(r, e) {
  const t = new Date(r);
  return t.setDate(t.getDate() + e * 7), t;
}
function bt(r, e) {
  const t = new Date(r);
  return t.setDate(1), t.setMonth(t.getMonth() + e), t;
}
function Mt(r) {
  return r.getFullYear();
}
function Tt(r) {
  return r.getMonth();
}
function At(r) {
  return r.getDate();
}
function xt(r) {
  return new Date(r.getFullYear(), r.getMonth() + 1, 1);
}
function St(r) {
  return new Date(r.getFullYear(), r.getMonth() - 1, 1);
}
function Ot(r) {
  return r.getHours();
}
function kt(r) {
  return r.getMinutes();
}
function Et(r) {
  return new Date(r.getFullYear(), 0, 1);
}
function Pt(r) {
  return new Date(r.getFullYear(), 11, 31);
}
function It(r, e) {
  return O(r, e[0]) && Rt(r, e[1]);
}
function Ct(r) {
  const e = new Date(r);
  return e instanceof Date && !isNaN(e.getTime());
}
function O(r, e) {
  return r.getTime() > e.getTime();
}
function Ft(r, e) {
  return O(I(r), I(e));
}
function Rt(r, e) {
  return r.getTime() < e.getTime();
}
function W(r, e) {
  return r.getTime() === e.getTime();
}
function Yt(r, e) {
  return r.getDate() === e.getDate() && r.getMonth() === e.getMonth() && r.getFullYear() === e.getFullYear();
}
function $t(r, e) {
  return r.getMonth() === e.getMonth() && r.getFullYear() === e.getFullYear();
}
function _t(r, e) {
  return r.getFullYear() === e.getFullYear();
}
function Lt(r, e, t) {
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
function Nt(r, e) {
  const t = new Date(r);
  return t.setHours(e), t;
}
function Vt(r, e) {
  const t = new Date(r);
  return t.setMinutes(e), t;
}
function jt(r, e) {
  const t = new Date(r);
  return t.setMonth(e), t;
}
function Kt(r, e) {
  const t = new Date(r);
  return t.setDate(e), t;
}
function Bt(r, e) {
  const t = new Date(r);
  return t.setFullYear(e), t;
}
function I(r) {
  return new Date(r.getFullYear(), r.getMonth(), r.getDate(), 0, 0, 0, 0);
}
function Ut(r) {
  return new Date(r.getFullYear(), r.getMonth(), r.getDate(), 23, 59, 59, 999);
}
class Wt {
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
    return gt(this, e);
  }
  parseISO(e) {
    return pt(e);
  }
  addMinutes(e, t) {
    return yt(e, t);
  }
  addHours(e, t) {
    return wt(e, t);
  }
  addDays(e, t) {
    return vt(e, t);
  }
  addWeeks(e, t) {
    return Dt(e, t);
  }
  addMonths(e, t) {
    return bt(e, t);
  }
  getWeekArray(e, t) {
    return ut(e, this.locale, t ? Number(t) : void 0);
  }
  startOfWeek(e, t) {
    return ct(e, this.locale, t ? Number(t) : void 0);
  }
  endOfWeek(e) {
    return lt(e, this.locale);
  }
  startOfMonth(e) {
    return ee(e);
  }
  endOfMonth(e) {
    return te(e);
  }
  format(e, t) {
    return mt(e, t, this.locale, this.formats);
  }
  isEqual(e, t) {
    return W(e, t);
  }
  isValid(e) {
    return Ct(e);
  }
  isWithinRange(e, t) {
    return It(e, t);
  }
  isAfter(e, t) {
    return O(e, t);
  }
  isAfterDay(e, t) {
    return Ft(e, t);
  }
  isBefore(e, t) {
    return !O(e, t) && !W(e, t);
  }
  isSameDay(e, t) {
    return Yt(e, t);
  }
  isSameMonth(e, t) {
    return $t(e, t);
  }
  isSameYear(e, t) {
    return _t(e, t);
  }
  setMinutes(e, t) {
    return Vt(e, t);
  }
  setHours(e, t) {
    return Nt(e, t);
  }
  setMonth(e, t) {
    return jt(e, t);
  }
  setDate(e, t) {
    return Kt(e, t);
  }
  setYear(e, t) {
    return Bt(e, t);
  }
  getDiff(e, t, n) {
    return Lt(e, t, n);
  }
  getWeekdays(e) {
    return ft(this.locale, e ? Number(e) : void 0);
  }
  getYear(e) {
    return Mt(e);
  }
  getMonth(e) {
    return Tt(e);
  }
  getDate(e) {
    return At(e);
  }
  getNextMonth(e) {
    return xt(e);
  }
  getPreviousMonth(e) {
    return St(e);
  }
  getHours(e) {
    return Ot(e);
  }
  getMinutes(e) {
    return kt(e);
  }
  startOfDay(e) {
    return I(e);
  }
  endOfDay(e) {
    return Ut(e);
  }
  startOfYear(e) {
    return Et(e);
  }
  endOfYear(e) {
    return Pt(e);
  }
}
const qt = Symbol.for("vuetify:date-options"), q = Symbol.for("vuetify:date-adapter");
function Ht(r, e) {
  const t = Q({
    adapter: Wt,
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
    instance: Gt(t, e)
  };
}
function Gt(r, e) {
  const t = D(typeof r.adapter == "function" ? new r.adapter({
    locale: r.locale[e.current.value] ?? e.current.value,
    formats: r.formats
  }) : r.adapter);
  return A(e.current, (n) => {
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
  } = n, u = Re(n.defaults), a = Ye(n.display, n.ssr), m = $e(n.theme), c = _e(n.icons), h = Le(n.locale), g = Ht(n.date, h), x = Ne(n.goTo, h);
  return {
    install: (l) => {
      for (const f in i)
        l.directive(f, i[f]);
      for (const f in o)
        l.component(f, o[f]);
      for (const f in s)
        l.component(f, Ve({
          ...s[f],
          name: f,
          aliasName: s[f].name
        }));
      if (m.install(l), l.provide(_, u), l.provide(L, a), l.provide(N, m), l.provide(V, c), l.provide(j, h), l.provide(qt, g.options), l.provide(q, g.instance), l.provide(je, x), Ke && n.ssr)
        if (l.$nuxt)
          l.$nuxt.hook("app:suspense:resolve", () => {
            a.update();
          });
        else {
          const {
            mount: f
          } = l;
          l.mount = function() {
            const ie = f(...arguments);
            return Oe(() => a.update()), l.mount = f, ie;
          };
        }
      Be.reset(), l.mixin({
        computed: {
          $vuetify() {
            return D({
              defaults: y.call(this, _),
              display: y.call(this, L),
              theme: y.call(this, N),
              icons: y.call(this, V),
              locale: y.call(this, j),
              date: y.call(this, q)
            });
          }
        }
      });
    },
    defaults: u,
    display: a,
    theme: m,
    icons: c,
    locale: h,
    date: g,
    goTo: x
  };
}
const Zt = "3.7.3";
ne.version = Zt;
function y(r) {
  var n, s;
  const e = this.$, t = ((n = e.parent) == null ? void 0 : n.provides) ?? ((s = e.vnode.appContext) == null ? void 0 : s.provides);
  if (t && r in t)
    return t[r];
}
const zt = {
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
      mdi: Ue
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
function Jt() {
  const e = (we("lang", ",") || ["en"]).map(
    (t) => t.toLowerCase().replace(/[_-](\w+)/, "")
  ).find((t) => t in F.locales);
  return ve({
    legacy: !1,
    fallbackLocale: "en",
    locale: e
  });
}
const se = Jt();
function M(...r) {
  return se.global.t(...r);
}
function wr(r, e, t) {
  if (!(t in F.locales))
    throw Error("Locale is not provided by config.");
  r.global.locale.value = t, C(r, e, t), document.querySelector("html").setAttribute("lang", t);
}
const H = /* @__PURE__ */ new Set();
function vr({ path: r = "./", fallback: e = !0, ...t } = {}) {
  const n = De(t);
  return G(n, { path: r, fallback: e }), A(() => n.locale, () => G(n, { path: r, fallback: e })), n;
}
async function C(r, e, t) {
  const n = t.replace(/[_-](\w+)/, "");
  if (e = `${e}locales/${n}.json`, H.has(e))
    return;
  H.add(e);
  const s = await fetch(e).then((o) => o.json());
  r.messages.value[t] = {
    ...r.messages.value[t],
    ...s
  };
}
function G(r, { path: e = "./", fallback: t = !0 } = {}) {
  e.startsWith("/") || (e = import.meta.resolve(e)), e.endsWith("/") || (e += "/");
  let n = C(r, e, v(r.locale));
  return t && r.fallbackLocale.value && (n = n.catch((s) => C(r, e, v(r.fallbackLocale))).catch((s) => {
    throw Error(
      `Could not load locale ${r.locale.value} nor its fallback ${r.fallbackLocale.value} (path: ${e}). Error: ${s}`
    );
  })), n;
}
const Z = {
  model: (r) => `models.${r.entity}`,
  field: (r) => `fields.${r}`
};
function Dr({ App: r = null, el: e = "#app", onLoad: t = !0, ...n } = {}) {
  function s() {
    const o = Qt(r, n), i = e ? o.mount(e) : null;
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
function Qt(r, { props: e = {}, vuetify: t = {}, plugins: n = null } = {}) {
  return r = ke(r, e), r.config.globalProperties.window = window, r.use(Xt(t)), r.use(se), n && n.forEach((s) => r.use(s)), r;
}
function Xt({ components: r = {}, ...e }) {
  return e.components = {
    ...Ce,
    ...r
  }, ne({
    blueprint: zt,
    theme: {},
    ...e
  });
}
function br({ axiosConfig: r = null, baseURL: e = null } = {}) {
  e || (e = document.body.dataset.apiUrl);
  const t = be(), n = Me({});
  return n().use(
    tt({
      axios: Ie,
      ...r || F.axiosConfig,
      baseURL: e
    })
  ), Te(t), t.use(n);
}
class er {
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
  async fetch({ ids: e = null, repo: t = null, url: n = null, lookup: s = "id__in", params: o = void 0, relations: i = null, ...u } = {}) {
    var m, c;
    if (t ?? (t = this.repo), n || (n = (c = (m = t.use) == null ? void 0 : m.meta) == null ? void 0 : c.url), !n)
      throw Error("URL must be provided or Model must provide a `meta: Meta` with `url`");
    e && s !== void 0 && (o = { ...o || {} }, o[s] = [...e]);
    const a = await t.api().get(n, { ...u, params: o });
    return i && (a.relations = await this.relations(a.entities, i, { ...u, params: {} })), a;
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
      for (const u of t) {
        const a = o[u];
        if (a instanceof Ae)
          s[u] = await this.relation(e, a, n);
        else
          throw Error(`Field ${u} is not a relation`);
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
    var c, h;
    if (this._ensureRepos("relations"), typeof t == "string") {
      const g = (c = this.repo.use) == null ? void 0 : c.fields();
      if (!g || !g[t])
        throw Error(`Field ${t} is not a relation on ${this.repo.use} model`);
      t = g[t];
    }
    const o = t.related.constructor.entity, i = this.repos[o];
    if (!i)
      throw Error(`No repository "${o}" found.`);
    let u = J(e, t.foreignKey), a = null;
    if (n) {
      a = new Set(Object.keys((h = i.pinia.state[o]) == null ? void 0 : h.value.data).filter((x) => x in u));
      const g = u.difference(a);
      g && (u = g);
    }
    const m = await this.all({ ids: u, repo: i, ...s });
    if (n && a) {
      const g = i.whereId(a).get();
      m.entities = [...m.entities || [], ...g];
    }
    return m;
  }
}
function Mr(r, e = null) {
  const t = new er(r, e);
  return provide("query", t), t;
}
class tr extends R {
  constructor() {
    super(...arguments);
    d(this, "state", T.none());
    d(this, "nextUrl", null);
    d(this, "prevUrl", null);
    d(this, "count", null);
    d(this, "ids", []);
    d(this, "filters", {});
    d(this, "dataKey", "results");
    d(this, "nextKey", "next");
    d(this, "prevKey", "previous");
    d(this, "countKey", "count");
  }
  static reactive({ value: t, ...n }) {
    const s = super.reactive(n);
    return s.value = t, s.items = p(() => s.getItems()), s.prev = p(() => s.getSibling(s.value, -1)), s.next = p(() => s.getSibling(s.value, 1)), s;
  }
  /** Items' repository */
  get repo() {
    return this.query.repo;
  }
  /** Items' model. */
  get model() {
    return this.repo.use;
  }
  /** Fetch items from API (using self's {@link Query.fetch}). */
  async fetch({ append: t = !1, ...n } = {}) {
    this.state.processing(), n = this.initOptions(n);
    const s = await this.query.fetch(n), o = [...J(s.entities, "id")];
    return this.ids = t ? this.ids.concat(o) : o, this.nextUrl = s.response.data[this.nextKey] || null, this.prevUrl = s.response.data[this.prevKey] || null, this.count = s.response.data[this.countKey] || this.ids.length, this.state.none(), s;
  }
  /**
   * Get siblings of a value for the provided IRList.
   *
   * Arguments are the same as {@link List.getSiblingIndex}.
   *
   * **Note**: this method is only available on the reactive object.
   */
  getSibling(t, n) {
    const s = this.getSiblingIndex(v(t), n);
    return s > -1 ? this.items[s] : null;
  }
  /**
   * Get index of an item's sibling on specified direction.
   *
   * @param value - item to look sibling of.
   * @param dir - direction (next: `1`, previous: `-1`)
   * @return the index of the sibling or `-1` if none found.
   */
  getSiblingIndex(t, n = 1) {
    const s = this.ids.indexOf(t.id);
    if (s == -1)
      return -1;
    const o = s + n;
    return s > -1 && o < (this.count ?? this.ids.length) ? o : -1;
  }
  /**
   * Return list items (fetched from repository)
   * @return an array of items.
   */
  getItems() {
    let t = this.query.repo.whereId(this.ids);
    if (this.relations)
      for (const n of this.relations)
        t = t.with(n);
    return t.get();
  }
  initOptions({ filters: t = null, ...n }) {
    return !n.relations && this.relations && (n.relations = this.relations), !n.dataKey && this.dataKey && (n.dataKey = this.dataKey), !n.url && this.url && (n.url = this.url), t && Object.assign(this.filters, t), this.filters && (n.params = { ...this.filters, ...n.params ?? [] }), n;
  }
  /**
   * Fetch next items from API, override `url` using {@link List.nextUrl}.
   */
  async fetchNext(t) {
    return await this.fetch({ ...t, url: this.nextUrl });
  }
  /**
   * Fetch previous items from API, override `url` using {@link List.prevUrl}.
   */
  async fetchPrev(t) {
    return await this.fetch({ ...t, url: this.prevUrl });
  }
}
function rr(r) {
  const e = tr.reactive(r);
  return w("list", e), e;
}
class nr extends R {
  constructor() {
    super(...arguments);
    /**
     * Translation key for message displayed on `confirm()` to leave unsaved
     * changes.
     */
    d(this, "confirmTKey", "panel.confirm");
  }
  /** Panel name (based on props) **/
  get name() {
    var t;
    return (t = this.props) == null ? void 0 : t.name;
  }
  /** Current view. */
  get view() {
    return this.panels.panel == this.name ? this.panels.view : null;
  }
  /** Current value */
  get value() {
    return this.panels.panel == this.name ? this.panels.value : null;
  }
  /** Wether there are still edited items on current view. */
  get edited() {
    var t;
    return !!((t = this.editions) != null && t.size);
  }
  /**
   * Return reactive version of panel.
   *
   * Add watcher over panels's panel ({@link Panel.onChange})
   */
  static reactive(t) {
    const n = super.reactive(t);
    return n.watcher = A(() => n.panels.panel, (s) => n.onChange(s)), n.title = p(() => n.getTitle()), n.icon = p(() => n.getIcon()), n;
  }
  /** Return adequate icon based on props and model **/
  getIcon() {
    var t;
    return ((t = this.props) == null ? void 0 : t.icon) || null;
  }
  /** Return panel's title based on props. */
  getTitle() {
    var t;
    return (t = this.props) == null ? void 0 : t.title;
  }
  /** Set or remove an edition by name. */
  setEdition(t, n) {
    n ? this.editions.add(t) : this.editions.delete(t);
  }
  /**
   * Called when view or panel changes. It returns `true` if view/panel can be changed.
   *
   * Ask user for confirmation if there is unsaved changes (aka editions).
   *
   * @return true if we can proceed to view/panel change.
   */
  onLeave({ panels: t, force: n = !1 }) {
    if (n || !this.edited)
      return !0;
    const s = M(this.confirmTKey);
    return confirm(s);
  }
  /** Handle panels' panel change. */
  onChange(t) {
    var n;
    t == this.name && (this.panels.current != this && (this.panels.current = this), this.panels.view || (this.panels.view = (n = this.props) == null ? void 0 : n.index));
  }
}
class sr extends R {
  constructor() {
    super(...arguments);
    d(this, "panel", "");
    d(this, "view", "");
    d(this, "value", null);
    d(this, "current", null);
  }
  static readPath(t) {
    if (!t)
      return { panel: "", view: "" };
    const n = t.indexOf(".");
    return n < 0 ? { panel: t, view: "" } : { panel: t.substring(0, n), view: t.substring(n + 1) };
  }
  show({ force: t = !1, href: n = null, ...s }) {
    if (!this.current || this.current.onLeave({ target: s, force: t })) {
      if (n && window.location.pathname != n) {
        if (!s.panel)
          throw Error("The attribute `href` requires`panel`.");
        window.location.href = `${n}?panel=${s.panel}&view=${s.view}`;
        return;
      }
      this.reset(s);
    }
  }
  reset(t) {
    var n;
    this.panel = t.panel || this.panel, this.view = t.view || ((n = this.current) == null ? void 0 : n.index) || "", this.value = t.value;
  }
}
class ir extends nr {
  constructor({ query: t, ...n }) {
    var s;
    super(n);
    d(this, "showFilters", !1);
    this.showFilters = ((s = this.props) == null ? void 0 : s.showFilters) || !1;
  }
  static reactive(t) {
    const n = super.reactive(t);
    return n.item = p((s) => n.onValueChange(s)), n;
  }
  /** Current model's repository. */
  get repo() {
    return this.props.repo;
  }
  /** Current model. */
  get model() {
    return this.repo.use;
  }
  /** Return adequate icon based on props and model **/
  getIcon() {
    var t;
    return super.getIcon() || ((t = this.model.meta) == null ? void 0 : t.icon);
  }
  /** Return panel's title based on view and current item. */
  getTitle() {
    var i, u;
    const { props: t, list: n, panels: s } = this, o = this.repo.use;
    if (o) {
      if ((i = this.view) != null && i.startsWith("list."))
        return M(Z.model(o), 3);
      if ((u = this.view) != null && u.startsWith("detail.") && s.value) {
        if (s.value.$title)
          return s.value.$title;
        const a = M(Z.model(o));
        return s.value.id ? M("models._.title", { model: a, id: s.value.id }) : M("models._.title.new", { model: a });
      }
    }
    return super.getTitle();
  }
  /** Get instance of list. */
  createList() {
    const { value: t } = Ee(this.panels);
    return rr({ value: t, query: this.query });
  }
  /**
   * Edit a new item.
   *
   * @param path - path to edit view.
   */
  create(t = ".detail.add") {
    this.target.show({ panel: this.name, view: t, value: new this.model() });
  }
  /** Called when an item has been created. By default, show edit view. */
  created(t, n = ".detail.edit") {
    this.target.show({ panel: this.name, view: n, value: t, force: !0 }), this.list.fetch();
  }
  /** Get item from id. */
  getItem(t) {
  }
}
function Tr(r = {}) {
  const e = sr.reactive(r);
  return w("panels", e), e;
}
function Ar(r) {
  return ir.reactive(r);
}
function xr(r, e) {
  return Pe(() => import(r).then((t) => e ? Object.values(t).filter((s) => s.__name == e)[0] : t));
}
export {
  st as AppContext,
  X as Editor,
  tr as List,
  ot as ModelEditor,
  ir as ModelPanel,
  nr as Panel,
  R as RObject,
  T as State,
  kr as States,
  sr as Target,
  ue as assignNonEmpty,
  J as collectAttr,
  F as config,
  Qt as createApp,
  Jt as createI18n,
  br as createPinia,
  Xt as createVuetify,
  Er as csrfToken,
  xr as defineAsyncComponent,
  at as editor,
  Pr as filterSlots,
  Ir as getCookie,
  we as getCookieList,
  Cr as getCsrf,
  se as i18n,
  Dr as init,
  Fr as injectOrProvide,
  H as loadedLocalePaths,
  Rr as mapToObject,
  yr as modelEditor,
  fr as models,
  ye as reset,
  wr as setLocale,
  Yr as shallowCopy,
  M as t,
  Z as tKeys,
  pr as useAction,
  gr as useAppContext,
  vr as useI18n,
  rr as useList,
  Ar as useModelPanel,
  rt as useModels,
  nt as usePermissions,
  mr as usePermissionsProps,
  Mr as useQuery,
  Tr as useTarget
};
//# sourceMappingURL=ox.js.map
