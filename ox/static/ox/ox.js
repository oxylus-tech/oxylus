var ue = Object.defineProperty;
var fe = (n, t, e) => t in n ? ue(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var o = (n, t, e) => fe(n, typeof t != "symbol" ? t + "" : t, e);
import { a as de, C as he, G as ge, M as me, b as pe, P as be, c as P, U as x, g as ye, u as ee, d as we, R as ve, e as I, S as y, f as ke, h as C, i as De, j as Me, k as Ae, l as xe, s as Te, m as Se, n as F, r as Oe, o as _ } from "./vue-i18n-DJtD-m_6.js";
import { v as Xn, q as er, y as tr, p as nr, t as rr, w as sr, x as ir } from "./vue-i18n-DJtD-m_6.js";
import { reactive as D, provide as p, computed as te, unref as k, ref as Pe, watch as $, nextTick as Ee, createApp as Re, inject as L, toRefs as Ce, defineAsyncComponent as Fe } from "vue";
import $e from "axios";
import * as Ye from "ox/vendor";
import { c as Ie, p as N, m as ne, a as _e, b as Le, d as Ne, e as Ke, f as Ve, g as je, h as Ue, D as K, i as V, T as j, I as U, L as B, G as Be, j as qe, k as We, l as He } from "./theme-CVupjJDc.js";
class M {
  /**
   * Create a new reactive instance of the object.
   * This where you can add watchers and computed properties.
   */
  static reactive(t) {
    return D(new this(t));
  }
  constructor(t = null) {
    t && de(this, t);
  }
}
const Yn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentType: he,
  Group: ge,
  Meta: me,
  Model: pe,
  Permission: be,
  Permissions: P,
  User: x
}, Symbol.toStringTag, { value: "Module" }));
var Ge = Object.defineProperty, Ze = (n, t, e) => t in n ? Ge(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e, w = (n, t, e) => (Ze(n, typeof t != "symbol" ? t + "" : t, e), e);
class ze {
  /**
   * Create a new response instance.
   */
  constructor(t, e, r) {
    w(this, "repository"), w(this, "config"), w(this, "response"), w(this, "entities", null), w(this, "isSaved", !1), this.repository = t, this.config = e, this.response = r;
  }
  /**
   * Save response data to the store.
   */
  async save() {
    const t = this.getDataFromResponse();
    if (!this.validateData(t)) {
      console.warn(
        "[Pinia ORM Axios] The response data could not be saved to the store because it is not an object or an array. You might want to use `dataTransformer` option to handle non-array/object response before saving it to the store."
      );
      return;
    }
    let e = this.config.persistBy || "save";
    this.validatePersistAction(e) || (console.warn(
      '[Pinia ORM Axios] The "persistBy" option configured is not a recognized value. Response data will be persisted by the default `save` method.'
    ), e = "save");
    const r = await this.repository[e](t);
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
  validateData(t) {
    return t !== null && typeof t == "object";
  }
  /**
   * Validate the given string as to ensure it correlates with the available
   * Pinia ORM persist methods.
   */
  validatePersistAction(t) {
    return ["save", "insert"].includes(t);
  }
}
var Je = Object.defineProperty, Qe = (n, t, e) => t in n ? Je(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e, q = (n, t, e) => (Qe(n, typeof t != "symbol" ? t + "" : t, e), e);
class Xe {
  /**
   * Create a new api instance.
   */
  constructor(t) {
    q(this, "repository"), q(this, "config", {
      save: !0
    }), this.repository = t, this.registerActions();
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
    var e, r, s;
    const t = { ...(e = this.repository.config.axiosApi) == null ? void 0 : e.actions, ...(s = (r = this.repository.getModel().$config()) == null ? void 0 : r.axiosApi) == null ? void 0 : s.actions };
    if (t)
      for (const a in t) {
        const i = t[a];
        typeof i == "function" ? this.registerFunctionAction(a, i) : this.registerObjectAction(a, i);
      }
  }
  /**
   * Register the given object action.
   */
  registerObjectAction(t, e) {
    this[t] = (r) => this.request({ ...e, ...r });
  }
  /**
   * Register the given function action.
   */
  registerFunctionAction(t, e) {
    this[t] = e.bind(this);
  }
  /**
   * Perform a get request.
   */
  get(t, e = {}) {
    return this.request({ method: "get", url: t, ...e });
  }
  /**
   * Perform a post request.
   */
  post(t, e = {}, r = {}) {
    return this.request({ method: "post", url: t, data: e, ...r });
  }
  /**
   * Perform a put request.
   */
  put(t, e = {}, r = {}) {
    return this.request({ method: "put", url: t, data: e, ...r });
  }
  /**
   * Perform a patch request.
   */
  patch(t, e = {}, r = {}) {
    return this.request({ method: "patch", url: t, data: e, ...r });
  }
  /**
   * Perform a delete request.
   */
  delete(t, e = {}) {
    return this.request({ method: "delete", url: t, ...e });
  }
  /**
   * Perform an api request.
   */
  async request(t) {
    const e = this.createConfig(t), r = await this.axios.request(e);
    return this.createResponse(r, e);
  }
  /**
   * Create a new config by merging the global config, the repository config,
   * and the given config.
   */
  createConfig(t) {
    return {
      ...this.config,
      ...this.repository.globalApiConfig,
      ...this.repository.apiConfig,
      ...t
    };
  }
  /**
   * Create a new response instance by applying a few initialization processes.
   * For example, it saves response data if `save` option id set to `true`.
   */
  async createResponse(t, e) {
    const r = new ze(this.repository, e, t);
    return e.delete !== void 0 ? (await r.delete(), r) : (e.save && await r.save(), r);
  }
}
var et = Object.defineProperty, tt = (n, t, e) => t in n ? et(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e, O = (n, t, e) => (tt(n, typeof t != "symbol" ? t + "" : t, e), e);
class W extends ve {
  constructor() {
    var t, e, r;
    super(...arguments), O(this, "axios", ((e = (t = I) == null ? void 0 : t.axiosApi) == null ? void 0 : e.axios) || null), O(this, "globalApiConfig", ((r = I) == null ? void 0 : r.axiosApi) || {}), O(this, "apiConfig", {});
  }
  api() {
    return nt(this);
  }
  setAxios(t) {
    return this.axios = t, this;
  }
}
function nt(n) {
  return new Xe(n);
}
function rt(n) {
  const t = ye();
  return W.useModel = n, ee(W, t);
}
function st(n) {
  return we((t) => (t.config.axiosApi = n, t));
}
function it(n, t = !0) {
  const e = {};
  Array.isArray(n) || (n = Object.values(n)), t && !n.includes(x) && n.push(x);
  for (const r of n)
    if (r && r.entity) {
      if (r.entity in e)
        continue;
      ee(r), e[r.entity] = rt(r);
    }
  return p("models", n), p("repos", e), { models: n, repos: e };
}
function In() {
  return {
    permissions: [String, Function, Object, Array]
  };
}
function at(n, t, e) {
  const r = t instanceof P ? t : new P(t), s = te(() => r.can(k(n), k(e)));
  return { permissions: r, allowed: s };
}
class ot {
  static reactive(t) {
    const e = D(new this(t));
    return e.user = te(() => {
      var r;
      return new x(((r = e.data) == null ? void 0 : r.user) || {});
    }), e;
  }
  constructor(t = {}) {
    Object.assign(this, t), this.state = y.none(), this.showState = !1;
  }
  /**
   * Load data into AppData. If no `value` is provided, read it from
   * source element.
   */
  load(t = void 0) {
    this.dataEl !== void 0 && (t === void 0 && (t = this.readData(this.dataEl)), t.dataEl = this.dataEl, this.data = t, this.panel && this.data.panel && (this.panel.value = t)), this.models !== void 0 && (this.repos = it(this.models).repos);
  }
  /**
   * Read data from the context of provided source element.
   * @param {String} el - id of the DOM element.
   * @return {Object} read data
   */
  readData(t) {
    const e = document.getElementById(t);
    if (!e)
      throw "Element {elementId} not found";
    return e.innerText ? JSON.parse(e.innerText) : {};
  }
}
function _n(n, t = !0) {
  const e = ot.reactive(n);
  return t && e.dataEl && e.load(), p("context", e), p("user", e.user), e;
}
class ct {
  constructor(t, e) {
    Object.assign(this, t), this.props = e, this.processing = Pe(!1);
    const r = at(this.user, e.permissions, e.item);
    this.permissions = r.permissions, this.allowed = r.allowed;
  }
  /**
   * Execute the action.
   */
  async run(...t) {
    if (this.props.confirm && !confirm(this.props.confirm))
      return;
    if (!this.allowed.value)
      throw Error("You are not allowed to execute this action");
    this.processing.value = !0;
    let e = this.props.run(this.user, this.props.item, ...t);
    return e instanceof Promise && (e = await e), this.processing.value = !1, this.emits && this.emits("completed", this.props.item, ...t), e;
  }
}
function Ln(n, t) {
  return new ct(n, t);
}
const S = {
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
function lt(n, t, e) {
  const r = [];
  let s = [];
  const a = re(n), i = se(n), l = e ?? S[t.slice(-2).toUpperCase()] ?? 0, c = (a.getDay() - l + 7) % 7, g = (i.getDay() - l + 7) % 7;
  for (let u = 0; u < c; u++) {
    const d = new Date(a);
    d.setDate(d.getDate() - (c - u)), s.push(d);
  }
  for (let u = 1; u <= i.getDate(); u++) {
    const d = new Date(n.getFullYear(), n.getMonth(), u);
    s.push(d), s.length === 7 && (r.push(s), s = []);
  }
  for (let u = 1; u < 7 - g; u++) {
    const d = new Date(i);
    d.setDate(d.getDate() + u), s.push(d);
  }
  return s.length > 0 && r.push(s), r;
}
function ut(n, t, e) {
  const r = e ?? S[t.slice(-2).toUpperCase()] ?? 0, s = new Date(n);
  for (; s.getDay() !== r; )
    s.setDate(s.getDate() - 1);
  return s;
}
function ft(n, t) {
  const e = new Date(n), r = ((S[t.slice(-2).toUpperCase()] ?? 0) + 6) % 7;
  for (; e.getDay() !== r; )
    e.setDate(e.getDate() + 1);
  return e;
}
function re(n) {
  return new Date(n.getFullYear(), n.getMonth(), 1);
}
function se(n) {
  return new Date(n.getFullYear(), n.getMonth() + 1, 0);
}
function dt(n) {
  const t = n.split("-").map(Number);
  return new Date(t[0], t[1] - 1, t[2]);
}
const ht = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
function ie(n) {
  if (n == null) return /* @__PURE__ */ new Date();
  if (n instanceof Date) return n;
  if (typeof n == "string") {
    let t;
    if (ht.test(n))
      return dt(n);
    if (t = Date.parse(n), !isNaN(t)) return new Date(t);
  }
  return null;
}
const H = new Date(2e3, 0, 2);
function gt(n, t) {
  const e = t ?? S[n.slice(-2).toUpperCase()] ?? 0;
  return Ie(7).map((r) => {
    const s = new Date(H);
    return s.setDate(H.getDate() + e + r), new Intl.DateTimeFormat(n, {
      weekday: "narrow"
    }).format(s);
  });
}
function mt(n, t, e, r) {
  const s = ie(n) ?? /* @__PURE__ */ new Date(), a = r == null ? void 0 : r[t];
  if (typeof a == "function")
    return a(s, t, e);
  let i = {};
  switch (t) {
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
      const l = s.getDate(), c = new Intl.DateTimeFormat(e, {
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
      return new Intl.NumberFormat(e).format(s.getDate());
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
  return new Intl.DateTimeFormat(e, i).format(s);
}
function pt(n, t) {
  const e = n.toJsDate(t), r = e.getFullYear(), s = N(String(e.getMonth() + 1), 2, "0"), a = N(String(e.getDate()), 2, "0");
  return `${r}-${s}-${a}`;
}
function bt(n) {
  const [t, e, r] = n.split("-").map(Number);
  return new Date(t, e - 1, r);
}
function yt(n, t) {
  const e = new Date(n);
  return e.setMinutes(e.getMinutes() + t), e;
}
function wt(n, t) {
  const e = new Date(n);
  return e.setHours(e.getHours() + t), e;
}
function vt(n, t) {
  const e = new Date(n);
  return e.setDate(e.getDate() + t), e;
}
function kt(n, t) {
  const e = new Date(n);
  return e.setDate(e.getDate() + t * 7), e;
}
function Dt(n, t) {
  const e = new Date(n);
  return e.setDate(1), e.setMonth(e.getMonth() + t), e;
}
function Mt(n) {
  return n.getFullYear();
}
function At(n) {
  return n.getMonth();
}
function xt(n) {
  return n.getDate();
}
function Tt(n) {
  return new Date(n.getFullYear(), n.getMonth() + 1, 1);
}
function St(n) {
  return new Date(n.getFullYear(), n.getMonth() - 1, 1);
}
function Ot(n) {
  return n.getHours();
}
function Pt(n) {
  return n.getMinutes();
}
function Et(n) {
  return new Date(n.getFullYear(), 0, 1);
}
function Rt(n) {
  return new Date(n.getFullYear(), 11, 31);
}
function Ct(n, t) {
  return T(n, t[0]) && Yt(n, t[1]);
}
function Ft(n) {
  const t = new Date(n);
  return t instanceof Date && !isNaN(t.getTime());
}
function T(n, t) {
  return n.getTime() > t.getTime();
}
function $t(n, t) {
  return T(E(n), E(t));
}
function Yt(n, t) {
  return n.getTime() < t.getTime();
}
function G(n, t) {
  return n.getTime() === t.getTime();
}
function It(n, t) {
  return n.getDate() === t.getDate() && n.getMonth() === t.getMonth() && n.getFullYear() === t.getFullYear();
}
function _t(n, t) {
  return n.getMonth() === t.getMonth() && n.getFullYear() === t.getFullYear();
}
function Lt(n, t) {
  return n.getFullYear() === t.getFullYear();
}
function Nt(n, t, e) {
  const r = new Date(n), s = new Date(t);
  switch (e) {
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
function Kt(n, t) {
  const e = new Date(n);
  return e.setHours(t), e;
}
function Vt(n, t) {
  const e = new Date(n);
  return e.setMinutes(t), e;
}
function jt(n, t) {
  const e = new Date(n);
  return e.setMonth(t), e;
}
function Ut(n, t) {
  const e = new Date(n);
  return e.setDate(t), e;
}
function Bt(n, t) {
  const e = new Date(n);
  return e.setFullYear(t), e;
}
function E(n) {
  return new Date(n.getFullYear(), n.getMonth(), n.getDate(), 0, 0, 0, 0);
}
function qt(n) {
  return new Date(n.getFullYear(), n.getMonth(), n.getDate(), 23, 59, 59, 999);
}
class Wt {
  constructor(t) {
    this.locale = t.locale, this.formats = t.formats;
  }
  date(t) {
    return ie(t);
  }
  toJsDate(t) {
    return t;
  }
  toISO(t) {
    return pt(this, t);
  }
  parseISO(t) {
    return bt(t);
  }
  addMinutes(t, e) {
    return yt(t, e);
  }
  addHours(t, e) {
    return wt(t, e);
  }
  addDays(t, e) {
    return vt(t, e);
  }
  addWeeks(t, e) {
    return kt(t, e);
  }
  addMonths(t, e) {
    return Dt(t, e);
  }
  getWeekArray(t, e) {
    return lt(t, this.locale, e ? Number(e) : void 0);
  }
  startOfWeek(t, e) {
    return ut(t, this.locale, e ? Number(e) : void 0);
  }
  endOfWeek(t) {
    return ft(t, this.locale);
  }
  startOfMonth(t) {
    return re(t);
  }
  endOfMonth(t) {
    return se(t);
  }
  format(t, e) {
    return mt(t, e, this.locale, this.formats);
  }
  isEqual(t, e) {
    return G(t, e);
  }
  isValid(t) {
    return Ft(t);
  }
  isWithinRange(t, e) {
    return Ct(t, e);
  }
  isAfter(t, e) {
    return T(t, e);
  }
  isAfterDay(t, e) {
    return $t(t, e);
  }
  isBefore(t, e) {
    return !T(t, e) && !G(t, e);
  }
  isSameDay(t, e) {
    return It(t, e);
  }
  isSameMonth(t, e) {
    return _t(t, e);
  }
  isSameYear(t, e) {
    return Lt(t, e);
  }
  setMinutes(t, e) {
    return Vt(t, e);
  }
  setHours(t, e) {
    return Kt(t, e);
  }
  setMonth(t, e) {
    return jt(t, e);
  }
  setDate(t, e) {
    return Ut(t, e);
  }
  setYear(t, e) {
    return Bt(t, e);
  }
  getDiff(t, e, r) {
    return Nt(t, e, r);
  }
  getWeekdays(t) {
    return gt(this.locale, t ? Number(t) : void 0);
  }
  getYear(t) {
    return Mt(t);
  }
  getMonth(t) {
    return At(t);
  }
  getDate(t) {
    return xt(t);
  }
  getNextMonth(t) {
    return Tt(t);
  }
  getPreviousMonth(t) {
    return St(t);
  }
  getHours(t) {
    return Ot(t);
  }
  getMinutes(t) {
    return Pt(t);
  }
  startOfDay(t) {
    return E(t);
  }
  endOfDay(t) {
    return qt(t);
  }
  startOfYear(t) {
    return Et(t);
  }
  endOfYear(t) {
    return Rt(t);
  }
}
const Ht = Symbol.for("vuetify:date-options"), Z = Symbol.for("vuetify:date-adapter");
function Gt(n, t) {
  const e = ne({
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
  }, n);
  return {
    options: e,
    instance: Zt(e, t)
  };
}
function Zt(n, t) {
  const e = D(typeof n.adapter == "function" ? new n.adapter({
    locale: n.locale[t.current.value] ?? t.current.value,
    formats: n.formats
  }) : n.adapter);
  return $(t.current, (r) => {
    e.locale = n.locale[r] ?? r ?? e.locale;
  }), e;
}
function ae() {
  let n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    blueprint: t,
    ...e
  } = n, r = ne(t, e), {
    aliases: s = {},
    components: a = {},
    directives: i = {}
  } = r, l = _e(r.defaults), c = Le(r.display, r.ssr), g = Ne(r.theme), u = Ke(r.icons), d = Ve(r.locale), m = Gt(r.date, d), A = je(r.goTo, d);
  return {
    install: (f) => {
      for (const h in i)
        f.directive(h, i[h]);
      for (const h in a)
        f.component(h, a[h]);
      for (const h in s)
        f.component(h, Ue({
          ...s[h],
          name: h,
          aliasName: s[h].name
        }));
      if (g.install(f), f.provide(K, l), f.provide(V, c), f.provide(j, g), f.provide(U, u), f.provide(B, d), f.provide(Ht, m.options), f.provide(Z, m.instance), f.provide(Be, A), qe && r.ssr)
        if (f.$nuxt)
          f.$nuxt.hook("app:suspense:resolve", () => {
            c.update();
          });
        else {
          const {
            mount: h
          } = f;
          f.mount = function() {
            const le = h(...arguments);
            return Ee(() => c.update()), f.mount = h, le;
          };
        }
      We.reset(), f.mixin({
        computed: {
          $vuetify() {
            return D({
              defaults: b.call(this, K),
              display: b.call(this, V),
              theme: b.call(this, j),
              icons: b.call(this, U),
              locale: b.call(this, B),
              date: b.call(this, Z)
            });
          }
        }
      });
    },
    defaults: l,
    display: c,
    theme: g,
    icons: u,
    locale: d,
    date: m,
    goTo: A
  };
}
const zt = "3.7.3";
ae.version = zt;
function b(n) {
  var r, s;
  const t = this.$, e = ((r = t.parent) == null ? void 0 : r.provides) ?? ((s = t.vnode.appContext) == null ? void 0 : s.provides);
  if (e && n in e)
    return e[n];
}
const Jt = {
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
}, Qt = {
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
}, Xt = {
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
}, en = {
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
}, tn = {
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
}, nn = {
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
}, rn = {
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
}, sn = {
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
}, an = {
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
}, on = {
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
}, cn = {
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
}, ln = {
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
}, un = {
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
}, fn = {
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
}, dn = {
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
}, hn = {
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
}, gn = {
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
}, mn = {
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
}, pn = {
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
}, bn = {
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
}, yn = {
  black: "#000000",
  white: "#ffffff",
  transparent: "#ffffff00"
}, z = {
  red: Qt,
  pink: Xt,
  purple: en,
  deepPurple: tn,
  indigo: nn,
  blue: rn,
  lightBlue: sn,
  cyan: an,
  teal: on,
  green: cn,
  lightGreen: ln,
  lime: un,
  yellow: fn,
  amber: dn,
  orange: hn,
  deepOrange: gn,
  brown: mn,
  blueGrey: pn,
  grey: bn,
  shades: yn
};
function wn() {
  const t = (ke("lang", ",") || ["en"]).map(
    (e) => e.toLowerCase().replace(/[_-](\w+)/, "")
  ).find((e) => e in C.locales);
  return De({
    legacy: !1,
    fallbackLocale: "en",
    locale: t
  });
}
const oe = wn();
function v(...n) {
  return oe.global.t(...n);
}
function Nn(n, t, e) {
  if (!(e in C.locales))
    throw Error("Locale is not provided by config.");
  n.global.locale.value = e, R(n, t, e), document.querySelector("html").setAttribute("lang", e);
}
const J = /* @__PURE__ */ new Set();
function Kn({ path: n = "./", fallback: t = !0, ...e } = {}) {
  const r = Me(e);
  return Q(r, { path: n, fallback: t }), $(() => r.locale, () => Q(r, { path: n, fallback: t })), r;
}
async function R(n, t, e) {
  const r = e.replace(/[_-](\w+)/, "");
  if (t = `${t}locales/${r}.json`, J.has(t))
    return;
  J.add(t);
  const s = await fetch(t).then((a) => a.json());
  n.messages.value[e] = {
    ...n.messages.value[e],
    ...s
  };
}
function Q(n, { path: t = "./", fallback: e = !0 } = {}) {
  t.startsWith("/") || (t = import.meta.resolve(t)), t.endsWith("/") || (t += "/");
  let r = R(n, t, k(n.locale));
  return e && n.fallbackLocale.value && (r = r.catch((s) => R(n, t, k(n.fallbackLocale))).catch((s) => {
    throw Error(
      `Could not load locale ${n.locale.value} nor its fallback ${n.fallbackLocale.value} (path: ${t}). Error: ${s}`
    );
  })), r;
}
const X = {
  model: (n) => `models.${n.entity}`,
  field: (n) => `fields.${n}`
};
function Vn({ App: n = null, el: t = "#app", onLoad: e = !0, ...r } = {}) {
  function s() {
    const a = vn(n, r), i = t ? a.mount(t) : null;
    return document.body.classList.remove("loading"), { app: a, el: t, vm: i };
  }
  return new Promise((a) => {
    if (e)
      return window.addEventListener(
        "load",
        () => a(s())
      );
    a(s());
  });
}
function vn(n, { props: t = {}, vuetify: e = {}, plugins: r = null } = {}) {
  return n = Re(n, t), n.config.globalProperties.window = window, n.use(kn(e)), n.use(oe), r && r.forEach((s) => n.use(s)), n;
}
function kn({ components: n = {}, ...t }) {
  return t.components = {
    ...Ye,
    ...n
  }, ae({
    blueprint: Jt,
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
    ...t
  });
}
function jn({ axiosConfig: n = null, baseURL: t = null } = {}) {
  t || (t = document.body.dataset.apiUrl);
  const e = Ae(), r = xe({});
  return r().use(
    st({
      axios: $e,
      ...n || C.axiosConfig,
      baseURL: t
    })
  ), Te(e), e.use(r);
}
class Y {
  /**
  * @param {Repos} [repos] all models repositories
  * @param {Repository<M>} [repo] the main repository
  */
  constructor(t, e = null) {
    if (typeof t == "string") {
      if (!e)
        throw Error(`Repository "${t}" is provided as string, but no "repos" argument is provided.`);
      if (!(t in e))
        throw Error(`Repository "${t}" is not present in provided repositories.`);
      this.repo = e[t];
    } else
      this.repo = t;
    this.repos = e;
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
  async fetch({ ids: t = null, repo: e = null, url: r = null, lookup: s = "id__in", params: a = void 0, relations: i = null, ...l } = {}) {
    var g, u;
    if (e ?? (e = this.repo), r || (r = (u = (g = e.use) == null ? void 0 : g.meta) == null ? void 0 : u.url), !r)
      throw Error("URL must be provided or Model must provide a `meta: Meta` with `url`");
    t && s !== void 0 && (a = { ...a || {} }, a[s] = [...t]);
    const c = await e.api().get(r, { ...l, params: a });
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
  async all({ nextKey: t = "next", limit: e = -1, ...r } = {}) {
    const s = await this.fetch(r);
    let a = s.response.data[t];
    for (; a; ) {
      const i = await this.fetch({ ...r, url: a });
      if (i.entities && (s.entities = s.entities !== null ? s.entities.concat(i.entities) : i.entities), a = i.response.data[t], e > 0 && e--, !e) break;
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
  async relations(t, e, r = {}) {
    var i;
    this._ensureRepos("relations");
    const s = {}, a = (i = this.repo.use) == null ? void 0 : i.fields();
    if (a)
      for (const l of e) {
        const c = a[l];
        if (c instanceof Se)
          s[l] = await this.relation(t, c, r);
        else
          throw Error(`Field ${l} is not a relation`);
      }
    return s;
  }
  _ensureRepos(t) {
    if (!this.repos)
      throw Error(`Query.repos is not provided although it is mandatory to call ${t}.`);
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
  async relation(t, e, { thin: r = !1, ...s } = {}) {
    var u, d;
    if (this._ensureRepos("relations"), typeof e == "string") {
      const m = (u = this.repo.use) == null ? void 0 : u.fields();
      if (!m || !m[e])
        throw Error(`Field ${e} is not a relation on ${this.repo.use} model`);
      e = m[e];
    }
    const a = e.related.constructor.entity, i = this.repos[a];
    if (!i)
      throw Error(`No repository "${a}" found.`);
    let l = F(t, e.foreignKey), c = null;
    if (r) {
      c = new Set(Object.keys((d = i.pinia.state[a]) == null ? void 0 : d.value.data).filter((A) => A in l));
      const m = l.difference(c);
      m && (l = m);
    }
    const g = await this.all({ ids: l, repo: i, ...s });
    if (r && c) {
      const m = i.whereId(c).get();
      g.entities = [...g.entities || [], ...m];
    }
    return g;
  }
}
function Un(n, t) {
  return new Y(n, t);
}
class ce extends M {
  constructor(e, r = {}) {
    super(e);
    o(this, "state", y.none());
    o(this, "value", {});
    this.state || (this.state = new y()), this.value = {}, this.reset(this.initial);
  }
  static reactive({ initial: e, ...r }) {
    return console.log("reactive editor", e), super.reactive({ initial: k(e), ...r });
  }
  get errors() {
    return this.state.isError && this.state.data || null;
  }
  /**
  * Reset editor editor data to initial.
  * When value is provided, reset initial to this value.
  */
  reset(e = null) {
    e === null ? e = this.initial : this.initial = e, this._reset(e), this.state.none();
  }
  _reset(e) {
    Oe(this.value, e);
  }
  isValid() {
    return this._isValid();
  }
  _isValid() {
    return !0;
  }
  get edited() {
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
    var s;
    if (this.state.processing(), !this.isValid())
      return this.state.error({
        _: "Some of the input values are invalid"
      });
    e = this.serialize(e ?? this.value);
    const r = await this.send(e);
    return r.isOk ? (this.reset(r.data), (s = this.saved) == null || s.call(this, this.value, this)) : this.state = r, this.state;
  }
  /** Serialize value before sending. */
  serialize(e) {
    return e;
  }
  /** Send value (not implemented, MUST BE in subclasses). */
  send(e) {
    throw "not implemented";
  }
}
class Dn extends ce {
  constructor({ repo: t, url: e, ...r }) {
    var s, a;
    e = e || ((a = (s = t.use) == null ? void 0 : s.meta) == null ? void 0 : a.url), super({ url: e, repo: t, ...r }), window.repo = t;
  }
  get fields() {
    return this._fields || (this._fields = this.repo && Object.keys(this.repo.use.fields()) || []), this._fields;
  }
  _reset(t) {
    this.value = D(new this.initial.constructor()), this.fields.reduce((e, r) => (e[r] = t[r], e), this.value);
  }
  get edited() {
    return this.fields.some((t) => this.value[t] != this.initial[t]);
  }
  serialize(t) {
    return t.$toJson(null, { relations: !1 });
  }
  send(t) {
    let [e, r] = ["post", this.url];
    return t.id && (r = `${r}${t.id}/`, e = "put"), this.repo.api()[e](r, t).then(
      (s) => y.ok(s.entities[0]),
      (s) => y.error(s.response.data)
    );
  }
}
class Mn extends M {
  constructor() {
    super(...arguments);
    o(this, "state", y.none());
    o(this, "filters", {});
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
  queryset(e = null, r = !1) {
    let s = this.query.repo;
    if (this.relations)
      for (const a of this.relations)
        s = s.with(a);
    return s = e ? s.whereId(e) : s, r ? s.get().pop() : s;
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
  async load(e) {
    this.state.processing();
    try {
      !e.url && this.url && (e.url = this.url);
      let r = await fetch(e);
      r = await this.handleResponse(e, r);
    } catch (r) {
      this.state.error(r);
    }
    return this.state.isError || this.state.none(), response;
  }
  /** Fetch model instance from the server.
   *
   * Flowchart:
   * - {@link ModelController.getQueryParams}
   * - {@link Query.fetch}
   */
  async fetch(e) {
    return e = this.getQueryParams(e), await this.query.fetch(opts);
  }
  /** Handle response from the {@link ModelContainer.fetch}'s request. */
  async handleResponse(e, r) {
    return r;
  }
  /** Get {@link Query.fetch} options. */
  getQueryParams({ filters: e = null, ...r }) {
    return !r.relations && this.relations && (r.relations = this.relations), !r.dataKey && this.dataKey && (r.dataKey = this.dataKey), !r.url && this.url && (r.url = this.url), e && Object.assign(this.filters, e), this.filters && (r.params = { ...this.filters, ...r.params ?? [] }), r;
  }
}
class Bn extends Mn {
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
    return this.ids.length;
  }
  get(e) {
    return e < this.items.length ? this.items[e] : null;
  }
  /** Get item by id */
  find(e) {
    return this.items.find((r) => r.id == e);
  }
  /** Get item index by id */
  findIndex(e) {
    return this.items.findIndex((r) => r.id == e);
  }
  /**
   * Get item next to provided one at the specified direction.
   *
   * @param item - reference item
   * @param step - increment or decrement item index by this value.
   * @return the target item or null if not found.
   */
  getSibling(e, r) {
    const s = this.find(e.id), a = s > 0 ? s + r : -1;
    return a > 0 ? this.get(a) : null;
  }
  /**
   * Fetch next items from API, override `url` using {@link ModelList.nextUrl}.
   */
  async loadNext(e) {
    return await this.load({ ...e, url: this.nextUrl });
  }
  /**
   * Fetch previous items from API, override `url` using {@link ModelList.prevUrl}.
   */
  async loadPrev(e) {
    return await this.load({ ...e, url: this.prevUrl });
  }
  /** Fetch items from API (using self's {@link Query.fetch}). */
  async handleResponse({ append: e = !1, ...r }, s) {
    if (s = await super.handleResponse(r, s), !this.state.isError) {
      const a = [...F(result.entities, "id")], i = this.queryset(a).get();
      this.items = e ? this.items.concat(i) : i, this.nextUrl = s.response.data[this.nextKey] || null, this.prevUrl = s.response.data[this.prevKey] || null, this.count = s.response.data[this.countKey] || this.ids.length;
    }
    return s;
  }
}
class An extends M {
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
    var e;
    return ((e = this.props) == null ? void 0 : e.name) || "";
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
    var e;
    return !!((e = this.editions) != null && e.size);
  }
  /**
   * Return reactive version of panel.
   *
   * Add watcher over panels's panel ({@link Panel.onChange})
   */
  static reactive(e) {
    const r = super.reactive(e);
    return r.watcher = $(() => r.panels.panel, (s) => r.onChange(s)), r;
  }
  /** Return adequate icon based on props and model **/
  get icon() {
    var e;
    return ((e = this.props) == null ? void 0 : e.icon) || null;
  }
  /** Return panel's title based on props. */
  get title() {
    var e;
    return (e = this.props) == null ? void 0 : e.title;
  }
  /** Set or remove an edition by name. */
  setEdition(e, r) {
    r ? this.editions.add(e) : this.editions.delete(e);
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
    const e = v(this.confirmTKey);
    return confirm(e);
  }
  /** Handle panels' panel change. */
  onChange(e) {
    var r;
    e == this.name && (this.panels.current != this && (this.panels.current = this), this.panels.view || (this.panels.view = (r = this.props) == null ? void 0 : r.index));
  }
}
class xn extends An {
  constructor(e) {
    var r;
    super(e);
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
    var e;
    return super.icon || ((e = this.model.meta) == null ? void 0 : e.icon);
  }
  /** Return panel's title based on view and current item. */
  get title() {
    var i, l;
    const { props: e, list: r, panels: s } = this, a = this.repo.use;
    if (a) {
      if ((i = this.view) != null && i.startsWith("list."))
        return v(X.model(a), 3);
      if ((l = this.view) != null && l.startsWith("detail.") && s.value) {
        if (s.value.$title)
          return s.value.$title;
        const c = v(X.model(a));
        return s.value.id ? v("models._.title", { model: c, id: s.value.id }) : v("models._.title.new", { model: c });
      }
    }
    return super.title;
  }
  /**
   * Edit a new item.
   *
   * @param view - edit view.
   */
  create(e = ".detail.add") {
    this.panels.show({ panel: this.name, view: e, value: new this.model() });
  }
  /** Called when an item has been created. By default, show edit view. */
  created(e, r = ".detail.edit") {
    this.panels.show({ panel: this.name, view: r, value: e, force: !0 }), this.list.fetch();
  }
}
class Tn extends M {
  constructor() {
    super(...arguments);
    o(this, "panel", "");
    o(this, "view", "");
    o(this, "value", null);
    o(this, "current", null);
  }
  static readPath(e) {
    if (!e)
      return { panel: "", view: "" };
    const r = e.indexOf(".");
    return r < 0 ? { panel: e, view: "" } : { panel: e.substring(0, r), view: e.substring(r + 1) };
  }
  show({ force: e = !1, href: r = null, ...s }) {
    if (e || !this.current || this.current.onLeave()) {
      if (r && window.location.pathname != r) {
        if (!s.panel)
          throw Error("The attribute `href` requires`panel`.");
        window.location.href = `${r}?panel=${s.panel}&view=${s.view}`;
        return;
      }
      this.reset(s);
    }
  }
  reset({ panel: e, view: r = null, value: s = null }) {
    this.panel = e || this.panel, this.view = r || "", this.value = s;
  }
}
class Sn extends M {
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
  indexOf(e) {
    return this.ids.indexOf(e);
  }
  /** Fetch items from API (using self's {@link Query.fetch}). */
  async handleResponse({ append: e = !1, ...r }, s) {
    if (s = await super.handleResponse(r, s), this.state.isError)
      return s;
    const a = [...F(result.entities, "id")];
    return this.ids = e ? this.ids.concat(a) : a, this.nextUrl = result.response.data[this.nextKey] || null, this.prevUrl = result.response.data[this.prevKey] || null, this.count = result.response.data[this.countKey] || this.ids.length, this.state.none(), result;
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
function qn(n = {}) {
  const t = Tn.reactive(n);
  return p("panels", t), t;
}
function Wn(n) {
  const t = Sn.reactive(n);
  return p("list", t), t;
}
function Hn({ panels: n, query: t, list: e, repos: r, ...s } = {}) {
  n = n ?? L("panels"), r = r ?? L("repos"), t = t ?? _("query", () => new Y(s.props.repo, r)), e = e ?? _("list", () => {
    const { value: i } = Ce(n);
    return SelectList.reactive({ index: i, query: t });
  });
  const a = xn.reactive({ panels: n, list: e, ...s });
  return p("panel", a), p("item", computed(() => a.list.item)), a;
}
function Gn(n, t = null) {
  const e = new Y(n, t);
  return p("query", e), e;
}
function On({ editorClass: n = ce, emits: t = null, panel: e = null, ...r }) {
  t && (r.saved ?? (r.saved = (a, i) => t("saved", a, i)));
  const s = n.reactive(r);
  return e && watch(() => s.edited, (a) => e.setEdition(s.name, a)), s;
}
function Zn(n) {
  return On({ ...n, editorClass: Dn });
}
function zn(n, t) {
  return Fe(() => import(n).then((e) => t ? Object.values(e).filter((s) => s.__name == t)[0] : e));
}
export {
  ot as AppContext,
  ce as Editor,
  Sn as List,
  Mn as ModelController,
  Dn as ModelEditor,
  Bn as ModelList,
  xn as ModelPanel,
  An as Panel,
  Tn as Panels,
  Y as Query,
  M as RObject,
  y as State,
  Xn as States,
  de as assignNonEmpty,
  F as collectAttr,
  C as config,
  vn as createApp,
  wn as createI18n,
  jn as createPinia,
  kn as createVuetify,
  er as csrfToken,
  zn as defineAsyncComponent,
  tr as filterSlots,
  nr as getCookie,
  ke as getCookieList,
  rr as getCsrf,
  oe as i18n,
  Vn as init,
  _ as injectOrProvide,
  J as loadedLocalePaths,
  sr as mapToObject,
  Yn as models,
  Un as query,
  Oe as reset,
  Nn as setLocale,
  ir as shallowCopy,
  v as t,
  X as tKeys,
  Ln as useAction,
  _n as useAppContext,
  On as useEditor,
  Kn as useI18n,
  Wn as useList,
  Zn as useModelEditor,
  Hn as useModelPanel,
  it as useModels,
  qn as usePanels,
  at as usePermissions,
  In as usePermissionsProps,
  Gn as useQuery
};
//# sourceMappingURL=ox.js.map
