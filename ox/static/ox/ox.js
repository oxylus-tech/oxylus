var we = Object.defineProperty;
var De = (r, e, t) => e in r ? we(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var o = (r, e, t) => De(r, typeof e != "symbol" ? e + "" : e, t);
import { R as ve, c as K, d as be, l as g, a as se, H as Me, b as xe, e as ke, B as Se, C as Ae, G as Te, M as Oe, f as Ee, P as Re, U as W, u as U, g as Pe, S as b, h as Ce, i as Fe, j as Ie, k as Ve, m as Ye, n as Ne, o as ie, s as $e, p as ae, q as F, r as We, t as v, v as j } from "./i18n-B0g_-nGW.js";
import { F as Ar, w as Tr, D as Or, N as Er, O as Rr, L as Pr, z as Cr, A as Fr, E as Ir, Q as Vr, y as Yr, I as Nr, x as $r, J as Wr, K as qr } from "./i18n-B0g_-nGW.js";
import { inject as P, provide as D, reactive as M, computed as k, ref as qe, watch as A, effectScope as L, nextTick as Be, createApp as Ke, onMounted as oe, onUnmounted as ue, unref as z, toRaw as H, defineAsyncComponent as Ue } from "vue";
import je from "axios";
import * as Le from "ox/vendor";
import { p as _, c as ze, m as le, a as He, b as _e, d as Ge, e as Ze, f as Je, g as Qe, D as G, h as Z, T as J, I as Q, L as X, i as Xe, j as et } from "./theme-DfzFTMnZ.js";
class tt {
  /**
   * Create a new response instance.
   */
  constructor(e, t, n) {
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
    this.repository = e, this.config = t, this.response = n;
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
class rt {
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
    var t, n, s;
    const e = { ...(t = this.repository.config.axiosApi) == null ? void 0 : t.actions, ...(s = (n = this.repository.getModel().$config()) == null ? void 0 : n.axiosApi) == null ? void 0 : s.actions };
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
    const n = new tt(this.repository, t, e);
    return t.delete !== void 0 ? (await n.delete(), n) : (t.save && await n.save(), n);
  }
}
class nt extends ve {
  constructor(t, n) {
    var s, i, a;
    super(t, n);
    o(this, "axios");
    o(this, "globalApiConfig");
    o(this, "apiConfig");
    this.axios = ((i = (s = K) == null ? void 0 : s.axiosApi) == null ? void 0 : i.axios) || null, this.globalApiConfig = ((a = K) == null ? void 0 : a.axiosApi) || {}, this.apiConfig = {};
  }
  api() {
    return st(this);
  }
  setAxios(t) {
    return this.axios = t, this;
  }
}
function st(r) {
  return new rt(r);
}
function it(r) {
  return be((e) => (e.config.axiosApi = r, e));
}
class q {
  constructor(e) {
    o(this, "repo");
    o(this, "items");
    this.repo = e, this.items = {};
  }
  /** Acquire a unique context key */
  acquireKey() {
    return this.constructor._lastKey++;
  }
  /** Acquire provided ids for this key */
  acquire(e, t) {
    if (t != null && t.length)
      for (var n of t)
        if (n in this.items) {
          const s = this.items[n];
          !s.includes(e) && s.push(e);
        } else
          this.items[n] = [e];
  }
  /** Release provided ids for this key */
  release(e, t) {
    if (!(t != null && t.length))
      return;
    const n = [];
    for (var s of t) {
      const i = this.items[s];
      g.pull(i, e), i != null && i.length || (n.push(s), delete this.items[s]);
    }
    n.length && this.repo.destroy(n);
  }
  /**
   * Release and acquire for this key.
   *
   * This optimizes out ids
   */
  releaseAcquire(e, t, n) {
    this.release(e, g.difference(t, n)), this.acquire(e, g.difference(n, t));
  }
  /** Release all reference for the provided context key. */
  flush(e) {
    const t = [];
    for (var n in this.refs) {
      const s = this.refs[n], i = s.indexOf(e);
      i != -1 && (s.splice(i, 1), s.length || (t.push(n), delete this.items[n]));
    }
    t.length && this.repo.destroy(t);
  }
  /** Clear reference counter without destroying items. **/
  clear() {
    this.refs = {};
  }
}
o(q, "_lastKey", 0);
class I extends nt {
  constructor(t, n) {
    super(t, n);
    o(this, "refs");
    this.refs = new q(this);
  }
  flush() {
    this.refs.clear(), super.flush();
  }
}
function ce(r, e) {
  var t;
  if (typeof e == "string") {
    const n = (t = r.use) == null ? void 0 : t.fields(), s = n && n[e] || null;
    e = s instanceof se ? s : null;
  }
  return e;
}
function he(r) {
  return r instanceof Me || r instanceof xe || r instanceof ke || r instanceof Se ? r.foreignKey : null;
}
const fr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentType: Ae,
  Group: Te,
  Meta: Oe,
  Model: Ee,
  Permission: Re,
  RefCounter: q,
  Repository: I,
  User: W,
  asRelation: ce,
  getSourceKey: he
}, Symbol.toStringTag, { value: "Module" }));
function at(r) {
  U(r);
  const e = Pe();
  return I.useModel = r, U(I, e);
}
function ot(r, { useInject: e = !0, useDefaults: t = !0, key: n = null } = {}) {
  var s = e && (P("repos") || {});
  const i = e && !!Object.keys(s).length;
  Array.isArray(r) || (r = Object.values(r)), t && r.push(W);
  for (const a of r)
    if (a && a.entity) {
      if (a.entity in s)
        continue;
      s[a.entity] = at(a);
    }
  return !i && D("repos", s), s;
}
class ut {
  static reactive(e) {
    const t = M(new this(e));
    return t.user = k(() => {
      var n;
      return new W(((n = t.data) == null ? void 0 : n.user) || {});
    }), t;
  }
  constructor(e = {}) {
    Object.assign(this, e), this.state = b.none(), this.showState = !1;
  }
  /**
   * Load data into AppData. If no `value` is provided, read it from
   * source element.
   */
  load(e = void 0) {
    this.dataEl !== void 0 && (e === void 0 && (e = this.readData(this.dataEl)), e.dataEl = this.dataEl, this.data = e), this.models !== void 0 && (this.repos = ot(this.models));
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
function mr(r, e = !0) {
  const t = ut.reactive(r);
  return e && t.dataEl && t.load(), D("context", t), D("user", t.user), t;
}
function pr({ props: r, user: e, emits: t = null }) {
  const n = qe(!1), s = k(() => !r.permission || e.can(r.permission, r.item));
  return { processing: n, run: async (...a) => {
    if (r.confirm && !confirm(r.confirm))
      return;
    if (r.href)
      return window.open(r.href, "_blank");
    n.value = !0;
    let u = r.run(e, r.item, ...a);
    return u instanceof Promise && (u = await u), n.value = !1, t && t("completed", r.item, ...a), u;
  }, allowed: s };
}
function T(r) {
  const e = r.slice(-2).toUpperCase();
  switch (!0) {
    case r === "GB-alt-variant":
      return {
        firstDay: 0,
        firstWeekSize: 4
      };
    case r === "001":
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
function lt(r, e, t) {
  var f;
  const n = [];
  let s = [];
  const i = de(r), a = fe(r), u = t ?? ((f = T(e)) == null ? void 0 : f.firstDay) ?? 0, l = (i.getDay() - u + 7) % 7, m = (a.getDay() - u + 7) % 7;
  for (let c = 0; c < l; c++) {
    const h = new Date(i);
    h.setDate(h.getDate() - (l - c)), s.push(h);
  }
  for (let c = 1; c <= a.getDate(); c++) {
    const h = new Date(r.getFullYear(), r.getMonth(), c);
    s.push(h), s.length === 7 && (n.push(s), s = []);
  }
  for (let c = 1; c < 7 - m; c++) {
    const h = new Date(a);
    h.setDate(h.getDate() + c), s.push(h);
  }
  return s.length > 0 && n.push(s), n;
}
function V(r, e, t) {
  var i;
  const n = t ?? ((i = T(e)) == null ? void 0 : i.firstDay) ?? 0, s = new Date(r);
  for (; s.getDay() !== n; )
    s.setDate(s.getDate() - 1);
  return s;
}
function ct(r, e) {
  var s;
  const t = new Date(r), n = ((((s = T(e)) == null ? void 0 : s.firstDay) ?? 0) + 6) % 7;
  for (; t.getDay() !== n; )
    t.setDate(t.getDate() + 1);
  return t;
}
function de(r) {
  return new Date(r.getFullYear(), r.getMonth(), 1);
}
function fe(r) {
  return new Date(r.getFullYear(), r.getMonth() + 1, 0);
}
function ht(r) {
  const e = r.split("-").map(Number);
  return new Date(e[0], e[1] - 1, e[2]);
}
const dt = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
function me(r) {
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
const ee = new Date(2e3, 0, 2);
function ft(r, e) {
  var n;
  const t = e ?? ((n = T(r)) == null ? void 0 : n.firstDay) ?? 0;
  return ze(7).map((s) => {
    const i = new Date(ee);
    return i.setDate(ee.getDate() + t + s), new Intl.DateTimeFormat(r, {
      weekday: "narrow"
    }).format(i);
  });
}
function mt(r, e, t, n) {
  const s = me(r) ?? /* @__PURE__ */ new Date(), i = n == null ? void 0 : n[e];
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
function pt(r, e) {
  const t = r.toJsDate(e), n = t.getFullYear(), s = _(String(t.getMonth() + 1), 2, "0"), i = _(String(t.getDate()), 2, "0");
  return `${n}-${s}-${i}`;
}
function gt(r) {
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
function R(r, e) {
  const t = new Date(r);
  return t.setDate(t.getDate() + e), t;
}
function Dt(r, e) {
  const t = new Date(r);
  return t.setDate(t.getDate() + e * 7), t;
}
function vt(r, e) {
  const t = new Date(r);
  return t.setDate(1), t.setMonth(t.getMonth() + e), t;
}
function Y(r) {
  return r.getFullYear();
}
function bt(r) {
  return r.getMonth();
}
function Mt(r, e, t, n) {
  const s = T(e), i = t ?? (s == null ? void 0 : s.firstDay) ?? 0, a = n ?? (s == null ? void 0 : s.firstWeekSize) ?? 1;
  function u(y) {
    const w = new Date(y, 0, 1);
    return 7 - N(w, V(w, e, i), "days");
  }
  let l = Y(r);
  const m = R(V(r, e, i), 6);
  l < Y(m) && u(l + 1) >= a && l++;
  const f = new Date(l, 0, 1), c = u(l), h = c >= a ? R(f, c - 7) : R(f, c);
  return 1 + N(r, h, "weeks");
}
function xt(r) {
  return r.getDate();
}
function kt(r) {
  return new Date(r.getFullYear(), r.getMonth() + 1, 1);
}
function St(r) {
  return new Date(r.getFullYear(), r.getMonth() - 1, 1);
}
function At(r) {
  return r.getHours();
}
function Tt(r) {
  return r.getMinutes();
}
function Ot(r) {
  return new Date(r.getFullYear(), 0, 1);
}
function Et(r) {
  return new Date(r.getFullYear(), 11, 31);
}
function Rt(r, e) {
  return C(r, e[0]) && Ft(r, e[1]);
}
function Pt(r) {
  const e = new Date(r);
  return e instanceof Date && !isNaN(e.getTime());
}
function C(r, e) {
  return r.getTime() > e.getTime();
}
function Ct(r, e) {
  return C($(r), $(e));
}
function Ft(r, e) {
  return r.getTime() < e.getTime();
}
function te(r, e) {
  return r.getTime() === e.getTime();
}
function It(r, e) {
  return r.getDate() === e.getDate() && r.getMonth() === e.getMonth() && r.getFullYear() === e.getFullYear();
}
function Vt(r, e) {
  return r.getMonth() === e.getMonth() && r.getFullYear() === e.getFullYear();
}
function Yt(r, e) {
  return r.getFullYear() === e.getFullYear();
}
function N(r, e, t) {
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
function $t(r, e) {
  const t = new Date(r);
  return t.setMinutes(e), t;
}
function Wt(r, e) {
  const t = new Date(r);
  return t.setMonth(e), t;
}
function qt(r, e) {
  const t = new Date(r);
  return t.setDate(e), t;
}
function Bt(r, e) {
  const t = new Date(r);
  return t.setFullYear(e), t;
}
function $(r) {
  return new Date(r.getFullYear(), r.getMonth(), r.getDate(), 0, 0, 0, 0);
}
function Kt(r) {
  return new Date(r.getFullYear(), r.getMonth(), r.getDate(), 23, 59, 59, 999);
}
class Ut {
  constructor(e) {
    this.locale = e.locale, this.formats = e.formats;
  }
  date(e) {
    return me(e);
  }
  toJsDate(e) {
    return e;
  }
  toISO(e) {
    return pt(this, e);
  }
  parseISO(e) {
    return gt(e);
  }
  addMinutes(e, t) {
    return yt(e, t);
  }
  addHours(e, t) {
    return wt(e, t);
  }
  addDays(e, t) {
    return R(e, t);
  }
  addWeeks(e, t) {
    return Dt(e, t);
  }
  addMonths(e, t) {
    return vt(e, t);
  }
  getWeekArray(e, t) {
    const n = t !== void 0 ? Number(t) : void 0;
    return lt(e, this.locale, n);
  }
  startOfWeek(e, t) {
    const n = t !== void 0 ? Number(t) : void 0;
    return V(e, this.locale, n);
  }
  endOfWeek(e) {
    return ct(e, this.locale);
  }
  startOfMonth(e) {
    return de(e);
  }
  endOfMonth(e) {
    return fe(e);
  }
  format(e, t) {
    return mt(e, t, this.locale, this.formats);
  }
  isEqual(e, t) {
    return te(e, t);
  }
  isValid(e) {
    return Pt(e);
  }
  isWithinRange(e, t) {
    return Rt(e, t);
  }
  isAfter(e, t) {
    return C(e, t);
  }
  isAfterDay(e, t) {
    return Ct(e, t);
  }
  isBefore(e, t) {
    return !C(e, t) && !te(e, t);
  }
  isSameDay(e, t) {
    return It(e, t);
  }
  isSameMonth(e, t) {
    return Vt(e, t);
  }
  isSameYear(e, t) {
    return Yt(e, t);
  }
  setMinutes(e, t) {
    return $t(e, t);
  }
  setHours(e, t) {
    return Nt(e, t);
  }
  setMonth(e, t) {
    return Wt(e, t);
  }
  setDate(e, t) {
    return qt(e, t);
  }
  setYear(e, t) {
    return Bt(e, t);
  }
  getDiff(e, t, n) {
    return N(e, t, n);
  }
  getWeekdays(e) {
    const t = e !== void 0 ? Number(e) : void 0;
    return ft(this.locale, t);
  }
  getYear(e) {
    return Y(e);
  }
  getMonth(e) {
    return bt(e);
  }
  getWeek(e, t, n) {
    const s = t !== void 0 ? Number(t) : void 0;
    return Mt(e, this.locale, s, n);
  }
  getDate(e) {
    return xt(e);
  }
  getNextMonth(e) {
    return kt(e);
  }
  getPreviousMonth(e) {
    return St(e);
  }
  getHours(e) {
    return At(e);
  }
  getMinutes(e) {
    return Tt(e);
  }
  startOfDay(e) {
    return $(e);
  }
  endOfDay(e) {
    return Kt(e);
  }
  startOfYear(e) {
    return Ot(e);
  }
  endOfYear(e) {
    return Et(e);
  }
}
const jt = Symbol.for("vuetify:date-options"), re = Symbol.for("vuetify:date-adapter");
function Lt(r, e) {
  const t = le({
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
  }, r);
  return {
    options: t,
    instance: zt(t, e)
  };
}
function zt(r, e) {
  const t = M(typeof r.adapter == "function" ? new r.adapter({
    locale: r.locale[e.current.value] ?? e.current.value,
    formats: r.formats
  }) : r.adapter);
  return A(e.current, (n) => {
    t.locale = r.locale[n] ?? n ?? t.locale;
  }), t;
}
function pe() {
  let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    blueprint: e,
    ...t
  } = r, n = le(e, t), {
    aliases: s = {},
    components: i = {},
    directives: a = {}
  } = n, u = L();
  return u.run(() => {
    const l = He(n.defaults), m = _e(n.display, n.ssr), f = Ge(n.theme), c = Ze(n.icons), h = Je(n.locale), y = Lt(n.date, h), w = Ce(n.goTo, h);
    function O(d) {
      for (const p in a)
        d.directive(p, a[p]);
      for (const p in i)
        d.component(p, i[p]);
      for (const p in s)
        d.component(p, Qe({
          ...s[p],
          name: p,
          aliasName: s[p].name
        }));
      const B = L();
      if (B.run(() => {
        f.install(d);
      }), d.onUnmount(() => B.stop()), d.provide(G, l), d.provide(Z, m), d.provide(J, f), d.provide(Q, c), d.provide(X, h), d.provide(jt, y.options), d.provide(re, y.instance), d.provide(Fe, w), Xe && n.ssr)
        if (d.$nuxt)
          d.$nuxt.hook("app:suspense:resolve", () => {
            m.update();
          });
        else {
          const {
            mount: p
          } = d;
          d.mount = function() {
            const ye = p(...arguments);
            return Be(() => m.update()), d.mount = p, ye;
          };
        }
      d.mixin({
        computed: {
          $vuetify() {
            return M({
              defaults: x.call(this, G),
              display: x.call(this, Z),
              theme: x.call(this, J),
              icons: x.call(this, Q),
              locale: x.call(this, X),
              date: x.call(this, re)
            });
          }
        }
      });
    }
    function E() {
      u.stop();
    }
    return {
      install: O,
      unmount: E,
      defaults: l,
      display: m,
      theme: f,
      icons: c,
      locale: h,
      date: y,
      goTo: w
    };
  });
}
const Ht = "3.8.4";
pe.version = Ht;
function x(r) {
  var n, s;
  const e = this.$, t = ((n = e.parent) == null ? void 0 : n.provides) ?? ((s = e.vnode.appContext) == null ? void 0 : s.provides);
  if (t && r in t)
    return t[r];
}
const _t = {
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
      mdi: et
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
}, Gt = {
  lighten4: "#c8e6c9",
  darken1: "#43a047"
}, ne = {
  green: Gt
};
function gr({ App: r = null, el: e = "#app", onLoad: t = !0, ...n } = {}) {
  function s() {
    const i = Zt(r, n), a = e ? i.mount(e) : null;
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
function Zt(r, { props: e = {}, vuetify: t = {}, plugins: n = null } = {}) {
  return r = Ke(r, e), r.config.globalProperties.window = window, r.use(Jt(t)), r.use(Ie), Ve(), n && n.forEach((s) => r.use(s)), r;
}
function Jt({ components: r = {}, defaults: e = {}, ...t }) {
  return t.components = {
    ...Le,
    ...r
  }, pe({
    blueprint: _t,
    theme: {
      themes: {
        light: {
          dark: !1,
          colors: {
            primary: ne.green.darken1,
            secondary: ne.green.lighten4
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
function yr({ axiosConfig: r = null, baseURL: e = null } = {}) {
  e || (e = document.body.dataset.apiUrl);
  const t = Ye(), n = Ne({
    plugins: [
      it({
        axios: je,
        ...r || ie.axiosConfig,
        baseURL: e
      })
    ]
  });
  return $e(t), t.use(n);
}
class S {
  /**
  * @param {Repos} [repos] all models repositories
  * @param {Repository<M>} [repo] the main repository
  */
  constructor(e, t = null, n) {
    this.repo = e, this.repos = t, this.opts = n;
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
  async fetch(e = {}) {
    var h, y, w, O, E;
    e = { ...this.opts, ...e };
    let { url: t, id: n, ids: s, repo: i, lookup: a, params: u, relations: l, path: m, ...f } = e;
    if (a ?? (a = "id__in"), i ?? (i = this.repo), (s == null ? void 0 : s.length) === 1 && (n = s[0], s = null), t || (t = (y = (h = i.use) == null ? void 0 : h.meta) == null ? void 0 : y.getUrl({ path: m, id: n })), n ? f.dataKey = null : "dataKey" in f || (f.dataKey = (E = (O = (w = i.use) == null ? void 0 : w.config) == null ? void 0 : O.axiosApi) == null ? void 0 : E.dataKey), s && a !== void 0) {
      if (n)
        throw Error("Both `ids` and `id` are provided while only one of those arguments is accepted.");
      u = { ...u || {} }, u[a] = [...s];
    }
    const c = await i.api().get(t, { ...f, params: u });
    return f.save === !1 && (c.entities = this.getEntities(c)), l && (c.relations = await this.relations(c.entities, l, { ...f, params: {} })), c;
  }
  /** Get entities from response **/
  getEntities(e) {
    const t = e.getDataFromResponse();
    return Array.isArray(t) ? t.map((n) => this.repo.make(n)) : [this.repo.make(t)];
  }
  /**
   * Fetch all items from api.
   *
   * @param [options.nextKey] response object key to get next url
   * @param [options.limit] max count of consecutive requests
   * @return Response of the first request, whoses ``entities`` has \
   * model instances of all requests.
   */
  async all({ nextKey: e = "next", limit: t = -1, flush: n = !1, ...s } = {}) {
    const i = await this.fetch({ flush: n, ...s });
    let a = i.response.data[e];
    for (; a; ) {
      const u = await this.fetch({ ...s, url: a });
      if (u.entities && (i.entities = i.entities !== null ? i.entities.concat(u.entities) : u.entities), a = u.response.data[e], t > 0 && t--, !t) break;
    }
    return i;
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
  async relations(e, t, n = {}) {
    var a;
    this._ensureRepos("relations");
    const s = {}, i = (a = this.repo.use) == null ? void 0 : a.fields();
    if (i)
      for (const u of t) {
        const l = i[u];
        if (l instanceof se)
          s[u] = await this.relation(e, l, n);
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
  async relation(e, t, n = {}) {
    this._ensureRepos("relations");
    const s = ce(this.repo, t);
    if (!s)
      throw Error(`No Relation found for field ${t}.`);
    const i = s.related.constructor.entity, a = this.repos[i];
    if (!a)
      throw Error(`No repository "${i}" found.`);
    const u = he(s);
    if (!u)
      throw Error(`No source ids attributes for ${t}.`);
    const l = [...new Set(ae(e, u))];
    return new S(a, this.repos).all({ ...n, ids: l, repo: a });
  }
}
function Qt(r, e, t = null) {
  if (typeof r == "string") {
    if (!(r in e))
      throw Error(`Repository "${r}" is not present in provided repositories.`);
    return new S(e[r], e, t);
  }
  return new S(r, e, t);
}
class ge {
  constructor(e) {
    o(this, "state", b.none());
    o(this, "value", {});
    e && F(this, e), this.state || (this.state = new b()), this.value ?? (this.value = {}), this.empty ?? (this.empty = {}), this.initial ?? (this.initial = this.props.initial || this.empty), this.valid = !0, this.reset(this.initial);
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
    We(this.value, e ?? this.empty), this.state.none();
  }
  /** Return wether value has been edited or not */
  isEdited() {
    return !g.isEqual(this.value, this.initial);
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
      ...ie.axiosConfig.headers,
      "Content-Type": "multipart/form-data",
      ...t.headers
    } : e = this.serialize(e);
    const n = await this.send(e, t);
    return n.isOk ? (this.reset(n.data, !0), (s = this.saved) == null || s.call(this, this.value)) : this.state = n, this.state;
  }
  /**
   * This method is called when editor successfully saved the
   * edited item to the server.
   *
   * By default, it will call {@link Editor.props.saved} if provided.
   */
  saved(e) {
    var t, n;
    (n = (t = this.props).saved) == null || n.call(t, e, this);
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
class Xt {
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
    e && F(this, e), this.view ?? (this.view = this.index || "");
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
  show({ view: e = null, value: t = null, silent: n = !1, force: s = !1 } = {}) {
    return (e != this.view || t != this.value) && (s || this.onLeave()) ? (this.view = e || this.index, this.value = t, !n && this.updateLocation(), !0) : !1;
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
}
class er {
  constructor(e = null) {
    o(this, "panel", "");
    o(this, "params", {});
    o(this, "paramsString", "");
    o(this, "children", {});
    o(this, "current");
    e && F(this, e);
  }
  /**
   * Set {@link Panels.params based on current document location.
   */
  readDocumentLocation() {
    this.paramsString = document.location.search.substring(1);
    const e = new URLSearchParams(this.paramsString), { panel: t, ...n } = Object.fromEntries(e.entries());
    this.panel = t, this.params = n || {};
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
  show({ force: e = !1, href: t = null, ...n }) {
    if (e || !this.current || this.current.onLeave()) {
      if (t && window.location.pathname != t) {
        if (!n.panel)
          throw Error("The attribute `href` requires`panel`.");
        t = `${t}?panel=${n.panel}`, n.view && (t = `${t}&view=${n.view || ""}`), window.location.href = t;
        return;
      }
      this.reset(n);
    }
  }
  reset({ panel: e, silent: t = !1, ...n }) {
    var i;
    e && e != this.panel && this.current && !this.current.onLeave() || (this.panel = e || this.panel, this.params = n, this.current = this.children[this.panel], (i = this.current) == null || i.show({ ...this.params, silent: t }));
  }
}
class tr {
  constructor(e = null) {
    o(this, "state", b.none());
    o(this, "save", !0);
    e && F(this, e);
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
    let n = this.repo.query();
    if (this.relations)
      for (const s of this.relations)
        n = n.with(s);
    return e !== null && (n = n.whereId(e)), t ? n.first() : n;
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
    } catch (n) {
      console.log(n), this.state.error(n);
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
class rr extends tr {
  constructor(...t) {
    super(...t);
    // /** Reference counter key **/
    // $id: number
    o(this, "ids", []);
    o(this, "filters", {});
    o(this, "nextUrl", null);
    o(this, "prevUrl", null);
    o(this, "count", null);
    o(this, "page_size", null);
    o(this, "dataKey", "results");
    o(this, "nextKey", "next");
    o(this, "prevKey", "previous");
    o(this, "countKey", "count");
  }
  get refs() {
    return this.repo.refs;
  }
  /** Return index for id */
  indexOf(t) {
    return this.ids.indexOf(t);
  }
  /** Destroy list, ensuring cleaning behind the scenes */
  drop() {
    this.ids = [];
  }
  /** Reset list */
  reset(t = []) {
    this.ids = t, this.nextUrl = null, this.prevUrl = null, this.count = this.ids.length;
  }
  /** Get item index by id */
  //findIndex(id: number): number { return this.items.findIndex((v) => v.id == id) }
  /** Add item if not present in list.
  *
  * @param id - item id to insert
  * @param index - if provided insert at this position
  * @return item index if already in the list, else insertion one
  */
  add(t, n = null) {
    const s = this.ids.indexOf(t);
    return s != -1 ? s : n !== null ? (this.ids.splice(n, 0, t), n) : (this.ids.push(t), this.ids.length - 1);
  }
  /** Remove item by id from list if present. */
  remove(t) {
    this.ids.indexOf(t) != -1 && this.ids.splice(index, 1);
  }
  /**
   * Get item id next to provided one at the specified direction.
   *
   * @param item - reference item
   * @param step - increment or decrement item index by this value.
   * @return the target item id or null if not found.
   */
  getSiblingIndex(t, n) {
    if (t === null)
      return -1;
    const s = this.ids.indexOf(t.id), i = s >= 0 ? s + n : -1;
    return i >= 0 && i < this.ids.length ? i : -1;
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
    return this.filters && (t.params = { ...this.filters, ...t.params ?? [] }), this.page_size && (t.params = { ...t.params, page_size: this.page_size }), super.getQueryOptions(t);
  }
  /**
   * Handle response from API.
   * Reset list and context information such as next/prev url, total count.
   */
  async handleResponse({ append: t = !1, ...n }, s) {
    if (s = await super.handleResponse(n, s), !this.state.isError) {
      const i = ae(s.entities, "id");
      this.resetIds([...i]), this.nextUrl = s.response.data[this.nextKey] || null, this.prevUrl = s.response.data[this.prevKey] || null, this.count = s.response.data[this.countKey] || this.ids.length;
    }
    return s;
  }
  resetIds(t, n = !1) {
    typeof n == "number" ? this.ids.splice(n, 0, ...t) : n ? this.ids = g.union([this.ids, t]) : this.ids = t;
  }
}
class nr extends ge {
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
    return !g.isEqual(g.pick(this.value, this.fields), g.pick(this.initial, this.fields));
  }
  get url() {
    var t, n;
    const e = super.url || ((n = (t = this.repo.use) == null ? void 0 : t.meta) == null ? void 0 : n.url);
    if (!e)
      throw Error("No url specified as parameter or in Model.meta.");
    return e;
  }
  reset(e) {
    (!e || !Object.keys(e).length) && (e = this.empty);
    const t = this.fields.filter((n) => n in e);
    this.value = g.cloneDeep(g.pick(e, t)) || {}, this.state.none();
  }
  serialize(e) {
    const t = this.repo.use;
    return new t({ ...this.value }).$toJson(null, { relations: !1 });
  }
  send(e, t = {}) {
    let [n, s] = ["post", this.url];
    return e.id && (s = `${s}${e.id}/`, n = "put"), this.repo.api()[n](s, e, t).then(
      (i) => b.ok(i.entities[0]),
      (i) => b.error(i.response.data)
    );
  }
}
class sr extends Xt {
  constructor(t) {
    var n;
    super(t);
    o(this, "showFilters", !1);
    this.showFilters = ((n = this.props) == null ? void 0 : n.showFilters) || !1;
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
    const { props: t, list: n } = this, s = this.repo.use;
    if (s) {
      if ((i = this.view) != null && i.startsWith("list."))
        return v(j.model(s), 3);
      if ((a = this.view) != null && a.startsWith("detail.")) {
        if ((u = this.value) != null && u.$title)
          return this.value.$title;
        const m = v(j.model(s));
        return (l = this.value) != null && l.id ? v("models._.title", { model: m, id: this.value.id }) : v("models._.title.new", { model: m });
      }
    }
    return super.title;
  }
  getUrlParams() {
    const { value: t = null, ...n } = super.getUrlParams();
    return t != null && t.id && (n.id = t.id), n;
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
  created(t, n = "detail.edit") {
    this.show({ view: n, value: t });
  }
  show({ id: t = null, ...n }) {
    if (t)
      Qt(this.repo).fetch({ id: t, relations: this.relations }).then((s) => (super.show({ ...n, value: s.entities[0] }), s));
    else
      return super.show(n);
  }
}
function wr(r) {
  const e = M(new er(r));
  D("panels", e), oe(() => {
    e.readDocumentLocation(), e.panel && e.show({
      panel: e.panel,
      silent: !0,
      ...e.params
    });
  }), window.addEventListener("popstate", (n) => {
    n.state && e.show({ ...n.state, silent: !0 });
  });
  const t = document.title;
  return A(() => {
    var n;
    return (n = e.current) == null ? void 0 : n.title;
  }, (n) => {
    n ? document.title = `${n} | ${t}` : document.title = t;
  }), e;
}
function ir(r, e) {
  const t = M(new e(r));
  return D("panel", t), oe(() => t.panels.register(t.name, t)), ue(() => t.panels.unregister(t.name)), { panel: t };
}
function Dr({ query: r, repos: e, ...t }) {
  e ?? (e = P("repos")), r ?? (r = new S(t.props.repo, e)), t.panels ?? (t.panels = P("panels"));
  const { list: n, items: s } = ar({
    query: r,
    relations: t.props.relations,
    fetchRelations: t.props.fetchRelations
  }), { panel: i } = ir({ list: n, ...t }, sr), a = k(() => {
    const l = n.getSiblingIndex(z(i.value), 1);
    return s.value[l] ?? null;
  }), u = k(() => {
    const l = n.getSiblingIndex(z(i.value), -1);
    return s.value[l] ?? null;
  });
  return { panels: i.panels, panel: i, list: n, items: s, next: a, prev: u };
}
function ar(r, e = rr) {
  const t = M(new e(r)), n = t.repo.refs.acquireKey(), s = k(() => t.queryset(t.ids).orderBy((i) => t.ids.indexOf(i)).get());
  return A(() => t.ids, (i, a) => {
    g.isEqual(H(i), H(a)) || t.repo.refs.releaseAcquire(n, a, i);
  }), ue(() => t.repo.refs.flush(n)), D("list", t), D("items", s), { list: t, items: s, listId: n };
}
function vr(r, e = null, t) {
  const n = new S(r, e, t), s = b.none();
  async function i(a) {
    s.processing();
    let u = null;
    try {
      u = await n.fetch(a), s.none();
    } catch (l) {
      s.error(l);
    }
    return u;
  }
  return { state: s, query: n, fetch: i };
}
function or(r, e = ge) {
  r.initial || r.props.initial;
  const t = M(new e(r));
  D("editor", t);
  const n = k(() => t.isEdited());
  A(() => t.props.initial, (i) => {
    t.initial = i || t.empty, t.reset(i || t.empty);
  });
  const s = P("panel");
  return s && A(() => t.edited, (i) => s.setEdition(t.name, i)), { editor: t, edited: n };
}
function br(r, e = nr) {
  return or(r, e);
}
const Mr = {
  /** Field is required */
  required(r) {
    return r ? !0 : v("fields._.required");
  },
  /**
   * Validate field errors returned from the server.
   */
  errors(r) {
    return () => r != null && r.length ? r.join("<br>") || !1 : !0;
  },
  /**
   * Return a rule whose validating value is optional.
   *
   * By default rules require value to be provided. This returns a new
   * rule whose value can either be empty or must match provided rule.
   */
  optional(r) {
    return (e) => !e || r(e);
  },
  /** Rule validating email */
  email(r) {
    return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(r) || v("fields.email.rule");
  },
  /** Rule validating username */
  username(r) {
    return /^[A-Za-z0-9@.+\-_]+$/.test(r) || "Username must not be empty. It only can contain letters, numbers and @/+/./- special characters";
  }
};
function xr(r, e) {
  return Ue(() => import(r).then((t) => e ? (console.log(t, t.components, Object.keys(t)), Object.values(t).filter((s) => s.__name == e)[0]) : t));
}
export {
  ut as AppContext,
  ge as Editor,
  tr as ModelController,
  nr as ModelEditor,
  rr as ModelList,
  sr as ModelPanel,
  Xt as Panel,
  er as Panels,
  S as Query,
  b as State,
  Ar as States,
  F as assignNonEmpty,
  ae as collectAttr,
  ie as config,
  Zt as createApp,
  Tr as createI18n,
  yr as createPinia,
  Jt as createVuetify,
  Or as csrfToken,
  xr as defineAsyncComponent,
  Er as excludeValues,
  Rr as filterSlots,
  Pr as filterValues,
  Cr as getCookie,
  Fr as getCookieList,
  Ir as getCsrf,
  Ie as i18n,
  gr as init,
  Vr as injectOrProvide,
  Yr as loadedLocalePaths,
  Nr as mapToObject,
  fr as models,
  Qt as query,
  We as reset,
  Mr as rules,
  $r as setLocale,
  Wr as shallowCopy,
  qr as splitValues,
  v as t,
  j as tKeys,
  pr as useAction,
  mr as useAppContext,
  or as useEditor,
  Ve as useI18n,
  br as useModelEditor,
  ar as useModelList,
  Dr as useModelPanel,
  ot as useModels,
  ir as usePanel,
  wr as usePanels,
  vr as useQuery,
  at as useRepo
};
//# sourceMappingURL=ox.js.map
