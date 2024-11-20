import { C as H, G as W, M as U, a as G, P as _, b as $, U as K, S as p, r as Z, c as j, p as T, m as I, d as J, e as z, f as q, g as Q, h as X, i as ee, j as te, D as S, k as v, T as A, I as Y, L as O, l as ne, n as re, o as ae, q as se, s as oe, t as C, u as ie, v as ue, w as ce, x as le, y as de } from "./index-DDlGN9Dw.js";
import { R as St, F as vt, a0 as At, a9 as Yt, a4 as Ot, A as Ft, V as Pt, W as Vt, a7 as It, z as Ct, aa as Et, a8 as Lt, O as Nt, N as Bt, K as Rt, E as xt, a5 as Ht, a1 as Wt, a2 as Ut, J as Gt, a6 as _t, B as $t, Y as Kt, X as Zt, H as jt, Q as Jt, a3 as zt, Z as qt, $ as Qt, _ as Xt } from "./index-DDlGN9Dw.js";
import { reactive as D, unref as me, computed as he, isRef as fe, watch as b, nextTick as ge, createApp as De } from "vue";
import ye from "axios";
import { v as Me } from "./vuetify-RRDtTCor.js";
const Mt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentType: H,
  Group: W,
  Meta: U,
  Model: G,
  Permission: _,
  Permissions: $,
  User: K
}, Symbol.toStringTag, { value: "Module" }));
class E {
  static reactive({ initial: e, ...t }) {
    const r = D(new this({ initial: me(e), ...t }));
    return r.edited = he(() => r.isEdited()), fe(e) && b(e, (a) => r.reset(a)), r;
  }
  constructor({ initial: e, name: t = null, saved: r = null, url: a = null, state: o = new p() }, s = {}) {
    this.initial = e, this.name = t, this.saved = r, this.url = a, this.state = o;
    for (const d in s)
      this[d] = s[d];
    this.value = {}, this.reset(e);
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
    Z(this.value, e);
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
  serialize(e) {
    return e;
  }
  send(e) {
    throw "not implemented";
  }
}
class pe extends E {
  constructor({ repo: e, url: t, ...r }) {
    var a, o;
    t = t || ((o = (a = e.use) == null ? void 0 : a.meta) == null ? void 0 : o.url), super({ url: t, ...r }, { repo: e });
  }
  get fields() {
    return this._fields || (this._fields = Object.keys(this.repo.use.fields())), this._fields;
  }
  _reset(e) {
    this.value = D(new this.initial.constructor()), this.fields.reduce((t, r) => (t[r] = e[r], t), this.value);
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
      (a) => p.ok(a.entities[0]),
      (a) => p.error(a.response.data)
    );
  }
}
function we({ editorClass: n = E, emits: e = null, panel: t = null, ...r }) {
  e && (r.saved ?? (r.saved = (o, s) => e("saved", o, s)));
  const a = n.reactive(r);
  return t && b(() => a.edited, (o) => t.setEdition(a.name, o)), a;
}
function pt(n) {
  return we({ ...n, editorClass: pe });
}
const y = {
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
function be(n, e, t) {
  const r = [];
  let a = [];
  const o = L(n), s = N(n), d = t ?? y[e.slice(-2).toUpperCase()] ?? 0, m = (o.getDay() - d + 7) % 7, f = (s.getDay() - d + 7) % 7;
  for (let u = 0; u < m; u++) {
    const c = new Date(o);
    c.setDate(c.getDate() - (m - u)), a.push(c);
  }
  for (let u = 1; u <= s.getDate(); u++) {
    const c = new Date(n.getFullYear(), n.getMonth(), u);
    a.push(c), a.length === 7 && (r.push(a), a = []);
  }
  for (let u = 1; u < 7 - f; u++) {
    const c = new Date(s);
    c.setDate(c.getDate() + u), a.push(c);
  }
  return a.length > 0 && r.push(a), r;
}
function ke(n, e, t) {
  const r = t ?? y[e.slice(-2).toUpperCase()] ?? 0, a = new Date(n);
  for (; a.getDay() !== r; )
    a.setDate(a.getDate() - 1);
  return a;
}
function Te(n, e) {
  const t = new Date(n), r = ((y[e.slice(-2).toUpperCase()] ?? 0) + 6) % 7;
  for (; t.getDay() !== r; )
    t.setDate(t.getDate() + 1);
  return t;
}
function L(n) {
  return new Date(n.getFullYear(), n.getMonth(), 1);
}
function N(n) {
  return new Date(n.getFullYear(), n.getMonth() + 1, 0);
}
function Se(n) {
  const e = n.split("-").map(Number);
  return new Date(e[0], e[1] - 1, e[2]);
}
const ve = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
function B(n) {
  if (n == null) return /* @__PURE__ */ new Date();
  if (n instanceof Date) return n;
  if (typeof n == "string") {
    let e;
    if (ve.test(n))
      return Se(n);
    if (e = Date.parse(n), !isNaN(e)) return new Date(e);
  }
  return null;
}
const F = new Date(2e3, 0, 2);
function Ae(n, e) {
  const t = e ?? y[n.slice(-2).toUpperCase()] ?? 0;
  return j(7).map((r) => {
    const a = new Date(F);
    return a.setDate(F.getDate() + t + r), new Intl.DateTimeFormat(n, {
      weekday: "narrow"
    }).format(a);
  });
}
function Ye(n, e, t, r) {
  const a = B(n) ?? /* @__PURE__ */ new Date(), o = r == null ? void 0 : r[e];
  if (typeof o == "function")
    return o(a, e, t);
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
      const d = a.getDate(), m = new Intl.DateTimeFormat(t, {
        month: "long"
      }).format(a);
      return `${d} ${m}`;
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
      return new Intl.NumberFormat(t).format(a.getDate());
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
      s = o ?? {
        timeZone: "UTC",
        timeZoneName: "short"
      };
  }
  return new Intl.DateTimeFormat(t, s).format(a);
}
function Oe(n, e) {
  const t = n.toJsDate(e), r = t.getFullYear(), a = T(String(t.getMonth() + 1), 2, "0"), o = T(String(t.getDate()), 2, "0");
  return `${r}-${a}-${o}`;
}
function Fe(n) {
  const [e, t, r] = n.split("-").map(Number);
  return new Date(e, t - 1, r);
}
function Pe(n, e) {
  const t = new Date(n);
  return t.setMinutes(t.getMinutes() + e), t;
}
function Ve(n, e) {
  const t = new Date(n);
  return t.setHours(t.getHours() + e), t;
}
function Ie(n, e) {
  const t = new Date(n);
  return t.setDate(t.getDate() + e), t;
}
function Ce(n, e) {
  const t = new Date(n);
  return t.setDate(t.getDate() + e * 7), t;
}
function Ee(n, e) {
  const t = new Date(n);
  return t.setDate(1), t.setMonth(t.getMonth() + e), t;
}
function Le(n) {
  return n.getFullYear();
}
function Ne(n) {
  return n.getMonth();
}
function Be(n) {
  return n.getDate();
}
function Re(n) {
  return new Date(n.getFullYear(), n.getMonth() + 1, 1);
}
function xe(n) {
  return new Date(n.getFullYear(), n.getMonth() - 1, 1);
}
function He(n) {
  return n.getHours();
}
function We(n) {
  return n.getMinutes();
}
function Ue(n) {
  return new Date(n.getFullYear(), 0, 1);
}
function Ge(n) {
  return new Date(n.getFullYear(), 11, 31);
}
function _e(n, e) {
  return g(n, e[0]) && Ze(n, e[1]);
}
function $e(n) {
  const e = new Date(n);
  return e instanceof Date && !isNaN(e.getTime());
}
function g(n, e) {
  return n.getTime() > e.getTime();
}
function Ke(n, e) {
  return g(w(n), w(e));
}
function Ze(n, e) {
  return n.getTime() < e.getTime();
}
function P(n, e) {
  return n.getTime() === e.getTime();
}
function je(n, e) {
  return n.getDate() === e.getDate() && n.getMonth() === e.getMonth() && n.getFullYear() === e.getFullYear();
}
function Je(n, e) {
  return n.getMonth() === e.getMonth() && n.getFullYear() === e.getFullYear();
}
function ze(n, e) {
  return n.getFullYear() === e.getFullYear();
}
function qe(n, e, t) {
  const r = new Date(n), a = new Date(e);
  switch (t) {
    case "years":
      return r.getFullYear() - a.getFullYear();
    case "quarters":
      return Math.floor((r.getMonth() - a.getMonth() + (r.getFullYear() - a.getFullYear()) * 12) / 4);
    case "months":
      return r.getMonth() - a.getMonth() + (r.getFullYear() - a.getFullYear()) * 12;
    case "weeks":
      return Math.floor((r.getTime() - a.getTime()) / (1e3 * 60 * 60 * 24 * 7));
    case "days":
      return Math.floor((r.getTime() - a.getTime()) / (1e3 * 60 * 60 * 24));
    case "hours":
      return Math.floor((r.getTime() - a.getTime()) / (1e3 * 60 * 60));
    case "minutes":
      return Math.floor((r.getTime() - a.getTime()) / (1e3 * 60));
    case "seconds":
      return Math.floor((r.getTime() - a.getTime()) / 1e3);
    default:
      return r.getTime() - a.getTime();
  }
}
function Qe(n, e) {
  const t = new Date(n);
  return t.setHours(e), t;
}
function Xe(n, e) {
  const t = new Date(n);
  return t.setMinutes(e), t;
}
function et(n, e) {
  const t = new Date(n);
  return t.setMonth(e), t;
}
function tt(n, e) {
  const t = new Date(n);
  return t.setDate(e), t;
}
function nt(n, e) {
  const t = new Date(n);
  return t.setFullYear(e), t;
}
function w(n) {
  return new Date(n.getFullYear(), n.getMonth(), n.getDate(), 0, 0, 0, 0);
}
function rt(n) {
  return new Date(n.getFullYear(), n.getMonth(), n.getDate(), 23, 59, 59, 999);
}
class at {
  constructor(e) {
    this.locale = e.locale, this.formats = e.formats;
  }
  date(e) {
    return B(e);
  }
  toJsDate(e) {
    return e;
  }
  toISO(e) {
    return Oe(this, e);
  }
  parseISO(e) {
    return Fe(e);
  }
  addMinutes(e, t) {
    return Pe(e, t);
  }
  addHours(e, t) {
    return Ve(e, t);
  }
  addDays(e, t) {
    return Ie(e, t);
  }
  addWeeks(e, t) {
    return Ce(e, t);
  }
  addMonths(e, t) {
    return Ee(e, t);
  }
  getWeekArray(e, t) {
    return be(e, this.locale, t ? Number(t) : void 0);
  }
  startOfWeek(e, t) {
    return ke(e, this.locale, t ? Number(t) : void 0);
  }
  endOfWeek(e) {
    return Te(e, this.locale);
  }
  startOfMonth(e) {
    return L(e);
  }
  endOfMonth(e) {
    return N(e);
  }
  format(e, t) {
    return Ye(e, t, this.locale, this.formats);
  }
  isEqual(e, t) {
    return P(e, t);
  }
  isValid(e) {
    return $e(e);
  }
  isWithinRange(e, t) {
    return _e(e, t);
  }
  isAfter(e, t) {
    return g(e, t);
  }
  isAfterDay(e, t) {
    return Ke(e, t);
  }
  isBefore(e, t) {
    return !g(e, t) && !P(e, t);
  }
  isSameDay(e, t) {
    return je(e, t);
  }
  isSameMonth(e, t) {
    return Je(e, t);
  }
  isSameYear(e, t) {
    return ze(e, t);
  }
  setMinutes(e, t) {
    return Xe(e, t);
  }
  setHours(e, t) {
    return Qe(e, t);
  }
  setMonth(e, t) {
    return et(e, t);
  }
  setDate(e, t) {
    return tt(e, t);
  }
  setYear(e, t) {
    return nt(e, t);
  }
  getDiff(e, t, r) {
    return qe(e, t, r);
  }
  getWeekdays(e) {
    return Ae(this.locale, e ? Number(e) : void 0);
  }
  getYear(e) {
    return Le(e);
  }
  getMonth(e) {
    return Ne(e);
  }
  getDate(e) {
    return Be(e);
  }
  getNextMonth(e) {
    return Re(e);
  }
  getPreviousMonth(e) {
    return xe(e);
  }
  getHours(e) {
    return He(e);
  }
  getMinutes(e) {
    return We(e);
  }
  startOfDay(e) {
    return w(e);
  }
  endOfDay(e) {
    return rt(e);
  }
  startOfYear(e) {
    return Ue(e);
  }
  endOfYear(e) {
    return Ge(e);
  }
}
const st = Symbol.for("vuetify:date-options"), V = Symbol.for("vuetify:date-adapter");
function ot(n, e) {
  const t = I({
    adapter: at,
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
    instance: it(t, e)
  };
}
function it(n, e) {
  const t = D(typeof n.adapter == "function" ? new n.adapter({
    locale: n.locale[e.current.value] ?? e.current.value,
    formats: n.formats
  }) : n.adapter);
  return b(e.current, (r) => {
    t.locale = n.locale[r] ?? r ?? t.locale;
  }), t;
}
function R() {
  let n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    blueprint: e,
    ...t
  } = n, r = I(e, t), {
    aliases: a = {},
    components: o = {},
    directives: s = {}
  } = r, d = J(r.defaults), m = z(r.display, r.ssr), f = q(r.theme), u = Q(r.icons), c = X(r.locale), M = ot(r.date, c), k = ee(r.goTo, c);
  return {
    install: (i) => {
      for (const l in s)
        i.directive(l, s[l]);
      for (const l in o)
        i.component(l, o[l]);
      for (const l in a)
        i.component(l, te({
          ...a[l],
          name: l,
          aliasName: a[l].name
        }));
      if (f.install(i), i.provide(S, d), i.provide(v, m), i.provide(A, f), i.provide(Y, u), i.provide(O, c), i.provide(st, M.options), i.provide(V, M.instance), i.provide(ne, k), re && r.ssr)
        if (i.$nuxt)
          i.$nuxt.hook("app:suspense:resolve", () => {
            m.update();
          });
        else {
          const {
            mount: l
          } = i;
          i.mount = function() {
            const x = l(...arguments);
            return ge(() => m.update()), i.mount = l, x;
          };
        }
      ae.reset(), i.mixin({
        computed: {
          $vuetify() {
            return D({
              defaults: h.call(this, S),
              display: h.call(this, v),
              theme: h.call(this, A),
              icons: h.call(this, Y),
              locale: h.call(this, O),
              date: h.call(this, V)
            });
          }
        }
      });
    },
    defaults: d,
    display: m,
    theme: f,
    icons: u,
    locale: c,
    date: M,
    goTo: k
  };
}
const ut = "3.7.3";
R.version = ut;
function h(n) {
  var r, a;
  const e = this.$, t = ((r = e.parent) == null ? void 0 : r.provides) ?? ((a = e.vnode.appContext) == null ? void 0 : a.provides);
  if (t && n in t)
    return t[n];
}
const ct = {
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
      mdi: se
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
function wt({ App: n = null, el: e = "#app", ...t } = {}, r = !0) {
  function a() {
    const o = lt(n, t), s = e ? o.mount(e) : null;
    return document.body.classList.remove("loading"), { app: o, el: e, vm: s };
  }
  return new Promise((o) => {
    if (r)
      return window.addEventListener(
        "load",
        () => o(a())
      );
    o(a());
  });
}
function lt(n, { props: e = {}, vuetify: t = {}, plugins: r = null } = {}) {
  return n = De(n, e), n.config.globalProperties.window = window, n.use(mt(t)), n.use(dt()), r && r.forEach((a) => n.use(a)), n;
}
function dt() {
  const e = (oe("lang", ",") || ["en"]).map(
    (t) => t.toLowerCase().replace(/[_-](\w+)/, "")
  ).find((t) => t in C.locales);
  return ie({
    legacy: !1,
    fallbackLocale: "en",
    locale: e
  });
}
function mt({ components: n = {}, ...e }) {
  return e.components = {
    ...Me,
    ...n
  }, R({
    blueprint: ct,
    theme: {},
    ...e
  });
}
function bt({ axiosConfig: n = null, baseURL: e = null } = {}) {
  e || (e = document.body.dataset.apiUrl);
  const t = ue(), r = ce({});
  return r().use(
    le({
      axios: ye,
      ...n || C.axiosConfig,
      baseURL: e
    })
  ), de(t), t.use(r);
}
export {
  St as ApiList,
  vt as AppContext,
  E as Editor,
  pe as ModelEditor,
  At as Panel,
  p as State,
  Yt as States,
  Ot as aggregateValues,
  Ft as api,
  Pt as apiList,
  Vt as apiListProps,
  C as config,
  lt as createApp,
  dt as createI18n,
  bt as createPinia,
  mt as createVuetify,
  It as csrfToken,
  Ct as defineAsyncComponent,
  we as editor,
  Et as filterSlots,
  oe as getCookie,
  Lt as getCsrf,
  wt as init,
  Nt as loadLocale,
  Bt as loadLocaleFrom,
  Rt as loadedLocalePaths,
  xt as makeModelApiAction,
  Ht as mapToObject,
  pt as modelEditor,
  Mt as models,
  Wt as panelNavProps,
  Ut as panelProps,
  Z as reset,
  Gt as setLocale,
  _t as shallowCopy,
  $t as useAction,
  Kt as useApiList,
  Zt as useApiListProps,
  jt as useAppContext,
  Jt as useI18n,
  zt as useModelPanelProps,
  qt as useModels,
  Qt as usePermissions,
  Xt as usePermissionsProps
};
//# sourceMappingURL=ox.js.map
