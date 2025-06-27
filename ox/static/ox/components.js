import { inject as ve, computed as A, ref as q, reactive as Qe, toRef as H, shallowRef as ee, onMounted as Ge, provide as We, useId as ft, onDeactivated as nn, onActivated as ci, onBeforeUnmount as mt, createVNode as h, Transition as la, mergeProps as L, defineComponent as Me, useAttrs as xt, createElementBlock as me, createCommentVNode as ue, unref as S, openBlock as M, Fragment as X, createBlock as Y, withModifiers as Ie, resolveComponent as di, withCtx as O, renderList as Te, createTextVNode as Pe, toDisplayString as Re, watch as J, watchEffect as et, onScopeDispose as Ue, readonly as on, createElementVNode as C, nextTick as _e, mergeModels as Ja, useModel as el, renderSlot as j, normalizeStyle as Ve, normalizeClass as fe, effectScope as sn, toValue as _l, toRaw as La, warn as vi, Teleport as Na, withDirectives as Ke, vShow as _t, useSlots as ut, onErrorCaptured as fi, createSlots as it, markRaw as mi, onBeforeMount as gi, cloneVNode as yi, normalizeProps as Be, guardReactiveProps as $e, h as hi, vModelText as bi, defineAsyncComponent as pi, onBeforeUpdate as wi, capitalize as Si, toRefs as tl, useTemplateRef as un, withKeys as Bl, onUnmounted as xi } from "vue";
import { useAction as ki, t as oe, filterSlots as rt, useAppContext as Vi, usePanels as Ci, useQuery as Pi, defineAsyncComponent as Ii, rules as Ai, tKeys as Ti, useModelEditor as _i, useModelPanel as Bi } from "ox";
import { u as Pt, V as pe, a as qe, b as Ha, c as $i, d as ha, e as ct, f as ba, g as Bt, h as rn, i as pa, t as Ei, j as ie, k as $t, l as De, m as je, n as kt, o as Ht, p as xe, q as zt, r as dt, s as Oi, v as cn, w as Wt, x as Ut, y as $l, z as Aa, A as Ta, B as El, C as Ol, D as jt, E as Fi, M as wa, F as dn, G as al, H as Kt, I as vn, J as fn, K as ll, L as Ri, N as Gt, O as nl, P as ol, Q as il, R as Fl, S as ke, T as mn, U as Et, W as gt, X as It, Y as gn, Z as Mi, _ as yn, $ as hn, a0 as wt, a1 as bn, a2 as pn, a3 as sl, a4 as ul, a5 as rl, a6 as na, a7 as wn, a8 as Di, a9 as Li, aa as Sa, ab as Ni, ac as Hi, ad as Sn, ae as xn, af as Ft, ag as Rl, ah as zi } from "./VAlert-BkLm8i-q.js";
import { k as cl, l as kn, n as K, o as he, q as lt, r as Wi, s as ne, C as Vn, u as Xe, t as Je, v as Ui, w as nt, x as Ye, y as yt, z as we, A as at, B as Ne, E as Yt, F as Cn, G as ji, H as st, J as Pn, i as ze, K as Ml, M as At, N as Ki, O as ht, P as In, Q as ot, R as Se, S as za, U as Gi, V as Ze, W as xa, X as He, Y as dl, Z as An, _ as Yi, $ as qi, a0 as _a, a1 as Xi, a2 as Zi, a3 as Ct, a4 as Qi, a5 as Tn, a6 as oa, a7 as Ji, c as Zt, a8 as Dl, a9 as es, aa as ia, ab as Qt } from "./theme-BVAWnHOc.js";
import { Q as ts, l as ea, N as as, E as ls, t as Ba, S as ns, o as os, r as is } from "./index-Bdmim2Am.js";
import "axios";
import { components as ss } from "ox/vendor";
class tt {
  constructor(n) {
    let {
      x: t,
      y: a,
      width: l,
      height: i
    } = n;
    this.x = t, this.y = a, this.width = l, this.height = i;
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
function _n(e) {
  return Array.isArray(e) ? new tt({
    x: e[0],
    y: e[1],
    width: 0,
    height: 0
  }) : e.getBoundingClientRect();
}
function us(e) {
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
function vl(e) {
  const n = e.getBoundingClientRect(), t = getComputedStyle(e), a = t.transform;
  if (a) {
    let l, i, o, s, u;
    if (a.startsWith("matrix3d("))
      l = a.slice(9, -1).split(/, /), i = Number(l[0]), o = Number(l[5]), s = Number(l[12]), u = Number(l[13]);
    else if (a.startsWith("matrix("))
      l = a.slice(7, -1).split(/, /), i = Number(l[0]), o = Number(l[3]), s = Number(l[4]), u = Number(l[5]);
    else
      return new tt(n);
    const r = t.transformOrigin, c = n.x - s - (1 - i) * parseFloat(r), d = n.y - u - (1 - o) * parseFloat(r.slice(r.indexOf(" ") + 1)), m = i ? n.width / i : e.offsetWidth + 1, v = o ? n.height / o : e.offsetHeight + 1;
    return new tt({
      x: c,
      y: d,
      width: m,
      height: v
    });
  } else
    return new tt(n);
}
function pt(e, n, t) {
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
const ta = /* @__PURE__ */ new WeakMap();
function rs(e, n) {
  Object.keys(n).forEach((t) => {
    if (cl(t)) {
      const a = kn(t), l = ta.get(e);
      if (n[t] == null)
        l == null || l.forEach((i) => {
          const [o, s] = i;
          o === a && (e.removeEventListener(a, s), l.delete(i));
        });
      else if (!l || ![...l].some((i) => i[0] === a && i[1] === n[t])) {
        e.addEventListener(a, n[t]);
        const i = l || /* @__PURE__ */ new Set();
        i.add([a, n[t]]), ta.has(e) || ta.set(e, i);
      }
    } else
      n[t] == null ? e.removeAttribute(t) : e.setAttribute(t, n[t]);
  });
}
function cs(e, n) {
  Object.keys(n).forEach((t) => {
    if (cl(t)) {
      const a = kn(t), l = ta.get(e);
      l == null || l.forEach((i) => {
        const [o, s] = i;
        o === a && (e.removeEventListener(a, s), l.delete(i));
      });
    } else
      e.removeAttribute(t);
  });
}
function Bn(e) {
  if (typeof e.getRootNode != "function") {
    for (; e.parentNode; ) e = e.parentNode;
    return e !== document ? null : document;
  }
  const n = e.getRootNode();
  return n !== document && n.getRootNode({
    composed: !0
  }) !== document ? null : n;
}
const Rt = "cubic-bezier(0.4, 0, 0.2, 1)", ds = "cubic-bezier(0.0, 0, 0.2, 1)", vs = "cubic-bezier(0.4, 0, 1, 1)";
function Nl(e, n, t) {
  return Object.keys(e).filter((a) => cl(a) && a.endsWith(n)).reduce((a, l) => (a[l.slice(0, -n.length)] = (i) => e[l](i, t(i)), a), {});
}
function $n(e) {
  let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  for (; e; ) {
    if (n ? fs(e) : fl(e)) return e;
    e = e.parentElement;
  }
  return document.scrollingElement;
}
function sa(e, n) {
  const t = [];
  if (n && e && !n.contains(e)) return t;
  for (; e && (fl(e) && t.push(e), e !== n); )
    e = e.parentElement;
  return t;
}
function fl(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const n = window.getComputedStyle(e);
  return n.overflowY === "scroll" || n.overflowY === "auto" && e.scrollHeight > e.clientHeight;
}
function fs(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const n = window.getComputedStyle(e);
  return ["scroll", "auto"].includes(n.overflowY);
}
function ms(e) {
  for (; e; ) {
    if (window.getComputedStyle(e).position === "fixed")
      return !0;
    e = e.offsetParent;
  }
  return !1;
}
const Mt = Symbol.for("vuetify:layout"), En = Symbol.for("vuetify:layout-item"), Hl = 1e3, gs = K({
  overlaps: {
    type: Array,
    default: () => []
  },
  fullHeight: Boolean
}, "layout"), On = K({
  name: {
    type: String
  },
  order: {
    type: [Number, String],
    default: 0
  },
  absolute: Boolean
}, "layout-item");
function Fn() {
  const e = ve(Mt);
  if (!e) throw new Error("[Vuetify] Could not find injected layout");
  return {
    getLayoutItem: e.getLayoutItem,
    mainRect: e.mainRect,
    mainStyles: e.mainStyles
  };
}
function Rn(e) {
  const n = ve(Mt);
  if (!n) throw new Error("[Vuetify] Could not find injected layout");
  const t = e.id ?? `layout-item-${ft()}`, a = lt("useLayoutItem");
  We(En, {
    id: t
  });
  const l = ee(!1);
  nn(() => l.value = !0), ci(() => l.value = !1);
  const {
    layoutItemStyles: i,
    layoutItemScrimStyles: o
  } = n.register(a, {
    ...e,
    active: A(() => l.value ? !1 : e.active.value),
    id: t
  });
  return mt(() => n.unregister(t)), {
    layoutItemStyles: i,
    layoutRect: n.layoutRect,
    layoutItemScrimStyles: o
  };
}
const ys = (e, n, t, a) => {
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
    const s = n.get(o), u = t.get(o), r = a.get(o);
    if (!s || !u || !r) continue;
    const c = {
      ...l,
      [s.value]: parseInt(l[s.value], 10) + (r.value ? parseInt(u.value, 10) : 0)
    };
    i.push({
      id: o,
      layer: c
    }), l = c;
  }
  return i;
};
function hs(e) {
  const n = ve(Mt, null), t = A(() => n ? n.rootZIndex.value - 100 : Hl), a = q([]), l = Qe(/* @__PURE__ */ new Map()), i = Qe(/* @__PURE__ */ new Map()), o = Qe(/* @__PURE__ */ new Map()), s = Qe(/* @__PURE__ */ new Map()), u = Qe(/* @__PURE__ */ new Map()), {
    resizeRef: r,
    contentRect: c
  } = Pt(), d = A(() => {
    const w = /* @__PURE__ */ new Map(), P = e.overlaps ?? [];
    for (const b of P.filter((B) => B.includes(":"))) {
      const [B, T] = b.split(":");
      if (!a.value.includes(B) || !a.value.includes(T)) continue;
      const $ = l.get(B), D = l.get(T), R = i.get(B), z = i.get(T);
      !$ || !D || !R || !z || (w.set(T, {
        position: $.value,
        amount: parseInt(R.value, 10)
      }), w.set(B, {
        position: D.value,
        amount: -parseInt(z.value, 10)
      }));
    }
    return w;
  }), m = A(() => {
    const w = [...new Set([...o.values()].map((b) => b.value))].sort((b, B) => b - B), P = [];
    for (const b of w) {
      const B = a.value.filter((T) => {
        var $;
        return (($ = o.get(T)) == null ? void 0 : $.value) === b;
      });
      P.push(...B);
    }
    return ys(P, l, i, s);
  }), v = A(() => !Array.from(u.values()).some((w) => w.value)), g = A(() => m.value[m.value.length - 1].layer), V = H(() => ({
    "--v-layout-left": he(g.value.left),
    "--v-layout-right": he(g.value.right),
    "--v-layout-top": he(g.value.top),
    "--v-layout-bottom": he(g.value.bottom),
    ...v.value ? void 0 : {
      transition: "none"
    }
  })), y = A(() => m.value.slice(1).map((w, P) => {
    let {
      id: b
    } = w;
    const {
      layer: B
    } = m.value[P], T = i.get(b), $ = l.get(b);
    return {
      id: b,
      ...B,
      size: Number(T.value),
      position: $.value
    };
  })), p = (w) => y.value.find((P) => P.id === w), f = lt("createLayout"), I = ee(!1);
  Ge(() => {
    I.value = !0;
  }), We(Mt, {
    register: (w, P) => {
      let {
        id: b,
        order: B,
        position: T,
        layoutSize: $,
        elementSize: D,
        active: R,
        disableTransitions: z,
        absolute: W
      } = P;
      o.set(b, B), l.set(b, T), i.set(b, $), s.set(b, R), z && u.set(b, z);
      const te = Wi(En, f == null ? void 0 : f.vnode).indexOf(w);
      te > -1 ? a.value.splice(te, 0, b) : a.value.push(b);
      const ae = A(() => y.value.findIndex((F) => F.id === b)), re = A(() => t.value + m.value.length * 2 - ae.value * 2), _ = A(() => {
        const F = T.value === "left" || T.value === "right", U = T.value === "right", be = T.value === "bottom", le = D.value ?? $.value, se = le === 0 ? "%" : "px", Z = {
          [T.value]: 0,
          zIndex: re.value,
          transform: `translate${F ? "X" : "Y"}(${(R.value ? 0 : -(le === 0 ? 100 : le)) * (U || be ? -1 : 1)}${se})`,
          position: W.value || t.value !== Hl ? "absolute" : "fixed",
          ...v.value ? void 0 : {
            transition: "none"
          }
        };
        if (!I.value) return Z;
        const ce = y.value[ae.value];
        if (!ce) throw new Error(`[Vuetify] Could not find layout item "${b}"`);
        const ge = d.value.get(b);
        return ge && (ce[ge.position] += ge.amount), {
          ...Z,
          height: F ? `calc(100% - ${ce.top}px - ${ce.bottom}px)` : D.value ? `${D.value}px` : void 0,
          left: U ? void 0 : `${ce.left}px`,
          right: U ? `${ce.right}px` : void 0,
          top: T.value !== "bottom" ? `${ce.top}px` : void 0,
          bottom: T.value !== "top" ? `${ce.bottom}px` : void 0,
          width: F ? D.value ? `${D.value}px` : void 0 : `calc(100% - ${ce.left}px - ${ce.right}px)`
        };
      }), E = A(() => ({
        zIndex: re.value - 1
      }));
      return {
        layoutItemStyles: _,
        layoutItemScrimStyles: E,
        zIndex: re
      };
    },
    unregister: (w) => {
      o.delete(w), l.delete(w), i.delete(w), s.delete(w), u.delete(w), a.value = a.value.filter((P) => P !== w);
    },
    mainRect: g,
    mainStyles: V,
    getLayoutItem: p,
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
    getLayoutItem: p,
    items: y,
    layoutRect: c,
    layoutRef: r
  };
}
const bs = K({
  target: [Object, Array]
}, "v-dialog-transition"), $a = /* @__PURE__ */ new WeakMap(), Mn = ne()({
  name: "VDialogTransition",
  props: bs(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = {
      onBeforeEnter(l) {
        l.style.pointerEvents = "none", l.style.visibility = "hidden";
      },
      async onEnter(l, i) {
        var v;
        await new Promise((g) => requestAnimationFrame(g)), await new Promise((g) => requestAnimationFrame(g)), l.style.visibility = "";
        const o = Wl(e.target, l), {
          x: s,
          y: u,
          sx: r,
          sy: c,
          speed: d
        } = o;
        $a.set(l, o);
        const m = pt(l, [{
          transform: `translate(${s}px, ${u}px) scale(${r}, ${c})`,
          opacity: 0
        }, {}], {
          duration: 225 * d,
          easing: ds
        });
        (v = zl(l)) == null || v.forEach((g) => {
          pt(g, [{
            opacity: 0
          }, {
            opacity: 0,
            offset: 0.33
          }, {}], {
            duration: 225 * 2 * d,
            easing: Rt
          });
        }), m.finished.then(() => i());
      },
      onAfterEnter(l) {
        l.style.removeProperty("pointer-events");
      },
      onBeforeLeave(l) {
        l.style.pointerEvents = "none";
      },
      async onLeave(l, i) {
        var v;
        await new Promise((g) => requestAnimationFrame(g));
        let o;
        !$a.has(l) || Array.isArray(e.target) || e.target.offsetParent || e.target.getClientRects().length ? o = Wl(e.target, l) : o = $a.get(l);
        const {
          x: s,
          y: u,
          sx: r,
          sy: c,
          speed: d
        } = o;
        pt(l, [{}, {
          transform: `translate(${s}px, ${u}px) scale(${r}, ${c})`,
          opacity: 0
        }], {
          duration: 125 * d,
          easing: vs
        }).finished.then(() => i()), (v = zl(l)) == null || v.forEach((g) => {
          pt(g, [{}, {
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
    return () => e.target ? h(la, L({
      name: "dialog-transition"
    }, a, {
      css: !1
    }), t) : h(la, {
      name: "dialog-transition"
    }, t);
  }
});
function zl(e) {
  var t;
  const n = (t = e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")) == null ? void 0 : t.children;
  return n && [...n];
}
function Wl(e, n) {
  const t = _n(e), a = vl(n), [l, i] = getComputedStyle(n).transformOrigin.split(" ").map((p) => parseFloat(p)), [o, s] = getComputedStyle(n).getPropertyValue("--v-overlay-anchor-origin").split(" ");
  let u = t.left + t.width / 2;
  o === "left" || s === "left" ? u -= t.width / 2 : (o === "right" || s === "right") && (u += t.width / 2);
  let r = t.top + t.height / 2;
  o === "top" || s === "top" ? r -= t.height / 2 : (o === "bottom" || s === "bottom") && (r += t.height / 2);
  const c = t.width / a.width, d = t.height / a.height, m = Math.max(1, c, d), v = c / m || 0, g = d / m || 0, V = a.width * a.height / (window.innerWidth * window.innerHeight), y = V > 0.12 ? Math.min(1.5, (V - 0.12) * 10 + 1) : 1;
  return {
    x: u - (l + a.left),
    y: r - (i + a.top),
    sx: v,
    sy: g,
    speed: y
  };
}
const Dt = /* @__PURE__ */ Me({
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
    const t = e, a = xt(), l = n, i = ve("user"), { run: o, processing: s, allowed: u } = ki({ user: i, emits: l, props: t });
    return (r, c) => S(u) ? (M(), me(X, { key: 0 }, [
      t.button ? (M(), Y(pe, L({
        key: 0,
        variant: "text"
      }, S(a), {
        disabled: S(s),
        color: t.color,
        icon: t.icon,
        title: t.title,
        "aria-label": t.title,
        onClick: Ie(S(o), ["stop"])
      }), null, 16, ["disabled", "color", "icon", "title", "aria-label", "onClick"])) : (M(), Y(qe, L({ key: 1 }, S(a), {
        title: t.title,
        "base-color": t.color,
        "prepend-icon": t.icon,
        disabled: S(s),
        onClick: Ie(S(o), ["stop"])
      }), null, 16, ["title", "base-color", "prepend-icon", "disabled", "onClick"]))
    ], 64)) : ue("", !0);
  }
}), ps = /* @__PURE__ */ Me({
  __name: "OxActionModelDelete",
  props: {
    item: {}
  },
  setup(e) {
    const n = ve("panel"), t = ve("repos"), a = xt(), l = e;
    async function i(o, s) {
      return await t[s.constructor.entity].api().delete(s.$url(), { delete: l.item.id });
    }
    return (o, s) => (M(), Y(Dt, L(S(a), {
      item: l.item,
      icon: "mdi-delete",
      color: "error",
      title: S(oe)("actions.delete"),
      confirm: S(oe)("actions.delete.confirm"),
      permission: [l.item.constructor, "delete"],
      run: i,
      onCompleted: s[0] || (s[0] = (u) => {
        var r;
        return (r = S(n)) == null ? void 0 : r.show({ view: S(n).index });
      })
    }), null, 16, ["item", "title", "confirm", "permission"]));
  }
}), ws = /* @__PURE__ */ Me({
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
    const n = xt(), t = e;
    async function a(l, i) {
      const o = t.repo.api();
      return await o[t.method].apply(o, [i.$url(t.path), t.data, t.options]);
    }
    return (l, i) => (M(), Y(S(Dt), L(S(n), { run: a }), null, 16));
  }
}), Ss = /* @__PURE__ */ Me({
  __name: "OxAppNavItem",
  props: {
    name: {},
    url: {},
    permission: {},
    type: {},
    items: {},
    title: {},
    icon: {}
  },
  setup(e) {
    const n = e;
    q(null);
    const t = ve("user"), a = ve("panels");
    A(() => !n.auto || panel.name == n.name);
    function l(o) {
      return o.permission && !t.can(o.permission) ? !1 : o.items ? o.items.some((s) => l(s)) : !0;
    }
    function i() {
      const o = { panel: n.name, href: n.url };
      a.show(o);
    }
    return (o, s) => {
      const u = di("ox-app-nav-item", !0);
      return l(n) ? (M(), me(X, { key: 0 }, [
        n.type == "group" ? (M(), Y(Ha, {
          key: 0,
          value: n.name
        }, {
          activator: O(({ props: r }) => [
            h(qe, L(r, {
              title: n.title,
              "prepend-icon": n.icon
            }), null, 16, ["title", "prepend-icon"])
          ]),
          default: O(() => [
            (M(!0), me(X, null, Te(n.items, (r, c) => (M(), Y(u, L({
              key: c,
              ref_for: !0
            }, r, {
              type: r.type == "group" ? "subheader" : r.type
            }), null, 16, ["type"]))), 128))
          ]),
          _: 1
        }, 8, ["value"])) : n.type == "subheader" ? (M(), me(X, { key: 1 }, [
          h($i, null, {
            default: O(() => [
              Pe(Re(n.title), 1)
            ]),
            _: 1
          }),
          n.items ? (M(!0), me(X, { key: 0 }, Te(n.items, (r) => (M(), Y(u, L({ ref_for: !0 }, r), null, 16))), 256)) : ue("", !0)
        ], 64)) : (M(), Y(qe, {
          key: 2,
          active: S(a).panel == n.name,
          value: n.name,
          "prepend-icon": n.icon,
          title: n.title,
          onClick: Ie(i, ["stop"])
        }, null, 8, ["active", "value", "prepend-icon", "title"]))
      ], 64)) : ue("", !0);
    };
  }
});
function xs(e) {
  let {
    rootEl: n,
    isSticky: t,
    layoutItemStyles: a
  } = e;
  const l = ee(!1), i = ee(0), o = A(() => {
    const r = typeof l.value == "boolean" ? "top" : l.value;
    return [t.value ? {
      top: "auto",
      bottom: "auto",
      height: void 0
    } : void 0, l.value ? {
      [r]: he(i.value)
    } : {
      top: a.value.top
    }];
  });
  Ge(() => {
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
    const r = s > window.scrollY ? "up" : "down", c = n.value.getBoundingClientRect(), d = parseFloat(a.value.top ?? 0), m = window.scrollY - Math.max(0, i.value - d), v = c.height + Math.max(i.value, d) - window.scrollY - window.innerHeight, g = parseFloat(getComputedStyle(n.value).getPropertyValue("--v-body-scroll-y")) || 0;
    c.height < window.innerHeight - d ? (l.value = "top", i.value = d) : r === "up" && l.value === "bottom" || r === "down" && l.value === "top" ? (i.value = window.scrollY + c.top - g, l.value = !0) : r === "down" && v <= 0 ? (i.value = 0, l.value = "bottom") : r === "up" && m <= 0 && (g ? l.value !== "top" && (i.value = -m + g + d, l.value = "top") : (i.value = c.top + m, l.value = "top")), s = window.scrollY;
  }
  return {
    isStuck: l,
    stickyStyles: o
  };
}
const ks = 100, Vs = 20;
function Ul(e) {
  return (e < 0 ? -1 : 1) * Math.sqrt(Math.abs(e)) * 1.41421356237;
}
function jl(e) {
  if (e.length < 2)
    return 0;
  if (e.length === 2)
    return e[1].t === e[0].t ? 0 : (e[1].d - e[0].d) / (e[1].t - e[0].t);
  let n = 0;
  for (let t = e.length - 1; t > 0; t--) {
    if (e[t].t === e[t - 1].t)
      continue;
    const a = Ul(n), l = (e[t].d - e[t - 1].d) / (e[t].t - e[t - 1].t);
    n += (l - a) * Math.abs(l), t === e.length - 1 && (n *= 0.5);
  }
  return Ul(n) * 1e3;
}
function Cs() {
  const e = {};
  function n(l) {
    Array.from(l.changedTouches).forEach((i) => {
      (e[i.identifier] ?? (e[i.identifier] = new Vn(Vs))).push([l.timeStamp, i]);
    });
  }
  function t(l) {
    Array.from(l.changedTouches).forEach((i) => {
      delete e[i.identifier];
    });
  }
  function a(l) {
    var r;
    const i = (r = e[l]) == null ? void 0 : r.values().reverse();
    if (!i)
      throw new Error(`No samples for touch id ${l}`);
    const o = i[0], s = [], u = [];
    for (const c of i) {
      if (o[0] - c[0] > ks) break;
      s.push({
        t: c[0],
        d: c[1].clientX
      }), u.push({
        t: c[0],
        d: c[1].clientY
      });
    }
    return {
      x: jl(s),
      y: jl(u),
      get direction() {
        const {
          x: c,
          y: d
        } = this, [m, v] = [Math.abs(c), Math.abs(d)];
        return m > v && c >= 0 ? "right" : m > v && c <= 0 ? "left" : v > m && d >= 0 ? "down" : v > m && d <= 0 ? "up" : Ps();
      }
    };
  }
  return {
    addMovement: n,
    endTouch: t,
    getVelocity: a
  };
}
function Ps() {
  throw new Error();
}
function Is(e) {
  let {
    el: n,
    isActive: t,
    isTemporary: a,
    width: l,
    touchless: i,
    position: o
  } = e;
  Ge(() => {
    window.addEventListener("touchstart", f, {
      passive: !0
    }), window.addEventListener("touchmove", I, {
      passive: !1
    }), window.addEventListener("touchend", x, {
      passive: !0
    });
  }), mt(() => {
    window.removeEventListener("touchstart", f), window.removeEventListener("touchmove", I), window.removeEventListener("touchend", x);
  });
  const s = A(() => ["left", "right"].includes(o.value)), {
    addMovement: u,
    endTouch: r,
    getVelocity: c
  } = Cs();
  let d = !1;
  const m = ee(!1), v = ee(0), g = ee(0);
  let V;
  function y(w, P) {
    return (o.value === "left" ? w : o.value === "right" ? document.documentElement.clientWidth - w : o.value === "top" ? w : o.value === "bottom" ? document.documentElement.clientHeight - w : Vt()) - (P ? l.value : 0);
  }
  function p(w) {
    let P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    const b = o.value === "left" ? (w - g.value) / l.value : o.value === "right" ? (document.documentElement.clientWidth - w - g.value) / l.value : o.value === "top" ? (w - g.value) / l.value : o.value === "bottom" ? (document.documentElement.clientHeight - w - g.value) / l.value : Vt();
    return P ? Je(b) : b;
  }
  function f(w) {
    if (i.value) return;
    const P = w.changedTouches[0].clientX, b = w.changedTouches[0].clientY, B = 25, T = o.value === "left" ? P < B : o.value === "right" ? P > document.documentElement.clientWidth - B : o.value === "top" ? b < B : o.value === "bottom" ? b > document.documentElement.clientHeight - B : Vt(), $ = t.value && (o.value === "left" ? P < l.value : o.value === "right" ? P > document.documentElement.clientWidth - l.value : o.value === "top" ? b < l.value : o.value === "bottom" ? b > document.documentElement.clientHeight - l.value : Vt());
    (T || $ || t.value && a.value) && (V = [P, b], g.value = y(s.value ? P : b, t.value), v.value = p(s.value ? P : b), d = g.value > -20 && g.value < 80, r(w), u(w));
  }
  function I(w) {
    const P = w.changedTouches[0].clientX, b = w.changedTouches[0].clientY;
    if (d) {
      if (!w.cancelable) {
        d = !1;
        return;
      }
      const T = Math.abs(P - V[0]), $ = Math.abs(b - V[1]);
      (s.value ? T > $ && T > 3 : $ > T && $ > 3) ? (m.value = !0, d = !1) : (s.value ? $ : T) > 3 && (d = !1);
    }
    if (!m.value) return;
    w.preventDefault(), u(w);
    const B = p(s.value ? P : b, !1);
    v.value = Math.max(0, Math.min(1, B)), B > 1 ? g.value = y(s.value ? P : b, !0) : B < 0 && (g.value = y(s.value ? P : b, !1));
  }
  function x(w) {
    if (d = !1, !m.value) return;
    u(w), m.value = !1;
    const P = c(w.changedTouches[0].identifier), b = Math.abs(P.x), B = Math.abs(P.y);
    (s.value ? b > B && b > 400 : B > b && B > 3) ? t.value = P.direction === ({
      left: "right",
      right: "left",
      top: "down",
      bottom: "up"
    }[o.value] || Vt()) : t.value = v.value > 0.5;
  }
  const k = A(() => m.value ? {
    transform: o.value === "left" ? `translateX(calc(-100% + ${v.value * l.value}px))` : o.value === "right" ? `translateX(calc(100% - ${v.value * l.value}px))` : o.value === "top" ? `translateY(calc(-100% + ${v.value * l.value}px))` : o.value === "bottom" ? `translateY(calc(100% - ${v.value * l.value}px))` : Vt(),
    transition: "none"
  } : void 0);
  return Xe(m, () => {
    var b, B;
    const w = ((b = n.value) == null ? void 0 : b.style.transform) ?? null, P = ((B = n.value) == null ? void 0 : B.style.transition) ?? null;
    et(() => {
      var T, $, D, R;
      ($ = n.value) == null || $.style.setProperty("transform", ((T = k.value) == null ? void 0 : T.transform) || "none"), (R = n.value) == null || R.style.setProperty("transition", ((D = k.value) == null ? void 0 : D.transition) || null);
    }), Ue(() => {
      var T, $;
      (T = n.value) == null || T.style.setProperty("transform", w), ($ = n.value) == null || $.style.setProperty("transition", P);
    });
  }), {
    isDragging: m,
    dragProgress: v,
    dragStyles: k
  };
}
function Vt() {
  throw new Error();
}
const Dn = K({
  closeDelay: [Number, String],
  openDelay: [Number, String]
}, "delay");
function Ln(e, n) {
  let t = () => {
  };
  function a(o) {
    t == null || t();
    const s = Number(o ? e.openDelay : e.closeDelay);
    return new Promise((u) => {
      t = Ui(s, () => {
        n == null || n(o), u(o);
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
    clearDelay: t,
    runOpenDelay: l,
    runCloseDelay: i
  };
}
function qt() {
  const n = lt("useScopeId").vnode.scopeId;
  return {
    scopeId: n ? {
      [n]: ""
    } : void 0
  };
}
const As = ["start", "end", "left", "right", "top", "bottom"], Ts = K({
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
    validator: (e) => As.includes(e)
  },
  sticky: Boolean,
  ...zt(),
  ...xe(),
  ...Dn(),
  ...Yt({
    mobile: null
  }),
  ...Ht(),
  ...On(),
  ...kt(),
  ...je({
    tag: "nav"
  }),
  ...Ne()
}, "VNavigationDrawer"), _s = ne()({
  name: "VNavigationDrawer",
  props: Ts(),
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
      isRtl: i
    } = nt(), {
      themeClasses: o
    } = Ye(e), {
      borderClasses: s
    } = ha(e), {
      backgroundColorClasses: u,
      backgroundColorStyles: r
    } = ct(() => e.color), {
      elevationClasses: c
    } = ba(e), {
      displayClasses: d,
      mobile: m
    } = yt(e), {
      roundedClasses: v
    } = Bt(e), g = rn(), V = we(e, "modelValue", null, (_) => !!_), {
      ssrBootStyles: y
    } = pa(), {
      scopeId: p
    } = qt(), f = q(), I = ee(!1), {
      runOpenDelay: x,
      runCloseDelay: k
    } = Ln(e, (_) => {
      I.value = _;
    }), w = A(() => e.rail && e.expandOnHover && I.value ? Number(e.width) : Number(e.rail ? e.railWidth : e.width)), P = A(() => Ei(e.location, i.value)), b = H(() => e.persistent), B = A(() => !e.permanent && (m.value || e.temporary)), T = A(() => e.sticky && !B.value && P.value !== "bottom");
    Xe(() => e.expandOnHover && e.rail != null, () => {
      J(I, (_) => a("update:rail", !_));
    }), Xe(() => !e.disableResizeWatcher, () => {
      J(B, (_) => !e.permanent && _e(() => V.value = !_));
    }), Xe(() => !e.disableRouteWatcher && !!g, () => {
      J(g.currentRoute, () => B.value && (V.value = !1));
    }), J(() => e.permanent, (_) => {
      _ && (V.value = !0);
    }), e.modelValue == null && !B.value && (V.value = e.permanent || !m.value);
    const {
      isDragging: $,
      dragProgress: D
    } = Is({
      el: f,
      isActive: V,
      isTemporary: B,
      width: w,
      touchless: H(() => e.touchless),
      position: P
    }), R = A(() => {
      const _ = B.value ? 0 : e.rail && e.expandOnHover ? Number(e.railWidth) : w.value;
      return $.value ? _ * D.value : _;
    }), {
      layoutItemStyles: z,
      layoutItemScrimStyles: W
    } = Rn({
      id: e.name,
      order: A(() => parseInt(e.order, 10)),
      position: P,
      layoutSize: R,
      elementSize: w,
      active: on(V),
      disableTransitions: H(() => $.value),
      absolute: A(() => (
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        e.absolute || T.value && typeof G.value != "string"
      ))
    }), {
      isStuck: G,
      stickyStyles: te
    } = xs({
      rootEl: f,
      isSticky: T,
      layoutItemStyles: z
    }), ae = ct(() => typeof e.scrim == "string" ? e.scrim : null), re = A(() => ({
      ...$.value ? {
        opacity: D.value * 0.2,
        transition: "none"
      } : void 0,
      ...W.value
    }));
    return at({
      VList: {
        bgColor: "transparent"
      }
    }), ie(() => {
      const _ = l.image || e.image;
      return C(X, null, [h(e.tag, L({
        ref: f,
        onMouseenter: x,
        onMouseleave: k,
        class: ["v-navigation-drawer", `v-navigation-drawer--${P.value}`, {
          "v-navigation-drawer--expand-on-hover": e.expandOnHover,
          "v-navigation-drawer--floating": e.floating,
          "v-navigation-drawer--is-hovering": I.value,
          "v-navigation-drawer--rail": e.rail,
          "v-navigation-drawer--temporary": B.value,
          "v-navigation-drawer--persistent": b.value,
          "v-navigation-drawer--active": V.value,
          "v-navigation-drawer--sticky": T.value
        }, o.value, u.value, s.value, d.value, c.value, v.value, e.class],
        style: [r.value, z.value, y.value, te.value, e.style]
      }, p, t), {
        default: () => {
          var E, F, U;
          return [_ && C("div", {
            key: "image",
            class: "v-navigation-drawer__img"
          }, [l.image ? h(De, {
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
          }, l.image) : h($t, {
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
          }, [(U = l.append) == null ? void 0 : U.call(l)])];
        }
      }), h(la, {
        name: "fade-transition"
      }, {
        default: () => [B.value && ($.value || V.value) && !!e.scrim && C("div", L({
          class: ["v-navigation-drawer__scrim", ae.backgroundColorClasses.value],
          style: [re.value, ae.backgroundColorStyles.value],
          onClick: () => {
            b.value || (V.value = !1);
          }
        }, p), null)]
      })]);
    }), {
      isStuck: G
    };
  }
}), Bs = {
  __name: "OxAppNav",
  props: /* @__PURE__ */ Ja({
    items: Array
  }, {
    drawer: {},
    drawerModifiers: {}
  }),
  emits: ["update:drawer"],
  setup(e) {
    ve("context");
    const n = ve("panels"), t = el(e, "drawer"), a = q([]), l = e, i = A(() => (o(l.items), l.items));
    function o(u) {
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
    return (u, r) => (M(), Y(_s, {
      modelValue: t.value,
      "onUpdate:modelValue": r[1] || (r[1] = (c) => t.value = c),
      theme: "dark"
    }, {
      append: O(() => [
        h(dt, null, {
          default: O(() => [
            j(u.$slots, "append")
          ]),
          _: 3
        })
      ]),
      default: O(() => [
        j(u.$slots, "prepend"),
        h(dt, {
          opened: a.value,
          "onUpdate:opened": r[0] || (r[0] = (c) => a.value = c),
          density: "compact"
        }, {
          default: O(() => [
            (M(!0), me(X, null, Te(i.value, (c, d) => (M(), Y(S(Ss), L({
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
}, $s = K({
  ...xe(),
  ...gs({
    fullHeight: !0
  }),
  ...Ne()
}, "VApp"), Es = ne()({
  name: "VApp",
  props: $s(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = Ye(e), {
      layoutClasses: l,
      getLayoutItem: i,
      items: o,
      layoutRef: s
    } = hs(e), {
      rtlClasses: u
    } = nt();
    return ie(() => {
      var r;
      return C("div", {
        ref: s,
        class: fe(["v-application", a.themeClasses.value, l.value, u.value, e.class]),
        style: Ve([e.style])
      }, [C("div", {
        class: "v-application__wrap"
      }, [(r = t.default) == null ? void 0 : r.call(t)])]);
    }), {
      getLayoutItem: i,
      items: o,
      theme: a
    };
  }
}), Nn = K({
  text: String,
  ...xe(),
  ...je()
}, "VToolbarTitle"), Hn = ne()({
  name: "VToolbarTitle",
  props: Nn(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    return ie(() => {
      const a = !!(t.default || t.text || e.text);
      return h(e.tag, {
        class: fe(["v-toolbar-title", e.class]),
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
}), Os = [null, "prominent", "default", "comfortable", "compact"], zn = K({
  absolute: Boolean,
  collapse: Boolean,
  color: String,
  density: {
    type: String,
    default: "default",
    validator: (e) => Os.includes(e)
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
  ...je({
    tag: "header"
  }),
  ...Ne()
}, "VToolbar"), Wa = ne()({
  name: "VToolbar",
  props: zn(),
  setup(e, n) {
    var v;
    let {
      slots: t
    } = n;
    const {
      backgroundColorClasses: a,
      backgroundColorStyles: l
    } = ct(() => e.color), {
      borderClasses: i
    } = ha(e), {
      elevationClasses: o
    } = ba(e), {
      roundedClasses: s
    } = Bt(e), {
      themeClasses: u
    } = Ye(e), {
      rtlClasses: r
    } = nt(), c = ee(!!(e.extended || (v = t.extension) != null && v.call(t))), d = A(() => parseInt(Number(e.height) + (e.density === "prominent" ? Number(e.height) : 0) - (e.density === "comfortable" ? 8 : 0) - (e.density === "compact" ? 16 : 0), 10)), m = A(() => c.value ? parseInt(Number(e.extensionHeight) + (e.density === "prominent" ? Number(e.extensionHeight) : 0) - (e.density === "comfortable" ? 4 : 0) - (e.density === "compact" ? 8 : 0), 10) : 0);
    return at({
      VBtn: {
        variant: "text"
      }
    }), ie(() => {
      var p;
      const g = !!(e.title || t.title), V = !!(t.image || e.image), y = (p = t.extension) == null ? void 0 : p.call(t);
      return c.value = !!(e.extended || y), h(e.tag, {
        class: fe(["v-toolbar", {
          "v-toolbar--absolute": e.absolute,
          "v-toolbar--collapse": e.collapse,
          "v-toolbar--flat": e.flat,
          "v-toolbar--floating": e.floating,
          [`v-toolbar--density-${e.density}`]: !0
        }, a.value, i.value, o.value, s.value, u.value, r.value, e.class]),
        style: Ve([l.value, e.style])
      }, {
        default: () => [V && C("div", {
          key: "image",
          class: "v-toolbar__image"
        }, [t.image ? h(De, {
          key: "image-defaults",
          disabled: !e.image,
          defaults: {
            VImg: {
              cover: !0,
              src: e.image
            }
          }
        }, t.image) : h($t, {
          key: "image-img",
          cover: !0,
          src: e.image
        }, null)]), h(De, {
          defaults: {
            VTabs: {
              height: he(d.value)
            }
          }
        }, {
          default: () => {
            var f, I, x;
            return [C("div", {
              class: "v-toolbar__content",
              style: {
                height: he(d.value)
              }
            }, [t.prepend && C("div", {
              class: "v-toolbar__prepend"
            }, [(f = t.prepend) == null ? void 0 : f.call(t)]), g && h(Hn, {
              key: "title",
              text: e.title
            }, {
              text: t.title
            }), (I = t.default) == null ? void 0 : I.call(t), t.append && C("div", {
              class: "v-toolbar__append"
            }, [(x = t.append) == null ? void 0 : x.call(t)])])];
          }
        }), h(De, {
          defaults: {
            VTabs: {
              height: he(m.value)
            }
          }
        }, {
          default: () => [h(Oi, null, {
            default: () => [c.value && C("div", {
              class: "v-toolbar__extension",
              style: {
                height: he(m.value)
              }
            }, [y])]
          })]
        })]
      });
    }), {
      contentHeight: d,
      extensionHeight: m
    };
  }
}), Fs = K({
  scrollTarget: {
    type: String
  },
  scrollThreshold: {
    type: [String, Number],
    default: 300
  }
}, "scroll");
function Rs(e) {
  let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    canScroll: t
  } = n;
  let a = 0, l = 0;
  const i = q(null), o = ee(0), s = ee(0), u = ee(0), r = ee(!1), c = ee(!1), d = A(() => Number(e.scrollThreshold)), m = A(() => Je((d.value - o.value) / d.value || 0)), v = () => {
    const g = i.value;
    if (!g || t && !t.value) return;
    a = o.value, o.value = "window" in g ? g.pageYOffset : g.scrollTop;
    const V = g instanceof Window ? document.documentElement.scrollHeight : g.scrollHeight;
    if (l !== V) {
      l = V;
      return;
    }
    c.value = o.value < a, u.value = Math.abs(o.value - d.value);
  };
  return J(c, () => {
    s.value = s.value || o.value;
  }), J(r, () => {
    s.value = 0;
  }), Ge(() => {
    J(() => e.scrollTarget, (g) => {
      var y;
      const V = g ? document.querySelector(g) : window;
      if (!V) {
        Cn(`Unable to locate element with identifier ${g}`);
        return;
      }
      V !== i.value && ((y = i.value) == null || y.removeEventListener("scroll", v), i.value = V, i.value.addEventListener("scroll", v, {
        passive: !0
      }));
    }, {
      immediate: !0
    });
  }), mt(() => {
    var g;
    (g = i.value) == null || g.removeEventListener("scroll", v);
  }), t && J(t, v, {
    immediate: !0
  }), {
    scrollThreshold: d,
    currentScroll: o,
    currentThreshold: u,
    isScrollActive: r,
    scrollRatio: m,
    // required only for testing
    // probably can be removed
    // later (2 chars chlng)
    isScrollingUp: c,
    savedScroll: s
  };
}
const Ms = K({
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
  ...zn(),
  ...On(),
  ...Fs(),
  height: {
    type: [Number, String],
    default: 64
  }
}, "VAppBar"), Ds = ne()({
  name: "VAppBar",
  props: Ms(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = q(), l = we(e, "modelValue"), i = A(() => {
      var I;
      const f = new Set(((I = e.scrollBehavior) == null ? void 0 : I.split(" ")) ?? []);
      return {
        hide: f.has("hide"),
        fullyHide: f.has("fully-hide"),
        inverted: f.has("inverted"),
        collapse: f.has("collapse"),
        elevate: f.has("elevate"),
        fadeImage: f.has("fade-image")
        // shrink: behavior.has('shrink'),
      };
    }), o = A(() => {
      const f = i.value;
      return f.hide || f.fullyHide || f.inverted || f.collapse || f.elevate || f.fadeImage || // behavior.shrink ||
      !l.value;
    }), {
      currentScroll: s,
      scrollThreshold: u,
      isScrollingUp: r,
      scrollRatio: c
    } = Rs(e, {
      canScroll: o
    }), d = H(() => i.value.hide || i.value.fullyHide), m = A(() => e.collapse || i.value.collapse && (i.value.inverted ? c.value > 0 : c.value === 0)), v = A(() => e.flat || i.value.fullyHide && !l.value || i.value.elevate && (i.value.inverted ? s.value > 0 : s.value === 0)), g = A(() => i.value.fadeImage ? i.value.inverted ? 1 - c.value : c.value : void 0), V = A(() => {
      var x, k;
      if (i.value.hide && i.value.inverted) return 0;
      const f = ((x = a.value) == null ? void 0 : x.contentHeight) ?? 0, I = ((k = a.value) == null ? void 0 : k.extensionHeight) ?? 0;
      return d.value ? s.value < u.value || i.value.fullyHide ? f + I : f : f + I;
    });
    Xe(() => !!e.scrollBehavior, () => {
      et(() => {
        d.value ? i.value.inverted ? l.value = s.value > u.value : l.value = r.value || s.value < u.value : l.value = !0;
      });
    });
    const {
      ssrBootStyles: y
    } = pa(), {
      layoutItemStyles: p
    } = Rn({
      id: e.name,
      order: A(() => parseInt(e.order, 10)),
      position: H(() => e.location),
      layoutSize: V,
      elementSize: ee(void 0),
      active: l,
      absolute: H(() => e.absolute)
    });
    return ie(() => {
      const f = Wa.filterProps(e);
      return h(Wa, L({
        ref: a,
        class: ["v-app-bar", {
          "v-app-bar--bottom": e.location === "bottom"
        }, e.class],
        style: [{
          ...p.value,
          "--v-toolbar-image-opacity": g.value,
          height: void 0,
          ...y.value
        }, e.style]
      }, f, {
        collapse: m.value,
        flat: v.value
      }), t);
    }), {};
  }
}), Ls = K({
  ...cn({
    icon: "$menu",
    variant: "text"
  })
}, "VAppBarNavIcon"), Wn = ne()({
  name: "VAppBarNavIcon",
  props: Ls(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    return ie(() => h(pe, L(e, {
      class: ["v-app-bar-nav-icon"]
    }), t)), {};
  }
}), Kl = ne()({
  name: "VAppBarTitle",
  props: Nn(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    return ie(() => h(Hn, L(e, {
      class: "v-app-bar-title"
    }), t)), {};
  }
}), Ns = K({
  scrollable: Boolean,
  ...xe(),
  ...Ut(),
  ...je({
    tag: "main"
  })
}, "VMain"), Hs = ne()({
  name: "VMain",
  props: Ns(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const {
      dimensionStyles: a
    } = Wt(e), {
      mainStyles: l
    } = Fn(), {
      ssrBootStyles: i
    } = pa();
    return ie(() => h(e.tag, {
      class: fe(["v-main", {
        "v-main--scrollable": e.scrollable
      }, e.class]),
      style: Ve([l.value, i.value, a.value, e.style])
    }, {
      default: () => {
        var o, s;
        return [e.scrollable ? C("div", {
          class: "v-main__scroller"
        }, [(o = t.default) == null ? void 0 : o.call(t)]) : (s = t.default) == null ? void 0 : s.call(t)];
      }
    })), {};
  }
});
function Ea(e, n) {
  return {
    x: e.x + n.x,
    y: e.y + n.y
  };
}
function zs(e, n) {
  return {
    x: e.x - n.x,
    y: e.y - n.y
  };
}
function Gl(e, n) {
  if (e.side === "top" || e.side === "bottom") {
    const {
      side: t,
      align: a
    } = e, l = a === "left" ? 0 : a === "center" ? n.width / 2 : a === "right" ? n.width : a, i = t === "top" ? 0 : t === "bottom" ? n.height : t;
    return Ea({
      x: l,
      y: i
    }, n);
  } else if (e.side === "left" || e.side === "right") {
    const {
      side: t,
      align: a
    } = e, l = t === "left" ? 0 : t === "right" ? n.width : t, i = a === "top" ? 0 : a === "center" ? n.height / 2 : a === "bottom" ? n.height : a;
    return Ea({
      x: l,
      y: i
    }, n);
  }
  return Ea({
    x: n.width / 2,
    y: n.height / 2
  }, n);
}
const Un = {
  static: js,
  // specific viewport position, usually centered
  connected: Gs
  // connected to a certain element
}, Ws = K({
  locationStrategy: {
    type: [String, Function],
    default: "static",
    validator: (e) => typeof e == "function" || e in Un
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
function Us(e, n) {
  const t = q({}), a = q();
  ze && Xe(() => !!(n.isActive.value && e.locationStrategy), (s) => {
    var u, r;
    J(() => e.locationStrategy, s), Ue(() => {
      window.removeEventListener("resize", l), visualViewport == null || visualViewport.removeEventListener("resize", i), visualViewport == null || visualViewport.removeEventListener("scroll", o), a.value = void 0;
    }), window.addEventListener("resize", l, {
      passive: !0
    }), visualViewport == null || visualViewport.addEventListener("resize", i, {
      passive: !0
    }), visualViewport == null || visualViewport.addEventListener("scroll", o, {
      passive: !0
    }), typeof e.locationStrategy == "function" ? a.value = (u = e.locationStrategy(n, e, t)) == null ? void 0 : u.updateLocation : a.value = (r = Un[e.locationStrategy](n, e, t)) == null ? void 0 : r.updateLocation;
  });
  function l(s) {
    var u;
    (u = a.value) == null || u.call(a, s);
  }
  function i(s) {
    var u;
    (u = a.value) == null || u.call(a, s);
  }
  function o(s) {
    var u;
    (u = a.value) == null || u.call(a, s);
  }
  return {
    contentStyles: t,
    updateLocation: a
  };
}
function js() {
}
function Ks(e, n) {
  const t = vl(e);
  return n ? t.x += parseFloat(e.style.right || 0) : t.x -= parseFloat(e.style.left || 0), t.y -= parseFloat(e.style.top || 0), t;
}
function Gs(e, n, t) {
  (Array.isArray(e.target.value) || ms(e.target.value)) && Object.assign(t.value, {
    position: "fixed",
    top: 0,
    [e.isRtl.value ? "right" : "left"]: 0
  });
  const {
    preferredAnchor: l,
    preferredOrigin: i
  } = ji(() => {
    const p = $l(n.location, e.isRtl.value), f = n.origin === "overlap" ? p : n.origin === "auto" ? Aa(p) : $l(n.origin, e.isRtl.value);
    return p.side === f.side && p.align === Ta(f).align ? {
      preferredAnchor: El(p),
      preferredOrigin: El(f)
    } : {
      preferredAnchor: p,
      preferredOrigin: f
    };
  }), [o, s, u, r] = ["minWidth", "minHeight", "maxWidth", "maxHeight"].map((p) => A(() => {
    const f = parseFloat(n[p]);
    return isNaN(f) ? 1 / 0 : f;
  })), c = A(() => {
    if (Array.isArray(n.offset))
      return n.offset;
    if (typeof n.offset == "string") {
      const p = n.offset.split(" ").map(parseFloat);
      return p.length < 2 && p.push(0), p;
    }
    return typeof n.offset == "number" ? [n.offset, 0] : [0, 0];
  });
  let d = !1, m = -1;
  const v = new Vn(4), g = new ResizeObserver(() => {
    if (!d) return;
    if (requestAnimationFrame((f) => {
      f !== m && v.clear(), requestAnimationFrame((I) => {
        m = I;
      });
    }), v.isFull) {
      const f = v.values();
      if (st(f.at(-1), f.at(-3)))
        return;
    }
    const p = y();
    p && v.push(p.flipped);
  });
  J([e.target, e.contentEl], (p, f) => {
    let [I, x] = p, [k, w] = f;
    k && !Array.isArray(k) && g.unobserve(k), I && !Array.isArray(I) && g.observe(I), w && g.unobserve(w), x && g.observe(x);
  }, {
    immediate: !0
  }), Ue(() => {
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
    (Array.isArray(e.target.value) || e.target.value.offsetParent || e.target.value.getClientRects().length) && (V = _n(e.target.value));
    const p = Ks(e.contentEl.value, e.isRtl.value), f = sa(e.contentEl.value), I = 12;
    f.length || (f.push(document.documentElement), e.contentEl.value.style.top && e.contentEl.value.style.left || (p.x -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0), p.y -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0)));
    const x = f.reduce((R, z) => {
      const W = us(z);
      return R ? new tt({
        x: Math.max(R.left, W.left),
        y: Math.max(R.top, W.top),
        width: Math.min(R.right, W.right) - Math.max(R.left, W.left),
        height: Math.min(R.bottom, W.bottom) - Math.max(R.top, W.top)
      }) : W;
    }, void 0);
    x.x += I, x.y += I, x.width -= I * 2, x.height -= I * 2;
    let k = {
      anchor: l.value,
      origin: i.value
    };
    function w(R) {
      const z = new tt(p), W = Gl(R.anchor, V), G = Gl(R.origin, z);
      let {
        x: te,
        y: ae
      } = zs(W, G);
      switch (R.anchor.side) {
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
      switch (R.anchor.align) {
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
      return z.x += te, z.y += ae, z.width = Math.min(z.width, u.value), z.height = Math.min(z.height, r.value), {
        overflows: Ll(z, x),
        x: te,
        y: ae
      };
    }
    let P = 0, b = 0;
    const B = {
      x: 0,
      y: 0
    }, T = {
      x: !1,
      y: !1
    };
    let $ = -1;
    for (; ; ) {
      if ($++ > 10) {
        Pn("Infinite loop detected in connectedLocationStrategy");
        break;
      }
      const {
        x: R,
        y: z,
        overflows: W
      } = w(k);
      P += R, b += z, p.x += R, p.y += z;
      {
        const G = Ol(k.anchor), te = W.x.before || W.x.after, ae = W.y.before || W.y.after;
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
            }, F = _ === "x" ? G === "y" ? Ta : Aa : G === "y" ? Aa : Ta;
            E.anchor = F(E.anchor), E.origin = F(E.origin);
            const {
              overflows: U
            } = w(E);
            (U[_].before <= W[_].before && U[_].after <= W[_].after || U[_].before + U[_].after < (W[_].before + W[_].after) / 2) && (k = E, re = T[_] = !0);
          }
        }), re) continue;
      }
      W.x.before && (P += W.x.before, p.x += W.x.before), W.x.after && (P -= W.x.after, p.x -= W.x.after), W.y.before && (b += W.y.before, p.y += W.y.before), W.y.after && (b -= W.y.after, p.y -= W.y.after);
      {
        const G = Ll(p, x);
        B.x = x.width - G.x.before - G.x.after, B.y = x.height - G.y.before - G.y.after, P += G.x.before, p.x += G.x.before, b += G.y.before, p.y += G.y.before;
      }
      break;
    }
    const D = Ol(k.anchor);
    return Object.assign(t.value, {
      "--v-overlay-anchor-origin": `${k.anchor.side} ${k.anchor.align}`,
      transformOrigin: `${k.origin.side} ${k.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: he(Oa(b)),
      left: e.isRtl.value ? void 0 : he(Oa(P)),
      right: e.isRtl.value ? he(Oa(-P)) : void 0,
      minWidth: he(D === "y" ? Math.min(o.value, V.width) : o.value),
      maxWidth: he(Yl(Je(B.x, o.value === 1 / 0 ? 0 : o.value, u.value))),
      maxHeight: he(Yl(Je(B.y, s.value === 1 / 0 ? 0 : s.value, r.value)))
    }), {
      available: B,
      contentBox: p,
      flipped: T
    };
  }
  return J(() => [l.value, i.value, n.offset, n.minWidth, n.minHeight, n.maxWidth, n.maxHeight], () => y()), _e(() => {
    const p = y();
    if (!p) return;
    const {
      available: f,
      contentBox: I
    } = p;
    I.height > f.y && requestAnimationFrame(() => {
      y(), requestAnimationFrame(() => {
        y();
      });
    });
  }), {
    updateLocation: y
  };
}
function Oa(e) {
  return Math.round(e * devicePixelRatio) / devicePixelRatio;
}
function Yl(e) {
  return Math.ceil(e * devicePixelRatio) / devicePixelRatio;
}
let Ua = !0;
const ua = [];
function Ys(e) {
  !Ua || ua.length ? (ua.push(e), ja()) : (Ua = !1, e(), ja());
}
let ql = -1;
function ja() {
  cancelAnimationFrame(ql), ql = requestAnimationFrame(() => {
    const e = ua.shift();
    e && e(), ua.length ? ja() : Ua = !0;
  });
}
const aa = {
  none: null,
  close: Zs,
  block: Qs,
  reposition: Js
}, qs = K({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (e) => typeof e == "function" || e in aa
  }
}, "VOverlay-scroll-strategies");
function Xs(e, n) {
  if (!ze) return;
  let t;
  et(async () => {
    t == null || t.stop(), n.isActive.value && e.scrollStrategy && (t = sn(), await new Promise((a) => setTimeout(a)), t.active && t.run(() => {
      var a;
      typeof e.scrollStrategy == "function" ? e.scrollStrategy(n, e, t) : (a = aa[e.scrollStrategy]) == null || a.call(aa, n, e, t);
    }));
  }), Ue(() => {
    t == null || t.stop();
  });
}
function Zs(e) {
  function n(t) {
    e.isActive.value = !1;
  }
  jn(e.targetEl.value ?? e.contentEl.value, n);
}
function Qs(e, n) {
  var o;
  const t = (o = e.root.value) == null ? void 0 : o.offsetParent, a = [.../* @__PURE__ */ new Set([...sa(e.targetEl.value, n.contained ? t : void 0), ...sa(e.contentEl.value, n.contained ? t : void 0)])].filter((s) => !s.classList.contains("v-overlay-scroll-blocked")), l = window.innerWidth - document.documentElement.offsetWidth, i = ((s) => fl(s) && s)(t || document.documentElement);
  i && e.root.value.classList.add("v-overlay--scroll-blocked"), a.forEach((s, u) => {
    s.style.setProperty("--v-body-scroll-x", he(-s.scrollLeft)), s.style.setProperty("--v-body-scroll-y", he(-s.scrollTop)), s !== document.documentElement && s.style.setProperty("--v-scrollbar-offset", he(l)), s.classList.add("v-overlay-scroll-blocked");
  }), Ue(() => {
    a.forEach((s, u) => {
      const r = parseFloat(s.style.getPropertyValue("--v-body-scroll-x")), c = parseFloat(s.style.getPropertyValue("--v-body-scroll-y")), d = s.style.scrollBehavior;
      s.style.scrollBehavior = "auto", s.style.removeProperty("--v-body-scroll-x"), s.style.removeProperty("--v-body-scroll-y"), s.style.removeProperty("--v-scrollbar-offset"), s.classList.remove("v-overlay-scroll-blocked"), s.scrollLeft = -r, s.scrollTop = -c, s.style.scrollBehavior = d;
    }), i && e.root.value.classList.remove("v-overlay--scroll-blocked");
  });
}
function Js(e, n, t) {
  let a = !1, l = -1, i = -1;
  function o(s) {
    Ys(() => {
      var c, d;
      const u = performance.now();
      (d = (c = e.updateLocation).value) == null || d.call(c, s), a = (performance.now() - u) / (1e3 / 60) > 2;
    });
  }
  i = (typeof requestIdleCallback > "u" ? (s) => s() : requestIdleCallback)(() => {
    t.run(() => {
      jn(e.targetEl.value ?? e.contentEl.value, (s) => {
        a ? (cancelAnimationFrame(l), l = requestAnimationFrame(() => {
          l = requestAnimationFrame(() => {
            o(s);
          });
        })) : o(s);
      });
    });
  }), Ue(() => {
    typeof cancelIdleCallback < "u" && cancelIdleCallback(i), cancelAnimationFrame(l);
  });
}
function jn(e, n) {
  const t = [document, ...sa(e)];
  t.forEach((a) => {
    a.addEventListener("scroll", n, {
      passive: !0
    });
  }), Ue(() => {
    t.forEach((a) => {
      a.removeEventListener("scroll", n);
    });
  });
}
const Ka = Symbol.for("vuetify:v-menu"), eu = K({
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
  ...Dn()
}, "VOverlay-activator");
function tu(e, n) {
  let {
    isActive: t,
    isTop: a,
    contentEl: l
  } = n;
  const i = lt("useActivator"), o = q();
  let s = !1, u = !1, r = !0;
  const c = A(() => e.openOnFocus || e.openOnFocus == null && e.openOnHover), d = A(() => e.openOnClick || e.openOnClick == null && !e.openOnHover && !c.value), {
    runOpenDelay: m,
    runCloseDelay: v
  } = Ln(e, (b) => {
    b === (e.openOnHover && s || c.value && u) && !(e.openOnHover && t.value && !a.value) && (t.value !== b && (r = !0), t.value = b);
  }), g = q(), V = {
    onClick: (b) => {
      b.stopPropagation(), o.value = b.currentTarget || b.target, t.value || (g.value = [b.clientX, b.clientY]), t.value = !t.value;
    },
    onMouseenter: (b) => {
      var B;
      (B = b.sourceCapabilities) != null && B.firesTouchEvents || (s = !0, o.value = b.currentTarget || b.target, m());
    },
    onMouseleave: (b) => {
      s = !1, v();
    },
    onFocus: (b) => {
      At(b.target, ":focus-visible") !== !1 && (u = !0, b.stopPropagation(), o.value = b.currentTarget || b.target, m());
    },
    onBlur: (b) => {
      u = !1, b.stopPropagation(), v();
    }
  }, y = A(() => {
    const b = {};
    return d.value && (b.onClick = V.onClick), e.openOnHover && (b.onMouseenter = V.onMouseenter, b.onMouseleave = V.onMouseleave), c.value && (b.onFocus = V.onFocus, b.onBlur = V.onBlur), b;
  }), p = A(() => {
    const b = {};
    if (e.openOnHover && (b.onMouseenter = () => {
      s = !0, m();
    }, b.onMouseleave = () => {
      s = !1, v();
    }), c.value && (b.onFocusin = () => {
      u = !0, m();
    }, b.onFocusout = () => {
      u = !1, v();
    }), e.closeOnContentClick) {
      const B = ve(Ka, null);
      b.onClick = () => {
        t.value = !1, B == null || B.closeParents();
      };
    }
    return b;
  }), f = A(() => {
    const b = {};
    return e.openOnHover && (b.onMouseenter = () => {
      r && (s = !0, r = !1, m());
    }, b.onMouseleave = () => {
      s = !1, v();
    }), b;
  });
  J(a, (b) => {
    var B;
    b && (e.openOnHover && !s && (!c.value || !u) || c.value && !u && (!e.openOnHover || !s)) && !((B = l.value) != null && B.contains(document.activeElement)) && (t.value = !1);
  }), J(t, (b) => {
    b || setTimeout(() => {
      g.value = void 0;
    });
  }, {
    flush: "post"
  });
  const I = Ml();
  et(() => {
    I.value && _e(() => {
      o.value = I.el;
    });
  });
  const x = Ml(), k = A(() => e.target === "cursor" && g.value ? g.value : x.value ? x.el : Kn(e.target, i) || o.value), w = A(() => Array.isArray(k.value) ? void 0 : k.value);
  let P;
  return J(() => !!e.activator, (b) => {
    b && ze ? (P = sn(), P.run(() => {
      au(e, i, {
        activatorEl: o,
        activatorEvents: y
      });
    })) : P && P.stop();
  }, {
    flush: "post",
    immediate: !0
  }), Ue(() => {
    P == null || P.stop();
  }), {
    activatorEl: o,
    activatorRef: I,
    target: k,
    targetEl: w,
    targetRef: x,
    activatorEvents: y,
    contentEvents: p,
    scrimEvents: f
  };
}
function au(e, n, t) {
  let {
    activatorEl: a,
    activatorEvents: l
  } = t;
  J(() => e.activator, (u, r) => {
    if (r && u !== r) {
      const c = s(r);
      c && o(c);
    }
    u && _e(() => i());
  }, {
    immediate: !0
  }), J(() => e.activatorProps, () => {
    i();
  }), Ue(() => {
    o();
  });
  function i() {
    let u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : s(), r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    u && rs(u, L(l.value, r));
  }
  function o() {
    let u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : s(), r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    u && cs(u, L(l.value, r));
  }
  function s() {
    let u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : e.activator;
    const r = Kn(u, n);
    return a.value = (r == null ? void 0 : r.nodeType) === Node.ELEMENT_NODE ? r : void 0, a.value;
  }
}
function Kn(e, n) {
  var a, l;
  if (!e) return;
  let t;
  if (e === "parent") {
    let i = (l = (a = n == null ? void 0 : n.proxy) == null ? void 0 : a.$el) == null ? void 0 : l.parentNode;
    for (; i != null && i.hasAttribute("data-no-activator"); )
      i = i.parentNode;
    t = i;
  } else typeof e == "string" ? t = document.querySelector(e) : "$el" in e ? t = e.$el : t = e;
  return t;
}
function lu() {
  if (!ze) return ee(!1);
  const {
    ssr: e
  } = yt();
  if (e) {
    const n = ee(!1);
    return Ge(() => {
      n.value = !0;
    }), n;
  } else
    return ee(!0);
}
const Gn = K({
  eager: Boolean
}, "lazy");
function Yn(e, n) {
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
const Xl = Symbol.for("vuetify:stack"), Ot = Qe([]);
function nu(e, n, t) {
  const a = lt("useStack"), l = !t, i = ve(Xl, void 0), o = Qe({
    activeChildren: /* @__PURE__ */ new Set()
  });
  We(Xl, o);
  const s = ee(Number(_l(n)));
  Xe(e, () => {
    var d;
    const c = (d = Ot.at(-1)) == null ? void 0 : d[1];
    s.value = c ? c + 10 : Number(_l(n)), l && Ot.push([a.uid, s.value]), i == null || i.activeChildren.add(a.uid), Ue(() => {
      if (l) {
        const m = La(Ot).findIndex((v) => v[0] === a.uid);
        Ot.splice(m, 1);
      }
      i == null || i.activeChildren.delete(a.uid);
    });
  });
  const u = ee(!0);
  l && et(() => {
    var d;
    const c = ((d = Ot.at(-1)) == null ? void 0 : d[0]) === a.uid;
    setTimeout(() => u.value = c);
  });
  const r = H(() => !o.activeChildren.size);
  return {
    globalTop: on(u),
    localTop: r,
    stackStyles: H(() => ({
      zIndex: s.value
    }))
  };
}
function ou(e) {
  return {
    teleportTarget: A(() => {
      const t = e();
      if (t === !0 || !ze) return;
      const a = t === !1 ? document.body : typeof t == "string" ? document.querySelector(t) : t;
      if (a == null) {
        vi(`Unable to locate target ${t}`);
        return;
      }
      let l = [...a.children].find((i) => i.matches(".v-overlay-container"));
      return l || (l = document.createElement("div"), l.className = "v-overlay-container", a.appendChild(l)), l;
    })
  };
}
function iu() {
  return !0;
}
function qn(e, n, t) {
  if (!e || Xn(e, t) === !1) return !1;
  const a = Bn(n);
  if (typeof ShadowRoot < "u" && a instanceof ShadowRoot && a.host === e.target) return !1;
  const l = (typeof t.value == "object" && t.value.include || (() => []))();
  return l.push(n), !l.some((i) => i == null ? void 0 : i.contains(e.target));
}
function Xn(e, n) {
  return (typeof n.value == "object" && n.value.closeConditional || iu)(e);
}
function su(e, n, t) {
  const a = typeof t.value == "function" ? t.value : t.value.handler;
  e.shadowTarget = e.target, n._clickOutside.lastMousedownWasOutside && qn(e, n, t) && setTimeout(() => {
    Xn(e, t) && a && a(e);
  }, 0);
}
function Zl(e, n) {
  const t = Bn(e);
  n(document), typeof ShadowRoot < "u" && t instanceof ShadowRoot && n(t);
}
const Ql = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(e, n) {
    const t = (l) => su(l, e, n), a = (l) => {
      e._clickOutside.lastMousedownWasOutside = qn(l, e, n);
    };
    Zl(e, (l) => {
      l.addEventListener("click", t, !0), l.addEventListener("mousedown", a, !0);
    }), e._clickOutside || (e._clickOutside = {
      lastMousedownWasOutside: !1
    }), e._clickOutside[n.instance.$.uid] = {
      onClick: t,
      onMousedown: a
    };
  },
  beforeUnmount(e, n) {
    e._clickOutside && (Zl(e, (t) => {
      var i;
      if (!t || !((i = e._clickOutside) != null && i[n.instance.$.uid])) return;
      const {
        onClick: a,
        onMousedown: l
      } = e._clickOutside[n.instance.$.uid];
      t.removeEventListener("click", a, !0), t.removeEventListener("mousedown", l, !0);
    }), delete e._clickOutside[n.instance.$.uid]);
  }
};
function uu(e) {
  const {
    modelValue: n,
    color: t,
    ...a
  } = e;
  return h(la, {
    name: "fade-transition",
    appear: !0
  }, {
    default: () => [e.modelValue && C("div", L({
      class: ["v-overlay__scrim", e.color.backgroundColorClasses.value],
      style: e.color.backgroundColorStyles.value
    }, a), null)]
  });
}
const ml = K({
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
  ...eu(),
  ...xe(),
  ...Ut(),
  ...Gn(),
  ...Ws(),
  ...qs(),
  ...Ne(),
  ...jt()
}, "VOverlay"), ra = ne()({
  name: "VOverlay",
  directives: {
    vClickOutside: Ql
  },
  inheritAttrs: !1,
  props: {
    _disableGlobalStack: Boolean,
    ...ml()
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
    const i = lt("VOverlay"), o = q(), s = q(), u = q(), r = we(e, "modelValue"), c = A({
      get: () => r.value,
      set: (Z) => {
        Z && e.disabled || (r.value = Z);
      }
    }), {
      themeClasses: d
    } = Ye(e), {
      rtlClasses: m,
      isRtl: v
    } = nt(), {
      hasContent: g,
      onAfterLeave: V
    } = Yn(e, c), y = ct(() => typeof e.scrim == "string" ? e.scrim : null), {
      globalTop: p,
      localTop: f,
      stackStyles: I
    } = nu(c, () => e.zIndex, e._disableGlobalStack), {
      activatorEl: x,
      activatorRef: k,
      target: w,
      targetEl: P,
      targetRef: b,
      activatorEvents: B,
      contentEvents: T,
      scrimEvents: $
    } = tu(e, {
      isActive: c,
      isTop: f,
      contentEl: u
    }), {
      teleportTarget: D
    } = ou(() => {
      var ge, N, Q;
      const Z = e.attach || e.contained;
      if (Z) return Z;
      const ce = ((ge = x == null ? void 0 : x.value) == null ? void 0 : ge.getRootNode()) || ((Q = (N = i.proxy) == null ? void 0 : N.$el) == null ? void 0 : Q.getRootNode());
      return ce instanceof ShadowRoot ? ce : !1;
    }), {
      dimensionStyles: R
    } = Wt(e), z = lu(), {
      scopeId: W
    } = qt();
    J(() => e.disabled, (Z) => {
      Z && (c.value = !1);
    });
    const {
      contentStyles: G,
      updateLocation: te
    } = Us(e, {
      isRtl: v,
      contentEl: u,
      target: w,
      isActive: c
    });
    Xs(e, {
      root: o,
      contentEl: u,
      targetEl: P,
      isActive: c,
      updateLocation: te
    });
    function ae(Z) {
      l("click:outside", Z), e.persistent ? be() : c.value = !1;
    }
    function re(Z) {
      return c.value && p.value && // If using scrim, only close if clicking on it rather than anything opened on top
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
      Z.key === "Escape" && p.value && ((ce = u.value) != null && ce.contains(document.activeElement) || l("keydown", Z), e.persistent ? be() : (c.value = !1, (ge = u.value) != null && ge.contains(document.activeElement) && ((N = x.value) == null || N.focus())));
    }
    function E(Z) {
      Z.key === "Escape" && !p.value || l("keydown", Z);
    }
    const F = rn();
    Xe(() => e.closeOnBack, () => {
      Fi(F, (Z) => {
        p.value && c.value ? (Z(!1), e.persistent ? be() : c.value = !1) : Z();
      });
    });
    const U = q();
    J(() => c.value && (e.absolute || e.contained) && D.value == null, (Z) => {
      if (Z) {
        const ce = $n(o.value);
        ce && ce !== document.scrollingElement && (U.value = ce.scrollTop);
      }
    });
    function be() {
      e.noClickAnimation || u.value && pt(u.value, [{
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
    function se() {
      V(), l("afterLeave");
    }
    return ie(() => {
      var Z;
      return C(X, null, [(Z = t.activator) == null ? void 0 : Z.call(t, {
        isActive: c.value,
        targetRef: b,
        props: L({
          ref: k
        }, B.value, e.activatorProps)
      }), z.value && g.value && h(Na, {
        disabled: !D.value,
        to: D.value
      }, {
        default: () => [C("div", L({
          class: ["v-overlay", {
            "v-overlay--absolute": e.absolute || e.contained,
            "v-overlay--active": c.value,
            "v-overlay--contained": e.contained
          }, d.value, m.value, e.class],
          style: [I.value, {
            "--v-overlay-opacity": e.opacity,
            top: he(U.value)
          }, e.style],
          ref: o,
          onKeydown: E
        }, W, a), [h(uu, L({
          color: y,
          modelValue: c.value && !!e.scrim,
          ref: s
        }, $.value), null), h(wa, {
          appear: !0,
          persisted: !0,
          transition: e.transition,
          target: w.value,
          onAfterEnter: le,
          onAfterLeave: se
        }, {
          default: () => {
            var ce;
            return [Ke(C("div", L({
              ref: u,
              class: ["v-overlay__content", e.contentClass],
              style: [R.value, G.value]
            }, T.value, e.contentProps), [(ce = t.default) == null ? void 0 : ce.call(t, {
              isActive: c
            })]), [[_t, c.value], [Ql, {
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
      target: w,
      animateClick: be,
      contentEl: u,
      globalTop: p,
      localTop: f,
      updateLocation: te
    };
  }
}), Fa = Symbol("Forwarded refs");
function Ra(e, n) {
  let t = e;
  for (; t; ) {
    const a = Reflect.getOwnPropertyDescriptor(t, n);
    if (a) return a;
    t = Object.getPrototypeOf(t);
  }
}
function bt(e) {
  for (var n = arguments.length, t = new Array(n > 1 ? n - 1 : 0), a = 1; a < n; a++)
    t[a - 1] = arguments[a];
  return e[Fa] = t, new Proxy(e, {
    get(l, i) {
      if (Reflect.has(l, i))
        return Reflect.get(l, i);
      if (!(typeof i == "symbol" || i.startsWith("$") || i.startsWith("__"))) {
        for (const o of t)
          if (o.value && Reflect.has(o.value, i)) {
            const s = Reflect.get(o.value, i);
            return typeof s == "function" ? s.bind(o.value) : s;
          }
      }
    },
    has(l, i) {
      if (Reflect.has(l, i))
        return !0;
      if (typeof i == "symbol" || i.startsWith("$") || i.startsWith("__")) return !1;
      for (const o of t)
        if (o.value && Reflect.has(o.value, i))
          return !0;
      return !1;
    },
    set(l, i, o) {
      if (Reflect.has(l, i))
        return Reflect.set(l, i, o);
      if (typeof i == "symbol" || i.startsWith("$") || i.startsWith("__")) return !1;
      for (const s of t)
        if (s.value && Reflect.has(s.value, i))
          return Reflect.set(s.value, i, o);
      return !1;
    },
    getOwnPropertyDescriptor(l, i) {
      var s;
      const o = Reflect.getOwnPropertyDescriptor(l, i);
      if (o) return o;
      if (!(typeof i == "symbol" || i.startsWith("$") || i.startsWith("__"))) {
        for (const u of t) {
          if (!u.value) continue;
          const r = Ra(u.value, i) ?? ("_" in u.value ? Ra((s = u.value._) == null ? void 0 : s.setupState, i) : void 0);
          if (r) return r;
        }
        for (const u of t) {
          const r = u.value && u.value[Fa];
          if (!r) continue;
          const c = r.slice();
          for (; c.length; ) {
            const d = c.shift(), m = Ra(d.value, i);
            if (m) return m;
            const v = d.value && d.value[Fa];
            v && c.push(...v);
          }
        }
      }
    }
  });
}
function ru(e) {
  const n = ee(e());
  let t = -1;
  function a() {
    clearInterval(t);
  }
  function l() {
    a(), _e(() => n.value = e());
  }
  function i(o) {
    const s = o ? getComputedStyle(o) : {
      transitionDuration: 0.2
    }, u = parseFloat(s.transitionDuration) * 1e3 || 200;
    if (a(), n.value <= 0) return;
    const r = performance.now();
    t = window.setInterval(() => {
      const c = performance.now() - r + u;
      n.value = Math.max(e() - c, 0), n.value <= 0 && a();
    }, u);
  }
  return Ue(a), {
    clear: a,
    time: n,
    start: i,
    reset: l
  };
}
const cu = K({
  multiLine: Boolean,
  text: String,
  timer: [Boolean, String],
  timeout: {
    type: [Number, String],
    default: 5e3
  },
  vertical: Boolean,
  ...fn({
    location: "bottom"
  }),
  ...vn(),
  ...kt(),
  ...Kt(),
  ...Ne(),
  ...ht(ml({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
}, "VSnackbar"), du = ne()({
  name: "VSnackbar",
  props: cu(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = we(e, "modelValue"), {
      positionClasses: l
    } = dn(e), {
      scopeId: i
    } = qt(), {
      themeClasses: o
    } = Ye(e), {
      colorClasses: s,
      colorStyles: u,
      variantClasses: r
    } = al(e), {
      roundedClasses: c
    } = Bt(e), d = ru(() => Number(e.timeout)), m = q(), v = q(), g = ee(!1), V = ee(0), y = q(), p = ve(Mt, void 0);
    Xe(() => !!p, () => {
      const $ = Fn();
      et(() => {
        y.value = $.mainStyles.value;
      });
    }), J(a, I), J(() => e.timeout, I), Ge(() => {
      a.value && I();
    });
    let f = -1;
    function I() {
      d.reset(), window.clearTimeout(f);
      const $ = Number(e.timeout);
      if (!a.value || $ === -1) return;
      const D = Ki(v.value);
      d.start(D), f = window.setTimeout(() => {
        a.value = !1;
      }, $);
    }
    function x() {
      d.reset(), window.clearTimeout(f);
    }
    function k() {
      g.value = !0, x();
    }
    function w() {
      g.value = !1, I();
    }
    function P($) {
      V.value = $.touches[0].clientY;
    }
    function b($) {
      Math.abs(V.value - $.changedTouches[0].clientY) > 50 && (a.value = !1);
    }
    function B() {
      g.value && w();
    }
    const T = A(() => e.location.split(" ").reduce(($, D) => ($[`v-snackbar--${D}`] = !0, $), {}));
    return ie(() => {
      const $ = ra.filterProps(e), D = !!(t.default || t.text || e.text);
      return h(ra, L({
        ref: m,
        class: ["v-snackbar", {
          "v-snackbar--active": a.value,
          "v-snackbar--multi-line": e.multiLine && !e.vertical,
          "v-snackbar--timer": !!e.timer,
          "v-snackbar--vertical": e.vertical
        }, T.value, l.value, e.class],
        style: [y.value, e.style]
      }, $, {
        modelValue: a.value,
        "onUpdate:modelValue": (R) => a.value = R,
        contentProps: L({
          class: ["v-snackbar__wrapper", o.value, s.value, c.value, r.value],
          style: [u.value],
          onPointerenter: k,
          onPointerleave: w
        }, $.contentProps),
        persistent: !0,
        noClickAnimation: !0,
        scrim: !1,
        scrollStrategy: "none",
        _disableGlobalStack: !0,
        onTouchstartPassive: P,
        onTouchend: b,
        onAfterLeave: B
      }, i), {
        default: () => {
          var R, z;
          return [ll(!1, "v-snackbar"), e.timer && !g.value && C("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [h(Ri, {
            ref: v,
            color: typeof e.timer == "string" ? e.timer : "info",
            max: e.timeout,
            "model-value": d.time.value
          }, null)]), D && C("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((R = t.text) == null ? void 0 : R.call(t)) ?? e.text, (z = t.default) == null ? void 0 : z.call(t)]), t.actions && h(De, {
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
    }), bt({}, m);
  }
}), gl = Symbol.for("vuetify:v-tabs"), vu = K({
  fixed: Boolean,
  sliderColor: String,
  hideSlider: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ...ht(cn({
    selectedClass: "v-tab--selected",
    variant: "text"
  }), ["active", "block", "flat", "location", "position", "symbol"])
}, "VTab"), Ga = ne()({
  name: "VTab",
  props: vu(),
  setup(e, n) {
    let {
      slots: t,
      attrs: a
    } = n;
    const {
      textColorClasses: l,
      textColorStyles: i
    } = Gt(() => e.sliderColor), o = q(), s = q(), u = A(() => e.direction === "horizontal"), r = A(() => {
      var d, m;
      return ((m = (d = o.value) == null ? void 0 : d.group) == null ? void 0 : m.isSelected.value) ?? !1;
    });
    function c(d) {
      var v, g;
      let {
        value: m
      } = d;
      if (m) {
        const V = (g = (v = o.value) == null ? void 0 : v.$el.parentElement) == null ? void 0 : g.querySelector(".v-tab--selected .v-tab__slider"), y = s.value;
        if (!V || !y) return;
        const p = getComputedStyle(V).color, f = V.getBoundingClientRect(), I = y.getBoundingClientRect(), x = u.value ? "x" : "y", k = u.value ? "X" : "Y", w = u.value ? "right" : "bottom", P = u.value ? "width" : "height", b = f[x], B = I[x], T = b > B ? f[w] - I[w] : f[x] - I[x], $ = Math.sign(T) > 0 ? u.value ? "right" : "bottom" : Math.sign(T) < 0 ? u.value ? "left" : "top" : "center", R = (Math.abs(T) + (Math.sign(T) < 0 ? f[P] : I[P])) / Math.max(f[P], I[P]) || 0, z = f[P] / I[P] || 0, W = 1.5;
        pt(y, {
          backgroundColor: [p, "currentcolor"],
          transform: [`translate${k}(${T}px) scale${k}(${z})`, `translate${k}(${T / W}px) scale${k}(${(R - 1) / W + 1})`, "none"],
          transformOrigin: Array(3).fill($)
        }, {
          duration: 225,
          easing: Rt
        });
      }
    }
    return ie(() => {
      const d = pe.filterProps(e);
      return h(pe, L({
        symbol: gl,
        ref: o,
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
          var m;
          return C(X, null, [((m = t.default) == null ? void 0 : m.call(t)) ?? e.text, !e.hideSlider && C("div", {
            ref: s,
            class: fe(["v-tab__slider", l.value]),
            style: Ve(i.value)
          }, null)]);
        }
      });
    }), bt({}, o);
  }
}), fu = (e) => {
  const {
    touchstartX: n,
    touchendX: t,
    touchstartY: a,
    touchendY: l
  } = e, i = 0.5, o = 16;
  e.offsetX = t - n, e.offsetY = l - a, Math.abs(e.offsetY) < i * Math.abs(e.offsetX) && (e.left && t < n - o && e.left(e), e.right && t > n + o && e.right(e)), Math.abs(e.offsetX) < i * Math.abs(e.offsetY) && (e.up && l < a - o && e.up(e), e.down && l > a + o && e.down(e));
};
function mu(e, n) {
  var a;
  const t = e.changedTouches[0];
  n.touchstartX = t.clientX, n.touchstartY = t.clientY, (a = n.start) == null || a.call(n, {
    originalEvent: e,
    ...n
  });
}
function gu(e, n) {
  var a;
  const t = e.changedTouches[0];
  n.touchendX = t.clientX, n.touchendY = t.clientY, (a = n.end) == null || a.call(n, {
    originalEvent: e,
    ...n
  }), fu(n);
}
function yu(e, n) {
  var a;
  const t = e.changedTouches[0];
  n.touchmoveX = t.clientX, n.touchmoveY = t.clientY, (a = n.move) == null || a.call(n, {
    originalEvent: e,
    ...n
  });
}
function hu() {
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
    touchstart: (t) => mu(t, n),
    touchend: (t) => gu(t, n),
    touchmove: (t) => yu(t, n)
  };
}
function bu(e, n) {
  var s;
  const t = n.value, a = t != null && t.parent ? e.parentElement : e, l = (t == null ? void 0 : t.options) ?? {
    passive: !0
  }, i = (s = n.instance) == null ? void 0 : s.$.uid;
  if (!a || !i) return;
  const o = hu(n.value);
  a._touchHandlers = a._touchHandlers ?? /* @__PURE__ */ Object.create(null), a._touchHandlers[i] = o, In(o).forEach((u) => {
    a.addEventListener(u, o[u], l);
  });
}
function pu(e, n) {
  var i, o;
  const t = (i = n.value) != null && i.parent ? e.parentElement : e, a = (o = n.instance) == null ? void 0 : o.$.uid;
  if (!(t != null && t._touchHandlers) || !a) return;
  const l = t._touchHandlers[a];
  In(l).forEach((s) => {
    t.removeEventListener(s, l[s]);
  }), delete t._touchHandlers[a];
}
const Ya = {
  mounted: bu,
  unmounted: pu
}, Zn = Symbol.for("vuetify:v-window"), Qn = Symbol.for("vuetify:v-window-group"), Jn = K({
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
  ...je(),
  ...Ne()
}, "VWindow"), qa = ne()({
  name: "VWindow",
  directives: {
    vTouch: Ya
  },
  props: Jn(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const {
      themeClasses: a
    } = Ye(e), {
      isRtl: l
    } = nt(), {
      t: i
    } = ot(), o = nl(e, Qn), s = q(), u = A(() => l.value ? !e.reverse : e.reverse), r = ee(!1), c = A(() => {
      const x = e.direction === "vertical" ? "y" : "x", w = (u.value ? !r.value : r.value) ? "-reverse" : "";
      return `v-window-${x}${w}-transition`;
    }), d = ee(0), m = q(void 0), v = A(() => o.items.value.findIndex((x) => o.selected.value.includes(x.id)));
    J(v, (x, k) => {
      const w = o.items.value.length, P = w - 1;
      w <= 2 ? r.value = x < k : x === P && k === 0 ? r.value = !0 : x === 0 && k === P ? r.value = !1 : r.value = x < k;
    }), We(Zn, {
      transition: c,
      isReversed: r,
      transitionCount: d,
      transitionHeight: m,
      rootRef: s
    });
    const g = H(() => e.continuous || v.value !== 0), V = H(() => e.continuous || v.value !== o.items.value.length - 1);
    function y() {
      g.value && o.prev();
    }
    function p() {
      V.value && o.next();
    }
    const f = A(() => {
      const x = [], k = {
        icon: l.value ? e.nextIcon : e.prevIcon,
        class: `v-window__${u.value ? "right" : "left"}`,
        onClick: o.prev,
        "aria-label": i("$vuetify.carousel.prev")
      };
      x.push(g.value ? t.prev ? t.prev({
        props: k
      }) : h(pe, k, null) : C("div", null, null));
      const w = {
        icon: l.value ? e.prevIcon : e.nextIcon,
        class: `v-window__${u.value ? "left" : "right"}`,
        onClick: o.next,
        "aria-label": i("$vuetify.carousel.next")
      };
      return x.push(V.value ? t.next ? t.next({
        props: w
      }) : h(pe, w, null) : C("div", null, null)), x;
    }), I = A(() => e.touch === !1 ? e.touch : {
      ...{
        left: () => {
          u.value ? y() : p();
        },
        right: () => {
          u.value ? p() : y();
        },
        start: (k) => {
          let {
            originalEvent: w
          } = k;
          w.stopPropagation();
        }
      },
      ...e.touch === !0 ? {} : e.touch
    });
    return ie(() => Ke(h(e.tag, {
      ref: s,
      class: fe(["v-window", {
        "v-window--show-arrows-on-hover": e.showArrows === "hover"
      }, a.value, e.class]),
      style: Ve(e.style)
    }, {
      default: () => {
        var x, k;
        return [C("div", {
          class: "v-window__container",
          style: {
            height: m.value
          }
        }, [(x = t.default) == null ? void 0 : x.call(t, {
          group: o
        }), e.showArrows !== !1 && C("div", {
          class: "v-window__controls"
        }, [f.value])]), (k = t.additional) == null ? void 0 : k.call(t, {
          group: o
        })];
      }
    }), [[Ya, I.value]])), {
      group: o
    };
  }
}), wu = K({
  ...ht(Jn(), ["continuous", "nextIcon", "prevIcon", "showArrows", "touch", "mandatory"])
}, "VTabsWindow"), yl = ne()({
  name: "VTabsWindow",
  props: wu(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = ve(gl, null), l = we(e, "modelValue"), i = A({
      get() {
        var o;
        return l.value != null || !a ? l.value : (o = a.items.value.find((s) => a.selected.value.includes(s.id))) == null ? void 0 : o.value;
      },
      set(o) {
        l.value = o;
      }
    });
    return ie(() => {
      const o = qa.filterProps(e);
      return h(qa, L({
        _as: "VTabsWindow"
      }, o, {
        modelValue: i.value,
        "onUpdate:modelValue": (s) => i.value = s,
        class: ["v-tabs-window", e.class],
        style: e.style,
        mandatory: !1,
        touch: !1
      }), t);
    }), {};
  }
}), eo = K({
  reverseTransition: {
    type: [Boolean, String],
    default: void 0
  },
  transition: {
    type: [Boolean, String],
    default: void 0
  },
  ...xe(),
  ...ol(),
  ...Gn()
}, "VWindowItem"), Xa = ne()({
  name: "VWindowItem",
  directives: {
    vTouch: Ya
  },
  props: eo(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = ve(Zn), l = il(e, Qn), {
      isBooted: i
    } = pa();
    if (!a || !l) throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const o = ee(!1), s = A(() => i.value && (a.isReversed.value ? e.reverseTransition !== !1 : e.transition !== !1));
    function u() {
      !o.value || !a || (o.value = !1, a.transitionCount.value > 0 && (a.transitionCount.value -= 1, a.transitionCount.value === 0 && (a.transitionHeight.value = void 0)));
    }
    function r() {
      var g;
      o.value || !a || (o.value = !0, a.transitionCount.value === 0 && (a.transitionHeight.value = he((g = a.rootRef.value) == null ? void 0 : g.clientHeight)), a.transitionCount.value += 1);
    }
    function c() {
      u();
    }
    function d(g) {
      o.value && _e(() => {
        !s.value || !o.value || !a || (a.transitionHeight.value = he(g.clientHeight));
      });
    }
    const m = A(() => {
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
    } = Yn(e, l.isSelected);
    return ie(() => h(wa, {
      transition: m.value,
      disabled: !i.value
    }, {
      default: () => {
        var g;
        return [Ke(C("div", {
          class: fe(["v-window-item", l.selectedClass.value, e.class]),
          style: Ve(e.style)
        }, [v.value && ((g = t.default) == null ? void 0 : g.call(t))]), [[_t, l.isSelected.value]])];
      }
    })), {
      groupItem: l
    };
  }
}), Su = K({
  ...eo()
}, "VTabsWindowItem"), ca = ne()({
  name: "VTabsWindowItem",
  props: Su(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    return ie(() => {
      const a = Xa.filterProps(e);
      return h(Xa, L({
        _as: "VTabsWindowItem"
      }, a, {
        class: ["v-tabs-window-item", e.class],
        style: e.style
      }), t);
    }), {};
  }
});
function xu(e) {
  let {
    selectedElement: n,
    containerElement: t,
    isRtl: a,
    isHorizontal: l
  } = e;
  const i = Lt(l, t), o = to(l, a, t), s = Lt(l, n), u = ao(l, n), r = s * 0.4;
  return o > u ? u - r : o + i < u + s ? u - i + s + r : o;
}
function ku(e) {
  let {
    selectedElement: n,
    containerElement: t,
    isHorizontal: a
  } = e;
  const l = Lt(a, t), i = ao(a, n), o = Lt(a, n);
  return i - l / 2 + o / 2;
}
function Jl(e, n) {
  const t = e ? "scrollWidth" : "scrollHeight";
  return (n == null ? void 0 : n[t]) || 0;
}
function Vu(e, n) {
  const t = e ? "clientWidth" : "clientHeight";
  return (n == null ? void 0 : n[t]) || 0;
}
function to(e, n, t) {
  if (!t)
    return 0;
  const {
    scrollLeft: a,
    offsetWidth: l,
    scrollWidth: i
  } = t;
  return e ? n ? i - l + a : a : t.scrollTop;
}
function Lt(e, n) {
  const t = e ? "offsetWidth" : "offsetHeight";
  return (n == null ? void 0 : n[t]) || 0;
}
function ao(e, n) {
  const t = e ? "offsetLeft" : "offsetTop";
  return (n == null ? void 0 : n[t]) || 0;
}
const lo = Symbol.for("vuetify:v-slide-group"), hl = K({
  centerActive: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  symbol: {
    type: null,
    default: lo
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
  ...je(),
  ...mn({
    selectedClass: "v-slide-group-item--active"
  })
}, "VSlideGroup"), Nt = ne()({
  name: "VSlideGroup",
  props: hl(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const {
      isRtl: a
    } = nt(), {
      displayClasses: l,
      mobile: i
    } = yt(e), o = nl(e, e.symbol), s = ee(!1), u = ee(0), r = ee(0), c = ee(0), d = A(() => e.direction === "horizontal"), {
      resizeRef: m,
      contentRect: v
    } = Pt(), {
      resizeRef: g,
      contentRect: V
    } = Pt(), y = ts(), p = A(() => ({
      container: m.el,
      duration: 200,
      easing: "easeOutQuart"
    })), f = A(() => o.selected.value.length ? o.items.value.findIndex((E) => E.id === o.selected.value[0]) : -1), I = A(() => o.selected.value.length ? o.items.value.findIndex((E) => E.id === o.selected.value[o.selected.value.length - 1]) : -1);
    if (ze) {
      let E = -1;
      J(() => [o.selected.value, v.value, V.value, d.value], () => {
        cancelAnimationFrame(E), E = requestAnimationFrame(() => {
          if (v.value && V.value) {
            const F = d.value ? "width" : "height";
            r.value = v.value[F], c.value = V.value[F], s.value = r.value + 1 < c.value;
          }
          if (f.value >= 0 && g.el) {
            const F = g.el.children[I.value];
            k(F, e.centerActive);
          }
        });
      });
    }
    const x = ee(!1);
    function k(E, F) {
      let U = 0;
      F ? U = ku({
        containerElement: m.el,
        isHorizontal: d.value,
        selectedElement: E
      }) : U = xu({
        containerElement: m.el,
        isHorizontal: d.value,
        isRtl: a.value,
        selectedElement: E
      }), w(U);
    }
    function w(E) {
      if (!ze || !m.el) return;
      const F = Lt(d.value, m.el), U = to(d.value, a.value, m.el);
      if (!(Jl(d.value, m.el) <= F || // Prevent scrolling by only a couple of pixels, which doesn't look smooth
      Math.abs(E - U) < 16)) {
        if (d.value && a.value && m.el) {
          const {
            scrollWidth: le,
            offsetWidth: se
          } = m.el;
          E = le - se - E;
        }
        d.value ? y.horizontal(E, p.value) : y(E, p.value);
      }
    }
    function P(E) {
      const {
        scrollTop: F,
        scrollLeft: U
      } = E.target;
      u.value = d.value ? U : F;
    }
    function b(E) {
      if (x.value = !0, !(!s.value || !g.el)) {
        for (const F of E.composedPath())
          for (const U of g.el.children)
            if (U === F) {
              k(U);
              return;
            }
      }
    }
    function B(E) {
      x.value = !1;
    }
    let T = !1;
    function $(E) {
      var F;
      !T && !x.value && !(E.relatedTarget && ((F = g.el) != null && F.contains(E.relatedTarget))) && W(), T = !1;
    }
    function D() {
      T = !0;
    }
    function R(E) {
      if (!g.el) return;
      function F(U) {
        E.preventDefault(), W(U);
      }
      d.value ? E.key === "ArrowRight" ? F(a.value ? "prev" : "next") : E.key === "ArrowLeft" && F(a.value ? "next" : "prev") : E.key === "ArrowDown" ? F("next") : E.key === "ArrowUp" && F("prev"), E.key === "Home" ? F("first") : E.key === "End" && F("last");
    }
    function z(E, F) {
      if (!E) return;
      let U = E;
      do
        U = U == null ? void 0 : U[F === "next" ? "nextElementSibling" : "previousElementSibling"];
      while (U != null && U.hasAttribute("disabled"));
      return U;
    }
    function W(E) {
      if (!g.el) return;
      let F;
      if (!E)
        F = za(g.el)[0];
      else if (E === "next") {
        if (F = z(g.el.querySelector(":focus"), E), !F) return W("first");
      } else if (E === "prev") {
        if (F = z(g.el.querySelector(":focus"), E), !F) return W("last");
      } else E === "first" ? (F = g.el.firstElementChild, F != null && F.hasAttribute("disabled") && (F = z(F, "next"))) : E === "last" && (F = g.el.lastElementChild, F != null && F.hasAttribute("disabled") && (F = z(F, "prev")));
      F && F.focus({
        preventScroll: !0
      });
    }
    function G(E) {
      const F = d.value && a.value ? -1 : 1, U = (E === "prev" ? -F : F) * r.value;
      let be = u.value + U;
      if (d.value && a.value && m.el) {
        const {
          scrollWidth: le,
          offsetWidth: se
        } = m.el;
        be += le - se;
      }
      w(be);
    }
    const te = A(() => ({
      next: o.next,
      prev: o.prev,
      select: o.select,
      isSelected: o.isSelected
    })), ae = A(() => {
      switch (e.showArrows) {
        case "always":
          return !0;
        case "desktop":
          return !i.value;
        case !0:
          return s.value || Math.abs(u.value) > 0;
        case "mobile":
          return i.value || s.value || Math.abs(u.value) > 0;
        default:
          return !i.value && (s.value || Math.abs(u.value) > 0);
      }
    }), re = A(() => Math.abs(u.value) > 1), _ = A(() => {
      if (!m.value) return !1;
      const E = Jl(d.value, m.el), F = Vu(d.value, m.el);
      return E - F - Math.abs(u.value) > 1;
    });
    return ie(() => h(e.tag, {
      class: fe(["v-slide-group", {
        "v-slide-group--vertical": !d.value,
        "v-slide-group--has-affixes": ae.value,
        "v-slide-group--is-overflowing": s.value
      }, l.value, e.class]),
      style: Ve(e.style),
      tabindex: x.value || o.selected.value.length ? -1 : 0,
      onFocus: $
    }, {
      default: () => {
        var E, F, U;
        return [ae.value && C("div", {
          key: "prev",
          class: fe(["v-slide-group__prev", {
            "v-slide-group__prev--disabled": !re.value
          }]),
          onMousedown: D,
          onClick: () => re.value && G("prev")
        }, [((E = t.prev) == null ? void 0 : E.call(t, te.value)) ?? h(Fl, null, {
          default: () => [h(ke, {
            icon: a.value ? e.nextIcon : e.prevIcon
          }, null)]
        })]), C("div", {
          key: "container",
          ref: m,
          class: "v-slide-group__container",
          onScroll: P
        }, [C("div", {
          ref: g,
          class: "v-slide-group__content",
          onFocusin: b,
          onFocusout: B,
          onKeydown: R
        }, [(F = t.default) == null ? void 0 : F.call(t, te.value)])]), ae.value && C("div", {
          key: "next",
          class: fe(["v-slide-group__next", {
            "v-slide-group__next--disabled": !_.value
          }]),
          onMousedown: D,
          onClick: () => _.value && G("next")
        }, [((U = t.next) == null ? void 0 : U.call(t, te.value)) ?? h(Fl, null, {
          default: () => [h(ke, {
            icon: a.value ? e.prevIcon : e.nextIcon
          }, null)]
        })])];
      }
    })), {
      selected: o.selected,
      scrollTo: G,
      scrollOffset: u,
      focus: W,
      hasPrev: re,
      hasNext: _
    };
  }
});
function Cu(e) {
  return e ? e.map((n) => Gi(n) ? n : {
    text: n,
    value: n
  }) : [];
}
const Pu = K({
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
  ...hl({
    mandatory: "force",
    selectedClass: "v-tab-item--selected"
  }),
  ...gt(),
  ...je()
}, "VTabs"), Iu = ne()({
  name: "VTabs",
  props: Pu(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, n) {
    let {
      attrs: t,
      slots: a
    } = n;
    const l = we(e, "modelValue"), i = A(() => Cu(e.items)), {
      densityClasses: o
    } = Et(e), {
      backgroundColorClasses: s,
      backgroundColorStyles: u
    } = ct(() => e.bgColor), {
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
      return C(X, null, [h(Nt, L(c, {
        modelValue: l.value,
        "onUpdate:modelValue": (m) => l.value = m,
        class: ["v-tabs", `v-tabs--${e.direction}`, `v-tabs--align-tabs-${e.alignTabs}`, {
          "v-tabs--fixed-tabs": e.fixedTabs,
          "v-tabs--grow": e.grow,
          "v-tabs--stacked": e.stacked
        }, o.value, s.value, e.class],
        style: [{
          "--v-tabs-height": he(e.height)
        }, u.value, e.style],
        role: "tablist",
        symbol: gl
      }, r, t), {
        default: () => {
          var m;
          return [((m = a.default) == null ? void 0 : m.call(a)) ?? i.value.map((v) => {
            var g;
            return ((g = a.tab) == null ? void 0 : g.call(a, {
              item: v
            })) ?? h(Ga, L(v, {
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
      }), d && h(yl, L({
        modelValue: l.value,
        "onUpdate:modelValue": (m) => l.value = m,
        key: "tabs-window"
      }, r), {
        default: () => {
          var m;
          return [i.value.map((v) => {
            var g;
            return ((g = a.item) == null ? void 0 : g.call(a, {
              item: v
            })) ?? h(ca, {
              value: v.value
            }, {
              default: () => {
                var V;
                return (V = a[`item.${v.value}`]) == null ? void 0 : V.call(a, {
                  item: v
                });
              }
            });
          }), (m = a.window) == null ? void 0 : m.call(a)];
        }
      })]);
    }), {};
  }
}), Au = {
  class: "nav-home",
  href: "/"
};
var ln;
const Tu = /* @__PURE__ */ Me({
  __name: "OxApp",
  props: {
    apiUrl: {},
    logo: {},
    dataEl: { default: (ln = document.body.dataset) == null ? void 0 : ln.appData },
    models: {},
    data: {}
  },
  setup(e) {
    const n = ut(), t = rt(n, "panels."), a = e, l = Qe({ drawer: !0 }), i = Vi(a), o = Ci();
    return Ge(() => {
      o.panel = i.data.panel;
    }), J(() => [i.state.state, i.state.data], () => {
      i.showState = !0;
    }), fi((s, u, r) => {
      i.state.error(`${s}`);
    }), (s, u) => (M(), Y(Es, null, {
      default: O(() => [
        h(du, {
          modelValue: S(i).showState,
          "onUpdate:modelValue": u[0] || (u[0] = (r) => S(i).showState = r),
          color: S(i).state.color,
          "multi-line": ""
        }, {
          default: O(() => [
            Pe(Re(S(i).state.toString()), 1)
          ]),
          _: 1
        }, 8, ["modelValue", "color"]),
        h(Ds, { color: "primary" }, {
          prepend: O(() => [
            S(n)["nav-start"] || S(n)["nav-end"] ? (M(), Y(Wn, {
              key: 0,
              icon: "mdi-apps",
              title: S(oe)("nav.panels"),
              "aria-label": S(oe)("nav.panels"),
              onClick: u[1] || (u[1] = Ie((r) => l.drawer = !l.drawer, ["stop"]))
            }, null, 8, ["title", "aria-label"])) : ue("", !0)
          ]),
          default: O(() => [
            h(Kl, { id: "app-bar-sheet-title" }),
            h(Kl, { id: "app-bar-title" }, {
              default: O(() => [
                j(s.$slots, "title")
              ]),
              _: 3
            }),
            j(s.$slots, "app-bar-left"),
            u[5] || (u[5] = C("div", {
              id: "app-bar-right",
              class: "mr-3"
            }, null, -1)),
            j(s.$slots, "app-bar-right")
          ]),
          _: 3,
          __: [5]
        }),
        S(n)["nav-start"] || S(n)["nav-end"] ? (M(), Y(S(Bs), {
          key: 0,
          drawer: l.drawer,
          "onUpdate:drawer": u[3] || (u[3] = (r) => l.drawer = r),
          items: S(i).data.nav
        }, it({
          prepend: O(() => [
            C("a", Au, [
              s.logo ? (M(), Y($t, {
                key: 0,
                src: s.logo,
                class: "logo"
              }, null, 8, ["src"])) : ue("", !0)
            ]),
            j(s.$slots, "nav-start", { context: S(i) })
          ]),
          _: 2
        }, [
          S(n)["nav-end"] ? {
            name: "append",
            fn: O(() => [
              h(dt, {
                opened: l.opened,
                "onUpdate:opened": u[2] || (u[2] = (r) => l.opened = r)
              }, {
                default: O(() => [
                  j(s.$slots, "nav-end", { context: S(i) })
                ]),
                _: 3
              }, 8, ["opened"])
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["drawer", "items"])) : ue("", !0),
        h(Hs, null, {
          default: O(() => [
            j(s.$slots, "main", {}, () => [
              h(yl, {
                modelValue: S(o).panel,
                "onUpdate:modelValue": u[4] || (u[4] = (r) => S(o).panel = r)
              }, {
                default: O((r) => [
                  j(s.$slots, "default", L(r, { context: S(i) })),
                  (M(!0), me(X, null, Te(S(t), (c, d) => (M(), Y(ca, {
                    key: d,
                    value: c
                  }, {
                    default: O(() => [
                      j(s.$slots, d, L({ ref_for: !0 }, r, { context: S(i) }))
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
}), _u = K({
  text: String,
  onClick: Ze(),
  ...xe(),
  ...Ne()
}, "VLabel"), bl = ne()({
  name: "VLabel",
  props: _u(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    return ie(() => {
      var a;
      return C("label", {
        class: fe(["v-label", {
          "v-label--clickable": !!e.onClick
        }, e.class]),
        style: Ve(e.style),
        onClick: e.onClick
      }, [e.text, (a = t.default) == null ? void 0 : a.call(t)]);
    }), {};
  }
}), no = Symbol.for("vuetify:selection-control-group"), oo = K({
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
    default: st
  },
  ...xe(),
  ...gt(),
  ...Ne()
}, "SelectionControlGroup"), Bu = K({
  ...oo({
    defaultsTarget: "VSelectionControl"
  })
}, "VSelectionControlGroup");
ne()({
  name: "VSelectionControlGroup",
  props: Bu(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = we(e, "modelValue"), l = ft(), i = H(() => e.id || `v-selection-control-group-${l}`), o = H(() => e.name || i.value), s = /* @__PURE__ */ new Set();
    return We(no, {
      modelValue: a,
      forceUpdate: () => {
        s.forEach((u) => u());
      },
      onForceUpdate: (u) => {
        s.add(u), Ue(() => {
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
        name: o,
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
        class: fe(["v-selection-control-group", {
          "v-selection-control-group--inline": e.inline
        }, e.class]),
        style: Ve(e.style),
        role: e.type === "radio" ? "radiogroup" : void 0
      }, [(u = t.default) == null ? void 0 : u.call(t)]);
    }), {};
  }
});
const io = K({
  label: String,
  baseColor: String,
  trueValue: null,
  falseValue: null,
  value: null,
  ...xe(),
  ...oo()
}, "VSelectionControl");
function $u(e) {
  const n = ve(no, void 0), {
    densityClasses: t
  } = Et(e), a = we(e, "modelValue"), l = A(() => e.trueValue !== void 0 ? e.trueValue : e.value !== void 0 ? e.value : !0), i = A(() => e.falseValue !== void 0 ? e.falseValue : !1), o = A(() => !!e.multiple || e.multiple == null && Array.isArray(a.value)), s = A({
    get() {
      const v = n ? n.modelValue.value : a.value;
      return o.value ? He(v).some((g) => e.valueComparator(g, l.value)) : e.valueComparator(v, l.value);
    },
    set(v) {
      if (e.readonly) return;
      const g = v ? l.value : i.value;
      let V = g;
      o.value && (V = v ? [...He(a.value), g] : He(a.value).filter((y) => !e.valueComparator(y, l.value))), n ? n.modelValue.value = V : a.value = V;
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
  } = ct(() => s.value && !e.error && !e.disabled ? e.color : e.baseColor), m = A(() => s.value ? e.trueIcon : e.falseIcon);
  return {
    group: n,
    densityClasses: t,
    trueValue: l,
    falseValue: i,
    model: s,
    textColorClasses: u,
    textColorStyles: r,
    backgroundColorClasses: c,
    backgroundColorStyles: d,
    icon: m
  };
}
const en = ne()({
  name: "VSelectionControl",
  directives: {
    vRipple: It
  },
  inheritAttrs: !1,
  props: io(),
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
      densityClasses: i,
      icon: o,
      model: s,
      textColorClasses: u,
      textColorStyles: r,
      backgroundColorClasses: c,
      backgroundColorStyles: d,
      trueValue: m
    } = $u(e), v = ft(), g = ee(!1), V = ee(!1), y = q(), p = H(() => e.id || `input-${v}`), f = H(() => !e.disabled && !e.readonly);
    l == null || l.onForceUpdate(() => {
      y.value && (y.value.checked = s.value);
    });
    function I(P) {
      f.value && (g.value = !0, At(P.target, ":focus-visible") !== !1 && (V.value = !0));
    }
    function x() {
      g.value = !1, V.value = !1;
    }
    function k(P) {
      P.stopPropagation();
    }
    function w(P) {
      if (!f.value) {
        y.value && (y.value.checked = s.value);
        return;
      }
      e.readonly && l && _e(() => l.forceUpdate()), s.value = P.target.checked;
    }
    return ie(() => {
      var $, D;
      const P = a.label ? a.label({
        label: e.label,
        props: {
          for: p.value
        }
      }) : e.label, [b, B] = xa(t), T = C("input", L({
        ref: y,
        checked: s.value,
        disabled: !!e.disabled,
        id: p.value,
        onBlur: x,
        onFocus: I,
        onInput: w,
        "aria-disabled": !!e.disabled,
        "aria-label": e.label,
        type: e.type,
        value: m.value,
        name: e.name,
        "aria-checked": e.type === "checkbox" ? s.value : void 0
      }, B), null);
      return C("div", L({
        class: ["v-selection-control", {
          "v-selection-control--dirty": s.value,
          "v-selection-control--disabled": e.disabled,
          "v-selection-control--error": e.error,
          "v-selection-control--focused": g.value,
          "v-selection-control--focus-visible": V.value,
          "v-selection-control--inline": e.inline
        }, i.value, e.class]
      }, b, {
        style: e.style
      }), [C("div", {
        class: fe(["v-selection-control__wrapper", u.value]),
        style: Ve(r.value)
      }, [($ = a.default) == null ? void 0 : $.call(a, {
        backgroundColorClasses: c,
        backgroundColorStyles: d
      }), Ke(C("div", {
        class: fe(["v-selection-control__input"])
      }, [((D = a.input) == null ? void 0 : D.call(a, {
        model: s,
        textColorClasses: u,
        textColorStyles: r,
        backgroundColorClasses: c,
        backgroundColorStyles: d,
        inputNode: T,
        icon: o.value,
        props: {
          onFocus: I,
          onBlur: x,
          id: p.value
        }
      })) ?? C(X, null, [o.value && h(ke, {
        key: "icon",
        icon: o.value
      }, null), T])]), [[It, e.ripple && [!e.disabled && !e.readonly, null, ["center", "circle"]]]])]), P && h(bl, {
        for: p.value,
        onClick: k
      }, {
        default: () => [P]
      })]);
    }), {
      isFocused: g,
      input: y
    };
  }
}), so = K({
  indeterminate: Boolean,
  indeterminateIcon: {
    type: Se,
    default: "$checkboxIndeterminate"
  },
  ...io({
    falseIcon: "$checkboxOff",
    trueIcon: "$checkboxOn"
  })
}, "VCheckboxBtn"), St = ne()({
  name: "VCheckboxBtn",
  props: so(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:indeterminate": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = we(e, "indeterminate"), l = we(e, "modelValue");
    function i(u) {
      a.value && (a.value = !1);
    }
    const o = H(() => a.value ? e.indeterminateIcon : e.falseIcon), s = H(() => a.value ? e.indeterminateIcon : e.trueIcon);
    return ie(() => {
      const u = ht(en.filterProps(e), ["modelValue"]);
      return h(en, L(u, {
        modelValue: l.value,
        "onUpdate:modelValue": [(r) => l.value = r, i],
        class: ["v-checkbox-btn", e.class],
        style: e.style,
        type: "checkbox",
        falseIcon: o.value,
        trueIcon: s.value,
        "aria-checked": a.value ? "mixed" : void 0
      }), t);
    }), {};
  }
});
function uo(e) {
  const {
    t: n
  } = ot();
  function t(a) {
    let {
      name: l,
      color: i,
      ...o
    } = a;
    const s = {
      prepend: "prependAction",
      prependInner: "prependAction",
      append: "appendAction",
      appendInner: "appendAction",
      clear: "clear"
    }[l], u = e[`onClick:${l}`];
    function r(d) {
      d.key !== "Enter" && d.key !== " " || (d.preventDefault(), d.stopPropagation(), dl(u, new PointerEvent("click", d)));
    }
    const c = u && s ? n(`$vuetify.input.${s}`, e.label ?? "") : void 0;
    return h(ke, L({
      icon: e[`${l}Icon`],
      "aria-label": c,
      onClick: u,
      onKeydown: r,
      color: i
    }, o), null);
  }
  return {
    InputIcon: t
  };
}
const Eu = K({
  active: Boolean,
  color: String,
  messages: {
    type: [Array, String],
    default: () => []
  },
  ...xe(),
  ...jt({
    transition: {
      component: gn,
      leaveAbsolute: !0,
      group: !0
    }
  })
}, "VMessages"), Ou = ne()({
  name: "VMessages",
  props: Eu(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = A(() => He(e.messages)), {
      textColorClasses: l,
      textColorStyles: i
    } = Gt(() => e.color);
    return ie(() => h(wa, {
      transition: e.transition,
      tag: "div",
      class: fe(["v-messages", l.value, e.class]),
      style: Ve([i.value, e.style])
    }, {
      default: () => [e.active && a.value.map((o, s) => C("div", {
        class: "v-messages__message",
        key: `${s}-${a.value}`
      }, [t.message ? t.message({
        message: o
      }) : o]))]
    })), {};
  }
}), ro = K({
  focused: Boolean,
  "onUpdate:focused": Ze()
}, "focus");
function ka(e) {
  let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : An();
  const t = we(e, "focused"), a = H(() => ({
    [`${n}--focused`]: t.value
  }));
  function l() {
    t.value = !0;
  }
  function i() {
    t.value = !1;
  }
  return {
    focusClasses: a,
    isFocused: t,
    focus: l,
    blur: i
  };
}
const co = Symbol.for("vuetify:form"), Fu = K({
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
function Ru(e) {
  const n = we(e, "modelValue"), t = H(() => e.disabled), a = H(() => e.readonly), l = ee(!1), i = q([]), o = q([]);
  async function s() {
    const c = [];
    let d = !0;
    o.value = [], l.value = !0;
    for (const m of i.value) {
      const v = await m.validate();
      if (v.length > 0 && (d = !1, c.push({
        id: m.id,
        errorMessages: v
      })), !d && e.fastFail) break;
    }
    return o.value = c, l.value = !1, {
      valid: d,
      errors: o.value
    };
  }
  function u() {
    i.value.forEach((c) => c.reset());
  }
  function r() {
    i.value.forEach((c) => c.resetValidation());
  }
  return J(i, () => {
    let c = 0, d = 0;
    const m = [];
    for (const v of i.value)
      v.isValid === !1 ? (d++, m.push({
        id: v.id,
        errorMessages: v.errorMessages
      })) : v.isValid === !0 && c++;
    o.value = m, n.value = d > 0 ? !1 : c === i.value.length ? !0 : null;
  }, {
    deep: !0,
    flush: "post"
  }), We(co, {
    register: (c) => {
      let {
        id: d,
        vm: m,
        validate: v,
        reset: g,
        resetValidation: V
      } = c;
      i.value.some((y) => y.id === d) && Cn(`Duplicate input name "${d}"`), i.value.push({
        id: d,
        validate: v,
        reset: g,
        resetValidation: V,
        vm: mi(m),
        isValid: null,
        errorMessages: []
      });
    },
    unregister: (c) => {
      i.value = i.value.filter((d) => d.id !== c);
    },
    update: (c, d, m) => {
      const v = i.value.find((g) => g.id === c);
      v && (v.isValid = d, v.errorMessages = m);
    },
    isDisabled: t,
    isReadonly: a,
    isValidating: l,
    isValid: n,
    items: i,
    validateOn: H(() => e.validateOn)
  }), {
    errors: o,
    isDisabled: t,
    isReadonly: a,
    isValidating: l,
    isValid: n,
    items: i,
    validate: s,
    reset: u,
    resetValidation: r
  };
}
function pl(e) {
  const n = ve(co, null);
  return {
    ...n,
    isReadonly: A(() => !!((e == null ? void 0 : e.readonly) ?? (n == null ? void 0 : n.isReadonly.value))),
    isDisabled: A(() => !!((e == null ? void 0 : e.disabled) ?? (n == null ? void 0 : n.isDisabled.value)))
  };
}
const Mu = Symbol.for("vuetify:rules");
function Du(e) {
  const n = ve(Mu, null);
  return n ? n(e) : H(e);
}
const Lu = K({
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
  ...ro()
}, "validation");
function Nu(e) {
  let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : An(), t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ft();
  const a = we(e, "modelValue"), l = A(() => e.validationValue === void 0 ? a.value : e.validationValue), i = pl(e), o = Du(() => e.rules), s = q([]), u = ee(!0), r = A(() => !!(He(a.value === "" ? null : a.value).length || He(l.value === "" ? null : l.value).length)), c = A(() => {
    var x;
    return (x = e.errorMessages) != null && x.length ? He(e.errorMessages).concat(s.value).slice(0, Math.max(0, Number(e.maxErrors))) : s.value;
  }), d = A(() => {
    var w;
    let x = (e.validateOn ?? ((w = i.validateOn) == null ? void 0 : w.value)) || "input";
    x === "lazy" && (x = "input lazy"), x === "eager" && (x = "input eager");
    const k = new Set((x == null ? void 0 : x.split(" ")) ?? []);
    return {
      input: k.has("input"),
      blur: k.has("blur") || k.has("input") || k.has("invalid-input"),
      invalidInput: k.has("invalid-input"),
      lazy: k.has("lazy"),
      eager: k.has("eager")
    };
  }), m = A(() => {
    var x;
    return e.error || (x = e.errorMessages) != null && x.length ? !1 : e.rules.length ? u.value ? s.value.length || d.value.lazy ? null : !0 : !s.value.length : !0;
  }), v = ee(!1), g = A(() => ({
    [`${n}--error`]: m.value === !1,
    [`${n}--dirty`]: r.value,
    [`${n}--disabled`]: i.isDisabled.value,
    [`${n}--readonly`]: i.isReadonly.value
  })), V = lt("validation"), y = A(() => e.name ?? S(t));
  gi(() => {
    var x;
    (x = i.register) == null || x.call(i, {
      id: y.value,
      vm: V,
      validate: I,
      reset: p,
      resetValidation: f
    });
  }), mt(() => {
    var x;
    (x = i.unregister) == null || x.call(i, y.value);
  }), Ge(async () => {
    var x;
    d.value.lazy || await I(!d.value.eager), (x = i.update) == null || x.call(i, y.value, m.value, c.value);
  }), Xe(() => d.value.input || d.value.invalidInput && m.value === !1, () => {
    J(l, () => {
      if (l.value != null)
        I();
      else if (e.focused) {
        const x = J(() => e.focused, (k) => {
          k || I(), x();
        });
      }
    });
  }), Xe(() => d.value.blur, () => {
    J(() => e.focused, (x) => {
      x || I();
    });
  }), J([m, c], () => {
    var x;
    (x = i.update) == null || x.call(i, y.value, m.value, c.value);
  });
  async function p() {
    a.value = null, await _e(), await f();
  }
  async function f() {
    u.value = !0, d.value.lazy ? s.value = [] : await I(!d.value.eager);
  }
  async function I() {
    let x = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    const k = [];
    v.value = !0;
    for (const w of o.value) {
      if (k.length >= Number(e.maxErrors ?? 1))
        break;
      const b = await (typeof w == "function" ? w : () => w)(l.value);
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
    isDisabled: i.isDisabled,
    isReadonly: i.isReadonly,
    isPristine: u,
    isValid: m,
    isValidating: v,
    reset: p,
    resetValidation: f,
    validate: I,
    validationClasses: g
  };
}
const Va = K({
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
  ...gt(),
  ...Yi(Ut(), ["maxWidth", "minWidth", "width"]),
  ...Ne(),
  ...Lu()
}, "VInput"), Tt = ne()({
  name: "VInput",
  props: {
    ...Va()
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
      densityClasses: i
    } = Et(e), {
      dimensionStyles: o
    } = Wt(e), {
      themeClasses: s
    } = Ye(e), {
      rtlClasses: u
    } = nt(), {
      InputIcon: r
    } = uo(e), c = ft(), d = A(() => e.id || `input-${c}`), m = A(() => `${d.value}-messages`), {
      errorMessages: v,
      isDirty: g,
      isDisabled: V,
      isReadonly: y,
      isPristine: p,
      isValid: f,
      isValidating: I,
      reset: x,
      resetValidation: k,
      validate: w,
      validationClasses: P
    } = Nu(e, "v-input", d), b = A(() => ({
      id: d,
      messagesId: m,
      isDirty: g,
      isDisabled: V,
      isReadonly: y,
      isPristine: p,
      isValid: f,
      isValidating: I,
      reset: x,
      resetValidation: k,
      validate: w
    })), B = H(() => e.error || e.disabled ? void 0 : e.focused ? e.color : e.baseColor), T = H(() => {
      if (e.iconColor)
        return e.iconColor === !0 ? B.value : e.iconColor;
    }), $ = A(() => {
      var D;
      return (D = e.errorMessages) != null && D.length || !p.value && v.value.length ? v.value : e.hint && (e.persistentHint || e.focused) ? e.hint : e.messages;
    });
    return ie(() => {
      var G, te, ae, re;
      const D = !!(a.prepend || e.prependIcon), R = !!(a.append || e.appendIcon), z = $.value.length > 0, W = !e.hideDetails || e.hideDetails === "auto" && (z || !!a.details);
      return C("div", {
        class: fe(["v-input", `v-input--${e.direction}`, {
          "v-input--center-affix": e.centerAffix,
          "v-input--focused": e.focused,
          "v-input--glow": e.glow,
          "v-input--hide-spin-buttons": e.hideSpinButtons
        }, i.value, s.value, u.value, P.value, e.class]),
        style: Ve([o.value, e.style])
      }, [D && C("div", {
        key: "prepend",
        class: "v-input__prepend"
      }, [(G = a.prepend) == null ? void 0 : G.call(a, b.value), e.prependIcon && h(r, {
        key: "prepend-icon",
        name: "prepend",
        color: T.value
      }, null)]), a.default && C("div", {
        class: "v-input__control"
      }, [(te = a.default) == null ? void 0 : te.call(a, b.value)]), R && C("div", {
        key: "append",
        class: "v-input__append"
      }, [e.appendIcon && h(r, {
        key: "append-icon",
        name: "append",
        color: T.value
      }, null), (ae = a.append) == null ? void 0 : ae.call(a, b.value)]), W && C("div", {
        id: m.value,
        class: "v-input__details",
        role: "alert",
        "aria-live": "polite"
      }, [h(Ou, {
        active: z,
        messages: $.value
      }, {
        message: a.message
      }), (re = a.details) == null ? void 0 : re.call(a, b.value)])]);
    }), {
      reset: x,
      resetValidation: k,
      validate: w,
      isValid: f,
      errorMessages: v
    };
  }
}), Hu = K({
  ...Va(),
  ...ht(so(), ["inline"])
}, "VCheckbox"), zu = ne()({
  name: "VCheckbox",
  inheritAttrs: !1,
  props: Hu(),
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
      isFocused: i,
      focus: o,
      blur: s
    } = ka(e), u = ft();
    return ie(() => {
      const [r, c] = xa(t), d = Tt.filterProps(e), m = St.filterProps(e);
      return h(Tt, L({
        class: ["v-checkbox", e.class]
      }, r, d, {
        modelValue: l.value,
        "onUpdate:modelValue": (v) => l.value = v,
        id: e.id || `checkbox-${u}`,
        focused: i.value,
        style: e.style
      }), {
        ...a,
        default: (v) => {
          let {
            id: g,
            messagesId: V,
            isDisabled: y,
            isReadonly: p,
            isValid: f
          } = v;
          return h(St, L(m, {
            id: g.value,
            "aria-describedby": V.value,
            disabled: y.value,
            readonly: p.value
          }, c, {
            error: f.value === !1,
            modelValue: l.value,
            "onUpdate:modelValue": (I) => l.value = I,
            onFocus: o,
            onBlur: s
          }), a);
        }
      });
    }), {};
  }
}), vo = Symbol.for("vuetify:v-chip-group"), Wu = K({
  baseColor: String,
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: st
  },
  ...hl(),
  ...xe(),
  ...mn({
    selectedClass: "v-chip--selected"
  }),
  ...je(),
  ...Ne(),
  ...Kt({
    variant: "tonal"
  })
}, "VChipGroup");
ne()({
  name: "VChipGroup",
  props: Wu(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const {
      themeClasses: a
    } = Ye(e), {
      isSelected: l,
      select: i,
      next: o,
      prev: s,
      selected: u
    } = nl(e, vo);
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
      return h(Nt, L(r, {
        class: ["v-chip-group", {
          "v-chip-group--column": e.column
        }, a.value, e.class],
        style: e.style
      }), {
        default: () => {
          var c;
          return [(c = t.default) == null ? void 0 : c.call(t, {
            isSelected: l,
            select: i,
            next: o,
            prev: s,
            selected: u.value
          })];
        }
      });
    }), {};
  }
});
const Uu = K({
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
  ...gt(),
  ...Ht(),
  ...ol(),
  ...kt(),
  ...pn(),
  ...bn(),
  ...je({
    tag: "span"
  }),
  ...Ne(),
  ...Kt({
    variant: "tonal"
  })
}, "VChip"), wl = ne()({
  name: "VChip",
  directives: {
    vRipple: It
  },
  props: Uu(),
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
      t: i
    } = ot(), {
      borderClasses: o
    } = ha(e), {
      densityClasses: s
    } = Et(e), {
      elevationClasses: u
    } = ba(e), {
      roundedClasses: r
    } = Bt(e), {
      sizeClasses: c
    } = Mi(e), {
      themeClasses: d
    } = Ye(e), m = we(e, "modelValue"), v = il(e, vo, !1), g = yn(e, t), V = H(() => e.link !== !1 && g.isLink.value), y = A(() => !e.disabled && e.link !== !1 && (!!v || e.link || g.isClickable.value)), p = H(() => ({
      "aria-label": i(e.closeLabel),
      disabled: e.disabled,
      onClick(P) {
        P.preventDefault(), P.stopPropagation(), m.value = !1, a("click:close", P);
      }
    })), {
      colorClasses: f,
      colorStyles: I,
      variantClasses: x
    } = al(() => ({
      color: !v || v.isSelected.value ? e.color ?? e.baseColor : e.baseColor,
      variant: e.variant
    }));
    function k(P) {
      var b;
      a("click", P), y.value && ((b = g.navigate) == null || b.call(g, P), v == null || v.toggle());
    }
    function w(P) {
      (P.key === "Enter" || P.key === " ") && (P.preventDefault(), k(P));
    }
    return () => {
      var z;
      const P = g.isLink.value ? "a" : e.tag, b = !!(e.appendIcon || e.appendAvatar), B = !!(b || l.append), T = !!(l.close || e.closable), $ = !!(l.filter || e.filter) && v, D = !!(e.prependIcon || e.prependAvatar), R = !!(D || l.prepend);
      return m.value && Ke(h(P, L({
        class: ["v-chip", {
          "v-chip--disabled": e.disabled,
          "v-chip--label": e.label,
          "v-chip--link": y.value,
          "v-chip--filter": $,
          "v-chip--pill": e.pill,
          [`${e.activeClass}`]: e.activeClass && ((z = g.isActive) == null ? void 0 : z.value)
        }, d.value, o.value, f.value, s.value, u.value, r.value, c.value, x.value, v == null ? void 0 : v.selectedClass.value, e.class],
        style: [I.value, e.style],
        disabled: e.disabled || void 0,
        draggable: e.draggable,
        tabindex: y.value ? 0 : void 0,
        onClick: k,
        onKeydown: y.value && !V.value && w
      }, g.linkProps), {
        default: () => {
          var W;
          return [ll(y.value, "v-chip"), $ && h(hn, {
            key: "filter"
          }, {
            default: () => [Ke(C("div", {
              class: "v-chip__filter"
            }, [l.filter ? h(De, {
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
          }), R && C("div", {
            key: "prepend",
            class: "v-chip__prepend"
          }, [l.prepend ? h(De, {
            key: "prepend-defaults",
            disabled: !D,
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
          }, null), e.prependAvatar && h(wt, {
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
          })) ?? Re(e.text)]), B && C("div", {
            key: "append",
            class: "v-chip__append"
          }, [l.append ? h(De, {
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
          }, null), e.appendAvatar && h(wt, {
            key: "append-avatar",
            end: !0,
            image: e.appendAvatar
          }, null)])]), T && C("button", L({
            key: "close",
            class: "v-chip__close",
            type: "button",
            "data-testid": "close-chip"
          }, p.value), [l.close ? h(De, {
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
}), ju = K({
  // TODO
  // disableKeys: Boolean,
  id: String,
  submenu: Boolean,
  ...ht(ml({
    closeDelay: 250,
    closeOnContentClick: !0,
    locationStrategy: "connected",
    location: void 0,
    openDelay: 300,
    scrim: !1,
    scrollStrategy: "reposition",
    transition: {
      component: Mn
    }
  }), ["absolute"])
}, "VMenu"), Sl = ne()({
  name: "VMenu",
  props: ju(),
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
      isRtl: i
    } = nt(), o = ft(), s = H(() => e.id || `v-menu-${o}`), u = q(), r = ve(Ka, null), c = ee(/* @__PURE__ */ new Set());
    We(Ka, {
      register() {
        c.value.add(o);
      },
      unregister() {
        c.value.delete(o);
      },
      closeParents(y) {
        setTimeout(() => {
          var p;
          !c.value.size && !e.persistent && (y == null || (p = u.value) != null && p.contentEl && !qi(y, u.value.contentEl)) && (a.value = !1, r == null || r.closeParents());
        }, 40);
      }
    }), mt(() => {
      r == null || r.unregister(), document.removeEventListener("focusin", d);
    }), nn(() => a.value = !1);
    async function d(y) {
      var I, x, k;
      const p = y.relatedTarget, f = y.target;
      await _e(), a.value && p !== f && ((I = u.value) != null && I.contentEl) && // We're the topmost menu
      ((x = u.value) != null && x.globalTop) && // It isn't the document or the menu body
      ![document, u.value.contentEl].includes(f) && // It isn't inside the menu body
      !u.value.contentEl.contains(f) && ((k = za(u.value.contentEl)[0]) == null || k.focus());
    }
    J(a, (y) => {
      y ? (r == null || r.register(), ze && document.addEventListener("focusin", d, {
        once: !0
      })) : (r == null || r.unregister(), ze && document.removeEventListener("focusin", d));
    }, {
      immediate: !0
    });
    function m(y) {
      r == null || r.closeParents(y);
    }
    function v(y) {
      var p, f, I, x, k;
      if (!e.disabled)
        if (y.key === "Tab" || y.key === "Enter" && !e.closeOnContentClick) {
          if (y.key === "Enter" && (y.target instanceof HTMLTextAreaElement || y.target instanceof HTMLInputElement && y.target.closest("form"))) return;
          y.key === "Enter" && y.preventDefault(), Xi(za((p = u.value) == null ? void 0 : p.contentEl, !1), y.shiftKey ? "prev" : "next", (P) => P.tabIndex >= 0) || (a.value = !1, (I = (f = u.value) == null ? void 0 : f.activatorEl) == null || I.focus());
        } else e.submenu && y.key === (i.value ? "ArrowRight" : "ArrowLeft") && (a.value = !1, (k = (x = u.value) == null ? void 0 : x.activatorEl) == null || k.focus());
    }
    function g(y) {
      var f;
      if (e.disabled) return;
      const p = (f = u.value) == null ? void 0 : f.contentEl;
      p && a.value ? y.key === "ArrowDown" ? (y.preventDefault(), y.stopImmediatePropagation(), _a(p, "next")) : y.key === "ArrowUp" ? (y.preventDefault(), y.stopImmediatePropagation(), _a(p, "prev")) : e.submenu && (y.key === (i.value ? "ArrowRight" : "ArrowLeft") ? a.value = !1 : y.key === (i.value ? "ArrowLeft" : "ArrowRight") && (y.preventDefault(), _a(p, "first"))) : (e.submenu ? y.key === (i.value ? "ArrowLeft" : "ArrowRight") : ["ArrowDown", "ArrowUp"].includes(y.key)) && (a.value = !0, y.preventDefault(), setTimeout(() => setTimeout(() => g(y))));
    }
    const V = A(() => L({
      "aria-haspopup": "menu",
      "aria-expanded": String(a.value),
      "aria-controls": s.value,
      onKeydown: g
    }, e.activatorProps));
    return ie(() => {
      const y = ra.filterProps(e);
      return h(ra, L({
        ref: u,
        id: s.value,
        class: ["v-menu", e.class],
        style: e.style
      }, y, {
        modelValue: a.value,
        "onUpdate:modelValue": (p) => a.value = p,
        absolute: !0,
        activatorProps: V.value,
        location: e.location ?? (e.submenu ? "end" : "bottom"),
        "onClick:outside": m,
        onKeydown: v
      }, l), {
        activator: t.activator,
        default: function() {
          for (var p = arguments.length, f = new Array(p), I = 0; I < p; I++)
            f[I] = arguments[I];
          return h(De, {
            root: "VMenu"
          }, {
            default: () => {
              var x;
              return [(x = t.default) == null ? void 0 : x.call(t, ...f)];
            }
          });
        }
      });
    }), bt({
      id: s,
      ΨopenChildren: c
    }, u);
  }
}), Ku = K({
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
      component: gn
    }
  })
}, "VCounter"), fo = ne()({
  name: "VCounter",
  functional: !0,
  props: Ku(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = H(() => e.max ? `${e.value} / ${e.max}` : String(e.value));
    return ie(() => h(wa, {
      transition: e.transition
    }, {
      default: () => [Ke(C("div", {
        class: fe(["v-counter", {
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
}), Gu = K({
  floating: Boolean,
  ...xe()
}, "VFieldLabel"), Jt = ne()({
  name: "VFieldLabel",
  props: Gu(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    return ie(() => h(bl, {
      class: fe(["v-field-label", {
        "v-field-label--floating": e.floating
      }, e.class]),
      style: Ve(e.style),
      "aria-hidden": e.floating || void 0
    }, t)), {};
  }
}), Yu = ["underlined", "outlined", "filled", "solo", "solo-inverted", "solo-filled", "plain"], xl = K({
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
    validator: (e) => Yu.includes(e)
  },
  "onClick:clear": Ze(),
  "onClick:appendInner": Ze(),
  "onClick:prependInner": Ze(),
  ...xe(),
  ...rl(),
  ...kt(),
  ...Ne()
}, "VField"), da = ne()({
  name: "VField",
  inheritAttrs: !1,
  props: {
    id: String,
    ...ro(),
    ...xl()
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
      themeClasses: i
    } = Ye(e), {
      loaderClasses: o
    } = sl(e), {
      focusClasses: s,
      isFocused: u,
      focus: r,
      blur: c
    } = ka(e), {
      InputIcon: d
    } = uo(e), {
      roundedClasses: m
    } = Bt(e), {
      rtlClasses: v
    } = nt(), g = H(() => e.dirty || e.active), V = H(() => !!(e.label || l.label)), y = H(() => !e.singleLine && V.value), p = ft(), f = A(() => e.id || `input-${p}`), I = H(() => `${f.value}-messages`), x = q(), k = q(), w = q(), P = A(() => ["plain", "underlined"].includes(e.variant)), b = A(() => e.error || e.disabled ? void 0 : g.value && u.value ? e.color : e.baseColor), B = A(() => {
      if (!(!e.iconColor || e.glow && !u.value))
        return e.iconColor === !0 ? b.value : e.iconColor;
    }), {
      backgroundColorClasses: T,
      backgroundColorStyles: $
    } = ct(() => e.bgColor), {
      textColorClasses: D,
      textColorStyles: R
    } = Gt(b);
    J(g, (G) => {
      if (y.value) {
        const te = x.value.$el, ae = k.value.$el;
        requestAnimationFrame(() => {
          const re = vl(te), _ = ae.getBoundingClientRect(), E = _.x - re.x, F = _.y - re.y - (re.height / 2 - _.height / 2), U = _.width / 0.75, be = Math.abs(U - re.width) > 1 ? {
            maxWidth: he(U)
          } : void 0, le = getComputedStyle(te), se = getComputedStyle(ae), Z = parseFloat(le.transitionDuration) * 1e3 || 150, ce = parseFloat(se.getPropertyValue("--v-field-label-scale")), ge = se.getPropertyValue("color");
          te.style.visibility = "visible", ae.style.visibility = "hidden", pt(te, {
            transform: `translate(${E}px, ${F}px) scale(${ce})`,
            color: ge,
            ...be
          }, {
            duration: Z,
            easing: Rt,
            direction: G ? "normal" : "reverse"
          }).finished.then(() => {
            te.style.removeProperty("visibility"), ae.style.removeProperty("visibility");
          });
        });
      }
    }, {
      flush: "post"
    });
    const z = A(() => ({
      isActive: g,
      isFocused: u,
      controlRef: w,
      blur: c,
      focus: r
    }));
    function W(G) {
      G.target !== document.activeElement && G.preventDefault();
    }
    return ie(() => {
      var E, F, U;
      const G = e.variant === "outlined", te = !!(l["prepend-inner"] || e.prependInnerIcon), ae = !!(e.clearable || l.clear) && !e.disabled, re = !!(l["append-inner"] || e.appendInnerIcon || ae), _ = () => l.label ? l.label({
        ...z.value,
        label: e.label,
        props: {
          for: f.value
        }
      }) : e.label;
      return C("div", L({
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
        }, i.value, T.value, s.value, o.value, m.value, v.value, e.class],
        style: [$.value, e.style],
        onClick: W
      }, t), [C("div", {
        class: "v-field__overlay"
      }, null), h(ul, {
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
        color: B.value
      }, null), (E = l["prepend-inner"]) == null ? void 0 : E.call(l, z.value)]), C("div", {
        class: "v-field__field",
        "data-no-activator": ""
      }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(e.variant) && y.value && h(Jt, {
        key: "floating-label",
        ref: k,
        class: fe([D.value]),
        floating: !0,
        for: f.value,
        style: Ve(R.value)
      }, {
        default: () => [_()]
      }), V.value && h(Jt, {
        key: "label",
        ref: x,
        for: f.value
      }, {
        default: () => [_()]
      }), ((F = l.default) == null ? void 0 : F.call(l, {
        ...z.value,
        props: {
          id: f.value,
          class: "v-field__input",
          "aria-describedby": I.value
        },
        focus: r,
        blur: c
      })) ?? C("div", {
        id: f.value,
        class: "v-field__input",
        "aria-describedby": I.value
      }, null)]), ae && h(hn, {
        key: "clear"
      }, {
        default: () => [Ke(C("div", {
          class: "v-field__clearable",
          onMousedown: (be) => {
            be.preventDefault(), be.stopPropagation();
          }
        }, [h(De, {
          defaults: {
            VIcon: {
              icon: e.clearIcon
            }
          }
        }, {
          default: () => [l.clear ? l.clear({
            ...z.value,
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
      }, [(U = l["append-inner"]) == null ? void 0 : U.call(l, z.value), e.appendInnerIcon && h(d, {
        key: "append-icon",
        name: "appendInner",
        color: B.value
      }, null)]), C("div", {
        class: fe(["v-field__outline", D.value]),
        style: Ve(R.value)
      }, [G && C(X, null, [C("div", {
        class: "v-field__outline__start"
      }, null), y.value && C("div", {
        class: "v-field__outline__notch"
      }, [h(Jt, {
        ref: k,
        floating: !0,
        for: f.value
      }, {
        default: () => [_()]
      })]), C("div", {
        class: "v-field__outline__end"
      }, null)]), P.value && y.value && h(Jt, {
        ref: k,
        floating: !0,
        for: f.value
      }, {
        default: () => [_()]
      })])]);
    }), {
      controlRef: w,
      fieldIconColor: B
    };
  }
}), qu = ["color", "file", "time", "date", "datetime-local", "week", "month"], kl = K({
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
  ...Va(),
  ...xl()
}, "VTextField"), vt = ne()({
  name: "VTextField",
  directives: {
    vIntersect: na
  },
  inheritAttrs: !1,
  props: kl(),
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
    const i = we(e, "modelValue"), {
      isFocused: o,
      focus: s,
      blur: u
    } = ka(e), r = A(() => typeof e.counterValue == "function" ? e.counterValue(i.value) : typeof e.counterValue == "number" ? e.counterValue : (i.value ?? "").toString().length), c = A(() => {
      if (t.maxlength) return t.maxlength;
      if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string"))
        return e.counter;
    }), d = A(() => ["plain", "underlined"].includes(e.variant));
    function m(w, P) {
      var b, B;
      !e.autofocus || !w || (B = (b = P[0].target) == null ? void 0 : b.focus) == null || B.call(b);
    }
    const v = q(), g = q(), V = q(), y = A(() => qu.includes(e.type) || e.persistentPlaceholder || o.value || e.active);
    function p() {
      o.value || s(), _e(() => {
        var w;
        V.value !== document.activeElement && ((w = V.value) == null || w.focus());
      });
    }
    function f(w) {
      a("mousedown:control", w), w.target !== V.value && (p(), w.preventDefault());
    }
    function I(w) {
      a("click:control", w);
    }
    function x(w, P) {
      w.stopPropagation(), p(), _e(() => {
        i.value = null, P(), dl(e["onClick:clear"], w);
      });
    }
    function k(w) {
      var b;
      const P = w.target;
      if (i.value = P.value, (b = e.modelModifiers) != null && b.trim && ["text", "search", "password", "tel", "url"].includes(e.type)) {
        const B = [P.selectionStart, P.selectionEnd];
        _e(() => {
          P.selectionStart = B[0], P.selectionEnd = B[1];
        });
      }
    }
    return ie(() => {
      const w = !!(l.counter || e.counter !== !1 && e.counter != null), P = !!(w || l.details), [b, B] = xa(t), {
        modelValue: T,
        ...$
      } = Tt.filterProps(e), D = da.filterProps(e);
      return h(Tt, L({
        ref: v,
        modelValue: i.value,
        "onUpdate:modelValue": (R) => i.value = R,
        class: ["v-text-field", {
          "v-text-field--prefixed": e.prefix,
          "v-text-field--suffixed": e.suffix,
          "v-input--plain-underlined": d.value
        }, e.class],
        style: e.style
      }, b, $, {
        centerAffix: !d.value,
        focused: o.value
      }), {
        ...l,
        default: (R) => {
          let {
            id: z,
            isDisabled: W,
            isDirty: G,
            isReadonly: te,
            isValid: ae,
            reset: re
          } = R;
          return h(da, L({
            ref: g,
            onMousedown: f,
            onClick: I,
            "onClick:clear": (_) => x(_, re),
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"],
            role: e.role
          }, D, {
            id: z.value,
            active: y.value || G.value,
            dirty: G.value || e.dirty,
            disabled: W.value,
            focused: o.value,
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
              const U = Ke(C("input", L({
                ref: V,
                value: i.value,
                onInput: k,
                autofocus: e.autofocus,
                readonly: te.value,
                disabled: W.value,
                name: e.name,
                placeholder: e.placeholder,
                size: 1,
                type: e.type,
                onFocus: p,
                onBlur: u
              }, F, B), null), [[na, {
                handler: m
              }, null, {
                once: !0
              }]]);
              return C(X, null, [e.prefix && C("span", {
                class: "v-text-field__prefix"
              }, [C("span", {
                class: "v-text-field__prefix__text"
              }, [e.prefix])]), l.default ? C("div", {
                class: fe(E),
                "data-no-activator": ""
              }, [l.default(), U]) : yi(U, {
                class: E
              }), e.suffix && C("span", {
                class: "v-text-field__suffix"
              }, [C("span", {
                class: "v-text-field__suffix__text"
              }, [e.suffix])])]);
            }
          });
        },
        details: P ? (R) => {
          var z;
          return C(X, null, [(z = l.details) == null ? void 0 : z.call(l, R), w && C(X, null, [C("span", null, null), h(fo, {
            active: e.persistentCounter || o.value,
            value: r.value,
            max: c.value,
            disabled: e.disabled
          }, l.counter)])]);
        } : void 0
      });
    }), bt({}, v, g, V);
  }
}), Xu = K({
  renderless: Boolean,
  ...xe()
}, "VVirtualScrollItem"), Zu = ne()({
  name: "VVirtualScrollItem",
  inheritAttrs: !1,
  props: Xu(),
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
      resizeRef: i,
      contentRect: o
    } = Pt(void 0, "border");
    J(() => {
      var s;
      return (s = o.value) == null ? void 0 : s.height;
    }, (s) => {
      s != null && a("update:height", s);
    }), ie(() => {
      var s, u;
      return e.renderless ? C(X, null, [(s = l.default) == null ? void 0 : s.call(l, {
        itemRef: i
      })]) : C("div", L({
        ref: i,
        class: ["v-virtual-scroll__item", e.class],
        style: e.style
      }, t), [(u = l.default) == null ? void 0 : u.call(l)]);
    });
  }
}), Qu = -1, Ju = 1, Ma = 100, er = K({
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
function tr(e, n) {
  const t = yt(), a = ee(0);
  et(() => {
    a.value = parseFloat(e.itemHeight || 0);
  });
  const l = ee(0), i = ee(Math.ceil(
    // Assume 16px items filling the entire screen height if
    // not provided. This is probably incorrect but it minimises
    // the chance of ending up with empty space at the bottom.
    // The default value is set here to avoid poisoning getSize()
    (parseInt(e.height) || t.height.value) / (a.value || 16)
  ) || 1), o = ee(0), s = ee(0), u = q(), r = q();
  let c = 0;
  const {
    resizeRef: d,
    contentRect: m
  } = Pt();
  et(() => {
    d.value = u.value;
  });
  const v = A(() => {
    var _;
    return u.value === document.documentElement ? t.height.value : ((_ = m.value) == null ? void 0 : _.height) || parseInt(e.height) || 0;
  }), g = A(() => !!(u.value && r.value && v.value && a.value));
  let V = Array.from({
    length: n.value.length
  }), y = Array.from({
    length: n.value.length
  });
  const p = ee(0);
  let f = -1;
  function I(_) {
    return V[_] || a.value;
  }
  const x = Zi(() => {
    const _ = performance.now();
    y[0] = 0;
    const E = n.value.length;
    for (let F = 1; F <= E - 1; F++)
      y[F] = (y[F - 1] || 0) + I(F - 1);
    p.value = Math.max(p.value, performance.now() - _);
  }, p), k = J(g, (_) => {
    _ && (k(), c = r.value.offsetTop, x.immediate(), G(), ~f && _e(() => {
      ze && window.requestAnimationFrame(() => {
        ae(f), f = -1;
      });
    }));
  });
  Ue(() => {
    x.clear();
  });
  function w(_, E) {
    const F = V[_], U = a.value;
    a.value = U ? Math.min(a.value, E) : E, (F !== E || U !== a.value) && (V[_] = E, x());
  }
  function P(_) {
    return _ = Je(_, 0, n.value.length - 1), y[_] || 0;
  }
  function b(_) {
    return ar(y, _);
  }
  let B = 0, T = 0, $ = 0;
  J(v, (_, E) => {
    E && (G(), _ < E && requestAnimationFrame(() => {
      T = 0, G();
    }));
  });
  let D = -1;
  function R() {
    if (!u.value || !r.value) return;
    const _ = u.value.scrollTop, E = performance.now();
    E - $ > 500 ? (T = Math.sign(_ - B), c = r.value.offsetTop) : T = _ - B, B = _, $ = E, window.clearTimeout(D), D = window.setTimeout(z, 500), G();
  }
  function z() {
    !u.value || !r.value || (T = 0, $ = 0, window.clearTimeout(D), G());
  }
  let W = -1;
  function G() {
    cancelAnimationFrame(W), W = requestAnimationFrame(te);
  }
  function te() {
    if (!u.value || !v.value) return;
    const _ = B - c, E = Math.sign(T), F = Math.max(0, _ - Ma), U = Je(b(F), 0, n.value.length), be = _ + v.value + Ma, le = Je(b(be) + 1, U + 1, n.value.length);
    if (
      // Only update the side we're scrolling towards,
      // the other side will be updated incidentally
      (E !== Qu || U < l.value) && (E !== Ju || le > i.value)
    ) {
      const se = P(l.value) - P(U), Z = P(le) - P(i.value);
      Math.max(se, Z) > Ma ? (l.value = U, i.value = le) : (U <= 0 && (l.value = U), le >= n.value.length && (i.value = le));
    }
    o.value = P(l.value), s.value = P(n.value.length) - P(i.value);
  }
  function ae(_) {
    const E = P(_);
    !u.value || _ && !E ? f = _ : u.value.scrollTop = E;
  }
  const re = A(() => n.value.slice(l.value, i.value).map((_, E) => {
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
    }), x.immediate(), G();
  }, {
    deep: 1
  }), {
    calculateVisibleItems: G,
    containerRef: u,
    markerRef: r,
    computedItems: re,
    paddingTop: o,
    paddingBottom: s,
    scrollToIndex: ae,
    handleScroll: R,
    handleScrollend: z,
    handleItemResize: w
  };
}
function ar(e, n) {
  let t = e.length - 1, a = 0, l = 0, i = null, o = -1;
  if (e[t] < n)
    return t;
  for (; a <= t; )
    if (l = a + t >> 1, i = e[l], i > n)
      t = l - 1;
    else if (i < n)
      o = l, a = l + 1;
    else return i === n ? l : a;
  return o;
}
const lr = K({
  items: {
    type: Array,
    default: () => []
  },
  renderless: Boolean,
  ...er(),
  ...xe(),
  ...Ut()
}, "VVirtualScroll"), mo = ne()({
  name: "VVirtualScroll",
  props: lr(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = lt("VVirtualScroll"), {
      dimensionStyles: l
    } = Wt(e), {
      calculateVisibleItems: i,
      containerRef: o,
      markerRef: s,
      handleScroll: u,
      handleScrollend: r,
      handleItemResize: c,
      scrollToIndex: d,
      paddingTop: m,
      paddingBottom: v,
      computedItems: g
    } = tr(e, H(() => e.items));
    return Xe(() => e.renderless, () => {
      function V() {
        var f, I;
        const p = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1) ? "addEventListener" : "removeEventListener";
        o.value === document.documentElement ? (document[p]("scroll", u, {
          passive: !0
        }), document[p]("scrollend", r)) : ((f = o.value) == null || f[p]("scroll", u, {
          passive: !0
        }), (I = o.value) == null || I[p]("scrollend", r));
      }
      Ge(() => {
        o.value = $n(a.vnode.el, !0), V(!0);
      }), Ue(V);
    }), ie(() => {
      const V = g.value.map((y) => h(Zu, {
        key: y.key,
        renderless: e.renderless,
        "onUpdate:height": (p) => c(y.index, p)
      }, {
        default: (p) => {
          var f;
          return (f = t.default) == null ? void 0 : f.call(t, {
            item: y.raw,
            index: y.index,
            ...p
          });
        }
      }));
      return e.renderless ? C(X, null, [C("div", {
        ref: s,
        class: "v-virtual-scroll__spacer",
        style: {
          paddingTop: he(m.value)
        }
      }, null), V, C("div", {
        class: "v-virtual-scroll__spacer",
        style: {
          paddingBottom: he(v.value)
        }
      }, null)]) : C("div", {
        ref: o,
        class: fe(["v-virtual-scroll", e.class]),
        onScrollPassive: u,
        onScrollend: r,
        style: Ve([l.value, e.style])
      }, [C("div", {
        ref: s,
        class: "v-virtual-scroll__container",
        style: {
          paddingTop: he(m.value),
          paddingBottom: he(v.value)
        }
      }, [V])]);
    }), {
      calculateVisibleItems: i,
      scrollToIndex: d
    };
  }
});
function go(e, n) {
  const t = ee(!1);
  let a;
  function l(s) {
    cancelAnimationFrame(a), t.value = !0, a = requestAnimationFrame(() => {
      a = requestAnimationFrame(() => {
        t.value = !1;
      });
    });
  }
  async function i() {
    await new Promise((s) => requestAnimationFrame(s)), await new Promise((s) => requestAnimationFrame(s)), await new Promise((s) => requestAnimationFrame(s)), await new Promise((s) => {
      if (t.value) {
        const u = J(t, () => {
          u(), s();
        });
      } else s();
    });
  }
  async function o(s) {
    var c, d;
    if (s.key === "Tab" && ((c = n.value) == null || c.focus()), !["PageDown", "PageUp", "Home", "End"].includes(s.key)) return;
    const u = (d = e.value) == null ? void 0 : d.$el;
    if (!u) return;
    (s.key === "Home" || s.key === "End") && u.scrollTo({
      top: s.key === "Home" ? 0 : u.scrollHeight,
      behavior: "smooth"
    }), await i();
    const r = u.querySelectorAll(":scope > :not(.v-virtual-scroll__spacer)");
    if (s.key === "PageDown" || s.key === "Home") {
      const m = u.getBoundingClientRect().top;
      for (const v of r)
        if (v.getBoundingClientRect().top >= m) {
          v.focus();
          break;
        }
    } else {
      const m = u.getBoundingClientRect().bottom;
      for (const v of [...r].reverse())
        if (v.getBoundingClientRect().bottom <= m) {
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
const yo = K({
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
  ...Di({
    itemChildren: !1
  })
}, "Select"), nr = K({
  ...yo(),
  ...ht(kl({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...jt({
    transition: {
      component: Mn
    }
  })
}, "VSelect"), Vl = ne()({
  name: "VSelect",
  props: nr(),
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
    } = ot(), l = q(), i = q(), o = q(), {
      items: s,
      transformIn: u,
      transformOut: r
    } = wn(e), c = we(e, "modelValue", [], (_) => u(_ === null ? [null] : He(_)), (_) => {
      const E = r(_);
      return e.multiple ? E : E[0] ?? null;
    }), d = A(() => typeof e.counterValue == "function" ? e.counterValue(c.value) : typeof e.counterValue == "number" ? e.counterValue : c.value.length), m = pl(e), v = A(() => c.value.map((_) => _.value)), g = ee(!1);
    let V = "", y = -1, p;
    const f = A(() => e.hideSelected ? s.value.filter((_) => !c.value.some((E) => (e.valueComparator || st)(E, _))) : s.value), I = A(() => e.hideNoData && !f.value.length || m.isReadonly.value || m.isDisabled.value), x = we(e, "menu"), k = A({
      get: () => x.value,
      set: (_) => {
        var E;
        x.value && !_ && ((E = i.value) != null && E.ΨopenChildren.size) || _ && I.value || (x.value = _);
      }
    }), w = H(() => k.value ? e.closeText : e.openText), P = A(() => {
      var _;
      return {
        ...e.menuProps,
        activatorProps: {
          ...((_ = e.menuProps) == null ? void 0 : _.activatorProps) || {},
          "aria-haspopup": "listbox"
          // Set aria-haspopup to 'listbox'
        }
      };
    }), b = q(), B = go(b, l);
    function T(_) {
      e.openOnClear && (k.value = !0);
    }
    function $() {
      I.value || (k.value = !k.value);
    }
    function D(_) {
      oa(_) && R(_);
    }
    function R(_) {
      var ge, N, Q;
      if (!_.key || m.isReadonly.value) return;
      ["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(_.key) && _.preventDefault(), ["Enter", "ArrowDown", " "].includes(_.key) && (k.value = !0), ["Escape", "Tab"].includes(_.key) && (k.value = !1), _.key === "Home" ? (ge = b.value) == null || ge.focus("first") : _.key === "End" && ((N = b.value) == null || N.focus("last"));
      const E = 1e3;
      if (!oa(_)) return;
      const F = performance.now();
      F - p > E && (V = "", y = -1), V += _.key.toLowerCase(), p = F;
      const U = f.value;
      function be() {
        let de = le();
        return de || V.at(-1) === V.at(-2) && (V = V.slice(0, -1), de = le(), de) || (y = -1, de = le(), de) ? de : (V = _.key.toLowerCase(), le());
      }
      function le() {
        for (let de = y + 1; de < U.length; de++) {
          const ye = U[de];
          if (ye.title.toLowerCase().startsWith(V))
            return [ye, de];
        }
      }
      const se = be();
      if (!se) return;
      const [Z, ce] = se;
      y = ce, (Q = b.value) == null || Q.focus(ce), e.multiple || (c.value = [Z]);
    }
    function z(_) {
      let E = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!_.props.disabled)
        if (e.multiple) {
          const F = c.value.findIndex((be) => (e.valueComparator || st)(be.value, _.value)), U = E ?? !~F;
          if (~F) {
            const be = U ? [...c.value, _] : [...c.value];
            be.splice(F, 1), c.value = be;
          } else U && (c.value = [...c.value, _]);
        } else {
          const F = E !== !1;
          c.value = F ? [_] : [], _e(() => {
            k.value = !1;
          });
        }
    }
    function W(_) {
      var E;
      (E = b.value) != null && E.$el.contains(_.relatedTarget) || (k.value = !1);
    }
    function G() {
      var _;
      e.eager && ((_ = o.value) == null || _.calculateVisibleItems());
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
        E && z(E);
      } else l.value && (l.value.value = "");
    }
    return J(k, () => {
      if (!e.hideSelected && k.value && c.value.length) {
        const _ = f.value.findIndex((E) => c.value.some((F) => (e.valueComparator || st)(F.value, E.value)));
        ze && window.requestAnimationFrame(() => {
          var E;
          _ >= 0 && ((E = o.value) == null || E.scrollToIndex(_));
        });
      }
    }), J(() => e.items, (_, E) => {
      k.value || g.value && !E.length && _.length && (k.value = !0);
    }), ie(() => {
      const _ = !!(e.chips || t.chip), E = !!(!e.hideNoData || f.value.length || t["prepend-item"] || t["append-item"] || t["no-data"]), F = c.value.length > 0, U = vt.filterProps(e), be = F || !g.value && e.label && !e.persistentPlaceholder ? void 0 : e.placeholder;
      return h(vt, L({
        ref: l
      }, U, {
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
        "onMousedown:control": $,
        onBlur: W,
        onKeydown: R,
        "aria-label": a(w.value),
        title: a(w.value)
      }), {
        ...t,
        default: () => C(X, null, [h(Sl, L({
          ref: i,
          modelValue: k.value,
          "onUpdate:modelValue": (le) => k.value = le,
          activator: "parent",
          contentClass: "v-select__content",
          disabled: I.value,
          eager: e.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: e.transition,
          onAfterEnter: G,
          onAfterLeave: te
        }, P.value), {
          default: () => [E && h(dt, L({
            ref: b,
            selected: v.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: (le) => le.preventDefault(),
            onKeydown: D,
            onFocusin: ae,
            tabindex: "-1",
            "aria-live": "polite",
            "aria-label": `${e.label}-list`,
            color: e.itemColor ?? e.color
          }, B, e.listProps), {
            default: () => {
              var le, se, Z;
              return [(le = t["prepend-item"]) == null ? void 0 : le.call(t), !f.value.length && !e.hideNoData && (((se = t["no-data"]) == null ? void 0 : se.call(t)) ?? h(qe, {
                key: "no-data",
                title: a(e.noDataText)
              }, null)), h(mo, {
                ref: o,
                renderless: !0,
                items: f.value,
                itemKey: "value"
              }, {
                default: (ce) => {
                  var Ce;
                  let {
                    item: ge,
                    index: N,
                    itemRef: Q
                  } = ce;
                  const de = Qi(ge.props), ye = L(ge.props, {
                    ref: Q,
                    key: ge.value,
                    onClick: () => z(ge, null)
                  });
                  return ((Ce = t.item) == null ? void 0 : Ce.call(t, {
                    item: ge,
                    index: N,
                    props: ye
                  })) ?? h(qe, L(ye, {
                    role: "option"
                  }), {
                    prepend: (Ee) => {
                      let {
                        isSelected: Le
                      } = Ee;
                      return C(X, null, [e.multiple && !e.hideSelected ? h(St, {
                        key: ge.value,
                        modelValue: Le,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, de.prependAvatar && h(wt, {
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
        }), c.value.map((le, se) => {
          function Z(Q) {
            Q.stopPropagation(), Q.preventDefault(), z(le, !1);
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
          }, ge = _ ? !!t.chip : !!t.selection, N = ge ? Tn(_ ? t.chip({
            item: le,
            index: se,
            props: ce
          }) : t.selection({
            item: le,
            index: se
          })) : void 0;
          if (!(ge && !N))
            return C("div", {
              key: le.value,
              class: "v-select__selection"
            }, [_ ? t.chip ? h(De, {
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
            }) : h(wl, L({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: le.title,
              disabled: le.props.disabled
            }, ce), null) : N ?? C("span", {
              class: "v-select__selection-text"
            }, [le.title, e.multiple && se < c.value.length - 1 && C("span", {
              class: "v-select__selection-comma"
            }, [Pe(",")])])]);
        })]),
        "append-inner": function() {
          var ce, ge;
          for (var le = arguments.length, se = new Array(le), Z = 0; Z < le; Z++)
            se[Z] = arguments[Z];
          return C(X, null, [(ce = t["append-inner"]) == null ? void 0 : ce.call(t, ...se), e.menuIcon ? h(ke, {
            class: "v-select__menu-icon",
            color: (ge = l.value) == null ? void 0 : ge.fieldIconColor,
            icon: e.menuIcon
          }, null) : void 0]);
        }
      });
    }), bt({
      isFocused: g,
      menu: k,
      select: z
    }, l);
  }
}), or = (e, n, t) => {
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
const ho = K({
  customFilter: Function,
  customKeyFilter: Object,
  filterKeys: [Array, String],
  filterMode: {
    type: String,
    default: "intersection"
  },
  noFilter: Boolean
}, "filter");
function ir(e, n, t) {
  var s;
  const a = [], l = (t == null ? void 0 : t.default) ?? or, i = t != null && t.filterKeys ? He(t.filterKeys) : !1, o = Object.keys((t == null ? void 0 : t.customKeyFilter) ?? {}).length;
  if (!(e != null && e.length)) return a;
  e: for (let u = 0; u < e.length; u++) {
    const [r, c = r] = He(e[u]), d = {}, m = {};
    let v = -1;
    if ((n || o > 0) && !(t != null && t.noFilter)) {
      if (typeof r == "object") {
        const y = i || Object.keys(c);
        for (const p of y) {
          const f = Ct(c, p), I = (s = t == null ? void 0 : t.customKeyFilter) == null ? void 0 : s[p];
          if (v = I ? I(f, n, r) : l(f, n, r), v !== -1 && v !== !1)
            I ? d[p] = Da(v, n) : m[p] = Da(v, n);
          else if ((t == null ? void 0 : t.filterMode) === "every")
            continue e;
        }
      } else
        v = l(r, n, r), v !== -1 && v !== !1 && (m.title = Da(v, n));
      const g = Object.keys(m).length, V = Object.keys(d).length;
      if (!g && !V || (t == null ? void 0 : t.filterMode) === "union" && V !== o && !g || (t == null ? void 0 : t.filterMode) === "intersection" && (V !== o || !g)) continue;
    }
    a.push({
      index: u,
      matches: {
        ...m,
        ...d
      }
    });
  }
  return a;
}
function bo(e, n, t, a) {
  const l = ee([]), i = ee(/* @__PURE__ */ new Map()), o = A(() => a != null && a.transform ? S(n).map((u) => [u, a.transform(u)]) : S(n));
  et(() => {
    const u = typeof t == "function" ? t() : S(t), r = typeof u != "string" && typeof u != "number" ? "" : String(u), c = ir(o.value, r, {
      customKeyFilter: {
        ...e.customKeyFilter,
        ...S(a == null ? void 0 : a.customKeyFilter)
      },
      default: e.customFilter,
      filterKeys: e.filterKeys,
      filterMode: e.filterMode,
      noFilter: e.noFilter
    }), d = S(n), m = [], v = /* @__PURE__ */ new Map();
    c.forEach((g) => {
      let {
        index: V,
        matches: y
      } = g;
      const p = d[V];
      m.push(p), v.set(p.value, y);
    }), l.value = m, i.value = v;
  });
  function s(u) {
    return i.value.get(u.value);
  }
  return {
    filteredItems: l,
    filteredMatches: i,
    getMatches: s
  };
}
function sr(e, n, t) {
  return t == null || !t.length ? n : t.map((a, l) => {
    const i = l === 0 ? 0 : t[l - 1][1], o = [C("span", {
      class: fe(`${e}__unmask`)
    }, [n.slice(i, a[0])]), C("span", {
      class: fe(`${e}__mask`)
    }, [n.slice(a[0], a[1])])];
    return l === t.length - 1 && o.push(C("span", {
      class: fe(`${e}__unmask`)
    }, [n.slice(a[1])])), C(X, null, [o]);
  });
}
const ur = K({
  autoSelectFirst: {
    type: [Boolean, String]
  },
  clearOnSelect: Boolean,
  search: String,
  ...ho({
    filterKeys: ["title"]
  }),
  ...yo(),
  ...ht(kl({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...jt({
    transition: !1
  })
}, "VAutocomplete"), rr = ne()({
  name: "VAutocomplete",
  props: ur(),
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
    } = ot(), l = q(), i = ee(!1), o = ee(!0), s = ee(!1), u = q(), r = q(), c = ee(-1), {
      items: d,
      transformIn: m,
      transformOut: v
    } = wn(e), {
      textColorClasses: g,
      textColorStyles: V
    } = Gt(() => {
      var N;
      return (N = l.value) == null ? void 0 : N.color;
    }), y = we(e, "search", ""), p = we(e, "modelValue", [], (N) => m(N === null ? [null] : He(N)), (N) => {
      const Q = v(N);
      return e.multiple ? Q : Q[0] ?? null;
    }), f = A(() => typeof e.counterValue == "function" ? e.counterValue(p.value) : typeof e.counterValue == "number" ? e.counterValue : p.value.length), I = pl(e), {
      filteredItems: x,
      getMatches: k
    } = bo(e, d, () => o.value ? "" : y.value), w = A(() => e.hideSelected ? x.value.filter((N) => !p.value.some((Q) => Q.value === N.value)) : x.value), P = A(() => !!(e.chips || t.chip)), b = A(() => P.value || !!t.selection), B = A(() => p.value.map((N) => N.props.value)), T = A(() => {
      var Q;
      return (e.autoSelectFirst === !0 || e.autoSelectFirst === "exact" && y.value === ((Q = w.value[0]) == null ? void 0 : Q.title)) && w.value.length > 0 && !o.value && !s.value;
    }), $ = A(() => e.hideNoData && !w.value.length || I.isReadonly.value || I.isDisabled.value), D = we(e, "menu"), R = A({
      get: () => D.value,
      set: (N) => {
        var Q;
        D.value && !N && ((Q = u.value) != null && Q.ΨopenChildren.size) || N && $.value || (D.value = N);
      }
    }), z = A(() => R.value ? e.closeText : e.openText), W = q(), G = go(W, l);
    function te(N) {
      e.openOnClear && (R.value = !0), y.value = "";
    }
    function ae() {
      $.value || (R.value = !0);
    }
    function re(N) {
      $.value || (i.value && (N.preventDefault(), N.stopPropagation()), R.value = !R.value);
    }
    function _(N) {
      var Q;
      N.key !== " " && oa(N) && ((Q = l.value) == null || Q.focus());
    }
    function E(N) {
      var ye, Ce, Ee, Le, Ae;
      if (I.isReadonly.value) return;
      const Q = (ye = l.value) == null ? void 0 : ye.selectionStart, de = p.value.length;
      if (["Enter", "ArrowDown", "ArrowUp"].includes(N.key) && N.preventDefault(), ["Enter", "ArrowDown"].includes(N.key) && (R.value = !0), ["Escape"].includes(N.key) && (R.value = !1), T.value && ["Enter", "Tab"].includes(N.key) && !p.value.some((Fe) => {
        let {
          value: Oe
        } = Fe;
        return Oe === w.value[0].value;
      }) && ge(w.value[0]), N.key === "ArrowDown" && T.value && ((Ce = W.value) == null || Ce.focus("next")), ["Backspace", "Delete"].includes(N.key)) {
        if (!e.multiple && b.value && p.value.length > 0 && !y.value) return ge(p.value[0], !1);
        if (~c.value) {
          N.preventDefault();
          const Fe = c.value;
          ge(p.value[c.value], !1), c.value = Fe >= de - 1 ? de - 2 : Fe;
        } else N.key === "Backspace" && !y.value && (c.value = de - 1);
        return;
      }
      if (e.multiple)
        if (N.key === "ArrowLeft") {
          if (c.value < 0 && Q && Q > 0) return;
          const Fe = c.value > -1 ? c.value - 1 : de - 1;
          if (p.value[Fe])
            c.value = Fe;
          else {
            const Oe = ((Ee = y.value) == null ? void 0 : Ee.length) ?? null;
            c.value = -1, (Le = l.value) == null || Le.setSelectionRange(Oe, Oe);
          }
        } else if (N.key === "ArrowRight") {
          if (c.value < 0) return;
          const Fe = c.value + 1;
          p.value[Fe] ? c.value = Fe : (c.value = -1, (Ae = l.value) == null || Ae.setSelectionRange(0, 0));
        } else ~c.value && oa(N) && (c.value = -1);
    }
    function F(N) {
      if (At(l.value, ":autofill") || At(l.value, ":-webkit-autofill")) {
        const Q = d.value.find((de) => de.title === N.target.value);
        Q && ge(Q);
      }
    }
    function U() {
      var N;
      e.eager && ((N = r.value) == null || N.calculateVisibleItems());
    }
    function be() {
      var N;
      i.value && (o.value = !0, (N = l.value) == null || N.focus());
    }
    function le(N) {
      i.value = !0, setTimeout(() => {
        s.value = !0;
      });
    }
    function se(N) {
      s.value = !1;
    }
    function Z(N) {
      (N == null || N === "" && !e.multiple && !b.value) && (p.value = []);
    }
    const ce = ee(!1);
    function ge(N) {
      let Q = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!(!N || N.props.disabled))
        if (e.multiple) {
          const de = p.value.findIndex((Ce) => (e.valueComparator || st)(Ce.value, N.value)), ye = Q ?? !~de;
          if (~de) {
            const Ce = ye ? [...p.value, N] : [...p.value];
            Ce.splice(de, 1), p.value = Ce;
          } else ye && (p.value = [...p.value, N]);
          e.clearOnSelect && (y.value = "");
        } else {
          const de = Q !== !1;
          p.value = de ? [N] : [], y.value = de && !b.value ? N.title : "", _e(() => {
            R.value = !1, o.value = !0;
          });
        }
    }
    return J(i, (N, Q) => {
      var de;
      N !== Q && (N ? (ce.value = !0, y.value = e.multiple || b.value ? "" : String(((de = p.value.at(-1)) == null ? void 0 : de.props.title) ?? ""), o.value = !0, _e(() => ce.value = !1)) : (!e.multiple && y.value == null && (p.value = []), R.value = !1, (e.multiple || b.value) && (y.value = ""), c.value = -1));
    }), J(y, (N) => {
      !i.value || ce.value || (N && (R.value = !0), o.value = !N);
    }), J(R, () => {
      if (!e.hideSelected && R.value && p.value.length) {
        const N = w.value.findIndex((Q) => p.value.some((de) => Q.value === de.value));
        ze && window.requestAnimationFrame(() => {
          var Q;
          N >= 0 && ((Q = r.value) == null || Q.scrollToIndex(N));
        });
      }
    }), J(() => e.items, (N, Q) => {
      R.value || i.value && !Q.length && N.length && (R.value = !0);
    }), ie(() => {
      const N = !!(!e.hideNoData || w.value.length || t["prepend-item"] || t["append-item"] || t["no-data"]), Q = p.value.length > 0, de = vt.filterProps(e);
      return h(vt, L({
        ref: l
      }, de, {
        modelValue: y.value,
        "onUpdate:modelValue": [(ye) => y.value = ye, Z],
        focused: i.value,
        "onUpdate:focused": (ye) => i.value = ye,
        validationValue: p.externalValue,
        counterValue: f.value,
        dirty: Q,
        onChange: F,
        class: ["v-autocomplete", `v-autocomplete--${e.multiple ? "multiple" : "single"}`, {
          "v-autocomplete--active-menu": R.value,
          "v-autocomplete--chips": !!e.chips,
          "v-autocomplete--selection-slot": !!b.value,
          "v-autocomplete--selecting-index": c.value > -1
        }, e.class],
        style: e.style,
        readonly: I.isReadonly.value,
        placeholder: Q ? void 0 : e.placeholder,
        "onClick:clear": te,
        "onMousedown:control": ae,
        onKeydown: E
      }), {
        ...t,
        default: () => C(X, null, [h(Sl, L({
          ref: u,
          modelValue: R.value,
          "onUpdate:modelValue": (ye) => R.value = ye,
          activator: "parent",
          contentClass: "v-autocomplete__content",
          disabled: $.value,
          eager: e.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: e.transition,
          onAfterEnter: U,
          onAfterLeave: be
        }, e.menuProps), {
          default: () => [N && h(dt, L({
            ref: W,
            selected: B.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: (ye) => ye.preventDefault(),
            onKeydown: _,
            onFocusin: le,
            onFocusout: se,
            tabindex: "-1",
            "aria-live": "polite",
            color: e.itemColor ?? e.color
          }, G, e.listProps), {
            default: () => {
              var ye, Ce, Ee;
              return [(ye = t["prepend-item"]) == null ? void 0 : ye.call(t), !w.value.length && !e.hideNoData && (((Ce = t["no-data"]) == null ? void 0 : Ce.call(t)) ?? h(qe, {
                key: "no-data",
                title: a(e.noDataText)
              }, null)), h(mo, {
                ref: r,
                renderless: !0,
                items: w.value,
                itemKey: "value"
              }, {
                default: (Le) => {
                  var Tl;
                  let {
                    item: Ae,
                    index: Fe,
                    itemRef: Oe
                  } = Le;
                  const Al = L(Ae.props, {
                    ref: Oe,
                    key: Ae.value,
                    active: T.value && Fe === 0 ? !0 : void 0,
                    onClick: () => ge(Ae, null)
                  });
                  return ((Tl = t.item) == null ? void 0 : Tl.call(t, {
                    item: Ae,
                    index: Fe,
                    props: Al
                  })) ?? h(qe, L(Al, {
                    role: "option"
                  }), {
                    prepend: (Xt) => {
                      let {
                        isSelected: ri
                      } = Xt;
                      return C(X, null, [e.multiple && !e.hideSelected ? h(St, {
                        key: Ae.value,
                        modelValue: ri,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, Ae.props.prependAvatar && h(wt, {
                        image: Ae.props.prependAvatar
                      }, null), Ae.props.prependIcon && h(ke, {
                        icon: Ae.props.prependIcon
                      }, null)]);
                    },
                    title: () => {
                      var Xt;
                      return o.value ? Ae.title : sr("v-autocomplete", Ae.title, (Xt = k(Ae)) == null ? void 0 : Xt.title);
                    }
                  });
                }
              }), (Ee = t["append-item"]) == null ? void 0 : Ee.call(t)];
            }
          })]
        }), p.value.map((ye, Ce) => {
          function Ee(Oe) {
            Oe.stopPropagation(), Oe.preventDefault(), ge(ye, !1);
          }
          const Le = {
            "onClick:close": Ee,
            onKeydown(Oe) {
              Oe.key !== "Enter" && Oe.key !== " " || (Oe.preventDefault(), Oe.stopPropagation(), Ee(Oe));
            },
            onMousedown(Oe) {
              Oe.preventDefault(), Oe.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, Ae = P.value ? !!t.chip : !!t.selection, Fe = Ae ? Tn(P.value ? t.chip({
            item: ye,
            index: Ce,
            props: Le
          }) : t.selection({
            item: ye,
            index: Ce
          })) : void 0;
          if (!(Ae && !Fe))
            return C("div", {
              key: ye.value,
              class: fe(["v-autocomplete__selection", Ce === c.value && ["v-autocomplete__selection--selected", g.value]]),
              style: Ve(Ce === c.value ? V.value : {})
            }, [P.value ? t.chip ? h(De, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: e.closableChips,
                  size: "small",
                  text: ye.title
                }
              }
            }, {
              default: () => [Fe]
            }) : h(wl, L({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: ye.title,
              disabled: ye.props.disabled
            }, Le), null) : Fe ?? C("span", {
              class: "v-autocomplete__selection-text"
            }, [ye.title, e.multiple && Ce < p.value.length - 1 && C("span", {
              class: "v-autocomplete__selection-comma"
            }, [Pe(",")])])]);
        })]),
        "append-inner": function() {
          var Le, Ae;
          for (var ye = arguments.length, Ce = new Array(ye), Ee = 0; Ee < ye; Ee++)
            Ce[Ee] = arguments[Ee];
          return C(X, null, [(Le = t["append-inner"]) == null ? void 0 : Le.call(t, ...Ce), e.menuIcon ? h(ke, {
            class: "v-autocomplete__menu-icon",
            color: (Ae = l.value) == null ? void 0 : Ae.fieldIconColor,
            icon: e.menuIcon,
            onMousedown: re,
            onClick: Ji,
            "aria-label": a(z.value),
            title: a(z.value),
            tabindex: "-1"
          }, null) : void 0]);
        }
      });
    }), bt({
      isFocused: i,
      isPristine: o,
      menu: R,
      search: y,
      filteredItems: x,
      select: ge
    }, l);
  }
}), cr = ["name", "value"], dr = /* @__PURE__ */ Me({
  __name: "OxAutocomplete",
  props: /* @__PURE__ */ Ja({
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
    const t = ut(), a = el(e, "modelValue"), l = q(""), i = e, o = xt(), s = ve("repos"), { state: u, query: r, fetch: c } = Pi(i.repo, s, { save: !1 }), d = Qe([]), m = q([]);
    async function v(f) {
      const I = f && g(f);
      if (I != null && I.length) {
        const x = await c({ id: I });
        d.splice(0, 0, ...x.entities);
      }
      V(f);
    }
    function g(f) {
      if (!Array.isArray(f))
        return d.findIndex((x) => x.id == f) == -1 ? [f] : null;
      const I = new Set(d.map((x) => x.id));
      return f.filter((x) => !I.has(x));
    }
    function V(f) {
      Array.isArray(f) ? m.value = d.filter((I) => f.includes(I.id)) : f ? m.value = [d.find((I) => I.id == f)] : m.value = [];
    }
    let y = null;
    const p = ea.debounce(async ({ reset: f = !1 } = {}) => {
      if (u.isProcessing)
        return;
      const I = l.value != "<empty string>" && l.value || "";
      if (!f && I == y)
        return;
      y = I;
      const x = { ...i.filters, page_size: 20 };
      x[i.lookup] = I;
      let k = await c({ params: x });
      const w = m.value ? ea.unionBy(k.entities, m.value, (P) => P.id) : k.entities;
      d.splice(0, d.length, ...w), f || (l.value = I);
    }, 500);
    return Ge(async () => {
      await p(), a.value && await v(a.value);
    }), J(() => i.filters, (f, I) => {
      ea.isEqual(La(f), La(I)) || p({ reset: !0 });
    }), J(l, (f) => {
      f != "<empty string>" && f != y && p({ q: f });
    }), J(a, (f, I) => {
      f != I && V(f);
    }), n({ value: a, selected: m, load: p, items: d }), (f, I) => (M(), me(X, null, [
      i.name ? (M(), me("input", {
        key: 0,
        type: "hidden",
        name: i.name,
        value: a.value
      }, null, 8, cr)) : ue("", !0),
      h(S(rr), L(S(o), {
        items: d,
        loading: S(u).isProcessing,
        modelValue: a.value,
        "onUpdate:modelValue": I[0] || (I[0] = (x) => a.value = x),
        search: l.value,
        "onUpdate:search": I[1] || (I[1] = (x) => l.value = x)
      }), it({ _: 2 }, [
        Te(S(t), (x, k) => ({
          name: k,
          fn: O((w) => [
            j(f.$slots, k, Be($e(w)))
          ])
        }))
      ]), 1040, ["items", "loading", "modelValue", "search"])
    ], 64));
  }
}), vr = {
  props: {
    src: String,
    is: String
  },
  setup(e) {
    const n = ee(null), t = A(() => {
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
      n.value = Ii(e.src, t.value);
    }
    return J(() => e.src, a), a(), () => hi(n.value, e);
  }
}, fr = K({
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
  ...Va(),
  ...xl()
}, "VTextarea"), mr = ne()({
  name: "VTextarea",
  directives: {
    vIntersect: na
  },
  inheritAttrs: !1,
  props: fr(),
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
    const i = we(e, "modelValue"), {
      isFocused: o,
      focus: s,
      blur: u
    } = ka(e), r = A(() => typeof e.counterValue == "function" ? e.counterValue(i.value) : (i.value || "").toString().length), c = A(() => {
      if (t.maxlength) return t.maxlength;
      if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string"))
        return e.counter;
    });
    function d($, D) {
      var R, z;
      !e.autofocus || !$ || (z = (R = D[0].target) == null ? void 0 : R.focus) == null || z.call(R);
    }
    const m = q(), v = q(), g = ee(""), V = q(), y = A(() => e.persistentPlaceholder || o.value || e.active);
    function p() {
      var $;
      V.value !== document.activeElement && (($ = V.value) == null || $.focus()), o.value || s();
    }
    function f($) {
      p(), a("click:control", $);
    }
    function I($) {
      a("mousedown:control", $);
    }
    function x($) {
      $.stopPropagation(), p(), _e(() => {
        i.value = "", dl(e["onClick:clear"], $);
      });
    }
    function k($) {
      var R;
      const D = $.target;
      if (i.value = D.value, (R = e.modelModifiers) != null && R.trim) {
        const z = [D.selectionStart, D.selectionEnd];
        _e(() => {
          D.selectionStart = z[0], D.selectionEnd = z[1];
        });
      }
    }
    const w = q(), P = q(Number(e.rows)), b = A(() => ["plain", "underlined"].includes(e.variant));
    et(() => {
      e.autoGrow || (P.value = Number(e.rows));
    });
    function B() {
      e.autoGrow && _e(() => {
        if (!w.value || !v.value) return;
        const $ = getComputedStyle(w.value), D = getComputedStyle(v.value.$el), R = parseFloat($.getPropertyValue("--v-field-padding-top")) + parseFloat($.getPropertyValue("--v-input-padding-top")) + parseFloat($.getPropertyValue("--v-field-padding-bottom")), z = w.value.scrollHeight, W = parseFloat($.lineHeight), G = Math.max(parseFloat(e.rows) * W + R, parseFloat(D.getPropertyValue("--v-input-control-height"))), te = parseFloat(e.maxRows) * W + R || 1 / 0, ae = Je(z ?? 0, G, te);
        P.value = Math.floor((ae - R) / W), g.value = he(ae);
      });
    }
    Ge(B), J(i, B), J(() => e.rows, B), J(() => e.maxRows, B), J(() => e.density, B);
    let T;
    return J(w, ($) => {
      $ ? (T = new ResizeObserver(B), T.observe(w.value)) : T == null || T.disconnect();
    }), mt(() => {
      T == null || T.disconnect();
    }), ie(() => {
      const $ = !!(l.counter || e.counter || e.counterValue), D = !!($ || l.details), [R, z] = xa(t), {
        modelValue: W,
        ...G
      } = Tt.filterProps(e), te = da.filterProps(e);
      return h(Tt, L({
        ref: m,
        modelValue: i.value,
        "onUpdate:modelValue": (ae) => i.value = ae,
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
      }, R, G, {
        centerAffix: P.value === 1 && !b.value,
        focused: o.value
      }), {
        ...l,
        default: (ae) => {
          let {
            id: re,
            isDisabled: _,
            isDirty: E,
            isReadonly: F,
            isValid: U
          } = ae;
          return h(da, L({
            ref: v,
            style: {
              "--v-textarea-control-height": g.value
            },
            onClick: f,
            onMousedown: I,
            "onClick:clear": x,
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"]
          }, te, {
            id: re.value,
            active: y.value || E.value,
            centerAffix: P.value === 1 && !b.value,
            dirty: E.value || e.dirty,
            disabled: _.value,
            focused: o.value,
            error: U.value === !1
          }), {
            ...l,
            default: (be) => {
              let {
                props: {
                  class: le,
                  ...se
                }
              } = be;
              return C(X, null, [e.prefix && C("span", {
                class: "v-text-field__prefix"
              }, [e.prefix]), Ke(C("textarea", L({
                ref: V,
                class: le,
                value: i.value,
                onInput: k,
                autofocus: e.autofocus,
                readonly: F.value,
                disabled: _.value,
                placeholder: e.placeholder,
                rows: e.rows,
                name: e.name,
                onFocus: p,
                onBlur: u
              }, se, z), null), [[na, {
                handler: d
              }, null, {
                once: !0
              }]]), e.autoGrow && Ke(C("textarea", {
                class: fe([le, "v-textarea__sizer"]),
                id: `${se.id}-sizer`,
                "onUpdate:modelValue": (Z) => i.value = Z,
                ref: w,
                readonly: !0,
                "aria-hidden": "true"
              }, null), [[bi, i.value]]), e.suffix && C("span", {
                class: "v-text-field__suffix"
              }, [e.suffix])]);
            }
          });
        },
        details: D ? (ae) => {
          var re;
          return C(X, null, [(re = l.details) == null ? void 0 : re.call(l, ae), $ && C(X, null, [C("span", null, null), h(fo, {
            active: e.persistentCounter || o.value,
            value: r.value,
            max: c.value,
            disabled: e.disabled
          }, l.counter)])]);
        } : void 0
      });
    }), bt({}, m, v, V);
  }
}), gr = /* @__PURE__ */ Me({
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
    const t = pi(() => import("./OxAutocomplete-RRyWhOH0.js")), a = n, l = xt(), i = ut(), o = e, s = A(() => {
      const u = `fields.${o.name}.help`, r = {
        name: o.name,
        label: oe(`fields.${o.name}`),
        "aria-label": oe(`fields.${o.name}`),
        "error-messages": o.editor.error(o.name),
        rules: o.rules || [],
        "onUpdate:modelValue": (...d) => a("update:modelValue", ...d),
        ...l
      }, c = oe(u);
      return c != u && (r.hint = c, r["aria-description"] = c), o.required && r.rules.push(Ai.required), r;
    });
    return (u, r) => j(u.$slots, "default", {
      props: s.value,
      editor: o.editor
    }, () => [
      o.type == "select" ? (M(), Y(Vl, L({ key: 0 }, s.value, {
        modelValue: o.editor.value[o.name],
        "onUpdate:modelValue": r[0] || (r[0] = (c) => o.editor.value[o.name] = c)
      }), null, 16, ["modelValue"])) : o.type == "textarea" ? (M(), Y(mr, L({ key: 1 }, s.value, {
        modelValue: o.editor.value[o.name],
        "onUpdate:modelValue": r[1] || (r[1] = (c) => o.editor.value[o.name] = c)
      }), null, 16, ["modelValue"])) : o.type == "checkbox" ? (M(), Y(zu, L({ key: 2 }, s.value, {
        modelValue: o.editor.value[o.name],
        "onUpdate:modelValue": r[2] || (r[2] = (c) => o.editor.value[o.name] = c)
      }), null, 16, ["modelValue"])) : o.type == "autocomplete" ? (M(), Y(S(t), L({ key: 3 }, s.value, {
        modelValue: o.editor.value[o.name],
        "onUpdate:modelValue": r[3] || (r[3] = (c) => o.editor.value[o.name] = c)
      }), it({ _: 2 }, [
        Te(S(i), (c, d) => ({
          name: d,
          fn: O((m) => [
            j(u.$slots, d, Be($e(m)))
          ])
        }))
      ]), 1040, ["modelValue"])) : (M(), Y(vt, L({ key: 4 }, s.value, {
        type: o.type,
        modelValue: o.editor.value[o.name],
        "onUpdate:modelValue": r[4] || (r[4] = (c) => o.editor.value[o.name] = c)
      }), null, 16, ["type", "modelValue"]))
    ]);
  }
}), po = {
  __name: "OxListFilters",
  props: {
    search: String
  },
  setup(e, { expose: n }) {
    const t = ve("list"), a = e, l = A(() => {
      const s = t.filters;
      return s && Object.entries(s).some(
        ([u, r]) => !u.startsWith("page") && !u.startsWith("ordering") && !!r
      );
    }), i = A(() => l.value ? "mdi-filter-check" : "mdi-filter-outline");
    function o() {
      t.filters = {}, t.load();
    }
    return n({ icon: i, hasFilters: l, reset: o }), (s, u) => (M(), me("form", {
      onSubmit: u[2] || (u[2] = Ie((r) => S(t).load(), ["prevent"])),
      class: "ox-list-filters width-full"
    }, [
      h(Wa, {
        dense: "",
        color: "transparent"
      }, {
        default: O(() => [
          h(Wn, {
            icon: i.value,
            readonly: ""
          }, null, 8, ["icon"]),
          a.search && S(t).filters ? (M(), Y(vt, {
            key: 0,
            label: S(oe)("filters.search"),
            density: "compact",
            class: "ml-2",
            modelValue: S(t).filters[a.search],
            "onUpdate:modelValue": u[0] || (u[0] = (r) => S(t).filters[a.search] = r),
            "hide-details": ""
          }, null, 8, ["label", "modelValue"])) : ue("", !0),
          j(s.$slots, "default", {
            list: S(t),
            filters: S(t).filters
          }),
          h(pe, {
            onClick: u[1] || (u[1] = Ie((r) => S(t).load(), ["stop"])),
            class: "ml-2",
            icon: "mdi-check",
            "aria-label": s.$t("filters.apply"),
            title: S(oe)("filters.apply")
          }, null, 8, ["aria-label", "title"]),
          l.value ? (M(), Y(pe, {
            key: 1,
            onClick: Ie(o, ["stop"]),
            icon: "mdi-backspace",
            "aria-label": S(oe)("filters.reset"),
            title: S(oe)("filters.reset")
          }, null, 8, ["aria-label", "title"])) : ue("", !0)
        ]),
        _: 3
      })
    ], 32));
  }
}, tn = /* @__PURE__ */ Me({
  __name: "OxFormListItem",
  props: {
    /** Item being displayed. **/
    item: Object,
    /** Display remove button. **/
    remove: Boolean
  },
  emits: "remove",
  setup(e, { emit: n }) {
    const t = e, a = n, l = xt();
    return (i, o) => (M(), Y(qe, Be($e(S(l))), {
      append: O(() => [
        C("div", {
          onClick: o[1] || (o[1] = Ie(() => {
          }, ["stop"]))
        }, [
          j(i.$slots, "actions", { item: e.item }),
          t.remove ? (M(), Y(pe, {
            key: 0,
            type: "button",
            class: "ml-2",
            size: "small",
            onClick: o[0] || (o[0] = Ie((s) => a("remove", i.$events), ["stop", "prevent"])),
            color: "error",
            "aria-label": S(oe)("actions.remove"),
            title: S(oe)("actions.remove"),
            icon: "mdi-delete"
          }, null, 8, ["aria-label", "title"])) : ue("", !0)
        ])
      ]),
      default: O(() => [
        h(Li, null, {
          default: O(() => [
            j(i.$slots, "default", { item: e.item })
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 16));
  }
}), yr = K({
  ...xe(),
  ...Fu()
}, "VForm"), Za = ne()({
  name: "VForm",
  props: yr(),
  emits: {
    "update:modelValue": (e) => !0,
    submit: (e) => !0
  },
  setup(e, n) {
    let {
      slots: t,
      emit: a
    } = n;
    const l = Ru(e), i = q();
    function o(u) {
      u.preventDefault(), l.reset();
    }
    function s(u) {
      const r = u, c = l.validate();
      r.then = c.then.bind(c), r.catch = c.catch.bind(c), r.finally = c.finally.bind(c), a("submit", r), r.defaultPrevented || c.then((d) => {
        var v;
        let {
          valid: m
        } = d;
        m && ((v = i.value) == null || v.submit());
      }), r.preventDefault();
    }
    return ie(() => {
      var u;
      return C("form", {
        ref: i,
        class: fe(["v-form", e.class]),
        style: Ve(e.style),
        novalidate: !0,
        onReset: o,
        onSubmit: s
      }, [(u = t.default) == null ? void 0 : u.call(t, l)]);
    }), bt(l, i);
  }
}), hr = {
  key: 0,
  class: "flex-row justify-right"
}, br = /* @__PURE__ */ Me({
  __name: "OxFormList",
  props: /* @__PURE__ */ Ja({
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
    const n = el(e, "modelValue"), t = ve("user"), a = q({}), l = e, i = A(() => ({
      add: l.editable && t.can([l.useModel, "add"]),
      change: l.editable && t.can([l.useModel, "change"]),
      delete: l.editable && t.can([l.useModel, "delete"])
    })), o = q([]);
    (r = n.value) != null && r.length || o.value.push(-1);
    function s() {
      n.value.push(a.value), a.value = {};
    }
    function u(c) {
      confirm(oe("actions.delete.confirm")) && n.value.splice(c, 1);
    }
    return (c, d) => (M(), Y(dt, {
      opened: o.value,
      "onUpdate:opened": d[2] || (d[2] = (m) => o.value = m)
    }, {
      default: O(() => {
        var m;
        return [
          (m = n.value) != null && m.length ? (M(), me(X, { key: 0 }, [
            i.value.change ? (M(!0), me(X, { key: 0 }, Te(n.value, (v, g) => (M(), Y(Ha, {
              key: g,
              value: g
            }, {
              activator: O(({ props: V }) => [
                h(S(tn), L({ item: v }, { ref_for: !0 }, V, {
                  remove: i.value.delete,
                  onRemove: (y) => u(g)
                }), {
                  default: O(({ item: y }) => [
                    j(c.$slots, "item", {
                      item: y,
                      index: g
                    })
                  ]),
                  actions: O(({ item: y }) => [
                    j(c.$slots, "item.actions", {
                      item: y,
                      index: g
                    })
                  ]),
                  _: 2
                }, 1040, ["item", "remove", "onRemove"])
              ]),
              default: O(() => [
                h(Za, {
                  disabled: !i.value.change
                }, {
                  default: O(() => [
                    j(c.$slots, "item.form", {
                      item: v,
                      index: g,
                      editable: i.value.change
                    })
                  ]),
                  _: 2
                }, 1032, ["disabled"])
              ]),
              _: 2
            }, 1032, ["value"]))), 128)) : (M(!0), me(X, { key: 1 }, Te(n.value, (v, g) => (M(), Y(S(tn), L({
              key: g,
              item: v
            }, { ref_for: !0 }, l, {
              value: g,
              remove: i.value.delete,
              onRemove: (V) => u(g)
            }), {
              default: O(({ item: V }) => [
                j(c.$slots, "item", {
                  item: V,
                  index: g
                })
              ]),
              actions: O(({ item: V }) => [
                j(c.$slots, "item.actions", {
                  item: V,
                  index: g
                })
              ]),
              _: 2
            }, 1040, ["item", "value", "remove", "onRemove"]))), 128))
          ], 64)) : (M(), Y(qe, {
            key: 1,
            title: S(oe)("lists.empty")
          }, null, 8, ["title"])),
          i.value.add ? (M(), me(X, { key: 2 }, [
            n.value.length ? (M(), Y(Sa, { key: 0 })) : ue("", !0),
            h(Ha, { value: -1 }, {
              activator: O(({ props: v }) => [
                h(qe, L(v, {
                  title: S(oe)("actions.add_item"),
                  "prepend-icon": "mdi-plus"
                }), null, 16, ["title"])
              ]),
              default: O(() => [
                h(Za, null, {
                  default: O(() => [
                    j(c.$slots, "item.form", {
                      item: a.value,
                      edit: !0
                    })
                  ]),
                  _: 3
                }),
                a.value ? (M(), Y(qe, { key: 0 }, {
                  default: O(() => [
                    Object.values(a.value).length ? (M(), me("div", hr, [
                      h(pe, {
                        size: "small",
                        color: "secondary",
                        "prepend-icon": "mdi-backspace",
                        onClick: d[0] || (d[0] = (v) => a.value = {}),
                        "aria-label": S(oe)("actions.discard")
                      }, {
                        default: O(() => [
                          Pe(Re(S(oe)("actions.discard")), 1)
                        ]),
                        _: 1
                      }, 8, ["aria-label"]),
                      h(pe, {
                        size: "small",
                        color: "primary",
                        "prepend-icon": "mdi-plus",
                        class: "ml-2",
                        onClick: d[1] || (d[1] = (v) => s()),
                        "aria-label": S(oe)("actions.add")
                      }, {
                        default: O(() => [
                          Pe(Re(S(oe)("actions.add")), 1)
                        ]),
                        _: 1
                      }, 8, ["aria-label"])
                    ])) : ue("", !0)
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
}), wo = ne()({
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
        class: fe(["v-card-actions", e.class]),
        style: Ve(e.style)
      }, [(a = t.default) == null ? void 0 : a.call(t)]);
    }), {};
  }
}), pr = K({
  opacity: [Number, String],
  ...xe(),
  ...je()
}, "VCardSubtitle"), wr = ne()({
  name: "VCardSubtitle",
  props: pr(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    return ie(() => h(e.tag, {
      class: fe(["v-card-subtitle", e.class]),
      style: Ve([{
        "--v-card-subtitle-opacity": e.opacity
      }, e.style])
    }, t)), {};
  }
}), So = Ni("v-card-title"), Sr = K({
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
  ...gt()
}, "VCardItem"), xo = ne()({
  name: "VCardItem",
  props: Sr(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    return ie(() => {
      var r;
      const a = !!(e.prependAvatar || e.prependIcon), l = !!(a || t.prepend), i = !!(e.appendAvatar || e.appendIcon), o = !!(i || t.append), s = !!(e.title != null || t.title), u = !!(e.subtitle != null || t.subtitle);
      return C("div", {
        class: fe(["v-card-item", e.class]),
        style: Ve(e.style)
      }, [l && C("div", {
        key: "prepend",
        class: "v-card-item__prepend"
      }, [t.prepend ? h(De, {
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
      }, t.prepend) : C(X, null, [e.prependAvatar && h(wt, {
        key: "prepend-avatar",
        density: e.density,
        image: e.prependAvatar
      }, null), e.prependIcon && h(ke, {
        key: "prepend-icon",
        density: e.density,
        icon: e.prependIcon
      }, null)])]), C("div", {
        class: "v-card-item__content"
      }, [s && h(So, {
        key: "title"
      }, {
        default: () => {
          var c;
          return [((c = t.title) == null ? void 0 : c.call(t)) ?? Re(e.title)];
        }
      }), u && h(wr, {
        key: "subtitle"
      }, {
        default: () => {
          var c;
          return [((c = t.subtitle) == null ? void 0 : c.call(t)) ?? Re(e.subtitle)];
        }
      }), (r = t.default) == null ? void 0 : r.call(t)]), o && C("div", {
        key: "append",
        class: "v-card-item__append"
      }, [t.append ? h(De, {
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
      }, t.append) : C(X, null, [e.appendIcon && h(ke, {
        key: "append-icon",
        density: e.density,
        icon: e.appendIcon
      }, null), e.appendAvatar && h(wt, {
        key: "append-avatar",
        density: e.density,
        image: e.appendAvatar
      }, null)])])]);
    }), {};
  }
}), xr = K({
  opacity: [Number, String],
  ...xe(),
  ...je()
}, "VCardText"), kr = ne()({
  name: "VCardText",
  props: xr(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    return ie(() => h(e.tag, {
      class: fe(["v-card-text", e.class]),
      style: Ve([{
        "--v-card-text-opacity": e.opacity
      }, e.style])
    }, t)), {};
  }
}), Vr = K({
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
  ...gt(),
  ...Ut(),
  ...Ht(),
  ...rl(),
  ...fn(),
  ...vn(),
  ...kt(),
  ...pn(),
  ...je(),
  ...Ne(),
  ...Kt({
    variant: "elevated"
  })
}, "VCard"), ko = ne()({
  name: "VCard",
  directives: {
    vRipple: It
  },
  props: Vr(),
  setup(e, n) {
    let {
      attrs: t,
      slots: a
    } = n;
    const {
      themeClasses: l
    } = Ye(e), {
      borderClasses: i
    } = ha(e), {
      colorClasses: o,
      colorStyles: s,
      variantClasses: u
    } = al(e), {
      densityClasses: r
    } = Et(e), {
      dimensionStyles: c
    } = Wt(e), {
      elevationClasses: d
    } = ba(e), {
      loaderClasses: m
    } = sl(e), {
      locationStyles: v
    } = Hi(e), {
      positionClasses: g
    } = dn(e), {
      roundedClasses: V
    } = Bt(e), y = yn(e, t);
    return ie(() => {
      const p = e.link !== !1 && y.isLink.value, f = !e.disabled && e.link !== !1 && (e.link || y.isClickable.value), I = p ? "a" : e.tag, x = !!(a.title || e.title != null), k = !!(a.subtitle || e.subtitle != null), w = x || k, P = !!(a.append || e.appendAvatar || e.appendIcon), b = !!(a.prepend || e.prependAvatar || e.prependIcon), B = !!(a.image || e.image), T = w || b || P, $ = !!(a.text || e.text != null);
      return Ke(h(I, L({
        class: ["v-card", {
          "v-card--disabled": e.disabled,
          "v-card--flat": e.flat,
          "v-card--hover": e.hover && !(e.disabled || e.flat),
          "v-card--link": f
        }, l.value, i.value, o.value, r.value, d.value, m.value, g.value, V.value, u.value, e.class],
        style: [s.value, c.value, v.value, e.style],
        onClick: f && y.navigate,
        tabindex: e.disabled ? -1 : void 0
      }, y.linkProps), {
        default: () => {
          var D;
          return [B && C("div", {
            key: "image",
            class: "v-card__image"
          }, [a.image ? h(De, {
            key: "image-defaults",
            disabled: !e.image,
            defaults: {
              VImg: {
                cover: !0,
                src: e.image
              }
            }
          }, a.image) : h($t, {
            key: "image-img",
            cover: !0,
            src: e.image
          }, null)]), h(ul, {
            name: "v-card",
            active: !!e.loading,
            color: typeof e.loading == "boolean" ? void 0 : e.loading
          }, {
            default: a.loader
          }), T && h(xo, {
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
          }), $ && h(kr, {
            key: "text"
          }, {
            default: () => {
              var R;
              return [((R = a.text) == null ? void 0 : R.call(a)) ?? e.text];
            }
          }), (D = a.default) == null ? void 0 : D.call(a), a.actions && h(wo, null, {
            default: a.actions
          }), ll(f, "v-card")];
        }
      }), [[It, f && e.ripple]]);
    }), {};
  }
}), Cr = ne()({
  name: "VSlideGroupItem",
  props: ol(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = il(e, lo);
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
}), Pr = {
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
    function i(u) {
      return u = u % l.colors.length, l.colorVariant ? l.colors[u] + "-" + l.colorVariant : l.colors[u];
    }
    function o(u, r, c) {
      u[c] ? !u[c].includes(r) && u[c].push(r) : u[c] = [r];
    }
    const s = A(() => {
      const u = {};
      if (a.value)
        for (var r of a.value) {
          const d = r[l.field];
          if (Array.isArray(d))
            if (d.length)
              for (var c of d)
                o(u, r, c);
            else
              o(u, r, null);
          else
            o(u, r, d);
        }
      return u;
    });
    return (u, r) => (M(), Y(Sn, null, {
      default: O(() => [
        h(Nt, null, {
          default: O(() => [
            (M(!0), me(X, null, Te(l.headers, (c, d) => (M(), Y(Cr, {
              key: c.value
            }, {
              default: O(({ selectedClass: m }) => [
                h(ko, {
                  width: "400",
                  class: fe(["ma-3", m]),
                  color: i(d),
                  lines: "two"
                }, {
                  default: O(() => [
                    h(So, null, {
                      default: O(() => [
                        Pe(Re(c.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    h(dt, {
                      "bg-color": i(d)
                    }, {
                      default: O(() => [
                        s.value && s.value[c.value] ? (M(!0), me(X, { key: 0 }, Te(s.value[c.value], (v) => j(u.$slots, "item", {
                          key: v.id,
                          header: c,
                          item: v
                        }, () => [
                          h(qe, {
                            title: v[l.itemTitle],
                            value: l.itemValue && v[l.itemValue],
                            onClick: (g) => t("click", v)
                          }, {
                            append: O(() => [
                              j(u.$slots, "item.action")
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
}, Vo = /* @__PURE__ */ Me({
  __name: "OxActionEdit",
  props: {
    item: {},
    edit: {}
  },
  setup(e) {
    const n = ve("panel");
    ve("repos");
    const t = ve("user"), a = xt(), l = e;
    function i(o, s) {
      n.show({ view: "detail.edit", value: s });
    }
    return (o, s) => l.edit && S(t).can([o.item.constructor, "change"], o.item) ? (M(), Y(Dt, L({ key: 0 }, S(a), {
      icon: "mdi-pencil",
      title: S(oe)("actions.edit"),
      item: o.item,
      run: i
    }), null, 16, ["title", "item"])) : l.edit && S(t).can([o.item.constructor, "view"], o.item) ? (M(), Y(Dt, L({ key: 1 }, S(a), {
      icon: "mdi-eye-outline",
      title: S(oe)("actions.view"),
      item: o.item,
      run: i
    }), null, 16, ["title", "item"])) : ue("", !0);
  }
});
function Ir() {
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
const Ar = K({
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
  ...gt(),
  ...Ht(),
  ...kt(),
  ...bn(),
  ...je({
    tag: "nav"
  }),
  ...Ne(),
  ...Kt({
    variant: "text"
  })
}, "VPagination"), an = ne()({
  name: "VPagination",
  props: Ar(),
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
      t: i,
      n: o
    } = ot(), {
      isRtl: s
    } = nt(), {
      themeClasses: u
    } = Ye(e), {
      width: r
    } = yt(), c = ee(-1);
    at(void 0, {
      scoped: !0
    });
    const {
      resizeRef: d
    } = Pt((b) => {
      if (!b.length) return;
      const {
        target: B,
        contentRect: T
      } = b[0], $ = B.querySelector(".v-pagination__list > *");
      if (!$) return;
      const D = T.width, R = $.offsetWidth + parseFloat(getComputedStyle($).marginRight) * 2;
      c.value = V(D, R);
    }), m = A(() => parseInt(e.length, 10)), v = A(() => parseInt(e.start, 10)), g = A(() => e.totalVisible != null ? parseInt(e.totalVisible, 10) : c.value >= 0 ? c.value : V(r.value, 58));
    function V(b, B) {
      const T = e.showFirstLastPage ? 5 : 3;
      return Math.max(0, Math.floor(
        // Round to two decimal places to avoid floating point errors
        Number(((b - B * T) / B).toFixed(2))
      ));
    }
    const y = A(() => {
      if (m.value <= 0 || isNaN(m.value) || m.value > Number.MAX_SAFE_INTEGER) return [];
      if (g.value <= 0) return [];
      if (g.value === 1) return [l.value];
      if (m.value <= g.value)
        return Zt(m.value, v.value);
      const b = g.value % 2 === 0, B = b ? g.value / 2 : Math.floor(g.value / 2), T = b ? B : B + 1, $ = m.value - B;
      if (T - l.value >= 0)
        return [...Zt(Math.max(1, g.value - 1), v.value), e.ellipsis, m.value];
      if (l.value - $ >= (b ? 1 : 0)) {
        const D = g.value - 1, R = m.value - D + v.value;
        return [v.value, e.ellipsis, ...Zt(D, R)];
      } else {
        const D = Math.max(1, g.value - 2), R = D === 1 ? l.value : l.value - Math.ceil(D / 2) + v.value;
        return [v.value, e.ellipsis, ...Zt(D, R), e.ellipsis, m.value];
      }
    });
    function p(b, B, T) {
      b.preventDefault(), l.value = B, T && a(T, B);
    }
    const {
      refs: f,
      updateRef: I
    } = Ir();
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
    const x = A(() => y.value.map((b, B) => {
      const T = ($) => I($, B);
      if (typeof b == "string")
        return {
          isActive: !1,
          key: `ellipsis-${B}`,
          page: b,
          props: {
            ref: T,
            ellipsis: !0,
            icon: !0,
            disabled: !0
          }
        };
      {
        const $ = b === l.value;
        return {
          isActive: $,
          key: b,
          page: o(b),
          props: {
            ref: T,
            ellipsis: !1,
            icon: !0,
            disabled: !!e.disabled || Number(e.length) < 2,
            color: $ ? e.activeColor : e.color,
            "aria-current": $,
            "aria-label": i($ ? e.currentPageAriaLabel : e.pageAriaLabel, b),
            onClick: (D) => p(D, b)
          }
        };
      }
    })), k = A(() => {
      const b = !!e.disabled || l.value <= v.value, B = !!e.disabled || l.value >= v.value + m.value - 1;
      return {
        first: e.showFirstLastPage ? {
          icon: s.value ? e.lastIcon : e.firstIcon,
          onClick: (T) => p(T, v.value, "first"),
          disabled: b,
          "aria-label": i(e.firstAriaLabel),
          "aria-disabled": b
        } : void 0,
        prev: {
          icon: s.value ? e.nextIcon : e.prevIcon,
          onClick: (T) => p(T, l.value - 1, "prev"),
          disabled: b,
          "aria-label": i(e.previousAriaLabel),
          "aria-disabled": b
        },
        next: {
          icon: s.value ? e.prevIcon : e.nextIcon,
          onClick: (T) => p(T, l.value + 1, "next"),
          disabled: B,
          "aria-label": i(e.nextAriaLabel),
          "aria-disabled": B
        },
        last: e.showFirstLastPage ? {
          icon: s.value ? e.firstIcon : e.lastIcon,
          onClick: (T) => p(T, v.value + m.value - 1, "last"),
          disabled: B,
          "aria-label": i(e.lastAriaLabel),
          "aria-disabled": B
        } : void 0
      };
    });
    function w() {
      var B;
      const b = l.value - v.value;
      (B = f.value[b]) == null || B.$el.focus();
    }
    function P(b) {
      b.key === Dl.left && !e.disabled && l.value > Number(e.start) ? (l.value = l.value - 1, _e(w)) : b.key === Dl.right && !e.disabled && l.value < v.value + m.value - 1 && (l.value = l.value + 1, _e(w));
    }
    return ie(() => h(e.tag, {
      ref: d,
      class: fe(["v-pagination", u.value, e.class]),
      style: Ve(e.style),
      role: "navigation",
      "aria-label": i(e.ariaLabel),
      onKeydown: P,
      "data-test": "v-pagination-root"
    }, {
      default: () => [C("ul", {
        class: "v-pagination__list"
      }, [e.showFirstLastPage && C("li", {
        key: "first",
        class: "v-pagination__first",
        "data-test": "v-pagination-first"
      }, [t.first ? t.first(k.value.first) : h(pe, L({
        _as: "VPaginationBtn"
      }, k.value.first), null)]), C("li", {
        key: "prev",
        class: "v-pagination__prev",
        "data-test": "v-pagination-prev"
      }, [t.prev ? t.prev(k.value.prev) : h(pe, L({
        _as: "VPaginationBtn"
      }, k.value.prev), null)]), x.value.map((b, B) => C("li", {
        key: b.key,
        class: fe(["v-pagination__item", {
          "v-pagination__item--is-active": b.isActive
        }]),
        "data-test": "v-pagination-item"
      }, [t.item ? t.item(b) : h(pe, L({
        _as: "VPaginationBtn"
      }, b.props), {
        default: () => [b.page]
      })])), C("li", {
        key: "next",
        class: "v-pagination__next",
        "data-test": "v-pagination-next"
      }, [t.next ? t.next(k.value.next) : h(pe, L({
        _as: "VPaginationBtn"
      }, k.value.next), null)]), e.showFirstLastPage && C("li", {
        key: "last",
        class: "v-pagination__last",
        "data-test": "v-pagination-last"
      }, [t.last ? t.last(k.value.last) : h(pe, L({
        _as: "VPaginationBtn"
      }, k.value.last), null)])])]
    })), {};
  }
}), Co = K({
  page: {
    type: [Number, String],
    default: 1
  },
  itemsPerPage: {
    type: [Number, String],
    default: 10
  }
}, "DataTable-paginate"), Po = Symbol.for("vuetify:data-table-pagination");
function Io(e) {
  const n = we(e, "page", void 0, (a) => Number(a ?? 1)), t = we(e, "itemsPerPage", void 0, (a) => Number(a ?? 10));
  return {
    page: n,
    itemsPerPage: t
  };
}
function Ao(e) {
  const {
    page: n,
    itemsPerPage: t,
    itemsLength: a
  } = e, l = A(() => t.value === -1 ? 0 : t.value * (n.value - 1)), i = A(() => t.value === -1 ? a.value : Math.min(a.value, l.value + t.value)), o = A(() => t.value === -1 || a.value === 0 ? 1 : Math.ceil(a.value / t.value));
  J([n, o], () => {
    n.value > o.value && (n.value = o.value);
  });
  function s(m) {
    t.value = m, n.value = 1;
  }
  function u() {
    n.value = Je(n.value + 1, 1, o.value);
  }
  function r() {
    n.value = Je(n.value - 1, 1, o.value);
  }
  function c(m) {
    n.value = Je(m, 1, o.value);
  }
  const d = {
    page: n,
    itemsPerPage: t,
    startIndex: l,
    stopIndex: i,
    pageCount: o,
    itemsLength: a,
    nextPage: u,
    prevPage: r,
    setPage: c,
    setItemsPerPage: s
  };
  return We(Po, d), d;
}
function Tr() {
  const e = ve(Po);
  if (!e) throw new Error("Missing pagination!");
  return e;
}
function _r(e) {
  const n = lt("usePaginatedItems"), {
    items: t,
    startIndex: a,
    stopIndex: l,
    itemsPerPage: i
  } = e, o = A(() => i.value <= 0 ? t.value : t.value.slice(a.value, l.value));
  return J(o, (s) => {
    n.emit("update:currentItems", s);
  }, {
    immediate: !0
  }), {
    paginatedItems: o
  };
}
const Cl = K({
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
}, "VDataTableFooter"), va = ne()({
  name: "VDataTableFooter",
  props: Cl(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const {
      t: a
    } = ot(), {
      page: l,
      pageCount: i,
      startIndex: o,
      stopIndex: s,
      itemsLength: u,
      itemsPerPage: r,
      setItemsPerPage: c
    } = Tr(), d = A(() => e.itemsPerPageOptions.map((m) => typeof m == "number" ? {
      value: m,
      title: m === -1 ? a("$vuetify.dataFooter.itemsPerPageAll") : String(m)
    } : {
      ...m,
      title: isNaN(Number(m.title)) ? a(m.title) : m.title
    }));
    return ie(() => {
      var v;
      const m = an.filterProps(e);
      return C("div", {
        class: "v-data-table-footer"
      }, [(v = t.prepend) == null ? void 0 : v.call(t), C("div", {
        class: "v-data-table-footer__items-per-page"
      }, [C("span", {
        "aria-label": a(e.itemsPerPageText)
      }, [a(e.itemsPerPageText)]), h(Vl, {
        items: d.value,
        modelValue: r.value,
        "onUpdate:modelValue": (g) => c(Number(g)),
        density: "compact",
        variant: "outlined",
        "hide-details": !0
      }, null)]), C("div", {
        class: "v-data-table-footer__info"
      }, [C("div", null, [a(e.pageText, u.value ? o.value + 1 : 0, s.value, u.value)])]), C("div", {
        class: "v-data-table-footer__pagination"
      }, [h(an, L({
        modelValue: l.value,
        "onUpdate:modelValue": (g) => l.value = g,
        density: "comfortable",
        "first-aria-label": e.firstPageLabel,
        "last-aria-label": e.lastPageLabel,
        length: i.value,
        "next-aria-label": e.nextPageLabel,
        "previous-aria-label": e.prevPageLabel,
        rounded: !0,
        "show-first-last-page": !0,
        "total-visible": e.showCurrentPage ? 1 : 0,
        variant: "plain"
      }, m), null)])]);
    }), {};
  }
}), fa = es({
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
    class: fe(["v-data-table__td", {
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
}), Br = K({
  headers: Array
}, "DataTable-header"), To = Symbol.for("vuetify:data-table-headers"), _o = {
  title: "",
  sortable: !1
}, $r = {
  ..._o,
  width: 48
};
function Er() {
  const n = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []).map((t) => ({
    element: t,
    priority: 0
  }));
  return {
    enqueue: (t, a) => {
      let l = !1;
      for (let i = 0; i < n.length; i++)
        if (n[i].priority > a) {
          n.splice(i, 0, {
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
function Qa(e) {
  let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  if (!e.children)
    n.push(e);
  else
    for (const t of e.children)
      Qa(t, n);
  return n;
}
function Bo(e) {
  let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : /* @__PURE__ */ new Set();
  for (const t of e)
    t.key && n.add(t.key), t.children && Bo(t.children, n);
  return n;
}
function Or(e) {
  if (e.key) {
    if (e.key === "data-table-group") return _o;
    if (["data-table-expand", "data-table-select"].includes(e.key)) return $r;
  }
}
function Pl(e) {
  let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return e.children ? Math.max(n, ...e.children.map((t) => Pl(t, n + 1))) : n;
}
function Fr(e) {
  let n = !1;
  function t(i) {
    let o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (i)
      if (o && (i.fixed = !0), i.fixed)
        if (i.children)
          for (let s = i.children.length - 1; s >= 0; s--)
            t(i.children[s], !0);
        else
          n ? isNaN(Number(i.width)) ? Pn(`Multiple fixed columns should have a static width (key: ${i.key})`) : i.minWidth = Math.max(Number(i.width) || 0, Number(i.minWidth) || 0) : i.lastFixed = !0, n = !0;
      else if (i.children)
        for (let s = i.children.length - 1; s >= 0; s--)
          t(i.children[s]);
      else
        n = !1;
  }
  for (let i = e.length - 1; i >= 0; i--)
    t(e[i]);
  function a(i) {
    let o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    if (!i) return o;
    if (i.children) {
      i.fixedOffset = o;
      for (const s of i.children)
        o = a(s, o);
    } else i.fixed && (i.fixedOffset = o, o += parseFloat(i.width || "0") || 0);
    return o;
  }
  let l = 0;
  for (const i of e)
    l = a(i, l);
}
function Rr(e, n) {
  const t = [];
  let a = 0;
  const l = Er(e);
  for (; l.size() > 0; ) {
    let o = l.count();
    const s = [];
    let u = 1;
    for (; o > 0; ) {
      const {
        element: r,
        priority: c
      } = l.dequeue(), d = n - a - Pl(r);
      if (s.push({
        ...r,
        rowspan: d ?? 1,
        colspan: r.children ? Qa(r).length : 1
      }), r.children)
        for (const m of r.children) {
          const v = c % 1 + u / Math.pow(10, a + 2);
          l.enqueue(m, a + d + v);
        }
      u += 1, o -= 1;
    }
    a += 1, t.push(s);
  }
  return {
    columns: e.map((o) => Qa(o)).flat(),
    headers: t
  };
}
function $o(e) {
  const n = [];
  for (const t of e) {
    const a = {
      ...Or(t),
      ...t
    }, l = a.key ?? (typeof a.value == "string" ? a.value : null), i = a.value ?? l ?? null, o = {
      ...a,
      key: l,
      value: i,
      sortable: a.sortable ?? (a.key != null || !!a.sort),
      children: a.children ? $o(a.children) : void 0
    };
    n.push(o);
  }
  return n;
}
function Eo(e, n) {
  const t = q([]), a = q([]), l = q({}), i = q({}), o = q({});
  et(() => {
    var V, y, p;
    const r = (e.headers || Object.keys(e.items[0] ?? {}).map((f) => ({
      key: f,
      title: Si(f)
    }))).slice(), c = Bo(r);
    (V = n == null ? void 0 : n.groupBy) != null && V.value.length && !c.has("data-table-group") && r.unshift({
      key: "data-table-group",
      title: "Group"
    }), (y = n == null ? void 0 : n.showSelect) != null && y.value && !c.has("data-table-select") && r.unshift({
      key: "data-table-select"
    }), (p = n == null ? void 0 : n.showExpand) != null && p.value && !c.has("data-table-expand") && r.push({
      key: "data-table-expand"
    });
    const d = $o(r);
    Fr(d);
    const m = Math.max(...d.map((f) => Pl(f))) + 1, v = Rr(d, m);
    t.value = v.headers, a.value = v.columns;
    const g = v.headers.flat(1);
    for (const f of g)
      f.key && (f.sortable && (f.sort && (l.value[f.key] = f.sort), f.sortRaw && (i.value[f.key] = f.sortRaw)), f.filter && (o.value[f.key] = f.filter));
  });
  const s = {
    headers: t,
    columns: a,
    sortFunctions: l,
    sortRawFunctions: i,
    filterFunctions: o
  };
  return We(To, s), s;
}
function Ca() {
  const e = ve(To);
  if (!e) throw new Error("Missing headers!");
  return e;
}
const Mr = {
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
}, Oo = {
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
    return Oo.select({
      items: t,
      value: n,
      selected: a
    });
  }
}, Fo = {
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
    return Fo.select({
      items: t,
      value: n,
      selected: a
    });
  }
}, Dr = K({
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
    default: st
  }
}, "DataTable-select"), Ro = Symbol.for("vuetify:data-table-selection");
function Mo(e, n) {
  let {
    allItems: t,
    currentPage: a
  } = n;
  const l = we(e, "modelValue", e.modelValue, (f) => new Set(He(f).map((I) => {
    var x;
    return ((x = t.value.find((k) => e.valueComparator(I, k.value))) == null ? void 0 : x.value) ?? I;
  })), (f) => [...f.values()]), i = A(() => t.value.filter((f) => f.selectable)), o = A(() => a.value.filter((f) => f.selectable)), s = A(() => {
    if (typeof e.selectStrategy == "object") return e.selectStrategy;
    switch (e.selectStrategy) {
      case "single":
        return Mr;
      case "all":
        return Fo;
      case "page":
      default:
        return Oo;
    }
  }), u = ee(null);
  function r(f) {
    return He(f).every((I) => l.value.has(I.value));
  }
  function c(f) {
    return He(f).some((I) => l.value.has(I.value));
  }
  function d(f, I) {
    const x = s.value.select({
      items: f,
      value: I,
      selected: new Set(l.value)
    });
    l.value = x;
  }
  function m(f, I, x) {
    const k = [];
    if (I = I ?? a.value.findIndex((w) => w.value === f.value), e.selectStrategy !== "single" && (x != null && x.shiftKey) && u.value !== null) {
      const [w, P] = [u.value, I].sort((b, B) => b - B);
      k.push(...a.value.slice(w, P + 1).filter((b) => b.selectable));
    } else
      k.push(f), u.value = I;
    d(k, !r([f]));
  }
  function v(f) {
    const I = s.value.selectAll({
      value: f,
      allItems: i.value,
      currentPage: o.value,
      selected: new Set(l.value)
    });
    l.value = I;
  }
  const g = A(() => l.value.size > 0), V = A(() => {
    const f = s.value.allSelected({
      allItems: i.value,
      currentPage: o.value
    });
    return !!f.length && r(f);
  }), y = H(() => s.value.showSelectAll), p = {
    toggleSelect: m,
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
  return We(Ro, p), p;
}
function Pa() {
  const e = ve(Ro);
  if (!e) throw new Error("Missing selection!");
  return e;
}
const Lr = K({
  sortBy: {
    type: Array,
    default: () => []
  },
  customKeySort: Object,
  multiSort: Boolean,
  mustSort: Boolean
}, "DataTable-sort"), Do = Symbol.for("vuetify:data-table-sort");
function Lo(e) {
  const n = we(e, "sortBy"), t = H(() => e.mustSort), a = H(() => e.multiSort);
  return {
    sortBy: n,
    mustSort: t,
    multiSort: a
  };
}
function No(e) {
  const {
    sortBy: n,
    mustSort: t,
    multiSort: a,
    page: l
  } = e, i = (u) => {
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
  function o(u) {
    return !!n.value.find((r) => r.key === u.key);
  }
  const s = {
    sortBy: n,
    toggleSort: i,
    isSorted: o
  };
  return We(Do, s), s;
}
function Ho() {
  const e = ve(Do);
  if (!e) throw new Error("Missing sort!");
  return e;
}
function Nr(e, n, t, a) {
  const l = ot();
  return {
    sortedItems: A(() => {
      var o, s;
      return t.value.length ? Hr(n.value, t.value, l.current.value, {
        transform: a == null ? void 0 : a.transform,
        sortFunctions: {
          ...e.customKeySort,
          ...(o = a == null ? void 0 : a.sortFunctions) == null ? void 0 : o.value
        },
        sortRawFunctions: (s = a == null ? void 0 : a.sortRawFunctions) == null ? void 0 : s.value
      }) : n.value;
    })
  };
}
function Hr(e, n, t, a) {
  const l = new Intl.Collator(t, {
    sensitivity: "accent",
    usage: "sort"
  });
  return e.map((o) => [o, a != null && a.transform ? a.transform(o) : o]).sort((o, s) => {
    var u, r;
    for (let c = 0; c < n.length; c++) {
      let d = !1;
      const m = n[c].key, v = n[c].order ?? "asc";
      if (v === !1) continue;
      let g = ia(o[1], m), V = ia(s[1], m), y = o[0].raw, p = s[0].raw;
      if (v === "desc" && ([g, V] = [V, g], [y, p] = [p, y]), (u = a == null ? void 0 : a.sortRawFunctions) != null && u[m]) {
        const f = a.sortRawFunctions[m](y, p);
        if (f == null) continue;
        if (d = !0, f) return f;
      }
      if ((r = a == null ? void 0 : a.sortFunctions) != null && r[m]) {
        const f = a.sortFunctions[m](g, V);
        if (f == null) continue;
        if (d = !0, f) return f;
      }
      if (!d) {
        if (g instanceof Date && V instanceof Date)
          return g.getTime() - V.getTime();
        if ([g, V] = [g, V].map((f) => f != null ? f.toString().toLocaleLowerCase() : f), g !== V)
          return Qt(g) && Qt(V) ? 0 : Qt(g) ? -1 : Qt(V) ? 1 : !isNaN(g) && !isNaN(V) ? Number(g) - Number(V) : l.compare(g, V);
      }
    }
    return 0;
  }).map((o) => {
    let [s] = o;
    return s;
  });
}
const zo = K({
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
  ...rl()
}, "VDataTableHeaders"), ma = ne()({
  name: "VDataTableHeaders",
  props: zo(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const {
      t: a
    } = ot(), {
      toggleSort: l,
      sortBy: i,
      isSorted: o
    } = Ho(), {
      someSelected: s,
      allSelected: u,
      selectAll: r,
      showSelectAll: c
    } = Pa(), {
      columns: d,
      headers: m
    } = Ca(), {
      loaderClasses: v
    } = sl(e);
    function g(B, T) {
      if (!(!(e.sticky || e.fixedHeader) && !B.fixed))
        return {
          position: "sticky",
          left: B.fixed ? he(B.fixedOffset) : void 0,
          top: e.sticky || e.fixedHeader ? `calc(var(--v-table-header-height) * ${T})` : void 0
        };
    }
    function V(B, T) {
      B.key === "Enter" && !e.disableSort && l(T);
    }
    function y(B) {
      const T = i.value.find(($) => $.key === B.key);
      return T ? T.order === "asc" ? e.sortAscIcon : e.sortDescIcon : e.sortAscIcon;
    }
    const {
      backgroundColorClasses: p,
      backgroundColorStyles: f
    } = ct(() => e.color), {
      displayClasses: I,
      mobile: x
    } = yt(e), k = A(() => ({
      headers: m.value,
      columns: d.value,
      toggleSort: l,
      isSorted: o,
      sortBy: i.value,
      someSelected: s.value,
      allSelected: u.value,
      selectAll: r,
      getSortIcon: y
    })), w = A(() => ["v-data-table__th", {
      "v-data-table__th--sticky": e.sticky || e.fixedHeader
    }, I.value, v.value]), P = (B) => {
      let {
        column: T,
        x: $,
        y: D
      } = B;
      const R = T.key === "data-table-select" || T.key === "data-table-expand", z = L(e.headerProps ?? {}, T.headerProps ?? {});
      return h(fa, L({
        tag: "th",
        align: T.align,
        class: [{
          "v-data-table__th--sortable": T.sortable && !e.disableSort,
          "v-data-table__th--sorted": o(T),
          "v-data-table__th--fixed": T.fixed
        }, ...w.value],
        style: {
          width: he(T.width),
          minWidth: he(T.minWidth),
          maxWidth: he(T.maxWidth),
          ...g(T, D)
        },
        colspan: T.colspan,
        rowspan: T.rowspan,
        onClick: T.sortable ? () => l(T) : void 0,
        fixed: T.fixed,
        nowrap: T.nowrap,
        lastFixed: T.lastFixed,
        noPadding: R
      }, z, {
        onKeydown: (W) => T.sortable && V(W, T)
      }), {
        default: () => {
          var te;
          const W = `header.${T.key}`, G = {
            column: T,
            selectAll: r,
            isSorted: o,
            toggleSort: l,
            sortBy: i.value,
            someSelected: s.value,
            allSelected: u.value,
            getSortIcon: y
          };
          return t[W] ? t[W](G) : T.key === "data-table-select" ? ((te = t["header.data-table-select"]) == null ? void 0 : te.call(t, G)) ?? (c.value && h(St, {
            modelValue: u.value,
            indeterminate: s.value && !u.value,
            "onUpdate:modelValue": r
          }, null)) : C("div", {
            class: "v-data-table-header__content"
          }, [C("span", null, [T.title]), T.sortable && !e.disableSort && h(ke, {
            key: "icon",
            class: "v-data-table-header__sort-icon",
            icon: y(T)
          }, null), e.multiSort && o(T) && C("div", {
            key: "badge",
            class: fe(["v-data-table-header__sort-badge", ...p.value]),
            style: Ve(f.value)
          }, [i.value.findIndex((ae) => ae.key === T.key) + 1])]);
        }
      });
    }, b = () => {
      const B = A(() => d.value.filter(($) => ($ == null ? void 0 : $.sortable) && !e.disableSort)), T = A(() => {
        if (d.value.find((D) => D.key === "data-table-select") != null)
          return u.value ? "$checkboxOn" : s.value ? "$checkboxIndeterminate" : "$checkboxOff";
      });
      return h(fa, L({
        tag: "th",
        class: [...w.value],
        colspan: m.value.length + 1
      }, e.headerProps), {
        default: () => [C("div", {
          class: "v-data-table-header__content"
        }, [h(Vl, {
          chips: !0,
          class: "v-data-table__td-sort-select",
          clearable: !0,
          density: "default",
          items: B.value,
          label: a("$vuetify.dataTable.sortBy"),
          multiple: e.multiSort,
          variant: "underlined",
          "onClick:clear": () => i.value = [],
          appendIcon: T.value,
          "onClick:append": () => r(!u.value)
        }, {
          ...t,
          chip: ($) => {
            var D;
            return h(wl, {
              onClick: (D = $.item.raw) != null && D.sortable ? () => l($.item.raw) : void 0,
              onMousedown: (R) => {
                R.preventDefault(), R.stopPropagation();
              }
            }, {
              default: () => [$.item.title, h(ke, {
                class: fe(["v-data-table__td-sort-icon", o($.item.raw) && "v-data-table__td-sort-icon-active"]),
                icon: y($.item.raw),
                size: "small"
              }, null)]
            });
          }
        })])]
      });
    };
    ie(() => x.value ? C("tr", null, [h(b, null, null)]) : C(X, null, [t.headers ? t.headers(k.value) : m.value.map((B, T) => C("tr", null, [B.map(($, D) => h(P, {
      column: $,
      x: D,
      y: T
    }, null))])), e.loading && C("tr", {
      class: "v-data-table-progress"
    }, [C("th", {
      colspan: d.value.length
    }, [h(ul, {
      name: "v-data-table-progress",
      absolute: !0,
      active: !0,
      color: typeof e.loading == "boolean" ? void 0 : e.loading,
      indeterminate: !0
    }, {
      default: t.loader
    })])])]));
  }
}), zr = K({
  groupBy: {
    type: Array,
    default: () => []
  }
}, "DataTable-group"), Wo = Symbol.for("vuetify:data-table-group");
function Uo(e) {
  return {
    groupBy: we(e, "groupBy")
  };
}
function jo(e) {
  const {
    disableSort: n,
    groupBy: t,
    sortBy: a
  } = e, l = q(/* @__PURE__ */ new Set()), i = A(() => t.value.map((c) => ({
    ...c,
    order: c.order ?? !1
  })).concat(n != null && n.value ? [] : a.value));
  function o(c) {
    return l.value.has(c.id);
  }
  function s(c) {
    const d = new Set(l.value);
    o(c) ? d.delete(c.id) : d.add(c.id), l.value = d;
  }
  function u(c) {
    function d(m) {
      const v = [];
      for (const g of m.items)
        "type" in g && g.type === "group" ? v.push(...d(g)) : v.push(g);
      return [...new Set(v)];
    }
    return d({
      items: c
    });
  }
  const r = {
    sortByWithGroups: i,
    toggleGroup: s,
    opened: l,
    groupBy: t,
    extractRows: u,
    isGroupOpen: o
  };
  return We(Wo, r), r;
}
function Ko() {
  const e = ve(Wo);
  if (!e) throw new Error("Missing group!");
  return e;
}
function Wr(e, n) {
  if (!e.length) return [];
  const t = /* @__PURE__ */ new Map();
  for (const a of e) {
    const l = ia(a.raw, n);
    t.has(l) || t.set(l, []), t.get(l).push(a);
  }
  return t;
}
function Go(e, n) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "root";
  if (!n.length) return [];
  const l = Wr(e, n[0]), i = [], o = n.slice(1);
  return l.forEach((s, u) => {
    const r = n[0], c = `${a}_${r}_${u}`;
    i.push({
      depth: t,
      id: c,
      key: r,
      value: u,
      items: o.length ? Go(s, o, t + 1, c) : s,
      type: "group"
    });
  }), i;
}
function Yo(e, n) {
  const t = [];
  for (const a of e)
    "type" in a && a.type === "group" ? (a.value != null && t.push(a), (n.has(a.id) || a.value == null) && t.push(...Yo(a.items, n))) : t.push(a);
  return t;
}
function qo(e, n, t) {
  return {
    flatItems: A(() => {
      if (!n.value.length) return e.value;
      const l = Go(e.value, n.value.map((i) => i.key));
      return Yo(l, t.value);
    })
  };
}
const Ur = K({
  item: {
    type: Object,
    required: !0
  }
}, "VDataTableGroupHeaderRow"), jr = ne()({
  name: "VDataTableGroupHeaderRow",
  props: Ur(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const {
      isGroupOpen: a,
      toggleGroup: l,
      extractRows: i
    } = Ko(), {
      isSelected: o,
      isSomeSelected: s,
      select: u
    } = Pa(), {
      columns: r
    } = Ca(), c = A(() => i([e.item]));
    return () => C("tr", {
      class: "v-data-table-group-header-row",
      style: {
        "--v-data-table-group-header-row-depth": e.item.depth
      }
    }, [r.value.map((d) => {
      var m, v;
      if (d.key === "data-table-group") {
        const g = a(e.item) ? "$expand" : "$next", V = () => l(e.item);
        return ((m = t["data-table-group"]) == null ? void 0 : m.call(t, {
          item: e.item,
          count: c.value.length,
          props: {
            icon: g,
            onClick: V
          }
        })) ?? h(fa, {
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
        const g = o(c.value), V = s(c.value) && !g, y = (p) => u(c.value, p);
        return ((v = t["data-table-select"]) == null ? void 0 : v.call(t, {
          props: {
            modelValue: g,
            indeterminate: V,
            "onUpdate:modelValue": y
          }
        })) ?? C("td", null, [h(St, {
          modelValue: g,
          indeterminate: V,
          "onUpdate:modelValue": y
        }, null)]);
      }
      return C("td", null, null);
    })]);
  }
}), Kr = K({
  expandOnClick: Boolean,
  showExpand: Boolean,
  expanded: {
    type: Array,
    default: () => []
  }
}, "DataTable-expand"), Xo = Symbol.for("vuetify:datatable:expanded");
function Zo(e) {
  const n = H(() => e.expandOnClick), t = we(e, "expanded", e.expanded, (s) => new Set(s), (s) => [...s.values()]);
  function a(s, u) {
    const r = new Set(t.value);
    u ? r.add(s.value) : r.delete(s.value), t.value = r;
  }
  function l(s) {
    return t.value.has(s.value);
  }
  function i(s) {
    a(s, !l(s));
  }
  const o = {
    expand: a,
    expanded: t,
    expandOnClick: n,
    isExpanded: l,
    toggleExpand: i
  };
  return We(Xo, o), o;
}
function Qo() {
  const e = ve(Xo);
  if (!e) throw new Error("foo");
  return e;
}
const Gr = K({
  index: Number,
  item: Object,
  cellProps: [Object, Function],
  onClick: Ze(),
  onContextmenu: Ze(),
  onDblclick: Ze(),
  ...Yt()
}, "VDataTableRow"), Yr = ne()({
  name: "VDataTableRow",
  props: Gr(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const {
      displayClasses: a,
      mobile: l
    } = yt(e, "v-data-table__tr"), {
      isSelected: i,
      toggleSelect: o,
      someSelected: s,
      allSelected: u,
      selectAll: r
    } = Pa(), {
      isExpanded: c,
      toggleExpand: d
    } = Qo(), {
      toggleSort: m,
      sortBy: v,
      isSorted: g
    } = Ho(), {
      columns: V
    } = Ca();
    ie(() => C("tr", {
      class: fe(["v-data-table__tr", {
        "v-data-table__tr--clickable": !!(e.onClick || e.onContextmenu || e.onDblclick)
      }, a.value]),
      onClick: e.onClick,
      onContextmenu: e.onContextmenu,
      onDblclick: e.onDblclick
    }, [e.item && V.value.map((y, p) => {
      const f = e.item, I = `item.${y.key}`, x = `header.${y.key}`, k = {
        index: e.index,
        item: f.raw,
        internalItem: f,
        value: ia(f.columns, y.key),
        column: y,
        isSelected: i,
        toggleSelect: o,
        isExpanded: c,
        toggleExpand: d
      }, w = {
        column: y,
        selectAll: r,
        isSorted: g,
        toggleSort: m,
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
      return h(fa, L({
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
          var T, $, D, R;
          if (y.key === "data-table-select")
            return ((T = t["item.data-table-select"]) == null ? void 0 : T.call(t, {
              ...k,
              props: {
                disabled: !f.selectable,
                modelValue: i([f]),
                onClick: Ie(() => o(f), ["stop"])
              }
            })) ?? h(St, {
              disabled: !f.selectable,
              modelValue: i([f]),
              onClick: Ie((z) => o(f, e.index, z), ["stop"])
            }, null);
          if (y.key === "data-table-expand")
            return (($ = t["item.data-table-expand"]) == null ? void 0 : $.call(t, {
              ...k,
              props: {
                icon: c(f) ? "$collapse" : "$expand",
                size: "small",
                variant: "text",
                onClick: Ie(() => d(f), ["stop"])
              }
            })) ?? h(pe, {
              icon: c(f) ? "$collapse" : "$expand",
              size: "small",
              variant: "text",
              onClick: Ie(() => d(f), ["stop"])
            }, null);
          if (t[I] && !l.value) return t[I](k);
          const B = Re(k.value);
          return l.value ? C(X, null, [C("div", {
            class: "v-data-table__td-title"
          }, [((D = t[x]) == null ? void 0 : D.call(t, w)) ?? y.title]), C("div", {
            class: "v-data-table__td-value"
          }, [((R = t[I]) == null ? void 0 : R.call(t, k)) ?? B])]) : B;
        }
      });
    })]));
  }
}), Jo = K({
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
}, "VDataTableRows"), ga = ne()({
  name: "VDataTableRows",
  inheritAttrs: !1,
  props: Jo(),
  setup(e, n) {
    let {
      attrs: t,
      slots: a
    } = n;
    const {
      columns: l
    } = Ca(), {
      expandOnClick: i,
      toggleExpand: o,
      isExpanded: s
    } = Qo(), {
      isSelected: u,
      toggleSelect: r
    } = Pa(), {
      toggleGroup: c,
      isGroupOpen: d
    } = Ko(), {
      t: m
    } = ot(), {
      mobile: v
    } = yt(e);
    return ie(() => {
      var g, V;
      return e.loading && (!e.items.length || a.loading) ? C("tr", {
        class: "v-data-table-rows-loading",
        key: "loading"
      }, [C("td", {
        colspan: l.value.length
      }, [((g = a.loading) == null ? void 0 : g.call(a)) ?? m(e.loadingText)])]) : !e.loading && !e.items.length && !e.hideNoData ? C("tr", {
        class: "v-data-table-rows-no-data",
        key: "no-data"
      }, [C("td", {
        colspan: l.value.length
      }, [((V = a["no-data"]) == null ? void 0 : V.call(a)) ?? m(e.noDataText)])]) : C(X, null, [e.items.map((y, p) => {
        var x;
        if (y.type === "group") {
          const k = {
            index: p,
            item: y,
            columns: l.value,
            isExpanded: s,
            toggleExpand: o,
            isSelected: u,
            toggleSelect: r,
            toggleGroup: c,
            isGroupOpen: d
          };
          return a["group-header"] ? a["group-header"](k) : h(jr, L({
            key: `group-header_${y.id}`,
            item: y
          }, Nl(t, ":group-header", () => k)), a);
        }
        const f = {
          index: p,
          item: y.raw,
          internalItem: y,
          columns: l.value,
          isExpanded: s,
          toggleExpand: o,
          isSelected: u,
          toggleSelect: r
        }, I = {
          ...f,
          props: L({
            key: `item_${y.key ?? y.index}`,
            onClick: i.value ? () => {
              o(y);
            } : void 0,
            index: p,
            item: y,
            cellProps: e.cellProps,
            mobile: v.value
          }, Nl(t, ":row", () => f), typeof e.rowProps == "function" ? e.rowProps({
            item: f.item,
            index: f.index,
            internalItem: f.internalItem
          }) : e.rowProps)
        };
        return C(X, {
          key: I.props.key
        }, [a.item ? a.item(I) : h(Yr, I.props, a), s(y) && ((x = a["expanded-row"]) == null ? void 0 : x.call(a, f))]);
      })]);
    }), {};
  }
}), ei = K({
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  height: [Number, String],
  hover: Boolean,
  ...xe(),
  ...gt(),
  ...je(),
  ...Ne()
}, "VTable"), ya = ne()({
  name: "VTable",
  props: ei(),
  setup(e, n) {
    let {
      slots: t,
      emit: a
    } = n;
    const {
      themeClasses: l
    } = Ye(e), {
      densityClasses: i
    } = Et(e);
    return ie(() => h(e.tag, {
      class: fe(["v-table", {
        "v-table--fixed-height": !!e.height,
        "v-table--fixed-header": e.fixedHeader,
        "v-table--fixed-footer": e.fixedFooter,
        "v-table--has-top": !!t.top,
        "v-table--has-bottom": !!t.bottom,
        "v-table--hover": e.hover
      }, l.value, i.value, e.class]),
      style: Ve(e.style)
    }, {
      default: () => {
        var o, s, u;
        return [(o = t.top) == null ? void 0 : o.call(t), t.default ? C("div", {
          class: "v-table__wrapper",
          style: {
            height: he(e.height)
          }
        }, [C("table", null, [t.default()])]) : (s = t.wrapper) == null ? void 0 : s.call(t), (u = t.bottom) == null ? void 0 : u.call(t)];
      }
    })), {};
  }
}), qr = K({
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
function Xr(e, n, t, a) {
  const l = e.returnObject ? n : Ct(n, e.itemValue), i = Ct(n, e.itemSelectable, !0), o = a.reduce((s, u) => (u.key != null && (s[u.key] = Ct(n, u.value)), s), {});
  return {
    type: "item",
    key: e.returnObject ? Ct(n, e.itemValue) : l,
    index: t,
    value: l,
    selectable: i,
    columns: o,
    raw: n
  };
}
function Zr(e, n, t) {
  return n.map((a, l) => Xr(e, a, l, t));
}
function ti(e, n) {
  return {
    items: A(() => Zr(e, e.items, n.value))
  };
}
function ai(e) {
  let {
    page: n,
    itemsPerPage: t,
    sortBy: a,
    groupBy: l,
    search: i
  } = e;
  const o = lt("VDataTable"), s = () => ({
    page: n.value,
    itemsPerPage: t.value,
    sortBy: a.value,
    groupBy: l.value,
    search: i.value
  });
  let u = null;
  J(s, (r) => {
    st(u, r) || (u && u.search !== r.search && (n.value = 1), o.emit("update:options", r), u = r);
  }, {
    deep: !0,
    immediate: !0
  });
}
const li = K({
  ...Jo(),
  hideDefaultBody: Boolean,
  hideDefaultFooter: Boolean,
  hideDefaultHeader: Boolean,
  width: [String, Number],
  search: String,
  ...Kr(),
  ...zr(),
  ...Br(),
  ...qr(),
  ...Dr(),
  ...Lr(),
  ...zo(),
  ...ei()
}, "DataTable"), Qr = K({
  ...Co(),
  ...li(),
  ...ho(),
  ...Cl()
}, "VDataTable");
ne()({
  name: "VDataTable",
  props: Qr(),
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
    } = Uo(e), {
      sortBy: i,
      multiSort: o,
      mustSort: s
    } = Lo(e), {
      page: u,
      itemsPerPage: r
    } = Io(e), {
      disableSort: c
    } = tl(e), {
      columns: d,
      headers: m,
      sortFunctions: v,
      sortRawFunctions: g,
      filterFunctions: V
    } = Eo(e, {
      groupBy: l,
      showSelect: H(() => e.showSelect),
      showExpand: H(() => e.showExpand)
    }), {
      items: y
    } = ti(e, d), p = H(() => e.search), {
      filteredItems: f
    } = bo(e, y, p, {
      transform: (Z) => Z.columns,
      customKeyFilter: V
    }), {
      toggleSort: I
    } = No({
      sortBy: i,
      multiSort: o,
      mustSort: s,
      page: u
    }), {
      sortByWithGroups: x,
      opened: k,
      extractRows: w,
      isGroupOpen: P,
      toggleGroup: b
    } = jo({
      groupBy: l,
      sortBy: i,
      disableSort: c
    }), {
      sortedItems: B
    } = Nr(e, f, x, {
      transform: (Z) => ({
        ...Z.raw,
        ...Z.columns
      }),
      sortFunctions: v,
      sortRawFunctions: g
    }), {
      flatItems: T
    } = qo(B, l, k), $ = A(() => T.value.length), {
      startIndex: D,
      stopIndex: R,
      pageCount: z,
      setItemsPerPage: W
    } = Ao({
      page: u,
      itemsPerPage: r,
      itemsLength: $
    }), {
      paginatedItems: G
    } = _r({
      items: T,
      startIndex: D,
      stopIndex: R,
      itemsPerPage: r
    }), te = A(() => w(G.value)), {
      isSelected: ae,
      select: re,
      selectAll: _,
      toggleSelect: E,
      someSelected: F,
      allSelected: U
    } = Mo(e, {
      allItems: y,
      currentPage: te
    }), {
      isExpanded: be,
      toggleExpand: le
    } = Zo(e);
    ai({
      page: u,
      itemsPerPage: r,
      sortBy: i,
      groupBy: l,
      search: p
    }), at({
      VDataTableRows: {
        hideNoData: H(() => e.hideNoData),
        noDataText: H(() => e.noDataText),
        loading: H(() => e.loading),
        loadingText: H(() => e.loadingText)
      }
    });
    const se = A(() => ({
      page: u.value,
      itemsPerPage: r.value,
      sortBy: i.value,
      pageCount: z.value,
      toggleSort: I,
      setItemsPerPage: W,
      someSelected: F.value,
      allSelected: U.value,
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
      groupedItems: G.value,
      columns: d.value,
      headers: m.value
    }));
    return ie(() => {
      const Z = va.filterProps(e), ce = ma.filterProps(e), ge = ga.filterProps(e), N = ya.filterProps(e);
      return h(ya, L({
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
          return (Q = a.top) == null ? void 0 : Q.call(a, se.value);
        },
        default: () => {
          var Q, de, ye, Ce, Ee, Le;
          return a.default ? a.default(se.value) : C(X, null, [(Q = a.colgroup) == null ? void 0 : Q.call(a, se.value), !e.hideDefaultHeader && C("thead", {
            key: "thead"
          }, [h(ma, ce, a)]), (de = a.thead) == null ? void 0 : de.call(a, se.value), !e.hideDefaultBody && C("tbody", null, [(ye = a["body.prepend"]) == null ? void 0 : ye.call(a, se.value), a.body ? a.body(se.value) : h(ga, L(t, ge, {
            items: G.value
          }), a), (Ce = a["body.append"]) == null ? void 0 : Ce.call(a, se.value)]), (Ee = a.tbody) == null ? void 0 : Ee.call(a, se.value), (Le = a.tfoot) == null ? void 0 : Le.call(a, se.value)]);
        },
        bottom: () => a.bottom ? a.bottom(se.value) : !e.hideDefaultFooter && C(X, null, [h(Sa, null, null), h(va, Z, {
          prepend: a["footer.prepend"]
        })])
      });
    }), {};
  }
});
const Jr = K({
  itemsLength: {
    type: [Number, String],
    required: !0
  },
  ...Co(),
  ...li(),
  ...Cl()
}, "VDataTableServer"), ec = ne()({
  name: "VDataTableServer",
  props: Jr(),
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
    } = Uo(e), {
      sortBy: i,
      multiSort: o,
      mustSort: s
    } = Lo(e), {
      page: u,
      itemsPerPage: r
    } = Io(e), {
      disableSort: c
    } = tl(e), d = A(() => parseInt(e.itemsLength, 10)), {
      columns: m,
      headers: v
    } = Eo(e, {
      groupBy: l,
      showSelect: H(() => e.showSelect),
      showExpand: H(() => e.showExpand)
    }), {
      items: g
    } = ti(e, m), {
      toggleSort: V
    } = No({
      sortBy: i,
      multiSort: o,
      mustSort: s,
      page: u
    }), {
      opened: y,
      isGroupOpen: p,
      toggleGroup: f,
      extractRows: I
    } = jo({
      groupBy: l,
      sortBy: i,
      disableSort: c
    }), {
      pageCount: x,
      setItemsPerPage: k
    } = Ao({
      page: u,
      itemsPerPage: r,
      itemsLength: d
    }), {
      flatItems: w
    } = qo(g, l, y), {
      isSelected: P,
      select: b,
      selectAll: B,
      toggleSelect: T,
      someSelected: $,
      allSelected: D
    } = Mo(e, {
      allItems: g,
      currentPage: g
    }), {
      isExpanded: R,
      toggleExpand: z
    } = Zo(e), W = A(() => I(g.value));
    ai({
      page: u,
      itemsPerPage: r,
      sortBy: i,
      groupBy: l,
      search: H(() => e.search)
    }), We("v-data-table", {
      toggleSort: V,
      sortBy: i
    }), at({
      VDataTableRows: {
        hideNoData: H(() => e.hideNoData),
        noDataText: H(() => e.noDataText),
        loading: H(() => e.loading),
        loadingText: H(() => e.loadingText)
      }
    });
    const G = A(() => ({
      page: u.value,
      itemsPerPage: r.value,
      sortBy: i.value,
      pageCount: x.value,
      toggleSort: V,
      setItemsPerPage: k,
      someSelected: $.value,
      allSelected: D.value,
      isSelected: P,
      select: b,
      selectAll: B,
      toggleSelect: T,
      isExpanded: R,
      toggleExpand: z,
      isGroupOpen: p,
      toggleGroup: f,
      items: W.value.map((te) => te.raw),
      internalItems: W.value,
      groupedItems: w.value,
      columns: m.value,
      headers: v.value
    }));
    ie(() => {
      const te = va.filterProps(e), ae = ma.filterProps(e), re = ga.filterProps(e), _ = ya.filterProps(e);
      return h(ya, L({
        class: ["v-data-table", {
          "v-data-table--loading": e.loading
        }, e.class],
        style: e.style
      }, _, {
        fixedHeader: e.fixedHeader || e.sticky
      }), {
        top: () => {
          var E;
          return (E = a.top) == null ? void 0 : E.call(a, G.value);
        },
        default: () => {
          var E, F, U, be, le, se;
          return a.default ? a.default(G.value) : C(X, null, [(E = a.colgroup) == null ? void 0 : E.call(a, G.value), !e.hideDefaultHeader && C("thead", {
            key: "thead",
            class: "v-data-table__thead",
            role: "rowgroup"
          }, [h(ma, ae, a)]), (F = a.thead) == null ? void 0 : F.call(a, G.value), !e.hideDefaultBody && C("tbody", {
            class: "v-data-table__tbody",
            role: "rowgroup"
          }, [(U = a["body.prepend"]) == null ? void 0 : U.call(a, G.value), a.body ? a.body(G.value) : h(ga, L(t, re, {
            items: w.value
          }), a), (be = a["body.append"]) == null ? void 0 : be.call(a, G.value)]), (le = a.tbody) == null ? void 0 : le.call(a, G.value), (se = a.tfoot) == null ? void 0 : se.call(a, G.value)]);
        },
        bottom: () => a.bottom ? a.bottom(G.value) : !e.hideDefaultFooter && C(X, null, [h(Sa, null, null), h(va, te, {
          prepend: a["footer.prepend"]
        })])
      });
    });
  }
}), ni = /* @__PURE__ */ Me({
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
    const n = ut(), t = as(n, "item.", { exclude: ["item.actions", "item.image"] });
    ve("panel"), ve("user");
    const a = e, l = A(() => {
      const o = [];
      return (a.image || n["item.image"]) && o.push({ key: "image", title: "" }), o.concat(
        a.headers.reduce((s, u) => (s.push(
          typeof u == "string" ? { key: u, title: oe(Ti.field(u)) } : { key: u.key, title: oe(u.title) }
        ), s), [])
      );
    });
    function i(o) {
      const s = {
        ...a.list.filters,
        page: o.page,
        page_size: o.itemsPerPage,
        ordering: o.sortBy.map(({ key: u, order: r }) => r == "asc" ? u : `-${u}`)
      };
      a.list.page_size = o.itemsPerPage, a.list.load({ params: s });
    }
    return (o, s) => {
      var u;
      return M(), Y(ec, {
        items: a.items,
        "item-index": "id",
        "items-length": a.list.count || a.items.length,
        "items-per-page": a.list.page_size,
        "hide-default-footer": (a.list.count || a.items.length || 0) < a.list.page_size,
        loading: (u = a.list.state) == null ? void 0 : u.isProcessing,
        headers: l.value,
        "no-data-text": S(oe)("lists.empty"),
        class: "align-top-table",
        "onUpdate:options": i
      }, it({
        "item.actions": O(({ item: r }) => [
          h(S(Vo), {
            button: "",
            item: r,
            edit: a.edit
          }, null, 8, ["item", "edit"]),
          j(o.$slots, "item.actions", {
            item: r,
            dense: !0,
            button: !0
          })
        ]),
        _: 2
      }, [
        S(n)["item.image"] ? {
          name: "item.image",
          fn: O(({ item: r }) => [
            j(o.$slots, "item.image", { item: r }, () => [
              r[a.image] ? (M(), Y($t, {
                key: 0,
                src: r[a.image],
                class: "preview",
                cover: "",
                "max-height": "200"
              }, null, 8, ["src"])) : ue("", !0)
            ])
          ]),
          key: "0"
        } : void 0,
        Te(S(t), (r, c) => ({
          name: c,
          fn: O((d) => [
            j(o.$slots, c, Be($e(d)))
          ])
        }))
      ]), 1032, ["items", "items-length", "items-per-page", "hide-default-footer", "loading", "headers", "no-data-text"]);
    };
  }
}), tc = { class: "d-flex flex-no-wrap justify-space-between" }, ac = { key: 0 }, lc = { key: 0 }, nc = /* @__PURE__ */ Me({
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
    const n = ut(), t = rt(n, "item.", { exclude: ["item.actions", "item.image"] }), a = e, l = A(() => {
      if (!a.headers)
        return [];
      const o = [];
      for (var s of a.headers)
        s = typeof s == "string" ? { key: s, title: oe("fields." + s) } : { ...s }, s.slot = `item.${s.key}`, o.push(s);
      return o;
    }), i = A(() => {
      var o;
      return /* @__PURE__ */ new Set([
        l.value[0].key,
        (o = l.value[1]) == null ? void 0 : o.key,
        a.image
      ]);
    });
    return Ge(() => !a.list.length && a.list.load()), (o, s) => (M(), Y(xn, { class: "card-grid" }, {
      default: O(() => [
        (M(!0), me(X, null, Te(a.items, (u) => {
          var r, c;
          return M(), Y(ko, {
            key: u.id,
            density: "compact",
            title: l.value[0].key && u[l.value[0].key],
            subtitle: ((r = l.value[1]) == null ? void 0 : r.key) && u[l.value[1].key]
          }, it({
            default: O(() => [
              C("div", tc, [
                S(n)["item.image"] || a.image ? (M(), me("div", ac, [
                  h(wt, {
                    rounded: "0",
                    size: "125"
                  }, {
                    default: O(() => [
                      j(o.$slots, "item.image", { item: u }, () => [
                        h($t, {
                          src: a.image
                        }, null, 8, ["src"])
                      ], !0)
                    ]),
                    _: 2
                  }, 1024)
                ])) : ue("", !0),
                C("div", null, [
                  !S(n)["item.default"] && (l.value.length > 2 || S(t).length) ? (M(), Y(xo, { key: 0 }, {
                    default: O(() => [
                      C("div", null, [
                        (M(!0), me(X, null, Te(l.value, (d) => (M(), me(X, null, [
                          i.value.has(d.key) ? ue("", !0) : (M(), me("div", lc, [
                            h(bl, {
                              text: d.title + ":",
                              class: "mr-2"
                            }, null, 8, ["text"]),
                            j(o.$slots, d.slot, { item: u }, () => [
                              S(ea.isEmpty)(u[d.key]) ? ue("", !0) : (M(), me(X, { key: 0 }, [
                                Pe(Re(u[d.key]), 1)
                              ], 64))
                            ], !0)
                          ]))
                        ], 64))), 256))
                      ])
                    ]),
                    _: 2
                  }, 1024)) : ue("", !0),
                  h(wo, null, {
                    default: O(() => [
                      h(S(Vo), {
                        button: "",
                        item: u,
                        edit: a.edit,
                        size: "small"
                      }, null, 8, ["item", "edit"]),
                      j(o.$slots, "item.actions", {
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
            S(n)[l.value[0].slot] ? {
              name: "title",
              fn: O(() => [
                j(o.$slots, l.value[0].slot, { item: u }, void 0, !0)
              ]),
              key: "0"
            } : void 0,
            S(n)[(c = l.value[1]) == null ? void 0 : c.slot] ? {
              name: "subtitle",
              fn: O(() => [
                j(o.$slots, l.value[1].slot, { item: u }, void 0, !0)
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["title", "subtitle"]);
        }), 128))
      ]),
      _: 3
    }));
  }
}), oc = (e, n) => {
  const t = e.__vccOpts || e;
  for (const [a, l] of n)
    t[a] = l;
  return t;
}, oi = /* @__PURE__ */ oc(nc, [["__scopeId", "data-v-5bbb1bbb"]]), Ia = {
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
    const n = ut(), t = e;
    let a = q(!1);
    J(() => t.state.state, (o) => {
      t.delay && o == ls.PROCESSING && (a.value = !1, window.setTimeout(() => {
        a.value = !0;
      }, 5e3));
    });
    const l = A(() => {
      var o;
      return ((o = t.state) == null ? void 0 : o.isProcessing) && (!t.delay || a.value);
    }), i = A(() => {
      var o, s;
      return (s = (o = t.state) == null ? void 0 : o.data) == null ? void 0 : s.messages;
    });
    return (o, s) => (M(), me(X, null, [
      t.state.isNone && S(n).none ? (M(), Y(S(Ft), {
        key: 0,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        state: e.state,
        title: e.noneTitle
      }, {
        default: O(() => [
          j(o.$slots, "none", { state: e.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : l.value ? (M(), Y(S(Ft), {
        key: 1,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: e.state,
        title: e.processingTitle
      }, {
        default: O(() => [
          j(o.$slots, "processing", { state: e.state }, () => [
            s[0] || (s[0] = Pe(" Data are being sent to server, please be patient. If this message persist you might wan't to retry. "))
          ])
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isError ? (M(), Y(S(Ft), {
        key: 2,
        type: "error",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: e.state,
        title: e.errorTitle
      }, {
        default: O(() => [
          j(o.$slots, "error", { state: e.state }, () => [
            s[1] || (s[1] = Pe(" Oups... something wrong happened. "))
          ]),
          j(o.$slots, "error-detail", { state: e.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isOk ? (M(), Y(S(Ft), {
        key: 3,
        type: "success",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: e.state,
        title: e.okTitle
      }, {
        default: O(() => [
          j(o.$slots, "ok", { state: e.state }, () => [
            s[2] || (s[2] = C("p", null, "Congrats! Data have been updated.", -1))
          ]),
          i.value ? (M(), me(X, { key: 0 }, [
            h(Sa),
            (M(!0), me(X, null, Te(i.value, (u) => (M(), me("p", null, Re(u), 1))), 256))
          ], 64)) : ue("", !0),
          j(o.$slots, "ok-detail", { state: e.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : ue("", !0),
      j(o.$slots, "default", {
        state: t.state
      })
    ], 64));
  }
}, ic = { class: "text-right" }, Il = {
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
    return (l, i) => (M(), me("div", ic, [
      h(pe, {
        color: "error",
        class: "me-2",
        "prepend-icon": a.resetIcon,
        onClick: i[0] || (i[0] = (o) => t("reset")),
        disabled: a.disabled
      }, {
        default: O(() => [
          j(l.$slots, "discard", {}, () => [
            Pe(Re(a.resetLabel || S(Ba)("actions.discard")), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]),
      a.state.isSending || a.state.isProcessing ? (M(), Y(pe, {
        key: 0,
        color: "primary",
        "prepend-icon": a.processingIcon,
        disabled: ""
      }, {
        default: O(() => [
          j(l.$slots, "processing", {}, () => [
            Pe(Re(a.processingLabel || S(Ba)("actions.saving")), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon"])) : (M(), Y(pe, {
        key: 1,
        color: "primary",
        "prepend-icon": a.validateIcon,
        onClick: i[1] || (i[1] = (o) => t("validate")),
        disabled: a.disabled || a.validateDisabled
      }, {
        default: O(() => [
          j(l.$slots, "validate", {}, () => [
            Pe(Re(a.validateLabel || S(Ba)("actions.save")), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]))
    ]));
  }
}, sc = { key: 0 }, uc = { class: "text-right mt-3" }, rc = {
  __name: "OxLogin",
  props: {
    next: { type: String },
    url: { type: String }
  },
  emits: ["save", "saved"],
  setup(e, { emit: n }) {
    const t = un("password"), a = e, l = Qe({
      username: "",
      password: ""
    }), i = q(!1), o = Qe(new ns());
    function s(r = !0) {
      is(l, { username: "", password: "" }), r && o.none();
    }
    async function u() {
      o.processing();
      try {
        const r = await fetch(a.url, {
          method: "POST",
          headers: os.axiosConfig.headers,
          body: JSON.stringify(l)
        });
        r.status == 200 ? (l.credentials = "", l.password = "", o.ok(await r.json()), a.next && (window.location.href = a.next)) : o.error(await r.json());
      } catch (r) {
        o.ok((r == null ? void 0 : r.message) || r);
      }
    }
    return (r, c) => (M(), me(X, null, [
      h(S(Ia), { state: o }, {
        none: O(({ state: d }) => c[7] || (c[7] = [
          C("p", null, "Please enter your credentials in order too proceed...", -1)
        ])),
        "ok-detail": O(({ state: d }) => [
          a.next ? (M(), me("p", sc, [
            c[8] || (c[8] = Pe("You soon will be redirected to ")),
            C("i", null, Re(a.next), 1)
          ])) : ue("", !0)
        ]),
        _: 1
      }, 8, ["state"]),
      o.isOk ? ue("", !0) : (M(), me(X, { key: 0 }, [
        h(vt, {
          variant: "underlined",
          label: "Enter login",
          modelValue: l.username,
          "onUpdate:modelValue": c[0] || (c[0] = (d) => l.username = d),
          onKeyup: c[1] || (c[1] = Bl(Ie((d) => t.value.focus(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue"]),
        h(vt, {
          variant: "underlined",
          ref: "password",
          label: "Enter password",
          modelValue: l.password,
          "onUpdate:modelValue": c[2] || (c[2] = (d) => l.password = d),
          type: i.value ? "text" : "password",
          "append-icon": i.value ? "mdi-eye" : "mdi-eye-off",
          "onClick:append": c[3] || (c[3] = (d) => i.value = !i.value),
          onKeyup: c[4] || (c[4] = Bl(Ie((d) => u(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue", "type", "append-icon"]),
        C("div", uc, [
          j(r.$slots, "default", {
            value: l.password
          }, () => [
            l.username && l.password ? (M(), Y(Il, {
              key: 0,
              "validate-label": "Login!",
              onValidate: c[5] || (c[5] = (d) => u()),
              onReset: c[6] || (c[6] = (d) => s()),
              state: o
            }, null, 8, ["state"])) : ue("", !0)
          ])
        ])
      ], 64))
    ], 64));
  }
}, ii = /* @__PURE__ */ Me({
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
    const n = ut(), t = e, a = rt(n, "views."), l = q(!1);
    Ge(() => {
      l.value = !0;
    }), xi(() => {
      l.value = !1;
    });
    const i = ve("panels"), o = ve("panel");
    return (s, u) => (M(), me(X, null, [
      t.state ? (M(), Y(Ia, {
        key: 0,
        state: t.state,
        delay: ""
      }, null, 8, ["state"])) : ue("", !0),
      S(n).prepend && S(i).panel == S(o).name ? j(s.$slots, "prepend", { key: 1 }) : ue("", !0),
      h(Sn, { class: "ma-4" }, {
        default: O(() => [
          (M(), Y(Na, {
            to: "#app-bar-sheet-title",
            disabled: !l.value || S(i).panel != t.name
          }, [
            t.icon ? (M(), Y(ke, {
              key: 0,
              icon: t.icon
            }, null, 8, ["icon"])) : ue("", !0),
            Pe(" " + Re(t.title) + " ", 1),
            j(s.$slots, "append-title")
          ], 8, ["disabled"])),
          (M(), Y(Na, {
            to: "#app-bar-right",
            disabled: !l.value || S(i).panel != t.name
          }, [
            j(s.$slots, "app-bar-right"),
            t.help ? (M(), Y(pe, {
              key: 0,
              class: "ml-3",
              href: t.help,
              panels: "new",
              icon: "mdi-information-outline"
            }, null, 8, ["href"])) : ue("", !0)
          ], 8, ["disabled"])),
          j(s.$slots, "top"),
          j(s.$slots, "default", {}, () => [
            S(a) ? (M(), Y(qa, {
              key: 0,
              modelValue: S(o).view,
              "onUpdate:modelValue": u[0] || (u[0] = (r) => S(o).view = r)
            }, {
              default: O(() => [
                (M(!0), me(X, null, Te(S(a), (r, c) => (M(), Y(Xa, {
                  key: r,
                  value: r
                }, {
                  default: O(() => [
                    j(s.$slots, c)
                  ]),
                  _: 2
                }, 1032, ["value"]))), 128))
              ]),
              _: 3
            }, 8, ["modelValue"])) : ue("", !0)
          ]),
          j(s.$slots, "bottom")
        ]),
        _: 3
      }),
      S(n).append && S(i).panel == S(o).name ? j(s.$slots, "append", { key: 2 }) : ue("", !0)
    ], 64));
  }
}), si = /* @__PURE__ */ Me({
  __name: "OxView",
  props: {
    /** default tab title */
    title: String
  },
  setup(e) {
    const n = e, t = q(null), a = ut(), l = rt(a, "tab.", { exclude: ["tab.default"] }), i = rt(a, "window.");
    return (o, s) => S(l) && Object.keys(S(l)).length ? (M(), me(X, { key: 0 }, [
      h(Iu, {
        modelValue: t.value,
        "onUpdate:modelValue": s[0] || (s[0] = (u) => t.value = u)
      }, {
        default: O(() => [
          S(a).default ? j(o.$slots, "tab", { key: 0 }, () => [
            h(Ga, {
              text: n == null ? void 0 : n.title,
              value: "default"
            }, null, 8, ["text"])
          ]) : ue("", !0),
          (M(!0), me(X, null, Te(S(l), (u, r) => (M(), Y(Ga, { value: u }, {
            default: O(() => [
              j(o.$slots, r)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"]),
      h(yl, {
        modelValue: t.value,
        "onUpdate:modelValue": s[1] || (s[1] = (u) => t.value = u)
      }, {
        default: O(() => [
          S(a).default ? (M(), Y(ca, {
            key: 0,
            value: "default"
          }, {
            default: O(() => [
              j(o.$slots, "default")
            ]),
            _: 3
          })) : ue("", !0),
          (M(!0), me(X, null, Te(S(i), (u, r) => (M(), Y(ca, { value: u }, {
            default: O(() => [
              j(o.$slots, r)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"])
    ], 64)) : j(o.$slots, "default", { key: 1 });
  }
}), ui = /* @__PURE__ */ Me({
  __name: "OxModelEditor",
  props: {
    repo: {},
    initial: {},
    name: {},
    url: {},
    saved: { type: Function }
  },
  setup(e, { expose: n }) {
    const t = q(null), a = ve("user"), l = e, { editor: i, edited: o } = _i({ props: l }), s = A(() => a.can([i.repo.use, "change", l.initial])), u = A(() => ({
      editor: i,
      edited: o.value,
      form: t.value,
      editable: s.value,
      disabled: !s.value,
      value: i.value,
      model: i.repo.use
    }));
    return J(() => i.errors && Object.values(i.errors), () => t.value.validate()), n({ editor: i, edited: o, form: t, editable: s }), (r, c) => (M(), me(X, null, [
      j(r.$slots, "prepend", Be($e(u.value))),
      h(Za, {
        ref_key: "form",
        ref: t,
        modelValue: S(i).valid,
        "onUpdate:modelValue": c[0] || (c[0] = (d) => S(i).valid = d),
        disabled: !s.value
      }, {
        default: O(() => [
          j(r.$slots, "default", Be($e(u.value)))
        ]),
        _: 3
      }, 8, ["modelValue", "disabled"]),
      j(r.$slots, "append", Be($e(u.value)))
    ], 64));
  }
}), cc = { key: 0 }, dc = /* @__PURE__ */ Me({
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
    const a = t, l = e, i = q(null);
    function o() {
      i.value.editor.reset(l.initial);
    }
    async function s() {
      const u = i.value, r = l.sendFormData ? await u.editor.save(new FormData(u.form.$el)) : await u.editor.save();
      return a("saved", i.value.editor), r;
    }
    return n({
      save: s,
      reset: o,
      get editor() {
        return i.value.editor;
      },
      get edited() {
        return i.value.edited;
      },
      get editable() {
        return i.value.editable;
      },
      get form() {
        return i.value.form;
      }
    }), (u, r) => {
      var c;
      return M(), me(X, null, [
        (c = i.value) != null && c.editor ? (M(), Y(Ia, {
          key: 0,
          state: i.value.editor.state
        }, null, 8, ["state"])) : ue("", !0),
        h(xn, { class: "ox-model-edit" }, {
          default: O(() => [
            h(S(ui), L({
              ref_key: "modelEditor",
              ref: i
            }, l), {
              prepend: O((d) => [
                l.hideValidationBtn ? ue("", !0) : (M(), me("div", cc, [
                  j(u.$slots, "prepend", L(d, {
                    save: s,
                    reset: o
                  }), () => [
                    d.editable && d.edited ? (M(), Y(Il, {
                      key: 0,
                      onValidate: r[0] || (r[0] = (m) => s()),
                      onReset: r[1] || (r[1] = (m) => o()),
                      state: d.editor.state,
                      "validate-disabled": d.editor.valid === !1
                    }, null, 8, ["state", "validate-disabled"])) : ue("", !0)
                  ])
                ]))
              ]),
              default: O((d) => [
                j(u.$slots, "default", L(d, {
                  save: s,
                  reset: o
                }))
              ]),
              append: O((d) => [
                j(u.$slots, "append", L(d, {
                  save: s,
                  reset: o
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
}), vc = /* @__PURE__ */ Me({
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
    const t = ut(), a = rt(t, "views.list."), l = rt(t, "item."), i = rt(t, "views.detail.edit."), o = A(() => !!Object.keys(i).length), s = un("filters"), u = e, r = ve("context"), c = ve("user"), { panel: d, list: m, items: v, next: g, prev: V } = ve("panel") ?? Bi({ props: u }), y = d.panels;
    A(() => {
      var k;
      return r.user.can([d.model, (k = d.value) != null && k.id ? "change" : "add"]);
    });
    const { showFilters: p } = tl(d), f = A(() => [
      ...u.headers,
      { key: "actions", title: oe("actions") }
    ]);
    function I(k) {
      k = new u.repo.use(k), d.show({ view: d.view, value: k }), m.load();
    }
    const x = A(() => ({
      panel: d,
      panels: y,
      list: m,
      items: v,
      context: r,
      saved: I,
      value: d.value
    }));
    return J(() => Object.values(m.filters), () => m.load()), n({ list: m, panel: d, items: v, next: g, prev: V }), (k, w) => (M(), Y(S(ii), {
      name: u.name,
      title: S(d).title,
      icon: S(d).icon,
      state: S(m).state,
      index: u.index
    }, it({
      "app-bar-right": O(() => [
        j(k.$slots, "app-bar-right", Be($e(x.value))),
        S(d).view.startsWith("list.") ? (M(), Y(Rl, {
          key: 0,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: O(() => [
            j(k.$slots, "nav.list", Be($e(x.value))),
            h(pe, {
              title: S(oe)("actions.list.reload"),
              "aria-label": S(oe)("actions.list.reload"),
              onClick: w[0] || (w[0] = (P) => S(m).load())
            }, {
              default: O(() => [
                h(ke, null, {
                  default: O(() => w[10] || (w[10] = [
                    Pe("mdi-reload")
                  ])),
                  _: 1,
                  __: [10]
                })
              ]),
              _: 1
            }, 8, ["title", "aria-label"]),
            s.value ? (M(), Y(pe, {
              key: 0,
              title: S(p) ? S(oe)("filters.hide") : S(oe)("filters.show"),
              "aria-label": S(p) ? S(oe)("filters.hide") : S(oe)("filters.show"),
              onClick: w[1] || (w[1] = (P) => p.value = !S(p)),
              active: S(p)
            }, {
              default: O(() => [
                h(ke, {
                  icon: s.value.icon
                }, null, 8, ["icon"])
              ]),
              _: 1
            }, 8, ["title", "aria-label", "active"])) : ue("", !0)
          ]),
          _: 3
        })) : S(d).view.startsWith("detail.") && S(d).value ? (M(), Y(Rl, {
          key: 1,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: O(() => [
            j(k.$slots, "nav.detail", Be($e(x.value))),
            S(d).view == "detail.edit" && S(d).value ? (M(), Y(Sl, { key: 0 }, {
              activator: O(({ props: P }) => [
                h(pe, L({ "prepend-icon": "mdi-dots-vertical" }, P), {
                  default: O(() => [
                    Pe(Re(S(oe)("actions")), 1)
                  ]),
                  _: 2
                }, 1040)
              ]),
              default: O(() => [
                h(dt, null, {
                  default: O(() => [
                    j(k.$slots, "item.actions", {
                      item: S(d).value
                    })
                  ]),
                  _: 3
                })
              ]),
              _: 3
            })) : ue("", !0),
            h(pe, {
              disabled: !S(V),
              title: S(oe)("prev"),
              "aria-label": S(oe)("prev"),
              onClick: w[2] || (w[2] = Ie((P) => S(d).show({ view: S(d).view, value: S(V) }), ["stop"]))
            }, {
              default: O(() => [
                h(ke, { icon: "mdi-chevron-left" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"]),
            h(pe, {
              disabled: !S(g),
              title: S(oe)("next"),
              "aria-label": S(oe)("next"),
              onClick: w[3] || (w[3] = Ie((P) => S(d).show({ view: S(d).view, value: S(g) }), ["stop"]))
            }, {
              default: O(() => [
                h(ke, { icon: "mdi-chevron-right" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"])
          ]),
          _: 3
        })) : ue("", !0),
        h(zi, {
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal",
          mandatory: "",
          modelValue: S(d).view,
          "onUpdate:modelValue": w[9] || (w[9] = (P) => S(d).view = P)
        }, {
          default: O(() => {
            var P;
            return [
              h(pe, {
                value: "list.table",
                onClickCapture: w[4] || (w[4] = Ie((b) => S(d).show({ view: "list.table" }), ["stop"])),
                title: S(oe)("panels.nav.table"),
                "aria-label": S(oe)("panels.nav.table")
              }, {
                default: O(() => [
                  h(ke, null, {
                    default: O(() => w[11] || (w[11] = [
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
                onClickCapture: w[5] || (w[5] = Ie((b) => S(d).show({ view: "list.cards" }), ["stop"])),
                title: S(oe)("panels.nav.cards"),
                "aria-label": S(oe)("panels.nav.cards")
              }, {
                default: O(() => [
                  h(ke, null, {
                    default: O(() => w[12] || (w[12] = [
                      Pe("mdi-view-grid")
                    ])),
                    _: 1,
                    __: [12]
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"]),
              S(t)["views.list.kanban"] ? (M(), Y(pe, {
                key: 0,
                value: "list.kanban",
                onClickCapture: w[6] || (w[6] = Ie((b) => S(d).show({ view: "list.kanban" }), ["stop"])),
                title: S(oe)("panels.nav.kanban"),
                "aria-label": S(oe)("panels.nav.kanban")
              }, {
                default: O(() => [
                  h(ke, null, {
                    default: O(() => w[13] || (w[13] = [
                      Pe("mdi-view-column")
                    ])),
                    _: 1,
                    __: [13]
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : ue("", !0),
              o.value ? (M(), Y(pe, {
                key: 1,
                value: "detail.edit",
                onClickCapture: w[7] || (w[7] = Ie((b) => S(d).show({ view: "detail.edit", value: S(d).value }), ["stop"])),
                disabled: !((P = S(d).value) != null && P.id) && S(d).view != "detail.edit",
                title: S(oe)("panels.nav.edit"),
                "aria-label": S(oe)("panels.nav.edit")
              }, {
                default: O(() => [
                  S(c).can([S(d).model, "change"]) ? (M(), Y(ke, { key: 0 }, {
                    default: O(() => w[14] || (w[14] = [
                      Pe("mdi-pencil")
                    ])),
                    _: 1,
                    __: [14]
                  })) : (M(), Y(ke, { key: 1 }, {
                    default: O(() => w[15] || (w[15] = [
                      Pe("mdi-eye")
                    ])),
                    _: 1,
                    __: [15]
                  }))
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"])) : ue("", !0),
              o.value && S(c).can([S(d).model, "add"]) ? (M(), Y(pe, {
                key: 2,
                value: "detail.add",
                onClickCapture: w[8] || (w[8] = Ie((b) => S(d).create(), ["stop"])),
                title: S(oe)("panels.nav.add"),
                "aria-label": S(oe)("panels.nav.add")
              }, {
                default: O(() => [
                  h(ke, null, {
                    default: O(() => w[16] || (w[16] = [
                      Pe("mdi-plus-box")
                    ])),
                    _: 1,
                    __: [16]
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : ue("", !0),
              j(k.$slots, "nav.views", Be($e(x.value)))
            ];
          }),
          _: 3
        }, 8, ["modelValue"]),
        j(k.$slots, "app-bar-end", Be($e(x.value)))
      ]),
      top: O(() => [
        u.warning ? (M(), Y(Ft, {
          key: 0,
          type: "warning",
          variant: "tonal",
          text: u.warning
        }, null, 8, ["text"])) : ue("", !0),
        j(k.$slots, "top"),
        Ke(h(S(po), {
          ref_key: "filters",
          ref: s,
          search: u.search,
          "teleport-to": "#panel-list-actions"
        }, {
          default: O((P) => [
            j(k.$slots, "list.filters", Be($e(P)))
          ]),
          _: 3
        }, 8, ["search"]), [
          [_t, S(d).view.startsWith("list.") && S(p)]
        ])
      ]),
      _: 2
    }, [
      S(t)["append-title"] ? {
        name: "append-title",
        fn: O(() => [
          j(k.$slots, "append-title", Be($e(x.value)))
        ]),
        key: "0"
      } : void 0,
      S(t).prepend ? {
        name: "prepend",
        fn: O(() => [
          j(k.$slots, "prepend", Be($e(x.value)))
        ]),
        key: "1"
      } : void 0,
      S(t).append ? {
        name: "append",
        fn: O(() => [
          j(k.$slots, "append", Be($e(x.value)))
        ]),
        key: "2"
      } : void 0,
      S(t)["views.list.table"] ? void 0 : {
        name: "views.list.table",
        fn: O(() => [
          h(S(ni), {
            list: S(m),
            items: S(v),
            headers: f.value,
            edit: o.value
          }, it({ _: 2 }, [
            Te(S(l), (P, b) => ({
              name: b,
              fn: O((B) => [
                j(k.$slots, b, Be($e(B)))
              ])
            }))
          ]), 1032, ["list", "items", "headers", "edit"])
        ]),
        key: "3"
      },
      S(t)["views.list.cards"] ? void 0 : {
        name: "views.list.cards",
        fn: O(() => [
          h(S(oi), {
            list: S(m),
            items: S(v),
            edit: o.value,
            headers: u.headers
          }, it({ _: 2 }, [
            Te(S(l), (P, b) => ({
              name: b,
              fn: O((B) => [
                j(k.$slots, b, Be($e(B)))
              ])
            }))
          ]), 1032, ["list", "items", "edit", "headers"])
        ]),
        key: "4"
      },
      Te(S(a), (P, b) => ({
        name: b,
        fn: O(() => [
          j(k.$slots, b, Be($e(x.value)))
        ])
      })),
      o.value ? {
        name: "views.detail.edit",
        fn: O(() => [
          h(S(si), {
            title: S(oe)(`models.${S(d).model.entity}`)
          }, it({ _: 2 }, [
            Te(S(i), (P, b) => ({
              name: P,
              fn: O(() => [
                j(k.$slots, b, Be($e(x.value)))
              ])
            }))
          ]), 1032, ["title"])
        ]),
        key: "5"
      } : void 0
    ]), 1032, ["name", "title", "icon", "state", "index"]));
  }
}), fc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OxAction: Dt,
  OxActionModelDelete: ps,
  OxActionPost: ws,
  OxApp: Tu,
  OxAutocomplete: dr,
  OxComponent: vr,
  OxField: gr,
  OxFormList: br,
  OxListCard: oi,
  OxListFilters: po,
  OxListKanban: Pr,
  OxListTable: ni,
  OxLogin: rc,
  OxModelEdit: dc,
  OxModelEditor: ui,
  OxModelPanel: vc,
  OxPanel: ii,
  OxStateAlert: Ia,
  OxValidationBtn: Il,
  OxView: si
}, Symbol.toStringTag, { value: "Module" })), Sc = {
  el: "#app",
  delimiters: ["[[", "]]"],
  components: { ...fc, ...ss }
};
export {
  Sc as App,
  Dt as OxAction,
  ps as OxActionModelDelete,
  ws as OxActionPost,
  Tu as OxApp,
  dr as OxAutocomplete,
  vr as OxComponent,
  gr as OxField,
  br as OxFormList,
  oi as OxListCard,
  po as OxListFilters,
  Pr as OxListKanban,
  ni as OxListTable,
  rc as OxLogin,
  dc as OxModelEdit,
  ui as OxModelEditor,
  vc as OxModelPanel,
  ii as OxPanel,
  Ia as OxStateAlert,
  Il as OxValidationBtn,
  si as OxView
};
//# sourceMappingURL=components.js.map
