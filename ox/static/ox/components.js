import { inject as de, computed as P, ref as Y, reactive as Ge, toRef as N, shallowRef as X, onMounted as qe, provide as Me, useId as ft, onDeactivated as ql, onActivated as ai, onBeforeUnmount as mt, createVNode as c, Transition as Qt, mergeProps as H, defineComponent as je, useAttrs as Xl, createElementBlock as me, createCommentVNode as ue, unref as x, openBlock as M, Fragment as Z, createBlock as q, withModifiers as Ve, useSlots as st, renderSlot as G, normalizeProps as Pe, guardReactiveProps as Ie, resolveComponent as li, withCtx as O, createTextVNode as ke, toDisplayString as Be, renderList as _e, watch as J, watchEffect as Ze, onScopeDispose as Re, readonly as Zl, nextTick as $e, mergeModels as Ka, useModel as ja, effectScope as Ql, toValue as pl, toRaw as _a, warn as ni, Teleport as $a, withDirectives as Ye, vShow as Vt, resolveDirective as Ct, onErrorCaptured as oi, createElementVNode as ot, createSlots as wt, markRaw as ii, onBeforeMount as si, cloneVNode as ri, h as ui, normalizeClass as ci, onBeforeUpdate as di, capitalize as vi, toRefs as Ga, useTemplateRef as Jl, withKeys as wl, onUnmounted as fi } from "vue";
import { useAction as mi, t as ie, filterSlots as dt, useAppContext as gi, usePanels as yi, useQuery as hi, defineAsyncComponent as bi, tKeys as pi, useModelEditor as wi, useModelPanel as Si } from "ox";
import { u as St, V as ge, a as We, b as xi, c as Ea, d as Lt, e as da, f as lt, g as Mt, h as Pt, i as en, j as va, t as ki, k as oe, l as fa, m as Oe, n as Ne, o as gt, p as It, q as he, r as Rt, s as it, v as Vi, w as tn, x as Tt, y as At, z as Sl, A as pa, B as wa, C as xl, D as kl, E as Nt, F as Ci, M as ma, G as an, H as Ya, I as Ht, J as ln, K as nn, L as qa, N as Pi, O as zt, P as Xa, Q as Za, R as Qa, S as Vl, T as we, U as on, W as Bt, X as rt, Y as Ja, Z as sn, _ as Ii, $ as rn, a0 as un, a1 as xt, a2 as cn, a3 as dn, a4 as el, a5 as tl, a6 as al, a7 as Ti, a8 as Ai, a9 as vn, aa as Bi, ab as _i, ac as $i, ad as fn, ae as $t, af as Ei, ag as Cl, ah as Oi } from "./VContainer-gaJAYeAJ.js";
import { k as ll, l as mn, n as K, o as ve, q as Je, r as Fi, s as ee, C as gn, u as Ue, t as Di, v as et, w as He, x as ut, y as be, z as Qe, A as Fe, B as Wt, E as tt, F as yn, G as Li, H as at, J as hn, i as Le, K as Pl, M as kt, N as Mi, O as yt, P as bn, Q as Xe, R as ye, S as Oa, U as Ri, V as Ke, W as pn, X as De, Y as wn, Z as Sn, _ as Ni, $ as Hi, a0 as Sa, a1 as zi, a2 as Wi, a3 as pt, a4 as xn, a5 as Jt, a6 as Ui, c as Gt, a7 as Il, a8 as Ki, a9 as ea, aa as Yt } from "./theme-DfzFTMnZ.js";
import { T as ji, l as xa, O as Gi, F as Yi, t as ka, S as qi, o as Xi, r as Zi } from "./i18n-B0g_-nGW.js";
import "axios";
import { components as Qi } from "ox/vendor";
class nt {
  constructor(l) {
    let {
      x: t,
      y: a,
      width: n,
      height: o
    } = l;
    this.x = t, this.y = a, this.width = n, this.height = o;
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
function Tl(e, l) {
  return {
    x: {
      before: Math.max(0, l.left - e.left),
      after: Math.max(0, e.right - l.right)
    },
    y: {
      before: Math.max(0, l.top - e.top),
      after: Math.max(0, e.bottom - l.bottom)
    }
  };
}
function kn(e) {
  return Array.isArray(e) ? new nt({
    x: e[0],
    y: e[1],
    width: 0,
    height: 0
  }) : e.getBoundingClientRect();
}
function nl(e) {
  const l = e.getBoundingClientRect(), t = getComputedStyle(e), a = t.transform;
  if (a) {
    let n, o, i, s, r;
    if (a.startsWith("matrix3d("))
      n = a.slice(9, -1).split(/, /), o = Number(n[0]), i = Number(n[5]), s = Number(n[12]), r = Number(n[13]);
    else if (a.startsWith("matrix("))
      n = a.slice(7, -1).split(/, /), o = Number(n[0]), i = Number(n[3]), s = Number(n[4]), r = Number(n[5]);
    else
      return new nt(l);
    const u = t.transformOrigin, d = l.x - s - (1 - o) * parseFloat(u), v = l.y - r - (1 - i) * parseFloat(u.slice(u.indexOf(" ") + 1)), y = o ? l.width / o : e.offsetWidth + 1, f = i ? l.height / i : e.offsetHeight + 1;
    return new nt({
      x: d,
      y: v,
      width: y,
      height: f
    });
  } else
    return new nt(l);
}
function ct(e, l, t) {
  if (typeof e.animate > "u") return {
    finished: Promise.resolve()
  };
  let a;
  try {
    a = e.animate(l, t);
  } catch {
    return {
      finished: Promise.resolve()
    };
  }
  return typeof a.finished > "u" && (a.finished = new Promise((n) => {
    a.onfinish = () => {
      n(a);
    };
  })), a;
}
const Xt = /* @__PURE__ */ new WeakMap();
function Ji(e, l) {
  Object.keys(l).forEach((t) => {
    if (ll(t)) {
      const a = mn(t), n = Xt.get(e);
      if (l[t] == null)
        n == null || n.forEach((o) => {
          const [i, s] = o;
          i === a && (e.removeEventListener(a, s), n.delete(o));
        });
      else if (!n || ![...n].some((o) => o[0] === a && o[1] === l[t])) {
        e.addEventListener(a, l[t]);
        const o = n || /* @__PURE__ */ new Set();
        o.add([a, l[t]]), Xt.has(e) || Xt.set(e, o);
      }
    } else
      l[t] == null ? e.removeAttribute(t) : e.setAttribute(t, l[t]);
  });
}
function es(e, l) {
  Object.keys(l).forEach((t) => {
    if (ll(t)) {
      const a = mn(t), n = Xt.get(e);
      n == null || n.forEach((o) => {
        const [i, s] = o;
        i === a && (e.removeEventListener(a, s), n.delete(o));
      });
    } else
      e.removeAttribute(t);
  });
}
function Vn(e) {
  if (typeof e.getRootNode != "function") {
    for (; e.parentNode; ) e = e.parentNode;
    return e !== document ? null : document;
  }
  const l = e.getRootNode();
  return l !== document && l.getRootNode({
    composed: !0
  }) !== document ? null : l;
}
const Et = "cubic-bezier(0.4, 0, 0.2, 1)", ts = "cubic-bezier(0.0, 0, 0.2, 1)", as = "cubic-bezier(0.4, 0, 1, 1)";
function Al(e, l, t) {
  return Object.keys(e).filter((a) => ll(a) && a.endsWith(l)).reduce((a, n) => (a[n.slice(0, -l.length)] = (o) => e[n](o, t(o)), a), {});
}
function Cn(e) {
  let l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  for (; e; ) {
    if (l ? ls(e) : ol(e)) return e;
    e = e.parentElement;
  }
  return document.scrollingElement;
}
function ta(e, l) {
  const t = [];
  if (l && e && !l.contains(e)) return t;
  for (; e && (ol(e) && t.push(e), e !== l); )
    e = e.parentElement;
  return t;
}
function ol(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const l = window.getComputedStyle(e);
  return l.overflowY === "scroll" || l.overflowY === "auto" && e.scrollHeight > e.clientHeight;
}
function ls(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const l = window.getComputedStyle(e);
  return ["scroll", "auto"].includes(l.overflowY);
}
function ns(e) {
  for (; e; ) {
    if (window.getComputedStyle(e).position === "fixed")
      return !0;
    e = e.offsetParent;
  }
  return !1;
}
const Ot = Symbol.for("vuetify:layout"), Pn = Symbol.for("vuetify:layout-item"), Bl = 1e3, os = K({
  overlaps: {
    type: Array,
    default: () => []
  },
  fullHeight: Boolean
}, "layout"), In = K({
  name: {
    type: String
  },
  order: {
    type: [Number, String],
    default: 0
  },
  absolute: Boolean
}, "layout-item");
function Tn() {
  const e = de(Ot);
  if (!e) throw new Error("[Vuetify] Could not find injected layout");
  return {
    getLayoutItem: e.getLayoutItem,
    mainRect: e.mainRect,
    mainStyles: e.mainStyles
  };
}
function An(e) {
  const l = de(Ot);
  if (!l) throw new Error("[Vuetify] Could not find injected layout");
  const t = e.id ?? `layout-item-${ft()}`, a = Je("useLayoutItem");
  Me(Pn, {
    id: t
  });
  const n = X(!1);
  ql(() => n.value = !0), ai(() => n.value = !1);
  const {
    layoutItemStyles: o,
    layoutItemScrimStyles: i
  } = l.register(a, {
    ...e,
    active: P(() => n.value ? !1 : e.active.value),
    id: t
  });
  return mt(() => l.unregister(t)), {
    layoutItemStyles: o,
    layoutRect: l.layoutRect,
    layoutItemScrimStyles: i
  };
}
const is = (e, l, t, a) => {
  let n = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };
  const o = [{
    id: "",
    layer: {
      ...n
    }
  }];
  for (const i of e) {
    const s = l.get(i), r = t.get(i), u = a.get(i);
    if (!s || !r || !u) continue;
    const d = {
      ...n,
      [s.value]: parseInt(n[s.value], 10) + (u.value ? parseInt(r.value, 10) : 0)
    };
    o.push({
      id: i,
      layer: d
    }), n = d;
  }
  return o;
};
function ss(e) {
  const l = de(Ot, null), t = P(() => l ? l.rootZIndex.value - 100 : Bl), a = Y([]), n = Ge(/* @__PURE__ */ new Map()), o = Ge(/* @__PURE__ */ new Map()), i = Ge(/* @__PURE__ */ new Map()), s = Ge(/* @__PURE__ */ new Map()), r = Ge(/* @__PURE__ */ new Map()), {
    resizeRef: u,
    contentRect: d
  } = St(), v = P(() => {
    const C = /* @__PURE__ */ new Map(), T = e.overlaps ?? [];
    for (const b of T.filter((V) => V.includes(":"))) {
      const [V, A] = b.split(":");
      if (!a.value.includes(V) || !a.value.includes(A)) continue;
      const $ = n.get(V), R = n.get(A), F = o.get(V), U = o.get(A);
      !$ || !R || !F || !U || (C.set(A, {
        position: $.value,
        amount: parseInt(F.value, 10)
      }), C.set(V, {
        position: R.value,
        amount: -parseInt(U.value, 10)
      }));
    }
    return C;
  }), y = P(() => {
    const C = [...new Set([...i.values()].map((b) => b.value))].sort((b, V) => b - V), T = [];
    for (const b of C) {
      const V = a.value.filter((A) => {
        var $;
        return (($ = i.get(A)) == null ? void 0 : $.value) === b;
      });
      T.push(...V);
    }
    return is(T, n, o, s);
  }), f = P(() => !Array.from(r.values()).some((C) => C.value)), g = P(() => y.value[y.value.length - 1].layer), k = N(() => ({
    "--v-layout-left": ve(g.value.left),
    "--v-layout-right": ve(g.value.right),
    "--v-layout-top": ve(g.value.top),
    "--v-layout-bottom": ve(g.value.bottom),
    ...f.value ? void 0 : {
      transition: "none"
    }
  })), h = P(() => y.value.slice(1).map((C, T) => {
    let {
      id: b
    } = C;
    const {
      layer: V
    } = y.value[T], A = o.get(b), $ = n.get(b);
    return {
      id: b,
      ...V,
      size: Number(A.value),
      position: $.value
    };
  })), w = (C) => h.value.find((T) => T.id === C), m = Je("createLayout"), p = X(!1);
  qe(() => {
    p.value = !0;
  }), Me(Ot, {
    register: (C, T) => {
      let {
        id: b,
        order: V,
        position: A,
        layoutSize: $,
        elementSize: R,
        active: F,
        disableTransitions: U,
        absolute: j
      } = T;
      i.set(b, V), n.set(b, A), o.set(b, $), s.set(b, F), U && r.set(b, U);
      const te = Fi(Pn, m == null ? void 0 : m.vnode).indexOf(C);
      te > -1 ? a.value.splice(te, 0, b) : a.value.push(b);
      const se = P(() => h.value.findIndex((E) => E.id === b)), L = P(() => t.value + y.value.length * 2 - se.value * 2), B = P(() => {
        const E = A.value === "left" || A.value === "right", z = A.value === "right", ae = A.value === "bottom", ce = R.value ?? $.value, re = ce === 0 ? "%" : "px", Q = {
          [A.value]: 0,
          zIndex: L.value,
          transform: `translate${E ? "X" : "Y"}(${(F.value ? 0 : -(ce === 0 ? 100 : ce)) * (z || ae ? -1 : 1)}${re})`,
          position: j.value || t.value !== Bl ? "absolute" : "fixed",
          ...f.value ? void 0 : {
            transition: "none"
          }
        };
        if (!p.value) return Q;
        const ne = h.value[se.value];
        if (!ne) throw new Error(`[Vuetify] Could not find layout item "${b}"`);
        const pe = v.value.get(b);
        return pe && (ne[pe.position] += pe.amount), {
          ...Q,
          height: E ? `calc(100% - ${ne.top}px - ${ne.bottom}px)` : R.value ? `${R.value}px` : void 0,
          left: z ? void 0 : `${ne.left}px`,
          right: z ? `${ne.right}px` : void 0,
          top: A.value !== "bottom" ? `${ne.top}px` : void 0,
          bottom: A.value !== "top" ? `${ne.bottom}px` : void 0,
          width: E ? R.value ? `${R.value}px` : void 0 : `calc(100% - ${ne.left}px - ${ne.right}px)`
        };
      }), _ = P(() => ({
        zIndex: L.value - 1
      }));
      return {
        layoutItemStyles: B,
        layoutItemScrimStyles: _,
        zIndex: L
      };
    },
    unregister: (C) => {
      i.delete(C), n.delete(C), o.delete(C), s.delete(C), r.delete(C), a.value = a.value.filter((T) => T !== C);
    },
    mainRect: g,
    mainStyles: k,
    getLayoutItem: w,
    items: h,
    layoutRect: d,
    rootZIndex: t
  });
  const S = N(() => ["v-layout", {
    "v-layout--full-height": e.fullHeight
  }]), I = N(() => ({
    zIndex: l ? t.value : void 0,
    position: l ? "relative" : void 0,
    overflow: l ? "hidden" : void 0
  }));
  return {
    layoutClasses: S,
    layoutStyles: I,
    getLayoutItem: w,
    items: h,
    layoutRect: d,
    layoutRef: u
  };
}
const rs = K({
  target: [Object, Array]
}, "v-dialog-transition"), Va = /* @__PURE__ */ new WeakMap(), Bn = ee()({
  name: "VDialogTransition",
  props: rs(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = {
      onBeforeEnter(n) {
        n.style.pointerEvents = "none", n.style.visibility = "hidden";
      },
      async onEnter(n, o) {
        var f;
        await new Promise((g) => requestAnimationFrame(g)), await new Promise((g) => requestAnimationFrame(g)), n.style.visibility = "";
        const i = $l(e.target, n), {
          x: s,
          y: r,
          sx: u,
          sy: d,
          speed: v
        } = i;
        Va.set(n, i);
        const y = ct(n, [{
          transform: `translate(${s}px, ${r}px) scale(${u}, ${d})`,
          opacity: 0
        }, {}], {
          duration: 225 * v,
          easing: ts
        });
        (f = _l(n)) == null || f.forEach((g) => {
          ct(g, [{
            opacity: 0
          }, {
            opacity: 0,
            offset: 0.33
          }, {}], {
            duration: 225 * 2 * v,
            easing: Et
          });
        }), y.finished.then(() => o());
      },
      onAfterEnter(n) {
        n.style.removeProperty("pointer-events");
      },
      onBeforeLeave(n) {
        n.style.pointerEvents = "none";
      },
      async onLeave(n, o) {
        var f;
        await new Promise((g) => requestAnimationFrame(g));
        let i;
        !Va.has(n) || Array.isArray(e.target) || e.target.offsetParent || e.target.getClientRects().length ? i = $l(e.target, n) : i = Va.get(n);
        const {
          x: s,
          y: r,
          sx: u,
          sy: d,
          speed: v
        } = i;
        ct(n, [{}, {
          transform: `translate(${s}px, ${r}px) scale(${u}, ${d})`,
          opacity: 0
        }], {
          duration: 125 * v,
          easing: as
        }).finished.then(() => o()), (f = _l(n)) == null || f.forEach((g) => {
          ct(g, [{}, {
            opacity: 0,
            offset: 0.2
          }, {
            opacity: 0
          }], {
            duration: 125 * 2 * v,
            easing: Et
          });
        });
      },
      onAfterLeave(n) {
        n.style.removeProperty("pointer-events");
      }
    };
    return () => e.target ? c(Qt, H({
      name: "dialog-transition"
    }, a, {
      css: !1
    }), t) : c(Qt, {
      name: "dialog-transition"
    }, t);
  }
});
function _l(e) {
  var t;
  const l = (t = e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")) == null ? void 0 : t.children;
  return l && [...l];
}
function $l(e, l) {
  const t = kn(e), a = nl(l), [n, o] = getComputedStyle(l).transformOrigin.split(" ").map((w) => parseFloat(w)), [i, s] = getComputedStyle(l).getPropertyValue("--v-overlay-anchor-origin").split(" ");
  let r = t.left + t.width / 2;
  i === "left" || s === "left" ? r -= t.width / 2 : (i === "right" || s === "right") && (r += t.width / 2);
  let u = t.top + t.height / 2;
  i === "top" || s === "top" ? u -= t.height / 2 : (i === "bottom" || s === "bottom") && (u += t.height / 2);
  const d = t.width / a.width, v = t.height / a.height, y = Math.max(1, d, v), f = d / y || 0, g = v / y || 0, k = a.width * a.height / (window.innerWidth * window.innerHeight), h = k > 0.12 ? Math.min(1.5, (k - 0.12) * 10 + 1) : 1;
  return {
    x: r - (n + a.left),
    y: u - (o + a.top),
    sx: f,
    sy: g,
    speed: h
  };
}
const aa = /* @__PURE__ */ je({
  __name: "OxAction",
  props: {
    item: {},
    title: {},
    icon: {},
    color: {},
    button: { type: Boolean },
    confirm: {},
    permission: {},
    run: {},
    href: {}
  },
  emits: ["completed"],
  setup(e, { emit: l }) {
    const t = e, a = Xl(), n = l, o = de("user"), { run: i, processing: s, allowed: r } = mi({ user: o, emits: n, props: t });
    return (u, d) => x(r) ? (M(), me(Z, { key: 0 }, [
      t.button ? (M(), q(ge, H({
        key: 0,
        variant: "text"
      }, x(a), {
        disabled: x(s),
        color: t.color,
        icon: t.icon,
        title: t.title,
        "aria-label": t.title,
        onClick: Ve(x(i), ["stop"])
      }), null, 16, ["disabled", "color", "icon", "title", "aria-label", "onClick"])) : (M(), q(We, H({ key: 1 }, x(a), {
        title: t.title,
        "base-color": t.color,
        "prepend-icon": t.icon,
        disabled: x(s),
        onClick: Ve(x(i), ["stop"])
      }), null, 16, ["title", "base-color", "prepend-icon", "disabled", "onClick"]))
    ], 64)) : ue("", !0);
  }
}), us = /* @__PURE__ */ je({
  __name: "OxActionModelDelete",
  props: {
    item: {},
    button: { type: Boolean }
  },
  setup(e) {
    const l = de("panel"), t = de("repos"), a = e;
    async function n(o, i) {
      return await t[i.constructor.entity].api().delete(i.$url(), { delete: a.item.id });
    }
    return (o, i) => (M(), q(aa, {
      item: a.item,
      button: a.button,
      icon: "mdi-delete",
      color: "error",
      title: x(ie)("actions.delete"),
      confirm: x(ie)("actions.delete.confirm"),
      permission: [a.item.constructor, "delete"],
      run: n,
      onCompleted: i[0] || (i[0] = (s) => {
        var r;
        return (r = x(l)) == null ? void 0 : r.show({ view: x(l).index });
      })
    }, null, 8, ["item", "button", "title", "confirm", "permission"]));
  }
}), cs = {
  __name: "OxActions",
  props: {
    // Action's Props
    value: Object,
    dense: { type: Boolean, default: !1 },
    button: { type: Boolean, default: !1 },
    exclude: { type: Array }
  },
  setup(e) {
    st();
    const l = e;
    return (t, a) => (M(), me(Z, null, [
      G(t.$slots, "before", Pe(Ie(l))),
      G(t.$slots, "default", Pe(Ie(l))),
      G(t.$slots, "after", Pe(Ie(l)))
    ], 64));
  }
}, ds = /* @__PURE__ */ je({
  __name: "OxAppNavItem",
  props: {
    title: {},
    icon: {},
    name: {},
    url: {},
    permissions: {},
    type: {},
    items: {},
    order: {}
  },
  setup(e) {
    const l = e;
    Y(null);
    const t = de("user"), a = de("panels");
    P(() => !l.auto || panel.name == l.name);
    function n(i) {
      return i.permissions && !t.can(i.permissions) ? !1 : i.items ? i.items.some((s) => n(s)) : !0;
    }
    function o() {
      const i = { panel: l.name, href: l.url };
      a.show(i);
    }
    return (i, s) => {
      const r = li("ox-app-nav-item", !0);
      return n(l) ? (M(), me(Z, { key: 0 }, [
        l.type == "subheader" ? (M(), me(Z, { key: 0 }, [
          c(xi, null, {
            default: O(() => [
              ke(Be(l.title), 1)
            ]),
            _: 1
          }),
          l.items ? (M(!0), me(Z, { key: 0 }, _e(l.items, (u) => (M(), q(r, H({ ref_for: !0 }, u), null, 16))), 256)) : ue("", !0)
        ], 64)) : l.type == "group" ? (M(), q(Ea, {
          key: 1,
          value: l.name
        }, {
          activator: O(({ props: u }) => [
            c(We, H(u, {
              title: l.title,
              "prepend-icon": l.icon
            }), null, 16, ["title", "prepend-icon"])
          ]),
          default: O(() => [
            (M(!0), me(Z, null, _e(l.items, (u, d) => (M(), q(r, H({
              key: d,
              ref_for: !0
            }, u), null, 16))), 128))
          ]),
          _: 1
        }, 8, ["value"])) : l.type == "divider" ? (M(), q(Lt, { key: 2 })) : (M(), q(We, {
          key: 3,
          active: x(a).panel == l.name,
          value: l.name,
          "prepend-icon": l.icon,
          title: l.title,
          onClick: Ve(o, ["stop"])
        }, null, 8, ["active", "value", "prepend-icon", "title"]))
      ], 64)) : ue("", !0);
    };
  }
});
function vs(e) {
  let {
    rootEl: l,
    isSticky: t,
    layoutItemStyles: a
  } = e;
  const n = X(!1), o = X(0), i = P(() => {
    const u = typeof n.value == "boolean" ? "top" : n.value;
    return [t.value ? {
      top: "auto",
      bottom: "auto",
      height: void 0
    } : void 0, n.value ? {
      [u]: ve(o.value)
    } : {
      top: a.value.top
    }];
  });
  qe(() => {
    J(t, (u) => {
      u ? window.addEventListener("scroll", r, {
        passive: !0
      }) : window.removeEventListener("scroll", r);
    }, {
      immediate: !0
    });
  }), mt(() => {
    window.removeEventListener("scroll", r);
  });
  let s = 0;
  function r() {
    const u = s > window.scrollY ? "up" : "down", d = l.value.getBoundingClientRect(), v = parseFloat(a.value.top ?? 0), y = window.scrollY - Math.max(0, o.value - v), f = d.height + Math.max(o.value, v) - window.scrollY - window.innerHeight, g = parseFloat(getComputedStyle(l.value).getPropertyValue("--v-body-scroll-y")) || 0;
    d.height < window.innerHeight - v ? (n.value = "top", o.value = v) : u === "up" && n.value === "bottom" || u === "down" && n.value === "top" ? (o.value = window.scrollY + d.top - g, n.value = !0) : u === "down" && f <= 0 ? (o.value = 0, n.value = "bottom") : u === "up" && y <= 0 && (g ? n.value !== "top" && (o.value = -y + g + v, n.value = "top") : (o.value = d.top + y, n.value = "top")), s = window.scrollY;
  }
  return {
    isStuck: n,
    stickyStyles: i
  };
}
const fs = 100, ms = 20;
function El(e) {
  return (e < 0 ? -1 : 1) * Math.sqrt(Math.abs(e)) * 1.41421356237;
}
function Ol(e) {
  if (e.length < 2)
    return 0;
  if (e.length === 2)
    return e[1].t === e[0].t ? 0 : (e[1].d - e[0].d) / (e[1].t - e[0].t);
  let l = 0;
  for (let t = e.length - 1; t > 0; t--) {
    if (e[t].t === e[t - 1].t)
      continue;
    const a = El(l), n = (e[t].d - e[t - 1].d) / (e[t].t - e[t - 1].t);
    l += (n - a) * Math.abs(n), t === e.length - 1 && (l *= 0.5);
  }
  return El(l) * 1e3;
}
function gs() {
  const e = {};
  function l(n) {
    Array.from(n.changedTouches).forEach((o) => {
      (e[o.identifier] ?? (e[o.identifier] = new gn(ms))).push([n.timeStamp, o]);
    });
  }
  function t(n) {
    Array.from(n.changedTouches).forEach((o) => {
      delete e[o.identifier];
    });
  }
  function a(n) {
    var u;
    const o = (u = e[n]) == null ? void 0 : u.values().reverse();
    if (!o)
      throw new Error(`No samples for touch id ${n}`);
    const i = o[0], s = [], r = [];
    for (const d of o) {
      if (i[0] - d[0] > fs) break;
      s.push({
        t: d[0],
        d: d[1].clientX
      }), r.push({
        t: d[0],
        d: d[1].clientY
      });
    }
    return {
      x: Ol(s),
      y: Ol(r),
      get direction() {
        const {
          x: d,
          y: v
        } = this, [y, f] = [Math.abs(d), Math.abs(v)];
        return y > f && d >= 0 ? "right" : y > f && d <= 0 ? "left" : f > y && v >= 0 ? "down" : f > y && v <= 0 ? "up" : ys();
      }
    };
  }
  return {
    addMovement: l,
    endTouch: t,
    getVelocity: a
  };
}
function ys() {
  throw new Error();
}
function hs(e) {
  let {
    el: l,
    isActive: t,
    isTemporary: a,
    width: n,
    touchless: o,
    position: i
  } = e;
  qe(() => {
    window.addEventListener("touchstart", m, {
      passive: !0
    }), window.addEventListener("touchmove", p, {
      passive: !1
    }), window.addEventListener("touchend", S, {
      passive: !0
    });
  }), mt(() => {
    window.removeEventListener("touchstart", m), window.removeEventListener("touchmove", p), window.removeEventListener("touchend", S);
  });
  const s = P(() => ["left", "right"].includes(i.value)), {
    addMovement: r,
    endTouch: u,
    getVelocity: d
  } = gs();
  let v = !1;
  const y = X(!1), f = X(0), g = X(0);
  let k;
  function h(C, T) {
    return (i.value === "left" ? C : i.value === "right" ? document.documentElement.clientWidth - C : i.value === "top" ? C : i.value === "bottom" ? document.documentElement.clientHeight - C : bt()) - (T ? n.value : 0);
  }
  function w(C) {
    let T = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    const b = i.value === "left" ? (C - g.value) / n.value : i.value === "right" ? (document.documentElement.clientWidth - C - g.value) / n.value : i.value === "top" ? (C - g.value) / n.value : i.value === "bottom" ? (document.documentElement.clientHeight - C - g.value) / n.value : bt();
    return T ? Math.max(0, Math.min(1, b)) : b;
  }
  function m(C) {
    if (o.value) return;
    const T = C.changedTouches[0].clientX, b = C.changedTouches[0].clientY, V = 25, A = i.value === "left" ? T < V : i.value === "right" ? T > document.documentElement.clientWidth - V : i.value === "top" ? b < V : i.value === "bottom" ? b > document.documentElement.clientHeight - V : bt(), $ = t.value && (i.value === "left" ? T < n.value : i.value === "right" ? T > document.documentElement.clientWidth - n.value : i.value === "top" ? b < n.value : i.value === "bottom" ? b > document.documentElement.clientHeight - n.value : bt());
    (A || $ || t.value && a.value) && (k = [T, b], g.value = h(s.value ? T : b, t.value), f.value = w(s.value ? T : b), v = g.value > -20 && g.value < 80, u(C), r(C));
  }
  function p(C) {
    const T = C.changedTouches[0].clientX, b = C.changedTouches[0].clientY;
    if (v) {
      if (!C.cancelable) {
        v = !1;
        return;
      }
      const A = Math.abs(T - k[0]), $ = Math.abs(b - k[1]);
      (s.value ? A > $ && A > 3 : $ > A && $ > 3) ? (y.value = !0, v = !1) : (s.value ? $ : A) > 3 && (v = !1);
    }
    if (!y.value) return;
    C.preventDefault(), r(C);
    const V = w(s.value ? T : b, !1);
    f.value = Math.max(0, Math.min(1, V)), V > 1 ? g.value = h(s.value ? T : b, !0) : V < 0 && (g.value = h(s.value ? T : b, !1));
  }
  function S(C) {
    if (v = !1, !y.value) return;
    r(C), y.value = !1;
    const T = d(C.changedTouches[0].identifier), b = Math.abs(T.x), V = Math.abs(T.y);
    (s.value ? b > V && b > 400 : V > b && V > 3) ? t.value = T.direction === ({
      left: "right",
      right: "left",
      top: "down",
      bottom: "up"
    }[i.value] || bt()) : t.value = f.value > 0.5;
  }
  const I = P(() => y.value ? {
    transform: i.value === "left" ? `translateX(calc(-100% + ${f.value * n.value}px))` : i.value === "right" ? `translateX(calc(100% - ${f.value * n.value}px))` : i.value === "top" ? `translateY(calc(-100% + ${f.value * n.value}px))` : i.value === "bottom" ? `translateY(calc(100% - ${f.value * n.value}px))` : bt(),
    transition: "none"
  } : void 0);
  return Ue(y, () => {
    var b, V;
    const C = ((b = l.value) == null ? void 0 : b.style.transform) ?? null, T = ((V = l.value) == null ? void 0 : V.style.transition) ?? null;
    Ze(() => {
      var A, $, R, F;
      ($ = l.value) == null || $.style.setProperty("transform", ((A = I.value) == null ? void 0 : A.transform) || "none"), (F = l.value) == null || F.style.setProperty("transition", ((R = I.value) == null ? void 0 : R.transition) || null);
    }), Re(() => {
      var A, $;
      (A = l.value) == null || A.style.setProperty("transform", C), ($ = l.value) == null || $.style.setProperty("transition", T);
    });
  }), {
    isDragging: y,
    dragProgress: f,
    dragStyles: I
  };
}
function bt() {
  throw new Error();
}
const _n = K({
  closeDelay: [Number, String],
  openDelay: [Number, String]
}, "delay");
function $n(e, l) {
  let t = () => {
  };
  function a(i) {
    t == null || t();
    const s = Number(i ? e.openDelay : e.closeDelay);
    return new Promise((r) => {
      t = Di(s, () => {
        l == null || l(i), r(i);
      });
    });
  }
  function n() {
    return a(!0);
  }
  function o() {
    return a(!1);
  }
  return {
    clearDelay: t,
    runOpenDelay: n,
    runCloseDelay: o
  };
}
function Ut() {
  const l = Je("useScopeId").vnode.scopeId;
  return {
    scopeId: l ? {
      [l]: ""
    } : void 0
  };
}
const bs = ["start", "end", "left", "right", "top", "bottom"], ps = K({
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
    validator: (e) => bs.includes(e)
  },
  sticky: Boolean,
  ...Rt(),
  ...he(),
  ..._n(),
  ...Wt({
    mobile: null
  }),
  ...It(),
  ...In(),
  ...gt(),
  ...Ne({
    tag: "nav"
  }),
  ...Fe()
}, "VNavigationDrawer"), ws = ee()({
  name: "VNavigationDrawer",
  props: ps(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:rail": (e) => !0
  },
  setup(e, l) {
    let {
      attrs: t,
      emit: a,
      slots: n
    } = l;
    const {
      isRtl: o
    } = et(), {
      themeClasses: i
    } = He(e), {
      borderClasses: s
    } = da(e), {
      backgroundColorClasses: r,
      backgroundColorStyles: u
    } = lt(() => e.color), {
      elevationClasses: d
    } = Mt(e), {
      displayClasses: v,
      mobile: y
    } = ut(e), {
      roundedClasses: f
    } = Pt(e), g = en(), k = be(e, "modelValue", null, (B) => !!B), {
      ssrBootStyles: h
    } = va(), {
      scopeId: w
    } = Ut(), m = Y(), p = X(!1), {
      runOpenDelay: S,
      runCloseDelay: I
    } = $n(e, (B) => {
      p.value = B;
    }), C = P(() => e.rail && e.expandOnHover && p.value ? Number(e.width) : Number(e.rail ? e.railWidth : e.width)), T = P(() => ki(e.location, o.value)), b = N(() => e.persistent), V = P(() => !e.permanent && (y.value || e.temporary)), A = P(() => e.sticky && !V.value && T.value !== "bottom");
    Ue(() => e.expandOnHover && e.rail != null, () => {
      J(p, (B) => a("update:rail", !B));
    }), Ue(() => !e.disableResizeWatcher, () => {
      J(V, (B) => !e.permanent && $e(() => k.value = !B));
    }), Ue(() => !e.disableRouteWatcher && !!g, () => {
      J(g.currentRoute, () => V.value && (k.value = !1));
    }), J(() => e.permanent, (B) => {
      B && (k.value = !0);
    }), e.modelValue == null && !V.value && (k.value = e.permanent || !y.value);
    const {
      isDragging: $,
      dragProgress: R
    } = hs({
      el: m,
      isActive: k,
      isTemporary: V,
      width: C,
      touchless: N(() => e.touchless),
      position: T
    }), F = P(() => {
      const B = V.value ? 0 : e.rail && e.expandOnHover ? Number(e.railWidth) : C.value;
      return $.value ? B * R.value : B;
    }), {
      layoutItemStyles: U,
      layoutItemScrimStyles: j
    } = An({
      id: e.name,
      order: P(() => parseInt(e.order, 10)),
      position: T,
      layoutSize: F,
      elementSize: C,
      active: Zl(k),
      disableTransitions: N(() => $.value),
      absolute: P(() => (
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        e.absolute || A.value && typeof W.value != "string"
      ))
    }), {
      isStuck: W,
      stickyStyles: te
    } = vs({
      rootEl: m,
      isSticky: A,
      layoutItemStyles: U
    }), se = lt(() => typeof e.scrim == "string" ? e.scrim : null), L = P(() => ({
      ...$.value ? {
        opacity: R.value * 0.2,
        transition: "none"
      } : void 0,
      ...j.value
    }));
    return Qe({
      VList: {
        bgColor: "transparent"
      }
    }), oe(() => {
      const B = n.image || e.image;
      return c(Z, null, [c(e.tag, H({
        ref: m,
        onMouseenter: S,
        onMouseleave: I,
        class: ["v-navigation-drawer", `v-navigation-drawer--${T.value}`, {
          "v-navigation-drawer--expand-on-hover": e.expandOnHover,
          "v-navigation-drawer--floating": e.floating,
          "v-navigation-drawer--is-hovering": p.value,
          "v-navigation-drawer--rail": e.rail,
          "v-navigation-drawer--temporary": V.value,
          "v-navigation-drawer--persistent": b.value,
          "v-navigation-drawer--active": k.value,
          "v-navigation-drawer--sticky": A.value
        }, i.value, r.value, s.value, v.value, d.value, f.value, e.class],
        style: [u.value, U.value, h.value, te.value, e.style]
      }, w, t), {
        default: () => {
          var _, E, z;
          return [B && c("div", {
            key: "image",
            class: "v-navigation-drawer__img"
          }, [n.image ? c(Oe, {
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
          }, n.image) : c(fa, {
            key: "image-img",
            alt: "",
            cover: !0,
            height: "inherit",
            src: e.image
          }, null)]), n.prepend && c("div", {
            class: "v-navigation-drawer__prepend"
          }, [(_ = n.prepend) == null ? void 0 : _.call(n)]), c("div", {
            class: "v-navigation-drawer__content"
          }, [(E = n.default) == null ? void 0 : E.call(n)]), n.append && c("div", {
            class: "v-navigation-drawer__append"
          }, [(z = n.append) == null ? void 0 : z.call(n)])];
        }
      }), c(Qt, {
        name: "fade-transition"
      }, {
        default: () => [V.value && ($.value || k.value) && !!e.scrim && c("div", H({
          class: ["v-navigation-drawer__scrim", se.backgroundColorClasses.value],
          style: [L.value, se.backgroundColorStyles.value],
          onClick: () => {
            b.value || (k.value = !1);
          }
        }, w), null)]
      })]);
    }), {
      isStuck: W
    };
  }
}), Ss = {
  __name: "OxAppNav",
  props: /* @__PURE__ */ Ka({
    items: Array
  }, {
    drawer: {},
    drawerModifiers: {}
  }),
  emits: ["update:drawer"],
  setup(e) {
    de("context");
    const l = de("panels"), t = ja(e, "drawer"), a = Y([]), n = e, o = P(() => (i(n.items), n.items));
    function i(r) {
      a.value = s(r);
    }
    function s(r) {
      if (l.panel) {
        for (const u of r)
          if (u.items) {
            const d = s(u.items);
            if (d)
              return [d, u.name];
          } else if (u.name == l.panel)
            return [u.name];
      }
    }
    return (r, u) => (M(), q(ws, {
      modelValue: t.value,
      "onUpdate:modelValue": u[1] || (u[1] = (d) => t.value = d),
      theme: "dark"
    }, {
      append: O(() => [
        c(it, null, {
          default: O(() => [
            G(r.$slots, "append")
          ]),
          _: 3
        })
      ]),
      default: O(() => [
        G(r.$slots, "prepend"),
        c(it, {
          opened: a.value,
          "onUpdate:opened": u[0] || (u[0] = (d) => a.value = d),
          density: "compact"
        }, {
          default: O(() => [
            (M(!0), me(Z, null, _e(o.value, (d, v) => (M(), q(x(ds), H({
              key: v,
              ref_for: !0
            }, d), null, 16))), 128))
          ]),
          _: 1
        }, 8, ["opened"])
      ]),
      _: 3
    }, 8, ["modelValue"]));
  }
}, xs = K({
  ...he(),
  ...os({
    fullHeight: !0
  }),
  ...Fe()
}, "VApp"), ks = ee()({
  name: "VApp",
  props: xs(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = He(e), {
      layoutClasses: n,
      getLayoutItem: o,
      items: i,
      layoutRef: s
    } = ss(e), {
      rtlClasses: r
    } = et();
    return oe(() => {
      var u;
      return c("div", {
        ref: s,
        class: ["v-application", a.themeClasses.value, n.value, r.value, e.class],
        style: [e.style]
      }, [c("div", {
        class: "v-application__wrap"
      }, [(u = t.default) == null ? void 0 : u.call(t)])]);
    }), {
      getLayoutItem: o,
      items: i,
      theme: a
    };
  }
}), En = K({
  text: String,
  ...he(),
  ...Ne()
}, "VToolbarTitle"), On = ee()({
  name: "VToolbarTitle",
  props: En(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    return oe(() => {
      const a = !!(t.default || t.text || e.text);
      return c(e.tag, {
        class: ["v-toolbar-title", e.class],
        style: e.style
      }, {
        default: () => {
          var n;
          return [a && c("div", {
            class: "v-toolbar-title__placeholder"
          }, [t.text ? t.text() : e.text, (n = t.default) == null ? void 0 : n.call(t)])];
        }
      });
    }), {};
  }
}), Vs = [null, "prominent", "default", "comfortable", "compact"], Fn = K({
  absolute: Boolean,
  collapse: Boolean,
  color: String,
  density: {
    type: String,
    default: "default",
    validator: (e) => Vs.includes(e)
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
  ...Rt(),
  ...he(),
  ...It(),
  ...gt(),
  ...Ne({
    tag: "header"
  }),
  ...Fe()
}, "VToolbar"), Fa = ee()({
  name: "VToolbar",
  props: Fn(),
  setup(e, l) {
    var f;
    let {
      slots: t
    } = l;
    const {
      backgroundColorClasses: a,
      backgroundColorStyles: n
    } = lt(() => e.color), {
      borderClasses: o
    } = da(e), {
      elevationClasses: i
    } = Mt(e), {
      roundedClasses: s
    } = Pt(e), {
      themeClasses: r
    } = He(e), {
      rtlClasses: u
    } = et(), d = X(!!(e.extended || (f = t.extension) != null && f.call(t))), v = P(() => parseInt(Number(e.height) + (e.density === "prominent" ? Number(e.height) : 0) - (e.density === "comfortable" ? 8 : 0) - (e.density === "compact" ? 16 : 0), 10)), y = P(() => d.value ? parseInt(Number(e.extensionHeight) + (e.density === "prominent" ? Number(e.extensionHeight) : 0) - (e.density === "comfortable" ? 4 : 0) - (e.density === "compact" ? 8 : 0), 10) : 0);
    return Qe({
      VBtn: {
        variant: "text"
      }
    }), oe(() => {
      var w;
      const g = !!(e.title || t.title), k = !!(t.image || e.image), h = (w = t.extension) == null ? void 0 : w.call(t);
      return d.value = !!(e.extended || h), c(e.tag, {
        class: ["v-toolbar", {
          "v-toolbar--absolute": e.absolute,
          "v-toolbar--collapse": e.collapse,
          "v-toolbar--flat": e.flat,
          "v-toolbar--floating": e.floating,
          [`v-toolbar--density-${e.density}`]: !0
        }, a.value, o.value, i.value, s.value, r.value, u.value, e.class],
        style: [n.value, e.style]
      }, {
        default: () => [k && c("div", {
          key: "image",
          class: "v-toolbar__image"
        }, [t.image ? c(Oe, {
          key: "image-defaults",
          disabled: !e.image,
          defaults: {
            VImg: {
              cover: !0,
              src: e.image
            }
          }
        }, t.image) : c(fa, {
          key: "image-img",
          cover: !0,
          src: e.image
        }, null)]), c(Oe, {
          defaults: {
            VTabs: {
              height: ve(v.value)
            }
          }
        }, {
          default: () => {
            var m, p, S;
            return [c("div", {
              class: "v-toolbar__content",
              style: {
                height: ve(v.value)
              }
            }, [t.prepend && c("div", {
              class: "v-toolbar__prepend"
            }, [(m = t.prepend) == null ? void 0 : m.call(t)]), g && c(On, {
              key: "title",
              text: e.title
            }, {
              text: t.title
            }), (p = t.default) == null ? void 0 : p.call(t), t.append && c("div", {
              class: "v-toolbar__append"
            }, [(S = t.append) == null ? void 0 : S.call(t)])])];
          }
        }), c(Oe, {
          defaults: {
            VTabs: {
              height: ve(y.value)
            }
          }
        }, {
          default: () => [c(Vi, null, {
            default: () => [d.value && c("div", {
              class: "v-toolbar__extension",
              style: {
                height: ve(y.value)
              }
            }, [h])]
          })]
        })]
      });
    }), {
      contentHeight: v,
      extensionHeight: y
    };
  }
}), Cs = K({
  scrollTarget: {
    type: String
  },
  scrollThreshold: {
    type: [String, Number],
    default: 300
  }
}, "scroll");
function Ps(e) {
  let l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    canScroll: t
  } = l;
  let a = 0, n = 0;
  const o = Y(null), i = X(0), s = X(0), r = X(0), u = X(!1), d = X(!1), v = P(() => Number(e.scrollThreshold)), y = P(() => tt((v.value - i.value) / v.value || 0)), f = () => {
    const g = o.value;
    if (!g || t && !t.value) return;
    a = i.value, i.value = "window" in g ? g.pageYOffset : g.scrollTop;
    const k = g instanceof Window ? document.documentElement.scrollHeight : g.scrollHeight;
    if (n !== k) {
      n = k;
      return;
    }
    d.value = i.value < a, r.value = Math.abs(i.value - v.value);
  };
  return J(d, () => {
    s.value = s.value || i.value;
  }), J(u, () => {
    s.value = 0;
  }), qe(() => {
    J(() => e.scrollTarget, (g) => {
      var h;
      const k = g ? document.querySelector(g) : window;
      if (!k) {
        yn(`Unable to locate element with identifier ${g}`);
        return;
      }
      k !== o.value && ((h = o.value) == null || h.removeEventListener("scroll", f), o.value = k, o.value.addEventListener("scroll", f, {
        passive: !0
      }));
    }, {
      immediate: !0
    });
  }), mt(() => {
    var g;
    (g = o.value) == null || g.removeEventListener("scroll", f);
  }), t && J(t, f, {
    immediate: !0
  }), {
    scrollThreshold: v,
    currentScroll: i,
    currentThreshold: r,
    isScrollActive: u,
    scrollRatio: y,
    // required only for testing
    // probably can be removed
    // later (2 chars chlng)
    isScrollingUp: d,
    savedScroll: s
  };
}
const Is = K({
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
  ...Fn(),
  ...In(),
  ...Cs(),
  height: {
    type: [Number, String],
    default: 64
  }
}, "VAppBar"), Ts = ee()({
  name: "VAppBar",
  props: Is(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = Y(), n = be(e, "modelValue"), o = P(() => {
      var p;
      const m = new Set(((p = e.scrollBehavior) == null ? void 0 : p.split(" ")) ?? []);
      return {
        hide: m.has("hide"),
        fullyHide: m.has("fully-hide"),
        inverted: m.has("inverted"),
        collapse: m.has("collapse"),
        elevate: m.has("elevate"),
        fadeImage: m.has("fade-image")
        // shrink: behavior.has('shrink'),
      };
    }), i = P(() => {
      const m = o.value;
      return m.hide || m.fullyHide || m.inverted || m.collapse || m.elevate || m.fadeImage || // behavior.shrink ||
      !n.value;
    }), {
      currentScroll: s,
      scrollThreshold: r,
      isScrollingUp: u,
      scrollRatio: d
    } = Ps(e, {
      canScroll: i
    }), v = N(() => o.value.hide || o.value.fullyHide), y = P(() => e.collapse || o.value.collapse && (o.value.inverted ? d.value > 0 : d.value === 0)), f = P(() => e.flat || o.value.fullyHide && !n.value || o.value.elevate && (o.value.inverted ? s.value > 0 : s.value === 0)), g = P(() => o.value.fadeImage ? o.value.inverted ? 1 - d.value : d.value : void 0), k = P(() => {
      var S, I;
      if (o.value.hide && o.value.inverted) return 0;
      const m = ((S = a.value) == null ? void 0 : S.contentHeight) ?? 0, p = ((I = a.value) == null ? void 0 : I.extensionHeight) ?? 0;
      return v.value ? s.value < r.value || o.value.fullyHide ? m + p : m : m + p;
    });
    Ue(() => !!e.scrollBehavior, () => {
      Ze(() => {
        v.value ? o.value.inverted ? n.value = s.value > r.value : n.value = u.value || s.value < r.value : n.value = !0;
      });
    });
    const {
      ssrBootStyles: h
    } = va(), {
      layoutItemStyles: w
    } = An({
      id: e.name,
      order: P(() => parseInt(e.order, 10)),
      position: N(() => e.location),
      layoutSize: k,
      elementSize: X(void 0),
      active: n,
      absolute: N(() => e.absolute)
    });
    return oe(() => {
      const m = Fa.filterProps(e);
      return c(Fa, H({
        ref: a,
        class: ["v-app-bar", {
          "v-app-bar--bottom": e.location === "bottom"
        }, e.class],
        style: [{
          ...w.value,
          "--v-toolbar-image-opacity": g.value,
          height: void 0,
          ...h.value
        }, e.style]
      }, m, {
        collapse: y.value,
        flat: f.value
      }), t);
    }), {};
  }
}), As = K({
  ...tn({
    icon: "$menu",
    variant: "text"
  })
}, "VAppBarNavIcon"), Dn = ee()({
  name: "VAppBarNavIcon",
  props: As(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    return oe(() => c(ge, H(e, {
      class: ["v-app-bar-nav-icon"]
    }), t)), {};
  }
}), Fl = ee()({
  name: "VAppBarTitle",
  props: En(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    return oe(() => c(On, H(e, {
      class: "v-app-bar-title"
    }), t)), {};
  }
}), Bs = K({
  scrollable: Boolean,
  ...he(),
  ...At(),
  ...Ne({
    tag: "main"
  })
}, "VMain"), _s = ee()({
  name: "VMain",
  props: Bs(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    const {
      dimensionStyles: a
    } = Tt(e), {
      mainStyles: n
    } = Tn(), {
      ssrBootStyles: o
    } = va();
    return oe(() => c(e.tag, {
      class: ["v-main", {
        "v-main--scrollable": e.scrollable
      }, e.class],
      style: [n.value, o.value, a.value, e.style]
    }, {
      default: () => {
        var i, s;
        return [e.scrollable ? c("div", {
          class: "v-main__scroller"
        }, [(i = t.default) == null ? void 0 : i.call(t)]) : (s = t.default) == null ? void 0 : s.call(t)];
      }
    })), {};
  }
});
function Ca(e, l) {
  return {
    x: e.x + l.x,
    y: e.y + l.y
  };
}
function $s(e, l) {
  return {
    x: e.x - l.x,
    y: e.y - l.y
  };
}
function Dl(e, l) {
  if (e.side === "top" || e.side === "bottom") {
    const {
      side: t,
      align: a
    } = e, n = a === "left" ? 0 : a === "center" ? l.width / 2 : a === "right" ? l.width : a, o = t === "top" ? 0 : t === "bottom" ? l.height : t;
    return Ca({
      x: n,
      y: o
    }, l);
  } else if (e.side === "left" || e.side === "right") {
    const {
      side: t,
      align: a
    } = e, n = t === "left" ? 0 : t === "right" ? l.width : t, o = a === "top" ? 0 : a === "center" ? l.height / 2 : a === "bottom" ? l.height : a;
    return Ca({
      x: n,
      y: o
    }, l);
  }
  return Ca({
    x: l.width / 2,
    y: l.height / 2
  }, l);
}
const Ln = {
  static: Fs,
  // specific viewport position, usually centered
  connected: Ls
  // connected to a certain element
}, Es = K({
  locationStrategy: {
    type: [String, Function],
    default: "static",
    validator: (e) => typeof e == "function" || e in Ln
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
function Os(e, l) {
  const t = Y({}), a = Y();
  Le && Ue(() => !!(l.isActive.value && e.locationStrategy), (o) => {
    var i, s;
    J(() => e.locationStrategy, o), Re(() => {
      window.removeEventListener("resize", n), a.value = void 0;
    }), window.addEventListener("resize", n, {
      passive: !0
    }), typeof e.locationStrategy == "function" ? a.value = (i = e.locationStrategy(l, e, t)) == null ? void 0 : i.updateLocation : a.value = (s = Ln[e.locationStrategy](l, e, t)) == null ? void 0 : s.updateLocation;
  });
  function n(o) {
    var i;
    (i = a.value) == null || i.call(a, o);
  }
  return {
    contentStyles: t,
    updateLocation: a
  };
}
function Fs() {
}
function Ds(e, l) {
  const t = nl(e);
  return l ? t.x += parseFloat(e.style.right || 0) : t.x -= parseFloat(e.style.left || 0), t.y -= parseFloat(e.style.top || 0), t;
}
function Ls(e, l, t) {
  (Array.isArray(e.target.value) || ns(e.target.value)) && Object.assign(t.value, {
    position: "fixed",
    top: 0,
    [e.isRtl.value ? "right" : "left"]: 0
  });
  const {
    preferredAnchor: n,
    preferredOrigin: o
  } = Li(() => {
    const w = Sl(l.location, e.isRtl.value), m = l.origin === "overlap" ? w : l.origin === "auto" ? pa(w) : Sl(l.origin, e.isRtl.value);
    return w.side === m.side && w.align === wa(m).align ? {
      preferredAnchor: xl(w),
      preferredOrigin: xl(m)
    } : {
      preferredAnchor: w,
      preferredOrigin: m
    };
  }), [i, s, r, u] = ["minWidth", "minHeight", "maxWidth", "maxHeight"].map((w) => P(() => {
    const m = parseFloat(l[w]);
    return isNaN(m) ? 1 / 0 : m;
  })), d = P(() => {
    if (Array.isArray(l.offset))
      return l.offset;
    if (typeof l.offset == "string") {
      const w = l.offset.split(" ").map(parseFloat);
      return w.length < 2 && w.push(0), w;
    }
    return typeof l.offset == "number" ? [l.offset, 0] : [0, 0];
  });
  let v = !1, y = -1;
  const f = new gn(4), g = new ResizeObserver(() => {
    if (!v) return;
    if (requestAnimationFrame((m) => {
      m !== y && f.clear(), requestAnimationFrame((p) => {
        y = p;
      });
    }), f.isFull) {
      const m = f.values();
      if (at(m.at(-1), m.at(-3)))
        return;
    }
    const w = h();
    w && f.push(w.flipped);
  });
  J([e.target, e.contentEl], (w, m) => {
    let [p, S] = w, [I, C] = m;
    I && !Array.isArray(I) && g.unobserve(I), p && !Array.isArray(p) && g.observe(p), C && g.unobserve(C), S && g.observe(S);
  }, {
    immediate: !0
  }), Re(() => {
    g.disconnect();
  });
  let k = new nt({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  function h() {
    if (v = !1, requestAnimationFrame(() => v = !0), !e.target.value || !e.contentEl.value) return;
    (Array.isArray(e.target.value) || e.target.value.offsetParent || e.target.value.getClientRects().length) && (k = kn(e.target.value));
    const w = Ds(e.contentEl.value, e.isRtl.value), m = ta(e.contentEl.value), p = 12;
    m.length || (m.push(document.documentElement), e.contentEl.value.style.top && e.contentEl.value.style.left || (w.x -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0), w.y -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0)));
    const S = m.reduce((F, U) => {
      const j = U.getBoundingClientRect(), W = new nt({
        x: U === document.documentElement ? 0 : j.x,
        y: U === document.documentElement ? 0 : j.y,
        width: U.clientWidth,
        height: U.clientHeight
      });
      return F ? new nt({
        x: Math.max(F.left, W.left),
        y: Math.max(F.top, W.top),
        width: Math.min(F.right, W.right) - Math.max(F.left, W.left),
        height: Math.min(F.bottom, W.bottom) - Math.max(F.top, W.top)
      }) : W;
    }, void 0);
    S.x += p, S.y += p, S.width -= p * 2, S.height -= p * 2;
    let I = {
      anchor: n.value,
      origin: o.value
    };
    function C(F) {
      const U = new nt(w), j = Dl(F.anchor, k), W = Dl(F.origin, U);
      let {
        x: te,
        y: se
      } = $s(j, W);
      switch (F.anchor.side) {
        case "top":
          se -= d.value[0];
          break;
        case "bottom":
          se += d.value[0];
          break;
        case "left":
          te -= d.value[0];
          break;
        case "right":
          te += d.value[0];
          break;
      }
      switch (F.anchor.align) {
        case "top":
          se -= d.value[1];
          break;
        case "bottom":
          se += d.value[1];
          break;
        case "left":
          te -= d.value[1];
          break;
        case "right":
          te += d.value[1];
          break;
      }
      return U.x += te, U.y += se, U.width = Math.min(U.width, r.value), U.height = Math.min(U.height, u.value), {
        overflows: Tl(U, S),
        x: te,
        y: se
      };
    }
    let T = 0, b = 0;
    const V = {
      x: 0,
      y: 0
    }, A = {
      x: !1,
      y: !1
    };
    let $ = -1;
    for (; ; ) {
      if ($++ > 10) {
        hn("Infinite loop detected in connectedLocationStrategy");
        break;
      }
      const {
        x: F,
        y: U,
        overflows: j
      } = C(I);
      T += F, b += U, w.x += F, w.y += U;
      {
        const W = kl(I.anchor), te = j.x.before || j.x.after, se = j.y.before || j.y.after;
        let L = !1;
        if (["x", "y"].forEach((B) => {
          if (B === "x" && te && !A.x || B === "y" && se && !A.y) {
            const _ = {
              anchor: {
                ...I.anchor
              },
              origin: {
                ...I.origin
              }
            }, E = B === "x" ? W === "y" ? wa : pa : W === "y" ? pa : wa;
            _.anchor = E(_.anchor), _.origin = E(_.origin);
            const {
              overflows: z
            } = C(_);
            (z[B].before <= j[B].before && z[B].after <= j[B].after || z[B].before + z[B].after < (j[B].before + j[B].after) / 2) && (I = _, L = A[B] = !0);
          }
        }), L) continue;
      }
      j.x.before && (T += j.x.before, w.x += j.x.before), j.x.after && (T -= j.x.after, w.x -= j.x.after), j.y.before && (b += j.y.before, w.y += j.y.before), j.y.after && (b -= j.y.after, w.y -= j.y.after);
      {
        const W = Tl(w, S);
        V.x = S.width - W.x.before - W.x.after, V.y = S.height - W.y.before - W.y.after, T += W.x.before, w.x += W.x.before, b += W.y.before, w.y += W.y.before;
      }
      break;
    }
    const R = kl(I.anchor);
    return Object.assign(t.value, {
      "--v-overlay-anchor-origin": `${I.anchor.side} ${I.anchor.align}`,
      transformOrigin: `${I.origin.side} ${I.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: ve(Pa(b)),
      left: e.isRtl.value ? void 0 : ve(Pa(T)),
      right: e.isRtl.value ? ve(Pa(-T)) : void 0,
      minWidth: ve(R === "y" ? Math.min(i.value, k.width) : i.value),
      maxWidth: ve(Ll(tt(V.x, i.value === 1 / 0 ? 0 : i.value, r.value))),
      maxHeight: ve(Ll(tt(V.y, s.value === 1 / 0 ? 0 : s.value, u.value)))
    }), {
      available: V,
      contentBox: w,
      flipped: A
    };
  }
  return J(() => [n.value, o.value, l.offset, l.minWidth, l.minHeight, l.maxWidth, l.maxHeight], () => h()), $e(() => {
    const w = h();
    if (!w) return;
    const {
      available: m,
      contentBox: p
    } = w;
    p.height > m.y && requestAnimationFrame(() => {
      h(), requestAnimationFrame(() => {
        h();
      });
    });
  }), {
    updateLocation: h
  };
}
function Pa(e) {
  return Math.round(e * devicePixelRatio) / devicePixelRatio;
}
function Ll(e) {
  return Math.ceil(e * devicePixelRatio) / devicePixelRatio;
}
let Da = !0;
const la = [];
function Ms(e) {
  !Da || la.length ? (la.push(e), La()) : (Da = !1, e(), La());
}
let Ml = -1;
function La() {
  cancelAnimationFrame(Ml), Ml = requestAnimationFrame(() => {
    const e = la.shift();
    e && e(), la.length ? La() : Da = !0;
  });
}
const Zt = {
  none: null,
  close: Hs,
  block: zs,
  reposition: Ws
}, Rs = K({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (e) => typeof e == "function" || e in Zt
  }
}, "VOverlay-scroll-strategies");
function Ns(e, l) {
  if (!Le) return;
  let t;
  Ze(async () => {
    t == null || t.stop(), l.isActive.value && e.scrollStrategy && (t = Ql(), await new Promise((a) => setTimeout(a)), t.active && t.run(() => {
      var a;
      typeof e.scrollStrategy == "function" ? e.scrollStrategy(l, e, t) : (a = Zt[e.scrollStrategy]) == null || a.call(Zt, l, e, t);
    }));
  }), Re(() => {
    t == null || t.stop();
  });
}
function Hs(e) {
  function l(t) {
    e.isActive.value = !1;
  }
  Mn(e.targetEl.value ?? e.contentEl.value, l);
}
function zs(e, l) {
  var i;
  const t = (i = e.root.value) == null ? void 0 : i.offsetParent, a = [.../* @__PURE__ */ new Set([...ta(e.targetEl.value, l.contained ? t : void 0), ...ta(e.contentEl.value, l.contained ? t : void 0)])].filter((s) => !s.classList.contains("v-overlay-scroll-blocked")), n = window.innerWidth - document.documentElement.offsetWidth, o = ((s) => ol(s) && s)(t || document.documentElement);
  o && e.root.value.classList.add("v-overlay--scroll-blocked"), a.forEach((s, r) => {
    s.style.setProperty("--v-body-scroll-x", ve(-s.scrollLeft)), s.style.setProperty("--v-body-scroll-y", ve(-s.scrollTop)), s !== document.documentElement && s.style.setProperty("--v-scrollbar-offset", ve(n)), s.classList.add("v-overlay-scroll-blocked");
  }), Re(() => {
    a.forEach((s, r) => {
      const u = parseFloat(s.style.getPropertyValue("--v-body-scroll-x")), d = parseFloat(s.style.getPropertyValue("--v-body-scroll-y")), v = s.style.scrollBehavior;
      s.style.scrollBehavior = "auto", s.style.removeProperty("--v-body-scroll-x"), s.style.removeProperty("--v-body-scroll-y"), s.style.removeProperty("--v-scrollbar-offset"), s.classList.remove("v-overlay-scroll-blocked"), s.scrollLeft = -u, s.scrollTop = -d, s.style.scrollBehavior = v;
    }), o && e.root.value.classList.remove("v-overlay--scroll-blocked");
  });
}
function Ws(e, l, t) {
  let a = !1, n = -1, o = -1;
  function i(s) {
    Ms(() => {
      var d, v;
      const r = performance.now();
      (v = (d = e.updateLocation).value) == null || v.call(d, s), a = (performance.now() - r) / (1e3 / 60) > 2;
    });
  }
  o = (typeof requestIdleCallback > "u" ? (s) => s() : requestIdleCallback)(() => {
    t.run(() => {
      Mn(e.targetEl.value ?? e.contentEl.value, (s) => {
        a ? (cancelAnimationFrame(n), n = requestAnimationFrame(() => {
          n = requestAnimationFrame(() => {
            i(s);
          });
        })) : i(s);
      });
    });
  }), Re(() => {
    typeof cancelIdleCallback < "u" && cancelIdleCallback(o), cancelAnimationFrame(n);
  });
}
function Mn(e, l) {
  const t = [document, ...ta(e)];
  t.forEach((a) => {
    a.addEventListener("scroll", l, {
      passive: !0
    });
  }), Re(() => {
    t.forEach((a) => {
      a.removeEventListener("scroll", l);
    });
  });
}
const Ma = Symbol.for("vuetify:v-menu"), Us = K({
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
  ..._n()
}, "VOverlay-activator");
function Ks(e, l) {
  let {
    isActive: t,
    isTop: a,
    contentEl: n
  } = l;
  const o = Je("useActivator"), i = Y();
  let s = !1, r = !1, u = !0;
  const d = P(() => e.openOnFocus || e.openOnFocus == null && e.openOnHover), v = P(() => e.openOnClick || e.openOnClick == null && !e.openOnHover && !d.value), {
    runOpenDelay: y,
    runCloseDelay: f
  } = $n(e, (b) => {
    b === (e.openOnHover && s || d.value && r) && !(e.openOnHover && t.value && !a.value) && (t.value !== b && (u = !0), t.value = b);
  }), g = Y(), k = {
    onClick: (b) => {
      b.stopPropagation(), i.value = b.currentTarget || b.target, t.value || (g.value = [b.clientX, b.clientY]), t.value = !t.value;
    },
    onMouseenter: (b) => {
      var V;
      (V = b.sourceCapabilities) != null && V.firesTouchEvents || (s = !0, i.value = b.currentTarget || b.target, y());
    },
    onMouseleave: (b) => {
      s = !1, f();
    },
    onFocus: (b) => {
      kt(b.target, ":focus-visible") !== !1 && (r = !0, b.stopPropagation(), i.value = b.currentTarget || b.target, y());
    },
    onBlur: (b) => {
      r = !1, b.stopPropagation(), f();
    }
  }, h = P(() => {
    const b = {};
    return v.value && (b.onClick = k.onClick), e.openOnHover && (b.onMouseenter = k.onMouseenter, b.onMouseleave = k.onMouseleave), d.value && (b.onFocus = k.onFocus, b.onBlur = k.onBlur), b;
  }), w = P(() => {
    const b = {};
    if (e.openOnHover && (b.onMouseenter = () => {
      s = !0, y();
    }, b.onMouseleave = () => {
      s = !1, f();
    }), d.value && (b.onFocusin = () => {
      r = !0, y();
    }, b.onFocusout = () => {
      r = !1, f();
    }), e.closeOnContentClick) {
      const V = de(Ma, null);
      b.onClick = () => {
        t.value = !1, V == null || V.closeParents();
      };
    }
    return b;
  }), m = P(() => {
    const b = {};
    return e.openOnHover && (b.onMouseenter = () => {
      u && (s = !0, u = !1, y());
    }, b.onMouseleave = () => {
      s = !1, f();
    }), b;
  });
  J(a, (b) => {
    var V;
    b && (e.openOnHover && !s && (!d.value || !r) || d.value && !r && (!e.openOnHover || !s)) && !((V = n.value) != null && V.contains(document.activeElement)) && (t.value = !1);
  }), J(t, (b) => {
    b || setTimeout(() => {
      g.value = void 0;
    });
  }, {
    flush: "post"
  });
  const p = Pl();
  Ze(() => {
    p.value && $e(() => {
      i.value = p.el;
    });
  });
  const S = Pl(), I = P(() => e.target === "cursor" && g.value ? g.value : S.value ? S.el : Rn(e.target, o) || i.value), C = P(() => Array.isArray(I.value) ? void 0 : I.value);
  let T;
  return J(() => !!e.activator, (b) => {
    b && Le ? (T = Ql(), T.run(() => {
      js(e, o, {
        activatorEl: i,
        activatorEvents: h
      });
    })) : T && T.stop();
  }, {
    flush: "post",
    immediate: !0
  }), Re(() => {
    T == null || T.stop();
  }), {
    activatorEl: i,
    activatorRef: p,
    target: I,
    targetEl: C,
    targetRef: S,
    activatorEvents: h,
    contentEvents: w,
    scrimEvents: m
  };
}
function js(e, l, t) {
  let {
    activatorEl: a,
    activatorEvents: n
  } = t;
  J(() => e.activator, (r, u) => {
    if (u && r !== u) {
      const d = s(u);
      d && i(d);
    }
    r && $e(() => o());
  }, {
    immediate: !0
  }), J(() => e.activatorProps, () => {
    o();
  }), Re(() => {
    i();
  });
  function o() {
    let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : s(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    r && Ji(r, H(n.value, u));
  }
  function i() {
    let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : s(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    r && es(r, H(n.value, u));
  }
  function s() {
    let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : e.activator;
    const u = Rn(r, l);
    return a.value = (u == null ? void 0 : u.nodeType) === Node.ELEMENT_NODE ? u : void 0, a.value;
  }
}
function Rn(e, l) {
  var a, n;
  if (!e) return;
  let t;
  if (e === "parent") {
    let o = (n = (a = l == null ? void 0 : l.proxy) == null ? void 0 : a.$el) == null ? void 0 : n.parentNode;
    for (; o != null && o.hasAttribute("data-no-activator"); )
      o = o.parentNode;
    t = o;
  } else typeof e == "string" ? t = document.querySelector(e) : "$el" in e ? t = e.$el : t = e;
  return t;
}
function Gs() {
  if (!Le) return X(!1);
  const {
    ssr: e
  } = ut();
  if (e) {
    const l = X(!1);
    return qe(() => {
      l.value = !0;
    }), l;
  } else
    return X(!0);
}
const Nn = K({
  eager: Boolean
}, "lazy");
function Hn(e, l) {
  const t = X(!1), a = N(() => t.value || e.eager || l.value);
  J(l, () => t.value = !0);
  function n() {
    e.eager || (t.value = !1);
  }
  return {
    isBooted: t,
    hasContent: a,
    onAfterLeave: n
  };
}
const Rl = Symbol.for("vuetify:stack"), _t = Ge([]);
function Ys(e, l, t) {
  const a = Je("useStack"), n = !t, o = de(Rl, void 0), i = Ge({
    activeChildren: /* @__PURE__ */ new Set()
  });
  Me(Rl, i);
  const s = X(Number(pl(l)));
  Ue(e, () => {
    var v;
    const d = (v = _t.at(-1)) == null ? void 0 : v[1];
    s.value = d ? d + 10 : Number(pl(l)), n && _t.push([a.uid, s.value]), o == null || o.activeChildren.add(a.uid), Re(() => {
      if (n) {
        const y = _a(_t).findIndex((f) => f[0] === a.uid);
        _t.splice(y, 1);
      }
      o == null || o.activeChildren.delete(a.uid);
    });
  });
  const r = X(!0);
  n && Ze(() => {
    var v;
    const d = ((v = _t.at(-1)) == null ? void 0 : v[0]) === a.uid;
    setTimeout(() => r.value = d);
  });
  const u = N(() => !i.activeChildren.size);
  return {
    globalTop: Zl(r),
    localTop: u,
    stackStyles: N(() => ({
      zIndex: s.value
    }))
  };
}
function qs(e) {
  return {
    teleportTarget: P(() => {
      const t = e();
      if (t === !0 || !Le) return;
      const a = t === !1 ? document.body : typeof t == "string" ? document.querySelector(t) : t;
      if (a == null) {
        ni(`Unable to locate target ${t}`);
        return;
      }
      let n = [...a.children].find((o) => o.matches(".v-overlay-container"));
      return n || (n = document.createElement("div"), n.className = "v-overlay-container", a.appendChild(n)), n;
    })
  };
}
function Xs() {
  return !0;
}
function zn(e, l, t) {
  if (!e || Wn(e, t) === !1) return !1;
  const a = Vn(l);
  if (typeof ShadowRoot < "u" && a instanceof ShadowRoot && a.host === e.target) return !1;
  const n = (typeof t.value == "object" && t.value.include || (() => []))();
  return n.push(l), !n.some((o) => o == null ? void 0 : o.contains(e.target));
}
function Wn(e, l) {
  return (typeof l.value == "object" && l.value.closeConditional || Xs)(e);
}
function Zs(e, l, t) {
  const a = typeof t.value == "function" ? t.value : t.value.handler;
  e.shadowTarget = e.target, l._clickOutside.lastMousedownWasOutside && zn(e, l, t) && setTimeout(() => {
    Wn(e, t) && a && a(e);
  }, 0);
}
function Nl(e, l) {
  const t = Vn(e);
  l(document), typeof ShadowRoot < "u" && t instanceof ShadowRoot && l(t);
}
const Qs = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(e, l) {
    const t = (n) => Zs(n, e, l), a = (n) => {
      e._clickOutside.lastMousedownWasOutside = zn(n, e, l);
    };
    Nl(e, (n) => {
      n.addEventListener("click", t, !0), n.addEventListener("mousedown", a, !0);
    }), e._clickOutside || (e._clickOutside = {
      lastMousedownWasOutside: !1
    }), e._clickOutside[l.instance.$.uid] = {
      onClick: t,
      onMousedown: a
    };
  },
  beforeUnmount(e, l) {
    e._clickOutside && (Nl(e, (t) => {
      var o;
      if (!t || !((o = e._clickOutside) != null && o[l.instance.$.uid])) return;
      const {
        onClick: a,
        onMousedown: n
      } = e._clickOutside[l.instance.$.uid];
      t.removeEventListener("click", a, !0), t.removeEventListener("mousedown", n, !0);
    }), delete e._clickOutside[l.instance.$.uid]);
  }
};
function Js(e) {
  const {
    modelValue: l,
    color: t,
    ...a
  } = e;
  return c(Qt, {
    name: "fade-transition",
    appear: !0
  }, {
    default: () => [e.modelValue && c("div", H({
      class: ["v-overlay__scrim", e.color.backgroundColorClasses.value],
      style: e.color.backgroundColorStyles.value
    }, a), null)]
  });
}
const il = K({
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
  ...Us(),
  ...he(),
  ...At(),
  ...Nn(),
  ...Es(),
  ...Rs(),
  ...Fe(),
  ...Nt()
}, "VOverlay"), na = ee()({
  name: "VOverlay",
  directives: {
    ClickOutside: Qs
  },
  inheritAttrs: !1,
  props: {
    _disableGlobalStack: Boolean,
    ...il()
  },
  emits: {
    "click:outside": (e) => !0,
    "update:modelValue": (e) => !0,
    keydown: (e) => !0,
    afterEnter: () => !0,
    afterLeave: () => !0
  },
  setup(e, l) {
    let {
      slots: t,
      attrs: a,
      emit: n
    } = l;
    const o = Je("VOverlay"), i = Y(), s = Y(), r = Y(), u = be(e, "modelValue"), d = P({
      get: () => u.value,
      set: (Q) => {
        Q && e.disabled || (u.value = Q);
      }
    }), {
      themeClasses: v
    } = He(e), {
      rtlClasses: y,
      isRtl: f
    } = et(), {
      hasContent: g,
      onAfterLeave: k
    } = Hn(e, d), h = lt(() => typeof e.scrim == "string" ? e.scrim : null), {
      globalTop: w,
      localTop: m,
      stackStyles: p
    } = Ys(d, () => e.zIndex, e._disableGlobalStack), {
      activatorEl: S,
      activatorRef: I,
      target: C,
      targetEl: T,
      targetRef: b,
      activatorEvents: V,
      contentEvents: A,
      scrimEvents: $
    } = Ks(e, {
      isActive: d,
      isTop: m,
      contentEl: r
    }), {
      teleportTarget: R
    } = qs(() => {
      var pe, D, le;
      const Q = e.attach || e.contained;
      if (Q) return Q;
      const ne = ((pe = S == null ? void 0 : S.value) == null ? void 0 : pe.getRootNode()) || ((le = (D = o.proxy) == null ? void 0 : D.$el) == null ? void 0 : le.getRootNode());
      return ne instanceof ShadowRoot ? ne : !1;
    }), {
      dimensionStyles: F
    } = Tt(e), U = Gs(), {
      scopeId: j
    } = Ut();
    J(() => e.disabled, (Q) => {
      Q && (d.value = !1);
    });
    const {
      contentStyles: W,
      updateLocation: te
    } = Os(e, {
      isRtl: f,
      contentEl: r,
      target: C,
      isActive: d
    });
    Ns(e, {
      root: i,
      contentEl: r,
      targetEl: T,
      isActive: d,
      updateLocation: te
    });
    function se(Q) {
      n("click:outside", Q), e.persistent ? ae() : d.value = !1;
    }
    function L(Q) {
      return d.value && w.value && // If using scrim, only close if clicking on it rather than anything opened on top
      (!e.scrim || Q.target === s.value || Q instanceof MouseEvent && Q.shadowTarget === s.value);
    }
    Le && J(d, (Q) => {
      Q ? window.addEventListener("keydown", B) : window.removeEventListener("keydown", B);
    }, {
      immediate: !0
    }), mt(() => {
      Le && window.removeEventListener("keydown", B);
    });
    function B(Q) {
      var ne, pe, D;
      Q.key === "Escape" && w.value && ((ne = r.value) != null && ne.contains(document.activeElement) || n("keydown", Q), e.persistent ? ae() : (d.value = !1, (pe = r.value) != null && pe.contains(document.activeElement) && ((D = S.value) == null || D.focus())));
    }
    function _(Q) {
      Q.key === "Escape" && !w.value || n("keydown", Q);
    }
    const E = en();
    Ue(() => e.closeOnBack, () => {
      Ci(E, (Q) => {
        w.value && d.value ? (Q(!1), e.persistent ? ae() : d.value = !1) : Q();
      });
    });
    const z = Y();
    J(() => d.value && (e.absolute || e.contained) && R.value == null, (Q) => {
      if (Q) {
        const ne = Cn(i.value);
        ne && ne !== document.scrollingElement && (z.value = ne.scrollTop);
      }
    });
    function ae() {
      e.noClickAnimation || r.value && ct(r.value, [{
        transformOrigin: "center"
      }, {
        transform: "scale(1.03)"
      }, {
        transformOrigin: "center"
      }], {
        duration: 150,
        easing: Et
      });
    }
    function ce() {
      n("afterEnter");
    }
    function re() {
      k(), n("afterLeave");
    }
    return oe(() => {
      var Q;
      return c(Z, null, [(Q = t.activator) == null ? void 0 : Q.call(t, {
        isActive: d.value,
        targetRef: b,
        props: H({
          ref: I
        }, V.value, e.activatorProps)
      }), U.value && g.value && c($a, {
        disabled: !R.value,
        to: R.value
      }, {
        default: () => [c("div", H({
          class: ["v-overlay", {
            "v-overlay--absolute": e.absolute || e.contained,
            "v-overlay--active": d.value,
            "v-overlay--contained": e.contained
          }, v.value, y.value, e.class],
          style: [p.value, {
            "--v-overlay-opacity": e.opacity,
            top: ve(z.value)
          }, e.style],
          ref: i,
          onKeydown: _
        }, j, a), [c(Js, H({
          color: h,
          modelValue: d.value && !!e.scrim,
          ref: s
        }, $.value), null), c(ma, {
          appear: !0,
          persisted: !0,
          transition: e.transition,
          target: C.value,
          onAfterEnter: ce,
          onAfterLeave: re
        }, {
          default: () => {
            var ne;
            return [Ye(c("div", H({
              ref: r,
              class: ["v-overlay__content", e.contentClass],
              style: [F.value, W.value]
            }, A.value, e.contentProps), [(ne = t.default) == null ? void 0 : ne.call(t, {
              isActive: d
            })]), [[Vt, d.value], [Ct("click-outside"), {
              handler: se,
              closeConditional: L,
              include: () => [S.value]
            }]])];
          }
        })])]
      })]);
    }), {
      activatorEl: S,
      scrimEl: s,
      target: C,
      animateClick: ae,
      contentEl: r,
      globalTop: w,
      localTop: m,
      updateLocation: te
    };
  }
}), Ia = Symbol("Forwarded refs");
function Ta(e, l) {
  let t = e;
  for (; t; ) {
    const a = Reflect.getOwnPropertyDescriptor(t, l);
    if (a) return a;
    t = Object.getPrototypeOf(t);
  }
}
function ht(e) {
  for (var l = arguments.length, t = new Array(l > 1 ? l - 1 : 0), a = 1; a < l; a++)
    t[a - 1] = arguments[a];
  return e[Ia] = t, new Proxy(e, {
    get(n, o) {
      if (Reflect.has(n, o))
        return Reflect.get(n, o);
      if (!(typeof o == "symbol" || o.startsWith("$") || o.startsWith("__"))) {
        for (const i of t)
          if (i.value && Reflect.has(i.value, o)) {
            const s = Reflect.get(i.value, o);
            return typeof s == "function" ? s.bind(i.value) : s;
          }
      }
    },
    has(n, o) {
      if (Reflect.has(n, o))
        return !0;
      if (typeof o == "symbol" || o.startsWith("$") || o.startsWith("__")) return !1;
      for (const i of t)
        if (i.value && Reflect.has(i.value, o))
          return !0;
      return !1;
    },
    set(n, o, i) {
      if (Reflect.has(n, o))
        return Reflect.set(n, o, i);
      if (typeof o == "symbol" || o.startsWith("$") || o.startsWith("__")) return !1;
      for (const s of t)
        if (s.value && Reflect.has(s.value, o))
          return Reflect.set(s.value, o, i);
      return !1;
    },
    getOwnPropertyDescriptor(n, o) {
      var s;
      const i = Reflect.getOwnPropertyDescriptor(n, o);
      if (i) return i;
      if (!(typeof o == "symbol" || o.startsWith("$") || o.startsWith("__"))) {
        for (const r of t) {
          if (!r.value) continue;
          const u = Ta(r.value, o) ?? ("_" in r.value ? Ta((s = r.value._) == null ? void 0 : s.setupState, o) : void 0);
          if (u) return u;
        }
        for (const r of t) {
          const u = r.value && r.value[Ia];
          if (!u) continue;
          const d = u.slice();
          for (; d.length; ) {
            const v = d.shift(), y = Ta(v.value, o);
            if (y) return y;
            const f = v.value && v.value[Ia];
            f && d.push(...f);
          }
        }
      }
    }
  });
}
function er(e) {
  const l = X(e());
  let t = -1;
  function a() {
    clearInterval(t);
  }
  function n() {
    a(), $e(() => l.value = e());
  }
  function o(i) {
    const s = i ? getComputedStyle(i) : {
      transitionDuration: 0.2
    }, r = parseFloat(s.transitionDuration) * 1e3 || 200;
    if (a(), l.value <= 0) return;
    const u = performance.now();
    t = window.setInterval(() => {
      const d = performance.now() - u + r;
      l.value = Math.max(e() - d, 0), l.value <= 0 && a();
    }, r);
  }
  return Re(a), {
    clear: a,
    time: l,
    start: o,
    reset: n
  };
}
const tr = K({
  multiLine: Boolean,
  text: String,
  timer: [Boolean, String],
  timeout: {
    type: [Number, String],
    default: 5e3
  },
  vertical: Boolean,
  ...nn({
    location: "bottom"
  }),
  ...ln(),
  ...gt(),
  ...Ht(),
  ...Fe(),
  ...yt(il({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
}, "VSnackbar"), ar = ee()({
  name: "VSnackbar",
  props: tr(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = be(e, "modelValue"), {
      positionClasses: n
    } = an(e), {
      scopeId: o
    } = Ut(), {
      themeClasses: i
    } = He(e), {
      colorClasses: s,
      colorStyles: r,
      variantClasses: u
    } = Ya(e), {
      roundedClasses: d
    } = Pt(e), v = er(() => Number(e.timeout)), y = Y(), f = Y(), g = X(!1), k = X(0), h = Y(), w = de(Ot, void 0);
    Ue(() => !!w, () => {
      const $ = Tn();
      Ze(() => {
        h.value = $.mainStyles.value;
      });
    }), J(a, p), J(() => e.timeout, p), qe(() => {
      a.value && p();
    });
    let m = -1;
    function p() {
      v.reset(), window.clearTimeout(m);
      const $ = Number(e.timeout);
      if (!a.value || $ === -1) return;
      const R = Mi(f.value);
      v.start(R), m = window.setTimeout(() => {
        a.value = !1;
      }, $);
    }
    function S() {
      v.reset(), window.clearTimeout(m);
    }
    function I() {
      g.value = !0, S();
    }
    function C() {
      g.value = !1, p();
    }
    function T($) {
      k.value = $.touches[0].clientY;
    }
    function b($) {
      Math.abs(k.value - $.changedTouches[0].clientY) > 50 && (a.value = !1);
    }
    function V() {
      g.value && C();
    }
    const A = P(() => e.location.split(" ").reduce(($, R) => ($[`v-snackbar--${R}`] = !0, $), {}));
    return oe(() => {
      const $ = na.filterProps(e), R = !!(t.default || t.text || e.text);
      return c(na, H({
        ref: y,
        class: ["v-snackbar", {
          "v-snackbar--active": a.value,
          "v-snackbar--multi-line": e.multiLine && !e.vertical,
          "v-snackbar--timer": !!e.timer,
          "v-snackbar--vertical": e.vertical
        }, A.value, n.value, e.class],
        style: [h.value, e.style]
      }, $, {
        modelValue: a.value,
        "onUpdate:modelValue": (F) => a.value = F,
        contentProps: H({
          class: ["v-snackbar__wrapper", i.value, s.value, d.value, u.value],
          style: [r.value],
          onPointerenter: I,
          onPointerleave: C
        }, $.contentProps),
        persistent: !0,
        noClickAnimation: !0,
        scrim: !1,
        scrollStrategy: "none",
        _disableGlobalStack: !0,
        onTouchstartPassive: T,
        onTouchend: b,
        onAfterLeave: V
      }, o), {
        default: () => {
          var F, U;
          return [qa(!1, "v-snackbar"), e.timer && !g.value && c("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [c(Pi, {
            ref: f,
            color: typeof e.timer == "string" ? e.timer : "info",
            max: e.timeout,
            "model-value": v.time.value
          }, null)]), R && c("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((F = t.text) == null ? void 0 : F.call(t)) ?? e.text, (U = t.default) == null ? void 0 : U.call(t)]), t.actions && c(Oe, {
            defaults: {
              VBtn: {
                variant: "text",
                ripple: !1,
                slim: !0
              }
            }
          }, {
            default: () => [c("div", {
              class: "v-snackbar__actions"
            }, [t.actions({
              isActive: a
            })])]
          })];
        },
        activator: t.activator
      });
    }), ht({}, y);
  }
}), sl = Symbol.for("vuetify:v-tabs"), lr = K({
  fixed: Boolean,
  sliderColor: String,
  hideSlider: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ...yt(tn({
    selectedClass: "v-tab--selected",
    variant: "text"
  }), ["active", "block", "flat", "location", "position", "symbol"])
}, "VTab"), Ra = ee()({
  name: "VTab",
  props: lr(),
  setup(e, l) {
    let {
      slots: t,
      attrs: a
    } = l;
    const {
      textColorClasses: n,
      textColorStyles: o
    } = zt(() => e.sliderColor), i = Y(), s = Y(), r = P(() => e.direction === "horizontal"), u = P(() => {
      var v, y;
      return ((y = (v = i.value) == null ? void 0 : v.group) == null ? void 0 : y.isSelected.value) ?? !1;
    });
    function d(v) {
      var f, g;
      let {
        value: y
      } = v;
      if (y) {
        const k = (g = (f = i.value) == null ? void 0 : f.$el.parentElement) == null ? void 0 : g.querySelector(".v-tab--selected .v-tab__slider"), h = s.value;
        if (!k || !h) return;
        const w = getComputedStyle(k).color, m = k.getBoundingClientRect(), p = h.getBoundingClientRect(), S = r.value ? "x" : "y", I = r.value ? "X" : "Y", C = r.value ? "right" : "bottom", T = r.value ? "width" : "height", b = m[S], V = p[S], A = b > V ? m[C] - p[C] : m[S] - p[S], $ = Math.sign(A) > 0 ? r.value ? "right" : "bottom" : Math.sign(A) < 0 ? r.value ? "left" : "top" : "center", F = (Math.abs(A) + (Math.sign(A) < 0 ? m[T] : p[T])) / Math.max(m[T], p[T]) || 0, U = m[T] / p[T] || 0, j = 1.5;
        ct(h, {
          backgroundColor: [w, "currentcolor"],
          transform: [`translate${I}(${A}px) scale${I}(${U})`, `translate${I}(${A / j}px) scale${I}(${(F - 1) / j + 1})`, "none"],
          transformOrigin: Array(3).fill($)
        }, {
          duration: 225,
          easing: Et
        });
      }
    }
    return oe(() => {
      const v = ge.filterProps(e);
      return c(ge, H({
        symbol: sl,
        ref: i,
        class: ["v-tab", e.class],
        style: e.style,
        tabindex: u.value ? 0 : -1,
        role: "tab",
        "aria-selected": String(u.value),
        active: !1
      }, v, a, {
        block: e.fixed,
        maxWidth: e.fixed ? 300 : void 0,
        "onGroup:selected": d
      }), {
        ...t,
        default: () => {
          var y;
          return c(Z, null, [((y = t.default) == null ? void 0 : y.call(t)) ?? e.text, !e.hideSlider && c("div", {
            ref: s,
            class: ["v-tab__slider", n.value],
            style: o.value
          }, null)]);
        }
      });
    }), ht({}, i);
  }
}), nr = (e) => {
  const {
    touchstartX: l,
    touchendX: t,
    touchstartY: a,
    touchendY: n
  } = e, o = 0.5, i = 16;
  e.offsetX = t - l, e.offsetY = n - a, Math.abs(e.offsetY) < o * Math.abs(e.offsetX) && (e.left && t < l - i && e.left(e), e.right && t > l + i && e.right(e)), Math.abs(e.offsetX) < o * Math.abs(e.offsetY) && (e.up && n < a - i && e.up(e), e.down && n > a + i && e.down(e));
};
function or(e, l) {
  var a;
  const t = e.changedTouches[0];
  l.touchstartX = t.clientX, l.touchstartY = t.clientY, (a = l.start) == null || a.call(l, {
    originalEvent: e,
    ...l
  });
}
function ir(e, l) {
  var a;
  const t = e.changedTouches[0];
  l.touchendX = t.clientX, l.touchendY = t.clientY, (a = l.end) == null || a.call(l, {
    originalEvent: e,
    ...l
  }), nr(l);
}
function sr(e, l) {
  var a;
  const t = e.changedTouches[0];
  l.touchmoveX = t.clientX, l.touchmoveY = t.clientY, (a = l.move) == null || a.call(l, {
    originalEvent: e,
    ...l
  });
}
function rr() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const l = {
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
    touchstart: (t) => or(t, l),
    touchend: (t) => ir(t, l),
    touchmove: (t) => sr(t, l)
  };
}
function ur(e, l) {
  var s;
  const t = l.value, a = t != null && t.parent ? e.parentElement : e, n = (t == null ? void 0 : t.options) ?? {
    passive: !0
  }, o = (s = l.instance) == null ? void 0 : s.$.uid;
  if (!a || !o) return;
  const i = rr(l.value);
  a._touchHandlers = a._touchHandlers ?? /* @__PURE__ */ Object.create(null), a._touchHandlers[o] = i, bn(i).forEach((r) => {
    a.addEventListener(r, i[r], n);
  });
}
function cr(e, l) {
  var o, i;
  const t = (o = l.value) != null && o.parent ? e.parentElement : e, a = (i = l.instance) == null ? void 0 : i.$.uid;
  if (!(t != null && t._touchHandlers) || !a) return;
  const n = t._touchHandlers[a];
  bn(n).forEach((s) => {
    t.removeEventListener(s, n[s]);
  }), delete t._touchHandlers[a];
}
const Un = {
  mounted: ur,
  unmounted: cr
}, Kn = Symbol.for("vuetify:v-window"), jn = Symbol.for("vuetify:v-window-group"), Gn = K({
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
  ...he(),
  ...Ne(),
  ...Fe()
}, "VWindow"), Na = ee()({
  name: "VWindow",
  directives: {
    Touch: Un
  },
  props: Gn(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, l) {
    let {
      slots: t
    } = l;
    const {
      themeClasses: a
    } = He(e), {
      isRtl: n
    } = et(), {
      t: o
    } = Xe(), i = Xa(e, jn), s = Y(), r = P(() => n.value ? !e.reverse : e.reverse), u = X(!1), d = P(() => {
      const S = e.direction === "vertical" ? "y" : "x", C = (r.value ? !u.value : u.value) ? "-reverse" : "";
      return `v-window-${S}${C}-transition`;
    }), v = X(0), y = Y(void 0), f = P(() => i.items.value.findIndex((S) => i.selected.value.includes(S.id)));
    J(f, (S, I) => {
      const C = i.items.value.length, T = C - 1;
      C <= 2 ? u.value = S < I : S === T && I === 0 ? u.value = !0 : S === 0 && I === T ? u.value = !1 : u.value = S < I;
    }), Me(Kn, {
      transition: d,
      isReversed: u,
      transitionCount: v,
      transitionHeight: y,
      rootRef: s
    });
    const g = N(() => e.continuous || f.value !== 0), k = N(() => e.continuous || f.value !== i.items.value.length - 1);
    function h() {
      g.value && i.prev();
    }
    function w() {
      k.value && i.next();
    }
    const m = P(() => {
      const S = [], I = {
        icon: n.value ? e.nextIcon : e.prevIcon,
        class: `v-window__${r.value ? "right" : "left"}`,
        onClick: i.prev,
        "aria-label": o("$vuetify.carousel.prev")
      };
      S.push(g.value ? t.prev ? t.prev({
        props: I
      }) : c(ge, I, null) : c("div", null, null));
      const C = {
        icon: n.value ? e.prevIcon : e.nextIcon,
        class: `v-window__${r.value ? "left" : "right"}`,
        onClick: i.next,
        "aria-label": o("$vuetify.carousel.next")
      };
      return S.push(k.value ? t.next ? t.next({
        props: C
      }) : c(ge, C, null) : c("div", null, null)), S;
    }), p = P(() => e.touch === !1 ? e.touch : {
      ...{
        left: () => {
          r.value ? h() : w();
        },
        right: () => {
          r.value ? w() : h();
        },
        start: (I) => {
          let {
            originalEvent: C
          } = I;
          C.stopPropagation();
        }
      },
      ...e.touch === !0 ? {} : e.touch
    });
    return oe(() => Ye(c(e.tag, {
      ref: s,
      class: ["v-window", {
        "v-window--show-arrows-on-hover": e.showArrows === "hover"
      }, a.value, e.class],
      style: e.style
    }, {
      default: () => {
        var S, I;
        return [c("div", {
          class: "v-window__container",
          style: {
            height: y.value
          }
        }, [(S = t.default) == null ? void 0 : S.call(t, {
          group: i
        }), e.showArrows !== !1 && c("div", {
          class: "v-window__controls"
        }, [m.value])]), (I = t.additional) == null ? void 0 : I.call(t, {
          group: i
        })];
      }
    }), [[Ct("touch"), p.value]])), {
      group: i
    };
  }
}), dr = K({
  ...yt(Gn(), ["continuous", "nextIcon", "prevIcon", "showArrows", "touch", "mandatory"])
}, "VTabsWindow"), rl = ee()({
  name: "VTabsWindow",
  props: dr(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = de(sl, null), n = be(e, "modelValue"), o = P({
      get() {
        var i;
        return n.value != null || !a ? n.value : (i = a.items.value.find((s) => a.selected.value.includes(s.id))) == null ? void 0 : i.value;
      },
      set(i) {
        n.value = i;
      }
    });
    return oe(() => {
      const i = Na.filterProps(e);
      return c(Na, H({
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
}), Yn = K({
  reverseTransition: {
    type: [Boolean, String],
    default: void 0
  },
  transition: {
    type: [Boolean, String],
    default: void 0
  },
  ...he(),
  ...Za(),
  ...Nn()
}, "VWindowItem"), Ha = ee()({
  name: "VWindowItem",
  directives: {
    Touch: Un
  },
  props: Yn(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = de(Kn), n = Qa(e, jn), {
      isBooted: o
    } = va();
    if (!a || !n) throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const i = X(!1), s = P(() => o.value && (a.isReversed.value ? e.reverseTransition !== !1 : e.transition !== !1));
    function r() {
      !i.value || !a || (i.value = !1, a.transitionCount.value > 0 && (a.transitionCount.value -= 1, a.transitionCount.value === 0 && (a.transitionHeight.value = void 0)));
    }
    function u() {
      var g;
      i.value || !a || (i.value = !0, a.transitionCount.value === 0 && (a.transitionHeight.value = ve((g = a.rootRef.value) == null ? void 0 : g.clientHeight)), a.transitionCount.value += 1);
    }
    function d() {
      r();
    }
    function v(g) {
      i.value && $e(() => {
        !s.value || !i.value || !a || (a.transitionHeight.value = ve(g.clientHeight));
      });
    }
    const y = P(() => {
      const g = a.isReversed.value ? e.reverseTransition : e.transition;
      return s.value ? {
        name: typeof g != "string" ? a.transition.value : g,
        onBeforeEnter: u,
        onAfterEnter: r,
        onEnterCancelled: d,
        onBeforeLeave: u,
        onAfterLeave: r,
        onLeaveCancelled: d,
        onEnter: v
      } : !1;
    }), {
      hasContent: f
    } = Hn(e, n.isSelected);
    return oe(() => c(ma, {
      transition: y.value,
      disabled: !o.value
    }, {
      default: () => {
        var g;
        return [Ye(c("div", {
          class: ["v-window-item", n.selectedClass.value, e.class],
          style: e.style
        }, [f.value && ((g = t.default) == null ? void 0 : g.call(t))]), [[Vt, n.isSelected.value]])];
      }
    })), {
      groupItem: n
    };
  }
}), vr = K({
  ...Yn()
}, "VTabsWindowItem"), oa = ee()({
  name: "VTabsWindowItem",
  props: vr(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    return oe(() => {
      const a = Ha.filterProps(e);
      return c(Ha, H({
        _as: "VTabsWindowItem"
      }, a, {
        class: ["v-tabs-window-item", e.class],
        style: e.style
      }), t);
    }), {};
  }
});
function fr(e) {
  let {
    selectedElement: l,
    containerElement: t,
    isRtl: a,
    isHorizontal: n
  } = e;
  const o = Ft(n, t), i = qn(n, a, t), s = Ft(n, l), r = Xn(n, l), u = s * 0.4;
  return i > r ? r - u : i + o < r + s ? r - o + s + u : i;
}
function mr(e) {
  let {
    selectedElement: l,
    containerElement: t,
    isHorizontal: a
  } = e;
  const n = Ft(a, t), o = Xn(a, l), i = Ft(a, l);
  return o - n / 2 + i / 2;
}
function Hl(e, l) {
  const t = e ? "scrollWidth" : "scrollHeight";
  return (l == null ? void 0 : l[t]) || 0;
}
function gr(e, l) {
  const t = e ? "clientWidth" : "clientHeight";
  return (l == null ? void 0 : l[t]) || 0;
}
function qn(e, l, t) {
  if (!t)
    return 0;
  const {
    scrollLeft: a,
    offsetWidth: n,
    scrollWidth: o
  } = t;
  return e ? l ? o - n + a : a : t.scrollTop;
}
function Ft(e, l) {
  const t = e ? "offsetWidth" : "offsetHeight";
  return (l == null ? void 0 : l[t]) || 0;
}
function Xn(e, l) {
  const t = e ? "offsetLeft" : "offsetTop";
  return (l == null ? void 0 : l[t]) || 0;
}
const Zn = Symbol.for("vuetify:v-slide-group"), ul = K({
  centerActive: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  symbol: {
    type: null,
    default: Zn
  },
  nextIcon: {
    type: ye,
    default: "$next"
  },
  prevIcon: {
    type: ye,
    default: "$prev"
  },
  showArrows: {
    type: [Boolean, String],
    validator: (e) => typeof e == "boolean" || ["always", "desktop", "mobile"].includes(e)
  },
  ...he(),
  ...Wt({
    mobile: null
  }),
  ...Ne(),
  ...on({
    selectedClass: "v-slide-group-item--active"
  })
}, "VSlideGroup"), Dt = ee()({
  name: "VSlideGroup",
  props: ul(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, l) {
    let {
      slots: t
    } = l;
    const {
      isRtl: a
    } = et(), {
      displayClasses: n,
      mobile: o
    } = ut(e), i = Xa(e, e.symbol), s = X(!1), r = X(0), u = X(0), d = X(0), v = P(() => e.direction === "horizontal"), {
      resizeRef: y,
      contentRect: f
    } = St(), {
      resizeRef: g,
      contentRect: k
    } = St(), h = ji(), w = P(() => ({
      container: y.el,
      duration: 200,
      easing: "easeOutQuart"
    })), m = P(() => i.selected.value.length ? i.items.value.findIndex((_) => _.id === i.selected.value[0]) : -1), p = P(() => i.selected.value.length ? i.items.value.findIndex((_) => _.id === i.selected.value[i.selected.value.length - 1]) : -1);
    if (Le) {
      let _ = -1;
      J(() => [i.selected.value, f.value, k.value, v.value], () => {
        cancelAnimationFrame(_), _ = requestAnimationFrame(() => {
          if (f.value && k.value) {
            const E = v.value ? "width" : "height";
            u.value = f.value[E], d.value = k.value[E], s.value = u.value + 1 < d.value;
          }
          if (m.value >= 0 && g.el) {
            const E = g.el.children[p.value];
            I(E, e.centerActive);
          }
        });
      });
    }
    const S = X(!1);
    function I(_, E) {
      let z = 0;
      E ? z = mr({
        containerElement: y.el,
        isHorizontal: v.value,
        selectedElement: _
      }) : z = fr({
        containerElement: y.el,
        isHorizontal: v.value,
        isRtl: a.value,
        selectedElement: _
      }), C(z);
    }
    function C(_) {
      if (!Le || !y.el) return;
      const E = Ft(v.value, y.el), z = qn(v.value, a.value, y.el);
      if (!(Hl(v.value, y.el) <= E || // Prevent scrolling by only a couple of pixels, which doesn't look smooth
      Math.abs(_ - z) < 16)) {
        if (v.value && a.value && y.el) {
          const {
            scrollWidth: ce,
            offsetWidth: re
          } = y.el;
          _ = ce - re - _;
        }
        v.value ? h.horizontal(_, w.value) : h(_, w.value);
      }
    }
    function T(_) {
      const {
        scrollTop: E,
        scrollLeft: z
      } = _.target;
      r.value = v.value ? z : E;
    }
    function b(_) {
      if (S.value = !0, !(!s.value || !g.el)) {
        for (const E of _.composedPath())
          for (const z of g.el.children)
            if (z === E) {
              I(z);
              return;
            }
      }
    }
    function V(_) {
      S.value = !1;
    }
    let A = !1;
    function $(_) {
      var E;
      !A && !S.value && !(_.relatedTarget && ((E = g.el) != null && E.contains(_.relatedTarget))) && j(), A = !1;
    }
    function R() {
      A = !0;
    }
    function F(_) {
      if (!g.el) return;
      function E(z) {
        _.preventDefault(), j(z);
      }
      v.value ? _.key === "ArrowRight" ? E(a.value ? "prev" : "next") : _.key === "ArrowLeft" && E(a.value ? "next" : "prev") : _.key === "ArrowDown" ? E("next") : _.key === "ArrowUp" && E("prev"), _.key === "Home" ? E("first") : _.key === "End" && E("last");
    }
    function U(_, E) {
      if (!_) return;
      let z = _;
      do
        z = z == null ? void 0 : z[E === "next" ? "nextElementSibling" : "previousElementSibling"];
      while (z != null && z.hasAttribute("disabled"));
      return z;
    }
    function j(_) {
      if (!g.el) return;
      let E;
      if (!_)
        E = Oa(g.el)[0];
      else if (_ === "next") {
        if (E = U(g.el.querySelector(":focus"), _), !E) return j("first");
      } else if (_ === "prev") {
        if (E = U(g.el.querySelector(":focus"), _), !E) return j("last");
      } else _ === "first" ? (E = g.el.firstElementChild, E != null && E.hasAttribute("disabled") && (E = U(E, "next"))) : _ === "last" && (E = g.el.lastElementChild, E != null && E.hasAttribute("disabled") && (E = U(E, "prev")));
      E && E.focus({
        preventScroll: !0
      });
    }
    function W(_) {
      const E = v.value && a.value ? -1 : 1, z = (_ === "prev" ? -E : E) * u.value;
      let ae = r.value + z;
      if (v.value && a.value && y.el) {
        const {
          scrollWidth: ce,
          offsetWidth: re
        } = y.el;
        ae += ce - re;
      }
      C(ae);
    }
    const te = P(() => ({
      next: i.next,
      prev: i.prev,
      select: i.select,
      isSelected: i.isSelected
    })), se = P(() => {
      switch (e.showArrows) {
        case "always":
          return !0;
        case "desktop":
          return !o.value;
        case !0:
          return s.value || Math.abs(r.value) > 0;
        case "mobile":
          return o.value || s.value || Math.abs(r.value) > 0;
        default:
          return !o.value && (s.value || Math.abs(r.value) > 0);
      }
    }), L = P(() => Math.abs(r.value) > 1), B = P(() => {
      if (!y.value) return !1;
      const _ = Hl(v.value, y.el), E = gr(v.value, y.el);
      return _ - E - Math.abs(r.value) > 1;
    });
    return oe(() => c(e.tag, {
      class: ["v-slide-group", {
        "v-slide-group--vertical": !v.value,
        "v-slide-group--has-affixes": se.value,
        "v-slide-group--is-overflowing": s.value
      }, n.value, e.class],
      style: e.style,
      tabindex: S.value || i.selected.value.length ? -1 : 0,
      onFocus: $
    }, {
      default: () => {
        var _, E, z;
        return [se.value && c("div", {
          key: "prev",
          class: ["v-slide-group__prev", {
            "v-slide-group__prev--disabled": !L.value
          }],
          onMousedown: R,
          onClick: () => L.value && W("prev")
        }, [((_ = t.prev) == null ? void 0 : _.call(t, te.value)) ?? c(Vl, null, {
          default: () => [c(we, {
            icon: a.value ? e.nextIcon : e.prevIcon
          }, null)]
        })]), c("div", {
          key: "container",
          ref: y,
          class: "v-slide-group__container",
          onScroll: T
        }, [c("div", {
          ref: g,
          class: "v-slide-group__content",
          onFocusin: b,
          onFocusout: V,
          onKeydown: F
        }, [(E = t.default) == null ? void 0 : E.call(t, te.value)])]), se.value && c("div", {
          key: "next",
          class: ["v-slide-group__next", {
            "v-slide-group__next--disabled": !B.value
          }],
          onMousedown: R,
          onClick: () => B.value && W("next")
        }, [((z = t.next) == null ? void 0 : z.call(t, te.value)) ?? c(Vl, null, {
          default: () => [c(we, {
            icon: a.value ? e.prevIcon : e.nextIcon
          }, null)]
        })])];
      }
    })), {
      selected: i.selected,
      scrollTo: W,
      scrollOffset: r,
      focus: j,
      hasPrev: L,
      hasNext: B
    };
  }
});
function yr(e) {
  return e ? e.map((l) => Ri(l) ? l : {
    text: l,
    value: l
  }) : [];
}
const hr = K({
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
  ...ul({
    mandatory: "force",
    selectedClass: "v-tab-item--selected"
  }),
  ...rt(),
  ...Ne()
}, "VTabs"), br = ee()({
  name: "VTabs",
  props: hr(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, l) {
    let {
      attrs: t,
      slots: a
    } = l;
    const n = be(e, "modelValue"), o = P(() => yr(e.items)), {
      densityClasses: i
    } = Bt(e), {
      backgroundColorClasses: s,
      backgroundColorStyles: r
    } = lt(() => e.bgColor), {
      scopeId: u
    } = Ut();
    return Qe({
      VTab: {
        color: N(() => e.color),
        direction: N(() => e.direction),
        stacked: N(() => e.stacked),
        fixed: N(() => e.fixedTabs),
        sliderColor: N(() => e.sliderColor),
        hideSlider: N(() => e.hideSlider)
      }
    }), oe(() => {
      const d = Dt.filterProps(e), v = !!(a.window || e.items.length > 0);
      return c(Z, null, [c(Dt, H(d, {
        modelValue: n.value,
        "onUpdate:modelValue": (y) => n.value = y,
        class: ["v-tabs", `v-tabs--${e.direction}`, `v-tabs--align-tabs-${e.alignTabs}`, {
          "v-tabs--fixed-tabs": e.fixedTabs,
          "v-tabs--grow": e.grow,
          "v-tabs--stacked": e.stacked
        }, i.value, s.value, e.class],
        style: [{
          "--v-tabs-height": ve(e.height)
        }, r.value, e.style],
        role: "tablist",
        symbol: sl
      }, u, t), {
        default: () => {
          var y;
          return [((y = a.default) == null ? void 0 : y.call(a)) ?? o.value.map((f) => {
            var g;
            return ((g = a.tab) == null ? void 0 : g.call(a, {
              item: f
            })) ?? c(Ra, H(f, {
              key: f.text,
              value: f.value
            }), {
              default: a[`tab.${f.value}`] ? () => {
                var k;
                return (k = a[`tab.${f.value}`]) == null ? void 0 : k.call(a, {
                  item: f
                });
              } : void 0
            });
          })];
        }
      }), v && c(rl, H({
        modelValue: n.value,
        "onUpdate:modelValue": (y) => n.value = y,
        key: "tabs-window"
      }, u), {
        default: () => {
          var y;
          return [o.value.map((f) => {
            var g;
            return ((g = a.item) == null ? void 0 : g.call(a, {
              item: f
            })) ?? c(oa, {
              value: f.value
            }, {
              default: () => {
                var k;
                return (k = a[`item.${f.value}`]) == null ? void 0 : k.call(a, {
                  item: f
                });
              }
            });
          }), (y = a.window) == null ? void 0 : y.call(a)];
        }
      })]);
    }), {};
  }
}), pr = { class: "nav-home" };
var Yl;
const wr = /* @__PURE__ */ je({
  __name: "OxApp",
  props: {
    apiUrl: {},
    logo: {},
    dataEl: { default: (Yl = document.body.dataset) == null ? void 0 : Yl.appData },
    models: {},
    data: {}
  },
  setup(e) {
    const l = st(), t = dt(l, "panels."), a = e, n = Ge({ drawer: !0 }), o = gi(a), i = yi();
    return qe(() => {
      i.panel = o.data.panel;
    }), J(() => [o.state.state, o.state.data], () => {
      o.showState = !0;
    }), oi((s, r, u) => {
      o.state.error(`${s}`);
    }), (s, r) => (M(), q(ks, null, {
      default: O(() => [
        c(ar, {
          modelValue: x(o).showState,
          "onUpdate:modelValue": r[0] || (r[0] = (u) => x(o).showState = u),
          color: x(o).state.color,
          "multi-line": ""
        }, {
          default: O(() => [
            ke(Be(x(o).state.data), 1)
          ]),
          _: 1
        }, 8, ["modelValue", "color"]),
        c(Ts, { color: "primary" }, {
          prepend: O(() => [
            c(Dn, {
              icon: "mdi-apps",
              title: x(ie)("nav.panels"),
              "aria-label": x(ie)("nav.panels"),
              onClick: r[1] || (r[1] = Ve((u) => n.drawer = !n.drawer, ["stop"]))
            }, null, 8, ["title", "aria-label"])
          ]),
          default: O(() => [
            c(Fl, { id: "app-bar-sheet-title" }),
            c(Fl, { id: "app-bar-title" }, {
              default: O(() => [
                G(s.$slots, "title", { context: x(o) })
              ]),
              _: 3
            }),
            G(s.$slots, "app-bar-left", { context: x(o) }),
            r[5] || (r[5] = ot("div", {
              id: "app-bar-right",
              class: "mr-3"
            }, null, -1)),
            G(s.$slots, "app-bar-right", { context: x(o) })
          ]),
          _: 3
        }),
        c(x(Ss), {
          drawer: n.drawer,
          "onUpdate:drawer": r[3] || (r[3] = (u) => n.drawer = u),
          items: x(o).data.nav
        }, wt({
          prepend: O(() => [
            ot("a", pr, [
              s.logo ? (M(), q(fa, {
                key: 0,
                src: s.logo,
                class: "logo"
              }, null, 8, ["src"])) : ue("", !0)
            ]),
            G(s.$slots, "nav-start", { context: x(o) })
          ]),
          _: 2
        }, [
          x(l)["nav-end"] ? {
            name: "append",
            fn: O(() => [
              c(it, {
                opened: n.opened,
                "onUpdate:opened": r[2] || (r[2] = (u) => n.opened = u)
              }, {
                default: O(() => [
                  G(s.$slots, "nav-end", { context: x(o) })
                ]),
                _: 3
              }, 8, ["opened"])
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["drawer", "items"]),
        c(_s, null, {
          default: O(() => [
            G(s.$slots, "main", {}, () => [
              c(rl, {
                modelValue: x(i).panel,
                "onUpdate:modelValue": r[4] || (r[4] = (u) => x(i).panel = u)
              }, {
                default: O((u) => [
                  G(s.$slots, "default", H(u, { context: x(o) })),
                  (M(!0), me(Z, null, _e(x(t), (d, v) => (M(), q(oa, {
                    key: v,
                    value: d
                  }, {
                    default: O(() => [
                      G(s.$slots, v, H({ ref_for: !0 }, u, { context: x(o) }))
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
}), Sr = K({
  text: String,
  onClick: Ke(),
  ...he(),
  ...Fe()
}, "VLabel"), Qn = ee()({
  name: "VLabel",
  props: Sr(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    return oe(() => {
      var a;
      return c("label", {
        class: ["v-label", {
          "v-label--clickable": !!e.onClick
        }, e.class],
        style: e.style,
        onClick: e.onClick
      }, [e.text, (a = t.default) == null ? void 0 : a.call(t)]);
    }), {};
  }
}), Jn = Symbol.for("vuetify:selection-control-group"), eo = K({
  color: String,
  disabled: {
    type: Boolean,
    default: null
  },
  defaultsTarget: String,
  error: Boolean,
  id: String,
  inline: Boolean,
  falseIcon: ye,
  trueIcon: ye,
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
    default: at
  },
  ...he(),
  ...rt(),
  ...Fe()
}, "SelectionControlGroup"), xr = K({
  ...eo({
    defaultsTarget: "VSelectionControl"
  })
}, "VSelectionControlGroup");
ee()({
  name: "VSelectionControlGroup",
  props: xr(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = be(e, "modelValue"), n = ft(), o = N(() => e.id || `v-selection-control-group-${n}`), i = N(() => e.name || o.value), s = /* @__PURE__ */ new Set();
    return Me(Jn, {
      modelValue: a,
      forceUpdate: () => {
        s.forEach((r) => r());
      },
      onForceUpdate: (r) => {
        s.add(r), Re(() => {
          s.delete(r);
        });
      }
    }), Qe({
      [e.defaultsTarget]: {
        color: N(() => e.color),
        disabled: N(() => e.disabled),
        density: N(() => e.density),
        error: N(() => e.error),
        inline: N(() => e.inline),
        modelValue: a,
        multiple: N(() => !!e.multiple || e.multiple == null && Array.isArray(a.value)),
        name: i,
        falseIcon: N(() => e.falseIcon),
        trueIcon: N(() => e.trueIcon),
        readonly: N(() => e.readonly),
        ripple: N(() => e.ripple),
        type: N(() => e.type),
        valueComparator: N(() => e.valueComparator)
      }
    }), oe(() => {
      var r;
      return c("div", {
        class: ["v-selection-control-group", {
          "v-selection-control-group--inline": e.inline
        }, e.class],
        style: e.style,
        role: e.type === "radio" ? "radiogroup" : void 0
      }, [(r = t.default) == null ? void 0 : r.call(t)]);
    }), {};
  }
});
const to = K({
  label: String,
  baseColor: String,
  trueValue: null,
  falseValue: null,
  value: null,
  ...he(),
  ...eo()
}, "VSelectionControl");
function kr(e) {
  const l = de(Jn, void 0), {
    densityClasses: t
  } = Bt(e), a = be(e, "modelValue"), n = P(() => e.trueValue !== void 0 ? e.trueValue : e.value !== void 0 ? e.value : !0), o = P(() => e.falseValue !== void 0 ? e.falseValue : !1), i = P(() => !!e.multiple || e.multiple == null && Array.isArray(a.value)), s = P({
    get() {
      const f = l ? l.modelValue.value : a.value;
      return i.value ? De(f).some((g) => e.valueComparator(g, n.value)) : e.valueComparator(f, n.value);
    },
    set(f) {
      if (e.readonly) return;
      const g = f ? n.value : o.value;
      let k = g;
      i.value && (k = f ? [...De(a.value), g] : De(a.value).filter((h) => !e.valueComparator(h, n.value))), l ? l.modelValue.value = k : a.value = k;
    }
  }), {
    textColorClasses: r,
    textColorStyles: u
  } = zt(() => {
    if (!(e.error || e.disabled))
      return s.value ? e.color : e.baseColor;
  }), {
    backgroundColorClasses: d,
    backgroundColorStyles: v
  } = lt(() => s.value && !e.error && !e.disabled ? e.color : e.baseColor), y = P(() => s.value ? e.trueIcon : e.falseIcon);
  return {
    group: l,
    densityClasses: t,
    trueValue: n,
    falseValue: o,
    model: s,
    textColorClasses: r,
    textColorStyles: u,
    backgroundColorClasses: d,
    backgroundColorStyles: v,
    icon: y
  };
}
const zl = ee()({
  name: "VSelectionControl",
  directives: {
    Ripple: Ja
  },
  inheritAttrs: !1,
  props: to(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, l) {
    let {
      attrs: t,
      slots: a
    } = l;
    const {
      group: n,
      densityClasses: o,
      icon: i,
      model: s,
      textColorClasses: r,
      textColorStyles: u,
      backgroundColorClasses: d,
      backgroundColorStyles: v,
      trueValue: y
    } = kr(e), f = ft(), g = X(!1), k = X(!1), h = Y(), w = N(() => e.id || `input-${f}`), m = N(() => !e.disabled && !e.readonly);
    n == null || n.onForceUpdate(() => {
      h.value && (h.value.checked = s.value);
    });
    function p(T) {
      m.value && (g.value = !0, kt(T.target, ":focus-visible") !== !1 && (k.value = !0));
    }
    function S() {
      g.value = !1, k.value = !1;
    }
    function I(T) {
      T.stopPropagation();
    }
    function C(T) {
      if (!m.value) {
        h.value && (h.value.checked = s.value);
        return;
      }
      e.readonly && n && $e(() => n.forceUpdate()), s.value = T.target.checked;
    }
    return oe(() => {
      var $, R;
      const T = a.label ? a.label({
        label: e.label,
        props: {
          for: w.value
        }
      }) : e.label, [b, V] = pn(t), A = c("input", H({
        ref: h,
        checked: s.value,
        disabled: !!e.disabled,
        id: w.value,
        onBlur: S,
        onFocus: p,
        onInput: C,
        "aria-disabled": !!e.disabled,
        "aria-label": e.label,
        type: e.type,
        value: y.value,
        name: e.name,
        "aria-checked": e.type === "checkbox" ? s.value : void 0
      }, V), null);
      return c("div", H({
        class: ["v-selection-control", {
          "v-selection-control--dirty": s.value,
          "v-selection-control--disabled": e.disabled,
          "v-selection-control--error": e.error,
          "v-selection-control--focused": g.value,
          "v-selection-control--focus-visible": k.value,
          "v-selection-control--inline": e.inline
        }, o.value, e.class]
      }, b, {
        style: e.style
      }), [c("div", {
        class: ["v-selection-control__wrapper", r.value],
        style: u.value
      }, [($ = a.default) == null ? void 0 : $.call(a, {
        backgroundColorClasses: d,
        backgroundColorStyles: v
      }), Ye(c("div", {
        class: ["v-selection-control__input"]
      }, [((R = a.input) == null ? void 0 : R.call(a, {
        model: s,
        textColorClasses: r,
        textColorStyles: u,
        backgroundColorClasses: d,
        backgroundColorStyles: v,
        inputNode: A,
        icon: i.value,
        props: {
          onFocus: p,
          onBlur: S,
          id: w.value
        }
      })) ?? c(Z, null, [i.value && c(we, {
        key: "icon",
        icon: i.value
      }, null), A])]), [[Ct("ripple"), e.ripple && [!e.disabled && !e.readonly, null, ["center", "circle"]]]])]), T && c(Qn, {
        for: w.value,
        onClick: I
      }, {
        default: () => [T]
      })]);
    }), {
      isFocused: g,
      input: h
    };
  }
}), Vr = K({
  indeterminate: Boolean,
  indeterminateIcon: {
    type: ye,
    default: "$checkboxIndeterminate"
  },
  ...to({
    falseIcon: "$checkboxOff",
    trueIcon: "$checkboxOn"
  })
}, "VCheckboxBtn"), Kt = ee()({
  name: "VCheckboxBtn",
  props: Vr(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:indeterminate": (e) => !0
  },
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = be(e, "indeterminate"), n = be(e, "modelValue");
    function o(r) {
      a.value && (a.value = !1);
    }
    const i = N(() => a.value ? e.indeterminateIcon : e.falseIcon), s = N(() => a.value ? e.indeterminateIcon : e.trueIcon);
    return oe(() => {
      const r = yt(zl.filterProps(e), ["modelValue"]);
      return c(zl, H(r, {
        modelValue: n.value,
        "onUpdate:modelValue": [(u) => n.value = u, o],
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
function ao(e) {
  const {
    t: l
  } = Xe();
  function t(a) {
    let {
      name: n,
      color: o
    } = a;
    const i = {
      prepend: "prependAction",
      prependInner: "prependAction",
      append: "appendAction",
      appendInner: "appendAction",
      clear: "clear"
    }[n], s = e[`onClick:${n}`];
    function r(d) {
      d.key !== "Enter" && d.key !== " " || (d.preventDefault(), d.stopPropagation(), wn(s, new PointerEvent("click", d)));
    }
    const u = s && i ? l(`$vuetify.input.${i}`, e.label ?? "") : void 0;
    return c(we, {
      icon: e[`${n}Icon`],
      "aria-label": u,
      onClick: s,
      onKeydown: r,
      color: o
    }, null);
  }
  return {
    InputIcon: t
  };
}
const Cr = K({
  active: Boolean,
  color: String,
  messages: {
    type: [Array, String],
    default: () => []
  },
  ...he(),
  ...Nt({
    transition: {
      component: sn,
      leaveAbsolute: !0,
      group: !0
    }
  })
}, "VMessages"), Pr = ee()({
  name: "VMessages",
  props: Cr(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = P(() => De(e.messages)), {
      textColorClasses: n,
      textColorStyles: o
    } = zt(() => e.color);
    return oe(() => c(ma, {
      transition: e.transition,
      tag: "div",
      class: ["v-messages", n.value, e.class],
      style: [o.value, e.style]
    }, {
      default: () => [e.active && a.value.map((i, s) => c("div", {
        class: "v-messages__message",
        key: `${s}-${a.value}`
      }, [t.message ? t.message({
        message: i
      }) : i]))]
    })), {};
  }
}), lo = K({
  focused: Boolean,
  "onUpdate:focused": Ke()
}, "focus");
function no(e) {
  let l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Sn();
  const t = be(e, "focused"), a = N(() => ({
    [`${l}--focused`]: t.value
  }));
  function n() {
    t.value = !0;
  }
  function o() {
    t.value = !1;
  }
  return {
    focusClasses: a,
    isFocused: t,
    focus: n,
    blur: o
  };
}
const oo = Symbol.for("vuetify:form"), Ir = K({
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
function Tr(e) {
  const l = be(e, "modelValue"), t = N(() => e.disabled), a = N(() => e.readonly), n = X(!1), o = Y([]), i = Y([]);
  async function s() {
    const d = [];
    let v = !0;
    i.value = [], n.value = !0;
    for (const y of o.value) {
      const f = await y.validate();
      if (f.length > 0 && (v = !1, d.push({
        id: y.id,
        errorMessages: f
      })), !v && e.fastFail) break;
    }
    return i.value = d, n.value = !1, {
      valid: v,
      errors: i.value
    };
  }
  function r() {
    o.value.forEach((d) => d.reset());
  }
  function u() {
    o.value.forEach((d) => d.resetValidation());
  }
  return J(o, () => {
    let d = 0, v = 0;
    const y = [];
    for (const f of o.value)
      f.isValid === !1 ? (v++, y.push({
        id: f.id,
        errorMessages: f.errorMessages
      })) : f.isValid === !0 && d++;
    i.value = y, l.value = v > 0 ? !1 : d === o.value.length ? !0 : null;
  }, {
    deep: !0,
    flush: "post"
  }), Me(oo, {
    register: (d) => {
      let {
        id: v,
        vm: y,
        validate: f,
        reset: g,
        resetValidation: k
      } = d;
      o.value.some((h) => h.id === v) && yn(`Duplicate input name "${v}"`), o.value.push({
        id: v,
        validate: f,
        reset: g,
        resetValidation: k,
        vm: ii(y),
        isValid: null,
        errorMessages: []
      });
    },
    unregister: (d) => {
      o.value = o.value.filter((v) => v.id !== d);
    },
    update: (d, v, y) => {
      const f = o.value.find((g) => g.id === d);
      f && (f.isValid = v, f.errorMessages = y);
    },
    isDisabled: t,
    isReadonly: a,
    isValidating: n,
    isValid: l,
    items: o,
    validateOn: N(() => e.validateOn)
  }), {
    errors: i,
    isDisabled: t,
    isReadonly: a,
    isValidating: n,
    isValid: l,
    items: o,
    validate: s,
    reset: r,
    resetValidation: u
  };
}
function cl(e) {
  const l = de(oo, null);
  return {
    ...l,
    isReadonly: P(() => !!((e == null ? void 0 : e.readonly) ?? (l == null ? void 0 : l.isReadonly.value))),
    isDisabled: P(() => !!((e == null ? void 0 : e.disabled) ?? (l == null ? void 0 : l.isDisabled.value)))
  };
}
const Ar = K({
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
    // type: Array as PropType<readonly (ValidationRule | ValidationAlias)[]>,
    default: () => []
  },
  modelValue: null,
  validateOn: String,
  validationValue: null,
  ...lo()
}, "validation");
function Br(e) {
  let l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Sn(), t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ft();
  const a = be(e, "modelValue"), n = P(() => e.validationValue === void 0 ? a.value : e.validationValue), o = cl(e), i = Y([]), s = X(!0), r = P(() => !!(De(a.value === "" ? null : a.value).length || De(n.value === "" ? null : n.value).length)), u = P(() => {
    var p;
    return (p = e.errorMessages) != null && p.length ? De(e.errorMessages).concat(i.value).slice(0, Math.max(0, Number(e.maxErrors))) : i.value;
  }), d = P(() => {
    var I;
    let p = (e.validateOn ?? ((I = o.validateOn) == null ? void 0 : I.value)) || "input";
    p === "lazy" && (p = "input lazy"), p === "eager" && (p = "input eager");
    const S = new Set((p == null ? void 0 : p.split(" ")) ?? []);
    return {
      input: S.has("input"),
      blur: S.has("blur") || S.has("input") || S.has("invalid-input"),
      invalidInput: S.has("invalid-input"),
      lazy: S.has("lazy"),
      eager: S.has("eager")
    };
  }), v = P(() => {
    var p;
    return e.error || (p = e.errorMessages) != null && p.length ? !1 : e.rules.length ? s.value ? i.value.length || d.value.lazy ? null : !0 : !i.value.length : !0;
  }), y = X(!1), f = P(() => ({
    [`${l}--error`]: v.value === !1,
    [`${l}--dirty`]: r.value,
    [`${l}--disabled`]: o.isDisabled.value,
    [`${l}--readonly`]: o.isReadonly.value
  })), g = Je("validation"), k = P(() => e.name ?? x(t));
  si(() => {
    var p;
    (p = o.register) == null || p.call(o, {
      id: k.value,
      vm: g,
      validate: m,
      reset: h,
      resetValidation: w
    });
  }), mt(() => {
    var p;
    (p = o.unregister) == null || p.call(o, k.value);
  }), qe(async () => {
    var p;
    d.value.lazy || await m(!d.value.eager), (p = o.update) == null || p.call(o, k.value, v.value, u.value);
  }), Ue(() => d.value.input || d.value.invalidInput && v.value === !1, () => {
    J(n, () => {
      if (n.value != null)
        m();
      else if (e.focused) {
        const p = J(() => e.focused, (S) => {
          S || m(), p();
        });
      }
    });
  }), Ue(() => d.value.blur, () => {
    J(() => e.focused, (p) => {
      p || m();
    });
  }), J([v, u], () => {
    var p;
    (p = o.update) == null || p.call(o, k.value, v.value, u.value);
  });
  async function h() {
    a.value = null, await $e(), await w();
  }
  async function w() {
    s.value = !0, d.value.lazy ? i.value = [] : await m(!d.value.eager);
  }
  async function m() {
    let p = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    const S = [];
    y.value = !0;
    for (const I of e.rules) {
      if (S.length >= Number(e.maxErrors ?? 1))
        break;
      const T = await (typeof I == "function" ? I : () => I)(n.value);
      if (T !== !0) {
        if (T !== !1 && typeof T != "string") {
          console.warn(`${T} is not a valid value. Rule functions must return boolean true or a string.`);
          continue;
        }
        S.push(T || "");
      }
    }
    return i.value = S, y.value = !1, s.value = p, i.value;
  }
  return {
    errorMessages: u,
    isDirty: r,
    isDisabled: o.isDisabled,
    isReadonly: o.isReadonly,
    isPristine: s,
    isValid: v,
    isValidating: y,
    reset: h,
    resetValidation: w,
    validate: m,
    validationClasses: f
  };
}
const io = K({
  id: String,
  appendIcon: ye,
  baseColor: String,
  centerAffix: {
    type: Boolean,
    default: !0
  },
  color: String,
  glow: Boolean,
  iconColor: [Boolean, String],
  prependIcon: ye,
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
  "onClick:prepend": Ke(),
  "onClick:append": Ke(),
  ...he(),
  ...rt(),
  ...Ni(At(), ["maxWidth", "minWidth", "width"]),
  ...Fe(),
  ...Ar()
}, "VInput"), Wl = ee()({
  name: "VInput",
  props: {
    ...io()
  },
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, l) {
    let {
      attrs: t,
      slots: a,
      emit: n
    } = l;
    const {
      densityClasses: o
    } = Bt(e), {
      dimensionStyles: i
    } = Tt(e), {
      themeClasses: s
    } = He(e), {
      rtlClasses: r
    } = et(), {
      InputIcon: u
    } = ao(e), d = ft(), v = P(() => e.id || `input-${d}`), y = P(() => `${v.value}-messages`), {
      errorMessages: f,
      isDirty: g,
      isDisabled: k,
      isReadonly: h,
      isPristine: w,
      isValid: m,
      isValidating: p,
      reset: S,
      resetValidation: I,
      validate: C,
      validationClasses: T
    } = Br(e, "v-input", v), b = P(() => ({
      id: v,
      messagesId: y,
      isDirty: g,
      isDisabled: k,
      isReadonly: h,
      isPristine: w,
      isValid: m,
      isValidating: p,
      reset: S,
      resetValidation: I,
      validate: C
    })), V = N(() => e.error || e.disabled ? void 0 : e.focused ? e.color : e.baseColor), A = N(() => {
      if (e.iconColor)
        return e.iconColor === !0 ? V.value : e.iconColor;
    }), $ = P(() => {
      var R;
      return (R = e.errorMessages) != null && R.length || !w.value && f.value.length ? f.value : e.hint && (e.persistentHint || e.focused) ? e.hint : e.messages;
    });
    return oe(() => {
      var W, te, se, L;
      const R = !!(a.prepend || e.prependIcon), F = !!(a.append || e.appendIcon), U = $.value.length > 0, j = !e.hideDetails || e.hideDetails === "auto" && (U || !!a.details);
      return c("div", {
        class: ["v-input", `v-input--${e.direction}`, {
          "v-input--center-affix": e.centerAffix,
          "v-input--focused": e.focused,
          "v-input--glow": e.glow,
          "v-input--hide-spin-buttons": e.hideSpinButtons
        }, o.value, s.value, r.value, T.value, e.class],
        style: [i.value, e.style]
      }, [R && c("div", {
        key: "prepend",
        class: "v-input__prepend"
      }, [(W = a.prepend) == null ? void 0 : W.call(a, b.value), e.prependIcon && c(u, {
        key: "prepend-icon",
        name: "prepend",
        color: A.value
      }, null)]), a.default && c("div", {
        class: "v-input__control"
      }, [(te = a.default) == null ? void 0 : te.call(a, b.value)]), F && c("div", {
        key: "append",
        class: "v-input__append"
      }, [e.appendIcon && c(u, {
        key: "append-icon",
        name: "append",
        color: A.value
      }, null), (se = a.append) == null ? void 0 : se.call(a, b.value)]), j && c("div", {
        id: y.value,
        class: "v-input__details",
        role: "alert",
        "aria-live": "polite"
      }, [c(Pr, {
        active: U,
        messages: $.value
      }, {
        message: a.message
      }), (L = a.details) == null ? void 0 : L.call(a, b.value)])]);
    }), {
      reset: S,
      resetValidation: I,
      validate: C,
      isValid: m,
      errorMessages: f
    };
  }
}), so = Symbol.for("vuetify:v-chip-group"), _r = K({
  baseColor: String,
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: at
  },
  ...ul(),
  ...he(),
  ...on({
    selectedClass: "v-chip--selected"
  }),
  ...Ne(),
  ...Fe(),
  ...Ht({
    variant: "tonal"
  })
}, "VChipGroup");
ee()({
  name: "VChipGroup",
  props: _r(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, l) {
    let {
      slots: t
    } = l;
    const {
      themeClasses: a
    } = He(e), {
      isSelected: n,
      select: o,
      next: i,
      prev: s,
      selected: r
    } = Xa(e, so);
    return Qe({
      VChip: {
        baseColor: N(() => e.baseColor),
        color: N(() => e.color),
        disabled: N(() => e.disabled),
        filter: N(() => e.filter),
        variant: N(() => e.variant)
      }
    }), oe(() => {
      const u = Dt.filterProps(e);
      return c(Dt, H(u, {
        class: ["v-chip-group", {
          "v-chip-group--column": e.column
        }, a.value, e.class],
        style: e.style
      }), {
        default: () => {
          var d;
          return [(d = t.default) == null ? void 0 : d.call(t, {
            isSelected: n,
            select: o,
            next: i,
            prev: s,
            selected: r.value
          })];
        }
      });
    }), {};
  }
});
const $r = K({
  activeClass: String,
  appendAvatar: String,
  appendIcon: ye,
  baseColor: String,
  closable: Boolean,
  closeIcon: {
    type: ye,
    default: "$delete"
  },
  closeLabel: {
    type: String,
    default: "$vuetify.close"
  },
  draggable: Boolean,
  filter: Boolean,
  filterIcon: {
    type: ye,
    default: "$complete"
  },
  label: Boolean,
  link: {
    type: Boolean,
    default: void 0
  },
  pill: Boolean,
  prependAvatar: String,
  prependIcon: ye,
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
  onClick: Ke(),
  onClickOnce: Ke(),
  ...Rt(),
  ...he(),
  ...rt(),
  ...It(),
  ...Za(),
  ...gt(),
  ...dn(),
  ...cn(),
  ...Ne({
    tag: "span"
  }),
  ...Fe(),
  ...Ht({
    variant: "tonal"
  })
}, "VChip"), dl = ee()({
  name: "VChip",
  directives: {
    Ripple: Ja
  },
  props: $r(),
  emits: {
    "click:close": (e) => !0,
    "update:modelValue": (e) => !0,
    "group:selected": (e) => !0,
    click: (e) => !0
  },
  setup(e, l) {
    let {
      attrs: t,
      emit: a,
      slots: n
    } = l;
    const {
      t: o
    } = Xe(), {
      borderClasses: i
    } = da(e), {
      densityClasses: s
    } = Bt(e), {
      elevationClasses: r
    } = Mt(e), {
      roundedClasses: u
    } = Pt(e), {
      sizeClasses: d
    } = Ii(e), {
      themeClasses: v
    } = He(e), y = be(e, "modelValue"), f = Qa(e, so, !1), g = rn(e, t), k = N(() => e.link !== !1 && g.isLink.value), h = P(() => !e.disabled && e.link !== !1 && (!!f || e.link || g.isClickable.value)), w = N(() => ({
      "aria-label": o(e.closeLabel),
      onClick(T) {
        T.preventDefault(), T.stopPropagation(), y.value = !1, a("click:close", T);
      }
    })), {
      colorClasses: m,
      colorStyles: p,
      variantClasses: S
    } = Ya(() => ({
      color: !f || f.isSelected.value ? e.color ?? e.baseColor : e.baseColor,
      variant: e.variant
    }));
    function I(T) {
      var b;
      a("click", T), h.value && ((b = g.navigate) == null || b.call(g, T), f == null || f.toggle());
    }
    function C(T) {
      (T.key === "Enter" || T.key === " ") && (T.preventDefault(), I(T));
    }
    return () => {
      var U;
      const T = g.isLink.value ? "a" : e.tag, b = !!(e.appendIcon || e.appendAvatar), V = !!(b || n.append), A = !!(n.close || e.closable), $ = !!(n.filter || e.filter) && f, R = !!(e.prependIcon || e.prependAvatar), F = !!(R || n.prepend);
      return y.value && Ye(c(T, H({
        class: ["v-chip", {
          "v-chip--disabled": e.disabled,
          "v-chip--label": e.label,
          "v-chip--link": h.value,
          "v-chip--filter": $,
          "v-chip--pill": e.pill,
          [`${e.activeClass}`]: e.activeClass && ((U = g.isActive) == null ? void 0 : U.value)
        }, v.value, i.value, m.value, s.value, r.value, u.value, d.value, S.value, f == null ? void 0 : f.selectedClass.value, e.class],
        style: [p.value, e.style],
        disabled: e.disabled || void 0,
        draggable: e.draggable,
        tabindex: h.value ? 0 : void 0,
        onClick: I,
        onKeydown: h.value && !k.value && C
      }, g.linkProps), {
        default: () => {
          var j;
          return [qa(h.value, "v-chip"), $ && c(un, {
            key: "filter"
          }, {
            default: () => [Ye(c("div", {
              class: "v-chip__filter"
            }, [n.filter ? c(Oe, {
              key: "filter-defaults",
              disabled: !e.filterIcon,
              defaults: {
                VIcon: {
                  icon: e.filterIcon
                }
              }
            }, n.filter) : c(we, {
              key: "filter-icon",
              icon: e.filterIcon
            }, null)]), [[Vt, f.isSelected.value]])]
          }), F && c("div", {
            key: "prepend",
            class: "v-chip__prepend"
          }, [n.prepend ? c(Oe, {
            key: "prepend-defaults",
            disabled: !R,
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
          }, n.prepend) : c(Z, null, [e.prependIcon && c(we, {
            key: "prepend-icon",
            icon: e.prependIcon,
            start: !0
          }, null), e.prependAvatar && c(xt, {
            key: "prepend-avatar",
            image: e.prependAvatar,
            start: !0
          }, null)])]), c("div", {
            class: "v-chip__content",
            "data-no-activator": ""
          }, [((j = n.default) == null ? void 0 : j.call(n, {
            isSelected: f == null ? void 0 : f.isSelected.value,
            selectedClass: f == null ? void 0 : f.selectedClass.value,
            select: f == null ? void 0 : f.select,
            toggle: f == null ? void 0 : f.toggle,
            value: f == null ? void 0 : f.value.value,
            disabled: e.disabled
          })) ?? Be(e.text)]), V && c("div", {
            key: "append",
            class: "v-chip__append"
          }, [n.append ? c(Oe, {
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
          }, n.append) : c(Z, null, [e.appendIcon && c(we, {
            key: "append-icon",
            end: !0,
            icon: e.appendIcon
          }, null), e.appendAvatar && c(xt, {
            key: "append-avatar",
            end: !0,
            image: e.appendAvatar
          }, null)])]), A && c("button", H({
            key: "close",
            class: "v-chip__close",
            type: "button",
            "data-testid": "close-chip"
          }, w.value), [n.close ? c(Oe, {
            key: "close-defaults",
            defaults: {
              VIcon: {
                icon: e.closeIcon,
                size: "x-small"
              }
            }
          }, n.close) : c(we, {
            key: "close-icon",
            icon: e.closeIcon,
            size: "x-small"
          }, null)])];
        }
      }), [[Ct("ripple"), h.value && e.ripple, null]]);
    };
  }
}), Er = K({
  // TODO
  // disableKeys: Boolean,
  id: String,
  submenu: Boolean,
  ...yt(il({
    closeDelay: 250,
    closeOnContentClick: !0,
    locationStrategy: "connected",
    location: void 0,
    openDelay: 300,
    scrim: !1,
    scrollStrategy: "reposition",
    transition: {
      component: Bn
    }
  }), ["absolute"])
}, "VMenu"), vl = ee()({
  name: "VMenu",
  props: Er(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = be(e, "modelValue"), {
      scopeId: n
    } = Ut(), {
      isRtl: o
    } = et(), i = ft(), s = N(() => e.id || `v-menu-${i}`), r = Y(), u = de(Ma, null), d = X(/* @__PURE__ */ new Set());
    Me(Ma, {
      register() {
        d.value.add(i);
      },
      unregister() {
        d.value.delete(i);
      },
      closeParents(h) {
        setTimeout(() => {
          var w;
          !d.value.size && !e.persistent && (h == null || (w = r.value) != null && w.contentEl && !Hi(h, r.value.contentEl)) && (a.value = !1, u == null || u.closeParents());
        }, 40);
      }
    }), mt(() => {
      u == null || u.unregister(), document.removeEventListener("focusin", v);
    }), ql(() => a.value = !1);
    async function v(h) {
      var p, S, I;
      const w = h.relatedTarget, m = h.target;
      await $e(), a.value && w !== m && ((p = r.value) != null && p.contentEl) && // We're the topmost menu
      ((S = r.value) != null && S.globalTop) && // It isn't the document or the menu body
      ![document, r.value.contentEl].includes(m) && // It isn't inside the menu body
      !r.value.contentEl.contains(m) && ((I = Oa(r.value.contentEl)[0]) == null || I.focus());
    }
    J(a, (h) => {
      h ? (u == null || u.register(), Le && document.addEventListener("focusin", v, {
        once: !0
      })) : (u == null || u.unregister(), Le && document.removeEventListener("focusin", v));
    }, {
      immediate: !0
    });
    function y(h) {
      u == null || u.closeParents(h);
    }
    function f(h) {
      var w, m, p, S, I;
      if (!e.disabled)
        if (h.key === "Tab" || h.key === "Enter" && !e.closeOnContentClick) {
          if (h.key === "Enter" && (h.target instanceof HTMLTextAreaElement || h.target instanceof HTMLInputElement && h.target.closest("form"))) return;
          h.key === "Enter" && h.preventDefault(), zi(Oa((w = r.value) == null ? void 0 : w.contentEl, !1), h.shiftKey ? "prev" : "next", (T) => T.tabIndex >= 0) || (a.value = !1, (p = (m = r.value) == null ? void 0 : m.activatorEl) == null || p.focus());
        } else e.submenu && h.key === (o.value ? "ArrowRight" : "ArrowLeft") && (a.value = !1, (I = (S = r.value) == null ? void 0 : S.activatorEl) == null || I.focus());
    }
    function g(h) {
      var m;
      if (e.disabled) return;
      const w = (m = r.value) == null ? void 0 : m.contentEl;
      w && a.value ? h.key === "ArrowDown" ? (h.preventDefault(), h.stopImmediatePropagation(), Sa(w, "next")) : h.key === "ArrowUp" ? (h.preventDefault(), h.stopImmediatePropagation(), Sa(w, "prev")) : e.submenu && (h.key === (o.value ? "ArrowRight" : "ArrowLeft") ? a.value = !1 : h.key === (o.value ? "ArrowLeft" : "ArrowRight") && (h.preventDefault(), Sa(w, "first"))) : (e.submenu ? h.key === (o.value ? "ArrowLeft" : "ArrowRight") : ["ArrowDown", "ArrowUp"].includes(h.key)) && (a.value = !0, h.preventDefault(), setTimeout(() => setTimeout(() => g(h))));
    }
    const k = P(() => H({
      "aria-haspopup": "menu",
      "aria-expanded": String(a.value),
      "aria-controls": s.value,
      onKeydown: g
    }, e.activatorProps));
    return oe(() => {
      const h = na.filterProps(e);
      return c(na, H({
        ref: r,
        id: s.value,
        class: ["v-menu", e.class],
        style: e.style
      }, h, {
        modelValue: a.value,
        "onUpdate:modelValue": (w) => a.value = w,
        absolute: !0,
        activatorProps: k.value,
        location: e.location ?? (e.submenu ? "end" : "bottom"),
        "onClick:outside": y,
        onKeydown: f
      }, n), {
        activator: t.activator,
        default: function() {
          for (var w = arguments.length, m = new Array(w), p = 0; p < w; p++)
            m[p] = arguments[p];
          return c(Oe, {
            root: "VMenu"
          }, {
            default: () => {
              var S;
              return [(S = t.default) == null ? void 0 : S.call(t, ...m)];
            }
          });
        }
      });
    }), ht({
      id: s,
      ΨopenChildren: d
    }, r);
  }
}), Or = K({
  active: Boolean,
  disabled: Boolean,
  max: [Number, String],
  value: {
    type: [Number, String],
    default: 0
  },
  ...he(),
  ...Nt({
    transition: {
      component: sn
    }
  })
}, "VCounter"), Fr = ee()({
  name: "VCounter",
  functional: !0,
  props: Or(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = N(() => e.max ? `${e.value} / ${e.max}` : String(e.value));
    return oe(() => c(ma, {
      transition: e.transition
    }, {
      default: () => [Ye(c("div", {
        class: ["v-counter", {
          "text-error": e.max && !e.disabled && parseFloat(e.value) > parseFloat(e.max)
        }, e.class],
        style: e.style
      }, [t.default ? t.default({
        counter: a.value,
        max: e.max,
        value: e.value
      }) : a.value]), [[Vt, e.active]])]
    })), {};
  }
}), Dr = K({
  floating: Boolean,
  ...he()
}, "VFieldLabel"), qt = ee()({
  name: "VFieldLabel",
  props: Dr(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    return oe(() => c(Qn, {
      class: ["v-field-label", {
        "v-field-label--floating": e.floating
      }, e.class],
      style: e.style,
      "aria-hidden": e.floating || void 0
    }, t)), {};
  }
}), Lr = ["underlined", "outlined", "filled", "solo", "solo-inverted", "solo-filled", "plain"], ro = K({
  appendInnerIcon: ye,
  bgColor: String,
  clearable: Boolean,
  clearIcon: {
    type: ye,
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
  prependInnerIcon: ye,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {
    type: String,
    default: "filled",
    validator: (e) => Lr.includes(e)
  },
  "onClick:clear": Ke(),
  "onClick:appendInner": Ke(),
  "onClick:prependInner": Ke(),
  ...he(),
  ...al(),
  ...gt(),
  ...Fe()
}, "VField"), Ul = ee()({
  name: "VField",
  inheritAttrs: !1,
  props: {
    id: String,
    ...lo(),
    ...ro()
  },
  emits: {
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0
  },
  setup(e, l) {
    let {
      attrs: t,
      emit: a,
      slots: n
    } = l;
    const {
      themeClasses: o
    } = He(e), {
      loaderClasses: i
    } = el(e), {
      focusClasses: s,
      isFocused: r,
      focus: u,
      blur: d
    } = no(e), {
      InputIcon: v
    } = ao(e), {
      roundedClasses: y
    } = Pt(e), {
      rtlClasses: f
    } = et(), g = N(() => e.dirty || e.active), k = N(() => !!(e.label || n.label)), h = N(() => !e.singleLine && k.value), w = ft(), m = P(() => e.id || `input-${w}`), p = N(() => `${m.value}-messages`), S = Y(), I = Y(), C = Y(), T = P(() => ["plain", "underlined"].includes(e.variant)), b = P(() => e.error || e.disabled ? void 0 : g.value && r.value ? e.color : e.baseColor), V = P(() => {
      if (!(!e.iconColor || e.glow && !r.value))
        return e.iconColor === !0 ? b.value : e.iconColor;
    }), {
      backgroundColorClasses: A,
      backgroundColorStyles: $
    } = lt(() => e.bgColor), {
      textColorClasses: R,
      textColorStyles: F
    } = zt(b);
    J(g, (W) => {
      if (h.value) {
        const te = S.value.$el, se = I.value.$el;
        requestAnimationFrame(() => {
          const L = nl(te), B = se.getBoundingClientRect(), _ = B.x - L.x, E = B.y - L.y - (L.height / 2 - B.height / 2), z = B.width / 0.75, ae = Math.abs(z - L.width) > 1 ? {
            maxWidth: ve(z)
          } : void 0, ce = getComputedStyle(te), re = getComputedStyle(se), Q = parseFloat(ce.transitionDuration) * 1e3 || 150, ne = parseFloat(re.getPropertyValue("--v-field-label-scale")), pe = re.getPropertyValue("color");
          te.style.visibility = "visible", se.style.visibility = "hidden", ct(te, {
            transform: `translate(${_}px, ${E}px) scale(${ne})`,
            color: pe,
            ...ae
          }, {
            duration: Q,
            easing: Et,
            direction: W ? "normal" : "reverse"
          }).finished.then(() => {
            te.style.removeProperty("visibility"), se.style.removeProperty("visibility");
          });
        });
      }
    }, {
      flush: "post"
    });
    const U = P(() => ({
      isActive: g,
      isFocused: r,
      controlRef: C,
      blur: d,
      focus: u
    }));
    function j(W) {
      W.target !== document.activeElement && W.preventDefault();
    }
    return oe(() => {
      var _, E, z;
      const W = e.variant === "outlined", te = !!(n["prepend-inner"] || e.prependInnerIcon), se = !!(e.clearable || n.clear) && !e.disabled, L = !!(n["append-inner"] || e.appendInnerIcon || se), B = () => n.label ? n.label({
        ...U.value,
        label: e.label,
        props: {
          for: m.value
        }
      }) : e.label;
      return c("div", H({
        class: ["v-field", {
          "v-field--active": g.value,
          "v-field--appended": L,
          "v-field--center-affix": e.centerAffix ?? !T.value,
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
          "v-field--no-label": !B(),
          [`v-field--variant-${e.variant}`]: !0
        }, o.value, A.value, s.value, i.value, y.value, f.value, e.class],
        style: [$.value, e.style],
        onClick: j
      }, t), [c("div", {
        class: "v-field__overlay"
      }, null), c(tl, {
        name: "v-field",
        active: !!e.loading,
        color: e.error ? "error" : typeof e.loading == "string" ? e.loading : e.color
      }, {
        default: n.loader
      }), te && c("div", {
        key: "prepend",
        class: "v-field__prepend-inner"
      }, [e.prependInnerIcon && c(v, {
        key: "prepend-icon",
        name: "prependInner",
        color: V.value
      }, null), (_ = n["prepend-inner"]) == null ? void 0 : _.call(n, U.value)]), c("div", {
        class: "v-field__field",
        "data-no-activator": ""
      }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(e.variant) && h.value && c(qt, {
        key: "floating-label",
        ref: I,
        class: [R.value],
        floating: !0,
        for: m.value,
        style: F.value
      }, {
        default: () => [B()]
      }), k.value && c(qt, {
        key: "label",
        ref: S,
        for: m.value
      }, {
        default: () => [B()]
      }), ((E = n.default) == null ? void 0 : E.call(n, {
        ...U.value,
        props: {
          id: m.value,
          class: "v-field__input",
          "aria-describedby": p.value
        },
        focus: u,
        blur: d
      })) ?? c("div", {
        id: m.value,
        class: "v-field__input",
        "aria-describedby": p.value
      }, null)]), se && c(un, {
        key: "clear"
      }, {
        default: () => [Ye(c("div", {
          class: "v-field__clearable",
          onMousedown: (ae) => {
            ae.preventDefault(), ae.stopPropagation();
          }
        }, [c(Oe, {
          defaults: {
            VIcon: {
              icon: e.clearIcon
            }
          }
        }, {
          default: () => [n.clear ? n.clear({
            ...U.value,
            props: {
              onFocus: u,
              onBlur: d,
              onClick: e["onClick:clear"]
            }
          }) : c(v, {
            name: "clear",
            onFocus: u,
            onBlur: d
          }, null)]
        })]), [[Vt, e.dirty]])]
      }), L && c("div", {
        key: "append",
        class: "v-field__append-inner"
      }, [(z = n["append-inner"]) == null ? void 0 : z.call(n, U.value), e.appendInnerIcon && c(v, {
        key: "append-icon",
        name: "appendInner",
        color: V.value
      }, null)]), c("div", {
        class: ["v-field__outline", R.value],
        style: F.value
      }, [W && c(Z, null, [c("div", {
        class: "v-field__outline__start"
      }, null), h.value && c("div", {
        class: "v-field__outline__notch"
      }, [c(qt, {
        ref: I,
        floating: !0,
        for: m.value
      }, {
        default: () => [B()]
      })]), c("div", {
        class: "v-field__outline__end"
      }, null)]), T.value && h.value && c(qt, {
        ref: I,
        floating: !0,
        for: m.value
      }, {
        default: () => [B()]
      })])]);
    }), {
      controlRef: C,
      fieldIconColor: V
    };
  }
}), Mr = ["color", "file", "time", "date", "datetime-local", "week", "month"], fl = K({
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
  ...io(),
  ...ro()
}, "VTextField"), vt = ee()({
  name: "VTextField",
  directives: {
    Intersect: Ti
  },
  inheritAttrs: !1,
  props: fl(),
  emits: {
    "click:control": (e) => !0,
    "mousedown:control": (e) => !0,
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0
  },
  setup(e, l) {
    let {
      attrs: t,
      emit: a,
      slots: n
    } = l;
    const o = be(e, "modelValue"), {
      isFocused: i,
      focus: s,
      blur: r
    } = no(e), u = P(() => typeof e.counterValue == "function" ? e.counterValue(o.value) : typeof e.counterValue == "number" ? e.counterValue : (o.value ?? "").toString().length), d = P(() => {
      if (t.maxlength) return t.maxlength;
      if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string"))
        return e.counter;
    }), v = P(() => ["plain", "underlined"].includes(e.variant));
    function y(C, T) {
      var b, V;
      !e.autofocus || !C || (V = (b = T[0].target) == null ? void 0 : b.focus) == null || V.call(b);
    }
    const f = Y(), g = Y(), k = Y(), h = P(() => Mr.includes(e.type) || e.persistentPlaceholder || i.value || e.active);
    function w() {
      var C;
      k.value !== document.activeElement && ((C = k.value) == null || C.focus()), i.value || s();
    }
    function m(C) {
      a("mousedown:control", C), C.target !== k.value && (w(), C.preventDefault());
    }
    function p(C) {
      w(), a("click:control", C);
    }
    function S(C, T) {
      C.stopPropagation(), w(), $e(() => {
        o.value = null, T(), wn(e["onClick:clear"], C);
      });
    }
    function I(C) {
      var b;
      const T = C.target;
      if (o.value = T.value, (b = e.modelModifiers) != null && b.trim && ["text", "search", "password", "tel", "url"].includes(e.type)) {
        const V = [T.selectionStart, T.selectionEnd];
        $e(() => {
          T.selectionStart = V[0], T.selectionEnd = V[1];
        });
      }
    }
    return oe(() => {
      const C = !!(n.counter || e.counter !== !1 && e.counter != null), T = !!(C || n.details), [b, V] = pn(t), {
        modelValue: A,
        ...$
      } = Wl.filterProps(e), R = Ul.filterProps(e);
      return c(Wl, H({
        ref: f,
        modelValue: o.value,
        "onUpdate:modelValue": (F) => o.value = F,
        class: ["v-text-field", {
          "v-text-field--prefixed": e.prefix,
          "v-text-field--suffixed": e.suffix,
          "v-input--plain-underlined": v.value
        }, e.class],
        style: e.style
      }, b, $, {
        centerAffix: !v.value,
        focused: i.value
      }), {
        ...n,
        default: (F) => {
          let {
            id: U,
            isDisabled: j,
            isDirty: W,
            isReadonly: te,
            isValid: se,
            reset: L
          } = F;
          return c(Ul, H({
            ref: g,
            onMousedown: m,
            onClick: p,
            "onClick:clear": (B) => S(B, L),
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"],
            role: e.role
          }, R, {
            id: U.value,
            active: h.value || W.value,
            dirty: W.value || e.dirty,
            disabled: j.value,
            focused: i.value,
            error: se.value === !1
          }), {
            ...n,
            default: (B) => {
              let {
                props: {
                  class: _,
                  ...E
                }
              } = B;
              const z = Ye(c("input", H({
                ref: k,
                value: o.value,
                onInput: I,
                autofocus: e.autofocus,
                readonly: te.value,
                disabled: j.value,
                name: e.name,
                placeholder: e.placeholder,
                size: 1,
                type: e.type,
                onFocus: w,
                onBlur: r
              }, E, V), null), [[Ct("intersect"), {
                handler: y
              }, null, {
                once: !0
              }]]);
              return c(Z, null, [e.prefix && c("span", {
                class: "v-text-field__prefix"
              }, [c("span", {
                class: "v-text-field__prefix__text"
              }, [e.prefix])]), n.default ? c("div", {
                class: _,
                "data-no-activator": ""
              }, [n.default(), z]) : ri(z, {
                class: _
              }), e.suffix && c("span", {
                class: "v-text-field__suffix"
              }, [c("span", {
                class: "v-text-field__suffix__text"
              }, [e.suffix])])]);
            }
          });
        },
        details: T ? (F) => {
          var U;
          return c(Z, null, [(U = n.details) == null ? void 0 : U.call(n, F), C && c(Z, null, [c("span", null, null), c(Fr, {
            active: e.persistentCounter || i.value,
            value: u.value,
            max: d.value,
            disabled: e.disabled
          }, n.counter)])]);
        } : void 0
      });
    }), ht({}, f, g, k);
  }
}), Rr = K({
  renderless: Boolean,
  ...he()
}, "VVirtualScrollItem"), Nr = ee()({
  name: "VVirtualScrollItem",
  inheritAttrs: !1,
  props: Rr(),
  emits: {
    "update:height": (e) => !0
  },
  setup(e, l) {
    let {
      attrs: t,
      emit: a,
      slots: n
    } = l;
    const {
      resizeRef: o,
      contentRect: i
    } = St(void 0, "border");
    J(() => {
      var s;
      return (s = i.value) == null ? void 0 : s.height;
    }, (s) => {
      s != null && a("update:height", s);
    }), oe(() => {
      var s, r;
      return e.renderless ? c(Z, null, [(s = n.default) == null ? void 0 : s.call(n, {
        itemRef: o
      })]) : c("div", H({
        ref: o,
        class: ["v-virtual-scroll__item", e.class],
        style: e.style
      }, t), [(r = n.default) == null ? void 0 : r.call(n)]);
    });
  }
}), Hr = -1, zr = 1, Aa = 100, Wr = K({
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
function Ur(e, l) {
  const t = ut(), a = X(0);
  Ze(() => {
    a.value = parseFloat(e.itemHeight || 0);
  });
  const n = X(0), o = X(Math.ceil(
    // Assume 16px items filling the entire screen height if
    // not provided. This is probably incorrect but it minimises
    // the chance of ending up with empty space at the bottom.
    // The default value is set here to avoid poisoning getSize()
    (parseInt(e.height) || t.height.value) / (a.value || 16)
  ) || 1), i = X(0), s = X(0), r = Y(), u = Y();
  let d = 0;
  const {
    resizeRef: v,
    contentRect: y
  } = St();
  Ze(() => {
    v.value = r.value;
  });
  const f = P(() => {
    var B;
    return r.value === document.documentElement ? t.height.value : ((B = y.value) == null ? void 0 : B.height) || parseInt(e.height) || 0;
  }), g = P(() => !!(r.value && u.value && f.value && a.value));
  let k = Array.from({
    length: l.value.length
  }), h = Array.from({
    length: l.value.length
  });
  const w = X(0);
  let m = -1;
  function p(B) {
    return k[B] || a.value;
  }
  const S = Wi(() => {
    const B = performance.now();
    h[0] = 0;
    const _ = l.value.length;
    for (let E = 1; E <= _ - 1; E++)
      h[E] = (h[E - 1] || 0) + p(E - 1);
    w.value = Math.max(w.value, performance.now() - B);
  }, w), I = J(g, (B) => {
    B && (I(), d = u.value.offsetTop, S.immediate(), W(), ~m && $e(() => {
      Le && window.requestAnimationFrame(() => {
        se(m), m = -1;
      });
    }));
  });
  Re(() => {
    S.clear();
  });
  function C(B, _) {
    const E = k[B], z = a.value;
    a.value = z ? Math.min(a.value, _) : _, (E !== _ || z !== a.value) && (k[B] = _, S());
  }
  function T(B) {
    return B = tt(B, 0, l.value.length - 1), h[B] || 0;
  }
  function b(B) {
    return Kr(h, B);
  }
  let V = 0, A = 0, $ = 0;
  J(f, (B, _) => {
    _ && (W(), B < _ && requestAnimationFrame(() => {
      A = 0, W();
    }));
  });
  let R = -1;
  function F() {
    if (!r.value || !u.value) return;
    const B = r.value.scrollTop, _ = performance.now();
    _ - $ > 500 ? (A = Math.sign(B - V), d = u.value.offsetTop) : A = B - V, V = B, $ = _, window.clearTimeout(R), R = window.setTimeout(U, 500), W();
  }
  function U() {
    !r.value || !u.value || (A = 0, $ = 0, window.clearTimeout(R), W());
  }
  let j = -1;
  function W() {
    cancelAnimationFrame(j), j = requestAnimationFrame(te);
  }
  function te() {
    if (!r.value || !f.value) return;
    const B = V - d, _ = Math.sign(A), E = Math.max(0, B - Aa), z = tt(b(E), 0, l.value.length), ae = B + f.value + Aa, ce = tt(b(ae) + 1, z + 1, l.value.length);
    if (
      // Only update the side we're scrolling towards,
      // the other side will be updated incidentally
      (_ !== Hr || z < n.value) && (_ !== zr || ce > o.value)
    ) {
      const re = T(n.value) - T(z), Q = T(ce) - T(o.value);
      Math.max(re, Q) > Aa ? (n.value = z, o.value = ce) : (z <= 0 && (n.value = z), ce >= l.value.length && (o.value = ce));
    }
    i.value = T(n.value), s.value = T(l.value.length) - T(o.value);
  }
  function se(B) {
    const _ = T(B);
    !r.value || B && !_ ? m = B : r.value.scrollTop = _;
  }
  const L = P(() => l.value.slice(n.value, o.value).map((B, _) => {
    const E = _ + n.value;
    return {
      raw: B,
      index: E,
      key: pt(B, e.itemKey, E)
    };
  }));
  return J(l, () => {
    k = Array.from({
      length: l.value.length
    }), h = Array.from({
      length: l.value.length
    }), S.immediate(), W();
  }, {
    deep: 1
  }), {
    calculateVisibleItems: W,
    containerRef: r,
    markerRef: u,
    computedItems: L,
    paddingTop: i,
    paddingBottom: s,
    scrollToIndex: se,
    handleScroll: F,
    handleScrollend: U,
    handleItemResize: C
  };
}
function Kr(e, l) {
  let t = e.length - 1, a = 0, n = 0, o = null, i = -1;
  if (e[t] < l)
    return t;
  for (; a <= t; )
    if (n = a + t >> 1, o = e[n], o > l)
      t = n - 1;
    else if (o < l)
      i = n, a = n + 1;
    else return o === l ? n : a;
  return i;
}
const jr = K({
  items: {
    type: Array,
    default: () => []
  },
  renderless: Boolean,
  ...Wr(),
  ...he(),
  ...At()
}, "VVirtualScroll"), uo = ee()({
  name: "VVirtualScroll",
  props: jr(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = Je("VVirtualScroll"), {
      dimensionStyles: n
    } = Tt(e), {
      calculateVisibleItems: o,
      containerRef: i,
      markerRef: s,
      handleScroll: r,
      handleScrollend: u,
      handleItemResize: d,
      scrollToIndex: v,
      paddingTop: y,
      paddingBottom: f,
      computedItems: g
    } = Ur(e, N(() => e.items));
    return Ue(() => e.renderless, () => {
      function k() {
        var m, p;
        const w = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1) ? "addEventListener" : "removeEventListener";
        i.value === document.documentElement ? (document[w]("scroll", r, {
          passive: !0
        }), document[w]("scrollend", u)) : ((m = i.value) == null || m[w]("scroll", r, {
          passive: !0
        }), (p = i.value) == null || p[w]("scrollend", u));
      }
      qe(() => {
        i.value = Cn(a.vnode.el, !0), k(!0);
      }), Re(k);
    }), oe(() => {
      const k = g.value.map((h) => c(Nr, {
        key: h.key,
        renderless: e.renderless,
        "onUpdate:height": (w) => d(h.index, w)
      }, {
        default: (w) => {
          var m;
          return (m = t.default) == null ? void 0 : m.call(t, {
            item: h.raw,
            index: h.index,
            ...w
          });
        }
      }));
      return e.renderless ? c(Z, null, [c("div", {
        ref: s,
        class: "v-virtual-scroll__spacer",
        style: {
          paddingTop: ve(y.value)
        }
      }, null), k, c("div", {
        class: "v-virtual-scroll__spacer",
        style: {
          paddingBottom: ve(f.value)
        }
      }, null)]) : c("div", {
        ref: i,
        class: ["v-virtual-scroll", e.class],
        onScrollPassive: r,
        onScrollend: u,
        style: [n.value, e.style]
      }, [c("div", {
        ref: s,
        class: "v-virtual-scroll__container",
        style: {
          paddingTop: ve(y.value),
          paddingBottom: ve(f.value)
        }
      }, [k])]);
    }), {
      calculateVisibleItems: o,
      scrollToIndex: v
    };
  }
});
function co(e, l) {
  const t = X(!1);
  let a;
  function n(s) {
    cancelAnimationFrame(a), t.value = !0, a = requestAnimationFrame(() => {
      a = requestAnimationFrame(() => {
        t.value = !1;
      });
    });
  }
  async function o() {
    await new Promise((s) => requestAnimationFrame(s)), await new Promise((s) => requestAnimationFrame(s)), await new Promise((s) => requestAnimationFrame(s)), await new Promise((s) => {
      if (t.value) {
        const r = J(t, () => {
          r(), s();
        });
      } else s();
    });
  }
  async function i(s) {
    var d, v;
    if (s.key === "Tab" && ((d = l.value) == null || d.focus()), !["PageDown", "PageUp", "Home", "End"].includes(s.key)) return;
    const r = (v = e.value) == null ? void 0 : v.$el;
    if (!r) return;
    (s.key === "Home" || s.key === "End") && r.scrollTo({
      top: s.key === "Home" ? 0 : r.scrollHeight,
      behavior: "smooth"
    }), await o();
    const u = r.querySelectorAll(":scope > :not(.v-virtual-scroll__spacer)");
    if (s.key === "PageDown" || s.key === "Home") {
      const y = r.getBoundingClientRect().top;
      for (const f of u)
        if (f.getBoundingClientRect().top >= y) {
          f.focus();
          break;
        }
    } else {
      const y = r.getBoundingClientRect().bottom;
      for (const f of [...u].reverse())
        if (f.getBoundingClientRect().bottom <= y) {
          f.focus();
          break;
        }
    }
  }
  return {
    onScrollPassive: n,
    onKeydown: i
  };
}
const vo = K({
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
    type: ye,
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
  ...Ai({
    itemChildren: !1
  })
}, "Select"), Gr = K({
  ...vo(),
  ...yt(fl({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...Nt({
    transition: {
      component: Bn
    }
  })
}, "VSelect"), fo = ee()({
  name: "VSelect",
  props: Gr(),
  emits: {
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0,
    "update:menu": (e) => !0
  },
  setup(e, l) {
    let {
      slots: t
    } = l;
    const {
      t: a
    } = Xe(), n = Y(), o = Y(), i = Y(), {
      items: s,
      transformIn: r,
      transformOut: u
    } = vn(e), d = be(e, "modelValue", [], (L) => r(L === null ? [null] : De(L)), (L) => {
      const B = u(L);
      return e.multiple ? B : B[0] ?? null;
    }), v = P(() => typeof e.counterValue == "function" ? e.counterValue(d.value) : typeof e.counterValue == "number" ? e.counterValue : d.value.length), y = cl(e), f = P(() => d.value.map((L) => L.value)), g = X(!1);
    let k = "", h;
    const w = P(() => e.hideSelected ? s.value.filter((L) => !d.value.some((B) => (e.valueComparator || at)(B, L))) : s.value), m = P(() => e.hideNoData && !w.value.length || y.isReadonly.value || y.isDisabled.value), p = be(e, "menu"), S = P({
      get: () => p.value,
      set: (L) => {
        var B;
        p.value && !L && ((B = o.value) != null && B.ΨopenChildren.size) || L && m.value || (p.value = L);
      }
    }), I = N(() => S.value ? e.closeText : e.openText), C = P(() => {
      var L;
      return {
        ...e.menuProps,
        activatorProps: {
          ...((L = e.menuProps) == null ? void 0 : L.activatorProps) || {},
          "aria-haspopup": "listbox"
          // Set aria-haspopup to 'listbox'
        }
      };
    }), T = Y(), b = co(T, n);
    function V(L) {
      e.openOnClear && (S.value = !0);
    }
    function A() {
      m.value || (S.value = !S.value);
    }
    function $(L) {
      Jt(L) && R(L);
    }
    function R(L) {
      var z, ae;
      if (!L.key || y.isReadonly.value) return;
      ["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(L.key) && L.preventDefault(), ["Enter", "ArrowDown", " "].includes(L.key) && (S.value = !0), ["Escape", "Tab"].includes(L.key) && (S.value = !1), L.key === "Home" ? (z = T.value) == null || z.focus("first") : L.key === "End" && ((ae = T.value) == null || ae.focus("last"));
      const B = 1e3;
      if (!Jt(L)) return;
      const _ = performance.now();
      _ - h > B && (k = ""), k += L.key.toLowerCase(), h = _;
      const E = s.value.find((ce) => ce.title.toLowerCase().startsWith(k));
      if (E !== void 0) {
        d.value = [E];
        const ce = w.value.indexOf(E);
        Le && window.requestAnimationFrame(() => {
          var re;
          ce >= 0 && ((re = i.value) == null || re.scrollToIndex(ce));
        });
      }
    }
    function F(L) {
      let B = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!L.props.disabled)
        if (e.multiple) {
          const _ = d.value.findIndex((z) => (e.valueComparator || at)(z.value, L.value)), E = B ?? !~_;
          if (~_) {
            const z = E ? [...d.value, L] : [...d.value];
            z.splice(_, 1), d.value = z;
          } else E && (d.value = [...d.value, L]);
        } else {
          const _ = B !== !1;
          d.value = _ ? [L] : [], $e(() => {
            S.value = !1;
          });
        }
    }
    function U(L) {
      var B;
      (B = T.value) != null && B.$el.contains(L.relatedTarget) || (S.value = !1);
    }
    function j() {
      var L;
      e.eager && ((L = i.value) == null || L.calculateVisibleItems());
    }
    function W() {
      var L;
      g.value && ((L = n.value) == null || L.focus());
    }
    function te(L) {
      g.value = !0;
    }
    function se(L) {
      if (L == null) d.value = [];
      else if (kt(n.value, ":autofill") || kt(n.value, ":-webkit-autofill")) {
        const B = s.value.find((_) => _.title === L);
        B && F(B);
      } else n.value && (n.value.value = "");
    }
    return J(S, () => {
      if (!e.hideSelected && S.value && d.value.length) {
        const L = w.value.findIndex((B) => d.value.some((_) => (e.valueComparator || at)(_.value, B.value)));
        Le && window.requestAnimationFrame(() => {
          var B;
          L >= 0 && ((B = i.value) == null || B.scrollToIndex(L));
        });
      }
    }), J(() => e.items, (L, B) => {
      S.value || g.value && !B.length && L.length && (S.value = !0);
    }), oe(() => {
      const L = !!(e.chips || t.chip), B = !!(!e.hideNoData || w.value.length || t["prepend-item"] || t["append-item"] || t["no-data"]), _ = d.value.length > 0, E = vt.filterProps(e), z = _ || !g.value && e.label && !e.persistentPlaceholder ? void 0 : e.placeholder;
      return c(vt, H({
        ref: n
      }, E, {
        modelValue: d.value.map((ae) => ae.props.value).join(", "),
        "onUpdate:modelValue": se,
        focused: g.value,
        "onUpdate:focused": (ae) => g.value = ae,
        validationValue: d.externalValue,
        counterValue: v.value,
        dirty: _,
        class: ["v-select", {
          "v-select--active-menu": S.value,
          "v-select--chips": !!e.chips,
          [`v-select--${e.multiple ? "multiple" : "single"}`]: !0,
          "v-select--selected": d.value.length,
          "v-select--selection-slot": !!t.selection
        }, e.class],
        style: e.style,
        inputmode: "none",
        placeholder: z,
        "onClick:clear": V,
        "onMousedown:control": A,
        onBlur: U,
        onKeydown: R,
        "aria-label": a(I.value),
        title: a(I.value)
      }), {
        ...t,
        default: () => c(Z, null, [c(vl, H({
          ref: o,
          modelValue: S.value,
          "onUpdate:modelValue": (ae) => S.value = ae,
          activator: "parent",
          contentClass: "v-select__content",
          disabled: m.value,
          eager: e.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: e.transition,
          onAfterEnter: j,
          onAfterLeave: W
        }, C.value), {
          default: () => [B && c(it, H({
            ref: T,
            selected: f.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: (ae) => ae.preventDefault(),
            onKeydown: $,
            onFocusin: te,
            tabindex: "-1",
            "aria-live": "polite",
            "aria-label": `${e.label}-list`,
            color: e.itemColor ?? e.color
          }, b, e.listProps), {
            default: () => {
              var ae, ce, re;
              return [(ae = t["prepend-item"]) == null ? void 0 : ae.call(t), !w.value.length && !e.hideNoData && (((ce = t["no-data"]) == null ? void 0 : ce.call(t)) ?? c(We, {
                key: "no-data",
                title: a(e.noDataText)
              }, null)), c(uo, {
                ref: i,
                renderless: !0,
                items: w.value,
                itemKey: "value"
              }, {
                default: (Q) => {
                  var Se;
                  let {
                    item: ne,
                    index: pe,
                    itemRef: D
                  } = Q;
                  const le = H(ne.props, {
                    ref: D,
                    key: ne.value,
                    onClick: () => F(ne, null)
                  });
                  return ((Se = t.item) == null ? void 0 : Se.call(t, {
                    item: ne,
                    index: pe,
                    props: le
                  })) ?? c(We, H(le, {
                    role: "option"
                  }), {
                    prepend: (fe) => {
                      let {
                        isSelected: xe
                      } = fe;
                      return c(Z, null, [e.multiple && !e.hideSelected ? c(Kt, {
                        key: ne.value,
                        modelValue: xe,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, ne.props.prependAvatar && c(xt, {
                        image: ne.props.prependAvatar
                      }, null), ne.props.prependIcon && c(we, {
                        icon: ne.props.prependIcon
                      }, null)]);
                    }
                  });
                }
              }), (re = t["append-item"]) == null ? void 0 : re.call(t)];
            }
          })]
        }), d.value.map((ae, ce) => {
          function re(D) {
            D.stopPropagation(), D.preventDefault(), F(ae, !1);
          }
          const Q = {
            "onClick:close": re,
            onKeydown(D) {
              D.key !== "Enter" && D.key !== " " || (D.preventDefault(), D.stopPropagation(), re(D));
            },
            onMousedown(D) {
              D.preventDefault(), D.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, ne = L ? !!t.chip : !!t.selection, pe = ne ? xn(L ? t.chip({
            item: ae,
            index: ce,
            props: Q
          }) : t.selection({
            item: ae,
            index: ce
          })) : void 0;
          if (!(ne && !pe))
            return c("div", {
              key: ae.value,
              class: "v-select__selection"
            }, [L ? t.chip ? c(Oe, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: e.closableChips,
                  size: "small",
                  text: ae.title
                }
              }
            }, {
              default: () => [pe]
            }) : c(dl, H({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: ae.title,
              disabled: ae.props.disabled
            }, Q), null) : pe ?? c("span", {
              class: "v-select__selection-text"
            }, [ae.title, e.multiple && ce < d.value.length - 1 && c("span", {
              class: "v-select__selection-comma"
            }, [ke(",")])])]);
        })]),
        "append-inner": function() {
          var Q, ne;
          for (var ae = arguments.length, ce = new Array(ae), re = 0; re < ae; re++)
            ce[re] = arguments[re];
          return c(Z, null, [(Q = t["append-inner"]) == null ? void 0 : Q.call(t, ...ce), e.menuIcon ? c(we, {
            class: "v-select__menu-icon",
            color: (ne = n.value) == null ? void 0 : ne.fieldIconColor,
            icon: e.menuIcon
          }, null) : void 0]);
        }
      });
    }), ht({
      isFocused: g,
      menu: S,
      select: F
    }, n);
  }
}), Yr = (e, l, t) => {
  if (e == null || l == null) return -1;
  if (!l.length) return 0;
  e = e.toString().toLocaleLowerCase(), l = l.toString().toLocaleLowerCase();
  const a = [];
  let n = e.indexOf(l);
  for (; ~n; )
    a.push([n, n + l.length]), n = e.indexOf(l, n + l.length);
  return a.length ? a : -1;
};
function Ba(e, l) {
  if (!(e == null || typeof e == "boolean" || e === -1))
    return typeof e == "number" ? [[e, e + l.length]] : Array.isArray(e[0]) ? e : [e];
}
const mo = K({
  customFilter: Function,
  customKeyFilter: Object,
  filterKeys: [Array, String],
  filterMode: {
    type: String,
    default: "intersection"
  },
  noFilter: Boolean
}, "filter");
function qr(e, l, t) {
  var s;
  const a = [], n = (t == null ? void 0 : t.default) ?? Yr, o = t != null && t.filterKeys ? De(t.filterKeys) : !1, i = Object.keys((t == null ? void 0 : t.customKeyFilter) ?? {}).length;
  if (!(e != null && e.length)) return a;
  e: for (let r = 0; r < e.length; r++) {
    const [u, d = u] = De(e[r]), v = {}, y = {};
    let f = -1;
    if ((l || i > 0) && !(t != null && t.noFilter)) {
      if (typeof u == "object") {
        const h = o || Object.keys(d);
        for (const w of h) {
          const m = pt(d, w), p = (s = t == null ? void 0 : t.customKeyFilter) == null ? void 0 : s[w];
          if (f = p ? p(m, l, u) : n(m, l, u), f !== -1 && f !== !1)
            p ? v[w] = Ba(f, l) : y[w] = Ba(f, l);
          else if ((t == null ? void 0 : t.filterMode) === "every")
            continue e;
        }
      } else
        f = n(u, l, u), f !== -1 && f !== !1 && (y.title = Ba(f, l));
      const g = Object.keys(y).length, k = Object.keys(v).length;
      if (!g && !k || (t == null ? void 0 : t.filterMode) === "union" && k !== i && !g || (t == null ? void 0 : t.filterMode) === "intersection" && (k !== i || !g)) continue;
    }
    a.push({
      index: r,
      matches: {
        ...y,
        ...v
      }
    });
  }
  return a;
}
function go(e, l, t, a) {
  const n = X([]), o = X(/* @__PURE__ */ new Map()), i = P(() => a != null && a.transform ? x(l).map((r) => [r, a.transform(r)]) : x(l));
  Ze(() => {
    const r = typeof t == "function" ? t() : x(t), u = typeof r != "string" && typeof r != "number" ? "" : String(r), d = qr(i.value, u, {
      customKeyFilter: {
        ...e.customKeyFilter,
        ...x(a == null ? void 0 : a.customKeyFilter)
      },
      default: e.customFilter,
      filterKeys: e.filterKeys,
      filterMode: e.filterMode,
      noFilter: e.noFilter
    }), v = x(l), y = [], f = /* @__PURE__ */ new Map();
    d.forEach((g) => {
      let {
        index: k,
        matches: h
      } = g;
      const w = v[k];
      y.push(w), f.set(w.value, h);
    }), n.value = y, o.value = f;
  });
  function s(r) {
    return o.value.get(r.value);
  }
  return {
    filteredItems: n,
    filteredMatches: o,
    getMatches: s
  };
}
function Xr(e, l, t) {
  return t == null || !t.length ? l : t.map((a, n) => {
    const o = n === 0 ? 0 : t[n - 1][1], i = [c("span", {
      class: `${e}__unmask`
    }, [l.slice(o, a[0])]), c("span", {
      class: `${e}__mask`
    }, [l.slice(a[0], a[1])])];
    return n === t.length - 1 && i.push(c("span", {
      class: `${e}__unmask`
    }, [l.slice(a[1])])), c(Z, null, [i]);
  });
}
const Zr = K({
  autoSelectFirst: {
    type: [Boolean, String]
  },
  clearOnSelect: Boolean,
  search: String,
  ...mo({
    filterKeys: ["title"]
  }),
  ...vo(),
  ...yt(fl({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...Nt({
    transition: !1
  })
}, "VAutocomplete"), Qr = ee()({
  name: "VAutocomplete",
  props: Zr(),
  emits: {
    "update:focused": (e) => !0,
    "update:search": (e) => !0,
    "update:modelValue": (e) => !0,
    "update:menu": (e) => !0
  },
  setup(e, l) {
    let {
      slots: t
    } = l;
    const {
      t: a
    } = Xe(), n = Y(), o = X(!1), i = X(!0), s = X(!1), r = Y(), u = Y(), d = X(-1), {
      items: v,
      transformIn: y,
      transformOut: f
    } = vn(e), {
      textColorClasses: g,
      textColorStyles: k
    } = zt(() => {
      var D;
      return (D = n.value) == null ? void 0 : D.color;
    }), h = be(e, "search", ""), w = be(e, "modelValue", [], (D) => y(D === null ? [null] : De(D)), (D) => {
      const le = f(D);
      return e.multiple ? le : le[0] ?? null;
    }), m = P(() => typeof e.counterValue == "function" ? e.counterValue(w.value) : typeof e.counterValue == "number" ? e.counterValue : w.value.length), p = cl(e), {
      filteredItems: S,
      getMatches: I
    } = go(e, v, () => i.value ? "" : h.value), C = P(() => e.hideSelected ? S.value.filter((D) => !w.value.some((le) => le.value === D.value)) : S.value), T = P(() => !!(e.chips || t.chip)), b = P(() => T.value || !!t.selection), V = P(() => w.value.map((D) => D.props.value)), A = P(() => {
      var le;
      return (e.autoSelectFirst === !0 || e.autoSelectFirst === "exact" && h.value === ((le = C.value[0]) == null ? void 0 : le.title)) && C.value.length > 0 && !i.value && !s.value;
    }), $ = P(() => e.hideNoData && !C.value.length || p.isReadonly.value || p.isDisabled.value), R = be(e, "menu"), F = P({
      get: () => R.value,
      set: (D) => {
        var le;
        R.value && !D && ((le = r.value) != null && le.ΨopenChildren.size) || D && $.value || (R.value = D);
      }
    }), U = P(() => F.value ? e.closeText : e.openText), j = Y(), W = co(j, n);
    function te(D) {
      e.openOnClear && (F.value = !0), h.value = "";
    }
    function se() {
      $.value || (F.value = !0);
    }
    function L(D) {
      $.value || (o.value && (D.preventDefault(), D.stopPropagation()), F.value = !F.value);
    }
    function B(D) {
      var le;
      D.key !== " " && Jt(D) && ((le = n.value) == null || le.focus());
    }
    function _(D) {
      var fe, xe, Ee, ze, Ce;
      if (p.isReadonly.value) return;
      const le = (fe = n.value) == null ? void 0 : fe.selectionStart, Se = w.value.length;
      if (["Enter", "ArrowDown", "ArrowUp"].includes(D.key) && D.preventDefault(), ["Enter", "ArrowDown"].includes(D.key) && (F.value = !0), ["Escape"].includes(D.key) && (F.value = !1), A.value && ["Enter", "Tab"].includes(D.key) && !w.value.some((Ae) => {
        let {
          value: Te
        } = Ae;
        return Te === C.value[0].value;
      }) && pe(C.value[0]), D.key === "ArrowDown" && A.value && ((xe = j.value) == null || xe.focus("next")), ["Backspace", "Delete"].includes(D.key)) {
        if (!e.multiple && b.value && w.value.length > 0 && !h.value) return pe(w.value[0], !1);
        if (~d.value) {
          D.preventDefault();
          const Ae = d.value;
          pe(w.value[d.value], !1), d.value = Ae >= Se - 1 ? Se - 2 : Ae;
        } else D.key === "Backspace" && !h.value && (d.value = Se - 1);
        return;
      }
      if (e.multiple)
        if (D.key === "ArrowLeft") {
          if (d.value < 0 && le && le > 0) return;
          const Ae = d.value > -1 ? d.value - 1 : Se - 1;
          if (w.value[Ae])
            d.value = Ae;
          else {
            const Te = ((Ee = h.value) == null ? void 0 : Ee.length) ?? null;
            d.value = -1, (ze = n.value) == null || ze.setSelectionRange(Te, Te);
          }
        } else if (D.key === "ArrowRight") {
          if (d.value < 0) return;
          const Ae = d.value + 1;
          w.value[Ae] ? d.value = Ae : (d.value = -1, (Ce = n.value) == null || Ce.setSelectionRange(0, 0));
        } else ~d.value && Jt(D) && (d.value = -1);
    }
    function E(D) {
      if (kt(n.value, ":autofill") || kt(n.value, ":-webkit-autofill")) {
        const le = v.value.find((Se) => Se.title === D.target.value);
        le && pe(le);
      }
    }
    function z() {
      var D;
      e.eager && ((D = u.value) == null || D.calculateVisibleItems());
    }
    function ae() {
      var D;
      o.value && (i.value = !0, (D = n.value) == null || D.focus());
    }
    function ce(D) {
      o.value = !0, setTimeout(() => {
        s.value = !0;
      });
    }
    function re(D) {
      s.value = !1;
    }
    function Q(D) {
      (D == null || D === "" && !e.multiple && !b.value) && (w.value = []);
    }
    const ne = X(!1);
    function pe(D) {
      let le = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!(!D || D.props.disabled))
        if (e.multiple) {
          const Se = w.value.findIndex((xe) => (e.valueComparator || at)(xe.value, D.value)), fe = le ?? !~Se;
          if (~Se) {
            const xe = fe ? [...w.value, D] : [...w.value];
            xe.splice(Se, 1), w.value = xe;
          } else fe && (w.value = [...w.value, D]);
          e.clearOnSelect && (h.value = "");
        } else {
          const Se = le !== !1;
          w.value = Se ? [D] : [], h.value = Se && !b.value ? D.title : "", $e(() => {
            F.value = !1, i.value = !0;
          });
        }
    }
    return J(o, (D, le) => {
      var Se;
      D !== le && (D ? (ne.value = !0, h.value = e.multiple || b.value ? "" : String(((Se = w.value.at(-1)) == null ? void 0 : Se.props.title) ?? ""), i.value = !0, $e(() => ne.value = !1)) : (!e.multiple && h.value == null && (w.value = []), F.value = !1, (e.multiple || b.value) && (h.value = ""), d.value = -1));
    }), J(h, (D) => {
      !o.value || ne.value || (D && (F.value = !0), i.value = !D);
    }), J(F, () => {
      if (!e.hideSelected && F.value && w.value.length) {
        const D = C.value.findIndex((le) => w.value.some((Se) => le.value === Se.value));
        Le && window.requestAnimationFrame(() => {
          var le;
          D >= 0 && ((le = u.value) == null || le.scrollToIndex(D));
        });
      }
    }), J(() => e.items, (D, le) => {
      F.value || o.value && !le.length && D.length && (F.value = !0);
    }), J(w, (D) => {
      var le;
      !e.multiple && !b.value && (h.value = ((le = D[0]) == null ? void 0 : le.title) ?? "");
    }), oe(() => {
      const D = !!(!e.hideNoData || C.value.length || t["prepend-item"] || t["append-item"] || t["no-data"]), le = w.value.length > 0, Se = vt.filterProps(e);
      return c(vt, H({
        ref: n
      }, Se, {
        modelValue: h.value,
        "onUpdate:modelValue": [(fe) => h.value = fe, Q],
        focused: o.value,
        "onUpdate:focused": (fe) => o.value = fe,
        validationValue: w.externalValue,
        counterValue: m.value,
        dirty: le,
        onChange: E,
        class: ["v-autocomplete", `v-autocomplete--${e.multiple ? "multiple" : "single"}`, {
          "v-autocomplete--active-menu": F.value,
          "v-autocomplete--chips": !!e.chips,
          "v-autocomplete--selection-slot": !!b.value,
          "v-autocomplete--selecting-index": d.value > -1
        }, e.class],
        style: e.style,
        readonly: p.isReadonly.value,
        placeholder: le ? void 0 : e.placeholder,
        "onClick:clear": te,
        "onMousedown:control": se,
        onKeydown: _
      }), {
        ...t,
        default: () => c(Z, null, [c(vl, H({
          ref: r,
          modelValue: F.value,
          "onUpdate:modelValue": (fe) => F.value = fe,
          activator: "parent",
          contentClass: "v-autocomplete__content",
          disabled: $.value,
          eager: e.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: e.transition,
          onAfterEnter: z,
          onAfterLeave: ae
        }, e.menuProps), {
          default: () => [D && c(it, H({
            ref: j,
            selected: V.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: (fe) => fe.preventDefault(),
            onKeydown: B,
            onFocusin: ce,
            onFocusout: re,
            tabindex: "-1",
            "aria-live": "polite",
            color: e.itemColor ?? e.color
          }, W, e.listProps), {
            default: () => {
              var fe, xe, Ee;
              return [(fe = t["prepend-item"]) == null ? void 0 : fe.call(t), !C.value.length && !e.hideNoData && (((xe = t["no-data"]) == null ? void 0 : xe.call(t)) ?? c(We, {
                key: "no-data",
                title: a(e.noDataText)
              }, null)), c(uo, {
                ref: u,
                renderless: !0,
                items: C.value,
                itemKey: "value"
              }, {
                default: (ze) => {
                  var bl;
                  let {
                    item: Ce,
                    index: Ae,
                    itemRef: Te
                  } = ze;
                  const hl = H(Ce.props, {
                    ref: Te,
                    key: Ce.value,
                    active: A.value && Ae === 0 ? !0 : void 0,
                    onClick: () => pe(Ce, null)
                  });
                  return ((bl = t.item) == null ? void 0 : bl.call(t, {
                    item: Ce,
                    index: Ae,
                    props: hl
                  })) ?? c(We, H(hl, {
                    role: "option"
                  }), {
                    prepend: (jt) => {
                      let {
                        isSelected: ti
                      } = jt;
                      return c(Z, null, [e.multiple && !e.hideSelected ? c(Kt, {
                        key: Ce.value,
                        modelValue: ti,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, Ce.props.prependAvatar && c(xt, {
                        image: Ce.props.prependAvatar
                      }, null), Ce.props.prependIcon && c(we, {
                        icon: Ce.props.prependIcon
                      }, null)]);
                    },
                    title: () => {
                      var jt;
                      return i.value ? Ce.title : Xr("v-autocomplete", Ce.title, (jt = I(Ce)) == null ? void 0 : jt.title);
                    }
                  });
                }
              }), (Ee = t["append-item"]) == null ? void 0 : Ee.call(t)];
            }
          })]
        }), w.value.map((fe, xe) => {
          function Ee(Te) {
            Te.stopPropagation(), Te.preventDefault(), pe(fe, !1);
          }
          const ze = {
            "onClick:close": Ee,
            onKeydown(Te) {
              Te.key !== "Enter" && Te.key !== " " || (Te.preventDefault(), Te.stopPropagation(), Ee(Te));
            },
            onMousedown(Te) {
              Te.preventDefault(), Te.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, Ce = T.value ? !!t.chip : !!t.selection, Ae = Ce ? xn(T.value ? t.chip({
            item: fe,
            index: xe,
            props: ze
          }) : t.selection({
            item: fe,
            index: xe
          })) : void 0;
          if (!(Ce && !Ae))
            return c("div", {
              key: fe.value,
              class: ["v-autocomplete__selection", xe === d.value && ["v-autocomplete__selection--selected", g.value]],
              style: xe === d.value ? k.value : {}
            }, [T.value ? t.chip ? c(Oe, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: e.closableChips,
                  size: "small",
                  text: fe.title
                }
              }
            }, {
              default: () => [Ae]
            }) : c(dl, H({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: fe.title,
              disabled: fe.props.disabled
            }, ze), null) : Ae ?? c("span", {
              class: "v-autocomplete__selection-text"
            }, [fe.title, e.multiple && xe < w.value.length - 1 && c("span", {
              class: "v-autocomplete__selection-comma"
            }, [ke(",")])])]);
        })]),
        "append-inner": function() {
          var ze, Ce;
          for (var fe = arguments.length, xe = new Array(fe), Ee = 0; Ee < fe; Ee++)
            xe[Ee] = arguments[Ee];
          return c(Z, null, [(ze = t["append-inner"]) == null ? void 0 : ze.call(t, ...xe), e.menuIcon ? c(we, {
            class: "v-autocomplete__menu-icon",
            color: (Ce = n.value) == null ? void 0 : Ce.fieldIconColor,
            icon: e.menuIcon,
            onMousedown: L,
            onClick: Ui,
            "aria-label": a(U.value),
            title: a(U.value),
            tabindex: "-1"
          }, null) : void 0]);
        }
      });
    }), ht({
      isFocused: o,
      isPristine: i,
      menu: F,
      search: h,
      filteredItems: S,
      select: pe
    }, n);
  }
}), Jr = ["name", "value"], eu = /* @__PURE__ */ je({
  __name: "OxAutocomplete",
  props: /* @__PURE__ */ Ka({
    repo: {},
    lookup: { default: "search" },
    name: {},
    filters: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    const l = st(), t = ja(e, "modelValue"), a = Y(null), n = Y(""), o = e, i = Xl(), s = de("repos"), { state: r, query: u, fetch: d } = hi(o.repo, s, { save: !1 }), v = Ge([]);
    var y = null;
    async function f(m) {
      if (m) {
        const p = v.findIndex((S) => S.id == m);
        if (p != -1)
          a.value = v[p];
        else if (y != m) {
          y = m;
          const I = (await d({ id: m })).entities[0];
          I.id == m ? (v.splice(0, 0, I), a.value = I) : a.value = null;
        }
      } else
        a.value = null;
      return a;
    }
    let g = null;
    const k = xa.debounce(async ({ reset: m = !1 } = {}) => {
      if (r.isProcessing)
        return;
      const p = n.value != "<empty string>" && n.value || "";
      if (!m && p == g)
        return;
      g = p;
      const S = { ...o.filters, page_size: 20 };
      S[o.lookup] = p;
      let I = await d({ params: S });
      a.value ? v.splice(0, v.length, ...xa.unionBy([a.value], I.entities)) : v.splice(0, v.length, ...I.entities), m || (!a.value && await f(t.value), n.value = p);
    }, 500);
    function h(m) {
      k({ reset: !0 });
    }
    function w(m) {
      m != "<empty string>" && m != g && k({ q: m });
    }
    return qe(() => {
      k();
    }), J(() => o.filters, (m, p) => {
      xa.isEqual(_a(m), _a(p)) || h();
    }), J(n, w), J(t, (m, p) => m != p && f(m)), (m, p) => (M(), me(Z, null, [
      o.name ? (M(), me("input", {
        key: 0,
        type: "hidden",
        name: o.name,
        value: t.value
      }, null, 8, Jr)) : ue("", !0),
      c(x(Qr), H(x(i), {
        items: v,
        loading: x(r).isProcessing,
        modelValue: t.value,
        "onUpdate:modelValue": p[0] || (p[0] = (S) => t.value = S),
        search: n.value,
        "onUpdate:search": p[1] || (p[1] = (S) => n.value = S)
      }), wt({ _: 2 }, [
        _e(x(l), (S, I) => ({
          name: I,
          fn: O((C) => [
            G(m.$slots, I, Pe(Ie(C)))
          ])
        }))
      ]), 1040, ["items", "loading", "modelValue", "search"])
    ], 64));
  }
}), tu = {
  props: {
    src: String,
    is: String
  },
  setup(e) {
    const l = X(null), t = P(() => {
      if (e.is)
        return e.is;
      let n = e.src.substring(e.src.lastIndexOf("/") + 1);
      if (n && (n = n.substring(0, n.indexOf("."))), !n)
        throw Error(
          "`is` not provided and could not be deducted from `src`."
        );
      return n;
    });
    function a() {
      l.value = bi(e.src, t.value);
    }
    return J(() => e.src, a), a(), () => ui(l.value, e);
  }
}, au = { class: "text-error" }, za = {
  __name: "OxFieldDetails",
  props: {
    state: Object,
    errors: Array
  },
  setup(e) {
    const l = e;
    return (t, a) => l.errors ? (M(!0), me(Z, { key: 0 }, _e(l.errors, (n) => (M(), me("div", au, [
      c(we, { icon: "mdi-alert-circle-outline" }),
      ke(" " + Be(n), 1)
    ]))), 256)) : ue("", !0);
  }
}, yo = {
  __name: "OxListFilters",
  props: {
    search: String
  },
  setup(e, { expose: l }) {
    const t = de("list"), a = e, n = P(() => {
      const s = t.filters;
      return s && Object.entries(s).some(
        ([r, u]) => !r.startsWith("page") && !r.startsWith("ordering") && !!u
      );
    }), o = P(() => n.value ? "mdi-filter-check" : "mdi-filter-outline");
    function i() {
      t.filters = {}, t.load();
    }
    return l({ icon: o, hasFilters: n, reset: i }), (s, r) => (M(), me("form", {
      onSubmit: r[2] || (r[2] = Ve((u) => x(t).load(), ["prevent"])),
      class: "ox-list-filters width-full"
    }, [
      c(Fa, {
        dense: "",
        color: "transparent"
      }, {
        default: O(() => [
          c(Dn, {
            icon: o.value,
            readonly: ""
          }, null, 8, ["icon"]),
          a.search && x(t).filters ? (M(), q(vt, {
            key: 0,
            label: x(ie)("filters.search"),
            density: "compact",
            class: "ml-2",
            modelValue: x(t).filters[a.search],
            "onUpdate:modelValue": r[0] || (r[0] = (u) => x(t).filters[a.search] = u),
            "hide-details": ""
          }, null, 8, ["label", "modelValue"])) : ue("", !0),
          G(s.$slots, "default", {
            list: x(t),
            filters: x(t).filters
          }),
          c(ge, {
            onClick: r[1] || (r[1] = Ve((u) => x(t).load(), ["stop"])),
            class: "ml-2",
            icon: "mdi-check",
            "aria-label": s.$t("filters.apply"),
            title: x(ie)("filters.apply")
          }, null, 8, ["aria-label", "title"]),
          n.value ? (M(), q(ge, {
            key: 1,
            onClick: Ve(i, ["stop"]),
            icon: "mdi-backspace",
            "aria-label": x(ie)("filters.reset"),
            title: x(ie)("filters.reset")
          }, null, 8, ["aria-label", "title"])) : ue("", !0)
        ]),
        _: 3
      })
    ], 32));
  }
}, lu = K({
  ...he(),
  ...Ir()
}, "VForm"), Wa = ee()({
  name: "VForm",
  props: lu(),
  emits: {
    "update:modelValue": (e) => !0,
    submit: (e) => !0
  },
  setup(e, l) {
    let {
      slots: t,
      emit: a
    } = l;
    const n = Tr(e), o = Y();
    function i(r) {
      r.preventDefault(), n.reset();
    }
    function s(r) {
      const u = r, d = n.validate();
      u.then = d.then.bind(d), u.catch = d.catch.bind(d), u.finally = d.finally.bind(d), a("submit", u), u.defaultPrevented || d.then((v) => {
        var f;
        let {
          valid: y
        } = v;
        y && ((f = o.value) == null || f.submit());
      }), u.preventDefault();
    }
    return oe(() => {
      var r;
      return c("form", {
        ref: o,
        class: ["v-form", e.class],
        style: e.style,
        novalidate: !0,
        onReset: i,
        onSubmit: s
      }, [(r = t.default) == null ? void 0 : r.call(t, n)]);
    }), ht(n, o);
  }
}), nu = { class: "flex-row justify-right" }, ou = /* @__PURE__ */ je({
  __name: "OxFormList",
  props: /* @__PURE__ */ Ka({
    useModel: Function,
    editable: Boolean
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    var u;
    const l = ja(e, "modelValue"), t = de("user"), a = Y({}), n = e, o = P(() => ({
      add: n.editable && t.can([n.useModel, "add"]),
      change: n.editable && t.can([n.useModel, "change"]),
      delete: n.editable && t.can([n.useModel, "delete"])
    })), i = Y([]);
    (u = l.value) != null && u.length || i.value.push(-1);
    function s() {
      l.value.push(a.value), a.value = {};
    }
    function r(d) {
      confirm(ie("actions.delete.confirm")) && n.delete && l.value.splice(d);
    }
    return (d, v) => (M(), q(it, {
      opened: i.value,
      "onUpdate:opened": v[3] || (v[3] = (y) => i.value = y)
    }, {
      default: O(() => {
        var y;
        return [
          (y = l.value) != null && y.length ? (M(!0), me(Z, { key: 0 }, _e(l.value, (f, g) => (M(), q(Ea, {
            key: g,
            value: g
          }, {
            activator: O(({ props: k }) => [
              c(We, H({ ref_for: !0 }, k), {
                append: O(() => [
                  ot("div", {
                    onClick: v[0] || (v[0] = Ve(() => {
                    }, ["stop"]))
                  }, [
                    G(d.$slots, "item.actions", H({
                      item: f,
                      index: g,
                      ref_for: !0
                    }, k)),
                    o.value.delete ? (M(), q(ge, {
                      key: 0,
                      type: "button",
                      class: "ml-2",
                      size: "small",
                      onClick: Ve((h) => r(g), ["stop", "prevent"]),
                      color: "error",
                      "aria-label": x(ie)("actions.remove"),
                      title: x(ie)("actions.remove"),
                      icon: "mdi-delete"
                    }, null, 8, ["onClick", "aria-label", "title"])) : ue("", !0)
                  ])
                ]),
                default: O(() => [
                  c(Bi, null, {
                    default: O(() => [
                      G(d.$slots, "item.title", { item: f })
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1040)
            ]),
            default: O(() => [
              c(Wa, {
                disabled: !o.value.change
              }, {
                default: O(() => [
                  G(d.$slots, "item", {
                    item: f,
                    index: g,
                    editable: o.value.change
                  })
                ]),
                _: 2
              }, 1032, ["disabled"])
            ]),
            _: 2
          }, 1032, ["value"]))), 128)) : (M(), q(We, {
            key: 1,
            title: x(ie)("lists.empty")
          }, null, 8, ["title"])),
          o.value.add ? (M(), me(Z, { key: 2 }, [
            l.value.length ? (M(), q(Lt, { key: 0 })) : ue("", !0),
            c(Ea, { value: -1 }, {
              activator: O(({ props: f }) => [
                c(We, H(f, {
                  title: x(ie)("actions.add_item"),
                  "prepend-icon": "mdi-plus"
                }), null, 16, ["title"])
              ]),
              default: O(() => [
                c(Wa, null, {
                  default: O(() => [
                    G(d.$slots, "item", {
                      item: a.value,
                      edit: !0
                    })
                  ]),
                  _: 3
                }),
                a.value ? (M(), q(We, { key: 0 }, {
                  default: O(() => [
                    ot("div", nu, [
                      a.value ? (M(), q(ge, {
                        key: 0,
                        size: "small",
                        onClick: v[1] || (v[1] = (f) => a.value = {}),
                        color: "secondary",
                        "prepend-icon": "mdi-backspace",
                        "aria-label": x(ie)("actions.discard")
                      }, {
                        default: O(() => [
                          ke(Be(x(ie)("actions.discard")), 1)
                        ]),
                        _: 1
                      }, 8, ["aria-label"])) : ue("", !0),
                      a.value ? (M(), q(ge, {
                        key: 1,
                        size: "small",
                        onClick: v[2] || (v[2] = (f) => s()),
                        color: "primary",
                        "prepend-icon": "mdi-plus",
                        "aria-label": x(ie)("actions.add")
                      }, {
                        default: O(() => [
                          ke(Be(x(ie)("actions.add")), 1)
                        ]),
                        _: 1
                      }, 8, ["aria-label"])) : ue("", !0)
                    ])
                  ]),
                  _: 1
                })) : ue("", !0)
              ]),
              _: 3
            })
          ], 64)) : ue("", !0)
        ];
      }),
      _: 3
    }, 8, ["opened"]));
  }
}), iu = ee()({
  name: "VCardActions",
  props: he(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    return Qe({
      VBtn: {
        slim: !0,
        variant: "text"
      }
    }), oe(() => {
      var a;
      return c("div", {
        class: ["v-card-actions", e.class],
        style: e.style
      }, [(a = t.default) == null ? void 0 : a.call(t)]);
    }), {};
  }
}), su = K({
  opacity: [Number, String],
  ...he(),
  ...Ne()
}, "VCardSubtitle"), ru = ee()({
  name: "VCardSubtitle",
  props: su(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    return oe(() => c(e.tag, {
      class: ["v-card-subtitle", e.class],
      style: [{
        "--v-card-subtitle-opacity": e.opacity
      }, e.style]
    }, t)), {};
  }
}), ho = _i("v-card-title"), uu = K({
  appendAvatar: String,
  appendIcon: ye,
  prependAvatar: String,
  prependIcon: ye,
  subtitle: {
    type: [String, Number, Boolean],
    default: void 0
  },
  title: {
    type: [String, Number, Boolean],
    default: void 0
  },
  ...he(),
  ...rt()
}, "VCardItem"), cu = ee()({
  name: "VCardItem",
  props: uu(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    return oe(() => {
      var u;
      const a = !!(e.prependAvatar || e.prependIcon), n = !!(a || t.prepend), o = !!(e.appendAvatar || e.appendIcon), i = !!(o || t.append), s = !!(e.title != null || t.title), r = !!(e.subtitle != null || t.subtitle);
      return c("div", {
        class: ["v-card-item", e.class],
        style: e.style
      }, [n && c("div", {
        key: "prepend",
        class: "v-card-item__prepend"
      }, [t.prepend ? c(Oe, {
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
      }, t.prepend) : c(Z, null, [e.prependAvatar && c(xt, {
        key: "prepend-avatar",
        density: e.density,
        image: e.prependAvatar
      }, null), e.prependIcon && c(we, {
        key: "prepend-icon",
        density: e.density,
        icon: e.prependIcon
      }, null)])]), c("div", {
        class: "v-card-item__content"
      }, [s && c(ho, {
        key: "title"
      }, {
        default: () => {
          var d;
          return [((d = t.title) == null ? void 0 : d.call(t)) ?? Be(e.title)];
        }
      }), r && c(ru, {
        key: "subtitle"
      }, {
        default: () => {
          var d;
          return [((d = t.subtitle) == null ? void 0 : d.call(t)) ?? Be(e.subtitle)];
        }
      }), (u = t.default) == null ? void 0 : u.call(t)]), i && c("div", {
        key: "append",
        class: "v-card-item__append"
      }, [t.append ? c(Oe, {
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
      }, t.append) : c(Z, null, [e.appendIcon && c(we, {
        key: "append-icon",
        density: e.density,
        icon: e.appendIcon
      }, null), e.appendAvatar && c(xt, {
        key: "append-avatar",
        density: e.density,
        image: e.appendAvatar
      }, null)])])]);
    }), {};
  }
}), du = K({
  opacity: [Number, String],
  ...he(),
  ...Ne()
}, "VCardText"), vu = ee()({
  name: "VCardText",
  props: du(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    return oe(() => c(e.tag, {
      class: ["v-card-text", e.class],
      style: [{
        "--v-card-text-opacity": e.opacity
      }, e.style]
    }, t)), {};
  }
}), fu = K({
  appendAvatar: String,
  appendIcon: ye,
  disabled: Boolean,
  flat: Boolean,
  hover: Boolean,
  image: String,
  link: {
    type: Boolean,
    default: void 0
  },
  prependAvatar: String,
  prependIcon: ye,
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
  ...Rt(),
  ...he(),
  ...rt(),
  ...At(),
  ...It(),
  ...al(),
  ...nn(),
  ...ln(),
  ...gt(),
  ...dn(),
  ...Ne(),
  ...Fe(),
  ...Ht({
    variant: "elevated"
  })
}, "VCard"), mu = ee()({
  name: "VCard",
  directives: {
    Ripple: Ja
  },
  props: fu(),
  setup(e, l) {
    let {
      attrs: t,
      slots: a
    } = l;
    const {
      themeClasses: n
    } = He(e), {
      borderClasses: o
    } = da(e), {
      colorClasses: i,
      colorStyles: s,
      variantClasses: r
    } = Ya(e), {
      densityClasses: u
    } = Bt(e), {
      dimensionStyles: d
    } = Tt(e), {
      elevationClasses: v
    } = Mt(e), {
      loaderClasses: y
    } = el(e), {
      locationStyles: f
    } = $i(e), {
      positionClasses: g
    } = an(e), {
      roundedClasses: k
    } = Pt(e), h = rn(e, t);
    return oe(() => {
      const w = e.link !== !1 && h.isLink.value, m = !e.disabled && e.link !== !1 && (e.link || h.isClickable.value), p = w ? "a" : e.tag, S = !!(a.title || e.title != null), I = !!(a.subtitle || e.subtitle != null), C = S || I, T = !!(a.append || e.appendAvatar || e.appendIcon), b = !!(a.prepend || e.prependAvatar || e.prependIcon), V = !!(a.image || e.image), A = C || b || T, $ = !!(a.text || e.text != null);
      return Ye(c(p, H({
        class: ["v-card", {
          "v-card--disabled": e.disabled,
          "v-card--flat": e.flat,
          "v-card--hover": e.hover && !(e.disabled || e.flat),
          "v-card--link": m
        }, n.value, o.value, i.value, u.value, v.value, y.value, g.value, k.value, r.value, e.class],
        style: [s.value, d.value, f.value, e.style],
        onClick: m && h.navigate,
        tabindex: e.disabled ? -1 : void 0
      }, h.linkProps), {
        default: () => {
          var R;
          return [V && c("div", {
            key: "image",
            class: "v-card__image"
          }, [a.image ? c(Oe, {
            key: "image-defaults",
            disabled: !e.image,
            defaults: {
              VImg: {
                cover: !0,
                src: e.image
              }
            }
          }, a.image) : c(fa, {
            key: "image-img",
            cover: !0,
            src: e.image
          }, null)]), c(tl, {
            name: "v-card",
            active: !!e.loading,
            color: typeof e.loading == "boolean" ? void 0 : e.loading
          }, {
            default: a.loader
          }), A && c(cu, {
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
          }), $ && c(vu, {
            key: "text"
          }, {
            default: () => {
              var F;
              return [((F = a.text) == null ? void 0 : F.call(a)) ?? e.text];
            }
          }), (R = a.default) == null ? void 0 : R.call(a), a.actions && c(iu, null, {
            default: a.actions
          }), qa(m, "v-card")];
        }
      }), [[Ct("ripple"), m && e.ripple]]);
    }), {};
  }
}), gu = ee()({
  name: "VSlideGroupItem",
  props: Za(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = Qa(e, Zn);
    return () => {
      var n;
      return (n = t.default) == null ? void 0 : n.call(t, {
        isSelected: a.isSelected.value,
        select: a.select,
        toggle: a.toggle,
        selectedClass: a.selectedClass.value
      });
    };
  }
}), yu = {
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
  setup(e, { emit: l }) {
    const t = l;
    de("list");
    const a = de("items"), n = e;
    function o(r) {
      return r = r % n.colors.length, n.colorVariant ? n.colors[r] + "-" + n.colorVariant : n.colors[r];
    }
    function i(r, u, d) {
      r[d] ? !r[d].includes(u) && r[d].push(u) : r[d] = [u];
    }
    const s = P(() => {
      const r = {};
      if (a.value)
        for (var u of a.value) {
          const v = u[n.field];
          if (Array.isArray(v))
            if (v.length)
              for (var d of v)
                i(r, u, d);
            else
              i(r, u, null);
          else
            i(r, u, v);
        }
      return r;
    });
    return (r, u) => (M(), q(fn, null, {
      default: O(() => [
        c(Dt, null, {
          default: O(() => [
            (M(!0), me(Z, null, _e(n.headers, (d, v) => (M(), q(gu, {
              key: d.value
            }, {
              default: O(({ selectedClass: y }) => [
                c(mu, {
                  width: "400",
                  class: ci(["ma-3", y]),
                  color: o(v),
                  lines: "two"
                }, {
                  default: O(() => [
                    c(ho, null, {
                      default: O(() => [
                        ke(Be(d.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    c(it, {
                      "bg-color": o(v)
                    }, {
                      default: O(() => [
                        s.value && s.value[d.value] ? (M(!0), me(Z, { key: 0 }, _e(s.value[d.value], (f) => G(r.$slots, "item", {
                          key: f.id,
                          header: d,
                          item: f
                        }, () => [
                          c(We, {
                            title: f[n.itemTitle],
                            value: n.itemValue && f[n.itemValue],
                            onClick: (g) => t("click", f)
                          }, {
                            append: O(() => [
                              G(r.$slots, "item.action")
                            ]),
                            _: 2
                          }, 1032, ["title", "value", "onClick"])
                        ])), 128)) : ue("", !0)
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
};
function hu() {
  const e = Y([]);
  di(() => e.value = []);
  function l(t, a) {
    e.value[a] = t;
  }
  return {
    refs: e,
    updateRef: l
  };
}
const bu = K({
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
    type: ye,
    default: "$first"
  },
  prevIcon: {
    type: ye,
    default: "$prev"
  },
  nextIcon: {
    type: ye,
    default: "$next"
  },
  lastIcon: {
    type: ye,
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
  ...Rt(),
  ...he(),
  ...rt(),
  ...It(),
  ...gt(),
  ...cn(),
  ...Ne({
    tag: "nav"
  }),
  ...Fe(),
  ...Ht({
    variant: "text"
  })
}, "VPagination"), Kl = ee()({
  name: "VPagination",
  props: bu(),
  emits: {
    "update:modelValue": (e) => !0,
    first: (e) => !0,
    prev: (e) => !0,
    next: (e) => !0,
    last: (e) => !0
  },
  setup(e, l) {
    let {
      slots: t,
      emit: a
    } = l;
    const n = be(e, "modelValue"), {
      t: o,
      n: i
    } = Xe(), {
      isRtl: s
    } = et(), {
      themeClasses: r
    } = He(e), {
      width: u
    } = ut(), d = X(-1);
    Qe(void 0, {
      scoped: !0
    });
    const {
      resizeRef: v
    } = St((b) => {
      if (!b.length) return;
      const {
        target: V,
        contentRect: A
      } = b[0], $ = V.querySelector(".v-pagination__list > *");
      if (!$) return;
      const R = A.width, F = $.offsetWidth + parseFloat(getComputedStyle($).marginRight) * 2;
      d.value = k(R, F);
    }), y = P(() => parseInt(e.length, 10)), f = P(() => parseInt(e.start, 10)), g = P(() => e.totalVisible != null ? parseInt(e.totalVisible, 10) : d.value >= 0 ? d.value : k(u.value, 58));
    function k(b, V) {
      const A = e.showFirstLastPage ? 5 : 3;
      return Math.max(0, Math.floor(
        // Round to two decimal places to avoid floating point errors
        Number(((b - V * A) / V).toFixed(2))
      ));
    }
    const h = P(() => {
      if (y.value <= 0 || isNaN(y.value) || y.value > Number.MAX_SAFE_INTEGER) return [];
      if (g.value <= 0) return [];
      if (g.value === 1) return [n.value];
      if (y.value <= g.value)
        return Gt(y.value, f.value);
      const b = g.value % 2 === 0, V = b ? g.value / 2 : Math.floor(g.value / 2), A = b ? V : V + 1, $ = y.value - V;
      if (A - n.value >= 0)
        return [...Gt(Math.max(1, g.value - 1), f.value), e.ellipsis, y.value];
      if (n.value - $ >= (b ? 1 : 0)) {
        const R = g.value - 1, F = y.value - R + f.value;
        return [f.value, e.ellipsis, ...Gt(R, F)];
      } else {
        const R = Math.max(1, g.value - 2), F = R === 1 ? n.value : n.value - Math.ceil(R / 2) + f.value;
        return [f.value, e.ellipsis, ...Gt(R, F), e.ellipsis, y.value];
      }
    });
    function w(b, V, A) {
      b.preventDefault(), n.value = V, A && a(A, V);
    }
    const {
      refs: m,
      updateRef: p
    } = hu();
    Qe({
      VPaginationBtn: {
        color: N(() => e.color),
        border: N(() => e.border),
        density: N(() => e.density),
        size: N(() => e.size),
        variant: N(() => e.variant),
        rounded: N(() => e.rounded),
        elevation: N(() => e.elevation)
      }
    });
    const S = P(() => h.value.map((b, V) => {
      const A = ($) => p($, V);
      if (typeof b == "string")
        return {
          isActive: !1,
          key: `ellipsis-${V}`,
          page: b,
          props: {
            ref: A,
            ellipsis: !0,
            icon: !0,
            disabled: !0
          }
        };
      {
        const $ = b === n.value;
        return {
          isActive: $,
          key: b,
          page: i(b),
          props: {
            ref: A,
            ellipsis: !1,
            icon: !0,
            disabled: !!e.disabled || Number(e.length) < 2,
            color: $ ? e.activeColor : e.color,
            "aria-current": $,
            "aria-label": o($ ? e.currentPageAriaLabel : e.pageAriaLabel, b),
            onClick: (R) => w(R, b)
          }
        };
      }
    })), I = P(() => {
      const b = !!e.disabled || n.value <= f.value, V = !!e.disabled || n.value >= f.value + y.value - 1;
      return {
        first: e.showFirstLastPage ? {
          icon: s.value ? e.lastIcon : e.firstIcon,
          onClick: (A) => w(A, f.value, "first"),
          disabled: b,
          "aria-label": o(e.firstAriaLabel),
          "aria-disabled": b
        } : void 0,
        prev: {
          icon: s.value ? e.nextIcon : e.prevIcon,
          onClick: (A) => w(A, n.value - 1, "prev"),
          disabled: b,
          "aria-label": o(e.previousAriaLabel),
          "aria-disabled": b
        },
        next: {
          icon: s.value ? e.prevIcon : e.nextIcon,
          onClick: (A) => w(A, n.value + 1, "next"),
          disabled: V,
          "aria-label": o(e.nextAriaLabel),
          "aria-disabled": V
        },
        last: e.showFirstLastPage ? {
          icon: s.value ? e.firstIcon : e.lastIcon,
          onClick: (A) => w(A, f.value + y.value - 1, "last"),
          disabled: V,
          "aria-label": o(e.lastAriaLabel),
          "aria-disabled": V
        } : void 0
      };
    });
    function C() {
      var V;
      const b = n.value - f.value;
      (V = m.value[b]) == null || V.$el.focus();
    }
    function T(b) {
      b.key === Il.left && !e.disabled && n.value > Number(e.start) ? (n.value = n.value - 1, $e(C)) : b.key === Il.right && !e.disabled && n.value < f.value + y.value - 1 && (n.value = n.value + 1, $e(C));
    }
    return oe(() => c(e.tag, {
      ref: v,
      class: ["v-pagination", r.value, e.class],
      style: e.style,
      role: "navigation",
      "aria-label": o(e.ariaLabel),
      onKeydown: T,
      "data-test": "v-pagination-root"
    }, {
      default: () => [c("ul", {
        class: "v-pagination__list"
      }, [e.showFirstLastPage && c("li", {
        key: "first",
        class: "v-pagination__first",
        "data-test": "v-pagination-first"
      }, [t.first ? t.first(I.value.first) : c(ge, H({
        _as: "VPaginationBtn"
      }, I.value.first), null)]), c("li", {
        key: "prev",
        class: "v-pagination__prev",
        "data-test": "v-pagination-prev"
      }, [t.prev ? t.prev(I.value.prev) : c(ge, H({
        _as: "VPaginationBtn"
      }, I.value.prev), null)]), S.value.map((b, V) => c("li", {
        key: b.key,
        class: ["v-pagination__item", {
          "v-pagination__item--is-active": b.isActive
        }],
        "data-test": "v-pagination-item"
      }, [t.item ? t.item(b) : c(ge, H({
        _as: "VPaginationBtn"
      }, b.props), {
        default: () => [b.page]
      })])), c("li", {
        key: "next",
        class: "v-pagination__next",
        "data-test": "v-pagination-next"
      }, [t.next ? t.next(I.value.next) : c(ge, H({
        _as: "VPaginationBtn"
      }, I.value.next), null)]), e.showFirstLastPage && c("li", {
        key: "last",
        class: "v-pagination__last",
        "data-test": "v-pagination-last"
      }, [t.last ? t.last(I.value.last) : c(ge, H({
        _as: "VPaginationBtn"
      }, I.value.last), null)])])]
    })), {};
  }
}), bo = K({
  page: {
    type: [Number, String],
    default: 1
  },
  itemsPerPage: {
    type: [Number, String],
    default: 10
  }
}, "DataTable-paginate"), po = Symbol.for("vuetify:data-table-pagination");
function wo(e) {
  const l = be(e, "page", void 0, (a) => Number(a ?? 1)), t = be(e, "itemsPerPage", void 0, (a) => Number(a ?? 10));
  return {
    page: l,
    itemsPerPage: t
  };
}
function So(e) {
  const {
    page: l,
    itemsPerPage: t,
    itemsLength: a
  } = e, n = P(() => t.value === -1 ? 0 : t.value * (l.value - 1)), o = P(() => t.value === -1 ? a.value : Math.min(a.value, n.value + t.value)), i = P(() => t.value === -1 || a.value === 0 ? 1 : Math.ceil(a.value / t.value));
  J([l, i], () => {
    l.value > i.value && (l.value = i.value);
  });
  function s(y) {
    t.value = y, l.value = 1;
  }
  function r() {
    l.value = tt(l.value + 1, 1, i.value);
  }
  function u() {
    l.value = tt(l.value - 1, 1, i.value);
  }
  function d(y) {
    l.value = tt(y, 1, i.value);
  }
  const v = {
    page: l,
    itemsPerPage: t,
    startIndex: n,
    stopIndex: o,
    pageCount: i,
    itemsLength: a,
    nextPage: r,
    prevPage: u,
    setPage: d,
    setItemsPerPage: s
  };
  return Me(po, v), v;
}
function pu() {
  const e = de(po);
  if (!e) throw new Error("Missing pagination!");
  return e;
}
function wu(e) {
  const l = Je("usePaginatedItems"), {
    items: t,
    startIndex: a,
    stopIndex: n,
    itemsPerPage: o
  } = e, i = P(() => o.value <= 0 ? t.value : t.value.slice(a.value, n.value));
  return J(i, (s) => {
    l.emit("update:currentItems", s);
  }, {
    immediate: !0
  }), {
    paginatedItems: i
  };
}
const ml = K({
  prevIcon: {
    type: ye,
    default: "$prev"
  },
  nextIcon: {
    type: ye,
    default: "$next"
  },
  firstIcon: {
    type: ye,
    default: "$first"
  },
  lastIcon: {
    type: ye,
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
}, "VDataTableFooter"), ia = ee()({
  name: "VDataTableFooter",
  props: ml(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    const {
      t: a
    } = Xe(), {
      page: n,
      pageCount: o,
      startIndex: i,
      stopIndex: s,
      itemsLength: r,
      itemsPerPage: u,
      setItemsPerPage: d
    } = pu(), v = P(() => e.itemsPerPageOptions.map((y) => typeof y == "number" ? {
      value: y,
      title: y === -1 ? a("$vuetify.dataFooter.itemsPerPageAll") : String(y)
    } : {
      ...y,
      title: isNaN(Number(y.title)) ? a(y.title) : y.title
    }));
    return oe(() => {
      var f;
      const y = Kl.filterProps(e);
      return c("div", {
        class: "v-data-table-footer"
      }, [(f = t.prepend) == null ? void 0 : f.call(t), c("div", {
        class: "v-data-table-footer__items-per-page"
      }, [c("span", null, [a(e.itemsPerPageText)]), c(fo, {
        items: v.value,
        modelValue: u.value,
        "onUpdate:modelValue": (g) => d(Number(g)),
        density: "compact",
        variant: "outlined",
        "hide-details": !0
      }, null)]), c("div", {
        class: "v-data-table-footer__info"
      }, [c("div", null, [a(e.pageText, r.value ? i.value + 1 : 0, s.value, r.value)])]), c("div", {
        class: "v-data-table-footer__pagination"
      }, [c(Kl, H({
        modelValue: n.value,
        "onUpdate:modelValue": (g) => n.value = g,
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
      }, y), null)])]);
    }), {};
  }
}), sa = Ki({
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
}, (e, l) => {
  let {
    slots: t
  } = l;
  const a = e.tag ?? "td";
  return c(a, {
    class: ["v-data-table__td", {
      "v-data-table-column--fixed": e.fixed,
      "v-data-table-column--last-fixed": e.lastFixed,
      "v-data-table-column--no-padding": e.noPadding,
      "v-data-table-column--nowrap": e.nowrap
    }, `v-data-table-column--align-${e.align}`],
    style: {
      height: ve(e.height),
      width: ve(e.width),
      maxWidth: ve(e.maxWidth),
      left: ve(e.fixedOffset || null)
    }
  }, {
    default: () => {
      var n;
      return [(n = t.default) == null ? void 0 : n.call(t)];
    }
  });
}), Su = K({
  headers: Array
}, "DataTable-header"), xo = Symbol.for("vuetify:data-table-headers"), ko = {
  title: "",
  sortable: !1
}, xu = {
  ...ko,
  width: 48
};
function ku() {
  const l = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []).map((t) => ({
    element: t,
    priority: 0
  }));
  return {
    enqueue: (t, a) => {
      let n = !1;
      for (let o = 0; o < l.length; o++)
        if (l[o].priority > a) {
          l.splice(o, 0, {
            element: t,
            priority: a
          }), n = !0;
          break;
        }
      n || l.push({
        element: t,
        priority: a
      });
    },
    size: () => l.length,
    count: () => {
      let t = 0;
      if (!l.length) return 0;
      const a = Math.floor(l[0].priority);
      for (let n = 0; n < l.length; n++)
        Math.floor(l[n].priority) === a && (t += 1);
      return t;
    },
    dequeue: () => l.shift()
  };
}
function Ua(e) {
  let l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  if (!e.children)
    l.push(e);
  else
    for (const t of e.children)
      Ua(t, l);
  return l;
}
function Vo(e) {
  let l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : /* @__PURE__ */ new Set();
  for (const t of e)
    t.key && l.add(t.key), t.children && Vo(t.children, l);
  return l;
}
function Vu(e) {
  if (e.key) {
    if (e.key === "data-table-group") return ko;
    if (["data-table-expand", "data-table-select"].includes(e.key)) return xu;
  }
}
function gl(e) {
  let l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return e.children ? Math.max(l, ...e.children.map((t) => gl(t, l + 1))) : l;
}
function Cu(e) {
  let l = !1;
  function t(o) {
    let i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (o)
      if (i && (o.fixed = !0), o.fixed)
        if (o.children)
          for (let s = o.children.length - 1; s >= 0; s--)
            t(o.children[s], !0);
        else
          l ? isNaN(Number(o.width)) ? hn(`Multiple fixed columns should have a static width (key: ${o.key})`) : o.minWidth = Math.max(Number(o.width) || 0, Number(o.minWidth) || 0) : o.lastFixed = !0, l = !0;
      else if (o.children)
        for (let s = o.children.length - 1; s >= 0; s--)
          t(o.children[s]);
      else
        l = !1;
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
  let n = 0;
  for (const o of e)
    n = a(o, n);
}
function Pu(e, l) {
  const t = [];
  let a = 0;
  const n = ku(e);
  for (; n.size() > 0; ) {
    let i = n.count();
    const s = [];
    let r = 1;
    for (; i > 0; ) {
      const {
        element: u,
        priority: d
      } = n.dequeue(), v = l - a - gl(u);
      if (s.push({
        ...u,
        rowspan: v ?? 1,
        colspan: u.children ? Ua(u).length : 1
      }), u.children)
        for (const y of u.children) {
          const f = d % 1 + r / Math.pow(10, a + 2);
          n.enqueue(y, a + v + f);
        }
      r += 1, i -= 1;
    }
    a += 1, t.push(s);
  }
  return {
    columns: e.map((i) => Ua(i)).flat(),
    headers: t
  };
}
function Co(e) {
  const l = [];
  for (const t of e) {
    const a = {
      ...Vu(t),
      ...t
    }, n = a.key ?? (typeof a.value == "string" ? a.value : null), o = a.value ?? n ?? null, i = {
      ...a,
      key: n,
      value: o,
      sortable: a.sortable ?? (a.key != null || !!a.sort),
      children: a.children ? Co(a.children) : void 0
    };
    l.push(i);
  }
  return l;
}
function Po(e, l) {
  const t = Y([]), a = Y([]), n = Y({}), o = Y({}), i = Y({});
  Ze(() => {
    var k, h, w;
    const u = (e.headers || Object.keys(e.items[0] ?? {}).map((m) => ({
      key: m,
      title: vi(m)
    }))).slice(), d = Vo(u);
    (k = l == null ? void 0 : l.groupBy) != null && k.value.length && !d.has("data-table-group") && u.unshift({
      key: "data-table-group",
      title: "Group"
    }), (h = l == null ? void 0 : l.showSelect) != null && h.value && !d.has("data-table-select") && u.unshift({
      key: "data-table-select"
    }), (w = l == null ? void 0 : l.showExpand) != null && w.value && !d.has("data-table-expand") && u.push({
      key: "data-table-expand"
    });
    const v = Co(u);
    Cu(v);
    const y = Math.max(...v.map((m) => gl(m))) + 1, f = Pu(v, y);
    t.value = f.headers, a.value = f.columns;
    const g = f.headers.flat(1);
    for (const m of g)
      m.key && (m.sortable && (m.sort && (n.value[m.key] = m.sort), m.sortRaw && (o.value[m.key] = m.sortRaw)), m.filter && (i.value[m.key] = m.filter));
  });
  const s = {
    headers: t,
    columns: a,
    sortFunctions: n,
    sortRawFunctions: o,
    filterFunctions: i
  };
  return Me(xo, s), s;
}
function ga() {
  const e = de(xo);
  if (!e) throw new Error("Missing headers!");
  return e;
}
const Iu = {
  showSelectAll: !1,
  allSelected: () => [],
  select: (e) => {
    var a;
    let {
      items: l,
      value: t
    } = e;
    return new Set(t ? [(a = l[0]) == null ? void 0 : a.value] : []);
  },
  selectAll: (e) => {
    let {
      selected: l
    } = e;
    return l;
  }
}, Io = {
  showSelectAll: !0,
  allSelected: (e) => {
    let {
      currentPage: l
    } = e;
    return l;
  },
  select: (e) => {
    let {
      items: l,
      value: t,
      selected: a
    } = e;
    for (const n of l)
      t ? a.add(n.value) : a.delete(n.value);
    return a;
  },
  selectAll: (e) => {
    let {
      value: l,
      currentPage: t,
      selected: a
    } = e;
    return Io.select({
      items: t,
      value: l,
      selected: a
    });
  }
}, To = {
  showSelectAll: !0,
  allSelected: (e) => {
    let {
      allItems: l
    } = e;
    return l;
  },
  select: (e) => {
    let {
      items: l,
      value: t,
      selected: a
    } = e;
    for (const n of l)
      t ? a.add(n.value) : a.delete(n.value);
    return a;
  },
  selectAll: (e) => {
    let {
      value: l,
      allItems: t,
      selected: a
    } = e;
    return To.select({
      items: t,
      value: l,
      selected: a
    });
  }
}, Tu = K({
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
    default: at
  }
}, "DataTable-select"), Ao = Symbol.for("vuetify:data-table-selection");
function Bo(e, l) {
  let {
    allItems: t,
    currentPage: a
  } = l;
  const n = be(e, "modelValue", e.modelValue, (m) => new Set(De(m).map((p) => {
    var S;
    return ((S = t.value.find((I) => e.valueComparator(p, I.value))) == null ? void 0 : S.value) ?? p;
  })), (m) => [...m.values()]), o = P(() => t.value.filter((m) => m.selectable)), i = P(() => a.value.filter((m) => m.selectable)), s = P(() => {
    if (typeof e.selectStrategy == "object") return e.selectStrategy;
    switch (e.selectStrategy) {
      case "single":
        return Iu;
      case "all":
        return To;
      case "page":
      default:
        return Io;
    }
  }), r = X(null);
  function u(m) {
    return De(m).every((p) => n.value.has(p.value));
  }
  function d(m) {
    return De(m).some((p) => n.value.has(p.value));
  }
  function v(m, p) {
    const S = s.value.select({
      items: m,
      value: p,
      selected: new Set(n.value)
    });
    n.value = S;
  }
  function y(m, p, S) {
    const I = [];
    if (p = p ?? a.value.findIndex((C) => C.value === m.value), e.selectStrategy !== "single" && (S != null && S.shiftKey) && r.value !== null) {
      const [C, T] = [r.value, p].sort((b, V) => b - V);
      I.push(...a.value.slice(C, T + 1).filter((b) => b.selectable));
    } else
      I.push(m), r.value = p;
    v(I, !u([m]));
  }
  function f(m) {
    const p = s.value.selectAll({
      value: m,
      allItems: o.value,
      currentPage: i.value,
      selected: new Set(n.value)
    });
    n.value = p;
  }
  const g = P(() => n.value.size > 0), k = P(() => {
    const m = s.value.allSelected({
      allItems: o.value,
      currentPage: i.value
    });
    return !!m.length && u(m);
  }), h = N(() => s.value.showSelectAll), w = {
    toggleSelect: y,
    select: v,
    selectAll: f,
    isSelected: u,
    isSomeSelected: d,
    someSelected: g,
    allSelected: k,
    showSelectAll: h,
    lastSelectedIndex: r,
    selectStrategy: s
  };
  return Me(Ao, w), w;
}
function ya() {
  const e = de(Ao);
  if (!e) throw new Error("Missing selection!");
  return e;
}
const Au = K({
  sortBy: {
    type: Array,
    default: () => []
  },
  customKeySort: Object,
  multiSort: Boolean,
  mustSort: Boolean
}, "DataTable-sort"), _o = Symbol.for("vuetify:data-table-sort");
function $o(e) {
  const l = be(e, "sortBy"), t = N(() => e.mustSort), a = N(() => e.multiSort);
  return {
    sortBy: l,
    mustSort: t,
    multiSort: a
  };
}
function Eo(e) {
  const {
    sortBy: l,
    mustSort: t,
    multiSort: a,
    page: n
  } = e, o = (r) => {
    if (r.key == null) return;
    let u = l.value.map((v) => ({
      ...v
    })) ?? [];
    const d = u.find((v) => v.key === r.key);
    d ? d.order === "desc" ? t.value && u.length === 1 ? d.order = "asc" : u = u.filter((v) => v.key !== r.key) : d.order = "desc" : a.value ? u.push({
      key: r.key,
      order: "asc"
    }) : u = [{
      key: r.key,
      order: "asc"
    }], l.value = u, n && (n.value = 1);
  };
  function i(r) {
    return !!l.value.find((u) => u.key === r.key);
  }
  const s = {
    sortBy: l,
    toggleSort: o,
    isSorted: i
  };
  return Me(_o, s), s;
}
function Oo() {
  const e = de(_o);
  if (!e) throw new Error("Missing sort!");
  return e;
}
function Bu(e, l, t, a) {
  const n = Xe();
  return {
    sortedItems: P(() => {
      var i, s;
      return t.value.length ? _u(l.value, t.value, n.current.value, {
        transform: a == null ? void 0 : a.transform,
        sortFunctions: {
          ...e.customKeySort,
          ...(i = a == null ? void 0 : a.sortFunctions) == null ? void 0 : i.value
        },
        sortRawFunctions: (s = a == null ? void 0 : a.sortRawFunctions) == null ? void 0 : s.value
      }) : l.value;
    })
  };
}
function _u(e, l, t, a) {
  const n = new Intl.Collator(t, {
    sensitivity: "accent",
    usage: "sort"
  });
  return e.map((i) => [i, a != null && a.transform ? a.transform(i) : i]).sort((i, s) => {
    var r, u;
    for (let d = 0; d < l.length; d++) {
      let v = !1;
      const y = l[d].key, f = l[d].order ?? "asc";
      if (f === !1) continue;
      let g = ea(i[1], y), k = ea(s[1], y), h = i[0].raw, w = s[0].raw;
      if (f === "desc" && ([g, k] = [k, g], [h, w] = [w, h]), (r = a == null ? void 0 : a.sortRawFunctions) != null && r[y]) {
        const m = a.sortRawFunctions[y](h, w);
        if (m == null) continue;
        if (v = !0, m) return m;
      }
      if ((u = a == null ? void 0 : a.sortFunctions) != null && u[y]) {
        const m = a.sortFunctions[y](g, k);
        if (m == null) continue;
        if (v = !0, m) return m;
      }
      if (!v) {
        if (g instanceof Date && k instanceof Date)
          return g.getTime() - k.getTime();
        if ([g, k] = [g, k].map((m) => m != null ? m.toString().toLocaleLowerCase() : m), g !== k)
          return Yt(g) && Yt(k) ? 0 : Yt(g) ? -1 : Yt(k) ? 1 : !isNaN(g) && !isNaN(k) ? Number(g) - Number(k) : n.compare(g, k);
      }
    }
    return 0;
  }).map((i) => {
    let [s] = i;
    return s;
  });
}
const Fo = K({
  color: String,
  disableSort: Boolean,
  fixedHeader: Boolean,
  multiSort: Boolean,
  sortAscIcon: {
    type: ye,
    default: "$sortAsc"
  },
  sortDescIcon: {
    type: ye,
    default: "$sortDesc"
  },
  headerProps: {
    type: Object
  },
  /** @deprecated */
  sticky: Boolean,
  ...Wt(),
  ...al()
}, "VDataTableHeaders"), ra = ee()({
  name: "VDataTableHeaders",
  props: Fo(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    const {
      t: a
    } = Xe(), {
      toggleSort: n,
      sortBy: o,
      isSorted: i
    } = Oo(), {
      someSelected: s,
      allSelected: r,
      selectAll: u,
      showSelectAll: d
    } = ya(), {
      columns: v,
      headers: y
    } = ga(), {
      loaderClasses: f
    } = el(e);
    function g(b, V) {
      if (!(!(e.sticky || e.fixedHeader) && !b.fixed))
        return {
          position: "sticky",
          left: b.fixed ? ve(b.fixedOffset) : void 0,
          top: e.sticky || e.fixedHeader ? `calc(var(--v-table-header-height) * ${V})` : void 0
        };
    }
    function k(b) {
      const V = o.value.find((A) => A.key === b.key);
      return V ? V.order === "asc" ? e.sortAscIcon : e.sortDescIcon : e.sortAscIcon;
    }
    const {
      backgroundColorClasses: h,
      backgroundColorStyles: w
    } = lt(() => e.color), {
      displayClasses: m,
      mobile: p
    } = ut(e), S = P(() => ({
      headers: y.value,
      columns: v.value,
      toggleSort: n,
      isSorted: i,
      sortBy: o.value,
      someSelected: s.value,
      allSelected: r.value,
      selectAll: u,
      getSortIcon: k
    })), I = P(() => ["v-data-table__th", {
      "v-data-table__th--sticky": e.sticky || e.fixedHeader
    }, m.value, f.value]), C = (b) => {
      let {
        column: V,
        x: A,
        y: $
      } = b;
      const R = V.key === "data-table-select" || V.key === "data-table-expand", F = H(e.headerProps ?? {}, V.headerProps ?? {});
      return c(sa, H({
        tag: "th",
        align: V.align,
        class: [{
          "v-data-table__th--sortable": V.sortable && !e.disableSort,
          "v-data-table__th--sorted": i(V),
          "v-data-table__th--fixed": V.fixed
        }, ...I.value],
        style: {
          width: ve(V.width),
          minWidth: ve(V.minWidth),
          maxWidth: ve(V.maxWidth),
          ...g(V, $)
        },
        colspan: V.colspan,
        rowspan: V.rowspan,
        onClick: V.sortable ? () => n(V) : void 0,
        fixed: V.fixed,
        nowrap: V.nowrap,
        lastFixed: V.lastFixed,
        noPadding: R
      }, F), {
        default: () => {
          var W;
          const U = `header.${V.key}`, j = {
            column: V,
            selectAll: u,
            isSorted: i,
            toggleSort: n,
            sortBy: o.value,
            someSelected: s.value,
            allSelected: r.value,
            getSortIcon: k
          };
          return t[U] ? t[U](j) : V.key === "data-table-select" ? ((W = t["header.data-table-select"]) == null ? void 0 : W.call(t, j)) ?? (d.value && c(Kt, {
            modelValue: r.value,
            indeterminate: s.value && !r.value,
            "onUpdate:modelValue": u
          }, null)) : c("div", {
            class: "v-data-table-header__content"
          }, [c("span", null, [V.title]), V.sortable && !e.disableSort && c(we, {
            key: "icon",
            class: "v-data-table-header__sort-icon",
            icon: k(V)
          }, null), e.multiSort && i(V) && c("div", {
            key: "badge",
            class: ["v-data-table-header__sort-badge", ...h.value],
            style: w.value
          }, [o.value.findIndex((te) => te.key === V.key) + 1])]);
        }
      });
    }, T = () => {
      const b = P(() => v.value.filter((A) => (A == null ? void 0 : A.sortable) && !e.disableSort)), V = P(() => {
        if (v.value.find(($) => $.key === "data-table-select") != null)
          return r.value ? "$checkboxOn" : s.value ? "$checkboxIndeterminate" : "$checkboxOff";
      });
      return c(sa, H({
        tag: "th",
        class: [...I.value],
        colspan: y.value.length + 1
      }, e.headerProps), {
        default: () => [c("div", {
          class: "v-data-table-header__content"
        }, [c(fo, {
          chips: !0,
          class: "v-data-table__td-sort-select",
          clearable: !0,
          density: "default",
          items: b.value,
          label: a("$vuetify.dataTable.sortBy"),
          multiple: e.multiSort,
          variant: "underlined",
          "onClick:clear": () => o.value = [],
          appendIcon: V.value,
          "onClick:append": () => u(!r.value)
        }, {
          ...t,
          chip: (A) => {
            var $;
            return c(dl, {
              onClick: ($ = A.item.raw) != null && $.sortable ? () => n(A.item.raw) : void 0,
              onMousedown: (R) => {
                R.preventDefault(), R.stopPropagation();
              }
            }, {
              default: () => [A.item.title, c(we, {
                class: ["v-data-table__td-sort-icon", i(A.item.raw) && "v-data-table__td-sort-icon-active"],
                icon: k(A.item.raw),
                size: "small"
              }, null)]
            });
          }
        })])]
      });
    };
    oe(() => p.value ? c("tr", null, [c(T, null, null)]) : c(Z, null, [t.headers ? t.headers(S.value) : y.value.map((b, V) => c("tr", null, [b.map((A, $) => c(C, {
      column: A,
      x: $,
      y: V
    }, null))])), e.loading && c("tr", {
      class: "v-data-table-progress"
    }, [c("th", {
      colspan: v.value.length
    }, [c(tl, {
      name: "v-data-table-progress",
      absolute: !0,
      active: !0,
      color: typeof e.loading == "boolean" ? void 0 : e.loading,
      indeterminate: !0
    }, {
      default: t.loader
    })])])]));
  }
}), $u = K({
  groupBy: {
    type: Array,
    default: () => []
  }
}, "DataTable-group"), Do = Symbol.for("vuetify:data-table-group");
function Lo(e) {
  return {
    groupBy: be(e, "groupBy")
  };
}
function Mo(e) {
  const {
    disableSort: l,
    groupBy: t,
    sortBy: a
  } = e, n = Y(/* @__PURE__ */ new Set()), o = P(() => t.value.map((d) => ({
    ...d,
    order: d.order ?? !1
  })).concat(l != null && l.value ? [] : a.value));
  function i(d) {
    return n.value.has(d.id);
  }
  function s(d) {
    const v = new Set(n.value);
    i(d) ? v.delete(d.id) : v.add(d.id), n.value = v;
  }
  function r(d) {
    function v(y) {
      const f = [];
      for (const g of y.items)
        "type" in g && g.type === "group" ? f.push(...v(g)) : f.push(g);
      return [...new Set(f)];
    }
    return v({
      items: d
    });
  }
  const u = {
    sortByWithGroups: o,
    toggleGroup: s,
    opened: n,
    groupBy: t,
    extractRows: r,
    isGroupOpen: i
  };
  return Me(Do, u), u;
}
function Ro() {
  const e = de(Do);
  if (!e) throw new Error("Missing group!");
  return e;
}
function Eu(e, l) {
  if (!e.length) return [];
  const t = /* @__PURE__ */ new Map();
  for (const a of e) {
    const n = ea(a.raw, l);
    t.has(n) || t.set(n, []), t.get(n).push(a);
  }
  return t;
}
function No(e, l) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "root";
  if (!l.length) return [];
  const n = Eu(e, l[0]), o = [], i = l.slice(1);
  return n.forEach((s, r) => {
    const u = l[0], d = `${a}_${u}_${r}`;
    o.push({
      depth: t,
      id: d,
      key: u,
      value: r,
      items: i.length ? No(s, i, t + 1, d) : s,
      type: "group"
    });
  }), o;
}
function Ho(e, l) {
  const t = [];
  for (const a of e)
    "type" in a && a.type === "group" ? (a.value != null && t.push(a), (l.has(a.id) || a.value == null) && t.push(...Ho(a.items, l))) : t.push(a);
  return t;
}
function zo(e, l, t) {
  return {
    flatItems: P(() => {
      if (!l.value.length) return e.value;
      const n = No(e.value, l.value.map((o) => o.key));
      return Ho(n, t.value);
    })
  };
}
const Ou = K({
  item: {
    type: Object,
    required: !0
  }
}, "VDataTableGroupHeaderRow"), Fu = ee()({
  name: "VDataTableGroupHeaderRow",
  props: Ou(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    const {
      isGroupOpen: a,
      toggleGroup: n,
      extractRows: o
    } = Ro(), {
      isSelected: i,
      isSomeSelected: s,
      select: r
    } = ya(), {
      columns: u
    } = ga(), d = P(() => o([e.item]));
    return () => c("tr", {
      class: "v-data-table-group-header-row",
      style: {
        "--v-data-table-group-header-row-depth": e.item.depth
      }
    }, [u.value.map((v) => {
      var y, f;
      if (v.key === "data-table-group") {
        const g = a(e.item) ? "$expand" : "$next", k = () => n(e.item);
        return ((y = t["data-table-group"]) == null ? void 0 : y.call(t, {
          item: e.item,
          count: d.value.length,
          props: {
            icon: g,
            onClick: k
          }
        })) ?? c(sa, {
          class: "v-data-table-group-header-row__column"
        }, {
          default: () => [c(ge, {
            size: "small",
            variant: "text",
            icon: g,
            onClick: k
          }, null), c("span", null, [e.item.value]), c("span", null, [ke("("), d.value.length, ke(")")])]
        });
      }
      if (v.key === "data-table-select") {
        const g = i(d.value), k = s(d.value) && !g, h = (w) => r(d.value, w);
        return ((f = t["data-table-select"]) == null ? void 0 : f.call(t, {
          props: {
            modelValue: g,
            indeterminate: k,
            "onUpdate:modelValue": h
          }
        })) ?? c("td", null, [c(Kt, {
          modelValue: g,
          indeterminate: k,
          "onUpdate:modelValue": h
        }, null)]);
      }
      return c("td", null, null);
    })]);
  }
}), Du = K({
  expandOnClick: Boolean,
  showExpand: Boolean,
  expanded: {
    type: Array,
    default: () => []
  }
}, "DataTable-expand"), Wo = Symbol.for("vuetify:datatable:expanded");
function Uo(e) {
  const l = N(() => e.expandOnClick), t = be(e, "expanded", e.expanded, (s) => new Set(s), (s) => [...s.values()]);
  function a(s, r) {
    const u = new Set(t.value);
    r ? u.add(s.value) : u.delete(s.value), t.value = u;
  }
  function n(s) {
    return t.value.has(s.value);
  }
  function o(s) {
    a(s, !n(s));
  }
  const i = {
    expand: a,
    expanded: t,
    expandOnClick: l,
    isExpanded: n,
    toggleExpand: o
  };
  return Me(Wo, i), i;
}
function Ko() {
  const e = de(Wo);
  if (!e) throw new Error("foo");
  return e;
}
const Lu = K({
  index: Number,
  item: Object,
  cellProps: [Object, Function],
  onClick: Ke(),
  onContextmenu: Ke(),
  onDblclick: Ke(),
  ...Wt()
}, "VDataTableRow"), Mu = ee()({
  name: "VDataTableRow",
  props: Lu(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    const {
      displayClasses: a,
      mobile: n
    } = ut(e, "v-data-table__tr"), {
      isSelected: o,
      toggleSelect: i,
      someSelected: s,
      allSelected: r,
      selectAll: u
    } = ya(), {
      isExpanded: d,
      toggleExpand: v
    } = Ko(), {
      toggleSort: y,
      sortBy: f,
      isSorted: g
    } = Oo(), {
      columns: k
    } = ga();
    oe(() => c("tr", {
      class: ["v-data-table__tr", {
        "v-data-table__tr--clickable": !!(e.onClick || e.onContextmenu || e.onDblclick)
      }, a.value],
      onClick: e.onClick,
      onContextmenu: e.onContextmenu,
      onDblclick: e.onDblclick
    }, [e.item && k.value.map((h, w) => {
      const m = e.item, p = `item.${h.key}`, S = `header.${h.key}`, I = {
        index: e.index,
        item: m.raw,
        internalItem: m,
        value: ea(m.columns, h.key),
        column: h,
        isSelected: o,
        toggleSelect: i,
        isExpanded: d,
        toggleExpand: v
      }, C = {
        column: h,
        selectAll: u,
        isSorted: g,
        toggleSort: y,
        sortBy: f.value,
        someSelected: s.value,
        allSelected: r.value,
        getSortIcon: () => ""
      }, T = typeof e.cellProps == "function" ? e.cellProps({
        index: I.index,
        item: I.item,
        internalItem: I.internalItem,
        value: I.value,
        column: h
      }) : e.cellProps, b = typeof h.cellProps == "function" ? h.cellProps({
        index: I.index,
        item: I.item,
        internalItem: I.internalItem,
        value: I.value
      }) : h.cellProps;
      return c(sa, H({
        align: h.align,
        class: {
          "v-data-table__td--expanded-row": h.key === "data-table-expand",
          "v-data-table__td--select-row": h.key === "data-table-select"
        },
        fixed: h.fixed,
        fixedOffset: h.fixedOffset,
        lastFixed: h.lastFixed,
        maxWidth: n.value ? void 0 : h.maxWidth,
        noPadding: h.key === "data-table-select" || h.key === "data-table-expand",
        nowrap: h.nowrap,
        width: n.value ? void 0 : h.width
      }, T, b), {
        default: () => {
          var A, $, R, F;
          if (h.key === "data-table-select")
            return ((A = t["item.data-table-select"]) == null ? void 0 : A.call(t, {
              ...I,
              props: {
                disabled: !m.selectable,
                modelValue: o([m]),
                onClick: Ve(() => i(m), ["stop"])
              }
            })) ?? c(Kt, {
              disabled: !m.selectable,
              modelValue: o([m]),
              onClick: Ve((U) => i(m, e.index, U), ["stop"])
            }, null);
          if (h.key === "data-table-expand")
            return (($ = t["item.data-table-expand"]) == null ? void 0 : $.call(t, {
              ...I,
              props: {
                icon: d(m) ? "$collapse" : "$expand",
                size: "small",
                variant: "text",
                onClick: Ve(() => v(m), ["stop"])
              }
            })) ?? c(ge, {
              icon: d(m) ? "$collapse" : "$expand",
              size: "small",
              variant: "text",
              onClick: Ve(() => v(m), ["stop"])
            }, null);
          if (t[p] && !n.value) return t[p](I);
          const V = Be(I.value);
          return n.value ? c(Z, null, [c("div", {
            class: "v-data-table__td-title"
          }, [((R = t[S]) == null ? void 0 : R.call(t, C)) ?? h.title]), c("div", {
            class: "v-data-table__td-value"
          }, [((F = t[p]) == null ? void 0 : F.call(t, I)) ?? V])]) : V;
        }
      });
    })]));
  }
}), jo = K({
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
  ...Wt()
}, "VDataTableRows"), ua = ee()({
  name: "VDataTableRows",
  inheritAttrs: !1,
  props: jo(),
  setup(e, l) {
    let {
      attrs: t,
      slots: a
    } = l;
    const {
      columns: n
    } = ga(), {
      expandOnClick: o,
      toggleExpand: i,
      isExpanded: s
    } = Ko(), {
      isSelected: r,
      toggleSelect: u
    } = ya(), {
      toggleGroup: d,
      isGroupOpen: v
    } = Ro(), {
      t: y
    } = Xe(), {
      mobile: f
    } = ut(e);
    return oe(() => {
      var g, k;
      return e.loading && (!e.items.length || a.loading) ? c("tr", {
        class: "v-data-table-rows-loading",
        key: "loading"
      }, [c("td", {
        colspan: n.value.length
      }, [((g = a.loading) == null ? void 0 : g.call(a)) ?? y(e.loadingText)])]) : !e.loading && !e.items.length && !e.hideNoData ? c("tr", {
        class: "v-data-table-rows-no-data",
        key: "no-data"
      }, [c("td", {
        colspan: n.value.length
      }, [((k = a["no-data"]) == null ? void 0 : k.call(a)) ?? y(e.noDataText)])]) : c(Z, null, [e.items.map((h, w) => {
        var S;
        if (h.type === "group") {
          const I = {
            index: w,
            item: h,
            columns: n.value,
            isExpanded: s,
            toggleExpand: i,
            isSelected: r,
            toggleSelect: u,
            toggleGroup: d,
            isGroupOpen: v
          };
          return a["group-header"] ? a["group-header"](I) : c(Fu, H({
            key: `group-header_${h.id}`,
            item: h
          }, Al(t, ":group-header", () => I)), a);
        }
        const m = {
          index: w,
          item: h.raw,
          internalItem: h,
          columns: n.value,
          isExpanded: s,
          toggleExpand: i,
          isSelected: r,
          toggleSelect: u
        }, p = {
          ...m,
          props: H({
            key: `item_${h.key ?? h.index}`,
            onClick: o.value ? () => {
              i(h);
            } : void 0,
            index: w,
            item: h,
            cellProps: e.cellProps,
            mobile: f.value
          }, Al(t, ":row", () => m), typeof e.rowProps == "function" ? e.rowProps({
            item: m.item,
            index: m.index,
            internalItem: m.internalItem
          }) : e.rowProps)
        };
        return c(Z, {
          key: p.props.key
        }, [a.item ? a.item(p) : c(Mu, p.props, a), s(h) && ((S = a["expanded-row"]) == null ? void 0 : S.call(a, m))]);
      })]);
    }), {};
  }
}), Go = K({
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  height: [Number, String],
  hover: Boolean,
  ...he(),
  ...rt(),
  ...Ne(),
  ...Fe()
}, "VTable"), ca = ee()({
  name: "VTable",
  props: Go(),
  setup(e, l) {
    let {
      slots: t,
      emit: a
    } = l;
    const {
      themeClasses: n
    } = He(e), {
      densityClasses: o
    } = Bt(e);
    return oe(() => c(e.tag, {
      class: ["v-table", {
        "v-table--fixed-height": !!e.height,
        "v-table--fixed-header": e.fixedHeader,
        "v-table--fixed-footer": e.fixedFooter,
        "v-table--has-top": !!t.top,
        "v-table--has-bottom": !!t.bottom,
        "v-table--hover": e.hover
      }, n.value, o.value, e.class],
      style: e.style
    }, {
      default: () => {
        var i, s, r;
        return [(i = t.top) == null ? void 0 : i.call(t), t.default ? c("div", {
          class: "v-table__wrapper",
          style: {
            height: ve(e.height)
          }
        }, [c("table", null, [t.default()])]) : (s = t.wrapper) == null ? void 0 : s.call(t), (r = t.bottom) == null ? void 0 : r.call(t)];
      }
    })), {};
  }
}), Ru = K({
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
function Nu(e, l, t, a) {
  const n = e.returnObject ? l : pt(l, e.itemValue), o = pt(l, e.itemSelectable, !0), i = a.reduce((s, r) => (r.key != null && (s[r.key] = pt(l, r.value)), s), {});
  return {
    type: "item",
    key: e.returnObject ? pt(l, e.itemValue) : n,
    index: t,
    value: n,
    selectable: o,
    columns: i,
    raw: l
  };
}
function Hu(e, l, t) {
  return l.map((a, n) => Nu(e, a, n, t));
}
function Yo(e, l) {
  return {
    items: P(() => Hu(e, e.items, l.value))
  };
}
function qo(e) {
  let {
    page: l,
    itemsPerPage: t,
    sortBy: a,
    groupBy: n,
    search: o
  } = e;
  const i = Je("VDataTable"), s = () => ({
    page: l.value,
    itemsPerPage: t.value,
    sortBy: a.value,
    groupBy: n.value,
    search: o.value
  });
  let r = null;
  J(s, (u) => {
    at(r, u) || (r && r.search !== u.search && (l.value = 1), i.emit("update:options", u), r = u);
  }, {
    deep: !0,
    immediate: !0
  });
}
const Xo = K({
  ...jo(),
  hideDefaultBody: Boolean,
  hideDefaultFooter: Boolean,
  hideDefaultHeader: Boolean,
  width: [String, Number],
  search: String,
  ...Du(),
  ...$u(),
  ...Su(),
  ...Ru(),
  ...Tu(),
  ...Au(),
  ...Fo(),
  ...Go()
}, "DataTable"), zu = K({
  ...bo(),
  ...Xo(),
  ...mo(),
  ...ml()
}, "VDataTable");
ee()({
  name: "VDataTable",
  props: zu(),
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
  setup(e, l) {
    let {
      attrs: t,
      slots: a
    } = l;
    const {
      groupBy: n
    } = Lo(e), {
      sortBy: o,
      multiSort: i,
      mustSort: s
    } = $o(e), {
      page: r,
      itemsPerPage: u
    } = wo(e), {
      disableSort: d
    } = Ga(e), {
      columns: v,
      headers: y,
      sortFunctions: f,
      sortRawFunctions: g,
      filterFunctions: k
    } = Po(e, {
      groupBy: n,
      showSelect: N(() => e.showSelect),
      showExpand: N(() => e.showExpand)
    }), {
      items: h
    } = Yo(e, v), w = N(() => e.search), {
      filteredItems: m
    } = go(e, h, w, {
      transform: (Q) => Q.columns,
      customKeyFilter: k
    }), {
      toggleSort: p
    } = Eo({
      sortBy: o,
      multiSort: i,
      mustSort: s,
      page: r
    }), {
      sortByWithGroups: S,
      opened: I,
      extractRows: C,
      isGroupOpen: T,
      toggleGroup: b
    } = Mo({
      groupBy: n,
      sortBy: o,
      disableSort: d
    }), {
      sortedItems: V
    } = Bu(e, m, S, {
      transform: (Q) => ({
        ...Q.raw,
        ...Q.columns
      }),
      sortFunctions: f,
      sortRawFunctions: g
    }), {
      flatItems: A
    } = zo(V, n, I), $ = P(() => A.value.length), {
      startIndex: R,
      stopIndex: F,
      pageCount: U,
      setItemsPerPage: j
    } = So({
      page: r,
      itemsPerPage: u,
      itemsLength: $
    }), {
      paginatedItems: W
    } = wu({
      items: A,
      startIndex: R,
      stopIndex: F,
      itemsPerPage: u
    }), te = P(() => C(W.value)), {
      isSelected: se,
      select: L,
      selectAll: B,
      toggleSelect: _,
      someSelected: E,
      allSelected: z
    } = Bo(e, {
      allItems: h,
      currentPage: te
    }), {
      isExpanded: ae,
      toggleExpand: ce
    } = Uo(e);
    qo({
      page: r,
      itemsPerPage: u,
      sortBy: o,
      groupBy: n,
      search: w
    }), Qe({
      VDataTableRows: {
        hideNoData: N(() => e.hideNoData),
        noDataText: N(() => e.noDataText),
        loading: N(() => e.loading),
        loadingText: N(() => e.loadingText)
      }
    });
    const re = P(() => ({
      page: r.value,
      itemsPerPage: u.value,
      sortBy: o.value,
      pageCount: U.value,
      toggleSort: p,
      setItemsPerPage: j,
      someSelected: E.value,
      allSelected: z.value,
      isSelected: se,
      select: L,
      selectAll: B,
      toggleSelect: _,
      isExpanded: ae,
      toggleExpand: ce,
      isGroupOpen: T,
      toggleGroup: b,
      items: te.value.map((Q) => Q.raw),
      internalItems: te.value,
      groupedItems: W.value,
      columns: v.value,
      headers: y.value
    }));
    return oe(() => {
      const Q = ia.filterProps(e), ne = ra.filterProps(e), pe = ua.filterProps(e), D = ca.filterProps(e);
      return c(ca, H({
        class: ["v-data-table", {
          "v-data-table--show-select": e.showSelect,
          "v-data-table--loading": e.loading
        }, e.class],
        style: e.style
      }, D, {
        fixedHeader: e.fixedHeader || e.sticky
      }), {
        top: () => {
          var le;
          return (le = a.top) == null ? void 0 : le.call(a, re.value);
        },
        default: () => {
          var le, Se, fe, xe, Ee, ze;
          return a.default ? a.default(re.value) : c(Z, null, [(le = a.colgroup) == null ? void 0 : le.call(a, re.value), !e.hideDefaultHeader && c("thead", {
            key: "thead"
          }, [c(ra, ne, a)]), (Se = a.thead) == null ? void 0 : Se.call(a, re.value), !e.hideDefaultBody && c("tbody", null, [(fe = a["body.prepend"]) == null ? void 0 : fe.call(a, re.value), a.body ? a.body(re.value) : c(ua, H(t, pe, {
            items: W.value
          }), a), (xe = a["body.append"]) == null ? void 0 : xe.call(a, re.value)]), (Ee = a.tbody) == null ? void 0 : Ee.call(a, re.value), (ze = a.tfoot) == null ? void 0 : ze.call(a, re.value)]);
        },
        bottom: () => a.bottom ? a.bottom(re.value) : !e.hideDefaultFooter && c(Z, null, [c(Lt, null, null), c(ia, Q, {
          prepend: a["footer.prepend"]
        })])
      });
    }), {};
  }
});
const Wu = K({
  itemsLength: {
    type: [Number, String],
    required: !0
  },
  ...bo(),
  ...Xo(),
  ...ml()
}, "VDataTableServer"), Uu = ee()({
  name: "VDataTableServer",
  props: Wu(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:page": (e) => !0,
    "update:itemsPerPage": (e) => !0,
    "update:sortBy": (e) => !0,
    "update:options": (e) => !0,
    "update:expanded": (e) => !0,
    "update:groupBy": (e) => !0
  },
  setup(e, l) {
    let {
      attrs: t,
      slots: a
    } = l;
    const {
      groupBy: n
    } = Lo(e), {
      sortBy: o,
      multiSort: i,
      mustSort: s
    } = $o(e), {
      page: r,
      itemsPerPage: u
    } = wo(e), {
      disableSort: d
    } = Ga(e), v = P(() => parseInt(e.itemsLength, 10)), {
      columns: y,
      headers: f
    } = Po(e, {
      groupBy: n,
      showSelect: N(() => e.showSelect),
      showExpand: N(() => e.showExpand)
    }), {
      items: g
    } = Yo(e, y), {
      toggleSort: k
    } = Eo({
      sortBy: o,
      multiSort: i,
      mustSort: s,
      page: r
    }), {
      opened: h,
      isGroupOpen: w,
      toggleGroup: m,
      extractRows: p
    } = Mo({
      groupBy: n,
      sortBy: o,
      disableSort: d
    }), {
      pageCount: S,
      setItemsPerPage: I
    } = So({
      page: r,
      itemsPerPage: u,
      itemsLength: v
    }), {
      flatItems: C
    } = zo(g, n, h), {
      isSelected: T,
      select: b,
      selectAll: V,
      toggleSelect: A,
      someSelected: $,
      allSelected: R
    } = Bo(e, {
      allItems: g,
      currentPage: g
    }), {
      isExpanded: F,
      toggleExpand: U
    } = Uo(e), j = P(() => p(g.value));
    qo({
      page: r,
      itemsPerPage: u,
      sortBy: o,
      groupBy: n,
      search: N(() => e.search)
    }), Me("v-data-table", {
      toggleSort: k,
      sortBy: o
    }), Qe({
      VDataTableRows: {
        hideNoData: N(() => e.hideNoData),
        noDataText: N(() => e.noDataText),
        loading: N(() => e.loading),
        loadingText: N(() => e.loadingText)
      }
    });
    const W = P(() => ({
      page: r.value,
      itemsPerPage: u.value,
      sortBy: o.value,
      pageCount: S.value,
      toggleSort: k,
      setItemsPerPage: I,
      someSelected: $.value,
      allSelected: R.value,
      isSelected: T,
      select: b,
      selectAll: V,
      toggleSelect: A,
      isExpanded: F,
      toggleExpand: U,
      isGroupOpen: w,
      toggleGroup: m,
      items: j.value.map((te) => te.raw),
      internalItems: j.value,
      groupedItems: C.value,
      columns: y.value,
      headers: f.value
    }));
    oe(() => {
      const te = ia.filterProps(e), se = ra.filterProps(e), L = ua.filterProps(e), B = ca.filterProps(e);
      return c(ca, H({
        class: ["v-data-table", {
          "v-data-table--loading": e.loading
        }, e.class],
        style: e.style
      }, B, {
        fixedHeader: e.fixedHeader || e.sticky
      }), {
        top: () => {
          var _;
          return (_ = a.top) == null ? void 0 : _.call(a, W.value);
        },
        default: () => {
          var _, E, z, ae, ce, re;
          return a.default ? a.default(W.value) : c(Z, null, [(_ = a.colgroup) == null ? void 0 : _.call(a, W.value), !e.hideDefaultHeader && c("thead", {
            key: "thead",
            class: "v-data-table__thead",
            role: "rowgroup"
          }, [c(ra, se, a)]), (E = a.thead) == null ? void 0 : E.call(a, W.value), !e.hideDefaultBody && c("tbody", {
            class: "v-data-table__tbody",
            role: "rowgroup"
          }, [(z = a["body.prepend"]) == null ? void 0 : z.call(a, W.value), a.body ? a.body(W.value) : c(ua, H(t, L, {
            items: C.value
          }), a), (ae = a["body.append"]) == null ? void 0 : ae.call(a, W.value)]), (ce = a.tbody) == null ? void 0 : ce.call(a, W.value), (re = a.tfoot) == null ? void 0 : re.call(a, W.value)]);
        },
        bottom: () => a.bottom ? a.bottom(W.value) : !e.hideDefaultFooter && c(Z, null, [c(Lt, null, null), c(ia, te, {
          prepend: a["footer.prepend"]
        })])
      });
    });
  }
}), Ku = {
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
function ju(e) {
  let l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return c("div", {
    class: ["v-skeleton-loader__bone", `v-skeleton-loader__${e}`]
  }, [l]);
}
function jl(e) {
  const [l, t] = e.split("@");
  return Array.from({
    length: t
  }).map(() => ha(l));
}
function ha(e) {
  let l = [];
  if (!e) return l;
  const t = Ku[e];
  if (e !== t) {
    if (e.includes(",")) return Gl(e);
    if (e.includes("@")) return jl(e);
    t.includes(",") ? l = Gl(t) : t.includes("@") ? l = jl(t) : t && l.push(ha(t));
  }
  return [ju(e, l)];
}
function Gl(e) {
  return e.replace(/\s/g, "").split(",").map(ha);
}
const Gu = K({
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
  ...At(),
  ...It(),
  ...Fe()
}, "VSkeletonLoader"), Yu = ee()({
  name: "VSkeletonLoader",
  props: Gu(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    const {
      backgroundColorClasses: a,
      backgroundColorStyles: n
    } = lt(() => e.color), {
      dimensionStyles: o
    } = Tt(e), {
      elevationClasses: i
    } = Mt(e), {
      themeClasses: s
    } = He(e), {
      t: r
    } = Xe(), u = P(() => ha(De(e.type).join(",")));
    return oe(() => {
      var y;
      const d = !t.default || e.loading, v = e.boilerplate || !d ? {} : {
        ariaLive: "polite",
        ariaLabel: r(e.loadingText),
        role: "alert"
      };
      return c("div", H({
        class: ["v-skeleton-loader", {
          "v-skeleton-loader--boilerplate": e.boilerplate
        }, s.value, a.value, i.value],
        style: [n.value, d ? o.value : {}]
      }, v), [d ? u.value : (y = t.default) == null ? void 0 : y.call(t)]);
    }), {};
  }
}), Zo = /* @__PURE__ */ je({
  __name: "OxListTable",
  props: {
    // list: Object,
    /** Table headers */
    headers: Array,
    /** If True, allow user to edit (display edit button) */
    edit: Boolean
  },
  setup(e) {
    const l = st(), t = Gi(l, "item.", { exclude: ["item.actions"] }), a = de("panel"), n = de("list"), o = de("items"), i = de("user"), s = e, r = P(() => s.headers.reduce((v, y) => (v.push(
      typeof y == "string" ? { key: y, title: ie(pi.field(y)) } : { key: y.key, title: ie(y.title) }
    ), v), []));
    function u(v) {
      const y = {
        ...n.filters,
        page: v.page,
        page_size: v.itemsPerPage,
        ordering: v.sortBy.map(({ key: f, order: g }) => g == "asc" ? f : `-${f}`)
      };
      n.page_size = v.itemsPerPage, n.load({ params: y });
    }
    function d(v, y) {
      a.show({ view: "detail.edit", value: y });
    }
    return (v, y) => {
      var f;
      return M(), q(Uu, {
        items: x(o),
        "item-index": "id",
        "items-length": x(n).count || x(o).length,
        "items-per-page": s.itemsPerPage,
        loading: (f = x(n).state) == null ? void 0 : f.isProcessing,
        headers: r.value,
        "no-data-text": x(ie)("lists.empty"),
        class: "align-top-table",
        "onUpdate:options": u
      }, wt({
        "item.actions": O(({ item: g }) => [
          x(i).can([g.constructor, "change"], g) ? (M(), q(aa, {
            key: 0,
            icon: "mdi-pencil",
            button: "",
            title: x(ie)("actions.edit"),
            item: g,
            run: d
          }, null, 8, ["title", "item"])) : x(i).can([g.constructor, "view"], g) ? (M(), q(aa, {
            key: 1,
            icon: "mdi-eye-outline",
            button: "",
            title: x(ie)("actions.edit"),
            item: g,
            run: d
          }, null, 8, ["title", "item"])) : ue("", !0),
          G(v.$slots, "item.actions", {
            value: g,
            dense: !0,
            button: !0
          })
        ]),
        _: 2
      }, [
        x(o).length ? void 0 : {
          name: "loading",
          fn: O(() => [
            c(Yu, { type: "table-row@10" })
          ]),
          key: "0"
        },
        _e(x(t), (g, k) => ({
          name: k,
          fn: O((h) => [
            G(v.$slots, k, Pe(Ie(h)))
          ])
        }))
      ]), 1032, ["items", "items-length", "items-per-page", "loading", "headers", "no-data-text"]);
    };
  }
}), ba = {
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
    const l = st(), t = e;
    let a = Y(!1);
    J(() => t.state.state, (i) => {
      t.delay && i == Yi.PROCESSING && (a.value = !1, window.setTimeout(() => {
        a.value = !0;
      }, 5e3));
    });
    const n = P(() => {
      var i;
      return ((i = t.state) == null ? void 0 : i.isProcessing) && (!t.delay || a.value);
    }), o = P(() => {
      var i, s;
      return (s = (i = t.state) == null ? void 0 : i.data) == null ? void 0 : s.messages;
    });
    return (i, s) => (M(), me(Z, null, [
      t.state.isNone && x(l).none ? (M(), q(x($t), {
        key: 0,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        state: e.state,
        title: e.noneTitle
      }, {
        default: O(() => [
          G(i.$slots, "none", { state: e.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : n.value ? (M(), q(x($t), {
        key: 1,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: e.state,
        title: e.processingTitle
      }, {
        default: O(() => [
          G(i.$slots, "processing", { state: e.state }, () => [
            s[0] || (s[0] = ke(" Data are being sent to server, please be patient. If this message persist you might wan't to retry. "))
          ])
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isError ? (M(), q(x($t), {
        key: 2,
        type: "error",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: e.state,
        title: e.errorTitle
      }, {
        default: O(() => [
          G(i.$slots, "error", { state: e.state }, () => [
            s[1] || (s[1] = ke(" Oups... something wrong happened. "))
          ]),
          G(i.$slots, "error-detail", { state: e.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isOk ? (M(), q(x($t), {
        key: 3,
        type: "success",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: e.state,
        title: e.okTitle
      }, {
        default: O(() => [
          G(i.$slots, "ok", { state: e.state }, () => [
            s[2] || (s[2] = ot("p", null, "Congrats! Data have been updated.", -1))
          ]),
          o.value ? (M(), me(Z, { key: 0 }, [
            c(Lt),
            (M(!0), me(Z, null, _e(o.value, (r) => (M(), me("p", null, Be(r), 1))), 256))
          ], 64)) : ue("", !0),
          G(i.$slots, "ok-detail", { state: e.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : ue("", !0),
      G(i.$slots, "default", {
        state: t.state
      })
    ], 64));
  }
}, qu = { class: "text-right" }, yl = {
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
  setup(e, { emit: l }) {
    const t = l, a = e;
    return (n, o) => (M(), me("div", qu, [
      c(ge, {
        color: "error",
        class: "me-2",
        "prepend-icon": a.resetIcon,
        onClick: o[0] || (o[0] = (i) => t("reset")),
        disabled: a.disabled
      }, {
        default: O(() => [
          G(n.$slots, "discard", {}, () => [
            ke(Be(a.resetLabel || x(ka)("actions.discard")), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]),
      a.state.isSending || a.state.isProcessing ? (M(), q(ge, {
        key: 0,
        color: "primary",
        "prepend-icon": a.processingIcon,
        disabled: ""
      }, {
        default: O(() => [
          G(n.$slots, "processing", {}, () => [
            ke(Be(a.processingLabel || x(ka)("actions.saving")), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon"])) : (M(), q(ge, {
        key: 1,
        color: "primary",
        "prepend-icon": a.validateIcon,
        onClick: o[1] || (o[1] = (i) => t("validate")),
        disabled: a.disabled || a.validateDisabled
      }, {
        default: O(() => [
          G(n.$slots, "validate", {}, () => [
            ke(Be(a.validateLabel || x(ka)("actions.save")), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]))
    ]));
  }
}, Xu = { key: 0 }, Zu = { class: "text-right mt-3" }, Qu = {
  __name: "OxLogin",
  props: {
    next: { type: String },
    url: { type: String }
  },
  emits: ["save", "saved"],
  setup(e, { emit: l }) {
    const t = Jl("password"), a = e, n = Ge({
      username: "",
      password: ""
    }), o = Y(!1), i = Ge(new qi());
    function s(u = !0) {
      Zi(n, { username: "", password: "" }), u && i.none();
    }
    async function r() {
      i.processing();
      try {
        const u = await fetch(a.url, {
          method: "POST",
          headers: Xi.axiosConfig.headers,
          body: JSON.stringify(n)
        });
        u.status == 200 ? (n.credentials = "", n.password = "", i.ok(await u.json()), a.next && (window.location.href = a.next)) : i.error(await u.json());
      } catch (u) {
        i.ok((u == null ? void 0 : u.message) || u);
      }
    }
    return (u, d) => (M(), me(Z, null, [
      c(x(ba), { state: i }, {
        none: O(({ state: v }) => d[7] || (d[7] = [
          ot("p", null, "Please enter your credentials in order too proceed...", -1)
        ])),
        "ok-detail": O(({ state: v }) => [
          a.next ? (M(), me("p", Xu, [
            d[8] || (d[8] = ke("You soon will be redirected to ")),
            ot("i", null, Be(a.next), 1)
          ])) : ue("", !0)
        ]),
        error: O(({ state: v }) => {
          var y, f;
          return [
            c(za, {
              errors: (y = v.data) == null ? void 0 : y.username
            }, null, 8, ["errors"]),
            c(za, {
              errors: (f = v.data) == null ? void 0 : f.password
            }, null, 8, ["errors"])
          ];
        }),
        _: 1
      }, 8, ["state"]),
      i.isOk ? ue("", !0) : (M(), me(Z, { key: 0 }, [
        c(vt, {
          variant: "underlined",
          label: "Enter login",
          modelValue: n.username,
          "onUpdate:modelValue": d[0] || (d[0] = (v) => n.username = v),
          onKeyup: d[1] || (d[1] = wl(Ve((v) => x(t).focus(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue"]),
        c(vt, {
          variant: "underlined",
          ref: "password",
          label: "Enter password",
          modelValue: n.password,
          "onUpdate:modelValue": d[2] || (d[2] = (v) => n.password = v),
          type: o.value ? "text" : "password",
          "append-icon": o.value ? "mdi-eye" : "mdi-eye-off",
          "onClick:append": d[3] || (d[3] = (v) => o.value = !o.value),
          onKeyup: d[4] || (d[4] = wl(Ve((v) => r(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue", "type", "append-icon"]),
        ot("div", Zu, [
          G(u.$slots, "default", {
            value: n.password
          }, () => [
            n.username && n.password ? (M(), q(yl, {
              key: 0,
              "validate-label": "Login!",
              onValidate: d[5] || (d[5] = (v) => r()),
              onReset: d[6] || (d[6] = (v) => s()),
              state: i
            }, null, 8, ["state"])) : ue("", !0)
          ])
        ])
      ], 64))
    ], 64));
  }
}, Qo = /* @__PURE__ */ je({
  __name: "OxPanel",
  props: {
    name: {},
    index: {},
    view: {},
    value: {},
    state: {},
    help: {},
    title: {},
    icon: {}
  },
  setup(e) {
    const l = st(), t = e, a = dt(l, "views."), n = Y(!1);
    qe(() => {
      n.value = !0;
    }), fi(() => {
      n.value = !1;
    });
    const o = de("panels"), i = de("panel");
    return (s, r) => (M(), me(Z, null, [
      t.state ? (M(), q(ba, {
        key: 0,
        state: t.state,
        delay: ""
      }, null, 8, ["state"])) : ue("", !0),
      x(l).prepend && x(o).panel == x(i).name ? G(s.$slots, "prepend", { key: 1 }) : ue("", !0),
      c(fn, { class: "ma-4" }, {
        default: O(() => [
          (M(), q($a, {
            to: "#app-bar-sheet-title",
            disabled: !n.value || x(o).panel != t.name
          }, [
            t.icon ? (M(), q(we, {
              key: 0,
              icon: t.icon
            }, null, 8, ["icon"])) : ue("", !0),
            ke(" " + Be(t.title) + " ", 1),
            G(s.$slots, "append-title")
          ], 8, ["disabled"])),
          (M(), q($a, {
            to: "#app-bar-right",
            disabled: !n.value || x(o).panel != t.name
          }, [
            G(s.$slots, "app-bar-right"),
            t.help ? (M(), q(ge, {
              key: 0,
              class: "ml-3",
              href: t.help,
              panels: "new",
              icon: "mdi-information-outline"
            }, null, 8, ["href"])) : ue("", !0)
          ], 8, ["disabled"])),
          G(s.$slots, "top"),
          G(s.$slots, "default", {}, () => [
            x(a) ? (M(), q(Na, {
              key: 0,
              modelValue: x(i).view,
              "onUpdate:modelValue": r[0] || (r[0] = (u) => x(i).view = u)
            }, {
              default: O(() => [
                (M(!0), me(Z, null, _e(x(a), (u, d) => (M(), q(Ha, {
                  key: u,
                  value: u
                }, {
                  default: O(() => [
                    G(s.$slots, d)
                  ]),
                  _: 2
                }, 1032, ["value"]))), 128))
              ]),
              _: 3
            }, 8, ["modelValue"])) : ue("", !0)
          ]),
          G(s.$slots, "bottom")
        ]),
        _: 3
      }),
      x(l).append && x(o).panel == x(i).name ? G(s.$slots, "append", { key: 2 }) : ue("", !0)
    ], 64));
  }
}), Jo = /* @__PURE__ */ je({
  __name: "OxView",
  props: {
    /** default tab title */
    title: String
  },
  setup(e) {
    const l = e, t = Y(null), a = st(), n = dt(a, "tab.", { exclude: ["tab.default"] }), o = dt(a, "window.");
    return (i, s) => x(n) && Object.keys(x(n)).length ? (M(), me(Z, { key: 0 }, [
      c(br, {
        modelValue: t.value,
        "onUpdate:modelValue": s[0] || (s[0] = (r) => t.value = r)
      }, {
        default: O(() => [
          x(a).default ? G(i.$slots, "tab", { key: 0 }, () => [
            c(Ra, {
              text: l == null ? void 0 : l.title,
              value: "default"
            }, null, 8, ["text"])
          ]) : ue("", !0),
          (M(!0), me(Z, null, _e(x(n), (r, u) => (M(), q(Ra, { value: r }, {
            default: O(() => [
              G(i.$slots, u)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"]),
      c(rl, {
        modelValue: t.value,
        "onUpdate:modelValue": s[1] || (s[1] = (r) => t.value = r)
      }, {
        default: O(() => [
          x(a).default ? (M(), q(oa, {
            key: 0,
            value: "default"
          }, {
            default: O(() => [
              G(i.$slots, "default")
            ]),
            _: 3
          })) : ue("", !0),
          (M(!0), me(Z, null, _e(x(o), (r, u) => (M(), q(oa, { value: r }, {
            default: O(() => [
              G(i.$slots, u)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"])
    ], 64)) : G(i.$slots, "default", { key: 1 });
  }
}), ei = /* @__PURE__ */ je({
  __name: "OxModelEditor",
  props: {
    repo: {},
    initial: {},
    name: {},
    url: {},
    saved: { type: Function }
  },
  setup(e, { expose: l }) {
    const t = Y(null), a = de("user"), n = e, { editor: o, edited: i } = wi({ props: n }), s = P(() => a.can([o.repo.use, "change", n.initial])), r = P(() => ({
      editor: o,
      edited: i,
      form: t.value,
      editable: s.value,
      disabled: !s.value,
      value: o.value,
      model: o.repo.use
    }));
    return J(() => o.errors && Object.values(o.errors), () => t.value.validate()), l({ editor: o, edited: i, form: t, editable: s }), (u, d) => (M(), me(Z, null, [
      G(u.$slots, "prepend", Pe(Ie(r.value))),
      c(Wa, {
        ref_key: "form",
        ref: t,
        modelValue: x(o).valid,
        "onUpdate:modelValue": d[0] || (d[0] = (v) => x(o).valid = v),
        disabled: !s.value
      }, {
        default: O(() => [
          G(u.$slots, "default", Pe(Ie(r.value)))
        ]),
        _: 3
      }, 8, ["modelValue", "disabled"]),
      G(u.$slots, "append", Pe(Ie(r.value)))
    ], 64));
  }
}), Ju = {
  key: 0,
  class: "mb-3"
}, ec = /* @__PURE__ */ je({
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
  setup(e, { expose: l }) {
    const t = e, a = Y(null);
    function n() {
      a.value.editor.reset(t.initial);
    }
    function o() {
      const i = a.value;
      return t.sendFormData ? i.editor.save(new FormData(i.form.value.$el)) : i.editor.save();
    }
    return l({ modelEditor: a, save: o, reset: n }), (i, s) => {
      var r;
      return M(), me(Z, null, [
        (r = a.value) != null && r.editor ? (M(), q(ba, {
          key: 0,
          state: a.value.editor.state
        }, null, 8, ["state"])) : ue("", !0),
        c(Ei, { class: "ox-model-edit" }, {
          default: O(() => [
            c(x(ei), H({
              ref_key: "modelEditor",
              ref: a
            }, t), {
              prepend: O((u) => [
                t.hideValidationBtn ? ue("", !0) : (M(), me("div", Ju, [
                  G(i.$slots, "prepend", H(u, {
                    save: o,
                    reset: n
                  }), () => [
                    u.editable && u.edited ? (M(), q(yl, {
                      key: 0,
                      onValidate: s[0] || (s[0] = (d) => o()),
                      onReset: s[1] || (s[1] = (d) => n()),
                      state: u.editor.state,
                      "validate-disabled": u.editor.valid === !1
                    }, null, 8, ["state", "validate-disabled"])) : ue("", !0)
                  ])
                ]))
              ]),
              default: O((u) => [
                G(i.$slots, "default", H(u, {
                  save: o,
                  reset: n
                }))
              ]),
              append: O((u) => [
                G(i.$slots, "append", H(u, {
                  save: o,
                  reset: n
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
}), tc = /* @__PURE__ */ je({
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
    name: {},
    index: { default: "list.table" },
    value: {},
    state: {},
    help: {},
    title: {},
    icon: {}
  },
  setup(e, { expose: l }) {
    const t = st(), a = dt(t, "views.list."), n = dt(t, "item."), o = dt(t, "views.detail.edit."), i = Jl("filters"), s = e, r = de("context"), { panel: u, list: d, items: v, next: y, prev: f } = de("panel") ?? Si({ props: s }), g = u.panels;
    P(() => {
      var p;
      return r.user.can([u.model, (p = u.value) != null && p.id ? "change" : "add"]);
    });
    const { showFilters: k } = Ga(u), h = P(() => [
      ...s.headers,
      { key: "actions", title: ie("actions") }
    ]);
    function w(p) {
      p != null && p.id ? u.value = u.repo.whereId(p.id).first() : u.value = p, d.load();
    }
    const m = P(() => ({
      panel: u,
      panels: g,
      list: d,
      items: v,
      context: r,
      saved: w,
      value: u.value
    }));
    return J(() => Object.values(d.filters), () => d.load()), l({ list: d, panel: u, items: v, next: y, prev: f }), (p, S) => (M(), q(Qo, {
      name: s.name,
      title: x(u).title,
      icon: x(u).icon,
      state: x(d).state,
      index: s.index
    }, wt({
      "app-bar-right": O(() => [
        G(p.$slots, "app-bar-right", Pe(Ie(m.value))),
        x(u).view.startsWith("list.") ? (M(), q(Cl, {
          key: 0,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: O(() => [
            G(p.$slots, "nav.list", Pe(Ie(m.value))),
            c(ge, {
              title: x(ie)("actions.list.reload"),
              "aria-label": x(ie)("actions.list.reload"),
              onClick: S[0] || (S[0] = (I) => x(d).load())
            }, {
              default: O(() => [
                c(we, null, {
                  default: O(() => S[10] || (S[10] = [
                    ke("mdi-reload")
                  ])),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["title", "aria-label"]),
            x(i) ? (M(), q(ge, {
              key: 0,
              title: x(k) ? x(ie)("filters.hide") : x(ie)("filters.show"),
              "aria-label": x(k) ? x(ie)("filters.hide") : x(ie)("filters.show"),
              onClick: S[1] || (S[1] = (I) => k.value = !x(k)),
              active: x(k)
            }, {
              default: O(() => [
                c(we, {
                  icon: x(i).icon
                }, null, 8, ["icon"])
              ]),
              _: 1
            }, 8, ["title", "aria-label", "active"])) : ue("", !0)
          ]),
          _: 3
        })) : x(u).view.startsWith("detail.") && x(u).value ? (M(), q(Cl, {
          key: 1,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: O(() => [
            G(p.$slots, "nav.detail", Pe(Ie(m.value))),
            x(u).view == "detail.edit" && x(u).value ? (M(), q(vl, { key: 0 }, {
              activator: O(({ props: I }) => [
                c(ge, H({ "prepend-icon": "mdi-dots-vertical" }, I), {
                  default: O(() => [
                    ke(Be(x(ie)("actions")), 1)
                  ]),
                  _: 2
                }, 1040)
              ]),
              default: O(() => [
                c(it, null, {
                  default: O(() => [
                    G(p.$slots, "item.actions", {
                      value: x(u).value
                    })
                  ]),
                  _: 3
                })
              ]),
              _: 3
            })) : ue("", !0),
            c(ge, {
              disabled: !x(f),
              title: x(ie)("prev"),
              "aria-label": x(ie)("prev"),
              onClick: S[2] || (S[2] = Ve((I) => x(u).show({ view: x(u).view, value: x(f) }), ["stop"]))
            }, {
              default: O(() => [
                c(we, { icon: "mdi-chevron-left" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"]),
            c(ge, {
              disabled: !x(y),
              title: x(ie)("next"),
              "aria-label": x(ie)("next"),
              onClick: S[3] || (S[3] = Ve((I) => x(u).show({ view: x(u).view, value: x(y) }), ["stop"]))
            }, {
              default: O(() => [
                c(we, { icon: "mdi-chevron-right" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"])
          ]),
          _: 3
        })) : ue("", !0),
        c(Oi, {
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal",
          mandatory: "",
          modelValue: x(u).view,
          "onUpdate:modelValue": S[9] || (S[9] = (I) => x(u).view = I)
        }, {
          default: O(() => {
            var I;
            return [
              c(ge, {
                value: "list.table",
                onClickCapture: S[4] || (S[4] = Ve((C) => x(u).show({ view: "list.table" }), ["stop"])),
                title: x(ie)("panels.nav.table"),
                "aria-label": x(ie)("panels.nav.table")
              }, {
                default: O(() => [
                  c(we, null, {
                    default: O(() => S[11] || (S[11] = [
                      ke("mdi-table")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"]),
              x(t)["views.list.cards"] ? (M(), q(ge, {
                key: 0,
                value: "list.cards",
                onClickCapture: S[5] || (S[5] = Ve((C) => x(u).show({ view: "list.cards" }), ["stop"])),
                title: x(ie)("panels.nav.cards"),
                "aria-label": x(ie)("panels.nav.cards")
              }, {
                default: O(() => [
                  c(we, null, {
                    default: O(() => S[12] || (S[12] = [
                      ke("mdi-card-account-details")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : ue("", !0),
              x(t)["views.list.kanban"] ? (M(), q(ge, {
                key: 1,
                value: "list.kanban",
                onClickCapture: S[6] || (S[6] = Ve((C) => x(u).show({ view: "list.kanban" }), ["stop"])),
                title: x(ie)("panels.nav.kanban"),
                "aria-label": x(ie)("panels.nav.kanban")
              }, {
                default: O(() => [
                  c(we, null, {
                    default: O(() => S[13] || (S[13] = [
                      ke("mdi-view-column")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : ue("", !0),
              x(t)["views.detail.edit"] || x(o) ? (M(), q(ge, {
                key: 2,
                value: "detail.edit",
                onClickCapture: S[7] || (S[7] = Ve((C) => x(u).show({ view: "detail.edit", value: x(u).value }), ["stop"])),
                disabled: !((I = x(u).value) != null && I.id) && x(u).view != "detail.edit",
                title: x(ie)("panels.nav.edit"),
                "aria-label": x(ie)("panels.nav.edit")
              }, {
                default: O(() => [
                  c(we, null, {
                    default: O(() => S[14] || (S[14] = [
                      ke("mdi-pencil")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"])) : ue("", !0),
              x(o) ? (M(), q(ge, {
                key: 3,
                value: "detail.add",
                onClickCapture: S[8] || (S[8] = Ve((C) => x(u).create(), ["stop"])),
                title: x(ie)("panels.nav.add"),
                "aria-label": x(ie)("panels.nav.add")
              }, {
                default: O(() => [
                  c(we, null, {
                    default: O(() => S[15] || (S[15] = [
                      ke("mdi-plus-box")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : ue("", !0),
              G(p.$slots, "nav.views", Pe(Ie(m.value)))
            ];
          }),
          _: 3
        }, 8, ["modelValue"]),
        G(p.$slots, "app-bar-end", Pe(Ie(m.value)))
      ]),
      top: O(() => [
        s.warning ? (M(), q($t, {
          key: 0,
          type: "warning",
          variant: "tonal",
          text: s.warning
        }, null, 8, ["text"])) : ue("", !0),
        G(p.$slots, "top"),
        Ye(c(yo, {
          ref_key: "filters",
          ref: i,
          search: s.search,
          "teleport-to": "#panel-list-actions"
        }, {
          default: O((I) => [
            G(p.$slots, "list.filters", Pe(Ie(I)))
          ]),
          _: 3
        }, 8, ["search"]), [
          [Vt, x(u).view.startsWith("list.") && x(k)]
        ])
      ]),
      _: 2
    }, [
      x(t)["append-title"] ? {
        name: "append-title",
        fn: O(() => [
          G(p.$slots, "append-title", Pe(Ie(m.value)))
        ]),
        key: "0"
      } : void 0,
      x(t).prepend ? {
        name: "prepend",
        fn: O(() => [
          G(p.$slots, "prepend", Pe(Ie(m.value)))
        ]),
        key: "1"
      } : void 0,
      x(t).append ? {
        name: "append",
        fn: O(() => [
          G(p.$slots, "append", Pe(Ie(m.value)))
        ]),
        key: "2"
      } : void 0,
      x(t)["views.list.table"] ? void 0 : {
        name: "views.list.table",
        fn: O(() => [
          c(Zo, { headers: h.value }, wt({ _: 2 }, [
            _e(x(n), (I, C) => ({
              name: C,
              fn: O((T) => [
                G(p.$slots, C, Pe(Ie(T)))
              ])
            }))
          ]), 1032, ["headers"])
        ]),
        key: "3"
      },
      _e(x(a), (I, C) => ({
        name: C,
        fn: O(() => [
          G(p.$slots, C, Pe(Ie(m.value)))
        ])
      })),
      x(t)["views.detail.edit"] || x(o) ? {
        name: "views.detail.edit",
        fn: O(() => [
          c(x(Jo), {
            title: x(ie)(`models.${x(u).model.entity}`)
          }, wt({ _: 2 }, [
            _e(x(o), (I, C) => ({
              name: I,
              fn: O(() => [
                G(p.$slots, C, Pe(Ie(m.value)))
              ])
            }))
          ]), 1032, ["title"])
        ]),
        key: "4"
      } : void 0
    ]), 1032, ["name", "title", "icon", "state", "index"]));
  }
}), ac = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OxAction: aa,
  OxActionModelDelete: us,
  OxActions: cs,
  OxApp: wr,
  OxAutocomplete: eu,
  OxComponent: tu,
  OxFieldDetails: za,
  OxFormList: ou,
  OxListFilters: yo,
  OxListKanban: yu,
  OxListTable: Zo,
  OxLogin: Qu,
  OxModelEdit: ec,
  OxModelEditor: ei,
  OxModelPanel: tc,
  OxPanel: Qo,
  OxStateAlert: ba,
  OxValidationBtn: yl,
  OxView: Jo
}, Symbol.toStringTag, { value: "Module" })), cc = {
  el: "#app",
  delimiters: ["[[", "]]"],
  components: { ...ac, ...Qi }
};
export {
  cc as App,
  aa as OxAction,
  us as OxActionModelDelete,
  cs as OxActions,
  wr as OxApp,
  eu as OxAutocomplete,
  tu as OxComponent,
  za as OxFieldDetails,
  ou as OxFormList,
  yo as OxListFilters,
  yu as OxListKanban,
  Zo as OxListTable,
  Qu as OxLogin,
  ec as OxModelEdit,
  ei as OxModelEditor,
  tc as OxModelPanel,
  Qo as OxPanel,
  ba as OxStateAlert,
  yl as OxValidationBtn,
  Jo as OxView
};
//# sourceMappingURL=components.js.map
