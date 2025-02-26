var fe = Object.defineProperty;
var de = (n, e, t) => e in n ? fe(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var d = (n, e, t) => de(n, typeof e != "symbol" ? e + "" : e, t);
import { a as he, C as ge, G as me, M as pe, b as be, P as ye, c as E, U as x, g as we, u as ee, d as ve, R as ke, e as $, S as M, r as De, f as Me, h as R, i as Ae, j as Te, k as xe, l as Se, s as Oe, m as Pe, n as te, o as _ } from "./vue-i18n-DJtD-m_6.js";
import { v as Xn, q as er, y as tr, p as nr, t as rr, w as ir, x as sr } from "./vue-i18n-DJtD-m_6.js";
import { reactive as v, provide as p, computed as y, unref as w, ref as Ee, isRef as Ce, watch as A, nextTick as Fe, createApp as Re, inject as j, toRefs as Ie, defineAsyncComponent as Ye } from "vue";
import $e from "axios";
import * as _e from "ox/vendor";
import "ox/components";
import { c as je, p as L, m as ne, a as Le, b as Ne, d as Ve, e as Be, f as Ke, g as Ue, h as We, D as N, i as V, T as B, I as K, L as U, G as qe, j as He, k as Ge, l as Ze } from "./theme-CVupjJDc.js";
class I {
  /**
   * Create a new reactive instance of the object.
   * This where you can add watchers and computed properties.
   */
  static reactive(e) {
    return v(new this(e));
  }
  constructor(e = {}) {
    e && he(this, e);
  }
}
const $n = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentType: ge,
  Group: me,
  Meta: pe,
  Model: be,
  Permission: ye,
  Permissions: E,
  User: x
}, Symbol.toStringTag, { value: "Module" }));
var ze = Object.defineProperty, Je = (n, e, t) => e in n ? ze(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, k = (n, e, t) => (Je(n, typeof e != "symbol" ? e + "" : e, t), t);
class Qe {
  /**
   * Create a new response instance.
   */
  constructor(e, t, r) {
    k(this, "repository"), k(this, "config"), k(this, "response"), k(this, "entities", null), k(this, "isSaved", !1), this.repository = e, this.config = t, this.response = r;
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
    const r = await this.repository[t](e);
    this.entities = Array.isArray(r) ? r : [r], this.isSaved = !0;
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
var Xe = Object.defineProperty, et = (n, e, t) => e in n ? Xe(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, W = (n, e, t) => (et(n, typeof e != "symbol" ? e + "" : e, t), t);
class tt {
  /**
   * Create a new api instance.
   */
  constructor(e) {
    W(this, "repository"), W(this, "config", {
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
    var t, r, i;
    const e = { ...(t = this.repository.config.axiosApi) == null ? void 0 : t.actions, ...(i = (r = this.repository.getModel().$config()) == null ? void 0 : r.axiosApi) == null ? void 0 : i.actions };
    if (e)
      for (const a in e) {
        const s = e[a];
        typeof s == "function" ? this.registerFunctionAction(a, s) : this.registerObjectAction(a, s);
      }
  }
  /**
   * Register the given object action.
   */
  registerObjectAction(e, t) {
    this[e] = (r) => this.request({ ...t, ...r });
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
  post(e, t = {}, r = {}) {
    return this.request({ method: "post", url: e, data: t, ...r });
  }
  /**
   * Perform a put request.
   */
  put(e, t = {}, r = {}) {
    return this.request({ method: "put", url: e, data: t, ...r });
  }
  /**
   * Perform a patch request.
   */
  patch(e, t = {}, r = {}) {
    return this.request({ method: "patch", url: e, data: t, ...r });
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
    const t = this.createConfig(e), r = await this.axios.request(t);
    return this.createResponse(r, t);
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
    const r = new Qe(this.repository, t, e);
    return t.delete !== void 0 ? (await r.delete(), r) : (t.save && await r.save(), r);
  }
}
var nt = Object.defineProperty, rt = (n, e, t) => e in n ? nt(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, P = (n, e, t) => (rt(n, typeof e != "symbol" ? e + "" : e, t), t);
class q extends ke {
  constructor() {
    var e, t, r;
    super(...arguments), P(this, "axios", ((t = (e = $) == null ? void 0 : e.axiosApi) == null ? void 0 : t.axios) || null), P(this, "globalApiConfig", ((r = $) == null ? void 0 : r.axiosApi) || {}), P(this, "apiConfig", {});
  }
  api() {
    return it(this);
  }
  setAxios(e) {
    return this.axios = e, this;
  }
}
function it(n) {
  return new tt(n);
}
function st(n) {
  const e = we();
  return q.useModel = n, ee(q, e);
}
function at(n) {
  return ve((e) => (e.config.axiosApi = n, e));
}
function ot(n, e = !0) {
  const t = {};
  Array.isArray(n) || (n = Object.values(n)), e && !n.includes(x) && n.push(x);
  for (const r of n)
    if (r && r.entity) {
      if (r.entity in t)
        continue;
      ee(r), t[r.entity] = st(r);
    }
  return p("models", n), p("repos", t), { models: n, repos: t };
}
function _n() {
  return {
    permissions: [String, Function, Object, Array]
  };
}
function ct(n, e, t) {
  const r = e instanceof E ? e : new E(e), i = y(() => r.can(w(n), w(t)));
  return { permissions: r, allowed: i };
}
class lt {
  static reactive(e) {
    const t = v(new this(e));
    return t.user = y(() => {
      var r;
      return new x(((r = t.data) == null ? void 0 : r.user) || {});
    }), t;
  }
  constructor(e = {}) {
    Object.assign(this, e), this.state = M.none(), this.showState = !1;
  }
  /**
   * Load data into AppData. If no `value` is provided, read it from
   * source element.
   */
  load(e = void 0) {
    this.dataEl !== void 0 && (e === void 0 && (e = this.readData(this.dataEl)), e.dataEl = this.dataEl, this.data = e, this.panel && this.data.panel && (this.panel.value = e)), this.models !== void 0 && (this.repos = ot(this.models).repos);
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
function jn(n, e = !0) {
  const t = lt.reactive(n);
  return e && t.dataEl && t.load(), p("context", t), p("user", t.user), t;
}
class ut {
  constructor(e, t) {
    Object.assign(this, e), this.props = t, this.processing = Ee(!1);
    const r = ct(this.user, t.permissions, t.item);
    this.permissions = r.permissions, this.allowed = r.allowed;
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
function Ln(n, e) {
  return new ut(n, e);
}
class re {
  static reactive({ initial: e, ...t }) {
    const r = v(new this({ initial: w(e), ...t }));
    return r.edited = y(() => r.isEdited()), Ce(e) && A(e, (i) => r.reset(i)), r;
  }
  constructor(e, t = {}) {
    Object.assign(this, e), Object.assign(this, t), this.state || (this.state = new M()), this.value = {}, this.reset(this.initial);
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
    De(this.value, e);
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
    var r;
    if (this.state.processing(), !this.isValid())
      return this.state.error({
        _: "Some of the input values are invalid"
      });
    e = this.serialize(e ?? this.value);
    const t = await this.send(e);
    return t.isOk ? (this.reset(t.data), (r = this.saved) == null || r.call(this, this.value, this)) : this.state = t, this.state;
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
class ft extends re {
  constructor({ repo: e, url: t, ...r }) {
    var i, a;
    t = t || ((a = (i = e.use) == null ? void 0 : i.meta) == null ? void 0 : a.url), super({ url: t, ...r }, { repo: e });
  }
  get fields() {
    return this._fields || (this._fields = Object.keys(this.repo.use.fields())), this._fields;
  }
  _reset(e) {
    this.value = v(new this.initial.constructor()), this.fields.reduce((t, r) => (t[r] = e[r], t), this.value);
  }
  isEdited() {
    return this.fields.some((e) => this.value[e] != this.initial[e]);
  }
  serialize(e) {
    return e.$toJson(null, { relations: !1 });
  }
  send(e) {
    let [t, r] = ["post", this.url];
    return e.id && (r = `${r}${e.id}/`, t = "put"), this.repo.api()[t](r, e).then(
      (i) => M.ok(i.entities[0]),
      (i) => M.error(i.response.data)
    );
  }
}
function dt({ editorClass: n = re, emits: e = null, panel: t = null, ...r }) {
  e && (r.saved ?? (r.saved = (a, s) => e("saved", a, s)));
  const i = n.reactive(r);
  return t && A(() => i.edited, (a) => t.setEdition(i.name, a)), i;
}
function Nn(n) {
  return dt({ ...n, editorClass: ft });
}
const O = {
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
function ht(n, e, t) {
  const r = [];
  let i = [];
  const a = ie(n), s = se(n), c = t ?? O[e.slice(-2).toUpperCase()] ?? 0, o = (a.getDay() - c + 7) % 7, g = (s.getDay() - c + 7) % 7;
  for (let l = 0; l < o; l++) {
    const f = new Date(a);
    f.setDate(f.getDate() - (o - l)), i.push(f);
  }
  for (let l = 1; l <= s.getDate(); l++) {
    const f = new Date(n.getFullYear(), n.getMonth(), l);
    i.push(f), i.length === 7 && (r.push(i), i = []);
  }
  for (let l = 1; l < 7 - g; l++) {
    const f = new Date(s);
    f.setDate(f.getDate() + l), i.push(f);
  }
  return i.length > 0 && r.push(i), r;
}
function gt(n, e, t) {
  const r = t ?? O[e.slice(-2).toUpperCase()] ?? 0, i = new Date(n);
  for (; i.getDay() !== r; )
    i.setDate(i.getDate() - 1);
  return i;
}
function mt(n, e) {
  const t = new Date(n), r = ((O[e.slice(-2).toUpperCase()] ?? 0) + 6) % 7;
  for (; t.getDay() !== r; )
    t.setDate(t.getDate() + 1);
  return t;
}
function ie(n) {
  return new Date(n.getFullYear(), n.getMonth(), 1);
}
function se(n) {
  return new Date(n.getFullYear(), n.getMonth() + 1, 0);
}
function pt(n) {
  const e = n.split("-").map(Number);
  return new Date(e[0], e[1] - 1, e[2]);
}
const bt = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
function ae(n) {
  if (n == null) return /* @__PURE__ */ new Date();
  if (n instanceof Date) return n;
  if (typeof n == "string") {
    let e;
    if (bt.test(n))
      return pt(n);
    if (e = Date.parse(n), !isNaN(e)) return new Date(e);
  }
  return null;
}
const H = new Date(2e3, 0, 2);
function yt(n, e) {
  const t = e ?? O[n.slice(-2).toUpperCase()] ?? 0;
  return je(7).map((r) => {
    const i = new Date(H);
    return i.setDate(H.getDate() + t + r), new Intl.DateTimeFormat(n, {
      weekday: "narrow"
    }).format(i);
  });
}
function wt(n, e, t, r) {
  const i = ae(n) ?? /* @__PURE__ */ new Date(), a = r == null ? void 0 : r[e];
  if (typeof a == "function")
    return a(i, e, t);
  let s = {};
  switch (e) {
    case "fullDate":
      s = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      break;
    case "fullDateWithWeekday":
      s = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      break;
    case "normalDate":
      const c = i.getDate(), o = new Intl.DateTimeFormat(t, {
        month: "long"
      }).format(i);
      return `${c} ${o}`;
    case "normalDateWithWeekday":
      s = {
        weekday: "short",
        day: "numeric",
        month: "short"
      };
      break;
    case "shortDate":
      s = {
        month: "short",
        day: "numeric"
      };
      break;
    case "year":
      s = {
        year: "numeric"
      };
      break;
    case "month":
      s = {
        month: "long"
      };
      break;
    case "monthShort":
      s = {
        month: "short"
      };
      break;
    case "monthAndYear":
      s = {
        month: "long",
        year: "numeric"
      };
      break;
    case "monthAndDate":
      s = {
        month: "long",
        day: "numeric"
      };
      break;
    case "weekday":
      s = {
        weekday: "long"
      };
      break;
    case "weekdayShort":
      s = {
        weekday: "short"
      };
      break;
    case "dayOfMonth":
      return new Intl.NumberFormat(t).format(i.getDate());
    case "hours12h":
      s = {
        hour: "numeric",
        hour12: !0
      };
      break;
    case "hours24h":
      s = {
        hour: "numeric",
        hour12: !1
      };
      break;
    case "minutes":
      s = {
        minute: "numeric"
      };
      break;
    case "seconds":
      s = {
        second: "numeric"
      };
      break;
    case "fullTime":
      s = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: !0
      };
      break;
    case "fullTime12h":
      s = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: !0
      };
      break;
    case "fullTime24h":
      s = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: !1
      };
      break;
    case "fullDateTime":
      s = {
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
      s = {
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
      s = {
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
      s = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      };
      break;
    case "keyboardDateTime":
      s = {
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
      s = {
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
      s = {
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
      s = a ?? {
        timeZone: "UTC",
        timeZoneName: "short"
      };
  }
  return new Intl.DateTimeFormat(t, s).format(i);
}
function vt(n, e) {
  const t = n.toJsDate(e), r = t.getFullYear(), i = L(String(t.getMonth() + 1), 2, "0"), a = L(String(t.getDate()), 2, "0");
  return `${r}-${i}-${a}`;
}
function kt(n) {
  const [e, t, r] = n.split("-").map(Number);
  return new Date(e, t - 1, r);
}
function Dt(n, e) {
  const t = new Date(n);
  return t.setMinutes(t.getMinutes() + e), t;
}
function Mt(n, e) {
  const t = new Date(n);
  return t.setHours(t.getHours() + e), t;
}
function At(n, e) {
  const t = new Date(n);
  return t.setDate(t.getDate() + e), t;
}
function Tt(n, e) {
  const t = new Date(n);
  return t.setDate(t.getDate() + e * 7), t;
}
function xt(n, e) {
  const t = new Date(n);
  return t.setDate(1), t.setMonth(t.getMonth() + e), t;
}
function St(n) {
  return n.getFullYear();
}
function Ot(n) {
  return n.getMonth();
}
function Pt(n) {
  return n.getDate();
}
function Et(n) {
  return new Date(n.getFullYear(), n.getMonth() + 1, 1);
}
function Ct(n) {
  return new Date(n.getFullYear(), n.getMonth() - 1, 1);
}
function Ft(n) {
  return n.getHours();
}
function Rt(n) {
  return n.getMinutes();
}
function It(n) {
  return new Date(n.getFullYear(), 0, 1);
}
function Yt(n) {
  return new Date(n.getFullYear(), 11, 31);
}
function $t(n, e) {
  return S(n, e[0]) && Lt(n, e[1]);
}
function _t(n) {
  const e = new Date(n);
  return e instanceof Date && !isNaN(e.getTime());
}
function S(n, e) {
  return n.getTime() > e.getTime();
}
function jt(n, e) {
  return S(C(n), C(e));
}
function Lt(n, e) {
  return n.getTime() < e.getTime();
}
function G(n, e) {
  return n.getTime() === e.getTime();
}
function Nt(n, e) {
  return n.getDate() === e.getDate() && n.getMonth() === e.getMonth() && n.getFullYear() === e.getFullYear();
}
function Vt(n, e) {
  return n.getMonth() === e.getMonth() && n.getFullYear() === e.getFullYear();
}
function Bt(n, e) {
  return n.getFullYear() === e.getFullYear();
}
function Kt(n, e, t) {
  const r = new Date(n), i = new Date(e);
  switch (t) {
    case "years":
      return r.getFullYear() - i.getFullYear();
    case "quarters":
      return Math.floor((r.getMonth() - i.getMonth() + (r.getFullYear() - i.getFullYear()) * 12) / 4);
    case "months":
      return r.getMonth() - i.getMonth() + (r.getFullYear() - i.getFullYear()) * 12;
    case "weeks":
      return Math.floor((r.getTime() - i.getTime()) / (1e3 * 60 * 60 * 24 * 7));
    case "days":
      return Math.floor((r.getTime() - i.getTime()) / (1e3 * 60 * 60 * 24));
    case "hours":
      return Math.floor((r.getTime() - i.getTime()) / (1e3 * 60 * 60));
    case "minutes":
      return Math.floor((r.getTime() - i.getTime()) / (1e3 * 60));
    case "seconds":
      return Math.floor((r.getTime() - i.getTime()) / 1e3);
    default:
      return r.getTime() - i.getTime();
  }
}
function Ut(n, e) {
  const t = new Date(n);
  return t.setHours(e), t;
}
function Wt(n, e) {
  const t = new Date(n);
  return t.setMinutes(e), t;
}
function qt(n, e) {
  const t = new Date(n);
  return t.setMonth(e), t;
}
function Ht(n, e) {
  const t = new Date(n);
  return t.setDate(e), t;
}
function Gt(n, e) {
  const t = new Date(n);
  return t.setFullYear(e), t;
}
function C(n) {
  return new Date(n.getFullYear(), n.getMonth(), n.getDate(), 0, 0, 0, 0);
}
function Zt(n) {
  return new Date(n.getFullYear(), n.getMonth(), n.getDate(), 23, 59, 59, 999);
}
class zt {
  constructor(e) {
    this.locale = e.locale, this.formats = e.formats;
  }
  date(e) {
    return ae(e);
  }
  toJsDate(e) {
    return e;
  }
  toISO(e) {
    return vt(this, e);
  }
  parseISO(e) {
    return kt(e);
  }
  addMinutes(e, t) {
    return Dt(e, t);
  }
  addHours(e, t) {
    return Mt(e, t);
  }
  addDays(e, t) {
    return At(e, t);
  }
  addWeeks(e, t) {
    return Tt(e, t);
  }
  addMonths(e, t) {
    return xt(e, t);
  }
  getWeekArray(e, t) {
    return ht(e, this.locale, t ? Number(t) : void 0);
  }
  startOfWeek(e, t) {
    return gt(e, this.locale, t ? Number(t) : void 0);
  }
  endOfWeek(e) {
    return mt(e, this.locale);
  }
  startOfMonth(e) {
    return ie(e);
  }
  endOfMonth(e) {
    return se(e);
  }
  format(e, t) {
    return wt(e, t, this.locale, this.formats);
  }
  isEqual(e, t) {
    return G(e, t);
  }
  isValid(e) {
    return _t(e);
  }
  isWithinRange(e, t) {
    return $t(e, t);
  }
  isAfter(e, t) {
    return S(e, t);
  }
  isAfterDay(e, t) {
    return jt(e, t);
  }
  isBefore(e, t) {
    return !S(e, t) && !G(e, t);
  }
  isSameDay(e, t) {
    return Nt(e, t);
  }
  isSameMonth(e, t) {
    return Vt(e, t);
  }
  isSameYear(e, t) {
    return Bt(e, t);
  }
  setMinutes(e, t) {
    return Wt(e, t);
  }
  setHours(e, t) {
    return Ut(e, t);
  }
  setMonth(e, t) {
    return qt(e, t);
  }
  setDate(e, t) {
    return Ht(e, t);
  }
  setYear(e, t) {
    return Gt(e, t);
  }
  getDiff(e, t, r) {
    return Kt(e, t, r);
  }
  getWeekdays(e) {
    return yt(this.locale, e ? Number(e) : void 0);
  }
  getYear(e) {
    return St(e);
  }
  getMonth(e) {
    return Ot(e);
  }
  getDate(e) {
    return Pt(e);
  }
  getNextMonth(e) {
    return Et(e);
  }
  getPreviousMonth(e) {
    return Ct(e);
  }
  getHours(e) {
    return Ft(e);
  }
  getMinutes(e) {
    return Rt(e);
  }
  startOfDay(e) {
    return C(e);
  }
  endOfDay(e) {
    return Zt(e);
  }
  startOfYear(e) {
    return It(e);
  }
  endOfYear(e) {
    return Yt(e);
  }
}
const Jt = Symbol.for("vuetify:date-options"), Z = Symbol.for("vuetify:date-adapter");
function Qt(n, e) {
  const t = ne({
    adapter: zt,
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
  }, n);
  return {
    options: t,
    instance: Xt(t, e)
  };
}
function Xt(n, e) {
  const t = v(typeof n.adapter == "function" ? new n.adapter({
    locale: n.locale[e.current.value] ?? e.current.value,
    formats: n.formats
  }) : n.adapter);
  return A(e.current, (r) => {
    t.locale = n.locale[r] ?? r ?? t.locale;
  }), t;
}
function oe() {
  let n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    blueprint: e,
    ...t
  } = n, r = ne(e, t), {
    aliases: i = {},
    components: a = {},
    directives: s = {}
  } = r, c = Le(r.defaults), o = Ne(r.display, r.ssr), g = Ve(r.theme), l = Be(r.icons), f = Ke(r.locale), m = Qt(r.date, f), T = Ue(r.goTo, f);
  return {
    install: (u) => {
      for (const h in s)
        u.directive(h, s[h]);
      for (const h in a)
        u.component(h, a[h]);
      for (const h in i)
        u.component(h, We({
          ...i[h],
          name: h,
          aliasName: i[h].name
        }));
      if (g.install(u), u.provide(N, c), u.provide(V, o), u.provide(B, g), u.provide(K, l), u.provide(U, f), u.provide(Jt, m.options), u.provide(Z, m.instance), u.provide(qe, T), He && r.ssr)
        if (u.$nuxt)
          u.$nuxt.hook("app:suspense:resolve", () => {
            o.update();
          });
        else {
          const {
            mount: h
          } = u;
          u.mount = function() {
            const ue = h(...arguments);
            return Fe(() => o.update()), u.mount = h, ue;
          };
        }
      Ge.reset(), u.mixin({
        computed: {
          $vuetify() {
            return v({
              defaults: b.call(this, N),
              display: b.call(this, V),
              theme: b.call(this, B),
              icons: b.call(this, K),
              locale: b.call(this, U),
              date: b.call(this, Z)
            });
          }
        }
      });
    },
    defaults: c,
    display: o,
    theme: g,
    icons: l,
    locale: f,
    date: m,
    goTo: T
  };
}
const en = "3.7.3";
oe.version = en;
function b(n) {
  var r, i;
  const e = this.$, t = ((r = e.parent) == null ? void 0 : r.provides) ?? ((i = e.vnode.appContext) == null ? void 0 : i.provides);
  if (t && n in t)
    return t[n];
}
const tn = {
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
      mdi: Ze
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
}, nn = {
  base: "#f44336",
  lighten5: "#ffebee",
  lighten4: "#ffcdd2",
  lighten3: "#ef9a9a",
  lighten2: "#e57373",
  lighten1: "#ef5350",
  darken1: "#e53935",
  darken2: "#d32f2f",
  darken3: "#c62828",
  darken4: "#b71c1c",
  accent1: "#ff8a80",
  accent2: "#ff5252",
  accent3: "#ff1744",
  accent4: "#d50000"
}, rn = {
  base: "#e91e63",
  lighten5: "#fce4ec",
  lighten4: "#f8bbd0",
  lighten3: "#f48fb1",
  lighten2: "#f06292",
  lighten1: "#ec407a",
  darken1: "#d81b60",
  darken2: "#c2185b",
  darken3: "#ad1457",
  darken4: "#880e4f",
  accent1: "#ff80ab",
  accent2: "#ff4081",
  accent3: "#f50057",
  accent4: "#c51162"
}, sn = {
  base: "#9c27b0",
  lighten5: "#f3e5f5",
  lighten4: "#e1bee7",
  lighten3: "#ce93d8",
  lighten2: "#ba68c8",
  lighten1: "#ab47bc",
  darken1: "#8e24aa",
  darken2: "#7b1fa2",
  darken3: "#6a1b9a",
  darken4: "#4a148c",
  accent1: "#ea80fc",
  accent2: "#e040fb",
  accent3: "#d500f9",
  accent4: "#aa00ff"
}, an = {
  base: "#673ab7",
  lighten5: "#ede7f6",
  lighten4: "#d1c4e9",
  lighten3: "#b39ddb",
  lighten2: "#9575cd",
  lighten1: "#7e57c2",
  darken1: "#5e35b1",
  darken2: "#512da8",
  darken3: "#4527a0",
  darken4: "#311b92",
  accent1: "#b388ff",
  accent2: "#7c4dff",
  accent3: "#651fff",
  accent4: "#6200ea"
}, on = {
  base: "#3f51b5",
  lighten5: "#e8eaf6",
  lighten4: "#c5cae9",
  lighten3: "#9fa8da",
  lighten2: "#7986cb",
  lighten1: "#5c6bc0",
  darken1: "#3949ab",
  darken2: "#303f9f",
  darken3: "#283593",
  darken4: "#1a237e",
  accent1: "#8c9eff",
  accent2: "#536dfe",
  accent3: "#3d5afe",
  accent4: "#304ffe"
}, cn = {
  base: "#2196f3",
  lighten5: "#e3f2fd",
  lighten4: "#bbdefb",
  lighten3: "#90caf9",
  lighten2: "#64b5f6",
  lighten1: "#42a5f5",
  darken1: "#1e88e5",
  darken2: "#1976d2",
  darken3: "#1565c0",
  darken4: "#0d47a1",
  accent1: "#82b1ff",
  accent2: "#448aff",
  accent3: "#2979ff",
  accent4: "#2962ff"
}, ln = {
  base: "#03a9f4",
  lighten5: "#e1f5fe",
  lighten4: "#b3e5fc",
  lighten3: "#81d4fa",
  lighten2: "#4fc3f7",
  lighten1: "#29b6f6",
  darken1: "#039be5",
  darken2: "#0288d1",
  darken3: "#0277bd",
  darken4: "#01579b",
  accent1: "#80d8ff",
  accent2: "#40c4ff",
  accent3: "#00b0ff",
  accent4: "#0091ea"
}, un = {
  base: "#00bcd4",
  lighten5: "#e0f7fa",
  lighten4: "#b2ebf2",
  lighten3: "#80deea",
  lighten2: "#4dd0e1",
  lighten1: "#26c6da",
  darken1: "#00acc1",
  darken2: "#0097a7",
  darken3: "#00838f",
  darken4: "#006064",
  accent1: "#84ffff",
  accent2: "#18ffff",
  accent3: "#00e5ff",
  accent4: "#00b8d4"
}, fn = {
  base: "#009688",
  lighten5: "#e0f2f1",
  lighten4: "#b2dfdb",
  lighten3: "#80cbc4",
  lighten2: "#4db6ac",
  lighten1: "#26a69a",
  darken1: "#00897b",
  darken2: "#00796b",
  darken3: "#00695c",
  darken4: "#004d40",
  accent1: "#a7ffeb",
  accent2: "#64ffda",
  accent3: "#1de9b6",
  accent4: "#00bfa5"
}, dn = {
  base: "#4caf50",
  lighten5: "#e8f5e9",
  lighten4: "#c8e6c9",
  lighten3: "#a5d6a7",
  lighten2: "#81c784",
  lighten1: "#66bb6a",
  darken1: "#43a047",
  darken2: "#388e3c",
  darken3: "#2e7d32",
  darken4: "#1b5e20",
  accent1: "#b9f6ca",
  accent2: "#69f0ae",
  accent3: "#00e676",
  accent4: "#00c853"
}, hn = {
  base: "#8bc34a",
  lighten5: "#f1f8e9",
  lighten4: "#dcedc8",
  lighten3: "#c5e1a5",
  lighten2: "#aed581",
  lighten1: "#9ccc65",
  darken1: "#7cb342",
  darken2: "#689f38",
  darken3: "#558b2f",
  darken4: "#33691e",
  accent1: "#ccff90",
  accent2: "#b2ff59",
  accent3: "#76ff03",
  accent4: "#64dd17"
}, gn = {
  base: "#cddc39",
  lighten5: "#f9fbe7",
  lighten4: "#f0f4c3",
  lighten3: "#e6ee9c",
  lighten2: "#dce775",
  lighten1: "#d4e157",
  darken1: "#c0ca33",
  darken2: "#afb42b",
  darken3: "#9e9d24",
  darken4: "#827717",
  accent1: "#f4ff81",
  accent2: "#eeff41",
  accent3: "#c6ff00",
  accent4: "#aeea00"
}, mn = {
  base: "#ffeb3b",
  lighten5: "#fffde7",
  lighten4: "#fff9c4",
  lighten3: "#fff59d",
  lighten2: "#fff176",
  lighten1: "#ffee58",
  darken1: "#fdd835",
  darken2: "#fbc02d",
  darken3: "#f9a825",
  darken4: "#f57f17",
  accent1: "#ffff8d",
  accent2: "#ffff00",
  accent3: "#ffea00",
  accent4: "#ffd600"
}, pn = {
  base: "#ffc107",
  lighten5: "#fff8e1",
  lighten4: "#ffecb3",
  lighten3: "#ffe082",
  lighten2: "#ffd54f",
  lighten1: "#ffca28",
  darken1: "#ffb300",
  darken2: "#ffa000",
  darken3: "#ff8f00",
  darken4: "#ff6f00",
  accent1: "#ffe57f",
  accent2: "#ffd740",
  accent3: "#ffc400",
  accent4: "#ffab00"
}, bn = {
  base: "#ff9800",
  lighten5: "#fff3e0",
  lighten4: "#ffe0b2",
  lighten3: "#ffcc80",
  lighten2: "#ffb74d",
  lighten1: "#ffa726",
  darken1: "#fb8c00",
  darken2: "#f57c00",
  darken3: "#ef6c00",
  darken4: "#e65100",
  accent1: "#ffd180",
  accent2: "#ffab40",
  accent3: "#ff9100",
  accent4: "#ff6d00"
}, yn = {
  base: "#ff5722",
  lighten5: "#fbe9e7",
  lighten4: "#ffccbc",
  lighten3: "#ffab91",
  lighten2: "#ff8a65",
  lighten1: "#ff7043",
  darken1: "#f4511e",
  darken2: "#e64a19",
  darken3: "#d84315",
  darken4: "#bf360c",
  accent1: "#ff9e80",
  accent2: "#ff6e40",
  accent3: "#ff3d00",
  accent4: "#dd2c00"
}, wn = {
  base: "#795548",
  lighten5: "#efebe9",
  lighten4: "#d7ccc8",
  lighten3: "#bcaaa4",
  lighten2: "#a1887f",
  lighten1: "#8d6e63",
  darken1: "#6d4c41",
  darken2: "#5d4037",
  darken3: "#4e342e",
  darken4: "#3e2723"
}, vn = {
  base: "#607d8b",
  lighten5: "#eceff1",
  lighten4: "#cfd8dc",
  lighten3: "#b0bec5",
  lighten2: "#90a4ae",
  lighten1: "#78909c",
  darken1: "#546e7a",
  darken2: "#455a64",
  darken3: "#37474f",
  darken4: "#263238"
}, kn = {
  base: "#9e9e9e",
  lighten5: "#fafafa",
  lighten4: "#f5f5f5",
  lighten3: "#eeeeee",
  lighten2: "#e0e0e0",
  lighten1: "#bdbdbd",
  darken1: "#757575",
  darken2: "#616161",
  darken3: "#424242",
  darken4: "#212121"
}, Dn = {
  black: "#000000",
  white: "#ffffff",
  transparent: "#ffffff00"
}, z = {
  red: nn,
  pink: rn,
  purple: sn,
  deepPurple: an,
  indigo: on,
  blue: cn,
  lightBlue: ln,
  cyan: un,
  teal: fn,
  green: dn,
  lightGreen: hn,
  lime: gn,
  yellow: mn,
  amber: pn,
  orange: bn,
  deepOrange: yn,
  brown: wn,
  blueGrey: vn,
  grey: kn,
  shades: Dn
};
function Mn() {
  const e = (Me("lang", ",") || ["en"]).map(
    (t) => t.toLowerCase().replace(/[_-](\w+)/, "")
  ).find((t) => t in R.locales);
  return Ae({
    legacy: !1,
    fallbackLocale: "en",
    locale: e
  });
}
const ce = Mn();
function D(...n) {
  return ce.global.t(...n);
}
function Vn(n, e, t) {
  if (!(t in R.locales))
    throw Error("Locale is not provided by config.");
  n.global.locale.value = t, F(n, e, t), document.querySelector("html").setAttribute("lang", t);
}
const J = /* @__PURE__ */ new Set();
function Bn({ path: n = "./", fallback: e = !0, ...t } = {}) {
  const r = Te(t);
  return Q(r, { path: n, fallback: e }), A(() => r.locale, () => Q(r, { path: n, fallback: e })), r;
}
async function F(n, e, t) {
  const r = t.replace(/[_-](\w+)/, "");
  if (e = `${e}locales/${r}.json`, J.has(e))
    return;
  J.add(e);
  const i = await fetch(e).then((a) => a.json());
  n.messages.value[t] = {
    ...n.messages.value[t],
    ...i
  };
}
function Q(n, { path: e = "./", fallback: t = !0 } = {}) {
  e.startsWith("/") || (e = import.meta.resolve(e)), e.endsWith("/") || (e += "/");
  let r = F(n, e, w(n.locale));
  return t && n.fallbackLocale.value && (r = r.catch((i) => F(n, e, w(n.fallbackLocale))).catch((i) => {
    throw Error(
      `Could not load locale ${n.locale.value} nor its fallback ${n.fallbackLocale.value} (path: ${e}). Error: ${i}`
    );
  })), r;
}
const X = {
  model: (n) => `models.${n.entity}`,
  field: (n) => `fields.${n}`
};
function Kn({ App: n = null, el: e = "#app", onLoad: t = !0, ...r } = {}) {
  function i() {
    const a = An(n, r), s = e ? a.mount(e) : null;
    return document.body.classList.remove("loading"), { app: a, el: e, vm: s };
  }
  return new Promise((a) => {
    if (t)
      return window.addEventListener(
        "load",
        () => a(i())
      );
    a(i());
  });
}
function An(n, { props: e = {}, vuetify: t = {}, plugins: r = null } = {}) {
  return n = Re(n, e), n.config.globalProperties.window = window, n.use(Tn(t)), n.use(ce), r && r.forEach((i) => n.use(i)), n;
}
function Tn({ components: n = {}, ...e }) {
  return e.components = {
    ..._e,
    ...n
  }, oe({
    blueprint: tn,
    theme: {
      themes: {
        light: {
          dark: !1,
          colors: {
            primary: z.green.darken1,
            secondary: z.green.lighten4
          }
        }
      }
    },
    ...e
  });
}
function Un({ axiosConfig: n = null, baseURL: e = null } = {}) {
  e || (e = document.body.dataset.apiUrl);
  const t = xe(), r = Se({});
  return r().use(
    at({
      axios: $e,
      ...n || R.axiosConfig,
      baseURL: e
    })
  ), Oe(t), t.use(r);
}
class Y {
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
  async fetch({ ids: e = null, repo: t = null, url: r = null, lookup: i = "id__in", params: a = void 0, relations: s = null, ...c } = {}) {
    var g, l;
    if (t ?? (t = this.repo), r || (r = (l = (g = t.use) == null ? void 0 : g.meta) == null ? void 0 : l.url), !r)
      throw Error("URL must be provided or Model must provide a `meta: Meta` with `url`");
    e && i !== void 0 && (a = { ...a || {} }, a[i] = [...e]);
    const o = await t.api().get(r, { ...c, params: a });
    return s && (o.relations = await this.relations(o.entities, s, { ...c, params: {} })), o;
  }
  /**
   * Fetch all items from api.
   *
   * @param [options.nextKey] response object key to get next url
   * @param [options.limit] max count of consecutive requests
   * @return Response of the first request, whoses ``entities`` has \
   * model instances of all requests.
   */
  async all({ nextKey: e = "next", limit: t = -1, ...r } = {}) {
    const i = await this.fetch(r);
    let a = i.response.data[e];
    for (; a; ) {
      const s = await this.fetch({ ...r, url: a });
      if (s.entities && (i.entities = i.entities !== null ? i.entities.concat(s.entities) : s.entities), a = s.response.data[e], t > 0 && t--, !t) break;
    }
    return i;
  }
  /**
   * Fetch related objects for the provided list and field names.
   *
   * @param objs - the objects to get related ids from.
   * @param options.fields - list of field names.
   * @param options.opts - options to pass down to 'relation'.
   * @return the resulting entities.
   */
  async relations(e, t, r = {}) {
    var s;
    this._ensureRepos("relations");
    const i = {}, a = (s = this.repo.use) == null ? void 0 : s.fields();
    if (a)
      for (const c of t) {
        const o = a[c];
        if (o instanceof Pe)
          i[c] = await this.relation(e, o, r);
        else
          throw Error(`Field ${c} is not a relation`);
      }
    return i;
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
  async relation(e, t, { thin: r = !1, ...i } = {}) {
    var l, f;
    if (this._ensureRepos("relations"), typeof t == "string") {
      const m = (l = this.repo.use) == null ? void 0 : l.fields();
      if (!m || !m[t])
        throw Error(`Field ${t} is not a relation on ${this.repo.use} model`);
      t = m[t];
    }
    const a = t.related.constructor.entity, s = this.repos[a];
    if (!s)
      throw Error(`No repository "${a}" found.`);
    let c = te(e, t.foreignKey), o = null;
    if (r) {
      o = new Set(Object.keys((f = s.pinia.state[a]) == null ? void 0 : f.value.data).filter((T) => T in c));
      const m = c.difference(o);
      m && (c = m);
    }
    const g = await this.all({ ids: c, repo: s, ...i });
    if (r && o) {
      const m = s.whereId(o).get();
      g.entities = [...g.entities || [], ...m];
    }
    return g;
  }
}
function Wn(n, e) {
  return new Y(n, e);
}
class le extends I {
  constructor() {
    super(...arguments);
    d(this, "state", M.none());
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
  static reactive({ value: t, ...r }) {
    const i = super.reactive(r);
    return i.value = t, i.prev = y(() => i.getSibling(i.value, -1)), i.next = y(() => i.getSibling(i.value, 1)), i;
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
  async fetch({ append: t = !1, ...r } = {}) {
    this.state.processing(), r = this.initOptions(r);
    const i = await this.query.fetch(r), a = [...te(i.entities, "id")];
    return this.ids = t ? this.ids.concat(a) : a, this.nextUrl = i.response.data[this.nextKey] || null, this.prevUrl = i.response.data[this.prevKey] || null, this.count = i.response.data[this.countKey] || this.ids.length, this.state.none(), i;
  }
  /**
   * Get siblings of a value for the provided IRList.
   *
   * Arguments are the same as {@link List.getSiblingIndex}.
   *
   * **Note**: this method is only available on the reactive object.
   */
  getSibling(t, r) {
    const i = this.getSiblingIndex(w(t), r);
    return i > -1 ? this.items[i] : null;
  }
  /**
   * Get index of an item's sibling on specified direction.
   *
   * @param value - item to look sibling of.
   * @param dir - direction (next: `1`, previous: `-1`)
   * @return the index of the sibling or `-1` if none found.
   */
  getSiblingIndex(t, r = 1) {
    const i = this.ids.indexOf(t.id);
    if (i == -1)
      return -1;
    const a = i + r;
    return i > -1 && a < (this.count ?? this.ids.length) ? a : -1;
  }
  /**
   * Return list items (fetched from repository)
   * @return an array of items.
   */
  get items() {
    let t = this.query.repo.whereId(this.ids);
    if (this.relations)
      for (const r of this.relations)
        t = t.with(r);
    return t.get();
  }
  initOptions({ filters: t = null, ...r }) {
    return !r.relations && this.relations && (r.relations = this.relations), !r.dataKey && this.dataKey && (r.dataKey = this.dataKey), !r.url && this.url && (r.url = this.url), t && Object.assign(this.filters, t), this.filters && (r.params = { ...this.filters, ...r.params ?? [] }), r;
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
class xn extends I {
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
    const r = super.reactive(t);
    return r.watcher = A(() => r.panels.panel, (i) => r.onChange(i)), r;
  }
  /** Return adequate icon based on props and model **/
  get icon() {
    var t;
    return ((t = this.props) == null ? void 0 : t.icon) || null;
  }
  /** Return panel's title based on props. */
  get title() {
    var t;
    return (t = this.props) == null ? void 0 : t.title;
  }
  /** Set or remove an edition by name. */
  setEdition(t, r) {
    r ? this.editions.add(t) : this.editions.delete(t);
  }
  /**
   * Called when view or panel changes. It returns `true` if view/panel can be changed.
   *
   * Ask user for confirmation if there is unsaved changes (aka editions).
   *
   * @return true if we can proceed to view/panel change.
   */
  onLeave({ panels: t, force: r = !1 }) {
    if (r || !this.edited)
      return !0;
    const i = D(this.confirmTKey);
    return confirm(i);
  }
  /** Handle panels' panel change. */
  onChange(t) {
    var r;
    t == this.name && (this.panels.current != this && (this.panels.current = this), this.panels.view || (this.panels.view = (r = this.props) == null ? void 0 : r.index));
  }
}
class Sn extends I {
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
    const r = t.indexOf(".");
    return r < 0 ? { panel: t, view: "" } : { panel: t.substring(0, r), view: t.substring(r + 1) };
  }
  show({ force: t = !1, href: r = null, ...i }) {
    if (!this.current || this.current.onLeave({ panels: i, force: t })) {
      if (r && window.location.pathname != r) {
        if (!i.panel)
          throw Error("The attribute `href` requires`panel`.");
        window.location.href = `${r}?panel=${i.panel}&view=${i.view}`;
        return;
      }
      this.reset(i);
    }
  }
  reset({ panel: t, view: r = null, value: i = null }) {
    this.panel = t || this.panel, this.view = r || "", this.value = i;
  }
}
class On extends xn {
  constructor({ query: t, ...r }) {
    var i;
    super(r);
    d(this, "showFilters", !1);
    this.showFilters = ((i = this.props) == null ? void 0 : i.showFilters) || !1;
  }
  static reactive(t) {
    const r = super.reactive(t);
    return r.item = y((i) => r.getItem(i)), r;
  }
  /** Current model's repository. */
  get repo() {
    return this.props.repo;
  }
  /** Current model. */
  get model() {
    return this.repo.use;
  }
  /** Query (shortcut to `this.list.query`). **/
  get query() {
    return this.list.query;
  }
  /** Return icon based on props and model **/
  get icon() {
    var t;
    return super.icon || ((t = this.model.meta) == null ? void 0 : t.icon);
  }
  /** Return panel's title based on view and current item. */
  get title() {
    var s, c;
    const { props: t, list: r, panels: i } = this, a = this.repo.use;
    if (a) {
      if ((s = this.view) != null && s.startsWith("list."))
        return D(X.model(a), 3);
      if ((c = this.view) != null && c.startsWith("detail.") && i.value) {
        if (i.value.$title)
          return i.value.$title;
        const o = D(X.model(a));
        return i.value.id ? D("models._.title", { model: o, id: i.value.id }) : D("models._.title.new", { model: o });
      }
    }
    return super.title;
  }
  /**
   * Edit a new item.
   *
   * @param path - path to edit view.
   */
  create(t = ".detail.add") {
    this.panels.show({ panel: this.name, view: t, value: new this.model() });
  }
  /** Called when an item has been created. By default, show edit view. */
  created(t, r = ".detail.edit") {
    this.panels.show({ panel: this.name, view: r, value: t, force: !0 }), this.list.fetch();
  }
  /** Get item from id. */
  getItem(t) {
  }
}
function qn(n = {}) {
  const e = Sn.reactive(n);
  return p("panels", e), e;
}
function Hn(n) {
  const e = le.reactive(n);
  return p("list", e), e;
}
function Gn({ panels: n, query: e, list: t, repos: r, ...i } = {}) {
  n = n ?? j("panels"), r = r ?? j("repos"), e = e ?? _("query", () => new Y(i.props.repo, r)), t = t ?? _("list", () => {
    const { value: s } = Ie(n);
    return le.reactive({ value: s, query: e });
  });
  const a = On.reactive({ panels: n, list: t, ...i });
  return p("panel", a), a;
}
function Zn(n, e = null) {
  const t = new Y(n, e);
  return p("query", t), t;
}
function zn(n, e) {
  return Ye(() => import(n).then((t) => e ? Object.values(t).filter((i) => i.__name == e)[0] : t));
}
export {
  lt as AppContext,
  re as Editor,
  le as List,
  ft as ModelEditor,
  On as ModelPanel,
  xn as Panel,
  Sn as Panels,
  Y as Query,
  I as RObject,
  M as State,
  Xn as States,
  he as assignNonEmpty,
  te as collectAttr,
  R as config,
  An as createApp,
  Mn as createI18n,
  Un as createPinia,
  Tn as createVuetify,
  er as csrfToken,
  zn as defineAsyncComponent,
  dt as editor,
  tr as filterSlots,
  nr as getCookie,
  Me as getCookieList,
  rr as getCsrf,
  ce as i18n,
  Kn as init,
  _ as injectOrProvide,
  J as loadedLocalePaths,
  ir as mapToObject,
  Nn as modelEditor,
  $n as models,
  Wn as query,
  De as reset,
  Vn as setLocale,
  sr as shallowCopy,
  D as t,
  X as tKeys,
  Ln as useAction,
  jn as useAppContext,
  Bn as useI18n,
  Hn as useList,
  Gn as useModelPanel,
  ot as useModels,
  qn as usePanels,
  ct as usePermissions,
  _n as usePermissionsProps,
  Zn as useQuery
};
//# sourceMappingURL=ox.js.map
