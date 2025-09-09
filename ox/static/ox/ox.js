var De = Object.defineProperty;
var ve = (n, e, t) => e in n ? De(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var o = (n, e, t) => ve(n, typeof e != "symbol" ? e + "" : e, t);
import { t as y, R as be, c as B, d as Me, l as g, a as se, H as ke, b as xe, e as Se, B as Ae, C as Te, G as Ee, M as Oe, f as Re, P as Pe, U as W, u as K, g as Ce, S as b, h as Fe, i as Ie, j as Ye, k as $e, m as Ve, n as Ne, o as ie, s as We, p as qe, q as I, r as je, v as U, w as Be } from "./index-DmxTQQmI.js";
import { F as Pr, x as Cr, D as Fr, K as Ir, z as Yr, A as $r, E as Vr, J as Nr, L as Wr, I as qr, y as jr } from "./index-DmxTQQmI.js";
import { inject as P, provide as v, reactive as M, computed as x, ref as Ke, watch as A, effectScope as _, nextTick as Ue, createApp as _e, onMounted as ae, onUnmounted as oe, unref as L, defineAsyncComponent as Le } from "vue";
import ze from "axios";
import * as He from "ox/vendor";
import { p as z, c as Ge, a as Ze, m as ue, b as Je, d as Qe, e as Xe, f as et, g as tt, h as rt, D as H, i as G, T as Z, I as J, L as Q, j as nt, k as st } from "./theme-DoSqMg68.js";
function X(n, e) {
  let t = `enums.${n}.${e}`, r = y(t);
  return r != t ? r : y(`enums.${n}._.${e}`);
}
const le = {
  get(n, e, t) {
    return e == "items" ? Object.keys(n).filter((r) => r[0] != "_").map((r) => ({
      value: n[r],
      title: X(n.__prefix, r)
    })) : e == "toString" ? (r) => X(t.__prefix, r) : Reflect.get(...arguments);
  }
};
function it(n, e) {
  return e.__prefix = n, new Proxy(e, le);
}
class at {
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
class ot {
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
    const r = new at(this.repository, t, e);
    return t.delete !== void 0 ? (await r.delete(), r) : (t.save && await r.save(), r);
  }
}
class ut extends be {
  constructor(t, r) {
    var s, i, a;
    super(t, r);
    o(this, "axios");
    o(this, "globalApiConfig");
    o(this, "apiConfig");
    this.axios = ((i = (s = B) == null ? void 0 : s.axiosApi) == null ? void 0 : i.axios) || null, this.globalApiConfig = ((a = B) == null ? void 0 : a.axiosApi) || {}, this.apiConfig = {};
  }
  api() {
    return lt(this);
  }
  setAxios(t) {
    return this.axios = t, this;
  }
}
function lt(n) {
  return new ot(n);
}
function ct(n) {
  return Me((e) => (e.config.axiosApi = n, e));
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
      for (var r of t)
        if (r in this.items) {
          const s = this.items[r];
          !s.includes(e) && s.push(e);
        } else
          this.items[r] = [e];
  }
  /** Release provided ids for this key */
  release(e, t) {
    if (!(t != null && t.length))
      return;
    const r = [];
    for (var s of t) {
      const i = this.items[s];
      g.pull(i, e), i != null && i.length || (r.push(s), delete this.items[s]);
    }
    r.length && this.repo.destroy(r);
  }
  /**
   * Release and acquire for this key.
   *
   * This optimizes out ids
   */
  releaseAcquire(e, t, r) {
    this.release(e, g.difference(t, r)), this.acquire(e, g.difference(r, t));
  }
  /** Release all reference for the provided context key. */
  flush(e) {
    const t = [];
    for (var r in this.refs) {
      const s = this.refs[r], i = s.indexOf(e);
      i != -1 && (s.splice(i, 1), s.length || (t.push(r), delete this.items[r]));
    }
    t.length && this.repo.destroy(t);
  }
  /** Clear reference counter without destroying items. **/
  clear() {
    this.refs = {};
  }
}
o(q, "_lastKey", 0);
class Y extends ut {
  constructor(t, r) {
    super(t, r);
    o(this, "refs");
    this.refs = new q(this);
  }
  flush() {
    this.refs.clear(), super.flush();
  }
}
function ce(n, e) {
  var t;
  if (typeof e == "string") {
    const r = (t = n.use) == null ? void 0 : t.fields(), s = r && r[e] || null;
    e = s instanceof se ? s : null;
  }
  return e;
}
function he(n) {
  return n instanceof ke || n instanceof xe || n instanceof Se || n instanceof Ae ? n.foreignKey : null;
}
const wr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentType: Te,
  Enum: it,
  Group: Ee,
  Meta: Oe,
  Model: Re,
  Permission: Pe,
  RefCounter: q,
  Repository: Y,
  User: W,
  asRelation: ce,
  enumProxy: le,
  getSourceKey: he
}, Symbol.toStringTag, { value: "Module" }));
function ht(n) {
  K(n);
  const e = Ce();
  return Y.useModel = n, K(Y, e);
}
function dt(n, { useInject: e = !0, useDefaults: t = !0, key: r = null } = {}) {
  var s = e && (P("repos") || {});
  const i = e && !!Object.keys(s).length;
  Array.isArray(n) || (n = Object.values(n)), t && n.push(W);
  for (const a of n)
    if (a && a.entity) {
      if (a.entity in s)
        continue;
      s[a.entity] = ht(a);
    }
  return !i && v("repos", s), s;
}
class ft {
  static reactive(e) {
    const t = M(new this(e));
    return t.user = x(() => {
      var r;
      return new W(((r = t.data) == null ? void 0 : r.user) || {});
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
    this.dataEl !== void 0 && (e === void 0 && (e = this.readData(this.dataEl)), e.dataEl = this.dataEl, this.data = e), this.models !== void 0 && (this.repos = dt(this.models));
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
function Dr(n, e = !0) {
  const t = ft.reactive(n);
  return e && t.dataEl && t.load(), v("context", t), v("user", t.user), t;
}
function vr({ props: n, user: e, emits: t = null }) {
  const r = Ke(!1), s = x(() => !n.permission || e.can(n.permission, n.item));
  return { processing: r, run: async (...a) => {
    if (n.confirm && !confirm(n.confirm))
      return;
    if (n.href)
      return window.open(n.href, "_blank");
    r.value = !0;
    let u = n.run(e, n.item, ...a);
    return u instanceof Promise && (u = await u), r.value = !1, t && t("completed", n.item, ...a), u;
  }, allowed: s };
}
function T(n) {
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
function mt(n, e, t) {
  var m;
  const r = [];
  let s = [];
  const i = de(n), a = fe(n), u = t ?? ((m = T(e)) == null ? void 0 : m.firstDay) ?? 0, l = (i.getDay() - u + 7) % 7, h = (a.getDay() - u + 7) % 7;
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
function $(n, e, t) {
  var i;
  let r = (t ?? ((i = T(e)) == null ? void 0 : i.firstDay) ?? 0) % 7;
  [0, 1, 2, 3, 4, 5, 6].includes(r) || (Ge("Invalid firstDayOfWeek, expected discrete number in range [0-6]"), r = 0);
  const s = new Date(n);
  for (; s.getDay() !== r; )
    s.setDate(s.getDate() - 1);
  return s;
}
function pt(n, e) {
  var s;
  const t = new Date(n), r = ((((s = T(e)) == null ? void 0 : s.firstDay) ?? 0) + 6) % 7;
  for (; t.getDay() !== r; )
    t.setDate(t.getDate() + 1);
  return t;
}
function de(n) {
  return new Date(n.getFullYear(), n.getMonth(), 1);
}
function fe(n) {
  return new Date(n.getFullYear(), n.getMonth() + 1, 0);
}
function gt(n) {
  const e = n.split("-").map(Number);
  return new Date(e[0], e[1] - 1, e[2]);
}
const yt = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
function me(n) {
  if (n == null) return /* @__PURE__ */ new Date();
  if (n instanceof Date) return n;
  if (typeof n == "string") {
    let e;
    if (yt.test(n))
      return gt(n);
    if (e = Date.parse(n), !isNaN(e)) return new Date(e);
  }
  return null;
}
const ee = new Date(2e3, 0, 2);
function wt(n, e, t) {
  var s;
  const r = e ?? ((s = T(n)) == null ? void 0 : s.firstDay) ?? 0;
  return Ze(7).map((i) => {
    const a = new Date(ee);
    return a.setDate(ee.getDate() + r + i), new Intl.DateTimeFormat(n, {
      weekday: t ?? "narrow"
    }).format(a);
  });
}
function Dt(n, e, t, r) {
  const s = me(n) ?? /* @__PURE__ */ new Date(), i = r == null ? void 0 : r[e];
  if (typeof i == "function")
    return i(s, e, t);
  let a = {};
  switch (e) {
    case "fullDate":
      a = {
        year: "numeric",
        month: "short",
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
function vt(n, e) {
  const t = n.toJsDate(e), r = t.getFullYear(), s = z(String(t.getMonth() + 1), 2, "0"), i = z(String(t.getDate()), 2, "0");
  return `${r}-${s}-${i}`;
}
function bt(n) {
  const [e, t, r] = n.split("-").map(Number);
  return new Date(e, t - 1, r);
}
function Mt(n, e) {
  const t = new Date(n);
  return t.setMinutes(t.getMinutes() + e), t;
}
function kt(n, e) {
  const t = new Date(n);
  return t.setHours(t.getHours() + e), t;
}
function R(n, e) {
  const t = new Date(n);
  return t.setDate(t.getDate() + e), t;
}
function xt(n, e) {
  const t = new Date(n);
  return t.setDate(t.getDate() + e * 7), t;
}
function St(n, e) {
  const t = new Date(n);
  return t.setDate(1), t.setMonth(t.getMonth() + e), t;
}
function V(n) {
  return n.getFullYear();
}
function At(n) {
  return n.getMonth();
}
function Tt(n, e, t, r) {
  const s = T(e), i = t ?? (s == null ? void 0 : s.firstDay) ?? 0, a = r ?? (s == null ? void 0 : s.firstWeekSize) ?? 1;
  function u(w) {
    const D = new Date(w, 0, 1);
    return 7 - N(D, $(D, e, i), "days");
  }
  let l = V(n);
  const h = R($(n, e, i), 6);
  l < V(h) && u(l + 1) >= a && l++;
  const m = new Date(l, 0, 1), c = u(l), d = c >= a ? R(m, c - 7) : R(m, c);
  return 1 + N(pe(n), F(d), "weeks");
}
function Et(n) {
  return n.getDate();
}
function Ot(n) {
  return new Date(n.getFullYear(), n.getMonth() + 1, 1);
}
function Rt(n) {
  return new Date(n.getFullYear(), n.getMonth() - 1, 1);
}
function Pt(n) {
  return n.getHours();
}
function Ct(n) {
  return n.getMinutes();
}
function Ft(n) {
  return new Date(n.getFullYear(), 0, 1);
}
function It(n) {
  return new Date(n.getFullYear(), 11, 31);
}
function Yt(n, e) {
  return C(n, e[0]) && Nt(n, e[1]);
}
function $t(n) {
  const e = new Date(n);
  return e instanceof Date && !isNaN(e.getTime());
}
function C(n, e) {
  return n.getTime() > e.getTime();
}
function Vt(n, e) {
  return C(F(n), F(e));
}
function Nt(n, e) {
  return n.getTime() < e.getTime();
}
function te(n, e) {
  return n.getTime() === e.getTime();
}
function Wt(n, e) {
  return n.getDate() === e.getDate() && n.getMonth() === e.getMonth() && n.getFullYear() === e.getFullYear();
}
function qt(n, e) {
  return n.getMonth() === e.getMonth() && n.getFullYear() === e.getFullYear();
}
function jt(n, e) {
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
function Bt(n, e) {
  const t = new Date(n);
  return t.setHours(e), t;
}
function Kt(n, e) {
  const t = new Date(n);
  return t.setMinutes(e), t;
}
function Ut(n, e) {
  const t = new Date(n);
  return t.setMonth(e), t;
}
function _t(n, e) {
  const t = new Date(n);
  return t.setDate(e), t;
}
function Lt(n, e) {
  const t = new Date(n);
  return t.setFullYear(e), t;
}
function F(n) {
  return new Date(n.getFullYear(), n.getMonth(), n.getDate(), 0, 0, 0, 0);
}
function pe(n) {
  return new Date(n.getFullYear(), n.getMonth(), n.getDate(), 23, 59, 59, 999);
}
class zt {
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
    return vt(this, e);
  }
  parseISO(e) {
    return bt(e);
  }
  addMinutes(e, t) {
    return Mt(e, t);
  }
  addHours(e, t) {
    return kt(e, t);
  }
  addDays(e, t) {
    return R(e, t);
  }
  addWeeks(e, t) {
    return xt(e, t);
  }
  addMonths(e, t) {
    return St(e, t);
  }
  getWeekArray(e, t) {
    const r = t !== void 0 ? Number(t) : void 0;
    return mt(e, this.locale, r);
  }
  startOfWeek(e, t) {
    const r = t !== void 0 ? Number(t) : void 0;
    return $(e, this.locale, r);
  }
  endOfWeek(e) {
    return pt(e, this.locale);
  }
  startOfMonth(e) {
    return de(e);
  }
  endOfMonth(e) {
    return fe(e);
  }
  format(e, t) {
    return Dt(e, t, this.locale, this.formats);
  }
  isEqual(e, t) {
    return te(e, t);
  }
  isValid(e) {
    return $t(e);
  }
  isWithinRange(e, t) {
    return Yt(e, t);
  }
  isAfter(e, t) {
    return C(e, t);
  }
  isAfterDay(e, t) {
    return Vt(e, t);
  }
  isBefore(e, t) {
    return !C(e, t) && !te(e, t);
  }
  isSameDay(e, t) {
    return Wt(e, t);
  }
  isSameMonth(e, t) {
    return qt(e, t);
  }
  isSameYear(e, t) {
    return jt(e, t);
  }
  setMinutes(e, t) {
    return Kt(e, t);
  }
  setHours(e, t) {
    return Bt(e, t);
  }
  setMonth(e, t) {
    return Ut(e, t);
  }
  setDate(e, t) {
    return _t(e, t);
  }
  setYear(e, t) {
    return Lt(e, t);
  }
  getDiff(e, t, r) {
    return N(e, t, r);
  }
  getWeekdays(e, t) {
    const r = e !== void 0 ? Number(e) : void 0;
    return wt(this.locale, r, t);
  }
  getYear(e) {
    return V(e);
  }
  getMonth(e) {
    return At(e);
  }
  getWeek(e, t, r) {
    const s = t !== void 0 ? Number(t) : void 0;
    return Tt(e, this.locale, s, r);
  }
  getDate(e) {
    return Et(e);
  }
  getNextMonth(e) {
    return Ot(e);
  }
  getPreviousMonth(e) {
    return Rt(e);
  }
  getHours(e) {
    return Pt(e);
  }
  getMinutes(e) {
    return Ct(e);
  }
  startOfDay(e) {
    return F(e);
  }
  endOfDay(e) {
    return pe(e);
  }
  startOfYear(e) {
    return Ft(e);
  }
  endOfYear(e) {
    return It(e);
  }
}
const Ht = Symbol.for("vuetify:date-options"), re = Symbol.for("vuetify:date-adapter");
function Gt(n, e) {
  const t = ue({
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
    instance: Zt(t, e)
  };
}
function Zt(n, e) {
  const t = M(typeof n.adapter == "function" ? new n.adapter({
    locale: n.locale[e.current.value] ?? e.current.value,
    formats: n.formats
  }) : n.adapter);
  return A(e.current, (r) => {
    t.locale = n.locale[r] ?? r ?? t.locale;
  }), t;
}
function ge() {
  let n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    blueprint: e,
    ...t
  } = n, r = ue(e, t), {
    aliases: s = {},
    components: i = {},
    directives: a = {}
  } = r, u = _();
  return u.run(() => {
    const l = Je(r.defaults), h = Qe(r.display, r.ssr), m = Xe(r.theme), c = et(r.icons), d = tt(r.locale), w = Gt(r.date, d), D = Fe(r.goTo, d);
    function E(f) {
      for (const p in a)
        f.directive(p, a[p]);
      for (const p in i)
        f.component(p, i[p]);
      for (const p in s)
        f.component(p, rt({
          ...s[p],
          name: p,
          aliasName: s[p].name
        }));
      const j = _();
      if (j.run(() => {
        m.install(f);
      }), f.onUnmount(() => j.stop()), f.provide(H, l), f.provide(G, h), f.provide(Z, m), f.provide(J, c), f.provide(Q, d), f.provide(Ht, w.options), f.provide(re, w.instance), f.provide(Ie, D), nt && r.ssr)
        if (f.$nuxt)
          f.$nuxt.hook("app:suspense:resolve", () => {
            h.update();
          });
        else {
          const {
            mount: p
          } = f;
          f.mount = function() {
            const we = p(...arguments);
            return Ue(() => h.update()), f.mount = p, we;
          };
        }
      f.mixin({
        computed: {
          $vuetify() {
            return M({
              defaults: k.call(this, H),
              display: k.call(this, G),
              theme: k.call(this, Z),
              icons: k.call(this, J),
              locale: k.call(this, Q),
              date: k.call(this, re)
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
      display: h,
      theme: m,
      icons: c,
      locale: d,
      date: w,
      goTo: D
    };
  });
}
const Jt = "3.9.6";
ge.version = Jt;
function k(n) {
  var r, s;
  const e = this.$, t = ((r = e.parent) == null ? void 0 : r.provides) ?? ((s = e.vnode.appContext) == null ? void 0 : s.provides);
  if (t && n in t)
    return t[n];
}
const Qt = {
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
      mdi: st
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
}, Xt = {
  lighten4: "#c8e6c9",
  darken1: "#43a047"
}, ne = {
  green: Xt
};
function br({ App: n = null, el: e = "#app", onLoad: t = !0, ...r } = {}) {
  function s() {
    const i = er(n, r), a = e ? i.mount(e) : null;
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
function er(n, { props: e = {}, vuetify: t = {}, plugins: r = null } = {}) {
  return n = _e(n, e), n.config.globalProperties.window = window, n.use(tr(t)), n.use(Ye), $e(), r && r.forEach((s) => n.use(s)), n;
}
function tr({ components: n = {}, defaults: e = {}, ...t }) {
  return t.components = {
    ...He,
    ...n
  }, ge({
    blueprint: Qt,
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
function Mr({ axiosConfig: n = null, baseURL: e = null } = {}) {
  e || (e = document.body.dataset.apiUrl);
  const t = Ve(), r = Ne({
    plugins: [
      ct({
        axios: ze,
        ...n || ie.axiosConfig,
        baseURL: e
      })
    ]
  });
  return We(t), t.use(r);
}
class S {
  /**
  * @param {Repos} [repos] all models repositories
  * @param {Repository<M>} [repo] the main repository
  */
  constructor(e, t = null, r) {
    this.repo = e, this.repos = t, this.opts = r;
  }
  /** Fetch items from api. */
  async fetch(e = {}) {
    var d, w, D, E, O;
    e = { ...this.opts, ...e };
    let { url: t, id: r, repo: s, lookup: i, params: a, relations: u, path: l, ...h } = e;
    i ?? (i = "id__in"), s ?? (s = this.repo);
    let m = null;
    if (Array.isArray(r) && (r.length == 1 ? r = r[0] : (m = r, r = null)), t || (t = (w = (d = s.use) == null ? void 0 : d.meta) == null ? void 0 : w.getUrl({ path: l, id: r })), r ? h.dataKey = null : "dataKey" in h || (h.dataKey = (O = (E = (D = s.use) == null ? void 0 : D.config) == null ? void 0 : E.axiosApi) == null ? void 0 : O.dataKey), m && i !== void 0) {
      if (r)
        throw Error("Both `ids` and `id` are provided while only one of those arguments is accepted.");
      a = { ...a || {} }, a[i] = m.join(",");
    }
    const c = await s.api().get(t, { ...h, params: a });
    return h.save === !1 && (c.entities = this.getEntities(c)), u && (c.relations = await this.relations(c.entities, u, { ...h, params: {} })), c;
  }
  /** Get entities from response **/
  getEntities(e) {
    const t = e.getDataFromResponse();
    return Array.isArray(t) ? t.map((r) => this.repo.make(r)) : [this.repo.make(t)];
  }
  /**
   * Fetch all items from api.
   *
   * @param [options.nextKey] response object key to get next url
   * @param [options.limit] max count of consecutive requests
   * @return Response of the first request, whoses ``entities`` has \
   * model instances of all requests.
   */
  async all({ nextKey: e = "next", limit: t = -1, flush: r = !1, ...s } = {}) {
    const i = await this.fetch({ flush: r, ...s });
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
  async relations(e, t, r = {}) {
    var a;
    this._ensureRepos("relations");
    const s = {}, i = (a = this.repo.use) == null ? void 0 : a.fields();
    if (i)
      for (const u of t) {
        const l = i[u];
        if (l instanceof se)
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
    const s = ce(this.repo, t);
    if (!s)
      throw Error(`No Relation found for field ${t}.`);
    const i = s.related.constructor.entity, a = this.repos[i];
    if (!a)
      throw Error(`No repository "${i}" found.`);
    const u = he(s);
    if (!u)
      throw Error(`No source ids attributes for ${t}.`);
    const l = [...new Set(qe(e, u))];
    return new S(a, this.repos).all({ ...r, id: l, repo: a });
  }
}
function rr(n, e, t = null) {
  if (typeof n == "string") {
    if (!(n in e))
      throw Error(`Repository "${n}" is not present in provided repositories.`);
    return new S(e[n], e, t);
  }
  return new S(n, e, t);
}
class ye {
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
    var r;
    const t = this.state.isError && ((r = this.state.data) == null ? void 0 : r[e]);
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
    je(this.value, e ?? this.empty), this.state.none();
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
    const r = await this.send(e, t);
    return r.isOk ? (this.reset(r.data, !0), this.initial = g.cloneDeep(this.value), (s = this.saved) == null || s.call(this, this.value)) : this.state = r, this.state;
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
  async send(e, t) {
    throw "not implemented";
  }
}
class nr {
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
    return (e != this.view || t != this.value) && (s || this.canLeave()) ? (this.view = e || this.index, this.value = t, !r && this.updateLocation(), !0) : !1;
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
  canLeave() {
    if (!this.edited)
      return !0;
    const e = y(this.confirmTKey);
    return confirm(e);
  }
}
class sr {
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
    if (e || this.canLeave()) {
      if (t && window.location.pathname != t) {
        if (!r.panel)
          throw Error("The attribute `href` requires`panel`.");
        t = `${t}?panel=${r.panel}`, r.view && (t = `${t}&view=${r.view || ""}`), window.location.href = t;
        return;
      }
      this.reset(r);
    }
  }
  /** Return whether we can change page/panel. */
  canLeave() {
    return this.current ? this.current.canLeave() : !0;
  }
  reset({ panel: e, silent: t = !1, ...r }) {
    var i;
    e && e != this.panel && !this.canLeave() || (this.panel = e || this.panel, this.params = r, this.current = this.children[this.panel], (i = this.current) == null || i.show({ ...this.params, silent: t }));
  }
}
class ir {
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
    let r = this.repo.query();
    if (this.relations)
      for (const s of this.relations)
        r = r.with(s);
    return e !== null && (r = r.whereId(e)), t ? r.first() : r;
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
      console.log(r), this.state.error(r);
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
    return e.all ? this.query.fetch : this.query.all, await this.query.fetch(t);
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
class ar extends ir {
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
    this.ids.splice(0);
  }
  /** Reset list */
  reset(t = []) {
    this.ids = [...t], this.nextUrl = null, this.prevUrl = null, this.count = this.ids.length;
  }
  /** Get item index by id */
  //findIndex(id: number): number { return this.items.findIndex((v) => v.id == id) }
  /** Add item if not present in list.
  *
  * @param id - item id to insert
  * @param index - if provided insert at this position
  * @return item index if already in the list, else insertion one
  */
  add(t, r = null) {
    const s = this.ids.indexOf(t);
    return s != -1 ? s : r !== null ? (this.ids.splice(r, 0, t), r) : (this.ids.push(t), this.ids.length - 1);
  }
  /** Remove item by id from list if present. */
  remove(t) {
    const r = this.ids.indexOf(t);
    r != -1 && this.ids.splice(r, 1);
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
    const s = this.ids.indexOf(t.id), i = s >= 0 ? s + r : -1;
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
  async handleResponse({ append: t = !1, ...r }, s) {
    if (s = await super.handleResponse(r, s), !this.state.isError && r.save !== !1) {
      const i = g.map(s.entities, "id");
      this.update(i, t), this.nextUrl = s.response.data[this.nextKey] || null, this.prevUrl = s.response.data[this.prevKey] || null, this.count = s.response.data[this.countKey] || this.ids.length;
    }
    return s;
  }
  /**
   * Update the list with the provided ids
   *
   * @param {ModelId[]} ids - The ids to add to the list
   * @param {boolean|number} append - When `true`, append items. When a number, insert at the provided position. \
   *                                  When `false`, remove all previous ids.
   */
  update(t, r = !1) {
    typeof r == "number" ? this.ids.splice(r, 0, ...t) : r && this.ids.length ? this.ids = g.union(this.ids, t) : this.ids = t;
  }
  /**
   * Update the list with the provided items.
   *
   * It first insert items in the repository before calling {@link ModelList.update}.
   *
   * @param {Model[]} items - The items to insert and add to the list.
   * @param ...args - Arguments passed down to {@link ModelList.update}.
   */
  updateWith(t, ...r) {
    this.repo.insert(t), this.update(t.map((s) => s.id), ...r);
  }
}
class or extends ye {
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
    var t, r;
    const e = super.url || ((r = (t = this.repo.use) == null ? void 0 : t.meta) == null ? void 0 : r.url);
    if (!e)
      throw Error("No url specified as parameter or in Model.meta.");
    return e;
  }
  reset(e) {
    (!e || !Object.keys(e).length) && (e = this.empty);
    const t = this.fields.filter((r) => r in e);
    this.value = g.cloneDeep(g.pick(e, t)) || {}, this.state.none();
  }
  serialize(e) {
    const t = this.repo.use;
    return new t({ ...this.value }).$toJson(null, { relations: !1 });
  }
  async send(e, t = {}) {
    let [r, s] = ["post", this.url];
    return this.value.id && (s = `${s}${this.value.id}/`, r = "put"), await this.repo.api()[r](s, e, t).then(
      (i) => b.ok(i.entities[0]),
      (i) => b.error(i.response.data)
    );
  }
}
class ur extends nr {
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
        return y(U.model(s), 3);
      if ((a = this.view) != null && a.startsWith("detail.")) {
        if ((u = this.value) != null && u.$title)
          return this.value.$title;
        const h = y(U.model(s));
        return (l = this.value) != null && l.id ? y("models._.title", { model: h, id: this.value.id }) : y("models._.title.new", { model: h });
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
      rr(this.repo).fetch({ id: t, relations: this.relations }).then((s) => (super.show({ ...r, value: s.entities[0] }), s));
    else
      return super.show(r);
  }
}
function kr(n) {
  const e = M(new sr(n));
  v("panels", e), ae(() => {
    e.readDocumentLocation(), e.panel && e.show({
      panel: e.panel,
      silent: !0,
      ...e.params
    });
  }), window.addEventListener("popstate", (r) => {
    r.state && e.show({ ...r.state, silent: !0 });
  });
  const t = document.title;
  return A(() => {
    var r;
    return (r = e.current) == null ? void 0 : r.title;
  }, (r) => {
    r ? document.title = `${r} | ${t}` : document.title = t;
  }), e;
}
function lr(n, e) {
  const t = M(new e(n));
  return v("panel", t), ae(() => t.panels.register(t.name, t)), oe(() => t.panels.unregister(t.name)), { panel: t };
}
function xr({ query: n, repos: e, ...t }) {
  e ?? (e = P("repos")), n ?? (n = new S(t.props.repo, e)), t.panels ?? (t.panels = P("panels"));
  const { list: r, items: s } = cr({
    query: n,
    relations: t.props.relations,
    fetchRelations: t.props.fetchRelations
  }), { panel: i } = lr({ list: r, ...t }, ur), a = x(() => {
    const l = r.getSiblingIndex(L(i.value), 1);
    return s.value[l] ?? null;
  }), u = x(() => {
    const l = r.getSiblingIndex(L(i.value), -1);
    return s.value[l] ?? null;
  });
  return { panels: i.panels, panel: i, list: r, items: s, next: a, prev: u };
}
function cr(n, e = ar) {
  const t = M(new e(n)), r = t.repo.refs.acquireKey(), s = x(() => t.length ? t.queryset(t.ids).orderBy((i) => t.ids.indexOf(i)).get() : []);
  return A(
    () => t.ids,
    Be((i, a) => t.repo.refs.releaseAcquire(r, a, i))
  ), oe(() => t.repo.refs.flush(r)), v("list", t), v("items", s), { list: t, items: s, listId: r };
}
function Sr(n, e = null, t) {
  const r = new S(n, e, t), s = b.none();
  async function i(a) {
    s.processing();
    let u = null;
    try {
      u = await r.fetch(a), s.none();
    } catch (l) {
      s.error(l);
    }
    return u;
  }
  return { state: s, query: r, fetch: i };
}
function hr(n, e = ye) {
  n.initial || n.props.initial;
  const t = M(new e(n));
  v("editor", t);
  const r = x(() => t.isEdited());
  A(() => t.props.initial, (i) => {
    t.initial = i || t.empty, t.reset(i || t.empty);
  });
  const s = P("panel");
  return s && A(() => t.edited, (i) => s.setEdition(t.name, i)), { editor: t, edited: r };
}
function Ar(n, e = or) {
  return hr(n, e);
}
const Tr = {
  /** Field is required */
  required(n) {
    return n || n === 0 ? !0 : y("fields._.required");
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
    return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(n) || y("fields.email.rule");
  },
  /** Rule validating username */
  username(n) {
    return /^[A-Za-z0-9@.+\-_]+$/.test(n) || "Username must not be empty. It only can contain letters, numbers and @/+/./- special characters";
  }
};
function Er(n, e) {
  return Le(() => import(n).then((t) => (n.endsWith(".js") && dr(import.meta.resolve(n.replace(/\.js$/, ".css"))), e ? Object.values(t).filter((s) => s.__name == e)[0] : t)));
}
function dr(n) {
  return new Promise((e, t) => {
    if (document.querySelector(`link[href="${n}"]`)) {
      e();
      return;
    }
    const r = document.createElement("link");
    r.rel = "stylesheet", r.href = n, r.onload = () => e(), r.onerror = (s) => t(s), document.head.appendChild(r);
  });
}
export {
  ft as AppContext,
  ye as Editor,
  ir as ModelController,
  or as ModelEditor,
  ar as ModelList,
  ur as ModelPanel,
  nr as Panel,
  sr as Panels,
  S as Query,
  b as State,
  Pr as States,
  I as assignNonEmpty,
  qe as collectAttr,
  ie as config,
  er as createApp,
  Cr as createI18n,
  Mr as createPinia,
  tr as createVuetify,
  Fr as csrfToken,
  Er as defineAsyncComponent,
  Ir as filterSlots,
  Yr as getCookie,
  $r as getCookieList,
  Vr as getCsrf,
  Ye as i18n,
  Nr as ifNotEqual,
  Be as ifNotEqualFn,
  br as init,
  Wr as injectOrProvide,
  qr as mapToObject,
  wr as models,
  rr as query,
  je as reset,
  Tr as rules,
  y as t,
  U as tKeys,
  jr as te,
  vr as useAction,
  Dr as useAppContext,
  hr as useEditor,
  $e as useI18n,
  Ar as useModelEditor,
  cr as useModelList,
  xr as useModelPanel,
  dt as useModels,
  lr as usePanel,
  kr as usePanels,
  Sr as useQuery,
  ht as useRepo
};
//# sourceMappingURL=ox.js.map
