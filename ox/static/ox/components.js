import { inject as ge, computed as I, ref as q, reactive as Qe, toRef as H, shallowRef as ee, onMounted as We, provide as Ue, useId as gt, onDeactivated as un, onActivated as yi, onBeforeUnmount as yt, createVNode as h, Transition as la, mergeProps as R, defineComponent as Le, useAttrs as ht, createElementBlock as ye, createCommentVNode as re, unref as w, openBlock as L, Fragment as X, createBlock as G, withModifiers as Te, resolveComponent as hi, withCtx as O, renderList as _e, createTextVNode as Ie, toDisplayString as Re, watch as Q, watchEffect as tt, onScopeDispose as je, readonly as cn, createElementVNode as C, nextTick as Ee, mergeModels as ha, useModel as ba, renderSlot as z, normalizeStyle as Ce, normalizeClass as me, effectScope as dn, toValue as Ol, toRaw as bi, warn as pi, Teleport as Na, withDirectives as Ye, vShow as _t, useSlots as nt, onErrorCaptured as wi, createSlots as ut, markRaw as xi, onBeforeMount as Si, cloneVNode as ki, normalizeProps as Be, guardReactiveProps as $e, h as Vi, vModelText as Ci, defineAsyncComponent as Pi, onBeforeUpdate as Ii, capitalize as Ai, toRefs as el, useTemplateRef as vn, withKeys as Fl, onUnmounted as Ti } from "vue";
import { useAction as _i, t as oe, filterSlots as vt, useAppContext as Bi, usePanels as $i, useQuery as Ei, ifNotEqualFn as Oi, defineAsyncComponent as Fi, rules as Li, useModelList as Mi, Query as Ri, ifNotEqual as Di, tKeys as Ni, useModelEditor as Hi, useModelPanel as zi } from "ox";
import { u as Pt, V as pe, a as Ge, b as Ha, c as tl, d as pa, e as ft, f as wa, g as Bt, h as fn, i as xa, t as Wi, j as ie, k as $t, l as Me, m as Ke, n as kt, o as zt, p as ke, q as Wt, r as ct, s as Ui, v as mn, w as Ut, x as jt, y as Ll, z as Ta, A as _a, B as Ml, C as Rl, D as Kt, E as ji, M as Sa, F as gn, G as al, H as Gt, I as yn, J as hn, K as ll, L as Ki, N as Yt, O as nl, P as ol, Q as il, R as Dl, S as Ve, T as bn, U as Et, W as bt, X as It, Y as pn, Z as Gi, _ as wn, $ as xn, a0 as xt, a1 as Sn, a2 as kn, a3 as sl, a4 as rl, a5 as ul, a6 as na, a7 as Vn, a8 as Ot, a9 as Yi, aa as qi, ab as Xi, ac as Zi, ad as Cn, ae as Pn, af as Lt, ag as Nl, ah as Qi } from "./VAlert-DMu3lqX-.js";
import { l as cl, n as In, o as K, q as he, r as ot, s as Ji, c as dl, t as ne, C as An, u as Xe, v as Je, w as es, x as it, y as qe, z as pt, A as we, B as lt, E as Ne, F as qt, G as st, H as ts, J as et, K as Tn, j as ze, M as Hl, N as At, O as as, P as _n, Q as rt, R as Se, S as za, U as ls, V as Ze, W as ka, X as He, Y as vl, Z as Bn, _ as ns, $ as os, a0 as Ba, a1 as is, a2 as ss, a3 as Ct, a4 as rs, a5 as $n, a6 as oa, a7 as us, a as Qt, a8 as zl, a9 as cs, aa as ia, ab as Jt } from "./theme-DoSqMg68.js";
import { N as ds, O as Mt, Q as vs, T as fs, l as Wa, K as ms, F as gs, t as $a, S as ys, o as hs, r as bs } from "./index-DmxTQQmI.js";
import "axios";
import { components as ps } from "ox/vendor";
class at {
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
function Wl(e, l) {
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
function En(e) {
  return Array.isArray(e) ? new at({
    x: e[0],
    y: e[1],
    width: 0,
    height: 0
  }) : e.getBoundingClientRect();
}
function ws(e) {
  if (e === document.documentElement)
    return visualViewport ? new at({
      x: visualViewport.scale > 1 ? 0 : visualViewport.offsetLeft,
      y: visualViewport.scale > 1 ? 0 : visualViewport.offsetTop,
      width: visualViewport.width * visualViewport.scale,
      height: visualViewport.height * visualViewport.scale
    }) : new at({
      x: 0,
      y: 0,
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });
  {
    const l = e.getBoundingClientRect();
    return new at({
      x: l.x,
      y: l.y,
      width: e.clientWidth,
      height: e.clientHeight
    });
  }
}
function fl(e) {
  const l = e.getBoundingClientRect(), t = getComputedStyle(e), a = t.transform;
  if (a) {
    let n, o, i, r, s;
    if (a.startsWith("matrix3d("))
      n = a.slice(9, -1).split(/, /), o = Number(n[0]), i = Number(n[5]), r = Number(n[12]), s = Number(n[13]);
    else if (a.startsWith("matrix("))
      n = a.slice(7, -1).split(/, /), o = Number(n[0]), i = Number(n[3]), r = Number(n[4]), s = Number(n[5]);
    else
      return new at(l);
    const u = t.transformOrigin, c = l.x - r - (1 - o) * parseFloat(u), d = l.y - s - (1 - i) * parseFloat(u.slice(u.indexOf(" ") + 1)), v = o ? l.width / o : e.offsetWidth + 1, f = i ? l.height / i : e.offsetHeight + 1;
    return new at({
      x: c,
      y: d,
      width: v,
      height: f
    });
  } else
    return new at(l);
}
function wt(e, l, t) {
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
const ta = /* @__PURE__ */ new WeakMap();
function xs(e, l) {
  Object.keys(l).forEach((t) => {
    if (cl(t)) {
      const a = In(t), n = ta.get(e);
      if (l[t] == null)
        n == null || n.forEach((o) => {
          const [i, r] = o;
          i === a && (e.removeEventListener(a, r), n.delete(o));
        });
      else if (!n || ![...n].some((o) => o[0] === a && o[1] === l[t])) {
        e.addEventListener(a, l[t]);
        const o = n || /* @__PURE__ */ new Set();
        o.add([a, l[t]]), ta.has(e) || ta.set(e, o);
      }
    } else
      l[t] == null ? e.removeAttribute(t) : e.setAttribute(t, l[t]);
  });
}
function Ss(e, l) {
  Object.keys(l).forEach((t) => {
    if (cl(t)) {
      const a = In(t), n = ta.get(e);
      n == null || n.forEach((o) => {
        const [i, r] = o;
        i === a && (e.removeEventListener(a, r), n.delete(o));
      });
    } else
      e.removeAttribute(t);
  });
}
function On(e) {
  if (typeof e.getRootNode != "function") {
    for (; e.parentNode; ) e = e.parentNode;
    return e !== document ? null : document;
  }
  const l = e.getRootNode();
  return l !== document && l.getRootNode({
    composed: !0
  }) !== document ? null : l;
}
function Ul(e, l, t) {
  return Object.keys(e).filter((a) => cl(a) && a.endsWith(l)).reduce((a, n) => (a[n.slice(0, -l.length)] = (o) => e[n](o, t(o)), a), {});
}
function Fn(e) {
  let l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  for (; e; ) {
    if (l ? ks(e) : ml(e)) return e;
    e = e.parentElement;
  }
  return document.scrollingElement;
}
function sa(e, l) {
  const t = [];
  if (l && e && !l.contains(e)) return t;
  for (; e && (ml(e) && t.push(e), e !== l); )
    e = e.parentElement;
  return t;
}
function ml(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const l = window.getComputedStyle(e), t = l.overflowY === "scroll" || l.overflowY === "auto" && e.scrollHeight > e.clientHeight, a = l.overflowX === "scroll" || l.overflowX === "auto" && e.scrollWidth > e.clientWidth;
  return t || a;
}
function ks(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const l = window.getComputedStyle(e);
  return ["scroll", "auto"].includes(l.overflowY);
}
function Vs(e) {
  for (; e; ) {
    if (window.getComputedStyle(e).position === "fixed")
      return !0;
    e = e.offsetParent;
  }
  return !1;
}
const Rt = Symbol.for("vuetify:layout"), Ln = Symbol.for("vuetify:layout-item"), jl = 1e3, Cs = K({
  overlaps: {
    type: Array,
    default: () => []
  },
  fullHeight: Boolean
}, "layout"), Mn = K({
  name: {
    type: String
  },
  order: {
    type: [Number, String],
    default: 0
  },
  absolute: Boolean
}, "layout-item");
function Rn() {
  const e = ge(Rt);
  if (!e) throw new Error("[Vuetify] Could not find injected layout");
  return {
    getLayoutItem: e.getLayoutItem,
    mainRect: e.mainRect,
    mainStyles: e.mainStyles
  };
}
function Dn(e) {
  const l = ge(Rt);
  if (!l) throw new Error("[Vuetify] Could not find injected layout");
  const t = e.id ?? `layout-item-${gt()}`, a = ot("useLayoutItem");
  Ue(Ln, {
    id: t
  });
  const n = ee(!1);
  un(() => n.value = !0), yi(() => n.value = !1);
  const {
    layoutItemStyles: o,
    layoutItemScrimStyles: i
  } = l.register(a, {
    ...e,
    active: I(() => n.value ? !1 : e.active.value),
    id: t
  });
  return yt(() => l.unregister(t)), {
    layoutItemStyles: o,
    layoutRect: l.layoutRect,
    layoutItemScrimStyles: i
  };
}
const Ps = (e, l, t, a) => {
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
    const r = l.get(i), s = t.get(i), u = a.get(i);
    if (!r || !s || !u) continue;
    const c = {
      ...n,
      [r.value]: parseInt(n[r.value], 10) + (u.value ? parseInt(s.value, 10) : 0)
    };
    o.push({
      id: i,
      layer: c
    }), n = c;
  }
  return o;
};
function Is(e) {
  const l = ge(Rt, null), t = I(() => l ? l.rootZIndex.value - 100 : jl), a = q([]), n = Qe(/* @__PURE__ */ new Map()), o = Qe(/* @__PURE__ */ new Map()), i = Qe(/* @__PURE__ */ new Map()), r = Qe(/* @__PURE__ */ new Map()), s = Qe(/* @__PURE__ */ new Map()), {
    resizeRef: u,
    contentRect: c
  } = Pt(), d = I(() => {
    const x = /* @__PURE__ */ new Map(), P = e.overlaps ?? [];
    for (const b of P.filter((_) => _.includes(":"))) {
      const [_, T] = b.split(":");
      if (!a.value.includes(_) || !a.value.includes(T)) continue;
      const $ = n.get(_), D = n.get(T), M = o.get(_), U = o.get(T);
      !$ || !D || !M || !U || (x.set(T, {
        position: $.value,
        amount: parseInt(M.value, 10)
      }), x.set(_, {
        position: D.value,
        amount: -parseInt(U.value, 10)
      }));
    }
    return x;
  }), v = I(() => {
    const x = [...new Set([...i.values()].map((b) => b.value))].sort((b, _) => b - _), P = [];
    for (const b of x) {
      const _ = a.value.filter((T) => {
        var $;
        return (($ = i.get(T)) == null ? void 0 : $.value) === b;
      });
      P.push(..._);
    }
    return Ps(P, n, o, r);
  }), f = I(() => !Array.from(s.values()).some((x) => x.value)), g = I(() => v.value[v.value.length - 1].layer), k = H(() => ({
    "--v-layout-left": he(g.value.left),
    "--v-layout-right": he(g.value.right),
    "--v-layout-top": he(g.value.top),
    "--v-layout-bottom": he(g.value.bottom),
    ...f.value ? void 0 : {
      transition: "none"
    }
  })), y = I(() => v.value.slice(1).map((x, P) => {
    let {
      id: b
    } = x;
    const {
      layer: _
    } = v.value[P], T = o.get(b), $ = n.get(b);
    return {
      id: b,
      ..._,
      size: Number(T.value),
      position: $.value
    };
  })), p = (x) => y.value.find((P) => P.id === x), m = ot("createLayout"), A = ee(!1);
  We(() => {
    A.value = !0;
  }), Ue(Rt, {
    register: (x, P) => {
      let {
        id: b,
        order: _,
        position: T,
        layoutSize: $,
        elementSize: D,
        active: M,
        disableTransitions: U,
        absolute: j
      } = P;
      i.set(b, _), n.set(b, T), o.set(b, $), r.set(b, M), U && s.set(b, U);
      const ae = Ji(Ln, m == null ? void 0 : m.vnode).indexOf(x);
      ae > -1 ? a.value.splice(ae, 0, b) : a.value.push(b);
      const le = I(() => y.value.findIndex((F) => F.id === b)), ce = I(() => t.value + v.value.length * 2 - le.value * 2), B = I(() => {
        const F = T.value === "left" || T.value === "right", W = T.value === "right", ve = T.value === "bottom", te = D.value ?? $.value, ue = te === 0 ? "%" : "px", Z = {
          [T.value]: 0,
          zIndex: ce.value,
          transform: `translate${F ? "X" : "Y"}(${(M.value ? 0 : -(te === 0 ? 100 : te)) * (W || ve ? -1 : 1)}${ue})`,
          position: j.value || t.value !== jl ? "absolute" : "fixed",
          ...f.value ? void 0 : {
            transition: "none"
          }
        };
        if (!A.value) return Z;
        const se = y.value[le.value];
        se || dl(`[Vuetify] Could not find layout item "${b}"`);
        const de = d.value.get(b);
        return de && (se[de.position] += de.amount), {
          ...Z,
          height: F ? `calc(100% - ${se.top}px - ${se.bottom}px)` : D.value ? `${D.value}px` : void 0,
          left: W ? void 0 : `${se.left}px`,
          right: W ? `${se.right}px` : void 0,
          top: T.value !== "bottom" ? `${se.top}px` : void 0,
          bottom: T.value !== "top" ? `${se.bottom}px` : void 0,
          width: F ? D.value ? `${D.value}px` : void 0 : `calc(100% - ${se.left}px - ${se.right}px)`
        };
      }), E = I(() => ({
        zIndex: ce.value - 1
      }));
      return {
        layoutItemStyles: B,
        layoutItemScrimStyles: E,
        zIndex: ce
      };
    },
    unregister: (x) => {
      i.delete(x), n.delete(x), o.delete(x), r.delete(x), s.delete(x), a.value = a.value.filter((P) => P !== x);
    },
    mainRect: g,
    mainStyles: k,
    getLayoutItem: p,
    items: y,
    layoutRect: c,
    rootZIndex: t
  });
  const S = H(() => ["v-layout", {
    "v-layout--full-height": e.fullHeight
  }]), V = H(() => ({
    zIndex: l ? t.value : void 0,
    position: l ? "relative" : void 0,
    overflow: l ? "hidden" : void 0
  }));
  return {
    layoutClasses: S,
    layoutStyles: V,
    getLayoutItem: p,
    items: y,
    layoutRect: c,
    layoutRef: u
  };
}
const As = K({
  target: [Object, Array]
}, "v-dialog-transition"), Ea = /* @__PURE__ */ new WeakMap(), Nn = ne()({
  name: "VDialogTransition",
  props: As(),
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
        const i = Gl(e.target, n), {
          x: r,
          y: s,
          sx: u,
          sy: c,
          speed: d
        } = i;
        Ea.set(n, i);
        const v = wt(n, [{
          transform: `translate(${r}px, ${s}px) scale(${u}, ${c})`,
          opacity: 0
        }, {}], {
          duration: 225 * d,
          easing: vs
        });
        (f = Kl(n)) == null || f.forEach((g) => {
          wt(g, [{
            opacity: 0
          }, {
            opacity: 0,
            offset: 0.33
          }, {}], {
            duration: 225 * 2 * d,
            easing: Mt
          });
        }), v.finished.then(() => o());
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
        !Ea.has(n) || Array.isArray(e.target) || e.target.offsetParent || e.target.getClientRects().length ? i = Gl(e.target, n) : i = Ea.get(n);
        const {
          x: r,
          y: s,
          sx: u,
          sy: c,
          speed: d
        } = i;
        wt(n, [{}, {
          transform: `translate(${r}px, ${s}px) scale(${u}, ${c})`,
          opacity: 0
        }], {
          duration: 125 * d,
          easing: ds
        }).finished.then(() => o()), (f = Kl(n)) == null || f.forEach((g) => {
          wt(g, [{}, {
            opacity: 0,
            offset: 0.2
          }, {
            opacity: 0
          }], {
            duration: 125 * 2 * d,
            easing: Mt
          });
        });
      },
      onAfterLeave(n) {
        n.style.removeProperty("pointer-events");
      }
    };
    return () => e.target ? h(la, R({
      name: "dialog-transition"
    }, a, {
      css: !1
    }), t) : h(la, {
      name: "dialog-transition"
    }, t);
  }
});
function Kl(e) {
  var t;
  const l = (t = e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")) == null ? void 0 : t.children;
  return l && [...l];
}
function Gl(e, l) {
  const t = En(e), a = fl(l), [n, o] = getComputedStyle(l).transformOrigin.split(" ").map((p) => parseFloat(p)), [i, r] = getComputedStyle(l).getPropertyValue("--v-overlay-anchor-origin").split(" ");
  let s = t.left + t.width / 2;
  i === "left" || r === "left" ? s -= t.width / 2 : (i === "right" || r === "right") && (s += t.width / 2);
  let u = t.top + t.height / 2;
  i === "top" || r === "top" ? u -= t.height / 2 : (i === "bottom" || r === "bottom") && (u += t.height / 2);
  const c = t.width / a.width, d = t.height / a.height, v = Math.max(1, c, d), f = c / v || 0, g = d / v || 0, k = a.width * a.height / (window.innerWidth * window.innerHeight), y = k > 0.12 ? Math.min(1.5, (k - 0.12) * 10 + 1) : 1;
  return {
    x: s - (n + a.left),
    y: u - (o + a.top),
    sx: f,
    sy: g,
    speed: y
  };
}
const Dt = /* @__PURE__ */ Le({
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
  setup(e, { emit: l }) {
    const t = e, a = ht(), n = l, o = ge("user"), { run: i, processing: r, allowed: s } = _i({ user: o, emits: n, props: t });
    return (u, c) => w(s) ? (L(), ye(X, { key: 0 }, [
      t.button ? (L(), G(pe, R({
        key: 0,
        variant: "text"
      }, w(a), {
        disabled: w(r),
        color: t.color,
        icon: t.icon,
        title: t.title,
        "aria-label": t.title,
        onClick: Te(w(i), ["stop"])
      }), null, 16, ["disabled", "color", "icon", "title", "aria-label", "onClick"])) : (L(), G(Ge, R({ key: 1 }, w(a), {
        title: t.title,
        "base-color": t.color,
        "prepend-icon": t.icon,
        disabled: w(r),
        onClick: Te(w(i), ["stop"])
      }), null, 16, ["title", "base-color", "prepend-icon", "disabled", "onClick"]))
    ], 64)) : re("", !0);
  }
}), Ts = /* @__PURE__ */ Le({
  __name: "OxActionModelDelete",
  props: {
    item: {}
  },
  setup(e) {
    const l = ge("panel"), t = ge("repos"), a = ht(), n = e;
    async function o(i, r) {
      return await t[r.constructor.entity].api().delete(r.$url(), { delete: n.item.id });
    }
    return (i, r) => (L(), G(Dt, R(w(a), {
      item: n.item,
      icon: "mdi-delete",
      color: "error",
      title: w(oe)("actions.delete"),
      confirm: w(oe)("actions.delete.confirm"),
      permission: [n.item.constructor, "delete"],
      run: o,
      onCompleted: r[0] || (r[0] = (s) => {
        var u;
        return (u = w(l)) == null ? void 0 : u.show({ view: w(l).index });
      })
    }), null, 16, ["item", "title", "confirm", "permission"]));
  }
}), _s = /* @__PURE__ */ Le({
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
    const l = ht(), t = e;
    async function a(n, o) {
      const i = t.repo.api();
      return await i[t.method].apply(i, [o.$url(t.path), t.data, t.options]);
    }
    return (n, o) => (L(), G(w(Dt), R(w(l), { run: a }), null, 16));
  }
}), Bs = /* @__PURE__ */ Le({
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
    const l = e;
    q(null);
    const t = ge("user"), a = ge("panels");
    I(() => !l.auto || panel.name == l.name);
    function n(i) {
      return i.permission && !t.can(i.permission) ? !1 : i.items ? i.items.some((r) => n(r)) : !0;
    }
    function o() {
      const i = { panel: l.name, href: l.url };
      a.show(i);
    }
    return (i, r) => {
      const s = hi("ox-app-nav-item", !0);
      return n(l) ? (L(), ye(X, { key: 0 }, [
        l.type == "group" ? (L(), G(Ha, {
          key: 0,
          value: l.name
        }, {
          activator: O(({ props: u }) => [
            h(Ge, R(u, {
              title: l.title,
              "prepend-icon": l.icon
            }), null, 16, ["title", "prepend-icon"])
          ]),
          default: O(() => [
            (L(!0), ye(X, null, _e(l.items, (u, c) => (L(), G(s, R({
              key: c,
              ref_for: !0
            }, u, {
              type: u.type == "group" ? "subheader" : u.type
            }), null, 16, ["type"]))), 128))
          ]),
          _: 1
        }, 8, ["value"])) : l.type == "subheader" ? (L(), ye(X, { key: 1 }, [
          h(tl, null, {
            default: O(() => [
              Ie(Re(l.title), 1)
            ]),
            _: 1
          }),
          l.items ? (L(!0), ye(X, { key: 0 }, _e(l.items, (u) => (L(), G(s, R({ ref_for: !0 }, u), null, 16))), 256)) : re("", !0)
        ], 64)) : (L(), G(Ge, {
          key: 2,
          active: w(a).panel == l.name,
          value: l.name,
          "prepend-icon": l.icon,
          title: l.title,
          onClick: Te(o, ["stop"])
        }, null, 8, ["active", "value", "prepend-icon", "title"]))
      ], 64)) : re("", !0);
    };
  }
});
function $s(e) {
  let {
    rootEl: l,
    isSticky: t,
    layoutItemStyles: a
  } = e;
  const n = ee(!1), o = ee(0), i = I(() => {
    const u = typeof n.value == "boolean" ? "top" : n.value;
    return [t.value ? {
      top: "auto",
      bottom: "auto",
      height: void 0
    } : void 0, n.value ? {
      [u]: he(o.value)
    } : {
      top: a.value.top
    }];
  });
  We(() => {
    Q(t, (u) => {
      u ? window.addEventListener("scroll", s, {
        passive: !0
      }) : window.removeEventListener("scroll", s);
    }, {
      immediate: !0
    });
  }), yt(() => {
    window.removeEventListener("scroll", s);
  });
  let r = 0;
  function s() {
    const u = r > window.scrollY ? "up" : "down", c = l.value.getBoundingClientRect(), d = parseFloat(a.value.top ?? 0), v = window.scrollY - Math.max(0, o.value - d), f = c.height + Math.max(o.value, d) - window.scrollY - window.innerHeight, g = parseFloat(getComputedStyle(l.value).getPropertyValue("--v-body-scroll-y")) || 0;
    c.height < window.innerHeight - d ? (n.value = "top", o.value = d) : u === "up" && n.value === "bottom" || u === "down" && n.value === "top" ? (o.value = window.scrollY + c.top - g, n.value = !0) : u === "down" && f <= 0 ? (o.value = 0, n.value = "bottom") : u === "up" && v <= 0 && (g ? n.value !== "top" && (o.value = -v + g + d, n.value = "top") : (o.value = c.top + v, n.value = "top")), r = window.scrollY;
  }
  return {
    isStuck: n,
    stickyStyles: i
  };
}
const Es = 100, Os = 20;
function Yl(e) {
  return (e < 0 ? -1 : 1) * Math.sqrt(Math.abs(e)) * 1.41421356237;
}
function ql(e) {
  if (e.length < 2)
    return 0;
  if (e.length === 2)
    return e[1].t === e[0].t ? 0 : (e[1].d - e[0].d) / (e[1].t - e[0].t);
  let l = 0;
  for (let t = e.length - 1; t > 0; t--) {
    if (e[t].t === e[t - 1].t)
      continue;
    const a = Yl(l), n = (e[t].d - e[t - 1].d) / (e[t].t - e[t - 1].t);
    l += (n - a) * Math.abs(n), t === e.length - 1 && (l *= 0.5);
  }
  return Yl(l) * 1e3;
}
function Fs() {
  const e = {};
  function l(n) {
    Array.from(n.changedTouches).forEach((o) => {
      (e[o.identifier] ?? (e[o.identifier] = new An(Os))).push([n.timeStamp, o]);
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
    const i = o[0], r = [], s = [];
    for (const c of o) {
      if (i[0] - c[0] > Es) break;
      r.push({
        t: c[0],
        d: c[1].clientX
      }), s.push({
        t: c[0],
        d: c[1].clientY
      });
    }
    return {
      x: ql(r),
      y: ql(s),
      get direction() {
        const {
          x: c,
          y: d
        } = this, [v, f] = [Math.abs(c), Math.abs(d)];
        return v > f && c >= 0 ? "right" : v > f && c <= 0 ? "left" : f > v && d >= 0 ? "down" : f > v && d <= 0 ? "up" : Ls();
      }
    };
  }
  return {
    addMovement: l,
    endTouch: t,
    getVelocity: a
  };
}
function Ls() {
  throw new Error();
}
function Ms(e) {
  let {
    el: l,
    isActive: t,
    isTemporary: a,
    width: n,
    touchless: o,
    position: i
  } = e;
  We(() => {
    window.addEventListener("touchstart", m, {
      passive: !0
    }), window.addEventListener("touchmove", A, {
      passive: !1
    }), window.addEventListener("touchend", S, {
      passive: !0
    });
  }), yt(() => {
    window.removeEventListener("touchstart", m), window.removeEventListener("touchmove", A), window.removeEventListener("touchend", S);
  });
  const r = I(() => ["left", "right"].includes(i.value)), {
    addMovement: s,
    endTouch: u,
    getVelocity: c
  } = Fs();
  let d = !1;
  const v = ee(!1), f = ee(0), g = ee(0);
  let k;
  function y(x, P) {
    return (i.value === "left" ? x : i.value === "right" ? document.documentElement.clientWidth - x : i.value === "top" ? x : i.value === "bottom" ? document.documentElement.clientHeight - x : Vt()) - (P ? n.value : 0);
  }
  function p(x) {
    let P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    const b = i.value === "left" ? (x - g.value) / n.value : i.value === "right" ? (document.documentElement.clientWidth - x - g.value) / n.value : i.value === "top" ? (x - g.value) / n.value : i.value === "bottom" ? (document.documentElement.clientHeight - x - g.value) / n.value : Vt();
    return P ? Je(b) : b;
  }
  function m(x) {
    if (o.value) return;
    const P = x.changedTouches[0].clientX, b = x.changedTouches[0].clientY, _ = 25, T = i.value === "left" ? P < _ : i.value === "right" ? P > document.documentElement.clientWidth - _ : i.value === "top" ? b < _ : i.value === "bottom" ? b > document.documentElement.clientHeight - _ : Vt(), $ = t.value && (i.value === "left" ? P < n.value : i.value === "right" ? P > document.documentElement.clientWidth - n.value : i.value === "top" ? b < n.value : i.value === "bottom" ? b > document.documentElement.clientHeight - n.value : Vt());
    (T || $ || t.value && a.value) && (k = [P, b], g.value = y(r.value ? P : b, t.value), f.value = p(r.value ? P : b), d = g.value > -20 && g.value < 80, u(x), s(x));
  }
  function A(x) {
    const P = x.changedTouches[0].clientX, b = x.changedTouches[0].clientY;
    if (d) {
      if (!x.cancelable) {
        d = !1;
        return;
      }
      const T = Math.abs(P - k[0]), $ = Math.abs(b - k[1]);
      (r.value ? T > $ && T > 3 : $ > T && $ > 3) ? (v.value = !0, d = !1) : (r.value ? $ : T) > 3 && (d = !1);
    }
    if (!v.value) return;
    x.preventDefault(), s(x);
    const _ = p(r.value ? P : b, !1);
    f.value = Math.max(0, Math.min(1, _)), _ > 1 ? g.value = y(r.value ? P : b, !0) : _ < 0 && (g.value = y(r.value ? P : b, !1));
  }
  function S(x) {
    if (d = !1, !v.value) return;
    s(x), v.value = !1;
    const P = c(x.changedTouches[0].identifier), b = Math.abs(P.x), _ = Math.abs(P.y);
    (r.value ? b > _ && b > 400 : _ > b && _ > 3) ? t.value = P.direction === ({
      left: "right",
      right: "left",
      top: "down",
      bottom: "up"
    }[i.value] || Vt()) : t.value = f.value > 0.5;
  }
  const V = I(() => v.value ? {
    transform: i.value === "left" ? `translateX(calc(-100% + ${f.value * n.value}px))` : i.value === "right" ? `translateX(calc(100% - ${f.value * n.value}px))` : i.value === "top" ? `translateY(calc(-100% + ${f.value * n.value}px))` : i.value === "bottom" ? `translateY(calc(100% - ${f.value * n.value}px))` : Vt(),
    transition: "none"
  } : void 0);
  return Xe(v, () => {
    var b, _;
    const x = ((b = l.value) == null ? void 0 : b.style.transform) ?? null, P = ((_ = l.value) == null ? void 0 : _.style.transition) ?? null;
    tt(() => {
      var T, $, D, M;
      ($ = l.value) == null || $.style.setProperty("transform", ((T = V.value) == null ? void 0 : T.transform) || "none"), (M = l.value) == null || M.style.setProperty("transition", ((D = V.value) == null ? void 0 : D.transition) || null);
    }), je(() => {
      var T, $;
      (T = l.value) == null || T.style.setProperty("transform", x), ($ = l.value) == null || $.style.setProperty("transition", P);
    });
  }), {
    isDragging: v,
    dragProgress: f,
    dragStyles: V
  };
}
function Vt() {
  throw new Error();
}
const Hn = K({
  closeDelay: [Number, String],
  openDelay: [Number, String]
}, "delay");
function zn(e, l) {
  let t = () => {
  };
  function a(i) {
    t == null || t();
    const r = Number(i ? e.openDelay : e.closeDelay);
    return new Promise((s) => {
      t = es(r, () => {
        l == null || l(i), s(i);
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
function Xt() {
  const l = ot("useScopeId").vnode.scopeId;
  return {
    scopeId: l ? {
      [l]: ""
    } : void 0
  };
}
const Rs = ["start", "end", "left", "right", "top", "bottom"], Ds = K({
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
    validator: (e) => Rs.includes(e)
  },
  sticky: Boolean,
  ...Wt(),
  ...ke(),
  ...Hn(),
  ...qt({
    mobile: null
  }),
  ...zt(),
  ...Mn(),
  ...kt(),
  ...Ke({
    tag: "nav"
  }),
  ...Ne()
}, "VNavigationDrawer"), Ns = ne()({
  name: "VNavigationDrawer",
  props: Ds(),
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
    } = it(), {
      themeClasses: i
    } = qe(e), {
      borderClasses: r
    } = pa(e), {
      backgroundColorClasses: s,
      backgroundColorStyles: u
    } = ft(() => e.color), {
      elevationClasses: c
    } = wa(e), {
      displayClasses: d,
      mobile: v
    } = pt(e), {
      roundedClasses: f
    } = Bt(e), g = fn(), k = we(e, "modelValue", null, (B) => !!B), {
      ssrBootStyles: y
    } = xa(), {
      scopeId: p
    } = Xt(), m = q(), A = ee(!1), {
      runOpenDelay: S,
      runCloseDelay: V
    } = zn(e, (B) => {
      A.value = B;
    }), x = I(() => e.rail && e.expandOnHover && A.value ? Number(e.width) : Number(e.rail ? e.railWidth : e.width)), P = I(() => Wi(e.location, o.value)), b = H(() => e.persistent), _ = I(() => !e.permanent && (v.value || e.temporary)), T = I(() => e.sticky && !_.value && P.value !== "bottom");
    Xe(() => e.expandOnHover && e.rail != null, () => {
      Q(A, (B) => a("update:rail", !B));
    }), Xe(() => !e.disableResizeWatcher, () => {
      Q(_, (B) => !e.permanent && Ee(() => k.value = !B));
    }), Xe(() => !e.disableRouteWatcher && !!g, () => {
      Q(g.currentRoute, () => _.value && (k.value = !1));
    }), Q(() => e.permanent, (B) => {
      B && (k.value = !0);
    }), e.modelValue == null && !_.value && (k.value = e.permanent || !v.value);
    const {
      isDragging: $,
      dragProgress: D
    } = Ms({
      el: m,
      isActive: k,
      isTemporary: _,
      width: x,
      touchless: H(() => e.touchless),
      position: P
    }), M = I(() => {
      const B = _.value ? 0 : e.rail && e.expandOnHover ? Number(e.railWidth) : x.value;
      return $.value ? B * D.value : B;
    }), {
      layoutItemStyles: U,
      layoutItemScrimStyles: j
    } = Dn({
      id: e.name,
      order: I(() => parseInt(e.order, 10)),
      position: P,
      layoutSize: M,
      elementSize: x,
      active: cn(k),
      disableTransitions: H(() => $.value),
      absolute: I(() => (
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        e.absolute || T.value && typeof Y.value != "string"
      ))
    }), {
      isStuck: Y,
      stickyStyles: ae
    } = $s({
      rootEl: m,
      isSticky: T,
      layoutItemStyles: U
    }), le = ft(() => typeof e.scrim == "string" ? e.scrim : null), ce = I(() => ({
      ...$.value ? {
        opacity: D.value * 0.2,
        transition: "none"
      } : void 0,
      ...j.value
    }));
    return lt({
      VList: {
        bgColor: "transparent"
      }
    }), ie(() => {
      const B = n.image || e.image;
      return C(X, null, [h(e.tag, R({
        ref: m,
        onMouseenter: S,
        onMouseleave: V,
        class: ["v-navigation-drawer", `v-navigation-drawer--${P.value}`, {
          "v-navigation-drawer--expand-on-hover": e.expandOnHover,
          "v-navigation-drawer--floating": e.floating,
          "v-navigation-drawer--is-hovering": A.value,
          "v-navigation-drawer--rail": e.rail,
          "v-navigation-drawer--temporary": _.value,
          "v-navigation-drawer--persistent": b.value,
          "v-navigation-drawer--active": k.value,
          "v-navigation-drawer--sticky": T.value
        }, i.value, s.value, r.value, d.value, c.value, f.value, e.class],
        style: [u.value, U.value, y.value, ae.value, e.style]
      }, p, t), {
        default: () => {
          var E, F, W;
          return [B && C("div", {
            key: "image",
            class: "v-navigation-drawer__img"
          }, [n.image ? h(Me, {
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
          }, n.image) : h($t, {
            key: "image-img",
            alt: "",
            cover: !0,
            height: "inherit",
            src: e.image
          }, null)]), n.prepend && C("div", {
            class: "v-navigation-drawer__prepend"
          }, [(E = n.prepend) == null ? void 0 : E.call(n)]), C("div", {
            class: "v-navigation-drawer__content"
          }, [(F = n.default) == null ? void 0 : F.call(n)]), n.append && C("div", {
            class: "v-navigation-drawer__append"
          }, [(W = n.append) == null ? void 0 : W.call(n)])];
        }
      }), h(la, {
        name: "fade-transition"
      }, {
        default: () => [_.value && ($.value || k.value) && !!e.scrim && C("div", R({
          class: ["v-navigation-drawer__scrim", le.backgroundColorClasses.value],
          style: [ce.value, le.backgroundColorStyles.value],
          onClick: () => {
            b.value || (k.value = !1);
          }
        }, p), null)]
      })]);
    }), {
      isStuck: Y
    };
  }
}), Hs = {
  __name: "OxAppNav",
  props: /* @__PURE__ */ ha({
    items: Array
  }, {
    drawer: {},
    drawerModifiers: {}
  }),
  emits: ["update:drawer"],
  setup(e) {
    ge("context");
    const l = ge("panels"), t = ba(e, "drawer"), a = q([]), n = e, o = I(() => (i(n.items), n.items));
    function i(s) {
      a.value = r(s);
    }
    function r(s) {
      if (l.panel) {
        for (const u of s)
          if (u.items) {
            const c = r(u.items);
            if (c)
              return [c, u.name];
          } else if (u.name == l.panel)
            return [u.name];
      }
    }
    return (s, u) => (L(), G(Ns, {
      modelValue: t.value,
      "onUpdate:modelValue": u[1] || (u[1] = (c) => t.value = c),
      theme: "dark"
    }, {
      append: O(() => [
        h(ct, null, {
          default: O(() => [
            z(s.$slots, "append")
          ]),
          _: 3
        })
      ]),
      default: O(() => [
        z(s.$slots, "prepend"),
        h(ct, {
          opened: a.value,
          "onUpdate:opened": u[0] || (u[0] = (c) => a.value = c),
          density: "compact"
        }, {
          default: O(() => [
            (L(!0), ye(X, null, _e(o.value, (c, d) => (L(), G(w(Bs), R({
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
}, zs = K({
  ...ke(),
  ...st(Cs(), ["fullHeight"]),
  ...Ne()
}, "VApp"), Ws = ne()({
  name: "VApp",
  props: zs(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = qe(e), {
      layoutClasses: n,
      getLayoutItem: o,
      items: i,
      layoutRef: r
    } = Is({
      ...e,
      fullHeight: !0
    }), {
      rtlClasses: s
    } = it();
    return ie(() => {
      var u;
      return C("div", {
        ref: r,
        class: me(["v-application", a.themeClasses.value, n.value, s.value, e.class]),
        style: Ce([e.style])
      }, [C("div", {
        class: "v-application__wrap"
      }, [(u = t.default) == null ? void 0 : u.call(t)])]);
    }), {
      getLayoutItem: o,
      items: i,
      theme: a
    };
  }
}), Wn = K({
  text: String,
  ...ke(),
  ...Ke()
}, "VToolbarTitle"), Un = ne()({
  name: "VToolbarTitle",
  props: Wn(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    return ie(() => {
      const a = !!(t.default || t.text || e.text);
      return h(e.tag, {
        class: me(["v-toolbar-title", e.class]),
        style: Ce(e.style)
      }, {
        default: () => {
          var n;
          return [a && C("div", {
            class: "v-toolbar-title__placeholder"
          }, [t.text ? t.text() : e.text, (n = t.default) == null ? void 0 : n.call(t)])];
        }
      });
    }), {};
  }
}), Us = [null, "prominent", "default", "comfortable", "compact"], jn = K({
  absolute: Boolean,
  collapse: Boolean,
  color: String,
  density: {
    type: String,
    default: "default",
    validator: (e) => Us.includes(e)
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
  ...Wt(),
  ...ke(),
  ...zt(),
  ...kt(),
  ...Ke({
    tag: "header"
  }),
  ...Ne()
}, "VToolbar"), Ua = ne()({
  name: "VToolbar",
  props: jn(),
  setup(e, l) {
    var f;
    let {
      slots: t
    } = l;
    const {
      backgroundColorClasses: a,
      backgroundColorStyles: n
    } = ft(() => e.color), {
      borderClasses: o
    } = pa(e), {
      elevationClasses: i
    } = wa(e), {
      roundedClasses: r
    } = Bt(e), {
      themeClasses: s
    } = qe(e), {
      rtlClasses: u
    } = it(), c = ee(e.extended === null ? !!((f = t.extension) != null && f.call(t)) : e.extended), d = I(() => parseInt(Number(e.height) + (e.density === "prominent" ? Number(e.height) : 0) - (e.density === "comfortable" ? 8 : 0) - (e.density === "compact" ? 16 : 0), 10)), v = I(() => c.value ? parseInt(Number(e.extensionHeight) + (e.density === "prominent" ? Number(e.extensionHeight) : 0) - (e.density === "comfortable" ? 4 : 0) - (e.density === "compact" ? 8 : 0), 10) : 0);
    return lt({
      VBtn: {
        variant: "text"
      }
    }), ie(() => {
      var p;
      const g = !!(e.title || t.title), k = !!(t.image || e.image), y = (p = t.extension) == null ? void 0 : p.call(t);
      return c.value = e.extended === null ? !!y : e.extended, h(e.tag, {
        class: me(["v-toolbar", {
          "v-toolbar--absolute": e.absolute,
          "v-toolbar--collapse": e.collapse,
          "v-toolbar--flat": e.flat,
          "v-toolbar--floating": e.floating,
          [`v-toolbar--density-${e.density}`]: !0
        }, a.value, o.value, i.value, r.value, s.value, u.value, e.class]),
        style: Ce([n.value, e.style])
      }, {
        default: () => [k && C("div", {
          key: "image",
          class: "v-toolbar__image"
        }, [t.image ? h(Me, {
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
        }, null)]), h(Me, {
          defaults: {
            VTabs: {
              height: he(d.value)
            }
          }
        }, {
          default: () => {
            var m, A, S;
            return [C("div", {
              class: "v-toolbar__content",
              style: {
                height: he(d.value)
              }
            }, [t.prepend && C("div", {
              class: "v-toolbar__prepend"
            }, [(m = t.prepend) == null ? void 0 : m.call(t)]), g && h(Un, {
              key: "title",
              text: e.title
            }, {
              text: t.title
            }), (A = t.default) == null ? void 0 : A.call(t), t.append && C("div", {
              class: "v-toolbar__append"
            }, [(S = t.append) == null ? void 0 : S.call(t)])])];
          }
        }), h(Me, {
          defaults: {
            VTabs: {
              height: he(v.value)
            }
          }
        }, {
          default: () => [h(Ui, null, {
            default: () => [c.value && C("div", {
              class: "v-toolbar__extension",
              style: {
                height: he(v.value)
              }
            }, [y])]
          })]
        })]
      });
    }), {
      contentHeight: d,
      extensionHeight: v
    };
  }
}), js = K({
  scrollTarget: {
    type: String
  },
  scrollThreshold: {
    type: [String, Number],
    default: 300
  }
}, "scroll");
function Ks(e) {
  let l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    canScroll: t
  } = l;
  let a = 0, n = 0;
  const o = q(null), i = ee(0), r = ee(0), s = ee(0), u = ee(!1), c = ee(!1), d = I(() => Number(e.scrollThreshold)), v = I(() => Je((d.value - i.value) / d.value || 0)), f = () => {
    const g = o.value;
    if (!g || t && !t.value) return;
    a = i.value, i.value = "window" in g ? g.pageYOffset : g.scrollTop;
    const k = g instanceof Window ? document.documentElement.scrollHeight : g.scrollHeight;
    if (n !== k) {
      n = k;
      return;
    }
    c.value = i.value < a, s.value = Math.abs(i.value - d.value);
  };
  return Q(c, () => {
    r.value = r.value || i.value;
  }), Q(u, () => {
    r.value = 0;
  }), We(() => {
    Q(() => e.scrollTarget, (g) => {
      var y;
      const k = g ? document.querySelector(g) : window;
      if (!k) {
        dl(`Unable to locate element with identifier ${g}`);
        return;
      }
      k !== o.value && ((y = o.value) == null || y.removeEventListener("scroll", f), o.value = k, o.value.addEventListener("scroll", f, {
        passive: !0
      }));
    }, {
      immediate: !0
    });
  }), yt(() => {
    var g;
    (g = o.value) == null || g.removeEventListener("scroll", f);
  }), t && Q(t, f, {
    immediate: !0
  }), {
    scrollThreshold: d,
    currentScroll: i,
    currentThreshold: s,
    isScrollActive: u,
    scrollRatio: v,
    // required only for testing
    // probably can be removed
    // later (2 chars chlng)
    isScrollingUp: c,
    savedScroll: r
  };
}
const Gs = K({
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
  ...jn(),
  ...Mn(),
  ...js(),
  height: {
    type: [Number, String],
    default: 64
  }
}, "VAppBar"), Ys = ne()({
  name: "VAppBar",
  props: Gs(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = q(), n = we(e, "modelValue"), o = I(() => {
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
      !n.value;
    }), {
      currentScroll: r,
      scrollThreshold: s,
      isScrollingUp: u,
      scrollRatio: c
    } = Ks(e, {
      canScroll: i
    }), d = H(() => o.value.hide || o.value.fullyHide), v = I(() => e.collapse || o.value.collapse && (o.value.inverted ? c.value > 0 : c.value === 0)), f = I(() => e.flat || o.value.fullyHide && !n.value || o.value.elevate && (o.value.inverted ? r.value > 0 : r.value === 0)), g = I(() => o.value.fadeImage ? o.value.inverted ? 1 - c.value : c.value : void 0), k = I(() => {
      var S, V;
      if (o.value.hide && o.value.inverted) return 0;
      const m = ((S = a.value) == null ? void 0 : S.contentHeight) ?? 0, A = ((V = a.value) == null ? void 0 : V.extensionHeight) ?? 0;
      return d.value ? r.value < s.value || o.value.fullyHide ? m + A : m : m + A;
    });
    Xe(() => !!e.scrollBehavior, () => {
      tt(() => {
        d.value ? o.value.inverted ? n.value = r.value > s.value : n.value = u.value || r.value < s.value : n.value = !0;
      });
    });
    const {
      ssrBootStyles: y
    } = xa(), {
      layoutItemStyles: p
    } = Dn({
      id: e.name,
      order: I(() => parseInt(e.order, 10)),
      position: H(() => e.location),
      layoutSize: k,
      elementSize: ee(void 0),
      active: n,
      absolute: H(() => e.absolute)
    });
    return ie(() => {
      const m = Ua.filterProps(e);
      return h(Ua, R({
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
      }, m, {
        collapse: v.value,
        flat: f.value
      }), t);
    }), {};
  }
}), qs = K({
  ...mn({
    icon: "$menu",
    variant: "text"
  })
}, "VAppBarNavIcon"), Kn = ne()({
  name: "VAppBarNavIcon",
  props: qs(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    return ie(() => h(pe, R(e, {
      class: ["v-app-bar-nav-icon"]
    }), t)), {};
  }
}), Xl = ne()({
  name: "VAppBarTitle",
  props: Wn(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    return ie(() => h(Un, R(e, {
      class: "v-app-bar-title"
    }), t)), {};
  }
}), Xs = K({
  scrollable: Boolean,
  ...ke(),
  ...jt(),
  ...Ke({
    tag: "main"
  })
}, "VMain"), Zs = ne()({
  name: "VMain",
  props: Xs(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    const {
      dimensionStyles: a
    } = Ut(e), {
      mainStyles: n
    } = Rn(), {
      ssrBootStyles: o
    } = xa();
    return ie(() => h(e.tag, {
      class: me(["v-main", {
        "v-main--scrollable": e.scrollable
      }, e.class]),
      style: Ce([n.value, o.value, a.value, e.style])
    }, {
      default: () => {
        var i, r;
        return [e.scrollable ? C("div", {
          class: "v-main__scroller"
        }, [(i = t.default) == null ? void 0 : i.call(t)]) : (r = t.default) == null ? void 0 : r.call(t)];
      }
    })), {};
  }
});
function Oa(e, l) {
  return {
    x: e.x + l.x,
    y: e.y + l.y
  };
}
function Qs(e, l) {
  return {
    x: e.x - l.x,
    y: e.y - l.y
  };
}
function Zl(e, l) {
  if (e.side === "top" || e.side === "bottom") {
    const {
      side: t,
      align: a
    } = e, n = a === "left" ? 0 : a === "center" ? l.width / 2 : a === "right" ? l.width : a, o = t === "top" ? 0 : t === "bottom" ? l.height : t;
    return Oa({
      x: n,
      y: o
    }, l);
  } else if (e.side === "left" || e.side === "right") {
    const {
      side: t,
      align: a
    } = e, n = t === "left" ? 0 : t === "right" ? l.width : t, o = a === "top" ? 0 : a === "center" ? l.height / 2 : a === "bottom" ? l.height : a;
    return Oa({
      x: n,
      y: o
    }, l);
  }
  return Oa({
    x: l.width / 2,
    y: l.height / 2
  }, l);
}
const Gn = {
  static: tr,
  // specific viewport position, usually centered
  connected: lr
  // connected to a certain element
}, Js = K({
  locationStrategy: {
    type: [String, Function],
    default: "static",
    validator: (e) => typeof e == "function" || e in Gn
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
function er(e, l) {
  const t = q({}), a = q();
  ze && Xe(() => !!(l.isActive.value && e.locationStrategy), (r) => {
    var s, u;
    Q(() => e.locationStrategy, r), je(() => {
      window.removeEventListener("resize", n), visualViewport == null || visualViewport.removeEventListener("resize", o), visualViewport == null || visualViewport.removeEventListener("scroll", i), a.value = void 0;
    }), window.addEventListener("resize", n, {
      passive: !0
    }), visualViewport == null || visualViewport.addEventListener("resize", o, {
      passive: !0
    }), visualViewport == null || visualViewport.addEventListener("scroll", i, {
      passive: !0
    }), typeof e.locationStrategy == "function" ? a.value = (s = e.locationStrategy(l, e, t)) == null ? void 0 : s.updateLocation : a.value = (u = Gn[e.locationStrategy](l, e, t)) == null ? void 0 : u.updateLocation;
  });
  function n(r) {
    var s;
    (s = a.value) == null || s.call(a, r);
  }
  function o(r) {
    var s;
    (s = a.value) == null || s.call(a, r);
  }
  function i(r) {
    var s;
    (s = a.value) == null || s.call(a, r);
  }
  return {
    contentStyles: t,
    updateLocation: a
  };
}
function tr() {
}
function ar(e, l) {
  const t = fl(e);
  return l ? t.x += parseFloat(e.style.right || 0) : t.x -= parseFloat(e.style.left || 0), t.y -= parseFloat(e.style.top || 0), t;
}
function lr(e, l, t) {
  (Array.isArray(e.target.value) || Vs(e.target.value)) && Object.assign(t.value, {
    position: "fixed",
    top: 0,
    [e.isRtl.value ? "right" : "left"]: 0
  });
  const {
    preferredAnchor: n,
    preferredOrigin: o
  } = ts(() => {
    const p = Ll(l.location, e.isRtl.value), m = l.origin === "overlap" ? p : l.origin === "auto" ? Ta(p) : Ll(l.origin, e.isRtl.value);
    return p.side === m.side && p.align === _a(m).align ? {
      preferredAnchor: Ml(p),
      preferredOrigin: Ml(m)
    } : {
      preferredAnchor: p,
      preferredOrigin: m
    };
  }), [i, r, s, u] = ["minWidth", "minHeight", "maxWidth", "maxHeight"].map((p) => I(() => {
    const m = parseFloat(l[p]);
    return isNaN(m) ? 1 / 0 : m;
  })), c = I(() => {
    if (Array.isArray(l.offset))
      return l.offset;
    if (typeof l.offset == "string") {
      const p = l.offset.split(" ").map(parseFloat);
      return p.length < 2 && p.push(0), p;
    }
    return typeof l.offset == "number" ? [l.offset, 0] : [0, 0];
  });
  let d = !1, v = -1;
  const f = new An(4), g = new ResizeObserver(() => {
    if (!d) return;
    if (requestAnimationFrame((m) => {
      m !== v && f.clear(), requestAnimationFrame((A) => {
        v = A;
      });
    }), f.isFull) {
      const m = f.values();
      if (et(m.at(-1), m.at(-3)) && !et(m.at(-1), m.at(-2)))
        return;
    }
    const p = y();
    p && f.push(p.flipped);
  });
  let k = new at({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  Q(e.target, (p, m) => {
    m && !Array.isArray(m) && g.unobserve(m), Array.isArray(p) ? et(p, m) || y() : p && g.observe(p);
  }, {
    immediate: !0
  }), Q(e.contentEl, (p, m) => {
    m && g.unobserve(m), p && g.observe(p);
  }, {
    immediate: !0
  }), je(() => {
    g.disconnect();
  });
  function y() {
    if (d = !1, requestAnimationFrame(() => d = !0), !e.target.value || !e.contentEl.value) return;
    (Array.isArray(e.target.value) || e.target.value.offsetParent || e.target.value.getClientRects().length) && (k = En(e.target.value));
    const p = ar(e.contentEl.value, e.isRtl.value), m = sa(e.contentEl.value), A = 12;
    m.length || (m.push(document.documentElement), e.contentEl.value.style.top && e.contentEl.value.style.left || (p.x -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0), p.y -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0)));
    const S = m.reduce((M, U) => {
      const j = ws(U);
      return M ? new at({
        x: Math.max(M.left, j.left),
        y: Math.max(M.top, j.top),
        width: Math.min(M.right, j.right) - Math.max(M.left, j.left),
        height: Math.min(M.bottom, j.bottom) - Math.max(M.top, j.top)
      }) : j;
    }, void 0);
    S.x += A, S.y += A, S.width -= A * 2, S.height -= A * 2;
    let V = {
      anchor: n.value,
      origin: o.value
    };
    function x(M) {
      const U = new at(p), j = Zl(M.anchor, k), Y = Zl(M.origin, U);
      let {
        x: ae,
        y: le
      } = Qs(j, Y);
      switch (M.anchor.side) {
        case "top":
          le -= c.value[0];
          break;
        case "bottom":
          le += c.value[0];
          break;
        case "left":
          ae -= c.value[0];
          break;
        case "right":
          ae += c.value[0];
          break;
      }
      switch (M.anchor.align) {
        case "top":
          le -= c.value[1];
          break;
        case "bottom":
          le += c.value[1];
          break;
        case "left":
          ae -= c.value[1];
          break;
        case "right":
          ae += c.value[1];
          break;
      }
      return U.x += ae, U.y += le, U.width = Math.min(U.width, s.value), U.height = Math.min(U.height, u.value), {
        overflows: Wl(U, S),
        x: ae,
        y: le
      };
    }
    let P = 0, b = 0;
    const _ = {
      x: 0,
      y: 0
    }, T = {
      x: !1,
      y: !1
    };
    let $ = -1;
    for (; ; ) {
      if ($++ > 10) {
        Tn("Infinite loop detected in connectedLocationStrategy");
        break;
      }
      const {
        x: M,
        y: U,
        overflows: j
      } = x(V);
      P += M, b += U, p.x += M, p.y += U;
      {
        const Y = Rl(V.anchor), ae = j.x.before || j.x.after, le = j.y.before || j.y.after;
        let ce = !1;
        if (["x", "y"].forEach((B) => {
          if (B === "x" && ae && !T.x || B === "y" && le && !T.y) {
            const E = {
              anchor: {
                ...V.anchor
              },
              origin: {
                ...V.origin
              }
            }, F = B === "x" ? Y === "y" ? _a : Ta : Y === "y" ? Ta : _a;
            E.anchor = F(E.anchor), E.origin = F(E.origin);
            const {
              overflows: W
            } = x(E);
            (W[B].before <= j[B].before && W[B].after <= j[B].after || W[B].before + W[B].after < (j[B].before + j[B].after) / 2) && (V = E, ce = T[B] = !0);
          }
        }), ce) continue;
      }
      j.x.before && (P += j.x.before, p.x += j.x.before), j.x.after && (P -= j.x.after, p.x -= j.x.after), j.y.before && (b += j.y.before, p.y += j.y.before), j.y.after && (b -= j.y.after, p.y -= j.y.after);
      {
        const Y = Wl(p, S);
        _.x = S.width - Y.x.before - Y.x.after, _.y = S.height - Y.y.before - Y.y.after, P += Y.x.before, p.x += Y.x.before, b += Y.y.before, p.y += Y.y.before;
      }
      break;
    }
    const D = Rl(V.anchor);
    return Object.assign(t.value, {
      "--v-overlay-anchor-origin": `${V.anchor.side} ${V.anchor.align}`,
      transformOrigin: `${V.origin.side} ${V.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: he(Fa(b)),
      left: e.isRtl.value ? void 0 : he(Fa(P)),
      right: e.isRtl.value ? he(Fa(-P)) : void 0,
      minWidth: he(D === "y" ? Math.min(i.value, k.width) : i.value),
      maxWidth: he(Ql(Je(_.x, i.value === 1 / 0 ? 0 : i.value, s.value))),
      maxHeight: he(Ql(Je(_.y, r.value === 1 / 0 ? 0 : r.value, u.value)))
    }), {
      available: _,
      contentBox: p,
      flipped: T
    };
  }
  return Q(() => [n.value, o.value, l.offset, l.minWidth, l.minHeight, l.maxWidth, l.maxHeight], () => y()), Ee(() => {
    const p = y();
    if (!p) return;
    const {
      available: m,
      contentBox: A
    } = p;
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
function Ql(e) {
  return Math.ceil(e * devicePixelRatio) / devicePixelRatio;
}
let ja = !0;
const ra = [];
function nr(e) {
  !ja || ra.length ? (ra.push(e), Ka()) : (ja = !1, e(), Ka());
}
let Jl = -1;
function Ka() {
  cancelAnimationFrame(Jl), Jl = requestAnimationFrame(() => {
    const e = ra.shift();
    e && e(), ra.length ? Ka() : ja = !0;
  });
}
const aa = {
  none: null,
  close: sr,
  block: rr,
  reposition: ur
}, or = K({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (e) => typeof e == "function" || e in aa
  }
}, "VOverlay-scroll-strategies");
function ir(e, l) {
  if (!ze) return;
  let t;
  tt(async () => {
    t == null || t.stop(), l.isActive.value && e.scrollStrategy && (t = dn(), await new Promise((a) => setTimeout(a)), t.active && t.run(() => {
      var a;
      typeof e.scrollStrategy == "function" ? e.scrollStrategy(l, e, t) : (a = aa[e.scrollStrategy]) == null || a.call(aa, l, e, t);
    }));
  }), je(() => {
    t == null || t.stop();
  });
}
function sr(e) {
  function l(t) {
    e.isActive.value = !1;
  }
  Yn(gl(e.target.value, e.contentEl.value), l);
}
function rr(e, l) {
  var r;
  const t = (r = e.root.value) == null ? void 0 : r.offsetParent, a = gl(e.target.value, e.contentEl.value), n = [.../* @__PURE__ */ new Set([...sa(a, l.contained ? t : void 0), ...sa(e.contentEl.value, l.contained ? t : void 0)])].filter((s) => !s.classList.contains("v-overlay-scroll-blocked")), o = window.innerWidth - document.documentElement.offsetWidth, i = ((s) => ml(s) && s)(t || document.documentElement);
  i && e.root.value.classList.add("v-overlay--scroll-blocked"), n.forEach((s, u) => {
    s.style.setProperty("--v-body-scroll-x", he(-s.scrollLeft)), s.style.setProperty("--v-body-scroll-y", he(-s.scrollTop)), s !== document.documentElement && s.style.setProperty("--v-scrollbar-offset", he(o)), s.classList.add("v-overlay-scroll-blocked");
  }), je(() => {
    n.forEach((s, u) => {
      const c = parseFloat(s.style.getPropertyValue("--v-body-scroll-x")), d = parseFloat(s.style.getPropertyValue("--v-body-scroll-y")), v = s.style.scrollBehavior;
      s.style.scrollBehavior = "auto", s.style.removeProperty("--v-body-scroll-x"), s.style.removeProperty("--v-body-scroll-y"), s.style.removeProperty("--v-scrollbar-offset"), s.classList.remove("v-overlay-scroll-blocked"), s.scrollLeft = -c, s.scrollTop = -d, s.style.scrollBehavior = v;
    }), i && e.root.value.classList.remove("v-overlay--scroll-blocked");
  });
}
function ur(e, l, t) {
  let a = !1, n = -1, o = -1;
  function i(r) {
    nr(() => {
      var c, d;
      const s = performance.now();
      (d = (c = e.updateLocation).value) == null || d.call(c, r), a = (performance.now() - s) / (1e3 / 60) > 2;
    });
  }
  o = (typeof requestIdleCallback > "u" ? (r) => r() : requestIdleCallback)(() => {
    t.run(() => {
      Yn(gl(e.target.value, e.contentEl.value), (r) => {
        a ? (cancelAnimationFrame(n), n = requestAnimationFrame(() => {
          n = requestAnimationFrame(() => {
            i(r);
          });
        })) : i(r);
      });
    });
  }), je(() => {
    typeof cancelIdleCallback < "u" && cancelIdleCallback(o), cancelAnimationFrame(n);
  });
}
function gl(e, l) {
  return Array.isArray(e) ? document.elementsFromPoint(...e).find((t) => !(l != null && l.contains(t))) : e ?? l;
}
function Yn(e, l) {
  const t = [document, ...sa(e)];
  t.forEach((a) => {
    a.addEventListener("scroll", l, {
      passive: !0
    });
  }), je(() => {
    t.forEach((a) => {
      a.removeEventListener("scroll", l);
    });
  });
}
const Ga = Symbol.for("vuetify:v-menu"), cr = K({
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
  ...Hn()
}, "VOverlay-activator");
function dr(e, l) {
  let {
    isActive: t,
    isTop: a,
    contentEl: n
  } = l;
  const o = ot("useActivator"), i = q();
  let r = !1, s = !1, u = !0;
  const c = I(() => e.openOnFocus || e.openOnFocus == null && e.openOnHover), d = I(() => e.openOnClick || e.openOnClick == null && !e.openOnHover && !c.value), {
    runOpenDelay: v,
    runCloseDelay: f
  } = zn(e, (b) => {
    b === (e.openOnHover && r || c.value && s) && !(e.openOnHover && t.value && !a.value) && (t.value !== b && (u = !0), t.value = b);
  }), g = q(), k = {
    onClick: (b) => {
      b.stopPropagation(), i.value = b.currentTarget || b.target, t.value || (g.value = [b.clientX, b.clientY]), t.value = !t.value;
    },
    onMouseenter: (b) => {
      var _;
      (_ = b.sourceCapabilities) != null && _.firesTouchEvents || (r = !0, i.value = b.currentTarget || b.target, v());
    },
    onMouseleave: (b) => {
      r = !1, f();
    },
    onFocus: (b) => {
      At(b.target, ":focus-visible") !== !1 && (s = !0, b.stopPropagation(), i.value = b.currentTarget || b.target, v());
    },
    onBlur: (b) => {
      s = !1, b.stopPropagation(), f();
    }
  }, y = I(() => {
    const b = {};
    return d.value && (b.onClick = k.onClick), e.openOnHover && (b.onMouseenter = k.onMouseenter, b.onMouseleave = k.onMouseleave), c.value && (b.onFocus = k.onFocus, b.onBlur = k.onBlur), b;
  }), p = I(() => {
    const b = {};
    if (e.openOnHover && (b.onMouseenter = () => {
      r = !0, v();
    }, b.onMouseleave = () => {
      r = !1, f();
    }), c.value && (b.onFocusin = () => {
      s = !0, v();
    }, b.onFocusout = () => {
      s = !1, f();
    }), e.closeOnContentClick) {
      const _ = ge(Ga, null);
      b.onClick = () => {
        t.value = !1, _ == null || _.closeParents();
      };
    }
    return b;
  }), m = I(() => {
    const b = {};
    return e.openOnHover && (b.onMouseenter = () => {
      u && (r = !0, u = !1, v());
    }, b.onMouseleave = () => {
      r = !1, f();
    }), b;
  });
  Q(a, (b) => {
    var _;
    b && (e.openOnHover && !r && (!c.value || !s) || c.value && !s && (!e.openOnHover || !r)) && !((_ = n.value) != null && _.contains(document.activeElement)) && (t.value = !1);
  }), Q(t, (b) => {
    b || setTimeout(() => {
      g.value = void 0;
    });
  }, {
    flush: "post"
  });
  const A = Hl();
  tt(() => {
    A.value && Ee(() => {
      i.value = A.el;
    });
  });
  const S = Hl(), V = I(() => e.target === "cursor" && g.value ? g.value : S.value ? S.el : qn(e.target, o) || i.value), x = I(() => Array.isArray(V.value) ? void 0 : V.value);
  let P;
  return Q(() => !!e.activator, (b) => {
    b && ze ? (P = dn(), P.run(() => {
      vr(e, o, {
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
    target: V,
    targetEl: x,
    targetRef: S,
    activatorEvents: y,
    contentEvents: p,
    scrimEvents: m
  };
}
function vr(e, l, t) {
  let {
    activatorEl: a,
    activatorEvents: n
  } = t;
  Q(() => e.activator, (s, u) => {
    if (u && s !== u) {
      const c = r(u);
      c && i(c);
    }
    s && Ee(() => o());
  }, {
    immediate: !0
  }), Q(() => e.activatorProps, () => {
    o();
  }), je(() => {
    i();
  });
  function o() {
    let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : r(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    s && xs(s, R(n.value, u));
  }
  function i() {
    let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : r(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    s && Ss(s, R(n.value, u));
  }
  function r() {
    let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : e.activator;
    const u = qn(s, l);
    return a.value = (u == null ? void 0 : u.nodeType) === Node.ELEMENT_NODE ? u : void 0, a.value;
  }
}
function qn(e, l) {
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
function fr() {
  if (!ze) return ee(!1);
  const {
    ssr: e
  } = pt();
  if (e) {
    const l = ee(!1);
    return We(() => {
      l.value = !0;
    }), l;
  } else
    return ee(!0);
}
const Xn = K({
  eager: Boolean
}, "lazy");
function Zn(e, l) {
  const t = ee(!1), a = H(() => t.value || e.eager || l.value);
  Q(l, () => t.value = !0);
  function n() {
    e.eager || (t.value = !1);
  }
  return {
    isBooted: t,
    hasContent: a,
    onAfterLeave: n
  };
}
const en = Symbol.for("vuetify:stack"), Ft = Qe([]);
function mr(e, l, t) {
  const a = ot("useStack"), n = !t, o = ge(en, void 0), i = Qe({
    activeChildren: /* @__PURE__ */ new Set()
  });
  Ue(en, i);
  const r = ee(Number(Ol(l)));
  Xe(e, () => {
    var d;
    const c = (d = Ft.at(-1)) == null ? void 0 : d[1];
    r.value = c ? c + 10 : Number(Ol(l)), n && Ft.push([a.uid, r.value]), o == null || o.activeChildren.add(a.uid), je(() => {
      if (n) {
        const v = bi(Ft).findIndex((f) => f[0] === a.uid);
        Ft.splice(v, 1);
      }
      o == null || o.activeChildren.delete(a.uid);
    });
  });
  const s = ee(!0);
  n && tt(() => {
    var d;
    const c = ((d = Ft.at(-1)) == null ? void 0 : d[0]) === a.uid;
    setTimeout(() => s.value = c);
  });
  const u = H(() => !i.activeChildren.size);
  return {
    globalTop: cn(s),
    localTop: u,
    stackStyles: H(() => ({
      zIndex: r.value
    }))
  };
}
function gr(e) {
  return {
    teleportTarget: I(() => {
      const t = e();
      if (t === !0 || !ze) return;
      const a = t === !1 ? document.body : typeof t == "string" ? document.querySelector(t) : t;
      if (a == null) {
        pi(`Unable to locate target ${t}`);
        return;
      }
      let n = [...a.children].find((o) => o.matches(".v-overlay-container"));
      return n || (n = document.createElement("div"), n.className = "v-overlay-container", a.appendChild(n)), n;
    })
  };
}
function yr() {
  return !0;
}
function Qn(e, l, t) {
  if (!e || Jn(e, t) === !1) return !1;
  const a = On(l);
  if (typeof ShadowRoot < "u" && a instanceof ShadowRoot && a.host === e.target) return !1;
  const n = (typeof t.value == "object" && t.value.include || (() => []))();
  return n.push(l), !n.some((o) => o == null ? void 0 : o.contains(e.target));
}
function Jn(e, l) {
  return (typeof l.value == "object" && l.value.closeConditional || yr)(e);
}
function hr(e, l, t) {
  const a = typeof t.value == "function" ? t.value : t.value.handler;
  e.shadowTarget = e.target, l._clickOutside.lastMousedownWasOutside && Qn(e, l, t) && setTimeout(() => {
    Jn(e, t) && a && a(e);
  }, 0);
}
function tn(e, l) {
  const t = On(e);
  l(document), typeof ShadowRoot < "u" && t instanceof ShadowRoot && l(t);
}
const an = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(e, l) {
    const t = (n) => hr(n, e, l), a = (n) => {
      e._clickOutside.lastMousedownWasOutside = Qn(n, e, l);
    };
    tn(e, (n) => {
      n.addEventListener("click", t, !0), n.addEventListener("mousedown", a, !0);
    }), e._clickOutside || (e._clickOutside = {
      lastMousedownWasOutside: !1
    }), e._clickOutside[l.instance.$.uid] = {
      onClick: t,
      onMousedown: a
    };
  },
  beforeUnmount(e, l) {
    e._clickOutside && (tn(e, (t) => {
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
function br(e) {
  const {
    modelValue: l,
    color: t,
    ...a
  } = e;
  return h(la, {
    name: "fade-transition",
    appear: !0
  }, {
    default: () => [e.modelValue && C("div", R({
      class: ["v-overlay__scrim", e.color.backgroundColorClasses.value],
      style: e.color.backgroundColorStyles.value
    }, a), null)]
  });
}
const yl = K({
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
  ...cr(),
  ...ke(),
  ...jt(),
  ...Xn(),
  ...Js(),
  ...or(),
  ...Ne(),
  ...Kt()
}, "VOverlay"), ua = ne()({
  name: "VOverlay",
  directives: {
    vClickOutside: an
  },
  inheritAttrs: !1,
  props: {
    _disableGlobalStack: Boolean,
    ...yl()
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
    const o = ot("VOverlay"), i = q(), r = q(), s = q(), u = we(e, "modelValue"), c = I({
      get: () => u.value,
      set: (Z) => {
        Z && e.disabled || (u.value = Z);
      }
    }), {
      themeClasses: d
    } = qe(e), {
      rtlClasses: v,
      isRtl: f
    } = it(), {
      hasContent: g,
      onAfterLeave: k
    } = Zn(e, c), y = ft(() => typeof e.scrim == "string" ? e.scrim : null), {
      globalTop: p,
      localTop: m,
      stackStyles: A
    } = mr(c, () => e.zIndex, e._disableGlobalStack), {
      activatorEl: S,
      activatorRef: V,
      target: x,
      targetEl: P,
      targetRef: b,
      activatorEvents: _,
      contentEvents: T,
      scrimEvents: $
    } = dr(e, {
      isActive: c,
      isTop: m,
      contentEl: s
    }), {
      teleportTarget: D
    } = gr(() => {
      var de, N, J;
      const Z = e.attach || e.contained;
      if (Z) return Z;
      const se = ((de = S == null ? void 0 : S.value) == null ? void 0 : de.getRootNode()) || ((J = (N = o.proxy) == null ? void 0 : N.$el) == null ? void 0 : J.getRootNode());
      return se instanceof ShadowRoot ? se : !1;
    }), {
      dimensionStyles: M
    } = Ut(e), U = fr(), {
      scopeId: j
    } = Xt();
    Q(() => e.disabled, (Z) => {
      Z && (c.value = !1);
    });
    const {
      contentStyles: Y,
      updateLocation: ae
    } = er(e, {
      isRtl: f,
      contentEl: s,
      target: x,
      isActive: c
    });
    ir(e, {
      root: i,
      contentEl: s,
      targetEl: P,
      target: x,
      isActive: c,
      updateLocation: ae
    });
    function le(Z) {
      n("click:outside", Z), e.persistent ? ve() : c.value = !1;
    }
    function ce(Z) {
      return c.value && p.value && // If using scrim, only close if clicking on it rather than anything opened on top
      (!e.scrim || Z.target === r.value || Z instanceof MouseEvent && Z.shadowTarget === r.value);
    }
    ze && Q(c, (Z) => {
      Z ? window.addEventListener("keydown", B) : window.removeEventListener("keydown", B);
    }, {
      immediate: !0
    }), yt(() => {
      ze && window.removeEventListener("keydown", B);
    });
    function B(Z) {
      var se, de, N;
      Z.key === "Escape" && p.value && ((se = s.value) != null && se.contains(document.activeElement) || n("keydown", Z), e.persistent ? ve() : (c.value = !1, (de = s.value) != null && de.contains(document.activeElement) && ((N = S.value) == null || N.focus())));
    }
    function E(Z) {
      Z.key === "Escape" && !p.value || n("keydown", Z);
    }
    const F = fn();
    Xe(() => e.closeOnBack, () => {
      ji(F, (Z) => {
        p.value && c.value ? (Z(!1), e.persistent ? ve() : c.value = !1) : Z();
      });
    });
    const W = q();
    Q(() => c.value && (e.absolute || e.contained) && D.value == null, (Z) => {
      if (Z) {
        const se = Fn(i.value);
        se && se !== document.scrollingElement && (W.value = se.scrollTop);
      }
    });
    function ve() {
      e.noClickAnimation || s.value && wt(s.value, [{
        transformOrigin: "center"
      }, {
        transform: "scale(1.03)"
      }, {
        transformOrigin: "center"
      }], {
        duration: 150,
        easing: Mt
      });
    }
    function te() {
      n("afterEnter");
    }
    function ue() {
      k(), n("afterLeave");
    }
    return ie(() => {
      var Z;
      return C(X, null, [(Z = t.activator) == null ? void 0 : Z.call(t, {
        isActive: c.value,
        targetRef: b,
        props: R({
          ref: V
        }, _.value, e.activatorProps)
      }), U.value && g.value && h(Na, {
        disabled: !D.value,
        to: D.value
      }, {
        default: () => [C("div", R({
          class: ["v-overlay", {
            "v-overlay--absolute": e.absolute || e.contained,
            "v-overlay--active": c.value,
            "v-overlay--contained": e.contained
          }, d.value, v.value, e.class],
          style: [A.value, {
            "--v-overlay-opacity": e.opacity,
            top: he(W.value)
          }, e.style],
          ref: i,
          onKeydown: E
        }, j, a), [h(br, R({
          color: y,
          modelValue: c.value && !!e.scrim,
          ref: r
        }, $.value), null), h(Sa, {
          appear: !0,
          persisted: !0,
          transition: e.transition,
          target: x.value,
          onAfterEnter: te,
          onAfterLeave: ue
        }, {
          default: () => {
            var se;
            return [Ye(C("div", R({
              ref: s,
              class: ["v-overlay__content", e.contentClass],
              style: [M.value, Y.value]
            }, T.value, e.contentProps), [(se = t.default) == null ? void 0 : se.call(t, {
              isActive: c
            })]), [[_t, c.value], [an, {
              handler: le,
              closeConditional: ce,
              include: () => [S.value]
            }]])];
          }
        })])]
      })]);
    }), {
      activatorEl: S,
      scrimEl: r,
      target: x,
      animateClick: ve,
      contentEl: s,
      globalTop: p,
      localTop: m,
      updateLocation: ae
    };
  }
}), La = Symbol("Forwarded refs");
function Ma(e, l) {
  let t = e;
  for (; t; ) {
    const a = Reflect.getOwnPropertyDescriptor(t, l);
    if (a) return a;
    t = Object.getPrototypeOf(t);
  }
}
function dt(e) {
  for (var l = arguments.length, t = new Array(l > 1 ? l - 1 : 0), a = 1; a < l; a++)
    t[a - 1] = arguments[a];
  return e[La] = t, new Proxy(e, {
    get(n, o) {
      if (Reflect.has(n, o))
        return Reflect.get(n, o);
      if (!(typeof o == "symbol" || o.startsWith("$") || o.startsWith("__"))) {
        for (const i of t)
          if (i.value && Reflect.has(i.value, o)) {
            const r = Reflect.get(i.value, o);
            return typeof r == "function" ? r.bind(i.value) : r;
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
      for (const r of t)
        if (r.value && Reflect.has(r.value, o))
          return Reflect.set(r.value, o, i);
      return !1;
    },
    getOwnPropertyDescriptor(n, o) {
      var r;
      const i = Reflect.getOwnPropertyDescriptor(n, o);
      if (i) return i;
      if (!(typeof o == "symbol" || o.startsWith("$") || o.startsWith("__"))) {
        for (const s of t) {
          if (!s.value) continue;
          const u = Ma(s.value, o) ?? ("_" in s.value ? Ma((r = s.value._) == null ? void 0 : r.setupState, o) : void 0);
          if (u) return u;
        }
        for (const s of t) {
          const u = s.value && s.value[La];
          if (!u) continue;
          const c = u.slice();
          for (; c.length; ) {
            const d = c.shift(), v = Ma(d.value, o);
            if (v) return v;
            const f = d.value && d.value[La];
            f && c.push(...f);
          }
        }
      }
    }
  });
}
function pr(e) {
  const l = ee(e());
  let t = -1;
  function a() {
    clearInterval(t);
  }
  function n() {
    a(), Ee(() => l.value = e());
  }
  function o(i) {
    const r = i ? getComputedStyle(i) : {
      transitionDuration: 0.2
    }, s = parseFloat(r.transitionDuration) * 1e3 || 200;
    if (a(), l.value <= 0) return;
    const u = performance.now();
    t = window.setInterval(() => {
      const c = performance.now() - u + s;
      l.value = Math.max(e() - c, 0), l.value <= 0 && a();
    }, s);
  }
  return je(a), {
    clear: a,
    time: l,
    start: o,
    reset: n
  };
}
const wr = K({
  multiLine: Boolean,
  text: String,
  timer: [Boolean, String],
  timeout: {
    type: [Number, String],
    default: 5e3
  },
  vertical: Boolean,
  ...hn({
    location: "bottom"
  }),
  ...yn(),
  ...kt(),
  ...Gt(),
  ...Ne(),
  ...st(yl({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
}, "VSnackbar"), xr = ne()({
  name: "VSnackbar",
  props: wr(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = we(e, "modelValue"), {
      positionClasses: n
    } = gn(e), {
      scopeId: o
    } = Xt(), {
      themeClasses: i
    } = qe(e), {
      colorClasses: r,
      colorStyles: s,
      variantClasses: u
    } = al(e), {
      roundedClasses: c
    } = Bt(e), d = pr(() => Number(e.timeout)), v = q(), f = q(), g = ee(!1), k = ee(0), y = q(), p = ge(Rt, void 0);
    Xe(() => !!p, () => {
      const $ = Rn();
      tt(() => {
        y.value = $.mainStyles.value;
      });
    }), Q(a, A), Q(() => e.timeout, A), We(() => {
      a.value && A();
    });
    let m = -1;
    function A() {
      d.reset(), window.clearTimeout(m);
      const $ = Number(e.timeout);
      if (!a.value || $ === -1) return;
      const D = as(f.value);
      d.start(D), m = window.setTimeout(() => {
        a.value = !1;
      }, $);
    }
    function S() {
      d.reset(), window.clearTimeout(m);
    }
    function V() {
      g.value = !0, S();
    }
    function x() {
      g.value = !1, A();
    }
    function P($) {
      k.value = $.touches[0].clientY;
    }
    function b($) {
      Math.abs(k.value - $.changedTouches[0].clientY) > 50 && (a.value = !1);
    }
    function _() {
      g.value && x();
    }
    const T = I(() => e.location.split(" ").reduce(($, D) => ($[`v-snackbar--${D}`] = !0, $), {}));
    return ie(() => {
      const $ = ua.filterProps(e), D = !!(t.default || t.text || e.text);
      return h(ua, R({
        ref: v,
        class: ["v-snackbar", {
          "v-snackbar--active": a.value,
          "v-snackbar--multi-line": e.multiLine && !e.vertical,
          "v-snackbar--timer": !!e.timer,
          "v-snackbar--vertical": e.vertical
        }, T.value, n.value, e.class],
        style: [y.value, e.style]
      }, $, {
        modelValue: a.value,
        "onUpdate:modelValue": (M) => a.value = M,
        contentProps: R({
          class: ["v-snackbar__wrapper", i.value, r.value, c.value, u.value],
          style: [s.value],
          onPointerenter: V,
          onPointerleave: x
        }, $.contentProps),
        persistent: !0,
        noClickAnimation: !0,
        scrim: !1,
        scrollStrategy: "none",
        _disableGlobalStack: !0,
        onTouchstartPassive: P,
        onTouchend: b,
        onAfterLeave: _
      }, o), {
        default: () => {
          var M, U;
          return [ll(!1, "v-snackbar"), e.timer && !g.value && C("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [h(Ki, {
            ref: f,
            color: typeof e.timer == "string" ? e.timer : "info",
            max: e.timeout,
            modelValue: d.time.value
          }, null)]), D && C("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((M = t.text) == null ? void 0 : M.call(t)) ?? e.text, (U = t.default) == null ? void 0 : U.call(t)]), t.actions && h(Me, {
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
    }), dt({}, v);
  }
}), hl = Symbol.for("vuetify:v-tabs"), Sr = K({
  fixed: Boolean,
  sliderColor: String,
  hideSlider: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ...st(mn({
    selectedClass: "v-tab--selected",
    variant: "text"
  }), ["active", "block", "flat", "location", "position", "symbol"])
}, "VTab"), Ya = ne()({
  name: "VTab",
  props: Sr(),
  setup(e, l) {
    let {
      slots: t,
      attrs: a
    } = l;
    const {
      textColorClasses: n,
      textColorStyles: o
    } = Yt(() => e.sliderColor), i = q(), r = q(), s = I(() => e.direction === "horizontal"), u = I(() => {
      var d, v;
      return ((v = (d = i.value) == null ? void 0 : d.group) == null ? void 0 : v.isSelected.value) ?? !1;
    });
    function c(d) {
      var f, g;
      let {
        value: v
      } = d;
      if (v) {
        const k = (g = (f = i.value) == null ? void 0 : f.$el.parentElement) == null ? void 0 : g.querySelector(".v-tab--selected .v-tab__slider"), y = r.value;
        if (!k || !y) return;
        const p = getComputedStyle(k).color, m = k.getBoundingClientRect(), A = y.getBoundingClientRect(), S = s.value ? "x" : "y", V = s.value ? "X" : "Y", x = s.value ? "right" : "bottom", P = s.value ? "width" : "height", b = m[S], _ = A[S], T = b > _ ? m[x] - A[x] : m[S] - A[S], $ = Math.sign(T) > 0 ? s.value ? "right" : "bottom" : Math.sign(T) < 0 ? s.value ? "left" : "top" : "center", M = (Math.abs(T) + (Math.sign(T) < 0 ? m[P] : A[P])) / Math.max(m[P], A[P]) || 0, U = m[P] / A[P] || 0, j = 1.5;
        wt(y, {
          backgroundColor: [p, "currentcolor"],
          transform: [`translate${V}(${T}px) scale${V}(${U})`, `translate${V}(${T / j}px) scale${V}(${(M - 1) / j + 1})`, "none"],
          transformOrigin: Array(3).fill($)
        }, {
          duration: 225,
          easing: Mt
        });
      }
    }
    return ie(() => {
      const d = pe.filterProps(e);
      return h(pe, R({
        symbol: hl,
        ref: i,
        class: ["v-tab", e.class],
        style: e.style,
        tabindex: u.value ? 0 : -1,
        role: "tab",
        "aria-selected": String(u.value),
        active: !1
      }, d, a, {
        block: e.fixed,
        maxWidth: e.fixed ? 300 : void 0,
        "onGroup:selected": c
      }), {
        ...t,
        default: () => {
          var v;
          return C(X, null, [((v = t.default) == null ? void 0 : v.call(t)) ?? e.text, !e.hideSlider && C("div", {
            ref: r,
            class: me(["v-tab__slider", n.value]),
            style: Ce(o.value)
          }, null)]);
        }
      });
    }), dt({}, i);
  }
}), kr = (e) => {
  const {
    touchstartX: l,
    touchendX: t,
    touchstartY: a,
    touchendY: n
  } = e, o = 0.5, i = 16;
  e.offsetX = t - l, e.offsetY = n - a, Math.abs(e.offsetY) < o * Math.abs(e.offsetX) && (e.left && t < l - i && e.left(e), e.right && t > l + i && e.right(e)), Math.abs(e.offsetX) < o * Math.abs(e.offsetY) && (e.up && n < a - i && e.up(e), e.down && n > a + i && e.down(e));
};
function Vr(e, l) {
  var a;
  const t = e.changedTouches[0];
  l.touchstartX = t.clientX, l.touchstartY = t.clientY, (a = l.start) == null || a.call(l, {
    originalEvent: e,
    ...l
  });
}
function Cr(e, l) {
  var a;
  const t = e.changedTouches[0];
  l.touchendX = t.clientX, l.touchendY = t.clientY, (a = l.end) == null || a.call(l, {
    originalEvent: e,
    ...l
  }), kr(l);
}
function Pr(e, l) {
  var a;
  const t = e.changedTouches[0];
  l.touchmoveX = t.clientX, l.touchmoveY = t.clientY, (a = l.move) == null || a.call(l, {
    originalEvent: e,
    ...l
  });
}
function Ir() {
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
    touchstart: (t) => Vr(t, l),
    touchend: (t) => Cr(t, l),
    touchmove: (t) => Pr(t, l)
  };
}
function Ar(e, l) {
  var r;
  const t = l.value, a = t != null && t.parent ? e.parentElement : e, n = (t == null ? void 0 : t.options) ?? {
    passive: !0
  }, o = (r = l.instance) == null ? void 0 : r.$.uid;
  if (!a || !o) return;
  const i = Ir(l.value);
  a._touchHandlers = a._touchHandlers ?? /* @__PURE__ */ Object.create(null), a._touchHandlers[o] = i, _n(i).forEach((s) => {
    a.addEventListener(s, i[s], n);
  });
}
function Tr(e, l) {
  var o, i;
  const t = (o = l.value) != null && o.parent ? e.parentElement : e, a = (i = l.instance) == null ? void 0 : i.$.uid;
  if (!(t != null && t._touchHandlers) || !a) return;
  const n = t._touchHandlers[a];
  _n(n).forEach((r) => {
    t.removeEventListener(r, n[r]);
  }), delete t._touchHandlers[a];
}
const qa = {
  mounted: Ar,
  unmounted: Tr
}, eo = Symbol.for("vuetify:v-window"), to = Symbol.for("vuetify:v-window-group"), ao = K({
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
  ...ke(),
  ...Ke(),
  ...Ne()
}, "VWindow"), Xa = ne()({
  name: "VWindow",
  directives: {
    vTouch: qa
  },
  props: ao(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, l) {
    let {
      slots: t
    } = l;
    const {
      themeClasses: a
    } = qe(e), {
      isRtl: n
    } = it(), {
      t: o
    } = rt(), i = nl(e, to), r = q(), s = I(() => n.value ? !e.reverse : e.reverse), u = ee(!1), c = I(() => {
      const S = e.direction === "vertical" ? "y" : "x", x = (s.value ? !u.value : u.value) ? "-reverse" : "";
      return `v-window-${S}${x}-transition`;
    }), d = ee(0), v = q(void 0), f = I(() => i.items.value.findIndex((S) => i.selected.value.includes(S.id)));
    Q(f, (S, V) => {
      const x = i.items.value.length, P = x - 1;
      x <= 2 ? u.value = S < V : S === P && V === 0 ? u.value = !0 : S === 0 && V === P ? u.value = !1 : u.value = S < V;
    }), Ue(eo, {
      transition: c,
      isReversed: u,
      transitionCount: d,
      transitionHeight: v,
      rootRef: r
    });
    const g = H(() => e.continuous || f.value !== 0), k = H(() => e.continuous || f.value !== i.items.value.length - 1);
    function y() {
      g.value && i.prev();
    }
    function p() {
      k.value && i.next();
    }
    const m = I(() => {
      const S = [], V = {
        icon: n.value ? e.nextIcon : e.prevIcon,
        class: `v-window__${s.value ? "right" : "left"}`,
        onClick: i.prev,
        "aria-label": o("$vuetify.carousel.prev")
      };
      S.push(g.value ? t.prev ? t.prev({
        props: V
      }) : h(pe, V, null) : C("div", null, null));
      const x = {
        icon: n.value ? e.prevIcon : e.nextIcon,
        class: `v-window__${s.value ? "left" : "right"}`,
        onClick: i.next,
        "aria-label": o("$vuetify.carousel.next")
      };
      return S.push(k.value ? t.next ? t.next({
        props: x
      }) : h(pe, x, null) : C("div", null, null)), S;
    }), A = I(() => e.touch === !1 ? e.touch : {
      ...{
        left: () => {
          s.value ? y() : p();
        },
        right: () => {
          s.value ? p() : y();
        },
        start: (V) => {
          let {
            originalEvent: x
          } = V;
          x.stopPropagation();
        }
      },
      ...e.touch === !0 ? {} : e.touch
    });
    return ie(() => Ye(h(e.tag, {
      ref: r,
      class: me(["v-window", {
        "v-window--show-arrows-on-hover": e.showArrows === "hover",
        "v-window--vertical-arrows": !!e.verticalArrows
      }, a.value, e.class]),
      style: Ce(e.style)
    }, {
      default: () => {
        var S, V;
        return [C("div", {
          class: "v-window__container",
          style: {
            height: v.value
          }
        }, [(S = t.default) == null ? void 0 : S.call(t, {
          group: i
        }), e.showArrows !== !1 && C("div", {
          class: me(["v-window__controls", {
            "v-window__controls--left": e.verticalArrows === "left" || e.verticalArrows === !0
          }, {
            "v-window__controls--right": e.verticalArrows === "right"
          }])
        }, [m.value])]), (V = t.additional) == null ? void 0 : V.call(t, {
          group: i
        })];
      }
    }), [[qa, A.value]])), {
      group: i
    };
  }
}), _r = K({
  ...st(ao(), ["continuous", "nextIcon", "prevIcon", "showArrows", "touch", "mandatory"])
}, "VTabsWindow"), bl = ne()({
  name: "VTabsWindow",
  props: _r(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = ge(hl, null), n = we(e, "modelValue"), o = I({
      get() {
        var i;
        return n.value != null || !a ? n.value : (i = a.items.value.find((r) => a.selected.value.includes(r.id))) == null ? void 0 : i.value;
      },
      set(i) {
        n.value = i;
      }
    });
    return ie(() => {
      const i = Xa.filterProps(e);
      return h(Xa, R({
        _as: "VTabsWindow"
      }, i, {
        modelValue: o.value,
        "onUpdate:modelValue": (r) => o.value = r,
        class: ["v-tabs-window", e.class],
        style: e.style,
        mandatory: !1,
        touch: !1
      }), t);
    }), {};
  }
}), lo = K({
  reverseTransition: {
    type: [Boolean, String],
    default: void 0
  },
  transition: {
    type: [Boolean, String],
    default: void 0
  },
  ...ke(),
  ...ol(),
  ...Xn()
}, "VWindowItem"), Za = ne()({
  name: "VWindowItem",
  directives: {
    vTouch: qa
  },
  props: lo(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = ge(eo), n = il(e, to), {
      isBooted: o
    } = xa();
    if (!a || !n) throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const i = ee(!1), r = I(() => o.value && (a.isReversed.value ? e.reverseTransition !== !1 : e.transition !== !1));
    function s() {
      !i.value || !a || (i.value = !1, a.transitionCount.value > 0 && (a.transitionCount.value -= 1, a.transitionCount.value === 0 && (a.transitionHeight.value = void 0)));
    }
    function u() {
      var g;
      i.value || !a || (i.value = !0, a.transitionCount.value === 0 && (a.transitionHeight.value = he((g = a.rootRef.value) == null ? void 0 : g.clientHeight)), a.transitionCount.value += 1);
    }
    function c() {
      s();
    }
    function d(g) {
      i.value && Ee(() => {
        !r.value || !i.value || !a || (a.transitionHeight.value = he(g.clientHeight));
      });
    }
    const v = I(() => {
      const g = a.isReversed.value ? e.reverseTransition : e.transition;
      return r.value ? {
        name: typeof g != "string" ? a.transition.value : g,
        onBeforeEnter: u,
        onAfterEnter: s,
        onEnterCancelled: c,
        onBeforeLeave: u,
        onAfterLeave: s,
        onLeaveCancelled: c,
        onEnter: d
      } : !1;
    }), {
      hasContent: f
    } = Zn(e, n.isSelected);
    return ie(() => h(Sa, {
      transition: v.value,
      disabled: !o.value
    }, {
      default: () => {
        var g;
        return [Ye(C("div", {
          class: me(["v-window-item", n.selectedClass.value, e.class]),
          style: Ce(e.style)
        }, [f.value && ((g = t.default) == null ? void 0 : g.call(t))]), [[_t, n.isSelected.value]])];
      }
    })), {
      groupItem: n
    };
  }
}), Br = K({
  ...lo()
}, "VTabsWindowItem"), ca = ne()({
  name: "VTabsWindowItem",
  props: Br(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    return ie(() => {
      const a = Za.filterProps(e);
      return h(Za, R({
        _as: "VTabsWindowItem"
      }, a, {
        class: ["v-tabs-window-item", e.class],
        style: e.style
      }), t);
    }), {};
  }
});
function $r(e) {
  let {
    selectedElement: l,
    containerElement: t,
    isRtl: a,
    isHorizontal: n
  } = e;
  const o = Nt(n, t), i = no(n, a, t), r = Nt(n, l), s = oo(n, l), u = r * 0.4;
  return i > s ? s - u : i + o < s + r ? s - o + r + u : i;
}
function Er(e) {
  let {
    selectedElement: l,
    containerElement: t,
    isHorizontal: a
  } = e;
  const n = Nt(a, t), o = oo(a, l), i = Nt(a, l);
  return o - n / 2 + i / 2;
}
function ln(e, l) {
  const t = e ? "scrollWidth" : "scrollHeight";
  return (l == null ? void 0 : l[t]) || 0;
}
function Or(e, l) {
  const t = e ? "clientWidth" : "clientHeight";
  return (l == null ? void 0 : l[t]) || 0;
}
function no(e, l, t) {
  if (!t)
    return 0;
  const {
    scrollLeft: a,
    offsetWidth: n,
    scrollWidth: o
  } = t;
  return e ? l ? o - n + a : a : t.scrollTop;
}
function Nt(e, l) {
  const t = e ? "offsetWidth" : "offsetHeight";
  return (l == null ? void 0 : l[t]) || 0;
}
function oo(e, l) {
  const t = e ? "offsetLeft" : "offsetTop";
  return (l == null ? void 0 : l[t]) || 0;
}
const io = Symbol.for("vuetify:v-slide-group"), pl = K({
  centerActive: Boolean,
  contentClass: null,
  direction: {
    type: String,
    default: "horizontal"
  },
  symbol: {
    type: null,
    default: io
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
  ...ke(),
  ...qt({
    mobile: null
  }),
  ...Ke(),
  ...bn({
    selectedClass: "v-slide-group-item--active"
  })
}, "VSlideGroup"), Ht = ne()({
  name: "VSlideGroup",
  props: pl(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, l) {
    let {
      slots: t
    } = l;
    const {
      isRtl: a
    } = it(), {
      displayClasses: n,
      mobile: o
    } = pt(e), i = nl(e, e.symbol), r = ee(!1), s = ee(0), u = ee(0), c = ee(0), d = I(() => e.direction === "horizontal"), {
      resizeRef: v,
      contentRect: f
    } = Pt(), {
      resizeRef: g,
      contentRect: k
    } = Pt(), y = fs(), p = I(() => ({
      container: v.el,
      duration: 200,
      easing: "easeOutQuart"
    })), m = I(() => i.selected.value.length ? i.items.value.findIndex((E) => E.id === i.selected.value[0]) : -1), A = I(() => i.selected.value.length ? i.items.value.findIndex((E) => E.id === i.selected.value[i.selected.value.length - 1]) : -1);
    if (ze) {
      let E = -1;
      Q(() => [i.selected.value, f.value, k.value, d.value], () => {
        cancelAnimationFrame(E), E = requestAnimationFrame(() => {
          if (f.value && k.value) {
            const F = d.value ? "width" : "height";
            u.value = f.value[F], c.value = k.value[F], r.value = u.value + 1 < c.value;
          }
          if (m.value >= 0 && g.el) {
            const F = g.el.children[A.value];
            V(F, e.centerActive);
          }
        });
      });
    }
    const S = ee(!1);
    function V(E, F) {
      let W = 0;
      F ? W = Er({
        containerElement: v.el,
        isHorizontal: d.value,
        selectedElement: E
      }) : W = $r({
        containerElement: v.el,
        isHorizontal: d.value,
        isRtl: a.value,
        selectedElement: E
      }), x(W);
    }
    function x(E) {
      if (!ze || !v.el) return;
      const F = Nt(d.value, v.el), W = no(d.value, a.value, v.el);
      if (!(ln(d.value, v.el) <= F || // Prevent scrolling by only a couple of pixels, which doesn't look smooth
      Math.abs(E - W) < 16)) {
        if (d.value && a.value && v.el) {
          const {
            scrollWidth: te,
            offsetWidth: ue
          } = v.el;
          E = te - ue - E;
        }
        d.value ? y.horizontal(E, p.value) : y(E, p.value);
      }
    }
    function P(E) {
      const {
        scrollTop: F,
        scrollLeft: W
      } = E.target;
      s.value = d.value ? W : F;
    }
    function b(E) {
      if (S.value = !0, !(!r.value || !g.el)) {
        for (const F of E.composedPath())
          for (const W of g.el.children)
            if (W === F) {
              V(W);
              return;
            }
      }
    }
    function _(E) {
      S.value = !1;
    }
    let T = !1;
    function $(E) {
      var F;
      !T && !S.value && !(E.relatedTarget && ((F = g.el) != null && F.contains(E.relatedTarget))) && j(), T = !1;
    }
    function D() {
      T = !0;
    }
    function M(E) {
      if (!g.el) return;
      function F(W) {
        E.preventDefault(), j(W);
      }
      d.value ? E.key === "ArrowRight" ? F(a.value ? "prev" : "next") : E.key === "ArrowLeft" && F(a.value ? "next" : "prev") : E.key === "ArrowDown" ? F("next") : E.key === "ArrowUp" && F("prev"), E.key === "Home" ? F("first") : E.key === "End" && F("last");
    }
    function U(E, F) {
      if (!E) return;
      let W = E;
      do
        W = W == null ? void 0 : W[F === "next" ? "nextElementSibling" : "previousElementSibling"];
      while (W != null && W.hasAttribute("disabled"));
      return W;
    }
    function j(E) {
      if (!g.el) return;
      let F;
      if (!E)
        F = za(g.el)[0];
      else if (E === "next") {
        if (F = U(g.el.querySelector(":focus"), E), !F) return j("first");
      } else if (E === "prev") {
        if (F = U(g.el.querySelector(":focus"), E), !F) return j("last");
      } else E === "first" ? (F = g.el.firstElementChild, F != null && F.hasAttribute("disabled") && (F = U(F, "next"))) : E === "last" && (F = g.el.lastElementChild, F != null && F.hasAttribute("disabled") && (F = U(F, "prev")));
      F && F.focus({
        preventScroll: !0
      });
    }
    function Y(E) {
      const F = d.value && a.value ? -1 : 1, W = (E === "prev" ? -F : F) * u.value;
      let ve = s.value + W;
      if (d.value && a.value && v.el) {
        const {
          scrollWidth: te,
          offsetWidth: ue
        } = v.el;
        ve += te - ue;
      }
      x(ve);
    }
    const ae = I(() => ({
      next: i.next,
      prev: i.prev,
      select: i.select,
      isSelected: i.isSelected
    })), le = I(() => {
      switch (e.showArrows) {
        case "always":
          return !0;
        case "desktop":
          return !o.value;
        case !0:
          return r.value || Math.abs(s.value) > 0;
        case "mobile":
          return o.value || r.value || Math.abs(s.value) > 0;
        default:
          return !o.value && (r.value || Math.abs(s.value) > 0);
      }
    }), ce = I(() => Math.abs(s.value) > 1), B = I(() => {
      if (!v.value) return !1;
      const E = ln(d.value, v.el), F = Or(d.value, v.el);
      return E - F - Math.abs(s.value) > 1;
    });
    return ie(() => h(e.tag, {
      class: me(["v-slide-group", {
        "v-slide-group--vertical": !d.value,
        "v-slide-group--has-affixes": le.value,
        "v-slide-group--is-overflowing": r.value
      }, n.value, e.class]),
      style: Ce(e.style),
      tabindex: S.value || i.selected.value.length ? -1 : 0,
      onFocus: $
    }, {
      default: () => {
        var E, F, W;
        return [le.value && C("div", {
          key: "prev",
          class: me(["v-slide-group__prev", {
            "v-slide-group__prev--disabled": !ce.value
          }]),
          onMousedown: D,
          onClick: () => ce.value && Y("prev")
        }, [((E = t.prev) == null ? void 0 : E.call(t, ae.value)) ?? h(Dl, null, {
          default: () => [h(Ve, {
            icon: a.value ? e.nextIcon : e.prevIcon
          }, null)]
        })]), C("div", {
          key: "container",
          ref: v,
          class: me(["v-slide-group__container", e.contentClass]),
          onScroll: P
        }, [C("div", {
          ref: g,
          class: "v-slide-group__content",
          onFocusin: b,
          onFocusout: _,
          onKeydown: M
        }, [(F = t.default) == null ? void 0 : F.call(t, ae.value)])]), le.value && C("div", {
          key: "next",
          class: me(["v-slide-group__next", {
            "v-slide-group__next--disabled": !B.value
          }]),
          onMousedown: D,
          onClick: () => B.value && Y("next")
        }, [((W = t.next) == null ? void 0 : W.call(t, ae.value)) ?? h(Dl, null, {
          default: () => [h(Ve, {
            icon: a.value ? e.prevIcon : e.nextIcon
          }, null)]
        })])];
      }
    })), {
      selected: i.selected,
      scrollTo: Y,
      scrollOffset: s,
      focus: j,
      hasPrev: ce,
      hasNext: B
    };
  }
});
function Fr(e) {
  return e ? e.map((l) => ls(l) ? l : {
    text: l,
    value: l
  }) : [];
}
const Lr = K({
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
  ...pl({
    mandatory: "force",
    selectedClass: "v-tab-item--selected"
  }),
  ...bt(),
  ...Ke()
}, "VTabs"), Mr = ne()({
  name: "VTabs",
  props: Lr(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, l) {
    let {
      attrs: t,
      slots: a
    } = l;
    const n = we(e, "modelValue"), o = I(() => Fr(e.items)), {
      densityClasses: i
    } = Et(e), {
      backgroundColorClasses: r,
      backgroundColorStyles: s
    } = ft(() => e.bgColor), {
      scopeId: u
    } = Xt();
    return lt({
      VTab: {
        color: H(() => e.color),
        direction: H(() => e.direction),
        stacked: H(() => e.stacked),
        fixed: H(() => e.fixedTabs),
        sliderColor: H(() => e.sliderColor),
        hideSlider: H(() => e.hideSlider)
      }
    }), ie(() => {
      const c = Ht.filterProps(e), d = !!(a.window || e.items.length > 0);
      return C(X, null, [h(Ht, R(c, {
        modelValue: n.value,
        "onUpdate:modelValue": (v) => n.value = v,
        class: ["v-tabs", `v-tabs--${e.direction}`, `v-tabs--align-tabs-${e.alignTabs}`, {
          "v-tabs--fixed-tabs": e.fixedTabs,
          "v-tabs--grow": e.grow,
          "v-tabs--stacked": e.stacked
        }, i.value, r.value, e.class],
        style: [{
          "--v-tabs-height": he(e.height)
        }, s.value, e.style],
        role: "tablist",
        symbol: hl
      }, u, t), {
        default: () => {
          var v;
          return [((v = a.default) == null ? void 0 : v.call(a)) ?? o.value.map((f) => {
            var g;
            return ((g = a.tab) == null ? void 0 : g.call(a, {
              item: f
            })) ?? h(Ya, R(f, {
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
      }), d && h(bl, R({
        modelValue: n.value,
        "onUpdate:modelValue": (v) => n.value = v,
        key: "tabs-window"
      }, u), {
        default: () => {
          var v;
          return [o.value.map((f) => {
            var g;
            return ((g = a.item) == null ? void 0 : g.call(a, {
              item: f
            })) ?? h(ca, {
              value: f.value
            }, {
              default: () => {
                var k;
                return (k = a[`item.${f.value}`]) == null ? void 0 : k.call(a, {
                  item: f
                });
              }
            });
          }), (v = a.window) == null ? void 0 : v.call(a)];
        }
      })]);
    }), {};
  }
}), Rr = {
  class: "nav-home",
  href: "/"
};
var rn;
const Dr = /* @__PURE__ */ Le({
  __name: "OxApp",
  props: {
    apiUrl: {},
    logo: {},
    dataEl: { default: (rn = document.body.dataset) == null ? void 0 : rn.appData },
    models: {},
    data: {}
  },
  setup(e) {
    const l = nt(), t = vt(l, "panels."), a = e, n = Qe({ drawer: !0 }), o = Bi(a), i = $i();
    return We(() => {
      i.panel = o.data.panel;
    }), Q(() => [o.state.state, o.state.data], () => {
      o.showState = !0;
    }), wi((r, s, u) => {
      o.state.error(`${r}`);
    }), (r, s) => (L(), G(Ws, null, {
      default: O(() => [
        h(xr, {
          modelValue: w(o).showState,
          "onUpdate:modelValue": s[0] || (s[0] = (u) => w(o).showState = u),
          color: w(o).state.color,
          "multi-line": ""
        }, {
          default: O(() => [
            Ie(Re(w(o).state.toString()), 1)
          ]),
          _: 1
        }, 8, ["modelValue", "color"]),
        h(Ys, { color: "primary" }, {
          prepend: O(() => [
            w(l)["nav-start"] || w(l)["nav-end"] ? (L(), G(Kn, {
              key: 0,
              icon: "mdi-apps",
              title: w(oe)("nav.panels"),
              "aria-label": w(oe)("nav.panels"),
              onClick: s[1] || (s[1] = Te((u) => n.drawer = !n.drawer, ["stop"]))
            }, null, 8, ["title", "aria-label"])) : re("", !0)
          ]),
          default: O(() => [
            h(Xl, { id: "app-bar-sheet-title" }),
            h(Xl, { id: "app-bar-title" }, {
              default: O(() => [
                z(r.$slots, "title")
              ]),
              _: 3
            }),
            z(r.$slots, "app-bar-left"),
            s[5] || (s[5] = C("div", {
              id: "app-bar-right",
              class: "mr-3"
            }, null, -1)),
            z(r.$slots, "app-bar-right")
          ]),
          _: 3
        }),
        w(l)["nav-start"] || w(l)["nav-end"] ? (L(), G(w(Hs), {
          key: 0,
          drawer: n.drawer,
          "onUpdate:drawer": s[3] || (s[3] = (u) => n.drawer = u),
          items: w(o).data.nav
        }, ut({
          prepend: O(() => [
            C("a", Rr, [
              r.logo ? (L(), G($t, {
                key: 0,
                src: r.logo,
                class: "logo"
              }, null, 8, ["src"])) : re("", !0)
            ]),
            z(r.$slots, "nav-start", { context: w(o) })
          ]),
          _: 2
        }, [
          w(l)["nav-end"] ? {
            name: "append",
            fn: O(() => [
              h(ct, {
                opened: n.opened,
                "onUpdate:opened": s[2] || (s[2] = (u) => n.opened = u)
              }, {
                default: O(() => [
                  z(r.$slots, "nav-end", { context: w(o) })
                ]),
                _: 3
              }, 8, ["opened"])
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["drawer", "items"])) : re("", !0),
        h(Zs, null, {
          default: O(() => [
            z(r.$slots, "main", {}, () => [
              h(bl, {
                modelValue: w(i).panel,
                "onUpdate:modelValue": s[4] || (s[4] = (u) => w(i).panel = u)
              }, {
                default: O((u) => [
                  z(r.$slots, "default", R(u, { context: w(o) })),
                  (L(!0), ye(X, null, _e(w(t), (c, d) => (L(), G(ca, {
                    key: d,
                    value: c
                  }, {
                    default: O(() => [
                      z(r.$slots, d, R({ ref_for: !0 }, u, { context: w(o) }))
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
}), Nr = K({
  text: String,
  onClick: Ze(),
  ...ke(),
  ...Ne()
}, "VLabel"), wl = ne()({
  name: "VLabel",
  props: Nr(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    return ie(() => {
      var a;
      return C("label", {
        class: me(["v-label", {
          "v-label--clickable": !!e.onClick
        }, e.class]),
        style: Ce(e.style),
        onClick: e.onClick
      }, [e.text, (a = t.default) == null ? void 0 : a.call(t)]);
    }), {};
  }
}), so = Symbol.for("vuetify:selection-control-group"), ro = K({
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
    default: et
  },
  ...ke(),
  ...bt(),
  ...Ne()
}, "SelectionControlGroup"), Hr = K({
  ...ro({
    defaultsTarget: "VSelectionControl"
  })
}, "VSelectionControlGroup");
ne()({
  name: "VSelectionControlGroup",
  props: Hr(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = we(e, "modelValue"), n = gt(), o = H(() => e.id || `v-selection-control-group-${n}`), i = H(() => e.name || o.value), r = /* @__PURE__ */ new Set();
    return Ue(so, {
      modelValue: a,
      forceUpdate: () => {
        r.forEach((s) => s());
      },
      onForceUpdate: (s) => {
        r.add(s), je(() => {
          r.delete(s);
        });
      }
    }), lt({
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
      var s;
      return C("div", {
        class: me(["v-selection-control-group", {
          "v-selection-control-group--inline": e.inline
        }, e.class]),
        style: Ce(e.style),
        role: e.type === "radio" ? "radiogroup" : void 0
      }, [(s = t.default) == null ? void 0 : s.call(t)]);
    }), {};
  }
});
const uo = K({
  label: String,
  baseColor: String,
  trueValue: null,
  falseValue: null,
  value: null,
  ...ke(),
  ...ro()
}, "VSelectionControl");
function zr(e) {
  const l = ge(so, void 0), {
    densityClasses: t
  } = Et(e), a = we(e, "modelValue"), n = I(() => e.trueValue !== void 0 ? e.trueValue : e.value !== void 0 ? e.value : !0), o = I(() => e.falseValue !== void 0 ? e.falseValue : !1), i = I(() => !!e.multiple || e.multiple == null && Array.isArray(a.value)), r = I({
    get() {
      const f = l ? l.modelValue.value : a.value;
      return i.value ? He(f).some((g) => e.valueComparator(g, n.value)) : e.valueComparator(f, n.value);
    },
    set(f) {
      if (e.readonly) return;
      const g = f ? n.value : o.value;
      let k = g;
      i.value && (k = f ? [...He(a.value), g] : He(a.value).filter((y) => !e.valueComparator(y, n.value))), l ? l.modelValue.value = k : a.value = k;
    }
  }), {
    textColorClasses: s,
    textColorStyles: u
  } = Yt(() => {
    if (!(e.error || e.disabled))
      return r.value ? e.color : e.baseColor;
  }), {
    backgroundColorClasses: c,
    backgroundColorStyles: d
  } = ft(() => r.value && !e.error && !e.disabled ? e.color : e.baseColor), v = I(() => r.value ? e.trueIcon : e.falseIcon);
  return {
    group: l,
    densityClasses: t,
    trueValue: n,
    falseValue: o,
    model: r,
    textColorClasses: s,
    textColorStyles: u,
    backgroundColorClasses: c,
    backgroundColorStyles: d,
    icon: v
  };
}
const nn = ne()({
  name: "VSelectionControl",
  directives: {
    vRipple: It
  },
  inheritAttrs: !1,
  props: uo(),
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
      model: r,
      textColorClasses: s,
      textColorStyles: u,
      backgroundColorClasses: c,
      backgroundColorStyles: d,
      trueValue: v
    } = zr(e), f = gt(), g = ee(!1), k = ee(!1), y = q(), p = H(() => e.id || `input-${f}`), m = H(() => !e.disabled && !e.readonly);
    n == null || n.onForceUpdate(() => {
      y.value && (y.value.checked = r.value);
    });
    function A(P) {
      m.value && (g.value = !0, At(P.target, ":focus-visible") !== !1 && (k.value = !0));
    }
    function S() {
      g.value = !1, k.value = !1;
    }
    function V(P) {
      P.stopPropagation();
    }
    function x(P) {
      if (!m.value) {
        y.value && (y.value.checked = r.value);
        return;
      }
      e.readonly && n && Ee(() => n.forceUpdate()), r.value = P.target.checked;
    }
    return ie(() => {
      var $, D;
      const P = a.label ? a.label({
        label: e.label,
        props: {
          for: p.value
        }
      }) : e.label, [b, _] = ka(t), T = C("input", R({
        ref: y,
        checked: r.value,
        disabled: !!e.disabled,
        id: p.value,
        onBlur: S,
        onFocus: A,
        onInput: x,
        "aria-disabled": !!e.disabled,
        "aria-label": e.label,
        type: e.type,
        value: v.value,
        name: e.name,
        "aria-checked": e.type === "checkbox" ? r.value : void 0
      }, _), null);
      return C("div", R({
        class: ["v-selection-control", {
          "v-selection-control--dirty": r.value,
          "v-selection-control--disabled": e.disabled,
          "v-selection-control--error": e.error,
          "v-selection-control--focused": g.value,
          "v-selection-control--focus-visible": k.value,
          "v-selection-control--inline": e.inline
        }, o.value, e.class]
      }, b, {
        style: e.style
      }), [C("div", {
        class: me(["v-selection-control__wrapper", s.value]),
        style: Ce(u.value)
      }, [($ = a.default) == null ? void 0 : $.call(a, {
        backgroundColorClasses: c,
        backgroundColorStyles: d
      }), Ye(C("div", {
        class: me(["v-selection-control__input"])
      }, [((D = a.input) == null ? void 0 : D.call(a, {
        model: r,
        textColorClasses: s,
        textColorStyles: u,
        backgroundColorClasses: c,
        backgroundColorStyles: d,
        inputNode: T,
        icon: i.value,
        props: {
          onFocus: A,
          onBlur: S,
          id: p.value
        }
      })) ?? C(X, null, [i.value && h(Ve, {
        key: "icon",
        icon: i.value
      }, null), T])]), [[It, !e.disabled && !e.readonly && e.ripple, null, {
        center: !0,
        circle: !0
      }]])]), P && h(wl, {
        for: p.value,
        onClick: V
      }, {
        default: () => [P]
      })]);
    }), {
      isFocused: g,
      input: y
    };
  }
}), co = K({
  indeterminate: Boolean,
  indeterminateIcon: {
    type: Se,
    default: "$checkboxIndeterminate"
  },
  ...uo({
    falseIcon: "$checkboxOff",
    trueIcon: "$checkboxOn"
  })
}, "VCheckboxBtn"), St = ne()({
  name: "VCheckboxBtn",
  props: co(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:indeterminate": (e) => !0
  },
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = we(e, "indeterminate"), n = we(e, "modelValue");
    function o(s) {
      a.value && (a.value = !1);
    }
    const i = H(() => a.value ? e.indeterminateIcon : e.falseIcon), r = H(() => a.value ? e.indeterminateIcon : e.trueIcon);
    return ie(() => {
      const s = st(nn.filterProps(e), ["modelValue"]);
      return h(nn, R(s, {
        modelValue: n.value,
        "onUpdate:modelValue": [(u) => n.value = u, o],
        class: ["v-checkbox-btn", e.class],
        style: e.style,
        type: "checkbox",
        falseIcon: i.value,
        trueIcon: r.value,
        "aria-checked": a.value ? "mixed" : void 0
      }), t);
    }), {};
  }
});
function vo(e) {
  const {
    t: l
  } = rt();
  function t(a) {
    let {
      name: n,
      color: o,
      ...i
    } = a;
    const r = {
      prepend: "prependAction",
      prependInner: "prependAction",
      append: "appendAction",
      appendInner: "appendAction",
      clear: "clear"
    }[n], s = e[`onClick:${n}`];
    function u(d) {
      d.key !== "Enter" && d.key !== " " || (d.preventDefault(), d.stopPropagation(), vl(s, new PointerEvent("click", d)));
    }
    const c = s && r ? l(`$vuetify.input.${r}`, e.label ?? "") : void 0;
    return h(Ve, R({
      icon: e[`${n}Icon`],
      "aria-label": c,
      onClick: s,
      onKeydown: u,
      color: o
    }, i), null);
  }
  return {
    InputIcon: t
  };
}
const Wr = K({
  active: Boolean,
  color: String,
  messages: {
    type: [Array, String],
    default: () => []
  },
  ...ke(),
  ...Kt({
    transition: {
      component: pn,
      leaveAbsolute: !0,
      group: !0
    }
  })
}, "VMessages"), Ur = ne()({
  name: "VMessages",
  props: Wr(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = I(() => He(e.messages)), {
      textColorClasses: n,
      textColorStyles: o
    } = Yt(() => e.color);
    return ie(() => h(Sa, {
      transition: e.transition,
      tag: "div",
      class: me(["v-messages", n.value, e.class]),
      style: Ce([o.value, e.style])
    }, {
      default: () => [e.active && a.value.map((i, r) => C("div", {
        class: "v-messages__message",
        key: `${r}-${a.value}`
      }, [t.message ? t.message({
        message: i
      }) : i]))]
    })), {};
  }
}), fo = K({
  focused: Boolean,
  "onUpdate:focused": Ze()
}, "focus");
function Va(e) {
  let l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Bn();
  const t = we(e, "focused"), a = H(() => ({
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
const mo = Symbol.for("vuetify:form"), jr = K({
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
function Kr(e) {
  const l = we(e, "modelValue"), t = H(() => e.disabled), a = H(() => e.readonly), n = ee(!1), o = q([]), i = q([]);
  async function r() {
    const c = [];
    let d = !0;
    i.value = [], n.value = !0;
    for (const v of o.value) {
      const f = await v.validate();
      if (f.length > 0 && (d = !1, c.push({
        id: v.id,
        errorMessages: f
      })), !d && e.fastFail) break;
    }
    return i.value = c, n.value = !1, {
      valid: d,
      errors: i.value
    };
  }
  function s() {
    o.value.forEach((c) => c.reset());
  }
  function u() {
    o.value.forEach((c) => c.resetValidation());
  }
  return Q(o, () => {
    let c = 0, d = 0;
    const v = [];
    for (const f of o.value)
      f.isValid === !1 ? (d++, v.push({
        id: f.id,
        errorMessages: f.errorMessages
      })) : f.isValid === !0 && c++;
    i.value = v, l.value = d > 0 ? !1 : c === o.value.length ? !0 : null;
  }, {
    deep: !0,
    flush: "post"
  }), Ue(mo, {
    register: (c) => {
      let {
        id: d,
        vm: v,
        validate: f,
        reset: g,
        resetValidation: k
      } = c;
      o.value.some((y) => y.id === d) && dl(`Duplicate input name "${d}"`), o.value.push({
        id: d,
        validate: f,
        reset: g,
        resetValidation: k,
        vm: xi(v),
        isValid: null,
        errorMessages: []
      });
    },
    unregister: (c) => {
      o.value = o.value.filter((d) => d.id !== c);
    },
    update: (c, d, v) => {
      const f = o.value.find((g) => g.id === c);
      f && (f.isValid = d, f.errorMessages = v);
    },
    isDisabled: t,
    isReadonly: a,
    isValidating: n,
    isValid: l,
    items: o,
    validateOn: H(() => e.validateOn)
  }), {
    errors: i,
    isDisabled: t,
    isReadonly: a,
    isValidating: n,
    isValid: l,
    items: o,
    validate: r,
    reset: s,
    resetValidation: u
  };
}
function xl(e) {
  const l = ge(mo, null);
  return {
    ...l,
    isReadonly: I(() => !!((e == null ? void 0 : e.readonly) ?? (l == null ? void 0 : l.isReadonly.value))),
    isDisabled: I(() => !!((e == null ? void 0 : e.disabled) ?? (l == null ? void 0 : l.isDisabled.value)))
  };
}
const Gr = Symbol.for("vuetify:rules");
function Yr(e) {
  const l = ge(Gr, null);
  if (!e) {
    if (!l)
      throw new Error("Could not find Vuetify rules injection");
    return l.aliases;
  }
  return (l == null ? void 0 : l.resolve(e)) ?? H(e);
}
const qr = K({
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
  ...fo()
}, "validation");
function Xr(e) {
  let l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Bn(), t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : gt();
  const a = we(e, "modelValue"), n = I(() => e.validationValue === void 0 ? a.value : e.validationValue), o = xl(e), i = Yr(() => e.rules), r = q([]), s = ee(!0), u = I(() => !!(He(a.value === "" ? null : a.value).length || He(n.value === "" ? null : n.value).length)), c = I(() => {
    var S;
    return (S = e.errorMessages) != null && S.length ? He(e.errorMessages).concat(r.value).slice(0, Math.max(0, Number(e.maxErrors))) : r.value;
  }), d = I(() => {
    var x;
    let S = (e.validateOn ?? ((x = o.validateOn) == null ? void 0 : x.value)) || "input";
    S === "lazy" && (S = "input lazy"), S === "eager" && (S = "input eager");
    const V = new Set((S == null ? void 0 : S.split(" ")) ?? []);
    return {
      input: V.has("input"),
      blur: V.has("blur") || V.has("input") || V.has("invalid-input"),
      invalidInput: V.has("invalid-input"),
      lazy: V.has("lazy"),
      eager: V.has("eager")
    };
  }), v = I(() => {
    var S;
    return e.error || (S = e.errorMessages) != null && S.length ? !1 : e.rules.length ? s.value ? r.value.length || d.value.lazy ? null : !0 : !r.value.length : !0;
  }), f = ee(!1), g = I(() => ({
    [`${l}--error`]: v.value === !1,
    [`${l}--dirty`]: u.value,
    [`${l}--disabled`]: o.isDisabled.value,
    [`${l}--readonly`]: o.isReadonly.value
  })), k = ot("validation"), y = I(() => e.name ?? w(t));
  Si(() => {
    var S;
    (S = o.register) == null || S.call(o, {
      id: y.value,
      vm: k,
      validate: A,
      reset: p,
      resetValidation: m
    });
  }), yt(() => {
    var S;
    (S = o.unregister) == null || S.call(o, y.value);
  }), We(async () => {
    var S;
    d.value.lazy || await A(!d.value.eager), (S = o.update) == null || S.call(o, y.value, v.value, c.value);
  }), Xe(() => d.value.input || d.value.invalidInput && v.value === !1, () => {
    Q(n, () => {
      if (n.value != null)
        A();
      else if (e.focused) {
        const S = Q(() => e.focused, (V) => {
          V || A(), S();
        });
      }
    });
  }), Xe(() => d.value.blur, () => {
    Q(() => e.focused, (S) => {
      S || A();
    });
  }), Q([v, c], () => {
    var S;
    (S = o.update) == null || S.call(o, y.value, v.value, c.value);
  });
  async function p() {
    a.value = null, await Ee(), await m();
  }
  async function m() {
    s.value = !0, d.value.lazy ? r.value = [] : await A(!d.value.eager);
  }
  async function A() {
    let S = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    const V = [];
    f.value = !0;
    for (const x of i.value) {
      if (V.length >= Number(e.maxErrors ?? 1))
        break;
      const b = await (typeof x == "function" ? x : () => x)(n.value);
      if (b !== !0) {
        if (b !== !1 && typeof b != "string") {
          console.warn(`${b} is not a valid value. Rule functions must return boolean true or a string.`);
          continue;
        }
        V.push(b || "");
      }
    }
    return r.value = V, f.value = !1, s.value = S, r.value;
  }
  return {
    errorMessages: c,
    isDirty: u,
    isDisabled: o.isDisabled,
    isReadonly: o.isReadonly,
    isPristine: s,
    isValid: v,
    isValidating: f,
    reset: p,
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
  ...ke(),
  ...bt(),
  ...ns(jt(), ["maxWidth", "minWidth", "width"]),
  ...Ne(),
  ...qr()
}, "VInput"), Tt = ne()({
  name: "VInput",
  props: {
    ...Ca()
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
    } = Et(e), {
      dimensionStyles: i
    } = Ut(e), {
      themeClasses: r
    } = qe(e), {
      rtlClasses: s
    } = it(), {
      InputIcon: u
    } = vo(e), c = gt(), d = I(() => e.id || `input-${c}`), {
      errorMessages: v,
      isDirty: f,
      isDisabled: g,
      isReadonly: k,
      isPristine: y,
      isValid: p,
      isValidating: m,
      reset: A,
      resetValidation: S,
      validate: V,
      validationClasses: x
    } = Xr(e, "v-input", d), P = I(() => {
      var U;
      return (U = e.errorMessages) != null && U.length || !y.value && v.value.length ? v.value : e.hint && (e.persistentHint || e.focused) ? e.hint : e.messages;
    }), b = H(() => P.value.length > 0), _ = H(() => !e.hideDetails || e.hideDetails === "auto" && (b.value || !!a.details)), T = I(() => _.value ? `${d.value}-messages` : void 0), $ = I(() => ({
      id: d,
      messagesId: T,
      isDirty: f,
      isDisabled: g,
      isReadonly: k,
      isPristine: y,
      isValid: p,
      isValidating: m,
      hasDetails: _,
      reset: A,
      resetValidation: S,
      validate: V
    })), D = H(() => e.error || e.disabled ? void 0 : e.focused ? e.color : e.baseColor), M = H(() => {
      if (e.iconColor)
        return e.iconColor === !0 ? D.value : e.iconColor;
    });
    return ie(() => {
      var Y, ae, le, ce;
      const U = !!(a.prepend || e.prependIcon), j = !!(a.append || e.appendIcon);
      return C("div", {
        class: me(["v-input", `v-input--${e.direction}`, {
          "v-input--center-affix": e.centerAffix,
          "v-input--focused": e.focused,
          "v-input--glow": e.glow,
          "v-input--hide-spin-buttons": e.hideSpinButtons
        }, o.value, r.value, s.value, x.value, e.class]),
        style: Ce([i.value, e.style])
      }, [U && C("div", {
        key: "prepend",
        class: "v-input__prepend"
      }, [(Y = a.prepend) == null ? void 0 : Y.call(a, $.value), e.prependIcon && h(u, {
        key: "prepend-icon",
        name: "prepend",
        color: M.value
      }, null)]), a.default && C("div", {
        class: "v-input__control"
      }, [(ae = a.default) == null ? void 0 : ae.call(a, $.value)]), j && C("div", {
        key: "append",
        class: "v-input__append"
      }, [e.appendIcon && h(u, {
        key: "append-icon",
        name: "append",
        color: M.value
      }, null), (le = a.append) == null ? void 0 : le.call(a, $.value)]), _.value && C("div", {
        id: T.value,
        class: "v-input__details",
        role: "alert",
        "aria-live": "polite"
      }, [h(Ur, {
        active: b.value,
        messages: P.value
      }, {
        message: a.message
      }), (ce = a.details) == null ? void 0 : ce.call(a, $.value)])]);
    }), {
      reset: A,
      resetValidation: S,
      validate: V,
      isValid: p,
      errorMessages: v
    };
  }
}), Zr = K({
  ...Ca(),
  ...st(co(), ["inline"])
}, "VCheckbox"), Qr = ne()({
  name: "VCheckbox",
  inheritAttrs: !1,
  props: Zr(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:focused": (e) => !0
  },
  setup(e, l) {
    let {
      attrs: t,
      slots: a
    } = l;
    const n = we(e, "modelValue"), {
      isFocused: o,
      focus: i,
      blur: r
    } = Va(e), s = q(), u = gt();
    return ie(() => {
      const [c, d] = ka(t), v = Tt.filterProps(e), f = St.filterProps(e);
      return h(Tt, R({
        ref: s,
        class: ["v-checkbox", e.class]
      }, c, v, {
        modelValue: n.value,
        "onUpdate:modelValue": (g) => n.value = g,
        id: e.id || `checkbox-${u}`,
        focused: o.value,
        style: e.style
      }), {
        ...a,
        default: (g) => {
          let {
            id: k,
            messagesId: y,
            isDisabled: p,
            isReadonly: m,
            isValid: A
          } = g;
          return h(St, R(f, {
            id: k.value,
            "aria-describedby": y.value,
            disabled: p.value,
            readonly: m.value
          }, d, {
            error: A.value === !1,
            modelValue: n.value,
            "onUpdate:modelValue": (S) => n.value = S,
            onFocus: i,
            onBlur: r
          }), a);
        }
      });
    }), dt({}, s);
  }
}), go = Symbol.for("vuetify:v-chip-group"), Jr = K({
  baseColor: String,
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: et
  },
  ...pl(),
  ...ke(),
  ...bn({
    selectedClass: "v-chip--selected"
  }),
  ...Ke(),
  ...Ne(),
  ...Gt({
    variant: "tonal"
  })
}, "VChipGroup");
ne()({
  name: "VChipGroup",
  props: Jr(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, l) {
    let {
      slots: t
    } = l;
    const {
      themeClasses: a
    } = qe(e), {
      isSelected: n,
      select: o,
      next: i,
      prev: r,
      selected: s
    } = nl(e, go);
    return lt({
      VChip: {
        baseColor: H(() => e.baseColor),
        color: H(() => e.color),
        disabled: H(() => e.disabled),
        filter: H(() => e.filter),
        variant: H(() => e.variant)
      }
    }), ie(() => {
      const u = Ht.filterProps(e);
      return h(Ht, R(u, {
        class: ["v-chip-group", {
          "v-chip-group--column": e.column
        }, a.value, e.class],
        style: e.style
      }), {
        default: () => {
          var c;
          return [(c = t.default) == null ? void 0 : c.call(t, {
            isSelected: n,
            select: o,
            next: i,
            prev: r,
            selected: s.value
          })];
        }
      });
    }), {};
  }
});
const eu = K({
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
  ...Wt(),
  ...ke(),
  ...bt(),
  ...zt(),
  ...ol(),
  ...kt(),
  ...kn(),
  ...Sn(),
  ...Ke({
    tag: "span"
  }),
  ...Ne(),
  ...Gt({
    variant: "tonal"
  })
}, "VChip"), Sl = ne()({
  name: "VChip",
  directives: {
    vRipple: It
  },
  props: eu(),
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
    } = rt(), {
      borderClasses: i
    } = pa(e), {
      densityClasses: r
    } = Et(e), {
      elevationClasses: s
    } = wa(e), {
      roundedClasses: u
    } = Bt(e), {
      sizeClasses: c
    } = Gi(e), {
      themeClasses: d
    } = qe(e), v = we(e, "modelValue"), f = il(e, go, !1), g = wn(e, t), k = H(() => e.link !== !1 && g.isLink.value), y = I(() => !e.disabled && e.link !== !1 && (!!f || e.link || g.isClickable.value)), p = H(() => ({
      "aria-label": o(e.closeLabel),
      disabled: e.disabled,
      onClick(P) {
        P.preventDefault(), P.stopPropagation(), v.value = !1, a("click:close", P);
      }
    })), {
      colorClasses: m,
      colorStyles: A,
      variantClasses: S
    } = al(() => ({
      color: !f || f.isSelected.value ? e.color ?? e.baseColor : e.baseColor,
      variant: e.variant
    }));
    function V(P) {
      var b;
      a("click", P), y.value && ((b = g.navigate) == null || b.call(g, P), f == null || f.toggle());
    }
    function x(P) {
      (P.key === "Enter" || P.key === " ") && (P.preventDefault(), V(P));
    }
    return () => {
      var U;
      const P = g.isLink.value ? "a" : e.tag, b = !!(e.appendIcon || e.appendAvatar), _ = !!(b || n.append), T = !!(n.close || e.closable), $ = !!(n.filter || e.filter) && f, D = !!(e.prependIcon || e.prependAvatar), M = !!(D || n.prepend);
      return v.value && Ye(h(P, R({
        class: ["v-chip", {
          "v-chip--disabled": e.disabled,
          "v-chip--label": e.label,
          "v-chip--link": y.value,
          "v-chip--filter": $,
          "v-chip--pill": e.pill,
          [`${e.activeClass}`]: e.activeClass && ((U = g.isActive) == null ? void 0 : U.value)
        }, d.value, i.value, m.value, r.value, s.value, u.value, c.value, S.value, f == null ? void 0 : f.selectedClass.value, e.class],
        style: [A.value, e.style],
        disabled: e.disabled || void 0,
        draggable: e.draggable,
        tabindex: y.value ? 0 : void 0,
        onClick: V,
        onKeydown: y.value && !k.value && x
      }, g.linkProps), {
        default: () => {
          var j;
          return [ll(y.value, "v-chip"), $ && h(xn, {
            key: "filter"
          }, {
            default: () => [Ye(C("div", {
              class: "v-chip__filter"
            }, [n.filter ? h(Me, {
              key: "filter-defaults",
              disabled: !e.filterIcon,
              defaults: {
                VIcon: {
                  icon: e.filterIcon
                }
              }
            }, n.filter) : h(Ve, {
              key: "filter-icon",
              icon: e.filterIcon
            }, null)]), [[_t, f.isSelected.value]])]
          }), M && C("div", {
            key: "prepend",
            class: "v-chip__prepend"
          }, [n.prepend ? h(Me, {
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
          }, n.prepend) : C(X, null, [e.prependIcon && h(Ve, {
            key: "prepend-icon",
            icon: e.prependIcon,
            start: !0
          }, null), e.prependAvatar && h(xt, {
            key: "prepend-avatar",
            image: e.prependAvatar,
            start: !0
          }, null)])]), C("div", {
            class: "v-chip__content",
            "data-no-activator": ""
          }, [((j = n.default) == null ? void 0 : j.call(n, {
            isSelected: f == null ? void 0 : f.isSelected.value,
            selectedClass: f == null ? void 0 : f.selectedClass.value,
            select: f == null ? void 0 : f.select,
            toggle: f == null ? void 0 : f.toggle,
            value: f == null ? void 0 : f.value.value,
            disabled: e.disabled
          })) ?? Re(e.text)]), _ && C("div", {
            key: "append",
            class: "v-chip__append"
          }, [n.append ? h(Me, {
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
          }, n.append) : C(X, null, [e.appendIcon && h(Ve, {
            key: "append-icon",
            end: !0,
            icon: e.appendIcon
          }, null), e.appendAvatar && h(xt, {
            key: "append-avatar",
            end: !0,
            image: e.appendAvatar
          }, null)])]), T && C("button", R({
            key: "close",
            class: "v-chip__close",
            type: "button",
            "data-testid": "close-chip"
          }, p.value), [n.close ? h(Me, {
            key: "close-defaults",
            defaults: {
              VIcon: {
                icon: e.closeIcon,
                size: "x-small"
              }
            }
          }, n.close) : h(Ve, {
            key: "close-icon",
            icon: e.closeIcon,
            size: "x-small"
          }, null)])];
        }
      }), [[It, y.value && e.ripple, null]]);
    };
  }
}), tu = K({
  // TODO
  // disableKeys: Boolean,
  id: String,
  submenu: Boolean,
  disableInitialFocus: Boolean,
  ...st(yl({
    closeDelay: 250,
    closeOnContentClick: !0,
    locationStrategy: "connected",
    location: void 0,
    openDelay: 300,
    scrim: !1,
    scrollStrategy: "reposition",
    transition: {
      component: Nn
    }
  }), ["absolute"])
}, "VMenu"), kl = ne()({
  name: "VMenu",
  props: tu(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = we(e, "modelValue"), {
      scopeId: n
    } = Xt(), {
      isRtl: o
    } = it(), i = gt(), r = H(() => e.id || `v-menu-${i}`), s = q(), u = ge(Ga, null), c = ee(/* @__PURE__ */ new Set());
    Ue(Ga, {
      register() {
        c.value.add(i);
      },
      unregister() {
        c.value.delete(i);
      },
      closeParents(y) {
        setTimeout(() => {
          var p;
          !c.value.size && !e.persistent && (y == null || (p = s.value) != null && p.contentEl && !os(y, s.value.contentEl)) && (a.value = !1, u == null || u.closeParents());
        }, 40);
      }
    }), yt(() => {
      u == null || u.unregister(), document.removeEventListener("focusin", d);
    }), un(() => a.value = !1);
    async function d(y) {
      var A, S, V;
      const p = y.relatedTarget, m = y.target;
      await Ee(), a.value && p !== m && ((A = s.value) != null && A.contentEl) && // We're the topmost menu
      ((S = s.value) != null && S.globalTop) && // It isn't the document or the menu body
      ![document, s.value.contentEl].includes(m) && // It isn't inside the menu body
      !s.value.contentEl.contains(m) && ((V = za(s.value.contentEl)[0]) == null || V.focus());
    }
    Q(a, (y) => {
      y ? (u == null || u.register(), ze && !e.disableInitialFocus && document.addEventListener("focusin", d, {
        once: !0
      })) : (u == null || u.unregister(), ze && document.removeEventListener("focusin", d));
    }, {
      immediate: !0
    });
    function v(y) {
      u == null || u.closeParents(y);
    }
    function f(y) {
      var p, m, A, S, V;
      if (!e.disabled)
        if (y.key === "Tab" || y.key === "Enter" && !e.closeOnContentClick) {
          if (y.key === "Enter" && (y.target instanceof HTMLTextAreaElement || y.target instanceof HTMLInputElement && y.target.closest("form"))) return;
          y.key === "Enter" && y.preventDefault(), is(za((p = s.value) == null ? void 0 : p.contentEl, !1), y.shiftKey ? "prev" : "next", (P) => P.tabIndex >= 0) || (a.value = !1, (A = (m = s.value) == null ? void 0 : m.activatorEl) == null || A.focus());
        } else e.submenu && y.key === (o.value ? "ArrowRight" : "ArrowLeft") && (a.value = !1, (V = (S = s.value) == null ? void 0 : S.activatorEl) == null || V.focus());
    }
    function g(y) {
      var m;
      if (e.disabled) return;
      const p = (m = s.value) == null ? void 0 : m.contentEl;
      p && a.value ? y.key === "ArrowDown" ? (y.preventDefault(), y.stopImmediatePropagation(), Ba(p, "next")) : y.key === "ArrowUp" ? (y.preventDefault(), y.stopImmediatePropagation(), Ba(p, "prev")) : e.submenu && (y.key === (o.value ? "ArrowRight" : "ArrowLeft") ? a.value = !1 : y.key === (o.value ? "ArrowLeft" : "ArrowRight") && (y.preventDefault(), Ba(p, "first"))) : (e.submenu ? y.key === (o.value ? "ArrowLeft" : "ArrowRight") : ["ArrowDown", "ArrowUp"].includes(y.key)) && (a.value = !0, y.preventDefault(), setTimeout(() => setTimeout(() => g(y))));
    }
    const k = I(() => R({
      "aria-haspopup": "menu",
      "aria-expanded": String(a.value),
      "aria-controls": r.value,
      onKeydown: g
    }, e.activatorProps));
    return ie(() => {
      const y = ua.filterProps(e);
      return h(ua, R({
        ref: s,
        id: r.value,
        class: ["v-menu", e.class],
        style: e.style
      }, y, {
        modelValue: a.value,
        "onUpdate:modelValue": (p) => a.value = p,
        absolute: !0,
        activatorProps: k.value,
        location: e.location ?? (e.submenu ? "end" : "bottom"),
        "onClick:outside": v,
        onKeydown: f
      }, n), {
        activator: t.activator,
        default: function() {
          for (var p = arguments.length, m = new Array(p), A = 0; A < p; A++)
            m[A] = arguments[A];
          return h(Me, {
            root: "VMenu"
          }, {
            default: () => {
              var S;
              return [(S = t.default) == null ? void 0 : S.call(t, ...m)];
            }
          });
        }
      });
    }), dt({
      id: r,
      ΨopenChildren: c
    }, s);
  }
}), au = K({
  active: Boolean,
  disabled: Boolean,
  max: [Number, String],
  value: {
    type: [Number, String],
    default: 0
  },
  ...ke(),
  ...Kt({
    transition: {
      component: pn
    }
  })
}, "VCounter"), yo = ne()({
  name: "VCounter",
  functional: !0,
  props: au(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = H(() => e.max ? `${e.value} / ${e.max}` : String(e.value));
    return ie(() => h(Sa, {
      transition: e.transition
    }, {
      default: () => [Ye(C("div", {
        class: me(["v-counter", {
          "text-error": e.max && !e.disabled && parseFloat(e.value) > parseFloat(e.max)
        }, e.class]),
        style: Ce(e.style)
      }, [t.default ? t.default({
        counter: a.value,
        max: e.max,
        value: e.value
      }) : a.value]), [[_t, e.active]])]
    })), {};
  }
}), lu = K({
  floating: Boolean,
  ...ke()
}, "VFieldLabel"), ea = ne()({
  name: "VFieldLabel",
  props: lu(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    return ie(() => h(wl, {
      class: me(["v-field-label", {
        "v-field-label--floating": e.floating
      }, e.class]),
      style: Ce(e.style)
    }, t)), {};
  }
}), nu = ["underlined", "outlined", "filled", "solo", "solo-inverted", "solo-filled", "plain"], Vl = K({
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
  prependInnerIcon: Se,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {
    type: String,
    default: "filled",
    validator: (e) => nu.includes(e)
  },
  "onClick:clear": Ze(),
  "onClick:appendInner": Ze(),
  "onClick:prependInner": Ze(),
  ...ke(),
  ...ul(),
  ...kt(),
  ...Ne()
}, "VField"), da = ne()({
  name: "VField",
  inheritAttrs: !1,
  props: {
    id: String,
    ...fo(),
    ...Vl()
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
    } = qe(e), {
      loaderClasses: i
    } = sl(e), {
      focusClasses: r,
      isFocused: s,
      focus: u,
      blur: c
    } = Va(e), {
      InputIcon: d
    } = vo(e), {
      roundedClasses: v
    } = Bt(e), {
      rtlClasses: f
    } = it(), g = H(() => e.dirty || e.active), k = H(() => !!(e.label || n.label)), y = H(() => !e.singleLine && k.value), p = gt(), m = I(() => e.id || `input-${p}`), A = H(() => e.details ? `${m.value}-messages` : void 0), S = q(), V = q(), x = q(), P = I(() => ["plain", "underlined"].includes(e.variant)), b = I(() => e.error || e.disabled ? void 0 : g.value && s.value ? e.color : e.baseColor), _ = I(() => {
      if (!(!e.iconColor || e.glow && !s.value))
        return e.iconColor === !0 ? b.value : e.iconColor;
    }), {
      backgroundColorClasses: T,
      backgroundColorStyles: $
    } = ft(() => e.bgColor), {
      textColorClasses: D,
      textColorStyles: M
    } = Yt(b);
    Q(g, (Y) => {
      if (y.value) {
        const ae = S.value.$el, le = V.value.$el;
        requestAnimationFrame(() => {
          const ce = fl(ae), B = le.getBoundingClientRect(), E = B.x - ce.x, F = B.y - ce.y - (ce.height / 2 - B.height / 2), W = B.width / 0.75, ve = Math.abs(W - ce.width) > 1 ? {
            maxWidth: he(W)
          } : void 0, te = getComputedStyle(ae), ue = getComputedStyle(le), Z = parseFloat(te.transitionDuration) * 1e3 || 150, se = parseFloat(ue.getPropertyValue("--v-field-label-scale")), de = ue.getPropertyValue("color");
          ae.style.visibility = "visible", le.style.visibility = "hidden", wt(ae, {
            transform: `translate(${E}px, ${F}px) scale(${se})`,
            color: de,
            ...ve
          }, {
            duration: Z,
            easing: Mt,
            direction: Y ? "normal" : "reverse"
          }).finished.then(() => {
            ae.style.removeProperty("visibility"), le.style.removeProperty("visibility");
          });
        });
      }
    }, {
      flush: "post"
    });
    const U = I(() => ({
      isActive: g,
      isFocused: s,
      controlRef: x,
      blur: c,
      focus: u
    }));
    function j(Y) {
      Y.target !== document.activeElement && Y.preventDefault();
    }
    return ie(() => {
      var E, F, W;
      const Y = e.variant === "outlined", ae = !!(n["prepend-inner"] || e.prependInnerIcon), le = !!(e.clearable || n.clear) && !e.disabled, ce = !!(n["append-inner"] || e.appendInnerIcon || le), B = () => n.label ? n.label({
        ...U.value,
        label: e.label,
        props: {
          for: m.value
        }
      }) : e.label;
      return C("div", R({
        class: ["v-field", {
          "v-field--active": g.value,
          "v-field--appended": ce,
          "v-field--center-affix": e.centerAffix ?? !P.value,
          "v-field--disabled": e.disabled,
          "v-field--dirty": e.dirty,
          "v-field--error": e.error,
          "v-field--glow": e.glow,
          "v-field--flat": e.flat,
          "v-field--has-background": !!e.bgColor,
          "v-field--persistent-clear": e.persistentClear,
          "v-field--prepended": ae,
          "v-field--reverse": e.reverse,
          "v-field--single-line": e.singleLine,
          "v-field--no-label": !B(),
          [`v-field--variant-${e.variant}`]: !0
        }, o.value, T.value, r.value, i.value, v.value, f.value, e.class],
        style: [$.value, e.style],
        onClick: j
      }, t), [C("div", {
        class: "v-field__overlay"
      }, null), h(rl, {
        name: "v-field",
        active: !!e.loading,
        color: e.error ? "error" : typeof e.loading == "string" ? e.loading : e.color
      }, {
        default: n.loader
      }), ae && C("div", {
        key: "prepend",
        class: "v-field__prepend-inner"
      }, [e.prependInnerIcon && h(d, {
        key: "prepend-icon",
        name: "prependInner",
        color: _.value
      }, null), (E = n["prepend-inner"]) == null ? void 0 : E.call(n, U.value)]), C("div", {
        class: "v-field__field",
        "data-no-activator": ""
      }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(e.variant) && y.value && h(ea, {
        key: "floating-label",
        ref: V,
        class: me([D.value]),
        floating: !0,
        for: m.value,
        "aria-hidden": !g.value,
        style: Ce(M.value)
      }, {
        default: () => [B()]
      }), k.value && h(ea, {
        key: "label",
        ref: S,
        for: m.value
      }, {
        default: () => [B()]
      }), ((F = n.default) == null ? void 0 : F.call(n, {
        ...U.value,
        props: {
          id: m.value,
          class: "v-field__input",
          "aria-describedby": A.value
        },
        focus: u,
        blur: c
      })) ?? C("div", {
        id: m.value,
        class: "v-field__input",
        "aria-describedby": A.value
      }, null)]), le && h(xn, {
        key: "clear"
      }, {
        default: () => [Ye(C("div", {
          class: "v-field__clearable",
          onMousedown: (ve) => {
            ve.preventDefault(), ve.stopPropagation();
          }
        }, [h(Me, {
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
              onBlur: c,
              onClick: e["onClick:clear"],
              tabindex: -1
            }
          }) : h(d, {
            name: "clear",
            onFocus: u,
            onBlur: c,
            tabindex: -1
          }, null)]
        })]), [[_t, e.dirty]])]
      }), ce && C("div", {
        key: "append",
        class: "v-field__append-inner"
      }, [(W = n["append-inner"]) == null ? void 0 : W.call(n, U.value), e.appendInnerIcon && h(d, {
        key: "append-icon",
        name: "appendInner",
        color: _.value
      }, null)]), C("div", {
        class: me(["v-field__outline", D.value]),
        style: Ce(M.value)
      }, [Y && C(X, null, [C("div", {
        class: "v-field__outline__start"
      }, null), y.value && C("div", {
        class: "v-field__outline__notch"
      }, [h(ea, {
        ref: V,
        floating: !0,
        for: m.value,
        "aria-hidden": !g.value
      }, {
        default: () => [B()]
      })]), C("div", {
        class: "v-field__outline__end"
      }, null)]), P.value && y.value && h(ea, {
        ref: V,
        floating: !0,
        for: m.value,
        "aria-hidden": !g.value
      }, {
        default: () => [B()]
      })])]);
    }), {
      controlRef: x,
      fieldIconColor: _
    };
  }
});
function ho(e) {
  function l(t, a) {
    var n, o;
    !e.autofocus || !t || (o = (n = a[0].target) == null ? void 0 : n.focus) == null || o.call(n);
  }
  return {
    onIntersect: l
  };
}
const ou = ["color", "file", "time", "date", "datetime-local", "week", "month"], Cl = K({
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
  ...Vl()
}, "VTextField"), mt = ne()({
  name: "VTextField",
  directives: {
    vIntersect: na
  },
  inheritAttrs: !1,
  props: Cl(),
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
    const o = we(e, "modelValue"), {
      isFocused: i,
      focus: r,
      blur: s
    } = Va(e), {
      onIntersect: u
    } = ho(e), c = I(() => typeof e.counterValue == "function" ? e.counterValue(o.value) : typeof e.counterValue == "number" ? e.counterValue : (o.value ?? "").toString().length), d = I(() => {
      if (t.maxlength) return t.maxlength;
      if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string"))
        return e.counter;
    }), v = I(() => ["plain", "underlined"].includes(e.variant)), f = q(), g = q(), k = q(), y = I(() => ou.includes(e.type) || e.persistentPlaceholder || i.value || e.active);
    function p() {
      i.value || r(), Ee(() => {
        var x;
        k.value !== document.activeElement && ((x = k.value) == null || x.focus());
      });
    }
    function m(x) {
      a("mousedown:control", x), x.target !== k.value && (p(), x.preventDefault());
    }
    function A(x) {
      a("click:control", x);
    }
    function S(x, P) {
      x.stopPropagation(), p(), Ee(() => {
        o.value = null, P(), vl(e["onClick:clear"], x);
      });
    }
    function V(x) {
      var b;
      const P = x.target;
      if (o.value = P.value, (b = e.modelModifiers) != null && b.trim && ["text", "search", "password", "tel", "url"].includes(e.type)) {
        const _ = [P.selectionStart, P.selectionEnd];
        Ee(() => {
          P.selectionStart = _[0], P.selectionEnd = _[1];
        });
      }
    }
    return ie(() => {
      const x = !!(n.counter || e.counter !== !1 && e.counter != null), P = !!(x || n.details), [b, _] = ka(t), {
        modelValue: T,
        ...$
      } = Tt.filterProps(e), D = da.filterProps(e);
      return h(Tt, R({
        ref: f,
        modelValue: o.value,
        "onUpdate:modelValue": (M) => o.value = M,
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
        default: (M) => {
          let {
            id: U,
            isDisabled: j,
            isDirty: Y,
            isReadonly: ae,
            isValid: le,
            hasDetails: ce,
            reset: B
          } = M;
          return h(da, R({
            ref: g,
            onMousedown: m,
            onClick: A,
            "onClick:clear": (E) => S(E, B),
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"],
            role: e.role
          }, st(D, ["onClick:clear"]), {
            id: U.value,
            active: y.value || Y.value,
            dirty: Y.value || e.dirty,
            disabled: j.value,
            focused: i.value,
            details: ce.value,
            error: le.value === !1
          }), {
            ...n,
            default: (E) => {
              let {
                props: {
                  class: F,
                  ...W
                }
              } = E;
              const ve = Ye(C("input", R({
                ref: k,
                value: o.value,
                onInput: V,
                autofocus: e.autofocus,
                readonly: ae.value,
                disabled: j.value,
                name: e.name,
                placeholder: e.placeholder,
                size: 1,
                role: e.role,
                type: e.type,
                onFocus: r,
                onBlur: s
              }, W, _), null), [[na, {
                handler: u
              }, null, {
                once: !0
              }]]);
              return C(X, null, [e.prefix && C("span", {
                class: "v-text-field__prefix"
              }, [C("span", {
                class: "v-text-field__prefix__text"
              }, [e.prefix])]), n.default ? C("div", {
                class: me(F),
                "data-no-activator": ""
              }, [n.default(), ve]) : ki(ve, {
                class: F
              }), e.suffix && C("span", {
                class: "v-text-field__suffix"
              }, [C("span", {
                class: "v-text-field__suffix__text"
              }, [e.suffix])])]);
            }
          });
        },
        details: P ? (M) => {
          var U;
          return C(X, null, [(U = n.details) == null ? void 0 : U.call(n, M), x && C(X, null, [C("span", null, null), h(yo, {
            active: e.persistentCounter || i.value,
            value: c.value,
            max: d.value,
            disabled: e.disabled
          }, n.counter)])]);
        } : void 0
      });
    }), dt({}, f, g, k);
  }
}), iu = K({
  renderless: Boolean,
  ...ke()
}, "VVirtualScrollItem"), su = ne()({
  name: "VVirtualScrollItem",
  inheritAttrs: !1,
  props: iu(),
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
    } = Pt(void 0, "border");
    Q(() => {
      var r;
      return (r = i.value) == null ? void 0 : r.height;
    }, (r) => {
      r != null && a("update:height", r);
    }), ie(() => {
      var r, s;
      return e.renderless ? C(X, null, [(r = n.default) == null ? void 0 : r.call(n, {
        itemRef: o
      })]) : C("div", R({
        ref: o,
        class: ["v-virtual-scroll__item", e.class],
        style: e.style
      }, t), [(s = n.default) == null ? void 0 : s.call(n)]);
    });
  }
}), ru = -1, uu = 1, Ra = 100, cu = K({
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
function du(e, l) {
  const t = pt(), a = ee(0);
  tt(() => {
    a.value = parseFloat(e.itemHeight || 0);
  });
  const n = ee(0), o = ee(Math.ceil(
    // Assume 16px items filling the entire screen height if
    // not provided. This is probably incorrect but it minimises
    // the chance of ending up with empty space at the bottom.
    // The default value is set here to avoid poisoning getSize()
    (parseInt(e.height) || t.height.value) / (a.value || 16)
  ) || 1), i = ee(0), r = ee(0), s = q(), u = q();
  let c = 0;
  const {
    resizeRef: d,
    contentRect: v
  } = Pt();
  tt(() => {
    d.value = s.value;
  });
  const f = I(() => {
    var B;
    return s.value === document.documentElement ? t.height.value : ((B = v.value) == null ? void 0 : B.height) || parseInt(e.height) || 0;
  }), g = I(() => !!(s.value && u.value && f.value && a.value));
  let k = Array.from({
    length: l.value.length
  }), y = Array.from({
    length: l.value.length
  });
  const p = ee(0);
  let m = -1;
  function A(B) {
    return k[B] || a.value;
  }
  const S = ss(() => {
    const B = performance.now();
    y[0] = 0;
    const E = l.value.length;
    for (let F = 1; F <= E - 1; F++)
      y[F] = (y[F - 1] || 0) + A(F - 1);
    p.value = Math.max(p.value, performance.now() - B);
  }, p), V = Q(g, (B) => {
    B && (V(), c = u.value.offsetTop, S.immediate(), Y(), ~m && Ee(() => {
      ze && window.requestAnimationFrame(() => {
        le(m), m = -1;
      });
    }));
  });
  je(() => {
    S.clear();
  });
  function x(B, E) {
    const F = k[B], W = a.value;
    a.value = W ? Math.min(a.value, E) : E, (F !== E || W !== a.value) && (k[B] = E, S());
  }
  function P(B) {
    B = Je(B, 0, l.value.length - 1);
    const E = Math.floor(B), F = B % 1, W = E + 1, ve = y[E] || 0, te = y[W] || ve;
    return ve + (te - ve) * F;
  }
  function b(B) {
    return vu(y, B);
  }
  let _ = 0, T = 0, $ = 0;
  Q(f, (B, E) => {
    E && (Y(), B < E && requestAnimationFrame(() => {
      T = 0, Y();
    }));
  });
  let D = -1;
  function M() {
    if (!s.value || !u.value) return;
    const B = s.value.scrollTop, E = performance.now();
    E - $ > 500 ? (T = Math.sign(B - _), c = u.value.offsetTop) : T = B - _, _ = B, $ = E, window.clearTimeout(D), D = window.setTimeout(U, 500), Y();
  }
  function U() {
    !s.value || !u.value || (T = 0, $ = 0, window.clearTimeout(D), Y());
  }
  let j = -1;
  function Y() {
    cancelAnimationFrame(j), j = requestAnimationFrame(ae);
  }
  function ae() {
    if (!s.value || !f.value || !a.value) return;
    const B = _ - c, E = Math.sign(T), F = Math.max(0, B - Ra), W = Je(b(F), 0, l.value.length), ve = B + f.value + Ra, te = Je(b(ve) + 1, W + 1, l.value.length);
    if (
      // Only update the side we're scrolling towards,
      // the other side will be updated incidentally
      (E !== ru || W < n.value) && (E !== uu || te > o.value)
    ) {
      const ue = P(n.value) - P(W), Z = P(te) - P(o.value);
      Math.max(ue, Z) > Ra ? (n.value = W, o.value = te) : (W <= 0 && (n.value = W), te >= l.value.length && (o.value = te));
    }
    i.value = P(n.value), r.value = P(l.value.length) - P(o.value);
  }
  function le(B) {
    const E = P(B);
    !s.value || B && !E ? m = B : s.value.scrollTop = E;
  }
  const ce = I(() => l.value.slice(n.value, o.value).map((B, E) => {
    const F = E + n.value;
    return {
      raw: B,
      index: F,
      key: Ct(B, e.itemKey, F)
    };
  }));
  return Q(l, () => {
    k = Array.from({
      length: l.value.length
    }), y = Array.from({
      length: l.value.length
    }), S.immediate(), Y();
  }, {
    deep: 1
  }), {
    calculateVisibleItems: Y,
    containerRef: s,
    markerRef: u,
    computedItems: ce,
    paddingTop: i,
    paddingBottom: r,
    scrollToIndex: le,
    handleScroll: M,
    handleScrollend: U,
    handleItemResize: x
  };
}
function vu(e, l) {
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
const fu = K({
  items: {
    type: Array,
    default: () => []
  },
  renderless: Boolean,
  ...cu(),
  ...ke(),
  ...jt()
}, "VVirtualScroll"), bo = ne()({
  name: "VVirtualScroll",
  props: fu(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = ot("VVirtualScroll"), {
      dimensionStyles: n
    } = Ut(e), {
      calculateVisibleItems: o,
      containerRef: i,
      markerRef: r,
      handleScroll: s,
      handleScrollend: u,
      handleItemResize: c,
      scrollToIndex: d,
      paddingTop: v,
      paddingBottom: f,
      computedItems: g
    } = du(e, H(() => e.items));
    return Xe(() => e.renderless, () => {
      function k() {
        var m, A;
        const p = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1) ? "addEventListener" : "removeEventListener";
        i.value === document.documentElement ? (document[p]("scroll", s, {
          passive: !0
        }), document[p]("scrollend", u)) : ((m = i.value) == null || m[p]("scroll", s, {
          passive: !0
        }), (A = i.value) == null || A[p]("scrollend", u));
      }
      We(() => {
        i.value = Fn(a.vnode.el, !0), k(!0);
      }), je(k);
    }), ie(() => {
      const k = g.value.map((y) => h(su, {
        key: y.key,
        renderless: e.renderless,
        "onUpdate:height": (p) => c(y.index, p)
      }, {
        default: (p) => {
          var m;
          return (m = t.default) == null ? void 0 : m.call(t, {
            item: y.raw,
            index: y.index,
            ...p
          });
        }
      }));
      return e.renderless ? C(X, null, [C("div", {
        ref: r,
        class: "v-virtual-scroll__spacer",
        style: {
          paddingTop: he(v.value)
        }
      }, null), k, C("div", {
        class: "v-virtual-scroll__spacer",
        style: {
          paddingBottom: he(f.value)
        }
      }, null)]) : C("div", {
        ref: i,
        class: me(["v-virtual-scroll", e.class]),
        onScrollPassive: s,
        onScrollend: u,
        style: Ce([n.value, e.style])
      }, [C("div", {
        ref: r,
        class: "v-virtual-scroll__container",
        style: {
          paddingTop: he(v.value),
          paddingBottom: he(f.value)
        }
      }, [k])]);
    }), {
      calculateVisibleItems: o,
      scrollToIndex: d
    };
  }
});
function po(e, l) {
  const t = ee(!1);
  let a;
  function n(r) {
    cancelAnimationFrame(a), t.value = !0, a = requestAnimationFrame(() => {
      a = requestAnimationFrame(() => {
        t.value = !1;
      });
    });
  }
  async function o() {
    await new Promise((r) => requestAnimationFrame(r)), await new Promise((r) => requestAnimationFrame(r)), await new Promise((r) => requestAnimationFrame(r)), await new Promise((r) => {
      if (t.value) {
        const s = Q(t, () => {
          s(), r();
        });
      } else r();
    });
  }
  async function i(r) {
    var c, d;
    if (r.key === "Tab" && ((c = l.value) == null || c.focus()), !["PageDown", "PageUp", "Home", "End"].includes(r.key)) return;
    const s = (d = e.value) == null ? void 0 : d.$el;
    if (!s) return;
    (r.key === "Home" || r.key === "End") && s.scrollTo({
      top: r.key === "Home" ? 0 : s.scrollHeight,
      behavior: "smooth"
    }), await o();
    const u = s.querySelectorAll(":scope > :not(.v-virtual-scroll__spacer)");
    if (r.key === "PageDown" || r.key === "Home") {
      const v = s.getBoundingClientRect().top;
      for (const f of u)
        if (f.getBoundingClientRect().top >= v) {
          f.focus();
          break;
        }
    } else {
      const v = s.getBoundingClientRect().bottom;
      for (const f of [...u].reverse())
        if (f.getBoundingClientRect().bottom <= v) {
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
const wo = K({
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
  noAutoScroll: Boolean,
  ...Yi({
    itemChildren: !1
  })
}, "Select"), mu = K({
  ...wo(),
  ...st(Cl({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...Kt({
    transition: {
      component: Nn
    }
  })
}, "VSelect"), Pl = ne()({
  name: "VSelect",
  props: mu(),
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
    } = rt(), n = q(), o = q(), i = q(), {
      items: r,
      transformIn: s,
      transformOut: u
    } = Vn(e), c = we(e, "modelValue", [], (B) => s(B === null ? [null] : He(B)), (B) => {
      const E = u(B);
      return e.multiple ? E : E[0] ?? null;
    }), d = I(() => typeof e.counterValue == "function" ? e.counterValue(c.value) : typeof e.counterValue == "number" ? e.counterValue : c.value.length), v = xl(e), f = I(() => c.value.map((B) => B.value)), g = ee(!1);
    let k = "", y = -1, p;
    const m = I(() => e.hideSelected ? r.value.filter((B) => !c.value.some((E) => (e.valueComparator || et)(E, B))) : r.value), A = I(() => e.hideNoData && !m.value.length || v.isReadonly.value || v.isDisabled.value), S = we(e, "menu"), V = I({
      get: () => S.value,
      set: (B) => {
        var E;
        S.value && !B && ((E = o.value) != null && E.ΨopenChildren.size) || B && A.value || (S.value = B);
      }
    }), x = H(() => V.value ? e.closeText : e.openText), P = I(() => {
      var B;
      return {
        ...e.menuProps,
        activatorProps: {
          ...((B = e.menuProps) == null ? void 0 : B.activatorProps) || {},
          "aria-haspopup": "listbox"
          // Set aria-haspopup to 'listbox'
        }
      };
    }), b = q(), _ = po(b, n);
    function T(B) {
      e.openOnClear && (V.value = !0);
    }
    function $() {
      A.value || (V.value = !V.value);
    }
    function D(B) {
      oa(B) && M(B);
    }
    function M(B) {
      var de, N, J;
      if (!B.key || v.isReadonly.value) return;
      ["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(B.key) && B.preventDefault(), ["Enter", "ArrowDown", " "].includes(B.key) && (V.value = !0), ["Escape", "Tab"].includes(B.key) && (V.value = !1), B.key === "Home" ? (de = b.value) == null || de.focus("first") : B.key === "End" && ((N = b.value) == null || N.focus("last"));
      const E = 1e3;
      if (!oa(B)) return;
      const F = performance.now();
      F - p > E && (k = "", y = -1), k += B.key.toLowerCase(), p = F;
      const W = m.value;
      function ve() {
        let fe = te();
        return fe || k.at(-1) === k.at(-2) && (k = k.slice(0, -1), fe = te(), fe) || (y = -1, fe = te(), fe) ? fe : (k = B.key.toLowerCase(), te());
      }
      function te() {
        for (let fe = y + 1; fe < W.length; fe++) {
          const be = W[fe];
          if (be.title.toLowerCase().startsWith(k))
            return [be, fe];
        }
      }
      const ue = ve();
      if (!ue) return;
      const [Z, se] = ue;
      y = se, (J = b.value) == null || J.focus(se), e.multiple || (c.value = [Z]);
    }
    function U(B) {
      let E = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!B.props.disabled)
        if (e.multiple) {
          const F = c.value.findIndex((ve) => (e.valueComparator || et)(ve.value, B.value)), W = E ?? !~F;
          if (~F) {
            const ve = W ? [...c.value, B] : [...c.value];
            ve.splice(F, 1), c.value = ve;
          } else W && (c.value = [...c.value, B]);
        } else {
          const F = E !== !1;
          c.value = F ? [B] : [], Ee(() => {
            V.value = !1;
          });
        }
    }
    function j(B) {
      var E;
      (E = b.value) != null && E.$el.contains(B.relatedTarget) || (V.value = !1);
    }
    function Y() {
      var B;
      e.eager && ((B = i.value) == null || B.calculateVisibleItems());
    }
    function ae() {
      var B;
      g.value && ((B = n.value) == null || B.focus());
    }
    function le(B) {
      g.value = !0;
    }
    function ce(B) {
      if (B == null) c.value = [];
      else if (At(n.value, ":autofill") || At(n.value, ":-webkit-autofill")) {
        const E = r.value.find((F) => F.title === B);
        E && U(E);
      } else n.value && (n.value.value = "");
    }
    return Q(V, () => {
      if (!e.hideSelected && V.value && c.value.length) {
        const B = m.value.findIndex((E) => c.value.some((F) => (e.valueComparator || et)(F.value, E.value)));
        ze && !e.noAutoScroll && window.requestAnimationFrame(() => {
          var E;
          B >= 0 && ((E = i.value) == null || E.scrollToIndex(B));
        });
      }
    }), Q(() => e.items, (B, E) => {
      V.value || g.value && e.hideNoData && !E.length && B.length && (V.value = !0);
    }), ie(() => {
      const B = !!(e.chips || t.chip), E = !!(!e.hideNoData || m.value.length || t["prepend-item"] || t["append-item"] || t["no-data"]), F = c.value.length > 0, W = mt.filterProps(e), ve = F || !g.value && e.label && !e.persistentPlaceholder ? void 0 : e.placeholder;
      return h(mt, R({
        ref: n
      }, W, {
        modelValue: c.value.map((te) => te.props.title).join(", "),
        "onUpdate:modelValue": ce,
        focused: g.value,
        "onUpdate:focused": (te) => g.value = te,
        validationValue: c.externalValue,
        counterValue: d.value,
        dirty: F,
        class: ["v-select", {
          "v-select--active-menu": V.value,
          "v-select--chips": !!e.chips,
          [`v-select--${e.multiple ? "multiple" : "single"}`]: !0,
          "v-select--selected": c.value.length,
          "v-select--selection-slot": !!t.selection
        }, e.class],
        style: e.style,
        inputmode: "none",
        placeholder: ve,
        "onClick:clear": T,
        "onMousedown:control": $,
        onBlur: j,
        onKeydown: M,
        "aria-label": a(x.value),
        title: a(x.value)
      }), {
        ...t,
        default: () => C(X, null, [h(kl, R({
          ref: o,
          modelValue: V.value,
          "onUpdate:modelValue": (te) => V.value = te,
          activator: "parent",
          contentClass: "v-select__content",
          disabled: A.value,
          eager: e.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: e.transition,
          onAfterEnter: Y,
          onAfterLeave: ae
        }, P.value), {
          default: () => [E && h(ct, R({
            ref: b,
            selected: f.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: (te) => te.preventDefault(),
            onKeydown: D,
            onFocusin: le,
            tabindex: "-1",
            "aria-live": "polite",
            "aria-label": `${e.label}-list`,
            color: e.itemColor ?? e.color
          }, _, e.listProps), {
            default: () => {
              var te, ue, Z;
              return [(te = t["prepend-item"]) == null ? void 0 : te.call(t), !m.value.length && !e.hideNoData && (((ue = t["no-data"]) == null ? void 0 : ue.call(t)) ?? h(Ge, {
                key: "no-data",
                title: a(e.noDataText)
              }, null)), h(bo, {
                ref: i,
                renderless: !0,
                items: m.value,
                itemKey: "value"
              }, {
                default: (se) => {
                  var Pe, Oe, De;
                  let {
                    item: de,
                    index: N,
                    itemRef: J
                  } = se;
                  const fe = rs(de.props), be = R(de.props, {
                    ref: J,
                    key: de.value,
                    onClick: () => U(de, null)
                  });
                  return de.type === "divider" ? ((Pe = t.divider) == null ? void 0 : Pe.call(t, {
                    props: de.raw,
                    index: N
                  })) ?? h(Ot, R(de.props, {
                    key: `divider-${N}`
                  }), null) : de.type === "subheader" ? ((Oe = t.subheader) == null ? void 0 : Oe.call(t, {
                    props: de.raw,
                    index: N
                  })) ?? h(tl, R(de.props, {
                    key: `subheader-${N}`
                  }), null) : ((De = t.item) == null ? void 0 : De.call(t, {
                    item: de,
                    index: N,
                    props: be
                  })) ?? h(Ge, R(be, {
                    role: "option"
                  }), {
                    prepend: (xe) => {
                      let {
                        isSelected: Ae
                      } = xe;
                      return C(X, null, [e.multiple && !e.hideSelected ? h(St, {
                        key: de.value,
                        modelValue: Ae,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, fe.prependAvatar && h(xt, {
                        image: fe.prependAvatar
                      }, null), fe.prependIcon && h(Ve, {
                        icon: fe.prependIcon
                      }, null)]);
                    }
                  });
                }
              }), (Z = t["append-item"]) == null ? void 0 : Z.call(t)];
            }
          })]
        }), c.value.map((te, ue) => {
          function Z(J) {
            J.stopPropagation(), J.preventDefault(), U(te, !1);
          }
          const se = {
            "onClick:close": Z,
            onKeydown(J) {
              J.key !== "Enter" && J.key !== " " || (J.preventDefault(), J.stopPropagation(), Z(J));
            },
            onMousedown(J) {
              J.preventDefault(), J.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, de = B ? !!t.chip : !!t.selection, N = de ? $n(B ? t.chip({
            item: te,
            index: ue,
            props: se
          }) : t.selection({
            item: te,
            index: ue
          })) : void 0;
          if (!(de && !N))
            return C("div", {
              key: te.value,
              class: "v-select__selection"
            }, [B ? t.chip ? h(Me, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: e.closableChips,
                  size: "small",
                  text: te.title
                }
              }
            }, {
              default: () => [N]
            }) : h(Sl, R({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: te.title,
              disabled: te.props.disabled
            }, se), null) : N ?? C("span", {
              class: "v-select__selection-text"
            }, [te.title, e.multiple && ue < c.value.length - 1 && C("span", {
              class: "v-select__selection-comma"
            }, [Ie(",")])])]);
        })]),
        "append-inner": function() {
          var se, de;
          for (var te = arguments.length, ue = new Array(te), Z = 0; Z < te; Z++)
            ue[Z] = arguments[Z];
          return C(X, null, [(se = t["append-inner"]) == null ? void 0 : se.call(t, ...ue), e.menuIcon ? h(Ve, {
            class: "v-select__menu-icon",
            color: (de = n.value) == null ? void 0 : de.fieldIconColor,
            icon: e.menuIcon
          }, null) : void 0]);
        }
      });
    }), dt({
      isFocused: g,
      menu: V,
      select: U
    }, n);
  }
}), gu = (e, l, t) => {
  if (e == null || l == null) return -1;
  if (!l.length) return 0;
  e = e.toString().toLocaleLowerCase(), l = l.toString().toLocaleLowerCase();
  const a = [];
  let n = e.indexOf(l);
  for (; ~n; )
    a.push([n, n + l.length]), n = e.indexOf(l, n + l.length);
  return a.length ? a : -1;
};
function Da(e, l) {
  if (!(e == null || typeof e == "boolean" || e === -1))
    return typeof e == "number" ? [[e, e + l.length]] : Array.isArray(e[0]) ? e : [e];
}
const xo = K({
  customFilter: Function,
  customKeyFilter: Object,
  filterKeys: [Array, String],
  filterMode: {
    type: String,
    default: "intersection"
  },
  noFilter: Boolean
}, "filter");
function yu(e, l, t) {
  var r;
  const a = [], n = (t == null ? void 0 : t.default) ?? gu, o = t != null && t.filterKeys ? He(t.filterKeys) : !1, i = Object.keys((t == null ? void 0 : t.customKeyFilter) ?? {}).length;
  if (!(e != null && e.length)) return a;
  e: for (let s = 0; s < e.length; s++) {
    const [u, c = u] = He(e[s]), d = {}, v = {};
    let f = -1;
    if ((l || i > 0) && !(t != null && t.noFilter)) {
      if (typeof u == "object") {
        if (u.type === "divider" || u.type === "subheader")
          continue;
        const y = o || Object.keys(c);
        for (const p of y) {
          const m = Ct(c, p), A = (r = t == null ? void 0 : t.customKeyFilter) == null ? void 0 : r[p];
          if (f = A ? A(m, l, u) : n(m, l, u), f !== -1 && f !== !1)
            A ? d[p] = Da(f, l) : v[p] = Da(f, l);
          else if ((t == null ? void 0 : t.filterMode) === "every")
            continue e;
        }
      } else
        f = n(u, l, u), f !== -1 && f !== !1 && (v.title = Da(f, l));
      const g = Object.keys(v).length, k = Object.keys(d).length;
      if (!g && !k || (t == null ? void 0 : t.filterMode) === "union" && k !== i && !g || (t == null ? void 0 : t.filterMode) === "intersection" && (k !== i || !g)) continue;
    }
    a.push({
      index: s,
      matches: {
        ...v,
        ...d
      }
    });
  }
  return a;
}
function So(e, l, t, a) {
  const n = ee([]), o = ee(/* @__PURE__ */ new Map()), i = I(() => a != null && a.transform ? w(l).map((s) => [s, a.transform(s)]) : w(l));
  tt(() => {
    const s = typeof t == "function" ? t() : w(t), u = typeof s != "string" && typeof s != "number" ? "" : String(s), c = yu(i.value, u, {
      customKeyFilter: {
        ...e.customKeyFilter,
        ...w(a == null ? void 0 : a.customKeyFilter)
      },
      default: e.customFilter,
      filterKeys: e.filterKeys,
      filterMode: e.filterMode,
      noFilter: e.noFilter
    }), d = w(l), v = [], f = /* @__PURE__ */ new Map();
    c.forEach((g) => {
      let {
        index: k,
        matches: y
      } = g;
      const p = d[k];
      v.push(p), f.set(p.value, y);
    }), n.value = v, o.value = f;
  });
  function r(s) {
    return o.value.get(s.value);
  }
  return {
    filteredItems: n,
    filteredMatches: o,
    getMatches: r
  };
}
function hu(e, l, t) {
  return t == null || !t.length ? l : t.map((a, n) => {
    const o = n === 0 ? 0 : t[n - 1][1], i = [C("span", {
      class: me(`${e}__unmask`)
    }, [l.slice(o, a[0])]), C("span", {
      class: me(`${e}__mask`)
    }, [l.slice(a[0], a[1])])];
    return n === t.length - 1 && i.push(C("span", {
      class: me(`${e}__unmask`)
    }, [l.slice(a[1])])), C(X, null, [i]);
  });
}
const bu = K({
  autoSelectFirst: {
    type: [Boolean, String]
  },
  clearOnSelect: Boolean,
  search: String,
  ...xo({
    filterKeys: ["title"]
  }),
  ...wo(),
  ...st(Cl({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...Kt({
    transition: !1
  })
}, "VAutocomplete"), pu = ne()({
  name: "VAutocomplete",
  props: bu(),
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
    } = rt(), n = q(), o = ee(!1), i = ee(!0), r = ee(!1), s = q(), u = q(), c = ee(-1), {
      items: d,
      transformIn: v,
      transformOut: f
    } = Vn(e), {
      textColorClasses: g,
      textColorStyles: k
    } = Yt(() => {
      var N;
      return (N = n.value) == null ? void 0 : N.color;
    }), y = we(e, "search", ""), p = we(e, "modelValue", [], (N) => v(N === null ? [null] : He(N)), (N) => {
      const J = f(N);
      return e.multiple ? J : J[0] ?? null;
    }), m = I(() => typeof e.counterValue == "function" ? e.counterValue(p.value) : typeof e.counterValue == "number" ? e.counterValue : p.value.length), A = xl(e), {
      filteredItems: S,
      getMatches: V
    } = So(e, d, () => i.value ? "" : y.value), x = I(() => e.hideSelected ? S.value.filter((N) => !p.value.some((J) => J.value === N.value)) : S.value), P = I(() => !!(e.chips || t.chip)), b = I(() => P.value || !!t.selection), _ = I(() => p.value.map((N) => N.props.value)), T = I(() => {
      var J;
      return (e.autoSelectFirst === !0 || e.autoSelectFirst === "exact" && y.value === ((J = x.value[0]) == null ? void 0 : J.title)) && x.value.length > 0 && !i.value && !r.value;
    }), $ = I(() => e.hideNoData && !x.value.length || A.isReadonly.value || A.isDisabled.value), D = we(e, "menu"), M = I({
      get: () => D.value,
      set: (N) => {
        var J;
        D.value && !N && ((J = s.value) != null && J.ΨopenChildren.size) || N && $.value || (D.value = N);
      }
    }), U = I(() => M.value ? e.closeText : e.openText), j = q(), Y = po(j, n);
    function ae(N) {
      e.openOnClear && (M.value = !0), y.value = "";
    }
    function le() {
      $.value || (M.value = !0);
    }
    function ce(N) {
      $.value || (o.value && (N.preventDefault(), N.stopPropagation()), M.value = !M.value);
    }
    function B(N) {
      var J;
      (oa(N) || N.key === "Backspace") && ((J = n.value) == null || J.focus());
    }
    function E(N) {
      var be, Pe, Oe, De, xe;
      if (A.isReadonly.value) return;
      const J = (be = n.value) == null ? void 0 : be.selectionStart, fe = p.value.length;
      if (["Enter", "ArrowDown", "ArrowUp"].includes(N.key) && N.preventDefault(), ["Enter", "ArrowDown"].includes(N.key) && (M.value = !0), ["Escape"].includes(N.key) && (M.value = !1), T.value && ["Enter", "Tab"].includes(N.key) && !p.value.some((Ae) => {
        let {
          value: Fe
        } = Ae;
        return Fe === x.value[0].value;
      }) && de(x.value[0]), N.key === "ArrowDown" && T.value && ((Pe = j.value) == null || Pe.focus("next")), ["Backspace", "Delete"].includes(N.key)) {
        if (!e.multiple && b.value && p.value.length > 0 && !y.value) return de(p.value[0], !1);
        if (~c.value) {
          N.preventDefault();
          const Ae = c.value;
          de(p.value[c.value], !1), c.value = Ae >= fe - 1 ? fe - 2 : Ae;
        } else N.key === "Backspace" && !y.value && (c.value = fe - 1);
        return;
      }
      if (e.multiple)
        if (N.key === "ArrowLeft") {
          if (c.value < 0 && J && J > 0) return;
          const Ae = c.value > -1 ? c.value - 1 : fe - 1;
          if (p.value[Ae])
            c.value = Ae;
          else {
            const Fe = ((Oe = y.value) == null ? void 0 : Oe.length) ?? null;
            c.value = -1, (De = n.value) == null || De.setSelectionRange(Fe, Fe);
          }
        } else if (N.key === "ArrowRight") {
          if (c.value < 0) return;
          const Ae = c.value + 1;
          p.value[Ae] ? c.value = Ae : (c.value = -1, (xe = n.value) == null || xe.setSelectionRange(0, 0));
        } else ~c.value && oa(N) && (c.value = -1);
    }
    function F(N) {
      if (At(n.value, ":autofill") || At(n.value, ":-webkit-autofill")) {
        const J = d.value.find((fe) => fe.title === N.target.value);
        J && de(J);
      }
    }
    function W() {
      var N;
      e.eager && ((N = u.value) == null || N.calculateVisibleItems());
    }
    function ve() {
      var N;
      o.value && (i.value = !0, (N = n.value) == null || N.focus());
    }
    function te(N) {
      o.value = !0, setTimeout(() => {
        r.value = !0;
      });
    }
    function ue(N) {
      r.value = !1;
    }
    function Z(N) {
      (N == null || N === "" && !e.multiple && !b.value) && (p.value = []);
    }
    const se = ee(!1);
    function de(N) {
      let J = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!(!N || N.props.disabled))
        if (e.multiple) {
          const fe = p.value.findIndex((Pe) => (e.valueComparator || et)(Pe.value, N.value)), be = J ?? !~fe;
          if (~fe) {
            const Pe = be ? [...p.value, N] : [...p.value];
            Pe.splice(fe, 1), p.value = Pe;
          } else be && (p.value = [...p.value, N]);
          e.clearOnSelect && (y.value = "");
        } else {
          const fe = J !== !1;
          p.value = fe ? [N] : [], y.value = fe && !b.value ? N.title : "", Ee(() => {
            M.value = !1, i.value = !0;
          });
        }
    }
    return Q(o, (N, J) => {
      var fe;
      N !== J && (N ? (se.value = !0, y.value = e.multiple || b.value ? "" : String(((fe = p.value.at(-1)) == null ? void 0 : fe.props.title) ?? ""), i.value = !0, Ee(() => se.value = !1)) : (!e.multiple && y.value == null && (p.value = []), M.value = !1, (e.multiple || b.value) && (y.value = ""), c.value = -1));
    }), Q(y, (N) => {
      !o.value || se.value || (N && (M.value = !0), i.value = !N);
    }), Q(M, () => {
      if (!e.hideSelected && M.value && p.value.length) {
        const N = x.value.findIndex((J) => p.value.some((fe) => J.value === fe.value));
        ze && window.requestAnimationFrame(() => {
          var J;
          N >= 0 && ((J = u.value) == null || J.scrollToIndex(N));
        });
      }
    }), Q(() => e.items, (N, J) => {
      M.value || o.value && !J.length && N.length && (M.value = !0);
    }), ie(() => {
      const N = !!(!e.hideNoData || x.value.length || t["prepend-item"] || t["append-item"] || t["no-data"]), J = p.value.length > 0, fe = mt.filterProps(e);
      return h(mt, R({
        ref: n
      }, fe, {
        modelValue: y.value,
        "onUpdate:modelValue": [(be) => y.value = be, Z],
        focused: o.value,
        "onUpdate:focused": (be) => o.value = be,
        validationValue: p.externalValue,
        counterValue: m.value,
        dirty: J,
        onChange: F,
        class: ["v-autocomplete", `v-autocomplete--${e.multiple ? "multiple" : "single"}`, {
          "v-autocomplete--active-menu": M.value,
          "v-autocomplete--chips": !!e.chips,
          "v-autocomplete--selection-slot": !!b.value,
          "v-autocomplete--selecting-index": c.value > -1
        }, e.class],
        style: e.style,
        readonly: A.isReadonly.value,
        placeholder: J ? void 0 : e.placeholder,
        "onClick:clear": ae,
        "onMousedown:control": le,
        onKeydown: E
      }), {
        ...t,
        default: () => C(X, null, [h(kl, R({
          ref: s,
          modelValue: M.value,
          "onUpdate:modelValue": (be) => M.value = be,
          activator: "parent",
          contentClass: "v-autocomplete__content",
          disabled: $.value,
          eager: e.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: e.transition,
          onAfterEnter: W,
          onAfterLeave: ve
        }, e.menuProps), {
          default: () => [N && h(ct, R({
            ref: j,
            filterable: !0,
            selected: _.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: (be) => be.preventDefault(),
            onKeydown: B,
            onFocusin: te,
            onFocusout: ue,
            tabindex: "-1",
            "aria-live": "polite",
            color: e.itemColor ?? e.color
          }, Y, e.listProps), {
            default: () => {
              var be, Pe, Oe;
              return [(be = t["prepend-item"]) == null ? void 0 : be.call(t), !x.value.length && !e.hideNoData && (((Pe = t["no-data"]) == null ? void 0 : Pe.call(t)) ?? h(Ge, {
                key: "no-data",
                title: a(e.noDataText)
              }, null)), h(bo, {
                ref: u,
                renderless: !0,
                items: x.value,
                itemKey: "value"
              }, {
                default: (De) => {
                  var Bl, $l, El;
                  let {
                    item: xe,
                    index: Ae,
                    itemRef: Fe
                  } = De;
                  const _l = R(xe.props, {
                    ref: Fe,
                    key: xe.value,
                    active: T.value && Ae === 0 ? !0 : void 0,
                    onClick: () => de(xe, null)
                  });
                  return xe.type === "divider" ? ((Bl = t.divider) == null ? void 0 : Bl.call(t, {
                    props: xe.raw,
                    index: Ae
                  })) ?? h(Ot, R(xe.props, {
                    key: `divider-${Ae}`
                  }), null) : xe.type === "subheader" ? (($l = t.subheader) == null ? void 0 : $l.call(t, {
                    props: xe.raw,
                    index: Ae
                  })) ?? h(tl, R(xe.props, {
                    key: `subheader-${Ae}`
                  }), null) : ((El = t.item) == null ? void 0 : El.call(t, {
                    item: xe,
                    index: Ae,
                    props: _l
                  })) ?? h(Ge, R(_l, {
                    role: "option"
                  }), {
                    prepend: (Zt) => {
                      let {
                        isSelected: gi
                      } = Zt;
                      return C(X, null, [e.multiple && !e.hideSelected ? h(St, {
                        key: xe.value,
                        modelValue: gi,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, xe.props.prependAvatar && h(xt, {
                        image: xe.props.prependAvatar
                      }, null), xe.props.prependIcon && h(Ve, {
                        icon: xe.props.prependIcon
                      }, null)]);
                    },
                    title: () => {
                      var Zt;
                      return i.value ? xe.title : hu("v-autocomplete", xe.title, (Zt = V(xe)) == null ? void 0 : Zt.title);
                    }
                  });
                }
              }), (Oe = t["append-item"]) == null ? void 0 : Oe.call(t)];
            }
          })]
        }), p.value.map((be, Pe) => {
          function Oe(Fe) {
            Fe.stopPropagation(), Fe.preventDefault(), de(be, !1);
          }
          const De = {
            "onClick:close": Oe,
            onKeydown(Fe) {
              Fe.key !== "Enter" && Fe.key !== " " || (Fe.preventDefault(), Fe.stopPropagation(), Oe(Fe));
            },
            onMousedown(Fe) {
              Fe.preventDefault(), Fe.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, xe = P.value ? !!t.chip : !!t.selection, Ae = xe ? $n(P.value ? t.chip({
            item: be,
            index: Pe,
            props: De
          }) : t.selection({
            item: be,
            index: Pe
          })) : void 0;
          if (!(xe && !Ae))
            return C("div", {
              key: be.value,
              class: me(["v-autocomplete__selection", Pe === c.value && ["v-autocomplete__selection--selected", g.value]]),
              style: Ce(Pe === c.value ? k.value : {})
            }, [P.value ? t.chip ? h(Me, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: e.closableChips,
                  size: "small",
                  text: be.title
                }
              }
            }, {
              default: () => [Ae]
            }) : h(Sl, R({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: be.title,
              disabled: be.props.disabled
            }, De), null) : Ae ?? C("span", {
              class: "v-autocomplete__selection-text"
            }, [be.title, e.multiple && Pe < p.value.length - 1 && C("span", {
              class: "v-autocomplete__selection-comma"
            }, [Ie(",")])])]);
        })]),
        "append-inner": function() {
          var De, xe;
          for (var be = arguments.length, Pe = new Array(be), Oe = 0; Oe < be; Oe++)
            Pe[Oe] = arguments[Oe];
          return C(X, null, [(De = t["append-inner"]) == null ? void 0 : De.call(t, ...Pe), e.menuIcon ? h(Ve, {
            class: "v-autocomplete__menu-icon",
            color: (xe = n.value) == null ? void 0 : xe.fieldIconColor,
            icon: e.menuIcon,
            onMousedown: ce,
            onClick: us,
            "aria-label": a(U.value),
            title: a(U.value),
            tabindex: "-1"
          }, null) : void 0]);
        }
      });
    }), dt({
      isFocused: o,
      isPristine: i,
      menu: M,
      search: y,
      filteredItems: S,
      select: de
    }, n);
  }
}), wu = ["name", "value"], xu = /* @__PURE__ */ Le({
  __name: "OxAutocomplete",
  props: /* @__PURE__ */ ha({
    repo: {},
    lookup: { default: "search" },
    name: {},
    filters: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e, { expose: l }) {
    const t = nt(), a = ba(e, "modelValue"), n = q(""), o = e, i = ht(), r = ge("repos"), { state: s, query: u, fetch: c } = Ei(o.repo, r, { save: !1 }), d = Qe([]), v = q([]);
    async function f(m) {
      const A = m && g(m);
      if (A != null && A.length) {
        const S = await c({ id: A });
        d.splice(0, 0, ...S.entities);
      }
      k(m);
    }
    function g(m) {
      if (!Array.isArray(m))
        return d.findIndex((S) => S.id == m) == -1 ? [m] : null;
      const A = new Set(d.map((S) => S.id));
      return m.filter((S) => !A.has(S));
    }
    function k(m) {
      Array.isArray(m) ? v.value = d.filter((A) => m.includes(A.id)) : m ? v.value = [d.find((A) => A.id == m)] : v.value = [];
    }
    let y = null;
    const p = Wa.debounce(async ({ reset: m = !1 } = {}) => {
      if (s.isProcessing)
        return;
      const A = n.value != "<empty string>" && n.value || "";
      if (!m && A == y)
        return;
      y = A;
      const S = { ...o.filters, page_size: 20 };
      S[o.lookup] = A;
      let V = await c({ params: S });
      const x = v.value ? Wa.unionBy(V.entities, v.value, (P) => P.id) : V.entities;
      d.splice(0, d.length, ...x), m || (n.value = A);
    }, 500);
    return We(async () => {
      await p(), a.value && await f(a.value);
    }), Q(() => o.filters, Oi(() => p({ reset: !0 }))), Q(n, (m) => {
      m != "<empty string>" && m != y && p({ q: m });
    }), Q(a, (m, A) => {
      m != A && k(m);
    }), l({ value: a, selected: v, load: p, items: d }), (m, A) => (L(), ye(X, null, [
      o.name ? (L(), ye("input", {
        key: 0,
        type: "hidden",
        name: o.name,
        value: a.value
      }, null, 8, wu)) : re("", !0),
      h(w(pu), R(w(i), {
        items: d,
        loading: w(s).isProcessing,
        modelValue: a.value,
        "onUpdate:modelValue": A[0] || (A[0] = (S) => a.value = S),
        search: n.value,
        "onUpdate:search": A[1] || (A[1] = (S) => n.value = S)
      }), ut({ _: 2 }, [
        _e(w(t), (S, V) => ({
          name: V,
          fn: O((x) => [
            z(m.$slots, V, Be($e(x)))
          ])
        }))
      ]), 1040, ["items", "loading", "modelValue", "search"])
    ], 64));
  }
}), Su = {
  props: {
    src: String,
    is: String
  },
  setup(e) {
    const l = ee(null), t = I(() => {
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
      l.value = Fi(e.src, t.value);
    }
    return Q(() => e.src, a), a(), () => Vi(l.value, e);
  }
}, ku = K({
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
  ...Vl()
}, "VTextarea"), Vu = ne()({
  name: "VTextarea",
  directives: {
    vIntersect: na
  },
  inheritAttrs: !1,
  props: ku(),
  emits: {
    "click:control": (e) => !0,
    "mousedown:control": (e) => !0,
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0,
    "update:rows": (e) => !0
  },
  setup(e, l) {
    let {
      attrs: t,
      emit: a,
      slots: n
    } = l;
    const o = we(e, "modelValue"), {
      isFocused: i,
      focus: r,
      blur: s
    } = Va(e), {
      onIntersect: u
    } = ho(e), c = I(() => typeof e.counterValue == "function" ? e.counterValue(o.value) : (o.value || "").toString().length), d = I(() => {
      if (t.maxlength) return t.maxlength;
      if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string"))
        return e.counter;
    }), v = q(), f = q(), g = ee(""), k = q(), y = I(() => e.persistentPlaceholder || i.value || e.active);
    function p() {
      var $;
      k.value !== document.activeElement && (($ = k.value) == null || $.focus()), i.value || r();
    }
    function m($) {
      p(), a("click:control", $);
    }
    function A($) {
      a("mousedown:control", $);
    }
    function S($) {
      $.stopPropagation(), p(), Ee(() => {
        o.value = "", vl(e["onClick:clear"], $);
      });
    }
    function V($) {
      var M;
      const D = $.target;
      if (o.value = D.value, (M = e.modelModifiers) != null && M.trim) {
        const U = [D.selectionStart, D.selectionEnd];
        Ee(() => {
          D.selectionStart = U[0], D.selectionEnd = U[1];
        });
      }
    }
    const x = q(), P = q(Number(e.rows)), b = I(() => ["plain", "underlined"].includes(e.variant));
    tt(() => {
      e.autoGrow || (P.value = Number(e.rows));
    });
    function _() {
      e.autoGrow && Ee(() => {
        if (!x.value || !f.value) return;
        const $ = getComputedStyle(x.value), D = getComputedStyle(f.value.$el), M = parseFloat($.getPropertyValue("--v-field-padding-top")) + parseFloat($.getPropertyValue("--v-input-padding-top")) + parseFloat($.getPropertyValue("--v-field-padding-bottom")), U = x.value.scrollHeight, j = parseFloat($.lineHeight), Y = Math.max(parseFloat(e.rows) * j + M, parseFloat(D.getPropertyValue("--v-input-control-height"))), ae = parseFloat(e.maxRows) * j + M || 1 / 0, le = Je(U ?? 0, Y, ae);
        P.value = Math.floor((le - M) / j), g.value = he(le);
      });
    }
    We(_), Q(o, _), Q(() => e.rows, _), Q(() => e.maxRows, _), Q(() => e.density, _), Q(P, ($) => {
      a("update:rows", $);
    });
    let T;
    return Q(x, ($) => {
      $ ? (T = new ResizeObserver(_), T.observe(x.value)) : T == null || T.disconnect();
    }), yt(() => {
      T == null || T.disconnect();
    }), ie(() => {
      const $ = !!(n.counter || e.counter || e.counterValue), D = !!($ || n.details), [M, U] = ka(t), {
        modelValue: j,
        ...Y
      } = Tt.filterProps(e), ae = {
        ...da.filterProps(e),
        "onClick:clear": S
      };
      return h(Tt, R({
        ref: v,
        modelValue: o.value,
        "onUpdate:modelValue": (le) => o.value = le,
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
        ...n,
        default: (le) => {
          let {
            id: ce,
            isDisabled: B,
            isDirty: E,
            isReadonly: F,
            isValid: W,
            hasDetails: ve
          } = le;
          return h(da, R({
            ref: f,
            style: {
              "--v-textarea-control-height": g.value
            },
            onClick: m,
            onMousedown: A,
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"]
          }, ae, {
            id: ce.value,
            active: y.value || E.value,
            centerAffix: P.value === 1 && !b.value,
            dirty: E.value || e.dirty,
            disabled: B.value,
            focused: i.value,
            details: ve.value,
            error: W.value === !1
          }), {
            ...n,
            default: (te) => {
              let {
                props: {
                  class: ue,
                  ...Z
                }
              } = te;
              return C(X, null, [e.prefix && C("span", {
                class: "v-text-field__prefix"
              }, [e.prefix]), Ye(C("textarea", R({
                ref: k,
                class: ue,
                value: o.value,
                onInput: V,
                autofocus: e.autofocus,
                readonly: F.value,
                disabled: B.value,
                placeholder: e.placeholder,
                rows: e.rows,
                name: e.name,
                onFocus: p,
                onBlur: s
              }, Z, U), null), [[na, {
                handler: u
              }, null, {
                once: !0
              }]]), e.autoGrow && Ye(C("textarea", {
                class: me([ue, "v-textarea__sizer"]),
                id: `${Z.id}-sizer`,
                "onUpdate:modelValue": (se) => o.value = se,
                ref: x,
                readonly: !0,
                "aria-hidden": "true"
              }, null), [[Ci, o.value]]), e.suffix && C("span", {
                class: "v-text-field__suffix"
              }, [e.suffix])]);
            }
          });
        },
        details: D ? (le) => {
          var ce;
          return C(X, null, [(ce = n.details) == null ? void 0 : ce.call(n, le), $ && C(X, null, [C("span", null, null), h(yo, {
            active: e.persistentCounter || i.value,
            value: c.value,
            max: d.value,
            disabled: e.disabled
          }, n.counter)])]);
        } : void 0
      });
    }), dt({}, v, f, k);
  }
}), Cu = /* @__PURE__ */ Le({
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
    /**
     * Field rules as provided to Vuetify field inputs.
     */
    rules: Array
  },
  emits: ["update:modelValue"],
  setup(e, { emit: l }) {
    const t = Pi(() => import("./OxAutocomplete-RRyWhOH0.js")), a = l, n = ht(), o = nt(), i = e, r = I(() => {
      const s = `fields.${i.name}.help`, u = {
        name: i.name,
        label: oe(`fields.${i.name}`),
        "aria-label": oe(`fields.${i.name}`),
        "error-messages": i.editor.error(i.name),
        rules: i.rules || [],
        "onUpdate:modelValue": (...d) => a("update:modelValue", ...d),
        ...n
      }, c = oe(s);
      return c != s && (u.hint = c, u["aria-description"] = c), i.required && u.rules.push(Li.required), u;
    });
    return (s, u) => z(s.$slots, "default", {
      props: r.value,
      editor: i.editor
    }, () => [
      i.type == "select" ? (L(), G(Pl, R({ key: 0 }, r.value, {
        modelValue: i.editor.value[i.name],
        "onUpdate:modelValue": u[0] || (u[0] = (c) => i.editor.value[i.name] = c)
      }), null, 16, ["modelValue"])) : i.type == "textarea" ? (L(), G(Vu, R({ key: 1 }, r.value, {
        modelValue: i.editor.value[i.name],
        "onUpdate:modelValue": u[1] || (u[1] = (c) => i.editor.value[i.name] = c)
      }), null, 16, ["modelValue"])) : i.type == "checkbox" ? (L(), G(Qr, R({ key: 2 }, r.value, {
        modelValue: i.editor.value[i.name],
        "onUpdate:modelValue": u[2] || (u[2] = (c) => i.editor.value[i.name] = c)
      }), null, 16, ["modelValue"])) : i.type == "autocomplete" ? (L(), G(w(t), R({ key: 3 }, r.value, {
        modelValue: i.editor.value[i.name],
        "onUpdate:modelValue": u[3] || (u[3] = (c) => i.editor.value[i.name] = c)
      }), ut({ _: 2 }, [
        _e(w(o), (c, d) => ({
          name: d,
          fn: O((v) => [
            z(s.$slots, d, Be($e(v)))
          ])
        }))
      ]), 1040, ["modelValue"])) : (L(), G(mt, R({ key: 4 }, r.value, {
        type: i.type,
        modelValue: i.editor.value[i.name],
        "onUpdate:modelValue": u[4] || (u[4] = (c) => i.editor.value[i.name] = c)
      }), null, 16, ["type", "modelValue"]))
    ]);
  }
}), Pu = /* @__PURE__ */ Le({
  __name: "OxModelList",
  props: /* @__PURE__ */ ha({
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
  setup(e, { expose: l }) {
    const t = ba(e, "modelValue");
    nt();
    const a = e, n = ht(), { list: o, items: i } = Mi({
      query: new Ri(a.repo)
    });
    function r(s) {
      o.remove(s), t.value = [...o.ids];
    }
    return We(() => t.value.length && o.load({ id: t.value })), Q(t, (s) => s.length && Di(s, o.ids, (u) => u.length && o.load({ id: u }))), Q(() => o.ids, (s) => t.value = [...s]), l({ list: o, items: i }), (s, u) => z(s.$slots, "default", {
      list: w(o),
      items: w(i)
    }, () => [
      h(ct, Be($e(w(n))), {
        default: O(() => [
          z(s.$slots, "list", {
            list: w(o),
            items: w(i)
          }, () => [
            (L(!0), ye(X, null, _e(w(i), (c) => (L(), G(Ge, {
              key: c.id
            }, {
              append: O(() => [
                z(s.$slots, "item.actions", {
                  list: w(o),
                  item: c
                }),
                a.editable ? (L(), G(pe, {
                  key: 0,
                  type: "button",
                  class: "ml-2",
                  size: "small",
                  color: "error",
                  onClick: Te((d) => r(c.id), ["stop", "prevent"]),
                  "aria-label": w(oe)("actions.remove"),
                  title: w(oe)("actions.remove"),
                  icon: "mdi-delete"
                }, null, 8, ["onClick", "aria-label", "title"])) : re("", !0)
              ]),
              default: O(() => [
                z(s.$slots, "item", {
                  list: w(o),
                  item: c
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
}), ko = {
  __name: "OxListFilters",
  props: {
    search: String
  },
  setup(e, { expose: l }) {
    const t = ge("list"), a = e, n = I(() => {
      const r = t.filters;
      return r && Object.entries(r).some(
        ([s, u]) => !s.startsWith("page") && !s.startsWith("ordering") && !!u
      );
    }), o = I(() => n.value ? "mdi-filter-check" : "mdi-filter-outline");
    function i() {
      t.filters = {}, t.load();
    }
    return l({ icon: o, hasFilters: n, reset: i }), (r, s) => (L(), ye("form", {
      onSubmit: s[2] || (s[2] = Te((u) => w(t).load(), ["prevent"])),
      class: "ox-list-filters width-full"
    }, [
      h(Ua, {
        dense: "",
        color: "transparent"
      }, {
        default: O(() => [
          h(Kn, {
            icon: o.value,
            readonly: ""
          }, null, 8, ["icon"]),
          a.search && w(t).filters ? (L(), G(mt, {
            key: 0,
            label: w(oe)("filters.search"),
            density: "compact",
            class: "ml-2",
            modelValue: w(t).filters[a.search],
            "onUpdate:modelValue": s[0] || (s[0] = (u) => w(t).filters[a.search] = u),
            "hide-details": ""
          }, null, 8, ["label", "modelValue"])) : re("", !0),
          z(r.$slots, "default", {
            list: w(t),
            filters: w(t).filters
          }),
          h(pe, {
            onClick: s[1] || (s[1] = Te((u) => w(t).load(), ["stop"])),
            class: "ml-2",
            icon: "mdi-check",
            "aria-label": r.$t("filters.apply"),
            title: w(oe)("filters.apply")
          }, null, 8, ["aria-label", "title"]),
          n.value ? (L(), G(pe, {
            key: 1,
            onClick: Te(i, ["stop"]),
            icon: "mdi-backspace",
            "aria-label": w(oe)("filters.reset"),
            title: w(oe)("filters.reset")
          }, null, 8, ["aria-label", "title"])) : re("", !0)
        ]),
        _: 3
      })
    ], 32));
  }
}, on = /* @__PURE__ */ Le({
  __name: "OxFormListItem",
  props: {
    /** Item being displayed. **/
    item: Object,
    /** Display remove button. **/
    remove: Boolean
  },
  emits: "remove",
  setup(e, { emit: l }) {
    const t = e, a = l, n = ht();
    return (o, i) => (L(), G(Ge, Be($e(w(n))), {
      append: O(() => [
        C("div", {
          onClick: i[1] || (i[1] = Te(() => {
          }, ["stop"]))
        }, [
          z(o.$slots, "actions", { item: e.item }),
          t.remove ? (L(), G(pe, {
            key: 0,
            type: "button",
            class: "ml-2",
            size: "small",
            onClick: i[0] || (i[0] = Te((r) => a("remove", o.$events), ["stop", "prevent"])),
            color: "error",
            "aria-label": w(oe)("actions.remove"),
            title: w(oe)("actions.remove"),
            icon: "mdi-delete"
          }, null, 8, ["aria-label", "title"])) : re("", !0)
        ])
      ]),
      default: O(() => [
        h(qi, null, {
          default: O(() => [
            z(o.$slots, "default", { item: e.item })
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 16));
  }
}), Iu = K({
  ...ke(),
  ...jr()
}, "VForm"), Qa = ne()({
  name: "VForm",
  props: Iu(),
  emits: {
    "update:modelValue": (e) => !0,
    submit: (e) => !0
  },
  setup(e, l) {
    let {
      slots: t,
      emit: a
    } = l;
    const n = Kr(e), o = q();
    function i(s) {
      s.preventDefault(), n.reset();
    }
    function r(s) {
      const u = s, c = n.validate();
      u.then = c.then.bind(c), u.catch = c.catch.bind(c), u.finally = c.finally.bind(c), a("submit", u), u.defaultPrevented || c.then((d) => {
        var f;
        let {
          valid: v
        } = d;
        v && ((f = o.value) == null || f.submit());
      }), u.preventDefault();
    }
    return ie(() => {
      var s;
      return C("form", {
        ref: o,
        class: me(["v-form", e.class]),
        style: Ce(e.style),
        novalidate: !0,
        onReset: i,
        onSubmit: r
      }, [(s = t.default) == null ? void 0 : s.call(t, n)]);
    }), dt(n, o);
  }
}), Au = {
  key: 0,
  class: "flex-row justify-right"
}, Tu = /* @__PURE__ */ Le({
  __name: "OxFormList",
  props: /* @__PURE__ */ ha({
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
    var u;
    const l = ba(e, "modelValue"), t = ge("user"), a = q({}), n = e, o = I(() => ({
      add: n.editable && t.can([n.useModel, "add"]),
      change: n.editable && t.can([n.useModel, "change"]),
      delete: n.editable && t.can([n.useModel, "delete"])
    })), i = q([]);
    (u = l.value) != null && u.length || i.value.push(-1);
    function r() {
      l.value.push(a.value), a.value = {};
    }
    function s(c) {
      confirm(oe("actions.delete.confirm")) && l.value.splice(c, 1);
    }
    return (c, d) => (L(), G(ct, {
      opened: i.value,
      "onUpdate:opened": d[2] || (d[2] = (v) => i.value = v)
    }, {
      default: O(() => {
        var v;
        return [
          (v = l.value) != null && v.length ? (L(), ye(X, { key: 0 }, [
            o.value.change ? (L(!0), ye(X, { key: 0 }, _e(l.value, (f, g) => (L(), G(Ha, {
              key: g,
              value: g
            }, {
              activator: O(({ props: k }) => [
                h(w(on), R({ item: f }, { ref_for: !0 }, k, {
                  remove: o.value.delete,
                  onRemove: (y) => s(g)
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
                      item: f,
                      index: g,
                      editable: o.value.change
                    })
                  ]),
                  _: 2
                }, 1032, ["disabled"])
              ]),
              _: 2
            }, 1032, ["value"]))), 128)) : (L(!0), ye(X, { key: 1 }, _e(l.value, (f, g) => (L(), G(w(on), R({
              key: g,
              item: f
            }, { ref_for: !0 }, n, {
              value: g,
              remove: o.value.delete,
              onRemove: (k) => s(g)
            }), {
              default: O(({ item: k }) => [
                z(c.$slots, "item", {
                  item: k,
                  index: g
                })
              ]),
              actions: O(({ item: k }) => [
                z(c.$slots, "item.actions", {
                  item: k,
                  index: g
                })
              ]),
              _: 2
            }, 1040, ["item", "value", "remove", "onRemove"]))), 128))
          ], 64)) : (L(), G(Ge, {
            key: 1,
            title: w(oe)("lists.empty")
          }, null, 8, ["title"])),
          o.value.add ? (L(), ye(X, { key: 2 }, [
            l.value.length ? (L(), G(Ot, { key: 0 })) : re("", !0),
            h(Ha, { value: -1 }, {
              activator: O(({ props: f }) => [
                h(Ge, R(f, {
                  title: w(oe)("actions.add_item"),
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
                a.value ? (L(), G(Ge, { key: 0 }, {
                  default: O(() => [
                    Object.values(a.value).length ? (L(), ye("div", Au, [
                      h(pe, {
                        size: "small",
                        color: "secondary",
                        "prepend-icon": "mdi-backspace",
                        onClick: d[0] || (d[0] = (f) => a.value = {}),
                        "aria-label": w(oe)("actions.discard")
                      }, {
                        default: O(() => [
                          Ie(Re(w(oe)("actions.discard")), 1)
                        ]),
                        _: 1
                      }, 8, ["aria-label"]),
                      h(pe, {
                        size: "small",
                        color: "primary",
                        "prepend-icon": "mdi-plus",
                        class: "ml-2",
                        onClick: d[1] || (d[1] = (f) => r()),
                        "aria-label": w(oe)("actions.add")
                      }, {
                        default: O(() => [
                          Ie(Re(w(oe)("actions.add")), 1)
                        ]),
                        _: 1
                      }, 8, ["aria-label"])
                    ])) : re("", !0)
                  ]),
                  _: 1
                })) : re("", !0)
              ]),
              _: 3
            })
          ], 64)) : re("", !0)
        ];
      }),
      _: 3
    }, 8, ["opened"]));
  }
}), Vo = ne()({
  name: "VCardActions",
  props: ke(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    return lt({
      VBtn: {
        slim: !0,
        variant: "text"
      }
    }), ie(() => {
      var a;
      return C("div", {
        class: me(["v-card-actions", e.class]),
        style: Ce(e.style)
      }, [(a = t.default) == null ? void 0 : a.call(t)]);
    }), {};
  }
}), _u = K({
  opacity: [Number, String],
  ...ke(),
  ...Ke()
}, "VCardSubtitle"), Bu = ne()({
  name: "VCardSubtitle",
  props: _u(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    return ie(() => h(e.tag, {
      class: me(["v-card-subtitle", e.class]),
      style: Ce([{
        "--v-card-subtitle-opacity": e.opacity
      }, e.style])
    }, t)), {};
  }
}), Co = Xi("v-card-title"), $u = K({
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
  ...ke(),
  ...bt()
}, "VCardItem"), Po = ne()({
  name: "VCardItem",
  props: $u(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    return ie(() => {
      var u;
      const a = !!(e.prependAvatar || e.prependIcon), n = !!(a || t.prepend), o = !!(e.appendAvatar || e.appendIcon), i = !!(o || t.append), r = !!(e.title != null || t.title), s = !!(e.subtitle != null || t.subtitle);
      return C("div", {
        class: me(["v-card-item", e.class]),
        style: Ce(e.style)
      }, [n && C("div", {
        key: "prepend",
        class: "v-card-item__prepend"
      }, [t.prepend ? h(Me, {
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
      }, t.prepend) : C(X, null, [e.prependAvatar && h(xt, {
        key: "prepend-avatar",
        density: e.density,
        image: e.prependAvatar
      }, null), e.prependIcon && h(Ve, {
        key: "prepend-icon",
        density: e.density,
        icon: e.prependIcon
      }, null)])]), C("div", {
        class: "v-card-item__content"
      }, [r && h(Co, {
        key: "title"
      }, {
        default: () => {
          var c;
          return [((c = t.title) == null ? void 0 : c.call(t)) ?? Re(e.title)];
        }
      }), s && h(Bu, {
        key: "subtitle"
      }, {
        default: () => {
          var c;
          return [((c = t.subtitle) == null ? void 0 : c.call(t)) ?? Re(e.subtitle)];
        }
      }), (u = t.default) == null ? void 0 : u.call(t)]), i && C("div", {
        key: "append",
        class: "v-card-item__append"
      }, [t.append ? h(Me, {
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
      }, t.append) : C(X, null, [e.appendIcon && h(Ve, {
        key: "append-icon",
        density: e.density,
        icon: e.appendIcon
      }, null), e.appendAvatar && h(xt, {
        key: "append-avatar",
        density: e.density,
        image: e.appendAvatar
      }, null)])])]);
    }), {};
  }
}), Eu = K({
  opacity: [Number, String],
  ...ke(),
  ...Ke()
}, "VCardText"), Ou = ne()({
  name: "VCardText",
  props: Eu(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    return ie(() => h(e.tag, {
      class: me(["v-card-text", e.class]),
      style: Ce([{
        "--v-card-text-opacity": e.opacity
      }, e.style])
    }, t)), {};
  }
}), Fu = K({
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
  ...Wt(),
  ...ke(),
  ...bt(),
  ...jt(),
  ...zt(),
  ...ul(),
  ...hn(),
  ...yn(),
  ...kt(),
  ...kn(),
  ...Ke(),
  ...Ne(),
  ...Gt({
    variant: "elevated"
  })
}, "VCard"), Io = ne()({
  name: "VCard",
  directives: {
    vRipple: It
  },
  props: Fu(),
  setup(e, l) {
    let {
      attrs: t,
      slots: a
    } = l;
    const {
      themeClasses: n
    } = qe(e), {
      borderClasses: o
    } = pa(e), {
      colorClasses: i,
      colorStyles: r,
      variantClasses: s
    } = al(e), {
      densityClasses: u
    } = Et(e), {
      dimensionStyles: c
    } = Ut(e), {
      elevationClasses: d
    } = wa(e), {
      loaderClasses: v
    } = sl(e), {
      locationStyles: f
    } = Zi(e), {
      positionClasses: g
    } = gn(e), {
      roundedClasses: k
    } = Bt(e), y = wn(e, t);
    return ie(() => {
      const p = e.link !== !1 && y.isLink.value, m = !e.disabled && e.link !== !1 && (e.link || y.isClickable.value), A = p ? "a" : e.tag, S = !!(a.title || e.title != null), V = !!(a.subtitle || e.subtitle != null), x = S || V, P = !!(a.append || e.appendAvatar || e.appendIcon), b = !!(a.prepend || e.prependAvatar || e.prependIcon), _ = !!(a.image || e.image), T = x || b || P, $ = !!(a.text || e.text != null);
      return Ye(h(A, R({
        class: ["v-card", {
          "v-card--disabled": e.disabled,
          "v-card--flat": e.flat,
          "v-card--hover": e.hover && !(e.disabled || e.flat),
          "v-card--link": m
        }, n.value, o.value, i.value, u.value, d.value, v.value, g.value, k.value, s.value, e.class],
        style: [r.value, c.value, f.value, e.style],
        onClick: m && y.navigate,
        tabindex: e.disabled ? -1 : void 0
      }, y.linkProps), {
        default: () => {
          var D;
          return [_ && C("div", {
            key: "image",
            class: "v-card__image"
          }, [a.image ? h(Me, {
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
          }, null)]), h(rl, {
            name: "v-card",
            active: !!e.loading,
            color: typeof e.loading == "boolean" ? void 0 : e.loading
          }, {
            default: a.loader
          }), T && h(Po, {
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
          }), $ && h(Ou, {
            key: "text"
          }, {
            default: () => {
              var M;
              return [((M = a.text) == null ? void 0 : M.call(a)) ?? e.text];
            }
          }), (D = a.default) == null ? void 0 : D.call(a), a.actions && h(Vo, null, {
            default: a.actions
          }), ll(m, "v-card")];
        }
      }), [[It, m && e.ripple]]);
    }), {};
  }
}), Lu = ne()({
  name: "VSlideGroupItem",
  props: ol(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = il(e, io);
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
}), Mu = {
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
    ge("list");
    const a = ge("items"), n = e;
    function o(s) {
      return s = s % n.colors.length, n.colorVariant ? n.colors[s] + "-" + n.colorVariant : n.colors[s];
    }
    function i(s, u, c) {
      s[c] ? !s[c].includes(u) && s[c].push(u) : s[c] = [u];
    }
    const r = I(() => {
      const s = {};
      if (a.value)
        for (var u of a.value) {
          const d = u[n.field];
          if (Array.isArray(d))
            if (d.length)
              for (var c of d)
                i(s, u, c);
            else
              i(s, u, null);
          else
            i(s, u, d);
        }
      return s;
    });
    return (s, u) => (L(), G(Cn, null, {
      default: O(() => [
        h(Ht, null, {
          default: O(() => [
            (L(!0), ye(X, null, _e(n.headers, (c, d) => (L(), G(Lu, {
              key: c.value
            }, {
              default: O(({ selectedClass: v }) => [
                h(Io, {
                  width: "400",
                  class: me(["ma-3", v]),
                  color: o(d),
                  lines: "two"
                }, {
                  default: O(() => [
                    h(Co, null, {
                      default: O(() => [
                        Ie(Re(c.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    h(ct, {
                      "bg-color": o(d)
                    }, {
                      default: O(() => [
                        r.value && r.value[c.value] ? (L(!0), ye(X, { key: 0 }, _e(r.value[c.value], (f) => z(s.$slots, "item", {
                          key: f.id,
                          header: c,
                          item: f
                        }, () => [
                          h(Ge, {
                            title: f[n.itemTitle],
                            value: n.itemValue && f[n.itemValue],
                            onClick: (g) => t("click", f)
                          }, {
                            append: O(() => [
                              z(s.$slots, "item.action")
                            ]),
                            _: 2
                          }, 1032, ["title", "value", "onClick"])
                        ])), 128)) : re("", !0)
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
}, Ao = /* @__PURE__ */ Le({
  __name: "OxActionEdit",
  props: {
    item: {},
    edit: {}
  },
  setup(e) {
    const l = ge("panel");
    ge("repos");
    const t = ge("user"), a = ht(), n = e;
    function o(i, r) {
      l.show({ view: "detail.edit", value: r });
    }
    return (i, r) => n.edit && w(t).can([i.item.constructor, "change"], i.item) ? (L(), G(Dt, R({ key: 0 }, w(a), {
      icon: "mdi-pencil",
      title: w(oe)("actions.edit"),
      item: i.item,
      run: o
    }), null, 16, ["title", "item"])) : n.edit && w(t).can([i.item.constructor, "view"], i.item) ? (L(), G(Dt, R({ key: 1 }, w(a), {
      icon: "mdi-eye-outline",
      title: w(oe)("actions.view"),
      item: i.item,
      run: o
    }), null, 16, ["title", "item"])) : re("", !0);
  }
});
function Ru() {
  const e = q([]);
  Ii(() => e.value = []);
  function l(t, a) {
    e.value[a] = t;
  }
  return {
    refs: e,
    updateRef: l
  };
}
const Du = K({
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
  ...Wt(),
  ...ke(),
  ...bt(),
  ...zt(),
  ...kt(),
  ...Sn(),
  ...Ke({
    tag: "nav"
  }),
  ...Ne(),
  ...Gt({
    variant: "text"
  })
}, "VPagination"), sn = ne()({
  name: "VPagination",
  props: Du(),
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
    const n = we(e, "modelValue"), {
      t: o,
      n: i
    } = rt(), {
      isRtl: r
    } = it(), {
      themeClasses: s
    } = qe(e), {
      width: u
    } = pt(), c = ee(-1);
    lt(void 0, {
      scoped: !0
    });
    const {
      resizeRef: d
    } = Pt((b) => {
      if (!b.length) return;
      const {
        target: _,
        contentRect: T
      } = b[0], $ = _.querySelector(".v-pagination__list > *");
      if (!$) return;
      const D = T.width, M = $.offsetWidth + parseFloat(getComputedStyle($).marginRight) * 2;
      c.value = k(D, M);
    }), v = I(() => parseInt(e.length, 10)), f = I(() => parseInt(e.start, 10)), g = I(() => e.totalVisible != null ? parseInt(e.totalVisible, 10) : c.value >= 0 ? c.value : k(u.value, 58));
    function k(b, _) {
      const T = e.showFirstLastPage ? 5 : 3;
      return Math.max(0, Math.floor(
        // Round to two decimal places to avoid floating point errors
        Number(((b - _ * T) / _).toFixed(2))
      ));
    }
    const y = I(() => {
      if (v.value <= 0 || isNaN(v.value) || v.value > Number.MAX_SAFE_INTEGER) return [];
      if (g.value <= 0) return [];
      if (g.value === 1) return [n.value];
      if (v.value <= g.value)
        return Qt(v.value, f.value);
      const b = g.value % 2 === 0, _ = b ? g.value / 2 : Math.floor(g.value / 2), T = b ? _ : _ + 1, $ = v.value - _;
      if (T - n.value >= 0)
        return [...Qt(Math.max(1, g.value - 1), f.value), e.ellipsis, v.value];
      if (n.value - $ >= (b ? 1 : 0)) {
        const D = g.value - 1, M = v.value - D + f.value;
        return [f.value, e.ellipsis, ...Qt(D, M)];
      } else {
        const D = Math.max(1, g.value - 2), M = D === 1 ? n.value : n.value - Math.ceil(D / 2) + f.value;
        return [f.value, e.ellipsis, ...Qt(D, M), e.ellipsis, v.value];
      }
    });
    function p(b, _, T) {
      b.preventDefault(), n.value = _, T && a(T, _);
    }
    const {
      refs: m,
      updateRef: A
    } = Ru();
    lt({
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
    const S = I(() => y.value.map((b, _) => {
      const T = ($) => A($, _);
      if (typeof b == "string")
        return {
          isActive: !1,
          key: `ellipsis-${_}`,
          page: b,
          props: {
            ref: T,
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
            ref: T,
            ellipsis: !1,
            icon: !0,
            disabled: !!e.disabled || Number(e.length) < 2,
            color: $ ? e.activeColor : e.color,
            "aria-current": $,
            "aria-label": o($ ? e.currentPageAriaLabel : e.pageAriaLabel, b),
            onClick: (D) => p(D, b)
          }
        };
      }
    })), V = I(() => {
      const b = !!e.disabled || n.value <= f.value, _ = !!e.disabled || n.value >= f.value + v.value - 1;
      return {
        first: e.showFirstLastPage ? {
          icon: r.value ? e.lastIcon : e.firstIcon,
          onClick: (T) => p(T, f.value, "first"),
          disabled: b,
          "aria-label": o(e.firstAriaLabel),
          "aria-disabled": b
        } : void 0,
        prev: {
          icon: r.value ? e.nextIcon : e.prevIcon,
          onClick: (T) => p(T, n.value - 1, "prev"),
          disabled: b,
          "aria-label": o(e.previousAriaLabel),
          "aria-disabled": b
        },
        next: {
          icon: r.value ? e.prevIcon : e.nextIcon,
          onClick: (T) => p(T, n.value + 1, "next"),
          disabled: _,
          "aria-label": o(e.nextAriaLabel),
          "aria-disabled": _
        },
        last: e.showFirstLastPage ? {
          icon: r.value ? e.firstIcon : e.lastIcon,
          onClick: (T) => p(T, f.value + v.value - 1, "last"),
          disabled: _,
          "aria-label": o(e.lastAriaLabel),
          "aria-disabled": _
        } : void 0
      };
    });
    function x() {
      var _;
      const b = n.value - f.value;
      (_ = m.value[b]) == null || _.$el.focus();
    }
    function P(b) {
      b.key === zl.left && !e.disabled && n.value > Number(e.start) ? (n.value = n.value - 1, Ee(x)) : b.key === zl.right && !e.disabled && n.value < f.value + v.value - 1 && (n.value = n.value + 1, Ee(x));
    }
    return ie(() => h(e.tag, {
      ref: d,
      class: me(["v-pagination", s.value, e.class]),
      style: Ce(e.style),
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
      }, [t.first ? t.first(V.value.first) : h(pe, R({
        _as: "VPaginationBtn"
      }, V.value.first), null)]), C("li", {
        key: "prev",
        class: "v-pagination__prev",
        "data-test": "v-pagination-prev"
      }, [t.prev ? t.prev(V.value.prev) : h(pe, R({
        _as: "VPaginationBtn"
      }, V.value.prev), null)]), S.value.map((b, _) => C("li", {
        key: b.key,
        class: me(["v-pagination__item", {
          "v-pagination__item--is-active": b.isActive
        }]),
        "data-test": "v-pagination-item"
      }, [t.item ? t.item(b) : h(pe, R({
        _as: "VPaginationBtn"
      }, b.props), {
        default: () => [b.page]
      })])), C("li", {
        key: "next",
        class: "v-pagination__next",
        "data-test": "v-pagination-next"
      }, [t.next ? t.next(V.value.next) : h(pe, R({
        _as: "VPaginationBtn"
      }, V.value.next), null)]), e.showFirstLastPage && C("li", {
        key: "last",
        class: "v-pagination__last",
        "data-test": "v-pagination-last"
      }, [t.last ? t.last(V.value.last) : h(pe, R({
        _as: "VPaginationBtn"
      }, V.value.last), null)])])]
    })), {};
  }
}), To = K({
  page: {
    type: [Number, String],
    default: 1
  },
  itemsPerPage: {
    type: [Number, String],
    default: 10
  }
}, "DataTable-paginate"), _o = Symbol.for("vuetify:data-table-pagination");
function Bo(e) {
  const l = we(e, "page", void 0, (a) => Number(a ?? 1)), t = we(e, "itemsPerPage", void 0, (a) => Number(a ?? 10));
  return {
    page: l,
    itemsPerPage: t
  };
}
function $o(e) {
  const {
    page: l,
    itemsPerPage: t,
    itemsLength: a
  } = e, n = I(() => t.value === -1 ? 0 : t.value * (l.value - 1)), o = I(() => t.value === -1 ? a.value : Math.min(a.value, n.value + t.value)), i = I(() => t.value === -1 || a.value === 0 ? 1 : Math.ceil(a.value / t.value));
  Q([l, i], () => {
    l.value > i.value && (l.value = i.value);
  });
  function r(v) {
    t.value = v, l.value = 1;
  }
  function s() {
    l.value = Je(l.value + 1, 1, i.value);
  }
  function u() {
    l.value = Je(l.value - 1, 1, i.value);
  }
  function c(v) {
    l.value = Je(v, 1, i.value);
  }
  const d = {
    page: l,
    itemsPerPage: t,
    startIndex: n,
    stopIndex: o,
    pageCount: i,
    itemsLength: a,
    nextPage: s,
    prevPage: u,
    setPage: c,
    setItemsPerPage: r
  };
  return Ue(_o, d), d;
}
function Nu() {
  const e = ge(_o);
  if (!e) throw new Error("Missing pagination!");
  return e;
}
function Hu(e) {
  const l = ot("usePaginatedItems"), {
    items: t,
    startIndex: a,
    stopIndex: n,
    itemsPerPage: o
  } = e, i = I(() => o.value <= 0 ? t.value : t.value.slice(a.value, n.value));
  return Q(i, (r) => {
    l.emit("update:currentItems", r);
  }, {
    immediate: !0
  }), {
    paginatedItems: i
  };
}
const Il = K({
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
  props: Il(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    const {
      t: a
    } = rt(), {
      page: n,
      pageCount: o,
      startIndex: i,
      stopIndex: r,
      itemsLength: s,
      itemsPerPage: u,
      setItemsPerPage: c
    } = Nu(), d = I(() => e.itemsPerPageOptions.map((v) => typeof v == "number" ? {
      value: v,
      title: v === -1 ? a("$vuetify.dataFooter.itemsPerPageAll") : String(v)
    } : {
      ...v,
      title: isNaN(Number(v.title)) ? a(v.title) : v.title
    }));
    return ie(() => {
      var f;
      const v = sn.filterProps(e);
      return C("div", {
        class: "v-data-table-footer"
      }, [(f = t.prepend) == null ? void 0 : f.call(t), C("div", {
        class: "v-data-table-footer__items-per-page"
      }, [C("span", {
        "aria-label": a(e.itemsPerPageText)
      }, [a(e.itemsPerPageText)]), h(Pl, {
        items: d.value,
        modelValue: u.value,
        "onUpdate:modelValue": (g) => c(Number(g)),
        density: "compact",
        variant: "outlined",
        hideDetails: !0
      }, null)]), C("div", {
        class: "v-data-table-footer__info"
      }, [C("div", null, [a(e.pageText, s.value ? i.value + 1 : 0, r.value, s.value)])]), C("div", {
        class: "v-data-table-footer__pagination"
      }, [h(sn, R({
        modelValue: n.value,
        "onUpdate:modelValue": (g) => n.value = g,
        density: "comfortable",
        firstAriaLabel: e.firstPageLabel,
        lastAriaLabel: e.lastPageLabel,
        length: o.value,
        nextAriaLabel: e.nextPageLabel,
        previousAriaLabel: e.prevPageLabel,
        rounded: !0,
        showFirstLastPage: !0,
        totalVisible: e.showCurrentPage ? 1 : 0,
        variant: "plain"
      }, v), null)])]);
    }), {};
  }
}), fa = cs({
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
  tag: String,
  width: [Number, String],
  maxWidth: [Number, String],
  nowrap: Boolean
}, (e, l) => {
  let {
    slots: t
  } = l;
  const a = e.tag ?? "td", n = typeof e.fixed == "string" ? e.fixed : e.fixed ? "start" : "none";
  return h(a, {
    class: me(["v-data-table__td", {
      "v-data-table-column--fixed": n === "start",
      "v-data-table-column--fixed-end": n === "end",
      "v-data-table-column--last-fixed": e.lastFixed,
      "v-data-table-column--first-fixed-end": e.firstFixedEnd,
      "v-data-table-column--no-padding": e.noPadding,
      "v-data-table-column--nowrap": e.nowrap
    }, `v-data-table-column--align-${e.align}`]),
    style: {
      height: he(e.height),
      width: he(e.width),
      maxWidth: he(e.maxWidth),
      left: n === "start" ? he(e.fixedOffset || null) : void 0,
      right: n === "end" ? he(e.fixedEndOffset || null) : void 0
    }
  }, {
    default: () => {
      var o;
      return [(o = t.default) == null ? void 0 : o.call(t)];
    }
  });
}), zu = K({
  headers: Array
}, "DataTable-header"), Eo = Symbol.for("vuetify:data-table-headers"), Oo = {
  title: "",
  sortable: !1
}, Wu = {
  ...Oo,
  width: 48
};
function Uu() {
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
function Ja(e) {
  let l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  if (!e.children)
    l.push(e);
  else
    for (const t of e.children)
      Ja(t, l);
  return l;
}
function Fo(e) {
  let l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : /* @__PURE__ */ new Set();
  for (const t of e)
    t.key && l.add(t.key), t.children && Fo(t.children, l);
  return l;
}
function ju(e) {
  if (e.key) {
    if (e.key === "data-table-group") return Oo;
    if (["data-table-expand", "data-table-select"].includes(e.key)) return Wu;
  }
}
function Al(e) {
  let l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return e.children ? Math.max(l, ...e.children.map((t) => Al(t, l + 1))) : l;
}
function Ku(e) {
  let l = !1;
  function t(o, i) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "none";
    if (o)
      if (r !== "none" && (o.fixed = r), o.fixed === !0 && (o.fixed = "start"), o.fixed === i)
        if (o.children)
          if (i === "start")
            for (let s = o.children.length - 1; s >= 0; s--)
              t(o.children[s], i, i);
          else
            for (let s = 0; s < o.children.length; s++)
              t(o.children[s], i, i);
        else
          !l && i === "start" ? o.lastFixed = !0 : !l && i === "end" ? o.firstFixedEnd = !0 : isNaN(Number(o.width)) ? Tn(`Multiple fixed columns should have a static width (key: ${o.key})`) : o.minWidth = Math.max(Number(o.width) || 0, Number(o.minWidth) || 0), l = !0;
      else if (o.children)
        if (i === "start")
          for (let s = o.children.length - 1; s >= 0; s--)
            t(o.children[s], i);
        else
          for (let s = 0; s < o.children.length; s++)
            t(o.children[s], i);
      else
        l = !1;
  }
  for (let o = e.length - 1; o >= 0; o--)
    t(e[o], "start");
  for (let o = 0; o < e.length; o++)
    t(e[o], "end");
  let a = 0;
  for (let o = 0; o < e.length; o++)
    a = Lo(e[o], a);
  let n = 0;
  for (let o = e.length - 1; o >= 0; o--)
    n = Mo(e[o], n);
}
function Lo(e) {
  let l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  if (!e) return l;
  if (e.children) {
    e.fixedOffset = l;
    for (const t of e.children)
      l = Lo(t, l);
  } else e.fixed && e.fixed !== "end" && (e.fixedOffset = l, l += parseFloat(e.width || "0") || 0);
  return l;
}
function Mo(e) {
  let l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  if (!e) return l;
  if (e.children) {
    e.fixedEndOffset = l;
    for (const t of e.children)
      l = Mo(t, l);
  } else e.fixed === "end" && (e.fixedEndOffset = l, l += parseFloat(e.width || "0") || 0);
  return l;
}
function Gu(e, l) {
  const t = [];
  let a = 0;
  const n = Uu(e);
  for (; n.size() > 0; ) {
    let i = n.count();
    const r = [];
    let s = 1;
    for (; i > 0; ) {
      const {
        element: u,
        priority: c
      } = n.dequeue(), d = l - a - Al(u);
      if (r.push({
        ...u,
        rowspan: d ?? 1,
        colspan: u.children ? Ja(u).length : 1
      }), u.children)
        for (const v of u.children) {
          const f = c % 1 + s / Math.pow(10, a + 2);
          n.enqueue(v, a + d + f);
        }
      s += 1, i -= 1;
    }
    a += 1, t.push(r);
  }
  return {
    columns: e.map((i) => Ja(i)).flat(),
    headers: t
  };
}
function Ro(e) {
  const l = [];
  for (const t of e) {
    const a = {
      ...ju(t),
      ...t
    }, n = a.key ?? (typeof a.value == "string" ? a.value : null), o = a.value ?? n ?? null, i = {
      ...a,
      key: n,
      value: o,
      sortable: a.sortable ?? (a.key != null || !!a.sort),
      children: a.children ? Ro(a.children) : void 0
    };
    l.push(i);
  }
  return l;
}
function Do(e, l) {
  const t = q([]), a = q([]), n = q({}), o = q({}), i = q({});
  tt(() => {
    var k, y, p;
    const u = (e.headers || Object.keys(e.items[0] ?? {}).map((m) => ({
      key: m,
      title: Ai(m)
    }))).slice(), c = Fo(u);
    (k = l == null ? void 0 : l.groupBy) != null && k.value.length && !c.has("data-table-group") && u.unshift({
      key: "data-table-group",
      title: "Group"
    }), (y = l == null ? void 0 : l.showSelect) != null && y.value && !c.has("data-table-select") && u.unshift({
      key: "data-table-select"
    }), (p = l == null ? void 0 : l.showExpand) != null && p.value && !c.has("data-table-expand") && u.push({
      key: "data-table-expand"
    });
    const d = Ro(u);
    Ku(d);
    const v = Math.max(...d.map((m) => Al(m))) + 1, f = Gu(d, v);
    t.value = f.headers, a.value = f.columns;
    const g = f.headers.flat(1);
    for (const m of g)
      m.key && (m.sortable && (m.sort && (n.value[m.key] = m.sort), m.sortRaw && (o.value[m.key] = m.sortRaw)), m.filter && (i.value[m.key] = m.filter));
  });
  const r = {
    headers: t,
    columns: a,
    sortFunctions: n,
    sortRawFunctions: o,
    filterFunctions: i
  };
  return Ue(Eo, r), r;
}
function Pa() {
  const e = ge(Eo);
  if (!e) throw new Error("Missing headers!");
  return e;
}
const Yu = {
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
}, No = {
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
    return No.select({
      items: t,
      value: l,
      selected: a
    });
  }
}, Ho = {
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
    return Ho.select({
      items: t,
      value: l,
      selected: a
    });
  }
}, qu = K({
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
    default: et
  }
}, "DataTable-select"), zo = Symbol.for("vuetify:data-table-selection");
function Wo(e, l) {
  let {
    allItems: t,
    currentPage: a
  } = l;
  const n = we(e, "modelValue", e.modelValue, (m) => new Set(He(m).map((A) => {
    var S;
    return ((S = t.value.find((V) => e.valueComparator(A, V.value))) == null ? void 0 : S.value) ?? A;
  })), (m) => [...m.values()]), o = I(() => t.value.filter((m) => m.selectable)), i = I(() => a.value.filter((m) => m.selectable)), r = I(() => {
    if (typeof e.selectStrategy == "object") return e.selectStrategy;
    switch (e.selectStrategy) {
      case "single":
        return Yu;
      case "all":
        return Ho;
      case "page":
      default:
        return No;
    }
  }), s = ee(null);
  function u(m) {
    return He(m).every((A) => n.value.has(A.value));
  }
  function c(m) {
    return He(m).some((A) => n.value.has(A.value));
  }
  function d(m, A) {
    const S = r.value.select({
      items: m,
      value: A,
      selected: new Set(n.value)
    });
    n.value = S;
  }
  function v(m, A, S) {
    const V = [];
    if (A = A ?? a.value.findIndex((x) => x.value === m.value), e.selectStrategy !== "single" && (S != null && S.shiftKey) && s.value !== null) {
      const [x, P] = [s.value, A].sort((b, _) => b - _);
      V.push(...a.value.slice(x, P + 1).filter((b) => b.selectable));
    } else
      V.push(m), s.value = A;
    d(V, !u([m]));
  }
  function f(m) {
    const A = r.value.selectAll({
      value: m,
      allItems: o.value,
      currentPage: i.value,
      selected: new Set(n.value)
    });
    n.value = A;
  }
  const g = I(() => n.value.size > 0), k = I(() => {
    const m = r.value.allSelected({
      allItems: o.value,
      currentPage: i.value
    });
    return !!m.length && u(m);
  }), y = H(() => r.value.showSelectAll), p = {
    toggleSelect: v,
    select: d,
    selectAll: f,
    isSelected: u,
    isSomeSelected: c,
    someSelected: g,
    allSelected: k,
    showSelectAll: y,
    lastSelectedIndex: s,
    selectStrategy: r
  };
  return Ue(zo, p), p;
}
function Ia() {
  const e = ge(zo);
  if (!e) throw new Error("Missing selection!");
  return e;
}
const Xu = K({
  sortBy: {
    type: Array,
    default: () => []
  },
  customKeySort: Object,
  multiSort: Boolean,
  mustSort: Boolean
}, "DataTable-sort"), Uo = Symbol.for("vuetify:data-table-sort");
function jo(e) {
  const l = we(e, "sortBy"), t = H(() => e.mustSort), a = H(() => e.multiSort);
  return {
    sortBy: l,
    mustSort: t,
    multiSort: a
  };
}
function Ko(e) {
  const {
    sortBy: l,
    mustSort: t,
    multiSort: a,
    page: n
  } = e, o = (s) => {
    if (s.key == null) return;
    let u = l.value.map((d) => ({
      ...d
    })) ?? [];
    const c = u.find((d) => d.key === s.key);
    c ? c.order === "desc" ? t.value && u.length === 1 ? c.order = "asc" : u = u.filter((d) => d.key !== s.key) : c.order = "desc" : a.value ? u.push({
      key: s.key,
      order: "asc"
    }) : u = [{
      key: s.key,
      order: "asc"
    }], l.value = u, n && (n.value = 1);
  };
  function i(s) {
    return !!l.value.find((u) => u.key === s.key);
  }
  const r = {
    sortBy: l,
    toggleSort: o,
    isSorted: i
  };
  return Ue(Uo, r), r;
}
function Go() {
  const e = ge(Uo);
  if (!e) throw new Error("Missing sort!");
  return e;
}
function Zu(e, l, t, a) {
  const n = rt();
  return {
    sortedItems: I(() => {
      var i, r;
      return t.value.length ? Qu(l.value, t.value, n.current.value, {
        transform: a == null ? void 0 : a.transform,
        sortFunctions: {
          ...e.customKeySort,
          ...(i = a == null ? void 0 : a.sortFunctions) == null ? void 0 : i.value
        },
        sortRawFunctions: (r = a == null ? void 0 : a.sortRawFunctions) == null ? void 0 : r.value
      }) : l.value;
    })
  };
}
function Qu(e, l, t, a) {
  const n = new Intl.Collator(t, {
    sensitivity: "accent",
    usage: "sort"
  });
  return e.map((i) => [i, a != null && a.transform ? a.transform(i) : i]).sort((i, r) => {
    var s, u;
    for (let c = 0; c < l.length; c++) {
      let d = !1;
      const v = l[c].key, f = l[c].order ?? "asc";
      if (f === !1) continue;
      let g = ia(i[1], v), k = ia(r[1], v), y = i[0].raw, p = r[0].raw;
      if (f === "desc" && ([g, k] = [k, g], [y, p] = [p, y]), (s = a == null ? void 0 : a.sortRawFunctions) != null && s[v]) {
        const m = a.sortRawFunctions[v](y, p);
        if (m == null) continue;
        if (d = !0, m) return m;
      }
      if ((u = a == null ? void 0 : a.sortFunctions) != null && u[v]) {
        const m = a.sortFunctions[v](g, k);
        if (m == null) continue;
        if (d = !0, m) return m;
      }
      if (!d && (g instanceof Date && k instanceof Date && (g = g.getTime(), k = k.getTime()), [g, k] = [g, k].map((m) => m != null ? m.toString().toLocaleLowerCase() : m), g !== k))
        return Jt(g) && Jt(k) ? 0 : Jt(g) ? -1 : Jt(k) ? 1 : !isNaN(g) && !isNaN(k) ? Number(g) - Number(k) : n.compare(g, k);
    }
    return 0;
  }).map((i) => {
    let [r] = i;
    return r;
  });
}
const Yo = K({
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
  ...qt(),
  ...ul()
}, "VDataTableHeaders"), ma = ne()({
  name: "VDataTableHeaders",
  props: Yo(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    const {
      t: a
    } = rt(), {
      toggleSort: n,
      sortBy: o,
      isSorted: i
    } = Go(), {
      someSelected: r,
      allSelected: s,
      selectAll: u,
      showSelectAll: c
    } = Ia(), {
      columns: d,
      headers: v
    } = Pa(), {
      loaderClasses: f
    } = sl(e);
    function g(_, T) {
      if (!(e.sticky || e.fixedHeader) && !_.fixed) return;
      const $ = typeof _.fixed == "string" ? _.fixed : _.fixed ? "start" : "none";
      return {
        position: "sticky",
        left: $ === "start" ? he(_.fixedOffset) : void 0,
        right: $ === "end" ? he(_.fixedEndOffset) : void 0,
        top: e.sticky || e.fixedHeader ? `calc(var(--v-table-header-height) * ${T})` : void 0
      };
    }
    function k(_, T) {
      _.key === "Enter" && !e.disableSort && n(T);
    }
    function y(_) {
      const T = o.value.find(($) => $.key === _.key);
      return T ? T.order === "asc" ? e.sortAscIcon : e.sortDescIcon : e.sortAscIcon;
    }
    const {
      backgroundColorClasses: p,
      backgroundColorStyles: m
    } = ft(() => e.color), {
      displayClasses: A,
      mobile: S
    } = pt(e), V = I(() => ({
      headers: v.value,
      columns: d.value,
      toggleSort: n,
      isSorted: i,
      sortBy: o.value,
      someSelected: r.value,
      allSelected: s.value,
      selectAll: u,
      getSortIcon: y
    })), x = I(() => ["v-data-table__th", {
      "v-data-table__th--sticky": e.sticky || e.fixedHeader
    }, A.value, f.value]), P = (_) => {
      let {
        column: T,
        x: $,
        y: D
      } = _;
      const M = T.key === "data-table-select" || T.key === "data-table-expand", U = R(e.headerProps ?? {}, T.headerProps ?? {});
      return h(fa, R({
        tag: "th",
        align: T.align,
        class: [{
          "v-data-table__th--sortable": T.sortable && !e.disableSort,
          "v-data-table__th--sorted": i(T),
          "v-data-table__th--fixed": T.fixed
        }, ...x.value],
        style: {
          width: he(T.width),
          minWidth: he(T.minWidth),
          maxWidth: he(T.maxWidth),
          ...g(T, D)
        },
        colspan: T.colspan,
        rowspan: T.rowspan,
        fixed: T.fixed,
        nowrap: T.nowrap,
        lastFixed: T.lastFixed,
        firstFixedEnd: T.firstFixedEnd,
        noPadding: M,
        tabindex: T.sortable ? 0 : void 0,
        onClick: T.sortable ? () => n(T) : void 0,
        onKeydown: T.sortable ? (j) => k(j, T) : void 0
      }, U), {
        default: () => {
          var ae;
          const j = `header.${T.key}`, Y = {
            column: T,
            selectAll: u,
            isSorted: i,
            toggleSort: n,
            sortBy: o.value,
            someSelected: r.value,
            allSelected: s.value,
            getSortIcon: y
          };
          return t[j] ? t[j](Y) : T.key === "data-table-select" ? ((ae = t["header.data-table-select"]) == null ? void 0 : ae.call(t, Y)) ?? (c.value && h(St, {
            modelValue: s.value,
            indeterminate: r.value && !s.value,
            "onUpdate:modelValue": u
          }, null)) : C("div", {
            class: "v-data-table-header__content"
          }, [C("span", null, [T.title]), T.sortable && !e.disableSort && h(Ve, {
            key: "icon",
            class: "v-data-table-header__sort-icon",
            icon: y(T)
          }, null), e.multiSort && i(T) && C("div", {
            key: "badge",
            class: me(["v-data-table-header__sort-badge", ...p.value]),
            style: Ce(m.value)
          }, [o.value.findIndex((le) => le.key === T.key) + 1])]);
        }
      });
    }, b = () => {
      const _ = I(() => d.value.filter(($) => ($ == null ? void 0 : $.sortable) && !e.disableSort)), T = I(() => {
        if (d.value.find((D) => D.key === "data-table-select") != null)
          return s.value ? "$checkboxOn" : r.value ? "$checkboxIndeterminate" : "$checkboxOff";
      });
      return h(fa, R({
        tag: "th",
        class: [...x.value],
        colspan: v.value.length + 1
      }, e.headerProps), {
        default: () => [C("div", {
          class: "v-data-table-header__content"
        }, [h(Pl, {
          chips: !0,
          class: "v-data-table__td-sort-select",
          clearable: !0,
          density: "default",
          items: _.value,
          label: a("$vuetify.dataTable.sortBy"),
          multiple: e.multiSort,
          variant: "underlined",
          "onClick:clear": () => o.value = [],
          appendIcon: T.value,
          "onClick:append": () => u(!s.value)
        }, {
          chip: ($) => {
            var D;
            return h(Sl, {
              onClick: (D = $.item.raw) != null && D.sortable ? () => n($.item.raw) : void 0,
              onMousedown: (M) => {
                M.preventDefault(), M.stopPropagation();
              }
            }, {
              default: () => [$.item.title, h(Ve, {
                class: me(["v-data-table__td-sort-icon", i($.item.raw) && "v-data-table__td-sort-icon-active"]),
                icon: y($.item.raw),
                size: "small"
              }, null)]
            });
          }
        })])]
      });
    };
    ie(() => S.value ? C("tr", null, [h(b, null, null)]) : C(X, null, [t.headers ? t.headers(V.value) : v.value.map((_, T) => C("tr", null, [_.map(($, D) => h(P, {
      column: $,
      x: D,
      y: T
    }, null))])), e.loading && C("tr", {
      class: "v-data-table-progress"
    }, [C("th", {
      colspan: d.value.length
    }, [h(rl, {
      name: "v-data-table-progress",
      absolute: !0,
      active: !0,
      color: typeof e.loading == "boolean" ? void 0 : e.loading,
      indeterminate: !0
    }, {
      default: t.loader
    })])])]));
  }
}), Ju = K({
  groupBy: {
    type: Array,
    default: () => []
  }
}, "DataTable-group"), qo = Symbol.for("vuetify:data-table-group");
function Xo(e) {
  return {
    groupBy: we(e, "groupBy")
  };
}
function Zo(e) {
  const {
    disableSort: l,
    groupBy: t,
    sortBy: a
  } = e, n = q(/* @__PURE__ */ new Set()), o = I(() => t.value.map((c) => ({
    ...c,
    order: c.order ?? !1
  })).concat(l != null && l.value ? [] : a.value));
  function i(c) {
    return n.value.has(c.id);
  }
  function r(c) {
    const d = new Set(n.value);
    i(c) ? d.delete(c.id) : d.add(c.id), n.value = d;
  }
  function s(c) {
    function d(v) {
      const f = [];
      for (const g of v.items)
        "type" in g && g.type === "group" ? f.push(...d(g)) : f.push(g);
      return [...new Set(f)];
    }
    return d({
      items: c
    });
  }
  const u = {
    sortByWithGroups: o,
    toggleGroup: r,
    opened: n,
    groupBy: t,
    extractRows: s,
    isGroupOpen: i
  };
  return Ue(qo, u), u;
}
function Qo() {
  const e = ge(qo);
  if (!e) throw new Error("Missing group!");
  return e;
}
function ec(e, l) {
  if (!e.length) return [];
  const t = /* @__PURE__ */ new Map();
  for (const a of e) {
    const n = ia(a.raw, l);
    t.has(n) || t.set(n, []), t.get(n).push(a);
  }
  return t;
}
function Jo(e, l) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "root";
  if (!l.length) return [];
  const n = ec(e, l[0]), o = [], i = l.slice(1);
  return n.forEach((r, s) => {
    const u = l[0], c = `${a}_${u}_${s}`;
    o.push({
      depth: t,
      id: c,
      key: u,
      value: s,
      items: i.length ? Jo(r, i, t + 1, c) : r,
      type: "group"
    });
  }), o;
}
function ei(e, l) {
  const t = [];
  for (const a of e)
    "type" in a && a.type === "group" ? (a.value != null && t.push(a), (l.has(a.id) || a.value == null) && t.push(...ei(a.items, l))) : t.push(a);
  return t;
}
function ti(e, l, t) {
  return {
    flatItems: I(() => {
      if (!l.value.length) return e.value;
      const n = Jo(e.value, l.value.map((o) => o.key));
      return ei(n, t.value);
    })
  };
}
const tc = K({
  item: {
    type: Object,
    required: !0
  }
}, "VDataTableGroupHeaderRow"), ac = ne()({
  name: "VDataTableGroupHeaderRow",
  props: tc(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    const {
      isGroupOpen: a,
      toggleGroup: n,
      extractRows: o
    } = Qo(), {
      isSelected: i,
      isSomeSelected: r,
      select: s
    } = Ia(), {
      columns: u
    } = Pa(), c = I(() => o([e.item]));
    return () => C("tr", {
      class: "v-data-table-group-header-row",
      style: {
        "--v-data-table-group-header-row-depth": e.item.depth
      }
    }, [u.value.map((d) => {
      var v, f;
      if (d.key === "data-table-group") {
        const g = a(e.item) ? "$expand" : "$next", k = () => n(e.item);
        return ((v = t["data-table-group"]) == null ? void 0 : v.call(t, {
          item: e.item,
          count: c.value.length,
          props: {
            icon: g,
            onClick: k
          }
        })) ?? h(fa, {
          class: "v-data-table-group-header-row__column"
        }, {
          default: () => [h(pe, {
            size: "small",
            variant: "text",
            icon: g,
            onClick: k
          }, null), C("span", null, [e.item.value]), C("span", null, [Ie("("), c.value.length, Ie(")")])]
        });
      }
      if (d.key === "data-table-select") {
        const g = i(c.value), k = r(c.value) && !g, y = (p) => s(c.value, p);
        return ((f = t["data-table-select"]) == null ? void 0 : f.call(t, {
          props: {
            modelValue: g,
            indeterminate: k,
            "onUpdate:modelValue": y
          }
        })) ?? C("td", null, [h(St, {
          modelValue: g,
          indeterminate: k,
          "onUpdate:modelValue": y
        }, null)]);
      }
      return C("td", null, null);
    })]);
  }
}), lc = K({
  expandOnClick: Boolean,
  showExpand: Boolean,
  expanded: {
    type: Array,
    default: () => []
  }
}, "DataTable-expand"), ai = Symbol.for("vuetify:datatable:expanded");
function li(e) {
  const l = H(() => e.expandOnClick), t = we(e, "expanded", e.expanded, (r) => new Set(r), (r) => [...r.values()]);
  function a(r, s) {
    const u = new Set(t.value);
    s ? u.add(r.value) : u.delete(r.value), t.value = u;
  }
  function n(r) {
    return t.value.has(r.value);
  }
  function o(r) {
    a(r, !n(r));
  }
  const i = {
    expand: a,
    expanded: t,
    expandOnClick: l,
    isExpanded: n,
    toggleExpand: o
  };
  return Ue(ai, i), i;
}
function ni() {
  const e = ge(ai);
  if (!e) throw new Error("foo");
  return e;
}
const nc = K({
  index: Number,
  item: Object,
  cellProps: [Object, Function],
  onClick: Ze(),
  onContextmenu: Ze(),
  onDblclick: Ze(),
  ...qt()
}, "VDataTableRow"), oc = ne()({
  name: "VDataTableRow",
  props: nc(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    const {
      displayClasses: a,
      mobile: n
    } = pt(e, "v-data-table__tr"), {
      isSelected: o,
      toggleSelect: i,
      someSelected: r,
      allSelected: s,
      selectAll: u
    } = Ia(), {
      isExpanded: c,
      toggleExpand: d
    } = ni(), {
      toggleSort: v,
      sortBy: f,
      isSorted: g
    } = Go(), {
      columns: k
    } = Pa();
    ie(() => C("tr", {
      class: me(["v-data-table__tr", {
        "v-data-table__tr--clickable": !!(e.onClick || e.onContextmenu || e.onDblclick)
      }, a.value]),
      onClick: e.onClick,
      onContextmenu: e.onContextmenu,
      onDblclick: e.onDblclick
    }, [e.item && k.value.map((y, p) => {
      const m = e.item, A = `item.${y.key}`, S = `header.${y.key}`, V = {
        index: e.index,
        item: m.raw,
        internalItem: m,
        value: ia(m.columns, y.key),
        column: y,
        isSelected: o,
        toggleSelect: i,
        isExpanded: c,
        toggleExpand: d
      }, x = {
        column: y,
        selectAll: u,
        isSorted: g,
        toggleSort: v,
        sortBy: f.value,
        someSelected: r.value,
        allSelected: s.value,
        getSortIcon: () => ""
      }, P = typeof e.cellProps == "function" ? e.cellProps({
        index: V.index,
        item: V.item,
        internalItem: V.internalItem,
        value: V.value,
        column: y
      }) : e.cellProps, b = typeof y.cellProps == "function" ? y.cellProps({
        index: V.index,
        item: V.item,
        internalItem: V.internalItem,
        value: V.value
      }) : y.cellProps;
      return h(fa, R({
        align: y.align,
        class: {
          "v-data-table__td--expanded-row": y.key === "data-table-expand",
          "v-data-table__td--select-row": y.key === "data-table-select"
        },
        fixed: y.fixed,
        fixedOffset: y.fixedOffset,
        fixedEndOffset: y.fixedEndOffset,
        lastFixed: y.lastFixed,
        firstFixedEnd: y.firstFixedEnd,
        maxWidth: n.value ? void 0 : y.maxWidth,
        noPadding: y.key === "data-table-select" || y.key === "data-table-expand",
        nowrap: y.nowrap,
        width: n.value ? void 0 : y.width
      }, P, b), {
        default: () => {
          var T, $, D, M;
          if (y.key === "data-table-select")
            return ((T = t["item.data-table-select"]) == null ? void 0 : T.call(t, {
              ...V,
              props: {
                disabled: !m.selectable,
                modelValue: o([m]),
                onClick: Te(() => i(m), ["stop"])
              }
            })) ?? h(St, {
              disabled: !m.selectable,
              modelValue: o([m]),
              onClick: Te((U) => i(m, e.index, U), ["stop"])
            }, null);
          if (y.key === "data-table-expand")
            return (($ = t["item.data-table-expand"]) == null ? void 0 : $.call(t, {
              ...V,
              props: {
                icon: c(m) ? "$collapse" : "$expand",
                size: "small",
                variant: "text",
                onClick: Te(() => d(m), ["stop"])
              }
            })) ?? h(pe, {
              icon: c(m) ? "$collapse" : "$expand",
              size: "small",
              variant: "text",
              onClick: Te(() => d(m), ["stop"])
            }, null);
          if (t[A] && !n.value) return t[A](V);
          const _ = Re(V.value);
          return n.value ? C(X, null, [C("div", {
            class: "v-data-table__td-title"
          }, [((D = t[S]) == null ? void 0 : D.call(t, x)) ?? y.title]), C("div", {
            class: "v-data-table__td-value"
          }, [((M = t[A]) == null ? void 0 : M.call(t, V)) ?? _])]) : _;
        }
      });
    })]));
  }
}), oi = K({
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
  ...qt()
}, "VDataTableRows"), ga = ne()({
  name: "VDataTableRows",
  inheritAttrs: !1,
  props: oi(),
  setup(e, l) {
    let {
      attrs: t,
      slots: a
    } = l;
    const {
      columns: n
    } = Pa(), {
      expandOnClick: o,
      toggleExpand: i,
      isExpanded: r
    } = ni(), {
      isSelected: s,
      toggleSelect: u
    } = Ia(), {
      toggleGroup: c,
      isGroupOpen: d
    } = Qo(), {
      t: v
    } = rt(), {
      mobile: f
    } = pt(e);
    return ie(() => {
      var g, k;
      return e.loading && (!e.items.length || a.loading) ? C("tr", {
        class: "v-data-table-rows-loading",
        key: "loading"
      }, [C("td", {
        colspan: n.value.length
      }, [((g = a.loading) == null ? void 0 : g.call(a)) ?? v(e.loadingText)])]) : !e.loading && !e.items.length && !e.hideNoData ? C("tr", {
        class: "v-data-table-rows-no-data",
        key: "no-data"
      }, [C("td", {
        colspan: n.value.length
      }, [((k = a["no-data"]) == null ? void 0 : k.call(a)) ?? v(e.noDataText)])]) : C(X, null, [e.items.map((y, p) => {
        var S;
        if (y.type === "group") {
          const V = {
            index: p,
            item: y,
            columns: n.value,
            isExpanded: r,
            toggleExpand: i,
            isSelected: s,
            toggleSelect: u,
            toggleGroup: c,
            isGroupOpen: d
          };
          return a["group-header"] ? a["group-header"](V) : h(ac, R({
            key: `group-header_${y.id}`,
            item: y
          }, Ul(t, ":group-header", () => V)), a);
        }
        const m = {
          index: p,
          item: y.raw,
          internalItem: y,
          columns: n.value,
          isExpanded: r,
          toggleExpand: i,
          isSelected: s,
          toggleSelect: u
        }, A = {
          ...m,
          props: R({
            key: `item_${y.key ?? y.index}`,
            onClick: o.value ? () => {
              i(y);
            } : void 0,
            index: p,
            item: y,
            cellProps: e.cellProps,
            mobile: f.value
          }, Ul(t, ":row", () => m), typeof e.rowProps == "function" ? e.rowProps({
            item: m.item,
            index: m.index,
            internalItem: m.internalItem
          }) : e.rowProps)
        };
        return C(X, {
          key: A.props.key
        }, [a.item ? a.item(A) : h(oc, A.props, a), r(y) && ((S = a["expanded-row"]) == null ? void 0 : S.call(a, m))]);
      })]);
    }), {};
  }
}), ii = K({
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  height: [Number, String],
  hover: Boolean,
  striped: {
    type: String,
    default: null,
    validator: (e) => ["even", "odd"].includes(e)
  },
  ...ke(),
  ...bt(),
  ...Ke(),
  ...Ne()
}, "VTable"), ya = ne()({
  name: "VTable",
  props: ii(),
  setup(e, l) {
    let {
      slots: t,
      emit: a
    } = l;
    const {
      themeClasses: n
    } = qe(e), {
      densityClasses: o
    } = Et(e);
    return ie(() => {
      const i = {
        VCheckboxBtn: {
          density: e.density
        }
      };
      return h(e.tag, {
        class: me(["v-table", {
          "v-table--fixed-height": !!e.height,
          "v-table--fixed-header": e.fixedHeader,
          "v-table--fixed-footer": e.fixedFooter,
          "v-table--has-top": !!t.top,
          "v-table--has-bottom": !!t.bottom,
          "v-table--hover": e.hover,
          "v-table--striped-even": e.striped === "even",
          "v-table--striped-odd": e.striped === "odd"
        }, n.value, o.value, e.class]),
        style: Ce(e.style)
      }, {
        default: () => {
          var r, s;
          return [(r = t.top) == null ? void 0 : r.call(t), h(Me, {
            defaults: i
          }, {
            default: () => {
              var u;
              return [t.default ? C("div", {
                class: "v-table__wrapper",
                style: {
                  height: he(e.height)
                }
              }, [C("table", null, [t.default()])]) : (u = t.wrapper) == null ? void 0 : u.call(t)];
            }
          }), (s = t.bottom) == null ? void 0 : s.call(t)];
        }
      });
    }), {};
  }
}), ic = K({
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
function sc(e, l, t, a) {
  const n = e.returnObject ? l : Ct(l, e.itemValue), o = Ct(l, e.itemSelectable, !0), i = a.reduce((r, s) => (s.key != null && (r[s.key] = Ct(l, s.value)), r), {});
  return {
    type: "item",
    key: e.returnObject ? Ct(l, e.itemValue) : n,
    index: t,
    value: n,
    selectable: o,
    columns: i,
    raw: l
  };
}
function rc(e, l, t) {
  return l.map((a, n) => sc(e, a, n, t));
}
function si(e, l) {
  return {
    items: I(() => rc(e, e.items, l.value))
  };
}
function ri(e) {
  let {
    page: l,
    itemsPerPage: t,
    sortBy: a,
    groupBy: n,
    search: o
  } = e;
  const i = ot("VDataTable"), r = () => ({
    page: l.value,
    itemsPerPage: t.value,
    sortBy: a.value,
    groupBy: n.value,
    search: o.value
  });
  let s = null;
  Q(r, (u) => {
    et(s, u) || (s && s.search !== u.search && (l.value = 1), i.emit("update:options", u), s = u);
  }, {
    deep: !0,
    immediate: !0
  });
}
const ui = K({
  ...oi(),
  hideDefaultBody: Boolean,
  hideDefaultFooter: Boolean,
  hideDefaultHeader: Boolean,
  width: [String, Number],
  search: String,
  ...lc(),
  ...Ju(),
  ...zu(),
  ...ic(),
  ...qu(),
  ...Xu(),
  ...Yo(),
  ...ii()
}, "DataTable"), uc = K({
  ...To(),
  ...ui(),
  ...xo(),
  ...Il()
}, "VDataTable");
ne()({
  name: "VDataTable",
  props: uc(),
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
    } = Xo(e), {
      sortBy: o,
      multiSort: i,
      mustSort: r
    } = jo(e), {
      page: s,
      itemsPerPage: u
    } = Bo(e), {
      disableSort: c
    } = el(e), {
      columns: d,
      headers: v,
      sortFunctions: f,
      sortRawFunctions: g,
      filterFunctions: k
    } = Do(e, {
      groupBy: n,
      showSelect: H(() => e.showSelect),
      showExpand: H(() => e.showExpand)
    }), {
      items: y
    } = si(e, d), p = H(() => e.search), {
      filteredItems: m
    } = So(e, y, p, {
      transform: (Z) => Z.columns,
      customKeyFilter: k
    }), {
      toggleSort: A
    } = Ko({
      sortBy: o,
      multiSort: i,
      mustSort: r,
      page: s
    }), {
      sortByWithGroups: S,
      opened: V,
      extractRows: x,
      isGroupOpen: P,
      toggleGroup: b
    } = Zo({
      groupBy: n,
      sortBy: o,
      disableSort: c
    }), {
      sortedItems: _
    } = Zu(e, m, S, {
      transform: (Z) => ({
        ...Z.raw,
        ...Z.columns
      }),
      sortFunctions: f,
      sortRawFunctions: g
    }), {
      flatItems: T
    } = ti(_, n, V), $ = I(() => T.value.length), {
      startIndex: D,
      stopIndex: M,
      pageCount: U,
      setItemsPerPage: j
    } = $o({
      page: s,
      itemsPerPage: u,
      itemsLength: $
    }), {
      paginatedItems: Y
    } = Hu({
      items: T,
      startIndex: D,
      stopIndex: M,
      itemsPerPage: u
    }), ae = I(() => x(Y.value)), {
      isSelected: le,
      select: ce,
      selectAll: B,
      toggleSelect: E,
      someSelected: F,
      allSelected: W
    } = Wo(e, {
      allItems: y,
      currentPage: ae
    }), {
      isExpanded: ve,
      toggleExpand: te
    } = li(e);
    ri({
      page: s,
      itemsPerPage: u,
      sortBy: o,
      groupBy: n,
      search: p
    }), lt({
      VDataTableRows: {
        hideNoData: H(() => e.hideNoData),
        noDataText: H(() => e.noDataText),
        loading: H(() => e.loading),
        loadingText: H(() => e.loadingText)
      }
    });
    const ue = I(() => ({
      page: s.value,
      itemsPerPage: u.value,
      sortBy: o.value,
      pageCount: U.value,
      toggleSort: A,
      setItemsPerPage: j,
      someSelected: F.value,
      allSelected: W.value,
      isSelected: le,
      select: ce,
      selectAll: B,
      toggleSelect: E,
      isExpanded: ve,
      toggleExpand: te,
      isGroupOpen: P,
      toggleGroup: b,
      items: ae.value.map((Z) => Z.raw),
      internalItems: ae.value,
      groupedItems: Y.value,
      columns: d.value,
      headers: v.value
    }));
    return ie(() => {
      const Z = va.filterProps(e), se = ma.filterProps(e), de = ga.filterProps(e), N = ya.filterProps(e);
      return h(ya, R({
        class: ["v-data-table", {
          "v-data-table--show-select": e.showSelect,
          "v-data-table--loading": e.loading
        }, e.class],
        style: e.style
      }, N, {
        fixedHeader: e.fixedHeader || e.sticky
      }), {
        top: () => {
          var J;
          return (J = a.top) == null ? void 0 : J.call(a, ue.value);
        },
        default: () => {
          var J, fe, be, Pe, Oe, De;
          return a.default ? a.default(ue.value) : C(X, null, [(J = a.colgroup) == null ? void 0 : J.call(a, ue.value), !e.hideDefaultHeader && C("thead", {
            key: "thead"
          }, [h(ma, se, a)]), (fe = a.thead) == null ? void 0 : fe.call(a, ue.value), !e.hideDefaultBody && C("tbody", null, [(be = a["body.prepend"]) == null ? void 0 : be.call(a, ue.value), a.body ? a.body(ue.value) : h(ga, R(t, de, {
            items: Y.value
          }), a), (Pe = a["body.append"]) == null ? void 0 : Pe.call(a, ue.value)]), (Oe = a.tbody) == null ? void 0 : Oe.call(a, ue.value), (De = a.tfoot) == null ? void 0 : De.call(a, ue.value)]);
        },
        bottom: () => a.bottom ? a.bottom(ue.value) : !e.hideDefaultFooter && C(X, null, [h(Ot, null, null), h(va, Z, {
          prepend: a["footer.prepend"]
        })])
      });
    }), {};
  }
});
const cc = K({
  itemsLength: {
    type: [Number, String],
    required: !0
  },
  ...To(),
  ...ui(),
  ...Il()
}, "VDataTableServer"), dc = ne()({
  name: "VDataTableServer",
  props: cc(),
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
    } = Xo(e), {
      sortBy: o,
      multiSort: i,
      mustSort: r
    } = jo(e), {
      page: s,
      itemsPerPage: u
    } = Bo(e), {
      disableSort: c
    } = el(e), d = I(() => parseInt(e.itemsLength, 10)), {
      columns: v,
      headers: f
    } = Do(e, {
      groupBy: n,
      showSelect: H(() => e.showSelect),
      showExpand: H(() => e.showExpand)
    }), {
      items: g
    } = si(e, v), {
      toggleSort: k
    } = Ko({
      sortBy: o,
      multiSort: i,
      mustSort: r,
      page: s
    }), {
      opened: y,
      isGroupOpen: p,
      toggleGroup: m,
      extractRows: A
    } = Zo({
      groupBy: n,
      sortBy: o,
      disableSort: c
    }), {
      pageCount: S,
      setItemsPerPage: V
    } = $o({
      page: s,
      itemsPerPage: u,
      itemsLength: d
    }), {
      flatItems: x
    } = ti(g, n, y), {
      isSelected: P,
      select: b,
      selectAll: _,
      toggleSelect: T,
      someSelected: $,
      allSelected: D
    } = Wo(e, {
      allItems: g,
      currentPage: g
    }), {
      isExpanded: M,
      toggleExpand: U
    } = li(e), j = I(() => A(g.value));
    ri({
      page: s,
      itemsPerPage: u,
      sortBy: o,
      groupBy: n,
      search: H(() => e.search)
    }), Ue("v-data-table", {
      toggleSort: k,
      sortBy: o
    }), lt({
      VDataTableRows: {
        hideNoData: H(() => e.hideNoData),
        noDataText: H(() => e.noDataText),
        loading: H(() => e.loading),
        loadingText: H(() => e.loadingText)
      }
    });
    const Y = I(() => ({
      page: s.value,
      itemsPerPage: u.value,
      sortBy: o.value,
      pageCount: S.value,
      toggleSort: k,
      setItemsPerPage: V,
      someSelected: $.value,
      allSelected: D.value,
      isSelected: P,
      select: b,
      selectAll: _,
      toggleSelect: T,
      isExpanded: M,
      toggleExpand: U,
      isGroupOpen: p,
      toggleGroup: m,
      items: j.value.map((ae) => ae.raw),
      internalItems: j.value,
      groupedItems: x.value,
      columns: v.value,
      headers: f.value
    }));
    ie(() => {
      const ae = va.filterProps(e), le = ma.filterProps(e), ce = ga.filterProps(e), B = ya.filterProps(e);
      return h(ya, R({
        class: ["v-data-table", {
          "v-data-table--loading": e.loading
        }, e.class],
        style: e.style
      }, B, {
        fixedHeader: e.fixedHeader || e.sticky
      }), {
        top: () => {
          var E;
          return (E = a.top) == null ? void 0 : E.call(a, Y.value);
        },
        default: () => {
          var E, F, W, ve, te, ue;
          return a.default ? a.default(Y.value) : C(X, null, [(E = a.colgroup) == null ? void 0 : E.call(a, Y.value), !e.hideDefaultHeader && C("thead", {
            key: "thead",
            class: "v-data-table__thead",
            role: "rowgroup"
          }, [h(ma, le, a)]), (F = a.thead) == null ? void 0 : F.call(a, Y.value), !e.hideDefaultBody && C("tbody", {
            class: "v-data-table__tbody",
            role: "rowgroup"
          }, [(W = a["body.prepend"]) == null ? void 0 : W.call(a, Y.value), a.body ? a.body(Y.value) : h(ga, R(t, ce, {
            items: x.value
          }), a), (ve = a["body.append"]) == null ? void 0 : ve.call(a, Y.value)]), (te = a.tbody) == null ? void 0 : te.call(a, Y.value), (ue = a.tfoot) == null ? void 0 : ue.call(a, Y.value)]);
        },
        bottom: () => a.bottom ? a.bottom(Y.value) : !e.hideDefaultFooter && C(X, null, [h(Ot, null, null), h(va, ae, {
          prepend: a["footer.prepend"]
        })])
      });
    });
  }
}), ci = /* @__PURE__ */ Le({
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
    const l = nt(), t = ms(l, "item.", { exclude: ["item.actions", "item.image"] });
    ge("panel"), ge("user");
    const a = e, n = I(() => {
      const i = [];
      return (a.image || l["item.image"]) && i.push({ key: "image", title: "" }), i.concat(
        a.headers.reduce((r, s) => (r.push(
          typeof s == "string" ? { key: s, title: oe(Ni.field(s)) } : { key: s.key, title: oe(s.title) }
        ), r), [])
      );
    });
    function o(i) {
      const r = {
        ...a.list.filters,
        page: i.page,
        page_size: i.itemsPerPage,
        ordering: i.sortBy.map(({ key: s, order: u }) => u == "asc" ? s : `-${s}`)
      };
      a.list.page_size = i.itemsPerPage, a.list.load({ params: r });
    }
    return (i, r) => {
      var s;
      return L(), G(dc, {
        items: a.items,
        "item-index": "id",
        "items-length": a.list.count || a.items.length,
        "items-per-page": a.list.page_size,
        "hide-default-footer": (a.list.count || a.items.length || 0) < a.list.page_size,
        loading: (s = a.list.state) == null ? void 0 : s.isProcessing,
        headers: n.value,
        "no-data-text": w(oe)("lists.empty"),
        class: "align-top-table",
        "onUpdate:options": o
      }, ut({
        "item.actions": O(({ item: u }) => [
          h(w(Ao), {
            button: "",
            item: u,
            edit: a.edit
          }, null, 8, ["item", "edit"]),
          z(i.$slots, "item.actions", {
            item: u,
            dense: !0,
            button: !0
          })
        ]),
        _: 2
      }, [
        w(l)["item.image"] ? {
          name: "item.image",
          fn: O(({ item: u }) => [
            z(i.$slots, "item.image", { item: u }, () => [
              u[a.image] ? (L(), G($t, {
                key: 0,
                src: u[a.image],
                class: "preview",
                cover: "",
                "max-height": "200"
              }, null, 8, ["src"])) : re("", !0)
            ])
          ]),
          key: "0"
        } : void 0,
        _e(w(t), (u, c) => ({
          name: c,
          fn: O((d) => [
            z(i.$slots, c, Be($e(d)))
          ])
        }))
      ]), 1032, ["items", "items-length", "items-per-page", "hide-default-footer", "loading", "headers", "no-data-text"]);
    };
  }
}), vc = { class: "d-flex flex-no-wrap justify-space-between" }, fc = { key: 0 }, mc = { key: 0 }, gc = /* @__PURE__ */ Le({
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
    const l = nt(), t = vt(l, "item.", { exclude: ["item.actions", "item.image"] }), a = e, n = I(() => {
      if (!a.headers)
        return [];
      const i = [];
      for (var r of a.headers)
        r = typeof r == "string" ? { key: r, title: oe("fields." + r) } : { ...r }, r.slot = `item.${r.key}`, i.push(r);
      return i;
    }), o = I(() => {
      var i;
      return /* @__PURE__ */ new Set([
        n.value[0].key,
        (i = n.value[1]) == null ? void 0 : i.key,
        a.image
      ]);
    });
    return We(() => !a.list.length && a.list.load()), (i, r) => (L(), G(Pn, { class: "card-grid" }, {
      default: O(() => [
        (L(!0), ye(X, null, _e(a.items, (s) => {
          var u, c;
          return L(), G(Io, {
            key: s.id,
            density: "compact",
            title: n.value[0].key && s[n.value[0].key],
            subtitle: ((u = n.value[1]) == null ? void 0 : u.key) && s[n.value[1].key]
          }, ut({
            default: O(() => [
              C("div", vc, [
                w(l)["item.image"] || a.image ? (L(), ye("div", fc, [
                  h(xt, {
                    rounded: "0",
                    size: "125"
                  }, {
                    default: O(() => [
                      z(i.$slots, "item.image", { item: s }, () => [
                        h($t, {
                          src: a.image
                        }, null, 8, ["src"])
                      ], !0)
                    ]),
                    _: 2
                  }, 1024)
                ])) : re("", !0),
                C("div", null, [
                  !w(l)["item.default"] && (n.value.length > 2 || w(t).length) ? (L(), G(Po, { key: 0 }, {
                    default: O(() => [
                      C("div", null, [
                        (L(!0), ye(X, null, _e(n.value, (d) => (L(), ye(X, null, [
                          o.value.has(d.key) ? re("", !0) : (L(), ye("div", mc, [
                            h(wl, {
                              text: d.title + ":",
                              class: "mr-2"
                            }, null, 8, ["text"]),
                            z(i.$slots, d.slot, { item: s }, () => [
                              w(Wa.isEmpty)(s[d.key]) ? re("", !0) : (L(), ye(X, { key: 0 }, [
                                Ie(Re(s[d.key]), 1)
                              ], 64))
                            ], !0)
                          ]))
                        ], 64))), 256))
                      ])
                    ]),
                    _: 2
                  }, 1024)) : re("", !0),
                  h(Vo, null, {
                    default: O(() => [
                      h(w(Ao), {
                        button: "",
                        item: s,
                        edit: a.edit,
                        size: "small"
                      }, null, 8, ["item", "edit"]),
                      z(i.$slots, "item.actions", {
                        item: s,
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
            w(l)[n.value[0].slot] ? {
              name: "title",
              fn: O(() => [
                z(i.$slots, n.value[0].slot, { item: s }, void 0, !0)
              ]),
              key: "0"
            } : void 0,
            w(l)[(c = n.value[1]) == null ? void 0 : c.slot] ? {
              name: "subtitle",
              fn: O(() => [
                z(i.$slots, n.value[1].slot, { item: s }, void 0, !0)
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["title", "subtitle"]);
        }), 128))
      ]),
      _: 3
    }));
  }
}), yc = (e, l) => {
  const t = e.__vccOpts || e;
  for (const [a, n] of l)
    t[a] = n;
  return t;
}, di = /* @__PURE__ */ yc(gc, [["__scopeId", "data-v-5bbb1bbb"]]), Aa = {
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
    const l = nt(), t = e;
    let a = q(!1);
    Q(() => t.state.state, (i) => {
      t.delay && i == gs.PROCESSING && (a.value = !1, window.setTimeout(() => {
        a.value = !0;
      }, 5e3));
    });
    const n = I(() => {
      var i;
      return ((i = t.state) == null ? void 0 : i.isProcessing) && (!t.delay || a.value);
    }), o = I(() => {
      var i, r;
      return (r = (i = t.state) == null ? void 0 : i.data) == null ? void 0 : r.messages;
    });
    return (i, r) => (L(), ye(X, null, [
      t.state.isNone && w(l).none ? (L(), G(w(Lt), {
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
      }, 8, ["state", "title"])) : n.value ? (L(), G(w(Lt), {
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
            r[0] || (r[0] = Ie(" Data are being sent to server, please be patient. If this message persist you might wan't to retry. ", -1))
          ])
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isError ? (L(), G(w(Lt), {
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
            r[1] || (r[1] = Ie(" Oups... something wrong happened. ", -1))
          ]),
          z(i.$slots, "error-detail", { state: e.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isOk ? (L(), G(w(Lt), {
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
            r[2] || (r[2] = C("p", null, "Congrats! Data have been updated.", -1))
          ]),
          o.value ? (L(), ye(X, { key: 0 }, [
            h(Ot),
            (L(!0), ye(X, null, _e(o.value, (s) => (L(), ye("p", null, Re(s), 1))), 256))
          ], 64)) : re("", !0),
          z(i.$slots, "ok-detail", { state: e.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : re("", !0),
      z(i.$slots, "default", {
        state: t.state
      })
    ], 64));
  }
}, hc = { class: "text-right" }, Tl = {
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
    return (n, o) => (L(), ye("div", hc, [
      h(pe, {
        color: "error",
        class: "me-2",
        "prepend-icon": a.resetIcon,
        onClick: o[0] || (o[0] = (i) => t("reset")),
        disabled: a.disabled
      }, {
        default: O(() => [
          z(n.$slots, "discard", {}, () => [
            Ie(Re(a.resetLabel || w($a)("actions.discard")), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]),
      a.state.isSending || a.state.isProcessing ? (L(), G(pe, {
        key: 0,
        color: "primary",
        "prepend-icon": a.processingIcon,
        disabled: ""
      }, {
        default: O(() => [
          z(n.$slots, "processing", {}, () => [
            Ie(Re(a.processingLabel || w($a)("actions.saving")), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon"])) : (L(), G(pe, {
        key: 1,
        color: "primary",
        "prepend-icon": a.validateIcon,
        onClick: o[1] || (o[1] = (i) => t("validate")),
        disabled: a.disabled || a.validateDisabled
      }, {
        default: O(() => [
          z(n.$slots, "validate", {}, () => [
            Ie(Re(a.validateLabel || w($a)("actions.save")), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]))
    ]));
  }
}, bc = { key: 0 }, pc = { class: "text-right mt-3" }, wc = {
  __name: "OxLogin",
  props: {
    next: { type: String },
    url: { type: String }
  },
  emits: ["save", "saved"],
  setup(e, { emit: l }) {
    const t = vn("password"), a = e, n = Qe({
      username: "",
      password: ""
    }), o = q(!1), i = Qe(new ys());
    function r(u = !0) {
      bs(n, { username: "", password: "" }), u && i.none();
    }
    async function s() {
      i.processing();
      try {
        const u = await fetch(a.url, {
          method: "POST",
          headers: hs.axiosConfig.headers,
          body: JSON.stringify(n)
        });
        u.status == 200 ? (n.credentials = "", n.password = "", i.ok(await u.json()), a.next && (window.location.href = a.next)) : i.error(await u.json());
      } catch (u) {
        i.ok((u == null ? void 0 : u.message) || u);
      }
    }
    return (u, c) => (L(), ye(X, null, [
      h(w(Aa), { state: i }, {
        none: O(({ state: d }) => [...c[7] || (c[7] = [
          C("p", null, "Please enter your credentials in order too proceed...", -1)
        ])]),
        "ok-detail": O(({ state: d }) => [
          a.next ? (L(), ye("p", bc, [
            c[8] || (c[8] = Ie("You soon will be redirected to ", -1)),
            C("i", null, Re(a.next), 1)
          ])) : re("", !0)
        ]),
        _: 1
      }, 8, ["state"]),
      i.isOk ? re("", !0) : (L(), ye(X, { key: 0 }, [
        h(mt, {
          variant: "underlined",
          label: "Enter login",
          modelValue: n.username,
          "onUpdate:modelValue": c[0] || (c[0] = (d) => n.username = d),
          onKeyup: c[1] || (c[1] = Fl(Te((d) => t.value.focus(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue"]),
        h(mt, {
          variant: "underlined",
          ref: "password",
          label: "Enter password",
          modelValue: n.password,
          "onUpdate:modelValue": c[2] || (c[2] = (d) => n.password = d),
          type: o.value ? "text" : "password",
          "append-icon": o.value ? "mdi-eye" : "mdi-eye-off",
          "onClick:append": c[3] || (c[3] = (d) => o.value = !o.value),
          onKeyup: c[4] || (c[4] = Fl(Te((d) => s(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue", "type", "append-icon"]),
        C("div", pc, [
          z(u.$slots, "default", {
            value: n.password
          }, () => [
            n.username && n.password ? (L(), G(Tl, {
              key: 0,
              "validate-label": "Login!",
              onValidate: c[5] || (c[5] = (d) => s()),
              onReset: c[6] || (c[6] = (d) => r()),
              state: i
            }, null, 8, ["state"])) : re("", !0)
          ])
        ])
      ], 64))
    ], 64));
  }
}, vi = /* @__PURE__ */ Le({
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
    const l = nt(), t = e, a = vt(l, "views."), n = q(!1);
    We(() => {
      n.value = !0;
    }), Ti(() => {
      n.value = !1;
    });
    const o = ge("panels"), i = ge("panel");
    return (r, s) => (L(), ye(X, null, [
      t.state ? (L(), G(Aa, {
        key: 0,
        state: t.state,
        delay: ""
      }, null, 8, ["state"])) : re("", !0),
      w(l).prepend && w(o).panel == w(i).name ? z(r.$slots, "prepend", { key: 1 }) : re("", !0),
      h(Cn, { class: "ma-4" }, {
        default: O(() => [
          (L(), G(Na, {
            to: "#app-bar-sheet-title",
            disabled: !n.value || w(o).panel != t.name
          }, [
            t.icon ? (L(), G(Ve, {
              key: 0,
              icon: t.icon
            }, null, 8, ["icon"])) : re("", !0),
            Ie(" " + Re(t.title) + " ", 1),
            z(r.$slots, "append-title")
          ], 8, ["disabled"])),
          (L(), G(Na, {
            to: "#app-bar-right",
            disabled: !n.value || w(o).panel != t.name
          }, [
            z(r.$slots, "app-bar-right"),
            t.help ? (L(), G(pe, {
              key: 0,
              class: "ml-3",
              href: t.help,
              panels: "new",
              icon: "mdi-information-outline"
            }, null, 8, ["href"])) : re("", !0)
          ], 8, ["disabled"])),
          z(r.$slots, "top"),
          z(r.$slots, "default", {}, () => [
            w(a) ? (L(), G(Xa, {
              key: 0,
              modelValue: w(i).view,
              "onUpdate:modelValue": s[0] || (s[0] = (u) => w(i).view = u)
            }, {
              default: O(() => [
                (L(!0), ye(X, null, _e(w(a), (u, c) => (L(), G(Za, {
                  key: u,
                  value: u
                }, {
                  default: O(() => [
                    z(r.$slots, c)
                  ]),
                  _: 2
                }, 1032, ["value"]))), 128))
              ]),
              _: 3
            }, 8, ["modelValue"])) : re("", !0)
          ]),
          z(r.$slots, "bottom")
        ]),
        _: 3
      }),
      w(l).append && w(o).panel == w(i).name ? z(r.$slots, "append", { key: 2 }) : re("", !0)
    ], 64));
  }
}), fi = /* @__PURE__ */ Le({
  __name: "OxView",
  props: {
    /** default tab title */
    title: String
  },
  setup(e) {
    const l = e, t = q(null), a = nt(), n = vt(a, "tab.", { exclude: ["tab.default"] }), o = vt(a, "window.");
    return (i, r) => w(n) && Object.keys(w(n)).length ? (L(), ye(X, { key: 0 }, [
      h(Mr, {
        modelValue: t.value,
        "onUpdate:modelValue": r[0] || (r[0] = (s) => t.value = s)
      }, {
        default: O(() => [
          w(a).default ? z(i.$slots, "tab", { key: 0 }, () => [
            h(Ya, {
              text: l == null ? void 0 : l.title,
              value: "default"
            }, null, 8, ["text"])
          ]) : re("", !0),
          (L(!0), ye(X, null, _e(w(n), (s, u) => (L(), G(Ya, { value: s }, {
            default: O(() => [
              z(i.$slots, u)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"]),
      h(bl, {
        modelValue: t.value,
        "onUpdate:modelValue": r[1] || (r[1] = (s) => t.value = s)
      }, {
        default: O(() => [
          w(a).default ? (L(), G(ca, {
            key: 0,
            value: "default"
          }, {
            default: O(() => [
              z(i.$slots, "default")
            ]),
            _: 3
          })) : re("", !0),
          (L(!0), ye(X, null, _e(w(o), (s, u) => (L(), G(ca, { value: s }, {
            default: O(() => [
              z(i.$slots, u)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"])
    ], 64)) : z(i.$slots, "default", { key: 1 });
  }
}), mi = /* @__PURE__ */ Le({
  __name: "OxModelEditor",
  props: {
    repo: {},
    initial: {},
    name: {},
    url: {},
    saved: { type: Function }
  },
  setup(e, { expose: l }) {
    const t = q(null), a = ge("user"), n = e, { editor: o, edited: i } = Hi({ props: n }), r = I(() => a.can([o.repo.use, "change", n.initial])), s = I(() => ({
      editor: o,
      edited: i.value,
      form: t.value,
      editable: r.value,
      disabled: !r.value,
      value: o.value,
      model: o.repo.use
    }));
    return Q(() => o.errors && Object.values(o.errors), () => t.value.validate()), l({ editor: o, edited: i, form: t, editable: r }), (u, c) => (L(), ye(X, null, [
      z(u.$slots, "prepend", Be($e(s.value))),
      h(Qa, {
        ref_key: "form",
        ref: t,
        modelValue: w(o).valid,
        "onUpdate:modelValue": c[0] || (c[0] = (d) => w(o).valid = d),
        disabled: !r.value
      }, {
        default: O(() => [
          z(u.$slots, "default", Be($e(s.value)))
        ]),
        _: 3
      }, 8, ["modelValue", "disabled"]),
      z(u.$slots, "append", Be($e(s.value)))
    ], 64));
  }
}), xc = { key: 0 }, Sc = /* @__PURE__ */ Le({
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
  setup(e, { expose: l, emit: t }) {
    const a = t, n = e, o = q(null), i = I(() => {
      const { sendFormData: u, hideValidationBtn: c, ...d } = n;
      return d;
    });
    function r() {
      o.value.editor.reset(n.initial);
    }
    async function s() {
      const u = o.value, c = n.sendFormData ? await u.editor.save(new FormData(u.form.$el)) : await u.editor.save();
      return a("saved", o.value.editor), c;
    }
    return l({
      save: s,
      reset: r,
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
    }), (u, c) => {
      var d;
      return L(), ye(X, null, [
        (d = o.value) != null && d.editor ? (L(), G(Aa, {
          key: 0,
          state: o.value.editor.state
        }, null, 8, ["state"])) : re("", !0),
        h(Pn, { class: "ox-model-edit" }, {
          default: O(() => [
            h(w(mi), R({
              ref_key: "modelEditor",
              ref: o
            }, i.value), {
              prepend: O((v) => [
                n.hideValidationBtn ? re("", !0) : (L(), ye("div", xc, [
                  z(u.$slots, "prepend", R(v, {
                    save: s,
                    reset: r
                  }), () => [
                    v.editable && v.edited ? (L(), G(Tl, {
                      key: 0,
                      onValidate: c[0] || (c[0] = (f) => s()),
                      onReset: c[1] || (c[1] = (f) => r()),
                      state: v.editor.state,
                      "validate-disabled": v.editor.valid === !1
                    }, null, 8, ["state", "validate-disabled"])) : re("", !0)
                  ])
                ]))
              ]),
              default: O((v) => [
                z(u.$slots, "default", R(v, {
                  save: s,
                  reset: r
                }))
              ]),
              append: O((v) => [
                z(u.$slots, "append", R(v, {
                  save: s,
                  reset: r
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
}), kc = /* @__PURE__ */ Le({
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
  setup(e, { expose: l }) {
    const t = nt(), a = vt(t, "views.list."), n = vt(t, "item."), o = vt(t, "views.detail.edit."), i = I(() => !!Object.keys(o).length), r = vn("filters"), s = e, u = ge("context"), c = ge("user"), { panel: d, list: v, items: f, next: g, prev: k } = ge("panel") ?? zi({ props: s }), y = d.panels;
    I(() => {
      var V;
      return u.user.can([d.model, (V = d.value) != null && V.id ? "change" : "add"]);
    });
    const { showFilters: p } = el(d), m = I(() => [
      ...s.headers,
      { key: "actions", title: oe("actions") }
    ]);
    function A(V) {
      V = new s.repo.use(V), d.show({ view: d.view, value: V }), v.load();
    }
    const S = I(() => ({
      panel: d,
      panels: y,
      list: v,
      items: f,
      context: u,
      saved: A,
      value: d.value
    }));
    return Q(() => Object.values(v.filters), () => v.load()), l({ list: v, panel: d, items: f, next: g, prev: k }), (V, x) => (L(), G(w(vi), {
      name: s.name,
      title: w(d).title,
      icon: w(d).icon,
      state: w(v).state,
      index: s.index
    }, ut({
      "app-bar-right": O(() => [
        z(V.$slots, "app-bar-right", Be($e(S.value))),
        w(d).view.startsWith("list.") ? (L(), G(Nl, {
          key: 0,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: O(() => [
            z(V.$slots, "nav.list", Be($e(S.value))),
            h(pe, {
              title: w(oe)("actions.list.reload"),
              "aria-label": w(oe)("actions.list.reload"),
              onClick: x[0] || (x[0] = (P) => w(v).load())
            }, {
              default: O(() => [
                h(Ve, null, {
                  default: O(() => [...x[10] || (x[10] = [
                    Ie("mdi-reload", -1)
                  ])]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["title", "aria-label"]),
            r.value ? (L(), G(pe, {
              key: 0,
              title: w(p) ? w(oe)("filters.hide") : w(oe)("filters.show"),
              "aria-label": w(p) ? w(oe)("filters.hide") : w(oe)("filters.show"),
              onClick: x[1] || (x[1] = (P) => p.value = !w(p)),
              active: w(p)
            }, {
              default: O(() => [
                h(Ve, {
                  icon: r.value.icon
                }, null, 8, ["icon"])
              ]),
              _: 1
            }, 8, ["title", "aria-label", "active"])) : re("", !0)
          ]),
          _: 3
        })) : w(d).view.startsWith("detail.") && w(d).value ? (L(), G(Nl, {
          key: 1,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: O(() => [
            z(V.$slots, "nav.detail", Be($e(S.value))),
            w(d).view == "detail.edit" && w(d).value ? (L(), G(kl, { key: 0 }, {
              activator: O(({ props: P }) => [
                h(pe, R({ "prepend-icon": "mdi-dots-vertical" }, P), {
                  default: O(() => [
                    Ie(Re(w(oe)("actions")), 1)
                  ]),
                  _: 2
                }, 1040)
              ]),
              default: O(() => [
                h(ct, null, {
                  default: O(() => [
                    z(V.$slots, "item.actions", {
                      item: w(d).value
                    })
                  ]),
                  _: 3
                })
              ]),
              _: 3
            })) : re("", !0),
            h(pe, {
              disabled: !w(k),
              title: w(oe)("prev"),
              "aria-label": w(oe)("prev"),
              onClick: x[2] || (x[2] = Te((P) => w(d).show({ view: w(d).view, value: w(k) }), ["stop"]))
            }, {
              default: O(() => [
                h(Ve, { icon: "mdi-chevron-left" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"]),
            h(pe, {
              disabled: !w(g),
              title: w(oe)("next"),
              "aria-label": w(oe)("next"),
              onClick: x[3] || (x[3] = Te((P) => w(d).show({ view: w(d).view, value: w(g) }), ["stop"]))
            }, {
              default: O(() => [
                h(Ve, { icon: "mdi-chevron-right" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"])
          ]),
          _: 3
        })) : re("", !0),
        h(Qi, {
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal",
          mandatory: "",
          modelValue: w(d).view,
          "onUpdate:modelValue": x[9] || (x[9] = (P) => w(d).view = P)
        }, {
          default: O(() => {
            var P;
            return [
              h(pe, {
                value: "list.table",
                onClickCapture: x[4] || (x[4] = Te((b) => w(d).show({ view: "list.table" }), ["stop"])),
                title: w(oe)("panels.nav.table"),
                "aria-label": w(oe)("panels.nav.table")
              }, {
                default: O(() => [
                  h(Ve, null, {
                    default: O(() => [...x[11] || (x[11] = [
                      Ie("mdi-table", -1)
                    ])]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"]),
              h(pe, {
                value: "list.cards",
                onClickCapture: x[5] || (x[5] = Te((b) => w(d).show({ view: "list.cards" }), ["stop"])),
                title: w(oe)("panels.nav.cards"),
                "aria-label": w(oe)("panels.nav.cards")
              }, {
                default: O(() => [
                  h(Ve, null, {
                    default: O(() => [...x[12] || (x[12] = [
                      Ie("mdi-view-grid", -1)
                    ])]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"]),
              w(t)["views.list.kanban"] ? (L(), G(pe, {
                key: 0,
                value: "list.kanban",
                onClickCapture: x[6] || (x[6] = Te((b) => w(d).show({ view: "list.kanban" }), ["stop"])),
                title: w(oe)("panels.nav.kanban"),
                "aria-label": w(oe)("panels.nav.kanban")
              }, {
                default: O(() => [
                  h(Ve, null, {
                    default: O(() => [...x[13] || (x[13] = [
                      Ie("mdi-view-column", -1)
                    ])]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : re("", !0),
              i.value ? (L(), G(pe, {
                key: 1,
                value: "detail.edit",
                onClickCapture: x[7] || (x[7] = Te((b) => w(d).show({ view: "detail.edit", value: w(d).value }), ["stop"])),
                disabled: !((P = w(d).value) != null && P.id) && w(d).view != "detail.edit",
                title: w(oe)("panels.nav.edit"),
                "aria-label": w(oe)("panels.nav.edit")
              }, {
                default: O(() => [
                  w(c).can([w(d).model, "change"]) ? (L(), G(Ve, { key: 0 }, {
                    default: O(() => [...x[14] || (x[14] = [
                      Ie("mdi-pencil", -1)
                    ])]),
                    _: 1
                  })) : (L(), G(Ve, { key: 1 }, {
                    default: O(() => [...x[15] || (x[15] = [
                      Ie("mdi-eye", -1)
                    ])]),
                    _: 1
                  }))
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"])) : re("", !0),
              i.value && w(c).can([w(d).model, "add"]) ? (L(), G(pe, {
                key: 2,
                value: "detail.add",
                onClickCapture: x[8] || (x[8] = Te((b) => w(d).create(), ["stop"])),
                title: w(oe)("panels.nav.add"),
                "aria-label": w(oe)("panels.nav.add")
              }, {
                default: O(() => [
                  h(Ve, null, {
                    default: O(() => [...x[16] || (x[16] = [
                      Ie("mdi-plus-box", -1)
                    ])]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : re("", !0),
              z(V.$slots, "nav.views", Be($e(S.value)))
            ];
          }),
          _: 3
        }, 8, ["modelValue"]),
        z(V.$slots, "app-bar-end", Be($e(S.value)))
      ]),
      top: O(() => [
        s.warning ? (L(), G(Lt, {
          key: 0,
          type: "warning",
          variant: "tonal",
          text: s.warning
        }, null, 8, ["text"])) : re("", !0),
        z(V.$slots, "top"),
        Ye(h(w(ko), {
          ref_key: "filters",
          ref: r,
          search: s.search,
          "teleport-to": "#panel-list-actions"
        }, {
          default: O((P) => [
            z(V.$slots, "list.filters", Be($e(P)))
          ]),
          _: 3
        }, 8, ["search"]), [
          [_t, w(d).view.startsWith("list.") && w(p)]
        ])
      ]),
      _: 2
    }, [
      w(t)["append-title"] ? {
        name: "append-title",
        fn: O(() => [
          z(V.$slots, "append-title", Be($e(S.value)))
        ]),
        key: "0"
      } : void 0,
      w(t).prepend ? {
        name: "prepend",
        fn: O(() => [
          z(V.$slots, "prepend", Be($e(S.value)))
        ]),
        key: "1"
      } : void 0,
      w(t).append ? {
        name: "append",
        fn: O(() => [
          z(V.$slots, "append", Be($e(S.value)))
        ]),
        key: "2"
      } : void 0,
      w(t)["views.list.table"] ? void 0 : {
        name: "views.list.table",
        fn: O(() => [
          h(w(ci), {
            list: w(v),
            items: w(f),
            headers: m.value,
            edit: i.value
          }, ut({ _: 2 }, [
            _e(w(n), (P, b) => ({
              name: b,
              fn: O((_) => [
                z(V.$slots, b, Be($e(_)))
              ])
            }))
          ]), 1032, ["list", "items", "headers", "edit"])
        ]),
        key: "3"
      },
      w(t)["views.list.cards"] ? void 0 : {
        name: "views.list.cards",
        fn: O(() => [
          h(w(di), {
            list: w(v),
            items: w(f),
            edit: i.value,
            headers: s.headers
          }, ut({ _: 2 }, [
            _e(w(n), (P, b) => ({
              name: b,
              fn: O((_) => [
                z(V.$slots, b, Be($e(_)))
              ])
            }))
          ]), 1032, ["list", "items", "edit", "headers"])
        ]),
        key: "4"
      },
      _e(w(a), (P, b) => ({
        name: b,
        fn: O(() => [
          z(V.$slots, b, Be($e(S.value)))
        ])
      })),
      i.value ? {
        name: "views.detail.edit",
        fn: O(() => [
          h(w(fi), {
            title: w(oe)(`models.${w(d).model.entity}`)
          }, ut({ _: 2 }, [
            _e(w(o), (P, b) => ({
              name: P,
              fn: O(() => [
                z(V.$slots, b, Be($e(S.value)))
              ])
            }))
          ]), 1032, ["title"])
        ]),
        key: "5"
      } : void 0
    ]), 1032, ["name", "title", "icon", "state", "index"]));
  }
}), Vc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OxAction: Dt,
  OxActionModelDelete: Ts,
  OxActionPost: _s,
  OxApp: Dr,
  OxAutocomplete: xu,
  OxComponent: Su,
  OxField: Cu,
  OxFormList: Tu,
  OxListCard: di,
  OxListFilters: ko,
  OxListKanban: Mu,
  OxListTable: ci,
  OxLogin: wc,
  OxModelEdit: Sc,
  OxModelEditor: mi,
  OxModelList: Pu,
  OxModelPanel: kc,
  OxPanel: vi,
  OxStateAlert: Aa,
  OxValidationBtn: Tl,
  OxView: fi
}, Symbol.toStringTag, { value: "Module" })), $c = {
  el: "#app",
  delimiters: ["[[", "]]"],
  components: { ...Vc, ...ps }
};
export {
  $c as App,
  Dt as OxAction,
  Ts as OxActionModelDelete,
  _s as OxActionPost,
  Dr as OxApp,
  xu as OxAutocomplete,
  Su as OxComponent,
  Cu as OxField,
  Tu as OxFormList,
  di as OxListCard,
  ko as OxListFilters,
  Mu as OxListKanban,
  ci as OxListTable,
  wc as OxLogin,
  Sc as OxModelEdit,
  mi as OxModelEditor,
  Pu as OxModelList,
  kc as OxModelPanel,
  vi as OxPanel,
  Aa as OxStateAlert,
  Tl as OxValidationBtn,
  fi as OxView
};
//# sourceMappingURL=components.js.map
