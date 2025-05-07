var F0 = Object.defineProperty;
var k0 = (n, r, s) => r in n ? F0(n, r, { enumerable: !0, configurable: !0, writable: !0, value: s }) : n[r] = s;
var oe = (n, r, s) => k0(n, typeof r != "symbol" ? r + "" : r, s);
import { R as dc, H as W0, a as U0, b as $0, C as B0, G as H0, M as Y0, c as G0, P as V0, d as fa, U as Mi, e as K0, g as q0, u as gc, f as X0, h as pl, S as ir, i as Z0, j as Oa, k as J0, l as Q0, s as z0, m as _c, n as Bi, r as j0 } from "./auth-U2GUc62-.js";
import { t as eb, p as tb, x as nb, o as rb, q as ib, y as sb, v as ab, w as ub } from "./auth-U2GUc62-.js";
import { provide as $t, computed as Ct, unref as Fn, reactive as kn, ref as mc, watch as En, effectScope as ha, nextTick as ev, shallowRef as tv, isRef as nv, defineComponent as Ca, getCurrentInstance as Pr, h as pc, Fragment as vc, inject as xr, onMounted as yc, onUnmounted as Ec, createVNode as rv, Text as iv, createApp as sv, defineAsyncComponent as av } from "vue";
import uv from "axios";
import * as ov from "ox/vendor";
import { p as vl, c as lv, m as bc, a as cv, b as fv, d as hv, e as dv, f as gv, g as _v, h as mv, D as yl, i as El, T as bl, I as wl, L as Ll, G as pv, j as vv, k as yv } from "./theme-9SwWg6i2.js";
function wc(n, r) {
  var s;
  if (typeof r == "string") {
    const u = (s = n.use) == null ? void 0 : s.fields(), l = u && u[r] || null;
    r = l instanceof dc ? l : null;
  }
  return r;
}
function Lc(n) {
  return n instanceof W0 || n instanceof U0 || n instanceof $0 ? n.foreignKey : null;
}
const kE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentType: B0,
  Group: H0,
  Meta: Y0,
  Model: G0,
  Permission: V0,
  Permissions: fa,
  User: Mi,
  asRelation: wc,
  getSourceKey: Lc
}, Symbol.toStringTag, { value: "Module" }));
class Ev {
  /**
   * Create a new response instance.
   */
  constructor(r, s, u) {
    /**
     * The repository that called the request.
     */
    oe(this, "repository");
    /**
     * The request configuration.
     */
    oe(this, "config");
    /**
     * The axios response instance.
     */
    oe(this, "response");
    /**
     * Entities created by Pinia ORM.
     */
    oe(this, "entities", null);
    /**
     * Whether if response data is saved to the store or not.
     */
    oe(this, "isSaved", !1);
    this.repository = r, this.config = s, this.response = u;
  }
  /**
   * Save response data to the store.
   */
  async save() {
    const r = this.getDataFromResponse();
    if (!this.validateData(r)) {
      console.warn(
        "[Pinia ORM Axios] The response data could not be saved to the store because it is not an object or an array. You might want to use `dataTransformer` option to handle non-array/object response before saving it to the store."
      );
      return;
    }
    let s = this.config.persistBy || "save";
    this.validatePersistAction(s) || (console.warn(
      '[Pinia ORM Axios] The "persistBy" option configured is not a recognized value. Response data will be persisted by the default `save` method.'
    ), s = "save");
    const u = await this.repository[s](r);
    this.entities = Array.isArray(u) ? u : [u], this.isSaved = !0;
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
  validateData(r) {
    return r !== null && typeof r == "object";
  }
  /**
   * Validate the given string as to ensure it correlates with the available
   * Pinia ORM persist methods.
   */
  validatePersistAction(r) {
    return ["save", "insert"].includes(r);
  }
}
class bv {
  /**
   * Create a new api instance.
   */
  constructor(r) {
    /**
     * The repository class.
     */
    oe(this, "repository");
    /**
     * The default config.
     */
    oe(this, "config", {
      save: !0
    });
    this.repository = r, this.registerActions();
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
    var s, u, l;
    const r = { ...(s = this.repository.config.axiosApi) == null ? void 0 : s.actions, ...(l = (u = this.repository.getModel().$config()) == null ? void 0 : u.axiosApi) == null ? void 0 : l.actions };
    if (r)
      for (const f in r) {
        const d = r[f];
        typeof d == "function" ? this.registerFunctionAction(f, d) : this.registerObjectAction(f, d);
      }
  }
  /**
   * Register the given object action.
   */
  registerObjectAction(r, s) {
    this[r] = (u) => this.request({ ...s, ...u });
  }
  /**
   * Register the given function action.
   */
  registerFunctionAction(r, s) {
    this[r] = s.bind(this);
  }
  /**
   * Perform a get request.
   */
  get(r, s = {}) {
    return this.request({ method: "get", url: r, ...s });
  }
  /**
   * Perform a post request.
   */
  post(r, s = {}, u = {}) {
    return this.request({ method: "post", url: r, data: s, ...u });
  }
  /**
   * Perform a put request.
   */
  put(r, s = {}, u = {}) {
    return this.request({ method: "put", url: r, data: s, ...u });
  }
  /**
   * Perform a patch request.
   */
  patch(r, s = {}, u = {}) {
    return this.request({ method: "patch", url: r, data: s, ...u });
  }
  /**
   * Perform a delete request.
   */
  delete(r, s = {}) {
    return this.request({ method: "delete", url: r, ...s });
  }
  /**
   * Perform an api request.
   */
  async request(r) {
    const s = this.createConfig(r), u = await this.axios.request(s);
    return this.createResponse(u, s);
  }
  /**
   * Create a new config by merging the global config, the repository config,
   * and the given config.
   */
  createConfig(r) {
    return {
      ...this.config,
      ...this.repository.globalApiConfig,
      ...this.repository.apiConfig,
      ...r
    };
  }
  /**
   * Create a new response instance by applying a few initialization processes.
   * For example, it saves response data if `save` option id set to `true`.
   */
  async createResponse(r, s) {
    const u = new Ev(this.repository, s, r);
    return s.delete !== void 0 ? (await u.delete(), u) : (s.save && await u.save(), u);
  }
}
class Tl extends X0 {
  constructor(s, u) {
    var l, f, d;
    super(s, u);
    oe(this, "axios");
    oe(this, "globalApiConfig");
    oe(this, "apiConfig");
    this.axios = ((f = (l = pl) == null ? void 0 : l.axiosApi) == null ? void 0 : f.axios) || null, this.globalApiConfig = ((d = pl) == null ? void 0 : d.axiosApi) || {}, this.apiConfig = {};
  }
  api() {
    return wv(this);
  }
  setAxios(s) {
    return this.axios = s, this;
  }
}
function wv(n) {
  return new bv(n);
}
function Lv(n) {
  const r = q0();
  return Tl.useModel = n, gc(Tl, r);
}
function Tv(n) {
  return K0((r) => (r.config.axiosApi = n, r));
}
function Iv(n, r = !0) {
  const s = {};
  Array.isArray(n) || (n = Object.values(n)), r && !n.includes(Mi) && n.push(Mi);
  for (const u of n)
    if (u && u.entity) {
      if (u.entity in s)
        continue;
      gc(u), s[u.entity] = Lv(u);
    }
  return $t("models", n), $t("repos", s), { models: n, repos: s };
}
function WE() {
  return {
    permissions: [String, Function, Object, Array]
  };
}
function Av(n, r, s) {
  const u = r instanceof fa ? r : new fa(r), l = Ct(() => u.can(Fn(n), Fn(s)));
  return { permissions: u, allowed: l };
}
class Sv {
  static reactive(r) {
    const s = kn(new this(r));
    return s.user = Ct(() => {
      var u;
      return new Mi(((u = s.data) == null ? void 0 : u.user) || {});
    }), s;
  }
  constructor(r = {}) {
    Object.assign(this, r), this.state = ir.none(), this.showState = !1;
  }
  /**
   * Load data into AppData. If no `value` is provided, read it from
   * source element.
   */
  load(r = void 0) {
    this.dataEl !== void 0 && (r === void 0 && (r = this.readData(this.dataEl)), r.dataEl = this.dataEl, this.data = r), this.models !== void 0 && (this.repos = Iv(this.models).repos);
  }
  /**
   * Read data from the context of provided source element.
   * @param {String} el - id of the DOM element.
   * @return {Object} read data
   */
  readData(r) {
    const s = document.getElementById(r);
    if (!s)
      throw "Element {elementId} not found";
    return s.innerText ? JSON.parse(s.innerText) : {};
  }
}
function UE(n, r = !0) {
  const s = Sv.reactive(n);
  return r && s.dataEl && s.load(), $t("context", s), $t("user", s.user), s;
}
function $E({ props: n, user: r, emits: s = null }) {
  const u = mc(!1), { permissions: l, allowed: f } = Av(r, n.permissions, n.item);
  return { processing: u, permissions: l, allowed: f, run: async (...y) => {
    if (n.confirm && !confirm(n.confirm))
      return;
    if (!f.value)
      throw Error("You are not allowed to execute this action");
    u.value = !0;
    let E = n.run(r, n.item, ...y);
    return E instanceof Promise && (E = await E), u.value = !1, s && s("completed", n.item, ...y), E;
  } };
}
function $r(n) {
  const r = n.slice(-2).toUpperCase();
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
    VE VI WS YE ZA ZW`.includes(r):
      return {
        firstDay: 0,
        firstWeekSize: 1
      };
    case `AI AL AM AR AU AZ BA BM BN BY CL CM CN CR CY EC GE HR KG KZ LB LK LV
    MD ME MK MN MY NZ RO RS SI TJ TM TR UA UY UZ VN XK`.includes(r):
      return {
        firstDay: 1,
        firstWeekSize: 1
      };
    case `AD AN AT AX BE BG CH CZ DE DK EE ES FI FJ FO FR GB GF GP GR HU IE IS
    IT LI LT LU MC MQ NL NO PL RE RU SE SK SM VA`.includes(r):
      return {
        firstDay: 1,
        firstWeekSize: 4
      };
    case "AE AF BH DJ DZ EG IQ IR JO KW LY OM QA SD SY".includes(r):
      return {
        firstDay: 6,
        firstWeekSize: 1
      };
    case r === "MV":
      return {
        firstDay: 5,
        firstWeekSize: 1
      };
    case r === "PT":
      return {
        firstDay: 0,
        firstWeekSize: 4
      };
    default:
      return null;
  }
}
function Ov(n, r, s) {
  var W;
  const u = [];
  let l = [];
  const f = Tc(n), d = Ic(n), y = s ?? ((W = $r(r)) == null ? void 0 : W.firstDay) ?? 0, E = (f.getDay() - y + 7) % 7, A = (d.getDay() - y + 7) % 7;
  for (let x = 0; x < E; x++) {
    const R = new Date(f);
    R.setDate(R.getDate() - (E - x)), l.push(R);
  }
  for (let x = 1; x <= d.getDate(); x++) {
    const R = new Date(n.getFullYear(), n.getMonth(), x);
    l.push(R), l.length === 7 && (u.push(l), l = []);
  }
  for (let x = 1; x < 7 - A; x++) {
    const R = new Date(d);
    R.setDate(R.getDate() + x), l.push(R);
  }
  return l.length > 0 && u.push(l), u;
}
function da(n, r, s) {
  var f;
  const u = s ?? ((f = $r(r)) == null ? void 0 : f.firstDay) ?? 0, l = new Date(n);
  for (; l.getDay() !== u; )
    l.setDate(l.getDate() - 1);
  return l;
}
function Cv(n, r) {
  var l;
  const s = new Date(n), u = ((((l = $r(r)) == null ? void 0 : l.firstDay) ?? 0) + 6) % 7;
  for (; s.getDay() !== u; )
    s.setDate(s.getDate() + 1);
  return s;
}
function Tc(n) {
  return new Date(n.getFullYear(), n.getMonth(), 1);
}
function Ic(n) {
  return new Date(n.getFullYear(), n.getMonth() + 1, 0);
}
function Rv(n) {
  const r = n.split("-").map(Number);
  return new Date(r[0], r[1] - 1, r[2]);
}
const Dv = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
function Ac(n) {
  if (n == null) return /* @__PURE__ */ new Date();
  if (n instanceof Date) return n;
  if (typeof n == "string") {
    let r;
    if (Dv.test(n))
      return Rv(n);
    if (r = Date.parse(n), !isNaN(r)) return new Date(r);
  }
  return null;
}
const Il = new Date(2e3, 0, 2);
function Nv(n, r) {
  var u;
  const s = r ?? ((u = $r(n)) == null ? void 0 : u.firstDay) ?? 0;
  return lv(7).map((l) => {
    const f = new Date(Il);
    return f.setDate(Il.getDate() + s + l), new Intl.DateTimeFormat(n, {
      weekday: "narrow"
    }).format(f);
  });
}
function xv(n, r, s, u) {
  const l = Ac(n) ?? /* @__PURE__ */ new Date(), f = u == null ? void 0 : u[r];
  if (typeof f == "function")
    return f(l, r, s);
  let d = {};
  switch (r) {
    case "fullDate":
      d = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      break;
    case "fullDateWithWeekday":
      d = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      break;
    case "normalDate":
      const y = l.getDate(), E = new Intl.DateTimeFormat(s, {
        month: "long"
      }).format(l);
      return `${y} ${E}`;
    case "normalDateWithWeekday":
      d = {
        weekday: "short",
        day: "numeric",
        month: "short"
      };
      break;
    case "shortDate":
      d = {
        month: "short",
        day: "numeric"
      };
      break;
    case "year":
      d = {
        year: "numeric"
      };
      break;
    case "month":
      d = {
        month: "long"
      };
      break;
    case "monthShort":
      d = {
        month: "short"
      };
      break;
    case "monthAndYear":
      d = {
        month: "long",
        year: "numeric"
      };
      break;
    case "monthAndDate":
      d = {
        month: "long",
        day: "numeric"
      };
      break;
    case "weekday":
      d = {
        weekday: "long"
      };
      break;
    case "weekdayShort":
      d = {
        weekday: "short"
      };
      break;
    case "dayOfMonth":
      return new Intl.NumberFormat(s).format(l.getDate());
    case "hours12h":
      d = {
        hour: "numeric",
        hour12: !0
      };
      break;
    case "hours24h":
      d = {
        hour: "numeric",
        hour12: !1
      };
      break;
    case "minutes":
      d = {
        minute: "numeric"
      };
      break;
    case "seconds":
      d = {
        second: "numeric"
      };
      break;
    case "fullTime":
      d = {
        hour: "numeric",
        minute: "numeric"
      };
      break;
    case "fullTime12h":
      d = {
        hour: "numeric",
        minute: "numeric",
        hour12: !0
      };
      break;
    case "fullTime24h":
      d = {
        hour: "numeric",
        minute: "numeric",
        hour12: !1
      };
      break;
    case "fullDateTime":
      d = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
      };
      break;
    case "fullDateTime12h":
      d = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: !0
      };
      break;
    case "fullDateTime24h":
      d = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: !1
      };
      break;
    case "keyboardDate":
      d = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      };
      break;
    case "keyboardDateTime":
      return d = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric"
      }, new Intl.DateTimeFormat(s, d).format(l).replace(/, /g, " ");
    case "keyboardDateTime12h":
      return d = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: !0
      }, new Intl.DateTimeFormat(s, d).format(l).replace(/, /g, " ");
    case "keyboardDateTime24h":
      return d = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: !1
      }, new Intl.DateTimeFormat(s, d).format(l).replace(/, /g, " ");
    default:
      d = f ?? {
        timeZone: "UTC",
        timeZoneName: "short"
      };
  }
  return new Intl.DateTimeFormat(s, d).format(l);
}
function Pv(n, r) {
  const s = n.toJsDate(r), u = s.getFullYear(), l = vl(String(s.getMonth() + 1), 2, "0"), f = vl(String(s.getDate()), 2, "0");
  return `${u}-${l}-${f}`;
}
function Mv(n) {
  const [r, s, u] = n.split("-").map(Number);
  return new Date(r, s - 1, u);
}
function Fv(n, r) {
  const s = new Date(n);
  return s.setMinutes(s.getMinutes() + r), s;
}
function kv(n, r) {
  const s = new Date(n);
  return s.setHours(s.getHours() + r), s;
}
function xi(n, r) {
  const s = new Date(n);
  return s.setDate(s.getDate() + r), s;
}
function Wv(n, r) {
  const s = new Date(n);
  return s.setDate(s.getDate() + r * 7), s;
}
function Uv(n, r) {
  const s = new Date(n);
  return s.setDate(1), s.setMonth(s.getMonth() + r), s;
}
function ga(n) {
  return n.getFullYear();
}
function $v(n) {
  return n.getMonth();
}
function Bv(n, r, s, u) {
  const l = $r(r), f = s ?? (l == null ? void 0 : l.firstDay) ?? 0, d = u ?? (l == null ? void 0 : l.firstWeekSize) ?? 1;
  function y(Y) {
    const q = new Date(Y, 0, 1);
    return 7 - _a(q, da(q, r, f), "days");
  }
  let E = ga(n);
  const A = xi(da(n, r, f), 6);
  E < ga(A) && y(E + 1) >= d && E++;
  const W = new Date(E, 0, 1), x = y(E), R = x >= d ? xi(W, x - 7) : xi(W, x);
  return 1 + _a(n, R, "weeks");
}
function Hv(n) {
  return n.getDate();
}
function Yv(n) {
  return new Date(n.getFullYear(), n.getMonth() + 1, 1);
}
function Gv(n) {
  return new Date(n.getFullYear(), n.getMonth() - 1, 1);
}
function Vv(n) {
  return n.getHours();
}
function Kv(n) {
  return n.getMinutes();
}
function qv(n) {
  return new Date(n.getFullYear(), 0, 1);
}
function Xv(n) {
  return new Date(n.getFullYear(), 11, 31);
}
function Zv(n, r) {
  return Fi(n, r[0]) && zv(n, r[1]);
}
function Jv(n) {
  const r = new Date(n);
  return r instanceof Date && !isNaN(r.getTime());
}
function Fi(n, r) {
  return n.getTime() > r.getTime();
}
function Qv(n, r) {
  return Fi(ma(n), ma(r));
}
function zv(n, r) {
  return n.getTime() < r.getTime();
}
function Al(n, r) {
  return n.getTime() === r.getTime();
}
function jv(n, r) {
  return n.getDate() === r.getDate() && n.getMonth() === r.getMonth() && n.getFullYear() === r.getFullYear();
}
function e1(n, r) {
  return n.getMonth() === r.getMonth() && n.getFullYear() === r.getFullYear();
}
function t1(n, r) {
  return n.getFullYear() === r.getFullYear();
}
function _a(n, r, s) {
  const u = new Date(n), l = new Date(r);
  switch (s) {
    case "years":
      return u.getFullYear() - l.getFullYear();
    case "quarters":
      return Math.floor((u.getMonth() - l.getMonth() + (u.getFullYear() - l.getFullYear()) * 12) / 4);
    case "months":
      return u.getMonth() - l.getMonth() + (u.getFullYear() - l.getFullYear()) * 12;
    case "weeks":
      return Math.floor((u.getTime() - l.getTime()) / (1e3 * 60 * 60 * 24 * 7));
    case "days":
      return Math.floor((u.getTime() - l.getTime()) / (1e3 * 60 * 60 * 24));
    case "hours":
      return Math.floor((u.getTime() - l.getTime()) / (1e3 * 60 * 60));
    case "minutes":
      return Math.floor((u.getTime() - l.getTime()) / (1e3 * 60));
    case "seconds":
      return Math.floor((u.getTime() - l.getTime()) / 1e3);
    default:
      return u.getTime() - l.getTime();
  }
}
function n1(n, r) {
  const s = new Date(n);
  return s.setHours(r), s;
}
function r1(n, r) {
  const s = new Date(n);
  return s.setMinutes(r), s;
}
function i1(n, r) {
  const s = new Date(n);
  return s.setMonth(r), s;
}
function s1(n, r) {
  const s = new Date(n);
  return s.setDate(r), s;
}
function a1(n, r) {
  const s = new Date(n);
  return s.setFullYear(r), s;
}
function ma(n) {
  return new Date(n.getFullYear(), n.getMonth(), n.getDate(), 0, 0, 0, 0);
}
function u1(n) {
  return new Date(n.getFullYear(), n.getMonth(), n.getDate(), 23, 59, 59, 999);
}
class o1 {
  constructor(r) {
    this.locale = r.locale, this.formats = r.formats;
  }
  date(r) {
    return Ac(r);
  }
  toJsDate(r) {
    return r;
  }
  toISO(r) {
    return Pv(this, r);
  }
  parseISO(r) {
    return Mv(r);
  }
  addMinutes(r, s) {
    return Fv(r, s);
  }
  addHours(r, s) {
    return kv(r, s);
  }
  addDays(r, s) {
    return xi(r, s);
  }
  addWeeks(r, s) {
    return Wv(r, s);
  }
  addMonths(r, s) {
    return Uv(r, s);
  }
  getWeekArray(r, s) {
    const u = s !== void 0 ? Number(s) : void 0;
    return Ov(r, this.locale, u);
  }
  startOfWeek(r, s) {
    const u = s !== void 0 ? Number(s) : void 0;
    return da(r, this.locale, u);
  }
  endOfWeek(r) {
    return Cv(r, this.locale);
  }
  startOfMonth(r) {
    return Tc(r);
  }
  endOfMonth(r) {
    return Ic(r);
  }
  format(r, s) {
    return xv(r, s, this.locale, this.formats);
  }
  isEqual(r, s) {
    return Al(r, s);
  }
  isValid(r) {
    return Jv(r);
  }
  isWithinRange(r, s) {
    return Zv(r, s);
  }
  isAfter(r, s) {
    return Fi(r, s);
  }
  isAfterDay(r, s) {
    return Qv(r, s);
  }
  isBefore(r, s) {
    return !Fi(r, s) && !Al(r, s);
  }
  isSameDay(r, s) {
    return jv(r, s);
  }
  isSameMonth(r, s) {
    return e1(r, s);
  }
  isSameYear(r, s) {
    return t1(r, s);
  }
  setMinutes(r, s) {
    return r1(r, s);
  }
  setHours(r, s) {
    return n1(r, s);
  }
  setMonth(r, s) {
    return i1(r, s);
  }
  setDate(r, s) {
    return s1(r, s);
  }
  setYear(r, s) {
    return a1(r, s);
  }
  getDiff(r, s, u) {
    return _a(r, s, u);
  }
  getWeekdays(r) {
    const s = r !== void 0 ? Number(r) : void 0;
    return Nv(this.locale, s);
  }
  getYear(r) {
    return ga(r);
  }
  getMonth(r) {
    return $v(r);
  }
  getWeek(r, s, u) {
    const l = s !== void 0 ? Number(s) : void 0;
    return Bv(r, this.locale, l, u);
  }
  getDate(r) {
    return Hv(r);
  }
  getNextMonth(r) {
    return Yv(r);
  }
  getPreviousMonth(r) {
    return Gv(r);
  }
  getHours(r) {
    return Vv(r);
  }
  getMinutes(r) {
    return Kv(r);
  }
  startOfDay(r) {
    return ma(r);
  }
  endOfDay(r) {
    return u1(r);
  }
  startOfYear(r) {
    return qv(r);
  }
  endOfYear(r) {
    return Xv(r);
  }
}
const l1 = Symbol.for("vuetify:date-options"), Sl = Symbol.for("vuetify:date-adapter");
function c1(n, r) {
  const s = bc({
    adapter: o1,
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
    options: s,
    instance: f1(s, r)
  };
}
function f1(n, r) {
  const s = kn(typeof n.adapter == "function" ? new n.adapter({
    locale: n.locale[r.current.value] ?? r.current.value,
    formats: n.formats
  }) : n.adapter);
  return En(r.current, (u) => {
    s.locale = n.locale[u] ?? u ?? s.locale;
  }), s;
}
function Sc() {
  let n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    blueprint: r,
    ...s
  } = n, u = bc(r, s), {
    aliases: l = {},
    components: f = {},
    directives: d = {}
  } = u, y = ha();
  return y.run(() => {
    const E = cv(u.defaults), A = fv(u.display, u.ssr), W = hv(u.theme), x = dv(u.icons), R = gv(u.locale), Y = c1(u.date, R), q = _v(u.goTo, R);
    function G(w) {
      for (const M in d)
        w.directive(M, d[M]);
      for (const M in f)
        w.component(M, f[M]);
      for (const M in l)
        w.component(M, mv({
          ...l[M],
          name: M,
          aliasName: l[M].name
        }));
      const P = ha();
      if (P.run(() => {
        W.install(w);
      }), w.onUnmount(() => P.stop()), w.provide(yl, E), w.provide(El, A), w.provide(bl, W), w.provide(wl, x), w.provide(Ll, R), w.provide(l1, Y.options), w.provide(Sl, Y.instance), w.provide(pv, q), vv && u.ssr)
        if (w.$nuxt)
          w.$nuxt.hook("app:suspense:resolve", () => {
            A.update();
          });
        else {
          const {
            mount: M
          } = w;
          w.mount = function() {
            const S = M(...arguments);
            return ev(() => A.update()), w.mount = M, S;
          };
        }
      w.mixin({
        computed: {
          $vuetify() {
            return kn({
              defaults: jn.call(this, yl),
              display: jn.call(this, El),
              theme: jn.call(this, bl),
              icons: jn.call(this, wl),
              locale: jn.call(this, Ll),
              date: jn.call(this, Sl)
            });
          }
        }
      });
    }
    function B() {
      y.stop();
    }
    return {
      install: G,
      unmount: B,
      defaults: E,
      display: A,
      theme: W,
      icons: x,
      locale: R,
      date: Y,
      goTo: q
    };
  });
}
const h1 = "3.8.3";
Sc.version = h1;
function jn(n) {
  var u, l;
  const r = this.$, s = ((u = r.parent) == null ? void 0 : u.provides) ?? ((l = r.vnode.appContext) == null ? void 0 : l.provides);
  if (s && n in s)
    return s[n];
}
const d1 = {
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
      mdi: yv
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
}, g1 = {
  lighten4: "#c8e6c9",
  darken1: "#43a047"
}, Ol = {
  green: g1
};
/*!
  * shared v10.0.7
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const ki = typeof window < "u", bn = (n, r = !1) => r ? Symbol.for(n) : Symbol(n), sr = (n) => typeof n == "number" && isFinite(n), Wi = (n) => Oc(n) === "[object RegExp]", _1 = (n) => $e(n) && Object.keys(n).length === 0, Rt = Object.assign, m1 = Object.create, nt = (n = null) => m1(n);
let Cl;
const Nr = () => Cl || (Cl = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : nt()), p1 = Object.prototype.hasOwnProperty;
function Ui(n, r) {
  return p1.call(n, r);
}
const Lt = Array.isArray, nr = (n) => typeof n == "function", Ee = (n) => typeof n == "string", Pe = (n) => typeof n == "boolean", rt = (n) => n !== null && typeof n == "object", v1 = Object.prototype.toString, Oc = (n) => v1.call(n), $e = (n) => Oc(n) === "[object Object]", Ri = (n) => !rt(n) || Lt(n);
function Pi(n, r) {
  if (Ri(n) || Ri(r))
    throw new Error("Invalid value");
  const s = [{ src: n, des: r }];
  for (; s.length; ) {
    const { src: u, des: l } = s.pop();
    Object.keys(u).forEach((f) => {
      f !== "__proto__" && (rt(u[f]) && !rt(l[f]) && (l[f] = Array.isArray(u[f]) ? [] : nt()), Ri(l[f]) || Ri(u[f]) ? l[f] = u[f] : s.push({ src: u[f], des: l[f] }));
    });
  }
}
/*!
  * shared v10.0.7
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const y1 = (n, r, s) => E1({ l: n, k: r, s }), E1 = (n) => JSON.stringify(n).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), qe = (n) => typeof n == "number" && isFinite(n), b1 = (n) => Da(n) === "[object Date]", Rl = (n) => Da(n) === "[object RegExp]", Ra = (n) => Le(n) && Object.keys(n).length === 0, wn = Object.assign, w1 = Object.create, Xe = (n = null) => w1(n);
let Dl;
const Nl = () => Dl || (Dl = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : Xe());
function xl(n) {
  return n.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const L1 = Object.prototype.hasOwnProperty;
function Mn(n, r) {
  return L1.call(n, r);
}
const Wt = Array.isArray, De = (n) => typeof n == "function", j = (n) => typeof n == "string", tt = (n) => typeof n == "boolean", ke = (n) => n !== null && typeof n == "object", T1 = (n) => ke(n) && De(n.then) && De(n.catch), Cc = Object.prototype.toString, Da = (n) => Cc.call(n), Le = (n) => Da(n) === "[object Object]", I1 = (n) => n == null ? "" : Wt(n) || Le(n) && n.toString === Cc ? JSON.stringify(n, null, 2) : String(n);
function Na(n, r = "") {
  return n.reduce((s, u, l) => l === 0 ? s + u : s + r + u, "");
}
function A1(n, r) {
  typeof console < "u" && (console.warn("[intlify] " + n), r && console.warn(r.stack));
}
/*!
  * message-compiler v10.0.7
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function S1(n, r, s) {
  return { line: n, column: r, offset: s };
}
function pa(n, r, s) {
  return { start: n, end: r };
}
const ge = {
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
}, O1 = 17;
function Hi(n, r, s = {}) {
  const { domain: u, messages: l, args: f } = s, d = n, y = new SyntaxError(String(d));
  return y.code = n, r && (y.location = r), y.domain = u, y;
}
function C1(n) {
  throw n;
}
const jt = " ", R1 = "\r", Ke = `
`, D1 = "\u2028", N1 = "\u2029";
function x1(n) {
  const r = n;
  let s = 0, u = 1, l = 1, f = 0;
  const d = (F) => r[F] === R1 && r[F + 1] === Ke, y = (F) => r[F] === Ke, E = (F) => r[F] === N1, A = (F) => r[F] === D1, W = (F) => d(F) || y(F) || E(F) || A(F), x = () => s, R = () => u, Y = () => l, q = () => f, G = (F) => d(F) || E(F) || A(F) ? Ke : r[F], B = () => G(s), w = () => G(s + f);
  function P() {
    return f = 0, W(s) && (u++, l = 0), d(s) && s++, s++, l++, r[s];
  }
  function M() {
    return d(s + f) && f++, f++, r[s + f];
  }
  function S() {
    s = 0, u = 1, l = 1, f = 0;
  }
  function U(F = 0) {
    f = F;
  }
  function H() {
    const F = s + f;
    for (; F !== s; )
      P();
    f = 0;
  }
  return {
    index: x,
    line: R,
    column: Y,
    peekOffset: q,
    charAt: G,
    currentChar: B,
    currentPeek: w,
    next: P,
    peek: M,
    reset: S,
    resetPeek: U,
    skipToPeek: H
  };
}
const yn = void 0, P1 = ".", Pl = "'", M1 = "tokenizer";
function F1(n, r = {}) {
  const s = r.location !== !1, u = x1(n), l = () => u.index(), f = () => S1(u.line(), u.column(), u.index()), d = f(), y = l(), E = {
    currentType: 13,
    offset: y,
    startLoc: d,
    endLoc: d,
    lastType: 13,
    lastOffset: y,
    lastStartLoc: d,
    lastEndLoc: d,
    braceNest: 0,
    inLinked: !1,
    text: ""
  }, A = () => E, { onError: W } = r;
  function x(m, p, D, ...K) {
    const me = A();
    if (p.column += D, p.offset += D, W) {
      const ee = s ? pa(me.startLoc, p) : null, T = Hi(m, ee, {
        domain: M1,
        args: K
      });
      W(T);
    }
  }
  function R(m, p, D) {
    m.endLoc = f(), m.currentType = p;
    const K = { type: p };
    return s && (K.loc = pa(m.startLoc, m.endLoc)), D != null && (K.value = D), K;
  }
  const Y = (m) => R(
    m,
    13
    /* TokenTypes.EOF */
  );
  function q(m, p) {
    return m.currentChar() === p ? (m.next(), p) : (x(ge.EXPECTED_TOKEN, f(), 0, p), "");
  }
  function G(m) {
    let p = "";
    for (; m.currentPeek() === jt || m.currentPeek() === Ke; )
      p += m.currentPeek(), m.peek();
    return p;
  }
  function B(m) {
    const p = G(m);
    return m.skipToPeek(), p;
  }
  function w(m) {
    if (m === yn)
      return !1;
    const p = m.charCodeAt(0);
    return p >= 97 && p <= 122 || // a-z
    p >= 65 && p <= 90 || // A-Z
    p === 95;
  }
  function P(m) {
    if (m === yn)
      return !1;
    const p = m.charCodeAt(0);
    return p >= 48 && p <= 57;
  }
  function M(m, p) {
    const { currentType: D } = p;
    if (D !== 2)
      return !1;
    G(m);
    const K = w(m.currentPeek());
    return m.resetPeek(), K;
  }
  function S(m, p) {
    const { currentType: D } = p;
    if (D !== 2)
      return !1;
    G(m);
    const K = m.currentPeek() === "-" ? m.peek() : m.currentPeek(), me = P(K);
    return m.resetPeek(), me;
  }
  function U(m, p) {
    const { currentType: D } = p;
    if (D !== 2)
      return !1;
    G(m);
    const K = m.currentPeek() === Pl;
    return m.resetPeek(), K;
  }
  function H(m, p) {
    const { currentType: D } = p;
    if (D !== 7)
      return !1;
    G(m);
    const K = m.currentPeek() === ".";
    return m.resetPeek(), K;
  }
  function F(m, p) {
    const { currentType: D } = p;
    if (D !== 8)
      return !1;
    G(m);
    const K = w(m.currentPeek());
    return m.resetPeek(), K;
  }
  function le(m, p) {
    const { currentType: D } = p;
    if (!(D === 7 || D === 11))
      return !1;
    G(m);
    const K = m.currentPeek() === ":";
    return m.resetPeek(), K;
  }
  function _e(m, p) {
    const { currentType: D } = p;
    if (D !== 9)
      return !1;
    const K = () => {
      const ee = m.currentPeek();
      return ee === "{" ? w(m.peek()) : ee === "@" || ee === "|" || ee === ":" || ee === "." || ee === jt || !ee ? !1 : ee === Ke ? (m.peek(), K()) : st(m, !1);
    }, me = K();
    return m.resetPeek(), me;
  }
  function Be(m) {
    G(m);
    const p = m.currentPeek() === "|";
    return m.resetPeek(), p;
  }
  function st(m, p = !0) {
    const D = (me = !1, ee = "") => {
      const T = m.currentPeek();
      return T === "{" || T === "@" || !T ? me : T === "|" ? !(ee === jt || ee === Ke) : T === jt ? (m.peek(), D(!0, jt)) : T === Ke ? (m.peek(), D(!0, Ke)) : !0;
    }, K = D();
    return p && m.resetPeek(), K;
  }
  function Oe(m, p) {
    const D = m.currentChar();
    return D === yn ? yn : p(D) ? (m.next(), D) : null;
  }
  function nn(m) {
    const p = m.charCodeAt(0);
    return p >= 97 && p <= 122 || // a-z
    p >= 65 && p <= 90 || // A-Z
    p >= 48 && p <= 57 || // 0-9
    p === 95 || // _
    p === 36;
  }
  function Wn(m) {
    return Oe(m, nn);
  }
  function ur(m) {
    const p = m.charCodeAt(0);
    return p >= 97 && p <= 122 || // a-z
    p >= 65 && p <= 90 || // A-Z
    p >= 48 && p <= 57 || // 0-9
    p === 95 || // _
    p === 36 || // $
    p === 45;
  }
  function or(m) {
    return Oe(m, ur);
  }
  function rn(m) {
    const p = m.charCodeAt(0);
    return p >= 48 && p <= 57;
  }
  function Dt(m) {
    return Oe(m, rn);
  }
  function Tt(m) {
    const p = m.charCodeAt(0);
    return p >= 48 && p <= 57 || // 0-9
    p >= 65 && p <= 70 || // A-F
    p >= 97 && p <= 102;
  }
  function Bt(m) {
    return Oe(m, Tt);
  }
  function He(m) {
    let p = "", D = "";
    for (; p = Dt(m); )
      D += p;
    return D;
  }
  function lr(m) {
    let p = "";
    for (; ; ) {
      const D = m.currentChar();
      if (D === "{" || D === "}" || D === "@" || D === "|" || !D)
        break;
      if (D === jt || D === Ke)
        if (st(m))
          p += D, m.next();
        else {
          if (Be(m))
            break;
          p += D, m.next();
        }
      else
        p += D, m.next();
    }
    return p;
  }
  function cr(m) {
    B(m);
    let p = "", D = "";
    for (; p = or(m); )
      D += p;
    return m.currentChar() === yn && x(ge.UNTERMINATED_CLOSING_BRACE, f(), 0), D;
  }
  function fr(m) {
    B(m);
    let p = "";
    return m.currentChar() === "-" ? (m.next(), p += `-${He(m)}`) : p += He(m), m.currentChar() === yn && x(ge.UNTERMINATED_CLOSING_BRACE, f(), 0), p;
  }
  function Ht(m) {
    return m !== Pl && m !== Ke;
  }
  function sn(m) {
    B(m), q(m, "'");
    let p = "", D = "";
    for (; p = Oe(m, Ht); )
      p === "\\" ? D += hr(m) : D += p;
    const K = m.currentChar();
    return K === Ke || K === yn ? (x(ge.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, f(), 0), K === Ke && (m.next(), q(m, "'")), D) : (q(m, "'"), D);
  }
  function hr(m) {
    const p = m.currentChar();
    switch (p) {
      case "\\":
      case "'":
        return m.next(), `\\${p}`;
      case "u":
        return Nt(m, p, 4);
      case "U":
        return Nt(m, p, 6);
      default:
        return x(ge.UNKNOWN_ESCAPE_SEQUENCE, f(), 0, p), "";
    }
  }
  function Nt(m, p, D) {
    q(m, p);
    let K = "";
    for (let me = 0; me < D; me++) {
      const ee = Bt(m);
      if (!ee) {
        x(ge.INVALID_UNICODE_ESCAPE_SEQUENCE, f(), 0, `\\${p}${K}${m.currentChar()}`);
        break;
      }
      K += ee;
    }
    return `\\${p}${K}`;
  }
  function Yt(m) {
    return m !== "{" && m !== "}" && m !== jt && m !== Ke;
  }
  function dr(m) {
    B(m);
    let p = "", D = "";
    for (; p = Oe(m, Yt); )
      D += p;
    return D;
  }
  function an(m) {
    let p = "", D = "";
    for (; p = Wn(m); )
      D += p;
    return D;
  }
  function un(m) {
    const p = (D) => {
      const K = m.currentChar();
      return K === "{" || K === "@" || K === "|" || K === "(" || K === ")" || !K || K === jt ? D : (D += K, m.next(), p(D));
    };
    return p("");
  }
  function on(m) {
    B(m);
    const p = q(
      m,
      "|"
      /* TokenChars.Pipe */
    );
    return B(m), p;
  }
  function Ne(m, p) {
    let D = null;
    switch (m.currentChar()) {
      case "{":
        return p.braceNest >= 1 && x(ge.NOT_ALLOW_NEST_PLACEHOLDER, f(), 0), m.next(), D = R(
          p,
          2,
          "{"
          /* TokenChars.BraceLeft */
        ), B(m), p.braceNest++, D;
      case "}":
        return p.braceNest > 0 && p.currentType === 2 && x(ge.EMPTY_PLACEHOLDER, f(), 0), m.next(), D = R(
          p,
          3,
          "}"
          /* TokenChars.BraceRight */
        ), p.braceNest--, p.braceNest > 0 && B(m), p.inLinked && p.braceNest === 0 && (p.inLinked = !1), D;
      case "@":
        return p.braceNest > 0 && x(ge.UNTERMINATED_CLOSING_BRACE, f(), 0), D = dt(m, p) || Y(p), p.braceNest = 0, D;
      default: {
        let me = !0, ee = !0, T = !0;
        if (Be(m))
          return p.braceNest > 0 && x(ge.UNTERMINATED_CLOSING_BRACE, f(), 0), D = R(p, 1, on(m)), p.braceNest = 0, p.inLinked = !1, D;
        if (p.braceNest > 0 && (p.currentType === 4 || p.currentType === 5 || p.currentType === 6))
          return x(ge.UNTERMINATED_CLOSING_BRACE, f(), 0), p.braceNest = 0, In(m, p);
        if (me = M(m, p))
          return D = R(p, 4, cr(m)), B(m), D;
        if (ee = S(m, p))
          return D = R(p, 5, fr(m)), B(m), D;
        if (T = U(m, p))
          return D = R(p, 6, sn(m)), B(m), D;
        if (!me && !ee && !T)
          return D = R(p, 12, dr(m)), x(ge.INVALID_TOKEN_IN_PLACEHOLDER, f(), 0, D.value), B(m), D;
        break;
      }
    }
    return D;
  }
  function dt(m, p) {
    const { currentType: D } = p;
    let K = null;
    const me = m.currentChar();
    switch ((D === 7 || D === 8 || D === 11 || D === 9) && (me === Ke || me === jt) && x(ge.INVALID_LINKED_FORMAT, f(), 0), me) {
      case "@":
        return m.next(), K = R(
          p,
          7,
          "@"
          /* TokenChars.LinkedAlias */
        ), p.inLinked = !0, K;
      case ".":
        return B(m), m.next(), R(
          p,
          8,
          "."
          /* TokenChars.LinkedDot */
        );
      case ":":
        return B(m), m.next(), R(
          p,
          9,
          ":"
          /* TokenChars.LinkedDelimiter */
        );
      default:
        return Be(m) ? (K = R(p, 1, on(m)), p.braceNest = 0, p.inLinked = !1, K) : H(m, p) || le(m, p) ? (B(m), dt(m, p)) : F(m, p) ? (B(m), R(p, 11, an(m))) : _e(m, p) ? (B(m), me === "{" ? Ne(m, p) || K : R(p, 10, un(m))) : (D === 7 && x(ge.INVALID_LINKED_FORMAT, f(), 0), p.braceNest = 0, p.inLinked = !1, In(m, p));
    }
  }
  function In(m, p) {
    let D = {
      type: 13
      /* TokenTypes.EOF */
    };
    if (p.braceNest > 0)
      return Ne(m, p) || Y(p);
    if (p.inLinked)
      return dt(m, p) || Y(p);
    switch (m.currentChar()) {
      case "{":
        return Ne(m, p) || Y(p);
      case "}":
        return x(ge.UNBALANCED_CLOSING_BRACE, f(), 0), m.next(), R(
          p,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
      case "@":
        return dt(m, p) || Y(p);
      default: {
        if (Be(m))
          return D = R(p, 1, on(m)), p.braceNest = 0, p.inLinked = !1, D;
        if (st(m))
          return R(p, 0, lr(m));
        break;
      }
    }
    return D;
  }
  function at() {
    const { currentType: m, offset: p, startLoc: D, endLoc: K } = E;
    return E.lastType = m, E.lastOffset = p, E.lastStartLoc = D, E.lastEndLoc = K, E.offset = l(), E.startLoc = f(), u.currentChar() === yn ? R(
      E,
      13
      /* TokenTypes.EOF */
    ) : In(u, E);
  }
  return {
    nextToken: at,
    currentOffset: l,
    currentPosition: f,
    context: A
  };
}
const k1 = "parser", W1 = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function U1(n, r, s) {
  switch (n) {
    case "\\\\":
      return "\\";
    case "\\'":
      return "'";
    default: {
      const u = parseInt(r || s, 16);
      return u <= 55295 || u >= 57344 ? String.fromCodePoint(u) : "�";
    }
  }
}
function $1(n = {}) {
  const r = n.location !== !1, { onError: s } = n;
  function u(w, P, M, S, ...U) {
    const H = w.currentPosition();
    if (H.offset += S, H.column += S, s) {
      const F = r ? pa(M, H) : null, le = Hi(P, F, {
        domain: k1,
        args: U
      });
      s(le);
    }
  }
  function l(w, P, M) {
    const S = { type: w };
    return r && (S.start = P, S.end = P, S.loc = { start: M, end: M }), S;
  }
  function f(w, P, M, S) {
    r && (w.end = P, w.loc && (w.loc.end = M));
  }
  function d(w, P) {
    const M = w.context(), S = l(3, M.offset, M.startLoc);
    return S.value = P, f(S, w.currentOffset(), w.currentPosition()), S;
  }
  function y(w, P) {
    const M = w.context(), { lastOffset: S, lastStartLoc: U } = M, H = l(5, S, U);
    return H.index = parseInt(P, 10), w.nextToken(), f(H, w.currentOffset(), w.currentPosition()), H;
  }
  function E(w, P) {
    const M = w.context(), { lastOffset: S, lastStartLoc: U } = M, H = l(4, S, U);
    return H.key = P, w.nextToken(), f(H, w.currentOffset(), w.currentPosition()), H;
  }
  function A(w, P) {
    const M = w.context(), { lastOffset: S, lastStartLoc: U } = M, H = l(9, S, U);
    return H.value = P.replace(W1, U1), w.nextToken(), f(H, w.currentOffset(), w.currentPosition()), H;
  }
  function W(w) {
    const P = w.nextToken(), M = w.context(), { lastOffset: S, lastStartLoc: U } = M, H = l(8, S, U);
    return P.type !== 11 ? (u(w, ge.UNEXPECTED_EMPTY_LINKED_MODIFIER, M.lastStartLoc, 0), H.value = "", f(H, S, U), {
      nextConsumeToken: P,
      node: H
    }) : (P.value == null && u(w, ge.UNEXPECTED_LEXICAL_ANALYSIS, M.lastStartLoc, 0, kt(P)), H.value = P.value || "", f(H, w.currentOffset(), w.currentPosition()), {
      node: H
    });
  }
  function x(w, P) {
    const M = w.context(), S = l(7, M.offset, M.startLoc);
    return S.value = P, f(S, w.currentOffset(), w.currentPosition()), S;
  }
  function R(w) {
    const P = w.context(), M = l(6, P.offset, P.startLoc);
    let S = w.nextToken();
    if (S.type === 8) {
      const U = W(w);
      M.modifier = U.node, S = U.nextConsumeToken || w.nextToken();
    }
    switch (S.type !== 9 && u(w, ge.UNEXPECTED_LEXICAL_ANALYSIS, P.lastStartLoc, 0, kt(S)), S = w.nextToken(), S.type === 2 && (S = w.nextToken()), S.type) {
      case 10:
        S.value == null && u(w, ge.UNEXPECTED_LEXICAL_ANALYSIS, P.lastStartLoc, 0, kt(S)), M.key = x(w, S.value || "");
        break;
      case 4:
        S.value == null && u(w, ge.UNEXPECTED_LEXICAL_ANALYSIS, P.lastStartLoc, 0, kt(S)), M.key = E(w, S.value || "");
        break;
      case 5:
        S.value == null && u(w, ge.UNEXPECTED_LEXICAL_ANALYSIS, P.lastStartLoc, 0, kt(S)), M.key = y(w, S.value || "");
        break;
      case 6:
        S.value == null && u(w, ge.UNEXPECTED_LEXICAL_ANALYSIS, P.lastStartLoc, 0, kt(S)), M.key = A(w, S.value || "");
        break;
      default: {
        u(w, ge.UNEXPECTED_EMPTY_LINKED_KEY, P.lastStartLoc, 0);
        const U = w.context(), H = l(7, U.offset, U.startLoc);
        return H.value = "", f(H, U.offset, U.startLoc), M.key = H, f(M, U.offset, U.startLoc), {
          nextConsumeToken: S,
          node: M
        };
      }
    }
    return f(M, w.currentOffset(), w.currentPosition()), {
      node: M
    };
  }
  function Y(w) {
    const P = w.context(), M = P.currentType === 1 ? w.currentOffset() : P.offset, S = P.currentType === 1 ? P.endLoc : P.startLoc, U = l(2, M, S);
    U.items = [];
    let H = null;
    do {
      const _e = H || w.nextToken();
      switch (H = null, _e.type) {
        case 0:
          _e.value == null && u(w, ge.UNEXPECTED_LEXICAL_ANALYSIS, P.lastStartLoc, 0, kt(_e)), U.items.push(d(w, _e.value || ""));
          break;
        case 5:
          _e.value == null && u(w, ge.UNEXPECTED_LEXICAL_ANALYSIS, P.lastStartLoc, 0, kt(_e)), U.items.push(y(w, _e.value || ""));
          break;
        case 4:
          _e.value == null && u(w, ge.UNEXPECTED_LEXICAL_ANALYSIS, P.lastStartLoc, 0, kt(_e)), U.items.push(E(w, _e.value || ""));
          break;
        case 6:
          _e.value == null && u(w, ge.UNEXPECTED_LEXICAL_ANALYSIS, P.lastStartLoc, 0, kt(_e)), U.items.push(A(w, _e.value || ""));
          break;
        case 7: {
          const Be = R(w);
          U.items.push(Be.node), H = Be.nextConsumeToken || null;
          break;
        }
      }
    } while (P.currentType !== 13 && P.currentType !== 1);
    const F = P.currentType === 1 ? P.lastOffset : w.currentOffset(), le = P.currentType === 1 ? P.lastEndLoc : w.currentPosition();
    return f(U, F, le), U;
  }
  function q(w, P, M, S) {
    const U = w.context();
    let H = S.items.length === 0;
    const F = l(1, P, M);
    F.cases = [], F.cases.push(S);
    do {
      const le = Y(w);
      H || (H = le.items.length === 0), F.cases.push(le);
    } while (U.currentType !== 13);
    return H && u(w, ge.MUST_HAVE_MESSAGES_IN_PLURAL, M, 0), f(F, w.currentOffset(), w.currentPosition()), F;
  }
  function G(w) {
    const P = w.context(), { offset: M, startLoc: S } = P, U = Y(w);
    return P.currentType === 13 ? U : q(w, M, S, U);
  }
  function B(w) {
    const P = F1(w, wn({}, n)), M = P.context(), S = l(0, M.offset, M.startLoc);
    return r && S.loc && (S.loc.source = w), S.body = G(P), n.onCacheKey && (S.cacheKey = n.onCacheKey(w)), M.currentType !== 13 && u(P, ge.UNEXPECTED_LEXICAL_ANALYSIS, M.lastStartLoc, 0, w[M.offset] || ""), f(S, P.currentOffset(), P.currentPosition()), S;
  }
  return { parse: B };
}
function kt(n) {
  if (n.type === 13)
    return "EOF";
  const r = (n.value || "").replace(/\r?\n/gu, "\\n");
  return r.length > 10 ? r.slice(0, 9) + "…" : r;
}
function B1(n, r = {}) {
  const s = {
    ast: n,
    helpers: /* @__PURE__ */ new Set()
  };
  return { context: () => s, helper: (f) => (s.helpers.add(f), f) };
}
function Ml(n, r) {
  for (let s = 0; s < n.length; s++)
    xa(n[s], r);
}
function xa(n, r) {
  switch (n.type) {
    case 1:
      Ml(n.cases, r), r.helper(
        "plural"
        /* HelperNameMap.PLURAL */
      );
      break;
    case 2:
      Ml(n.items, r);
      break;
    case 6: {
      xa(n.key, r), r.helper(
        "linked"
        /* HelperNameMap.LINKED */
      ), r.helper(
        "type"
        /* HelperNameMap.TYPE */
      );
      break;
    }
    case 5:
      r.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      ), r.helper(
        "list"
        /* HelperNameMap.LIST */
      );
      break;
    case 4:
      r.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      ), r.helper(
        "named"
        /* HelperNameMap.NAMED */
      );
      break;
  }
}
function H1(n, r = {}) {
  const s = B1(n);
  s.helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  ), n.body && xa(n.body, s);
  const u = s.context();
  n.helpers = Array.from(u.helpers);
}
function Y1(n) {
  const r = n.body;
  return r.type === 2 ? Fl(r) : r.cases.forEach((s) => Fl(s)), n;
}
function Fl(n) {
  if (n.items.length === 1) {
    const r = n.items[0];
    (r.type === 3 || r.type === 9) && (n.static = r.value, delete r.value);
  } else {
    const r = [];
    for (let s = 0; s < n.items.length; s++) {
      const u = n.items[s];
      if (!(u.type === 3 || u.type === 9) || u.value == null)
        break;
      r.push(u.value);
    }
    if (r.length === n.items.length) {
      n.static = Na(r);
      for (let s = 0; s < n.items.length; s++) {
        const u = n.items[s];
        (u.type === 3 || u.type === 9) && delete u.value;
      }
    }
  }
}
function er(n) {
  switch (n.t = n.type, n.type) {
    case 0: {
      const r = n;
      er(r.body), r.b = r.body, delete r.body;
      break;
    }
    case 1: {
      const r = n, s = r.cases;
      for (let u = 0; u < s.length; u++)
        er(s[u]);
      r.c = s, delete r.cases;
      break;
    }
    case 2: {
      const r = n, s = r.items;
      for (let u = 0; u < s.length; u++)
        er(s[u]);
      r.i = s, delete r.items, r.static && (r.s = r.static, delete r.static);
      break;
    }
    case 3:
    case 9:
    case 8:
    case 7: {
      const r = n;
      r.value && (r.v = r.value, delete r.value);
      break;
    }
    case 6: {
      const r = n;
      er(r.key), r.k = r.key, delete r.key, r.modifier && (er(r.modifier), r.m = r.modifier, delete r.modifier);
      break;
    }
    case 5: {
      const r = n;
      r.i = r.index, delete r.index;
      break;
    }
    case 4: {
      const r = n;
      r.k = r.key, delete r.key;
      break;
    }
  }
  delete n.type;
}
function G1(n, r) {
  const { filename: s, breakLineCode: u, needIndent: l } = r, f = r.location !== !1, d = {
    filename: s,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    map: void 0,
    breakLineCode: u,
    needIndent: l,
    indentLevel: 0
  };
  f && n.loc && (d.source = n.loc.source);
  const y = () => d;
  function E(G, B) {
    d.code += G;
  }
  function A(G, B = !0) {
    const w = B ? u : "";
    E(l ? w + "  ".repeat(G) : w);
  }
  function W(G = !0) {
    const B = ++d.indentLevel;
    G && A(B);
  }
  function x(G = !0) {
    const B = --d.indentLevel;
    G && A(B);
  }
  function R() {
    A(d.indentLevel);
  }
  return {
    context: y,
    push: E,
    indent: W,
    deindent: x,
    newline: R,
    helper: (G) => `_${G}`,
    needIndent: () => d.needIndent
  };
}
function V1(n, r) {
  const { helper: s } = n;
  n.push(`${s(
    "linked"
    /* HelperNameMap.LINKED */
  )}(`), ar(n, r.key), r.modifier ? (n.push(", "), ar(n, r.modifier), n.push(", _type")) : n.push(", undefined, _type"), n.push(")");
}
function K1(n, r) {
  const { helper: s, needIndent: u } = n;
  n.push(`${s(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`), n.indent(u());
  const l = r.items.length;
  for (let f = 0; f < l && (ar(n, r.items[f]), f !== l - 1); f++)
    n.push(", ");
  n.deindent(u()), n.push("])");
}
function q1(n, r) {
  const { helper: s, needIndent: u } = n;
  if (r.cases.length > 1) {
    n.push(`${s(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`), n.indent(u());
    const l = r.cases.length;
    for (let f = 0; f < l && (ar(n, r.cases[f]), f !== l - 1); f++)
      n.push(", ");
    n.deindent(u()), n.push("])");
  }
}
function X1(n, r) {
  r.body ? ar(n, r.body) : n.push("null");
}
function ar(n, r) {
  const { helper: s } = n;
  switch (r.type) {
    case 0:
      X1(n, r);
      break;
    case 1:
      q1(n, r);
      break;
    case 2:
      K1(n, r);
      break;
    case 6:
      V1(n, r);
      break;
    case 8:
      n.push(JSON.stringify(r.value), r);
      break;
    case 7:
      n.push(JSON.stringify(r.value), r);
      break;
    case 5:
      n.push(`${s(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${s(
        "list"
        /* HelperNameMap.LIST */
      )}(${r.index}))`, r);
      break;
    case 4:
      n.push(`${s(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${s(
        "named"
        /* HelperNameMap.NAMED */
      )}(${JSON.stringify(r.key)}))`, r);
      break;
    case 9:
      n.push(JSON.stringify(r.value), r);
      break;
    case 3:
      n.push(JSON.stringify(r.value), r);
      break;
  }
}
const Z1 = (n, r = {}) => {
  const s = j(r.mode) ? r.mode : "normal", u = j(r.filename) ? r.filename : "message.intl";
  r.sourceMap;
  const l = r.breakLineCode != null ? r.breakLineCode : s === "arrow" ? ";" : `
`, f = r.needIndent ? r.needIndent : s !== "arrow", d = n.helpers || [], y = G1(n, {
    filename: u,
    breakLineCode: l,
    needIndent: f
  });
  y.push(s === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), y.indent(f), d.length > 0 && (y.push(`const { ${Na(d.map((W) => `${W}: _${W}`), ", ")} } = ctx`), y.newline()), y.push("return "), ar(y, n), y.deindent(f), y.push("}"), delete n.helpers;
  const { code: E, map: A } = y.context();
  return {
    ast: n,
    code: E,
    map: A ? A.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function J1(n, r = {}) {
  const s = wn({}, r), u = !!s.jit, l = !!s.minify, f = s.optimize == null ? !0 : s.optimize, y = $1(s).parse(n);
  return u ? (f && Y1(y), l && er(y), { ast: y, code: "" }) : (H1(y, s), Z1(y, s));
}
/*!
  * core-base v10.0.7
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function Q1() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (Nl().__INTLIFY_PROD_DEVTOOLS__ = !1), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (Nl().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1);
}
function Ut(n) {
  return ke(n) && Pa(n) === 0 && (Mn(n, "b") || Mn(n, "body"));
}
const Rc = ["b", "body"];
function z1(n) {
  return Ln(n, Rc);
}
const Dc = ["c", "cases"];
function j1(n) {
  return Ln(n, Dc, []);
}
const Nc = ["s", "static"];
function ey(n) {
  return Ln(n, Nc);
}
const xc = ["i", "items"];
function ty(n) {
  return Ln(n, xc, []);
}
const Pc = ["t", "type"];
function Pa(n) {
  return Ln(n, Pc);
}
const Mc = ["v", "value"];
function Di(n, r) {
  const s = Ln(n, Mc);
  if (s != null)
    return s;
  throw Mr(r);
}
const Fc = ["m", "modifier"];
function ny(n) {
  return Ln(n, Fc);
}
const kc = ["k", "key"];
function ry(n) {
  const r = Ln(n, kc);
  if (r)
    return r;
  throw Mr(
    6
    /* NodeTypes.Linked */
  );
}
function Ln(n, r, s) {
  for (let u = 0; u < r.length; u++) {
    const l = r[u];
    if (Mn(n, l) && n[l] != null)
      return n[l];
  }
  return s;
}
const Wc = [
  ...Rc,
  ...Dc,
  ...Nc,
  ...xc,
  ...kc,
  ...Fc,
  ...Mc,
  ...Pc
];
function Mr(n) {
  return new Error(`unhandled node type: ${n}`);
}
function oa(n) {
  return (s) => iy(s, n);
}
function iy(n, r) {
  const s = z1(r);
  if (s == null)
    throw Mr(
      0
      /* NodeTypes.Resource */
    );
  if (Pa(s) === 1) {
    const f = j1(s);
    return n.plural(f.reduce((d, y) => [
      ...d,
      kl(n, y)
    ], []));
  } else
    return kl(n, s);
}
function kl(n, r) {
  const s = ey(r);
  if (s != null)
    return n.type === "text" ? s : n.normalize([s]);
  {
    const u = ty(r).reduce((l, f) => [...l, va(n, f)], []);
    return n.normalize(u);
  }
}
function va(n, r) {
  const s = Pa(r);
  switch (s) {
    case 3:
      return Di(r, s);
    case 9:
      return Di(r, s);
    case 4: {
      const u = r;
      if (Mn(u, "k") && u.k)
        return n.interpolate(n.named(u.k));
      if (Mn(u, "key") && u.key)
        return n.interpolate(n.named(u.key));
      throw Mr(s);
    }
    case 5: {
      const u = r;
      if (Mn(u, "i") && qe(u.i))
        return n.interpolate(n.list(u.i));
      if (Mn(u, "index") && qe(u.index))
        return n.interpolate(n.list(u.index));
      throw Mr(s);
    }
    case 6: {
      const u = r, l = ny(u), f = ry(u);
      return n.linked(va(n, f), l ? va(n, l) : void 0, n.type);
    }
    case 7:
      return Di(r, s);
    case 8:
      return Di(r, s);
    default:
      throw new Error(`unhandled node on format message part: ${s}`);
  }
}
const sy = (n) => n;
let Ni = Xe();
function ay(n, r = {}) {
  let s = !1;
  const u = r.onError || C1;
  return r.onError = (l) => {
    s = !0, u(l);
  }, { ...J1(n, r), detectError: s };
}
// @__NO_SIDE_EFFECTS__
function uy(n, r) {
  if (!__INTLIFY_DROP_MESSAGE_COMPILER__ && j(n)) {
    tt(r.warnHtmlMessage) && r.warnHtmlMessage;
    const u = (r.onCacheKey || sy)(n), l = Ni[u];
    if (l)
      return l;
    const { ast: f, detectError: d } = ay(n, {
      ...r,
      location: !1,
      jit: !0
    }), y = oa(f);
    return d ? y : Ni[u] = y;
  } else {
    const s = n.cacheKey;
    if (s) {
      const u = Ni[s];
      return u || (Ni[s] = oa(n));
    } else
      return oa(n);
  }
}
let Fr = null;
function oy(n) {
  Fr = n;
}
function ly(n, r, s) {
  Fr && Fr.emit("i18n:init", {
    timestamp: Date.now(),
    i18n: n,
    version: r,
    meta: s
  });
}
const cy = /* @__PURE__ */ fy("function:translate");
function fy(n) {
  return (r) => Fr && Fr.emit(n, r);
}
const en = {
  INVALID_ARGUMENT: O1,
  // 17
  INVALID_DATE_ARGUMENT: 18,
  INVALID_ISO_DATE_ARGUMENT: 19,
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
  NOT_SUPPORT_LOCALE_TYPE: 23
}, hy = 24;
function tn(n) {
  return Hi(n, null, void 0);
}
function Ma(n, r) {
  return r.locale != null ? Wl(r.locale) : Wl(n.locale);
}
let la;
function Wl(n) {
  if (j(n))
    return n;
  if (De(n)) {
    if (n.resolvedOnce && la != null)
      return la;
    if (n.constructor.name === "Function") {
      const r = n();
      if (T1(r))
        throw tn(en.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
      return la = r;
    } else
      throw tn(en.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
  } else
    throw tn(en.NOT_SUPPORT_LOCALE_TYPE);
}
function dy(n, r, s) {
  return [.../* @__PURE__ */ new Set([
    s,
    ...Wt(r) ? r : ke(r) ? Object.keys(r) : j(r) ? [r] : [s]
  ])];
}
function Uc(n, r, s) {
  const u = j(s) ? s : kr, l = n;
  l.__localeChainCache || (l.__localeChainCache = /* @__PURE__ */ new Map());
  let f = l.__localeChainCache.get(u);
  if (!f) {
    f = [];
    let d = [s];
    for (; Wt(d); )
      d = Ul(f, d, r);
    const y = Wt(r) || !Le(r) ? r : r.default ? r.default : null;
    d = j(y) ? [y] : y, Wt(d) && Ul(f, d, !1), l.__localeChainCache.set(u, f);
  }
  return f;
}
function Ul(n, r, s) {
  let u = !0;
  for (let l = 0; l < r.length && tt(u); l++) {
    const f = r[l];
    j(f) && (u = gy(n, r[l], s));
  }
  return u;
}
function gy(n, r, s) {
  let u;
  const l = r.split("-");
  do {
    const f = l.join("-");
    u = _y(n, f, s), l.splice(-1, 1);
  } while (l.length && u === !0);
  return u;
}
function _y(n, r, s) {
  let u = !1;
  if (!n.includes(r) && (u = !0, r)) {
    u = r[r.length - 1] !== "!";
    const l = r.replace(/!/g, "");
    n.push(l), (Wt(s) || Le(s)) && s[l] && (u = s[l]);
  }
  return u;
}
const Tn = [];
Tn[
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
Tn[
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
Tn[
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
Tn[
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
Tn[
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
Tn[
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
Tn[
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
const my = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function py(n) {
  return my.test(n);
}
function vy(n) {
  const r = n.charCodeAt(0), s = n.charCodeAt(n.length - 1);
  return r === s && (r === 34 || r === 39) ? n.slice(1, -1) : n;
}
function yy(n) {
  if (n == null)
    return "o";
  switch (n.charCodeAt(0)) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return n;
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
function Ey(n) {
  const r = n.trim();
  return n.charAt(0) === "0" && isNaN(parseInt(n)) ? !1 : py(r) ? vy(r) : "*" + r;
}
function by(n) {
  const r = [];
  let s = -1, u = 0, l = 0, f, d, y, E, A, W, x;
  const R = [];
  R[
    0
    /* Actions.APPEND */
  ] = () => {
    d === void 0 ? d = y : d += y;
  }, R[
    1
    /* Actions.PUSH */
  ] = () => {
    d !== void 0 && (r.push(d), d = void 0);
  }, R[
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ] = () => {
    R[
      0
      /* Actions.APPEND */
    ](), l++;
  }, R[
    3
    /* Actions.PUSH_SUB_PATH */
  ] = () => {
    if (l > 0)
      l--, u = 4, R[
        0
        /* Actions.APPEND */
      ]();
    else {
      if (l = 0, d === void 0 || (d = Ey(d), d === !1))
        return !1;
      R[
        1
        /* Actions.PUSH */
      ]();
    }
  };
  function Y() {
    const q = n[s + 1];
    if (u === 5 && q === "'" || u === 6 && q === '"')
      return s++, y = "\\" + q, R[
        0
        /* Actions.APPEND */
      ](), !0;
  }
  for (; u !== null; )
    if (s++, f = n[s], !(f === "\\" && Y())) {
      if (E = yy(f), x = Tn[u], A = x[E] || x.l || 8, A === 8 || (u = A[0], A[1] !== void 0 && (W = R[A[1]], W && (y = f, W() === !1))))
        return;
      if (u === 7)
        return r;
    }
}
const $l = /* @__PURE__ */ new Map();
function wy(n, r) {
  return ke(n) ? n[r] : null;
}
function Ly(n, r) {
  if (!ke(n))
    return null;
  let s = $l.get(r);
  if (s || (s = by(r), s && $l.set(r, s)), !s)
    return null;
  const u = s.length;
  let l = n, f = 0;
  for (; f < u; ) {
    const d = s[f];
    if (Wc.includes(d) && Ut(l))
      return null;
    const y = l[d];
    if (y === void 0 || De(l))
      return null;
    l = y, f++;
  }
  return l;
}
const Ty = "10.0.7", Yi = -1, kr = "en-US", Bl = "", Hl = (n) => `${n.charAt(0).toLocaleUpperCase()}${n.substr(1)}`;
function Iy() {
  return {
    upper: (n, r) => r === "text" && j(n) ? n.toUpperCase() : r === "vnode" && ke(n) && "__v_isVNode" in n ? n.children.toUpperCase() : n,
    lower: (n, r) => r === "text" && j(n) ? n.toLowerCase() : r === "vnode" && ke(n) && "__v_isVNode" in n ? n.children.toLowerCase() : n,
    capitalize: (n, r) => r === "text" && j(n) ? Hl(n) : r === "vnode" && ke(n) && "__v_isVNode" in n ? Hl(n.children) : n
  };
}
let $c;
function Ay(n) {
  $c = n;
}
let Bc;
function Sy(n) {
  Bc = n;
}
let Hc;
function Oy(n) {
  Hc = n;
}
let Yc = null;
const Cy = /* @__NO_SIDE_EFFECTS__ */ (n) => {
  Yc = n;
}, Ry = /* @__NO_SIDE_EFFECTS__ */ () => Yc;
let Gc = null;
const Yl = (n) => {
  Gc = n;
}, Dy = () => Gc;
let Gl = 0;
function Ny(n = {}) {
  const r = De(n.onWarn) ? n.onWarn : A1, s = j(n.version) ? n.version : Ty, u = j(n.locale) || De(n.locale) ? n.locale : kr, l = De(u) ? kr : u, f = Wt(n.fallbackLocale) || Le(n.fallbackLocale) || j(n.fallbackLocale) || n.fallbackLocale === !1 ? n.fallbackLocale : l, d = Le(n.messages) ? n.messages : ca(l), y = Le(n.datetimeFormats) ? n.datetimeFormats : ca(l), E = Le(n.numberFormats) ? n.numberFormats : ca(l), A = wn(Xe(), n.modifiers, Iy()), W = n.pluralRules || Xe(), x = De(n.missing) ? n.missing : null, R = tt(n.missingWarn) || Rl(n.missingWarn) ? n.missingWarn : !0, Y = tt(n.fallbackWarn) || Rl(n.fallbackWarn) ? n.fallbackWarn : !0, q = !!n.fallbackFormat, G = !!n.unresolving, B = De(n.postTranslation) ? n.postTranslation : null, w = Le(n.processor) ? n.processor : null, P = tt(n.warnHtmlMessage) ? n.warnHtmlMessage : !0, M = !!n.escapeParameter, S = De(n.messageCompiler) ? n.messageCompiler : $c, U = De(n.messageResolver) ? n.messageResolver : Bc || wy, H = De(n.localeFallbacker) ? n.localeFallbacker : Hc || dy, F = ke(n.fallbackContext) ? n.fallbackContext : void 0, le = n, _e = ke(le.__datetimeFormatters) ? le.__datetimeFormatters : /* @__PURE__ */ new Map(), Be = ke(le.__numberFormatters) ? le.__numberFormatters : /* @__PURE__ */ new Map(), st = ke(le.__meta) ? le.__meta : {};
  Gl++;
  const Oe = {
    version: s,
    cid: Gl,
    locale: u,
    fallbackLocale: f,
    messages: d,
    modifiers: A,
    pluralRules: W,
    missing: x,
    missingWarn: R,
    fallbackWarn: Y,
    fallbackFormat: q,
    unresolving: G,
    postTranslation: B,
    processor: w,
    warnHtmlMessage: P,
    escapeParameter: M,
    messageCompiler: S,
    messageResolver: U,
    localeFallbacker: H,
    fallbackContext: F,
    onWarn: r,
    __meta: st
  };
  return Oe.datetimeFormats = y, Oe.numberFormats = E, Oe.__datetimeFormatters = _e, Oe.__numberFormatters = Be, __INTLIFY_PROD_DEVTOOLS__ && ly(Oe, s, st), Oe;
}
const ca = (n) => ({ [n]: Xe() });
function Fa(n, r, s, u, l) {
  const { missing: f, onWarn: d } = n;
  if (f !== null) {
    const y = f(n, s, r, l);
    return j(y) ? y : r;
  } else
    return r;
}
function Rr(n, r, s) {
  const u = n;
  u.__localeChainCache = /* @__PURE__ */ new Map(), n.localeFallbacker(n, s, r);
}
function xy(n, r) {
  return n === r ? !1 : n.split("-")[0] === r.split("-")[0];
}
function Py(n, r) {
  const s = r.indexOf(n);
  if (s === -1)
    return !1;
  for (let u = s + 1; u < r.length; u++)
    if (xy(n, r[u]))
      return !0;
  return !1;
}
function Vl(n, ...r) {
  const { datetimeFormats: s, unresolving: u, fallbackLocale: l, onWarn: f, localeFallbacker: d } = n, { __datetimeFormatters: y } = n, [E, A, W, x] = ya(...r), R = tt(W.missingWarn) ? W.missingWarn : n.missingWarn;
  tt(W.fallbackWarn) ? W.fallbackWarn : n.fallbackWarn;
  const Y = !!W.part, q = Ma(n, W), G = d(
    n,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    l,
    q
  );
  if (!j(E) || E === "")
    return new Intl.DateTimeFormat(q, x).format(A);
  let B = {}, w, P = null;
  const M = "datetime format";
  for (let H = 0; H < G.length && (w = G[H], B = s[w] || {}, P = B[E], !Le(P)); H++)
    Fa(n, E, w, R, M);
  if (!Le(P) || !j(w))
    return u ? Yi : E;
  let S = `${w}__${E}`;
  Ra(x) || (S = `${S}__${JSON.stringify(x)}`);
  let U = y.get(S);
  return U || (U = new Intl.DateTimeFormat(w, wn({}, P, x)), y.set(S, U)), Y ? U.formatToParts(A) : U.format(A);
}
const Vc = [
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
function ya(...n) {
  const [r, s, u, l] = n, f = Xe();
  let d = Xe(), y;
  if (j(r)) {
    const E = r.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!E)
      throw tn(en.INVALID_ISO_DATE_ARGUMENT);
    const A = E[3] ? E[3].trim().startsWith("T") ? `${E[1].trim()}${E[3].trim()}` : `${E[1].trim()}T${E[3].trim()}` : E[1].trim();
    y = new Date(A);
    try {
      y.toISOString();
    } catch {
      throw tn(en.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (b1(r)) {
    if (isNaN(r.getTime()))
      throw tn(en.INVALID_DATE_ARGUMENT);
    y = r;
  } else if (qe(r))
    y = r;
  else
    throw tn(en.INVALID_ARGUMENT);
  return j(s) ? f.key = s : Le(s) && Object.keys(s).forEach((E) => {
    Vc.includes(E) ? d[E] = s[E] : f[E] = s[E];
  }), j(u) ? f.locale = u : Le(u) && (d = u), Le(l) && (d = l), [f.key || "", y, f, d];
}
function Kl(n, r, s) {
  const u = n;
  for (const l in s) {
    const f = `${r}__${l}`;
    u.__datetimeFormatters.has(f) && u.__datetimeFormatters.delete(f);
  }
}
function ql(n, ...r) {
  const { numberFormats: s, unresolving: u, fallbackLocale: l, onWarn: f, localeFallbacker: d } = n, { __numberFormatters: y } = n, [E, A, W, x] = Ea(...r), R = tt(W.missingWarn) ? W.missingWarn : n.missingWarn;
  tt(W.fallbackWarn) ? W.fallbackWarn : n.fallbackWarn;
  const Y = !!W.part, q = Ma(n, W), G = d(
    n,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    l,
    q
  );
  if (!j(E) || E === "")
    return new Intl.NumberFormat(q, x).format(A);
  let B = {}, w, P = null;
  const M = "number format";
  for (let H = 0; H < G.length && (w = G[H], B = s[w] || {}, P = B[E], !Le(P)); H++)
    Fa(n, E, w, R, M);
  if (!Le(P) || !j(w))
    return u ? Yi : E;
  let S = `${w}__${E}`;
  Ra(x) || (S = `${S}__${JSON.stringify(x)}`);
  let U = y.get(S);
  return U || (U = new Intl.NumberFormat(w, wn({}, P, x)), y.set(S, U)), Y ? U.formatToParts(A) : U.format(A);
}
const Kc = [
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
function Ea(...n) {
  const [r, s, u, l] = n, f = Xe();
  let d = Xe();
  if (!qe(r))
    throw tn(en.INVALID_ARGUMENT);
  const y = r;
  return j(s) ? f.key = s : Le(s) && Object.keys(s).forEach((E) => {
    Kc.includes(E) ? d[E] = s[E] : f[E] = s[E];
  }), j(u) ? f.locale = u : Le(u) && (d = u), Le(l) && (d = l), [f.key || "", y, f, d];
}
function Xl(n, r, s) {
  const u = n;
  for (const l in s) {
    const f = `${r}__${l}`;
    u.__numberFormatters.has(f) && u.__numberFormatters.delete(f);
  }
}
const My = (n) => n, Fy = (n) => "", ky = "text", Wy = (n) => n.length === 0 ? "" : Na(n), Uy = I1;
function Zl(n, r) {
  return n = Math.abs(n), r === 2 ? n ? n > 1 ? 1 : 0 : 1 : n ? Math.min(n, 2) : 0;
}
function $y(n) {
  const r = qe(n.pluralIndex) ? n.pluralIndex : -1;
  return n.named && (qe(n.named.count) || qe(n.named.n)) ? qe(n.named.count) ? n.named.count : qe(n.named.n) ? n.named.n : r : r;
}
function By(n, r) {
  r.count || (r.count = n), r.n || (r.n = n);
}
function Hy(n = {}) {
  const r = n.locale, s = $y(n), u = ke(n.pluralRules) && j(r) && De(n.pluralRules[r]) ? n.pluralRules[r] : Zl, l = ke(n.pluralRules) && j(r) && De(n.pluralRules[r]) ? Zl : void 0, f = (w) => w[u(s, w.length, l)], d = n.list || [], y = (w) => d[w], E = n.named || Xe();
  qe(n.pluralIndex) && By(s, E);
  const A = (w) => E[w];
  function W(w, P) {
    const M = De(n.messages) ? n.messages(w, !!P) : ke(n.messages) ? n.messages[w] : !1;
    return M || (n.parent ? n.parent.message(w) : Fy);
  }
  const x = (w) => n.modifiers ? n.modifiers[w] : My, R = Le(n.processor) && De(n.processor.normalize) ? n.processor.normalize : Wy, Y = Le(n.processor) && De(n.processor.interpolate) ? n.processor.interpolate : Uy, q = Le(n.processor) && j(n.processor.type) ? n.processor.type : ky, B = {
    list: y,
    named: A,
    plural: f,
    linked: (w, ...P) => {
      const [M, S] = P;
      let U = "text", H = "";
      P.length === 1 ? ke(M) ? (H = M.modifier || H, U = M.type || U) : j(M) && (H = M || H) : P.length === 2 && (j(M) && (H = M || H), j(S) && (U = S || U));
      const F = W(w, !0)(B), le = (
        // The message in vnode resolved with linked are returned as an array by processor.nomalize
        U === "vnode" && Wt(F) && H ? F[0] : F
      );
      return H ? x(H)(le, U) : le;
    },
    message: W,
    type: q,
    interpolate: Y,
    normalize: R,
    values: wn(Xe(), d, E)
  };
  return B;
}
const Jl = () => "", wt = (n) => De(n);
function Ql(n, ...r) {
  const { fallbackFormat: s, postTranslation: u, unresolving: l, messageCompiler: f, fallbackLocale: d, messages: y } = n, [E, A] = ba(...r), W = tt(A.missingWarn) ? A.missingWarn : n.missingWarn, x = tt(A.fallbackWarn) ? A.fallbackWarn : n.fallbackWarn, R = tt(A.escapeParameter) ? A.escapeParameter : n.escapeParameter, Y = !!A.resolvedMessage, q = j(A.default) || tt(A.default) ? tt(A.default) ? f ? E : () => E : A.default : s ? f ? E : () => E : null, G = s || q != null && (j(q) || De(q)), B = Ma(n, A);
  R && Yy(A);
  let [w, P, M] = Y ? [
    E,
    B,
    y[B] || Xe()
  ] : qc(n, E, B, d, x, W), S = w, U = E;
  if (!Y && !(j(S) || Ut(S) || wt(S)) && G && (S = q, U = S), !Y && (!(j(S) || Ut(S) || wt(S)) || !j(P)))
    return l ? Yi : E;
  let H = !1;
  const F = () => {
    H = !0;
  }, le = wt(S) ? S : Xc(n, E, P, S, U, F);
  if (H)
    return S;
  const _e = Ky(n, P, M, A), Be = Hy(_e), st = Gy(n, le, Be), Oe = u ? u(st, E) : st;
  if (__INTLIFY_PROD_DEVTOOLS__) {
    const nn = {
      timestamp: Date.now(),
      key: j(E) ? E : wt(S) ? S.key : "",
      locale: P || (wt(S) ? S.locale : ""),
      format: j(S) ? S : wt(S) ? S.source : "",
      message: Oe
    };
    nn.meta = wn({}, n.__meta, /* @__PURE__ */ Ry() || {}), cy(nn);
  }
  return Oe;
}
function Yy(n) {
  Wt(n.list) ? n.list = n.list.map((r) => j(r) ? xl(r) : r) : ke(n.named) && Object.keys(n.named).forEach((r) => {
    j(n.named[r]) && (n.named[r] = xl(n.named[r]));
  });
}
function qc(n, r, s, u, l, f) {
  const { messages: d, onWarn: y, messageResolver: E, localeFallbacker: A } = n, W = A(n, u, s);
  let x = Xe(), R, Y = null;
  const q = "translate";
  for (let G = 0; G < W.length && (R = W[G], x = d[R] || Xe(), (Y = E(x, r)) === null && (Y = x[r]), !(j(Y) || Ut(Y) || wt(Y))); G++)
    if (!Py(R, W)) {
      const B = Fa(
        n,
        // eslint-disable-line @typescript-eslint/no-explicit-any
        r,
        R,
        f,
        q
      );
      B !== r && (Y = B);
    }
  return [Y, R, x];
}
function Xc(n, r, s, u, l, f) {
  const { messageCompiler: d, warnHtmlMessage: y } = n;
  if (wt(u)) {
    const A = u;
    return A.locale = A.locale || s, A.key = A.key || r, A;
  }
  if (d == null) {
    const A = () => u;
    return A.locale = s, A.key = r, A;
  }
  const E = d(u, Vy(n, s, l, u, y, f));
  return E.locale = s, E.key = r, E.source = u, E;
}
function Gy(n, r, s) {
  return r(s);
}
function ba(...n) {
  const [r, s, u] = n, l = Xe();
  if (!j(r) && !qe(r) && !wt(r) && !Ut(r))
    throw tn(en.INVALID_ARGUMENT);
  const f = qe(r) ? String(r) : (wt(r), r);
  return qe(s) ? l.plural = s : j(s) ? l.default = s : Le(s) && !Ra(s) ? l.named = s : Wt(s) && (l.list = s), qe(u) ? l.plural = u : j(u) ? l.default = u : Le(u) && wn(l, u), [f, l];
}
function Vy(n, r, s, u, l, f) {
  return {
    locale: r,
    key: s,
    warnHtmlMessage: l,
    onError: (d) => {
      throw f && f(d), d;
    },
    onCacheKey: (d) => y1(r, s, d)
  };
}
function Ky(n, r, s, u) {
  const { modifiers: l, pluralRules: f, messageResolver: d, fallbackLocale: y, fallbackWarn: E, missingWarn: A, fallbackContext: W } = n, R = {
    locale: r,
    modifiers: l,
    pluralRules: f,
    messages: (Y, q) => {
      let G = d(s, Y);
      if (G == null && (W || q)) {
        const [, , B] = qc(
          W || n,
          // NOTE: if has fallbackContext, fallback to root, else if use linked, fallback to local context
          Y,
          r,
          y,
          E,
          A
        );
        G = d(B, Y);
      }
      if (j(G) || Ut(G)) {
        let B = !1;
        const P = Xc(n, Y, r, G, Y, () => {
          B = !0;
        });
        return B ? Jl : P;
      } else return wt(G) ? G : Jl;
    }
  };
  return n.processor && (R.processor = n.processor), u.list && (R.list = u.list), u.named && (R.named = u.named), qe(u.plural) && (R.pluralIndex = u.plural), R;
}
Q1();
/*!
  * vue-i18n v10.0.7
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const qy = "10.0.7";
function Xy() {
  typeof __VUE_I18N_FULL_INSTALL__ != "boolean" && (Nr().__VUE_I18N_FULL_INSTALL__ = !0), typeof __VUE_I18N_LEGACY_API__ != "boolean" && (Nr().__VUE_I18N_LEGACY_API__ = !0), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (Nr().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1), typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (Nr().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
const Ze = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: hy,
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
function it(n, ...r) {
  return Hi(n, null, void 0);
}
const wa = /* @__PURE__ */ bn("__translateVNode"), La = /* @__PURE__ */ bn("__datetimeParts"), Ta = /* @__PURE__ */ bn("__numberParts"), Zc = bn("__setPluralRules"), Jc = /* @__PURE__ */ bn("__injectWithOption"), Ia = /* @__PURE__ */ bn("__dispose");
function Wr(n) {
  if (!rt(n) || Ut(n))
    return n;
  for (const r in n)
    if (Ui(n, r))
      if (!r.includes("."))
        rt(n[r]) && Wr(n[r]);
      else {
        const s = r.split("."), u = s.length - 1;
        let l = n, f = !1;
        for (let d = 0; d < u; d++) {
          if (s[d] === "__proto__")
            throw new Error(`unsafe key: ${s[d]}`);
          if (s[d] in l || (l[s[d]] = nt()), !rt(l[s[d]])) {
            f = !0;
            break;
          }
          l = l[s[d]];
        }
        if (f || (Ut(l) ? Wc.includes(s[u]) || delete n[r] : (l[s[u]] = n[r], delete n[r])), !Ut(l)) {
          const d = l[s[u]];
          rt(d) && Wr(d);
        }
      }
  return n;
}
function ka(n, r) {
  const { messages: s, __i18n: u, messageResolver: l, flatJson: f } = r, d = $e(s) ? s : Lt(u) ? nt() : { [n]: nt() };
  if (Lt(u) && u.forEach((y) => {
    if ("locale" in y && "resource" in y) {
      const { locale: E, resource: A } = y;
      E ? (d[E] = d[E] || nt(), Pi(A, d[E])) : Pi(A, d);
    } else
      Ee(y) && Pi(JSON.parse(y), d);
  }), l == null && f)
    for (const y in d)
      Ui(d, y) && Wr(d[y]);
  return d;
}
function Qc(n) {
  return n.type;
}
function zc(n, r, s) {
  let u = rt(r.messages) ? r.messages : nt();
  "__i18nGlobal" in s && (u = ka(n.locale.value, {
    messages: u,
    __i18n: s.__i18nGlobal
  }));
  const l = Object.keys(u);
  l.length && l.forEach((f) => {
    n.mergeLocaleMessage(f, u[f]);
  });
  {
    if (rt(r.datetimeFormats)) {
      const f = Object.keys(r.datetimeFormats);
      f.length && f.forEach((d) => {
        n.mergeDateTimeFormat(d, r.datetimeFormats[d]);
      });
    }
    if (rt(r.numberFormats)) {
      const f = Object.keys(r.numberFormats);
      f.length && f.forEach((d) => {
        n.mergeNumberFormat(d, r.numberFormats[d]);
      });
    }
  }
}
function zl(n) {
  return rv(iv, null, n, 0);
}
const jl = "__INTLIFY_META__", ec = () => [], Zy = () => !1;
let tc = 0;
function nc(n) {
  return (r, s, u, l) => n(s, u, Pr() || void 0, l);
}
const Jy = /* @__NO_SIDE_EFFECTS__ */ () => {
  const n = Pr();
  let r = null;
  return n && (r = Qc(n)[jl]) ? { [jl]: r } : null;
};
function Wa(n = {}) {
  const { __root: r, __injectWithOption: s } = n, u = r === void 0, l = n.flatJson, f = ki ? mc : tv;
  let d = Pe(n.inheritLocale) ? n.inheritLocale : !0;
  const y = f(
    // prettier-ignore
    r && d ? r.locale.value : Ee(n.locale) ? n.locale : kr
  ), E = f(
    // prettier-ignore
    r && d ? r.fallbackLocale.value : Ee(n.fallbackLocale) || Lt(n.fallbackLocale) || $e(n.fallbackLocale) || n.fallbackLocale === !1 ? n.fallbackLocale : y.value
  ), A = f(ka(y.value, n)), W = f($e(n.datetimeFormats) ? n.datetimeFormats : { [y.value]: {} }), x = f($e(n.numberFormats) ? n.numberFormats : { [y.value]: {} });
  let R = r ? r.missingWarn : Pe(n.missingWarn) || Wi(n.missingWarn) ? n.missingWarn : !0, Y = r ? r.fallbackWarn : Pe(n.fallbackWarn) || Wi(n.fallbackWarn) ? n.fallbackWarn : !0, q = r ? r.fallbackRoot : Pe(n.fallbackRoot) ? n.fallbackRoot : !0, G = !!n.fallbackFormat, B = nr(n.missing) ? n.missing : null, w = nr(n.missing) ? nc(n.missing) : null, P = nr(n.postTranslation) ? n.postTranslation : null, M = r ? r.warnHtmlMessage : Pe(n.warnHtmlMessage) ? n.warnHtmlMessage : !0, S = !!n.escapeParameter;
  const U = r ? r.modifiers : $e(n.modifiers) ? n.modifiers : {};
  let H = n.pluralRules || r && r.pluralRules, F;
  F = (() => {
    u && Yl(null);
    const T = {
      version: qy,
      locale: y.value,
      fallbackLocale: E.value,
      messages: A.value,
      modifiers: U,
      pluralRules: H,
      missing: w === null ? void 0 : w,
      missingWarn: R,
      fallbackWarn: Y,
      fallbackFormat: G,
      unresolving: !0,
      postTranslation: P === null ? void 0 : P,
      warnHtmlMessage: M,
      escapeParameter: S,
      messageResolver: n.messageResolver,
      messageCompiler: n.messageCompiler,
      __meta: { framework: "vue" }
    };
    T.datetimeFormats = W.value, T.numberFormats = x.value, T.__datetimeFormatters = $e(F) ? F.__datetimeFormatters : void 0, T.__numberFormatters = $e(F) ? F.__numberFormatters : void 0;
    const k = Ny(T);
    return u && Yl(k), k;
  })(), Rr(F, y.value, E.value);
  function _e() {
    return [
      y.value,
      E.value,
      A.value,
      W.value,
      x.value
    ];
  }
  const Be = Ct({
    get: () => y.value,
    set: (T) => {
      y.value = T, F.locale = y.value;
    }
  }), st = Ct({
    get: () => E.value,
    set: (T) => {
      E.value = T, F.fallbackLocale = E.value, Rr(F, y.value, T);
    }
  }), Oe = Ct(() => A.value), nn = /* @__PURE__ */ Ct(() => W.value), Wn = /* @__PURE__ */ Ct(() => x.value);
  function ur() {
    return nr(P) ? P : null;
  }
  function or(T) {
    P = T, F.postTranslation = T;
  }
  function rn() {
    return B;
  }
  function Dt(T) {
    T !== null && (w = nc(T)), B = T, F.missing = w;
  }
  const Tt = (T, k, he, pe, Je, ln) => {
    _e();
    let xt;
    try {
      __INTLIFY_PROD_DEVTOOLS__, u || (F.fallbackContext = r ? Dy() : void 0), xt = T(F);
    } finally {
      __INTLIFY_PROD_DEVTOOLS__, u || (F.fallbackContext = void 0);
    }
    if (he !== "translate exists" && // for not `te` (e.g `t`)
    sr(xt) && xt === Yi || he === "translate exists" && !xt) {
      const [gr, Br] = k();
      return r && q ? pe(r) : Je(gr);
    } else {
      if (ln(xt))
        return xt;
      throw it(Ze.UNEXPECTED_RETURN_TYPE);
    }
  };
  function Bt(...T) {
    return Tt((k) => Reflect.apply(Ql, null, [k, ...T]), () => ba(...T), "translate", (k) => Reflect.apply(k.t, k, [...T]), (k) => k, (k) => Ee(k));
  }
  function He(...T) {
    const [k, he, pe] = T;
    if (pe && !rt(pe))
      throw it(Ze.INVALID_ARGUMENT);
    return Bt(k, he, Rt({ resolvedMessage: !0 }, pe || {}));
  }
  function lr(...T) {
    return Tt((k) => Reflect.apply(Vl, null, [k, ...T]), () => ya(...T), "datetime format", (k) => Reflect.apply(k.d, k, [...T]), () => Bl, (k) => Ee(k));
  }
  function cr(...T) {
    return Tt((k) => Reflect.apply(ql, null, [k, ...T]), () => Ea(...T), "number format", (k) => Reflect.apply(k.n, k, [...T]), () => Bl, (k) => Ee(k));
  }
  function fr(T) {
    return T.map((k) => Ee(k) || sr(k) || Pe(k) ? zl(String(k)) : k);
  }
  const sn = {
    normalize: fr,
    interpolate: (T) => T,
    type: "vnode"
  };
  function hr(...T) {
    return Tt((k) => {
      let he;
      const pe = k;
      try {
        pe.processor = sn, he = Reflect.apply(Ql, null, [pe, ...T]);
      } finally {
        pe.processor = null;
      }
      return he;
    }, () => ba(...T), "translate", (k) => k[wa](...T), (k) => [zl(k)], (k) => Lt(k));
  }
  function Nt(...T) {
    return Tt((k) => Reflect.apply(ql, null, [k, ...T]), () => Ea(...T), "number format", (k) => k[Ta](...T), ec, (k) => Ee(k) || Lt(k));
  }
  function Yt(...T) {
    return Tt((k) => Reflect.apply(Vl, null, [k, ...T]), () => ya(...T), "datetime format", (k) => k[La](...T), ec, (k) => Ee(k) || Lt(k));
  }
  function dr(T) {
    H = T, F.pluralRules = H;
  }
  function an(T, k) {
    return Tt(() => {
      if (!T)
        return !1;
      const he = Ee(k) ? k : y.value, pe = Ne(he), Je = F.messageResolver(pe, T);
      return Ut(Je) || wt(Je) || Ee(Je);
    }, () => [T], "translate exists", (he) => Reflect.apply(he.te, he, [T, k]), Zy, (he) => Pe(he));
  }
  function un(T) {
    let k = null;
    const he = Uc(F, E.value, y.value);
    for (let pe = 0; pe < he.length; pe++) {
      const Je = A.value[he[pe]] || {}, ln = F.messageResolver(Je, T);
      if (ln != null) {
        k = ln;
        break;
      }
    }
    return k;
  }
  function on(T) {
    const k = un(T);
    return k ?? (r ? r.tm(T) || {} : {});
  }
  function Ne(T) {
    return A.value[T] || {};
  }
  function dt(T, k) {
    if (l) {
      const he = { [T]: k };
      for (const pe in he)
        Ui(he, pe) && Wr(he[pe]);
      k = he[T];
    }
    A.value[T] = k, F.messages = A.value;
  }
  function In(T, k) {
    A.value[T] = A.value[T] || {};
    const he = { [T]: k };
    if (l)
      for (const pe in he)
        Ui(he, pe) && Wr(he[pe]);
    k = he[T], Pi(k, A.value[T]), F.messages = A.value;
  }
  function at(T) {
    return W.value[T] || {};
  }
  function m(T, k) {
    W.value[T] = k, F.datetimeFormats = W.value, Kl(F, T, k);
  }
  function p(T, k) {
    W.value[T] = Rt(W.value[T] || {}, k), F.datetimeFormats = W.value, Kl(F, T, k);
  }
  function D(T) {
    return x.value[T] || {};
  }
  function K(T, k) {
    x.value[T] = k, F.numberFormats = x.value, Xl(F, T, k);
  }
  function me(T, k) {
    x.value[T] = Rt(x.value[T] || {}, k), F.numberFormats = x.value, Xl(F, T, k);
  }
  tc++, r && ki && (En(r.locale, (T) => {
    d && (y.value = T, F.locale = T, Rr(F, y.value, E.value));
  }), En(r.fallbackLocale, (T) => {
    d && (E.value = T, F.fallbackLocale = T, Rr(F, y.value, E.value));
  }));
  const ee = {
    id: tc,
    locale: Be,
    fallbackLocale: st,
    get inheritLocale() {
      return d;
    },
    set inheritLocale(T) {
      d = T, T && r && (y.value = r.locale.value, E.value = r.fallbackLocale.value, Rr(F, y.value, E.value));
    },
    get availableLocales() {
      return Object.keys(A.value).sort();
    },
    messages: Oe,
    get modifiers() {
      return U;
    },
    get pluralRules() {
      return H || {};
    },
    get isGlobal() {
      return u;
    },
    get missingWarn() {
      return R;
    },
    set missingWarn(T) {
      R = T, F.missingWarn = R;
    },
    get fallbackWarn() {
      return Y;
    },
    set fallbackWarn(T) {
      Y = T, F.fallbackWarn = Y;
    },
    get fallbackRoot() {
      return q;
    },
    set fallbackRoot(T) {
      q = T;
    },
    get fallbackFormat() {
      return G;
    },
    set fallbackFormat(T) {
      G = T, F.fallbackFormat = G;
    },
    get warnHtmlMessage() {
      return M;
    },
    set warnHtmlMessage(T) {
      M = T, F.warnHtmlMessage = T;
    },
    get escapeParameter() {
      return S;
    },
    set escapeParameter(T) {
      S = T, F.escapeParameter = T;
    },
    t: Bt,
    getLocaleMessage: Ne,
    setLocaleMessage: dt,
    mergeLocaleMessage: In,
    getPostTranslationHandler: ur,
    setPostTranslationHandler: or,
    getMissingHandler: rn,
    setMissingHandler: Dt,
    [Zc]: dr
  };
  return ee.datetimeFormats = nn, ee.numberFormats = Wn, ee.rt = He, ee.te = an, ee.tm = on, ee.d = lr, ee.n = cr, ee.getDateTimeFormat = at, ee.setDateTimeFormat = m, ee.mergeDateTimeFormat = p, ee.getNumberFormat = D, ee.setNumberFormat = K, ee.mergeNumberFormat = me, ee[Jc] = s, ee[wa] = hr, ee[La] = Yt, ee[Ta] = Nt, ee;
}
function Qy(n) {
  const r = Ee(n.locale) ? n.locale : kr, s = Ee(n.fallbackLocale) || Lt(n.fallbackLocale) || $e(n.fallbackLocale) || n.fallbackLocale === !1 ? n.fallbackLocale : r, u = nr(n.missing) ? n.missing : void 0, l = Pe(n.silentTranslationWarn) || Wi(n.silentTranslationWarn) ? !n.silentTranslationWarn : !0, f = Pe(n.silentFallbackWarn) || Wi(n.silentFallbackWarn) ? !n.silentFallbackWarn : !0, d = Pe(n.fallbackRoot) ? n.fallbackRoot : !0, y = !!n.formatFallbackMessages, E = $e(n.modifiers) ? n.modifiers : {}, A = n.pluralizationRules, W = nr(n.postTranslation) ? n.postTranslation : void 0, x = Ee(n.warnHtmlInMessage) ? n.warnHtmlInMessage !== "off" : !0, R = !!n.escapeParameterHtml, Y = Pe(n.sync) ? n.sync : !0;
  let q = n.messages;
  if ($e(n.sharedMessages)) {
    const U = n.sharedMessages;
    q = Object.keys(U).reduce((F, le) => {
      const _e = F[le] || (F[le] = {});
      return Rt(_e, U[le]), F;
    }, q || {});
  }
  const { __i18n: G, __root: B, __injectWithOption: w } = n, P = n.datetimeFormats, M = n.numberFormats, S = n.flatJson;
  return {
    locale: r,
    fallbackLocale: s,
    messages: q,
    flatJson: S,
    datetimeFormats: P,
    numberFormats: M,
    missing: u,
    missingWarn: l,
    fallbackWarn: f,
    fallbackRoot: d,
    fallbackFormat: y,
    modifiers: E,
    pluralRules: A,
    postTranslation: W,
    warnHtmlMessage: x,
    escapeParameter: R,
    messageResolver: n.messageResolver,
    inheritLocale: Y,
    __i18n: G,
    __root: B,
    __injectWithOption: w
  };
}
function Aa(n = {}) {
  const r = Wa(Qy(n)), { __extender: s } = n, u = {
    // id
    id: r.id,
    // locale
    get locale() {
      return r.locale.value;
    },
    set locale(l) {
      r.locale.value = l;
    },
    // fallbackLocale
    get fallbackLocale() {
      return r.fallbackLocale.value;
    },
    set fallbackLocale(l) {
      r.fallbackLocale.value = l;
    },
    // messages
    get messages() {
      return r.messages.value;
    },
    // datetimeFormats
    get datetimeFormats() {
      return r.datetimeFormats.value;
    },
    // numberFormats
    get numberFormats() {
      return r.numberFormats.value;
    },
    // availableLocales
    get availableLocales() {
      return r.availableLocales;
    },
    // missing
    get missing() {
      return r.getMissingHandler();
    },
    set missing(l) {
      r.setMissingHandler(l);
    },
    // silentTranslationWarn
    get silentTranslationWarn() {
      return Pe(r.missingWarn) ? !r.missingWarn : r.missingWarn;
    },
    set silentTranslationWarn(l) {
      r.missingWarn = Pe(l) ? !l : l;
    },
    // silentFallbackWarn
    get silentFallbackWarn() {
      return Pe(r.fallbackWarn) ? !r.fallbackWarn : r.fallbackWarn;
    },
    set silentFallbackWarn(l) {
      r.fallbackWarn = Pe(l) ? !l : l;
    },
    // modifiers
    get modifiers() {
      return r.modifiers;
    },
    // formatFallbackMessages
    get formatFallbackMessages() {
      return r.fallbackFormat;
    },
    set formatFallbackMessages(l) {
      r.fallbackFormat = l;
    },
    // postTranslation
    get postTranslation() {
      return r.getPostTranslationHandler();
    },
    set postTranslation(l) {
      r.setPostTranslationHandler(l);
    },
    // sync
    get sync() {
      return r.inheritLocale;
    },
    set sync(l) {
      r.inheritLocale = l;
    },
    // warnInHtmlMessage
    get warnHtmlInMessage() {
      return r.warnHtmlMessage ? "warn" : "off";
    },
    set warnHtmlInMessage(l) {
      r.warnHtmlMessage = l !== "off";
    },
    // escapeParameterHtml
    get escapeParameterHtml() {
      return r.escapeParameter;
    },
    set escapeParameterHtml(l) {
      r.escapeParameter = l;
    },
    // pluralizationRules
    get pluralizationRules() {
      return r.pluralRules || {};
    },
    // for internal
    __composer: r,
    // t
    t(...l) {
      return Reflect.apply(r.t, r, [...l]);
    },
    // rt
    rt(...l) {
      return Reflect.apply(r.rt, r, [...l]);
    },
    // tc
    tc(...l) {
      const [f, d, y] = l, E = { plural: 1 };
      let A = null, W = null;
      if (!Ee(f))
        throw it(Ze.INVALID_ARGUMENT);
      const x = f;
      return Ee(d) ? E.locale = d : sr(d) ? E.plural = d : Lt(d) ? A = d : $e(d) && (W = d), Ee(y) ? E.locale = y : Lt(y) ? A = y : $e(y) && (W = y), Reflect.apply(r.t, r, [
        x,
        A || W || {},
        E
      ]);
    },
    // te
    te(l, f) {
      return r.te(l, f);
    },
    // tm
    tm(l) {
      return r.tm(l);
    },
    // getLocaleMessage
    getLocaleMessage(l) {
      return r.getLocaleMessage(l);
    },
    // setLocaleMessage
    setLocaleMessage(l, f) {
      r.setLocaleMessage(l, f);
    },
    // mergeLocaleMessage
    mergeLocaleMessage(l, f) {
      r.mergeLocaleMessage(l, f);
    },
    // d
    d(...l) {
      return Reflect.apply(r.d, r, [...l]);
    },
    // getDateTimeFormat
    getDateTimeFormat(l) {
      return r.getDateTimeFormat(l);
    },
    // setDateTimeFormat
    setDateTimeFormat(l, f) {
      r.setDateTimeFormat(l, f);
    },
    // mergeDateTimeFormat
    mergeDateTimeFormat(l, f) {
      r.mergeDateTimeFormat(l, f);
    },
    // n
    n(...l) {
      return Reflect.apply(r.n, r, [...l]);
    },
    // getNumberFormat
    getNumberFormat(l) {
      return r.getNumberFormat(l);
    },
    // setNumberFormat
    setNumberFormat(l, f) {
      r.setNumberFormat(l, f);
    },
    // mergeNumberFormat
    mergeNumberFormat(l, f) {
      r.mergeNumberFormat(l, f);
    }
  };
  return u.__extender = s, u;
}
function zy(n, r, s) {
  return {
    beforeCreate() {
      const u = Pr();
      if (!u)
        throw it(Ze.UNEXPECTED_ERROR);
      const l = this.$options;
      if (l.i18n) {
        const f = l.i18n;
        if (l.__i18n && (f.__i18n = l.__i18n), f.__root = r, this === this.$root)
          this.$i18n = rc(n, f);
        else {
          f.__injectWithOption = !0, f.__extender = s.__vueI18nExtend, this.$i18n = Aa(f);
          const d = this.$i18n;
          d.__extender && (d.__disposer = d.__extender(this.$i18n));
        }
      } else if (l.__i18n)
        if (this === this.$root)
          this.$i18n = rc(n, l);
        else {
          this.$i18n = Aa({
            __i18n: l.__i18n,
            __injectWithOption: !0,
            __extender: s.__vueI18nExtend,
            __root: r
          });
          const f = this.$i18n;
          f.__extender && (f.__disposer = f.__extender(this.$i18n));
        }
      else
        this.$i18n = n;
      l.__i18nGlobal && zc(r, l, l), this.$t = (...f) => this.$i18n.t(...f), this.$rt = (...f) => this.$i18n.rt(...f), this.$tc = (...f) => this.$i18n.tc(...f), this.$te = (f, d) => this.$i18n.te(f, d), this.$d = (...f) => this.$i18n.d(...f), this.$n = (...f) => this.$i18n.n(...f), this.$tm = (f) => this.$i18n.tm(f), s.__setInstance(u, this.$i18n);
    },
    mounted() {
    },
    unmounted() {
      const u = Pr();
      if (!u)
        throw it(Ze.UNEXPECTED_ERROR);
      const l = this.$i18n;
      delete this.$t, delete this.$rt, delete this.$tc, delete this.$te, delete this.$d, delete this.$n, delete this.$tm, l.__disposer && (l.__disposer(), delete l.__disposer, delete l.__extender), s.__deleteInstance(u), delete this.$i18n;
    }
  };
}
function rc(n, r) {
  n.locale = r.locale || n.locale, n.fallbackLocale = r.fallbackLocale || n.fallbackLocale, n.missing = r.missing || n.missing, n.silentTranslationWarn = r.silentTranslationWarn || n.silentFallbackWarn, n.silentFallbackWarn = r.silentFallbackWarn || n.silentFallbackWarn, n.formatFallbackMessages = r.formatFallbackMessages || n.formatFallbackMessages, n.postTranslation = r.postTranslation || n.postTranslation, n.warnHtmlInMessage = r.warnHtmlInMessage || n.warnHtmlInMessage, n.escapeParameterHtml = r.escapeParameterHtml || n.escapeParameterHtml, n.sync = r.sync || n.sync, n.__composer[Zc](r.pluralizationRules || n.pluralizationRules);
  const s = ka(n.locale, {
    messages: r.messages,
    __i18n: r.__i18n
  });
  return Object.keys(s).forEach((u) => n.mergeLocaleMessage(u, s[u])), r.datetimeFormats && Object.keys(r.datetimeFormats).forEach((u) => n.mergeDateTimeFormat(u, r.datetimeFormats[u])), r.numberFormats && Object.keys(r.numberFormats).forEach((u) => n.mergeNumberFormat(u, r.numberFormats[u])), n;
}
const Ua = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
    validator: (n) => n === "parent" || n === "global",
    default: "parent"
    /* ComponentI18nScope */
  },
  i18n: {
    type: Object
  }
};
function jy({ slots: n }, r) {
  return r.length === 1 && r[0] === "default" ? (n.default ? n.default() : []).reduce((u, l) => [
    ...u,
    // prettier-ignore
    ...l.type === vc ? l.children : [l]
  ], []) : r.reduce((s, u) => {
    const l = n[u];
    return l && (s[u] = l()), s;
  }, nt());
}
function jc() {
  return vc;
}
const eE = /* @__PURE__ */ Ca({
  /* eslint-disable */
  name: "i18n-t",
  props: Rt({
    keypath: {
      type: String,
      required: !0
    },
    plural: {
      type: [Number, String],
      validator: (n) => sr(n) || !isNaN(n)
    }
  }, Ua),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(n, r) {
    const { slots: s, attrs: u } = r, l = n.i18n || $a({
      useScope: n.scope,
      __useComponent: !0
    });
    return () => {
      const f = Object.keys(s).filter((x) => x !== "_"), d = nt();
      n.locale && (d.locale = n.locale), n.plural !== void 0 && (d.plural = Ee(n.plural) ? +n.plural : n.plural);
      const y = jy(r, f), E = l[wa](n.keypath, y, d), A = Rt(nt(), u), W = Ee(n.tag) || rt(n.tag) ? n.tag : jc();
      return pc(W, A, E);
    };
  }
}), ic = eE;
function tE(n) {
  return Lt(n) && !Ee(n[0]);
}
function ef(n, r, s, u) {
  const { slots: l, attrs: f } = r;
  return () => {
    const d = { part: !0 };
    let y = nt();
    n.locale && (d.locale = n.locale), Ee(n.format) ? d.key = n.format : rt(n.format) && (Ee(n.format.key) && (d.key = n.format.key), y = Object.keys(n.format).reduce((R, Y) => s.includes(Y) ? Rt(nt(), R, { [Y]: n.format[Y] }) : R, nt()));
    const E = u(n.value, d, y);
    let A = [d.key];
    Lt(E) ? A = E.map((R, Y) => {
      const q = l[R.type], G = q ? q({ [R.type]: R.value, index: Y, parts: E }) : [R.value];
      return tE(G) && (G[0].key = `${R.type}-${Y}`), G;
    }) : Ee(E) && (A = [E]);
    const W = Rt(nt(), f), x = Ee(n.tag) || rt(n.tag) ? n.tag : jc();
    return pc(x, W, A);
  };
}
const nE = /* @__PURE__ */ Ca({
  /* eslint-disable */
  name: "i18n-n",
  props: Rt({
    value: {
      type: Number,
      required: !0
    },
    format: {
      type: [String, Object]
    }
  }, Ua),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(n, r) {
    const s = n.i18n || $a({
      useScope: n.scope,
      __useComponent: !0
    });
    return ef(n, r, Kc, (...u) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      s[Ta](...u)
    ));
  }
}), sc = nE, rE = /* @__PURE__ */ Ca({
  /* eslint-disable */
  name: "i18n-d",
  props: Rt({
    value: {
      type: [Number, Date],
      required: !0
    },
    format: {
      type: [String, Object]
    }
  }, Ua),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(n, r) {
    const s = n.i18n || $a({
      useScope: n.scope,
      __useComponent: !0
    });
    return ef(n, r, Vc, (...u) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      s[La](...u)
    ));
  }
}), ac = rE;
function iE(n, r) {
  const s = n;
  if (n.mode === "composition")
    return s.__getInstance(r) || n.global;
  {
    const u = s.__getInstance(r);
    return u != null ? u.__composer : n.global.__composer;
  }
}
function sE(n) {
  const r = (d) => {
    const { instance: y, value: E } = d;
    if (!y || !y.$)
      throw it(Ze.UNEXPECTED_ERROR);
    const A = iE(n, y.$), W = uc(E);
    return [
      Reflect.apply(A.t, A, [...oc(W)]),
      A
    ];
  };
  return {
    created: (d, y) => {
      const [E, A] = r(y);
      ki && n.global === A && (d.__i18nWatcher = En(A.locale, () => {
        y.instance && y.instance.$forceUpdate();
      })), d.__composer = A, d.textContent = E;
    },
    unmounted: (d) => {
      ki && d.__i18nWatcher && (d.__i18nWatcher(), d.__i18nWatcher = void 0, delete d.__i18nWatcher), d.__composer && (d.__composer = void 0, delete d.__composer);
    },
    beforeUpdate: (d, { value: y }) => {
      if (d.__composer) {
        const E = d.__composer, A = uc(y);
        d.textContent = Reflect.apply(E.t, E, [
          ...oc(A)
        ]);
      }
    },
    getSSRProps: (d) => {
      const [y] = r(d);
      return { textContent: y };
    }
  };
}
function uc(n) {
  if (Ee(n))
    return { path: n };
  if ($e(n)) {
    if (!("path" in n))
      throw it(Ze.REQUIRED_VALUE, "path");
    return n;
  } else
    throw it(Ze.INVALID_VALUE);
}
function oc(n) {
  const { path: r, locale: s, args: u, choice: l, plural: f } = n, d = {}, y = u || {};
  return Ee(s) && (d.locale = s), sr(l) && (d.plural = l), sr(f) && (d.plural = f), [r, y, d];
}
function aE(n, r, ...s) {
  const u = $e(s[0]) ? s[0] : {};
  (Pe(u.globalInstall) ? u.globalInstall : !0) && ([ic.name, "I18nT"].forEach((f) => n.component(f, ic)), [sc.name, "I18nN"].forEach((f) => n.component(f, sc)), [ac.name, "I18nD"].forEach((f) => n.component(f, ac))), n.directive("t", sE(r));
}
const uE = /* @__PURE__ */ bn("global-vue-i18n");
function oE(n = {}, r) {
  const s = __VUE_I18N_LEGACY_API__ && Pe(n.legacy) ? n.legacy : __VUE_I18N_LEGACY_API__, u = Pe(n.globalInjection) ? n.globalInjection : !0, l = /* @__PURE__ */ new Map(), [f, d] = lE(n, s), y = /* @__PURE__ */ bn("");
  function E(R) {
    return l.get(R) || null;
  }
  function A(R, Y) {
    l.set(R, Y);
  }
  function W(R) {
    l.delete(R);
  }
  const x = {
    // mode
    get mode() {
      return __VUE_I18N_LEGACY_API__ && s ? "legacy" : "composition";
    },
    // install plugin
    async install(R, ...Y) {
      if (R.__VUE_I18N_SYMBOL__ = y, R.provide(R.__VUE_I18N_SYMBOL__, x), $e(Y[0])) {
        const B = Y[0];
        x.__composerExtend = B.__composerExtend, x.__vueI18nExtend = B.__vueI18nExtend;
      }
      let q = null;
      !s && u && (q = pE(R, x.global)), __VUE_I18N_FULL_INSTALL__ && aE(R, x, ...Y), __VUE_I18N_LEGACY_API__ && s && R.mixin(zy(d, d.__composer, x));
      const G = R.unmount;
      R.unmount = () => {
        q && q(), x.dispose(), G();
      };
    },
    // global accessor
    get global() {
      return d;
    },
    dispose() {
      f.stop();
    },
    // @internal
    __instances: l,
    // @internal
    __getInstance: E,
    // @internal
    __setInstance: A,
    // @internal
    __deleteInstance: W
  };
  return x;
}
function $a(n = {}) {
  const r = Pr();
  if (r == null)
    throw it(Ze.MUST_BE_CALL_SETUP_TOP);
  if (!r.isCE && r.appContext.app != null && !r.appContext.app.__VUE_I18N_SYMBOL__)
    throw it(Ze.NOT_INSTALLED);
  const s = cE(r), u = hE(s), l = Qc(r), f = fE(n, l);
  if (f === "global")
    return zc(u, n, l), u;
  if (f === "parent") {
    let E = dE(s, r, n.__useComponent);
    return E == null && (E = u), E;
  }
  const d = s;
  let y = d.__getInstance(r);
  if (y == null) {
    const E = Rt({}, n);
    "__i18n" in l && (E.__i18n = l.__i18n), u && (E.__root = u), y = Wa(E), d.__composerExtend && (y[Ia] = d.__composerExtend(y)), _E(d, r, y), d.__setInstance(r, y);
  }
  return y;
}
function lE(n, r, s) {
  const u = ha(), l = __VUE_I18N_LEGACY_API__ && r ? u.run(() => Aa(n)) : u.run(() => Wa(n));
  if (l == null)
    throw it(Ze.UNEXPECTED_ERROR);
  return [u, l];
}
function cE(n) {
  const r = xr(n.isCE ? uE : n.appContext.app.__VUE_I18N_SYMBOL__);
  if (!r)
    throw it(n.isCE ? Ze.NOT_INSTALLED_WITH_PROVIDE : Ze.UNEXPECTED_ERROR);
  return r;
}
function fE(n, r) {
  return _1(n) ? "__i18n" in r ? "local" : "global" : n.useScope ? n.useScope : "local";
}
function hE(n) {
  return n.mode === "composition" ? n.global : n.global.__composer;
}
function dE(n, r, s = !1) {
  let u = null;
  const l = r.root;
  let f = gE(r, s);
  for (; f != null; ) {
    const d = n;
    if (n.mode === "composition")
      u = d.__getInstance(f);
    else if (__VUE_I18N_LEGACY_API__) {
      const y = d.__getInstance(f);
      y != null && (u = y.__composer, s && u && !u[Jc] && (u = null));
    }
    if (u != null || l === f)
      break;
    f = f.parent;
  }
  return u;
}
function gE(n, r = !1) {
  return n == null ? null : r && n.vnode.ctx || n.parent;
}
function _E(n, r, s) {
  yc(() => {
  }, r), Ec(() => {
    const u = s;
    n.__deleteInstance(r);
    const l = u[Ia];
    l && (l(), delete u[Ia]);
  }, r);
}
const mE = [
  "locale",
  "fallbackLocale",
  "availableLocales"
], lc = ["t", "rt", "d", "n", "tm", "te"];
function pE(n, r) {
  const s = /* @__PURE__ */ Object.create(null);
  return mE.forEach((l) => {
    const f = Object.getOwnPropertyDescriptor(r, l);
    if (!f)
      throw it(Ze.UNEXPECTED_ERROR);
    const d = nv(f.value) ? {
      get() {
        return f.value.value;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(y) {
        f.value.value = y;
      }
    } : {
      get() {
        return f.get && f.get();
      }
    };
    Object.defineProperty(s, l, d);
  }), n.config.globalProperties.$i18n = s, lc.forEach((l) => {
    const f = Object.getOwnPropertyDescriptor(r, l);
    if (!f || !f.value)
      throw it(Ze.UNEXPECTED_ERROR);
    Object.defineProperty(n.config.globalProperties, `$${l}`, f);
  }), () => {
    delete n.config.globalProperties.$i18n, lc.forEach((l) => {
      delete n.config.globalProperties[`$${l}`];
    });
  };
}
Xy();
Ay(uy);
Sy(Ly);
Oy(Uc);
if (__INTLIFY_PROD_DEVTOOLS__) {
  const n = Nr();
  n.__INTLIFY__ = !0, oy(n.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
function vE() {
  const r = (Z0("lang", ",") || ["en"]).map(
    (s) => s.toLowerCase().replace(/[_-](\w+)/, "")
  ).find((s) => s in Oa.locales);
  return oE({
    legacy: !1,
    globalInjection: !0,
    fallbackLocale: "en",
    locale: r
  });
}
const Gi = vE(), rr = Gi.global.t;
function yE({ path: n = "./", fallback: r = !0, composer: s = null } = {}) {
  return s ?? (s = Gi.global), fc({ composer: s, path: n, fallback: r }), En(() => s.locale, () => fc({ composer: s, path: n, fallback: r })), s;
}
function BE(n, r, s) {
  if (!(s in Oa.locales))
    throw Error("Locale is not provided by config.");
  n.global.locale.value = s, Sa(n, r, s), document.querySelector("html").setAttribute("lang", s);
}
const cc = /* @__PURE__ */ new Set();
function fc({ path: n = "./", fallback: r = !0, composer: s = null } = {}) {
  s ?? (s = Gi.global), n.startsWith("/") || (n = import.meta.resolve(n)), n.endsWith("/") || (n += "/");
  let u = Sa(s, n, Fn(s.locale));
  return r && s.fallbackLocale.value && (u = u.catch((l) => Sa(s, n, Fn(s.fallbackLocale))).catch((l) => {
    throw Error(
      `Could not load locale ${s.locale.value} nor its fallback ${s.fallbackLocale.value} (path: ${n}). Error: ${l}`
    );
  })), u;
}
async function Sa(n, r, s) {
  const u = s.replace(/[_-](\w+)/, "");
  if (r = `${r}locales/${u}.json`, cc.has(r))
    return;
  cc.add(r);
  const l = await fetch(r).then((f) => f.json());
  n.messages.value[s] = {
    ...n.messages.value[s],
    ...l
  };
}
const hc = {
  model: (n) => `models.${n.entity}`,
  field: (n) => `fields.${n}`
};
function HE({ App: n = null, el: r = "#app", onLoad: s = !0, ...u } = {}) {
  function l() {
    const f = EE(n, u), d = r ? f.mount(r) : null;
    return document.body.classList.remove("loading"), { app: f, el: r, vm: d };
  }
  return new Promise((f) => {
    if (s)
      return window.addEventListener(
        "load",
        () => f(l())
      );
    f(l());
  });
}
function EE(n, { props: r = {}, vuetify: s = {}, plugins: u = null } = {}) {
  return n = sv(n, r), n.config.globalProperties.window = window, n.use(bE(s)), n.use(Gi), yE(), u && u.forEach((l) => n.use(l)), n;
}
function bE({ components: n = {}, defaults: r = {}, ...s }) {
  return s.components = {
    ...ov,
    ...n
  }, Sc({
    blueprint: d1,
    theme: {
      themes: {
        light: {
          dark: !1,
          colors: {
            primary: Ol.green.darken1,
            secondary: Ol.green.lighten4
          }
        }
      }
    },
    defaults: {
      ...r,
      VTextField: { variant: "underlined" },
      VSelect: { variant: "underlined" },
      VTextarea: { variant: "underlined" },
      VCombobox: { variant: "underlined" },
      VAutocomplete: { variant: "underlined" }
    },
    ...s
  });
}
function YE({ axiosConfig: n = null, baseURL: r = null } = {}) {
  r || (r = document.body.dataset.apiUrl);
  const s = J0(), u = Q0({
    plugins: [
      Tv({
        axios: uv,
        ...n || Oa.axiosConfig,
        baseURL: r
      })
    ]
  });
  return z0(s), s.use(u);
}
class Ur {
  /**
  * @param {Repos} [repos] all models repositories
  * @param {Repository<M>} [repo] the main repository
  */
  constructor(r, s = null) {
    this.repo = r, this.repos = s;
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
  async fetch({ url: r, ids: s = null, repo: u = null, lookup: l = "id__in", params: f = void 0, relations: d = null, ...y } = {}) {
    var A, W;
    u ?? (u = this.repo), r || (r = (W = (A = u.use) == null ? void 0 : A.meta) == null ? void 0 : W.url), s && l !== void 0 && (f = { ...f || {} }, f[l] = [...s]);
    const E = await u.api().get(r, { ...y, params: f });
    return d && (E.relations = await this.relations(E.entities, d, { ...y, params: {} })), E;
  }
  /**
   * Fetch all items from api.
   *
   * @param [options.nextKey] response object key to get next url
   * @param [options.limit] max count of consecutive requests
   * @return Response of the first request, whoses ``entities`` has \
   * model instances of all requests.
   */
  async all({ nextKey: r = "next", limit: s = -1, ...u } = {}) {
    const l = await this.fetch(u);
    let f = l.response.data[r];
    for (; f; ) {
      const d = await this.fetch({ ...u, url: f });
      if (d.entities && (l.entities = l.entities !== null ? l.entities.concat(d.entities) : d.entities), f = d.response.data[r], s > 0 && s--, !s) break;
    }
    return l;
  }
  /**
   * Fetch related objects for the provided list and field names.
   *
   * @param objs - the objects to get related ids from.
   * @param options.fields - list of field names.
   * @param options.opts - options to pass down to {@link Quey.relation}.
   * @return the resulting entities.
   */
  async relations(r, s, u = {}) {
    var d;
    this._ensureRepos("relations");
    const l = {}, f = (d = this.repo.use) == null ? void 0 : d.fields();
    if (f)
      for (const y of s) {
        const E = f[y];
        if (E instanceof dc)
          l[y] = await this.relation(r, E, u);
        else
          throw Error(`Field ${y} is not a relation`);
      }
    return l;
  }
  _ensureRepos(r) {
    if (!this.repos)
      throw Error(`Query.repos is not provided although it is mandatory to call ${r}.`);
  }
  /**
   * Fetch related objects for the provided object list and field name.
   * It uses {@link Query.all} in order to fetch all items.
   *
   * @param objs - the objects to get ids from.
   * @param relation - objects' field or field name.
   * @param options - options to pass down to `all()`.
   */
  async relation(r, s, u = {}) {
    this._ensureRepos("relations");
    const l = wc(this.repo, s);
    if (!l)
      throw Error(`No Relation found for field ${s}.`);
    const f = l.related.constructor.entity, d = this.repos[f];
    if (!d)
      throw Error(`No repository "${f}" found.`);
    const y = Lc(l);
    if (!y)
      throw Error(`No source ids attributes for ${s}.`);
    const E = _c(r, y);
    return new Ur(d, this.repos).all({ ...u, ids: E, repo: d });
  }
}
function GE(n, r) {
  if (typeof n == "string") {
    if (!(n in r))
      throw Error(`Repository "${n}" is not present in provided repositories.`);
    return new Ur(r[n], r);
  }
  return new Ur(n, r);
}
var Dr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, $i = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
$i.exports;
(function(n, r) {
  (function() {
    var s, u = "4.17.21", l = 200, f = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", d = "Expected a function", y = "Invalid `variable` option passed into `_.template`", E = "__lodash_hash_undefined__", A = 500, W = "__lodash_placeholder__", x = 1, R = 2, Y = 4, q = 1, G = 2, B = 1, w = 2, P = 4, M = 8, S = 16, U = 32, H = 64, F = 128, le = 256, _e = 512, Be = 30, st = "...", Oe = 800, nn = 16, Wn = 1, ur = 2, or = 3, rn = 1 / 0, Dt = 9007199254740991, Tt = 17976931348623157e292, Bt = NaN, He = 4294967295, lr = He - 1, cr = He >>> 1, fr = [
      ["ary", F],
      ["bind", B],
      ["bindKey", w],
      ["curry", M],
      ["curryRight", S],
      ["flip", _e],
      ["partial", U],
      ["partialRight", H],
      ["rearg", le]
    ], Ht = "[object Arguments]", sn = "[object Array]", hr = "[object AsyncFunction]", Nt = "[object Boolean]", Yt = "[object Date]", dr = "[object DOMException]", an = "[object Error]", un = "[object Function]", on = "[object GeneratorFunction]", Ne = "[object Map]", dt = "[object Number]", In = "[object Null]", at = "[object Object]", m = "[object Promise]", p = "[object Proxy]", D = "[object RegExp]", K = "[object Set]", me = "[object String]", ee = "[object Symbol]", T = "[object Undefined]", k = "[object WeakMap]", he = "[object WeakSet]", pe = "[object ArrayBuffer]", Je = "[object DataView]", ln = "[object Float32Array]", xt = "[object Float64Array]", gr = "[object Int8Array]", Br = "[object Int16Array]", Vi = "[object Int32Array]", Ki = "[object Uint8Array]", qi = "[object Uint8ClampedArray]", Xi = "[object Uint16Array]", Zi = "[object Uint32Array]", nf = /\b__p \+= '';/g, rf = /\b(__p \+=) '' \+/g, sf = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Ba = /&(?:amp|lt|gt|quot|#39);/g, Ha = /[&<>"']/g, af = RegExp(Ba.source), uf = RegExp(Ha.source), of = /<%-([\s\S]+?)%>/g, lf = /<%([\s\S]+?)%>/g, Ya = /<%=([\s\S]+?)%>/g, cf = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, ff = /^\w*$/, hf = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Ji = /[\\^$.*+?()[\]{}|]/g, df = RegExp(Ji.source), Qi = /^\s+/, gf = /\s/, _f = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, mf = /\{\n\/\* \[wrapped with (.+)\] \*/, pf = /,? & /, vf = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, yf = /[()=,{}\[\]\/\s]/, Ef = /\\(\\)?/g, bf = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Ga = /\w*$/, wf = /^[-+]0x[0-9a-f]+$/i, Lf = /^0b[01]+$/i, Tf = /^\[object .+?Constructor\]$/, If = /^0o[0-7]+$/i, Af = /^(?:0|[1-9]\d*)$/, Sf = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Hr = /($^)/, Of = /['\n\r\u2028\u2029\\]/g, Yr = "\\ud800-\\udfff", Cf = "\\u0300-\\u036f", Rf = "\\ufe20-\\ufe2f", Df = "\\u20d0-\\u20ff", Va = Cf + Rf + Df, Ka = "\\u2700-\\u27bf", qa = "a-z\\xdf-\\xf6\\xf8-\\xff", Nf = "\\xac\\xb1\\xd7\\xf7", xf = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", Pf = "\\u2000-\\u206f", Mf = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Xa = "A-Z\\xc0-\\xd6\\xd8-\\xde", Za = "\\ufe0e\\ufe0f", Ja = Nf + xf + Pf + Mf, zi = "['’]", Ff = "[" + Yr + "]", Qa = "[" + Ja + "]", Gr = "[" + Va + "]", za = "\\d+", kf = "[" + Ka + "]", ja = "[" + qa + "]", eu = "[^" + Yr + Ja + za + Ka + qa + Xa + "]", ji = "\\ud83c[\\udffb-\\udfff]", Wf = "(?:" + Gr + "|" + ji + ")", tu = "[^" + Yr + "]", es = "(?:\\ud83c[\\udde6-\\uddff]){2}", ts = "[\\ud800-\\udbff][\\udc00-\\udfff]", Un = "[" + Xa + "]", nu = "\\u200d", ru = "(?:" + ja + "|" + eu + ")", Uf = "(?:" + Un + "|" + eu + ")", iu = "(?:" + zi + "(?:d|ll|m|re|s|t|ve))?", su = "(?:" + zi + "(?:D|LL|M|RE|S|T|VE))?", au = Wf + "?", uu = "[" + Za + "]?", $f = "(?:" + nu + "(?:" + [tu, es, ts].join("|") + ")" + uu + au + ")*", Bf = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Hf = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", ou = uu + au + $f, Yf = "(?:" + [kf, es, ts].join("|") + ")" + ou, Gf = "(?:" + [tu + Gr + "?", Gr, es, ts, Ff].join("|") + ")", Vf = RegExp(zi, "g"), Kf = RegExp(Gr, "g"), ns = RegExp(ji + "(?=" + ji + ")|" + Gf + ou, "g"), qf = RegExp([
      Un + "?" + ja + "+" + iu + "(?=" + [Qa, Un, "$"].join("|") + ")",
      Uf + "+" + su + "(?=" + [Qa, Un + ru, "$"].join("|") + ")",
      Un + "?" + ru + "+" + iu,
      Un + "+" + su,
      Hf,
      Bf,
      za,
      Yf
    ].join("|"), "g"), Xf = RegExp("[" + nu + Yr + Va + Za + "]"), Zf = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, Jf = [
      "Array",
      "Buffer",
      "DataView",
      "Date",
      "Error",
      "Float32Array",
      "Float64Array",
      "Function",
      "Int8Array",
      "Int16Array",
      "Int32Array",
      "Map",
      "Math",
      "Object",
      "Promise",
      "RegExp",
      "Set",
      "String",
      "Symbol",
      "TypeError",
      "Uint8Array",
      "Uint8ClampedArray",
      "Uint16Array",
      "Uint32Array",
      "WeakMap",
      "_",
      "clearTimeout",
      "isFinite",
      "parseInt",
      "setTimeout"
    ], Qf = -1, be = {};
    be[ln] = be[xt] = be[gr] = be[Br] = be[Vi] = be[Ki] = be[qi] = be[Xi] = be[Zi] = !0, be[Ht] = be[sn] = be[pe] = be[Nt] = be[Je] = be[Yt] = be[an] = be[un] = be[Ne] = be[dt] = be[at] = be[D] = be[K] = be[me] = be[k] = !1;
    var ye = {};
    ye[Ht] = ye[sn] = ye[pe] = ye[Je] = ye[Nt] = ye[Yt] = ye[ln] = ye[xt] = ye[gr] = ye[Br] = ye[Vi] = ye[Ne] = ye[dt] = ye[at] = ye[D] = ye[K] = ye[me] = ye[ee] = ye[Ki] = ye[qi] = ye[Xi] = ye[Zi] = !0, ye[an] = ye[un] = ye[k] = !1;
    var zf = {
      // Latin-1 Supplement block.
      À: "A",
      Á: "A",
      Â: "A",
      Ã: "A",
      Ä: "A",
      Å: "A",
      à: "a",
      á: "a",
      â: "a",
      ã: "a",
      ä: "a",
      å: "a",
      Ç: "C",
      ç: "c",
      Ð: "D",
      ð: "d",
      È: "E",
      É: "E",
      Ê: "E",
      Ë: "E",
      è: "e",
      é: "e",
      ê: "e",
      ë: "e",
      Ì: "I",
      Í: "I",
      Î: "I",
      Ï: "I",
      ì: "i",
      í: "i",
      î: "i",
      ï: "i",
      Ñ: "N",
      ñ: "n",
      Ò: "O",
      Ó: "O",
      Ô: "O",
      Õ: "O",
      Ö: "O",
      Ø: "O",
      ò: "o",
      ó: "o",
      ô: "o",
      õ: "o",
      ö: "o",
      ø: "o",
      Ù: "U",
      Ú: "U",
      Û: "U",
      Ü: "U",
      ù: "u",
      ú: "u",
      û: "u",
      ü: "u",
      Ý: "Y",
      ý: "y",
      ÿ: "y",
      Æ: "Ae",
      æ: "ae",
      Þ: "Th",
      þ: "th",
      ß: "ss",
      // Latin Extended-A block.
      Ā: "A",
      Ă: "A",
      Ą: "A",
      ā: "a",
      ă: "a",
      ą: "a",
      Ć: "C",
      Ĉ: "C",
      Ċ: "C",
      Č: "C",
      ć: "c",
      ĉ: "c",
      ċ: "c",
      č: "c",
      Ď: "D",
      Đ: "D",
      ď: "d",
      đ: "d",
      Ē: "E",
      Ĕ: "E",
      Ė: "E",
      Ę: "E",
      Ě: "E",
      ē: "e",
      ĕ: "e",
      ė: "e",
      ę: "e",
      ě: "e",
      Ĝ: "G",
      Ğ: "G",
      Ġ: "G",
      Ģ: "G",
      ĝ: "g",
      ğ: "g",
      ġ: "g",
      ģ: "g",
      Ĥ: "H",
      Ħ: "H",
      ĥ: "h",
      ħ: "h",
      Ĩ: "I",
      Ī: "I",
      Ĭ: "I",
      Į: "I",
      İ: "I",
      ĩ: "i",
      ī: "i",
      ĭ: "i",
      į: "i",
      ı: "i",
      Ĵ: "J",
      ĵ: "j",
      Ķ: "K",
      ķ: "k",
      ĸ: "k",
      Ĺ: "L",
      Ļ: "L",
      Ľ: "L",
      Ŀ: "L",
      Ł: "L",
      ĺ: "l",
      ļ: "l",
      ľ: "l",
      ŀ: "l",
      ł: "l",
      Ń: "N",
      Ņ: "N",
      Ň: "N",
      Ŋ: "N",
      ń: "n",
      ņ: "n",
      ň: "n",
      ŋ: "n",
      Ō: "O",
      Ŏ: "O",
      Ő: "O",
      ō: "o",
      ŏ: "o",
      ő: "o",
      Ŕ: "R",
      Ŗ: "R",
      Ř: "R",
      ŕ: "r",
      ŗ: "r",
      ř: "r",
      Ś: "S",
      Ŝ: "S",
      Ş: "S",
      Š: "S",
      ś: "s",
      ŝ: "s",
      ş: "s",
      š: "s",
      Ţ: "T",
      Ť: "T",
      Ŧ: "T",
      ţ: "t",
      ť: "t",
      ŧ: "t",
      Ũ: "U",
      Ū: "U",
      Ŭ: "U",
      Ů: "U",
      Ű: "U",
      Ų: "U",
      ũ: "u",
      ū: "u",
      ŭ: "u",
      ů: "u",
      ű: "u",
      ų: "u",
      Ŵ: "W",
      ŵ: "w",
      Ŷ: "Y",
      ŷ: "y",
      Ÿ: "Y",
      Ź: "Z",
      Ż: "Z",
      Ž: "Z",
      ź: "z",
      ż: "z",
      ž: "z",
      Ĳ: "IJ",
      ĳ: "ij",
      Œ: "Oe",
      œ: "oe",
      ŉ: "'n",
      ſ: "s"
    }, jf = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }, eh = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    }, th = {
      "\\": "\\",
      "'": "'",
      "\n": "n",
      "\r": "r",
      "\u2028": "u2028",
      "\u2029": "u2029"
    }, nh = parseFloat, rh = parseInt, lu = typeof Dr == "object" && Dr && Dr.Object === Object && Dr, ih = typeof self == "object" && self && self.Object === Object && self, Me = lu || ih || Function("return this")(), rs = r && !r.nodeType && r, An = rs && !0 && n && !n.nodeType && n, cu = An && An.exports === rs, is = cu && lu.process, gt = function() {
      try {
        var v = An && An.require && An.require("util").types;
        return v || is && is.binding && is.binding("util");
      } catch {
      }
    }(), fu = gt && gt.isArrayBuffer, hu = gt && gt.isDate, du = gt && gt.isMap, gu = gt && gt.isRegExp, _u = gt && gt.isSet, mu = gt && gt.isTypedArray;
    function ut(v, I, L) {
      switch (L.length) {
        case 0:
          return v.call(I);
        case 1:
          return v.call(I, L[0]);
        case 2:
          return v.call(I, L[0], L[1]);
        case 3:
          return v.call(I, L[0], L[1], L[2]);
      }
      return v.apply(I, L);
    }
    function sh(v, I, L, V) {
      for (var z = -1, ce = v == null ? 0 : v.length; ++z < ce; ) {
        var Ce = v[z];
        I(V, Ce, L(Ce), v);
      }
      return V;
    }
    function _t(v, I) {
      for (var L = -1, V = v == null ? 0 : v.length; ++L < V && I(v[L], L, v) !== !1; )
        ;
      return v;
    }
    function ah(v, I) {
      for (var L = v == null ? 0 : v.length; L-- && I(v[L], L, v) !== !1; )
        ;
      return v;
    }
    function pu(v, I) {
      for (var L = -1, V = v == null ? 0 : v.length; ++L < V; )
        if (!I(v[L], L, v))
          return !1;
      return !0;
    }
    function cn(v, I) {
      for (var L = -1, V = v == null ? 0 : v.length, z = 0, ce = []; ++L < V; ) {
        var Ce = v[L];
        I(Ce, L, v) && (ce[z++] = Ce);
      }
      return ce;
    }
    function Vr(v, I) {
      var L = v == null ? 0 : v.length;
      return !!L && $n(v, I, 0) > -1;
    }
    function ss(v, I, L) {
      for (var V = -1, z = v == null ? 0 : v.length; ++V < z; )
        if (L(I, v[V]))
          return !0;
      return !1;
    }
    function we(v, I) {
      for (var L = -1, V = v == null ? 0 : v.length, z = Array(V); ++L < V; )
        z[L] = I(v[L], L, v);
      return z;
    }
    function fn(v, I) {
      for (var L = -1, V = I.length, z = v.length; ++L < V; )
        v[z + L] = I[L];
      return v;
    }
    function as(v, I, L, V) {
      var z = -1, ce = v == null ? 0 : v.length;
      for (V && ce && (L = v[++z]); ++z < ce; )
        L = I(L, v[z], z, v);
      return L;
    }
    function uh(v, I, L, V) {
      var z = v == null ? 0 : v.length;
      for (V && z && (L = v[--z]); z--; )
        L = I(L, v[z], z, v);
      return L;
    }
    function us(v, I) {
      for (var L = -1, V = v == null ? 0 : v.length; ++L < V; )
        if (I(v[L], L, v))
          return !0;
      return !1;
    }
    var oh = os("length");
    function lh(v) {
      return v.split("");
    }
    function ch(v) {
      return v.match(vf) || [];
    }
    function vu(v, I, L) {
      var V;
      return L(v, function(z, ce, Ce) {
        if (I(z, ce, Ce))
          return V = ce, !1;
      }), V;
    }
    function Kr(v, I, L, V) {
      for (var z = v.length, ce = L + (V ? 1 : -1); V ? ce-- : ++ce < z; )
        if (I(v[ce], ce, v))
          return ce;
      return -1;
    }
    function $n(v, I, L) {
      return I === I ? wh(v, I, L) : Kr(v, yu, L);
    }
    function fh(v, I, L, V) {
      for (var z = L - 1, ce = v.length; ++z < ce; )
        if (V(v[z], I))
          return z;
      return -1;
    }
    function yu(v) {
      return v !== v;
    }
    function Eu(v, I) {
      var L = v == null ? 0 : v.length;
      return L ? cs(v, I) / L : Bt;
    }
    function os(v) {
      return function(I) {
        return I == null ? s : I[v];
      };
    }
    function ls(v) {
      return function(I) {
        return v == null ? s : v[I];
      };
    }
    function bu(v, I, L, V, z) {
      return z(v, function(ce, Ce, ve) {
        L = V ? (V = !1, ce) : I(L, ce, Ce, ve);
      }), L;
    }
    function hh(v, I) {
      var L = v.length;
      for (v.sort(I); L--; )
        v[L] = v[L].value;
      return v;
    }
    function cs(v, I) {
      for (var L, V = -1, z = v.length; ++V < z; ) {
        var ce = I(v[V]);
        ce !== s && (L = L === s ? ce : L + ce);
      }
      return L;
    }
    function fs(v, I) {
      for (var L = -1, V = Array(v); ++L < v; )
        V[L] = I(L);
      return V;
    }
    function dh(v, I) {
      return we(I, function(L) {
        return [L, v[L]];
      });
    }
    function wu(v) {
      return v && v.slice(0, Au(v) + 1).replace(Qi, "");
    }
    function ot(v) {
      return function(I) {
        return v(I);
      };
    }
    function hs(v, I) {
      return we(I, function(L) {
        return v[L];
      });
    }
    function _r(v, I) {
      return v.has(I);
    }
    function Lu(v, I) {
      for (var L = -1, V = v.length; ++L < V && $n(I, v[L], 0) > -1; )
        ;
      return L;
    }
    function Tu(v, I) {
      for (var L = v.length; L-- && $n(I, v[L], 0) > -1; )
        ;
      return L;
    }
    function gh(v, I) {
      for (var L = v.length, V = 0; L--; )
        v[L] === I && ++V;
      return V;
    }
    var _h = ls(zf), mh = ls(jf);
    function ph(v) {
      return "\\" + th[v];
    }
    function vh(v, I) {
      return v == null ? s : v[I];
    }
    function Bn(v) {
      return Xf.test(v);
    }
    function yh(v) {
      return Zf.test(v);
    }
    function Eh(v) {
      for (var I, L = []; !(I = v.next()).done; )
        L.push(I.value);
      return L;
    }
    function ds(v) {
      var I = -1, L = Array(v.size);
      return v.forEach(function(V, z) {
        L[++I] = [z, V];
      }), L;
    }
    function Iu(v, I) {
      return function(L) {
        return v(I(L));
      };
    }
    function hn(v, I) {
      for (var L = -1, V = v.length, z = 0, ce = []; ++L < V; ) {
        var Ce = v[L];
        (Ce === I || Ce === W) && (v[L] = W, ce[z++] = L);
      }
      return ce;
    }
    function qr(v) {
      var I = -1, L = Array(v.size);
      return v.forEach(function(V) {
        L[++I] = V;
      }), L;
    }
    function bh(v) {
      var I = -1, L = Array(v.size);
      return v.forEach(function(V) {
        L[++I] = [V, V];
      }), L;
    }
    function wh(v, I, L) {
      for (var V = L - 1, z = v.length; ++V < z; )
        if (v[V] === I)
          return V;
      return -1;
    }
    function Lh(v, I, L) {
      for (var V = L + 1; V--; )
        if (v[V] === I)
          return V;
      return V;
    }
    function Hn(v) {
      return Bn(v) ? Ih(v) : oh(v);
    }
    function It(v) {
      return Bn(v) ? Ah(v) : lh(v);
    }
    function Au(v) {
      for (var I = v.length; I-- && gf.test(v.charAt(I)); )
        ;
      return I;
    }
    var Th = ls(eh);
    function Ih(v) {
      for (var I = ns.lastIndex = 0; ns.test(v); )
        ++I;
      return I;
    }
    function Ah(v) {
      return v.match(ns) || [];
    }
    function Sh(v) {
      return v.match(qf) || [];
    }
    var Oh = function v(I) {
      I = I == null ? Me : Yn.defaults(Me.Object(), I, Yn.pick(Me, Jf));
      var L = I.Array, V = I.Date, z = I.Error, ce = I.Function, Ce = I.Math, ve = I.Object, gs = I.RegExp, Ch = I.String, mt = I.TypeError, Xr = L.prototype, Rh = ce.prototype, Gn = ve.prototype, Zr = I["__core-js_shared__"], Jr = Rh.toString, de = Gn.hasOwnProperty, Dh = 0, Su = function() {
        var e = /[^.]+$/.exec(Zr && Zr.keys && Zr.keys.IE_PROTO || "");
        return e ? "Symbol(src)_1." + e : "";
      }(), Qr = Gn.toString, Nh = Jr.call(ve), xh = Me._, Ph = gs(
        "^" + Jr.call(de).replace(Ji, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      ), zr = cu ? I.Buffer : s, dn = I.Symbol, jr = I.Uint8Array, Ou = zr ? zr.allocUnsafe : s, ei = Iu(ve.getPrototypeOf, ve), Cu = ve.create, Ru = Gn.propertyIsEnumerable, ti = Xr.splice, Du = dn ? dn.isConcatSpreadable : s, mr = dn ? dn.iterator : s, Sn = dn ? dn.toStringTag : s, ni = function() {
        try {
          var e = Nn(ve, "defineProperty");
          return e({}, "", {}), e;
        } catch {
        }
      }(), Mh = I.clearTimeout !== Me.clearTimeout && I.clearTimeout, Fh = V && V.now !== Me.Date.now && V.now, kh = I.setTimeout !== Me.setTimeout && I.setTimeout, ri = Ce.ceil, ii = Ce.floor, _s = ve.getOwnPropertySymbols, Wh = zr ? zr.isBuffer : s, Nu = I.isFinite, Uh = Xr.join, $h = Iu(ve.keys, ve), Re = Ce.max, We = Ce.min, Bh = V.now, Hh = I.parseInt, xu = Ce.random, Yh = Xr.reverse, ms = Nn(I, "DataView"), pr = Nn(I, "Map"), ps = Nn(I, "Promise"), Vn = Nn(I, "Set"), vr = Nn(I, "WeakMap"), yr = Nn(ve, "create"), si = vr && new vr(), Kn = {}, Gh = xn(ms), Vh = xn(pr), Kh = xn(ps), qh = xn(Vn), Xh = xn(vr), ai = dn ? dn.prototype : s, Er = ai ? ai.valueOf : s, Pu = ai ? ai.toString : s;
      function c(e) {
        if (Ie(e) && !te(e) && !(e instanceof ae)) {
          if (e instanceof pt)
            return e;
          if (de.call(e, "__wrapped__"))
            return Fo(e);
        }
        return new pt(e);
      }
      var qn = /* @__PURE__ */ function() {
        function e() {
        }
        return function(t) {
          if (!Te(t))
            return {};
          if (Cu)
            return Cu(t);
          e.prototype = t;
          var i = new e();
          return e.prototype = s, i;
        };
      }();
      function ui() {
      }
      function pt(e, t) {
        this.__wrapped__ = e, this.__actions__ = [], this.__chain__ = !!t, this.__index__ = 0, this.__values__ = s;
      }
      c.templateSettings = {
        /**
         * Used to detect `data` property values to be HTML-escaped.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        escape: of,
        /**
         * Used to detect code to be evaluated.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        evaluate: lf,
        /**
         * Used to detect `data` property values to inject.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        interpolate: Ya,
        /**
         * Used to reference the data object in the template text.
         *
         * @memberOf _.templateSettings
         * @type {string}
         */
        variable: "",
        /**
         * Used to import variables into the compiled template.
         *
         * @memberOf _.templateSettings
         * @type {Object}
         */
        imports: {
          /**
           * A reference to the `lodash` function.
           *
           * @memberOf _.templateSettings.imports
           * @type {Function}
           */
          _: c
        }
      }, c.prototype = ui.prototype, c.prototype.constructor = c, pt.prototype = qn(ui.prototype), pt.prototype.constructor = pt;
      function ae(e) {
        this.__wrapped__ = e, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = He, this.__views__ = [];
      }
      function Zh() {
        var e = new ae(this.__wrapped__);
        return e.__actions__ = Qe(this.__actions__), e.__dir__ = this.__dir__, e.__filtered__ = this.__filtered__, e.__iteratees__ = Qe(this.__iteratees__), e.__takeCount__ = this.__takeCount__, e.__views__ = Qe(this.__views__), e;
      }
      function Jh() {
        if (this.__filtered__) {
          var e = new ae(this);
          e.__dir__ = -1, e.__filtered__ = !0;
        } else
          e = this.clone(), e.__dir__ *= -1;
        return e;
      }
      function Qh() {
        var e = this.__wrapped__.value(), t = this.__dir__, i = te(e), a = t < 0, o = i ? e.length : 0, h = lg(0, o, this.__views__), g = h.start, _ = h.end, b = _ - g, O = a ? _ : g - 1, C = this.__iteratees__, N = C.length, $ = 0, X = We(b, this.__takeCount__);
        if (!i || !a && o == b && X == b)
          return io(e, this.__actions__);
        var J = [];
        e:
          for (; b-- && $ < X; ) {
            O += t;
            for (var re = -1, Q = e[O]; ++re < N; ) {
              var se = C[re], ue = se.iteratee, ft = se.type, Ve = ue(Q);
              if (ft == ur)
                Q = Ve;
              else if (!Ve) {
                if (ft == Wn)
                  continue e;
                break e;
              }
            }
            J[$++] = Q;
          }
        return J;
      }
      ae.prototype = qn(ui.prototype), ae.prototype.constructor = ae;
      function On(e) {
        var t = -1, i = e == null ? 0 : e.length;
        for (this.clear(); ++t < i; ) {
          var a = e[t];
          this.set(a[0], a[1]);
        }
      }
      function zh() {
        this.__data__ = yr ? yr(null) : {}, this.size = 0;
      }
      function jh(e) {
        var t = this.has(e) && delete this.__data__[e];
        return this.size -= t ? 1 : 0, t;
      }
      function ed(e) {
        var t = this.__data__;
        if (yr) {
          var i = t[e];
          return i === E ? s : i;
        }
        return de.call(t, e) ? t[e] : s;
      }
      function td(e) {
        var t = this.__data__;
        return yr ? t[e] !== s : de.call(t, e);
      }
      function nd(e, t) {
        var i = this.__data__;
        return this.size += this.has(e) ? 0 : 1, i[e] = yr && t === s ? E : t, this;
      }
      On.prototype.clear = zh, On.prototype.delete = jh, On.prototype.get = ed, On.prototype.has = td, On.prototype.set = nd;
      function Gt(e) {
        var t = -1, i = e == null ? 0 : e.length;
        for (this.clear(); ++t < i; ) {
          var a = e[t];
          this.set(a[0], a[1]);
        }
      }
      function rd() {
        this.__data__ = [], this.size = 0;
      }
      function id(e) {
        var t = this.__data__, i = oi(t, e);
        if (i < 0)
          return !1;
        var a = t.length - 1;
        return i == a ? t.pop() : ti.call(t, i, 1), --this.size, !0;
      }
      function sd(e) {
        var t = this.__data__, i = oi(t, e);
        return i < 0 ? s : t[i][1];
      }
      function ad(e) {
        return oi(this.__data__, e) > -1;
      }
      function ud(e, t) {
        var i = this.__data__, a = oi(i, e);
        return a < 0 ? (++this.size, i.push([e, t])) : i[a][1] = t, this;
      }
      Gt.prototype.clear = rd, Gt.prototype.delete = id, Gt.prototype.get = sd, Gt.prototype.has = ad, Gt.prototype.set = ud;
      function Vt(e) {
        var t = -1, i = e == null ? 0 : e.length;
        for (this.clear(); ++t < i; ) {
          var a = e[t];
          this.set(a[0], a[1]);
        }
      }
      function od() {
        this.size = 0, this.__data__ = {
          hash: new On(),
          map: new (pr || Gt)(),
          string: new On()
        };
      }
      function ld(e) {
        var t = Ei(this, e).delete(e);
        return this.size -= t ? 1 : 0, t;
      }
      function cd(e) {
        return Ei(this, e).get(e);
      }
      function fd(e) {
        return Ei(this, e).has(e);
      }
      function hd(e, t) {
        var i = Ei(this, e), a = i.size;
        return i.set(e, t), this.size += i.size == a ? 0 : 1, this;
      }
      Vt.prototype.clear = od, Vt.prototype.delete = ld, Vt.prototype.get = cd, Vt.prototype.has = fd, Vt.prototype.set = hd;
      function Cn(e) {
        var t = -1, i = e == null ? 0 : e.length;
        for (this.__data__ = new Vt(); ++t < i; )
          this.add(e[t]);
      }
      function dd(e) {
        return this.__data__.set(e, E), this;
      }
      function gd(e) {
        return this.__data__.has(e);
      }
      Cn.prototype.add = Cn.prototype.push = dd, Cn.prototype.has = gd;
      function At(e) {
        var t = this.__data__ = new Gt(e);
        this.size = t.size;
      }
      function _d() {
        this.__data__ = new Gt(), this.size = 0;
      }
      function md(e) {
        var t = this.__data__, i = t.delete(e);
        return this.size = t.size, i;
      }
      function pd(e) {
        return this.__data__.get(e);
      }
      function vd(e) {
        return this.__data__.has(e);
      }
      function yd(e, t) {
        var i = this.__data__;
        if (i instanceof Gt) {
          var a = i.__data__;
          if (!pr || a.length < l - 1)
            return a.push([e, t]), this.size = ++i.size, this;
          i = this.__data__ = new Vt(a);
        }
        return i.set(e, t), this.size = i.size, this;
      }
      At.prototype.clear = _d, At.prototype.delete = md, At.prototype.get = pd, At.prototype.has = vd, At.prototype.set = yd;
      function Mu(e, t) {
        var i = te(e), a = !i && Pn(e), o = !i && !a && vn(e), h = !i && !a && !o && Qn(e), g = i || a || o || h, _ = g ? fs(e.length, Ch) : [], b = _.length;
        for (var O in e)
          (t || de.call(e, O)) && !(g && // Safari 9 has enumerable `arguments.length` in strict mode.
          (O == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          o && (O == "offset" || O == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          h && (O == "buffer" || O == "byteLength" || O == "byteOffset") || // Skip index properties.
          Zt(O, b))) && _.push(O);
        return _;
      }
      function Fu(e) {
        var t = e.length;
        return t ? e[Os(0, t - 1)] : s;
      }
      function Ed(e, t) {
        return bi(Qe(e), Rn(t, 0, e.length));
      }
      function bd(e) {
        return bi(Qe(e));
      }
      function vs(e, t, i) {
        (i !== s && !St(e[t], i) || i === s && !(t in e)) && Kt(e, t, i);
      }
      function br(e, t, i) {
        var a = e[t];
        (!(de.call(e, t) && St(a, i)) || i === s && !(t in e)) && Kt(e, t, i);
      }
      function oi(e, t) {
        for (var i = e.length; i--; )
          if (St(e[i][0], t))
            return i;
        return -1;
      }
      function wd(e, t, i, a) {
        return gn(e, function(o, h, g) {
          t(a, o, i(o), g);
        }), a;
      }
      function ku(e, t) {
        return e && Mt(t, xe(t), e);
      }
      function Ld(e, t) {
        return e && Mt(t, je(t), e);
      }
      function Kt(e, t, i) {
        t == "__proto__" && ni ? ni(e, t, {
          configurable: !0,
          enumerable: !0,
          value: i,
          writable: !0
        }) : e[t] = i;
      }
      function ys(e, t) {
        for (var i = -1, a = t.length, o = L(a), h = e == null; ++i < a; )
          o[i] = h ? s : js(e, t[i]);
        return o;
      }
      function Rn(e, t, i) {
        return e === e && (i !== s && (e = e <= i ? e : i), t !== s && (e = e >= t ? e : t)), e;
      }
      function vt(e, t, i, a, o, h) {
        var g, _ = t & x, b = t & R, O = t & Y;
        if (i && (g = o ? i(e, a, o, h) : i(e)), g !== s)
          return g;
        if (!Te(e))
          return e;
        var C = te(e);
        if (C) {
          if (g = fg(e), !_)
            return Qe(e, g);
        } else {
          var N = Ue(e), $ = N == un || N == on;
          if (vn(e))
            return uo(e, _);
          if (N == at || N == Ht || $ && !o) {
            if (g = b || $ ? {} : So(e), !_)
              return b ? eg(e, Ld(g, e)) : jd(e, ku(g, e));
          } else {
            if (!ye[N])
              return o ? e : {};
            g = hg(e, N, _);
          }
        }
        h || (h = new At());
        var X = h.get(e);
        if (X)
          return X;
        h.set(e, g), nl(e) ? e.forEach(function(Q) {
          g.add(vt(Q, t, i, Q, e, h));
        }) : el(e) && e.forEach(function(Q, se) {
          g.set(se, vt(Q, t, i, se, e, h));
        });
        var J = O ? b ? Us : Ws : b ? je : xe, re = C ? s : J(e);
        return _t(re || e, function(Q, se) {
          re && (se = Q, Q = e[se]), br(g, se, vt(Q, t, i, se, e, h));
        }), g;
      }
      function Td(e) {
        var t = xe(e);
        return function(i) {
          return Wu(i, e, t);
        };
      }
      function Wu(e, t, i) {
        var a = i.length;
        if (e == null)
          return !a;
        for (e = ve(e); a--; ) {
          var o = i[a], h = t[o], g = e[o];
          if (g === s && !(o in e) || !h(g))
            return !1;
        }
        return !0;
      }
      function Uu(e, t, i) {
        if (typeof e != "function")
          throw new mt(d);
        return Or(function() {
          e.apply(s, i);
        }, t);
      }
      function wr(e, t, i, a) {
        var o = -1, h = Vr, g = !0, _ = e.length, b = [], O = t.length;
        if (!_)
          return b;
        i && (t = we(t, ot(i))), a ? (h = ss, g = !1) : t.length >= l && (h = _r, g = !1, t = new Cn(t));
        e:
          for (; ++o < _; ) {
            var C = e[o], N = i == null ? C : i(C);
            if (C = a || C !== 0 ? C : 0, g && N === N) {
              for (var $ = O; $--; )
                if (t[$] === N)
                  continue e;
              b.push(C);
            } else h(t, N, a) || b.push(C);
          }
        return b;
      }
      var gn = ho(Pt), $u = ho(bs, !0);
      function Id(e, t) {
        var i = !0;
        return gn(e, function(a, o, h) {
          return i = !!t(a, o, h), i;
        }), i;
      }
      function li(e, t, i) {
        for (var a = -1, o = e.length; ++a < o; ) {
          var h = e[a], g = t(h);
          if (g != null && (_ === s ? g === g && !ct(g) : i(g, _)))
            var _ = g, b = h;
        }
        return b;
      }
      function Ad(e, t, i, a) {
        var o = e.length;
        for (i = ne(i), i < 0 && (i = -i > o ? 0 : o + i), a = a === s || a > o ? o : ne(a), a < 0 && (a += o), a = i > a ? 0 : il(a); i < a; )
          e[i++] = t;
        return e;
      }
      function Bu(e, t) {
        var i = [];
        return gn(e, function(a, o, h) {
          t(a, o, h) && i.push(a);
        }), i;
      }
      function Fe(e, t, i, a, o) {
        var h = -1, g = e.length;
        for (i || (i = gg), o || (o = []); ++h < g; ) {
          var _ = e[h];
          t > 0 && i(_) ? t > 1 ? Fe(_, t - 1, i, a, o) : fn(o, _) : a || (o[o.length] = _);
        }
        return o;
      }
      var Es = go(), Hu = go(!0);
      function Pt(e, t) {
        return e && Es(e, t, xe);
      }
      function bs(e, t) {
        return e && Hu(e, t, xe);
      }
      function ci(e, t) {
        return cn(t, function(i) {
          return Jt(e[i]);
        });
      }
      function Dn(e, t) {
        t = mn(t, e);
        for (var i = 0, a = t.length; e != null && i < a; )
          e = e[Ft(t[i++])];
        return i && i == a ? e : s;
      }
      function Yu(e, t, i) {
        var a = t(e);
        return te(e) ? a : fn(a, i(e));
      }
      function Ye(e) {
        return e == null ? e === s ? T : In : Sn && Sn in ve(e) ? og(e) : bg(e);
      }
      function ws(e, t) {
        return e > t;
      }
      function Sd(e, t) {
        return e != null && de.call(e, t);
      }
      function Od(e, t) {
        return e != null && t in ve(e);
      }
      function Cd(e, t, i) {
        return e >= We(t, i) && e < Re(t, i);
      }
      function Ls(e, t, i) {
        for (var a = i ? ss : Vr, o = e[0].length, h = e.length, g = h, _ = L(h), b = 1 / 0, O = []; g--; ) {
          var C = e[g];
          g && t && (C = we(C, ot(t))), b = We(C.length, b), _[g] = !i && (t || o >= 120 && C.length >= 120) ? new Cn(g && C) : s;
        }
        C = e[0];
        var N = -1, $ = _[0];
        e:
          for (; ++N < o && O.length < b; ) {
            var X = C[N], J = t ? t(X) : X;
            if (X = i || X !== 0 ? X : 0, !($ ? _r($, J) : a(O, J, i))) {
              for (g = h; --g; ) {
                var re = _[g];
                if (!(re ? _r(re, J) : a(e[g], J, i)))
                  continue e;
              }
              $ && $.push(J), O.push(X);
            }
          }
        return O;
      }
      function Rd(e, t, i, a) {
        return Pt(e, function(o, h, g) {
          t(a, i(o), h, g);
        }), a;
      }
      function Lr(e, t, i) {
        t = mn(t, e), e = Do(e, t);
        var a = e == null ? e : e[Ft(Et(t))];
        return a == null ? s : ut(a, e, i);
      }
      function Gu(e) {
        return Ie(e) && Ye(e) == Ht;
      }
      function Dd(e) {
        return Ie(e) && Ye(e) == pe;
      }
      function Nd(e) {
        return Ie(e) && Ye(e) == Yt;
      }
      function Tr(e, t, i, a, o) {
        return e === t ? !0 : e == null || t == null || !Ie(e) && !Ie(t) ? e !== e && t !== t : xd(e, t, i, a, Tr, o);
      }
      function xd(e, t, i, a, o, h) {
        var g = te(e), _ = te(t), b = g ? sn : Ue(e), O = _ ? sn : Ue(t);
        b = b == Ht ? at : b, O = O == Ht ? at : O;
        var C = b == at, N = O == at, $ = b == O;
        if ($ && vn(e)) {
          if (!vn(t))
            return !1;
          g = !0, C = !1;
        }
        if ($ && !C)
          return h || (h = new At()), g || Qn(e) ? To(e, t, i, a, o, h) : ag(e, t, b, i, a, o, h);
        if (!(i & q)) {
          var X = C && de.call(e, "__wrapped__"), J = N && de.call(t, "__wrapped__");
          if (X || J) {
            var re = X ? e.value() : e, Q = J ? t.value() : t;
            return h || (h = new At()), o(re, Q, i, a, h);
          }
        }
        return $ ? (h || (h = new At()), ug(e, t, i, a, o, h)) : !1;
      }
      function Pd(e) {
        return Ie(e) && Ue(e) == Ne;
      }
      function Ts(e, t, i, a) {
        var o = i.length, h = o, g = !a;
        if (e == null)
          return !h;
        for (e = ve(e); o--; ) {
          var _ = i[o];
          if (g && _[2] ? _[1] !== e[_[0]] : !(_[0] in e))
            return !1;
        }
        for (; ++o < h; ) {
          _ = i[o];
          var b = _[0], O = e[b], C = _[1];
          if (g && _[2]) {
            if (O === s && !(b in e))
              return !1;
          } else {
            var N = new At();
            if (a)
              var $ = a(O, C, b, e, t, N);
            if (!($ === s ? Tr(C, O, q | G, a, N) : $))
              return !1;
          }
        }
        return !0;
      }
      function Vu(e) {
        if (!Te(e) || mg(e))
          return !1;
        var t = Jt(e) ? Ph : Tf;
        return t.test(xn(e));
      }
      function Md(e) {
        return Ie(e) && Ye(e) == D;
      }
      function Fd(e) {
        return Ie(e) && Ue(e) == K;
      }
      function kd(e) {
        return Ie(e) && Si(e.length) && !!be[Ye(e)];
      }
      function Ku(e) {
        return typeof e == "function" ? e : e == null ? et : typeof e == "object" ? te(e) ? Zu(e[0], e[1]) : Xu(e) : _l(e);
      }
      function Is(e) {
        if (!Sr(e))
          return $h(e);
        var t = [];
        for (var i in ve(e))
          de.call(e, i) && i != "constructor" && t.push(i);
        return t;
      }
      function Wd(e) {
        if (!Te(e))
          return Eg(e);
        var t = Sr(e), i = [];
        for (var a in e)
          a == "constructor" && (t || !de.call(e, a)) || i.push(a);
        return i;
      }
      function As(e, t) {
        return e < t;
      }
      function qu(e, t) {
        var i = -1, a = ze(e) ? L(e.length) : [];
        return gn(e, function(o, h, g) {
          a[++i] = t(o, h, g);
        }), a;
      }
      function Xu(e) {
        var t = Bs(e);
        return t.length == 1 && t[0][2] ? Co(t[0][0], t[0][1]) : function(i) {
          return i === e || Ts(i, e, t);
        };
      }
      function Zu(e, t) {
        return Ys(e) && Oo(t) ? Co(Ft(e), t) : function(i) {
          var a = js(i, e);
          return a === s && a === t ? ea(i, e) : Tr(t, a, q | G);
        };
      }
      function fi(e, t, i, a, o) {
        e !== t && Es(t, function(h, g) {
          if (o || (o = new At()), Te(h))
            Ud(e, t, g, i, fi, a, o);
          else {
            var _ = a ? a(Vs(e, g), h, g + "", e, t, o) : s;
            _ === s && (_ = h), vs(e, g, _);
          }
        }, je);
      }
      function Ud(e, t, i, a, o, h, g) {
        var _ = Vs(e, i), b = Vs(t, i), O = g.get(b);
        if (O) {
          vs(e, i, O);
          return;
        }
        var C = h ? h(_, b, i + "", e, t, g) : s, N = C === s;
        if (N) {
          var $ = te(b), X = !$ && vn(b), J = !$ && !X && Qn(b);
          C = b, $ || X || J ? te(_) ? C = _ : Ae(_) ? C = Qe(_) : X ? (N = !1, C = uo(b, !0)) : J ? (N = !1, C = oo(b, !0)) : C = [] : Cr(b) || Pn(b) ? (C = _, Pn(_) ? C = sl(_) : (!Te(_) || Jt(_)) && (C = So(b))) : N = !1;
        }
        N && (g.set(b, C), o(C, b, a, h, g), g.delete(b)), vs(e, i, C);
      }
      function Ju(e, t) {
        var i = e.length;
        if (i)
          return t += t < 0 ? i : 0, Zt(t, i) ? e[t] : s;
      }
      function Qu(e, t, i) {
        t.length ? t = we(t, function(h) {
          return te(h) ? function(g) {
            return Dn(g, h.length === 1 ? h[0] : h);
          } : h;
        }) : t = [et];
        var a = -1;
        t = we(t, ot(Z()));
        var o = qu(e, function(h, g, _) {
          var b = we(t, function(O) {
            return O(h);
          });
          return { criteria: b, index: ++a, value: h };
        });
        return hh(o, function(h, g) {
          return zd(h, g, i);
        });
      }
      function $d(e, t) {
        return zu(e, t, function(i, a) {
          return ea(e, a);
        });
      }
      function zu(e, t, i) {
        for (var a = -1, o = t.length, h = {}; ++a < o; ) {
          var g = t[a], _ = Dn(e, g);
          i(_, g) && Ir(h, mn(g, e), _);
        }
        return h;
      }
      function Bd(e) {
        return function(t) {
          return Dn(t, e);
        };
      }
      function Ss(e, t, i, a) {
        var o = a ? fh : $n, h = -1, g = t.length, _ = e;
        for (e === t && (t = Qe(t)), i && (_ = we(e, ot(i))); ++h < g; )
          for (var b = 0, O = t[h], C = i ? i(O) : O; (b = o(_, C, b, a)) > -1; )
            _ !== e && ti.call(_, b, 1), ti.call(e, b, 1);
        return e;
      }
      function ju(e, t) {
        for (var i = e ? t.length : 0, a = i - 1; i--; ) {
          var o = t[i];
          if (i == a || o !== h) {
            var h = o;
            Zt(o) ? ti.call(e, o, 1) : Ds(e, o);
          }
        }
        return e;
      }
      function Os(e, t) {
        return e + ii(xu() * (t - e + 1));
      }
      function Hd(e, t, i, a) {
        for (var o = -1, h = Re(ri((t - e) / (i || 1)), 0), g = L(h); h--; )
          g[a ? h : ++o] = e, e += i;
        return g;
      }
      function Cs(e, t) {
        var i = "";
        if (!e || t < 1 || t > Dt)
          return i;
        do
          t % 2 && (i += e), t = ii(t / 2), t && (e += e);
        while (t);
        return i;
      }
      function ie(e, t) {
        return Ks(Ro(e, t, et), e + "");
      }
      function Yd(e) {
        return Fu(zn(e));
      }
      function Gd(e, t) {
        var i = zn(e);
        return bi(i, Rn(t, 0, i.length));
      }
      function Ir(e, t, i, a) {
        if (!Te(e))
          return e;
        t = mn(t, e);
        for (var o = -1, h = t.length, g = h - 1, _ = e; _ != null && ++o < h; ) {
          var b = Ft(t[o]), O = i;
          if (b === "__proto__" || b === "constructor" || b === "prototype")
            return e;
          if (o != g) {
            var C = _[b];
            O = a ? a(C, b, _) : s, O === s && (O = Te(C) ? C : Zt(t[o + 1]) ? [] : {});
          }
          br(_, b, O), _ = _[b];
        }
        return e;
      }
      var eo = si ? function(e, t) {
        return si.set(e, t), e;
      } : et, Vd = ni ? function(e, t) {
        return ni(e, "toString", {
          configurable: !0,
          enumerable: !1,
          value: na(t),
          writable: !0
        });
      } : et;
      function Kd(e) {
        return bi(zn(e));
      }
      function yt(e, t, i) {
        var a = -1, o = e.length;
        t < 0 && (t = -t > o ? 0 : o + t), i = i > o ? o : i, i < 0 && (i += o), o = t > i ? 0 : i - t >>> 0, t >>>= 0;
        for (var h = L(o); ++a < o; )
          h[a] = e[a + t];
        return h;
      }
      function qd(e, t) {
        var i;
        return gn(e, function(a, o, h) {
          return i = t(a, o, h), !i;
        }), !!i;
      }
      function hi(e, t, i) {
        var a = 0, o = e == null ? a : e.length;
        if (typeof t == "number" && t === t && o <= cr) {
          for (; a < o; ) {
            var h = a + o >>> 1, g = e[h];
            g !== null && !ct(g) && (i ? g <= t : g < t) ? a = h + 1 : o = h;
          }
          return o;
        }
        return Rs(e, t, et, i);
      }
      function Rs(e, t, i, a) {
        var o = 0, h = e == null ? 0 : e.length;
        if (h === 0)
          return 0;
        t = i(t);
        for (var g = t !== t, _ = t === null, b = ct(t), O = t === s; o < h; ) {
          var C = ii((o + h) / 2), N = i(e[C]), $ = N !== s, X = N === null, J = N === N, re = ct(N);
          if (g)
            var Q = a || J;
          else O ? Q = J && (a || $) : _ ? Q = J && $ && (a || !X) : b ? Q = J && $ && !X && (a || !re) : X || re ? Q = !1 : Q = a ? N <= t : N < t;
          Q ? o = C + 1 : h = C;
        }
        return We(h, lr);
      }
      function to(e, t) {
        for (var i = -1, a = e.length, o = 0, h = []; ++i < a; ) {
          var g = e[i], _ = t ? t(g) : g;
          if (!i || !St(_, b)) {
            var b = _;
            h[o++] = g === 0 ? 0 : g;
          }
        }
        return h;
      }
      function no(e) {
        return typeof e == "number" ? e : ct(e) ? Bt : +e;
      }
      function lt(e) {
        if (typeof e == "string")
          return e;
        if (te(e))
          return we(e, lt) + "";
        if (ct(e))
          return Pu ? Pu.call(e) : "";
        var t = e + "";
        return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
      }
      function _n(e, t, i) {
        var a = -1, o = Vr, h = e.length, g = !0, _ = [], b = _;
        if (i)
          g = !1, o = ss;
        else if (h >= l) {
          var O = t ? null : ig(e);
          if (O)
            return qr(O);
          g = !1, o = _r, b = new Cn();
        } else
          b = t ? [] : _;
        e:
          for (; ++a < h; ) {
            var C = e[a], N = t ? t(C) : C;
            if (C = i || C !== 0 ? C : 0, g && N === N) {
              for (var $ = b.length; $--; )
                if (b[$] === N)
                  continue e;
              t && b.push(N), _.push(C);
            } else o(b, N, i) || (b !== _ && b.push(N), _.push(C));
          }
        return _;
      }
      function Ds(e, t) {
        return t = mn(t, e), e = Do(e, t), e == null || delete e[Ft(Et(t))];
      }
      function ro(e, t, i, a) {
        return Ir(e, t, i(Dn(e, t)), a);
      }
      function di(e, t, i, a) {
        for (var o = e.length, h = a ? o : -1; (a ? h-- : ++h < o) && t(e[h], h, e); )
          ;
        return i ? yt(e, a ? 0 : h, a ? h + 1 : o) : yt(e, a ? h + 1 : 0, a ? o : h);
      }
      function io(e, t) {
        var i = e;
        return i instanceof ae && (i = i.value()), as(t, function(a, o) {
          return o.func.apply(o.thisArg, fn([a], o.args));
        }, i);
      }
      function Ns(e, t, i) {
        var a = e.length;
        if (a < 2)
          return a ? _n(e[0]) : [];
        for (var o = -1, h = L(a); ++o < a; )
          for (var g = e[o], _ = -1; ++_ < a; )
            _ != o && (h[o] = wr(h[o] || g, e[_], t, i));
        return _n(Fe(h, 1), t, i);
      }
      function so(e, t, i) {
        for (var a = -1, o = e.length, h = t.length, g = {}; ++a < o; ) {
          var _ = a < h ? t[a] : s;
          i(g, e[a], _);
        }
        return g;
      }
      function xs(e) {
        return Ae(e) ? e : [];
      }
      function Ps(e) {
        return typeof e == "function" ? e : et;
      }
      function mn(e, t) {
        return te(e) ? e : Ys(e, t) ? [e] : Mo(fe(e));
      }
      var Xd = ie;
      function pn(e, t, i) {
        var a = e.length;
        return i = i === s ? a : i, !t && i >= a ? e : yt(e, t, i);
      }
      var ao = Mh || function(e) {
        return Me.clearTimeout(e);
      };
      function uo(e, t) {
        if (t)
          return e.slice();
        var i = e.length, a = Ou ? Ou(i) : new e.constructor(i);
        return e.copy(a), a;
      }
      function Ms(e) {
        var t = new e.constructor(e.byteLength);
        return new jr(t).set(new jr(e)), t;
      }
      function Zd(e, t) {
        var i = t ? Ms(e.buffer) : e.buffer;
        return new e.constructor(i, e.byteOffset, e.byteLength);
      }
      function Jd(e) {
        var t = new e.constructor(e.source, Ga.exec(e));
        return t.lastIndex = e.lastIndex, t;
      }
      function Qd(e) {
        return Er ? ve(Er.call(e)) : {};
      }
      function oo(e, t) {
        var i = t ? Ms(e.buffer) : e.buffer;
        return new e.constructor(i, e.byteOffset, e.length);
      }
      function lo(e, t) {
        if (e !== t) {
          var i = e !== s, a = e === null, o = e === e, h = ct(e), g = t !== s, _ = t === null, b = t === t, O = ct(t);
          if (!_ && !O && !h && e > t || h && g && b && !_ && !O || a && g && b || !i && b || !o)
            return 1;
          if (!a && !h && !O && e < t || O && i && o && !a && !h || _ && i && o || !g && o || !b)
            return -1;
        }
        return 0;
      }
      function zd(e, t, i) {
        for (var a = -1, o = e.criteria, h = t.criteria, g = o.length, _ = i.length; ++a < g; ) {
          var b = lo(o[a], h[a]);
          if (b) {
            if (a >= _)
              return b;
            var O = i[a];
            return b * (O == "desc" ? -1 : 1);
          }
        }
        return e.index - t.index;
      }
      function co(e, t, i, a) {
        for (var o = -1, h = e.length, g = i.length, _ = -1, b = t.length, O = Re(h - g, 0), C = L(b + O), N = !a; ++_ < b; )
          C[_] = t[_];
        for (; ++o < g; )
          (N || o < h) && (C[i[o]] = e[o]);
        for (; O--; )
          C[_++] = e[o++];
        return C;
      }
      function fo(e, t, i, a) {
        for (var o = -1, h = e.length, g = -1, _ = i.length, b = -1, O = t.length, C = Re(h - _, 0), N = L(C + O), $ = !a; ++o < C; )
          N[o] = e[o];
        for (var X = o; ++b < O; )
          N[X + b] = t[b];
        for (; ++g < _; )
          ($ || o < h) && (N[X + i[g]] = e[o++]);
        return N;
      }
      function Qe(e, t) {
        var i = -1, a = e.length;
        for (t || (t = L(a)); ++i < a; )
          t[i] = e[i];
        return t;
      }
      function Mt(e, t, i, a) {
        var o = !i;
        i || (i = {});
        for (var h = -1, g = t.length; ++h < g; ) {
          var _ = t[h], b = a ? a(i[_], e[_], _, i, e) : s;
          b === s && (b = e[_]), o ? Kt(i, _, b) : br(i, _, b);
        }
        return i;
      }
      function jd(e, t) {
        return Mt(e, Hs(e), t);
      }
      function eg(e, t) {
        return Mt(e, Io(e), t);
      }
      function gi(e, t) {
        return function(i, a) {
          var o = te(i) ? sh : wd, h = t ? t() : {};
          return o(i, e, Z(a, 2), h);
        };
      }
      function Xn(e) {
        return ie(function(t, i) {
          var a = -1, o = i.length, h = o > 1 ? i[o - 1] : s, g = o > 2 ? i[2] : s;
          for (h = e.length > 3 && typeof h == "function" ? (o--, h) : s, g && Ge(i[0], i[1], g) && (h = o < 3 ? s : h, o = 1), t = ve(t); ++a < o; ) {
            var _ = i[a];
            _ && e(t, _, a, h);
          }
          return t;
        });
      }
      function ho(e, t) {
        return function(i, a) {
          if (i == null)
            return i;
          if (!ze(i))
            return e(i, a);
          for (var o = i.length, h = t ? o : -1, g = ve(i); (t ? h-- : ++h < o) && a(g[h], h, g) !== !1; )
            ;
          return i;
        };
      }
      function go(e) {
        return function(t, i, a) {
          for (var o = -1, h = ve(t), g = a(t), _ = g.length; _--; ) {
            var b = g[e ? _ : ++o];
            if (i(h[b], b, h) === !1)
              break;
          }
          return t;
        };
      }
      function tg(e, t, i) {
        var a = t & B, o = Ar(e);
        function h() {
          var g = this && this !== Me && this instanceof h ? o : e;
          return g.apply(a ? i : this, arguments);
        }
        return h;
      }
      function _o(e) {
        return function(t) {
          t = fe(t);
          var i = Bn(t) ? It(t) : s, a = i ? i[0] : t.charAt(0), o = i ? pn(i, 1).join("") : t.slice(1);
          return a[e]() + o;
        };
      }
      function Zn(e) {
        return function(t) {
          return as(dl(hl(t).replace(Vf, "")), e, "");
        };
      }
      function Ar(e) {
        return function() {
          var t = arguments;
          switch (t.length) {
            case 0:
              return new e();
            case 1:
              return new e(t[0]);
            case 2:
              return new e(t[0], t[1]);
            case 3:
              return new e(t[0], t[1], t[2]);
            case 4:
              return new e(t[0], t[1], t[2], t[3]);
            case 5:
              return new e(t[0], t[1], t[2], t[3], t[4]);
            case 6:
              return new e(t[0], t[1], t[2], t[3], t[4], t[5]);
            case 7:
              return new e(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
          }
          var i = qn(e.prototype), a = e.apply(i, t);
          return Te(a) ? a : i;
        };
      }
      function ng(e, t, i) {
        var a = Ar(e);
        function o() {
          for (var h = arguments.length, g = L(h), _ = h, b = Jn(o); _--; )
            g[_] = arguments[_];
          var O = h < 3 && g[0] !== b && g[h - 1] !== b ? [] : hn(g, b);
          if (h -= O.length, h < i)
            return Eo(
              e,
              t,
              _i,
              o.placeholder,
              s,
              g,
              O,
              s,
              s,
              i - h
            );
          var C = this && this !== Me && this instanceof o ? a : e;
          return ut(C, this, g);
        }
        return o;
      }
      function mo(e) {
        return function(t, i, a) {
          var o = ve(t);
          if (!ze(t)) {
            var h = Z(i, 3);
            t = xe(t), i = function(_) {
              return h(o[_], _, o);
            };
          }
          var g = e(t, i, a);
          return g > -1 ? o[h ? t[g] : g] : s;
        };
      }
      function po(e) {
        return Xt(function(t) {
          var i = t.length, a = i, o = pt.prototype.thru;
          for (e && t.reverse(); a--; ) {
            var h = t[a];
            if (typeof h != "function")
              throw new mt(d);
            if (o && !g && yi(h) == "wrapper")
              var g = new pt([], !0);
          }
          for (a = g ? a : i; ++a < i; ) {
            h = t[a];
            var _ = yi(h), b = _ == "wrapper" ? $s(h) : s;
            b && Gs(b[0]) && b[1] == (F | M | U | le) && !b[4].length && b[9] == 1 ? g = g[yi(b[0])].apply(g, b[3]) : g = h.length == 1 && Gs(h) ? g[_]() : g.thru(h);
          }
          return function() {
            var O = arguments, C = O[0];
            if (g && O.length == 1 && te(C))
              return g.plant(C).value();
            for (var N = 0, $ = i ? t[N].apply(this, O) : C; ++N < i; )
              $ = t[N].call(this, $);
            return $;
          };
        });
      }
      function _i(e, t, i, a, o, h, g, _, b, O) {
        var C = t & F, N = t & B, $ = t & w, X = t & (M | S), J = t & _e, re = $ ? s : Ar(e);
        function Q() {
          for (var se = arguments.length, ue = L(se), ft = se; ft--; )
            ue[ft] = arguments[ft];
          if (X)
            var Ve = Jn(Q), ht = gh(ue, Ve);
          if (a && (ue = co(ue, a, o, X)), h && (ue = fo(ue, h, g, X)), se -= ht, X && se < O) {
            var Se = hn(ue, Ve);
            return Eo(
              e,
              t,
              _i,
              Q.placeholder,
              i,
              ue,
              Se,
              _,
              b,
              O - se
            );
          }
          var Ot = N ? i : this, zt = $ ? Ot[e] : e;
          return se = ue.length, _ ? ue = wg(ue, _) : J && se > 1 && ue.reverse(), C && b < se && (ue.length = b), this && this !== Me && this instanceof Q && (zt = re || Ar(zt)), zt.apply(Ot, ue);
        }
        return Q;
      }
      function vo(e, t) {
        return function(i, a) {
          return Rd(i, e, t(a), {});
        };
      }
      function mi(e, t) {
        return function(i, a) {
          var o;
          if (i === s && a === s)
            return t;
          if (i !== s && (o = i), a !== s) {
            if (o === s)
              return a;
            typeof i == "string" || typeof a == "string" ? (i = lt(i), a = lt(a)) : (i = no(i), a = no(a)), o = e(i, a);
          }
          return o;
        };
      }
      function Fs(e) {
        return Xt(function(t) {
          return t = we(t, ot(Z())), ie(function(i) {
            var a = this;
            return e(t, function(o) {
              return ut(o, a, i);
            });
          });
        });
      }
      function pi(e, t) {
        t = t === s ? " " : lt(t);
        var i = t.length;
        if (i < 2)
          return i ? Cs(t, e) : t;
        var a = Cs(t, ri(e / Hn(t)));
        return Bn(t) ? pn(It(a), 0, e).join("") : a.slice(0, e);
      }
      function rg(e, t, i, a) {
        var o = t & B, h = Ar(e);
        function g() {
          for (var _ = -1, b = arguments.length, O = -1, C = a.length, N = L(C + b), $ = this && this !== Me && this instanceof g ? h : e; ++O < C; )
            N[O] = a[O];
          for (; b--; )
            N[O++] = arguments[++_];
          return ut($, o ? i : this, N);
        }
        return g;
      }
      function yo(e) {
        return function(t, i, a) {
          return a && typeof a != "number" && Ge(t, i, a) && (i = a = s), t = Qt(t), i === s ? (i = t, t = 0) : i = Qt(i), a = a === s ? t < i ? 1 : -1 : Qt(a), Hd(t, i, a, e);
        };
      }
      function vi(e) {
        return function(t, i) {
          return typeof t == "string" && typeof i == "string" || (t = bt(t), i = bt(i)), e(t, i);
        };
      }
      function Eo(e, t, i, a, o, h, g, _, b, O) {
        var C = t & M, N = C ? g : s, $ = C ? s : g, X = C ? h : s, J = C ? s : h;
        t |= C ? U : H, t &= ~(C ? H : U), t & P || (t &= -4);
        var re = [
          e,
          t,
          o,
          X,
          N,
          J,
          $,
          _,
          b,
          O
        ], Q = i.apply(s, re);
        return Gs(e) && No(Q, re), Q.placeholder = a, xo(Q, e, t);
      }
      function ks(e) {
        var t = Ce[e];
        return function(i, a) {
          if (i = bt(i), a = a == null ? 0 : We(ne(a), 292), a && Nu(i)) {
            var o = (fe(i) + "e").split("e"), h = t(o[0] + "e" + (+o[1] + a));
            return o = (fe(h) + "e").split("e"), +(o[0] + "e" + (+o[1] - a));
          }
          return t(i);
        };
      }
      var ig = Vn && 1 / qr(new Vn([, -0]))[1] == rn ? function(e) {
        return new Vn(e);
      } : sa;
      function bo(e) {
        return function(t) {
          var i = Ue(t);
          return i == Ne ? ds(t) : i == K ? bh(t) : dh(t, e(t));
        };
      }
      function qt(e, t, i, a, o, h, g, _) {
        var b = t & w;
        if (!b && typeof e != "function")
          throw new mt(d);
        var O = a ? a.length : 0;
        if (O || (t &= -97, a = o = s), g = g === s ? g : Re(ne(g), 0), _ = _ === s ? _ : ne(_), O -= o ? o.length : 0, t & H) {
          var C = a, N = o;
          a = o = s;
        }
        var $ = b ? s : $s(e), X = [
          e,
          t,
          i,
          a,
          o,
          C,
          N,
          h,
          g,
          _
        ];
        if ($ && yg(X, $), e = X[0], t = X[1], i = X[2], a = X[3], o = X[4], _ = X[9] = X[9] === s ? b ? 0 : e.length : Re(X[9] - O, 0), !_ && t & (M | S) && (t &= -25), !t || t == B)
          var J = tg(e, t, i);
        else t == M || t == S ? J = ng(e, t, _) : (t == U || t == (B | U)) && !o.length ? J = rg(e, t, i, a) : J = _i.apply(s, X);
        var re = $ ? eo : No;
        return xo(re(J, X), e, t);
      }
      function wo(e, t, i, a) {
        return e === s || St(e, Gn[i]) && !de.call(a, i) ? t : e;
      }
      function Lo(e, t, i, a, o, h) {
        return Te(e) && Te(t) && (h.set(t, e), fi(e, t, s, Lo, h), h.delete(t)), e;
      }
      function sg(e) {
        return Cr(e) ? s : e;
      }
      function To(e, t, i, a, o, h) {
        var g = i & q, _ = e.length, b = t.length;
        if (_ != b && !(g && b > _))
          return !1;
        var O = h.get(e), C = h.get(t);
        if (O && C)
          return O == t && C == e;
        var N = -1, $ = !0, X = i & G ? new Cn() : s;
        for (h.set(e, t), h.set(t, e); ++N < _; ) {
          var J = e[N], re = t[N];
          if (a)
            var Q = g ? a(re, J, N, t, e, h) : a(J, re, N, e, t, h);
          if (Q !== s) {
            if (Q)
              continue;
            $ = !1;
            break;
          }
          if (X) {
            if (!us(t, function(se, ue) {
              if (!_r(X, ue) && (J === se || o(J, se, i, a, h)))
                return X.push(ue);
            })) {
              $ = !1;
              break;
            }
          } else if (!(J === re || o(J, re, i, a, h))) {
            $ = !1;
            break;
          }
        }
        return h.delete(e), h.delete(t), $;
      }
      function ag(e, t, i, a, o, h, g) {
        switch (i) {
          case Je:
            if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
              return !1;
            e = e.buffer, t = t.buffer;
          case pe:
            return !(e.byteLength != t.byteLength || !h(new jr(e), new jr(t)));
          case Nt:
          case Yt:
          case dt:
            return St(+e, +t);
          case an:
            return e.name == t.name && e.message == t.message;
          case D:
          case me:
            return e == t + "";
          case Ne:
            var _ = ds;
          case K:
            var b = a & q;
            if (_ || (_ = qr), e.size != t.size && !b)
              return !1;
            var O = g.get(e);
            if (O)
              return O == t;
            a |= G, g.set(e, t);
            var C = To(_(e), _(t), a, o, h, g);
            return g.delete(e), C;
          case ee:
            if (Er)
              return Er.call(e) == Er.call(t);
        }
        return !1;
      }
      function ug(e, t, i, a, o, h) {
        var g = i & q, _ = Ws(e), b = _.length, O = Ws(t), C = O.length;
        if (b != C && !g)
          return !1;
        for (var N = b; N--; ) {
          var $ = _[N];
          if (!(g ? $ in t : de.call(t, $)))
            return !1;
        }
        var X = h.get(e), J = h.get(t);
        if (X && J)
          return X == t && J == e;
        var re = !0;
        h.set(e, t), h.set(t, e);
        for (var Q = g; ++N < b; ) {
          $ = _[N];
          var se = e[$], ue = t[$];
          if (a)
            var ft = g ? a(ue, se, $, t, e, h) : a(se, ue, $, e, t, h);
          if (!(ft === s ? se === ue || o(se, ue, i, a, h) : ft)) {
            re = !1;
            break;
          }
          Q || (Q = $ == "constructor");
        }
        if (re && !Q) {
          var Ve = e.constructor, ht = t.constructor;
          Ve != ht && "constructor" in e && "constructor" in t && !(typeof Ve == "function" && Ve instanceof Ve && typeof ht == "function" && ht instanceof ht) && (re = !1);
        }
        return h.delete(e), h.delete(t), re;
      }
      function Xt(e) {
        return Ks(Ro(e, s, Uo), e + "");
      }
      function Ws(e) {
        return Yu(e, xe, Hs);
      }
      function Us(e) {
        return Yu(e, je, Io);
      }
      var $s = si ? function(e) {
        return si.get(e);
      } : sa;
      function yi(e) {
        for (var t = e.name + "", i = Kn[t], a = de.call(Kn, t) ? i.length : 0; a--; ) {
          var o = i[a], h = o.func;
          if (h == null || h == e)
            return o.name;
        }
        return t;
      }
      function Jn(e) {
        var t = de.call(c, "placeholder") ? c : e;
        return t.placeholder;
      }
      function Z() {
        var e = c.iteratee || ra;
        return e = e === ra ? Ku : e, arguments.length ? e(arguments[0], arguments[1]) : e;
      }
      function Ei(e, t) {
        var i = e.__data__;
        return _g(t) ? i[typeof t == "string" ? "string" : "hash"] : i.map;
      }
      function Bs(e) {
        for (var t = xe(e), i = t.length; i--; ) {
          var a = t[i], o = e[a];
          t[i] = [a, o, Oo(o)];
        }
        return t;
      }
      function Nn(e, t) {
        var i = vh(e, t);
        return Vu(i) ? i : s;
      }
      function og(e) {
        var t = de.call(e, Sn), i = e[Sn];
        try {
          e[Sn] = s;
          var a = !0;
        } catch {
        }
        var o = Qr.call(e);
        return a && (t ? e[Sn] = i : delete e[Sn]), o;
      }
      var Hs = _s ? function(e) {
        return e == null ? [] : (e = ve(e), cn(_s(e), function(t) {
          return Ru.call(e, t);
        }));
      } : aa, Io = _s ? function(e) {
        for (var t = []; e; )
          fn(t, Hs(e)), e = ei(e);
        return t;
      } : aa, Ue = Ye;
      (ms && Ue(new ms(new ArrayBuffer(1))) != Je || pr && Ue(new pr()) != Ne || ps && Ue(ps.resolve()) != m || Vn && Ue(new Vn()) != K || vr && Ue(new vr()) != k) && (Ue = function(e) {
        var t = Ye(e), i = t == at ? e.constructor : s, a = i ? xn(i) : "";
        if (a)
          switch (a) {
            case Gh:
              return Je;
            case Vh:
              return Ne;
            case Kh:
              return m;
            case qh:
              return K;
            case Xh:
              return k;
          }
        return t;
      });
      function lg(e, t, i) {
        for (var a = -1, o = i.length; ++a < o; ) {
          var h = i[a], g = h.size;
          switch (h.type) {
            case "drop":
              e += g;
              break;
            case "dropRight":
              t -= g;
              break;
            case "take":
              t = We(t, e + g);
              break;
            case "takeRight":
              e = Re(e, t - g);
              break;
          }
        }
        return { start: e, end: t };
      }
      function cg(e) {
        var t = e.match(mf);
        return t ? t[1].split(pf) : [];
      }
      function Ao(e, t, i) {
        t = mn(t, e);
        for (var a = -1, o = t.length, h = !1; ++a < o; ) {
          var g = Ft(t[a]);
          if (!(h = e != null && i(e, g)))
            break;
          e = e[g];
        }
        return h || ++a != o ? h : (o = e == null ? 0 : e.length, !!o && Si(o) && Zt(g, o) && (te(e) || Pn(e)));
      }
      function fg(e) {
        var t = e.length, i = new e.constructor(t);
        return t && typeof e[0] == "string" && de.call(e, "index") && (i.index = e.index, i.input = e.input), i;
      }
      function So(e) {
        return typeof e.constructor == "function" && !Sr(e) ? qn(ei(e)) : {};
      }
      function hg(e, t, i) {
        var a = e.constructor;
        switch (t) {
          case pe:
            return Ms(e);
          case Nt:
          case Yt:
            return new a(+e);
          case Je:
            return Zd(e, i);
          case ln:
          case xt:
          case gr:
          case Br:
          case Vi:
          case Ki:
          case qi:
          case Xi:
          case Zi:
            return oo(e, i);
          case Ne:
            return new a();
          case dt:
          case me:
            return new a(e);
          case D:
            return Jd(e);
          case K:
            return new a();
          case ee:
            return Qd(e);
        }
      }
      function dg(e, t) {
        var i = t.length;
        if (!i)
          return e;
        var a = i - 1;
        return t[a] = (i > 1 ? "& " : "") + t[a], t = t.join(i > 2 ? ", " : " "), e.replace(_f, `{
/* [wrapped with ` + t + `] */
`);
      }
      function gg(e) {
        return te(e) || Pn(e) || !!(Du && e && e[Du]);
      }
      function Zt(e, t) {
        var i = typeof e;
        return t = t ?? Dt, !!t && (i == "number" || i != "symbol" && Af.test(e)) && e > -1 && e % 1 == 0 && e < t;
      }
      function Ge(e, t, i) {
        if (!Te(i))
          return !1;
        var a = typeof t;
        return (a == "number" ? ze(i) && Zt(t, i.length) : a == "string" && t in i) ? St(i[t], e) : !1;
      }
      function Ys(e, t) {
        if (te(e))
          return !1;
        var i = typeof e;
        return i == "number" || i == "symbol" || i == "boolean" || e == null || ct(e) ? !0 : ff.test(e) || !cf.test(e) || t != null && e in ve(t);
      }
      function _g(e) {
        var t = typeof e;
        return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
      }
      function Gs(e) {
        var t = yi(e), i = c[t];
        if (typeof i != "function" || !(t in ae.prototype))
          return !1;
        if (e === i)
          return !0;
        var a = $s(i);
        return !!a && e === a[0];
      }
      function mg(e) {
        return !!Su && Su in e;
      }
      var pg = Zr ? Jt : ua;
      function Sr(e) {
        var t = e && e.constructor, i = typeof t == "function" && t.prototype || Gn;
        return e === i;
      }
      function Oo(e) {
        return e === e && !Te(e);
      }
      function Co(e, t) {
        return function(i) {
          return i == null ? !1 : i[e] === t && (t !== s || e in ve(i));
        };
      }
      function vg(e) {
        var t = Ii(e, function(a) {
          return i.size === A && i.clear(), a;
        }), i = t.cache;
        return t;
      }
      function yg(e, t) {
        var i = e[1], a = t[1], o = i | a, h = o < (B | w | F), g = a == F && i == M || a == F && i == le && e[7].length <= t[8] || a == (F | le) && t[7].length <= t[8] && i == M;
        if (!(h || g))
          return e;
        a & B && (e[2] = t[2], o |= i & B ? 0 : P);
        var _ = t[3];
        if (_) {
          var b = e[3];
          e[3] = b ? co(b, _, t[4]) : _, e[4] = b ? hn(e[3], W) : t[4];
        }
        return _ = t[5], _ && (b = e[5], e[5] = b ? fo(b, _, t[6]) : _, e[6] = b ? hn(e[5], W) : t[6]), _ = t[7], _ && (e[7] = _), a & F && (e[8] = e[8] == null ? t[8] : We(e[8], t[8])), e[9] == null && (e[9] = t[9]), e[0] = t[0], e[1] = o, e;
      }
      function Eg(e) {
        var t = [];
        if (e != null)
          for (var i in ve(e))
            t.push(i);
        return t;
      }
      function bg(e) {
        return Qr.call(e);
      }
      function Ro(e, t, i) {
        return t = Re(t === s ? e.length - 1 : t, 0), function() {
          for (var a = arguments, o = -1, h = Re(a.length - t, 0), g = L(h); ++o < h; )
            g[o] = a[t + o];
          o = -1;
          for (var _ = L(t + 1); ++o < t; )
            _[o] = a[o];
          return _[t] = i(g), ut(e, this, _);
        };
      }
      function Do(e, t) {
        return t.length < 2 ? e : Dn(e, yt(t, 0, -1));
      }
      function wg(e, t) {
        for (var i = e.length, a = We(t.length, i), o = Qe(e); a--; ) {
          var h = t[a];
          e[a] = Zt(h, i) ? o[h] : s;
        }
        return e;
      }
      function Vs(e, t) {
        if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
          return e[t];
      }
      var No = Po(eo), Or = kh || function(e, t) {
        return Me.setTimeout(e, t);
      }, Ks = Po(Vd);
      function xo(e, t, i) {
        var a = t + "";
        return Ks(e, dg(a, Lg(cg(a), i)));
      }
      function Po(e) {
        var t = 0, i = 0;
        return function() {
          var a = Bh(), o = nn - (a - i);
          if (i = a, o > 0) {
            if (++t >= Oe)
              return arguments[0];
          } else
            t = 0;
          return e.apply(s, arguments);
        };
      }
      function bi(e, t) {
        var i = -1, a = e.length, o = a - 1;
        for (t = t === s ? a : t; ++i < t; ) {
          var h = Os(i, o), g = e[h];
          e[h] = e[i], e[i] = g;
        }
        return e.length = t, e;
      }
      var Mo = vg(function(e) {
        var t = [];
        return e.charCodeAt(0) === 46 && t.push(""), e.replace(hf, function(i, a, o, h) {
          t.push(o ? h.replace(Ef, "$1") : a || i);
        }), t;
      });
      function Ft(e) {
        if (typeof e == "string" || ct(e))
          return e;
        var t = e + "";
        return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
      }
      function xn(e) {
        if (e != null) {
          try {
            return Jr.call(e);
          } catch {
          }
          try {
            return e + "";
          } catch {
          }
        }
        return "";
      }
      function Lg(e, t) {
        return _t(fr, function(i) {
          var a = "_." + i[0];
          t & i[1] && !Vr(e, a) && e.push(a);
        }), e.sort();
      }
      function Fo(e) {
        if (e instanceof ae)
          return e.clone();
        var t = new pt(e.__wrapped__, e.__chain__);
        return t.__actions__ = Qe(e.__actions__), t.__index__ = e.__index__, t.__values__ = e.__values__, t;
      }
      function Tg(e, t, i) {
        (i ? Ge(e, t, i) : t === s) ? t = 1 : t = Re(ne(t), 0);
        var a = e == null ? 0 : e.length;
        if (!a || t < 1)
          return [];
        for (var o = 0, h = 0, g = L(ri(a / t)); o < a; )
          g[h++] = yt(e, o, o += t);
        return g;
      }
      function Ig(e) {
        for (var t = -1, i = e == null ? 0 : e.length, a = 0, o = []; ++t < i; ) {
          var h = e[t];
          h && (o[a++] = h);
        }
        return o;
      }
      function Ag() {
        var e = arguments.length;
        if (!e)
          return [];
        for (var t = L(e - 1), i = arguments[0], a = e; a--; )
          t[a - 1] = arguments[a];
        return fn(te(i) ? Qe(i) : [i], Fe(t, 1));
      }
      var Sg = ie(function(e, t) {
        return Ae(e) ? wr(e, Fe(t, 1, Ae, !0)) : [];
      }), Og = ie(function(e, t) {
        var i = Et(t);
        return Ae(i) && (i = s), Ae(e) ? wr(e, Fe(t, 1, Ae, !0), Z(i, 2)) : [];
      }), Cg = ie(function(e, t) {
        var i = Et(t);
        return Ae(i) && (i = s), Ae(e) ? wr(e, Fe(t, 1, Ae, !0), s, i) : [];
      });
      function Rg(e, t, i) {
        var a = e == null ? 0 : e.length;
        return a ? (t = i || t === s ? 1 : ne(t), yt(e, t < 0 ? 0 : t, a)) : [];
      }
      function Dg(e, t, i) {
        var a = e == null ? 0 : e.length;
        return a ? (t = i || t === s ? 1 : ne(t), t = a - t, yt(e, 0, t < 0 ? 0 : t)) : [];
      }
      function Ng(e, t) {
        return e && e.length ? di(e, Z(t, 3), !0, !0) : [];
      }
      function xg(e, t) {
        return e && e.length ? di(e, Z(t, 3), !0) : [];
      }
      function Pg(e, t, i, a) {
        var o = e == null ? 0 : e.length;
        return o ? (i && typeof i != "number" && Ge(e, t, i) && (i = 0, a = o), Ad(e, t, i, a)) : [];
      }
      function ko(e, t, i) {
        var a = e == null ? 0 : e.length;
        if (!a)
          return -1;
        var o = i == null ? 0 : ne(i);
        return o < 0 && (o = Re(a + o, 0)), Kr(e, Z(t, 3), o);
      }
      function Wo(e, t, i) {
        var a = e == null ? 0 : e.length;
        if (!a)
          return -1;
        var o = a - 1;
        return i !== s && (o = ne(i), o = i < 0 ? Re(a + o, 0) : We(o, a - 1)), Kr(e, Z(t, 3), o, !0);
      }
      function Uo(e) {
        var t = e == null ? 0 : e.length;
        return t ? Fe(e, 1) : [];
      }
      function Mg(e) {
        var t = e == null ? 0 : e.length;
        return t ? Fe(e, rn) : [];
      }
      function Fg(e, t) {
        var i = e == null ? 0 : e.length;
        return i ? (t = t === s ? 1 : ne(t), Fe(e, t)) : [];
      }
      function kg(e) {
        for (var t = -1, i = e == null ? 0 : e.length, a = {}; ++t < i; ) {
          var o = e[t];
          a[o[0]] = o[1];
        }
        return a;
      }
      function $o(e) {
        return e && e.length ? e[0] : s;
      }
      function Wg(e, t, i) {
        var a = e == null ? 0 : e.length;
        if (!a)
          return -1;
        var o = i == null ? 0 : ne(i);
        return o < 0 && (o = Re(a + o, 0)), $n(e, t, o);
      }
      function Ug(e) {
        var t = e == null ? 0 : e.length;
        return t ? yt(e, 0, -1) : [];
      }
      var $g = ie(function(e) {
        var t = we(e, xs);
        return t.length && t[0] === e[0] ? Ls(t) : [];
      }), Bg = ie(function(e) {
        var t = Et(e), i = we(e, xs);
        return t === Et(i) ? t = s : i.pop(), i.length && i[0] === e[0] ? Ls(i, Z(t, 2)) : [];
      }), Hg = ie(function(e) {
        var t = Et(e), i = we(e, xs);
        return t = typeof t == "function" ? t : s, t && i.pop(), i.length && i[0] === e[0] ? Ls(i, s, t) : [];
      });
      function Yg(e, t) {
        return e == null ? "" : Uh.call(e, t);
      }
      function Et(e) {
        var t = e == null ? 0 : e.length;
        return t ? e[t - 1] : s;
      }
      function Gg(e, t, i) {
        var a = e == null ? 0 : e.length;
        if (!a)
          return -1;
        var o = a;
        return i !== s && (o = ne(i), o = o < 0 ? Re(a + o, 0) : We(o, a - 1)), t === t ? Lh(e, t, o) : Kr(e, yu, o, !0);
      }
      function Vg(e, t) {
        return e && e.length ? Ju(e, ne(t)) : s;
      }
      var Kg = ie(Bo);
      function Bo(e, t) {
        return e && e.length && t && t.length ? Ss(e, t) : e;
      }
      function qg(e, t, i) {
        return e && e.length && t && t.length ? Ss(e, t, Z(i, 2)) : e;
      }
      function Xg(e, t, i) {
        return e && e.length && t && t.length ? Ss(e, t, s, i) : e;
      }
      var Zg = Xt(function(e, t) {
        var i = e == null ? 0 : e.length, a = ys(e, t);
        return ju(e, we(t, function(o) {
          return Zt(o, i) ? +o : o;
        }).sort(lo)), a;
      });
      function Jg(e, t) {
        var i = [];
        if (!(e && e.length))
          return i;
        var a = -1, o = [], h = e.length;
        for (t = Z(t, 3); ++a < h; ) {
          var g = e[a];
          t(g, a, e) && (i.push(g), o.push(a));
        }
        return ju(e, o), i;
      }
      function qs(e) {
        return e == null ? e : Yh.call(e);
      }
      function Qg(e, t, i) {
        var a = e == null ? 0 : e.length;
        return a ? (i && typeof i != "number" && Ge(e, t, i) ? (t = 0, i = a) : (t = t == null ? 0 : ne(t), i = i === s ? a : ne(i)), yt(e, t, i)) : [];
      }
      function zg(e, t) {
        return hi(e, t);
      }
      function jg(e, t, i) {
        return Rs(e, t, Z(i, 2));
      }
      function e_(e, t) {
        var i = e == null ? 0 : e.length;
        if (i) {
          var a = hi(e, t);
          if (a < i && St(e[a], t))
            return a;
        }
        return -1;
      }
      function t_(e, t) {
        return hi(e, t, !0);
      }
      function n_(e, t, i) {
        return Rs(e, t, Z(i, 2), !0);
      }
      function r_(e, t) {
        var i = e == null ? 0 : e.length;
        if (i) {
          var a = hi(e, t, !0) - 1;
          if (St(e[a], t))
            return a;
        }
        return -1;
      }
      function i_(e) {
        return e && e.length ? to(e) : [];
      }
      function s_(e, t) {
        return e && e.length ? to(e, Z(t, 2)) : [];
      }
      function a_(e) {
        var t = e == null ? 0 : e.length;
        return t ? yt(e, 1, t) : [];
      }
      function u_(e, t, i) {
        return e && e.length ? (t = i || t === s ? 1 : ne(t), yt(e, 0, t < 0 ? 0 : t)) : [];
      }
      function o_(e, t, i) {
        var a = e == null ? 0 : e.length;
        return a ? (t = i || t === s ? 1 : ne(t), t = a - t, yt(e, t < 0 ? 0 : t, a)) : [];
      }
      function l_(e, t) {
        return e && e.length ? di(e, Z(t, 3), !1, !0) : [];
      }
      function c_(e, t) {
        return e && e.length ? di(e, Z(t, 3)) : [];
      }
      var f_ = ie(function(e) {
        return _n(Fe(e, 1, Ae, !0));
      }), h_ = ie(function(e) {
        var t = Et(e);
        return Ae(t) && (t = s), _n(Fe(e, 1, Ae, !0), Z(t, 2));
      }), d_ = ie(function(e) {
        var t = Et(e);
        return t = typeof t == "function" ? t : s, _n(Fe(e, 1, Ae, !0), s, t);
      });
      function g_(e) {
        return e && e.length ? _n(e) : [];
      }
      function __(e, t) {
        return e && e.length ? _n(e, Z(t, 2)) : [];
      }
      function m_(e, t) {
        return t = typeof t == "function" ? t : s, e && e.length ? _n(e, s, t) : [];
      }
      function Xs(e) {
        if (!(e && e.length))
          return [];
        var t = 0;
        return e = cn(e, function(i) {
          if (Ae(i))
            return t = Re(i.length, t), !0;
        }), fs(t, function(i) {
          return we(e, os(i));
        });
      }
      function Ho(e, t) {
        if (!(e && e.length))
          return [];
        var i = Xs(e);
        return t == null ? i : we(i, function(a) {
          return ut(t, s, a);
        });
      }
      var p_ = ie(function(e, t) {
        return Ae(e) ? wr(e, t) : [];
      }), v_ = ie(function(e) {
        return Ns(cn(e, Ae));
      }), y_ = ie(function(e) {
        var t = Et(e);
        return Ae(t) && (t = s), Ns(cn(e, Ae), Z(t, 2));
      }), E_ = ie(function(e) {
        var t = Et(e);
        return t = typeof t == "function" ? t : s, Ns(cn(e, Ae), s, t);
      }), b_ = ie(Xs);
      function w_(e, t) {
        return so(e || [], t || [], br);
      }
      function L_(e, t) {
        return so(e || [], t || [], Ir);
      }
      var T_ = ie(function(e) {
        var t = e.length, i = t > 1 ? e[t - 1] : s;
        return i = typeof i == "function" ? (e.pop(), i) : s, Ho(e, i);
      });
      function Yo(e) {
        var t = c(e);
        return t.__chain__ = !0, t;
      }
      function I_(e, t) {
        return t(e), e;
      }
      function wi(e, t) {
        return t(e);
      }
      var A_ = Xt(function(e) {
        var t = e.length, i = t ? e[0] : 0, a = this.__wrapped__, o = function(h) {
          return ys(h, e);
        };
        return t > 1 || this.__actions__.length || !(a instanceof ae) || !Zt(i) ? this.thru(o) : (a = a.slice(i, +i + (t ? 1 : 0)), a.__actions__.push({
          func: wi,
          args: [o],
          thisArg: s
        }), new pt(a, this.__chain__).thru(function(h) {
          return t && !h.length && h.push(s), h;
        }));
      });
      function S_() {
        return Yo(this);
      }
      function O_() {
        return new pt(this.value(), this.__chain__);
      }
      function C_() {
        this.__values__ === s && (this.__values__ = rl(this.value()));
        var e = this.__index__ >= this.__values__.length, t = e ? s : this.__values__[this.__index__++];
        return { done: e, value: t };
      }
      function R_() {
        return this;
      }
      function D_(e) {
        for (var t, i = this; i instanceof ui; ) {
          var a = Fo(i);
          a.__index__ = 0, a.__values__ = s, t ? o.__wrapped__ = a : t = a;
          var o = a;
          i = i.__wrapped__;
        }
        return o.__wrapped__ = e, t;
      }
      function N_() {
        var e = this.__wrapped__;
        if (e instanceof ae) {
          var t = e;
          return this.__actions__.length && (t = new ae(this)), t = t.reverse(), t.__actions__.push({
            func: wi,
            args: [qs],
            thisArg: s
          }), new pt(t, this.__chain__);
        }
        return this.thru(qs);
      }
      function x_() {
        return io(this.__wrapped__, this.__actions__);
      }
      var P_ = gi(function(e, t, i) {
        de.call(e, i) ? ++e[i] : Kt(e, i, 1);
      });
      function M_(e, t, i) {
        var a = te(e) ? pu : Id;
        return i && Ge(e, t, i) && (t = s), a(e, Z(t, 3));
      }
      function F_(e, t) {
        var i = te(e) ? cn : Bu;
        return i(e, Z(t, 3));
      }
      var k_ = mo(ko), W_ = mo(Wo);
      function U_(e, t) {
        return Fe(Li(e, t), 1);
      }
      function $_(e, t) {
        return Fe(Li(e, t), rn);
      }
      function B_(e, t, i) {
        return i = i === s ? 1 : ne(i), Fe(Li(e, t), i);
      }
      function Go(e, t) {
        var i = te(e) ? _t : gn;
        return i(e, Z(t, 3));
      }
      function Vo(e, t) {
        var i = te(e) ? ah : $u;
        return i(e, Z(t, 3));
      }
      var H_ = gi(function(e, t, i) {
        de.call(e, i) ? e[i].push(t) : Kt(e, i, [t]);
      });
      function Y_(e, t, i, a) {
        e = ze(e) ? e : zn(e), i = i && !a ? ne(i) : 0;
        var o = e.length;
        return i < 0 && (i = Re(o + i, 0)), Oi(e) ? i <= o && e.indexOf(t, i) > -1 : !!o && $n(e, t, i) > -1;
      }
      var G_ = ie(function(e, t, i) {
        var a = -1, o = typeof t == "function", h = ze(e) ? L(e.length) : [];
        return gn(e, function(g) {
          h[++a] = o ? ut(t, g, i) : Lr(g, t, i);
        }), h;
      }), V_ = gi(function(e, t, i) {
        Kt(e, i, t);
      });
      function Li(e, t) {
        var i = te(e) ? we : qu;
        return i(e, Z(t, 3));
      }
      function K_(e, t, i, a) {
        return e == null ? [] : (te(t) || (t = t == null ? [] : [t]), i = a ? s : i, te(i) || (i = i == null ? [] : [i]), Qu(e, t, i));
      }
      var q_ = gi(function(e, t, i) {
        e[i ? 0 : 1].push(t);
      }, function() {
        return [[], []];
      });
      function X_(e, t, i) {
        var a = te(e) ? as : bu, o = arguments.length < 3;
        return a(e, Z(t, 4), i, o, gn);
      }
      function Z_(e, t, i) {
        var a = te(e) ? uh : bu, o = arguments.length < 3;
        return a(e, Z(t, 4), i, o, $u);
      }
      function J_(e, t) {
        var i = te(e) ? cn : Bu;
        return i(e, Ai(Z(t, 3)));
      }
      function Q_(e) {
        var t = te(e) ? Fu : Yd;
        return t(e);
      }
      function z_(e, t, i) {
        (i ? Ge(e, t, i) : t === s) ? t = 1 : t = ne(t);
        var a = te(e) ? Ed : Gd;
        return a(e, t);
      }
      function j_(e) {
        var t = te(e) ? bd : Kd;
        return t(e);
      }
      function em(e) {
        if (e == null)
          return 0;
        if (ze(e))
          return Oi(e) ? Hn(e) : e.length;
        var t = Ue(e);
        return t == Ne || t == K ? e.size : Is(e).length;
      }
      function tm(e, t, i) {
        var a = te(e) ? us : qd;
        return i && Ge(e, t, i) && (t = s), a(e, Z(t, 3));
      }
      var nm = ie(function(e, t) {
        if (e == null)
          return [];
        var i = t.length;
        return i > 1 && Ge(e, t[0], t[1]) ? t = [] : i > 2 && Ge(t[0], t[1], t[2]) && (t = [t[0]]), Qu(e, Fe(t, 1), []);
      }), Ti = Fh || function() {
        return Me.Date.now();
      };
      function rm(e, t) {
        if (typeof t != "function")
          throw new mt(d);
        return e = ne(e), function() {
          if (--e < 1)
            return t.apply(this, arguments);
        };
      }
      function Ko(e, t, i) {
        return t = i ? s : t, t = e && t == null ? e.length : t, qt(e, F, s, s, s, s, t);
      }
      function qo(e, t) {
        var i;
        if (typeof t != "function")
          throw new mt(d);
        return e = ne(e), function() {
          return --e > 0 && (i = t.apply(this, arguments)), e <= 1 && (t = s), i;
        };
      }
      var Zs = ie(function(e, t, i) {
        var a = B;
        if (i.length) {
          var o = hn(i, Jn(Zs));
          a |= U;
        }
        return qt(e, a, t, i, o);
      }), Xo = ie(function(e, t, i) {
        var a = B | w;
        if (i.length) {
          var o = hn(i, Jn(Xo));
          a |= U;
        }
        return qt(t, a, e, i, o);
      });
      function Zo(e, t, i) {
        t = i ? s : t;
        var a = qt(e, M, s, s, s, s, s, t);
        return a.placeholder = Zo.placeholder, a;
      }
      function Jo(e, t, i) {
        t = i ? s : t;
        var a = qt(e, S, s, s, s, s, s, t);
        return a.placeholder = Jo.placeholder, a;
      }
      function Qo(e, t, i) {
        var a, o, h, g, _, b, O = 0, C = !1, N = !1, $ = !0;
        if (typeof e != "function")
          throw new mt(d);
        t = bt(t) || 0, Te(i) && (C = !!i.leading, N = "maxWait" in i, h = N ? Re(bt(i.maxWait) || 0, t) : h, $ = "trailing" in i ? !!i.trailing : $);
        function X(Se) {
          var Ot = a, zt = o;
          return a = o = s, O = Se, g = e.apply(zt, Ot), g;
        }
        function J(Se) {
          return O = Se, _ = Or(se, t), C ? X(Se) : g;
        }
        function re(Se) {
          var Ot = Se - b, zt = Se - O, ml = t - Ot;
          return N ? We(ml, h - zt) : ml;
        }
        function Q(Se) {
          var Ot = Se - b, zt = Se - O;
          return b === s || Ot >= t || Ot < 0 || N && zt >= h;
        }
        function se() {
          var Se = Ti();
          if (Q(Se))
            return ue(Se);
          _ = Or(se, re(Se));
        }
        function ue(Se) {
          return _ = s, $ && a ? X(Se) : (a = o = s, g);
        }
        function ft() {
          _ !== s && ao(_), O = 0, a = b = o = _ = s;
        }
        function Ve() {
          return _ === s ? g : ue(Ti());
        }
        function ht() {
          var Se = Ti(), Ot = Q(Se);
          if (a = arguments, o = this, b = Se, Ot) {
            if (_ === s)
              return J(b);
            if (N)
              return ao(_), _ = Or(se, t), X(b);
          }
          return _ === s && (_ = Or(se, t)), g;
        }
        return ht.cancel = ft, ht.flush = Ve, ht;
      }
      var im = ie(function(e, t) {
        return Uu(e, 1, t);
      }), sm = ie(function(e, t, i) {
        return Uu(e, bt(t) || 0, i);
      });
      function am(e) {
        return qt(e, _e);
      }
      function Ii(e, t) {
        if (typeof e != "function" || t != null && typeof t != "function")
          throw new mt(d);
        var i = function() {
          var a = arguments, o = t ? t.apply(this, a) : a[0], h = i.cache;
          if (h.has(o))
            return h.get(o);
          var g = e.apply(this, a);
          return i.cache = h.set(o, g) || h, g;
        };
        return i.cache = new (Ii.Cache || Vt)(), i;
      }
      Ii.Cache = Vt;
      function Ai(e) {
        if (typeof e != "function")
          throw new mt(d);
        return function() {
          var t = arguments;
          switch (t.length) {
            case 0:
              return !e.call(this);
            case 1:
              return !e.call(this, t[0]);
            case 2:
              return !e.call(this, t[0], t[1]);
            case 3:
              return !e.call(this, t[0], t[1], t[2]);
          }
          return !e.apply(this, t);
        };
      }
      function um(e) {
        return qo(2, e);
      }
      var om = Xd(function(e, t) {
        t = t.length == 1 && te(t[0]) ? we(t[0], ot(Z())) : we(Fe(t, 1), ot(Z()));
        var i = t.length;
        return ie(function(a) {
          for (var o = -1, h = We(a.length, i); ++o < h; )
            a[o] = t[o].call(this, a[o]);
          return ut(e, this, a);
        });
      }), Js = ie(function(e, t) {
        var i = hn(t, Jn(Js));
        return qt(e, U, s, t, i);
      }), zo = ie(function(e, t) {
        var i = hn(t, Jn(zo));
        return qt(e, H, s, t, i);
      }), lm = Xt(function(e, t) {
        return qt(e, le, s, s, s, t);
      });
      function cm(e, t) {
        if (typeof e != "function")
          throw new mt(d);
        return t = t === s ? t : ne(t), ie(e, t);
      }
      function fm(e, t) {
        if (typeof e != "function")
          throw new mt(d);
        return t = t == null ? 0 : Re(ne(t), 0), ie(function(i) {
          var a = i[t], o = pn(i, 0, t);
          return a && fn(o, a), ut(e, this, o);
        });
      }
      function hm(e, t, i) {
        var a = !0, o = !0;
        if (typeof e != "function")
          throw new mt(d);
        return Te(i) && (a = "leading" in i ? !!i.leading : a, o = "trailing" in i ? !!i.trailing : o), Qo(e, t, {
          leading: a,
          maxWait: t,
          trailing: o
        });
      }
      function dm(e) {
        return Ko(e, 1);
      }
      function gm(e, t) {
        return Js(Ps(t), e);
      }
      function _m() {
        if (!arguments.length)
          return [];
        var e = arguments[0];
        return te(e) ? e : [e];
      }
      function mm(e) {
        return vt(e, Y);
      }
      function pm(e, t) {
        return t = typeof t == "function" ? t : s, vt(e, Y, t);
      }
      function vm(e) {
        return vt(e, x | Y);
      }
      function ym(e, t) {
        return t = typeof t == "function" ? t : s, vt(e, x | Y, t);
      }
      function Em(e, t) {
        return t == null || Wu(e, t, xe(t));
      }
      function St(e, t) {
        return e === t || e !== e && t !== t;
      }
      var bm = vi(ws), wm = vi(function(e, t) {
        return e >= t;
      }), Pn = Gu(/* @__PURE__ */ function() {
        return arguments;
      }()) ? Gu : function(e) {
        return Ie(e) && de.call(e, "callee") && !Ru.call(e, "callee");
      }, te = L.isArray, Lm = fu ? ot(fu) : Dd;
      function ze(e) {
        return e != null && Si(e.length) && !Jt(e);
      }
      function Ae(e) {
        return Ie(e) && ze(e);
      }
      function Tm(e) {
        return e === !0 || e === !1 || Ie(e) && Ye(e) == Nt;
      }
      var vn = Wh || ua, Im = hu ? ot(hu) : Nd;
      function Am(e) {
        return Ie(e) && e.nodeType === 1 && !Cr(e);
      }
      function Sm(e) {
        if (e == null)
          return !0;
        if (ze(e) && (te(e) || typeof e == "string" || typeof e.splice == "function" || vn(e) || Qn(e) || Pn(e)))
          return !e.length;
        var t = Ue(e);
        if (t == Ne || t == K)
          return !e.size;
        if (Sr(e))
          return !Is(e).length;
        for (var i in e)
          if (de.call(e, i))
            return !1;
        return !0;
      }
      function Om(e, t) {
        return Tr(e, t);
      }
      function Cm(e, t, i) {
        i = typeof i == "function" ? i : s;
        var a = i ? i(e, t) : s;
        return a === s ? Tr(e, t, s, i) : !!a;
      }
      function Qs(e) {
        if (!Ie(e))
          return !1;
        var t = Ye(e);
        return t == an || t == dr || typeof e.message == "string" && typeof e.name == "string" && !Cr(e);
      }
      function Rm(e) {
        return typeof e == "number" && Nu(e);
      }
      function Jt(e) {
        if (!Te(e))
          return !1;
        var t = Ye(e);
        return t == un || t == on || t == hr || t == p;
      }
      function jo(e) {
        return typeof e == "number" && e == ne(e);
      }
      function Si(e) {
        return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Dt;
      }
      function Te(e) {
        var t = typeof e;
        return e != null && (t == "object" || t == "function");
      }
      function Ie(e) {
        return e != null && typeof e == "object";
      }
      var el = du ? ot(du) : Pd;
      function Dm(e, t) {
        return e === t || Ts(e, t, Bs(t));
      }
      function Nm(e, t, i) {
        return i = typeof i == "function" ? i : s, Ts(e, t, Bs(t), i);
      }
      function xm(e) {
        return tl(e) && e != +e;
      }
      function Pm(e) {
        if (pg(e))
          throw new z(f);
        return Vu(e);
      }
      function Mm(e) {
        return e === null;
      }
      function Fm(e) {
        return e == null;
      }
      function tl(e) {
        return typeof e == "number" || Ie(e) && Ye(e) == dt;
      }
      function Cr(e) {
        if (!Ie(e) || Ye(e) != at)
          return !1;
        var t = ei(e);
        if (t === null)
          return !0;
        var i = de.call(t, "constructor") && t.constructor;
        return typeof i == "function" && i instanceof i && Jr.call(i) == Nh;
      }
      var zs = gu ? ot(gu) : Md;
      function km(e) {
        return jo(e) && e >= -9007199254740991 && e <= Dt;
      }
      var nl = _u ? ot(_u) : Fd;
      function Oi(e) {
        return typeof e == "string" || !te(e) && Ie(e) && Ye(e) == me;
      }
      function ct(e) {
        return typeof e == "symbol" || Ie(e) && Ye(e) == ee;
      }
      var Qn = mu ? ot(mu) : kd;
      function Wm(e) {
        return e === s;
      }
      function Um(e) {
        return Ie(e) && Ue(e) == k;
      }
      function $m(e) {
        return Ie(e) && Ye(e) == he;
      }
      var Bm = vi(As), Hm = vi(function(e, t) {
        return e <= t;
      });
      function rl(e) {
        if (!e)
          return [];
        if (ze(e))
          return Oi(e) ? It(e) : Qe(e);
        if (mr && e[mr])
          return Eh(e[mr]());
        var t = Ue(e), i = t == Ne ? ds : t == K ? qr : zn;
        return i(e);
      }
      function Qt(e) {
        if (!e)
          return e === 0 ? e : 0;
        if (e = bt(e), e === rn || e === -1 / 0) {
          var t = e < 0 ? -1 : 1;
          return t * Tt;
        }
        return e === e ? e : 0;
      }
      function ne(e) {
        var t = Qt(e), i = t % 1;
        return t === t ? i ? t - i : t : 0;
      }
      function il(e) {
        return e ? Rn(ne(e), 0, He) : 0;
      }
      function bt(e) {
        if (typeof e == "number")
          return e;
        if (ct(e))
          return Bt;
        if (Te(e)) {
          var t = typeof e.valueOf == "function" ? e.valueOf() : e;
          e = Te(t) ? t + "" : t;
        }
        if (typeof e != "string")
          return e === 0 ? e : +e;
        e = wu(e);
        var i = Lf.test(e);
        return i || If.test(e) ? rh(e.slice(2), i ? 2 : 8) : wf.test(e) ? Bt : +e;
      }
      function sl(e) {
        return Mt(e, je(e));
      }
      function Ym(e) {
        return e ? Rn(ne(e), -9007199254740991, Dt) : e === 0 ? e : 0;
      }
      function fe(e) {
        return e == null ? "" : lt(e);
      }
      var Gm = Xn(function(e, t) {
        if (Sr(t) || ze(t)) {
          Mt(t, xe(t), e);
          return;
        }
        for (var i in t)
          de.call(t, i) && br(e, i, t[i]);
      }), al = Xn(function(e, t) {
        Mt(t, je(t), e);
      }), Ci = Xn(function(e, t, i, a) {
        Mt(t, je(t), e, a);
      }), Vm = Xn(function(e, t, i, a) {
        Mt(t, xe(t), e, a);
      }), Km = Xt(ys);
      function qm(e, t) {
        var i = qn(e);
        return t == null ? i : ku(i, t);
      }
      var Xm = ie(function(e, t) {
        e = ve(e);
        var i = -1, a = t.length, o = a > 2 ? t[2] : s;
        for (o && Ge(t[0], t[1], o) && (a = 1); ++i < a; )
          for (var h = t[i], g = je(h), _ = -1, b = g.length; ++_ < b; ) {
            var O = g[_], C = e[O];
            (C === s || St(C, Gn[O]) && !de.call(e, O)) && (e[O] = h[O]);
          }
        return e;
      }), Zm = ie(function(e) {
        return e.push(s, Lo), ut(ul, s, e);
      });
      function Jm(e, t) {
        return vu(e, Z(t, 3), Pt);
      }
      function Qm(e, t) {
        return vu(e, Z(t, 3), bs);
      }
      function zm(e, t) {
        return e == null ? e : Es(e, Z(t, 3), je);
      }
      function jm(e, t) {
        return e == null ? e : Hu(e, Z(t, 3), je);
      }
      function ep(e, t) {
        return e && Pt(e, Z(t, 3));
      }
      function tp(e, t) {
        return e && bs(e, Z(t, 3));
      }
      function np(e) {
        return e == null ? [] : ci(e, xe(e));
      }
      function rp(e) {
        return e == null ? [] : ci(e, je(e));
      }
      function js(e, t, i) {
        var a = e == null ? s : Dn(e, t);
        return a === s ? i : a;
      }
      function ip(e, t) {
        return e != null && Ao(e, t, Sd);
      }
      function ea(e, t) {
        return e != null && Ao(e, t, Od);
      }
      var sp = vo(function(e, t, i) {
        t != null && typeof t.toString != "function" && (t = Qr.call(t)), e[t] = i;
      }, na(et)), ap = vo(function(e, t, i) {
        t != null && typeof t.toString != "function" && (t = Qr.call(t)), de.call(e, t) ? e[t].push(i) : e[t] = [i];
      }, Z), up = ie(Lr);
      function xe(e) {
        return ze(e) ? Mu(e) : Is(e);
      }
      function je(e) {
        return ze(e) ? Mu(e, !0) : Wd(e);
      }
      function op(e, t) {
        var i = {};
        return t = Z(t, 3), Pt(e, function(a, o, h) {
          Kt(i, t(a, o, h), a);
        }), i;
      }
      function lp(e, t) {
        var i = {};
        return t = Z(t, 3), Pt(e, function(a, o, h) {
          Kt(i, o, t(a, o, h));
        }), i;
      }
      var cp = Xn(function(e, t, i) {
        fi(e, t, i);
      }), ul = Xn(function(e, t, i, a) {
        fi(e, t, i, a);
      }), fp = Xt(function(e, t) {
        var i = {};
        if (e == null)
          return i;
        var a = !1;
        t = we(t, function(h) {
          return h = mn(h, e), a || (a = h.length > 1), h;
        }), Mt(e, Us(e), i), a && (i = vt(i, x | R | Y, sg));
        for (var o = t.length; o--; )
          Ds(i, t[o]);
        return i;
      });
      function hp(e, t) {
        return ol(e, Ai(Z(t)));
      }
      var dp = Xt(function(e, t) {
        return e == null ? {} : $d(e, t);
      });
      function ol(e, t) {
        if (e == null)
          return {};
        var i = we(Us(e), function(a) {
          return [a];
        });
        return t = Z(t), zu(e, i, function(a, o) {
          return t(a, o[0]);
        });
      }
      function gp(e, t, i) {
        t = mn(t, e);
        var a = -1, o = t.length;
        for (o || (o = 1, e = s); ++a < o; ) {
          var h = e == null ? s : e[Ft(t[a])];
          h === s && (a = o, h = i), e = Jt(h) ? h.call(e) : h;
        }
        return e;
      }
      function _p(e, t, i) {
        return e == null ? e : Ir(e, t, i);
      }
      function mp(e, t, i, a) {
        return a = typeof a == "function" ? a : s, e == null ? e : Ir(e, t, i, a);
      }
      var ll = bo(xe), cl = bo(je);
      function pp(e, t, i) {
        var a = te(e), o = a || vn(e) || Qn(e);
        if (t = Z(t, 4), i == null) {
          var h = e && e.constructor;
          o ? i = a ? new h() : [] : Te(e) ? i = Jt(h) ? qn(ei(e)) : {} : i = {};
        }
        return (o ? _t : Pt)(e, function(g, _, b) {
          return t(i, g, _, b);
        }), i;
      }
      function vp(e, t) {
        return e == null ? !0 : Ds(e, t);
      }
      function yp(e, t, i) {
        return e == null ? e : ro(e, t, Ps(i));
      }
      function Ep(e, t, i, a) {
        return a = typeof a == "function" ? a : s, e == null ? e : ro(e, t, Ps(i), a);
      }
      function zn(e) {
        return e == null ? [] : hs(e, xe(e));
      }
      function bp(e) {
        return e == null ? [] : hs(e, je(e));
      }
      function wp(e, t, i) {
        return i === s && (i = t, t = s), i !== s && (i = bt(i), i = i === i ? i : 0), t !== s && (t = bt(t), t = t === t ? t : 0), Rn(bt(e), t, i);
      }
      function Lp(e, t, i) {
        return t = Qt(t), i === s ? (i = t, t = 0) : i = Qt(i), e = bt(e), Cd(e, t, i);
      }
      function Tp(e, t, i) {
        if (i && typeof i != "boolean" && Ge(e, t, i) && (t = i = s), i === s && (typeof t == "boolean" ? (i = t, t = s) : typeof e == "boolean" && (i = e, e = s)), e === s && t === s ? (e = 0, t = 1) : (e = Qt(e), t === s ? (t = e, e = 0) : t = Qt(t)), e > t) {
          var a = e;
          e = t, t = a;
        }
        if (i || e % 1 || t % 1) {
          var o = xu();
          return We(e + o * (t - e + nh("1e-" + ((o + "").length - 1))), t);
        }
        return Os(e, t);
      }
      var Ip = Zn(function(e, t, i) {
        return t = t.toLowerCase(), e + (i ? fl(t) : t);
      });
      function fl(e) {
        return ta(fe(e).toLowerCase());
      }
      function hl(e) {
        return e = fe(e), e && e.replace(Sf, _h).replace(Kf, "");
      }
      function Ap(e, t, i) {
        e = fe(e), t = lt(t);
        var a = e.length;
        i = i === s ? a : Rn(ne(i), 0, a);
        var o = i;
        return i -= t.length, i >= 0 && e.slice(i, o) == t;
      }
      function Sp(e) {
        return e = fe(e), e && uf.test(e) ? e.replace(Ha, mh) : e;
      }
      function Op(e) {
        return e = fe(e), e && df.test(e) ? e.replace(Ji, "\\$&") : e;
      }
      var Cp = Zn(function(e, t, i) {
        return e + (i ? "-" : "") + t.toLowerCase();
      }), Rp = Zn(function(e, t, i) {
        return e + (i ? " " : "") + t.toLowerCase();
      }), Dp = _o("toLowerCase");
      function Np(e, t, i) {
        e = fe(e), t = ne(t);
        var a = t ? Hn(e) : 0;
        if (!t || a >= t)
          return e;
        var o = (t - a) / 2;
        return pi(ii(o), i) + e + pi(ri(o), i);
      }
      function xp(e, t, i) {
        e = fe(e), t = ne(t);
        var a = t ? Hn(e) : 0;
        return t && a < t ? e + pi(t - a, i) : e;
      }
      function Pp(e, t, i) {
        e = fe(e), t = ne(t);
        var a = t ? Hn(e) : 0;
        return t && a < t ? pi(t - a, i) + e : e;
      }
      function Mp(e, t, i) {
        return i || t == null ? t = 0 : t && (t = +t), Hh(fe(e).replace(Qi, ""), t || 0);
      }
      function Fp(e, t, i) {
        return (i ? Ge(e, t, i) : t === s) ? t = 1 : t = ne(t), Cs(fe(e), t);
      }
      function kp() {
        var e = arguments, t = fe(e[0]);
        return e.length < 3 ? t : t.replace(e[1], e[2]);
      }
      var Wp = Zn(function(e, t, i) {
        return e + (i ? "_" : "") + t.toLowerCase();
      });
      function Up(e, t, i) {
        return i && typeof i != "number" && Ge(e, t, i) && (t = i = s), i = i === s ? He : i >>> 0, i ? (e = fe(e), e && (typeof t == "string" || t != null && !zs(t)) && (t = lt(t), !t && Bn(e)) ? pn(It(e), 0, i) : e.split(t, i)) : [];
      }
      var $p = Zn(function(e, t, i) {
        return e + (i ? " " : "") + ta(t);
      });
      function Bp(e, t, i) {
        return e = fe(e), i = i == null ? 0 : Rn(ne(i), 0, e.length), t = lt(t), e.slice(i, i + t.length) == t;
      }
      function Hp(e, t, i) {
        var a = c.templateSettings;
        i && Ge(e, t, i) && (t = s), e = fe(e), t = Ci({}, t, a, wo);
        var o = Ci({}, t.imports, a.imports, wo), h = xe(o), g = hs(o, h), _, b, O = 0, C = t.interpolate || Hr, N = "__p += '", $ = gs(
          (t.escape || Hr).source + "|" + C.source + "|" + (C === Ya ? bf : Hr).source + "|" + (t.evaluate || Hr).source + "|$",
          "g"
        ), X = "//# sourceURL=" + (de.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++Qf + "]") + `
`;
        e.replace($, function(Q, se, ue, ft, Ve, ht) {
          return ue || (ue = ft), N += e.slice(O, ht).replace(Of, ph), se && (_ = !0, N += `' +
__e(` + se + `) +
'`), Ve && (b = !0, N += `';
` + Ve + `;
__p += '`), ue && (N += `' +
((__t = (` + ue + `)) == null ? '' : __t) +
'`), O = ht + Q.length, Q;
        }), N += `';
`;
        var J = de.call(t, "variable") && t.variable;
        if (!J)
          N = `with (obj) {
` + N + `
}
`;
        else if (yf.test(J))
          throw new z(y);
        N = (b ? N.replace(nf, "") : N).replace(rf, "$1").replace(sf, "$1;"), N = "function(" + (J || "obj") + `) {
` + (J ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (_ ? ", __e = _.escape" : "") + (b ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + N + `return __p
}`;
        var re = gl(function() {
          return ce(h, X + "return " + N).apply(s, g);
        });
        if (re.source = N, Qs(re))
          throw re;
        return re;
      }
      function Yp(e) {
        return fe(e).toLowerCase();
      }
      function Gp(e) {
        return fe(e).toUpperCase();
      }
      function Vp(e, t, i) {
        if (e = fe(e), e && (i || t === s))
          return wu(e);
        if (!e || !(t = lt(t)))
          return e;
        var a = It(e), o = It(t), h = Lu(a, o), g = Tu(a, o) + 1;
        return pn(a, h, g).join("");
      }
      function Kp(e, t, i) {
        if (e = fe(e), e && (i || t === s))
          return e.slice(0, Au(e) + 1);
        if (!e || !(t = lt(t)))
          return e;
        var a = It(e), o = Tu(a, It(t)) + 1;
        return pn(a, 0, o).join("");
      }
      function qp(e, t, i) {
        if (e = fe(e), e && (i || t === s))
          return e.replace(Qi, "");
        if (!e || !(t = lt(t)))
          return e;
        var a = It(e), o = Lu(a, It(t));
        return pn(a, o).join("");
      }
      function Xp(e, t) {
        var i = Be, a = st;
        if (Te(t)) {
          var o = "separator" in t ? t.separator : o;
          i = "length" in t ? ne(t.length) : i, a = "omission" in t ? lt(t.omission) : a;
        }
        e = fe(e);
        var h = e.length;
        if (Bn(e)) {
          var g = It(e);
          h = g.length;
        }
        if (i >= h)
          return e;
        var _ = i - Hn(a);
        if (_ < 1)
          return a;
        var b = g ? pn(g, 0, _).join("") : e.slice(0, _);
        if (o === s)
          return b + a;
        if (g && (_ += b.length - _), zs(o)) {
          if (e.slice(_).search(o)) {
            var O, C = b;
            for (o.global || (o = gs(o.source, fe(Ga.exec(o)) + "g")), o.lastIndex = 0; O = o.exec(C); )
              var N = O.index;
            b = b.slice(0, N === s ? _ : N);
          }
        } else if (e.indexOf(lt(o), _) != _) {
          var $ = b.lastIndexOf(o);
          $ > -1 && (b = b.slice(0, $));
        }
        return b + a;
      }
      function Zp(e) {
        return e = fe(e), e && af.test(e) ? e.replace(Ba, Th) : e;
      }
      var Jp = Zn(function(e, t, i) {
        return e + (i ? " " : "") + t.toUpperCase();
      }), ta = _o("toUpperCase");
      function dl(e, t, i) {
        return e = fe(e), t = i ? s : t, t === s ? yh(e) ? Sh(e) : ch(e) : e.match(t) || [];
      }
      var gl = ie(function(e, t) {
        try {
          return ut(e, s, t);
        } catch (i) {
          return Qs(i) ? i : new z(i);
        }
      }), Qp = Xt(function(e, t) {
        return _t(t, function(i) {
          i = Ft(i), Kt(e, i, Zs(e[i], e));
        }), e;
      });
      function zp(e) {
        var t = e == null ? 0 : e.length, i = Z();
        return e = t ? we(e, function(a) {
          if (typeof a[1] != "function")
            throw new mt(d);
          return [i(a[0]), a[1]];
        }) : [], ie(function(a) {
          for (var o = -1; ++o < t; ) {
            var h = e[o];
            if (ut(h[0], this, a))
              return ut(h[1], this, a);
          }
        });
      }
      function jp(e) {
        return Td(vt(e, x));
      }
      function na(e) {
        return function() {
          return e;
        };
      }
      function e0(e, t) {
        return e == null || e !== e ? t : e;
      }
      var t0 = po(), n0 = po(!0);
      function et(e) {
        return e;
      }
      function ra(e) {
        return Ku(typeof e == "function" ? e : vt(e, x));
      }
      function r0(e) {
        return Xu(vt(e, x));
      }
      function i0(e, t) {
        return Zu(e, vt(t, x));
      }
      var s0 = ie(function(e, t) {
        return function(i) {
          return Lr(i, e, t);
        };
      }), a0 = ie(function(e, t) {
        return function(i) {
          return Lr(e, i, t);
        };
      });
      function ia(e, t, i) {
        var a = xe(t), o = ci(t, a);
        i == null && !(Te(t) && (o.length || !a.length)) && (i = t, t = e, e = this, o = ci(t, xe(t)));
        var h = !(Te(i) && "chain" in i) || !!i.chain, g = Jt(e);
        return _t(o, function(_) {
          var b = t[_];
          e[_] = b, g && (e.prototype[_] = function() {
            var O = this.__chain__;
            if (h || O) {
              var C = e(this.__wrapped__), N = C.__actions__ = Qe(this.__actions__);
              return N.push({ func: b, args: arguments, thisArg: e }), C.__chain__ = O, C;
            }
            return b.apply(e, fn([this.value()], arguments));
          });
        }), e;
      }
      function u0() {
        return Me._ === this && (Me._ = xh), this;
      }
      function sa() {
      }
      function o0(e) {
        return e = ne(e), ie(function(t) {
          return Ju(t, e);
        });
      }
      var l0 = Fs(we), c0 = Fs(pu), f0 = Fs(us);
      function _l(e) {
        return Ys(e) ? os(Ft(e)) : Bd(e);
      }
      function h0(e) {
        return function(t) {
          return e == null ? s : Dn(e, t);
        };
      }
      var d0 = yo(), g0 = yo(!0);
      function aa() {
        return [];
      }
      function ua() {
        return !1;
      }
      function _0() {
        return {};
      }
      function m0() {
        return "";
      }
      function p0() {
        return !0;
      }
      function v0(e, t) {
        if (e = ne(e), e < 1 || e > Dt)
          return [];
        var i = He, a = We(e, He);
        t = Z(t), e -= He;
        for (var o = fs(a, t); ++i < e; )
          t(i);
        return o;
      }
      function y0(e) {
        return te(e) ? we(e, Ft) : ct(e) ? [e] : Qe(Mo(fe(e)));
      }
      function E0(e) {
        var t = ++Dh;
        return fe(e) + t;
      }
      var b0 = mi(function(e, t) {
        return e + t;
      }, 0), w0 = ks("ceil"), L0 = mi(function(e, t) {
        return e / t;
      }, 1), T0 = ks("floor");
      function I0(e) {
        return e && e.length ? li(e, et, ws) : s;
      }
      function A0(e, t) {
        return e && e.length ? li(e, Z(t, 2), ws) : s;
      }
      function S0(e) {
        return Eu(e, et);
      }
      function O0(e, t) {
        return Eu(e, Z(t, 2));
      }
      function C0(e) {
        return e && e.length ? li(e, et, As) : s;
      }
      function R0(e, t) {
        return e && e.length ? li(e, Z(t, 2), As) : s;
      }
      var D0 = mi(function(e, t) {
        return e * t;
      }, 1), N0 = ks("round"), x0 = mi(function(e, t) {
        return e - t;
      }, 0);
      function P0(e) {
        return e && e.length ? cs(e, et) : 0;
      }
      function M0(e, t) {
        return e && e.length ? cs(e, Z(t, 2)) : 0;
      }
      return c.after = rm, c.ary = Ko, c.assign = Gm, c.assignIn = al, c.assignInWith = Ci, c.assignWith = Vm, c.at = Km, c.before = qo, c.bind = Zs, c.bindAll = Qp, c.bindKey = Xo, c.castArray = _m, c.chain = Yo, c.chunk = Tg, c.compact = Ig, c.concat = Ag, c.cond = zp, c.conforms = jp, c.constant = na, c.countBy = P_, c.create = qm, c.curry = Zo, c.curryRight = Jo, c.debounce = Qo, c.defaults = Xm, c.defaultsDeep = Zm, c.defer = im, c.delay = sm, c.difference = Sg, c.differenceBy = Og, c.differenceWith = Cg, c.drop = Rg, c.dropRight = Dg, c.dropRightWhile = Ng, c.dropWhile = xg, c.fill = Pg, c.filter = F_, c.flatMap = U_, c.flatMapDeep = $_, c.flatMapDepth = B_, c.flatten = Uo, c.flattenDeep = Mg, c.flattenDepth = Fg, c.flip = am, c.flow = t0, c.flowRight = n0, c.fromPairs = kg, c.functions = np, c.functionsIn = rp, c.groupBy = H_, c.initial = Ug, c.intersection = $g, c.intersectionBy = Bg, c.intersectionWith = Hg, c.invert = sp, c.invertBy = ap, c.invokeMap = G_, c.iteratee = ra, c.keyBy = V_, c.keys = xe, c.keysIn = je, c.map = Li, c.mapKeys = op, c.mapValues = lp, c.matches = r0, c.matchesProperty = i0, c.memoize = Ii, c.merge = cp, c.mergeWith = ul, c.method = s0, c.methodOf = a0, c.mixin = ia, c.negate = Ai, c.nthArg = o0, c.omit = fp, c.omitBy = hp, c.once = um, c.orderBy = K_, c.over = l0, c.overArgs = om, c.overEvery = c0, c.overSome = f0, c.partial = Js, c.partialRight = zo, c.partition = q_, c.pick = dp, c.pickBy = ol, c.property = _l, c.propertyOf = h0, c.pull = Kg, c.pullAll = Bo, c.pullAllBy = qg, c.pullAllWith = Xg, c.pullAt = Zg, c.range = d0, c.rangeRight = g0, c.rearg = lm, c.reject = J_, c.remove = Jg, c.rest = cm, c.reverse = qs, c.sampleSize = z_, c.set = _p, c.setWith = mp, c.shuffle = j_, c.slice = Qg, c.sortBy = nm, c.sortedUniq = i_, c.sortedUniqBy = s_, c.split = Up, c.spread = fm, c.tail = a_, c.take = u_, c.takeRight = o_, c.takeRightWhile = l_, c.takeWhile = c_, c.tap = I_, c.throttle = hm, c.thru = wi, c.toArray = rl, c.toPairs = ll, c.toPairsIn = cl, c.toPath = y0, c.toPlainObject = sl, c.transform = pp, c.unary = dm, c.union = f_, c.unionBy = h_, c.unionWith = d_, c.uniq = g_, c.uniqBy = __, c.uniqWith = m_, c.unset = vp, c.unzip = Xs, c.unzipWith = Ho, c.update = yp, c.updateWith = Ep, c.values = zn, c.valuesIn = bp, c.without = p_, c.words = dl, c.wrap = gm, c.xor = v_, c.xorBy = y_, c.xorWith = E_, c.zip = b_, c.zipObject = w_, c.zipObjectDeep = L_, c.zipWith = T_, c.entries = ll, c.entriesIn = cl, c.extend = al, c.extendWith = Ci, ia(c, c), c.add = b0, c.attempt = gl, c.camelCase = Ip, c.capitalize = fl, c.ceil = w0, c.clamp = wp, c.clone = mm, c.cloneDeep = vm, c.cloneDeepWith = ym, c.cloneWith = pm, c.conformsTo = Em, c.deburr = hl, c.defaultTo = e0, c.divide = L0, c.endsWith = Ap, c.eq = St, c.escape = Sp, c.escapeRegExp = Op, c.every = M_, c.find = k_, c.findIndex = ko, c.findKey = Jm, c.findLast = W_, c.findLastIndex = Wo, c.findLastKey = Qm, c.floor = T0, c.forEach = Go, c.forEachRight = Vo, c.forIn = zm, c.forInRight = jm, c.forOwn = ep, c.forOwnRight = tp, c.get = js, c.gt = bm, c.gte = wm, c.has = ip, c.hasIn = ea, c.head = $o, c.identity = et, c.includes = Y_, c.indexOf = Wg, c.inRange = Lp, c.invoke = up, c.isArguments = Pn, c.isArray = te, c.isArrayBuffer = Lm, c.isArrayLike = ze, c.isArrayLikeObject = Ae, c.isBoolean = Tm, c.isBuffer = vn, c.isDate = Im, c.isElement = Am, c.isEmpty = Sm, c.isEqual = Om, c.isEqualWith = Cm, c.isError = Qs, c.isFinite = Rm, c.isFunction = Jt, c.isInteger = jo, c.isLength = Si, c.isMap = el, c.isMatch = Dm, c.isMatchWith = Nm, c.isNaN = xm, c.isNative = Pm, c.isNil = Fm, c.isNull = Mm, c.isNumber = tl, c.isObject = Te, c.isObjectLike = Ie, c.isPlainObject = Cr, c.isRegExp = zs, c.isSafeInteger = km, c.isSet = nl, c.isString = Oi, c.isSymbol = ct, c.isTypedArray = Qn, c.isUndefined = Wm, c.isWeakMap = Um, c.isWeakSet = $m, c.join = Yg, c.kebabCase = Cp, c.last = Et, c.lastIndexOf = Gg, c.lowerCase = Rp, c.lowerFirst = Dp, c.lt = Bm, c.lte = Hm, c.max = I0, c.maxBy = A0, c.mean = S0, c.meanBy = O0, c.min = C0, c.minBy = R0, c.stubArray = aa, c.stubFalse = ua, c.stubObject = _0, c.stubString = m0, c.stubTrue = p0, c.multiply = D0, c.nth = Vg, c.noConflict = u0, c.noop = sa, c.now = Ti, c.pad = Np, c.padEnd = xp, c.padStart = Pp, c.parseInt = Mp, c.random = Tp, c.reduce = X_, c.reduceRight = Z_, c.repeat = Fp, c.replace = kp, c.result = gp, c.round = N0, c.runInContext = v, c.sample = Q_, c.size = em, c.snakeCase = Wp, c.some = tm, c.sortedIndex = zg, c.sortedIndexBy = jg, c.sortedIndexOf = e_, c.sortedLastIndex = t_, c.sortedLastIndexBy = n_, c.sortedLastIndexOf = r_, c.startCase = $p, c.startsWith = Bp, c.subtract = x0, c.sum = P0, c.sumBy = M0, c.template = Hp, c.times = v0, c.toFinite = Qt, c.toInteger = ne, c.toLength = il, c.toLower = Yp, c.toNumber = bt, c.toSafeInteger = Ym, c.toString = fe, c.toUpper = Gp, c.trim = Vp, c.trimEnd = Kp, c.trimStart = qp, c.truncate = Xp, c.unescape = Zp, c.uniqueId = E0, c.upperCase = Jp, c.upperFirst = ta, c.each = Go, c.eachRight = Vo, c.first = $o, ia(c, function() {
        var e = {};
        return Pt(c, function(t, i) {
          de.call(c.prototype, i) || (e[i] = t);
        }), e;
      }(), { chain: !1 }), c.VERSION = u, _t(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
        c[e].placeholder = c;
      }), _t(["drop", "take"], function(e, t) {
        ae.prototype[e] = function(i) {
          i = i === s ? 1 : Re(ne(i), 0);
          var a = this.__filtered__ && !t ? new ae(this) : this.clone();
          return a.__filtered__ ? a.__takeCount__ = We(i, a.__takeCount__) : a.__views__.push({
            size: We(i, He),
            type: e + (a.__dir__ < 0 ? "Right" : "")
          }), a;
        }, ae.prototype[e + "Right"] = function(i) {
          return this.reverse()[e](i).reverse();
        };
      }), _t(["filter", "map", "takeWhile"], function(e, t) {
        var i = t + 1, a = i == Wn || i == or;
        ae.prototype[e] = function(o) {
          var h = this.clone();
          return h.__iteratees__.push({
            iteratee: Z(o, 3),
            type: i
          }), h.__filtered__ = h.__filtered__ || a, h;
        };
      }), _t(["head", "last"], function(e, t) {
        var i = "take" + (t ? "Right" : "");
        ae.prototype[e] = function() {
          return this[i](1).value()[0];
        };
      }), _t(["initial", "tail"], function(e, t) {
        var i = "drop" + (t ? "" : "Right");
        ae.prototype[e] = function() {
          return this.__filtered__ ? new ae(this) : this[i](1);
        };
      }), ae.prototype.compact = function() {
        return this.filter(et);
      }, ae.prototype.find = function(e) {
        return this.filter(e).head();
      }, ae.prototype.findLast = function(e) {
        return this.reverse().find(e);
      }, ae.prototype.invokeMap = ie(function(e, t) {
        return typeof e == "function" ? new ae(this) : this.map(function(i) {
          return Lr(i, e, t);
        });
      }), ae.prototype.reject = function(e) {
        return this.filter(Ai(Z(e)));
      }, ae.prototype.slice = function(e, t) {
        e = ne(e);
        var i = this;
        return i.__filtered__ && (e > 0 || t < 0) ? new ae(i) : (e < 0 ? i = i.takeRight(-e) : e && (i = i.drop(e)), t !== s && (t = ne(t), i = t < 0 ? i.dropRight(-t) : i.take(t - e)), i);
      }, ae.prototype.takeRightWhile = function(e) {
        return this.reverse().takeWhile(e).reverse();
      }, ae.prototype.toArray = function() {
        return this.take(He);
      }, Pt(ae.prototype, function(e, t) {
        var i = /^(?:filter|find|map|reject)|While$/.test(t), a = /^(?:head|last)$/.test(t), o = c[a ? "take" + (t == "last" ? "Right" : "") : t], h = a || /^find/.test(t);
        o && (c.prototype[t] = function() {
          var g = this.__wrapped__, _ = a ? [1] : arguments, b = g instanceof ae, O = _[0], C = b || te(g), N = function(se) {
            var ue = o.apply(c, fn([se], _));
            return a && $ ? ue[0] : ue;
          };
          C && i && typeof O == "function" && O.length != 1 && (b = C = !1);
          var $ = this.__chain__, X = !!this.__actions__.length, J = h && !$, re = b && !X;
          if (!h && C) {
            g = re ? g : new ae(this);
            var Q = e.apply(g, _);
            return Q.__actions__.push({ func: wi, args: [N], thisArg: s }), new pt(Q, $);
          }
          return J && re ? e.apply(this, _) : (Q = this.thru(N), J ? a ? Q.value()[0] : Q.value() : Q);
        });
      }), _t(["pop", "push", "shift", "sort", "splice", "unshift"], function(e) {
        var t = Xr[e], i = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru", a = /^(?:pop|shift)$/.test(e);
        c.prototype[e] = function() {
          var o = arguments;
          if (a && !this.__chain__) {
            var h = this.value();
            return t.apply(te(h) ? h : [], o);
          }
          return this[i](function(g) {
            return t.apply(te(g) ? g : [], o);
          });
        };
      }), Pt(ae.prototype, function(e, t) {
        var i = c[t];
        if (i) {
          var a = i.name + "";
          de.call(Kn, a) || (Kn[a] = []), Kn[a].push({ name: t, func: i });
        }
      }), Kn[_i(s, w).name] = [{
        name: "wrapper",
        func: s
      }], ae.prototype.clone = Zh, ae.prototype.reverse = Jh, ae.prototype.value = Qh, c.prototype.at = A_, c.prototype.chain = S_, c.prototype.commit = O_, c.prototype.next = C_, c.prototype.plant = D_, c.prototype.reverse = N_, c.prototype.toJSON = c.prototype.valueOf = c.prototype.value = x_, c.prototype.first = c.prototype.head, mr && (c.prototype[mr] = R_), c;
    }, Yn = Oh();
    An ? ((An.exports = Yn)._ = Yn, rs._ = Yn) : Me._ = Yn;
  }).call(Dr);
})($i, $i.exports);
var tr = $i.exports;
class tf {
  constructor(r) {
    oe(this, "state", ir.none());
    oe(this, "value", {});
    oe(this, "default", {});
    r && Bi(this, r), this.state || (this.state = new ir()), this.value = {}, this.valid = !0, this.reset(this.initial);
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
  reset(r = null) {
    j0(this.value, r || {}), this.state.none();
  }
  isEdited() {
    return !tr.isEqual(this.value, this.initial);
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
  async save(r = null) {
    var u;
    if (this.state.processing(), !this.valid)
      return this.state.error({
        _: "Some of the input values are invalid"
      });
    r = this.serialize(r ?? this.value);
    const s = await this.send(r);
    return s.isOk ? (this.reset(s.data), (u = this.saved) == null || u.call(this, this.value)) : this.state = s, this.state;
  }
  /**
   * This method is called when editor successfully saved the
   * edited item to the server.
   *
   * By default, it will call {@link Editor.props.saved} if provided.
   */
  saved(r) {
    var s, u;
    (u = (s = this.props).saved) == null || u.call(s, r, this);
  }
  /** Serialize value before sending. */
  serialize(r) {
    return r;
  }
  /** Send value (not implemented, MUST BE in subclasses). */
  send(r) {
    throw "not implemented";
  }
}
class wE {
  constructor(r = null) {
    oe(this, "index", "list.table");
    oe(this, "view", "");
    oe(this, "value", null);
    oe(this, "item", null);
    oe(this, "editions", /* @__PURE__ */ new Set());
    /**
     * Translation key for message displayed on `confirm()` to leave unsaved
     * changes.
     */
    oe(this, "confirmTKey", "panel.confirm");
    r && Bi(this, r), this.view ?? (this.view = this.index || "");
  }
  /** Panel name (based on props) **/
  get name() {
    var r;
    return ((r = this.props) == null ? void 0 : r.name) || "";
  }
  /** Wether there are still edited items on current view. */
  get edited() {
    var r;
    return !!((r = this.editions) != null && r.size);
  }
  /** Return adequate icon based on props and model **/
  get icon() {
    var r;
    return ((r = this.props) == null ? void 0 : r.icon) || null;
  }
  /** Return panel's title based on props. */
  get title() {
    var r;
    return (r = this.props) == null ? void 0 : r.title;
  }
  /** Set or remove an edition by name. */
  setEdition(r, s) {
    s ? this.editions.add(r) : this.editions.delete(r);
  }
  /** Show a view, providing optional value */
  show({ view: r = null, value: s = null } = {}) {
    this.onLeave() && (r !== null && (this.view = r || this.index), this.value = s);
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
    const r = rr(this.confirmTKey);
    return confirm(r);
  }
  onViewChange(r) {
    r || (this.view = this.index);
  }
  onValueChange(r) {
  }
}
class LE {
  constructor(r = null) {
    oe(this, "panel", "");
    oe(this, "view", "");
    oe(this, "value", null);
    oe(this, "children", {});
    r && Bi(this, r);
  }
  get current() {
    return this.children[this.panel] || null;
  }
  static readPath(r) {
    if (!r)
      return { panel: "", view: "" };
    const s = r.indexOf(".");
    return s < 0 ? { panel: r, view: "" } : { panel: r.substring(0, s), view: r.substring(s + 1) };
  }
  register(r, s) {
    if (r in this.children)
      throw Error(`Child panel is already registered ${r}.`);
    this.children[r] = s;
  }
  unregister(r) {
    delete this.children[r];
  }
  show({ force: r = !1, href: s = null, ...u }) {
    if (r || !this.current || this.current.onLeave()) {
      if (s && window.location.pathname != s) {
        if (!u.panel)
          throw Error("The attribute `href` requires`panel`.");
        s = `${s}?panel=${u.panel}`, u.view && (s = `${s}&view=${u.view || ""}`), window.location.href = s;
        return;
      }
      this.reset(u);
    }
  }
  reset({ panel: r, view: s = null, value: u = null }) {
    r && r != this.panel && this.current && !this.current.onLeave() || (this.panel = r || this.panel, this.current && (this.current.view = s || this.current.index || "", this.current.value = u));
  }
}
class TE {
  constructor(r = null) {
    oe(this, "state", ir.none());
    r && Bi(this, r);
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
  queryset(r = null, s = !1) {
    let u = this.repo.query();
    if (this.relations)
      for (const l of this.relations)
        u = u.with(l);
    return r ? u.whereId(r) : u;
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
  async load(r = {}) {
    this.state.processing();
    let s = null;
    try {
      s = await this.fetch(r), s = await this.handleResponse(r, s);
    } catch (u) {
      this.state.error(u);
    }
    return this.state.isError || this.state.none(), s;
  }
  /** Fetch model instance from the server.
   *
   * Flowchart:
   * - {@link ModelController.getQueryParams}
   * - {@link Query.fetch}
   */
  async fetch(r = {}) {
    const s = this.getQueryOptions(r);
    return await this.query.fetch(s);
  }
  /** Handle response from the {@link ModelContainer.fetch}'s request. */
  async handleResponse(r, s) {
    return s;
  }
  /** Get {@link Query.fetch} options. */
  getQueryOptions(r) {
    return !r.relations && this.relations && (r.relations = this.relations), "dataKey" in r || (r.dataKey = this.dataKey), r.url || (r.url = this.getQueryUrl(r)), r;
  }
  getQueryUrl(r) {
    var s;
    return this.url || ((s = this.model.meta) == null ? void 0 : s.url);
  }
}
class IE extends TE {
  constructor() {
    super(...arguments);
    oe(this, "ids", []);
    oe(this, "filters", {});
    oe(this, "nextUrl", null);
    oe(this, "prevUrl", null);
    oe(this, "count", null);
    oe(this, "dataKey", "results");
    oe(this, "nextKey", "next");
    oe(this, "prevKey", "previous");
    oe(this, "countKey", "count");
  }
  /** Get items count. */
  get length() {
    return this.ids.length;
  }
  /** Get item by list index */
  get(s) {
    return s < this.ids.length ? this.ids[s] : null;
  }
  /** Get item index by id */
  findIndex(s) {
    return this.ids.indexOf(s);
  }
  /**
   * Get item id next to provided one at the specified direction.
   *
   * @param item - reference item
   * @param step - increment or decrement item index by this value.
   * @return the target item id or null if not found.
   */
  getSiblingIndex(s, u) {
    if (s === null)
      return -1;
    const l = this.findIndex(s.id), f = l >= 0 ? l + u : -1;
    return f >= 0 && f < this.ids.length ? f : -1;
  }
  /**
   * Fetch next items from API, override `url` using {@link ModelList.nextUrl}.
   */
  async loadNext(s) {
    return await this.load({ ...s, url: this.nextUrl });
  }
  /**
   * Fetch previous items from API, override `url` using {@link ModelList.prevUrl}.
   */
  async loadPrev(s) {
    return await this.load({ ...s, url: this.prevUrl });
  }
  getQueryOptions(s) {
    return this.filters && (s.params = { ...this.filters, ...s.params ?? [] }), super.getQueryOptions(s);
  }
  /** Fetch items from API (using self's {@link Query.fetch}). */
  async handleResponse({ append: s = !1, ...u }, l) {
    if (l = await super.handleResponse(u, l), !this.state.isError) {
      const f = [..._c(l.entities, "id")];
      this.ids = s ? this.ids.concat(f) : f, this.nextUrl = l.response.data[this.nextKey] || null, this.prevUrl = l.response.data[this.prevKey] || null, this.count = l.response.data[this.countKey] || this.ids.length;
    }
    return l;
  }
}
class AE extends tf {
  constructor(r) {
    r.fields = Object.keys(r.props.repo.use.fields()), super(r);
  }
  get repo() {
    return this.props.repo;
  }
  isEdited() {
    return !tr.isEqual(tr.pick(this.value, this.fields), tr.pick(this.initial, this.fields));
  }
  get url() {
    var s, u;
    const r = super.url || ((u = (s = this.repo.use) == null ? void 0 : s.meta) == null ? void 0 : u.url);
    if (!r)
      throw Error("No url specified as parameter or in Model.meta.");
    return r;
  }
  reset(r) {
    r ?? (r = {});
    const s = this.fields.filter((u) => u in r);
    this.value = tr.cloneDeep(tr.pick(r, s)) || {}, this.state.none();
  }
  serialize(r) {
    const s = this.repo.use;
    return new s({ ...this.value }).$toJson(null, { relations: !1 });
  }
  send(r) {
    let [s, u] = ["post", this.url];
    return r.id && (u = `${u}${r.id}/`, s = "put"), this.repo.api()[s](u, r).then(
      (l) => ir.ok(l.entities[0]),
      (l) => ir.error(l.response.data)
    );
  }
}
class SE extends wE {
  constructor(s) {
    var u;
    super(s);
    oe(this, "showFilters", !1);
    this.showFilters = ((u = this.props) == null ? void 0 : u.showFilters) || !1;
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
    var s;
    return super.icon || ((s = this.model.meta) == null ? void 0 : s.icon);
  }
  /** Return panel's title based on view and current item. */
  get title() {
    var d, y;
    const { props: s, list: u, panels: l } = this, f = this.repo.use;
    if (f) {
      if ((d = this.view) != null && d.startsWith("list."))
        return rr(hc.model(f), 3);
      if ((y = this.view) != null && y.startsWith("detail.") && this.value) {
        if (this.value.$title)
          return this.value.$title;
        const E = rr(hc.model(f));
        return this.value.id ? rr("models._.title", { model: E, id: this.value.id }) : rr("models._.title.new", { model: E });
      }
    }
    return super.title;
  }
  /**
   * Edit a new item.
   *
   * @param view - edit view.
   */
  create(s = "detail.edit") {
    this.show({ view: s, value: null });
  }
  /** Called when an item has been created. By default, show edit view. */
  created(s, u = "detail.edit") {
    this.show({ view: u, value: s });
  }
  onViewChange(s) {
    super.onViewChange(s), s.startsWith("list.") && this.list.load();
  }
  onValueChange(s) {
  }
}
function VE(n) {
  const r = kn(new LE(n));
  return $t("panels", r), r;
}
function OE(n, r) {
  const s = kn(new r(n));
  return $t("panel", s), yc(() => s.panels.register(s.name, s)), Ec(() => s.panels.unregister(s.name)), s.onViewChange && En(() => s.view, (u) => s.onViewChange(u)), { panel: s };
}
function KE({ query: n, repos: r, ...s }) {
  r ?? (r = xr("repos")), n ?? (n = RE(s.props.repo, xr("repos"))), s.panels ?? (s.panels = xr("panels"));
  const { list: u, items: l } = CE({ query: n, relations: s.props.relations }), { panel: f } = OE({ list: u, ...s }, SE), d = Ct(() => {
    const E = u.getSiblingIndex(Fn(f.value), 1);
    return l.value[E] ?? null;
  }), y = Ct(() => {
    const E = u.getSiblingIndex(Fn(f.value), -1);
    return l.value[E] ?? null;
  });
  return { panels: f.panels, panel: f, list: u, items: l, next: d, prev: y };
}
function CE(n, r = IE) {
  const s = kn(new r(n)), u = Ct(() => s.ids ? s.queryset(s.ids).get() : []);
  return $t("list", s), $t("items", u), { list: s, items: u };
}
function RE(n, r = null) {
  const s = new Ur(n, r);
  return $t("query", s), s;
}
function DE(n, r = tf) {
  n.initial || Fn;
  const s = kn(new r(n));
  $t("editor", s);
  const u = Ct(() => s.isEdited());
  En(() => s.initial, (f) => s.reset(f || s.default));
  const l = xr("panel");
  return l && En(() => s.edited, (f) => l.setEdition(s.name, f)), { editor: s, edited: u };
}
function qE(n, r = AE) {
  return DE(n, r);
}
function XE(n) {
  return (r) => !r || n(r);
}
function ZE(n) {
  return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(n) || rr("fields.email.rule");
}
function JE(n) {
  return /^[A-Za-z0-9@.+\-_]+$/.test(n) || "Username must not be empty. It only can contain letters, numbers and @/+/./- special characters";
}
function QE(n, r) {
  return av(() => import(n).then((s) => r ? Object.values(s).filter((l) => l.__name == r)[0] : s));
}
export {
  Sv as AppContext,
  tf as Editor,
  TE as ModelController,
  AE as ModelEditor,
  IE as ModelList,
  SE as ModelPanel,
  wE as Panel,
  LE as Panels,
  Ur as Query,
  ir as State,
  eb as States,
  Bi as assignNonEmpty,
  _c as collectAttr,
  Oa as config,
  EE as createApp,
  vE as createI18n,
  YE as createPinia,
  bE as createVuetify,
  tb as csrfToken,
  QE as defineAsyncComponent,
  ZE as emailRule,
  nb as filterSlots,
  rb as getCookie,
  Z0 as getCookieList,
  ib as getCsrf,
  Gi as i18n,
  HE as init,
  sb as injectOrProvide,
  cc as loadedLocalePaths,
  ab as mapToObject,
  kE as models,
  XE as optionalRule,
  GE as query,
  j0 as reset,
  BE as setLocale,
  ub as shallowCopy,
  rr as t,
  hc as tKeys,
  $E as useAction,
  UE as useAppContext,
  DE as useEditor,
  yE as useI18n,
  qE as useModelEditor,
  CE as useModelList,
  KE as useModelPanel,
  Iv as useModels,
  OE as usePanel,
  VE as usePanels,
  Av as usePermissions,
  WE as usePermissionsProps,
  RE as useQuery,
  JE as usernameRule
};
//# sourceMappingURL=ox.js.map
