import { watch as X, onScopeDispose as Be, effectScope as dn, reactive as Ye, watchEffect as _e, toRef as T, capitalize as nn, shallowRef as G, isVNode as Ys, Comment as Ks, Fragment as ce, camelize as al, unref as lt, warn as ra, getCurrentInstance as Xs, ref as Y, computed as x, provide as Pe, inject as ye, defineComponent as qs, h as Mt, toRaw as Ee, toRefs as sa, toValue as je, createVNode as w, mergeProps as j, createElementVNode as C, normalizeClass as q, getCurrentScope as Zs, onBeforeUnmount as Ge, readonly as ua, onMounted as rt, useId as ft, onDeactivated as Zi, onActivated as Qs, nextTick as Se, TransitionGroup as ll, Transition as Vt, onBeforeMount as ca, normalizeStyle as re, withDirectives as $e, vShow as Rt, Text as Js, isRef as Ha, resolveDynamicComponent as eu, toDisplayString as Ft, onUpdated as tu, Teleport as nu, markRaw as au, cloneVNode as lu, onBeforeUpdate as iu, createTextVNode as zn, withModifiers as Fn, vModelText as ou } from "vue";
function Ke(e, t) {
  let n;
  function a() {
    n = dn(), n.run(() => t.length ? t(() => {
      n == null || n.stop(), a();
    }) : t());
  }
  X(e, (l) => {
    l && !n ? a() : l || (n == null || n.stop(), n = void 0);
  }, {
    immediate: !0
  }), Be(() => {
    n == null || n.stop();
  });
}
const he = typeof window < "u", il = he && "IntersectionObserver" in window, ru = he && ("ontouchstart" in window || window.navigator.maxTouchPoints > 0), Qi = he && "matchMedia" in window && typeof window.matchMedia == "function", Ot = () => Qi && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function Hl(e, t, n) {
  su(e, t), t.set(e, n);
}
function su(e, t) {
  if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function zl(e, t, n) {
  return e.set(Ji(e, t), n), n;
}
function xt(e, t) {
  return e.get(Ji(e, t));
}
function Ji(e, t, n) {
  if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
  throw new TypeError("Private element is not present on this object");
}
function eo(e, t, n) {
  const a = t.length - 1;
  if (a < 0) return e === void 0 ? n : e;
  for (let l = 0; l < a; l++) {
    if (e == null)
      return n;
    e = e[t[l]];
  }
  return e == null || e[t[a]] === void 0 ? n : e[t[a]];
}
function We(e, t) {
  if (e === t) return !0;
  if (e instanceof Date && t instanceof Date && e.getTime() !== t.getTime() || e !== Object(e) || t !== Object(t))
    return !1;
  const n = Object.keys(e);
  return n.length !== Object.keys(t).length ? !1 : n.every((a) => We(e[a], t[a]));
}
function Lt(e, t, n) {
  return e == null || !t || typeof t != "string" ? n : e[t] !== void 0 ? e[t] : (t = t.replace(/\[(\w+)\]/g, ".$1"), t = t.replace(/^\./, ""), eo(e, t.split("."), n));
}
function Ne(e, t, n) {
  if (t === !0) return e === void 0 ? n : e;
  if (t == null || typeof t == "boolean") return n;
  if (e !== Object(e)) {
    if (typeof t != "function") return n;
    const l = t(e, n);
    return typeof l > "u" ? n : l;
  }
  if (typeof t == "string") return Lt(e, t, n);
  if (Array.isArray(t)) return eo(e, t, n);
  if (typeof t != "function") return n;
  const a = t(e, n);
  return typeof a > "u" ? n : a;
}
function Ut(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return Array.from({
    length: e
  }, (n, a) => t + a);
}
function J(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "px";
  if (e == null || e === "")
    return;
  const n = Number(e);
  return isNaN(n) ? String(e) : isFinite(n) ? `${n}${t}` : void 0;
}
function Wn(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function Wl(e) {
  let t;
  return e !== null && typeof e == "object" && ((t = Object.getPrototypeOf(e)) === Object.prototype || t === null);
}
function ol(e) {
  if (e && "$el" in e) {
    const t = e.$el;
    return (t == null ? void 0 : t.nodeType) === Node.TEXT_NODE ? t.nextElementSibling : t;
  }
  return e;
}
const jl = Object.freeze({
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
function to(e) {
  return Object.keys(e);
}
function Aa(e, t) {
  return t.every((n) => e.hasOwnProperty(n));
}
function Pt(e, t) {
  const n = {};
  for (const a of t)
    Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
  return n;
}
function Gl(e, t, n) {
  const a = /* @__PURE__ */ Object.create(null), l = /* @__PURE__ */ Object.create(null);
  for (const i in e)
    t.some((o) => o instanceof RegExp ? o.test(i) : o === i) ? a[i] = e[i] : l[i] = e[i];
  return [a, l];
}
function qe(e, t) {
  const n = {
    ...e
  };
  return t.forEach((a) => delete n[a]), n;
}
const no = /^on[^a-z]/, rl = (e) => no.test(e), uu = ["onAfterscriptexecute", "onAnimationcancel", "onAnimationend", "onAnimationiteration", "onAnimationstart", "onAuxclick", "onBeforeinput", "onBeforescriptexecute", "onChange", "onClick", "onCompositionend", "onCompositionstart", "onCompositionupdate", "onContextmenu", "onCopy", "onCut", "onDblclick", "onFocusin", "onFocusout", "onFullscreenchange", "onFullscreenerror", "onGesturechange", "onGestureend", "onGesturestart", "onGotpointercapture", "onInput", "onKeydown", "onKeypress", "onKeyup", "onLostpointercapture", "onMousedown", "onMousemove", "onMouseout", "onMouseover", "onMouseup", "onMousewheel", "onPaste", "onPointercancel", "onPointerdown", "onPointerenter", "onPointerleave", "onPointermove", "onPointerout", "onPointerover", "onPointerup", "onReset", "onSelect", "onSubmit", "onTouchcancel", "onTouchend", "onTouchmove", "onTouchstart", "onTransitioncancel", "onTransitionend", "onTransitionrun", "onTransitionstart", "onWheel"];
function da(e) {
  const [t, n] = Gl(e, [no]), a = qe(t, uu), [l, i] = Gl(n, ["class", "style", "id", /^data-/]);
  return Object.assign(l, t), Object.assign(i, a), [l, i];
}
function Oe(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function cu(e, t) {
  let n = 0;
  const a = function() {
    for (var l = arguments.length, i = new Array(l), o = 0; o < l; o++)
      i[o] = arguments[o];
    clearTimeout(n), n = setTimeout(() => e(...i), lt(t));
  };
  return a.clear = () => {
    clearTimeout(n);
  }, a.immediate = e, a;
}
function Fe(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  return Math.max(t, Math.min(n, e));
}
function Ul(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
  return e + n.repeat(Math.max(0, t - e.length));
}
function Yl(e, t) {
  return (arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0").repeat(Math.max(0, t - e.length)) + e;
}
function du(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  const n = [];
  let a = 0;
  for (; a < e.length; )
    n.push(e.substr(a, t)), a += t;
  return n;
}
function He() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  const a = {};
  for (const l in e)
    a[l] = e[l];
  for (const l in t) {
    const i = e[l], o = t[l];
    if (Wl(i) && Wl(o)) {
      a[l] = He(i, o, n);
      continue;
    }
    if (n && Array.isArray(i) && Array.isArray(o)) {
      a[l] = n(i, o);
      continue;
    }
    a[l] = o;
  }
  return a;
}
function ao(e) {
  return e.map((t) => t.type === ce ? ao(t.children) : t).flat();
}
function Bt() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  if (Bt.cache.has(e)) return Bt.cache.get(e);
  const t = e.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
  return Bt.cache.set(e, t), t;
}
Bt.cache = /* @__PURE__ */ new Map();
function Yt(e, t) {
  if (!t || typeof t != "object") return [];
  if (Array.isArray(t))
    return t.map((n) => Yt(e, n)).flat(1);
  if (t.suspense)
    return Yt(e, t.ssContent);
  if (Array.isArray(t.children))
    return t.children.map((n) => Yt(e, n)).flat(1);
  if (t.component) {
    if (Object.getOwnPropertySymbols(t.component.provides).includes(e))
      return [t.component];
    if (t.component.subTree)
      return Yt(e, t.component.subTree).flat(1);
  }
  return [];
}
var zt = /* @__PURE__ */ new WeakMap(), Et = /* @__PURE__ */ new WeakMap();
class lo {
  constructor(t) {
    Hl(this, zt, []), Hl(this, Et, 0), this.size = t;
  }
  get isFull() {
    return xt(zt, this).length === this.size;
  }
  push(t) {
    xt(zt, this)[xt(Et, this)] = t, zl(Et, this, (xt(Et, this) + 1) % this.size);
  }
  values() {
    return xt(zt, this).slice(xt(Et, this)).concat(xt(zt, this).slice(0, xt(Et, this)));
  }
  clear() {
    xt(zt, this).length = 0, zl(Et, this, 0);
  }
}
function sl(e) {
  const t = Ye({});
  _e(() => {
    const a = e();
    for (const l in a)
      t[l] = a[l];
  }, {
    flush: "sync"
  });
  const n = {};
  for (const a in t)
    n[a] = T(() => t[a]);
  return n;
}
function jn(e, t) {
  return e.includes(t);
}
function io(e) {
  return e[2].toLowerCase() + e.slice(3);
}
const Le = () => [Function, Array];
function Kl(e, t) {
  return t = "on" + nn(t), !!(e[t] || e[`${t}Once`] || e[`${t}Capture`] || e[`${t}OnceCapture`] || e[`${t}CaptureOnce`]);
}
function fa(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
    n[a - 1] = arguments[a];
  if (Array.isArray(e))
    for (const l of e)
      l(...n);
  else typeof e == "function" && e(...n);
}
function Xt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  const n = ["button", "[href]", 'input:not([type="hidden"])', "select", "textarea", "[tabindex]"].map((a) => `${a}${t ? ':not([tabindex="-1"])' : ""}:not([disabled])`).join(", ");
  return [...e.querySelectorAll(n)];
}
function oo(e, t, n) {
  let a, l = e.indexOf(document.activeElement);
  const i = t === "next" ? 1 : -1;
  do
    l += i, a = e[l];
  while ((!a || a.offsetParent == null || !((n == null ? void 0 : n(a)) ?? !0)) && l < e.length && l >= 0);
  return a;
}
function cn(e, t) {
  var a, l, i, o;
  const n = Xt(e);
  if (t == null)
    (e === document.activeElement || !e.contains(document.activeElement)) && ((a = n[0]) == null || a.focus());
  else if (t === "first")
    (l = n[0]) == null || l.focus();
  else if (t === "last")
    (i = n.at(-1)) == null || i.focus();
  else if (typeof t == "number")
    (o = n[t]) == null || o.focus();
  else {
    const r = oo(n, t);
    r ? r.focus() : cn(e, t === "next" ? "first" : "last");
  }
}
function On(e) {
  return e == null || typeof e == "string" && e.trim() === "";
}
function fu() {
}
function qt(e, t) {
  if (!(he && typeof CSS < "u" && typeof CSS.supports < "u" && CSS.supports(`selector(${t})`))) return null;
  try {
    return !!e && e.matches(t);
  } catch {
    return null;
  }
}
function ul(e) {
  return e.some((t) => Ys(t) ? t.type === Ks ? !1 : t.type !== ce || ul(t.children) : !0) ? e : null;
}
function vu(e, t) {
  if (!he || e === 0)
    return t(), () => {
    };
  const n = window.setTimeout(t, e);
  return () => window.clearTimeout(n);
}
function mu(e, t) {
  const n = e.clientX, a = e.clientY, l = t.getBoundingClientRect(), i = l.left, o = l.top, r = l.right, s = l.bottom;
  return n >= i && n <= r && a >= o && a <= s;
}
function za() {
  const e = G(), t = (n) => {
    e.value = n;
  };
  return Object.defineProperty(t, "value", {
    enumerable: !0,
    get: () => e.value,
    set: (n) => e.value = n
  }), Object.defineProperty(t, "el", {
    enumerable: !0,
    get: () => ol(e.value)
  }), t;
}
function Gn(e) {
  const t = e.key.length === 1, n = !e.ctrlKey && !e.metaKey && !e.altKey;
  return t && n;
}
function Wa(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean" || typeof e == "bigint";
}
function gu(e) {
  const t = {};
  for (const n in e)
    t[al(n)] = e[n];
  return t;
}
function hu(e) {
  const t = ["checked", "disabled"];
  return Object.fromEntries(Object.entries(e).filter((n) => {
    let [a, l] = n;
    return t.includes(a) ? !!l : l !== void 0;
  }));
}
const ro = ["top", "bottom"], yu = ["start", "end", "left", "right"];
function ja(e, t) {
  let [n, a] = e.split(" ");
  return a || (a = jn(ro, n) ? "start" : jn(yu, n) ? "top" : "center"), {
    side: Ga(n, t),
    align: Ga(a, t)
  };
}
function Ga(e, t) {
  return e === "start" ? t ? "right" : "left" : e === "end" ? t ? "left" : "right" : e;
}
function Ta(e) {
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
function Ea(e) {
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
function Xl(e) {
  return {
    side: e.align,
    align: e.side
  };
}
function ql(e) {
  return jn(ro, e.side) ? "y" : "x";
}
class it {
  constructor(t) {
    const n = document.body.currentCSSZoom ?? 1, a = t instanceof DOMRect ? 1 + (1 - n) / n : 1, {
      x: l,
      y: i,
      width: o,
      height: r
    } = t;
    this.x = l * a, this.y = i * a, this.width = o * a, this.height = r * a;
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
function Zl(e, t) {
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
function so(e) {
  if (Array.isArray(e)) {
    const t = document.body.currentCSSZoom ?? 1, n = 1 + (1 - t) / t;
    return new it({
      x: e[0] * n,
      y: e[1] * n,
      width: 0 * n,
      height: 0 * n
    });
  } else
    return new it(e.getBoundingClientRect());
}
function bu(e) {
  if (e === document.documentElement)
    if (visualViewport) {
      const t = document.body.currentCSSZoom ?? 1;
      return new it({
        x: visualViewport.scale > 1 ? 0 : visualViewport.offsetLeft,
        y: visualViewport.scale > 1 ? 0 : visualViewport.offsetTop,
        width: visualViewport.width * visualViewport.scale / t,
        height: visualViewport.height * visualViewport.scale / t
      });
    } else
      return new it({
        x: 0,
        y: 0,
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      });
  else {
    const t = e.getBoundingClientRect();
    return new it({
      x: t.x,
      y: t.y,
      width: e.clientWidth,
      height: e.clientHeight
    });
  }
}
function cl(e) {
  const t = new it(e.getBoundingClientRect()), n = getComputedStyle(e), a = n.transform;
  if (a) {
    let l, i, o, r, s;
    if (a.startsWith("matrix3d("))
      l = a.slice(9, -1).split(/, /), i = Number(l[0]), o = Number(l[5]), r = Number(l[12]), s = Number(l[13]);
    else if (a.startsWith("matrix("))
      l = a.slice(7, -1).split(/, /), i = Number(l[0]), o = Number(l[3]), r = Number(l[4]), s = Number(l[5]);
    else
      return new it(t);
    const c = n.transformOrigin, u = t.x - r - (1 - i) * parseFloat(c), d = t.y - s - (1 - o) * parseFloat(c.slice(c.indexOf(" ") + 1)), f = i ? t.width / i : e.offsetWidth + 1, v = o ? t.height / o : e.offsetHeight + 1;
    return new it({
      x: u,
      y: d,
      width: f,
      height: v
    });
  } else
    return new it(t);
}
function kt(e, t, n) {
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
const Nn = /* @__PURE__ */ new WeakMap();
function Su(e, t) {
  Object.keys(t).forEach((n) => {
    if (rl(n)) {
      const a = io(n), l = Nn.get(e);
      if (t[n] == null)
        l == null || l.forEach((i) => {
          const [o, r] = i;
          o === a && (e.removeEventListener(a, r), l.delete(i));
        });
      else if (!l || ![...l].some((i) => i[0] === a && i[1] === t[n])) {
        e.addEventListener(a, t[n]);
        const i = l || /* @__PURE__ */ new Set();
        i.add([a, t[n]]), Nn.has(e) || Nn.set(e, i);
      }
    } else
      t[n] == null ? e.removeAttribute(n) : e.setAttribute(n, t[n]);
  });
}
function wu(e, t) {
  Object.keys(t).forEach((n) => {
    if (rl(n)) {
      const a = io(n), l = Nn.get(e);
      l == null || l.forEach((i) => {
        const [o, r] = i;
        o === a && (e.removeEventListener(a, r), l.delete(i));
      });
    } else
      e.removeAttribute(n);
  });
}
const Wt = 2.4, Ql = 0.2126729, Jl = 0.7151522, ei = 0.072175, xu = 0.55, ku = 0.58, Cu = 0.57, pu = 0.62, Ln = 0.03, ti = 1.45, Vu = 5e-4, Pu = 1.25, Iu = 1.25, ni = 0.078, ai = 12.82051282051282, $n = 0.06, li = 1e-3;
function ii(e, t) {
  const n = (e.r / 255) ** Wt, a = (e.g / 255) ** Wt, l = (e.b / 255) ** Wt, i = (t.r / 255) ** Wt, o = (t.g / 255) ** Wt, r = (t.b / 255) ** Wt;
  let s = n * Ql + a * Jl + l * ei, c = i * Ql + o * Jl + r * ei;
  if (s <= Ln && (s += (Ln - s) ** ti), c <= Ln && (c += (Ln - c) ** ti), Math.abs(c - s) < Vu) return 0;
  let u;
  if (c > s) {
    const d = (c ** xu - s ** ku) * Pu;
    u = d < li ? 0 : d < ni ? d - d * ai * $n : d - $n;
  } else {
    const d = (c ** pu - s ** Cu) * Iu;
    u = d > -li ? 0 : d > -ni ? d - d * ai * $n : d + $n;
  }
  return u * 100;
}
function tt(e) {
  ra(`Vuetify: ${e}`);
}
function fn(e) {
  ra(`Vuetify error: ${e}`);
}
function uo(e, t) {
  t = Array.isArray(t) ? t.slice(0, -1).map((n) => `'${n}'`).join(", ") + ` or '${t.at(-1)}'` : `'${t}'`, ra(`[Vuetify UPGRADE] '${e}' is deprecated, use ${t} instead.`);
}
const Un = 0.20689655172413793, Au = (e) => e > Un ** 3 ? Math.cbrt(e) : e / (3 * Un ** 2) + 4 / 29, Tu = (e) => e > Un ? e ** 3 : 3 * Un ** 2 * (e - 4 / 29);
function co(e) {
  const t = Au, n = t(e[1]);
  return [116 * n - 16, 500 * (t(e[0] / 0.95047) - n), 200 * (n - t(e[2] / 1.08883))];
}
function fo(e) {
  const t = Tu, n = (e[0] + 16) / 116;
  return [t(n + e[1] / 500) * 0.95047, t(n), t(n - e[2] / 200) * 1.08883];
}
const Eu = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.204, 1.057]], _u = (e) => e <= 31308e-7 ? e * 12.92 : 1.055 * e ** (1 / 2.4) - 0.055, Bu = [[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]], Du = (e) => e <= 0.04045 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4;
function vo(e) {
  const t = Array(3), n = _u, a = Eu;
  for (let l = 0; l < 3; ++l)
    t[l] = Math.round(Fe(n(a[l][0] * e[0] + a[l][1] * e[1] + a[l][2] * e[2])) * 255);
  return {
    r: t[0],
    g: t[1],
    b: t[2]
  };
}
function dl(e) {
  let {
    r: t,
    g: n,
    b: a
  } = e;
  const l = [0, 0, 0], i = Du, o = Bu;
  t = i(t / 255), n = i(n / 255), a = i(a / 255);
  for (let r = 0; r < 3; ++r)
    l[r] = o[r][0] * t + o[r][1] * n + o[r][2] * a;
  return l;
}
function Ua(e) {
  return !!e && /^(#|var\(--|(rgb|hsl)a?\()/.test(e);
}
function Fu(e) {
  return Ua(e) && !/^((rgb|hsl)a?\()?var\(--/.test(e);
}
const oi = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/, Ou = {
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
  hsl: (e, t, n, a) => ri({
    h: e,
    s: t,
    l: n,
    a
  }),
  hsla: (e, t, n, a) => ri({
    h: e,
    s: t,
    l: n,
    a
  }),
  hsv: (e, t, n, a) => vn({
    h: e,
    s: t,
    v: n,
    a
  }),
  hsva: (e, t, n, a) => vn({
    h: e,
    s: t,
    v: n,
    a
  })
};
function ht(e) {
  if (typeof e == "number")
    return (isNaN(e) || e < 0 || e > 16777215) && tt(`'${e}' is not a valid hex color`), {
      r: (e & 16711680) >> 16,
      g: (e & 65280) >> 8,
      b: e & 255
    };
  if (typeof e == "string" && oi.test(e)) {
    const {
      groups: t
    } = e.match(oi), {
      fn: n,
      values: a
    } = t, l = a.split(/,\s*|\s*\/\s*|\s+/).map((i, o) => i.endsWith("%") || // unitless slv are %
    o > 0 && o < 3 && ["hsl", "hsla", "hsv", "hsva"].includes(n) ? parseFloat(i) / 100 : parseFloat(i));
    return Ou[n](...l);
  } else if (typeof e == "string") {
    let t = e.startsWith("#") ? e.slice(1) : e;
    [3, 4].includes(t.length) ? t = t.split("").map((a) => a + a).join("") : [6, 8].includes(t.length) || tt(`'${e}' is not a valid hex(a) color`);
    const n = parseInt(t, 16);
    return (isNaN(n) || n < 0 || n > 4294967295) && tt(`'${e}' is not a valid hex(a) color`), $u(t);
  } else if (typeof e == "object") {
    if (Aa(e, ["r", "g", "b"]))
      return e;
    if (Aa(e, ["h", "s", "l"]))
      return vn(mo(e));
    if (Aa(e, ["h", "s", "v"]))
      return vn(e);
  }
  throw new TypeError(`Invalid color: ${e == null ? e : String(e) || e.constructor.name}
Expected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`);
}
function vn(e) {
  const {
    h: t,
    s: n,
    v: a,
    a: l
  } = e, i = (r) => {
    const s = (r + t / 60) % 6;
    return a - a * n * Math.max(Math.min(s, 4 - s, 1), 0);
  }, o = [i(5), i(3), i(1)].map((r) => Math.round(r * 255));
  return {
    r: o[0],
    g: o[1],
    b: o[2],
    a: l
  };
}
function ri(e) {
  return vn(mo(e));
}
function mo(e) {
  const {
    h: t,
    s: n,
    l: a,
    a: l
  } = e, i = a + n * Math.min(a, 1 - a), o = i === 0 ? 0 : 2 - 2 * a / i;
  return {
    h: t,
    s: o,
    v: i,
    a: l
  };
}
function Mn(e) {
  const t = Math.round(e).toString(16);
  return ("00".substr(0, 2 - t.length) + t).toUpperCase();
}
function Lu(e) {
  let {
    r: t,
    g: n,
    b: a,
    a: l
  } = e;
  return `#${[Mn(t), Mn(n), Mn(a), l !== void 0 ? Mn(Math.round(l * 255)) : ""].join("")}`;
}
function $u(e) {
  e = Mu(e);
  let [t, n, a, l] = du(e, 2).map((i) => parseInt(i, 16));
  return l = l === void 0 ? l : l / 255, {
    r: t,
    g: n,
    b: a,
    a: l
  };
}
function Mu(e) {
  return e.startsWith("#") && (e = e.slice(1)), e = e.replace(/([^0-9a-f])/gi, "F"), (e.length === 3 || e.length === 4) && (e = e.split("").map((t) => t + t).join("")), e.length !== 6 && (e = Ul(Ul(e, 6), 8, "F")), e;
}
function Ru(e, t) {
  const n = co(dl(e));
  return n[0] = n[0] + t * 10, vo(fo(n));
}
function Nu(e, t) {
  const n = co(dl(e));
  return n[0] = n[0] - t * 10, vo(fo(n));
}
function Hu(e) {
  const t = ht(e);
  return dl(t)[1];
}
function go(e) {
  const t = Math.abs(ii(ht(0), ht(e)));
  return Math.abs(ii(ht(16777215), ht(e))) > Math.min(t, 50) ? "#fff" : "#000";
}
function O(e, t) {
  return (n) => Object.keys(e).reduce((a, l) => {
    const o = typeof e[l] == "object" && e[l] != null && !Array.isArray(e[l]) ? e[l] : {
      type: e[l]
    };
    return n && l in n ? a[l] = {
      ...o,
      default: n[l]
    } : a[l] = o, t && !a[l].source && (a[l].source = t), a;
  }, {});
}
const oe = O({
  class: [String, Array, Object],
  style: {
    type: [String, Array, Object],
    default: null
  }
}, "component");
function Ie(e, t) {
  const n = Xs();
  if (!n)
    throw new Error(`[Vuetify] ${e} must be called from inside a setup function`);
  return n;
}
function yt() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "composables";
  const t = Ie(e).type;
  return Bt((t == null ? void 0 : t.aliasName) || (t == null ? void 0 : t.name));
}
function zu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ie("injectSelf");
  const {
    provides: n
  } = t;
  if (n && e in n)
    return n[e];
}
const Zt = Symbol.for("vuetify:defaults");
function Wu(e) {
  return Y(e);
}
function fl() {
  const e = ye(Zt);
  if (!e) throw new Error("[Vuetify] Could not find defaults instance");
  return e;
}
function nt(e, t) {
  const n = fl(), a = Y(e), l = x(() => {
    if (lt(t == null ? void 0 : t.disabled)) return n.value;
    const o = lt(t == null ? void 0 : t.scoped), r = lt(t == null ? void 0 : t.reset), s = lt(t == null ? void 0 : t.root);
    if (a.value == null && !(o || r || s)) return n.value;
    let c = He(a.value, {
      prev: n.value
    });
    if (o) return c;
    if (r || s) {
      const u = Number(r || 1 / 0);
      for (let d = 0; d <= u && !(!c || !("prev" in c)); d++)
        c = c.prev;
      return c && typeof s == "string" && s in c && (c = He(He(c, {
        prev: c
      }), c[s])), c;
    }
    return c.prev ? He(c.prev, c) : c;
  });
  return Pe(Zt, l), l;
}
function ju(e, t) {
  return e.props && (typeof e.props[t] < "u" || typeof e.props[Bt(t)] < "u");
}
function Gu() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : fl();
  const a = Ie("useDefaults");
  if (t = t ?? a.type.name ?? a.type.__name, !t)
    throw new Error("[Vuetify] Could not determine component name");
  const l = x(() => {
    var s;
    return (s = n.value) == null ? void 0 : s[e._as ?? t];
  }), i = new Proxy(e, {
    get(s, c) {
      var v, m, g, y;
      const u = Reflect.get(s, c);
      if (c === "class" || c === "style")
        return [(v = l.value) == null ? void 0 : v[c], u].filter((h) => h != null);
      if (ju(a.vnode, c)) return u;
      const d = (m = l.value) == null ? void 0 : m[c];
      if (d !== void 0) return d;
      const f = (y = (g = n.value) == null ? void 0 : g.global) == null ? void 0 : y[c];
      return f !== void 0 ? f : u;
    }
  }), o = G();
  _e(() => {
    if (l.value) {
      const s = Object.entries(l.value).filter((c) => {
        let [u] = c;
        return u.startsWith(u[0].toUpperCase());
      });
      o.value = s.length ? Object.fromEntries(s) : void 0;
    } else
      o.value = void 0;
  });
  function r() {
    const s = zu(Zt, a);
    Pe(Zt, x(() => o.value ? He((s == null ? void 0 : s.value) ?? {}, o.value) : s == null ? void 0 : s.value));
  }
  return {
    props: i,
    provideSubDefaults: r
  };
}
function an(e) {
  if (e._setup = e._setup ?? e.setup, !e.name)
    return tt("The component is missing an explicit name, unable to generate default prop value"), e;
  if (e._setup) {
    e.props = O(e.props ?? {}, e.name)();
    const t = Object.keys(e.props).filter((n) => n !== "class" && n !== "style");
    e.filterProps = function(a) {
      return Pt(a, t);
    }, e.props._as = String, e.setup = function(a, l) {
      const i = fl();
      if (!i.value) return e._setup(a, l);
      const {
        props: o,
        provideSubDefaults: r
      } = Gu(a, a._as ?? e.name, i), s = e._setup(o, l);
      return r(), s;
    };
  }
  return e;
}
function U() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return (t) => (e ? an : qs)(t);
}
function Uu(e, t) {
  return t.props = e, t;
}
function va(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "div", n = arguments.length > 2 ? arguments[2] : void 0;
  return U()({
    name: n ?? nn(al(e.replace(/__/g, "-"))),
    props: {
      tag: {
        type: String,
        default: t
      },
      ...oe()
    },
    setup(a, l) {
      let {
        slots: i
      } = l;
      return () => {
        var o;
        return Mt(a.tag, {
          class: [e, a.class],
          style: a.style
        }, (o = i.default) == null ? void 0 : o.call(i));
      };
    }
  });
}
function ho(e) {
  if (typeof e.getRootNode != "function") {
    for (; e.parentNode; ) e = e.parentNode;
    return e !== document ? null : document;
  }
  const t = e.getRootNode();
  return t !== document && t.getRootNode({
    composed: !0
  }) !== document ? null : t;
}
const mn = "cubic-bezier(0.4, 0, 0.2, 1)", si = "cubic-bezier(0.0, 0, 0.2, 1)", ui = "cubic-bezier(0.4, 0, 1, 1)", Yu = {
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
  easeInOutQuint: (e) => e < 0.5 ? 16 * e ** 5 : 1 + 16 * --e ** 5,
  instant: (e) => 1
};
function ci(e, t, n) {
  return Object.keys(e).filter((a) => rl(a) && a.endsWith(t)).reduce((a, l) => (a[l.slice(0, -t.length)] = (i) => fa(e[l], i, n(i)), a), {});
}
function yo(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  for (; e; ) {
    if (t ? Ku(e) : vl(e)) return e;
    e = e.parentElement;
  }
  return document.scrollingElement;
}
function Yn(e, t) {
  const n = [];
  if (t && e && !t.contains(e)) return n;
  for (; e && (vl(e) && n.push(e), e !== t); )
    e = e.parentElement;
  return n;
}
function vl(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const t = window.getComputedStyle(e), n = t.overflowY === "scroll" || t.overflowY === "auto" && e.scrollHeight > e.clientHeight, a = t.overflowX === "scroll" || t.overflowX === "auto" && e.scrollWidth > e.clientWidth;
  return n || a;
}
function Ku(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const t = window.getComputedStyle(e);
  return ["scroll", "auto"].includes(t.overflowY);
}
function Xu(e) {
  for (; e; ) {
    if (window.getComputedStyle(e).position === "fixed")
      return !0;
    e = e.offsetParent;
  }
  return !1;
}
function ee(e) {
  const t = Ie("useRender");
  t.render = e;
}
function de(e, t, n) {
  let a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : (d) => d, l = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : (d) => d;
  const i = Ie("useProxiedModel"), o = Y(e[t] !== void 0 ? e[t] : n), r = Bt(t), c = r !== t ? x(() => {
    var d, f, v, m;
    return e[t], !!(((d = i.vnode.props) != null && d.hasOwnProperty(t) || (f = i.vnode.props) != null && f.hasOwnProperty(r)) && ((v = i.vnode.props) != null && v.hasOwnProperty(`onUpdate:${t}`) || (m = i.vnode.props) != null && m.hasOwnProperty(`onUpdate:${r}`)));
  }) : x(() => {
    var d, f;
    return e[t], !!((d = i.vnode.props) != null && d.hasOwnProperty(t) && ((f = i.vnode.props) != null && f.hasOwnProperty(`onUpdate:${t}`)));
  });
  Ke(() => !c.value, () => {
    X(() => e[t], (d) => {
      o.value = d;
    });
  });
  const u = x({
    get() {
      const d = e[t];
      return a(c.value ? d : o.value);
    },
    set(d) {
      const f = l(d), v = Ee(c.value ? e[t] : o.value);
      v === f || a(v) === d || (o.value = f, i == null || i.emit(`update:${t}`, f));
    }
  });
  return Object.defineProperty(u, "externalValue", {
    get: () => c.value ? e[t] : o.value
  }), u;
}
const qu = {
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
    },
    ariaLabel: {
      previousMonth: "Previous month",
      nextMonth: "Next month",
      selectYear: "Select year",
      selectDate: "{0}",
      // Full date format
      currentDate: "Today, {0}"
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
  fileUpload: {
    title: "Drag and drop files here",
    divider: "or",
    browse: "Browse Files"
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
  },
  rules: {
    required: "This field is required",
    email: "Please enter a valid email",
    number: "This field can only contain numbers",
    integer: "This field can only contain integer values",
    capital: "This field can only contain uppercase letters",
    maxLength: "You must enter a maximum of {0} characters",
    minLength: "You must enter a minimum of {0} characters",
    strictLength: "The length of the entered field is invalid",
    exclude: "The {0} character is not allowed",
    notEmpty: "Please choose at least one value",
    pattern: "Invalid format"
  },
  hotkey: {
    then: "then",
    ctrl: "Ctrl",
    command: "Command",
    space: "Space",
    shift: "Shift",
    alt: "Alt",
    enter: "Enter",
    escape: "Escape",
    upArrow: "Up Arrow",
    downArrow: "Down Arrow",
    leftArrow: "Left Arrow",
    rightArrow: "Right Arrow",
    backspace: "Backspace",
    option: "Option",
    plus: "plus",
    shortcut: "Keyboard shortcut: {0}"
  },
  video: {
    play: "Play",
    pause: "Pause",
    seek: "Seek",
    volume: "Volume",
    showVolume: "Show volume control",
    mute: "Mute",
    unmute: "Unmute",
    enterFullscreen: "Full screen",
    exitFullscreen: "Exit full screen"
  },
  colorPicker: {
    ariaLabel: {
      eyedropper: "Select color with eyedropper",
      hueSlider: "Hue",
      alphaSlider: "Alpha",
      redInput: "Red value",
      greenInput: "Green value",
      blueInput: "Blue value",
      alphaInput: "Alpha value",
      hueInput: "Hue value",
      saturationInput: "Saturation value",
      lightnessInput: "Lightness value",
      hexInput: "HEX value",
      hexaInput: "HEX with alpha value",
      changeFormat: "Change color format"
    }
  }
}, di = "$vuetify.", fi = (e, t) => e.replace(/\{(\d+)\}/g, (n, a) => String(t[Number(a)])), bo = (e, t, n) => function(a) {
  for (var l = arguments.length, i = new Array(l > 1 ? l - 1 : 0), o = 1; o < l; o++)
    i[o - 1] = arguments[o];
  if (!a.startsWith(di))
    return fi(a, i);
  const r = a.replace(di, ""), s = e.value && n.value[e.value], c = t.value && n.value[t.value];
  let u = Lt(s, r, null);
  return u || (tt(`Translation key "${a}" not found in "${e.value}", trying fallback locale`), u = Lt(c, r, null)), u || (fn(`Translation key "${a}" not found in fallback`), u = a), typeof u != "string" && (fn(`Translation key "${a}" has a non-string value`), u = a), fi(u, i);
};
function ml(e, t) {
  return (n, a) => new Intl.NumberFormat([e.value, t.value], a).format(n);
}
function So(e, t) {
  return ml(e, t)(0.1).includes(",") ? "," : ".";
}
function _a(e, t, n) {
  const a = de(e, t, e[t] ?? n.value);
  return a.value = e[t] ?? n.value, X(n, (l) => {
    e[t] == null && (a.value = n.value);
  }), a;
}
function wo(e) {
  return (t) => {
    const n = _a(t, "locale", e.current), a = _a(t, "fallback", e.fallback), l = _a(t, "messages", e.messages);
    return {
      name: "vuetify",
      current: n,
      fallback: a,
      messages: l,
      decimalSeparator: T(() => So(n, a)),
      t: bo(n, a, l),
      n: ml(n, a),
      provide: wo({
        current: n,
        fallback: a,
        messages: l
      })
    };
  };
}
function Zu(e) {
  const t = G((e == null ? void 0 : e.locale) ?? "en"), n = G((e == null ? void 0 : e.fallback) ?? "en"), a = Y({
    en: qu,
    ...e == null ? void 0 : e.messages
  });
  return {
    name: "vuetify",
    current: t,
    fallback: n,
    messages: a,
    decimalSeparator: T(() => (e == null ? void 0 : e.decimalSeparator) ?? So(t, n)),
    t: bo(t, n, a),
    n: ml(t, n),
    provide: wo({
      current: t,
      fallback: n,
      messages: a
    })
  };
}
const Kn = Symbol.for("vuetify:locale");
function Qu(e) {
  return e.name != null;
}
function Ju(e) {
  const t = e != null && e.adapter && Qu(e == null ? void 0 : e.adapter) ? e == null ? void 0 : e.adapter : Zu(e), n = tc(t, e);
  return {
    ...t,
    ...n
  };
}
function st() {
  const e = ye(Kn);
  if (!e) throw new Error("[Vuetify] Could not find injected locale instance");
  return e;
}
function ec() {
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
function tc(e, t) {
  const n = Y((t == null ? void 0 : t.rtl) ?? ec()), a = x(() => n.value[e.current.value] ?? !1);
  return {
    isRtl: a,
    rtl: n,
    rtlClasses: T(() => `v-locale--is-${a.value ? "rtl" : "ltr"}`)
  };
}
function Ze() {
  const e = ye(Kn);
  if (!e) throw new Error("[Vuetify] Could not find injected rtl instance");
  return {
    isRtl: e.isRtl,
    rtlClasses: e.rtlClasses
  };
}
function Vn(e) {
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
function nc(e, t, n) {
  var u;
  const a = [];
  let l = [];
  const i = xo(e), o = ko(e), r = n ?? ((u = Vn(t)) == null ? void 0 : u.firstDay) ?? 0, s = (i.getDay() - r + 7) % 7, c = (o.getDay() - r + 7) % 7;
  for (let d = 0; d < s; d++) {
    const f = new Date(i);
    f.setDate(f.getDate() - (s - d)), l.push(f);
  }
  for (let d = 1; d <= o.getDate(); d++) {
    const f = new Date(e.getFullYear(), e.getMonth(), d);
    l.push(f), l.length === 7 && (a.push(l), l = []);
  }
  for (let d = 1; d < 7 - c; d++) {
    const f = new Date(o);
    f.setDate(f.getDate() + d), l.push(f);
  }
  return l.length > 0 && a.push(l), a;
}
function Xn(e, t, n) {
  var i;
  let a = (n ?? ((i = Vn(t)) == null ? void 0 : i.firstDay) ?? 0) % 7;
  [0, 1, 2, 3, 4, 5, 6].includes(a) || (tt("Invalid firstDayOfWeek, expected discrete number in range [0-6]"), a = 0);
  const l = new Date(e);
  for (; l.getDay() !== a; )
    l.setDate(l.getDate() - 1);
  return l;
}
function ac(e, t) {
  var l;
  const n = new Date(e), a = ((((l = Vn(t)) == null ? void 0 : l.firstDay) ?? 0) + 6) % 7;
  for (; n.getDay() !== a; )
    n.setDate(n.getDate() + 1);
  return n;
}
function xo(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function ko(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function lc(e) {
  const t = e.split("-").map(Number);
  return new Date(t[0], t[1] - 1, t[2]);
}
const ic = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
function Co(e) {
  if (e == null) return /* @__PURE__ */ new Date();
  if (e instanceof Date) return e;
  if (typeof e == "string") {
    let t;
    if (ic.test(e))
      return lc(e);
    if (t = Date.parse(e), !isNaN(t)) return new Date(t);
  }
  return null;
}
const vi = new Date(2e3, 0, 2);
function oc(e, t, n) {
  var l;
  const a = t ?? ((l = Vn(e)) == null ? void 0 : l.firstDay) ?? 0;
  return Ut(7).map((i) => {
    const o = new Date(vi);
    return o.setDate(vi.getDate() + a + i), new Intl.DateTimeFormat(e, {
      weekday: n ?? "narrow"
    }).format(o);
  });
}
function rc(e, t, n, a) {
  const l = Co(e) ?? /* @__PURE__ */ new Date(), i = a == null ? void 0 : a[t];
  if (typeof i == "function")
    return i(l, t, n);
  let o = {};
  switch (t) {
    case "fullDate":
      o = {
        year: "numeric",
        month: "short",
        day: "numeric"
      };
      break;
    case "fullDateWithWeekday":
      o = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      break;
    case "normalDate":
      const r = l.getDate(), s = new Intl.DateTimeFormat(n, {
        month: "long"
      }).format(l);
      return `${r} ${s}`;
    case "normalDateWithWeekday":
      o = {
        weekday: "short",
        day: "numeric",
        month: "short"
      };
      break;
    case "shortDate":
      o = {
        month: "short",
        day: "numeric"
      };
      break;
    case "year":
      o = {
        year: "numeric"
      };
      break;
    case "month":
      o = {
        month: "long"
      };
      break;
    case "monthShort":
      o = {
        month: "short"
      };
      break;
    case "monthAndYear":
      o = {
        month: "long",
        year: "numeric"
      };
      break;
    case "monthAndDate":
      o = {
        month: "long",
        day: "numeric"
      };
      break;
    case "weekday":
      o = {
        weekday: "long"
      };
      break;
    case "weekdayShort":
      o = {
        weekday: "short"
      };
      break;
    case "dayOfMonth":
      return new Intl.NumberFormat(n).format(l.getDate());
    case "hours12h":
      o = {
        hour: "numeric",
        hour12: !0
      };
      break;
    case "hours24h":
      o = {
        hour: "numeric",
        hour12: !1
      };
      break;
    case "minutes":
      o = {
        minute: "numeric"
      };
      break;
    case "seconds":
      o = {
        second: "numeric"
      };
      break;
    case "fullTime":
      o = {
        hour: "numeric",
        minute: "numeric"
      };
      break;
    case "fullTime12h":
      o = {
        hour: "numeric",
        minute: "numeric",
        hour12: !0
      };
      break;
    case "fullTime24h":
      o = {
        hour: "numeric",
        minute: "numeric",
        hour12: !1
      };
      break;
    case "fullDateTime":
      o = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
      };
      break;
    case "fullDateTime12h":
      o = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: !0
      };
      break;
    case "fullDateTime24h":
      o = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: !1
      };
      break;
    case "keyboardDate":
      o = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      };
      break;
    case "keyboardDateTime":
      return o = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric"
      }, new Intl.DateTimeFormat(n, o).format(l).replace(/, /g, " ");
    case "keyboardDateTime12h":
      return o = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: !0
      }, new Intl.DateTimeFormat(n, o).format(l).replace(/, /g, " ");
    case "keyboardDateTime24h":
      return o = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: !1
      }, new Intl.DateTimeFormat(n, o).format(l).replace(/, /g, " ");
    default:
      o = i ?? {
        timeZone: "UTC",
        timeZoneName: "short"
      };
  }
  return new Intl.DateTimeFormat(n, o).format(l);
}
function sc(e, t) {
  const n = e.toJsDate(t), a = n.getFullYear(), l = Yl(String(n.getMonth() + 1), 2, "0"), i = Yl(String(n.getDate()), 2, "0");
  return `${a}-${l}-${i}`;
}
function uc(e) {
  const [t, n, a] = e.split("-").map(Number);
  return new Date(t, n - 1, a);
}
function cc(e, t) {
  const n = new Date(e);
  return n.setMinutes(n.getMinutes() + t), n;
}
function dc(e, t) {
  const n = new Date(e);
  return n.setHours(n.getHours() + t), n;
}
function Dt(e, t) {
  const n = new Date(e);
  return n.setDate(n.getDate() + t), n;
}
function fc(e, t) {
  const n = new Date(e);
  return n.setDate(n.getDate() + t * 7), n;
}
function vc(e, t) {
  const n = new Date(e);
  return n.setDate(1), n.setMonth(n.getMonth() + t), n;
}
function gn(e) {
  return e.getFullYear();
}
function mc(e) {
  return e.getMonth();
}
function gc(e, t, n, a) {
  const l = Vn(t), i = n ?? (l == null ? void 0 : l.firstDay) ?? 0, o = (l == null ? void 0 : l.firstWeekSize) ?? 1;
  return a !== void 0 ? hc(e, t, i, a) : yc(e, t, i, o);
}
function hc(e, t, n, a) {
  const l = (7 + a - n) % 7, i = Xn(e, t, n), o = Dt(i, 6);
  function r(f) {
    return (7 + new Date(f, 0, 1).getDay() - n) % 7;
  }
  let s = gn(e);
  s < gn(o) && r(s + 1) <= l && s++;
  const c = new Date(s, 0, 1), u = r(s), d = u <= l ? Dt(c, -u) : Dt(c, 7 - u);
  return 1 + Zn(gl(e), hn(d), "weeks");
}
function yc(e, t, n, a) {
  const l = Dt(Xn(e, t, n), 6);
  function i(u) {
    const d = new Date(u, 0, 1);
    return 7 - Zn(d, Xn(d, t, n), "days");
  }
  let o = gn(e);
  o < gn(l) && i(o + 1) >= a && o++;
  const r = new Date(o, 0, 1), s = i(o), c = s >= a ? Dt(r, s - 7) : Dt(r, s);
  return 1 + Zn(gl(e), hn(c), "weeks");
}
function bc(e) {
  return e.getDate();
}
function Sc(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 1);
}
function wc(e) {
  return new Date(e.getFullYear(), e.getMonth() - 1, 1);
}
function xc(e) {
  return e.getHours();
}
function kc(e) {
  return e.getMinutes();
}
function Cc(e) {
  return new Date(e.getFullYear(), 0, 1);
}
function pc(e) {
  return new Date(e.getFullYear(), 11, 31);
}
function Vc(e, t) {
  return qn(e, t[0]) && Ac(e, t[1]);
}
function Pc(e) {
  const t = new Date(e);
  return t instanceof Date && !isNaN(t.getTime());
}
function qn(e, t) {
  return e.getTime() > t.getTime();
}
function Ic(e, t) {
  return qn(hn(e), hn(t));
}
function Ac(e, t) {
  return e.getTime() < t.getTime();
}
function mi(e, t) {
  return e.getTime() === t.getTime();
}
function Tc(e, t) {
  return e.getDate() === t.getDate() && e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function Ec(e, t) {
  return e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function _c(e, t) {
  return e.getFullYear() === t.getFullYear();
}
function Zn(e, t, n) {
  const a = new Date(e), l = new Date(t);
  switch (n) {
    case "years":
      return a.getFullYear() - l.getFullYear();
    case "quarters":
      return Math.floor((a.getMonth() - l.getMonth() + (a.getFullYear() - l.getFullYear()) * 12) / 4);
    case "months":
      return a.getMonth() - l.getMonth() + (a.getFullYear() - l.getFullYear()) * 12;
    case "weeks":
      return Math.floor((a.getTime() - l.getTime()) / (1e3 * 60 * 60 * 24 * 7));
    case "days":
      return Math.floor((a.getTime() - l.getTime()) / (1e3 * 60 * 60 * 24));
    case "hours":
      return Math.floor((a.getTime() - l.getTime()) / (1e3 * 60 * 60));
    case "minutes":
      return Math.floor((a.getTime() - l.getTime()) / (1e3 * 60));
    case "seconds":
      return Math.floor((a.getTime() - l.getTime()) / 1e3);
    default:
      return a.getTime() - l.getTime();
  }
}
function Bc(e, t) {
  const n = new Date(e);
  return n.setHours(t), n;
}
function Dc(e, t) {
  const n = new Date(e);
  return n.setMinutes(t), n;
}
function Fc(e, t) {
  const n = new Date(e);
  return n.setMonth(t), n;
}
function Oc(e, t) {
  const n = new Date(e);
  return n.setDate(t), n;
}
function Lc(e, t) {
  const n = new Date(e);
  return n.setFullYear(t), n;
}
function hn(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate(), 0, 0, 0, 0);
}
function gl(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate(), 23, 59, 59, 999);
}
class $c {
  constructor(t) {
    this.locale = t.locale, this.formats = t.formats;
  }
  date(t) {
    return Co(t);
  }
  toJsDate(t) {
    return t;
  }
  toISO(t) {
    return sc(this, t);
  }
  parseISO(t) {
    return uc(t);
  }
  addMinutes(t, n) {
    return cc(t, n);
  }
  addHours(t, n) {
    return dc(t, n);
  }
  addDays(t, n) {
    return Dt(t, n);
  }
  addWeeks(t, n) {
    return fc(t, n);
  }
  addMonths(t, n) {
    return vc(t, n);
  }
  getWeekArray(t, n) {
    const a = n !== void 0 ? Number(n) : void 0;
    return nc(t, this.locale, a);
  }
  startOfWeek(t, n) {
    const a = n !== void 0 ? Number(n) : void 0;
    return Xn(t, this.locale, a);
  }
  endOfWeek(t) {
    return ac(t, this.locale);
  }
  startOfMonth(t) {
    return xo(t);
  }
  endOfMonth(t) {
    return ko(t);
  }
  format(t, n) {
    return rc(t, n, this.locale, this.formats);
  }
  isEqual(t, n) {
    return mi(t, n);
  }
  isValid(t) {
    return Pc(t);
  }
  isWithinRange(t, n) {
    return Vc(t, n);
  }
  isAfter(t, n) {
    return qn(t, n);
  }
  isAfterDay(t, n) {
    return Ic(t, n);
  }
  isBefore(t, n) {
    return !qn(t, n) && !mi(t, n);
  }
  isSameDay(t, n) {
    return Tc(t, n);
  }
  isSameMonth(t, n) {
    return Ec(t, n);
  }
  isSameYear(t, n) {
    return _c(t, n);
  }
  setMinutes(t, n) {
    return Dc(t, n);
  }
  setHours(t, n) {
    return Bc(t, n);
  }
  setMonth(t, n) {
    return Fc(t, n);
  }
  setDate(t, n) {
    return Oc(t, n);
  }
  setYear(t, n) {
    return Lc(t, n);
  }
  getDiff(t, n, a) {
    return Zn(t, n, a);
  }
  getWeekdays(t, n) {
    const a = t !== void 0 ? Number(t) : void 0;
    return oc(this.locale, a, n);
  }
  getYear(t) {
    return gn(t);
  }
  getMonth(t) {
    return mc(t);
  }
  getWeek(t, n, a) {
    const l = n !== void 0 ? Number(n) : void 0, i = a !== void 0 ? Number(a) : void 0;
    return gc(t, this.locale, l, i);
  }
  getDate(t) {
    return bc(t);
  }
  getNextMonth(t) {
    return Sc(t);
  }
  getPreviousMonth(t) {
    return wc(t);
  }
  getHours(t) {
    return xc(t);
  }
  getMinutes(t) {
    return kc(t);
  }
  startOfDay(t) {
    return hn(t);
  }
  endOfDay(t) {
    return gl(t);
  }
  startOfYear(t) {
    return Cc(t);
  }
  endOfYear(t) {
    return pc(t);
  }
}
const Mc = Symbol.for("vuetify:date-options"), gi = Symbol.for("vuetify:date-adapter");
function Rc(e, t) {
  const n = He({
    adapter: $c,
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
    instance: Nc(n, t)
  };
}
function Nc(e, t) {
  const n = Ye(typeof e.adapter == "function" ? new e.adapter({
    locale: e.locale[t.current.value] ?? t.current.value,
    formats: e.formats
  }) : e.adapter);
  return X(t.current, (a) => {
    n.locale = e.locale[a] ?? a ?? n.locale;
  }), n;
}
const ma = ["sm", "md", "lg", "xl", "xxl"], Ya = Symbol.for("vuetify:display"), hi = {
  mobileBreakpoint: "lg",
  thresholds: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
    xxl: 2560
  }
}, Hc = function() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : hi;
  return He(hi, e);
};
function yi(e) {
  return he && !e ? window.innerWidth : typeof e == "object" && e.clientWidth || 0;
}
function bi(e) {
  return he && !e ? window.innerHeight : typeof e == "object" && e.clientHeight || 0;
}
function Si(e) {
  const t = he && !e ? window.navigator.userAgent : "ssr";
  function n(m) {
    return !!t.match(m);
  }
  const a = n(/android/i), l = n(/iphone|ipad|ipod/i), i = n(/cordova/i), o = n(/electron/i), r = n(/chrome/i), s = n(/edge/i), c = n(/firefox/i), u = n(/opera/i), d = n(/win/i), f = n(/mac/i), v = n(/linux/i);
  return {
    android: a,
    ios: l,
    cordova: i,
    electron: o,
    chrome: r,
    edge: s,
    firefox: c,
    opera: u,
    win: d,
    mac: f,
    linux: v,
    touch: ru,
    ssr: t === "ssr"
  };
}
function zc(e, t) {
  const {
    thresholds: n,
    mobileBreakpoint: a
  } = Hc(e), l = G(bi(t)), i = G(Si(t)), o = Ye({}), r = G(yi(t));
  function s() {
    l.value = bi(), r.value = yi();
  }
  function c() {
    s(), i.value = Si();
  }
  return _e(() => {
    const u = r.value < n.sm, d = r.value < n.md && !u, f = r.value < n.lg && !(d || u), v = r.value < n.xl && !(f || d || u), m = r.value < n.xxl && !(v || f || d || u), g = r.value >= n.xxl, y = u ? "xs" : d ? "sm" : f ? "md" : v ? "lg" : m ? "xl" : "xxl", h = typeof a == "number" ? a : n[a], b = r.value < h;
    o.xs = u, o.sm = d, o.md = f, o.lg = v, o.xl = m, o.xxl = g, o.smAndUp = !u, o.mdAndUp = !(u || d), o.lgAndUp = !(u || d || f), o.xlAndUp = !(u || d || f || v), o.smAndDown = !(f || v || m || g), o.mdAndDown = !(v || m || g), o.lgAndDown = !(m || g), o.xlAndDown = !g, o.name = y, o.height = l.value, o.width = r.value, o.mobile = b, o.mobileBreakpoint = a, o.platform = i.value, o.thresholds = n;
  }), he && (window.addEventListener("resize", s, {
    passive: !0
  }), Be(() => {
    window.removeEventListener("resize", s);
  }, !0)), {
    ...sa(o),
    update: c,
    ssr: !!t
  };
}
const Pn = O({
  mobile: {
    type: Boolean,
    default: !1
  },
  mobileBreakpoint: [Number, String]
}, "display");
function Tt() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
    mobile: null
  }, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : yt();
  const n = ye(Ya);
  if (!n) throw new Error("Could not find Vuetify display injection");
  const a = x(() => e.mobile ? !0 : typeof e.mobileBreakpoint == "number" ? n.width.value < e.mobileBreakpoint : e.mobileBreakpoint ? n.width.value < n.thresholds.value[e.mobileBreakpoint] : e.mobile === null ? n.mobile.value : !1), l = T(() => t ? {
    [`${t}--mobile`]: a.value
  } : {});
  return {
    ...n,
    displayClasses: l,
    mobile: a
  };
}
const po = Symbol.for("vuetify:goto");
function Vo() {
  return {
    container: void 0,
    duration: 300,
    layout: !1,
    offset: 0,
    easing: "easeInOutCubic",
    patterns: Yu
  };
}
function Wc(e) {
  return hl(e) ?? (document.scrollingElement || document.body);
}
function hl(e) {
  return typeof e == "string" ? document.querySelector(e) : ol(e);
}
function Ba(e, t, n) {
  if (typeof e == "number") return t && n ? -e : e;
  let a = hl(e), l = 0;
  for (; a; )
    l += t ? a.offsetLeft : a.offsetTop, a = a.offsetParent;
  return l;
}
function jc(e, t) {
  return {
    rtl: t.isRtl,
    options: He(Vo(), e)
  };
}
async function wi(e, t, n, a) {
  const l = n ? "scrollLeft" : "scrollTop", i = He((a == null ? void 0 : a.options) ?? Vo(), t), o = a == null ? void 0 : a.rtl.value, r = (typeof e == "number" ? e : hl(e)) ?? 0, s = i.container === "parent" && r instanceof HTMLElement ? r.parentElement : Wc(i.container), c = Ot() ? i.patterns.instant : typeof i.easing == "function" ? i.easing : i.patterns[i.easing];
  if (!c) throw new TypeError(`Easing function "${i.easing}" not found.`);
  let u;
  if (typeof r == "number")
    u = Ba(r, n, o);
  else if (u = Ba(r, n, o) - Ba(s, n, o), i.layout) {
    const m = window.getComputedStyle(r).getPropertyValue("--v-layout-top");
    m && (u -= parseInt(m, 10));
  }
  u += i.offset, u = Uc(s, u, !!o, !!n);
  const d = s[l] ?? 0;
  if (u === d) return Promise.resolve(u);
  const f = performance.now();
  return new Promise((v) => requestAnimationFrame(function m(g) {
    const h = (g - f) / i.duration, b = Math.floor(d + (u - d) * c(Fe(h, 0, 1)));
    if (s[l] = b, h >= 1 && Math.abs(b - s[l]) < 10)
      return v(u);
    if (h > 2)
      return tt("Scroll target is not reachable"), v(s[l]);
    requestAnimationFrame(m);
  }));
}
function Gc() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const t = ye(po), {
    isRtl: n
  } = Ze();
  if (!t) throw new Error("[Vuetify] Could not find injected goto instance");
  const a = {
    ...t,
    // can be set via VLocaleProvider
    rtl: T(() => t.rtl.value || n.value)
  };
  async function l(i, o) {
    return wi(i, He(e, o), !1, a);
  }
  return l.horizontal = async (i, o) => wi(i, He(e, o), !0, a), l;
}
function Uc(e, t, n, a) {
  const {
    scrollWidth: l,
    scrollHeight: i
  } = e, [o, r] = e === document.scrollingElement ? [window.innerWidth, window.innerHeight] : [e.offsetWidth, e.offsetHeight];
  let s, c;
  return a ? n ? (s = -(l - o), c = 0) : (s = 0, c = l - o) : (s = 0, c = i + -r), Fe(t, s, c);
}
const Yc = {
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
  tableGroupCollapse: "mdi-chevron-down",
  tableGroupExpand: "mdi-chevron-right",
  eyeDropper: "mdi-eyedropper",
  upload: "mdi-cloud-upload",
  color: "mdi-palette",
  command: "mdi-apple-keyboard-command",
  ctrl: "mdi-apple-keyboard-control",
  space: "mdi-keyboard-space",
  shift: "mdi-apple-keyboard-shift",
  alt: "mdi-apple-keyboard-option",
  enter: "mdi-keyboard-return",
  arrowup: "mdi-arrow-up",
  arrowdown: "mdi-arrow-down",
  arrowleft: "mdi-arrow-left",
  arrowright: "mdi-arrow-right",
  backspace: "mdi-backspace",
  play: "mdi-play",
  pause: "mdi-pause",
  fullscreen: "mdi-fullscreen",
  fullscreenExit: "mdi-fullscreen-exit",
  volumeHigh: "mdi-volume-high",
  volumeMedium: "mdi-volume-medium",
  volumeLow: "mdi-volume-low",
  volumeOff: "mdi-volume-variant-off"
}, Po = {
  // Not using mergeProps here, functional components merge props by default (?)
  component: (e) => Mt(Ao, {
    ...e,
    class: "mdi"
  })
}, se = [String, Function, Object, Array], Ka = Symbol.for("vuetify:icons"), ga = O({
  icon: {
    type: se
  },
  // Could not remove this and use makeTagProps, types complained because it is not required
  tag: {
    type: [String, Object, Function],
    required: !0
  }
}, "icon"), xi = U()({
  name: "VComponentIcon",
  props: ga(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return () => {
      const a = e.icon;
      return w(e.tag, null, {
        default: () => {
          var l;
          return [e.icon ? w(a, null, null) : (l = n.default) == null ? void 0 : l.call(n)];
        }
      });
    };
  }
}), Io = an({
  name: "VSvgIcon",
  inheritAttrs: !1,
  props: ga(),
  setup(e, t) {
    let {
      attrs: n
    } = t;
    return () => w(e.tag, j(n, {
      style: null
    }), {
      default: () => [C("svg", {
        class: "v-icon__svg",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-hidden": "true"
      }, [Array.isArray(e.icon) ? e.icon.map((a) => Array.isArray(a) ? C("path", {
        d: a[0],
        "fill-opacity": a[1]
      }, null) : C("path", {
        d: a
      }, null)) : C("path", {
        d: e.icon
      }, null)])]
    });
  }
});
an({
  name: "VLigatureIcon",
  props: ga(),
  setup(e) {
    return () => w(e.tag, null, {
      default: () => [e.icon]
    });
  }
});
const Ao = an({
  name: "VClassIcon",
  props: ga(),
  setup(e) {
    return () => w(e.tag, {
      class: q(e.icon)
    }, null);
  }
});
function Kc() {
  return {
    svg: {
      component: Io
    },
    class: {
      component: Ao
    }
  };
}
function Xc(e) {
  const t = Kc(), n = (e == null ? void 0 : e.defaultSet) ?? "mdi";
  return n === "mdi" && !t.mdi && (t.mdi = Po), He({
    defaultSet: n,
    sets: t,
    aliases: {
      ...Yc,
      /* eslint-disable max-len */
      vuetify: ["M8.2241 14.2009L12 21L22 3H14.4459L8.2241 14.2009Z", ["M7.26303 12.4733L7.00113 12L2 3H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26303 12.4733Z", 0.6]],
      "vuetify-outline": "svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z",
      "vuetify-play": ["m6.376 13.184-4.11-7.192C1.505 4.66 2.467 3 4.003 3h8.532l-.953 1.576-.006.01-.396.677c-.429.732-.214 1.507.194 2.015.404.503 1.092.878 1.869.806a3.72 3.72 0 0 1 1.005.022c.276.053.434.143.523.237.138.146.38.635-.25 2.09-.893 1.63-1.553 1.722-1.847 1.677-.213-.033-.468-.158-.756-.406a4.95 4.95 0 0 1-.8-.927c-.39-.564-1.04-.84-1.66-.846-.625-.006-1.316.27-1.693.921l-.478.826-.911 1.506Z", ["M9.093 11.552c.046-.079.144-.15.32-.148a.53.53 0 0 1 .43.207c.285.414.636.847 1.046 1.2.405.35.914.662 1.516.754 1.334.205 2.502-.698 3.48-2.495l.014-.028.013-.03c.687-1.574.774-2.852-.005-3.675-.37-.391-.861-.586-1.333-.676a5.243 5.243 0 0 0-1.447-.044c-.173.016-.393-.073-.54-.257-.145-.18-.127-.316-.082-.392l.393-.672L14.287 3h5.71c1.536 0 2.499 1.659 1.737 2.992l-7.997 13.996c-.768 1.344-2.706 1.344-3.473 0l-3.037-5.314 1.377-2.278.004-.006.004-.007.481-.831Z", 0.6]]
      /* eslint-enable max-len */
    }
  }, e);
}
const qc = (e) => {
  const t = ye(Ka);
  if (!t) throw new Error("Missing Vuetify Icons provide!");
  return {
    iconData: x(() => {
      var s;
      const a = je(e);
      if (!a) return {
        component: xi
      };
      let l = a;
      if (typeof l == "string" && (l = l.trim(), l.startsWith("$") && (l = (s = t.aliases) == null ? void 0 : s[l.slice(1)])), l || tt(`Could not find aliased icon "${a}"`), Array.isArray(l))
        return {
          component: Io,
          icon: l
        };
      if (typeof l != "string")
        return {
          component: xi,
          icon: l
        };
      const i = Object.keys(t.sets).find((c) => typeof l == "string" && l.startsWith(`${c}:`)), o = i ? l.slice(i.length + 1) : l;
      return {
        component: t.sets[i ?? t.defaultSet].component,
        icon: o
      };
    })
  };
}, yn = Symbol.for("vuetify:theme"), xe = O({
  theme: String
}, "theme");
function ki() {
  return {
    defaultTheme: "light",
    prefix: "v-",
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
          "theme-kbd": "#EEEEEE",
          "theme-on-kbd": "#000000",
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
          "surface-variant": "#c8c8c8",
          "on-surface-variant": "#000000",
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
          "theme-kbd": "#424242",
          "theme-on-kbd": "#FFFFFF",
          "theme-code": "#343434",
          "theme-on-code": "#CCCCCC"
        }
      }
    },
    stylesheetId: "vuetify-theme-stylesheet",
    scoped: !1,
    unimportant: !1,
    utilities: !0
  };
}
function Zc() {
  var a, l;
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ki();
  const t = ki();
  if (!e) return {
    ...t,
    isDisabled: !0
  };
  const n = {};
  for (const [i, o] of Object.entries(e.themes ?? {})) {
    const r = o.dark || i === "dark" ? (a = t.themes) == null ? void 0 : a.dark : (l = t.themes) == null ? void 0 : l.light;
    n[i] = He(r, o);
  }
  return He(t, {
    ...e,
    themes: n
  });
}
function _t(e, t, n, a) {
  e.push(`${td(t, a)} {
`, ...n.map((l) => `  ${l};
`), `}
`);
}
function Ci(e, t) {
  const n = e.dark ? 2 : 1, a = e.dark ? 1 : 2, l = [];
  for (const [i, o] of Object.entries(e.colors)) {
    const r = ht(o);
    l.push(`--${t}theme-${i}: ${r.r},${r.g},${r.b}`), i.startsWith("on-") || l.push(`--${t}theme-${i}-overlay-multiplier: ${Hu(o) > 0.18 ? n : a}`);
  }
  for (const [i, o] of Object.entries(e.variables)) {
    const r = typeof o == "string" && o.startsWith("#") ? ht(o) : void 0, s = r ? `${r.r}, ${r.g}, ${r.b}` : void 0;
    l.push(`--${t}${i}: ${s ?? o}`);
  }
  return l;
}
function Qc(e, t, n) {
  const a = {};
  if (n)
    for (const l of ["lighten", "darken"]) {
      const i = l === "lighten" ? Ru : Nu;
      for (const o of Ut(n[l], 1))
        a[`${e}-${l}-${o}`] = Lu(i(ht(t), o));
    }
  return a;
}
function Jc(e, t) {
  if (!t) return {};
  let n = {};
  for (const a of t.colors) {
    const l = e[a];
    l && (n = {
      ...n,
      ...Qc(a, l, t)
    });
  }
  return n;
}
function ed(e) {
  const t = {};
  for (const n of Object.keys(e)) {
    if (n.startsWith("on-") || e[`on-${n}`]) continue;
    const a = `on-${n}`, l = ht(e[n]);
    t[a] = go(l);
  }
  return t;
}
function td(e, t) {
  if (!t) return e;
  const n = `:where(${t})`;
  return e === ":root" ? n : `${n} ${e}`;
}
function nd(e, t, n) {
  const a = ad(e, t);
  a && (a.innerHTML = n);
}
function ad(e, t) {
  if (!he) return null;
  let n = document.getElementById(e);
  return n || (n = document.createElement("style"), n.id = e, n.type = "text/css", t && n.setAttribute("nonce", t), document.head.appendChild(n)), n;
}
function ld(e) {
  const t = Zc(e), n = G(t.defaultTheme), a = Y(t.themes), l = G("light"), i = x({
    get() {
      return n.value === "system" ? l.value : n.value;
    },
    set(h) {
      n.value = h;
    }
  }), o = x(() => {
    const h = {};
    for (const [b, k] of Object.entries(a.value)) {
      const p = {
        ...k.colors,
        ...Jc(k.colors, t.variations)
      };
      h[b] = {
        ...k,
        colors: {
          ...p,
          ...ed(p)
        }
      };
    }
    return h;
  }), r = T(() => o.value[i.value]), s = T(() => n.value === "system"), c = x(() => {
    var p;
    const h = [], b = t.unimportant ? "" : " !important", k = t.scoped ? t.prefix : "";
    (p = r.value) != null && p.dark && _t(h, ":root", ["color-scheme: dark"], t.scope), _t(h, ":root", Ci(r.value, t.prefix), t.scope);
    for (const [V, I] of Object.entries(o.value))
      _t(h, `.${t.prefix}theme--${V}`, [`color-scheme: ${I.dark ? "dark" : "normal"}`, ...Ci(I, t.prefix)], t.scope);
    if (t.utilities) {
      const V = [], I = [], A = new Set(Object.values(o.value).flatMap((S) => Object.keys(S.colors)));
      for (const S of A)
        S.startsWith("on-") ? _t(I, `.${S}`, [`color: rgb(var(--${t.prefix}theme-${S}))${b}`], t.scope) : (_t(V, `.${k}bg-${S}`, [`--${t.prefix}theme-overlay-multiplier: var(--${t.prefix}theme-${S}-overlay-multiplier)`, `background-color: rgb(var(--${t.prefix}theme-${S}))${b}`, `color: rgb(var(--${t.prefix}theme-on-${S}))${b}`], t.scope), _t(I, `.${k}text-${S}`, [`color: rgb(var(--${t.prefix}theme-${S}))${b}`], t.scope), _t(I, `.${k}border-${S}`, [`--${t.prefix}border-color: var(--${t.prefix}theme-${S})`], t.scope));
      h.push(...V, ...I);
    }
    return h.map((V, I) => I === 0 ? V : `    ${V}`).join("");
  }), u = T(() => t.isDisabled ? void 0 : `${t.prefix}theme--${i.value}`), d = T(() => Object.keys(o.value));
  if (Qi) {
    let b = function() {
      l.value = h.matches ? "dark" : "light";
    };
    const h = window.matchMedia("(prefers-color-scheme: dark)");
    b(), h.addEventListener("change", b, {
      passive: !0
    }), Zs() && Be(() => {
      h.removeEventListener("change", b);
    });
  }
  function f(h) {
    if (t.isDisabled) return;
    const b = h._context.provides.usehead;
    if (b) {
      let k = function() {
        return {
          style: [{
            textContent: c.value,
            id: t.stylesheetId,
            nonce: t.cspNonce || !1
          }]
        };
      };
      if (b.push) {
        const p = b.push(k);
        he && X(c, () => {
          p.patch(k);
        });
      } else
        he ? (b.addHeadObjs(T(k)), _e(() => b.updateDOM())) : b.addHeadObjs(k());
    } else {
      let k = function() {
        nd(t.stylesheetId, t.cspNonce, c.value);
      };
      he ? X(c, k, {
        immediate: !0
      }) : k();
    }
  }
  function v(h) {
    if (h !== "system" && !d.value.includes(h)) {
      tt(`Theme "${h}" not found on the Vuetify theme instance`);
      return;
    }
    i.value = h;
  }
  function m() {
    let h = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : d.value;
    const b = h.indexOf(i.value), k = b === -1 ? 0 : (b + 1) % h.length;
    v(h[k]);
  }
  function g() {
    let h = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ["light", "dark"];
    m(h);
  }
  const y = new Proxy(i, {
    get(h, b) {
      return Reflect.get(h, b);
    },
    set(h, b, k) {
      return b === "value" && uo(`theme.global.name.value = ${k}`, `theme.change('${k}')`), Reflect.set(h, b, k);
    }
  });
  return {
    install: f,
    change: v,
    cycle: m,
    toggle: g,
    isDisabled: t.isDisabled,
    isSystem: s,
    name: i,
    themes: a,
    current: r,
    computedThemes: o,
    prefix: t.prefix,
    themeClasses: u,
    styles: c,
    global: {
      name: y,
      current: r
    }
  };
}
function Ae(e) {
  Ie("provideTheme");
  const t = ye(yn, null);
  if (!t) throw new Error("Could not find Vuetify theme injection");
  const n = T(() => e.theme ?? t.name.value), a = T(() => t.themes.value[n.value]), l = T(() => t.isDisabled ? void 0 : `${t.prefix}theme--${n.value}`), i = {
    ...t,
    name: n,
    current: a,
    themeClasses: l
  };
  return Pe(yn, i), i;
}
function id() {
  Ie("useTheme");
  const e = ye(yn, null);
  if (!e) throw new Error("Could not find Vuetify theme injection");
  return e;
}
function It(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "content";
  const n = za(), a = Y();
  if (he) {
    const l = new ResizeObserver((i) => {
      e == null || e(i, l), i.length && (t === "content" ? a.value = i[0].contentRect : a.value = i[0].target.getBoundingClientRect());
    });
    Ge(() => {
      l.disconnect();
    }), X(() => n.el, (i, o) => {
      o && (l.unobserve(o), a.value = void 0), i && l.observe(i);
    }, {
      flush: "post"
    });
  }
  return {
    resizeRef: n,
    contentRect: ua(a)
  };
}
const bn = Symbol.for("vuetify:layout"), To = Symbol.for("vuetify:layout-item"), pi = 1e3, od = O({
  overlaps: {
    type: Array,
    default: () => []
  },
  fullHeight: Boolean
}, "layout"), Eo = O({
  name: {
    type: String
  },
  order: {
    type: [Number, String],
    default: 0
  },
  absolute: Boolean
}, "layout-item");
function _o() {
  const e = ye(bn);
  if (!e) throw new Error("[Vuetify] Could not find injected layout");
  return {
    getLayoutItem: e.getLayoutItem,
    mainRect: e.mainRect,
    mainStyles: e.mainStyles
  };
}
function Bo(e) {
  const t = ye(bn);
  if (!t) throw new Error("[Vuetify] Could not find injected layout");
  const n = e.id ?? `layout-item-${ft()}`, a = Ie("useLayoutItem");
  Pe(To, {
    id: n
  });
  const l = G(!1);
  Zi(() => l.value = !0), Qs(() => l.value = !1);
  const {
    layoutItemStyles: i,
    layoutItemScrimStyles: o
  } = t.register(a, {
    ...e,
    active: x(() => l.value ? !1 : e.active.value),
    id: n
  });
  return Ge(() => t.unregister(n)), {
    layoutItemStyles: i,
    layoutRect: t.layoutRect,
    layoutItemScrimStyles: o
  };
}
const rd = (e, t, n, a) => {
  let l = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };
  const i = [{
    id: "",
    layer: {
      ...l
    }
  }];
  for (const o of e) {
    const r = t.get(o), s = n.get(o), c = a.get(o);
    if (!r || !s || !c) continue;
    const u = {
      ...l,
      [r.value]: parseInt(l[r.value], 10) + (c.value ? parseInt(s.value, 10) : 0)
    };
    i.push({
      id: o,
      layer: u
    }), l = u;
  }
  return i;
};
function sd(e) {
  const t = ye(bn, null), n = x(() => t ? t.rootZIndex.value - 100 : pi), a = Y([]), l = Ye(/* @__PURE__ */ new Map()), i = Ye(/* @__PURE__ */ new Map()), o = Ye(/* @__PURE__ */ new Map()), r = Ye(/* @__PURE__ */ new Map()), s = Ye(/* @__PURE__ */ new Map()), {
    resizeRef: c,
    contentRect: u
  } = It(), d = x(() => {
    const I = /* @__PURE__ */ new Map(), A = e.overlaps ?? [];
    for (const S of A.filter((E) => E.includes(":"))) {
      const [E, P] = S.split(":");
      if (!a.value.includes(E) || !a.value.includes(P)) continue;
      const _ = l.get(E), D = l.get(P), F = i.get(E), L = i.get(P);
      !_ || !D || !F || !L || (I.set(P, {
        position: _.value,
        amount: parseInt(F.value, 10)
      }), I.set(E, {
        position: D.value,
        amount: -parseInt(L.value, 10)
      }));
    }
    return I;
  }), f = x(() => {
    const I = [...new Set([...o.values()].map((S) => S.value))].sort((S, E) => S - E), A = [];
    for (const S of I) {
      const E = a.value.filter((P) => {
        var _;
        return ((_ = o.get(P)) == null ? void 0 : _.value) === S;
      });
      A.push(...E);
    }
    return rd(A, l, i, r);
  }), v = x(() => !Array.from(s.values()).some((I) => I.value)), m = x(() => f.value[f.value.length - 1].layer), g = T(() => ({
    "--v-layout-left": J(m.value.left),
    "--v-layout-right": J(m.value.right),
    "--v-layout-top": J(m.value.top),
    "--v-layout-bottom": J(m.value.bottom),
    ...v.value ? void 0 : {
      transition: "none"
    }
  })), y = x(() => f.value.slice(1).map((I, A) => {
    let {
      id: S
    } = I;
    const {
      layer: E
    } = f.value[A], P = i.get(S), _ = l.get(S);
    return {
      id: S,
      ...E,
      size: Number(P.value),
      position: _.value
    };
  })), h = (I) => y.value.find((A) => A.id === I), b = Ie("createLayout"), k = G(!1);
  rt(() => {
    k.value = !0;
  }), Pe(bn, {
    register: (I, A) => {
      let {
        id: S,
        order: E,
        position: P,
        layoutSize: _,
        elementSize: D,
        active: F,
        disableTransitions: L,
        absolute: R
      } = A;
      o.set(S, E), l.set(S, P), i.set(S, _), r.set(S, F), L && s.set(S, L);
      const K = Yt(To, b == null ? void 0 : b.vnode).indexOf(I);
      K > -1 ? a.value.splice(K, 0, S) : a.value.push(S);
      const te = x(() => y.value.findIndex((M) => M.id === S)), le = x(() => n.value + f.value.length * 2 - te.value * 2), $ = x(() => {
        const M = P.value === "left" || P.value === "right", B = P.value === "right", H = P.value === "bottom", ie = D.value ?? _.value, ue = ie === 0 ? "%" : "px", N = {
          [P.value]: 0,
          zIndex: le.value,
          transform: `translate${M ? "X" : "Y"}(${(F.value ? 0 : -(ie === 0 ? 100 : ie)) * (B || H ? -1 : 1)}${ue})`,
          position: R.value || n.value !== pi ? "absolute" : "fixed",
          ...v.value ? void 0 : {
            transition: "none"
          }
        };
        if (!k.value) return N;
        const Z = y.value[te.value];
        Z || tt(`[Vuetify] Could not find layout item "${S}"`);
        const ve = d.value.get(S);
        return ve && (Z[ve.position] += ve.amount), {
          ...N,
          height: M ? `calc(100% - ${Z.top}px - ${Z.bottom}px)` : D.value ? `${D.value}px` : void 0,
          left: B ? void 0 : `${Z.left}px`,
          right: B ? `${Z.right}px` : void 0,
          top: P.value !== "bottom" ? `${Z.top}px` : void 0,
          bottom: P.value !== "top" ? `${Z.bottom}px` : void 0,
          width: M ? D.value ? `${D.value}px` : void 0 : `calc(100% - ${Z.left}px - ${Z.right}px)`
        };
      }), Q = x(() => ({
        zIndex: le.value - 1
      }));
      return {
        layoutItemStyles: $,
        layoutItemScrimStyles: Q,
        zIndex: le
      };
    },
    unregister: (I) => {
      o.delete(I), l.delete(I), i.delete(I), r.delete(I), s.delete(I), a.value = a.value.filter((A) => A !== I);
    },
    mainRect: m,
    mainStyles: g,
    getLayoutItem: h,
    items: y,
    layoutRect: u,
    rootZIndex: n
  });
  const p = T(() => ["v-layout", {
    "v-layout--full-height": e.fullHeight
  }]), V = T(() => ({
    zIndex: t ? n.value : void 0,
    position: t ? "relative" : void 0,
    overflow: t ? "hidden" : void 0
  }));
  return {
    layoutClasses: p,
    layoutStyles: V,
    getLayoutItem: h,
    items: y,
    layoutRect: u,
    layoutRef: c
  };
}
function ud() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    blueprint: t,
    ...n
  } = e, a = He(t, n), {
    aliases: l = {},
    components: i = {},
    directives: o = {}
  } = a, r = dn();
  return r.run(() => {
    const s = Wu(a.defaults), c = zc(a.display, a.ssr), u = ld(a.theme), d = Xc(a.icons), f = Ju(a.locale), v = Rc(a.date, f), m = jc(a.goTo, f);
    function g(h) {
      for (const k in o)
        h.directive(k, o[k]);
      for (const k in i)
        h.component(k, i[k]);
      for (const k in l)
        h.component(k, an({
          ...l[k],
          name: k,
          aliasName: l[k].name
        }));
      const b = dn();
      if (b.run(() => {
        u.install(h);
      }), h.onUnmount(() => b.stop()), h.provide(Zt, s), h.provide(Ya, c), h.provide(yn, u), h.provide(Ka, d), h.provide(Kn, f), h.provide(Mc, v.options), h.provide(gi, v.instance), h.provide(po, m), he && a.ssr)
        if (h.$nuxt)
          h.$nuxt.hook("app:suspense:resolve", () => {
            c.update();
          });
        else {
          const {
            mount: k
          } = h;
          h.mount = function() {
            const p = k(...arguments);
            return Se(() => c.update()), h.mount = k, p;
          };
        }
      h.mixin({
        computed: {
          $vuetify() {
            return Ye({
              defaults: jt.call(this, Zt),
              display: jt.call(this, Ya),
              theme: jt.call(this, yn),
              icons: jt.call(this, Ka),
              locale: jt.call(this, Kn),
              date: jt.call(this, gi)
            });
          }
        }
      });
    }
    function y() {
      r.stop();
    }
    return {
      install: g,
      unmount: y,
      defaults: s,
      display: c,
      theme: u,
      icons: d,
      locale: f,
      date: v,
      goTo: m
    };
  });
}
const cd = "3.10.5";
ud.version = cd;
function jt(e) {
  var a, l;
  const t = this.$, n = ((a = t.parent) == null ? void 0 : a.provides) ?? ((l = t.vnode.appContext) == null ? void 0 : l.provides);
  if (n && e in n)
    return n[e];
}
const Ym = {
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
      mdi: Po
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
}, dd = {
  lighten4: "#c8e6c9",
  darken1: "#43a047"
}, Km = {
  green: dd
}, fd = O({
  disabled: Boolean,
  group: Boolean,
  hideOnLeave: Boolean,
  leaveAbsolute: Boolean,
  mode: String,
  origin: String
}, "transition");
function at(e, t, n) {
  return U()({
    name: e,
    props: fd({
      mode: n,
      origin: t
    }),
    setup(a, l) {
      let {
        slots: i
      } = l;
      const o = {
        onBeforeEnter(r) {
          a.origin && (r.style.transformOrigin = a.origin);
        },
        onLeave(r) {
          if (a.leaveAbsolute) {
            const {
              offsetTop: s,
              offsetLeft: c,
              offsetWidth: u,
              offsetHeight: d
            } = r;
            r._transitionInitialStyles = {
              position: r.style.position,
              top: r.style.top,
              left: r.style.left,
              width: r.style.width,
              height: r.style.height
            }, r.style.position = "absolute", r.style.top = `${s}px`, r.style.left = `${c}px`, r.style.width = `${u}px`, r.style.height = `${d}px`;
          }
          a.hideOnLeave && r.style.setProperty("display", "none", "important");
        },
        onAfterLeave(r) {
          if (a.leaveAbsolute && (r != null && r._transitionInitialStyles)) {
            const {
              position: s,
              top: c,
              left: u,
              width: d,
              height: f
            } = r._transitionInitialStyles;
            delete r._transitionInitialStyles, r.style.position = s || "", r.style.top = c || "", r.style.left = u || "", r.style.width = d || "", r.style.height = f || "";
          }
        }
      };
      return () => {
        const r = a.group ? ll : Vt;
        return Mt(r, {
          name: a.disabled ? "" : e,
          css: !a.disabled,
          ...a.group ? void 0 : {
            mode: a.mode
          },
          ...a.disabled ? {} : o
        }, i.default);
      };
    }
  });
}
function Do(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "in-out";
  return U()({
    name: e,
    props: {
      mode: {
        type: String,
        default: n
      },
      disabled: {
        type: Boolean,
        default: Ot()
      },
      group: Boolean
    },
    setup(a, l) {
      let {
        slots: i
      } = l;
      const o = a.group ? ll : Vt;
      return () => Mt(o, {
        name: a.disabled ? "" : e,
        css: !a.disabled,
        // mode: props.mode, // TODO: vuejs/vue-next#3104
        ...a.disabled ? {} : t
      }, i.default);
    }
  });
}
function Fo() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  const n = (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1) ? "width" : "height", a = al(`offset-${n}`);
  return {
    onBeforeEnter(o) {
      o._parent = o.parentNode, o._initialStyle = {
        transition: o.style.transition,
        overflow: o.style.overflow,
        [n]: o.style[n]
      };
    },
    onEnter(o) {
      const r = o._initialStyle;
      if (!r) return;
      o.style.setProperty("transition", "none", "important"), o.style.overflow = "hidden";
      const s = `${o[a]}px`;
      o.style[n] = "0", o.offsetHeight, o.style.transition = r.transition, e && o._parent && o._parent.classList.add(e), requestAnimationFrame(() => {
        o.style[n] = s;
      });
    },
    onAfterEnter: i,
    onEnterCancelled: i,
    onLeave(o) {
      o._initialStyle = {
        transition: "",
        overflow: o.style.overflow,
        [n]: o.style[n]
      }, o.style.overflow = "hidden", o.style[n] = `${o[a]}px`, o.offsetHeight, requestAnimationFrame(() => o.style[n] = "0");
    },
    onAfterLeave: l,
    onLeaveCancelled: l
  };
  function l(o) {
    e && o._parent && o._parent.classList.remove(e), i(o);
  }
  function i(o) {
    if (!o._initialStyle) return;
    const r = o._initialStyle[n];
    o.style.overflow = o._initialStyle.overflow, r != null && (o.style[n] = r), delete o._initialStyle;
  }
}
const vd = O({
  target: [Object, Array]
}, "v-dialog-transition"), Da = /* @__PURE__ */ new WeakMap(), yl = U()({
  name: "VDialogTransition",
  props: vd(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = {
      onBeforeEnter(l) {
        l.style.pointerEvents = "none", l.style.visibility = "hidden";
      },
      async onEnter(l, i) {
        var f;
        await new Promise((v) => requestAnimationFrame(v)), await new Promise((v) => requestAnimationFrame(v)), l.style.visibility = "";
        const o = Pi(e.target, l), {
          x: r,
          y: s,
          sx: c,
          sy: u,
          speed: d
        } = o;
        if (Da.set(l, o), Ot())
          kt(l, [{
            opacity: 0
          }, {}], {
            duration: 125 * d,
            easing: si
          }).finished.then(() => i());
        else {
          const v = kt(l, [{
            transform: `translate(${r}px, ${s}px) scale(${c}, ${u})`,
            opacity: 0
          }, {}], {
            duration: 225 * d,
            easing: si
          });
          (f = Vi(l)) == null || f.forEach((m) => {
            kt(m, [{
              opacity: 0
            }, {
              opacity: 0,
              offset: 0.33
            }, {}], {
              duration: 225 * 2 * d,
              easing: mn
            });
          }), v.finished.then(() => i());
        }
      },
      onAfterEnter(l) {
        l.style.removeProperty("pointer-events");
      },
      onBeforeLeave(l) {
        l.style.pointerEvents = "none";
      },
      async onLeave(l, i) {
        var f;
        await new Promise((v) => requestAnimationFrame(v));
        let o;
        !Da.has(l) || Array.isArray(e.target) || e.target.offsetParent || e.target.getClientRects().length ? o = Pi(e.target, l) : o = Da.get(l);
        const {
          x: r,
          y: s,
          sx: c,
          sy: u,
          speed: d
        } = o;
        Ot() ? kt(l, [{}, {
          opacity: 0
        }], {
          duration: 85 * d,
          easing: ui
        }).finished.then(() => i()) : (kt(l, [{}, {
          transform: `translate(${r}px, ${s}px) scale(${c}, ${u})`,
          opacity: 0
        }], {
          duration: 125 * d,
          easing: ui
        }).finished.then(() => i()), (f = Vi(l)) == null || f.forEach((m) => {
          kt(m, [{}, {
            opacity: 0,
            offset: 0.2
          }, {
            opacity: 0
          }], {
            duration: 125 * 2 * d,
            easing: mn
          });
        }));
      },
      onAfterLeave(l) {
        l.style.removeProperty("pointer-events");
      }
    };
    return () => e.target ? w(Vt, j({
      name: "dialog-transition"
    }, a, {
      css: !1
    }), n) : w(Vt, {
      name: "dialog-transition"
    }, n);
  }
});
function Vi(e) {
  var n;
  const t = (n = e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")) == null ? void 0 : n.children;
  return t && [...t];
}
function Pi(e, t) {
  const n = so(e), a = cl(t), [l, i] = getComputedStyle(t).transformOrigin.split(" ").map((h) => parseFloat(h)), [o, r] = getComputedStyle(t).getPropertyValue("--v-overlay-anchor-origin").split(" ");
  let s = n.left + n.width / 2;
  o === "left" || r === "left" ? s -= n.width / 2 : (o === "right" || r === "right") && (s += n.width / 2);
  let c = n.top + n.height / 2;
  o === "top" || r === "top" ? c -= n.height / 2 : (o === "bottom" || r === "bottom") && (c += n.height / 2);
  const u = n.width / a.width, d = n.height / a.height, f = Math.max(1, u, d), v = u / f || 0, m = d / f || 0, g = a.width * a.height / (window.innerWidth * window.innerHeight), y = g > 0.12 ? Math.min(1.5, (g - 0.12) * 10 + 1) : 1;
  return {
    x: s - (l + a.left),
    y: c - (i + a.top),
    sx: v,
    sy: m,
    speed: y
  };
}
at("fab-transition", "center center", "out-in");
at("dialog-bottom-transition");
at("dialog-top-transition");
const Ii = at("fade-transition");
at("scale-transition");
at("scroll-x-transition");
at("scroll-x-reverse-transition");
at("scroll-y-transition");
at("scroll-y-reverse-transition");
at("slide-x-transition");
at("slide-x-reverse-transition");
const Oo = at("slide-y-transition");
at("slide-y-reverse-transition");
const Lo = Do("expand-transition", Fo()), $o = Do("expand-x-transition", Fo("", !0)), md = O({
  defaults: Object,
  disabled: Boolean,
  reset: [Number, String],
  root: [Boolean, String],
  scoped: Boolean
}, "VDefaultsProvider"), we = U(!1)({
  name: "VDefaultsProvider",
  props: md(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      defaults: a,
      disabled: l,
      reset: i,
      root: o,
      scoped: r
    } = sa(e);
    return nt(a, {
      reset: i,
      root: o,
      scoped: r,
      disabled: l
    }), () => {
      var s;
      return (s = n.default) == null ? void 0 : s.call(n);
    };
  }
}), Xa = Symbol.for("vuetify:list");
function Mo() {
  let {
    filterable: e
  } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
    filterable: !1
  };
  const t = ye(Xa, {
    filterable: !1,
    hasPrepend: G(!1),
    updateHasPrepend: () => null
  }), n = {
    filterable: t.filterable || e,
    hasPrepend: G(!1),
    updateHasPrepend: (a) => {
      a && (n.hasPrepend.value = a);
    }
  };
  return Pe(Xa, n), t;
}
function Ro() {
  return ye(Xa, null);
}
const bl = (e) => {
  const t = {
    activate: (n) => {
      let {
        id: a,
        value: l,
        activated: i
      } = n;
      return a = Ee(a), e && !l && i.size === 1 && i.has(a) || (l ? i.add(a) : i.delete(a)), i;
    },
    in: (n, a, l) => {
      let i = /* @__PURE__ */ new Set();
      if (n != null)
        for (const o of Oe(n))
          i = t.activate({
            id: o,
            value: !0,
            activated: new Set(i),
            children: a,
            parents: l
          });
      return i;
    },
    out: (n) => Array.from(n)
  };
  return t;
}, No = (e) => {
  const t = bl(e);
  return {
    activate: (a) => {
      let {
        activated: l,
        id: i,
        ...o
      } = a;
      i = Ee(i);
      const r = l.has(i) ? /* @__PURE__ */ new Set([i]) : /* @__PURE__ */ new Set();
      return t.activate({
        ...o,
        id: i,
        activated: r
      });
    },
    in: (a, l, i) => {
      let o = /* @__PURE__ */ new Set();
      if (a != null) {
        const r = Oe(a);
        r.length && (o = t.in(r.slice(0, 1), l, i));
      }
      return o;
    },
    out: (a, l, i) => t.out(a, l, i)
  };
}, gd = (e) => {
  const t = bl(e);
  return {
    activate: (a) => {
      let {
        id: l,
        activated: i,
        children: o,
        ...r
      } = a;
      return l = Ee(l), o.has(l) ? i : t.activate({
        id: l,
        activated: i,
        children: o,
        ...r
      });
    },
    in: t.in,
    out: t.out
  };
}, hd = (e) => {
  const t = No(e);
  return {
    activate: (a) => {
      let {
        id: l,
        activated: i,
        children: o,
        ...r
      } = a;
      return l = Ee(l), o.has(l) ? i : t.activate({
        id: l,
        activated: i,
        children: o,
        ...r
      });
    },
    in: t.in,
    out: t.out
  };
}, yd = {
  open: (e) => {
    let {
      id: t,
      value: n,
      opened: a,
      parents: l
    } = e;
    if (n) {
      const i = /* @__PURE__ */ new Set();
      i.add(t);
      let o = l.get(t);
      for (; o != null; )
        i.add(o), o = l.get(o);
      return i;
    } else
      return a.delete(t), a;
  },
  select: () => null
}, Ho = {
  open: (e) => {
    let {
      id: t,
      value: n,
      opened: a,
      parents: l
    } = e;
    if (n) {
      let i = l.get(t);
      for (a.add(t); i != null && i !== t; )
        a.add(i), i = l.get(i);
      return a;
    } else
      a.delete(t);
    return a;
  },
  select: () => null
}, bd = {
  open: Ho.open,
  select: (e) => {
    let {
      id: t,
      value: n,
      opened: a,
      parents: l
    } = e;
    if (!n) return a;
    const i = [];
    let o = l.get(t);
    for (; o != null; )
      i.push(o), o = l.get(o);
    return new Set(i);
  }
}, Sl = (e) => {
  const t = {
    select: (n) => {
      let {
        id: a,
        value: l,
        selected: i
      } = n;
      if (a = Ee(a), e && !l) {
        const o = Array.from(i.entries()).reduce((r, s) => {
          let [c, u] = s;
          return u === "on" && r.push(c), r;
        }, []);
        if (o.length === 1 && o[0] === a) return i;
      }
      return i.set(a, l ? "on" : "off"), i;
    },
    in: (n, a, l, i) => {
      const o = /* @__PURE__ */ new Map();
      for (const r of n || [])
        t.select({
          id: r,
          value: !0,
          selected: o,
          children: a,
          parents: l,
          disabled: i
        });
      return o;
    },
    out: (n) => {
      const a = [];
      for (const [l, i] of n.entries())
        i === "on" && a.push(l);
      return a;
    }
  };
  return t;
}, zo = (e) => {
  const t = Sl(e);
  return {
    select: (a) => {
      let {
        selected: l,
        id: i,
        ...o
      } = a;
      i = Ee(i);
      const r = l.has(i) ? /* @__PURE__ */ new Map([[i, l.get(i)]]) : /* @__PURE__ */ new Map();
      return t.select({
        ...o,
        id: i,
        selected: r
      });
    },
    in: (a, l, i, o) => a != null && a.length ? t.in(a.slice(0, 1), l, i, o) : /* @__PURE__ */ new Map(),
    out: (a, l, i) => t.out(a, l, i)
  };
}, Sd = (e) => {
  const t = Sl(e);
  return {
    select: (a) => {
      let {
        id: l,
        selected: i,
        children: o,
        ...r
      } = a;
      return l = Ee(l), o.has(l) ? i : t.select({
        id: l,
        selected: i,
        children: o,
        ...r
      });
    },
    in: t.in,
    out: t.out
  };
}, wd = (e) => {
  const t = zo(e);
  return {
    select: (a) => {
      let {
        id: l,
        selected: i,
        children: o,
        ...r
      } = a;
      return l = Ee(l), o.has(l) ? i : t.select({
        id: l,
        selected: i,
        children: o,
        ...r
      });
    },
    in: t.in,
    out: t.out
  };
}, Wo = (e) => {
  const t = {
    select: (n) => {
      let {
        id: a,
        value: l,
        selected: i,
        children: o,
        parents: r,
        disabled: s
      } = n;
      a = Ee(a);
      const c = new Map(i), u = [a];
      for (; u.length; ) {
        const f = u.shift();
        s.has(f) || i.set(Ee(f), l ? "on" : "off"), o.has(f) && u.push(...o.get(f));
      }
      let d = Ee(r.get(a));
      for (; d; ) {
        let f = !0, v = !0;
        for (const m of o.get(d)) {
          const g = Ee(m);
          if (!s.has(g) && (i.get(g) !== "on" && (f = !1), i.has(g) && i.get(g) !== "off" && (v = !1), !f && !v))
            break;
        }
        i.set(d, f ? "on" : v ? "off" : "indeterminate"), d = Ee(r.get(d));
      }
      return e && !l && Array.from(i.entries()).reduce((v, m) => {
        let [g, y] = m;
        return y === "on" && v.push(g), v;
      }, []).length === 0 ? c : i;
    },
    in: (n, a, l, i) => {
      let o = /* @__PURE__ */ new Map();
      for (const r of n || [])
        o = t.select({
          id: r,
          value: !0,
          selected: o,
          children: a,
          parents: l,
          disabled: i
        });
      return o;
    },
    out: (n, a) => {
      const l = [];
      for (const [i, o] of n.entries())
        o === "on" && !a.has(i) && l.push(i);
      return l;
    }
  };
  return t;
}, xd = (e) => {
  const t = Wo(e);
  return {
    select: t.select,
    in: t.in,
    out: (a, l, i) => {
      const o = [];
      for (const [r, s] of a.entries())
        if (s === "on") {
          if (i.has(r)) {
            const c = i.get(r);
            if (a.get(c) === "on") continue;
          }
          o.push(r);
        }
      return o;
    }
  };
}, Sn = Symbol.for("vuetify:nested"), jo = {
  id: G(),
  root: {
    register: () => null,
    unregister: () => null,
    children: Y(/* @__PURE__ */ new Map()),
    parents: Y(/* @__PURE__ */ new Map()),
    disabled: Y(/* @__PURE__ */ new Set()),
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
}, kd = O({
  activatable: Boolean,
  selectable: Boolean,
  activeStrategy: [String, Function, Object],
  selectStrategy: [String, Function, Object],
  openStrategy: [String, Object],
  opened: null,
  activated: null,
  selected: null,
  mandatory: Boolean
}, "nested"), Cd = (e) => {
  let t = !1;
  const n = G(/* @__PURE__ */ new Map()), a = G(/* @__PURE__ */ new Map()), l = G(/* @__PURE__ */ new Set()), i = de(e, "opened", e.opened, (g) => new Set(Array.isArray(g) ? g.map((y) => Ee(y)) : g), (g) => [...g.values()]), o = x(() => {
    if (typeof e.activeStrategy == "object") return e.activeStrategy;
    if (typeof e.activeStrategy == "function") return e.activeStrategy(e.mandatory);
    switch (e.activeStrategy) {
      case "leaf":
        return gd(e.mandatory);
      case "single-leaf":
        return hd(e.mandatory);
      case "independent":
        return bl(e.mandatory);
      case "single-independent":
      default:
        return No(e.mandatory);
    }
  }), r = x(() => {
    if (typeof e.selectStrategy == "object") return e.selectStrategy;
    if (typeof e.selectStrategy == "function") return e.selectStrategy(e.mandatory);
    switch (e.selectStrategy) {
      case "single-leaf":
        return wd(e.mandatory);
      case "leaf":
        return Sd(e.mandatory);
      case "independent":
        return Sl(e.mandatory);
      case "single-independent":
        return zo(e.mandatory);
      case "trunk":
        return xd(e.mandatory);
      case "classic":
      default:
        return Wo(e.mandatory);
    }
  }), s = x(() => {
    if (typeof e.openStrategy == "object") return e.openStrategy;
    switch (e.openStrategy) {
      case "list":
        return bd;
      case "single":
        return yd;
      case "multiple":
      default:
        return Ho;
    }
  }), c = de(e, "activated", e.activated, (g) => o.value.in(g, n.value, a.value), (g) => o.value.out(g, n.value, a.value)), u = de(e, "selected", e.selected, (g) => r.value.in(g, n.value, a.value, l.value), (g) => r.value.out(g, n.value, a.value));
  Ge(() => {
    t = !0;
  });
  function d(g) {
    const y = [];
    let h = Ee(g);
    for (; h !== void 0; )
      y.unshift(h), h = a.value.get(h);
    return y;
  }
  const f = Ie("nested"), v = /* @__PURE__ */ new Set(), m = {
    id: G(),
    root: {
      opened: i,
      activatable: T(() => e.activatable),
      selectable: T(() => e.selectable),
      activated: c,
      selected: u,
      selectedValues: x(() => {
        const g = [];
        for (const [y, h] of u.value.entries())
          h === "on" && g.push(y);
        return g;
      }),
      register: (g, y, h, b) => {
        if (v.has(g)) {
          const k = d(g).map(String).join(" -> "), p = d(y).concat(g).map(String).join(" -> ");
          fn(`Multiple nodes with the same ID
	${k}
	${p}`);
          return;
        } else
          v.add(g);
        y && g !== y && a.value.set(g, y), h && l.value.add(g), b && n.value.set(g, []), y != null && n.value.set(y, [...n.value.get(y) || [], g]);
      },
      unregister: (g) => {
        if (t) return;
        v.delete(g), n.value.delete(g), l.value.delete(g);
        const y = a.value.get(g);
        if (y) {
          const h = n.value.get(y) ?? [];
          n.value.set(y, h.filter((b) => b !== g));
        }
        a.value.delete(g);
      },
      open: (g, y, h) => {
        f.emit("click:open", {
          id: g,
          value: y,
          path: d(g),
          event: h
        });
        const b = s.value.open({
          id: g,
          value: y,
          opened: new Set(i.value),
          children: n.value,
          parents: a.value,
          event: h
        });
        b && (i.value = b);
      },
      openOnSelect: (g, y, h) => {
        const b = s.value.select({
          id: g,
          value: y,
          selected: new Map(u.value),
          opened: new Set(i.value),
          children: n.value,
          parents: a.value,
          event: h
        });
        b && (i.value = b);
      },
      select: (g, y, h) => {
        f.emit("click:select", {
          id: g,
          value: y,
          path: d(g),
          event: h
        });
        const b = r.value.select({
          id: g,
          value: y,
          selected: new Map(u.value),
          children: n.value,
          parents: a.value,
          disabled: l.value,
          event: h
        });
        b && (u.value = b), m.root.openOnSelect(g, y, h);
      },
      activate: (g, y, h) => {
        if (!e.activatable)
          return m.root.select(g, !0, h);
        f.emit("click:activate", {
          id: g,
          value: y,
          path: d(g),
          event: h
        });
        const b = o.value.activate({
          id: g,
          value: y,
          activated: new Set(c.value),
          children: n.value,
          parents: a.value,
          event: h
        });
        if (b.size !== c.value.size)
          c.value = b;
        else {
          for (const k of b)
            if (!c.value.has(k)) {
              c.value = b;
              return;
            }
          for (const k of c.value)
            if (!b.has(k)) {
              c.value = b;
              return;
            }
        }
      },
      children: n,
      parents: a,
      disabled: l,
      getPath: d
    }
  };
  return Pe(Sn, m), m.root;
}, Go = (e, t, n) => {
  const a = ye(Sn, jo), l = Symbol("nested item"), i = x(() => {
    const r = Ee(je(e));
    return r !== void 0 ? r : l;
  }), o = {
    ...a,
    id: i,
    open: (r, s) => a.root.open(i.value, r, s),
    openOnSelect: (r, s) => a.root.openOnSelect(i.value, r, s),
    isOpen: x(() => a.root.opened.value.has(i.value)),
    parent: x(() => a.root.parents.value.get(i.value)),
    activate: (r, s) => a.root.activate(i.value, r, s),
    isActivated: x(() => a.root.activated.value.has(i.value)),
    select: (r, s) => a.root.select(i.value, r, s),
    isSelected: x(() => a.root.selected.value.get(i.value) === "on"),
    isIndeterminate: x(() => a.root.selected.value.get(i.value) === "indeterminate"),
    isLeaf: x(() => !a.root.children.value.get(i.value)),
    isGroupActivator: a.isGroupActivator
  };
  return ca(() => {
    a.isGroupActivator || a.root.register(i.value, a.id.value, je(t), n);
  }), Ge(() => {
    a.isGroupActivator || a.root.unregister(i.value);
  }), n && Pe(Sn, o), o;
}, pd = () => {
  const e = ye(Sn, jo);
  Pe(Sn, {
    ...e,
    isGroupActivator: !0
  });
};
function In() {
  const e = G(!1);
  return rt(() => {
    window.requestAnimationFrame(() => {
      e.value = !0;
    });
  }), {
    ssrBootStyles: T(() => e.value ? void 0 : {
      transition: "none !important"
    }),
    isBooted: ua(e)
  };
}
const ge = O({
  tag: {
    type: [String, Object, Function],
    default: "div"
  }
}, "tag"), ln = O({
  transition: {
    type: null,
    default: "fade-transition",
    validator: (e) => e !== !0
  }
}, "transition"), Ct = (e, t) => {
  let {
    slots: n
  } = t;
  const {
    transition: a,
    disabled: l,
    group: i,
    ...o
  } = e, {
    component: r = i ? ll : Vt,
    ...s
  } = Wn(a) ? a : {};
  let c;
  return Wn(a) ? c = j(s, hu({
    disabled: l,
    group: i
  }), o) : c = j({
    name: l || !a ? "" : a
  }, o), Mt(r, c, n);
}, Vd = an({
  name: "VListGroupActivator",
  setup(e, t) {
    let {
      slots: n
    } = t;
    return pd(), () => {
      var a;
      return (a = n.default) == null ? void 0 : a.call(n);
    };
  }
}), Pd = O({
  /* @deprecated */
  activeColor: String,
  baseColor: String,
  color: String,
  collapseIcon: {
    type: se,
    default: "$collapse"
  },
  disabled: Boolean,
  expandIcon: {
    type: se,
    default: "$expand"
  },
  rawId: [String, Number],
  prependIcon: se,
  appendIcon: se,
  fluid: Boolean,
  subgroup: Boolean,
  title: String,
  value: null,
  ...oe(),
  ...ge()
}, "VListGroup"), Ai = U()({
  name: "VListGroup",
  props: Pd(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isOpen: a,
      open: l,
      id: i
    } = Go(() => e.value, () => e.disabled, !0), o = x(() => `v-list-group--id-${String(e.rawId ?? i.value)}`), r = Ro(), {
      isBooted: s
    } = In();
    function c(v) {
      var m;
      ["INPUT", "TEXTAREA"].includes((m = v.target) == null ? void 0 : m.tagName) || l(!a.value, v);
    }
    const u = x(() => ({
      onClick: c,
      class: "v-list-group__header",
      id: o.value
    })), d = x(() => a.value ? e.collapseIcon : e.expandIcon), f = x(() => ({
      VListItem: {
        activeColor: e.activeColor,
        baseColor: e.baseColor,
        color: e.color,
        prependIcon: e.prependIcon || e.subgroup && d.value,
        appendIcon: e.appendIcon || !e.subgroup && d.value,
        title: e.title,
        value: e.value
      }
    }));
    return ee(() => w(e.tag, {
      class: q(["v-list-group", {
        "v-list-group--prepend": r == null ? void 0 : r.hasPrepend.value,
        "v-list-group--fluid": e.fluid,
        "v-list-group--subgroup": e.subgroup,
        "v-list-group--open": a.value
      }, e.class]),
      style: re(e.style)
    }, {
      default: () => [n.activator && w(we, {
        defaults: f.value
      }, {
        default: () => [w(Vd, null, {
          default: () => [n.activator({
            props: u.value,
            isOpen: a.value
          })]
        })]
      }), w(Ct, {
        transition: {
          component: Lo
        },
        disabled: !s.value
      }, {
        default: () => {
          var v;
          return [$e(C("div", {
            class: "v-list-group__items",
            role: "group",
            "aria-labelledby": o.value
          }, [(v = n.default) == null ? void 0 : v.call(n)]), [[Rt, a.value]])];
        }
      })]
    })), {
      isOpen: a
    };
  }
}), Id = O({
  opacity: [Number, String],
  ...oe(),
  ...ge()
}, "VListItemSubtitle"), Ad = U()({
  name: "VListItemSubtitle",
  props: Id(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ee(() => w(e.tag, {
      class: q(["v-list-item-subtitle", e.class]),
      style: re([{
        "--v-list-item-subtitle-opacity": e.opacity
      }, e.style])
    }, n)), {};
  }
}), Td = va("v-list-item-title");
function wl(e) {
  return sl(() => {
    const {
      class: t,
      style: n
    } = Ed(e);
    return {
      colorClasses: t,
      colorStyles: n
    };
  });
}
function ot(e) {
  const {
    colorClasses: t,
    colorStyles: n
  } = wl(() => ({
    text: je(e)
  }));
  return {
    textColorClasses: t,
    textColorStyles: n
  };
}
function Xe(e) {
  const {
    colorClasses: t,
    colorStyles: n
  } = wl(() => ({
    background: je(e)
  }));
  return {
    backgroundColorClasses: t,
    backgroundColorStyles: n
  };
}
function Ed(e) {
  const t = je(e), n = [], a = {};
  if (t.background)
    if (Ua(t.background)) {
      if (a.backgroundColor = t.background, !t.text && Fu(t.background)) {
        const l = ht(t.background);
        if (l.a == null || l.a === 1) {
          const i = go(l);
          a.color = i, a.caretColor = i;
        }
      }
    } else
      n.push(`bg-${t.background}`);
  return t.text && (Ua(t.text) ? (a.color = t.text, a.caretColor = t.text) : n.push(`text-${t.text}`)), {
    class: n,
    style: a
  };
}
const _d = ["x-small", "small", "default", "large", "x-large"], on = O({
  size: {
    type: [String, Number],
    default: "default"
  }
}, "size");
function An(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : yt();
  return sl(() => {
    const n = e.size;
    let a, l;
    return jn(_d, n) ? a = `${t}--size-${n}` : n && (l = {
      width: J(n),
      height: J(n)
    }), {
      sizeClasses: a,
      sizeStyles: l
    };
  });
}
const Bd = O({
  color: String,
  disabled: Boolean,
  start: Boolean,
  end: Boolean,
  icon: se,
  opacity: [String, Number],
  ...oe(),
  ...on(),
  ...ge({
    tag: "i"
  }),
  ...xe()
}, "VIcon"), Ve = U()({
  name: "VIcon",
  props: Bd(),
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const l = G(), {
      themeClasses: i
    } = id(), {
      iconData: o
    } = qc(() => l.value || e.icon), {
      sizeClasses: r
    } = An(e), {
      textColorClasses: s,
      textColorStyles: c
    } = ot(() => e.color);
    return ee(() => {
      var f, v;
      const u = (f = a.default) == null ? void 0 : f.call(a);
      u && (l.value = (v = ao(u).filter((m) => m.type === Js && m.children && typeof m.children == "string")[0]) == null ? void 0 : v.children);
      const d = !!(n.onClick || n.onClickOnce);
      return w(o.value.component, {
        tag: e.tag,
        icon: o.value.icon,
        class: q(["v-icon", "notranslate", i.value, r.value, s.value, {
          "v-icon--clickable": d,
          "v-icon--disabled": e.disabled,
          "v-icon--start": e.start,
          "v-icon--end": e.end
        }, e.class]),
        style: re([{
          "--v-icon-opacity": e.opacity
        }, r.value ? void 0 : {
          fontSize: J(e.size),
          height: J(e.size),
          width: J(e.size)
        }, c.value, e.style]),
        role: d ? "button" : void 0,
        "aria-hidden": !d,
        tabindex: d ? e.disabled ? -1 : 0 : void 0
      }, {
        default: () => [u]
      });
    }), {};
  }
}), ut = O({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String]
}, "dimension");
function ct(e) {
  return {
    dimensionStyles: x(() => {
      const n = {}, a = J(e.height), l = J(e.maxHeight), i = J(e.maxWidth), o = J(e.minHeight), r = J(e.minWidth), s = J(e.width);
      return a != null && (n.height = a), l != null && (n.maxHeight = l), i != null && (n.maxWidth = i), o != null && (n.minHeight = o), r != null && (n.minWidth = r), s != null && (n.width = s), n;
    })
  };
}
function Dd(e) {
  return {
    aspectStyles: x(() => {
      const t = Number(e.aspectRatio);
      return t ? {
        paddingBottom: String(1 / t * 100) + "%"
      } : void 0;
    })
  };
}
const Uo = O({
  aspectRatio: [String, Number],
  contentClass: null,
  inline: Boolean,
  ...oe(),
  ...ut()
}, "VResponsive"), Ti = U()({
  name: "VResponsive",
  props: Uo(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      aspectStyles: a
    } = Dd(e), {
      dimensionStyles: l
    } = ct(e);
    return ee(() => {
      var i;
      return C("div", {
        class: q(["v-responsive", {
          "v-responsive--inline": e.inline
        }, e.class]),
        style: re([l.value, e.style])
      }, [C("div", {
        class: "v-responsive__sizer",
        style: re(a.value)
      }, null), (i = n.additional) == null ? void 0 : i.call(n), n.default && C("div", {
        class: q(["v-responsive__content", e.contentClass])
      }, [n.default()])]);
    }), {};
  }
}), ze = O({
  rounded: {
    type: [Boolean, Number, String],
    default: void 0
  },
  tile: Boolean
}, "rounded");
function Ue(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : yt();
  return {
    roundedClasses: x(() => {
      const a = Ha(e) ? e.value : e.rounded, l = Ha(e) ? !1 : e.tile, i = [];
      if (l || a === !1)
        i.push("rounded-0");
      else if (a === !0 || a === "")
        i.push(`${t}--rounded`);
      else if (typeof a == "string" || a === 0)
        for (const o of String(a).split(" "))
          i.push(`rounded-${o}`);
      return i;
    })
  };
}
function Fd(e, t) {
  if (!il) return;
  const n = t.modifiers || {}, a = t.value, {
    handler: l,
    options: i
  } = typeof a == "object" ? a : {
    handler: a,
    options: {}
  }, o = new IntersectionObserver(function() {
    var d;
    let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], s = arguments.length > 1 ? arguments[1] : void 0;
    const c = (d = e._observe) == null ? void 0 : d[t.instance.$.uid];
    if (!c) return;
    const u = r.some((f) => f.isIntersecting);
    l && (!n.quiet || c.init) && (!n.once || u || c.init) && l(u, r, s), u && n.once ? Yo(e, t) : c.init = !0;
  }, i);
  e._observe = Object(e._observe), e._observe[t.instance.$.uid] = {
    init: !1,
    observer: o
  }, o.observe(e);
}
function Yo(e, t) {
  var a;
  const n = (a = e._observe) == null ? void 0 : a[t.instance.$.uid];
  n && (n.observer.unobserve(e), delete e._observe[t.instance.$.uid]);
}
const Qt = {
  mounted: Fd,
  unmounted: Yo
}, Od = O({
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
  ...Uo(),
  ...oe(),
  ...ze(),
  ...ln()
}, "VImg"), ha = U()({
  name: "VImg",
  directives: {
    vIntersect: Qt
  },
  props: Od(),
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
      backgroundColorStyles: i
    } = Xe(() => e.color), {
      roundedClasses: o
    } = Ue(e), r = Ie("VImg"), s = G(""), c = Y(), u = G(e.eager ? "loading" : "idle"), d = G(), f = G(), v = x(() => e.src && typeof e.src == "object" ? {
      src: e.src.src,
      srcset: e.srcset || e.src.srcset,
      lazySrc: e.lazySrc || e.src.lazySrc,
      aspect: Number(e.aspectRatio || e.src.aspect || 0)
    } : {
      src: e.src,
      srcset: e.srcset,
      lazySrc: e.lazySrc,
      aspect: Number(e.aspectRatio || 0)
    }), m = x(() => v.value.aspect || d.value / f.value || 0);
    X(() => e.src, () => {
      g(u.value !== "idle");
    }), X(m, (D, F) => {
      !D && F && c.value && p(c.value);
    }), ca(() => g());
    function g(D) {
      if (!(e.eager && D) && !(il && !D && !e.eager)) {
        if (u.value = "loading", v.value.lazySrc) {
          const F = new Image();
          F.src = v.value.lazySrc, p(F, null);
        }
        v.value.src && Se(() => {
          var F;
          n("loadstart", ((F = c.value) == null ? void 0 : F.currentSrc) || v.value.src), setTimeout(() => {
            var L;
            if (!r.isUnmounted)
              if ((L = c.value) != null && L.complete) {
                if (c.value.naturalWidth || h(), u.value === "error") return;
                m.value || p(c.value, null), u.value === "loading" && y();
              } else
                m.value || p(c.value), b();
          });
        });
      }
    }
    function y() {
      var D;
      r.isUnmounted || (b(), p(c.value), u.value = "loaded", n("load", ((D = c.value) == null ? void 0 : D.currentSrc) || v.value.src));
    }
    function h() {
      var D;
      r.isUnmounted || (u.value = "error", n("error", ((D = c.value) == null ? void 0 : D.currentSrc) || v.value.src));
    }
    function b() {
      const D = c.value;
      D && (s.value = D.currentSrc || D.src);
    }
    let k = -1;
    Ge(() => {
      clearTimeout(k);
    });
    function p(D) {
      let F = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
      const L = () => {
        if (clearTimeout(k), r.isUnmounted) return;
        const {
          naturalHeight: R,
          naturalWidth: W
        } = D;
        R || W ? (d.value = W, f.value = R) : !D.complete && u.value === "loading" && F != null ? k = window.setTimeout(L, F) : (D.currentSrc.endsWith(".svg") || D.currentSrc.startsWith("data:image/svg+xml")) && (d.value = 1, f.value = 1);
      };
      L();
    }
    const V = T(() => ({
      "v-img__img--cover": e.cover,
      "v-img__img--contain": !e.cover
    })), I = () => {
      var L;
      if (!v.value.src || u.value === "idle") return null;
      const D = C("img", {
        class: q(["v-img__img", V.value]),
        style: {
          objectPosition: e.position
        },
        crossorigin: e.crossorigin,
        src: v.value.src,
        srcset: v.value.srcset,
        alt: e.alt,
        referrerpolicy: e.referrerpolicy,
        draggable: e.draggable,
        sizes: e.sizes,
        ref: c,
        onLoad: y,
        onError: h
      }, null), F = (L = a.sources) == null ? void 0 : L.call(a);
      return w(Ct, {
        transition: e.transition,
        appear: !0
      }, {
        default: () => [$e(F ? C("picture", {
          class: "v-img__picture"
        }, [F, D]) : D, [[Rt, u.value === "loaded"]])]
      });
    }, A = () => w(Ct, {
      transition: e.transition
    }, {
      default: () => [v.value.lazySrc && u.value !== "loaded" && C("img", {
        class: q(["v-img__img", "v-img__img--preload", V.value]),
        style: {
          objectPosition: e.position
        },
        crossorigin: e.crossorigin,
        src: v.value.lazySrc,
        alt: e.alt,
        referrerpolicy: e.referrerpolicy,
        draggable: e.draggable
      }, null)]
    }), S = () => a.placeholder ? w(Ct, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [(u.value === "loading" || u.value === "error" && !a.error) && C("div", {
        class: "v-img__placeholder"
      }, [a.placeholder()])]
    }) : null, E = () => a.error ? w(Ct, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [u.value === "error" && C("div", {
        class: "v-img__error"
      }, [a.error()])]
    }) : null, P = () => e.gradient ? C("div", {
      class: "v-img__gradient",
      style: {
        backgroundImage: `linear-gradient(${e.gradient})`
      }
    }, null) : null, _ = G(!1);
    {
      const D = X(m, (F) => {
        F && (requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            _.value = !0;
          });
        }), D());
      });
    }
    return ee(() => {
      const D = Ti.filterProps(e);
      return $e(w(Ti, j({
        class: ["v-img", {
          "v-img--absolute": e.absolute,
          "v-img--booting": !_.value
        }, l.value, o.value, e.class],
        style: [{
          width: J(e.width === "auto" ? d.value : e.width)
        }, i.value, e.style]
      }, D, {
        aspectRatio: m.value,
        "aria-label": e.alt,
        role: e.alt ? "img" : void 0
      }), {
        additional: () => C(ce, null, [w(I, null, null), w(A, null, null), w(P, null, null), w(S, null, null), w(E, null, null)]),
        default: a.default
      }), [[Qt, {
        handler: g,
        options: e.options
      }, null, {
        once: !0
      }]]);
    }), {
      currentSrc: s,
      image: c,
      state: u,
      naturalWidth: d,
      naturalHeight: f
    };
  }
}), vt = O({
  border: [Boolean, Number, String]
}, "border");
function bt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : yt();
  return {
    borderClasses: x(() => {
      const a = e.border;
      return a === !0 || a === "" ? `${t}--border` : typeof a == "string" || a === 0 ? String(a).split(" ").map((l) => `border-${l}`) : [];
    })
  };
}
const Ld = [null, "default", "comfortable", "compact"], Me = O({
  density: {
    type: String,
    default: "default",
    validator: (e) => Ld.includes(e)
  }
}, "density");
function dt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : yt();
  return {
    densityClasses: T(() => `${t}--density-${e.density}`)
  };
}
const $d = ["elevated", "flat", "tonal", "outlined", "text", "plain"];
function Nt(e, t) {
  return C(ce, null, [e && C("span", {
    key: "overlay",
    class: q(`${t}__overlay`)
  }, null), C("span", {
    key: "underlay",
    class: q(`${t}__underlay`)
  }, null)]);
}
const mt = O({
  color: String,
  variant: {
    type: String,
    default: "elevated",
    validator: (e) => $d.includes(e)
  }
}, "variant");
function Ht(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : yt();
  const n = T(() => {
    const {
      variant: i
    } = je(e);
    return `${t}--variant-${i}`;
  }), {
    colorClasses: a,
    colorStyles: l
  } = wl(() => {
    const {
      variant: i,
      color: o
    } = je(e);
    return {
      [["elevated", "flat"].includes(i) ? "background" : "text"]: o
    };
  });
  return {
    colorClasses: a,
    colorStyles: l,
    variantClasses: n
  };
}
const Md = O({
  start: Boolean,
  end: Boolean,
  icon: se,
  image: String,
  text: String,
  ...vt(),
  ...oe(),
  ...Me(),
  ...ze(),
  ...on(),
  ...ge(),
  ...xe(),
  ...mt({
    variant: "flat"
  })
}, "VAvatar"), At = U()({
  name: "VAvatar",
  props: Md(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: a
    } = Ae(e), {
      borderClasses: l
    } = bt(e), {
      colorClasses: i,
      colorStyles: o,
      variantClasses: r
    } = Ht(e), {
      densityClasses: s
    } = dt(e), {
      roundedClasses: c
    } = Ue(e), {
      sizeClasses: u,
      sizeStyles: d
    } = An(e);
    return ee(() => w(e.tag, {
      class: q(["v-avatar", {
        "v-avatar--start": e.start,
        "v-avatar--end": e.end
      }, a.value, l.value, i.value, s.value, c.value, u.value, r.value, e.class]),
      style: re([o.value, d.value, e.style])
    }, {
      default: () => [n.default ? w(we, {
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
      }) : e.image ? w(ha, {
        key: "image",
        src: e.image,
        alt: "",
        cover: !0
      }, null) : e.icon ? w(Ve, {
        key: "icon",
        icon: e.icon
      }, null) : e.text, Nt(!1, "v-avatar")]
    })), {};
  }
}), gt = O({
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
function St(e) {
  return {
    elevationClasses: T(() => {
      const n = Ha(e) ? e.value : e.elevation;
      return n == null ? [] : [`elevation-${n}`];
    })
  };
}
function Rd() {
  const e = Ie("useRoute");
  return x(() => {
    var t;
    return (t = e == null ? void 0 : e.proxy) == null ? void 0 : t.$route;
  });
}
function Ko() {
  var e, t;
  return (t = (e = Ie("useRouter")) == null ? void 0 : e.proxy) == null ? void 0 : t.$router;
}
function ya(e, t) {
  var d, f;
  const n = eu("RouterLink"), a = T(() => !!(e.href || e.to)), l = x(() => (a == null ? void 0 : a.value) || Kl(t, "click") || Kl(e, "click"));
  if (typeof n == "string" || !("useLink" in n)) {
    const v = T(() => e.href);
    return {
      isLink: a,
      isRouterLink: T(() => !1),
      isClickable: l,
      href: v,
      linkProps: Ye({
        href: v
      })
    };
  }
  const i = n.useLink({
    to: T(() => e.to || ""),
    replace: T(() => e.replace)
  }), o = x(() => e.to ? i : void 0), r = Rd(), s = x(() => {
    var v, m, g;
    return o.value ? e.exact ? r.value ? ((g = o.value.isExactActive) == null ? void 0 : g.value) && We(o.value.route.value.query, r.value.query) : ((m = o.value.isExactActive) == null ? void 0 : m.value) ?? !1 : ((v = o.value.isActive) == null ? void 0 : v.value) ?? !1 : !1;
  }), c = x(() => {
    var v;
    return e.to ? (v = o.value) == null ? void 0 : v.route.value.href : e.href;
  }), u = T(() => !!e.to);
  return {
    isLink: a,
    isRouterLink: u,
    isClickable: l,
    isActive: s,
    route: (d = o.value) == null ? void 0 : d.route,
    navigate: (f = o.value) == null ? void 0 : f.navigate,
    href: c,
    linkProps: Ye({
      href: c,
      "aria-current": T(() => s.value ? "page" : void 0),
      "aria-disabled": T(() => e.disabled && a.value ? "true" : void 0),
      tabindex: T(() => e.disabled && a.value ? "-1" : void 0)
    })
  };
}
const ba = O({
  href: String,
  replace: Boolean,
  to: [String, Object],
  exact: Boolean
}, "router");
let Fa = !1;
function Nd(e, t) {
  let n = !1, a, l;
  he && (e != null && e.beforeEach) && (Se(() => {
    window.addEventListener("popstate", i), a = e.beforeEach((o, r, s) => {
      Fa ? n ? t(s) : s() : setTimeout(() => n ? t(s) : s()), Fa = !0;
    }), l = e == null ? void 0 : e.afterEach(() => {
      Fa = !1;
    });
  }), Be(() => {
    window.removeEventListener("popstate", i), a == null || a(), l == null || l();
  }));
  function i(o) {
    var r;
    (r = o.state) != null && r.replaced || (n = !0, setTimeout(() => n = !1));
  }
}
const qa = Symbol("rippleStop"), Hd = 80;
function Ei(e, t) {
  e.style.transform = t, e.style.webkitTransform = t;
}
function Za(e) {
  return e.constructor.name === "TouchEvent";
}
function Xo(e) {
  return e.constructor.name === "KeyboardEvent";
}
const zd = function(e, t) {
  var d;
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, a = 0, l = 0;
  if (!Xo(e)) {
    const f = t.getBoundingClientRect(), v = Za(e) ? e.touches[e.touches.length - 1] : e;
    a = v.clientX - f.left, l = v.clientY - f.top;
  }
  let i = 0, o = 0.3;
  (d = t._ripple) != null && d.circle ? (o = 0.15, i = t.clientWidth / 2, i = n.center ? i : i + Math.sqrt((a - i) ** 2 + (l - i) ** 2) / 4) : i = Math.sqrt(t.clientWidth ** 2 + t.clientHeight ** 2) / 2;
  const r = `${(t.clientWidth - i * 2) / 2}px`, s = `${(t.clientHeight - i * 2) / 2}px`, c = n.center ? r : `${a - i}px`, u = n.center ? s : `${l - i}px`;
  return {
    radius: i,
    scale: o,
    x: c,
    y: u,
    centerX: r,
    centerY: s
  };
}, Qn = {
  /* eslint-disable max-statements */
  show(e, t) {
    var v;
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (!((v = t == null ? void 0 : t._ripple) != null && v.enabled))
      return;
    const a = document.createElement("span"), l = document.createElement("span");
    a.appendChild(l), a.className = "v-ripple__container", n.class && (a.className += ` ${n.class}`);
    const {
      radius: i,
      scale: o,
      x: r,
      y: s,
      centerX: c,
      centerY: u
    } = zd(e, t, n), d = `${i * 2}px`;
    l.className = "v-ripple__animation", l.style.width = d, l.style.height = d, t.appendChild(a);
    const f = window.getComputedStyle(t);
    f && f.position === "static" && (t.style.position = "relative", t.dataset.previousPosition = "static"), l.classList.add("v-ripple__animation--enter"), l.classList.add("v-ripple__animation--visible"), Ei(l, `translate(${r}, ${s}) scale3d(${o},${o},${o})`), l.dataset.activated = String(performance.now()), requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        l.classList.remove("v-ripple__animation--enter"), l.classList.add("v-ripple__animation--in"), Ei(l, `translate(${c}, ${u}) scale3d(1,1,1)`);
      });
    });
  },
  hide(e) {
    var i;
    if (!((i = e == null ? void 0 : e._ripple) != null && i.enabled)) return;
    const t = e.getElementsByClassName("v-ripple__animation");
    if (t.length === 0) return;
    const n = Array.from(t).findLast((o) => !o.dataset.isHiding);
    if (n) n.dataset.isHiding = "true";
    else return;
    const a = performance.now() - Number(n.dataset.activated), l = Math.max(250 - a, 0);
    setTimeout(() => {
      n.classList.remove("v-ripple__animation--in"), n.classList.add("v-ripple__animation--out"), setTimeout(() => {
        var r;
        e.getElementsByClassName("v-ripple__animation").length === 1 && e.dataset.previousPosition && (e.style.position = e.dataset.previousPosition, delete e.dataset.previousPosition), ((r = n.parentNode) == null ? void 0 : r.parentNode) === e && e.removeChild(n.parentNode);
      }, 300);
    }, l);
  }
};
function qo(e) {
  return typeof e > "u" || !!e;
}
function wn(e) {
  const t = {}, n = e.currentTarget;
  if (!(!(n != null && n._ripple) || n._ripple.touched || e[qa])) {
    if (e[qa] = !0, Za(e))
      n._ripple.touched = !0, n._ripple.isTouch = !0;
    else if (n._ripple.isTouch) return;
    if (t.center = n._ripple.centered || Xo(e), n._ripple.class && (t.class = n._ripple.class), Za(e)) {
      if (n._ripple.showTimerCommit) return;
      n._ripple.showTimerCommit = () => {
        Qn.show(e, n, t);
      }, n._ripple.showTimer = window.setTimeout(() => {
        var a;
        (a = n == null ? void 0 : n._ripple) != null && a.showTimerCommit && (n._ripple.showTimerCommit(), n._ripple.showTimerCommit = null);
      }, Hd);
    } else
      Qn.show(e, n, t);
  }
}
function _i(e) {
  e[qa] = !0;
}
function Je(e) {
  const t = e.currentTarget;
  if (t != null && t._ripple) {
    if (window.clearTimeout(t._ripple.showTimer), e.type === "touchend" && t._ripple.showTimerCommit) {
      t._ripple.showTimerCommit(), t._ripple.showTimerCommit = null, t._ripple.showTimer = window.setTimeout(() => {
        Je(e);
      });
      return;
    }
    window.setTimeout(() => {
      t._ripple && (t._ripple.touched = !1);
    }), Qn.hide(t);
  }
}
function Zo(e) {
  const t = e.currentTarget;
  t != null && t._ripple && (t._ripple.showTimerCommit && (t._ripple.showTimerCommit = null), window.clearTimeout(t._ripple.showTimer));
}
let xn = !1;
function Bi(e, t) {
  !xn && t.includes(e.key) && (xn = !0, wn(e));
}
function Qo(e) {
  xn = !1, Je(e);
}
function Jo(e) {
  xn && (xn = !1, Je(e));
}
function er(e, t, n) {
  const {
    value: a,
    modifiers: l
  } = t, i = qo(a);
  i || Qn.hide(e), e._ripple = e._ripple ?? {}, e._ripple.enabled = i, e._ripple.centered = l.center, e._ripple.circle = l.circle;
  const o = Wn(a) ? a : {};
  o.class && (e._ripple.class = o.class);
  const r = o.keys ?? ["Enter", "Space"];
  if (e._ripple.keyDownHandler = (s) => Bi(s, r), i && !n) {
    if (l.stop) {
      e.addEventListener("touchstart", _i, {
        passive: !0
      }), e.addEventListener("mousedown", _i);
      return;
    }
    e.addEventListener("touchstart", wn, {
      passive: !0
    }), e.addEventListener("touchend", Je, {
      passive: !0
    }), e.addEventListener("touchmove", Zo, {
      passive: !0
    }), e.addEventListener("touchcancel", Je), e.addEventListener("mousedown", wn), e.addEventListener("mouseup", Je), e.addEventListener("mouseleave", Je), e.addEventListener("keydown", (s) => Bi(s, r)), e.addEventListener("keyup", Qo), e.addEventListener("blur", Jo), e.addEventListener("dragstart", Je, {
      passive: !0
    });
  } else !i && n && tr(e);
}
function tr(e) {
  var t;
  e.removeEventListener("mousedown", wn), e.removeEventListener("touchstart", wn), e.removeEventListener("touchend", Je), e.removeEventListener("touchmove", Zo), e.removeEventListener("touchcancel", Je), e.removeEventListener("mouseup", Je), e.removeEventListener("mouseleave", Je), (t = e._ripple) != null && t.keyDownHandler && e.removeEventListener("keydown", e._ripple.keyDownHandler), e.removeEventListener("keyup", Qo), e.removeEventListener("dragstart", Je), e.removeEventListener("blur", Jo);
}
function Wd(e, t) {
  er(e, t, !1);
}
function jd(e) {
  tr(e), delete e._ripple;
}
function Gd(e, t) {
  if (t.value === t.oldValue)
    return;
  const n = qo(t.oldValue);
  er(e, t, n);
}
const pt = {
  mounted: Wd,
  unmounted: jd,
  updated: Gd
}, Ud = O({
  active: {
    type: Boolean,
    default: void 0
  },
  activeClass: String,
  /* @deprecated */
  activeColor: String,
  appendAvatar: String,
  appendIcon: se,
  baseColor: String,
  disabled: Boolean,
  lines: [Boolean, String],
  link: {
    type: Boolean,
    default: void 0
  },
  nav: Boolean,
  prependAvatar: String,
  prependIcon: se,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  slim: Boolean,
  subtitle: {
    type: [String, Number, Boolean],
    default: void 0
  },
  title: {
    type: [String, Number, Boolean],
    default: void 0
  },
  value: null,
  onClick: Le(),
  onClickOnce: Le(),
  ...vt(),
  ...oe(),
  ...Me(),
  ...ut(),
  ...gt(),
  ...ze(),
  ...ba(),
  ...ge(),
  ...xe(),
  ...mt({
    variant: "text"
  })
}, "VListItem"), Jt = U()({
  name: "VListItem",
  directives: {
    vRipple: pt
  },
  props: Ud(),
  emits: {
    click: (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: a,
      emit: l
    } = t;
    const i = ya(e, n), o = x(() => e.value === void 0 ? i.href.value : e.value), {
      activate: r,
      isActivated: s,
      select: c,
      isOpen: u,
      isSelected: d,
      isIndeterminate: f,
      isGroupActivator: v,
      root: m,
      parent: g,
      openOnSelect: y,
      id: h
    } = Go(o, () => e.disabled, !1), b = Ro(), k = x(() => {
      var N;
      return e.active !== !1 && (e.active || ((N = i.isActive) == null ? void 0 : N.value) || (m.activatable.value ? s.value : d.value));
    }), p = T(() => e.link !== !1 && i.isLink.value), V = x(() => !!b && (m.selectable.value || m.activatable.value || e.value != null)), I = x(() => !e.disabled && e.link !== !1 && (e.link || i.isClickable.value || V.value)), A = x(() => b ? p.value ? "link" : V.value ? "option" : "listitem" : void 0), S = x(() => {
      if (V.value)
        return m.activatable.value ? s.value : m.selectable.value ? d.value : k.value;
    }), E = T(() => e.rounded || e.nav), P = T(() => e.color ?? e.activeColor), _ = T(() => ({
      color: k.value ? P.value ?? e.baseColor : e.baseColor,
      variant: e.variant
    }));
    X(() => {
      var N;
      return (N = i.isActive) == null ? void 0 : N.value;
    }, (N) => {
      N && D();
    }), ca(() => {
      var N;
      (N = i.isActive) != null && N.value && D();
    });
    function D() {
      g.value != null && m.open(g.value, !0), y(!0);
    }
    const {
      themeClasses: F
    } = Ae(e), {
      borderClasses: L
    } = bt(e), {
      colorClasses: R,
      colorStyles: W,
      variantClasses: K
    } = Ht(_), {
      densityClasses: te
    } = dt(e), {
      dimensionStyles: le
    } = ct(e), {
      elevationClasses: $
    } = St(e), {
      roundedClasses: Q
    } = Ue(E), M = T(() => e.lines ? `v-list-item--${e.lines}-line` : void 0), B = T(() => e.ripple !== void 0 && e.ripple && (b != null && b.filterable) ? {
      keys: ["Enter"]
    } : e.ripple), H = x(() => ({
      isActive: k.value,
      select: c,
      isOpen: u.value,
      isSelected: d.value,
      isIndeterminate: f.value
    }));
    function ie(N) {
      var Z, ve;
      l("click", N), !["INPUT", "TEXTAREA"].includes((Z = N.target) == null ? void 0 : Z.tagName) && I.value && ((ve = i.navigate) == null || ve.call(i, N), !v && (m.activatable.value ? r(!s.value, N) : (m.selectable.value || e.value != null && !p.value) && c(!d.value, N)));
    }
    function ue(N) {
      const Z = N.target;
      ["INPUT", "TEXTAREA"].includes(Z.tagName) || (N.key === "Enter" || N.key === " " && !(b != null && b.filterable)) && (N.preventDefault(), N.stopPropagation(), N.target.dispatchEvent(new MouseEvent("click", N)));
    }
    return ee(() => {
      const N = p.value ? "a" : e.tag, Z = a.title || e.title != null, ve = a.subtitle || e.subtitle != null, ke = !!(e.appendAvatar || e.appendIcon), Ce = !!(ke || a.append), me = !!(e.prependAvatar || e.prependIcon), z = !!(me || a.prepend);
      return b == null || b.updateHasPrepend(z), e.activeColor && uo("active-color", ["color", "base-color"]), $e(w(N, j(i.linkProps, {
        class: ["v-list-item", {
          "v-list-item--active": k.value,
          "v-list-item--disabled": e.disabled,
          "v-list-item--link": I.value,
          "v-list-item--nav": e.nav,
          "v-list-item--prepend": !z && (b == null ? void 0 : b.hasPrepend.value),
          "v-list-item--slim": e.slim,
          [`${e.activeClass}`]: e.activeClass && k.value
        }, F.value, L.value, R.value, te.value, $.value, M.value, Q.value, K.value, e.class],
        style: [W.value, le.value, e.style],
        tabindex: I.value ? b ? -2 : 0 : void 0,
        "aria-selected": S.value,
        role: A.value,
        onClick: ie,
        onKeydown: I.value && !p.value && ue
      }), {
        default: () => {
          var ne;
          return [Nt(I.value || k.value, "v-list-item"), z && C("div", {
            key: "prepend",
            class: "v-list-item__prepend"
          }, [a.prepend ? w(we, {
            key: "prepend-defaults",
            disabled: !me,
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
              var ae;
              return [(ae = a.prepend) == null ? void 0 : ae.call(a, H.value)];
            }
          }) : C(ce, null, [e.prependAvatar && w(At, {
            key: "prepend-avatar",
            density: e.density,
            image: e.prependAvatar
          }, null), e.prependIcon && w(Ve, {
            key: "prepend-icon",
            density: e.density,
            icon: e.prependIcon
          }, null)]), C("div", {
            class: "v-list-item__spacer"
          }, null)]), C("div", {
            class: "v-list-item__content",
            "data-no-activator": ""
          }, [Z && w(Td, {
            key: "title"
          }, {
            default: () => {
              var ae;
              return [((ae = a.title) == null ? void 0 : ae.call(a, {
                title: e.title
              })) ?? Ft(e.title)];
            }
          }), ve && w(Ad, {
            key: "subtitle"
          }, {
            default: () => {
              var ae;
              return [((ae = a.subtitle) == null ? void 0 : ae.call(a, {
                subtitle: e.subtitle
              })) ?? Ft(e.subtitle)];
            }
          }), (ne = a.default) == null ? void 0 : ne.call(a, H.value)]), Ce && C("div", {
            key: "append",
            class: "v-list-item__append"
          }, [a.append ? w(we, {
            key: "append-defaults",
            disabled: !ke,
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
              var ae;
              return [(ae = a.append) == null ? void 0 : ae.call(a, H.value)];
            }
          }) : C(ce, null, [e.appendIcon && w(Ve, {
            key: "append-icon",
            density: e.density,
            icon: e.appendIcon
          }, null), e.appendAvatar && w(At, {
            key: "append-avatar",
            density: e.density,
            image: e.appendAvatar
          }, null)]), C("div", {
            class: "v-list-item__spacer"
          }, null)])];
        }
      }), [[pt, I.value && B.value]]);
    }), {
      activate: r,
      isActivated: s,
      isGroupActivator: v,
      isSelected: d,
      list: b,
      select: c,
      root: m,
      id: h,
      link: i
    };
  }
}), Yd = O({
  color: String,
  inset: Boolean,
  sticky: Boolean,
  title: String,
  ...oe(),
  ...ge()
}, "VListSubheader"), xl = U()({
  name: "VListSubheader",
  props: Yd(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      textColorClasses: a,
      textColorStyles: l
    } = ot(() => e.color);
    return ee(() => {
      const i = !!(n.default || e.title);
      return w(e.tag, {
        class: q(["v-list-subheader", {
          "v-list-subheader--inset": e.inset,
          "v-list-subheader--sticky": e.sticky
        }, a.value, e.class]),
        style: re([{
          textColorStyles: l
        }, e.style])
      }, {
        default: () => {
          var o;
          return [i && C("div", {
            class: "v-list-subheader__text"
          }, [((o = n.default) == null ? void 0 : o.call(n)) ?? e.title])];
        }
      });
    }), {};
  }
}), Kd = O({
  color: String,
  inset: Boolean,
  length: [Number, String],
  opacity: [Number, String],
  thickness: [Number, String],
  vertical: Boolean,
  ...oe(),
  ...xe()
}, "VDivider"), Tn = U()({
  name: "VDivider",
  props: Kd(),
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const {
      themeClasses: l
    } = Ae(e), {
      textColorClasses: i,
      textColorStyles: o
    } = ot(() => e.color), r = x(() => {
      const s = {};
      return e.length && (s[e.vertical ? "height" : "width"] = J(e.length)), e.thickness && (s[e.vertical ? "borderRightWidth" : "borderTopWidth"] = J(e.thickness)), s;
    });
    return ee(() => {
      const s = C("hr", {
        class: q([{
          "v-divider": !0,
          "v-divider--inset": e.inset,
          "v-divider--vertical": e.vertical
        }, l.value, i.value, e.class]),
        style: re([r.value, o.value, {
          "--v-border-opacity": e.opacity
        }, e.style]),
        "aria-orientation": !n.role || n.role === "separator" ? e.vertical ? "vertical" : "horizontal" : void 0,
        role: `${n.role || "separator"}`
      }, null);
      return a.default ? C("div", {
        class: q(["v-divider__wrapper", {
          "v-divider__wrapper--vertical": e.vertical,
          "v-divider__wrapper--inset": e.inset
        }])
      }, [s, C("div", {
        class: "v-divider__content"
      }, [a.default()]), s]) : s;
    }), {};
  }
}), Xd = O({
  items: Array,
  returnObject: Boolean
}, "VListChildren"), nr = U()({
  name: "VListChildren",
  props: Xd(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return Mo(), () => {
      var a, l;
      return ((a = n.default) == null ? void 0 : a.call(n)) ?? ((l = e.items) == null ? void 0 : l.map((i) => {
        var f, v;
        let {
          children: o,
          props: r,
          type: s,
          raw: c
        } = i;
        if (s === "divider")
          return ((f = n.divider) == null ? void 0 : f.call(n, {
            props: r
          })) ?? w(Tn, r, null);
        if (s === "subheader")
          return ((v = n.subheader) == null ? void 0 : v.call(n, {
            props: r
          })) ?? w(xl, r, null);
        const u = {
          subtitle: n.subtitle ? (m) => {
            var g;
            return (g = n.subtitle) == null ? void 0 : g.call(n, {
              ...m,
              item: c
            });
          } : void 0,
          prepend: n.prepend ? (m) => {
            var g;
            return (g = n.prepend) == null ? void 0 : g.call(n, {
              ...m,
              item: c
            });
          } : void 0,
          append: n.append ? (m) => {
            var g;
            return (g = n.append) == null ? void 0 : g.call(n, {
              ...m,
              item: c
            });
          } : void 0,
          title: n.title ? (m) => {
            var g;
            return (g = n.title) == null ? void 0 : g.call(n, {
              ...m,
              item: c
            });
          } : void 0
        }, d = Ai.filterProps(r);
        return o ? w(Ai, j(d, {
          value: e.returnObject ? c : r == null ? void 0 : r.value,
          rawId: r == null ? void 0 : r.value
        }), {
          activator: (m) => {
            let {
              props: g
            } = m;
            const y = j(r, g, {
              value: e.returnObject ? c : r.value
            });
            return n.header ? n.header({
              props: y
            }) : w(Jt, y, u);
          },
          default: () => w(nr, {
            items: o,
            returnObject: e.returnObject
          }, n)
        }) : n.item ? n.item({
          props: r
        }) : w(Jt, j(r, {
          value: e.returnObject ? c : r.value
        }), u);
      }));
    };
  }
}), ar = O({
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
  itemType: {
    type: [Boolean, String, Array, Function],
    default: "type"
  },
  returnObject: Boolean,
  valueComparator: Function
}, "list-items"), qd = /* @__PURE__ */ new Set(["item", "divider", "subheader"]);
function Kt(e, t) {
  const n = Ne(t, e.itemTitle, t), a = Ne(t, e.itemValue, n), l = Ne(t, e.itemChildren), i = e.itemProps === !0 ? typeof t == "object" && t != null && !Array.isArray(t) ? "children" in t ? qe(t, ["children"]) : t : void 0 : Ne(t, e.itemProps);
  let o = Ne(t, e.itemType, "item");
  qd.has(o) || (o = "item");
  const r = {
    title: n,
    value: a,
    ...i
  };
  return {
    type: o,
    title: String(r.title ?? ""),
    value: r.value,
    props: r,
    children: o === "item" && Array.isArray(l) ? lr(e, l) : void 0,
    raw: t
  };
}
Kt.neededProps = ["itemTitle", "itemValue", "itemChildren", "itemProps", "itemType"];
function lr(e, t) {
  const n = Pt(e, Kt.neededProps), a = [];
  for (const l of t)
    a.push(Kt(n, l));
  return a;
}
function ir(e) {
  const t = x(() => lr(e, e.items)), n = x(() => t.value.some((r) => r.value === null)), a = G(/* @__PURE__ */ new Map()), l = G([]);
  _e(() => {
    const r = t.value, s = /* @__PURE__ */ new Map(), c = [];
    for (let u = 0; u < r.length; u++) {
      const d = r[u];
      if (Wa(d.value) || d.value === null) {
        let f = s.get(d.value);
        f || (f = [], s.set(d.value, f)), f.push(d);
      } else
        c.push(d);
    }
    a.value = s, l.value = c;
  });
  function i(r) {
    const s = a.value, c = t.value, u = l.value, d = n.value, f = e.returnObject, v = !!e.valueComparator, m = e.valueComparator || We, g = Pt(e, Kt.neededProps), y = [];
    e: for (const h of r) {
      if (!d && h === null) continue;
      if (f && typeof h == "string") {
        y.push(Kt(g, h));
        continue;
      }
      const b = s.get(h);
      if (v || !b) {
        for (const k of v ? c : u)
          if (m(h, k.value)) {
            y.push(k);
            continue e;
          }
        y.push(Kt(g, h));
        continue;
      }
      y.push(...b);
    }
    return y;
  }
  function o(r) {
    return e.returnObject ? r.map((s) => {
      let {
        raw: c
      } = s;
      return c;
    }) : r.map((s) => {
      let {
        value: c
      } = s;
      return c;
    });
  }
  return {
    items: t,
    transformIn: i,
    transformOut: o
  };
}
const Zd = /* @__PURE__ */ new Set(["item", "divider", "subheader"]);
function Qd(e, t) {
  const n = Wa(t) ? t : Ne(t, e.itemTitle), a = Wa(t) ? t : Ne(t, e.itemValue, void 0), l = Ne(t, e.itemChildren), i = e.itemProps === !0 ? qe(t, ["children"]) : Ne(t, e.itemProps);
  let o = Ne(t, e.itemType, "item");
  Zd.has(o) || (o = "item");
  const r = {
    title: n,
    value: a,
    ...i
  };
  return {
    type: o,
    title: r.title,
    value: r.value,
    props: r,
    children: o === "item" && l ? or(e, l) : void 0,
    raw: t
  };
}
function or(e, t) {
  const n = [];
  for (const a of t)
    n.push(Qd(e, a));
  return n;
}
function Jd(e) {
  return {
    items: x(() => or(e, e.items))
  };
}
const ef = O({
  baseColor: String,
  /* @deprecated */
  activeColor: String,
  activeClass: String,
  bgColor: String,
  disabled: Boolean,
  filterable: Boolean,
  expandIcon: se,
  collapseIcon: se,
  lines: {
    type: [Boolean, String],
    default: "one"
  },
  slim: Boolean,
  nav: Boolean,
  "onClick:open": Le(),
  "onClick:select": Le(),
  "onUpdate:opened": Le(),
  ...kd({
    selectStrategy: "single-leaf",
    openStrategy: "list"
  }),
  ...vt(),
  ...oe(),
  ...Me(),
  ...ut(),
  ...gt(),
  ...ar(),
  ...ze(),
  ...ge(),
  ...xe(),
  ...mt({
    variant: "text"
  })
}, "VList"), rr = U()({
  name: "VList",
  props: ef(),
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
    } = Jd(e), {
      themeClasses: l
    } = Ae(e), {
      backgroundColorClasses: i,
      backgroundColorStyles: o
    } = Xe(() => e.bgColor), {
      borderClasses: r
    } = bt(e), {
      densityClasses: s
    } = dt(e), {
      dimensionStyles: c
    } = ct(e), {
      elevationClasses: u
    } = St(e), {
      roundedClasses: d
    } = Ue(e), {
      children: f,
      open: v,
      parents: m,
      select: g,
      getPath: y
    } = Cd(e), h = T(() => e.lines ? `v-list--${e.lines}-line` : void 0), b = T(() => e.activeColor), k = T(() => e.baseColor), p = T(() => e.color), V = T(() => e.selectable || e.activatable);
    Mo({
      filterable: e.filterable
    }), nt({
      VListGroup: {
        activeColor: b,
        baseColor: k,
        color: p,
        expandIcon: T(() => e.expandIcon),
        collapseIcon: T(() => e.collapseIcon)
      },
      VListItem: {
        activeClass: T(() => e.activeClass),
        activeColor: b,
        baseColor: k,
        color: p,
        density: T(() => e.density),
        disabled: T(() => e.disabled),
        lines: T(() => e.lines),
        nav: T(() => e.nav),
        slim: T(() => e.slim),
        variant: T(() => e.variant)
      }
    });
    const I = G(!1), A = Y();
    function S(L) {
      I.value = !0;
    }
    function E(L) {
      I.value = !1;
    }
    function P(L) {
      var R;
      !I.value && !(L.relatedTarget && ((R = A.value) != null && R.contains(L.relatedTarget))) && F();
    }
    function _(L) {
      const R = L.target;
      if (!(!A.value || R.tagName === "INPUT" && ["Home", "End"].includes(L.key) || R.tagName === "TEXTAREA")) {
        if (L.key === "ArrowDown")
          F("next");
        else if (L.key === "ArrowUp")
          F("prev");
        else if (L.key === "Home")
          F("first");
        else if (L.key === "End")
          F("last");
        else
          return;
        L.preventDefault();
      }
    }
    function D(L) {
      I.value = !0;
    }
    function F(L) {
      if (A.value)
        return cn(A.value, L);
    }
    return ee(() => w(e.tag, {
      ref: A,
      class: q(["v-list", {
        "v-list--disabled": e.disabled,
        "v-list--nav": e.nav,
        "v-list--slim": e.slim
      }, l.value, i.value, r.value, s.value, u.value, h.value, d.value, e.class]),
      style: re([o.value, c.value, e.style]),
      tabindex: e.disabled ? -1 : 0,
      role: V.value ? "listbox" : "list",
      "aria-activedescendant": void 0,
      onFocusin: S,
      onFocusout: E,
      onFocus: P,
      onKeydown: _,
      onMousedown: D
    }, {
      default: () => [w(nr, {
        items: a.value,
        returnObject: e.returnObject
      }, n)]
    })), {
      open: v,
      select: g,
      focus: F,
      children: f,
      parents: m,
      getPath: y
    };
  }
});
function tf(e) {
  let {
    rootEl: t,
    isSticky: n,
    layoutItemStyles: a
  } = e;
  const l = G(!1), i = G(0), o = x(() => {
    const c = typeof l.value == "boolean" ? "top" : l.value;
    return [n.value ? {
      top: "auto",
      bottom: "auto",
      height: void 0
    } : void 0, l.value ? {
      [c]: J(i.value)
    } : {
      top: a.value.top
    }];
  });
  rt(() => {
    X(n, (c) => {
      c ? window.addEventListener("scroll", s, {
        passive: !0
      }) : window.removeEventListener("scroll", s);
    }, {
      immediate: !0
    });
  }), Ge(() => {
    window.removeEventListener("scroll", s);
  });
  let r = 0;
  function s() {
    const c = r > window.scrollY ? "up" : "down", u = t.value.getBoundingClientRect(), d = parseFloat(a.value.top ?? 0), f = window.scrollY - Math.max(0, i.value - d), v = u.height + Math.max(i.value, d) - window.scrollY - window.innerHeight, m = parseFloat(getComputedStyle(t.value).getPropertyValue("--v-body-scroll-y")) || 0;
    u.height < window.innerHeight - d ? (l.value = "top", i.value = d) : c === "up" && l.value === "bottom" || c === "down" && l.value === "top" ? (i.value = window.scrollY + u.top - m, l.value = !0) : c === "down" && v <= 0 ? (i.value = 0, l.value = "bottom") : c === "up" && f <= 0 && (m ? l.value !== "top" && (i.value = -f + m + d, l.value = "top") : (i.value = u.top + f, l.value = "top")), r = window.scrollY;
  }
  return {
    isStuck: l,
    stickyStyles: o
  };
}
const nf = 100, af = 20;
function Di(e) {
  return (e < 0 ? -1 : 1) * Math.sqrt(Math.abs(e)) * 1.41421356237;
}
function Fi(e) {
  if (e.length < 2)
    return 0;
  if (e.length === 2)
    return e[1].t === e[0].t ? 0 : (e[1].d - e[0].d) / (e[1].t - e[0].t);
  let t = 0;
  for (let n = e.length - 1; n > 0; n--) {
    if (e[n].t === e[n - 1].t)
      continue;
    const a = Di(t), l = (e[n].d - e[n - 1].d) / (e[n].t - e[n - 1].t);
    t += (l - a) * Math.abs(l), n === e.length - 1 && (t *= 0.5);
  }
  return Di(t) * 1e3;
}
function lf() {
  const e = {};
  function t(l) {
    Array.from(l.changedTouches).forEach((i) => {
      (e[i.identifier] ?? (e[i.identifier] = new lo(af))).push([l.timeStamp, i]);
    });
  }
  function n(l) {
    Array.from(l.changedTouches).forEach((i) => {
      delete e[i.identifier];
    });
  }
  function a(l) {
    var c;
    const i = (c = e[l]) == null ? void 0 : c.values().reverse();
    if (!i)
      throw new Error(`No samples for touch id ${l}`);
    const o = i[0], r = [], s = [];
    for (const u of i) {
      if (o[0] - u[0] > nf) break;
      r.push({
        t: u[0],
        d: u[1].clientX
      }), s.push({
        t: u[0],
        d: u[1].clientY
      });
    }
    return {
      x: Fi(r),
      y: Fi(s),
      get direction() {
        const {
          x: u,
          y: d
        } = this, [f, v] = [Math.abs(u), Math.abs(d)];
        return f > v && u >= 0 ? "right" : f > v && u <= 0 ? "left" : v > f && d >= 0 ? "down" : v > f && d <= 0 ? "up" : of();
      }
    };
  }
  return {
    addMovement: t,
    endTouch: n,
    getVelocity: a
  };
}
function of() {
  throw new Error();
}
function rf(e) {
  let {
    el: t,
    isActive: n,
    isTemporary: a,
    width: l,
    touchless: i,
    position: o
  } = e;
  rt(() => {
    window.addEventListener("touchstart", b, {
      passive: !0
    }), window.addEventListener("touchmove", k, {
      passive: !1
    }), window.addEventListener("touchend", p, {
      passive: !0
    });
  }), Ge(() => {
    window.removeEventListener("touchstart", b), window.removeEventListener("touchmove", k), window.removeEventListener("touchend", p);
  });
  const r = x(() => ["left", "right"].includes(o.value)), {
    addMovement: s,
    endTouch: c,
    getVelocity: u
  } = lf();
  let d = !1;
  const f = G(!1), v = G(0), m = G(0);
  let g;
  function y(I, A) {
    return (o.value === "left" ? I : o.value === "right" ? document.documentElement.clientWidth - I : o.value === "top" ? I : o.value === "bottom" ? document.documentElement.clientHeight - I : Gt()) - (A ? l.value : 0);
  }
  function h(I) {
    let A = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    const S = o.value === "left" ? (I - m.value) / l.value : o.value === "right" ? (document.documentElement.clientWidth - I - m.value) / l.value : o.value === "top" ? (I - m.value) / l.value : o.value === "bottom" ? (document.documentElement.clientHeight - I - m.value) / l.value : Gt();
    return A ? Fe(S) : S;
  }
  function b(I) {
    if (i.value) return;
    const A = I.changedTouches[0].clientX, S = I.changedTouches[0].clientY, E = 25, P = o.value === "left" ? A < E : o.value === "right" ? A > document.documentElement.clientWidth - E : o.value === "top" ? S < E : o.value === "bottom" ? S > document.documentElement.clientHeight - E : Gt(), _ = n.value && (o.value === "left" ? A < l.value : o.value === "right" ? A > document.documentElement.clientWidth - l.value : o.value === "top" ? S < l.value : o.value === "bottom" ? S > document.documentElement.clientHeight - l.value : Gt());
    (P || _ || n.value && a.value) && (g = [A, S], m.value = y(r.value ? A : S, n.value), v.value = h(r.value ? A : S), d = m.value > -20 && m.value < 80, c(I), s(I));
  }
  function k(I) {
    const A = I.changedTouches[0].clientX, S = I.changedTouches[0].clientY;
    if (d) {
      if (!I.cancelable) {
        d = !1;
        return;
      }
      const P = Math.abs(A - g[0]), _ = Math.abs(S - g[1]);
      (r.value ? P > _ && P > 3 : _ > P && _ > 3) ? (f.value = !0, d = !1) : (r.value ? _ : P) > 3 && (d = !1);
    }
    if (!f.value) return;
    I.preventDefault(), s(I);
    const E = h(r.value ? A : S, !1);
    v.value = Math.max(0, Math.min(1, E)), E > 1 ? m.value = y(r.value ? A : S, !0) : E < 0 && (m.value = y(r.value ? A : S, !1));
  }
  function p(I) {
    if (d = !1, !f.value) return;
    s(I), f.value = !1;
    const A = u(I.changedTouches[0].identifier), S = Math.abs(A.x), E = Math.abs(A.y);
    (r.value ? S > E && S > 400 : E > S && E > 3) ? n.value = A.direction === ({
      left: "right",
      right: "left",
      top: "down",
      bottom: "up"
    }[o.value] || Gt()) : n.value = v.value > 0.5;
  }
  const V = x(() => f.value ? {
    transform: o.value === "left" ? `translateX(calc(-100% + ${v.value * l.value}px))` : o.value === "right" ? `translateX(calc(100% - ${v.value * l.value}px))` : o.value === "top" ? `translateY(calc(-100% + ${v.value * l.value}px))` : o.value === "bottom" ? `translateY(calc(100% - ${v.value * l.value}px))` : Gt(),
    transition: "none"
  } : void 0);
  return Ke(f, () => {
    var S, E;
    const I = ((S = t.value) == null ? void 0 : S.style.transform) ?? null, A = ((E = t.value) == null ? void 0 : E.style.transition) ?? null;
    _e(() => {
      var P, _, D, F;
      (_ = t.value) == null || _.style.setProperty("transform", ((P = V.value) == null ? void 0 : P.transform) || "none"), (F = t.value) == null || F.style.setProperty("transition", ((D = V.value) == null ? void 0 : D.transition) || null);
    }), Be(() => {
      var P, _;
      (P = t.value) == null || P.style.setProperty("transform", I), (_ = t.value) == null || _.style.setProperty("transition", A);
    });
  }), {
    isDragging: f,
    dragProgress: v,
    dragStyles: V
  };
}
function Gt() {
  throw new Error();
}
const sr = O({
  closeDelay: [Number, String],
  openDelay: [Number, String]
}, "delay");
function ur(e, t) {
  let n = () => {
  };
  function a(o) {
    n == null || n();
    const r = Number(o ? e.openDelay : e.closeDelay);
    return new Promise((s) => {
      n = vu(r, () => {
        t == null || t(o), s(o);
      });
    });
  }
  function l() {
    return a(!0);
  }
  function i() {
    return a(!1);
  }
  return {
    clearDelay: n,
    runOpenDelay: l,
    runCloseDelay: i
  };
}
function rn() {
  const t = Ie("useScopeId").vnode.scopeId;
  return {
    scopeId: t ? {
      [t]: ""
    } : void 0
  };
}
const sf = ["start", "end", "left", "right", "top", "bottom"], uf = O({
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
    validator: (e) => sf.includes(e)
  },
  sticky: Boolean,
  ...vt(),
  ...oe(),
  ...sr(),
  ...Pn({
    mobile: null
  }),
  ...gt(),
  ...Eo(),
  ...ze(),
  ...ge({
    tag: "nav"
  }),
  ...xe()
}, "VNavigationDrawer"), Xm = U()({
  name: "VNavigationDrawer",
  props: uf(),
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
      isRtl: i
    } = Ze(), {
      themeClasses: o
    } = Ae(e), {
      borderClasses: r
    } = bt(e), {
      backgroundColorClasses: s,
      backgroundColorStyles: c
    } = Xe(() => e.color), {
      elevationClasses: u
    } = St(e), {
      displayClasses: d,
      mobile: f
    } = Tt(e), {
      roundedClasses: v
    } = Ue(e), m = Ko(), g = de(e, "modelValue", null, ($) => !!$), {
      ssrBootStyles: y
    } = In(), {
      scopeId: h
    } = rn(), b = Y(), k = G(!1), {
      runOpenDelay: p,
      runCloseDelay: V
    } = ur(e, ($) => {
      k.value = $;
    }), I = x(() => e.rail && e.expandOnHover && k.value ? Number(e.width) : Number(e.rail ? e.railWidth : e.width)), A = x(() => Ga(e.location, i.value)), S = T(() => e.persistent), E = x(() => !e.permanent && (f.value || e.temporary)), P = x(() => e.sticky && !E.value && A.value !== "bottom");
    Ke(() => e.expandOnHover && e.rail != null, () => {
      X(k, ($) => a("update:rail", !$));
    }), Ke(() => !e.disableResizeWatcher, () => {
      X(E, ($) => !e.permanent && Se(() => g.value = !$));
    }), Ke(() => !e.disableRouteWatcher && !!m, () => {
      X(m.currentRoute, () => E.value && (g.value = !1));
    }), X(() => e.permanent, ($) => {
      $ && (g.value = !0);
    }), e.modelValue == null && !E.value && (g.value = e.permanent || !f.value);
    const {
      isDragging: _,
      dragProgress: D
    } = rf({
      el: b,
      isActive: g,
      isTemporary: E,
      width: I,
      touchless: T(() => e.touchless),
      position: A
    }), F = x(() => {
      const $ = E.value ? 0 : e.rail && e.expandOnHover ? Number(e.railWidth) : I.value;
      return _.value ? $ * D.value : $;
    }), {
      layoutItemStyles: L,
      layoutItemScrimStyles: R
    } = Bo({
      id: e.name,
      order: x(() => parseInt(e.order, 10)),
      position: A,
      layoutSize: F,
      elementSize: I,
      active: ua(g),
      disableTransitions: T(() => _.value),
      absolute: x(() => (
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        e.absolute || P.value && typeof W.value != "string"
      ))
    }), {
      isStuck: W,
      stickyStyles: K
    } = tf({
      rootEl: b,
      isSticky: P,
      layoutItemStyles: L
    }), te = Xe(() => typeof e.scrim == "string" ? e.scrim : null), le = x(() => ({
      ..._.value ? {
        opacity: D.value * 0.2,
        transition: "none"
      } : void 0,
      ...R.value
    }));
    return nt({
      VList: {
        bgColor: "transparent"
      }
    }), ee(() => {
      const $ = l.image || e.image;
      return C(ce, null, [w(e.tag, j({
        ref: b,
        onMouseenter: p,
        onMouseleave: V,
        class: ["v-navigation-drawer", `v-navigation-drawer--${A.value}`, {
          "v-navigation-drawer--expand-on-hover": e.expandOnHover,
          "v-navigation-drawer--floating": e.floating,
          "v-navigation-drawer--is-hovering": k.value,
          "v-navigation-drawer--rail": e.rail,
          "v-navigation-drawer--temporary": E.value,
          "v-navigation-drawer--persistent": S.value,
          "v-navigation-drawer--active": g.value,
          "v-navigation-drawer--sticky": P.value
        }, o.value, s.value, r.value, d.value, u.value, v.value, e.class],
        style: [c.value, L.value, y.value, K.value, e.style]
      }, h, n), {
        default: () => {
          var Q, M, B;
          return [$ && C("div", {
            key: "image",
            class: "v-navigation-drawer__img"
          }, [l.image ? w(we, {
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
          }, l.image) : w(ha, {
            key: "image-img",
            alt: "",
            cover: !0,
            height: "inherit",
            src: e.image
          }, null)]), l.prepend && C("div", {
            class: "v-navigation-drawer__prepend"
          }, [(Q = l.prepend) == null ? void 0 : Q.call(l)]), C("div", {
            class: "v-navigation-drawer__content"
          }, [(M = l.default) == null ? void 0 : M.call(l)]), l.append && C("div", {
            class: "v-navigation-drawer__append"
          }, [(B = l.append) == null ? void 0 : B.call(l)])];
        }
      }), w(Vt, {
        name: "fade-transition"
      }, {
        default: () => [E.value && (_.value || g.value) && !!e.scrim && C("div", j({
          class: ["v-navigation-drawer__scrim", te.backgroundColorClasses.value],
          style: [le.value, te.backgroundColorStyles.value],
          onClick: () => {
            S.value || (g.value = !1);
          }
        }, h), null)]
      })]);
    }), {
      isStuck: W
    };
  }
}), cr = O({
  text: String,
  ...oe(),
  ...ge()
}, "VToolbarTitle"), dr = U()({
  name: "VToolbarTitle",
  props: cr(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ee(() => {
      const a = !!(n.default || n.text || e.text);
      return w(e.tag, {
        class: q(["v-toolbar-title", e.class]),
        style: re(e.style)
      }, {
        default: () => {
          var l;
          return [a && C("div", {
            class: "v-toolbar-title__placeholder"
          }, [n.text ? n.text() : e.text, (l = n.default) == null ? void 0 : l.call(n)])];
        }
      });
    }), {};
  }
}), cf = [null, "prominent", "default", "comfortable", "compact"], fr = O({
  absolute: Boolean,
  collapse: Boolean,
  color: String,
  density: {
    type: String,
    default: "default",
    validator: (e) => cf.includes(e)
  },
  extended: {
    type: Boolean,
    default: null
  },
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
  ...vt(),
  ...oe(),
  ...gt(),
  ...ze(),
  ...ge({
    tag: "header"
  }),
  ...xe()
}, "VToolbar"), Oi = U()({
  name: "VToolbar",
  props: fr(),
  setup(e, t) {
    var v;
    let {
      slots: n
    } = t;
    const {
      backgroundColorClasses: a,
      backgroundColorStyles: l
    } = Xe(() => e.color), {
      borderClasses: i
    } = bt(e), {
      elevationClasses: o
    } = St(e), {
      roundedClasses: r
    } = Ue(e), {
      themeClasses: s
    } = Ae(e), {
      rtlClasses: c
    } = Ze(), u = G(e.extended === null ? !!((v = n.extension) != null && v.call(n)) : e.extended), d = x(() => parseInt(Number(e.height) + (e.density === "prominent" ? Number(e.height) : 0) - (e.density === "comfortable" ? 8 : 0) - (e.density === "compact" ? 16 : 0), 10)), f = x(() => u.value ? parseInt(Number(e.extensionHeight) + (e.density === "prominent" ? Number(e.extensionHeight) : 0) - (e.density === "comfortable" ? 4 : 0) - (e.density === "compact" ? 8 : 0), 10) : 0);
    return nt({
      VBtn: {
        variant: "text"
      }
    }), ee(() => {
      var h;
      const m = !!(e.title || n.title), g = !!(n.image || e.image), y = (h = n.extension) == null ? void 0 : h.call(n);
      return u.value = e.extended === null ? !!y : e.extended, w(e.tag, {
        class: q(["v-toolbar", {
          "v-toolbar--absolute": e.absolute,
          "v-toolbar--collapse": e.collapse,
          "v-toolbar--flat": e.flat,
          "v-toolbar--floating": e.floating,
          [`v-toolbar--density-${e.density}`]: !0
        }, a.value, i.value, o.value, r.value, s.value, c.value, e.class]),
        style: re([l.value, e.style])
      }, {
        default: () => [g && C("div", {
          key: "image",
          class: "v-toolbar__image"
        }, [n.image ? w(we, {
          key: "image-defaults",
          disabled: !e.image,
          defaults: {
            VImg: {
              cover: !0,
              src: e.image
            }
          }
        }, n.image) : w(ha, {
          key: "image-img",
          cover: !0,
          src: e.image
        }, null)]), w(we, {
          defaults: {
            VTabs: {
              height: J(d.value)
            }
          }
        }, {
          default: () => {
            var b, k, p;
            return [C("div", {
              class: "v-toolbar__content",
              style: {
                height: J(d.value)
              }
            }, [n.prepend && C("div", {
              class: "v-toolbar__prepend"
            }, [(b = n.prepend) == null ? void 0 : b.call(n)]), m && w(dr, {
              key: "title",
              text: e.title
            }, {
              text: n.title
            }), (k = n.default) == null ? void 0 : k.call(n), n.append && C("div", {
              class: "v-toolbar__append"
            }, [(p = n.append) == null ? void 0 : p.call(n)])])];
          }
        }), w(we, {
          defaults: {
            VTabs: {
              height: J(f.value)
            }
          }
        }, {
          default: () => [w(Lo, null, {
            default: () => [u.value && C("div", {
              class: "v-toolbar__extension",
              style: {
                height: J(f.value)
              }
            }, [y])]
          })]
        })]
      });
    }), {
      contentHeight: d,
      extensionHeight: f
    };
  }
}), df = O({
  scrollTarget: {
    type: String
  },
  scrollThreshold: {
    type: [String, Number],
    default: 300
  }
}, "scroll");
function ff(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    canScroll: n
  } = t;
  let a = 0, l = 0;
  const i = Y(null), o = G(0), r = G(0), s = G(0), c = G(!1), u = G(!1), d = x(() => Number(e.scrollThreshold)), f = x(() => Fe((d.value - o.value) / d.value || 0)), v = () => {
    const m = i.value;
    if (!m || n && !n.value) return;
    a = o.value, o.value = "window" in m ? m.pageYOffset : m.scrollTop;
    const g = m instanceof Window ? document.documentElement.scrollHeight : m.scrollHeight;
    if (l !== g) {
      l = g;
      return;
    }
    u.value = o.value < a, s.value = Math.abs(o.value - d.value);
  };
  return X(u, () => {
    r.value = r.value || o.value;
  }), X(c, () => {
    r.value = 0;
  }), rt(() => {
    X(() => e.scrollTarget, (m) => {
      var y;
      const g = m ? document.querySelector(m) : window;
      if (!g) {
        tt(`Unable to locate element with identifier ${m}`);
        return;
      }
      g !== i.value && ((y = i.value) == null || y.removeEventListener("scroll", v), i.value = g, i.value.addEventListener("scroll", v, {
        passive: !0
      }));
    }, {
      immediate: !0
    });
  }), Ge(() => {
    var m;
    (m = i.value) == null || m.removeEventListener("scroll", v);
  }), n && X(n, v, {
    immediate: !0
  }), {
    scrollThreshold: d,
    currentScroll: o,
    currentThreshold: s,
    isScrollActive: c,
    scrollRatio: f,
    // required only for testing
    // probably can be removed
    // later (2 chars chlng)
    isScrollingUp: u,
    savedScroll: r
  };
}
const vf = O({
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
  ...fr(),
  ...Eo(),
  ...df(),
  height: {
    type: [Number, String],
    default: 64
  }
}, "VAppBar"), qm = U()({
  name: "VAppBar",
  props: vf(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = Y(), l = de(e, "modelValue"), i = x(() => {
      var k;
      const b = new Set(((k = e.scrollBehavior) == null ? void 0 : k.split(" ")) ?? []);
      return {
        hide: b.has("hide"),
        fullyHide: b.has("fully-hide"),
        inverted: b.has("inverted"),
        collapse: b.has("collapse"),
        elevate: b.has("elevate"),
        fadeImage: b.has("fade-image")
        // shrink: behavior.has('shrink'),
      };
    }), o = x(() => {
      const b = i.value;
      return b.hide || b.fullyHide || b.inverted || b.collapse || b.elevate || b.fadeImage || // behavior.shrink ||
      !l.value;
    }), {
      currentScroll: r,
      scrollThreshold: s,
      isScrollingUp: c,
      scrollRatio: u
    } = ff(e, {
      canScroll: o
    }), d = T(() => i.value.hide || i.value.fullyHide), f = x(() => e.collapse || i.value.collapse && (i.value.inverted ? u.value > 0 : u.value === 0)), v = x(() => e.flat || i.value.fullyHide && !l.value || i.value.elevate && (i.value.inverted ? r.value > 0 : r.value === 0)), m = x(() => i.value.fadeImage ? i.value.inverted ? 1 - u.value : u.value : void 0), g = x(() => {
      var p, V;
      if (i.value.hide && i.value.inverted) return 0;
      const b = ((p = a.value) == null ? void 0 : p.contentHeight) ?? 0, k = ((V = a.value) == null ? void 0 : V.extensionHeight) ?? 0;
      return d.value ? r.value < s.value || i.value.fullyHide ? b + k : b : b + k;
    });
    Ke(() => !!e.scrollBehavior, () => {
      _e(() => {
        d.value ? i.value.inverted ? l.value = r.value > s.value : l.value = c.value || r.value < s.value : l.value = !0;
      });
    });
    const {
      ssrBootStyles: y
    } = In(), {
      layoutItemStyles: h
    } = Bo({
      id: e.name,
      order: x(() => parseInt(e.order, 10)),
      position: T(() => e.location),
      layoutSize: g,
      elementSize: G(void 0),
      active: l,
      absolute: T(() => e.absolute)
    });
    return ee(() => {
      const b = Oi.filterProps(e);
      return w(Oi, j({
        ref: a,
        class: ["v-app-bar", {
          "v-app-bar--bottom": e.location === "bottom"
        }, e.class],
        style: [{
          ...h.value,
          "--v-toolbar-image-opacity": m.value,
          height: void 0,
          ...y.value
        }, e.style]
      }, b, {
        collapse: f.value,
        flat: v.value
      }), n);
    }), {};
  }
}), vr = O({
  baseColor: String,
  divided: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ...vt(),
  ...oe(),
  ...Me(),
  ...gt(),
  ...ze(),
  ...ge(),
  ...xe(),
  ...mt()
}, "VBtnGroup"), Li = U()({
  name: "VBtnGroup",
  props: vr(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: a
    } = Ae(e), {
      densityClasses: l
    } = dt(e), {
      borderClasses: i
    } = bt(e), {
      elevationClasses: o
    } = St(e), {
      roundedClasses: r
    } = Ue(e);
    nt({
      VBtn: {
        height: T(() => e.direction === "horizontal" ? "auto" : null),
        baseColor: T(() => e.baseColor),
        color: T(() => e.color),
        density: T(() => e.density),
        flat: !0,
        variant: T(() => e.variant)
      }
    }), ee(() => w(e.tag, {
      class: q(["v-btn-group", `v-btn-group--${e.direction}`, {
        "v-btn-group--divided": e.divided
      }, a.value, i.value, l.value, o.value, r.value, e.class]),
      style: re(e.style)
    }, n));
  }
}), kl = O({
  modelValue: {
    type: null,
    default: void 0
  },
  multiple: Boolean,
  mandatory: [Boolean, String],
  max: Number,
  selectedClass: String,
  disabled: Boolean
}, "group"), Sa = O({
  value: null,
  disabled: Boolean,
  selectedClass: String
}, "group-item");
function kn(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  const a = Ie("useGroupItem");
  if (!a)
    throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");
  const l = ft();
  Pe(Symbol.for(`${t.description}:id`), l);
  const i = ye(t, null);
  if (!i) {
    if (!n) return i;
    throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${t.description}`);
  }
  const o = T(() => e.value), r = x(() => !!(i.disabled.value || e.disabled));
  function s() {
    i == null || i.register({
      id: l,
      value: o,
      disabled: r
    }, a);
  }
  function c() {
    i == null || i.unregister(l);
  }
  rt(() => s()), Ge(() => c());
  const u = x(() => i.isSelected(l)), d = x(() => i.items.value[0].id === l), f = x(() => i.items.value[i.items.value.length - 1].id === l), v = x(() => u.value && [i.selectedClass.value, e.selectedClass]);
  return X(u, (m) => {
    a.emit("group:selected", {
      value: m
    });
  }, {
    flush: "sync"
  }), {
    id: l,
    isSelected: u,
    isFirst: d,
    isLast: f,
    toggle: () => i.select(l, !u.value),
    select: (m) => i.select(l, m),
    selectedClass: v,
    value: o,
    disabled: r,
    group: i,
    register: s,
    unregister: c
  };
}
function wa(e, t) {
  let n = !1;
  const a = Ye([]), l = de(e, "modelValue", [], (f) => f === void 0 ? [] : mr(a, f === null ? [null] : Oe(f)), (f) => {
    const v = gf(a, f);
    return e.multiple ? v : v[0];
  }), i = Ie("useGroup");
  function o(f, v) {
    const m = f, g = Symbol.for(`${t.description}:id`), h = Yt(g, i == null ? void 0 : i.vnode).indexOf(v);
    lt(m.value) === void 0 && (m.value = h, m.useIndexAsValue = !0), h > -1 ? a.splice(h, 0, m) : a.push(m);
  }
  function r(f) {
    if (n) return;
    s();
    const v = a.findIndex((m) => m.id === f);
    a.splice(v, 1);
  }
  function s() {
    const f = a.find((v) => !v.disabled);
    f && e.mandatory === "force" && !l.value.length && (l.value = [f.id]);
  }
  rt(() => {
    s();
  }), Ge(() => {
    n = !0;
  }), tu(() => {
    for (let f = 0; f < a.length; f++)
      a[f].useIndexAsValue && (a[f].value = f);
  });
  function c(f, v) {
    const m = a.find((g) => g.id === f);
    if (!(v && (m != null && m.disabled)))
      if (e.multiple) {
        const g = l.value.slice(), y = g.findIndex((b) => b === f), h = ~y;
        if (v = v ?? !h, h && e.mandatory && g.length <= 1 || !h && e.max != null && g.length + 1 > e.max) return;
        y < 0 && v ? g.push(f) : y >= 0 && !v && g.splice(y, 1), l.value = g;
      } else {
        const g = l.value.includes(f);
        if (e.mandatory && g || !g && !v) return;
        l.value = v ?? !g ? [f] : [];
      }
  }
  function u(f) {
    if (e.multiple && tt('This method is not supported when using "multiple" prop'), l.value.length) {
      const v = l.value[0], m = a.findIndex((h) => h.id === v);
      let g = (m + f) % a.length, y = a[g];
      for (; y.disabled && g !== m; )
        g = (g + f) % a.length, y = a[g];
      if (y.disabled) return;
      l.value = [a[g].id];
    } else {
      const v = a.find((m) => !m.disabled);
      v && (l.value = [v.id]);
    }
  }
  const d = {
    register: o,
    unregister: r,
    selected: l,
    select: c,
    disabled: T(() => e.disabled),
    prev: () => u(a.length - 1),
    next: () => u(1),
    isSelected: (f) => l.value.includes(f),
    selectedClass: T(() => e.selectedClass),
    items: T(() => a),
    getItemIndex: (f) => mf(a, f)
  };
  return Pe(t, d), d;
}
function mf(e, t) {
  const n = mr(e, [t]);
  return n.length ? e.findIndex((a) => a.id === n[0]) : -1;
}
function mr(e, t) {
  const n = [];
  return t.forEach((a) => {
    const l = e.find((o) => We(a, o.value)), i = e[a];
    (l == null ? void 0 : l.value) !== void 0 ? n.push(l.id) : i != null && i.useIndexAsValue && n.push(i.id);
  }), n;
}
function gf(e, t) {
  const n = [];
  return t.forEach((a) => {
    const l = e.findIndex((i) => i.id === a);
    if (~l) {
      const i = e[l];
      n.push(i.value !== void 0 ? i.value : l);
    }
  }), n;
}
const gr = Symbol.for("vuetify:v-btn-toggle"), hf = O({
  ...vr(),
  ...kl()
}, "VBtnToggle"), Zm = U()({
  name: "VBtnToggle",
  props: hf(),
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
      prev: i,
      select: o,
      selected: r
    } = wa(e, gr);
    return ee(() => {
      const s = Li.filterProps(e);
      return w(Li, j({
        class: ["v-btn-toggle", e.class]
      }, s, {
        style: e.style
      }), {
        default: () => {
          var c;
          return [(c = n.default) == null ? void 0 : c.call(n, {
            isSelected: a,
            next: l,
            prev: i,
            select: o,
            selected: r
          })];
        }
      });
    }), {
      next: l,
      prev: i,
      select: o
    };
  }
});
function hr(e, t) {
  const n = Y(), a = G(!1);
  if (il) {
    const l = new IntersectionObserver((i) => {
      a.value = !!i.find((o) => o.isIntersecting);
    }, t);
    Be(() => {
      l.disconnect();
    }), X(n, (i, o) => {
      o && (l.unobserve(o), a.value = !1), i && l.observe(i);
    }, {
      flush: "post"
    });
  }
  return {
    intersectionRef: n,
    isIntersecting: a
  };
}
const yf = O({
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
  ...oe(),
  ...on(),
  ...ge({
    tag: "div"
  }),
  ...xe()
}, "VProgressCircular"), bf = U()({
  name: "VProgressCircular",
  props: yf(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = 20, l = 2 * Math.PI * a, i = Y(), {
      themeClasses: o
    } = Ae(e), {
      sizeClasses: r,
      sizeStyles: s
    } = An(e), {
      textColorClasses: c,
      textColorStyles: u
    } = ot(() => e.color), {
      textColorClasses: d,
      textColorStyles: f
    } = ot(() => e.bgColor), {
      intersectionRef: v,
      isIntersecting: m
    } = hr(), {
      resizeRef: g,
      contentRect: y
    } = It(), h = T(() => Fe(parseFloat(e.modelValue), 0, 100)), b = T(() => Number(e.width)), k = T(() => s.value ? Number(e.size) : y.value ? y.value.width : Math.max(b.value, 32)), p = T(() => a / (1 - b.value / k.value) * 2), V = T(() => b.value / k.value * p.value), I = T(() => J((100 - h.value) / 100 * l));
    return _e(() => {
      v.value = i.value, g.value = i.value;
    }), ee(() => w(e.tag, {
      ref: i,
      class: q(["v-progress-circular", {
        "v-progress-circular--indeterminate": !!e.indeterminate,
        "v-progress-circular--visible": m.value,
        "v-progress-circular--disable-shrink": e.indeterminate && (e.indeterminate === "disable-shrink" || Ot())
      }, o.value, r.value, c.value, e.class]),
      style: re([s.value, u.value, e.style]),
      role: "progressbar",
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-valuenow": e.indeterminate ? void 0 : h.value
    }, {
      default: () => [C("svg", {
        style: {
          transform: `rotate(calc(-90deg + ${Number(e.rotate)}deg))`
        },
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: `0 0 ${p.value} ${p.value}`
      }, [C("circle", {
        class: q(["v-progress-circular__underlay", d.value]),
        style: re(f.value),
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r: a,
        "stroke-width": V.value,
        "stroke-dasharray": l,
        "stroke-dashoffset": 0
      }, null), C("circle", {
        class: "v-progress-circular__overlay",
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r: a,
        "stroke-width": V.value,
        "stroke-dasharray": l,
        "stroke-dashoffset": I.value
      }, null)]), n.default && C("div", {
        class: "v-progress-circular__content"
      }, [n.default({
        value: h.value
      })])]
    })), {};
  }
}), $i = {
  center: "center",
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, sn = O({
  location: String
}, "location");
function En(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = arguments.length > 2 ? arguments[2] : void 0;
  const {
    isRtl: a
  } = Ze();
  return {
    locationStyles: x(() => {
      if (!e.location) return {};
      const {
        side: i,
        align: o
      } = ja(e.location.split(" ").length > 1 ? e.location : `${e.location} center`, a.value);
      function r(c) {
        return n ? n(c) : 0;
      }
      const s = {};
      return i !== "center" && (t ? s[$i[i]] = `calc(100% - ${r(i)}px)` : s[i] = 0), o !== "center" ? t ? s[$i[o]] = `calc(100% - ${r(o)}px)` : s[o] = 0 : (i === "center" ? s.top = s.left = "50%" : s[{
        top: "left",
        bottom: "left",
        left: "top",
        right: "top"
      }[i]] = "50%", s.transform = {
        top: "translateX(-50%)",
        bottom: "translateX(-50%)",
        left: "translateY(-50%)",
        right: "translateY(-50%)",
        center: "translate(-50%, -50%)"
      }[i]), s;
    })
  };
}
const Sf = O({
  chunkCount: {
    type: [Number, String],
    default: null
  },
  chunkWidth: {
    type: [Number, String],
    default: null
  },
  chunkGap: {
    type: [Number, String],
    default: 4
  }
}, "chunks");
function wf(e, t) {
  const n = T(() => !!e.chunkCount || !!e.chunkWidth), a = x(() => {
    const r = je(t);
    if (!r)
      return 0;
    if (!e.chunkCount)
      return Number(e.chunkWidth);
    const s = Number(e.chunkCount);
    return (r - Number(e.chunkGap) * (s - 1)) / s;
  }), l = T(() => Number(e.chunkGap)), i = x(() => {
    if (!n.value)
      return {};
    const r = J(l.value), s = J(a.value);
    return {
      maskRepeat: "repeat-x",
      maskImage: `linear-gradient(90deg, #000, #000 ${s}, transparent ${s}, transparent)`,
      maskSize: `calc(${s} + ${r}) 100%`
    };
  });
  function o(r) {
    const s = je(t);
    if (!s)
      return r;
    const c = 100 * l.value / s, u = 100 * (a.value + l.value) / s, d = Math.floor((r + c) / u);
    return Fe(0, d * u - c / 2, 100);
  }
  return {
    hasChunks: n,
    chunksMaskStyles: i,
    snapValueToChunk: o
  };
}
const xf = O({
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
  ...Sf(),
  ...oe(),
  ...sn({
    location: "top"
  }),
  ...ze(),
  ...ge(),
  ...xe()
}, "VProgressLinear"), yr = U()({
  name: "VProgressLinear",
  props: xf(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = Y(), l = de(e, "modelValue"), {
      isRtl: i,
      rtlClasses: o
    } = Ze(), {
      themeClasses: r
    } = Ae(e), {
      locationStyles: s
    } = En(e), {
      textColorClasses: c,
      textColorStyles: u
    } = ot(() => e.color), {
      backgroundColorClasses: d,
      backgroundColorStyles: f
    } = Xe(() => e.bgColor || e.color), {
      backgroundColorClasses: v,
      backgroundColorStyles: m
    } = Xe(() => e.bufferColor || e.bgColor || e.color), {
      backgroundColorClasses: g,
      backgroundColorStyles: y
    } = Xe(() => e.color), {
      roundedClasses: h
    } = Ue(e), {
      intersectionRef: b,
      isIntersecting: k
    } = hr(), p = x(() => parseFloat(e.max)), V = x(() => parseFloat(e.height)), I = x(() => Fe(parseFloat(e.bufferValue) / p.value * 100, 0, 100)), A = x(() => Fe(parseFloat(l.value) / p.value * 100, 0, 100)), S = x(() => i.value !== e.reverse), E = x(() => e.indeterminate ? "fade-transition" : "slide-x-transition"), P = G(0), {
      hasChunks: _,
      chunksMaskStyles: D,
      snapValueToChunk: F
    } = wf(e, P);
    Ke(_, () => {
      const {
        resizeRef: K
      } = It((te) => P.value = te[0].contentRect.width);
      _e(() => K.value = a.value);
    });
    const L = x(() => _.value ? F(I.value) : I.value), R = x(() => _.value ? F(A.value) : A.value);
    function W(K) {
      if (!b.value) return;
      const {
        left: te,
        right: le,
        width: $
      } = b.value.getBoundingClientRect(), Q = S.value ? $ - K.clientX + (le - $) : K.clientX - te;
      l.value = Math.round(Q / $ * p.value);
    }
    return _e(() => {
      b.value = a.value;
    }), ee(() => w(e.tag, {
      ref: a,
      class: q(["v-progress-linear", {
        "v-progress-linear--absolute": e.absolute,
        "v-progress-linear--active": e.active && k.value,
        "v-progress-linear--reverse": S.value,
        "v-progress-linear--rounded": e.rounded,
        "v-progress-linear--rounded-bar": e.roundedBar,
        "v-progress-linear--striped": e.striped,
        "v-progress-linear--clickable": e.clickable
      }, h.value, r.value, o.value, e.class]),
      style: re([{
        bottom: e.location === "bottom" ? 0 : void 0,
        top: e.location === "top" ? 0 : void 0,
        height: e.active ? J(V.value) : 0,
        "--v-progress-linear-height": J(V.value),
        ...e.absolute ? s.value : {}
      }, D.value, e.style]),
      role: "progressbar",
      "aria-hidden": e.active ? "false" : "true",
      "aria-valuemin": "0",
      "aria-valuemax": e.max,
      "aria-valuenow": e.indeterminate ? void 0 : Math.min(parseFloat(l.value), p.value),
      onClick: e.clickable && W
    }, {
      default: () => [e.stream && C("div", {
        key: "stream",
        class: q(["v-progress-linear__stream", c.value]),
        style: {
          ...u.value,
          [S.value ? "left" : "right"]: J(-V.value),
          borderTop: `${J(V.value / 2)} dotted`,
          opacity: parseFloat(e.bufferOpacity),
          top: `calc(50% - ${J(V.value / 4)})`,
          width: J(100 - I.value, "%"),
          "--v-progress-linear-stream-to": J(V.value * (S.value ? 1 : -1))
        }
      }, null), C("div", {
        class: q(["v-progress-linear__background", d.value]),
        style: re([f.value, {
          opacity: parseFloat(e.bgOpacity),
          width: e.stream ? 0 : void 0
        }])
      }, null), C("div", {
        class: q(["v-progress-linear__buffer", v.value]),
        style: re([m.value, {
          opacity: parseFloat(e.bufferOpacity),
          width: J(L.value, "%")
        }])
      }, null), w(Vt, {
        name: E.value
      }, {
        default: () => [e.indeterminate ? C("div", {
          class: "v-progress-linear__indeterminate"
        }, [["long", "short"].map((K) => C("div", {
          key: K,
          class: q(["v-progress-linear__indeterminate", K, g.value]),
          style: re(y.value)
        }, null))]) : C("div", {
          class: q(["v-progress-linear__determinate", g.value]),
          style: re([y.value, {
            width: J(R.value, "%")
          }])
        }, null)]
      }), n.default && C("div", {
        class: "v-progress-linear__content"
      }, [n.default({
        value: A.value,
        buffer: I.value
      })])]
    })), {};
  }
}), xa = O({
  loading: [Boolean, String]
}, "loader");
function ka(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : yt();
  return {
    loaderClasses: T(() => ({
      [`${t}--loading`]: e.loading
    }))
  };
}
function Cl(e, t) {
  var a;
  let {
    slots: n
  } = t;
  return C("div", {
    class: q(`${e.name}__loader`)
  }, [((a = n.default) == null ? void 0 : a.call(n, {
    color: e.color,
    isActive: e.active
  })) || w(yr, {
    absolute: e.absolute,
    active: e.active,
    color: e.color,
    height: "2",
    indeterminate: !0
  }, null)]);
}
const kf = ["static", "relative", "fixed", "absolute", "sticky"], _n = O({
  position: {
    type: String,
    validator: (
      /* istanbul ignore next */
      (e) => kf.includes(e)
    )
  }
}, "position");
function Bn(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : yt();
  return {
    positionClasses: T(() => e.position ? `${t}--${e.position}` : void 0)
  };
}
function Cf(e, t) {
  X(() => {
    var n;
    return (n = e.isActive) == null ? void 0 : n.value;
  }, (n) => {
    e.isLink.value && n != null && t && Se(() => {
      t(n);
    });
  }, {
    immediate: !0
  });
}
const pl = O({
  active: {
    type: Boolean,
    default: void 0
  },
  activeColor: String,
  baseColor: String,
  symbol: {
    type: null,
    default: gr
  },
  flat: Boolean,
  icon: [Boolean, String, Function, Object],
  prependIcon: se,
  appendIcon: se,
  block: Boolean,
  readonly: Boolean,
  slim: Boolean,
  stacked: Boolean,
  spaced: String,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  text: {
    type: [String, Number, Boolean],
    default: void 0
  },
  ...vt(),
  ...oe(),
  ...Me(),
  ...ut(),
  ...gt(),
  ...Sa(),
  ...xa(),
  ...sn(),
  ..._n(),
  ...ze(),
  ...ba(),
  ...on(),
  ...ge({
    tag: "button"
  }),
  ...xe(),
  ...mt({
    variant: "elevated"
  })
}, "VBtn"), et = U()({
  name: "VBtn",
  props: pl(),
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
    } = Ae(e), {
      borderClasses: i
    } = bt(e), {
      densityClasses: o
    } = dt(e), {
      dimensionStyles: r
    } = ct(e), {
      elevationClasses: s
    } = St(e), {
      loaderClasses: c
    } = ka(e), {
      locationStyles: u
    } = En(e), {
      positionClasses: d
    } = Bn(e), {
      roundedClasses: f
    } = Ue(e), {
      sizeClasses: v,
      sizeStyles: m
    } = An(e), g = kn(e, e.symbol, !1), y = ya(e, n), h = x(() => {
      var _;
      return e.active !== void 0 ? e.active : y.isRouterLink.value ? (_ = y.isActive) == null ? void 0 : _.value : g == null ? void 0 : g.isSelected.value;
    }), b = T(() => h.value ? e.activeColor ?? e.color : e.color), k = x(() => {
      var D, F;
      return {
        color: (g == null ? void 0 : g.isSelected.value) && (!y.isLink.value || ((D = y.isActive) == null ? void 0 : D.value)) || !g || ((F = y.isActive) == null ? void 0 : F.value) ? b.value ?? e.baseColor : e.baseColor,
        variant: e.variant
      };
    }), {
      colorClasses: p,
      colorStyles: V,
      variantClasses: I
    } = Ht(k), A = x(() => (g == null ? void 0 : g.disabled.value) || e.disabled), S = T(() => e.variant === "elevated" && !(e.disabled || e.flat || e.border)), E = x(() => {
      if (!(e.value === void 0 || typeof e.value == "symbol"))
        return Object(e.value) === e.value ? JSON.stringify(e.value, null, 0) : e.value;
    });
    function P(_) {
      var D;
      A.value || y.isLink.value && (_.metaKey || _.ctrlKey || _.shiftKey || _.button !== 0 || n.target === "_blank") || (y.isRouterLink.value ? (D = y.navigate) == null || D.call(y, _) : g == null || g.toggle());
    }
    return Cf(y, g == null ? void 0 : g.select), ee(() => {
      const _ = y.isLink.value ? "a" : e.tag, D = !!(e.prependIcon || a.prepend), F = !!(e.appendIcon || a.append), L = !!(e.icon && e.icon !== !0);
      return $e(w(_, j(y.linkProps, {
        type: _ === "a" ? void 0 : "button",
        class: ["v-btn", g == null ? void 0 : g.selectedClass.value, {
          "v-btn--active": h.value,
          "v-btn--block": e.block,
          "v-btn--disabled": A.value,
          "v-btn--elevated": S.value,
          "v-btn--flat": e.flat,
          "v-btn--icon": !!e.icon,
          "v-btn--loading": e.loading,
          "v-btn--readonly": e.readonly,
          "v-btn--slim": e.slim,
          "v-btn--stacked": e.stacked
        }, e.spaced ? ["v-btn--spaced", `v-btn--spaced-${e.spaced}`] : [], l.value, i.value, p.value, o.value, s.value, c.value, d.value, f.value, v.value, I.value, e.class],
        style: [V.value, r.value, u.value, m.value, e.style],
        "aria-busy": e.loading ? !0 : void 0,
        disabled: A.value && _ !== "a" || void 0,
        tabindex: e.loading || e.readonly ? -1 : void 0,
        onClick: P,
        value: E.value
      }), {
        default: () => {
          var R;
          return [Nt(!0, "v-btn"), !e.icon && D && C("span", {
            key: "prepend",
            class: "v-btn__prepend"
          }, [a.prepend ? w(we, {
            key: "prepend-defaults",
            disabled: !e.prependIcon,
            defaults: {
              VIcon: {
                icon: e.prependIcon
              }
            }
          }, a.prepend) : w(Ve, {
            key: "prepend-icon",
            icon: e.prependIcon
          }, null)]), C("span", {
            class: "v-btn__content",
            "data-no-activator": ""
          }, [!a.default && L ? w(Ve, {
            key: "content-icon",
            icon: e.icon
          }, null) : w(we, {
            key: "content-defaults",
            disabled: !L,
            defaults: {
              VIcon: {
                icon: e.icon
              }
            }
          }, {
            default: () => {
              var W;
              return [((W = a.default) == null ? void 0 : W.call(a)) ?? Ft(e.text)];
            }
          })]), !e.icon && F && C("span", {
            key: "append",
            class: "v-btn__append"
          }, [a.append ? w(we, {
            key: "append-defaults",
            disabled: !e.appendIcon,
            defaults: {
              VIcon: {
                icon: e.appendIcon
              }
            }
          }, a.append) : w(Ve, {
            key: "append-icon",
            icon: e.appendIcon
          }, null)]), !!e.loading && C("span", {
            key: "loader",
            class: "v-btn__loader"
          }, [((R = a.loader) == null ? void 0 : R.call(a)) ?? w(bf, {
            color: typeof e.loading == "boolean" ? void 0 : e.loading,
            indeterminate: !0,
            width: "2"
          }, null)])];
        }
      }), [[pt, !A.value && e.ripple, "", {
        center: !!e.icon
      }]]);
    }), {
      group: g
    };
  }
}), pf = O({
  ...qe(pl({
    icon: "$menu",
    variant: "text"
  }), ["spaced"])
}, "VAppBarNavIcon"), Qm = U()({
  name: "VAppBarNavIcon",
  props: pf(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ee(() => w(et, j(e, {
      class: ["v-app-bar-nav-icon"]
    }), n)), {};
  }
}), Jm = U()({
  name: "VAppBarTitle",
  props: cr(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ee(() => w(dr, j(e, {
      class: "v-app-bar-title"
    }), n)), {};
  }
}), Vf = O({
  ...oe(),
  ...qe(od(), ["fullHeight"]),
  ...xe()
}, "VApp"), eg = U()({
  name: "VApp",
  props: Vf(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = Ae(e), {
      layoutClasses: l,
      getLayoutItem: i,
      items: o,
      layoutRef: r
    } = sd({
      ...e,
      fullHeight: !0
    }), {
      rtlClasses: s
    } = Ze();
    return ee(() => {
      var c;
      return C("div", {
        ref: r,
        class: q(["v-application", a.themeClasses.value, l.value, s.value, e.class]),
        style: re([e.style])
      }, [C("div", {
        class: "v-application__wrap"
      }, [(c = n.default) == null ? void 0 : c.call(n)])]);
    }), {
      getLayoutItem: i,
      items: o,
      theme: a
    };
  }
}), Pf = O({
  scrollable: Boolean,
  ...oe(),
  ...ut(),
  ...ge({
    tag: "main"
  })
}, "VMain"), tg = U()({
  name: "VMain",
  props: Pf(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      dimensionStyles: a
    } = ct(e), {
      mainStyles: l
    } = _o(), {
      ssrBootStyles: i
    } = In();
    return ee(() => w(e.tag, {
      class: q(["v-main", {
        "v-main--scrollable": e.scrollable
      }, e.class]),
      style: re([l.value, i.value, a.value, e.style])
    }, {
      default: () => {
        var o, r;
        return [e.scrollable ? C("div", {
          class: "v-main__scroller"
        }, [(o = n.default) == null ? void 0 : o.call(n)]) : (r = n.default) == null ? void 0 : r.call(n)];
      }
    })), {};
  }
});
function Oa(e, t) {
  return {
    x: e.x + t.x,
    y: e.y + t.y
  };
}
function If(e, t) {
  return {
    x: e.x - t.x,
    y: e.y - t.y
  };
}
function Mi(e, t) {
  if (e.side === "top" || e.side === "bottom") {
    const {
      side: n,
      align: a
    } = e, l = a === "left" ? 0 : a === "center" ? t.width / 2 : a === "right" ? t.width : a, i = n === "top" ? 0 : n === "bottom" ? t.height : n;
    return Oa({
      x: l,
      y: i
    }, t);
  } else if (e.side === "left" || e.side === "right") {
    const {
      side: n,
      align: a
    } = e, l = n === "left" ? 0 : n === "right" ? t.width : n, i = a === "top" ? 0 : a === "center" ? t.height / 2 : a === "bottom" ? t.height : a;
    return Oa({
      x: l,
      y: i
    }, t);
  }
  return Oa({
    x: t.width / 2,
    y: t.height / 2
  }, t);
}
const br = {
  static: Ef,
  // specific viewport position, usually centered
  connected: Bf
  // connected to a certain element
}, Af = O({
  locationStrategy: {
    type: [String, Function],
    default: "static",
    validator: (e) => typeof e == "function" || e in br
  },
  location: {
    type: String,
    default: "bottom"
  },
  origin: {
    type: String,
    default: "auto"
  },
  offset: [Number, String, Array],
  stickToTarget: Boolean
}, "VOverlay-location-strategies");
function Tf(e, t) {
  const n = Y({}), a = Y();
  he && Ke(() => !!(t.isActive.value && e.locationStrategy), (r) => {
    var s, c;
    X(() => e.locationStrategy, r), Be(() => {
      window.removeEventListener("resize", l), visualViewport == null || visualViewport.removeEventListener("resize", i), visualViewport == null || visualViewport.removeEventListener("scroll", o), a.value = void 0;
    }), window.addEventListener("resize", l, {
      passive: !0
    }), visualViewport == null || visualViewport.addEventListener("resize", i, {
      passive: !0
    }), visualViewport == null || visualViewport.addEventListener("scroll", o, {
      passive: !0
    }), typeof e.locationStrategy == "function" ? a.value = (s = e.locationStrategy(t, e, n)) == null ? void 0 : s.updateLocation : a.value = (c = br[e.locationStrategy](t, e, n)) == null ? void 0 : c.updateLocation;
  });
  function l(r) {
    var s;
    (s = a.value) == null || s.call(a, r);
  }
  function i(r) {
    var s;
    (s = a.value) == null || s.call(a, r);
  }
  function o(r) {
    var s;
    (s = a.value) == null || s.call(a, r);
  }
  return {
    contentStyles: n,
    updateLocation: a
  };
}
function Ef() {
}
function _f(e, t) {
  const n = cl(e);
  return t ? n.x += parseFloat(e.style.right || 0) : n.x -= parseFloat(e.style.left || 0), n.y -= parseFloat(e.style.top || 0), n;
}
function Bf(e, t, n) {
  (Array.isArray(e.target.value) || Xu(e.target.value)) && Object.assign(n.value, {
    position: "fixed",
    top: 0,
    [e.isRtl.value ? "right" : "left"]: 0
  });
  const {
    preferredAnchor: l,
    preferredOrigin: i
  } = sl(() => {
    const h = ja(t.location, e.isRtl.value), b = t.origin === "overlap" ? h : t.origin === "auto" ? Ta(h) : ja(t.origin, e.isRtl.value);
    return h.side === b.side && h.align === Ea(b).align ? {
      preferredAnchor: Xl(h),
      preferredOrigin: Xl(b)
    } : {
      preferredAnchor: h,
      preferredOrigin: b
    };
  }), [o, r, s, c] = ["minWidth", "minHeight", "maxWidth", "maxHeight"].map((h) => x(() => {
    const b = parseFloat(t[h]);
    return isNaN(b) ? 1 / 0 : b;
  })), u = x(() => {
    if (Array.isArray(t.offset))
      return t.offset;
    if (typeof t.offset == "string") {
      const h = t.offset.split(" ").map(parseFloat);
      return h.length < 2 && h.push(0), h;
    }
    return typeof t.offset == "number" ? [t.offset, 0] : [0, 0];
  });
  let d = !1, f = -1;
  const v = new lo(4), m = new ResizeObserver(() => {
    if (!d) return;
    if (requestAnimationFrame((b) => {
      b !== f && v.clear(), requestAnimationFrame((k) => {
        f = k;
      });
    }), v.isFull) {
      const b = v.values();
      if (We(b.at(-1), b.at(-3)) && !We(b.at(-1), b.at(-2)))
        return;
    }
    const h = y();
    h && v.push(h.flipped);
  });
  let g = new it({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  X(e.target, (h, b) => {
    b && !Array.isArray(b) && m.unobserve(b), Array.isArray(h) ? We(h, b) || y() : h && m.observe(h);
  }, {
    immediate: !0
  }), X(e.contentEl, (h, b) => {
    b && m.unobserve(b), h && m.observe(h);
  }, {
    immediate: !0
  }), Be(() => {
    m.disconnect();
  });
  function y() {
    if (d = !1, requestAnimationFrame(() => d = !0), !e.target.value || !e.contentEl.value) return;
    (Array.isArray(e.target.value) || e.target.value.offsetParent || e.target.value.getClientRects().length) && (g = so(e.target.value));
    const h = _f(e.contentEl.value, e.isRtl.value), b = Yn(e.contentEl.value), k = 12;
    b.length || (b.push(document.documentElement), e.contentEl.value.style.top && e.contentEl.value.style.left || (h.x -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0), h.y -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0)));
    const p = b.reduce((F, L) => {
      const R = bu(L);
      return F ? new it({
        x: Math.max(F.left, R.left),
        y: Math.max(F.top, R.top),
        width: Math.min(F.right, R.right) - Math.max(F.left, R.left),
        height: Math.min(F.bottom, R.bottom) - Math.max(F.top, R.top)
      }) : R;
    }, void 0);
    p.x += k, p.y += k, p.width -= k * 2, p.height -= k * 2;
    let V = {
      anchor: l.value,
      origin: i.value
    };
    function I(F) {
      const L = new it(h), R = Mi(F.anchor, g), W = Mi(F.origin, L);
      let {
        x: K,
        y: te
      } = If(R, W);
      switch (F.anchor.side) {
        case "top":
          te -= u.value[0];
          break;
        case "bottom":
          te += u.value[0];
          break;
        case "left":
          K -= u.value[0];
          break;
        case "right":
          K += u.value[0];
          break;
      }
      switch (F.anchor.align) {
        case "top":
          te -= u.value[1];
          break;
        case "bottom":
          te += u.value[1];
          break;
        case "left":
          K -= u.value[1];
          break;
        case "right":
          K += u.value[1];
          break;
      }
      return L.x += K, L.y += te, L.width = Math.min(L.width, s.value), L.height = Math.min(L.height, c.value), {
        overflows: Zl(L, p),
        x: K,
        y: te
      };
    }
    let A = 0, S = 0;
    const E = {
      x: 0,
      y: 0
    }, P = {
      x: !1,
      y: !1
    };
    let _ = -1;
    for (; ; ) {
      if (_++ > 10) {
        fn("Infinite loop detected in connectedLocationStrategy");
        break;
      }
      const {
        x: F,
        y: L,
        overflows: R
      } = I(V);
      A += F, S += L, h.x += F, h.y += L;
      {
        const W = ql(V.anchor), K = R.x.before || R.x.after, te = R.y.before || R.y.after;
        let le = !1;
        if (["x", "y"].forEach(($) => {
          if ($ === "x" && K && !P.x || $ === "y" && te && !P.y) {
            const Q = {
              anchor: {
                ...V.anchor
              },
              origin: {
                ...V.origin
              }
            }, M = $ === "x" ? W === "y" ? Ea : Ta : W === "y" ? Ta : Ea;
            Q.anchor = M(Q.anchor), Q.origin = M(Q.origin);
            const {
              overflows: B
            } = I(Q);
            (B[$].before <= R[$].before && B[$].after <= R[$].after || B[$].before + B[$].after < (R[$].before + R[$].after) / 2) && (V = Q, le = P[$] = !0);
          }
        }), le) continue;
      }
      R.x.before && (t.stickToTarget || (A += R.x.before), h.x += R.x.before), R.x.after && (t.stickToTarget || (A -= R.x.after), h.x -= R.x.after), R.y.before && (t.stickToTarget || (S += R.y.before), h.y += R.y.before), R.y.after && (t.stickToTarget || (S -= R.y.after), h.y -= R.y.after);
      {
        const W = Zl(h, p);
        E.x = p.width - W.x.before - W.x.after, E.y = p.height - W.y.before - W.y.after, t.stickToTarget || (A += W.x.before), h.x += W.x.before, t.stickToTarget || (S += W.y.before), h.y += W.y.before;
      }
      break;
    }
    const D = ql(V.anchor);
    return Object.assign(n.value, {
      "--v-overlay-anchor-origin": `${V.anchor.side} ${V.anchor.align}`,
      transformOrigin: `${V.origin.side} ${V.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: J(La(S)),
      left: e.isRtl.value ? void 0 : J(La(A)),
      right: e.isRtl.value ? J(La(-A)) : void 0,
      minWidth: J(D === "y" ? Math.min(o.value, g.width) : o.value),
      maxWidth: J(Ri(Fe(E.x, o.value === 1 / 0 ? 0 : o.value, s.value))),
      maxHeight: J(Ri(Fe(E.y, r.value === 1 / 0 ? 0 : r.value, c.value)))
    }), {
      available: E,
      contentBox: h,
      flipped: P
    };
  }
  return X(() => [l.value, i.value, t.offset, t.minWidth, t.minHeight, t.maxWidth, t.maxHeight], () => y()), Se(() => {
    const h = y();
    if (!h) return;
    const {
      available: b,
      contentBox: k
    } = h;
    k.height > b.y && requestAnimationFrame(() => {
      y(), requestAnimationFrame(() => {
        y();
      });
    });
  }), {
    updateLocation: y
  };
}
function La(e) {
  return Math.round(e * devicePixelRatio) / devicePixelRatio;
}
function Ri(e) {
  return Math.ceil(e * devicePixelRatio) / devicePixelRatio;
}
let Qa = !0;
const Jn = [];
function Df(e) {
  !Qa || Jn.length ? (Jn.push(e), Ja()) : (Qa = !1, e(), Ja());
}
let Ni = -1;
function Ja() {
  cancelAnimationFrame(Ni), Ni = requestAnimationFrame(() => {
    const e = Jn.shift();
    e && e(), Jn.length ? Ja() : Qa = !0;
  });
}
const Hn = {
  none: null,
  close: Lf,
  block: $f,
  reposition: Mf
}, Ff = O({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (e) => typeof e == "function" || e in Hn
  }
}, "VOverlay-scroll-strategies");
function Of(e, t) {
  if (!he) return;
  let n;
  _e(async () => {
    n == null || n.stop(), t.isActive.value && e.scrollStrategy && (n = dn(), await new Promise((a) => setTimeout(a)), n.active && n.run(() => {
      var a;
      typeof e.scrollStrategy == "function" ? e.scrollStrategy(t, e, n) : (a = Hn[e.scrollStrategy]) == null || a.call(Hn, t, e, n);
    }));
  }), Be(() => {
    n == null || n.stop();
  });
}
function Lf(e) {
  function t(n) {
    e.isActive.value = !1;
  }
  Sr(Vl(e.target.value, e.contentEl.value), t);
}
function $f(e, t) {
  var r;
  const n = (r = e.root.value) == null ? void 0 : r.offsetParent, a = Vl(e.target.value, e.contentEl.value), l = [.../* @__PURE__ */ new Set([...Yn(a, t.contained ? n : void 0), ...Yn(e.contentEl.value, t.contained ? n : void 0)])].filter((s) => !s.classList.contains("v-overlay-scroll-blocked")), i = window.innerWidth - document.documentElement.offsetWidth, o = ((s) => vl(s) && s)(n || document.documentElement);
  o && e.root.value.classList.add("v-overlay--scroll-blocked"), l.forEach((s, c) => {
    s.style.setProperty("--v-body-scroll-x", J(-s.scrollLeft)), s.style.setProperty("--v-body-scroll-y", J(-s.scrollTop)), s !== document.documentElement && s.style.setProperty("--v-scrollbar-offset", J(i)), s.classList.add("v-overlay-scroll-blocked");
  }), Be(() => {
    l.forEach((s, c) => {
      const u = parseFloat(s.style.getPropertyValue("--v-body-scroll-x")), d = parseFloat(s.style.getPropertyValue("--v-body-scroll-y")), f = s.style.scrollBehavior;
      s.style.scrollBehavior = "auto", s.style.removeProperty("--v-body-scroll-x"), s.style.removeProperty("--v-body-scroll-y"), s.style.removeProperty("--v-scrollbar-offset"), s.classList.remove("v-overlay-scroll-blocked"), s.scrollLeft = -u, s.scrollTop = -d, s.style.scrollBehavior = f;
    }), o && e.root.value.classList.remove("v-overlay--scroll-blocked");
  });
}
function Mf(e, t, n) {
  let a = !1, l = -1, i = -1;
  function o(r) {
    Df(() => {
      var u, d;
      const s = performance.now();
      (d = (u = e.updateLocation).value) == null || d.call(u, r), a = (performance.now() - s) / (1e3 / 60) > 2;
    });
  }
  i = (typeof requestIdleCallback > "u" ? (r) => r() : requestIdleCallback)(() => {
    n.run(() => {
      Sr(Vl(e.target.value, e.contentEl.value), (r) => {
        a ? (cancelAnimationFrame(l), l = requestAnimationFrame(() => {
          l = requestAnimationFrame(() => {
            o(r);
          });
        })) : o(r);
      });
    });
  }), Be(() => {
    typeof cancelIdleCallback < "u" && cancelIdleCallback(i), cancelAnimationFrame(l);
  });
}
function Vl(e, t) {
  return Array.isArray(e) ? document.elementsFromPoint(...e).find((n) => !(t != null && t.contains(n))) : e ?? t;
}
function Sr(e, t) {
  const n = [document, ...Yn(e)];
  n.forEach((a) => {
    a.addEventListener("scroll", t, {
      passive: !0
    });
  }), Be(() => {
    n.forEach((a) => {
      a.removeEventListener("scroll", t);
    });
  });
}
const el = Symbol.for("vuetify:v-menu"), Rf = O({
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
  ...sr()
}, "VOverlay-activator");
function Nf(e, t) {
  let {
    isActive: n,
    isTop: a,
    contentEl: l
  } = t;
  const i = Ie("useActivator"), o = Y();
  let r = !1, s = !1, c = !0;
  const u = x(() => e.openOnFocus || e.openOnFocus == null && e.openOnHover), d = x(() => e.openOnClick || e.openOnClick == null && !e.openOnHover && !u.value), {
    runOpenDelay: f,
    runCloseDelay: v
  } = ur(e, (S) => {
    S === (e.openOnHover && r || u.value && s) && !(e.openOnHover && n.value && !a.value) && (n.value !== S && (c = !0), n.value = S);
  }), m = Y(), g = {
    onClick: (S) => {
      S.stopPropagation(), o.value = S.currentTarget || S.target, n.value || (m.value = [S.clientX, S.clientY]), n.value = !n.value;
    },
    onMouseenter: (S) => {
      var E;
      (E = S.sourceCapabilities) != null && E.firesTouchEvents || (r = !0, o.value = S.currentTarget || S.target, f());
    },
    onMouseleave: (S) => {
      r = !1, v();
    },
    onFocus: (S) => {
      qt(S.target, ":focus-visible") !== !1 && (s = !0, S.stopPropagation(), o.value = S.currentTarget || S.target, f());
    },
    onBlur: (S) => {
      s = !1, S.stopPropagation(), v();
    }
  }, y = x(() => {
    const S = {};
    return d.value && (S.onClick = g.onClick), e.openOnHover && (S.onMouseenter = g.onMouseenter, S.onMouseleave = g.onMouseleave), u.value && (S.onFocus = g.onFocus, S.onBlur = g.onBlur), S;
  }), h = x(() => {
    const S = {};
    if (e.openOnHover && (S.onMouseenter = () => {
      r = !0, f();
    }, S.onMouseleave = () => {
      r = !1, v();
    }), u.value && (S.onFocusin = () => {
      s = !0, f();
    }, S.onFocusout = () => {
      s = !1, v();
    }), e.closeOnContentClick) {
      const E = ye(el, null);
      S.onClick = () => {
        n.value = !1, E == null || E.closeParents();
      };
    }
    return S;
  }), b = x(() => {
    const S = {};
    return e.openOnHover && (S.onMouseenter = () => {
      c && (r = !0, c = !1, f());
    }, S.onMouseleave = () => {
      r = !1, v();
    }), S;
  });
  X(a, (S) => {
    var E;
    S && (e.openOnHover && !r && (!u.value || !s) || u.value && !s && (!e.openOnHover || !r)) && !((E = l.value) != null && E.contains(document.activeElement)) && (n.value = !1);
  }), X(n, (S) => {
    S || setTimeout(() => {
      m.value = void 0;
    });
  }, {
    flush: "post"
  });
  const k = za();
  _e(() => {
    k.value && Se(() => {
      o.value = k.el;
    });
  });
  const p = za(), V = x(() => e.target === "cursor" && m.value ? m.value : p.value ? p.el : wr(e.target, i) || o.value), I = x(() => Array.isArray(V.value) ? void 0 : V.value);
  let A;
  return X(() => !!e.activator, (S) => {
    S && he ? (A = dn(), A.run(() => {
      Hf(e, i, {
        activatorEl: o,
        activatorEvents: y
      });
    })) : A && A.stop();
  }, {
    flush: "post",
    immediate: !0
  }), Be(() => {
    A == null || A.stop();
  }), {
    activatorEl: o,
    activatorRef: k,
    target: V,
    targetEl: I,
    targetRef: p,
    activatorEvents: y,
    contentEvents: h,
    scrimEvents: b
  };
}
function Hf(e, t, n) {
  let {
    activatorEl: a,
    activatorEvents: l
  } = n;
  X(() => e.activator, (s, c) => {
    if (c && s !== c) {
      const u = r(c);
      u && o(u);
    }
    s && Se(() => i());
  }, {
    immediate: !0
  }), X(() => e.activatorProps, () => {
    i();
  }), Be(() => {
    o();
  });
  function i() {
    let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : r(), c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    s && Su(s, j(l.value, c));
  }
  function o() {
    let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : r(), c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    s && wu(s, j(l.value, c));
  }
  function r() {
    let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : e.activator;
    const c = wr(s, t);
    return a.value = (c == null ? void 0 : c.nodeType) === Node.ELEMENT_NODE ? c : void 0, a.value;
  }
}
function wr(e, t) {
  var a, l;
  if (!e) return;
  let n;
  if (e === "parent") {
    let i = (l = (a = t == null ? void 0 : t.proxy) == null ? void 0 : a.$el) == null ? void 0 : l.parentNode;
    for (; i != null && i.hasAttribute("data-no-activator"); )
      i = i.parentNode;
    n = i;
  } else typeof e == "string" ? n = document.querySelector(e) : "$el" in e ? n = e.$el : n = e;
  return n;
}
function zf() {
  if (!he) return G(!1);
  const {
    ssr: e
  } = Tt();
  if (e) {
    const t = G(!1);
    return rt(() => {
      t.value = !0;
    }), t;
  } else
    return G(!0);
}
const xr = O({
  eager: Boolean
}, "lazy");
function kr(e, t) {
  const n = G(!1), a = T(() => n.value || e.eager || t.value);
  X(t, () => n.value = !0);
  function l() {
    e.eager || (n.value = !1);
  }
  return {
    isBooted: n,
    hasContent: a,
    onAfterLeave: l
  };
}
const Hi = Symbol.for("vuetify:stack"), un = Ye([]);
function Wf(e, t, n) {
  const a = Ie("useStack"), l = !n, i = ye(Hi, void 0), o = Ye({
    activeChildren: /* @__PURE__ */ new Set()
  });
  Pe(Hi, o);
  const r = G(Number(je(t)));
  Ke(e, () => {
    var d;
    const u = (d = un.at(-1)) == null ? void 0 : d[1];
    r.value = u ? u + 10 : Number(je(t)), l && un.push([a.uid, r.value]), i == null || i.activeChildren.add(a.uid), Be(() => {
      if (l) {
        const f = Ee(un).findIndex((v) => v[0] === a.uid);
        un.splice(f, 1);
      }
      i == null || i.activeChildren.delete(a.uid);
    });
  });
  const s = G(!0);
  l && _e(() => {
    var d;
    const u = ((d = un.at(-1)) == null ? void 0 : d[0]) === a.uid;
    setTimeout(() => s.value = u);
  });
  const c = T(() => !o.activeChildren.size);
  return {
    globalTop: ua(s),
    localTop: c,
    stackStyles: T(() => ({
      zIndex: r.value
    }))
  };
}
function jf(e) {
  return {
    teleportTarget: x(() => {
      const n = e();
      if (n === !0 || !he) return;
      const a = n === !1 ? document.body : typeof n == "string" ? document.querySelector(n) : n;
      if (a == null) {
        ra(`Unable to locate target ${n}`);
        return;
      }
      let l = [...a.children].find((i) => i.matches(".v-overlay-container"));
      return l || (l = document.createElement("div"), l.className = "v-overlay-container", a.appendChild(l)), l;
    })
  };
}
function Gf() {
  return !0;
}
function Cr(e, t, n) {
  if (!e || pr(e, n) === !1) return !1;
  const a = ho(t);
  if (typeof ShadowRoot < "u" && a instanceof ShadowRoot && a.host === e.target) return !1;
  const l = (typeof n.value == "object" && n.value.include || (() => []))();
  return l.push(t), !l.some((i) => i == null ? void 0 : i.contains(e.target));
}
function pr(e, t) {
  return (typeof t.value == "object" && t.value.closeConditional || Gf)(e);
}
function Uf(e, t, n) {
  const a = typeof n.value == "function" ? n.value : n.value.handler;
  e.shadowTarget = e.target, t._clickOutside.lastMousedownWasOutside && Cr(e, t, n) && setTimeout(() => {
    pr(e, n) && a && a(e);
  }, 0);
}
function zi(e, t) {
  const n = ho(e);
  t(document), typeof ShadowRoot < "u" && n instanceof ShadowRoot && t(n);
}
const Wi = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(e, t) {
    const n = (l) => Uf(l, e, t), a = (l) => {
      e._clickOutside.lastMousedownWasOutside = Cr(l, e, t);
    };
    zi(e, (l) => {
      l.addEventListener("click", n, !0), l.addEventListener("mousedown", a, !0);
    }), e._clickOutside || (e._clickOutside = {
      lastMousedownWasOutside: !1
    }), e._clickOutside[t.instance.$.uid] = {
      onClick: n,
      onMousedown: a
    };
  },
  beforeUnmount(e, t) {
    e._clickOutside && (zi(e, (n) => {
      var i;
      if (!n || !((i = e._clickOutside) != null && i[t.instance.$.uid])) return;
      const {
        onClick: a,
        onMousedown: l
      } = e._clickOutside[t.instance.$.uid];
      n.removeEventListener("click", a, !0), n.removeEventListener("mousedown", l, !0);
    }), delete e._clickOutside[t.instance.$.uid]);
  }
};
function Yf(e) {
  const {
    modelValue: t,
    color: n,
    ...a
  } = e;
  return w(Vt, {
    name: "fade-transition",
    appear: !0
  }, {
    default: () => [e.modelValue && C("div", j({
      class: ["v-overlay__scrim", e.color.backgroundColorClasses.value],
      style: e.color.backgroundColorStyles.value
    }, a), null)]
  });
}
const Ca = O({
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
  ...Rf(),
  ...oe(),
  ...ut(),
  ...xr(),
  ...Af(),
  ...Ff(),
  ...xe(),
  ...ln()
}, "VOverlay"), en = U()({
  name: "VOverlay",
  directives: {
    vClickOutside: Wi
  },
  inheritAttrs: !1,
  props: {
    _disableGlobalStack: Boolean,
    ...Ca()
  },
  emits: {
    "click:outside": (e) => !0,
    "update:modelValue": (e) => !0,
    keydown: (e) => !0,
    afterEnter: () => !0,
    afterLeave: () => !0
  },
  setup(e, t) {
    let {
      slots: n,
      attrs: a,
      emit: l
    } = t;
    const i = Ie("VOverlay"), o = Y(), r = Y(), s = Y(), c = de(e, "modelValue"), u = x({
      get: () => c.value,
      set: (N) => {
        N && e.disabled || (c.value = N);
      }
    }), {
      themeClasses: d
    } = Ae(e), {
      rtlClasses: f,
      isRtl: v
    } = Ze(), {
      hasContent: m,
      onAfterLeave: g
    } = kr(e, u), y = Xe(() => typeof e.scrim == "string" ? e.scrim : null), {
      globalTop: h,
      localTop: b,
      stackStyles: k
    } = Wf(u, () => e.zIndex, e._disableGlobalStack), {
      activatorEl: p,
      activatorRef: V,
      target: I,
      targetEl: A,
      targetRef: S,
      activatorEvents: E,
      contentEvents: P,
      scrimEvents: _
    } = Nf(e, {
      isActive: u,
      isTop: b,
      contentEl: s
    }), {
      teleportTarget: D
    } = jf(() => {
      var ve, ke, Ce;
      const N = e.attach || e.contained;
      if (N) return N;
      const Z = ((ve = p == null ? void 0 : p.value) == null ? void 0 : ve.getRootNode()) || ((Ce = (ke = i.proxy) == null ? void 0 : ke.$el) == null ? void 0 : Ce.getRootNode());
      return Z instanceof ShadowRoot ? Z : !1;
    }), {
      dimensionStyles: F
    } = ct(e), L = zf(), {
      scopeId: R
    } = rn();
    X(() => e.disabled, (N) => {
      N && (u.value = !1);
    });
    const {
      contentStyles: W,
      updateLocation: K
    } = Tf(e, {
      isRtl: v,
      contentEl: s,
      target: I,
      isActive: u
    });
    Of(e, {
      root: o,
      contentEl: s,
      targetEl: A,
      target: I,
      isActive: u,
      updateLocation: K
    });
    function te(N) {
      l("click:outside", N), e.persistent ? H() : u.value = !1;
    }
    function le(N) {
      return u.value && h.value && // If using scrim, only close if clicking on it rather than anything opened on top
      (!e.scrim || N.target === r.value || N instanceof MouseEvent && N.shadowTarget === r.value);
    }
    he && X(u, (N) => {
      N ? window.addEventListener("keydown", $) : window.removeEventListener("keydown", $);
    }, {
      immediate: !0
    }), Ge(() => {
      he && window.removeEventListener("keydown", $);
    });
    function $(N) {
      var Z, ve, ke;
      N.key === "Escape" && h.value && ((Z = s.value) != null && Z.contains(document.activeElement) || l("keydown", N), e.persistent ? H() : (u.value = !1, (ve = s.value) != null && ve.contains(document.activeElement) && ((ke = p.value) == null || ke.focus())));
    }
    function Q(N) {
      N.key === "Escape" && !h.value || l("keydown", N);
    }
    const M = Ko();
    Ke(() => e.closeOnBack, () => {
      Nd(M, (N) => {
        h.value && u.value ? (N(!1), e.persistent ? H() : u.value = !1) : N();
      });
    });
    const B = Y();
    X(() => u.value && (e.absolute || e.contained) && D.value == null, (N) => {
      if (N) {
        const Z = yo(o.value);
        Z && Z !== document.scrollingElement && (B.value = Z.scrollTop);
      }
    });
    function H() {
      e.noClickAnimation || s.value && kt(s.value, [{
        transformOrigin: "center"
      }, {
        transform: "scale(1.03)"
      }, {
        transformOrigin: "center"
      }], {
        duration: 150,
        easing: mn
      });
    }
    function ie() {
      l("afterEnter");
    }
    function ue() {
      g(), l("afterLeave");
    }
    return ee(() => {
      var N;
      return C(ce, null, [(N = n.activator) == null ? void 0 : N.call(n, {
        isActive: u.value,
        targetRef: S,
        props: j({
          ref: V
        }, E.value, e.activatorProps)
      }), L.value && m.value && w(nu, {
        disabled: !D.value,
        to: D.value
      }, {
        default: () => [C("div", j({
          class: ["v-overlay", {
            "v-overlay--absolute": e.absolute || e.contained,
            "v-overlay--active": u.value,
            "v-overlay--contained": e.contained
          }, d.value, f.value, e.class],
          style: [k.value, {
            "--v-overlay-opacity": e.opacity,
            top: J(B.value)
          }, e.style],
          ref: o,
          onKeydown: Q
        }, R, a), [w(Yf, j({
          color: y,
          modelValue: u.value && !!e.scrim,
          ref: r
        }, _.value), null), w(Ct, {
          appear: !0,
          persisted: !0,
          transition: e.transition,
          target: I.value,
          onAfterEnter: ie,
          onAfterLeave: ue
        }, {
          default: () => {
            var Z;
            return [$e(C("div", j({
              ref: s,
              class: ["v-overlay__content", e.contentClass],
              style: [F.value, W.value]
            }, P.value, e.contentProps), [(Z = n.default) == null ? void 0 : Z.call(n, {
              isActive: u
            })]), [[Rt, u.value], [Wi, {
              handler: te,
              closeConditional: le,
              include: () => [p.value]
            }]])];
          }
        })])]
      })]);
    }), {
      activatorEl: p,
      scrimEl: r,
      target: I,
      animateClick: H,
      contentEl: s,
      globalTop: h,
      localTop: b,
      updateLocation: K
    };
  }
}), $a = Symbol("Forwarded refs");
function Ma(e, t) {
  let n = e;
  for (; n; ) {
    const a = Reflect.getOwnPropertyDescriptor(n, t);
    if (a) return a;
    n = Object.getPrototypeOf(n);
  }
}
function wt(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
    n[a - 1] = arguments[a];
  return e[$a] = n, new Proxy(e, {
    get(l, i) {
      if (Reflect.has(l, i))
        return Reflect.get(l, i);
      if (!(typeof i == "symbol" || i.startsWith("$") || i.startsWith("__"))) {
        for (const o of n)
          if (o.value && Reflect.has(o.value, i)) {
            const r = Reflect.get(o.value, i);
            return typeof r == "function" ? r.bind(o.value) : r;
          }
      }
    },
    has(l, i) {
      if (Reflect.has(l, i))
        return !0;
      if (typeof i == "symbol" || i.startsWith("$") || i.startsWith("__")) return !1;
      for (const o of n)
        if (o.value && Reflect.has(o.value, i))
          return !0;
      return !1;
    },
    set(l, i, o) {
      if (Reflect.has(l, i))
        return Reflect.set(l, i, o);
      if (typeof i == "symbol" || i.startsWith("$") || i.startsWith("__")) return !1;
      for (const r of n)
        if (r.value && Reflect.has(r.value, i))
          return Reflect.set(r.value, i, o);
      return !1;
    },
    getOwnPropertyDescriptor(l, i) {
      var r;
      const o = Reflect.getOwnPropertyDescriptor(l, i);
      if (o) return o;
      if (!(typeof i == "symbol" || i.startsWith("$") || i.startsWith("__"))) {
        for (const s of n) {
          if (!s.value) continue;
          const c = Ma(s.value, i) ?? ("_" in s.value ? Ma((r = s.value._) == null ? void 0 : r.setupState, i) : void 0);
          if (c) return c;
        }
        for (const s of n) {
          const c = s.value && s.value[$a];
          if (!c) continue;
          const u = c.slice();
          for (; u.length; ) {
            const d = u.shift(), f = Ma(d.value, i);
            if (f) return f;
            const v = d.value && d.value[$a];
            v && u.push(...v);
          }
        }
      }
    }
  });
}
const Kf = O({
  // TODO
  // disableKeys: Boolean,
  id: String,
  submenu: Boolean,
  disableInitialFocus: Boolean,
  ...qe(Ca({
    closeDelay: 250,
    closeOnContentClick: !0,
    locationStrategy: "connected",
    location: void 0,
    openDelay: 300,
    scrim: !1,
    scrollStrategy: "reposition",
    transition: {
      component: yl
    }
  }), ["absolute"])
}, "VMenu"), Vr = U()({
  name: "VMenu",
  props: Kf(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = de(e, "modelValue"), {
      scopeId: l
    } = rn(), {
      isRtl: i
    } = Ze(), o = ft(), r = T(() => e.id || `v-menu-${o}`), s = Y(), c = ye(el, null), u = G(/* @__PURE__ */ new Set());
    Pe(el, {
      register() {
        u.value.add(o);
      },
      unregister() {
        u.value.delete(o);
      },
      closeParents(y) {
        setTimeout(() => {
          var h;
          !u.value.size && !e.persistent && (y == null || (h = s.value) != null && h.contentEl && !mu(y, s.value.contentEl)) && (a.value = !1, c == null || c.closeParents());
        }, 40);
      }
    }), Ge(() => {
      c == null || c.unregister(), document.removeEventListener("focusin", d);
    }), Zi(() => a.value = !1);
    async function d(y) {
      var k, p, V;
      const h = y.relatedTarget, b = y.target;
      await Se(), a.value && h !== b && ((k = s.value) != null && k.contentEl) && // We're the topmost menu
      ((p = s.value) != null && p.globalTop) && // It isn't the document or the menu body
      ![document, s.value.contentEl].includes(b) && // It isn't inside the menu body
      !s.value.contentEl.contains(b) && ((V = Xt(s.value.contentEl)[0]) == null || V.focus());
    }
    X(a, (y) => {
      y ? (c == null || c.register(), he && !e.disableInitialFocus && document.addEventListener("focusin", d, {
        once: !0
      })) : (c == null || c.unregister(), he && document.removeEventListener("focusin", d));
    }, {
      immediate: !0
    });
    function f(y) {
      c == null || c.closeParents(y);
    }
    function v(y) {
      var h, b, k, p, V;
      if (!e.disabled)
        if (y.key === "Tab" || y.key === "Enter" && !e.closeOnContentClick) {
          if (y.key === "Enter" && (y.target instanceof HTMLTextAreaElement || y.target instanceof HTMLInputElement && y.target.closest("form"))) return;
          y.key === "Enter" && y.preventDefault(), oo(Xt((h = s.value) == null ? void 0 : h.contentEl, !1), y.shiftKey ? "prev" : "next", (A) => A.tabIndex >= 0) || (a.value = !1, (k = (b = s.value) == null ? void 0 : b.activatorEl) == null || k.focus());
        } else e.submenu && y.key === (i.value ? "ArrowRight" : "ArrowLeft") && (a.value = !1, (V = (p = s.value) == null ? void 0 : p.activatorEl) == null || V.focus());
    }
    function m(y) {
      var b;
      if (e.disabled) return;
      const h = (b = s.value) == null ? void 0 : b.contentEl;
      h && a.value ? y.key === "ArrowDown" ? (y.preventDefault(), y.stopImmediatePropagation(), cn(h, "next")) : y.key === "ArrowUp" ? (y.preventDefault(), y.stopImmediatePropagation(), cn(h, "prev")) : e.submenu && (y.key === (i.value ? "ArrowRight" : "ArrowLeft") ? a.value = !1 : y.key === (i.value ? "ArrowLeft" : "ArrowRight") && (y.preventDefault(), cn(h, "first"))) : (e.submenu ? y.key === (i.value ? "ArrowLeft" : "ArrowRight") : ["ArrowDown", "ArrowUp"].includes(y.key)) && (a.value = !0, y.preventDefault(), setTimeout(() => setTimeout(() => m(y))));
    }
    const g = x(() => j({
      "aria-haspopup": "menu",
      "aria-expanded": String(a.value),
      "aria-controls": r.value,
      onKeydown: m
    }, e.activatorProps));
    return ee(() => {
      const y = en.filterProps(e);
      return w(en, j({
        ref: s,
        id: r.value,
        class: ["v-menu", e.class],
        style: e.style
      }, y, {
        modelValue: a.value,
        "onUpdate:modelValue": (h) => a.value = h,
        absolute: !0,
        activatorProps: g.value,
        location: e.location ?? (e.submenu ? "end" : "bottom"),
        "onClick:outside": f,
        onKeydown: v
      }, l), {
        activator: n.activator,
        default: function() {
          for (var h = arguments.length, b = new Array(h), k = 0; k < h; k++)
            b[k] = arguments[k];
          return w(we, {
            root: "VMenu"
          }, {
            default: () => {
              var p;
              return [(p = n.default) == null ? void 0 : p.call(n, ...b)];
            }
          });
        }
      });
    }), wt({
      id: r,
      ΨopenChildren: u
    }, s);
  }
});
function Xf(e) {
  const t = G(e());
  let n = -1;
  function a() {
    clearInterval(n);
  }
  function l() {
    a(), Se(() => t.value = e());
  }
  function i(o) {
    const r = o ? getComputedStyle(o) : {
      transitionDuration: 0.2
    }, s = parseFloat(r.transitionDuration) * 1e3 || 200;
    if (a(), t.value <= 0) return;
    const c = performance.now();
    n = window.setInterval(() => {
      const u = performance.now() - c + s;
      t.value = Math.max(e() - u, 0), t.value <= 0 && a();
    }, s);
  }
  return Be(a), {
    clear: a,
    time: t,
    start: i,
    reset: l
  };
}
const qf = O({
  multiLine: Boolean,
  text: String,
  timer: [Boolean, String],
  timeout: {
    type: [Number, String],
    default: 5e3
  },
  vertical: Boolean,
  ...sn({
    location: "bottom"
  }),
  ..._n(),
  ...ze(),
  ...mt(),
  ...xe(),
  ...qe(Ca({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy", "stickToTarget"])
}, "VSnackbar"), ng = U()({
  name: "VSnackbar",
  props: qf(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = de(e, "modelValue"), {
      positionClasses: l
    } = Bn(e), {
      scopeId: i
    } = rn(), {
      themeClasses: o
    } = Ae(e), {
      colorClasses: r,
      colorStyles: s,
      variantClasses: c
    } = Ht(e), {
      roundedClasses: u
    } = Ue(e), d = Xf(() => Number(e.timeout)), f = Y(), v = Y(), m = G(!1), g = G(0), y = Y(), h = ye(bn, void 0);
    Ke(() => !!h, () => {
      const _ = _o();
      _e(() => {
        y.value = _.mainStyles.value;
      });
    }), X(a, k), X(() => e.timeout, k), rt(() => {
      a.value && k();
    });
    let b = -1;
    function k() {
      d.reset(), window.clearTimeout(b);
      const _ = Number(e.timeout);
      if (!a.value || _ === -1) return;
      const D = ol(v.value);
      d.start(D), b = window.setTimeout(() => {
        a.value = !1;
      }, _);
    }
    function p() {
      d.reset(), window.clearTimeout(b);
    }
    function V() {
      m.value = !0, p();
    }
    function I() {
      m.value = !1, k();
    }
    function A(_) {
      g.value = _.touches[0].clientY;
    }
    function S(_) {
      Math.abs(g.value - _.changedTouches[0].clientY) > 50 && (a.value = !1);
    }
    function E() {
      m.value && I();
    }
    const P = x(() => e.location.split(" ").reduce((_, D) => (_[`v-snackbar--${D}`] = !0, _), {}));
    return ee(() => {
      const _ = en.filterProps(e), D = !!(n.default || n.text || e.text);
      return w(en, j({
        ref: f,
        class: ["v-snackbar", {
          "v-snackbar--active": a.value,
          "v-snackbar--multi-line": e.multiLine && !e.vertical,
          "v-snackbar--timer": !!e.timer,
          "v-snackbar--vertical": e.vertical
        }, P.value, l.value, e.class],
        style: [y.value, e.style]
      }, _, {
        modelValue: a.value,
        "onUpdate:modelValue": (F) => a.value = F,
        contentProps: j({
          class: ["v-snackbar__wrapper", o.value, r.value, u.value, c.value],
          style: [s.value],
          onPointerenter: V,
          onPointerleave: I
        }, _.contentProps),
        persistent: !0,
        noClickAnimation: !0,
        scrim: !1,
        scrollStrategy: "none",
        _disableGlobalStack: !0,
        onTouchstartPassive: A,
        onTouchend: S,
        onAfterLeave: E
      }, i), {
        default: () => {
          var F, L;
          return [Nt(!1, "v-snackbar"), e.timer && !m.value && C("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [w(yr, {
            ref: v,
            color: typeof e.timer == "string" ? e.timer : "info",
            max: e.timeout,
            modelValue: d.time.value
          }, null)]), D && C("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((F = n.text) == null ? void 0 : F.call(n)) ?? e.text, (L = n.default) == null ? void 0 : L.call(n)]), n.actions && w(we, {
            defaults: {
              VBtn: {
                variant: "text",
                ripple: !1,
                slim: !0
              }
            }
          }, {
            default: () => [C("div", {
              class: "v-snackbar__actions"
            }, [n.actions({
              isActive: a
            })])]
          })];
        },
        activator: n.activator
      });
    }), wt({}, f);
  }
}), Zf = (e) => {
  const {
    touchstartX: t,
    touchendX: n,
    touchstartY: a,
    touchendY: l
  } = e, i = 0.5, o = 16;
  e.offsetX = n - t, e.offsetY = l - a, Math.abs(e.offsetY) < i * Math.abs(e.offsetX) && (e.left && n < t - o && e.left(e), e.right && n > t + o && e.right(e)), Math.abs(e.offsetX) < i * Math.abs(e.offsetY) && (e.up && l < a - o && e.up(e), e.down && l > a + o && e.down(e));
};
function Qf(e, t) {
  var a;
  const n = e.changedTouches[0];
  t.touchstartX = n.clientX, t.touchstartY = n.clientY, (a = t.start) == null || a.call(t, {
    originalEvent: e,
    ...t
  });
}
function Jf(e, t) {
  var a;
  const n = e.changedTouches[0];
  t.touchendX = n.clientX, t.touchendY = n.clientY, (a = t.end) == null || a.call(t, {
    originalEvent: e,
    ...t
  }), Zf(t);
}
function ev(e, t) {
  var a;
  const n = e.changedTouches[0];
  t.touchmoveX = n.clientX, t.touchmoveY = n.clientY, (a = t.move) == null || a.call(t, {
    originalEvent: e,
    ...t
  });
}
function tv() {
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
    touchstart: (n) => Qf(n, t),
    touchend: (n) => Jf(n, t),
    touchmove: (n) => ev(n, t)
  };
}
function nv(e, t) {
  var r;
  const n = t.value, a = n != null && n.parent ? e.parentElement : e, l = (n == null ? void 0 : n.options) ?? {
    passive: !0
  }, i = (r = t.instance) == null ? void 0 : r.$.uid;
  if (!a || i === void 0) return;
  const o = tv(t.value);
  a._touchHandlers = a._touchHandlers ?? /* @__PURE__ */ Object.create(null), a._touchHandlers[i] = o, to(o).forEach((s) => {
    a.addEventListener(s, o[s], l);
  });
}
function av(e, t) {
  var i, o;
  const n = (i = t.value) != null && i.parent ? e.parentElement : e, a = (o = t.instance) == null ? void 0 : o.$.uid;
  if (!(n != null && n._touchHandlers) || a === void 0) return;
  const l = n._touchHandlers[a];
  to(l).forEach((r) => {
    n.removeEventListener(r, l[r]);
  }), delete n._touchHandlers[a];
}
const tl = {
  mounted: nv,
  unmounted: av
}, Pr = Symbol.for("vuetify:v-window"), Ir = Symbol.for("vuetify:v-window-group"), Ar = O({
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
  verticalArrows: [Boolean, String],
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
  crossfade: Boolean,
  transitionDuration: Number,
  ...oe(),
  ...ge(),
  ...xe()
}, "VWindow"), ji = U()({
  name: "VWindow",
  directives: {
    vTouch: tl
  },
  props: Ar(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: a
    } = Ae(e), {
      isRtl: l
    } = Ze(), {
      t: i
    } = st(), o = wa(e, Ir), r = Y(), s = x(() => l.value ? !e.reverse : e.reverse), c = G(!1), u = x(() => {
      if (e.crossfade)
        return "v-window-crossfade-transition";
      const p = e.direction === "vertical" ? "y" : "x", I = (s.value ? !c.value : c.value) ? "-reverse" : "";
      return `v-window-${p}${I}-transition`;
    }), d = G(0), f = Y(void 0), v = x(() => o.items.value.findIndex((p) => o.selected.value.includes(p.id)));
    X(v, (p, V) => {
      const I = o.items.value.length, A = I - 1;
      I <= 2 ? c.value = p < V : p === A && V === 0 ? c.value = !0 : p === 0 && V === A ? c.value = !1 : c.value = p < V;
    }), Pe(Pr, {
      transition: u,
      isReversed: c,
      transitionCount: d,
      transitionHeight: f,
      rootRef: r
    });
    const m = T(() => e.continuous || v.value !== 0), g = T(() => e.continuous || v.value !== o.items.value.length - 1);
    function y() {
      m.value && o.prev();
    }
    function h() {
      g.value && o.next();
    }
    const b = x(() => {
      const p = [], V = {
        icon: l.value ? e.nextIcon : e.prevIcon,
        class: `v-window__${s.value ? "right" : "left"}`,
        onClick: o.prev,
        "aria-label": i("$vuetify.carousel.prev")
      };
      p.push(m.value ? n.prev ? n.prev({
        props: V
      }) : w(et, V, null) : C("div", null, null));
      const I = {
        icon: l.value ? e.prevIcon : e.nextIcon,
        class: `v-window__${s.value ? "left" : "right"}`,
        onClick: o.next,
        "aria-label": i("$vuetify.carousel.next")
      };
      return p.push(g.value ? n.next ? n.next({
        props: I
      }) : w(et, I, null) : C("div", null, null)), p;
    }), k = x(() => e.touch === !1 ? e.touch : {
      ...{
        left: () => {
          s.value ? y() : h();
        },
        right: () => {
          s.value ? h() : y();
        },
        start: (V) => {
          let {
            originalEvent: I
          } = V;
          I.stopPropagation();
        }
      },
      ...e.touch === !0 ? {} : e.touch
    });
    return ee(() => $e(w(e.tag, {
      ref: r,
      class: q(["v-window", {
        "v-window--show-arrows-on-hover": e.showArrows === "hover",
        "v-window--vertical-arrows": !!e.verticalArrows,
        "v-window--crossfade": !!e.crossfade
      }, a.value, e.class]),
      style: re([e.style, e.transitionDuration && !Ot ? {
        "--v-window-transition-duration": J(e.transitionDuration, "ms")
      } : void 0])
    }, {
      default: () => {
        var p, V;
        return [C("div", {
          class: "v-window__container",
          style: {
            height: f.value
          }
        }, [(p = n.default) == null ? void 0 : p.call(n, {
          group: o
        }), e.showArrows !== !1 && C("div", {
          class: q(["v-window__controls", {
            "v-window__controls--left": e.verticalArrows === "left" || e.verticalArrows === !0
          }, {
            "v-window__controls--right": e.verticalArrows === "right"
          }])
        }, [b.value])]), (V = n.additional) == null ? void 0 : V.call(n, {
          group: o
        })];
      }
    }), [[tl, k.value]])), {
      group: o
    };
  }
}), Tr = O({
  reverseTransition: {
    type: [Boolean, String],
    default: void 0
  },
  transition: {
    type: [Boolean, String],
    default: void 0
  },
  ...oe(),
  ...Sa(),
  ...xr()
}, "VWindowItem"), Gi = U()({
  name: "VWindowItem",
  directives: {
    vTouch: tl
  },
  props: Tr(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = ye(Pr), l = kn(e, Ir), {
      isBooted: i
    } = In();
    if (!a || !l) throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const o = G(!1), r = x(() => i.value && (a.isReversed.value ? e.reverseTransition !== !1 : e.transition !== !1));
    function s() {
      !o.value || !a || (o.value = !1, a.transitionCount.value > 0 && (a.transitionCount.value -= 1, a.transitionCount.value === 0 && (a.transitionHeight.value = void 0)));
    }
    function c() {
      var m;
      o.value || !a || (o.value = !0, a.transitionCount.value === 0 && (a.transitionHeight.value = J((m = a.rootRef.value) == null ? void 0 : m.clientHeight)), a.transitionCount.value += 1);
    }
    function u() {
      s();
    }
    function d(m) {
      o.value && Se(() => {
        !r.value || !o.value || !a || (a.transitionHeight.value = J(m.clientHeight));
      });
    }
    const f = x(() => {
      const m = a.isReversed.value ? e.reverseTransition : e.transition;
      return r.value ? {
        name: typeof m != "string" ? a.transition.value : m,
        onBeforeEnter: c,
        onAfterEnter: s,
        onEnterCancelled: u,
        onBeforeLeave: c,
        onAfterLeave: s,
        onLeaveCancelled: u,
        onEnter: d
      } : !1;
    }), {
      hasContent: v
    } = kr(e, l.isSelected);
    return ee(() => w(Ct, {
      transition: f.value,
      disabled: !i.value
    }, {
      default: () => {
        var m;
        return [$e(C("div", {
          class: q(["v-window-item", l.selectedClass.value, e.class]),
          style: re(e.style)
        }, [v.value && ((m = n.default) == null ? void 0 : m.call(n))]), [[Rt, l.isSelected.value]])];
      }
    })), {
      groupItem: l
    };
  }
}), lv = O({
  active: Boolean,
  disabled: Boolean,
  max: [Number, String],
  value: {
    type: [Number, String],
    default: 0
  },
  ...oe(),
  ...ln({
    transition: {
      component: Oo
    }
  })
}, "VCounter"), Er = U()({
  name: "VCounter",
  functional: !0,
  props: lv(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = T(() => e.max ? `${e.value} / ${e.max}` : String(e.value));
    return ee(() => w(Ct, {
      transition: e.transition
    }, {
      default: () => [$e(C("div", {
        class: q(["v-counter", {
          "text-error": e.max && !e.disabled && parseFloat(e.value) > parseFloat(e.max)
        }, e.class]),
        style: re(e.style)
      }, [n.default ? n.default({
        counter: a.value,
        max: e.max,
        value: e.value
      }) : a.value]), [[Rt, e.active]])]
    })), {};
  }
}), iv = O({
  text: String,
  onClick: Le(),
  ...oe(),
  ...xe()
}, "VLabel"), _r = U()({
  name: "VLabel",
  props: iv(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ee(() => {
      var a;
      return C("label", {
        class: q(["v-label", {
          "v-label--clickable": !!e.onClick
        }, e.class]),
        style: re(e.style),
        onClick: e.onClick
      }, [e.text, (a = n.default) == null ? void 0 : a.call(n)]);
    }), {};
  }
}), ov = O({
  floating: Boolean,
  ...oe()
}, "VFieldLabel"), Rn = U()({
  name: "VFieldLabel",
  props: ov(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ee(() => w(_r, {
      class: q(["v-field-label", {
        "v-field-label--floating": e.floating
      }, e.class]),
      style: re(e.style)
    }, n)), {};
  }
});
function Br(e) {
  const {
    t
  } = st();
  function n(a) {
    let {
      name: l,
      color: i,
      ...o
    } = a;
    const r = {
      prepend: "prependAction",
      prependInner: "prependAction",
      append: "appendAction",
      appendInner: "appendAction",
      clear: "clear"
    }[l], s = e[`onClick:${l}`];
    function c(d) {
      d.key !== "Enter" && d.key !== " " || (d.preventDefault(), d.stopPropagation(), fa(s, new PointerEvent("click", d)));
    }
    const u = s && r ? t(`$vuetify.input.${r}`, e.label ?? "") : void 0;
    return w(Ve, j({
      icon: e[`${l}Icon`],
      "aria-label": u,
      onClick: s,
      onKeydown: c,
      color: i
    }, o), null);
  }
  return {
    InputIcon: n
  };
}
const Dr = O({
  focused: Boolean,
  "onUpdate:focused": Le()
}, "focus");
function pa(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : yt();
  const n = de(e, "focused"), a = T(() => ({
    [`${t}--focused`]: n.value
  }));
  function l() {
    n.value = !0;
  }
  function i() {
    n.value = !1;
  }
  return {
    focusClasses: a,
    isFocused: n,
    focus: l,
    blur: i
  };
}
const rv = ["underlined", "outlined", "filled", "solo", "solo-inverted", "solo-filled", "plain"], Pl = O({
  appendInnerIcon: se,
  bgColor: String,
  clearable: Boolean,
  clearIcon: {
    type: se,
    default: "$clear"
  },
  active: Boolean,
  centerAffix: {
    type: Boolean,
    default: void 0
  },
  color: String,
  baseColor: String,
  details: Boolean,
  dirty: Boolean,
  disabled: {
    type: Boolean,
    default: null
  },
  glow: Boolean,
  error: Boolean,
  flat: Boolean,
  iconColor: [Boolean, String],
  label: String,
  persistentClear: Boolean,
  prependInnerIcon: se,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {
    type: String,
    default: "filled",
    validator: (e) => rv.includes(e)
  },
  "onClick:clear": Le(),
  "onClick:appendInner": Le(),
  "onClick:prependInner": Le(),
  ...oe(),
  ...xa(),
  ...ze(),
  ...xe()
}, "VField"), ea = U()({
  name: "VField",
  inheritAttrs: !1,
  props: {
    id: String,
    ...Dr(),
    ...Pl()
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
      themeClasses: i
    } = Ae(e), {
      loaderClasses: o
    } = ka(e), {
      focusClasses: r,
      isFocused: s,
      focus: c,
      blur: u
    } = pa(e), {
      InputIcon: d
    } = Br(e), {
      roundedClasses: f
    } = Ue(e), {
      rtlClasses: v
    } = Ze(), m = T(() => e.dirty || e.active), g = T(() => !!(e.label || l.label)), y = T(() => !e.singleLine && g.value), h = ft(), b = x(() => e.id || `input-${h}`), k = T(() => e.details ? `${b.value}-messages` : void 0), p = Y(), V = Y(), I = Y(), A = x(() => ["plain", "underlined"].includes(e.variant)), S = x(() => e.error || e.disabled ? void 0 : m.value && s.value ? e.color : e.baseColor), E = x(() => {
      if (!(!e.iconColor || e.glow && !s.value))
        return e.iconColor === !0 ? S.value : e.iconColor;
    }), {
      backgroundColorClasses: P,
      backgroundColorStyles: _
    } = Xe(() => e.bgColor), {
      textColorClasses: D,
      textColorStyles: F
    } = ot(S);
    X(m, (W) => {
      if (y.value && !Ot()) {
        const K = p.value.$el, te = V.value.$el;
        requestAnimationFrame(() => {
          const le = cl(K), $ = te.getBoundingClientRect(), Q = $.x - le.x, M = $.y - le.y - (le.height / 2 - $.height / 2), B = $.width / 0.75, H = Math.abs(B - le.width) > 1 ? {
            maxWidth: J(B)
          } : void 0, ie = getComputedStyle(K), ue = getComputedStyle(te), N = parseFloat(ie.transitionDuration) * 1e3 || 150, Z = parseFloat(ue.getPropertyValue("--v-field-label-scale")), ve = ue.getPropertyValue("color");
          K.style.visibility = "visible", te.style.visibility = "hidden", kt(K, {
            transform: `translate(${Q}px, ${M}px) scale(${Z})`,
            color: ve,
            ...H
          }, {
            duration: N,
            easing: mn,
            direction: W ? "normal" : "reverse"
          }).finished.then(() => {
            K.style.removeProperty("visibility"), te.style.removeProperty("visibility");
          });
        });
      }
    }, {
      flush: "post"
    });
    const L = x(() => ({
      isActive: m,
      isFocused: s,
      controlRef: I,
      blur: u,
      focus: c
    }));
    function R(W) {
      W.target !== document.activeElement && W.preventDefault();
    }
    return ee(() => {
      var Q, M, B;
      const W = e.variant === "outlined", K = !!(l["prepend-inner"] || e.prependInnerIcon), te = !!(e.clearable || l.clear) && !e.disabled, le = !!(l["append-inner"] || e.appendInnerIcon || te), $ = () => l.label ? l.label({
        ...L.value,
        label: e.label,
        props: {
          for: b.value
        }
      }) : e.label;
      return C("div", j({
        class: ["v-field", {
          "v-field--active": m.value,
          "v-field--appended": le,
          "v-field--center-affix": e.centerAffix ?? !A.value,
          "v-field--disabled": e.disabled,
          "v-field--dirty": e.dirty,
          "v-field--error": e.error,
          "v-field--glow": e.glow,
          "v-field--flat": e.flat,
          "v-field--has-background": !!e.bgColor,
          "v-field--persistent-clear": e.persistentClear,
          "v-field--prepended": K,
          "v-field--reverse": e.reverse,
          "v-field--single-line": e.singleLine,
          "v-field--no-label": !$(),
          [`v-field--variant-${e.variant}`]: !0
        }, i.value, P.value, r.value, o.value, f.value, v.value, e.class],
        style: [_.value, e.style],
        onClick: R
      }, n), [C("div", {
        class: "v-field__overlay"
      }, null), w(Cl, {
        name: "v-field",
        active: !!e.loading,
        color: e.error ? "error" : typeof e.loading == "string" ? e.loading : e.color
      }, {
        default: l.loader
      }), K && C("div", {
        key: "prepend",
        class: "v-field__prepend-inner"
      }, [e.prependInnerIcon && w(d, {
        key: "prepend-icon",
        name: "prependInner",
        color: E.value
      }, null), (Q = l["prepend-inner"]) == null ? void 0 : Q.call(l, L.value)]), C("div", {
        class: "v-field__field",
        "data-no-activator": ""
      }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(e.variant) && y.value && w(Rn, {
        key: "floating-label",
        ref: V,
        class: q([D.value]),
        floating: !0,
        for: b.value,
        "aria-hidden": !m.value,
        style: re(F.value)
      }, {
        default: () => [$()]
      }), g.value && w(Rn, {
        key: "label",
        ref: p,
        for: b.value
      }, {
        default: () => [$()]
      }), ((M = l.default) == null ? void 0 : M.call(l, {
        ...L.value,
        props: {
          id: b.value,
          class: "v-field__input",
          "aria-describedby": k.value
        },
        focus: c,
        blur: u
      })) ?? C("div", {
        id: b.value,
        class: "v-field__input",
        "aria-describedby": k.value
      }, null)]), te && w($o, {
        key: "clear"
      }, {
        default: () => [$e(C("div", {
          class: "v-field__clearable",
          onMousedown: (H) => {
            H.preventDefault(), H.stopPropagation();
          }
        }, [w(we, {
          defaults: {
            VIcon: {
              icon: e.clearIcon
            }
          }
        }, {
          default: () => [l.clear ? l.clear({
            ...L.value,
            props: {
              onFocus: c,
              onBlur: u,
              onClick: e["onClick:clear"],
              tabindex: -1
            }
          }) : w(d, {
            name: "clear",
            onFocus: c,
            onBlur: u,
            tabindex: -1
          }, null)]
        })]), [[Rt, e.dirty]])]
      }), le && C("div", {
        key: "append",
        class: "v-field__append-inner"
      }, [(B = l["append-inner"]) == null ? void 0 : B.call(l, L.value), e.appendInnerIcon && w(d, {
        key: "append-icon",
        name: "appendInner",
        color: E.value
      }, null)]), C("div", {
        class: q(["v-field__outline", D.value]),
        style: re(F.value)
      }, [W && C(ce, null, [C("div", {
        class: "v-field__outline__start"
      }, null), y.value && C("div", {
        class: "v-field__outline__notch"
      }, [w(Rn, {
        ref: V,
        floating: !0,
        for: b.value,
        "aria-hidden": !m.value
      }, {
        default: () => [$()]
      })]), C("div", {
        class: "v-field__outline__end"
      }, null)]), A.value && y.value && w(Rn, {
        ref: V,
        floating: !0,
        for: b.value,
        "aria-hidden": !m.value
      }, {
        default: () => [$()]
      })])]);
    }), {
      controlRef: I,
      fieldIconColor: E
    };
  }
}), sv = O({
  active: Boolean,
  color: String,
  messages: {
    type: [Array, String],
    default: () => []
  },
  ...oe(),
  ...ln({
    transition: {
      component: Oo,
      leaveAbsolute: !0,
      group: !0
    }
  })
}, "VMessages"), uv = U()({
  name: "VMessages",
  props: sv(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = x(() => Oe(e.messages)), {
      textColorClasses: l,
      textColorStyles: i
    } = ot(() => e.color);
    return ee(() => w(Ct, {
      transition: e.transition,
      tag: "div",
      class: q(["v-messages", l.value, e.class]),
      style: re([i.value, e.style])
    }, {
      default: () => [e.active && a.value.map((o, r) => C("div", {
        class: "v-messages__message",
        key: `${r}-${a.value}`
      }, [n.message ? n.message({
        message: o
      }) : o]))]
    })), {};
  }
}), Fr = Symbol.for("vuetify:form"), cv = O({
  disabled: Boolean,
  fastFail: Boolean,
  readonly: Boolean,
  modelValue: {
    type: Boolean,
    default: null
  },
  validateOn: {
    type: String,
    default: "input"
  }
}, "form");
function dv(e) {
  const t = de(e, "modelValue"), n = T(() => e.disabled), a = T(() => e.readonly), l = G(!1), i = Y([]), o = Y([]);
  async function r() {
    const u = [];
    let d = !0;
    o.value = [], l.value = !0;
    for (const f of i.value) {
      const v = await f.validate();
      if (v.length > 0 && (d = !1, u.push({
        id: f.id,
        errorMessages: v
      })), !d && e.fastFail) break;
    }
    return o.value = u, l.value = !1, {
      valid: d,
      errors: o.value
    };
  }
  function s() {
    i.value.forEach((u) => u.reset());
  }
  function c() {
    i.value.forEach((u) => u.resetValidation());
  }
  return X(i, () => {
    let u = 0, d = 0;
    const f = [];
    for (const v of i.value)
      v.isValid === !1 ? (d++, f.push({
        id: v.id,
        errorMessages: v.errorMessages
      })) : v.isValid === !0 && u++;
    o.value = f, t.value = d > 0 ? !1 : u === i.value.length ? !0 : null;
  }, {
    deep: !0,
    flush: "post"
  }), Pe(Fr, {
    register: (u) => {
      let {
        id: d,
        vm: f,
        validate: v,
        reset: m,
        resetValidation: g
      } = u;
      i.value.some((y) => y.id === d) && tt(`Duplicate input name "${d}"`), i.value.push({
        id: d,
        validate: v,
        reset: m,
        resetValidation: g,
        vm: au(f),
        isValid: null,
        errorMessages: []
      });
    },
    unregister: (u) => {
      i.value = i.value.filter((d) => d.id !== u);
    },
    update: (u, d, f) => {
      const v = i.value.find((m) => m.id === u);
      v && (v.isValid = d, v.errorMessages = f);
    },
    isDisabled: n,
    isReadonly: a,
    isValidating: l,
    isValid: t,
    items: i,
    validateOn: T(() => e.validateOn)
  }), {
    errors: o,
    isDisabled: n,
    isReadonly: a,
    isValidating: l,
    isValid: t,
    items: i,
    validate: r,
    reset: s,
    resetValidation: c
  };
}
function Il(e) {
  const t = ye(Fr, null);
  return {
    ...t,
    isReadonly: x(() => !!((e == null ? void 0 : e.readonly) ?? (t == null ? void 0 : t.isReadonly.value))),
    isDisabled: x(() => !!((e == null ? void 0 : e.disabled) ?? (t == null ? void 0 : t.isDisabled.value)))
  };
}
const fv = Symbol.for("vuetify:rules");
function vv(e) {
  const t = ye(fv, null);
  if (!e) {
    if (!t)
      throw new Error("Could not find Vuetify rules injection");
    return t.aliases;
  }
  return (t == null ? void 0 : t.resolve(e)) ?? T(e);
}
const mv = O({
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
  ...Dr()
}, "validation");
function gv(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : yt(), n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ft();
  const a = de(e, "modelValue"), l = x(() => e.validationValue === void 0 ? a.value : e.validationValue), i = Il(e), o = vv(() => e.rules), r = Y([]), s = G(!0), c = x(() => !!(Oe(a.value === "" ? null : a.value).length || Oe(l.value === "" ? null : l.value).length)), u = x(() => {
    var p;
    return (p = e.errorMessages) != null && p.length ? Oe(e.errorMessages).concat(r.value).slice(0, Math.max(0, Number(e.maxErrors))) : r.value;
  }), d = x(() => {
    var I;
    let p = (e.validateOn ?? ((I = i.validateOn) == null ? void 0 : I.value)) || "input";
    p === "lazy" && (p = "input lazy"), p === "eager" && (p = "input eager");
    const V = new Set((p == null ? void 0 : p.split(" ")) ?? []);
    return {
      input: V.has("input"),
      blur: V.has("blur") || V.has("input") || V.has("invalid-input"),
      invalidInput: V.has("invalid-input"),
      lazy: V.has("lazy"),
      eager: V.has("eager")
    };
  }), f = x(() => {
    var p;
    return e.error || (p = e.errorMessages) != null && p.length ? !1 : e.rules.length ? s.value ? r.value.length || d.value.lazy ? null : !0 : !r.value.length : !0;
  }), v = G(!1), m = x(() => ({
    [`${t}--error`]: f.value === !1,
    [`${t}--dirty`]: c.value,
    [`${t}--disabled`]: i.isDisabled.value,
    [`${t}--readonly`]: i.isReadonly.value
  })), g = Ie("validation"), y = x(() => e.name ?? lt(n));
  ca(() => {
    var p;
    (p = i.register) == null || p.call(i, {
      id: y.value,
      vm: g,
      validate: k,
      reset: h,
      resetValidation: b
    });
  }), Ge(() => {
    var p;
    (p = i.unregister) == null || p.call(i, y.value);
  }), rt(async () => {
    var p;
    d.value.lazy || await k(!d.value.eager), (p = i.update) == null || p.call(i, y.value, f.value, u.value);
  }), Ke(() => d.value.input || d.value.invalidInput && f.value === !1, () => {
    X(l, () => {
      if (l.value != null)
        k();
      else if (e.focused) {
        const p = X(() => e.focused, (V) => {
          V || k(), p();
        });
      }
    });
  }), Ke(() => d.value.blur, () => {
    X(() => e.focused, (p) => {
      p || k();
    });
  }), X([f, u], () => {
    var p;
    (p = i.update) == null || p.call(i, y.value, f.value, u.value);
  });
  async function h() {
    a.value = null, await Se(), await b();
  }
  async function b() {
    s.value = !0, d.value.lazy ? r.value = [] : await k(!d.value.eager);
  }
  async function k() {
    let p = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    const V = [];
    v.value = !0;
    for (const I of o.value) {
      if (V.length >= Number(e.maxErrors ?? 1))
        break;
      const S = await (typeof I == "function" ? I : () => I)(l.value);
      if (S !== !0) {
        if (S !== !1 && typeof S != "string") {
          console.warn(`${S} is not a valid value. Rule functions must return boolean true or a string.`);
          continue;
        }
        V.push(S || "");
      }
    }
    return r.value = V, v.value = !1, s.value = p, r.value;
  }
  return {
    errorMessages: u,
    isDirty: c,
    isDisabled: i.isDisabled,
    isReadonly: i.isReadonly,
    isPristine: s,
    isValid: f,
    isValidating: v,
    reset: h,
    resetValidation: b,
    validate: k,
    validationClasses: m
  };
}
const Va = O({
  id: String,
  appendIcon: se,
  baseColor: String,
  centerAffix: {
    type: Boolean,
    default: !0
  },
  color: String,
  glow: Boolean,
  iconColor: [Boolean, String],
  prependIcon: se,
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
  "onClick:prepend": Le(),
  "onClick:append": Le(),
  ...oe(),
  ...Me(),
  ...Pt(ut(), ["maxWidth", "minWidth", "width"]),
  ...xe(),
  ...mv()
}, "VInput"), tn = U()({
  name: "VInput",
  props: {
    ...Va()
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
      densityClasses: i
    } = dt(e), {
      dimensionStyles: o
    } = ct(e), {
      themeClasses: r
    } = Ae(e), {
      rtlClasses: s
    } = Ze(), {
      InputIcon: c
    } = Br(e), u = ft(), d = x(() => e.id || `input-${u}`), {
      errorMessages: f,
      isDirty: v,
      isDisabled: m,
      isReadonly: g,
      isPristine: y,
      isValid: h,
      isValidating: b,
      reset: k,
      resetValidation: p,
      validate: V,
      validationClasses: I
    } = gv(e, "v-input", d), A = x(() => {
      var L;
      return (L = e.errorMessages) != null && L.length || !y.value && f.value.length ? f.value : e.hint && (e.persistentHint || e.focused) ? e.hint : e.messages;
    }), S = T(() => A.value.length > 0), E = T(() => !e.hideDetails || e.hideDetails === "auto" && (S.value || !!a.details)), P = x(() => E.value ? `${d.value}-messages` : void 0), _ = x(() => ({
      id: d,
      messagesId: P,
      isDirty: v,
      isDisabled: m,
      isReadonly: g,
      isPristine: y,
      isValid: h,
      isValidating: b,
      hasDetails: E,
      reset: k,
      resetValidation: p,
      validate: V
    })), D = T(() => e.error || e.disabled ? void 0 : e.focused ? e.color : e.baseColor), F = T(() => {
      if (e.iconColor)
        return e.iconColor === !0 ? D.value : e.iconColor;
    });
    return ee(() => {
      var W, K, te, le;
      const L = !!(a.prepend || e.prependIcon), R = !!(a.append || e.appendIcon);
      return C("div", {
        class: q(["v-input", `v-input--${e.direction}`, {
          "v-input--center-affix": e.centerAffix,
          "v-input--focused": e.focused,
          "v-input--glow": e.glow,
          "v-input--hide-spin-buttons": e.hideSpinButtons
        }, i.value, r.value, s.value, I.value, e.class]),
        style: re([o.value, e.style])
      }, [L && C("div", {
        key: "prepend",
        class: "v-input__prepend"
      }, [(W = a.prepend) == null ? void 0 : W.call(a, _.value), e.prependIcon && w(c, {
        key: "prepend-icon",
        name: "prepend",
        color: F.value
      }, null)]), a.default && C("div", {
        class: "v-input__control"
      }, [(K = a.default) == null ? void 0 : K.call(a, _.value)]), R && C("div", {
        key: "append",
        class: "v-input__append"
      }, [e.appendIcon && w(c, {
        key: "append-icon",
        name: "append",
        color: F.value
      }, null), (te = a.append) == null ? void 0 : te.call(a, _.value)]), E.value && C("div", {
        id: P.value,
        class: "v-input__details",
        role: "alert",
        "aria-live": "polite"
      }, [w(uv, {
        active: S.value,
        messages: A.value
      }, {
        message: a.message
      }), (le = a.details) == null ? void 0 : le.call(a, _.value)])]);
    }), {
      reset: k,
      resetValidation: p,
      validate: V,
      isValid: h,
      errorMessages: f
    };
  }
}), Or = O({
  autocomplete: String
}, "autocomplete");
function Lr(e) {
  const t = ft(), n = G(0), a = T(() => e.autocomplete === "suppress"), l = T(() => a.value ? `${e.name}-${t}-${n.value}` : e.name), i = T(() => a.value ? "off" : e.autocomplete);
  return {
    isSuppressing: a,
    fieldAutocomplete: i,
    fieldName: l,
    update: () => n.value = (/* @__PURE__ */ new Date()).getTime()
  };
}
function $r(e) {
  function t(n, a) {
    var l, i;
    !e.autofocus || !n || (i = (l = a[0].target) == null ? void 0 : l.focus) == null || i.call(l);
  }
  return {
    onIntersect: t
  };
}
const hv = ["color", "file", "time", "date", "datetime-local", "week", "month"], Al = O({
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
  ...Or(),
  ...Va(),
  ...Pl()
}, "VTextField"), ta = U()({
  name: "VTextField",
  directives: {
    vIntersect: Qt
  },
  inheritAttrs: !1,
  props: Al(),
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
    const i = de(e, "modelValue"), {
      isFocused: o,
      focus: r,
      blur: s
    } = pa(e), {
      onIntersect: c
    } = $r(e), u = x(() => typeof e.counterValue == "function" ? e.counterValue(i.value) : typeof e.counterValue == "number" ? e.counterValue : (i.value ?? "").toString().length), d = x(() => {
      if (n.maxlength) return n.maxlength;
      if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string"))
        return e.counter;
    }), f = x(() => ["plain", "underlined"].includes(e.variant)), v = Y(), m = Y(), g = Y(), y = Lr(e), h = x(() => hv.includes(e.type) || e.persistentPlaceholder || o.value || e.active);
    function b() {
      y.isSuppressing.value && y.update(), o.value || r(), Se(() => {
        var A;
        g.value !== document.activeElement && ((A = g.value) == null || A.focus());
      });
    }
    function k(A) {
      a("mousedown:control", A), A.target !== g.value && (b(), A.preventDefault());
    }
    function p(A) {
      a("click:control", A);
    }
    function V(A, S) {
      A.stopPropagation(), b(), Se(() => {
        i.value = null, S(), fa(e["onClick:clear"], A);
      });
    }
    function I(A) {
      var E;
      const S = A.target;
      if (i.value = S.value, (E = e.modelModifiers) != null && E.trim && ["text", "search", "password", "tel", "url"].includes(e.type)) {
        const P = [S.selectionStart, S.selectionEnd];
        Se(() => {
          S.selectionStart = P[0], S.selectionEnd = P[1];
        });
      }
    }
    return ee(() => {
      const A = !!(l.counter || e.counter !== !1 && e.counter != null), S = !!(A || l.details), [E, P] = da(n), {
        modelValue: _,
        ...D
      } = tn.filterProps(e), F = ea.filterProps(e);
      return w(tn, j({
        ref: v,
        modelValue: i.value,
        "onUpdate:modelValue": (L) => i.value = L,
        class: ["v-text-field", {
          "v-text-field--prefixed": e.prefix,
          "v-text-field--suffixed": e.suffix,
          "v-input--plain-underlined": f.value
        }, e.class],
        style: e.style
      }, E, D, {
        centerAffix: !f.value,
        focused: o.value
      }), {
        ...l,
        default: (L) => {
          let {
            id: R,
            isDisabled: W,
            isDirty: K,
            isReadonly: te,
            isValid: le,
            hasDetails: $,
            reset: Q
          } = L;
          return w(ea, j({
            ref: m,
            onMousedown: k,
            onClick: p,
            "onClick:clear": (M) => V(M, Q),
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"],
            role: e.role
          }, qe(F, ["onClick:clear"]), {
            id: R.value,
            active: h.value || K.value,
            dirty: K.value || e.dirty,
            disabled: W.value,
            focused: o.value,
            details: $.value,
            error: le.value === !1
          }), {
            ...l,
            default: (M) => {
              let {
                props: {
                  class: B,
                  ...H
                }
              } = M;
              const ie = $e(C("input", j({
                ref: g,
                value: i.value,
                onInput: I,
                autofocus: e.autofocus,
                readonly: te.value,
                disabled: W.value,
                name: y.fieldName.value,
                autocomplete: y.fieldAutocomplete.value,
                placeholder: e.placeholder,
                size: 1,
                role: e.role,
                type: e.type,
                onFocus: r,
                onBlur: s
              }, H, P), null), [[Qt, {
                handler: c
              }, null, {
                once: !0
              }]]);
              return C(ce, null, [e.prefix && C("span", {
                class: "v-text-field__prefix"
              }, [C("span", {
                class: "v-text-field__prefix__text"
              }, [e.prefix])]), l.default ? C("div", {
                class: q(B),
                "data-no-activator": ""
              }, [l.default(), ie]) : lu(ie, {
                class: B
              }), e.suffix && C("span", {
                class: "v-text-field__suffix"
              }, [C("span", {
                class: "v-text-field__suffix__text"
              }, [e.suffix])])]);
            }
          });
        },
        details: S ? (L) => {
          var R;
          return C(ce, null, [(R = l.details) == null ? void 0 : R.call(l, L), A && C(ce, null, [C("span", null, null), w(Er, {
            active: e.persistentCounter || o.value,
            value: u.value,
            max: d.value,
            disabled: e.disabled
          }, l.counter)])]);
        } : void 0
      });
    }), wt({}, v, m, g);
  }
});
function yv() {
  const e = Y([]);
  iu(() => e.value = []);
  function t(n, a) {
    e.value[a] = n;
  }
  return {
    refs: e,
    updateRef: t
  };
}
const bv = O({
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
    type: se,
    default: "$first"
  },
  prevIcon: {
    type: se,
    default: "$prev"
  },
  nextIcon: {
    type: se,
    default: "$next"
  },
  lastIcon: {
    type: se,
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
  ...vt(),
  ...oe(),
  ...Me(),
  ...gt(),
  ...ze(),
  ...on(),
  ...ge({
    tag: "nav"
  }),
  ...xe(),
  ...mt({
    variant: "text"
  })
}, "VPagination"), Ui = U()({
  name: "VPagination",
  props: bv(),
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
    const l = de(e, "modelValue"), {
      t: i,
      n: o
    } = st(), {
      isRtl: r
    } = Ze(), {
      themeClasses: s
    } = Ae(e), {
      width: c
    } = Tt(), u = G(-1);
    nt(void 0, {
      scoped: !0
    });
    const {
      resizeRef: d
    } = It((S) => {
      if (!S.length) return;
      const {
        target: E,
        contentRect: P
      } = S[0], _ = E.querySelector(".v-pagination__list > *");
      if (!_) return;
      const D = P.width, F = _.offsetWidth + parseFloat(getComputedStyle(_).marginRight) * 2;
      u.value = g(D, F);
    }), f = x(() => parseInt(e.length, 10)), v = x(() => parseInt(e.start, 10)), m = x(() => e.totalVisible != null ? parseInt(e.totalVisible, 10) : u.value >= 0 ? u.value : g(c.value, 58));
    function g(S, E) {
      const P = e.showFirstLastPage ? 5 : 3;
      return Math.max(0, Math.floor(
        // Round to two decimal places to avoid floating point errors
        Number(((S - E * P) / E).toFixed(2))
      ));
    }
    const y = x(() => {
      if (f.value <= 0 || isNaN(f.value) || f.value > Number.MAX_SAFE_INTEGER) return [];
      if (m.value <= 0) return [];
      if (m.value === 1) return [l.value];
      if (f.value <= m.value)
        return Ut(f.value, v.value);
      const S = m.value % 2 === 0, E = S ? m.value / 2 : Math.floor(m.value / 2), P = S ? E : E + 1, _ = f.value - E;
      if (P - l.value >= 0)
        return [...Ut(Math.max(1, m.value - 1), v.value), e.ellipsis, f.value];
      if (l.value - _ >= (S ? 1 : 0)) {
        const D = m.value - 1, F = f.value - D + v.value;
        return [v.value, e.ellipsis, ...Ut(D, F)];
      } else {
        const D = Math.max(1, m.value - 2), F = D === 1 ? l.value : l.value - Math.ceil(D / 2) + v.value;
        return [v.value, e.ellipsis, ...Ut(D, F), e.ellipsis, f.value];
      }
    });
    function h(S, E, P) {
      S.preventDefault(), l.value = E, P && a(P, E);
    }
    const {
      refs: b,
      updateRef: k
    } = yv();
    nt({
      VPaginationBtn: {
        color: T(() => e.color),
        border: T(() => e.border),
        density: T(() => e.density),
        size: T(() => e.size),
        variant: T(() => e.variant),
        rounded: T(() => e.rounded),
        elevation: T(() => e.elevation)
      }
    });
    const p = x(() => y.value.map((S, E) => {
      const P = (_) => k(_, E);
      if (typeof S == "string")
        return {
          isActive: !1,
          key: `ellipsis-${E}`,
          page: S,
          props: {
            ref: P,
            ellipsis: !0,
            icon: !0,
            disabled: !0
          }
        };
      {
        const _ = S === l.value;
        return {
          isActive: _,
          key: S,
          page: o(S),
          props: {
            ref: P,
            ellipsis: !1,
            icon: !0,
            disabled: !!e.disabled || Number(e.length) < 2,
            color: _ ? e.activeColor : e.color,
            "aria-current": _,
            "aria-label": i(_ ? e.currentPageAriaLabel : e.pageAriaLabel, S),
            onClick: (D) => h(D, S)
          }
        };
      }
    })), V = x(() => {
      const S = !!e.disabled || l.value <= v.value, E = !!e.disabled || l.value >= v.value + f.value - 1;
      return {
        first: e.showFirstLastPage ? {
          icon: r.value ? e.lastIcon : e.firstIcon,
          onClick: (P) => h(P, v.value, "first"),
          disabled: S,
          "aria-label": i(e.firstAriaLabel),
          "aria-disabled": S
        } : void 0,
        prev: {
          icon: r.value ? e.nextIcon : e.prevIcon,
          onClick: (P) => h(P, l.value - 1, "prev"),
          disabled: S,
          "aria-label": i(e.previousAriaLabel),
          "aria-disabled": S
        },
        next: {
          icon: r.value ? e.prevIcon : e.nextIcon,
          onClick: (P) => h(P, l.value + 1, "next"),
          disabled: E,
          "aria-label": i(e.nextAriaLabel),
          "aria-disabled": E
        },
        last: e.showFirstLastPage ? {
          icon: r.value ? e.firstIcon : e.lastIcon,
          onClick: (P) => h(P, v.value + f.value - 1, "last"),
          disabled: E,
          "aria-label": i(e.lastAriaLabel),
          "aria-disabled": E
        } : void 0
      };
    });
    function I() {
      var E;
      const S = l.value - v.value;
      (E = b.value[S]) == null || E.$el.focus();
    }
    function A(S) {
      S.key === jl.left && !e.disabled && l.value > Number(e.start) ? (l.value = l.value - 1, Se(I)) : S.key === jl.right && !e.disabled && l.value < v.value + f.value - 1 && (l.value = l.value + 1, Se(I));
    }
    return ee(() => w(e.tag, {
      ref: d,
      class: q(["v-pagination", s.value, e.class]),
      style: re(e.style),
      role: "navigation",
      "aria-label": i(e.ariaLabel),
      onKeydown: A,
      "data-test": "v-pagination-root"
    }, {
      default: () => [C("ul", {
        class: "v-pagination__list"
      }, [e.showFirstLastPage && C("li", {
        key: "first",
        class: "v-pagination__first",
        "data-test": "v-pagination-first"
      }, [n.first ? n.first(V.value.first) : w(et, j({
        _as: "VPaginationBtn"
      }, V.value.first), null)]), C("li", {
        key: "prev",
        class: "v-pagination__prev",
        "data-test": "v-pagination-prev"
      }, [n.prev ? n.prev(V.value.prev) : w(et, j({
        _as: "VPaginationBtn"
      }, V.value.prev), null)]), p.value.map((S, E) => C("li", {
        key: S.key,
        class: q(["v-pagination__item", {
          "v-pagination__item--is-active": S.isActive
        }]),
        "data-test": "v-pagination-item"
      }, [n.item ? n.item(S) : w(et, j({
        _as: "VPaginationBtn"
      }, S.props), {
        default: () => [S.page]
      })])), C("li", {
        key: "next",
        class: "v-pagination__next",
        "data-test": "v-pagination-next"
      }, [n.next ? n.next(V.value.next) : w(et, j({
        _as: "VPaginationBtn"
      }, V.value.next), null)]), e.showFirstLastPage && C("li", {
        key: "last",
        class: "v-pagination__last",
        "data-test": "v-pagination-last"
      }, [n.last ? n.last(V.value.last) : w(et, j({
        _as: "VPaginationBtn"
      }, V.value.last), null)])])]
    })), {};
  }
}), Mr = Symbol.for("vuetify:selection-control-group"), Rr = O({
  color: String,
  disabled: {
    type: Boolean,
    default: null
  },
  defaultsTarget: String,
  error: Boolean,
  id: String,
  inline: Boolean,
  falseIcon: se,
  trueIcon: se,
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
    default: We
  },
  ...oe(),
  ...Me(),
  ...xe()
}, "SelectionControlGroup"), Sv = O({
  ...Rr({
    defaultsTarget: "VSelectionControl"
  })
}, "VSelectionControlGroup");
U()({
  name: "VSelectionControlGroup",
  props: Sv(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = de(e, "modelValue"), l = ft(), i = T(() => e.id || `v-selection-control-group-${l}`), o = T(() => e.name || i.value), r = /* @__PURE__ */ new Set();
    return Pe(Mr, {
      modelValue: a,
      forceUpdate: () => {
        r.forEach((s) => s());
      },
      onForceUpdate: (s) => {
        r.add(s), Be(() => {
          r.delete(s);
        });
      }
    }), nt({
      [e.defaultsTarget]: {
        color: T(() => e.color),
        disabled: T(() => e.disabled),
        density: T(() => e.density),
        error: T(() => e.error),
        inline: T(() => e.inline),
        modelValue: a,
        multiple: T(() => !!e.multiple || e.multiple == null && Array.isArray(a.value)),
        name: o,
        falseIcon: T(() => e.falseIcon),
        trueIcon: T(() => e.trueIcon),
        readonly: T(() => e.readonly),
        ripple: T(() => e.ripple),
        type: T(() => e.type),
        valueComparator: T(() => e.valueComparator)
      }
    }), ee(() => {
      var s;
      return C("div", {
        class: q(["v-selection-control-group", {
          "v-selection-control-group--inline": e.inline
        }, e.class]),
        style: re(e.style),
        role: e.type === "radio" ? "radiogroup" : void 0
      }, [(s = n.default) == null ? void 0 : s.call(n)]);
    }), {};
  }
});
const Nr = O({
  label: String,
  baseColor: String,
  trueValue: null,
  falseValue: null,
  value: null,
  ...oe(),
  ...Rr()
}, "VSelectionControl");
function wv(e) {
  const t = ye(Mr, void 0), {
    densityClasses: n
  } = dt(e), a = de(e, "modelValue"), l = x(() => e.trueValue !== void 0 ? e.trueValue : e.value !== void 0 ? e.value : !0), i = x(() => e.falseValue !== void 0 ? e.falseValue : !1), o = x(() => !!e.multiple || e.multiple == null && Array.isArray(a.value)), r = x({
    get() {
      const v = t ? t.modelValue.value : a.value;
      return o.value ? Oe(v).some((m) => e.valueComparator(m, l.value)) : e.valueComparator(v, l.value);
    },
    set(v) {
      if (e.readonly) return;
      const m = v ? l.value : i.value;
      let g = m;
      o.value && (g = v ? [...Oe(a.value), m] : Oe(a.value).filter((y) => !e.valueComparator(y, l.value))), t ? t.modelValue.value = g : a.value = g;
    }
  }), {
    textColorClasses: s,
    textColorStyles: c
  } = ot(() => {
    if (!(e.error || e.disabled))
      return r.value ? e.color : e.baseColor;
  }), {
    backgroundColorClasses: u,
    backgroundColorStyles: d
  } = Xe(() => r.value && !e.error && !e.disabled ? e.color : e.baseColor), f = x(() => r.value ? e.trueIcon : e.falseIcon);
  return {
    group: t,
    densityClasses: n,
    trueValue: l,
    falseValue: i,
    model: r,
    textColorClasses: s,
    textColorStyles: c,
    backgroundColorClasses: u,
    backgroundColorStyles: d,
    icon: f
  };
}
const Yi = U()({
  name: "VSelectionControl",
  directives: {
    vRipple: pt
  },
  inheritAttrs: !1,
  props: Nr(),
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
      densityClasses: i,
      icon: o,
      model: r,
      textColorClasses: s,
      textColorStyles: c,
      backgroundColorClasses: u,
      backgroundColorStyles: d,
      trueValue: f
    } = wv(e), v = ft(), m = G(!1), g = G(!1), y = Y(), h = T(() => e.id || `input-${v}`), b = T(() => !e.disabled && !e.readonly);
    l == null || l.onForceUpdate(() => {
      y.value && (y.value.checked = r.value);
    });
    function k(A) {
      b.value && (m.value = !0, qt(A.target, ":focus-visible") !== !1 && (g.value = !0));
    }
    function p() {
      m.value = !1, g.value = !1;
    }
    function V(A) {
      A.stopPropagation();
    }
    function I(A) {
      if (!b.value) {
        y.value && (y.value.checked = r.value);
        return;
      }
      e.readonly && l && Se(() => l.forceUpdate()), r.value = A.target.checked;
    }
    return ee(() => {
      var _, D;
      const A = a.label ? a.label({
        label: e.label,
        props: {
          for: h.value
        }
      }) : e.label, [S, E] = da(n), P = C("input", j({
        ref: y,
        checked: r.value,
        disabled: !!e.disabled,
        id: h.value,
        onBlur: p,
        onFocus: k,
        onInput: I,
        "aria-disabled": !!e.disabled,
        "aria-label": e.label,
        type: e.type,
        value: f.value,
        name: e.name,
        "aria-checked": e.type === "checkbox" ? r.value : void 0
      }, E), null);
      return C("div", j({
        class: ["v-selection-control", {
          "v-selection-control--dirty": r.value,
          "v-selection-control--disabled": e.disabled,
          "v-selection-control--error": e.error,
          "v-selection-control--focused": m.value,
          "v-selection-control--focus-visible": g.value,
          "v-selection-control--inline": e.inline
        }, i.value, e.class]
      }, S, {
        style: e.style
      }), [C("div", {
        class: q(["v-selection-control__wrapper", s.value]),
        style: re(c.value)
      }, [(_ = a.default) == null ? void 0 : _.call(a, {
        backgroundColorClasses: u,
        backgroundColorStyles: d
      }), $e(C("div", {
        class: q(["v-selection-control__input"])
      }, [((D = a.input) == null ? void 0 : D.call(a, {
        model: r,
        textColorClasses: s,
        textColorStyles: c,
        backgroundColorClasses: u,
        backgroundColorStyles: d,
        inputNode: P,
        icon: o.value,
        props: {
          onFocus: k,
          onBlur: p,
          id: h.value
        }
      })) ?? C(ce, null, [o.value && w(Ve, {
        key: "icon",
        icon: o.value
      }, null), P])]), [[pt, !e.disabled && !e.readonly && e.ripple, null, {
        center: !0,
        circle: !0
      }]])]), A && w(_r, {
        for: h.value,
        onClick: V
      }, {
        default: () => [A]
      })]);
    }), {
      isFocused: m,
      input: y
    };
  }
}), Hr = O({
  indeterminate: Boolean,
  indeterminateIcon: {
    type: se,
    default: "$checkboxIndeterminate"
  },
  ...Nr({
    falseIcon: "$checkboxOff",
    trueIcon: "$checkboxOn"
  })
}, "VCheckboxBtn"), $t = U()({
  name: "VCheckboxBtn",
  props: Hr(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:indeterminate": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = de(e, "indeterminate"), l = de(e, "modelValue");
    function i(s) {
      a.value && (a.value = !1);
    }
    const o = T(() => a.value ? e.indeterminateIcon : e.falseIcon), r = T(() => a.value ? e.indeterminateIcon : e.trueIcon);
    return ee(() => {
      const s = qe(Yi.filterProps(e), ["modelValue"]);
      return w(Yi, j(s, {
        modelValue: l.value,
        "onUpdate:modelValue": [(c) => l.value = c, i],
        class: ["v-checkbox-btn", e.class],
        style: e.style,
        type: "checkbox",
        falseIcon: o.value,
        trueIcon: r.value,
        "aria-checked": a.value ? "mixed" : void 0
      }), n);
    }), {};
  }
}), xv = O({
  ...Va(),
  ...qe(Hr(), ["inline"])
}, "VCheckbox"), ag = U()({
  name: "VCheckbox",
  inheritAttrs: !1,
  props: xv(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:focused": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const l = de(e, "modelValue"), {
      isFocused: i,
      focus: o,
      blur: r
    } = pa(e), s = Y(), c = ft();
    return ee(() => {
      const [u, d] = da(n), f = tn.filterProps(e), v = $t.filterProps(e);
      return w(tn, j({
        ref: s,
        class: ["v-checkbox", e.class]
      }, u, f, {
        modelValue: l.value,
        "onUpdate:modelValue": (m) => l.value = m,
        id: e.id || `checkbox-${c}`,
        focused: i.value,
        style: e.style
      }), {
        ...a,
        default: (m) => {
          let {
            id: g,
            messagesId: y,
            isDisabled: h,
            isReadonly: b,
            isValid: k
          } = m;
          return w($t, j(v, {
            id: g.value,
            "aria-describedby": y.value,
            disabled: h.value,
            readonly: b.value
          }, d, {
            error: k.value === !1,
            modelValue: l.value,
            "onUpdate:modelValue": (p) => l.value = p,
            onFocus: o,
            onBlur: r
          }), a);
        }
      });
    }), wt({}, s);
  }
});
function kv(e) {
  let {
    selectedElement: t,
    containerElement: n,
    isRtl: a,
    isHorizontal: l
  } = e;
  const i = Cn(l, n), o = zr(l, a, n), r = Cn(l, t), s = Wr(l, t), c = r * 0.4;
  return o > s ? s - c : o + i < s + r ? s - i + r + c : o;
}
function Cv(e) {
  let {
    selectedElement: t,
    containerElement: n,
    isHorizontal: a
  } = e;
  const l = Cn(a, n), i = Wr(a, t), o = Cn(a, t);
  return i - l / 2 + o / 2;
}
function Ki(e, t) {
  const n = e ? "scrollWidth" : "scrollHeight";
  return (t == null ? void 0 : t[n]) || 0;
}
function pv(e, t) {
  const n = e ? "clientWidth" : "clientHeight";
  return (t == null ? void 0 : t[n]) || 0;
}
function zr(e, t, n) {
  if (!n)
    return 0;
  const {
    scrollLeft: a,
    offsetWidth: l,
    scrollWidth: i
  } = n;
  return e ? t ? i - l + a : a : n.scrollTop;
}
function Cn(e, t) {
  const n = e ? "offsetWidth" : "offsetHeight";
  return (t == null ? void 0 : t[n]) || 0;
}
function Wr(e, t) {
  const n = e ? "offsetLeft" : "offsetTop";
  return (t == null ? void 0 : t[n]) || 0;
}
const Tl = Symbol.for("vuetify:v-slide-group"), El = O({
  centerActive: Boolean,
  contentClass: null,
  direction: {
    type: String,
    default: "horizontal"
  },
  symbol: {
    type: null,
    default: Tl
  },
  nextIcon: {
    type: se,
    default: "$next"
  },
  prevIcon: {
    type: se,
    default: "$prev"
  },
  showArrows: {
    type: [Boolean, String],
    validator: (e) => typeof e == "boolean" || ["always", "desktop", "mobile"].includes(e)
  },
  ...oe(),
  ...Pn({
    mobile: null
  }),
  ...ge(),
  ...kl({
    selectedClass: "v-slide-group-item--active"
  })
}, "VSlideGroup"), na = U()({
  name: "VSlideGroup",
  props: El(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isRtl: a
    } = Ze(), {
      displayClasses: l,
      mobile: i
    } = Tt(e), o = wa(e, e.symbol), r = G(!1), s = G(0), c = G(0), u = G(0), d = x(() => e.direction === "horizontal"), {
      resizeRef: f,
      contentRect: v
    } = It(), {
      resizeRef: m,
      contentRect: g
    } = It(), y = Gc(), h = x(() => ({
      container: f.el,
      duration: 200,
      easing: "easeOutQuart"
    })), b = x(() => o.selected.value.length ? o.items.value.findIndex((M) => M.id === o.selected.value[0]) : -1), k = x(() => o.selected.value.length ? o.items.value.findIndex((M) => M.id === o.selected.value[o.selected.value.length - 1]) : -1);
    if (he) {
      let M = -1;
      X(() => [o.selected.value, v.value, g.value, d.value], () => {
        cancelAnimationFrame(M), M = requestAnimationFrame(() => {
          if (v.value && g.value) {
            const B = d.value ? "width" : "height";
            c.value = v.value[B], u.value = g.value[B], r.value = c.value + 1 < u.value;
          }
          if (b.value >= 0 && m.el) {
            const B = m.el.children[k.value];
            V(B, e.centerActive);
          }
        });
      });
    }
    const p = G(!1);
    function V(M, B) {
      let H = 0;
      B ? H = Cv({
        containerElement: f.el,
        isHorizontal: d.value,
        selectedElement: M
      }) : H = kv({
        containerElement: f.el,
        isHorizontal: d.value,
        isRtl: a.value,
        selectedElement: M
      }), I(H);
    }
    function I(M) {
      if (!he || !f.el) return;
      const B = Cn(d.value, f.el), H = zr(d.value, a.value, f.el);
      if (!(Ki(d.value, f.el) <= B || // Prevent scrolling by only a couple of pixels, which doesn't look smooth
      Math.abs(M - H) < 16)) {
        if (d.value && a.value && f.el) {
          const {
            scrollWidth: ue,
            offsetWidth: N
          } = f.el;
          M = ue - N - M;
        }
        d.value ? y.horizontal(M, h.value) : y(M, h.value);
      }
    }
    function A(M) {
      const {
        scrollTop: B,
        scrollLeft: H
      } = M.target;
      s.value = d.value ? H : B;
    }
    function S(M) {
      if (p.value = !0, !(!r.value || !m.el)) {
        for (const B of M.composedPath())
          for (const H of m.el.children)
            if (H === B) {
              V(H);
              return;
            }
      }
    }
    function E(M) {
      p.value = !1;
    }
    let P = !1;
    function _(M) {
      var B;
      !P && !p.value && !(M.relatedTarget && ((B = m.el) != null && B.contains(M.relatedTarget))) && R(), P = !1;
    }
    function D() {
      P = !0;
    }
    function F(M) {
      if (!m.el) return;
      function B(H) {
        M.preventDefault(), R(H);
      }
      d.value ? M.key === "ArrowRight" ? B(a.value ? "prev" : "next") : M.key === "ArrowLeft" && B(a.value ? "next" : "prev") : M.key === "ArrowDown" ? B("next") : M.key === "ArrowUp" && B("prev"), M.key === "Home" ? B("first") : M.key === "End" && B("last");
    }
    function L(M, B) {
      if (!M) return;
      let H = M;
      do
        H = H == null ? void 0 : H[B === "next" ? "nextElementSibling" : "previousElementSibling"];
      while (H != null && H.hasAttribute("disabled"));
      return H;
    }
    function R(M) {
      if (!m.el) return;
      let B;
      if (!M)
        B = Xt(m.el)[0];
      else if (M === "next") {
        if (B = L(m.el.querySelector(":focus"), M), !B) return R("first");
      } else if (M === "prev") {
        if (B = L(m.el.querySelector(":focus"), M), !B) return R("last");
      } else M === "first" ? (B = m.el.firstElementChild, B != null && B.hasAttribute("disabled") && (B = L(B, "next"))) : M === "last" && (B = m.el.lastElementChild, B != null && B.hasAttribute("disabled") && (B = L(B, "prev")));
      B && B.focus({
        preventScroll: !0
      });
    }
    function W(M) {
      const B = d.value && a.value ? -1 : 1, H = (M === "prev" ? -B : B) * c.value;
      let ie = s.value + H;
      if (d.value && a.value && f.el) {
        const {
          scrollWidth: ue,
          offsetWidth: N
        } = f.el;
        ie += ue - N;
      }
      I(ie);
    }
    const K = x(() => ({
      next: o.next,
      prev: o.prev,
      select: o.select,
      isSelected: o.isSelected
    })), te = x(() => r.value || Math.abs(s.value) > 0), le = x(() => {
      switch (e.showArrows) {
        case "always":
          return !0;
        case "desktop":
          return !i.value;
        case !0:
          return te.value;
        case "mobile":
          return i.value || te.value;
        default:
          return !i.value && te.value;
      }
    }), $ = x(() => Math.abs(s.value) > 1), Q = x(() => {
      if (!f.value || !te.value) return !1;
      const M = Ki(d.value, f.el), B = pv(d.value, f.el);
      return M - B - Math.abs(s.value) > 1;
    });
    return ee(() => w(e.tag, {
      class: q(["v-slide-group", {
        "v-slide-group--vertical": !d.value,
        "v-slide-group--has-affixes": le.value,
        "v-slide-group--is-overflowing": r.value
      }, l.value, e.class]),
      style: re(e.style),
      tabindex: p.value || o.selected.value.length ? -1 : 0,
      onFocus: _
    }, {
      default: () => {
        var M, B, H;
        return [le.value && C("div", {
          key: "prev",
          class: q(["v-slide-group__prev", {
            "v-slide-group__prev--disabled": !$.value
          }]),
          onMousedown: D,
          onClick: () => $.value && W("prev")
        }, [((M = n.prev) == null ? void 0 : M.call(n, K.value)) ?? w(Ii, null, {
          default: () => [w(Ve, {
            icon: a.value ? e.nextIcon : e.prevIcon
          }, null)]
        })]), C("div", {
          key: "container",
          ref: f,
          class: q(["v-slide-group__container", e.contentClass]),
          onScroll: A
        }, [C("div", {
          ref: m,
          class: "v-slide-group__content",
          onFocusin: S,
          onFocusout: E,
          onKeydown: F
        }, [(B = n.default) == null ? void 0 : B.call(n, K.value)])]), le.value && C("div", {
          key: "next",
          class: q(["v-slide-group__next", {
            "v-slide-group__next--disabled": !Q.value
          }]),
          onMousedown: D,
          onClick: () => Q.value && W("next")
        }, [((H = n.next) == null ? void 0 : H.call(n, K.value)) ?? w(Ii, null, {
          default: () => [w(Ve, {
            icon: a.value ? e.prevIcon : e.nextIcon
          }, null)]
        })])];
      }
    })), {
      selected: o.selected,
      scrollTo: W,
      scrollOffset: s,
      focus: R,
      hasPrev: $,
      hasNext: Q
    };
  }
}), jr = Symbol.for("vuetify:v-chip-group"), Vv = O({
  baseColor: String,
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: We
  },
  ...El(),
  ...oe(),
  ...kl({
    selectedClass: "v-chip--selected"
  }),
  ...ge(),
  ...xe(),
  ...mt({
    variant: "tonal"
  })
}, "VChipGroup");
U()({
  name: "VChipGroup",
  props: Vv(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: a
    } = Ae(e), {
      isSelected: l,
      select: i,
      next: o,
      prev: r,
      selected: s
    } = wa(e, jr);
    return nt({
      VChip: {
        baseColor: T(() => e.baseColor),
        color: T(() => e.color),
        disabled: T(() => e.disabled),
        filter: T(() => e.filter),
        variant: T(() => e.variant)
      }
    }), ee(() => {
      const c = na.filterProps(e);
      return w(na, j(c, {
        class: ["v-chip-group", {
          "v-chip-group--column": e.column
        }, a.value, e.class],
        style: e.style
      }), {
        default: () => {
          var u;
          return [(u = n.default) == null ? void 0 : u.call(n, {
            isSelected: l,
            select: i,
            next: o,
            prev: r,
            selected: s.value
          })];
        }
      });
    }), {};
  }
});
const Pv = O({
  activeClass: String,
  appendAvatar: String,
  appendIcon: se,
  baseColor: String,
  closable: Boolean,
  closeIcon: {
    type: se,
    default: "$delete"
  },
  closeLabel: {
    type: String,
    default: "$vuetify.close"
  },
  draggable: Boolean,
  filter: Boolean,
  filterIcon: {
    type: se,
    default: "$complete"
  },
  label: Boolean,
  link: {
    type: Boolean,
    default: void 0
  },
  pill: Boolean,
  prependAvatar: String,
  prependIcon: se,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  text: {
    type: [String, Number, Boolean],
    default: void 0
  },
  modelValue: {
    type: Boolean,
    default: !0
  },
  onClick: Le(),
  onClickOnce: Le(),
  ...vt(),
  ...oe(),
  ...Me(),
  ...gt(),
  ...Sa(),
  ...ze(),
  ...ba(),
  ...on(),
  ...ge({
    tag: "span"
  }),
  ...xe(),
  ...mt({
    variant: "tonal"
  })
}, "VChip"), _l = U()({
  name: "VChip",
  directives: {
    vRipple: pt
  },
  props: Pv(),
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
      t: i
    } = st(), {
      borderClasses: o
    } = bt(e), {
      densityClasses: r
    } = dt(e), {
      elevationClasses: s
    } = St(e), {
      roundedClasses: c
    } = Ue(e), {
      sizeClasses: u
    } = An(e), {
      themeClasses: d
    } = Ae(e), f = de(e, "modelValue"), v = kn(e, jr, !1), m = kn(e, Tl, !1), g = ya(e, n), y = T(() => e.link !== !1 && g.isLink.value), h = x(() => !e.disabled && e.link !== !1 && (!!v || e.link || g.isClickable.value)), b = T(() => ({
      "aria-label": i(e.closeLabel),
      disabled: e.disabled,
      onClick(S) {
        S.preventDefault(), S.stopPropagation(), f.value = !1, a("click:close", S);
      }
    }));
    X(f, (S) => {
      S ? (v == null || v.register(), m == null || m.register()) : (v == null || v.unregister(), m == null || m.unregister());
    });
    const {
      colorClasses: k,
      colorStyles: p,
      variantClasses: V
    } = Ht(() => ({
      color: !v || v.isSelected.value ? e.color ?? e.baseColor : e.baseColor,
      variant: e.variant
    }));
    function I(S) {
      var E;
      a("click", S), h.value && ((E = g.navigate) == null || E.call(g, S), v == null || v.toggle());
    }
    function A(S) {
      (S.key === "Enter" || S.key === " ") && (S.preventDefault(), I(S));
    }
    return () => {
      var R;
      const S = g.isLink.value ? "a" : e.tag, E = !!(e.appendIcon || e.appendAvatar), P = !!(E || l.append), _ = !!(l.close || e.closable), D = !!(l.filter || e.filter) && v, F = !!(e.prependIcon || e.prependAvatar), L = !!(F || l.prepend);
      return f.value && $e(w(S, j(g.linkProps, {
        class: ["v-chip", {
          "v-chip--disabled": e.disabled,
          "v-chip--label": e.label,
          "v-chip--link": h.value,
          "v-chip--filter": D,
          "v-chip--pill": e.pill,
          [`${e.activeClass}`]: e.activeClass && ((R = g.isActive) == null ? void 0 : R.value)
        }, d.value, o.value, k.value, r.value, s.value, c.value, u.value, V.value, v == null ? void 0 : v.selectedClass.value, e.class],
        style: [p.value, e.style],
        disabled: e.disabled || void 0,
        draggable: e.draggable,
        tabindex: h.value ? 0 : void 0,
        onClick: I,
        onKeydown: h.value && !y.value && A
      }), {
        default: () => {
          var W;
          return [Nt(h.value, "v-chip"), D && w($o, {
            key: "filter"
          }, {
            default: () => [$e(C("div", {
              class: "v-chip__filter"
            }, [l.filter ? w(we, {
              key: "filter-defaults",
              disabled: !e.filterIcon,
              defaults: {
                VIcon: {
                  icon: e.filterIcon
                }
              }
            }, l.filter) : w(Ve, {
              key: "filter-icon",
              icon: e.filterIcon
            }, null)]), [[Rt, v.isSelected.value]])]
          }), L && C("div", {
            key: "prepend",
            class: "v-chip__prepend"
          }, [l.prepend ? w(we, {
            key: "prepend-defaults",
            disabled: !F,
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
          }, l.prepend) : C(ce, null, [e.prependIcon && w(Ve, {
            key: "prepend-icon",
            icon: e.prependIcon,
            start: !0
          }, null), e.prependAvatar && w(At, {
            key: "prepend-avatar",
            image: e.prependAvatar,
            start: !0
          }, null)])]), C("div", {
            class: "v-chip__content",
            "data-no-activator": ""
          }, [((W = l.default) == null ? void 0 : W.call(l, {
            isSelected: v == null ? void 0 : v.isSelected.value,
            selectedClass: v == null ? void 0 : v.selectedClass.value,
            select: v == null ? void 0 : v.select,
            toggle: v == null ? void 0 : v.toggle,
            value: v == null ? void 0 : v.value.value,
            disabled: e.disabled
          })) ?? Ft(e.text)]), P && C("div", {
            key: "append",
            class: "v-chip__append"
          }, [l.append ? w(we, {
            key: "append-defaults",
            disabled: !E,
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
          }, l.append) : C(ce, null, [e.appendIcon && w(Ve, {
            key: "append-icon",
            end: !0,
            icon: e.appendIcon
          }, null), e.appendAvatar && w(At, {
            key: "append-avatar",
            end: !0,
            image: e.appendAvatar
          }, null)])]), _ && C("button", j({
            key: "close",
            class: "v-chip__close",
            type: "button",
            "data-testid": "close-chip"
          }, b.value), [l.close ? w(we, {
            key: "close-defaults",
            defaults: {
              VIcon: {
                icon: e.closeIcon,
                size: "x-small"
              }
            }
          }, l.close) : w(Ve, {
            key: "close-icon",
            icon: e.closeIcon,
            size: "x-small"
          }, null)])];
        }
      }), [[pt, h.value && e.ripple, null]]);
    };
  }
}), Iv = O({
  renderless: Boolean,
  ...oe()
}, "VVirtualScrollItem"), Av = U()({
  name: "VVirtualScrollItem",
  inheritAttrs: !1,
  props: Iv(),
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
      resizeRef: i,
      contentRect: o
    } = It(void 0, "border");
    X(() => {
      var r;
      return (r = o.value) == null ? void 0 : r.height;
    }, (r) => {
      r != null && a("update:height", r);
    }), ee(() => {
      var r, s;
      return e.renderless ? C(ce, null, [(r = l.default) == null ? void 0 : r.call(l, {
        itemRef: i
      })]) : C("div", j({
        ref: i,
        class: ["v-virtual-scroll__item", e.class],
        style: e.style
      }, n), [(s = l.default) == null ? void 0 : s.call(l)]);
    });
  }
}), Tv = -1, Ev = 1, Ra = 100, _v = O({
  itemHeight: {
    type: [Number, String],
    default: null
  },
  itemKey: {
    type: [String, Array, Function],
    default: null
  },
  height: [Number, String]
}, "virtual");
function Bv(e, t) {
  const n = Tt(), a = G(0);
  _e(() => {
    a.value = parseFloat(e.itemHeight || 0);
  });
  const l = G(0), i = G(Math.ceil(
    // Assume 16px items filling the entire screen height if
    // not provided. This is probably incorrect but it minimises
    // the chance of ending up with empty space at the bottom.
    // The default value is set here to avoid poisoning getSize()
    (parseInt(e.height) || n.height.value) / (a.value || 16)
  ) || 1), o = G(0), r = G(0), s = Y(), c = Y();
  let u = 0;
  const {
    resizeRef: d,
    contentRect: f
  } = It();
  _e(() => {
    d.value = s.value;
  });
  const v = x(() => {
    var $;
    return s.value === document.documentElement ? n.height.value : (($ = f.value) == null ? void 0 : $.height) || parseInt(e.height) || 0;
  }), m = x(() => !!(s.value && c.value && v.value && a.value));
  let g = Array.from({
    length: t.value.length
  }), y = Array.from({
    length: t.value.length
  });
  const h = G(0);
  let b = -1;
  function k($) {
    return g[$] || a.value;
  }
  const p = cu(() => {
    const $ = performance.now();
    y[0] = 0;
    const Q = t.value.length;
    for (let M = 1; M <= Q - 1; M++)
      y[M] = (y[M - 1] || 0) + k(M - 1);
    h.value = Math.max(h.value, performance.now() - $);
  }, h), V = X(m, ($) => {
    $ && (V(), u = c.value.offsetTop, p.immediate(), W(), ~b && Se(() => {
      he && window.requestAnimationFrame(() => {
        te(b), b = -1;
      });
    }));
  });
  Be(() => {
    p.clear();
  });
  function I($, Q) {
    const M = g[$], B = a.value;
    a.value = B ? Math.min(a.value, Q) : Q, (M !== Q || B !== a.value) && (g[$] = Q, p());
  }
  function A($) {
    $ = Fe($, 0, t.value.length - 1);
    const Q = Math.floor($), M = $ % 1, B = Q + 1, H = y[Q] || 0, ie = y[B] || H;
    return H + (ie - H) * M;
  }
  function S($) {
    return Dv(y, $);
  }
  let E = 0, P = 0, _ = 0;
  X(v, ($, Q) => {
    Q && (W(), $ < Q && requestAnimationFrame(() => {
      P = 0, W();
    }));
  });
  let D = -1;
  function F() {
    if (!s.value || !c.value) return;
    const $ = s.value.scrollTop, Q = performance.now();
    Q - _ > 500 ? (P = Math.sign($ - E), u = c.value.offsetTop) : P = $ - E, E = $, _ = Q, window.clearTimeout(D), D = window.setTimeout(L, 500), W();
  }
  function L() {
    !s.value || !c.value || (P = 0, _ = 0, window.clearTimeout(D), W());
  }
  let R = -1;
  function W() {
    cancelAnimationFrame(R), R = requestAnimationFrame(K);
  }
  function K() {
    if (!s.value || !v.value || !a.value) return;
    const $ = E - u, Q = Math.sign(P), M = Math.max(0, $ - Ra), B = Fe(S(M), 0, t.value.length), H = $ + v.value + Ra, ie = Fe(S(H) + 1, B + 1, t.value.length);
    if (
      // Only update the side we're scrolling towards,
      // the other side will be updated incidentally
      (Q !== Tv || B < l.value) && (Q !== Ev || ie > i.value)
    ) {
      const ue = A(l.value) - A(B), N = A(ie) - A(i.value);
      Math.max(ue, N) > Ra ? (l.value = B, i.value = ie) : (B <= 0 && (l.value = B), ie >= t.value.length && (i.value = ie));
    }
    o.value = A(l.value), r.value = A(t.value.length) - A(i.value);
  }
  function te($) {
    const Q = A($);
    !s.value || $ && !Q ? b = $ : s.value.scrollTop = Q;
  }
  const le = x(() => t.value.slice(l.value, i.value).map(($, Q) => {
    const M = Q + l.value;
    return {
      raw: $,
      index: M,
      key: Ne($, e.itemKey, M)
    };
  }));
  return X(t, () => {
    g = Array.from({
      length: t.value.length
    }), y = Array.from({
      length: t.value.length
    }), p.immediate(), W();
  }, {
    deep: 1
  }), {
    calculateVisibleItems: W,
    containerRef: s,
    markerRef: c,
    computedItems: le,
    paddingTop: o,
    paddingBottom: r,
    scrollToIndex: te,
    handleScroll: F,
    handleScrollend: L,
    handleItemResize: I
  };
}
function Dv(e, t) {
  let n = e.length - 1, a = 0, l = 0, i = null, o = -1;
  if (e[n] < t)
    return n;
  for (; a <= n; )
    if (l = a + n >> 1, i = e[l], i > t)
      n = l - 1;
    else if (i < t)
      o = l, a = l + 1;
    else return i === t ? l : a;
  return o;
}
const Fv = O({
  items: {
    type: Array,
    default: () => []
  },
  renderless: Boolean,
  ..._v(),
  ...oe(),
  ...ut()
}, "VVirtualScroll"), Gr = U()({
  name: "VVirtualScroll",
  props: Fv(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = Ie("VVirtualScroll"), {
      dimensionStyles: l
    } = ct(e), {
      calculateVisibleItems: i,
      containerRef: o,
      markerRef: r,
      handleScroll: s,
      handleScrollend: c,
      handleItemResize: u,
      scrollToIndex: d,
      paddingTop: f,
      paddingBottom: v,
      computedItems: m
    } = Bv(e, T(() => e.items));
    return Ke(() => e.renderless, () => {
      function g() {
        var b, k;
        const h = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1) ? "addEventListener" : "removeEventListener";
        o.value === document.documentElement ? (document[h]("scroll", s, {
          passive: !0
        }), document[h]("scrollend", c)) : ((b = o.value) == null || b[h]("scroll", s, {
          passive: !0
        }), (k = o.value) == null || k[h]("scrollend", c));
      }
      rt(() => {
        o.value = yo(a.vnode.el, !0), g(!0);
      }), Be(g);
    }), ee(() => {
      const g = m.value.map((y) => w(Av, {
        key: y.key,
        renderless: e.renderless,
        "onUpdate:height": (h) => u(y.index, h)
      }, {
        default: (h) => {
          var b;
          return (b = n.default) == null ? void 0 : b.call(n, {
            item: y.raw,
            index: y.index,
            ...h
          });
        }
      }));
      return e.renderless ? C(ce, null, [C("div", {
        ref: r,
        class: "v-virtual-scroll__spacer",
        style: {
          paddingTop: J(f.value)
        }
      }, null), g, C("div", {
        class: "v-virtual-scroll__spacer",
        style: {
          paddingBottom: J(v.value)
        }
      }, null)]) : C("div", {
        ref: o,
        class: q(["v-virtual-scroll", e.class]),
        onScrollPassive: s,
        onScrollend: c,
        style: re([l.value, e.style])
      }, [C("div", {
        ref: r,
        class: "v-virtual-scroll__container",
        style: {
          paddingTop: J(f.value),
          paddingBottom: J(v.value)
        }
      }, [g])]);
    }), {
      calculateVisibleItems: i,
      scrollToIndex: d
    };
  }
});
function Ur(e, t) {
  const n = G(!1);
  let a;
  function l(r) {
    cancelAnimationFrame(a), n.value = !0, a = requestAnimationFrame(() => {
      a = requestAnimationFrame(() => {
        n.value = !1;
      });
    });
  }
  async function i() {
    await new Promise((r) => requestAnimationFrame(r)), await new Promise((r) => requestAnimationFrame(r)), await new Promise((r) => requestAnimationFrame(r)), await new Promise((r) => {
      if (n.value) {
        const s = X(n, () => {
          s(), r();
        });
      } else r();
    });
  }
  async function o(r) {
    var u, d;
    if (r.key === "Tab" && ((u = t.value) == null || u.focus()), !["PageDown", "PageUp", "Home", "End"].includes(r.key)) return;
    const s = (d = e.value) == null ? void 0 : d.$el;
    if (!s) return;
    (r.key === "Home" || r.key === "End") && s.scrollTo({
      top: r.key === "Home" ? 0 : s.scrollHeight,
      behavior: "smooth"
    }), await i();
    const c = s.querySelectorAll(":scope > :not(.v-virtual-scroll__spacer)");
    if (r.key === "PageDown" || r.key === "Home") {
      const f = s.getBoundingClientRect().top;
      for (const v of c)
        if (v.getBoundingClientRect().top >= f) {
          v.focus();
          break;
        }
    } else {
      const f = s.getBoundingClientRect().bottom;
      for (const v of [...c].reverse())
        if (v.getBoundingClientRect().bottom <= f) {
          v.focus();
          break;
        }
    }
  }
  return {
    onScrollPassive: l,
    onKeydown: o
  };
}
const Ov = O({
  closeText: {
    type: String,
    default: "$vuetify.close"
  },
  openText: {
    type: String,
    default: "$vuetify.open"
  }
}, "autocomplete");
function Yr(e, t) {
  const {
    t: n
  } = st(), a = ft(), l = x(() => `menu-${a}`), i = T(() => je(t)), o = T(() => l.value), r = T(() => n(je(t) ? e.closeText : e.openText));
  return {
    menuId: l,
    ariaExpanded: i,
    ariaControls: o,
    ariaLabel: r
  };
}
const Kr = O({
  chips: Boolean,
  closableChips: Boolean,
  eager: Boolean,
  hideNoData: Boolean,
  hideSelected: Boolean,
  listProps: {
    type: Object
  },
  menu: Boolean,
  menuIcon: {
    type: se,
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
  noAutoScroll: Boolean,
  ...Ov(),
  ...ar({
    itemChildren: !1
  })
}, "Select"), Lv = O({
  ...Kr(),
  ...qe(Al({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...ln({
    transition: {
      component: yl
    }
  })
}, "VSelect"), Xr = U()({
  name: "VSelect",
  props: Lv(),
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
    } = st(), l = Y(), i = Y(), o = Y(), {
      items: r,
      transformIn: s,
      transformOut: c
    } = ir(e), u = de(e, "modelValue", [], (B) => s(B === null ? [null] : Oe(B)), (B) => {
      const H = c(B);
      return e.multiple ? H : H[0] ?? null;
    }), d = x(() => typeof e.counterValue == "function" ? e.counterValue(u.value) : typeof e.counterValue == "number" ? e.counterValue : u.value.length), f = Il(e), v = x(() => u.value.map((B) => B.value)), m = G(!1);
    let g = "", y = -1, h;
    const b = x(() => e.hideSelected ? r.value.filter((B) => !u.value.some((H) => (e.valueComparator || We)(H, B))) : r.value), k = x(() => e.hideNoData && !b.value.length || f.isReadonly.value || f.isDisabled.value), p = de(e, "menu"), V = x({
      get: () => p.value,
      set: (B) => {
        var H;
        p.value && !B && ((H = i.value) != null && H.ΨopenChildren.size) || B && k.value || (p.value = B);
      }
    }), {
      menuId: I,
      ariaExpanded: A,
      ariaControls: S,
      ariaLabel: E
    } = Yr(e, V), P = x(() => {
      var B;
      return {
        ...e.menuProps,
        activatorProps: {
          ...((B = e.menuProps) == null ? void 0 : B.activatorProps) || {},
          "aria-haspopup": "listbox"
          // Set aria-haspopup to 'listbox'
        }
      };
    }), _ = Y(), D = Ur(_, l);
    function F(B) {
      e.openOnClear && (V.value = !0);
    }
    function L() {
      k.value || (V.value = !V.value);
    }
    function R(B) {
      Gn(B) && W(B);
    }
    function W(B) {
      var me, z, ne;
      if (!B.key || f.isReadonly.value) return;
      ["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(B.key) && B.preventDefault(), ["Enter", "ArrowDown", " "].includes(B.key) && (V.value = !0), ["Escape", "Tab"].includes(B.key) && (V.value = !1), B.key === "Home" ? (me = _.value) == null || me.focus("first") : B.key === "End" && ((z = _.value) == null || z.focus("last"));
      const H = 1e3;
      if (!Gn(B)) return;
      const ie = performance.now();
      ie - h > H && (g = "", y = -1), g += B.key.toLowerCase(), h = ie;
      const ue = b.value;
      function N() {
        let ae = Z();
        return ae || g.at(-1) === g.at(-2) && (g = g.slice(0, -1), ae = Z(), ae) || (y = -1, ae = Z(), ae) ? ae : (g = B.key.toLowerCase(), Z());
      }
      function Z() {
        for (let ae = y + 1; ae < ue.length; ae++) {
          const fe = ue[ae];
          if (fe.title.toLowerCase().startsWith(g))
            return [fe, ae];
        }
      }
      const ve = N();
      if (!ve) return;
      const [ke, Ce] = ve;
      y = Ce, (ne = _.value) == null || ne.focus(Ce), e.multiple || (u.value = [ke]);
    }
    function K(B) {
      let H = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!B.props.disabled)
        if (e.multiple) {
          const ie = u.value.findIndex((N) => (e.valueComparator || We)(N.value, B.value)), ue = H ?? !~ie;
          if (~ie) {
            const N = ue ? [...u.value, B] : [...u.value];
            N.splice(ie, 1), u.value = N;
          } else ue && (u.value = [...u.value, B]);
        } else {
          const ie = H !== !1;
          u.value = ie ? [B] : [], Se(() => {
            V.value = !1;
          });
        }
    }
    function te(B) {
      var H;
      (H = _.value) != null && H.$el.contains(B.relatedTarget) || (V.value = !1);
    }
    function le() {
      var B;
      e.eager && ((B = o.value) == null || B.calculateVisibleItems());
    }
    function $() {
      var B;
      m.value && ((B = l.value) == null || B.focus());
    }
    function Q(B) {
      m.value = !0;
    }
    function M(B) {
      if (B == null) u.value = [];
      else if (qt(l.value, ":autofill") || qt(l.value, ":-webkit-autofill")) {
        const H = r.value.find((ie) => ie.title === B);
        H && K(H);
      } else l.value && (l.value.value = "");
    }
    return X(V, () => {
      if (!e.hideSelected && V.value && u.value.length) {
        const B = b.value.findIndex((H) => u.value.some((ie) => (e.valueComparator || We)(ie.value, H.value)));
        he && !e.noAutoScroll && window.requestAnimationFrame(() => {
          var H;
          B >= 0 && ((H = o.value) == null || H.scrollToIndex(B));
        });
      }
    }), X(r, (B, H) => {
      V.value || m.value && e.hideNoData && !H.length && B.length && (V.value = !0);
    }), ee(() => {
      const B = !!(e.chips || n.chip), H = !!(!e.hideNoData || b.value.length || n["prepend-item"] || n["append-item"] || n["no-data"]), ie = u.value.length > 0, ue = ta.filterProps(e), N = ie || !m.value && e.label && !e.persistentPlaceholder ? void 0 : e.placeholder;
      return w(ta, j({
        ref: l
      }, ue, {
        modelValue: u.value.map((Z) => Z.props.value).join(", "),
        "onUpdate:modelValue": M,
        focused: m.value,
        "onUpdate:focused": (Z) => m.value = Z,
        validationValue: u.externalValue,
        counterValue: d.value,
        dirty: ie,
        class: ["v-select", {
          "v-select--active-menu": V.value,
          "v-select--chips": !!e.chips,
          [`v-select--${e.multiple ? "multiple" : "single"}`]: !0,
          "v-select--selected": u.value.length,
          "v-select--selection-slot": !!n.selection
        }, e.class],
        style: e.style,
        inputmode: "none",
        placeholder: N,
        "onClick:clear": F,
        "onMousedown:control": L,
        onBlur: te,
        onKeydown: W,
        "aria-expanded": A.value,
        "aria-controls": S.value,
        "aria-label": E.value,
        title: E.value
      }), {
        ...n,
        default: () => C(ce, null, [w(Vr, j({
          id: I.value,
          ref: i,
          modelValue: V.value,
          "onUpdate:modelValue": (Z) => V.value = Z,
          activator: "parent",
          contentClass: "v-select__content",
          disabled: k.value,
          eager: e.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: e.transition,
          onAfterEnter: le,
          onAfterLeave: $
        }, P.value), {
          default: () => [H && w(rr, j({
            ref: _,
            selected: v.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: (Z) => Z.preventDefault(),
            onKeydown: R,
            onFocusin: Q,
            tabindex: "-1",
            selectable: !0,
            "aria-live": "polite",
            "aria-label": `${e.label}-list`,
            color: e.itemColor ?? e.color
          }, D, e.listProps), {
            default: () => {
              var Z, ve, ke;
              return [(Z = n["prepend-item"]) == null ? void 0 : Z.call(n), !b.value.length && !e.hideNoData && (((ve = n["no-data"]) == null ? void 0 : ve.call(n)) ?? w(Jt, {
                key: "no-data",
                title: a(e.noDataText)
              }, null)), w(Gr, {
                ref: o,
                renderless: !0,
                items: b.value,
                itemKey: "value"
              }, {
                default: (Ce) => {
                  var Te, Re, Qe;
                  let {
                    item: me,
                    index: z,
                    itemRef: ne
                  } = Ce;
                  const ae = gu(me.props), fe = j(me.props, {
                    ref: ne,
                    key: me.value,
                    onClick: () => K(me, null)
                  });
                  return me.type === "divider" ? ((Te = n.divider) == null ? void 0 : Te.call(n, {
                    props: me.raw,
                    index: z
                  })) ?? w(Tn, j(me.props, {
                    key: `divider-${z}`
                  }), null) : me.type === "subheader" ? ((Re = n.subheader) == null ? void 0 : Re.call(n, {
                    props: me.raw,
                    index: z
                  })) ?? w(xl, j(me.props, {
                    key: `subheader-${z}`
                  }), null) : ((Qe = n.item) == null ? void 0 : Qe.call(n, {
                    item: me,
                    index: z,
                    props: fe
                  })) ?? w(Jt, j(fe, {
                    role: "option"
                  }), {
                    prepend: (be) => {
                      let {
                        isSelected: pe
                      } = be;
                      return C(ce, null, [e.multiple && !e.hideSelected ? w($t, {
                        key: me.value,
                        modelValue: pe,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, ae.prependAvatar && w(At, {
                        image: ae.prependAvatar
                      }, null), ae.prependIcon && w(Ve, {
                        icon: ae.prependIcon
                      }, null)]);
                    }
                  });
                }
              }), (ke = n["append-item"]) == null ? void 0 : ke.call(n)];
            }
          })]
        }), u.value.map((Z, ve) => {
          function ke(ne) {
            ne.stopPropagation(), ne.preventDefault(), K(Z, !1);
          }
          const Ce = {
            "onClick:close": ke,
            onKeydown(ne) {
              ne.key !== "Enter" && ne.key !== " " || (ne.preventDefault(), ne.stopPropagation(), ke(ne));
            },
            onMousedown(ne) {
              ne.preventDefault(), ne.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, me = B ? !!n.chip : !!n.selection, z = me ? ul(B ? n.chip({
            item: Z,
            index: ve,
            props: Ce
          }) : n.selection({
            item: Z,
            index: ve
          })) : void 0;
          if (!(me && !z))
            return C("div", {
              key: Z.value,
              class: "v-select__selection"
            }, [B ? n.chip ? w(we, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: e.closableChips,
                  size: "small",
                  text: Z.title
                }
              }
            }, {
              default: () => [z]
            }) : w(_l, j({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: Z.title,
              disabled: Z.props.disabled
            }, Ce), null) : z ?? C("span", {
              class: "v-select__selection-text"
            }, [Z.title, e.multiple && ve < u.value.length - 1 && C("span", {
              class: "v-select__selection-comma"
            }, [zn(",")])])]);
        })]),
        "append-inner": function() {
          var Ce, me;
          for (var Z = arguments.length, ve = new Array(Z), ke = 0; ke < Z; ke++)
            ve[ke] = arguments[ke];
          return C(ce, null, [(Ce = n["append-inner"]) == null ? void 0 : Ce.call(n, ...ve), e.menuIcon ? w(Ve, {
            class: "v-select__menu-icon",
            color: (me = l.value) == null ? void 0 : me.fieldIconColor,
            icon: e.menuIcon
          }, null) : void 0]);
        }
      });
    }), wt({
      isFocused: m,
      menu: V,
      select: K
    }, l);
  }
}), qr = O({
  page: {
    type: [Number, String],
    default: 1
  },
  itemsPerPage: {
    type: [Number, String],
    default: 10
  }
}, "DataTable-paginate"), Zr = Symbol.for("vuetify:data-table-pagination");
function Qr(e) {
  const t = de(e, "page", void 0, (a) => Number(a ?? 1)), n = de(e, "itemsPerPage", void 0, (a) => Number(a ?? 10));
  return {
    page: t,
    itemsPerPage: n
  };
}
function Jr(e) {
  const {
    page: t,
    itemsPerPage: n,
    itemsLength: a
  } = e, l = x(() => n.value === -1 ? 0 : n.value * (t.value - 1)), i = x(() => n.value === -1 ? a.value : Math.min(a.value, l.value + n.value)), o = x(() => n.value === -1 || a.value === 0 ? 1 : Math.ceil(a.value / n.value));
  X([t, o], () => {
    t.value > o.value && (t.value = o.value);
  });
  function r(f) {
    n.value = f, t.value = 1;
  }
  function s() {
    t.value = Fe(t.value + 1, 1, o.value);
  }
  function c() {
    t.value = Fe(t.value - 1, 1, o.value);
  }
  function u(f) {
    t.value = Fe(f, 1, o.value);
  }
  const d = {
    page: t,
    itemsPerPage: n,
    startIndex: l,
    stopIndex: i,
    pageCount: o,
    itemsLength: a,
    nextPage: s,
    prevPage: c,
    setPage: u,
    setItemsPerPage: r
  };
  return Pe(Zr, d), d;
}
function $v() {
  const e = ye(Zr);
  if (!e) throw new Error("Missing pagination!");
  return e;
}
function Mv(e) {
  const t = Ie("usePaginatedItems"), {
    items: n,
    startIndex: a,
    stopIndex: l,
    itemsPerPage: i
  } = e, o = x(() => i.value <= 0 ? n.value : n.value.slice(a.value, l.value));
  return X(o, (r) => {
    t.emit("update:currentItems", r);
  }, {
    immediate: !0
  }), {
    paginatedItems: o
  };
}
const Bl = O({
  prevIcon: {
    type: se,
    default: "$prev"
  },
  nextIcon: {
    type: se,
    default: "$next"
  },
  firstIcon: {
    type: se,
    default: "$first"
  },
  lastIcon: {
    type: se,
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
}, "VDataTableFooter"), aa = U()({
  name: "VDataTableFooter",
  props: Bl(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      t: a
    } = st(), {
      page: l,
      pageCount: i,
      startIndex: o,
      stopIndex: r,
      itemsLength: s,
      itemsPerPage: c,
      setItemsPerPage: u
    } = $v(), d = x(() => e.itemsPerPageOptions.map((f) => typeof f == "number" ? {
      value: f,
      title: f === -1 ? a("$vuetify.dataFooter.itemsPerPageAll") : String(f)
    } : {
      ...f,
      title: isNaN(Number(f.title)) ? a(f.title) : f.title
    }));
    return ee(() => {
      var v;
      const f = Ui.filterProps(e);
      return C("div", {
        class: "v-data-table-footer"
      }, [(v = n.prepend) == null ? void 0 : v.call(n), C("div", {
        class: "v-data-table-footer__items-per-page"
      }, [C("span", {
        "aria-label": a(e.itemsPerPageText)
      }, [a(e.itemsPerPageText)]), w(Xr, {
        items: d.value,
        modelValue: c.value,
        "onUpdate:modelValue": (m) => u(Number(m)),
        density: "compact",
        variant: "outlined",
        hideDetails: !0
      }, null)]), C("div", {
        class: "v-data-table-footer__info"
      }, [C("div", null, [a(e.pageText, s.value ? o.value + 1 : 0, r.value, s.value)])]), C("div", {
        class: "v-data-table-footer__pagination"
      }, [w(Ui, j({
        modelValue: l.value,
        "onUpdate:modelValue": (m) => l.value = m,
        density: "comfortable",
        firstAriaLabel: e.firstPageLabel,
        lastAriaLabel: e.lastPageLabel,
        length: i.value,
        nextAriaLabel: e.nextPageLabel,
        previousAriaLabel: e.prevPageLabel,
        rounded: !0,
        showFirstLastPage: !0,
        totalVisible: e.showCurrentPage ? 1 : 0,
        variant: "plain"
      }, f), null)])]);
    }), {};
  }
}), pn = Uu({
  align: {
    type: String,
    default: "start"
  },
  fixed: {
    type: [Boolean, String],
    default: !1
  },
  fixedOffset: [Number, String],
  fixedEndOffset: [Number, String],
  height: [Number, String],
  lastFixed: Boolean,
  firstFixedEnd: Boolean,
  noPadding: Boolean,
  indent: [Number, String],
  empty: Boolean,
  tag: String,
  width: [Number, String],
  maxWidth: [Number, String],
  nowrap: Boolean
}, (e, t) => {
  let {
    slots: n
  } = t;
  const a = e.tag ?? "td", l = typeof e.fixed == "string" ? e.fixed : e.fixed ? "start" : "none";
  return w(a, {
    class: q(["v-data-table__td", {
      "v-data-table-column--fixed": l === "start",
      "v-data-table-column--fixed-end": l === "end",
      "v-data-table-column--last-fixed": e.lastFixed,
      "v-data-table-column--first-fixed-end": e.firstFixedEnd,
      "v-data-table-column--no-padding": e.noPadding,
      "v-data-table-column--nowrap": e.nowrap,
      "v-data-table-column--empty": e.empty
    }, `v-data-table-column--align-${e.align}`]),
    style: {
      height: J(e.height),
      width: J(e.width),
      maxWidth: J(e.maxWidth),
      left: l === "start" ? J(e.fixedOffset || null) : void 0,
      right: l === "end" ? J(e.fixedEndOffset || null) : void 0,
      paddingInlineStart: e.indent ? J(e.indent) : void 0
    }
  }, {
    default: () => {
      var i;
      return [(i = n.default) == null ? void 0 : i.call(n)];
    }
  });
}), Rv = O({
  headers: Array
}, "DataTable-header"), es = Symbol.for("vuetify:data-table-headers"), ts = {
  title: "",
  sortable: !1
}, Nv = {
  ...ts,
  width: 48
};
function Hv() {
  const t = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []).map((n) => ({
    element: n,
    priority: 0
  }));
  return {
    enqueue: (n, a) => {
      let l = !1;
      for (let i = 0; i < t.length; i++)
        if (t[i].priority > a) {
          t.splice(i, 0, {
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
function nl(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  if (!e.children)
    t.push(e);
  else
    for (const n of e.children)
      nl(n, t);
  return t;
}
function ns(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : /* @__PURE__ */ new Set();
  for (const n of e)
    n.key && t.add(n.key), n.children && ns(n.children, t);
  return t;
}
function zv(e) {
  if (e.key) {
    if (e.key === "data-table-group") return ts;
    if (["data-table-expand", "data-table-select"].includes(e.key)) return Nv;
  }
}
function Dl(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return e.children ? Math.max(t, ...e.children.map((n) => Dl(n, t + 1))) : t;
}
function Wv(e) {
  let t = !1;
  function n(i, o) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "none";
    if (i)
      if (r !== "none" && (i.fixed = r), i.fixed === !0 && (i.fixed = "start"), i.fixed === o)
        if (i.children)
          if (o === "start")
            for (let s = i.children.length - 1; s >= 0; s--)
              n(i.children[s], o, o);
          else
            for (let s = 0; s < i.children.length; s++)
              n(i.children[s], o, o);
        else
          !t && o === "start" ? i.lastFixed = !0 : !t && o === "end" ? i.firstFixedEnd = !0 : isNaN(Number(i.width)) ? fn(`Multiple fixed columns should have a static width (key: ${i.key})`) : i.minWidth = Math.max(Number(i.width) || 0, Number(i.minWidth) || 0), t = !0;
      else if (i.children)
        if (o === "start")
          for (let s = i.children.length - 1; s >= 0; s--)
            n(i.children[s], o);
        else
          for (let s = 0; s < i.children.length; s++)
            n(i.children[s], o);
      else
        t = !1;
  }
  for (let i = e.length - 1; i >= 0; i--)
    n(e[i], "start");
  for (let i = 0; i < e.length; i++)
    n(e[i], "end");
  let a = 0;
  for (let i = 0; i < e.length; i++)
    a = as(e[i], a);
  let l = 0;
  for (let i = e.length - 1; i >= 0; i--)
    l = ls(e[i], l);
}
function as(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  if (!e) return t;
  if (e.children) {
    e.fixedOffset = t;
    for (const n of e.children)
      t = as(n, t);
  } else e.fixed && e.fixed !== "end" && (e.fixedOffset = t, t += parseFloat(e.width || "0") || 0);
  return t;
}
function ls(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  if (!e) return t;
  if (e.children) {
    e.fixedEndOffset = t;
    for (const n of e.children)
      t = ls(n, t);
  } else e.fixed === "end" && (e.fixedEndOffset = t, t += parseFloat(e.width || "0") || 0);
  return t;
}
function jv(e, t) {
  const n = [];
  let a = 0;
  const l = Hv(e);
  for (; l.size() > 0; ) {
    let o = l.count();
    const r = [];
    let s = 1;
    for (; o > 0; ) {
      const {
        element: c,
        priority: u
      } = l.dequeue(), d = t - a - Dl(c);
      if (r.push({
        ...c,
        rowspan: d ?? 1,
        colspan: c.children ? nl(c).length : 1
      }), c.children)
        for (const f of c.children) {
          const v = u % 1 + s / Math.pow(10, a + 2);
          l.enqueue(f, a + d + v);
        }
      s += 1, o -= 1;
    }
    a += 1, n.push(r);
  }
  return {
    columns: e.map((o) => nl(o)).flat(),
    headers: n
  };
}
function is(e) {
  const t = [];
  for (const n of e) {
    const a = {
      ...zv(n),
      ...n
    }, l = a.key ?? (typeof a.value == "string" ? a.value : null), i = a.value ?? l ?? null, o = {
      ...a,
      key: l,
      value: i,
      sortable: a.sortable ?? (a.key != null || !!a.sort),
      children: a.children ? is(a.children) : void 0
    };
    t.push(o);
  }
  return t;
}
function os(e, t) {
  const n = Y([]), a = Y([]), l = Y({}), i = Y({}), o = Y({});
  _e(() => {
    var g, y, h;
    const c = (e.headers || Object.keys(e.items[0] ?? {}).map((b) => ({
      key: b,
      title: nn(b)
    }))).slice(), u = ns(c);
    (g = t == null ? void 0 : t.groupBy) != null && g.value.length && !u.has("data-table-group") && c.unshift({
      key: "data-table-group",
      title: "Group"
    }), (y = t == null ? void 0 : t.showSelect) != null && y.value && !u.has("data-table-select") && c.unshift({
      key: "data-table-select"
    }), (h = t == null ? void 0 : t.showExpand) != null && h.value && !u.has("data-table-expand") && c.push({
      key: "data-table-expand"
    });
    const d = is(c);
    Wv(d);
    const f = Math.max(...d.map((b) => Dl(b))) + 1, v = jv(d, f);
    n.value = v.headers, a.value = v.columns;
    const m = v.headers.flat(1);
    for (const b of m)
      b.key && (b.sortable && (b.sort && (l.value[b.key] = b.sort), b.sortRaw && (i.value[b.key] = b.sortRaw)), b.filter && (o.value[b.key] = b.filter));
  });
  const r = {
    headers: n,
    columns: a,
    sortFunctions: l,
    sortRawFunctions: i,
    filterFunctions: o
  };
  return Pe(es, r), r;
}
function Pa() {
  const e = ye(es);
  if (!e) throw new Error("Missing headers!");
  return e;
}
const Gv = {
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
}, rs = {
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
    return rs.select({
      items: n,
      value: t,
      selected: a
    });
  }
}, ss = {
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
    return ss.select({
      items: n,
      value: t,
      selected: a
    });
  }
}, Uv = O({
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
    default: We
  }
}, "DataTable-select"), us = Symbol.for("vuetify:data-table-selection");
function cs(e, t) {
  let {
    allItems: n,
    currentPage: a
  } = t;
  const l = de(e, "modelValue", e.modelValue, (b) => new Set(Oe(b).map((k) => {
    var p;
    return ((p = n.value.find((V) => e.valueComparator(k, V.value))) == null ? void 0 : p.value) ?? k;
  })), (b) => [...b.values()]), i = x(() => n.value.filter((b) => b.selectable)), o = x(() => a.value.filter((b) => b.selectable)), r = x(() => {
    if (typeof e.selectStrategy == "object") return e.selectStrategy;
    switch (e.selectStrategy) {
      case "single":
        return Gv;
      case "all":
        return ss;
      case "page":
      default:
        return rs;
    }
  }), s = G(null);
  function c(b) {
    return Oe(b).every((k) => l.value.has(k.value));
  }
  function u(b) {
    return Oe(b).some((k) => l.value.has(k.value));
  }
  function d(b, k) {
    const p = r.value.select({
      items: b,
      value: k,
      selected: new Set(l.value)
    });
    l.value = p;
  }
  function f(b, k, p) {
    const V = [];
    if (k = k ?? a.value.findIndex((I) => I.value === b.value), e.selectStrategy !== "single" && (p != null && p.shiftKey) && s.value !== null) {
      const [I, A] = [s.value, k].sort((S, E) => S - E);
      V.push(...a.value.slice(I, A + 1).filter((S) => S.selectable));
    } else
      V.push(b), s.value = k;
    d(V, !c([b]));
  }
  function v(b) {
    const k = r.value.selectAll({
      value: b,
      allItems: i.value,
      currentPage: o.value,
      selected: new Set(l.value)
    });
    l.value = k;
  }
  const m = x(() => l.value.size > 0), g = x(() => {
    const b = r.value.allSelected({
      allItems: i.value,
      currentPage: o.value
    });
    return !!b.length && c(b);
  }), y = T(() => r.value.showSelectAll), h = {
    toggleSelect: f,
    select: d,
    selectAll: v,
    isSelected: c,
    isSomeSelected: u,
    someSelected: m,
    allSelected: g,
    showSelectAll: y,
    lastSelectedIndex: s,
    selectStrategy: r
  };
  return Pe(us, h), h;
}
function Ia() {
  const e = ye(us);
  if (!e) throw new Error("Missing selection!");
  return e;
}
const Yv = O({
  sortBy: {
    type: Array,
    default: () => []
  },
  customKeySort: Object,
  multiSort: Boolean,
  mustSort: Boolean
}, "DataTable-sort"), ds = Symbol.for("vuetify:data-table-sort");
function fs(e) {
  const t = de(e, "sortBy"), n = T(() => e.mustSort), a = T(() => e.multiSort);
  return {
    sortBy: t,
    mustSort: n,
    multiSort: a
  };
}
function vs(e) {
  const {
    sortBy: t,
    mustSort: n,
    multiSort: a,
    page: l
  } = e, i = (s) => {
    if (s.key == null) return;
    let c = t.value.map((d) => ({
      ...d
    })) ?? [];
    const u = c.find((d) => d.key === s.key);
    u ? u.order === "desc" ? n.value && c.length === 1 ? u.order = "asc" : c = c.filter((d) => d.key !== s.key) : u.order = "desc" : a.value ? c.push({
      key: s.key,
      order: "asc"
    }) : c = [{
      key: s.key,
      order: "asc"
    }], t.value = c, l && (l.value = 1);
  };
  function o(s) {
    return !!t.value.find((c) => c.key === s.key);
  }
  const r = {
    sortBy: t,
    toggleSort: i,
    isSorted: o
  };
  return Pe(ds, r), r;
}
function ms() {
  const e = ye(ds);
  if (!e) throw new Error("Missing sort!");
  return e;
}
function Kv(e, t, n, a) {
  const l = st();
  return {
    sortedItems: x(() => {
      var o, r;
      return n.value.length ? Xv(t.value, n.value, l.current.value, {
        transform: a == null ? void 0 : a.transform,
        sortFunctions: {
          ...e.customKeySort,
          ...(o = a == null ? void 0 : a.sortFunctions) == null ? void 0 : o.value
        },
        sortRawFunctions: (r = a == null ? void 0 : a.sortRawFunctions) == null ? void 0 : r.value
      }) : t.value;
    })
  };
}
function Xv(e, t, n, a) {
  const l = new Intl.Collator(n, {
    sensitivity: "accent",
    usage: "sort"
  });
  return e.map((o) => [o, a != null && a.transform ? a.transform(o) : o]).sort((o, r) => {
    var s, c;
    for (let u = 0; u < t.length; u++) {
      let d = !1;
      const f = t[u].key, v = t[u].order ?? "asc";
      if (v === !1) continue;
      let m = Lt(o[1], f), g = Lt(r[1], f), y = o[0].raw, h = r[0].raw;
      if (v === "desc" && ([m, g] = [g, m], [y, h] = [h, y]), (s = a == null ? void 0 : a.sortRawFunctions) != null && s[f]) {
        const b = a.sortRawFunctions[f](y, h);
        if (b == null) continue;
        if (d = !0, b) return b;
      }
      if ((c = a == null ? void 0 : a.sortFunctions) != null && c[f]) {
        const b = a.sortFunctions[f](m, g);
        if (b == null) continue;
        if (d = !0, b) return b;
      }
      if (!d && (m instanceof Date && g instanceof Date && (m = m.getTime(), g = g.getTime()), [m, g] = [m, g].map((b) => b != null ? b.toString().toLocaleLowerCase() : b), m !== g))
        return On(m) && On(g) ? 0 : On(m) ? -1 : On(g) ? 1 : !isNaN(m) && !isNaN(g) ? Number(m) - Number(g) : l.compare(m, g);
    }
    return 0;
  }).map((o) => {
    let [r] = o;
    return r;
  });
}
const gs = O({
  color: String,
  disableSort: Boolean,
  fixedHeader: Boolean,
  multiSort: Boolean,
  sortAscIcon: {
    type: se,
    default: "$sortAsc"
  },
  sortDescIcon: {
    type: se,
    default: "$sortDesc"
  },
  headerProps: {
    type: Object
  },
  /** @deprecated */
  sticky: Boolean,
  ...Me(),
  ...Pn(),
  ...xa()
}, "VDataTableHeaders"), la = U()({
  name: "VDataTableHeaders",
  props: gs(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      t: a
    } = st(), {
      toggleSort: l,
      sortBy: i,
      isSorted: o
    } = ms(), {
      someSelected: r,
      allSelected: s,
      selectAll: c,
      showSelectAll: u
    } = Ia(), {
      columns: d,
      headers: f
    } = Pa(), {
      loaderClasses: v
    } = ka(e);
    function m(E, P) {
      if (!(e.sticky || e.fixedHeader) && !E.fixed) return;
      const _ = typeof E.fixed == "string" ? E.fixed : E.fixed ? "start" : "none";
      return {
        position: "sticky",
        left: _ === "start" ? J(E.fixedOffset) : void 0,
        right: _ === "end" ? J(E.fixedEndOffset) : void 0,
        top: e.sticky || e.fixedHeader ? `calc(var(--v-table-header-height) * ${P})` : void 0
      };
    }
    function g(E, P) {
      E.key === "Enter" && !e.disableSort && l(P);
    }
    function y(E) {
      const P = i.value.find((_) => _.key === E.key);
      return P ? P.order === "asc" ? e.sortAscIcon : e.sortDescIcon : e.sortAscIcon;
    }
    const {
      backgroundColorClasses: h,
      backgroundColorStyles: b
    } = Xe(() => e.color), {
      displayClasses: k,
      mobile: p
    } = Tt(e), V = x(() => ({
      headers: f.value,
      columns: d.value,
      toggleSort: l,
      isSorted: o,
      sortBy: i.value,
      someSelected: r.value,
      allSelected: s.value,
      selectAll: c,
      getSortIcon: y
    })), I = x(() => ["v-data-table__th", {
      "v-data-table__th--sticky": e.sticky || e.fixedHeader
    }, k.value, v.value]), A = (E) => {
      let {
        column: P,
        x: _,
        y: D
      } = E;
      const F = P.key === "data-table-select" || P.key === "data-table-expand", L = P.key === "data-table-group" && P.width === 0 && !P.title, R = j(e.headerProps ?? {}, P.headerProps ?? {});
      return w(pn, j({
        tag: "th",
        align: P.align,
        class: [{
          "v-data-table__th--sortable": P.sortable && !e.disableSort,
          "v-data-table__th--sorted": o(P),
          "v-data-table__th--fixed": P.fixed
        }, ...I.value],
        style: {
          width: J(P.width),
          minWidth: J(P.minWidth),
          maxWidth: J(P.maxWidth),
          ...m(P, D)
        },
        colspan: P.colspan,
        rowspan: P.rowspan,
        fixed: P.fixed,
        nowrap: P.nowrap,
        lastFixed: P.lastFixed,
        firstFixedEnd: P.firstFixedEnd,
        noPadding: F,
        empty: L,
        tabindex: P.sortable ? 0 : void 0,
        onClick: P.sortable ? () => l(P) : void 0,
        onKeydown: P.sortable ? (W) => g(W, P) : void 0
      }, R), {
        default: () => {
          var te;
          const W = `header.${P.key}`, K = {
            column: P,
            selectAll: c,
            isSorted: o,
            toggleSort: l,
            sortBy: i.value,
            someSelected: r.value,
            allSelected: s.value,
            getSortIcon: y
          };
          return n[W] ? n[W](K) : L ? "" : P.key === "data-table-select" ? ((te = n["header.data-table-select"]) == null ? void 0 : te.call(n, K)) ?? (u.value && w($t, {
            density: e.density,
            modelValue: s.value,
            indeterminate: r.value && !s.value,
            "onUpdate:modelValue": c
          }, null)) : C("div", {
            class: "v-data-table-header__content"
          }, [C("span", null, [P.title]), P.sortable && !e.disableSort && w(Ve, {
            key: "icon",
            class: "v-data-table-header__sort-icon",
            icon: y(P)
          }, null), e.multiSort && o(P) && C("div", {
            key: "badge",
            class: q(["v-data-table-header__sort-badge", ...h.value]),
            style: re(b.value)
          }, [i.value.findIndex((le) => le.key === P.key) + 1])]);
        }
      });
    }, S = () => {
      const E = x(() => d.value.filter((_) => (_ == null ? void 0 : _.sortable) && !e.disableSort)), P = x(() => {
        if (d.value.find((D) => D.key === "data-table-select") != null)
          return s.value ? "$checkboxOn" : r.value ? "$checkboxIndeterminate" : "$checkboxOff";
      });
      return w(pn, j({
        tag: "th",
        class: [...I.value],
        colspan: f.value.length + 1
      }, e.headerProps), {
        default: () => [C("div", {
          class: "v-data-table-header__content"
        }, [w(Xr, {
          chips: !0,
          class: "v-data-table__td-sort-select",
          clearable: !0,
          density: "default",
          items: E.value,
          label: a("$vuetify.dataTable.sortBy"),
          multiple: e.multiSort,
          variant: "underlined",
          "onClick:clear": () => i.value = [],
          appendIcon: P.value,
          "onClick:append": () => c(!s.value)
        }, {
          chip: (_) => {
            var D;
            return w(_l, {
              onClick: (D = _.item.raw) != null && D.sortable ? () => l(_.item.raw) : void 0,
              onMousedown: (F) => {
                F.preventDefault(), F.stopPropagation();
              }
            }, {
              default: () => [_.item.title, w(Ve, {
                class: q(["v-data-table__td-sort-icon", o(_.item.raw) && "v-data-table__td-sort-icon-active"]),
                icon: y(_.item.raw),
                size: "small"
              }, null)]
            });
          }
        })])]
      });
    };
    ee(() => p.value ? C("tr", null, [w(S, null, null)]) : C(ce, null, [n.headers ? n.headers(V.value) : f.value.map((E, P) => C("tr", null, [E.map((_, D) => w(A, {
      column: _,
      x: D,
      y: P
    }, null))])), e.loading && C("tr", {
      class: "v-data-table-progress"
    }, [C("th", {
      colspan: d.value.length
    }, [w(Cl, {
      name: "v-data-table-progress",
      absolute: !0,
      active: !0,
      color: typeof e.loading == "boolean" ? void 0 : e.loading,
      indeterminate: !0
    }, {
      default: n.loader
    })])])]));
  }
}), qv = O({
  groupBy: {
    type: Array,
    default: () => []
  }
}, "DataTable-group"), hs = Symbol.for("vuetify:data-table-group");
function ys(e) {
  return {
    groupBy: de(e, "groupBy")
  };
}
function bs(e) {
  const {
    disableSort: t,
    groupBy: n,
    sortBy: a
  } = e, l = Y(/* @__PURE__ */ new Set()), i = x(() => n.value.map((u) => ({
    ...u,
    order: u.order ?? !1
  })).concat(t != null && t.value ? [] : a.value));
  function o(u) {
    return l.value.has(u.id);
  }
  function r(u) {
    const d = new Set(l.value);
    o(u) ? d.delete(u.id) : d.add(u.id), l.value = d;
  }
  function s(u) {
    function d(f) {
      const v = [];
      for (const m of f.items)
        "type" in m && m.type === "group" ? v.push(...d(m)) : v.push(m);
      return [...new Set(v)];
    }
    return d({
      items: u
    });
  }
  const c = {
    sortByWithGroups: i,
    toggleGroup: r,
    opened: l,
    groupBy: n,
    extractRows: s,
    isGroupOpen: o
  };
  return Pe(hs, c), c;
}
function Ss() {
  const e = ye(hs);
  if (!e) throw new Error("Missing group!");
  return e;
}
function Zv(e, t) {
  if (!e.length) return [];
  const n = /* @__PURE__ */ new Map();
  for (const a of e) {
    const l = Lt(a.raw, t);
    n.has(l) || n.set(l, []), n.get(l).push(a);
  }
  return n;
}
function ws(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "root";
  if (!t.length) return [];
  const l = Zv(e, t[0]), i = [], o = t.slice(1);
  return l.forEach((r, s) => {
    const c = t[0], u = `${a}_${c}_${s}`;
    i.push({
      depth: n,
      id: u,
      key: c,
      value: s,
      items: o.length ? ws(r, o, n + 1, u) : r,
      type: "group"
    });
  }), i;
}
function xs(e, t, n) {
  const a = [];
  for (const l of e)
    "type" in l && l.type === "group" ? (l.value != null && a.push(l), (t.has(l.id) || l.value == null) && (a.push(...xs(l.items, t, n)), n && a.push({
      ...l,
      type: "group-summary"
    }))) : a.push(l);
  return a;
}
function ks(e, t, n, a) {
  return {
    flatItems: x(() => {
      if (!t.value.length) return e.value;
      const i = ws(e.value, t.value.map((o) => o.key));
      return xs(i, n.value, je(a));
    })
  };
}
const Cs = O({
  item: {
    type: Object,
    required: !0
  },
  groupCollapseIcon: {
    type: se,
    default: "$tableGroupCollapse"
  },
  groupExpandIcon: {
    type: se,
    default: "$tableGroupExpand"
  },
  ...Me()
}, "VDataTableGroupHeaderRow"), Qv = U()({
  name: "VDataTableGroupHeaderRow",
  props: Cs(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isGroupOpen: a,
      toggleGroup: l,
      extractRows: i
    } = Ss(), {
      isSelected: o,
      isSomeSelected: r,
      select: s
    } = Ia(), {
      columns: c
    } = Pa(), u = x(() => i([e.item])), d = T(() => c.value.length - (c.value.some((f) => f.key === "data-table-select") ? 1 : 0));
    return () => C("tr", {
      class: "v-data-table-group-header-row",
      style: {
        "--v-data-table-group-header-row-depth": e.item.depth
      }
    }, [c.value.map((f) => {
      var v, m;
      if (f.key === "data-table-group") {
        const g = a(e.item) ? e.groupCollapseIcon : e.groupExpandIcon, y = () => l(e.item);
        return ((v = n["data-table-group"]) == null ? void 0 : v.call(n, {
          item: e.item,
          count: u.value.length,
          props: {
            icon: g,
            onClick: y
          }
        })) ?? w(pn, {
          class: "v-data-table-group-header-row__column",
          colspan: d.value
        }, {
          default: () => [w(et, {
            size: "small",
            variant: "text",
            icon: g,
            onClick: y
          }, null), C("span", null, [e.item.value]), C("span", null, [zn("("), u.value.length, zn(")")])]
        });
      } else if (f.key === "data-table-select") {
        const g = o(u.value), y = r(u.value) && !g, h = (b) => s(u.value, b);
        return ((m = n["data-table-select"]) == null ? void 0 : m.call(n, {
          props: {
            modelValue: g,
            indeterminate: y,
            "onUpdate:modelValue": h
          }
        })) ?? w(pn, {
          class: "v-data-table__td--select-row",
          noPadding: !0
        }, {
          default: () => [w($t, {
            density: e.density,
            modelValue: g,
            indeterminate: y,
            "onUpdate:modelValue": h
          }, null)]
        });
      }
      return "";
    })]);
  }
}), Jv = O({
  expandOnClick: Boolean,
  showExpand: Boolean,
  expanded: {
    type: Array,
    default: () => []
  }
}, "DataTable-expand"), ps = Symbol.for("vuetify:datatable:expanded");
function Vs(e) {
  const t = T(() => e.expandOnClick), n = de(e, "expanded", e.expanded, (r) => new Set(r), (r) => [...r.values()]);
  function a(r, s) {
    const c = new Set(n.value), u = Ee(r.value);
    if (s)
      c.add(u);
    else {
      const d = [...n.value].find((f) => Ee(f) === u);
      c.delete(d);
    }
    n.value = c;
  }
  function l(r) {
    const s = Ee(r.value);
    return [...n.value].some((c) => Ee(c) === s);
  }
  function i(r) {
    a(r, !l(r));
  }
  const o = {
    expand: a,
    expanded: n,
    expandOnClick: t,
    isExpanded: l,
    toggleExpand: i
  };
  return Pe(ps, o), o;
}
function Ps() {
  const e = ye(ps);
  if (!e) throw new Error("foo");
  return e;
}
const Is = O({
  index: Number,
  item: Object,
  cellProps: [Object, Function],
  collapseIcon: {
    type: se,
    default: "$collapse"
  },
  expandIcon: {
    type: se,
    default: "$expand"
  },
  onClick: Le(),
  onContextmenu: Le(),
  onDblclick: Le(),
  ...Me(),
  ...Pn()
}, "VDataTableRow"), em = U()({
  name: "VDataTableRow",
  props: Is(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      displayClasses: a,
      mobile: l
    } = Tt(e, "v-data-table__tr"), {
      isSelected: i,
      toggleSelect: o,
      someSelected: r,
      allSelected: s,
      selectAll: c
    } = Ia(), {
      isExpanded: u,
      toggleExpand: d
    } = Ps(), {
      toggleSort: f,
      sortBy: v,
      isSorted: m
    } = ms(), {
      columns: g
    } = Pa();
    ee(() => C("tr", {
      class: q(["v-data-table__tr", {
        "v-data-table__tr--clickable": !!(e.onClick || e.onContextmenu || e.onDblclick)
      }, a.value]),
      onClick: e.onClick,
      onContextmenu: e.onContextmenu,
      onDblclick: e.onDblclick
    }, [e.item && g.value.map((y, h) => {
      const b = e.item, k = `item.${y.key}`, p = `header.${y.key}`, V = {
        index: e.index,
        item: b.raw,
        internalItem: b,
        value: Lt(b.columns, y.key),
        column: y,
        isSelected: i,
        toggleSelect: o,
        isExpanded: u,
        toggleExpand: d
      }, I = {
        column: y,
        selectAll: c,
        isSorted: m,
        toggleSort: f,
        sortBy: v.value,
        someSelected: r.value,
        allSelected: s.value,
        getSortIcon: () => ""
      }, A = typeof e.cellProps == "function" ? e.cellProps({
        index: V.index,
        item: V.item,
        internalItem: V.internalItem,
        value: V.value,
        column: y
      }) : e.cellProps, S = typeof y.cellProps == "function" ? y.cellProps({
        index: V.index,
        item: V.item,
        internalItem: V.internalItem,
        value: V.value
      }) : y.cellProps, E = y.key === "data-table-select" || y.key === "data-table-expand", P = y.key === "data-table-group" && y.width === 0 && !y.title;
      return w(pn, j({
        align: y.align,
        indent: y.intent,
        class: {
          "v-data-table__td--expanded-row": y.key === "data-table-expand",
          "v-data-table__td--select-row": y.key === "data-table-select"
        },
        fixed: y.fixed,
        fixedOffset: y.fixedOffset,
        fixedEndOffset: y.fixedEndOffset,
        lastFixed: y.lastFixed,
        firstFixedEnd: y.firstFixedEnd,
        maxWidth: l.value ? void 0 : y.maxWidth,
        noPadding: E,
        empty: P,
        nowrap: y.nowrap,
        width: l.value ? void 0 : y.width
      }, A, S), {
        default: () => {
          var D, F, L, R;
          if (y.key === "data-table-select")
            return ((D = n["item.data-table-select"]) == null ? void 0 : D.call(n, {
              ...V,
              props: {
                disabled: !b.selectable,
                modelValue: i([b]),
                onClick: Fn(() => o(b), ["stop"])
              }
            })) ?? w($t, {
              disabled: !b.selectable,
              density: e.density,
              modelValue: i([b]),
              onClick: Fn((W) => o(b, e.index, W), ["stop"])
            }, null);
          if (y.key === "data-table-expand")
            return ((F = n["item.data-table-expand"]) == null ? void 0 : F.call(n, {
              ...V,
              props: {
                icon: u(b) ? e.collapseIcon : e.expandIcon,
                size: "small",
                variant: "text",
                onClick: Fn(() => d(b), ["stop"])
              }
            })) ?? w(et, {
              icon: u(b) ? e.collapseIcon : e.expandIcon,
              size: "small",
              variant: "text",
              onClick: Fn(() => d(b), ["stop"])
            }, null);
          if (n[k] && !l.value) return n[k](V);
          const _ = Ft(V.value);
          return l.value ? C(ce, null, [C("div", {
            class: "v-data-table__td-title"
          }, [((L = n[p]) == null ? void 0 : L.call(n, I)) ?? y.title]), C("div", {
            class: "v-data-table__td-value"
          }, [((R = n[k]) == null ? void 0 : R.call(n, V)) ?? _])]) : _;
        }
      });
    })]));
  }
}), As = O({
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
  ...Pt(Is(), ["collapseIcon", "expandIcon", "density"]),
  ...Pt(Cs(), ["groupCollapseIcon", "groupExpandIcon", "density"]),
  ...Pn()
}, "VDataTableRows"), ia = U()({
  name: "VDataTableRows",
  inheritAttrs: !1,
  props: As(),
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const {
      columns: l
    } = Pa(), {
      expandOnClick: i,
      toggleExpand: o,
      isExpanded: r
    } = Ps(), {
      isSelected: s,
      toggleSelect: c
    } = Ia(), {
      toggleGroup: u,
      isGroupOpen: d
    } = Ss(), {
      t: f
    } = st(), {
      mobile: v
    } = Tt(e);
    return ee(() => {
      var g, y;
      const m = Pt(e, ["groupCollapseIcon", "groupExpandIcon", "density"]);
      return e.loading && (!e.items.length || a.loading) ? C("tr", {
        class: "v-data-table-rows-loading",
        key: "loading"
      }, [C("td", {
        colspan: l.value.length
      }, [((g = a.loading) == null ? void 0 : g.call(a)) ?? f(e.loadingText)])]) : !e.loading && !e.items.length && !e.hideNoData ? C("tr", {
        class: "v-data-table-rows-no-data",
        key: "no-data"
      }, [C("td", {
        colspan: l.value.length
      }, [((y = a["no-data"]) == null ? void 0 : y.call(a)) ?? f(e.noDataText)])]) : C(ce, null, [e.items.map((h, b) => {
        var V, I;
        if (h.type === "group") {
          const A = {
            index: b,
            item: h,
            columns: l.value,
            isExpanded: r,
            toggleExpand: o,
            isSelected: s,
            toggleSelect: c,
            toggleGroup: u,
            isGroupOpen: d
          };
          return a["group-header"] ? a["group-header"](A) : w(Qv, j({
            key: `group-header_${h.id}`,
            item: h
          }, ci(n, ":groupHeader", () => A), m), a);
        }
        if (h.type === "group-summary") {
          const A = {
            index: b,
            item: h,
            columns: l.value,
            toggleGroup: u
          };
          return ((V = a["group-summary"]) == null ? void 0 : V.call(a, A)) ?? "";
        }
        const k = {
          index: b,
          item: h.raw,
          internalItem: h,
          columns: l.value,
          isExpanded: r,
          toggleExpand: o,
          isSelected: s,
          toggleSelect: c
        }, p = {
          ...k,
          props: j({
            key: `item_${h.key ?? h.index}`,
            onClick: i.value ? () => {
              o(h);
            } : void 0,
            index: b,
            item: h,
            cellProps: e.cellProps,
            collapseIcon: e.collapseIcon,
            expandIcon: e.expandIcon,
            density: e.density,
            mobile: v.value
          }, ci(n, ":row", () => k), typeof e.rowProps == "function" ? e.rowProps({
            item: k.item,
            index: k.index,
            internalItem: k.internalItem
          }) : e.rowProps)
        };
        return C(ce, {
          key: p.props.key
        }, [a.item ? a.item(p) : w(em, p.props, a), r(h) && ((I = a["expanded-row"]) == null ? void 0 : I.call(a, k))]);
      })]);
    }), {};
  }
}), Ts = O({
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  height: [Number, String],
  hover: Boolean,
  striped: {
    type: String,
    default: null,
    validator: (e) => ["even", "odd"].includes(e)
  },
  ...oe(),
  ...Me(),
  ...ge(),
  ...xe()
}, "VTable"), oa = U()({
  name: "VTable",
  props: Ts(),
  setup(e, t) {
    let {
      slots: n,
      emit: a
    } = t;
    const {
      themeClasses: l
    } = Ae(e), {
      densityClasses: i
    } = dt(e);
    return ee(() => w(e.tag, {
      class: q(["v-table", {
        "v-table--fixed-height": !!e.height,
        "v-table--fixed-header": e.fixedHeader,
        "v-table--fixed-footer": e.fixedFooter,
        "v-table--has-top": !!n.top,
        "v-table--has-bottom": !!n.bottom,
        "v-table--hover": e.hover,
        "v-table--striped-even": e.striped === "even",
        "v-table--striped-odd": e.striped === "odd"
      }, l.value, i.value, e.class]),
      style: re(e.style)
    }, {
      default: () => {
        var o, r, s;
        return [(o = n.top) == null ? void 0 : o.call(n), n.default ? C("div", {
          class: "v-table__wrapper",
          style: {
            height: J(e.height)
          }
        }, [C("table", null, [n.default()])]) : (r = n.wrapper) == null ? void 0 : r.call(n), (s = n.bottom) == null ? void 0 : s.call(n)];
      }
    })), {};
  }
}), tm = O({
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
function nm(e, t, n, a) {
  const l = e.returnObject ? t : Ne(t, e.itemValue), i = Ne(t, e.itemSelectable, !0), o = a.reduce((r, s) => (s.key != null && (r[s.key] = Ne(t, s.value)), r), {});
  return {
    type: "item",
    key: e.returnObject ? Ne(t, e.itemValue) : l,
    index: n,
    value: l,
    selectable: i,
    columns: o,
    raw: t
  };
}
function am(e, t, n) {
  return t.map((a, l) => nm(e, a, l, n));
}
function Es(e, t) {
  return {
    items: x(() => am(e, e.items, t.value))
  };
}
function _s(e) {
  let {
    page: t,
    itemsPerPage: n,
    sortBy: a,
    groupBy: l,
    search: i
  } = e;
  const o = Ie("VDataTable"), r = () => ({
    page: t.value,
    itemsPerPage: n.value,
    sortBy: a.value,
    groupBy: l.value,
    search: i.value
  });
  let s = null;
  X(r, (c) => {
    We(s, c) || (s && s.search !== c.search && (t.value = 1), o.emit("update:options", c), s = c);
  }, {
    deep: !0,
    immediate: !0
  });
}
const lm = (e, t, n) => {
  if (e == null || t == null) return -1;
  if (!t.length) return 0;
  e = e.toString().toLocaleLowerCase(), t = t.toString().toLocaleLowerCase();
  const a = [];
  let l = e.indexOf(t);
  for (; ~l; )
    a.push([l, l + t.length]), l = e.indexOf(t, l + t.length);
  return a.length ? a : -1;
};
function Na(e, t) {
  if (!(e == null || typeof e == "boolean" || e === -1))
    return typeof e == "number" ? [[e, e + t.length]] : Array.isArray(e[0]) ? e : [e];
}
const Bs = O({
  customFilter: Function,
  customKeyFilter: Object,
  filterKeys: [Array, String],
  filterMode: {
    type: String,
    default: "intersection"
  },
  noFilter: Boolean
}, "filter");
function im(e, t, n) {
  var s;
  const a = [], l = (n == null ? void 0 : n.default) ?? lm, i = n != null && n.filterKeys ? Oe(n.filterKeys) : !1, o = Object.keys((n == null ? void 0 : n.customKeyFilter) ?? {}).length;
  if (!(e != null && e.length)) return a;
  let r = null;
  e: for (let c = 0; c < e.length; c++) {
    const [u, d = u] = Oe(e[c]), f = {}, v = {};
    let m = -1;
    if ((t || o > 0) && !(n != null && n.noFilter)) {
      let g = !1;
      if (typeof u == "object") {
        if (u.type === "divider" || u.type === "subheader") {
          (r == null ? void 0 : r.type) === "divider" && u.type === "subheader" && a.push(r), r = {
            index: c,
            matches: {},
            type: u.type
          };
          continue;
        }
        const b = i || Object.keys(d);
        g = b.length === o;
        for (const k of b) {
          const p = Ne(d, k), V = (s = n == null ? void 0 : n.customKeyFilter) == null ? void 0 : s[k];
          if (m = V ? V(p, t, u) : l(p, t, u), m !== -1 && m !== !1)
            V ? f[k] = Na(m, t) : v[k] = Na(m, t);
          else if ((n == null ? void 0 : n.filterMode) === "every")
            continue e;
        }
      } else
        m = l(u, t, u), m !== -1 && m !== !1 && (v.title = Na(m, t));
      const y = Object.keys(v).length, h = Object.keys(f).length;
      if (!y && !h || (n == null ? void 0 : n.filterMode) === "union" && h !== o && !y || (n == null ? void 0 : n.filterMode) === "intersection" && (h !== o || !y && o > 0 && !g)) continue;
    }
    r && (a.push(r), r = null), a.push({
      index: c,
      matches: {
        ...v,
        ...f
      }
    });
  }
  return a;
}
function Ds(e, t, n, a) {
  const l = G([]), i = G(/* @__PURE__ */ new Map()), o = x(() => a != null && a.transform ? lt(t).map((s) => [s, a.transform(s)]) : lt(t));
  _e(() => {
    const s = typeof n == "function" ? n() : lt(n), c = typeof s != "string" && typeof s != "number" ? "" : String(s), u = im(o.value, c, {
      customKeyFilter: {
        ...e.customKeyFilter,
        ...lt(a == null ? void 0 : a.customKeyFilter)
      },
      default: e.customFilter,
      filterKeys: e.filterKeys,
      filterMode: e.filterMode,
      noFilter: e.noFilter
    }), d = lt(t), f = [], v = /* @__PURE__ */ new Map();
    u.forEach((m) => {
      let {
        index: g,
        matches: y
      } = m;
      const h = d[g];
      f.push(h), v.set(h.value, y);
    }), l.value = f, i.value = v;
  });
  function r(s) {
    return i.value.get(s.value);
  }
  return {
    filteredItems: l,
    filteredMatches: i,
    getMatches: r
  };
}
function om(e, t, n) {
  return n == null || !n.length ? t : n.map((a, l) => {
    const i = l === 0 ? 0 : n[l - 1][1], o = [C("span", {
      class: q(`${e}__unmask`)
    }, [t.slice(i, a[0])]), C("span", {
      class: q(`${e}__mask`)
    }, [t.slice(a[0], a[1])])];
    return l === n.length - 1 && o.push(C("span", {
      class: q(`${e}__unmask`)
    }, [t.slice(a[1])])), C(ce, null, [o]);
  });
}
const Fs = O({
  ...As(),
  hideDefaultBody: Boolean,
  hideDefaultFooter: Boolean,
  hideDefaultHeader: Boolean,
  width: [String, Number],
  search: String,
  ...Jv(),
  ...qv(),
  ...Rv(),
  ...tm(),
  ...Uv(),
  ...Yv(),
  ...gs(),
  ...Ts()
}, "DataTable"), rm = O({
  ...qr(),
  ...Fs(),
  ...Bs(),
  ...Bl()
}, "VDataTable");
U()({
  name: "VDataTable",
  props: rm(),
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
    } = ys(e), {
      sortBy: i,
      multiSort: o,
      mustSort: r
    } = fs(e), {
      page: s,
      itemsPerPage: c
    } = Qr(e), {
      disableSort: u
    } = sa(e), {
      columns: d,
      headers: f,
      sortFunctions: v,
      sortRawFunctions: m,
      filterFunctions: g
    } = os(e, {
      groupBy: l,
      showSelect: T(() => e.showSelect),
      showExpand: T(() => e.showExpand)
    }), {
      items: y
    } = Es(e, d), h = T(() => e.search), {
      filteredItems: b
    } = Ds(e, y, h, {
      transform: (N) => N.columns,
      customKeyFilter: g
    }), {
      toggleSort: k
    } = vs({
      sortBy: i,
      multiSort: o,
      mustSort: r,
      page: s
    }), {
      sortByWithGroups: p,
      opened: V,
      extractRows: I,
      isGroupOpen: A,
      toggleGroup: S
    } = bs({
      groupBy: l,
      sortBy: i,
      disableSort: u
    }), {
      sortedItems: E
    } = Kv(e, b, p, {
      transform: (N) => ({
        ...N.raw,
        ...N.columns
      }),
      sortFunctions: v,
      sortRawFunctions: m
    }), {
      flatItems: P
    } = ks(E, l, V, () => !!a["group-summary"]), _ = x(() => P.value.length), {
      startIndex: D,
      stopIndex: F,
      pageCount: L,
      setItemsPerPage: R
    } = Jr({
      page: s,
      itemsPerPage: c,
      itemsLength: _
    }), {
      paginatedItems: W
    } = Mv({
      items: P,
      startIndex: D,
      stopIndex: F,
      itemsPerPage: c
    }), K = x(() => I(W.value)), {
      isSelected: te,
      select: le,
      selectAll: $,
      toggleSelect: Q,
      someSelected: M,
      allSelected: B
    } = cs(e, {
      allItems: y,
      currentPage: K
    }), {
      isExpanded: H,
      toggleExpand: ie
    } = Vs(e);
    _s({
      page: s,
      itemsPerPage: c,
      sortBy: i,
      groupBy: l,
      search: h
    }), nt({
      VDataTableRows: {
        hideNoData: T(() => e.hideNoData),
        noDataText: T(() => e.noDataText),
        loading: T(() => e.loading),
        loadingText: T(() => e.loadingText)
      }
    });
    const ue = x(() => ({
      page: s.value,
      itemsPerPage: c.value,
      sortBy: i.value,
      pageCount: L.value,
      toggleSort: k,
      setItemsPerPage: R,
      someSelected: M.value,
      allSelected: B.value,
      isSelected: te,
      select: le,
      selectAll: $,
      toggleSelect: Q,
      isExpanded: H,
      toggleExpand: ie,
      isGroupOpen: A,
      toggleGroup: S,
      items: K.value.map((N) => N.raw),
      internalItems: K.value,
      groupedItems: W.value,
      columns: d.value,
      headers: f.value
    }));
    return ee(() => {
      const N = aa.filterProps(e), Z = la.filterProps(e), ve = ia.filterProps(e), ke = oa.filterProps(e);
      return w(oa, j({
        class: ["v-data-table", {
          "v-data-table--show-select": e.showSelect,
          "v-data-table--loading": e.loading
        }, e.class],
        style: e.style
      }, ke, {
        fixedHeader: e.fixedHeader || e.sticky
      }), {
        top: () => {
          var Ce;
          return (Ce = a.top) == null ? void 0 : Ce.call(a, ue.value);
        },
        default: () => {
          var Ce, me, z, ne, ae, fe;
          return a.default ? a.default(ue.value) : C(ce, null, [(Ce = a.colgroup) == null ? void 0 : Ce.call(a, ue.value), !e.hideDefaultHeader && C("thead", {
            key: "thead"
          }, [w(la, Z, a)]), (me = a.thead) == null ? void 0 : me.call(a, ue.value), !e.hideDefaultBody && C("tbody", null, [(z = a["body.prepend"]) == null ? void 0 : z.call(a, ue.value), a.body ? a.body(ue.value) : w(ia, j(n, ve, {
            items: W.value
          }), a), (ne = a["body.append"]) == null ? void 0 : ne.call(a, ue.value)]), (ae = a.tbody) == null ? void 0 : ae.call(a, ue.value), (fe = a.tfoot) == null ? void 0 : fe.call(a, ue.value)]);
        },
        bottom: () => a.bottom ? a.bottom(ue.value) : !e.hideDefaultFooter && C(ce, null, [w(Tn, null, null), w(aa, N, {
          prepend: a["footer.prepend"]
        })])
      });
    }), {};
  }
});
const sm = O({
  itemsLength: {
    type: [Number, String],
    required: !0
  },
  ...qr(),
  ...Fs(),
  ...Bl()
}, "VDataTableServer"), lg = U()({
  name: "VDataTableServer",
  props: sm(),
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
    } = ys(e), {
      sortBy: i,
      multiSort: o,
      mustSort: r
    } = fs(e), {
      page: s,
      itemsPerPage: c
    } = Qr(e), {
      disableSort: u
    } = sa(e), d = x(() => parseInt(e.itemsLength, 10)), {
      columns: f,
      headers: v
    } = os(e, {
      groupBy: l,
      showSelect: T(() => e.showSelect),
      showExpand: T(() => e.showExpand)
    }), {
      items: m
    } = Es(e, f), {
      toggleSort: g
    } = vs({
      sortBy: i,
      multiSort: o,
      mustSort: r,
      page: s
    }), {
      opened: y,
      isGroupOpen: h,
      toggleGroup: b,
      extractRows: k
    } = bs({
      groupBy: l,
      sortBy: i,
      disableSort: u
    }), {
      pageCount: p,
      setItemsPerPage: V
    } = Jr({
      page: s,
      itemsPerPage: c,
      itemsLength: d
    }), {
      flatItems: I
    } = ks(m, l, y, () => !!a["group-summary"]), {
      isSelected: A,
      select: S,
      selectAll: E,
      toggleSelect: P,
      someSelected: _,
      allSelected: D
    } = cs(e, {
      allItems: m,
      currentPage: m
    }), {
      isExpanded: F,
      toggleExpand: L
    } = Vs(e), R = x(() => k(m.value));
    _s({
      page: s,
      itemsPerPage: c,
      sortBy: i,
      groupBy: l,
      search: T(() => e.search)
    }), Pe("v-data-table", {
      toggleSort: g,
      sortBy: i
    }), nt({
      VDataTableRows: {
        hideNoData: T(() => e.hideNoData),
        noDataText: T(() => e.noDataText),
        loading: T(() => e.loading),
        loadingText: T(() => e.loadingText)
      }
    });
    const W = x(() => ({
      page: s.value,
      itemsPerPage: c.value,
      sortBy: i.value,
      pageCount: p.value,
      toggleSort: g,
      setItemsPerPage: V,
      someSelected: _.value,
      allSelected: D.value,
      isSelected: A,
      select: S,
      selectAll: E,
      toggleSelect: P,
      isExpanded: F,
      toggleExpand: L,
      isGroupOpen: h,
      toggleGroup: b,
      items: R.value.map((K) => K.raw),
      internalItems: R.value,
      groupedItems: I.value,
      columns: f.value,
      headers: v.value
    }));
    ee(() => {
      const K = aa.filterProps(e), te = la.filterProps(e), le = ia.filterProps(e), $ = oa.filterProps(e);
      return w(oa, j({
        class: ["v-data-table", {
          "v-data-table--loading": e.loading
        }, e.class],
        style: e.style
      }, $, {
        fixedHeader: e.fixedHeader || e.sticky
      }), {
        top: () => {
          var Q;
          return (Q = a.top) == null ? void 0 : Q.call(a, W.value);
        },
        default: () => {
          var Q, M, B, H, ie, ue;
          return a.default ? a.default(W.value) : C(ce, null, [(Q = a.colgroup) == null ? void 0 : Q.call(a, W.value), !e.hideDefaultHeader && C("thead", {
            key: "thead",
            class: "v-data-table__thead",
            role: "rowgroup"
          }, [w(la, te, a)]), (M = a.thead) == null ? void 0 : M.call(a, W.value), !e.hideDefaultBody && C("tbody", {
            class: "v-data-table__tbody",
            role: "rowgroup"
          }, [(B = a["body.prepend"]) == null ? void 0 : B.call(a, W.value), a.body ? a.body(W.value) : w(ia, j(n, le, {
            items: I.value
          }), a), (H = a["body.append"]) == null ? void 0 : H.call(a, W.value)]), (ie = a.tbody) == null ? void 0 : ie.call(a, W.value), (ue = a.tfoot) == null ? void 0 : ue.call(a, W.value)]);
        },
        bottom: () => a.bottom ? a.bottom(W.value) : !e.hideDefaultFooter && C(ce, null, [w(Tn, null, null), w(aa, K, {
          prepend: a["footer.prepend"]
        })])
      });
    });
  }
}), um = O({
  ...oe(),
  ...ge()
}, "VCardActions"), cm = U()({
  name: "VCardActions",
  props: um(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return nt({
      VBtn: {
        slim: !0,
        variant: "text"
      }
    }), ee(() => w(e.tag, {
      class: q(["v-card-actions", e.class]),
      style: re(e.style)
    }, n)), {};
  }
}), dm = O({
  opacity: [Number, String],
  ...oe(),
  ...ge()
}, "VCardSubtitle"), fm = U()({
  name: "VCardSubtitle",
  props: dm(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ee(() => w(e.tag, {
      class: q(["v-card-subtitle", e.class]),
      style: re([{
        "--v-card-subtitle-opacity": e.opacity
      }, e.style])
    }, n)), {};
  }
}), vm = va("v-card-title"), mm = O({
  appendAvatar: String,
  appendIcon: se,
  prependAvatar: String,
  prependIcon: se,
  subtitle: {
    type: [String, Number, Boolean],
    default: void 0
  },
  title: {
    type: [String, Number, Boolean],
    default: void 0
  },
  ...oe(),
  ...Me(),
  ...ge()
}, "VCardItem"), gm = U()({
  name: "VCardItem",
  props: mm(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ee(() => {
      const a = !!(e.prependAvatar || e.prependIcon), l = !!(a || n.prepend), i = !!(e.appendAvatar || e.appendIcon), o = !!(i || n.append), r = !!(e.title != null || n.title), s = !!(e.subtitle != null || n.subtitle);
      return w(e.tag, {
        class: q(["v-card-item", e.class]),
        style: re(e.style)
      }, {
        default: () => {
          var c;
          return [l && C("div", {
            key: "prepend",
            class: "v-card-item__prepend"
          }, [n.prepend ? w(we, {
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
          }, n.prepend) : C(ce, null, [e.prependAvatar && w(At, {
            key: "prepend-avatar",
            density: e.density,
            image: e.prependAvatar
          }, null), e.prependIcon && w(Ve, {
            key: "prepend-icon",
            density: e.density,
            icon: e.prependIcon
          }, null)])]), C("div", {
            class: "v-card-item__content"
          }, [r && w(vm, {
            key: "title"
          }, {
            default: () => {
              var u;
              return [((u = n.title) == null ? void 0 : u.call(n)) ?? Ft(e.title)];
            }
          }), s && w(fm, {
            key: "subtitle"
          }, {
            default: () => {
              var u;
              return [((u = n.subtitle) == null ? void 0 : u.call(n)) ?? Ft(e.subtitle)];
            }
          }), (c = n.default) == null ? void 0 : c.call(n)]), o && C("div", {
            key: "append",
            class: "v-card-item__append"
          }, [n.append ? w(we, {
            key: "append-defaults",
            disabled: !i,
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
          }, n.append) : C(ce, null, [e.appendIcon && w(Ve, {
            key: "append-icon",
            density: e.density,
            icon: e.appendIcon
          }, null), e.appendAvatar && w(At, {
            key: "append-avatar",
            density: e.density,
            image: e.appendAvatar
          }, null)])])];
        }
      });
    }), {};
  }
}), hm = O({
  opacity: [Number, String],
  ...oe(),
  ...ge()
}, "VCardText"), ym = U()({
  name: "VCardText",
  props: hm(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ee(() => w(e.tag, {
      class: q(["v-card-text", e.class]),
      style: re([{
        "--v-card-text-opacity": e.opacity
      }, e.style])
    }, n)), {};
  }
}), bm = O({
  appendAvatar: String,
  appendIcon: se,
  disabled: Boolean,
  flat: Boolean,
  hover: Boolean,
  image: String,
  link: {
    type: Boolean,
    default: void 0
  },
  prependAvatar: String,
  prependIcon: se,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  subtitle: {
    type: [String, Number, Boolean],
    default: void 0
  },
  text: {
    type: [String, Number, Boolean],
    default: void 0
  },
  title: {
    type: [String, Number, Boolean],
    default: void 0
  },
  ...vt(),
  ...oe(),
  ...Me(),
  ...ut(),
  ...gt(),
  ...xa(),
  ...sn(),
  ..._n(),
  ...ze(),
  ...ba(),
  ...ge(),
  ...xe(),
  ...mt({
    variant: "elevated"
  })
}, "VCard"), ig = U()({
  name: "VCard",
  directives: {
    vRipple: pt
  },
  props: bm(),
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const {
      themeClasses: l
    } = Ae(e), {
      borderClasses: i
    } = bt(e), {
      colorClasses: o,
      colorStyles: r,
      variantClasses: s
    } = Ht(e), {
      densityClasses: c
    } = dt(e), {
      dimensionStyles: u
    } = ct(e), {
      elevationClasses: d
    } = St(e), {
      loaderClasses: f
    } = ka(e), {
      locationStyles: v
    } = En(e), {
      positionClasses: m
    } = Bn(e), {
      roundedClasses: g
    } = Ue(e), y = ya(e, n);
    return ee(() => {
      const h = e.link !== !1 && y.isLink.value, b = !e.disabled && e.link !== !1 && (e.link || y.isClickable.value), k = h ? "a" : e.tag, p = !!(a.title || e.title != null), V = !!(a.subtitle || e.subtitle != null), I = p || V, A = !!(a.append || e.appendAvatar || e.appendIcon), S = !!(a.prepend || e.prependAvatar || e.prependIcon), E = !!(a.image || e.image), P = I || S || A, _ = !!(a.text || e.text != null);
      return $e(w(k, j(y.linkProps, {
        class: ["v-card", {
          "v-card--disabled": e.disabled,
          "v-card--flat": e.flat,
          "v-card--hover": e.hover && !(e.disabled || e.flat),
          "v-card--link": b
        }, l.value, i.value, o.value, c.value, d.value, f.value, m.value, g.value, s.value, e.class],
        style: [r.value, u.value, v.value, e.style],
        onClick: b && y.navigate,
        tabindex: e.disabled ? -1 : void 0
      }), {
        default: () => {
          var D;
          return [E && C("div", {
            key: "image",
            class: "v-card__image"
          }, [a.image ? w(we, {
            key: "image-defaults",
            disabled: !e.image,
            defaults: {
              VImg: {
                cover: !0,
                src: e.image
              }
            }
          }, a.image) : w(ha, {
            key: "image-img",
            cover: !0,
            src: e.image
          }, null)]), w(Cl, {
            name: "v-card",
            active: !!e.loading,
            color: typeof e.loading == "boolean" ? void 0 : e.loading
          }, {
            default: a.loader
          }), P && w(gm, {
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
          }), _ && w(ym, {
            key: "text"
          }, {
            default: () => {
              var F;
              return [((F = a.text) == null ? void 0 : F.call(a)) ?? e.text];
            }
          }), (D = a.default) == null ? void 0 : D.call(a), a.actions && w(cm, null, {
            default: a.actions
          }), Nt(b, "v-card")];
        }
      }), [[pt, b && e.ripple]]);
    }), {};
  }
}), Sm = O({
  fluid: {
    type: Boolean,
    default: !1
  },
  ...oe(),
  ...ut(),
  ...ge()
}, "VContainer"), og = U()({
  name: "VContainer",
  props: Sm(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      rtlClasses: a
    } = Ze(), {
      dimensionStyles: l
    } = ct(e);
    return ee(() => w(e.tag, {
      class: q(["v-container", {
        "v-container--fluid": e.fluid
      }, a.value, e.class]),
      style: re([l.value, e.style])
    }, n)), {};
  }
}), Os = ma.reduce((e, t) => (e[t] = {
  type: [Boolean, String, Number],
  default: !1
}, e), {}), Ls = ma.reduce((e, t) => {
  const n = "offset" + nn(t);
  return e[n] = {
    type: [String, Number],
    default: null
  }, e;
}, {}), $s = ma.reduce((e, t) => {
  const n = "order" + nn(t);
  return e[n] = {
    type: [String, Number],
    default: null
  }, e;
}, {}), Xi = {
  col: Object.keys(Os),
  offset: Object.keys(Ls),
  order: Object.keys($s)
};
function wm(e, t, n) {
  let a = e;
  if (!(n == null || n === !1)) {
    if (t) {
      const l = t.replace(e, "");
      a += `-${l}`;
    }
    return e === "col" && (a = "v-" + a), e === "col" && (n === "" || n === !0) || (a += `-${n}`), a.toLowerCase();
  }
}
const xm = ["auto", "start", "end", "center", "baseline", "stretch"], km = O({
  cols: {
    type: [Boolean, String, Number],
    default: !1
  },
  ...Os,
  offset: {
    type: [String, Number],
    default: null
  },
  ...Ls,
  order: {
    type: [String, Number],
    default: null
  },
  ...$s,
  alignSelf: {
    type: String,
    default: null,
    validator: (e) => xm.includes(e)
  },
  ...oe(),
  ...ge()
}, "VCol"), rg = U()({
  name: "VCol",
  props: km(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = x(() => {
      const l = [];
      let i;
      for (i in Xi)
        Xi[i].forEach((r) => {
          const s = e[r], c = wm(i, r, s);
          c && l.push(c);
        });
      const o = l.some((r) => r.startsWith("v-col-"));
      return l.push({
        // Default to .v-col if no other col-{bp}-* classes generated nor `cols` specified.
        "v-col": !o || !e.cols,
        [`v-col-${e.cols}`]: e.cols,
        [`offset-${e.offset}`]: e.offset,
        [`order-${e.order}`]: e.order,
        [`align-self-${e.alignSelf}`]: e.alignSelf
      }), l;
    });
    return () => {
      var l;
      return Mt(e.tag, {
        class: [a.value, e.class],
        style: e.style
      }, (l = n.default) == null ? void 0 : l.call(n));
    };
  }
}), Fl = ["start", "end", "center"], Ms = ["space-between", "space-around", "space-evenly"];
function Ol(e, t) {
  return ma.reduce((n, a) => {
    const l = e + nn(a);
    return n[l] = t(), n;
  }, {});
}
const Cm = [...Fl, "baseline", "stretch"], Rs = (e) => Cm.includes(e), Ns = Ol("align", () => ({
  type: String,
  default: null,
  validator: Rs
})), pm = [...Fl, ...Ms], Hs = (e) => pm.includes(e), zs = Ol("justify", () => ({
  type: String,
  default: null,
  validator: Hs
})), Vm = [...Fl, ...Ms, "stretch"], Ws = (e) => Vm.includes(e), js = Ol("alignContent", () => ({
  type: String,
  default: null,
  validator: Ws
})), qi = {
  align: Object.keys(Ns),
  justify: Object.keys(zs),
  alignContent: Object.keys(js)
}, Pm = {
  align: "align",
  justify: "justify",
  alignContent: "align-content"
};
function Im(e, t, n) {
  let a = Pm[e];
  if (n != null) {
    if (t) {
      const l = t.replace(e, "");
      a += `-${l}`;
    }
    return a += `-${n}`, a.toLowerCase();
  }
}
const Am = O({
  dense: Boolean,
  noGutters: Boolean,
  align: {
    type: String,
    default: null,
    validator: Rs
  },
  ...Ns,
  justify: {
    type: String,
    default: null,
    validator: Hs
  },
  ...zs,
  alignContent: {
    type: String,
    default: null,
    validator: Ws
  },
  ...js,
  ...oe(),
  ...ge()
}, "VRow"), sg = U()({
  name: "VRow",
  props: Am(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = x(() => {
      const l = [];
      let i;
      for (i in qi)
        qi[i].forEach((o) => {
          const r = e[o], s = Im(i, o, r);
          s && l.push(s);
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
      return Mt(e.tag, {
        class: ["v-row", a.value, e.class],
        style: e.style
      }, (l = n.default) == null ? void 0 : l.call(n));
    };
  }
}), ug = va("v-spacer", "div", "VSpacer"), Tm = va("v-alert-title"), Em = O({
  iconSize: [Number, String],
  iconSizes: {
    type: Array,
    default: () => [["x-small", 10], ["small", 16], ["default", 24], ["large", 28], ["x-large", 32]]
  }
}, "iconSize");
function _m(e, t) {
  return {
    iconSize: x(() => {
      const a = new Map(e.iconSizes), l = e.iconSize ?? t() ?? "default";
      return a.has(l) ? a.get(l) : l;
    })
  };
}
const Bm = ["success", "info", "warning", "error"], Dm = O({
  border: {
    type: [Boolean, String],
    validator: (e) => typeof e == "boolean" || ["top", "end", "bottom", "start"].includes(e)
  },
  borderColor: String,
  closable: Boolean,
  closeIcon: {
    type: se,
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
    validator: (e) => Bm.includes(e)
  },
  ...oe(),
  ...Me(),
  ...ut(),
  ...gt(),
  ...Em(),
  ...sn(),
  ..._n(),
  ...ze(),
  ...ge(),
  ...xe(),
  ...mt({
    variant: "flat"
  })
}, "VAlert"), cg = U()({
  name: "VAlert",
  props: Dm(),
  emits: {
    "click:close": (e) => !0,
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      emit: n,
      slots: a
    } = t;
    const l = de(e, "modelValue"), i = T(() => {
      if (e.icon !== !1)
        return e.type ? e.icon ?? `$${e.type}` : e.icon;
    }), {
      iconSize: o
    } = _m(e, () => e.prominent ? 44 : void 0), {
      themeClasses: r
    } = Ae(e), {
      colorClasses: s,
      colorStyles: c,
      variantClasses: u
    } = Ht(() => ({
      color: e.color ?? e.type,
      variant: e.variant
    })), {
      densityClasses: d
    } = dt(e), {
      dimensionStyles: f
    } = ct(e), {
      elevationClasses: v
    } = St(e), {
      locationStyles: m
    } = En(e), {
      positionClasses: g
    } = Bn(e), {
      roundedClasses: y
    } = Ue(e), {
      textColorClasses: h,
      textColorStyles: b
    } = ot(() => e.borderColor), {
      t: k
    } = st(), p = T(() => ({
      "aria-label": k(e.closeLabel),
      onClick(V) {
        l.value = !1, n("click:close", V);
      }
    }));
    return () => {
      const V = !!(a.prepend || i.value), I = !!(a.title || e.title), A = !!(a.close || e.closable), S = {
        density: e.density,
        icon: i.value,
        size: e.iconSize || e.prominent ? o.value : void 0
      };
      return l.value && w(e.tag, {
        class: q(["v-alert", e.border && {
          "v-alert--border": !!e.border,
          [`v-alert--border-${e.border === !0 ? "start" : e.border}`]: !0
        }, {
          "v-alert--prominent": e.prominent
        }, r.value, s.value, d.value, v.value, g.value, y.value, u.value, e.class]),
        style: re([c.value, f.value, m.value, e.style]),
        role: "alert"
      }, {
        default: () => {
          var E, P;
          return [Nt(!1, "v-alert"), e.border && C("div", {
            key: "border",
            class: q(["v-alert__border", h.value]),
            style: re(b.value)
          }, null), V && C("div", {
            key: "prepend",
            class: "v-alert__prepend"
          }, [a.prepend ? w(we, {
            key: "prepend-defaults",
            disabled: !i.value,
            defaults: {
              VIcon: {
                ...S
              }
            }
          }, a.prepend) : w(Ve, j({
            key: "prepend-icon"
          }, S), null)]), C("div", {
            class: "v-alert__content"
          }, [I && w(Tm, {
            key: "title"
          }, {
            default: () => {
              var _;
              return [((_ = a.title) == null ? void 0 : _.call(a)) ?? e.title];
            }
          }), ((E = a.text) == null ? void 0 : E.call(a)) ?? e.text, (P = a.default) == null ? void 0 : P.call(a)]), a.append && C("div", {
            key: "append",
            class: "v-alert__append"
          }, [a.append()]), A && C("div", {
            key: "close",
            class: "v-alert__close"
          }, [a.close ? w(we, {
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
              var _;
              return [(_ = a.close) == null ? void 0 : _.call(a, {
                props: p.value
              })];
            }
          }) : w(et, j({
            key: "close-btn",
            icon: e.closeIcon,
            size: "x-small",
            variant: "text"
          }, p.value), null)])];
        }
      });
    };
  }
}), Fm = O({
  color: String,
  ...vt(),
  ...oe(),
  ...ut(),
  ...gt(),
  ...sn(),
  ..._n(),
  ...ze(),
  ...ge(),
  ...xe()
}, "VSheet"), dg = U()({
  name: "VSheet",
  props: Fm(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: a
    } = Ae(e), {
      backgroundColorClasses: l,
      backgroundColorStyles: i
    } = Xe(() => e.color), {
      borderClasses: o
    } = bt(e), {
      dimensionStyles: r
    } = ct(e), {
      elevationClasses: s
    } = St(e), {
      locationStyles: c
    } = En(e), {
      positionClasses: u
    } = Bn(e), {
      roundedClasses: d
    } = Ue(e);
    return ee(() => w(e.tag, {
      class: q(["v-sheet", a.value, l.value, o.value, s.value, u.value, d.value, e.class]),
      style: re([i.value, r.value, c.value, e.style])
    }, n)), {};
  }
}), Ll = Symbol.for("vuetify:v-tabs"), Gs = O({
  fixed: Boolean,
  sliderColor: String,
  hideSlider: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ...qe(pl({
    selectedClass: "v-tab--selected",
    variant: "text"
  }), ["active", "block", "flat", "location", "position", "symbol"])
}, "VTab"), Om = U()({
  name: "VTab",
  props: Gs(),
  setup(e, t) {
    let {
      slots: n,
      attrs: a
    } = t;
    const {
      textColorClasses: l,
      textColorStyles: i
    } = ot(() => e.sliderColor), o = Y(), r = Y(), s = x(() => e.direction === "horizontal"), c = x(() => {
      var d, f;
      return ((f = (d = o.value) == null ? void 0 : d.group) == null ? void 0 : f.isSelected.value) ?? !1;
    });
    function u(d) {
      var v, m;
      let {
        value: f
      } = d;
      if (f) {
        const g = (m = (v = o.value) == null ? void 0 : v.$el.parentElement) == null ? void 0 : m.querySelector(".v-tab--selected .v-tab__slider"), y = r.value;
        if (!g || !y) return;
        const h = getComputedStyle(g).color, b = g.getBoundingClientRect(), k = y.getBoundingClientRect(), p = s.value ? "x" : "y", V = s.value ? "X" : "Y", I = s.value ? "right" : "bottom", A = s.value ? "width" : "height", S = b[p], E = k[p], P = S > E ? b[I] - k[I] : b[p] - k[p], _ = Math.sign(P) > 0 ? s.value ? "right" : "bottom" : Math.sign(P) < 0 ? s.value ? "left" : "top" : "center", F = (Math.abs(P) + (Math.sign(P) < 0 ? b[A] : k[A])) / Math.max(b[A], k[A]) || 0, L = b[A] / k[A] || 0, R = 1.5;
        kt(y, {
          backgroundColor: [h, "currentcolor"],
          transform: [`translate${V}(${P}px) scale${V}(${L})`, `translate${V}(${P / R}px) scale${V}(${(F - 1) / R + 1})`, "none"],
          transformOrigin: Array(3).fill(_)
        }, {
          duration: 225,
          easing: mn
        });
      }
    }
    return ee(() => {
      const d = et.filterProps(e);
      return w(et, j({
        symbol: Ll,
        ref: o,
        class: ["v-tab", e.class],
        style: e.style,
        tabindex: c.value ? 0 : -1,
        role: "tab",
        "aria-selected": String(c.value),
        active: !1
      }, d, a, {
        block: e.fixed,
        maxWidth: e.fixed ? 300 : void 0,
        "onGroup:selected": u
      }), {
        ...n,
        default: () => {
          var f;
          return C(ce, null, [((f = n.default) == null ? void 0 : f.call(n)) ?? e.text, !e.hideSlider && C("div", {
            ref: r,
            class: q(["v-tab__slider", l.value]),
            style: re(i.value)
          }, null)]);
        }
      });
    }), wt({}, o);
  }
}), Lm = O({
  ...qe(Ar(), ["continuous", "nextIcon", "prevIcon", "showArrows", "touch", "mandatory"])
}, "VTabsWindow"), $m = U()({
  name: "VTabsWindow",
  props: Lm(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = ye(Ll, null), l = de(e, "modelValue"), i = x({
      get() {
        var o;
        return l.value != null || !a ? l.value : (o = a.items.value.find((r) => a.selected.value.includes(r.id))) == null ? void 0 : o.value;
      },
      set(o) {
        l.value = o;
      }
    });
    return ee(() => {
      const o = ji.filterProps(e);
      return w(ji, j({
        _as: "VTabsWindow"
      }, o, {
        modelValue: i.value,
        "onUpdate:modelValue": (r) => i.value = r,
        class: ["v-tabs-window", e.class],
        style: e.style,
        mandatory: !1,
        touch: !1
      }), n);
    }), {};
  }
}), Mm = O({
  ...Tr()
}, "VTabsWindowItem"), Rm = U()({
  name: "VTabsWindowItem",
  props: Mm(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ee(() => {
      const a = Gi.filterProps(e);
      return w(Gi, j({
        _as: "VTabsWindowItem"
      }, a, {
        class: ["v-tabs-window-item", e.class],
        style: e.style
      }), n);
    }), {};
  }
});
function Nm(e) {
  return e ? e.map((t) => Wn(t) ? t : {
    text: t,
    value: t
  }) : [];
}
const Hm = O({
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
  ...Pt(Gs(), ["spaced"]),
  ...El({
    mandatory: "force",
    selectedClass: "v-tab-item--selected"
  }),
  ...Me(),
  ...ge()
}, "VTabs"), fg = U()({
  name: "VTabs",
  props: Hm(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const l = de(e, "modelValue"), i = x(() => Nm(e.items)), {
      densityClasses: o
    } = dt(e), {
      backgroundColorClasses: r,
      backgroundColorStyles: s
    } = Xe(() => e.bgColor), {
      scopeId: c
    } = rn();
    return nt({
      VTab: {
        color: T(() => e.color),
        direction: T(() => e.direction),
        stacked: T(() => e.stacked),
        fixed: T(() => e.fixedTabs),
        sliderColor: T(() => e.sliderColor),
        hideSlider: T(() => e.hideSlider)
      }
    }), ee(() => {
      const u = na.filterProps(e), d = !!(a.window || e.items.length > 0);
      return C(ce, null, [w(na, j(u, {
        modelValue: l.value,
        "onUpdate:modelValue": (f) => l.value = f,
        class: ["v-tabs", `v-tabs--${e.direction}`, `v-tabs--align-tabs-${e.alignTabs}`, {
          "v-tabs--fixed-tabs": e.fixedTabs,
          "v-tabs--grow": e.grow,
          "v-tabs--stacked": e.stacked
        }, o.value, r.value, e.class],
        style: [{
          "--v-tabs-height": J(e.height)
        }, s.value, e.style],
        role: "tablist",
        symbol: Ll
      }, c, n), {
        default: () => {
          var f;
          return [((f = a.default) == null ? void 0 : f.call(a)) ?? i.value.map((v) => {
            var m;
            return ((m = a.tab) == null ? void 0 : m.call(a, {
              item: v
            })) ?? w(Om, j(v, {
              key: v.text,
              value: v.value,
              spaced: e.spaced
            }), {
              default: a[`tab.${v.value}`] ? () => {
                var g;
                return (g = a[`tab.${v.value}`]) == null ? void 0 : g.call(a, {
                  item: v
                });
              } : void 0
            });
          })];
        }
      }), d && w($m, j({
        modelValue: l.value,
        "onUpdate:modelValue": (f) => l.value = f,
        key: "tabs-window"
      }, c), {
        default: () => {
          var f;
          return [i.value.map((v) => {
            var m;
            return ((m = a.item) == null ? void 0 : m.call(a, {
              item: v
            })) ?? w(Rm, {
              value: v.value
            }, {
              default: () => {
                var g;
                return (g = a[`item.${v.value}`]) == null ? void 0 : g.call(a, {
                  item: v
                });
              }
            });
          }), (f = a.window) == null ? void 0 : f.call(a)];
        }
      })]);
    }), {};
  }
}), zm = O({
  autoSelectFirst: {
    type: [Boolean, String]
  },
  clearOnSelect: Boolean,
  search: String,
  ...Bs({
    filterKeys: ["title"]
  }),
  ...Kr(),
  ...qe(Al({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...ln({
    transition: !1
  })
}, "VAutocomplete"), vg = U()({
  name: "VAutocomplete",
  props: zm(),
  emits: {
    "update:focused": (e) => !0,
    "update:search": (e) => !0,
    "update:modelValue": (e) => !0,
    "update:menu": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      t: a
    } = st(), l = Y(), i = G(!1), o = G(!0), r = G(!1), s = Y(), c = Y(), u = G(-1), {
      items: d,
      transformIn: f,
      transformOut: v
    } = ir(e), {
      textColorClasses: m,
      textColorStyles: g
    } = ot(() => {
      var z;
      return (z = l.value) == null ? void 0 : z.color;
    }), y = de(e, "search", ""), h = de(e, "modelValue", [], (z) => f(z === null ? [null] : Oe(z)), (z) => {
      const ne = v(z);
      return e.multiple ? ne : ne[0] ?? null;
    }), b = x(() => typeof e.counterValue == "function" ? e.counterValue(h.value) : typeof e.counterValue == "number" ? e.counterValue : h.value.length), k = Il(e), {
      filteredItems: p,
      getMatches: V
    } = Ds(e, d, () => o.value ? "" : y.value), I = x(() => e.hideSelected ? p.value.filter((z) => !h.value.some((ne) => ne.value === z.value)) : p.value), A = x(() => !!(e.chips || n.chip)), S = x(() => A.value || !!n.selection), E = x(() => h.value.map((z) => z.props.value)), P = x(() => {
      var ne;
      return (e.autoSelectFirst === !0 || e.autoSelectFirst === "exact" && y.value === ((ne = I.value[0]) == null ? void 0 : ne.title)) && I.value.length > 0 && !o.value && !r.value;
    }), _ = x(() => e.hideNoData && !I.value.length || k.isReadonly.value || k.isDisabled.value), D = de(e, "menu"), F = x({
      get: () => D.value,
      set: (z) => {
        var ne;
        D.value && !z && ((ne = s.value) != null && ne.ΨopenChildren.size) || z && _.value || (D.value = z);
      }
    }), {
      menuId: L,
      ariaExpanded: R,
      ariaControls: W,
      ariaLabel: K
    } = Yr(e, F), te = Y(), le = Ur(te, l);
    function $(z) {
      e.openOnClear && (F.value = !0), y.value = "";
    }
    function Q() {
      _.value || (F.value = !0);
    }
    function M(z) {
      _.value || (i.value && (z.preventDefault(), z.stopPropagation()), F.value = !F.value);
    }
    function B(z) {
      var ne;
      (Gn(z) || z.key === "Backspace") && ((ne = l.value) == null || ne.focus());
    }
    function H(z) {
      var fe, Te, Re, Qe, be;
      if (k.isReadonly.value) return;
      const ne = (fe = l.value) == null ? void 0 : fe.selectionStart, ae = h.value.length;
      if (["Enter", "ArrowDown", "ArrowUp"].includes(z.key) && z.preventDefault(), ["Enter", "ArrowDown"].includes(z.key) && (F.value = !0), ["Escape"].includes(z.key) && (F.value = !1), P.value && ["Enter", "Tab"].includes(z.key) && !h.value.some((pe) => {
        let {
          value: De
        } = pe;
        return De === I.value[0].value;
      }) && me(I.value[0]), z.key === "ArrowDown" && P.value && ((Te = te.value) == null || Te.focus("next")), ["Backspace", "Delete"].includes(z.key)) {
        if (!e.multiple && S.value && h.value.length > 0 && !y.value) return me(h.value[0], !1);
        if (~u.value) {
          z.preventDefault();
          const pe = u.value;
          me(h.value[u.value], !1), u.value = pe >= ae - 1 ? ae - 2 : pe;
        } else z.key === "Backspace" && !y.value && (u.value = ae - 1);
        return;
      }
      if (e.multiple)
        if (z.key === "ArrowLeft") {
          if (u.value < 0 && ne && ne > 0) return;
          const pe = u.value > -1 ? u.value - 1 : ae - 1;
          if (h.value[pe])
            u.value = pe;
          else {
            const De = ((Re = y.value) == null ? void 0 : Re.length) ?? null;
            u.value = -1, (Qe = l.value) == null || Qe.setSelectionRange(De, De);
          }
        } else if (z.key === "ArrowRight") {
          if (u.value < 0) return;
          const pe = u.value + 1;
          h.value[pe] ? u.value = pe : (u.value = -1, (be = l.value) == null || be.setSelectionRange(0, 0));
        } else ~u.value && Gn(z) && (u.value = -1);
    }
    function ie(z) {
      if (qt(l.value, ":autofill") || qt(l.value, ":-webkit-autofill")) {
        const ne = d.value.find((ae) => ae.title === z.target.value);
        ne && me(ne);
      }
    }
    function ue() {
      var z;
      e.eager && ((z = c.value) == null || z.calculateVisibleItems());
    }
    function N() {
      var z;
      i.value && (o.value = !0, (z = l.value) == null || z.focus());
    }
    function Z(z) {
      i.value = !0, setTimeout(() => {
        r.value = !0;
      });
    }
    function ve(z) {
      r.value = !1;
    }
    function ke(z) {
      (z == null || z === "" && !e.multiple && !S.value) && (h.value = []);
    }
    const Ce = G(!1);
    function me(z) {
      let ne = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!(!z || z.props.disabled))
        if (e.multiple) {
          const ae = h.value.findIndex((Te) => (e.valueComparator || We)(Te.value, z.value)), fe = ne ?? !~ae;
          if (~ae) {
            const Te = fe ? [...h.value, z] : [...h.value];
            Te.splice(ae, 1), h.value = Te;
          } else fe && (h.value = [...h.value, z]);
          e.clearOnSelect && (y.value = "");
        } else {
          const ae = ne !== !1;
          h.value = ae ? [z] : [], y.value = ae && !S.value ? z.title : "", Se(() => {
            F.value = !1, o.value = !0;
          });
        }
    }
    return X(i, (z, ne) => {
      var ae;
      z !== ne && (z ? (Ce.value = !0, y.value = e.multiple || S.value ? "" : String(((ae = h.value.at(-1)) == null ? void 0 : ae.props.title) ?? ""), o.value = !0, Se(() => Ce.value = !1)) : (!e.multiple && y.value == null && (h.value = []), F.value = !1, y.value = "", u.value = -1));
    }), X(y, (z) => {
      !i.value || Ce.value || (z && (F.value = !0), o.value = !z);
    }), X(F, () => {
      if (!e.hideSelected && F.value && h.value.length) {
        const z = I.value.findIndex((ne) => h.value.some((ae) => ne.value === ae.value));
        he && window.requestAnimationFrame(() => {
          var ne;
          z >= 0 && ((ne = c.value) == null || ne.scrollToIndex(z));
        });
      }
    }), X(d, (z, ne) => {
      F.value || i.value && !ne.length && z.length && (F.value = !0);
    }), ee(() => {
      const z = !!(!e.hideNoData || I.value.length || n["prepend-item"] || n["append-item"] || n["no-data"]), ne = h.value.length > 0, ae = ta.filterProps(e);
      return w(ta, j({
        ref: l
      }, ae, {
        modelValue: y.value,
        "onUpdate:modelValue": [(fe) => y.value = fe, ke],
        focused: i.value,
        "onUpdate:focused": (fe) => i.value = fe,
        validationValue: h.externalValue,
        counterValue: b.value,
        dirty: ne,
        onChange: ie,
        class: ["v-autocomplete", `v-autocomplete--${e.multiple ? "multiple" : "single"}`, {
          "v-autocomplete--active-menu": F.value,
          "v-autocomplete--chips": !!e.chips,
          "v-autocomplete--selection-slot": !!S.value,
          "v-autocomplete--selecting-index": u.value > -1
        }, e.class],
        style: e.style,
        readonly: k.isReadonly.value,
        placeholder: ne ? void 0 : e.placeholder,
        "onClick:clear": $,
        "onMousedown:control": Q,
        onKeydown: H,
        "aria-expanded": R.value,
        "aria-controls": W.value
      }), {
        ...n,
        default: () => C(ce, null, [w(Vr, j({
          id: L.value,
          ref: s,
          modelValue: F.value,
          "onUpdate:modelValue": (fe) => F.value = fe,
          activator: "parent",
          contentClass: "v-autocomplete__content",
          disabled: _.value,
          eager: e.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: e.transition,
          onAfterEnter: ue,
          onAfterLeave: N
        }, e.menuProps), {
          default: () => [z && w(rr, j({
            ref: te,
            filterable: !0,
            selected: E.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: (fe) => fe.preventDefault(),
            onKeydown: B,
            onFocusin: Z,
            onFocusout: ve,
            tabindex: "-1",
            selectable: !0,
            "aria-live": "polite",
            color: e.itemColor ?? e.color
          }, le, e.listProps), {
            default: () => {
              var fe, Te, Re;
              return [(fe = n["prepend-item"]) == null ? void 0 : fe.call(n), !I.value.length && !e.hideNoData && (((Te = n["no-data"]) == null ? void 0 : Te.call(n)) ?? w(Jt, {
                key: "no-data",
                title: a(e.noDataText)
              }, null)), w(Gr, {
                ref: c,
                renderless: !0,
                items: I.value,
                itemKey: "value"
              }, {
                default: (Qe) => {
                  var Ml, Rl, Nl;
                  let {
                    item: be,
                    index: pe,
                    itemRef: De
                  } = Qe;
                  const $l = j(be.props, {
                    ref: De,
                    key: be.value,
                    active: P.value && pe === 0 ? !0 : void 0,
                    onClick: () => me(be, null)
                  });
                  return be.type === "divider" ? ((Ml = n.divider) == null ? void 0 : Ml.call(n, {
                    props: be.raw,
                    index: pe
                  })) ?? w(Tn, j(be.props, {
                    key: `divider-${pe}`
                  }), null) : be.type === "subheader" ? ((Rl = n.subheader) == null ? void 0 : Rl.call(n, {
                    props: be.raw,
                    index: pe
                  })) ?? w(xl, j(be.props, {
                    key: `subheader-${pe}`
                  }), null) : ((Nl = n.item) == null ? void 0 : Nl.call(n, {
                    item: be,
                    index: pe,
                    props: $l
                  })) ?? w(Jt, j($l, {
                    role: "option"
                  }), {
                    prepend: (Dn) => {
                      let {
                        isSelected: Us
                      } = Dn;
                      return C(ce, null, [e.multiple && !e.hideSelected ? w($t, {
                        key: be.value,
                        modelValue: Us,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, be.props.prependAvatar && w(At, {
                        image: be.props.prependAvatar
                      }, null), be.props.prependIcon && w(Ve, {
                        icon: be.props.prependIcon
                      }, null)]);
                    },
                    title: () => {
                      var Dn;
                      return o.value ? be.title : om("v-autocomplete", be.title, (Dn = V(be)) == null ? void 0 : Dn.title);
                    }
                  });
                }
              }), (Re = n["append-item"]) == null ? void 0 : Re.call(n)];
            }
          })]
        }), h.value.map((fe, Te) => {
          function Re(De) {
            De.stopPropagation(), De.preventDefault(), me(fe, !1);
          }
          const Qe = {
            "onClick:close": Re,
            onKeydown(De) {
              De.key !== "Enter" && De.key !== " " || (De.preventDefault(), De.stopPropagation(), Re(De));
            },
            onMousedown(De) {
              De.preventDefault(), De.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, be = A.value ? !!n.chip : !!n.selection, pe = be ? ul(A.value ? n.chip({
            item: fe,
            index: Te,
            props: Qe
          }) : n.selection({
            item: fe,
            index: Te
          })) : void 0;
          if (!(be && !pe))
            return C("div", {
              key: fe.value,
              class: q(["v-autocomplete__selection", Te === u.value && ["v-autocomplete__selection--selected", m.value]]),
              style: re(Te === u.value ? g.value : {})
            }, [A.value ? n.chip ? w(we, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: e.closableChips,
                  size: "small",
                  text: fe.title
                }
              }
            }, {
              default: () => [pe]
            }) : w(_l, j({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: fe.title,
              disabled: fe.props.disabled
            }, Qe), null) : pe ?? C("span", {
              class: "v-autocomplete__selection-text"
            }, [fe.title, e.multiple && Te < h.value.length - 1 && C("span", {
              class: "v-autocomplete__selection-comma"
            }, [zn(",")])])]);
        })]),
        "append-inner": function() {
          var Qe, be;
          for (var fe = arguments.length, Te = new Array(fe), Re = 0; Re < fe; Re++)
            Te[Re] = arguments[Re];
          return C(ce, null, [(Qe = n["append-inner"]) == null ? void 0 : Qe.call(n, ...Te), e.menuIcon ? w(Ve, {
            class: "v-autocomplete__menu-icon",
            color: (be = l.value) == null ? void 0 : be.fieldIconColor,
            icon: e.menuIcon,
            onMousedown: M,
            onClick: fu,
            "aria-label": K.value,
            title: K.value,
            tabindex: "-1"
          }, null) : void 0]);
        }
      });
    }), wt({
      isFocused: i,
      isPristine: o,
      menu: F,
      search: y,
      filteredItems: p,
      select: me
    }, l);
  }
}), Wm = O({
  autoGrow: Boolean,
  autofocus: Boolean,
  counter: [Boolean, Number, String],
  counterValue: Function,
  prefix: String,
  placeholder: String,
  persistentPlaceholder: Boolean,
  persistentCounter: Boolean,
  noResize: Boolean,
  rows: {
    type: [Number, String],
    default: 5,
    validator: (e) => !isNaN(parseFloat(e))
  },
  maxRows: {
    type: [Number, String],
    validator: (e) => !isNaN(parseFloat(e))
  },
  suffix: String,
  modelModifiers: Object,
  ...Or(),
  ...Va(),
  ...Pl()
}, "VTextarea"), mg = U()({
  name: "VTextarea",
  directives: {
    vIntersect: Qt
  },
  inheritAttrs: !1,
  props: Wm(),
  emits: {
    "click:control": (e) => !0,
    "mousedown:control": (e) => !0,
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0,
    "update:rows": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: a,
      slots: l
    } = t;
    const i = de(e, "modelValue"), {
      isFocused: o,
      focus: r,
      blur: s
    } = pa(e), {
      onIntersect: c
    } = $r(e), u = x(() => typeof e.counterValue == "function" ? e.counterValue(i.value) : (i.value || "").toString().length), d = x(() => {
      if (n.maxlength) return n.maxlength;
      if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string"))
        return e.counter;
    }), f = Y(), v = Y(), m = G(""), g = Y(), y = Lr(e), h = x(() => e.persistentPlaceholder || o.value || e.active);
    function b() {
      var D;
      y.isSuppressing.value && y.update(), g.value !== document.activeElement && ((D = g.value) == null || D.focus()), o.value || r();
    }
    function k(D) {
      b(), a("click:control", D);
    }
    function p(D) {
      a("mousedown:control", D);
    }
    function V(D) {
      D.stopPropagation(), b(), Se(() => {
        i.value = "", fa(e["onClick:clear"], D);
      });
    }
    function I(D) {
      var L;
      const F = D.target;
      if (i.value = F.value, (L = e.modelModifiers) != null && L.trim) {
        const R = [F.selectionStart, F.selectionEnd];
        Se(() => {
          F.selectionStart = R[0], F.selectionEnd = R[1];
        });
      }
    }
    const A = Y(), S = Y(Number(e.rows)), E = x(() => ["plain", "underlined"].includes(e.variant));
    _e(() => {
      e.autoGrow || (S.value = Number(e.rows));
    });
    function P() {
      e.autoGrow && Se(() => {
        if (!A.value || !v.value) return;
        const D = getComputedStyle(A.value), F = getComputedStyle(v.value.$el), L = parseFloat(D.getPropertyValue("--v-field-padding-top")) + parseFloat(D.getPropertyValue("--v-input-padding-top")) + parseFloat(D.getPropertyValue("--v-field-padding-bottom")), R = A.value.scrollHeight, W = parseFloat(D.lineHeight), K = Math.max(parseFloat(e.rows) * W + L, parseFloat(F.getPropertyValue("--v-input-control-height"))), te = parseFloat(e.maxRows) * W + L || 1 / 0, le = Fe(R ?? 0, K, te);
        S.value = Math.floor((le - L) / W), m.value = J(le);
      });
    }
    rt(P), X(i, P), X(() => e.rows, P), X(() => e.maxRows, P), X(() => e.density, P), X(S, (D) => {
      a("update:rows", D);
    });
    let _;
    return X(A, (D) => {
      D ? (_ = new ResizeObserver(P), _.observe(A.value)) : _ == null || _.disconnect();
    }), Ge(() => {
      _ == null || _.disconnect();
    }), ee(() => {
      const D = !!(l.counter || e.counter || e.counterValue), F = !!(D || l.details), [L, R] = da(n), {
        modelValue: W,
        ...K
      } = tn.filterProps(e), te = {
        ...ea.filterProps(e),
        "onClick:clear": V
      };
      return w(tn, j({
        ref: f,
        modelValue: i.value,
        "onUpdate:modelValue": (le) => i.value = le,
        class: ["v-textarea v-text-field", {
          "v-textarea--prefixed": e.prefix,
          "v-textarea--suffixed": e.suffix,
          "v-text-field--prefixed": e.prefix,
          "v-text-field--suffixed": e.suffix,
          "v-textarea--auto-grow": e.autoGrow,
          "v-textarea--no-resize": e.noResize || e.autoGrow,
          "v-input--plain-underlined": E.value
        }, e.class],
        style: e.style
      }, L, K, {
        centerAffix: S.value === 1 && !E.value,
        focused: o.value
      }), {
        ...l,
        default: (le) => {
          let {
            id: $,
            isDisabled: Q,
            isDirty: M,
            isReadonly: B,
            isValid: H,
            hasDetails: ie
          } = le;
          return w(ea, j({
            ref: v,
            style: {
              "--v-textarea-control-height": m.value
            },
            onClick: k,
            onMousedown: p,
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"]
          }, te, {
            id: $.value,
            active: h.value || M.value,
            centerAffix: S.value === 1 && !E.value,
            dirty: M.value || e.dirty,
            disabled: Q.value,
            focused: o.value,
            details: ie.value,
            error: H.value === !1
          }), {
            ...l,
            default: (ue) => {
              let {
                props: {
                  class: N,
                  ...Z
                }
              } = ue;
              return C(ce, null, [e.prefix && C("span", {
                class: "v-text-field__prefix"
              }, [e.prefix]), $e(C("textarea", j({
                ref: g,
                class: N,
                value: i.value,
                onInput: I,
                autofocus: e.autofocus,
                readonly: B.value,
                disabled: Q.value,
                placeholder: e.placeholder,
                rows: e.rows,
                name: y.fieldName.value,
                autocomplete: y.fieldAutocomplete.value,
                onFocus: b,
                onBlur: s
              }, Z, R), null), [[Qt, {
                handler: c
              }, null, {
                once: !0
              }]]), e.autoGrow && $e(C("textarea", {
                class: q([N, "v-textarea__sizer"]),
                id: `${Z.id}-sizer`,
                "onUpdate:modelValue": (ve) => i.value = ve,
                ref: A,
                readonly: !0,
                "aria-hidden": "true"
              }, null), [[ou, i.value]]), e.suffix && C("span", {
                class: "v-text-field__suffix"
              }, [e.suffix])]);
            }
          });
        },
        details: F ? (le) => {
          var $;
          return C(ce, null, [($ = l.details) == null ? void 0 : $.call(l, le), D && C(ce, null, [C("span", null, null), w(Er, {
            active: e.persistentCounter || o.value,
            value: u.value,
            max: d.value,
            disabled: e.disabled
          }, l.counter)])]);
        } : void 0
      });
    }), wt({}, f, v, g);
  }
}), jm = O({
  fullscreen: Boolean,
  retainFocus: {
    type: Boolean,
    default: !0
  },
  scrollable: Boolean,
  ...Ca({
    origin: "center center",
    scrollStrategy: "block",
    transition: {
      component: yl
    },
    zIndex: 2400
  })
}, "VDialog"), gg = U()({
  name: "VDialog",
  props: jm(),
  emits: {
    "update:modelValue": (e) => !0,
    afterEnter: () => !0,
    afterLeave: () => !0
  },
  setup(e, t) {
    let {
      emit: n,
      slots: a
    } = t;
    const l = de(e, "modelValue"), {
      scopeId: i
    } = rn(), o = Y();
    async function r(d) {
      var m, g, y;
      const f = d.relatedTarget, v = d.target;
      await Se(), l.value && f !== v && ((m = o.value) != null && m.contentEl) && // We're the topmost dialog
      ((g = o.value) != null && g.globalTop) && // It isn't the document or the dialog body
      ![document, o.value.contentEl].includes(v) && // It isn't inside the dialog body
      !o.value.contentEl.contains(v) && ((y = Xt(o.value.contentEl)[0]) == null || y.focus());
    }
    function s(d) {
      var y;
      if (d.key !== "Tab" || !((y = o.value) != null && y.contentEl)) return;
      const f = Xt(o.value.contentEl);
      if (!f.length) return;
      const v = f[0], m = f[f.length - 1], g = document.activeElement;
      d.shiftKey && g === v ? (d.preventDefault(), m.focus()) : !d.shiftKey && g === m && (d.preventDefault(), v.focus());
    }
    Ge(() => {
      document.removeEventListener("focusin", r), document.removeEventListener("keydown", s);
    }), he && X(() => l.value && e.retainFocus, (d) => {
      d ? (document.addEventListener("focusin", r, {
        once: !0
      }), document.addEventListener("keydown", s)) : (document.removeEventListener("focusin", r), document.removeEventListener("keydown", s));
    }, {
      immediate: !0
    });
    function c() {
      var d;
      n("afterEnter"), (e.scrim || e.retainFocus) && ((d = o.value) != null && d.contentEl) && !o.value.contentEl.contains(document.activeElement) && o.value.contentEl.focus({
        preventScroll: !0
      });
    }
    function u() {
      n("afterLeave");
    }
    return X(l, async (d) => {
      var f;
      d || (await Se(), (f = o.value.activatorEl) == null || f.focus({
        preventScroll: !0
      }));
    }), ee(() => {
      const d = en.filterProps(e), f = j({
        "aria-haspopup": "dialog"
      }, e.activatorProps), v = j({
        tabindex: -1
      }, e.contentProps);
      return w(en, j({
        ref: o,
        class: ["v-dialog", {
          "v-dialog--fullscreen": e.fullscreen,
          "v-dialog--scrollable": e.scrollable
        }, e.class],
        style: e.style
      }, d, {
        modelValue: l.value,
        "onUpdate:modelValue": (m) => l.value = m,
        "aria-modal": "true",
        activatorProps: f,
        contentProps: v,
        height: e.fullscreen ? void 0 : e.height,
        width: e.fullscreen ? void 0 : e.width,
        maxHeight: e.fullscreen ? void 0 : e.maxHeight,
        maxWidth: e.fullscreen ? void 0 : e.maxWidth,
        role: "dialog",
        onAfterEnter: c,
        onAfterLeave: u
      }, i), {
        activator: a.activator,
        default: function() {
          for (var m = arguments.length, g = new Array(m), y = 0; y < m; y++)
            g[y] = arguments[y];
          return w(we, {
            root: "VDialog"
          }, {
            default: () => {
              var h;
              return [(h = a.default) == null ? void 0 : h.call(a, ...g)];
            }
          });
        }
      });
    }), wt({}, o);
  }
}), Gm = O({
  ...oe(),
  ...cv()
}, "VForm"), hg = U()({
  name: "VForm",
  props: Gm(),
  emits: {
    "update:modelValue": (e) => !0,
    submit: (e) => !0
  },
  setup(e, t) {
    let {
      slots: n,
      emit: a
    } = t;
    const l = dv(e), i = Y();
    function o(s) {
      s.preventDefault(), l.reset();
    }
    function r(s) {
      const c = s, u = l.validate();
      c.then = u.then.bind(u), c.catch = u.catch.bind(u), c.finally = u.finally.bind(u), a("submit", c), c.defaultPrevented || u.then((d) => {
        var v;
        let {
          valid: f
        } = d;
        f && ((v = i.value) == null || v.submit());
      }), c.preventDefault();
    }
    return ee(() => {
      var s;
      return C("form", {
        ref: i,
        class: q(["v-form", e.class]),
        style: re(e.style),
        novalidate: !0,
        onReset: o,
        onSubmit: r
      }, [(s = n.default) == null ? void 0 : s.call(n, l)]);
    }), wt(l, i);
  }
}), yg = U()({
  name: "VSlideGroupItem",
  props: Sa(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = kn(e, Tl);
    return () => {
      var l;
      return (l = n.default) == null ? void 0 : l.call(n, {
        isSelected: a.isSelected.value,
        select: a.select,
        toggle: a.toggle,
        selectedClass: a.selectedClass.value
      });
    };
  }
});
export {
  At as A,
  gm as B,
  _r as C,
  cm as D,
  cg as E,
  dg as F,
  fg as G,
  Om as H,
  $m as I,
  Rm as J,
  Li as K,
  vg as L,
  Xr as M,
  mg as N,
  ag as O,
  Td as P,
  gg as Q,
  vm as R,
  ym as S,
  hg as T,
  na as U,
  Ai as V,
  yg as W,
  rg as X,
  sg as Y,
  ug as Z,
  Km as a,
  Jt as b,
  ud as c,
  xl as d,
  Xm as e,
  rr as f,
  qm as g,
  Jm as h,
  Ve as i,
  Zm as j,
  Tn as k,
  et as l,
  Ym as m,
  eg as n,
  ng as o,
  Vr as p,
  Qm as q,
  ha as r,
  tg as s,
  ji as t,
  Gi as u,
  Oi as v,
  ta as w,
  lg as x,
  og as y,
  ig as z
};
//# sourceMappingURL=vuetify.js.map
