var ge = Object.defineProperty;
var pe = (n, e, t) => e in n ? ge(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var o = (n, e, t) => pe(n, typeof e != "symbol" ? e + "" : e, t);
import { R as te, H as ye, a as we, b as De, B as ve, C as be, G as Me, M as Se, c as ke, P as xe, d as V, U as $, e as Te, g as Ae, u as ne, f as Ee, h as U, S as k, i as Oe, j as Ce, k as Pe, l as Re, m as re, s as Ie, n as Ve, o as I, r as Fe, p as D, t as v, q as j } from "./lodash-CYqq84l7.js";
import { E as An, v as En, A as On, L as Cn, N as Pn, K as Rn, y as In, z as Vn, D as Fn, O as Yn, x as Nn, F as Wn, w as $n, I as Bn, J as Un } from "./lodash-CYqq84l7.js";
import { inject as x, provide as p, computed as b, unref as C, reactive as M, ref as Ye, watch as P, effectScope as q, nextTick as Ne, createApp as We, onMounted as se, onUnmounted as $e, defineAsyncComponent as Be } from "vue";
import Ue from "axios";
import * as je from "ox/vendor";
import { p as K, c as qe, m as ie, a as Ke, b as Le, d as He, e as ze, f as Ge, g as _e, h as Ze, D as L, i as H, T as z, I as G, L as _, G as Je, j as Qe, k as Xe } from "./theme-BrdPdMMA.js";
function ae(n, e) {
  var t;
  if (typeof e == "string") {
    const r = (t = n.use) == null ? void 0 : t.fields(), s = r && r[e] || null;
    e = s instanceof te ? s : null;
  }
  return e;
}
function oe(n) {
  return n instanceof ye || n instanceof we || n instanceof De || n instanceof ve ? n.foreignKey : null;
}
const fn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentType: be,
  Group: Me,
  Meta: Se,
  Model: ke,
  Permission: xe,
  Permissions: V,
  User: $,
  asRelation: ae,
  getSourceKey: oe
}, Symbol.toStringTag, { value: "Module" }));
class et {
  /**
   * Create a new response instance.
   */
  constructor(e, t, r) {
    /**
     * The repository that called the request.
     */
    o(this, "repository");
    /**
     * The request configuration.
     */
    o(this, "config");
    /**
     * The axios response instance.
     */
    o(this, "response");
    /**
     * Entities created by Pinia ORM.
     */
    o(this, "entities", null);
    /**
     * Whether if response data is saved to the store or not.
     */
    o(this, "isSaved", !1);
    this.repository = e, this.config = t, this.response = r;
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
class tt {
  /**
   * Create a new api instance.
   */
  constructor(e) {
    /**
     * The repository class.
     */
    o(this, "repository");
    /**
     * The default config.
     */
    o(this, "config", {
      save: !0
    });
    this.repository = e, this.registerActions();
  }
  /**
   * Get the axios client.
   */
  get axios() {
    if (this.repository.axios = this.repository.axios ?? this.repository.config.axiosApi.axios, !this.repository.axios)
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
      for (const i in e) {
        const a = e[i];
        typeof a == "function" ? this.registerFunctionAction(i, a) : this.registerObjectAction(i, a);
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
    const r = new et(this.repository, t, e);
    return t.delete !== void 0 ? (await r.delete(), r) : (t.save && await r.save(), r);
  }
}
class Z extends Ee {
  constructor(t, r) {
    var s, i, a;
    super(t, r);
    o(this, "axios");
    o(this, "globalApiConfig");
    o(this, "apiConfig");
    this.axios = ((i = (s = U) == null ? void 0 : s.axiosApi) == null ? void 0 : i.axios) || null, this.globalApiConfig = ((a = U) == null ? void 0 : a.axiosApi) || {}, this.apiConfig = {};
  }
  api() {
    return nt(this);
  }
  setAxios(t) {
    return this.axios = t, this;
  }
}
function nt(n) {
  return new tt(n);
}
function rt(n) {
  const e = Ae();
  return Z.useModel = n, ne(Z, e);
}
function st(n) {
  return Te((e) => (e.config.axiosApi = n, e));
}
function it(n, { useInject: e = !0, useDefaults: t = !0 } = {}) {
  var r = e && (x("repos") || {});
  const s = e && !!Object.keys(r).length;
  Array.isArray(n) || (n = Object.values(n)), t && n.push($);
  for (const i of n)
    if (i && i.entity) {
      if (i.entity in r)
        continue;
      ne(i), r[i.entity] = rt(i);
    }
  return !s && p("repos", r), r;
}
function mn() {
  return {
    permissions: [String, Function, Object, Array]
  };
}
function gn(n, e, t) {
  const r = e instanceof V ? e : new V(e), s = b(() => r.can(C(n), C(t)));
  return { permissions: r, allowed: s };
}
class at {
  static reactive(e) {
    const t = M(new this(e));
    return t.user = b(() => {
      var r;
      return new $(((r = t.data) == null ? void 0 : r.user) || {});
    }), t;
  }
  constructor(e = {}) {
    Object.assign(this, e), this.state = k.none(), this.showState = !1;
  }
  /**
   * Load data into AppData. If no `value` is provided, read it from
   * source element.
   */
  load(e = void 0) {
    this.dataEl !== void 0 && (e === void 0 && (e = this.readData(this.dataEl)), e.dataEl = this.dataEl, this.data = e), this.models !== void 0 && (this.repos = it(this.models));
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
function pn(n, e = !0) {
  const t = at.reactive(n);
  return e && t.dataEl && t.load(), p("context", t), p("user", t.user), t;
}
function yn({ props: n, user: e, emits: t = null }) {
  const r = Ye(!1), s = b(() => !n.permission || e.can(n.permission, n.item));
  return { processing: r, run: async (...a) => {
    if (n.confirm && !confirm(n.confirm))
      return;
    if (r.value = !0, n.href) {
      document.location.href = n.href;
      return;
    }
    let u = n.run(e, n.item, ...a);
    return u instanceof Promise && (u = await u), r.value = !1, t && t("completed", n.item, ...a), u;
  }, allowed: s };
}
function A(n) {
  const e = n.slice(-2).toUpperCase();
  switch (!0) {
    case n === "GB-alt-variant":
      return {
        firstDay: 0,
        firstWeekSize: 4
      };
    case n === "001":
      return {
        firstDay: 1,
        firstWeekSize: 1
      };
    case `AG AS BD BR BS BT BW BZ CA CO DM DO ET GT GU HK HN ID IL IN JM JP KE
    KH KR LA MH MM MO MT MX MZ NI NP PA PE PH PK PR PY SA SG SV TH TT TW UM US
    VE VI WS YE ZA ZW`.includes(e):
      return {
        firstDay: 0,
        firstWeekSize: 1
      };
    case `AI AL AM AR AU AZ BA BM BN BY CL CM CN CR CY EC GE HR KG KZ LB LK LV
    MD ME MK MN MY NZ RO RS SI TJ TM TR UA UY UZ VN XK`.includes(e):
      return {
        firstDay: 1,
        firstWeekSize: 1
      };
    case `AD AN AT AX BE BG CH CZ DE DK EE ES FI FJ FO FR GB GF GP GR HU IE IS
    IT LI LT LU MC MQ NL NO PL RE RU SE SK SM VA`.includes(e):
      return {
        firstDay: 1,
        firstWeekSize: 4
      };
    case "AE AF BH DJ DZ EG IQ IR JO KW LY OM QA SD SY".includes(e):
      return {
        firstDay: 6,
        firstWeekSize: 1
      };
    case e === "MV":
      return {
        firstDay: 5,
        firstWeekSize: 1
      };
    case e === "PT":
      return {
        firstDay: 0,
        firstWeekSize: 4
      };
    default:
      return null;
  }
}
function ot(n, e, t) {
  var m;
  const r = [];
  let s = [];
  const i = ue(n), a = le(n), u = t ?? ((m = A(e)) == null ? void 0 : m.firstDay) ?? 0, l = (i.getDay() - u + 7) % 7, h = (a.getDay() - u + 7) % 7;
  for (let c = 0; c < l; c++) {
    const d = new Date(i);
    d.setDate(d.getDate() - (l - c)), s.push(d);
  }
  for (let c = 1; c <= a.getDate(); c++) {
    const d = new Date(n.getFullYear(), n.getMonth(), c);
    s.push(d), s.length === 7 && (r.push(s), s = []);
  }
  for (let c = 1; c < 7 - h; c++) {
    const d = new Date(a);
    d.setDate(d.getDate() + c), s.push(d);
  }
  return s.length > 0 && r.push(s), r;
}
function F(n, e, t) {
  var i;
  const r = t ?? ((i = A(e)) == null ? void 0 : i.firstDay) ?? 0, s = new Date(n);
  for (; s.getDay() !== r; )
    s.setDate(s.getDate() - 1);
  return s;
}
function ut(n, e) {
  var s;
  const t = new Date(n), r = ((((s = A(e)) == null ? void 0 : s.firstDay) ?? 0) + 6) % 7;
  for (; t.getDay() !== r; )
    t.setDate(t.getDate() + 1);
  return t;
}
function ue(n) {
  return new Date(n.getFullYear(), n.getMonth(), 1);
}
function le(n) {
  return new Date(n.getFullYear(), n.getMonth() + 1, 0);
}
function lt(n) {
  const e = n.split("-").map(Number);
  return new Date(e[0], e[1] - 1, e[2]);
}
const ct = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
function ce(n) {
  if (n == null) return /* @__PURE__ */ new Date();
  if (n instanceof Date) return n;
  if (typeof n == "string") {
    let e;
    if (ct.test(n))
      return lt(n);
    if (e = Date.parse(n), !isNaN(e)) return new Date(e);
  }
  return null;
}
const J = new Date(2e3, 0, 2);
function ht(n, e) {
  var r;
  const t = e ?? ((r = A(n)) == null ? void 0 : r.firstDay) ?? 0;
  return qe(7).map((s) => {
    const i = new Date(J);
    return i.setDate(J.getDate() + t + s), new Intl.DateTimeFormat(n, {
      weekday: "narrow"
    }).format(i);
  });
}
function dt(n, e, t, r) {
  const s = ce(n) ?? /* @__PURE__ */ new Date(), i = r == null ? void 0 : r[e];
  if (typeof i == "function")
    return i(s, e, t);
  let a = {};
  switch (e) {
    case "fullDate":
      a = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      break;
    case "fullDateWithWeekday":
      a = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      break;
    case "normalDate":
      const u = s.getDate(), l = new Intl.DateTimeFormat(t, {
        month: "long"
      }).format(s);
      return `${u} ${l}`;
    case "normalDateWithWeekday":
      a = {
        weekday: "short",
        day: "numeric",
        month: "short"
      };
      break;
    case "shortDate":
      a = {
        month: "short",
        day: "numeric"
      };
      break;
    case "year":
      a = {
        year: "numeric"
      };
      break;
    case "month":
      a = {
        month: "long"
      };
      break;
    case "monthShort":
      a = {
        month: "short"
      };
      break;
    case "monthAndYear":
      a = {
        month: "long",
        year: "numeric"
      };
      break;
    case "monthAndDate":
      a = {
        month: "long",
        day: "numeric"
      };
      break;
    case "weekday":
      a = {
        weekday: "long"
      };
      break;
    case "weekdayShort":
      a = {
        weekday: "short"
      };
      break;
    case "dayOfMonth":
      return new Intl.NumberFormat(t).format(s.getDate());
    case "hours12h":
      a = {
        hour: "numeric",
        hour12: !0
      };
      break;
    case "hours24h":
      a = {
        hour: "numeric",
        hour12: !1
      };
      break;
    case "minutes":
      a = {
        minute: "numeric"
      };
      break;
    case "seconds":
      a = {
        second: "numeric"
      };
      break;
    case "fullTime":
      a = {
        hour: "numeric",
        minute: "numeric"
      };
      break;
    case "fullTime12h":
      a = {
        hour: "numeric",
        minute: "numeric",
        hour12: !0
      };
      break;
    case "fullTime24h":
      a = {
        hour: "numeric",
        minute: "numeric",
        hour12: !1
      };
      break;
    case "fullDateTime":
      a = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
      };
      break;
    case "fullDateTime12h":
      a = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: !0
      };
      break;
    case "fullDateTime24h":
      a = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: !1
      };
      break;
    case "keyboardDate":
      a = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      };
      break;
    case "keyboardDateTime":
      return a = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric"
      }, new Intl.DateTimeFormat(t, a).format(s).replace(/, /g, " ");
    case "keyboardDateTime12h":
      return a = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: !0
      }, new Intl.DateTimeFormat(t, a).format(s).replace(/, /g, " ");
    case "keyboardDateTime24h":
      return a = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: !1
      }, new Intl.DateTimeFormat(t, a).format(s).replace(/, /g, " ");
    default:
      a = i ?? {
        timeZone: "UTC",
        timeZoneName: "short"
      };
  }
  return new Intl.DateTimeFormat(t, a).format(s);
}
function ft(n, e) {
  const t = n.toJsDate(e), r = t.getFullYear(), s = K(String(t.getMonth() + 1), 2, "0"), i = K(String(t.getDate()), 2, "0");
  return `${r}-${s}-${i}`;
}
function mt(n) {
  const [e, t, r] = n.split("-").map(Number);
  return new Date(e, t - 1, r);
}
function gt(n, e) {
  const t = new Date(n);
  return t.setMinutes(t.getMinutes() + e), t;
}
function pt(n, e) {
  const t = new Date(n);
  return t.setHours(t.getHours() + e), t;
}
function O(n, e) {
  const t = new Date(n);
  return t.setDate(t.getDate() + e), t;
}
function yt(n, e) {
  const t = new Date(n);
  return t.setDate(t.getDate() + e * 7), t;
}
function wt(n, e) {
  const t = new Date(n);
  return t.setDate(1), t.setMonth(t.getMonth() + e), t;
}
function Y(n) {
  return n.getFullYear();
}
function Dt(n) {
  return n.getMonth();
}
function vt(n, e, t, r) {
  const s = A(e), i = t ?? (s == null ? void 0 : s.firstDay) ?? 0, a = r ?? (s == null ? void 0 : s.firstWeekSize) ?? 1;
  function u(y) {
    const w = new Date(y, 0, 1);
    return 7 - N(w, F(w, e, i), "days");
  }
  let l = Y(n);
  const h = O(F(n, e, i), 6);
  l < Y(h) && u(l + 1) >= a && l++;
  const m = new Date(l, 0, 1), c = u(l), d = c >= a ? O(m, c - 7) : O(m, c);
  return 1 + N(n, d, "weeks");
}
function bt(n) {
  return n.getDate();
}
function Mt(n) {
  return new Date(n.getFullYear(), n.getMonth() + 1, 1);
}
function St(n) {
  return new Date(n.getFullYear(), n.getMonth() - 1, 1);
}
function kt(n) {
  return n.getHours();
}
function xt(n) {
  return n.getMinutes();
}
function Tt(n) {
  return new Date(n.getFullYear(), 0, 1);
}
function At(n) {
  return new Date(n.getFullYear(), 11, 31);
}
function Et(n, e) {
  return R(n, e[0]) && Pt(n, e[1]);
}
function Ot(n) {
  const e = new Date(n);
  return e instanceof Date && !isNaN(e.getTime());
}
function R(n, e) {
  return n.getTime() > e.getTime();
}
function Ct(n, e) {
  return R(W(n), W(e));
}
function Pt(n, e) {
  return n.getTime() < e.getTime();
}
function Q(n, e) {
  return n.getTime() === e.getTime();
}
function Rt(n, e) {
  return n.getDate() === e.getDate() && n.getMonth() === e.getMonth() && n.getFullYear() === e.getFullYear();
}
function It(n, e) {
  return n.getMonth() === e.getMonth() && n.getFullYear() === e.getFullYear();
}
function Vt(n, e) {
  return n.getFullYear() === e.getFullYear();
}
function N(n, e, t) {
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
function Ft(n, e) {
  const t = new Date(n);
  return t.setHours(e), t;
}
function Yt(n, e) {
  const t = new Date(n);
  return t.setMinutes(e), t;
}
function Nt(n, e) {
  const t = new Date(n);
  return t.setMonth(e), t;
}
function Wt(n, e) {
  const t = new Date(n);
  return t.setDate(e), t;
}
function $t(n, e) {
  const t = new Date(n);
  return t.setFullYear(e), t;
}
function W(n) {
  return new Date(n.getFullYear(), n.getMonth(), n.getDate(), 0, 0, 0, 0);
}
function Bt(n) {
  return new Date(n.getFullYear(), n.getMonth(), n.getDate(), 23, 59, 59, 999);
}
class Ut {
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
    return ft(this, e);
  }
  parseISO(e) {
    return mt(e);
  }
  addMinutes(e, t) {
    return gt(e, t);
  }
  addHours(e, t) {
    return pt(e, t);
  }
  addDays(e, t) {
    return O(e, t);
  }
  addWeeks(e, t) {
    return yt(e, t);
  }
  addMonths(e, t) {
    return wt(e, t);
  }
  getWeekArray(e, t) {
    const r = t !== void 0 ? Number(t) : void 0;
    return ot(e, this.locale, r);
  }
  startOfWeek(e, t) {
    const r = t !== void 0 ? Number(t) : void 0;
    return F(e, this.locale, r);
  }
  endOfWeek(e) {
    return ut(e, this.locale);
  }
  startOfMonth(e) {
    return ue(e);
  }
  endOfMonth(e) {
    return le(e);
  }
  format(e, t) {
    return dt(e, t, this.locale, this.formats);
  }
  isEqual(e, t) {
    return Q(e, t);
  }
  isValid(e) {
    return Ot(e);
  }
  isWithinRange(e, t) {
    return Et(e, t);
  }
  isAfter(e, t) {
    return R(e, t);
  }
  isAfterDay(e, t) {
    return Ct(e, t);
  }
  isBefore(e, t) {
    return !R(e, t) && !Q(e, t);
  }
  isSameDay(e, t) {
    return Rt(e, t);
  }
  isSameMonth(e, t) {
    return It(e, t);
  }
  isSameYear(e, t) {
    return Vt(e, t);
  }
  setMinutes(e, t) {
    return Yt(e, t);
  }
  setHours(e, t) {
    return Ft(e, t);
  }
  setMonth(e, t) {
    return Nt(e, t);
  }
  setDate(e, t) {
    return Wt(e, t);
  }
  setYear(e, t) {
    return $t(e, t);
  }
  getDiff(e, t, r) {
    return N(e, t, r);
  }
  getWeekdays(e) {
    const t = e !== void 0 ? Number(e) : void 0;
    return ht(this.locale, t);
  }
  getYear(e) {
    return Y(e);
  }
  getMonth(e) {
    return Dt(e);
  }
  getWeek(e, t, r) {
    const s = t !== void 0 ? Number(t) : void 0;
    return vt(e, this.locale, s, r);
  }
  getDate(e) {
    return bt(e);
  }
  getNextMonth(e) {
    return Mt(e);
  }
  getPreviousMonth(e) {
    return St(e);
  }
  getHours(e) {
    return kt(e);
  }
  getMinutes(e) {
    return xt(e);
  }
  startOfDay(e) {
    return W(e);
  }
  endOfDay(e) {
    return Bt(e);
  }
  startOfYear(e) {
    return Tt(e);
  }
  endOfYear(e) {
    return At(e);
  }
}
const jt = Symbol.for("vuetify:date-options"), X = Symbol.for("vuetify:date-adapter");
function qt(n, e) {
  const t = ie({
    adapter: Ut,
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
    instance: Kt(t, e)
  };
}
function Kt(n, e) {
  const t = M(typeof n.adapter == "function" ? new n.adapter({
    locale: n.locale[e.current.value] ?? e.current.value,
    formats: n.formats
  }) : n.adapter);
  return P(e.current, (r) => {
    t.locale = n.locale[r] ?? r ?? t.locale;
  }), t;
}
function he() {
  let n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    blueprint: e,
    ...t
  } = n, r = ie(e, t), {
    aliases: s = {},
    components: i = {},
    directives: a = {}
  } = r, u = q();
  return u.run(() => {
    const l = Ke(r.defaults), h = Le(r.display, r.ssr), m = He(r.theme), c = ze(r.icons), d = Ge(r.locale), y = qt(r.date, d), w = _e(r.goTo, d);
    function E(f) {
      for (const g in a)
        f.directive(g, a[g]);
      for (const g in i)
        f.component(g, i[g]);
      for (const g in s)
        f.component(g, Ze({
          ...s[g],
          name: g,
          aliasName: s[g].name
        }));
      const B = q();
      if (B.run(() => {
        m.install(f);
      }), f.onUnmount(() => B.stop()), f.provide(L, l), f.provide(H, h), f.provide(z, m), f.provide(G, c), f.provide(_, d), f.provide(jt, y.options), f.provide(X, y.instance), f.provide(Je, w), Qe && r.ssr)
        if (f.$nuxt)
          f.$nuxt.hook("app:suspense:resolve", () => {
            h.update();
          });
        else {
          const {
            mount: g
          } = f;
          f.mount = function() {
            const me = g(...arguments);
            return Ne(() => h.update()), f.mount = g, me;
          };
        }
      f.mixin({
        computed: {
          $vuetify() {
            return M({
              defaults: S.call(this, L),
              display: S.call(this, H),
              theme: S.call(this, z),
              icons: S.call(this, G),
              locale: S.call(this, _),
              date: S.call(this, X)
            });
          }
        }
      });
    }
    function fe() {
      u.stop();
    }
    return {
      install: E,
      unmount: fe,
      defaults: l,
      display: h,
      theme: m,
      icons: c,
      locale: d,
      date: y,
      goTo: w
    };
  });
}
const Lt = "3.8.4";
he.version = Lt;
function S(n) {
  var r, s;
  const e = this.$, t = ((r = e.parent) == null ? void 0 : r.provides) ?? ((s = e.vnode.appContext) == null ? void 0 : s.provides);
  if (t && n in t)
    return t[n];
}
const Ht = {
  defaults: {
    VAppBar: {
      flat: !0
    },
    VAutocomplete: {
      variant: "outlined"
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
      variant: "outlined"
    },
    VDateInput: {
      variant: "outlined"
    },
    VDatePicker: {
      controlHeight: 48,
      color: "primary",
      divided: !0,
      headerColor: "",
      elevation: 3,
      rounded: "xl",
      VBtn: {
        color: "high-emphasis",
        rounded: "circle"
      }
    },
    VFileInput: {
      variant: "outlined"
    },
    VNavigationDrawer: {
      // VList: {
      //   nav: true,
      //   VListItem: {
      //     rounded: 'xl',
      //   },
      // },
    },
    VNumberInput: {
      variant: "outlined",
      VBtn: {
        color: void 0,
        rounded: void 0
      }
    },
    VSelect: {
      variant: "outlined"
    },
    VSlider: {
      color: "primary"
    },
    VTabs: {
      color: "primary"
    },
    VTextarea: {
      variant: "outlined"
    },
    VTextField: {
      variant: "outlined"
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
      mdi: Xe
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
}, zt = {
  lighten4: "#c8e6c9",
  darken1: "#43a047"
}, ee = {
  green: zt
};
function wn({ App: n = null, el: e = "#app", onLoad: t = !0, ...r } = {}) {
  function s() {
    const i = Gt(n, r), a = e ? i.mount(e) : null;
    return document.body.classList.remove("loading"), { app: i, el: e, vm: a };
  }
  return new Promise((i) => {
    if (t)
      return window.addEventListener(
        "load",
        () => i(s())
      );
    i(s());
  });
}
function Gt(n, { props: e = {}, vuetify: t = {}, plugins: r = null } = {}) {
  return n = We(n, e), n.config.globalProperties.window = window, n.use(_t(t)), n.use(Oe), Ce(), r && r.forEach((s) => n.use(s)), n;
}
function _t({ components: n = {}, defaults: e = {}, ...t }) {
  return t.components = {
    ...je,
    ...n
  }, he({
    blueprint: Ht,
    theme: {
      themes: {
        light: {
          dark: !1,
          colors: {
            primary: ee.green.darken1,
            secondary: ee.green.lighten4
          }
        }
      }
    },
    defaults: {
      ...e,
      VTextField: { variant: "underlined" },
      VSelect: { variant: "underlined" },
      VTextarea: { variant: "outlined" },
      VCombobox: { variant: "underlined" },
      VAutocomplete: { variant: "underlined" }
    },
    ...t
  });
}
function Dn({ axiosConfig: n = null, baseURL: e = null } = {}) {
  e || (e = document.body.dataset.apiUrl);
  const t = Pe(), r = Re({
    plugins: [
      st({
        axios: Ue,
        ...n || re.axiosConfig,
        baseURL: e
      })
    ]
  });
  return Ie(t), t.use(r);
}
class T {
  /**
  * @param {Repos} [repos] all models repositories
  * @param {Repository<M>} [repo] the main repository
  */
  constructor(e, t = null) {
    this.repo = e, this.repos = t;
  }
  /**
   * Fetch items from api.
   *
   * @param [options.ids] select by ids
   * @param {Repository} [options.repo] use this repository instead of \
   * ``Query.repo``.
   * @param [options.url] use this url instead of repository's one.
   * @param [options.id] fetch element with this id.
   * @param [options.ids] fetch elements with those ids
   * @param [options.lookup] query GET parameters used to get ids.
   * @param [options.params] extra GET parameters
   * @param [options.opts] options passed down to ``repo.api.get``
   */
  async fetch({ url: e, id: t = null, ids: r = null, repo: s = null, lookup: i = "id__in", params: a = void 0, relations: u = null, path: l = null, ...h } = {}) {
    var c, d, y, w, E;
    if (s ?? (s = this.repo), (r == null ? void 0 : r.length) === 1 && (t = r[0], r = null), e || (e = (d = (c = s.use) == null ? void 0 : c.meta) == null ? void 0 : d.getUrl({ path: l, id: t })), t ? h.dataKey = null : h.dataKey ?? (h.dataKey = (E = (w = (y = s.use) == null ? void 0 : y.config) == null ? void 0 : w.axiosApi) == null ? void 0 : E.dataKey), r && i !== void 0) {
      if (t)
        throw Error("Both `ids` and `id` are provided while only one of those arguments is accepted.");
      a = { ...a || {} }, a[i] = [...r];
    }
    const m = await s.api().get(e, { ...h, params: a });
    return u && (m.relations = await this.relations(m.entities, u, { ...h, params: {} })), m;
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
    let i = s.response.data[e];
    for (; i; ) {
      const a = await this.fetch({ ...r, url: i });
      if (a.entities && (s.entities = s.entities !== null ? s.entities.concat(a.entities) : a.entities), i = a.response.data[e], t > 0 && t--, !t) break;
    }
    return s;
  }
  /**
   * Fetch all from API if repository is empty (see {@link Query.all}).
   *
   * For arguments see {@link Query.all}.
   *
   * Return null if no request has been made.
   */
  async allOnce(e = {}) {
    return (e.repo ?? this.repo).first() ? null : await this.all(e);
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
    var a;
    this._ensureRepos("relations");
    const s = {}, i = (a = this.repo.use) == null ? void 0 : a.fields();
    if (i)
      for (const u of t) {
        const l = i[u];
        if (l instanceof te)
          s[u] = await this.relation(e, l, r);
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
   * @param options - options to pass down to `all()`.
   */
  async relation(e, t, r = {}) {
    this._ensureRepos("relations");
    const s = ae(this.repo, t);
    if (!s)
      throw Error(`No Relation found for field ${t}.`);
    const i = s.related.constructor.entity, a = this.repos[i];
    if (!a)
      throw Error(`No repository "${i}" found.`);
    const u = oe(s);
    if (!u)
      throw Error(`No source ids attributes for ${t}.`);
    const l = [...new Set(Ve(e, u))];
    return new T(a, this.repos).all({ ...r, ids: l, repo: a });
  }
}
function Zt(n, e) {
  if (typeof n == "string") {
    if (!(n in e))
      throw Error(`Repository "${n}" is not present in provided repositories.`);
    return new T(e[n], e);
  }
  return new T(n, e);
}
class de {
  constructor(e) {
    o(this, "state", k.none());
    o(this, "value", {});
    e && I(this, e), this.state || (this.state = new k()), this.value ?? (this.value = {}), this.empty ?? (this.empty = {}), this.initial ?? (this.initial = this.props.initial || this.empty), this.valid = !0, this.reset(this.initial);
  }
  get name() {
    return this.props.name;
  }
  get url() {
    return this.props.url;
  }
  get errors() {
    return this.state.isError && this.state.data || null;
  }
  /** Discard changes, resetting to initial value. */
  discard() {
    this.reset(this.initial);
  }
  /**
   * Reset editor data to provided value.
   * When value is provided, reset initial to this value.
   */
  reset(e = null) {
    Fe(this.value, e ?? this.empty), this.state.none();
  }
  /** Return wether value has been edited or not */
  isEdited() {
    return !D.isEqual(this.value, this.initial);
  }
  /**
   * Save data. It will `serialize()` value then `send()` it.
   *
   * Note: default implementation does not provide `send()` method
   * and thus will raise an error.
   *
   * @param [value] if provided use this instead of `this.value`. When a form is provided, it will get
   * @return state.
   */
  async save(e = null, t = {}) {
    var s;
    if (this.state.processing(), this.valid === !1)
      return this.state.error({
        _: "Some of the input values are invalid"
      });
    e ?? (e = this.value), e instanceof FormData ? t.headers = {
      ...re.axiosConfig.headers,
      "Content-Type": "multipart/form-data",
      ...t.headers
    } : e = this.serialize(e);
    const r = await this.send(e, t);
    return r.isOk ? (this.reset(r.data, !0), (s = this.saved) == null || s.call(this, this.value)) : this.state = r, this.state;
  }
  /**
   * This method is called when editor successfully saved the
   * edited item to the server.
   *
   * By default, it will call {@link Editor.props.saved} if provided.
   */
  saved(e) {
    var t, r;
    (r = (t = this.props).saved) == null || r.call(t, e, this);
  }
  /** Serialize value before sending. */
  serialize(e) {
    return e;
  }
  /** Send value (not implemented, MUST BE in subclasses). */
  send(e, t) {
    throw "not implemented";
  }
}
class Jt {
  constructor(e = null) {
    o(this, "index", "list.table");
    o(this, "view", "");
    o(this, "value", null);
    o(this, "item", null);
    o(this, "editions", /* @__PURE__ */ new Set());
    /**
     * Translation key for message displayed on `confirm()` to leave unsaved
     * changes.
     */
    o(this, "confirmTKey", "panel.confirm");
    e && I(this, e), this.view ?? (this.view = this.index || "");
  }
  /** Panel name (based on props) **/
  get name() {
    var e;
    return ((e = this.props) == null ? void 0 : e.name) || "";
  }
  /** Wether there are still edited items on current view. */
  get edited() {
    var e;
    return !!((e = this.editions) != null && e.size);
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
  /** Return URL GET parameters for the current view */
  getUrlParams() {
    const e = { panel: this.name };
    return this.view != this.index && (e.view = this.view), this.view.startsWith("detail.") && this.value && (e.value = this.value), e;
  }
  /** Set or remove an edition by name. */
  setEdition(e, t) {
    t ? this.editions.add(e) : this.editions.delete(e);
  }
  /**
   * Show a view, providing optional value.
   * @return - true if view changed
   */
  show({ view: e = null, value: t = null, silent: r = !1, force: s = !1 } = {}) {
    return (e != this.view || t != this.value) && (s || this.onLeave()) ? (this.view = e || this.index, this.value = t, !r && this.updateLocation(), !0) : !1;
  }
  /** Update current location using History api */
  updateLocation() {
    const e = this.getUrlParams();
    if (e) {
      const t = new URLSearchParams(e).toString();
      history.pushState(e, "", `?${t}`);
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
      return !0;
    const e = v(this.confirmTKey);
    return confirm(e);
  }
  onViewChange(e) {
    console.log("onViewChange", e), e || (this.view = this.index);
  }
  onValueChange(e) {
  }
}
class Qt {
  constructor(e = null) {
    o(this, "panel", "");
    o(this, "params", {});
    o(this, "paramsString", "");
    o(this, "children", {});
    o(this, "current");
    e && I(this, e);
  }
  /**
   * Set {@link Panels.params based on current document location.
   */
  readDocumentLocation() {
    this.paramsString = document.location.search.substring(1);
    const e = new URLSearchParams(this.paramsString), { panel: t, ...r } = Object.fromEntries(e.entries());
    this.panel = t, this.params = r || {};
  }
  /** Read provided path and return current panel and view */
  static readPath(e) {
    if (!e)
      return { panel: "", view: "" };
    const t = e.indexOf(".");
    return t < 0 ? { panel: e, view: "" } : { panel: e.substring(0, t), view: e.substring(t + 1) };
  }
  /** Register a panel */
  register(e, t) {
    this.children[e] || (this.children[e] = t, this.panel == t.name && (this.current = t, t.show(this.params)));
  }
  /** Unregister a panel */
  unregister(e) {
    delete this.children[e];
  }
  /**
   * Show a panel, loading page provided by href if required.
   * When there is already a panel displayed, it will call {@link Panel.onLeave} in order to eventually prevent
   * unwanted page change.
   */
  show({ force: e = !1, href: t = null, ...r }) {
    if (e || !this.current || this.current.onLeave()) {
      if (t && window.location.pathname != t) {
        if (!r.panel)
          throw Error("The attribute `href` requires`panel`.");
        t = `${t}?panel=${r.panel}`, r.view && (t = `${t}&view=${r.view || ""}`), window.location.href = t;
        return;
      }
      this.reset(r);
    }
  }
  reset({ panel: e, silent: t = !1, ...r }) {
    var i;
    e && e != this.panel && this.current && !this.current.onLeave() || (this.panel = e || this.panel, this.params = r, this.current = this.children[this.panel], (i = this.current) == null || i.show({ ...this.params, silent: t }));
  }
}
class Xt {
  constructor(e = null) {
    o(this, "state", k.none());
    o(this, "save", !0);
    e && I(this, e);
  }
  /** The repository of contained items. */
  get repo() {
    return this.query.repo;
  }
  /** Current model. */
  get model() {
    return this.repo.use;
  }
  /** Return orm's query to object. This will includes declared {@link List.relations}.
   *
   *   @param ids - optional id lookup
   *   @param first - if true, return the first item
   *   @return orm's query
   */
  queryset(e = null, t = !1) {
    let r = this.repo.query();
    if (this.relations)
      for (const s of this.relations)
        r = r.with(s);
    return e ? r.whereId(e) : r;
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
  async load(e = {}) {
    this.state.processing();
    let t = null;
    try {
      t = await this.fetch(e), t = await this.handleResponse(e, t);
    } catch (r) {
      this.state.error(r);
    }
    return this.state.isError || this.state.none(), t;
  }
  /** Fetch model instance from the server.
   *
   * Flowchart:
   * - {@link ModelController.getQueryParams}
   * - {@link Query.fetch}
   */
  async fetch(e = {}) {
    const t = this.getQueryOptions(e);
    return await this.query.fetch(t);
  }
  /** Handle response from the {@link ModelContainer.fetch}'s request. */
  async handleResponse(e, t) {
    return t;
  }
  /** Get {@link Query.fetch} options. */
  getQueryOptions(e) {
    return !e.relations && this.relations && this.fetchRelations && (e.relations = this.relations), e.url || (e.url = this.url), "save" in e || (e.save = this.save), e;
  }
}
class en extends Xt {
  constructor() {
    super(...arguments);
    // ids: number[] = []
    o(this, "items", []);
    o(this, "filters", {});
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
  /** Get ids **/
  get ids() {
    return this.items.map((t) => t.id);
  }
  /** Get item by list index */
  get(t) {
    return t < this.items.length ? this.items[t] : null;
  }
  /** Reset list */
  reset(t = []) {
    this.items = t, this.nextUrl = null, this.prevUrl = null;
  }
  /** Get item index by id */
  findIndex(t) {
    return this.items.findIndex((r) => r.id == t);
  }
  /** Return True if item is in list */
  contains(t) {
    return this.findIndex(t) != -1;
  }
  /** Add item if not present in list.
  *
  * @param item - item to insert
  * @param index - if provided insert at this position
  * @return item index if already in the list, else insertion one
  */
  add(t, r = null) {
    const s = this.findIndex(t.id);
    return s != -1 ? s : r !== null ? (this.items.splice(r, 1, t), r) : (this.items.push(t), this.items.length - 1);
  }
  /**
   * Get item id next to provided one at the specified direction.
   *
   * @param item - reference item
   * @param step - increment or decrement item index by this value.
   * @return the target item id or null if not found.
   */
  getSiblingIndex(t, r) {
    if (t === null)
      return -1;
    const s = this.findIndex(t.id), i = s >= 0 ? s + r : -1;
    return i >= 0 && i < this.items.length ? i : -1;
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
  getQueryOptions(t) {
    return this.filters && (t.params = { ...this.filters, ...t.params ?? [] }), super.getQueryOptions(t);
  }
  /**
   * Handle response from API.
   * Reset list and context information such as next/prev url, total count.
   */
  async handleResponse({ append: t = !1, ...r }, s) {
    return s = await super.handleResponse(r, s), this.state.isError || (typeof t == "number" ? this.items.splice(t, 0, ...s.entities) : this.items = t ? this.items.concat(s.entities) : s.entities, this.items = D.uniqWith(this.items, (i, a) => i.id == a.id), this.nextUrl = s.response.data[this.nextKey] || null, this.prevUrl = s.response.data[this.prevKey] || null, this.count = s.response.data[this.countKey] || this.length), s;
  }
}
class tn extends de {
  constructor(e) {
    e.fields = Object.keys(e.props.repo.use.fields()), e.empty ?? (e.empty = new e.props.repo.use()), super(e);
  }
  get repo() {
    return this.props.repo;
  }
  get name() {
    return this.props.name || `${this.repo.use.entity}-edit`;
  }
  isEdited() {
    return !D.isEqual(D.pick(this.value, this.fields), D.pick(this.initial, this.fields));
  }
  get url() {
    var t, r;
    const e = super.url || ((r = (t = this.repo.use) == null ? void 0 : t.meta) == null ? void 0 : r.url);
    if (!e)
      throw Error("No url specified as parameter or in Model.meta.");
    return e;
  }
  reset(e) {
    (!e || !Object.keys(e).length) && (e = this.empty);
    const t = this.fields.filter((r) => r in e);
    this.value = D.cloneDeep(D.pick(e, t)) || {}, this.state.none();
  }
  serialize(e) {
    const t = this.repo.use;
    return new t({ ...this.value }).$toJson(null, { relations: !1 });
  }
  send(e, t = {}) {
    let [r, s] = ["post", this.url];
    return e.id && (s = `${s}${e.id}/`, r = "put"), this.repo.api()[r](s, e, t).then(
      (i) => k.ok(i.entities[0]),
      (i) => k.error(i.response.data)
    );
  }
}
class nn extends Jt {
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
    var i, a, u, l;
    const { props: t, list: r } = this, s = this.repo.use;
    if (s) {
      if ((i = this.view) != null && i.startsWith("list."))
        return v(j.model(s), 3);
      if ((a = this.view) != null && a.startsWith("detail.")) {
        if ((u = this.value) != null && u.$title)
          return this.value.$title;
        const h = v(j.model(s));
        return (l = this.value) != null && l.id ? v("models._.title", { model: h, id: this.value.id }) : v("models._.title.new", { model: h });
      }
    }
    return super.title;
  }
  getUrlParams() {
    const { value: t = null, ...r } = super.getUrlParams();
    return t != null && t.id && (r.id = t.id), r;
  }
  /**
   * Edit a new item.
   *
   * @param view - edit view.
   */
  create(t = "detail.edit") {
    this.show({ view: t, value: null });
  }
  /** Called when an item has been created. By default, show edit view. */
  created(t, r = "detail.edit") {
    this.show({ view: r, value: t });
  }
  show({ id: t = null, ...r }) {
    if (t)
      Zt(this.repo).fetch({ id: t, relations: this.relations }).then((s) => (super.show({ ...r, value: s.entities[0] }), s));
    else
      return super.show(r);
  }
  onViewChange(t) {
    super.onViewChange(t), t.startsWith("list.") && this.list.load();
  }
  onValueChange(t) {
  }
}
function vn(n) {
  const e = M(new Qt(n));
  p("panels", e), se(() => {
    e.readDocumentLocation(), e.panel && e.show({
      panel: e.panel,
      silent: !0,
      ...e.params
    });
  }), window.addEventListener("popstate", (r) => {
    r.state && e.show({ ...r.state, silent: !0 });
  });
  const t = document.title;
  return P(() => {
    var r;
    return (r = e.current) == null ? void 0 : r.title;
  }, (r) => {
    r ? document.title = `${r} | ${t}` : document.title = t;
  }), e;
}
function rn(n, e) {
  const t = M(new e(n));
  return p("panel", t), se(() => t.panels.register(t.name, t)), $e(() => t.panels.unregister(t.name)), { panel: t };
}
function bn({ query: n, repos: e, ...t }) {
  e ?? (e = x("repos")), n ?? (n = an(t.props.repo, x("repos"))), t.panels ?? (t.panels = x("panels"));
  const { list: r, items: s } = sn({
    query: n,
    relations: t.props.relations,
    fetchRelations: t.props.fetchRelations
  }), { panel: i } = rn({ list: r, ...t }, nn), a = b(() => {
    const l = r.getSiblingIndex(C(i.value), 1);
    return s.value[l] ?? null;
  }), u = b(() => {
    const l = r.getSiblingIndex(C(i.value), -1);
    return s.value[l] ?? null;
  });
  return { panels: i.panels, panel: i, list: r, items: s, next: a, prev: u };
}
function sn(n, e = en) {
  const t = M(new e(n)), r = b(
    () => t.save && t.relations && t.length ? t.queryset(t.ids).orderBy((s) => t.ids.indexOf(s)).get() : t.items
  );
  return p("list", t), p("items", r), { list: t, items: r };
}
function an(n, e = null) {
  const t = new T(n, e);
  return p("query", t), t;
}
function on(n, e = de) {
  n.initial || n.props.initial;
  const t = M(new e(n));
  p("editor", t);
  const r = b(() => t.isEdited());
  P(() => t.props.initial, (i) => {
    t.initial = i || t.empty, t.reset(i || t.empty);
  });
  const s = x("panel");
  return s && P(() => t.edited, (i) => s.setEdition(t.name, i)), { editor: t, edited: r };
}
function Mn(n, e = tn) {
  return on(n, e);
}
const Sn = {
  /** Field is required */
  required(n) {
    return n ? !0 : v("fields._.required");
  },
  /**
   * Validate field errors returned from the server.
   */
  errors(n) {
    return () => n != null && n.length ? n.join("<br>") || !1 : !0;
  },
  /**
   * Return a rule whose validating value is optional.
   *
   * By default rules require value to be provided. This returns a new
   * rule whose value can either be empty or must match provided rule.
   */
  optional(n) {
    return (e) => !e || n(e);
  },
  /** Rule validating email */
  email(n) {
    return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(n) || v("fields.email.rule");
  },
  /** Rule validating username */
  username(n) {
    return /^[A-Za-z0-9@.+\-_]+$/.test(n) || "Username must not be empty. It only can contain letters, numbers and @/+/./- special characters";
  }
};
function kn(n, e) {
  return Be(() => import(n).then((t) => e ? (console.log(t, t.components, Object.keys(t)), Object.values(t).filter((s) => s.__name == e)[0]) : t));
}
export {
  at as AppContext,
  de as Editor,
  Xt as ModelController,
  tn as ModelEditor,
  en as ModelList,
  nn as ModelPanel,
  Jt as Panel,
  Qt as Panels,
  T as Query,
  k as State,
  An as States,
  I as assignNonEmpty,
  Ve as collectAttr,
  re as config,
  Gt as createApp,
  En as createI18n,
  Dn as createPinia,
  _t as createVuetify,
  On as csrfToken,
  kn as defineAsyncComponent,
  Cn as excludeValues,
  Pn as filterSlots,
  Rn as filterValues,
  In as getCookie,
  Vn as getCookieList,
  Fn as getCsrf,
  Oe as i18n,
  wn as init,
  Yn as injectOrProvide,
  Nn as loadedLocalePaths,
  Wn as mapToObject,
  fn as models,
  Zt as query,
  Fe as reset,
  Sn as rules,
  $n as setLocale,
  Bn as shallowCopy,
  Un as splitValues,
  v as t,
  j as tKeys,
  yn as useAction,
  pn as useAppContext,
  on as useEditor,
  Ce as useI18n,
  Mn as useModelEditor,
  sn as useModelList,
  bn as useModelPanel,
  it as useModels,
  rn as usePanel,
  vn as usePanels,
  gn as usePermissions,
  mn as usePermissionsProps,
  an as useQuery
};
//# sourceMappingURL=ox.js.map
