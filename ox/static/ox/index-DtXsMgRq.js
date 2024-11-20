var Bd = Object.defineProperty;
var Hd = (e, t, n) => t in e ? Bd(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Ye = (e, t, n) => Hd(e, typeof t != "symbol" ? t + "" : t, n);
import { effectScope as An, ref as Y, markRaw as fo, hasInjectionContext as vo, inject as ye, watch as ne, reactive as Xe, isRef as It, isReactive as ho, toRaw as Fe, getCurrentScope as Wd, onScopeDispose as Ge, nextTick as We, toRefs as On, computed as _, provide as Ee, unref as De, defineComponent as za, h as zt, getCurrentInstance as xn, onMounted as Lt, onUnmounted as Kd, Fragment as he, shallowRef as J, createVNode as h, Text as mo, watchEffect as rt, capitalize as Ln, isVNode as jd, Comment as Ud, warn as Ga, camelize as go, mergeProps as q, onBeforeUnmount as st, readonly as Er, onDeactivated as yo, onActivated as zd, TransitionGroup as xr, Transition as Xt, toRef as K, onBeforeMount as bo, withDirectives as Je, resolveDirective as Qt, vShow as mn, onUpdated as Gd, resolveDynamicComponent as Yd, onBeforeUpdate as qd, Teleport as Xd, cloneVNode as Qd, createTextVNode as zl, withModifiers as oi, toDisplayString as Jd, defineAsyncComponent as Zd } from "vue";
import "axios";
const Ue = {
  NONE: Symbol("none"),
  PROCESSING: Symbol("processing"),
  SENDING: Symbol("sending"),
  SENT: Symbol("sent"),
  OK: Symbol("ok"),
  ERROR: Symbol("error")
};
class ef {
  constructor(t = Ue.NONE, n = null) {
    Ye(this, "state");
    Ye(this, "data");
    this.state = t, this.data = n;
  }
  static none(t = null) {
    return new this(Ue.NONE, t);
  }
  static ok(t = null) {
    return new this(Ue.OK, t);
  }
  static processing(t = null) {
    return new this(Ue.PROCESSING, t);
  }
  static sending(t = null) {
    return new this(Ue.SENDING, t);
  }
  static error(t = null) {
    return new this(Ue.ERROR, t);
  }
  none(t = null) {
    return this.state = Ue.NONE, this.data = t, this;
  }
  ok(t = null) {
    return this.state = Ue.OK, this.data = t, this;
  }
  processing(t = null) {
    return this.state = Ue.PROCESSING, this.data = t, this;
  }
  sending(t = null) {
    return this.state = Ue.SENDING, this.data = t, this;
  }
  error(t = null) {
    return this.state = Ue.ERROR, this.data = t, this;
  }
  get isNone() {
    return this.state == Ue.NONE;
  }
  get isOk() {
    return this.state == Ue.OK;
  }
  get isProcessing() {
    return this.state == Ue.PROCESSING;
  }
  get isSending() {
    return this.state == Ue.SENDING;
  }
  get isError() {
    return this.state == Ue.ERROR;
  }
}
function aS(e, t, { exclude: n = null } = {}) {
  return Object.keys(e).filter((a) => a.startsWith(t) && a != n).reduce((a, l) => (a[l] = l.replace(t, ""), a), {});
}
function po(e, t) {
  let n = /* @__PURE__ */ new Set();
  for (const a of e) {
    const l = a[t];
    l && (Array.isArray(l) ? n = n.union(new Set(l)) : n.add(l));
  }
  return n;
}
function lS(e, t) {
  return Array.isArray(e) || (e = Object.keys(e)), e.reduce((n, a) => (n[a] = t instanceof Function ? t(a) : t[a], n), {});
}
function rS(e, t = void 0) {
  for (const n of Object.keys(e)) {
    const a = t == null ? void 0 : t[n];
    !t || a === void 0 ? delete e[n] : e[n] = t[n];
  }
  if (t)
    for (const [n, a] of Object.entries(t))
      n in e || (e[n] = a);
  return e;
}
function iS(e, t = {}) {
  const n = Object.create(Object.getPrototypeOf(e));
  return Object.assign(n, { ...e, ...t });
}
function tf(e, t = null) {
  if (document.cookie && document.cookie !== "") {
    const n = document.cookie.split(";").find((l) => l.trim().startsWith(e + "=")), a = n ? decodeURIComponent(n.split("=")[1]) : null;
    return a && t ? a.split(t) : a;
  }
  return null;
}
var wl = null;
function ui() {
  return wl === null && (wl = tf("csrftoken")), wl;
}
const nf = {
  csrfToken: ui(),
  axiosConfig: {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-CSRFToken": ui()
    },
    paramsSerializer: {
      indexes: null
      // by default: false
    }
  },
  locales: {
    fr: "Français",
    en: "English"
  }
};
var af = !1;
/*!
 * pinia v2.2.6
 * (c) 2024 Eduardo San Martin Morote
 * @license MIT
 */
let Pr;
const Ya = (e) => Pr = e, lf = () => vo() && ye($r) || Pr, $r = (
  /* istanbul ignore next */
  Symbol()
);
function Gl(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var Kn;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Kn || (Kn = {}));
function sS() {
  const e = An(!0), t = e.run(() => Y({}));
  let n = [], a = [];
  const l = fo({
    install(r) {
      Ya(l), l._a = r, r.provide($r, l), r.config.globalProperties.$pinia = l, a.forEach((i) => n.push(i)), a = [];
    },
    use(r) {
      return !this._a && !af ? a.push(r) : n.push(r), this;
    },
    _p: n,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return l;
}
const _o = () => {
};
function ci(e, t, n, a = _o) {
  e.push(t);
  const l = () => {
    const r = e.indexOf(t);
    r > -1 && (e.splice(r, 1), a());
  };
  return !n && Wd() && Ge(l), l;
}
function bn(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
const rf = (e) => e(), di = Symbol(), Cl = Symbol();
function Yl(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((n, a) => e.set(a, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const a = t[n], l = e[n];
    Gl(l) && Gl(a) && e.hasOwnProperty(n) && !It(a) && !ho(a) ? e[n] = Yl(l, a) : e[n] = a;
  }
  return e;
}
const sf = (
  /* istanbul ignore next */
  Symbol()
);
function of(e) {
  return !Gl(e) || !e.hasOwnProperty(sf);
}
const { assign: qt } = Object;
function uf(e) {
  return !!(It(e) && e.effect);
}
function cf(e, t, n, a) {
  const { state: l, actions: r, getters: i } = t, s = n.state.value[e];
  let o;
  function u() {
    s || (n.state.value[e] = l ? l() : {});
    const c = On(n.state.value[e]);
    return qt(c, r, Object.keys(i || {}).reduce((f, d) => (f[d] = fo(_(() => {
      Ya(n);
      const m = n._s.get(e);
      return i[d].call(m, m);
    })), f), {}));
  }
  return o = So(e, u, t, n, a, !0), o;
}
function So(e, t, n = {}, a, l, r) {
  let i;
  const s = qt({ actions: {} }, n), o = { deep: !0 };
  let u, c, f = [], d = [], m;
  const v = a.state.value[e];
  !r && !v && (a.state.value[e] = {}), Y({});
  let g;
  function b(S) {
    let E;
    u = c = !1, typeof S == "function" ? (S(a.state.value[e]), E = {
      type: Kn.patchFunction,
      storeId: e,
      events: m
    }) : (Yl(a.state.value[e], S), E = {
      type: Kn.patchObject,
      payload: S,
      storeId: e,
      events: m
    });
    const A = g = Symbol();
    We().then(() => {
      g === A && (u = !0);
    }), c = !0, bn(f, E, a.state.value[e]);
  }
  const y = r ? function() {
    const { state: E } = n, A = E ? E() : {};
    this.$patch((O) => {
      qt(O, A);
    });
  } : (
    /* istanbul ignore next */
    _o
  );
  function p() {
    i.stop(), f = [], d = [], a._s.delete(e);
  }
  const x = (S, E = "") => {
    if (di in S)
      return S[Cl] = E, S;
    const A = function() {
      Ya(a);
      const O = Array.from(arguments), T = [], L = [];
      function M(Q) {
        T.push(Q);
      }
      function j(Q) {
        L.push(Q);
      }
      bn(d, {
        args: O,
        name: A[Cl],
        store: I,
        after: M,
        onError: j
      });
      let z;
      try {
        z = S.apply(this && this.$id === e ? this : I, O);
      } catch (Q) {
        throw bn(L, Q), Q;
      }
      return z instanceof Promise ? z.then((Q) => (bn(T, Q), Q)).catch((Q) => (bn(L, Q), Promise.reject(Q))) : (bn(T, z), z);
    };
    return A[di] = !0, A[Cl] = E, A;
  }, w = {
    _p: a,
    // _s: scope,
    $id: e,
    $onAction: ci.bind(null, d),
    $patch: b,
    $reset: y,
    $subscribe(S, E = {}) {
      const A = ci(f, S, E.detached, () => O()), O = i.run(() => ne(() => a.state.value[e], (T) => {
        (E.flush === "sync" ? c : u) && S({
          storeId: e,
          type: Kn.direct,
          events: m
        }, T);
      }, qt({}, o, E)));
      return A;
    },
    $dispose: p
  }, I = Xe(w);
  a._s.set(e, I);
  const C = (a._a && a._a.runWithContext || rf)(() => a._e.run(() => (i = An()).run(() => t({ action: x }))));
  for (const S in C) {
    const E = C[S];
    if (It(E) && !uf(E) || ho(E))
      r || (v && of(E) && (It(E) ? E.value = v[S] : Yl(E, v[S])), a.state.value[e][S] = E);
    else if (typeof E == "function") {
      const A = x(E, S);
      C[S] = A, s.actions[S] = E;
    }
  }
  return qt(I, C), qt(Fe(I), C), Object.defineProperty(I, "$state", {
    get: () => a.state.value[e],
    set: (S) => {
      b((E) => {
        qt(E, S);
      });
    }
  }), a._p.forEach((S) => {
    qt(I, i.run(() => S({
      store: I,
      app: a._a,
      pinia: a,
      options: s
    })));
  }), v && r && n.hydrate && n.hydrate(I.$state, v), u = !0, c = !0, I;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function df(e, t, n) {
  let a, l;
  const r = typeof t == "function";
  typeof e == "string" ? (a = e, l = r ? n : t) : (l = e, a = e.id);
  function i(s, o) {
    const u = vo();
    return s = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    s || (u ? ye($r, null) : null), s && Ya(s), s = Pr, s._s.has(a) || (r ? So(a, t, l, s) : cf(a, l, s)), s._s.get(a);
  }
  return i.$id = a, i;
}
function ff(e, t, n) {
  switch (n) {
    case ">":
      return e > t;
    case ">=":
      return e >= t;
    case "<":
      return e < t;
    case "<=":
      return e <= t;
    case "=":
      return e === t;
    case "!=":
      return e !== t;
    default:
      return e === t;
  }
}
function ql(e) {
  return e == null;
}
function wo(e) {
  return e instanceof Date && !Number.isNaN(e.getTime()) && typeof e.toISOString == "function";
}
function Se(e) {
  return Array.isArray(e);
}
function Il(e) {
  return typeof e == "function";
}
function pn(e) {
  return vf(e) === 0;
}
function vf(e) {
  return Se(e) ? e.length : Object.keys(e).length;
}
function hf(e, t, n, a = "SORT_REGULAR") {
  let l = -1;
  const r = e.map((i) => ({ criteria: t.map((o) => {
    if (typeof o == "function")
      return o(i);
    const u = Co(i, o, !1);
    return wo(u) ? new Date(u).getTime() : u;
  }), index: ++l, value: i }));
  return mf(r, (i, s) => gf(i, s, n, a));
}
function mf(e, t) {
  let n = e.length;
  e.sort(t);
  const a = [];
  for (; n--; )
    a[n] = e[n].value;
  return a;
}
function gf(e, t, n, a) {
  let l = -1;
  const r = e.criteria, i = t.criteria, s = r.length;
  for (; ++l < s; ) {
    const o = yf(r[l], i[l], a);
    if (o) {
      const u = n[l];
      return o * (u === "desc" ? -1 : 1);
    }
  }
  return e.index - t.index;
}
function yf(e, t, n) {
  if (e !== t) {
    const a = e !== void 0, l = e === null, r = e === e, i = t !== void 0, s = t === null;
    return (typeof e != "number" || typeof t != "number") && (e = String(e), t = String(t), n === "SORT_FLAG_CASE" && (e = e.toUpperCase(), t = t.toUpperCase())), !s && e > t || l && i || !a || !r ? 1 : -1;
  }
  return 0;
}
function bf(e, t) {
  return e.reduce((n, a) => {
    const l = t(a);
    return n[l] === void 0 && (n[l] = []), n[l].push(a), n;
  }, {});
}
function qa(e) {
  throw new Error(["[Pinia ORM]"].concat(e).join(" "));
}
function jn(e, t) {
  e || qa(t);
}
function pf(e, t) {
  let n = "", a = e;
  for (; a--; )
    n += t[Math.random() * 64 | 0];
  return n;
}
function _f(e, t) {
  const a = JSON.stringify(t ? { key: e, params: t } : { key: e });
  return typeof process > "u" ? btoa(a) : a;
}
function Co(e, t, n = !0) {
  t = typeof t == "string" ? t.split(".") : t;
  const a = t.shift();
  return e && Object.prototype.hasOwnProperty.call(e, a) && t.length === 0 ? e[a] : !e || !Object.prototype.hasOwnProperty.call(e, a) ? n ? e : void 0 : Co(e[a], t);
}
function Xl(e, t) {
  if (e === t)
    return !0;
  if (e instanceof Date && t instanceof Date)
    return e.getTime() === t.getTime();
  if (!e || !t || typeof e != "object" && typeof t != "object")
    return e === t;
  if (e.prototype !== t.prototype)
    return !1;
  const n = Object.keys(e);
  return n.length !== Object.keys(t).length ? !1 : n.every((a) => Xl(e[a], t[a]));
}
class Sf {
  constructor(t, n = {}, a = {}) {
    if (!t || typeof t != "string")
      throw new Error(`Expected a string key for Entity, but found ${t}.`);
    const {
      idAttribute: l = "id",
      mergeStrategy: r = (s, o) => ({ ...s, ...o }),
      processStrategy: i = (s) => ({ ...s })
    } = a;
    this._key = t, this._getId = l, this._mergeStrategy = r, this._processStrategy = i, this.define(n);
  }
  get key() {
    return this._key;
  }
  define(t) {
    this.schema = Object.keys(t).reduce((n, a) => {
      const l = t[a];
      return { ...n, [a]: l };
    }, this.schema || {});
  }
  getId(t, n, a) {
    return this._getId(t, n, a);
  }
  merge(t, n) {
    return this._mergeStrategy(t, n);
  }
  normalize(t, n, a, l, r, i) {
    const s = this.getId(t, n, a), o = this.key;
    if (o in i || (i[o] = {}), s in i[o] || (i[o][s] = []), i[o][s].includes(t))
      return s;
    i[o][s].push(t);
    const u = this._processStrategy(t, n, a);
    return Object.keys(this.schema).forEach((c) => {
      if (u.hasOwnProperty(c) && typeof u[c] == "object") {
        const f = this.schema[c], d = typeof f == "function" ? f(t) : f;
        u[c] = l(
          u[c],
          u,
          c,
          d,
          r,
          i
        );
      }
    }), r(this, u, t, n, a), s;
  }
}
class Io {
  constructor(t, n) {
    n && (this._schemaAttribute = typeof n == "string" ? (a) => a[n] : n), this.define(t);
  }
  get isSingleSchema() {
    return !this._schemaAttribute;
  }
  define(t) {
    this.schema = t;
  }
  getSchemaAttribute(t, n, a) {
    return !this.isSingleSchema && this._schemaAttribute(t, n, a);
  }
  inferSchema(t, n, a) {
    if (this.isSingleSchema)
      return this.schema;
    const l = this.getSchemaAttribute(t, n, a);
    return this.schema[l];
  }
  normalizeValue(t, n, a, l, r, i) {
    const s = this.inferSchema(t, n, a);
    if (!s)
      return t;
    const o = l(t, n, a, s, r, i);
    return this.isSingleSchema || o === void 0 || o === null ? o : { id: o, schema: this.getSchemaAttribute(t, n, a) };
  }
}
class wf extends Io {
  constructor(t, n) {
    if (!n)
      throw new Error('Expected option "schemaAttribute" not found on UnionSchema.');
    super(t, n);
  }
  normalize(t, n, a, l, r, i) {
    return this.normalizeValue(t, n, a, l, r, i);
  }
}
const Cf = (e) => {
  if (Array.isArray(e) && e.length > 1)
    throw new Error(`Expected schema definition to be a single schema, but found ${e.length}.`);
  return e[0];
}, ko = (e) => Array.isArray(e) ? e : Object.keys(e).map((t) => e[t]), If = (e, t, n, a, l, r, i) => ko(t).map((s) => l(s, n, a, Cf(e), r, i));
class kf extends Io {
  normalize(t, n, a, l, r, i) {
    return ko(t).map((s) => this.normalizeValue(s, n, a, l, r, i)).filter((s) => s != null);
  }
}
const Ef = (e, t, n, a, l, r, i) => {
  const s = { ...t };
  return Object.keys(e).forEach((o) => {
    const u = e[o], c = typeof u == "function" ? u(t) : u, f = l(t[o], t, o, c, r, i);
    f == null ? delete s[o] : s[o] = f;
  }), s;
}, Ql = (e, t, n, a, l, r) => typeof e != "object" || !e ? e : typeof a == "object" && (!a.normalize || typeof a.normalize != "function") ? (Array.isArray(a) ? If : Ef)(a, e, t, n, Ql, l, r) : a.normalize(e, t, n, Ql, l, r), xf = (e) => (t, n, a, l, r) => {
  const i = t.key, s = t.getId(a, l, r);
  i in e || (e[i] = {}), e[i][s] = e[i][s] ? t.merge(e[i][s], n) : n;
}, kl = {
  Array: kf,
  Entity: Sf,
  Union: wf
}, Pf = (e, t) => {
  if (!e || typeof e != "object")
    throw new Error(
      `Unexpected input given to normalize. Expected type to be "object", found "${e === null ? "null" : typeof e}".`
    );
  const n = {}, a = xf(n), r = Ql(e, e, null, t, a, {});
  return { entities: n, result: r };
};
var $f = Object.defineProperty, Tf = (e, t, n) => t in e ? $f(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Tr = (e, t, n) => (Tf(e, typeof t != "symbol" ? t + "" : t, n), n);
class Eo {
  /**
   * Create a new Attribute instance.
   */
  constructor(t) {
    Tr(this, "$parameters", {}), this.$self().attributes = t, this.$parameters = {
      ...this.$parameters,
      ...this.$self().parameters
    };
  }
  /**
   * Get the value for return.
   */
  get(t) {
    return t;
  }
  /**
   * Set the value for the store.
   */
  set(t) {
    return t;
  }
  static withParameters(t) {
    return this.parameters = t, this;
  }
  /**
   * Get the cast parameters
   */
  getParameters() {
    return this.$parameters;
  }
  /**
   * Get the constructor for this cast.
   */
  $self() {
    return this.constructor;
  }
  /**
   * Generate new instance of cast
   */
  static newRawInstance(t) {
    return new this(t);
  }
}
Tr(Eo, "attributes");
Tr(Eo, "parameters");
var Af = Object.defineProperty, Of = (e, t, n) => t in e ? Af(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, fi = (e, t, n) => (Of(e, typeof t != "symbol" ? t + "" : t, n), n);
class xo {
  /**
   * Create a new Attribute instance.
   */
  constructor(t) {
    fi(this, "model"), fi(this, "key"), this.model = t, this.key = "";
  }
  /**
   * Set the key name of the field
   */
  setKey(t) {
    return this.key = t, this;
  }
}
var Lf = Object.defineProperty, Vf = (e, t, n) => t in e ? Lf(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, El = (e, t, n) => (Vf(e, typeof t != "symbol" ? t + "" : t, n), n);
class Me extends xo {
  /**
   * Create a new relation instance.
   */
  constructor(t, n) {
    super(t), El(this, "parent"), El(this, "related"), El(this, "onDeleteMode"), this.parent = t, this.related = n;
  }
  /**
   * Get the related model of the relation.
   */
  getRelated() {
    return this.related;
  }
  /**
   * Get all of the primary keys for an array of models.
   */
  getKeys(t, n) {
    return t.map((a) => a[n]);
  }
  /**
   * Specify how this model should behave on delete
   */
  onDelete(t) {
    return this.onDeleteMode = t, this;
  }
  /**
   * Run a dictionary map over the items.
   */
  mapToDictionary(t, n) {
    return t.reduce((a, l) => {
      const [r, i] = n(l);
      return a[r] || (a[r] = []), a[r].push(i), a;
    }, {});
  }
  /**
   * Call a function for a current key match
   */
  compositeKeyMapper(t, n, a) {
    Se(t) && Se(n) ? t.forEach((l, r) => {
      a(l, n[r]);
    }) : !Se(n) && !Se(t) ? a(t, n) : qa([
      "This relation cant be resolve. Either child or parent doesnt have different key types (composite)",
      JSON.stringify(t),
      JSON.stringify(n)
    ]);
  }
  /**
   * Get the index key defined by the primary key or keys (composite)
   */
  getKey(t) {
    return Se(t) ? `[${t.join(",")}]` : t;
  }
}
var Nf = Object.defineProperty, Rf = (e, t, n) => t in e ? Nf(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Fn = (e, t, n) => (Rf(e, typeof t != "symbol" ? t + "" : t, n), n);
class Jl extends Me {
  /**
   * Create a new morph-to relation instance.
   */
  constructor(t, n, a, l, r) {
    super(t, t), Fn(this, "relatedModels"), Fn(this, "relatedTypes"), Fn(this, "morphId"), Fn(this, "morphType"), Fn(this, "ownerKey"), this.relatedModels = n, this.relatedTypes = this.createRelatedTypes(n), this.morphId = a, this.morphType = l, this.ownerKey = r;
  }
  /**
   * Create a dictionary of relations keyed by their entity.
   */
  createRelatedTypes(t) {
    return t.reduce((n, a) => (n[a.$entity()] = a, n), {});
  }
  /**
   * Get the type field name.
   */
  getType() {
    return this.morphType;
  }
  /**
   * Get all related models for the relationship.
   */
  getRelateds() {
    return this.relatedModels;
  }
  /**
   * Define the normalizr schema for the relation.
   */
  define(t) {
    return t.union(this.relatedModels, (n, a, l) => {
      const r = a[this.morphType], i = this.relatedTypes[r], s = this.ownerKey || i.$getKeyName();
      return a[this.morphId] = n[s], r;
    });
  }
  /**
   * Attach the relational key to the given record. Since morph-to relationship
   * doesn't have any foreign key, it would do nothing.
   */
  attach(t, n) {
  }
  /**
   * Add eager constraints. Since we do not know the related model ahead of time,
   * we cannot add any eager constraints.
   */
  addEagerConstraints(t, n) {
  }
  /**
   * Find and attach related children to their respective parents.
   */
  match(t, n, a) {
    const l = this.buildDictionary(a, n);
    n.forEach((r) => {
      var u;
      const i = r[this.morphType], s = r[this.morphId], o = ((u = l[i]) == null ? void 0 : u[s]) ?? null;
      r.$setRelation(t, o);
    });
  }
  /**
   * Make a related model.
   */
  make(t, n) {
    return !t || !n ? null : this.relatedTypes[n].$newInstance(t);
  }
  /**
   * Build model dictionary keyed by the owner key for each entity.
   */
  buildDictionary(t, n) {
    const a = this.getKeysByEntity(n), l = {};
    for (const r in a) {
      const i = this.relatedTypes[r];
      jn(!!i, [
        `Trying to load "morph to" relation of \`${r}\``,
        "but the model could not be found."
      ]);
      const s = this.ownerKey || i.$getKeyName(), o = t.newQueryWithConstraints(r).whereIn(s, a[r]).get(!1);
      l[r] = o.reduce(
        (u, c) => (u[c[s]] = c, u),
        {}
      );
    }
    return l;
  }
  /**
   * Get the relation's primary keys grouped by its entity.
   */
  getKeysByEntity(t) {
    return t.reduce((n, a) => {
      const l = a[this.morphType], r = a[this.morphId];
      return r !== null && this.relatedTypes[l] !== void 0 && (n[l] || (n[l] = []), n[l].push(r)), n;
    }, {});
  }
}
var Ff = Object.defineProperty, Df = (e, t, n) => t in e ? Ff(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, vi = (e, t, n) => (Df(e, typeof t != "symbol" ? t + "" : t, n), n);
class la extends xo {
  /**
   * Create a new Type attribute instance.
   */
  constructor(t, n = null) {
    super(t), vi(this, "rawDefaultValue"), vi(this, "isNullable", !0), this.rawDefaultValue = n;
  }
  /**
   * The computed default value of the attribute.
   */
  get defaultValue() {
    return typeof this.rawDefaultValue == "function" ? this.rawDefaultValue() : this.rawDefaultValue;
  }
  /**
   * Set the nullable option to false.
   */
  notNullable() {
    return this.isNullable = !1, this;
  }
  makeReturn(t, n) {
    return n === void 0 ? this.defaultValue : n === null ? (this.isNullable || this.throwWarning(["is set as non nullable!"]), n) : (typeof n !== t && this.throwWarning([n, "is not a", t]), n);
  }
  /**
   * Throw warning for wrong type
   */
  throwWarning(t) {
    console.warn(["[Pinia ORM]"].concat([`Field ${this.model.$entity()}:${this.key} - `, ...t]).join(" "));
  }
}
var Mf = Object.defineProperty, Bf = (e, t, n) => t in e ? Mf(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, xl = (e, t, n) => (Bf(e, typeof t != "symbol" ? t + "" : t, n), n);
class Po extends la {
  constructor(t, n = {}) {
    super(t), xl(this, "options"), xl(this, "alphabet", "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"), xl(this, "size", 21), this.options = typeof n == "number" ? { size: n } : n, this.alphabet = this.options.alphabet ?? this.alphabet, this.size = this.options.size ?? this.size;
  }
  /**
   * Make the value for the attribute.
   */
  make(t) {
    const n = this.model.$casts()[this.model.$getKeyName()];
    return n ? t ?? n.withParameters(this.options).newRawInstance(this.model.$fields()).set(t) : t ?? pf(this.size, this.alphabet);
  }
}
var Hf = Object.defineProperty, Wf = (e, t, n) => t in e ? Hf(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, hi = (e, t, n) => (Wf(e, typeof t != "symbol" ? t + "" : t, n), n);
class Kf {
  /**
   * Create a new Schema instance.
   */
  constructor(t) {
    hi(this, "schemas", {}), hi(this, "model"), this.model = t;
  }
  /**
   * Create a single schema.
   */
  one(t, n) {
    t = t || this.model, n = n || this.model;
    const a = `${t.$self().modelEntity()}${n.$self().modelEntity()}`;
    if (this.schemas[a])
      return this.schemas[a];
    const l = this.newEntity(t, n);
    this.schemas[a] = l;
    const r = this.definition(t);
    return l.define(r), l;
  }
  /**
   * Create an array schema for the given model.
   */
  many(t, n) {
    return new kl.Array(this.one(t, n));
  }
  /**
   * Create an union schema for the given models.
   */
  union(t, n) {
    const a = t.reduce((l, r) => (l[r.$self().modelEntity()] = this.one(r), l), {});
    return new kl.Union(a, n);
  }
  /**
   * Create a new normalizr entity.
   */
  newEntity(t, n) {
    const a = t.$self().modelEntity(), l = this.idAttribute(t, n);
    return new kl.Entity(a, {}, { idAttribute: l });
  }
  /**
   * The `id` attribute option for the normalizr entity.
   *
   * Generates any missing primary keys declared by a Uid attribute. Missing
   * primary keys where the designated attributes do not exist will
   * throw an error.
   *
   * Note that this will only generate uids for primary key attributes since it
   * is required to generate the "index id" while the other attributes are not.
   *
   * It's especially important when attempting to "update" records since we'll
   * want to retain the missing attributes in-place to prevent them being
   * overridden by newly generated uid values.
   *
   * If uid primary keys are omitted, when invoking the "update" method, it will
   * fail because the uid values will never exist in the store.
   *
   * While it would be nice to throw an error in such a case, instead of
   * silently failing an update, we don't have a way to detect whether users
   * are trying to "update" records or "inserting" new records at this stage.
   * Something to consider for future revisions.
   */
  idAttribute(t, n) {
    const a = this.getUidPrimaryKeyPairs(t);
    return (l, r, i) => {
      var o, u, c;
      i !== null && ((o = n.$fields()[i]) == null || o.attach(r, l));
      for (const f in a)
        ql(l[f]) && (l[f] = a[f].setKey(f).make(l[f]));
      return ["BelongsTo", "HasOne", "MorphOne", "MorphTo"].includes(((u = n.$fields()[i]) == null ? void 0 : u.constructor.name) ?? "") && Se(r[i]) && qa(['You are passing a list to "', `${n.$modelEntity()}.${i}`, `" which is a one to one Relation(${(c = n.$fields()[i]) == null ? void 0 : c.constructor.name}):`, JSON.stringify(r[i])]), t.$getIndexId(l);
    };
  }
  /**
   * Get all primary keys defined by the Uid attribute for the given model.
   */
  getUidPrimaryKeyPairs(t) {
    const n = t.$fields(), a = t.$getKeyName(), l = Se(a) ? a : [a], r = {};
    return l.forEach((i) => {
      const s = n[i];
      s instanceof Po && (r[i] = s);
    }), r;
  }
  /**
   * Create a definition for the given model.
   */
  definition(t) {
    const n = t.$fields(), a = {};
    for (const l in n) {
      const r = n[l];
      r instanceof Me && (a[l] = r.define(this));
    }
    return a;
  }
}
var jf = Object.defineProperty, Uf = (e, t, n) => t in e ? jf(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, zf = (e, t, n) => (Uf(e, t + "", n), n);
class Gf {
  /**
   * Create a new Interpreter instance.
   */
  constructor(t) {
    zf(this, "model"), this.model = t;
  }
  process(t) {
    const n = this.normalize(t);
    return [t, n];
  }
  /**
   * Normalize the given data.
   */
  normalize(t) {
    const n = Se(t) ? [this.getSchema()] : this.getSchema();
    return Pf(t, n).entities;
  }
  /**
   * Get the schema from the database.
   */
  getSchema() {
    return new Kf(this.model).one();
  }
}
function Yf(e) {
  return {
    save(t, n = !0) {
      this.data = Object.assign({}, this.data, t), n && e && e.newQuery(this.$id).save(Object.values(t));
    },
    insert(t, n = !0) {
      this.data = Object.assign({}, this.data, t), n && e && e.newQuery(this.$id).insert(Object.values(t));
    },
    update(t, n = !0) {
      this.data = Object.assign({}, this.data, t), n && e && e.newQuery(this.$id).update(Object.values(t));
    },
    fresh(t, n = !0) {
      this.data = t, n && e && e.newQuery(this.$id).fresh(Object.values(t));
    },
    destroy(t, n = !0) {
      n && e ? e.newQuery(this.$id).newQuery(this.$id).destroy(t) : (t.forEach((a) => delete this.data[a]), this.data.__ob__ && this.data.__ob__.dep.notify());
    },
    /**
     * Commit `delete` change to the store.
     */
    delete(t, n = !0) {
      n && e ? e.whereId(t).delete() : (t.forEach((a) => delete this.data[a]), this.data.__ob__ && this.data.__ob__.dep.notify());
    },
    flush(t, n = !0) {
      this.data = {}, n && e && e.newQuery(this.$id).flush();
    }
  };
}
function $o(e, t, n) {
  return /* @__PURE__ */ df(e, {
    state: () => ({ data: {} }),
    actions: Yf(n),
    ...t
  });
}
var qf = Object.defineProperty, Xf = (e, t, n) => t in e ? qf(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, _n = (e, t, n) => (Xf(e, typeof t != "symbol" ? t + "" : t, n), n);
class To extends Me {
  /**
   * Create a new belongs to instance.
   */
  constructor(t, n, a, l, r, i, s) {
    super(t, n), _n(this, "pivot"), _n(this, "foreignPivotKey"), _n(this, "relatedPivotKey"), _n(this, "parentKey"), _n(this, "relatedKey"), _n(this, "pivotKey", "pivot"), this.pivot = a, this.foreignPivotKey = l, this.relatedPivotKey = r, this.parentKey = i, this.relatedKey = s;
  }
  /**
   * Get all related models for the relationship.
   */
  getRelateds() {
    return [this.related, this.pivot];
  }
  /**
   * Define the normalizr schema for the relationship.
   */
  define(t) {
    return t.many(this.related, this.parent);
  }
  /**
   * Attach the parent type and id to the given relation.
   */
  attach(t, n) {
    const a = n.pivot ?? {};
    a[this.foreignPivotKey] = t[this.parentKey], a[this.relatedPivotKey] = n[this.relatedKey], n[`pivot_${this.relatedPivotKey}_${this.pivot.$entity()}`] = a;
  }
  /**
   * Convert given value to the appropriate value for the attribute.
   */
  make(t) {
    return t ? t.map((n) => this.related.$newInstance(n)) : [];
  }
  /**
   * Match the eagerly loaded results to their parents.
   */
  match(t, n, a) {
    const l = a.get(!1), r = a.newQuery(this.pivot.$modelEntity()).whereIn(this.relatedPivotKey, this.getKeys(l, this.relatedKey)).whereIn(this.foreignPivotKey, this.getKeys(n, this.parentKey)).groupBy(this.foreignPivotKey, this.relatedPivotKey).get();
    n.forEach((i) => {
      const s = [];
      l.forEach((o) => {
        var f;
        const u = ((f = r[`[${i[this.parentKey]},${o[this.relatedKey]}]`]) == null ? void 0 : f[0]) ?? null;
        if (!u)
          return;
        const c = o.$newInstance(o.$toJson(), { operation: void 0 });
        c.$setRelation("pivot", u), s.push(c);
      }), i.$setRelation(t, s);
    });
  }
  /**
   * Set the constraints for the related relation.
   */
  addEagerConstraints(t, n) {
  }
}
var Qf = Object.defineProperty, Jf = (e, t, n) => t in e ? Qf(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, ze = (e, t, n) => (Jf(e, typeof t != "symbol" ? t + "" : t, n), n);
let Zf = class Ca {
  /**
   * Create a new query instance.
   */
  constructor(t, n, a, l, r) {
    ze(this, "database"), ze(this, "model"), ze(this, "wheres", []), ze(this, "orders", []), ze(this, "groups", []), ze(this, "take", null), ze(this, "skip", 0), ze(this, "visible", ["*"]), ze(this, "hidden", []), ze(this, "cache"), ze(this, "eagerLoad", {}), ze(this, "pinia"), ze(this, "fromCache", !1), ze(this, "cacheConfig", {}), ze(this, "getNewHydrated", !1), ze(this, "hydratedDataCache"), this.database = t, this.model = n, this.pinia = r, this.cache = a, this.hydratedDataCache = l, this.getNewHydrated = !1;
  }
  /**
   * Create a new query instance for the given model.
   */
  newQuery(t) {
    return this.getNewHydrated = !0, new Ca(this.database, this.database.getModel(t), this.cache, this.hydratedDataCache, this.pinia);
  }
  /**
   * Create a new query instance with constraints for the given model.
   */
  newQueryWithConstraints(t) {
    const n = new Ca(this.database, this.database.getModel(t), this.cache, this.hydratedDataCache, this.pinia);
    return n.eagerLoad = { ...this.eagerLoad }, n.wheres = [...this.wheres], n.orders = [...this.orders], n.take = this.take, n.skip = this.skip, n.fromCache = this.fromCache, n.cacheConfig = this.cacheConfig, n;
  }
  /**
   * Create a new query instance from the given relation.
   */
  newQueryForRelation(t) {
    return new Ca(this.database, t.getRelated(), this.cache, /* @__PURE__ */ new Map(), this.pinia);
  }
  /**
   * Create a new interpreter instance.
   */
  newInterpreter() {
    return new Gf(this.model);
  }
  /**
   * Commit a store action and get the data
   */
  commit(t, n) {
    const a = $o(this.model.$storeName(), this.model.$piniaOptions(), this)(this.pinia);
    return t && typeof a[t] == "function" && a[t](n, !1), this.cache && ["get", "all", "insert", "flush", "delete", "update", "destroy"].includes(t) && this.cache.clear(), a.$state.data;
  }
  /**
   * Make meta field visible
   */
  withMeta() {
    return this.makeVisible(["_meta"]);
  }
  /**
   * Make hidden fields visible
   */
  makeVisible(t) {
    return this.visible = t, this.getNewHydrated = !0, this;
  }
  /**
   * Make visible fields hidden
   */
  makeHidden(t) {
    return this.hidden = t, this.getNewHydrated = !0, this;
  }
  // where(field: T, value?: WhereSecondaryClosure<M[T]> | M[T]): this;
  // where<T extends WherePrimaryClosure<M> | keyof M>(field: T, value?: WhereSecondaryClosure<M[T]> | M[T]): this;
  /**
   * Add a basic where clause to the query.
   */
  where(t, n) {
    return this.wheres.push({ field: t, value: n, boolean: "and" }), this;
  }
  /**
   * Add a "where in" clause to the query.
   */
  whereIn(t, n) {
    return n instanceof Set && (n = Array.from(n)), this.where(t, n);
  }
  /**
   * Add a "where not in" clause to the query.
   */
  whereNotIn(t, n) {
    return n instanceof Set && (n = Array.from(n)), this.where((a) => !n.includes(a[t]));
  }
  /**
   * Add a "where not in" clause to the query.
   */
  orWhereIn(t, n) {
    return n instanceof Set && (n = Array.from(n)), this.orWhere(t, n);
  }
  /**
   * Add a "where not in" clause to the query.
   */
  orWhereNotIn(t, n) {
    return n instanceof Set && (n = Array.from(n)), this.orWhere((a) => !n.includes(a[t]));
  }
  /**
   * Add a where clause on the primary key to the query.
   */
  whereId(t) {
    return this.where(this.model.$getKeyName(), t);
  }
  /**
   * Add an "or where" clause to the query.
   */
  orWhere(t, n) {
    return this.wheres.push({ field: t, value: n, boolean: "or" }), this;
  }
  /**
   * Add a "whereNULL" clause to the query.
   */
  whereNull(t) {
    return this.where(t, null);
  }
  /**
   * Add a "whereNotNULL" clause to the query.
   */
  whereNotNull(t) {
    return this.where((n) => n[t] != null);
  }
  /**
   * Add a "where has" clause to the query.
   */
  whereHas(t, n = () => {
  }, a, l) {
    return this.where(this.getFieldWhereForRelations(t, n, a, l));
  }
  /**
   * Add an "or where has" clause to the query.
   */
  orWhereHas(t, n = () => {
  }, a, l) {
    return this.orWhere(this.getFieldWhereForRelations(t, n, a, l));
  }
  /**
   * Add a "has" clause to the query.
   */
  has(t, n, a) {
    return this.where(this.getFieldWhereForRelations(t, () => {
    }, n, a));
  }
  /**
   * Add an "or has" clause to the query.
   */
  orHas(t, n, a) {
    return this.orWhere(this.getFieldWhereForRelations(t, () => {
    }, n, a));
  }
  /**
   * Add a "doesn't have" clause to the query.
   */
  doesntHave(t) {
    return this.where(this.getFieldWhereForRelations(t, () => {
    }, "=", 0));
  }
  /**
   * Add a "doesn't have" clause to the query.
   */
  orDoesntHave(t) {
    return this.orWhere(this.getFieldWhereForRelations(t, () => {
    }, "=", 0));
  }
  /**
   * Add a "where doesn't have" clause to the query.
   */
  whereDoesntHave(t, n = () => {
  }) {
    return this.where(this.getFieldWhereForRelations(t, n, "=", 0));
  }
  /**
   * Add an "or where doesn't have" clause to the query.
   */
  orWhereDoesntHave(t, n = () => {
  }) {
    return this.orWhere(this.getFieldWhereForRelations(t, n, "=", 0));
  }
  /**
   * Add a "group by" clause to the query.
   */
  groupBy(...t) {
    return t.forEach((n) => {
      this.groups.push({ field: n });
    }), this;
  }
  /**
   * Add an "order by" clause to the query.
   */
  orderBy(t, n = "asc") {
    return this.orders.push({ field: t, direction: n }), this;
  }
  /**
   * Set the "limit" value of the query.
   */
  limit(t) {
    return this.take = t, this;
  }
  /**
   * Set the "offset" value of the query.
   */
  offset(t) {
    return this.skip = t, this;
  }
  /**
   * Set the relationships that should be eager loaded.
   */
  with(t, n = () => {
  }) {
    return this.getNewHydrated = !0, this.eagerLoad[t] = n, this;
  }
  /**
   * Set to eager load all top-level relationships. Constraint is set for all relationships.
   */
  withAll(t = () => {
  }) {
    let n = this.model.$fields();
    Object.values(this.model.$types()).forEach((l) => {
      n = { ...n, ...l.fields() };
    });
    for (const l in n)
      n[l] instanceof Me && this.with(l, t);
    return this;
  }
  /**
   * Set to eager load all relationships recursively.
   */
  withAllRecursive(t = 3) {
    return this.withAll((n) => {
      t > 0 && n.withAllRecursive(t - 1);
    });
  }
  /**
   * Define to use the cache for a query
   */
  useCache(t, n) {
    return this.fromCache = !0, this.cacheConfig = {
      key: t,
      params: n
    }, this;
  }
  /**
   * Get where closure for relations
   */
  getFieldWhereForRelations(t, n = () => {
  }, a, l) {
    const r = this.newQuery(this.model.$entity()).with(t, n).get(!1).filter((i) => {
      const s = i[t];
      return ff(
        Se(s) ? s.length : s === null ? 0 : 1,
        typeof a == "number" ? a : l ?? 1,
        typeof a == "number" || l === void 0 ? ">=" : a
      );
    }).map((i) => i.$getIndexId());
    return (i) => r.includes(i.$getIndexId());
  }
  /**
   * Get all models by id from the store. The difference with the `get` is that this
   * method will not process any query chain.
   */
  storeFind(t = []) {
    const n = this.commit("all"), a = [], l = new Set(t);
    return l.size > 0 ? l.forEach((r) => {
      n[r] && a.push(this.hydrate(n[r], { visible: this.visible, hidden: this.hidden, operation: "get" }));
    }) : Object.values(n).forEach((r) => a.push(this.hydrate(r, { visible: this.visible, hidden: this.hidden, operation: "get" }))), a;
  }
  /**
   * Get all models from the store. The difference with the `get` is that this
   * method will not process any query chain. It'll always retrieve all models.
   */
  all() {
    return this.storeFind();
  }
  get(t = !0) {
    if (!this.fromCache || !this.cache)
      return this.internalGet(t);
    const n = this.cacheConfig.key ? this.cacheConfig.key + JSON.stringify(this.cacheConfig.params) : _f(this.model.$entity(), {
      where: this.wheres,
      groups: this.groups,
      orders: this.orders,
      eagerLoads: this.eagerLoad,
      skip: this.skip,
      take: this.take,
      hidden: this.hidden,
      visible: this.visible
    }), a = this.cache.get(n);
    if (a)
      return a;
    const l = this.internalGet(t);
    return this.cache.set(n, l), l;
  }
  internalGet(t) {
    if (this.model.$entity() !== this.model.$baseEntity() || this.model.$namespace() !== this.model.$baseNamespace()) {
      const a = this.model.$fields()[this.model.$typeKey()].make() ?? this.model.$entity();
      this.where(this.model.$typeKey(), a);
    }
    let n = this.select();
    return this.orders.length === 0 && (n = this.filterLimit(n)), pn(n) || this.eagerLoadRelations(n), this.orders.length > 0 && (n = this.filterOrder(n), n = this.filterLimit(n)), t && n.forEach((a) => a.$self().retrieved(a)), this.groups.length > 0 ? this.filterGroup(n) : n;
  }
  /**
   * Execute the query and get the first result.
   */
  first() {
    return this.limit(1).get()[0] ?? null;
  }
  find(t) {
    return this.whereId(t)[Se(t) ? "get" : "first"]();
  }
  /**
   * Retrieve models by processing all filters set to the query chain.
   */
  select() {
    let t = [];
    const n = this.wheres, a = this.wheres.findIndex((r) => r.field === this.model.$getKeyName());
    if (a > -1) {
      const r = this.wheres[a].value;
      t = ((Il(r) ? [] : Se(r) ? r : [r]) || []).map(String) || [], t.length > 0 && (this.wheres = [...this.wheres.slice(0, a), ...this.wheres.slice(a + 1)]);
    }
    let l = this.storeFind(t);
    return l = this.filterWhere(l), this.wheres = n, l;
  }
  /**
   * Filter the given collection by the registered where clause.
   */
  filterWhere(t) {
    if (pn(this.wheres))
      return t;
    const n = this.getWhereComparator();
    return t.filter((a) => n(a));
  }
  /**
   * Get comparator for the where clause.
   */
  getWhereComparator() {
    const { and: t, or: n } = bf(this.wheres, (a) => a.boolean);
    return (a) => {
      const l = [];
      return t && l.push(t.every((r) => this.whereComparator(a, r))), n && l.push(n.some((r) => this.whereComparator(a, r))), l.includes(!0);
    };
  }
  /**
   * The function to compare where clause to the given model.
   */
  whereComparator(t, n) {
    return Il(n.field) ? n.field(t) : Se(n.value) ? n.value.includes(t[n.field]) : Il(n.value) ? n.value(t[n.field]) : t[n.field] === n.value;
  }
  /**
   * Filter the given collection by the registered order conditions.
   */
  filterOrder(t) {
    const n = this.orders.map((l) => l.field), a = this.orders.map((l) => l.direction);
    return hf(t, n, a);
  }
  /**
   * Filter the given collection by the registered group conditions.
   */
  filterGroup(t) {
    const n = {}, a = this.groups.map((l) => l.field);
    return t.forEach((l) => {
      const r = a.length === 1 ? l[a[0]] : `[${a.map((i) => l[i]).toString()}]`;
      n[r] = (n[r] || []).concat(l);
    }), n;
  }
  /**
   * Filter the given collection by the registered limit and offset values.
   */
  filterLimit(t) {
    return this.take !== null ? t.slice(this.skip, this.skip + this.take) : t.slice(this.skip);
  }
  /**
   * Eager load relations on the model.
   */
  load(t) {
    this.eagerLoadRelations(t);
  }
  /**
   * Eager load the relationships for the models.
   */
  eagerLoadRelations(t) {
    for (const n in this.eagerLoad)
      this.eagerLoadRelation(t, n, this.eagerLoad[n]);
  }
  /**
   * Eagerly load the relationship on a set of models.
   */
  eagerLoadRelation(t, n, a) {
    const l = this.getRelation(n), r = this.newQueryForRelation(l);
    l.addEagerConstraints(r, t), a(r), l.match(n, t, r);
  }
  /**
   * Get the relation instance for the given relation name.
   */
  getRelation(t) {
    return this.model.$getRelation(t);
  }
  revive(t) {
    return Se(t) ? this.reviveMany(t) : this.reviveOne(t);
  }
  /**
   * Revive single model from the given schema.
   */
  reviveOne(t) {
    this.getNewHydrated = !1;
    const n = this.model.$getIndexId(t), a = this.commit("get")[n] ?? null;
    if (!a)
      return null;
    const l = this.hydrate(a, { visible: this.visible, hidden: this.hidden, operation: "get" });
    return this.reviveRelations(l, t), l;
  }
  /**
   * Revive multiple models from the given schema.
   */
  reviveMany(t) {
    return t.reduce((n, a) => {
      const l = this.reviveOne(a);
      return l && n.push(l), n;
    }, []);
  }
  /**
   * Revive relations for the given schema and entity.
   */
  reviveRelations(t, n) {
    const a = this.model.$fields();
    for (const l in n) {
      const r = a[l];
      if (!(r instanceof Me))
        continue;
      const i = n[l];
      if (!i)
        return;
      if (r instanceof Jl) {
        const s = t[r.getType()];
        t[l] = this.newQuery(s).reviveOne(i);
        continue;
      }
      t[l] = Se(i) ? this.newQueryForRelation(r).reviveMany(i) : this.newQueryForRelation(r).reviveOne(i);
    }
  }
  /**
   * Create and persist model with default values.
   */
  new(t = !0) {
    let n = this.hydrate({}, { operation: t ? "set" : "get" });
    const a = n.$self().creating(n), l = n.$self().saving(n);
    return a === !1 || l === !1 ? null : (n.$isDirty() && (n = this.hydrate(n.$getAttributes(), { operation: t ? "set" : "get" })), t && (this.hydratedDataCache.set(this.model.$entity() + n.$getKey(void 0, !0), this.hydrate(n.$getAttributes(), { operation: "get" })), n.$self().created(n), n.$self().saved(n), this.commit("insert", this.compile(n))), n);
  }
  save(t) {
    let n = this.newInterpreter().process(t);
    const a = this.model.$types(), l = this.model.$baseEntity() !== this.model.$entity() || this.model.$baseNamespace() !== this.model.$namespace();
    if (Object.values(a).length > 0 || l) {
      const s = Object.keys(a), o = {};
      t = Se(t) ? t : [t], t.forEach((u) => {
        const c = s.includes(`${u[this.model.$typeKey()]}`) || l ? u[this.model.$typeKey()] ?? this.model.$fields()[this.model.$typeKey()].defaultValue : s[0];
        o[c] || (o[c] = []), o[c].push(u);
      });
      for (const u in o) {
        const c = a[u];
        c.modelEntity() === this.model.$modelEntity() ? n = this.newInterpreter().process(o[u]) : this.newQueryWithConstraints(c.modelEntity()).save(o[u]);
      }
    }
    const [r, i] = n;
    for (const s in i) {
      const o = this.newQuery(s), u = i[s];
      o.saveElements(u);
    }
    return this.revive(r);
  }
  /**
   * Save the given elements to the store.
   */
  saveElements(t) {
    const n = {}, a = this.commit("all"), l = [];
    for (const r in t) {
      const i = t[r], s = a[r];
      let o = s ? Object.assign(this.hydrate(s, { operation: "set", action: "update" }), i) : this.hydrate(i, { operation: "set", action: "save" });
      const u = o.$self().saving(o, i), c = s ? o.$self().updating(o, i) : o.$self().creating(o, i);
      u === !1 || c === !1 || (o.$isDirty() && (o = this.hydrate(o.$getAttributes(), { operation: "set", action: "update" })), l.push(() => o.$self().saved(o, i)), l.push(() => s ? o.$self().updated(o, i) : o.$self().created(o, i)), n[r] = o.$getAttributes(), Object.values(o.$types()).length > 0 && !n[r][o.$typeKey()] && (n[r][o.$typeKey()] = i[o.$typeKey()]));
    }
    Object.keys(n).length > 0 && (this.commit("save", n), l.forEach((r) => r()));
  }
  insert(t) {
    const n = this.hydrate(t, { operation: "set", action: "insert" });
    return this.commit("insert", this.compile(n)), n;
  }
  fresh(t) {
    this.hydratedDataCache.clear();
    const n = this.hydrate(t, { action: "update" });
    return this.commit("fresh", this.compile(n)), n;
  }
  /**
   * Update the reocrd matching the query chain.
   */
  update(t) {
    const n = this.get(!1);
    if (pn(n))
      return [];
    const a = n.map((l) => {
      const r = Object.assign(this.hydrate(l.$getAttributes(), { action: "update", operation: "set" }), t);
      if (l.$self().updating(r, t) === !1)
        return l;
      const i = r.$isDirty() ? this.hydrate({ ...l.$getAttributes(), ...t }, { action: "update", operation: "set" }) : r;
      return i.$self().updated(i, t), i;
    });
    return this.commit("update", this.compile(a)), a;
  }
  destroy(t) {
    return Se(t) ? this.destroyMany(t) : this.destroyOne(t);
  }
  destroyOne(t) {
    const n = this.find(t);
    if (!n)
      return null;
    const [a, l] = this.dispatchDeleteHooks(n);
    return l.includes(n.$getIndexId()) || (this.commit("destroy", [n.$getIndexId()]), a.forEach((r) => r())), n;
  }
  destroyMany(t) {
    const n = this.find(t);
    if (pn(n))
      return [];
    const [a, l] = this.dispatchDeleteHooks(n), r = this.getIndexIdsFromCollection(n).filter((i) => !l.includes(i));
    return this.commit("destroy", r), a.forEach((i) => i()), n;
  }
  /**
   * Delete records resolved by the query chain.
   */
  delete() {
    const t = this.get(!1);
    if (pn(t))
      return [];
    const [n, a] = this.dispatchDeleteHooks(t), l = this.getIndexIdsFromCollection(t).filter((r) => !a.includes(r));
    return this.commit("delete", l), n.forEach((r) => r()), t;
  }
  /**
   * Delete all records in the store.
   */
  flush() {
    return this.commit("flush"), this.hydratedDataCache.clear(), this.get(!1);
  }
  checkAndDeleteRelations(t) {
    const n = t.$fields();
    for (const a in n) {
      const l = n[a];
      if (n[a] instanceof Me && l.onDeleteMode && t[a]) {
        const i = (Se(t[a]) ? t[a] : [t[a]]).map((o) => o.$getKey(void 0, !0)), s = {};
        if (l instanceof To) {
          this.newQuery(l.pivot.$entity()).where(l.foreignPivotKey, t[t.$getLocalKey()]).delete();
          continue;
        }
        switch (l.onDeleteMode) {
          case "cascade": {
            this.newQueryForRelation(l).destroy(i);
            break;
          }
          case "set null": {
            l.foreignKey && (s[l.foreignKey] = null), l.morphId && (s[l.morphId] = null, s[l.morphType] = null), this.newQueryForRelation(l).whereId(i).update(s);
            break;
          }
        }
      }
    }
  }
  dispatchDeleteHooks(t) {
    const n = [], a = [];
    return t = Se(t) ? t : [t], this.withAll().load(t), t.forEach((l) => {
      l.$self().deleting(l) === !1 ? a.push(l.$getIndexId()) : (this.hydratedDataCache.delete("set" + this.model.$entity() + l.$getIndexId()), this.hydratedDataCache.delete("get" + this.model.$entity() + l.$getIndexId()), n.push(() => l.$self().deleted(l)), this.checkAndDeleteRelations(l));
    }), [n, a];
  }
  /**
   * Get an array of index ids from the given collection.
   */
  getIndexIdsFromCollection(t) {
    return t.map((n) => n.$getIndexId());
  }
  hydrate(t, n) {
    return Se(t) ? t.map((a) => this.hydrate(a, n)) : this.getHydratedModel(t, { relations: !1, ...n || {} });
  }
  /**
   * Convert given models into an indexed object that is ready to be saved to
   * the store.
   */
  compile(t) {
    return (Se(t) ? t : [t]).reduce((a, l) => (a[l.$getIndexId()] = l.$getAttributes(), a), {});
  }
  /**
   * Save already existing models and return them if they exist to prevent
   * an update event trigger in vue if the object is used.
   */
  getHydratedModel(t, n) {
    const a = this.model.$entity() + this.model.$getKey(t, !0), l = (n == null ? void 0 : n.operation) + a;
    let r = this.hydratedDataCache.get(l);
    if ((n == null ? void 0 : n.action) === "update" && (this.hydratedDataCache.delete("get" + a), r = void 0), !this.getNewHydrated && r)
      return r;
    const i = this.model.$types()[t[this.model.$typeKey()]], o = ((u) => (i ? i.newRawInstance() : this.model).$newInstance(t, { relations: !1, ...n || {}, ...u }))();
    return pn(this.eagerLoad) && (n == null ? void 0 : n.operation) !== "set" && this.hydratedDataCache.set(l, o), o;
  }
};
var ev = Object.defineProperty, tv = (e, t, n) => t in e ? ev(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, nv = (e, t, n) => (tv(e, typeof t != "symbol" ? t + "" : t, n), n), av = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
}, Tt = (e, t, n) => (av(e, t, "read from private field"), n ? n.call(e) : t.get(e)), lv = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, mi, bt;
class Ao {
  constructor() {
    nv(this, mi), lv(this, bt, /* @__PURE__ */ new Map());
  }
  has(t) {
    var n;
    return !!(Tt(this, bt).has(t) && ((n = Tt(this, bt).get(t)) != null && n.deref()));
  }
  get(t) {
    const n = Tt(this, bt).get(t);
    if (!n)
      return;
    const a = n.deref();
    if (a)
      return a;
    Tt(this, bt).delete(t);
  }
  set(t, n) {
    return Tt(this, bt).set(t, new WeakRef(n)), this;
  }
  get size() {
    return Tt(this, bt).size;
  }
  clear() {
    Tt(this, bt).clear();
  }
  delete(t) {
    return Tt(this, bt).delete(t), !1;
  }
  forEach(t) {
    for (const [n, a] of this)
      t(a, n, this);
  }
  *[(mi = Symbol.toStringTag, Symbol.iterator)]() {
    for (const [t, n] of Tt(this, bt)) {
      const a = n.deref();
      if (!a) {
        Tt(this, bt).delete(t);
        continue;
      }
      yield [t, a];
    }
  }
  *entries() {
    for (const [t, n] of this)
      yield [t, n];
  }
  *keys() {
    for (const [t] of this)
      yield t;
  }
  *values() {
    for (const [, t] of this)
      yield t;
  }
}
bt = /* @__PURE__ */ new WeakMap();
const rv = new Ao(), iv = /* @__PURE__ */ new Map(), Zl = {
  model: {
    namespace: "",
    withMeta: !1,
    hidden: ["_meta"],
    visible: ["*"]
  },
  cache: {
    shared: !0,
    provider: Ao
  }
}, tt = { ...Zl };
var sv = Object.defineProperty, ov = (e, t, n) => t in e ? sv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Ht = (e, t, n) => (ov(e, typeof t != "symbol" ? t + "" : t, n), n);
class Xa {
  /**
   * Create a new Repository instance.
   */
  constructor(t, n) {
    return Ht(this, "database"), Ht(this, "model"), Ht(this, "pinia"), Ht(this, "queryCache"), Ht(this, "hydratedDataCache"), Ht(this, "use"), Ht(this, "config"), this.config = tt, this.database = t, this.pinia = n, this.hydratedDataCache = iv, new Proxy(this, {
      get(a, l) {
        if (typeof l != "symbol") {
          if (l in a)
            return a[l];
          if (!(l === "use" || l === "model" || l === "queryCache"))
            return function(...r) {
              return a.query()[l](...r);
            };
        }
      }
    });
  }
  /**
   * Set the model
   */
  static setModel(t) {
    return this.useModel = t, this;
  }
  /**
   * Set the global config
   */
  setConfig(t) {
    this.config = t;
  }
  /**
   * Initialize the repository by setting the model instance.
   */
  initialize(t) {
    return this.config.cache && this.config.cache !== !0 && (this.queryCache = this.config.cache.shared ? rv : new this.config.cache.provider()), t ? (this.model = t.newRawInstance(), this) : this.use || this.$self().useModel ? (this.use = this.use ?? this.$self().useModel, this.model = this.use.newRawInstance(), this) : this;
  }
  /**
   * Get the constructor for this model.
   */
  $self() {
    return this.constructor;
  }
  /**
   * Get the model instance. If the model is not registered to the repository,
   * it will throw an error. It happens when users use a custom repository
   * without setting `use` property.
   */
  getModel() {
    return jn(!!this.model, [
      "The model is not registered. Please define the model to be used at",
      "`use` property of the repository class."
    ]), this.model;
  }
  /**
   * Returns the pinia store used with this model
   */
  piniaStore() {
    return $o(this.model.$storeName(), this.model.$piniaOptions(), this.query())(this.pinia);
  }
  repo(t) {
    return Ar(t);
  }
  /**
   * Create a new Query instance.
   */
  query() {
    return new Zf(this.database, this.getModel(), this.queryCache, this.hydratedDataCache, this.pinia);
  }
  /**
   * Create a new Query instance.
   */
  cache() {
    return this.queryCache;
  }
  /**
   * Add a basic where clause to the query.
   */
  where(t, n) {
    return this.query().where(t, n);
  }
  /**
   * Add an "or where" clause to the query.
   */
  orWhere(t, n) {
    return this.query().orWhere(t, n);
  }
  /**
   * Add a "where has" clause to the query.
   */
  whereHas(t, n = () => {
  }, a, l) {
    return this.query().whereHas(t, n, a, l);
  }
  /**
   * Add an "or where has" clause to the query.
   */
  orWhereHas(t, n = () => {
  }, a, l) {
    return this.query().orWhereHas(t, n, a, l);
  }
  /**
   * Add a "has" clause to the query.
   */
  has(t, n, a) {
    return this.query().has(t, n, a);
  }
  /**
   * Add an "or has" clause to the query.
   */
  orHas(t, n, a) {
    return this.query().orHas(t, n, a);
  }
  /**
   * Add a "doesn't have" clause to the query.
   */
  doesntHave(t) {
    return this.query().doesntHave(t);
  }
  /**
   * Add a "doesn't have" clause to the query.
   */
  orDoesntHave(t) {
    return this.query().orDoesntHave(t);
  }
  /**
   * Add a "where doesn't have" clause to the query.
   */
  whereDoesntHave(t, n = () => {
  }) {
    return this.query().whereDoesntHave(t, n);
  }
  /**
   * Add an "or where doesn't have" clause to the query.
   */
  orWhereDoesntHave(t, n = () => {
  }) {
    return this.query().orWhereDoesntHave(t, n);
  }
  /**
   * Make meta field visible
   */
  withMeta() {
    return this.query().withMeta();
  }
  /**
   * Make hidden fields visible
   */
  makeVisible(t) {
    return this.query().makeVisible(t);
  }
  /**
   * Make visible fields hidden
   */
  makeHidden(t) {
    return this.query().makeHidden(t);
  }
  /**
   * Add a "group by" clause to the query.
   */
  groupBy(...t) {
    return this.query().groupBy(...t);
  }
  /**
   * Add an "order by" clause to the query.
   */
  orderBy(t, n) {
    return this.query().orderBy(t, n);
  }
  /**
   * Set the "limit" value of the query.
   */
  limit(t) {
    return this.query().limit(t);
  }
  /**
   * Set the "offset" value of the query.
   */
  offset(t) {
    return this.query().offset(t);
  }
  /**
   * Set the relationships that should be eager loaded.
   */
  with(t, n) {
    return this.query().with(t, n);
  }
  /**
   * Set to eager load all top-level relationships. Constraint is set for all relationships.
   */
  withAll(t) {
    return this.query().withAll(t);
  }
  /**
   * Set to eager load all top-level relationships. Constraint is set for all relationships.
   */
  withAllRecursive(t) {
    return this.query().withAllRecursive(t);
  }
  /**
   * Define to use the cache for a query
   */
  useCache(t, n) {
    return this.query().useCache(t, n);
  }
  /**
   * Get all models from the store.
   */
  all() {
    return this.query().get();
  }
  revive(t) {
    return this.query().revive(t);
  }
  make(t) {
    return Se(t) ? t.map((n) => this.getModel().$newInstance(n, {
      relations: !0
    })) : this.getModel().$newInstance(t, {
      relations: !0
    });
  }
  save(t) {
    return this.query().save(t);
  }
  /**
   * Create and persist model with default values.
   */
  new(t = !0) {
    return this.query().new(t);
  }
  insert(t) {
    return this.query().insert(t);
  }
  fresh(t) {
    return this.query().fresh(t);
  }
  destroy(t) {
    return this.query().destroy(t);
  }
  /**
   * Delete all records in the store.
   */
  flush() {
    return this.query().flush();
  }
}
Ht(Xa, "_isRepository", !0);
Ht(Xa, "useModel");
var uv = Object.defineProperty, cv = (e, t, n) => t in e ? uv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, dv = (e, t, n) => (cv(e, t + "", n), n);
class fv {
  constructor() {
    dv(this, "models", {});
  }
  /**
   * Register the given model.
   */
  register(t) {
    const n = t.$self().modelEntity();
    this.models[n] || (this.models[n] = t, this.registerRelatedModels(t));
  }
  /**
   * Register all related models.
   */
  registerRelatedModels(t) {
    const n = t.$fields();
    for (const a in n) {
      const l = n[a];
      l instanceof Me && l.getRelateds().forEach((r) => {
        this.register(r);
      });
    }
  }
  /**
   * Get a model by the specified entity name.
   */
  getModel(t) {
    return this.models[t];
  }
}
const vv = (e) => e, Oo = [];
function hv(e) {
  let t = tt;
  return Oo.forEach((n) => {
    const a = n({ config: t, repository: e, model: e.getModel() });
    t = { ...t, ...a.config };
  }), e.setConfig(t), e;
}
function Ar(e, t) {
  const n = new fv(), a = e._isRepository ? new e(n, t).initialize() : new Xa(n, t).initialize(e);
  try {
    const l = Object.values(a.getModel().$types());
    l.length > 0 ? l.forEach((r) => a.database.register(r.newRawInstance())) : a.database.register(a.getModel());
  } catch (l) {
    console.error("[Pinia ORM] Failed to register models", l);
  }
  return hv(a);
}
function oS(e) {
  return tt.model = { ...Zl.model, ...e == null ? void 0 : e.model }, tt.cache = (e == null ? void 0 : e.cache) === !1 ? !1 : { ...Zl.cache, ...(e == null ? void 0 : e.cache) !== !0 && (e == null ? void 0 : e.cache) }, () => {
    function n(a) {
      Oo.push(a);
    }
    return {
      use: n
    };
  };
}
class mv extends la {
  /**
   * Make the value for the attribute.
   */
  make(t) {
    return t === void 0 ? this.defaultValue : t;
  }
}
let gv = class extends la {
  /**
   * Create a new String attribute instance.
   */
  constructor(t, n) {
    super(t, n);
  }
  /**
   * Make the value for the attribute.
   */
  make(t) {
    return this.makeReturn("string", t);
  }
}, yv = class extends la {
  /**
   * Create a new Number attribute instance.
   */
  constructor(t, n) {
    super(t, n);
  }
  /**
   * Make the value for the attribute.
   */
  make(t) {
    return this.makeReturn("number", t);
  }
}, bv = class extends la {
  /**
   * Create a new Boolean attribute instance.
   */
  constructor(t, n) {
    super(t, n);
  }
  /**
   * Make the value for the attribute.
   */
  make(t) {
    return this.makeReturn("boolean", t);
  }
};
var pv = Object.defineProperty, _v = (e, t, n) => t in e ? pv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, gi = (e, t, n) => (_v(e, typeof t != "symbol" ? t + "" : t, n), n);
class yi extends Me {
  /**
   * Create a new has-one relation instance.
   */
  constructor(t, n, a, l) {
    super(t, n), gi(this, "foreignKey"), gi(this, "localKey"), this.foreignKey = a, this.localKey = l;
  }
  /**
   * Get all related models for the relationship.
   */
  getRelateds() {
    return [this.related];
  }
  /**
   * Define the normalizr schema for the relation.
   */
  define(t) {
    return t.one(this.related, this.parent);
  }
  /**
   * Attach the relational key to the given relation.
   */
  attach(t, n) {
    this.compositeKeyMapper(
      this.foreignKey,
      this.localKey,
      (a, l) => {
        n[a] = t[l];
      }
    );
  }
  /**
   * Set the constraints for an eager load of the relation.
   */
  addEagerConstraints(t, n) {
    this.compositeKeyMapper(
      this.foreignKey,
      this.localKey,
      (a, l) => t.whereIn(a, this.getKeys(n, l))
    );
  }
  /**
   * Match the eagerly loaded results to their parents.
   */
  match(t, n, a) {
    const l = this.buildDictionary(a.get(!1));
    n.forEach((r) => {
      const i = r[this.getKey(this.localKey)];
      l[i] ? r.$setRelation(t, l[i][0]) : r.$setRelation(t, null);
    });
  }
  /**
   * Build model dictionary keyed by the relation's foreign key.
   */
  buildDictionary(t) {
    return this.mapToDictionary(t, (n) => [n[this.getKey(this.foreignKey)], n]);
  }
  /**
   * Make a related model.
   */
  make(t) {
    return t ? this.related.$newInstance(t) : null;
  }
}
var Sv = Object.defineProperty, wv = (e, t, n) => t in e ? Sv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Pl = (e, t, n) => (wv(e, typeof t != "symbol" ? t + "" : t, n), n);
class Cv extends Me {
  /**
   * Create a new belongs-to relation instance.
   */
  constructor(t, n, a, l) {
    super(t, n), Pl(this, "child"), Pl(this, "foreignKey"), Pl(this, "ownerKey"), this.foreignKey = a, this.ownerKey = l, this.child = n;
  }
  /**
   * Get all related models for the relationship.
   */
  getRelateds() {
    return [this.child];
  }
  /**
   * Define the normalizr schema for the relation.
   */
  define(t) {
    return t.one(this.child, this.parent);
  }
  /**
   * Attach the relational key to the given relation.
   */
  attach(t, n) {
    this.compositeKeyMapper(
      this.foreignKey,
      this.ownerKey,
      (a, l) => {
        t[a] = n[l];
      }
    );
  }
  /**
   * Set the constraints for an eager load of the relation.
   */
  addEagerConstraints(t, n) {
    this.compositeKeyMapper(
      this.foreignKey,
      this.ownerKey,
      (a, l) => t.whereIn(l, this.getEagerModelKeys(n, a))
    );
  }
  /**
   * Gather the keys from a collection of related models.
   */
  getEagerModelKeys(t, n) {
    return t.reduce((a, l) => (l[n] !== null && a.push(l[n]), a), []);
  }
  /**
   * Match the eagerly loaded results to their respective parents.
   */
  match(t, n, a) {
    const l = this.buildDictionary(a.get(!1));
    n.forEach((r) => {
      const i = r[this.getKey(this.foreignKey)];
      l[i] ? r.$setRelation(t, l[i]) : r.$setRelation(t, null);
    });
  }
  /**
   * Build model dictionary keyed by relation's parent key.
   */
  buildDictionary(t) {
    return t.reduce((n, a) => (n[a[this.getKey(this.ownerKey)]] = a, n), {});
  }
  /**
   * Make a related model.
   */
  make(t) {
    return t ? this.child.$newInstance(t) : null;
  }
}
var Iv = Object.defineProperty, kv = (e, t, n) => t in e ? Iv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, bi = (e, t, n) => (kv(e, typeof t != "symbol" ? t + "" : t, n), n);
class Ev extends Me {
  /**
   * Create a new has-many relation instance.
   */
  constructor(t, n, a, l) {
    super(t, n), bi(this, "foreignKey"), bi(this, "localKey"), this.foreignKey = a, this.localKey = l;
  }
  /**
   * Get all related models for the relationship.
   */
  getRelateds() {
    return [this.related];
  }
  /**
   * Define the normalizr schema for the relation.
   */
  define(t) {
    return t.many(this.related, this.parent);
  }
  /**
   * Attach the relational key to the given relation.
   */
  attach(t, n) {
    this.compositeKeyMapper(
      this.foreignKey,
      this.localKey,
      (a, l) => {
        n[a] = t[l];
      }
    );
  }
  /**
   * Set the constraints for an eager load of the relation.
   */
  addEagerConstraints(t, n) {
    this.compositeKeyMapper(
      this.foreignKey,
      this.localKey,
      (a, l) => t.whereIn(a, this.getKeys(n, l))
    );
  }
  /**
   * Match the eagerly loaded results to their parents.
   */
  match(t, n, a) {
    const l = this.buildDictionary(a.get(!1));
    n.forEach((r) => {
      const i = this.getKey(
        Se(this.localKey) ? this.localKey.map((s) => r[s]) : r[this.localKey]
      );
      l[i] ? r.$setRelation(t, l[i]) : r.$setRelation(t, []);
    });
  }
  /**
   * Build model dictionary keyed by the relation's foreign key.
   */
  buildDictionary(t) {
    return this.mapToDictionary(t, (n) => [this.getKey(
      Se(this.foreignKey) ? this.foreignKey.map((l) => n[l]) : n[this.foreignKey]
    ), n]);
  }
  /**
   * Make related models.
   */
  make(t) {
    return t ? t.map((n) => this.related.$newInstance(n)) : [];
  }
}
var xv = Object.defineProperty, Pv = (e, t, n) => t in e ? xv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, $l = (e, t, n) => (Pv(e, typeof t != "symbol" ? t + "" : t, n), n);
class $v extends Me {
  /**
   * Create a new has-many-by relation instance.
   */
  constructor(t, n, a, l) {
    super(t, n), $l(this, "child"), $l(this, "foreignKey"), $l(this, "ownerKey"), this.foreignKey = a, this.ownerKey = l, this.child = n;
  }
  /**
   * Get all related models for the relationship.
   */
  getRelateds() {
    return [this.child];
  }
  /**
   * Define the normalizr schema for the relation.
   */
  define(t) {
    return t.many(this.child, this.parent);
  }
  /**
   * Attach the relational key to the given relation.
   */
  attach(t, n) {
    n[this.ownerKey] !== void 0 && (t[this.foreignKey] || (t[this.foreignKey] = []), this.attachIfMissing(t[this.foreignKey], n[this.ownerKey]));
  }
  /**
   * Push owner key to foregin key array if owner key doesn't exist in foreign
   * key array.
   */
  attachIfMissing(t, n) {
    t.includes(n) || t.push(n);
  }
  /**
   * Set the constraints for an eager load of the relation.
   */
  addEagerConstraints(t, n) {
    t.whereIn(this.ownerKey, this.getEagerModelKeys(n));
  }
  /**
   * Gather the keys from a collection of related models.
   */
  getEagerModelKeys(t) {
    return t.reduce((n, a) => [...n, ...a[this.foreignKey]], []);
  }
  /**
   * Match the eagerly loaded results to their parents.
   */
  match(t, n, a) {
    const l = this.buildDictionary(a.get(!1));
    n.forEach((r) => {
      const i = this.getRelatedModels(
        l,
        r[this.foreignKey]
      );
      r.$setRelation(t, i);
    });
  }
  /**
   * Build model dictionary keyed by the relation's foreign key.
   */
  buildDictionary(t) {
    return t.reduce((n, a) => (n[a[this.ownerKey]] = a, n), {});
  }
  /**
   * Get all related models from the given dictionary.
   */
  getRelatedModels(t, n) {
    return n.reduce((a, l) => {
      const r = t[l];
      return r && a.push(r), a;
    }, []);
  }
  /**
   * Make related models.
   */
  make(t) {
    return t ? t.map((n) => this.child.$newInstance(n)) : [];
  }
}
var Tv = Object.defineProperty, Av = (e, t, n) => t in e ? Tv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Tl = (e, t, n) => (Av(e, typeof t != "symbol" ? t + "" : t, n), n);
class pi extends Me {
  /**
   * Create a new morph-one relation instance.
   */
  constructor(t, n, a, l, r) {
    super(t, n), Tl(this, "morphId"), Tl(this, "morphType"), Tl(this, "localKey"), this.morphId = a, this.morphType = l, this.localKey = r;
  }
  /**
   * Get all related models for the relationship.
   */
  getRelateds() {
    return [this.related];
  }
  /**
   * Define the normalizr schema for the relation.
   */
  define(t) {
    return t.one(this.related, this.parent);
  }
  /**
   * Attach the parent type and id to the given relation.
   */
  attach(t, n) {
    n[this.morphId] = t[this.localKey], n[this.morphType] = this.parent.$entity();
  }
  /**
   * Set the constraints for an eager load of the relation.
   */
  addEagerConstraints(t, n) {
    t.where(this.morphType, this.parent.$entity()).whereIn(this.morphId, this.getKeys(n, this.localKey));
  }
  /**
   * Match the eagerly loaded results to their parents.
   */
  match(t, n, a) {
    const l = this.buildDictionary(a.get(!1));
    n.forEach((r) => {
      const i = r[this.localKey];
      l[i] ? r.$setRelation(t, l[i]) : r.$setRelation(t, null);
    });
  }
  /**
   * Build model dictionary keyed by the relation's foreign key.
   */
  buildDictionary(t) {
    return t.reduce((n, a) => (n[a[this.morphId]] = a, n), {});
  }
  /**
   * Make a related model.
   */
  make(t) {
    return t ? this.related.$newInstance(t) : null;
  }
}
var Ov = Object.defineProperty, Lv = (e, t, n) => t in e ? Ov(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Al = (e, t, n) => (Lv(e, typeof t != "symbol" ? t + "" : t, n), n);
class Vv extends Me {
  /**
   * Create a new morph-many relation instance.
   */
  constructor(t, n, a, l, r) {
    super(t, n), Al(this, "morphId"), Al(this, "morphType"), Al(this, "localKey"), this.morphId = a, this.morphType = l, this.localKey = r;
  }
  /**
   * Get all related models for the relationship.
   */
  getRelateds() {
    return [this.related];
  }
  /**
   * Define the normalizr schema for the relation.
   */
  define(t) {
    return t.many(this.related, this.parent);
  }
  /**
   * Attach the parent type and id to the given relation.
   */
  attach(t, n) {
    n[this.morphId] = t[this.localKey], n[this.morphType] = this.parent.$entity();
  }
  /**
   * Set the constraints for an eager load of the relation.
   */
  addEagerConstraints(t, n) {
    t.where(this.morphType, this.parent.$entity()), t.whereIn(this.morphId, this.getKeys(n, this.localKey));
  }
  /**
   * Match the eagerly loaded results to their parents.
   */
  match(t, n, a) {
    const l = this.buildDictionary(a.get(!1));
    n.forEach((r) => {
      const i = r[this.localKey];
      l[i] ? r.$setRelation(t, l[i]) : r.$setRelation(t, []);
    });
  }
  /**
   * Build model dictionary keyed by the relation's foreign key.
   */
  buildDictionary(t) {
    return this.mapToDictionary(t, (n) => [n[this.morphId], n]);
  }
  /**
   * Make related models.
   */
  make(t) {
    return t ? t.map((n) => this.related.$newInstance(n)) : [];
  }
}
var Nv = Object.defineProperty, Rv = (e, t, n) => t in e ? Nv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Dn = (e, t, n) => (Rv(e, typeof t != "symbol" ? t + "" : t, n), n);
class Fv extends Me {
  /**
   * Create a new has-many-through relation instance.
   */
  constructor(t, n, a, l, r, i, s) {
    super(t, n), Dn(this, "through"), Dn(this, "firstKey"), Dn(this, "secondKey"), Dn(this, "localKey"), Dn(this, "secondLocalKey"), this.through = a, this.firstKey = l, this.secondKey = r, this.localKey = i, this.secondLocalKey = s;
  }
  /**
   * Get all related models for the relationship.
   */
  getRelateds() {
    return [this.related, this.through];
  }
  /**
   * Define the normalizr schema for the relation.
   */
  define(t) {
    return t.many(this.related, this.parent);
  }
  /**
   * Attach the relational key to the given data. Since has many through
   * relationship doesn't have any foreign key, it would do nothing.
   */
  attach(t, n) {
  }
  /**
   * Only register missing through relation
   */
  addEagerConstraints(t, n) {
  }
  /**
   * Match the eagerly loaded results to their parents.
   */
  match(t, n, a) {
    const l = a.newQuery(this.through.$entity()).where(this.firstKey, this.getKeys(n, this.localKey)).get(!1), r = a.where(this.secondKey, this.getKeys(l, this.secondLocalKey)).groupBy(this.secondKey).get(!1), i = this.buildDictionary(l, r);
    n.forEach((s) => {
      const o = s[this.localKey];
      i[o] ? s.$setRelation(t, i[o][0]) : s.$setRelation(t, []);
    });
  }
  /**
   * Build model dictionary keyed by the relation's foreign key.
   */
  buildDictionary(t, n) {
    return this.mapToDictionary(t, (a) => [a[this.firstKey], n[a[this.secondLocalKey]]]);
  }
  /**
   * Make related models.
   */
  make(t) {
    return t ? t.map((n) => this.related.$newInstance(n)) : [];
  }
}
var Dv = Object.defineProperty, Mv = (e, t, n) => t in e ? Dv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, ln = (e, t, n) => (Mv(e, typeof t != "symbol" ? t + "" : t, n), n);
class Bv extends Me {
  /**
   * Create a new morph to many to instance.
   */
  constructor(t, n, a, l, r, i, s, o) {
    super(t, n), ln(this, "pivot"), ln(this, "morphId"), ln(this, "morphType"), ln(this, "relatedId"), ln(this, "parentKey"), ln(this, "relatedKey"), ln(this, "pivotKey", "pivot"), this.pivot = a, this.morphId = r, this.morphType = i, this.relatedId = l, this.parentKey = s, this.relatedKey = o;
  }
  /**
   * Get all related models for the relationship.
   */
  getRelateds() {
    return [this.related, this.pivot];
  }
  /**
   * Define the normalizr schema for the relationship.
   */
  define(t) {
    return t.many(this.related, this.parent);
  }
  /**
   * Attach the parent type and id to the given relation.
   */
  attach(t, n) {
    const a = n.pivot ?? {};
    a[this.morphId] = t[this.parentKey], a[this.morphType] = this.parent.$entity(), a[this.relatedId] = n[this.relatedKey], n[`pivot_${this.relatedId}_${this.pivot.$entity()}`] = a;
  }
  /**
   * Convert given value to the appropriate value for the attribute.
   */
  make(t) {
    return t ? t.map((n) => this.related.$newInstance(n)) : [];
  }
  /**
   * Match the eagerly loaded results to their parents.
   */
  match(t, n, a) {
    const l = a.get(!1), r = a.newQuery(this.pivot.$modelEntity()).whereIn(this.relatedId, this.getKeys(l, this.relatedKey)).whereIn(this.morphId, this.getKeys(n, this.parentKey)).groupBy(this.morphId, this.relatedId, this.morphType).get();
    n.forEach((i) => {
      const s = [];
      l.forEach((o) => {
        var f;
        const u = ((f = r[`[${i[this.parentKey]},${o[this.relatedKey]},${this.parent.$entity()}]`]) == null ? void 0 : f[0]) ?? null, c = o.$newInstance(o.$toJson(), { operation: void 0 });
        c.$setRelation("pivot", u), u && s.push(c);
      }), i.$setRelation(t, s);
    });
  }
  /**
   * Set the constraints for the related relation.
   */
  addEagerConstraints(t, n) {
  }
}
var Hv = Object.defineProperty, Wv = (e, t, n) => t in e ? Hv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, we = (e, t, n) => (Wv(e, typeof t != "symbol" ? t + "" : t, n), n);
let Ce = class {
  /**
   * Create a new model instance.
   */
  constructor(t, n = { operation: "set" }) {
    we(this, "pivot"), this.$boot(), (n.fill ?? !0) && this.$fill(t, n);
  }
  /**
   * Create a new model fields definition.
   */
  static fields() {
    return {};
  }
  static usedNamespace() {
    return this.namespace ?? tt.model.namespace;
  }
  static modelEntity() {
    return (this.usedNamespace() ? this.usedNamespace() + "/" : "") + this.entity;
  }
  /**
   * Build the schema by evaluating fields and registry.
   */
  static initializeSchema() {
    const t = this.modelEntity();
    this.schemas[t] = {}, this.fieldsOnDelete[t] = this.fieldsOnDelete[t] ?? {};
    const n = {
      ...this.fields(),
      ...this.registries[t]
    };
    for (const a in n) {
      const l = n[a];
      this.schemas[t][a] = typeof l == "function" ? l() : l, this.fieldsOnDelete[t][a] && (this.schemas[t][a] = this.schemas[t][a].onDelete(this.fieldsOnDelete[t][a]));
    }
  }
  /**
   * Set the attribute to the registry.
   */
  static setRegistry(t, n) {
    return this.registries[this.modelEntity()] || (this.registries[this.modelEntity()] = {}), this.registries[this.modelEntity()][t] = n, this;
  }
  /**
   * Set delete behaviour for relation field
   */
  static setFieldDeleteMode(t, n) {
    return this.fieldsOnDelete[this.modelEntity()] = this.fieldsOnDelete[this.modelEntity()] ?? {}, this.fieldsOnDelete[this.modelEntity()][t] = n, this;
  }
  /**
   * Set an mutator for a field
   */
  static setMutator(t, n) {
    return this.fieldMutators[t] = n, this;
  }
  /**
   * Set a cast for a field
   */
  static setCast(t, n) {
    return this.fieldCasts[t] = n, this;
  }
  /**
   * Set a field to hidden
   */
  static setHidden(t) {
    return this.hidden.push(t), this;
  }
  /**
   * Clear the list of booted models so they can be re-booted.
   */
  static clearBootedModels() {
    this.booted = {}, this.original = {}, this.schemas = {}, this.fieldMutators = {}, this.fieldCasts = {}, this.hidden = [], this.visible = [];
  }
  /**
   * Clear registries.
   */
  static clearRegistries() {
    this.registries = {};
  }
  /**
   * Create a new model instance without field values being populated.
   *
   * This method is mainly for the internal use when registering models to the
   * database. Since all pre-registered models are for referencing its model
   * setting during the various process, but the fields are not required.
   *
   * Use this method when you want create a new model instance for:
   * - Registering model to a component (eg. Repository, Query, etc.)
   * - Registering model to attributes (String, Has Many, etc.)
   */
  static newRawInstance() {
    return new this(void 0, { fill: !1 });
  }
  /**
   * Create a new Attr attribute instance.
   */
  static attr(t) {
    return new mv(this.newRawInstance(), t);
  }
  /**
   * Create a new String attribute instance.
   */
  static string(t) {
    return new gv(this.newRawInstance(), t);
  }
  /**
   * Create a new Number attribute instance.
   */
  static number(t) {
    return new yv(this.newRawInstance(), t);
  }
  /**
   * Create a new Boolean attribute instance.
   */
  static boolean(t) {
    return new bv(this.newRawInstance(), t);
  }
  /**
   * Create a new Uid attribute instance.
   */
  static uid(t) {
    return new Po(this.newRawInstance(), t);
  }
  /**
   * Create a new HasOne relation instance.
   */
  static hasOne(t, n, a) {
    const l = this.newRawInstance();
    return a = a ?? l.$getKeyName(), new yi(l, t.newRawInstance(), n, a);
  }
  /**
   * Create a new BelongsTo relation instance.
   */
  static belongsTo(t, n, a) {
    const l = t.newRawInstance();
    return a = a ?? l.$getKeyName(), new Cv(this.newRawInstance(), l, n, a);
  }
  /**
   * Create a new HasMany relation instance.
   */
  static belongsToMany(t, n, a, l, r, i) {
    const s = t.newRawInstance(), o = this.newRawInstance(), u = n.newRawInstance();
    return r = r ?? o.$getLocalKey(), i = i ?? s.$getLocalKey(), this.schemas[t.modelEntity()][`pivot_${l}_${u.$entity()}`] = new yi(s, u, l, i), new To(
      o,
      s,
      u,
      a,
      l,
      r,
      i
    );
  }
  /**
   * Create a new MorphToMany relation instance.
   */
  static morphToMany(t, n, a, l, r, i, s) {
    const o = t.newRawInstance(), u = this.newRawInstance(), c = n.newRawInstance();
    return i = i ?? u.$getLocalKey(), s = s ?? o.$getLocalKey(), this.schemas[t.modelEntity()][`pivot_${a}_${c.$entity()}`] = new pi(o, c, a, u.$entity(), s), new Bv(
      u,
      o,
      c,
      a,
      l,
      r,
      i,
      s
    );
  }
  /**
   * Create a new HasMany relation instance.
   */
  static hasMany(t, n, a) {
    const l = this.newRawInstance();
    return a = a ?? l.$getKeyName(), new Ev(l, t.newRawInstance(), n, a);
  }
  /**
   * Create a new HasManyBy relation instance.
   */
  static hasManyBy(t, n, a) {
    const l = t.newRawInstance();
    return a = a ?? l.$getLocalKey(), new $v(this.newRawInstance(), l, n, a);
  }
  /**
   * Create a new HasMany relation instance.
   */
  static hasManyThrough(t, n, a, l, r, i) {
    const s = this.newRawInstance(), o = n.newRawInstance();
    return r = r ?? s.$getLocalKey(), i = i ?? o.$getLocalKey(), new Fv(s, t.newRawInstance(), o, a, l, r, i);
  }
  /**
   * Create a new MorphOne relation instance.
   */
  static morphOne(t, n, a, l) {
    const r = this.newRawInstance();
    return l = l ?? r.$getLocalKey(), new pi(r, t.newRawInstance(), n, a, l);
  }
  /**
   * Create a new MorphTo relation instance.
   */
  static morphTo(t, n, a, l = "") {
    const r = this.newRawInstance(), i = t.map((s) => s.newRawInstance());
    return new Jl(r, i, n, a, l);
  }
  /**
   * Create a new MorphMany relation instance.
   */
  static morphMany(t, n, a, l) {
    const r = this.newRawInstance();
    return l = l ?? r.$getLocalKey(), new Vv(r, t.newRawInstance(), n, a, l);
  }
  /**
   * Mutators to mutate matching fields when instantiating the model.
   */
  static mutators() {
    return {};
  }
  /**
   * Casts to cast matching fields when instantiating the model.
   */
  static casts() {
    return {};
  }
  /**
   * Types mapping used to dispatch entities based on their discriminator field
   */
  static types() {
    return {};
  }
  /**
   * Get the constructor for this model.
   */
  $self() {
    return this.constructor;
  }
  /**
   * Get the entity for this model.
   */
  $entity() {
    return this.$self().entity;
  }
  /**
   * Get the model config.
   */
  $config() {
    return this.$self().config;
  }
  /**
   * Get the namespace.
   */
  $namespace() {
    return this.$self().usedNamespace();
  }
  /**
   * Get the store name.
   */
  $storeName() {
    return (this.$namespace() ? this.$namespace() + "/" : "") + this.$baseEntity();
  }
  /**
   * Get the base entity for this model.
   */
  $baseEntity() {
    return this.$self().baseEntity ?? this.$entity();
  }
  /**
   * Get the base namespace for this model.
   */
  $baseNamespace() {
    return this.$self().baseNamespace ?? this.$namespace();
  }
  /**
   * Get the model entity for this model.
   */
  $modelEntity() {
    return this.$self().modelEntity();
  }
  /**
   * Get the type key for this model.
   */
  $typeKey() {
    return this.$self().typeKey;
  }
  /**
   * Get the types for this model.
   */
  $types() {
    return this.$self().types();
  }
  /**
   * Get the pinia options for this model.
   */
  $piniaOptions() {
    return this.$self().piniaOptions;
  }
  /**
   * Get the primary key for this model.
   */
  $primaryKey() {
    return this.$self().primaryKey;
  }
  /**
   * Get the model fields for this model.
   */
  $fields() {
    return this.$self().schemas[this.$modelEntity()];
  }
  /**
   * Get the model hidden fields
   */
  $hidden() {
    return this.$self().hidden;
  }
  /**
   * Get the model visible fields
   */
  $visible() {
    return this.$self().visible;
  }
  /**
   * Create a new instance of this model. This method provides a convenient way
   * to re-generate a fresh instance of this model. It's particularly useful
   * during hydration through Query operations.
   */
  $newInstance(t, n) {
    const a = this.$self();
    return new a(t, n);
  }
  /**
   * Bootstrap this model.
   */
  $boot() {
    this.$self().booted[this.$modelEntity()] || (this.$self().booted[this.$modelEntity()] = !0, this.$initializeSchema());
  }
  /**
   * Build the schema by evaluating fields and registry.
   */
  $initializeSchema() {
    this.$self().initializeSchema();
  }
  $casts() {
    return {
      ...this.$getCasts(),
      ...this.$self().fieldCasts
    };
  }
  /**
   * Fill this model by the given attributes. Missing fields will be populated
   * by the attributes default value.
   */
  $fill(t = {}, n = {}) {
    var o;
    const a = n.operation ?? "get", l = {
      ...tt.model,
      ...this.$config()
    };
    l.withMeta && (this.$self().schemas[this.$entity()][this.$self().metaKey] = this.$self().attr({}));
    const r = this.$fields(), i = n.relations ?? !0, s = {
      ...this.$getMutators(),
      ...this.$self().fieldMutators
    };
    for (const u in r) {
      if (a === "get" && !this.isFieldVisible(u, this.$hidden(), this.$visible(), n))
        continue;
      const c = r[u];
      let f = t[u];
      if (c instanceof Me && !i)
        continue;
      const d = s == null ? void 0 : s[u], m = (o = this.$casts()[u]) == null ? void 0 : o.newRawInstance(r);
      d && a === "get" && (f = typeof d == "function" ? d(f) : typeof d.get == "function" ? d.get(f) : f), m && a === "get" && (f = m.get(f));
      let v = this.$fillField(u, c, f);
      d && typeof d != "function" && a === "set" && d.set && (v = d.set(v)), m && a === "set" && (v = n.action === "update" ? m.get(v) : m.set(v)), this[u] = this[u] ?? v;
    }
    return a === "set" && (this.$self().original[this.$getKey(this, !0)] = this.$getAttributes()), l.withMeta && a === "set" && this.$fillMeta(n.action), this;
  }
  $fillMeta(t = "save") {
    const n = Math.floor(Date.now() / 1e3);
    t === "save" && (this[this.$self().metaKey] = {
      createdAt: n,
      updatedAt: n
    }), t === "update" && (this[this.$self().metaKey].updatedAt = n);
  }
  /**
   * Fill the given attribute with a given value specified by the given key.
   */
  $fillField(t, n, a) {
    if (a !== void 0)
      return n instanceof Jl ? n.setKey(t).make(a, this[n.getType()]) : n.setKey(t).make(a);
    if (this[t] === void 0)
      return n.setKey(t).make();
  }
  isFieldVisible(t, n, a, l) {
    const r = n.length > 0 ? n : tt.model.hidden, i = [...a.length > 0 ? a : tt.model.visible, String(this.$primaryKey())], s = l.visible ?? [], o = l.hidden ?? [];
    return (r.includes("*") || r.includes(t)) && !s.includes(t) || o.includes(t) ? !1 : (i.includes("*") || i.includes(t)) && !o.includes(t) || s.includes(t);
  }
  /**
   * Get the primary key field name.
   */
  $getKeyName() {
    return this.$primaryKey();
  }
  /**
   * Get primary key value for the model. If the model has the composite key,
   * it will return an array of ids.
   */
  $getKey(t, n = !1) {
    if (t = t ?? this, this.$hasCompositeKey()) {
      const l = this.$getCompositeKey(t);
      return n ? "[" + (l == null ? void 0 : l.join(",")) + "]" : l;
    }
    const a = t[this.$getKeyName()];
    return ql(a) ? null : a;
  }
  /**
   * Check whether the model has composite key.
   */
  $hasCompositeKey() {
    return Se(this.$getKeyName());
  }
  /**
   * Get the composite key values for the given model as an array of ids.
   */
  $getCompositeKey(t) {
    let n = [];
    return this.$getKeyName().every((a) => {
      const l = t[a];
      return ql(l) ? (n = null, !1) : (n.push(l), !0);
    }), n === null ? null : n;
  }
  /**
   * Get the index id of this model or for a given record.
   */
  $getIndexId(t) {
    const n = t ?? this, a = this.$getKey(n);
    return jn(a !== null, [
      "The record is missing the primary key. If you want to persist record",
      "without the primary key, please define the primary key field with the",
      "`uid` attribute."
    ]), this.$stringifyId(a);
  }
  /**
   * Stringify the given id.
   */
  $stringifyId(t) {
    return Se(t) ? JSON.stringify(t) : String(t);
  }
  /**
   * Get the local key name for the model.
   */
  $getLocalKey() {
    return jn(!this.$hasCompositeKey(), [
      "Please provide the local key for the relationship. The model with the",
      "composite key can't infer its local key."
    ]), this.$getKeyName();
  }
  /**
   * Get the relation instance for the given relation name.
   */
  $getRelation(t) {
    let n = this.$fields()[t];
    return Object.values(this.$types()).forEach((l) => {
      n === void 0 && (n = l.fields()[t]);
    }), jn(n instanceof Me, [
      `Relationship [${t}] on model [${this.$entity()}] not found.`
    ]), n;
  }
  /**
   * Set the given relationship on the model.
   */
  $setRelation(t, n) {
    return t.includes("pivot") ? (this.pivot = n, this) : (this.$fields()[t] && (this[t] = n), this);
  }
  /**
   * Get the mutators of the model
   */
  $getMutators() {
    return this.$self().mutators();
  }
  /**
   * Get the casts of the model
   */
  $getCasts() {
    return this.$self().casts();
  }
  /**
   * Get the original values of the model instance
   */
  $getOriginal() {
    return this.$self().original[this.$getKey(this, !0)];
  }
  /**
   * Return the model instance with its original state
   */
  $refresh() {
    return this.$isDirty() && Object.entries(this.$getOriginal()).forEach((t) => {
      this[t[0]] = t[1];
    }), this;
  }
  /**
   * Checks if attributes were changed
   */
  $isDirty(t) {
    const n = this.$getOriginal();
    return t ? (Object.keys(n).includes(t) || qa(['The property"', t, '"does not exit in the model "', this.$entity(), '"']), !Xl(this[t], n[t])) : !Xl(n, this.$getAttributes());
  }
  /**
   * Get the serialized model attributes.
   */
  $getAttributes() {
    return this.$toJson(this, { relations: !1 });
  }
  /**
   * Serialize this model, or the given model, as POJO.
   */
  $toJson(t, n = {}) {
    t = t ?? this;
    const a = t.$fields(), l = n.relations ?? !0, r = {};
    for (const i in a) {
      const s = a[i], o = t[i];
      if (!(s instanceof Me)) {
        r[i] = this.serializeValue(o);
        continue;
      }
      l && (r[i] = this.serializeRelation(o));
    }
    return r;
  }
  /**
   * Serialize the given value.
   */
  serializeValue(t) {
    return t === null ? null : Se(t) ? this.serializeArray(t) : typeof t == "object" ? wo(t) ? t.toISOString() : this.serializeObject(t) : t;
  }
  /**
   * Serialize the given array to JSON.
   */
  serializeArray(t) {
    return t.map((n) => this.serializeValue(n));
  }
  /**
   * Serialize the given object to JSON.
   */
  serializeObject(t) {
    const n = {};
    if (t.serialize && typeof t.serialize == "function")
      return t.serialize(t);
    for (const a in t)
      n[a] = this.serializeValue(t[a]);
    return n;
  }
  serializeRelation(t) {
    if (t !== void 0)
      return t === null ? null : Se(t) ? t.map((n) => n.$toJson()) : t.$toJson();
  }
};
we(Ce, "entity");
we(Ce, "baseEntity");
we(Ce, "baseNamespace");
we(Ce, "namespace");
we(Ce, "primaryKey", "id");
we(Ce, "metaKey", "_meta");
we(Ce, "hidden", ["_meta"]);
we(Ce, "visible", []);
we(Ce, "config");
we(Ce, "typeKey", "type");
we(Ce, "fieldsOnDelete", {});
we(Ce, "original", {});
we(Ce, "schemas", {});
we(Ce, "registries", {});
we(Ce, "piniaOptions", {});
we(Ce, "fieldMutators", {});
we(Ce, "fieldCasts", {});
we(Ce, "booted", {});
we(Ce, "saving", () => {
});
we(Ce, "updating", () => {
});
we(Ce, "creating", () => {
});
we(Ce, "deleting", () => {
});
we(Ce, "retrieved", () => {
});
we(Ce, "saved", () => {
});
we(Ce, "updated", () => {
});
we(Ce, "created", () => {
});
we(Ce, "deleted", () => {
});
var Kv = Object.defineProperty, jv = (e, t, n) => t in e ? Kv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Mn = (e, t, n) => (jv(e, typeof t != "symbol" ? t + "" : t, n), n);
class Uv {
  /**
   * Create a new response instance.
   */
  constructor(t, n, a) {
    Mn(this, "repository"), Mn(this, "config"), Mn(this, "response"), Mn(this, "entities", null), Mn(this, "isSaved", !1), this.repository = t, this.config = n, this.response = a;
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
    const a = await this.repository[n](t);
    this.entities = Array.isArray(a) ? a : [a], this.isSaved = !0;
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
var zv = Object.defineProperty, Gv = (e, t, n) => t in e ? zv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, _i = (e, t, n) => (Gv(e, typeof t != "symbol" ? t + "" : t, n), n);
class Yv {
  /**
   * Create a new api instance.
   */
  constructor(t) {
    _i(this, "repository"), _i(this, "config", {
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
    var n, a, l;
    const t = { ...(n = this.repository.config.axiosApi) == null ? void 0 : n.actions, ...(l = (a = this.repository.getModel().$config()) == null ? void 0 : a.axiosApi) == null ? void 0 : l.actions };
    if (t)
      for (const r in t) {
        const i = t[r];
        typeof i == "function" ? this.registerFunctionAction(r, i) : this.registerObjectAction(r, i);
      }
  }
  /**
   * Register the given object action.
   */
  registerObjectAction(t, n) {
    this[t] = (a) => this.request({ ...n, ...a });
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
  post(t, n = {}, a = {}) {
    return this.request({ method: "post", url: t, data: n, ...a });
  }
  /**
   * Perform a put request.
   */
  put(t, n = {}, a = {}) {
    return this.request({ method: "put", url: t, data: n, ...a });
  }
  /**
   * Perform a patch request.
   */
  patch(t, n = {}, a = {}) {
    return this.request({ method: "patch", url: t, data: n, ...a });
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
    const n = this.createConfig(t), a = await this.axios.request(n);
    return this.createResponse(a, n);
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
    const a = new Uv(this.repository, n, t);
    return n.delete !== void 0 ? (await a.delete(), a) : (n.save && await a.save(), a);
  }
}
var qv = Object.defineProperty, Xv = (e, t, n) => t in e ? qv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Ol = (e, t, n) => (Xv(e, typeof t != "symbol" ? t + "" : t, n), n);
class Si extends Xa {
  constructor() {
    var t;
    super(...arguments), Ol(this, "axios", ((t = tt == null ? void 0 : tt.axiosApi) == null ? void 0 : t.axios) || null), Ol(this, "globalApiConfig", (tt == null ? void 0 : tt.axiosApi) || {}), Ol(this, "apiConfig", {});
  }
  api() {
    return Qv(this);
  }
  setAxios(t) {
    return this.axios = t, this;
  }
}
function Qv(e) {
  return new Yv(e);
}
function Jv(e) {
  const t = lf();
  return Si.useModel = e, Ar(Si, t);
}
function vS(e) {
  return vv((t) => (t.config.axiosApi = e, t));
}
class ra {
  constructor(t = { app: "" }) {
    for (const n in t)
      this[n] = t[n];
  }
  getTitle(t) {
    return this.title ? this.title instanceof Function ? this.title(t) : `${t[this.title]}` : null;
  }
}
class gn extends Ce {
  get $meta() {
    return this.constructor.meta;
  }
  get $title() {
    return this.$meta.getTitle(this);
  }
  $url(t) {
    let n = this.$meta.url;
    return this.id && (n += `/${this.id}/`), t && (n += t), `${n}/`.replaceAll("//", "/");
  }
}
Ye(gn, "meta", new ra({
  app: "ox_core"
}));
class er extends gn {
  static fields() {
    return {
      id: this.attr(null),
      app: this.string(""),
      model: this.string(""),
      app_verbose: this.string(""),
      model_verbose: this.string(""),
      permissions: this.hasMany(zn, "content_type_id")
    };
  }
  /**
  * @property {string} label used as django identifier
  */
  get label() {
    return `${this.app}.${this.model}`;
  }
  /**
  * Return Permission for the provided action.
  * @param {string} action Permission's action to match.
  * @return Permission or null if not found
  */
  getPermission(t) {
    const n = this.permissions.filter((a) => a.action == t);
    return n && n[0] || null;
  }
}
Ye(er, "entity", "contentTypes"), Ye(er, "meta", new ra({
  app: "contenttypes",
  model: "content_type",
  url: "ox/core/content_type/",
  title: "label"
}));
class zn extends gn {
  static fields() {
    return {
      id: this.attr(null),
      name: this.string(""),
      label: this.string(""),
      codename: this.string(""),
      content_type_id: this.attr(null),
      content_type: this.belongsTo(er, "content_type_id")
    };
  }
  //! Action based on codename
  get action() {
    return this.codename.split("_")[0];
  }
}
Ye(zn, "entity", "permissions"), Ye(zn, "meta", new ra({
  app: "auth",
  model: "permission",
  url: "ox/core/permission/",
  title: "label"
}));
class wi {
  constructor(t = []) {
    Ye(this, "items");
    this.items = t;
  }
  /**
  * Return true when user has the permission to execute the action.
  */
  can(t, n) {
    return this.items ? Array.isArray(this.items) ? this.items.every((a) => this._can(a, t, n)) : this._can(this.items, t, n) : !0;
  }
  _can(t, n, a) {
    if (t instanceof Function)
      return t(n, a);
    if (!n || !(a instanceof gn))
      return !1;
    const l = a.constructor.meta;
    return n.can(`${l.app}.${t}_${l.model}`);
  }
}
class Ia extends gn {
  static fields() {
    return {
      id: this.attr(null),
      name: this.string(""),
      permissions_id: this.attr([]),
      permissions: this.hasManyBy(zn, "permissions_id")
    };
  }
}
Ye(Ia, "entity", "groups"), Ye(Ia, "meta", new ra({
  app: "auth",
  model: "group",
  url: "ox/core/group/",
  icon: "mdi-account-multiple",
  title: "name"
})), Ye(Ia, "config", {
  axiosApi: {
    dataKey: "results"
  }
});
class En extends gn {
  static fields() {
    return {
      id: this.attr(null),
      username: this.string(""),
      last_name: this.string(""),
      first_name: this.string(""),
      email: this.string(""),
      is_superuser: this.boolean(!1),
      all_permissions: this.attr([]),
      permissions_id: this.attr([]),
      permissions: this.hasManyBy(zn, "permissions_id"),
      groups_id: this.attr([]),
      groups: this.hasManyBy(Ia, "groups_id")
    };
  }
  can(t) {
    var n;
    return ((n = this.all_permissions) == null ? void 0 : n.includes(t)) || !1;
  }
  canAny(t) {
    var n;
    return ((n = this.all_permissions) == null ? void 0 : n.some((a) => t.includes(a))) || !1;
  }
}
Ye(En, "entity", "users"), Ye(En, "meta", new ra({
  app: "auth",
  model: "user",
  url: "ox/core/user/",
  icon: "mdi-account",
  title: "username"
})), Ye(En, "config", {
  axiosApi: {
    dataKey: "results",
    actions: {
      updatePassword(t, n) {
        return this.post(
          `ox/core/user/${t}/password/`,
          { password: n },
          { save: !1 }
        );
      }
    }
  }
});
function Zv(e, t = !0) {
  const n = {};
  Array.isArray(e) || (e = Object.values(e)), t && !e.includes(En) && e.push(En);
  for (const a of e)
    if (a && a.entity) {
      if (a.entity in n)
        continue;
      Ar(a), n[a.entity] = Jv(a);
    }
  return Ee("models", e), Ee("repos", n), { models: e, repos: n };
}
function hS() {
  return {
    permissions: [String, Function, Object, Array]
  };
}
function eh(e, t, n) {
  const a = t instanceof wi ? t : new wi(t), l = _(() => a.can(De(e), De(n)));
  return { permissions: a, allowed: l };
}
function mS(e, { user: t, emits: n = void 0 }) {
  const a = Y(!1), { permissions: l, allowed: r } = eh(t, e.permissions, e.item);
  async function i(...s) {
    if (e.confirm && !confirm(e.confirm))
      return;
    if (!r.value)
      throw Error("You are not allowed to execute this action");
    a.value = !0;
    let o = e.run(t, e.item, ...s);
    return o instanceof Promise && (o = await o), a.value = !1, n && n("completed", e.item, ...s), o;
  }
  return { processing: a, permissions: l, allowed: r, run: i };
}
function gS({ repo: e, method: t, options: n = void 0, serialize: a = void 0, url: l = void 0, path: r = void 0 }) {
  return async function(i, s) {
    const o = [
      l ?? s.$url(r)
    ];
    a && o.push(a(i, s));
    const u = n instanceof Function ? n(i, s) : n;
    return await e.api()[t](...o, u);
  };
}
class th {
  // TODO
  /*static reactive(path: string, value: any, options: IObject): IRPanel {
      const panel = reactive(new this(path, value, options)) as IRPanel
      panel.edited = computed(() => panel.isEdited())
      return panel
  }*/
  constructor(t, n, a) {
    this.reset(t, n, a);
  }
  isEdited() {
    var t;
    return !!((t = this.editions) != null && t.size);
  }
  setEdition(t, n) {
    n ? this.editions.add(t) : this.editions.delete(t);
  }
  reset(t = "", n = null, { title: a = "", icon: l = "", allowed: r = !1, force: i = !1, href: s = "" } = {}) {
    if (!i && this.isEdited() && !confirm("There are unsaved change. Do you still wan't to proceed?"))
      return;
    if (s && window.location.pathname != s) {
      window.location.href = `${s}?panel=${t}`;
      return;
    }
    const [o, u] = this.splitPath(t);
    (l || o && this.name != o) && (this.icon = l), o && (this.name = o), this.view = u, this.value = n, this.editions = /* @__PURE__ */ new Set(), this.title = a, this.allowed = r;
  }
  splitPath(t) {
    if (!t)
      return ["", ""];
    const n = t.indexOf(".");
    return n < 0 ? [t, ""] : [t.substring(0, n), t.substring(n + 1)];
  }
}
const yS = {
  name: String,
  title: { type: String, default: "" },
  icon: { type: String, default: "" },
  href: { type: String, default: "" },
  /**
   * Only display when panel is active.
   */
  auto: { type: Boolean, default: !1 }
}, bS = {
  name: String,
  title: { type: String, default: "" },
  icon: { type: String, default: "" },
  tabbed: { type: Boolean, default: !1 }
};
function pS({ name: e = "", relations: t = [], headers: n = [] } = {}) {
  return {
    name: { type: String, default: e },
    tabbed: { type: Boolean, default: !1 },
    relations: { type: Array, default: () => t },
    headers: { type: Array, default: () => [
      ...n,
      { key: "actions", title: "Actions" }
    ] }
  };
}
class nh {
  static reactive(t) {
    const n = Xe(new this(t));
    return n.user = _(() => {
      var a;
      return new En(((a = n.data) == null ? void 0 : a.user) || {});
    }), n;
  }
  constructor({ apiUrl: t = void 0, dataEl: n = void 0, models: a = void 0, data: l = void 0 } = {}) {
    this.apiUrl = t, this.dataEl = n, this.models = a, this.data = l, this.panel = new th();
  }
  /**
   * Load data into AppData. If no `value` is provided, read it from
   * source element.
   */
  load(t = void 0) {
    this.dataEl !== void 0 && (t === void 0 && (t = this.readData(this.dataEl)), t.dataEl = this.dataEl, this.data = t, this.panel && this.data.panel && (this.panel.value = t)), this.models !== void 0 && (this.repos = Zv(this.models).repos);
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
function _S(e, t = !0) {
  const n = nh.reactive(e);
  return t && n.dataEl && n.load(), Ee("context", n), Ee("user", n.user), Ee("panel", n.panel), n;
}
/*!
  * shared v10.0.4
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
const $a = typeof window < "u", Jt = (e, t = !1) => t ? Symbol.for(e) : Symbol(e), ah = (e, t, n) => lh({ l: e, k: t, s: n }), lh = (e) => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), Be = (e) => typeof e == "number" && isFinite(e), rh = (e) => Or(e) === "[object Date]", Pn = (e) => Or(e) === "[object RegExp]", Qa = (e) => de(e) && Object.keys(e).length === 0, He = Object.assign;
let Ci;
const on = () => Ci || (Ci = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ii(e) {
  return e.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const ih = Object.prototype.hasOwnProperty;
function Ta(e, t) {
  return ih.call(e, t);
}
const Le = Array.isArray, Pe = (e) => typeof e == "function", G = (e) => typeof e == "string", me = (e) => typeof e == "boolean", ge = (e) => e !== null && typeof e == "object", sh = (e) => ge(e) && Pe(e.then) && Pe(e.catch), Lo = Object.prototype.toString, Or = (e) => Lo.call(e), de = (e) => Or(e) === "[object Object]", oh = (e) => e == null ? "" : Le(e) || de(e) && e.toString === Lo ? JSON.stringify(e, null, 2) : String(e);
function Lr(e, t = "") {
  return e.reduce((n, a, l) => l === 0 ? n + a : n + t + a, "");
}
function uh(e, t) {
  typeof console < "u" && (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
const ma = (e) => !ge(e) || Le(e);
function ka(e, t) {
  if (ma(e) || ma(t))
    throw new Error("Invalid value");
  const n = [{ src: e, des: t }];
  for (; n.length; ) {
    const { src: a, des: l } = n.pop();
    Object.keys(a).forEach((r) => {
      ge(a[r]) && !ge(l[r]) && (l[r] = Array.isArray(a[r]) ? [] : {}), ma(l[r]) || ma(a[r]) ? l[r] = a[r] : n.push({ src: a[r], des: l[r] });
    });
  }
}
/*!
  * message-compiler v10.0.4
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
function ch(e, t, n) {
  return { line: e, column: t, offset: n };
}
function tr(e, t, n) {
  return { start: e, end: t };
}
const _e = {
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
  UNEXPECTED_LEXICAL_ANALYSIS: 14,
  // generator error codes
  UNHANDLED_CODEGEN_NODE_TYPE: 15,
  // minifier error codes
  UNHANDLED_MINIFIER_NODE_TYPE: 16
}, dh = 17;
function Ja(e, t, n = {}) {
  const { domain: a, messages: l, args: r } = n, i = e, s = new SyntaxError(String(i));
  return s.code = e, t && (s.location = t), s.domain = a, s;
}
function fh(e) {
  throw e;
}
const Bt = " ", vh = "\r", qe = `
`, hh = "\u2028", mh = "\u2029";
function gh(e) {
  const t = e;
  let n = 0, a = 1, l = 1, r = 0;
  const i = (C) => t[C] === vh && t[C + 1] === qe, s = (C) => t[C] === qe, o = (C) => t[C] === mh, u = (C) => t[C] === hh, c = (C) => i(C) || s(C) || o(C) || u(C), f = () => n, d = () => a, m = () => l, v = () => r, g = (C) => i(C) || o(C) || u(C) ? qe : t[C], b = () => g(n), y = () => g(n + r);
  function p() {
    return r = 0, c(n) && (a++, l = 0), i(n) && n++, n++, l++, t[n];
  }
  function x() {
    return i(n + r) && r++, r++, t[n + r];
  }
  function w() {
    n = 0, a = 1, l = 1, r = 0;
  }
  function I(C = 0) {
    r = C;
  }
  function k() {
    const C = n + r;
    for (; C !== n; )
      p();
    r = 0;
  }
  return {
    index: f,
    line: d,
    column: m,
    peekOffset: v,
    charAt: g,
    currentChar: b,
    currentPeek: y,
    next: p,
    peek: x,
    reset: w,
    resetPeek: I,
    skipToPeek: k
  };
}
const Yt = void 0, yh = ".", ki = "'", bh = "tokenizer";
function ph(e, t = {}) {
  const n = t.location !== !1, a = gh(e), l = () => a.index(), r = () => ch(a.line(), a.column(), a.index()), i = r(), s = l(), o = {
    currentType: 13,
    offset: s,
    startLoc: i,
    endLoc: i,
    lastType: 13,
    lastOffset: s,
    lastStartLoc: i,
    lastEndLoc: i,
    braceNest: 0,
    inLinked: !1,
    text: ""
  }, u = () => o, { onError: c } = t;
  function f(P, $, B, ...ae) {
    const Ne = u();
    if ($.column += B, $.offset += B, c) {
      const fe = n ? tr(Ne.startLoc, $) : null, N = Ja(P, fe, {
        domain: bh,
        args: ae
      });
      c(N);
    }
  }
  function d(P, $, B) {
    P.endLoc = r(), P.currentType = $;
    const ae = { type: $ };
    return n && (ae.loc = tr(P.startLoc, P.endLoc)), B != null && (ae.value = B), ae;
  }
  const m = (P) => d(
    P,
    13
    /* TokenTypes.EOF */
  );
  function v(P, $) {
    return P.currentChar() === $ ? (P.next(), $) : (f(_e.EXPECTED_TOKEN, r(), 0, $), "");
  }
  function g(P) {
    let $ = "";
    for (; P.currentPeek() === Bt || P.currentPeek() === qe; )
      $ += P.currentPeek(), P.peek();
    return $;
  }
  function b(P) {
    const $ = g(P);
    return P.skipToPeek(), $;
  }
  function y(P) {
    if (P === Yt)
      return !1;
    const $ = P.charCodeAt(0);
    return $ >= 97 && $ <= 122 || // a-z
    $ >= 65 && $ <= 90 || // A-Z
    $ === 95;
  }
  function p(P) {
    if (P === Yt)
      return !1;
    const $ = P.charCodeAt(0);
    return $ >= 48 && $ <= 57;
  }
  function x(P, $) {
    const { currentType: B } = $;
    if (B !== 2)
      return !1;
    g(P);
    const ae = y(P.currentPeek());
    return P.resetPeek(), ae;
  }
  function w(P, $) {
    const { currentType: B } = $;
    if (B !== 2)
      return !1;
    g(P);
    const ae = P.currentPeek() === "-" ? P.peek() : P.currentPeek(), Ne = p(ae);
    return P.resetPeek(), Ne;
  }
  function I(P, $) {
    const { currentType: B } = $;
    if (B !== 2)
      return !1;
    g(P);
    const ae = P.currentPeek() === ki;
    return P.resetPeek(), ae;
  }
  function k(P, $) {
    const { currentType: B } = $;
    if (B !== 7)
      return !1;
    g(P);
    const ae = P.currentPeek() === ".";
    return P.resetPeek(), ae;
  }
  function C(P, $) {
    const { currentType: B } = $;
    if (B !== 8)
      return !1;
    g(P);
    const ae = y(P.currentPeek());
    return P.resetPeek(), ae;
  }
  function S(P, $) {
    const { currentType: B } = $;
    if (!(B === 7 || B === 11))
      return !1;
    g(P);
    const ae = P.currentPeek() === ":";
    return P.resetPeek(), ae;
  }
  function E(P, $) {
    const { currentType: B } = $;
    if (B !== 9)
      return !1;
    const ae = () => {
      const fe = P.currentPeek();
      return fe === "{" ? y(P.peek()) : fe === "@" || fe === "|" || fe === ":" || fe === "." || fe === Bt || !fe ? !1 : fe === qe ? (P.peek(), ae()) : O(P, !1);
    }, Ne = ae();
    return P.resetPeek(), Ne;
  }
  function A(P) {
    g(P);
    const $ = P.currentPeek() === "|";
    return P.resetPeek(), $;
  }
  function O(P, $ = !0) {
    const B = (Ne = !1, fe = "") => {
      const N = P.currentPeek();
      return N === "{" || N === "@" || !N ? Ne : N === "|" ? !(fe === Bt || fe === qe) : N === Bt ? (P.peek(), B(!0, Bt)) : N === qe ? (P.peek(), B(!0, qe)) : !0;
    }, ae = B();
    return $ && P.resetPeek(), ae;
  }
  function T(P, $) {
    const B = P.currentChar();
    return B === Yt ? Yt : $(B) ? (P.next(), B) : null;
  }
  function L(P) {
    const $ = P.charCodeAt(0);
    return $ >= 97 && $ <= 122 || // a-z
    $ >= 65 && $ <= 90 || // A-Z
    $ >= 48 && $ <= 57 || // 0-9
    $ === 95 || // _
    $ === 36;
  }
  function M(P) {
    return T(P, L);
  }
  function j(P) {
    const $ = P.charCodeAt(0);
    return $ >= 97 && $ <= 122 || // a-z
    $ >= 65 && $ <= 90 || // A-Z
    $ >= 48 && $ <= 57 || // 0-9
    $ === 95 || // _
    $ === 36 || // $
    $ === 45;
  }
  function z(P) {
    return T(P, j);
  }
  function Q(P) {
    const $ = P.charCodeAt(0);
    return $ >= 48 && $ <= 57;
  }
  function le(P) {
    return T(P, Q);
  }
  function V(P) {
    const $ = P.charCodeAt(0);
    return $ >= 48 && $ <= 57 || // 0-9
    $ >= 65 && $ <= 70 || // A-F
    $ >= 97 && $ <= 102;
  }
  function R(P) {
    return T(P, V);
  }
  function F(P) {
    let $ = "", B = "";
    for (; $ = le(P); )
      B += $;
    return B;
  }
  function H(P) {
    let $ = "";
    for (; ; ) {
      const B = P.currentChar();
      if (B === "{" || B === "}" || B === "@" || B === "|" || !B)
        break;
      if (B === Bt || B === qe)
        if (O(P))
          $ += B, P.next();
        else {
          if (A(P))
            break;
          $ += B, P.next();
        }
      else
        $ += B, P.next();
    }
    return $;
  }
  function ie(P) {
    b(P);
    let $ = "", B = "";
    for (; $ = z(P); )
      B += $;
    return P.currentChar() === Yt && f(_e.UNTERMINATED_CLOSING_BRACE, r(), 0), B;
  }
  function te(P) {
    b(P);
    let $ = "";
    return P.currentChar() === "-" ? (P.next(), $ += `-${F(P)}`) : $ += F(P), P.currentChar() === Yt && f(_e.UNTERMINATED_CLOSING_BRACE, r(), 0), $;
  }
  function ue(P) {
    return P !== ki && P !== qe;
  }
  function X(P) {
    b(P), v(P, "'");
    let $ = "", B = "";
    for (; $ = T(P, ue); )
      $ === "\\" ? B += se(P) : B += $;
    const ae = P.currentChar();
    return ae === qe || ae === Yt ? (f(_e.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, r(), 0), ae === qe && (P.next(), v(P, "'")), B) : (v(P, "'"), B);
  }
  function se(P) {
    const $ = P.currentChar();
    switch ($) {
      case "\\":
      case "'":
        return P.next(), `\\${$}`;
      case "u":
        return ce(P, $, 4);
      case "U":
        return ce(P, $, 6);
      default:
        return f(_e.UNKNOWN_ESCAPE_SEQUENCE, r(), 0, $), "";
    }
  }
  function ce(P, $, B) {
    v(P, $);
    let ae = "";
    for (let Ne = 0; Ne < B; Ne++) {
      const fe = R(P);
      if (!fe) {
        f(_e.INVALID_UNICODE_ESCAPE_SEQUENCE, r(), 0, `\\${$}${ae}${P.currentChar()}`);
        break;
      }
      ae += fe;
    }
    return `\\${$}${ae}`;
  }
  function Oe(P) {
    return P !== "{" && P !== "}" && P !== Bt && P !== qe;
  }
  function ve(P) {
    b(P);
    let $ = "", B = "";
    for (; $ = T(P, Oe); )
      B += $;
    return B;
  }
  function yt(P) {
    let $ = "", B = "";
    for (; $ = M(P); )
      B += $;
    return B;
  }
  function Dt(P) {
    const $ = (B) => {
      const ae = P.currentChar();
      return ae === "{" || ae === "@" || ae === "|" || ae === "(" || ae === ")" || !ae || ae === Bt ? B : (B += ae, P.next(), $(B));
    };
    return $("");
  }
  function $t(P) {
    b(P);
    const $ = v(
      P,
      "|"
      /* TokenChars.Pipe */
    );
    return b(P), $;
  }
  function Ct(P, $) {
    let B = null;
    switch (P.currentChar()) {
      case "{":
        return $.braceNest >= 1 && f(_e.NOT_ALLOW_NEST_PLACEHOLDER, r(), 0), P.next(), B = d(
          $,
          2,
          "{"
          /* TokenChars.BraceLeft */
        ), b(P), $.braceNest++, B;
      case "}":
        return $.braceNest > 0 && $.currentType === 2 && f(_e.EMPTY_PLACEHOLDER, r(), 0), P.next(), B = d(
          $,
          3,
          "}"
          /* TokenChars.BraceRight */
        ), $.braceNest--, $.braceNest > 0 && b(P), $.inLinked && $.braceNest === 0 && ($.inLinked = !1), B;
      case "@":
        return $.braceNest > 0 && f(_e.UNTERMINATED_CLOSING_BRACE, r(), 0), B = Mt(P, $) || m($), $.braceNest = 0, B;
      default: {
        let Ne = !0, fe = !0, N = !0;
        if (A(P))
          return $.braceNest > 0 && f(_e.UNTERMINATED_CLOSING_BRACE, r(), 0), B = d($, 1, $t(P)), $.braceNest = 0, $.inLinked = !1, B;
        if ($.braceNest > 0 && ($.currentType === 4 || $.currentType === 5 || $.currentType === 6))
          return f(_e.UNTERMINATED_CLOSING_BRACE, r(), 0), $.braceNest = 0, Gt(P, $);
        if (Ne = x(P, $))
          return B = d($, 4, ie(P)), b(P), B;
        if (fe = w(P, $))
          return B = d($, 5, te(P)), b(P), B;
        if (N = I(P, $))
          return B = d($, 6, X(P)), b(P), B;
        if (!Ne && !fe && !N)
          return B = d($, 12, ve(P)), f(_e.INVALID_TOKEN_IN_PLACEHOLDER, r(), 0, B.value), b(P), B;
        break;
      }
    }
    return B;
  }
  function Mt(P, $) {
    const { currentType: B } = $;
    let ae = null;
    const Ne = P.currentChar();
    switch ((B === 7 || B === 8 || B === 11 || B === 9) && (Ne === qe || Ne === Bt) && f(_e.INVALID_LINKED_FORMAT, r(), 0), Ne) {
      case "@":
        return P.next(), ae = d(
          $,
          7,
          "@"
          /* TokenChars.LinkedAlias */
        ), $.inLinked = !0, ae;
      case ".":
        return b(P), P.next(), d(
          $,
          8,
          "."
          /* TokenChars.LinkedDot */
        );
      case ":":
        return b(P), P.next(), d(
          $,
          9,
          ":"
          /* TokenChars.LinkedDelimiter */
        );
      default:
        return A(P) ? (ae = d($, 1, $t(P)), $.braceNest = 0, $.inLinked = !1, ae) : k(P, $) || S(P, $) ? (b(P), Mt(P, $)) : C(P, $) ? (b(P), d($, 11, yt(P))) : E(P, $) ? (b(P), Ne === "{" ? Ct(P, $) || ae : d($, 10, Dt(P))) : (B === 7 && f(_e.INVALID_LINKED_FORMAT, r(), 0), $.braceNest = 0, $.inLinked = !1, Gt(P, $));
    }
  }
  function Gt(P, $) {
    let B = {
      type: 13
      /* TokenTypes.EOF */
    };
    if ($.braceNest > 0)
      return Ct(P, $) || m($);
    if ($.inLinked)
      return Mt(P, $) || m($);
    switch (P.currentChar()) {
      case "{":
        return Ct(P, $) || m($);
      case "}":
        return f(_e.UNBALANCED_CLOSING_BRACE, r(), 0), P.next(), d(
          $,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
      case "@":
        return Mt(P, $) || m($);
      default: {
        if (A(P))
          return B = d($, 1, $t(P)), $.braceNest = 0, $.inLinked = !1, B;
        if (O(P))
          return d($, 0, H(P));
        break;
      }
    }
    return B;
  }
  function Sl() {
    const { currentType: P, offset: $, startLoc: B, endLoc: ae } = o;
    return o.lastType = P, o.lastOffset = $, o.lastStartLoc = B, o.lastEndLoc = ae, o.offset = l(), o.startLoc = r(), a.currentChar() === Yt ? d(
      o,
      13
      /* TokenTypes.EOF */
    ) : Gt(a, o);
  }
  return {
    nextToken: Sl,
    currentOffset: l,
    currentPosition: r,
    context: u
  };
}
const _h = "parser", Sh = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function wh(e, t, n) {
  switch (e) {
    case "\\\\":
      return "\\";
    case "\\'":
      return "'";
    default: {
      const a = parseInt(t || n, 16);
      return a <= 55295 || a >= 57344 ? String.fromCodePoint(a) : "�";
    }
  }
}
function Ch(e = {}) {
  const t = e.location !== !1, { onError: n } = e;
  function a(y, p, x, w, ...I) {
    const k = y.currentPosition();
    if (k.offset += w, k.column += w, n) {
      const C = t ? tr(x, k) : null, S = Ja(p, C, {
        domain: _h,
        args: I
      });
      n(S);
    }
  }
  function l(y, p, x) {
    const w = { type: y };
    return t && (w.start = p, w.end = p, w.loc = { start: x, end: x }), w;
  }
  function r(y, p, x, w) {
    t && (y.end = p, y.loc && (y.loc.end = x));
  }
  function i(y, p) {
    const x = y.context(), w = l(3, x.offset, x.startLoc);
    return w.value = p, r(w, y.currentOffset(), y.currentPosition()), w;
  }
  function s(y, p) {
    const x = y.context(), { lastOffset: w, lastStartLoc: I } = x, k = l(5, w, I);
    return k.index = parseInt(p, 10), y.nextToken(), r(k, y.currentOffset(), y.currentPosition()), k;
  }
  function o(y, p) {
    const x = y.context(), { lastOffset: w, lastStartLoc: I } = x, k = l(4, w, I);
    return k.key = p, y.nextToken(), r(k, y.currentOffset(), y.currentPosition()), k;
  }
  function u(y, p) {
    const x = y.context(), { lastOffset: w, lastStartLoc: I } = x, k = l(9, w, I);
    return k.value = p.replace(Sh, wh), y.nextToken(), r(k, y.currentOffset(), y.currentPosition()), k;
  }
  function c(y) {
    const p = y.nextToken(), x = y.context(), { lastOffset: w, lastStartLoc: I } = x, k = l(8, w, I);
    return p.type !== 11 ? (a(y, _e.UNEXPECTED_EMPTY_LINKED_MODIFIER, x.lastStartLoc, 0), k.value = "", r(k, w, I), {
      nextConsumeToken: p,
      node: k
    }) : (p.value == null && a(y, _e.UNEXPECTED_LEXICAL_ANALYSIS, x.lastStartLoc, 0, At(p)), k.value = p.value || "", r(k, y.currentOffset(), y.currentPosition()), {
      node: k
    });
  }
  function f(y, p) {
    const x = y.context(), w = l(7, x.offset, x.startLoc);
    return w.value = p, r(w, y.currentOffset(), y.currentPosition()), w;
  }
  function d(y) {
    const p = y.context(), x = l(6, p.offset, p.startLoc);
    let w = y.nextToken();
    if (w.type === 8) {
      const I = c(y);
      x.modifier = I.node, w = I.nextConsumeToken || y.nextToken();
    }
    switch (w.type !== 9 && a(y, _e.UNEXPECTED_LEXICAL_ANALYSIS, p.lastStartLoc, 0, At(w)), w = y.nextToken(), w.type === 2 && (w = y.nextToken()), w.type) {
      case 10:
        w.value == null && a(y, _e.UNEXPECTED_LEXICAL_ANALYSIS, p.lastStartLoc, 0, At(w)), x.key = f(y, w.value || "");
        break;
      case 4:
        w.value == null && a(y, _e.UNEXPECTED_LEXICAL_ANALYSIS, p.lastStartLoc, 0, At(w)), x.key = o(y, w.value || "");
        break;
      case 5:
        w.value == null && a(y, _e.UNEXPECTED_LEXICAL_ANALYSIS, p.lastStartLoc, 0, At(w)), x.key = s(y, w.value || "");
        break;
      case 6:
        w.value == null && a(y, _e.UNEXPECTED_LEXICAL_ANALYSIS, p.lastStartLoc, 0, At(w)), x.key = u(y, w.value || "");
        break;
      default: {
        a(y, _e.UNEXPECTED_EMPTY_LINKED_KEY, p.lastStartLoc, 0);
        const I = y.context(), k = l(7, I.offset, I.startLoc);
        return k.value = "", r(k, I.offset, I.startLoc), x.key = k, r(x, I.offset, I.startLoc), {
          nextConsumeToken: w,
          node: x
        };
      }
    }
    return r(x, y.currentOffset(), y.currentPosition()), {
      node: x
    };
  }
  function m(y) {
    const p = y.context(), x = p.currentType === 1 ? y.currentOffset() : p.offset, w = p.currentType === 1 ? p.endLoc : p.startLoc, I = l(2, x, w);
    I.items = [];
    let k = null;
    do {
      const E = k || y.nextToken();
      switch (k = null, E.type) {
        case 0:
          E.value == null && a(y, _e.UNEXPECTED_LEXICAL_ANALYSIS, p.lastStartLoc, 0, At(E)), I.items.push(i(y, E.value || ""));
          break;
        case 5:
          E.value == null && a(y, _e.UNEXPECTED_LEXICAL_ANALYSIS, p.lastStartLoc, 0, At(E)), I.items.push(s(y, E.value || ""));
          break;
        case 4:
          E.value == null && a(y, _e.UNEXPECTED_LEXICAL_ANALYSIS, p.lastStartLoc, 0, At(E)), I.items.push(o(y, E.value || ""));
          break;
        case 6:
          E.value == null && a(y, _e.UNEXPECTED_LEXICAL_ANALYSIS, p.lastStartLoc, 0, At(E)), I.items.push(u(y, E.value || ""));
          break;
        case 7: {
          const A = d(y);
          I.items.push(A.node), k = A.nextConsumeToken || null;
          break;
        }
      }
    } while (p.currentType !== 13 && p.currentType !== 1);
    const C = p.currentType === 1 ? p.lastOffset : y.currentOffset(), S = p.currentType === 1 ? p.lastEndLoc : y.currentPosition();
    return r(I, C, S), I;
  }
  function v(y, p, x, w) {
    const I = y.context();
    let k = w.items.length === 0;
    const C = l(1, p, x);
    C.cases = [], C.cases.push(w);
    do {
      const S = m(y);
      k || (k = S.items.length === 0), C.cases.push(S);
    } while (I.currentType !== 13);
    return k && a(y, _e.MUST_HAVE_MESSAGES_IN_PLURAL, x, 0), r(C, y.currentOffset(), y.currentPosition()), C;
  }
  function g(y) {
    const p = y.context(), { offset: x, startLoc: w } = p, I = m(y);
    return p.currentType === 13 ? I : v(y, x, w, I);
  }
  function b(y) {
    const p = ph(y, He({}, e)), x = p.context(), w = l(0, x.offset, x.startLoc);
    return t && w.loc && (w.loc.source = y), w.body = g(p), e.onCacheKey && (w.cacheKey = e.onCacheKey(y)), x.currentType !== 13 && a(p, _e.UNEXPECTED_LEXICAL_ANALYSIS, x.lastStartLoc, 0, y[x.offset] || ""), r(w, p.currentOffset(), p.currentPosition()), w;
  }
  return { parse: b };
}
function At(e) {
  if (e.type === 13)
    return "EOF";
  const t = (e.value || "").replace(/\r?\n/gu, "\\n");
  return t.length > 10 ? t.slice(0, 9) + "…" : t;
}
function Ih(e, t = {}) {
  const n = {
    ast: e,
    helpers: /* @__PURE__ */ new Set()
  };
  return { context: () => n, helper: (r) => (n.helpers.add(r), r) };
}
function Ei(e, t) {
  for (let n = 0; n < e.length; n++)
    Vr(e[n], t);
}
function Vr(e, t) {
  switch (e.type) {
    case 1:
      Ei(e.cases, t), t.helper(
        "plural"
        /* HelperNameMap.PLURAL */
      );
      break;
    case 2:
      Ei(e.items, t);
      break;
    case 6: {
      Vr(e.key, t), t.helper(
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
function kh(e, t = {}) {
  const n = Ih(e);
  n.helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  ), e.body && Vr(e.body, n);
  const a = n.context();
  e.helpers = Array.from(a.helpers);
}
function Eh(e) {
  const t = e.body;
  return t.type === 2 ? xi(t) : t.cases.forEach((n) => xi(n)), e;
}
function xi(e) {
  if (e.items.length === 1) {
    const t = e.items[0];
    (t.type === 3 || t.type === 9) && (e.static = t.value, delete t.value);
  } else {
    const t = [];
    for (let n = 0; n < e.items.length; n++) {
      const a = e.items[n];
      if (!(a.type === 3 || a.type === 9) || a.value == null)
        break;
      t.push(a.value);
    }
    if (t.length === e.items.length) {
      e.static = Lr(t);
      for (let n = 0; n < e.items.length; n++) {
        const a = e.items[n];
        (a.type === 3 || a.type === 9) && delete a.value;
      }
    }
  }
}
function In(e) {
  switch (e.t = e.type, e.type) {
    case 0: {
      const t = e;
      In(t.body), t.b = t.body, delete t.body;
      break;
    }
    case 1: {
      const t = e, n = t.cases;
      for (let a = 0; a < n.length; a++)
        In(n[a]);
      t.c = n, delete t.cases;
      break;
    }
    case 2: {
      const t = e, n = t.items;
      for (let a = 0; a < n.length; a++)
        In(n[a]);
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
      In(t.key), t.k = t.key, delete t.key, t.modifier && (In(t.modifier), t.m = t.modifier, delete t.modifier);
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
function xh(e, t) {
  const { sourceMap: n, filename: a, breakLineCode: l, needIndent: r } = t, i = t.location !== !1, s = {
    filename: a,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    map: void 0,
    breakLineCode: l,
    needIndent: r,
    indentLevel: 0
  };
  i && e.loc && (s.source = e.loc.source);
  const o = () => s;
  function u(b, y) {
    s.code += b;
  }
  function c(b, y = !0) {
    const p = y ? l : "";
    u(r ? p + "  ".repeat(b) : p);
  }
  function f(b = !0) {
    const y = ++s.indentLevel;
    b && c(y);
  }
  function d(b = !0) {
    const y = --s.indentLevel;
    b && c(y);
  }
  function m() {
    c(s.indentLevel);
  }
  return {
    context: o,
    push: u,
    indent: f,
    deindent: d,
    newline: m,
    helper: (b) => `_${b}`,
    needIndent: () => s.needIndent
  };
}
function Ph(e, t) {
  const { helper: n } = e;
  e.push(`${n(
    "linked"
    /* HelperNameMap.LINKED */
  )}(`), $n(e, t.key), t.modifier ? (e.push(", "), $n(e, t.modifier), e.push(", _type")) : e.push(", undefined, _type"), e.push(")");
}
function $h(e, t) {
  const { helper: n, needIndent: a } = e;
  e.push(`${n(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`), e.indent(a());
  const l = t.items.length;
  for (let r = 0; r < l && ($n(e, t.items[r]), r !== l - 1); r++)
    e.push(", ");
  e.deindent(a()), e.push("])");
}
function Th(e, t) {
  const { helper: n, needIndent: a } = e;
  if (t.cases.length > 1) {
    e.push(`${n(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`), e.indent(a());
    const l = t.cases.length;
    for (let r = 0; r < l && ($n(e, t.cases[r]), r !== l - 1); r++)
      e.push(", ");
    e.deindent(a()), e.push("])");
  }
}
function Ah(e, t) {
  t.body ? $n(e, t.body) : e.push("null");
}
function $n(e, t) {
  const { helper: n } = e;
  switch (t.type) {
    case 0:
      Ah(e, t);
      break;
    case 1:
      Th(e, t);
      break;
    case 2:
      $h(e, t);
      break;
    case 6:
      Ph(e, t);
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
const Oh = (e, t = {}) => {
  const n = G(t.mode) ? t.mode : "normal", a = G(t.filename) ? t.filename : "message.intl", l = !!t.sourceMap, r = t.breakLineCode != null ? t.breakLineCode : n === "arrow" ? ";" : `
`, i = t.needIndent ? t.needIndent : n !== "arrow", s = e.helpers || [], o = xh(e, {
    mode: n,
    filename: a,
    sourceMap: l,
    breakLineCode: r,
    needIndent: i
  });
  o.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), o.indent(i), s.length > 0 && (o.push(`const { ${Lr(s.map((f) => `${f}: _${f}`), ", ")} } = ctx`), o.newline()), o.push("return "), $n(o, e), o.deindent(i), o.push("}"), delete e.helpers;
  const { code: u, map: c } = o.context();
  return {
    ast: e,
    code: u,
    map: c ? c.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function Lh(e, t = {}) {
  const n = He({}, t), a = !!n.jit, l = !!n.minify, r = n.optimize == null ? !0 : n.optimize, s = Ch(n).parse(e);
  return a ? (r && Eh(s), l && In(s), { ast: s, code: "" }) : (kh(s, n), Oh(s, n));
}
/*!
  * core-base v10.0.4
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
function Vh() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (on().__INTLIFY_PROD_DEVTOOLS__ = !1), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (on().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1);
}
function Ll(e) {
  return (n) => Nh(n, e);
}
function Nh(e, t) {
  const n = t.b || t.body;
  if ((n.t || n.type) === 1) {
    const a = n, l = a.c || a.cases;
    return e.plural(l.reduce((r, i) => [
      ...r,
      Pi(e, i)
    ], []));
  } else
    return Pi(e, n);
}
function Pi(e, t) {
  const n = t.s || t.static;
  if (n != null)
    return e.type === "text" ? n : e.normalize([n]);
  {
    const a = (t.i || t.items).reduce((l, r) => [...l, nr(e, r)], []);
    return e.normalize(a);
  }
}
function nr(e, t) {
  const n = t.t || t.type;
  switch (n) {
    case 3: {
      const a = t;
      return a.v || a.value;
    }
    case 9: {
      const a = t;
      return a.v || a.value;
    }
    case 4: {
      const a = t;
      return e.interpolate(e.named(a.k || a.key));
    }
    case 5: {
      const a = t;
      return e.interpolate(e.list(a.i != null ? a.i : a.index));
    }
    case 6: {
      const a = t, l = a.m || a.modifier;
      return e.linked(nr(e, a.k || a.key), l ? nr(e, l) : void 0, e.type);
    }
    case 7: {
      const a = t;
      return a.v || a.value;
    }
    case 8: {
      const a = t;
      return a.v || a.value;
    }
    default:
      throw new Error(`unhandled node type on format message part: ${n}`);
  }
}
const Rh = (e) => e;
let ga = /* @__PURE__ */ Object.create(null);
const Tn = (e) => ge(e) && (e.t === 0 || e.type === 0) && ("b" in e || "body" in e);
function Fh(e, t = {}) {
  let n = !1;
  const a = t.onError || fh;
  return t.onError = (l) => {
    n = !0, a(l);
  }, { ...Lh(e, t), detectError: n };
}
// @__NO_SIDE_EFFECTS__
function Dh(e, t) {
  if (!__INTLIFY_DROP_MESSAGE_COMPILER__ && G(e)) {
    me(t.warnHtmlMessage) && t.warnHtmlMessage;
    const a = (t.onCacheKey || Rh)(e), l = ga[a];
    if (l)
      return l;
    const { ast: r, detectError: i } = Fh(e, {
      ...t,
      location: !1,
      jit: !0
    }), s = Ll(r);
    return i ? s : ga[a] = s;
  } else {
    const n = e.cacheKey;
    if (n) {
      const a = ga[n];
      return a || (ga[n] = Ll(e));
    } else
      return Ll(e);
  }
}
let Gn = null;
function Mh(e) {
  Gn = e;
}
function Bh(e, t, n) {
  Gn && Gn.emit("i18n:init", {
    timestamp: Date.now(),
    i18n: e,
    version: t,
    meta: n
  });
}
const Hh = /* @__PURE__ */ Wh("function:translate");
function Wh(e) {
  return (t) => Gn && Gn.emit(e, t);
}
const Wt = {
  INVALID_ARGUMENT: dh,
  // 17
  INVALID_DATE_ARGUMENT: 18,
  INVALID_ISO_DATE_ARGUMENT: 19,
  NOT_SUPPORT_NON_STRING_MESSAGE: 20,
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
  NOT_SUPPORT_LOCALE_TYPE: 23
}, Kh = 24;
function Kt(e) {
  return Ja(e, null, void 0);
}
function Nr(e, t) {
  return t.locale != null ? $i(t.locale) : $i(e.locale);
}
let Vl;
function $i(e) {
  if (G(e))
    return e;
  if (Pe(e)) {
    if (e.resolvedOnce && Vl != null)
      return Vl;
    if (e.constructor.name === "Function") {
      const t = e();
      if (sh(t))
        throw Kt(Wt.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
      return Vl = t;
    } else
      throw Kt(Wt.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
  } else
    throw Kt(Wt.NOT_SUPPORT_LOCALE_TYPE);
}
function jh(e, t, n) {
  return [.../* @__PURE__ */ new Set([
    n,
    ...Le(t) ? t : ge(t) ? Object.keys(t) : G(t) ? [t] : [n]
  ])];
}
function Vo(e, t, n) {
  const a = G(n) ? n : Yn, l = e;
  l.__localeChainCache || (l.__localeChainCache = /* @__PURE__ */ new Map());
  let r = l.__localeChainCache.get(a);
  if (!r) {
    r = [];
    let i = [n];
    for (; Le(i); )
      i = Ti(r, i, t);
    const s = Le(t) || !de(t) ? t : t.default ? t.default : null;
    i = G(s) ? [s] : s, Le(i) && Ti(r, i, !1), l.__localeChainCache.set(a, r);
  }
  return r;
}
function Ti(e, t, n) {
  let a = !0;
  for (let l = 0; l < t.length && me(a); l++) {
    const r = t[l];
    G(r) && (a = Uh(e, t[l], n));
  }
  return a;
}
function Uh(e, t, n) {
  let a;
  const l = t.split("-");
  do {
    const r = l.join("-");
    a = zh(e, r, n), l.splice(-1, 1);
  } while (l.length && a === !0);
  return a;
}
function zh(e, t, n) {
  let a = !1;
  if (!e.includes(t) && (a = !0, t)) {
    a = t[t.length - 1] !== "!";
    const l = t.replace(/!/g, "");
    e.push(l), (Le(n) || de(n)) && n[l] && (a = n[l]);
  }
  return a;
}
const Zt = [];
Zt[
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
Zt[
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
Zt[
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
Zt[
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
Zt[
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
Zt[
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
Zt[
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
const Gh = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function Yh(e) {
  return Gh.test(e);
}
function qh(e) {
  const t = e.charCodeAt(0), n = e.charCodeAt(e.length - 1);
  return t === n && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function Xh(e) {
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
function Qh(e) {
  const t = e.trim();
  return e.charAt(0) === "0" && isNaN(parseInt(e)) ? !1 : Yh(t) ? qh(t) : "*" + t;
}
function Jh(e) {
  const t = [];
  let n = -1, a = 0, l = 0, r, i, s, o, u, c, f;
  const d = [];
  d[
    0
    /* Actions.APPEND */
  ] = () => {
    i === void 0 ? i = s : i += s;
  }, d[
    1
    /* Actions.PUSH */
  ] = () => {
    i !== void 0 && (t.push(i), i = void 0);
  }, d[
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ] = () => {
    d[
      0
      /* Actions.APPEND */
    ](), l++;
  }, d[
    3
    /* Actions.PUSH_SUB_PATH */
  ] = () => {
    if (l > 0)
      l--, a = 4, d[
        0
        /* Actions.APPEND */
      ]();
    else {
      if (l = 0, i === void 0 || (i = Qh(i), i === !1))
        return !1;
      d[
        1
        /* Actions.PUSH */
      ]();
    }
  };
  function m() {
    const v = e[n + 1];
    if (a === 5 && v === "'" || a === 6 && v === '"')
      return n++, s = "\\" + v, d[
        0
        /* Actions.APPEND */
      ](), !0;
  }
  for (; a !== null; )
    if (n++, r = e[n], !(r === "\\" && m())) {
      if (o = Xh(r), f = Zt[a], u = f[o] || f.l || 8, u === 8 || (a = u[0], u[1] !== void 0 && (c = d[u[1]], c && (s = r, c() === !1))))
        return;
      if (a === 7)
        return t;
    }
}
const Ai = /* @__PURE__ */ new Map();
function Zh(e, t) {
  return ge(e) ? e[t] : null;
}
function em(e, t) {
  if (!ge(e))
    return null;
  let n = Ai.get(t);
  if (n || (n = Jh(t), n && Ai.set(t, n)), !n)
    return null;
  const a = n.length;
  let l = e, r = 0;
  for (; r < a; ) {
    const i = l[n[r]];
    if (i === void 0 || Pe(l))
      return null;
    l = i, r++;
  }
  return l;
}
const tm = "10.0.4", Za = -1, Yn = "en-US", Oi = "", Li = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function nm() {
  return {
    upper: (e, t) => t === "text" && G(e) ? e.toUpperCase() : t === "vnode" && ge(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
    lower: (e, t) => t === "text" && G(e) ? e.toLowerCase() : t === "vnode" && ge(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
    capitalize: (e, t) => t === "text" && G(e) ? Li(e) : t === "vnode" && ge(e) && "__v_isVNode" in e ? Li(e.children) : e
  };
}
let No;
function am(e) {
  No = e;
}
let Ro;
function lm(e) {
  Ro = e;
}
let Fo;
function rm(e) {
  Fo = e;
}
let Do = null;
const im = /* @__NO_SIDE_EFFECTS__ */ (e) => {
  Do = e;
}, sm = /* @__NO_SIDE_EFFECTS__ */ () => Do;
let Mo = null;
const Vi = (e) => {
  Mo = e;
}, om = () => Mo;
let Ni = 0;
function um(e = {}) {
  const t = Pe(e.onWarn) ? e.onWarn : uh, n = G(e.version) ? e.version : tm, a = G(e.locale) || Pe(e.locale) ? e.locale : Yn, l = Pe(a) ? Yn : a, r = Le(e.fallbackLocale) || de(e.fallbackLocale) || G(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : l, i = de(e.messages) ? e.messages : { [l]: {} }, s = de(e.datetimeFormats) ? e.datetimeFormats : { [l]: {} }, o = de(e.numberFormats) ? e.numberFormats : { [l]: {} }, u = He({}, e.modifiers || {}, nm()), c = e.pluralRules || {}, f = Pe(e.missing) ? e.missing : null, d = me(e.missingWarn) || Pn(e.missingWarn) ? e.missingWarn : !0, m = me(e.fallbackWarn) || Pn(e.fallbackWarn) ? e.fallbackWarn : !0, v = !!e.fallbackFormat, g = !!e.unresolving, b = Pe(e.postTranslation) ? e.postTranslation : null, y = de(e.processor) ? e.processor : null, p = me(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, x = !!e.escapeParameter, w = Pe(e.messageCompiler) ? e.messageCompiler : No, I = Pe(e.messageResolver) ? e.messageResolver : Ro || Zh, k = Pe(e.localeFallbacker) ? e.localeFallbacker : Fo || jh, C = ge(e.fallbackContext) ? e.fallbackContext : void 0, S = e, E = ge(S.__datetimeFormatters) ? S.__datetimeFormatters : /* @__PURE__ */ new Map(), A = ge(S.__numberFormatters) ? S.__numberFormatters : /* @__PURE__ */ new Map(), O = ge(S.__meta) ? S.__meta : {};
  Ni++;
  const T = {
    version: n,
    cid: Ni,
    locale: a,
    fallbackLocale: r,
    messages: i,
    modifiers: u,
    pluralRules: c,
    missing: f,
    missingWarn: d,
    fallbackWarn: m,
    fallbackFormat: v,
    unresolving: g,
    postTranslation: b,
    processor: y,
    warnHtmlMessage: p,
    escapeParameter: x,
    messageCompiler: w,
    messageResolver: I,
    localeFallbacker: k,
    fallbackContext: C,
    onWarn: t,
    __meta: O
  };
  return T.datetimeFormats = s, T.numberFormats = o, T.__datetimeFormatters = E, T.__numberFormatters = A, __INTLIFY_PROD_DEVTOOLS__ && Bh(T, n, O), T;
}
function Rr(e, t, n, a, l) {
  const { missing: r, onWarn: i } = e;
  if (r !== null) {
    const s = r(e, n, t, l);
    return G(s) ? s : t;
  } else
    return t;
}
function Bn(e, t, n) {
  const a = e;
  a.__localeChainCache = /* @__PURE__ */ new Map(), e.localeFallbacker(e, n, t);
}
function cm(e, t) {
  return e === t ? !1 : e.split("-")[0] === t.split("-")[0];
}
function dm(e, t) {
  const n = t.indexOf(e);
  if (n === -1)
    return !1;
  for (let a = n + 1; a < t.length; a++)
    if (cm(e, t[a]))
      return !0;
  return !1;
}
function Ri(e, ...t) {
  const { datetimeFormats: n, unresolving: a, fallbackLocale: l, onWarn: r, localeFallbacker: i } = e, { __datetimeFormatters: s } = e, [o, u, c, f] = ar(...t), d = me(c.missingWarn) ? c.missingWarn : e.missingWarn;
  me(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn;
  const m = !!c.part, v = Nr(e, c), g = i(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    l,
    v
  );
  if (!G(o) || o === "")
    return new Intl.DateTimeFormat(v, f).format(u);
  let b = {}, y, p = null;
  const x = "datetime format";
  for (let k = 0; k < g.length && (y = g[k], b = n[y] || {}, p = b[o], !de(p)); k++)
    Rr(e, o, y, d, x);
  if (!de(p) || !G(y))
    return a ? Za : o;
  let w = `${y}__${o}`;
  Qa(f) || (w = `${w}__${JSON.stringify(f)}`);
  let I = s.get(w);
  return I || (I = new Intl.DateTimeFormat(y, He({}, p, f)), s.set(w, I)), m ? I.formatToParts(u) : I.format(u);
}
const Bo = [
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
function ar(...e) {
  const [t, n, a, l] = e, r = {};
  let i = {}, s;
  if (G(t)) {
    const o = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!o)
      throw Kt(Wt.INVALID_ISO_DATE_ARGUMENT);
    const u = o[3] ? o[3].trim().startsWith("T") ? `${o[1].trim()}${o[3].trim()}` : `${o[1].trim()}T${o[3].trim()}` : o[1].trim();
    s = new Date(u);
    try {
      s.toISOString();
    } catch {
      throw Kt(Wt.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (rh(t)) {
    if (isNaN(t.getTime()))
      throw Kt(Wt.INVALID_DATE_ARGUMENT);
    s = t;
  } else if (Be(t))
    s = t;
  else
    throw Kt(Wt.INVALID_ARGUMENT);
  return G(n) ? r.key = n : de(n) && Object.keys(n).forEach((o) => {
    Bo.includes(o) ? i[o] = n[o] : r[o] = n[o];
  }), G(a) ? r.locale = a : de(a) && (i = a), de(l) && (i = l), [r.key || "", s, r, i];
}
function Fi(e, t, n) {
  const a = e;
  for (const l in n) {
    const r = `${t}__${l}`;
    a.__datetimeFormatters.has(r) && a.__datetimeFormatters.delete(r);
  }
}
function Di(e, ...t) {
  const { numberFormats: n, unresolving: a, fallbackLocale: l, onWarn: r, localeFallbacker: i } = e, { __numberFormatters: s } = e, [o, u, c, f] = lr(...t), d = me(c.missingWarn) ? c.missingWarn : e.missingWarn;
  me(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn;
  const m = !!c.part, v = Nr(e, c), g = i(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    l,
    v
  );
  if (!G(o) || o === "")
    return new Intl.NumberFormat(v, f).format(u);
  let b = {}, y, p = null;
  const x = "number format";
  for (let k = 0; k < g.length && (y = g[k], b = n[y] || {}, p = b[o], !de(p)); k++)
    Rr(e, o, y, d, x);
  if (!de(p) || !G(y))
    return a ? Za : o;
  let w = `${y}__${o}`;
  Qa(f) || (w = `${w}__${JSON.stringify(f)}`);
  let I = s.get(w);
  return I || (I = new Intl.NumberFormat(y, He({}, p, f)), s.set(w, I)), m ? I.formatToParts(u) : I.format(u);
}
const Ho = [
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
function lr(...e) {
  const [t, n, a, l] = e, r = {};
  let i = {};
  if (!Be(t))
    throw Kt(Wt.INVALID_ARGUMENT);
  const s = t;
  return G(n) ? r.key = n : de(n) && Object.keys(n).forEach((o) => {
    Ho.includes(o) ? i[o] = n[o] : r[o] = n[o];
  }), G(a) ? r.locale = a : de(a) && (i = a), de(l) && (i = l), [r.key || "", s, r, i];
}
function Mi(e, t, n) {
  const a = e;
  for (const l in n) {
    const r = `${t}__${l}`;
    a.__numberFormatters.has(r) && a.__numberFormatters.delete(r);
  }
}
const fm = (e) => e, vm = (e) => "", hm = "text", mm = (e) => e.length === 0 ? "" : Lr(e), gm = oh;
function Bi(e, t) {
  return e = Math.abs(e), t === 2 ? e ? e > 1 ? 1 : 0 : 1 : e ? Math.min(e, 2) : 0;
}
function ym(e) {
  const t = Be(e.pluralIndex) ? e.pluralIndex : -1;
  return e.named && (Be(e.named.count) || Be(e.named.n)) ? Be(e.named.count) ? e.named.count : Be(e.named.n) ? e.named.n : t : t;
}
function bm(e, t) {
  t.count || (t.count = e), t.n || (t.n = e);
}
function pm(e = {}) {
  const t = e.locale, n = ym(e), a = ge(e.pluralRules) && G(t) && Pe(e.pluralRules[t]) ? e.pluralRules[t] : Bi, l = ge(e.pluralRules) && G(t) && Pe(e.pluralRules[t]) ? Bi : void 0, r = (y) => y[a(n, y.length, l)], i = e.list || [], s = (y) => i[y], o = e.named || {};
  Be(e.pluralIndex) && bm(n, o);
  const u = (y) => o[y];
  function c(y, p) {
    const x = Pe(e.messages) ? e.messages(y, !!p) : ge(e.messages) ? e.messages[y] : !1;
    return x || (e.parent ? e.parent.message(y) : vm);
  }
  const f = (y) => e.modifiers ? e.modifiers[y] : fm, d = de(e.processor) && Pe(e.processor.normalize) ? e.processor.normalize : mm, m = de(e.processor) && Pe(e.processor.interpolate) ? e.processor.interpolate : gm, v = de(e.processor) && G(e.processor.type) ? e.processor.type : hm, b = {
    list: s,
    named: u,
    plural: r,
    linked: (y, ...p) => {
      const [x, w] = p;
      let I = "text", k = "";
      p.length === 1 ? ge(x) ? (k = x.modifier || k, I = x.type || I) : G(x) && (k = x || k) : p.length === 2 && (G(x) && (k = x || k), G(w) && (I = w || I));
      const C = c(y, !0)(b), S = (
        // The message in vnode resolved with linked are returned as an array by processor.nomalize
        I === "vnode" && Le(C) && k ? C[0] : C
      );
      return k ? f(k)(S, I) : S;
    },
    message: c,
    type: v,
    interpolate: m,
    normalize: d,
    values: He({}, i, o)
  };
  return b;
}
const Hi = () => "", pt = (e) => Pe(e);
function Wi(e, ...t) {
  const { fallbackFormat: n, postTranslation: a, unresolving: l, messageCompiler: r, fallbackLocale: i, messages: s } = e, [o, u] = rr(...t), c = me(u.missingWarn) ? u.missingWarn : e.missingWarn, f = me(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn, d = me(u.escapeParameter) ? u.escapeParameter : e.escapeParameter, m = !!u.resolvedMessage, v = G(u.default) || me(u.default) ? me(u.default) ? r ? o : () => o : u.default : n ? r ? o : () => o : null, g = n || v != null && (G(v) || Pe(v)), b = Nr(e, u);
  d && _m(u);
  let [y, p, x] = m ? [
    o,
    b,
    s[b] || {}
  ] : Wo(e, o, b, i, f, c), w = y, I = o;
  if (!m && !(G(w) || Tn(w) || pt(w)) && g && (w = v, I = w), !m && (!(G(w) || Tn(w) || pt(w)) || !G(p)))
    return l ? Za : o;
  let k = !1;
  const C = () => {
    k = !0;
  }, S = pt(w) ? w : Ko(e, o, p, w, I, C);
  if (k)
    return w;
  const E = Cm(e, p, x, u), A = pm(E), O = Sm(e, S, A), T = a ? a(O, o) : O;
  if (__INTLIFY_PROD_DEVTOOLS__) {
    const L = {
      timestamp: Date.now(),
      key: G(o) ? o : pt(w) ? w.key : "",
      locale: p || (pt(w) ? w.locale : ""),
      format: G(w) ? w : pt(w) ? w.source : "",
      message: T
    };
    L.meta = He({}, e.__meta, /* @__PURE__ */ sm() || {}), Hh(L);
  }
  return T;
}
function _m(e) {
  Le(e.list) ? e.list = e.list.map((t) => G(t) ? Ii(t) : t) : ge(e.named) && Object.keys(e.named).forEach((t) => {
    G(e.named[t]) && (e.named[t] = Ii(e.named[t]));
  });
}
function Wo(e, t, n, a, l, r) {
  const { messages: i, onWarn: s, messageResolver: o, localeFallbacker: u } = e, c = u(e, a, n);
  let f = {}, d, m = null;
  const v = "translate";
  for (let g = 0; g < c.length && (d = c[g], f = i[d] || {}, (m = o(f, t)) === null && (m = f[t]), !(G(m) || Tn(m) || pt(m))); g++)
    if (!dm(d, c)) {
      const b = Rr(
        e,
        // eslint-disable-line @typescript-eslint/no-explicit-any
        t,
        d,
        r,
        v
      );
      b !== t && (m = b);
    }
  return [m, d, f];
}
function Ko(e, t, n, a, l, r) {
  const { messageCompiler: i, warnHtmlMessage: s } = e;
  if (pt(a)) {
    const u = a;
    return u.locale = u.locale || n, u.key = u.key || t, u;
  }
  if (i == null) {
    const u = () => a;
    return u.locale = n, u.key = t, u;
  }
  const o = i(a, wm(e, n, l, a, s, r));
  return o.locale = n, o.key = t, o.source = a, o;
}
function Sm(e, t, n) {
  return t(n);
}
function rr(...e) {
  const [t, n, a] = e, l = {};
  if (!G(t) && !Be(t) && !pt(t) && !Tn(t))
    throw Kt(Wt.INVALID_ARGUMENT);
  const r = Be(t) ? String(t) : (pt(t), t);
  return Be(n) ? l.plural = n : G(n) ? l.default = n : de(n) && !Qa(n) ? l.named = n : Le(n) && (l.list = n), Be(a) ? l.plural = a : G(a) ? l.default = a : de(a) && He(l, a), [r, l];
}
function wm(e, t, n, a, l, r) {
  return {
    locale: t,
    key: n,
    warnHtmlMessage: l,
    onError: (i) => {
      throw r && r(i), i;
    },
    onCacheKey: (i) => ah(t, n, i)
  };
}
function Cm(e, t, n, a) {
  const { modifiers: l, pluralRules: r, messageResolver: i, fallbackLocale: s, fallbackWarn: o, missingWarn: u, fallbackContext: c } = e, d = {
    locale: t,
    modifiers: l,
    pluralRules: r,
    messages: (m, v) => {
      let g = i(n, m);
      if (g == null && (c || v)) {
        const [, , b] = Wo(
          c || e,
          // NOTE: if has fallbackContext, fallback to root, else if use linked, fallback to local context
          m,
          t,
          s,
          o,
          u
        );
        g = i(b, m);
      }
      if (G(g) || Tn(g)) {
        let b = !1;
        const p = Ko(e, m, t, g, m, () => {
          b = !0;
        });
        return b ? Hi : p;
      } else return pt(g) ? g : Hi;
    }
  };
  return e.processor && (d.processor = e.processor), a.list && (d.list = a.list), a.named && (d.named = a.named), Be(a.plural) && (d.pluralIndex = a.plural), d;
}
Vh();
/*!
  * vue-i18n v10.0.4
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
const Im = "10.0.4";
function km() {
  typeof __VUE_I18N_FULL_INSTALL__ != "boolean" && (on().__VUE_I18N_FULL_INSTALL__ = !0), typeof __VUE_I18N_LEGACY_API__ != "boolean" && (on().__VUE_I18N_LEGACY_API__ = !0), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (on().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1), typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (on().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
const Ze = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: Kh,
  // 24
  // legacy module errors
  INVALID_ARGUMENT: 25,
  // i18n module errors
  MUST_BE_CALL_SETUP_TOP: 26,
  NOT_INSTALLED: 27,
  // directive module errors
  REQUIRED_VALUE: 28,
  INVALID_VALUE: 29,
  // vue-devtools errors
  CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: 30,
  NOT_INSTALLED_WITH_PROVIDE: 31,
  // unexpected error
  UNEXPECTED_ERROR: 32,
  // not compatible legacy vue-i18n constructor
  NOT_COMPATIBLE_LEGACY_VUE_I18N: 33,
  // Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly
  NOT_AVAILABLE_COMPOSITION_IN_LEGACY: 34
};
function it(e, ...t) {
  return Ja(e, null, void 0);
}
const ir = /* @__PURE__ */ Jt("__translateVNode"), sr = /* @__PURE__ */ Jt("__datetimeParts"), or = /* @__PURE__ */ Jt("__numberParts"), jo = Jt("__setPluralRules"), Uo = /* @__PURE__ */ Jt("__injectWithOption"), ur = /* @__PURE__ */ Jt("__dispose");
function qn(e) {
  if (!ge(e))
    return e;
  for (const t in e)
    if (Ta(e, t))
      if (!t.includes("."))
        ge(e[t]) && qn(e[t]);
      else {
        const n = t.split("."), a = n.length - 1;
        let l = e, r = !1;
        for (let i = 0; i < a; i++) {
          if (n[i] in l || (l[n[i]] = {}), !ge(l[n[i]])) {
            r = !0;
            break;
          }
          l = l[n[i]];
        }
        r || (l[n[a]] = e[t], delete e[t]), ge(l[n[a]]) && qn(l[n[a]]);
      }
  return e;
}
function Fr(e, t) {
  const { messages: n, __i18n: a, messageResolver: l, flatJson: r } = t, i = de(n) ? n : Le(a) ? {} : { [e]: {} };
  if (Le(a) && a.forEach((s) => {
    if ("locale" in s && "resource" in s) {
      const { locale: o, resource: u } = s;
      o ? (i[o] = i[o] || {}, ka(u, i[o])) : ka(u, i);
    } else
      G(s) && ka(JSON.parse(s), i);
  }), l == null && r)
    for (const s in i)
      Ta(i, s) && qn(i[s]);
  return i;
}
function zo(e) {
  return e.type;
}
function Go(e, t, n) {
  let a = ge(t.messages) ? t.messages : {};
  "__i18nGlobal" in n && (a = Fr(e.locale.value, {
    messages: a,
    __i18n: n.__i18nGlobal
  }));
  const l = Object.keys(a);
  l.length && l.forEach((r) => {
    e.mergeLocaleMessage(r, a[r]);
  });
  {
    if (ge(t.datetimeFormats)) {
      const r = Object.keys(t.datetimeFormats);
      r.length && r.forEach((i) => {
        e.mergeDateTimeFormat(i, t.datetimeFormats[i]);
      });
    }
    if (ge(t.numberFormats)) {
      const r = Object.keys(t.numberFormats);
      r.length && r.forEach((i) => {
        e.mergeNumberFormat(i, t.numberFormats[i]);
      });
    }
  }
}
function Ki(e) {
  return h(mo, null, e, 0);
}
const ji = "__INTLIFY_META__", Ui = () => [], Em = () => !1;
let zi = 0;
function Gi(e) {
  return (t, n, a, l) => e(n, a, xn() || void 0, l);
}
const xm = /* @__NO_SIDE_EFFECTS__ */ () => {
  const e = xn();
  let t = null;
  return e && (t = zo(e)[ji]) ? { [ji]: t } : null;
};
function Dr(e = {}) {
  const { __root: t, __injectWithOption: n } = e, a = t === void 0, l = e.flatJson, r = $a ? Y : J;
  let i = me(e.inheritLocale) ? e.inheritLocale : !0;
  const s = r(
    // prettier-ignore
    t && i ? t.locale.value : G(e.locale) ? e.locale : Yn
  ), o = r(
    // prettier-ignore
    t && i ? t.fallbackLocale.value : G(e.fallbackLocale) || Le(e.fallbackLocale) || de(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : s.value
  ), u = r(Fr(s.value, e)), c = r(de(e.datetimeFormats) ? e.datetimeFormats : { [s.value]: {} }), f = r(de(e.numberFormats) ? e.numberFormats : { [s.value]: {} });
  let d = t ? t.missingWarn : me(e.missingWarn) || Pn(e.missingWarn) ? e.missingWarn : !0, m = t ? t.fallbackWarn : me(e.fallbackWarn) || Pn(e.fallbackWarn) ? e.fallbackWarn : !0, v = t ? t.fallbackRoot : me(e.fallbackRoot) ? e.fallbackRoot : !0, g = !!e.fallbackFormat, b = Pe(e.missing) ? e.missing : null, y = Pe(e.missing) ? Gi(e.missing) : null, p = Pe(e.postTranslation) ? e.postTranslation : null, x = t ? t.warnHtmlMessage : me(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, w = !!e.escapeParameter;
  const I = t ? t.modifiers : de(e.modifiers) ? e.modifiers : {};
  let k = e.pluralRules || t && t.pluralRules, C;
  C = (() => {
    a && Vi(null);
    const N = {
      version: Im,
      locale: s.value,
      fallbackLocale: o.value,
      messages: u.value,
      modifiers: I,
      pluralRules: k,
      missing: y === null ? void 0 : y,
      missingWarn: d,
      fallbackWarn: m,
      fallbackFormat: g,
      unresolving: !0,
      postTranslation: p === null ? void 0 : p,
      warnHtmlMessage: x,
      escapeParameter: w,
      messageResolver: e.messageResolver,
      messageCompiler: e.messageCompiler,
      __meta: { framework: "vue" }
    };
    N.datetimeFormats = c.value, N.numberFormats = f.value, N.__datetimeFormatters = de(C) ? C.__datetimeFormatters : void 0, N.__numberFormatters = de(C) ? C.__numberFormatters : void 0;
    const W = um(N);
    return a && Vi(W), W;
  })(), Bn(C, s.value, o.value);
  function E() {
    return [
      s.value,
      o.value,
      u.value,
      c.value,
      f.value
    ];
  }
  const A = _({
    get: () => s.value,
    set: (N) => {
      s.value = N, C.locale = s.value;
    }
  }), O = _({
    get: () => o.value,
    set: (N) => {
      o.value = N, C.fallbackLocale = o.value, Bn(C, s.value, N);
    }
  }), T = _(() => u.value), L = /* @__PURE__ */ _(() => c.value), M = /* @__PURE__ */ _(() => f.value);
  function j() {
    return Pe(p) ? p : null;
  }
  function z(N) {
    p = N, C.postTranslation = N;
  }
  function Q() {
    return b;
  }
  function le(N) {
    N !== null && (y = Gi(N)), b = N, C.missing = y;
  }
  const V = (N, W, Ie, Re, an, ha) => {
    E();
    let yn;
    try {
      __INTLIFY_PROD_DEVTOOLS__, a || (C.fallbackContext = t ? om() : void 0), yn = N(C);
    } finally {
      __INTLIFY_PROD_DEVTOOLS__, a || (C.fallbackContext = void 0);
    }
    if (Ie !== "translate exists" && // for not `te` (e.g `t`)
    Be(yn) && yn === Za || Ie === "translate exists" && !yn) {
      const [Md, Z_] = W();
      return t && v ? Re(t) : an(Md);
    } else {
      if (ha(yn))
        return yn;
      throw it(Ze.UNEXPECTED_RETURN_TYPE);
    }
  };
  function R(...N) {
    return V((W) => Reflect.apply(Wi, null, [W, ...N]), () => rr(...N), "translate", (W) => Reflect.apply(W.t, W, [...N]), (W) => W, (W) => G(W));
  }
  function F(...N) {
    const [W, Ie, Re] = N;
    if (Re && !ge(Re))
      throw it(Ze.INVALID_ARGUMENT);
    return R(W, Ie, He({ resolvedMessage: !0 }, Re || {}));
  }
  function H(...N) {
    return V((W) => Reflect.apply(Ri, null, [W, ...N]), () => ar(...N), "datetime format", (W) => Reflect.apply(W.d, W, [...N]), () => Oi, (W) => G(W));
  }
  function ie(...N) {
    return V((W) => Reflect.apply(Di, null, [W, ...N]), () => lr(...N), "number format", (W) => Reflect.apply(W.n, W, [...N]), () => Oi, (W) => G(W));
  }
  function te(N) {
    return N.map((W) => G(W) || Be(W) || me(W) ? Ki(String(W)) : W);
  }
  const X = {
    normalize: te,
    interpolate: (N) => N,
    type: "vnode"
  };
  function se(...N) {
    return V((W) => {
      let Ie;
      const Re = W;
      try {
        Re.processor = X, Ie = Reflect.apply(Wi, null, [Re, ...N]);
      } finally {
        Re.processor = null;
      }
      return Ie;
    }, () => rr(...N), "translate", (W) => W[ir](...N), (W) => [Ki(W)], (W) => Le(W));
  }
  function ce(...N) {
    return V((W) => Reflect.apply(Di, null, [W, ...N]), () => lr(...N), "number format", (W) => W[or](...N), Ui, (W) => G(W) || Le(W));
  }
  function Oe(...N) {
    return V((W) => Reflect.apply(Ri, null, [W, ...N]), () => ar(...N), "datetime format", (W) => W[sr](...N), Ui, (W) => G(W) || Le(W));
  }
  function ve(N) {
    k = N, C.pluralRules = k;
  }
  function yt(N, W) {
    return V(() => {
      if (!N)
        return !1;
      const Ie = G(W) ? W : s.value, Re = Ct(Ie), an = C.messageResolver(Re, N);
      return Tn(an) || pt(an) || G(an);
    }, () => [N], "translate exists", (Ie) => Reflect.apply(Ie.te, Ie, [N, W]), Em, (Ie) => me(Ie));
  }
  function Dt(N) {
    let W = null;
    const Ie = Vo(C, o.value, s.value);
    for (let Re = 0; Re < Ie.length; Re++) {
      const an = u.value[Ie[Re]] || {}, ha = C.messageResolver(an, N);
      if (ha != null) {
        W = ha;
        break;
      }
    }
    return W;
  }
  function $t(N) {
    const W = Dt(N);
    return W ?? (t ? t.tm(N) || {} : {});
  }
  function Ct(N) {
    return u.value[N] || {};
  }
  function Mt(N, W) {
    if (l) {
      const Ie = { [N]: W };
      for (const Re in Ie)
        Ta(Ie, Re) && qn(Ie[Re]);
      W = Ie[N];
    }
    u.value[N] = W, C.messages = u.value;
  }
  function Gt(N, W) {
    u.value[N] = u.value[N] || {};
    const Ie = { [N]: W };
    if (l)
      for (const Re in Ie)
        Ta(Ie, Re) && qn(Ie[Re]);
    W = Ie[N], ka(W, u.value[N]), C.messages = u.value;
  }
  function Sl(N) {
    return c.value[N] || {};
  }
  function P(N, W) {
    c.value[N] = W, C.datetimeFormats = c.value, Fi(C, N, W);
  }
  function $(N, W) {
    c.value[N] = He(c.value[N] || {}, W), C.datetimeFormats = c.value, Fi(C, N, W);
  }
  function B(N) {
    return f.value[N] || {};
  }
  function ae(N, W) {
    f.value[N] = W, C.numberFormats = f.value, Mi(C, N, W);
  }
  function Ne(N, W) {
    f.value[N] = He(f.value[N] || {}, W), C.numberFormats = f.value, Mi(C, N, W);
  }
  zi++, t && $a && (ne(t.locale, (N) => {
    i && (s.value = N, C.locale = N, Bn(C, s.value, o.value));
  }), ne(t.fallbackLocale, (N) => {
    i && (o.value = N, C.fallbackLocale = N, Bn(C, s.value, o.value));
  }));
  const fe = {
    id: zi,
    locale: A,
    fallbackLocale: O,
    get inheritLocale() {
      return i;
    },
    set inheritLocale(N) {
      i = N, N && t && (s.value = t.locale.value, o.value = t.fallbackLocale.value, Bn(C, s.value, o.value));
    },
    get availableLocales() {
      return Object.keys(u.value).sort();
    },
    messages: T,
    get modifiers() {
      return I;
    },
    get pluralRules() {
      return k || {};
    },
    get isGlobal() {
      return a;
    },
    get missingWarn() {
      return d;
    },
    set missingWarn(N) {
      d = N, C.missingWarn = d;
    },
    get fallbackWarn() {
      return m;
    },
    set fallbackWarn(N) {
      m = N, C.fallbackWarn = m;
    },
    get fallbackRoot() {
      return v;
    },
    set fallbackRoot(N) {
      v = N;
    },
    get fallbackFormat() {
      return g;
    },
    set fallbackFormat(N) {
      g = N, C.fallbackFormat = g;
    },
    get warnHtmlMessage() {
      return x;
    },
    set warnHtmlMessage(N) {
      x = N, C.warnHtmlMessage = N;
    },
    get escapeParameter() {
      return w;
    },
    set escapeParameter(N) {
      w = N, C.escapeParameter = N;
    },
    t: R,
    getLocaleMessage: Ct,
    setLocaleMessage: Mt,
    mergeLocaleMessage: Gt,
    getPostTranslationHandler: j,
    setPostTranslationHandler: z,
    getMissingHandler: Q,
    setMissingHandler: le,
    [jo]: ve
  };
  return fe.datetimeFormats = L, fe.numberFormats = M, fe.rt = F, fe.te = yt, fe.tm = $t, fe.d = H, fe.n = ie, fe.getDateTimeFormat = Sl, fe.setDateTimeFormat = P, fe.mergeDateTimeFormat = $, fe.getNumberFormat = B, fe.setNumberFormat = ae, fe.mergeNumberFormat = Ne, fe[Uo] = n, fe[ir] = se, fe[sr] = Oe, fe[or] = ce, fe;
}
function Pm(e) {
  const t = G(e.locale) ? e.locale : Yn, n = G(e.fallbackLocale) || Le(e.fallbackLocale) || de(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : t, a = Pe(e.missing) ? e.missing : void 0, l = me(e.silentTranslationWarn) || Pn(e.silentTranslationWarn) ? !e.silentTranslationWarn : !0, r = me(e.silentFallbackWarn) || Pn(e.silentFallbackWarn) ? !e.silentFallbackWarn : !0, i = me(e.fallbackRoot) ? e.fallbackRoot : !0, s = !!e.formatFallbackMessages, o = de(e.modifiers) ? e.modifiers : {}, u = e.pluralizationRules, c = Pe(e.postTranslation) ? e.postTranslation : void 0, f = G(e.warnHtmlInMessage) ? e.warnHtmlInMessage !== "off" : !0, d = !!e.escapeParameterHtml, m = me(e.sync) ? e.sync : !0;
  let v = e.messages;
  if (de(e.sharedMessages)) {
    const I = e.sharedMessages;
    v = Object.keys(I).reduce((C, S) => {
      const E = C[S] || (C[S] = {});
      return He(E, I[S]), C;
    }, v || {});
  }
  const { __i18n: g, __root: b, __injectWithOption: y } = e, p = e.datetimeFormats, x = e.numberFormats, w = e.flatJson;
  return {
    locale: t,
    fallbackLocale: n,
    messages: v,
    flatJson: w,
    datetimeFormats: p,
    numberFormats: x,
    missing: a,
    missingWarn: l,
    fallbackWarn: r,
    fallbackRoot: i,
    fallbackFormat: s,
    modifiers: o,
    pluralRules: u,
    postTranslation: c,
    warnHtmlMessage: f,
    escapeParameter: d,
    messageResolver: e.messageResolver,
    inheritLocale: m,
    __i18n: g,
    __root: b,
    __injectWithOption: y
  };
}
function cr(e = {}) {
  const t = Dr(Pm(e)), { __extender: n } = e, a = {
    // id
    id: t.id,
    // locale
    get locale() {
      return t.locale.value;
    },
    set locale(l) {
      t.locale.value = l;
    },
    // fallbackLocale
    get fallbackLocale() {
      return t.fallbackLocale.value;
    },
    set fallbackLocale(l) {
      t.fallbackLocale.value = l;
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
    set missing(l) {
      t.setMissingHandler(l);
    },
    // silentTranslationWarn
    get silentTranslationWarn() {
      return me(t.missingWarn) ? !t.missingWarn : t.missingWarn;
    },
    set silentTranslationWarn(l) {
      t.missingWarn = me(l) ? !l : l;
    },
    // silentFallbackWarn
    get silentFallbackWarn() {
      return me(t.fallbackWarn) ? !t.fallbackWarn : t.fallbackWarn;
    },
    set silentFallbackWarn(l) {
      t.fallbackWarn = me(l) ? !l : l;
    },
    // modifiers
    get modifiers() {
      return t.modifiers;
    },
    // formatFallbackMessages
    get formatFallbackMessages() {
      return t.fallbackFormat;
    },
    set formatFallbackMessages(l) {
      t.fallbackFormat = l;
    },
    // postTranslation
    get postTranslation() {
      return t.getPostTranslationHandler();
    },
    set postTranslation(l) {
      t.setPostTranslationHandler(l);
    },
    // sync
    get sync() {
      return t.inheritLocale;
    },
    set sync(l) {
      t.inheritLocale = l;
    },
    // warnInHtmlMessage
    get warnHtmlInMessage() {
      return t.warnHtmlMessage ? "warn" : "off";
    },
    set warnHtmlInMessage(l) {
      t.warnHtmlMessage = l !== "off";
    },
    // escapeParameterHtml
    get escapeParameterHtml() {
      return t.escapeParameter;
    },
    set escapeParameterHtml(l) {
      t.escapeParameter = l;
    },
    // pluralizationRules
    get pluralizationRules() {
      return t.pluralRules || {};
    },
    // for internal
    __composer: t,
    // t
    t(...l) {
      return Reflect.apply(t.t, t, [...l]);
    },
    // rt
    rt(...l) {
      return Reflect.apply(t.rt, t, [...l]);
    },
    // tc
    tc(...l) {
      const [r, i, s] = l, o = { plural: 1 };
      let u = null, c = null;
      if (!G(r))
        throw it(Ze.INVALID_ARGUMENT);
      const f = r;
      return G(i) ? o.locale = i : Be(i) ? o.plural = i : Le(i) ? u = i : de(i) && (c = i), G(s) ? o.locale = s : Le(s) ? u = s : de(s) && (c = s), Reflect.apply(t.t, t, [
        f,
        u || c || {},
        o
      ]);
    },
    // te
    te(l, r) {
      return t.te(l, r);
    },
    // tm
    tm(l) {
      return t.tm(l);
    },
    // getLocaleMessage
    getLocaleMessage(l) {
      return t.getLocaleMessage(l);
    },
    // setLocaleMessage
    setLocaleMessage(l, r) {
      t.setLocaleMessage(l, r);
    },
    // mergeLocaleMessage
    mergeLocaleMessage(l, r) {
      t.mergeLocaleMessage(l, r);
    },
    // d
    d(...l) {
      return Reflect.apply(t.d, t, [...l]);
    },
    // getDateTimeFormat
    getDateTimeFormat(l) {
      return t.getDateTimeFormat(l);
    },
    // setDateTimeFormat
    setDateTimeFormat(l, r) {
      t.setDateTimeFormat(l, r);
    },
    // mergeDateTimeFormat
    mergeDateTimeFormat(l, r) {
      t.mergeDateTimeFormat(l, r);
    },
    // n
    n(...l) {
      return Reflect.apply(t.n, t, [...l]);
    },
    // getNumberFormat
    getNumberFormat(l) {
      return t.getNumberFormat(l);
    },
    // setNumberFormat
    setNumberFormat(l, r) {
      t.setNumberFormat(l, r);
    },
    // mergeNumberFormat
    mergeNumberFormat(l, r) {
      t.mergeNumberFormat(l, r);
    }
  };
  return a.__extender = n, a;
}
function $m(e, t, n) {
  return {
    beforeCreate() {
      const a = xn();
      if (!a)
        throw it(Ze.UNEXPECTED_ERROR);
      const l = this.$options;
      if (l.i18n) {
        const r = l.i18n;
        if (l.__i18n && (r.__i18n = l.__i18n), r.__root = t, this === this.$root)
          this.$i18n = Yi(e, r);
        else {
          r.__injectWithOption = !0, r.__extender = n.__vueI18nExtend, this.$i18n = cr(r);
          const i = this.$i18n;
          i.__extender && (i.__disposer = i.__extender(this.$i18n));
        }
      } else if (l.__i18n)
        if (this === this.$root)
          this.$i18n = Yi(e, l);
        else {
          this.$i18n = cr({
            __i18n: l.__i18n,
            __injectWithOption: !0,
            __extender: n.__vueI18nExtend,
            __root: t
          });
          const r = this.$i18n;
          r.__extender && (r.__disposer = r.__extender(this.$i18n));
        }
      else
        this.$i18n = e;
      l.__i18nGlobal && Go(t, l, l), this.$t = (...r) => this.$i18n.t(...r), this.$rt = (...r) => this.$i18n.rt(...r), this.$tc = (...r) => this.$i18n.tc(...r), this.$te = (r, i) => this.$i18n.te(r, i), this.$d = (...r) => this.$i18n.d(...r), this.$n = (...r) => this.$i18n.n(...r), this.$tm = (r) => this.$i18n.tm(r), n.__setInstance(a, this.$i18n);
    },
    mounted() {
    },
    unmounted() {
      const a = xn();
      if (!a)
        throw it(Ze.UNEXPECTED_ERROR);
      const l = this.$i18n;
      delete this.$t, delete this.$rt, delete this.$tc, delete this.$te, delete this.$d, delete this.$n, delete this.$tm, l.__disposer && (l.__disposer(), delete l.__disposer, delete l.__extender), n.__deleteInstance(a), delete this.$i18n;
    }
  };
}
function Yi(e, t) {
  e.locale = t.locale || e.locale, e.fallbackLocale = t.fallbackLocale || e.fallbackLocale, e.missing = t.missing || e.missing, e.silentTranslationWarn = t.silentTranslationWarn || e.silentFallbackWarn, e.silentFallbackWarn = t.silentFallbackWarn || e.silentFallbackWarn, e.formatFallbackMessages = t.formatFallbackMessages || e.formatFallbackMessages, e.postTranslation = t.postTranslation || e.postTranslation, e.warnHtmlInMessage = t.warnHtmlInMessage || e.warnHtmlInMessage, e.escapeParameterHtml = t.escapeParameterHtml || e.escapeParameterHtml, e.sync = t.sync || e.sync, e.__composer[jo](t.pluralizationRules || e.pluralizationRules);
  const n = Fr(e.locale, {
    messages: t.messages,
    __i18n: t.__i18n
  });
  return Object.keys(n).forEach((a) => e.mergeLocaleMessage(a, n[a])), t.datetimeFormats && Object.keys(t.datetimeFormats).forEach((a) => e.mergeDateTimeFormat(a, t.datetimeFormats[a])), t.numberFormats && Object.keys(t.numberFormats).forEach((a) => e.mergeNumberFormat(a, t.numberFormats[a])), e;
}
const Mr = {
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
function Tm({ slots: e }, t) {
  return t.length === 1 && t[0] === "default" ? (e.default ? e.default() : []).reduce((a, l) => [
    ...a,
    // prettier-ignore
    ...l.type === he ? l.children : [l]
  ], []) : t.reduce((n, a) => {
    const l = e[a];
    return l && (n[a] = l()), n;
  }, {});
}
function Yo() {
  return he;
}
const Am = /* @__PURE__ */ za({
  /* eslint-disable */
  name: "i18n-t",
  props: He({
    keypath: {
      type: String,
      required: !0
    },
    plural: {
      type: [Number, String],
      validator: (e) => Be(e) || !isNaN(e)
    }
  }, Mr),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const { slots: n, attrs: a } = t, l = e.i18n || el({
      useScope: e.scope,
      __useComponent: !0
    });
    return () => {
      const r = Object.keys(n).filter((f) => f !== "_"), i = {};
      e.locale && (i.locale = e.locale), e.plural !== void 0 && (i.plural = G(e.plural) ? +e.plural : e.plural);
      const s = Tm(t, r), o = l[ir](e.keypath, s, i), u = He({}, a), c = G(e.tag) || ge(e.tag) ? e.tag : Yo();
      return zt(c, u, o);
    };
  }
}), qi = Am;
function Om(e) {
  return Le(e) && !G(e[0]);
}
function qo(e, t, n, a) {
  const { slots: l, attrs: r } = t;
  return () => {
    const i = { part: !0 };
    let s = {};
    e.locale && (i.locale = e.locale), G(e.format) ? i.key = e.format : ge(e.format) && (G(e.format.key) && (i.key = e.format.key), s = Object.keys(e.format).reduce((d, m) => n.includes(m) ? He({}, d, { [m]: e.format[m] }) : d, {}));
    const o = a(e.value, i, s);
    let u = [i.key];
    Le(o) ? u = o.map((d, m) => {
      const v = l[d.type], g = v ? v({ [d.type]: d.value, index: m, parts: o }) : [d.value];
      return Om(g) && (g[0].key = `${d.type}-${m}`), g;
    }) : G(o) && (u = [o]);
    const c = He({}, r), f = G(e.tag) || ge(e.tag) ? e.tag : Yo();
    return zt(f, c, u);
  };
}
const Lm = /* @__PURE__ */ za({
  /* eslint-disable */
  name: "i18n-n",
  props: He({
    value: {
      type: Number,
      required: !0
    },
    format: {
      type: [String, Object]
    }
  }, Mr),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const n = e.i18n || el({
      useScope: e.scope,
      __useComponent: !0
    });
    return qo(e, t, Ho, (...a) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      n[or](...a)
    ));
  }
}), Xi = Lm, Vm = /* @__PURE__ */ za({
  /* eslint-disable */
  name: "i18n-d",
  props: He({
    value: {
      type: [Number, Date],
      required: !0
    },
    format: {
      type: [String, Object]
    }
  }, Mr),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const n = e.i18n || el({
      useScope: e.scope,
      __useComponent: !0
    });
    return qo(e, t, Bo, (...a) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      n[sr](...a)
    ));
  }
}), Qi = Vm;
function Nm(e, t) {
  const n = e;
  if (e.mode === "composition")
    return n.__getInstance(t) || e.global;
  {
    const a = n.__getInstance(t);
    return a != null ? a.__composer : e.global.__composer;
  }
}
function Rm(e) {
  const t = (i) => {
    const { instance: s, value: o } = i;
    if (!s || !s.$)
      throw it(Ze.UNEXPECTED_ERROR);
    const u = Nm(e, s.$), c = Ji(o);
    return [
      Reflect.apply(u.t, u, [...Zi(c)]),
      u
    ];
  };
  return {
    created: (i, s) => {
      const [o, u] = t(s);
      $a && e.global === u && (i.__i18nWatcher = ne(u.locale, () => {
        s.instance && s.instance.$forceUpdate();
      })), i.__composer = u, i.textContent = o;
    },
    unmounted: (i) => {
      $a && i.__i18nWatcher && (i.__i18nWatcher(), i.__i18nWatcher = void 0, delete i.__i18nWatcher), i.__composer && (i.__composer = void 0, delete i.__composer);
    },
    beforeUpdate: (i, { value: s }) => {
      if (i.__composer) {
        const o = i.__composer, u = Ji(s);
        i.textContent = Reflect.apply(o.t, o, [
          ...Zi(u)
        ]);
      }
    },
    getSSRProps: (i) => {
      const [s] = t(i);
      return { textContent: s };
    }
  };
}
function Ji(e) {
  if (G(e))
    return { path: e };
  if (de(e)) {
    if (!("path" in e))
      throw it(Ze.REQUIRED_VALUE, "path");
    return e;
  } else
    throw it(Ze.INVALID_VALUE);
}
function Zi(e) {
  const { path: t, locale: n, args: a, choice: l, plural: r } = e, i = {}, s = a || {};
  return G(n) && (i.locale = n), Be(l) && (i.plural = l), Be(r) && (i.plural = r), [t, s, i];
}
function Fm(e, t, ...n) {
  const a = de(n[0]) ? n[0] : {};
  (me(a.globalInstall) ? a.globalInstall : !0) && ([qi.name, "I18nT"].forEach((r) => e.component(r, qi)), [Xi.name, "I18nN"].forEach((r) => e.component(r, Xi)), [Qi.name, "I18nD"].forEach((r) => e.component(r, Qi))), e.directive("t", Rm(t));
}
const Dm = /* @__PURE__ */ Jt("global-vue-i18n");
function SS(e = {}, t) {
  const n = __VUE_I18N_LEGACY_API__ && me(e.legacy) ? e.legacy : __VUE_I18N_LEGACY_API__, a = me(e.globalInjection) ? e.globalInjection : !0, l = /* @__PURE__ */ new Map(), [r, i] = Mm(e, n), s = /* @__PURE__ */ Jt("");
  function o(d) {
    return l.get(d) || null;
  }
  function u(d, m) {
    l.set(d, m);
  }
  function c(d) {
    l.delete(d);
  }
  const f = {
    // mode
    get mode() {
      return __VUE_I18N_LEGACY_API__ && n ? "legacy" : "composition";
    },
    // install plugin
    async install(d, ...m) {
      if (d.__VUE_I18N_SYMBOL__ = s, d.provide(d.__VUE_I18N_SYMBOL__, f), de(m[0])) {
        const b = m[0];
        f.__composerExtend = b.__composerExtend, f.__vueI18nExtend = b.__vueI18nExtend;
      }
      let v = null;
      !n && a && (v = Gm(d, f.global)), __VUE_I18N_FULL_INSTALL__ && Fm(d, f, ...m), __VUE_I18N_LEGACY_API__ && n && d.mixin($m(i, i.__composer, f));
      const g = d.unmount;
      d.unmount = () => {
        v && v(), f.dispose(), g();
      };
    },
    // global accessor
    get global() {
      return i;
    },
    dispose() {
      r.stop();
    },
    // @internal
    __instances: l,
    // @internal
    __getInstance: o,
    // @internal
    __setInstance: u,
    // @internal
    __deleteInstance: c
  };
  return f;
}
function el(e = {}) {
  const t = xn();
  if (t == null)
    throw it(Ze.MUST_BE_CALL_SETUP_TOP);
  if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__)
    throw it(Ze.NOT_INSTALLED);
  const n = Bm(t), a = Wm(n), l = zo(t), r = Hm(e, l);
  if (r === "global")
    return Go(a, e, l), a;
  if (r === "parent") {
    let o = Km(n, t, e.__useComponent);
    return o == null && (o = a), o;
  }
  const i = n;
  let s = i.__getInstance(t);
  if (s == null) {
    const o = He({}, e);
    "__i18n" in l && (o.__i18n = l.__i18n), a && (o.__root = a), s = Dr(o), i.__composerExtend && (s[ur] = i.__composerExtend(s)), Um(i, t, s), i.__setInstance(t, s);
  }
  return s;
}
function Mm(e, t, n) {
  const a = An(), l = __VUE_I18N_LEGACY_API__ && t ? a.run(() => cr(e)) : a.run(() => Dr(e));
  if (l == null)
    throw it(Ze.UNEXPECTED_ERROR);
  return [a, l];
}
function Bm(e) {
  const t = ye(e.isCE ? Dm : e.appContext.app.__VUE_I18N_SYMBOL__);
  if (!t)
    throw it(e.isCE ? Ze.NOT_INSTALLED_WITH_PROVIDE : Ze.UNEXPECTED_ERROR);
  return t;
}
function Hm(e, t) {
  return Qa(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local";
}
function Wm(e) {
  return e.mode === "composition" ? e.global : e.global.__composer;
}
function Km(e, t, n = !1) {
  let a = null;
  const l = t.root;
  let r = jm(t, n);
  for (; r != null; ) {
    const i = e;
    if (e.mode === "composition")
      a = i.__getInstance(r);
    else if (__VUE_I18N_LEGACY_API__) {
      const s = i.__getInstance(r);
      s != null && (a = s.__composer, n && a && !a[Uo] && (a = null));
    }
    if (a != null || l === r)
      break;
    r = r.parent;
  }
  return a;
}
function jm(e, t = !1) {
  return e == null ? null : t && e.vnode.ctx || e.parent;
}
function Um(e, t, n) {
  Lt(() => {
  }, t), Kd(() => {
    const a = n;
    e.__deleteInstance(t);
    const l = a[ur];
    l && (l(), delete a[ur]);
  }, t);
}
const zm = [
  "locale",
  "fallbackLocale",
  "availableLocales"
], es = ["t", "rt", "d", "n", "tm", "te"];
function Gm(e, t) {
  const n = /* @__PURE__ */ Object.create(null);
  return zm.forEach((l) => {
    const r = Object.getOwnPropertyDescriptor(t, l);
    if (!r)
      throw it(Ze.UNEXPECTED_ERROR);
    const i = It(r.value) ? {
      get() {
        return r.value.value;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(s) {
        r.value.value = s;
      }
    } : {
      get() {
        return r.get && r.get();
      }
    };
    Object.defineProperty(n, l, i);
  }), e.config.globalProperties.$i18n = n, es.forEach((l) => {
    const r = Object.getOwnPropertyDescriptor(t, l);
    if (!r || !r.value)
      throw it(Ze.UNEXPECTED_ERROR);
    Object.defineProperty(e.config.globalProperties, `$${l}`, r);
  }), () => {
    delete e.config.globalProperties.$i18n, es.forEach((l) => {
      delete e.config.globalProperties[`$${l}`];
    });
  };
}
km();
am(Dh);
lm(em);
rm(Vo);
if (__INTLIFY_PROD_DEVTOOLS__) {
  const e = on();
  e.__INTLIFY__ = !0, Mh(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
function _t(e, t) {
  let n;
  function a() {
    n = An(), n.run(() => t.length ? t(() => {
      n == null || n.stop(), a();
    }) : t());
  }
  ne(e, (l) => {
    l && !n ? a() : l || (n == null || n.stop(), n = void 0);
  }, {
    immediate: !0
  }), Ge(() => {
    n == null || n.stop();
  });
}
const ke = typeof window < "u", Br = ke && "IntersectionObserver" in window, Ym = ke && ("ontouchstart" in window || window.navigator.maxTouchPoints > 0);
function ts(e, t, n) {
  qm(e, t), t.set(e, n);
}
function qm(e, t) {
  if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function Xm(e, t, n) {
  return e.set(Xo(e, t), n), n;
}
function rn(e, t) {
  return e.get(Xo(e, t));
}
function Xo(e, t, n) {
  if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
  throw new TypeError("Private element is not present on this object");
}
function Qo(e, t, n) {
  const a = t.length - 1;
  if (a < 0) return e === void 0 ? n : e;
  for (let l = 0; l < a; l++) {
    if (e == null)
      return n;
    e = e[t[l]];
  }
  return e == null || e[t[a]] === void 0 ? n : e[t[a]];
}
function en(e, t) {
  if (e === t) return !0;
  if (e instanceof Date && t instanceof Date && e.getTime() !== t.getTime() || e !== Object(e) || t !== Object(t))
    return !1;
  const n = Object.keys(e);
  return n.length !== Object.keys(t).length ? !1 : n.every((a) => en(e[a], t[a]));
}
function fn(e, t, n) {
  return e == null || !t || typeof t != "string" ? n : e[t] !== void 0 ? e[t] : (t = t.replace(/\[(\w+)\]/g, ".$1"), t = t.replace(/^\./, ""), Qo(e, t.split("."), n));
}
function nt(e, t, n) {
  if (t === !0) return e === void 0 ? n : e;
  if (t == null || typeof t == "boolean") return n;
  if (e !== Object(e)) {
    if (typeof t != "function") return n;
    const l = t(e, n);
    return typeof l > "u" ? n : l;
  }
  if (typeof t == "string") return fn(e, t, n);
  if (Array.isArray(t)) return Qo(e, t, n);
  if (typeof t != "function") return n;
  const a = t(e, n);
  return typeof a > "u" ? n : a;
}
function Wn(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return Array.from({
    length: e
  }, (n, a) => t + a);
}
function ee(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "px";
  if (!(e == null || e === ""))
    return isNaN(+e) ? String(e) : isFinite(+e) ? `${Number(e)}${t}` : void 0;
}
function Jo(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function ns(e) {
  let t;
  return e !== null && typeof e == "object" && ((t = Object.getPrototypeOf(e)) === Object.prototype || t === null);
}
function Zo(e) {
  if (e && "$el" in e) {
    const t = e.$el;
    return (t == null ? void 0 : t.nodeType) === Node.TEXT_NODE ? t.nextElementSibling : t;
  }
  return e;
}
const as = Object.freeze({
  enter: 13,
  tab: 9,
  delete: 46,
  esc: 27,
  space: 32,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  end: 35,
  home: 36,
  del: 46,
  backspace: 8,
  insert: 45,
  pageup: 33,
  pagedown: 34,
  shift: 16
}), ls = Object.freeze({
  enter: "Enter",
  tab: "Tab",
  delete: "Delete",
  esc: "Escape",
  space: "Space",
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight",
  end: "End",
  home: "Home",
  del: "Delete",
  backspace: "Backspace",
  insert: "Insert",
  pageup: "PageUp",
  pagedown: "PageDown",
  shift: "Shift"
});
function eu(e) {
  return Object.keys(e);
}
function Nl(e, t) {
  return t.every((n) => e.hasOwnProperty(n));
}
function tu(e, t) {
  const n = {}, a = new Set(Object.keys(e));
  for (const l of t)
    a.has(l) && (n[l] = e[l]);
  return n;
}
function rs(e, t, n) {
  const a = /* @__PURE__ */ Object.create(null), l = /* @__PURE__ */ Object.create(null);
  for (const r in e)
    t.some((i) => i instanceof RegExp ? i.test(r) : i === r) && !(n != null && n.some((i) => i === r)) ? a[r] = e[r] : l[r] = e[r];
  return [a, l];
}
function tn(e, t) {
  const n = {
    ...e
  };
  return t.forEach((a) => delete n[a]), n;
}
function Qm(e, t) {
  const n = {};
  return t.forEach((a) => n[a] = e[a]), n;
}
const nu = /^on[^a-z]/, tl = (e) => nu.test(e), Jm = ["onAfterscriptexecute", "onAnimationcancel", "onAnimationend", "onAnimationiteration", "onAnimationstart", "onAuxclick", "onBeforeinput", "onBeforescriptexecute", "onChange", "onClick", "onCompositionend", "onCompositionstart", "onCompositionupdate", "onContextmenu", "onCopy", "onCut", "onDblclick", "onFocusin", "onFocusout", "onFullscreenchange", "onFullscreenerror", "onGesturechange", "onGestureend", "onGesturestart", "onGotpointercapture", "onInput", "onKeydown", "onKeypress", "onKeyup", "onLostpointercapture", "onMousedown", "onMousemove", "onMouseout", "onMouseover", "onMouseup", "onMousewheel", "onPaste", "onPointercancel", "onPointerdown", "onPointerenter", "onPointerleave", "onPointermove", "onPointerout", "onPointerover", "onPointerup", "onReset", "onSelect", "onSubmit", "onTouchcancel", "onTouchend", "onTouchmove", "onTouchstart", "onTransitioncancel", "onTransitionend", "onTransitionrun", "onTransitionstart", "onWheel"];
function au(e) {
  const [t, n] = rs(e, [nu]), a = tn(t, Jm), [l, r] = rs(n, ["class", "style", "id", /^data-/]);
  return Object.assign(l, t), Object.assign(r, a), [l, r];
}
function Ke(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function Zm(e, t) {
  let n = 0;
  const a = function() {
    for (var l = arguments.length, r = new Array(l), i = 0; i < l; i++)
      r[i] = arguments[i];
    clearTimeout(n), n = setTimeout(() => e(...r), De(t));
  };
  return a.clear = () => {
    clearTimeout(n);
  }, a.immediate = e, a;
}
function ft(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  return Math.max(t, Math.min(n, e));
}
function is(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
  return e + n.repeat(Math.max(0, t - e.length));
}
function wS(e, t) {
  return (arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0").repeat(Math.max(0, t - e.length)) + e;
}
function eg(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  const n = [];
  let a = 0;
  for (; a < e.length; )
    n.push(e.substr(a, t)), a += t;
  return n;
}
function lt() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  const a = {};
  for (const l in e)
    a[l] = e[l];
  for (const l in t) {
    const r = e[l], i = t[l];
    if (ns(r) && ns(i)) {
      a[l] = lt(r, i, n);
      continue;
    }
    if (n && Array.isArray(r) && Array.isArray(i)) {
      a[l] = n(r, i);
      continue;
    }
    a[l] = i;
  }
  return a;
}
function lu(e) {
  return e.map((t) => t.type === he ? lu(t.children) : t).flat();
}
function cn() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  if (cn.cache.has(e)) return cn.cache.get(e);
  const t = e.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
  return cn.cache.set(e, t), t;
}
cn.cache = /* @__PURE__ */ new Map();
function kn(e, t) {
  if (!t || typeof t != "object") return [];
  if (Array.isArray(t))
    return t.map((n) => kn(e, n)).flat(1);
  if (t.suspense)
    return kn(e, t.ssContent);
  if (Array.isArray(t.children))
    return t.children.map((n) => kn(e, n)).flat(1);
  if (t.component) {
    if (Object.getOwnPropertySymbols(t.component.provides).includes(e))
      return [t.component];
    if (t.component.subTree)
      return kn(e, t.component.subTree).flat(1);
  }
  return [];
}
var ya = /* @__PURE__ */ new WeakMap(), Sn = /* @__PURE__ */ new WeakMap();
class tg {
  constructor(t) {
    ts(this, ya, []), ts(this, Sn, 0), this.size = t;
  }
  push(t) {
    rn(ya, this)[rn(Sn, this)] = t, Xm(Sn, this, (rn(Sn, this) + 1) % this.size);
  }
  values() {
    return rn(ya, this).slice(rn(Sn, this)).concat(rn(ya, this).slice(0, rn(Sn, this)));
  }
}
function Hr(e) {
  const t = Xe({}), n = _(e);
  return rt(() => {
    for (const a in n.value)
      t[a] = n.value[a];
  }, {
    flush: "sync"
  }), On(t);
}
function Aa(e, t) {
  return e.includes(t);
}
function ru(e) {
  return e[2].toLowerCase() + e.slice(3);
}
const je = () => [Function, Array];
function ss(e, t) {
  return t = "on" + Ln(t), !!(e[t] || e[`${t}Once`] || e[`${t}Capture`] || e[`${t}OnceCapture`] || e[`${t}CaptureOnce`]);
}
function ng(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
    n[a - 1] = arguments[a];
  if (Array.isArray(e))
    for (const l of e)
      l(...n);
  else typeof e == "function" && e(...n);
}
function Oa(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  const n = ["button", "[href]", 'input:not([type="hidden"])', "select", "textarea", "[tabindex]"].map((a) => `${a}${t ? ':not([tabindex="-1"])' : ""}:not([disabled])`).join(", ");
  return [...e.querySelectorAll(n)];
}
function iu(e, t, n) {
  let a, l = e.indexOf(document.activeElement);
  const r = t === "next" ? 1 : -1;
  do
    l += r, a = e[l];
  while ((!a || a.offsetParent == null || !((n == null ? void 0 : n(a)) ?? !0)) && l < e.length && l >= 0);
  return a;
}
function Un(e, t) {
  var a, l, r, i;
  const n = Oa(e);
  if (!t)
    (e === document.activeElement || !e.contains(document.activeElement)) && ((a = n[0]) == null || a.focus());
  else if (t === "first")
    (l = n[0]) == null || l.focus();
  else if (t === "last")
    (r = n.at(-1)) == null || r.focus();
  else if (typeof t == "number")
    (i = n[t]) == null || i.focus();
  else {
    const s = iu(n, t);
    s ? s.focus() : Un(e, t === "next" ? "first" : "last");
  }
}
function ba(e) {
  return e == null || typeof e == "string" && e.trim() === "";
}
function La(e, t) {
  if (!(ke && typeof CSS < "u" && typeof CSS.supports < "u" && CSS.supports(`selector(${t})`))) return null;
  try {
    return !!e && e.matches(t);
  } catch {
    return null;
  }
}
function su(e) {
  return e.some((t) => jd(t) ? t.type === Ud ? !1 : t.type !== he || su(t.children) : !0) ? e : null;
}
function ag(e, t) {
  if (!ke || e === 0)
    return t(), () => {
    };
  const n = window.setTimeout(t, e);
  return () => window.clearTimeout(n);
}
function lg(e, t) {
  const n = e.clientX, a = e.clientY, l = t.getBoundingClientRect(), r = l.left, i = l.top, s = l.right, o = l.bottom;
  return n >= r && n <= s && a >= i && a <= o;
}
function dr() {
  const e = J(), t = (n) => {
    e.value = n;
  };
  return Object.defineProperty(t, "value", {
    enumerable: !0,
    get: () => e.value,
    set: (n) => e.value = n
  }), Object.defineProperty(t, "el", {
    enumerable: !0,
    get: () => Zo(e.value)
  }), t;
}
function os(e) {
  const t = e.key.length === 1, n = !e.ctrlKey && !e.metaKey && !e.altKey;
  return t && n;
}
const ou = ["top", "bottom"], rg = ["start", "end", "left", "right"];
function fr(e, t) {
  let [n, a] = e.split(" ");
  return a || (a = Aa(ou, n) ? "start" : Aa(rg, n) ? "top" : "center"), {
    side: vr(n, t),
    align: vr(a, t)
  };
}
function vr(e, t) {
  return e === "start" ? t ? "right" : "left" : e === "end" ? t ? "left" : "right" : e;
}
function Rl(e) {
  return {
    side: {
      center: "center",
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    }[e.side],
    align: e.align
  };
}
function Fl(e) {
  return {
    side: e.side,
    align: {
      center: "center",
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    }[e.align]
  };
}
function us(e) {
  return {
    side: e.align,
    align: e.side
  };
}
function cs(e) {
  return Aa(ou, e.side) ? "y" : "x";
}
class dn {
  constructor(t) {
    let {
      x: n,
      y: a,
      width: l,
      height: r
    } = t;
    this.x = n, this.y = a, this.width = l, this.height = r;
  }
  get top() {
    return this.y;
  }
  get bottom() {
    return this.y + this.height;
  }
  get left() {
    return this.x;
  }
  get right() {
    return this.x + this.width;
  }
}
function ds(e, t) {
  return {
    x: {
      before: Math.max(0, t.left - e.left),
      after: Math.max(0, e.right - t.right)
    },
    y: {
      before: Math.max(0, t.top - e.top),
      after: Math.max(0, e.bottom - t.bottom)
    }
  };
}
function uu(e) {
  return Array.isArray(e) ? new dn({
    x: e[0],
    y: e[1],
    width: 0,
    height: 0
  }) : e.getBoundingClientRect();
}
function Wr(e) {
  const t = e.getBoundingClientRect(), n = getComputedStyle(e), a = n.transform;
  if (a) {
    let l, r, i, s, o;
    if (a.startsWith("matrix3d("))
      l = a.slice(9, -1).split(/, /), r = +l[0], i = +l[5], s = +l[12], o = +l[13];
    else if (a.startsWith("matrix("))
      l = a.slice(7, -1).split(/, /), r = +l[0], i = +l[3], s = +l[4], o = +l[5];
    else
      return new dn(t);
    const u = n.transformOrigin, c = t.x - s - (1 - r) * parseFloat(u), f = t.y - o - (1 - i) * parseFloat(u.slice(u.indexOf(" ") + 1)), d = r ? t.width / r : e.offsetWidth + 1, m = i ? t.height / i : e.offsetHeight + 1;
    return new dn({
      x: c,
      y: f,
      width: d,
      height: m
    });
  } else
    return new dn(t);
}
function un(e, t, n) {
  if (typeof e.animate > "u") return {
    finished: Promise.resolve()
  };
  let a;
  try {
    a = e.animate(t, n);
  } catch {
    return {
      finished: Promise.resolve()
    };
  }
  return typeof a.finished > "u" && (a.finished = new Promise((l) => {
    a.onfinish = () => {
      l(a);
    };
  })), a;
}
const Ea = /* @__PURE__ */ new WeakMap();
function ig(e, t) {
  Object.keys(t).forEach((n) => {
    if (tl(n)) {
      const a = ru(n), l = Ea.get(e);
      if (t[n] == null)
        l == null || l.forEach((r) => {
          const [i, s] = r;
          i === a && (e.removeEventListener(a, s), l.delete(r));
        });
      else if (!l || ![...l].some((r) => r[0] === a && r[1] === t[n])) {
        e.addEventListener(a, t[n]);
        const r = l || /* @__PURE__ */ new Set();
        r.add([a, t[n]]), Ea.has(e) || Ea.set(e, r);
      }
    } else
      t[n] == null ? e.removeAttribute(n) : e.setAttribute(n, t[n]);
  });
}
function sg(e, t) {
  Object.keys(t).forEach((n) => {
    if (tl(n)) {
      const a = ru(n), l = Ea.get(e);
      l == null || l.forEach((r) => {
        const [i, s] = r;
        i === a && (e.removeEventListener(a, s), l.delete(r));
      });
    } else
      e.removeAttribute(n);
  });
}
const wn = 2.4, fs = 0.2126729, vs = 0.7151522, hs = 0.072175, og = 0.55, ug = 0.58, cg = 0.57, dg = 0.62, pa = 0.03, ms = 1.45, fg = 5e-4, vg = 1.25, hg = 1.25, gs = 0.078, ys = 12.82051282051282, _a = 0.06, bs = 1e-3;
function ps(e, t) {
  const n = (e.r / 255) ** wn, a = (e.g / 255) ** wn, l = (e.b / 255) ** wn, r = (t.r / 255) ** wn, i = (t.g / 255) ** wn, s = (t.b / 255) ** wn;
  let o = n * fs + a * vs + l * hs, u = r * fs + i * vs + s * hs;
  if (o <= pa && (o += (pa - o) ** ms), u <= pa && (u += (pa - u) ** ms), Math.abs(u - o) < fg) return 0;
  let c;
  if (u > o) {
    const f = (u ** og - o ** ug) * vg;
    c = f < bs ? 0 : f < gs ? f - f * ys * _a : f - _a;
  } else {
    const f = (u ** dg - o ** cg) * hg;
    c = f > -bs ? 0 : f > -gs ? f - f * ys * _a : f + _a;
  }
  return c * 100;
}
function Ut(e) {
  Ga(`Vuetify: ${e}`);
}
function Xn(e) {
  Ga(`Vuetify error: ${e}`);
}
function mg(e, t) {
  t = Array.isArray(t) ? t.slice(0, -1).map((n) => `'${n}'`).join(", ") + ` or '${t.at(-1)}'` : `'${t}'`, Ga(`[Vuetify UPGRADE] '${e}' is deprecated, use ${t} instead.`);
}
const Va = 0.20689655172413793, gg = (e) => e > Va ** 3 ? Math.cbrt(e) : e / (3 * Va ** 2) + 4 / 29, yg = (e) => e > Va ? e ** 3 : 3 * Va ** 2 * (e - 4 / 29);
function cu(e) {
  const t = gg, n = t(e[1]);
  return [116 * n - 16, 500 * (t(e[0] / 0.95047) - n), 200 * (n - t(e[2] / 1.08883))];
}
function du(e) {
  const t = yg, n = (e[0] + 16) / 116;
  return [t(n + e[1] / 500) * 0.95047, t(n), t(n - e[2] / 200) * 1.08883];
}
const bg = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.204, 1.057]], pg = (e) => e <= 31308e-7 ? e * 12.92 : 1.055 * e ** (1 / 2.4) - 0.055, _g = [[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]], Sg = (e) => e <= 0.04045 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4;
function fu(e) {
  const t = Array(3), n = pg, a = bg;
  for (let l = 0; l < 3; ++l)
    t[l] = Math.round(ft(n(a[l][0] * e[0] + a[l][1] * e[1] + a[l][2] * e[2])) * 255);
  return {
    r: t[0],
    g: t[1],
    b: t[2]
  };
}
function Kr(e) {
  let {
    r: t,
    g: n,
    b: a
  } = e;
  const l = [0, 0, 0], r = Sg, i = _g;
  t = r(t / 255), n = r(n / 255), a = r(a / 255);
  for (let s = 0; s < 3; ++s)
    l[s] = i[s][0] * t + i[s][1] * n + i[s][2] * a;
  return l;
}
function hr(e) {
  return !!e && /^(#|var\(--|(rgb|hsl)a?\()/.test(e);
}
function wg(e) {
  return hr(e) && !/^((rgb|hsl)a?\()?var\(--/.test(e);
}
const _s = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/, Cg = {
  rgb: (e, t, n, a) => ({
    r: e,
    g: t,
    b: n,
    a
  }),
  rgba: (e, t, n, a) => ({
    r: e,
    g: t,
    b: n,
    a
  }),
  hsl: (e, t, n, a) => Ss({
    h: e,
    s: t,
    l: n,
    a
  }),
  hsla: (e, t, n, a) => Ss({
    h: e,
    s: t,
    l: n,
    a
  }),
  hsv: (e, t, n, a) => Qn({
    h: e,
    s: t,
    v: n,
    a
  }),
  hsva: (e, t, n, a) => Qn({
    h: e,
    s: t,
    v: n,
    a
  })
};
function Ot(e) {
  if (typeof e == "number")
    return (isNaN(e) || e < 0 || e > 16777215) && Ut(`'${e}' is not a valid hex color`), {
      r: (e & 16711680) >> 16,
      g: (e & 65280) >> 8,
      b: e & 255
    };
  if (typeof e == "string" && _s.test(e)) {
    const {
      groups: t
    } = e.match(_s), {
      fn: n,
      values: a
    } = t, l = a.split(/,\s*/).map((r) => r.endsWith("%") && ["hsl", "hsla", "hsv", "hsva"].includes(n) ? parseFloat(r) / 100 : parseFloat(r));
    return Cg[n](...l);
  } else if (typeof e == "string") {
    let t = e.startsWith("#") ? e.slice(1) : e;
    [3, 4].includes(t.length) ? t = t.split("").map((a) => a + a).join("") : [6, 8].includes(t.length) || Ut(`'${e}' is not a valid hex(a) color`);
    const n = parseInt(t, 16);
    return (isNaN(n) || n < 0 || n > 4294967295) && Ut(`'${e}' is not a valid hex(a) color`), kg(t);
  } else if (typeof e == "object") {
    if (Nl(e, ["r", "g", "b"]))
      return e;
    if (Nl(e, ["h", "s", "l"]))
      return Qn(vu(e));
    if (Nl(e, ["h", "s", "v"]))
      return Qn(e);
  }
  throw new TypeError(`Invalid color: ${e == null ? e : String(e) || e.constructor.name}
Expected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`);
}
function Qn(e) {
  const {
    h: t,
    s: n,
    v: a,
    a: l
  } = e, r = (s) => {
    const o = (s + t / 60) % 6;
    return a - a * n * Math.max(Math.min(o, 4 - o, 1), 0);
  }, i = [r(5), r(3), r(1)].map((s) => Math.round(s * 255));
  return {
    r: i[0],
    g: i[1],
    b: i[2],
    a: l
  };
}
function Ss(e) {
  return Qn(vu(e));
}
function vu(e) {
  const {
    h: t,
    s: n,
    l: a,
    a: l
  } = e, r = a + n * Math.min(a, 1 - a), i = r === 0 ? 0 : 2 - 2 * a / r;
  return {
    h: t,
    s: i,
    v: r,
    a: l
  };
}
function Sa(e) {
  const t = Math.round(e).toString(16);
  return ("00".substr(0, 2 - t.length) + t).toUpperCase();
}
function Ig(e) {
  let {
    r: t,
    g: n,
    b: a,
    a: l
  } = e;
  return `#${[Sa(t), Sa(n), Sa(a), l !== void 0 ? Sa(Math.round(l * 255)) : ""].join("")}`;
}
function kg(e) {
  e = Eg(e);
  let [t, n, a, l] = eg(e, 2).map((r) => parseInt(r, 16));
  return l = l === void 0 ? l : l / 255, {
    r: t,
    g: n,
    b: a,
    a: l
  };
}
function Eg(e) {
  return e.startsWith("#") && (e = e.slice(1)), e = e.replace(/([^0-9a-f])/gi, "F"), (e.length === 3 || e.length === 4) && (e = e.split("").map((t) => t + t).join("")), e.length !== 6 && (e = is(is(e, 6), 8, "F")), e;
}
function xg(e, t) {
  const n = cu(Kr(e));
  return n[0] = n[0] + t * 10, fu(du(n));
}
function Pg(e, t) {
  const n = cu(Kr(e));
  return n[0] = n[0] - t * 10, fu(du(n));
}
function $g(e) {
  const t = Ot(e);
  return Kr(t)[1];
}
function hu(e) {
  const t = Math.abs(ps(Ot(0), Ot(e)));
  return Math.abs(ps(Ot(16777215), Ot(e))) > Math.min(t, 50) ? "#fff" : "#000";
}
function D(e, t) {
  return (n) => Object.keys(e).reduce((a, l) => {
    const i = typeof e[l] == "object" && e[l] != null && !Array.isArray(e[l]) ? e[l] : {
      type: e[l]
    };
    return n && l in n ? a[l] = {
      ...i,
      default: n[l]
    } : a[l] = i, t && !a[l].source && (a[l].source = t), a;
  }, {});
}
const re = D({
  class: [String, Array, Object],
  style: {
    type: [String, Array, Object],
    default: null
  }
}, "component");
function Ae(e, t) {
  const n = xn();
  if (!n)
    throw new Error(`[Vuetify] ${e} must be called from inside a setup function`);
  return n;
}
function Vt() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "composables";
  const t = Ae(e).type;
  return cn((t == null ? void 0 : t.aliasName) || (t == null ? void 0 : t.name));
}
let mu = 0, xa = /* @__PURE__ */ new WeakMap();
function Nt() {
  const e = Ae("getUid");
  if (xa.has(e)) return xa.get(e);
  {
    const t = mu++;
    return xa.set(e, t), t;
  }
}
Nt.reset = () => {
  mu = 0, xa = /* @__PURE__ */ new WeakMap();
};
function Tg(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ae("injectSelf");
  const {
    provides: n
  } = t;
  if (n && e in n)
    return n[e];
}
const Na = Symbol.for("vuetify:defaults");
function CS(e) {
  return Y(e);
}
function jr() {
  const e = ye(Na);
  if (!e) throw new Error("[Vuetify] Could not find defaults instance");
  return e;
}
function vt(e, t) {
  const n = jr(), a = Y(e), l = _(() => {
    if (De(t == null ? void 0 : t.disabled)) return n.value;
    const i = De(t == null ? void 0 : t.scoped), s = De(t == null ? void 0 : t.reset), o = De(t == null ? void 0 : t.root);
    if (a.value == null && !(i || s || o)) return n.value;
    let u = lt(a.value, {
      prev: n.value
    });
    if (i) return u;
    if (s || o) {
      const c = Number(s || 1 / 0);
      for (let f = 0; f <= c && !(!u || !("prev" in u)); f++)
        u = u.prev;
      return u && typeof o == "string" && o in u && (u = lt(lt(u, {
        prev: u
      }), u[o])), u;
    }
    return u.prev ? lt(u.prev, u) : u;
  });
  return Ee(Na, l), l;
}
function Ag(e, t) {
  var n, a;
  return typeof ((n = e.props) == null ? void 0 : n[t]) < "u" || typeof ((a = e.props) == null ? void 0 : a[cn(t)]) < "u";
}
function Og() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : jr();
  const a = Ae("useDefaults");
  if (t = t ?? a.type.name ?? a.type.__name, !t)
    throw new Error("[Vuetify] Could not determine component name");
  const l = _(() => {
    var o;
    return (o = n.value) == null ? void 0 : o[e._as ?? t];
  }), r = new Proxy(e, {
    get(o, u) {
      var f, d, m, v, g, b, y;
      const c = Reflect.get(o, u);
      return u === "class" || u === "style" ? [(f = l.value) == null ? void 0 : f[u], c].filter((p) => p != null) : typeof u == "string" && !Ag(a.vnode, u) ? ((d = l.value) == null ? void 0 : d[u]) !== void 0 ? (m = l.value) == null ? void 0 : m[u] : ((g = (v = n.value) == null ? void 0 : v.global) == null ? void 0 : g[u]) !== void 0 ? (y = (b = n.value) == null ? void 0 : b.global) == null ? void 0 : y[u] : c : c;
    }
  }), i = J();
  rt(() => {
    if (l.value) {
      const o = Object.entries(l.value).filter((u) => {
        let [c] = u;
        return c.startsWith(c[0].toUpperCase());
      });
      i.value = o.length ? Object.fromEntries(o) : void 0;
    } else
      i.value = void 0;
  });
  function s() {
    const o = Tg(Na, a);
    Ee(Na, _(() => i.value ? lt((o == null ? void 0 : o.value) ?? {}, i.value) : o == null ? void 0 : o.value));
  }
  return {
    props: r,
    provideSubDefaults: s
  };
}
function ia(e) {
  if (e._setup = e._setup ?? e.setup, !e.name)
    return Ut("The component is missing an explicit name, unable to generate default prop value"), e;
  if (e._setup) {
    e.props = D(e.props ?? {}, e.name)();
    const t = Object.keys(e.props).filter((n) => n !== "class" && n !== "style");
    e.filterProps = function(a) {
      return tu(a, t);
    }, e.props._as = String, e.setup = function(a, l) {
      const r = jr();
      if (!r.value) return e._setup(a, l);
      const {
        props: i,
        provideSubDefaults: s
      } = Og(a, a._as ?? e.name, r), o = e._setup(i, l);
      return s(), o;
    };
  }
  return e;
}
function U() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return (t) => (e ? ia : za)(t);
}
function Lg(e, t) {
  return t.props = e, t;
}
function nl(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "div", n = arguments.length > 2 ? arguments[2] : void 0;
  return U()({
    name: n ?? Ln(go(e.replace(/__/g, "-"))),
    props: {
      tag: {
        type: String,
        default: t
      },
      ...re()
    },
    setup(a, l) {
      let {
        slots: r
      } = l;
      return () => {
        var i;
        return zt(a.tag, {
          class: [e, a.class],
          style: a.style
        }, (i = r.default) == null ? void 0 : i.call(r));
      };
    }
  });
}
function gu(e) {
  if (typeof e.getRootNode != "function") {
    for (; e.parentNode; ) e = e.parentNode;
    return e !== document ? null : document;
  }
  const t = e.getRootNode();
  return t !== document && t.getRootNode({
    composed: !0
  }) !== document ? null : t;
}
const Jn = "cubic-bezier(0.4, 0, 0.2, 1)", Vg = "cubic-bezier(0.0, 0, 0.2, 1)", Ng = "cubic-bezier(0.4, 0, 1, 1)";
function ws(e, t, n) {
  return Object.keys(e).filter((a) => tl(a) && a.endsWith(t)).reduce((a, l) => (a[l.slice(0, -t.length)] = (r) => e[l](r, n(r)), a), {});
}
function yu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  for (; e; ) {
    if (t ? Rg(e) : Ur(e)) return e;
    e = e.parentElement;
  }
  return document.scrollingElement;
}
function Ra(e, t) {
  const n = [];
  if (t && e && !t.contains(e)) return n;
  for (; e && (Ur(e) && n.push(e), e !== t); )
    e = e.parentElement;
  return n;
}
function Ur(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const t = window.getComputedStyle(e);
  return t.overflowY === "scroll" || t.overflowY === "auto" && e.scrollHeight > e.clientHeight;
}
function Rg(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const t = window.getComputedStyle(e);
  return ["scroll", "auto"].includes(t.overflowY);
}
function Fg(e) {
  for (; e; ) {
    if (window.getComputedStyle(e).position === "fixed")
      return !0;
    e = e.offsetParent;
  }
  return !1;
}
function Z(e) {
  const t = Ae("useRender");
  t.render = e;
}
function be(e, t, n) {
  let a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : (f) => f, l = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : (f) => f;
  const r = Ae("useProxiedModel"), i = Y(e[t] !== void 0 ? e[t] : n), s = cn(t), u = s !== t ? _(() => {
    var f, d, m, v;
    return e[t], !!(((f = r.vnode.props) != null && f.hasOwnProperty(t) || (d = r.vnode.props) != null && d.hasOwnProperty(s)) && ((m = r.vnode.props) != null && m.hasOwnProperty(`onUpdate:${t}`) || (v = r.vnode.props) != null && v.hasOwnProperty(`onUpdate:${s}`)));
  }) : _(() => {
    var f, d;
    return e[t], !!((f = r.vnode.props) != null && f.hasOwnProperty(t) && ((d = r.vnode.props) != null && d.hasOwnProperty(`onUpdate:${t}`)));
  });
  _t(() => !u.value, () => {
    ne(() => e[t], (f) => {
      i.value = f;
    });
  });
  const c = _({
    get() {
      const f = e[t];
      return a(u.value ? f : i.value);
    },
    set(f) {
      const d = l(f), m = Fe(u.value ? e[t] : i.value);
      m === d || a(m) === f || (i.value = d, r == null || r.emit(`update:${t}`, d));
    }
  });
  return Object.defineProperty(c, "externalValue", {
    get: () => u.value ? e[t] : i.value
  }), c;
}
const Dg = {
  badge: "Badge",
  open: "Open",
  close: "Close",
  dismiss: "Dismiss",
  confirmEdit: {
    ok: "OK",
    cancel: "Cancel"
  },
  dataIterator: {
    noResultsText: "No matching records found",
    loadingText: "Loading items..."
  },
  dataTable: {
    itemsPerPageText: "Rows per page:",
    ariaLabel: {
      sortDescending: "Sorted descending.",
      sortAscending: "Sorted ascending.",
      sortNone: "Not sorted.",
      activateNone: "Activate to remove sorting.",
      activateDescending: "Activate to sort descending.",
      activateAscending: "Activate to sort ascending."
    },
    sortBy: "Sort by"
  },
  dataFooter: {
    itemsPerPageText: "Items per page:",
    itemsPerPageAll: "All",
    nextPage: "Next page",
    prevPage: "Previous page",
    firstPage: "First page",
    lastPage: "Last page",
    pageText: "{0}-{1} of {2}"
  },
  dateRangeInput: {
    divider: "to"
  },
  datePicker: {
    itemsSelected: "{0} selected",
    range: {
      title: "Select dates",
      header: "Enter dates"
    },
    title: "Select date",
    header: "Enter date",
    input: {
      placeholder: "Enter date"
    }
  },
  noDataText: "No data available",
  carousel: {
    prev: "Previous visual",
    next: "Next visual",
    ariaLabel: {
      delimiter: "Carousel slide {0} of {1}"
    }
  },
  calendar: {
    moreEvents: "{0} more",
    today: "Today"
  },
  input: {
    clear: "Clear {0}",
    prependAction: "{0} prepended action",
    appendAction: "{0} appended action",
    otp: "Please enter OTP character {0}"
  },
  fileInput: {
    counter: "{0} files",
    counterSize: "{0} files ({1} in total)"
  },
  timePicker: {
    am: "AM",
    pm: "PM",
    title: "Select Time"
  },
  pagination: {
    ariaLabel: {
      root: "Pagination Navigation",
      next: "Next page",
      previous: "Previous page",
      page: "Go to page {0}",
      currentPage: "Page {0}, Current page",
      first: "First page",
      last: "Last page"
    }
  },
  stepper: {
    next: "Next",
    prev: "Previous"
  },
  rating: {
    ariaLabel: {
      item: "Rating {0} of {1}"
    }
  },
  loading: "Loading...",
  infiniteScroll: {
    loadMore: "Load more",
    empty: "No more"
  }
}, Cs = "$vuetify.", Is = (e, t) => e.replace(/\{(\d+)\}/g, (n, a) => String(t[+a])), bu = (e, t, n) => function(a) {
  for (var l = arguments.length, r = new Array(l > 1 ? l - 1 : 0), i = 1; i < l; i++)
    r[i - 1] = arguments[i];
  if (!a.startsWith(Cs))
    return Is(a, r);
  const s = a.replace(Cs, ""), o = e.value && n.value[e.value], u = t.value && n.value[t.value];
  let c = fn(o, s, null);
  return c || (Ut(`Translation key "${a}" not found in "${e.value}", trying fallback locale`), c = fn(u, s, null)), c || (Xn(`Translation key "${a}" not found in fallback`), c = a), typeof c != "string" && (Xn(`Translation key "${a}" has a non-string value`), c = a), Is(c, r);
};
function pu(e, t) {
  return (n, a) => new Intl.NumberFormat([e.value, t.value], a).format(n);
}
function Dl(e, t, n) {
  const a = be(e, t, e[t] ?? n.value);
  return a.value = e[t] ?? n.value, ne(n, (l) => {
    e[t] == null && (a.value = n.value);
  }), a;
}
function _u(e) {
  return (t) => {
    const n = Dl(t, "locale", e.current), a = Dl(t, "fallback", e.fallback), l = Dl(t, "messages", e.messages);
    return {
      name: "vuetify",
      current: n,
      fallback: a,
      messages: l,
      t: bu(n, a, l),
      n: pu(n, a),
      provide: _u({
        current: n,
        fallback: a,
        messages: l
      })
    };
  };
}
function Mg(e) {
  const t = J((e == null ? void 0 : e.locale) ?? "en"), n = J((e == null ? void 0 : e.fallback) ?? "en"), a = Y({
    en: Dg,
    ...e == null ? void 0 : e.messages
  });
  return {
    name: "vuetify",
    current: t,
    fallback: n,
    messages: a,
    t: bu(t, n, a),
    n: pu(t, n),
    provide: _u({
      current: t,
      fallback: n,
      messages: a
    })
  };
}
const Su = Symbol.for("vuetify:locale");
function Bg(e) {
  return e.name != null;
}
function IS(e) {
  const t = e != null && e.adapter && Bg(e == null ? void 0 : e.adapter) ? e == null ? void 0 : e.adapter : Mg(e), n = Wg(t, e);
  return {
    ...t,
    ...n
  };
}
function Et() {
  const e = ye(Su);
  if (!e) throw new Error("[Vuetify] Could not find injected locale instance");
  return e;
}
function Hg() {
  return {
    af: !1,
    ar: !0,
    bg: !1,
    ca: !1,
    ckb: !1,
    cs: !1,
    de: !1,
    el: !1,
    en: !1,
    es: !1,
    et: !1,
    fa: !0,
    fi: !1,
    fr: !1,
    hr: !1,
    hu: !1,
    he: !0,
    id: !1,
    it: !1,
    ja: !1,
    km: !1,
    ko: !1,
    lv: !1,
    lt: !1,
    nl: !1,
    no: !1,
    pl: !1,
    pt: !1,
    ro: !1,
    ru: !1,
    sk: !1,
    sl: !1,
    srCyrl: !1,
    srLatn: !1,
    sv: !1,
    th: !1,
    tr: !1,
    az: !1,
    uk: !1,
    vi: !1,
    zhHans: !1,
    zhHant: !1
  };
}
function Wg(e, t) {
  const n = Y((t == null ? void 0 : t.rtl) ?? Hg()), a = _(() => n.value[e.current.value] ?? !1);
  return {
    isRtl: a,
    rtl: n,
    rtlClasses: _(() => `v-locale--is-${a.value ? "rtl" : "ltr"}`)
  };
}
function ot() {
  const e = ye(Su);
  if (!e) throw new Error("[Vuetify] Could not find injected rtl instance");
  return {
    isRtl: e.isRtl,
    rtlClasses: e.rtlClasses
  };
}
const al = ["sm", "md", "lg", "xl", "xxl"], Kg = Symbol.for("vuetify:display"), ks = {
  mobileBreakpoint: "lg",
  thresholds: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
    xxl: 2560
  }
}, jg = function() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ks;
  return lt(ks, e);
};
function Es(e) {
  return ke && !e ? window.innerWidth : typeof e == "object" && e.clientWidth || 0;
}
function xs(e) {
  return ke && !e ? window.innerHeight : typeof e == "object" && e.clientHeight || 0;
}
function Ps(e) {
  const t = ke && !e ? window.navigator.userAgent : "ssr";
  function n(v) {
    return !!t.match(v);
  }
  const a = n(/android/i), l = n(/iphone|ipad|ipod/i), r = n(/cordova/i), i = n(/electron/i), s = n(/chrome/i), o = n(/edge/i), u = n(/firefox/i), c = n(/opera/i), f = n(/win/i), d = n(/mac/i), m = n(/linux/i);
  return {
    android: a,
    ios: l,
    cordova: r,
    electron: i,
    chrome: s,
    edge: o,
    firefox: u,
    opera: c,
    win: f,
    mac: d,
    linux: m,
    touch: Ym,
    ssr: t === "ssr"
  };
}
function kS(e, t) {
  const {
    thresholds: n,
    mobileBreakpoint: a
  } = jg(e), l = J(xs(t)), r = J(Ps(t)), i = Xe({}), s = J(Es(t));
  function o() {
    l.value = xs(), s.value = Es();
  }
  function u() {
    o(), r.value = Ps();
  }
  return rt(() => {
    const c = s.value < n.sm, f = s.value < n.md && !c, d = s.value < n.lg && !(f || c), m = s.value < n.xl && !(d || f || c), v = s.value < n.xxl && !(m || d || f || c), g = s.value >= n.xxl, b = c ? "xs" : f ? "sm" : d ? "md" : m ? "lg" : v ? "xl" : "xxl", y = typeof a == "number" ? a : n[a], p = s.value < y;
    i.xs = c, i.sm = f, i.md = d, i.lg = m, i.xl = v, i.xxl = g, i.smAndUp = !c, i.mdAndUp = !(c || f), i.lgAndUp = !(c || f || d), i.xlAndUp = !(c || f || d || m), i.smAndDown = !(d || m || v || g), i.mdAndDown = !(m || v || g), i.lgAndDown = !(v || g), i.xlAndDown = !g, i.name = b, i.height = l.value, i.width = s.value, i.mobile = p, i.mobileBreakpoint = a, i.platform = r.value, i.thresholds = n;
  }), ke && window.addEventListener("resize", o, {
    passive: !0
  }), {
    ...On(i),
    update: u,
    ssr: !!t
  };
}
const sa = D({
  mobile: {
    type: Boolean,
    default: !1
  },
  mobileBreakpoint: [Number, String]
}, "display");
function nn() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vt();
  const n = ye(Kg);
  if (!n) throw new Error("Could not find Vuetify display injection");
  const a = _(() => {
    if (e.mobile != null) return e.mobile;
    if (!e.mobileBreakpoint) return n.mobile.value;
    const r = typeof e.mobileBreakpoint == "number" ? e.mobileBreakpoint : n.thresholds.value[e.mobileBreakpoint];
    return n.width.value < r;
  }), l = _(() => t ? {
    [`${t}--mobile`]: a.value
  } : {});
  return {
    ...n,
    displayClasses: l,
    mobile: a
  };
}
const Ug = Symbol.for("vuetify:goto");
function wu() {
  return {
    container: void 0,
    duration: 300,
    layout: !1,
    offset: 0,
    easing: "easeInOutCubic",
    patterns: {
      linear: (e) => e,
      easeInQuad: (e) => e ** 2,
      easeOutQuad: (e) => e * (2 - e),
      easeInOutQuad: (e) => e < 0.5 ? 2 * e ** 2 : -1 + (4 - 2 * e) * e,
      easeInCubic: (e) => e ** 3,
      easeOutCubic: (e) => --e ** 3 + 1,
      easeInOutCubic: (e) => e < 0.5 ? 4 * e ** 3 : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1,
      easeInQuart: (e) => e ** 4,
      easeOutQuart: (e) => 1 - --e ** 4,
      easeInOutQuart: (e) => e < 0.5 ? 8 * e ** 4 : 1 - 8 * --e ** 4,
      easeInQuint: (e) => e ** 5,
      easeOutQuint: (e) => 1 + --e ** 5,
      easeInOutQuint: (e) => e < 0.5 ? 16 * e ** 5 : 1 + 16 * --e ** 5
    }
  };
}
function zg(e) {
  return zr(e) ?? (document.scrollingElement || document.body);
}
function zr(e) {
  return typeof e == "string" ? document.querySelector(e) : Zo(e);
}
function Ml(e, t, n) {
  if (typeof e == "number") return t && n ? -e : e;
  let a = zr(e), l = 0;
  for (; a; )
    l += t ? a.offsetLeft : a.offsetTop, a = a.offsetParent;
  return l;
}
function ES(e, t) {
  return {
    rtl: t.isRtl,
    options: lt(wu(), e)
  };
}
async function $s(e, t, n, a) {
  const l = n ? "scrollLeft" : "scrollTop", r = lt((a == null ? void 0 : a.options) ?? wu(), t), i = a == null ? void 0 : a.rtl.value, s = (typeof e == "number" ? e : zr(e)) ?? 0, o = r.container === "parent" && s instanceof HTMLElement ? s.parentElement : zg(r.container), u = typeof r.easing == "function" ? r.easing : r.patterns[r.easing];
  if (!u) throw new TypeError(`Easing function "${r.easing}" not found.`);
  let c;
  if (typeof s == "number")
    c = Ml(s, n, i);
  else if (c = Ml(s, n, i) - Ml(o, n, i), r.layout) {
    const v = window.getComputedStyle(s).getPropertyValue("--v-layout-top");
    v && (c -= parseInt(v, 10));
  }
  c += r.offset, c = Yg(o, c, !!i, !!n);
  const f = o[l] ?? 0;
  if (c === f) return Promise.resolve(c);
  const d = performance.now();
  return new Promise((m) => requestAnimationFrame(function v(g) {
    const y = (g - d) / r.duration, p = Math.floor(f + (c - f) * u(ft(y, 0, 1)));
    if (o[l] = p, y >= 1 && Math.abs(p - o[l]) < 10)
      return m(c);
    if (y > 2)
      return Ut("Scroll target is not reachable"), m(o[l]);
    requestAnimationFrame(v);
  }));
}
function Gg() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const t = ye(Ug), {
    isRtl: n
  } = ot();
  if (!t) throw new Error("[Vuetify] Could not find injected goto instance");
  const a = {
    ...t,
    // can be set via VLocaleProvider
    rtl: _(() => t.rtl.value || n.value)
  };
  async function l(r, i) {
    return $s(r, lt(e, i), !1, a);
  }
  return l.horizontal = async (r, i) => $s(r, lt(e, i), !0, a), l;
}
function Yg(e, t, n, a) {
  const {
    scrollWidth: l,
    scrollHeight: r
  } = e, [i, s] = e === document.scrollingElement ? [window.innerWidth, window.innerHeight] : [e.offsetWidth, e.offsetHeight];
  let o, u;
  return a ? n ? (o = -(l - i), u = 0) : (o = 0, u = l - i) : (o = 0, u = r + -s), Math.max(Math.min(t, u), o);
}
const qg = {
  collapse: "mdi-chevron-up",
  complete: "mdi-check",
  cancel: "mdi-close-circle",
  close: "mdi-close",
  delete: "mdi-close-circle",
  // delete (e.g. v-chip close)
  clear: "mdi-close-circle",
  success: "mdi-check-circle",
  info: "mdi-information",
  warning: "mdi-alert-circle",
  error: "mdi-close-circle",
  prev: "mdi-chevron-left",
  next: "mdi-chevron-right",
  checkboxOn: "mdi-checkbox-marked",
  checkboxOff: "mdi-checkbox-blank-outline",
  checkboxIndeterminate: "mdi-minus-box",
  delimiter: "mdi-circle",
  // for carousel
  sortAsc: "mdi-arrow-up",
  sortDesc: "mdi-arrow-down",
  expand: "mdi-chevron-down",
  menu: "mdi-menu",
  subgroup: "mdi-menu-down",
  dropdown: "mdi-menu-down",
  radioOn: "mdi-radiobox-marked",
  radioOff: "mdi-radiobox-blank",
  edit: "mdi-pencil",
  ratingEmpty: "mdi-star-outline",
  ratingFull: "mdi-star",
  ratingHalf: "mdi-star-half-full",
  loading: "mdi-cached",
  first: "mdi-page-first",
  last: "mdi-page-last",
  unfold: "mdi-unfold-more-horizontal",
  file: "mdi-paperclip",
  plus: "mdi-plus",
  minus: "mdi-minus",
  calendar: "mdi-calendar",
  treeviewCollapse: "mdi-menu-down",
  treeviewExpand: "mdi-menu-right",
  eyeDropper: "mdi-eyedropper"
}, Xg = {
  // Not using mergeProps here, functional components merge props by default (?)
  component: (e) => zt(Iu, {
    ...e,
    class: "mdi"
  })
}, oe = [String, Function, Object, Array], Qg = Symbol.for("vuetify:icons"), ll = D({
  icon: {
    type: oe
  },
  // Could not remove this and use makeTagProps, types complained because it is not required
  tag: {
    type: String,
    required: !0
  }
}, "icon"), Ts = U()({
  name: "VComponentIcon",
  props: ll(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return () => {
      const a = e.icon;
      return h(e.tag, null, {
        default: () => {
          var l;
          return [e.icon ? h(a, null, null) : (l = n.default) == null ? void 0 : l.call(n)];
        }
      });
    };
  }
}), Cu = ia({
  name: "VSvgIcon",
  inheritAttrs: !1,
  props: ll(),
  setup(e, t) {
    let {
      attrs: n
    } = t;
    return () => h(e.tag, q(n, {
      style: null
    }), {
      default: () => [h("svg", {
        class: "v-icon__svg",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-hidden": "true"
      }, [Array.isArray(e.icon) ? e.icon.map((a) => Array.isArray(a) ? h("path", {
        d: a[0],
        "fill-opacity": a[1]
      }, null) : h("path", {
        d: a
      }, null)) : h("path", {
        d: e.icon
      }, null)])]
    });
  }
});
ia({
  name: "VLigatureIcon",
  props: ll(),
  setup(e) {
    return () => h(e.tag, null, {
      default: () => [e.icon]
    });
  }
});
const Iu = ia({
  name: "VClassIcon",
  props: ll(),
  setup(e) {
    return () => h(e.tag, {
      class: e.icon
    }, null);
  }
});
function Jg() {
  return {
    svg: {
      component: Cu
    },
    class: {
      component: Iu
    }
  };
}
function xS(e) {
  const t = Jg(), n = (e == null ? void 0 : e.defaultSet) ?? "mdi";
  return n === "mdi" && !t.mdi && (t.mdi = Xg), lt({
    defaultSet: n,
    sets: t,
    aliases: {
      ...qg,
      /* eslint-disable max-len */
      vuetify: ["M8.2241 14.2009L12 21L22 3H14.4459L8.2241 14.2009Z", ["M7.26303 12.4733L7.00113 12L2 3H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26303 12.4733Z", 0.6]],
      "vuetify-outline": "svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z",
      "vuetify-play": ["m6.376 13.184-4.11-7.192C1.505 4.66 2.467 3 4.003 3h8.532l-.953 1.576-.006.01-.396.677c-.429.732-.214 1.507.194 2.015.404.503 1.092.878 1.869.806a3.72 3.72 0 0 1 1.005.022c.276.053.434.143.523.237.138.146.38.635-.25 2.09-.893 1.63-1.553 1.722-1.847 1.677-.213-.033-.468-.158-.756-.406a4.95 4.95 0 0 1-.8-.927c-.39-.564-1.04-.84-1.66-.846-.625-.006-1.316.27-1.693.921l-.478.826-.911 1.506Z", ["M9.093 11.552c.046-.079.144-.15.32-.148a.53.53 0 0 1 .43.207c.285.414.636.847 1.046 1.2.405.35.914.662 1.516.754 1.334.205 2.502-.698 3.48-2.495l.014-.028.013-.03c.687-1.574.774-2.852-.005-3.675-.37-.391-.861-.586-1.333-.676a5.243 5.243 0 0 0-1.447-.044c-.173.016-.393-.073-.54-.257-.145-.18-.127-.316-.082-.392l.393-.672L14.287 3h5.71c1.536 0 2.499 1.659 1.737 2.992l-7.997 13.996c-.768 1.344-2.706 1.344-3.473 0l-3.037-5.314 1.377-2.278.004-.006.004-.007.481-.831Z", 0.6]]
      /* eslint-enable max-len */
    }
  }, e);
}
const Zg = (e) => {
  const t = ye(Qg);
  if (!t) throw new Error("Missing Vuetify Icons provide!");
  return {
    iconData: _(() => {
      var o;
      const a = De(e);
      if (!a) return {
        component: Ts
      };
      let l = a;
      if (typeof l == "string" && (l = l.trim(), l.startsWith("$") && (l = (o = t.aliases) == null ? void 0 : o[l.slice(1)])), l || Ut(`Could not find aliased icon "${a}"`), Array.isArray(l))
        return {
          component: Cu,
          icon: l
        };
      if (typeof l != "string")
        return {
          component: Ts,
          icon: l
        };
      const r = Object.keys(t.sets).find((u) => typeof l == "string" && l.startsWith(`${u}:`)), i = r ? l.slice(r.length + 1) : l;
      return {
        component: t.sets[r ?? t.defaultSet].component,
        icon: i
      };
    })
  };
}, As = Symbol.for("vuetify:theme"), xe = D({
  theme: String
}, "theme");
function Os() {
  return {
    defaultTheme: "light",
    variations: {
      colors: [],
      lighten: 0,
      darken: 0
    },
    themes: {
      light: {
        dark: !1,
        colors: {
          background: "#FFFFFF",
          surface: "#FFFFFF",
          "surface-bright": "#FFFFFF",
          "surface-light": "#EEEEEE",
          "surface-variant": "#424242",
          "on-surface-variant": "#EEEEEE",
          primary: "#1867C0",
          "primary-darken-1": "#1F5592",
          secondary: "#48A9A6",
          "secondary-darken-1": "#018786",
          error: "#B00020",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00"
        },
        variables: {
          "border-color": "#000000",
          "border-opacity": 0.12,
          "high-emphasis-opacity": 0.87,
          "medium-emphasis-opacity": 0.6,
          "disabled-opacity": 0.38,
          "idle-opacity": 0.04,
          "hover-opacity": 0.04,
          "focus-opacity": 0.12,
          "selected-opacity": 0.08,
          "activated-opacity": 0.12,
          "pressed-opacity": 0.12,
          "dragged-opacity": 0.08,
          "theme-kbd": "#212529",
          "theme-on-kbd": "#FFFFFF",
          "theme-code": "#F5F5F5",
          "theme-on-code": "#000000"
        }
      },
      dark: {
        dark: !0,
        colors: {
          background: "#121212",
          surface: "#212121",
          "surface-bright": "#ccbfd6",
          "surface-light": "#424242",
          "surface-variant": "#a3a3a3",
          "on-surface-variant": "#424242",
          primary: "#2196F3",
          "primary-darken-1": "#277CC1",
          secondary: "#54B6B2",
          "secondary-darken-1": "#48A9A6",
          error: "#CF6679",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00"
        },
        variables: {
          "border-color": "#FFFFFF",
          "border-opacity": 0.12,
          "high-emphasis-opacity": 1,
          "medium-emphasis-opacity": 0.7,
          "disabled-opacity": 0.5,
          "idle-opacity": 0.1,
          "hover-opacity": 0.04,
          "focus-opacity": 0.12,
          "selected-opacity": 0.08,
          "activated-opacity": 0.12,
          "pressed-opacity": 0.16,
          "dragged-opacity": 0.08,
          "theme-kbd": "#212529",
          "theme-on-kbd": "#FFFFFF",
          "theme-code": "#343434",
          "theme-on-code": "#CCCCCC"
        }
      }
    }
  };
}
function ey() {
  var a, l;
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Os();
  const t = Os();
  if (!e) return {
    ...t,
    isDisabled: !0
  };
  const n = {};
  for (const [r, i] of Object.entries(e.themes ?? {})) {
    const s = i.dark || r === "dark" ? (a = t.themes) == null ? void 0 : a.dark : (l = t.themes) == null ? void 0 : l.light;
    n[r] = lt(s, i);
  }
  return lt(t, {
    ...e,
    themes: n
  });
}
function PS(e) {
  const t = ey(e), n = Y(t.defaultTheme), a = Y(t.themes), l = _(() => {
    const c = {};
    for (const [f, d] of Object.entries(a.value)) {
      const m = c[f] = {
        ...d,
        colors: {
          ...d.colors
        }
      };
      if (t.variations)
        for (const v of t.variations.colors) {
          const g = m.colors[v];
          if (g)
            for (const b of ["lighten", "darken"]) {
              const y = b === "lighten" ? xg : Pg;
              for (const p of Wn(t.variations[b], 1))
                m.colors[`${v}-${b}-${p}`] = Ig(y(Ot(g), p));
            }
        }
      for (const v of Object.keys(m.colors)) {
        if (/^on-[a-z]/.test(v) || m.colors[`on-${v}`]) continue;
        const g = `on-${v}`, b = Ot(m.colors[v]);
        m.colors[g] = hu(b);
      }
    }
    return c;
  }), r = _(() => l.value[n.value]), i = _(() => {
    var v;
    const c = [];
    (v = r.value) != null && v.dark && sn(c, ":root", ["color-scheme: dark"]), sn(c, ":root", Ls(r.value));
    for (const [g, b] of Object.entries(l.value))
      sn(c, `.v-theme--${g}`, [`color-scheme: ${b.dark ? "dark" : "normal"}`, ...Ls(b)]);
    const f = [], d = [], m = new Set(Object.values(l.value).flatMap((g) => Object.keys(g.colors)));
    for (const g of m)
      /^on-[a-z]/.test(g) ? sn(d, `.${g}`, [`color: rgb(var(--v-theme-${g})) !important`]) : (sn(f, `.bg-${g}`, [`--v-theme-overlay-multiplier: var(--v-theme-${g}-overlay-multiplier)`, `background-color: rgb(var(--v-theme-${g})) !important`, `color: rgb(var(--v-theme-on-${g})) !important`]), sn(d, `.text-${g}`, [`color: rgb(var(--v-theme-${g})) !important`]), sn(d, `.border-${g}`, [`--v-border-color: var(--v-theme-${g})`]));
    return c.push(...f, ...d), c.map((g, b) => b === 0 ? g : `    ${g}`).join("");
  });
  function s() {
    return {
      style: [{
        children: i.value,
        id: "vuetify-theme-stylesheet",
        nonce: t.cspNonce || !1
      }]
    };
  }
  function o(c) {
    if (t.isDisabled) return;
    const f = c._context.provides.usehead;
    if (f)
      if (f.push) {
        const d = f.push(s);
        ke && ne(i, () => {
          d.patch(s);
        });
      } else
        ke ? (f.addHeadObjs(_(s)), rt(() => f.updateDOM())) : f.addHeadObjs(s());
    else {
      let m = function() {
        if (typeof document < "u" && !d) {
          const v = document.createElement("style");
          v.type = "text/css", v.id = "vuetify-theme-stylesheet", t.cspNonce && v.setAttribute("nonce", t.cspNonce), d = v, document.head.appendChild(d);
        }
        d && (d.innerHTML = i.value);
      }, d = ke ? document.getElementById("vuetify-theme-stylesheet") : null;
      ke ? ne(i, m, {
        immediate: !0
      }) : m();
    }
  }
  const u = _(() => t.isDisabled ? void 0 : `v-theme--${n.value}`);
  return {
    install: o,
    isDisabled: t.isDisabled,
    name: n,
    themes: a,
    current: r,
    computedThemes: l,
    themeClasses: u,
    styles: i,
    global: {
      name: n,
      current: r
    }
  };
}
function $e(e) {
  Ae("provideTheme");
  const t = ye(As, null);
  if (!t) throw new Error("Could not find Vuetify theme injection");
  const n = _(() => e.theme ?? t.name.value), a = _(() => t.themes.value[n.value]), l = _(() => t.isDisabled ? void 0 : `v-theme--${n.value}`), r = {
    ...t,
    name: n,
    current: a,
    themeClasses: l
  };
  return Ee(As, r), r;
}
function sn(e, t, n) {
  e.push(`${t} {
`, ...n.map((a) => `  ${a};
`), `}
`);
}
function Ls(e) {
  const t = e.dark ? 2 : 1, n = e.dark ? 1 : 2, a = [];
  for (const [l, r] of Object.entries(e.colors)) {
    const i = Ot(r);
    a.push(`--v-theme-${l}: ${i.r},${i.g},${i.b}`), l.startsWith("on-") || a.push(`--v-theme-${l}-overlay-multiplier: ${$g(r) > 0.18 ? t : n}`);
  }
  for (const [l, r] of Object.entries(e.variables)) {
    const i = typeof r == "string" && r.startsWith("#") ? Ot(r) : void 0, s = i ? `${i.r}, ${i.g}, ${i.b}` : void 0;
    a.push(`--v-${l}: ${s ?? r}`);
  }
  return a;
}
function vn(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "content";
  const n = dr(), a = Y();
  if (ke) {
    const l = new ResizeObserver((r) => {
      e == null || e(r, l), r.length && (t === "content" ? a.value = r[0].contentRect : a.value = r[0].target.getBoundingClientRect());
    });
    st(() => {
      l.disconnect();
    }), ne(() => n.el, (r, i) => {
      i && (l.unobserve(i), a.value = void 0), r && l.observe(r);
    }, {
      flush: "post"
    });
  }
  return {
    resizeRef: n,
    contentRect: Er(a)
  };
}
const Fa = Symbol.for("vuetify:layout"), ku = Symbol.for("vuetify:layout-item"), Vs = 1e3, ty = D({
  overlaps: {
    type: Array,
    default: () => []
  },
  fullHeight: Boolean
}, "layout"), Eu = D({
  name: {
    type: String
  },
  order: {
    type: [Number, String],
    default: 0
  },
  absolute: Boolean
}, "layout-item");
function ny() {
  const e = ye(Fa);
  if (!e) throw new Error("[Vuetify] Could not find injected layout");
  return {
    getLayoutItem: e.getLayoutItem,
    mainRect: e.mainRect,
    mainStyles: e.mainStyles
  };
}
function xu(e) {
  const t = ye(Fa);
  if (!t) throw new Error("[Vuetify] Could not find injected layout");
  const n = e.id ?? `layout-item-${Nt()}`, a = Ae("useLayoutItem");
  Ee(ku, {
    id: n
  });
  const l = J(!1);
  yo(() => l.value = !0), zd(() => l.value = !1);
  const {
    layoutItemStyles: r,
    layoutItemScrimStyles: i
  } = t.register(a, {
    ...e,
    active: _(() => l.value ? !1 : e.active.value),
    id: n
  });
  return st(() => t.unregister(n)), {
    layoutItemStyles: r,
    layoutRect: t.layoutRect,
    layoutItemScrimStyles: i
  };
}
const ay = (e, t, n, a) => {
  let l = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };
  const r = [{
    id: "",
    layer: {
      ...l
    }
  }];
  for (const i of e) {
    const s = t.get(i), o = n.get(i), u = a.get(i);
    if (!s || !o || !u) continue;
    const c = {
      ...l,
      [s.value]: parseInt(l[s.value], 10) + (u.value ? parseInt(o.value, 10) : 0)
    };
    r.push({
      id: i,
      layer: c
    }), l = c;
  }
  return r;
};
function ly(e) {
  const t = ye(Fa, null), n = _(() => t ? t.rootZIndex.value - 100 : Vs), a = Y([]), l = Xe(/* @__PURE__ */ new Map()), r = Xe(/* @__PURE__ */ new Map()), i = Xe(/* @__PURE__ */ new Map()), s = Xe(/* @__PURE__ */ new Map()), o = Xe(/* @__PURE__ */ new Map()), {
    resizeRef: u,
    contentRect: c
  } = vn(), f = _(() => {
    const k = /* @__PURE__ */ new Map(), C = e.overlaps ?? [];
    for (const S of C.filter((E) => E.includes(":"))) {
      const [E, A] = S.split(":");
      if (!a.value.includes(E) || !a.value.includes(A)) continue;
      const O = l.get(E), T = l.get(A), L = r.get(E), M = r.get(A);
      !O || !T || !L || !M || (k.set(A, {
        position: O.value,
        amount: parseInt(L.value, 10)
      }), k.set(E, {
        position: T.value,
        amount: -parseInt(M.value, 10)
      }));
    }
    return k;
  }), d = _(() => {
    const k = [...new Set([...i.values()].map((S) => S.value))].sort((S, E) => S - E), C = [];
    for (const S of k) {
      const E = a.value.filter((A) => {
        var O;
        return ((O = i.get(A)) == null ? void 0 : O.value) === S;
      });
      C.push(...E);
    }
    return ay(C, l, r, s);
  }), m = _(() => !Array.from(o.values()).some((k) => k.value)), v = _(() => d.value[d.value.length - 1].layer), g = _(() => ({
    "--v-layout-left": ee(v.value.left),
    "--v-layout-right": ee(v.value.right),
    "--v-layout-top": ee(v.value.top),
    "--v-layout-bottom": ee(v.value.bottom),
    ...m.value ? void 0 : {
      transition: "none"
    }
  })), b = _(() => d.value.slice(1).map((k, C) => {
    let {
      id: S
    } = k;
    const {
      layer: E
    } = d.value[C], A = r.get(S), O = l.get(S);
    return {
      id: S,
      ...E,
      size: Number(A.value),
      position: O.value
    };
  })), y = (k) => b.value.find((C) => C.id === k), p = Ae("createLayout"), x = J(!1);
  Lt(() => {
    x.value = !0;
  }), Ee(Fa, {
    register: (k, C) => {
      let {
        id: S,
        order: E,
        position: A,
        layoutSize: O,
        elementSize: T,
        active: L,
        disableTransitions: M,
        absolute: j
      } = C;
      i.set(S, E), l.set(S, A), r.set(S, O), s.set(S, L), M && o.set(S, M);
      const Q = kn(ku, p == null ? void 0 : p.vnode).indexOf(k);
      Q > -1 ? a.value.splice(Q, 0, S) : a.value.push(S);
      const le = _(() => b.value.findIndex((H) => H.id === S)), V = _(() => n.value + d.value.length * 2 - le.value * 2), R = _(() => {
        const H = A.value === "left" || A.value === "right", ie = A.value === "right", te = A.value === "bottom", ue = T.value ?? O.value, X = ue === 0 ? "%" : "px", se = {
          [A.value]: 0,
          zIndex: V.value,
          transform: `translate${H ? "X" : "Y"}(${(L.value ? 0 : -(ue === 0 ? 100 : ue)) * (ie || te ? -1 : 1)}${X})`,
          position: j.value || n.value !== Vs ? "absolute" : "fixed",
          ...m.value ? void 0 : {
            transition: "none"
          }
        };
        if (!x.value) return se;
        const ce = b.value[le.value];
        if (!ce) throw new Error(`[Vuetify] Could not find layout item "${S}"`);
        const Oe = f.value.get(S);
        return Oe && (ce[Oe.position] += Oe.amount), {
          ...se,
          height: H ? `calc(100% - ${ce.top}px - ${ce.bottom}px)` : T.value ? `${T.value}px` : void 0,
          left: ie ? void 0 : `${ce.left}px`,
          right: ie ? `${ce.right}px` : void 0,
          top: A.value !== "bottom" ? `${ce.top}px` : void 0,
          bottom: A.value !== "top" ? `${ce.bottom}px` : void 0,
          width: H ? T.value ? `${T.value}px` : void 0 : `calc(100% - ${ce.left}px - ${ce.right}px)`
        };
      }), F = _(() => ({
        zIndex: V.value - 1
      }));
      return {
        layoutItemStyles: R,
        layoutItemScrimStyles: F,
        zIndex: V
      };
    },
    unregister: (k) => {
      i.delete(k), l.delete(k), r.delete(k), s.delete(k), o.delete(k), a.value = a.value.filter((C) => C !== k);
    },
    mainRect: v,
    mainStyles: g,
    getLayoutItem: y,
    items: b,
    layoutRect: c,
    rootZIndex: n
  });
  const w = _(() => ["v-layout", {
    "v-layout--full-height": e.fullHeight
  }]), I = _(() => ({
    zIndex: t ? n.value : void 0,
    position: t ? "relative" : void 0,
    overflow: t ? "hidden" : void 0
  }));
  return {
    layoutClasses: w,
    layoutStyles: I,
    getLayoutItem: y,
    items: b,
    layoutRect: c,
    layoutRef: u
  };
}
const ry = D({
  ...re(),
  ...ty({
    fullHeight: !0
  }),
  ...xe()
}, "VApp"), iy = U()({
  name: "VApp",
  props: ry(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = $e(e), {
      layoutClasses: l,
      getLayoutItem: r,
      items: i,
      layoutRef: s
    } = ly(e), {
      rtlClasses: o
    } = ot();
    return Z(() => {
      var u;
      return h("div", {
        ref: s,
        class: ["v-application", a.themeClasses.value, l.value, o.value, e.class],
        style: [e.style]
      }, [h("div", {
        class: "v-application__wrap"
      }, [(u = n.default) == null ? void 0 : u.call(n)])]);
    }), {
      getLayoutItem: r,
      items: i,
      theme: a
    };
  }
}), pe = D({
  tag: {
    type: String,
    default: "div"
  }
}, "tag"), Pu = D({
  text: String,
  ...re(),
  ...pe()
}, "VToolbarTitle"), $u = U()({
  name: "VToolbarTitle",
  props: Pu(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return Z(() => {
      const a = !!(n.default || n.text || e.text);
      return h(e.tag, {
        class: ["v-toolbar-title", e.class],
        style: e.style
      }, {
        default: () => {
          var l;
          return [a && h("div", {
            class: "v-toolbar-title__placeholder"
          }, [n.text ? n.text() : e.text, (l = n.default) == null ? void 0 : l.call(n)])];
        }
      });
    }), {};
  }
}), sy = D({
  disabled: Boolean,
  group: Boolean,
  hideOnLeave: Boolean,
  leaveAbsolute: Boolean,
  mode: String,
  origin: String
}, "transition");
function ht(e, t, n) {
  return U()({
    name: e,
    props: sy({
      mode: n,
      origin: t
    }),
    setup(a, l) {
      let {
        slots: r
      } = l;
      const i = {
        onBeforeEnter(s) {
          a.origin && (s.style.transformOrigin = a.origin);
        },
        onLeave(s) {
          if (a.leaveAbsolute) {
            const {
              offsetTop: o,
              offsetLeft: u,
              offsetWidth: c,
              offsetHeight: f
            } = s;
            s._transitionInitialStyles = {
              position: s.style.position,
              top: s.style.top,
              left: s.style.left,
              width: s.style.width,
              height: s.style.height
            }, s.style.position = "absolute", s.style.top = `${o}px`, s.style.left = `${u}px`, s.style.width = `${c}px`, s.style.height = `${f}px`;
          }
          a.hideOnLeave && s.style.setProperty("display", "none", "important");
        },
        onAfterLeave(s) {
          if (a.leaveAbsolute && (s != null && s._transitionInitialStyles)) {
            const {
              position: o,
              top: u,
              left: c,
              width: f,
              height: d
            } = s._transitionInitialStyles;
            delete s._transitionInitialStyles, s.style.position = o || "", s.style.top = u || "", s.style.left = c || "", s.style.width = f || "", s.style.height = d || "";
          }
        }
      };
      return () => {
        const s = a.group ? xr : Xt;
        return zt(s, {
          name: a.disabled ? "" : e,
          css: !a.disabled,
          ...a.group ? void 0 : {
            mode: a.mode
          },
          ...a.disabled ? {} : i
        }, r.default);
      };
    }
  });
}
function Tu(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "in-out";
  return U()({
    name: e,
    props: {
      mode: {
        type: String,
        default: n
      },
      disabled: Boolean,
      group: Boolean
    },
    setup(a, l) {
      let {
        slots: r
      } = l;
      const i = a.group ? xr : Xt;
      return () => zt(i, {
        name: a.disabled ? "" : e,
        css: !a.disabled,
        // mode: props.mode, // TODO: vuejs/vue-next#3104
        ...a.disabled ? {} : t
      }, r.default);
    }
  });
}
function Au() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  const n = (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1) ? "width" : "height", a = go(`offset-${n}`);
  return {
    onBeforeEnter(i) {
      i._parent = i.parentNode, i._initialStyle = {
        transition: i.style.transition,
        overflow: i.style.overflow,
        [n]: i.style[n]
      };
    },
    onEnter(i) {
      const s = i._initialStyle;
      i.style.setProperty("transition", "none", "important"), i.style.overflow = "hidden";
      const o = `${i[a]}px`;
      i.style[n] = "0", i.offsetHeight, i.style.transition = s.transition, e && i._parent && i._parent.classList.add(e), requestAnimationFrame(() => {
        i.style[n] = o;
      });
    },
    onAfterEnter: r,
    onEnterCancelled: r,
    onLeave(i) {
      i._initialStyle = {
        transition: "",
        overflow: i.style.overflow,
        [n]: i.style[n]
      }, i.style.overflow = "hidden", i.style[n] = `${i[a]}px`, i.offsetHeight, requestAnimationFrame(() => i.style[n] = "0");
    },
    onAfterLeave: l,
    onLeaveCancelled: l
  };
  function l(i) {
    e && i._parent && i._parent.classList.remove(e), r(i);
  }
  function r(i) {
    const s = i._initialStyle[n];
    i.style.overflow = i._initialStyle.overflow, s != null && (i.style[n] = s), delete i._initialStyle;
  }
}
const oy = D({
  target: [Object, Array]
}, "v-dialog-transition"), Ou = U()({
  name: "VDialogTransition",
  props: oy(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = {
      onBeforeEnter(l) {
        l.style.pointerEvents = "none", l.style.visibility = "hidden";
      },
      async onEnter(l, r) {
        var d;
        await new Promise((m) => requestAnimationFrame(m)), await new Promise((m) => requestAnimationFrame(m)), l.style.visibility = "";
        const {
          x: i,
          y: s,
          sx: o,
          sy: u,
          speed: c
        } = Rs(e.target, l), f = un(l, [{
          transform: `translate(${i}px, ${s}px) scale(${o}, ${u})`,
          opacity: 0
        }, {}], {
          duration: 225 * c,
          easing: Vg
        });
        (d = Ns(l)) == null || d.forEach((m) => {
          un(m, [{
            opacity: 0
          }, {
            opacity: 0,
            offset: 0.33
          }, {}], {
            duration: 225 * 2 * c,
            easing: Jn
          });
        }), f.finished.then(() => r());
      },
      onAfterEnter(l) {
        l.style.removeProperty("pointer-events");
      },
      onBeforeLeave(l) {
        l.style.pointerEvents = "none";
      },
      async onLeave(l, r) {
        var d;
        await new Promise((m) => requestAnimationFrame(m));
        const {
          x: i,
          y: s,
          sx: o,
          sy: u,
          speed: c
        } = Rs(e.target, l);
        un(l, [{}, {
          transform: `translate(${i}px, ${s}px) scale(${o}, ${u})`,
          opacity: 0
        }], {
          duration: 125 * c,
          easing: Ng
        }).finished.then(() => r()), (d = Ns(l)) == null || d.forEach((m) => {
          un(m, [{}, {
            opacity: 0,
            offset: 0.2
          }, {
            opacity: 0
          }], {
            duration: 125 * 2 * c,
            easing: Jn
          });
        });
      },
      onAfterLeave(l) {
        l.style.removeProperty("pointer-events");
      }
    };
    return () => e.target ? h(Xt, q({
      name: "dialog-transition"
    }, a, {
      css: !1
    }), n) : h(Xt, {
      name: "dialog-transition"
    }, n);
  }
});
function Ns(e) {
  var n;
  const t = (n = e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")) == null ? void 0 : n.children;
  return t && [...t];
}
function Rs(e, t) {
  const n = uu(e), a = Wr(t), [l, r] = getComputedStyle(t).transformOrigin.split(" ").map((y) => parseFloat(y)), [i, s] = getComputedStyle(t).getPropertyValue("--v-overlay-anchor-origin").split(" ");
  let o = n.left + n.width / 2;
  i === "left" || s === "left" ? o -= n.width / 2 : (i === "right" || s === "right") && (o += n.width / 2);
  let u = n.top + n.height / 2;
  i === "top" || s === "top" ? u -= n.height / 2 : (i === "bottom" || s === "bottom") && (u += n.height / 2);
  const c = n.width / a.width, f = n.height / a.height, d = Math.max(1, c, f), m = c / d || 0, v = f / d || 0, g = a.width * a.height / (window.innerWidth * window.innerHeight), b = g > 0.12 ? Math.min(1.5, (g - 0.12) * 10 + 1) : 1;
  return {
    x: o - (l + a.left),
    y: u - (r + a.top),
    sx: m,
    sy: v,
    speed: b
  };
}
ht("fab-transition", "center center", "out-in");
ht("dialog-bottom-transition");
ht("dialog-top-transition");
const Fs = ht("fade-transition");
ht("scale-transition");
ht("scroll-x-transition");
ht("scroll-x-reverse-transition");
ht("scroll-y-transition");
ht("scroll-y-reverse-transition");
ht("slide-x-transition");
ht("slide-x-reverse-transition");
const Lu = ht("slide-y-transition");
ht("slide-y-reverse-transition");
const Vu = Tu("expand-transition", Au()), Nu = Tu("expand-x-transition", Au("", !0)), uy = D({
  defaults: Object,
  disabled: Boolean,
  reset: [Number, String],
  root: [Boolean, String],
  scoped: Boolean
}, "VDefaultsProvider"), Te = U(!1)({
  name: "VDefaultsProvider",
  props: uy(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      defaults: a,
      disabled: l,
      reset: r,
      root: i,
      scoped: s
    } = On(e);
    return vt(a, {
      reset: r,
      root: i,
      scoped: s,
      disabled: l
    }), () => {
      var o;
      return (o = n.default) == null ? void 0 : o.call(n);
    };
  }
}), mt = D({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String]
}, "dimension");
function gt(e) {
  return {
    dimensionStyles: _(() => {
      const n = {}, a = ee(e.height), l = ee(e.maxHeight), r = ee(e.maxWidth), i = ee(e.minHeight), s = ee(e.minWidth), o = ee(e.width);
      return a != null && (n.height = a), l != null && (n.maxHeight = l), r != null && (n.maxWidth = r), i != null && (n.minHeight = i), s != null && (n.minWidth = s), o != null && (n.width = o), n;
    })
  };
}
function cy(e) {
  return {
    aspectStyles: _(() => {
      const t = Number(e.aspectRatio);
      return t ? {
        paddingBottom: String(1 / t * 100) + "%"
      } : void 0;
    })
  };
}
const Ru = D({
  aspectRatio: [String, Number],
  contentClass: null,
  inline: Boolean,
  ...re(),
  ...mt()
}, "VResponsive"), Ds = U()({
  name: "VResponsive",
  props: Ru(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      aspectStyles: a
    } = cy(e), {
      dimensionStyles: l
    } = gt(e);
    return Z(() => {
      var r;
      return h("div", {
        class: ["v-responsive", {
          "v-responsive--inline": e.inline
        }, e.class],
        style: [l.value, e.style]
      }, [h("div", {
        class: "v-responsive__sizer",
        style: a.value
      }, null), (r = n.additional) == null ? void 0 : r.call(n), n.default && h("div", {
        class: ["v-responsive__content", e.contentClass]
      }, [n.default()])]);
    }), {};
  }
});
function Gr(e) {
  return Hr(() => {
    const t = [], n = {};
    if (e.value.background)
      if (hr(e.value.background)) {
        if (n.backgroundColor = e.value.background, !e.value.text && wg(e.value.background)) {
          const a = Ot(e.value.background);
          if (a.a == null || a.a === 1) {
            const l = hu(a);
            n.color = l, n.caretColor = l;
          }
        }
      } else
        t.push(`bg-${e.value.background}`);
    return e.value.text && (hr(e.value.text) ? (n.color = e.value.text, n.caretColor = e.value.text) : t.push(`text-${e.value.text}`)), {
      colorClasses: t,
      colorStyles: n
    };
  });
}
function kt(e, t) {
  const n = _(() => ({
    text: It(e) ? e.value : t ? e[t] : null
  })), {
    colorClasses: a,
    colorStyles: l
  } = Gr(n);
  return {
    textColorClasses: a,
    textColorStyles: l
  };
}
function Qe(e, t) {
  const n = _(() => ({
    background: It(e) ? e.value : t ? e[t] : null
  })), {
    colorClasses: a,
    colorStyles: l
  } = Gr(n);
  return {
    backgroundColorClasses: a,
    backgroundColorStyles: l
  };
}
const et = D({
  rounded: {
    type: [Boolean, Number, String],
    default: void 0
  },
  tile: Boolean
}, "rounded");
function ut(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vt();
  return {
    roundedClasses: _(() => {
      const a = It(e) ? e.value : e.rounded, l = It(e) ? e.value : e.tile, r = [];
      if (a === !0 || a === "")
        r.push(`${t}--rounded`);
      else if (typeof a == "string" || a === 0)
        for (const i of String(a).split(" "))
          r.push(`rounded-${i}`);
      else (l || a === !1) && r.push("rounded-0");
      return r;
    })
  };
}
const oa = D({
  transition: {
    type: [Boolean, String, Object],
    default: "fade-transition",
    validator: (e) => e !== !0
  }
}, "transition"), jt = (e, t) => {
  let {
    slots: n
  } = t;
  const {
    transition: a,
    disabled: l,
    group: r,
    ...i
  } = e, {
    component: s = r ? xr : Xt,
    ...o
  } = typeof a == "object" ? a : {};
  return zt(s, q(typeof a == "string" ? {
    name: l ? "" : a
  } : o, typeof a == "string" ? {} : Object.fromEntries(Object.entries({
    disabled: l,
    group: r
  }).filter((u) => {
    let [c, f] = u;
    return f !== void 0;
  })), i), n);
};
function dy(e, t) {
  if (!Br) return;
  const n = t.modifiers || {}, a = t.value, {
    handler: l,
    options: r
  } = typeof a == "object" ? a : {
    handler: a,
    options: {}
  }, i = new IntersectionObserver(function() {
    var f;
    let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], o = arguments.length > 1 ? arguments[1] : void 0;
    const u = (f = e._observe) == null ? void 0 : f[t.instance.$.uid];
    if (!u) return;
    const c = s.some((d) => d.isIntersecting);
    l && (!n.quiet || u.init) && (!n.once || c || u.init) && l(c, s, o), c && n.once ? Fu(e, t) : u.init = !0;
  }, r);
  e._observe = Object(e._observe), e._observe[t.instance.$.uid] = {
    init: !1,
    observer: i
  }, i.observe(e);
}
function Fu(e, t) {
  var a;
  const n = (a = e._observe) == null ? void 0 : a[t.instance.$.uid];
  n && (n.observer.unobserve(e), delete e._observe[t.instance.$.uid]);
}
const Du = {
  mounted: dy,
  unmounted: Fu
}, fy = D({
  absolute: Boolean,
  alt: String,
  cover: Boolean,
  color: String,
  draggable: {
    type: [Boolean, String],
    default: void 0
  },
  eager: Boolean,
  gradient: String,
  lazySrc: String,
  options: {
    type: Object,
    // For more information on types, navigate to:
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    default: () => ({
      root: void 0,
      rootMargin: void 0,
      threshold: void 0
    })
  },
  sizes: String,
  src: {
    type: [String, Object],
    default: ""
  },
  crossorigin: String,
  referrerpolicy: String,
  srcset: String,
  position: String,
  ...Ru(),
  ...re(),
  ...et(),
  ...oa()
}, "VImg"), rl = U()({
  name: "VImg",
  directives: {
    intersect: Du
  },
  props: fy(),
  emits: {
    loadstart: (e) => !0,
    load: (e) => !0,
    error: (e) => !0
  },
  setup(e, t) {
    let {
      emit: n,
      slots: a
    } = t;
    const {
      backgroundColorClasses: l,
      backgroundColorStyles: r
    } = Qe(K(e, "color")), {
      roundedClasses: i
    } = ut(e), s = Ae("VImg"), o = J(""), u = Y(), c = J(e.eager ? "loading" : "idle"), f = J(), d = J(), m = _(() => e.src && typeof e.src == "object" ? {
      src: e.src.src,
      srcset: e.srcset || e.src.srcset,
      lazySrc: e.lazySrc || e.src.lazySrc,
      aspect: Number(e.aspectRatio || e.src.aspect || 0)
    } : {
      src: e.src,
      srcset: e.srcset,
      lazySrc: e.lazySrc,
      aspect: Number(e.aspectRatio || 0)
    }), v = _(() => m.value.aspect || f.value / d.value || 0);
    ne(() => e.src, () => {
      g(c.value !== "idle");
    }), ne(v, (T, L) => {
      !T && L && u.value && w(u.value);
    }), bo(() => g());
    function g(T) {
      if (!(e.eager && T) && !(Br && !T && !e.eager)) {
        if (c.value = "loading", m.value.lazySrc) {
          const L = new Image();
          L.src = m.value.lazySrc, w(L, null);
        }
        m.value.src && We(() => {
          var L;
          n("loadstart", ((L = u.value) == null ? void 0 : L.currentSrc) || m.value.src), setTimeout(() => {
            var M;
            if (!s.isUnmounted)
              if ((M = u.value) != null && M.complete) {
                if (u.value.naturalWidth || y(), c.value === "error") return;
                v.value || w(u.value, null), c.value === "loading" && b();
              } else
                v.value || w(u.value), p();
          });
        });
      }
    }
    function b() {
      var T;
      s.isUnmounted || (p(), w(u.value), c.value = "loaded", n("load", ((T = u.value) == null ? void 0 : T.currentSrc) || m.value.src));
    }
    function y() {
      var T;
      s.isUnmounted || (c.value = "error", n("error", ((T = u.value) == null ? void 0 : T.currentSrc) || m.value.src));
    }
    function p() {
      const T = u.value;
      T && (o.value = T.currentSrc || T.src);
    }
    let x = -1;
    st(() => {
      clearTimeout(x);
    });
    function w(T) {
      let L = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
      const M = () => {
        if (clearTimeout(x), s.isUnmounted) return;
        const {
          naturalHeight: j,
          naturalWidth: z
        } = T;
        j || z ? (f.value = z, d.value = j) : !T.complete && c.value === "loading" && L != null ? x = window.setTimeout(M, L) : (T.currentSrc.endsWith(".svg") || T.currentSrc.startsWith("data:image/svg+xml")) && (f.value = 1, d.value = 1);
      };
      M();
    }
    const I = _(() => ({
      "v-img__img--cover": e.cover,
      "v-img__img--contain": !e.cover
    })), k = () => {
      var M;
      if (!m.value.src || c.value === "idle") return null;
      const T = h("img", {
        class: ["v-img__img", I.value],
        style: {
          objectPosition: e.position
        },
        src: m.value.src,
        srcset: m.value.srcset,
        alt: e.alt,
        crossorigin: e.crossorigin,
        referrerpolicy: e.referrerpolicy,
        draggable: e.draggable,
        sizes: e.sizes,
        ref: u,
        onLoad: b,
        onError: y
      }, null), L = (M = a.sources) == null ? void 0 : M.call(a);
      return h(jt, {
        transition: e.transition,
        appear: !0
      }, {
        default: () => [Je(L ? h("picture", {
          class: "v-img__picture"
        }, [L, T]) : T, [[mn, c.value === "loaded"]])]
      });
    }, C = () => h(jt, {
      transition: e.transition
    }, {
      default: () => [m.value.lazySrc && c.value !== "loaded" && h("img", {
        class: ["v-img__img", "v-img__img--preload", I.value],
        style: {
          objectPosition: e.position
        },
        src: m.value.lazySrc,
        alt: e.alt,
        crossorigin: e.crossorigin,
        referrerpolicy: e.referrerpolicy,
        draggable: e.draggable
      }, null)]
    }), S = () => a.placeholder ? h(jt, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [(c.value === "loading" || c.value === "error" && !a.error) && h("div", {
        class: "v-img__placeholder"
      }, [a.placeholder()])]
    }) : null, E = () => a.error ? h(jt, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [c.value === "error" && h("div", {
        class: "v-img__error"
      }, [a.error()])]
    }) : null, A = () => e.gradient ? h("div", {
      class: "v-img__gradient",
      style: {
        backgroundImage: `linear-gradient(${e.gradient})`
      }
    }, null) : null, O = J(!1);
    {
      const T = ne(v, (L) => {
        L && (requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            O.value = !0;
          });
        }), T());
      });
    }
    return Z(() => {
      const T = Ds.filterProps(e);
      return Je(h(Ds, q({
        class: ["v-img", {
          "v-img--absolute": e.absolute,
          "v-img--booting": !O.value
        }, l.value, i.value, e.class],
        style: [{
          width: ee(e.width === "auto" ? f.value : e.width)
        }, r.value, e.style]
      }, T, {
        aspectRatio: v.value,
        "aria-label": e.alt,
        role: e.alt ? "img" : void 0
      }), {
        additional: () => h(he, null, [h(k, null, null), h(C, null, null), h(A, null, null), h(S, null, null), h(E, null, null)]),
        default: a.default
      }), [[Qt("intersect"), {
        handler: g,
        options: e.options
      }, null, {
        once: !0
      }]]);
    }), {
      currentSrc: o,
      image: u,
      state: c,
      naturalWidth: f,
      naturalHeight: d
    };
  }
}), xt = D({
  border: [Boolean, Number, String]
}, "border");
function Rt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vt();
  return {
    borderClasses: _(() => {
      const a = It(e) ? e.value : e.border, l = [];
      if (a === !0 || a === "")
        l.push(`${t}--border`);
      else if (typeof a == "string" || a === 0)
        for (const r of String(a).split(" "))
          l.push(`border-${r}`);
      return l;
    })
  };
}
const St = D({
  elevation: {
    type: [Number, String],
    validator(e) {
      const t = parseInt(e);
      return !isNaN(t) && t >= 0 && // Material Design has a maximum elevation of 24
      // https://material.io/design/environment/elevation.html#default-elevations
      t <= 24;
    }
  }
}, "elevation");
function Pt(e) {
  return {
    elevationClasses: _(() => {
      const n = It(e) ? e.value : e.elevation, a = [];
      return n == null || a.push(`elevation-${n}`), a;
    })
  };
}
const vy = [null, "prominent", "default", "comfortable", "compact"], Mu = D({
  absolute: Boolean,
  collapse: Boolean,
  color: String,
  density: {
    type: String,
    default: "default",
    validator: (e) => vy.includes(e)
  },
  extended: Boolean,
  extensionHeight: {
    type: [Number, String],
    default: 48
  },
  flat: Boolean,
  floating: Boolean,
  height: {
    type: [Number, String],
    default: 64
  },
  image: String,
  title: String,
  ...xt(),
  ...re(),
  ...St(),
  ...et(),
  ...pe({
    tag: "header"
  }),
  ...xe()
}, "VToolbar"), Ms = U()({
  name: "VToolbar",
  props: Mu(),
  setup(e, t) {
    var m;
    let {
      slots: n
    } = t;
    const {
      backgroundColorClasses: a,
      backgroundColorStyles: l
    } = Qe(K(e, "color")), {
      borderClasses: r
    } = Rt(e), {
      elevationClasses: i
    } = Pt(e), {
      roundedClasses: s
    } = ut(e), {
      themeClasses: o
    } = $e(e), {
      rtlClasses: u
    } = ot(), c = J(!!(e.extended || (m = n.extension) != null && m.call(n))), f = _(() => parseInt(Number(e.height) + (e.density === "prominent" ? Number(e.height) : 0) - (e.density === "comfortable" ? 8 : 0) - (e.density === "compact" ? 16 : 0), 10)), d = _(() => c.value ? parseInt(Number(e.extensionHeight) + (e.density === "prominent" ? Number(e.extensionHeight) : 0) - (e.density === "comfortable" ? 4 : 0) - (e.density === "compact" ? 8 : 0), 10) : 0);
    return vt({
      VBtn: {
        variant: "text"
      }
    }), Z(() => {
      var y;
      const v = !!(e.title || n.title), g = !!(n.image || e.image), b = (y = n.extension) == null ? void 0 : y.call(n);
      return c.value = !!(e.extended || b), h(e.tag, {
        class: ["v-toolbar", {
          "v-toolbar--absolute": e.absolute,
          "v-toolbar--collapse": e.collapse,
          "v-toolbar--flat": e.flat,
          "v-toolbar--floating": e.floating,
          [`v-toolbar--density-${e.density}`]: !0
        }, a.value, r.value, i.value, s.value, o.value, u.value, e.class],
        style: [l.value, e.style]
      }, {
        default: () => [g && h("div", {
          key: "image",
          class: "v-toolbar__image"
        }, [n.image ? h(Te, {
          key: "image-defaults",
          disabled: !e.image,
          defaults: {
            VImg: {
              cover: !0,
              src: e.image
            }
          }
        }, n.image) : h(rl, {
          key: "image-img",
          cover: !0,
          src: e.image
        }, null)]), h(Te, {
          defaults: {
            VTabs: {
              height: ee(f.value)
            }
          }
        }, {
          default: () => {
            var p, x, w;
            return [h("div", {
              class: "v-toolbar__content",
              style: {
                height: ee(f.value)
              }
            }, [n.prepend && h("div", {
              class: "v-toolbar__prepend"
            }, [(p = n.prepend) == null ? void 0 : p.call(n)]), v && h($u, {
              key: "title",
              text: e.title
            }, {
              text: n.title
            }), (x = n.default) == null ? void 0 : x.call(n), n.append && h("div", {
              class: "v-toolbar__append"
            }, [(w = n.append) == null ? void 0 : w.call(n)])])];
          }
        }), h(Te, {
          defaults: {
            VTabs: {
              height: ee(d.value)
            }
          }
        }, {
          default: () => [h(Vu, null, {
            default: () => [c.value && h("div", {
              class: "v-toolbar__extension",
              style: {
                height: ee(d.value)
              }
            }, [b])]
          })]
        })]
      });
    }), {
      contentHeight: f,
      extensionHeight: d
    };
  }
}), hy = D({
  scrollTarget: {
    type: String
  },
  scrollThreshold: {
    type: [String, Number],
    default: 300
  }
}, "scroll");
function my(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    canScroll: n
  } = t;
  let a = 0, l = 0;
  const r = Y(null), i = J(0), s = J(0), o = J(0), u = J(!1), c = J(!1), f = _(() => Number(e.scrollThreshold)), d = _(() => ft((f.value - i.value) / f.value || 0)), m = () => {
    const v = r.value;
    if (!v || n && !n.value) return;
    a = i.value, i.value = "window" in v ? v.pageYOffset : v.scrollTop;
    const g = v instanceof Window ? document.documentElement.scrollHeight : v.scrollHeight;
    if (l !== g) {
      l = g;
      return;
    }
    c.value = i.value < a, o.value = Math.abs(i.value - f.value);
  };
  return ne(c, () => {
    s.value = s.value || i.value;
  }), ne(u, () => {
    s.value = 0;
  }), Lt(() => {
    ne(() => e.scrollTarget, (v) => {
      var b;
      const g = v ? document.querySelector(v) : window;
      if (!g) {
        Ut(`Unable to locate element with identifier ${v}`);
        return;
      }
      g !== r.value && ((b = r.value) == null || b.removeEventListener("scroll", m), r.value = g, r.value.addEventListener("scroll", m, {
        passive: !0
      }));
    }, {
      immediate: !0
    });
  }), st(() => {
    var v;
    (v = r.value) == null || v.removeEventListener("scroll", m);
  }), n && ne(n, m, {
    immediate: !0
  }), {
    scrollThreshold: f,
    currentScroll: i,
    currentThreshold: o,
    isScrollActive: u,
    scrollRatio: d,
    // required only for testing
    // probably can be removed
    // later (2 chars chlng)
    isScrollingUp: c,
    savedScroll: s
  };
}
function ua() {
  const e = J(!1);
  return Lt(() => {
    window.requestAnimationFrame(() => {
      e.value = !0;
    });
  }), {
    ssrBootStyles: _(() => e.value ? void 0 : {
      transition: "none !important"
    }),
    isBooted: Er(e)
  };
}
const gy = D({
  scrollBehavior: String,
  modelValue: {
    type: Boolean,
    default: !0
  },
  location: {
    type: String,
    default: "top",
    validator: (e) => ["top", "bottom"].includes(e)
  },
  ...Mu(),
  ...Eu(),
  ...hy(),
  height: {
    type: [Number, String],
    default: 64
  }
}, "VAppBar"), yy = U()({
  name: "VAppBar",
  props: gy(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = Y(), l = be(e, "modelValue"), r = _(() => {
      var x;
      const p = new Set(((x = e.scrollBehavior) == null ? void 0 : x.split(" ")) ?? []);
      return {
        hide: p.has("hide"),
        fullyHide: p.has("fully-hide"),
        inverted: p.has("inverted"),
        collapse: p.has("collapse"),
        elevate: p.has("elevate"),
        fadeImage: p.has("fade-image")
        // shrink: behavior.has('shrink'),
      };
    }), i = _(() => {
      const p = r.value;
      return p.hide || p.fullyHide || p.inverted || p.collapse || p.elevate || p.fadeImage || // behavior.shrink ||
      !l.value;
    }), {
      currentScroll: s,
      scrollThreshold: o,
      isScrollingUp: u,
      scrollRatio: c
    } = my(e, {
      canScroll: i
    }), f = _(() => r.value.hide || r.value.fullyHide), d = _(() => e.collapse || r.value.collapse && (r.value.inverted ? c.value > 0 : c.value === 0)), m = _(() => e.flat || r.value.fullyHide && !l.value || r.value.elevate && (r.value.inverted ? s.value > 0 : s.value === 0)), v = _(() => r.value.fadeImage ? r.value.inverted ? 1 - c.value : c.value : void 0), g = _(() => {
      var w, I;
      if (r.value.hide && r.value.inverted) return 0;
      const p = ((w = a.value) == null ? void 0 : w.contentHeight) ?? 0, x = ((I = a.value) == null ? void 0 : I.extensionHeight) ?? 0;
      return f.value ? s.value < o.value || r.value.fullyHide ? p + x : p : p + x;
    });
    _t(_(() => !!e.scrollBehavior), () => {
      rt(() => {
        f.value ? r.value.inverted ? l.value = s.value > o.value : l.value = u.value || s.value < o.value : l.value = !0;
      });
    });
    const {
      ssrBootStyles: b
    } = ua(), {
      layoutItemStyles: y
    } = xu({
      id: e.name,
      order: _(() => parseInt(e.order, 10)),
      position: K(e, "location"),
      layoutSize: g,
      elementSize: J(void 0),
      active: l,
      absolute: K(e, "absolute")
    });
    return Z(() => {
      const p = Ms.filterProps(e);
      return h(Ms, q({
        ref: a,
        class: ["v-app-bar", {
          "v-app-bar--bottom": e.location === "bottom"
        }, e.class],
        style: [{
          ...y.value,
          "--v-toolbar-image-opacity": v.value,
          height: void 0,
          ...b.value
        }, e.style]
      }, p, {
        collapse: d.value,
        flat: m.value
      }), n);
    }), {};
  }
}), by = [null, "default", "comfortable", "compact"], ct = D({
  density: {
    type: String,
    default: "default",
    validator: (e) => by.includes(e)
  }
}, "density");
function wt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vt();
  return {
    densityClasses: _(() => `${t}--density-${e.density}`)
  };
}
const py = ["elevated", "flat", "tonal", "outlined", "text", "plain"];
function Vn(e, t) {
  return h(he, null, [e && h("span", {
    key: "overlay",
    class: `${t}__overlay`
  }, null), h("span", {
    key: "underlay",
    class: `${t}__underlay`
  }, null)]);
}
const Ft = D({
  color: String,
  variant: {
    type: String,
    default: "elevated",
    validator: (e) => py.includes(e)
  }
}, "variant");
function Nn(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vt();
  const n = _(() => {
    const {
      variant: r
    } = De(e);
    return `${t}--variant-${r}`;
  }), {
    colorClasses: a,
    colorStyles: l
  } = Gr(_(() => {
    const {
      variant: r,
      color: i
    } = De(e);
    return {
      [["elevated", "flat"].includes(r) ? "background" : "text"]: i
    };
  }));
  return {
    colorClasses: a,
    colorStyles: l,
    variantClasses: n
  };
}
const Bu = D({
  baseColor: String,
  divided: Boolean,
  ...xt(),
  ...re(),
  ...ct(),
  ...St(),
  ...et(),
  ...pe(),
  ...xe(),
  ...Ft()
}, "VBtnGroup"), Bs = U()({
  name: "VBtnGroup",
  props: Bu(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: a
    } = $e(e), {
      densityClasses: l
    } = wt(e), {
      borderClasses: r
    } = Rt(e), {
      elevationClasses: i
    } = Pt(e), {
      roundedClasses: s
    } = ut(e);
    vt({
      VBtn: {
        height: "auto",
        baseColor: K(e, "baseColor"),
        color: K(e, "color"),
        density: K(e, "density"),
        flat: !0,
        variant: K(e, "variant")
      }
    }), Z(() => h(e.tag, {
      class: ["v-btn-group", {
        "v-btn-group--divided": e.divided
      }, a.value, r.value, l.value, i.value, s.value, e.class],
      style: e.style
    }, n));
  }
}), Yr = D({
  modelValue: {
    type: null,
    default: void 0
  },
  multiple: Boolean,
  mandatory: [Boolean, String],
  max: Number,
  selectedClass: String,
  disabled: Boolean
}, "group"), qr = D({
  value: null,
  disabled: Boolean,
  selectedClass: String
}, "group-item");
function Xr(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  const a = Ae("useGroupItem");
  if (!a)
    throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");
  const l = Nt();
  Ee(Symbol.for(`${t.description}:id`), l);
  const r = ye(t, null);
  if (!r) {
    if (!n) return r;
    throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${t.description}`);
  }
  const i = K(e, "value"), s = _(() => !!(r.disabled.value || e.disabled));
  r.register({
    id: l,
    value: i,
    disabled: s
  }, a), st(() => {
    r.unregister(l);
  });
  const o = _(() => r.isSelected(l)), u = _(() => r.items.value[0].id === l), c = _(() => r.items.value[r.items.value.length - 1].id === l), f = _(() => o.value && [r.selectedClass.value, e.selectedClass]);
  return ne(o, (d) => {
    a.emit("group:selected", {
      value: d
    });
  }, {
    flush: "sync"
  }), {
    id: l,
    isSelected: o,
    isFirst: u,
    isLast: c,
    toggle: () => r.select(l, !o.value),
    select: (d) => r.select(l, d),
    selectedClass: f,
    value: i,
    disabled: s,
    group: r
  };
}
function il(e, t) {
  let n = !1;
  const a = Xe([]), l = be(e, "modelValue", [], (d) => d == null ? [] : Hu(a, Ke(d)), (d) => {
    const m = Sy(a, d);
    return e.multiple ? m : m[0];
  }), r = Ae("useGroup");
  function i(d, m) {
    const v = d, g = Symbol.for(`${t.description}:id`), y = kn(g, r == null ? void 0 : r.vnode).indexOf(m);
    De(v.value) == null && (v.value = y, v.useIndexAsValue = !0), y > -1 ? a.splice(y, 0, v) : a.push(v);
  }
  function s(d) {
    if (n) return;
    o();
    const m = a.findIndex((v) => v.id === d);
    a.splice(m, 1);
  }
  function o() {
    const d = a.find((m) => !m.disabled);
    d && e.mandatory === "force" && !l.value.length && (l.value = [d.id]);
  }
  Lt(() => {
    o();
  }), st(() => {
    n = !0;
  }), Gd(() => {
    for (let d = 0; d < a.length; d++)
      a[d].useIndexAsValue && (a[d].value = d);
  });
  function u(d, m) {
    const v = a.find((g) => g.id === d);
    if (!(m && (v != null && v.disabled)))
      if (e.multiple) {
        const g = l.value.slice(), b = g.findIndex((p) => p === d), y = ~b;
        if (m = m ?? !y, y && e.mandatory && g.length <= 1 || !y && e.max != null && g.length + 1 > e.max) return;
        b < 0 && m ? g.push(d) : b >= 0 && !m && g.splice(b, 1), l.value = g;
      } else {
        const g = l.value.includes(d);
        if (e.mandatory && g) return;
        l.value = m ?? !g ? [d] : [];
      }
  }
  function c(d) {
    if (e.multiple && Ut('This method is not supported when using "multiple" prop'), l.value.length) {
      const m = l.value[0], v = a.findIndex((y) => y.id === m);
      let g = (v + d) % a.length, b = a[g];
      for (; b.disabled && g !== v; )
        g = (g + d) % a.length, b = a[g];
      if (b.disabled) return;
      l.value = [a[g].id];
    } else {
      const m = a.find((v) => !v.disabled);
      m && (l.value = [m.id]);
    }
  }
  const f = {
    register: i,
    unregister: s,
    selected: l,
    select: u,
    disabled: K(e, "disabled"),
    prev: () => c(a.length - 1),
    next: () => c(1),
    isSelected: (d) => l.value.includes(d),
    selectedClass: _(() => e.selectedClass),
    items: _(() => a),
    getItemIndex: (d) => _y(a, d)
  };
  return Ee(t, f), f;
}
function _y(e, t) {
  const n = Hu(e, [t]);
  return n.length ? e.findIndex((a) => a.id === n[0]) : -1;
}
function Hu(e, t) {
  const n = [];
  return t.forEach((a) => {
    const l = e.find((i) => en(a, i.value)), r = e[a];
    (l == null ? void 0 : l.value) != null ? n.push(l.id) : r != null && n.push(r.id);
  }), n;
}
function Sy(e, t) {
  const n = [];
  return t.forEach((a) => {
    const l = e.findIndex((r) => r.id === a);
    if (~l) {
      const r = e[l];
      n.push(r.value != null ? r.value : l);
    }
  }), n;
}
const Wu = Symbol.for("vuetify:v-btn-toggle"), wy = D({
  ...Bu(),
  ...Yr()
}, "VBtnToggle"), $S = U()({
  name: "VBtnToggle",
  props: wy(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isSelected: a,
      next: l,
      prev: r,
      select: i,
      selected: s
    } = il(e, Wu);
    return Z(() => {
      const o = Bs.filterProps(e);
      return h(Bs, q({
        class: ["v-btn-toggle", e.class]
      }, o, {
        style: e.style
      }), {
        default: () => {
          var u;
          return [(u = n.default) == null ? void 0 : u.call(n, {
            isSelected: a,
            next: l,
            prev: r,
            select: i,
            selected: s
          })];
        }
      });
    }), {
      next: l,
      prev: r,
      select: i
    };
  }
}), Cy = ["x-small", "small", "default", "large", "x-large"], Rn = D({
  size: {
    type: [String, Number],
    default: "default"
  }
}, "size");
function ca(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vt();
  return Hr(() => {
    let n, a;
    return Aa(Cy, e.size) ? n = `${t}--size-${e.size}` : e.size && (a = {
      width: ee(e.size),
      height: ee(e.size)
    }), {
      sizeClasses: n,
      sizeStyles: a
    };
  });
}
const Iy = D({
  color: String,
  disabled: Boolean,
  start: Boolean,
  end: Boolean,
  icon: oe,
  ...re(),
  ...Rn(),
  ...pe({
    tag: "i"
  }),
  ...xe()
}, "VIcon"), Ve = U()({
  name: "VIcon",
  props: Iy(),
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const l = Y(), {
      themeClasses: r
    } = $e(e), {
      iconData: i
    } = Zg(_(() => l.value || e.icon)), {
      sizeClasses: s
    } = ca(e), {
      textColorClasses: o,
      textColorStyles: u
    } = kt(K(e, "color"));
    return Z(() => {
      var d, m;
      const c = (d = a.default) == null ? void 0 : d.call(a);
      c && (l.value = (m = lu(c).filter((v) => v.type === mo && v.children && typeof v.children == "string")[0]) == null ? void 0 : m.children);
      const f = !!(n.onClick || n.onClickOnce);
      return h(i.value.component, {
        tag: e.tag,
        icon: i.value.icon,
        class: ["v-icon", "notranslate", r.value, s.value, o.value, {
          "v-icon--clickable": f,
          "v-icon--disabled": e.disabled,
          "v-icon--start": e.start,
          "v-icon--end": e.end
        }, e.class],
        style: [s.value ? void 0 : {
          fontSize: ee(e.size),
          height: ee(e.size),
          width: ee(e.size)
        }, u.value, e.style],
        role: f ? "button" : void 0,
        "aria-hidden": !f,
        tabindex: f ? e.disabled ? -1 : 0 : void 0
      }, {
        default: () => [c]
      });
    }), {};
  }
});
function Ku(e, t) {
  const n = Y(), a = J(!1);
  if (Br) {
    const l = new IntersectionObserver((r) => {
      a.value = !!r.find((i) => i.isIntersecting);
    }, t);
    st(() => {
      l.disconnect();
    }), ne(n, (r, i) => {
      i && (l.unobserve(i), a.value = !1), r && l.observe(r);
    }, {
      flush: "post"
    });
  }
  return {
    intersectionRef: n,
    isIntersecting: a
  };
}
const ky = D({
  bgColor: String,
  color: String,
  indeterminate: [Boolean, String],
  modelValue: {
    type: [Number, String],
    default: 0
  },
  rotate: {
    type: [Number, String],
    default: 0
  },
  width: {
    type: [Number, String],
    default: 4
  },
  ...re(),
  ...Rn(),
  ...pe({
    tag: "div"
  }),
  ...xe()
}, "VProgressCircular"), Ey = U()({
  name: "VProgressCircular",
  props: ky(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = 20, l = 2 * Math.PI * a, r = Y(), {
      themeClasses: i
    } = $e(e), {
      sizeClasses: s,
      sizeStyles: o
    } = ca(e), {
      textColorClasses: u,
      textColorStyles: c
    } = kt(K(e, "color")), {
      textColorClasses: f,
      textColorStyles: d
    } = kt(K(e, "bgColor")), {
      intersectionRef: m,
      isIntersecting: v
    } = Ku(), {
      resizeRef: g,
      contentRect: b
    } = vn(), y = _(() => Math.max(0, Math.min(100, parseFloat(e.modelValue)))), p = _(() => Number(e.width)), x = _(() => o.value ? Number(e.size) : b.value ? b.value.width : Math.max(p.value, 32)), w = _(() => a / (1 - p.value / x.value) * 2), I = _(() => p.value / x.value * w.value), k = _(() => ee((100 - y.value) / 100 * l));
    return rt(() => {
      m.value = r.value, g.value = r.value;
    }), Z(() => h(e.tag, {
      ref: r,
      class: ["v-progress-circular", {
        "v-progress-circular--indeterminate": !!e.indeterminate,
        "v-progress-circular--visible": v.value,
        "v-progress-circular--disable-shrink": e.indeterminate === "disable-shrink"
      }, i.value, s.value, u.value, e.class],
      style: [o.value, c.value, e.style],
      role: "progressbar",
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-valuenow": e.indeterminate ? void 0 : y.value
    }, {
      default: () => [h("svg", {
        style: {
          transform: `rotate(calc(-90deg + ${Number(e.rotate)}deg))`
        },
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: `0 0 ${w.value} ${w.value}`
      }, [h("circle", {
        class: ["v-progress-circular__underlay", f.value],
        style: d.value,
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r: a,
        "stroke-width": I.value,
        "stroke-dasharray": l,
        "stroke-dashoffset": 0
      }, null), h("circle", {
        class: "v-progress-circular__overlay",
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r: a,
        "stroke-width": I.value,
        "stroke-dasharray": l,
        "stroke-dashoffset": k.value
      }, null)]), n.default && h("div", {
        class: "v-progress-circular__content"
      }, [n.default({
        value: y.value
      })])]
    })), {};
  }
}), Hs = {
  center: "center",
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, da = D({
  location: String
}, "location");
function fa(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = arguments.length > 2 ? arguments[2] : void 0;
  const {
    isRtl: a
  } = ot();
  return {
    locationStyles: _(() => {
      if (!e.location) return {};
      const {
        side: r,
        align: i
      } = fr(e.location.split(" ").length > 1 ? e.location : `${e.location} center`, a.value);
      function s(u) {
        return n ? n(u) : 0;
      }
      const o = {};
      return r !== "center" && (t ? o[Hs[r]] = `calc(100% - ${s(r)}px)` : o[r] = 0), i !== "center" ? t ? o[Hs[i]] = `calc(100% - ${s(i)}px)` : o[i] = 0 : (r === "center" ? o.top = o.left = "50%" : o[{
        top: "left",
        bottom: "left",
        left: "top",
        right: "top"
      }[r]] = "50%", o.transform = {
        top: "translateX(-50%)",
        bottom: "translateX(-50%)",
        left: "translateY(-50%)",
        right: "translateY(-50%)",
        center: "translate(-50%, -50%)"
      }[r]), o;
    })
  };
}
const xy = D({
  absolute: Boolean,
  active: {
    type: Boolean,
    default: !0
  },
  bgColor: String,
  bgOpacity: [Number, String],
  bufferValue: {
    type: [Number, String],
    default: 0
  },
  bufferColor: String,
  bufferOpacity: [Number, String],
  clickable: Boolean,
  color: String,
  height: {
    type: [Number, String],
    default: 4
  },
  indeterminate: Boolean,
  max: {
    type: [Number, String],
    default: 100
  },
  modelValue: {
    type: [Number, String],
    default: 0
  },
  opacity: [Number, String],
  reverse: Boolean,
  stream: Boolean,
  striped: Boolean,
  roundedBar: Boolean,
  ...re(),
  ...da({
    location: "top"
  }),
  ...et(),
  ...pe(),
  ...xe()
}, "VProgressLinear"), Py = U()({
  name: "VProgressLinear",
  props: xy(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    var O;
    let {
      slots: n
    } = t;
    const a = be(e, "modelValue"), {
      isRtl: l,
      rtlClasses: r
    } = ot(), {
      themeClasses: i
    } = $e(e), {
      locationStyles: s
    } = fa(e), {
      textColorClasses: o,
      textColorStyles: u
    } = kt(e, "color"), {
      backgroundColorClasses: c,
      backgroundColorStyles: f
    } = Qe(_(() => e.bgColor || e.color)), {
      backgroundColorClasses: d,
      backgroundColorStyles: m
    } = Qe(_(() => e.bufferColor || e.bgColor || e.color)), {
      backgroundColorClasses: v,
      backgroundColorStyles: g
    } = Qe(e, "color"), {
      roundedClasses: b
    } = ut(e), {
      intersectionRef: y,
      isIntersecting: p
    } = Ku(), x = _(() => parseFloat(e.max)), w = _(() => parseFloat(e.height)), I = _(() => ft(parseFloat(e.bufferValue) / x.value * 100, 0, 100)), k = _(() => ft(parseFloat(a.value) / x.value * 100, 0, 100)), C = _(() => l.value !== e.reverse), S = _(() => e.indeterminate ? "fade-transition" : "slide-x-transition"), E = ke && ((O = window.matchMedia) == null ? void 0 : O.call(window, "(forced-colors: active)").matches);
    function A(T) {
      if (!y.value) return;
      const {
        left: L,
        right: M,
        width: j
      } = y.value.getBoundingClientRect(), z = C.value ? j - T.clientX + (M - j) : T.clientX - L;
      a.value = Math.round(z / j * x.value);
    }
    return Z(() => h(e.tag, {
      ref: y,
      class: ["v-progress-linear", {
        "v-progress-linear--absolute": e.absolute,
        "v-progress-linear--active": e.active && p.value,
        "v-progress-linear--reverse": C.value,
        "v-progress-linear--rounded": e.rounded,
        "v-progress-linear--rounded-bar": e.roundedBar,
        "v-progress-linear--striped": e.striped
      }, b.value, i.value, r.value, e.class],
      style: [{
        bottom: e.location === "bottom" ? 0 : void 0,
        top: e.location === "top" ? 0 : void 0,
        height: e.active ? ee(w.value) : 0,
        "--v-progress-linear-height": ee(w.value),
        ...e.absolute ? s.value : {}
      }, e.style],
      role: "progressbar",
      "aria-hidden": e.active ? "false" : "true",
      "aria-valuemin": "0",
      "aria-valuemax": e.max,
      "aria-valuenow": e.indeterminate ? void 0 : k.value,
      onClick: e.clickable && A
    }, {
      default: () => [e.stream && h("div", {
        key: "stream",
        class: ["v-progress-linear__stream", o.value],
        style: {
          ...u.value,
          [C.value ? "left" : "right"]: ee(-w.value),
          borderTop: `${ee(w.value / 2)} dotted`,
          opacity: parseFloat(e.bufferOpacity),
          top: `calc(50% - ${ee(w.value / 4)})`,
          width: ee(100 - I.value, "%"),
          "--v-progress-linear-stream-to": ee(w.value * (C.value ? 1 : -1))
        }
      }, null), h("div", {
        class: ["v-progress-linear__background", E ? void 0 : c.value],
        style: [f.value, {
          opacity: parseFloat(e.bgOpacity),
          width: e.stream ? 0 : void 0
        }]
      }, null), h("div", {
        class: ["v-progress-linear__buffer", E ? void 0 : d.value],
        style: [m.value, {
          opacity: parseFloat(e.bufferOpacity),
          width: ee(I.value, "%")
        }]
      }, null), h(Xt, {
        name: S.value
      }, {
        default: () => [e.indeterminate ? h("div", {
          class: "v-progress-linear__indeterminate"
        }, [["long", "short"].map((T) => h("div", {
          key: T,
          class: ["v-progress-linear__indeterminate", T, E ? void 0 : v.value],
          style: g.value
        }, null))]) : h("div", {
          class: ["v-progress-linear__determinate", E ? void 0 : v.value],
          style: [g.value, {
            width: ee(k.value, "%")
          }]
        }, null)]
      }), n.default && h("div", {
        class: "v-progress-linear__content"
      }, [n.default({
        value: k.value,
        buffer: I.value
      })])]
    })), {};
  }
}), sl = D({
  loading: [Boolean, String]
}, "loader");
function ol(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vt();
  return {
    loaderClasses: _(() => ({
      [`${t}--loading`]: e.loading
    }))
  };
}
function Qr(e, t) {
  var a;
  let {
    slots: n
  } = t;
  return h("div", {
    class: `${e.name}__loader`
  }, [((a = n.default) == null ? void 0 : a.call(n, {
    color: e.color,
    isActive: e.active
  })) || h(Py, {
    absolute: e.absolute,
    active: e.active,
    color: e.color,
    height: "2",
    indeterminate: !0
  }, null)]);
}
const $y = ["static", "relative", "fixed", "absolute", "sticky"], ul = D({
  position: {
    type: String,
    validator: (
      /* istanbul ignore next */
      (e) => $y.includes(e)
    )
  }
}, "position");
function cl(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vt();
  return {
    positionClasses: _(() => e.position ? `${t}--${e.position}` : void 0)
  };
}
function Ty() {
  const e = Ae("useRoute");
  return _(() => {
    var t;
    return (t = e == null ? void 0 : e.proxy) == null ? void 0 : t.$route;
  });
}
function ju() {
  var e, t;
  return (t = (e = Ae("useRouter")) == null ? void 0 : e.proxy) == null ? void 0 : t.$router;
}
function dl(e, t) {
  var f, d;
  const n = Yd("RouterLink"), a = _(() => !!(e.href || e.to)), l = _(() => (a == null ? void 0 : a.value) || ss(t, "click") || ss(e, "click"));
  if (typeof n == "string" || !("useLink" in n)) {
    const m = K(e, "href");
    return {
      isLink: a,
      isClickable: l,
      href: m,
      linkProps: Xe({
        href: m
      })
    };
  }
  const r = _(() => ({
    ...e,
    to: K(() => e.to || "")
  })), i = n.useLink(r.value), s = _(() => e.to ? i : void 0), o = Ty(), u = _(() => {
    var m, v, g;
    return s.value ? e.exact ? o.value ? ((g = s.value.isExactActive) == null ? void 0 : g.value) && en(s.value.route.value.query, o.value.query) : ((v = s.value.isExactActive) == null ? void 0 : v.value) ?? !1 : ((m = s.value.isActive) == null ? void 0 : m.value) ?? !1 : !1;
  }), c = _(() => {
    var m;
    return e.to ? (m = s.value) == null ? void 0 : m.route.value.href : e.href;
  });
  return {
    isLink: a,
    isClickable: l,
    isActive: u,
    route: (f = s.value) == null ? void 0 : f.route,
    navigate: (d = s.value) == null ? void 0 : d.navigate,
    href: c,
    linkProps: Xe({
      href: c,
      "aria-current": _(() => u.value ? "page" : void 0)
    })
  };
}
const fl = D({
  href: String,
  replace: Boolean,
  to: [String, Object],
  exact: Boolean
}, "router");
let Bl = !1;
function Ay(e, t) {
  let n = !1, a, l;
  ke && (We(() => {
    window.addEventListener("popstate", r), a = e == null ? void 0 : e.beforeEach((i, s, o) => {
      Bl ? n ? t(o) : o() : setTimeout(() => n ? t(o) : o()), Bl = !0;
    }), l = e == null ? void 0 : e.afterEach(() => {
      Bl = !1;
    });
  }), Ge(() => {
    window.removeEventListener("popstate", r), a == null || a(), l == null || l();
  }));
  function r(i) {
    var s;
    (s = i.state) != null && s.replaced || (n = !0, setTimeout(() => n = !1));
  }
}
function Oy(e, t) {
  ne(() => {
    var n;
    return (n = e.isActive) == null ? void 0 : n.value;
  }, (n) => {
    e.isLink.value && n && t && We(() => {
      t(!0);
    });
  }, {
    immediate: !0
  });
}
const mr = Symbol("rippleStop"), Ly = 80;
function Ws(e, t) {
  e.style.transform = t, e.style.webkitTransform = t;
}
function gr(e) {
  return e.constructor.name === "TouchEvent";
}
function Uu(e) {
  return e.constructor.name === "KeyboardEvent";
}
const Vy = function(e, t) {
  var f;
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, a = 0, l = 0;
  if (!Uu(e)) {
    const d = t.getBoundingClientRect(), m = gr(e) ? e.touches[e.touches.length - 1] : e;
    a = m.clientX - d.left, l = m.clientY - d.top;
  }
  let r = 0, i = 0.3;
  (f = t._ripple) != null && f.circle ? (i = 0.15, r = t.clientWidth / 2, r = n.center ? r : r + Math.sqrt((a - r) ** 2 + (l - r) ** 2) / 4) : r = Math.sqrt(t.clientWidth ** 2 + t.clientHeight ** 2) / 2;
  const s = `${(t.clientWidth - r * 2) / 2}px`, o = `${(t.clientHeight - r * 2) / 2}px`, u = n.center ? s : `${a - r}px`, c = n.center ? o : `${l - r}px`;
  return {
    radius: r,
    scale: i,
    x: u,
    y: c,
    centerX: s,
    centerY: o
  };
}, Da = {
  /* eslint-disable max-statements */
  show(e, t) {
    var m;
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (!((m = t == null ? void 0 : t._ripple) != null && m.enabled))
      return;
    const a = document.createElement("span"), l = document.createElement("span");
    a.appendChild(l), a.className = "v-ripple__container", n.class && (a.className += ` ${n.class}`);
    const {
      radius: r,
      scale: i,
      x: s,
      y: o,
      centerX: u,
      centerY: c
    } = Vy(e, t, n), f = `${r * 2}px`;
    l.className = "v-ripple__animation", l.style.width = f, l.style.height = f, t.appendChild(a);
    const d = window.getComputedStyle(t);
    d && d.position === "static" && (t.style.position = "relative", t.dataset.previousPosition = "static"), l.classList.add("v-ripple__animation--enter"), l.classList.add("v-ripple__animation--visible"), Ws(l, `translate(${s}, ${o}) scale3d(${i},${i},${i})`), l.dataset.activated = String(performance.now()), setTimeout(() => {
      l.classList.remove("v-ripple__animation--enter"), l.classList.add("v-ripple__animation--in"), Ws(l, `translate(${u}, ${c}) scale3d(1,1,1)`);
    }, 0);
  },
  hide(e) {
    var r;
    if (!((r = e == null ? void 0 : e._ripple) != null && r.enabled)) return;
    const t = e.getElementsByClassName("v-ripple__animation");
    if (t.length === 0) return;
    const n = t[t.length - 1];
    if (n.dataset.isHiding) return;
    n.dataset.isHiding = "true";
    const a = performance.now() - Number(n.dataset.activated), l = Math.max(250 - a, 0);
    setTimeout(() => {
      n.classList.remove("v-ripple__animation--in"), n.classList.add("v-ripple__animation--out"), setTimeout(() => {
        var s;
        e.getElementsByClassName("v-ripple__animation").length === 1 && e.dataset.previousPosition && (e.style.position = e.dataset.previousPosition, delete e.dataset.previousPosition), ((s = n.parentNode) == null ? void 0 : s.parentNode) === e && e.removeChild(n.parentNode);
      }, 300);
    }, l);
  }
};
function zu(e) {
  return typeof e > "u" || !!e;
}
function Zn(e) {
  const t = {}, n = e.currentTarget;
  if (!(!(n != null && n._ripple) || n._ripple.touched || e[mr])) {
    if (e[mr] = !0, gr(e))
      n._ripple.touched = !0, n._ripple.isTouch = !0;
    else if (n._ripple.isTouch) return;
    if (t.center = n._ripple.centered || Uu(e), n._ripple.class && (t.class = n._ripple.class), gr(e)) {
      if (n._ripple.showTimerCommit) return;
      n._ripple.showTimerCommit = () => {
        Da.show(e, n, t);
      }, n._ripple.showTimer = window.setTimeout(() => {
        var a;
        (a = n == null ? void 0 : n._ripple) != null && a.showTimerCommit && (n._ripple.showTimerCommit(), n._ripple.showTimerCommit = null);
      }, Ly);
    } else
      Da.show(e, n, t);
  }
}
function Ks(e) {
  e[mr] = !0;
}
function dt(e) {
  const t = e.currentTarget;
  if (t != null && t._ripple) {
    if (window.clearTimeout(t._ripple.showTimer), e.type === "touchend" && t._ripple.showTimerCommit) {
      t._ripple.showTimerCommit(), t._ripple.showTimerCommit = null, t._ripple.showTimer = window.setTimeout(() => {
        dt(e);
      });
      return;
    }
    window.setTimeout(() => {
      t._ripple && (t._ripple.touched = !1);
    }), Da.hide(t);
  }
}
function Gu(e) {
  const t = e.currentTarget;
  t != null && t._ripple && (t._ripple.showTimerCommit && (t._ripple.showTimerCommit = null), window.clearTimeout(t._ripple.showTimer));
}
let ea = !1;
function Yu(e) {
  !ea && (e.keyCode === as.enter || e.keyCode === as.space) && (ea = !0, Zn(e));
}
function qu(e) {
  ea = !1, dt(e);
}
function Xu(e) {
  ea && (ea = !1, dt(e));
}
function Qu(e, t, n) {
  const {
    value: a,
    modifiers: l
  } = t, r = zu(a);
  if (r || Da.hide(e), e._ripple = e._ripple ?? {}, e._ripple.enabled = r, e._ripple.centered = l.center, e._ripple.circle = l.circle, Jo(a) && a.class && (e._ripple.class = a.class), r && !n) {
    if (l.stop) {
      e.addEventListener("touchstart", Ks, {
        passive: !0
      }), e.addEventListener("mousedown", Ks);
      return;
    }
    e.addEventListener("touchstart", Zn, {
      passive: !0
    }), e.addEventListener("touchend", dt, {
      passive: !0
    }), e.addEventListener("touchmove", Gu, {
      passive: !0
    }), e.addEventListener("touchcancel", dt), e.addEventListener("mousedown", Zn), e.addEventListener("mouseup", dt), e.addEventListener("mouseleave", dt), e.addEventListener("keydown", Yu), e.addEventListener("keyup", qu), e.addEventListener("blur", Xu), e.addEventListener("dragstart", dt, {
      passive: !0
    });
  } else !r && n && Ju(e);
}
function Ju(e) {
  e.removeEventListener("mousedown", Zn), e.removeEventListener("touchstart", Zn), e.removeEventListener("touchend", dt), e.removeEventListener("touchmove", Gu), e.removeEventListener("touchcancel", dt), e.removeEventListener("mouseup", dt), e.removeEventListener("mouseleave", dt), e.removeEventListener("keydown", Yu), e.removeEventListener("keyup", qu), e.removeEventListener("dragstart", dt), e.removeEventListener("blur", Xu);
}
function Ny(e, t) {
  Qu(e, t, !1);
}
function Ry(e) {
  delete e._ripple, Ju(e);
}
function Fy(e, t) {
  if (t.value === t.oldValue)
    return;
  const n = zu(t.oldValue);
  Qu(e, t, n);
}
const va = {
  mounted: Ny,
  unmounted: Ry,
  updated: Fy
}, Jr = D({
  active: {
    type: Boolean,
    default: void 0
  },
  activeColor: String,
  baseColor: String,
  symbol: {
    type: null,
    default: Wu
  },
  flat: Boolean,
  icon: [Boolean, String, Function, Object],
  prependIcon: oe,
  appendIcon: oe,
  block: Boolean,
  readonly: Boolean,
  slim: Boolean,
  stacked: Boolean,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  text: String,
  ...xt(),
  ...re(),
  ...ct(),
  ...mt(),
  ...St(),
  ...qr(),
  ...sl(),
  ...da(),
  ...ul(),
  ...et(),
  ...fl(),
  ...Rn(),
  ...pe({
    tag: "button"
  }),
  ...xe(),
  ...Ft({
    variant: "elevated"
  })
}, "VBtn"), at = U()({
  name: "VBtn",
  props: Jr(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const {
      themeClasses: l
    } = $e(e), {
      borderClasses: r
    } = Rt(e), {
      densityClasses: i
    } = wt(e), {
      dimensionStyles: s
    } = gt(e), {
      elevationClasses: o
    } = Pt(e), {
      loaderClasses: u
    } = ol(e), {
      locationStyles: c
    } = fa(e), {
      positionClasses: f
    } = cl(e), {
      roundedClasses: d
    } = ut(e), {
      sizeClasses: m,
      sizeStyles: v
    } = ca(e), g = Xr(e, e.symbol, !1), b = dl(e, n), y = _(() => {
      var O;
      return e.active !== void 0 ? e.active : b.isLink.value ? (O = b.isActive) == null ? void 0 : O.value : g == null ? void 0 : g.isSelected.value;
    }), p = _(() => y.value ? e.activeColor ?? e.color : e.color), x = _(() => {
      var T, L;
      return {
        color: (g == null ? void 0 : g.isSelected.value) && (!b.isLink.value || ((T = b.isActive) == null ? void 0 : T.value)) || !g || ((L = b.isActive) == null ? void 0 : L.value) ? p.value ?? e.baseColor : e.baseColor,
        variant: e.variant
      };
    }), {
      colorClasses: w,
      colorStyles: I,
      variantClasses: k
    } = Nn(x), C = _(() => (g == null ? void 0 : g.disabled.value) || e.disabled), S = _(() => e.variant === "elevated" && !(e.disabled || e.flat || e.border)), E = _(() => {
      if (!(e.value === void 0 || typeof e.value == "symbol"))
        return Object(e.value) === e.value ? JSON.stringify(e.value, null, 0) : e.value;
    });
    function A(O) {
      var T;
      C.value || b.isLink.value && (O.metaKey || O.ctrlKey || O.shiftKey || O.button !== 0 || n.target === "_blank") || ((T = b.navigate) == null || T.call(b, O), g == null || g.toggle());
    }
    return Oy(b, g == null ? void 0 : g.select), Z(() => {
      const O = b.isLink.value ? "a" : e.tag, T = !!(e.prependIcon || a.prepend), L = !!(e.appendIcon || a.append), M = !!(e.icon && e.icon !== !0);
      return Je(h(O, q({
        type: O === "a" ? void 0 : "button",
        class: ["v-btn", g == null ? void 0 : g.selectedClass.value, {
          "v-btn--active": y.value,
          "v-btn--block": e.block,
          "v-btn--disabled": C.value,
          "v-btn--elevated": S.value,
          "v-btn--flat": e.flat,
          "v-btn--icon": !!e.icon,
          "v-btn--loading": e.loading,
          "v-btn--readonly": e.readonly,
          "v-btn--slim": e.slim,
          "v-btn--stacked": e.stacked
        }, l.value, r.value, w.value, i.value, o.value, u.value, f.value, d.value, m.value, k.value, e.class],
        style: [I.value, s.value, c.value, v.value, e.style],
        "aria-busy": e.loading ? !0 : void 0,
        disabled: C.value || void 0,
        tabindex: e.loading || e.readonly ? -1 : void 0,
        onClick: A,
        value: E.value
      }, b.linkProps), {
        default: () => {
          var j;
          return [Vn(!0, "v-btn"), !e.icon && T && h("span", {
            key: "prepend",
            class: "v-btn__prepend"
          }, [a.prepend ? h(Te, {
            key: "prepend-defaults",
            disabled: !e.prependIcon,
            defaults: {
              VIcon: {
                icon: e.prependIcon
              }
            }
          }, a.prepend) : h(Ve, {
            key: "prepend-icon",
            icon: e.prependIcon
          }, null)]), h("span", {
            class: "v-btn__content",
            "data-no-activator": ""
          }, [!a.default && M ? h(Ve, {
            key: "content-icon",
            icon: e.icon
          }, null) : h(Te, {
            key: "content-defaults",
            disabled: !M,
            defaults: {
              VIcon: {
                icon: e.icon
              }
            }
          }, {
            default: () => {
              var z;
              return [((z = a.default) == null ? void 0 : z.call(a)) ?? e.text];
            }
          })]), !e.icon && L && h("span", {
            key: "append",
            class: "v-btn__append"
          }, [a.append ? h(Te, {
            key: "append-defaults",
            disabled: !e.appendIcon,
            defaults: {
              VIcon: {
                icon: e.appendIcon
              }
            }
          }, a.append) : h(Ve, {
            key: "append-icon",
            icon: e.appendIcon
          }, null)]), !!e.loading && h("span", {
            key: "loader",
            class: "v-btn__loader"
          }, [((j = a.loader) == null ? void 0 : j.call(a)) ?? h(Ey, {
            color: typeof e.loading == "boolean" ? void 0 : e.loading,
            indeterminate: !0,
            width: "2"
          }, null)])];
        }
      }), [[va, !C.value && e.ripple, "", {
        center: !!e.icon
      }]]);
    }), {
      group: g
    };
  }
}), Dy = D({
  ...Jr({
    icon: "$menu",
    variant: "text"
  })
}, "VAppBarNavIcon"), My = U()({
  name: "VAppBarNavIcon",
  props: Dy(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return Z(() => h(at, q(e, {
      class: ["v-app-bar-nav-icon"]
    }), n)), {};
  }
}), By = U()({
  name: "VAppBarTitle",
  props: Pu(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return Z(() => h($u, q(e, {
      class: "v-app-bar-title"
    }), n)), {};
  }
}), Hy = nl("v-alert-title"), Wy = ["success", "info", "warning", "error"], Ky = D({
  border: {
    type: [Boolean, String],
    validator: (e) => typeof e == "boolean" || ["top", "end", "bottom", "start"].includes(e)
  },
  borderColor: String,
  closable: Boolean,
  closeIcon: {
    type: oe,
    default: "$close"
  },
  closeLabel: {
    type: String,
    default: "$vuetify.close"
  },
  icon: {
    type: [Boolean, String, Function, Object],
    default: null
  },
  modelValue: {
    type: Boolean,
    default: !0
  },
  prominent: Boolean,
  title: String,
  text: String,
  type: {
    type: String,
    validator: (e) => Wy.includes(e)
  },
  ...re(),
  ...ct(),
  ...mt(),
  ...St(),
  ...da(),
  ...ul(),
  ...et(),
  ...pe(),
  ...xe(),
  ...Ft({
    variant: "flat"
  })
}, "VAlert"), jy = U()({
  name: "VAlert",
  props: Ky(),
  emits: {
    "click:close": (e) => !0,
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      emit: n,
      slots: a
    } = t;
    const l = be(e, "modelValue"), r = _(() => {
      if (e.icon !== !1)
        return e.type ? e.icon ?? `$${e.type}` : e.icon;
    }), i = _(() => ({
      color: e.color ?? e.type,
      variant: e.variant
    })), {
      themeClasses: s
    } = $e(e), {
      colorClasses: o,
      colorStyles: u,
      variantClasses: c
    } = Nn(i), {
      densityClasses: f
    } = wt(e), {
      dimensionStyles: d
    } = gt(e), {
      elevationClasses: m
    } = Pt(e), {
      locationStyles: v
    } = fa(e), {
      positionClasses: g
    } = cl(e), {
      roundedClasses: b
    } = ut(e), {
      textColorClasses: y,
      textColorStyles: p
    } = kt(K(e, "borderColor")), {
      t: x
    } = Et(), w = _(() => ({
      "aria-label": x(e.closeLabel),
      onClick(I) {
        l.value = !1, n("click:close", I);
      }
    }));
    return () => {
      const I = !!(a.prepend || r.value), k = !!(a.title || e.title), C = !!(a.close || e.closable);
      return l.value && h(e.tag, {
        class: ["v-alert", e.border && {
          "v-alert--border": !!e.border,
          [`v-alert--border-${e.border === !0 ? "start" : e.border}`]: !0
        }, {
          "v-alert--prominent": e.prominent
        }, s.value, o.value, f.value, m.value, g.value, b.value, c.value, e.class],
        style: [u.value, d.value, v.value, e.style],
        role: "alert"
      }, {
        default: () => {
          var S, E;
          return [Vn(!1, "v-alert"), e.border && h("div", {
            key: "border",
            class: ["v-alert__border", y.value],
            style: p.value
          }, null), I && h("div", {
            key: "prepend",
            class: "v-alert__prepend"
          }, [a.prepend ? h(Te, {
            key: "prepend-defaults",
            disabled: !r.value,
            defaults: {
              VIcon: {
                density: e.density,
                icon: r.value,
                size: e.prominent ? 44 : 28
              }
            }
          }, a.prepend) : h(Ve, {
            key: "prepend-icon",
            density: e.density,
            icon: r.value,
            size: e.prominent ? 44 : 28
          }, null)]), h("div", {
            class: "v-alert__content"
          }, [k && h(Hy, {
            key: "title"
          }, {
            default: () => {
              var A;
              return [((A = a.title) == null ? void 0 : A.call(a)) ?? e.title];
            }
          }), ((S = a.text) == null ? void 0 : S.call(a)) ?? e.text, (E = a.default) == null ? void 0 : E.call(a)]), a.append && h("div", {
            key: "append",
            class: "v-alert__append"
          }, [a.append()]), C && h("div", {
            key: "close",
            class: "v-alert__close"
          }, [a.close ? h(Te, {
            key: "close-defaults",
            defaults: {
              VBtn: {
                icon: e.closeIcon,
                size: "x-small",
                variant: "text"
              }
            }
          }, {
            default: () => {
              var A;
              return [(A = a.close) == null ? void 0 : A.call(a, {
                props: w.value
              })];
            }
          }) : h(at, q({
            key: "close-btn",
            icon: e.closeIcon,
            size: "x-small",
            variant: "text"
          }, w.value), null)])];
        }
      });
    };
  }
}), Uy = D({
  start: Boolean,
  end: Boolean,
  icon: oe,
  image: String,
  text: String,
  ...xt(),
  ...re(),
  ...ct(),
  ...et(),
  ...Rn(),
  ...pe(),
  ...xe(),
  ...Ft({
    variant: "flat"
  })
}, "VAvatar"), hn = U()({
  name: "VAvatar",
  props: Uy(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: a
    } = $e(e), {
      borderClasses: l
    } = Rt(e), {
      colorClasses: r,
      colorStyles: i,
      variantClasses: s
    } = Nn(e), {
      densityClasses: o
    } = wt(e), {
      roundedClasses: u
    } = ut(e), {
      sizeClasses: c,
      sizeStyles: f
    } = ca(e);
    return Z(() => h(e.tag, {
      class: ["v-avatar", {
        "v-avatar--start": e.start,
        "v-avatar--end": e.end
      }, a.value, l.value, r.value, o.value, u.value, c.value, s.value, e.class],
      style: [i.value, f.value, e.style]
    }, {
      default: () => [n.default ? h(Te, {
        key: "content-defaults",
        defaults: {
          VImg: {
            cover: !0,
            src: e.image
          },
          VIcon: {
            icon: e.icon
          }
        }
      }, {
        default: () => [n.default()]
      }) : e.image ? h(rl, {
        key: "image",
        src: e.image,
        alt: "",
        cover: !0
      }, null) : e.icon ? h(Ve, {
        key: "icon",
        icon: e.icon
      }, null) : e.text, Vn(!1, "v-avatar")]
    })), {};
  }
});
function zy(e) {
  let {
    selectedElement: t,
    containerElement: n,
    isRtl: a,
    isHorizontal: l
  } = e;
  const r = ta(l, n), i = Zu(l, a, n), s = ta(l, t), o = ec(l, t), u = s * 0.4;
  return i > o ? o - u : i + r < o + s ? o - r + s + u : i;
}
function Gy(e) {
  let {
    selectedElement: t,
    containerElement: n,
    isHorizontal: a
  } = e;
  const l = ta(a, n), r = ec(a, t), i = ta(a, t);
  return r - l / 2 + i / 2;
}
function js(e, t) {
  const n = e ? "scrollWidth" : "scrollHeight";
  return (t == null ? void 0 : t[n]) || 0;
}
function Yy(e, t) {
  const n = e ? "clientWidth" : "clientHeight";
  return (t == null ? void 0 : t[n]) || 0;
}
function Zu(e, t, n) {
  if (!n)
    return 0;
  const {
    scrollLeft: a,
    offsetWidth: l,
    scrollWidth: r
  } = n;
  return e ? t ? r - l + a : a : n.scrollTop;
}
function ta(e, t) {
  const n = e ? "offsetWidth" : "offsetHeight";
  return (t == null ? void 0 : t[n]) || 0;
}
function ec(e, t) {
  const n = e ? "offsetLeft" : "offsetTop";
  return (t == null ? void 0 : t[n]) || 0;
}
const qy = Symbol.for("vuetify:v-slide-group"), Zr = D({
  centerActive: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  symbol: {
    type: null,
    default: qy
  },
  nextIcon: {
    type: oe,
    default: "$next"
  },
  prevIcon: {
    type: oe,
    default: "$prev"
  },
  showArrows: {
    type: [Boolean, String],
    validator: (e) => typeof e == "boolean" || ["always", "desktop", "mobile"].includes(e)
  },
  ...re(),
  ...sa({
    mobile: null
  }),
  ...pe(),
  ...Yr({
    selectedClass: "v-slide-group-item--active"
  })
}, "VSlideGroup"), Ma = U()({
  name: "VSlideGroup",
  props: Zr(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isRtl: a
    } = ot(), {
      displayClasses: l,
      mobile: r
    } = nn(e), i = il(e, e.symbol), s = J(!1), o = J(0), u = J(0), c = J(0), f = _(() => e.direction === "horizontal"), {
      resizeRef: d,
      contentRect: m
    } = vn(), {
      resizeRef: v,
      contentRect: g
    } = vn(), b = Gg(), y = _(() => ({
      container: d.el,
      duration: 200,
      easing: "easeOutQuart"
    })), p = _(() => i.selected.value.length ? i.items.value.findIndex((R) => R.id === i.selected.value[0]) : -1), x = _(() => i.selected.value.length ? i.items.value.findIndex((R) => R.id === i.selected.value[i.selected.value.length - 1]) : -1);
    if (ke) {
      let R = -1;
      ne(() => [i.selected.value, m.value, g.value, f.value], () => {
        cancelAnimationFrame(R), R = requestAnimationFrame(() => {
          if (m.value && g.value) {
            const F = f.value ? "width" : "height";
            u.value = m.value[F], c.value = g.value[F], s.value = u.value + 1 < c.value;
          }
          if (p.value >= 0 && v.el) {
            const F = v.el.children[x.value];
            I(F, e.centerActive);
          }
        });
      });
    }
    const w = J(!1);
    function I(R, F) {
      let H = 0;
      F ? H = Gy({
        containerElement: d.el,
        isHorizontal: f.value,
        selectedElement: R
      }) : H = zy({
        containerElement: d.el,
        isHorizontal: f.value,
        isRtl: a.value,
        selectedElement: R
      }), k(H);
    }
    function k(R) {
      if (!ke || !d.el) return;
      const F = ta(f.value, d.el), H = Zu(f.value, a.value, d.el);
      if (!(js(f.value, d.el) <= F || // Prevent scrolling by only a couple of pixels, which doesn't look smooth
      Math.abs(R - H) < 16)) {
        if (f.value && a.value && d.el) {
          const {
            scrollWidth: te,
            offsetWidth: ue
          } = d.el;
          R = te - ue - R;
        }
        f.value ? b.horizontal(R, y.value) : b(R, y.value);
      }
    }
    function C(R) {
      const {
        scrollTop: F,
        scrollLeft: H
      } = R.target;
      o.value = f.value ? H : F;
    }
    function S(R) {
      if (w.value = !0, !(!s.value || !v.el)) {
        for (const F of R.composedPath())
          for (const H of v.el.children)
            if (H === F) {
              I(H);
              return;
            }
      }
    }
    function E(R) {
      w.value = !1;
    }
    let A = !1;
    function O(R) {
      var F;
      !A && !w.value && !(R.relatedTarget && ((F = v.el) != null && F.contains(R.relatedTarget))) && M(), A = !1;
    }
    function T() {
      A = !0;
    }
    function L(R) {
      if (!v.el) return;
      function F(H) {
        R.preventDefault(), M(H);
      }
      f.value ? R.key === "ArrowRight" ? F(a.value ? "prev" : "next") : R.key === "ArrowLeft" && F(a.value ? "next" : "prev") : R.key === "ArrowDown" ? F("next") : R.key === "ArrowUp" && F("prev"), R.key === "Home" ? F("first") : R.key === "End" && F("last");
    }
    function M(R) {
      var H, ie;
      if (!v.el) return;
      let F;
      if (!R)
        F = Oa(v.el)[0];
      else if (R === "next") {
        if (F = (H = v.el.querySelector(":focus")) == null ? void 0 : H.nextElementSibling, !F) return M("first");
      } else if (R === "prev") {
        if (F = (ie = v.el.querySelector(":focus")) == null ? void 0 : ie.previousElementSibling, !F) return M("last");
      } else R === "first" ? F = v.el.firstElementChild : R === "last" && (F = v.el.lastElementChild);
      F && F.focus({
        preventScroll: !0
      });
    }
    function j(R) {
      const F = f.value && a.value ? -1 : 1, H = (R === "prev" ? -F : F) * u.value;
      let ie = o.value + H;
      if (f.value && a.value && d.el) {
        const {
          scrollWidth: te,
          offsetWidth: ue
        } = d.el;
        ie += te - ue;
      }
      k(ie);
    }
    const z = _(() => ({
      next: i.next,
      prev: i.prev,
      select: i.select,
      isSelected: i.isSelected
    })), Q = _(() => {
      switch (e.showArrows) {
        case "always":
          return !0;
        case "desktop":
          return !r.value;
        case !0:
          return s.value || Math.abs(o.value) > 0;
        case "mobile":
          return r.value || s.value || Math.abs(o.value) > 0;
        default:
          return !r.value && (s.value || Math.abs(o.value) > 0);
      }
    }), le = _(() => Math.abs(o.value) > 1), V = _(() => {
      if (!d.value) return !1;
      const R = js(f.value, d.el), F = Yy(f.value, d.el);
      return R - F - Math.abs(o.value) > 1;
    });
    return Z(() => h(e.tag, {
      class: ["v-slide-group", {
        "v-slide-group--vertical": !f.value,
        "v-slide-group--has-affixes": Q.value,
        "v-slide-group--is-overflowing": s.value
      }, l.value, e.class],
      style: e.style,
      tabindex: w.value || i.selected.value.length ? -1 : 0,
      onFocus: O
    }, {
      default: () => {
        var R, F, H;
        return [Q.value && h("div", {
          key: "prev",
          class: ["v-slide-group__prev", {
            "v-slide-group__prev--disabled": !le.value
          }],
          onMousedown: T,
          onClick: () => le.value && j("prev")
        }, [((R = n.prev) == null ? void 0 : R.call(n, z.value)) ?? h(Fs, null, {
          default: () => [h(Ve, {
            icon: a.value ? e.nextIcon : e.prevIcon
          }, null)]
        })]), h("div", {
          key: "container",
          ref: d,
          class: "v-slide-group__container",
          onScroll: C
        }, [h("div", {
          ref: v,
          class: "v-slide-group__content",
          onFocusin: S,
          onFocusout: E,
          onKeydown: L
        }, [(F = n.default) == null ? void 0 : F.call(n, z.value)])]), Q.value && h("div", {
          key: "next",
          class: ["v-slide-group__next", {
            "v-slide-group__next--disabled": !V.value
          }],
          onMousedown: T,
          onClick: () => V.value && j("next")
        }, [((H = n.next) == null ? void 0 : H.call(n, z.value)) ?? h(Fs, null, {
          default: () => [h(Ve, {
            icon: a.value ? e.prevIcon : e.nextIcon
          }, null)]
        })])];
      }
    })), {
      selected: i.selected,
      scrollTo: j,
      scrollOffset: o,
      focus: M,
      hasPrev: le,
      hasNext: V
    };
  }
}), tc = Symbol.for("vuetify:v-chip-group"), Xy = D({
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: en
  },
  ...Zr(),
  ...re(),
  ...Yr({
    selectedClass: "v-chip--selected"
  }),
  ...pe(),
  ...xe(),
  ...Ft({
    variant: "tonal"
  })
}, "VChipGroup");
U()({
  name: "VChipGroup",
  props: Xy(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: a
    } = $e(e), {
      isSelected: l,
      select: r,
      next: i,
      prev: s,
      selected: o
    } = il(e, tc);
    return vt({
      VChip: {
        color: K(e, "color"),
        disabled: K(e, "disabled"),
        filter: K(e, "filter"),
        variant: K(e, "variant")
      }
    }), Z(() => {
      const u = Ma.filterProps(e);
      return h(Ma, q(u, {
        class: ["v-chip-group", {
          "v-chip-group--column": e.column
        }, a.value, e.class],
        style: e.style
      }), {
        default: () => {
          var c;
          return [(c = n.default) == null ? void 0 : c.call(n, {
            isSelected: l,
            select: r,
            next: i,
            prev: s,
            selected: o.value
          })];
        }
      });
    }), {};
  }
});
const Qy = D({
  activeClass: String,
  appendAvatar: String,
  appendIcon: oe,
  closable: Boolean,
  closeIcon: {
    type: oe,
    default: "$delete"
  },
  closeLabel: {
    type: String,
    default: "$vuetify.close"
  },
  draggable: Boolean,
  filter: Boolean,
  filterIcon: {
    type: String,
    default: "$complete"
  },
  label: Boolean,
  link: {
    type: Boolean,
    default: void 0
  },
  pill: Boolean,
  prependAvatar: String,
  prependIcon: oe,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  text: String,
  modelValue: {
    type: Boolean,
    default: !0
  },
  onClick: je(),
  onClickOnce: je(),
  ...xt(),
  ...re(),
  ...ct(),
  ...St(),
  ...qr(),
  ...et(),
  ...fl(),
  ...Rn(),
  ...pe({
    tag: "span"
  }),
  ...xe(),
  ...Ft({
    variant: "tonal"
  })
}, "VChip"), ei = U()({
  name: "VChip",
  directives: {
    Ripple: va
  },
  props: Qy(),
  emits: {
    "click:close": (e) => !0,
    "update:modelValue": (e) => !0,
    "group:selected": (e) => !0,
    click: (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: a,
      slots: l
    } = t;
    const {
      t: r
    } = Et(), {
      borderClasses: i
    } = Rt(e), {
      colorClasses: s,
      colorStyles: o,
      variantClasses: u
    } = Nn(e), {
      densityClasses: c
    } = wt(e), {
      elevationClasses: f
    } = Pt(e), {
      roundedClasses: d
    } = ut(e), {
      sizeClasses: m
    } = ca(e), {
      themeClasses: v
    } = $e(e), g = be(e, "modelValue"), b = Xr(e, tc, !1), y = dl(e, n), p = _(() => e.link !== !1 && y.isLink.value), x = _(() => !e.disabled && e.link !== !1 && (!!b || e.link || y.isClickable.value)), w = _(() => ({
      "aria-label": r(e.closeLabel),
      onClick(C) {
        C.preventDefault(), C.stopPropagation(), g.value = !1, a("click:close", C);
      }
    }));
    function I(C) {
      var S;
      a("click", C), x.value && ((S = y.navigate) == null || S.call(y, C), b == null || b.toggle());
    }
    function k(C) {
      (C.key === "Enter" || C.key === " ") && (C.preventDefault(), I(C));
    }
    return () => {
      const C = y.isLink.value ? "a" : e.tag, S = !!(e.appendIcon || e.appendAvatar), E = !!(S || l.append), A = !!(l.close || e.closable), O = !!(l.filter || e.filter) && b, T = !!(e.prependIcon || e.prependAvatar), L = !!(T || l.prepend), M = !b || b.isSelected.value;
      return g.value && Je(h(C, q({
        class: ["v-chip", {
          "v-chip--disabled": e.disabled,
          "v-chip--label": e.label,
          "v-chip--link": x.value,
          "v-chip--filter": O,
          "v-chip--pill": e.pill
        }, v.value, i.value, M ? s.value : void 0, c.value, f.value, d.value, m.value, u.value, b == null ? void 0 : b.selectedClass.value, e.class],
        style: [M ? o.value : void 0, e.style],
        disabled: e.disabled || void 0,
        draggable: e.draggable,
        tabindex: x.value ? 0 : void 0,
        onClick: I,
        onKeydown: x.value && !p.value && k
      }, y.linkProps), {
        default: () => {
          var j;
          return [Vn(x.value, "v-chip"), O && h(Nu, {
            key: "filter"
          }, {
            default: () => [Je(h("div", {
              class: "v-chip__filter"
            }, [l.filter ? h(Te, {
              key: "filter-defaults",
              disabled: !e.filterIcon,
              defaults: {
                VIcon: {
                  icon: e.filterIcon
                }
              }
            }, l.filter) : h(Ve, {
              key: "filter-icon",
              icon: e.filterIcon
            }, null)]), [[mn, b.isSelected.value]])]
          }), L && h("div", {
            key: "prepend",
            class: "v-chip__prepend"
          }, [l.prepend ? h(Te, {
            key: "prepend-defaults",
            disabled: !T,
            defaults: {
              VAvatar: {
                image: e.prependAvatar,
                start: !0
              },
              VIcon: {
                icon: e.prependIcon,
                start: !0
              }
            }
          }, l.prepend) : h(he, null, [e.prependIcon && h(Ve, {
            key: "prepend-icon",
            icon: e.prependIcon,
            start: !0
          }, null), e.prependAvatar && h(hn, {
            key: "prepend-avatar",
            image: e.prependAvatar,
            start: !0
          }, null)])]), h("div", {
            class: "v-chip__content",
            "data-no-activator": ""
          }, [((j = l.default) == null ? void 0 : j.call(l, {
            isSelected: b == null ? void 0 : b.isSelected.value,
            selectedClass: b == null ? void 0 : b.selectedClass.value,
            select: b == null ? void 0 : b.select,
            toggle: b == null ? void 0 : b.toggle,
            value: b == null ? void 0 : b.value.value,
            disabled: e.disabled
          })) ?? e.text]), E && h("div", {
            key: "append",
            class: "v-chip__append"
          }, [l.append ? h(Te, {
            key: "append-defaults",
            disabled: !S,
            defaults: {
              VAvatar: {
                end: !0,
                image: e.appendAvatar
              },
              VIcon: {
                end: !0,
                icon: e.appendIcon
              }
            }
          }, l.append) : h(he, null, [e.appendIcon && h(Ve, {
            key: "append-icon",
            end: !0,
            icon: e.appendIcon
          }, null), e.appendAvatar && h(hn, {
            key: "append-avatar",
            end: !0,
            image: e.appendAvatar
          }, null)])]), A && h("button", q({
            key: "close",
            class: "v-chip__close",
            type: "button",
            "data-testid": "close-chip"
          }, w.value), [l.close ? h(Te, {
            key: "close-defaults",
            defaults: {
              VIcon: {
                icon: e.closeIcon,
                size: "x-small"
              }
            }
          }, l.close) : h(Ve, {
            key: "close-icon",
            icon: e.closeIcon,
            size: "x-small"
          }, null)])];
        }
      }), [[Qt("ripple"), x.value && e.ripple, null]]);
    };
  }
}), Jy = D({
  fluid: {
    type: Boolean,
    default: !1
  },
  ...re(),
  ...mt(),
  ...pe()
}, "VContainer"), Zy = U()({
  name: "VContainer",
  props: Jy(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      rtlClasses: a
    } = ot(), {
      dimensionStyles: l
    } = gt(e);
    return Z(() => h(e.tag, {
      class: ["v-container", {
        "v-container--fluid": e.fluid
      }, a.value, e.class],
      style: [l.value, e.style]
    }, n)), {};
  }
}), nc = al.reduce((e, t) => (e[t] = {
  type: [Boolean, String, Number],
  default: !1
}, e), {}), ac = al.reduce((e, t) => {
  const n = "offset" + Ln(t);
  return e[n] = {
    type: [String, Number],
    default: null
  }, e;
}, {}), lc = al.reduce((e, t) => {
  const n = "order" + Ln(t);
  return e[n] = {
    type: [String, Number],
    default: null
  }, e;
}, {}), Us = {
  col: Object.keys(nc),
  offset: Object.keys(ac),
  order: Object.keys(lc)
};
function eb(e, t, n) {
  let a = e;
  if (!(n == null || n === !1)) {
    if (t) {
      const l = t.replace(e, "");
      a += `-${l}`;
    }
    return e === "col" && (a = "v-" + a), e === "col" && (n === "" || n === !0) || (a += `-${n}`), a.toLowerCase();
  }
}
const tb = ["auto", "start", "end", "center", "baseline", "stretch"], nb = D({
  cols: {
    type: [Boolean, String, Number],
    default: !1
  },
  ...nc,
  offset: {
    type: [String, Number],
    default: null
  },
  ...ac,
  order: {
    type: [String, Number],
    default: null
  },
  ...lc,
  alignSelf: {
    type: String,
    default: null,
    validator: (e) => tb.includes(e)
  },
  ...re(),
  ...pe()
}, "VCol"), ab = U()({
  name: "VCol",
  props: nb(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = _(() => {
      const l = [];
      let r;
      for (r in Us)
        Us[r].forEach((s) => {
          const o = e[s], u = eb(r, s, o);
          u && l.push(u);
        });
      const i = l.some((s) => s.startsWith("v-col-"));
      return l.push({
        // Default to .v-col if no other col-{bp}-* classes generated nor `cols` specified.
        "v-col": !i || !e.cols,
        [`v-col-${e.cols}`]: e.cols,
        [`offset-${e.offset}`]: e.offset,
        [`order-${e.order}`]: e.order,
        [`align-self-${e.alignSelf}`]: e.alignSelf
      }), l;
    });
    return () => {
      var l;
      return zt(e.tag, {
        class: [a.value, e.class],
        style: e.style
      }, (l = n.default) == null ? void 0 : l.call(n));
    };
  }
}), ti = ["start", "end", "center"], rc = ["space-between", "space-around", "space-evenly"];
function ni(e, t) {
  return al.reduce((n, a) => {
    const l = e + Ln(a);
    return n[l] = t(), n;
  }, {});
}
const lb = [...ti, "baseline", "stretch"], ic = (e) => lb.includes(e), sc = ni("align", () => ({
  type: String,
  default: null,
  validator: ic
})), rb = [...ti, ...rc], oc = (e) => rb.includes(e), uc = ni("justify", () => ({
  type: String,
  default: null,
  validator: oc
})), ib = [...ti, ...rc, "stretch"], cc = (e) => ib.includes(e), dc = ni("alignContent", () => ({
  type: String,
  default: null,
  validator: cc
})), zs = {
  align: Object.keys(sc),
  justify: Object.keys(uc),
  alignContent: Object.keys(dc)
}, sb = {
  align: "align",
  justify: "justify",
  alignContent: "align-content"
};
function ob(e, t, n) {
  let a = sb[e];
  if (n != null) {
    if (t) {
      const l = t.replace(e, "");
      a += `-${l}`;
    }
    return a += `-${n}`, a.toLowerCase();
  }
}
const ub = D({
  dense: Boolean,
  noGutters: Boolean,
  align: {
    type: String,
    default: null,
    validator: ic
  },
  ...sc,
  justify: {
    type: String,
    default: null,
    validator: oc
  },
  ...uc,
  alignContent: {
    type: String,
    default: null,
    validator: cc
  },
  ...dc,
  ...re(),
  ...pe()
}, "VRow"), cb = U()({
  name: "VRow",
  props: ub(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = _(() => {
      const l = [];
      let r;
      for (r in zs)
        zs[r].forEach((i) => {
          const s = e[i], o = ob(r, i, s);
          o && l.push(o);
        });
      return l.push({
        "v-row--no-gutters": e.noGutters,
        "v-row--dense": e.dense,
        [`align-${e.align}`]: e.align,
        [`justify-${e.justify}`]: e.justify,
        [`align-content-${e.alignContent}`]: e.alignContent
      }), l;
    });
    return () => {
      var l;
      return zt(e.tag, {
        class: ["v-row", a.value, e.class],
        style: e.style
      }, (l = n.default) == null ? void 0 : l.call(n));
    };
  }
}), db = nl("v-spacer", "div", "VSpacer"), fc = U()({
  name: "VCardActions",
  props: re(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return vt({
      VBtn: {
        slim: !0,
        variant: "text"
      }
    }), Z(() => {
      var a;
      return h("div", {
        class: ["v-card-actions", e.class],
        style: e.style
      }, [(a = n.default) == null ? void 0 : a.call(n)]);
    }), {};
  }
}), fb = D({
  opacity: [Number, String],
  ...re(),
  ...pe()
}, "VCardSubtitle"), vb = U()({
  name: "VCardSubtitle",
  props: fb(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return Z(() => h(e.tag, {
      class: ["v-card-subtitle", e.class],
      style: [{
        "--v-card-subtitle-opacity": e.opacity
      }, e.style]
    }, n)), {};
  }
}), hb = nl("v-card-title"), mb = D({
  appendAvatar: String,
  appendIcon: oe,
  prependAvatar: String,
  prependIcon: oe,
  subtitle: [String, Number],
  title: [String, Number],
  ...re(),
  ...ct()
}, "VCardItem"), gb = U()({
  name: "VCardItem",
  props: mb(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return Z(() => {
      var u;
      const a = !!(e.prependAvatar || e.prependIcon), l = !!(a || n.prepend), r = !!(e.appendAvatar || e.appendIcon), i = !!(r || n.append), s = !!(e.title != null || n.title), o = !!(e.subtitle != null || n.subtitle);
      return h("div", {
        class: ["v-card-item", e.class],
        style: e.style
      }, [l && h("div", {
        key: "prepend",
        class: "v-card-item__prepend"
      }, [n.prepend ? h(Te, {
        key: "prepend-defaults",
        disabled: !a,
        defaults: {
          VAvatar: {
            density: e.density,
            image: e.prependAvatar
          },
          VIcon: {
            density: e.density,
            icon: e.prependIcon
          }
        }
      }, n.prepend) : h(he, null, [e.prependAvatar && h(hn, {
        key: "prepend-avatar",
        density: e.density,
        image: e.prependAvatar
      }, null), e.prependIcon && h(Ve, {
        key: "prepend-icon",
        density: e.density,
        icon: e.prependIcon
      }, null)])]), h("div", {
        class: "v-card-item__content"
      }, [s && h(hb, {
        key: "title"
      }, {
        default: () => {
          var c;
          return [((c = n.title) == null ? void 0 : c.call(n)) ?? e.title];
        }
      }), o && h(vb, {
        key: "subtitle"
      }, {
        default: () => {
          var c;
          return [((c = n.subtitle) == null ? void 0 : c.call(n)) ?? e.subtitle];
        }
      }), (u = n.default) == null ? void 0 : u.call(n)]), i && h("div", {
        key: "append",
        class: "v-card-item__append"
      }, [n.append ? h(Te, {
        key: "append-defaults",
        disabled: !r,
        defaults: {
          VAvatar: {
            density: e.density,
            image: e.appendAvatar
          },
          VIcon: {
            density: e.density,
            icon: e.appendIcon
          }
        }
      }, n.append) : h(he, null, [e.appendIcon && h(Ve, {
        key: "append-icon",
        density: e.density,
        icon: e.appendIcon
      }, null), e.appendAvatar && h(hn, {
        key: "append-avatar",
        density: e.density,
        image: e.appendAvatar
      }, null)])])]);
    }), {};
  }
}), yb = D({
  opacity: [Number, String],
  ...re(),
  ...pe()
}, "VCardText"), vc = U()({
  name: "VCardText",
  props: yb(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return Z(() => h(e.tag, {
      class: ["v-card-text", e.class],
      style: [{
        "--v-card-text-opacity": e.opacity
      }, e.style]
    }, n)), {};
  }
}), bb = D({
  appendAvatar: String,
  appendIcon: oe,
  disabled: Boolean,
  flat: Boolean,
  hover: Boolean,
  image: String,
  link: {
    type: Boolean,
    default: void 0
  },
  prependAvatar: String,
  prependIcon: oe,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  subtitle: [String, Number],
  text: [String, Number],
  title: [String, Number],
  ...xt(),
  ...re(),
  ...ct(),
  ...mt(),
  ...St(),
  ...sl(),
  ...da(),
  ...ul(),
  ...et(),
  ...fl(),
  ...pe(),
  ...xe(),
  ...Ft({
    variant: "elevated"
  })
}, "VCard"), pb = U()({
  name: "VCard",
  directives: {
    Ripple: va
  },
  props: bb(),
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const {
      themeClasses: l
    } = $e(e), {
      borderClasses: r
    } = Rt(e), {
      colorClasses: i,
      colorStyles: s,
      variantClasses: o
    } = Nn(e), {
      densityClasses: u
    } = wt(e), {
      dimensionStyles: c
    } = gt(e), {
      elevationClasses: f
    } = Pt(e), {
      loaderClasses: d
    } = ol(e), {
      locationStyles: m
    } = fa(e), {
      positionClasses: v
    } = cl(e), {
      roundedClasses: g
    } = ut(e), b = dl(e, n), y = _(() => e.link !== !1 && b.isLink.value), p = _(() => !e.disabled && e.link !== !1 && (e.link || b.isClickable.value));
    return Z(() => {
      const x = y.value ? "a" : e.tag, w = !!(a.title || e.title != null), I = !!(a.subtitle || e.subtitle != null), k = w || I, C = !!(a.append || e.appendAvatar || e.appendIcon), S = !!(a.prepend || e.prependAvatar || e.prependIcon), E = !!(a.image || e.image), A = k || S || C, O = !!(a.text || e.text != null);
      return Je(h(x, q({
        class: ["v-card", {
          "v-card--disabled": e.disabled,
          "v-card--flat": e.flat,
          "v-card--hover": e.hover && !(e.disabled || e.flat),
          "v-card--link": p.value
        }, l.value, r.value, i.value, u.value, f.value, d.value, v.value, g.value, o.value, e.class],
        style: [s.value, c.value, m.value, e.style],
        onClick: p.value && b.navigate,
        tabindex: e.disabled ? -1 : void 0
      }, b.linkProps), {
        default: () => {
          var T;
          return [E && h("div", {
            key: "image",
            class: "v-card__image"
          }, [a.image ? h(Te, {
            key: "image-defaults",
            disabled: !e.image,
            defaults: {
              VImg: {
                cover: !0,
                src: e.image
              }
            }
          }, a.image) : h(rl, {
            key: "image-img",
            cover: !0,
            src: e.image
          }, null)]), h(Qr, {
            name: "v-card",
            active: !!e.loading,
            color: typeof e.loading == "boolean" ? void 0 : e.loading
          }, {
            default: a.loader
          }), A && h(gb, {
            key: "item",
            prependAvatar: e.prependAvatar,
            prependIcon: e.prependIcon,
            title: e.title,
            subtitle: e.subtitle,
            appendAvatar: e.appendAvatar,
            appendIcon: e.appendIcon
          }, {
            default: a.item,
            prepend: a.prepend,
            title: a.title,
            subtitle: a.subtitle,
            append: a.append
          }), O && h(vc, {
            key: "text"
          }, {
            default: () => {
              var L;
              return [((L = a.text) == null ? void 0 : L.call(a)) ?? e.text];
            }
          }), (T = a.default) == null ? void 0 : T.call(a), a.actions && h(fc, null, {
            default: a.actions
          }), Vn(p.value, "v-card")];
        }
      }), [[Qt("ripple"), p.value && e.ripple]]);
    }), {};
  }
});
function _b() {
  const e = Y([]);
  qd(() => e.value = []);
  function t(n, a) {
    e.value[a] = n;
  }
  return {
    refs: e,
    updateRef: t
  };
}
const Sb = D({
  activeColor: String,
  start: {
    type: [Number, String],
    default: 1
  },
  modelValue: {
    type: Number,
    default: (e) => e.start
  },
  disabled: Boolean,
  length: {
    type: [Number, String],
    default: 1,
    validator: (e) => e % 1 === 0
  },
  totalVisible: [Number, String],
  firstIcon: {
    type: oe,
    default: "$first"
  },
  prevIcon: {
    type: oe,
    default: "$prev"
  },
  nextIcon: {
    type: oe,
    default: "$next"
  },
  lastIcon: {
    type: oe,
    default: "$last"
  },
  ariaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.root"
  },
  pageAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.page"
  },
  currentPageAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.currentPage"
  },
  firstAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.first"
  },
  previousAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.previous"
  },
  nextAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.next"
  },
  lastAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.last"
  },
  ellipsis: {
    type: String,
    default: "..."
  },
  showFirstLastPage: Boolean,
  ...xt(),
  ...re(),
  ...ct(),
  ...St(),
  ...et(),
  ...Rn(),
  ...pe({
    tag: "nav"
  }),
  ...xe(),
  ...Ft({
    variant: "text"
  })
}, "VPagination"), yr = U()({
  name: "VPagination",
  props: Sb(),
  emits: {
    "update:modelValue": (e) => !0,
    first: (e) => !0,
    prev: (e) => !0,
    next: (e) => !0,
    last: (e) => !0
  },
  setup(e, t) {
    let {
      slots: n,
      emit: a
    } = t;
    const l = be(e, "modelValue"), {
      t: r,
      n: i
    } = Et(), {
      isRtl: s
    } = ot(), {
      themeClasses: o
    } = $e(e), {
      width: u
    } = nn(), c = J(-1);
    vt(void 0, {
      scoped: !0
    });
    const {
      resizeRef: f
    } = vn((S) => {
      if (!S.length) return;
      const {
        target: E,
        contentRect: A
      } = S[0], O = E.querySelector(".v-pagination__list > *");
      if (!O) return;
      const T = A.width, L = O.offsetWidth + parseFloat(getComputedStyle(O).marginRight) * 2;
      c.value = g(T, L);
    }), d = _(() => parseInt(e.length, 10)), m = _(() => parseInt(e.start, 10)), v = _(() => e.totalVisible != null ? parseInt(e.totalVisible, 10) : c.value >= 0 ? c.value : g(u.value, 58));
    function g(S, E) {
      const A = e.showFirstLastPage ? 5 : 3;
      return Math.max(0, Math.floor(
        // Round to two decimal places to avoid floating point errors
        +((S - E * A) / E).toFixed(2)
      ));
    }
    const b = _(() => {
      if (d.value <= 0 || isNaN(d.value) || d.value > Number.MAX_SAFE_INTEGER) return [];
      if (v.value <= 0) return [];
      if (v.value === 1) return [l.value];
      if (d.value <= v.value)
        return Wn(d.value, m.value);
      const S = v.value % 2 === 0, E = S ? v.value / 2 : Math.floor(v.value / 2), A = S ? E : E + 1, O = d.value - E;
      if (A - l.value >= 0)
        return [...Wn(Math.max(1, v.value - 1), m.value), e.ellipsis, d.value];
      if (l.value - O >= (S ? 1 : 0)) {
        const T = v.value - 1, L = d.value - T + m.value;
        return [m.value, e.ellipsis, ...Wn(T, L)];
      } else {
        const T = Math.max(1, v.value - 3), L = T === 1 ? l.value : l.value - Math.ceil(T / 2) + m.value;
        return [m.value, e.ellipsis, ...Wn(T, L), e.ellipsis, d.value];
      }
    });
    function y(S, E, A) {
      S.preventDefault(), l.value = E, A && a(A, E);
    }
    const {
      refs: p,
      updateRef: x
    } = _b();
    vt({
      VPaginationBtn: {
        color: K(e, "color"),
        border: K(e, "border"),
        density: K(e, "density"),
        size: K(e, "size"),
        variant: K(e, "variant"),
        rounded: K(e, "rounded"),
        elevation: K(e, "elevation")
      }
    });
    const w = _(() => b.value.map((S, E) => {
      const A = (O) => x(O, E);
      if (typeof S == "string")
        return {
          isActive: !1,
          key: `ellipsis-${E}`,
          page: S,
          props: {
            ref: A,
            ellipsis: !0,
            icon: !0,
            disabled: !0
          }
        };
      {
        const O = S === l.value;
        return {
          isActive: O,
          key: S,
          page: i(S),
          props: {
            ref: A,
            ellipsis: !1,
            icon: !0,
            disabled: !!e.disabled || +e.length < 2,
            color: O ? e.activeColor : e.color,
            "aria-current": O,
            "aria-label": r(O ? e.currentPageAriaLabel : e.pageAriaLabel, S),
            onClick: (T) => y(T, S)
          }
        };
      }
    })), I = _(() => {
      const S = !!e.disabled || l.value <= m.value, E = !!e.disabled || l.value >= m.value + d.value - 1;
      return {
        first: e.showFirstLastPage ? {
          icon: s.value ? e.lastIcon : e.firstIcon,
          onClick: (A) => y(A, m.value, "first"),
          disabled: S,
          "aria-label": r(e.firstAriaLabel),
          "aria-disabled": S
        } : void 0,
        prev: {
          icon: s.value ? e.nextIcon : e.prevIcon,
          onClick: (A) => y(A, l.value - 1, "prev"),
          disabled: S,
          "aria-label": r(e.previousAriaLabel),
          "aria-disabled": S
        },
        next: {
          icon: s.value ? e.prevIcon : e.nextIcon,
          onClick: (A) => y(A, l.value + 1, "next"),
          disabled: E,
          "aria-label": r(e.nextAriaLabel),
          "aria-disabled": E
        },
        last: e.showFirstLastPage ? {
          icon: s.value ? e.firstIcon : e.lastIcon,
          onClick: (A) => y(A, m.value + d.value - 1, "last"),
          disabled: E,
          "aria-label": r(e.lastAriaLabel),
          "aria-disabled": E
        } : void 0
      };
    });
    function k() {
      var E;
      const S = l.value - m.value;
      (E = p.value[S]) == null || E.$el.focus();
    }
    function C(S) {
      S.key === ls.left && !e.disabled && l.value > +e.start ? (l.value = l.value - 1, We(k)) : S.key === ls.right && !e.disabled && l.value < m.value + d.value - 1 && (l.value = l.value + 1, We(k));
    }
    return Z(() => h(e.tag, {
      ref: f,
      class: ["v-pagination", o.value, e.class],
      style: e.style,
      role: "navigation",
      "aria-label": r(e.ariaLabel),
      onKeydown: C,
      "data-test": "v-pagination-root"
    }, {
      default: () => [h("ul", {
        class: "v-pagination__list"
      }, [e.showFirstLastPage && h("li", {
        key: "first",
        class: "v-pagination__first",
        "data-test": "v-pagination-first"
      }, [n.first ? n.first(I.value.first) : h(at, q({
        _as: "VPaginationBtn"
      }, I.value.first), null)]), h("li", {
        key: "prev",
        class: "v-pagination__prev",
        "data-test": "v-pagination-prev"
      }, [n.prev ? n.prev(I.value.prev) : h(at, q({
        _as: "VPaginationBtn"
      }, I.value.prev), null)]), w.value.map((S, E) => h("li", {
        key: S.key,
        class: ["v-pagination__item", {
          "v-pagination__item--is-active": S.isActive
        }],
        "data-test": "v-pagination-item"
      }, [n.item ? n.item(S) : h(at, q({
        _as: "VPaginationBtn"
      }, S.props), {
        default: () => [S.page]
      })])), h("li", {
        key: "next",
        class: "v-pagination__next",
        "data-test": "v-pagination-next"
      }, [n.next ? n.next(I.value.next) : h(at, q({
        _as: "VPaginationBtn"
      }, I.value.next), null)]), e.showFirstLastPage && h("li", {
        key: "last",
        class: "v-pagination__last",
        "data-test": "v-pagination-last"
      }, [n.last ? n.last(I.value.last) : h(at, q({
        _as: "VPaginationBtn"
      }, I.value.last), null)])])]
    })), {};
  }
}), wb = D({
  text: String,
  onClick: je(),
  ...re(),
  ...xe()
}, "VLabel"), hc = U()({
  name: "VLabel",
  props: wb(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return Z(() => {
      var a;
      return h("label", {
        class: ["v-label", {
          "v-label--clickable": !!e.onClick
        }, e.class],
        style: e.style,
        onClick: e.onClick
      }, [e.text, (a = n.default) == null ? void 0 : a.call(n)]);
    }), {};
  }
}), mc = Symbol.for("vuetify:selection-control-group"), gc = D({
  color: String,
  disabled: {
    type: Boolean,
    default: null
  },
  defaultsTarget: String,
  error: Boolean,
  id: String,
  inline: Boolean,
  falseIcon: oe,
  trueIcon: oe,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  multiple: {
    type: Boolean,
    default: null
  },
  name: String,
  readonly: {
    type: Boolean,
    default: null
  },
  modelValue: null,
  type: String,
  valueComparator: {
    type: Function,
    default: en
  },
  ...re(),
  ...ct(),
  ...xe()
}, "SelectionControlGroup"), Cb = D({
  ...gc({
    defaultsTarget: "VSelectionControl"
  })
}, "VSelectionControlGroup");
U()({
  name: "VSelectionControlGroup",
  props: Cb(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = be(e, "modelValue"), l = Nt(), r = _(() => e.id || `v-selection-control-group-${l}`), i = _(() => e.name || r.value), s = /* @__PURE__ */ new Set();
    return Ee(mc, {
      modelValue: a,
      forceUpdate: () => {
        s.forEach((o) => o());
      },
      onForceUpdate: (o) => {
        s.add(o), Ge(() => {
          s.delete(o);
        });
      }
    }), vt({
      [e.defaultsTarget]: {
        color: K(e, "color"),
        disabled: K(e, "disabled"),
        density: K(e, "density"),
        error: K(e, "error"),
        inline: K(e, "inline"),
        modelValue: a,
        multiple: _(() => !!e.multiple || e.multiple == null && Array.isArray(a.value)),
        name: i,
        falseIcon: K(e, "falseIcon"),
        trueIcon: K(e, "trueIcon"),
        readonly: K(e, "readonly"),
        ripple: K(e, "ripple"),
        type: K(e, "type"),
        valueComparator: K(e, "valueComparator")
      }
    }), Z(() => {
      var o;
      return h("div", {
        class: ["v-selection-control-group", {
          "v-selection-control-group--inline": e.inline
        }, e.class],
        style: e.style,
        role: e.type === "radio" ? "radiogroup" : void 0
      }, [(o = n.default) == null ? void 0 : o.call(n)]);
    }), {};
  }
});
const yc = D({
  label: String,
  baseColor: String,
  trueValue: null,
  falseValue: null,
  value: null,
  ...re(),
  ...gc()
}, "VSelectionControl");
function Ib(e) {
  const t = ye(mc, void 0), {
    densityClasses: n
  } = wt(e), a = be(e, "modelValue"), l = _(() => e.trueValue !== void 0 ? e.trueValue : e.value !== void 0 ? e.value : !0), r = _(() => e.falseValue !== void 0 ? e.falseValue : !1), i = _(() => !!e.multiple || e.multiple == null && Array.isArray(a.value)), s = _({
    get() {
      const m = t ? t.modelValue.value : a.value;
      return i.value ? Ke(m).some((v) => e.valueComparator(v, l.value)) : e.valueComparator(m, l.value);
    },
    set(m) {
      if (e.readonly) return;
      const v = m ? l.value : r.value;
      let g = v;
      i.value && (g = m ? [...Ke(a.value), v] : Ke(a.value).filter((b) => !e.valueComparator(b, l.value))), t ? t.modelValue.value = g : a.value = g;
    }
  }), {
    textColorClasses: o,
    textColorStyles: u
  } = kt(_(() => {
    if (!(e.error || e.disabled))
      return s.value ? e.color : e.baseColor;
  })), {
    backgroundColorClasses: c,
    backgroundColorStyles: f
  } = Qe(_(() => s.value && !e.error && !e.disabled ? e.color : e.baseColor)), d = _(() => s.value ? e.trueIcon : e.falseIcon);
  return {
    group: t,
    densityClasses: n,
    trueValue: l,
    falseValue: r,
    model: s,
    textColorClasses: o,
    textColorStyles: u,
    backgroundColorClasses: c,
    backgroundColorStyles: f,
    icon: d
  };
}
const Gs = U()({
  name: "VSelectionControl",
  directives: {
    Ripple: va
  },
  inheritAttrs: !1,
  props: yc(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const {
      group: l,
      densityClasses: r,
      icon: i,
      model: s,
      textColorClasses: o,
      textColorStyles: u,
      backgroundColorClasses: c,
      backgroundColorStyles: f,
      trueValue: d
    } = Ib(e), m = Nt(), v = J(!1), g = J(!1), b = Y(), y = _(() => e.id || `input-${m}`), p = _(() => !e.disabled && !e.readonly);
    l == null || l.onForceUpdate(() => {
      b.value && (b.value.checked = s.value);
    });
    function x(C) {
      p.value && (v.value = !0, La(C.target, ":focus-visible") !== !1 && (g.value = !0));
    }
    function w() {
      v.value = !1, g.value = !1;
    }
    function I(C) {
      C.stopPropagation();
    }
    function k(C) {
      if (!p.value) {
        b.value && (b.value.checked = s.value);
        return;
      }
      e.readonly && l && We(() => l.forceUpdate()), s.value = C.target.checked;
    }
    return Z(() => {
      var O, T;
      const C = a.label ? a.label({
        label: e.label,
        props: {
          for: y.value
        }
      }) : e.label, [S, E] = au(n), A = h("input", q({
        ref: b,
        checked: s.value,
        disabled: !!e.disabled,
        id: y.value,
        onBlur: w,
        onFocus: x,
        onInput: k,
        "aria-disabled": !!e.disabled,
        "aria-label": e.label,
        type: e.type,
        value: d.value,
        name: e.name,
        "aria-checked": e.type === "checkbox" ? s.value : void 0
      }, E), null);
      return h("div", q({
        class: ["v-selection-control", {
          "v-selection-control--dirty": s.value,
          "v-selection-control--disabled": e.disabled,
          "v-selection-control--error": e.error,
          "v-selection-control--focused": v.value,
          "v-selection-control--focus-visible": g.value,
          "v-selection-control--inline": e.inline
        }, r.value, e.class]
      }, S, {
        style: e.style
      }), [h("div", {
        class: ["v-selection-control__wrapper", o.value],
        style: u.value
      }, [(O = a.default) == null ? void 0 : O.call(a, {
        backgroundColorClasses: c,
        backgroundColorStyles: f
      }), Je(h("div", {
        class: ["v-selection-control__input"]
      }, [((T = a.input) == null ? void 0 : T.call(a, {
        model: s,
        textColorClasses: o,
        textColorStyles: u,
        backgroundColorClasses: c,
        backgroundColorStyles: f,
        inputNode: A,
        icon: i.value,
        props: {
          onFocus: x,
          onBlur: w,
          id: y.value
        }
      })) ?? h(he, null, [i.value && h(Ve, {
        key: "icon",
        icon: i.value
      }, null), A])]), [[Qt("ripple"), e.ripple && [!e.disabled && !e.readonly, null, ["center", "circle"]]]])]), C && h(hc, {
        for: y.value,
        onClick: I
      }, {
        default: () => [C]
      })]);
    }), {
      isFocused: v,
      input: b
    };
  }
}), kb = D({
  indeterminate: Boolean,
  indeterminateIcon: {
    type: oe,
    default: "$checkboxIndeterminate"
  },
  ...yc({
    falseIcon: "$checkboxOff",
    trueIcon: "$checkboxOn"
  })
}, "VCheckboxBtn"), vl = U()({
  name: "VCheckboxBtn",
  props: kb(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:indeterminate": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = be(e, "indeterminate"), l = be(e, "modelValue");
    function r(o) {
      a.value && (a.value = !1);
    }
    const i = _(() => a.value ? e.indeterminateIcon : e.falseIcon), s = _(() => a.value ? e.indeterminateIcon : e.trueIcon);
    return Z(() => {
      const o = tn(Gs.filterProps(e), ["modelValue"]);
      return h(Gs, q(o, {
        modelValue: l.value,
        "onUpdate:modelValue": [(u) => l.value = u, r],
        class: ["v-checkbox-btn", e.class],
        style: e.style,
        type: "checkbox",
        falseIcon: i.value,
        trueIcon: s.value,
        "aria-checked": a.value ? "mixed" : void 0
      }), n);
    }), {};
  }
});
function bc(e) {
  const {
    t
  } = Et();
  function n(a) {
    let {
      name: l
    } = a;
    const r = {
      prepend: "prependAction",
      prependInner: "prependAction",
      append: "appendAction",
      appendInner: "appendAction",
      clear: "clear"
    }[l], i = e[`onClick:${l}`], s = i && r ? t(`$vuetify.input.${r}`, e.label ?? "") : void 0;
    return h(Ve, {
      icon: e[`${l}Icon`],
      "aria-label": s,
      onClick: i
    }, null);
  }
  return {
    InputIcon: n
  };
}
const Eb = D({
  active: Boolean,
  color: String,
  messages: {
    type: [Array, String],
    default: () => []
  },
  ...re(),
  ...oa({
    transition: {
      component: Lu,
      leaveAbsolute: !0,
      group: !0
    }
  })
}, "VMessages"), xb = U()({
  name: "VMessages",
  props: Eb(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = _(() => Ke(e.messages)), {
      textColorClasses: l,
      textColorStyles: r
    } = kt(_(() => e.color));
    return Z(() => h(jt, {
      transition: e.transition,
      tag: "div",
      class: ["v-messages", l.value, e.class],
      style: [r.value, e.style],
      role: "alert",
      "aria-live": "polite"
    }, {
      default: () => [e.active && a.value.map((i, s) => h("div", {
        class: "v-messages__message",
        key: `${s}-${a.value}`
      }, [n.message ? n.message({
        message: i
      }) : i]))]
    })), {};
  }
}), pc = D({
  focused: Boolean,
  "onUpdate:focused": je()
}, "focus");
function _c(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vt();
  const n = be(e, "focused"), a = _(() => ({
    [`${t}--focused`]: n.value
  }));
  function l() {
    n.value = !0;
  }
  function r() {
    n.value = !1;
  }
  return {
    focusClasses: a,
    isFocused: n,
    focus: l,
    blur: r
  };
}
const Pb = Symbol.for("vuetify:form");
function Sc() {
  return ye(Pb, null);
}
const $b = D({
  disabled: {
    type: Boolean,
    default: null
  },
  error: Boolean,
  errorMessages: {
    type: [Array, String],
    default: () => []
  },
  maxErrors: {
    type: [Number, String],
    default: 1
  },
  name: String,
  label: String,
  readonly: {
    type: Boolean,
    default: null
  },
  rules: {
    type: Array,
    default: () => []
  },
  modelValue: null,
  validateOn: String,
  validationValue: null,
  ...pc()
}, "validation");
function Tb(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vt(), n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Nt();
  const a = be(e, "modelValue"), l = _(() => e.validationValue === void 0 ? a.value : e.validationValue), r = Sc(), i = Y([]), s = J(!0), o = _(() => !!(Ke(a.value === "" ? null : a.value).length || Ke(l.value === "" ? null : l.value).length)), u = _(() => !!(e.disabled ?? (r == null ? void 0 : r.isDisabled.value))), c = _(() => !!(e.readonly ?? (r == null ? void 0 : r.isReadonly.value))), f = _(() => {
    var I;
    return (I = e.errorMessages) != null && I.length ? Ke(e.errorMessages).concat(i.value).slice(0, Math.max(0, +e.maxErrors)) : i.value;
  }), d = _(() => {
    let I = (e.validateOn ?? (r == null ? void 0 : r.validateOn.value)) || "input";
    I === "lazy" && (I = "input lazy"), I === "eager" && (I = "input eager");
    const k = new Set((I == null ? void 0 : I.split(" ")) ?? []);
    return {
      input: k.has("input"),
      blur: k.has("blur") || k.has("input") || k.has("invalid-input"),
      invalidInput: k.has("invalid-input"),
      lazy: k.has("lazy"),
      eager: k.has("eager")
    };
  }), m = _(() => {
    var I;
    return e.error || (I = e.errorMessages) != null && I.length ? !1 : e.rules.length ? s.value ? i.value.length || d.value.lazy ? null : !0 : !i.value.length : !0;
  }), v = J(!1), g = _(() => ({
    [`${t}--error`]: m.value === !1,
    [`${t}--dirty`]: o.value,
    [`${t}--disabled`]: u.value,
    [`${t}--readonly`]: c.value
  })), b = Ae("validation"), y = _(() => e.name ?? De(n));
  bo(() => {
    r == null || r.register({
      id: y.value,
      vm: b,
      validate: w,
      reset: p,
      resetValidation: x
    });
  }), st(() => {
    r == null || r.unregister(y.value);
  }), Lt(async () => {
    d.value.lazy || await w(!d.value.eager), r == null || r.update(y.value, m.value, f.value);
  }), _t(() => d.value.input || d.value.invalidInput && m.value === !1, () => {
    ne(l, () => {
      if (l.value != null)
        w();
      else if (e.focused) {
        const I = ne(() => e.focused, (k) => {
          k || w(), I();
        });
      }
    });
  }), _t(() => d.value.blur, () => {
    ne(() => e.focused, (I) => {
      I || w();
    });
  }), ne([m, f], () => {
    r == null || r.update(y.value, m.value, f.value);
  });
  async function p() {
    a.value = null, await We(), await x();
  }
  async function x() {
    s.value = !0, d.value.lazy ? i.value = [] : await w(!d.value.eager);
  }
  async function w() {
    let I = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    const k = [];
    v.value = !0;
    for (const C of e.rules) {
      if (k.length >= +(e.maxErrors ?? 1))
        break;
      const E = await (typeof C == "function" ? C : () => C)(l.value);
      if (E !== !0) {
        if (E !== !1 && typeof E != "string") {
          console.warn(`${E} is not a valid value. Rule functions must return boolean true or a string.`);
          continue;
        }
        k.push(E || "");
      }
    }
    return i.value = k, v.value = !1, s.value = I, i.value;
  }
  return {
    errorMessages: f,
    isDirty: o,
    isDisabled: u,
    isReadonly: c,
    isPristine: s,
    isValid: m,
    isValidating: v,
    reset: p,
    resetValidation: x,
    validate: w,
    validationClasses: g
  };
}
const wc = D({
  id: String,
  appendIcon: oe,
  centerAffix: {
    type: Boolean,
    default: !0
  },
  prependIcon: oe,
  hideDetails: [Boolean, String],
  hideSpinButtons: Boolean,
  hint: String,
  persistentHint: Boolean,
  messages: {
    type: [Array, String],
    default: () => []
  },
  direction: {
    type: String,
    default: "horizontal",
    validator: (e) => ["horizontal", "vertical"].includes(e)
  },
  "onClick:prepend": je(),
  "onClick:append": je(),
  ...re(),
  ...ct(),
  ...Qm(mt(), ["maxWidth", "minWidth", "width"]),
  ...xe(),
  ...$b()
}, "VInput"), Ys = U()({
  name: "VInput",
  props: {
    ...wc()
  },
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: a,
      emit: l
    } = t;
    const {
      densityClasses: r
    } = wt(e), {
      dimensionStyles: i
    } = gt(e), {
      themeClasses: s
    } = $e(e), {
      rtlClasses: o
    } = ot(), {
      InputIcon: u
    } = bc(e), c = Nt(), f = _(() => e.id || `input-${c}`), d = _(() => `${f.value}-messages`), {
      errorMessages: m,
      isDirty: v,
      isDisabled: g,
      isReadonly: b,
      isPristine: y,
      isValid: p,
      isValidating: x,
      reset: w,
      resetValidation: I,
      validate: k,
      validationClasses: C
    } = Tb(e, "v-input", f), S = _(() => ({
      id: f,
      messagesId: d,
      isDirty: v,
      isDisabled: g,
      isReadonly: b,
      isPristine: y,
      isValid: p,
      isValidating: x,
      reset: w,
      resetValidation: I,
      validate: k
    })), E = _(() => {
      var A;
      return (A = e.errorMessages) != null && A.length || !y.value && m.value.length ? m.value : e.hint && (e.persistentHint || e.focused) ? e.hint : e.messages;
    });
    return Z(() => {
      var M, j, z, Q;
      const A = !!(a.prepend || e.prependIcon), O = !!(a.append || e.appendIcon), T = E.value.length > 0, L = !e.hideDetails || e.hideDetails === "auto" && (T || !!a.details);
      return h("div", {
        class: ["v-input", `v-input--${e.direction}`, {
          "v-input--center-affix": e.centerAffix,
          "v-input--hide-spin-buttons": e.hideSpinButtons
        }, r.value, s.value, o.value, C.value, e.class],
        style: [i.value, e.style]
      }, [A && h("div", {
        key: "prepend",
        class: "v-input__prepend"
      }, [(M = a.prepend) == null ? void 0 : M.call(a, S.value), e.prependIcon && h(u, {
        key: "prepend-icon",
        name: "prepend"
      }, null)]), a.default && h("div", {
        class: "v-input__control"
      }, [(j = a.default) == null ? void 0 : j.call(a, S.value)]), O && h("div", {
        key: "append",
        class: "v-input__append"
      }, [e.appendIcon && h(u, {
        key: "append-icon",
        name: "append"
      }, null), (z = a.append) == null ? void 0 : z.call(a, S.value)]), L && h("div", {
        class: "v-input__details"
      }, [h(xb, {
        id: d.value,
        active: T,
        messages: E.value
      }, {
        message: a.message
      }), (Q = a.details) == null ? void 0 : Q.call(a, S.value)])]);
    }), {
      reset: w,
      resetValidation: I,
      validate: k,
      isValid: p,
      errorMessages: m
    };
  }
}), br = Symbol.for("vuetify:list");
function Cc() {
  const e = ye(br, {
    hasPrepend: J(!1),
    updateHasPrepend: () => null
  }), t = {
    hasPrepend: J(!1),
    updateHasPrepend: (n) => {
      n && (t.hasPrepend.value = n);
    }
  };
  return Ee(br, t), e;
}
function Ic() {
  return ye(br, null);
}
const ai = (e) => {
  const t = {
    activate: (n) => {
      let {
        id: a,
        value: l,
        activated: r
      } = n;
      return a = Fe(a), e && !l && r.size === 1 && r.has(a) || (l ? r.add(a) : r.delete(a)), r;
    },
    in: (n, a, l) => {
      let r = /* @__PURE__ */ new Set();
      if (n != null)
        for (const i of Ke(n))
          r = t.activate({
            id: i,
            value: !0,
            activated: new Set(r),
            children: a,
            parents: l
          });
      return r;
    },
    out: (n) => Array.from(n)
  };
  return t;
}, kc = (e) => {
  const t = ai(e);
  return {
    activate: (a) => {
      let {
        activated: l,
        id: r,
        ...i
      } = a;
      r = Fe(r);
      const s = l.has(r) ? /* @__PURE__ */ new Set([r]) : /* @__PURE__ */ new Set();
      return t.activate({
        ...i,
        id: r,
        activated: s
      });
    },
    in: (a, l, r) => {
      let i = /* @__PURE__ */ new Set();
      if (a != null) {
        const s = Ke(a);
        s.length && (i = t.in(s.slice(0, 1), l, r));
      }
      return i;
    },
    out: (a, l, r) => t.out(a, l, r)
  };
}, Ab = (e) => {
  const t = ai(e);
  return {
    activate: (a) => {
      let {
        id: l,
        activated: r,
        children: i,
        ...s
      } = a;
      return l = Fe(l), i.has(l) ? r : t.activate({
        id: l,
        activated: r,
        children: i,
        ...s
      });
    },
    in: t.in,
    out: t.out
  };
}, Ob = (e) => {
  const t = kc(e);
  return {
    activate: (a) => {
      let {
        id: l,
        activated: r,
        children: i,
        ...s
      } = a;
      return l = Fe(l), i.has(l) ? r : t.activate({
        id: l,
        activated: r,
        children: i,
        ...s
      });
    },
    in: t.in,
    out: t.out
  };
}, Lb = {
  open: (e) => {
    let {
      id: t,
      value: n,
      opened: a,
      parents: l
    } = e;
    if (n) {
      const r = /* @__PURE__ */ new Set();
      r.add(t);
      let i = l.get(t);
      for (; i != null; )
        r.add(i), i = l.get(i);
      return r;
    } else
      return a.delete(t), a;
  },
  select: () => null
}, Ec = {
  open: (e) => {
    let {
      id: t,
      value: n,
      opened: a,
      parents: l
    } = e;
    if (n) {
      let r = l.get(t);
      for (a.add(t); r != null && r !== t; )
        a.add(r), r = l.get(r);
      return a;
    } else
      a.delete(t);
    return a;
  },
  select: () => null
}, Vb = {
  open: Ec.open,
  select: (e) => {
    let {
      id: t,
      value: n,
      opened: a,
      parents: l
    } = e;
    if (!n) return a;
    const r = [];
    let i = l.get(t);
    for (; i != null; )
      r.push(i), i = l.get(i);
    return new Set(r);
  }
}, li = (e) => {
  const t = {
    select: (n) => {
      let {
        id: a,
        value: l,
        selected: r
      } = n;
      if (a = Fe(a), e && !l) {
        const i = Array.from(r.entries()).reduce((s, o) => {
          let [u, c] = o;
          return c === "on" && s.push(u), s;
        }, []);
        if (i.length === 1 && i[0] === a) return r;
      }
      return r.set(a, l ? "on" : "off"), r;
    },
    in: (n, a, l) => {
      let r = /* @__PURE__ */ new Map();
      for (const i of n || [])
        r = t.select({
          id: i,
          value: !0,
          selected: new Map(r),
          children: a,
          parents: l
        });
      return r;
    },
    out: (n) => {
      const a = [];
      for (const [l, r] of n.entries())
        r === "on" && a.push(l);
      return a;
    }
  };
  return t;
}, xc = (e) => {
  const t = li(e);
  return {
    select: (a) => {
      let {
        selected: l,
        id: r,
        ...i
      } = a;
      r = Fe(r);
      const s = l.has(r) ? /* @__PURE__ */ new Map([[r, l.get(r)]]) : /* @__PURE__ */ new Map();
      return t.select({
        ...i,
        id: r,
        selected: s
      });
    },
    in: (a, l, r) => {
      let i = /* @__PURE__ */ new Map();
      return a != null && a.length && (i = t.in(a.slice(0, 1), l, r)), i;
    },
    out: (a, l, r) => t.out(a, l, r)
  };
}, Nb = (e) => {
  const t = li(e);
  return {
    select: (a) => {
      let {
        id: l,
        selected: r,
        children: i,
        ...s
      } = a;
      return l = Fe(l), i.has(l) ? r : t.select({
        id: l,
        selected: r,
        children: i,
        ...s
      });
    },
    in: t.in,
    out: t.out
  };
}, Rb = (e) => {
  const t = xc(e);
  return {
    select: (a) => {
      let {
        id: l,
        selected: r,
        children: i,
        ...s
      } = a;
      return l = Fe(l), i.has(l) ? r : t.select({
        id: l,
        selected: r,
        children: i,
        ...s
      });
    },
    in: t.in,
    out: t.out
  };
}, Fb = (e) => {
  const t = {
    select: (n) => {
      let {
        id: a,
        value: l,
        selected: r,
        children: i,
        parents: s
      } = n;
      a = Fe(a);
      const o = new Map(r), u = [a];
      for (; u.length; ) {
        const f = u.shift();
        r.set(Fe(f), l ? "on" : "off"), i.has(f) && u.push(...i.get(f));
      }
      let c = Fe(s.get(a));
      for (; c; ) {
        const f = i.get(c), d = f.every((v) => r.get(Fe(v)) === "on"), m = f.every((v) => !r.has(Fe(v)) || r.get(Fe(v)) === "off");
        r.set(c, d ? "on" : m ? "off" : "indeterminate"), c = Fe(s.get(c));
      }
      return e && !l && Array.from(r.entries()).reduce((d, m) => {
        let [v, g] = m;
        return g === "on" && d.push(v), d;
      }, []).length === 0 ? o : r;
    },
    in: (n, a, l) => {
      let r = /* @__PURE__ */ new Map();
      for (const i of n || [])
        r = t.select({
          id: i,
          value: !0,
          selected: new Map(r),
          children: a,
          parents: l
        });
      return r;
    },
    out: (n, a) => {
      const l = [];
      for (const [r, i] of n.entries())
        i === "on" && !a.has(r) && l.push(r);
      return l;
    }
  };
  return t;
}, na = Symbol.for("vuetify:nested"), Pc = {
  id: J(),
  root: {
    register: () => null,
    unregister: () => null,
    parents: Y(/* @__PURE__ */ new Map()),
    children: Y(/* @__PURE__ */ new Map()),
    open: () => null,
    openOnSelect: () => null,
    activate: () => null,
    select: () => null,
    activatable: Y(!1),
    selectable: Y(!1),
    opened: Y(/* @__PURE__ */ new Set()),
    activated: Y(/* @__PURE__ */ new Set()),
    selected: Y(/* @__PURE__ */ new Map()),
    selectedValues: Y([]),
    getPath: () => []
  }
}, Db = D({
  activatable: Boolean,
  selectable: Boolean,
  activeStrategy: [String, Function, Object],
  selectStrategy: [String, Function, Object],
  openStrategy: [String, Object],
  opened: null,
  activated: null,
  selected: null,
  mandatory: Boolean
}, "nested"), Mb = (e) => {
  let t = !1;
  const n = Y(/* @__PURE__ */ new Map()), a = Y(/* @__PURE__ */ new Map()), l = be(e, "opened", e.opened, (v) => new Set(v), (v) => [...v.values()]), r = _(() => {
    if (typeof e.activeStrategy == "object") return e.activeStrategy;
    if (typeof e.activeStrategy == "function") return e.activeStrategy(e.mandatory);
    switch (e.activeStrategy) {
      case "leaf":
        return Ab(e.mandatory);
      case "single-leaf":
        return Ob(e.mandatory);
      case "independent":
        return ai(e.mandatory);
      case "single-independent":
      default:
        return kc(e.mandatory);
    }
  }), i = _(() => {
    if (typeof e.selectStrategy == "object") return e.selectStrategy;
    if (typeof e.selectStrategy == "function") return e.selectStrategy(e.mandatory);
    switch (e.selectStrategy) {
      case "single-leaf":
        return Rb(e.mandatory);
      case "leaf":
        return Nb(e.mandatory);
      case "independent":
        return li(e.mandatory);
      case "single-independent":
        return xc(e.mandatory);
      case "classic":
      default:
        return Fb(e.mandatory);
    }
  }), s = _(() => {
    if (typeof e.openStrategy == "object") return e.openStrategy;
    switch (e.openStrategy) {
      case "list":
        return Vb;
      case "single":
        return Lb;
      case "multiple":
      default:
        return Ec;
    }
  }), o = be(e, "activated", e.activated, (v) => r.value.in(v, n.value, a.value), (v) => r.value.out(v, n.value, a.value)), u = be(e, "selected", e.selected, (v) => i.value.in(v, n.value, a.value), (v) => i.value.out(v, n.value, a.value));
  st(() => {
    t = !0;
  });
  function c(v) {
    const g = [];
    let b = v;
    for (; b != null; )
      g.unshift(b), b = a.value.get(b);
    return g;
  }
  const f = Ae("nested"), d = /* @__PURE__ */ new Set(), m = {
    id: J(),
    root: {
      opened: l,
      activatable: K(e, "activatable"),
      selectable: K(e, "selectable"),
      activated: o,
      selected: u,
      selectedValues: _(() => {
        const v = [];
        for (const [g, b] of u.value.entries())
          b === "on" && v.push(g);
        return v;
      }),
      register: (v, g, b) => {
        if (d.has(v)) {
          const y = c(v).map(String).join(" -> "), p = c(g).concat(v).map(String).join(" -> ");
          Xn(`Multiple nodes with the same ID
	${y}
	${p}`);
          return;
        } else
          d.add(v);
        g && v !== g && a.value.set(v, g), b && n.value.set(v, []), g != null && n.value.set(g, [...n.value.get(g) || [], v]);
      },
      unregister: (v) => {
        if (t) return;
        d.delete(v), n.value.delete(v);
        const g = a.value.get(v);
        if (g) {
          const b = n.value.get(g) ?? [];
          n.value.set(g, b.filter((y) => y !== v));
        }
        a.value.delete(v);
      },
      open: (v, g, b) => {
        f.emit("click:open", {
          id: v,
          value: g,
          path: c(v),
          event: b
        });
        const y = s.value.open({
          id: v,
          value: g,
          opened: new Set(l.value),
          children: n.value,
          parents: a.value,
          event: b
        });
        y && (l.value = y);
      },
      openOnSelect: (v, g, b) => {
        const y = s.value.select({
          id: v,
          value: g,
          selected: new Map(u.value),
          opened: new Set(l.value),
          children: n.value,
          parents: a.value,
          event: b
        });
        y && (l.value = y);
      },
      select: (v, g, b) => {
        f.emit("click:select", {
          id: v,
          value: g,
          path: c(v),
          event: b
        });
        const y = i.value.select({
          id: v,
          value: g,
          selected: new Map(u.value),
          children: n.value,
          parents: a.value,
          event: b
        });
        y && (u.value = y), m.root.openOnSelect(v, g, b);
      },
      activate: (v, g, b) => {
        if (!e.activatable)
          return m.root.select(v, !0, b);
        f.emit("click:activate", {
          id: v,
          value: g,
          path: c(v),
          event: b
        });
        const y = r.value.activate({
          id: v,
          value: g,
          activated: new Set(o.value),
          children: n.value,
          parents: a.value,
          event: b
        });
        y && (o.value = y);
      },
      children: n,
      parents: a,
      getPath: c
    }
  };
  return Ee(na, m), m.root;
}, $c = (e, t) => {
  const n = ye(na, Pc), a = Symbol(Nt()), l = _(() => e.value !== void 0 ? e.value : a), r = {
    ...n,
    id: l,
    open: (i, s) => n.root.open(l.value, i, s),
    openOnSelect: (i, s) => n.root.openOnSelect(l.value, i, s),
    isOpen: _(() => n.root.opened.value.has(l.value)),
    parent: _(() => n.root.parents.value.get(l.value)),
    activate: (i, s) => n.root.activate(l.value, i, s),
    isActivated: _(() => n.root.activated.value.has(Fe(l.value))),
    select: (i, s) => n.root.select(l.value, i, s),
    isSelected: _(() => n.root.selected.value.get(Fe(l.value)) === "on"),
    isIndeterminate: _(() => n.root.selected.value.get(l.value) === "indeterminate"),
    isLeaf: _(() => !n.root.children.value.get(l.value)),
    isGroupActivator: n.isGroupActivator
  };
  return !n.isGroupActivator && n.root.register(l.value, n.id.value, t), st(() => {
    !n.isGroupActivator && n.root.unregister(l.value);
  }), t && Ee(na, r), r;
}, Bb = () => {
  const e = ye(na, Pc);
  Ee(na, {
    ...e,
    isGroupActivator: !0
  });
}, Hb = ia({
  name: "VListGroupActivator",
  setup(e, t) {
    let {
      slots: n
    } = t;
    return Bb(), () => {
      var a;
      return (a = n.default) == null ? void 0 : a.call(n);
    };
  }
}), Wb = D({
  /* @deprecated */
  activeColor: String,
  baseColor: String,
  color: String,
  collapseIcon: {
    type: oe,
    default: "$collapse"
  },
  expandIcon: {
    type: oe,
    default: "$expand"
  },
  prependIcon: oe,
  appendIcon: oe,
  fluid: Boolean,
  subgroup: Boolean,
  title: String,
  value: null,
  ...re(),
  ...pe()
}, "VListGroup"), qs = U()({
  name: "VListGroup",
  props: Wb(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isOpen: a,
      open: l,
      id: r
    } = $c(K(e, "value"), !0), i = _(() => `v-list-group--id-${String(r.value)}`), s = Ic(), {
      isBooted: o
    } = ua();
    function u(m) {
      m.stopPropagation(), l(!a.value, m);
    }
    const c = _(() => ({
      onClick: u,
      class: "v-list-group__header",
      id: i.value
    })), f = _(() => a.value ? e.collapseIcon : e.expandIcon), d = _(() => ({
      VListItem: {
        active: a.value,
        activeColor: e.activeColor,
        baseColor: e.baseColor,
        color: e.color,
        prependIcon: e.prependIcon || e.subgroup && f.value,
        appendIcon: e.appendIcon || !e.subgroup && f.value,
        title: e.title,
        value: e.value
      }
    }));
    return Z(() => h(e.tag, {
      class: ["v-list-group", {
        "v-list-group--prepend": s == null ? void 0 : s.hasPrepend.value,
        "v-list-group--fluid": e.fluid,
        "v-list-group--subgroup": e.subgroup,
        "v-list-group--open": a.value
      }, e.class],
      style: e.style
    }, {
      default: () => [n.activator && h(Te, {
        defaults: d.value
      }, {
        default: () => [h(Hb, null, {
          default: () => [n.activator({
            props: c.value,
            isOpen: a.value
          })]
        })]
      }), h(jt, {
        transition: {
          component: Vu
        },
        disabled: !o.value
      }, {
        default: () => {
          var m;
          return [Je(h("div", {
            class: "v-list-group__items",
            role: "group",
            "aria-labelledby": i.value
          }, [(m = n.default) == null ? void 0 : m.call(n)]), [[mn, a.value]])];
        }
      })]
    })), {
      isOpen: a
    };
  }
}), Kb = D({
  opacity: [Number, String],
  ...re(),
  ...pe()
}, "VListItemSubtitle"), jb = U()({
  name: "VListItemSubtitle",
  props: Kb(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return Z(() => h(e.tag, {
      class: ["v-list-item-subtitle", e.class],
      style: [{
        "--v-list-item-subtitle-opacity": e.opacity
      }, e.style]
    }, n)), {};
  }
}), Ub = nl("v-list-item-title"), zb = D({
  active: {
    type: Boolean,
    default: void 0
  },
  activeClass: String,
  /* @deprecated */
  activeColor: String,
  appendAvatar: String,
  appendIcon: oe,
  baseColor: String,
  disabled: Boolean,
  lines: [Boolean, String],
  link: {
    type: Boolean,
    default: void 0
  },
  nav: Boolean,
  prependAvatar: String,
  prependIcon: oe,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  slim: Boolean,
  subtitle: [String, Number],
  title: [String, Number],
  value: null,
  onClick: je(),
  onClickOnce: je(),
  ...xt(),
  ...re(),
  ...ct(),
  ...mt(),
  ...St(),
  ...et(),
  ...fl(),
  ...pe(),
  ...xe(),
  ...Ft({
    variant: "text"
  })
}, "VListItem"), aa = U()({
  name: "VListItem",
  directives: {
    Ripple: va
  },
  props: zb(),
  emits: {
    click: (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: a,
      emit: l
    } = t;
    const r = dl(e, n), i = _(() => e.value === void 0 ? r.href.value : e.value), {
      activate: s,
      isActivated: o,
      select: u,
      isOpen: c,
      isSelected: f,
      isIndeterminate: d,
      isGroupActivator: m,
      root: v,
      parent: g,
      openOnSelect: b,
      id: y
    } = $c(i, !1), p = Ic(), x = _(() => {
      var H;
      return e.active !== !1 && (e.active || ((H = r.isActive) == null ? void 0 : H.value) || (v.activatable.value ? o.value : f.value));
    }), w = _(() => e.link !== !1 && r.isLink.value), I = _(() => !e.disabled && e.link !== !1 && (e.link || r.isClickable.value || !!p && (v.selectable.value || v.activatable.value || e.value != null))), k = _(() => e.rounded || e.nav), C = _(() => e.color ?? e.activeColor), S = _(() => ({
      color: x.value ? C.value ?? e.baseColor : e.baseColor,
      variant: e.variant
    }));
    ne(() => {
      var H;
      return (H = r.isActive) == null ? void 0 : H.value;
    }, (H) => {
      H && g.value != null && v.open(g.value, !0), H && b(H);
    }, {
      immediate: !0
    });
    const {
      themeClasses: E
    } = $e(e), {
      borderClasses: A
    } = Rt(e), {
      colorClasses: O,
      colorStyles: T,
      variantClasses: L
    } = Nn(S), {
      densityClasses: M
    } = wt(e), {
      dimensionStyles: j
    } = gt(e), {
      elevationClasses: z
    } = Pt(e), {
      roundedClasses: Q
    } = ut(k), le = _(() => e.lines ? `v-list-item--${e.lines}-line` : void 0), V = _(() => ({
      isActive: x.value,
      select: u,
      isOpen: c.value,
      isSelected: f.value,
      isIndeterminate: d.value
    }));
    function R(H) {
      var ie;
      l("click", H), I.value && ((ie = r.navigate) == null || ie.call(r, H), !m && (v.activatable.value ? s(!o.value, H) : (v.selectable.value || e.value != null) && u(!f.value, H)));
    }
    function F(H) {
      (H.key === "Enter" || H.key === " ") && (H.preventDefault(), H.target.dispatchEvent(new MouseEvent("click", H)));
    }
    return Z(() => {
      const H = w.value ? "a" : e.tag, ie = a.title || e.title != null, te = a.subtitle || e.subtitle != null, ue = !!(e.appendAvatar || e.appendIcon), X = !!(ue || a.append), se = !!(e.prependAvatar || e.prependIcon), ce = !!(se || a.prepend);
      return p == null || p.updateHasPrepend(ce), e.activeColor && mg("active-color", ["color", "base-color"]), Je(h(H, q({
        class: ["v-list-item", {
          "v-list-item--active": x.value,
          "v-list-item--disabled": e.disabled,
          "v-list-item--link": I.value,
          "v-list-item--nav": e.nav,
          "v-list-item--prepend": !ce && (p == null ? void 0 : p.hasPrepend.value),
          "v-list-item--slim": e.slim,
          [`${e.activeClass}`]: e.activeClass && x.value
        }, E.value, A.value, O.value, M.value, z.value, le.value, Q.value, L.value, e.class],
        style: [T.value, j.value, e.style],
        tabindex: I.value ? p ? -2 : 0 : void 0,
        "aria-selected": v.activatable.value ? o.value : f.value,
        onClick: R,
        onKeydown: I.value && !w.value && F
      }, r.linkProps), {
        default: () => {
          var Oe;
          return [Vn(I.value || x.value, "v-list-item"), ce && h("div", {
            key: "prepend",
            class: "v-list-item__prepend"
          }, [a.prepend ? h(Te, {
            key: "prepend-defaults",
            disabled: !se,
            defaults: {
              VAvatar: {
                density: e.density,
                image: e.prependAvatar
              },
              VIcon: {
                density: e.density,
                icon: e.prependIcon
              },
              VListItemAction: {
                start: !0
              }
            }
          }, {
            default: () => {
              var ve;
              return [(ve = a.prepend) == null ? void 0 : ve.call(a, V.value)];
            }
          }) : h(he, null, [e.prependAvatar && h(hn, {
            key: "prepend-avatar",
            density: e.density,
            image: e.prependAvatar
          }, null), e.prependIcon && h(Ve, {
            key: "prepend-icon",
            density: e.density,
            icon: e.prependIcon
          }, null)]), h("div", {
            class: "v-list-item__spacer"
          }, null)]), h("div", {
            class: "v-list-item__content",
            "data-no-activator": ""
          }, [ie && h(Ub, {
            key: "title"
          }, {
            default: () => {
              var ve;
              return [((ve = a.title) == null ? void 0 : ve.call(a, {
                title: e.title
              })) ?? e.title];
            }
          }), te && h(jb, {
            key: "subtitle"
          }, {
            default: () => {
              var ve;
              return [((ve = a.subtitle) == null ? void 0 : ve.call(a, {
                subtitle: e.subtitle
              })) ?? e.subtitle];
            }
          }), (Oe = a.default) == null ? void 0 : Oe.call(a, V.value)]), X && h("div", {
            key: "append",
            class: "v-list-item__append"
          }, [a.append ? h(Te, {
            key: "append-defaults",
            disabled: !ue,
            defaults: {
              VAvatar: {
                density: e.density,
                image: e.appendAvatar
              },
              VIcon: {
                density: e.density,
                icon: e.appendIcon
              },
              VListItemAction: {
                end: !0
              }
            }
          }, {
            default: () => {
              var ve;
              return [(ve = a.append) == null ? void 0 : ve.call(a, V.value)];
            }
          }) : h(he, null, [e.appendIcon && h(Ve, {
            key: "append-icon",
            density: e.density,
            icon: e.appendIcon
          }, null), e.appendAvatar && h(hn, {
            key: "append-avatar",
            density: e.density,
            image: e.appendAvatar
          }, null)]), h("div", {
            class: "v-list-item__spacer"
          }, null)])];
        }
      }), [[Qt("ripple"), I.value && e.ripple]]);
    }), {
      activate: s,
      isActivated: o,
      isGroupActivator: m,
      isSelected: f,
      list: p,
      select: u,
      root: v,
      id: y
    };
  }
}), Gb = D({
  color: String,
  inset: Boolean,
  sticky: Boolean,
  title: String,
  ...re(),
  ...pe()
}, "VListSubheader"), Tc = U()({
  name: "VListSubheader",
  props: Gb(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      textColorClasses: a,
      textColorStyles: l
    } = kt(K(e, "color"));
    return Z(() => {
      const r = !!(n.default || e.title);
      return h(e.tag, {
        class: ["v-list-subheader", {
          "v-list-subheader--inset": e.inset,
          "v-list-subheader--sticky": e.sticky
        }, a.value, e.class],
        style: [{
          textColorStyles: l
        }, e.style]
      }, {
        default: () => {
          var i;
          return [r && h("div", {
            class: "v-list-subheader__text"
          }, [((i = n.default) == null ? void 0 : i.call(n)) ?? e.title])];
        }
      });
    }), {};
  }
}), Yb = D({
  color: String,
  inset: Boolean,
  length: [Number, String],
  opacity: [Number, String],
  thickness: [Number, String],
  vertical: Boolean,
  ...re(),
  ...xe()
}, "VDivider"), hl = U()({
  name: "VDivider",
  props: Yb(),
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const {
      themeClasses: l
    } = $e(e), {
      textColorClasses: r,
      textColorStyles: i
    } = kt(K(e, "color")), s = _(() => {
      const o = {};
      return e.length && (o[e.vertical ? "height" : "width"] = ee(e.length)), e.thickness && (o[e.vertical ? "borderRightWidth" : "borderTopWidth"] = ee(e.thickness)), o;
    });
    return Z(() => {
      const o = h("hr", {
        class: [{
          "v-divider": !0,
          "v-divider--inset": e.inset,
          "v-divider--vertical": e.vertical
        }, l.value, r.value, e.class],
        style: [s.value, i.value, {
          "--v-border-opacity": e.opacity
        }, e.style],
        "aria-orientation": !n.role || n.role === "separator" ? e.vertical ? "vertical" : "horizontal" : void 0,
        role: `${n.role || "separator"}`
      }, null);
      return a.default ? h("div", {
        class: ["v-divider__wrapper", {
          "v-divider__wrapper--vertical": e.vertical,
          "v-divider__wrapper--inset": e.inset
        }]
      }, [o, h("div", {
        class: "v-divider__content"
      }, [a.default()]), o]) : o;
    }), {};
  }
}), qb = D({
  items: Array,
  returnObject: Boolean
}, "VListChildren"), Ac = U()({
  name: "VListChildren",
  props: qb(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return Cc(), () => {
      var a, l;
      return ((a = n.default) == null ? void 0 : a.call(n)) ?? ((l = e.items) == null ? void 0 : l.map((r) => {
        var d, m;
        let {
          children: i,
          props: s,
          type: o,
          raw: u
        } = r;
        if (o === "divider")
          return ((d = n.divider) == null ? void 0 : d.call(n, {
            props: s
          })) ?? h(hl, s, null);
        if (o === "subheader")
          return ((m = n.subheader) == null ? void 0 : m.call(n, {
            props: s
          })) ?? h(Tc, s, null);
        const c = {
          subtitle: n.subtitle ? (v) => {
            var g;
            return (g = n.subtitle) == null ? void 0 : g.call(n, {
              ...v,
              item: u
            });
          } : void 0,
          prepend: n.prepend ? (v) => {
            var g;
            return (g = n.prepend) == null ? void 0 : g.call(n, {
              ...v,
              item: u
            });
          } : void 0,
          append: n.append ? (v) => {
            var g;
            return (g = n.append) == null ? void 0 : g.call(n, {
              ...v,
              item: u
            });
          } : void 0,
          title: n.title ? (v) => {
            var g;
            return (g = n.title) == null ? void 0 : g.call(n, {
              ...v,
              item: u
            });
          } : void 0
        }, f = qs.filterProps(s);
        return i ? h(qs, q({
          value: s == null ? void 0 : s.value
        }, f), {
          activator: (v) => {
            let {
              props: g
            } = v;
            const b = {
              ...s,
              ...g,
              value: e.returnObject ? u : s.value
            };
            return n.header ? n.header({
              props: b
            }) : h(aa, b, c);
          },
          default: () => h(Ac, {
            items: i,
            returnObject: e.returnObject
          }, n)
        }) : n.item ? n.item({
          props: s
        }) : h(aa, q(s, {
          value: e.returnObject ? u : s.value
        }), c);
      }));
    };
  }
}), Oc = D({
  items: {
    type: Array,
    default: () => []
  },
  itemTitle: {
    type: [String, Array, Function],
    default: "title"
  },
  itemValue: {
    type: [String, Array, Function],
    default: "value"
  },
  itemChildren: {
    type: [Boolean, String, Array, Function],
    default: "children"
  },
  itemProps: {
    type: [Boolean, String, Array, Function],
    default: "props"
  },
  returnObject: Boolean,
  valueComparator: {
    type: Function,
    default: en
  }
}, "list-items");
function pr(e, t) {
  const n = nt(t, e.itemTitle, t), a = nt(t, e.itemValue, n), l = nt(t, e.itemChildren), r = e.itemProps === !0 ? typeof t == "object" && t != null && !Array.isArray(t) ? "children" in t ? tn(t, ["children"]) : t : void 0 : nt(t, e.itemProps), i = {
    title: n,
    value: a,
    ...r
  };
  return {
    title: String(i.title ?? ""),
    value: i.value,
    props: i,
    children: Array.isArray(l) ? Lc(e, l) : void 0,
    raw: t
  };
}
function Lc(e, t) {
  const n = [];
  for (const a of t)
    n.push(pr(e, a));
  return n;
}
function Xb(e) {
  const t = _(() => Lc(e, e.items)), n = _(() => t.value.some((r) => r.value === null));
  function a(r) {
    return n.value || (r = r.filter((i) => i !== null)), r.map((i) => e.returnObject && typeof i == "string" ? pr(e, i) : t.value.find((s) => e.valueComparator(i, s.value)) || pr(e, i));
  }
  function l(r) {
    return e.returnObject ? r.map((i) => {
      let {
        raw: s
      } = i;
      return s;
    }) : r.map((i) => {
      let {
        value: s
      } = i;
      return s;
    });
  }
  return {
    items: t,
    transformIn: a,
    transformOut: l
  };
}
function Qb(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean";
}
function Jb(e, t) {
  const n = nt(t, e.itemType, "item"), a = Qb(t) ? t : nt(t, e.itemTitle), l = nt(t, e.itemValue, void 0), r = nt(t, e.itemChildren), i = e.itemProps === !0 ? tn(t, ["children"]) : nt(t, e.itemProps), s = {
    title: a,
    value: l,
    ...i
  };
  return {
    type: n,
    title: s.title,
    value: s.value,
    props: s,
    children: n === "item" && r ? Vc(e, r) : void 0,
    raw: t
  };
}
function Vc(e, t) {
  const n = [];
  for (const a of t)
    n.push(Jb(e, a));
  return n;
}
function Zb(e) {
  return {
    items: _(() => Vc(e, e.items))
  };
}
const ep = D({
  baseColor: String,
  /* @deprecated */
  activeColor: String,
  activeClass: String,
  bgColor: String,
  disabled: Boolean,
  expandIcon: String,
  collapseIcon: String,
  lines: {
    type: [Boolean, String],
    default: "one"
  },
  slim: Boolean,
  nav: Boolean,
  "onClick:open": je(),
  "onClick:select": je(),
  "onUpdate:opened": je(),
  ...Db({
    selectStrategy: "single-leaf",
    openStrategy: "list"
  }),
  ...xt(),
  ...re(),
  ...ct(),
  ...mt(),
  ...St(),
  itemType: {
    type: String,
    default: "type"
  },
  ...Oc(),
  ...et(),
  ...pe(),
  ...xe(),
  ...Ft({
    variant: "text"
  })
}, "VList"), Nc = U()({
  name: "VList",
  props: ep(),
  emits: {
    "update:selected": (e) => !0,
    "update:activated": (e) => !0,
    "update:opened": (e) => !0,
    "click:open": (e) => !0,
    "click:activate": (e) => !0,
    "click:select": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      items: a
    } = Zb(e), {
      themeClasses: l
    } = $e(e), {
      backgroundColorClasses: r,
      backgroundColorStyles: i
    } = Qe(K(e, "bgColor")), {
      borderClasses: s
    } = Rt(e), {
      densityClasses: o
    } = wt(e), {
      dimensionStyles: u
    } = gt(e), {
      elevationClasses: c
    } = Pt(e), {
      roundedClasses: f
    } = ut(e), {
      children: d,
      open: m,
      parents: v,
      select: g,
      getPath: b
    } = Mb(e), y = _(() => e.lines ? `v-list--${e.lines}-line` : void 0), p = K(e, "activeColor"), x = K(e, "baseColor"), w = K(e, "color");
    Cc(), vt({
      VListGroup: {
        activeColor: p,
        baseColor: x,
        color: w,
        expandIcon: K(e, "expandIcon"),
        collapseIcon: K(e, "collapseIcon")
      },
      VListItem: {
        activeClass: K(e, "activeClass"),
        activeColor: p,
        baseColor: x,
        color: w,
        density: K(e, "density"),
        disabled: K(e, "disabled"),
        lines: K(e, "lines"),
        nav: K(e, "nav"),
        slim: K(e, "slim"),
        variant: K(e, "variant")
      }
    });
    const I = J(!1), k = Y();
    function C(L) {
      I.value = !0;
    }
    function S(L) {
      I.value = !1;
    }
    function E(L) {
      var M;
      !I.value && !(L.relatedTarget && ((M = k.value) != null && M.contains(L.relatedTarget))) && T();
    }
    function A(L) {
      const M = L.target;
      if (!(!k.value || ["INPUT", "TEXTAREA"].includes(M.tagName))) {
        if (L.key === "ArrowDown")
          T("next");
        else if (L.key === "ArrowUp")
          T("prev");
        else if (L.key === "Home")
          T("first");
        else if (L.key === "End")
          T("last");
        else
          return;
        L.preventDefault();
      }
    }
    function O(L) {
      I.value = !0;
    }
    function T(L) {
      if (k.value)
        return Un(k.value, L);
    }
    return Z(() => h(e.tag, {
      ref: k,
      class: ["v-list", {
        "v-list--disabled": e.disabled,
        "v-list--nav": e.nav,
        "v-list--slim": e.slim
      }, l.value, r.value, s.value, o.value, c.value, y.value, f.value, e.class],
      style: [i.value, u.value, e.style],
      tabindex: e.disabled || I.value ? -1 : 0,
      role: "listbox",
      "aria-activedescendant": void 0,
      onFocusin: C,
      onFocusout: S,
      onFocus: E,
      onKeydown: A,
      onMousedown: O
    }, {
      default: () => [h(Ac, {
        items: a.value,
        returnObject: e.returnObject
      }, n)]
    })), {
      open: m,
      select: g,
      focus: T,
      children: d,
      parents: v,
      getPath: b
    };
  }
});
function Hl(e, t) {
  return {
    x: e.x + t.x,
    y: e.y + t.y
  };
}
function tp(e, t) {
  return {
    x: e.x - t.x,
    y: e.y - t.y
  };
}
function Xs(e, t) {
  if (e.side === "top" || e.side === "bottom") {
    const {
      side: n,
      align: a
    } = e, l = a === "left" ? 0 : a === "center" ? t.width / 2 : a === "right" ? t.width : a, r = n === "top" ? 0 : n === "bottom" ? t.height : n;
    return Hl({
      x: l,
      y: r
    }, t);
  } else if (e.side === "left" || e.side === "right") {
    const {
      side: n,
      align: a
    } = e, l = n === "left" ? 0 : n === "right" ? t.width : n, r = a === "top" ? 0 : a === "center" ? t.height / 2 : a === "bottom" ? t.height : a;
    return Hl({
      x: l,
      y: r
    }, t);
  }
  return Hl({
    x: t.width / 2,
    y: t.height / 2
  }, t);
}
const Rc = {
  static: lp,
  // specific viewport position, usually centered
  connected: ip
  // connected to a certain element
}, np = D({
  locationStrategy: {
    type: [String, Function],
    default: "static",
    validator: (e) => typeof e == "function" || e in Rc
  },
  location: {
    type: String,
    default: "bottom"
  },
  origin: {
    type: String,
    default: "auto"
  },
  offset: [Number, String, Array]
}, "VOverlay-location-strategies");
function ap(e, t) {
  const n = Y({}), a = Y();
  ke && _t(() => !!(t.isActive.value && e.locationStrategy), (r) => {
    var i, s;
    ne(() => e.locationStrategy, r), Ge(() => {
      window.removeEventListener("resize", l), a.value = void 0;
    }), window.addEventListener("resize", l, {
      passive: !0
    }), typeof e.locationStrategy == "function" ? a.value = (i = e.locationStrategy(t, e, n)) == null ? void 0 : i.updateLocation : a.value = (s = Rc[e.locationStrategy](t, e, n)) == null ? void 0 : s.updateLocation;
  });
  function l(r) {
    var i;
    (i = a.value) == null || i.call(a, r);
  }
  return {
    contentStyles: n,
    updateLocation: a
  };
}
function lp() {
}
function rp(e, t) {
  const n = Wr(e);
  return t ? n.x += parseFloat(e.style.right || 0) : n.x -= parseFloat(e.style.left || 0), n.y -= parseFloat(e.style.top || 0), n;
}
function ip(e, t, n) {
  (Array.isArray(e.target.value) || Fg(e.target.value)) && Object.assign(n.value, {
    position: "fixed",
    top: 0,
    [e.isRtl.value ? "right" : "left"]: 0
  });
  const {
    preferredAnchor: l,
    preferredOrigin: r
  } = Hr(() => {
    const v = fr(t.location, e.isRtl.value), g = t.origin === "overlap" ? v : t.origin === "auto" ? Rl(v) : fr(t.origin, e.isRtl.value);
    return v.side === g.side && v.align === Fl(g).align ? {
      preferredAnchor: us(v),
      preferredOrigin: us(g)
    } : {
      preferredAnchor: v,
      preferredOrigin: g
    };
  }), [i, s, o, u] = ["minWidth", "minHeight", "maxWidth", "maxHeight"].map((v) => _(() => {
    const g = parseFloat(t[v]);
    return isNaN(g) ? 1 / 0 : g;
  })), c = _(() => {
    if (Array.isArray(t.offset))
      return t.offset;
    if (typeof t.offset == "string") {
      const v = t.offset.split(" ").map(parseFloat);
      return v.length < 2 && v.push(0), v;
    }
    return typeof t.offset == "number" ? [t.offset, 0] : [0, 0];
  });
  let f = !1;
  const d = new ResizeObserver(() => {
    f && m();
  });
  ne([e.target, e.contentEl], (v, g) => {
    let [b, y] = v, [p, x] = g;
    p && !Array.isArray(p) && d.unobserve(p), b && !Array.isArray(b) && d.observe(b), x && d.unobserve(x), y && d.observe(y);
  }, {
    immediate: !0
  }), Ge(() => {
    d.disconnect();
  });
  function m() {
    if (f = !1, requestAnimationFrame(() => f = !0), !e.target.value || !e.contentEl.value) return;
    const v = uu(e.target.value), g = rp(e.contentEl.value, e.isRtl.value), b = Ra(e.contentEl.value), y = 12;
    b.length || (b.push(document.documentElement), e.contentEl.value.style.top && e.contentEl.value.style.left || (g.x -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0), g.y -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0)));
    const p = b.reduce((O, T) => {
      const L = T.getBoundingClientRect(), M = new dn({
        x: T === document.documentElement ? 0 : L.x,
        y: T === document.documentElement ? 0 : L.y,
        width: T.clientWidth,
        height: T.clientHeight
      });
      return O ? new dn({
        x: Math.max(O.left, M.left),
        y: Math.max(O.top, M.top),
        width: Math.min(O.right, M.right) - Math.max(O.left, M.left),
        height: Math.min(O.bottom, M.bottom) - Math.max(O.top, M.top)
      }) : M;
    }, void 0);
    p.x += y, p.y += y, p.width -= y * 2, p.height -= y * 2;
    let x = {
      anchor: l.value,
      origin: r.value
    };
    function w(O) {
      const T = new dn(g), L = Xs(O.anchor, v), M = Xs(O.origin, T);
      let {
        x: j,
        y: z
      } = tp(L, M);
      switch (O.anchor.side) {
        case "top":
          z -= c.value[0];
          break;
        case "bottom":
          z += c.value[0];
          break;
        case "left":
          j -= c.value[0];
          break;
        case "right":
          j += c.value[0];
          break;
      }
      switch (O.anchor.align) {
        case "top":
          z -= c.value[1];
          break;
        case "bottom":
          z += c.value[1];
          break;
        case "left":
          j -= c.value[1];
          break;
        case "right":
          j += c.value[1];
          break;
      }
      return T.x += j, T.y += z, T.width = Math.min(T.width, o.value), T.height = Math.min(T.height, u.value), {
        overflows: ds(T, p),
        x: j,
        y: z
      };
    }
    let I = 0, k = 0;
    const C = {
      x: 0,
      y: 0
    }, S = {
      x: !1,
      y: !1
    };
    let E = -1;
    for (; ; ) {
      if (E++ > 10) {
        Xn("Infinite loop detected in connectedLocationStrategy");
        break;
      }
      const {
        x: O,
        y: T,
        overflows: L
      } = w(x);
      I += O, k += T, g.x += O, g.y += T;
      {
        const M = cs(x.anchor), j = L.x.before || L.x.after, z = L.y.before || L.y.after;
        let Q = !1;
        if (["x", "y"].forEach((le) => {
          if (le === "x" && j && !S.x || le === "y" && z && !S.y) {
            const V = {
              anchor: {
                ...x.anchor
              },
              origin: {
                ...x.origin
              }
            }, R = le === "x" ? M === "y" ? Fl : Rl : M === "y" ? Rl : Fl;
            V.anchor = R(V.anchor), V.origin = R(V.origin);
            const {
              overflows: F
            } = w(V);
            (F[le].before <= L[le].before && F[le].after <= L[le].after || F[le].before + F[le].after < (L[le].before + L[le].after) / 2) && (x = V, Q = S[le] = !0);
          }
        }), Q) continue;
      }
      L.x.before && (I += L.x.before, g.x += L.x.before), L.x.after && (I -= L.x.after, g.x -= L.x.after), L.y.before && (k += L.y.before, g.y += L.y.before), L.y.after && (k -= L.y.after, g.y -= L.y.after);
      {
        const M = ds(g, p);
        C.x = p.width - M.x.before - M.x.after, C.y = p.height - M.y.before - M.y.after, I += M.x.before, g.x += M.x.before, k += M.y.before, g.y += M.y.before;
      }
      break;
    }
    const A = cs(x.anchor);
    return Object.assign(n.value, {
      "--v-overlay-anchor-origin": `${x.anchor.side} ${x.anchor.align}`,
      transformOrigin: `${x.origin.side} ${x.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: ee(Wl(k)),
      left: e.isRtl.value ? void 0 : ee(Wl(I)),
      right: e.isRtl.value ? ee(Wl(-I)) : void 0,
      minWidth: ee(A === "y" ? Math.min(i.value, v.width) : i.value),
      maxWidth: ee(Qs(ft(C.x, i.value === 1 / 0 ? 0 : i.value, o.value))),
      maxHeight: ee(Qs(ft(C.y, s.value === 1 / 0 ? 0 : s.value, u.value)))
    }), {
      available: C,
      contentBox: g
    };
  }
  return ne(() => [l.value, r.value, t.offset, t.minWidth, t.minHeight, t.maxWidth, t.maxHeight], () => m()), We(() => {
    const v = m();
    if (!v) return;
    const {
      available: g,
      contentBox: b
    } = v;
    b.height > g.y && requestAnimationFrame(() => {
      m(), requestAnimationFrame(() => {
        m();
      });
    });
  }), {
    updateLocation: m
  };
}
function Wl(e) {
  return Math.round(e * devicePixelRatio) / devicePixelRatio;
}
function Qs(e) {
  return Math.ceil(e * devicePixelRatio) / devicePixelRatio;
}
let _r = !0;
const Ba = [];
function sp(e) {
  !_r || Ba.length ? (Ba.push(e), Sr()) : (_r = !1, e(), Sr());
}
let Js = -1;
function Sr() {
  cancelAnimationFrame(Js), Js = requestAnimationFrame(() => {
    const e = Ba.shift();
    e && e(), Ba.length ? Sr() : _r = !0;
  });
}
const Pa = {
  none: null,
  close: cp,
  block: dp,
  reposition: fp
}, op = D({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (e) => typeof e == "function" || e in Pa
  }
}, "VOverlay-scroll-strategies");
function up(e, t) {
  if (!ke) return;
  let n;
  rt(async () => {
    n == null || n.stop(), t.isActive.value && e.scrollStrategy && (n = An(), await new Promise((a) => setTimeout(a)), n.active && n.run(() => {
      var a;
      typeof e.scrollStrategy == "function" ? e.scrollStrategy(t, e, n) : (a = Pa[e.scrollStrategy]) == null || a.call(Pa, t, e, n);
    }));
  }), Ge(() => {
    n == null || n.stop();
  });
}
function cp(e) {
  function t(n) {
    e.isActive.value = !1;
  }
  Fc(e.targetEl.value ?? e.contentEl.value, t);
}
function dp(e, t) {
  var i;
  const n = (i = e.root.value) == null ? void 0 : i.offsetParent, a = [.../* @__PURE__ */ new Set([...Ra(e.targetEl.value, t.contained ? n : void 0), ...Ra(e.contentEl.value, t.contained ? n : void 0)])].filter((s) => !s.classList.contains("v-overlay-scroll-blocked")), l = window.innerWidth - document.documentElement.offsetWidth, r = ((s) => Ur(s) && s)(n || document.documentElement);
  r && e.root.value.classList.add("v-overlay--scroll-blocked"), a.forEach((s, o) => {
    s.style.setProperty("--v-body-scroll-x", ee(-s.scrollLeft)), s.style.setProperty("--v-body-scroll-y", ee(-s.scrollTop)), s !== document.documentElement && s.style.setProperty("--v-scrollbar-offset", ee(l)), s.classList.add("v-overlay-scroll-blocked");
  }), Ge(() => {
    a.forEach((s, o) => {
      const u = parseFloat(s.style.getPropertyValue("--v-body-scroll-x")), c = parseFloat(s.style.getPropertyValue("--v-body-scroll-y")), f = s.style.scrollBehavior;
      s.style.scrollBehavior = "auto", s.style.removeProperty("--v-body-scroll-x"), s.style.removeProperty("--v-body-scroll-y"), s.style.removeProperty("--v-scrollbar-offset"), s.classList.remove("v-overlay-scroll-blocked"), s.scrollLeft = -u, s.scrollTop = -c, s.style.scrollBehavior = f;
    }), r && e.root.value.classList.remove("v-overlay--scroll-blocked");
  });
}
function fp(e, t, n) {
  let a = !1, l = -1, r = -1;
  function i(s) {
    sp(() => {
      var c, f;
      const o = performance.now();
      (f = (c = e.updateLocation).value) == null || f.call(c, s), a = (performance.now() - o) / (1e3 / 60) > 2;
    });
  }
  r = (typeof requestIdleCallback > "u" ? (s) => s() : requestIdleCallback)(() => {
    n.run(() => {
      Fc(e.targetEl.value ?? e.contentEl.value, (s) => {
        a ? (cancelAnimationFrame(l), l = requestAnimationFrame(() => {
          l = requestAnimationFrame(() => {
            i(s);
          });
        })) : i(s);
      });
    });
  }), Ge(() => {
    typeof cancelIdleCallback < "u" && cancelIdleCallback(r), cancelAnimationFrame(l);
  });
}
function Fc(e, t) {
  const n = [document, ...Ra(e)];
  n.forEach((a) => {
    a.addEventListener("scroll", t, {
      passive: !0
    });
  }), Ge(() => {
    n.forEach((a) => {
      a.removeEventListener("scroll", t);
    });
  });
}
const wr = Symbol.for("vuetify:v-menu"), Dc = D({
  closeDelay: [Number, String],
  openDelay: [Number, String]
}, "delay");
function Mc(e, t) {
  let n = () => {
  };
  function a(i) {
    n == null || n();
    const s = Number(i ? e.openDelay : e.closeDelay);
    return new Promise((o) => {
      n = ag(s, () => {
        t == null || t(i), o(i);
      });
    });
  }
  function l() {
    return a(!0);
  }
  function r() {
    return a(!1);
  }
  return {
    clearDelay: n,
    runOpenDelay: l,
    runCloseDelay: r
  };
}
const vp = D({
  target: [String, Object],
  activator: [String, Object],
  activatorProps: {
    type: Object,
    default: () => ({})
  },
  openOnClick: {
    type: Boolean,
    default: void 0
  },
  openOnHover: Boolean,
  openOnFocus: {
    type: Boolean,
    default: void 0
  },
  closeOnContentClick: Boolean,
  ...Dc()
}, "VOverlay-activator");
function hp(e, t) {
  let {
    isActive: n,
    isTop: a,
    contentEl: l
  } = t;
  const r = Ae("useActivator"), i = Y();
  let s = !1, o = !1, u = !0;
  const c = _(() => e.openOnFocus || e.openOnFocus == null && e.openOnHover), f = _(() => e.openOnClick || e.openOnClick == null && !e.openOnHover && !c.value), {
    runOpenDelay: d,
    runCloseDelay: m
  } = Mc(e, (S) => {
    S === (e.openOnHover && s || c.value && o) && !(e.openOnHover && n.value && !a.value) && (n.value !== S && (u = !0), n.value = S);
  }), v = Y(), g = {
    onClick: (S) => {
      S.stopPropagation(), i.value = S.currentTarget || S.target, n.value || (v.value = [S.clientX, S.clientY]), n.value = !n.value;
    },
    onMouseenter: (S) => {
      var E;
      (E = S.sourceCapabilities) != null && E.firesTouchEvents || (s = !0, i.value = S.currentTarget || S.target, d());
    },
    onMouseleave: (S) => {
      s = !1, m();
    },
    onFocus: (S) => {
      La(S.target, ":focus-visible") !== !1 && (o = !0, S.stopPropagation(), i.value = S.currentTarget || S.target, d());
    },
    onBlur: (S) => {
      o = !1, S.stopPropagation(), m();
    }
  }, b = _(() => {
    const S = {};
    return f.value && (S.onClick = g.onClick), e.openOnHover && (S.onMouseenter = g.onMouseenter, S.onMouseleave = g.onMouseleave), c.value && (S.onFocus = g.onFocus, S.onBlur = g.onBlur), S;
  }), y = _(() => {
    const S = {};
    if (e.openOnHover && (S.onMouseenter = () => {
      s = !0, d();
    }, S.onMouseleave = () => {
      s = !1, m();
    }), c.value && (S.onFocusin = () => {
      o = !0, d();
    }, S.onFocusout = () => {
      o = !1, m();
    }), e.closeOnContentClick) {
      const E = ye(wr, null);
      S.onClick = () => {
        n.value = !1, E == null || E.closeParents();
      };
    }
    return S;
  }), p = _(() => {
    const S = {};
    return e.openOnHover && (S.onMouseenter = () => {
      u && (s = !0, u = !1, d());
    }, S.onMouseleave = () => {
      s = !1, m();
    }), S;
  });
  ne(a, (S) => {
    var E;
    S && (e.openOnHover && !s && (!c.value || !o) || c.value && !o && (!e.openOnHover || !s)) && !((E = l.value) != null && E.contains(document.activeElement)) && (n.value = !1);
  }), ne(n, (S) => {
    S || setTimeout(() => {
      v.value = void 0;
    });
  }, {
    flush: "post"
  });
  const x = dr();
  rt(() => {
    x.value && We(() => {
      i.value = x.el;
    });
  });
  const w = dr(), I = _(() => e.target === "cursor" && v.value ? v.value : w.value ? w.el : Bc(e.target, r) || i.value), k = _(() => Array.isArray(I.value) ? void 0 : I.value);
  let C;
  return ne(() => !!e.activator, (S) => {
    S && ke ? (C = An(), C.run(() => {
      mp(e, r, {
        activatorEl: i,
        activatorEvents: b
      });
    })) : C && C.stop();
  }, {
    flush: "post",
    immediate: !0
  }), Ge(() => {
    C == null || C.stop();
  }), {
    activatorEl: i,
    activatorRef: x,
    target: I,
    targetEl: k,
    targetRef: w,
    activatorEvents: b,
    contentEvents: y,
    scrimEvents: p
  };
}
function mp(e, t, n) {
  let {
    activatorEl: a,
    activatorEvents: l
  } = n;
  ne(() => e.activator, (o, u) => {
    if (u && o !== u) {
      const c = s(u);
      c && i(c);
    }
    o && We(() => r());
  }, {
    immediate: !0
  }), ne(() => e.activatorProps, () => {
    r();
  }), Ge(() => {
    i();
  });
  function r() {
    let o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : s(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    o && ig(o, q(l.value, u));
  }
  function i() {
    let o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : s(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    o && sg(o, q(l.value, u));
  }
  function s() {
    let o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : e.activator;
    const u = Bc(o, t);
    return a.value = (u == null ? void 0 : u.nodeType) === Node.ELEMENT_NODE ? u : void 0, a.value;
  }
}
function Bc(e, t) {
  var a, l;
  if (!e) return;
  let n;
  if (e === "parent") {
    let r = (l = (a = t == null ? void 0 : t.proxy) == null ? void 0 : a.$el) == null ? void 0 : l.parentNode;
    for (; r != null && r.hasAttribute("data-no-activator"); )
      r = r.parentNode;
    n = r;
  } else typeof e == "string" ? n = document.querySelector(e) : "$el" in e ? n = e.$el : n = e;
  return n;
}
function gp() {
  if (!ke) return J(!1);
  const {
    ssr: e
  } = nn();
  if (e) {
    const t = J(!1);
    return Lt(() => {
      t.value = !0;
    }), t;
  } else
    return J(!0);
}
const Hc = D({
  eager: Boolean
}, "lazy");
function Wc(e, t) {
  const n = J(!1), a = _(() => n.value || e.eager || t.value);
  ne(t, () => n.value = !0);
  function l() {
    e.eager || (n.value = !1);
  }
  return {
    isBooted: n,
    hasContent: a,
    onAfterLeave: l
  };
}
function ml() {
  const t = Ae("useScopeId").vnode.scopeId;
  return {
    scopeId: t ? {
      [t]: ""
    } : void 0
  };
}
const Zs = Symbol.for("vuetify:stack"), Hn = Xe([]);
function yp(e, t, n) {
  const a = Ae("useStack"), l = !n, r = ye(Zs, void 0), i = Xe({
    activeChildren: /* @__PURE__ */ new Set()
  });
  Ee(Zs, i);
  const s = J(+t.value);
  _t(e, () => {
    var f;
    const c = (f = Hn.at(-1)) == null ? void 0 : f[1];
    s.value = c ? c + 10 : +t.value, l && Hn.push([a.uid, s.value]), r == null || r.activeChildren.add(a.uid), Ge(() => {
      if (l) {
        const d = Fe(Hn).findIndex((m) => m[0] === a.uid);
        Hn.splice(d, 1);
      }
      r == null || r.activeChildren.delete(a.uid);
    });
  });
  const o = J(!0);
  l && rt(() => {
    var f;
    const c = ((f = Hn.at(-1)) == null ? void 0 : f[0]) === a.uid;
    setTimeout(() => o.value = c);
  });
  const u = _(() => !i.activeChildren.size);
  return {
    globalTop: Er(o),
    localTop: u,
    stackStyles: _(() => ({
      zIndex: s.value
    }))
  };
}
function bp(e) {
  return {
    teleportTarget: _(() => {
      const n = e();
      if (n === !0 || !ke) return;
      const a = n === !1 ? document.body : typeof n == "string" ? document.querySelector(n) : n;
      if (a == null) {
        Ga(`Unable to locate target ${n}`);
        return;
      }
      let l = [...a.children].find((r) => r.matches(".v-overlay-container"));
      return l || (l = document.createElement("div"), l.className = "v-overlay-container", a.appendChild(l)), l;
    })
  };
}
function pp() {
  return !0;
}
function Kc(e, t, n) {
  if (!e || jc(e, n) === !1) return !1;
  const a = gu(t);
  if (typeof ShadowRoot < "u" && a instanceof ShadowRoot && a.host === e.target) return !1;
  const l = (typeof n.value == "object" && n.value.include || (() => []))();
  return l.push(t), !l.some((r) => r == null ? void 0 : r.contains(e.target));
}
function jc(e, t) {
  return (typeof t.value == "object" && t.value.closeConditional || pp)(e);
}
function _p(e, t, n) {
  const a = typeof n.value == "function" ? n.value : n.value.handler;
  e.shadowTarget = e.target, t._clickOutside.lastMousedownWasOutside && Kc(e, t, n) && setTimeout(() => {
    jc(e, n) && a && a(e);
  }, 0);
}
function eo(e, t) {
  const n = gu(e);
  t(document), typeof ShadowRoot < "u" && n instanceof ShadowRoot && t(n);
}
const Sp = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(e, t) {
    const n = (l) => _p(l, e, t), a = (l) => {
      e._clickOutside.lastMousedownWasOutside = Kc(l, e, t);
    };
    eo(e, (l) => {
      l.addEventListener("click", n, !0), l.addEventListener("mousedown", a, !0);
    }), e._clickOutside || (e._clickOutside = {
      lastMousedownWasOutside: !1
    }), e._clickOutside[t.instance.$.uid] = {
      onClick: n,
      onMousedown: a
    };
  },
  beforeUnmount(e, t) {
    e._clickOutside && (eo(e, (n) => {
      var r;
      if (!n || !((r = e._clickOutside) != null && r[t.instance.$.uid])) return;
      const {
        onClick: a,
        onMousedown: l
      } = e._clickOutside[t.instance.$.uid];
      n.removeEventListener("click", a, !0), n.removeEventListener("mousedown", l, !0);
    }), delete e._clickOutside[t.instance.$.uid]);
  }
};
function wp(e) {
  const {
    modelValue: t,
    color: n,
    ...a
  } = e;
  return h(Xt, {
    name: "fade-transition",
    appear: !0
  }, {
    default: () => [e.modelValue && h("div", q({
      class: ["v-overlay__scrim", e.color.backgroundColorClasses.value],
      style: e.color.backgroundColorStyles.value
    }, a), null)]
  });
}
const Uc = D({
  absolute: Boolean,
  attach: [Boolean, String, Object],
  closeOnBack: {
    type: Boolean,
    default: !0
  },
  contained: Boolean,
  contentClass: null,
  contentProps: null,
  disabled: Boolean,
  opacity: [Number, String],
  noClickAnimation: Boolean,
  modelValue: Boolean,
  persistent: Boolean,
  scrim: {
    type: [Boolean, String],
    default: !0
  },
  zIndex: {
    type: [Number, String],
    default: 2e3
  },
  ...vp(),
  ...re(),
  ...mt(),
  ...Hc(),
  ...np(),
  ...op(),
  ...xe(),
  ...oa()
}, "VOverlay"), to = U()({
  name: "VOverlay",
  directives: {
    ClickOutside: Sp
  },
  inheritAttrs: !1,
  props: {
    _disableGlobalStack: Boolean,
    ...Uc()
  },
  emits: {
    "click:outside": (e) => !0,
    "update:modelValue": (e) => !0,
    afterEnter: () => !0,
    afterLeave: () => !0
  },
  setup(e, t) {
    let {
      slots: n,
      attrs: a,
      emit: l
    } = t;
    const r = Ae("VOverlay"), i = Y(), s = Y(), o = Y(), u = be(e, "modelValue"), c = _({
      get: () => u.value,
      set: (X) => {
        X && e.disabled || (u.value = X);
      }
    }), {
      themeClasses: f
    } = $e(e), {
      rtlClasses: d,
      isRtl: m
    } = ot(), {
      hasContent: v,
      onAfterLeave: g
    } = Wc(e, c), b = Qe(_(() => typeof e.scrim == "string" ? e.scrim : null)), {
      globalTop: y,
      localTop: p,
      stackStyles: x
    } = yp(c, K(e, "zIndex"), e._disableGlobalStack), {
      activatorEl: w,
      activatorRef: I,
      target: k,
      targetEl: C,
      targetRef: S,
      activatorEvents: E,
      contentEvents: A,
      scrimEvents: O
    } = hp(e, {
      isActive: c,
      isTop: p,
      contentEl: o
    }), {
      teleportTarget: T
    } = bp(() => {
      var ce, Oe, ve;
      const X = e.attach || e.contained;
      if (X) return X;
      const se = ((ce = w == null ? void 0 : w.value) == null ? void 0 : ce.getRootNode()) || ((ve = (Oe = r.proxy) == null ? void 0 : Oe.$el) == null ? void 0 : ve.getRootNode());
      return se instanceof ShadowRoot ? se : !1;
    }), {
      dimensionStyles: L
    } = gt(e), M = gp(), {
      scopeId: j
    } = ml();
    ne(() => e.disabled, (X) => {
      X && (c.value = !1);
    });
    const {
      contentStyles: z,
      updateLocation: Q
    } = ap(e, {
      isRtl: m,
      contentEl: o,
      target: k,
      isActive: c
    });
    up(e, {
      root: i,
      contentEl: o,
      targetEl: C,
      isActive: c,
      updateLocation: Q
    });
    function le(X) {
      l("click:outside", X), e.persistent ? ie() : c.value = !1;
    }
    function V(X) {
      return c.value && y.value && // If using scrim, only close if clicking on it rather than anything opened on top
      (!e.scrim || X.target === s.value || X instanceof MouseEvent && X.shadowTarget === s.value);
    }
    ke && ne(c, (X) => {
      X ? window.addEventListener("keydown", R) : window.removeEventListener("keydown", R);
    }, {
      immediate: !0
    }), st(() => {
      ke && window.removeEventListener("keydown", R);
    });
    function R(X) {
      var se, ce;
      X.key === "Escape" && y.value && (e.persistent ? ie() : (c.value = !1, (se = o.value) != null && se.contains(document.activeElement) && ((ce = w.value) == null || ce.focus())));
    }
    const F = ju();
    _t(() => e.closeOnBack, () => {
      Ay(F, (X) => {
        y.value && c.value ? (X(!1), e.persistent ? ie() : c.value = !1) : X();
      });
    });
    const H = Y();
    ne(() => c.value && (e.absolute || e.contained) && T.value == null, (X) => {
      if (X) {
        const se = yu(i.value);
        se && se !== document.scrollingElement && (H.value = se.scrollTop);
      }
    });
    function ie() {
      e.noClickAnimation || o.value && un(o.value, [{
        transformOrigin: "center"
      }, {
        transform: "scale(1.03)"
      }, {
        transformOrigin: "center"
      }], {
        duration: 150,
        easing: Jn
      });
    }
    function te() {
      l("afterEnter");
    }
    function ue() {
      g(), l("afterLeave");
    }
    return Z(() => {
      var X;
      return h(he, null, [(X = n.activator) == null ? void 0 : X.call(n, {
        isActive: c.value,
        targetRef: S,
        props: q({
          ref: I
        }, E.value, e.activatorProps)
      }), M.value && v.value && h(Xd, {
        disabled: !T.value,
        to: T.value
      }, {
        default: () => [h("div", q({
          class: ["v-overlay", {
            "v-overlay--absolute": e.absolute || e.contained,
            "v-overlay--active": c.value,
            "v-overlay--contained": e.contained
          }, f.value, d.value, e.class],
          style: [x.value, {
            "--v-overlay-opacity": e.opacity,
            top: ee(H.value)
          }, e.style],
          ref: i
        }, j, a), [h(wp, q({
          color: b,
          modelValue: c.value && !!e.scrim,
          ref: s
        }, O.value), null), h(jt, {
          appear: !0,
          persisted: !0,
          transition: e.transition,
          target: k.value,
          onAfterEnter: te,
          onAfterLeave: ue
        }, {
          default: () => {
            var se;
            return [Je(h("div", q({
              ref: o,
              class: ["v-overlay__content", e.contentClass],
              style: [L.value, z.value]
            }, A.value, e.contentProps), [(se = n.default) == null ? void 0 : se.call(n, {
              isActive: c
            })]), [[mn, c.value], [Qt("click-outside"), {
              handler: le,
              closeConditional: V,
              include: () => [w.value]
            }]])];
          }
        })])]
      })]);
    }), {
      activatorEl: w,
      scrimEl: s,
      target: k,
      animateClick: ie,
      contentEl: o,
      globalTop: y,
      localTop: p,
      updateLocation: Q
    };
  }
}), Kl = Symbol("Forwarded refs");
function jl(e, t) {
  let n = e;
  for (; n; ) {
    const a = Reflect.getOwnPropertyDescriptor(n, t);
    if (a) return a;
    n = Object.getPrototypeOf(n);
  }
}
function gl(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
    n[a - 1] = arguments[a];
  return e[Kl] = n, new Proxy(e, {
    get(l, r) {
      if (Reflect.has(l, r))
        return Reflect.get(l, r);
      if (!(typeof r == "symbol" || r.startsWith("$") || r.startsWith("__"))) {
        for (const i of n)
          if (i.value && Reflect.has(i.value, r)) {
            const s = Reflect.get(i.value, r);
            return typeof s == "function" ? s.bind(i.value) : s;
          }
      }
    },
    has(l, r) {
      if (Reflect.has(l, r))
        return !0;
      if (typeof r == "symbol" || r.startsWith("$") || r.startsWith("__")) return !1;
      for (const i of n)
        if (i.value && Reflect.has(i.value, r))
          return !0;
      return !1;
    },
    set(l, r, i) {
      if (Reflect.has(l, r))
        return Reflect.set(l, r, i);
      if (typeof r == "symbol" || r.startsWith("$") || r.startsWith("__")) return !1;
      for (const s of n)
        if (s.value && Reflect.has(s.value, r))
          return Reflect.set(s.value, r, i);
      return !1;
    },
    getOwnPropertyDescriptor(l, r) {
      var s;
      const i = Reflect.getOwnPropertyDescriptor(l, r);
      if (i) return i;
      if (!(typeof r == "symbol" || r.startsWith("$") || r.startsWith("__"))) {
        for (const o of n) {
          if (!o.value) continue;
          const u = jl(o.value, r) ?? ("_" in o.value ? jl((s = o.value._) == null ? void 0 : s.setupState, r) : void 0);
          if (u) return u;
        }
        for (const o of n) {
          const u = o.value && o.value[Kl];
          if (!u) continue;
          const c = u.slice();
          for (; c.length; ) {
            const f = c.shift(), d = jl(f.value, r);
            if (d) return d;
            const m = f.value && f.value[Kl];
            m && c.push(...m);
          }
        }
      }
    }
  });
}
const Cp = D({
  // TODO
  // disableKeys: Boolean,
  id: String,
  submenu: Boolean,
  ...tn(Uc({
    closeDelay: 250,
    closeOnContentClick: !0,
    locationStrategy: "connected",
    location: void 0,
    openDelay: 300,
    scrim: !1,
    scrollStrategy: "reposition",
    transition: {
      component: Ou
    }
  }), ["absolute"])
}, "VMenu"), zc = U()({
  name: "VMenu",
  props: Cp(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = be(e, "modelValue"), {
      scopeId: l
    } = ml(), {
      isRtl: r
    } = ot(), i = Nt(), s = _(() => e.id || `v-menu-${i}`), o = Y(), u = ye(wr, null), c = J(/* @__PURE__ */ new Set());
    Ee(wr, {
      register() {
        c.value.add(i);
      },
      unregister() {
        c.value.delete(i);
      },
      closeParents(b) {
        setTimeout(() => {
          var y;
          !c.value.size && !e.persistent && (b == null || (y = o.value) != null && y.contentEl && !lg(b, o.value.contentEl)) && (a.value = !1, u == null || u.closeParents());
        }, 40);
      }
    }), st(() => u == null ? void 0 : u.unregister()), yo(() => a.value = !1);
    async function f(b) {
      var x, w, I;
      const y = b.relatedTarget, p = b.target;
      await We(), a.value && y !== p && ((x = o.value) != null && x.contentEl) && // We're the topmost menu
      ((w = o.value) != null && w.globalTop) && // It isn't the document or the menu body
      ![document, o.value.contentEl].includes(p) && // It isn't inside the menu body
      !o.value.contentEl.contains(p) && ((I = Oa(o.value.contentEl)[0]) == null || I.focus());
    }
    ne(a, (b) => {
      b ? (u == null || u.register(), document.addEventListener("focusin", f, {
        once: !0
      })) : (u == null || u.unregister(), document.removeEventListener("focusin", f));
    });
    function d(b) {
      u == null || u.closeParents(b);
    }
    function m(b) {
      var y, p, x, w, I;
      if (!e.disabled)
        if (b.key === "Tab" || b.key === "Enter" && !e.closeOnContentClick) {
          if (b.key === "Enter" && (b.target instanceof HTMLTextAreaElement || b.target instanceof HTMLInputElement && b.target.closest("form"))) return;
          b.key === "Enter" && b.preventDefault(), iu(Oa((y = o.value) == null ? void 0 : y.contentEl, !1), b.shiftKey ? "prev" : "next", (C) => C.tabIndex >= 0) || (a.value = !1, (x = (p = o.value) == null ? void 0 : p.activatorEl) == null || x.focus());
        } else e.submenu && b.key === (r.value ? "ArrowRight" : "ArrowLeft") && (a.value = !1, (I = (w = o.value) == null ? void 0 : w.activatorEl) == null || I.focus());
    }
    function v(b) {
      var p;
      if (e.disabled) return;
      const y = (p = o.value) == null ? void 0 : p.contentEl;
      y && a.value ? b.key === "ArrowDown" ? (b.preventDefault(), b.stopImmediatePropagation(), Un(y, "next")) : b.key === "ArrowUp" ? (b.preventDefault(), b.stopImmediatePropagation(), Un(y, "prev")) : e.submenu && (b.key === (r.value ? "ArrowRight" : "ArrowLeft") ? a.value = !1 : b.key === (r.value ? "ArrowLeft" : "ArrowRight") && (b.preventDefault(), Un(y, "first"))) : (e.submenu ? b.key === (r.value ? "ArrowLeft" : "ArrowRight") : ["ArrowDown", "ArrowUp"].includes(b.key)) && (a.value = !0, b.preventDefault(), setTimeout(() => setTimeout(() => v(b))));
    }
    const g = _(() => q({
      "aria-haspopup": "menu",
      "aria-expanded": String(a.value),
      "aria-owns": s.value,
      onKeydown: v
    }, e.activatorProps));
    return Z(() => {
      const b = to.filterProps(e);
      return h(to, q({
        ref: o,
        id: s.value,
        class: ["v-menu", e.class],
        style: e.style
      }, b, {
        modelValue: a.value,
        "onUpdate:modelValue": (y) => a.value = y,
        absolute: !0,
        activatorProps: g.value,
        location: e.location ?? (e.submenu ? "end" : "bottom"),
        "onClick:outside": d,
        onKeydown: m
      }, l), {
        activator: n.activator,
        default: function() {
          for (var y = arguments.length, p = new Array(y), x = 0; x < y; x++)
            p[x] = arguments[x];
          return h(Te, {
            root: "VMenu"
          }, {
            default: () => {
              var w;
              return [(w = n.default) == null ? void 0 : w.call(n, ...p)];
            }
          });
        }
      });
    }), gl({
      id: s,
      ΨopenChildren: c
    }, o);
  }
}), Ip = D({
  active: Boolean,
  disabled: Boolean,
  max: [Number, String],
  value: {
    type: [Number, String],
    default: 0
  },
  ...re(),
  ...oa({
    transition: {
      component: Lu
    }
  })
}, "VCounter"), kp = U()({
  name: "VCounter",
  functional: !0,
  props: Ip(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = _(() => e.max ? `${e.value} / ${e.max}` : String(e.value));
    return Z(() => h(jt, {
      transition: e.transition
    }, {
      default: () => [Je(h("div", {
        class: ["v-counter", {
          "text-error": e.max && !e.disabled && parseFloat(e.value) > parseFloat(e.max)
        }, e.class],
        style: e.style
      }, [n.default ? n.default({
        counter: a.value,
        max: e.max,
        value: e.value
      }) : a.value]), [[mn, e.active]])]
    })), {};
  }
}), Ep = D({
  floating: Boolean,
  ...re()
}, "VFieldLabel"), wa = U()({
  name: "VFieldLabel",
  props: Ep(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return Z(() => h(hc, {
      class: ["v-field-label", {
        "v-field-label--floating": e.floating
      }, e.class],
      style: e.style,
      "aria-hidden": e.floating || void 0
    }, n)), {};
  }
}), xp = ["underlined", "outlined", "filled", "solo", "solo-inverted", "solo-filled", "plain"], Gc = D({
  appendInnerIcon: oe,
  bgColor: String,
  clearable: Boolean,
  clearIcon: {
    type: oe,
    default: "$clear"
  },
  active: Boolean,
  centerAffix: {
    type: Boolean,
    default: void 0
  },
  color: String,
  baseColor: String,
  dirty: Boolean,
  disabled: {
    type: Boolean,
    default: null
  },
  error: Boolean,
  flat: Boolean,
  label: String,
  persistentClear: Boolean,
  prependInnerIcon: oe,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {
    type: String,
    default: "filled",
    validator: (e) => xp.includes(e)
  },
  "onClick:clear": je(),
  "onClick:appendInner": je(),
  "onClick:prependInner": je(),
  ...re(),
  ...sl(),
  ...et(),
  ...xe()
}, "VField"), Yc = U()({
  name: "VField",
  inheritAttrs: !1,
  props: {
    id: String,
    ...pc(),
    ...Gc()
  },
  emits: {
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: a,
      slots: l
    } = t;
    const {
      themeClasses: r
    } = $e(e), {
      loaderClasses: i
    } = ol(e), {
      focusClasses: s,
      isFocused: o,
      focus: u,
      blur: c
    } = _c(e), {
      InputIcon: f
    } = bc(e), {
      roundedClasses: d
    } = ut(e), {
      rtlClasses: m
    } = ot(), v = _(() => e.dirty || e.active), g = _(() => !e.singleLine && !!(e.label || l.label)), b = Nt(), y = _(() => e.id || `input-${b}`), p = _(() => `${y.value}-messages`), x = Y(), w = Y(), I = Y(), k = _(() => ["plain", "underlined"].includes(e.variant)), {
      backgroundColorClasses: C,
      backgroundColorStyles: S
    } = Qe(K(e, "bgColor")), {
      textColorClasses: E,
      textColorStyles: A
    } = kt(_(() => e.error || e.disabled ? void 0 : v.value && o.value ? e.color : e.baseColor));
    ne(v, (M) => {
      if (g.value) {
        const j = x.value.$el, z = w.value.$el;
        requestAnimationFrame(() => {
          const Q = Wr(j), le = z.getBoundingClientRect(), V = le.x - Q.x, R = le.y - Q.y - (Q.height / 2 - le.height / 2), F = le.width / 0.75, H = Math.abs(F - Q.width) > 1 ? {
            maxWidth: ee(F)
          } : void 0, ie = getComputedStyle(j), te = getComputedStyle(z), ue = parseFloat(ie.transitionDuration) * 1e3 || 150, X = parseFloat(te.getPropertyValue("--v-field-label-scale")), se = te.getPropertyValue("color");
          j.style.visibility = "visible", z.style.visibility = "hidden", un(j, {
            transform: `translate(${V}px, ${R}px) scale(${X})`,
            color: se,
            ...H
          }, {
            duration: ue,
            easing: Jn,
            direction: M ? "normal" : "reverse"
          }).finished.then(() => {
            j.style.removeProperty("visibility"), z.style.removeProperty("visibility");
          });
        });
      }
    }, {
      flush: "post"
    });
    const O = _(() => ({
      isActive: v,
      isFocused: o,
      controlRef: I,
      blur: c,
      focus: u
    }));
    function T(M) {
      M.target !== document.activeElement && M.preventDefault();
    }
    function L(M) {
      var j;
      M.key !== "Enter" && M.key !== " " || (M.preventDefault(), M.stopPropagation(), (j = e["onClick:clear"]) == null || j.call(e, new MouseEvent("click")));
    }
    return Z(() => {
      var V, R, F;
      const M = e.variant === "outlined", j = !!(l["prepend-inner"] || e.prependInnerIcon), z = !!(e.clearable || l.clear), Q = !!(l["append-inner"] || e.appendInnerIcon || z), le = () => l.label ? l.label({
        ...O.value,
        label: e.label,
        props: {
          for: y.value
        }
      }) : e.label;
      return h("div", q({
        class: ["v-field", {
          "v-field--active": v.value,
          "v-field--appended": Q,
          "v-field--center-affix": e.centerAffix ?? !k.value,
          "v-field--disabled": e.disabled,
          "v-field--dirty": e.dirty,
          "v-field--error": e.error,
          "v-field--flat": e.flat,
          "v-field--has-background": !!e.bgColor,
          "v-field--persistent-clear": e.persistentClear,
          "v-field--prepended": j,
          "v-field--reverse": e.reverse,
          "v-field--single-line": e.singleLine,
          "v-field--no-label": !le(),
          [`v-field--variant-${e.variant}`]: !0
        }, r.value, C.value, s.value, i.value, d.value, m.value, e.class],
        style: [S.value, e.style],
        onClick: T
      }, n), [h("div", {
        class: "v-field__overlay"
      }, null), h(Qr, {
        name: "v-field",
        active: !!e.loading,
        color: e.error ? "error" : typeof e.loading == "string" ? e.loading : e.color
      }, {
        default: l.loader
      }), j && h("div", {
        key: "prepend",
        class: "v-field__prepend-inner"
      }, [e.prependInnerIcon && h(f, {
        key: "prepend-icon",
        name: "prependInner"
      }, null), (V = l["prepend-inner"]) == null ? void 0 : V.call(l, O.value)]), h("div", {
        class: "v-field__field",
        "data-no-activator": ""
      }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(e.variant) && g.value && h(wa, {
        key: "floating-label",
        ref: w,
        class: [E.value],
        floating: !0,
        for: y.value,
        style: A.value
      }, {
        default: () => [le()]
      }), h(wa, {
        ref: x,
        for: y.value
      }, {
        default: () => [le()]
      }), (R = l.default) == null ? void 0 : R.call(l, {
        ...O.value,
        props: {
          id: y.value,
          class: "v-field__input",
          "aria-describedby": p.value
        },
        focus: u,
        blur: c
      })]), z && h(Nu, {
        key: "clear"
      }, {
        default: () => [Je(h("div", {
          class: "v-field__clearable",
          onMousedown: (H) => {
            H.preventDefault(), H.stopPropagation();
          }
        }, [h(Te, {
          defaults: {
            VIcon: {
              icon: e.clearIcon
            }
          }
        }, {
          default: () => [l.clear ? l.clear({
            ...O.value,
            props: {
              onKeydown: L,
              onFocus: u,
              onBlur: c,
              onClick: e["onClick:clear"]
            }
          }) : h(f, {
            name: "clear",
            onKeydown: L,
            onFocus: u,
            onBlur: c
          }, null)]
        })]), [[mn, e.dirty]])]
      }), Q && h("div", {
        key: "append",
        class: "v-field__append-inner"
      }, [(F = l["append-inner"]) == null ? void 0 : F.call(l, O.value), e.appendInnerIcon && h(f, {
        key: "append-icon",
        name: "appendInner"
      }, null)]), h("div", {
        class: ["v-field__outline", E.value],
        style: A.value
      }, [M && h(he, null, [h("div", {
        class: "v-field__outline__start"
      }, null), g.value && h("div", {
        class: "v-field__outline__notch"
      }, [h(wa, {
        ref: w,
        floating: !0,
        for: y.value
      }, {
        default: () => [le()]
      })]), h("div", {
        class: "v-field__outline__end"
      }, null)]), k.value && g.value && h(wa, {
        ref: w,
        floating: !0,
        for: y.value
      }, {
        default: () => [le()]
      })])]);
    }), {
      controlRef: I
    };
  }
});
function Pp(e) {
  const t = Object.keys(Yc.props).filter((n) => !tl(n) && n !== "class" && n !== "style");
  return tu(e, t);
}
const $p = ["color", "file", "time", "date", "datetime-local", "week", "month"], qc = D({
  autofocus: Boolean,
  counter: [Boolean, Number, String],
  counterValue: [Number, Function],
  prefix: String,
  placeholder: String,
  persistentPlaceholder: Boolean,
  persistentCounter: Boolean,
  suffix: String,
  role: String,
  type: {
    type: String,
    default: "text"
  },
  modelModifiers: Object,
  ...wc(),
  ...Gc()
}, "VTextField"), Cr = U()({
  name: "VTextField",
  directives: {
    Intersect: Du
  },
  inheritAttrs: !1,
  props: qc(),
  emits: {
    "click:control": (e) => !0,
    "mousedown:control": (e) => !0,
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: a,
      slots: l
    } = t;
    const r = be(e, "modelValue"), {
      isFocused: i,
      focus: s,
      blur: o
    } = _c(e), u = _(() => typeof e.counterValue == "function" ? e.counterValue(r.value) : typeof e.counterValue == "number" ? e.counterValue : (r.value ?? "").toString().length), c = _(() => {
      if (n.maxlength) return n.maxlength;
      if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string"))
        return e.counter;
    }), f = _(() => ["plain", "underlined"].includes(e.variant));
    function d(k, C) {
      var S, E;
      !e.autofocus || !k || (E = (S = C[0].target) == null ? void 0 : S.focus) == null || E.call(S);
    }
    const m = Y(), v = Y(), g = Y(), b = _(() => $p.includes(e.type) || e.persistentPlaceholder || i.value || e.active);
    function y() {
      var k;
      g.value !== document.activeElement && ((k = g.value) == null || k.focus()), i.value || s();
    }
    function p(k) {
      a("mousedown:control", k), k.target !== g.value && (y(), k.preventDefault());
    }
    function x(k) {
      y(), a("click:control", k);
    }
    function w(k) {
      k.stopPropagation(), y(), We(() => {
        r.value = null, ng(e["onClick:clear"], k);
      });
    }
    function I(k) {
      var S;
      const C = k.target;
      if (r.value = C.value, (S = e.modelModifiers) != null && S.trim && ["text", "search", "password", "tel", "url"].includes(e.type)) {
        const E = [C.selectionStart, C.selectionEnd];
        We(() => {
          C.selectionStart = E[0], C.selectionEnd = E[1];
        });
      }
    }
    return Z(() => {
      const k = !!(l.counter || e.counter !== !1 && e.counter != null), C = !!(k || l.details), [S, E] = au(n), {
        modelValue: A,
        ...O
      } = Ys.filterProps(e), T = Pp(e);
      return h(Ys, q({
        ref: m,
        modelValue: r.value,
        "onUpdate:modelValue": (L) => r.value = L,
        class: ["v-text-field", {
          "v-text-field--prefixed": e.prefix,
          "v-text-field--suffixed": e.suffix,
          "v-input--plain-underlined": f.value
        }, e.class],
        style: e.style
      }, S, O, {
        centerAffix: !f.value,
        focused: i.value
      }), {
        ...l,
        default: (L) => {
          let {
            id: M,
            isDisabled: j,
            isDirty: z,
            isReadonly: Q,
            isValid: le
          } = L;
          return h(Yc, q({
            ref: v,
            onMousedown: p,
            onClick: x,
            "onClick:clear": w,
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"],
            role: e.role
          }, T, {
            id: M.value,
            active: b.value || z.value,
            dirty: z.value || e.dirty,
            disabled: j.value,
            focused: i.value,
            error: le.value === !1
          }), {
            ...l,
            default: (V) => {
              let {
                props: {
                  class: R,
                  ...F
                }
              } = V;
              const H = Je(h("input", q({
                ref: g,
                value: r.value,
                onInput: I,
                autofocus: e.autofocus,
                readonly: Q.value,
                disabled: j.value,
                name: e.name,
                placeholder: e.placeholder,
                size: 1,
                type: e.type,
                onFocus: y,
                onBlur: o
              }, F, E), null), [[Qt("intersect"), {
                handler: d
              }, null, {
                once: !0
              }]]);
              return h(he, null, [e.prefix && h("span", {
                class: "v-text-field__prefix"
              }, [h("span", {
                class: "v-text-field__prefix__text"
              }, [e.prefix])]), l.default ? h("div", {
                class: R,
                "data-no-activator": ""
              }, [l.default(), H]) : Qd(H, {
                class: R
              }), e.suffix && h("span", {
                class: "v-text-field__suffix"
              }, [h("span", {
                class: "v-text-field__suffix__text"
              }, [e.suffix])])]);
            }
          });
        },
        details: C ? (L) => {
          var M;
          return h(he, null, [(M = l.details) == null ? void 0 : M.call(l, L), k && h(he, null, [h("span", null, null), h(kp, {
            active: e.persistentCounter || i.value,
            value: u.value,
            max: c.value,
            disabled: e.disabled
          }, l.counter)])]);
        } : void 0
      });
    }), gl({}, m, v, g);
  }
}), Tp = D({
  renderless: Boolean,
  ...re()
}, "VVirtualScrollItem"), Ap = U()({
  name: "VVirtualScrollItem",
  inheritAttrs: !1,
  props: Tp(),
  emits: {
    "update:height": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: a,
      slots: l
    } = t;
    const {
      resizeRef: r,
      contentRect: i
    } = vn(void 0, "border");
    ne(() => {
      var s;
      return (s = i.value) == null ? void 0 : s.height;
    }, (s) => {
      s != null && a("update:height", s);
    }), Z(() => {
      var s, o;
      return e.renderless ? h(he, null, [(s = l.default) == null ? void 0 : s.call(l, {
        itemRef: r
      })]) : h("div", q({
        ref: r,
        class: ["v-virtual-scroll__item", e.class],
        style: e.style
      }, n), [(o = l.default) == null ? void 0 : o.call(l)]);
    });
  }
}), Op = -1, Lp = 1, Ul = 100, Vp = D({
  itemHeight: {
    type: [Number, String],
    default: null
  },
  height: [Number, String]
}, "virtual");
function Np(e, t) {
  const n = nn(), a = J(0);
  rt(() => {
    a.value = parseFloat(e.itemHeight || 0);
  });
  const l = J(0), r = J(Math.ceil(
    // Assume 16px items filling the entire screen height if
    // not provided. This is probably incorrect but it minimises
    // the chance of ending up with empty space at the bottom.
    // The default value is set here to avoid poisoning getSize()
    (parseInt(e.height) || n.height.value) / (a.value || 16)
  ) || 1), i = J(0), s = J(0), o = Y(), u = Y();
  let c = 0;
  const {
    resizeRef: f,
    contentRect: d
  } = vn();
  rt(() => {
    f.value = o.value;
  });
  const m = _(() => {
    var V;
    return o.value === document.documentElement ? n.height.value : ((V = d.value) == null ? void 0 : V.height) || parseInt(e.height) || 0;
  }), v = _(() => !!(o.value && u.value && m.value && a.value));
  let g = Array.from({
    length: t.value.length
  }), b = Array.from({
    length: t.value.length
  });
  const y = J(0);
  let p = -1;
  function x(V) {
    return g[V] || a.value;
  }
  const w = Zm(() => {
    const V = performance.now();
    b[0] = 0;
    const R = t.value.length;
    for (let F = 1; F <= R - 1; F++)
      b[F] = (b[F - 1] || 0) + x(F - 1);
    y.value = Math.max(y.value, performance.now() - V);
  }, y), I = ne(v, (V) => {
    V && (I(), c = u.value.offsetTop, w.immediate(), j(), ~p && We(() => {
      ke && window.requestAnimationFrame(() => {
        Q(p), p = -1;
      });
    }));
  });
  Ge(() => {
    w.clear();
  });
  function k(V, R) {
    const F = g[V], H = a.value;
    a.value = H ? Math.min(a.value, R) : R, (F !== R || H !== a.value) && (g[V] = R, w());
  }
  function C(V) {
    return V = ft(V, 0, t.value.length - 1), b[V] || 0;
  }
  function S(V) {
    return Rp(b, V);
  }
  let E = 0, A = 0, O = 0;
  ne(m, (V, R) => {
    R && (j(), V < R && requestAnimationFrame(() => {
      A = 0, j();
    }));
  });
  function T() {
    if (!o.value || !u.value) return;
    const V = o.value.scrollTop, R = performance.now();
    R - O > 500 ? (A = Math.sign(V - E), c = u.value.offsetTop) : A = V - E, E = V, O = R, j();
  }
  function L() {
    !o.value || !u.value || (A = 0, O = 0, j());
  }
  let M = -1;
  function j() {
    cancelAnimationFrame(M), M = requestAnimationFrame(z);
  }
  function z() {
    if (!o.value || !m.value) return;
    const V = E - c, R = Math.sign(A), F = Math.max(0, V - Ul), H = ft(S(F), 0, t.value.length), ie = V + m.value + Ul, te = ft(S(ie) + 1, H + 1, t.value.length);
    if (
      // Only update the side we're scrolling towards,
      // the other side will be updated incidentally
      (R !== Op || H < l.value) && (R !== Lp || te > r.value)
    ) {
      const ue = C(l.value) - C(H), X = C(te) - C(r.value);
      Math.max(ue, X) > Ul ? (l.value = H, r.value = te) : (H <= 0 && (l.value = H), te >= t.value.length && (r.value = te));
    }
    i.value = C(l.value), s.value = C(t.value.length) - C(r.value);
  }
  function Q(V) {
    const R = C(V);
    !o.value || V && !R ? p = V : o.value.scrollTop = R;
  }
  const le = _(() => t.value.slice(l.value, r.value).map((V, R) => ({
    raw: V,
    index: R + l.value
  })));
  return ne(t, () => {
    g = Array.from({
      length: t.value.length
    }), b = Array.from({
      length: t.value.length
    }), w.immediate(), j();
  }, {
    deep: !0
  }), {
    calculateVisibleItems: j,
    containerRef: o,
    markerRef: u,
    computedItems: le,
    paddingTop: i,
    paddingBottom: s,
    scrollToIndex: Q,
    handleScroll: T,
    handleScrollend: L,
    handleItemResize: k
  };
}
function Rp(e, t) {
  let n = e.length - 1, a = 0, l = 0, r = null, i = -1;
  if (e[n] < t)
    return n;
  for (; a <= n; )
    if (l = a + n >> 1, r = e[l], r > t)
      n = l - 1;
    else if (r < t)
      i = l, a = l + 1;
    else return r === t ? l : a;
  return i;
}
const Fp = D({
  items: {
    type: Array,
    default: () => []
  },
  renderless: Boolean,
  ...Vp(),
  ...re(),
  ...mt()
}, "VVirtualScroll"), Dp = U()({
  name: "VVirtualScroll",
  props: Fp(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = Ae("VVirtualScroll"), {
      dimensionStyles: l
    } = gt(e), {
      calculateVisibleItems: r,
      containerRef: i,
      markerRef: s,
      handleScroll: o,
      handleScrollend: u,
      handleItemResize: c,
      scrollToIndex: f,
      paddingTop: d,
      paddingBottom: m,
      computedItems: v
    } = Np(e, K(e, "items"));
    return _t(() => e.renderless, () => {
      function g() {
        var p, x;
        const y = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1) ? "addEventListener" : "removeEventListener";
        i.value === document.documentElement ? (document[y]("scroll", o, {
          passive: !0
        }), document[y]("scrollend", u)) : ((p = i.value) == null || p[y]("scroll", o, {
          passive: !0
        }), (x = i.value) == null || x[y]("scrollend", u));
      }
      Lt(() => {
        i.value = yu(a.vnode.el, !0), g(!0);
      }), Ge(g);
    }), Z(() => {
      const g = v.value.map((b) => h(Ap, {
        key: b.index,
        renderless: e.renderless,
        "onUpdate:height": (y) => c(b.index, y)
      }, {
        default: (y) => {
          var p;
          return (p = n.default) == null ? void 0 : p.call(n, {
            item: b.raw,
            index: b.index,
            ...y
          });
        }
      }));
      return e.renderless ? h(he, null, [h("div", {
        ref: s,
        class: "v-virtual-scroll__spacer",
        style: {
          paddingTop: ee(d.value)
        }
      }, null), g, h("div", {
        class: "v-virtual-scroll__spacer",
        style: {
          paddingBottom: ee(m.value)
        }
      }, null)]) : h("div", {
        ref: i,
        class: ["v-virtual-scroll", e.class],
        onScrollPassive: o,
        onScrollend: u,
        style: [l.value, e.style]
      }, [h("div", {
        ref: s,
        class: "v-virtual-scroll__container",
        style: {
          paddingTop: ee(d.value),
          paddingBottom: ee(m.value)
        }
      }, [g])]);
    }), {
      calculateVisibleItems: r,
      scrollToIndex: f
    };
  }
});
function Mp(e, t) {
  const n = J(!1);
  let a;
  function l(s) {
    cancelAnimationFrame(a), n.value = !0, a = requestAnimationFrame(() => {
      a = requestAnimationFrame(() => {
        n.value = !1;
      });
    });
  }
  async function r() {
    await new Promise((s) => requestAnimationFrame(s)), await new Promise((s) => requestAnimationFrame(s)), await new Promise((s) => requestAnimationFrame(s)), await new Promise((s) => {
      if (n.value) {
        const o = ne(n, () => {
          o(), s();
        });
      } else s();
    });
  }
  async function i(s) {
    var c, f;
    if (s.key === "Tab" && ((c = t.value) == null || c.focus()), !["PageDown", "PageUp", "Home", "End"].includes(s.key)) return;
    const o = (f = e.value) == null ? void 0 : f.$el;
    if (!o) return;
    (s.key === "Home" || s.key === "End") && o.scrollTo({
      top: s.key === "Home" ? 0 : o.scrollHeight,
      behavior: "smooth"
    }), await r();
    const u = o.querySelectorAll(":scope > :not(.v-virtual-scroll__spacer)");
    if (s.key === "PageDown" || s.key === "Home") {
      const d = o.getBoundingClientRect().top;
      for (const m of u)
        if (m.getBoundingClientRect().top >= d) {
          m.focus();
          break;
        }
    } else {
      const d = o.getBoundingClientRect().bottom;
      for (const m of [...u].reverse())
        if (m.getBoundingClientRect().bottom <= d) {
          m.focus();
          break;
        }
    }
  }
  return {
    onScrollPassive: l,
    onKeydown: i
  };
}
const Bp = D({
  chips: Boolean,
  closableChips: Boolean,
  closeText: {
    type: String,
    default: "$vuetify.close"
  },
  openText: {
    type: String,
    default: "$vuetify.open"
  },
  eager: Boolean,
  hideNoData: Boolean,
  hideSelected: Boolean,
  listProps: {
    type: Object
  },
  menu: Boolean,
  menuIcon: {
    type: oe,
    default: "$dropdown"
  },
  menuProps: {
    type: Object
  },
  multiple: Boolean,
  noDataText: {
    type: String,
    default: "$vuetify.noDataText"
  },
  openOnClear: Boolean,
  itemColor: String,
  ...Oc({
    itemChildren: !1
  })
}, "Select"), Hp = D({
  ...Bp(),
  ...tn(qc({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...oa({
    transition: {
      component: Ou
    }
  })
}, "VSelect"), Xc = U()({
  name: "VSelect",
  props: Hp(),
  emits: {
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0,
    "update:menu": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      t: a
    } = Et(), l = Y(), r = Y(), i = Y(), s = be(e, "menu"), o = _({
      get: () => s.value,
      set: (V) => {
        var R;
        s.value && !V && ((R = r.value) != null && R.ΨopenChildren.size) || (s.value = V);
      }
    }), {
      items: u,
      transformIn: c,
      transformOut: f
    } = Xb(e), d = be(e, "modelValue", [], (V) => c(V === null ? [null] : Ke(V)), (V) => {
      const R = f(V);
      return e.multiple ? R : R[0] ?? null;
    }), m = _(() => typeof e.counterValue == "function" ? e.counterValue(d.value) : typeof e.counterValue == "number" ? e.counterValue : d.value.length), v = Sc(), g = _(() => d.value.map((V) => V.value)), b = J(!1), y = _(() => o.value ? e.closeText : e.openText);
    let p = "", x;
    const w = _(() => e.hideSelected ? u.value.filter((V) => !d.value.some((R) => e.valueComparator(R, V))) : u.value), I = _(() => e.hideNoData && !w.value.length || e.readonly || (v == null ? void 0 : v.isReadonly.value)), k = _(() => {
      var V;
      return {
        ...e.menuProps,
        activatorProps: {
          ...((V = e.menuProps) == null ? void 0 : V.activatorProps) || {},
          "aria-haspopup": "listbox"
          // Set aria-haspopup to 'listbox'
        }
      };
    }), C = Y(), S = Mp(C, l);
    function E(V) {
      e.openOnClear && (o.value = !0);
    }
    function A() {
      I.value || (o.value = !o.value);
    }
    function O(V) {
      os(V) && T(V);
    }
    function T(V) {
      var ie, te;
      if (!V.key || e.readonly || v != null && v.isReadonly.value) return;
      ["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(V.key) && V.preventDefault(), ["Enter", "ArrowDown", " "].includes(V.key) && (o.value = !0), ["Escape", "Tab"].includes(V.key) && (o.value = !1), V.key === "Home" ? (ie = C.value) == null || ie.focus("first") : V.key === "End" && ((te = C.value) == null || te.focus("last"));
      const R = 1e3;
      if (e.multiple || !os(V)) return;
      const F = performance.now();
      F - x > R && (p = ""), p += V.key.toLowerCase(), x = F;
      const H = u.value.find((ue) => ue.title.toLowerCase().startsWith(p));
      if (H !== void 0) {
        d.value = [H];
        const ue = w.value.indexOf(H);
        ke && window.requestAnimationFrame(() => {
          var X;
          ue >= 0 && ((X = i.value) == null || X.scrollToIndex(ue));
        });
      }
    }
    function L(V) {
      let R = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!V.props.disabled)
        if (e.multiple) {
          const F = d.value.findIndex((ie) => e.valueComparator(ie.value, V.value)), H = R ?? !~F;
          if (~F) {
            const ie = H ? [...d.value, V] : [...d.value];
            ie.splice(F, 1), d.value = ie;
          } else H && (d.value = [...d.value, V]);
        } else {
          const F = R !== !1;
          d.value = F ? [V] : [], We(() => {
            o.value = !1;
          });
        }
    }
    function M(V) {
      var R;
      (R = C.value) != null && R.$el.contains(V.relatedTarget) || (o.value = !1);
    }
    function j() {
      var V;
      e.eager && ((V = i.value) == null || V.calculateVisibleItems());
    }
    function z() {
      var V;
      b.value && ((V = l.value) == null || V.focus());
    }
    function Q(V) {
      b.value = !0;
    }
    function le(V) {
      if (V == null) d.value = [];
      else if (La(l.value, ":autofill") || La(l.value, ":-webkit-autofill")) {
        const R = u.value.find((F) => F.title === V);
        R && L(R);
      } else l.value && (l.value.value = "");
    }
    return ne(o, () => {
      if (!e.hideSelected && o.value && d.value.length) {
        const V = w.value.findIndex((R) => d.value.some((F) => e.valueComparator(F.value, R.value)));
        ke && window.requestAnimationFrame(() => {
          var R;
          V >= 0 && ((R = i.value) == null || R.scrollToIndex(V));
        });
      }
    }), ne(() => e.items, (V, R) => {
      o.value || b.value && !R.length && V.length && (o.value = !0);
    }), Z(() => {
      const V = !!(e.chips || n.chip), R = !!(!e.hideNoData || w.value.length || n["prepend-item"] || n["append-item"] || n["no-data"]), F = d.value.length > 0, H = Cr.filterProps(e), ie = F || !b.value && e.label && !e.persistentPlaceholder ? void 0 : e.placeholder;
      return h(Cr, q({
        ref: l
      }, H, {
        modelValue: d.value.map((te) => te.props.value).join(", "),
        "onUpdate:modelValue": le,
        focused: b.value,
        "onUpdate:focused": (te) => b.value = te,
        validationValue: d.externalValue,
        counterValue: m.value,
        dirty: F,
        class: ["v-select", {
          "v-select--active-menu": o.value,
          "v-select--chips": !!e.chips,
          [`v-select--${e.multiple ? "multiple" : "single"}`]: !0,
          "v-select--selected": d.value.length,
          "v-select--selection-slot": !!n.selection
        }, e.class],
        style: e.style,
        inputmode: "none",
        placeholder: ie,
        "onClick:clear": E,
        "onMousedown:control": A,
        onBlur: M,
        onKeydown: T,
        "aria-label": a(y.value),
        title: a(y.value)
      }), {
        ...n,
        default: () => h(he, null, [h(zc, q({
          ref: r,
          modelValue: o.value,
          "onUpdate:modelValue": (te) => o.value = te,
          activator: "parent",
          contentClass: "v-select__content",
          disabled: I.value,
          eager: e.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: e.transition,
          onAfterEnter: j,
          onAfterLeave: z
        }, k.value), {
          default: () => [R && h(Nc, q({
            ref: C,
            selected: g.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: (te) => te.preventDefault(),
            onKeydown: O,
            onFocusin: Q,
            tabindex: "-1",
            "aria-live": "polite",
            color: e.itemColor ?? e.color
          }, S, e.listProps), {
            default: () => {
              var te, ue, X;
              return [(te = n["prepend-item"]) == null ? void 0 : te.call(n), !w.value.length && !e.hideNoData && (((ue = n["no-data"]) == null ? void 0 : ue.call(n)) ?? h(aa, {
                title: a(e.noDataText)
              }, null)), h(Dp, {
                ref: i,
                renderless: !0,
                items: w.value
              }, {
                default: (se) => {
                  var Dt;
                  let {
                    item: ce,
                    index: Oe,
                    itemRef: ve
                  } = se;
                  const yt = q(ce.props, {
                    ref: ve,
                    key: Oe,
                    onClick: () => L(ce, null)
                  });
                  return ((Dt = n.item) == null ? void 0 : Dt.call(n, {
                    item: ce,
                    index: Oe,
                    props: yt
                  })) ?? h(aa, q(yt, {
                    role: "option"
                  }), {
                    prepend: ($t) => {
                      let {
                        isSelected: Ct
                      } = $t;
                      return h(he, null, [e.multiple && !e.hideSelected ? h(vl, {
                        key: ce.value,
                        modelValue: Ct,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, ce.props.prependAvatar && h(hn, {
                        image: ce.props.prependAvatar
                      }, null), ce.props.prependIcon && h(Ve, {
                        icon: ce.props.prependIcon
                      }, null)]);
                    }
                  });
                }
              }), (X = n["append-item"]) == null ? void 0 : X.call(n)];
            }
          })]
        }), d.value.map((te, ue) => {
          function X(ve) {
            ve.stopPropagation(), ve.preventDefault(), L(te, !1);
          }
          const se = {
            "onClick:close": X,
            onKeydown(ve) {
              ve.key !== "Enter" && ve.key !== " " || (ve.preventDefault(), ve.stopPropagation(), X(ve));
            },
            onMousedown(ve) {
              ve.preventDefault(), ve.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, ce = V ? !!n.chip : !!n.selection, Oe = ce ? su(V ? n.chip({
            item: te,
            index: ue,
            props: se
          }) : n.selection({
            item: te,
            index: ue
          })) : void 0;
          if (!(ce && !Oe))
            return h("div", {
              key: te.value,
              class: "v-select__selection"
            }, [V ? n.chip ? h(Te, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: e.closableChips,
                  size: "small",
                  text: te.title
                }
              }
            }, {
              default: () => [Oe]
            }) : h(ei, q({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: te.title,
              disabled: te.props.disabled
            }, se), null) : Oe ?? h("span", {
              class: "v-select__selection-text"
            }, [te.title, e.multiple && ue < d.value.length - 1 && h("span", {
              class: "v-select__selection-comma"
            }, [zl(",")])])]);
        })]),
        "append-inner": function() {
          var se;
          for (var te = arguments.length, ue = new Array(te), X = 0; X < te; X++)
            ue[X] = arguments[X];
          return h(he, null, [(se = n["append-inner"]) == null ? void 0 : se.call(n, ...ue), e.menuIcon ? h(Ve, {
            class: "v-select__menu-icon",
            icon: e.menuIcon
          }, null) : void 0]);
        }
      });
    }), gl({
      isFocused: b,
      menu: o,
      select: L
    }, l);
  }
}), Qc = D({
  page: {
    type: [Number, String],
    default: 1
  },
  itemsPerPage: {
    type: [Number, String],
    default: 10
  }
}, "DataTable-paginate"), Jc = Symbol.for("vuetify:data-table-pagination");
function Zc(e) {
  const t = be(e, "page", void 0, (a) => +(a ?? 1)), n = be(e, "itemsPerPage", void 0, (a) => +(a ?? 10));
  return {
    page: t,
    itemsPerPage: n
  };
}
function ed(e) {
  const {
    page: t,
    itemsPerPage: n,
    itemsLength: a
  } = e, l = _(() => n.value === -1 ? 0 : n.value * (t.value - 1)), r = _(() => n.value === -1 ? a.value : Math.min(a.value, l.value + n.value)), i = _(() => n.value === -1 || a.value === 0 ? 1 : Math.ceil(a.value / n.value));
  ne([t, i], () => {
    t.value > i.value && (t.value = i.value);
  });
  function s(d) {
    n.value = d, t.value = 1;
  }
  function o() {
    t.value = ft(t.value + 1, 1, i.value);
  }
  function u() {
    t.value = ft(t.value - 1, 1, i.value);
  }
  function c(d) {
    t.value = ft(d, 1, i.value);
  }
  const f = {
    page: t,
    itemsPerPage: n,
    startIndex: l,
    stopIndex: r,
    pageCount: i,
    itemsLength: a,
    nextPage: o,
    prevPage: u,
    setPage: c,
    setItemsPerPage: s
  };
  return Ee(Jc, f), f;
}
function Wp() {
  const e = ye(Jc);
  if (!e) throw new Error("Missing pagination!");
  return e;
}
function Kp(e) {
  const t = Ae("usePaginatedItems"), {
    items: n,
    startIndex: a,
    stopIndex: l,
    itemsPerPage: r
  } = e, i = _(() => r.value <= 0 ? n.value : n.value.slice(a.value, l.value));
  return ne(i, (s) => {
    t.emit("update:currentItems", s);
  }), {
    paginatedItems: i
  };
}
const ri = D({
  prevIcon: {
    type: oe,
    default: "$prev"
  },
  nextIcon: {
    type: oe,
    default: "$next"
  },
  firstIcon: {
    type: oe,
    default: "$first"
  },
  lastIcon: {
    type: oe,
    default: "$last"
  },
  itemsPerPageText: {
    type: String,
    default: "$vuetify.dataFooter.itemsPerPageText"
  },
  pageText: {
    type: String,
    default: "$vuetify.dataFooter.pageText"
  },
  firstPageLabel: {
    type: String,
    default: "$vuetify.dataFooter.firstPage"
  },
  prevPageLabel: {
    type: String,
    default: "$vuetify.dataFooter.prevPage"
  },
  nextPageLabel: {
    type: String,
    default: "$vuetify.dataFooter.nextPage"
  },
  lastPageLabel: {
    type: String,
    default: "$vuetify.dataFooter.lastPage"
  },
  itemsPerPageOptions: {
    type: Array,
    default: () => [{
      value: 10,
      title: "10"
    }, {
      value: 25,
      title: "25"
    }, {
      value: 50,
      title: "50"
    }, {
      value: 100,
      title: "100"
    }, {
      value: -1,
      title: "$vuetify.dataFooter.itemsPerPageAll"
    }]
  },
  showCurrentPage: Boolean
}, "VDataTableFooter"), Ha = U()({
  name: "VDataTableFooter",
  props: ri(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      t: a
    } = Et(), {
      page: l,
      pageCount: r,
      startIndex: i,
      stopIndex: s,
      itemsLength: o,
      itemsPerPage: u,
      setItemsPerPage: c
    } = Wp(), f = _(() => e.itemsPerPageOptions.map((d) => typeof d == "number" ? {
      value: d,
      title: d === -1 ? a("$vuetify.dataFooter.itemsPerPageAll") : String(d)
    } : {
      ...d,
      title: isNaN(Number(d.title)) ? a(d.title) : d.title
    }));
    return Z(() => {
      var m;
      const d = yr.filterProps(e);
      return h("div", {
        class: "v-data-table-footer"
      }, [(m = n.prepend) == null ? void 0 : m.call(n), h("div", {
        class: "v-data-table-footer__items-per-page"
      }, [h("span", null, [a(e.itemsPerPageText)]), h(Xc, {
        items: f.value,
        modelValue: u.value,
        "onUpdate:modelValue": (v) => c(Number(v)),
        density: "compact",
        variant: "outlined",
        "hide-details": !0
      }, null)]), h("div", {
        class: "v-data-table-footer__info"
      }, [h("div", null, [a(e.pageText, o.value ? i.value + 1 : 0, s.value, o.value)])]), h("div", {
        class: "v-data-table-footer__pagination"
      }, [h(yr, q({
        modelValue: l.value,
        "onUpdate:modelValue": (v) => l.value = v,
        density: "comfortable",
        "first-aria-label": e.firstPageLabel,
        "last-aria-label": e.lastPageLabel,
        length: r.value,
        "next-aria-label": e.nextPageLabel,
        "previous-aria-label": e.prevPageLabel,
        rounded: !0,
        "show-first-last-page": !0,
        "total-visible": e.showCurrentPage ? 1 : 0,
        variant: "plain"
      }, d), null)])]);
    }), {};
  }
}), Wa = Lg({
  align: {
    type: String,
    default: "start"
  },
  fixed: Boolean,
  fixedOffset: [Number, String],
  height: [Number, String],
  lastFixed: Boolean,
  noPadding: Boolean,
  tag: String,
  width: [Number, String],
  maxWidth: [Number, String],
  nowrap: Boolean
}, (e, t) => {
  let {
    slots: n
  } = t;
  const a = e.tag ?? "td";
  return h(a, {
    class: ["v-data-table__td", {
      "v-data-table-column--fixed": e.fixed,
      "v-data-table-column--last-fixed": e.lastFixed,
      "v-data-table-column--no-padding": e.noPadding,
      "v-data-table-column--nowrap": e.nowrap
    }, `v-data-table-column--align-${e.align}`],
    style: {
      height: ee(e.height),
      width: ee(e.width),
      maxWidth: ee(e.maxWidth),
      left: ee(e.fixedOffset || null)
    }
  }, {
    default: () => {
      var l;
      return [(l = n.default) == null ? void 0 : l.call(n)];
    }
  });
}), jp = D({
  headers: Array
}, "DataTable-header"), td = Symbol.for("vuetify:data-table-headers"), nd = {
  title: "",
  sortable: !1
}, Up = {
  ...nd,
  width: 48
};
function zp() {
  const t = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []).map((n) => ({
    element: n,
    priority: 0
  }));
  return {
    enqueue: (n, a) => {
      let l = !1;
      for (let r = 0; r < t.length; r++)
        if (t[r].priority > a) {
          t.splice(r, 0, {
            element: n,
            priority: a
          }), l = !0;
          break;
        }
      l || t.push({
        element: n,
        priority: a
      });
    },
    size: () => t.length,
    count: () => {
      let n = 0;
      if (!t.length) return 0;
      const a = Math.floor(t[0].priority);
      for (let l = 0; l < t.length; l++)
        Math.floor(t[l].priority) === a && (n += 1);
      return n;
    },
    dequeue: () => t.shift()
  };
}
function Ir(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  if (!e.children)
    t.push(e);
  else
    for (const n of e.children)
      Ir(n, t);
  return t;
}
function ad(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : /* @__PURE__ */ new Set();
  for (const n of e)
    n.key && t.add(n.key), n.children && ad(n.children, t);
  return t;
}
function Gp(e) {
  if (e.key) {
    if (e.key === "data-table-group") return nd;
    if (["data-table-expand", "data-table-select"].includes(e.key)) return Up;
  }
}
function ii(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return e.children ? Math.max(t, ...e.children.map((n) => ii(n, t + 1))) : t;
}
function Yp(e) {
  let t = !1;
  function n(r) {
    let i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (r)
      if (i && (r.fixed = !0), r.fixed)
        if (r.children)
          for (let s = r.children.length - 1; s >= 0; s--)
            n(r.children[s], !0);
        else
          t ? isNaN(+r.width) && Xn(`Multiple fixed columns should have a static width (key: ${r.key})`) : r.lastFixed = !0, t = !0;
      else if (r.children)
        for (let s = r.children.length - 1; s >= 0; s--)
          n(r.children[s]);
      else
        t = !1;
  }
  for (let r = e.length - 1; r >= 0; r--)
    n(e[r]);
  function a(r) {
    let i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    if (!r) return i;
    if (r.children) {
      r.fixedOffset = i;
      for (const s of r.children)
        i = a(s, i);
    } else r.fixed && (r.fixedOffset = i, i += parseFloat(r.width || "0") || 0);
    return i;
  }
  let l = 0;
  for (const r of e)
    l = a(r, l);
}
function qp(e, t) {
  const n = [];
  let a = 0;
  const l = zp(e);
  for (; l.size() > 0; ) {
    let i = l.count();
    const s = [];
    let o = 1;
    for (; i > 0; ) {
      const {
        element: u,
        priority: c
      } = l.dequeue(), f = t - a - ii(u);
      if (s.push({
        ...u,
        rowspan: f ?? 1,
        colspan: u.children ? Ir(u).length : 1
      }), u.children)
        for (const d of u.children) {
          const m = c % 1 + o / Math.pow(10, a + 2);
          l.enqueue(d, a + f + m);
        }
      o += 1, i -= 1;
    }
    a += 1, n.push(s);
  }
  return {
    columns: e.map((i) => Ir(i)).flat(),
    headers: n
  };
}
function ld(e) {
  const t = [];
  for (const n of e) {
    const a = {
      ...Gp(n),
      ...n
    }, l = a.key ?? (typeof a.value == "string" ? a.value : null), r = a.value ?? l ?? null, i = {
      ...a,
      key: l,
      value: r,
      sortable: a.sortable ?? (a.key != null || !!a.sort),
      children: a.children ? ld(a.children) : void 0
    };
    t.push(i);
  }
  return t;
}
function rd(e, t) {
  const n = Y([]), a = Y([]), l = Y({}), r = Y({}), i = Y({});
  rt(() => {
    var g, b, y;
    const u = (e.headers || Object.keys(e.items[0] ?? {}).map((p) => ({
      key: p,
      title: Ln(p)
    }))).slice(), c = ad(u);
    (g = t == null ? void 0 : t.groupBy) != null && g.value.length && !c.has("data-table-group") && u.unshift({
      key: "data-table-group",
      title: "Group"
    }), (b = t == null ? void 0 : t.showSelect) != null && b.value && !c.has("data-table-select") && u.unshift({
      key: "data-table-select"
    }), (y = t == null ? void 0 : t.showExpand) != null && y.value && !c.has("data-table-expand") && u.push({
      key: "data-table-expand"
    });
    const f = ld(u);
    Yp(f);
    const d = Math.max(...f.map((p) => ii(p))) + 1, m = qp(f, d);
    n.value = m.headers, a.value = m.columns;
    const v = m.headers.flat(1);
    for (const p of v)
      p.key && (p.sortable && (p.sort && (l.value[p.key] = p.sort), p.sortRaw && (r.value[p.key] = p.sortRaw)), p.filter && (i.value[p.key] = p.filter));
  });
  const s = {
    headers: n,
    columns: a,
    sortFunctions: l,
    sortRawFunctions: r,
    filterFunctions: i
  };
  return Ee(td, s), s;
}
function yl() {
  const e = ye(td);
  if (!e) throw new Error("Missing headers!");
  return e;
}
const Xp = {
  showSelectAll: !1,
  allSelected: () => [],
  select: (e) => {
    var a;
    let {
      items: t,
      value: n
    } = e;
    return new Set(n ? [(a = t[0]) == null ? void 0 : a.value] : []);
  },
  selectAll: (e) => {
    let {
      selected: t
    } = e;
    return t;
  }
}, id = {
  showSelectAll: !0,
  allSelected: (e) => {
    let {
      currentPage: t
    } = e;
    return t;
  },
  select: (e) => {
    let {
      items: t,
      value: n,
      selected: a
    } = e;
    for (const l of t)
      n ? a.add(l.value) : a.delete(l.value);
    return a;
  },
  selectAll: (e) => {
    let {
      value: t,
      currentPage: n,
      selected: a
    } = e;
    return id.select({
      items: n,
      value: t,
      selected: a
    });
  }
}, sd = {
  showSelectAll: !0,
  allSelected: (e) => {
    let {
      allItems: t
    } = e;
    return t;
  },
  select: (e) => {
    let {
      items: t,
      value: n,
      selected: a
    } = e;
    for (const l of t)
      n ? a.add(l.value) : a.delete(l.value);
    return a;
  },
  selectAll: (e) => {
    let {
      value: t,
      allItems: n,
      selected: a
    } = e;
    return sd.select({
      items: n,
      value: t,
      selected: a
    });
  }
}, Qp = D({
  showSelect: Boolean,
  selectStrategy: {
    type: [String, Object],
    default: "page"
  },
  modelValue: {
    type: Array,
    default: () => []
  },
  valueComparator: {
    type: Function,
    default: en
  }
}, "DataTable-select"), od = Symbol.for("vuetify:data-table-selection");
function ud(e, t) {
  let {
    allItems: n,
    currentPage: a
  } = t;
  const l = be(e, "modelValue", e.modelValue, (y) => new Set(Ke(y).map((p) => {
    var x;
    return ((x = n.value.find((w) => e.valueComparator(p, w.value))) == null ? void 0 : x.value) ?? p;
  })), (y) => [...y.values()]), r = _(() => n.value.filter((y) => y.selectable)), i = _(() => a.value.filter((y) => y.selectable)), s = _(() => {
    if (typeof e.selectStrategy == "object") return e.selectStrategy;
    switch (e.selectStrategy) {
      case "single":
        return Xp;
      case "all":
        return sd;
      case "page":
      default:
        return id;
    }
  });
  function o(y) {
    return Ke(y).every((p) => l.value.has(p.value));
  }
  function u(y) {
    return Ke(y).some((p) => l.value.has(p.value));
  }
  function c(y, p) {
    const x = s.value.select({
      items: y,
      value: p,
      selected: new Set(l.value)
    });
    l.value = x;
  }
  function f(y) {
    c([y], !o([y]));
  }
  function d(y) {
    const p = s.value.selectAll({
      value: y,
      allItems: r.value,
      currentPage: i.value,
      selected: new Set(l.value)
    });
    l.value = p;
  }
  const m = _(() => l.value.size > 0), v = _(() => {
    const y = s.value.allSelected({
      allItems: r.value,
      currentPage: i.value
    });
    return !!y.length && o(y);
  }), g = _(() => s.value.showSelectAll), b = {
    toggleSelect: f,
    select: c,
    selectAll: d,
    isSelected: o,
    isSomeSelected: u,
    someSelected: m,
    allSelected: v,
    showSelectAll: g
  };
  return Ee(od, b), b;
}
function bl() {
  const e = ye(od);
  if (!e) throw new Error("Missing selection!");
  return e;
}
const Jp = D({
  sortBy: {
    type: Array,
    default: () => []
  },
  customKeySort: Object,
  multiSort: Boolean,
  mustSort: Boolean
}, "DataTable-sort"), cd = Symbol.for("vuetify:data-table-sort");
function dd(e) {
  const t = be(e, "sortBy"), n = K(e, "mustSort"), a = K(e, "multiSort");
  return {
    sortBy: t,
    mustSort: n,
    multiSort: a
  };
}
function fd(e) {
  const {
    sortBy: t,
    mustSort: n,
    multiSort: a,
    page: l
  } = e, r = (o) => {
    if (o.key == null) return;
    let u = t.value.map((f) => ({
      ...f
    })) ?? [];
    const c = u.find((f) => f.key === o.key);
    c ? c.order === "desc" ? n.value ? c.order = "asc" : u = u.filter((f) => f.key !== o.key) : c.order = "desc" : a.value ? u = [...u, {
      key: o.key,
      order: "asc"
    }] : u = [{
      key: o.key,
      order: "asc"
    }], t.value = u, l && (l.value = 1);
  };
  function i(o) {
    return !!t.value.find((u) => u.key === o.key);
  }
  const s = {
    sortBy: t,
    toggleSort: r,
    isSorted: i
  };
  return Ee(cd, s), s;
}
function vd() {
  const e = ye(cd);
  if (!e) throw new Error("Missing sort!");
  return e;
}
function Zp(e, t, n, a) {
  const l = Et();
  return {
    sortedItems: _(() => {
      var i, s;
      return n.value.length ? e_(t.value, n.value, l.current.value, {
        transform: a == null ? void 0 : a.transform,
        sortFunctions: {
          ...e.customKeySort,
          ...(i = a == null ? void 0 : a.sortFunctions) == null ? void 0 : i.value
        },
        sortRawFunctions: (s = a == null ? void 0 : a.sortRawFunctions) == null ? void 0 : s.value
      }) : t.value;
    })
  };
}
function e_(e, t, n, a) {
  const l = new Intl.Collator(n, {
    sensitivity: "accent",
    usage: "sort"
  });
  return e.map((i) => [i, a != null && a.transform ? a.transform(i) : i]).sort((i, s) => {
    var o, u;
    for (let c = 0; c < t.length; c++) {
      let f = !1;
      const d = t[c].key, m = t[c].order ?? "asc";
      if (m === !1) continue;
      let v = fn(i[1], d), g = fn(s[1], d), b = i[0].raw, y = s[0].raw;
      if (m === "desc" && ([v, g] = [g, v], [b, y] = [y, b]), (o = a == null ? void 0 : a.sortRawFunctions) != null && o[d]) {
        const p = a.sortRawFunctions[d](b, y);
        if (p == null) continue;
        if (f = !0, p) return p;
      }
      if ((u = a == null ? void 0 : a.sortFunctions) != null && u[d]) {
        const p = a.sortFunctions[d](v, g);
        if (p == null) continue;
        if (f = !0, p) return p;
      }
      if (!f) {
        if (v instanceof Date && g instanceof Date)
          return v.getTime() - g.getTime();
        if ([v, g] = [v, g].map((p) => p != null ? p.toString().toLocaleLowerCase() : p), v !== g)
          return ba(v) && ba(g) ? 0 : ba(v) ? -1 : ba(g) ? 1 : !isNaN(v) && !isNaN(g) ? Number(v) - Number(g) : l.compare(v, g);
      }
    }
    return 0;
  }).map((i) => {
    let [s] = i;
    return s;
  });
}
const hd = D({
  color: String,
  sticky: Boolean,
  disableSort: Boolean,
  multiSort: Boolean,
  sortAscIcon: {
    type: oe,
    default: "$sortAsc"
  },
  sortDescIcon: {
    type: oe,
    default: "$sortDesc"
  },
  headerProps: {
    type: Object
  },
  ...sa(),
  ...sl()
}, "VDataTableHeaders"), Ka = U()({
  name: "VDataTableHeaders",
  props: hd(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      t: a
    } = Et(), {
      toggleSort: l,
      sortBy: r,
      isSorted: i
    } = vd(), {
      someSelected: s,
      allSelected: o,
      selectAll: u,
      showSelectAll: c
    } = bl(), {
      columns: f,
      headers: d
    } = yl(), {
      loaderClasses: m
    } = ol(e);
    function v(S, E) {
      if (!(!e.sticky && !S.fixed))
        return {
          position: "sticky",
          left: S.fixed ? ee(S.fixedOffset) : void 0,
          top: e.sticky ? `calc(var(--v-table-header-height) * ${E})` : void 0
        };
    }
    function g(S) {
      const E = r.value.find((A) => A.key === S.key);
      return E ? E.order === "asc" ? e.sortAscIcon : e.sortDescIcon : e.sortAscIcon;
    }
    const {
      backgroundColorClasses: b,
      backgroundColorStyles: y
    } = Qe(e, "color"), {
      displayClasses: p,
      mobile: x
    } = nn(e), w = _(() => ({
      headers: d.value,
      columns: f.value,
      toggleSort: l,
      isSorted: i,
      sortBy: r.value,
      someSelected: s.value,
      allSelected: o.value,
      selectAll: u,
      getSortIcon: g
    })), I = _(() => ["v-data-table__th", {
      "v-data-table__th--sticky": e.sticky
    }, p.value, m.value]), k = (S) => {
      let {
        column: E,
        x: A,
        y: O
      } = S;
      const T = E.key === "data-table-select" || E.key === "data-table-expand", L = q(e.headerProps ?? {}, E.headerProps ?? {});
      return h(Wa, q({
        tag: "th",
        align: E.align,
        class: [{
          "v-data-table__th--sortable": E.sortable && !e.disableSort,
          "v-data-table__th--sorted": i(E),
          "v-data-table__th--fixed": E.fixed
        }, ...I.value],
        style: {
          width: ee(E.width),
          minWidth: ee(E.minWidth),
          maxWidth: ee(E.maxWidth),
          ...v(E, O)
        },
        colspan: E.colspan,
        rowspan: E.rowspan,
        onClick: E.sortable ? () => l(E) : void 0,
        fixed: E.fixed,
        nowrap: E.nowrap,
        lastFixed: E.lastFixed,
        noPadding: T
      }, L), {
        default: () => {
          var z;
          const M = `header.${E.key}`, j = {
            column: E,
            selectAll: u,
            isSorted: i,
            toggleSort: l,
            sortBy: r.value,
            someSelected: s.value,
            allSelected: o.value,
            getSortIcon: g
          };
          return n[M] ? n[M](j) : E.key === "data-table-select" ? ((z = n["header.data-table-select"]) == null ? void 0 : z.call(n, j)) ?? (c.value && h(vl, {
            modelValue: o.value,
            indeterminate: s.value && !o.value,
            "onUpdate:modelValue": u
          }, null)) : h("div", {
            class: "v-data-table-header__content"
          }, [h("span", null, [E.title]), E.sortable && !e.disableSort && h(Ve, {
            key: "icon",
            class: "v-data-table-header__sort-icon",
            icon: g(E)
          }, null), e.multiSort && i(E) && h("div", {
            key: "badge",
            class: ["v-data-table-header__sort-badge", ...b.value],
            style: y.value
          }, [r.value.findIndex((Q) => Q.key === E.key) + 1])]);
        }
      });
    }, C = () => {
      const S = q(e.headerProps ?? {} ?? {}), E = _(() => f.value.filter((O) => (O == null ? void 0 : O.sortable) && !e.disableSort)), A = _(() => {
        if (f.value.find((T) => T.key === "data-table-select") != null)
          return o.value ? "$checkboxOn" : s.value ? "$checkboxIndeterminate" : "$checkboxOff";
      });
      return h(Wa, q({
        tag: "th",
        class: [...I.value],
        colspan: d.value.length + 1
      }, S), {
        default: () => [h("div", {
          class: "v-data-table-header__content"
        }, [h(Xc, {
          chips: !0,
          class: "v-data-table__td-sort-select",
          clearable: !0,
          density: "default",
          items: E.value,
          label: a("$vuetify.dataTable.sortBy"),
          multiple: e.multiSort,
          variant: "underlined",
          "onClick:clear": () => r.value = [],
          appendIcon: A.value,
          "onClick:append": () => u(!o.value)
        }, {
          ...n,
          chip: (O) => {
            var T;
            return h(ei, {
              onClick: (T = O.item.raw) != null && T.sortable ? () => l(O.item.raw) : void 0,
              onMousedown: (L) => {
                L.preventDefault(), L.stopPropagation();
              }
            }, {
              default: () => [O.item.title, h(Ve, {
                class: ["v-data-table__td-sort-icon", i(O.item.raw) && "v-data-table__td-sort-icon-active"],
                icon: g(O.item.raw),
                size: "small"
              }, null)]
            });
          }
        })])]
      });
    };
    Z(() => x.value ? h("tr", null, [h(C, null, null)]) : h(he, null, [n.headers ? n.headers(w.value) : d.value.map((S, E) => h("tr", null, [S.map((A, O) => h(k, {
      column: A,
      x: O,
      y: E
    }, null))])), e.loading && h("tr", {
      class: "v-data-table-progress"
    }, [h("th", {
      colspan: f.value.length
    }, [h(Qr, {
      name: "v-data-table-progress",
      absolute: !0,
      active: !0,
      color: typeof e.loading == "boolean" ? void 0 : e.loading,
      indeterminate: !0
    }, {
      default: n.loader
    })])])]));
  }
}), t_ = D({
  groupBy: {
    type: Array,
    default: () => []
  }
}, "DataTable-group"), md = Symbol.for("vuetify:data-table-group");
function gd(e) {
  return {
    groupBy: be(e, "groupBy")
  };
}
function yd(e) {
  const {
    disableSort: t,
    groupBy: n,
    sortBy: a
  } = e, l = Y(/* @__PURE__ */ new Set()), r = _(() => n.value.map((c) => ({
    ...c,
    order: c.order ?? !1
  })).concat(t != null && t.value ? [] : a.value));
  function i(c) {
    return l.value.has(c.id);
  }
  function s(c) {
    const f = new Set(l.value);
    i(c) ? f.delete(c.id) : f.add(c.id), l.value = f;
  }
  function o(c) {
    function f(d) {
      const m = [];
      for (const v of d.items)
        "type" in v && v.type === "group" ? m.push(...f(v)) : m.push(v);
      return m;
    }
    return f({
      type: "group",
      items: c,
      id: "dummy",
      key: "dummy",
      value: "dummy",
      depth: 0
    });
  }
  const u = {
    sortByWithGroups: r,
    toggleGroup: s,
    opened: l,
    groupBy: n,
    extractRows: o,
    isGroupOpen: i
  };
  return Ee(md, u), u;
}
function bd() {
  const e = ye(md);
  if (!e) throw new Error("Missing group!");
  return e;
}
function n_(e, t) {
  if (!e.length) return [];
  const n = /* @__PURE__ */ new Map();
  for (const a of e) {
    const l = fn(a.raw, t);
    n.has(l) || n.set(l, []), n.get(l).push(a);
  }
  return n;
}
function pd(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "root";
  if (!t.length) return [];
  const l = n_(e, t[0]), r = [], i = t.slice(1);
  return l.forEach((s, o) => {
    const u = t[0], c = `${a}_${u}_${o}`;
    r.push({
      depth: n,
      id: c,
      key: u,
      value: o,
      items: i.length ? pd(s, i, n + 1, c) : s,
      type: "group"
    });
  }), r;
}
function _d(e, t) {
  const n = [];
  for (const a of e)
    "type" in a && a.type === "group" ? (a.value != null && n.push(a), (t.has(a.id) || a.value == null) && n.push(..._d(a.items, t))) : n.push(a);
  return n;
}
function Sd(e, t, n) {
  return {
    flatItems: _(() => {
      if (!t.value.length) return e.value;
      const l = pd(e.value, t.value.map((r) => r.key));
      return _d(l, n.value);
    })
  };
}
const a_ = D({
  item: {
    type: Object,
    required: !0
  }
}, "VDataTableGroupHeaderRow"), l_ = U()({
  name: "VDataTableGroupHeaderRow",
  props: a_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isGroupOpen: a,
      toggleGroup: l,
      extractRows: r
    } = bd(), {
      isSelected: i,
      isSomeSelected: s,
      select: o
    } = bl(), {
      columns: u
    } = yl(), c = _(() => r([e.item]));
    return () => h("tr", {
      class: "v-data-table-group-header-row",
      style: {
        "--v-data-table-group-header-row-depth": e.item.depth
      }
    }, [u.value.map((f) => {
      var d, m;
      if (f.key === "data-table-group") {
        const v = a(e.item) ? "$expand" : "$next", g = () => l(e.item);
        return ((d = n["data-table-group"]) == null ? void 0 : d.call(n, {
          item: e.item,
          count: c.value.length,
          props: {
            icon: v,
            onClick: g
          }
        })) ?? h(Wa, {
          class: "v-data-table-group-header-row__column"
        }, {
          default: () => [h(at, {
            size: "small",
            variant: "text",
            icon: v,
            onClick: g
          }, null), h("span", null, [e.item.value]), h("span", null, [zl("("), c.value.length, zl(")")])]
        });
      }
      if (f.key === "data-table-select") {
        const v = i(c.value), g = s(c.value) && !v, b = (y) => o(c.value, y);
        return ((m = n["data-table-select"]) == null ? void 0 : m.call(n, {
          props: {
            modelValue: v,
            indeterminate: g,
            "onUpdate:modelValue": b
          }
        })) ?? h("td", null, [h(vl, {
          modelValue: v,
          indeterminate: g,
          "onUpdate:modelValue": b
        }, null)]);
      }
      return h("td", null, null);
    })]);
  }
}), r_ = D({
  expandOnClick: Boolean,
  showExpand: Boolean,
  expanded: {
    type: Array,
    default: () => []
  }
}, "DataTable-expand"), wd = Symbol.for("vuetify:datatable:expanded");
function Cd(e) {
  const t = K(e, "expandOnClick"), n = be(e, "expanded", e.expanded, (s) => new Set(s), (s) => [...s.values()]);
  function a(s, o) {
    const u = new Set(n.value);
    o ? u.add(s.value) : u.delete(s.value), n.value = u;
  }
  function l(s) {
    return n.value.has(s.value);
  }
  function r(s) {
    a(s, !l(s));
  }
  const i = {
    expand: a,
    expanded: n,
    expandOnClick: t,
    isExpanded: l,
    toggleExpand: r
  };
  return Ee(wd, i), i;
}
function Id() {
  const e = ye(wd);
  if (!e) throw new Error("foo");
  return e;
}
const i_ = D({
  index: Number,
  item: Object,
  cellProps: [Object, Function],
  onClick: je(),
  onContextmenu: je(),
  onDblclick: je(),
  ...sa()
}, "VDataTableRow"), s_ = U()({
  name: "VDataTableRow",
  props: i_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      displayClasses: a,
      mobile: l
    } = nn(e, "v-data-table__tr"), {
      isSelected: r,
      toggleSelect: i,
      someSelected: s,
      allSelected: o,
      selectAll: u
    } = bl(), {
      isExpanded: c,
      toggleExpand: f
    } = Id(), {
      toggleSort: d,
      sortBy: m,
      isSorted: v
    } = vd(), {
      columns: g
    } = yl();
    Z(() => h("tr", {
      class: ["v-data-table__tr", {
        "v-data-table__tr--clickable": !!(e.onClick || e.onContextmenu || e.onDblclick)
      }, a.value],
      onClick: e.onClick,
      onContextmenu: e.onContextmenu,
      onDblclick: e.onDblclick
    }, [e.item && g.value.map((b, y) => {
      const p = e.item, x = `item.${b.key}`, w = `header.${b.key}`, I = {
        index: e.index,
        item: p.raw,
        internalItem: p,
        value: fn(p.columns, b.key),
        column: b,
        isSelected: r,
        toggleSelect: i,
        isExpanded: c,
        toggleExpand: f
      }, k = {
        column: b,
        selectAll: u,
        isSorted: v,
        toggleSort: d,
        sortBy: m.value,
        someSelected: s.value,
        allSelected: o.value,
        getSortIcon: () => ""
      }, C = typeof e.cellProps == "function" ? e.cellProps({
        index: I.index,
        item: I.item,
        internalItem: I.internalItem,
        value: I.value,
        column: b
      }) : e.cellProps, S = typeof b.cellProps == "function" ? b.cellProps({
        index: I.index,
        item: I.item,
        internalItem: I.internalItem,
        value: I.value
      }) : b.cellProps;
      return h(Wa, q({
        align: b.align,
        class: {
          "v-data-table__td--expanded-row": b.key === "data-table-expand",
          "v-data-table__td--select-row": b.key === "data-table-select"
        },
        fixed: b.fixed,
        fixedOffset: b.fixedOffset,
        lastFixed: b.lastFixed,
        maxWidth: l.value ? void 0 : b.maxWidth,
        noPadding: b.key === "data-table-select" || b.key === "data-table-expand",
        nowrap: b.nowrap,
        width: l.value ? void 0 : b.width
      }, C, S), {
        default: () => {
          var A, O, T, L, M;
          if (n[x] && !l.value) return (A = n[x]) == null ? void 0 : A.call(n, I);
          if (b.key === "data-table-select")
            return ((O = n["item.data-table-select"]) == null ? void 0 : O.call(n, I)) ?? h(vl, {
              disabled: !p.selectable,
              modelValue: r([p]),
              onClick: oi(() => i(p), ["stop"])
            }, null);
          if (b.key === "data-table-expand")
            return ((T = n["item.data-table-expand"]) == null ? void 0 : T.call(n, I)) ?? h(at, {
              icon: c(p) ? "$collapse" : "$expand",
              size: "small",
              variant: "text",
              onClick: oi(() => f(p), ["stop"])
            }, null);
          const E = Jd(I.value);
          return l.value ? h(he, null, [h("div", {
            class: "v-data-table__td-title"
          }, [((L = n[w]) == null ? void 0 : L.call(n, k)) ?? b.title]), h("div", {
            class: "v-data-table__td-value"
          }, [((M = n[x]) == null ? void 0 : M.call(n, I)) ?? E])]) : E;
        }
      });
    })]));
  }
}), kd = D({
  loading: [Boolean, String],
  loadingText: {
    type: String,
    default: "$vuetify.dataIterator.loadingText"
  },
  hideNoData: Boolean,
  items: {
    type: Array,
    default: () => []
  },
  noDataText: {
    type: String,
    default: "$vuetify.noDataText"
  },
  rowProps: [Object, Function],
  cellProps: [Object, Function],
  ...sa()
}, "VDataTableRows"), ja = U()({
  name: "VDataTableRows",
  inheritAttrs: !1,
  props: kd(),
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const {
      columns: l
    } = yl(), {
      expandOnClick: r,
      toggleExpand: i,
      isExpanded: s
    } = Id(), {
      isSelected: o,
      toggleSelect: u
    } = bl(), {
      toggleGroup: c,
      isGroupOpen: f
    } = bd(), {
      t: d
    } = Et(), {
      mobile: m
    } = nn(e);
    return Z(() => {
      var v, g;
      return e.loading && (!e.items.length || a.loading) ? h("tr", {
        class: "v-data-table-rows-loading",
        key: "loading"
      }, [h("td", {
        colspan: l.value.length
      }, [((v = a.loading) == null ? void 0 : v.call(a)) ?? d(e.loadingText)])]) : !e.loading && !e.items.length && !e.hideNoData ? h("tr", {
        class: "v-data-table-rows-no-data",
        key: "no-data"
      }, [h("td", {
        colspan: l.value.length
      }, [((g = a["no-data"]) == null ? void 0 : g.call(a)) ?? d(e.noDataText)])]) : h(he, null, [e.items.map((b, y) => {
        var w;
        if (b.type === "group") {
          const I = {
            index: y,
            item: b,
            columns: l.value,
            isExpanded: s,
            toggleExpand: i,
            isSelected: o,
            toggleSelect: u,
            toggleGroup: c,
            isGroupOpen: f
          };
          return a["group-header"] ? a["group-header"](I) : h(l_, q({
            key: `group-header_${b.id}`,
            item: b
          }, ws(n, ":group-header", () => I)), a);
        }
        const p = {
          index: y,
          item: b.raw,
          internalItem: b,
          columns: l.value,
          isExpanded: s,
          toggleExpand: i,
          isSelected: o,
          toggleSelect: u
        }, x = {
          ...p,
          props: q({
            key: `item_${b.key ?? b.index}`,
            onClick: r.value ? () => {
              i(b);
            } : void 0,
            index: y,
            item: b,
            cellProps: e.cellProps,
            mobile: m.value
          }, ws(n, ":row", () => p), typeof e.rowProps == "function" ? e.rowProps({
            item: p.item,
            index: p.index,
            internalItem: p.internalItem
          }) : e.rowProps)
        };
        return h(he, {
          key: x.props.key
        }, [a.item ? a.item(x) : h(s_, x.props, a), s(b) && ((w = a["expanded-row"]) == null ? void 0 : w.call(a, p))]);
      })]);
    }), {};
  }
}), Ed = D({
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  height: [Number, String],
  hover: Boolean,
  ...re(),
  ...ct(),
  ...pe(),
  ...xe()
}, "VTable"), Ua = U()({
  name: "VTable",
  props: Ed(),
  setup(e, t) {
    let {
      slots: n,
      emit: a
    } = t;
    const {
      themeClasses: l
    } = $e(e), {
      densityClasses: r
    } = wt(e);
    return Z(() => h(e.tag, {
      class: ["v-table", {
        "v-table--fixed-height": !!e.height,
        "v-table--fixed-header": e.fixedHeader,
        "v-table--fixed-footer": e.fixedFooter,
        "v-table--has-top": !!n.top,
        "v-table--has-bottom": !!n.bottom,
        "v-table--hover": e.hover
      }, l.value, r.value, e.class],
      style: e.style
    }, {
      default: () => {
        var i, s, o;
        return [(i = n.top) == null ? void 0 : i.call(n), n.default ? h("div", {
          class: "v-table__wrapper",
          style: {
            height: ee(e.height)
          }
        }, [h("table", null, [n.default()])]) : (s = n.wrapper) == null ? void 0 : s.call(n), (o = n.bottom) == null ? void 0 : o.call(n)];
      }
    })), {};
  }
}), o_ = D({
  items: {
    type: Array,
    default: () => []
  },
  itemValue: {
    type: [String, Array, Function],
    default: "id"
  },
  itemSelectable: {
    type: [String, Array, Function],
    default: null
  },
  rowProps: [Object, Function],
  cellProps: [Object, Function],
  returnObject: Boolean
}, "DataTable-items");
function u_(e, t, n, a) {
  const l = e.returnObject ? t : nt(t, e.itemValue), r = nt(t, e.itemSelectable, !0), i = a.reduce((s, o) => (o.key != null && (s[o.key] = nt(t, o.value)), s), {});
  return {
    type: "item",
    key: e.returnObject ? nt(t, e.itemValue) : l,
    index: n,
    value: l,
    selectable: r,
    columns: i,
    raw: t
  };
}
function c_(e, t, n) {
  return t.map((a, l) => u_(e, a, l, n));
}
function xd(e, t) {
  return {
    items: _(() => c_(e, e.items, t.value))
  };
}
function Pd(e) {
  let {
    page: t,
    itemsPerPage: n,
    sortBy: a,
    groupBy: l,
    search: r
  } = e;
  const i = Ae("VDataTable"), s = _(() => ({
    page: t.value,
    itemsPerPage: n.value,
    sortBy: a.value,
    groupBy: l.value,
    search: r.value
  }));
  let o = null;
  ne(s, () => {
    en(o, s.value) || (o && o.search !== s.value.search && (t.value = 1), i.emit("update:options", s.value), o = s.value);
  }, {
    deep: !0,
    immediate: !0
  });
}
const d_ = (e, t, n) => e == null || t == null ? -1 : e.toString().toLocaleLowerCase().indexOf(t.toString().toLocaleLowerCase()), f_ = D({
  customFilter: Function,
  customKeyFilter: Object,
  filterKeys: [Array, String],
  filterMode: {
    type: String,
    default: "intersection"
  },
  noFilter: Boolean
}, "filter");
function v_(e, t, n) {
  var s;
  const a = [], l = (n == null ? void 0 : n.default) ?? d_, r = n != null && n.filterKeys ? Ke(n.filterKeys) : !1, i = Object.keys((n == null ? void 0 : n.customKeyFilter) ?? {}).length;
  if (!(e != null && e.length)) return a;
  e: for (let o = 0; o < e.length; o++) {
    const [u, c = u] = Ke(e[o]), f = {}, d = {};
    let m = -1;
    if ((t || i > 0) && !(n != null && n.noFilter)) {
      if (typeof u == "object") {
        const b = r || Object.keys(c);
        for (const y of b) {
          const p = nt(c, y), x = (s = n == null ? void 0 : n.customKeyFilter) == null ? void 0 : s[y];
          if (m = x ? x(p, t, u) : l(p, t, u), m !== -1 && m !== !1)
            x ? f[y] = m : d[y] = m;
          else if ((n == null ? void 0 : n.filterMode) === "every")
            continue e;
        }
      } else
        m = l(u, t, u), m !== -1 && m !== !1 && (d.title = m);
      const v = Object.keys(d).length, g = Object.keys(f).length;
      if (!v && !g || (n == null ? void 0 : n.filterMode) === "union" && g !== i && !v || (n == null ? void 0 : n.filterMode) === "intersection" && (g !== i || !v)) continue;
    }
    a.push({
      index: o,
      matches: {
        ...d,
        ...f
      }
    });
  }
  return a;
}
function h_(e, t, n, a) {
  const l = Y([]), r = Y(/* @__PURE__ */ new Map()), i = _(() => a != null && a.transform ? De(t).map((o) => [o, a.transform(o)]) : De(t));
  rt(() => {
    const o = typeof n == "function" ? n() : De(n), u = typeof o != "string" && typeof o != "number" ? "" : String(o), c = v_(i.value, u, {
      customKeyFilter: {
        ...e.customKeyFilter,
        ...De(a == null ? void 0 : a.customKeyFilter)
      },
      default: e.customFilter,
      filterKeys: e.filterKeys,
      filterMode: e.filterMode,
      noFilter: e.noFilter
    }), f = De(t), d = [], m = /* @__PURE__ */ new Map();
    c.forEach((v) => {
      let {
        index: g,
        matches: b
      } = v;
      const y = f[g];
      d.push(y), m.set(y.value, b);
    }), l.value = d, r.value = m;
  });
  function s(o) {
    return r.value.get(o.value);
  }
  return {
    filteredItems: l,
    filteredMatches: r,
    getMatches: s
  };
}
const $d = D({
  ...kd(),
  hideDefaultBody: Boolean,
  hideDefaultFooter: Boolean,
  hideDefaultHeader: Boolean,
  width: [String, Number],
  search: String,
  ...r_(),
  ...t_(),
  ...jp(),
  ...o_(),
  ...Qp(),
  ...Jp(),
  ...hd(),
  ...Ed()
}, "DataTable"), m_ = D({
  ...Qc(),
  ...$d(),
  ...f_(),
  ...ri()
}, "VDataTable"), g_ = U()({
  name: "VDataTable",
  props: m_(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:page": (e) => !0,
    "update:itemsPerPage": (e) => !0,
    "update:sortBy": (e) => !0,
    "update:options": (e) => !0,
    "update:groupBy": (e) => !0,
    "update:expanded": (e) => !0,
    "update:currentItems": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const {
      groupBy: l
    } = gd(e), {
      sortBy: r,
      multiSort: i,
      mustSort: s
    } = dd(e), {
      page: o,
      itemsPerPage: u
    } = Zc(e), {
      disableSort: c
    } = On(e), {
      columns: f,
      headers: d,
      sortFunctions: m,
      sortRawFunctions: v,
      filterFunctions: g
    } = rd(e, {
      groupBy: l,
      showSelect: K(e, "showSelect"),
      showExpand: K(e, "showExpand")
    }), {
      items: b
    } = xd(e, f), y = K(e, "search"), {
      filteredItems: p
    } = h_(e, b, y, {
      transform: (se) => se.columns,
      customKeyFilter: g
    }), {
      toggleSort: x
    } = fd({
      sortBy: r,
      multiSort: i,
      mustSort: s,
      page: o
    }), {
      sortByWithGroups: w,
      opened: I,
      extractRows: k,
      isGroupOpen: C,
      toggleGroup: S
    } = yd({
      groupBy: l,
      sortBy: r,
      disableSort: c
    }), {
      sortedItems: E
    } = Zp(e, p, w, {
      transform: (se) => ({
        ...se.raw,
        ...se.columns
      }),
      sortFunctions: m,
      sortRawFunctions: v
    }), {
      flatItems: A
    } = Sd(E, l, I), O = _(() => A.value.length), {
      startIndex: T,
      stopIndex: L,
      pageCount: M,
      setItemsPerPage: j
    } = ed({
      page: o,
      itemsPerPage: u,
      itemsLength: O
    }), {
      paginatedItems: z
    } = Kp({
      items: A,
      startIndex: T,
      stopIndex: L,
      itemsPerPage: u
    }), Q = _(() => k(z.value)), {
      isSelected: le,
      select: V,
      selectAll: R,
      toggleSelect: F,
      someSelected: H,
      allSelected: ie
    } = ud(e, {
      allItems: b,
      currentPage: Q
    }), {
      isExpanded: te,
      toggleExpand: ue
    } = Cd(e);
    Pd({
      page: o,
      itemsPerPage: u,
      sortBy: r,
      groupBy: l,
      search: y
    }), vt({
      VDataTableRows: {
        hideNoData: K(e, "hideNoData"),
        noDataText: K(e, "noDataText"),
        loading: K(e, "loading"),
        loadingText: K(e, "loadingText")
      }
    });
    const X = _(() => ({
      page: o.value,
      itemsPerPage: u.value,
      sortBy: r.value,
      pageCount: M.value,
      toggleSort: x,
      setItemsPerPage: j,
      someSelected: H.value,
      allSelected: ie.value,
      isSelected: le,
      select: V,
      selectAll: R,
      toggleSelect: F,
      isExpanded: te,
      toggleExpand: ue,
      isGroupOpen: C,
      toggleGroup: S,
      items: Q.value.map((se) => se.raw),
      internalItems: Q.value,
      groupedItems: z.value,
      columns: f.value,
      headers: d.value
    }));
    return Z(() => {
      const se = Ha.filterProps(e), ce = Ka.filterProps(e), Oe = ja.filterProps(e), ve = Ua.filterProps(e);
      return h(Ua, q({
        class: ["v-data-table", {
          "v-data-table--show-select": e.showSelect,
          "v-data-table--loading": e.loading
        }, e.class],
        style: e.style
      }, ve), {
        top: () => {
          var yt;
          return (yt = a.top) == null ? void 0 : yt.call(a, X.value);
        },
        default: () => {
          var yt, Dt, $t, Ct, Mt, Gt;
          return a.default ? a.default(X.value) : h(he, null, [(yt = a.colgroup) == null ? void 0 : yt.call(a, X.value), !e.hideDefaultHeader && h("thead", {
            key: "thead"
          }, [h(Ka, ce, a)]), (Dt = a.thead) == null ? void 0 : Dt.call(a, X.value), !e.hideDefaultBody && h("tbody", null, [($t = a["body.prepend"]) == null ? void 0 : $t.call(a, X.value), a.body ? a.body(X.value) : h(ja, q(n, Oe, {
            items: z.value
          }), a), (Ct = a["body.append"]) == null ? void 0 : Ct.call(a, X.value)]), (Mt = a.tbody) == null ? void 0 : Mt.call(a, X.value), (Gt = a.tfoot) == null ? void 0 : Gt.call(a, X.value)]);
        },
        bottom: () => a.bottom ? a.bottom(X.value) : !e.hideDefaultFooter && h(he, null, [h(hl, null, null), h(Ha, se, {
          prepend: a["footer.prepend"]
        })])
      });
    }), {};
  }
}), y_ = D({
  itemsLength: {
    type: [Number, String],
    required: !0
  },
  ...Qc(),
  ...$d(),
  ...ri()
}, "VDataTableServer"), b_ = U()({
  name: "VDataTableServer",
  props: y_(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:page": (e) => !0,
    "update:itemsPerPage": (e) => !0,
    "update:sortBy": (e) => !0,
    "update:options": (e) => !0,
    "update:expanded": (e) => !0,
    "update:groupBy": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const {
      groupBy: l
    } = gd(e), {
      sortBy: r,
      multiSort: i,
      mustSort: s
    } = dd(e), {
      page: o,
      itemsPerPage: u
    } = Zc(e), {
      disableSort: c
    } = On(e), f = _(() => parseInt(e.itemsLength, 10)), {
      columns: d,
      headers: m
    } = rd(e, {
      groupBy: l,
      showSelect: K(e, "showSelect"),
      showExpand: K(e, "showExpand")
    }), {
      items: v
    } = xd(e, d), {
      toggleSort: g
    } = fd({
      sortBy: r,
      multiSort: i,
      mustSort: s,
      page: o
    }), {
      opened: b,
      isGroupOpen: y,
      toggleGroup: p,
      extractRows: x
    } = yd({
      groupBy: l,
      sortBy: r,
      disableSort: c
    }), {
      pageCount: w,
      setItemsPerPage: I
    } = ed({
      page: o,
      itemsPerPage: u,
      itemsLength: f
    }), {
      flatItems: k
    } = Sd(v, l, b), {
      isSelected: C,
      select: S,
      selectAll: E,
      toggleSelect: A,
      someSelected: O,
      allSelected: T
    } = ud(e, {
      allItems: v,
      currentPage: v
    }), {
      isExpanded: L,
      toggleExpand: M
    } = Cd(e), j = _(() => x(v.value));
    Pd({
      page: o,
      itemsPerPage: u,
      sortBy: r,
      groupBy: l,
      search: K(e, "search")
    }), Ee("v-data-table", {
      toggleSort: g,
      sortBy: r
    }), vt({
      VDataTableRows: {
        hideNoData: K(e, "hideNoData"),
        noDataText: K(e, "noDataText"),
        loading: K(e, "loading"),
        loadingText: K(e, "loadingText")
      }
    });
    const z = _(() => ({
      page: o.value,
      itemsPerPage: u.value,
      sortBy: r.value,
      pageCount: w.value,
      toggleSort: g,
      setItemsPerPage: I,
      someSelected: O.value,
      allSelected: T.value,
      isSelected: C,
      select: S,
      selectAll: E,
      toggleSelect: A,
      isExpanded: L,
      toggleExpand: M,
      isGroupOpen: y,
      toggleGroup: p,
      items: j.value.map((Q) => Q.raw),
      internalItems: j.value,
      groupedItems: k.value,
      columns: d.value,
      headers: m.value
    }));
    Z(() => {
      const Q = Ha.filterProps(e), le = Ka.filterProps(e), V = ja.filterProps(e), R = Ua.filterProps(e);
      return h(Ua, q({
        class: ["v-data-table", {
          "v-data-table--loading": e.loading
        }, e.class],
        style: e.style
      }, R), {
        top: () => {
          var F;
          return (F = a.top) == null ? void 0 : F.call(a, z.value);
        },
        default: () => {
          var F, H, ie, te, ue, X;
          return a.default ? a.default(z.value) : h(he, null, [(F = a.colgroup) == null ? void 0 : F.call(a, z.value), !e.hideDefaultHeader && h("thead", {
            key: "thead",
            class: "v-data-table__thead",
            role: "rowgroup"
          }, [h(Ka, q(le, {
            sticky: e.fixedHeader
          }), a)]), (H = a.thead) == null ? void 0 : H.call(a, z.value), !e.hideDefaultBody && h("tbody", {
            class: "v-data-table__tbody",
            role: "rowgroup"
          }, [(ie = a["body.prepend"]) == null ? void 0 : ie.call(a, z.value), a.body ? a.body(z.value) : h(ja, q(n, V, {
            items: k.value
          }), a), (te = a["body.append"]) == null ? void 0 : te.call(a, z.value)]), (ue = a.tbody) == null ? void 0 : ue.call(a, z.value), (X = a.tfoot) == null ? void 0 : X.call(a, z.value)]);
        },
        bottom: () => a.bottom ? a.bottom(z.value) : !e.hideDefaultFooter && h(he, null, [h(hl, null, null), h(Ha, Q, {
          prepend: a["footer.prepend"]
        })])
      });
    });
  }
});
function p_(e) {
  let {
    rootEl: t,
    isSticky: n,
    layoutItemStyles: a
  } = e;
  const l = J(!1), r = J(0), i = _(() => {
    const u = typeof l.value == "boolean" ? "top" : l.value;
    return [n.value ? {
      top: "auto",
      bottom: "auto",
      height: void 0
    } : void 0, l.value ? {
      [u]: ee(r.value)
    } : {
      top: a.value.top
    }];
  });
  Lt(() => {
    ne(n, (u) => {
      u ? window.addEventListener("scroll", o, {
        passive: !0
      }) : window.removeEventListener("scroll", o);
    }, {
      immediate: !0
    });
  }), st(() => {
    window.removeEventListener("scroll", o);
  });
  let s = 0;
  function o() {
    const u = s > window.scrollY ? "up" : "down", c = t.value.getBoundingClientRect(), f = parseFloat(a.value.top ?? 0), d = window.scrollY - Math.max(0, r.value - f), m = c.height + Math.max(r.value, f) - window.scrollY - window.innerHeight, v = parseFloat(getComputedStyle(t.value).getPropertyValue("--v-body-scroll-y")) || 0;
    c.height < window.innerHeight - f ? (l.value = "top", r.value = f) : u === "up" && l.value === "bottom" || u === "down" && l.value === "top" ? (r.value = window.scrollY + c.top - v, l.value = !0) : u === "down" && m <= 0 ? (r.value = 0, l.value = "bottom") : u === "up" && d <= 0 && (v ? l.value !== "top" && (r.value = -d + v + f, l.value = "top") : (r.value = c.top + d, l.value = "top")), s = window.scrollY;
  }
  return {
    isStuck: l,
    stickyStyles: i
  };
}
const __ = 100, S_ = 20;
function no(e) {
  return (e < 0 ? -1 : 1) * Math.sqrt(Math.abs(e)) * 1.41421356237;
}
function ao(e) {
  if (e.length < 2)
    return 0;
  if (e.length === 2)
    return e[1].t === e[0].t ? 0 : (e[1].d - e[0].d) / (e[1].t - e[0].t);
  let t = 0;
  for (let n = e.length - 1; n > 0; n--) {
    if (e[n].t === e[n - 1].t)
      continue;
    const a = no(t), l = (e[n].d - e[n - 1].d) / (e[n].t - e[n - 1].t);
    t += (l - a) * Math.abs(l), n === e.length - 1 && (t *= 0.5);
  }
  return no(t) * 1e3;
}
function w_() {
  const e = {};
  function t(l) {
    Array.from(l.changedTouches).forEach((r) => {
      (e[r.identifier] ?? (e[r.identifier] = new tg(S_))).push([l.timeStamp, r]);
    });
  }
  function n(l) {
    Array.from(l.changedTouches).forEach((r) => {
      delete e[r.identifier];
    });
  }
  function a(l) {
    var u;
    const r = (u = e[l]) == null ? void 0 : u.values().reverse();
    if (!r)
      throw new Error(`No samples for touch id ${l}`);
    const i = r[0], s = [], o = [];
    for (const c of r) {
      if (i[0] - c[0] > __) break;
      s.push({
        t: c[0],
        d: c[1].clientX
      }), o.push({
        t: c[0],
        d: c[1].clientY
      });
    }
    return {
      x: ao(s),
      y: ao(o),
      get direction() {
        const {
          x: c,
          y: f
        } = this, [d, m] = [Math.abs(c), Math.abs(f)];
        return d > m && c >= 0 ? "right" : d > m && c <= 0 ? "left" : m > d && f >= 0 ? "down" : m > d && f <= 0 ? "up" : C_();
      }
    };
  }
  return {
    addMovement: t,
    endTouch: n,
    getVelocity: a
  };
}
function C_() {
  throw new Error();
}
function I_(e) {
  let {
    el: t,
    isActive: n,
    isTemporary: a,
    width: l,
    touchless: r,
    position: i
  } = e;
  Lt(() => {
    window.addEventListener("touchstart", p, {
      passive: !0
    }), window.addEventListener("touchmove", x, {
      passive: !1
    }), window.addEventListener("touchend", w, {
      passive: !0
    });
  }), st(() => {
    window.removeEventListener("touchstart", p), window.removeEventListener("touchmove", x), window.removeEventListener("touchend", w);
  });
  const s = _(() => ["left", "right"].includes(i.value)), {
    addMovement: o,
    endTouch: u,
    getVelocity: c
  } = w_();
  let f = !1;
  const d = J(!1), m = J(0), v = J(0);
  let g;
  function b(k, C) {
    return (i.value === "left" ? k : i.value === "right" ? document.documentElement.clientWidth - k : i.value === "top" ? k : i.value === "bottom" ? document.documentElement.clientHeight - k : Cn()) - (C ? l.value : 0);
  }
  function y(k) {
    let C = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    const S = i.value === "left" ? (k - v.value) / l.value : i.value === "right" ? (document.documentElement.clientWidth - k - v.value) / l.value : i.value === "top" ? (k - v.value) / l.value : i.value === "bottom" ? (document.documentElement.clientHeight - k - v.value) / l.value : Cn();
    return C ? Math.max(0, Math.min(1, S)) : S;
  }
  function p(k) {
    if (r.value) return;
    const C = k.changedTouches[0].clientX, S = k.changedTouches[0].clientY, E = 25, A = i.value === "left" ? C < E : i.value === "right" ? C > document.documentElement.clientWidth - E : i.value === "top" ? S < E : i.value === "bottom" ? S > document.documentElement.clientHeight - E : Cn(), O = n.value && (i.value === "left" ? C < l.value : i.value === "right" ? C > document.documentElement.clientWidth - l.value : i.value === "top" ? S < l.value : i.value === "bottom" ? S > document.documentElement.clientHeight - l.value : Cn());
    (A || O || n.value && a.value) && (g = [C, S], v.value = b(s.value ? C : S, n.value), m.value = y(s.value ? C : S), f = v.value > -20 && v.value < 80, u(k), o(k));
  }
  function x(k) {
    const C = k.changedTouches[0].clientX, S = k.changedTouches[0].clientY;
    if (f) {
      if (!k.cancelable) {
        f = !1;
        return;
      }
      const A = Math.abs(C - g[0]), O = Math.abs(S - g[1]);
      (s.value ? A > O && A > 3 : O > A && O > 3) ? (d.value = !0, f = !1) : (s.value ? O : A) > 3 && (f = !1);
    }
    if (!d.value) return;
    k.preventDefault(), o(k);
    const E = y(s.value ? C : S, !1);
    m.value = Math.max(0, Math.min(1, E)), E > 1 ? v.value = b(s.value ? C : S, !0) : E < 0 && (v.value = b(s.value ? C : S, !1));
  }
  function w(k) {
    if (f = !1, !d.value) return;
    o(k), d.value = !1;
    const C = c(k.changedTouches[0].identifier), S = Math.abs(C.x), E = Math.abs(C.y);
    (s.value ? S > E && S > 400 : E > S && E > 3) ? n.value = C.direction === ({
      left: "right",
      right: "left",
      top: "down",
      bottom: "up"
    }[i.value] || Cn()) : n.value = m.value > 0.5;
  }
  const I = _(() => d.value ? {
    transform: i.value === "left" ? `translateX(calc(-100% + ${m.value * l.value}px))` : i.value === "right" ? `translateX(calc(100% - ${m.value * l.value}px))` : i.value === "top" ? `translateY(calc(-100% + ${m.value * l.value}px))` : i.value === "bottom" ? `translateY(calc(100% - ${m.value * l.value}px))` : Cn(),
    transition: "none"
  } : void 0);
  return _t(d, () => {
    var S, E;
    const k = ((S = t.value) == null ? void 0 : S.style.transform) ?? null, C = ((E = t.value) == null ? void 0 : E.style.transition) ?? null;
    rt(() => {
      var A, O, T, L;
      (O = t.value) == null || O.style.setProperty("transform", ((A = I.value) == null ? void 0 : A.transform) || "none"), (L = t.value) == null || L.style.setProperty("transition", ((T = I.value) == null ? void 0 : T.transition) || null);
    }), Ge(() => {
      var A, O;
      (A = t.value) == null || A.style.setProperty("transform", k), (O = t.value) == null || O.style.setProperty("transition", C);
    });
  }), {
    isDragging: d,
    dragProgress: m,
    dragStyles: I
  };
}
function Cn() {
  throw new Error();
}
const k_ = ["start", "end", "left", "right", "top", "bottom"], E_ = D({
  color: String,
  disableResizeWatcher: Boolean,
  disableRouteWatcher: Boolean,
  expandOnHover: Boolean,
  floating: Boolean,
  modelValue: {
    type: Boolean,
    default: null
  },
  permanent: Boolean,
  rail: {
    type: Boolean,
    default: null
  },
  railWidth: {
    type: [Number, String],
    default: 56
  },
  scrim: {
    type: [Boolean, String],
    default: !0
  },
  image: String,
  temporary: Boolean,
  persistent: Boolean,
  touchless: Boolean,
  width: {
    type: [Number, String],
    default: 256
  },
  location: {
    type: String,
    default: "start",
    validator: (e) => k_.includes(e)
  },
  sticky: Boolean,
  ...xt(),
  ...re(),
  ...Dc(),
  ...sa({
    mobile: null
  }),
  ...St(),
  ...Eu(),
  ...et(),
  ...pe({
    tag: "nav"
  }),
  ...xe()
}, "VNavigationDrawer"), x_ = U()({
  name: "VNavigationDrawer",
  props: E_(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:rail": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: a,
      slots: l
    } = t;
    const {
      isRtl: r
    } = ot(), {
      themeClasses: i
    } = $e(e), {
      borderClasses: s
    } = Rt(e), {
      backgroundColorClasses: o,
      backgroundColorStyles: u
    } = Qe(K(e, "color")), {
      elevationClasses: c
    } = Pt(e), {
      displayClasses: f,
      mobile: d
    } = nn(e), {
      roundedClasses: m
    } = ut(e), v = ju(), g = be(e, "modelValue", null, (F) => !!F), {
      ssrBootStyles: b
    } = ua(), {
      scopeId: y
    } = ml(), p = Y(), x = J(!1), {
      runOpenDelay: w,
      runCloseDelay: I
    } = Mc(e, (F) => {
      x.value = F;
    }), k = _(() => e.rail && e.expandOnHover && x.value ? Number(e.width) : Number(e.rail ? e.railWidth : e.width)), C = _(() => vr(e.location, r.value)), S = _(() => e.persistent), E = _(() => !e.permanent && (d.value || e.temporary)), A = _(() => e.sticky && !E.value && C.value !== "bottom");
    _t(() => e.expandOnHover && e.rail != null, () => {
      ne(x, (F) => a("update:rail", !F));
    }), _t(() => !e.disableResizeWatcher, () => {
      ne(E, (F) => !e.permanent && We(() => g.value = !F));
    }), _t(() => !e.disableRouteWatcher && !!v, () => {
      ne(v.currentRoute, () => E.value && (g.value = !1));
    }), ne(() => e.permanent, (F) => {
      F && (g.value = !0);
    }), e.modelValue == null && !E.value && (g.value = e.permanent || !d.value);
    const {
      isDragging: O,
      dragProgress: T
    } = I_({
      el: p,
      isActive: g,
      isTemporary: E,
      width: k,
      touchless: K(e, "touchless"),
      position: C
    }), L = _(() => {
      const F = E.value ? 0 : e.rail && e.expandOnHover ? Number(e.railWidth) : k.value;
      return O.value ? F * T.value : F;
    }), M = _(() => ["top", "bottom"].includes(e.location) ? 0 : k.value), {
      layoutItemStyles: j,
      layoutItemScrimStyles: z
    } = xu({
      id: e.name,
      order: _(() => parseInt(e.order, 10)),
      position: C,
      layoutSize: L,
      elementSize: M,
      active: _(() => g.value || O.value),
      disableTransitions: _(() => O.value),
      absolute: _(() => (
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        e.absolute || A.value && typeof Q.value != "string"
      ))
    }), {
      isStuck: Q,
      stickyStyles: le
    } = p_({
      rootEl: p,
      isSticky: A,
      layoutItemStyles: j
    }), V = Qe(_(() => typeof e.scrim == "string" ? e.scrim : null)), R = _(() => ({
      ...O.value ? {
        opacity: T.value * 0.2,
        transition: "none"
      } : void 0,
      ...z.value
    }));
    return vt({
      VList: {
        bgColor: "transparent"
      }
    }), Z(() => {
      const F = l.image || e.image;
      return h(he, null, [h(e.tag, q({
        ref: p,
        onMouseenter: w,
        onMouseleave: I,
        class: ["v-navigation-drawer", `v-navigation-drawer--${C.value}`, {
          "v-navigation-drawer--expand-on-hover": e.expandOnHover,
          "v-navigation-drawer--floating": e.floating,
          "v-navigation-drawer--is-hovering": x.value,
          "v-navigation-drawer--rail": e.rail,
          "v-navigation-drawer--temporary": E.value,
          "v-navigation-drawer--persistent": S.value,
          "v-navigation-drawer--active": g.value,
          "v-navigation-drawer--sticky": A.value
        }, i.value, o.value, s.value, f.value, c.value, m.value, e.class],
        style: [u.value, j.value, b.value, le.value, e.style, ["top", "bottom"].includes(C.value) ? {
          height: "auto"
        } : {}]
      }, y, n), {
        default: () => {
          var H, ie, te;
          return [F && h("div", {
            key: "image",
            class: "v-navigation-drawer__img"
          }, [l.image ? h(Te, {
            key: "image-defaults",
            disabled: !e.image,
            defaults: {
              VImg: {
                alt: "",
                cover: !0,
                height: "inherit",
                src: e.image
              }
            }
          }, l.image) : h(rl, {
            key: "image-img",
            alt: "",
            cover: !0,
            height: "inherit",
            src: e.image
          }, null)]), l.prepend && h("div", {
            class: "v-navigation-drawer__prepend"
          }, [(H = l.prepend) == null ? void 0 : H.call(l)]), h("div", {
            class: "v-navigation-drawer__content"
          }, [(ie = l.default) == null ? void 0 : ie.call(l)]), l.append && h("div", {
            class: "v-navigation-drawer__append"
          }, [(te = l.append) == null ? void 0 : te.call(l)])];
        }
      }), h(Xt, {
        name: "fade-transition"
      }, {
        default: () => [E.value && (O.value || g.value) && !!e.scrim && h("div", q({
          class: ["v-navigation-drawer__scrim", V.backgroundColorClasses.value],
          style: [R.value, V.backgroundColorStyles.value],
          onClick: () => {
            S.value || (g.value = !1);
          }
        }, y), null)]
      })]);
    }), {
      isStuck: Q
    };
  }
}), P_ = D({
  scrollable: Boolean,
  ...re(),
  ...mt(),
  ...pe({
    tag: "main"
  })
}, "VMain"), $_ = U()({
  name: "VMain",
  props: P_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      dimensionStyles: a
    } = gt(e), {
      mainStyles: l
    } = ny(), {
      ssrBootStyles: r
    } = ua();
    return Z(() => h(e.tag, {
      class: ["v-main", {
        "v-main--scrollable": e.scrollable
      }, e.class],
      style: [l.value, r.value, a.value, e.style]
    }, {
      default: () => {
        var i, s;
        return [e.scrollable ? h("div", {
          class: "v-main__scroller"
        }, [(i = n.default) == null ? void 0 : i.call(n)]) : (s = n.default) == null ? void 0 : s.call(n)];
      }
    })), {};
  }
}), T_ = D({
  color: String,
  ...xt(),
  ...re(),
  ...mt(),
  ...St(),
  ...da(),
  ...ul(),
  ...et(),
  ...pe(),
  ...xe()
}, "VSheet"), A_ = U()({
  name: "VSheet",
  props: T_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: a
    } = $e(e), {
      backgroundColorClasses: l,
      backgroundColorStyles: r
    } = Qe(K(e, "color")), {
      borderClasses: i
    } = Rt(e), {
      dimensionStyles: s
    } = gt(e), {
      elevationClasses: o
    } = Pt(e), {
      locationStyles: u
    } = fa(e), {
      positionClasses: c
    } = cl(e), {
      roundedClasses: f
    } = ut(e);
    return Z(() => h(e.tag, {
      class: ["v-sheet", a.value, l.value, i.value, o.value, c.value, f.value, e.class],
      style: [r.value, s.value, u.value, e.style]
    }, n)), {};
  }
}), O_ = {
  actions: "button@2",
  article: "heading, paragraph",
  avatar: "avatar",
  button: "button",
  card: "image, heading",
  "card-avatar": "image, list-item-avatar",
  chip: "chip",
  "date-picker": "list-item, heading, divider, date-picker-options, date-picker-days, actions",
  "date-picker-options": "text, avatar@2",
  "date-picker-days": "avatar@28",
  divider: "divider",
  heading: "heading",
  image: "image",
  "list-item": "text",
  "list-item-avatar": "avatar, text",
  "list-item-two-line": "sentences",
  "list-item-avatar-two-line": "avatar, sentences",
  "list-item-three-line": "paragraph",
  "list-item-avatar-three-line": "avatar, paragraph",
  ossein: "ossein",
  paragraph: "text@3",
  sentences: "text@2",
  subtitle: "text",
  table: "table-heading, table-thead, table-tbody, table-tfoot",
  "table-heading": "chip, text",
  "table-thead": "heading@6",
  "table-tbody": "table-row-divider@6",
  "table-row-divider": "table-row, divider",
  "table-row": "text@6",
  "table-tfoot": "text@2, avatar@2",
  text: "text"
};
function L_(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return h("div", {
    class: ["v-skeleton-loader__bone", `v-skeleton-loader__${e}`]
  }, [t]);
}
function lo(e) {
  const [t, n] = e.split("@");
  return Array.from({
    length: n
  }).map(() => pl(t));
}
function pl(e) {
  let t = [];
  if (!e) return t;
  const n = O_[e];
  if (e !== n) {
    if (e.includes(",")) return ro(e);
    if (e.includes("@")) return lo(e);
    n.includes(",") ? t = ro(n) : n.includes("@") ? t = lo(n) : n && t.push(pl(n));
  }
  return [L_(e, t)];
}
function ro(e) {
  return e.replace(/\s/g, "").split(",").map(pl);
}
const V_ = D({
  boilerplate: Boolean,
  color: String,
  loading: Boolean,
  loadingText: {
    type: String,
    default: "$vuetify.loading"
  },
  type: {
    type: [String, Array],
    default: "ossein"
  },
  ...mt(),
  ...St(),
  ...xe()
}, "VSkeletonLoader"), N_ = U()({
  name: "VSkeletonLoader",
  props: V_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      backgroundColorClasses: a,
      backgroundColorStyles: l
    } = Qe(K(e, "color")), {
      dimensionStyles: r
    } = gt(e), {
      elevationClasses: i
    } = Pt(e), {
      themeClasses: s
    } = $e(e), {
      t: o
    } = Et(), u = _(() => pl(Ke(e.type).join(",")));
    return Z(() => {
      var d;
      const c = !n.default || e.loading, f = e.boilerplate || !c ? {} : {
        ariaLive: "polite",
        ariaLabel: o(e.loadingText),
        role: "alert"
      };
      return h("div", q({
        class: ["v-skeleton-loader", {
          "v-skeleton-loader--boilerplate": e.boilerplate
        }, s.value, a.value, i.value],
        style: [l.value, c ? r.value : {}]
      }, f), [c ? u.value : (d = n.default) == null ? void 0 : d.call(n)]);
    }), {};
  }
}), si = Symbol.for("vuetify:v-tabs"), R_ = D({
  fixed: Boolean,
  sliderColor: String,
  hideSlider: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ...tn(Jr({
    selectedClass: "v-tab--selected",
    variant: "text"
  }), ["active", "block", "flat", "location", "position", "symbol"])
}, "VTab"), Td = U()({
  name: "VTab",
  props: R_(),
  setup(e, t) {
    let {
      slots: n,
      attrs: a
    } = t;
    const {
      textColorClasses: l,
      textColorStyles: r
    } = kt(e, "sliderColor"), i = Y(), s = Y(), o = _(() => e.direction === "horizontal"), u = _(() => {
      var f, d;
      return ((d = (f = i.value) == null ? void 0 : f.group) == null ? void 0 : d.isSelected.value) ?? !1;
    });
    function c(f) {
      var m, v;
      let {
        value: d
      } = f;
      if (d) {
        const g = (v = (m = i.value) == null ? void 0 : m.$el.parentElement) == null ? void 0 : v.querySelector(".v-tab--selected .v-tab__slider"), b = s.value;
        if (!g || !b) return;
        const y = getComputedStyle(g).color, p = g.getBoundingClientRect(), x = b.getBoundingClientRect(), w = o.value ? "x" : "y", I = o.value ? "X" : "Y", k = o.value ? "right" : "bottom", C = o.value ? "width" : "height", S = p[w], E = x[w], A = S > E ? p[k] - x[k] : p[w] - x[w], O = Math.sign(A) > 0 ? o.value ? "right" : "bottom" : Math.sign(A) < 0 ? o.value ? "left" : "top" : "center", L = (Math.abs(A) + (Math.sign(A) < 0 ? p[C] : x[C])) / Math.max(p[C], x[C]) || 0, M = p[C] / x[C] || 0, j = 1.5;
        un(b, {
          backgroundColor: [y, "currentcolor"],
          transform: [`translate${I}(${A}px) scale${I}(${M})`, `translate${I}(${A / j}px) scale${I}(${(L - 1) / j + 1})`, "none"],
          transformOrigin: Array(3).fill(O)
        }, {
          duration: 225,
          easing: Jn
        });
      }
    }
    return Z(() => {
      const f = at.filterProps(e);
      return h(at, q({
        symbol: si,
        ref: i,
        class: ["v-tab", e.class],
        style: e.style,
        tabindex: u.value ? 0 : -1,
        role: "tab",
        "aria-selected": String(u.value),
        active: !1
      }, f, a, {
        block: e.fixed,
        maxWidth: e.fixed ? 300 : void 0,
        "onGroup:selected": c
      }), {
        ...n,
        default: () => {
          var d;
          return h(he, null, [((d = n.default) == null ? void 0 : d.call(n)) ?? e.text, !e.hideSlider && h("div", {
            ref: s,
            class: ["v-tab__slider", l.value],
            style: r.value
          }, null)]);
        }
      });
    }), gl({}, i);
  }
}), F_ = (e) => {
  const {
    touchstartX: t,
    touchendX: n,
    touchstartY: a,
    touchendY: l
  } = e, r = 0.5, i = 16;
  e.offsetX = n - t, e.offsetY = l - a, Math.abs(e.offsetY) < r * Math.abs(e.offsetX) && (e.left && n < t - i && e.left(e), e.right && n > t + i && e.right(e)), Math.abs(e.offsetX) < r * Math.abs(e.offsetY) && (e.up && l < a - i && e.up(e), e.down && l > a + i && e.down(e));
};
function D_(e, t) {
  var a;
  const n = e.changedTouches[0];
  t.touchstartX = n.clientX, t.touchstartY = n.clientY, (a = t.start) == null || a.call(t, {
    originalEvent: e,
    ...t
  });
}
function M_(e, t) {
  var a;
  const n = e.changedTouches[0];
  t.touchendX = n.clientX, t.touchendY = n.clientY, (a = t.end) == null || a.call(t, {
    originalEvent: e,
    ...t
  }), F_(t);
}
function B_(e, t) {
  var a;
  const n = e.changedTouches[0];
  t.touchmoveX = n.clientX, t.touchmoveY = n.clientY, (a = t.move) == null || a.call(t, {
    originalEvent: e,
    ...t
  });
}
function H_() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const t = {
    touchstartX: 0,
    touchstartY: 0,
    touchendX: 0,
    touchendY: 0,
    touchmoveX: 0,
    touchmoveY: 0,
    offsetX: 0,
    offsetY: 0,
    left: e.left,
    right: e.right,
    up: e.up,
    down: e.down,
    start: e.start,
    move: e.move,
    end: e.end
  };
  return {
    touchstart: (n) => D_(n, t),
    touchend: (n) => M_(n, t),
    touchmove: (n) => B_(n, t)
  };
}
function W_(e, t) {
  var s;
  const n = t.value, a = n != null && n.parent ? e.parentElement : e, l = (n == null ? void 0 : n.options) ?? {
    passive: !0
  }, r = (s = t.instance) == null ? void 0 : s.$.uid;
  if (!a || !r) return;
  const i = H_(t.value);
  a._touchHandlers = a._touchHandlers ?? /* @__PURE__ */ Object.create(null), a._touchHandlers[r] = i, eu(i).forEach((o) => {
    a.addEventListener(o, i[o], l);
  });
}
function K_(e, t) {
  var r, i;
  const n = (r = t.value) != null && r.parent ? e.parentElement : e, a = (i = t.instance) == null ? void 0 : i.$.uid;
  if (!(n != null && n._touchHandlers) || !a) return;
  const l = n._touchHandlers[a];
  eu(l).forEach((s) => {
    n.removeEventListener(s, l[s]);
  }), delete n._touchHandlers[a];
}
const Ad = {
  mounted: W_,
  unmounted: K_
}, Od = Symbol.for("vuetify:v-window"), Ld = Symbol.for("vuetify:v-window-group"), Vd = D({
  continuous: Boolean,
  nextIcon: {
    type: [Boolean, String, Function, Object],
    default: "$next"
  },
  prevIcon: {
    type: [Boolean, String, Function, Object],
    default: "$prev"
  },
  reverse: Boolean,
  showArrows: {
    type: [Boolean, String],
    validator: (e) => typeof e == "boolean" || e === "hover"
  },
  touch: {
    type: [Object, Boolean],
    default: void 0
  },
  direction: {
    type: String,
    default: "horizontal"
  },
  modelValue: null,
  disabled: Boolean,
  selectedClass: {
    type: String,
    default: "v-window-item--active"
  },
  // TODO: mandatory should probably not be exposed but do this for now
  mandatory: {
    type: [Boolean, String],
    default: "force"
  },
  ...re(),
  ...pe(),
  ...xe()
}, "VWindow"), io = U()({
  name: "VWindow",
  directives: {
    Touch: Ad
  },
  props: Vd(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: a
    } = $e(e), {
      isRtl: l
    } = ot(), {
      t: r
    } = Et(), i = il(e, Ld), s = Y(), o = _(() => l.value ? !e.reverse : e.reverse), u = J(!1), c = _(() => {
      const w = e.direction === "vertical" ? "y" : "x", k = (o.value ? !u.value : u.value) ? "-reverse" : "";
      return `v-window-${w}${k}-transition`;
    }), f = J(0), d = Y(void 0), m = _(() => i.items.value.findIndex((w) => i.selected.value.includes(w.id)));
    ne(m, (w, I) => {
      const k = i.items.value.length, C = k - 1;
      k <= 2 ? u.value = w < I : w === C && I === 0 ? u.value = !0 : w === 0 && I === C ? u.value = !1 : u.value = w < I;
    }), Ee(Od, {
      transition: c,
      isReversed: u,
      transitionCount: f,
      transitionHeight: d,
      rootRef: s
    });
    const v = _(() => e.continuous || m.value !== 0), g = _(() => e.continuous || m.value !== i.items.value.length - 1);
    function b() {
      v.value && i.prev();
    }
    function y() {
      g.value && i.next();
    }
    const p = _(() => {
      const w = [], I = {
        icon: l.value ? e.nextIcon : e.prevIcon,
        class: `v-window__${o.value ? "right" : "left"}`,
        onClick: i.prev,
        "aria-label": r("$vuetify.carousel.prev")
      };
      w.push(v.value ? n.prev ? n.prev({
        props: I
      }) : h(at, I, null) : h("div", null, null));
      const k = {
        icon: l.value ? e.prevIcon : e.nextIcon,
        class: `v-window__${o.value ? "left" : "right"}`,
        onClick: i.next,
        "aria-label": r("$vuetify.carousel.next")
      };
      return w.push(g.value ? n.next ? n.next({
        props: k
      }) : h(at, k, null) : h("div", null, null)), w;
    }), x = _(() => e.touch === !1 ? e.touch : {
      ...{
        left: () => {
          o.value ? b() : y();
        },
        right: () => {
          o.value ? y() : b();
        },
        start: (I) => {
          let {
            originalEvent: k
          } = I;
          k.stopPropagation();
        }
      },
      ...e.touch === !0 ? {} : e.touch
    });
    return Z(() => Je(h(e.tag, {
      ref: s,
      class: ["v-window", {
        "v-window--show-arrows-on-hover": e.showArrows === "hover"
      }, a.value, e.class],
      style: e.style
    }, {
      default: () => {
        var w, I;
        return [h("div", {
          class: "v-window__container",
          style: {
            height: d.value
          }
        }, [(w = n.default) == null ? void 0 : w.call(n, {
          group: i
        }), e.showArrows !== !1 && h("div", {
          class: "v-window__controls"
        }, [p.value])]), (I = n.additional) == null ? void 0 : I.call(n, {
          group: i
        })];
      }
    }), [[Qt("touch"), x.value]])), {
      group: i
    };
  }
}), j_ = D({
  ...tn(Vd(), ["continuous", "nextIcon", "prevIcon", "showArrows", "touch", "mandatory"])
}, "VTabsWindow"), Nd = U()({
  name: "VTabsWindow",
  props: j_(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = ye(si, null), l = be(e, "modelValue"), r = _({
      get() {
        var i;
        return l.value != null || !a ? l.value : (i = a.items.value.find((s) => a.selected.value.includes(s.id))) == null ? void 0 : i.value;
      },
      set(i) {
        l.value = i;
      }
    });
    return Z(() => {
      const i = io.filterProps(e);
      return h(io, q({
        _as: "VTabsWindow"
      }, i, {
        modelValue: r.value,
        "onUpdate:modelValue": (s) => r.value = s,
        class: ["v-tabs-window", e.class],
        style: e.style,
        mandatory: !1,
        touch: !1
      }), n);
    }), {};
  }
}), Rd = D({
  reverseTransition: {
    type: [Boolean, String],
    default: void 0
  },
  transition: {
    type: [Boolean, String],
    default: void 0
  },
  ...re(),
  ...qr(),
  ...Hc()
}, "VWindowItem"), so = U()({
  name: "VWindowItem",
  directives: {
    Touch: Ad
  },
  props: Rd(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = ye(Od), l = Xr(e, Ld), {
      isBooted: r
    } = ua();
    if (!a || !l) throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const i = J(!1), s = _(() => r.value && (a.isReversed.value ? e.reverseTransition !== !1 : e.transition !== !1));
    function o() {
      !i.value || !a || (i.value = !1, a.transitionCount.value > 0 && (a.transitionCount.value -= 1, a.transitionCount.value === 0 && (a.transitionHeight.value = void 0)));
    }
    function u() {
      var v;
      i.value || !a || (i.value = !0, a.transitionCount.value === 0 && (a.transitionHeight.value = ee((v = a.rootRef.value) == null ? void 0 : v.clientHeight)), a.transitionCount.value += 1);
    }
    function c() {
      o();
    }
    function f(v) {
      i.value && We(() => {
        !s.value || !i.value || !a || (a.transitionHeight.value = ee(v.clientHeight));
      });
    }
    const d = _(() => {
      const v = a.isReversed.value ? e.reverseTransition : e.transition;
      return s.value ? {
        name: typeof v != "string" ? a.transition.value : v,
        onBeforeEnter: u,
        onAfterEnter: o,
        onEnterCancelled: c,
        onBeforeLeave: u,
        onAfterLeave: o,
        onLeaveCancelled: c,
        onEnter: f
      } : !1;
    }), {
      hasContent: m
    } = Wc(e, l.isSelected);
    return Z(() => h(jt, {
      transition: d.value,
      disabled: !r.value
    }, {
      default: () => {
        var v;
        return [Je(h("div", {
          class: ["v-window-item", l.selectedClass.value, e.class],
          style: e.style
        }, [m.value && ((v = n.default) == null ? void 0 : v.call(n))]), [[mn, l.isSelected.value]])];
      }
    })), {
      groupItem: l
    };
  }
}), U_ = D({
  ...Rd()
}, "VTabsWindowItem"), Fd = U()({
  name: "VTabsWindowItem",
  props: U_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return Z(() => {
      const a = so.filterProps(e);
      return h(so, q({
        _as: "VTabsWindowItem"
      }, a, {
        class: ["v-tabs-window-item", e.class],
        style: e.style
      }), n);
    }), {};
  }
});
function z_(e) {
  return e ? e.map((t) => Jo(t) ? t : {
    text: t,
    value: t
  }) : [];
}
const G_ = D({
  alignTabs: {
    type: String,
    default: "start"
  },
  color: String,
  fixedTabs: Boolean,
  items: {
    type: Array,
    default: () => []
  },
  stacked: Boolean,
  bgColor: String,
  grow: Boolean,
  height: {
    type: [Number, String],
    default: void 0
  },
  hideSlider: Boolean,
  sliderColor: String,
  ...Zr({
    mandatory: "force",
    selectedClass: "v-tab-item--selected"
  }),
  ...ct(),
  ...pe()
}, "VTabs"), Y_ = U()({
  name: "VTabs",
  props: G_(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const l = be(e, "modelValue"), r = _(() => z_(e.items)), {
      densityClasses: i
    } = wt(e), {
      backgroundColorClasses: s,
      backgroundColorStyles: o
    } = Qe(K(e, "bgColor")), {
      scopeId: u
    } = ml();
    return vt({
      VTab: {
        color: K(e, "color"),
        direction: K(e, "direction"),
        stacked: K(e, "stacked"),
        fixed: K(e, "fixedTabs"),
        sliderColor: K(e, "sliderColor"),
        hideSlider: K(e, "hideSlider")
      }
    }), Z(() => {
      const c = Ma.filterProps(e), f = !!(a.window || e.items.length > 0);
      return h(he, null, [h(Ma, q(c, {
        modelValue: l.value,
        "onUpdate:modelValue": (d) => l.value = d,
        class: ["v-tabs", `v-tabs--${e.direction}`, `v-tabs--align-tabs-${e.alignTabs}`, {
          "v-tabs--fixed-tabs": e.fixedTabs,
          "v-tabs--grow": e.grow,
          "v-tabs--stacked": e.stacked
        }, i.value, s.value, e.class],
        style: [{
          "--v-tabs-height": ee(e.height)
        }, o.value, e.style],
        role: "tablist",
        symbol: si
      }, u, n), {
        default: () => {
          var d;
          return [((d = a.default) == null ? void 0 : d.call(a)) ?? r.value.map((m) => {
            var v;
            return ((v = a.tab) == null ? void 0 : v.call(a, {
              item: m
            })) ?? h(Td, q(m, {
              key: m.text,
              value: m.value
            }), {
              default: a[`tab.${m.value}`] ? () => {
                var g;
                return (g = a[`tab.${m.value}`]) == null ? void 0 : g.call(a, {
                  item: m
                });
              } : void 0
            });
          })];
        }
      }), f && h(Nd, q({
        modelValue: l.value,
        "onUpdate:modelValue": (d) => l.value = d,
        key: "tabs-window"
      }, u), {
        default: () => {
          var d;
          return [r.value.map((m) => {
            var v;
            return ((v = a.item) == null ? void 0 : v.call(a, {
              item: m
            })) ?? h(Fd, {
              value: m.value
            }, {
              default: () => {
                var g;
                return (g = a[`item.${m.value}`]) == null ? void 0 : g.call(a, {
                  item: m
                });
              }
            });
          }), (d = a.window) == null ? void 0 : d.call(a)];
        }
      })]);
    }), {};
  }
}), TS = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  VAlert: jy,
  VApp: iy,
  VAppBar: yy,
  VAppBarNavIcon: My,
  VAppBarTitle: By,
  VBtn: at,
  VCard: pb,
  VCardActions: fc,
  VCardText: vc,
  VChip: ei,
  VCol: ab,
  VContainer: Zy,
  VDataTable: g_,
  VDataTableServer: b_,
  VDivider: hl,
  VIcon: Ve,
  VList: Nc,
  VListItem: aa,
  VListSubheader: Tc,
  VMain: $_,
  VMenu: zc,
  VNavigationDrawer: x_,
  VPagination: yr,
  VRow: cb,
  VSheet: A_,
  VSkeletonLoader: N_,
  VSpacer: db,
  VTab: Td,
  VTabs: Y_,
  VTabsWindow: Nd,
  VTabsWindowItem: Fd,
  VTextField: Cr
}, Symbol.toStringTag, { value: "Module" }));
function AS(e, t, n) {
  if (!(n in nf.locales))
    throw Error("Locale is not provided by config.");
  e.global.locale.value = n, kr(e, t, n), document.querySelector("html").setAttribute("lang", n);
}
const oo = /* @__PURE__ */ new Set();
async function kr(e, t, n) {
  const a = n.replace(/[_-](\w+)/, "");
  if (t = `${t}locales/${a}.json`, oo.has(t))
    return;
  oo.add(t);
  const l = await fetch(t).then((r) => r.json());
  e.messages.value[n] = {
    ...e.messages.value[n],
    ...l
  };
}
function uo(e, { path: t = "./", fallback: n = !0 } = {}) {
  t.startsWith("/") || (t = import.meta.resolve(t)), t.endsWith("/") || (t += "/");
  let a = kr(e, t, De(e.locale));
  return n && e.fallbackLocale.value && (a = a.catch((l) => kr(e, t, De(e.fallbackLocale))).catch((l) => {
    throw Error(
      `Could not load locale ${e.locale.value} nor its fallback ${e.fallbackLocale.value} (path: ${t}). Error: ${l}`
    );
  })), a;
}
function OS({ path: e = "./", fallback: t = !0, ...n } = {}) {
  const a = el(n);
  return uo(a, { path: e, fallback: t }), ne(() => a.locale, () => uo(a, { path: e, fallback: t })), a;
}
class _l {
  constructor(t, n) {
    this.repos = t, this.repo = n;
  }
  async request({ all: t = !1, ...n } = {}) {
    return await (t ? this.all : this.fetch).apply(this, [n]);
  }
  async fetch({ ids: t = null, repo: n = null, url: a = null, lookup: l = "id__in", params: r = void 0, ...i } = {}) {
    var s, o;
    if (n ?? (n = this.repo), a || (a = (o = (s = n.use) == null ? void 0 : s.meta) == null ? void 0 : o.url), !a)
      throw Error("URL must be provided or Model must provide a `meta: Meta` with `url`");
    return t && l !== void 0 && (r = { ...r || {} }, r[l] = [...t]), await n.api().get(a, { ...i, params: r });
  }
  async all({ nextKey: t = "next", limit: n = -1, ...a } = {}) {
    const l = await this.fetch(a);
    let r = l.response.data[t];
    for (; r; ) {
      const i = await this.fetch({ ...a, url: r });
      if (i.entities && (l.entities = l.entities !== null ? l.entities.concat(i.entities) : i.entities), r = i.response.data[t], n > 0 && n--, !n) break;
    }
    return l;
  }
  async relations(t, n, a = {}) {
    var i;
    const l = {}, r = (i = this.repo.use) == null ? void 0 : i.fields();
    if (r)
      for (const s of n) {
        const o = r[s];
        if (o instanceof Me)
          l[s] = await this.relation(t, o, a);
        else
          throw Error(`Field ${s} is not a relation`);
      }
    return l;
  }
  async relation(t, n, { thin: a = !1, ...l } = {}) {
    var c, f;
    if (typeof n == "string") {
      const d = (c = this.repo.use) == null ? void 0 : c.fields();
      if (!d || !d[n])
        throw Error(`Field ${n} is not a relation on ${this.repo.use} model`);
      n = d[n];
    }
    const r = n.related.constructor.entity, i = this.repos[r];
    if (!i)
      throw Error(`No repository "${r}" found.`);
    let s = po(t, n.foreignKey), o = null;
    if (a) {
      o = new Set(Object.keys((f = i.pinia.state[r]) == null ? void 0 : f.value.data).filter((m) => m in s));
      const d = s.difference(o);
      d && (s = d);
    }
    const u = await this.request({ ids: s, repo: i, ...l });
    if (a && o) {
      const d = i.whereId(o).get();
      u.entities = [...u.entities || [], ...d];
    }
    return u;
  }
  getRelations(t) {
    var l;
    const n = (l = this.repo.use) == null ? void 0 : l.fields();
    if (!t)
      return {};
    let a = Object.entries(n).filter(([r, i]) => i instanceof Me && i.related instanceof gn && i.related.meta);
    return t && (a = a.filter(([r, i]) => {
      var s;
      return t.includes(r) && ((s = i.related) == null ? void 0 : s.meta);
    })), a.reduce((r, [i, s]) => (r[i] = s, r), {});
  }
}
function Dd(e) {
  return (t) => (typeof t == "string" && (t = e[t]), new _l(e, t));
}
function q_() {
  return { query: Dd, Query: _l };
}
const LS = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Query: _l,
  query: Dd,
  useQuery: q_
}, Symbol.toStringTag, { value: "Module" }));
function co(e, t, n) {
  const a = e.getSiblingIdx(De(t), -1);
  return a > -1 ? e.items.value[a] : null;
}
class X_ {
  static reactive({ query: t, value: n, ...a }) {
    const l = Xe(new this({ query: t, ...a }));
    return l.items = _(() => l.getItems()), l.prev = _(() => co(l, n)), l.next = _(() => co(l, n)), l;
  }
  constructor({ query: t, ...n }) {
    this.query = t, this.relations = n.relations ?? null, this.filters = n.filters ?? {}, this.keys = n.keys ?? null, this.url = n.url ?? null, this.state = ef.none(), this.nextUrl = null, this.prevUrl = null, this.ids = [];
  }
  get repo() {
    return this.query.repo;
  }
  async fetch({ append: t = !1, ...n } = {}) {
    var r, i, s;
    this.state.processing(), n = this.initOptions(n);
    const a = await this.query.request(n);
    this.relations && a.entities && (a.relations = await this.query.relations(a.entities, this.relations, { ...n, all: !0, params: {} }));
    const l = [...po(a.entities, "id")];
    return this.ids = t ? this.ids.concat(l) : l, this.nextUrl = a.response.data[(r = this.keys) == null ? void 0 : r.next] || null, this.prevUrl = a.response.data[(i = this.keys) == null ? void 0 : i.prev] || null, this.count = a.response.data[(s = this.keys) == null ? void 0 : s.count] || this.ids.length, this.state.none(), a;
  }
  getSiblingIdx(t, n = 1) {
    const a = this.ids.indexOf(t.id);
    if (a == -1)
      return -1;
    const l = a + n;
    return a > -1 && l < (this.count ?? this.ids.length) ? l : -1;
  }
  getItems() {
    console.log(">>>", this.query.repo.all());
    let t = this.query.repo.whereId(this.ids);
    if (this.relations)
      for (const n of this.relations)
        t = t.with(n);
    return t.get();
  }
  initOptions({ filters: t = null, ...n }) {
    var a;
    return !n.dataKey && ((a = this.keys) != null && a.data) && (n.dataKey = this.keys.data), !n.url && this.url && (n.url = this.url), t && Object.assign(this.filters, t), this.filters && (n.params = { ...this.filters, ...n.params ?? [] }), n;
  }
  async fetchNext(t) {
    return await this.fetch({ ...t, url: this.nextUrl });
  }
  async fetchPrev(t) {
    return await this.fetch({ ...t, url: this.prevUrl });
  }
}
function Q_({ repo: e = null, repos: t = null, query: n = null, ...a }) {
  return n ?? (n = new _l(t, e)), X_.reactive({ query: n, ...a });
}
const J_ = {
  repo: Object,
  url: String,
  relations: { type: Array },
  value: { type: Object },
  dataKey: { type: String, default: "results" },
  prevKey: { type: String, default: "previous" },
  nextKey: { type: String, default: "next" },
  countKey: { type: String, default: "count" }
};
function VS() {
  return J_;
}
function NS(e, t) {
  return Q_({
    ...t,
    repo: e.repo,
    url: e.url,
    relations: e.relations,
    value: e.value,
    keys: {
      data: e.dataKey,
      next: e.nextKey,
      prev: e.prevKey,
      count: e.countKey
    }
  });
}
function RS(e, t) {
  return Zd(() => import(e).then((n) => t ? Object.values(n).filter((l) => l.__name == t)[0] : n));
}
export {
  hS as $,
  RS as A,
  LS as B,
  er as C,
  Na as D,
  mS as E,
  gS as F,
  Ia as G,
  nh as H,
  Qg as I,
  _S as J,
  AS as K,
  Su as L,
  ra as M,
  oo as N,
  kr as O,
  zn as P,
  uo as Q,
  OS as R,
  ef as S,
  As as T,
  En as U,
  X_ as V,
  Q_ as W,
  J_ as X,
  VS as Y,
  NS as Z,
  Zv as _,
  gn as a,
  eh as a0,
  th as a1,
  yS as a2,
  bS as a3,
  pS as a4,
  po as a5,
  lS as a6,
  iS as a7,
  wl as a8,
  ui as a9,
  N_ as aA,
  jy as aB,
  hl as aC,
  Fd as aD,
  Y_ as aE,
  Td as aF,
  Bs as aG,
  zc as aH,
  $S as aI,
  io as aJ,
  so as aK,
  Ue as aa,
  aS as ab,
  at as ac,
  aa as ad,
  el as ae,
  iy as af,
  yy as ag,
  My as ah,
  By as ai,
  Ve as aj,
  db as ak,
  x_ as al,
  $_ as am,
  Nd as an,
  Ms as ao,
  Cr as ap,
  U as aq,
  qr as ar,
  Xr as as,
  qy as at,
  A_ as au,
  Ma as av,
  pb as aw,
  hb as ax,
  Nc as ay,
  b_ as az,
  wi as b,
  Wn as c,
  CS as d,
  kS as e,
  PS as f,
  xS as g,
  IS as h,
  ES as i,
  ia as j,
  Kg as k,
  Ug as l,
  lt as m,
  ke as n,
  Nt as o,
  wS as p,
  Xg as q,
  rS as r,
  tf as s,
  nf as t,
  SS as u,
  TS as v,
  sS as w,
  oS as x,
  vS as y,
  Ya as z
};
