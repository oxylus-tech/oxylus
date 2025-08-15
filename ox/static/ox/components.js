import { inject as ve, computed as I, ref as q, reactive as Qe, toRef as H, shallowRef as ee, onMounted as We, provide as Ue, useId as ft, onDeactivated as ln, onActivated as ri, onBeforeUnmount as mt, createVNode as h, Transition as aa, mergeProps as D, defineComponent as Fe, useAttrs as gt, createElementBlock as fe, createCommentVNode as se, unref as p, openBlock as R, Fragment as X, createBlock as G, withModifiers as Ie, resolveComponent as ci, withCtx as O, renderList as Ae, createTextVNode as Pe, toDisplayString as Me, watch as J, watchEffect as et, onScopeDispose as je, readonly as nn, createElementVNode as C, nextTick as Be, mergeModels as ya, useModel as ha, renderSlot as z, normalizeStyle as Ve, normalizeClass as me, effectScope as on, toValue as Tl, toRaw as di, warn as vi, Teleport as Na, withDirectives as Ye, vShow as _t, useSlots as lt, onErrorCaptured as fi, createSlots as st, markRaw as mi, onBeforeMount as gi, cloneVNode as yi, normalizeProps as _e, guardReactiveProps as $e, h as hi, vModelText as bi, defineAsyncComponent as pi, onBeforeUpdate as wi, capitalize as Si, toRefs as el, useTemplateRef as sn, withKeys as _l, onUnmounted as xi } from "vue";
import { useAction as ki, t as oe, filterSlots as ct, useAppContext as Vi, usePanels as Ci, useQuery as Pi, ifNotEqualFn as Ii, defineAsyncComponent as Ai, rules as Ti, useModelList as _i, Query as $i, ifNotEqual as Bi, tKeys as Ei, useModelEditor as Oi, useModelPanel as Fi } from "ox";
import { u as Pt, V as pe, a as Ge, b as Ha, c as Ri, d as ba, e as dt, f as pa, g as $t, h as un, i as wa, t as Mi, j as ie, k as Bt, l as Le, m as Ke, n as kt, o as Ht, p as xe, q as zt, r as rt, s as Li, v as rn, w as Wt, x as Ut, y as $l, z as Ta, A as _a, B as Bl, C as El, D as jt, E as Di, M as Sa, F as cn, G as tl, H as Kt, I as dn, J as vn, K as al, L as Ni, N as Gt, O as ll, P as nl, Q as ol, R as Ol, S as ke, T as fn, U as Et, W as yt, X as It, Y as mn, Z as Hi, _ as gn, $ as yn, a0 as St, a1 as hn, a2 as bn, a3 as il, a4 as sl, a5 as ul, a6 as la, a7 as pn, a8 as zi, a9 as Wi, aa as xa, ab as Ui, ac as ji, ad as wn, ae as Sn, af as Ft, ag as Fl, ah as Ki } from "./VAlert-BkLm8i-q.js";
import { k as rl, l as xn, n as K, o as he, q as nt, r as Gi, s as ne, C as kn, u as Xe, t as Je, v as Yi, w as ot, x as qe, y as ht, z as we, A as at, B as Ne, E as Yt, F as Vn, G as qi, H as ut, J as Cn, i as ze, K as Rl, M as At, N as Xi, O as bt, P as Pn, Q as it, R as Se, S as za, U as Zi, V as Ze, W as ka, X as He, Y as cl, Z as In, _ as Qi, $ as Ji, a0 as $a, a1 as es, a2 as ts, a3 as Ct, a4 as as, a5 as An, a6 as na, a7 as ls, c as Zt, a8 as Ml, a9 as ns, aa as oa, ab as Qt } from "./theme-BVAWnHOc.js";
import { V as os, l as Wa, Q as is, F as ss, t as Ba, S as us, o as rs, r as cs } from "./index-VC-9ya-A.js";
import "axios";
import { components as ds } from "ox/vendor";
class tt {
  constructor(n) {
    let {
      x: t,
      y: a,
      width: l,
      height: o
    } = n;
    this.x = t, this.y = a, this.width = l, this.height = o;
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
function Ll(e, n) {
  return {
    x: {
      before: Math.max(0, n.left - e.left),
      after: Math.max(0, e.right - n.right)
    },
    y: {
      before: Math.max(0, n.top - e.top),
      after: Math.max(0, e.bottom - n.bottom)
    }
  };
}
function Tn(e) {
  return Array.isArray(e) ? new tt({
    x: e[0],
    y: e[1],
    width: 0,
    height: 0
  }) : e.getBoundingClientRect();
}
function vs(e) {
  if (e === document.documentElement)
    return visualViewport ? new tt({
      x: visualViewport.scale > 1 ? 0 : visualViewport.offsetLeft,
      y: visualViewport.scale > 1 ? 0 : visualViewport.offsetTop,
      width: visualViewport.width * visualViewport.scale,
      height: visualViewport.height * visualViewport.scale
    }) : new tt({
      x: 0,
      y: 0,
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });
  {
    const n = e.getBoundingClientRect();
    return new tt({
      x: n.x,
      y: n.y,
      width: e.clientWidth,
      height: e.clientHeight
    });
  }
}
function dl(e) {
  const n = e.getBoundingClientRect(), t = getComputedStyle(e), a = t.transform;
  if (a) {
    let l, o, i, s, u;
    if (a.startsWith("matrix3d("))
      l = a.slice(9, -1).split(/, /), o = Number(l[0]), i = Number(l[5]), s = Number(l[12]), u = Number(l[13]);
    else if (a.startsWith("matrix("))
      l = a.slice(7, -1).split(/, /), o = Number(l[0]), i = Number(l[3]), s = Number(l[4]), u = Number(l[5]);
    else
      return new tt(n);
    const r = t.transformOrigin, c = n.x - s - (1 - o) * parseFloat(r), d = n.y - u - (1 - i) * parseFloat(r.slice(r.indexOf(" ") + 1)), f = o ? n.width / o : e.offsetWidth + 1, v = i ? n.height / i : e.offsetHeight + 1;
    return new tt({
      x: c,
      y: d,
      width: f,
      height: v
    });
  } else
    return new tt(n);
}
function wt(e, n, t) {
  if (typeof e.animate > "u") return {
    finished: Promise.resolve()
  };
  let a;
  try {
    a = e.animate(n, t);
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
const ea = /* @__PURE__ */ new WeakMap();
function fs(e, n) {
  Object.keys(n).forEach((t) => {
    if (rl(t)) {
      const a = xn(t), l = ea.get(e);
      if (n[t] == null)
        l == null || l.forEach((o) => {
          const [i, s] = o;
          i === a && (e.removeEventListener(a, s), l.delete(o));
        });
      else if (!l || ![...l].some((o) => o[0] === a && o[1] === n[t])) {
        e.addEventListener(a, n[t]);
        const o = l || /* @__PURE__ */ new Set();
        o.add([a, n[t]]), ea.has(e) || ea.set(e, o);
      }
    } else
      n[t] == null ? e.removeAttribute(t) : e.setAttribute(t, n[t]);
  });
}
function ms(e, n) {
  Object.keys(n).forEach((t) => {
    if (rl(t)) {
      const a = xn(t), l = ea.get(e);
      l == null || l.forEach((o) => {
        const [i, s] = o;
        i === a && (e.removeEventListener(a, s), l.delete(o));
      });
    } else
      e.removeAttribute(t);
  });
}
function _n(e) {
  if (typeof e.getRootNode != "function") {
    for (; e.parentNode; ) e = e.parentNode;
    return e !== document ? null : document;
  }
  const n = e.getRootNode();
  return n !== document && n.getRootNode({
    composed: !0
  }) !== document ? null : n;
}
const Rt = "cubic-bezier(0.4, 0, 0.2, 1)", gs = "cubic-bezier(0.0, 0, 0.2, 1)", ys = "cubic-bezier(0.4, 0, 1, 1)";
function Dl(e, n, t) {
  return Object.keys(e).filter((a) => rl(a) && a.endsWith(n)).reduce((a, l) => (a[l.slice(0, -n.length)] = (o) => e[l](o, t(o)), a), {});
}
function $n(e) {
  let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  for (; e; ) {
    if (n ? hs(e) : vl(e)) return e;
    e = e.parentElement;
  }
  return document.scrollingElement;
}
function ia(e, n) {
  const t = [];
  if (n && e && !n.contains(e)) return t;
  for (; e && (vl(e) && t.push(e), e !== n); )
    e = e.parentElement;
  return t;
}
function vl(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const n = window.getComputedStyle(e);
  return n.overflowY === "scroll" || n.overflowY === "auto" && e.scrollHeight > e.clientHeight;
}
function hs(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const n = window.getComputedStyle(e);
  return ["scroll", "auto"].includes(n.overflowY);
}
function bs(e) {
  for (; e; ) {
    if (window.getComputedStyle(e).position === "fixed")
      return !0;
    e = e.offsetParent;
  }
  return !1;
}
const Mt = Symbol.for("vuetify:layout"), Bn = Symbol.for("vuetify:layout-item"), Nl = 1e3, ps = K({
  overlaps: {
    type: Array,
    default: () => []
  },
  fullHeight: Boolean
}, "layout"), En = K({
  name: {
    type: String
  },
  order: {
    type: [Number, String],
    default: 0
  },
  absolute: Boolean
}, "layout-item");
function On() {
  const e = ve(Mt);
  if (!e) throw new Error("[Vuetify] Could not find injected layout");
  return {
    getLayoutItem: e.getLayoutItem,
    mainRect: e.mainRect,
    mainStyles: e.mainStyles
  };
}
function Fn(e) {
  const n = ve(Mt);
  if (!n) throw new Error("[Vuetify] Could not find injected layout");
  const t = e.id ?? `layout-item-${ft()}`, a = nt("useLayoutItem");
  Ue(Bn, {
    id: t
  });
  const l = ee(!1);
  ln(() => l.value = !0), ri(() => l.value = !1);
  const {
    layoutItemStyles: o,
    layoutItemScrimStyles: i
  } = n.register(a, {
    ...e,
    active: I(() => l.value ? !1 : e.active.value),
    id: t
  });
  return mt(() => n.unregister(t)), {
    layoutItemStyles: o,
    layoutRect: n.layoutRect,
    layoutItemScrimStyles: i
  };
}
const ws = (e, n, t, a) => {
  let l = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };
  const o = [{
    id: "",
    layer: {
      ...l
    }
  }];
  for (const i of e) {
    const s = n.get(i), u = t.get(i), r = a.get(i);
    if (!s || !u || !r) continue;
    const c = {
      ...l,
      [s.value]: parseInt(l[s.value], 10) + (r.value ? parseInt(u.value, 10) : 0)
    };
    o.push({
      id: i,
      layer: c
    }), l = c;
  }
  return o;
};
function Ss(e) {
  const n = ve(Mt, null), t = I(() => n ? n.rootZIndex.value - 100 : Nl), a = q([]), l = Qe(/* @__PURE__ */ new Map()), o = Qe(/* @__PURE__ */ new Map()), i = Qe(/* @__PURE__ */ new Map()), s = Qe(/* @__PURE__ */ new Map()), u = Qe(/* @__PURE__ */ new Map()), {
    resizeRef: r,
    contentRect: c
  } = Pt(), d = I(() => {
    const S = /* @__PURE__ */ new Map(), P = e.overlaps ?? [];
    for (const b of P.filter(($) => $.includes(":"))) {
      const [$, T] = b.split(":");
      if (!a.value.includes($) || !a.value.includes(T)) continue;
      const B = l.get($), L = l.get(T), M = o.get($), W = o.get(T);
      !B || !L || !M || !W || (S.set(T, {
        position: B.value,
        amount: parseInt(M.value, 10)
      }), S.set($, {
        position: L.value,
        amount: -parseInt(W.value, 10)
      }));
    }
    return S;
  }), f = I(() => {
    const S = [...new Set([...i.values()].map((b) => b.value))].sort((b, $) => b - $), P = [];
    for (const b of S) {
      const $ = a.value.filter((T) => {
        var B;
        return ((B = i.get(T)) == null ? void 0 : B.value) === b;
      });
      P.push(...$);
    }
    return ws(P, l, o, s);
  }), v = I(() => !Array.from(u.values()).some((S) => S.value)), g = I(() => f.value[f.value.length - 1].layer), V = H(() => ({
    "--v-layout-left": he(g.value.left),
    "--v-layout-right": he(g.value.right),
    "--v-layout-top": he(g.value.top),
    "--v-layout-bottom": he(g.value.bottom),
    ...v.value ? void 0 : {
      transition: "none"
    }
  })), y = I(() => f.value.slice(1).map((S, P) => {
    let {
      id: b
    } = S;
    const {
      layer: $
    } = f.value[P], T = o.get(b), B = l.get(b);
    return {
      id: b,
      ...$,
      size: Number(T.value),
      position: B.value
    };
  })), w = (S) => y.value.find((P) => P.id === S), m = nt("createLayout"), A = ee(!1);
  We(() => {
    A.value = !0;
  }), Ue(Mt, {
    register: (S, P) => {
      let {
        id: b,
        order: $,
        position: T,
        layoutSize: B,
        elementSize: L,
        active: M,
        disableTransitions: W,
        absolute: U
      } = P;
      i.set(b, $), l.set(b, T), o.set(b, B), s.set(b, M), W && u.set(b, W);
      const te = Gi(Bn, m == null ? void 0 : m.vnode).indexOf(S);
      te > -1 ? a.value.splice(te, 0, b) : a.value.push(b);
      const ae = I(() => y.value.findIndex((F) => F.id === b)), re = I(() => t.value + f.value.length * 2 - ae.value * 2), _ = I(() => {
        const F = T.value === "left" || T.value === "right", j = T.value === "right", be = T.value === "bottom", le = L.value ?? B.value, ue = le === 0 ? "%" : "px", Z = {
          [T.value]: 0,
          zIndex: re.value,
          transform: `translate${F ? "X" : "Y"}(${(M.value ? 0 : -(le === 0 ? 100 : le)) * (j || be ? -1 : 1)}${ue})`,
          position: U.value || t.value !== Nl ? "absolute" : "fixed",
          ...v.value ? void 0 : {
            transition: "none"
          }
        };
        if (!A.value) return Z;
        const ce = y.value[ae.value];
        if (!ce) throw new Error(`[Vuetify] Could not find layout item "${b}"`);
        const ge = d.value.get(b);
        return ge && (ce[ge.position] += ge.amount), {
          ...Z,
          height: F ? `calc(100% - ${ce.top}px - ${ce.bottom}px)` : L.value ? `${L.value}px` : void 0,
          left: j ? void 0 : `${ce.left}px`,
          right: j ? `${ce.right}px` : void 0,
          top: T.value !== "bottom" ? `${ce.top}px` : void 0,
          bottom: T.value !== "top" ? `${ce.bottom}px` : void 0,
          width: F ? L.value ? `${L.value}px` : void 0 : `calc(100% - ${ce.left}px - ${ce.right}px)`
        };
      }), E = I(() => ({
        zIndex: re.value - 1
      }));
      return {
        layoutItemStyles: _,
        layoutItemScrimStyles: E,
        zIndex: re
      };
    },
    unregister: (S) => {
      i.delete(S), l.delete(S), o.delete(S), s.delete(S), u.delete(S), a.value = a.value.filter((P) => P !== S);
    },
    mainRect: g,
    mainStyles: V,
    getLayoutItem: w,
    items: y,
    layoutRect: c,
    rootZIndex: t
  });
  const x = H(() => ["v-layout", {
    "v-layout--full-height": e.fullHeight
  }]), k = H(() => ({
    zIndex: n ? t.value : void 0,
    position: n ? "relative" : void 0,
    overflow: n ? "hidden" : void 0
  }));
  return {
    layoutClasses: x,
    layoutStyles: k,
    getLayoutItem: w,
    items: y,
    layoutRect: c,
    layoutRef: r
  };
}
const xs = K({
  target: [Object, Array]
}, "v-dialog-transition"), Ea = /* @__PURE__ */ new WeakMap(), Rn = ne()({
  name: "VDialogTransition",
  props: xs(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = {
      onBeforeEnter(l) {
        l.style.pointerEvents = "none", l.style.visibility = "hidden";
      },
      async onEnter(l, o) {
        var v;
        await new Promise((g) => requestAnimationFrame(g)), await new Promise((g) => requestAnimationFrame(g)), l.style.visibility = "";
        const i = zl(e.target, l), {
          x: s,
          y: u,
          sx: r,
          sy: c,
          speed: d
        } = i;
        Ea.set(l, i);
        const f = wt(l, [{
          transform: `translate(${s}px, ${u}px) scale(${r}, ${c})`,
          opacity: 0
        }, {}], {
          duration: 225 * d,
          easing: gs
        });
        (v = Hl(l)) == null || v.forEach((g) => {
          wt(g, [{
            opacity: 0
          }, {
            opacity: 0,
            offset: 0.33
          }, {}], {
            duration: 225 * 2 * d,
            easing: Rt
          });
        }), f.finished.then(() => o());
      },
      onAfterEnter(l) {
        l.style.removeProperty("pointer-events");
      },
      onBeforeLeave(l) {
        l.style.pointerEvents = "none";
      },
      async onLeave(l, o) {
        var v;
        await new Promise((g) => requestAnimationFrame(g));
        let i;
        !Ea.has(l) || Array.isArray(e.target) || e.target.offsetParent || e.target.getClientRects().length ? i = zl(e.target, l) : i = Ea.get(l);
        const {
          x: s,
          y: u,
          sx: r,
          sy: c,
          speed: d
        } = i;
        wt(l, [{}, {
          transform: `translate(${s}px, ${u}px) scale(${r}, ${c})`,
          opacity: 0
        }], {
          duration: 125 * d,
          easing: ys
        }).finished.then(() => o()), (v = Hl(l)) == null || v.forEach((g) => {
          wt(g, [{}, {
            opacity: 0,
            offset: 0.2
          }, {
            opacity: 0
          }], {
            duration: 125 * 2 * d,
            easing: Rt
          });
        });
      },
      onAfterLeave(l) {
        l.style.removeProperty("pointer-events");
      }
    };
    return () => e.target ? h(aa, D({
      name: "dialog-transition"
    }, a, {
      css: !1
    }), t) : h(aa, {
      name: "dialog-transition"
    }, t);
  }
});
function Hl(e) {
  var t;
  const n = (t = e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")) == null ? void 0 : t.children;
  return n && [...n];
}
function zl(e, n) {
  const t = Tn(e), a = dl(n), [l, o] = getComputedStyle(n).transformOrigin.split(" ").map((w) => parseFloat(w)), [i, s] = getComputedStyle(n).getPropertyValue("--v-overlay-anchor-origin").split(" ");
  let u = t.left + t.width / 2;
  i === "left" || s === "left" ? u -= t.width / 2 : (i === "right" || s === "right") && (u += t.width / 2);
  let r = t.top + t.height / 2;
  i === "top" || s === "top" ? r -= t.height / 2 : (i === "bottom" || s === "bottom") && (r += t.height / 2);
  const c = t.width / a.width, d = t.height / a.height, f = Math.max(1, c, d), v = c / f || 0, g = d / f || 0, V = a.width * a.height / (window.innerWidth * window.innerHeight), y = V > 0.12 ? Math.min(1.5, (V - 0.12) * 10 + 1) : 1;
  return {
    x: u - (l + a.left),
    y: r - (o + a.top),
    sx: v,
    sy: g,
    speed: y
  };
}
const Lt = /* @__PURE__ */ Fe({
  __name: "OxAction",
  props: {
    item: {},
    title: {},
    icon: {},
    color: {},
    button: { type: Boolean },
    confirm: {},
    permission: {},
    run: { type: Function },
    href: {}
  },
  emits: ["completed"],
  setup(e, { emit: n }) {
    const t = e, a = gt(), l = n, o = ve("user"), { run: i, processing: s, allowed: u } = ki({ user: o, emits: l, props: t });
    return (r, c) => p(u) ? (R(), fe(X, { key: 0 }, [
      t.button ? (R(), G(pe, D({
        key: 0,
        variant: "text"
      }, p(a), {
        disabled: p(s),
        color: t.color,
        icon: t.icon,
        title: t.title,
        "aria-label": t.title,
        onClick: Ie(p(i), ["stop"])
      }), null, 16, ["disabled", "color", "icon", "title", "aria-label", "onClick"])) : (R(), G(Ge, D({ key: 1 }, p(a), {
        title: t.title,
        "base-color": t.color,
        "prepend-icon": t.icon,
        disabled: p(s),
        onClick: Ie(p(i), ["stop"])
      }), null, 16, ["title", "base-color", "prepend-icon", "disabled", "onClick"]))
    ], 64)) : se("", !0);
  }
}), ks = /* @__PURE__ */ Fe({
  __name: "OxActionModelDelete",
  props: {
    item: {}
  },
  setup(e) {
    const n = ve("panel"), t = ve("repos"), a = gt(), l = e;
    async function o(i, s) {
      return await t[s.constructor.entity].api().delete(s.$url(), { delete: l.item.id });
    }
    return (i, s) => (R(), G(Lt, D(p(a), {
      item: l.item,
      icon: "mdi-delete",
      color: "error",
      title: p(oe)("actions.delete"),
      confirm: p(oe)("actions.delete.confirm"),
      permission: [l.item.constructor, "delete"],
      run: o,
      onCompleted: s[0] || (s[0] = (u) => {
        var r;
        return (r = p(n)) == null ? void 0 : r.show({ view: p(n).index });
      })
    }), null, 16, ["item", "title", "confirm", "permission"]));
  }
}), Vs = /* @__PURE__ */ Fe({
  __name: "OxActionPost",
  props: {
    /**
     * URL path to append to item's url. Should be provided.
     */
    path: String,
    /**
     * HTTP method to use (upper or lower cased)
     */
    method: { type: String, default: "post" },
    /** Model repository to use */
    repo: Object,
    /** POST data to send (optional) */
    data: Object,
    /** Pinia-Orm AXIOS options */
    options: Object
  },
  setup(e) {
    const n = gt(), t = e;
    async function a(l, o) {
      const i = t.repo.api();
      return await i[t.method].apply(i, [o.$url(t.path), t.data, t.options]);
    }
    return (l, o) => (R(), G(p(Lt), D(p(n), { run: a }), null, 16));
  }
}), Cs = /* @__PURE__ */ Fe({
  __name: "OxAppNavItem",
  props: {
    name: {},
    url: {},
    permission: {},
    type: {},
    items: {},
    order: {},
    title: {},
    icon: {}
  },
  setup(e) {
    const n = e;
    q(null);
    const t = ve("user"), a = ve("panels");
    I(() => !n.auto || panel.name == n.name);
    function l(i) {
      return i.permission && !t.can(i.permission) ? !1 : i.items ? i.items.some((s) => l(s)) : !0;
    }
    function o() {
      const i = { panel: n.name, href: n.url };
      a.show(i);
    }
    return (i, s) => {
      const u = ci("ox-app-nav-item", !0);
      return l(n) ? (R(), fe(X, { key: 0 }, [
        n.type == "group" ? (R(), G(Ha, {
          key: 0,
          value: n.name
        }, {
          activator: O(({ props: r }) => [
            h(Ge, D(r, {
              title: n.title,
              "prepend-icon": n.icon
            }), null, 16, ["title", "prepend-icon"])
          ]),
          default: O(() => [
            (R(!0), fe(X, null, Ae(n.items, (r, c) => (R(), G(u, D({
              key: c,
              ref_for: !0
            }, r, {
              type: r.type == "group" ? "subheader" : r.type
            }), null, 16, ["type"]))), 128))
          ]),
          _: 1
        }, 8, ["value"])) : n.type == "subheader" ? (R(), fe(X, { key: 1 }, [
          h(Ri, null, {
            default: O(() => [
              Pe(Me(n.title), 1)
            ]),
            _: 1
          }),
          n.items ? (R(!0), fe(X, { key: 0 }, Ae(n.items, (r) => (R(), G(u, D({ ref_for: !0 }, r), null, 16))), 256)) : se("", !0)
        ], 64)) : (R(), G(Ge, {
          key: 2,
          active: p(a).panel == n.name,
          value: n.name,
          "prepend-icon": n.icon,
          title: n.title,
          onClick: Ie(o, ["stop"])
        }, null, 8, ["active", "value", "prepend-icon", "title"]))
      ], 64)) : se("", !0);
    };
  }
});
function Ps(e) {
  let {
    rootEl: n,
    isSticky: t,
    layoutItemStyles: a
  } = e;
  const l = ee(!1), o = ee(0), i = I(() => {
    const r = typeof l.value == "boolean" ? "top" : l.value;
    return [t.value ? {
      top: "auto",
      bottom: "auto",
      height: void 0
    } : void 0, l.value ? {
      [r]: he(o.value)
    } : {
      top: a.value.top
    }];
  });
  We(() => {
    J(t, (r) => {
      r ? window.addEventListener("scroll", u, {
        passive: !0
      }) : window.removeEventListener("scroll", u);
    }, {
      immediate: !0
    });
  }), mt(() => {
    window.removeEventListener("scroll", u);
  });
  let s = 0;
  function u() {
    const r = s > window.scrollY ? "up" : "down", c = n.value.getBoundingClientRect(), d = parseFloat(a.value.top ?? 0), f = window.scrollY - Math.max(0, o.value - d), v = c.height + Math.max(o.value, d) - window.scrollY - window.innerHeight, g = parseFloat(getComputedStyle(n.value).getPropertyValue("--v-body-scroll-y")) || 0;
    c.height < window.innerHeight - d ? (l.value = "top", o.value = d) : r === "up" && l.value === "bottom" || r === "down" && l.value === "top" ? (o.value = window.scrollY + c.top - g, l.value = !0) : r === "down" && v <= 0 ? (o.value = 0, l.value = "bottom") : r === "up" && f <= 0 && (g ? l.value !== "top" && (o.value = -f + g + d, l.value = "top") : (o.value = c.top + f, l.value = "top")), s = window.scrollY;
  }
  return {
    isStuck: l,
    stickyStyles: i
  };
}
const Is = 100, As = 20;
function Wl(e) {
  return (e < 0 ? -1 : 1) * Math.sqrt(Math.abs(e)) * 1.41421356237;
}
function Ul(e) {
  if (e.length < 2)
    return 0;
  if (e.length === 2)
    return e[1].t === e[0].t ? 0 : (e[1].d - e[0].d) / (e[1].t - e[0].t);
  let n = 0;
  for (let t = e.length - 1; t > 0; t--) {
    if (e[t].t === e[t - 1].t)
      continue;
    const a = Wl(n), l = (e[t].d - e[t - 1].d) / (e[t].t - e[t - 1].t);
    n += (l - a) * Math.abs(l), t === e.length - 1 && (n *= 0.5);
  }
  return Wl(n) * 1e3;
}
function Ts() {
  const e = {};
  function n(l) {
    Array.from(l.changedTouches).forEach((o) => {
      (e[o.identifier] ?? (e[o.identifier] = new kn(As))).push([l.timeStamp, o]);
    });
  }
  function t(l) {
    Array.from(l.changedTouches).forEach((o) => {
      delete e[o.identifier];
    });
  }
  function a(l) {
    var r;
    const o = (r = e[l]) == null ? void 0 : r.values().reverse();
    if (!o)
      throw new Error(`No samples for touch id ${l}`);
    const i = o[0], s = [], u = [];
    for (const c of o) {
      if (i[0] - c[0] > Is) break;
      s.push({
        t: c[0],
        d: c[1].clientX
      }), u.push({
        t: c[0],
        d: c[1].clientY
      });
    }
    return {
      x: Ul(s),
      y: Ul(u),
      get direction() {
        const {
          x: c,
          y: d
        } = this, [f, v] = [Math.abs(c), Math.abs(d)];
        return f > v && c >= 0 ? "right" : f > v && c <= 0 ? "left" : v > f && d >= 0 ? "down" : v > f && d <= 0 ? "up" : _s();
      }
    };
  }
  return {
    addMovement: n,
    endTouch: t,
    getVelocity: a
  };
}
function _s() {
  throw new Error();
}
function $s(e) {
  let {
    el: n,
    isActive: t,
    isTemporary: a,
    width: l,
    touchless: o,
    position: i
  } = e;
  We(() => {
    window.addEventListener("touchstart", m, {
      passive: !0
    }), window.addEventListener("touchmove", A, {
      passive: !1
    }), window.addEventListener("touchend", x, {
      passive: !0
    });
  }), mt(() => {
    window.removeEventListener("touchstart", m), window.removeEventListener("touchmove", A), window.removeEventListener("touchend", x);
  });
  const s = I(() => ["left", "right"].includes(i.value)), {
    addMovement: u,
    endTouch: r,
    getVelocity: c
  } = Ts();
  let d = !1;
  const f = ee(!1), v = ee(0), g = ee(0);
  let V;
  function y(S, P) {
    return (i.value === "left" ? S : i.value === "right" ? document.documentElement.clientWidth - S : i.value === "top" ? S : i.value === "bottom" ? document.documentElement.clientHeight - S : Vt()) - (P ? l.value : 0);
  }
  function w(S) {
    let P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    const b = i.value === "left" ? (S - g.value) / l.value : i.value === "right" ? (document.documentElement.clientWidth - S - g.value) / l.value : i.value === "top" ? (S - g.value) / l.value : i.value === "bottom" ? (document.documentElement.clientHeight - S - g.value) / l.value : Vt();
    return P ? Je(b) : b;
  }
  function m(S) {
    if (o.value) return;
    const P = S.changedTouches[0].clientX, b = S.changedTouches[0].clientY, $ = 25, T = i.value === "left" ? P < $ : i.value === "right" ? P > document.documentElement.clientWidth - $ : i.value === "top" ? b < $ : i.value === "bottom" ? b > document.documentElement.clientHeight - $ : Vt(), B = t.value && (i.value === "left" ? P < l.value : i.value === "right" ? P > document.documentElement.clientWidth - l.value : i.value === "top" ? b < l.value : i.value === "bottom" ? b > document.documentElement.clientHeight - l.value : Vt());
    (T || B || t.value && a.value) && (V = [P, b], g.value = y(s.value ? P : b, t.value), v.value = w(s.value ? P : b), d = g.value > -20 && g.value < 80, r(S), u(S));
  }
  function A(S) {
    const P = S.changedTouches[0].clientX, b = S.changedTouches[0].clientY;
    if (d) {
      if (!S.cancelable) {
        d = !1;
        return;
      }
      const T = Math.abs(P - V[0]), B = Math.abs(b - V[1]);
      (s.value ? T > B && T > 3 : B > T && B > 3) ? (f.value = !0, d = !1) : (s.value ? B : T) > 3 && (d = !1);
    }
    if (!f.value) return;
    S.preventDefault(), u(S);
    const $ = w(s.value ? P : b, !1);
    v.value = Math.max(0, Math.min(1, $)), $ > 1 ? g.value = y(s.value ? P : b, !0) : $ < 0 && (g.value = y(s.value ? P : b, !1));
  }
  function x(S) {
    if (d = !1, !f.value) return;
    u(S), f.value = !1;
    const P = c(S.changedTouches[0].identifier), b = Math.abs(P.x), $ = Math.abs(P.y);
    (s.value ? b > $ && b > 400 : $ > b && $ > 3) ? t.value = P.direction === ({
      left: "right",
      right: "left",
      top: "down",
      bottom: "up"
    }[i.value] || Vt()) : t.value = v.value > 0.5;
  }
  const k = I(() => f.value ? {
    transform: i.value === "left" ? `translateX(calc(-100% + ${v.value * l.value}px))` : i.value === "right" ? `translateX(calc(100% - ${v.value * l.value}px))` : i.value === "top" ? `translateY(calc(-100% + ${v.value * l.value}px))` : i.value === "bottom" ? `translateY(calc(100% - ${v.value * l.value}px))` : Vt(),
    transition: "none"
  } : void 0);
  return Xe(f, () => {
    var b, $;
    const S = ((b = n.value) == null ? void 0 : b.style.transform) ?? null, P = (($ = n.value) == null ? void 0 : $.style.transition) ?? null;
    et(() => {
      var T, B, L, M;
      (B = n.value) == null || B.style.setProperty("transform", ((T = k.value) == null ? void 0 : T.transform) || "none"), (M = n.value) == null || M.style.setProperty("transition", ((L = k.value) == null ? void 0 : L.transition) || null);
    }), je(() => {
      var T, B;
      (T = n.value) == null || T.style.setProperty("transform", S), (B = n.value) == null || B.style.setProperty("transition", P);
    });
  }), {
    isDragging: f,
    dragProgress: v,
    dragStyles: k
  };
}
function Vt() {
  throw new Error();
}
const Mn = K({
  closeDelay: [Number, String],
  openDelay: [Number, String]
}, "delay");
function Ln(e, n) {
  let t = () => {
  };
  function a(i) {
    t == null || t();
    const s = Number(i ? e.openDelay : e.closeDelay);
    return new Promise((u) => {
      t = Yi(s, () => {
        n == null || n(i), u(i);
      });
    });
  }
  function l() {
    return a(!0);
  }
  function o() {
    return a(!1);
  }
  return {
    clearDelay: t,
    runOpenDelay: l,
    runCloseDelay: o
  };
}
function qt() {
  const n = nt("useScopeId").vnode.scopeId;
  return {
    scopeId: n ? {
      [n]: ""
    } : void 0
  };
}
const Bs = ["start", "end", "left", "right", "top", "bottom"], Es = K({
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
    validator: (e) => Bs.includes(e)
  },
  sticky: Boolean,
  ...zt(),
  ...xe(),
  ...Mn(),
  ...Yt({
    mobile: null
  }),
  ...Ht(),
  ...En(),
  ...kt(),
  ...Ke({
    tag: "nav"
  }),
  ...Ne()
}, "VNavigationDrawer"), Os = ne()({
  name: "VNavigationDrawer",
  props: Es(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:rail": (e) => !0
  },
  setup(e, n) {
    let {
      attrs: t,
      emit: a,
      slots: l
    } = n;
    const {
      isRtl: o
    } = ot(), {
      themeClasses: i
    } = qe(e), {
      borderClasses: s
    } = ba(e), {
      backgroundColorClasses: u,
      backgroundColorStyles: r
    } = dt(() => e.color), {
      elevationClasses: c
    } = pa(e), {
      displayClasses: d,
      mobile: f
    } = ht(e), {
      roundedClasses: v
    } = $t(e), g = un(), V = we(e, "modelValue", null, (_) => !!_), {
      ssrBootStyles: y
    } = wa(), {
      scopeId: w
    } = qt(), m = q(), A = ee(!1), {
      runOpenDelay: x,
      runCloseDelay: k
    } = Ln(e, (_) => {
      A.value = _;
    }), S = I(() => e.rail && e.expandOnHover && A.value ? Number(e.width) : Number(e.rail ? e.railWidth : e.width)), P = I(() => Mi(e.location, o.value)), b = H(() => e.persistent), $ = I(() => !e.permanent && (f.value || e.temporary)), T = I(() => e.sticky && !$.value && P.value !== "bottom");
    Xe(() => e.expandOnHover && e.rail != null, () => {
      J(A, (_) => a("update:rail", !_));
    }), Xe(() => !e.disableResizeWatcher, () => {
      J($, (_) => !e.permanent && Be(() => V.value = !_));
    }), Xe(() => !e.disableRouteWatcher && !!g, () => {
      J(g.currentRoute, () => $.value && (V.value = !1));
    }), J(() => e.permanent, (_) => {
      _ && (V.value = !0);
    }), e.modelValue == null && !$.value && (V.value = e.permanent || !f.value);
    const {
      isDragging: B,
      dragProgress: L
    } = $s({
      el: m,
      isActive: V,
      isTemporary: $,
      width: S,
      touchless: H(() => e.touchless),
      position: P
    }), M = I(() => {
      const _ = $.value ? 0 : e.rail && e.expandOnHover ? Number(e.railWidth) : S.value;
      return B.value ? _ * L.value : _;
    }), {
      layoutItemStyles: W,
      layoutItemScrimStyles: U
    } = Fn({
      id: e.name,
      order: I(() => parseInt(e.order, 10)),
      position: P,
      layoutSize: M,
      elementSize: S,
      active: nn(V),
      disableTransitions: H(() => B.value),
      absolute: I(() => (
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        e.absolute || T.value && typeof Y.value != "string"
      ))
    }), {
      isStuck: Y,
      stickyStyles: te
    } = Ps({
      rootEl: m,
      isSticky: T,
      layoutItemStyles: W
    }), ae = dt(() => typeof e.scrim == "string" ? e.scrim : null), re = I(() => ({
      ...B.value ? {
        opacity: L.value * 0.2,
        transition: "none"
      } : void 0,
      ...U.value
    }));
    return at({
      VList: {
        bgColor: "transparent"
      }
    }), ie(() => {
      const _ = l.image || e.image;
      return C(X, null, [h(e.tag, D({
        ref: m,
        onMouseenter: x,
        onMouseleave: k,
        class: ["v-navigation-drawer", `v-navigation-drawer--${P.value}`, {
          "v-navigation-drawer--expand-on-hover": e.expandOnHover,
          "v-navigation-drawer--floating": e.floating,
          "v-navigation-drawer--is-hovering": A.value,
          "v-navigation-drawer--rail": e.rail,
          "v-navigation-drawer--temporary": $.value,
          "v-navigation-drawer--persistent": b.value,
          "v-navigation-drawer--active": V.value,
          "v-navigation-drawer--sticky": T.value
        }, i.value, u.value, s.value, d.value, c.value, v.value, e.class],
        style: [r.value, W.value, y.value, te.value, e.style]
      }, w, t), {
        default: () => {
          var E, F, j;
          return [_ && C("div", {
            key: "image",
            class: "v-navigation-drawer__img"
          }, [l.image ? h(Le, {
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
          }, l.image) : h(Bt, {
            key: "image-img",
            alt: "",
            cover: !0,
            height: "inherit",
            src: e.image
          }, null)]), l.prepend && C("div", {
            class: "v-navigation-drawer__prepend"
          }, [(E = l.prepend) == null ? void 0 : E.call(l)]), C("div", {
            class: "v-navigation-drawer__content"
          }, [(F = l.default) == null ? void 0 : F.call(l)]), l.append && C("div", {
            class: "v-navigation-drawer__append"
          }, [(j = l.append) == null ? void 0 : j.call(l)])];
        }
      }), h(aa, {
        name: "fade-transition"
      }, {
        default: () => [$.value && (B.value || V.value) && !!e.scrim && C("div", D({
          class: ["v-navigation-drawer__scrim", ae.backgroundColorClasses.value],
          style: [re.value, ae.backgroundColorStyles.value],
          onClick: () => {
            b.value || (V.value = !1);
          }
        }, w), null)]
      })]);
    }), {
      isStuck: Y
    };
  }
}), Fs = {
  __name: "OxAppNav",
  props: /* @__PURE__ */ ya({
    items: Array
  }, {
    drawer: {},
    drawerModifiers: {}
  }),
  emits: ["update:drawer"],
  setup(e) {
    ve("context");
    const n = ve("panels"), t = ha(e, "drawer"), a = q([]), l = e, o = I(() => (i(l.items), l.items));
    function i(u) {
      a.value = s(u);
    }
    function s(u) {
      if (n.panel) {
        for (const r of u)
          if (r.items) {
            const c = s(r.items);
            if (c)
              return [c, r.name];
          } else if (r.name == n.panel)
            return [r.name];
      }
    }
    return (u, r) => (R(), G(Os, {
      modelValue: t.value,
      "onUpdate:modelValue": r[1] || (r[1] = (c) => t.value = c),
      theme: "dark"
    }, {
      append: O(() => [
        h(rt, null, {
          default: O(() => [
            z(u.$slots, "append")
          ]),
          _: 3
        })
      ]),
      default: O(() => [
        z(u.$slots, "prepend"),
        h(rt, {
          opened: a.value,
          "onUpdate:opened": r[0] || (r[0] = (c) => a.value = c),
          density: "compact"
        }, {
          default: O(() => [
            (R(!0), fe(X, null, Ae(o.value, (c, d) => (R(), G(p(Cs), D({
              key: d,
              ref_for: !0
            }, c), null, 16))), 128))
          ]),
          _: 1
        }, 8, ["opened"])
      ]),
      _: 3
    }, 8, ["modelValue"]));
  }
}, Rs = K({
  ...xe(),
  ...ps({
    fullHeight: !0
  }),
  ...Ne()
}, "VApp"), Ms = ne()({
  name: "VApp",
  props: Rs(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = qe(e), {
      layoutClasses: l,
      getLayoutItem: o,
      items: i,
      layoutRef: s
    } = Ss(e), {
      rtlClasses: u
    } = ot();
    return ie(() => {
      var r;
      return C("div", {
        ref: s,
        class: me(["v-application", a.themeClasses.value, l.value, u.value, e.class]),
        style: Ve([e.style])
      }, [C("div", {
        class: "v-application__wrap"
      }, [(r = t.default) == null ? void 0 : r.call(t)])]);
    }), {
      getLayoutItem: o,
      items: i,
      theme: a
    };
  }
}), Dn = K({
  text: String,
  ...xe(),
  ...Ke()
}, "VToolbarTitle"), Nn = ne()({
  name: "VToolbarTitle",
  props: Dn(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    return ie(() => {
      const a = !!(t.default || t.text || e.text);
      return h(e.tag, {
        class: me(["v-toolbar-title", e.class]),
        style: Ve(e.style)
      }, {
        default: () => {
          var l;
          return [a && C("div", {
            class: "v-toolbar-title__placeholder"
          }, [t.text ? t.text() : e.text, (l = t.default) == null ? void 0 : l.call(t)])];
        }
      });
    }), {};
  }
}), Ls = [null, "prominent", "default", "comfortable", "compact"], Hn = K({
  absolute: Boolean,
  collapse: Boolean,
  color: String,
  density: {
    type: String,
    default: "default",
    validator: (e) => Ls.includes(e)
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
  ...zt(),
  ...xe(),
  ...Ht(),
  ...kt(),
  ...Ke({
    tag: "header"
  }),
  ...Ne()
}, "VToolbar"), Ua = ne()({
  name: "VToolbar",
  props: Hn(),
  setup(e, n) {
    var v;
    let {
      slots: t
    } = n;
    const {
      backgroundColorClasses: a,
      backgroundColorStyles: l
    } = dt(() => e.color), {
      borderClasses: o
    } = ba(e), {
      elevationClasses: i
    } = pa(e), {
      roundedClasses: s
    } = $t(e), {
      themeClasses: u
    } = qe(e), {
      rtlClasses: r
    } = ot(), c = ee(!!(e.extended || (v = t.extension) != null && v.call(t))), d = I(() => parseInt(Number(e.height) + (e.density === "prominent" ? Number(e.height) : 0) - (e.density === "comfortable" ? 8 : 0) - (e.density === "compact" ? 16 : 0), 10)), f = I(() => c.value ? parseInt(Number(e.extensionHeight) + (e.density === "prominent" ? Number(e.extensionHeight) : 0) - (e.density === "comfortable" ? 4 : 0) - (e.density === "compact" ? 8 : 0), 10) : 0);
    return at({
      VBtn: {
        variant: "text"
      }
    }), ie(() => {
      var w;
      const g = !!(e.title || t.title), V = !!(t.image || e.image), y = (w = t.extension) == null ? void 0 : w.call(t);
      return c.value = !!(e.extended || y), h(e.tag, {
        class: me(["v-toolbar", {
          "v-toolbar--absolute": e.absolute,
          "v-toolbar--collapse": e.collapse,
          "v-toolbar--flat": e.flat,
          "v-toolbar--floating": e.floating,
          [`v-toolbar--density-${e.density}`]: !0
        }, a.value, o.value, i.value, s.value, u.value, r.value, e.class]),
        style: Ve([l.value, e.style])
      }, {
        default: () => [V && C("div", {
          key: "image",
          class: "v-toolbar__image"
        }, [t.image ? h(Le, {
          key: "image-defaults",
          disabled: !e.image,
          defaults: {
            VImg: {
              cover: !0,
              src: e.image
            }
          }
        }, t.image) : h(Bt, {
          key: "image-img",
          cover: !0,
          src: e.image
        }, null)]), h(Le, {
          defaults: {
            VTabs: {
              height: he(d.value)
            }
          }
        }, {
          default: () => {
            var m, A, x;
            return [C("div", {
              class: "v-toolbar__content",
              style: {
                height: he(d.value)
              }
            }, [t.prepend && C("div", {
              class: "v-toolbar__prepend"
            }, [(m = t.prepend) == null ? void 0 : m.call(t)]), g && h(Nn, {
              key: "title",
              text: e.title
            }, {
              text: t.title
            }), (A = t.default) == null ? void 0 : A.call(t), t.append && C("div", {
              class: "v-toolbar__append"
            }, [(x = t.append) == null ? void 0 : x.call(t)])])];
          }
        }), h(Le, {
          defaults: {
            VTabs: {
              height: he(f.value)
            }
          }
        }, {
          default: () => [h(Li, null, {
            default: () => [c.value && C("div", {
              class: "v-toolbar__extension",
              style: {
                height: he(f.value)
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
}), Ds = K({
  scrollTarget: {
    type: String
  },
  scrollThreshold: {
    type: [String, Number],
    default: 300
  }
}, "scroll");
function Ns(e) {
  let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    canScroll: t
  } = n;
  let a = 0, l = 0;
  const o = q(null), i = ee(0), s = ee(0), u = ee(0), r = ee(!1), c = ee(!1), d = I(() => Number(e.scrollThreshold)), f = I(() => Je((d.value - i.value) / d.value || 0)), v = () => {
    const g = o.value;
    if (!g || t && !t.value) return;
    a = i.value, i.value = "window" in g ? g.pageYOffset : g.scrollTop;
    const V = g instanceof Window ? document.documentElement.scrollHeight : g.scrollHeight;
    if (l !== V) {
      l = V;
      return;
    }
    c.value = i.value < a, u.value = Math.abs(i.value - d.value);
  };
  return J(c, () => {
    s.value = s.value || i.value;
  }), J(r, () => {
    s.value = 0;
  }), We(() => {
    J(() => e.scrollTarget, (g) => {
      var y;
      const V = g ? document.querySelector(g) : window;
      if (!V) {
        Vn(`Unable to locate element with identifier ${g}`);
        return;
      }
      V !== o.value && ((y = o.value) == null || y.removeEventListener("scroll", v), o.value = V, o.value.addEventListener("scroll", v, {
        passive: !0
      }));
    }, {
      immediate: !0
    });
  }), mt(() => {
    var g;
    (g = o.value) == null || g.removeEventListener("scroll", v);
  }), t && J(t, v, {
    immediate: !0
  }), {
    scrollThreshold: d,
    currentScroll: i,
    currentThreshold: u,
    isScrollActive: r,
    scrollRatio: f,
    // required only for testing
    // probably can be removed
    // later (2 chars chlng)
    isScrollingUp: c,
    savedScroll: s
  };
}
const Hs = K({
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
  ...Hn(),
  ...En(),
  ...Ds(),
  height: {
    type: [Number, String],
    default: 64
  }
}, "VAppBar"), zs = ne()({
  name: "VAppBar",
  props: Hs(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = q(), l = we(e, "modelValue"), o = I(() => {
      var A;
      const m = new Set(((A = e.scrollBehavior) == null ? void 0 : A.split(" ")) ?? []);
      return {
        hide: m.has("hide"),
        fullyHide: m.has("fully-hide"),
        inverted: m.has("inverted"),
        collapse: m.has("collapse"),
        elevate: m.has("elevate"),
        fadeImage: m.has("fade-image")
        // shrink: behavior.has('shrink'),
      };
    }), i = I(() => {
      const m = o.value;
      return m.hide || m.fullyHide || m.inverted || m.collapse || m.elevate || m.fadeImage || // behavior.shrink ||
      !l.value;
    }), {
      currentScroll: s,
      scrollThreshold: u,
      isScrollingUp: r,
      scrollRatio: c
    } = Ns(e, {
      canScroll: i
    }), d = H(() => o.value.hide || o.value.fullyHide), f = I(() => e.collapse || o.value.collapse && (o.value.inverted ? c.value > 0 : c.value === 0)), v = I(() => e.flat || o.value.fullyHide && !l.value || o.value.elevate && (o.value.inverted ? s.value > 0 : s.value === 0)), g = I(() => o.value.fadeImage ? o.value.inverted ? 1 - c.value : c.value : void 0), V = I(() => {
      var x, k;
      if (o.value.hide && o.value.inverted) return 0;
      const m = ((x = a.value) == null ? void 0 : x.contentHeight) ?? 0, A = ((k = a.value) == null ? void 0 : k.extensionHeight) ?? 0;
      return d.value ? s.value < u.value || o.value.fullyHide ? m + A : m : m + A;
    });
    Xe(() => !!e.scrollBehavior, () => {
      et(() => {
        d.value ? o.value.inverted ? l.value = s.value > u.value : l.value = r.value || s.value < u.value : l.value = !0;
      });
    });
    const {
      ssrBootStyles: y
    } = wa(), {
      layoutItemStyles: w
    } = Fn({
      id: e.name,
      order: I(() => parseInt(e.order, 10)),
      position: H(() => e.location),
      layoutSize: V,
      elementSize: ee(void 0),
      active: l,
      absolute: H(() => e.absolute)
    });
    return ie(() => {
      const m = Ua.filterProps(e);
      return h(Ua, D({
        ref: a,
        class: ["v-app-bar", {
          "v-app-bar--bottom": e.location === "bottom"
        }, e.class],
        style: [{
          ...w.value,
          "--v-toolbar-image-opacity": g.value,
          height: void 0,
          ...y.value
        }, e.style]
      }, m, {
        collapse: f.value,
        flat: v.value
      }), t);
    }), {};
  }
}), Ws = K({
  ...rn({
    icon: "$menu",
    variant: "text"
  })
}, "VAppBarNavIcon"), zn = ne()({
  name: "VAppBarNavIcon",
  props: Ws(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    return ie(() => h(pe, D(e, {
      class: ["v-app-bar-nav-icon"]
    }), t)), {};
  }
}), jl = ne()({
  name: "VAppBarTitle",
  props: Dn(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    return ie(() => h(Nn, D(e, {
      class: "v-app-bar-title"
    }), t)), {};
  }
}), Us = K({
  scrollable: Boolean,
  ...xe(),
  ...Ut(),
  ...Ke({
    tag: "main"
  })
}, "VMain"), js = ne()({
  name: "VMain",
  props: Us(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const {
      dimensionStyles: a
    } = Wt(e), {
      mainStyles: l
    } = On(), {
      ssrBootStyles: o
    } = wa();
    return ie(() => h(e.tag, {
      class: me(["v-main", {
        "v-main--scrollable": e.scrollable
      }, e.class]),
      style: Ve([l.value, o.value, a.value, e.style])
    }, {
      default: () => {
        var i, s;
        return [e.scrollable ? C("div", {
          class: "v-main__scroller"
        }, [(i = t.default) == null ? void 0 : i.call(t)]) : (s = t.default) == null ? void 0 : s.call(t)];
      }
    })), {};
  }
});
function Oa(e, n) {
  return {
    x: e.x + n.x,
    y: e.y + n.y
  };
}
function Ks(e, n) {
  return {
    x: e.x - n.x,
    y: e.y - n.y
  };
}
function Kl(e, n) {
  if (e.side === "top" || e.side === "bottom") {
    const {
      side: t,
      align: a
    } = e, l = a === "left" ? 0 : a === "center" ? n.width / 2 : a === "right" ? n.width : a, o = t === "top" ? 0 : t === "bottom" ? n.height : t;
    return Oa({
      x: l,
      y: o
    }, n);
  } else if (e.side === "left" || e.side === "right") {
    const {
      side: t,
      align: a
    } = e, l = t === "left" ? 0 : t === "right" ? n.width : t, o = a === "top" ? 0 : a === "center" ? n.height / 2 : a === "bottom" ? n.height : a;
    return Oa({
      x: l,
      y: o
    }, n);
  }
  return Oa({
    x: n.width / 2,
    y: n.height / 2
  }, n);
}
const Wn = {
  static: qs,
  // specific viewport position, usually centered
  connected: Zs
  // connected to a certain element
}, Gs = K({
  locationStrategy: {
    type: [String, Function],
    default: "static",
    validator: (e) => typeof e == "function" || e in Wn
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
function Ys(e, n) {
  const t = q({}), a = q();
  ze && Xe(() => !!(n.isActive.value && e.locationStrategy), (s) => {
    var u, r;
    J(() => e.locationStrategy, s), je(() => {
      window.removeEventListener("resize", l), visualViewport == null || visualViewport.removeEventListener("resize", o), visualViewport == null || visualViewport.removeEventListener("scroll", i), a.value = void 0;
    }), window.addEventListener("resize", l, {
      passive: !0
    }), visualViewport == null || visualViewport.addEventListener("resize", o, {
      passive: !0
    }), visualViewport == null || visualViewport.addEventListener("scroll", i, {
      passive: !0
    }), typeof e.locationStrategy == "function" ? a.value = (u = e.locationStrategy(n, e, t)) == null ? void 0 : u.updateLocation : a.value = (r = Wn[e.locationStrategy](n, e, t)) == null ? void 0 : r.updateLocation;
  });
  function l(s) {
    var u;
    (u = a.value) == null || u.call(a, s);
  }
  function o(s) {
    var u;
    (u = a.value) == null || u.call(a, s);
  }
  function i(s) {
    var u;
    (u = a.value) == null || u.call(a, s);
  }
  return {
    contentStyles: t,
    updateLocation: a
  };
}
function qs() {
}
function Xs(e, n) {
  const t = dl(e);
  return n ? t.x += parseFloat(e.style.right || 0) : t.x -= parseFloat(e.style.left || 0), t.y -= parseFloat(e.style.top || 0), t;
}
function Zs(e, n, t) {
  (Array.isArray(e.target.value) || bs(e.target.value)) && Object.assign(t.value, {
    position: "fixed",
    top: 0,
    [e.isRtl.value ? "right" : "left"]: 0
  });
  const {
    preferredAnchor: l,
    preferredOrigin: o
  } = qi(() => {
    const w = $l(n.location, e.isRtl.value), m = n.origin === "overlap" ? w : n.origin === "auto" ? Ta(w) : $l(n.origin, e.isRtl.value);
    return w.side === m.side && w.align === _a(m).align ? {
      preferredAnchor: Bl(w),
      preferredOrigin: Bl(m)
    } : {
      preferredAnchor: w,
      preferredOrigin: m
    };
  }), [i, s, u, r] = ["minWidth", "minHeight", "maxWidth", "maxHeight"].map((w) => I(() => {
    const m = parseFloat(n[w]);
    return isNaN(m) ? 1 / 0 : m;
  })), c = I(() => {
    if (Array.isArray(n.offset))
      return n.offset;
    if (typeof n.offset == "string") {
      const w = n.offset.split(" ").map(parseFloat);
      return w.length < 2 && w.push(0), w;
    }
    return typeof n.offset == "number" ? [n.offset, 0] : [0, 0];
  });
  let d = !1, f = -1;
  const v = new kn(4), g = new ResizeObserver(() => {
    if (!d) return;
    if (requestAnimationFrame((m) => {
      m !== f && v.clear(), requestAnimationFrame((A) => {
        f = A;
      });
    }), v.isFull) {
      const m = v.values();
      if (ut(m.at(-1), m.at(-3)))
        return;
    }
    const w = y();
    w && v.push(w.flipped);
  });
  J([e.target, e.contentEl], (w, m) => {
    let [A, x] = w, [k, S] = m;
    k && !Array.isArray(k) && g.unobserve(k), A && !Array.isArray(A) && g.observe(A), S && g.unobserve(S), x && g.observe(x);
  }, {
    immediate: !0
  }), je(() => {
    g.disconnect();
  });
  let V = new tt({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  function y() {
    if (d = !1, requestAnimationFrame(() => d = !0), !e.target.value || !e.contentEl.value) return;
    (Array.isArray(e.target.value) || e.target.value.offsetParent || e.target.value.getClientRects().length) && (V = Tn(e.target.value));
    const w = Xs(e.contentEl.value, e.isRtl.value), m = ia(e.contentEl.value), A = 12;
    m.length || (m.push(document.documentElement), e.contentEl.value.style.top && e.contentEl.value.style.left || (w.x -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0), w.y -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0)));
    const x = m.reduce((M, W) => {
      const U = vs(W);
      return M ? new tt({
        x: Math.max(M.left, U.left),
        y: Math.max(M.top, U.top),
        width: Math.min(M.right, U.right) - Math.max(M.left, U.left),
        height: Math.min(M.bottom, U.bottom) - Math.max(M.top, U.top)
      }) : U;
    }, void 0);
    x.x += A, x.y += A, x.width -= A * 2, x.height -= A * 2;
    let k = {
      anchor: l.value,
      origin: o.value
    };
    function S(M) {
      const W = new tt(w), U = Kl(M.anchor, V), Y = Kl(M.origin, W);
      let {
        x: te,
        y: ae
      } = Ks(U, Y);
      switch (M.anchor.side) {
        case "top":
          ae -= c.value[0];
          break;
        case "bottom":
          ae += c.value[0];
          break;
        case "left":
          te -= c.value[0];
          break;
        case "right":
          te += c.value[0];
          break;
      }
      switch (M.anchor.align) {
        case "top":
          ae -= c.value[1];
          break;
        case "bottom":
          ae += c.value[1];
          break;
        case "left":
          te -= c.value[1];
          break;
        case "right":
          te += c.value[1];
          break;
      }
      return W.x += te, W.y += ae, W.width = Math.min(W.width, u.value), W.height = Math.min(W.height, r.value), {
        overflows: Ll(W, x),
        x: te,
        y: ae
      };
    }
    let P = 0, b = 0;
    const $ = {
      x: 0,
      y: 0
    }, T = {
      x: !1,
      y: !1
    };
    let B = -1;
    for (; ; ) {
      if (B++ > 10) {
        Cn("Infinite loop detected in connectedLocationStrategy");
        break;
      }
      const {
        x: M,
        y: W,
        overflows: U
      } = S(k);
      P += M, b += W, w.x += M, w.y += W;
      {
        const Y = El(k.anchor), te = U.x.before || U.x.after, ae = U.y.before || U.y.after;
        let re = !1;
        if (["x", "y"].forEach((_) => {
          if (_ === "x" && te && !T.x || _ === "y" && ae && !T.y) {
            const E = {
              anchor: {
                ...k.anchor
              },
              origin: {
                ...k.origin
              }
            }, F = _ === "x" ? Y === "y" ? _a : Ta : Y === "y" ? Ta : _a;
            E.anchor = F(E.anchor), E.origin = F(E.origin);
            const {
              overflows: j
            } = S(E);
            (j[_].before <= U[_].before && j[_].after <= U[_].after || j[_].before + j[_].after < (U[_].before + U[_].after) / 2) && (k = E, re = T[_] = !0);
          }
        }), re) continue;
      }
      U.x.before && (P += U.x.before, w.x += U.x.before), U.x.after && (P -= U.x.after, w.x -= U.x.after), U.y.before && (b += U.y.before, w.y += U.y.before), U.y.after && (b -= U.y.after, w.y -= U.y.after);
      {
        const Y = Ll(w, x);
        $.x = x.width - Y.x.before - Y.x.after, $.y = x.height - Y.y.before - Y.y.after, P += Y.x.before, w.x += Y.x.before, b += Y.y.before, w.y += Y.y.before;
      }
      break;
    }
    const L = El(k.anchor);
    return Object.assign(t.value, {
      "--v-overlay-anchor-origin": `${k.anchor.side} ${k.anchor.align}`,
      transformOrigin: `${k.origin.side} ${k.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: he(Fa(b)),
      left: e.isRtl.value ? void 0 : he(Fa(P)),
      right: e.isRtl.value ? he(Fa(-P)) : void 0,
      minWidth: he(L === "y" ? Math.min(i.value, V.width) : i.value),
      maxWidth: he(Gl(Je($.x, i.value === 1 / 0 ? 0 : i.value, u.value))),
      maxHeight: he(Gl(Je($.y, s.value === 1 / 0 ? 0 : s.value, r.value)))
    }), {
      available: $,
      contentBox: w,
      flipped: T
    };
  }
  return J(() => [l.value, o.value, n.offset, n.minWidth, n.minHeight, n.maxWidth, n.maxHeight], () => y()), Be(() => {
    const w = y();
    if (!w) return;
    const {
      available: m,
      contentBox: A
    } = w;
    A.height > m.y && requestAnimationFrame(() => {
      y(), requestAnimationFrame(() => {
        y();
      });
    });
  }), {
    updateLocation: y
  };
}
function Fa(e) {
  return Math.round(e * devicePixelRatio) / devicePixelRatio;
}
function Gl(e) {
  return Math.ceil(e * devicePixelRatio) / devicePixelRatio;
}
let ja = !0;
const sa = [];
function Qs(e) {
  !ja || sa.length ? (sa.push(e), Ka()) : (ja = !1, e(), Ka());
}
let Yl = -1;
function Ka() {
  cancelAnimationFrame(Yl), Yl = requestAnimationFrame(() => {
    const e = sa.shift();
    e && e(), sa.length ? Ka() : ja = !0;
  });
}
const ta = {
  none: null,
  close: tu,
  block: au,
  reposition: lu
}, Js = K({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (e) => typeof e == "function" || e in ta
  }
}, "VOverlay-scroll-strategies");
function eu(e, n) {
  if (!ze) return;
  let t;
  et(async () => {
    t == null || t.stop(), n.isActive.value && e.scrollStrategy && (t = on(), await new Promise((a) => setTimeout(a)), t.active && t.run(() => {
      var a;
      typeof e.scrollStrategy == "function" ? e.scrollStrategy(n, e, t) : (a = ta[e.scrollStrategy]) == null || a.call(ta, n, e, t);
    }));
  }), je(() => {
    t == null || t.stop();
  });
}
function tu(e) {
  function n(t) {
    e.isActive.value = !1;
  }
  Un(e.targetEl.value ?? e.contentEl.value, n);
}
function au(e, n) {
  var i;
  const t = (i = e.root.value) == null ? void 0 : i.offsetParent, a = [.../* @__PURE__ */ new Set([...ia(e.targetEl.value, n.contained ? t : void 0), ...ia(e.contentEl.value, n.contained ? t : void 0)])].filter((s) => !s.classList.contains("v-overlay-scroll-blocked")), l = window.innerWidth - document.documentElement.offsetWidth, o = ((s) => vl(s) && s)(t || document.documentElement);
  o && e.root.value.classList.add("v-overlay--scroll-blocked"), a.forEach((s, u) => {
    s.style.setProperty("--v-body-scroll-x", he(-s.scrollLeft)), s.style.setProperty("--v-body-scroll-y", he(-s.scrollTop)), s !== document.documentElement && s.style.setProperty("--v-scrollbar-offset", he(l)), s.classList.add("v-overlay-scroll-blocked");
  }), je(() => {
    a.forEach((s, u) => {
      const r = parseFloat(s.style.getPropertyValue("--v-body-scroll-x")), c = parseFloat(s.style.getPropertyValue("--v-body-scroll-y")), d = s.style.scrollBehavior;
      s.style.scrollBehavior = "auto", s.style.removeProperty("--v-body-scroll-x"), s.style.removeProperty("--v-body-scroll-y"), s.style.removeProperty("--v-scrollbar-offset"), s.classList.remove("v-overlay-scroll-blocked"), s.scrollLeft = -r, s.scrollTop = -c, s.style.scrollBehavior = d;
    }), o && e.root.value.classList.remove("v-overlay--scroll-blocked");
  });
}
function lu(e, n, t) {
  let a = !1, l = -1, o = -1;
  function i(s) {
    Qs(() => {
      var c, d;
      const u = performance.now();
      (d = (c = e.updateLocation).value) == null || d.call(c, s), a = (performance.now() - u) / (1e3 / 60) > 2;
    });
  }
  o = (typeof requestIdleCallback > "u" ? (s) => s() : requestIdleCallback)(() => {
    t.run(() => {
      Un(e.targetEl.value ?? e.contentEl.value, (s) => {
        a ? (cancelAnimationFrame(l), l = requestAnimationFrame(() => {
          l = requestAnimationFrame(() => {
            i(s);
          });
        })) : i(s);
      });
    });
  }), je(() => {
    typeof cancelIdleCallback < "u" && cancelIdleCallback(o), cancelAnimationFrame(l);
  });
}
function Un(e, n) {
  const t = [document, ...ia(e)];
  t.forEach((a) => {
    a.addEventListener("scroll", n, {
      passive: !0
    });
  }), je(() => {
    t.forEach((a) => {
      a.removeEventListener("scroll", n);
    });
  });
}
const Ga = Symbol.for("vuetify:v-menu"), nu = K({
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
  ...Mn()
}, "VOverlay-activator");
function ou(e, n) {
  let {
    isActive: t,
    isTop: a,
    contentEl: l
  } = n;
  const o = nt("useActivator"), i = q();
  let s = !1, u = !1, r = !0;
  const c = I(() => e.openOnFocus || e.openOnFocus == null && e.openOnHover), d = I(() => e.openOnClick || e.openOnClick == null && !e.openOnHover && !c.value), {
    runOpenDelay: f,
    runCloseDelay: v
  } = Ln(e, (b) => {
    b === (e.openOnHover && s || c.value && u) && !(e.openOnHover && t.value && !a.value) && (t.value !== b && (r = !0), t.value = b);
  }), g = q(), V = {
    onClick: (b) => {
      b.stopPropagation(), i.value = b.currentTarget || b.target, t.value || (g.value = [b.clientX, b.clientY]), t.value = !t.value;
    },
    onMouseenter: (b) => {
      var $;
      ($ = b.sourceCapabilities) != null && $.firesTouchEvents || (s = !0, i.value = b.currentTarget || b.target, f());
    },
    onMouseleave: (b) => {
      s = !1, v();
    },
    onFocus: (b) => {
      At(b.target, ":focus-visible") !== !1 && (u = !0, b.stopPropagation(), i.value = b.currentTarget || b.target, f());
    },
    onBlur: (b) => {
      u = !1, b.stopPropagation(), v();
    }
  }, y = I(() => {
    const b = {};
    return d.value && (b.onClick = V.onClick), e.openOnHover && (b.onMouseenter = V.onMouseenter, b.onMouseleave = V.onMouseleave), c.value && (b.onFocus = V.onFocus, b.onBlur = V.onBlur), b;
  }), w = I(() => {
    const b = {};
    if (e.openOnHover && (b.onMouseenter = () => {
      s = !0, f();
    }, b.onMouseleave = () => {
      s = !1, v();
    }), c.value && (b.onFocusin = () => {
      u = !0, f();
    }, b.onFocusout = () => {
      u = !1, v();
    }), e.closeOnContentClick) {
      const $ = ve(Ga, null);
      b.onClick = () => {
        t.value = !1, $ == null || $.closeParents();
      };
    }
    return b;
  }), m = I(() => {
    const b = {};
    return e.openOnHover && (b.onMouseenter = () => {
      r && (s = !0, r = !1, f());
    }, b.onMouseleave = () => {
      s = !1, v();
    }), b;
  });
  J(a, (b) => {
    var $;
    b && (e.openOnHover && !s && (!c.value || !u) || c.value && !u && (!e.openOnHover || !s)) && !(($ = l.value) != null && $.contains(document.activeElement)) && (t.value = !1);
  }), J(t, (b) => {
    b || setTimeout(() => {
      g.value = void 0;
    });
  }, {
    flush: "post"
  });
  const A = Rl();
  et(() => {
    A.value && Be(() => {
      i.value = A.el;
    });
  });
  const x = Rl(), k = I(() => e.target === "cursor" && g.value ? g.value : x.value ? x.el : jn(e.target, o) || i.value), S = I(() => Array.isArray(k.value) ? void 0 : k.value);
  let P;
  return J(() => !!e.activator, (b) => {
    b && ze ? (P = on(), P.run(() => {
      iu(e, o, {
        activatorEl: i,
        activatorEvents: y
      });
    })) : P && P.stop();
  }, {
    flush: "post",
    immediate: !0
  }), je(() => {
    P == null || P.stop();
  }), {
    activatorEl: i,
    activatorRef: A,
    target: k,
    targetEl: S,
    targetRef: x,
    activatorEvents: y,
    contentEvents: w,
    scrimEvents: m
  };
}
function iu(e, n, t) {
  let {
    activatorEl: a,
    activatorEvents: l
  } = t;
  J(() => e.activator, (u, r) => {
    if (r && u !== r) {
      const c = s(r);
      c && i(c);
    }
    u && Be(() => o());
  }, {
    immediate: !0
  }), J(() => e.activatorProps, () => {
    o();
  }), je(() => {
    i();
  });
  function o() {
    let u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : s(), r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    u && fs(u, D(l.value, r));
  }
  function i() {
    let u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : s(), r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    u && ms(u, D(l.value, r));
  }
  function s() {
    let u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : e.activator;
    const r = jn(u, n);
    return a.value = (r == null ? void 0 : r.nodeType) === Node.ELEMENT_NODE ? r : void 0, a.value;
  }
}
function jn(e, n) {
  var a, l;
  if (!e) return;
  let t;
  if (e === "parent") {
    let o = (l = (a = n == null ? void 0 : n.proxy) == null ? void 0 : a.$el) == null ? void 0 : l.parentNode;
    for (; o != null && o.hasAttribute("data-no-activator"); )
      o = o.parentNode;
    t = o;
  } else typeof e == "string" ? t = document.querySelector(e) : "$el" in e ? t = e.$el : t = e;
  return t;
}
function su() {
  if (!ze) return ee(!1);
  const {
    ssr: e
  } = ht();
  if (e) {
    const n = ee(!1);
    return We(() => {
      n.value = !0;
    }), n;
  } else
    return ee(!0);
}
const Kn = K({
  eager: Boolean
}, "lazy");
function Gn(e, n) {
  const t = ee(!1), a = H(() => t.value || e.eager || n.value);
  J(n, () => t.value = !0);
  function l() {
    e.eager || (t.value = !1);
  }
  return {
    isBooted: t,
    hasContent: a,
    onAfterLeave: l
  };
}
const ql = Symbol.for("vuetify:stack"), Ot = Qe([]);
function uu(e, n, t) {
  const a = nt("useStack"), l = !t, o = ve(ql, void 0), i = Qe({
    activeChildren: /* @__PURE__ */ new Set()
  });
  Ue(ql, i);
  const s = ee(Number(Tl(n)));
  Xe(e, () => {
    var d;
    const c = (d = Ot.at(-1)) == null ? void 0 : d[1];
    s.value = c ? c + 10 : Number(Tl(n)), l && Ot.push([a.uid, s.value]), o == null || o.activeChildren.add(a.uid), je(() => {
      if (l) {
        const f = di(Ot).findIndex((v) => v[0] === a.uid);
        Ot.splice(f, 1);
      }
      o == null || o.activeChildren.delete(a.uid);
    });
  });
  const u = ee(!0);
  l && et(() => {
    var d;
    const c = ((d = Ot.at(-1)) == null ? void 0 : d[0]) === a.uid;
    setTimeout(() => u.value = c);
  });
  const r = H(() => !i.activeChildren.size);
  return {
    globalTop: nn(u),
    localTop: r,
    stackStyles: H(() => ({
      zIndex: s.value
    }))
  };
}
function ru(e) {
  return {
    teleportTarget: I(() => {
      const t = e();
      if (t === !0 || !ze) return;
      const a = t === !1 ? document.body : typeof t == "string" ? document.querySelector(t) : t;
      if (a == null) {
        vi(`Unable to locate target ${t}`);
        return;
      }
      let l = [...a.children].find((o) => o.matches(".v-overlay-container"));
      return l || (l = document.createElement("div"), l.className = "v-overlay-container", a.appendChild(l)), l;
    })
  };
}
function cu() {
  return !0;
}
function Yn(e, n, t) {
  if (!e || qn(e, t) === !1) return !1;
  const a = _n(n);
  if (typeof ShadowRoot < "u" && a instanceof ShadowRoot && a.host === e.target) return !1;
  const l = (typeof t.value == "object" && t.value.include || (() => []))();
  return l.push(n), !l.some((o) => o == null ? void 0 : o.contains(e.target));
}
function qn(e, n) {
  return (typeof n.value == "object" && n.value.closeConditional || cu)(e);
}
function du(e, n, t) {
  const a = typeof t.value == "function" ? t.value : t.value.handler;
  e.shadowTarget = e.target, n._clickOutside.lastMousedownWasOutside && Yn(e, n, t) && setTimeout(() => {
    qn(e, t) && a && a(e);
  }, 0);
}
function Xl(e, n) {
  const t = _n(e);
  n(document), typeof ShadowRoot < "u" && t instanceof ShadowRoot && n(t);
}
const Zl = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(e, n) {
    const t = (l) => du(l, e, n), a = (l) => {
      e._clickOutside.lastMousedownWasOutside = Yn(l, e, n);
    };
    Xl(e, (l) => {
      l.addEventListener("click", t, !0), l.addEventListener("mousedown", a, !0);
    }), e._clickOutside || (e._clickOutside = {
      lastMousedownWasOutside: !1
    }), e._clickOutside[n.instance.$.uid] = {
      onClick: t,
      onMousedown: a
    };
  },
  beforeUnmount(e, n) {
    e._clickOutside && (Xl(e, (t) => {
      var o;
      if (!t || !((o = e._clickOutside) != null && o[n.instance.$.uid])) return;
      const {
        onClick: a,
        onMousedown: l
      } = e._clickOutside[n.instance.$.uid];
      t.removeEventListener("click", a, !0), t.removeEventListener("mousedown", l, !0);
    }), delete e._clickOutside[n.instance.$.uid]);
  }
};
function vu(e) {
  const {
    modelValue: n,
    color: t,
    ...a
  } = e;
  return h(aa, {
    name: "fade-transition",
    appear: !0
  }, {
    default: () => [e.modelValue && C("div", D({
      class: ["v-overlay__scrim", e.color.backgroundColorClasses.value],
      style: e.color.backgroundColorStyles.value
    }, a), null)]
  });
}
const fl = K({
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
  ...nu(),
  ...xe(),
  ...Ut(),
  ...Kn(),
  ...Gs(),
  ...Js(),
  ...Ne(),
  ...jt()
}, "VOverlay"), ua = ne()({
  name: "VOverlay",
  directives: {
    vClickOutside: Zl
  },
  inheritAttrs: !1,
  props: {
    _disableGlobalStack: Boolean,
    ...fl()
  },
  emits: {
    "click:outside": (e) => !0,
    "update:modelValue": (e) => !0,
    keydown: (e) => !0,
    afterEnter: () => !0,
    afterLeave: () => !0
  },
  setup(e, n) {
    let {
      slots: t,
      attrs: a,
      emit: l
    } = n;
    const o = nt("VOverlay"), i = q(), s = q(), u = q(), r = we(e, "modelValue"), c = I({
      get: () => r.value,
      set: (Z) => {
        Z && e.disabled || (r.value = Z);
      }
    }), {
      themeClasses: d
    } = qe(e), {
      rtlClasses: f,
      isRtl: v
    } = ot(), {
      hasContent: g,
      onAfterLeave: V
    } = Gn(e, c), y = dt(() => typeof e.scrim == "string" ? e.scrim : null), {
      globalTop: w,
      localTop: m,
      stackStyles: A
    } = uu(c, () => e.zIndex, e._disableGlobalStack), {
      activatorEl: x,
      activatorRef: k,
      target: S,
      targetEl: P,
      targetRef: b,
      activatorEvents: $,
      contentEvents: T,
      scrimEvents: B
    } = ou(e, {
      isActive: c,
      isTop: m,
      contentEl: u
    }), {
      teleportTarget: L
    } = ru(() => {
      var ge, N, Q;
      const Z = e.attach || e.contained;
      if (Z) return Z;
      const ce = ((ge = x == null ? void 0 : x.value) == null ? void 0 : ge.getRootNode()) || ((Q = (N = o.proxy) == null ? void 0 : N.$el) == null ? void 0 : Q.getRootNode());
      return ce instanceof ShadowRoot ? ce : !1;
    }), {
      dimensionStyles: M
    } = Wt(e), W = su(), {
      scopeId: U
    } = qt();
    J(() => e.disabled, (Z) => {
      Z && (c.value = !1);
    });
    const {
      contentStyles: Y,
      updateLocation: te
    } = Ys(e, {
      isRtl: v,
      contentEl: u,
      target: S,
      isActive: c
    });
    eu(e, {
      root: i,
      contentEl: u,
      targetEl: P,
      isActive: c,
      updateLocation: te
    });
    function ae(Z) {
      l("click:outside", Z), e.persistent ? be() : c.value = !1;
    }
    function re(Z) {
      return c.value && w.value && // If using scrim, only close if clicking on it rather than anything opened on top
      (!e.scrim || Z.target === s.value || Z instanceof MouseEvent && Z.shadowTarget === s.value);
    }
    ze && J(c, (Z) => {
      Z ? window.addEventListener("keydown", _) : window.removeEventListener("keydown", _);
    }, {
      immediate: !0
    }), mt(() => {
      ze && window.removeEventListener("keydown", _);
    });
    function _(Z) {
      var ce, ge, N;
      Z.key === "Escape" && w.value && ((ce = u.value) != null && ce.contains(document.activeElement) || l("keydown", Z), e.persistent ? be() : (c.value = !1, (ge = u.value) != null && ge.contains(document.activeElement) && ((N = x.value) == null || N.focus())));
    }
    function E(Z) {
      Z.key === "Escape" && !w.value || l("keydown", Z);
    }
    const F = un();
    Xe(() => e.closeOnBack, () => {
      Di(F, (Z) => {
        w.value && c.value ? (Z(!1), e.persistent ? be() : c.value = !1) : Z();
      });
    });
    const j = q();
    J(() => c.value && (e.absolute || e.contained) && L.value == null, (Z) => {
      if (Z) {
        const ce = $n(i.value);
        ce && ce !== document.scrollingElement && (j.value = ce.scrollTop);
      }
    });
    function be() {
      e.noClickAnimation || u.value && wt(u.value, [{
        transformOrigin: "center"
      }, {
        transform: "scale(1.03)"
      }, {
        transformOrigin: "center"
      }], {
        duration: 150,
        easing: Rt
      });
    }
    function le() {
      l("afterEnter");
    }
    function ue() {
      V(), l("afterLeave");
    }
    return ie(() => {
      var Z;
      return C(X, null, [(Z = t.activator) == null ? void 0 : Z.call(t, {
        isActive: c.value,
        targetRef: b,
        props: D({
          ref: k
        }, $.value, e.activatorProps)
      }), W.value && g.value && h(Na, {
        disabled: !L.value,
        to: L.value
      }, {
        default: () => [C("div", D({
          class: ["v-overlay", {
            "v-overlay--absolute": e.absolute || e.contained,
            "v-overlay--active": c.value,
            "v-overlay--contained": e.contained
          }, d.value, f.value, e.class],
          style: [A.value, {
            "--v-overlay-opacity": e.opacity,
            top: he(j.value)
          }, e.style],
          ref: i,
          onKeydown: E
        }, U, a), [h(vu, D({
          color: y,
          modelValue: c.value && !!e.scrim,
          ref: s
        }, B.value), null), h(Sa, {
          appear: !0,
          persisted: !0,
          transition: e.transition,
          target: S.value,
          onAfterEnter: le,
          onAfterLeave: ue
        }, {
          default: () => {
            var ce;
            return [Ye(C("div", D({
              ref: u,
              class: ["v-overlay__content", e.contentClass],
              style: [M.value, Y.value]
            }, T.value, e.contentProps), [(ce = t.default) == null ? void 0 : ce.call(t, {
              isActive: c
            })]), [[_t, c.value], [Zl, {
              handler: ae,
              closeConditional: re,
              include: () => [x.value]
            }]])];
          }
        })])]
      })]);
    }), {
      activatorEl: x,
      scrimEl: s,
      target: S,
      animateClick: be,
      contentEl: u,
      globalTop: w,
      localTop: m,
      updateLocation: te
    };
  }
}), Ra = Symbol("Forwarded refs");
function Ma(e, n) {
  let t = e;
  for (; t; ) {
    const a = Reflect.getOwnPropertyDescriptor(t, n);
    if (a) return a;
    t = Object.getPrototypeOf(t);
  }
}
function pt(e) {
  for (var n = arguments.length, t = new Array(n > 1 ? n - 1 : 0), a = 1; a < n; a++)
    t[a - 1] = arguments[a];
  return e[Ra] = t, new Proxy(e, {
    get(l, o) {
      if (Reflect.has(l, o))
        return Reflect.get(l, o);
      if (!(typeof o == "symbol" || o.startsWith("$") || o.startsWith("__"))) {
        for (const i of t)
          if (i.value && Reflect.has(i.value, o)) {
            const s = Reflect.get(i.value, o);
            return typeof s == "function" ? s.bind(i.value) : s;
          }
      }
    },
    has(l, o) {
      if (Reflect.has(l, o))
        return !0;
      if (typeof o == "symbol" || o.startsWith("$") || o.startsWith("__")) return !1;
      for (const i of t)
        if (i.value && Reflect.has(i.value, o))
          return !0;
      return !1;
    },
    set(l, o, i) {
      if (Reflect.has(l, o))
        return Reflect.set(l, o, i);
      if (typeof o == "symbol" || o.startsWith("$") || o.startsWith("__")) return !1;
      for (const s of t)
        if (s.value && Reflect.has(s.value, o))
          return Reflect.set(s.value, o, i);
      return !1;
    },
    getOwnPropertyDescriptor(l, o) {
      var s;
      const i = Reflect.getOwnPropertyDescriptor(l, o);
      if (i) return i;
      if (!(typeof o == "symbol" || o.startsWith("$") || o.startsWith("__"))) {
        for (const u of t) {
          if (!u.value) continue;
          const r = Ma(u.value, o) ?? ("_" in u.value ? Ma((s = u.value._) == null ? void 0 : s.setupState, o) : void 0);
          if (r) return r;
        }
        for (const u of t) {
          const r = u.value && u.value[Ra];
          if (!r) continue;
          const c = r.slice();
          for (; c.length; ) {
            const d = c.shift(), f = Ma(d.value, o);
            if (f) return f;
            const v = d.value && d.value[Ra];
            v && c.push(...v);
          }
        }
      }
    }
  });
}
function fu(e) {
  const n = ee(e());
  let t = -1;
  function a() {
    clearInterval(t);
  }
  function l() {
    a(), Be(() => n.value = e());
  }
  function o(i) {
    const s = i ? getComputedStyle(i) : {
      transitionDuration: 0.2
    }, u = parseFloat(s.transitionDuration) * 1e3 || 200;
    if (a(), n.value <= 0) return;
    const r = performance.now();
    t = window.setInterval(() => {
      const c = performance.now() - r + u;
      n.value = Math.max(e() - c, 0), n.value <= 0 && a();
    }, u);
  }
  return je(a), {
    clear: a,
    time: n,
    start: o,
    reset: l
  };
}
const mu = K({
  multiLine: Boolean,
  text: String,
  timer: [Boolean, String],
  timeout: {
    type: [Number, String],
    default: 5e3
  },
  vertical: Boolean,
  ...vn({
    location: "bottom"
  }),
  ...dn(),
  ...kt(),
  ...Kt(),
  ...Ne(),
  ...bt(fl({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
}, "VSnackbar"), gu = ne()({
  name: "VSnackbar",
  props: mu(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = we(e, "modelValue"), {
      positionClasses: l
    } = cn(e), {
      scopeId: o
    } = qt(), {
      themeClasses: i
    } = qe(e), {
      colorClasses: s,
      colorStyles: u,
      variantClasses: r
    } = tl(e), {
      roundedClasses: c
    } = $t(e), d = fu(() => Number(e.timeout)), f = q(), v = q(), g = ee(!1), V = ee(0), y = q(), w = ve(Mt, void 0);
    Xe(() => !!w, () => {
      const B = On();
      et(() => {
        y.value = B.mainStyles.value;
      });
    }), J(a, A), J(() => e.timeout, A), We(() => {
      a.value && A();
    });
    let m = -1;
    function A() {
      d.reset(), window.clearTimeout(m);
      const B = Number(e.timeout);
      if (!a.value || B === -1) return;
      const L = Xi(v.value);
      d.start(L), m = window.setTimeout(() => {
        a.value = !1;
      }, B);
    }
    function x() {
      d.reset(), window.clearTimeout(m);
    }
    function k() {
      g.value = !0, x();
    }
    function S() {
      g.value = !1, A();
    }
    function P(B) {
      V.value = B.touches[0].clientY;
    }
    function b(B) {
      Math.abs(V.value - B.changedTouches[0].clientY) > 50 && (a.value = !1);
    }
    function $() {
      g.value && S();
    }
    const T = I(() => e.location.split(" ").reduce((B, L) => (B[`v-snackbar--${L}`] = !0, B), {}));
    return ie(() => {
      const B = ua.filterProps(e), L = !!(t.default || t.text || e.text);
      return h(ua, D({
        ref: f,
        class: ["v-snackbar", {
          "v-snackbar--active": a.value,
          "v-snackbar--multi-line": e.multiLine && !e.vertical,
          "v-snackbar--timer": !!e.timer,
          "v-snackbar--vertical": e.vertical
        }, T.value, l.value, e.class],
        style: [y.value, e.style]
      }, B, {
        modelValue: a.value,
        "onUpdate:modelValue": (M) => a.value = M,
        contentProps: D({
          class: ["v-snackbar__wrapper", i.value, s.value, c.value, r.value],
          style: [u.value],
          onPointerenter: k,
          onPointerleave: S
        }, B.contentProps),
        persistent: !0,
        noClickAnimation: !0,
        scrim: !1,
        scrollStrategy: "none",
        _disableGlobalStack: !0,
        onTouchstartPassive: P,
        onTouchend: b,
        onAfterLeave: $
      }, o), {
        default: () => {
          var M, W;
          return [al(!1, "v-snackbar"), e.timer && !g.value && C("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [h(Ni, {
            ref: v,
            color: typeof e.timer == "string" ? e.timer : "info",
            max: e.timeout,
            "model-value": d.time.value
          }, null)]), L && C("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((M = t.text) == null ? void 0 : M.call(t)) ?? e.text, (W = t.default) == null ? void 0 : W.call(t)]), t.actions && h(Le, {
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
            }, [t.actions({
              isActive: a
            })])]
          })];
        },
        activator: t.activator
      });
    }), pt({}, f);
  }
}), ml = Symbol.for("vuetify:v-tabs"), yu = K({
  fixed: Boolean,
  sliderColor: String,
  hideSlider: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ...bt(rn({
    selectedClass: "v-tab--selected",
    variant: "text"
  }), ["active", "block", "flat", "location", "position", "symbol"])
}, "VTab"), Ya = ne()({
  name: "VTab",
  props: yu(),
  setup(e, n) {
    let {
      slots: t,
      attrs: a
    } = n;
    const {
      textColorClasses: l,
      textColorStyles: o
    } = Gt(() => e.sliderColor), i = q(), s = q(), u = I(() => e.direction === "horizontal"), r = I(() => {
      var d, f;
      return ((f = (d = i.value) == null ? void 0 : d.group) == null ? void 0 : f.isSelected.value) ?? !1;
    });
    function c(d) {
      var v, g;
      let {
        value: f
      } = d;
      if (f) {
        const V = (g = (v = i.value) == null ? void 0 : v.$el.parentElement) == null ? void 0 : g.querySelector(".v-tab--selected .v-tab__slider"), y = s.value;
        if (!V || !y) return;
        const w = getComputedStyle(V).color, m = V.getBoundingClientRect(), A = y.getBoundingClientRect(), x = u.value ? "x" : "y", k = u.value ? "X" : "Y", S = u.value ? "right" : "bottom", P = u.value ? "width" : "height", b = m[x], $ = A[x], T = b > $ ? m[S] - A[S] : m[x] - A[x], B = Math.sign(T) > 0 ? u.value ? "right" : "bottom" : Math.sign(T) < 0 ? u.value ? "left" : "top" : "center", M = (Math.abs(T) + (Math.sign(T) < 0 ? m[P] : A[P])) / Math.max(m[P], A[P]) || 0, W = m[P] / A[P] || 0, U = 1.5;
        wt(y, {
          backgroundColor: [w, "currentcolor"],
          transform: [`translate${k}(${T}px) scale${k}(${W})`, `translate${k}(${T / U}px) scale${k}(${(M - 1) / U + 1})`, "none"],
          transformOrigin: Array(3).fill(B)
        }, {
          duration: 225,
          easing: Rt
        });
      }
    }
    return ie(() => {
      const d = pe.filterProps(e);
      return h(pe, D({
        symbol: ml,
        ref: i,
        class: ["v-tab", e.class],
        style: e.style,
        tabindex: r.value ? 0 : -1,
        role: "tab",
        "aria-selected": String(r.value),
        active: !1
      }, d, a, {
        block: e.fixed,
        maxWidth: e.fixed ? 300 : void 0,
        "onGroup:selected": c
      }), {
        ...t,
        default: () => {
          var f;
          return C(X, null, [((f = t.default) == null ? void 0 : f.call(t)) ?? e.text, !e.hideSlider && C("div", {
            ref: s,
            class: me(["v-tab__slider", l.value]),
            style: Ve(o.value)
          }, null)]);
        }
      });
    }), pt({}, i);
  }
}), hu = (e) => {
  const {
    touchstartX: n,
    touchendX: t,
    touchstartY: a,
    touchendY: l
  } = e, o = 0.5, i = 16;
  e.offsetX = t - n, e.offsetY = l - a, Math.abs(e.offsetY) < o * Math.abs(e.offsetX) && (e.left && t < n - i && e.left(e), e.right && t > n + i && e.right(e)), Math.abs(e.offsetX) < o * Math.abs(e.offsetY) && (e.up && l < a - i && e.up(e), e.down && l > a + i && e.down(e));
};
function bu(e, n) {
  var a;
  const t = e.changedTouches[0];
  n.touchstartX = t.clientX, n.touchstartY = t.clientY, (a = n.start) == null || a.call(n, {
    originalEvent: e,
    ...n
  });
}
function pu(e, n) {
  var a;
  const t = e.changedTouches[0];
  n.touchendX = t.clientX, n.touchendY = t.clientY, (a = n.end) == null || a.call(n, {
    originalEvent: e,
    ...n
  }), hu(n);
}
function wu(e, n) {
  var a;
  const t = e.changedTouches[0];
  n.touchmoveX = t.clientX, n.touchmoveY = t.clientY, (a = n.move) == null || a.call(n, {
    originalEvent: e,
    ...n
  });
}
function Su() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const n = {
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
    touchstart: (t) => bu(t, n),
    touchend: (t) => pu(t, n),
    touchmove: (t) => wu(t, n)
  };
}
function xu(e, n) {
  var s;
  const t = n.value, a = t != null && t.parent ? e.parentElement : e, l = (t == null ? void 0 : t.options) ?? {
    passive: !0
  }, o = (s = n.instance) == null ? void 0 : s.$.uid;
  if (!a || !o) return;
  const i = Su(n.value);
  a._touchHandlers = a._touchHandlers ?? /* @__PURE__ */ Object.create(null), a._touchHandlers[o] = i, Pn(i).forEach((u) => {
    a.addEventListener(u, i[u], l);
  });
}
function ku(e, n) {
  var o, i;
  const t = (o = n.value) != null && o.parent ? e.parentElement : e, a = (i = n.instance) == null ? void 0 : i.$.uid;
  if (!(t != null && t._touchHandlers) || !a) return;
  const l = t._touchHandlers[a];
  Pn(l).forEach((s) => {
    t.removeEventListener(s, l[s]);
  }), delete t._touchHandlers[a];
}
const qa = {
  mounted: xu,
  unmounted: ku
}, Xn = Symbol.for("vuetify:v-window"), Zn = Symbol.for("vuetify:v-window-group"), Qn = K({
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
  ...xe(),
  ...Ke(),
  ...Ne()
}, "VWindow"), Xa = ne()({
  name: "VWindow",
  directives: {
    vTouch: qa
  },
  props: Qn(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const {
      themeClasses: a
    } = qe(e), {
      isRtl: l
    } = ot(), {
      t: o
    } = it(), i = ll(e, Zn), s = q(), u = I(() => l.value ? !e.reverse : e.reverse), r = ee(!1), c = I(() => {
      const x = e.direction === "vertical" ? "y" : "x", S = (u.value ? !r.value : r.value) ? "-reverse" : "";
      return `v-window-${x}${S}-transition`;
    }), d = ee(0), f = q(void 0), v = I(() => i.items.value.findIndex((x) => i.selected.value.includes(x.id)));
    J(v, (x, k) => {
      const S = i.items.value.length, P = S - 1;
      S <= 2 ? r.value = x < k : x === P && k === 0 ? r.value = !0 : x === 0 && k === P ? r.value = !1 : r.value = x < k;
    }), Ue(Xn, {
      transition: c,
      isReversed: r,
      transitionCount: d,
      transitionHeight: f,
      rootRef: s
    });
    const g = H(() => e.continuous || v.value !== 0), V = H(() => e.continuous || v.value !== i.items.value.length - 1);
    function y() {
      g.value && i.prev();
    }
    function w() {
      V.value && i.next();
    }
    const m = I(() => {
      const x = [], k = {
        icon: l.value ? e.nextIcon : e.prevIcon,
        class: `v-window__${u.value ? "right" : "left"}`,
        onClick: i.prev,
        "aria-label": o("$vuetify.carousel.prev")
      };
      x.push(g.value ? t.prev ? t.prev({
        props: k
      }) : h(pe, k, null) : C("div", null, null));
      const S = {
        icon: l.value ? e.prevIcon : e.nextIcon,
        class: `v-window__${u.value ? "left" : "right"}`,
        onClick: i.next,
        "aria-label": o("$vuetify.carousel.next")
      };
      return x.push(V.value ? t.next ? t.next({
        props: S
      }) : h(pe, S, null) : C("div", null, null)), x;
    }), A = I(() => e.touch === !1 ? e.touch : {
      ...{
        left: () => {
          u.value ? y() : w();
        },
        right: () => {
          u.value ? w() : y();
        },
        start: (k) => {
          let {
            originalEvent: S
          } = k;
          S.stopPropagation();
        }
      },
      ...e.touch === !0 ? {} : e.touch
    });
    return ie(() => Ye(h(e.tag, {
      ref: s,
      class: me(["v-window", {
        "v-window--show-arrows-on-hover": e.showArrows === "hover"
      }, a.value, e.class]),
      style: Ve(e.style)
    }, {
      default: () => {
        var x, k;
        return [C("div", {
          class: "v-window__container",
          style: {
            height: f.value
          }
        }, [(x = t.default) == null ? void 0 : x.call(t, {
          group: i
        }), e.showArrows !== !1 && C("div", {
          class: "v-window__controls"
        }, [m.value])]), (k = t.additional) == null ? void 0 : k.call(t, {
          group: i
        })];
      }
    }), [[qa, A.value]])), {
      group: i
    };
  }
}), Vu = K({
  ...bt(Qn(), ["continuous", "nextIcon", "prevIcon", "showArrows", "touch", "mandatory"])
}, "VTabsWindow"), gl = ne()({
  name: "VTabsWindow",
  props: Vu(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = ve(ml, null), l = we(e, "modelValue"), o = I({
      get() {
        var i;
        return l.value != null || !a ? l.value : (i = a.items.value.find((s) => a.selected.value.includes(s.id))) == null ? void 0 : i.value;
      },
      set(i) {
        l.value = i;
      }
    });
    return ie(() => {
      const i = Xa.filterProps(e);
      return h(Xa, D({
        _as: "VTabsWindow"
      }, i, {
        modelValue: o.value,
        "onUpdate:modelValue": (s) => o.value = s,
        class: ["v-tabs-window", e.class],
        style: e.style,
        mandatory: !1,
        touch: !1
      }), t);
    }), {};
  }
}), Jn = K({
  reverseTransition: {
    type: [Boolean, String],
    default: void 0
  },
  transition: {
    type: [Boolean, String],
    default: void 0
  },
  ...xe(),
  ...nl(),
  ...Kn()
}, "VWindowItem"), Za = ne()({
  name: "VWindowItem",
  directives: {
    vTouch: qa
  },
  props: Jn(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = ve(Xn), l = ol(e, Zn), {
      isBooted: o
    } = wa();
    if (!a || !l) throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const i = ee(!1), s = I(() => o.value && (a.isReversed.value ? e.reverseTransition !== !1 : e.transition !== !1));
    function u() {
      !i.value || !a || (i.value = !1, a.transitionCount.value > 0 && (a.transitionCount.value -= 1, a.transitionCount.value === 0 && (a.transitionHeight.value = void 0)));
    }
    function r() {
      var g;
      i.value || !a || (i.value = !0, a.transitionCount.value === 0 && (a.transitionHeight.value = he((g = a.rootRef.value) == null ? void 0 : g.clientHeight)), a.transitionCount.value += 1);
    }
    function c() {
      u();
    }
    function d(g) {
      i.value && Be(() => {
        !s.value || !i.value || !a || (a.transitionHeight.value = he(g.clientHeight));
      });
    }
    const f = I(() => {
      const g = a.isReversed.value ? e.reverseTransition : e.transition;
      return s.value ? {
        name: typeof g != "string" ? a.transition.value : g,
        onBeforeEnter: r,
        onAfterEnter: u,
        onEnterCancelled: c,
        onBeforeLeave: r,
        onAfterLeave: u,
        onLeaveCancelled: c,
        onEnter: d
      } : !1;
    }), {
      hasContent: v
    } = Gn(e, l.isSelected);
    return ie(() => h(Sa, {
      transition: f.value,
      disabled: !o.value
    }, {
      default: () => {
        var g;
        return [Ye(C("div", {
          class: me(["v-window-item", l.selectedClass.value, e.class]),
          style: Ve(e.style)
        }, [v.value && ((g = t.default) == null ? void 0 : g.call(t))]), [[_t, l.isSelected.value]])];
      }
    })), {
      groupItem: l
    };
  }
}), Cu = K({
  ...Jn()
}, "VTabsWindowItem"), ra = ne()({
  name: "VTabsWindowItem",
  props: Cu(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    return ie(() => {
      const a = Za.filterProps(e);
      return h(Za, D({
        _as: "VTabsWindowItem"
      }, a, {
        class: ["v-tabs-window-item", e.class],
        style: e.style
      }), t);
    }), {};
  }
});
function Pu(e) {
  let {
    selectedElement: n,
    containerElement: t,
    isRtl: a,
    isHorizontal: l
  } = e;
  const o = Dt(l, t), i = eo(l, a, t), s = Dt(l, n), u = to(l, n), r = s * 0.4;
  return i > u ? u - r : i + o < u + s ? u - o + s + r : i;
}
function Iu(e) {
  let {
    selectedElement: n,
    containerElement: t,
    isHorizontal: a
  } = e;
  const l = Dt(a, t), o = to(a, n), i = Dt(a, n);
  return o - l / 2 + i / 2;
}
function Ql(e, n) {
  const t = e ? "scrollWidth" : "scrollHeight";
  return (n == null ? void 0 : n[t]) || 0;
}
function Au(e, n) {
  const t = e ? "clientWidth" : "clientHeight";
  return (n == null ? void 0 : n[t]) || 0;
}
function eo(e, n, t) {
  if (!t)
    return 0;
  const {
    scrollLeft: a,
    offsetWidth: l,
    scrollWidth: o
  } = t;
  return e ? n ? o - l + a : a : t.scrollTop;
}
function Dt(e, n) {
  const t = e ? "offsetWidth" : "offsetHeight";
  return (n == null ? void 0 : n[t]) || 0;
}
function to(e, n) {
  const t = e ? "offsetLeft" : "offsetTop";
  return (n == null ? void 0 : n[t]) || 0;
}
const ao = Symbol.for("vuetify:v-slide-group"), yl = K({
  centerActive: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  symbol: {
    type: null,
    default: ao
  },
  nextIcon: {
    type: Se,
    default: "$next"
  },
  prevIcon: {
    type: Se,
    default: "$prev"
  },
  showArrows: {
    type: [Boolean, String],
    validator: (e) => typeof e == "boolean" || ["always", "desktop", "mobile"].includes(e)
  },
  ...xe(),
  ...Yt({
    mobile: null
  }),
  ...Ke(),
  ...fn({
    selectedClass: "v-slide-group-item--active"
  })
}, "VSlideGroup"), Nt = ne()({
  name: "VSlideGroup",
  props: yl(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const {
      isRtl: a
    } = ot(), {
      displayClasses: l,
      mobile: o
    } = ht(e), i = ll(e, e.symbol), s = ee(!1), u = ee(0), r = ee(0), c = ee(0), d = I(() => e.direction === "horizontal"), {
      resizeRef: f,
      contentRect: v
    } = Pt(), {
      resizeRef: g,
      contentRect: V
    } = Pt(), y = os(), w = I(() => ({
      container: f.el,
      duration: 200,
      easing: "easeOutQuart"
    })), m = I(() => i.selected.value.length ? i.items.value.findIndex((E) => E.id === i.selected.value[0]) : -1), A = I(() => i.selected.value.length ? i.items.value.findIndex((E) => E.id === i.selected.value[i.selected.value.length - 1]) : -1);
    if (ze) {
      let E = -1;
      J(() => [i.selected.value, v.value, V.value, d.value], () => {
        cancelAnimationFrame(E), E = requestAnimationFrame(() => {
          if (v.value && V.value) {
            const F = d.value ? "width" : "height";
            r.value = v.value[F], c.value = V.value[F], s.value = r.value + 1 < c.value;
          }
          if (m.value >= 0 && g.el) {
            const F = g.el.children[A.value];
            k(F, e.centerActive);
          }
        });
      });
    }
    const x = ee(!1);
    function k(E, F) {
      let j = 0;
      F ? j = Iu({
        containerElement: f.el,
        isHorizontal: d.value,
        selectedElement: E
      }) : j = Pu({
        containerElement: f.el,
        isHorizontal: d.value,
        isRtl: a.value,
        selectedElement: E
      }), S(j);
    }
    function S(E) {
      if (!ze || !f.el) return;
      const F = Dt(d.value, f.el), j = eo(d.value, a.value, f.el);
      if (!(Ql(d.value, f.el) <= F || // Prevent scrolling by only a couple of pixels, which doesn't look smooth
      Math.abs(E - j) < 16)) {
        if (d.value && a.value && f.el) {
          const {
            scrollWidth: le,
            offsetWidth: ue
          } = f.el;
          E = le - ue - E;
        }
        d.value ? y.horizontal(E, w.value) : y(E, w.value);
      }
    }
    function P(E) {
      const {
        scrollTop: F,
        scrollLeft: j
      } = E.target;
      u.value = d.value ? j : F;
    }
    function b(E) {
      if (x.value = !0, !(!s.value || !g.el)) {
        for (const F of E.composedPath())
          for (const j of g.el.children)
            if (j === F) {
              k(j);
              return;
            }
      }
    }
    function $(E) {
      x.value = !1;
    }
    let T = !1;
    function B(E) {
      var F;
      !T && !x.value && !(E.relatedTarget && ((F = g.el) != null && F.contains(E.relatedTarget))) && U(), T = !1;
    }
    function L() {
      T = !0;
    }
    function M(E) {
      if (!g.el) return;
      function F(j) {
        E.preventDefault(), U(j);
      }
      d.value ? E.key === "ArrowRight" ? F(a.value ? "prev" : "next") : E.key === "ArrowLeft" && F(a.value ? "next" : "prev") : E.key === "ArrowDown" ? F("next") : E.key === "ArrowUp" && F("prev"), E.key === "Home" ? F("first") : E.key === "End" && F("last");
    }
    function W(E, F) {
      if (!E) return;
      let j = E;
      do
        j = j == null ? void 0 : j[F === "next" ? "nextElementSibling" : "previousElementSibling"];
      while (j != null && j.hasAttribute("disabled"));
      return j;
    }
    function U(E) {
      if (!g.el) return;
      let F;
      if (!E)
        F = za(g.el)[0];
      else if (E === "next") {
        if (F = W(g.el.querySelector(":focus"), E), !F) return U("first");
      } else if (E === "prev") {
        if (F = W(g.el.querySelector(":focus"), E), !F) return U("last");
      } else E === "first" ? (F = g.el.firstElementChild, F != null && F.hasAttribute("disabled") && (F = W(F, "next"))) : E === "last" && (F = g.el.lastElementChild, F != null && F.hasAttribute("disabled") && (F = W(F, "prev")));
      F && F.focus({
        preventScroll: !0
      });
    }
    function Y(E) {
      const F = d.value && a.value ? -1 : 1, j = (E === "prev" ? -F : F) * r.value;
      let be = u.value + j;
      if (d.value && a.value && f.el) {
        const {
          scrollWidth: le,
          offsetWidth: ue
        } = f.el;
        be += le - ue;
      }
      S(be);
    }
    const te = I(() => ({
      next: i.next,
      prev: i.prev,
      select: i.select,
      isSelected: i.isSelected
    })), ae = I(() => {
      switch (e.showArrows) {
        case "always":
          return !0;
        case "desktop":
          return !o.value;
        case !0:
          return s.value || Math.abs(u.value) > 0;
        case "mobile":
          return o.value || s.value || Math.abs(u.value) > 0;
        default:
          return !o.value && (s.value || Math.abs(u.value) > 0);
      }
    }), re = I(() => Math.abs(u.value) > 1), _ = I(() => {
      if (!f.value) return !1;
      const E = Ql(d.value, f.el), F = Au(d.value, f.el);
      return E - F - Math.abs(u.value) > 1;
    });
    return ie(() => h(e.tag, {
      class: me(["v-slide-group", {
        "v-slide-group--vertical": !d.value,
        "v-slide-group--has-affixes": ae.value,
        "v-slide-group--is-overflowing": s.value
      }, l.value, e.class]),
      style: Ve(e.style),
      tabindex: x.value || i.selected.value.length ? -1 : 0,
      onFocus: B
    }, {
      default: () => {
        var E, F, j;
        return [ae.value && C("div", {
          key: "prev",
          class: me(["v-slide-group__prev", {
            "v-slide-group__prev--disabled": !re.value
          }]),
          onMousedown: L,
          onClick: () => re.value && Y("prev")
        }, [((E = t.prev) == null ? void 0 : E.call(t, te.value)) ?? h(Ol, null, {
          default: () => [h(ke, {
            icon: a.value ? e.nextIcon : e.prevIcon
          }, null)]
        })]), C("div", {
          key: "container",
          ref: f,
          class: "v-slide-group__container",
          onScroll: P
        }, [C("div", {
          ref: g,
          class: "v-slide-group__content",
          onFocusin: b,
          onFocusout: $,
          onKeydown: M
        }, [(F = t.default) == null ? void 0 : F.call(t, te.value)])]), ae.value && C("div", {
          key: "next",
          class: me(["v-slide-group__next", {
            "v-slide-group__next--disabled": !_.value
          }]),
          onMousedown: L,
          onClick: () => _.value && Y("next")
        }, [((j = t.next) == null ? void 0 : j.call(t, te.value)) ?? h(Ol, null, {
          default: () => [h(ke, {
            icon: a.value ? e.prevIcon : e.nextIcon
          }, null)]
        })])];
      }
    })), {
      selected: i.selected,
      scrollTo: Y,
      scrollOffset: u,
      focus: U,
      hasPrev: re,
      hasNext: _
    };
  }
});
function Tu(e) {
  return e ? e.map((n) => Zi(n) ? n : {
    text: n,
    value: n
  }) : [];
}
const _u = K({
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
  ...yl({
    mandatory: "force",
    selectedClass: "v-tab-item--selected"
  }),
  ...yt(),
  ...Ke()
}, "VTabs"), $u = ne()({
  name: "VTabs",
  props: _u(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, n) {
    let {
      attrs: t,
      slots: a
    } = n;
    const l = we(e, "modelValue"), o = I(() => Tu(e.items)), {
      densityClasses: i
    } = Et(e), {
      backgroundColorClasses: s,
      backgroundColorStyles: u
    } = dt(() => e.bgColor), {
      scopeId: r
    } = qt();
    return at({
      VTab: {
        color: H(() => e.color),
        direction: H(() => e.direction),
        stacked: H(() => e.stacked),
        fixed: H(() => e.fixedTabs),
        sliderColor: H(() => e.sliderColor),
        hideSlider: H(() => e.hideSlider)
      }
    }), ie(() => {
      const c = Nt.filterProps(e), d = !!(a.window || e.items.length > 0);
      return C(X, null, [h(Nt, D(c, {
        modelValue: l.value,
        "onUpdate:modelValue": (f) => l.value = f,
        class: ["v-tabs", `v-tabs--${e.direction}`, `v-tabs--align-tabs-${e.alignTabs}`, {
          "v-tabs--fixed-tabs": e.fixedTabs,
          "v-tabs--grow": e.grow,
          "v-tabs--stacked": e.stacked
        }, i.value, s.value, e.class],
        style: [{
          "--v-tabs-height": he(e.height)
        }, u.value, e.style],
        role: "tablist",
        symbol: ml
      }, r, t), {
        default: () => {
          var f;
          return [((f = a.default) == null ? void 0 : f.call(a)) ?? o.value.map((v) => {
            var g;
            return ((g = a.tab) == null ? void 0 : g.call(a, {
              item: v
            })) ?? h(Ya, D(v, {
              key: v.text,
              value: v.value
            }), {
              default: a[`tab.${v.value}`] ? () => {
                var V;
                return (V = a[`tab.${v.value}`]) == null ? void 0 : V.call(a, {
                  item: v
                });
              } : void 0
            });
          })];
        }
      }), d && h(gl, D({
        modelValue: l.value,
        "onUpdate:modelValue": (f) => l.value = f,
        key: "tabs-window"
      }, r), {
        default: () => {
          var f;
          return [o.value.map((v) => {
            var g;
            return ((g = a.item) == null ? void 0 : g.call(a, {
              item: v
            })) ?? h(ra, {
              value: v.value
            }, {
              default: () => {
                var V;
                return (V = a[`item.${v.value}`]) == null ? void 0 : V.call(a, {
                  item: v
                });
              }
            });
          }), (f = a.window) == null ? void 0 : f.call(a)];
        }
      })]);
    }), {};
  }
}), Bu = {
  class: "nav-home",
  href: "/"
};
var an;
const Eu = /* @__PURE__ */ Fe({
  __name: "OxApp",
  props: {
    apiUrl: {},
    logo: {},
    dataEl: { default: (an = document.body.dataset) == null ? void 0 : an.appData },
    models: {},
    data: {}
  },
  setup(e) {
    const n = lt(), t = ct(n, "panels."), a = e, l = Qe({ drawer: !0 }), o = Vi(a), i = Ci();
    return We(() => {
      i.panel = o.data.panel;
    }), J(() => [o.state.state, o.state.data], () => {
      o.showState = !0;
    }), fi((s, u, r) => {
      o.state.error(`${s}`);
    }), (s, u) => (R(), G(Ms, null, {
      default: O(() => [
        h(gu, {
          modelValue: p(o).showState,
          "onUpdate:modelValue": u[0] || (u[0] = (r) => p(o).showState = r),
          color: p(o).state.color,
          "multi-line": ""
        }, {
          default: O(() => [
            Pe(Me(p(o).state.toString()), 1)
          ]),
          _: 1
        }, 8, ["modelValue", "color"]),
        h(zs, { color: "primary" }, {
          prepend: O(() => [
            p(n)["nav-start"] || p(n)["nav-end"] ? (R(), G(zn, {
              key: 0,
              icon: "mdi-apps",
              title: p(oe)("nav.panels"),
              "aria-label": p(oe)("nav.panels"),
              onClick: u[1] || (u[1] = Ie((r) => l.drawer = !l.drawer, ["stop"]))
            }, null, 8, ["title", "aria-label"])) : se("", !0)
          ]),
          default: O(() => [
            h(jl, { id: "app-bar-sheet-title" }),
            h(jl, { id: "app-bar-title" }, {
              default: O(() => [
                z(s.$slots, "title")
              ]),
              _: 3
            }),
            z(s.$slots, "app-bar-left"),
            u[5] || (u[5] = C("div", {
              id: "app-bar-right",
              class: "mr-3"
            }, null, -1)),
            z(s.$slots, "app-bar-right")
          ]),
          _: 3,
          __: [5]
        }),
        p(n)["nav-start"] || p(n)["nav-end"] ? (R(), G(p(Fs), {
          key: 0,
          drawer: l.drawer,
          "onUpdate:drawer": u[3] || (u[3] = (r) => l.drawer = r),
          items: p(o).data.nav
        }, st({
          prepend: O(() => [
            C("a", Bu, [
              s.logo ? (R(), G(Bt, {
                key: 0,
                src: s.logo,
                class: "logo"
              }, null, 8, ["src"])) : se("", !0)
            ]),
            z(s.$slots, "nav-start", { context: p(o) })
          ]),
          _: 2
        }, [
          p(n)["nav-end"] ? {
            name: "append",
            fn: O(() => [
              h(rt, {
                opened: l.opened,
                "onUpdate:opened": u[2] || (u[2] = (r) => l.opened = r)
              }, {
                default: O(() => [
                  z(s.$slots, "nav-end", { context: p(o) })
                ]),
                _: 3
              }, 8, ["opened"])
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["drawer", "items"])) : se("", !0),
        h(js, null, {
          default: O(() => [
            z(s.$slots, "main", {}, () => [
              h(gl, {
                modelValue: p(i).panel,
                "onUpdate:modelValue": u[4] || (u[4] = (r) => p(i).panel = r)
              }, {
                default: O((r) => [
                  z(s.$slots, "default", D(r, { context: p(o) })),
                  (R(!0), fe(X, null, Ae(p(t), (c, d) => (R(), G(ra, {
                    key: d,
                    value: c
                  }, {
                    default: O(() => [
                      z(s.$slots, d, D({ ref_for: !0 }, r, { context: p(o) }))
                    ]),
                    _: 2
                  }, 1032, ["value"]))), 128))
                ]),
                _: 3
              }, 8, ["modelValue"])
            ])
          ]),
          _: 3
        })
      ]),
      _: 3
    }));
  }
}), Ou = K({
  text: String,
  onClick: Ze(),
  ...xe(),
  ...Ne()
}, "VLabel"), hl = ne()({
  name: "VLabel",
  props: Ou(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    return ie(() => {
      var a;
      return C("label", {
        class: me(["v-label", {
          "v-label--clickable": !!e.onClick
        }, e.class]),
        style: Ve(e.style),
        onClick: e.onClick
      }, [e.text, (a = t.default) == null ? void 0 : a.call(t)]);
    }), {};
  }
}), lo = Symbol.for("vuetify:selection-control-group"), no = K({
  color: String,
  disabled: {
    type: Boolean,
    default: null
  },
  defaultsTarget: String,
  error: Boolean,
  id: String,
  inline: Boolean,
  falseIcon: Se,
  trueIcon: Se,
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
    default: ut
  },
  ...xe(),
  ...yt(),
  ...Ne()
}, "SelectionControlGroup"), Fu = K({
  ...no({
    defaultsTarget: "VSelectionControl"
  })
}, "VSelectionControlGroup");
ne()({
  name: "VSelectionControlGroup",
  props: Fu(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = we(e, "modelValue"), l = ft(), o = H(() => e.id || `v-selection-control-group-${l}`), i = H(() => e.name || o.value), s = /* @__PURE__ */ new Set();
    return Ue(lo, {
      modelValue: a,
      forceUpdate: () => {
        s.forEach((u) => u());
      },
      onForceUpdate: (u) => {
        s.add(u), je(() => {
          s.delete(u);
        });
      }
    }), at({
      [e.defaultsTarget]: {
        color: H(() => e.color),
        disabled: H(() => e.disabled),
        density: H(() => e.density),
        error: H(() => e.error),
        inline: H(() => e.inline),
        modelValue: a,
        multiple: H(() => !!e.multiple || e.multiple == null && Array.isArray(a.value)),
        name: i,
        falseIcon: H(() => e.falseIcon),
        trueIcon: H(() => e.trueIcon),
        readonly: H(() => e.readonly),
        ripple: H(() => e.ripple),
        type: H(() => e.type),
        valueComparator: H(() => e.valueComparator)
      }
    }), ie(() => {
      var u;
      return C("div", {
        class: me(["v-selection-control-group", {
          "v-selection-control-group--inline": e.inline
        }, e.class]),
        style: Ve(e.style),
        role: e.type === "radio" ? "radiogroup" : void 0
      }, [(u = t.default) == null ? void 0 : u.call(t)]);
    }), {};
  }
});
const oo = K({
  label: String,
  baseColor: String,
  trueValue: null,
  falseValue: null,
  value: null,
  ...xe(),
  ...no()
}, "VSelectionControl");
function Ru(e) {
  const n = ve(lo, void 0), {
    densityClasses: t
  } = Et(e), a = we(e, "modelValue"), l = I(() => e.trueValue !== void 0 ? e.trueValue : e.value !== void 0 ? e.value : !0), o = I(() => e.falseValue !== void 0 ? e.falseValue : !1), i = I(() => !!e.multiple || e.multiple == null && Array.isArray(a.value)), s = I({
    get() {
      const v = n ? n.modelValue.value : a.value;
      return i.value ? He(v).some((g) => e.valueComparator(g, l.value)) : e.valueComparator(v, l.value);
    },
    set(v) {
      if (e.readonly) return;
      const g = v ? l.value : o.value;
      let V = g;
      i.value && (V = v ? [...He(a.value), g] : He(a.value).filter((y) => !e.valueComparator(y, l.value))), n ? n.modelValue.value = V : a.value = V;
    }
  }), {
    textColorClasses: u,
    textColorStyles: r
  } = Gt(() => {
    if (!(e.error || e.disabled))
      return s.value ? e.color : e.baseColor;
  }), {
    backgroundColorClasses: c,
    backgroundColorStyles: d
  } = dt(() => s.value && !e.error && !e.disabled ? e.color : e.baseColor), f = I(() => s.value ? e.trueIcon : e.falseIcon);
  return {
    group: n,
    densityClasses: t,
    trueValue: l,
    falseValue: o,
    model: s,
    textColorClasses: u,
    textColorStyles: r,
    backgroundColorClasses: c,
    backgroundColorStyles: d,
    icon: f
  };
}
const Jl = ne()({
  name: "VSelectionControl",
  directives: {
    vRipple: It
  },
  inheritAttrs: !1,
  props: oo(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, n) {
    let {
      attrs: t,
      slots: a
    } = n;
    const {
      group: l,
      densityClasses: o,
      icon: i,
      model: s,
      textColorClasses: u,
      textColorStyles: r,
      backgroundColorClasses: c,
      backgroundColorStyles: d,
      trueValue: f
    } = Ru(e), v = ft(), g = ee(!1), V = ee(!1), y = q(), w = H(() => e.id || `input-${v}`), m = H(() => !e.disabled && !e.readonly);
    l == null || l.onForceUpdate(() => {
      y.value && (y.value.checked = s.value);
    });
    function A(P) {
      m.value && (g.value = !0, At(P.target, ":focus-visible") !== !1 && (V.value = !0));
    }
    function x() {
      g.value = !1, V.value = !1;
    }
    function k(P) {
      P.stopPropagation();
    }
    function S(P) {
      if (!m.value) {
        y.value && (y.value.checked = s.value);
        return;
      }
      e.readonly && l && Be(() => l.forceUpdate()), s.value = P.target.checked;
    }
    return ie(() => {
      var B, L;
      const P = a.label ? a.label({
        label: e.label,
        props: {
          for: w.value
        }
      }) : e.label, [b, $] = ka(t), T = C("input", D({
        ref: y,
        checked: s.value,
        disabled: !!e.disabled,
        id: w.value,
        onBlur: x,
        onFocus: A,
        onInput: S,
        "aria-disabled": !!e.disabled,
        "aria-label": e.label,
        type: e.type,
        value: f.value,
        name: e.name,
        "aria-checked": e.type === "checkbox" ? s.value : void 0
      }, $), null);
      return C("div", D({
        class: ["v-selection-control", {
          "v-selection-control--dirty": s.value,
          "v-selection-control--disabled": e.disabled,
          "v-selection-control--error": e.error,
          "v-selection-control--focused": g.value,
          "v-selection-control--focus-visible": V.value,
          "v-selection-control--inline": e.inline
        }, o.value, e.class]
      }, b, {
        style: e.style
      }), [C("div", {
        class: me(["v-selection-control__wrapper", u.value]),
        style: Ve(r.value)
      }, [(B = a.default) == null ? void 0 : B.call(a, {
        backgroundColorClasses: c,
        backgroundColorStyles: d
      }), Ye(C("div", {
        class: me(["v-selection-control__input"])
      }, [((L = a.input) == null ? void 0 : L.call(a, {
        model: s,
        textColorClasses: u,
        textColorStyles: r,
        backgroundColorClasses: c,
        backgroundColorStyles: d,
        inputNode: T,
        icon: i.value,
        props: {
          onFocus: A,
          onBlur: x,
          id: w.value
        }
      })) ?? C(X, null, [i.value && h(ke, {
        key: "icon",
        icon: i.value
      }, null), T])]), [[It, e.ripple && [!e.disabled && !e.readonly, null, ["center", "circle"]]]])]), P && h(hl, {
        for: w.value,
        onClick: k
      }, {
        default: () => [P]
      })]);
    }), {
      isFocused: g,
      input: y
    };
  }
}), io = K({
  indeterminate: Boolean,
  indeterminateIcon: {
    type: Se,
    default: "$checkboxIndeterminate"
  },
  ...oo({
    falseIcon: "$checkboxOff",
    trueIcon: "$checkboxOn"
  })
}, "VCheckboxBtn"), xt = ne()({
  name: "VCheckboxBtn",
  props: io(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:indeterminate": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = we(e, "indeterminate"), l = we(e, "modelValue");
    function o(u) {
      a.value && (a.value = !1);
    }
    const i = H(() => a.value ? e.indeterminateIcon : e.falseIcon), s = H(() => a.value ? e.indeterminateIcon : e.trueIcon);
    return ie(() => {
      const u = bt(Jl.filterProps(e), ["modelValue"]);
      return h(Jl, D(u, {
        modelValue: l.value,
        "onUpdate:modelValue": [(r) => l.value = r, o],
        class: ["v-checkbox-btn", e.class],
        style: e.style,
        type: "checkbox",
        falseIcon: i.value,
        trueIcon: s.value,
        "aria-checked": a.value ? "mixed" : void 0
      }), t);
    }), {};
  }
});
function so(e) {
  const {
    t: n
  } = it();
  function t(a) {
    let {
      name: l,
      color: o,
      ...i
    } = a;
    const s = {
      prepend: "prependAction",
      prependInner: "prependAction",
      append: "appendAction",
      appendInner: "appendAction",
      clear: "clear"
    }[l], u = e[`onClick:${l}`];
    function r(d) {
      d.key !== "Enter" && d.key !== " " || (d.preventDefault(), d.stopPropagation(), cl(u, new PointerEvent("click", d)));
    }
    const c = u && s ? n(`$vuetify.input.${s}`, e.label ?? "") : void 0;
    return h(ke, D({
      icon: e[`${l}Icon`],
      "aria-label": c,
      onClick: u,
      onKeydown: r,
      color: o
    }, i), null);
  }
  return {
    InputIcon: t
  };
}
const Mu = K({
  active: Boolean,
  color: String,
  messages: {
    type: [Array, String],
    default: () => []
  },
  ...xe(),
  ...jt({
    transition: {
      component: mn,
      leaveAbsolute: !0,
      group: !0
    }
  })
}, "VMessages"), Lu = ne()({
  name: "VMessages",
  props: Mu(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = I(() => He(e.messages)), {
      textColorClasses: l,
      textColorStyles: o
    } = Gt(() => e.color);
    return ie(() => h(Sa, {
      transition: e.transition,
      tag: "div",
      class: me(["v-messages", l.value, e.class]),
      style: Ve([o.value, e.style])
    }, {
      default: () => [e.active && a.value.map((i, s) => C("div", {
        class: "v-messages__message",
        key: `${s}-${a.value}`
      }, [t.message ? t.message({
        message: i
      }) : i]))]
    })), {};
  }
}), uo = K({
  focused: Boolean,
  "onUpdate:focused": Ze()
}, "focus");
function Va(e) {
  let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : In();
  const t = we(e, "focused"), a = H(() => ({
    [`${n}--focused`]: t.value
  }));
  function l() {
    t.value = !0;
  }
  function o() {
    t.value = !1;
  }
  return {
    focusClasses: a,
    isFocused: t,
    focus: l,
    blur: o
  };
}
const ro = Symbol.for("vuetify:form"), Du = K({
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
function Nu(e) {
  const n = we(e, "modelValue"), t = H(() => e.disabled), a = H(() => e.readonly), l = ee(!1), o = q([]), i = q([]);
  async function s() {
    const c = [];
    let d = !0;
    i.value = [], l.value = !0;
    for (const f of o.value) {
      const v = await f.validate();
      if (v.length > 0 && (d = !1, c.push({
        id: f.id,
        errorMessages: v
      })), !d && e.fastFail) break;
    }
    return i.value = c, l.value = !1, {
      valid: d,
      errors: i.value
    };
  }
  function u() {
    o.value.forEach((c) => c.reset());
  }
  function r() {
    o.value.forEach((c) => c.resetValidation());
  }
  return J(o, () => {
    let c = 0, d = 0;
    const f = [];
    for (const v of o.value)
      v.isValid === !1 ? (d++, f.push({
        id: v.id,
        errorMessages: v.errorMessages
      })) : v.isValid === !0 && c++;
    i.value = f, n.value = d > 0 ? !1 : c === o.value.length ? !0 : null;
  }, {
    deep: !0,
    flush: "post"
  }), Ue(ro, {
    register: (c) => {
      let {
        id: d,
        vm: f,
        validate: v,
        reset: g,
        resetValidation: V
      } = c;
      o.value.some((y) => y.id === d) && Vn(`Duplicate input name "${d}"`), o.value.push({
        id: d,
        validate: v,
        reset: g,
        resetValidation: V,
        vm: mi(f),
        isValid: null,
        errorMessages: []
      });
    },
    unregister: (c) => {
      o.value = o.value.filter((d) => d.id !== c);
    },
    update: (c, d, f) => {
      const v = o.value.find((g) => g.id === c);
      v && (v.isValid = d, v.errorMessages = f);
    },
    isDisabled: t,
    isReadonly: a,
    isValidating: l,
    isValid: n,
    items: o,
    validateOn: H(() => e.validateOn)
  }), {
    errors: i,
    isDisabled: t,
    isReadonly: a,
    isValidating: l,
    isValid: n,
    items: o,
    validate: s,
    reset: u,
    resetValidation: r
  };
}
function bl(e) {
  const n = ve(ro, null);
  return {
    ...n,
    isReadonly: I(() => !!((e == null ? void 0 : e.readonly) ?? (n == null ? void 0 : n.isReadonly.value))),
    isDisabled: I(() => !!((e == null ? void 0 : e.disabled) ?? (n == null ? void 0 : n.isDisabled.value)))
  };
}
const Hu = Symbol.for("vuetify:rules");
function zu(e) {
  const n = ve(Hu, null);
  return n ? n(e) : H(e);
}
const Wu = K({
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
  ...uo()
}, "validation");
function Uu(e) {
  let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : In(), t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ft();
  const a = we(e, "modelValue"), l = I(() => e.validationValue === void 0 ? a.value : e.validationValue), o = bl(e), i = zu(() => e.rules), s = q([]), u = ee(!0), r = I(() => !!(He(a.value === "" ? null : a.value).length || He(l.value === "" ? null : l.value).length)), c = I(() => {
    var x;
    return (x = e.errorMessages) != null && x.length ? He(e.errorMessages).concat(s.value).slice(0, Math.max(0, Number(e.maxErrors))) : s.value;
  }), d = I(() => {
    var S;
    let x = (e.validateOn ?? ((S = o.validateOn) == null ? void 0 : S.value)) || "input";
    x === "lazy" && (x = "input lazy"), x === "eager" && (x = "input eager");
    const k = new Set((x == null ? void 0 : x.split(" ")) ?? []);
    return {
      input: k.has("input"),
      blur: k.has("blur") || k.has("input") || k.has("invalid-input"),
      invalidInput: k.has("invalid-input"),
      lazy: k.has("lazy"),
      eager: k.has("eager")
    };
  }), f = I(() => {
    var x;
    return e.error || (x = e.errorMessages) != null && x.length ? !1 : e.rules.length ? u.value ? s.value.length || d.value.lazy ? null : !0 : !s.value.length : !0;
  }), v = ee(!1), g = I(() => ({
    [`${n}--error`]: f.value === !1,
    [`${n}--dirty`]: r.value,
    [`${n}--disabled`]: o.isDisabled.value,
    [`${n}--readonly`]: o.isReadonly.value
  })), V = nt("validation"), y = I(() => e.name ?? p(t));
  gi(() => {
    var x;
    (x = o.register) == null || x.call(o, {
      id: y.value,
      vm: V,
      validate: A,
      reset: w,
      resetValidation: m
    });
  }), mt(() => {
    var x;
    (x = o.unregister) == null || x.call(o, y.value);
  }), We(async () => {
    var x;
    d.value.lazy || await A(!d.value.eager), (x = o.update) == null || x.call(o, y.value, f.value, c.value);
  }), Xe(() => d.value.input || d.value.invalidInput && f.value === !1, () => {
    J(l, () => {
      if (l.value != null)
        A();
      else if (e.focused) {
        const x = J(() => e.focused, (k) => {
          k || A(), x();
        });
      }
    });
  }), Xe(() => d.value.blur, () => {
    J(() => e.focused, (x) => {
      x || A();
    });
  }), J([f, c], () => {
    var x;
    (x = o.update) == null || x.call(o, y.value, f.value, c.value);
  });
  async function w() {
    a.value = null, await Be(), await m();
  }
  async function m() {
    u.value = !0, d.value.lazy ? s.value = [] : await A(!d.value.eager);
  }
  async function A() {
    let x = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    const k = [];
    v.value = !0;
    for (const S of i.value) {
      if (k.length >= Number(e.maxErrors ?? 1))
        break;
      const b = await (typeof S == "function" ? S : () => S)(l.value);
      if (b !== !0) {
        if (b !== !1 && typeof b != "string") {
          console.warn(`${b} is not a valid value. Rule functions must return boolean true or a string.`);
          continue;
        }
        k.push(b || "");
      }
    }
    return s.value = k, v.value = !1, u.value = x, s.value;
  }
  return {
    errorMessages: c,
    isDirty: r,
    isDisabled: o.isDisabled,
    isReadonly: o.isReadonly,
    isPristine: u,
    isValid: f,
    isValidating: v,
    reset: w,
    resetValidation: m,
    validate: A,
    validationClasses: g
  };
}
const Ca = K({
  id: String,
  appendIcon: Se,
  baseColor: String,
  centerAffix: {
    type: Boolean,
    default: !0
  },
  color: String,
  glow: Boolean,
  iconColor: [Boolean, String],
  prependIcon: Se,
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
  "onClick:prepend": Ze(),
  "onClick:append": Ze(),
  ...xe(),
  ...yt(),
  ...Qi(Ut(), ["maxWidth", "minWidth", "width"]),
  ...Ne(),
  ...Wu()
}, "VInput"), Tt = ne()({
  name: "VInput",
  props: {
    ...Ca()
  },
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, n) {
    let {
      attrs: t,
      slots: a,
      emit: l
    } = n;
    const {
      densityClasses: o
    } = Et(e), {
      dimensionStyles: i
    } = Wt(e), {
      themeClasses: s
    } = qe(e), {
      rtlClasses: u
    } = ot(), {
      InputIcon: r
    } = so(e), c = ft(), d = I(() => e.id || `input-${c}`), f = I(() => `${d.value}-messages`), {
      errorMessages: v,
      isDirty: g,
      isDisabled: V,
      isReadonly: y,
      isPristine: w,
      isValid: m,
      isValidating: A,
      reset: x,
      resetValidation: k,
      validate: S,
      validationClasses: P
    } = Uu(e, "v-input", d), b = I(() => ({
      id: d,
      messagesId: f,
      isDirty: g,
      isDisabled: V,
      isReadonly: y,
      isPristine: w,
      isValid: m,
      isValidating: A,
      reset: x,
      resetValidation: k,
      validate: S
    })), $ = H(() => e.error || e.disabled ? void 0 : e.focused ? e.color : e.baseColor), T = H(() => {
      if (e.iconColor)
        return e.iconColor === !0 ? $.value : e.iconColor;
    }), B = I(() => {
      var L;
      return (L = e.errorMessages) != null && L.length || !w.value && v.value.length ? v.value : e.hint && (e.persistentHint || e.focused) ? e.hint : e.messages;
    });
    return ie(() => {
      var Y, te, ae, re;
      const L = !!(a.prepend || e.prependIcon), M = !!(a.append || e.appendIcon), W = B.value.length > 0, U = !e.hideDetails || e.hideDetails === "auto" && (W || !!a.details);
      return C("div", {
        class: me(["v-input", `v-input--${e.direction}`, {
          "v-input--center-affix": e.centerAffix,
          "v-input--focused": e.focused,
          "v-input--glow": e.glow,
          "v-input--hide-spin-buttons": e.hideSpinButtons
        }, o.value, s.value, u.value, P.value, e.class]),
        style: Ve([i.value, e.style])
      }, [L && C("div", {
        key: "prepend",
        class: "v-input__prepend"
      }, [(Y = a.prepend) == null ? void 0 : Y.call(a, b.value), e.prependIcon && h(r, {
        key: "prepend-icon",
        name: "prepend",
        color: T.value
      }, null)]), a.default && C("div", {
        class: "v-input__control"
      }, [(te = a.default) == null ? void 0 : te.call(a, b.value)]), M && C("div", {
        key: "append",
        class: "v-input__append"
      }, [e.appendIcon && h(r, {
        key: "append-icon",
        name: "append",
        color: T.value
      }, null), (ae = a.append) == null ? void 0 : ae.call(a, b.value)]), U && C("div", {
        id: f.value,
        class: "v-input__details",
        role: "alert",
        "aria-live": "polite"
      }, [h(Lu, {
        active: W,
        messages: B.value
      }, {
        message: a.message
      }), (re = a.details) == null ? void 0 : re.call(a, b.value)])]);
    }), {
      reset: x,
      resetValidation: k,
      validate: S,
      isValid: m,
      errorMessages: v
    };
  }
}), ju = K({
  ...Ca(),
  ...bt(io(), ["inline"])
}, "VCheckbox"), Ku = ne()({
  name: "VCheckbox",
  inheritAttrs: !1,
  props: ju(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:focused": (e) => !0
  },
  setup(e, n) {
    let {
      attrs: t,
      slots: a
    } = n;
    const l = we(e, "modelValue"), {
      isFocused: o,
      focus: i,
      blur: s
    } = Va(e), u = ft();
    return ie(() => {
      const [r, c] = ka(t), d = Tt.filterProps(e), f = xt.filterProps(e);
      return h(Tt, D({
        class: ["v-checkbox", e.class]
      }, r, d, {
        modelValue: l.value,
        "onUpdate:modelValue": (v) => l.value = v,
        id: e.id || `checkbox-${u}`,
        focused: o.value,
        style: e.style
      }), {
        ...a,
        default: (v) => {
          let {
            id: g,
            messagesId: V,
            isDisabled: y,
            isReadonly: w,
            isValid: m
          } = v;
          return h(xt, D(f, {
            id: g.value,
            "aria-describedby": V.value,
            disabled: y.value,
            readonly: w.value
          }, c, {
            error: m.value === !1,
            modelValue: l.value,
            "onUpdate:modelValue": (A) => l.value = A,
            onFocus: i,
            onBlur: s
          }), a);
        }
      });
    }), {};
  }
}), co = Symbol.for("vuetify:v-chip-group"), Gu = K({
  baseColor: String,
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: ut
  },
  ...yl(),
  ...xe(),
  ...fn({
    selectedClass: "v-chip--selected"
  }),
  ...Ke(),
  ...Ne(),
  ...Kt({
    variant: "tonal"
  })
}, "VChipGroup");
ne()({
  name: "VChipGroup",
  props: Gu(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const {
      themeClasses: a
    } = qe(e), {
      isSelected: l,
      select: o,
      next: i,
      prev: s,
      selected: u
    } = ll(e, co);
    return at({
      VChip: {
        baseColor: H(() => e.baseColor),
        color: H(() => e.color),
        disabled: H(() => e.disabled),
        filter: H(() => e.filter),
        variant: H(() => e.variant)
      }
    }), ie(() => {
      const r = Nt.filterProps(e);
      return h(Nt, D(r, {
        class: ["v-chip-group", {
          "v-chip-group--column": e.column
        }, a.value, e.class],
        style: e.style
      }), {
        default: () => {
          var c;
          return [(c = t.default) == null ? void 0 : c.call(t, {
            isSelected: l,
            select: o,
            next: i,
            prev: s,
            selected: u.value
          })];
        }
      });
    }), {};
  }
});
const Yu = K({
  activeClass: String,
  appendAvatar: String,
  appendIcon: Se,
  baseColor: String,
  closable: Boolean,
  closeIcon: {
    type: Se,
    default: "$delete"
  },
  closeLabel: {
    type: String,
    default: "$vuetify.close"
  },
  draggable: Boolean,
  filter: Boolean,
  filterIcon: {
    type: Se,
    default: "$complete"
  },
  label: Boolean,
  link: {
    type: Boolean,
    default: void 0
  },
  pill: Boolean,
  prependAvatar: String,
  prependIcon: Se,
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
  onClick: Ze(),
  onClickOnce: Ze(),
  ...zt(),
  ...xe(),
  ...yt(),
  ...Ht(),
  ...nl(),
  ...kt(),
  ...bn(),
  ...hn(),
  ...Ke({
    tag: "span"
  }),
  ...Ne(),
  ...Kt({
    variant: "tonal"
  })
}, "VChip"), pl = ne()({
  name: "VChip",
  directives: {
    vRipple: It
  },
  props: Yu(),
  emits: {
    "click:close": (e) => !0,
    "update:modelValue": (e) => !0,
    "group:selected": (e) => !0,
    click: (e) => !0
  },
  setup(e, n) {
    let {
      attrs: t,
      emit: a,
      slots: l
    } = n;
    const {
      t: o
    } = it(), {
      borderClasses: i
    } = ba(e), {
      densityClasses: s
    } = Et(e), {
      elevationClasses: u
    } = pa(e), {
      roundedClasses: r
    } = $t(e), {
      sizeClasses: c
    } = Hi(e), {
      themeClasses: d
    } = qe(e), f = we(e, "modelValue"), v = ol(e, co, !1), g = gn(e, t), V = H(() => e.link !== !1 && g.isLink.value), y = I(() => !e.disabled && e.link !== !1 && (!!v || e.link || g.isClickable.value)), w = H(() => ({
      "aria-label": o(e.closeLabel),
      disabled: e.disabled,
      onClick(P) {
        P.preventDefault(), P.stopPropagation(), f.value = !1, a("click:close", P);
      }
    })), {
      colorClasses: m,
      colorStyles: A,
      variantClasses: x
    } = tl(() => ({
      color: !v || v.isSelected.value ? e.color ?? e.baseColor : e.baseColor,
      variant: e.variant
    }));
    function k(P) {
      var b;
      a("click", P), y.value && ((b = g.navigate) == null || b.call(g, P), v == null || v.toggle());
    }
    function S(P) {
      (P.key === "Enter" || P.key === " ") && (P.preventDefault(), k(P));
    }
    return () => {
      var W;
      const P = g.isLink.value ? "a" : e.tag, b = !!(e.appendIcon || e.appendAvatar), $ = !!(b || l.append), T = !!(l.close || e.closable), B = !!(l.filter || e.filter) && v, L = !!(e.prependIcon || e.prependAvatar), M = !!(L || l.prepend);
      return f.value && Ye(h(P, D({
        class: ["v-chip", {
          "v-chip--disabled": e.disabled,
          "v-chip--label": e.label,
          "v-chip--link": y.value,
          "v-chip--filter": B,
          "v-chip--pill": e.pill,
          [`${e.activeClass}`]: e.activeClass && ((W = g.isActive) == null ? void 0 : W.value)
        }, d.value, i.value, m.value, s.value, u.value, r.value, c.value, x.value, v == null ? void 0 : v.selectedClass.value, e.class],
        style: [A.value, e.style],
        disabled: e.disabled || void 0,
        draggable: e.draggable,
        tabindex: y.value ? 0 : void 0,
        onClick: k,
        onKeydown: y.value && !V.value && S
      }, g.linkProps), {
        default: () => {
          var U;
          return [al(y.value, "v-chip"), B && h(yn, {
            key: "filter"
          }, {
            default: () => [Ye(C("div", {
              class: "v-chip__filter"
            }, [l.filter ? h(Le, {
              key: "filter-defaults",
              disabled: !e.filterIcon,
              defaults: {
                VIcon: {
                  icon: e.filterIcon
                }
              }
            }, l.filter) : h(ke, {
              key: "filter-icon",
              icon: e.filterIcon
            }, null)]), [[_t, v.isSelected.value]])]
          }), M && C("div", {
            key: "prepend",
            class: "v-chip__prepend"
          }, [l.prepend ? h(Le, {
            key: "prepend-defaults",
            disabled: !L,
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
          }, l.prepend) : C(X, null, [e.prependIcon && h(ke, {
            key: "prepend-icon",
            icon: e.prependIcon,
            start: !0
          }, null), e.prependAvatar && h(St, {
            key: "prepend-avatar",
            image: e.prependAvatar,
            start: !0
          }, null)])]), C("div", {
            class: "v-chip__content",
            "data-no-activator": ""
          }, [((U = l.default) == null ? void 0 : U.call(l, {
            isSelected: v == null ? void 0 : v.isSelected.value,
            selectedClass: v == null ? void 0 : v.selectedClass.value,
            select: v == null ? void 0 : v.select,
            toggle: v == null ? void 0 : v.toggle,
            value: v == null ? void 0 : v.value.value,
            disabled: e.disabled
          })) ?? Me(e.text)]), $ && C("div", {
            key: "append",
            class: "v-chip__append"
          }, [l.append ? h(Le, {
            key: "append-defaults",
            disabled: !b,
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
          }, l.append) : C(X, null, [e.appendIcon && h(ke, {
            key: "append-icon",
            end: !0,
            icon: e.appendIcon
          }, null), e.appendAvatar && h(St, {
            key: "append-avatar",
            end: !0,
            image: e.appendAvatar
          }, null)])]), T && C("button", D({
            key: "close",
            class: "v-chip__close",
            type: "button",
            "data-testid": "close-chip"
          }, w.value), [l.close ? h(Le, {
            key: "close-defaults",
            defaults: {
              VIcon: {
                icon: e.closeIcon,
                size: "x-small"
              }
            }
          }, l.close) : h(ke, {
            key: "close-icon",
            icon: e.closeIcon,
            size: "x-small"
          }, null)])];
        }
      }), [[It, y.value && e.ripple, null]]);
    };
  }
}), qu = K({
  // TODO
  // disableKeys: Boolean,
  id: String,
  submenu: Boolean,
  ...bt(fl({
    closeDelay: 250,
    closeOnContentClick: !0,
    locationStrategy: "connected",
    location: void 0,
    openDelay: 300,
    scrim: !1,
    scrollStrategy: "reposition",
    transition: {
      component: Rn
    }
  }), ["absolute"])
}, "VMenu"), wl = ne()({
  name: "VMenu",
  props: qu(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = we(e, "modelValue"), {
      scopeId: l
    } = qt(), {
      isRtl: o
    } = ot(), i = ft(), s = H(() => e.id || `v-menu-${i}`), u = q(), r = ve(Ga, null), c = ee(/* @__PURE__ */ new Set());
    Ue(Ga, {
      register() {
        c.value.add(i);
      },
      unregister() {
        c.value.delete(i);
      },
      closeParents(y) {
        setTimeout(() => {
          var w;
          !c.value.size && !e.persistent && (y == null || (w = u.value) != null && w.contentEl && !Ji(y, u.value.contentEl)) && (a.value = !1, r == null || r.closeParents());
        }, 40);
      }
    }), mt(() => {
      r == null || r.unregister(), document.removeEventListener("focusin", d);
    }), ln(() => a.value = !1);
    async function d(y) {
      var A, x, k;
      const w = y.relatedTarget, m = y.target;
      await Be(), a.value && w !== m && ((A = u.value) != null && A.contentEl) && // We're the topmost menu
      ((x = u.value) != null && x.globalTop) && // It isn't the document or the menu body
      ![document, u.value.contentEl].includes(m) && // It isn't inside the menu body
      !u.value.contentEl.contains(m) && ((k = za(u.value.contentEl)[0]) == null || k.focus());
    }
    J(a, (y) => {
      y ? (r == null || r.register(), ze && document.addEventListener("focusin", d, {
        once: !0
      })) : (r == null || r.unregister(), ze && document.removeEventListener("focusin", d));
    }, {
      immediate: !0
    });
    function f(y) {
      r == null || r.closeParents(y);
    }
    function v(y) {
      var w, m, A, x, k;
      if (!e.disabled)
        if (y.key === "Tab" || y.key === "Enter" && !e.closeOnContentClick) {
          if (y.key === "Enter" && (y.target instanceof HTMLTextAreaElement || y.target instanceof HTMLInputElement && y.target.closest("form"))) return;
          y.key === "Enter" && y.preventDefault(), es(za((w = u.value) == null ? void 0 : w.contentEl, !1), y.shiftKey ? "prev" : "next", (P) => P.tabIndex >= 0) || (a.value = !1, (A = (m = u.value) == null ? void 0 : m.activatorEl) == null || A.focus());
        } else e.submenu && y.key === (o.value ? "ArrowRight" : "ArrowLeft") && (a.value = !1, (k = (x = u.value) == null ? void 0 : x.activatorEl) == null || k.focus());
    }
    function g(y) {
      var m;
      if (e.disabled) return;
      const w = (m = u.value) == null ? void 0 : m.contentEl;
      w && a.value ? y.key === "ArrowDown" ? (y.preventDefault(), y.stopImmediatePropagation(), $a(w, "next")) : y.key === "ArrowUp" ? (y.preventDefault(), y.stopImmediatePropagation(), $a(w, "prev")) : e.submenu && (y.key === (o.value ? "ArrowRight" : "ArrowLeft") ? a.value = !1 : y.key === (o.value ? "ArrowLeft" : "ArrowRight") && (y.preventDefault(), $a(w, "first"))) : (e.submenu ? y.key === (o.value ? "ArrowLeft" : "ArrowRight") : ["ArrowDown", "ArrowUp"].includes(y.key)) && (a.value = !0, y.preventDefault(), setTimeout(() => setTimeout(() => g(y))));
    }
    const V = I(() => D({
      "aria-haspopup": "menu",
      "aria-expanded": String(a.value),
      "aria-controls": s.value,
      onKeydown: g
    }, e.activatorProps));
    return ie(() => {
      const y = ua.filterProps(e);
      return h(ua, D({
        ref: u,
        id: s.value,
        class: ["v-menu", e.class],
        style: e.style
      }, y, {
        modelValue: a.value,
        "onUpdate:modelValue": (w) => a.value = w,
        absolute: !0,
        activatorProps: V.value,
        location: e.location ?? (e.submenu ? "end" : "bottom"),
        "onClick:outside": f,
        onKeydown: v
      }, l), {
        activator: t.activator,
        default: function() {
          for (var w = arguments.length, m = new Array(w), A = 0; A < w; A++)
            m[A] = arguments[A];
          return h(Le, {
            root: "VMenu"
          }, {
            default: () => {
              var x;
              return [(x = t.default) == null ? void 0 : x.call(t, ...m)];
            }
          });
        }
      });
    }), pt({
      id: s,
      ΨopenChildren: c
    }, u);
  }
}), Xu = K({
  active: Boolean,
  disabled: Boolean,
  max: [Number, String],
  value: {
    type: [Number, String],
    default: 0
  },
  ...xe(),
  ...jt({
    transition: {
      component: mn
    }
  })
}, "VCounter"), vo = ne()({
  name: "VCounter",
  functional: !0,
  props: Xu(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = H(() => e.max ? `${e.value} / ${e.max}` : String(e.value));
    return ie(() => h(Sa, {
      transition: e.transition
    }, {
      default: () => [Ye(C("div", {
        class: me(["v-counter", {
          "text-error": e.max && !e.disabled && parseFloat(e.value) > parseFloat(e.max)
        }, e.class]),
        style: Ve(e.style)
      }, [t.default ? t.default({
        counter: a.value,
        max: e.max,
        value: e.value
      }) : a.value]), [[_t, e.active]])]
    })), {};
  }
}), Zu = K({
  floating: Boolean,
  ...xe()
}, "VFieldLabel"), Jt = ne()({
  name: "VFieldLabel",
  props: Zu(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    return ie(() => h(hl, {
      class: me(["v-field-label", {
        "v-field-label--floating": e.floating
      }, e.class]),
      style: Ve(e.style),
      "aria-hidden": e.floating || void 0
    }, t)), {};
  }
}), Qu = ["underlined", "outlined", "filled", "solo", "solo-inverted", "solo-filled", "plain"], Sl = K({
  appendInnerIcon: Se,
  bgColor: String,
  clearable: Boolean,
  clearIcon: {
    type: Se,
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
  glow: Boolean,
  error: Boolean,
  flat: Boolean,
  iconColor: [Boolean, String],
  label: String,
  persistentClear: Boolean,
  prependInnerIcon: Se,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {
    type: String,
    default: "filled",
    validator: (e) => Qu.includes(e)
  },
  "onClick:clear": Ze(),
  "onClick:appendInner": Ze(),
  "onClick:prependInner": Ze(),
  ...xe(),
  ...ul(),
  ...kt(),
  ...Ne()
}, "VField"), ca = ne()({
  name: "VField",
  inheritAttrs: !1,
  props: {
    id: String,
    ...uo(),
    ...Sl()
  },
  emits: {
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0
  },
  setup(e, n) {
    let {
      attrs: t,
      emit: a,
      slots: l
    } = n;
    const {
      themeClasses: o
    } = qe(e), {
      loaderClasses: i
    } = il(e), {
      focusClasses: s,
      isFocused: u,
      focus: r,
      blur: c
    } = Va(e), {
      InputIcon: d
    } = so(e), {
      roundedClasses: f
    } = $t(e), {
      rtlClasses: v
    } = ot(), g = H(() => e.dirty || e.active), V = H(() => !!(e.label || l.label)), y = H(() => !e.singleLine && V.value), w = ft(), m = I(() => e.id || `input-${w}`), A = H(() => `${m.value}-messages`), x = q(), k = q(), S = q(), P = I(() => ["plain", "underlined"].includes(e.variant)), b = I(() => e.error || e.disabled ? void 0 : g.value && u.value ? e.color : e.baseColor), $ = I(() => {
      if (!(!e.iconColor || e.glow && !u.value))
        return e.iconColor === !0 ? b.value : e.iconColor;
    }), {
      backgroundColorClasses: T,
      backgroundColorStyles: B
    } = dt(() => e.bgColor), {
      textColorClasses: L,
      textColorStyles: M
    } = Gt(b);
    J(g, (Y) => {
      if (y.value) {
        const te = x.value.$el, ae = k.value.$el;
        requestAnimationFrame(() => {
          const re = dl(te), _ = ae.getBoundingClientRect(), E = _.x - re.x, F = _.y - re.y - (re.height / 2 - _.height / 2), j = _.width / 0.75, be = Math.abs(j - re.width) > 1 ? {
            maxWidth: he(j)
          } : void 0, le = getComputedStyle(te), ue = getComputedStyle(ae), Z = parseFloat(le.transitionDuration) * 1e3 || 150, ce = parseFloat(ue.getPropertyValue("--v-field-label-scale")), ge = ue.getPropertyValue("color");
          te.style.visibility = "visible", ae.style.visibility = "hidden", wt(te, {
            transform: `translate(${E}px, ${F}px) scale(${ce})`,
            color: ge,
            ...be
          }, {
            duration: Z,
            easing: Rt,
            direction: Y ? "normal" : "reverse"
          }).finished.then(() => {
            te.style.removeProperty("visibility"), ae.style.removeProperty("visibility");
          });
        });
      }
    }, {
      flush: "post"
    });
    const W = I(() => ({
      isActive: g,
      isFocused: u,
      controlRef: S,
      blur: c,
      focus: r
    }));
    function U(Y) {
      Y.target !== document.activeElement && Y.preventDefault();
    }
    return ie(() => {
      var E, F, j;
      const Y = e.variant === "outlined", te = !!(l["prepend-inner"] || e.prependInnerIcon), ae = !!(e.clearable || l.clear) && !e.disabled, re = !!(l["append-inner"] || e.appendInnerIcon || ae), _ = () => l.label ? l.label({
        ...W.value,
        label: e.label,
        props: {
          for: m.value
        }
      }) : e.label;
      return C("div", D({
        class: ["v-field", {
          "v-field--active": g.value,
          "v-field--appended": re,
          "v-field--center-affix": e.centerAffix ?? !P.value,
          "v-field--disabled": e.disabled,
          "v-field--dirty": e.dirty,
          "v-field--error": e.error,
          "v-field--glow": e.glow,
          "v-field--flat": e.flat,
          "v-field--has-background": !!e.bgColor,
          "v-field--persistent-clear": e.persistentClear,
          "v-field--prepended": te,
          "v-field--reverse": e.reverse,
          "v-field--single-line": e.singleLine,
          "v-field--no-label": !_(),
          [`v-field--variant-${e.variant}`]: !0
        }, o.value, T.value, s.value, i.value, f.value, v.value, e.class],
        style: [B.value, e.style],
        onClick: U
      }, t), [C("div", {
        class: "v-field__overlay"
      }, null), h(sl, {
        name: "v-field",
        active: !!e.loading,
        color: e.error ? "error" : typeof e.loading == "string" ? e.loading : e.color
      }, {
        default: l.loader
      }), te && C("div", {
        key: "prepend",
        class: "v-field__prepend-inner"
      }, [e.prependInnerIcon && h(d, {
        key: "prepend-icon",
        name: "prependInner",
        color: $.value
      }, null), (E = l["prepend-inner"]) == null ? void 0 : E.call(l, W.value)]), C("div", {
        class: "v-field__field",
        "data-no-activator": ""
      }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(e.variant) && y.value && h(Jt, {
        key: "floating-label",
        ref: k,
        class: me([L.value]),
        floating: !0,
        for: m.value,
        style: Ve(M.value)
      }, {
        default: () => [_()]
      }), V.value && h(Jt, {
        key: "label",
        ref: x,
        for: m.value
      }, {
        default: () => [_()]
      }), ((F = l.default) == null ? void 0 : F.call(l, {
        ...W.value,
        props: {
          id: m.value,
          class: "v-field__input",
          "aria-describedby": A.value
        },
        focus: r,
        blur: c
      })) ?? C("div", {
        id: m.value,
        class: "v-field__input",
        "aria-describedby": A.value
      }, null)]), ae && h(yn, {
        key: "clear"
      }, {
        default: () => [Ye(C("div", {
          class: "v-field__clearable",
          onMousedown: (be) => {
            be.preventDefault(), be.stopPropagation();
          }
        }, [h(Le, {
          defaults: {
            VIcon: {
              icon: e.clearIcon
            }
          }
        }, {
          default: () => [l.clear ? l.clear({
            ...W.value,
            props: {
              onFocus: r,
              onBlur: c,
              onClick: e["onClick:clear"],
              tabindex: -1
            }
          }) : h(d, {
            name: "clear",
            onFocus: r,
            onBlur: c,
            tabindex: -1
          }, null)]
        })]), [[_t, e.dirty]])]
      }), re && C("div", {
        key: "append",
        class: "v-field__append-inner"
      }, [(j = l["append-inner"]) == null ? void 0 : j.call(l, W.value), e.appendInnerIcon && h(d, {
        key: "append-icon",
        name: "appendInner",
        color: $.value
      }, null)]), C("div", {
        class: me(["v-field__outline", L.value]),
        style: Ve(M.value)
      }, [Y && C(X, null, [C("div", {
        class: "v-field__outline__start"
      }, null), y.value && C("div", {
        class: "v-field__outline__notch"
      }, [h(Jt, {
        ref: k,
        floating: !0,
        for: m.value
      }, {
        default: () => [_()]
      })]), C("div", {
        class: "v-field__outline__end"
      }, null)]), P.value && y.value && h(Jt, {
        ref: k,
        floating: !0,
        for: m.value
      }, {
        default: () => [_()]
      })])]);
    }), {
      controlRef: S,
      fieldIconColor: $
    };
  }
}), Ju = ["color", "file", "time", "date", "datetime-local", "week", "month"], xl = K({
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
  ...Ca(),
  ...Sl()
}, "VTextField"), vt = ne()({
  name: "VTextField",
  directives: {
    vIntersect: la
  },
  inheritAttrs: !1,
  props: xl(),
  emits: {
    "click:control": (e) => !0,
    "mousedown:control": (e) => !0,
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0
  },
  setup(e, n) {
    let {
      attrs: t,
      emit: a,
      slots: l
    } = n;
    const o = we(e, "modelValue"), {
      isFocused: i,
      focus: s,
      blur: u
    } = Va(e), r = I(() => typeof e.counterValue == "function" ? e.counterValue(o.value) : typeof e.counterValue == "number" ? e.counterValue : (o.value ?? "").toString().length), c = I(() => {
      if (t.maxlength) return t.maxlength;
      if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string"))
        return e.counter;
    }), d = I(() => ["plain", "underlined"].includes(e.variant));
    function f(S, P) {
      var b, $;
      !e.autofocus || !S || ($ = (b = P[0].target) == null ? void 0 : b.focus) == null || $.call(b);
    }
    const v = q(), g = q(), V = q(), y = I(() => Ju.includes(e.type) || e.persistentPlaceholder || i.value || e.active);
    function w() {
      i.value || s(), Be(() => {
        var S;
        V.value !== document.activeElement && ((S = V.value) == null || S.focus());
      });
    }
    function m(S) {
      a("mousedown:control", S), S.target !== V.value && (w(), S.preventDefault());
    }
    function A(S) {
      a("click:control", S);
    }
    function x(S, P) {
      S.stopPropagation(), w(), Be(() => {
        o.value = null, P(), cl(e["onClick:clear"], S);
      });
    }
    function k(S) {
      var b;
      const P = S.target;
      if (o.value = P.value, (b = e.modelModifiers) != null && b.trim && ["text", "search", "password", "tel", "url"].includes(e.type)) {
        const $ = [P.selectionStart, P.selectionEnd];
        Be(() => {
          P.selectionStart = $[0], P.selectionEnd = $[1];
        });
      }
    }
    return ie(() => {
      const S = !!(l.counter || e.counter !== !1 && e.counter != null), P = !!(S || l.details), [b, $] = ka(t), {
        modelValue: T,
        ...B
      } = Tt.filterProps(e), L = ca.filterProps(e);
      return h(Tt, D({
        ref: v,
        modelValue: o.value,
        "onUpdate:modelValue": (M) => o.value = M,
        class: ["v-text-field", {
          "v-text-field--prefixed": e.prefix,
          "v-text-field--suffixed": e.suffix,
          "v-input--plain-underlined": d.value
        }, e.class],
        style: e.style
      }, b, B, {
        centerAffix: !d.value,
        focused: i.value
      }), {
        ...l,
        default: (M) => {
          let {
            id: W,
            isDisabled: U,
            isDirty: Y,
            isReadonly: te,
            isValid: ae,
            reset: re
          } = M;
          return h(ca, D({
            ref: g,
            onMousedown: m,
            onClick: A,
            "onClick:clear": (_) => x(_, re),
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"],
            role: e.role
          }, L, {
            id: W.value,
            active: y.value || Y.value,
            dirty: Y.value || e.dirty,
            disabled: U.value,
            focused: i.value,
            error: ae.value === !1
          }), {
            ...l,
            default: (_) => {
              let {
                props: {
                  class: E,
                  ...F
                }
              } = _;
              const j = Ye(C("input", D({
                ref: V,
                value: o.value,
                onInput: k,
                autofocus: e.autofocus,
                readonly: te.value,
                disabled: U.value,
                name: e.name,
                placeholder: e.placeholder,
                size: 1,
                type: e.type,
                onFocus: w,
                onBlur: u
              }, F, $), null), [[la, {
                handler: f
              }, null, {
                once: !0
              }]]);
              return C(X, null, [e.prefix && C("span", {
                class: "v-text-field__prefix"
              }, [C("span", {
                class: "v-text-field__prefix__text"
              }, [e.prefix])]), l.default ? C("div", {
                class: me(E),
                "data-no-activator": ""
              }, [l.default(), j]) : yi(j, {
                class: E
              }), e.suffix && C("span", {
                class: "v-text-field__suffix"
              }, [C("span", {
                class: "v-text-field__suffix__text"
              }, [e.suffix])])]);
            }
          });
        },
        details: P ? (M) => {
          var W;
          return C(X, null, [(W = l.details) == null ? void 0 : W.call(l, M), S && C(X, null, [C("span", null, null), h(vo, {
            active: e.persistentCounter || i.value,
            value: r.value,
            max: c.value,
            disabled: e.disabled
          }, l.counter)])]);
        } : void 0
      });
    }), pt({}, v, g, V);
  }
}), er = K({
  renderless: Boolean,
  ...xe()
}, "VVirtualScrollItem"), tr = ne()({
  name: "VVirtualScrollItem",
  inheritAttrs: !1,
  props: er(),
  emits: {
    "update:height": (e) => !0
  },
  setup(e, n) {
    let {
      attrs: t,
      emit: a,
      slots: l
    } = n;
    const {
      resizeRef: o,
      contentRect: i
    } = Pt(void 0, "border");
    J(() => {
      var s;
      return (s = i.value) == null ? void 0 : s.height;
    }, (s) => {
      s != null && a("update:height", s);
    }), ie(() => {
      var s, u;
      return e.renderless ? C(X, null, [(s = l.default) == null ? void 0 : s.call(l, {
        itemRef: o
      })]) : C("div", D({
        ref: o,
        class: ["v-virtual-scroll__item", e.class],
        style: e.style
      }, t), [(u = l.default) == null ? void 0 : u.call(l)]);
    });
  }
}), ar = -1, lr = 1, La = 100, nr = K({
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
function or(e, n) {
  const t = ht(), a = ee(0);
  et(() => {
    a.value = parseFloat(e.itemHeight || 0);
  });
  const l = ee(0), o = ee(Math.ceil(
    // Assume 16px items filling the entire screen height if
    // not provided. This is probably incorrect but it minimises
    // the chance of ending up with empty space at the bottom.
    // The default value is set here to avoid poisoning getSize()
    (parseInt(e.height) || t.height.value) / (a.value || 16)
  ) || 1), i = ee(0), s = ee(0), u = q(), r = q();
  let c = 0;
  const {
    resizeRef: d,
    contentRect: f
  } = Pt();
  et(() => {
    d.value = u.value;
  });
  const v = I(() => {
    var _;
    return u.value === document.documentElement ? t.height.value : ((_ = f.value) == null ? void 0 : _.height) || parseInt(e.height) || 0;
  }), g = I(() => !!(u.value && r.value && v.value && a.value));
  let V = Array.from({
    length: n.value.length
  }), y = Array.from({
    length: n.value.length
  });
  const w = ee(0);
  let m = -1;
  function A(_) {
    return V[_] || a.value;
  }
  const x = ts(() => {
    const _ = performance.now();
    y[0] = 0;
    const E = n.value.length;
    for (let F = 1; F <= E - 1; F++)
      y[F] = (y[F - 1] || 0) + A(F - 1);
    w.value = Math.max(w.value, performance.now() - _);
  }, w), k = J(g, (_) => {
    _ && (k(), c = r.value.offsetTop, x.immediate(), Y(), ~m && Be(() => {
      ze && window.requestAnimationFrame(() => {
        ae(m), m = -1;
      });
    }));
  });
  je(() => {
    x.clear();
  });
  function S(_, E) {
    const F = V[_], j = a.value;
    a.value = j ? Math.min(a.value, E) : E, (F !== E || j !== a.value) && (V[_] = E, x());
  }
  function P(_) {
    return _ = Je(_, 0, n.value.length - 1), y[_] || 0;
  }
  function b(_) {
    return ir(y, _);
  }
  let $ = 0, T = 0, B = 0;
  J(v, (_, E) => {
    E && (Y(), _ < E && requestAnimationFrame(() => {
      T = 0, Y();
    }));
  });
  let L = -1;
  function M() {
    if (!u.value || !r.value) return;
    const _ = u.value.scrollTop, E = performance.now();
    E - B > 500 ? (T = Math.sign(_ - $), c = r.value.offsetTop) : T = _ - $, $ = _, B = E, window.clearTimeout(L), L = window.setTimeout(W, 500), Y();
  }
  function W() {
    !u.value || !r.value || (T = 0, B = 0, window.clearTimeout(L), Y());
  }
  let U = -1;
  function Y() {
    cancelAnimationFrame(U), U = requestAnimationFrame(te);
  }
  function te() {
    if (!u.value || !v.value) return;
    const _ = $ - c, E = Math.sign(T), F = Math.max(0, _ - La), j = Je(b(F), 0, n.value.length), be = _ + v.value + La, le = Je(b(be) + 1, j + 1, n.value.length);
    if (
      // Only update the side we're scrolling towards,
      // the other side will be updated incidentally
      (E !== ar || j < l.value) && (E !== lr || le > o.value)
    ) {
      const ue = P(l.value) - P(j), Z = P(le) - P(o.value);
      Math.max(ue, Z) > La ? (l.value = j, o.value = le) : (j <= 0 && (l.value = j), le >= n.value.length && (o.value = le));
    }
    i.value = P(l.value), s.value = P(n.value.length) - P(o.value);
  }
  function ae(_) {
    const E = P(_);
    !u.value || _ && !E ? m = _ : u.value.scrollTop = E;
  }
  const re = I(() => n.value.slice(l.value, o.value).map((_, E) => {
    const F = E + l.value;
    return {
      raw: _,
      index: F,
      key: Ct(_, e.itemKey, F)
    };
  }));
  return J(n, () => {
    V = Array.from({
      length: n.value.length
    }), y = Array.from({
      length: n.value.length
    }), x.immediate(), Y();
  }, {
    deep: 1
  }), {
    calculateVisibleItems: Y,
    containerRef: u,
    markerRef: r,
    computedItems: re,
    paddingTop: i,
    paddingBottom: s,
    scrollToIndex: ae,
    handleScroll: M,
    handleScrollend: W,
    handleItemResize: S
  };
}
function ir(e, n) {
  let t = e.length - 1, a = 0, l = 0, o = null, i = -1;
  if (e[t] < n)
    return t;
  for (; a <= t; )
    if (l = a + t >> 1, o = e[l], o > n)
      t = l - 1;
    else if (o < n)
      i = l, a = l + 1;
    else return o === n ? l : a;
  return i;
}
const sr = K({
  items: {
    type: Array,
    default: () => []
  },
  renderless: Boolean,
  ...nr(),
  ...xe(),
  ...Ut()
}, "VVirtualScroll"), fo = ne()({
  name: "VVirtualScroll",
  props: sr(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = nt("VVirtualScroll"), {
      dimensionStyles: l
    } = Wt(e), {
      calculateVisibleItems: o,
      containerRef: i,
      markerRef: s,
      handleScroll: u,
      handleScrollend: r,
      handleItemResize: c,
      scrollToIndex: d,
      paddingTop: f,
      paddingBottom: v,
      computedItems: g
    } = or(e, H(() => e.items));
    return Xe(() => e.renderless, () => {
      function V() {
        var m, A;
        const w = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1) ? "addEventListener" : "removeEventListener";
        i.value === document.documentElement ? (document[w]("scroll", u, {
          passive: !0
        }), document[w]("scrollend", r)) : ((m = i.value) == null || m[w]("scroll", u, {
          passive: !0
        }), (A = i.value) == null || A[w]("scrollend", r));
      }
      We(() => {
        i.value = $n(a.vnode.el, !0), V(!0);
      }), je(V);
    }), ie(() => {
      const V = g.value.map((y) => h(tr, {
        key: y.key,
        renderless: e.renderless,
        "onUpdate:height": (w) => c(y.index, w)
      }, {
        default: (w) => {
          var m;
          return (m = t.default) == null ? void 0 : m.call(t, {
            item: y.raw,
            index: y.index,
            ...w
          });
        }
      }));
      return e.renderless ? C(X, null, [C("div", {
        ref: s,
        class: "v-virtual-scroll__spacer",
        style: {
          paddingTop: he(f.value)
        }
      }, null), V, C("div", {
        class: "v-virtual-scroll__spacer",
        style: {
          paddingBottom: he(v.value)
        }
      }, null)]) : C("div", {
        ref: i,
        class: me(["v-virtual-scroll", e.class]),
        onScrollPassive: u,
        onScrollend: r,
        style: Ve([l.value, e.style])
      }, [C("div", {
        ref: s,
        class: "v-virtual-scroll__container",
        style: {
          paddingTop: he(f.value),
          paddingBottom: he(v.value)
        }
      }, [V])]);
    }), {
      calculateVisibleItems: o,
      scrollToIndex: d
    };
  }
});
function mo(e, n) {
  const t = ee(!1);
  let a;
  function l(s) {
    cancelAnimationFrame(a), t.value = !0, a = requestAnimationFrame(() => {
      a = requestAnimationFrame(() => {
        t.value = !1;
      });
    });
  }
  async function o() {
    await new Promise((s) => requestAnimationFrame(s)), await new Promise((s) => requestAnimationFrame(s)), await new Promise((s) => requestAnimationFrame(s)), await new Promise((s) => {
      if (t.value) {
        const u = J(t, () => {
          u(), s();
        });
      } else s();
    });
  }
  async function i(s) {
    var c, d;
    if (s.key === "Tab" && ((c = n.value) == null || c.focus()), !["PageDown", "PageUp", "Home", "End"].includes(s.key)) return;
    const u = (d = e.value) == null ? void 0 : d.$el;
    if (!u) return;
    (s.key === "Home" || s.key === "End") && u.scrollTo({
      top: s.key === "Home" ? 0 : u.scrollHeight,
      behavior: "smooth"
    }), await o();
    const r = u.querySelectorAll(":scope > :not(.v-virtual-scroll__spacer)");
    if (s.key === "PageDown" || s.key === "Home") {
      const f = u.getBoundingClientRect().top;
      for (const v of r)
        if (v.getBoundingClientRect().top >= f) {
          v.focus();
          break;
        }
    } else {
      const f = u.getBoundingClientRect().bottom;
      for (const v of [...r].reverse())
        if (v.getBoundingClientRect().bottom <= f) {
          v.focus();
          break;
        }
    }
  }
  return {
    onScrollPassive: l,
    onKeydown: i
  };
}
const go = K({
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
    type: Se,
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
  ...zi({
    itemChildren: !1
  })
}, "Select"), ur = K({
  ...go(),
  ...bt(xl({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...jt({
    transition: {
      component: Rn
    }
  })
}, "VSelect"), kl = ne()({
  name: "VSelect",
  props: ur(),
  emits: {
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0,
    "update:menu": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const {
      t: a
    } = it(), l = q(), o = q(), i = q(), {
      items: s,
      transformIn: u,
      transformOut: r
    } = pn(e), c = we(e, "modelValue", [], (_) => u(_ === null ? [null] : He(_)), (_) => {
      const E = r(_);
      return e.multiple ? E : E[0] ?? null;
    }), d = I(() => typeof e.counterValue == "function" ? e.counterValue(c.value) : typeof e.counterValue == "number" ? e.counterValue : c.value.length), f = bl(e), v = I(() => c.value.map((_) => _.value)), g = ee(!1);
    let V = "", y = -1, w;
    const m = I(() => e.hideSelected ? s.value.filter((_) => !c.value.some((E) => (e.valueComparator || ut)(E, _))) : s.value), A = I(() => e.hideNoData && !m.value.length || f.isReadonly.value || f.isDisabled.value), x = we(e, "menu"), k = I({
      get: () => x.value,
      set: (_) => {
        var E;
        x.value && !_ && ((E = o.value) != null && E.ΨopenChildren.size) || _ && A.value || (x.value = _);
      }
    }), S = H(() => k.value ? e.closeText : e.openText), P = I(() => {
      var _;
      return {
        ...e.menuProps,
        activatorProps: {
          ...((_ = e.menuProps) == null ? void 0 : _.activatorProps) || {},
          "aria-haspopup": "listbox"
          // Set aria-haspopup to 'listbox'
        }
      };
    }), b = q(), $ = mo(b, l);
    function T(_) {
      e.openOnClear && (k.value = !0);
    }
    function B() {
      A.value || (k.value = !k.value);
    }
    function L(_) {
      na(_) && M(_);
    }
    function M(_) {
      var ge, N, Q;
      if (!_.key || f.isReadonly.value) return;
      ["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(_.key) && _.preventDefault(), ["Enter", "ArrowDown", " "].includes(_.key) && (k.value = !0), ["Escape", "Tab"].includes(_.key) && (k.value = !1), _.key === "Home" ? (ge = b.value) == null || ge.focus("first") : _.key === "End" && ((N = b.value) == null || N.focus("last"));
      const E = 1e3;
      if (!na(_)) return;
      const F = performance.now();
      F - w > E && (V = "", y = -1), V += _.key.toLowerCase(), w = F;
      const j = m.value;
      function be() {
        let de = le();
        return de || V.at(-1) === V.at(-2) && (V = V.slice(0, -1), de = le(), de) || (y = -1, de = le(), de) ? de : (V = _.key.toLowerCase(), le());
      }
      function le() {
        for (let de = y + 1; de < j.length; de++) {
          const ye = j[de];
          if (ye.title.toLowerCase().startsWith(V))
            return [ye, de];
        }
      }
      const ue = be();
      if (!ue) return;
      const [Z, ce] = ue;
      y = ce, (Q = b.value) == null || Q.focus(ce), e.multiple || (c.value = [Z]);
    }
    function W(_) {
      let E = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!_.props.disabled)
        if (e.multiple) {
          const F = c.value.findIndex((be) => (e.valueComparator || ut)(be.value, _.value)), j = E ?? !~F;
          if (~F) {
            const be = j ? [...c.value, _] : [...c.value];
            be.splice(F, 1), c.value = be;
          } else j && (c.value = [...c.value, _]);
        } else {
          const F = E !== !1;
          c.value = F ? [_] : [], Be(() => {
            k.value = !1;
          });
        }
    }
    function U(_) {
      var E;
      (E = b.value) != null && E.$el.contains(_.relatedTarget) || (k.value = !1);
    }
    function Y() {
      var _;
      e.eager && ((_ = i.value) == null || _.calculateVisibleItems());
    }
    function te() {
      var _;
      g.value && ((_ = l.value) == null || _.focus());
    }
    function ae(_) {
      g.value = !0;
    }
    function re(_) {
      if (_ == null) c.value = [];
      else if (At(l.value, ":autofill") || At(l.value, ":-webkit-autofill")) {
        const E = s.value.find((F) => F.title === _);
        E && W(E);
      } else l.value && (l.value.value = "");
    }
    return J(k, () => {
      if (!e.hideSelected && k.value && c.value.length) {
        const _ = m.value.findIndex((E) => c.value.some((F) => (e.valueComparator || ut)(F.value, E.value)));
        ze && window.requestAnimationFrame(() => {
          var E;
          _ >= 0 && ((E = i.value) == null || E.scrollToIndex(_));
        });
      }
    }), J(() => e.items, (_, E) => {
      k.value || g.value && !E.length && _.length && (k.value = !0);
    }), ie(() => {
      const _ = !!(e.chips || t.chip), E = !!(!e.hideNoData || m.value.length || t["prepend-item"] || t["append-item"] || t["no-data"]), F = c.value.length > 0, j = vt.filterProps(e), be = F || !g.value && e.label && !e.persistentPlaceholder ? void 0 : e.placeholder;
      return h(vt, D({
        ref: l
      }, j, {
        modelValue: c.value.map((le) => le.props.value).join(", "),
        "onUpdate:modelValue": re,
        focused: g.value,
        "onUpdate:focused": (le) => g.value = le,
        validationValue: c.externalValue,
        counterValue: d.value,
        dirty: F,
        class: ["v-select", {
          "v-select--active-menu": k.value,
          "v-select--chips": !!e.chips,
          [`v-select--${e.multiple ? "multiple" : "single"}`]: !0,
          "v-select--selected": c.value.length,
          "v-select--selection-slot": !!t.selection
        }, e.class],
        style: e.style,
        inputmode: "none",
        placeholder: be,
        "onClick:clear": T,
        "onMousedown:control": B,
        onBlur: U,
        onKeydown: M,
        "aria-label": a(S.value),
        title: a(S.value)
      }), {
        ...t,
        default: () => C(X, null, [h(wl, D({
          ref: o,
          modelValue: k.value,
          "onUpdate:modelValue": (le) => k.value = le,
          activator: "parent",
          contentClass: "v-select__content",
          disabled: A.value,
          eager: e.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: e.transition,
          onAfterEnter: Y,
          onAfterLeave: te
        }, P.value), {
          default: () => [E && h(rt, D({
            ref: b,
            selected: v.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: (le) => le.preventDefault(),
            onKeydown: L,
            onFocusin: ae,
            tabindex: "-1",
            "aria-live": "polite",
            "aria-label": `${e.label}-list`,
            color: e.itemColor ?? e.color
          }, $, e.listProps), {
            default: () => {
              var le, ue, Z;
              return [(le = t["prepend-item"]) == null ? void 0 : le.call(t), !m.value.length && !e.hideNoData && (((ue = t["no-data"]) == null ? void 0 : ue.call(t)) ?? h(Ge, {
                key: "no-data",
                title: a(e.noDataText)
              }, null)), h(fo, {
                ref: i,
                renderless: !0,
                items: m.value,
                itemKey: "value"
              }, {
                default: (ce) => {
                  var Ce;
                  let {
                    item: ge,
                    index: N,
                    itemRef: Q
                  } = ce;
                  const de = as(ge.props), ye = D(ge.props, {
                    ref: Q,
                    key: ge.value,
                    onClick: () => W(ge, null)
                  });
                  return ((Ce = t.item) == null ? void 0 : Ce.call(t, {
                    item: ge,
                    index: N,
                    props: ye
                  })) ?? h(Ge, D(ye, {
                    role: "option"
                  }), {
                    prepend: (Ee) => {
                      let {
                        isSelected: De
                      } = Ee;
                      return C(X, null, [e.multiple && !e.hideSelected ? h(xt, {
                        key: ge.value,
                        modelValue: De,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, de.prependAvatar && h(St, {
                        image: de.prependAvatar
                      }, null), de.prependIcon && h(ke, {
                        icon: de.prependIcon
                      }, null)]);
                    }
                  });
                }
              }), (Z = t["append-item"]) == null ? void 0 : Z.call(t)];
            }
          })]
        }), c.value.map((le, ue) => {
          function Z(Q) {
            Q.stopPropagation(), Q.preventDefault(), W(le, !1);
          }
          const ce = {
            "onClick:close": Z,
            onKeydown(Q) {
              Q.key !== "Enter" && Q.key !== " " || (Q.preventDefault(), Q.stopPropagation(), Z(Q));
            },
            onMousedown(Q) {
              Q.preventDefault(), Q.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, ge = _ ? !!t.chip : !!t.selection, N = ge ? An(_ ? t.chip({
            item: le,
            index: ue,
            props: ce
          }) : t.selection({
            item: le,
            index: ue
          })) : void 0;
          if (!(ge && !N))
            return C("div", {
              key: le.value,
              class: "v-select__selection"
            }, [_ ? t.chip ? h(Le, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: e.closableChips,
                  size: "small",
                  text: le.title
                }
              }
            }, {
              default: () => [N]
            }) : h(pl, D({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: le.title,
              disabled: le.props.disabled
            }, ce), null) : N ?? C("span", {
              class: "v-select__selection-text"
            }, [le.title, e.multiple && ue < c.value.length - 1 && C("span", {
              class: "v-select__selection-comma"
            }, [Pe(",")])])]);
        })]),
        "append-inner": function() {
          var ce, ge;
          for (var le = arguments.length, ue = new Array(le), Z = 0; Z < le; Z++)
            ue[Z] = arguments[Z];
          return C(X, null, [(ce = t["append-inner"]) == null ? void 0 : ce.call(t, ...ue), e.menuIcon ? h(ke, {
            class: "v-select__menu-icon",
            color: (ge = l.value) == null ? void 0 : ge.fieldIconColor,
            icon: e.menuIcon
          }, null) : void 0]);
        }
      });
    }), pt({
      isFocused: g,
      menu: k,
      select: W
    }, l);
  }
}), rr = (e, n, t) => {
  if (e == null || n == null) return -1;
  if (!n.length) return 0;
  e = e.toString().toLocaleLowerCase(), n = n.toString().toLocaleLowerCase();
  const a = [];
  let l = e.indexOf(n);
  for (; ~l; )
    a.push([l, l + n.length]), l = e.indexOf(n, l + n.length);
  return a.length ? a : -1;
};
function Da(e, n) {
  if (!(e == null || typeof e == "boolean" || e === -1))
    return typeof e == "number" ? [[e, e + n.length]] : Array.isArray(e[0]) ? e : [e];
}
const yo = K({
  customFilter: Function,
  customKeyFilter: Object,
  filterKeys: [Array, String],
  filterMode: {
    type: String,
    default: "intersection"
  },
  noFilter: Boolean
}, "filter");
function cr(e, n, t) {
  var s;
  const a = [], l = (t == null ? void 0 : t.default) ?? rr, o = t != null && t.filterKeys ? He(t.filterKeys) : !1, i = Object.keys((t == null ? void 0 : t.customKeyFilter) ?? {}).length;
  if (!(e != null && e.length)) return a;
  e: for (let u = 0; u < e.length; u++) {
    const [r, c = r] = He(e[u]), d = {}, f = {};
    let v = -1;
    if ((n || i > 0) && !(t != null && t.noFilter)) {
      if (typeof r == "object") {
        const y = o || Object.keys(c);
        for (const w of y) {
          const m = Ct(c, w), A = (s = t == null ? void 0 : t.customKeyFilter) == null ? void 0 : s[w];
          if (v = A ? A(m, n, r) : l(m, n, r), v !== -1 && v !== !1)
            A ? d[w] = Da(v, n) : f[w] = Da(v, n);
          else if ((t == null ? void 0 : t.filterMode) === "every")
            continue e;
        }
      } else
        v = l(r, n, r), v !== -1 && v !== !1 && (f.title = Da(v, n));
      const g = Object.keys(f).length, V = Object.keys(d).length;
      if (!g && !V || (t == null ? void 0 : t.filterMode) === "union" && V !== i && !g || (t == null ? void 0 : t.filterMode) === "intersection" && (V !== i || !g)) continue;
    }
    a.push({
      index: u,
      matches: {
        ...f,
        ...d
      }
    });
  }
  return a;
}
function ho(e, n, t, a) {
  const l = ee([]), o = ee(/* @__PURE__ */ new Map()), i = I(() => a != null && a.transform ? p(n).map((u) => [u, a.transform(u)]) : p(n));
  et(() => {
    const u = typeof t == "function" ? t() : p(t), r = typeof u != "string" && typeof u != "number" ? "" : String(u), c = cr(i.value, r, {
      customKeyFilter: {
        ...e.customKeyFilter,
        ...p(a == null ? void 0 : a.customKeyFilter)
      },
      default: e.customFilter,
      filterKeys: e.filterKeys,
      filterMode: e.filterMode,
      noFilter: e.noFilter
    }), d = p(n), f = [], v = /* @__PURE__ */ new Map();
    c.forEach((g) => {
      let {
        index: V,
        matches: y
      } = g;
      const w = d[V];
      f.push(w), v.set(w.value, y);
    }), l.value = f, o.value = v;
  });
  function s(u) {
    return o.value.get(u.value);
  }
  return {
    filteredItems: l,
    filteredMatches: o,
    getMatches: s
  };
}
function dr(e, n, t) {
  return t == null || !t.length ? n : t.map((a, l) => {
    const o = l === 0 ? 0 : t[l - 1][1], i = [C("span", {
      class: me(`${e}__unmask`)
    }, [n.slice(o, a[0])]), C("span", {
      class: me(`${e}__mask`)
    }, [n.slice(a[0], a[1])])];
    return l === t.length - 1 && i.push(C("span", {
      class: me(`${e}__unmask`)
    }, [n.slice(a[1])])), C(X, null, [i]);
  });
}
const vr = K({
  autoSelectFirst: {
    type: [Boolean, String]
  },
  clearOnSelect: Boolean,
  search: String,
  ...yo({
    filterKeys: ["title"]
  }),
  ...go(),
  ...bt(xl({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...jt({
    transition: !1
  })
}, "VAutocomplete"), fr = ne()({
  name: "VAutocomplete",
  props: vr(),
  emits: {
    "update:focused": (e) => !0,
    "update:search": (e) => !0,
    "update:modelValue": (e) => !0,
    "update:menu": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const {
      t: a
    } = it(), l = q(), o = ee(!1), i = ee(!0), s = ee(!1), u = q(), r = q(), c = ee(-1), {
      items: d,
      transformIn: f,
      transformOut: v
    } = pn(e), {
      textColorClasses: g,
      textColorStyles: V
    } = Gt(() => {
      var N;
      return (N = l.value) == null ? void 0 : N.color;
    }), y = we(e, "search", ""), w = we(e, "modelValue", [], (N) => f(N === null ? [null] : He(N)), (N) => {
      const Q = v(N);
      return e.multiple ? Q : Q[0] ?? null;
    }), m = I(() => typeof e.counterValue == "function" ? e.counterValue(w.value) : typeof e.counterValue == "number" ? e.counterValue : w.value.length), A = bl(e), {
      filteredItems: x,
      getMatches: k
    } = ho(e, d, () => i.value ? "" : y.value), S = I(() => e.hideSelected ? x.value.filter((N) => !w.value.some((Q) => Q.value === N.value)) : x.value), P = I(() => !!(e.chips || t.chip)), b = I(() => P.value || !!t.selection), $ = I(() => w.value.map((N) => N.props.value)), T = I(() => {
      var Q;
      return (e.autoSelectFirst === !0 || e.autoSelectFirst === "exact" && y.value === ((Q = S.value[0]) == null ? void 0 : Q.title)) && S.value.length > 0 && !i.value && !s.value;
    }), B = I(() => e.hideNoData && !S.value.length || A.isReadonly.value || A.isDisabled.value), L = we(e, "menu"), M = I({
      get: () => L.value,
      set: (N) => {
        var Q;
        L.value && !N && ((Q = u.value) != null && Q.ΨopenChildren.size) || N && B.value || (L.value = N);
      }
    }), W = I(() => M.value ? e.closeText : e.openText), U = q(), Y = mo(U, l);
    function te(N) {
      e.openOnClear && (M.value = !0), y.value = "";
    }
    function ae() {
      B.value || (M.value = !0);
    }
    function re(N) {
      B.value || (o.value && (N.preventDefault(), N.stopPropagation()), M.value = !M.value);
    }
    function _(N) {
      var Q;
      N.key !== " " && na(N) && ((Q = l.value) == null || Q.focus());
    }
    function E(N) {
      var ye, Ce, Ee, De, Te;
      if (A.isReadonly.value) return;
      const Q = (ye = l.value) == null ? void 0 : ye.selectionStart, de = w.value.length;
      if (["Enter", "ArrowDown", "ArrowUp"].includes(N.key) && N.preventDefault(), ["Enter", "ArrowDown"].includes(N.key) && (M.value = !0), ["Escape"].includes(N.key) && (M.value = !1), T.value && ["Enter", "Tab"].includes(N.key) && !w.value.some((Re) => {
        let {
          value: Oe
        } = Re;
        return Oe === S.value[0].value;
      }) && ge(S.value[0]), N.key === "ArrowDown" && T.value && ((Ce = U.value) == null || Ce.focus("next")), ["Backspace", "Delete"].includes(N.key)) {
        if (!e.multiple && b.value && w.value.length > 0 && !y.value) return ge(w.value[0], !1);
        if (~c.value) {
          N.preventDefault();
          const Re = c.value;
          ge(w.value[c.value], !1), c.value = Re >= de - 1 ? de - 2 : Re;
        } else N.key === "Backspace" && !y.value && (c.value = de - 1);
        return;
      }
      if (e.multiple)
        if (N.key === "ArrowLeft") {
          if (c.value < 0 && Q && Q > 0) return;
          const Re = c.value > -1 ? c.value - 1 : de - 1;
          if (w.value[Re])
            c.value = Re;
          else {
            const Oe = ((Ee = y.value) == null ? void 0 : Ee.length) ?? null;
            c.value = -1, (De = l.value) == null || De.setSelectionRange(Oe, Oe);
          }
        } else if (N.key === "ArrowRight") {
          if (c.value < 0) return;
          const Re = c.value + 1;
          w.value[Re] ? c.value = Re : (c.value = -1, (Te = l.value) == null || Te.setSelectionRange(0, 0));
        } else ~c.value && na(N) && (c.value = -1);
    }
    function F(N) {
      if (At(l.value, ":autofill") || At(l.value, ":-webkit-autofill")) {
        const Q = d.value.find((de) => de.title === N.target.value);
        Q && ge(Q);
      }
    }
    function j() {
      var N;
      e.eager && ((N = r.value) == null || N.calculateVisibleItems());
    }
    function be() {
      var N;
      o.value && (i.value = !0, (N = l.value) == null || N.focus());
    }
    function le(N) {
      o.value = !0, setTimeout(() => {
        s.value = !0;
      });
    }
    function ue(N) {
      s.value = !1;
    }
    function Z(N) {
      (N == null || N === "" && !e.multiple && !b.value) && (w.value = []);
    }
    const ce = ee(!1);
    function ge(N) {
      let Q = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!(!N || N.props.disabled))
        if (e.multiple) {
          const de = w.value.findIndex((Ce) => (e.valueComparator || ut)(Ce.value, N.value)), ye = Q ?? !~de;
          if (~de) {
            const Ce = ye ? [...w.value, N] : [...w.value];
            Ce.splice(de, 1), w.value = Ce;
          } else ye && (w.value = [...w.value, N]);
          e.clearOnSelect && (y.value = "");
        } else {
          const de = Q !== !1;
          w.value = de ? [N] : [], y.value = de && !b.value ? N.title : "", Be(() => {
            M.value = !1, i.value = !0;
          });
        }
    }
    return J(o, (N, Q) => {
      var de;
      N !== Q && (N ? (ce.value = !0, y.value = e.multiple || b.value ? "" : String(((de = w.value.at(-1)) == null ? void 0 : de.props.title) ?? ""), i.value = !0, Be(() => ce.value = !1)) : (!e.multiple && y.value == null && (w.value = []), M.value = !1, (e.multiple || b.value) && (y.value = ""), c.value = -1));
    }), J(y, (N) => {
      !o.value || ce.value || (N && (M.value = !0), i.value = !N);
    }), J(M, () => {
      if (!e.hideSelected && M.value && w.value.length) {
        const N = S.value.findIndex((Q) => w.value.some((de) => Q.value === de.value));
        ze && window.requestAnimationFrame(() => {
          var Q;
          N >= 0 && ((Q = r.value) == null || Q.scrollToIndex(N));
        });
      }
    }), J(() => e.items, (N, Q) => {
      M.value || o.value && !Q.length && N.length && (M.value = !0);
    }), ie(() => {
      const N = !!(!e.hideNoData || S.value.length || t["prepend-item"] || t["append-item"] || t["no-data"]), Q = w.value.length > 0, de = vt.filterProps(e);
      return h(vt, D({
        ref: l
      }, de, {
        modelValue: y.value,
        "onUpdate:modelValue": [(ye) => y.value = ye, Z],
        focused: o.value,
        "onUpdate:focused": (ye) => o.value = ye,
        validationValue: w.externalValue,
        counterValue: m.value,
        dirty: Q,
        onChange: F,
        class: ["v-autocomplete", `v-autocomplete--${e.multiple ? "multiple" : "single"}`, {
          "v-autocomplete--active-menu": M.value,
          "v-autocomplete--chips": !!e.chips,
          "v-autocomplete--selection-slot": !!b.value,
          "v-autocomplete--selecting-index": c.value > -1
        }, e.class],
        style: e.style,
        readonly: A.isReadonly.value,
        placeholder: Q ? void 0 : e.placeholder,
        "onClick:clear": te,
        "onMousedown:control": ae,
        onKeydown: E
      }), {
        ...t,
        default: () => C(X, null, [h(wl, D({
          ref: u,
          modelValue: M.value,
          "onUpdate:modelValue": (ye) => M.value = ye,
          activator: "parent",
          contentClass: "v-autocomplete__content",
          disabled: B.value,
          eager: e.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: e.transition,
          onAfterEnter: j,
          onAfterLeave: be
        }, e.menuProps), {
          default: () => [N && h(rt, D({
            ref: U,
            selected: $.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: (ye) => ye.preventDefault(),
            onKeydown: _,
            onFocusin: le,
            onFocusout: ue,
            tabindex: "-1",
            "aria-live": "polite",
            color: e.itemColor ?? e.color
          }, Y, e.listProps), {
            default: () => {
              var ye, Ce, Ee;
              return [(ye = t["prepend-item"]) == null ? void 0 : ye.call(t), !S.value.length && !e.hideNoData && (((Ce = t["no-data"]) == null ? void 0 : Ce.call(t)) ?? h(Ge, {
                key: "no-data",
                title: a(e.noDataText)
              }, null)), h(fo, {
                ref: r,
                renderless: !0,
                items: S.value,
                itemKey: "value"
              }, {
                default: (De) => {
                  var Al;
                  let {
                    item: Te,
                    index: Re,
                    itemRef: Oe
                  } = De;
                  const Il = D(Te.props, {
                    ref: Oe,
                    key: Te.value,
                    active: T.value && Re === 0 ? !0 : void 0,
                    onClick: () => ge(Te, null)
                  });
                  return ((Al = t.item) == null ? void 0 : Al.call(t, {
                    item: Te,
                    index: Re,
                    props: Il
                  })) ?? h(Ge, D(Il, {
                    role: "option"
                  }), {
                    prepend: (Xt) => {
                      let {
                        isSelected: ui
                      } = Xt;
                      return C(X, null, [e.multiple && !e.hideSelected ? h(xt, {
                        key: Te.value,
                        modelValue: ui,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, Te.props.prependAvatar && h(St, {
                        image: Te.props.prependAvatar
                      }, null), Te.props.prependIcon && h(ke, {
                        icon: Te.props.prependIcon
                      }, null)]);
                    },
                    title: () => {
                      var Xt;
                      return i.value ? Te.title : dr("v-autocomplete", Te.title, (Xt = k(Te)) == null ? void 0 : Xt.title);
                    }
                  });
                }
              }), (Ee = t["append-item"]) == null ? void 0 : Ee.call(t)];
            }
          })]
        }), w.value.map((ye, Ce) => {
          function Ee(Oe) {
            Oe.stopPropagation(), Oe.preventDefault(), ge(ye, !1);
          }
          const De = {
            "onClick:close": Ee,
            onKeydown(Oe) {
              Oe.key !== "Enter" && Oe.key !== " " || (Oe.preventDefault(), Oe.stopPropagation(), Ee(Oe));
            },
            onMousedown(Oe) {
              Oe.preventDefault(), Oe.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, Te = P.value ? !!t.chip : !!t.selection, Re = Te ? An(P.value ? t.chip({
            item: ye,
            index: Ce,
            props: De
          }) : t.selection({
            item: ye,
            index: Ce
          })) : void 0;
          if (!(Te && !Re))
            return C("div", {
              key: ye.value,
              class: me(["v-autocomplete__selection", Ce === c.value && ["v-autocomplete__selection--selected", g.value]]),
              style: Ve(Ce === c.value ? V.value : {})
            }, [P.value ? t.chip ? h(Le, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: e.closableChips,
                  size: "small",
                  text: ye.title
                }
              }
            }, {
              default: () => [Re]
            }) : h(pl, D({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: ye.title,
              disabled: ye.props.disabled
            }, De), null) : Re ?? C("span", {
              class: "v-autocomplete__selection-text"
            }, [ye.title, e.multiple && Ce < w.value.length - 1 && C("span", {
              class: "v-autocomplete__selection-comma"
            }, [Pe(",")])])]);
        })]),
        "append-inner": function() {
          var De, Te;
          for (var ye = arguments.length, Ce = new Array(ye), Ee = 0; Ee < ye; Ee++)
            Ce[Ee] = arguments[Ee];
          return C(X, null, [(De = t["append-inner"]) == null ? void 0 : De.call(t, ...Ce), e.menuIcon ? h(ke, {
            class: "v-autocomplete__menu-icon",
            color: (Te = l.value) == null ? void 0 : Te.fieldIconColor,
            icon: e.menuIcon,
            onMousedown: re,
            onClick: ls,
            "aria-label": a(W.value),
            title: a(W.value),
            tabindex: "-1"
          }, null) : void 0]);
        }
      });
    }), pt({
      isFocused: o,
      isPristine: i,
      menu: M,
      search: y,
      filteredItems: x,
      select: ge
    }, l);
  }
}), mr = ["name", "value"], gr = /* @__PURE__ */ Fe({
  __name: "OxAutocomplete",
  props: /* @__PURE__ */ ya({
    repo: {},
    lookup: { default: "search" },
    name: {},
    filters: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e, { expose: n }) {
    const t = lt(), a = ha(e, "modelValue"), l = q(""), o = e, i = gt(), s = ve("repos"), { state: u, query: r, fetch: c } = Pi(o.repo, s, { save: !1 }), d = Qe([]), f = q([]);
    async function v(m) {
      const A = m && g(m);
      if (A != null && A.length) {
        const x = await c({ id: A });
        d.splice(0, 0, ...x.entities);
      }
      V(m);
    }
    function g(m) {
      if (!Array.isArray(m))
        return d.findIndex((x) => x.id == m) == -1 ? [m] : null;
      const A = new Set(d.map((x) => x.id));
      return m.filter((x) => !A.has(x));
    }
    function V(m) {
      Array.isArray(m) ? f.value = d.filter((A) => m.includes(A.id)) : m ? f.value = [d.find((A) => A.id == m)] : f.value = [];
    }
    let y = null;
    const w = Wa.debounce(async ({ reset: m = !1 } = {}) => {
      if (u.isProcessing)
        return;
      const A = l.value != "<empty string>" && l.value || "";
      if (!m && A == y)
        return;
      y = A;
      const x = { ...o.filters, page_size: 20 };
      x[o.lookup] = A;
      let k = await c({ params: x });
      const S = f.value ? Wa.unionBy(k.entities, f.value, (P) => P.id) : k.entities;
      d.splice(0, d.length, ...S), m || (l.value = A);
    }, 500);
    return We(async () => {
      await w(), a.value && await v(a.value);
    }), J(() => o.filters, Ii(() => w({ reset: !0 }))), J(l, (m) => {
      m != "<empty string>" && m != y && w({ q: m });
    }), J(a, (m, A) => {
      m != A && V(m);
    }), n({ value: a, selected: f, load: w, items: d }), (m, A) => (R(), fe(X, null, [
      o.name ? (R(), fe("input", {
        key: 0,
        type: "hidden",
        name: o.name,
        value: a.value
      }, null, 8, mr)) : se("", !0),
      h(p(fr), D(p(i), {
        items: d,
        loading: p(u).isProcessing,
        modelValue: a.value,
        "onUpdate:modelValue": A[0] || (A[0] = (x) => a.value = x),
        search: l.value,
        "onUpdate:search": A[1] || (A[1] = (x) => l.value = x)
      }), st({ _: 2 }, [
        Ae(p(t), (x, k) => ({
          name: k,
          fn: O((S) => [
            z(m.$slots, k, _e($e(S)))
          ])
        }))
      ]), 1040, ["items", "loading", "modelValue", "search"])
    ], 64));
  }
}), yr = {
  props: {
    src: String,
    is: String
  },
  setup(e) {
    const n = ee(null), t = I(() => {
      if (e.is)
        return e.is;
      let l = e.src.substring(e.src.lastIndexOf("/") + 1);
      if (l && (l = l.substring(0, l.indexOf("."))), !l)
        throw Error(
          "`is` not provided and could not be deducted from `src`."
        );
      return l;
    });
    function a() {
      n.value = Ai(e.src, t.value);
    }
    return J(() => e.src, a), a(), () => hi(n.value, e);
  }
}, hr = K({
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
  ...Ca(),
  ...Sl()
}, "VTextarea"), br = ne()({
  name: "VTextarea",
  directives: {
    vIntersect: la
  },
  inheritAttrs: !1,
  props: hr(),
  emits: {
    "click:control": (e) => !0,
    "mousedown:control": (e) => !0,
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0
  },
  setup(e, n) {
    let {
      attrs: t,
      emit: a,
      slots: l
    } = n;
    const o = we(e, "modelValue"), {
      isFocused: i,
      focus: s,
      blur: u
    } = Va(e), r = I(() => typeof e.counterValue == "function" ? e.counterValue(o.value) : (o.value || "").toString().length), c = I(() => {
      if (t.maxlength) return t.maxlength;
      if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string"))
        return e.counter;
    });
    function d(B, L) {
      var M, W;
      !e.autofocus || !B || (W = (M = L[0].target) == null ? void 0 : M.focus) == null || W.call(M);
    }
    const f = q(), v = q(), g = ee(""), V = q(), y = I(() => e.persistentPlaceholder || i.value || e.active);
    function w() {
      var B;
      V.value !== document.activeElement && ((B = V.value) == null || B.focus()), i.value || s();
    }
    function m(B) {
      w(), a("click:control", B);
    }
    function A(B) {
      a("mousedown:control", B);
    }
    function x(B) {
      B.stopPropagation(), w(), Be(() => {
        o.value = "", cl(e["onClick:clear"], B);
      });
    }
    function k(B) {
      var M;
      const L = B.target;
      if (o.value = L.value, (M = e.modelModifiers) != null && M.trim) {
        const W = [L.selectionStart, L.selectionEnd];
        Be(() => {
          L.selectionStart = W[0], L.selectionEnd = W[1];
        });
      }
    }
    const S = q(), P = q(Number(e.rows)), b = I(() => ["plain", "underlined"].includes(e.variant));
    et(() => {
      e.autoGrow || (P.value = Number(e.rows));
    });
    function $() {
      e.autoGrow && Be(() => {
        if (!S.value || !v.value) return;
        const B = getComputedStyle(S.value), L = getComputedStyle(v.value.$el), M = parseFloat(B.getPropertyValue("--v-field-padding-top")) + parseFloat(B.getPropertyValue("--v-input-padding-top")) + parseFloat(B.getPropertyValue("--v-field-padding-bottom")), W = S.value.scrollHeight, U = parseFloat(B.lineHeight), Y = Math.max(parseFloat(e.rows) * U + M, parseFloat(L.getPropertyValue("--v-input-control-height"))), te = parseFloat(e.maxRows) * U + M || 1 / 0, ae = Je(W ?? 0, Y, te);
        P.value = Math.floor((ae - M) / U), g.value = he(ae);
      });
    }
    We($), J(o, $), J(() => e.rows, $), J(() => e.maxRows, $), J(() => e.density, $);
    let T;
    return J(S, (B) => {
      B ? (T = new ResizeObserver($), T.observe(S.value)) : T == null || T.disconnect();
    }), mt(() => {
      T == null || T.disconnect();
    }), ie(() => {
      const B = !!(l.counter || e.counter || e.counterValue), L = !!(B || l.details), [M, W] = ka(t), {
        modelValue: U,
        ...Y
      } = Tt.filterProps(e), te = ca.filterProps(e);
      return h(Tt, D({
        ref: f,
        modelValue: o.value,
        "onUpdate:modelValue": (ae) => o.value = ae,
        class: ["v-textarea v-text-field", {
          "v-textarea--prefixed": e.prefix,
          "v-textarea--suffixed": e.suffix,
          "v-text-field--prefixed": e.prefix,
          "v-text-field--suffixed": e.suffix,
          "v-textarea--auto-grow": e.autoGrow,
          "v-textarea--no-resize": e.noResize || e.autoGrow,
          "v-input--plain-underlined": b.value
        }, e.class],
        style: e.style
      }, M, Y, {
        centerAffix: P.value === 1 && !b.value,
        focused: i.value
      }), {
        ...l,
        default: (ae) => {
          let {
            id: re,
            isDisabled: _,
            isDirty: E,
            isReadonly: F,
            isValid: j
          } = ae;
          return h(ca, D({
            ref: v,
            style: {
              "--v-textarea-control-height": g.value
            },
            onClick: m,
            onMousedown: A,
            "onClick:clear": x,
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"]
          }, te, {
            id: re.value,
            active: y.value || E.value,
            centerAffix: P.value === 1 && !b.value,
            dirty: E.value || e.dirty,
            disabled: _.value,
            focused: i.value,
            error: j.value === !1
          }), {
            ...l,
            default: (be) => {
              let {
                props: {
                  class: le,
                  ...ue
                }
              } = be;
              return C(X, null, [e.prefix && C("span", {
                class: "v-text-field__prefix"
              }, [e.prefix]), Ye(C("textarea", D({
                ref: V,
                class: le,
                value: o.value,
                onInput: k,
                autofocus: e.autofocus,
                readonly: F.value,
                disabled: _.value,
                placeholder: e.placeholder,
                rows: e.rows,
                name: e.name,
                onFocus: w,
                onBlur: u
              }, ue, W), null), [[la, {
                handler: d
              }, null, {
                once: !0
              }]]), e.autoGrow && Ye(C("textarea", {
                class: me([le, "v-textarea__sizer"]),
                id: `${ue.id}-sizer`,
                "onUpdate:modelValue": (Z) => o.value = Z,
                ref: S,
                readonly: !0,
                "aria-hidden": "true"
              }, null), [[bi, o.value]]), e.suffix && C("span", {
                class: "v-text-field__suffix"
              }, [e.suffix])]);
            }
          });
        },
        details: L ? (ae) => {
          var re;
          return C(X, null, [(re = l.details) == null ? void 0 : re.call(l, ae), B && C(X, null, [C("span", null, null), h(vo, {
            active: e.persistentCounter || i.value,
            value: r.value,
            max: c.value,
            disabled: e.disabled
          }, l.counter)])]);
        } : void 0
      });
    }), pt({}, f, v, V);
  }
}), pr = /* @__PURE__ */ Fe({
  __name: "OxField",
  props: {
    /** Field or attribute name */
    name: String,
    /** Editor to use **/
    editor: Object,
    /** If true, add a required rule */
    required: Boolean,
    /**
     * If provided, will by default generate a field depending on the value:
     *
     * - `textarea`: creates a `v-textarea`;
     * - `select`: creates a `v-select`;
     * - `checkbox`: create a `v-checkbox`;
     * - `date`: create a `v-date-input`;
     * - `autocomplete`: create a `ox-autocomplete`;
     * - any other value: `v-text-field` with supplied type;
     */
    type: String,
    rules: Array
  },
  emits: ["update:modelValue"],
  setup(e, { emit: n }) {
    const t = pi(() => import("./OxAutocomplete-RRyWhOH0.js")), a = n, l = gt(), o = lt(), i = e, s = I(() => {
      const u = `fields.${i.name}.help`, r = {
        name: i.name,
        label: oe(`fields.${i.name}`),
        "aria-label": oe(`fields.${i.name}`),
        "error-messages": i.editor.error(i.name),
        rules: i.rules || [],
        "onUpdate:modelValue": (...d) => a("update:modelValue", ...d),
        ...l
      }, c = oe(u);
      return c != u && (r.hint = c, r["aria-description"] = c), i.required && r.rules.push(Ti.required), r;
    });
    return (u, r) => z(u.$slots, "default", {
      props: s.value,
      editor: i.editor
    }, () => [
      i.type == "select" ? (R(), G(kl, D({ key: 0 }, s.value, {
        modelValue: i.editor.value[i.name],
        "onUpdate:modelValue": r[0] || (r[0] = (c) => i.editor.value[i.name] = c)
      }), null, 16, ["modelValue"])) : i.type == "textarea" ? (R(), G(br, D({ key: 1 }, s.value, {
        modelValue: i.editor.value[i.name],
        "onUpdate:modelValue": r[1] || (r[1] = (c) => i.editor.value[i.name] = c)
      }), null, 16, ["modelValue"])) : i.type == "checkbox" ? (R(), G(Ku, D({ key: 2 }, s.value, {
        modelValue: i.editor.value[i.name],
        "onUpdate:modelValue": r[2] || (r[2] = (c) => i.editor.value[i.name] = c)
      }), null, 16, ["modelValue"])) : i.type == "autocomplete" ? (R(), G(p(t), D({ key: 3 }, s.value, {
        modelValue: i.editor.value[i.name],
        "onUpdate:modelValue": r[3] || (r[3] = (c) => i.editor.value[i.name] = c)
      }), st({ _: 2 }, [
        Ae(p(o), (c, d) => ({
          name: d,
          fn: O((f) => [
            z(u.$slots, d, _e($e(f)))
          ])
        }))
      ]), 1040, ["modelValue"])) : (R(), G(vt, D({ key: 4 }, s.value, {
        type: i.type,
        modelValue: i.editor.value[i.name],
        "onUpdate:modelValue": r[4] || (r[4] = (c) => i.editor.value[i.name] = c)
      }), null, 16, ["type", "modelValue"]))
    ]);
  }
}), wr = /* @__PURE__ */ Fe({
  __name: "OxModelList",
  props: /* @__PURE__ */ ya({
    /**
     * The model repository to use.
     */
    repo: Object,
    /**
     * Allow to remove items from the list.
     */
    editable: Boolean
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e, { expose: n }) {
    const t = ha(e, "modelValue");
    lt();
    const a = e, l = gt(), { list: o, items: i } = _i({
      query: new $i(a.repo)
    });
    return We(() => t.value.length && o.load({ id: t.value })), J(t, (s) => s.length && Bi(s, o.ids, (u) => u.length && o.load({ id: u }))), J(() => o.ids, (s) => t.value = [...s]), n({ list: o, items: i }), (s, u) => z(s.$slots, "default", {
      list: p(o),
      items: p(i)
    }, () => [
      h(rt, _e($e(p(l))), {
        default: O(() => [
          z(s.$slots, "list", {
            list: p(o),
            items: p(i)
          }, () => [
            (R(!0), fe(X, null, Ae(p(i), (r) => (R(), G(Ge, {
              key: r.id
            }, {
              append: O(() => [
                z(s.$slots, "item.actions", {
                  list: p(o),
                  item: r
                }),
                a.editable ? (R(), G(pe, {
                  key: 0,
                  type: "button",
                  class: "ml-2",
                  size: "small",
                  color: "error",
                  onClick: Ie((c) => p(o).remove(r.id), ["stop", "prevent"]),
                  "aria-label": p(oe)("actions.remove"),
                  title: p(oe)("actions.remove"),
                  icon: "mdi-delete"
                }, null, 8, ["onClick", "aria-label", "title"])) : se("", !0)
              ]),
              default: O(() => [
                z(s.$slots, "item", {
                  list: p(o),
                  item: r
                })
              ]),
              _: 2
            }, 1024))), 128))
          ])
        ]),
        _: 3
      }, 16)
    ]);
  }
}), bo = {
  __name: "OxListFilters",
  props: {
    search: String
  },
  setup(e, { expose: n }) {
    const t = ve("list"), a = e, l = I(() => {
      const s = t.filters;
      return s && Object.entries(s).some(
        ([u, r]) => !u.startsWith("page") && !u.startsWith("ordering") && !!r
      );
    }), o = I(() => l.value ? "mdi-filter-check" : "mdi-filter-outline");
    function i() {
      t.filters = {}, t.load();
    }
    return n({ icon: o, hasFilters: l, reset: i }), (s, u) => (R(), fe("form", {
      onSubmit: u[2] || (u[2] = Ie((r) => p(t).load(), ["prevent"])),
      class: "ox-list-filters width-full"
    }, [
      h(Ua, {
        dense: "",
        color: "transparent"
      }, {
        default: O(() => [
          h(zn, {
            icon: o.value,
            readonly: ""
          }, null, 8, ["icon"]),
          a.search && p(t).filters ? (R(), G(vt, {
            key: 0,
            label: p(oe)("filters.search"),
            density: "compact",
            class: "ml-2",
            modelValue: p(t).filters[a.search],
            "onUpdate:modelValue": u[0] || (u[0] = (r) => p(t).filters[a.search] = r),
            "hide-details": ""
          }, null, 8, ["label", "modelValue"])) : se("", !0),
          z(s.$slots, "default", {
            list: p(t),
            filters: p(t).filters
          }),
          h(pe, {
            onClick: u[1] || (u[1] = Ie((r) => p(t).load(), ["stop"])),
            class: "ml-2",
            icon: "mdi-check",
            "aria-label": s.$t("filters.apply"),
            title: p(oe)("filters.apply")
          }, null, 8, ["aria-label", "title"]),
          l.value ? (R(), G(pe, {
            key: 1,
            onClick: Ie(i, ["stop"]),
            icon: "mdi-backspace",
            "aria-label": p(oe)("filters.reset"),
            title: p(oe)("filters.reset")
          }, null, 8, ["aria-label", "title"])) : se("", !0)
        ]),
        _: 3
      })
    ], 32));
  }
}, en = /* @__PURE__ */ Fe({
  __name: "OxFormListItem",
  props: {
    /** Item being displayed. **/
    item: Object,
    /** Display remove button. **/
    remove: Boolean
  },
  emits: "remove",
  setup(e, { emit: n }) {
    const t = e, a = n, l = gt();
    return (o, i) => (R(), G(Ge, _e($e(p(l))), {
      append: O(() => [
        C("div", {
          onClick: i[1] || (i[1] = Ie(() => {
          }, ["stop"]))
        }, [
          z(o.$slots, "actions", { item: e.item }),
          t.remove ? (R(), G(pe, {
            key: 0,
            type: "button",
            class: "ml-2",
            size: "small",
            onClick: i[0] || (i[0] = Ie((s) => a("remove", o.$events), ["stop", "prevent"])),
            color: "error",
            "aria-label": p(oe)("actions.remove"),
            title: p(oe)("actions.remove"),
            icon: "mdi-delete"
          }, null, 8, ["aria-label", "title"])) : se("", !0)
        ])
      ]),
      default: O(() => [
        h(Wi, null, {
          default: O(() => [
            z(o.$slots, "default", { item: e.item })
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 16));
  }
}), Sr = K({
  ...xe(),
  ...Du()
}, "VForm"), Qa = ne()({
  name: "VForm",
  props: Sr(),
  emits: {
    "update:modelValue": (e) => !0,
    submit: (e) => !0
  },
  setup(e, n) {
    let {
      slots: t,
      emit: a
    } = n;
    const l = Nu(e), o = q();
    function i(u) {
      u.preventDefault(), l.reset();
    }
    function s(u) {
      const r = u, c = l.validate();
      r.then = c.then.bind(c), r.catch = c.catch.bind(c), r.finally = c.finally.bind(c), a("submit", r), r.defaultPrevented || c.then((d) => {
        var v;
        let {
          valid: f
        } = d;
        f && ((v = o.value) == null || v.submit());
      }), r.preventDefault();
    }
    return ie(() => {
      var u;
      return C("form", {
        ref: o,
        class: me(["v-form", e.class]),
        style: Ve(e.style),
        novalidate: !0,
        onReset: i,
        onSubmit: s
      }, [(u = t.default) == null ? void 0 : u.call(t, l)]);
    }), pt(l, o);
  }
}), xr = {
  key: 0,
  class: "flex-row justify-right"
}, kr = /* @__PURE__ */ Fe({
  __name: "OxFormList",
  props: /* @__PURE__ */ ya({
    /** Use this model **/
    useModel: Function,
    /** Content is editable **/
    editable: Boolean
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    var r;
    const n = ha(e, "modelValue"), t = ve("user"), a = q({}), l = e, o = I(() => ({
      add: l.editable && t.can([l.useModel, "add"]),
      change: l.editable && t.can([l.useModel, "change"]),
      delete: l.editable && t.can([l.useModel, "delete"])
    })), i = q([]);
    (r = n.value) != null && r.length || i.value.push(-1);
    function s() {
      n.value.push(a.value), a.value = {};
    }
    function u(c) {
      confirm(oe("actions.delete.confirm")) && n.value.splice(c, 1);
    }
    return (c, d) => (R(), G(rt, {
      opened: i.value,
      "onUpdate:opened": d[2] || (d[2] = (f) => i.value = f)
    }, {
      default: O(() => {
        var f;
        return [
          (f = n.value) != null && f.length ? (R(), fe(X, { key: 0 }, [
            o.value.change ? (R(!0), fe(X, { key: 0 }, Ae(n.value, (v, g) => (R(), G(Ha, {
              key: g,
              value: g
            }, {
              activator: O(({ props: V }) => [
                h(p(en), D({ item: v }, { ref_for: !0 }, V, {
                  remove: o.value.delete,
                  onRemove: (y) => u(g)
                }), {
                  default: O(({ item: y }) => [
                    z(c.$slots, "item", {
                      item: y,
                      index: g
                    })
                  ]),
                  actions: O(({ item: y }) => [
                    z(c.$slots, "item.actions", {
                      item: y,
                      index: g
                    })
                  ]),
                  _: 2
                }, 1040, ["item", "remove", "onRemove"])
              ]),
              default: O(() => [
                h(Qa, {
                  disabled: !o.value.change
                }, {
                  default: O(() => [
                    z(c.$slots, "item.form", {
                      item: v,
                      index: g,
                      editable: o.value.change
                    })
                  ]),
                  _: 2
                }, 1032, ["disabled"])
              ]),
              _: 2
            }, 1032, ["value"]))), 128)) : (R(!0), fe(X, { key: 1 }, Ae(n.value, (v, g) => (R(), G(p(en), D({
              key: g,
              item: v
            }, { ref_for: !0 }, l, {
              value: g,
              remove: o.value.delete,
              onRemove: (V) => u(g)
            }), {
              default: O(({ item: V }) => [
                z(c.$slots, "item", {
                  item: V,
                  index: g
                })
              ]),
              actions: O(({ item: V }) => [
                z(c.$slots, "item.actions", {
                  item: V,
                  index: g
                })
              ]),
              _: 2
            }, 1040, ["item", "value", "remove", "onRemove"]))), 128))
          ], 64)) : (R(), G(Ge, {
            key: 1,
            title: p(oe)("lists.empty")
          }, null, 8, ["title"])),
          o.value.add ? (R(), fe(X, { key: 2 }, [
            n.value.length ? (R(), G(xa, { key: 0 })) : se("", !0),
            h(Ha, { value: -1 }, {
              activator: O(({ props: v }) => [
                h(Ge, D(v, {
                  title: p(oe)("actions.add_item"),
                  "prepend-icon": "mdi-plus"
                }), null, 16, ["title"])
              ]),
              default: O(() => [
                h(Qa, null, {
                  default: O(() => [
                    z(c.$slots, "item.form", {
                      item: a.value,
                      edit: !0
                    })
                  ]),
                  _: 3
                }),
                a.value ? (R(), G(Ge, { key: 0 }, {
                  default: O(() => [
                    Object.values(a.value).length ? (R(), fe("div", xr, [
                      h(pe, {
                        size: "small",
                        color: "secondary",
                        "prepend-icon": "mdi-backspace",
                        onClick: d[0] || (d[0] = (v) => a.value = {}),
                        "aria-label": p(oe)("actions.discard")
                      }, {
                        default: O(() => [
                          Pe(Me(p(oe)("actions.discard")), 1)
                        ]),
                        _: 1
                      }, 8, ["aria-label"]),
                      h(pe, {
                        size: "small",
                        color: "primary",
                        "prepend-icon": "mdi-plus",
                        class: "ml-2",
                        onClick: d[1] || (d[1] = (v) => s()),
                        "aria-label": p(oe)("actions.add")
                      }, {
                        default: O(() => [
                          Pe(Me(p(oe)("actions.add")), 1)
                        ]),
                        _: 1
                      }, 8, ["aria-label"])
                    ])) : se("", !0)
                  ]),
                  _: 1
                })) : se("", !0)
              ]),
              _: 3
            })
          ], 64)) : se("", !0)
        ];
      }),
      _: 3
    }, 8, ["opened"]));
  }
}), po = ne()({
  name: "VCardActions",
  props: xe(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    return at({
      VBtn: {
        slim: !0,
        variant: "text"
      }
    }), ie(() => {
      var a;
      return C("div", {
        class: me(["v-card-actions", e.class]),
        style: Ve(e.style)
      }, [(a = t.default) == null ? void 0 : a.call(t)]);
    }), {};
  }
}), Vr = K({
  opacity: [Number, String],
  ...xe(),
  ...Ke()
}, "VCardSubtitle"), Cr = ne()({
  name: "VCardSubtitle",
  props: Vr(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    return ie(() => h(e.tag, {
      class: me(["v-card-subtitle", e.class]),
      style: Ve([{
        "--v-card-subtitle-opacity": e.opacity
      }, e.style])
    }, t)), {};
  }
}), wo = Ui("v-card-title"), Pr = K({
  appendAvatar: String,
  appendIcon: Se,
  prependAvatar: String,
  prependIcon: Se,
  subtitle: {
    type: [String, Number, Boolean],
    default: void 0
  },
  title: {
    type: [String, Number, Boolean],
    default: void 0
  },
  ...xe(),
  ...yt()
}, "VCardItem"), So = ne()({
  name: "VCardItem",
  props: Pr(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    return ie(() => {
      var r;
      const a = !!(e.prependAvatar || e.prependIcon), l = !!(a || t.prepend), o = !!(e.appendAvatar || e.appendIcon), i = !!(o || t.append), s = !!(e.title != null || t.title), u = !!(e.subtitle != null || t.subtitle);
      return C("div", {
        class: me(["v-card-item", e.class]),
        style: Ve(e.style)
      }, [l && C("div", {
        key: "prepend",
        class: "v-card-item__prepend"
      }, [t.prepend ? h(Le, {
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
      }, t.prepend) : C(X, null, [e.prependAvatar && h(St, {
        key: "prepend-avatar",
        density: e.density,
        image: e.prependAvatar
      }, null), e.prependIcon && h(ke, {
        key: "prepend-icon",
        density: e.density,
        icon: e.prependIcon
      }, null)])]), C("div", {
        class: "v-card-item__content"
      }, [s && h(wo, {
        key: "title"
      }, {
        default: () => {
          var c;
          return [((c = t.title) == null ? void 0 : c.call(t)) ?? Me(e.title)];
        }
      }), u && h(Cr, {
        key: "subtitle"
      }, {
        default: () => {
          var c;
          return [((c = t.subtitle) == null ? void 0 : c.call(t)) ?? Me(e.subtitle)];
        }
      }), (r = t.default) == null ? void 0 : r.call(t)]), i && C("div", {
        key: "append",
        class: "v-card-item__append"
      }, [t.append ? h(Le, {
        key: "append-defaults",
        disabled: !o,
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
      }, t.append) : C(X, null, [e.appendIcon && h(ke, {
        key: "append-icon",
        density: e.density,
        icon: e.appendIcon
      }, null), e.appendAvatar && h(St, {
        key: "append-avatar",
        density: e.density,
        image: e.appendAvatar
      }, null)])])]);
    }), {};
  }
}), Ir = K({
  opacity: [Number, String],
  ...xe(),
  ...Ke()
}, "VCardText"), Ar = ne()({
  name: "VCardText",
  props: Ir(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    return ie(() => h(e.tag, {
      class: me(["v-card-text", e.class]),
      style: Ve([{
        "--v-card-text-opacity": e.opacity
      }, e.style])
    }, t)), {};
  }
}), Tr = K({
  appendAvatar: String,
  appendIcon: Se,
  disabled: Boolean,
  flat: Boolean,
  hover: Boolean,
  image: String,
  link: {
    type: Boolean,
    default: void 0
  },
  prependAvatar: String,
  prependIcon: Se,
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
  ...zt(),
  ...xe(),
  ...yt(),
  ...Ut(),
  ...Ht(),
  ...ul(),
  ...vn(),
  ...dn(),
  ...kt(),
  ...bn(),
  ...Ke(),
  ...Ne(),
  ...Kt({
    variant: "elevated"
  })
}, "VCard"), xo = ne()({
  name: "VCard",
  directives: {
    vRipple: It
  },
  props: Tr(),
  setup(e, n) {
    let {
      attrs: t,
      slots: a
    } = n;
    const {
      themeClasses: l
    } = qe(e), {
      borderClasses: o
    } = ba(e), {
      colorClasses: i,
      colorStyles: s,
      variantClasses: u
    } = tl(e), {
      densityClasses: r
    } = Et(e), {
      dimensionStyles: c
    } = Wt(e), {
      elevationClasses: d
    } = pa(e), {
      loaderClasses: f
    } = il(e), {
      locationStyles: v
    } = ji(e), {
      positionClasses: g
    } = cn(e), {
      roundedClasses: V
    } = $t(e), y = gn(e, t);
    return ie(() => {
      const w = e.link !== !1 && y.isLink.value, m = !e.disabled && e.link !== !1 && (e.link || y.isClickable.value), A = w ? "a" : e.tag, x = !!(a.title || e.title != null), k = !!(a.subtitle || e.subtitle != null), S = x || k, P = !!(a.append || e.appendAvatar || e.appendIcon), b = !!(a.prepend || e.prependAvatar || e.prependIcon), $ = !!(a.image || e.image), T = S || b || P, B = !!(a.text || e.text != null);
      return Ye(h(A, D({
        class: ["v-card", {
          "v-card--disabled": e.disabled,
          "v-card--flat": e.flat,
          "v-card--hover": e.hover && !(e.disabled || e.flat),
          "v-card--link": m
        }, l.value, o.value, i.value, r.value, d.value, f.value, g.value, V.value, u.value, e.class],
        style: [s.value, c.value, v.value, e.style],
        onClick: m && y.navigate,
        tabindex: e.disabled ? -1 : void 0
      }, y.linkProps), {
        default: () => {
          var L;
          return [$ && C("div", {
            key: "image",
            class: "v-card__image"
          }, [a.image ? h(Le, {
            key: "image-defaults",
            disabled: !e.image,
            defaults: {
              VImg: {
                cover: !0,
                src: e.image
              }
            }
          }, a.image) : h(Bt, {
            key: "image-img",
            cover: !0,
            src: e.image
          }, null)]), h(sl, {
            name: "v-card",
            active: !!e.loading,
            color: typeof e.loading == "boolean" ? void 0 : e.loading
          }, {
            default: a.loader
          }), T && h(So, {
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
          }), B && h(Ar, {
            key: "text"
          }, {
            default: () => {
              var M;
              return [((M = a.text) == null ? void 0 : M.call(a)) ?? e.text];
            }
          }), (L = a.default) == null ? void 0 : L.call(a), a.actions && h(po, null, {
            default: a.actions
          }), al(m, "v-card")];
        }
      }), [[It, m && e.ripple]]);
    }), {};
  }
}), _r = ne()({
  name: "VSlideGroupItem",
  props: nl(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = ol(e, ao);
    return () => {
      var l;
      return (l = t.default) == null ? void 0 : l.call(t, {
        isSelected: a.isSelected.value,
        select: a.select,
        toggle: a.toggle,
        selectedClass: a.selectedClass.value
      });
    };
  }
}), $r = {
  __name: "OxListKanban",
  props: {
    itemTitle: String,
    itemValue: String,
    field: String,
    headers: Array,
    colors: { type: Array, default: () => [
      "purple",
      "blue",
      "teal",
      "lime",
      "orange",
      "blue-gray",
      "pink",
      "indigo",
      "cyan",
      "light-green",
      "amber",
      "brown",
      "red",
      "deep-purple",
      "light-blue",
      "green",
      "yellow",
      "deep-orange"
    ] },
    colorVariant: { type: String, default: "lighten-2" }
  },
  emits: ["click"],
  setup(e, { emit: n }) {
    const t = n;
    ve("list");
    const a = ve("items"), l = e;
    function o(u) {
      return u = u % l.colors.length, l.colorVariant ? l.colors[u] + "-" + l.colorVariant : l.colors[u];
    }
    function i(u, r, c) {
      u[c] ? !u[c].includes(r) && u[c].push(r) : u[c] = [r];
    }
    const s = I(() => {
      const u = {};
      if (a.value)
        for (var r of a.value) {
          const d = r[l.field];
          if (Array.isArray(d))
            if (d.length)
              for (var c of d)
                i(u, r, c);
            else
              i(u, r, null);
          else
            i(u, r, d);
        }
      return u;
    });
    return (u, r) => (R(), G(wn, null, {
      default: O(() => [
        h(Nt, null, {
          default: O(() => [
            (R(!0), fe(X, null, Ae(l.headers, (c, d) => (R(), G(_r, {
              key: c.value
            }, {
              default: O(({ selectedClass: f }) => [
                h(xo, {
                  width: "400",
                  class: me(["ma-3", f]),
                  color: o(d),
                  lines: "two"
                }, {
                  default: O(() => [
                    h(wo, null, {
                      default: O(() => [
                        Pe(Me(c.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    h(rt, {
                      "bg-color": o(d)
                    }, {
                      default: O(() => [
                        s.value && s.value[c.value] ? (R(!0), fe(X, { key: 0 }, Ae(s.value[c.value], (v) => z(u.$slots, "item", {
                          key: v.id,
                          header: c,
                          item: v
                        }, () => [
                          h(Ge, {
                            title: v[l.itemTitle],
                            value: l.itemValue && v[l.itemValue],
                            onClick: (g) => t("click", v)
                          }, {
                            append: O(() => [
                              z(u.$slots, "item.action")
                            ]),
                            _: 2
                          }, 1032, ["title", "value", "onClick"])
                        ])), 128)) : se("", !0)
                      ]),
                      _: 2
                    }, 1032, ["bg-color"])
                  ]),
                  _: 2
                }, 1032, ["class", "color"])
              ]),
              _: 2
            }, 1024))), 128))
          ]),
          _: 3
        })
      ]),
      _: 3
    }));
  }
}, ko = /* @__PURE__ */ Fe({
  __name: "OxActionEdit",
  props: {
    item: {},
    edit: {}
  },
  setup(e) {
    const n = ve("panel");
    ve("repos");
    const t = ve("user"), a = gt(), l = e;
    function o(i, s) {
      n.show({ view: "detail.edit", value: s });
    }
    return (i, s) => l.edit && p(t).can([i.item.constructor, "change"], i.item) ? (R(), G(Lt, D({ key: 0 }, p(a), {
      icon: "mdi-pencil",
      title: p(oe)("actions.edit"),
      item: i.item,
      run: o
    }), null, 16, ["title", "item"])) : l.edit && p(t).can([i.item.constructor, "view"], i.item) ? (R(), G(Lt, D({ key: 1 }, p(a), {
      icon: "mdi-eye-outline",
      title: p(oe)("actions.view"),
      item: i.item,
      run: o
    }), null, 16, ["title", "item"])) : se("", !0);
  }
});
function Br() {
  const e = q([]);
  wi(() => e.value = []);
  function n(t, a) {
    e.value[a] = t;
  }
  return {
    refs: e,
    updateRef: n
  };
}
const Er = K({
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
    type: Se,
    default: "$first"
  },
  prevIcon: {
    type: Se,
    default: "$prev"
  },
  nextIcon: {
    type: Se,
    default: "$next"
  },
  lastIcon: {
    type: Se,
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
  ...zt(),
  ...xe(),
  ...yt(),
  ...Ht(),
  ...kt(),
  ...hn(),
  ...Ke({
    tag: "nav"
  }),
  ...Ne(),
  ...Kt({
    variant: "text"
  })
}, "VPagination"), tn = ne()({
  name: "VPagination",
  props: Er(),
  emits: {
    "update:modelValue": (e) => !0,
    first: (e) => !0,
    prev: (e) => !0,
    next: (e) => !0,
    last: (e) => !0
  },
  setup(e, n) {
    let {
      slots: t,
      emit: a
    } = n;
    const l = we(e, "modelValue"), {
      t: o,
      n: i
    } = it(), {
      isRtl: s
    } = ot(), {
      themeClasses: u
    } = qe(e), {
      width: r
    } = ht(), c = ee(-1);
    at(void 0, {
      scoped: !0
    });
    const {
      resizeRef: d
    } = Pt((b) => {
      if (!b.length) return;
      const {
        target: $,
        contentRect: T
      } = b[0], B = $.querySelector(".v-pagination__list > *");
      if (!B) return;
      const L = T.width, M = B.offsetWidth + parseFloat(getComputedStyle(B).marginRight) * 2;
      c.value = V(L, M);
    }), f = I(() => parseInt(e.length, 10)), v = I(() => parseInt(e.start, 10)), g = I(() => e.totalVisible != null ? parseInt(e.totalVisible, 10) : c.value >= 0 ? c.value : V(r.value, 58));
    function V(b, $) {
      const T = e.showFirstLastPage ? 5 : 3;
      return Math.max(0, Math.floor(
        // Round to two decimal places to avoid floating point errors
        Number(((b - $ * T) / $).toFixed(2))
      ));
    }
    const y = I(() => {
      if (f.value <= 0 || isNaN(f.value) || f.value > Number.MAX_SAFE_INTEGER) return [];
      if (g.value <= 0) return [];
      if (g.value === 1) return [l.value];
      if (f.value <= g.value)
        return Zt(f.value, v.value);
      const b = g.value % 2 === 0, $ = b ? g.value / 2 : Math.floor(g.value / 2), T = b ? $ : $ + 1, B = f.value - $;
      if (T - l.value >= 0)
        return [...Zt(Math.max(1, g.value - 1), v.value), e.ellipsis, f.value];
      if (l.value - B >= (b ? 1 : 0)) {
        const L = g.value - 1, M = f.value - L + v.value;
        return [v.value, e.ellipsis, ...Zt(L, M)];
      } else {
        const L = Math.max(1, g.value - 2), M = L === 1 ? l.value : l.value - Math.ceil(L / 2) + v.value;
        return [v.value, e.ellipsis, ...Zt(L, M), e.ellipsis, f.value];
      }
    });
    function w(b, $, T) {
      b.preventDefault(), l.value = $, T && a(T, $);
    }
    const {
      refs: m,
      updateRef: A
    } = Br();
    at({
      VPaginationBtn: {
        color: H(() => e.color),
        border: H(() => e.border),
        density: H(() => e.density),
        size: H(() => e.size),
        variant: H(() => e.variant),
        rounded: H(() => e.rounded),
        elevation: H(() => e.elevation)
      }
    });
    const x = I(() => y.value.map((b, $) => {
      const T = (B) => A(B, $);
      if (typeof b == "string")
        return {
          isActive: !1,
          key: `ellipsis-${$}`,
          page: b,
          props: {
            ref: T,
            ellipsis: !0,
            icon: !0,
            disabled: !0
          }
        };
      {
        const B = b === l.value;
        return {
          isActive: B,
          key: b,
          page: i(b),
          props: {
            ref: T,
            ellipsis: !1,
            icon: !0,
            disabled: !!e.disabled || Number(e.length) < 2,
            color: B ? e.activeColor : e.color,
            "aria-current": B,
            "aria-label": o(B ? e.currentPageAriaLabel : e.pageAriaLabel, b),
            onClick: (L) => w(L, b)
          }
        };
      }
    })), k = I(() => {
      const b = !!e.disabled || l.value <= v.value, $ = !!e.disabled || l.value >= v.value + f.value - 1;
      return {
        first: e.showFirstLastPage ? {
          icon: s.value ? e.lastIcon : e.firstIcon,
          onClick: (T) => w(T, v.value, "first"),
          disabled: b,
          "aria-label": o(e.firstAriaLabel),
          "aria-disabled": b
        } : void 0,
        prev: {
          icon: s.value ? e.nextIcon : e.prevIcon,
          onClick: (T) => w(T, l.value - 1, "prev"),
          disabled: b,
          "aria-label": o(e.previousAriaLabel),
          "aria-disabled": b
        },
        next: {
          icon: s.value ? e.prevIcon : e.nextIcon,
          onClick: (T) => w(T, l.value + 1, "next"),
          disabled: $,
          "aria-label": o(e.nextAriaLabel),
          "aria-disabled": $
        },
        last: e.showFirstLastPage ? {
          icon: s.value ? e.firstIcon : e.lastIcon,
          onClick: (T) => w(T, v.value + f.value - 1, "last"),
          disabled: $,
          "aria-label": o(e.lastAriaLabel),
          "aria-disabled": $
        } : void 0
      };
    });
    function S() {
      var $;
      const b = l.value - v.value;
      ($ = m.value[b]) == null || $.$el.focus();
    }
    function P(b) {
      b.key === Ml.left && !e.disabled && l.value > Number(e.start) ? (l.value = l.value - 1, Be(S)) : b.key === Ml.right && !e.disabled && l.value < v.value + f.value - 1 && (l.value = l.value + 1, Be(S));
    }
    return ie(() => h(e.tag, {
      ref: d,
      class: me(["v-pagination", u.value, e.class]),
      style: Ve(e.style),
      role: "navigation",
      "aria-label": o(e.ariaLabel),
      onKeydown: P,
      "data-test": "v-pagination-root"
    }, {
      default: () => [C("ul", {
        class: "v-pagination__list"
      }, [e.showFirstLastPage && C("li", {
        key: "first",
        class: "v-pagination__first",
        "data-test": "v-pagination-first"
      }, [t.first ? t.first(k.value.first) : h(pe, D({
        _as: "VPaginationBtn"
      }, k.value.first), null)]), C("li", {
        key: "prev",
        class: "v-pagination__prev",
        "data-test": "v-pagination-prev"
      }, [t.prev ? t.prev(k.value.prev) : h(pe, D({
        _as: "VPaginationBtn"
      }, k.value.prev), null)]), x.value.map((b, $) => C("li", {
        key: b.key,
        class: me(["v-pagination__item", {
          "v-pagination__item--is-active": b.isActive
        }]),
        "data-test": "v-pagination-item"
      }, [t.item ? t.item(b) : h(pe, D({
        _as: "VPaginationBtn"
      }, b.props), {
        default: () => [b.page]
      })])), C("li", {
        key: "next",
        class: "v-pagination__next",
        "data-test": "v-pagination-next"
      }, [t.next ? t.next(k.value.next) : h(pe, D({
        _as: "VPaginationBtn"
      }, k.value.next), null)]), e.showFirstLastPage && C("li", {
        key: "last",
        class: "v-pagination__last",
        "data-test": "v-pagination-last"
      }, [t.last ? t.last(k.value.last) : h(pe, D({
        _as: "VPaginationBtn"
      }, k.value.last), null)])])]
    })), {};
  }
}), Vo = K({
  page: {
    type: [Number, String],
    default: 1
  },
  itemsPerPage: {
    type: [Number, String],
    default: 10
  }
}, "DataTable-paginate"), Co = Symbol.for("vuetify:data-table-pagination");
function Po(e) {
  const n = we(e, "page", void 0, (a) => Number(a ?? 1)), t = we(e, "itemsPerPage", void 0, (a) => Number(a ?? 10));
  return {
    page: n,
    itemsPerPage: t
  };
}
function Io(e) {
  const {
    page: n,
    itemsPerPage: t,
    itemsLength: a
  } = e, l = I(() => t.value === -1 ? 0 : t.value * (n.value - 1)), o = I(() => t.value === -1 ? a.value : Math.min(a.value, l.value + t.value)), i = I(() => t.value === -1 || a.value === 0 ? 1 : Math.ceil(a.value / t.value));
  J([n, i], () => {
    n.value > i.value && (n.value = i.value);
  });
  function s(f) {
    t.value = f, n.value = 1;
  }
  function u() {
    n.value = Je(n.value + 1, 1, i.value);
  }
  function r() {
    n.value = Je(n.value - 1, 1, i.value);
  }
  function c(f) {
    n.value = Je(f, 1, i.value);
  }
  const d = {
    page: n,
    itemsPerPage: t,
    startIndex: l,
    stopIndex: o,
    pageCount: i,
    itemsLength: a,
    nextPage: u,
    prevPage: r,
    setPage: c,
    setItemsPerPage: s
  };
  return Ue(Co, d), d;
}
function Or() {
  const e = ve(Co);
  if (!e) throw new Error("Missing pagination!");
  return e;
}
function Fr(e) {
  const n = nt("usePaginatedItems"), {
    items: t,
    startIndex: a,
    stopIndex: l,
    itemsPerPage: o
  } = e, i = I(() => o.value <= 0 ? t.value : t.value.slice(a.value, l.value));
  return J(i, (s) => {
    n.emit("update:currentItems", s);
  }, {
    immediate: !0
  }), {
    paginatedItems: i
  };
}
const Vl = K({
  prevIcon: {
    type: Se,
    default: "$prev"
  },
  nextIcon: {
    type: Se,
    default: "$next"
  },
  firstIcon: {
    type: Se,
    default: "$first"
  },
  lastIcon: {
    type: Se,
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
}, "VDataTableFooter"), da = ne()({
  name: "VDataTableFooter",
  props: Vl(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const {
      t: a
    } = it(), {
      page: l,
      pageCount: o,
      startIndex: i,
      stopIndex: s,
      itemsLength: u,
      itemsPerPage: r,
      setItemsPerPage: c
    } = Or(), d = I(() => e.itemsPerPageOptions.map((f) => typeof f == "number" ? {
      value: f,
      title: f === -1 ? a("$vuetify.dataFooter.itemsPerPageAll") : String(f)
    } : {
      ...f,
      title: isNaN(Number(f.title)) ? a(f.title) : f.title
    }));
    return ie(() => {
      var v;
      const f = tn.filterProps(e);
      return C("div", {
        class: "v-data-table-footer"
      }, [(v = t.prepend) == null ? void 0 : v.call(t), C("div", {
        class: "v-data-table-footer__items-per-page"
      }, [C("span", {
        "aria-label": a(e.itemsPerPageText)
      }, [a(e.itemsPerPageText)]), h(kl, {
        items: d.value,
        modelValue: r.value,
        "onUpdate:modelValue": (g) => c(Number(g)),
        density: "compact",
        variant: "outlined",
        "hide-details": !0
      }, null)]), C("div", {
        class: "v-data-table-footer__info"
      }, [C("div", null, [a(e.pageText, u.value ? i.value + 1 : 0, s.value, u.value)])]), C("div", {
        class: "v-data-table-footer__pagination"
      }, [h(tn, D({
        modelValue: l.value,
        "onUpdate:modelValue": (g) => l.value = g,
        density: "comfortable",
        "first-aria-label": e.firstPageLabel,
        "last-aria-label": e.lastPageLabel,
        length: o.value,
        "next-aria-label": e.nextPageLabel,
        "previous-aria-label": e.prevPageLabel,
        rounded: !0,
        "show-first-last-page": !0,
        "total-visible": e.showCurrentPage ? 1 : 0,
        variant: "plain"
      }, f), null)])]);
    }), {};
  }
}), va = ns({
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
}, (e, n) => {
  let {
    slots: t
  } = n;
  const a = e.tag ?? "td";
  return h(a, {
    tabindex: "0",
    class: me(["v-data-table__td", {
      "v-data-table-column--fixed": e.fixed,
      "v-data-table-column--last-fixed": e.lastFixed,
      "v-data-table-column--no-padding": e.noPadding,
      "v-data-table-column--nowrap": e.nowrap
    }, `v-data-table-column--align-${e.align}`]),
    style: {
      height: he(e.height),
      width: he(e.width),
      maxWidth: he(e.maxWidth),
      left: he(e.fixedOffset || null)
    }
  }, {
    default: () => {
      var l;
      return [(l = t.default) == null ? void 0 : l.call(t)];
    }
  });
}), Rr = K({
  headers: Array
}, "DataTable-header"), Ao = Symbol.for("vuetify:data-table-headers"), To = {
  title: "",
  sortable: !1
}, Mr = {
  ...To,
  width: 48
};
function Lr() {
  const n = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []).map((t) => ({
    element: t,
    priority: 0
  }));
  return {
    enqueue: (t, a) => {
      let l = !1;
      for (let o = 0; o < n.length; o++)
        if (n[o].priority > a) {
          n.splice(o, 0, {
            element: t,
            priority: a
          }), l = !0;
          break;
        }
      l || n.push({
        element: t,
        priority: a
      });
    },
    size: () => n.length,
    count: () => {
      let t = 0;
      if (!n.length) return 0;
      const a = Math.floor(n[0].priority);
      for (let l = 0; l < n.length; l++)
        Math.floor(n[l].priority) === a && (t += 1);
      return t;
    },
    dequeue: () => n.shift()
  };
}
function Ja(e) {
  let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  if (!e.children)
    n.push(e);
  else
    for (const t of e.children)
      Ja(t, n);
  return n;
}
function _o(e) {
  let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : /* @__PURE__ */ new Set();
  for (const t of e)
    t.key && n.add(t.key), t.children && _o(t.children, n);
  return n;
}
function Dr(e) {
  if (e.key) {
    if (e.key === "data-table-group") return To;
    if (["data-table-expand", "data-table-select"].includes(e.key)) return Mr;
  }
}
function Cl(e) {
  let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return e.children ? Math.max(n, ...e.children.map((t) => Cl(t, n + 1))) : n;
}
function Nr(e) {
  let n = !1;
  function t(o) {
    let i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (o)
      if (i && (o.fixed = !0), o.fixed)
        if (o.children)
          for (let s = o.children.length - 1; s >= 0; s--)
            t(o.children[s], !0);
        else
          n ? isNaN(Number(o.width)) ? Cn(`Multiple fixed columns should have a static width (key: ${o.key})`) : o.minWidth = Math.max(Number(o.width) || 0, Number(o.minWidth) || 0) : o.lastFixed = !0, n = !0;
      else if (o.children)
        for (let s = o.children.length - 1; s >= 0; s--)
          t(o.children[s]);
      else
        n = !1;
  }
  for (let o = e.length - 1; o >= 0; o--)
    t(e[o]);
  function a(o) {
    let i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    if (!o) return i;
    if (o.children) {
      o.fixedOffset = i;
      for (const s of o.children)
        i = a(s, i);
    } else o.fixed && (o.fixedOffset = i, i += parseFloat(o.width || "0") || 0);
    return i;
  }
  let l = 0;
  for (const o of e)
    l = a(o, l);
}
function Hr(e, n) {
  const t = [];
  let a = 0;
  const l = Lr(e);
  for (; l.size() > 0; ) {
    let i = l.count();
    const s = [];
    let u = 1;
    for (; i > 0; ) {
      const {
        element: r,
        priority: c
      } = l.dequeue(), d = n - a - Cl(r);
      if (s.push({
        ...r,
        rowspan: d ?? 1,
        colspan: r.children ? Ja(r).length : 1
      }), r.children)
        for (const f of r.children) {
          const v = c % 1 + u / Math.pow(10, a + 2);
          l.enqueue(f, a + d + v);
        }
      u += 1, i -= 1;
    }
    a += 1, t.push(s);
  }
  return {
    columns: e.map((i) => Ja(i)).flat(),
    headers: t
  };
}
function $o(e) {
  const n = [];
  for (const t of e) {
    const a = {
      ...Dr(t),
      ...t
    }, l = a.key ?? (typeof a.value == "string" ? a.value : null), o = a.value ?? l ?? null, i = {
      ...a,
      key: l,
      value: o,
      sortable: a.sortable ?? (a.key != null || !!a.sort),
      children: a.children ? $o(a.children) : void 0
    };
    n.push(i);
  }
  return n;
}
function Bo(e, n) {
  const t = q([]), a = q([]), l = q({}), o = q({}), i = q({});
  et(() => {
    var V, y, w;
    const r = (e.headers || Object.keys(e.items[0] ?? {}).map((m) => ({
      key: m,
      title: Si(m)
    }))).slice(), c = _o(r);
    (V = n == null ? void 0 : n.groupBy) != null && V.value.length && !c.has("data-table-group") && r.unshift({
      key: "data-table-group",
      title: "Group"
    }), (y = n == null ? void 0 : n.showSelect) != null && y.value && !c.has("data-table-select") && r.unshift({
      key: "data-table-select"
    }), (w = n == null ? void 0 : n.showExpand) != null && w.value && !c.has("data-table-expand") && r.push({
      key: "data-table-expand"
    });
    const d = $o(r);
    Nr(d);
    const f = Math.max(...d.map((m) => Cl(m))) + 1, v = Hr(d, f);
    t.value = v.headers, a.value = v.columns;
    const g = v.headers.flat(1);
    for (const m of g)
      m.key && (m.sortable && (m.sort && (l.value[m.key] = m.sort), m.sortRaw && (o.value[m.key] = m.sortRaw)), m.filter && (i.value[m.key] = m.filter));
  });
  const s = {
    headers: t,
    columns: a,
    sortFunctions: l,
    sortRawFunctions: o,
    filterFunctions: i
  };
  return Ue(Ao, s), s;
}
function Pa() {
  const e = ve(Ao);
  if (!e) throw new Error("Missing headers!");
  return e;
}
const zr = {
  showSelectAll: !1,
  allSelected: () => [],
  select: (e) => {
    var a;
    let {
      items: n,
      value: t
    } = e;
    return new Set(t ? [(a = n[0]) == null ? void 0 : a.value] : []);
  },
  selectAll: (e) => {
    let {
      selected: n
    } = e;
    return n;
  }
}, Eo = {
  showSelectAll: !0,
  allSelected: (e) => {
    let {
      currentPage: n
    } = e;
    return n;
  },
  select: (e) => {
    let {
      items: n,
      value: t,
      selected: a
    } = e;
    for (const l of n)
      t ? a.add(l.value) : a.delete(l.value);
    return a;
  },
  selectAll: (e) => {
    let {
      value: n,
      currentPage: t,
      selected: a
    } = e;
    return Eo.select({
      items: t,
      value: n,
      selected: a
    });
  }
}, Oo = {
  showSelectAll: !0,
  allSelected: (e) => {
    let {
      allItems: n
    } = e;
    return n;
  },
  select: (e) => {
    let {
      items: n,
      value: t,
      selected: a
    } = e;
    for (const l of n)
      t ? a.add(l.value) : a.delete(l.value);
    return a;
  },
  selectAll: (e) => {
    let {
      value: n,
      allItems: t,
      selected: a
    } = e;
    return Oo.select({
      items: t,
      value: n,
      selected: a
    });
  }
}, Wr = K({
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
    default: ut
  }
}, "DataTable-select"), Fo = Symbol.for("vuetify:data-table-selection");
function Ro(e, n) {
  let {
    allItems: t,
    currentPage: a
  } = n;
  const l = we(e, "modelValue", e.modelValue, (m) => new Set(He(m).map((A) => {
    var x;
    return ((x = t.value.find((k) => e.valueComparator(A, k.value))) == null ? void 0 : x.value) ?? A;
  })), (m) => [...m.values()]), o = I(() => t.value.filter((m) => m.selectable)), i = I(() => a.value.filter((m) => m.selectable)), s = I(() => {
    if (typeof e.selectStrategy == "object") return e.selectStrategy;
    switch (e.selectStrategy) {
      case "single":
        return zr;
      case "all":
        return Oo;
      case "page":
      default:
        return Eo;
    }
  }), u = ee(null);
  function r(m) {
    return He(m).every((A) => l.value.has(A.value));
  }
  function c(m) {
    return He(m).some((A) => l.value.has(A.value));
  }
  function d(m, A) {
    const x = s.value.select({
      items: m,
      value: A,
      selected: new Set(l.value)
    });
    l.value = x;
  }
  function f(m, A, x) {
    const k = [];
    if (A = A ?? a.value.findIndex((S) => S.value === m.value), e.selectStrategy !== "single" && (x != null && x.shiftKey) && u.value !== null) {
      const [S, P] = [u.value, A].sort((b, $) => b - $);
      k.push(...a.value.slice(S, P + 1).filter((b) => b.selectable));
    } else
      k.push(m), u.value = A;
    d(k, !r([m]));
  }
  function v(m) {
    const A = s.value.selectAll({
      value: m,
      allItems: o.value,
      currentPage: i.value,
      selected: new Set(l.value)
    });
    l.value = A;
  }
  const g = I(() => l.value.size > 0), V = I(() => {
    const m = s.value.allSelected({
      allItems: o.value,
      currentPage: i.value
    });
    return !!m.length && r(m);
  }), y = H(() => s.value.showSelectAll), w = {
    toggleSelect: f,
    select: d,
    selectAll: v,
    isSelected: r,
    isSomeSelected: c,
    someSelected: g,
    allSelected: V,
    showSelectAll: y,
    lastSelectedIndex: u,
    selectStrategy: s
  };
  return Ue(Fo, w), w;
}
function Ia() {
  const e = ve(Fo);
  if (!e) throw new Error("Missing selection!");
  return e;
}
const Ur = K({
  sortBy: {
    type: Array,
    default: () => []
  },
  customKeySort: Object,
  multiSort: Boolean,
  mustSort: Boolean
}, "DataTable-sort"), Mo = Symbol.for("vuetify:data-table-sort");
function Lo(e) {
  const n = we(e, "sortBy"), t = H(() => e.mustSort), a = H(() => e.multiSort);
  return {
    sortBy: n,
    mustSort: t,
    multiSort: a
  };
}
function Do(e) {
  const {
    sortBy: n,
    mustSort: t,
    multiSort: a,
    page: l
  } = e, o = (u) => {
    if (u.key == null) return;
    let r = n.value.map((d) => ({
      ...d
    })) ?? [];
    const c = r.find((d) => d.key === u.key);
    c ? c.order === "desc" ? t.value && r.length === 1 ? c.order = "asc" : r = r.filter((d) => d.key !== u.key) : c.order = "desc" : a.value ? r.push({
      key: u.key,
      order: "asc"
    }) : r = [{
      key: u.key,
      order: "asc"
    }], n.value = r, l && (l.value = 1);
  };
  function i(u) {
    return !!n.value.find((r) => r.key === u.key);
  }
  const s = {
    sortBy: n,
    toggleSort: o,
    isSorted: i
  };
  return Ue(Mo, s), s;
}
function No() {
  const e = ve(Mo);
  if (!e) throw new Error("Missing sort!");
  return e;
}
function jr(e, n, t, a) {
  const l = it();
  return {
    sortedItems: I(() => {
      var i, s;
      return t.value.length ? Kr(n.value, t.value, l.current.value, {
        transform: a == null ? void 0 : a.transform,
        sortFunctions: {
          ...e.customKeySort,
          ...(i = a == null ? void 0 : a.sortFunctions) == null ? void 0 : i.value
        },
        sortRawFunctions: (s = a == null ? void 0 : a.sortRawFunctions) == null ? void 0 : s.value
      }) : n.value;
    })
  };
}
function Kr(e, n, t, a) {
  const l = new Intl.Collator(t, {
    sensitivity: "accent",
    usage: "sort"
  });
  return e.map((i) => [i, a != null && a.transform ? a.transform(i) : i]).sort((i, s) => {
    var u, r;
    for (let c = 0; c < n.length; c++) {
      let d = !1;
      const f = n[c].key, v = n[c].order ?? "asc";
      if (v === !1) continue;
      let g = oa(i[1], f), V = oa(s[1], f), y = i[0].raw, w = s[0].raw;
      if (v === "desc" && ([g, V] = [V, g], [y, w] = [w, y]), (u = a == null ? void 0 : a.sortRawFunctions) != null && u[f]) {
        const m = a.sortRawFunctions[f](y, w);
        if (m == null) continue;
        if (d = !0, m) return m;
      }
      if ((r = a == null ? void 0 : a.sortFunctions) != null && r[f]) {
        const m = a.sortFunctions[f](g, V);
        if (m == null) continue;
        if (d = !0, m) return m;
      }
      if (!d) {
        if (g instanceof Date && V instanceof Date)
          return g.getTime() - V.getTime();
        if ([g, V] = [g, V].map((m) => m != null ? m.toString().toLocaleLowerCase() : m), g !== V)
          return Qt(g) && Qt(V) ? 0 : Qt(g) ? -1 : Qt(V) ? 1 : !isNaN(g) && !isNaN(V) ? Number(g) - Number(V) : l.compare(g, V);
      }
    }
    return 0;
  }).map((i) => {
    let [s] = i;
    return s;
  });
}
const Ho = K({
  color: String,
  disableSort: Boolean,
  fixedHeader: Boolean,
  multiSort: Boolean,
  sortAscIcon: {
    type: Se,
    default: "$sortAsc"
  },
  sortDescIcon: {
    type: Se,
    default: "$sortDesc"
  },
  headerProps: {
    type: Object
  },
  /** @deprecated */
  sticky: Boolean,
  ...Yt(),
  ...ul()
}, "VDataTableHeaders"), fa = ne()({
  name: "VDataTableHeaders",
  props: Ho(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const {
      t: a
    } = it(), {
      toggleSort: l,
      sortBy: o,
      isSorted: i
    } = No(), {
      someSelected: s,
      allSelected: u,
      selectAll: r,
      showSelectAll: c
    } = Ia(), {
      columns: d,
      headers: f
    } = Pa(), {
      loaderClasses: v
    } = il(e);
    function g($, T) {
      if (!(!(e.sticky || e.fixedHeader) && !$.fixed))
        return {
          position: "sticky",
          left: $.fixed ? he($.fixedOffset) : void 0,
          top: e.sticky || e.fixedHeader ? `calc(var(--v-table-header-height) * ${T})` : void 0
        };
    }
    function V($, T) {
      $.key === "Enter" && !e.disableSort && l(T);
    }
    function y($) {
      const T = o.value.find((B) => B.key === $.key);
      return T ? T.order === "asc" ? e.sortAscIcon : e.sortDescIcon : e.sortAscIcon;
    }
    const {
      backgroundColorClasses: w,
      backgroundColorStyles: m
    } = dt(() => e.color), {
      displayClasses: A,
      mobile: x
    } = ht(e), k = I(() => ({
      headers: f.value,
      columns: d.value,
      toggleSort: l,
      isSorted: i,
      sortBy: o.value,
      someSelected: s.value,
      allSelected: u.value,
      selectAll: r,
      getSortIcon: y
    })), S = I(() => ["v-data-table__th", {
      "v-data-table__th--sticky": e.sticky || e.fixedHeader
    }, A.value, v.value]), P = ($) => {
      let {
        column: T,
        x: B,
        y: L
      } = $;
      const M = T.key === "data-table-select" || T.key === "data-table-expand", W = D(e.headerProps ?? {}, T.headerProps ?? {});
      return h(va, D({
        tag: "th",
        align: T.align,
        class: [{
          "v-data-table__th--sortable": T.sortable && !e.disableSort,
          "v-data-table__th--sorted": i(T),
          "v-data-table__th--fixed": T.fixed
        }, ...S.value],
        style: {
          width: he(T.width),
          minWidth: he(T.minWidth),
          maxWidth: he(T.maxWidth),
          ...g(T, L)
        },
        colspan: T.colspan,
        rowspan: T.rowspan,
        onClick: T.sortable ? () => l(T) : void 0,
        fixed: T.fixed,
        nowrap: T.nowrap,
        lastFixed: T.lastFixed,
        noPadding: M
      }, W, {
        onKeydown: (U) => T.sortable && V(U, T)
      }), {
        default: () => {
          var te;
          const U = `header.${T.key}`, Y = {
            column: T,
            selectAll: r,
            isSorted: i,
            toggleSort: l,
            sortBy: o.value,
            someSelected: s.value,
            allSelected: u.value,
            getSortIcon: y
          };
          return t[U] ? t[U](Y) : T.key === "data-table-select" ? ((te = t["header.data-table-select"]) == null ? void 0 : te.call(t, Y)) ?? (c.value && h(xt, {
            modelValue: u.value,
            indeterminate: s.value && !u.value,
            "onUpdate:modelValue": r
          }, null)) : C("div", {
            class: "v-data-table-header__content"
          }, [C("span", null, [T.title]), T.sortable && !e.disableSort && h(ke, {
            key: "icon",
            class: "v-data-table-header__sort-icon",
            icon: y(T)
          }, null), e.multiSort && i(T) && C("div", {
            key: "badge",
            class: me(["v-data-table-header__sort-badge", ...w.value]),
            style: Ve(m.value)
          }, [o.value.findIndex((ae) => ae.key === T.key) + 1])]);
        }
      });
    }, b = () => {
      const $ = I(() => d.value.filter((B) => (B == null ? void 0 : B.sortable) && !e.disableSort)), T = I(() => {
        if (d.value.find((L) => L.key === "data-table-select") != null)
          return u.value ? "$checkboxOn" : s.value ? "$checkboxIndeterminate" : "$checkboxOff";
      });
      return h(va, D({
        tag: "th",
        class: [...S.value],
        colspan: f.value.length + 1
      }, e.headerProps), {
        default: () => [C("div", {
          class: "v-data-table-header__content"
        }, [h(kl, {
          chips: !0,
          class: "v-data-table__td-sort-select",
          clearable: !0,
          density: "default",
          items: $.value,
          label: a("$vuetify.dataTable.sortBy"),
          multiple: e.multiSort,
          variant: "underlined",
          "onClick:clear": () => o.value = [],
          appendIcon: T.value,
          "onClick:append": () => r(!u.value)
        }, {
          ...t,
          chip: (B) => {
            var L;
            return h(pl, {
              onClick: (L = B.item.raw) != null && L.sortable ? () => l(B.item.raw) : void 0,
              onMousedown: (M) => {
                M.preventDefault(), M.stopPropagation();
              }
            }, {
              default: () => [B.item.title, h(ke, {
                class: me(["v-data-table__td-sort-icon", i(B.item.raw) && "v-data-table__td-sort-icon-active"]),
                icon: y(B.item.raw),
                size: "small"
              }, null)]
            });
          }
        })])]
      });
    };
    ie(() => x.value ? C("tr", null, [h(b, null, null)]) : C(X, null, [t.headers ? t.headers(k.value) : f.value.map(($, T) => C("tr", null, [$.map((B, L) => h(P, {
      column: B,
      x: L,
      y: T
    }, null))])), e.loading && C("tr", {
      class: "v-data-table-progress"
    }, [C("th", {
      colspan: d.value.length
    }, [h(sl, {
      name: "v-data-table-progress",
      absolute: !0,
      active: !0,
      color: typeof e.loading == "boolean" ? void 0 : e.loading,
      indeterminate: !0
    }, {
      default: t.loader
    })])])]));
  }
}), Gr = K({
  groupBy: {
    type: Array,
    default: () => []
  }
}, "DataTable-group"), zo = Symbol.for("vuetify:data-table-group");
function Wo(e) {
  return {
    groupBy: we(e, "groupBy")
  };
}
function Uo(e) {
  const {
    disableSort: n,
    groupBy: t,
    sortBy: a
  } = e, l = q(/* @__PURE__ */ new Set()), o = I(() => t.value.map((c) => ({
    ...c,
    order: c.order ?? !1
  })).concat(n != null && n.value ? [] : a.value));
  function i(c) {
    return l.value.has(c.id);
  }
  function s(c) {
    const d = new Set(l.value);
    i(c) ? d.delete(c.id) : d.add(c.id), l.value = d;
  }
  function u(c) {
    function d(f) {
      const v = [];
      for (const g of f.items)
        "type" in g && g.type === "group" ? v.push(...d(g)) : v.push(g);
      return [...new Set(v)];
    }
    return d({
      items: c
    });
  }
  const r = {
    sortByWithGroups: o,
    toggleGroup: s,
    opened: l,
    groupBy: t,
    extractRows: u,
    isGroupOpen: i
  };
  return Ue(zo, r), r;
}
function jo() {
  const e = ve(zo);
  if (!e) throw new Error("Missing group!");
  return e;
}
function Yr(e, n) {
  if (!e.length) return [];
  const t = /* @__PURE__ */ new Map();
  for (const a of e) {
    const l = oa(a.raw, n);
    t.has(l) || t.set(l, []), t.get(l).push(a);
  }
  return t;
}
function Ko(e, n) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "root";
  if (!n.length) return [];
  const l = Yr(e, n[0]), o = [], i = n.slice(1);
  return l.forEach((s, u) => {
    const r = n[0], c = `${a}_${r}_${u}`;
    o.push({
      depth: t,
      id: c,
      key: r,
      value: u,
      items: i.length ? Ko(s, i, t + 1, c) : s,
      type: "group"
    });
  }), o;
}
function Go(e, n) {
  const t = [];
  for (const a of e)
    "type" in a && a.type === "group" ? (a.value != null && t.push(a), (n.has(a.id) || a.value == null) && t.push(...Go(a.items, n))) : t.push(a);
  return t;
}
function Yo(e, n, t) {
  return {
    flatItems: I(() => {
      if (!n.value.length) return e.value;
      const l = Ko(e.value, n.value.map((o) => o.key));
      return Go(l, t.value);
    })
  };
}
const qr = K({
  item: {
    type: Object,
    required: !0
  }
}, "VDataTableGroupHeaderRow"), Xr = ne()({
  name: "VDataTableGroupHeaderRow",
  props: qr(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const {
      isGroupOpen: a,
      toggleGroup: l,
      extractRows: o
    } = jo(), {
      isSelected: i,
      isSomeSelected: s,
      select: u
    } = Ia(), {
      columns: r
    } = Pa(), c = I(() => o([e.item]));
    return () => C("tr", {
      class: "v-data-table-group-header-row",
      style: {
        "--v-data-table-group-header-row-depth": e.item.depth
      }
    }, [r.value.map((d) => {
      var f, v;
      if (d.key === "data-table-group") {
        const g = a(e.item) ? "$expand" : "$next", V = () => l(e.item);
        return ((f = t["data-table-group"]) == null ? void 0 : f.call(t, {
          item: e.item,
          count: c.value.length,
          props: {
            icon: g,
            onClick: V
          }
        })) ?? h(va, {
          class: "v-data-table-group-header-row__column"
        }, {
          default: () => [h(pe, {
            size: "small",
            variant: "text",
            icon: g,
            onClick: V
          }, null), C("span", null, [e.item.value]), C("span", null, [Pe("("), c.value.length, Pe(")")])]
        });
      }
      if (d.key === "data-table-select") {
        const g = i(c.value), V = s(c.value) && !g, y = (w) => u(c.value, w);
        return ((v = t["data-table-select"]) == null ? void 0 : v.call(t, {
          props: {
            modelValue: g,
            indeterminate: V,
            "onUpdate:modelValue": y
          }
        })) ?? C("td", null, [h(xt, {
          modelValue: g,
          indeterminate: V,
          "onUpdate:modelValue": y
        }, null)]);
      }
      return C("td", null, null);
    })]);
  }
}), Zr = K({
  expandOnClick: Boolean,
  showExpand: Boolean,
  expanded: {
    type: Array,
    default: () => []
  }
}, "DataTable-expand"), qo = Symbol.for("vuetify:datatable:expanded");
function Xo(e) {
  const n = H(() => e.expandOnClick), t = we(e, "expanded", e.expanded, (s) => new Set(s), (s) => [...s.values()]);
  function a(s, u) {
    const r = new Set(t.value);
    u ? r.add(s.value) : r.delete(s.value), t.value = r;
  }
  function l(s) {
    return t.value.has(s.value);
  }
  function o(s) {
    a(s, !l(s));
  }
  const i = {
    expand: a,
    expanded: t,
    expandOnClick: n,
    isExpanded: l,
    toggleExpand: o
  };
  return Ue(qo, i), i;
}
function Zo() {
  const e = ve(qo);
  if (!e) throw new Error("foo");
  return e;
}
const Qr = K({
  index: Number,
  item: Object,
  cellProps: [Object, Function],
  onClick: Ze(),
  onContextmenu: Ze(),
  onDblclick: Ze(),
  ...Yt()
}, "VDataTableRow"), Jr = ne()({
  name: "VDataTableRow",
  props: Qr(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const {
      displayClasses: a,
      mobile: l
    } = ht(e, "v-data-table__tr"), {
      isSelected: o,
      toggleSelect: i,
      someSelected: s,
      allSelected: u,
      selectAll: r
    } = Ia(), {
      isExpanded: c,
      toggleExpand: d
    } = Zo(), {
      toggleSort: f,
      sortBy: v,
      isSorted: g
    } = No(), {
      columns: V
    } = Pa();
    ie(() => C("tr", {
      class: me(["v-data-table__tr", {
        "v-data-table__tr--clickable": !!(e.onClick || e.onContextmenu || e.onDblclick)
      }, a.value]),
      onClick: e.onClick,
      onContextmenu: e.onContextmenu,
      onDblclick: e.onDblclick
    }, [e.item && V.value.map((y, w) => {
      const m = e.item, A = `item.${y.key}`, x = `header.${y.key}`, k = {
        index: e.index,
        item: m.raw,
        internalItem: m,
        value: oa(m.columns, y.key),
        column: y,
        isSelected: o,
        toggleSelect: i,
        isExpanded: c,
        toggleExpand: d
      }, S = {
        column: y,
        selectAll: r,
        isSorted: g,
        toggleSort: f,
        sortBy: v.value,
        someSelected: s.value,
        allSelected: u.value,
        getSortIcon: () => ""
      }, P = typeof e.cellProps == "function" ? e.cellProps({
        index: k.index,
        item: k.item,
        internalItem: k.internalItem,
        value: k.value,
        column: y
      }) : e.cellProps, b = typeof y.cellProps == "function" ? y.cellProps({
        index: k.index,
        item: k.item,
        internalItem: k.internalItem,
        value: k.value
      }) : y.cellProps;
      return h(va, D({
        align: y.align,
        class: {
          "v-data-table__td--expanded-row": y.key === "data-table-expand",
          "v-data-table__td--select-row": y.key === "data-table-select"
        },
        fixed: y.fixed,
        fixedOffset: y.fixedOffset,
        lastFixed: y.lastFixed,
        maxWidth: l.value ? void 0 : y.maxWidth,
        noPadding: y.key === "data-table-select" || y.key === "data-table-expand",
        nowrap: y.nowrap,
        width: l.value ? void 0 : y.width
      }, P, b), {
        default: () => {
          var T, B, L, M;
          if (y.key === "data-table-select")
            return ((T = t["item.data-table-select"]) == null ? void 0 : T.call(t, {
              ...k,
              props: {
                disabled: !m.selectable,
                modelValue: o([m]),
                onClick: Ie(() => i(m), ["stop"])
              }
            })) ?? h(xt, {
              disabled: !m.selectable,
              modelValue: o([m]),
              onClick: Ie((W) => i(m, e.index, W), ["stop"])
            }, null);
          if (y.key === "data-table-expand")
            return ((B = t["item.data-table-expand"]) == null ? void 0 : B.call(t, {
              ...k,
              props: {
                icon: c(m) ? "$collapse" : "$expand",
                size: "small",
                variant: "text",
                onClick: Ie(() => d(m), ["stop"])
              }
            })) ?? h(pe, {
              icon: c(m) ? "$collapse" : "$expand",
              size: "small",
              variant: "text",
              onClick: Ie(() => d(m), ["stop"])
            }, null);
          if (t[A] && !l.value) return t[A](k);
          const $ = Me(k.value);
          return l.value ? C(X, null, [C("div", {
            class: "v-data-table__td-title"
          }, [((L = t[x]) == null ? void 0 : L.call(t, S)) ?? y.title]), C("div", {
            class: "v-data-table__td-value"
          }, [((M = t[A]) == null ? void 0 : M.call(t, k)) ?? $])]) : $;
        }
      });
    })]));
  }
}), Qo = K({
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
  ...Yt()
}, "VDataTableRows"), ma = ne()({
  name: "VDataTableRows",
  inheritAttrs: !1,
  props: Qo(),
  setup(e, n) {
    let {
      attrs: t,
      slots: a
    } = n;
    const {
      columns: l
    } = Pa(), {
      expandOnClick: o,
      toggleExpand: i,
      isExpanded: s
    } = Zo(), {
      isSelected: u,
      toggleSelect: r
    } = Ia(), {
      toggleGroup: c,
      isGroupOpen: d
    } = jo(), {
      t: f
    } = it(), {
      mobile: v
    } = ht(e);
    return ie(() => {
      var g, V;
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
      }, [((V = a["no-data"]) == null ? void 0 : V.call(a)) ?? f(e.noDataText)])]) : C(X, null, [e.items.map((y, w) => {
        var x;
        if (y.type === "group") {
          const k = {
            index: w,
            item: y,
            columns: l.value,
            isExpanded: s,
            toggleExpand: i,
            isSelected: u,
            toggleSelect: r,
            toggleGroup: c,
            isGroupOpen: d
          };
          return a["group-header"] ? a["group-header"](k) : h(Xr, D({
            key: `group-header_${y.id}`,
            item: y
          }, Dl(t, ":group-header", () => k)), a);
        }
        const m = {
          index: w,
          item: y.raw,
          internalItem: y,
          columns: l.value,
          isExpanded: s,
          toggleExpand: i,
          isSelected: u,
          toggleSelect: r
        }, A = {
          ...m,
          props: D({
            key: `item_${y.key ?? y.index}`,
            onClick: o.value ? () => {
              i(y);
            } : void 0,
            index: w,
            item: y,
            cellProps: e.cellProps,
            mobile: v.value
          }, Dl(t, ":row", () => m), typeof e.rowProps == "function" ? e.rowProps({
            item: m.item,
            index: m.index,
            internalItem: m.internalItem
          }) : e.rowProps)
        };
        return C(X, {
          key: A.props.key
        }, [a.item ? a.item(A) : h(Jr, A.props, a), s(y) && ((x = a["expanded-row"]) == null ? void 0 : x.call(a, m))]);
      })]);
    }), {};
  }
}), Jo = K({
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  height: [Number, String],
  hover: Boolean,
  ...xe(),
  ...yt(),
  ...Ke(),
  ...Ne()
}, "VTable"), ga = ne()({
  name: "VTable",
  props: Jo(),
  setup(e, n) {
    let {
      slots: t,
      emit: a
    } = n;
    const {
      themeClasses: l
    } = qe(e), {
      densityClasses: o
    } = Et(e);
    return ie(() => h(e.tag, {
      class: me(["v-table", {
        "v-table--fixed-height": !!e.height,
        "v-table--fixed-header": e.fixedHeader,
        "v-table--fixed-footer": e.fixedFooter,
        "v-table--has-top": !!t.top,
        "v-table--has-bottom": !!t.bottom,
        "v-table--hover": e.hover
      }, l.value, o.value, e.class]),
      style: Ve(e.style)
    }, {
      default: () => {
        var i, s, u;
        return [(i = t.top) == null ? void 0 : i.call(t), t.default ? C("div", {
          class: "v-table__wrapper",
          style: {
            height: he(e.height)
          }
        }, [C("table", null, [t.default()])]) : (s = t.wrapper) == null ? void 0 : s.call(t), (u = t.bottom) == null ? void 0 : u.call(t)];
      }
    })), {};
  }
}), ec = K({
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
function tc(e, n, t, a) {
  const l = e.returnObject ? n : Ct(n, e.itemValue), o = Ct(n, e.itemSelectable, !0), i = a.reduce((s, u) => (u.key != null && (s[u.key] = Ct(n, u.value)), s), {});
  return {
    type: "item",
    key: e.returnObject ? Ct(n, e.itemValue) : l,
    index: t,
    value: l,
    selectable: o,
    columns: i,
    raw: n
  };
}
function ac(e, n, t) {
  return n.map((a, l) => tc(e, a, l, t));
}
function ei(e, n) {
  return {
    items: I(() => ac(e, e.items, n.value))
  };
}
function ti(e) {
  let {
    page: n,
    itemsPerPage: t,
    sortBy: a,
    groupBy: l,
    search: o
  } = e;
  const i = nt("VDataTable"), s = () => ({
    page: n.value,
    itemsPerPage: t.value,
    sortBy: a.value,
    groupBy: l.value,
    search: o.value
  });
  let u = null;
  J(s, (r) => {
    ut(u, r) || (u && u.search !== r.search && (n.value = 1), i.emit("update:options", r), u = r);
  }, {
    deep: !0,
    immediate: !0
  });
}
const ai = K({
  ...Qo(),
  hideDefaultBody: Boolean,
  hideDefaultFooter: Boolean,
  hideDefaultHeader: Boolean,
  width: [String, Number],
  search: String,
  ...Zr(),
  ...Gr(),
  ...Rr(),
  ...ec(),
  ...Wr(),
  ...Ur(),
  ...Ho(),
  ...Jo()
}, "DataTable"), lc = K({
  ...Vo(),
  ...ai(),
  ...yo(),
  ...Vl()
}, "VDataTable");
ne()({
  name: "VDataTable",
  props: lc(),
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
  setup(e, n) {
    let {
      attrs: t,
      slots: a
    } = n;
    const {
      groupBy: l
    } = Wo(e), {
      sortBy: o,
      multiSort: i,
      mustSort: s
    } = Lo(e), {
      page: u,
      itemsPerPage: r
    } = Po(e), {
      disableSort: c
    } = el(e), {
      columns: d,
      headers: f,
      sortFunctions: v,
      sortRawFunctions: g,
      filterFunctions: V
    } = Bo(e, {
      groupBy: l,
      showSelect: H(() => e.showSelect),
      showExpand: H(() => e.showExpand)
    }), {
      items: y
    } = ei(e, d), w = H(() => e.search), {
      filteredItems: m
    } = ho(e, y, w, {
      transform: (Z) => Z.columns,
      customKeyFilter: V
    }), {
      toggleSort: A
    } = Do({
      sortBy: o,
      multiSort: i,
      mustSort: s,
      page: u
    }), {
      sortByWithGroups: x,
      opened: k,
      extractRows: S,
      isGroupOpen: P,
      toggleGroup: b
    } = Uo({
      groupBy: l,
      sortBy: o,
      disableSort: c
    }), {
      sortedItems: $
    } = jr(e, m, x, {
      transform: (Z) => ({
        ...Z.raw,
        ...Z.columns
      }),
      sortFunctions: v,
      sortRawFunctions: g
    }), {
      flatItems: T
    } = Yo($, l, k), B = I(() => T.value.length), {
      startIndex: L,
      stopIndex: M,
      pageCount: W,
      setItemsPerPage: U
    } = Io({
      page: u,
      itemsPerPage: r,
      itemsLength: B
    }), {
      paginatedItems: Y
    } = Fr({
      items: T,
      startIndex: L,
      stopIndex: M,
      itemsPerPage: r
    }), te = I(() => S(Y.value)), {
      isSelected: ae,
      select: re,
      selectAll: _,
      toggleSelect: E,
      someSelected: F,
      allSelected: j
    } = Ro(e, {
      allItems: y,
      currentPage: te
    }), {
      isExpanded: be,
      toggleExpand: le
    } = Xo(e);
    ti({
      page: u,
      itemsPerPage: r,
      sortBy: o,
      groupBy: l,
      search: w
    }), at({
      VDataTableRows: {
        hideNoData: H(() => e.hideNoData),
        noDataText: H(() => e.noDataText),
        loading: H(() => e.loading),
        loadingText: H(() => e.loadingText)
      }
    });
    const ue = I(() => ({
      page: u.value,
      itemsPerPage: r.value,
      sortBy: o.value,
      pageCount: W.value,
      toggleSort: A,
      setItemsPerPage: U,
      someSelected: F.value,
      allSelected: j.value,
      isSelected: ae,
      select: re,
      selectAll: _,
      toggleSelect: E,
      isExpanded: be,
      toggleExpand: le,
      isGroupOpen: P,
      toggleGroup: b,
      items: te.value.map((Z) => Z.raw),
      internalItems: te.value,
      groupedItems: Y.value,
      columns: d.value,
      headers: f.value
    }));
    return ie(() => {
      const Z = da.filterProps(e), ce = fa.filterProps(e), ge = ma.filterProps(e), N = ga.filterProps(e);
      return h(ga, D({
        class: ["v-data-table", {
          "v-data-table--show-select": e.showSelect,
          "v-data-table--loading": e.loading
        }, e.class],
        style: e.style
      }, N, {
        fixedHeader: e.fixedHeader || e.sticky
      }), {
        top: () => {
          var Q;
          return (Q = a.top) == null ? void 0 : Q.call(a, ue.value);
        },
        default: () => {
          var Q, de, ye, Ce, Ee, De;
          return a.default ? a.default(ue.value) : C(X, null, [(Q = a.colgroup) == null ? void 0 : Q.call(a, ue.value), !e.hideDefaultHeader && C("thead", {
            key: "thead"
          }, [h(fa, ce, a)]), (de = a.thead) == null ? void 0 : de.call(a, ue.value), !e.hideDefaultBody && C("tbody", null, [(ye = a["body.prepend"]) == null ? void 0 : ye.call(a, ue.value), a.body ? a.body(ue.value) : h(ma, D(t, ge, {
            items: Y.value
          }), a), (Ce = a["body.append"]) == null ? void 0 : Ce.call(a, ue.value)]), (Ee = a.tbody) == null ? void 0 : Ee.call(a, ue.value), (De = a.tfoot) == null ? void 0 : De.call(a, ue.value)]);
        },
        bottom: () => a.bottom ? a.bottom(ue.value) : !e.hideDefaultFooter && C(X, null, [h(xa, null, null), h(da, Z, {
          prepend: a["footer.prepend"]
        })])
      });
    }), {};
  }
});
const nc = K({
  itemsLength: {
    type: [Number, String],
    required: !0
  },
  ...Vo(),
  ...ai(),
  ...Vl()
}, "VDataTableServer"), oc = ne()({
  name: "VDataTableServer",
  props: nc(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:page": (e) => !0,
    "update:itemsPerPage": (e) => !0,
    "update:sortBy": (e) => !0,
    "update:options": (e) => !0,
    "update:expanded": (e) => !0,
    "update:groupBy": (e) => !0
  },
  setup(e, n) {
    let {
      attrs: t,
      slots: a
    } = n;
    const {
      groupBy: l
    } = Wo(e), {
      sortBy: o,
      multiSort: i,
      mustSort: s
    } = Lo(e), {
      page: u,
      itemsPerPage: r
    } = Po(e), {
      disableSort: c
    } = el(e), d = I(() => parseInt(e.itemsLength, 10)), {
      columns: f,
      headers: v
    } = Bo(e, {
      groupBy: l,
      showSelect: H(() => e.showSelect),
      showExpand: H(() => e.showExpand)
    }), {
      items: g
    } = ei(e, f), {
      toggleSort: V
    } = Do({
      sortBy: o,
      multiSort: i,
      mustSort: s,
      page: u
    }), {
      opened: y,
      isGroupOpen: w,
      toggleGroup: m,
      extractRows: A
    } = Uo({
      groupBy: l,
      sortBy: o,
      disableSort: c
    }), {
      pageCount: x,
      setItemsPerPage: k
    } = Io({
      page: u,
      itemsPerPage: r,
      itemsLength: d
    }), {
      flatItems: S
    } = Yo(g, l, y), {
      isSelected: P,
      select: b,
      selectAll: $,
      toggleSelect: T,
      someSelected: B,
      allSelected: L
    } = Ro(e, {
      allItems: g,
      currentPage: g
    }), {
      isExpanded: M,
      toggleExpand: W
    } = Xo(e), U = I(() => A(g.value));
    ti({
      page: u,
      itemsPerPage: r,
      sortBy: o,
      groupBy: l,
      search: H(() => e.search)
    }), Ue("v-data-table", {
      toggleSort: V,
      sortBy: o
    }), at({
      VDataTableRows: {
        hideNoData: H(() => e.hideNoData),
        noDataText: H(() => e.noDataText),
        loading: H(() => e.loading),
        loadingText: H(() => e.loadingText)
      }
    });
    const Y = I(() => ({
      page: u.value,
      itemsPerPage: r.value,
      sortBy: o.value,
      pageCount: x.value,
      toggleSort: V,
      setItemsPerPage: k,
      someSelected: B.value,
      allSelected: L.value,
      isSelected: P,
      select: b,
      selectAll: $,
      toggleSelect: T,
      isExpanded: M,
      toggleExpand: W,
      isGroupOpen: w,
      toggleGroup: m,
      items: U.value.map((te) => te.raw),
      internalItems: U.value,
      groupedItems: S.value,
      columns: f.value,
      headers: v.value
    }));
    ie(() => {
      const te = da.filterProps(e), ae = fa.filterProps(e), re = ma.filterProps(e), _ = ga.filterProps(e);
      return h(ga, D({
        class: ["v-data-table", {
          "v-data-table--loading": e.loading
        }, e.class],
        style: e.style
      }, _, {
        fixedHeader: e.fixedHeader || e.sticky
      }), {
        top: () => {
          var E;
          return (E = a.top) == null ? void 0 : E.call(a, Y.value);
        },
        default: () => {
          var E, F, j, be, le, ue;
          return a.default ? a.default(Y.value) : C(X, null, [(E = a.colgroup) == null ? void 0 : E.call(a, Y.value), !e.hideDefaultHeader && C("thead", {
            key: "thead",
            class: "v-data-table__thead",
            role: "rowgroup"
          }, [h(fa, ae, a)]), (F = a.thead) == null ? void 0 : F.call(a, Y.value), !e.hideDefaultBody && C("tbody", {
            class: "v-data-table__tbody",
            role: "rowgroup"
          }, [(j = a["body.prepend"]) == null ? void 0 : j.call(a, Y.value), a.body ? a.body(Y.value) : h(ma, D(t, re, {
            items: S.value
          }), a), (be = a["body.append"]) == null ? void 0 : be.call(a, Y.value)]), (le = a.tbody) == null ? void 0 : le.call(a, Y.value), (ue = a.tfoot) == null ? void 0 : ue.call(a, Y.value)]);
        },
        bottom: () => a.bottom ? a.bottom(Y.value) : !e.hideDefaultFooter && C(X, null, [h(xa, null, null), h(da, te, {
          prepend: a["footer.prepend"]
        })])
      });
    });
  }
}), li = /* @__PURE__ */ Fe({
  __name: "OxListTable",
  props: {
    /** ModelList used to display objects **/
    list: Object,
    /** List items (cf. {@link useModelList}) **/
    items: Array,
    /** Table headers **/
    headers: Array,
    /** If True, display edit/view button **/
    edit: Boolean,
    /** If provided, use this item field as image **/
    image: String
  },
  setup(e) {
    const n = lt(), t = is(n, "item.", { exclude: ["item.actions", "item.image"] });
    ve("panel"), ve("user");
    const a = e, l = I(() => {
      const i = [];
      return (a.image || n["item.image"]) && i.push({ key: "image", title: "" }), i.concat(
        a.headers.reduce((s, u) => (s.push(
          typeof u == "string" ? { key: u, title: oe(Ei.field(u)) } : { key: u.key, title: oe(u.title) }
        ), s), [])
      );
    });
    function o(i) {
      const s = {
        ...a.list.filters,
        page: i.page,
        page_size: i.itemsPerPage,
        ordering: i.sortBy.map(({ key: u, order: r }) => r == "asc" ? u : `-${u}`)
      };
      a.list.page_size = i.itemsPerPage, a.list.load({ params: s });
    }
    return (i, s) => {
      var u;
      return R(), G(oc, {
        items: a.items,
        "item-index": "id",
        "items-length": a.list.count || a.items.length,
        "items-per-page": a.list.page_size,
        "hide-default-footer": (a.list.count || a.items.length || 0) < a.list.page_size,
        loading: (u = a.list.state) == null ? void 0 : u.isProcessing,
        headers: l.value,
        "no-data-text": p(oe)("lists.empty"),
        class: "align-top-table",
        "onUpdate:options": o
      }, st({
        "item.actions": O(({ item: r }) => [
          h(p(ko), {
            button: "",
            item: r,
            edit: a.edit
          }, null, 8, ["item", "edit"]),
          z(i.$slots, "item.actions", {
            item: r,
            dense: !0,
            button: !0
          })
        ]),
        _: 2
      }, [
        p(n)["item.image"] ? {
          name: "item.image",
          fn: O(({ item: r }) => [
            z(i.$slots, "item.image", { item: r }, () => [
              r[a.image] ? (R(), G(Bt, {
                key: 0,
                src: r[a.image],
                class: "preview",
                cover: "",
                "max-height": "200"
              }, null, 8, ["src"])) : se("", !0)
            ])
          ]),
          key: "0"
        } : void 0,
        Ae(p(t), (r, c) => ({
          name: c,
          fn: O((d) => [
            z(i.$slots, c, _e($e(d)))
          ])
        }))
      ]), 1032, ["items", "items-length", "items-per-page", "hide-default-footer", "loading", "headers", "no-data-text"]);
    };
  }
}), ic = { class: "d-flex flex-no-wrap justify-space-between" }, sc = { key: 0 }, uc = { key: 0 }, rc = /* @__PURE__ */ Fe({
  __name: "OxListCard",
  props: {
    /** ModelList used to display objects **/
    list: Object,
    /** List items (cf. {@link useModelList}) **/
    items: Array,
    /** Displayed fields, where the first value is set as title **/
    headers: Array,
    /** If True, display edit/view button **/
    edit: Boolean,
    /** Field name used as image **/
    image: String
  },
  setup(e) {
    const n = lt(), t = ct(n, "item.", { exclude: ["item.actions", "item.image"] }), a = e, l = I(() => {
      if (!a.headers)
        return [];
      const i = [];
      for (var s of a.headers)
        s = typeof s == "string" ? { key: s, title: oe("fields." + s) } : { ...s }, s.slot = `item.${s.key}`, i.push(s);
      return i;
    }), o = I(() => {
      var i;
      return /* @__PURE__ */ new Set([
        l.value[0].key,
        (i = l.value[1]) == null ? void 0 : i.key,
        a.image
      ]);
    });
    return We(() => !a.list.length && a.list.load()), (i, s) => (R(), G(Sn, { class: "card-grid" }, {
      default: O(() => [
        (R(!0), fe(X, null, Ae(a.items, (u) => {
          var r, c;
          return R(), G(xo, {
            key: u.id,
            density: "compact",
            title: l.value[0].key && u[l.value[0].key],
            subtitle: ((r = l.value[1]) == null ? void 0 : r.key) && u[l.value[1].key]
          }, st({
            default: O(() => [
              C("div", ic, [
                p(n)["item.image"] || a.image ? (R(), fe("div", sc, [
                  h(St, {
                    rounded: "0",
                    size: "125"
                  }, {
                    default: O(() => [
                      z(i.$slots, "item.image", { item: u }, () => [
                        h(Bt, {
                          src: a.image
                        }, null, 8, ["src"])
                      ], !0)
                    ]),
                    _: 2
                  }, 1024)
                ])) : se("", !0),
                C("div", null, [
                  !p(n)["item.default"] && (l.value.length > 2 || p(t).length) ? (R(), G(So, { key: 0 }, {
                    default: O(() => [
                      C("div", null, [
                        (R(!0), fe(X, null, Ae(l.value, (d) => (R(), fe(X, null, [
                          o.value.has(d.key) ? se("", !0) : (R(), fe("div", uc, [
                            h(hl, {
                              text: d.title + ":",
                              class: "mr-2"
                            }, null, 8, ["text"]),
                            z(i.$slots, d.slot, { item: u }, () => [
                              p(Wa.isEmpty)(u[d.key]) ? se("", !0) : (R(), fe(X, { key: 0 }, [
                                Pe(Me(u[d.key]), 1)
                              ], 64))
                            ], !0)
                          ]))
                        ], 64))), 256))
                      ])
                    ]),
                    _: 2
                  }, 1024)) : se("", !0),
                  h(po, null, {
                    default: O(() => [
                      h(p(ko), {
                        button: "",
                        item: u,
                        edit: a.edit,
                        size: "small"
                      }, null, 8, ["item", "edit"]),
                      z(i.$slots, "item.actions", {
                        item: u,
                        button: !0,
                        size: "small"
                      }, void 0, !0)
                    ]),
                    _: 2
                  }, 1024)
                ])
              ])
            ]),
            _: 2
          }, [
            p(n)[l.value[0].slot] ? {
              name: "title",
              fn: O(() => [
                z(i.$slots, l.value[0].slot, { item: u }, void 0, !0)
              ]),
              key: "0"
            } : void 0,
            p(n)[(c = l.value[1]) == null ? void 0 : c.slot] ? {
              name: "subtitle",
              fn: O(() => [
                z(i.$slots, l.value[1].slot, { item: u }, void 0, !0)
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["title", "subtitle"]);
        }), 128))
      ]),
      _: 3
    }));
  }
}), cc = (e, n) => {
  const t = e.__vccOpts || e;
  for (const [a, l] of n)
    t[a] = l;
  return t;
}, ni = /* @__PURE__ */ cc(rc, [["__scopeId", "data-v-5bbb1bbb"]]), Aa = {
  __name: "OxStateAlert",
  props: {
    state: Object,
    delay: { type: Boolean, default: !1 },
    okTitle: { type: String, default: "" },
    noneTitle: { type: String, default: "" },
    errorTitle: { type: String, default: "Oups..." },
    processingTitle: { type: String, default: "Processing..." }
  },
  setup(e) {
    const n = lt(), t = e;
    let a = q(!1);
    J(() => t.state.state, (i) => {
      t.delay && i == ss.PROCESSING && (a.value = !1, window.setTimeout(() => {
        a.value = !0;
      }, 5e3));
    });
    const l = I(() => {
      var i;
      return ((i = t.state) == null ? void 0 : i.isProcessing) && (!t.delay || a.value);
    }), o = I(() => {
      var i, s;
      return (s = (i = t.state) == null ? void 0 : i.data) == null ? void 0 : s.messages;
    });
    return (i, s) => (R(), fe(X, null, [
      t.state.isNone && p(n).none ? (R(), G(p(Ft), {
        key: 0,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        state: e.state,
        title: e.noneTitle
      }, {
        default: O(() => [
          z(i.$slots, "none", { state: e.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : l.value ? (R(), G(p(Ft), {
        key: 1,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: e.state,
        title: e.processingTitle
      }, {
        default: O(() => [
          z(i.$slots, "processing", { state: e.state }, () => [
            s[0] || (s[0] = Pe(" Data are being sent to server, please be patient. If this message persist you might wan't to retry. "))
          ])
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isError ? (R(), G(p(Ft), {
        key: 2,
        type: "error",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: e.state,
        title: e.errorTitle
      }, {
        default: O(() => [
          z(i.$slots, "error", { state: e.state }, () => [
            s[1] || (s[1] = Pe(" Oups... something wrong happened. "))
          ]),
          z(i.$slots, "error-detail", { state: e.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isOk ? (R(), G(p(Ft), {
        key: 3,
        type: "success",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: e.state,
        title: e.okTitle
      }, {
        default: O(() => [
          z(i.$slots, "ok", { state: e.state }, () => [
            s[2] || (s[2] = C("p", null, "Congrats! Data have been updated.", -1))
          ]),
          o.value ? (R(), fe(X, { key: 0 }, [
            h(xa),
            (R(!0), fe(X, null, Ae(o.value, (u) => (R(), fe("p", null, Me(u), 1))), 256))
          ], 64)) : se("", !0),
          z(i.$slots, "ok-detail", { state: e.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : se("", !0),
      z(i.$slots, "default", {
        state: t.state
      })
    ], 64));
  }
}, dc = { class: "text-right" }, Pl = {
  __name: "OxValidationBtn",
  props: {
    resetLabel: String,
    resetIcon: { type: String, default: "mdi-close-circle" },
    validateLabel: String,
    validateIcon: { type: String, default: "mdi-content-save" },
    processingLabel: String,
    processingIcon: { type: String, default: "mdi-content-save" },
    disabled: { type: Boolean, default: !1 },
    state: { type: Object, default: () => State.none() },
    validateDisabled: { type: Boolean, default: !1 }
  },
  emits: ["validate", "reset"],
  setup(e, { emit: n }) {
    const t = n, a = e;
    return (l, o) => (R(), fe("div", dc, [
      h(pe, {
        color: "error",
        class: "me-2",
        "prepend-icon": a.resetIcon,
        onClick: o[0] || (o[0] = (i) => t("reset")),
        disabled: a.disabled
      }, {
        default: O(() => [
          z(l.$slots, "discard", {}, () => [
            Pe(Me(a.resetLabel || p(Ba)("actions.discard")), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]),
      a.state.isSending || a.state.isProcessing ? (R(), G(pe, {
        key: 0,
        color: "primary",
        "prepend-icon": a.processingIcon,
        disabled: ""
      }, {
        default: O(() => [
          z(l.$slots, "processing", {}, () => [
            Pe(Me(a.processingLabel || p(Ba)("actions.saving")), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon"])) : (R(), G(pe, {
        key: 1,
        color: "primary",
        "prepend-icon": a.validateIcon,
        onClick: o[1] || (o[1] = (i) => t("validate")),
        disabled: a.disabled || a.validateDisabled
      }, {
        default: O(() => [
          z(l.$slots, "validate", {}, () => [
            Pe(Me(a.validateLabel || p(Ba)("actions.save")), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]))
    ]));
  }
}, vc = { key: 0 }, fc = { class: "text-right mt-3" }, mc = {
  __name: "OxLogin",
  props: {
    next: { type: String },
    url: { type: String }
  },
  emits: ["save", "saved"],
  setup(e, { emit: n }) {
    const t = sn("password"), a = e, l = Qe({
      username: "",
      password: ""
    }), o = q(!1), i = Qe(new us());
    function s(r = !0) {
      cs(l, { username: "", password: "" }), r && i.none();
    }
    async function u() {
      i.processing();
      try {
        const r = await fetch(a.url, {
          method: "POST",
          headers: rs.axiosConfig.headers,
          body: JSON.stringify(l)
        });
        r.status == 200 ? (l.credentials = "", l.password = "", i.ok(await r.json()), a.next && (window.location.href = a.next)) : i.error(await r.json());
      } catch (r) {
        i.ok((r == null ? void 0 : r.message) || r);
      }
    }
    return (r, c) => (R(), fe(X, null, [
      h(p(Aa), { state: i }, {
        none: O(({ state: d }) => c[7] || (c[7] = [
          C("p", null, "Please enter your credentials in order too proceed...", -1)
        ])),
        "ok-detail": O(({ state: d }) => [
          a.next ? (R(), fe("p", vc, [
            c[8] || (c[8] = Pe("You soon will be redirected to ")),
            C("i", null, Me(a.next), 1)
          ])) : se("", !0)
        ]),
        _: 1
      }, 8, ["state"]),
      i.isOk ? se("", !0) : (R(), fe(X, { key: 0 }, [
        h(vt, {
          variant: "underlined",
          label: "Enter login",
          modelValue: l.username,
          "onUpdate:modelValue": c[0] || (c[0] = (d) => l.username = d),
          onKeyup: c[1] || (c[1] = _l(Ie((d) => t.value.focus(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue"]),
        h(vt, {
          variant: "underlined",
          ref: "password",
          label: "Enter password",
          modelValue: l.password,
          "onUpdate:modelValue": c[2] || (c[2] = (d) => l.password = d),
          type: o.value ? "text" : "password",
          "append-icon": o.value ? "mdi-eye" : "mdi-eye-off",
          "onClick:append": c[3] || (c[3] = (d) => o.value = !o.value),
          onKeyup: c[4] || (c[4] = _l(Ie((d) => u(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue", "type", "append-icon"]),
        C("div", fc, [
          z(r.$slots, "default", {
            value: l.password
          }, () => [
            l.username && l.password ? (R(), G(Pl, {
              key: 0,
              "validate-label": "Login!",
              onValidate: c[5] || (c[5] = (d) => u()),
              onReset: c[6] || (c[6] = (d) => s()),
              state: i
            }, null, 8, ["state"])) : se("", !0)
          ])
        ])
      ], 64))
    ], 64));
  }
}, oi = /* @__PURE__ */ Fe({
  __name: "OxPanel",
  props: {
    index: {},
    view: {},
    value: {},
    state: {},
    help: {},
    name: {},
    title: {},
    icon: {}
  },
  setup(e) {
    const n = lt(), t = e, a = ct(n, "views."), l = q(!1);
    We(() => {
      l.value = !0;
    }), xi(() => {
      l.value = !1;
    });
    const o = ve("panels"), i = ve("panel");
    return (s, u) => (R(), fe(X, null, [
      t.state ? (R(), G(Aa, {
        key: 0,
        state: t.state,
        delay: ""
      }, null, 8, ["state"])) : se("", !0),
      p(n).prepend && p(o).panel == p(i).name ? z(s.$slots, "prepend", { key: 1 }) : se("", !0),
      h(wn, { class: "ma-4" }, {
        default: O(() => [
          (R(), G(Na, {
            to: "#app-bar-sheet-title",
            disabled: !l.value || p(o).panel != t.name
          }, [
            t.icon ? (R(), G(ke, {
              key: 0,
              icon: t.icon
            }, null, 8, ["icon"])) : se("", !0),
            Pe(" " + Me(t.title) + " ", 1),
            z(s.$slots, "append-title")
          ], 8, ["disabled"])),
          (R(), G(Na, {
            to: "#app-bar-right",
            disabled: !l.value || p(o).panel != t.name
          }, [
            z(s.$slots, "app-bar-right"),
            t.help ? (R(), G(pe, {
              key: 0,
              class: "ml-3",
              href: t.help,
              panels: "new",
              icon: "mdi-information-outline"
            }, null, 8, ["href"])) : se("", !0)
          ], 8, ["disabled"])),
          z(s.$slots, "top"),
          z(s.$slots, "default", {}, () => [
            p(a) ? (R(), G(Xa, {
              key: 0,
              modelValue: p(i).view,
              "onUpdate:modelValue": u[0] || (u[0] = (r) => p(i).view = r)
            }, {
              default: O(() => [
                (R(!0), fe(X, null, Ae(p(a), (r, c) => (R(), G(Za, {
                  key: r,
                  value: r
                }, {
                  default: O(() => [
                    z(s.$slots, c)
                  ]),
                  _: 2
                }, 1032, ["value"]))), 128))
              ]),
              _: 3
            }, 8, ["modelValue"])) : se("", !0)
          ]),
          z(s.$slots, "bottom")
        ]),
        _: 3
      }),
      p(n).append && p(o).panel == p(i).name ? z(s.$slots, "append", { key: 2 }) : se("", !0)
    ], 64));
  }
}), ii = /* @__PURE__ */ Fe({
  __name: "OxView",
  props: {
    /** default tab title */
    title: String
  },
  setup(e) {
    const n = e, t = q(null), a = lt(), l = ct(a, "tab.", { exclude: ["tab.default"] }), o = ct(a, "window.");
    return (i, s) => p(l) && Object.keys(p(l)).length ? (R(), fe(X, { key: 0 }, [
      h($u, {
        modelValue: t.value,
        "onUpdate:modelValue": s[0] || (s[0] = (u) => t.value = u)
      }, {
        default: O(() => [
          p(a).default ? z(i.$slots, "tab", { key: 0 }, () => [
            h(Ya, {
              text: n == null ? void 0 : n.title,
              value: "default"
            }, null, 8, ["text"])
          ]) : se("", !0),
          (R(!0), fe(X, null, Ae(p(l), (u, r) => (R(), G(Ya, { value: u }, {
            default: O(() => [
              z(i.$slots, r)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"]),
      h(gl, {
        modelValue: t.value,
        "onUpdate:modelValue": s[1] || (s[1] = (u) => t.value = u)
      }, {
        default: O(() => [
          p(a).default ? (R(), G(ra, {
            key: 0,
            value: "default"
          }, {
            default: O(() => [
              z(i.$slots, "default")
            ]),
            _: 3
          })) : se("", !0),
          (R(!0), fe(X, null, Ae(p(o), (u, r) => (R(), G(ra, { value: u }, {
            default: O(() => [
              z(i.$slots, r)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"])
    ], 64)) : z(i.$slots, "default", { key: 1 });
  }
}), si = /* @__PURE__ */ Fe({
  __name: "OxModelEditor",
  props: {
    repo: {},
    initial: {},
    name: {},
    url: {},
    saved: { type: Function }
  },
  setup(e, { expose: n }) {
    const t = q(null), a = ve("user"), l = e, { editor: o, edited: i } = Oi({ props: l }), s = I(() => a.can([o.repo.use, "change", l.initial])), u = I(() => ({
      editor: o,
      edited: i.value,
      form: t.value,
      editable: s.value,
      disabled: !s.value,
      value: o.value,
      model: o.repo.use
    }));
    return J(() => o.errors && Object.values(o.errors), () => t.value.validate()), n({ editor: o, edited: i, form: t, editable: s }), (r, c) => (R(), fe(X, null, [
      z(r.$slots, "prepend", _e($e(u.value))),
      h(Qa, {
        ref_key: "form",
        ref: t,
        modelValue: p(o).valid,
        "onUpdate:modelValue": c[0] || (c[0] = (d) => p(o).valid = d),
        disabled: !s.value
      }, {
        default: O(() => [
          z(r.$slots, "default", _e($e(u.value)))
        ]),
        _: 3
      }, 8, ["modelValue", "disabled"]),
      z(r.$slots, "append", _e($e(u.value)))
    ], 64));
  }
}), gc = { key: 0 }, yc = /* @__PURE__ */ Fe({
  __name: "OxModelEdit",
  props: {
    sendFormData: { type: Boolean },
    hideValidationBtn: { type: Boolean },
    repo: {},
    initial: {},
    name: {},
    url: {},
    saved: { type: Function }
  },
  emits: "saved",
  setup(e, { expose: n, emit: t }) {
    const a = t, l = e, o = q(null), i = I(() => {
      const { sendFormData: r, hideValidationBtn: c, ...d } = l;
      return d;
    });
    function s() {
      o.value.editor.reset(l.initial);
    }
    async function u() {
      const r = o.value, c = l.sendFormData ? await r.editor.save(new FormData(r.form.$el)) : await r.editor.save();
      return a("saved", o.value.editor), c;
    }
    return n({
      save: u,
      reset: s,
      get editor() {
        return o.value.editor;
      },
      get edited() {
        return o.value.edited;
      },
      get editable() {
        return o.value.editable;
      },
      get form() {
        return o.value.form;
      }
    }), (r, c) => {
      var d;
      return R(), fe(X, null, [
        (d = o.value) != null && d.editor ? (R(), G(Aa, {
          key: 0,
          state: o.value.editor.state
        }, null, 8, ["state"])) : se("", !0),
        h(Sn, { class: "ox-model-edit" }, {
          default: O(() => [
            h(p(si), D({
              ref_key: "modelEditor",
              ref: o
            }, i.value), {
              prepend: O((f) => [
                l.hideValidationBtn ? se("", !0) : (R(), fe("div", gc, [
                  z(r.$slots, "prepend", D(f, {
                    save: u,
                    reset: s
                  }), () => [
                    f.editable && f.edited ? (R(), G(Pl, {
                      key: 0,
                      onValidate: c[0] || (c[0] = (v) => u()),
                      onReset: c[1] || (c[1] = (v) => s()),
                      state: f.editor.state,
                      "validate-disabled": f.editor.valid === !1
                    }, null, 8, ["state", "validate-disabled"])) : se("", !0)
                  ])
                ]))
              ]),
              default: O((f) => [
                z(r.$slots, "default", D(f, {
                  save: u,
                  reset: s
                }))
              ]),
              append: O((f) => [
                z(r.$slots, "append", D(f, {
                  save: u,
                  reset: s
                }))
              ]),
              _: 3
            }, 16)
          ]),
          _: 3
        })
      ], 64);
    };
  }
}), hc = /* @__PURE__ */ Fe({
  __name: "OxModelPanel",
  props: {
    repo: {},
    view: {},
    headers: {},
    relations: {},
    showFilters: { type: Boolean },
    fetchRelations: { type: Boolean, default: !0 },
    search: { default: "search" },
    warning: {},
    index: { default: "list.table" },
    value: {},
    state: {},
    help: {},
    name: {},
    title: {},
    icon: {}
  },
  setup(e, { expose: n }) {
    const t = lt(), a = ct(t, "views.list."), l = ct(t, "item."), o = ct(t, "views.detail.edit."), i = I(() => !!Object.keys(o).length), s = sn("filters"), u = e, r = ve("context"), c = ve("user"), { panel: d, list: f, items: v, next: g, prev: V } = ve("panel") ?? Fi({ props: u }), y = d.panels;
    I(() => {
      var k;
      return r.user.can([d.model, (k = d.value) != null && k.id ? "change" : "add"]);
    });
    const { showFilters: w } = el(d), m = I(() => [
      ...u.headers,
      { key: "actions", title: oe("actions") }
    ]);
    function A(k) {
      k = new u.repo.use(k), d.show({ view: d.view, value: k }), f.load();
    }
    const x = I(() => ({
      panel: d,
      panels: y,
      list: f,
      items: v,
      context: r,
      saved: A,
      value: d.value
    }));
    return J(() => Object.values(f.filters), () => f.load()), n({ list: f, panel: d, items: v, next: g, prev: V }), (k, S) => (R(), G(p(oi), {
      name: u.name,
      title: p(d).title,
      icon: p(d).icon,
      state: p(f).state,
      index: u.index
    }, st({
      "app-bar-right": O(() => [
        z(k.$slots, "app-bar-right", _e($e(x.value))),
        p(d).view.startsWith("list.") ? (R(), G(Fl, {
          key: 0,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: O(() => [
            z(k.$slots, "nav.list", _e($e(x.value))),
            h(pe, {
              title: p(oe)("actions.list.reload"),
              "aria-label": p(oe)("actions.list.reload"),
              onClick: S[0] || (S[0] = (P) => p(f).load())
            }, {
              default: O(() => [
                h(ke, null, {
                  default: O(() => S[10] || (S[10] = [
                    Pe("mdi-reload")
                  ])),
                  _: 1,
                  __: [10]
                })
              ]),
              _: 1
            }, 8, ["title", "aria-label"]),
            s.value ? (R(), G(pe, {
              key: 0,
              title: p(w) ? p(oe)("filters.hide") : p(oe)("filters.show"),
              "aria-label": p(w) ? p(oe)("filters.hide") : p(oe)("filters.show"),
              onClick: S[1] || (S[1] = (P) => w.value = !p(w)),
              active: p(w)
            }, {
              default: O(() => [
                h(ke, {
                  icon: s.value.icon
                }, null, 8, ["icon"])
              ]),
              _: 1
            }, 8, ["title", "aria-label", "active"])) : se("", !0)
          ]),
          _: 3
        })) : p(d).view.startsWith("detail.") && p(d).value ? (R(), G(Fl, {
          key: 1,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: O(() => [
            z(k.$slots, "nav.detail", _e($e(x.value))),
            p(d).view == "detail.edit" && p(d).value ? (R(), G(wl, { key: 0 }, {
              activator: O(({ props: P }) => [
                h(pe, D({ "prepend-icon": "mdi-dots-vertical" }, P), {
                  default: O(() => [
                    Pe(Me(p(oe)("actions")), 1)
                  ]),
                  _: 2
                }, 1040)
              ]),
              default: O(() => [
                h(rt, null, {
                  default: O(() => [
                    z(k.$slots, "item.actions", {
                      item: p(d).value
                    })
                  ]),
                  _: 3
                })
              ]),
              _: 3
            })) : se("", !0),
            h(pe, {
              disabled: !p(V),
              title: p(oe)("prev"),
              "aria-label": p(oe)("prev"),
              onClick: S[2] || (S[2] = Ie((P) => p(d).show({ view: p(d).view, value: p(V) }), ["stop"]))
            }, {
              default: O(() => [
                h(ke, { icon: "mdi-chevron-left" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"]),
            h(pe, {
              disabled: !p(g),
              title: p(oe)("next"),
              "aria-label": p(oe)("next"),
              onClick: S[3] || (S[3] = Ie((P) => p(d).show({ view: p(d).view, value: p(g) }), ["stop"]))
            }, {
              default: O(() => [
                h(ke, { icon: "mdi-chevron-right" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"])
          ]),
          _: 3
        })) : se("", !0),
        h(Ki, {
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal",
          mandatory: "",
          modelValue: p(d).view,
          "onUpdate:modelValue": S[9] || (S[9] = (P) => p(d).view = P)
        }, {
          default: O(() => {
            var P;
            return [
              h(pe, {
                value: "list.table",
                onClickCapture: S[4] || (S[4] = Ie((b) => p(d).show({ view: "list.table" }), ["stop"])),
                title: p(oe)("panels.nav.table"),
                "aria-label": p(oe)("panels.nav.table")
              }, {
                default: O(() => [
                  h(ke, null, {
                    default: O(() => S[11] || (S[11] = [
                      Pe("mdi-table")
                    ])),
                    _: 1,
                    __: [11]
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"]),
              h(pe, {
                value: "list.cards",
                onClickCapture: S[5] || (S[5] = Ie((b) => p(d).show({ view: "list.cards" }), ["stop"])),
                title: p(oe)("panels.nav.cards"),
                "aria-label": p(oe)("panels.nav.cards")
              }, {
                default: O(() => [
                  h(ke, null, {
                    default: O(() => S[12] || (S[12] = [
                      Pe("mdi-view-grid")
                    ])),
                    _: 1,
                    __: [12]
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"]),
              p(t)["views.list.kanban"] ? (R(), G(pe, {
                key: 0,
                value: "list.kanban",
                onClickCapture: S[6] || (S[6] = Ie((b) => p(d).show({ view: "list.kanban" }), ["stop"])),
                title: p(oe)("panels.nav.kanban"),
                "aria-label": p(oe)("panels.nav.kanban")
              }, {
                default: O(() => [
                  h(ke, null, {
                    default: O(() => S[13] || (S[13] = [
                      Pe("mdi-view-column")
                    ])),
                    _: 1,
                    __: [13]
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : se("", !0),
              i.value ? (R(), G(pe, {
                key: 1,
                value: "detail.edit",
                onClickCapture: S[7] || (S[7] = Ie((b) => p(d).show({ view: "detail.edit", value: p(d).value }), ["stop"])),
                disabled: !((P = p(d).value) != null && P.id) && p(d).view != "detail.edit",
                title: p(oe)("panels.nav.edit"),
                "aria-label": p(oe)("panels.nav.edit")
              }, {
                default: O(() => [
                  p(c).can([p(d).model, "change"]) ? (R(), G(ke, { key: 0 }, {
                    default: O(() => S[14] || (S[14] = [
                      Pe("mdi-pencil")
                    ])),
                    _: 1,
                    __: [14]
                  })) : (R(), G(ke, { key: 1 }, {
                    default: O(() => S[15] || (S[15] = [
                      Pe("mdi-eye")
                    ])),
                    _: 1,
                    __: [15]
                  }))
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"])) : se("", !0),
              i.value && p(c).can([p(d).model, "add"]) ? (R(), G(pe, {
                key: 2,
                value: "detail.add",
                onClickCapture: S[8] || (S[8] = Ie((b) => p(d).create(), ["stop"])),
                title: p(oe)("panels.nav.add"),
                "aria-label": p(oe)("panels.nav.add")
              }, {
                default: O(() => [
                  h(ke, null, {
                    default: O(() => S[16] || (S[16] = [
                      Pe("mdi-plus-box")
                    ])),
                    _: 1,
                    __: [16]
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : se("", !0),
              z(k.$slots, "nav.views", _e($e(x.value)))
            ];
          }),
          _: 3
        }, 8, ["modelValue"]),
        z(k.$slots, "app-bar-end", _e($e(x.value)))
      ]),
      top: O(() => [
        u.warning ? (R(), G(Ft, {
          key: 0,
          type: "warning",
          variant: "tonal",
          text: u.warning
        }, null, 8, ["text"])) : se("", !0),
        z(k.$slots, "top"),
        Ye(h(p(bo), {
          ref_key: "filters",
          ref: s,
          search: u.search,
          "teleport-to": "#panel-list-actions"
        }, {
          default: O((P) => [
            z(k.$slots, "list.filters", _e($e(P)))
          ]),
          _: 3
        }, 8, ["search"]), [
          [_t, p(d).view.startsWith("list.") && p(w)]
        ])
      ]),
      _: 2
    }, [
      p(t)["append-title"] ? {
        name: "append-title",
        fn: O(() => [
          z(k.$slots, "append-title", _e($e(x.value)))
        ]),
        key: "0"
      } : void 0,
      p(t).prepend ? {
        name: "prepend",
        fn: O(() => [
          z(k.$slots, "prepend", _e($e(x.value)))
        ]),
        key: "1"
      } : void 0,
      p(t).append ? {
        name: "append",
        fn: O(() => [
          z(k.$slots, "append", _e($e(x.value)))
        ]),
        key: "2"
      } : void 0,
      p(t)["views.list.table"] ? void 0 : {
        name: "views.list.table",
        fn: O(() => [
          h(p(li), {
            list: p(f),
            items: p(v),
            headers: m.value,
            edit: i.value
          }, st({ _: 2 }, [
            Ae(p(l), (P, b) => ({
              name: b,
              fn: O(($) => [
                z(k.$slots, b, _e($e($)))
              ])
            }))
          ]), 1032, ["list", "items", "headers", "edit"])
        ]),
        key: "3"
      },
      p(t)["views.list.cards"] ? void 0 : {
        name: "views.list.cards",
        fn: O(() => [
          h(p(ni), {
            list: p(f),
            items: p(v),
            edit: i.value,
            headers: u.headers
          }, st({ _: 2 }, [
            Ae(p(l), (P, b) => ({
              name: b,
              fn: O(($) => [
                z(k.$slots, b, _e($e($)))
              ])
            }))
          ]), 1032, ["list", "items", "edit", "headers"])
        ]),
        key: "4"
      },
      Ae(p(a), (P, b) => ({
        name: b,
        fn: O(() => [
          z(k.$slots, b, _e($e(x.value)))
        ])
      })),
      i.value ? {
        name: "views.detail.edit",
        fn: O(() => [
          h(p(ii), {
            title: p(oe)(`models.${p(d).model.entity}`)
          }, st({ _: 2 }, [
            Ae(p(o), (P, b) => ({
              name: P,
              fn: O(() => [
                z(k.$slots, b, _e($e(x.value)))
              ])
            }))
          ]), 1032, ["title"])
        ]),
        key: "5"
      } : void 0
    ]), 1032, ["name", "title", "icon", "state", "index"]));
  }
}), bc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OxAction: Lt,
  OxActionModelDelete: ks,
  OxActionPost: Vs,
  OxApp: Eu,
  OxAutocomplete: gr,
  OxComponent: yr,
  OxField: pr,
  OxFormList: kr,
  OxListCard: ni,
  OxListFilters: bo,
  OxListKanban: $r,
  OxListTable: li,
  OxLogin: mc,
  OxModelEdit: yc,
  OxModelEditor: si,
  OxModelList: wr,
  OxModelPanel: hc,
  OxPanel: oi,
  OxStateAlert: Aa,
  OxValidationBtn: Pl,
  OxView: ii
}, Symbol.toStringTag, { value: "Module" })), Pc = {
  el: "#app",
  delimiters: ["[[", "]]"],
  components: { ...bc, ...ds }
};
export {
  Pc as App,
  Lt as OxAction,
  ks as OxActionModelDelete,
  Vs as OxActionPost,
  Eu as OxApp,
  gr as OxAutocomplete,
  yr as OxComponent,
  pr as OxField,
  kr as OxFormList,
  ni as OxListCard,
  bo as OxListFilters,
  $r as OxListKanban,
  li as OxListTable,
  mc as OxLogin,
  yc as OxModelEdit,
  si as OxModelEditor,
  wr as OxModelList,
  hc as OxModelPanel,
  oi as OxPanel,
  Aa as OxStateAlert,
  Pl as OxValidationBtn,
  ii as OxView
};
//# sourceMappingURL=components.js.map
