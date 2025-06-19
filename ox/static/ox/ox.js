var ve = Object.defineProperty;
var be = (r, e, t) => e in r ? ve(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var o = (r, e, t) => be(r, typeof e != "symbol" ? e + "" : e, t);
import { t as y, R as Me, c as K, d as xe, l as g, a as ie, H as ke, b as Se, e as Ae, B as Te, C as Ee, G as Oe, M as Re, f as Pe, P as Ce, U as W, u as j, g as Fe, S as b, h as Ie, i as Ve, j as Ye, k as $e, m as Ne, n as We, o as ae, s as qe, p as Be, q as I, r as Ke, v as U } from "./index-BcsriIRW.js";
import { E as Or, w as Rr, A as Pr, L as Cr, N as Fr, K as Ir, y as Vr, z as Yr, D as $r, O as Nr, F as Wr, I as qr, J as Br, x as Kr } from "./index-BcsriIRW.js";
import { inject as P, provide as v, reactive as M, computed as k, ref as je, watch as A, effectScope as _, nextTick as Ue, createApp as _e, onMounted as oe, onUnmounted as ue, unref as z, toRaw as H, defineAsyncComponent as ze } from "vue";
import He from "axios";
import * as Le from "ox/vendor";
import { p as L, c as Ge, m as le, a as Ze, b as Je, d as Qe, e as Xe, f as et, g as tt, D as G, h as Z, T as J, I as Q, L as X, i as rt, j as nt } from "./theme-BVAWnHOc.js";
function ee(r, e) {
  let t = `enums.${r}.${e}`, n = y(t);
  return n != t ? n : y(`enums.${r}._.${e}`);
}
const ce = {
  get(r, e, t) {
    return e == "items" ? Object.keys(r).filter((n) => n[0] != "_").map((n) => ({
      value: r[n],
      title: ee(r.__prefix, n)
    })) : e == "toString" ? (n) => ee(t.__prefix, n) : Reflect.get(...arguments);
  }
};
function st(r, e) {
  return e.__prefix = r, new Proxy(e, ce);
}
class it {
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
class at {
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
    const n = new it(this.repository, t, e);
    return t.delete !== void 0 ? (await n.delete(), n) : (t.save && await n.save(), n);
  }
}
class ot extends Me {
  constructor(t, n) {
    var s, i, a;
    super(t, n);
    o(this, "axios");
    o(this, "globalApiConfig");
    o(this, "apiConfig");
    this.axios = ((i = (s = K) == null ? void 0 : s.axiosApi) == null ? void 0 : i.axios) || null, this.globalApiConfig = ((a = K) == null ? void 0 : a.axiosApi) || {}, this.apiConfig = {};
  }
  api() {
    return ut(this);
  }
  setAxios(t) {
    return this.axios = t, this;
  }
}
function ut(r) {
  return new at(r);
}
function lt(r) {
  return xe((e) => (e.config.axiosApi = r, e));
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
class V extends ot {
  constructor(t, n) {
    super(t, n);
    o(this, "refs");
    this.refs = new q(this);
  }
  flush() {
    this.refs.clear(), super.flush();
  }
}
function he(r, e) {
  var t;
  if (typeof e == "string") {
    const n = (t = r.use) == null ? void 0 : t.fields(), s = n && n[e] || null;
    e = s instanceof ie ? s : null;
  }
  return e;
}
function de(r) {
  return r instanceof ke || r instanceof Se || r instanceof Ae || r instanceof Te ? r.foreignKey : null;
}
const gr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentType: Ee,
  Enum: st,
  Group: Oe,
  Meta: Re,
  Model: Pe,
  Permission: Ce,
  RefCounter: q,
  Repository: V,
  User: W,
  asRelation: he,
  enumProxy: ce,
  getSourceKey: de
}, Symbol.toStringTag, { value: "Module" }));
function ct(r) {
  j(r);
  const e = Fe();
  return V.useModel = r, j(V, e);
}
function ht(r, { useInject: e = !0, useDefaults: t = !0, key: n = null } = {}) {
  var s = e && (P("repos") || {});
  const i = e && !!Object.keys(s).length;
  Array.isArray(r) || (r = Object.values(r)), t && r.push(W);
  for (const a of r)
    if (a && a.entity) {
      if (a.entity in s)
        continue;
      s[a.entity] = ct(a);
    }
  return !i && v("repos", s), s;
}
class dt {
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
    this.dataEl !== void 0 && (e === void 0 && (e = this.readData(this.dataEl)), e.dataEl = this.dataEl, this.data = e), this.models !== void 0 && (this.repos = ht(this.models));
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
function yr(r, e = !0) {
  const t = dt.reactive(r);
  return e && t.dataEl && t.load(), v("context", t), v("user", t.user), t;
}
function wr({ props: r, user: e, emits: t = null }) {
  const n = je(!1), s = k(() => !r.permission || e.can(r.permission, r.item));
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
function ft(r, e, t) {
  var f;
  const n = [];
  let s = [];
  const i = fe(r), a = me(r), u = t ?? ((f = T(e)) == null ? void 0 : f.firstDay) ?? 0, l = (i.getDay() - u + 7) % 7, m = (a.getDay() - u + 7) % 7;
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
function Y(r, e, t) {
  var i;
  const n = t ?? ((i = T(e)) == null ? void 0 : i.firstDay) ?? 0, s = new Date(r);
  for (; s.getDay() !== n; )
    s.setDate(s.getDate() - 1);
  return s;
}
function mt(r, e) {
  var s;
  const t = new Date(r), n = ((((s = T(e)) == null ? void 0 : s.firstDay) ?? 0) + 6) % 7;
  for (; t.getDay() !== n; )
    t.setDate(t.getDate() + 1);
  return t;
}
function fe(r) {
  return new Date(r.getFullYear(), r.getMonth(), 1);
}
function me(r) {
  return new Date(r.getFullYear(), r.getMonth() + 1, 0);
}
function pt(r) {
  const e = r.split("-").map(Number);
  return new Date(e[0], e[1] - 1, e[2]);
}
const gt = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
function pe(r) {
  if (r == null) return /* @__PURE__ */ new Date();
  if (r instanceof Date) return r;
  if (typeof r == "string") {
    let e;
    if (gt.test(r))
      return pt(r);
    if (e = Date.parse(r), !isNaN(e)) return new Date(e);
  }
  return null;
}
const te = new Date(2e3, 0, 2);
function yt(r, e) {
  var n;
  const t = e ?? ((n = T(r)) == null ? void 0 : n.firstDay) ?? 0;
  return Ge(7).map((s) => {
    const i = new Date(te);
    return i.setDate(te.getDate() + t + s), new Intl.DateTimeFormat(r, {
      weekday: "narrow"
    }).format(i);
  });
}
function wt(r, e, t, n) {
  const s = pe(r) ?? /* @__PURE__ */ new Date(), i = n == null ? void 0 : n[e];
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
function Dt(r, e) {
  const t = r.toJsDate(e), n = t.getFullYear(), s = L(String(t.getMonth() + 1), 2, "0"), i = L(String(t.getDate()), 2, "0");
  return `${n}-${s}-${i}`;
}
function vt(r) {
  const [e, t, n] = r.split("-").map(Number);
  return new Date(e, t - 1, n);
}
function bt(r, e) {
  const t = new Date(r);
  return t.setMinutes(t.getMinutes() + e), t;
}
function Mt(r, e) {
  const t = new Date(r);
  return t.setHours(t.getHours() + e), t;
}
function R(r, e) {
  const t = new Date(r);
  return t.setDate(t.getDate() + e), t;
}
function xt(r, e) {
  const t = new Date(r);
  return t.setDate(t.getDate() + e * 7), t;
}
function kt(r, e) {
  const t = new Date(r);
  return t.setDate(1), t.setMonth(t.getMonth() + e), t;
}
function $(r) {
  return r.getFullYear();
}
function St(r) {
  return r.getMonth();
}
function At(r, e, t, n) {
  const s = T(e), i = t ?? (s == null ? void 0 : s.firstDay) ?? 0, a = n ?? (s == null ? void 0 : s.firstWeekSize) ?? 1;
  function u(w) {
    const D = new Date(w, 0, 1);
    return 7 - N(D, Y(D, e, i), "days");
  }
  let l = $(r);
  const m = R(Y(r, e, i), 6);
  l < $(m) && u(l + 1) >= a && l++;
  const f = new Date(l, 0, 1), c = u(l), h = c >= a ? R(f, c - 7) : R(f, c);
  return 1 + N(ge(r), F(h), "weeks");
}
function Tt(r) {
  return r.getDate();
}
function Et(r) {
  return new Date(r.getFullYear(), r.getMonth() + 1, 1);
}
function Ot(r) {
  return new Date(r.getFullYear(), r.getMonth() - 1, 1);
}
function Rt(r) {
  return r.getHours();
}
function Pt(r) {
  return r.getMinutes();
}
function Ct(r) {
  return new Date(r.getFullYear(), 0, 1);
}
function Ft(r) {
  return new Date(r.getFullYear(), 11, 31);
}
function It(r, e) {
  return C(r, e[0]) && $t(r, e[1]);
}
function Vt(r) {
  const e = new Date(r);
  return e instanceof Date && !isNaN(e.getTime());
}
function C(r, e) {
  return r.getTime() > e.getTime();
}
function Yt(r, e) {
  return C(F(r), F(e));
}
function $t(r, e) {
  return r.getTime() < e.getTime();
}
function re(r, e) {
  return r.getTime() === e.getTime();
}
function Nt(r, e) {
  return r.getDate() === e.getDate() && r.getMonth() === e.getMonth() && r.getFullYear() === e.getFullYear();
}
function Wt(r, e) {
  return r.getMonth() === e.getMonth() && r.getFullYear() === e.getFullYear();
}
function qt(r, e) {
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
function Bt(r, e) {
  const t = new Date(r);
  return t.setHours(e), t;
}
function Kt(r, e) {
  const t = new Date(r);
  return t.setMinutes(e), t;
}
function jt(r, e) {
  const t = new Date(r);
  return t.setMonth(e), t;
}
function Ut(r, e) {
  const t = new Date(r);
  return t.setDate(e), t;
}
function _t(r, e) {
  const t = new Date(r);
  return t.setFullYear(e), t;
}
function F(r) {
  return new Date(r.getFullYear(), r.getMonth(), r.getDate(), 0, 0, 0, 0);
}
function ge(r) {
  return new Date(r.getFullYear(), r.getMonth(), r.getDate(), 23, 59, 59, 999);
}
class zt {
  constructor(e) {
    this.locale = e.locale, this.formats = e.formats;
  }
  date(e) {
    return pe(e);
  }
  toJsDate(e) {
    return e;
  }
  toISO(e) {
    return Dt(this, e);
  }
  parseISO(e) {
    return vt(e);
  }
  addMinutes(e, t) {
    return bt(e, t);
  }
  addHours(e, t) {
    return Mt(e, t);
  }
  addDays(e, t) {
    return R(e, t);
  }
  addWeeks(e, t) {
    return xt(e, t);
  }
  addMonths(e, t) {
    return kt(e, t);
  }
  getWeekArray(e, t) {
    const n = t !== void 0 ? Number(t) : void 0;
    return ft(e, this.locale, n);
  }
  startOfWeek(e, t) {
    const n = t !== void 0 ? Number(t) : void 0;
    return Y(e, this.locale, n);
  }
  endOfWeek(e) {
    return mt(e, this.locale);
  }
  startOfMonth(e) {
    return fe(e);
  }
  endOfMonth(e) {
    return me(e);
  }
  format(e, t) {
    return wt(e, t, this.locale, this.formats);
  }
  isEqual(e, t) {
    return re(e, t);
  }
  isValid(e) {
    return Vt(e);
  }
  isWithinRange(e, t) {
    return It(e, t);
  }
  isAfter(e, t) {
    return C(e, t);
  }
  isAfterDay(e, t) {
    return Yt(e, t);
  }
  isBefore(e, t) {
    return !C(e, t) && !re(e, t);
  }
  isSameDay(e, t) {
    return Nt(e, t);
  }
  isSameMonth(e, t) {
    return Wt(e, t);
  }
  isSameYear(e, t) {
    return qt(e, t);
  }
  setMinutes(e, t) {
    return Kt(e, t);
  }
  setHours(e, t) {
    return Bt(e, t);
  }
  setMonth(e, t) {
    return jt(e, t);
  }
  setDate(e, t) {
    return Ut(e, t);
  }
  setYear(e, t) {
    return _t(e, t);
  }
  getDiff(e, t, n) {
    return N(e, t, n);
  }
  getWeekdays(e) {
    const t = e !== void 0 ? Number(e) : void 0;
    return yt(this.locale, t);
  }
  getYear(e) {
    return $(e);
  }
  getMonth(e) {
    return St(e);
  }
  getWeek(e, t, n) {
    const s = t !== void 0 ? Number(t) : void 0;
    return At(e, this.locale, s, n);
  }
  getDate(e) {
    return Tt(e);
  }
  getNextMonth(e) {
    return Et(e);
  }
  getPreviousMonth(e) {
    return Ot(e);
  }
  getHours(e) {
    return Rt(e);
  }
  getMinutes(e) {
    return Pt(e);
  }
  startOfDay(e) {
    return F(e);
  }
  endOfDay(e) {
    return ge(e);
  }
  startOfYear(e) {
    return Ct(e);
  }
  endOfYear(e) {
    return Ft(e);
  }
}
const Ht = Symbol.for("vuetify:date-options"), ne = Symbol.for("vuetify:date-adapter");
function Lt(r, e) {
  const t = le({
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
  }, r);
  return {
    options: t,
    instance: Gt(t, e)
  };
}
function Gt(r, e) {
  const t = M(typeof r.adapter == "function" ? new r.adapter({
    locale: r.locale[e.current.value] ?? e.current.value,
    formats: r.formats
  }) : r.adapter);
  return A(e.current, (n) => {
    t.locale = r.locale[n] ?? n ?? t.locale;
  }), t;
}
function ye() {
  let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    blueprint: e,
    ...t
  } = r, n = le(e, t), {
    aliases: s = {},
    components: i = {},
    directives: a = {}
  } = n, u = _();
  return u.run(() => {
    const l = Ze(n.defaults), m = Je(n.display, n.ssr), f = Qe(n.theme), c = Xe(n.icons), h = et(n.locale), w = Lt(n.date, h), D = Ie(n.goTo, h);
    function E(d) {
      for (const p in a)
        d.directive(p, a[p]);
      for (const p in i)
        d.component(p, i[p]);
      for (const p in s)
        d.component(p, tt({
          ...s[p],
          name: p,
          aliasName: s[p].name
        }));
      const B = _();
      if (B.run(() => {
        f.install(d);
      }), d.onUnmount(() => B.stop()), d.provide(G, l), d.provide(Z, m), d.provide(J, f), d.provide(Q, c), d.provide(X, h), d.provide(Ht, w.options), d.provide(ne, w.instance), d.provide(Ve, D), rt && n.ssr)
        if (d.$nuxt)
          d.$nuxt.hook("app:suspense:resolve", () => {
            m.update();
          });
        else {
          const {
            mount: p
          } = d;
          d.mount = function() {
            const De = p(...arguments);
            return Ue(() => m.update()), d.mount = p, De;
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
              date: x.call(this, ne)
            });
          }
        }
      });
    }
    function O() {
      u.stop();
    }
    return {
      install: E,
      unmount: O,
      defaults: l,
      display: m,
      theme: f,
      icons: c,
      locale: h,
      date: w,
      goTo: D
    };
  });
}
const Zt = "3.8.9";
ye.version = Zt;
function x(r) {
  var n, s;
  const e = this.$, t = ((n = e.parent) == null ? void 0 : n.provides) ?? ((s = e.vnode.appContext) == null ? void 0 : s.provides);
  if (t && r in t)
    return t[r];
}
const Jt = {
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
      mdi: nt
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
  lighten4: "#c8e6c9",
  darken1: "#43a047"
}, se = {
  green: Qt
};
function Dr({ App: r = null, el: e = "#app", onLoad: t = !0, ...n } = {}) {
  function s() {
    const i = Xt(r, n), a = e ? i.mount(e) : null;
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
function Xt(r, { props: e = {}, vuetify: t = {}, plugins: n = null } = {}) {
  return r = _e(r, e), r.config.globalProperties.window = window, r.use(er(t)), r.use(Ye), $e(), n && n.forEach((s) => r.use(s)), r;
}
function er({ components: r = {}, defaults: e = {}, ...t }) {
  return t.components = {
    ...Le,
    ...r
  }, ye({
    blueprint: Jt,
    theme: {
      themes: {
        light: {
          dark: !1,
          colors: {
            primary: se.green.darken1,
            secondary: se.green.lighten4
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
function vr({ axiosConfig: r = null, baseURL: e = null } = {}) {
  e || (e = document.body.dataset.apiUrl);
  const t = Ne(), n = We({
    plugins: [
      lt({
        axios: He,
        ...r || ae.axiosConfig,
        baseURL: e
      })
    ]
  });
  return qe(t), t.use(n);
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
    var h, w, D, E, O;
    e = { ...this.opts, ...e };
    let { url: t, id: n, ids: s, repo: i, lookup: a, params: u, relations: l, path: m, ...f } = e;
    if (a ?? (a = "id__in"), i ?? (i = this.repo), (s == null ? void 0 : s.length) === 1 && (n = s[0], s = null), t || (t = (w = (h = i.use) == null ? void 0 : h.meta) == null ? void 0 : w.getUrl({ path: m, id: n })), n ? f.dataKey = null : "dataKey" in f || (f.dataKey = (O = (E = (D = i.use) == null ? void 0 : D.config) == null ? void 0 : E.axiosApi) == null ? void 0 : O.dataKey), s && a !== void 0) {
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
        if (l instanceof ie)
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
    const s = he(this.repo, t);
    if (!s)
      throw Error(`No Relation found for field ${t}.`);
    const i = s.related.constructor.entity, a = this.repos[i];
    if (!a)
      throw Error(`No repository "${i}" found.`);
    const u = de(s);
    if (!u)
      throw Error(`No source ids attributes for ${t}.`);
    const l = [...new Set(Be(e, u))];
    return new S(a, this.repos).all({ ...n, ids: l, repo: a });
  }
}
function tr(r, e, t = null) {
  if (typeof r == "string") {
    if (!(r in e))
      throw Error(`Repository "${r}" is not present in provided repositories.`);
    return new S(e[r], e, t);
  }
  return new S(r, e, t);
}
class we {
  constructor(e) {
    o(this, "state", b.none());
    o(this, "value", {});
    e && I(this, e), this.state || (this.state = new b()), this.value ?? (this.value = {}), this.empty ?? (this.empty = {}), this.initial ?? (this.initial = this.props.initial || this.empty), this.valid = !0, this.reset(this.initial);
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
  error(e) {
    var n;
    const t = this.state.isError && ((n = this.state.data) == null ? void 0 : n[e]);
    return t && this.initial[e] != this.value[e] && t.join(`
`) || "";
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
    Ke(this.value, e ?? this.empty), this.state.none();
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
      ...ae.axiosConfig.headers,
      "Content-Type": "multipart/form-data",
      ...t.headers
    } : e = this.serialize(e);
    const n = await this.send(e, t);
    return n.isOk ? (this.reset(n.data, !0), this.initial = g.cloneDeep(this.value), (s = this.saved) == null || s.call(this, this.value)) : this.state = n, this.state;
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
  async send(e, t) {
    throw "not implemented";
  }
}
class rr {
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
    const e = y(this.confirmTKey);
    return confirm(e);
  }
}
class nr {
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
class sr {
  constructor(e = null) {
    o(this, "state", b.none());
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
class ir extends sr {
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
  get length() {
    return this.ids.length;
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
    return !("filters" in t) && this.filters && (t.params = { ...this.filters, ...t.params ?? [] }), this.page_size && (t.params = { ...t.params, page_size: this.page_size }), super.getQueryOptions(t);
  }
  /**
   * Handle response from API: update owned items list and related information (next/prev url, total count).
   *
   * Theses informations will not be set if `options.save == false`. You
   * can however call this method later if you need to defer persistence.
   */
  async handleResponse({ append: t = !1, ...n }, s) {
    if (s = await super.handleResponse(n, s), !this.state.isError && n.save !== !1) {
      const i = g.map(s.entities, "id");
      this.setIds(i, t), this.nextUrl = s.response.data[this.nextKey] || null, this.prevUrl = s.response.data[this.prevKey] || null, this.count = s.response.data[this.countKey] || this.ids.length;
    }
    return s;
  }
  /**
   * Update ids with the provided ones.
   */
  setIds(t, n = !1) {
    typeof n == "number" ? this.ids.splice(n, 0, ...t) : n && this.ids.length ? this.ids = g.union(this.ids, t) : this.ids = t;
  }
}
class ar extends we {
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
  async send(e, t = {}) {
    let [n, s] = ["post", this.url];
    return this.value.id && (s = `${s}${this.value.id}/`, n = "put"), await this.repo.api()[n](s, e, t).then(
      (i) => b.ok(i.entities[0]),
      (i) => b.error(i.response.data)
    );
  }
}
class or extends rr {
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
        return y(U.model(s), 3);
      if ((a = this.view) != null && a.startsWith("detail.")) {
        if ((u = this.value) != null && u.$title)
          return this.value.$title;
        const m = y(U.model(s));
        return (l = this.value) != null && l.id ? y("models._.title", { model: m, id: this.value.id }) : y("models._.title.new", { model: m });
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
      tr(this.repo).fetch({ id: t, relations: this.relations }).then((s) => (super.show({ ...n, value: s.entities[0] }), s));
    else
      return super.show(n);
  }
}
function br(r) {
  const e = M(new nr(r));
  v("panels", e), oe(() => {
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
function ur(r, e) {
  const t = M(new e(r));
  return v("panel", t), oe(() => t.panels.register(t.name, t)), ue(() => t.panels.unregister(t.name)), { panel: t };
}
function Mr({ query: r, repos: e, ...t }) {
  e ?? (e = P("repos")), r ?? (r = new S(t.props.repo, e)), t.panels ?? (t.panels = P("panels"));
  const { list: n, items: s } = lr({
    query: r,
    relations: t.props.relations,
    fetchRelations: t.props.fetchRelations
  }), { panel: i } = ur({ list: n, ...t }, or), a = k(() => {
    const l = n.getSiblingIndex(z(i.value), 1);
    return s.value[l] ?? null;
  }), u = k(() => {
    const l = n.getSiblingIndex(z(i.value), -1);
    return s.value[l] ?? null;
  });
  return { panels: i.panels, panel: i, list: n, items: s, next: a, prev: u };
}
function lr(r, e = ir) {
  const t = M(new e(r)), n = t.repo.refs.acquireKey(), s = k(() => t.queryset(t.ids).orderBy((i) => t.ids.indexOf(i)).get());
  return A(() => t.ids, (i, a) => {
    g.isEqual(H(i), H(a)) || t.repo.refs.releaseAcquire(n, a, i);
  }), ue(() => t.repo.refs.flush(n)), v("list", t), v("items", s), { list: t, items: s, listId: n };
}
function xr(r, e = null, t) {
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
function cr(r, e = we) {
  r.initial || r.props.initial;
  const t = M(new e(r));
  v("editor", t);
  const n = k(() => t.isEdited());
  A(() => t.props.initial, (i) => {
    t.initial = i || t.empty, t.reset(i || t.empty);
  });
  const s = P("panel");
  return s && A(() => t.edited, (i) => s.setEdition(t.name, i)), { editor: t, edited: n };
}
function kr(r, e = ar) {
  return cr(r, e);
}
const Sr = {
  /** Field is required */
  required(r) {
    return r ? !0 : y("fields._.required");
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
    return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(r) || y("fields.email.rule");
  },
  /** Rule validating username */
  username(r) {
    return /^[A-Za-z0-9@.+\-_]+$/.test(r) || "Username must not be empty. It only can contain letters, numbers and @/+/./- special characters";
  }
};
function Ar(r, e) {
  return ze(() => import(r).then((t) => e ? (console.log(t, t.components, Object.keys(t)), Object.values(t).filter((s) => s.__name == e)[0]) : t));
}
export {
  dt as AppContext,
  we as Editor,
  sr as ModelController,
  ar as ModelEditor,
  ir as ModelList,
  or as ModelPanel,
  rr as Panel,
  nr as Panels,
  S as Query,
  b as State,
  Or as States,
  I as assignNonEmpty,
  Be as collectAttr,
  ae as config,
  Xt as createApp,
  Rr as createI18n,
  vr as createPinia,
  er as createVuetify,
  Pr as csrfToken,
  Ar as defineAsyncComponent,
  Cr as excludeValues,
  Fr as filterSlots,
  Ir as filterValues,
  Vr as getCookie,
  Yr as getCookieList,
  $r as getCsrf,
  Ye as i18n,
  Dr as init,
  Nr as injectOrProvide,
  Wr as mapToObject,
  gr as models,
  tr as query,
  Ke as reset,
  Sr as rules,
  qr as shallowCopy,
  Br as splitValues,
  y as t,
  U as tKeys,
  Kr as te,
  wr as useAction,
  yr as useAppContext,
  cr as useEditor,
  $e as useI18n,
  kr as useModelEditor,
  lr as useModelList,
  Mr as useModelPanel,
  ht as useModels,
  ur as usePanel,
  br as usePanels,
  xr as useQuery,
  ct as useRepo
};
//# sourceMappingURL=ox.js.map
