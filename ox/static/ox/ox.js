var Pr = Object.defineProperty;
var Rr = (e, t, n) => t in e ? Pr(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var P = (e, t, n) => Rr(e, typeof t != "symbol" ? t + "" : t, n);
import { R as Gn, H as Mr, a as Fr, b as Ur, B as Wr, C as xr, G as $r, M as Vr, c as Yr, P as Hr, d as bt, U as Ut, e as jr, g as Gr, u as Kn, f as Kr, h as Zt, S as Ne, i as Br, j as Wt, k as Xr, l as qr, s as Jr, m as Zr, n as Ze, r as Qr, o as _e } from "./lodash-BWLCdQPa.js";
import { v as qo, q as Jo, A as Zo, D as Qo, z as zo, p as el, t as tl, E as nl, w as rl, x as sl, y as al } from "./lodash-BWLCdQPa.js";
import { inject as ke, provide as ce, computed as ee, unref as ye, reactive as Ee, ref as Bn, watch as ne, effectScope as Lt, nextTick as zr, shallowRef as es, isRef as ts, defineComponent as xt, getCurrentInstance as Pe, h as Xn, Fragment as qn, onMounted as Jn, onUnmounted as Zn, createVNode as ns, Text as rs, createApp as ss, defineAsyncComponent as as } from "vue";
import is from "axios";
import * as os from "ox/vendor";
import { p as Qt, c as ls, m as Qn, a as cs, b as us, d as fs, e as ms, f as ds, g as hs, h as _s, D as zt, i as en, T as tn, I as nn, L as rn, G as gs, j as ps, k as ys } from "./theme-BrdPdMMA.js";
function zn(e, t) {
  var n;
  if (typeof t == "string") {
    const r = (n = e.use) == null ? void 0 : n.fields(), s = r && r[t] || null;
    t = s instanceof Gn ? s : null;
  }
  return t;
}
function er(e) {
  return e instanceof Mr || e instanceof Fr || e instanceof Ur || e instanceof Wr ? e.foreignKey : null;
}
const Mo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentType: xr,
  Group: $r,
  Meta: Vr,
  Model: Yr,
  Permission: Hr,
  Permissions: bt,
  User: Ut,
  asRelation: zn,
  getSourceKey: er
}, Symbol.toStringTag, { value: "Module" }));
class Es {
  /**
   * Create a new response instance.
   */
  constructor(t, n, r) {
    /**
     * The repository that called the request.
     */
    P(this, "repository");
    /**
     * The request configuration.
     */
    P(this, "config");
    /**
     * The axios response instance.
     */
    P(this, "response");
    /**
     * Entities created by Pinia ORM.
     */
    P(this, "entities", null);
    /**
     * Whether if response data is saved to the store or not.
     */
    P(this, "isSaved", !1);
    this.repository = t, this.config = n, this.response = r;
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
    let n = this.config.persistBy || "save";
    this.validatePersistAction(n) || (console.warn(
      '[Pinia ORM Axios] The "persistBy" option configured is not a recognized value. Response data will be persisted by the default `save` method.'
    ), n = "save");
    const r = await this.repository[n](t);
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
class bs {
  /**
   * Create a new api instance.
   */
  constructor(t) {
    /**
     * The repository class.
     */
    P(this, "repository");
    /**
     * The default config.
     */
    P(this, "config", {
      save: !0
    });
    this.repository = t, this.registerActions();
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
    var n, r, s;
    const t = { ...(n = this.repository.config.axiosApi) == null ? void 0 : n.actions, ...(s = (r = this.repository.getModel().$config()) == null ? void 0 : r.axiosApi) == null ? void 0 : s.actions };
    if (t)
      for (const a in t) {
        const i = t[a];
        typeof i == "function" ? this.registerFunctionAction(a, i) : this.registerObjectAction(a, i);
      }
  }
  /**
   * Register the given object action.
   */
  registerObjectAction(t, n) {
    this[t] = (r) => this.request({ ...n, ...r });
  }
  /**
   * Register the given function action.
   */
  registerFunctionAction(t, n) {
    this[t] = n.bind(this);
  }
  /**
   * Perform a get request.
   */
  get(t, n = {}) {
    return this.request({ method: "get", url: t, ...n });
  }
  /**
   * Perform a post request.
   */
  post(t, n = {}, r = {}) {
    return this.request({ method: "post", url: t, data: n, ...r });
  }
  /**
   * Perform a put request.
   */
  put(t, n = {}, r = {}) {
    return this.request({ method: "put", url: t, data: n, ...r });
  }
  /**
   * Perform a patch request.
   */
  patch(t, n = {}, r = {}) {
    return this.request({ method: "patch", url: t, data: n, ...r });
  }
  /**
   * Perform a delete request.
   */
  delete(t, n = {}) {
    return this.request({ method: "delete", url: t, ...n });
  }
  /**
   * Perform an api request.
   */
  async request(t) {
    const n = this.createConfig(t), r = await this.axios.request(n);
    return this.createResponse(r, n);
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
  async createResponse(t, n) {
    const r = new Es(this.repository, n, t);
    return n.delete !== void 0 ? (await r.delete(), r) : (n.save && await r.save(), r);
  }
}
class sn extends Kr {
  constructor(n, r) {
    var s, a, i;
    super(n, r);
    P(this, "axios");
    P(this, "globalApiConfig");
    P(this, "apiConfig");
    this.axios = ((a = (s = Zt) == null ? void 0 : s.axiosApi) == null ? void 0 : a.axios) || null, this.globalApiConfig = ((i = Zt) == null ? void 0 : i.axiosApi) || {}, this.apiConfig = {};
  }
  api() {
    return Ls(this);
  }
  setAxios(n) {
    return this.axios = n, this;
  }
}
function Ls(e) {
  return new bs(e);
}
function Ts(e) {
  const t = Gr();
  return sn.useModel = e, Kn(sn, t);
}
function Is(e) {
  return jr((t) => (t.config.axiosApi = e, t));
}
function vs(e, { useInject: t = !0, useDefaults: n = !0 } = {}) {
  var r = t && (ke("repos") || {});
  const s = t && !!Object.keys(r).length;
  Array.isArray(e) || (e = Object.values(e)), n && e.push(Ut);
  for (const a of e)
    if (a && a.entity) {
      if (a.entity in r)
        continue;
      Kn(a), r[a.entity] = Ts(a);
    }
  return !s && ce("repos", r), r;
}
function Fo() {
  return {
    permissions: [String, Function, Object, Array]
  };
}
function Ds(e, t, n) {
  const r = t instanceof bt ? t : new bt(t), s = ee(() => r.can(ye(e), ye(n)));
  return { permissions: r, allowed: s };
}
class ks {
  static reactive(t) {
    const n = Ee(new this(t));
    return n.user = ee(() => {
      var r;
      return new Ut(((r = n.data) == null ? void 0 : r.user) || {});
    }), n;
  }
  constructor(t = {}) {
    Object.assign(this, t), this.state = Ne.none(), this.showState = !1;
  }
  /**
   * Load data into AppData. If no `value` is provided, read it from
   * source element.
   */
  load(t = void 0) {
    this.dataEl !== void 0 && (t === void 0 && (t = this.readData(this.dataEl)), t.dataEl = this.dataEl, this.data = t), this.models !== void 0 && (this.repos = vs(this.models));
  }
  /**
   * Read data from the context of provided source element.
   * @param {String} el - id of the DOM element.
   * @return {Object} read data
   */
  readData(t) {
    const n = document.getElementById(t);
    if (!n)
      throw "Element {elementId} not found";
    return n.innerText ? JSON.parse(n.innerText) : {};
  }
}
function Uo(e, t = !0) {
  const n = ks.reactive(e);
  return t && n.dataEl && n.load(), ce("context", n), ce("user", n.user), n;
}
function Wo({ props: e, user: t, emits: n = null }) {
  const r = Bn(!1), { permissions: s, allowed: a } = Ds(t, e.permissions, e.item);
  return { processing: r, permissions: s, allowed: a, run: async (...c) => {
    if (e.confirm && !confirm(e.confirm))
      return;
    if (!a.value)
      throw Error("You are not allowed to execute this action");
    if (r.value = !0, e.href) {
      document.location.href = e.href;
      return;
    }
    let u = e.run(t, e.item, ...c);
    return u instanceof Promise && (u = await u), r.value = !1, n && n("completed", e.item, ...c), u;
  } };
}
function xe(e) {
  const t = e.slice(-2).toUpperCase();
  switch (!0) {
    case e === "GB-alt-variant":
      return {
        firstDay: 0,
        firstWeekSize: 4
      };
    case e === "001":
      return {
        firstDay: 1,
        firstWeekSize: 1
      };
    case `AG AS BD BR BS BT BW BZ CA CO DM DO ET GT GU HK HN ID IL IN JM JP KE
    KH KR LA MH MM MO MT MX MZ NI NP PA PE PH PK PR PY SA SG SV TH TT TW UM US
    VE VI WS YE ZA ZW`.includes(t):
      return {
        firstDay: 0,
        firstWeekSize: 1
      };
    case `AI AL AM AR AU AZ BA BM BN BY CL CM CN CR CY EC GE HR KG KZ LB LK LV
    MD ME MK MN MY NZ RO RS SI TJ TM TR UA UY UZ VN XK`.includes(t):
      return {
        firstDay: 1,
        firstWeekSize: 1
      };
    case `AD AN AT AX BE BG CH CZ DE DK EE ES FI FJ FO FR GB GF GP GR HU IE IS
    IT LI LT LU MC MQ NL NO PL RE RU SE SK SM VA`.includes(t):
      return {
        firstDay: 1,
        firstWeekSize: 4
      };
    case "AE AF BH DJ DZ EG IQ IR JO KW LY OM QA SD SY".includes(t):
      return {
        firstDay: 6,
        firstWeekSize: 1
      };
    case t === "MV":
      return {
        firstDay: 5,
        firstWeekSize: 1
      };
    case t === "PT":
      return {
        firstDay: 0,
        firstWeekSize: 4
      };
    default:
      return null;
  }
}
function Ns(e, t, n) {
  var T;
  const r = [];
  let s = [];
  const a = tr(e), i = nr(e), c = n ?? ((T = xe(t)) == null ? void 0 : T.firstDay) ?? 0, u = (a.getDay() - c + 7) % 7, d = (i.getDay() - c + 7) % 7;
  for (let y = 0; y < u; y++) {
    const _ = new Date(a);
    _.setDate(_.getDate() - (u - y)), s.push(_);
  }
  for (let y = 1; y <= i.getDate(); y++) {
    const _ = new Date(e.getFullYear(), e.getMonth(), y);
    s.push(_), s.length === 7 && (r.push(s), s = []);
  }
  for (let y = 1; y < 7 - d; y++) {
    const _ = new Date(i);
    _.setDate(_.getDate() + y), s.push(_);
  }
  return s.length > 0 && r.push(s), r;
}
function Tt(e, t, n) {
  var a;
  const r = n ?? ((a = xe(t)) == null ? void 0 : a.firstDay) ?? 0, s = new Date(e);
  for (; s.getDay() !== r; )
    s.setDate(s.getDate() - 1);
  return s;
}
function Ss(e, t) {
  var s;
  const n = new Date(e), r = ((((s = xe(t)) == null ? void 0 : s.firstDay) ?? 0) + 6) % 7;
  for (; n.getDay() !== r; )
    n.setDate(n.getDate() + 1);
  return n;
}
function tr(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function nr(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function Os(e) {
  const t = e.split("-").map(Number);
  return new Date(t[0], t[1] - 1, t[2]);
}
const ws = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
function rr(e) {
  if (e == null) return /* @__PURE__ */ new Date();
  if (e instanceof Date) return e;
  if (typeof e == "string") {
    let t;
    if (ws.test(e))
      return Os(e);
    if (t = Date.parse(e), !isNaN(t)) return new Date(t);
  }
  return null;
}
const an = new Date(2e3, 0, 2);
function As(e, t) {
  var r;
  const n = t ?? ((r = xe(e)) == null ? void 0 : r.firstDay) ?? 0;
  return ls(7).map((s) => {
    const a = new Date(an);
    return a.setDate(an.getDate() + n + s), new Intl.DateTimeFormat(e, {
      weekday: "narrow"
    }).format(a);
  });
}
function Cs(e, t, n, r) {
  const s = rr(e) ?? /* @__PURE__ */ new Date(), a = r == null ? void 0 : r[t];
  if (typeof a == "function")
    return a(s, t, n);
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
      const c = s.getDate(), u = new Intl.DateTimeFormat(n, {
        month: "long"
      }).format(s);
      return `${c} ${u}`;
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
      return new Intl.NumberFormat(n).format(s.getDate());
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
        minute: "numeric"
      };
      break;
    case "fullTime12h":
      i = {
        hour: "numeric",
        minute: "numeric",
        hour12: !0
      };
      break;
    case "fullTime24h":
      i = {
        hour: "numeric",
        minute: "numeric",
        hour12: !1
      };
      break;
    case "fullDateTime":
      i = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
      };
      break;
    case "fullDateTime12h":
      i = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: !0
      };
      break;
    case "fullDateTime24h":
      i = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
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
      return i = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric"
      }, new Intl.DateTimeFormat(n, i).format(s).replace(/, /g, " ");
    case "keyboardDateTime12h":
      return i = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: !0
      }, new Intl.DateTimeFormat(n, i).format(s).replace(/, /g, " ");
    case "keyboardDateTime24h":
      return i = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: !1
      }, new Intl.DateTimeFormat(n, i).format(s).replace(/, /g, " ");
    default:
      i = a ?? {
        timeZone: "UTC",
        timeZoneName: "short"
      };
  }
  return new Intl.DateTimeFormat(n, i).format(s);
}
function Ps(e, t) {
  const n = e.toJsDate(t), r = n.getFullYear(), s = Qt(String(n.getMonth() + 1), 2, "0"), a = Qt(String(n.getDate()), 2, "0");
  return `${r}-${s}-${a}`;
}
function Rs(e) {
  const [t, n, r] = e.split("-").map(Number);
  return new Date(t, n - 1, r);
}
function Ms(e, t) {
  const n = new Date(e);
  return n.setMinutes(n.getMinutes() + t), n;
}
function Fs(e, t) {
  const n = new Date(e);
  return n.setHours(n.getHours() + t), n;
}
function Be(e, t) {
  const n = new Date(e);
  return n.setDate(n.getDate() + t), n;
}
function Us(e, t) {
  const n = new Date(e);
  return n.setDate(n.getDate() + t * 7), n;
}
function Ws(e, t) {
  const n = new Date(e);
  return n.setDate(1), n.setMonth(n.getMonth() + t), n;
}
function It(e) {
  return e.getFullYear();
}
function xs(e) {
  return e.getMonth();
}
function $s(e, t, n, r) {
  const s = xe(t), a = n ?? (s == null ? void 0 : s.firstDay) ?? 0, i = r ?? (s == null ? void 0 : s.firstWeekSize) ?? 1;
  function c(v) {
    const O = new Date(v, 0, 1);
    return 7 - vt(O, Tt(O, t, a), "days");
  }
  let u = It(e);
  const d = Be(Tt(e, t, a), 6);
  u < It(d) && c(u + 1) >= i && u++;
  const T = new Date(u, 0, 1), y = c(u), _ = y >= i ? Be(T, y - 7) : Be(T, y);
  return 1 + vt(e, _, "weeks");
}
function Vs(e) {
  return e.getDate();
}
function Ys(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 1);
}
function Hs(e) {
  return new Date(e.getFullYear(), e.getMonth() - 1, 1);
}
function js(e) {
  return e.getHours();
}
function Gs(e) {
  return e.getMinutes();
}
function Ks(e) {
  return new Date(e.getFullYear(), 0, 1);
}
function Bs(e) {
  return new Date(e.getFullYear(), 11, 31);
}
function Xs(e, t) {
  return qe(e, t[0]) && Zs(e, t[1]);
}
function qs(e) {
  const t = new Date(e);
  return t instanceof Date && !isNaN(t.getTime());
}
function qe(e, t) {
  return e.getTime() > t.getTime();
}
function Js(e, t) {
  return qe(Dt(e), Dt(t));
}
function Zs(e, t) {
  return e.getTime() < t.getTime();
}
function on(e, t) {
  return e.getTime() === t.getTime();
}
function Qs(e, t) {
  return e.getDate() === t.getDate() && e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function zs(e, t) {
  return e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function ea(e, t) {
  return e.getFullYear() === t.getFullYear();
}
function vt(e, t, n) {
  const r = new Date(e), s = new Date(t);
  switch (n) {
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
function ta(e, t) {
  const n = new Date(e);
  return n.setHours(t), n;
}
function na(e, t) {
  const n = new Date(e);
  return n.setMinutes(t), n;
}
function ra(e, t) {
  const n = new Date(e);
  return n.setMonth(t), n;
}
function sa(e, t) {
  const n = new Date(e);
  return n.setDate(t), n;
}
function aa(e, t) {
  const n = new Date(e);
  return n.setFullYear(t), n;
}
function Dt(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate(), 0, 0, 0, 0);
}
function ia(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate(), 23, 59, 59, 999);
}
class oa {
  constructor(t) {
    this.locale = t.locale, this.formats = t.formats;
  }
  date(t) {
    return rr(t);
  }
  toJsDate(t) {
    return t;
  }
  toISO(t) {
    return Ps(this, t);
  }
  parseISO(t) {
    return Rs(t);
  }
  addMinutes(t, n) {
    return Ms(t, n);
  }
  addHours(t, n) {
    return Fs(t, n);
  }
  addDays(t, n) {
    return Be(t, n);
  }
  addWeeks(t, n) {
    return Us(t, n);
  }
  addMonths(t, n) {
    return Ws(t, n);
  }
  getWeekArray(t, n) {
    const r = n !== void 0 ? Number(n) : void 0;
    return Ns(t, this.locale, r);
  }
  startOfWeek(t, n) {
    const r = n !== void 0 ? Number(n) : void 0;
    return Tt(t, this.locale, r);
  }
  endOfWeek(t) {
    return Ss(t, this.locale);
  }
  startOfMonth(t) {
    return tr(t);
  }
  endOfMonth(t) {
    return nr(t);
  }
  format(t, n) {
    return Cs(t, n, this.locale, this.formats);
  }
  isEqual(t, n) {
    return on(t, n);
  }
  isValid(t) {
    return qs(t);
  }
  isWithinRange(t, n) {
    return Xs(t, n);
  }
  isAfter(t, n) {
    return qe(t, n);
  }
  isAfterDay(t, n) {
    return Js(t, n);
  }
  isBefore(t, n) {
    return !qe(t, n) && !on(t, n);
  }
  isSameDay(t, n) {
    return Qs(t, n);
  }
  isSameMonth(t, n) {
    return zs(t, n);
  }
  isSameYear(t, n) {
    return ea(t, n);
  }
  setMinutes(t, n) {
    return na(t, n);
  }
  setHours(t, n) {
    return ta(t, n);
  }
  setMonth(t, n) {
    return ra(t, n);
  }
  setDate(t, n) {
    return sa(t, n);
  }
  setYear(t, n) {
    return aa(t, n);
  }
  getDiff(t, n, r) {
    return vt(t, n, r);
  }
  getWeekdays(t) {
    const n = t !== void 0 ? Number(t) : void 0;
    return As(this.locale, n);
  }
  getYear(t) {
    return It(t);
  }
  getMonth(t) {
    return xs(t);
  }
  getWeek(t, n, r) {
    const s = n !== void 0 ? Number(n) : void 0;
    return $s(t, this.locale, s, r);
  }
  getDate(t) {
    return Vs(t);
  }
  getNextMonth(t) {
    return Ys(t);
  }
  getPreviousMonth(t) {
    return Hs(t);
  }
  getHours(t) {
    return js(t);
  }
  getMinutes(t) {
    return Gs(t);
  }
  startOfDay(t) {
    return Dt(t);
  }
  endOfDay(t) {
    return ia(t);
  }
  startOfYear(t) {
    return Ks(t);
  }
  endOfYear(t) {
    return Bs(t);
  }
}
const la = Symbol.for("vuetify:date-options"), ln = Symbol.for("vuetify:date-adapter");
function ca(e, t) {
  const n = Qn({
    adapter: oa,
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
  }, e);
  return {
    options: n,
    instance: ua(n, t)
  };
}
function ua(e, t) {
  const n = Ee(typeof e.adapter == "function" ? new e.adapter({
    locale: e.locale[t.current.value] ?? t.current.value,
    formats: e.formats
  }) : e.adapter);
  return ne(t.current, (r) => {
    n.locale = e.locale[r] ?? r ?? n.locale;
  }), n;
}
function sr() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    blueprint: t,
    ...n
  } = e, r = Qn(t, n), {
    aliases: s = {},
    components: a = {},
    directives: i = {}
  } = r, c = Lt();
  return c.run(() => {
    const u = cs(r.defaults), d = us(r.display, r.ssr), T = fs(r.theme), y = ms(r.icons), _ = ds(r.locale), v = ca(r.date, _), O = hs(r.goTo, _);
    function N(f) {
      for (const E in i)
        f.directive(E, i[E]);
      for (const E in a)
        f.component(E, a[E]);
      for (const E in s)
        f.component(E, _s({
          ...s[E],
          name: E,
          aliasName: s[E].name
        }));
      const g = Lt();
      if (g.run(() => {
        T.install(f);
      }), f.onUnmount(() => g.stop()), f.provide(zt, u), f.provide(en, d), f.provide(tn, T), f.provide(nn, y), f.provide(rn, _), f.provide(la, v.options), f.provide(ln, v.instance), f.provide(gs, O), ps && r.ssr)
        if (f.$nuxt)
          f.$nuxt.hook("app:suspense:resolve", () => {
            d.update();
          });
        else {
          const {
            mount: E
          } = f;
          f.mount = function() {
            const h = E(...arguments);
            return zr(() => d.update()), f.mount = E, h;
          };
        }
      f.mixin({
        computed: {
          $vuetify() {
            return Ee({
              defaults: ve.call(this, zt),
              display: ve.call(this, en),
              theme: ve.call(this, tn),
              icons: ve.call(this, nn),
              locale: ve.call(this, rn),
              date: ve.call(this, ln)
            });
          }
        }
      });
    }
    function S() {
      c.stop();
    }
    return {
      install: N,
      unmount: S,
      defaults: u,
      display: d,
      theme: T,
      icons: y,
      locale: _,
      date: v,
      goTo: O
    };
  });
}
const fa = "3.8.4";
sr.version = fa;
function ve(e) {
  var r, s;
  const t = this.$, n = ((r = t.parent) == null ? void 0 : r.provides) ?? ((s = t.vnode.appContext) == null ? void 0 : s.provides);
  if (n && e in n)
    return n[e];
}
const ma = {
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
      mdi: ys
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
}, da = {
  lighten4: "#c8e6c9",
  darken1: "#43a047"
}, cn = {
  green: da
};
/*!
  * shared v10.0.7
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const Je = typeof window < "u", fe = (e, t = !1) => t ? Symbol.for(e) : Symbol(e), ha = (e, t, n) => _a({ l: e, k: t, s: n }), _a = (e) => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), G = (e) => typeof e == "number" && isFinite(e), ga = (e) => $t(e) === "[object Date]", Se = (e) => $t(e) === "[object RegExp]", Qe = (e) => A(e) && Object.keys(e).length === 0, K = Object.assign, pa = Object.create, U = (e = null) => pa(e);
let un;
const ge = () => un || (un = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : U());
function fn(e) {
  return e.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const ya = Object.prototype.hasOwnProperty;
function te(e, t) {
  return ya.call(e, t);
}
const Y = Array.isArray, $ = (e) => typeof e == "function", I = (e) => typeof e == "string", R = (e) => typeof e == "boolean", M = (e) => e !== null && typeof e == "object", Ea = (e) => M(e) && $(e.then) && $(e.catch), ar = Object.prototype.toString, $t = (e) => ar.call(e), A = (e) => $t(e) === "[object Object]", ba = (e) => e == null ? "" : Y(e) || A(e) && e.toString === ar ? JSON.stringify(e, null, 2) : String(e);
function Vt(e, t = "") {
  return e.reduce((n, r, s) => s === 0 ? n + r : n + t + r, "");
}
function La(e, t) {
  typeof console < "u" && (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
const je = (e) => !M(e) || Y(e);
function Xe(e, t) {
  if (je(e) || je(t))
    throw new Error("Invalid value");
  const n = [{ src: e, des: t }];
  for (; n.length; ) {
    const { src: r, des: s } = n.pop();
    Object.keys(r).forEach((a) => {
      a !== "__proto__" && (M(r[a]) && !M(s[a]) && (s[a] = Array.isArray(r[a]) ? [] : U()), je(s[a]) || je(r[a]) ? s[a] = r[a] : n.push({ src: r[a], des: s[a] }));
    });
  }
}
/*!
  * message-compiler v10.0.7
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function Ta(e, t, n) {
  return { line: e, column: t, offset: n };
}
function kt(e, t, n) {
  return { start: e, end: t };
}
const F = {
  // tokenizer error codes
  EXPECTED_TOKEN: 1,
  INVALID_TOKEN_IN_PLACEHOLDER: 2,
  UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
  UNKNOWN_ESCAPE_SEQUENCE: 4,
  INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
  UNBALANCED_CLOSING_BRACE: 6,
  UNTERMINATED_CLOSING_BRACE: 7,
  EMPTY_PLACEHOLDER: 8,
  NOT_ALLOW_NEST_PLACEHOLDER: 9,
  INVALID_LINKED_FORMAT: 10,
  // parser error codes
  MUST_HAVE_MESSAGES_IN_PLURAL: 11,
  UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
  UNEXPECTED_EMPTY_LINKED_KEY: 13,
  UNEXPECTED_LEXICAL_ANALYSIS: 14
}, Ia = 17;
function ze(e, t, n = {}) {
  const { domain: r, messages: s, args: a } = n, i = e, c = new SyntaxError(String(i));
  return c.code = e, t && (c.location = t), c.domain = r, c;
}
function va(e) {
  throw e;
}
const ie = " ", Da = "\r", X = `
`, ka = "\u2028", Na = "\u2029";
function Sa(e) {
  const t = e;
  let n = 0, r = 1, s = 1, a = 0;
  const i = (L) => t[L] === Da && t[L + 1] === X, c = (L) => t[L] === X, u = (L) => t[L] === Na, d = (L) => t[L] === ka, T = (L) => i(L) || c(L) || u(L) || d(L), y = () => n, _ = () => r, v = () => s, O = () => a, N = (L) => i(L) || u(L) || d(L) ? X : t[L], S = () => N(n), f = () => N(n + a);
  function g() {
    return a = 0, T(n) && (r++, s = 0), i(n) && n++, n++, s++, t[n];
  }
  function E() {
    return i(n + a) && a++, a++, t[n + a];
  }
  function h() {
    n = 0, r = 1, s = 1, a = 0;
  }
  function D(L = 0) {
    a = L;
  }
  function k() {
    const L = n + a;
    for (; L !== n; )
      g();
    a = 0;
  }
  return {
    index: y,
    line: _,
    column: v,
    peekOffset: O,
    charAt: N,
    currentChar: S,
    currentPeek: f,
    next: g,
    peek: E,
    reset: h,
    resetPeek: D,
    skipToPeek: k
  };
}
const ue = void 0, Oa = ".", mn = "'", wa = "tokenizer";
function Aa(e, t = {}) {
  const n = t.location !== !1, r = Sa(e), s = () => r.index(), a = () => Ta(r.line(), r.column(), r.index()), i = a(), c = s(), u = {
    currentType: 13,
    offset: c,
    startLoc: i,
    endLoc: i,
    lastType: 13,
    lastOffset: c,
    lastStartLoc: i,
    lastEndLoc: i,
    braceNest: 0,
    inLinked: !1,
    text: ""
  }, d = () => u, { onError: T } = t;
  function y(o, l, p, ...w) {
    const H = d();
    if (l.column += p, l.offset += p, T) {
      const C = n ? kt(H.startLoc, l) : null, m = ze(o, C, {
        domain: wa,
        args: w
      });
      T(m);
    }
  }
  function _(o, l, p) {
    o.endLoc = a(), o.currentType = l;
    const w = { type: l };
    return n && (w.loc = kt(o.startLoc, o.endLoc)), p != null && (w.value = p), w;
  }
  const v = (o) => _(
    o,
    13
    /* TokenTypes.EOF */
  );
  function O(o, l) {
    return o.currentChar() === l ? (o.next(), l) : (y(F.EXPECTED_TOKEN, a(), 0, l), "");
  }
  function N(o) {
    let l = "";
    for (; o.currentPeek() === ie || o.currentPeek() === X; )
      l += o.currentPeek(), o.peek();
    return l;
  }
  function S(o) {
    const l = N(o);
    return o.skipToPeek(), l;
  }
  function f(o) {
    if (o === ue)
      return !1;
    const l = o.charCodeAt(0);
    return l >= 97 && l <= 122 || // a-z
    l >= 65 && l <= 90 || // A-Z
    l === 95;
  }
  function g(o) {
    if (o === ue)
      return !1;
    const l = o.charCodeAt(0);
    return l >= 48 && l <= 57;
  }
  function E(o, l) {
    const { currentType: p } = l;
    if (p !== 2)
      return !1;
    N(o);
    const w = f(o.currentPeek());
    return o.resetPeek(), w;
  }
  function h(o, l) {
    const { currentType: p } = l;
    if (p !== 2)
      return !1;
    N(o);
    const w = o.currentPeek() === "-" ? o.peek() : o.currentPeek(), H = g(w);
    return o.resetPeek(), H;
  }
  function D(o, l) {
    const { currentType: p } = l;
    if (p !== 2)
      return !1;
    N(o);
    const w = o.currentPeek() === mn;
    return o.resetPeek(), w;
  }
  function k(o, l) {
    const { currentType: p } = l;
    if (p !== 7)
      return !1;
    N(o);
    const w = o.currentPeek() === ".";
    return o.resetPeek(), w;
  }
  function L(o, l) {
    const { currentType: p } = l;
    if (p !== 8)
      return !1;
    N(o);
    const w = f(o.currentPeek());
    return o.resetPeek(), w;
  }
  function x(o, l) {
    const { currentType: p } = l;
    if (!(p === 7 || p === 11))
      return !1;
    N(o);
    const w = o.currentPeek() === ":";
    return o.resetPeek(), w;
  }
  function V(o, l) {
    const { currentType: p } = l;
    if (p !== 9)
      return !1;
    const w = () => {
      const C = o.currentPeek();
      return C === "{" ? f(o.peek()) : C === "@" || C === "|" || C === ":" || C === "." || C === ie || !C ? !1 : C === X ? (o.peek(), w()) : z(o, !1);
    }, H = w();
    return o.resetPeek(), H;
  }
  function Z(o) {
    N(o);
    const l = o.currentPeek() === "|";
    return o.resetPeek(), l;
  }
  function z(o, l = !0) {
    const p = (H = !1, C = "") => {
      const m = o.currentPeek();
      return m === "{" || m === "@" || !m ? H : m === "|" ? !(C === ie || C === X) : m === ie ? (o.peek(), p(!0, ie)) : m === X ? (o.peek(), p(!0, X)) : !0;
    }, w = p();
    return l && o.resetPeek(), w;
  }
  function B(o, l) {
    const p = o.currentChar();
    return p === ue ? ue : l(p) ? (o.next(), p) : null;
  }
  function be(o) {
    const l = o.charCodeAt(0);
    return l >= 97 && l <= 122 || // a-z
    l >= 65 && l <= 90 || // A-Z
    l >= 48 && l <= 57 || // 0-9
    l === 95 || // _
    l === 36;
  }
  function nt(o) {
    return B(o, be);
  }
  function rt(o) {
    const l = o.charCodeAt(0);
    return l >= 97 && l <= 122 || // a-z
    l >= 65 && l <= 90 || // A-Z
    l >= 48 && l <= 57 || // 0-9
    l === 95 || // _
    l === 36 || // $
    l === 45;
  }
  function st(o) {
    return B(o, rt);
  }
  function at(o) {
    const l = o.charCodeAt(0);
    return l >= 48 && l <= 57;
  }
  function it(o) {
    return B(o, at);
  }
  function ae(o) {
    const l = o.charCodeAt(0);
    return l >= 48 && l <= 57 || // 0-9
    l >= 65 && l <= 70 || // A-F
    l >= 97 && l <= 102;
  }
  function $e(o) {
    return B(o, ae);
  }
  function Ve(o) {
    let l = "", p = "";
    for (; l = it(o); )
      p += l;
    return p;
  }
  function ot(o) {
    let l = "";
    for (; ; ) {
      const p = o.currentChar();
      if (p === "{" || p === "}" || p === "@" || p === "|" || !p)
        break;
      if (p === ie || p === X)
        if (z(o))
          l += p, o.next();
        else {
          if (Z(o))
            break;
          l += p, o.next();
        }
      else
        l += p, o.next();
    }
    return l;
  }
  function lt(o) {
    S(o);
    let l = "", p = "";
    for (; l = st(o); )
      p += l;
    return o.currentChar() === ue && y(F.UNTERMINATED_CLOSING_BRACE, a(), 0), p;
  }
  function ct(o) {
    S(o);
    let l = "";
    return o.currentChar() === "-" ? (o.next(), l += `-${Ve(o)}`) : l += Ve(o), o.currentChar() === ue && y(F.UNTERMINATED_CLOSING_BRACE, a(), 0), l;
  }
  function Jt(o) {
    return o !== mn && o !== X;
  }
  function ut(o) {
    S(o), O(o, "'");
    let l = "", p = "";
    for (; l = B(o, Jt); )
      l === "\\" ? p += ft(o) : p += l;
    const w = o.currentChar();
    return w === X || w === ue ? (y(F.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, a(), 0), w === X && (o.next(), O(o, "'")), p) : (O(o, "'"), p);
  }
  function ft(o) {
    const l = o.currentChar();
    switch (l) {
      case "\\":
      case "'":
        return o.next(), `\\${l}`;
      case "u":
        return Ye(o, l, 4);
      case "U":
        return Ye(o, l, 6);
      default:
        return y(F.UNKNOWN_ESCAPE_SEQUENCE, a(), 0, l), "";
    }
  }
  function Ye(o, l, p) {
    O(o, l);
    let w = "";
    for (let H = 0; H < p; H++) {
      const C = $e(o);
      if (!C) {
        y(F.INVALID_UNICODE_ESCAPE_SEQUENCE, a(), 0, `\\${l}${w}${o.currentChar()}`);
        break;
      }
      w += C;
    }
    return `\\${l}${w}`;
  }
  function mt(o) {
    return o !== "{" && o !== "}" && o !== ie && o !== X;
  }
  function dt(o) {
    S(o);
    let l = "", p = "";
    for (; l = B(o, mt); )
      p += l;
    return p;
  }
  function ht(o) {
    let l = "", p = "";
    for (; l = nt(o); )
      p += l;
    return p;
  }
  function _t(o) {
    const l = (p) => {
      const w = o.currentChar();
      return w === "{" || w === "@" || w === "|" || w === "(" || w === ")" || !w || w === ie ? p : (p += w, o.next(), l(p));
    };
    return l("");
  }
  function we(o) {
    S(o);
    const l = O(
      o,
      "|"
      /* TokenChars.Pipe */
    );
    return S(o), l;
  }
  function Le(o, l) {
    let p = null;
    switch (o.currentChar()) {
      case "{":
        return l.braceNest >= 1 && y(F.NOT_ALLOW_NEST_PLACEHOLDER, a(), 0), o.next(), p = _(
          l,
          2,
          "{"
          /* TokenChars.BraceLeft */
        ), S(o), l.braceNest++, p;
      case "}":
        return l.braceNest > 0 && l.currentType === 2 && y(F.EMPTY_PLACEHOLDER, a(), 0), o.next(), p = _(
          l,
          3,
          "}"
          /* TokenChars.BraceRight */
        ), l.braceNest--, l.braceNest > 0 && S(o), l.inLinked && l.braceNest === 0 && (l.inLinked = !1), p;
      case "@":
        return l.braceNest > 0 && y(F.UNTERMINATED_CLOSING_BRACE, a(), 0), p = Te(o, l) || v(l), l.braceNest = 0, p;
      default: {
        let H = !0, C = !0, m = !0;
        if (Z(o))
          return l.braceNest > 0 && y(F.UNTERMINATED_CLOSING_BRACE, a(), 0), p = _(l, 1, we(o)), l.braceNest = 0, l.inLinked = !1, p;
        if (l.braceNest > 0 && (l.currentType === 4 || l.currentType === 5 || l.currentType === 6))
          return y(F.UNTERMINATED_CLOSING_BRACE, a(), 0), l.braceNest = 0, Ae(o, l);
        if (H = E(o, l))
          return p = _(l, 4, lt(o)), S(o), p;
        if (C = h(o, l))
          return p = _(l, 5, ct(o)), S(o), p;
        if (m = D(o, l))
          return p = _(l, 6, ut(o)), S(o), p;
        if (!H && !C && !m)
          return p = _(l, 12, dt(o)), y(F.INVALID_TOKEN_IN_PLACEHOLDER, a(), 0, p.value), S(o), p;
        break;
      }
    }
    return p;
  }
  function Te(o, l) {
    const { currentType: p } = l;
    let w = null;
    const H = o.currentChar();
    switch ((p === 7 || p === 8 || p === 11 || p === 9) && (H === X || H === ie) && y(F.INVALID_LINKED_FORMAT, a(), 0), H) {
      case "@":
        return o.next(), w = _(
          l,
          7,
          "@"
          /* TokenChars.LinkedAlias */
        ), l.inLinked = !0, w;
      case ".":
        return S(o), o.next(), _(
          l,
          8,
          "."
          /* TokenChars.LinkedDot */
        );
      case ":":
        return S(o), o.next(), _(
          l,
          9,
          ":"
          /* TokenChars.LinkedDelimiter */
        );
      default:
        return Z(o) ? (w = _(l, 1, we(o)), l.braceNest = 0, l.inLinked = !1, w) : k(o, l) || x(o, l) ? (S(o), Te(o, l)) : L(o, l) ? (S(o), _(l, 11, ht(o))) : V(o, l) ? (S(o), H === "{" ? Le(o, l) || w : _(l, 10, _t(o))) : (p === 7 && y(F.INVALID_LINKED_FORMAT, a(), 0), l.braceNest = 0, l.inLinked = !1, Ae(o, l));
    }
  }
  function Ae(o, l) {
    let p = {
      type: 13
      /* TokenTypes.EOF */
    };
    if (l.braceNest > 0)
      return Le(o, l) || v(l);
    if (l.inLinked)
      return Te(o, l) || v(l);
    switch (o.currentChar()) {
      case "{":
        return Le(o, l) || v(l);
      case "}":
        return y(F.UNBALANCED_CLOSING_BRACE, a(), 0), o.next(), _(
          l,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
      case "@":
        return Te(o, l) || v(l);
      default: {
        if (Z(o))
          return p = _(l, 1, we(o)), l.braceNest = 0, l.inLinked = !1, p;
        if (z(o))
          return _(l, 0, ot(o));
        break;
      }
    }
    return p;
  }
  function gt() {
    const { currentType: o, offset: l, startLoc: p, endLoc: w } = u;
    return u.lastType = o, u.lastOffset = l, u.lastStartLoc = p, u.lastEndLoc = w, u.offset = s(), u.startLoc = a(), r.currentChar() === ue ? _(
      u,
      13
      /* TokenTypes.EOF */
    ) : Ae(r, u);
  }
  return {
    nextToken: gt,
    currentOffset: s,
    currentPosition: a,
    context: d
  };
}
const Ca = "parser", Pa = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function Ra(e, t, n) {
  switch (e) {
    case "\\\\":
      return "\\";
    case "\\'":
      return "'";
    default: {
      const r = parseInt(t || n, 16);
      return r <= 55295 || r >= 57344 ? String.fromCodePoint(r) : "�";
    }
  }
}
function Ma(e = {}) {
  const t = e.location !== !1, { onError: n } = e;
  function r(f, g, E, h, ...D) {
    const k = f.currentPosition();
    if (k.offset += h, k.column += h, n) {
      const L = t ? kt(E, k) : null, x = ze(g, L, {
        domain: Ca,
        args: D
      });
      n(x);
    }
  }
  function s(f, g, E) {
    const h = { type: f };
    return t && (h.start = g, h.end = g, h.loc = { start: E, end: E }), h;
  }
  function a(f, g, E, h) {
    t && (f.end = g, f.loc && (f.loc.end = E));
  }
  function i(f, g) {
    const E = f.context(), h = s(3, E.offset, E.startLoc);
    return h.value = g, a(h, f.currentOffset(), f.currentPosition()), h;
  }
  function c(f, g) {
    const E = f.context(), { lastOffset: h, lastStartLoc: D } = E, k = s(5, h, D);
    return k.index = parseInt(g, 10), f.nextToken(), a(k, f.currentOffset(), f.currentPosition()), k;
  }
  function u(f, g) {
    const E = f.context(), { lastOffset: h, lastStartLoc: D } = E, k = s(4, h, D);
    return k.key = g, f.nextToken(), a(k, f.currentOffset(), f.currentPosition()), k;
  }
  function d(f, g) {
    const E = f.context(), { lastOffset: h, lastStartLoc: D } = E, k = s(9, h, D);
    return k.value = g.replace(Pa, Ra), f.nextToken(), a(k, f.currentOffset(), f.currentPosition()), k;
  }
  function T(f) {
    const g = f.nextToken(), E = f.context(), { lastOffset: h, lastStartLoc: D } = E, k = s(8, h, D);
    return g.type !== 11 ? (r(f, F.UNEXPECTED_EMPTY_LINKED_MODIFIER, E.lastStartLoc, 0), k.value = "", a(k, h, D), {
      nextConsumeToken: g,
      node: k
    }) : (g.value == null && r(f, F.UNEXPECTED_LEXICAL_ANALYSIS, E.lastStartLoc, 0, re(g)), k.value = g.value || "", a(k, f.currentOffset(), f.currentPosition()), {
      node: k
    });
  }
  function y(f, g) {
    const E = f.context(), h = s(7, E.offset, E.startLoc);
    return h.value = g, a(h, f.currentOffset(), f.currentPosition()), h;
  }
  function _(f) {
    const g = f.context(), E = s(6, g.offset, g.startLoc);
    let h = f.nextToken();
    if (h.type === 8) {
      const D = T(f);
      E.modifier = D.node, h = D.nextConsumeToken || f.nextToken();
    }
    switch (h.type !== 9 && r(f, F.UNEXPECTED_LEXICAL_ANALYSIS, g.lastStartLoc, 0, re(h)), h = f.nextToken(), h.type === 2 && (h = f.nextToken()), h.type) {
      case 10:
        h.value == null && r(f, F.UNEXPECTED_LEXICAL_ANALYSIS, g.lastStartLoc, 0, re(h)), E.key = y(f, h.value || "");
        break;
      case 4:
        h.value == null && r(f, F.UNEXPECTED_LEXICAL_ANALYSIS, g.lastStartLoc, 0, re(h)), E.key = u(f, h.value || "");
        break;
      case 5:
        h.value == null && r(f, F.UNEXPECTED_LEXICAL_ANALYSIS, g.lastStartLoc, 0, re(h)), E.key = c(f, h.value || "");
        break;
      case 6:
        h.value == null && r(f, F.UNEXPECTED_LEXICAL_ANALYSIS, g.lastStartLoc, 0, re(h)), E.key = d(f, h.value || "");
        break;
      default: {
        r(f, F.UNEXPECTED_EMPTY_LINKED_KEY, g.lastStartLoc, 0);
        const D = f.context(), k = s(7, D.offset, D.startLoc);
        return k.value = "", a(k, D.offset, D.startLoc), E.key = k, a(E, D.offset, D.startLoc), {
          nextConsumeToken: h,
          node: E
        };
      }
    }
    return a(E, f.currentOffset(), f.currentPosition()), {
      node: E
    };
  }
  function v(f) {
    const g = f.context(), E = g.currentType === 1 ? f.currentOffset() : g.offset, h = g.currentType === 1 ? g.endLoc : g.startLoc, D = s(2, E, h);
    D.items = [];
    let k = null;
    do {
      const V = k || f.nextToken();
      switch (k = null, V.type) {
        case 0:
          V.value == null && r(f, F.UNEXPECTED_LEXICAL_ANALYSIS, g.lastStartLoc, 0, re(V)), D.items.push(i(f, V.value || ""));
          break;
        case 5:
          V.value == null && r(f, F.UNEXPECTED_LEXICAL_ANALYSIS, g.lastStartLoc, 0, re(V)), D.items.push(c(f, V.value || ""));
          break;
        case 4:
          V.value == null && r(f, F.UNEXPECTED_LEXICAL_ANALYSIS, g.lastStartLoc, 0, re(V)), D.items.push(u(f, V.value || ""));
          break;
        case 6:
          V.value == null && r(f, F.UNEXPECTED_LEXICAL_ANALYSIS, g.lastStartLoc, 0, re(V)), D.items.push(d(f, V.value || ""));
          break;
        case 7: {
          const Z = _(f);
          D.items.push(Z.node), k = Z.nextConsumeToken || null;
          break;
        }
      }
    } while (g.currentType !== 13 && g.currentType !== 1);
    const L = g.currentType === 1 ? g.lastOffset : f.currentOffset(), x = g.currentType === 1 ? g.lastEndLoc : f.currentPosition();
    return a(D, L, x), D;
  }
  function O(f, g, E, h) {
    const D = f.context();
    let k = h.items.length === 0;
    const L = s(1, g, E);
    L.cases = [], L.cases.push(h);
    do {
      const x = v(f);
      k || (k = x.items.length === 0), L.cases.push(x);
    } while (D.currentType !== 13);
    return k && r(f, F.MUST_HAVE_MESSAGES_IN_PLURAL, E, 0), a(L, f.currentOffset(), f.currentPosition()), L;
  }
  function N(f) {
    const g = f.context(), { offset: E, startLoc: h } = g, D = v(f);
    return g.currentType === 13 ? D : O(f, E, h, D);
  }
  function S(f) {
    const g = Aa(f, K({}, e)), E = g.context(), h = s(0, E.offset, E.startLoc);
    return t && h.loc && (h.loc.source = f), h.body = N(g), e.onCacheKey && (h.cacheKey = e.onCacheKey(f)), E.currentType !== 13 && r(g, F.UNEXPECTED_LEXICAL_ANALYSIS, E.lastStartLoc, 0, f[E.offset] || ""), a(h, g.currentOffset(), g.currentPosition()), h;
  }
  return { parse: S };
}
function re(e) {
  if (e.type === 13)
    return "EOF";
  const t = (e.value || "").replace(/\r?\n/gu, "\\n");
  return t.length > 10 ? t.slice(0, 9) + "…" : t;
}
function Fa(e, t = {}) {
  const n = {
    ast: e,
    helpers: /* @__PURE__ */ new Set()
  };
  return { context: () => n, helper: (a) => (n.helpers.add(a), a) };
}
function dn(e, t) {
  for (let n = 0; n < e.length; n++)
    Yt(e[n], t);
}
function Yt(e, t) {
  switch (e.type) {
    case 1:
      dn(e.cases, t), t.helper(
        "plural"
        /* HelperNameMap.PLURAL */
      );
      break;
    case 2:
      dn(e.items, t);
      break;
    case 6: {
      Yt(e.key, t), t.helper(
        "linked"
        /* HelperNameMap.LINKED */
      ), t.helper(
        "type"
        /* HelperNameMap.TYPE */
      );
      break;
    }
    case 5:
      t.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      ), t.helper(
        "list"
        /* HelperNameMap.LIST */
      );
      break;
    case 4:
      t.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      ), t.helper(
        "named"
        /* HelperNameMap.NAMED */
      );
      break;
  }
}
function Ua(e, t = {}) {
  const n = Fa(e);
  n.helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  ), e.body && Yt(e.body, n);
  const r = n.context();
  e.helpers = Array.from(r.helpers);
}
function Wa(e) {
  const t = e.body;
  return t.type === 2 ? hn(t) : t.cases.forEach((n) => hn(n)), e;
}
function hn(e) {
  if (e.items.length === 1) {
    const t = e.items[0];
    (t.type === 3 || t.type === 9) && (e.static = t.value, delete t.value);
  } else {
    const t = [];
    for (let n = 0; n < e.items.length; n++) {
      const r = e.items[n];
      if (!(r.type === 3 || r.type === 9) || r.value == null)
        break;
      t.push(r.value);
    }
    if (t.length === e.items.length) {
      e.static = Vt(t);
      for (let n = 0; n < e.items.length; n++) {
        const r = e.items[n];
        (r.type === 3 || r.type === 9) && delete r.value;
      }
    }
  }
}
function De(e) {
  switch (e.t = e.type, e.type) {
    case 0: {
      const t = e;
      De(t.body), t.b = t.body, delete t.body;
      break;
    }
    case 1: {
      const t = e, n = t.cases;
      for (let r = 0; r < n.length; r++)
        De(n[r]);
      t.c = n, delete t.cases;
      break;
    }
    case 2: {
      const t = e, n = t.items;
      for (let r = 0; r < n.length; r++)
        De(n[r]);
      t.i = n, delete t.items, t.static && (t.s = t.static, delete t.static);
      break;
    }
    case 3:
    case 9:
    case 8:
    case 7: {
      const t = e;
      t.value && (t.v = t.value, delete t.value);
      break;
    }
    case 6: {
      const t = e;
      De(t.key), t.k = t.key, delete t.key, t.modifier && (De(t.modifier), t.m = t.modifier, delete t.modifier);
      break;
    }
    case 5: {
      const t = e;
      t.i = t.index, delete t.index;
      break;
    }
    case 4: {
      const t = e;
      t.k = t.key, delete t.key;
      break;
    }
  }
  delete e.type;
}
function xa(e, t) {
  const { filename: n, breakLineCode: r, needIndent: s } = t, a = t.location !== !1, i = {
    filename: n,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    map: void 0,
    breakLineCode: r,
    needIndent: s,
    indentLevel: 0
  };
  a && e.loc && (i.source = e.loc.source);
  const c = () => i;
  function u(N, S) {
    i.code += N;
  }
  function d(N, S = !0) {
    const f = S ? r : "";
    u(s ? f + "  ".repeat(N) : f);
  }
  function T(N = !0) {
    const S = ++i.indentLevel;
    N && d(S);
  }
  function y(N = !0) {
    const S = --i.indentLevel;
    N && d(S);
  }
  function _() {
    d(i.indentLevel);
  }
  return {
    context: c,
    push: u,
    indent: T,
    deindent: y,
    newline: _,
    helper: (N) => `_${N}`,
    needIndent: () => i.needIndent
  };
}
function $a(e, t) {
  const { helper: n } = e;
  e.push(`${n(
    "linked"
    /* HelperNameMap.LINKED */
  )}(`), Oe(e, t.key), t.modifier ? (e.push(", "), Oe(e, t.modifier), e.push(", _type")) : e.push(", undefined, _type"), e.push(")");
}
function Va(e, t) {
  const { helper: n, needIndent: r } = e;
  e.push(`${n(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`), e.indent(r());
  const s = t.items.length;
  for (let a = 0; a < s && (Oe(e, t.items[a]), a !== s - 1); a++)
    e.push(", ");
  e.deindent(r()), e.push("])");
}
function Ya(e, t) {
  const { helper: n, needIndent: r } = e;
  if (t.cases.length > 1) {
    e.push(`${n(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`), e.indent(r());
    const s = t.cases.length;
    for (let a = 0; a < s && (Oe(e, t.cases[a]), a !== s - 1); a++)
      e.push(", ");
    e.deindent(r()), e.push("])");
  }
}
function Ha(e, t) {
  t.body ? Oe(e, t.body) : e.push("null");
}
function Oe(e, t) {
  const { helper: n } = e;
  switch (t.type) {
    case 0:
      Ha(e, t);
      break;
    case 1:
      Ya(e, t);
      break;
    case 2:
      Va(e, t);
      break;
    case 6:
      $a(e, t);
      break;
    case 8:
      e.push(JSON.stringify(t.value), t);
      break;
    case 7:
      e.push(JSON.stringify(t.value), t);
      break;
    case 5:
      e.push(`${n(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${n(
        "list"
        /* HelperNameMap.LIST */
      )}(${t.index}))`, t);
      break;
    case 4:
      e.push(`${n(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${n(
        "named"
        /* HelperNameMap.NAMED */
      )}(${JSON.stringify(t.key)}))`, t);
      break;
    case 9:
      e.push(JSON.stringify(t.value), t);
      break;
    case 3:
      e.push(JSON.stringify(t.value), t);
      break;
  }
}
const ja = (e, t = {}) => {
  const n = I(t.mode) ? t.mode : "normal", r = I(t.filename) ? t.filename : "message.intl";
  t.sourceMap;
  const s = t.breakLineCode != null ? t.breakLineCode : n === "arrow" ? ";" : `
`, a = t.needIndent ? t.needIndent : n !== "arrow", i = e.helpers || [], c = xa(e, {
    filename: r,
    breakLineCode: s,
    needIndent: a
  });
  c.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), c.indent(a), i.length > 0 && (c.push(`const { ${Vt(i.map((T) => `${T}: _${T}`), ", ")} } = ctx`), c.newline()), c.push("return "), Oe(c, e), c.deindent(a), c.push("}"), delete e.helpers;
  const { code: u, map: d } = c.context();
  return {
    ast: e,
    code: u,
    map: d ? d.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function Ga(e, t = {}) {
  const n = K({}, t), r = !!n.jit, s = !!n.minify, a = n.optimize == null ? !0 : n.optimize, c = Ma(n).parse(e);
  return r ? (a && Wa(c), s && De(c), { ast: c, code: "" }) : (Ua(c, n), ja(c, n));
}
/*!
  * core-base v10.0.7
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function Ka() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (ge().__INTLIFY_PROD_DEVTOOLS__ = !1), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (ge().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1);
}
function se(e) {
  return M(e) && Ht(e) === 0 && (te(e, "b") || te(e, "body"));
}
const ir = ["b", "body"];
function Ba(e) {
  return me(e, ir);
}
const or = ["c", "cases"];
function Xa(e) {
  return me(e, or, []);
}
const lr = ["s", "static"];
function qa(e) {
  return me(e, lr);
}
const cr = ["i", "items"];
function Ja(e) {
  return me(e, cr, []);
}
const ur = ["t", "type"];
function Ht(e) {
  return me(e, ur);
}
const fr = ["v", "value"];
function Ge(e, t) {
  const n = me(e, fr);
  if (n != null)
    return n;
  throw Re(t);
}
const mr = ["m", "modifier"];
function Za(e) {
  return me(e, mr);
}
const dr = ["k", "key"];
function Qa(e) {
  const t = me(e, dr);
  if (t)
    return t;
  throw Re(
    6
    /* NodeTypes.Linked */
  );
}
function me(e, t, n) {
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    if (te(e, s) && e[s] != null)
      return e[s];
  }
  return n;
}
const hr = [
  ...ir,
  ...or,
  ...lr,
  ...cr,
  ...dr,
  ...mr,
  ...fr,
  ...ur
];
function Re(e) {
  return new Error(`unhandled node type: ${e}`);
}
function pt(e) {
  return (n) => za(n, e);
}
function za(e, t) {
  const n = Ba(t);
  if (n == null)
    throw Re(
      0
      /* NodeTypes.Resource */
    );
  if (Ht(n) === 1) {
    const a = Xa(n);
    return e.plural(a.reduce((i, c) => [
      ...i,
      _n(e, c)
    ], []));
  } else
    return _n(e, n);
}
function _n(e, t) {
  const n = qa(t);
  if (n != null)
    return e.type === "text" ? n : e.normalize([n]);
  {
    const r = Ja(t).reduce((s, a) => [...s, Nt(e, a)], []);
    return e.normalize(r);
  }
}
function Nt(e, t) {
  const n = Ht(t);
  switch (n) {
    case 3:
      return Ge(t, n);
    case 9:
      return Ge(t, n);
    case 4: {
      const r = t;
      if (te(r, "k") && r.k)
        return e.interpolate(e.named(r.k));
      if (te(r, "key") && r.key)
        return e.interpolate(e.named(r.key));
      throw Re(n);
    }
    case 5: {
      const r = t;
      if (te(r, "i") && G(r.i))
        return e.interpolate(e.list(r.i));
      if (te(r, "index") && G(r.index))
        return e.interpolate(e.list(r.index));
      throw Re(n);
    }
    case 6: {
      const r = t, s = Za(r), a = Qa(r);
      return e.linked(Nt(e, a), s ? Nt(e, s) : void 0, e.type);
    }
    case 7:
      return Ge(t, n);
    case 8:
      return Ge(t, n);
    default:
      throw new Error(`unhandled node on format message part: ${n}`);
  }
}
const ei = (e) => e;
let Ke = U();
function ti(e, t = {}) {
  let n = !1;
  const r = t.onError || va;
  return t.onError = (s) => {
    n = !0, r(s);
  }, { ...Ga(e, t), detectError: n };
}
// @__NO_SIDE_EFFECTS__
function ni(e, t) {
  if (!__INTLIFY_DROP_MESSAGE_COMPILER__ && I(e)) {
    R(t.warnHtmlMessage) && t.warnHtmlMessage;
    const r = (t.onCacheKey || ei)(e), s = Ke[r];
    if (s)
      return s;
    const { ast: a, detectError: i } = ti(e, {
      ...t,
      location: !1,
      jit: !0
    }), c = pt(a);
    return i ? c : Ke[r] = c;
  } else {
    const n = e.cacheKey;
    if (n) {
      const r = Ke[n];
      return r || (Ke[n] = pt(e));
    } else
      return pt(e);
  }
}
let Me = null;
function ri(e) {
  Me = e;
}
function si(e, t, n) {
  Me && Me.emit("i18n:init", {
    timestamp: Date.now(),
    i18n: e,
    version: t,
    meta: n
  });
}
const ai = /* @__PURE__ */ ii("function:translate");
function ii(e) {
  return (t) => Me && Me.emit(e, t);
}
const oe = {
  INVALID_ARGUMENT: Ia,
  // 17
  INVALID_DATE_ARGUMENT: 18,
  INVALID_ISO_DATE_ARGUMENT: 19,
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
  NOT_SUPPORT_LOCALE_TYPE: 23
}, oi = 24;
function le(e) {
  return ze(e, null, void 0);
}
function jt(e, t) {
  return t.locale != null ? gn(t.locale) : gn(e.locale);
}
let yt;
function gn(e) {
  if (I(e))
    return e;
  if ($(e)) {
    if (e.resolvedOnce && yt != null)
      return yt;
    if (e.constructor.name === "Function") {
      const t = e();
      if (Ea(t))
        throw le(oe.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
      return yt = t;
    } else
      throw le(oe.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
  } else
    throw le(oe.NOT_SUPPORT_LOCALE_TYPE);
}
function li(e, t, n) {
  return [.../* @__PURE__ */ new Set([
    n,
    ...Y(t) ? t : M(t) ? Object.keys(t) : I(t) ? [t] : [n]
  ])];
}
function _r(e, t, n) {
  const r = I(n) ? n : Fe, s = e;
  s.__localeChainCache || (s.__localeChainCache = /* @__PURE__ */ new Map());
  let a = s.__localeChainCache.get(r);
  if (!a) {
    a = [];
    let i = [n];
    for (; Y(i); )
      i = pn(a, i, t);
    const c = Y(t) || !A(t) ? t : t.default ? t.default : null;
    i = I(c) ? [c] : c, Y(i) && pn(a, i, !1), s.__localeChainCache.set(r, a);
  }
  return a;
}
function pn(e, t, n) {
  let r = !0;
  for (let s = 0; s < t.length && R(r); s++) {
    const a = t[s];
    I(a) && (r = ci(e, t[s], n));
  }
  return r;
}
function ci(e, t, n) {
  let r;
  const s = t.split("-");
  do {
    const a = s.join("-");
    r = ui(e, a, n), s.splice(-1, 1);
  } while (s.length && r === !0);
  return r;
}
function ui(e, t, n) {
  let r = !1;
  if (!e.includes(t) && (r = !0, t)) {
    r = t[t.length - 1] !== "!";
    const s = t.replace(/!/g, "");
    e.push(s), (Y(n) || A(n)) && n[s] && (r = n[s]);
  }
  return r;
}
const de = [];
de[
  0
  /* States.BEFORE_PATH */
] = {
  w: [
    0
    /* States.BEFORE_PATH */
  ],
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  "[": [
    4
    /* States.IN_SUB_PATH */
  ],
  o: [
    7
    /* States.AFTER_PATH */
  ]
};
de[
  1
  /* States.IN_PATH */
] = {
  w: [
    1
    /* States.IN_PATH */
  ],
  ".": [
    2
    /* States.BEFORE_IDENT */
  ],
  "[": [
    4
    /* States.IN_SUB_PATH */
  ],
  o: [
    7
    /* States.AFTER_PATH */
  ]
};
de[
  2
  /* States.BEFORE_IDENT */
] = {
  w: [
    2
    /* States.BEFORE_IDENT */
  ],
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  0: [
    3,
    0
    /* Actions.APPEND */
  ]
};
de[
  3
  /* States.IN_IDENT */
] = {
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  0: [
    3,
    0
    /* Actions.APPEND */
  ],
  w: [
    1,
    1
    /* Actions.PUSH */
  ],
  ".": [
    2,
    1
    /* Actions.PUSH */
  ],
  "[": [
    4,
    1
    /* Actions.PUSH */
  ],
  o: [
    7,
    1
    /* Actions.PUSH */
  ]
};
de[
  4
  /* States.IN_SUB_PATH */
] = {
  "'": [
    5,
    0
    /* Actions.APPEND */
  ],
  '"': [
    6,
    0
    /* Actions.APPEND */
  ],
  "[": [
    4,
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ],
  "]": [
    1,
    3
    /* Actions.PUSH_SUB_PATH */
  ],
  o: 8,
  l: [
    4,
    0
    /* Actions.APPEND */
  ]
};
de[
  5
  /* States.IN_SINGLE_QUOTE */
] = {
  "'": [
    4,
    0
    /* Actions.APPEND */
  ],
  o: 8,
  l: [
    5,
    0
    /* Actions.APPEND */
  ]
};
de[
  6
  /* States.IN_DOUBLE_QUOTE */
] = {
  '"': [
    4,
    0
    /* Actions.APPEND */
  ],
  o: 8,
  l: [
    6,
    0
    /* Actions.APPEND */
  ]
};
const fi = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function mi(e) {
  return fi.test(e);
}
function di(e) {
  const t = e.charCodeAt(0), n = e.charCodeAt(e.length - 1);
  return t === n && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function hi(e) {
  if (e == null)
    return "o";
  switch (e.charCodeAt(0)) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return e;
    case 95:
    case 36:
    case 45:
      return "i";
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
      return "w";
  }
  return "i";
}
function _i(e) {
  const t = e.trim();
  return e.charAt(0) === "0" && isNaN(parseInt(e)) ? !1 : mi(t) ? di(t) : "*" + t;
}
function gi(e) {
  const t = [];
  let n = -1, r = 0, s = 0, a, i, c, u, d, T, y;
  const _ = [];
  _[
    0
    /* Actions.APPEND */
  ] = () => {
    i === void 0 ? i = c : i += c;
  }, _[
    1
    /* Actions.PUSH */
  ] = () => {
    i !== void 0 && (t.push(i), i = void 0);
  }, _[
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ] = () => {
    _[
      0
      /* Actions.APPEND */
    ](), s++;
  }, _[
    3
    /* Actions.PUSH_SUB_PATH */
  ] = () => {
    if (s > 0)
      s--, r = 4, _[
        0
        /* Actions.APPEND */
      ]();
    else {
      if (s = 0, i === void 0 || (i = _i(i), i === !1))
        return !1;
      _[
        1
        /* Actions.PUSH */
      ]();
    }
  };
  function v() {
    const O = e[n + 1];
    if (r === 5 && O === "'" || r === 6 && O === '"')
      return n++, c = "\\" + O, _[
        0
        /* Actions.APPEND */
      ](), !0;
  }
  for (; r !== null; )
    if (n++, a = e[n], !(a === "\\" && v())) {
      if (u = hi(a), y = de[r], d = y[u] || y.l || 8, d === 8 || (r = d[0], d[1] !== void 0 && (T = _[d[1]], T && (c = a, T() === !1))))
        return;
      if (r === 7)
        return t;
    }
}
const yn = /* @__PURE__ */ new Map();
function pi(e, t) {
  return M(e) ? e[t] : null;
}
function yi(e, t) {
  if (!M(e))
    return null;
  let n = yn.get(t);
  if (n || (n = gi(t), n && yn.set(t, n)), !n)
    return null;
  const r = n.length;
  let s = e, a = 0;
  for (; a < r; ) {
    const i = n[a];
    if (hr.includes(i) && se(s))
      return null;
    const c = s[i];
    if (c === void 0 || $(s))
      return null;
    s = c, a++;
  }
  return s;
}
const Ei = "10.0.7", et = -1, Fe = "en-US", En = "", bn = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function bi() {
  return {
    upper: (e, t) => t === "text" && I(e) ? e.toUpperCase() : t === "vnode" && M(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
    lower: (e, t) => t === "text" && I(e) ? e.toLowerCase() : t === "vnode" && M(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
    capitalize: (e, t) => t === "text" && I(e) ? bn(e) : t === "vnode" && M(e) && "__v_isVNode" in e ? bn(e.children) : e
  };
}
let gr;
function Li(e) {
  gr = e;
}
let pr;
function Ti(e) {
  pr = e;
}
let yr;
function Ii(e) {
  yr = e;
}
let Er = null;
const vi = /* @__NO_SIDE_EFFECTS__ */ (e) => {
  Er = e;
}, Di = /* @__NO_SIDE_EFFECTS__ */ () => Er;
let br = null;
const Ln = (e) => {
  br = e;
}, ki = () => br;
let Tn = 0;
function Ni(e = {}) {
  const t = $(e.onWarn) ? e.onWarn : La, n = I(e.version) ? e.version : Ei, r = I(e.locale) || $(e.locale) ? e.locale : Fe, s = $(r) ? Fe : r, a = Y(e.fallbackLocale) || A(e.fallbackLocale) || I(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : s, i = A(e.messages) ? e.messages : Et(s), c = A(e.datetimeFormats) ? e.datetimeFormats : Et(s), u = A(e.numberFormats) ? e.numberFormats : Et(s), d = K(U(), e.modifiers, bi()), T = e.pluralRules || U(), y = $(e.missing) ? e.missing : null, _ = R(e.missingWarn) || Se(e.missingWarn) ? e.missingWarn : !0, v = R(e.fallbackWarn) || Se(e.fallbackWarn) ? e.fallbackWarn : !0, O = !!e.fallbackFormat, N = !!e.unresolving, S = $(e.postTranslation) ? e.postTranslation : null, f = A(e.processor) ? e.processor : null, g = R(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, E = !!e.escapeParameter, h = $(e.messageCompiler) ? e.messageCompiler : gr, D = $(e.messageResolver) ? e.messageResolver : pr || pi, k = $(e.localeFallbacker) ? e.localeFallbacker : yr || li, L = M(e.fallbackContext) ? e.fallbackContext : void 0, x = e, V = M(x.__datetimeFormatters) ? x.__datetimeFormatters : /* @__PURE__ */ new Map(), Z = M(x.__numberFormatters) ? x.__numberFormatters : /* @__PURE__ */ new Map(), z = M(x.__meta) ? x.__meta : {};
  Tn++;
  const B = {
    version: n,
    cid: Tn,
    locale: r,
    fallbackLocale: a,
    messages: i,
    modifiers: d,
    pluralRules: T,
    missing: y,
    missingWarn: _,
    fallbackWarn: v,
    fallbackFormat: O,
    unresolving: N,
    postTranslation: S,
    processor: f,
    warnHtmlMessage: g,
    escapeParameter: E,
    messageCompiler: h,
    messageResolver: D,
    localeFallbacker: k,
    fallbackContext: L,
    onWarn: t,
    __meta: z
  };
  return B.datetimeFormats = c, B.numberFormats = u, B.__datetimeFormatters = V, B.__numberFormatters = Z, __INTLIFY_PROD_DEVTOOLS__ && si(B, n, z), B;
}
const Et = (e) => ({ [e]: U() });
function Gt(e, t, n, r, s) {
  const { missing: a, onWarn: i } = e;
  if (a !== null) {
    const c = a(e, n, t, s);
    return I(c) ? c : t;
  } else
    return t;
}
function Ce(e, t, n) {
  const r = e;
  r.__localeChainCache = /* @__PURE__ */ new Map(), e.localeFallbacker(e, n, t);
}
function Si(e, t) {
  return e === t ? !1 : e.split("-")[0] === t.split("-")[0];
}
function Oi(e, t) {
  const n = t.indexOf(e);
  if (n === -1)
    return !1;
  for (let r = n + 1; r < t.length; r++)
    if (Si(e, t[r]))
      return !0;
  return !1;
}
function In(e, ...t) {
  const { datetimeFormats: n, unresolving: r, fallbackLocale: s, onWarn: a, localeFallbacker: i } = e, { __datetimeFormatters: c } = e, [u, d, T, y] = St(...t), _ = R(T.missingWarn) ? T.missingWarn : e.missingWarn;
  R(T.fallbackWarn) ? T.fallbackWarn : e.fallbackWarn;
  const v = !!T.part, O = jt(e, T), N = i(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    s,
    O
  );
  if (!I(u) || u === "")
    return new Intl.DateTimeFormat(O, y).format(d);
  let S = {}, f, g = null;
  const E = "datetime format";
  for (let k = 0; k < N.length && (f = N[k], S = n[f] || {}, g = S[u], !A(g)); k++)
    Gt(e, u, f, _, E);
  if (!A(g) || !I(f))
    return r ? et : u;
  let h = `${f}__${u}`;
  Qe(y) || (h = `${h}__${JSON.stringify(y)}`);
  let D = c.get(h);
  return D || (D = new Intl.DateTimeFormat(f, K({}, g, y)), c.set(h, D)), v ? D.formatToParts(d) : D.format(d);
}
const Lr = [
  "localeMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "formatMatcher",
  "hour12",
  "timeZone",
  "dateStyle",
  "timeStyle",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "hourCycle",
  "fractionalSecondDigits"
];
function St(...e) {
  const [t, n, r, s] = e, a = U();
  let i = U(), c;
  if (I(t)) {
    const u = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!u)
      throw le(oe.INVALID_ISO_DATE_ARGUMENT);
    const d = u[3] ? u[3].trim().startsWith("T") ? `${u[1].trim()}${u[3].trim()}` : `${u[1].trim()}T${u[3].trim()}` : u[1].trim();
    c = new Date(d);
    try {
      c.toISOString();
    } catch {
      throw le(oe.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (ga(t)) {
    if (isNaN(t.getTime()))
      throw le(oe.INVALID_DATE_ARGUMENT);
    c = t;
  } else if (G(t))
    c = t;
  else
    throw le(oe.INVALID_ARGUMENT);
  return I(n) ? a.key = n : A(n) && Object.keys(n).forEach((u) => {
    Lr.includes(u) ? i[u] = n[u] : a[u] = n[u];
  }), I(r) ? a.locale = r : A(r) && (i = r), A(s) && (i = s), [a.key || "", c, a, i];
}
function vn(e, t, n) {
  const r = e;
  for (const s in n) {
    const a = `${t}__${s}`;
    r.__datetimeFormatters.has(a) && r.__datetimeFormatters.delete(a);
  }
}
function Dn(e, ...t) {
  const { numberFormats: n, unresolving: r, fallbackLocale: s, onWarn: a, localeFallbacker: i } = e, { __numberFormatters: c } = e, [u, d, T, y] = Ot(...t), _ = R(T.missingWarn) ? T.missingWarn : e.missingWarn;
  R(T.fallbackWarn) ? T.fallbackWarn : e.fallbackWarn;
  const v = !!T.part, O = jt(e, T), N = i(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    s,
    O
  );
  if (!I(u) || u === "")
    return new Intl.NumberFormat(O, y).format(d);
  let S = {}, f, g = null;
  const E = "number format";
  for (let k = 0; k < N.length && (f = N[k], S = n[f] || {}, g = S[u], !A(g)); k++)
    Gt(e, u, f, _, E);
  if (!A(g) || !I(f))
    return r ? et : u;
  let h = `${f}__${u}`;
  Qe(y) || (h = `${h}__${JSON.stringify(y)}`);
  let D = c.get(h);
  return D || (D = new Intl.NumberFormat(f, K({}, g, y)), c.set(h, D)), v ? D.formatToParts(d) : D.format(d);
}
const Tr = [
  "localeMatcher",
  "style",
  "currency",
  "currencyDisplay",
  "currencySign",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "compactDisplay",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "roundingMode",
  "roundingPriority",
  "roundingIncrement",
  "trailingZeroDisplay"
];
function Ot(...e) {
  const [t, n, r, s] = e, a = U();
  let i = U();
  if (!G(t))
    throw le(oe.INVALID_ARGUMENT);
  const c = t;
  return I(n) ? a.key = n : A(n) && Object.keys(n).forEach((u) => {
    Tr.includes(u) ? i[u] = n[u] : a[u] = n[u];
  }), I(r) ? a.locale = r : A(r) && (i = r), A(s) && (i = s), [a.key || "", c, a, i];
}
function kn(e, t, n) {
  const r = e;
  for (const s in n) {
    const a = `${t}__${s}`;
    r.__numberFormatters.has(a) && r.__numberFormatters.delete(a);
  }
}
const wi = (e) => e, Ai = (e) => "", Ci = "text", Pi = (e) => e.length === 0 ? "" : Vt(e), Ri = ba;
function Nn(e, t) {
  return e = Math.abs(e), t === 2 ? e ? e > 1 ? 1 : 0 : 1 : e ? Math.min(e, 2) : 0;
}
function Mi(e) {
  const t = G(e.pluralIndex) ? e.pluralIndex : -1;
  return e.named && (G(e.named.count) || G(e.named.n)) ? G(e.named.count) ? e.named.count : G(e.named.n) ? e.named.n : t : t;
}
function Fi(e, t) {
  t.count || (t.count = e), t.n || (t.n = e);
}
function Ui(e = {}) {
  const t = e.locale, n = Mi(e), r = M(e.pluralRules) && I(t) && $(e.pluralRules[t]) ? e.pluralRules[t] : Nn, s = M(e.pluralRules) && I(t) && $(e.pluralRules[t]) ? Nn : void 0, a = (f) => f[r(n, f.length, s)], i = e.list || [], c = (f) => i[f], u = e.named || U();
  G(e.pluralIndex) && Fi(n, u);
  const d = (f) => u[f];
  function T(f, g) {
    const E = $(e.messages) ? e.messages(f, !!g) : M(e.messages) ? e.messages[f] : !1;
    return E || (e.parent ? e.parent.message(f) : Ai);
  }
  const y = (f) => e.modifiers ? e.modifiers[f] : wi, _ = A(e.processor) && $(e.processor.normalize) ? e.processor.normalize : Pi, v = A(e.processor) && $(e.processor.interpolate) ? e.processor.interpolate : Ri, O = A(e.processor) && I(e.processor.type) ? e.processor.type : Ci, S = {
    list: c,
    named: d,
    plural: a,
    linked: (f, ...g) => {
      const [E, h] = g;
      let D = "text", k = "";
      g.length === 1 ? M(E) ? (k = E.modifier || k, D = E.type || D) : I(E) && (k = E || k) : g.length === 2 && (I(E) && (k = E || k), I(h) && (D = h || D));
      const L = T(f, !0)(S), x = (
        // The message in vnode resolved with linked are returned as an array by processor.nomalize
        D === "vnode" && Y(L) && k ? L[0] : L
      );
      return k ? y(k)(x, D) : x;
    },
    message: T,
    type: O,
    interpolate: v,
    normalize: _,
    values: K(U(), i, u)
  };
  return S;
}
const Sn = () => "", Q = (e) => $(e);
function On(e, ...t) {
  const { fallbackFormat: n, postTranslation: r, unresolving: s, messageCompiler: a, fallbackLocale: i, messages: c } = e, [u, d] = wt(...t), T = R(d.missingWarn) ? d.missingWarn : e.missingWarn, y = R(d.fallbackWarn) ? d.fallbackWarn : e.fallbackWarn, _ = R(d.escapeParameter) ? d.escapeParameter : e.escapeParameter, v = !!d.resolvedMessage, O = I(d.default) || R(d.default) ? R(d.default) ? a ? u : () => u : d.default : n ? a ? u : () => u : null, N = n || O != null && (I(O) || $(O)), S = jt(e, d);
  _ && Wi(d);
  let [f, g, E] = v ? [
    u,
    S,
    c[S] || U()
  ] : Ir(e, u, S, i, y, T), h = f, D = u;
  if (!v && !(I(h) || se(h) || Q(h)) && N && (h = O, D = h), !v && (!(I(h) || se(h) || Q(h)) || !I(g)))
    return s ? et : u;
  let k = !1;
  const L = () => {
    k = !0;
  }, x = Q(h) ? h : vr(e, u, g, h, D, L);
  if (k)
    return h;
  const V = Vi(e, g, E, d), Z = Ui(V), z = xi(e, x, Z), B = r ? r(z, u) : z;
  if (__INTLIFY_PROD_DEVTOOLS__) {
    const be = {
      timestamp: Date.now(),
      key: I(u) ? u : Q(h) ? h.key : "",
      locale: g || (Q(h) ? h.locale : ""),
      format: I(h) ? h : Q(h) ? h.source : "",
      message: B
    };
    be.meta = K({}, e.__meta, /* @__PURE__ */ Di() || {}), ai(be);
  }
  return B;
}
function Wi(e) {
  Y(e.list) ? e.list = e.list.map((t) => I(t) ? fn(t) : t) : M(e.named) && Object.keys(e.named).forEach((t) => {
    I(e.named[t]) && (e.named[t] = fn(e.named[t]));
  });
}
function Ir(e, t, n, r, s, a) {
  const { messages: i, onWarn: c, messageResolver: u, localeFallbacker: d } = e, T = d(e, r, n);
  let y = U(), _, v = null;
  const O = "translate";
  for (let N = 0; N < T.length && (_ = T[N], y = i[_] || U(), (v = u(y, t)) === null && (v = y[t]), !(I(v) || se(v) || Q(v))); N++)
    if (!Oi(_, T)) {
      const S = Gt(
        e,
        // eslint-disable-line @typescript-eslint/no-explicit-any
        t,
        _,
        a,
        O
      );
      S !== t && (v = S);
    }
  return [v, _, y];
}
function vr(e, t, n, r, s, a) {
  const { messageCompiler: i, warnHtmlMessage: c } = e;
  if (Q(r)) {
    const d = r;
    return d.locale = d.locale || n, d.key = d.key || t, d;
  }
  if (i == null) {
    const d = () => r;
    return d.locale = n, d.key = t, d;
  }
  const u = i(r, $i(e, n, s, r, c, a));
  return u.locale = n, u.key = t, u.source = r, u;
}
function xi(e, t, n) {
  return t(n);
}
function wt(...e) {
  const [t, n, r] = e, s = U();
  if (!I(t) && !G(t) && !Q(t) && !se(t))
    throw le(oe.INVALID_ARGUMENT);
  const a = G(t) ? String(t) : (Q(t), t);
  return G(n) ? s.plural = n : I(n) ? s.default = n : A(n) && !Qe(n) ? s.named = n : Y(n) && (s.list = n), G(r) ? s.plural = r : I(r) ? s.default = r : A(r) && K(s, r), [a, s];
}
function $i(e, t, n, r, s, a) {
  return {
    locale: t,
    key: n,
    warnHtmlMessage: s,
    onError: (i) => {
      throw a && a(i), i;
    },
    onCacheKey: (i) => ha(t, n, i)
  };
}
function Vi(e, t, n, r) {
  const { modifiers: s, pluralRules: a, messageResolver: i, fallbackLocale: c, fallbackWarn: u, missingWarn: d, fallbackContext: T } = e, _ = {
    locale: t,
    modifiers: s,
    pluralRules: a,
    messages: (v, O) => {
      let N = i(n, v);
      if (N == null && (T || O)) {
        const [, , S] = Ir(
          T || e,
          // NOTE: if has fallbackContext, fallback to root, else if use linked, fallback to local context
          v,
          t,
          c,
          u,
          d
        );
        N = i(S, v);
      }
      if (I(N) || se(N)) {
        let S = !1;
        const g = vr(e, v, t, N, v, () => {
          S = !0;
        });
        return S ? Sn : g;
      } else return Q(N) ? N : Sn;
    }
  };
  return e.processor && (_.processor = e.processor), r.list && (_.list = r.list), r.named && (_.named = r.named), G(r.plural) && (_.pluralIndex = r.plural), _;
}
Ka();
/*!
  * vue-i18n v10.0.7
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const Yi = "10.0.7";
function Hi() {
  typeof __VUE_I18N_FULL_INSTALL__ != "boolean" && (ge().__VUE_I18N_FULL_INSTALL__ = !0), typeof __VUE_I18N_LEGACY_API__ != "boolean" && (ge().__VUE_I18N_LEGACY_API__ = !0), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (ge().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1), typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (ge().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
const q = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: oi,
  // 24
  // legacy module errors
  INVALID_ARGUMENT: 25,
  // i18n module errors
  MUST_BE_CALL_SETUP_TOP: 26,
  NOT_INSTALLED: 27,
  // directive module errors
  REQUIRED_VALUE: 28,
  INVALID_VALUE: 29,
  NOT_INSTALLED_WITH_PROVIDE: 31,
  // unexpected error
  UNEXPECTED_ERROR: 32
};
function J(e, ...t) {
  return ze(e, null, void 0);
}
const At = /* @__PURE__ */ fe("__translateVNode"), Ct = /* @__PURE__ */ fe("__datetimeParts"), Pt = /* @__PURE__ */ fe("__numberParts"), Dr = fe("__setPluralRules"), kr = /* @__PURE__ */ fe("__injectWithOption"), Rt = /* @__PURE__ */ fe("__dispose");
function Ue(e) {
  if (!M(e) || se(e))
    return e;
  for (const t in e)
    if (te(e, t))
      if (!t.includes("."))
        M(e[t]) && Ue(e[t]);
      else {
        const n = t.split("."), r = n.length - 1;
        let s = e, a = !1;
        for (let i = 0; i < r; i++) {
          if (n[i] === "__proto__")
            throw new Error(`unsafe key: ${n[i]}`);
          if (n[i] in s || (s[n[i]] = U()), !M(s[n[i]])) {
            a = !0;
            break;
          }
          s = s[n[i]];
        }
        if (a || (se(s) ? hr.includes(n[r]) || delete e[t] : (s[n[r]] = e[t], delete e[t])), !se(s)) {
          const i = s[n[r]];
          M(i) && Ue(i);
        }
      }
  return e;
}
function Kt(e, t) {
  const { messages: n, __i18n: r, messageResolver: s, flatJson: a } = t, i = A(n) ? n : Y(r) ? U() : { [e]: U() };
  if (Y(r) && r.forEach((c) => {
    if ("locale" in c && "resource" in c) {
      const { locale: u, resource: d } = c;
      u ? (i[u] = i[u] || U(), Xe(d, i[u])) : Xe(d, i);
    } else
      I(c) && Xe(JSON.parse(c), i);
  }), s == null && a)
    for (const c in i)
      te(i, c) && Ue(i[c]);
  return i;
}
function Nr(e) {
  return e.type;
}
function Sr(e, t, n) {
  let r = M(t.messages) ? t.messages : U();
  "__i18nGlobal" in n && (r = Kt(e.locale.value, {
    messages: r,
    __i18n: n.__i18nGlobal
  }));
  const s = Object.keys(r);
  s.length && s.forEach((a) => {
    e.mergeLocaleMessage(a, r[a]);
  });
  {
    if (M(t.datetimeFormats)) {
      const a = Object.keys(t.datetimeFormats);
      a.length && a.forEach((i) => {
        e.mergeDateTimeFormat(i, t.datetimeFormats[i]);
      });
    }
    if (M(t.numberFormats)) {
      const a = Object.keys(t.numberFormats);
      a.length && a.forEach((i) => {
        e.mergeNumberFormat(i, t.numberFormats[i]);
      });
    }
  }
}
function wn(e) {
  return ns(rs, null, e, 0);
}
const An = "__INTLIFY_META__", Cn = () => [], ji = () => !1;
let Pn = 0;
function Rn(e) {
  return (t, n, r, s) => e(n, r, Pe() || void 0, s);
}
const Gi = /* @__NO_SIDE_EFFECTS__ */ () => {
  const e = Pe();
  let t = null;
  return e && (t = Nr(e)[An]) ? { [An]: t } : null;
};
function Bt(e = {}) {
  const { __root: t, __injectWithOption: n } = e, r = t === void 0, s = e.flatJson, a = Je ? Bn : es;
  let i = R(e.inheritLocale) ? e.inheritLocale : !0;
  const c = a(
    // prettier-ignore
    t && i ? t.locale.value : I(e.locale) ? e.locale : Fe
  ), u = a(
    // prettier-ignore
    t && i ? t.fallbackLocale.value : I(e.fallbackLocale) || Y(e.fallbackLocale) || A(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : c.value
  ), d = a(Kt(c.value, e)), T = a(A(e.datetimeFormats) ? e.datetimeFormats : { [c.value]: {} }), y = a(A(e.numberFormats) ? e.numberFormats : { [c.value]: {} });
  let _ = t ? t.missingWarn : R(e.missingWarn) || Se(e.missingWarn) ? e.missingWarn : !0, v = t ? t.fallbackWarn : R(e.fallbackWarn) || Se(e.fallbackWarn) ? e.fallbackWarn : !0, O = t ? t.fallbackRoot : R(e.fallbackRoot) ? e.fallbackRoot : !0, N = !!e.fallbackFormat, S = $(e.missing) ? e.missing : null, f = $(e.missing) ? Rn(e.missing) : null, g = $(e.postTranslation) ? e.postTranslation : null, E = t ? t.warnHtmlMessage : R(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, h = !!e.escapeParameter;
  const D = t ? t.modifiers : A(e.modifiers) ? e.modifiers : {};
  let k = e.pluralRules || t && t.pluralRules, L;
  L = (() => {
    r && Ln(null);
    const m = {
      version: Yi,
      locale: c.value,
      fallbackLocale: u.value,
      messages: d.value,
      modifiers: D,
      pluralRules: k,
      missing: f === null ? void 0 : f,
      missingWarn: _,
      fallbackWarn: v,
      fallbackFormat: N,
      unresolving: !0,
      postTranslation: g === null ? void 0 : g,
      warnHtmlMessage: E,
      escapeParameter: h,
      messageResolver: e.messageResolver,
      messageCompiler: e.messageCompiler,
      __meta: { framework: "vue" }
    };
    m.datetimeFormats = T.value, m.numberFormats = y.value, m.__datetimeFormatters = A(L) ? L.__datetimeFormatters : void 0, m.__numberFormatters = A(L) ? L.__numberFormatters : void 0;
    const b = Ni(m);
    return r && Ln(b), b;
  })(), Ce(L, c.value, u.value);
  function V() {
    return [
      c.value,
      u.value,
      d.value,
      T.value,
      y.value
    ];
  }
  const Z = ee({
    get: () => c.value,
    set: (m) => {
      c.value = m, L.locale = c.value;
    }
  }), z = ee({
    get: () => u.value,
    set: (m) => {
      u.value = m, L.fallbackLocale = u.value, Ce(L, c.value, m);
    }
  }), B = ee(() => d.value), be = /* @__PURE__ */ ee(() => T.value), nt = /* @__PURE__ */ ee(() => y.value);
  function rt() {
    return $(g) ? g : null;
  }
  function st(m) {
    g = m, L.postTranslation = m;
  }
  function at() {
    return S;
  }
  function it(m) {
    m !== null && (f = Rn(m)), S = m, L.missing = f;
  }
  const ae = (m, b, W, j, he, He) => {
    V();
    let Ie;
    try {
      __INTLIFY_PROD_DEVTOOLS__, r || (L.fallbackContext = t ? ki() : void 0), Ie = m(L);
    } finally {
      __INTLIFY_PROD_DEVTOOLS__, r || (L.fallbackContext = void 0);
    }
    if (W !== "translate exists" && // for not `te` (e.g `t`)
    G(Ie) && Ie === et || W === "translate exists" && !Ie) {
      const [Cr, Oo] = b();
      return t && O ? j(t) : he(Cr);
    } else {
      if (He(Ie))
        return Ie;
      throw J(q.UNEXPECTED_RETURN_TYPE);
    }
  };
  function $e(...m) {
    return ae((b) => Reflect.apply(On, null, [b, ...m]), () => wt(...m), "translate", (b) => Reflect.apply(b.t, b, [...m]), (b) => b, (b) => I(b));
  }
  function Ve(...m) {
    const [b, W, j] = m;
    if (j && !M(j))
      throw J(q.INVALID_ARGUMENT);
    return $e(b, W, K({ resolvedMessage: !0 }, j || {}));
  }
  function ot(...m) {
    return ae((b) => Reflect.apply(In, null, [b, ...m]), () => St(...m), "datetime format", (b) => Reflect.apply(b.d, b, [...m]), () => En, (b) => I(b));
  }
  function lt(...m) {
    return ae((b) => Reflect.apply(Dn, null, [b, ...m]), () => Ot(...m), "number format", (b) => Reflect.apply(b.n, b, [...m]), () => En, (b) => I(b));
  }
  function ct(m) {
    return m.map((b) => I(b) || G(b) || R(b) ? wn(String(b)) : b);
  }
  const ut = {
    normalize: ct,
    interpolate: (m) => m,
    type: "vnode"
  };
  function ft(...m) {
    return ae((b) => {
      let W;
      const j = b;
      try {
        j.processor = ut, W = Reflect.apply(On, null, [j, ...m]);
      } finally {
        j.processor = null;
      }
      return W;
    }, () => wt(...m), "translate", (b) => b[At](...m), (b) => [wn(b)], (b) => Y(b));
  }
  function Ye(...m) {
    return ae((b) => Reflect.apply(Dn, null, [b, ...m]), () => Ot(...m), "number format", (b) => b[Pt](...m), Cn, (b) => I(b) || Y(b));
  }
  function mt(...m) {
    return ae((b) => Reflect.apply(In, null, [b, ...m]), () => St(...m), "datetime format", (b) => b[Ct](...m), Cn, (b) => I(b) || Y(b));
  }
  function dt(m) {
    k = m, L.pluralRules = k;
  }
  function ht(m, b) {
    return ae(() => {
      if (!m)
        return !1;
      const W = I(b) ? b : c.value, j = Le(W), he = L.messageResolver(j, m);
      return se(he) || Q(he) || I(he);
    }, () => [m], "translate exists", (W) => Reflect.apply(W.te, W, [m, b]), ji, (W) => R(W));
  }
  function _t(m) {
    let b = null;
    const W = _r(L, u.value, c.value);
    for (let j = 0; j < W.length; j++) {
      const he = d.value[W[j]] || {}, He = L.messageResolver(he, m);
      if (He != null) {
        b = He;
        break;
      }
    }
    return b;
  }
  function we(m) {
    const b = _t(m);
    return b ?? (t ? t.tm(m) || {} : {});
  }
  function Le(m) {
    return d.value[m] || {};
  }
  function Te(m, b) {
    if (s) {
      const W = { [m]: b };
      for (const j in W)
        te(W, j) && Ue(W[j]);
      b = W[m];
    }
    d.value[m] = b, L.messages = d.value;
  }
  function Ae(m, b) {
    d.value[m] = d.value[m] || {};
    const W = { [m]: b };
    if (s)
      for (const j in W)
        te(W, j) && Ue(W[j]);
    b = W[m], Xe(b, d.value[m]), L.messages = d.value;
  }
  function gt(m) {
    return T.value[m] || {};
  }
  function o(m, b) {
    T.value[m] = b, L.datetimeFormats = T.value, vn(L, m, b);
  }
  function l(m, b) {
    T.value[m] = K(T.value[m] || {}, b), L.datetimeFormats = T.value, vn(L, m, b);
  }
  function p(m) {
    return y.value[m] || {};
  }
  function w(m, b) {
    y.value[m] = b, L.numberFormats = y.value, kn(L, m, b);
  }
  function H(m, b) {
    y.value[m] = K(y.value[m] || {}, b), L.numberFormats = y.value, kn(L, m, b);
  }
  Pn++, t && Je && (ne(t.locale, (m) => {
    i && (c.value = m, L.locale = m, Ce(L, c.value, u.value));
  }), ne(t.fallbackLocale, (m) => {
    i && (u.value = m, L.fallbackLocale = m, Ce(L, c.value, u.value));
  }));
  const C = {
    id: Pn,
    locale: Z,
    fallbackLocale: z,
    get inheritLocale() {
      return i;
    },
    set inheritLocale(m) {
      i = m, m && t && (c.value = t.locale.value, u.value = t.fallbackLocale.value, Ce(L, c.value, u.value));
    },
    get availableLocales() {
      return Object.keys(d.value).sort();
    },
    messages: B,
    get modifiers() {
      return D;
    },
    get pluralRules() {
      return k || {};
    },
    get isGlobal() {
      return r;
    },
    get missingWarn() {
      return _;
    },
    set missingWarn(m) {
      _ = m, L.missingWarn = _;
    },
    get fallbackWarn() {
      return v;
    },
    set fallbackWarn(m) {
      v = m, L.fallbackWarn = v;
    },
    get fallbackRoot() {
      return O;
    },
    set fallbackRoot(m) {
      O = m;
    },
    get fallbackFormat() {
      return N;
    },
    set fallbackFormat(m) {
      N = m, L.fallbackFormat = N;
    },
    get warnHtmlMessage() {
      return E;
    },
    set warnHtmlMessage(m) {
      E = m, L.warnHtmlMessage = m;
    },
    get escapeParameter() {
      return h;
    },
    set escapeParameter(m) {
      h = m, L.escapeParameter = m;
    },
    t: $e,
    getLocaleMessage: Le,
    setLocaleMessage: Te,
    mergeLocaleMessage: Ae,
    getPostTranslationHandler: rt,
    setPostTranslationHandler: st,
    getMissingHandler: at,
    setMissingHandler: it,
    [Dr]: dt
  };
  return C.datetimeFormats = be, C.numberFormats = nt, C.rt = Ve, C.te = ht, C.tm = we, C.d = ot, C.n = lt, C.getDateTimeFormat = gt, C.setDateTimeFormat = o, C.mergeDateTimeFormat = l, C.getNumberFormat = p, C.setNumberFormat = w, C.mergeNumberFormat = H, C[kr] = n, C[At] = ft, C[Ct] = mt, C[Pt] = Ye, C;
}
function Ki(e) {
  const t = I(e.locale) ? e.locale : Fe, n = I(e.fallbackLocale) || Y(e.fallbackLocale) || A(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : t, r = $(e.missing) ? e.missing : void 0, s = R(e.silentTranslationWarn) || Se(e.silentTranslationWarn) ? !e.silentTranslationWarn : !0, a = R(e.silentFallbackWarn) || Se(e.silentFallbackWarn) ? !e.silentFallbackWarn : !0, i = R(e.fallbackRoot) ? e.fallbackRoot : !0, c = !!e.formatFallbackMessages, u = A(e.modifiers) ? e.modifiers : {}, d = e.pluralizationRules, T = $(e.postTranslation) ? e.postTranslation : void 0, y = I(e.warnHtmlInMessage) ? e.warnHtmlInMessage !== "off" : !0, _ = !!e.escapeParameterHtml, v = R(e.sync) ? e.sync : !0;
  let O = e.messages;
  if (A(e.sharedMessages)) {
    const D = e.sharedMessages;
    O = Object.keys(D).reduce((L, x) => {
      const V = L[x] || (L[x] = {});
      return K(V, D[x]), L;
    }, O || {});
  }
  const { __i18n: N, __root: S, __injectWithOption: f } = e, g = e.datetimeFormats, E = e.numberFormats, h = e.flatJson;
  return {
    locale: t,
    fallbackLocale: n,
    messages: O,
    flatJson: h,
    datetimeFormats: g,
    numberFormats: E,
    missing: r,
    missingWarn: s,
    fallbackWarn: a,
    fallbackRoot: i,
    fallbackFormat: c,
    modifiers: u,
    pluralRules: d,
    postTranslation: T,
    warnHtmlMessage: y,
    escapeParameter: _,
    messageResolver: e.messageResolver,
    inheritLocale: v,
    __i18n: N,
    __root: S,
    __injectWithOption: f
  };
}
function Mt(e = {}) {
  const t = Bt(Ki(e)), { __extender: n } = e, r = {
    // id
    id: t.id,
    // locale
    get locale() {
      return t.locale.value;
    },
    set locale(s) {
      t.locale.value = s;
    },
    // fallbackLocale
    get fallbackLocale() {
      return t.fallbackLocale.value;
    },
    set fallbackLocale(s) {
      t.fallbackLocale.value = s;
    },
    // messages
    get messages() {
      return t.messages.value;
    },
    // datetimeFormats
    get datetimeFormats() {
      return t.datetimeFormats.value;
    },
    // numberFormats
    get numberFormats() {
      return t.numberFormats.value;
    },
    // availableLocales
    get availableLocales() {
      return t.availableLocales;
    },
    // missing
    get missing() {
      return t.getMissingHandler();
    },
    set missing(s) {
      t.setMissingHandler(s);
    },
    // silentTranslationWarn
    get silentTranslationWarn() {
      return R(t.missingWarn) ? !t.missingWarn : t.missingWarn;
    },
    set silentTranslationWarn(s) {
      t.missingWarn = R(s) ? !s : s;
    },
    // silentFallbackWarn
    get silentFallbackWarn() {
      return R(t.fallbackWarn) ? !t.fallbackWarn : t.fallbackWarn;
    },
    set silentFallbackWarn(s) {
      t.fallbackWarn = R(s) ? !s : s;
    },
    // modifiers
    get modifiers() {
      return t.modifiers;
    },
    // formatFallbackMessages
    get formatFallbackMessages() {
      return t.fallbackFormat;
    },
    set formatFallbackMessages(s) {
      t.fallbackFormat = s;
    },
    // postTranslation
    get postTranslation() {
      return t.getPostTranslationHandler();
    },
    set postTranslation(s) {
      t.setPostTranslationHandler(s);
    },
    // sync
    get sync() {
      return t.inheritLocale;
    },
    set sync(s) {
      t.inheritLocale = s;
    },
    // warnInHtmlMessage
    get warnHtmlInMessage() {
      return t.warnHtmlMessage ? "warn" : "off";
    },
    set warnHtmlInMessage(s) {
      t.warnHtmlMessage = s !== "off";
    },
    // escapeParameterHtml
    get escapeParameterHtml() {
      return t.escapeParameter;
    },
    set escapeParameterHtml(s) {
      t.escapeParameter = s;
    },
    // pluralizationRules
    get pluralizationRules() {
      return t.pluralRules || {};
    },
    // for internal
    __composer: t,
    // t
    t(...s) {
      return Reflect.apply(t.t, t, [...s]);
    },
    // rt
    rt(...s) {
      return Reflect.apply(t.rt, t, [...s]);
    },
    // tc
    tc(...s) {
      const [a, i, c] = s, u = { plural: 1 };
      let d = null, T = null;
      if (!I(a))
        throw J(q.INVALID_ARGUMENT);
      const y = a;
      return I(i) ? u.locale = i : G(i) ? u.plural = i : Y(i) ? d = i : A(i) && (T = i), I(c) ? u.locale = c : Y(c) ? d = c : A(c) && (T = c), Reflect.apply(t.t, t, [
        y,
        d || T || {},
        u
      ]);
    },
    // te
    te(s, a) {
      return t.te(s, a);
    },
    // tm
    tm(s) {
      return t.tm(s);
    },
    // getLocaleMessage
    getLocaleMessage(s) {
      return t.getLocaleMessage(s);
    },
    // setLocaleMessage
    setLocaleMessage(s, a) {
      t.setLocaleMessage(s, a);
    },
    // mergeLocaleMessage
    mergeLocaleMessage(s, a) {
      t.mergeLocaleMessage(s, a);
    },
    // d
    d(...s) {
      return Reflect.apply(t.d, t, [...s]);
    },
    // getDateTimeFormat
    getDateTimeFormat(s) {
      return t.getDateTimeFormat(s);
    },
    // setDateTimeFormat
    setDateTimeFormat(s, a) {
      t.setDateTimeFormat(s, a);
    },
    // mergeDateTimeFormat
    mergeDateTimeFormat(s, a) {
      t.mergeDateTimeFormat(s, a);
    },
    // n
    n(...s) {
      return Reflect.apply(t.n, t, [...s]);
    },
    // getNumberFormat
    getNumberFormat(s) {
      return t.getNumberFormat(s);
    },
    // setNumberFormat
    setNumberFormat(s, a) {
      t.setNumberFormat(s, a);
    },
    // mergeNumberFormat
    mergeNumberFormat(s, a) {
      t.mergeNumberFormat(s, a);
    }
  };
  return r.__extender = n, r;
}
function Bi(e, t, n) {
  return {
    beforeCreate() {
      const r = Pe();
      if (!r)
        throw J(q.UNEXPECTED_ERROR);
      const s = this.$options;
      if (s.i18n) {
        const a = s.i18n;
        if (s.__i18n && (a.__i18n = s.__i18n), a.__root = t, this === this.$root)
          this.$i18n = Mn(e, a);
        else {
          a.__injectWithOption = !0, a.__extender = n.__vueI18nExtend, this.$i18n = Mt(a);
          const i = this.$i18n;
          i.__extender && (i.__disposer = i.__extender(this.$i18n));
        }
      } else if (s.__i18n)
        if (this === this.$root)
          this.$i18n = Mn(e, s);
        else {
          this.$i18n = Mt({
            __i18n: s.__i18n,
            __injectWithOption: !0,
            __extender: n.__vueI18nExtend,
            __root: t
          });
          const a = this.$i18n;
          a.__extender && (a.__disposer = a.__extender(this.$i18n));
        }
      else
        this.$i18n = e;
      s.__i18nGlobal && Sr(t, s, s), this.$t = (...a) => this.$i18n.t(...a), this.$rt = (...a) => this.$i18n.rt(...a), this.$tc = (...a) => this.$i18n.tc(...a), this.$te = (a, i) => this.$i18n.te(a, i), this.$d = (...a) => this.$i18n.d(...a), this.$n = (...a) => this.$i18n.n(...a), this.$tm = (a) => this.$i18n.tm(a), n.__setInstance(r, this.$i18n);
    },
    mounted() {
    },
    unmounted() {
      const r = Pe();
      if (!r)
        throw J(q.UNEXPECTED_ERROR);
      const s = this.$i18n;
      delete this.$t, delete this.$rt, delete this.$tc, delete this.$te, delete this.$d, delete this.$n, delete this.$tm, s.__disposer && (s.__disposer(), delete s.__disposer, delete s.__extender), n.__deleteInstance(r), delete this.$i18n;
    }
  };
}
function Mn(e, t) {
  e.locale = t.locale || e.locale, e.fallbackLocale = t.fallbackLocale || e.fallbackLocale, e.missing = t.missing || e.missing, e.silentTranslationWarn = t.silentTranslationWarn || e.silentFallbackWarn, e.silentFallbackWarn = t.silentFallbackWarn || e.silentFallbackWarn, e.formatFallbackMessages = t.formatFallbackMessages || e.formatFallbackMessages, e.postTranslation = t.postTranslation || e.postTranslation, e.warnHtmlInMessage = t.warnHtmlInMessage || e.warnHtmlInMessage, e.escapeParameterHtml = t.escapeParameterHtml || e.escapeParameterHtml, e.sync = t.sync || e.sync, e.__composer[Dr](t.pluralizationRules || e.pluralizationRules);
  const n = Kt(e.locale, {
    messages: t.messages,
    __i18n: t.__i18n
  });
  return Object.keys(n).forEach((r) => e.mergeLocaleMessage(r, n[r])), t.datetimeFormats && Object.keys(t.datetimeFormats).forEach((r) => e.mergeDateTimeFormat(r, t.datetimeFormats[r])), t.numberFormats && Object.keys(t.numberFormats).forEach((r) => e.mergeNumberFormat(r, t.numberFormats[r])), e;
}
const Xt = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
    validator: (e) => e === "parent" || e === "global",
    default: "parent"
    /* ComponentI18nScope */
  },
  i18n: {
    type: Object
  }
};
function Xi({ slots: e }, t) {
  return t.length === 1 && t[0] === "default" ? (e.default ? e.default() : []).reduce((r, s) => [
    ...r,
    // prettier-ignore
    ...s.type === qn ? s.children : [s]
  ], []) : t.reduce((n, r) => {
    const s = e[r];
    return s && (n[r] = s()), n;
  }, U());
}
function Or() {
  return qn;
}
const qi = /* @__PURE__ */ xt({
  /* eslint-disable */
  name: "i18n-t",
  props: K({
    keypath: {
      type: String,
      required: !0
    },
    plural: {
      type: [Number, String],
      validator: (e) => G(e) || !isNaN(e)
    }
  }, Xt),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const { slots: n, attrs: r } = t, s = e.i18n || qt({
      useScope: e.scope,
      __useComponent: !0
    });
    return () => {
      const a = Object.keys(n).filter((y) => y !== "_"), i = U();
      e.locale && (i.locale = e.locale), e.plural !== void 0 && (i.plural = I(e.plural) ? +e.plural : e.plural);
      const c = Xi(t, a), u = s[At](e.keypath, c, i), d = K(U(), r), T = I(e.tag) || M(e.tag) ? e.tag : Or();
      return Xn(T, d, u);
    };
  }
}), Fn = qi;
function Ji(e) {
  return Y(e) && !I(e[0]);
}
function wr(e, t, n, r) {
  const { slots: s, attrs: a } = t;
  return () => {
    const i = { part: !0 };
    let c = U();
    e.locale && (i.locale = e.locale), I(e.format) ? i.key = e.format : M(e.format) && (I(e.format.key) && (i.key = e.format.key), c = Object.keys(e.format).reduce((_, v) => n.includes(v) ? K(U(), _, { [v]: e.format[v] }) : _, U()));
    const u = r(e.value, i, c);
    let d = [i.key];
    Y(u) ? d = u.map((_, v) => {
      const O = s[_.type], N = O ? O({ [_.type]: _.value, index: v, parts: u }) : [_.value];
      return Ji(N) && (N[0].key = `${_.type}-${v}`), N;
    }) : I(u) && (d = [u]);
    const T = K(U(), a), y = I(e.tag) || M(e.tag) ? e.tag : Or();
    return Xn(y, T, d);
  };
}
const Zi = /* @__PURE__ */ xt({
  /* eslint-disable */
  name: "i18n-n",
  props: K({
    value: {
      type: Number,
      required: !0
    },
    format: {
      type: [String, Object]
    }
  }, Xt),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const n = e.i18n || qt({
      useScope: e.scope,
      __useComponent: !0
    });
    return wr(e, t, Tr, (...r) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      n[Pt](...r)
    ));
  }
}), Un = Zi, Qi = /* @__PURE__ */ xt({
  /* eslint-disable */
  name: "i18n-d",
  props: K({
    value: {
      type: [Number, Date],
      required: !0
    },
    format: {
      type: [String, Object]
    }
  }, Xt),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const n = e.i18n || qt({
      useScope: e.scope,
      __useComponent: !0
    });
    return wr(e, t, Lr, (...r) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      n[Ct](...r)
    ));
  }
}), Wn = Qi;
function zi(e, t) {
  const n = e;
  if (e.mode === "composition")
    return n.__getInstance(t) || e.global;
  {
    const r = n.__getInstance(t);
    return r != null ? r.__composer : e.global.__composer;
  }
}
function eo(e) {
  const t = (i) => {
    const { instance: c, value: u } = i;
    if (!c || !c.$)
      throw J(q.UNEXPECTED_ERROR);
    const d = zi(e, c.$), T = xn(u);
    return [
      Reflect.apply(d.t, d, [...$n(T)]),
      d
    ];
  };
  return {
    created: (i, c) => {
      const [u, d] = t(c);
      Je && e.global === d && (i.__i18nWatcher = ne(d.locale, () => {
        c.instance && c.instance.$forceUpdate();
      })), i.__composer = d, i.textContent = u;
    },
    unmounted: (i) => {
      Je && i.__i18nWatcher && (i.__i18nWatcher(), i.__i18nWatcher = void 0, delete i.__i18nWatcher), i.__composer && (i.__composer = void 0, delete i.__composer);
    },
    beforeUpdate: (i, { value: c }) => {
      if (i.__composer) {
        const u = i.__composer, d = xn(c);
        i.textContent = Reflect.apply(u.t, u, [
          ...$n(d)
        ]);
      }
    },
    getSSRProps: (i) => {
      const [c] = t(i);
      return { textContent: c };
    }
  };
}
function xn(e) {
  if (I(e))
    return { path: e };
  if (A(e)) {
    if (!("path" in e))
      throw J(q.REQUIRED_VALUE, "path");
    return e;
  } else
    throw J(q.INVALID_VALUE);
}
function $n(e) {
  const { path: t, locale: n, args: r, choice: s, plural: a } = e, i = {}, c = r || {};
  return I(n) && (i.locale = n), G(s) && (i.plural = s), G(a) && (i.plural = a), [t, c, i];
}
function to(e, t, ...n) {
  const r = A(n[0]) ? n[0] : {};
  (R(r.globalInstall) ? r.globalInstall : !0) && ([Fn.name, "I18nT"].forEach((a) => e.component(a, Fn)), [Un.name, "I18nN"].forEach((a) => e.component(a, Un)), [Wn.name, "I18nD"].forEach((a) => e.component(a, Wn))), e.directive("t", eo(t));
}
const no = /* @__PURE__ */ fe("global-vue-i18n");
function ro(e = {}, t) {
  const n = __VUE_I18N_LEGACY_API__ && R(e.legacy) ? e.legacy : __VUE_I18N_LEGACY_API__, r = R(e.globalInjection) ? e.globalInjection : !0, s = /* @__PURE__ */ new Map(), [a, i] = so(e, n), c = /* @__PURE__ */ fe("");
  function u(_) {
    return s.get(_) || null;
  }
  function d(_, v) {
    s.set(_, v);
  }
  function T(_) {
    s.delete(_);
  }
  const y = {
    // mode
    get mode() {
      return __VUE_I18N_LEGACY_API__ && n ? "legacy" : "composition";
    },
    // install plugin
    async install(_, ...v) {
      if (_.__VUE_I18N_SYMBOL__ = c, _.provide(_.__VUE_I18N_SYMBOL__, y), A(v[0])) {
        const S = v[0];
        y.__composerExtend = S.__composerExtend, y.__vueI18nExtend = S.__vueI18nExtend;
      }
      let O = null;
      !n && r && (O = mo(_, y.global)), __VUE_I18N_FULL_INSTALL__ && to(_, y, ...v), __VUE_I18N_LEGACY_API__ && n && _.mixin(Bi(i, i.__composer, y));
      const N = _.unmount;
      _.unmount = () => {
        O && O(), y.dispose(), N();
      };
    },
    // global accessor
    get global() {
      return i;
    },
    dispose() {
      a.stop();
    },
    // @internal
    __instances: s,
    // @internal
    __getInstance: u,
    // @internal
    __setInstance: d,
    // @internal
    __deleteInstance: T
  };
  return y;
}
function qt(e = {}) {
  const t = Pe();
  if (t == null)
    throw J(q.MUST_BE_CALL_SETUP_TOP);
  if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__)
    throw J(q.NOT_INSTALLED);
  const n = ao(t), r = oo(n), s = Nr(t), a = io(e, s);
  if (a === "global")
    return Sr(r, e, s), r;
  if (a === "parent") {
    let u = lo(n, t, e.__useComponent);
    return u == null && (u = r), u;
  }
  const i = n;
  let c = i.__getInstance(t);
  if (c == null) {
    const u = K({}, e);
    "__i18n" in s && (u.__i18n = s.__i18n), r && (u.__root = r), c = Bt(u), i.__composerExtend && (c[Rt] = i.__composerExtend(c)), uo(i, t, c), i.__setInstance(t, c);
  }
  return c;
}
function so(e, t, n) {
  const r = Lt(), s = __VUE_I18N_LEGACY_API__ && t ? r.run(() => Mt(e)) : r.run(() => Bt(e));
  if (s == null)
    throw J(q.UNEXPECTED_ERROR);
  return [r, s];
}
function ao(e) {
  const t = ke(e.isCE ? no : e.appContext.app.__VUE_I18N_SYMBOL__);
  if (!t)
    throw J(e.isCE ? q.NOT_INSTALLED_WITH_PROVIDE : q.UNEXPECTED_ERROR);
  return t;
}
function io(e, t) {
  return Qe(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local";
}
function oo(e) {
  return e.mode === "composition" ? e.global : e.global.__composer;
}
function lo(e, t, n = !1) {
  let r = null;
  const s = t.root;
  let a = co(t, n);
  for (; a != null; ) {
    const i = e;
    if (e.mode === "composition")
      r = i.__getInstance(a);
    else if (__VUE_I18N_LEGACY_API__) {
      const c = i.__getInstance(a);
      c != null && (r = c.__composer, n && r && !r[kr] && (r = null));
    }
    if (r != null || s === a)
      break;
    a = a.parent;
  }
  return r;
}
function co(e, t = !1) {
  return e == null ? null : t && e.vnode.ctx || e.parent;
}
function uo(e, t, n) {
  Jn(() => {
  }, t), Zn(() => {
    const r = n;
    e.__deleteInstance(t);
    const s = r[Rt];
    s && (s(), delete r[Rt]);
  }, t);
}
const fo = [
  "locale",
  "fallbackLocale",
  "availableLocales"
], Vn = ["t", "rt", "d", "n", "tm", "te"];
function mo(e, t) {
  const n = /* @__PURE__ */ Object.create(null);
  return fo.forEach((s) => {
    const a = Object.getOwnPropertyDescriptor(t, s);
    if (!a)
      throw J(q.UNEXPECTED_ERROR);
    const i = ts(a.value) ? {
      get() {
        return a.value.value;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(c) {
        a.value.value = c;
      }
    } : {
      get() {
        return a.get && a.get();
      }
    };
    Object.defineProperty(n, s, i);
  }), e.config.globalProperties.$i18n = n, Vn.forEach((s) => {
    const a = Object.getOwnPropertyDescriptor(t, s);
    if (!a || !a.value)
      throw J(q.UNEXPECTED_ERROR);
    Object.defineProperty(e.config.globalProperties, `$${s}`, a);
  }), () => {
    delete e.config.globalProperties.$i18n, Vn.forEach((s) => {
      delete e.config.globalProperties[`$${s}`];
    });
  };
}
Hi();
Li(ni);
Ti(yi);
Ii(_r);
if (__INTLIFY_PROD_DEVTOOLS__) {
  const e = ge();
  e.__INTLIFY__ = !0, ri(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
function ho() {
  const t = (Br("lang", ",") || ["en"]).map(
    (n) => n.toLowerCase().replace(/[_-](\w+)/, "")
  ).find((n) => n in Wt.locales);
  return ro({
    legacy: !1,
    globalInjection: !0,
    fallbackLocale: "en",
    locale: t
  });
}
const tt = ho(), pe = tt.global.t;
function _o({ path: e = "./", fallback: t = !0, composer: n = null } = {}) {
  return n ?? (n = tt.global), Hn({ composer: n, path: e, fallback: t }), ne(() => n.locale, () => Hn({ composer: n, path: e, fallback: t })), n;
}
function xo(e, t, n) {
  if (!(n in Wt.locales))
    throw Error("Locale is not provided by config.");
  e.global.locale.value = n, Ft(e, t, n), document.querySelector("html").setAttribute("lang", n);
}
const Yn = /* @__PURE__ */ new Set();
function Hn({ path: e = "./", fallback: t = !0, composer: n = null } = {}) {
  n ?? (n = tt.global), e.startsWith("/") || (e = import.meta.resolve(e)), e.endsWith("/") || (e += "/");
  let r = Ft(n, e, ye(n.locale));
  return t && n.fallbackLocale.value && (r = r.catch((s) => Ft(n, e, ye(n.fallbackLocale))).catch((s) => {
    throw Error(
      `Could not load locale ${n.locale.value} nor its fallback ${n.fallbackLocale.value} (path: ${e}). Error: ${s}`
    );
  })), r;
}
async function Ft(e, t, n) {
  const r = n.replace(/[_-](\w+)/, "");
  if (t = `${t}locales/${r}.json`, Yn.has(t))
    return;
  Yn.add(t);
  const s = await fetch(t).then((a) => a.json());
  e.messages.value[n] = {
    ...e.messages.value[n],
    ...s
  };
}
const jn = {
  model: (e) => `models.${e.entity}`,
  field: (e) => `fields.${e}`
};
function $o({ App: e = null, el: t = "#app", onLoad: n = !0, ...r } = {}) {
  function s() {
    const a = go(e, r), i = t ? a.mount(t) : null;
    return document.body.classList.remove("loading"), { app: a, el: t, vm: i };
  }
  return new Promise((a) => {
    if (n)
      return window.addEventListener(
        "load",
        () => a(s())
      );
    a(s());
  });
}
function go(e, { props: t = {}, vuetify: n = {}, plugins: r = null } = {}) {
  return e = ss(e, t), e.config.globalProperties.window = window, e.use(po(n)), e.use(tt), _o(), r && r.forEach((s) => e.use(s)), e;
}
function po({ components: e = {}, defaults: t = {}, ...n }) {
  return n.components = {
    ...os,
    ...e
  }, sr({
    blueprint: ma,
    theme: {
      themes: {
        light: {
          dark: !1,
          colors: {
            primary: cn.green.darken1,
            secondary: cn.green.lighten4
          }
        }
      }
    },
    defaults: {
      ...t,
      VTextField: { variant: "underlined" },
      VSelect: { variant: "underlined" },
      VTextarea: { variant: "underlined" },
      VCombobox: { variant: "underlined" },
      VAutocomplete: { variant: "underlined" }
    },
    ...n
  });
}
function Vo({ axiosConfig: e = null, baseURL: t = null } = {}) {
  t || (t = document.body.dataset.apiUrl);
  const n = Xr(), r = qr({
    plugins: [
      Is({
        axios: is,
        ...e || Wt.axiosConfig,
        baseURL: t
      })
    ]
  });
  return Jr(n), n.use(r);
}
class We {
  /**
  * @param {Repos} [repos] all models repositories
  * @param {Repository<M>} [repo] the main repository
  */
  constructor(t, n = null) {
    this.repo = t, this.repos = n;
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
  async fetch({ url: t, id: n = null, ids: r = null, repo: s = null, lookup: a = "id__in", params: i = void 0, relations: c = null, path: u = null, ...d } = {}) {
    var y, _, v, O, N;
    if (s ?? (s = this.repo), (r == null ? void 0 : r.length) === 1 && (n = r[0], r = null), t || (t = (_ = (y = s.use) == null ? void 0 : y.meta) == null ? void 0 : _.getUrl({ path: u, id: n })), n ? d.dataKey = null : d.dataKey ?? (d.dataKey = (N = (O = (v = s.use) == null ? void 0 : v.config) == null ? void 0 : O.axiosApi) == null ? void 0 : N.dataKey), r && a !== void 0) {
      if (n)
        throw Error("Both `ids` and `id` are provided while only one of those arguments is accepted.");
      i = { ...i || {} }, i[a] = [...r];
    }
    const T = await s.api().get(t, { ...d, params: i });
    return c && (T.relations = await this.relations(T.entities, c, { ...d, params: {} })), T;
  }
  /**
   * Fetch all items from api.
   *
   * @param [options.nextKey] response object key to get next url
   * @param [options.limit] max count of consecutive requests
   * @return Response of the first request, whoses ``entities`` has \
   * model instances of all requests.
   */
  async all({ nextKey: t = "next", limit: n = -1, ...r } = {}) {
    const s = await this.fetch(r);
    let a = s.response.data[t];
    for (; a; ) {
      const i = await this.fetch({ ...r, url: a });
      if (i.entities && (s.entities = s.entities !== null ? s.entities.concat(i.entities) : i.entities), a = i.response.data[t], n > 0 && n--, !n) break;
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
  async allOnce(t = {}) {
    return (t.repo ?? this.repo).first() ? null : await this.all(t);
  }
  /**
   * Fetch related objects for the provided list and field names.
   *
   * @param objs - the objects to get related ids from.
   * @param options.fields - list of field names.
   * @param options.opts - options to pass down to {@link Quey.relation}.
   * @return the resulting entities.
   */
  async relations(t, n, r = {}) {
    var i;
    this._ensureRepos("relations");
    const s = {}, a = (i = this.repo.use) == null ? void 0 : i.fields();
    if (a)
      for (const c of n) {
        const u = a[c];
        if (u instanceof Gn)
          s[c] = await this.relation(t, u, r);
        else
          throw Error(`Field ${c} is not a relation`);
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
   * @param options - options to pass down to `all()`.
   */
  async relation(t, n, r = {}) {
    this._ensureRepos("relations");
    const s = zn(this.repo, n);
    if (!s)
      throw Error(`No Relation found for field ${n}.`);
    const a = s.related.constructor.entity, i = this.repos[a];
    if (!i)
      throw Error(`No repository "${a}" found.`);
    const c = er(s);
    if (!c)
      throw Error(`No source ids attributes for ${n}.`);
    const u = [...new Set(Zr(t, c))];
    return new We(i, this.repos).all({ ...r, ids: u, repo: i });
  }
}
function yo(e, t) {
  if (typeof e == "string") {
    if (!(e in t))
      throw Error(`Repository "${e}" is not present in provided repositories.`);
    return new We(t[e], t);
  }
  return new We(e, t);
}
class Ar {
  constructor(t) {
    P(this, "state", Ne.none());
    P(this, "value", {});
    P(this, "default", {});
    t && Ze(this, t), this.state || (this.state = new Ne()), this.value = {}, this.valid = !0, this.reset(this.initial);
  }
  get initial() {
    return this.props.initial || {};
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
  reset(t = null) {
    Qr(this.value, t || {}), this.state.none();
  }
  isEdited() {
    return !_e.isEqual(this.value, this.initial);
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
    var r;
    if (this.state.processing(), !this.valid)
      return this.state.error({
        _: "Some of the input values are invalid"
      });
    t = this.serialize(t ?? this.value);
    const n = await this.send(t);
    return n.isOk ? (this.reset(n.data), (r = this.saved) == null || r.call(this, this.value)) : this.state = n, this.state;
  }
  /**
   * This method is called when editor successfully saved the
   * edited item to the server.
   *
   * By default, it will call {@link Editor.props.saved} if provided.
   */
  saved(t) {
    var n, r;
    (r = (n = this.props).saved) == null || r.call(n, t, this);
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
class Eo {
  constructor(t = null) {
    P(this, "index", "list.table");
    P(this, "view", "");
    P(this, "value", null);
    P(this, "item", null);
    P(this, "editions", /* @__PURE__ */ new Set());
    /**
     * Translation key for message displayed on `confirm()` to leave unsaved
     * changes.
     */
    P(this, "confirmTKey", "panel.confirm");
    t && Ze(this, t), this.view ?? (this.view = this.index || "");
  }
  /** Panel name (based on props) **/
  get name() {
    var t;
    return ((t = this.props) == null ? void 0 : t.name) || "";
  }
  /** Wether there are still edited items on current view. */
  get edited() {
    var t;
    return !!((t = this.editions) != null && t.size);
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
  /** Return URL GET parameters for the current view */
  getUrlParams() {
    const t = { panel: this.name };
    return this.view != this.index && (t.view = this.view), this.view.startsWith("detail.") && this.value && (t.value = this.value), t;
  }
  /** Set or remove an edition by name. */
  setEdition(t, n) {
    n ? this.editions.add(t) : this.editions.delete(t);
  }
  /** Show a view, providing optional value */
  show({ view: t = null, value: n = null } = {}) {
    this.onLeave() && (t !== null && (this.view = t || this.index), this.value = n);
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
    const t = pe(this.confirmTKey);
    return confirm(t);
  }
  onViewChange(t) {
    t || (this.view = this.index);
  }
  onValueChange(t) {
  }
}
class bo {
  constructor(t = null) {
    P(this, "panel", "");
    P(this, "params", {});
    P(this, "paramsString", "");
    P(this, "children", {});
    t && Ze(this, t), this.readDocumentLocation();
  }
  get current() {
    return this.children[this.panel] || null;
  }
  /**
   * Set {@link Panels.params
   */
  readDocumentLocation() {
    this.paramsString = document.location.search;
    const t = new URLSearchParams(this.paramsString);
    this.params = Object.fromEntries(t.entries());
  }
  static readPath(t) {
    if (!t)
      return { panel: "", view: "" };
    const n = t.indexOf(".");
    return n < 0 ? { panel: t, view: "" } : { panel: t.substring(0, n), view: t.substring(n + 1) };
  }
  register(t, n) {
    this.children[t] = n;
  }
  unregister(t) {
    delete this.children[t];
  }
  show({ force: t = !1, href: n = null, ...r }) {
    if (t || !this.current || this.current.onLeave()) {
      if (n && window.location.pathname != n) {
        if (!r.panel)
          throw Error("The attribute `href` requires`panel`.");
        n = `${n}?panel=${r.panel}`, r.view && (n = `${n}&view=${r.view || ""}`), window.location.href = n;
        return;
      }
      this.reset(r);
    }
  }
  reset({ panel: t, view: n = null, value: r = null, id: s = null }) {
    t && t != this.panel && this.current && !this.current.onLeave() || (this.panel = t || this.panel, this.params = { view: n, value: r, id: s });
  }
}
class Lo {
  constructor(t = null) {
    P(this, "state", Ne.none());
    P(this, "save", !0);
    t && Ze(this, t);
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
  queryset(t = null, n = !1) {
    let r = this.repo.query();
    if (this.relations)
      for (const s of this.relations)
        r = r.with(s);
    return t ? r.whereId(t) : r;
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
  async load(t = {}) {
    this.state.processing();
    let n = null;
    try {
      n = await this.fetch(t), n = await this.handleResponse(t, n);
    } catch (r) {
      this.state.error(r);
    }
    return this.state.isError || this.state.none(), n;
  }
  /** Fetch model instance from the server.
   *
   * Flowchart:
   * - {@link ModelController.getQueryParams}
   * - {@link Query.fetch}
   */
  async fetch(t = {}) {
    const n = this.getQueryOptions(t);
    return await this.query.fetch(n);
  }
  /** Handle response from the {@link ModelContainer.fetch}'s request. */
  async handleResponse(t, n) {
    return n;
  }
  /** Get {@link Query.fetch} options. */
  getQueryOptions(t) {
    return !t.relations && this.relations && this.fetchRelations && (t.relations = this.relations), t.url || (t.url = this.url), "save" in t || (t.save = this.save), t;
  }
}
class To extends Lo {
  constructor() {
    super(...arguments);
    // ids: number[] = []
    P(this, "items", []);
    P(this, "filters", {});
    P(this, "nextUrl", null);
    P(this, "prevUrl", null);
    P(this, "count", null);
    P(this, "dataKey", "results");
    P(this, "nextKey", "next");
    P(this, "prevKey", "previous");
    P(this, "countKey", "count");
  }
  /** Get items count. */
  get length() {
    return this.items.length;
  }
  /** Get ids **/
  get ids() {
    return this.items.map((n) => n.id);
  }
  /** Get item by list index */
  get(n) {
    return n < this.items.length ? this.items[n] : null;
  }
  /** Get item index by id */
  findIndex(n) {
    return this.items.findIndex((r) => r.id == n);
  }
  /**
   * Get item id next to provided one at the specified direction.
   *
   * @param item - reference item
   * @param step - increment or decrement item index by this value.
   * @return the target item id or null if not found.
   */
  getSiblingIndex(n, r) {
    if (n === null)
      return -1;
    const s = this.findIndex(n.id), a = s >= 0 ? s + r : -1;
    return a >= 0 && a < this.items.length ? a : -1;
  }
  /**
   * Fetch next items from API, override `url` using {@link ModelList.nextUrl}.
   */
  async loadNext(n) {
    return await this.load({ ...n, url: this.nextUrl });
  }
  /**
   * Fetch previous items from API, override `url` using {@link ModelList.prevUrl}.
   */
  async loadPrev(n) {
    return await this.load({ ...n, url: this.prevUrl });
  }
  getQueryOptions(n) {
    return this.filters && (n.params = { ...this.filters, ...n.params ?? [] }), super.getQueryOptions(n);
  }
  /**
   * Handle response from API.
   * Reset list and context information such as next/prev url, total count.
   */
  async handleResponse({ append: n = !1, ...r }, s) {
    return s = await super.handleResponse(r, s), this.state.isError || (typeof n == "number" ? this.items.splice(n, 0, ...s.entities) : this.items = n ? this.items.concat(s.entities) : s.entities, this.items = _e.uniqWith(this.items, (a, i) => a.id == i.id), this.nextUrl = s.response.data[this.nextKey] || null, this.prevUrl = s.response.data[this.prevKey] || null, this.count = s.response.data[this.countKey] || this.length), s;
  }
}
class Io extends Ar {
  constructor(t) {
    t.fields = Object.keys(t.props.repo.use.fields()), t.empty ?? (t.empty = new t.props.repo.use()), super(t);
  }
  get repo() {
    return this.props.repo;
  }
  get name() {
    return this.props.name || `${this.repo.use.entity}-edit`;
  }
  isEdited() {
    return !_e.isEqual(_e.pick(this.value, this.fields), _e.pick(this.initial, this.fields));
  }
  get url() {
    var n, r;
    const t = super.url || ((r = (n = this.repo.use) == null ? void 0 : n.meta) == null ? void 0 : r.url);
    if (!t)
      throw Error("No url specified as parameter or in Model.meta.");
    return t;
  }
  reset(t) {
    (!t || !Object.keys(t).length) && (t = this.empty);
    const n = this.fields.filter((r) => r in t);
    this.value = _e.cloneDeep(_e.pick(t, n)) || {}, this.state.none();
  }
  serialize(t) {
    const n = this.repo.use;
    return new n({ ...this.value }).$toJson(null, { relations: !1 });
  }
  send(t) {
    let [n, r] = ["post", this.url];
    return t.id && (r = `${r}${t.id}/`, n = "put"), this.repo.api()[n](r, t).then(
      (s) => Ne.ok(s.entities[0]),
      (s) => Ne.error(s.response.data)
    );
  }
}
class vo extends Eo {
  constructor(n) {
    var r;
    super(n);
    P(this, "showFilters", !1);
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
    var n;
    return super.icon || ((n = this.model.meta) == null ? void 0 : n.icon);
  }
  /** Return panel's title based on view and current item. */
  get title() {
    var a, i;
    const { props: n, list: r } = this, s = this.repo.use;
    if (s) {
      if ((a = this.view) != null && a.startsWith("list."))
        return pe(jn.model(s), 3);
      if ((i = this.view) != null && i.startsWith("detail.") && this.value) {
        if (this.value.$title)
          return this.value.$title;
        const c = pe(jn.model(s));
        return this.value.id ? pe("models._.title", { model: c, id: this.value.id }) : pe("models._.title.new", { model: c });
      }
    }
    return super.title;
  }
  getUrlParams() {
    const { value: n = null, ...r } = super.getUrlParams();
    return n != null && n.id && (r.id = n.id), r;
  }
  /**
   * Edit a new item.
   *
   * @param view - edit view.
   */
  create(n = "detail.edit") {
    this.show({ view: n, value: null });
  }
  /** Called when an item has been created. By default, show edit view. */
  created(n, r = "detail.edit") {
    this.show({ view: r, value: n });
  }
  show({ id: n = null, ...r }) {
    if (n)
      yo(this.repo).fetch({ id: n, relations: this.relations }).then((s) => (super.show({ ...r, value: s.entities[0] }), s));
    else
      return super.show(r);
  }
  onViewChange(n) {
    super.onViewChange(n), n.startsWith("list.") && this.list.load();
  }
  onValueChange(n) {
  }
}
function Yo(e) {
  const t = Ee(new bo(e));
  ce("panels", t), ne(() => t.current, (r) => {
    r && r.name == t.panel && r.show(t.params);
  }), ne(() => {
    var r;
    return (r = t.current) == null ? void 0 : r.getUrlParams();
  }, (r) => {
    if (!r)
      return;
    const s = new URLSearchParams(r).toString();
    s != t.paramsString && (history.pushState(r, "", `?${s}`), t.paramsString = s);
  }), window.addEventListener("popstate", (r) => {
    r.state && (t.panel = r.state.panel);
  });
  const n = document.title;
  return ne(() => {
    var r;
    return (r = t.current) == null ? void 0 : r.title;
  }, (r) => {
    r ? document.title = `${r} | ${n}` : document.title = n;
  }), t;
}
function Do(e, t) {
  const n = Ee(new t(e));
  return ce("panel", n), Jn(() => n.panels.register(n.name, n)), Zn(() => n.panels.unregister(n.name)), n.onViewChange && ne(() => n.view, (r) => n.onViewChange(r)), { panel: n };
}
function Ho({ query: e, repos: t, ...n }) {
  t ?? (t = ke("repos")), e ?? (e = No(n.props.repo, ke("repos"))), n.panels ?? (n.panels = ke("panels"));
  const { list: r, items: s } = ko({
    query: e,
    relations: n.props.relations,
    fetchRelations: n.props.fetchRelations
  }), { panel: a } = Do({ list: r, ...n }, vo), i = ee(() => {
    const u = r.getSiblingIndex(ye(a.value), 1);
    return s.value[u] ?? null;
  }), c = ee(() => {
    const u = r.getSiblingIndex(ye(a.value), -1);
    return s.value[u] ?? null;
  });
  return { panels: a.panels, panel: a, list: r, items: s, next: i, prev: c };
}
function ko(e, t = To) {
  const n = Ee(new t(e)), r = ee(
    () => n.save && n.relations && n.length ? n.queryset(n.ids).orderBy((s) => n.ids.indexOf(s)).get() : n.items
  );
  return ce("list", n), ce("items", r), { list: n, items: r };
}
function No(e, t = null) {
  const n = new We(e, t);
  return ce("query", n), n;
}
function So(e, t = Ar) {
  e.initial || ye;
  const n = Ee(new t(e));
  ce("editor", n);
  const r = ee(() => n.isEdited());
  ne(() => n.initial, (a) => n.reset(a || n.default));
  const s = ke("panel");
  return s && ne(() => n.edited, (a) => s.setEdition(n.name, a)), { editor: n, edited: r };
}
function jo(e, t = Io) {
  return So(e, t);
}
const Go = {
  /** Field is required */
  required(e) {
    return e ? !0 : pe("fields._.required");
  },
  /**
   * Validate field errors returned from the server.
   */
  errors(e) {
    return () => {
      e != null && e.length && e.join("<br>");
    };
  },
  /**
   * Return a rule whose validating value is optional.
   *
   * By default rules require value to be provided. This returns a new
   * rule whose value can either be empty or must match provided rule.
   */
  optional(e) {
    return (t) => !t || e(t);
  },
  /** Rule validating email */
  email(e) {
    return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(e) || pe("fields.email.rule");
  },
  /** Rule validating username */
  username(e) {
    return /^[A-Za-z0-9@.+\-_]+$/.test(e) || "Username must not be empty. It only can contain letters, numbers and @/+/./- special characters";
  }
};
function Ko(e, t) {
  return as(() => import(e).then((n) => t ? (console.log(n, n.components, Object.keys(n)), Object.values(n).filter((s) => s.__name == t)[0]) : n));
}
export {
  ks as AppContext,
  Ar as Editor,
  Lo as ModelController,
  Io as ModelEditor,
  To as ModelList,
  vo as ModelPanel,
  Eo as Panel,
  bo as Panels,
  We as Query,
  Ne as State,
  qo as States,
  Ze as assignNonEmpty,
  Zr as collectAttr,
  Wt as config,
  go as createApp,
  ho as createI18n,
  Vo as createPinia,
  po as createVuetify,
  Jo as csrfToken,
  Ko as defineAsyncComponent,
  Zo as excludeValues,
  Qo as filterSlots,
  zo as filterValues,
  el as getCookie,
  Br as getCookieList,
  tl as getCsrf,
  tt as i18n,
  $o as init,
  nl as injectOrProvide,
  Yn as loadedLocalePaths,
  rl as mapToObject,
  Mo as models,
  yo as query,
  Qr as reset,
  Go as rules,
  xo as setLocale,
  sl as shallowCopy,
  al as splitValues,
  pe as t,
  jn as tKeys,
  Wo as useAction,
  Uo as useAppContext,
  So as useEditor,
  _o as useI18n,
  jo as useModelEditor,
  ko as useModelList,
  Ho as useModelPanel,
  vs as useModels,
  Do as usePanel,
  Yo as usePanels,
  Ds as usePermissions,
  Fo as usePermissionsProps,
  No as useQuery
};
//# sourceMappingURL=ox.js.map
