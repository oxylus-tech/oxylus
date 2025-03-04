var he = Object.defineProperty;
var ge = (n, e, t) => e in n ? he(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var o = (n, e, t) => ge(n, typeof e != "symbol" ? e + "" : e, t);
import { a as me, R as ee, H as pe, b as ye, c as be, C as we, G as ve, M as ke, d as De, P as Me, e as P, U as A, g as Ae, u as te, f as xe, h as Te, i as _, S as y, j as Se, k as C, l as Oe, m as Pe, n as Ee, o as Re, s as Ce, p as F, r as Fe, q as I } from "./vue-i18n-D10c6QHa.js";
import { x as sr, v as ir, A as ar, t as or, w as cr, y as lr, z as ur } from "./vue-i18n-D10c6QHa.js";
import { reactive as k, provide as g, computed as ne, unref as v, ref as $e, watch as $, nextTick as Ye, createApp as _e, inject as N, toRefs as Ie, defineAsyncComponent as Ne } from "vue";
import Le from "axios";
import * as Ke from "ox/vendor";
import { c as Ve, p as L, m as re, a as je, b as Ue, d as Be, e as qe, f as He, g as We, h as Ge, D as K, i as V, T as j, I as U, L as B, G as Ze, j as ze, k as Je, l as Qe } from "./theme-CVupjJDc.js";
class D {
  /**
   * Create a new reactive instance of the object.
   * This where you can add watchers and computed properties.
   */
  static reactive(e) {
    return k(new this(e));
  }
  constructor(e = null) {
    e && me(this, e);
  }
}
function se(n, e) {
  var t;
  if (typeof e == "string") {
    const r = (t = n.use) == null ? void 0 : t.fields(), s = r && r[e] || null;
    e = s instanceof ee ? s : null;
  }
  return e;
}
function ie(n) {
  return n instanceof pe || n instanceof ye || n instanceof be ? n.foreignKey : null;
}
const Kn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentType: we,
  Group: ve,
  Meta: ke,
  Model: De,
  Permission: Me,
  Permissions: P,
  User: A,
  asRelation: se,
  getSourceKey: ie
}, Symbol.toStringTag, { value: "Module" }));
var Xe = Object.defineProperty, et = (n, e, t) => e in n ? Xe(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, b = (n, e, t) => (et(n, typeof e != "symbol" ? e + "" : e, t), t);
class tt {
  /**
   * Create a new response instance.
   */
  constructor(e, t, r) {
    b(this, "repository"), b(this, "config"), b(this, "response"), b(this, "entities", null), b(this, "isSaved", !1), this.repository = e, this.config = t, this.response = r;
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
var nt = Object.defineProperty, rt = (n, e, t) => e in n ? nt(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, q = (n, e, t) => (rt(n, typeof e != "symbol" ? e + "" : e, t), t);
class st {
  /**
   * Create a new api instance.
   */
  constructor(e) {
    q(this, "repository"), q(this, "config", {
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
    var t, r, s;
    const e = { ...(t = this.repository.config.axiosApi) == null ? void 0 : t.actions, ...(s = (r = this.repository.getModel().$config()) == null ? void 0 : r.axiosApi) == null ? void 0 : s.actions };
    if (e)
      for (const a in e) {
        const i = e[a];
        typeof i == "function" ? this.registerFunctionAction(a, i) : this.registerObjectAction(a, i);
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
    const r = new tt(this.repository, t, e);
    return t.delete !== void 0 ? (await r.delete(), r) : (t.save && await r.save(), r);
  }
}
var it = Object.defineProperty, at = (n, e, t) => e in n ? it(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, O = (n, e, t) => (at(n, typeof e != "symbol" ? e + "" : e, t), t);
class H extends Te {
  constructor() {
    var e, t, r;
    super(...arguments), O(this, "axios", ((t = (e = _) == null ? void 0 : e.axiosApi) == null ? void 0 : t.axios) || null), O(this, "globalApiConfig", ((r = _) == null ? void 0 : r.axiosApi) || {}), O(this, "apiConfig", {});
  }
  api() {
    return ot(this);
  }
  setAxios(e) {
    return this.axios = e, this;
  }
}
function ot(n) {
  return new st(n);
}
function ct(n) {
  const e = Ae();
  return H.useModel = n, te(H, e);
}
function lt(n) {
  return xe((e) => (e.config.axiosApi = n, e));
}
function ut(n, e = !0) {
  const t = {};
  Array.isArray(n) || (n = Object.values(n)), e && !n.includes(A) && n.push(A);
  for (const r of n)
    if (r && r.entity) {
      if (r.entity in t)
        continue;
      te(r), t[r.entity] = ct(r);
    }
  return g("models", n), g("repos", t), { models: n, repos: t };
}
function Vn() {
  return {
    permissions: [String, Function, Object, Array]
  };
}
function ft(n, e, t) {
  const r = e instanceof P ? e : new P(e), s = ne(() => r.can(v(n), v(t)));
  return { permissions: r, allowed: s };
}
class dt {
  static reactive(e) {
    const t = k(new this(e));
    return t.user = ne(() => {
      var r;
      return new A(((r = t.data) == null ? void 0 : r.user) || {});
    }), t;
  }
  constructor(e = {}) {
    Object.assign(this, e), this.state = y.none(), this.showState = !1;
  }
  /**
   * Load data into AppData. If no `value` is provided, read it from
   * source element.
   */
  load(e = void 0) {
    this.dataEl !== void 0 && (e === void 0 && (e = this.readData(this.dataEl)), e.dataEl = this.dataEl, this.data = e, this.panel && this.data.panel && (this.panel.value = e)), this.models !== void 0 && (this.repos = ut(this.models).repos);
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
  const t = dt.reactive(n);
  return e && t.dataEl && t.load(), g("context", t), g("user", t.user), t;
}
class ht {
  constructor(e, t) {
    Object.assign(this, e), this.props = t, this.processing = $e(!1);
    const r = ft(this.user, t.permissions, t.item);
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
function Un(n, e) {
  return new ht(n, e);
}
const T = {
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
function gt(n, e, t) {
  const r = [];
  let s = [];
  const a = ae(n), i = oe(n), l = t ?? T[e.slice(-2).toUpperCase()] ?? 0, c = (a.getDay() - l + 7) % 7, m = (i.getDay() - l + 7) % 7;
  for (let f = 0; f < c; f++) {
    const d = new Date(a);
    d.setDate(d.getDate() - (c - f)), s.push(d);
  }
  for (let f = 1; f <= i.getDate(); f++) {
    const d = new Date(n.getFullYear(), n.getMonth(), f);
    s.push(d), s.length === 7 && (r.push(s), s = []);
  }
  for (let f = 1; f < 7 - m; f++) {
    const d = new Date(i);
    d.setDate(d.getDate() + f), s.push(d);
  }
  return s.length > 0 && r.push(s), r;
}
function mt(n, e, t) {
  const r = t ?? T[e.slice(-2).toUpperCase()] ?? 0, s = new Date(n);
  for (; s.getDay() !== r; )
    s.setDate(s.getDate() - 1);
  return s;
}
function pt(n, e) {
  const t = new Date(n), r = ((T[e.slice(-2).toUpperCase()] ?? 0) + 6) % 7;
  for (; t.getDay() !== r; )
    t.setDate(t.getDate() + 1);
  return t;
}
function ae(n) {
  return new Date(n.getFullYear(), n.getMonth(), 1);
}
function oe(n) {
  return new Date(n.getFullYear(), n.getMonth() + 1, 0);
}
function yt(n) {
  const e = n.split("-").map(Number);
  return new Date(e[0], e[1] - 1, e[2]);
}
const bt = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
function ce(n) {
  if (n == null) return /* @__PURE__ */ new Date();
  if (n instanceof Date) return n;
  if (typeof n == "string") {
    let e;
    if (bt.test(n))
      return yt(n);
    if (e = Date.parse(n), !isNaN(e)) return new Date(e);
  }
  return null;
}
const W = new Date(2e3, 0, 2);
function wt(n, e) {
  const t = e ?? T[n.slice(-2).toUpperCase()] ?? 0;
  return Ve(7).map((r) => {
    const s = new Date(W);
    return s.setDate(W.getDate() + t + r), new Intl.DateTimeFormat(n, {
      weekday: "narrow"
    }).format(s);
  });
}
function vt(n, e, t, r) {
  const s = ce(n) ?? /* @__PURE__ */ new Date(), a = r == null ? void 0 : r[e];
  if (typeof a == "function")
    return a(s, e, t);
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
      const l = s.getDate(), c = new Intl.DateTimeFormat(t, {
        month: "long"
      }).format(s);
      return `${l} ${c}`;
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
      i = a ?? {
        timeZone: "UTC",
        timeZoneName: "short"
      };
  }
  return new Intl.DateTimeFormat(t, i).format(s);
}
function kt(n, e) {
  const t = n.toJsDate(e), r = t.getFullYear(), s = L(String(t.getMonth() + 1), 2, "0"), a = L(String(t.getDate()), 2, "0");
  return `${r}-${s}-${a}`;
}
function Dt(n) {
  const [e, t, r] = n.split("-").map(Number);
  return new Date(e, t - 1, r);
}
function Mt(n, e) {
  const t = new Date(n);
  return t.setMinutes(t.getMinutes() + e), t;
}
function At(n, e) {
  const t = new Date(n);
  return t.setHours(t.getHours() + e), t;
}
function xt(n, e) {
  const t = new Date(n);
  return t.setDate(t.getDate() + e), t;
}
function Tt(n, e) {
  const t = new Date(n);
  return t.setDate(t.getDate() + e * 7), t;
}
function St(n, e) {
  const t = new Date(n);
  return t.setDate(1), t.setMonth(t.getMonth() + e), t;
}
function Ot(n) {
  return n.getFullYear();
}
function Pt(n) {
  return n.getMonth();
}
function Et(n) {
  return n.getDate();
}
function Rt(n) {
  return new Date(n.getFullYear(), n.getMonth() + 1, 1);
}
function Ct(n) {
  return new Date(n.getFullYear(), n.getMonth() - 1, 1);
}
function Ft(n) {
  return n.getHours();
}
function $t(n) {
  return n.getMinutes();
}
function Yt(n) {
  return new Date(n.getFullYear(), 0, 1);
}
function _t(n) {
  return new Date(n.getFullYear(), 11, 31);
}
function It(n, e) {
  return x(n, e[0]) && Kt(n, e[1]);
}
function Nt(n) {
  const e = new Date(n);
  return e instanceof Date && !isNaN(e.getTime());
}
function x(n, e) {
  return n.getTime() > e.getTime();
}
function Lt(n, e) {
  return x(E(n), E(e));
}
function Kt(n, e) {
  return n.getTime() < e.getTime();
}
function G(n, e) {
  return n.getTime() === e.getTime();
}
function Vt(n, e) {
  return n.getDate() === e.getDate() && n.getMonth() === e.getMonth() && n.getFullYear() === e.getFullYear();
}
function jt(n, e) {
  return n.getMonth() === e.getMonth() && n.getFullYear() === e.getFullYear();
}
function Ut(n, e) {
  return n.getFullYear() === e.getFullYear();
}
function Bt(n, e, t) {
  const r = new Date(n), s = new Date(e);
  switch (t) {
    case "years":
      return r.getFullYear() - s.getFullYear();
    case "quarters":
      return Math.floor((r.getMonth() - s.getMonth() + (r.getFullYear() - s.getFullYear()) * 12) / 4);
    case "months":
      return r.getMonth() - s.getMonth() + (r.getFullYear() - s.getFullYear()) * 12;
    case "weeks":
      return Math.floor((r.getTime() - s.getTime()) / (1e3 * 60 * 60 * 24 * 7));
    case "days":
      return Math.floor((r.getTime() - s.getTime()) / (1e3 * 60 * 60 * 24));
    case "hours":
      return Math.floor((r.getTime() - s.getTime()) / (1e3 * 60 * 60));
    case "minutes":
      return Math.floor((r.getTime() - s.getTime()) / (1e3 * 60));
    case "seconds":
      return Math.floor((r.getTime() - s.getTime()) / 1e3);
    default:
      return r.getTime() - s.getTime();
  }
}
function qt(n, e) {
  const t = new Date(n);
  return t.setHours(e), t;
}
function Ht(n, e) {
  const t = new Date(n);
  return t.setMinutes(e), t;
}
function Wt(n, e) {
  const t = new Date(n);
  return t.setMonth(e), t;
}
function Gt(n, e) {
  const t = new Date(n);
  return t.setDate(e), t;
}
function Zt(n, e) {
  const t = new Date(n);
  return t.setFullYear(e), t;
}
function E(n) {
  return new Date(n.getFullYear(), n.getMonth(), n.getDate(), 0, 0, 0, 0);
}
function zt(n) {
  return new Date(n.getFullYear(), n.getMonth(), n.getDate(), 23, 59, 59, 999);
}
class Jt {
  constructor(e) {
    this.locale = e.locale, this.formats = e.formats;
  }
  date(e) {
    return ce(e);
  }
  toJsDate(e) {
    return e;
  }
  toISO(e) {
    return kt(this, e);
  }
  parseISO(e) {
    return Dt(e);
  }
  addMinutes(e, t) {
    return Mt(e, t);
  }
  addHours(e, t) {
    return At(e, t);
  }
  addDays(e, t) {
    return xt(e, t);
  }
  addWeeks(e, t) {
    return Tt(e, t);
  }
  addMonths(e, t) {
    return St(e, t);
  }
  getWeekArray(e, t) {
    return gt(e, this.locale, t ? Number(t) : void 0);
  }
  startOfWeek(e, t) {
    return mt(e, this.locale, t ? Number(t) : void 0);
  }
  endOfWeek(e) {
    return pt(e, this.locale);
  }
  startOfMonth(e) {
    return ae(e);
  }
  endOfMonth(e) {
    return oe(e);
  }
  format(e, t) {
    return vt(e, t, this.locale, this.formats);
  }
  isEqual(e, t) {
    return G(e, t);
  }
  isValid(e) {
    return Nt(e);
  }
  isWithinRange(e, t) {
    return It(e, t);
  }
  isAfter(e, t) {
    return x(e, t);
  }
  isAfterDay(e, t) {
    return Lt(e, t);
  }
  isBefore(e, t) {
    return !x(e, t) && !G(e, t);
  }
  isSameDay(e, t) {
    return Vt(e, t);
  }
  isSameMonth(e, t) {
    return jt(e, t);
  }
  isSameYear(e, t) {
    return Ut(e, t);
  }
  setMinutes(e, t) {
    return Ht(e, t);
  }
  setHours(e, t) {
    return qt(e, t);
  }
  setMonth(e, t) {
    return Wt(e, t);
  }
  setDate(e, t) {
    return Gt(e, t);
  }
  setYear(e, t) {
    return Zt(e, t);
  }
  getDiff(e, t, r) {
    return Bt(e, t, r);
  }
  getWeekdays(e) {
    return wt(this.locale, e ? Number(e) : void 0);
  }
  getYear(e) {
    return Ot(e);
  }
  getMonth(e) {
    return Pt(e);
  }
  getDate(e) {
    return Et(e);
  }
  getNextMonth(e) {
    return Rt(e);
  }
  getPreviousMonth(e) {
    return Ct(e);
  }
  getHours(e) {
    return Ft(e);
  }
  getMinutes(e) {
    return $t(e);
  }
  startOfDay(e) {
    return E(e);
  }
  endOfDay(e) {
    return zt(e);
  }
  startOfYear(e) {
    return Yt(e);
  }
  endOfYear(e) {
    return _t(e);
  }
}
const Qt = Symbol.for("vuetify:date-options"), Z = Symbol.for("vuetify:date-adapter");
function Xt(n, e) {
  const t = re({
    adapter: Jt,
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
    instance: en(t, e)
  };
}
function en(n, e) {
  const t = k(typeof n.adapter == "function" ? new n.adapter({
    locale: n.locale[e.current.value] ?? e.current.value,
    formats: n.formats
  }) : n.adapter);
  return $(e.current, (r) => {
    t.locale = n.locale[r] ?? r ?? t.locale;
  }), t;
}
function le() {
  let n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    blueprint: e,
    ...t
  } = n, r = re(e, t), {
    aliases: s = {},
    components: a = {},
    directives: i = {}
  } = r, l = je(r.defaults), c = Ue(r.display, r.ssr), m = Be(r.theme), f = qe(r.icons), d = He(r.locale), S = Xt(r.date, d), Y = We(r.goTo, d);
  return {
    install: (u) => {
      for (const h in i)
        u.directive(h, i[h]);
      for (const h in a)
        u.component(h, a[h]);
      for (const h in s)
        u.component(h, Ge({
          ...s[h],
          name: h,
          aliasName: s[h].name
        }));
      if (m.install(u), u.provide(K, l), u.provide(V, c), u.provide(j, m), u.provide(U, f), u.provide(B, d), u.provide(Qt, S.options), u.provide(Z, S.instance), u.provide(Ze, Y), ze && r.ssr)
        if (u.$nuxt)
          u.$nuxt.hook("app:suspense:resolve", () => {
            c.update();
          });
        else {
          const {
            mount: h
          } = u;
          u.mount = function() {
            const de = h(...arguments);
            return Ye(() => c.update()), u.mount = h, de;
          };
        }
      Je.reset(), u.mixin({
        computed: {
          $vuetify() {
            return k({
              defaults: p.call(this, K),
              display: p.call(this, V),
              theme: p.call(this, j),
              icons: p.call(this, U),
              locale: p.call(this, B),
              date: p.call(this, Z)
            });
          }
        }
      });
    },
    defaults: l,
    display: c,
    theme: m,
    icons: f,
    locale: d,
    date: S,
    goTo: Y
  };
}
const tn = "3.7.3";
le.version = tn;
function p(n) {
  var r, s;
  const e = this.$, t = ((r = e.parent) == null ? void 0 : r.provides) ?? ((s = e.vnode.appContext) == null ? void 0 : s.provides);
  if (t && n in t)
    return t[n];
}
const nn = {
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
      mdi: Qe
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
}, rn = {
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
}, sn = {
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
}, an = {
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
}, on = {
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
}, cn = {
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
}, ln = {
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
}, un = {
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
}, fn = {
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
}, dn = {
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
}, hn = {
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
}, gn = {
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
}, mn = {
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
}, pn = {
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
}, yn = {
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
}, wn = {
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
}, vn = {
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
}, kn = {
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
}, Dn = {
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
}, Mn = {
  black: "#000000",
  white: "#ffffff",
  transparent: "#ffffff00"
}, z = {
  red: rn,
  pink: sn,
  purple: an,
  deepPurple: on,
  indigo: cn,
  blue: ln,
  lightBlue: un,
  cyan: fn,
  teal: dn,
  green: hn,
  lightGreen: gn,
  lime: mn,
  yellow: pn,
  amber: yn,
  orange: bn,
  deepOrange: wn,
  brown: vn,
  blueGrey: kn,
  grey: Dn,
  shades: Mn
};
function An() {
  const e = (Se("lang", ",") || ["en"]).map(
    (t) => t.toLowerCase().replace(/[_-](\w+)/, "")
  ).find((t) => t in C.locales);
  return Oe({
    legacy: !1,
    fallbackLocale: "en",
    locale: e
  });
}
const ue = An();
function w(...n) {
  return ue.global.t(...n);
}
function Bn(n, e, t) {
  if (!(t in C.locales))
    throw Error("Locale is not provided by config.");
  n.global.locale.value = t, R(n, e, t), document.querySelector("html").setAttribute("lang", t);
}
const J = /* @__PURE__ */ new Set();
function qn({ path: n = "./", fallback: e = !0, ...t } = {}) {
  const r = Pe(t);
  return Q(r, { path: n, fallback: e }), $(() => r.locale, () => Q(r, { path: n, fallback: e })), r;
}
async function R(n, e, t) {
  const r = t.replace(/[_-](\w+)/, "");
  if (e = `${e}locales/${r}.json`, J.has(e))
    return;
  J.add(e);
  const s = await fetch(e).then((a) => a.json());
  n.messages.value[t] = {
    ...n.messages.value[t],
    ...s
  };
}
function Q(n, { path: e = "./", fallback: t = !0 } = {}) {
  e.startsWith("/") || (e = import.meta.resolve(e)), e.endsWith("/") || (e += "/");
  let r = R(n, e, v(n.locale));
  return t && n.fallbackLocale.value && (r = r.catch((s) => R(n, e, v(n.fallbackLocale))).catch((s) => {
    throw Error(
      `Could not load locale ${n.locale.value} nor its fallback ${n.fallbackLocale.value} (path: ${e}). Error: ${s}`
    );
  })), r;
}
const X = {
  model: (n) => `models.${n.entity}`,
  field: (n) => `fields.${n}`
};
function Hn({ App: n = null, el: e = "#app", onLoad: t = !0, ...r } = {}) {
  function s() {
    const a = xn(n, r), i = e ? a.mount(e) : null;
    return document.body.classList.remove("loading"), { app: a, el: e, vm: i };
  }
  return new Promise((a) => {
    if (t)
      return window.addEventListener(
        "load",
        () => a(s())
      );
    a(s());
  });
}
function xn(n, { props: e = {}, vuetify: t = {}, plugins: r = null } = {}) {
  return n = _e(n, e), n.config.globalProperties.window = window, n.use(Tn(t)), n.use(ue), r && r.forEach((s) => n.use(s)), n;
}
function Tn({ components: n = {}, ...e }) {
  return e.components = {
    ...Ke,
    ...n
  }, le({
    blueprint: nn,
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
function Wn({ axiosConfig: n = null, baseURL: e = null } = {}) {
  e || (e = document.body.dataset.apiUrl);
  const t = Ee(), r = Re({});
  return r().use(
    lt({
      axios: Le,
      ...n || C.axiosConfig,
      baseURL: e
    })
  ), Ce(t), t.use(r);
}
class M {
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
  async fetch({ url: e, ids: t = null, repo: r = null, lookup: s = "id__in", params: a = void 0, relations: i = null, ...l } = {}) {
    r ?? (r = this.repo), t && s !== void 0 && (a = { ...a || {} }, a[s] = [...t]);
    const c = await r.api().get(e, { ...l, params: a });
    return i && (c.relations = await this.relations(c.entities, i, { ...l, params: {} })), c;
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
    const s = await this.fetch(r);
    let a = s.response.data[e];
    for (; a; ) {
      const i = await this.fetch({ ...r, url: a });
      if (i.entities && (s.entities = s.entities !== null ? s.entities.concat(i.entities) : i.entities), a = i.response.data[e], t > 0 && t--, !t) break;
    }
    return s;
  }
  /**
   * Fetch related objects for the provided list and field names.
   *
   * @param objs - the objects to get related ids from.
   * @param options.fields - list of field names.
   * @param options.opts - options to pass down to {@link Quey.relation}.
   * @return the resulting entities.
   */
  async relations(e, t, r = {}) {
    var i;
    this._ensureRepos("relations");
    const s = {}, a = (i = this.repo.use) == null ? void 0 : i.fields();
    if (a)
      for (const l of t) {
        const c = a[l];
        if (c instanceof ee)
          s[l] = await this.relation(e, c, r);
        else
          throw Error(`Field ${l} is not a relation`);
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
   * @param options - options to pass down to `all()`.
   */
  async relation(e, t, r = {}) {
    this._ensureRepos("relations");
    const s = se(this.repo, t);
    if (!s)
      throw Error(`No Relation found for field ${t}.`);
    const a = s.related.constructor.entity, i = this.repos[a];
    if (!i)
      throw Error(`No repository "${a}" found.`);
    const l = ie(s);
    if (!l)
      throw Error(`No source ids attributes for ${t}.`);
    const c = F(e, l);
    return new M(i, this.repos).all({ ...r, ids: c, repo: i });
  }
}
function Gn(n, e) {
  return new M(n, e);
}
class fe extends D {
  constructor(t, r = {}) {
    super(t);
    o(this, "state", y.none());
    o(this, "value", {});
    this.state || (this.state = new y()), this.value = {}, this.reset(this.initial);
  }
  static reactive({ initial: t, ...r }) {
    return console.log("reactive editor", t), super.reactive({ initial: v(t), ...r });
  }
  get errors() {
    return this.state.isError && this.state.data || null;
  }
  /**
  * Reset editor editor data to initial.
  * When value is provided, reset initial to this value.
  */
  reset(t = null) {
    t === null ? t = this.initial : this.initial = t, this._reset(t), this.state.none();
  }
  _reset(t) {
    Fe(this.value, t);
  }
  isValid() {
    return this._isValid();
  }
  _isValid() {
    return !0;
  }
  get edited() {
    return Object.keys(this.value).some((t) => this.value[t] != this.initial[t]);
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
  async save(t = null) {
    var s;
    if (this.state.processing(), !this.isValid())
      return this.state.error({
        _: "Some of the input values are invalid"
      });
    t = this.serialize(t ?? this.value);
    const r = await this.send(t);
    return r.isOk ? (this.reset(r.data), (s = this.saved) == null || s.call(this, this.value, this)) : this.state = r, this.state;
  }
  /** Serialize value before sending. */
  serialize(t) {
    return t;
  }
  /** Send value (not implemented, MUST BE in subclasses). */
  send(t) {
    throw "not implemented";
  }
}
class Sn extends fe {
  constructor({ repo: e, url: t, ...r }) {
    var s, a;
    t = t || ((a = (s = e.use) == null ? void 0 : s.meta) == null ? void 0 : a.url), super({ url: t, repo: e, ...r }), window.repo = e;
  }
  get fields() {
    return this._fields || (this._fields = this.repo && Object.keys(this.repo.use.fields()) || []), this._fields;
  }
  _reset(e) {
    this.value = k(new this.initial.constructor()), this.fields.reduce((t, r) => (t[r] = e[r], t), this.value);
  }
  get edited() {
    return this.fields.some((e) => this.value[e] != this.initial[e]);
  }
  serialize(e) {
    return e.$toJson(null, { relations: !1 });
  }
  send(e) {
    let [t, r] = ["post", this.url];
    return e.id && (r = `${r}${e.id}/`, t = "put"), this.repo.api()[t](r, e).then(
      (s) => y.ok(s.entities[0]),
      (s) => y.error(s.response.data)
    );
  }
}
class On extends D {
  constructor() {
    super(...arguments);
    o(this, "state", y.none());
    o(this, "filters", null);
  }
  /** The repository of contained items. */
  get repo() {
    return this.query.repo;
  }
  /** The model of contained items. */
  get model() {
    return this.repo.use;
  }
  /** Return orm's query to object. This will includes declared {@link List.relations}.
   *
   *   @param ids - optional id lookup
   *   @param first - if true, return the first item
   *   @return orm's query
   */
  queryset(t = null, r = !1) {
    let s = this.repo.query();
    if (this.relations)
      for (const a of this.relations)
        s = s.with(a);
    return t ? s.whereId(t) : s;
  }
  /**
   * Fetch model instance from the server and select them.
   *
   * Calling this method updates state to:
   * - `PROCESSING`: request is being made;
   * - `NONE`: request has been done without error;
   * - `ERROR`: if an error happened;
   *
   * Flowchart:
   * - {@link ModelController.fetch}
   * - {@link ModelController.handleResponse}
   */
  async load(t) {
    this.state.processing();
    let r = null;
    try {
      r = await this.fetch(t), r = await this.handleResponse(t, r);
    } catch (s) {
      this.state.error(s);
    }
    return this.state.isError || this.state.none(), r;
  }
  /** Fetch model instance from the server.
   *
   * Flowchart:
   * - {@link ModelController.getQueryParams}
   * - {@link Query.fetch}
   */
  async fetch(t) {
    const r = this.getQueryOptions(t);
    return await this.query.fetch(r);
  }
  /** Handle response from the {@link ModelContainer.fetch}'s request. */
  async handleResponse(t, r) {
    return r;
  }
  /** Get {@link Query.fetch} options. */
  getQueryOptions({ filters: t = null, ...r }) {
    var s;
    return !r.relations && this.relations && (r.relations = this.relations), !r.dataKey && this.dataKey && (r.dataKey = this.dataKey), !r.url && this.url && (r.url = this.url || ((s = this.model.meta) == null ? void 0 : s.url)), t && Object.assign(this.filters, t), this.filters && (r.params = { ...this.filters, ...r.params ?? [] }), r;
  }
}
class Zn extends On {
  constructor() {
    super(...arguments);
    o(this, "items", []);
    o(this, "nextUrl", null);
    o(this, "prevUrl", null);
    o(this, "count", null);
    o(this, "dataKey", "results");
    o(this, "nextKey", "next");
    o(this, "prevKey", "previous");
    o(this, "countKey", "count");
  }
  /** Get items count. */
  get length() {
    return this.items.length;
  }
  get(t) {
    return t < this.items.length ? this.items[t] : null;
  }
  /** Get item by id */
  find(t) {
    return this.items.find((r) => r.id == t);
  }
  /** Get item index by id */
  findIndex(t) {
    return this.items.findIndex((r) => r.id == t);
  }
  /**
   * Get item next to provided one at the specified direction.
   *
   * @param item - reference item
   * @param step - increment or decrement item index by this value.
   * @return the target item or null if not found.
   */
  getSibling(t, r) {
    const s = this.findIndex(t.id), a = s > 0 ? s + r : -1;
    return a > 0 ? this.get(a) : null;
  }
  /**
   * Fetch next items from API, override `url` using {@link ModelList.nextUrl}.
   */
  async loadNext(t) {
    return await this.load({ ...t, url: this.nextUrl });
  }
  /**
   * Fetch previous items from API, override `url` using {@link ModelList.prevUrl}.
   */
  async loadPrev(t) {
    return await this.load({ ...t, url: this.prevUrl });
  }
  /** Fetch items from API (using self's {@link Query.fetch}). */
  async handleResponse({ append: t = !1, ...r }, s) {
    if (s = await super.handleResponse(r, s), !this.state.isError) {
      const a = [...F(s.entities, "id")], i = this.queryset(a).get();
      this.items = t ? this.items.concat(i) : i, this.nextUrl = s.response.data[this.nextKey] || null, this.prevUrl = s.response.data[this.prevKey] || null, this.count = s.response.data[this.countKey] || this.items.length;
    }
    return s;
  }
}
class Pn extends D {
  constructor() {
    super(...arguments);
    /**
     * Translation key for message displayed on `confirm()` to leave unsaved
     * changes.
     */
    o(this, "confirmTKey", "panel.confirm");
  }
  /** Panel name (based on props) **/
  get name() {
    var t;
    return ((t = this.props) == null ? void 0 : t.name) || "";
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
    return r.watcher = $(() => r.panels.panel, (s) => r.onChange(s)), r;
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
  onLeave() {
    if (!this.edited)
      return !0;
    const t = w(this.confirmTKey);
    return confirm(t);
  }
  /** Handle panels' panel change. */
  onChange(t) {
    var r;
    t == this.name && (this.panels.current != this && (this.panels.current = this), this.panels.view || (this.panels.view = (r = this.props) == null ? void 0 : r.index));
  }
}
class En extends Pn {
  constructor(t) {
    var r;
    super(t);
    o(this, "showFilters", !1);
    this.showFilters = ((r = this.props) == null ? void 0 : r.showFilters) || !1;
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
    var i, l;
    const { props: t, list: r, panels: s } = this, a = this.repo.use;
    if (a) {
      if ((i = this.view) != null && i.startsWith("list."))
        return w(X.model(a), 3);
      if ((l = this.view) != null && l.startsWith("detail.") && s.value) {
        if (s.value.$title)
          return s.value.$title;
        const c = w(X.model(a));
        return s.value.id ? w("models._.title", { model: c, id: s.value.id }) : w("models._.title.new", { model: c });
      }
    }
    return super.title;
  }
  /**
   * Edit a new item.
   *
   * @param view - edit view.
   */
  create(t = ".detail.add") {
    this.panels.show({ panel: this.name, view: t, value: new this.model() });
  }
  /** Called when an item has been created. By default, show edit view. */
  created(t, r = ".detail.edit") {
    this.list.load(), this.panels.show({ panel: this.name, view: r, value: t, force: !0 });
  }
}
class Rn extends D {
  constructor() {
    super(...arguments);
    o(this, "panel", "");
    o(this, "view", "");
    o(this, "value", null);
    o(this, "current", null);
  }
  static readPath(t) {
    if (!t)
      return { panel: "", view: "" };
    const r = t.indexOf(".");
    return r < 0 ? { panel: t, view: "" } : { panel: t.substring(0, r), view: t.substring(r + 1) };
  }
  show({ force: t = !1, href: r = null, ...s }) {
    if (t || !this.current || this.current.onLeave()) {
      if (r && window.location.pathname != r) {
        if (!s.panel)
          throw Error("The attribute `href` requires`panel`.");
        window.location.href = `${r}?panel=${s.panel}&view=${s.view}`;
        return;
      }
      this.reset(s);
    }
  }
  reset({ panel: t, view: r = null, value: s = null }) {
    this.panel = t || this.panel, this.view = r || "", this.value = s;
  }
}
class Cn extends D {
  constructor() {
    super(...arguments);
    o(this, "nextUrl", null);
    o(this, "prevUrl", null);
    o(this, "count", null);
    o(this, "ids", []);
    o(this, "dataKey", "results");
    o(this, "nextKey", "next");
    o(this, "prevKey", "previous");
    o(this, "countKey", "count");
  }
  /** Get items count. */
  get length() {
    return this.ids.length;
  }
  /**
   * Return list items (fetched from repository)
   * @return an array of items.
   */
  get items() {
    return this.queryset(this.ids).get();
  }
  indexOf(t) {
    return this.ids.indexOf(t);
  }
  /** Fetch items from API (using self's {@link Query.fetch}). */
  async handleResponse({ append: t = !1, ...r }, s) {
    if (s = await super.handleResponse(r, s), this.state.isError)
      return s;
    const a = [...F(result.entities, "id")];
    return this.ids = t ? this.ids.concat(a) : a, this.nextUrl = result.response.data[this.nextKey] || null, this.prevUrl = result.response.data[this.prevKey] || null, this.count = result.response.data[this.countKey] || this.ids.length, this.state.none(), result;
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
function zn(n = {}) {
  const e = Rn.reactive(n);
  return g("panels", e), e;
}
function Jn(n) {
  const e = Cn.reactive(n);
  return g("list", e), e;
}
function Qn({ panels: n, query: e, list: t, repos: r, ...s } = {}) {
  n = n ?? N("panels"), r = r ?? N("repos"), e = e ?? I("query", () => new M(s.props.repo, r)), t = t ?? I("list", () => {
    const { value: i } = Ie(n);
    return SelectList.reactive({ index: i, query: e });
  });
  const a = En.reactive({ panels: n, list: t, ...s });
  return g("panel", a), g("item", computed(() => a.list.item)), a;
}
function Xn(n, e = null) {
  const t = new M(n, e);
  return g("query", t), t;
}
function Fn({ editorClass: n = fe, emits: e = null, panel: t = null, ...r }) {
  e && (r.saved ?? (r.saved = (a, i) => e("saved", a, i)));
  const s = n.reactive(r);
  return t && watch(() => s.edited, (a) => t.setEdition(s.name, a)), s;
}
function er(n) {
  return Fn({ ...n, editorClass: Sn });
}
function tr(n, e) {
  return Ne(() => import(n).then((t) => e ? Object.values(t).filter((s) => s.__name == e)[0] : t));
}
export {
  dt as AppContext,
  fe as Editor,
  Cn as List,
  On as ModelController,
  Sn as ModelEditor,
  Zn as ModelList,
  En as ModelPanel,
  Pn as Panel,
  Rn as Panels,
  M as Query,
  D as RObject,
  y as State,
  sr as States,
  me as assignNonEmpty,
  F as collectAttr,
  C as config,
  xn as createApp,
  An as createI18n,
  Wn as createPinia,
  Tn as createVuetify,
  ir as csrfToken,
  tr as defineAsyncComponent,
  ar as filterSlots,
  or as getCookie,
  Se as getCookieList,
  cr as getCsrf,
  ue as i18n,
  Hn as init,
  I as injectOrProvide,
  J as loadedLocalePaths,
  lr as mapToObject,
  Kn as models,
  Gn as query,
  Fe as reset,
  Bn as setLocale,
  ur as shallowCopy,
  w as t,
  X as tKeys,
  Un as useAction,
  jn as useAppContext,
  Fn as useEditor,
  qn as useI18n,
  Jn as useList,
  er as useModelEditor,
  Qn as useModelPanel,
  ut as useModels,
  zn as usePanels,
  ft as usePermissions,
  Vn as usePermissionsProps,
  Xn as useQuery
};
//# sourceMappingURL=ox.js.map
