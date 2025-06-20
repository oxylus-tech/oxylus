import { inject as ve, computed as I, ref as q, reactive as Qe, toRef as H, shallowRef as ee, onMounted as Ze, provide as ze, useId as ct, onDeactivated as an, onActivated as ni, onBeforeUnmount as dt, createVNode as p, Transition as ea, mergeProps as L, defineComponent as Ge, useAttrs as ga, createElementBlock as pe, createCommentVNode as de, unref as V, openBlock as D, Fragment as J, createBlock as Y, withModifiers as Ie, useSlots as vt, renderSlot as j, normalizeProps as _e, guardReactiveProps as Be, resolveComponent as ln, withCtx as M, createTextVNode as Pe, toDisplayString as Re, renderList as Me, watch as Q, watchEffect as et, onScopeDispose as We, readonly as nn, createElementVNode as C, nextTick as Te, mergeModels as Ja, useModel as el, normalizeStyle as Ve, normalizeClass as fe, effectScope as on, toValue as Tl, toRaw as La, warn as oi, Teleport as Na, withDirectives as Ke, vShow as Tt, onErrorCaptured as ii, createSlots as kt, markRaw as si, onBeforeMount as ui, cloneVNode as ri, h as ci, vModelText as di, onBeforeUpdate as vi, capitalize as fi, toRefs as tl, useTemplateRef as sn, withKeys as _l, onUnmounted as mi } from "vue";
import { useAction as gi, t as oe, filterSlots as bt, useAppContext as yi, usePanels as hi, useQuery as bi, defineAsyncComponent as pi, te as wi, rules as xi, tKeys as Si, useModelEditor as ki, useModelPanel as Vi } from "ox";
import { u as Vt, V as be, a as Ye, b as Ci, c as Ha, d as Dt, e as ya, f as st, g as ha, h as _t, i as un, j as ba, t as Pi, k as ie, l as pa, m as Fe, n as Ue, o as wt, p as Lt, q as Se, r as Nt, s as ut, v as Ii, w as rn, x as Ht, y as zt, z as Bl, A as Ia, B as Aa, C as El, D as $l, E as Wt, F as Ai, M as wa, G as cn, H as al, I as Ut, J as dn, K as vn, L as ll, N as Ti, O as Kt, P as nl, Q as ol, R as il, S as Ol, T as ke, U as fn, W as Bt, X as ft, Y as Ct, Z as mn, _ as _i, $ as gn, a0 as yn, a1 as Pt, a2 as hn, a3 as bn, a4 as sl, a5 as ul, a6 as rl, a7 as ta, a8 as pn, a9 as Bi, aa as Ei, ab as $i, ac as Oi, ad as wn, ae as $t, af as Fi, ag as Fl, ah as Ri } from "./VContainer-DbJPgM9n.js";
import { k as cl, l as xn, n as K, o as ye, q as lt, r as Mi, s as ne, C as Sn, u as qe, t as Je, v as Di, w as nt, x as je, y as mt, z as we, A as at, B as Le, E as Gt, F as kn, G as Li, H as it, J as Vn, i as He, K as Rl, M as It, N as Ni, O as gt, P as Cn, Q as ot, R as xe, S as za, U as Hi, V as Xe, W as xa, X as Ne, Y as dl, Z as Pn, _ as zi, $ as Wi, a0 as Ta, a1 as Ui, a2 as Ki, a3 as St, a4 as Gi, a5 as In, a6 as aa, a7 as ji, c as qt, a8 as Ml, a9 as Yi, aa as la, ab as Xt } from "./theme-BVAWnHOc.js";
import { Q as qi, l as _a, N as Xi, E as Zi, t as Ba, S as Qi, o as Ji, r as es } from "./index-BcsriIRW.js";
import "axios";
import { components as ts } from "ox/vendor";
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
function Dl(e, n) {
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
function An(e) {
  return Array.isArray(e) ? new tt({
    x: e[0],
    y: e[1],
    width: 0,
    height: 0
  }) : e.getBoundingClientRect();
}
function as(e) {
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
    let l, o, i, s, u;
    if (a.startsWith("matrix3d("))
      l = a.slice(9, -1).split(/, /), o = Number(l[0]), i = Number(l[5]), s = Number(l[12]), u = Number(l[13]);
    else if (a.startsWith("matrix("))
      l = a.slice(7, -1).split(/, /), o = Number(l[0]), i = Number(l[3]), s = Number(l[4]), u = Number(l[5]);
    else
      return new tt(n);
    const c = t.transformOrigin, r = n.x - s - (1 - o) * parseFloat(c), d = n.y - u - (1 - i) * parseFloat(c.slice(c.indexOf(" ") + 1)), m = o ? n.width / o : e.offsetWidth + 1, v = i ? n.height / i : e.offsetHeight + 1;
    return new tt({
      x: r,
      y: d,
      width: m,
      height: v
    });
  } else
    return new tt(n);
}
function ht(e, n, t) {
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
const Qt = /* @__PURE__ */ new WeakMap();
function ls(e, n) {
  Object.keys(n).forEach((t) => {
    if (cl(t)) {
      const a = xn(t), l = Qt.get(e);
      if (n[t] == null)
        l == null || l.forEach((o) => {
          const [i, s] = o;
          i === a && (e.removeEventListener(a, s), l.delete(o));
        });
      else if (!l || ![...l].some((o) => o[0] === a && o[1] === n[t])) {
        e.addEventListener(a, n[t]);
        const o = l || /* @__PURE__ */ new Set();
        o.add([a, n[t]]), Qt.has(e) || Qt.set(e, o);
      }
    } else
      n[t] == null ? e.removeAttribute(t) : e.setAttribute(t, n[t]);
  });
}
function ns(e, n) {
  Object.keys(n).forEach((t) => {
    if (cl(t)) {
      const a = xn(t), l = Qt.get(e);
      l == null || l.forEach((o) => {
        const [i, s] = o;
        i === a && (e.removeEventListener(a, s), l.delete(o));
      });
    } else
      e.removeAttribute(t);
  });
}
function Tn(e) {
  if (typeof e.getRootNode != "function") {
    for (; e.parentNode; ) e = e.parentNode;
    return e !== document ? null : document;
  }
  const n = e.getRootNode();
  return n !== document && n.getRootNode({
    composed: !0
  }) !== document ? null : n;
}
const Ot = "cubic-bezier(0.4, 0, 0.2, 1)", os = "cubic-bezier(0.0, 0, 0.2, 1)", is = "cubic-bezier(0.4, 0, 1, 1)";
function Ll(e, n, t) {
  return Object.keys(e).filter((a) => cl(a) && a.endsWith(n)).reduce((a, l) => (a[l.slice(0, -n.length)] = (o) => e[l](o, t(o)), a), {});
}
function _n(e) {
  let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  for (; e; ) {
    if (n ? ss(e) : fl(e)) return e;
    e = e.parentElement;
  }
  return document.scrollingElement;
}
function na(e, n) {
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
function ss(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const n = window.getComputedStyle(e);
  return ["scroll", "auto"].includes(n.overflowY);
}
function us(e) {
  for (; e; ) {
    if (window.getComputedStyle(e).position === "fixed")
      return !0;
    e = e.offsetParent;
  }
  return !1;
}
const Ft = Symbol.for("vuetify:layout"), Bn = Symbol.for("vuetify:layout-item"), Nl = 1e3, rs = K({
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
function $n() {
  const e = ve(Ft);
  if (!e) throw new Error("[Vuetify] Could not find injected layout");
  return {
    getLayoutItem: e.getLayoutItem,
    mainRect: e.mainRect,
    mainStyles: e.mainStyles
  };
}
function On(e) {
  const n = ve(Ft);
  if (!n) throw new Error("[Vuetify] Could not find injected layout");
  const t = e.id ?? `layout-item-${ct()}`, a = lt("useLayoutItem");
  ze(Bn, {
    id: t
  });
  const l = ee(!1);
  an(() => l.value = !0), ni(() => l.value = !1);
  const {
    layoutItemStyles: o,
    layoutItemScrimStyles: i
  } = n.register(a, {
    ...e,
    active: I(() => l.value ? !1 : e.active.value),
    id: t
  });
  return dt(() => n.unregister(t)), {
    layoutItemStyles: o,
    layoutRect: n.layoutRect,
    layoutItemScrimStyles: i
  };
}
const cs = (e, n, t, a) => {
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
    const s = n.get(i), u = t.get(i), c = a.get(i);
    if (!s || !u || !c) continue;
    const r = {
      ...l,
      [s.value]: parseInt(l[s.value], 10) + (c.value ? parseInt(u.value, 10) : 0)
    };
    o.push({
      id: i,
      layer: r
    }), l = r;
  }
  return o;
};
function ds(e) {
  const n = ve(Ft, null), t = I(() => n ? n.rootZIndex.value - 100 : Nl), a = q([]), l = Qe(/* @__PURE__ */ new Map()), o = Qe(/* @__PURE__ */ new Map()), i = Qe(/* @__PURE__ */ new Map()), s = Qe(/* @__PURE__ */ new Map()), u = Qe(/* @__PURE__ */ new Map()), {
    resizeRef: c,
    contentRect: r
  } = Vt(), d = I(() => {
    const w = /* @__PURE__ */ new Map(), P = e.overlaps ?? [];
    for (const b of P.filter((B) => B.includes(":"))) {
      const [B, T] = b.split(":");
      if (!a.value.includes(B) || !a.value.includes(T)) continue;
      const E = l.get(B), R = l.get(T), F = o.get(B), z = o.get(T);
      !E || !R || !F || !z || (w.set(T, {
        position: E.value,
        amount: parseInt(F.value, 10)
      }), w.set(B, {
        position: R.value,
        amount: -parseInt(z.value, 10)
      }));
    }
    return w;
  }), m = I(() => {
    const w = [...new Set([...i.values()].map((b) => b.value))].sort((b, B) => b - B), P = [];
    for (const b of w) {
      const B = a.value.filter((T) => {
        var E;
        return ((E = i.get(T)) == null ? void 0 : E.value) === b;
      });
      P.push(...B);
    }
    return cs(P, l, o, s);
  }), v = I(() => !Array.from(u.values()).some((w) => w.value)), f = I(() => m.value[m.value.length - 1].layer), x = H(() => ({
    "--v-layout-left": ye(f.value.left),
    "--v-layout-right": ye(f.value.right),
    "--v-layout-top": ye(f.value.top),
    "--v-layout-bottom": ye(f.value.bottom),
    ...v.value ? void 0 : {
      transition: "none"
    }
  })), y = I(() => m.value.slice(1).map((w, P) => {
    let {
      id: b
    } = w;
    const {
      layer: B
    } = m.value[P], T = o.get(b), E = l.get(b);
    return {
      id: b,
      ...B,
      size: Number(T.value),
      position: E.value
    };
  })), h = (w) => y.value.find((P) => P.id === w), g = lt("createLayout"), A = ee(!1);
  Ze(() => {
    A.value = !0;
  }), ze(Ft, {
    register: (w, P) => {
      let {
        id: b,
        order: B,
        position: T,
        layoutSize: E,
        elementSize: R,
        active: F,
        disableTransitions: z,
        absolute: W
      } = P;
      i.set(b, B), l.set(b, T), o.set(b, E), s.set(b, F), z && u.set(b, z);
      const te = Mi(Bn, g == null ? void 0 : g.vnode).indexOf(w);
      te > -1 ? a.value.splice(te, 0, b) : a.value.push(b);
      const ae = I(() => y.value.findIndex((O) => O.id === b)), ue = I(() => t.value + m.value.length * 2 - ae.value * 2), _ = I(() => {
        const O = T.value === "left" || T.value === "right", U = T.value === "right", he = T.value === "bottom", le = R.value ?? E.value, se = le === 0 ? "%" : "px", X = {
          [T.value]: 0,
          zIndex: ue.value,
          transform: `translate${O ? "X" : "Y"}(${(F.value ? 0 : -(le === 0 ? 100 : le)) * (U || he ? -1 : 1)}${se})`,
          position: W.value || t.value !== Nl ? "absolute" : "fixed",
          ...v.value ? void 0 : {
            transition: "none"
          }
        };
        if (!A.value) return X;
        const re = y.value[ae.value];
        if (!re) throw new Error(`[Vuetify] Could not find layout item "${b}"`);
        const me = d.value.get(b);
        return me && (re[me.position] += me.amount), {
          ...X,
          height: O ? `calc(100% - ${re.top}px - ${re.bottom}px)` : R.value ? `${R.value}px` : void 0,
          left: U ? void 0 : `${re.left}px`,
          right: U ? `${re.right}px` : void 0,
          top: T.value !== "bottom" ? `${re.top}px` : void 0,
          bottom: T.value !== "top" ? `${re.bottom}px` : void 0,
          width: O ? R.value ? `${R.value}px` : void 0 : `calc(100% - ${re.left}px - ${re.right}px)`
        };
      }), $ = I(() => ({
        zIndex: ue.value - 1
      }));
      return {
        layoutItemStyles: _,
        layoutItemScrimStyles: $,
        zIndex: ue
      };
    },
    unregister: (w) => {
      i.delete(w), l.delete(w), o.delete(w), s.delete(w), u.delete(w), a.value = a.value.filter((P) => P !== w);
    },
    mainRect: f,
    mainStyles: x,
    getLayoutItem: h,
    items: y,
    layoutRect: r,
    rootZIndex: t
  });
  const k = H(() => ["v-layout", {
    "v-layout--full-height": e.fullHeight
  }]), S = H(() => ({
    zIndex: n ? t.value : void 0,
    position: n ? "relative" : void 0,
    overflow: n ? "hidden" : void 0
  }));
  return {
    layoutClasses: k,
    layoutStyles: S,
    getLayoutItem: h,
    items: y,
    layoutRect: r,
    layoutRef: c
  };
}
const vs = K({
  target: [Object, Array]
}, "v-dialog-transition"), Ea = /* @__PURE__ */ new WeakMap(), Fn = ne()({
  name: "VDialogTransition",
  props: vs(),
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
        await new Promise((f) => requestAnimationFrame(f)), await new Promise((f) => requestAnimationFrame(f)), l.style.visibility = "";
        const i = zl(e.target, l), {
          x: s,
          y: u,
          sx: c,
          sy: r,
          speed: d
        } = i;
        Ea.set(l, i);
        const m = ht(l, [{
          transform: `translate(${s}px, ${u}px) scale(${c}, ${r})`,
          opacity: 0
        }, {}], {
          duration: 225 * d,
          easing: os
        });
        (v = Hl(l)) == null || v.forEach((f) => {
          ht(f, [{
            opacity: 0
          }, {
            opacity: 0,
            offset: 0.33
          }, {}], {
            duration: 225 * 2 * d,
            easing: Ot
          });
        }), m.finished.then(() => o());
      },
      onAfterEnter(l) {
        l.style.removeProperty("pointer-events");
      },
      onBeforeLeave(l) {
        l.style.pointerEvents = "none";
      },
      async onLeave(l, o) {
        var v;
        await new Promise((f) => requestAnimationFrame(f));
        let i;
        !Ea.has(l) || Array.isArray(e.target) || e.target.offsetParent || e.target.getClientRects().length ? i = zl(e.target, l) : i = Ea.get(l);
        const {
          x: s,
          y: u,
          sx: c,
          sy: r,
          speed: d
        } = i;
        ht(l, [{}, {
          transform: `translate(${s}px, ${u}px) scale(${c}, ${r})`,
          opacity: 0
        }], {
          duration: 125 * d,
          easing: is
        }).finished.then(() => o()), (v = Hl(l)) == null || v.forEach((f) => {
          ht(f, [{}, {
            opacity: 0,
            offset: 0.2
          }, {
            opacity: 0
          }], {
            duration: 125 * 2 * d,
            easing: Ot
          });
        });
      },
      onAfterLeave(l) {
        l.style.removeProperty("pointer-events");
      }
    };
    return () => e.target ? p(ea, L({
      name: "dialog-transition"
    }, a, {
      css: !1
    }), t) : p(ea, {
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
  const t = An(e), a = vl(n), [l, o] = getComputedStyle(n).transformOrigin.split(" ").map((h) => parseFloat(h)), [i, s] = getComputedStyle(n).getPropertyValue("--v-overlay-anchor-origin").split(" ");
  let u = t.left + t.width / 2;
  i === "left" || s === "left" ? u -= t.width / 2 : (i === "right" || s === "right") && (u += t.width / 2);
  let c = t.top + t.height / 2;
  i === "top" || s === "top" ? c -= t.height / 2 : (i === "bottom" || s === "bottom") && (c += t.height / 2);
  const r = t.width / a.width, d = t.height / a.height, m = Math.max(1, r, d), v = r / m || 0, f = d / m || 0, x = a.width * a.height / (window.innerWidth * window.innerHeight), y = x > 0.12 ? Math.min(1.5, (x - 0.12) * 10 + 1) : 1;
  return {
    x: u - (l + a.left),
    y: c - (o + a.top),
    sx: v,
    sy: f,
    speed: y
  };
}
const oa = /* @__PURE__ */ Ge({
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
    const t = e, a = ga(), l = n, o = ve("user"), { run: i, processing: s, allowed: u } = gi({ user: o, emits: l, props: t });
    return (c, r) => V(u) ? (D(), pe(J, { key: 0 }, [
      t.button ? (D(), Y(be, L({
        key: 0,
        variant: "text"
      }, V(a), {
        disabled: V(s),
        color: t.color,
        icon: t.icon,
        title: t.title,
        "aria-label": t.title,
        onClick: Ie(V(i), ["stop"])
      }), null, 16, ["disabled", "color", "icon", "title", "aria-label", "onClick"])) : (D(), Y(Ye, L({ key: 1 }, V(a), {
        title: t.title,
        "base-color": t.color,
        "prepend-icon": t.icon,
        disabled: V(s),
        onClick: Ie(V(i), ["stop"])
      }), null, 16, ["title", "base-color", "prepend-icon", "disabled", "onClick"]))
    ], 64)) : de("", !0);
  }
}), fs = /* @__PURE__ */ Ge({
  __name: "OxActionModelDelete",
  props: {
    item: {}
  },
  setup(e) {
    const n = ve("panel"), t = ve("repos"), a = ga(), l = e;
    async function o(i, s) {
      return await t[s.constructor.entity].api().delete(s.$url(), { delete: l.item.id });
    }
    return (i, s) => (D(), Y(oa, L(V(a), {
      item: l.item,
      icon: "mdi-delete",
      color: "error",
      title: V(oe)("actions.delete"),
      confirm: V(oe)("actions.delete.confirm"),
      permission: [l.item.constructor, "delete"],
      run: o,
      onCompleted: s[0] || (s[0] = (u) => {
        var c;
        return (c = V(n)) == null ? void 0 : c.show({ view: V(n).index });
      })
    }), null, 16, ["item", "title", "confirm", "permission"]));
  }
}), ms = {
  __name: "OxActions",
  props: {
    // Action's Props
    value: Object,
    dense: { type: Boolean, default: !1 },
    button: { type: Boolean, default: !1 },
    exclude: { type: Array }
  },
  setup(e) {
    vt();
    const n = e;
    return (t, a) => (D(), pe(J, null, [
      j(t.$slots, "before", _e(Be(n))),
      j(t.$slots, "default", _e(Be(n))),
      j(t.$slots, "after", _e(Be(n)))
    ], 64));
  }
}, gs = /* @__PURE__ */ Ge({
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
    const n = e;
    q(null);
    const t = ve("user"), a = ve("panels");
    I(() => !n.auto || panel.name == n.name);
    function l(i) {
      return i.permissions && !t.can(i.permissions) ? !1 : i.items ? i.items.some((s) => l(s)) : !0;
    }
    function o() {
      const i = { panel: n.name, href: n.url };
      a.show(i);
    }
    return (i, s) => {
      const u = ln("ox-app-nav-item", !0);
      return l(n) ? (D(), pe(J, { key: 0 }, [
        n.type == "subheader" ? (D(), pe(J, { key: 0 }, [
          p(Ci, null, {
            default: M(() => [
              Pe(Re(n.title), 1)
            ]),
            _: 1
          }),
          n.items ? (D(!0), pe(J, { key: 0 }, Me(n.items, (c) => (D(), Y(u, L({ ref_for: !0 }, c), null, 16))), 256)) : de("", !0)
        ], 64)) : n.type == "group" ? (D(), Y(Ha, {
          key: 1,
          value: n.name
        }, {
          activator: M(({ props: c }) => [
            p(Ye, L(c, {
              title: n.title,
              "prepend-icon": n.icon
            }), null, 16, ["title", "prepend-icon"])
          ]),
          default: M(() => [
            (D(!0), pe(J, null, Me(n.items, (c, r) => (D(), Y(u, L({
              key: r,
              ref_for: !0
            }, c), null, 16))), 128))
          ]),
          _: 1
        }, 8, ["value"])) : n.type == "divider" ? (D(), Y(Dt, { key: 2 })) : (D(), Y(Ye, {
          key: 3,
          active: V(a).panel == n.name,
          value: n.name,
          "prepend-icon": n.icon,
          title: n.title,
          onClick: Ie(o, ["stop"])
        }, null, 8, ["active", "value", "prepend-icon", "title"]))
      ], 64)) : de("", !0);
    };
  }
});
function ys(e) {
  let {
    rootEl: n,
    isSticky: t,
    layoutItemStyles: a
  } = e;
  const l = ee(!1), o = ee(0), i = I(() => {
    const c = typeof l.value == "boolean" ? "top" : l.value;
    return [t.value ? {
      top: "auto",
      bottom: "auto",
      height: void 0
    } : void 0, l.value ? {
      [c]: ye(o.value)
    } : {
      top: a.value.top
    }];
  });
  Ze(() => {
    Q(t, (c) => {
      c ? window.addEventListener("scroll", u, {
        passive: !0
      }) : window.removeEventListener("scroll", u);
    }, {
      immediate: !0
    });
  }), dt(() => {
    window.removeEventListener("scroll", u);
  });
  let s = 0;
  function u() {
    const c = s > window.scrollY ? "up" : "down", r = n.value.getBoundingClientRect(), d = parseFloat(a.value.top ?? 0), m = window.scrollY - Math.max(0, o.value - d), v = r.height + Math.max(o.value, d) - window.scrollY - window.innerHeight, f = parseFloat(getComputedStyle(n.value).getPropertyValue("--v-body-scroll-y")) || 0;
    r.height < window.innerHeight - d ? (l.value = "top", o.value = d) : c === "up" && l.value === "bottom" || c === "down" && l.value === "top" ? (o.value = window.scrollY + r.top - f, l.value = !0) : c === "down" && v <= 0 ? (o.value = 0, l.value = "bottom") : c === "up" && m <= 0 && (f ? l.value !== "top" && (o.value = -m + f + d, l.value = "top") : (o.value = r.top + m, l.value = "top")), s = window.scrollY;
  }
  return {
    isStuck: l,
    stickyStyles: i
  };
}
const hs = 100, bs = 20;
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
function ps() {
  const e = {};
  function n(l) {
    Array.from(l.changedTouches).forEach((o) => {
      (e[o.identifier] ?? (e[o.identifier] = new Sn(bs))).push([l.timeStamp, o]);
    });
  }
  function t(l) {
    Array.from(l.changedTouches).forEach((o) => {
      delete e[o.identifier];
    });
  }
  function a(l) {
    var c;
    const o = (c = e[l]) == null ? void 0 : c.values().reverse();
    if (!o)
      throw new Error(`No samples for touch id ${l}`);
    const i = o[0], s = [], u = [];
    for (const r of o) {
      if (i[0] - r[0] > hs) break;
      s.push({
        t: r[0],
        d: r[1].clientX
      }), u.push({
        t: r[0],
        d: r[1].clientY
      });
    }
    return {
      x: Ul(s),
      y: Ul(u),
      get direction() {
        const {
          x: r,
          y: d
        } = this, [m, v] = [Math.abs(r), Math.abs(d)];
        return m > v && r >= 0 ? "right" : m > v && r <= 0 ? "left" : v > m && d >= 0 ? "down" : v > m && d <= 0 ? "up" : ws();
      }
    };
  }
  return {
    addMovement: n,
    endTouch: t,
    getVelocity: a
  };
}
function ws() {
  throw new Error();
}
function xs(e) {
  let {
    el: n,
    isActive: t,
    isTemporary: a,
    width: l,
    touchless: o,
    position: i
  } = e;
  Ze(() => {
    window.addEventListener("touchstart", g, {
      passive: !0
    }), window.addEventListener("touchmove", A, {
      passive: !1
    }), window.addEventListener("touchend", k, {
      passive: !0
    });
  }), dt(() => {
    window.removeEventListener("touchstart", g), window.removeEventListener("touchmove", A), window.removeEventListener("touchend", k);
  });
  const s = I(() => ["left", "right"].includes(i.value)), {
    addMovement: u,
    endTouch: c,
    getVelocity: r
  } = ps();
  let d = !1;
  const m = ee(!1), v = ee(0), f = ee(0);
  let x;
  function y(w, P) {
    return (i.value === "left" ? w : i.value === "right" ? document.documentElement.clientWidth - w : i.value === "top" ? w : i.value === "bottom" ? document.documentElement.clientHeight - w : xt()) - (P ? l.value : 0);
  }
  function h(w) {
    let P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    const b = i.value === "left" ? (w - f.value) / l.value : i.value === "right" ? (document.documentElement.clientWidth - w - f.value) / l.value : i.value === "top" ? (w - f.value) / l.value : i.value === "bottom" ? (document.documentElement.clientHeight - w - f.value) / l.value : xt();
    return P ? Je(b) : b;
  }
  function g(w) {
    if (o.value) return;
    const P = w.changedTouches[0].clientX, b = w.changedTouches[0].clientY, B = 25, T = i.value === "left" ? P < B : i.value === "right" ? P > document.documentElement.clientWidth - B : i.value === "top" ? b < B : i.value === "bottom" ? b > document.documentElement.clientHeight - B : xt(), E = t.value && (i.value === "left" ? P < l.value : i.value === "right" ? P > document.documentElement.clientWidth - l.value : i.value === "top" ? b < l.value : i.value === "bottom" ? b > document.documentElement.clientHeight - l.value : xt());
    (T || E || t.value && a.value) && (x = [P, b], f.value = y(s.value ? P : b, t.value), v.value = h(s.value ? P : b), d = f.value > -20 && f.value < 80, c(w), u(w));
  }
  function A(w) {
    const P = w.changedTouches[0].clientX, b = w.changedTouches[0].clientY;
    if (d) {
      if (!w.cancelable) {
        d = !1;
        return;
      }
      const T = Math.abs(P - x[0]), E = Math.abs(b - x[1]);
      (s.value ? T > E && T > 3 : E > T && E > 3) ? (m.value = !0, d = !1) : (s.value ? E : T) > 3 && (d = !1);
    }
    if (!m.value) return;
    w.preventDefault(), u(w);
    const B = h(s.value ? P : b, !1);
    v.value = Math.max(0, Math.min(1, B)), B > 1 ? f.value = y(s.value ? P : b, !0) : B < 0 && (f.value = y(s.value ? P : b, !1));
  }
  function k(w) {
    if (d = !1, !m.value) return;
    u(w), m.value = !1;
    const P = r(w.changedTouches[0].identifier), b = Math.abs(P.x), B = Math.abs(P.y);
    (s.value ? b > B && b > 400 : B > b && B > 3) ? t.value = P.direction === ({
      left: "right",
      right: "left",
      top: "down",
      bottom: "up"
    }[i.value] || xt()) : t.value = v.value > 0.5;
  }
  const S = I(() => m.value ? {
    transform: i.value === "left" ? `translateX(calc(-100% + ${v.value * l.value}px))` : i.value === "right" ? `translateX(calc(100% - ${v.value * l.value}px))` : i.value === "top" ? `translateY(calc(-100% + ${v.value * l.value}px))` : i.value === "bottom" ? `translateY(calc(100% - ${v.value * l.value}px))` : xt(),
    transition: "none"
  } : void 0);
  return qe(m, () => {
    var b, B;
    const w = ((b = n.value) == null ? void 0 : b.style.transform) ?? null, P = ((B = n.value) == null ? void 0 : B.style.transition) ?? null;
    et(() => {
      var T, E, R, F;
      (E = n.value) == null || E.style.setProperty("transform", ((T = S.value) == null ? void 0 : T.transform) || "none"), (F = n.value) == null || F.style.setProperty("transition", ((R = S.value) == null ? void 0 : R.transition) || null);
    }), We(() => {
      var T, E;
      (T = n.value) == null || T.style.setProperty("transform", w), (E = n.value) == null || E.style.setProperty("transition", P);
    });
  }), {
    isDragging: m,
    dragProgress: v,
    dragStyles: S
  };
}
function xt() {
  throw new Error();
}
const Rn = K({
  closeDelay: [Number, String],
  openDelay: [Number, String]
}, "delay");
function Mn(e, n) {
  let t = () => {
  };
  function a(i) {
    t == null || t();
    const s = Number(i ? e.openDelay : e.closeDelay);
    return new Promise((u) => {
      t = Di(s, () => {
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
function jt() {
  const n = lt("useScopeId").vnode.scopeId;
  return {
    scopeId: n ? {
      [n]: ""
    } : void 0
  };
}
const Ss = ["start", "end", "left", "right", "top", "bottom"], ks = K({
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
    validator: (e) => Ss.includes(e)
  },
  sticky: Boolean,
  ...Nt(),
  ...Se(),
  ...Rn(),
  ...Gt({
    mobile: null
  }),
  ...Lt(),
  ...En(),
  ...wt(),
  ...Ue({
    tag: "nav"
  }),
  ...Le()
}, "VNavigationDrawer"), Vs = ne()({
  name: "VNavigationDrawer",
  props: ks(),
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
    } = nt(), {
      themeClasses: i
    } = je(e), {
      borderClasses: s
    } = ya(e), {
      backgroundColorClasses: u,
      backgroundColorStyles: c
    } = st(() => e.color), {
      elevationClasses: r
    } = ha(e), {
      displayClasses: d,
      mobile: m
    } = mt(e), {
      roundedClasses: v
    } = _t(e), f = un(), x = we(e, "modelValue", null, (_) => !!_), {
      ssrBootStyles: y
    } = ba(), {
      scopeId: h
    } = jt(), g = q(), A = ee(!1), {
      runOpenDelay: k,
      runCloseDelay: S
    } = Mn(e, (_) => {
      A.value = _;
    }), w = I(() => e.rail && e.expandOnHover && A.value ? Number(e.width) : Number(e.rail ? e.railWidth : e.width)), P = I(() => Pi(e.location, o.value)), b = H(() => e.persistent), B = I(() => !e.permanent && (m.value || e.temporary)), T = I(() => e.sticky && !B.value && P.value !== "bottom");
    qe(() => e.expandOnHover && e.rail != null, () => {
      Q(A, (_) => a("update:rail", !_));
    }), qe(() => !e.disableResizeWatcher, () => {
      Q(B, (_) => !e.permanent && Te(() => x.value = !_));
    }), qe(() => !e.disableRouteWatcher && !!f, () => {
      Q(f.currentRoute, () => B.value && (x.value = !1));
    }), Q(() => e.permanent, (_) => {
      _ && (x.value = !0);
    }), e.modelValue == null && !B.value && (x.value = e.permanent || !m.value);
    const {
      isDragging: E,
      dragProgress: R
    } = xs({
      el: g,
      isActive: x,
      isTemporary: B,
      width: w,
      touchless: H(() => e.touchless),
      position: P
    }), F = I(() => {
      const _ = B.value ? 0 : e.rail && e.expandOnHover ? Number(e.railWidth) : w.value;
      return E.value ? _ * R.value : _;
    }), {
      layoutItemStyles: z,
      layoutItemScrimStyles: W
    } = On({
      id: e.name,
      order: I(() => parseInt(e.order, 10)),
      position: P,
      layoutSize: F,
      elementSize: w,
      active: nn(x),
      disableTransitions: H(() => E.value),
      absolute: I(() => (
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        e.absolute || T.value && typeof G.value != "string"
      ))
    }), {
      isStuck: G,
      stickyStyles: te
    } = ys({
      rootEl: g,
      isSticky: T,
      layoutItemStyles: z
    }), ae = st(() => typeof e.scrim == "string" ? e.scrim : null), ue = I(() => ({
      ...E.value ? {
        opacity: R.value * 0.2,
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
      return C(J, null, [p(e.tag, L({
        ref: g,
        onMouseenter: k,
        onMouseleave: S,
        class: ["v-navigation-drawer", `v-navigation-drawer--${P.value}`, {
          "v-navigation-drawer--expand-on-hover": e.expandOnHover,
          "v-navigation-drawer--floating": e.floating,
          "v-navigation-drawer--is-hovering": A.value,
          "v-navigation-drawer--rail": e.rail,
          "v-navigation-drawer--temporary": B.value,
          "v-navigation-drawer--persistent": b.value,
          "v-navigation-drawer--active": x.value,
          "v-navigation-drawer--sticky": T.value
        }, i.value, u.value, s.value, d.value, r.value, v.value, e.class],
        style: [c.value, z.value, y.value, te.value, e.style]
      }, h, t), {
        default: () => {
          var $, O, U;
          return [_ && C("div", {
            key: "image",
            class: "v-navigation-drawer__img"
          }, [l.image ? p(Fe, {
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
          }, l.image) : p(pa, {
            key: "image-img",
            alt: "",
            cover: !0,
            height: "inherit",
            src: e.image
          }, null)]), l.prepend && C("div", {
            class: "v-navigation-drawer__prepend"
          }, [($ = l.prepend) == null ? void 0 : $.call(l)]), C("div", {
            class: "v-navigation-drawer__content"
          }, [(O = l.default) == null ? void 0 : O.call(l)]), l.append && C("div", {
            class: "v-navigation-drawer__append"
          }, [(U = l.append) == null ? void 0 : U.call(l)])];
        }
      }), p(ea, {
        name: "fade-transition"
      }, {
        default: () => [B.value && (E.value || x.value) && !!e.scrim && C("div", L({
          class: ["v-navigation-drawer__scrim", ae.backgroundColorClasses.value],
          style: [ue.value, ae.backgroundColorStyles.value],
          onClick: () => {
            b.value || (x.value = !1);
          }
        }, h), null)]
      })]);
    }), {
      isStuck: G
    };
  }
}), Cs = {
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
    const n = ve("panels"), t = el(e, "drawer"), a = q([]), l = e, o = I(() => (i(l.items), l.items));
    function i(u) {
      a.value = s(u);
    }
    function s(u) {
      if (n.panel) {
        for (const c of u)
          if (c.items) {
            const r = s(c.items);
            if (r)
              return [r, c.name];
          } else if (c.name == n.panel)
            return [c.name];
      }
    }
    return (u, c) => (D(), Y(Vs, {
      modelValue: t.value,
      "onUpdate:modelValue": c[1] || (c[1] = (r) => t.value = r),
      theme: "dark"
    }, {
      append: M(() => [
        p(ut, null, {
          default: M(() => [
            j(u.$slots, "append")
          ]),
          _: 3
        })
      ]),
      default: M(() => [
        j(u.$slots, "prepend"),
        p(ut, {
          opened: a.value,
          "onUpdate:opened": c[0] || (c[0] = (r) => a.value = r),
          density: "compact"
        }, {
          default: M(() => [
            (D(!0), pe(J, null, Me(o.value, (r, d) => (D(), Y(V(gs), L({
              key: d,
              ref_for: !0
            }, r), null, 16))), 128))
          ]),
          _: 1
        }, 8, ["opened"])
      ]),
      _: 3
    }, 8, ["modelValue"]));
  }
}, Ps = K({
  ...Se(),
  ...rs({
    fullHeight: !0
  }),
  ...Le()
}, "VApp"), Is = ne()({
  name: "VApp",
  props: Ps(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = je(e), {
      layoutClasses: l,
      getLayoutItem: o,
      items: i,
      layoutRef: s
    } = ds(e), {
      rtlClasses: u
    } = nt();
    return ie(() => {
      var c;
      return C("div", {
        ref: s,
        class: fe(["v-application", a.themeClasses.value, l.value, u.value, e.class]),
        style: Ve([e.style])
      }, [C("div", {
        class: "v-application__wrap"
      }, [(c = t.default) == null ? void 0 : c.call(t)])]);
    }), {
      getLayoutItem: o,
      items: i,
      theme: a
    };
  }
}), Dn = K({
  text: String,
  ...Se(),
  ...Ue()
}, "VToolbarTitle"), Ln = ne()({
  name: "VToolbarTitle",
  props: Dn(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    return ie(() => {
      const a = !!(t.default || t.text || e.text);
      return p(e.tag, {
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
}), As = [null, "prominent", "default", "comfortable", "compact"], Nn = K({
  absolute: Boolean,
  collapse: Boolean,
  color: String,
  density: {
    type: String,
    default: "default",
    validator: (e) => As.includes(e)
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
  ...Nt(),
  ...Se(),
  ...Lt(),
  ...wt(),
  ...Ue({
    tag: "header"
  }),
  ...Le()
}, "VToolbar"), Wa = ne()({
  name: "VToolbar",
  props: Nn(),
  setup(e, n) {
    var v;
    let {
      slots: t
    } = n;
    const {
      backgroundColorClasses: a,
      backgroundColorStyles: l
    } = st(() => e.color), {
      borderClasses: o
    } = ya(e), {
      elevationClasses: i
    } = ha(e), {
      roundedClasses: s
    } = _t(e), {
      themeClasses: u
    } = je(e), {
      rtlClasses: c
    } = nt(), r = ee(!!(e.extended || (v = t.extension) != null && v.call(t))), d = I(() => parseInt(Number(e.height) + (e.density === "prominent" ? Number(e.height) : 0) - (e.density === "comfortable" ? 8 : 0) - (e.density === "compact" ? 16 : 0), 10)), m = I(() => r.value ? parseInt(Number(e.extensionHeight) + (e.density === "prominent" ? Number(e.extensionHeight) : 0) - (e.density === "comfortable" ? 4 : 0) - (e.density === "compact" ? 8 : 0), 10) : 0);
    return at({
      VBtn: {
        variant: "text"
      }
    }), ie(() => {
      var h;
      const f = !!(e.title || t.title), x = !!(t.image || e.image), y = (h = t.extension) == null ? void 0 : h.call(t);
      return r.value = !!(e.extended || y), p(e.tag, {
        class: fe(["v-toolbar", {
          "v-toolbar--absolute": e.absolute,
          "v-toolbar--collapse": e.collapse,
          "v-toolbar--flat": e.flat,
          "v-toolbar--floating": e.floating,
          [`v-toolbar--density-${e.density}`]: !0
        }, a.value, o.value, i.value, s.value, u.value, c.value, e.class]),
        style: Ve([l.value, e.style])
      }, {
        default: () => [x && C("div", {
          key: "image",
          class: "v-toolbar__image"
        }, [t.image ? p(Fe, {
          key: "image-defaults",
          disabled: !e.image,
          defaults: {
            VImg: {
              cover: !0,
              src: e.image
            }
          }
        }, t.image) : p(pa, {
          key: "image-img",
          cover: !0,
          src: e.image
        }, null)]), p(Fe, {
          defaults: {
            VTabs: {
              height: ye(d.value)
            }
          }
        }, {
          default: () => {
            var g, A, k;
            return [C("div", {
              class: "v-toolbar__content",
              style: {
                height: ye(d.value)
              }
            }, [t.prepend && C("div", {
              class: "v-toolbar__prepend"
            }, [(g = t.prepend) == null ? void 0 : g.call(t)]), f && p(Ln, {
              key: "title",
              text: e.title
            }, {
              text: t.title
            }), (A = t.default) == null ? void 0 : A.call(t), t.append && C("div", {
              class: "v-toolbar__append"
            }, [(k = t.append) == null ? void 0 : k.call(t)])])];
          }
        }), p(Fe, {
          defaults: {
            VTabs: {
              height: ye(m.value)
            }
          }
        }, {
          default: () => [p(Ii, null, {
            default: () => [r.value && C("div", {
              class: "v-toolbar__extension",
              style: {
                height: ye(m.value)
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
}), Ts = K({
  scrollTarget: {
    type: String
  },
  scrollThreshold: {
    type: [String, Number],
    default: 300
  }
}, "scroll");
function _s(e) {
  let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    canScroll: t
  } = n;
  let a = 0, l = 0;
  const o = q(null), i = ee(0), s = ee(0), u = ee(0), c = ee(!1), r = ee(!1), d = I(() => Number(e.scrollThreshold)), m = I(() => Je((d.value - i.value) / d.value || 0)), v = () => {
    const f = o.value;
    if (!f || t && !t.value) return;
    a = i.value, i.value = "window" in f ? f.pageYOffset : f.scrollTop;
    const x = f instanceof Window ? document.documentElement.scrollHeight : f.scrollHeight;
    if (l !== x) {
      l = x;
      return;
    }
    r.value = i.value < a, u.value = Math.abs(i.value - d.value);
  };
  return Q(r, () => {
    s.value = s.value || i.value;
  }), Q(c, () => {
    s.value = 0;
  }), Ze(() => {
    Q(() => e.scrollTarget, (f) => {
      var y;
      const x = f ? document.querySelector(f) : window;
      if (!x) {
        kn(`Unable to locate element with identifier ${f}`);
        return;
      }
      x !== o.value && ((y = o.value) == null || y.removeEventListener("scroll", v), o.value = x, o.value.addEventListener("scroll", v, {
        passive: !0
      }));
    }, {
      immediate: !0
    });
  }), dt(() => {
    var f;
    (f = o.value) == null || f.removeEventListener("scroll", v);
  }), t && Q(t, v, {
    immediate: !0
  }), {
    scrollThreshold: d,
    currentScroll: i,
    currentThreshold: u,
    isScrollActive: c,
    scrollRatio: m,
    // required only for testing
    // probably can be removed
    // later (2 chars chlng)
    isScrollingUp: r,
    savedScroll: s
  };
}
const Bs = K({
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
  ...Nn(),
  ...En(),
  ...Ts(),
  height: {
    type: [Number, String],
    default: 64
  }
}, "VAppBar"), Es = ne()({
  name: "VAppBar",
  props: Bs(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = q(), l = we(e, "modelValue"), o = I(() => {
      var A;
      const g = new Set(((A = e.scrollBehavior) == null ? void 0 : A.split(" ")) ?? []);
      return {
        hide: g.has("hide"),
        fullyHide: g.has("fully-hide"),
        inverted: g.has("inverted"),
        collapse: g.has("collapse"),
        elevate: g.has("elevate"),
        fadeImage: g.has("fade-image")
        // shrink: behavior.has('shrink'),
      };
    }), i = I(() => {
      const g = o.value;
      return g.hide || g.fullyHide || g.inverted || g.collapse || g.elevate || g.fadeImage || // behavior.shrink ||
      !l.value;
    }), {
      currentScroll: s,
      scrollThreshold: u,
      isScrollingUp: c,
      scrollRatio: r
    } = _s(e, {
      canScroll: i
    }), d = H(() => o.value.hide || o.value.fullyHide), m = I(() => e.collapse || o.value.collapse && (o.value.inverted ? r.value > 0 : r.value === 0)), v = I(() => e.flat || o.value.fullyHide && !l.value || o.value.elevate && (o.value.inverted ? s.value > 0 : s.value === 0)), f = I(() => o.value.fadeImage ? o.value.inverted ? 1 - r.value : r.value : void 0), x = I(() => {
      var k, S;
      if (o.value.hide && o.value.inverted) return 0;
      const g = ((k = a.value) == null ? void 0 : k.contentHeight) ?? 0, A = ((S = a.value) == null ? void 0 : S.extensionHeight) ?? 0;
      return d.value ? s.value < u.value || o.value.fullyHide ? g + A : g : g + A;
    });
    qe(() => !!e.scrollBehavior, () => {
      et(() => {
        d.value ? o.value.inverted ? l.value = s.value > u.value : l.value = c.value || s.value < u.value : l.value = !0;
      });
    });
    const {
      ssrBootStyles: y
    } = ba(), {
      layoutItemStyles: h
    } = On({
      id: e.name,
      order: I(() => parseInt(e.order, 10)),
      position: H(() => e.location),
      layoutSize: x,
      elementSize: ee(void 0),
      active: l,
      absolute: H(() => e.absolute)
    });
    return ie(() => {
      const g = Wa.filterProps(e);
      return p(Wa, L({
        ref: a,
        class: ["v-app-bar", {
          "v-app-bar--bottom": e.location === "bottom"
        }, e.class],
        style: [{
          ...h.value,
          "--v-toolbar-image-opacity": f.value,
          height: void 0,
          ...y.value
        }, e.style]
      }, g, {
        collapse: m.value,
        flat: v.value
      }), t);
    }), {};
  }
}), $s = K({
  ...rn({
    icon: "$menu",
    variant: "text"
  })
}, "VAppBarNavIcon"), Hn = ne()({
  name: "VAppBarNavIcon",
  props: $s(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    return ie(() => p(be, L(e, {
      class: ["v-app-bar-nav-icon"]
    }), t)), {};
  }
}), Kl = ne()({
  name: "VAppBarTitle",
  props: Dn(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    return ie(() => p(Ln, L(e, {
      class: "v-app-bar-title"
    }), t)), {};
  }
}), Os = K({
  scrollable: Boolean,
  ...Se(),
  ...zt(),
  ...Ue({
    tag: "main"
  })
}, "VMain"), Fs = ne()({
  name: "VMain",
  props: Os(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const {
      dimensionStyles: a
    } = Ht(e), {
      mainStyles: l
    } = $n(), {
      ssrBootStyles: o
    } = ba();
    return ie(() => p(e.tag, {
      class: fe(["v-main", {
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
function $a(e, n) {
  return {
    x: e.x + n.x,
    y: e.y + n.y
  };
}
function Rs(e, n) {
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
    } = e, l = a === "left" ? 0 : a === "center" ? n.width / 2 : a === "right" ? n.width : a, o = t === "top" ? 0 : t === "bottom" ? n.height : t;
    return $a({
      x: l,
      y: o
    }, n);
  } else if (e.side === "left" || e.side === "right") {
    const {
      side: t,
      align: a
    } = e, l = t === "left" ? 0 : t === "right" ? n.width : t, o = a === "top" ? 0 : a === "center" ? n.height / 2 : a === "bottom" ? n.height : a;
    return $a({
      x: l,
      y: o
    }, n);
  }
  return $a({
    x: n.width / 2,
    y: n.height / 2
  }, n);
}
const zn = {
  static: Ls,
  // specific viewport position, usually centered
  connected: Hs
  // connected to a certain element
}, Ms = K({
  locationStrategy: {
    type: [String, Function],
    default: "static",
    validator: (e) => typeof e == "function" || e in zn
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
function Ds(e, n) {
  const t = q({}), a = q();
  He && qe(() => !!(n.isActive.value && e.locationStrategy), (s) => {
    var u, c;
    Q(() => e.locationStrategy, s), We(() => {
      window.removeEventListener("resize", l), visualViewport == null || visualViewport.removeEventListener("resize", o), visualViewport == null || visualViewport.removeEventListener("scroll", i), a.value = void 0;
    }), window.addEventListener("resize", l, {
      passive: !0
    }), visualViewport == null || visualViewport.addEventListener("resize", o, {
      passive: !0
    }), visualViewport == null || visualViewport.addEventListener("scroll", i, {
      passive: !0
    }), typeof e.locationStrategy == "function" ? a.value = (u = e.locationStrategy(n, e, t)) == null ? void 0 : u.updateLocation : a.value = (c = zn[e.locationStrategy](n, e, t)) == null ? void 0 : c.updateLocation;
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
function Ls() {
}
function Ns(e, n) {
  const t = vl(e);
  return n ? t.x += parseFloat(e.style.right || 0) : t.x -= parseFloat(e.style.left || 0), t.y -= parseFloat(e.style.top || 0), t;
}
function Hs(e, n, t) {
  (Array.isArray(e.target.value) || us(e.target.value)) && Object.assign(t.value, {
    position: "fixed",
    top: 0,
    [e.isRtl.value ? "right" : "left"]: 0
  });
  const {
    preferredAnchor: l,
    preferredOrigin: o
  } = Li(() => {
    const h = Bl(n.location, e.isRtl.value), g = n.origin === "overlap" ? h : n.origin === "auto" ? Ia(h) : Bl(n.origin, e.isRtl.value);
    return h.side === g.side && h.align === Aa(g).align ? {
      preferredAnchor: El(h),
      preferredOrigin: El(g)
    } : {
      preferredAnchor: h,
      preferredOrigin: g
    };
  }), [i, s, u, c] = ["minWidth", "minHeight", "maxWidth", "maxHeight"].map((h) => I(() => {
    const g = parseFloat(n[h]);
    return isNaN(g) ? 1 / 0 : g;
  })), r = I(() => {
    if (Array.isArray(n.offset))
      return n.offset;
    if (typeof n.offset == "string") {
      const h = n.offset.split(" ").map(parseFloat);
      return h.length < 2 && h.push(0), h;
    }
    return typeof n.offset == "number" ? [n.offset, 0] : [0, 0];
  });
  let d = !1, m = -1;
  const v = new Sn(4), f = new ResizeObserver(() => {
    if (!d) return;
    if (requestAnimationFrame((g) => {
      g !== m && v.clear(), requestAnimationFrame((A) => {
        m = A;
      });
    }), v.isFull) {
      const g = v.values();
      if (it(g.at(-1), g.at(-3)))
        return;
    }
    const h = y();
    h && v.push(h.flipped);
  });
  Q([e.target, e.contentEl], (h, g) => {
    let [A, k] = h, [S, w] = g;
    S && !Array.isArray(S) && f.unobserve(S), A && !Array.isArray(A) && f.observe(A), w && f.unobserve(w), k && f.observe(k);
  }, {
    immediate: !0
  }), We(() => {
    f.disconnect();
  });
  let x = new tt({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  function y() {
    if (d = !1, requestAnimationFrame(() => d = !0), !e.target.value || !e.contentEl.value) return;
    (Array.isArray(e.target.value) || e.target.value.offsetParent || e.target.value.getClientRects().length) && (x = An(e.target.value));
    const h = Ns(e.contentEl.value, e.isRtl.value), g = na(e.contentEl.value), A = 12;
    g.length || (g.push(document.documentElement), e.contentEl.value.style.top && e.contentEl.value.style.left || (h.x -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0), h.y -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0)));
    const k = g.reduce((F, z) => {
      const W = as(z);
      return F ? new tt({
        x: Math.max(F.left, W.left),
        y: Math.max(F.top, W.top),
        width: Math.min(F.right, W.right) - Math.max(F.left, W.left),
        height: Math.min(F.bottom, W.bottom) - Math.max(F.top, W.top)
      }) : W;
    }, void 0);
    k.x += A, k.y += A, k.width -= A * 2, k.height -= A * 2;
    let S = {
      anchor: l.value,
      origin: o.value
    };
    function w(F) {
      const z = new tt(h), W = Gl(F.anchor, x), G = Gl(F.origin, z);
      let {
        x: te,
        y: ae
      } = Rs(W, G);
      switch (F.anchor.side) {
        case "top":
          ae -= r.value[0];
          break;
        case "bottom":
          ae += r.value[0];
          break;
        case "left":
          te -= r.value[0];
          break;
        case "right":
          te += r.value[0];
          break;
      }
      switch (F.anchor.align) {
        case "top":
          ae -= r.value[1];
          break;
        case "bottom":
          ae += r.value[1];
          break;
        case "left":
          te -= r.value[1];
          break;
        case "right":
          te += r.value[1];
          break;
      }
      return z.x += te, z.y += ae, z.width = Math.min(z.width, u.value), z.height = Math.min(z.height, c.value), {
        overflows: Dl(z, k),
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
    let E = -1;
    for (; ; ) {
      if (E++ > 10) {
        Vn("Infinite loop detected in connectedLocationStrategy");
        break;
      }
      const {
        x: F,
        y: z,
        overflows: W
      } = w(S);
      P += F, b += z, h.x += F, h.y += z;
      {
        const G = $l(S.anchor), te = W.x.before || W.x.after, ae = W.y.before || W.y.after;
        let ue = !1;
        if (["x", "y"].forEach((_) => {
          if (_ === "x" && te && !T.x || _ === "y" && ae && !T.y) {
            const $ = {
              anchor: {
                ...S.anchor
              },
              origin: {
                ...S.origin
              }
            }, O = _ === "x" ? G === "y" ? Aa : Ia : G === "y" ? Ia : Aa;
            $.anchor = O($.anchor), $.origin = O($.origin);
            const {
              overflows: U
            } = w($);
            (U[_].before <= W[_].before && U[_].after <= W[_].after || U[_].before + U[_].after < (W[_].before + W[_].after) / 2) && (S = $, ue = T[_] = !0);
          }
        }), ue) continue;
      }
      W.x.before && (P += W.x.before, h.x += W.x.before), W.x.after && (P -= W.x.after, h.x -= W.x.after), W.y.before && (b += W.y.before, h.y += W.y.before), W.y.after && (b -= W.y.after, h.y -= W.y.after);
      {
        const G = Dl(h, k);
        B.x = k.width - G.x.before - G.x.after, B.y = k.height - G.y.before - G.y.after, P += G.x.before, h.x += G.x.before, b += G.y.before, h.y += G.y.before;
      }
      break;
    }
    const R = $l(S.anchor);
    return Object.assign(t.value, {
      "--v-overlay-anchor-origin": `${S.anchor.side} ${S.anchor.align}`,
      transformOrigin: `${S.origin.side} ${S.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: ye(Oa(b)),
      left: e.isRtl.value ? void 0 : ye(Oa(P)),
      right: e.isRtl.value ? ye(Oa(-P)) : void 0,
      minWidth: ye(R === "y" ? Math.min(i.value, x.width) : i.value),
      maxWidth: ye(jl(Je(B.x, i.value === 1 / 0 ? 0 : i.value, u.value))),
      maxHeight: ye(jl(Je(B.y, s.value === 1 / 0 ? 0 : s.value, c.value)))
    }), {
      available: B,
      contentBox: h,
      flipped: T
    };
  }
  return Q(() => [l.value, o.value, n.offset, n.minWidth, n.minHeight, n.maxWidth, n.maxHeight], () => y()), Te(() => {
    const h = y();
    if (!h) return;
    const {
      available: g,
      contentBox: A
    } = h;
    A.height > g.y && requestAnimationFrame(() => {
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
function jl(e) {
  return Math.ceil(e * devicePixelRatio) / devicePixelRatio;
}
let Ua = !0;
const ia = [];
function zs(e) {
  !Ua || ia.length ? (ia.push(e), Ka()) : (Ua = !1, e(), Ka());
}
let Yl = -1;
function Ka() {
  cancelAnimationFrame(Yl), Yl = requestAnimationFrame(() => {
    const e = ia.shift();
    e && e(), ia.length ? Ka() : Ua = !0;
  });
}
const Jt = {
  none: null,
  close: Ks,
  block: Gs,
  reposition: js
}, Ws = K({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (e) => typeof e == "function" || e in Jt
  }
}, "VOverlay-scroll-strategies");
function Us(e, n) {
  if (!He) return;
  let t;
  et(async () => {
    t == null || t.stop(), n.isActive.value && e.scrollStrategy && (t = on(), await new Promise((a) => setTimeout(a)), t.active && t.run(() => {
      var a;
      typeof e.scrollStrategy == "function" ? e.scrollStrategy(n, e, t) : (a = Jt[e.scrollStrategy]) == null || a.call(Jt, n, e, t);
    }));
  }), We(() => {
    t == null || t.stop();
  });
}
function Ks(e) {
  function n(t) {
    e.isActive.value = !1;
  }
  Wn(e.targetEl.value ?? e.contentEl.value, n);
}
function Gs(e, n) {
  var i;
  const t = (i = e.root.value) == null ? void 0 : i.offsetParent, a = [.../* @__PURE__ */ new Set([...na(e.targetEl.value, n.contained ? t : void 0), ...na(e.contentEl.value, n.contained ? t : void 0)])].filter((s) => !s.classList.contains("v-overlay-scroll-blocked")), l = window.innerWidth - document.documentElement.offsetWidth, o = ((s) => fl(s) && s)(t || document.documentElement);
  o && e.root.value.classList.add("v-overlay--scroll-blocked"), a.forEach((s, u) => {
    s.style.setProperty("--v-body-scroll-x", ye(-s.scrollLeft)), s.style.setProperty("--v-body-scroll-y", ye(-s.scrollTop)), s !== document.documentElement && s.style.setProperty("--v-scrollbar-offset", ye(l)), s.classList.add("v-overlay-scroll-blocked");
  }), We(() => {
    a.forEach((s, u) => {
      const c = parseFloat(s.style.getPropertyValue("--v-body-scroll-x")), r = parseFloat(s.style.getPropertyValue("--v-body-scroll-y")), d = s.style.scrollBehavior;
      s.style.scrollBehavior = "auto", s.style.removeProperty("--v-body-scroll-x"), s.style.removeProperty("--v-body-scroll-y"), s.style.removeProperty("--v-scrollbar-offset"), s.classList.remove("v-overlay-scroll-blocked"), s.scrollLeft = -c, s.scrollTop = -r, s.style.scrollBehavior = d;
    }), o && e.root.value.classList.remove("v-overlay--scroll-blocked");
  });
}
function js(e, n, t) {
  let a = !1, l = -1, o = -1;
  function i(s) {
    zs(() => {
      var r, d;
      const u = performance.now();
      (d = (r = e.updateLocation).value) == null || d.call(r, s), a = (performance.now() - u) / (1e3 / 60) > 2;
    });
  }
  o = (typeof requestIdleCallback > "u" ? (s) => s() : requestIdleCallback)(() => {
    t.run(() => {
      Wn(e.targetEl.value ?? e.contentEl.value, (s) => {
        a ? (cancelAnimationFrame(l), l = requestAnimationFrame(() => {
          l = requestAnimationFrame(() => {
            i(s);
          });
        })) : i(s);
      });
    });
  }), We(() => {
    typeof cancelIdleCallback < "u" && cancelIdleCallback(o), cancelAnimationFrame(l);
  });
}
function Wn(e, n) {
  const t = [document, ...na(e)];
  t.forEach((a) => {
    a.addEventListener("scroll", n, {
      passive: !0
    });
  }), We(() => {
    t.forEach((a) => {
      a.removeEventListener("scroll", n);
    });
  });
}
const Ga = Symbol.for("vuetify:v-menu"), Ys = K({
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
  ...Rn()
}, "VOverlay-activator");
function qs(e, n) {
  let {
    isActive: t,
    isTop: a,
    contentEl: l
  } = n;
  const o = lt("useActivator"), i = q();
  let s = !1, u = !1, c = !0;
  const r = I(() => e.openOnFocus || e.openOnFocus == null && e.openOnHover), d = I(() => e.openOnClick || e.openOnClick == null && !e.openOnHover && !r.value), {
    runOpenDelay: m,
    runCloseDelay: v
  } = Mn(e, (b) => {
    b === (e.openOnHover && s || r.value && u) && !(e.openOnHover && t.value && !a.value) && (t.value !== b && (c = !0), t.value = b);
  }), f = q(), x = {
    onClick: (b) => {
      b.stopPropagation(), i.value = b.currentTarget || b.target, t.value || (f.value = [b.clientX, b.clientY]), t.value = !t.value;
    },
    onMouseenter: (b) => {
      var B;
      (B = b.sourceCapabilities) != null && B.firesTouchEvents || (s = !0, i.value = b.currentTarget || b.target, m());
    },
    onMouseleave: (b) => {
      s = !1, v();
    },
    onFocus: (b) => {
      It(b.target, ":focus-visible") !== !1 && (u = !0, b.stopPropagation(), i.value = b.currentTarget || b.target, m());
    },
    onBlur: (b) => {
      u = !1, b.stopPropagation(), v();
    }
  }, y = I(() => {
    const b = {};
    return d.value && (b.onClick = x.onClick), e.openOnHover && (b.onMouseenter = x.onMouseenter, b.onMouseleave = x.onMouseleave), r.value && (b.onFocus = x.onFocus, b.onBlur = x.onBlur), b;
  }), h = I(() => {
    const b = {};
    if (e.openOnHover && (b.onMouseenter = () => {
      s = !0, m();
    }, b.onMouseleave = () => {
      s = !1, v();
    }), r.value && (b.onFocusin = () => {
      u = !0, m();
    }, b.onFocusout = () => {
      u = !1, v();
    }), e.closeOnContentClick) {
      const B = ve(Ga, null);
      b.onClick = () => {
        t.value = !1, B == null || B.closeParents();
      };
    }
    return b;
  }), g = I(() => {
    const b = {};
    return e.openOnHover && (b.onMouseenter = () => {
      c && (s = !0, c = !1, m());
    }, b.onMouseleave = () => {
      s = !1, v();
    }), b;
  });
  Q(a, (b) => {
    var B;
    b && (e.openOnHover && !s && (!r.value || !u) || r.value && !u && (!e.openOnHover || !s)) && !((B = l.value) != null && B.contains(document.activeElement)) && (t.value = !1);
  }), Q(t, (b) => {
    b || setTimeout(() => {
      f.value = void 0;
    });
  }, {
    flush: "post"
  });
  const A = Rl();
  et(() => {
    A.value && Te(() => {
      i.value = A.el;
    });
  });
  const k = Rl(), S = I(() => e.target === "cursor" && f.value ? f.value : k.value ? k.el : Un(e.target, o) || i.value), w = I(() => Array.isArray(S.value) ? void 0 : S.value);
  let P;
  return Q(() => !!e.activator, (b) => {
    b && He ? (P = on(), P.run(() => {
      Xs(e, o, {
        activatorEl: i,
        activatorEvents: y
      });
    })) : P && P.stop();
  }, {
    flush: "post",
    immediate: !0
  }), We(() => {
    P == null || P.stop();
  }), {
    activatorEl: i,
    activatorRef: A,
    target: S,
    targetEl: w,
    targetRef: k,
    activatorEvents: y,
    contentEvents: h,
    scrimEvents: g
  };
}
function Xs(e, n, t) {
  let {
    activatorEl: a,
    activatorEvents: l
  } = t;
  Q(() => e.activator, (u, c) => {
    if (c && u !== c) {
      const r = s(c);
      r && i(r);
    }
    u && Te(() => o());
  }, {
    immediate: !0
  }), Q(() => e.activatorProps, () => {
    o();
  }), We(() => {
    i();
  });
  function o() {
    let u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : s(), c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    u && ls(u, L(l.value, c));
  }
  function i() {
    let u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : s(), c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    u && ns(u, L(l.value, c));
  }
  function s() {
    let u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : e.activator;
    const c = Un(u, n);
    return a.value = (c == null ? void 0 : c.nodeType) === Node.ELEMENT_NODE ? c : void 0, a.value;
  }
}
function Un(e, n) {
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
function Zs() {
  if (!He) return ee(!1);
  const {
    ssr: e
  } = mt();
  if (e) {
    const n = ee(!1);
    return Ze(() => {
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
  Q(n, () => t.value = !0);
  function l() {
    e.eager || (t.value = !1);
  }
  return {
    isBooted: t,
    hasContent: a,
    onAfterLeave: l
  };
}
const ql = Symbol.for("vuetify:stack"), Et = Qe([]);
function Qs(e, n, t) {
  const a = lt("useStack"), l = !t, o = ve(ql, void 0), i = Qe({
    activeChildren: /* @__PURE__ */ new Set()
  });
  ze(ql, i);
  const s = ee(Number(Tl(n)));
  qe(e, () => {
    var d;
    const r = (d = Et.at(-1)) == null ? void 0 : d[1];
    s.value = r ? r + 10 : Number(Tl(n)), l && Et.push([a.uid, s.value]), o == null || o.activeChildren.add(a.uid), We(() => {
      if (l) {
        const m = La(Et).findIndex((v) => v[0] === a.uid);
        Et.splice(m, 1);
      }
      o == null || o.activeChildren.delete(a.uid);
    });
  });
  const u = ee(!0);
  l && et(() => {
    var d;
    const r = ((d = Et.at(-1)) == null ? void 0 : d[0]) === a.uid;
    setTimeout(() => u.value = r);
  });
  const c = H(() => !i.activeChildren.size);
  return {
    globalTop: nn(u),
    localTop: c,
    stackStyles: H(() => ({
      zIndex: s.value
    }))
  };
}
function Js(e) {
  return {
    teleportTarget: I(() => {
      const t = e();
      if (t === !0 || !He) return;
      const a = t === !1 ? document.body : typeof t == "string" ? document.querySelector(t) : t;
      if (a == null) {
        oi(`Unable to locate target ${t}`);
        return;
      }
      let l = [...a.children].find((o) => o.matches(".v-overlay-container"));
      return l || (l = document.createElement("div"), l.className = "v-overlay-container", a.appendChild(l)), l;
    })
  };
}
function eu() {
  return !0;
}
function jn(e, n, t) {
  if (!e || Yn(e, t) === !1) return !1;
  const a = Tn(n);
  if (typeof ShadowRoot < "u" && a instanceof ShadowRoot && a.host === e.target) return !1;
  const l = (typeof t.value == "object" && t.value.include || (() => []))();
  return l.push(n), !l.some((o) => o == null ? void 0 : o.contains(e.target));
}
function Yn(e, n) {
  return (typeof n.value == "object" && n.value.closeConditional || eu)(e);
}
function tu(e, n, t) {
  const a = typeof t.value == "function" ? t.value : t.value.handler;
  e.shadowTarget = e.target, n._clickOutside.lastMousedownWasOutside && jn(e, n, t) && setTimeout(() => {
    Yn(e, t) && a && a(e);
  }, 0);
}
function Xl(e, n) {
  const t = Tn(e);
  n(document), typeof ShadowRoot < "u" && t instanceof ShadowRoot && n(t);
}
const Zl = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(e, n) {
    const t = (l) => tu(l, e, n), a = (l) => {
      e._clickOutside.lastMousedownWasOutside = jn(l, e, n);
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
function au(e) {
  const {
    modelValue: n,
    color: t,
    ...a
  } = e;
  return p(ea, {
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
  ...Ys(),
  ...Se(),
  ...zt(),
  ...Kn(),
  ...Ms(),
  ...Ws(),
  ...Le(),
  ...Wt()
}, "VOverlay"), sa = ne()({
  name: "VOverlay",
  directives: {
    vClickOutside: Zl
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
    const o = lt("VOverlay"), i = q(), s = q(), u = q(), c = we(e, "modelValue"), r = I({
      get: () => c.value,
      set: (X) => {
        X && e.disabled || (c.value = X);
      }
    }), {
      themeClasses: d
    } = je(e), {
      rtlClasses: m,
      isRtl: v
    } = nt(), {
      hasContent: f,
      onAfterLeave: x
    } = Gn(e, r), y = st(() => typeof e.scrim == "string" ? e.scrim : null), {
      globalTop: h,
      localTop: g,
      stackStyles: A
    } = Qs(r, () => e.zIndex, e._disableGlobalStack), {
      activatorEl: k,
      activatorRef: S,
      target: w,
      targetEl: P,
      targetRef: b,
      activatorEvents: B,
      contentEvents: T,
      scrimEvents: E
    } = qs(e, {
      isActive: r,
      isTop: g,
      contentEl: u
    }), {
      teleportTarget: R
    } = Js(() => {
      var me, N, Z;
      const X = e.attach || e.contained;
      if (X) return X;
      const re = ((me = k == null ? void 0 : k.value) == null ? void 0 : me.getRootNode()) || ((Z = (N = o.proxy) == null ? void 0 : N.$el) == null ? void 0 : Z.getRootNode());
      return re instanceof ShadowRoot ? re : !1;
    }), {
      dimensionStyles: F
    } = Ht(e), z = Zs(), {
      scopeId: W
    } = jt();
    Q(() => e.disabled, (X) => {
      X && (r.value = !1);
    });
    const {
      contentStyles: G,
      updateLocation: te
    } = Ds(e, {
      isRtl: v,
      contentEl: u,
      target: w,
      isActive: r
    });
    Us(e, {
      root: i,
      contentEl: u,
      targetEl: P,
      isActive: r,
      updateLocation: te
    });
    function ae(X) {
      l("click:outside", X), e.persistent ? he() : r.value = !1;
    }
    function ue(X) {
      return r.value && h.value && // If using scrim, only close if clicking on it rather than anything opened on top
      (!e.scrim || X.target === s.value || X instanceof MouseEvent && X.shadowTarget === s.value);
    }
    He && Q(r, (X) => {
      X ? window.addEventListener("keydown", _) : window.removeEventListener("keydown", _);
    }, {
      immediate: !0
    }), dt(() => {
      He && window.removeEventListener("keydown", _);
    });
    function _(X) {
      var re, me, N;
      X.key === "Escape" && h.value && ((re = u.value) != null && re.contains(document.activeElement) || l("keydown", X), e.persistent ? he() : (r.value = !1, (me = u.value) != null && me.contains(document.activeElement) && ((N = k.value) == null || N.focus())));
    }
    function $(X) {
      X.key === "Escape" && !h.value || l("keydown", X);
    }
    const O = un();
    qe(() => e.closeOnBack, () => {
      Ai(O, (X) => {
        h.value && r.value ? (X(!1), e.persistent ? he() : r.value = !1) : X();
      });
    });
    const U = q();
    Q(() => r.value && (e.absolute || e.contained) && R.value == null, (X) => {
      if (X) {
        const re = _n(i.value);
        re && re !== document.scrollingElement && (U.value = re.scrollTop);
      }
    });
    function he() {
      e.noClickAnimation || u.value && ht(u.value, [{
        transformOrigin: "center"
      }, {
        transform: "scale(1.03)"
      }, {
        transformOrigin: "center"
      }], {
        duration: 150,
        easing: Ot
      });
    }
    function le() {
      l("afterEnter");
    }
    function se() {
      x(), l("afterLeave");
    }
    return ie(() => {
      var X;
      return C(J, null, [(X = t.activator) == null ? void 0 : X.call(t, {
        isActive: r.value,
        targetRef: b,
        props: L({
          ref: S
        }, B.value, e.activatorProps)
      }), z.value && f.value && p(Na, {
        disabled: !R.value,
        to: R.value
      }, {
        default: () => [C("div", L({
          class: ["v-overlay", {
            "v-overlay--absolute": e.absolute || e.contained,
            "v-overlay--active": r.value,
            "v-overlay--contained": e.contained
          }, d.value, m.value, e.class],
          style: [A.value, {
            "--v-overlay-opacity": e.opacity,
            top: ye(U.value)
          }, e.style],
          ref: i,
          onKeydown: $
        }, W, a), [p(au, L({
          color: y,
          modelValue: r.value && !!e.scrim,
          ref: s
        }, E.value), null), p(wa, {
          appear: !0,
          persisted: !0,
          transition: e.transition,
          target: w.value,
          onAfterEnter: le,
          onAfterLeave: se
        }, {
          default: () => {
            var re;
            return [Ke(C("div", L({
              ref: u,
              class: ["v-overlay__content", e.contentClass],
              style: [F.value, G.value]
            }, T.value, e.contentProps), [(re = t.default) == null ? void 0 : re.call(t, {
              isActive: r
            })]), [[Tt, r.value], [Zl, {
              handler: ae,
              closeConditional: ue,
              include: () => [k.value]
            }]])];
          }
        })])]
      })]);
    }), {
      activatorEl: k,
      scrimEl: s,
      target: w,
      animateClick: he,
      contentEl: u,
      globalTop: h,
      localTop: g,
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
function yt(e) {
  for (var n = arguments.length, t = new Array(n > 1 ? n - 1 : 0), a = 1; a < n; a++)
    t[a - 1] = arguments[a];
  return e[Fa] = t, new Proxy(e, {
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
          const c = Ra(u.value, o) ?? ("_" in u.value ? Ra((s = u.value._) == null ? void 0 : s.setupState, o) : void 0);
          if (c) return c;
        }
        for (const u of t) {
          const c = u.value && u.value[Fa];
          if (!c) continue;
          const r = c.slice();
          for (; r.length; ) {
            const d = r.shift(), m = Ra(d.value, o);
            if (m) return m;
            const v = d.value && d.value[Fa];
            v && r.push(...v);
          }
        }
      }
    }
  });
}
function lu(e) {
  const n = ee(e());
  let t = -1;
  function a() {
    clearInterval(t);
  }
  function l() {
    a(), Te(() => n.value = e());
  }
  function o(i) {
    const s = i ? getComputedStyle(i) : {
      transitionDuration: 0.2
    }, u = parseFloat(s.transitionDuration) * 1e3 || 200;
    if (a(), n.value <= 0) return;
    const c = performance.now();
    t = window.setInterval(() => {
      const r = performance.now() - c + u;
      n.value = Math.max(e() - r, 0), n.value <= 0 && a();
    }, u);
  }
  return We(a), {
    clear: a,
    time: n,
    start: o,
    reset: l
  };
}
const nu = K({
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
  ...wt(),
  ...Ut(),
  ...Le(),
  ...gt(ml({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
}, "VSnackbar"), ou = ne()({
  name: "VSnackbar",
  props: nu(),
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
    } = jt(), {
      themeClasses: i
    } = je(e), {
      colorClasses: s,
      colorStyles: u,
      variantClasses: c
    } = al(e), {
      roundedClasses: r
    } = _t(e), d = lu(() => Number(e.timeout)), m = q(), v = q(), f = ee(!1), x = ee(0), y = q(), h = ve(Ft, void 0);
    qe(() => !!h, () => {
      const E = $n();
      et(() => {
        y.value = E.mainStyles.value;
      });
    }), Q(a, A), Q(() => e.timeout, A), Ze(() => {
      a.value && A();
    });
    let g = -1;
    function A() {
      d.reset(), window.clearTimeout(g);
      const E = Number(e.timeout);
      if (!a.value || E === -1) return;
      const R = Ni(v.value);
      d.start(R), g = window.setTimeout(() => {
        a.value = !1;
      }, E);
    }
    function k() {
      d.reset(), window.clearTimeout(g);
    }
    function S() {
      f.value = !0, k();
    }
    function w() {
      f.value = !1, A();
    }
    function P(E) {
      x.value = E.touches[0].clientY;
    }
    function b(E) {
      Math.abs(x.value - E.changedTouches[0].clientY) > 50 && (a.value = !1);
    }
    function B() {
      f.value && w();
    }
    const T = I(() => e.location.split(" ").reduce((E, R) => (E[`v-snackbar--${R}`] = !0, E), {}));
    return ie(() => {
      const E = sa.filterProps(e), R = !!(t.default || t.text || e.text);
      return p(sa, L({
        ref: m,
        class: ["v-snackbar", {
          "v-snackbar--active": a.value,
          "v-snackbar--multi-line": e.multiLine && !e.vertical,
          "v-snackbar--timer": !!e.timer,
          "v-snackbar--vertical": e.vertical
        }, T.value, l.value, e.class],
        style: [y.value, e.style]
      }, E, {
        modelValue: a.value,
        "onUpdate:modelValue": (F) => a.value = F,
        contentProps: L({
          class: ["v-snackbar__wrapper", i.value, s.value, r.value, c.value],
          style: [u.value],
          onPointerenter: S,
          onPointerleave: w
        }, E.contentProps),
        persistent: !0,
        noClickAnimation: !0,
        scrim: !1,
        scrollStrategy: "none",
        _disableGlobalStack: !0,
        onTouchstartPassive: P,
        onTouchend: b,
        onAfterLeave: B
      }, o), {
        default: () => {
          var F, z;
          return [ll(!1, "v-snackbar"), e.timer && !f.value && C("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [p(Ti, {
            ref: v,
            color: typeof e.timer == "string" ? e.timer : "info",
            max: e.timeout,
            "model-value": d.time.value
          }, null)]), R && C("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((F = t.text) == null ? void 0 : F.call(t)) ?? e.text, (z = t.default) == null ? void 0 : z.call(t)]), t.actions && p(Fe, {
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
    }), yt({}, m);
  }
}), gl = Symbol.for("vuetify:v-tabs"), iu = K({
  fixed: Boolean,
  sliderColor: String,
  hideSlider: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ...gt(rn({
    selectedClass: "v-tab--selected",
    variant: "text"
  }), ["active", "block", "flat", "location", "position", "symbol"])
}, "VTab"), ja = ne()({
  name: "VTab",
  props: iu(),
  setup(e, n) {
    let {
      slots: t,
      attrs: a
    } = n;
    const {
      textColorClasses: l,
      textColorStyles: o
    } = Kt(() => e.sliderColor), i = q(), s = q(), u = I(() => e.direction === "horizontal"), c = I(() => {
      var d, m;
      return ((m = (d = i.value) == null ? void 0 : d.group) == null ? void 0 : m.isSelected.value) ?? !1;
    });
    function r(d) {
      var v, f;
      let {
        value: m
      } = d;
      if (m) {
        const x = (f = (v = i.value) == null ? void 0 : v.$el.parentElement) == null ? void 0 : f.querySelector(".v-tab--selected .v-tab__slider"), y = s.value;
        if (!x || !y) return;
        const h = getComputedStyle(x).color, g = x.getBoundingClientRect(), A = y.getBoundingClientRect(), k = u.value ? "x" : "y", S = u.value ? "X" : "Y", w = u.value ? "right" : "bottom", P = u.value ? "width" : "height", b = g[k], B = A[k], T = b > B ? g[w] - A[w] : g[k] - A[k], E = Math.sign(T) > 0 ? u.value ? "right" : "bottom" : Math.sign(T) < 0 ? u.value ? "left" : "top" : "center", F = (Math.abs(T) + (Math.sign(T) < 0 ? g[P] : A[P])) / Math.max(g[P], A[P]) || 0, z = g[P] / A[P] || 0, W = 1.5;
        ht(y, {
          backgroundColor: [h, "currentcolor"],
          transform: [`translate${S}(${T}px) scale${S}(${z})`, `translate${S}(${T / W}px) scale${S}(${(F - 1) / W + 1})`, "none"],
          transformOrigin: Array(3).fill(E)
        }, {
          duration: 225,
          easing: Ot
        });
      }
    }
    return ie(() => {
      const d = be.filterProps(e);
      return p(be, L({
        symbol: gl,
        ref: i,
        class: ["v-tab", e.class],
        style: e.style,
        tabindex: c.value ? 0 : -1,
        role: "tab",
        "aria-selected": String(c.value),
        active: !1
      }, d, a, {
        block: e.fixed,
        maxWidth: e.fixed ? 300 : void 0,
        "onGroup:selected": r
      }), {
        ...t,
        default: () => {
          var m;
          return C(J, null, [((m = t.default) == null ? void 0 : m.call(t)) ?? e.text, !e.hideSlider && C("div", {
            ref: s,
            class: fe(["v-tab__slider", l.value]),
            style: Ve(o.value)
          }, null)]);
        }
      });
    }), yt({}, i);
  }
}), su = (e) => {
  const {
    touchstartX: n,
    touchendX: t,
    touchstartY: a,
    touchendY: l
  } = e, o = 0.5, i = 16;
  e.offsetX = t - n, e.offsetY = l - a, Math.abs(e.offsetY) < o * Math.abs(e.offsetX) && (e.left && t < n - i && e.left(e), e.right && t > n + i && e.right(e)), Math.abs(e.offsetX) < o * Math.abs(e.offsetY) && (e.up && l < a - i && e.up(e), e.down && l > a + i && e.down(e));
};
function uu(e, n) {
  var a;
  const t = e.changedTouches[0];
  n.touchstartX = t.clientX, n.touchstartY = t.clientY, (a = n.start) == null || a.call(n, {
    originalEvent: e,
    ...n
  });
}
function ru(e, n) {
  var a;
  const t = e.changedTouches[0];
  n.touchendX = t.clientX, n.touchendY = t.clientY, (a = n.end) == null || a.call(n, {
    originalEvent: e,
    ...n
  }), su(n);
}
function cu(e, n) {
  var a;
  const t = e.changedTouches[0];
  n.touchmoveX = t.clientX, n.touchmoveY = t.clientY, (a = n.move) == null || a.call(n, {
    originalEvent: e,
    ...n
  });
}
function du() {
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
    touchstart: (t) => uu(t, n),
    touchend: (t) => ru(t, n),
    touchmove: (t) => cu(t, n)
  };
}
function vu(e, n) {
  var s;
  const t = n.value, a = t != null && t.parent ? e.parentElement : e, l = (t == null ? void 0 : t.options) ?? {
    passive: !0
  }, o = (s = n.instance) == null ? void 0 : s.$.uid;
  if (!a || !o) return;
  const i = du(n.value);
  a._touchHandlers = a._touchHandlers ?? /* @__PURE__ */ Object.create(null), a._touchHandlers[o] = i, Cn(i).forEach((u) => {
    a.addEventListener(u, i[u], l);
  });
}
function fu(e, n) {
  var o, i;
  const t = (o = n.value) != null && o.parent ? e.parentElement : e, a = (i = n.instance) == null ? void 0 : i.$.uid;
  if (!(t != null && t._touchHandlers) || !a) return;
  const l = t._touchHandlers[a];
  Cn(l).forEach((s) => {
    t.removeEventListener(s, l[s]);
  }), delete t._touchHandlers[a];
}
const Ya = {
  mounted: vu,
  unmounted: fu
}, qn = Symbol.for("vuetify:v-window"), Xn = Symbol.for("vuetify:v-window-group"), Zn = K({
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
  ...Se(),
  ...Ue(),
  ...Le()
}, "VWindow"), qa = ne()({
  name: "VWindow",
  directives: {
    vTouch: Ya
  },
  props: Zn(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const {
      themeClasses: a
    } = je(e), {
      isRtl: l
    } = nt(), {
      t: o
    } = ot(), i = nl(e, Xn), s = q(), u = I(() => l.value ? !e.reverse : e.reverse), c = ee(!1), r = I(() => {
      const k = e.direction === "vertical" ? "y" : "x", w = (u.value ? !c.value : c.value) ? "-reverse" : "";
      return `v-window-${k}${w}-transition`;
    }), d = ee(0), m = q(void 0), v = I(() => i.items.value.findIndex((k) => i.selected.value.includes(k.id)));
    Q(v, (k, S) => {
      const w = i.items.value.length, P = w - 1;
      w <= 2 ? c.value = k < S : k === P && S === 0 ? c.value = !0 : k === 0 && S === P ? c.value = !1 : c.value = k < S;
    }), ze(qn, {
      transition: r,
      isReversed: c,
      transitionCount: d,
      transitionHeight: m,
      rootRef: s
    });
    const f = H(() => e.continuous || v.value !== 0), x = H(() => e.continuous || v.value !== i.items.value.length - 1);
    function y() {
      f.value && i.prev();
    }
    function h() {
      x.value && i.next();
    }
    const g = I(() => {
      const k = [], S = {
        icon: l.value ? e.nextIcon : e.prevIcon,
        class: `v-window__${u.value ? "right" : "left"}`,
        onClick: i.prev,
        "aria-label": o("$vuetify.carousel.prev")
      };
      k.push(f.value ? t.prev ? t.prev({
        props: S
      }) : p(be, S, null) : C("div", null, null));
      const w = {
        icon: l.value ? e.prevIcon : e.nextIcon,
        class: `v-window__${u.value ? "left" : "right"}`,
        onClick: i.next,
        "aria-label": o("$vuetify.carousel.next")
      };
      return k.push(x.value ? t.next ? t.next({
        props: w
      }) : p(be, w, null) : C("div", null, null)), k;
    }), A = I(() => e.touch === !1 ? e.touch : {
      ...{
        left: () => {
          u.value ? y() : h();
        },
        right: () => {
          u.value ? h() : y();
        },
        start: (S) => {
          let {
            originalEvent: w
          } = S;
          w.stopPropagation();
        }
      },
      ...e.touch === !0 ? {} : e.touch
    });
    return ie(() => Ke(p(e.tag, {
      ref: s,
      class: fe(["v-window", {
        "v-window--show-arrows-on-hover": e.showArrows === "hover"
      }, a.value, e.class]),
      style: Ve(e.style)
    }, {
      default: () => {
        var k, S;
        return [C("div", {
          class: "v-window__container",
          style: {
            height: m.value
          }
        }, [(k = t.default) == null ? void 0 : k.call(t, {
          group: i
        }), e.showArrows !== !1 && C("div", {
          class: "v-window__controls"
        }, [g.value])]), (S = t.additional) == null ? void 0 : S.call(t, {
          group: i
        })];
      }
    }), [[Ya, A.value]])), {
      group: i
    };
  }
}), mu = K({
  ...gt(Zn(), ["continuous", "nextIcon", "prevIcon", "showArrows", "touch", "mandatory"])
}, "VTabsWindow"), yl = ne()({
  name: "VTabsWindow",
  props: mu(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = ve(gl, null), l = we(e, "modelValue"), o = I({
      get() {
        var i;
        return l.value != null || !a ? l.value : (i = a.items.value.find((s) => a.selected.value.includes(s.id))) == null ? void 0 : i.value;
      },
      set(i) {
        l.value = i;
      }
    });
    return ie(() => {
      const i = qa.filterProps(e);
      return p(qa, L({
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
}), Qn = K({
  reverseTransition: {
    type: [Boolean, String],
    default: void 0
  },
  transition: {
    type: [Boolean, String],
    default: void 0
  },
  ...Se(),
  ...ol(),
  ...Kn()
}, "VWindowItem"), Xa = ne()({
  name: "VWindowItem",
  directives: {
    vTouch: Ya
  },
  props: Qn(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = ve(qn), l = il(e, Xn), {
      isBooted: o
    } = ba();
    if (!a || !l) throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const i = ee(!1), s = I(() => o.value && (a.isReversed.value ? e.reverseTransition !== !1 : e.transition !== !1));
    function u() {
      !i.value || !a || (i.value = !1, a.transitionCount.value > 0 && (a.transitionCount.value -= 1, a.transitionCount.value === 0 && (a.transitionHeight.value = void 0)));
    }
    function c() {
      var f;
      i.value || !a || (i.value = !0, a.transitionCount.value === 0 && (a.transitionHeight.value = ye((f = a.rootRef.value) == null ? void 0 : f.clientHeight)), a.transitionCount.value += 1);
    }
    function r() {
      u();
    }
    function d(f) {
      i.value && Te(() => {
        !s.value || !i.value || !a || (a.transitionHeight.value = ye(f.clientHeight));
      });
    }
    const m = I(() => {
      const f = a.isReversed.value ? e.reverseTransition : e.transition;
      return s.value ? {
        name: typeof f != "string" ? a.transition.value : f,
        onBeforeEnter: c,
        onAfterEnter: u,
        onEnterCancelled: r,
        onBeforeLeave: c,
        onAfterLeave: u,
        onLeaveCancelled: r,
        onEnter: d
      } : !1;
    }), {
      hasContent: v
    } = Gn(e, l.isSelected);
    return ie(() => p(wa, {
      transition: m.value,
      disabled: !o.value
    }, {
      default: () => {
        var f;
        return [Ke(C("div", {
          class: fe(["v-window-item", l.selectedClass.value, e.class]),
          style: Ve(e.style)
        }, [v.value && ((f = t.default) == null ? void 0 : f.call(t))]), [[Tt, l.isSelected.value]])];
      }
    })), {
      groupItem: l
    };
  }
}), gu = K({
  ...Qn()
}, "VTabsWindowItem"), ua = ne()({
  name: "VTabsWindowItem",
  props: gu(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    return ie(() => {
      const a = Xa.filterProps(e);
      return p(Xa, L({
        _as: "VTabsWindowItem"
      }, a, {
        class: ["v-tabs-window-item", e.class],
        style: e.style
      }), t);
    }), {};
  }
});
function yu(e) {
  let {
    selectedElement: n,
    containerElement: t,
    isRtl: a,
    isHorizontal: l
  } = e;
  const o = Rt(l, t), i = Jn(l, a, t), s = Rt(l, n), u = eo(l, n), c = s * 0.4;
  return i > u ? u - c : i + o < u + s ? u - o + s + c : i;
}
function hu(e) {
  let {
    selectedElement: n,
    containerElement: t,
    isHorizontal: a
  } = e;
  const l = Rt(a, t), o = eo(a, n), i = Rt(a, n);
  return o - l / 2 + i / 2;
}
function Ql(e, n) {
  const t = e ? "scrollWidth" : "scrollHeight";
  return (n == null ? void 0 : n[t]) || 0;
}
function bu(e, n) {
  const t = e ? "clientWidth" : "clientHeight";
  return (n == null ? void 0 : n[t]) || 0;
}
function Jn(e, n, t) {
  if (!t)
    return 0;
  const {
    scrollLeft: a,
    offsetWidth: l,
    scrollWidth: o
  } = t;
  return e ? n ? o - l + a : a : t.scrollTop;
}
function Rt(e, n) {
  const t = e ? "offsetWidth" : "offsetHeight";
  return (n == null ? void 0 : n[t]) || 0;
}
function eo(e, n) {
  const t = e ? "offsetLeft" : "offsetTop";
  return (n == null ? void 0 : n[t]) || 0;
}
const to = Symbol.for("vuetify:v-slide-group"), hl = K({
  centerActive: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  symbol: {
    type: null,
    default: to
  },
  nextIcon: {
    type: xe,
    default: "$next"
  },
  prevIcon: {
    type: xe,
    default: "$prev"
  },
  showArrows: {
    type: [Boolean, String],
    validator: (e) => typeof e == "boolean" || ["always", "desktop", "mobile"].includes(e)
  },
  ...Se(),
  ...Gt({
    mobile: null
  }),
  ...Ue(),
  ...fn({
    selectedClass: "v-slide-group-item--active"
  })
}, "VSlideGroup"), Mt = ne()({
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
      mobile: o
    } = mt(e), i = nl(e, e.symbol), s = ee(!1), u = ee(0), c = ee(0), r = ee(0), d = I(() => e.direction === "horizontal"), {
      resizeRef: m,
      contentRect: v
    } = Vt(), {
      resizeRef: f,
      contentRect: x
    } = Vt(), y = qi(), h = I(() => ({
      container: m.el,
      duration: 200,
      easing: "easeOutQuart"
    })), g = I(() => i.selected.value.length ? i.items.value.findIndex(($) => $.id === i.selected.value[0]) : -1), A = I(() => i.selected.value.length ? i.items.value.findIndex(($) => $.id === i.selected.value[i.selected.value.length - 1]) : -1);
    if (He) {
      let $ = -1;
      Q(() => [i.selected.value, v.value, x.value, d.value], () => {
        cancelAnimationFrame($), $ = requestAnimationFrame(() => {
          if (v.value && x.value) {
            const O = d.value ? "width" : "height";
            c.value = v.value[O], r.value = x.value[O], s.value = c.value + 1 < r.value;
          }
          if (g.value >= 0 && f.el) {
            const O = f.el.children[A.value];
            S(O, e.centerActive);
          }
        });
      });
    }
    const k = ee(!1);
    function S($, O) {
      let U = 0;
      O ? U = hu({
        containerElement: m.el,
        isHorizontal: d.value,
        selectedElement: $
      }) : U = yu({
        containerElement: m.el,
        isHorizontal: d.value,
        isRtl: a.value,
        selectedElement: $
      }), w(U);
    }
    function w($) {
      if (!He || !m.el) return;
      const O = Rt(d.value, m.el), U = Jn(d.value, a.value, m.el);
      if (!(Ql(d.value, m.el) <= O || // Prevent scrolling by only a couple of pixels, which doesn't look smooth
      Math.abs($ - U) < 16)) {
        if (d.value && a.value && m.el) {
          const {
            scrollWidth: le,
            offsetWidth: se
          } = m.el;
          $ = le - se - $;
        }
        d.value ? y.horizontal($, h.value) : y($, h.value);
      }
    }
    function P($) {
      const {
        scrollTop: O,
        scrollLeft: U
      } = $.target;
      u.value = d.value ? U : O;
    }
    function b($) {
      if (k.value = !0, !(!s.value || !f.el)) {
        for (const O of $.composedPath())
          for (const U of f.el.children)
            if (U === O) {
              S(U);
              return;
            }
      }
    }
    function B($) {
      k.value = !1;
    }
    let T = !1;
    function E($) {
      var O;
      !T && !k.value && !($.relatedTarget && ((O = f.el) != null && O.contains($.relatedTarget))) && W(), T = !1;
    }
    function R() {
      T = !0;
    }
    function F($) {
      if (!f.el) return;
      function O(U) {
        $.preventDefault(), W(U);
      }
      d.value ? $.key === "ArrowRight" ? O(a.value ? "prev" : "next") : $.key === "ArrowLeft" && O(a.value ? "next" : "prev") : $.key === "ArrowDown" ? O("next") : $.key === "ArrowUp" && O("prev"), $.key === "Home" ? O("first") : $.key === "End" && O("last");
    }
    function z($, O) {
      if (!$) return;
      let U = $;
      do
        U = U == null ? void 0 : U[O === "next" ? "nextElementSibling" : "previousElementSibling"];
      while (U != null && U.hasAttribute("disabled"));
      return U;
    }
    function W($) {
      if (!f.el) return;
      let O;
      if (!$)
        O = za(f.el)[0];
      else if ($ === "next") {
        if (O = z(f.el.querySelector(":focus"), $), !O) return W("first");
      } else if ($ === "prev") {
        if (O = z(f.el.querySelector(":focus"), $), !O) return W("last");
      } else $ === "first" ? (O = f.el.firstElementChild, O != null && O.hasAttribute("disabled") && (O = z(O, "next"))) : $ === "last" && (O = f.el.lastElementChild, O != null && O.hasAttribute("disabled") && (O = z(O, "prev")));
      O && O.focus({
        preventScroll: !0
      });
    }
    function G($) {
      const O = d.value && a.value ? -1 : 1, U = ($ === "prev" ? -O : O) * c.value;
      let he = u.value + U;
      if (d.value && a.value && m.el) {
        const {
          scrollWidth: le,
          offsetWidth: se
        } = m.el;
        he += le - se;
      }
      w(he);
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
    }), ue = I(() => Math.abs(u.value) > 1), _ = I(() => {
      if (!m.value) return !1;
      const $ = Ql(d.value, m.el), O = bu(d.value, m.el);
      return $ - O - Math.abs(u.value) > 1;
    });
    return ie(() => p(e.tag, {
      class: fe(["v-slide-group", {
        "v-slide-group--vertical": !d.value,
        "v-slide-group--has-affixes": ae.value,
        "v-slide-group--is-overflowing": s.value
      }, l.value, e.class]),
      style: Ve(e.style),
      tabindex: k.value || i.selected.value.length ? -1 : 0,
      onFocus: E
    }, {
      default: () => {
        var $, O, U;
        return [ae.value && C("div", {
          key: "prev",
          class: fe(["v-slide-group__prev", {
            "v-slide-group__prev--disabled": !ue.value
          }]),
          onMousedown: R,
          onClick: () => ue.value && G("prev")
        }, [(($ = t.prev) == null ? void 0 : $.call(t, te.value)) ?? p(Ol, null, {
          default: () => [p(ke, {
            icon: a.value ? e.nextIcon : e.prevIcon
          }, null)]
        })]), C("div", {
          key: "container",
          ref: m,
          class: "v-slide-group__container",
          onScroll: P
        }, [C("div", {
          ref: f,
          class: "v-slide-group__content",
          onFocusin: b,
          onFocusout: B,
          onKeydown: F
        }, [(O = t.default) == null ? void 0 : O.call(t, te.value)])]), ae.value && C("div", {
          key: "next",
          class: fe(["v-slide-group__next", {
            "v-slide-group__next--disabled": !_.value
          }]),
          onMousedown: R,
          onClick: () => _.value && G("next")
        }, [((U = t.next) == null ? void 0 : U.call(t, te.value)) ?? p(Ol, null, {
          default: () => [p(ke, {
            icon: a.value ? e.prevIcon : e.nextIcon
          }, null)]
        })])];
      }
    })), {
      selected: i.selected,
      scrollTo: G,
      scrollOffset: u,
      focus: W,
      hasPrev: ue,
      hasNext: _
    };
  }
});
function pu(e) {
  return e ? e.map((n) => Hi(n) ? n : {
    text: n,
    value: n
  }) : [];
}
const wu = K({
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
  ...ft(),
  ...Ue()
}, "VTabs"), xu = ne()({
  name: "VTabs",
  props: wu(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, n) {
    let {
      attrs: t,
      slots: a
    } = n;
    const l = we(e, "modelValue"), o = I(() => pu(e.items)), {
      densityClasses: i
    } = Bt(e), {
      backgroundColorClasses: s,
      backgroundColorStyles: u
    } = st(() => e.bgColor), {
      scopeId: c
    } = jt();
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
      const r = Mt.filterProps(e), d = !!(a.window || e.items.length > 0);
      return C(J, null, [p(Mt, L(r, {
        modelValue: l.value,
        "onUpdate:modelValue": (m) => l.value = m,
        class: ["v-tabs", `v-tabs--${e.direction}`, `v-tabs--align-tabs-${e.alignTabs}`, {
          "v-tabs--fixed-tabs": e.fixedTabs,
          "v-tabs--grow": e.grow,
          "v-tabs--stacked": e.stacked
        }, i.value, s.value, e.class],
        style: [{
          "--v-tabs-height": ye(e.height)
        }, u.value, e.style],
        role: "tablist",
        symbol: gl
      }, c, t), {
        default: () => {
          var m;
          return [((m = a.default) == null ? void 0 : m.call(a)) ?? o.value.map((v) => {
            var f;
            return ((f = a.tab) == null ? void 0 : f.call(a, {
              item: v
            })) ?? p(ja, L(v, {
              key: v.text,
              value: v.value
            }), {
              default: a[`tab.${v.value}`] ? () => {
                var x;
                return (x = a[`tab.${v.value}`]) == null ? void 0 : x.call(a, {
                  item: v
                });
              } : void 0
            });
          })];
        }
      }), d && p(yl, L({
        modelValue: l.value,
        "onUpdate:modelValue": (m) => l.value = m,
        key: "tabs-window"
      }, c), {
        default: () => {
          var m;
          return [o.value.map((v) => {
            var f;
            return ((f = a.item) == null ? void 0 : f.call(a, {
              item: v
            })) ?? p(ua, {
              value: v.value
            }, {
              default: () => {
                var x;
                return (x = a[`item.${v.value}`]) == null ? void 0 : x.call(a, {
                  item: v
                });
              }
            });
          }), (m = a.window) == null ? void 0 : m.call(a)];
        }
      })]);
    }), {};
  }
}), Su = {
  class: "nav-home",
  href: "/"
};
var tn;
const ku = /* @__PURE__ */ Ge({
  __name: "OxApp",
  props: {
    apiUrl: {},
    logo: {},
    dataEl: { default: (tn = document.body.dataset) == null ? void 0 : tn.appData },
    models: {},
    data: {}
  },
  setup(e) {
    const n = vt(), t = bt(n, "panels."), a = e, l = Qe({ drawer: !0 }), o = yi(a), i = hi();
    return Ze(() => {
      i.panel = o.data.panel;
    }), Q(() => [o.state.state, o.state.data], () => {
      o.showState = !0;
    }), ii((s, u, c) => {
      o.state.error(`${s}`);
    }), (s, u) => (D(), Y(Is, null, {
      default: M(() => [
        p(ou, {
          modelValue: V(o).showState,
          "onUpdate:modelValue": u[0] || (u[0] = (c) => V(o).showState = c),
          color: V(o).state.color,
          "multi-line": ""
        }, {
          default: M(() => [
            Pe(Re(V(o).state.toString()), 1)
          ]),
          _: 1
        }, 8, ["modelValue", "color"]),
        p(Es, { color: "primary" }, {
          prepend: M(() => [
            V(n)["nav-start"] || V(n)["nav-end"] ? (D(), Y(Hn, {
              key: 0,
              icon: "mdi-apps",
              title: V(oe)("nav.panels"),
              "aria-label": V(oe)("nav.panels"),
              onClick: u[1] || (u[1] = Ie((c) => l.drawer = !l.drawer, ["stop"]))
            }, null, 8, ["title", "aria-label"])) : de("", !0)
          ]),
          default: M(() => [
            p(Kl, { id: "app-bar-sheet-title" }),
            p(Kl, { id: "app-bar-title" }, {
              default: M(() => [
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
        V(n)["nav-start"] || V(n)["nav-end"] ? (D(), Y(V(Cs), {
          key: 0,
          drawer: l.drawer,
          "onUpdate:drawer": u[3] || (u[3] = (c) => l.drawer = c),
          items: V(o).data.nav
        }, kt({
          prepend: M(() => [
            C("a", Su, [
              s.logo ? (D(), Y(pa, {
                key: 0,
                src: s.logo,
                class: "logo"
              }, null, 8, ["src"])) : de("", !0)
            ]),
            j(s.$slots, "nav-start", { context: V(o) })
          ]),
          _: 2
        }, [
          V(n)["nav-end"] ? {
            name: "append",
            fn: M(() => [
              p(ut, {
                opened: l.opened,
                "onUpdate:opened": u[2] || (u[2] = (c) => l.opened = c)
              }, {
                default: M(() => [
                  j(s.$slots, "nav-end", { context: V(o) })
                ]),
                _: 3
              }, 8, ["opened"])
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["drawer", "items"])) : de("", !0),
        p(Fs, null, {
          default: M(() => [
            j(s.$slots, "main", {}, () => [
              p(yl, {
                modelValue: V(i).panel,
                "onUpdate:modelValue": u[4] || (u[4] = (c) => V(i).panel = c)
              }, {
                default: M((c) => [
                  j(s.$slots, "default", L(c, { context: V(o) })),
                  (D(!0), pe(J, null, Me(V(t), (r, d) => (D(), Y(ua, {
                    key: d,
                    value: r
                  }, {
                    default: M(() => [
                      j(s.$slots, d, L({ ref_for: !0 }, c, { context: V(o) }))
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
}), Vu = K({
  text: String,
  onClick: Xe(),
  ...Se(),
  ...Le()
}, "VLabel"), ao = ne()({
  name: "VLabel",
  props: Vu(),
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
  falseIcon: xe,
  trueIcon: xe,
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
    default: it
  },
  ...Se(),
  ...ft(),
  ...Le()
}, "SelectionControlGroup"), Cu = K({
  ...no({
    defaultsTarget: "VSelectionControl"
  })
}, "VSelectionControlGroup");
ne()({
  name: "VSelectionControlGroup",
  props: Cu(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = we(e, "modelValue"), l = ct(), o = H(() => e.id || `v-selection-control-group-${l}`), i = H(() => e.name || o.value), s = /* @__PURE__ */ new Set();
    return ze(lo, {
      modelValue: a,
      forceUpdate: () => {
        s.forEach((u) => u());
      },
      onForceUpdate: (u) => {
        s.add(u), We(() => {
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
        class: fe(["v-selection-control-group", {
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
  ...Se(),
  ...no()
}, "VSelectionControl");
function Pu(e) {
  const n = ve(lo, void 0), {
    densityClasses: t
  } = Bt(e), a = we(e, "modelValue"), l = I(() => e.trueValue !== void 0 ? e.trueValue : e.value !== void 0 ? e.value : !0), o = I(() => e.falseValue !== void 0 ? e.falseValue : !1), i = I(() => !!e.multiple || e.multiple == null && Array.isArray(a.value)), s = I({
    get() {
      const v = n ? n.modelValue.value : a.value;
      return i.value ? Ne(v).some((f) => e.valueComparator(f, l.value)) : e.valueComparator(v, l.value);
    },
    set(v) {
      if (e.readonly) return;
      const f = v ? l.value : o.value;
      let x = f;
      i.value && (x = v ? [...Ne(a.value), f] : Ne(a.value).filter((y) => !e.valueComparator(y, l.value))), n ? n.modelValue.value = x : a.value = x;
    }
  }), {
    textColorClasses: u,
    textColorStyles: c
  } = Kt(() => {
    if (!(e.error || e.disabled))
      return s.value ? e.color : e.baseColor;
  }), {
    backgroundColorClasses: r,
    backgroundColorStyles: d
  } = st(() => s.value && !e.error && !e.disabled ? e.color : e.baseColor), m = I(() => s.value ? e.trueIcon : e.falseIcon);
  return {
    group: n,
    densityClasses: t,
    trueValue: l,
    falseValue: o,
    model: s,
    textColorClasses: u,
    textColorStyles: c,
    backgroundColorClasses: r,
    backgroundColorStyles: d,
    icon: m
  };
}
const Jl = ne()({
  name: "VSelectionControl",
  directives: {
    vRipple: Ct
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
      textColorStyles: c,
      backgroundColorClasses: r,
      backgroundColorStyles: d,
      trueValue: m
    } = Pu(e), v = ct(), f = ee(!1), x = ee(!1), y = q(), h = H(() => e.id || `input-${v}`), g = H(() => !e.disabled && !e.readonly);
    l == null || l.onForceUpdate(() => {
      y.value && (y.value.checked = s.value);
    });
    function A(P) {
      g.value && (f.value = !0, It(P.target, ":focus-visible") !== !1 && (x.value = !0));
    }
    function k() {
      f.value = !1, x.value = !1;
    }
    function S(P) {
      P.stopPropagation();
    }
    function w(P) {
      if (!g.value) {
        y.value && (y.value.checked = s.value);
        return;
      }
      e.readonly && l && Te(() => l.forceUpdate()), s.value = P.target.checked;
    }
    return ie(() => {
      var E, R;
      const P = a.label ? a.label({
        label: e.label,
        props: {
          for: h.value
        }
      }) : e.label, [b, B] = xa(t), T = C("input", L({
        ref: y,
        checked: s.value,
        disabled: !!e.disabled,
        id: h.value,
        onBlur: k,
        onFocus: A,
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
          "v-selection-control--focused": f.value,
          "v-selection-control--focus-visible": x.value,
          "v-selection-control--inline": e.inline
        }, o.value, e.class]
      }, b, {
        style: e.style
      }), [C("div", {
        class: fe(["v-selection-control__wrapper", u.value]),
        style: Ve(c.value)
      }, [(E = a.default) == null ? void 0 : E.call(a, {
        backgroundColorClasses: r,
        backgroundColorStyles: d
      }), Ke(C("div", {
        class: fe(["v-selection-control__input"])
      }, [((R = a.input) == null ? void 0 : R.call(a, {
        model: s,
        textColorClasses: u,
        textColorStyles: c,
        backgroundColorClasses: r,
        backgroundColorStyles: d,
        inputNode: T,
        icon: i.value,
        props: {
          onFocus: A,
          onBlur: k,
          id: h.value
        }
      })) ?? C(J, null, [i.value && p(ke, {
        key: "icon",
        icon: i.value
      }, null), T])]), [[Ct, e.ripple && [!e.disabled && !e.readonly, null, ["center", "circle"]]]])]), P && p(ao, {
        for: h.value,
        onClick: S
      }, {
        default: () => [P]
      })]);
    }), {
      isFocused: f,
      input: y
    };
  }
}), io = K({
  indeterminate: Boolean,
  indeterminateIcon: {
    type: xe,
    default: "$checkboxIndeterminate"
  },
  ...oo({
    falseIcon: "$checkboxOff",
    trueIcon: "$checkboxOn"
  })
}, "VCheckboxBtn"), pt = ne()({
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
      const u = gt(Jl.filterProps(e), ["modelValue"]);
      return p(Jl, L(u, {
        modelValue: l.value,
        "onUpdate:modelValue": [(c) => l.value = c, o],
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
  } = ot();
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
    function c(d) {
      d.key !== "Enter" && d.key !== " " || (d.preventDefault(), d.stopPropagation(), dl(u, new PointerEvent("click", d)));
    }
    const r = u && s ? n(`$vuetify.input.${s}`, e.label ?? "") : void 0;
    return p(ke, L({
      icon: e[`${l}Icon`],
      "aria-label": r,
      onClick: u,
      onKeydown: c,
      color: o
    }, i), null);
  }
  return {
    InputIcon: t
  };
}
const Iu = K({
  active: Boolean,
  color: String,
  messages: {
    type: [Array, String],
    default: () => []
  },
  ...Se(),
  ...Wt({
    transition: {
      component: mn,
      leaveAbsolute: !0,
      group: !0
    }
  })
}, "VMessages"), Au = ne()({
  name: "VMessages",
  props: Iu(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = I(() => Ne(e.messages)), {
      textColorClasses: l,
      textColorStyles: o
    } = Kt(() => e.color);
    return ie(() => p(wa, {
      transition: e.transition,
      tag: "div",
      class: fe(["v-messages", l.value, e.class]),
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
  "onUpdate:focused": Xe()
}, "focus");
function Sa(e) {
  let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Pn();
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
const ro = Symbol.for("vuetify:form"), Tu = K({
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
function _u(e) {
  const n = we(e, "modelValue"), t = H(() => e.disabled), a = H(() => e.readonly), l = ee(!1), o = q([]), i = q([]);
  async function s() {
    const r = [];
    let d = !0;
    i.value = [], l.value = !0;
    for (const m of o.value) {
      const v = await m.validate();
      if (v.length > 0 && (d = !1, r.push({
        id: m.id,
        errorMessages: v
      })), !d && e.fastFail) break;
    }
    return i.value = r, l.value = !1, {
      valid: d,
      errors: i.value
    };
  }
  function u() {
    o.value.forEach((r) => r.reset());
  }
  function c() {
    o.value.forEach((r) => r.resetValidation());
  }
  return Q(o, () => {
    let r = 0, d = 0;
    const m = [];
    for (const v of o.value)
      v.isValid === !1 ? (d++, m.push({
        id: v.id,
        errorMessages: v.errorMessages
      })) : v.isValid === !0 && r++;
    i.value = m, n.value = d > 0 ? !1 : r === o.value.length ? !0 : null;
  }, {
    deep: !0,
    flush: "post"
  }), ze(ro, {
    register: (r) => {
      let {
        id: d,
        vm: m,
        validate: v,
        reset: f,
        resetValidation: x
      } = r;
      o.value.some((y) => y.id === d) && kn(`Duplicate input name "${d}"`), o.value.push({
        id: d,
        validate: v,
        reset: f,
        resetValidation: x,
        vm: si(m),
        isValid: null,
        errorMessages: []
      });
    },
    unregister: (r) => {
      o.value = o.value.filter((d) => d.id !== r);
    },
    update: (r, d, m) => {
      const v = o.value.find((f) => f.id === r);
      v && (v.isValid = d, v.errorMessages = m);
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
    resetValidation: c
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
const Bu = Symbol.for("vuetify:rules");
function Eu(e) {
  const n = ve(Bu, null);
  return n ? n(e) : H(e);
}
const $u = K({
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
function Ou(e) {
  let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Pn(), t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ct();
  const a = we(e, "modelValue"), l = I(() => e.validationValue === void 0 ? a.value : e.validationValue), o = bl(e), i = Eu(() => e.rules), s = q([]), u = ee(!0), c = I(() => !!(Ne(a.value === "" ? null : a.value).length || Ne(l.value === "" ? null : l.value).length)), r = I(() => {
    var k;
    return (k = e.errorMessages) != null && k.length ? Ne(e.errorMessages).concat(s.value).slice(0, Math.max(0, Number(e.maxErrors))) : s.value;
  }), d = I(() => {
    var w;
    let k = (e.validateOn ?? ((w = o.validateOn) == null ? void 0 : w.value)) || "input";
    k === "lazy" && (k = "input lazy"), k === "eager" && (k = "input eager");
    const S = new Set((k == null ? void 0 : k.split(" ")) ?? []);
    return {
      input: S.has("input"),
      blur: S.has("blur") || S.has("input") || S.has("invalid-input"),
      invalidInput: S.has("invalid-input"),
      lazy: S.has("lazy"),
      eager: S.has("eager")
    };
  }), m = I(() => {
    var k;
    return e.error || (k = e.errorMessages) != null && k.length ? !1 : e.rules.length ? u.value ? s.value.length || d.value.lazy ? null : !0 : !s.value.length : !0;
  }), v = ee(!1), f = I(() => ({
    [`${n}--error`]: m.value === !1,
    [`${n}--dirty`]: c.value,
    [`${n}--disabled`]: o.isDisabled.value,
    [`${n}--readonly`]: o.isReadonly.value
  })), x = lt("validation"), y = I(() => e.name ?? V(t));
  ui(() => {
    var k;
    (k = o.register) == null || k.call(o, {
      id: y.value,
      vm: x,
      validate: A,
      reset: h,
      resetValidation: g
    });
  }), dt(() => {
    var k;
    (k = o.unregister) == null || k.call(o, y.value);
  }), Ze(async () => {
    var k;
    d.value.lazy || await A(!d.value.eager), (k = o.update) == null || k.call(o, y.value, m.value, r.value);
  }), qe(() => d.value.input || d.value.invalidInput && m.value === !1, () => {
    Q(l, () => {
      if (l.value != null)
        A();
      else if (e.focused) {
        const k = Q(() => e.focused, (S) => {
          S || A(), k();
        });
      }
    });
  }), qe(() => d.value.blur, () => {
    Q(() => e.focused, (k) => {
      k || A();
    });
  }), Q([m, r], () => {
    var k;
    (k = o.update) == null || k.call(o, y.value, m.value, r.value);
  });
  async function h() {
    a.value = null, await Te(), await g();
  }
  async function g() {
    u.value = !0, d.value.lazy ? s.value = [] : await A(!d.value.eager);
  }
  async function A() {
    let k = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    const S = [];
    v.value = !0;
    for (const w of i.value) {
      if (S.length >= Number(e.maxErrors ?? 1))
        break;
      const b = await (typeof w == "function" ? w : () => w)(l.value);
      if (b !== !0) {
        if (b !== !1 && typeof b != "string") {
          console.warn(`${b} is not a valid value. Rule functions must return boolean true or a string.`);
          continue;
        }
        S.push(b || "");
      }
    }
    return s.value = S, v.value = !1, u.value = k, s.value;
  }
  return {
    errorMessages: r,
    isDirty: c,
    isDisabled: o.isDisabled,
    isReadonly: o.isReadonly,
    isPristine: u,
    isValid: m,
    isValidating: v,
    reset: h,
    resetValidation: g,
    validate: A,
    validationClasses: f
  };
}
const ka = K({
  id: String,
  appendIcon: xe,
  baseColor: String,
  centerAffix: {
    type: Boolean,
    default: !0
  },
  color: String,
  glow: Boolean,
  iconColor: [Boolean, String],
  prependIcon: xe,
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
  "onClick:prepend": Xe(),
  "onClick:append": Xe(),
  ...Se(),
  ...ft(),
  ...zi(zt(), ["maxWidth", "minWidth", "width"]),
  ...Le(),
  ...$u()
}, "VInput"), At = ne()({
  name: "VInput",
  props: {
    ...ka()
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
    } = Bt(e), {
      dimensionStyles: i
    } = Ht(e), {
      themeClasses: s
    } = je(e), {
      rtlClasses: u
    } = nt(), {
      InputIcon: c
    } = so(e), r = ct(), d = I(() => e.id || `input-${r}`), m = I(() => `${d.value}-messages`), {
      errorMessages: v,
      isDirty: f,
      isDisabled: x,
      isReadonly: y,
      isPristine: h,
      isValid: g,
      isValidating: A,
      reset: k,
      resetValidation: S,
      validate: w,
      validationClasses: P
    } = Ou(e, "v-input", d), b = I(() => ({
      id: d,
      messagesId: m,
      isDirty: f,
      isDisabled: x,
      isReadonly: y,
      isPristine: h,
      isValid: g,
      isValidating: A,
      reset: k,
      resetValidation: S,
      validate: w
    })), B = H(() => e.error || e.disabled ? void 0 : e.focused ? e.color : e.baseColor), T = H(() => {
      if (e.iconColor)
        return e.iconColor === !0 ? B.value : e.iconColor;
    }), E = I(() => {
      var R;
      return (R = e.errorMessages) != null && R.length || !h.value && v.value.length ? v.value : e.hint && (e.persistentHint || e.focused) ? e.hint : e.messages;
    });
    return ie(() => {
      var G, te, ae, ue;
      const R = !!(a.prepend || e.prependIcon), F = !!(a.append || e.appendIcon), z = E.value.length > 0, W = !e.hideDetails || e.hideDetails === "auto" && (z || !!a.details);
      return C("div", {
        class: fe(["v-input", `v-input--${e.direction}`, {
          "v-input--center-affix": e.centerAffix,
          "v-input--focused": e.focused,
          "v-input--glow": e.glow,
          "v-input--hide-spin-buttons": e.hideSpinButtons
        }, o.value, s.value, u.value, P.value, e.class]),
        style: Ve([i.value, e.style])
      }, [R && C("div", {
        key: "prepend",
        class: "v-input__prepend"
      }, [(G = a.prepend) == null ? void 0 : G.call(a, b.value), e.prependIcon && p(c, {
        key: "prepend-icon",
        name: "prepend",
        color: T.value
      }, null)]), a.default && C("div", {
        class: "v-input__control"
      }, [(te = a.default) == null ? void 0 : te.call(a, b.value)]), F && C("div", {
        key: "append",
        class: "v-input__append"
      }, [e.appendIcon && p(c, {
        key: "append-icon",
        name: "append",
        color: T.value
      }, null), (ae = a.append) == null ? void 0 : ae.call(a, b.value)]), W && C("div", {
        id: m.value,
        class: "v-input__details",
        role: "alert",
        "aria-live": "polite"
      }, [p(Au, {
        active: z,
        messages: E.value
      }, {
        message: a.message
      }), (ue = a.details) == null ? void 0 : ue.call(a, b.value)])]);
    }), {
      reset: k,
      resetValidation: S,
      validate: w,
      isValid: g,
      errorMessages: v
    };
  }
}), Fu = K({
  ...ka(),
  ...gt(io(), ["inline"])
}, "VCheckbox"), Ru = ne()({
  name: "VCheckbox",
  inheritAttrs: !1,
  props: Fu(),
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
    } = Sa(e), u = ct();
    return ie(() => {
      const [c, r] = xa(t), d = At.filterProps(e), m = pt.filterProps(e);
      return p(At, L({
        class: ["v-checkbox", e.class]
      }, c, d, {
        modelValue: l.value,
        "onUpdate:modelValue": (v) => l.value = v,
        id: e.id || `checkbox-${u}`,
        focused: o.value,
        style: e.style
      }), {
        ...a,
        default: (v) => {
          let {
            id: f,
            messagesId: x,
            isDisabled: y,
            isReadonly: h,
            isValid: g
          } = v;
          return p(pt, L(m, {
            id: f.value,
            "aria-describedby": x.value,
            disabled: y.value,
            readonly: h.value
          }, r, {
            error: g.value === !1,
            modelValue: l.value,
            "onUpdate:modelValue": (A) => l.value = A,
            onFocus: i,
            onBlur: s
          }), a);
        }
      });
    }), {};
  }
}), co = Symbol.for("vuetify:v-chip-group"), Mu = K({
  baseColor: String,
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: it
  },
  ...hl(),
  ...Se(),
  ...fn({
    selectedClass: "v-chip--selected"
  }),
  ...Ue(),
  ...Le(),
  ...Ut({
    variant: "tonal"
  })
}, "VChipGroup");
ne()({
  name: "VChipGroup",
  props: Mu(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const {
      themeClasses: a
    } = je(e), {
      isSelected: l,
      select: o,
      next: i,
      prev: s,
      selected: u
    } = nl(e, co);
    return at({
      VChip: {
        baseColor: H(() => e.baseColor),
        color: H(() => e.color),
        disabled: H(() => e.disabled),
        filter: H(() => e.filter),
        variant: H(() => e.variant)
      }
    }), ie(() => {
      const c = Mt.filterProps(e);
      return p(Mt, L(c, {
        class: ["v-chip-group", {
          "v-chip-group--column": e.column
        }, a.value, e.class],
        style: e.style
      }), {
        default: () => {
          var r;
          return [(r = t.default) == null ? void 0 : r.call(t, {
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
const Du = K({
  activeClass: String,
  appendAvatar: String,
  appendIcon: xe,
  baseColor: String,
  closable: Boolean,
  closeIcon: {
    type: xe,
    default: "$delete"
  },
  closeLabel: {
    type: String,
    default: "$vuetify.close"
  },
  draggable: Boolean,
  filter: Boolean,
  filterIcon: {
    type: xe,
    default: "$complete"
  },
  label: Boolean,
  link: {
    type: Boolean,
    default: void 0
  },
  pill: Boolean,
  prependAvatar: String,
  prependIcon: xe,
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
  onClick: Xe(),
  onClickOnce: Xe(),
  ...Nt(),
  ...Se(),
  ...ft(),
  ...Lt(),
  ...ol(),
  ...wt(),
  ...bn(),
  ...hn(),
  ...Ue({
    tag: "span"
  }),
  ...Le(),
  ...Ut({
    variant: "tonal"
  })
}, "VChip"), pl = ne()({
  name: "VChip",
  directives: {
    vRipple: Ct
  },
  props: Du(),
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
    } = ot(), {
      borderClasses: i
    } = ya(e), {
      densityClasses: s
    } = Bt(e), {
      elevationClasses: u
    } = ha(e), {
      roundedClasses: c
    } = _t(e), {
      sizeClasses: r
    } = _i(e), {
      themeClasses: d
    } = je(e), m = we(e, "modelValue"), v = il(e, co, !1), f = gn(e, t), x = H(() => e.link !== !1 && f.isLink.value), y = I(() => !e.disabled && e.link !== !1 && (!!v || e.link || f.isClickable.value)), h = H(() => ({
      "aria-label": o(e.closeLabel),
      disabled: e.disabled,
      onClick(P) {
        P.preventDefault(), P.stopPropagation(), m.value = !1, a("click:close", P);
      }
    })), {
      colorClasses: g,
      colorStyles: A,
      variantClasses: k
    } = al(() => ({
      color: !v || v.isSelected.value ? e.color ?? e.baseColor : e.baseColor,
      variant: e.variant
    }));
    function S(P) {
      var b;
      a("click", P), y.value && ((b = f.navigate) == null || b.call(f, P), v == null || v.toggle());
    }
    function w(P) {
      (P.key === "Enter" || P.key === " ") && (P.preventDefault(), S(P));
    }
    return () => {
      var z;
      const P = f.isLink.value ? "a" : e.tag, b = !!(e.appendIcon || e.appendAvatar), B = !!(b || l.append), T = !!(l.close || e.closable), E = !!(l.filter || e.filter) && v, R = !!(e.prependIcon || e.prependAvatar), F = !!(R || l.prepend);
      return m.value && Ke(p(P, L({
        class: ["v-chip", {
          "v-chip--disabled": e.disabled,
          "v-chip--label": e.label,
          "v-chip--link": y.value,
          "v-chip--filter": E,
          "v-chip--pill": e.pill,
          [`${e.activeClass}`]: e.activeClass && ((z = f.isActive) == null ? void 0 : z.value)
        }, d.value, i.value, g.value, s.value, u.value, c.value, r.value, k.value, v == null ? void 0 : v.selectedClass.value, e.class],
        style: [A.value, e.style],
        disabled: e.disabled || void 0,
        draggable: e.draggable,
        tabindex: y.value ? 0 : void 0,
        onClick: S,
        onKeydown: y.value && !x.value && w
      }, f.linkProps), {
        default: () => {
          var W;
          return [ll(y.value, "v-chip"), E && p(yn, {
            key: "filter"
          }, {
            default: () => [Ke(C("div", {
              class: "v-chip__filter"
            }, [l.filter ? p(Fe, {
              key: "filter-defaults",
              disabled: !e.filterIcon,
              defaults: {
                VIcon: {
                  icon: e.filterIcon
                }
              }
            }, l.filter) : p(ke, {
              key: "filter-icon",
              icon: e.filterIcon
            }, null)]), [[Tt, v.isSelected.value]])]
          }), F && C("div", {
            key: "prepend",
            class: "v-chip__prepend"
          }, [l.prepend ? p(Fe, {
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
          }, l.prepend) : C(J, null, [e.prependIcon && p(ke, {
            key: "prepend-icon",
            icon: e.prependIcon,
            start: !0
          }, null), e.prependAvatar && p(Pt, {
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
          }, [l.append ? p(Fe, {
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
          }, l.append) : C(J, null, [e.appendIcon && p(ke, {
            key: "append-icon",
            end: !0,
            icon: e.appendIcon
          }, null), e.appendAvatar && p(Pt, {
            key: "append-avatar",
            end: !0,
            image: e.appendAvatar
          }, null)])]), T && C("button", L({
            key: "close",
            class: "v-chip__close",
            type: "button",
            "data-testid": "close-chip"
          }, h.value), [l.close ? p(Fe, {
            key: "close-defaults",
            defaults: {
              VIcon: {
                icon: e.closeIcon,
                size: "x-small"
              }
            }
          }, l.close) : p(ke, {
            key: "close-icon",
            icon: e.closeIcon,
            size: "x-small"
          }, null)])];
        }
      }), [[Ct, y.value && e.ripple, null]]);
    };
  }
}), Lu = K({
  // TODO
  // disableKeys: Boolean,
  id: String,
  submenu: Boolean,
  ...gt(ml({
    closeDelay: 250,
    closeOnContentClick: !0,
    locationStrategy: "connected",
    location: void 0,
    openDelay: 300,
    scrim: !1,
    scrollStrategy: "reposition",
    transition: {
      component: Fn
    }
  }), ["absolute"])
}, "VMenu"), wl = ne()({
  name: "VMenu",
  props: Lu(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = we(e, "modelValue"), {
      scopeId: l
    } = jt(), {
      isRtl: o
    } = nt(), i = ct(), s = H(() => e.id || `v-menu-${i}`), u = q(), c = ve(Ga, null), r = ee(/* @__PURE__ */ new Set());
    ze(Ga, {
      register() {
        r.value.add(i);
      },
      unregister() {
        r.value.delete(i);
      },
      closeParents(y) {
        setTimeout(() => {
          var h;
          !r.value.size && !e.persistent && (y == null || (h = u.value) != null && h.contentEl && !Wi(y, u.value.contentEl)) && (a.value = !1, c == null || c.closeParents());
        }, 40);
      }
    }), dt(() => {
      c == null || c.unregister(), document.removeEventListener("focusin", d);
    }), an(() => a.value = !1);
    async function d(y) {
      var A, k, S;
      const h = y.relatedTarget, g = y.target;
      await Te(), a.value && h !== g && ((A = u.value) != null && A.contentEl) && // We're the topmost menu
      ((k = u.value) != null && k.globalTop) && // It isn't the document or the menu body
      ![document, u.value.contentEl].includes(g) && // It isn't inside the menu body
      !u.value.contentEl.contains(g) && ((S = za(u.value.contentEl)[0]) == null || S.focus());
    }
    Q(a, (y) => {
      y ? (c == null || c.register(), He && document.addEventListener("focusin", d, {
        once: !0
      })) : (c == null || c.unregister(), He && document.removeEventListener("focusin", d));
    }, {
      immediate: !0
    });
    function m(y) {
      c == null || c.closeParents(y);
    }
    function v(y) {
      var h, g, A, k, S;
      if (!e.disabled)
        if (y.key === "Tab" || y.key === "Enter" && !e.closeOnContentClick) {
          if (y.key === "Enter" && (y.target instanceof HTMLTextAreaElement || y.target instanceof HTMLInputElement && y.target.closest("form"))) return;
          y.key === "Enter" && y.preventDefault(), Ui(za((h = u.value) == null ? void 0 : h.contentEl, !1), y.shiftKey ? "prev" : "next", (P) => P.tabIndex >= 0) || (a.value = !1, (A = (g = u.value) == null ? void 0 : g.activatorEl) == null || A.focus());
        } else e.submenu && y.key === (o.value ? "ArrowRight" : "ArrowLeft") && (a.value = !1, (S = (k = u.value) == null ? void 0 : k.activatorEl) == null || S.focus());
    }
    function f(y) {
      var g;
      if (e.disabled) return;
      const h = (g = u.value) == null ? void 0 : g.contentEl;
      h && a.value ? y.key === "ArrowDown" ? (y.preventDefault(), y.stopImmediatePropagation(), Ta(h, "next")) : y.key === "ArrowUp" ? (y.preventDefault(), y.stopImmediatePropagation(), Ta(h, "prev")) : e.submenu && (y.key === (o.value ? "ArrowRight" : "ArrowLeft") ? a.value = !1 : y.key === (o.value ? "ArrowLeft" : "ArrowRight") && (y.preventDefault(), Ta(h, "first"))) : (e.submenu ? y.key === (o.value ? "ArrowLeft" : "ArrowRight") : ["ArrowDown", "ArrowUp"].includes(y.key)) && (a.value = !0, y.preventDefault(), setTimeout(() => setTimeout(() => f(y))));
    }
    const x = I(() => L({
      "aria-haspopup": "menu",
      "aria-expanded": String(a.value),
      "aria-controls": s.value,
      onKeydown: f
    }, e.activatorProps));
    return ie(() => {
      const y = sa.filterProps(e);
      return p(sa, L({
        ref: u,
        id: s.value,
        class: ["v-menu", e.class],
        style: e.style
      }, y, {
        modelValue: a.value,
        "onUpdate:modelValue": (h) => a.value = h,
        absolute: !0,
        activatorProps: x.value,
        location: e.location ?? (e.submenu ? "end" : "bottom"),
        "onClick:outside": m,
        onKeydown: v
      }, l), {
        activator: t.activator,
        default: function() {
          for (var h = arguments.length, g = new Array(h), A = 0; A < h; A++)
            g[A] = arguments[A];
          return p(Fe, {
            root: "VMenu"
          }, {
            default: () => {
              var k;
              return [(k = t.default) == null ? void 0 : k.call(t, ...g)];
            }
          });
        }
      });
    }), yt({
      id: s,
      ΨopenChildren: r
    }, u);
  }
}), Nu = K({
  active: Boolean,
  disabled: Boolean,
  max: [Number, String],
  value: {
    type: [Number, String],
    default: 0
  },
  ...Se(),
  ...Wt({
    transition: {
      component: mn
    }
  })
}, "VCounter"), vo = ne()({
  name: "VCounter",
  functional: !0,
  props: Nu(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = H(() => e.max ? `${e.value} / ${e.max}` : String(e.value));
    return ie(() => p(wa, {
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
      }) : a.value]), [[Tt, e.active]])]
    })), {};
  }
}), Hu = K({
  floating: Boolean,
  ...Se()
}, "VFieldLabel"), Zt = ne()({
  name: "VFieldLabel",
  props: Hu(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    return ie(() => p(ao, {
      class: fe(["v-field-label", {
        "v-field-label--floating": e.floating
      }, e.class]),
      style: Ve(e.style),
      "aria-hidden": e.floating || void 0
    }, t)), {};
  }
}), zu = ["underlined", "outlined", "filled", "solo", "solo-inverted", "solo-filled", "plain"], xl = K({
  appendInnerIcon: xe,
  bgColor: String,
  clearable: Boolean,
  clearIcon: {
    type: xe,
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
  prependInnerIcon: xe,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {
    type: String,
    default: "filled",
    validator: (e) => zu.includes(e)
  },
  "onClick:clear": Xe(),
  "onClick:appendInner": Xe(),
  "onClick:prependInner": Xe(),
  ...Se(),
  ...rl(),
  ...wt(),
  ...Le()
}, "VField"), ra = ne()({
  name: "VField",
  inheritAttrs: !1,
  props: {
    id: String,
    ...uo(),
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
      themeClasses: o
    } = je(e), {
      loaderClasses: i
    } = sl(e), {
      focusClasses: s,
      isFocused: u,
      focus: c,
      blur: r
    } = Sa(e), {
      InputIcon: d
    } = so(e), {
      roundedClasses: m
    } = _t(e), {
      rtlClasses: v
    } = nt(), f = H(() => e.dirty || e.active), x = H(() => !!(e.label || l.label)), y = H(() => !e.singleLine && x.value), h = ct(), g = I(() => e.id || `input-${h}`), A = H(() => `${g.value}-messages`), k = q(), S = q(), w = q(), P = I(() => ["plain", "underlined"].includes(e.variant)), b = I(() => e.error || e.disabled ? void 0 : f.value && u.value ? e.color : e.baseColor), B = I(() => {
      if (!(!e.iconColor || e.glow && !u.value))
        return e.iconColor === !0 ? b.value : e.iconColor;
    }), {
      backgroundColorClasses: T,
      backgroundColorStyles: E
    } = st(() => e.bgColor), {
      textColorClasses: R,
      textColorStyles: F
    } = Kt(b);
    Q(f, (G) => {
      if (y.value) {
        const te = k.value.$el, ae = S.value.$el;
        requestAnimationFrame(() => {
          const ue = vl(te), _ = ae.getBoundingClientRect(), $ = _.x - ue.x, O = _.y - ue.y - (ue.height / 2 - _.height / 2), U = _.width / 0.75, he = Math.abs(U - ue.width) > 1 ? {
            maxWidth: ye(U)
          } : void 0, le = getComputedStyle(te), se = getComputedStyle(ae), X = parseFloat(le.transitionDuration) * 1e3 || 150, re = parseFloat(se.getPropertyValue("--v-field-label-scale")), me = se.getPropertyValue("color");
          te.style.visibility = "visible", ae.style.visibility = "hidden", ht(te, {
            transform: `translate(${$}px, ${O}px) scale(${re})`,
            color: me,
            ...he
          }, {
            duration: X,
            easing: Ot,
            direction: G ? "normal" : "reverse"
          }).finished.then(() => {
            te.style.removeProperty("visibility"), ae.style.removeProperty("visibility");
          });
        });
      }
    }, {
      flush: "post"
    });
    const z = I(() => ({
      isActive: f,
      isFocused: u,
      controlRef: w,
      blur: r,
      focus: c
    }));
    function W(G) {
      G.target !== document.activeElement && G.preventDefault();
    }
    return ie(() => {
      var $, O, U;
      const G = e.variant === "outlined", te = !!(l["prepend-inner"] || e.prependInnerIcon), ae = !!(e.clearable || l.clear) && !e.disabled, ue = !!(l["append-inner"] || e.appendInnerIcon || ae), _ = () => l.label ? l.label({
        ...z.value,
        label: e.label,
        props: {
          for: g.value
        }
      }) : e.label;
      return C("div", L({
        class: ["v-field", {
          "v-field--active": f.value,
          "v-field--appended": ue,
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
        }, o.value, T.value, s.value, i.value, m.value, v.value, e.class],
        style: [E.value, e.style],
        onClick: W
      }, t), [C("div", {
        class: "v-field__overlay"
      }, null), p(ul, {
        name: "v-field",
        active: !!e.loading,
        color: e.error ? "error" : typeof e.loading == "string" ? e.loading : e.color
      }, {
        default: l.loader
      }), te && C("div", {
        key: "prepend",
        class: "v-field__prepend-inner"
      }, [e.prependInnerIcon && p(d, {
        key: "prepend-icon",
        name: "prependInner",
        color: B.value
      }, null), ($ = l["prepend-inner"]) == null ? void 0 : $.call(l, z.value)]), C("div", {
        class: "v-field__field",
        "data-no-activator": ""
      }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(e.variant) && y.value && p(Zt, {
        key: "floating-label",
        ref: S,
        class: fe([R.value]),
        floating: !0,
        for: g.value,
        style: Ve(F.value)
      }, {
        default: () => [_()]
      }), x.value && p(Zt, {
        key: "label",
        ref: k,
        for: g.value
      }, {
        default: () => [_()]
      }), ((O = l.default) == null ? void 0 : O.call(l, {
        ...z.value,
        props: {
          id: g.value,
          class: "v-field__input",
          "aria-describedby": A.value
        },
        focus: c,
        blur: r
      })) ?? C("div", {
        id: g.value,
        class: "v-field__input",
        "aria-describedby": A.value
      }, null)]), ae && p(yn, {
        key: "clear"
      }, {
        default: () => [Ke(C("div", {
          class: "v-field__clearable",
          onMousedown: (he) => {
            he.preventDefault(), he.stopPropagation();
          }
        }, [p(Fe, {
          defaults: {
            VIcon: {
              icon: e.clearIcon
            }
          }
        }, {
          default: () => [l.clear ? l.clear({
            ...z.value,
            props: {
              onFocus: c,
              onBlur: r,
              onClick: e["onClick:clear"],
              tabindex: -1
            }
          }) : p(d, {
            name: "clear",
            onFocus: c,
            onBlur: r,
            tabindex: -1
          }, null)]
        })]), [[Tt, e.dirty]])]
      }), ue && C("div", {
        key: "append",
        class: "v-field__append-inner"
      }, [(U = l["append-inner"]) == null ? void 0 : U.call(l, z.value), e.appendInnerIcon && p(d, {
        key: "append-icon",
        name: "appendInner",
        color: B.value
      }, null)]), C("div", {
        class: fe(["v-field__outline", R.value]),
        style: Ve(F.value)
      }, [G && C(J, null, [C("div", {
        class: "v-field__outline__start"
      }, null), y.value && C("div", {
        class: "v-field__outline__notch"
      }, [p(Zt, {
        ref: S,
        floating: !0,
        for: g.value
      }, {
        default: () => [_()]
      })]), C("div", {
        class: "v-field__outline__end"
      }, null)]), P.value && y.value && p(Zt, {
        ref: S,
        floating: !0,
        for: g.value
      }, {
        default: () => [_()]
      })])]);
    }), {
      controlRef: w,
      fieldIconColor: B
    };
  }
}), Wu = ["color", "file", "time", "date", "datetime-local", "week", "month"], Sl = K({
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
  ...ka(),
  ...xl()
}, "VTextField"), rt = ne()({
  name: "VTextField",
  directives: {
    vIntersect: ta
  },
  inheritAttrs: !1,
  props: Sl(),
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
    } = Sa(e), c = I(() => typeof e.counterValue == "function" ? e.counterValue(o.value) : typeof e.counterValue == "number" ? e.counterValue : (o.value ?? "").toString().length), r = I(() => {
      if (t.maxlength) return t.maxlength;
      if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string"))
        return e.counter;
    }), d = I(() => ["plain", "underlined"].includes(e.variant));
    function m(w, P) {
      var b, B;
      !e.autofocus || !w || (B = (b = P[0].target) == null ? void 0 : b.focus) == null || B.call(b);
    }
    const v = q(), f = q(), x = q(), y = I(() => Wu.includes(e.type) || e.persistentPlaceholder || i.value || e.active);
    function h() {
      i.value || s(), Te(() => {
        var w;
        x.value !== document.activeElement && ((w = x.value) == null || w.focus());
      });
    }
    function g(w) {
      a("mousedown:control", w), w.target !== x.value && (h(), w.preventDefault());
    }
    function A(w) {
      a("click:control", w);
    }
    function k(w, P) {
      w.stopPropagation(), h(), Te(() => {
        o.value = null, P(), dl(e["onClick:clear"], w);
      });
    }
    function S(w) {
      var b;
      const P = w.target;
      if (o.value = P.value, (b = e.modelModifiers) != null && b.trim && ["text", "search", "password", "tel", "url"].includes(e.type)) {
        const B = [P.selectionStart, P.selectionEnd];
        Te(() => {
          P.selectionStart = B[0], P.selectionEnd = B[1];
        });
      }
    }
    return ie(() => {
      const w = !!(l.counter || e.counter !== !1 && e.counter != null), P = !!(w || l.details), [b, B] = xa(t), {
        modelValue: T,
        ...E
      } = At.filterProps(e), R = ra.filterProps(e);
      return p(At, L({
        ref: v,
        modelValue: o.value,
        "onUpdate:modelValue": (F) => o.value = F,
        class: ["v-text-field", {
          "v-text-field--prefixed": e.prefix,
          "v-text-field--suffixed": e.suffix,
          "v-input--plain-underlined": d.value
        }, e.class],
        style: e.style
      }, b, E, {
        centerAffix: !d.value,
        focused: i.value
      }), {
        ...l,
        default: (F) => {
          let {
            id: z,
            isDisabled: W,
            isDirty: G,
            isReadonly: te,
            isValid: ae,
            reset: ue
          } = F;
          return p(ra, L({
            ref: f,
            onMousedown: g,
            onClick: A,
            "onClick:clear": (_) => k(_, ue),
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"],
            role: e.role
          }, R, {
            id: z.value,
            active: y.value || G.value,
            dirty: G.value || e.dirty,
            disabled: W.value,
            focused: i.value,
            error: ae.value === !1
          }), {
            ...l,
            default: (_) => {
              let {
                props: {
                  class: $,
                  ...O
                }
              } = _;
              const U = Ke(C("input", L({
                ref: x,
                value: o.value,
                onInput: S,
                autofocus: e.autofocus,
                readonly: te.value,
                disabled: W.value,
                name: e.name,
                placeholder: e.placeholder,
                size: 1,
                type: e.type,
                onFocus: h,
                onBlur: u
              }, O, B), null), [[ta, {
                handler: m
              }, null, {
                once: !0
              }]]);
              return C(J, null, [e.prefix && C("span", {
                class: "v-text-field__prefix"
              }, [C("span", {
                class: "v-text-field__prefix__text"
              }, [e.prefix])]), l.default ? C("div", {
                class: fe($),
                "data-no-activator": ""
              }, [l.default(), U]) : ri(U, {
                class: $
              }), e.suffix && C("span", {
                class: "v-text-field__suffix"
              }, [C("span", {
                class: "v-text-field__suffix__text"
              }, [e.suffix])])]);
            }
          });
        },
        details: P ? (F) => {
          var z;
          return C(J, null, [(z = l.details) == null ? void 0 : z.call(l, F), w && C(J, null, [C("span", null, null), p(vo, {
            active: e.persistentCounter || i.value,
            value: c.value,
            max: r.value,
            disabled: e.disabled
          }, l.counter)])]);
        } : void 0
      });
    }), yt({}, v, f, x);
  }
}), Uu = K({
  renderless: Boolean,
  ...Se()
}, "VVirtualScrollItem"), Ku = ne()({
  name: "VVirtualScrollItem",
  inheritAttrs: !1,
  props: Uu(),
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
    } = Vt(void 0, "border");
    Q(() => {
      var s;
      return (s = i.value) == null ? void 0 : s.height;
    }, (s) => {
      s != null && a("update:height", s);
    }), ie(() => {
      var s, u;
      return e.renderless ? C(J, null, [(s = l.default) == null ? void 0 : s.call(l, {
        itemRef: o
      })]) : C("div", L({
        ref: o,
        class: ["v-virtual-scroll__item", e.class],
        style: e.style
      }, t), [(u = l.default) == null ? void 0 : u.call(l)]);
    });
  }
}), Gu = -1, ju = 1, Ma = 100, Yu = K({
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
function qu(e, n) {
  const t = mt(), a = ee(0);
  et(() => {
    a.value = parseFloat(e.itemHeight || 0);
  });
  const l = ee(0), o = ee(Math.ceil(
    // Assume 16px items filling the entire screen height if
    // not provided. This is probably incorrect but it minimises
    // the chance of ending up with empty space at the bottom.
    // The default value is set here to avoid poisoning getSize()
    (parseInt(e.height) || t.height.value) / (a.value || 16)
  ) || 1), i = ee(0), s = ee(0), u = q(), c = q();
  let r = 0;
  const {
    resizeRef: d,
    contentRect: m
  } = Vt();
  et(() => {
    d.value = u.value;
  });
  const v = I(() => {
    var _;
    return u.value === document.documentElement ? t.height.value : ((_ = m.value) == null ? void 0 : _.height) || parseInt(e.height) || 0;
  }), f = I(() => !!(u.value && c.value && v.value && a.value));
  let x = Array.from({
    length: n.value.length
  }), y = Array.from({
    length: n.value.length
  });
  const h = ee(0);
  let g = -1;
  function A(_) {
    return x[_] || a.value;
  }
  const k = Ki(() => {
    const _ = performance.now();
    y[0] = 0;
    const $ = n.value.length;
    for (let O = 1; O <= $ - 1; O++)
      y[O] = (y[O - 1] || 0) + A(O - 1);
    h.value = Math.max(h.value, performance.now() - _);
  }, h), S = Q(f, (_) => {
    _ && (S(), r = c.value.offsetTop, k.immediate(), G(), ~g && Te(() => {
      He && window.requestAnimationFrame(() => {
        ae(g), g = -1;
      });
    }));
  });
  We(() => {
    k.clear();
  });
  function w(_, $) {
    const O = x[_], U = a.value;
    a.value = U ? Math.min(a.value, $) : $, (O !== $ || U !== a.value) && (x[_] = $, k());
  }
  function P(_) {
    return _ = Je(_, 0, n.value.length - 1), y[_] || 0;
  }
  function b(_) {
    return Xu(y, _);
  }
  let B = 0, T = 0, E = 0;
  Q(v, (_, $) => {
    $ && (G(), _ < $ && requestAnimationFrame(() => {
      T = 0, G();
    }));
  });
  let R = -1;
  function F() {
    if (!u.value || !c.value) return;
    const _ = u.value.scrollTop, $ = performance.now();
    $ - E > 500 ? (T = Math.sign(_ - B), r = c.value.offsetTop) : T = _ - B, B = _, E = $, window.clearTimeout(R), R = window.setTimeout(z, 500), G();
  }
  function z() {
    !u.value || !c.value || (T = 0, E = 0, window.clearTimeout(R), G());
  }
  let W = -1;
  function G() {
    cancelAnimationFrame(W), W = requestAnimationFrame(te);
  }
  function te() {
    if (!u.value || !v.value) return;
    const _ = B - r, $ = Math.sign(T), O = Math.max(0, _ - Ma), U = Je(b(O), 0, n.value.length), he = _ + v.value + Ma, le = Je(b(he) + 1, U + 1, n.value.length);
    if (
      // Only update the side we're scrolling towards,
      // the other side will be updated incidentally
      ($ !== Gu || U < l.value) && ($ !== ju || le > o.value)
    ) {
      const se = P(l.value) - P(U), X = P(le) - P(o.value);
      Math.max(se, X) > Ma ? (l.value = U, o.value = le) : (U <= 0 && (l.value = U), le >= n.value.length && (o.value = le));
    }
    i.value = P(l.value), s.value = P(n.value.length) - P(o.value);
  }
  function ae(_) {
    const $ = P(_);
    !u.value || _ && !$ ? g = _ : u.value.scrollTop = $;
  }
  const ue = I(() => n.value.slice(l.value, o.value).map((_, $) => {
    const O = $ + l.value;
    return {
      raw: _,
      index: O,
      key: St(_, e.itemKey, O)
    };
  }));
  return Q(n, () => {
    x = Array.from({
      length: n.value.length
    }), y = Array.from({
      length: n.value.length
    }), k.immediate(), G();
  }, {
    deep: 1
  }), {
    calculateVisibleItems: G,
    containerRef: u,
    markerRef: c,
    computedItems: ue,
    paddingTop: i,
    paddingBottom: s,
    scrollToIndex: ae,
    handleScroll: F,
    handleScrollend: z,
    handleItemResize: w
  };
}
function Xu(e, n) {
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
const Zu = K({
  items: {
    type: Array,
    default: () => []
  },
  renderless: Boolean,
  ...Yu(),
  ...Se(),
  ...zt()
}, "VVirtualScroll"), fo = ne()({
  name: "VVirtualScroll",
  props: Zu(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = lt("VVirtualScroll"), {
      dimensionStyles: l
    } = Ht(e), {
      calculateVisibleItems: o,
      containerRef: i,
      markerRef: s,
      handleScroll: u,
      handleScrollend: c,
      handleItemResize: r,
      scrollToIndex: d,
      paddingTop: m,
      paddingBottom: v,
      computedItems: f
    } = qu(e, H(() => e.items));
    return qe(() => e.renderless, () => {
      function x() {
        var g, A;
        const h = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1) ? "addEventListener" : "removeEventListener";
        i.value === document.documentElement ? (document[h]("scroll", u, {
          passive: !0
        }), document[h]("scrollend", c)) : ((g = i.value) == null || g[h]("scroll", u, {
          passive: !0
        }), (A = i.value) == null || A[h]("scrollend", c));
      }
      Ze(() => {
        i.value = _n(a.vnode.el, !0), x(!0);
      }), We(x);
    }), ie(() => {
      const x = f.value.map((y) => p(Ku, {
        key: y.key,
        renderless: e.renderless,
        "onUpdate:height": (h) => r(y.index, h)
      }, {
        default: (h) => {
          var g;
          return (g = t.default) == null ? void 0 : g.call(t, {
            item: y.raw,
            index: y.index,
            ...h
          });
        }
      }));
      return e.renderless ? C(J, null, [C("div", {
        ref: s,
        class: "v-virtual-scroll__spacer",
        style: {
          paddingTop: ye(m.value)
        }
      }, null), x, C("div", {
        class: "v-virtual-scroll__spacer",
        style: {
          paddingBottom: ye(v.value)
        }
      }, null)]) : C("div", {
        ref: i,
        class: fe(["v-virtual-scroll", e.class]),
        onScrollPassive: u,
        onScrollend: c,
        style: Ve([l.value, e.style])
      }, [C("div", {
        ref: s,
        class: "v-virtual-scroll__container",
        style: {
          paddingTop: ye(m.value),
          paddingBottom: ye(v.value)
        }
      }, [x])]);
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
        const u = Q(t, () => {
          u(), s();
        });
      } else s();
    });
  }
  async function i(s) {
    var r, d;
    if (s.key === "Tab" && ((r = n.value) == null || r.focus()), !["PageDown", "PageUp", "Home", "End"].includes(s.key)) return;
    const u = (d = e.value) == null ? void 0 : d.$el;
    if (!u) return;
    (s.key === "Home" || s.key === "End") && u.scrollTo({
      top: s.key === "Home" ? 0 : u.scrollHeight,
      behavior: "smooth"
    }), await o();
    const c = u.querySelectorAll(":scope > :not(.v-virtual-scroll__spacer)");
    if (s.key === "PageDown" || s.key === "Home") {
      const m = u.getBoundingClientRect().top;
      for (const v of c)
        if (v.getBoundingClientRect().top >= m) {
          v.focus();
          break;
        }
    } else {
      const m = u.getBoundingClientRect().bottom;
      for (const v of [...c].reverse())
        if (v.getBoundingClientRect().bottom <= m) {
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
    type: xe,
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
  ...Bi({
    itemChildren: !1
  })
}, "Select"), Qu = K({
  ...go(),
  ...gt(Sl({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...Wt({
    transition: {
      component: Fn
    }
  })
}, "VSelect"), kl = ne()({
  name: "VSelect",
  props: Qu(),
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
    } = ot(), l = q(), o = q(), i = q(), {
      items: s,
      transformIn: u,
      transformOut: c
    } = pn(e), r = we(e, "modelValue", [], (_) => u(_ === null ? [null] : Ne(_)), (_) => {
      const $ = c(_);
      return e.multiple ? $ : $[0] ?? null;
    }), d = I(() => typeof e.counterValue == "function" ? e.counterValue(r.value) : typeof e.counterValue == "number" ? e.counterValue : r.value.length), m = bl(e), v = I(() => r.value.map((_) => _.value)), f = ee(!1);
    let x = "", y = -1, h;
    const g = I(() => e.hideSelected ? s.value.filter((_) => !r.value.some(($) => (e.valueComparator || it)($, _))) : s.value), A = I(() => e.hideNoData && !g.value.length || m.isReadonly.value || m.isDisabled.value), k = we(e, "menu"), S = I({
      get: () => k.value,
      set: (_) => {
        var $;
        k.value && !_ && (($ = o.value) != null && $.ΨopenChildren.size) || _ && A.value || (k.value = _);
      }
    }), w = H(() => S.value ? e.closeText : e.openText), P = I(() => {
      var _;
      return {
        ...e.menuProps,
        activatorProps: {
          ...((_ = e.menuProps) == null ? void 0 : _.activatorProps) || {},
          "aria-haspopup": "listbox"
          // Set aria-haspopup to 'listbox'
        }
      };
    }), b = q(), B = mo(b, l);
    function T(_) {
      e.openOnClear && (S.value = !0);
    }
    function E() {
      A.value || (S.value = !S.value);
    }
    function R(_) {
      aa(_) && F(_);
    }
    function F(_) {
      var me, N, Z;
      if (!_.key || m.isReadonly.value) return;
      ["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(_.key) && _.preventDefault(), ["Enter", "ArrowDown", " "].includes(_.key) && (S.value = !0), ["Escape", "Tab"].includes(_.key) && (S.value = !1), _.key === "Home" ? (me = b.value) == null || me.focus("first") : _.key === "End" && ((N = b.value) == null || N.focus("last"));
      const $ = 1e3;
      if (!aa(_)) return;
      const O = performance.now();
      O - h > $ && (x = "", y = -1), x += _.key.toLowerCase(), h = O;
      const U = g.value;
      function he() {
        let ce = le();
        return ce || x.at(-1) === x.at(-2) && (x = x.slice(0, -1), ce = le(), ce) || (y = -1, ce = le(), ce) ? ce : (x = _.key.toLowerCase(), le());
      }
      function le() {
        for (let ce = y + 1; ce < U.length; ce++) {
          const ge = U[ce];
          if (ge.title.toLowerCase().startsWith(x))
            return [ge, ce];
        }
      }
      const se = he();
      if (!se) return;
      const [X, re] = se;
      y = re, (Z = b.value) == null || Z.focus(re), e.multiple || (r.value = [X]);
    }
    function z(_) {
      let $ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!_.props.disabled)
        if (e.multiple) {
          const O = r.value.findIndex((he) => (e.valueComparator || it)(he.value, _.value)), U = $ ?? !~O;
          if (~O) {
            const he = U ? [...r.value, _] : [...r.value];
            he.splice(O, 1), r.value = he;
          } else U && (r.value = [...r.value, _]);
        } else {
          const O = $ !== !1;
          r.value = O ? [_] : [], Te(() => {
            S.value = !1;
          });
        }
    }
    function W(_) {
      var $;
      ($ = b.value) != null && $.$el.contains(_.relatedTarget) || (S.value = !1);
    }
    function G() {
      var _;
      e.eager && ((_ = i.value) == null || _.calculateVisibleItems());
    }
    function te() {
      var _;
      f.value && ((_ = l.value) == null || _.focus());
    }
    function ae(_) {
      f.value = !0;
    }
    function ue(_) {
      if (_ == null) r.value = [];
      else if (It(l.value, ":autofill") || It(l.value, ":-webkit-autofill")) {
        const $ = s.value.find((O) => O.title === _);
        $ && z($);
      } else l.value && (l.value.value = "");
    }
    return Q(S, () => {
      if (!e.hideSelected && S.value && r.value.length) {
        const _ = g.value.findIndex(($) => r.value.some((O) => (e.valueComparator || it)(O.value, $.value)));
        He && window.requestAnimationFrame(() => {
          var $;
          _ >= 0 && (($ = i.value) == null || $.scrollToIndex(_));
        });
      }
    }), Q(() => e.items, (_, $) => {
      S.value || f.value && !$.length && _.length && (S.value = !0);
    }), ie(() => {
      const _ = !!(e.chips || t.chip), $ = !!(!e.hideNoData || g.value.length || t["prepend-item"] || t["append-item"] || t["no-data"]), O = r.value.length > 0, U = rt.filterProps(e), he = O || !f.value && e.label && !e.persistentPlaceholder ? void 0 : e.placeholder;
      return p(rt, L({
        ref: l
      }, U, {
        modelValue: r.value.map((le) => le.props.value).join(", "),
        "onUpdate:modelValue": ue,
        focused: f.value,
        "onUpdate:focused": (le) => f.value = le,
        validationValue: r.externalValue,
        counterValue: d.value,
        dirty: O,
        class: ["v-select", {
          "v-select--active-menu": S.value,
          "v-select--chips": !!e.chips,
          [`v-select--${e.multiple ? "multiple" : "single"}`]: !0,
          "v-select--selected": r.value.length,
          "v-select--selection-slot": !!t.selection
        }, e.class],
        style: e.style,
        inputmode: "none",
        placeholder: he,
        "onClick:clear": T,
        "onMousedown:control": E,
        onBlur: W,
        onKeydown: F,
        "aria-label": a(w.value),
        title: a(w.value)
      }), {
        ...t,
        default: () => C(J, null, [p(wl, L({
          ref: o,
          modelValue: S.value,
          "onUpdate:modelValue": (le) => S.value = le,
          activator: "parent",
          contentClass: "v-select__content",
          disabled: A.value,
          eager: e.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: e.transition,
          onAfterEnter: G,
          onAfterLeave: te
        }, P.value), {
          default: () => [$ && p(ut, L({
            ref: b,
            selected: v.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: (le) => le.preventDefault(),
            onKeydown: R,
            onFocusin: ae,
            tabindex: "-1",
            "aria-live": "polite",
            "aria-label": `${e.label}-list`,
            color: e.itemColor ?? e.color
          }, B, e.listProps), {
            default: () => {
              var le, se, X;
              return [(le = t["prepend-item"]) == null ? void 0 : le.call(t), !g.value.length && !e.hideNoData && (((se = t["no-data"]) == null ? void 0 : se.call(t)) ?? p(Ye, {
                key: "no-data",
                title: a(e.noDataText)
              }, null)), p(fo, {
                ref: i,
                renderless: !0,
                items: g.value,
                itemKey: "value"
              }, {
                default: (re) => {
                  var Ce;
                  let {
                    item: me,
                    index: N,
                    itemRef: Z
                  } = re;
                  const ce = Gi(me.props), ge = L(me.props, {
                    ref: Z,
                    key: me.value,
                    onClick: () => z(me, null)
                  });
                  return ((Ce = t.item) == null ? void 0 : Ce.call(t, {
                    item: me,
                    index: N,
                    props: ge
                  })) ?? p(Ye, L(ge, {
                    role: "option"
                  }), {
                    prepend: (Ee) => {
                      let {
                        isSelected: De
                      } = Ee;
                      return C(J, null, [e.multiple && !e.hideSelected ? p(pt, {
                        key: me.value,
                        modelValue: De,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, ce.prependAvatar && p(Pt, {
                        image: ce.prependAvatar
                      }, null), ce.prependIcon && p(ke, {
                        icon: ce.prependIcon
                      }, null)]);
                    }
                  });
                }
              }), (X = t["append-item"]) == null ? void 0 : X.call(t)];
            }
          })]
        }), r.value.map((le, se) => {
          function X(Z) {
            Z.stopPropagation(), Z.preventDefault(), z(le, !1);
          }
          const re = {
            "onClick:close": X,
            onKeydown(Z) {
              Z.key !== "Enter" && Z.key !== " " || (Z.preventDefault(), Z.stopPropagation(), X(Z));
            },
            onMousedown(Z) {
              Z.preventDefault(), Z.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, me = _ ? !!t.chip : !!t.selection, N = me ? In(_ ? t.chip({
            item: le,
            index: se,
            props: re
          }) : t.selection({
            item: le,
            index: se
          })) : void 0;
          if (!(me && !N))
            return C("div", {
              key: le.value,
              class: "v-select__selection"
            }, [_ ? t.chip ? p(Fe, {
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
            }) : p(pl, L({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: le.title,
              disabled: le.props.disabled
            }, re), null) : N ?? C("span", {
              class: "v-select__selection-text"
            }, [le.title, e.multiple && se < r.value.length - 1 && C("span", {
              class: "v-select__selection-comma"
            }, [Pe(",")])])]);
        })]),
        "append-inner": function() {
          var re, me;
          for (var le = arguments.length, se = new Array(le), X = 0; X < le; X++)
            se[X] = arguments[X];
          return C(J, null, [(re = t["append-inner"]) == null ? void 0 : re.call(t, ...se), e.menuIcon ? p(ke, {
            class: "v-select__menu-icon",
            color: (me = l.value) == null ? void 0 : me.fieldIconColor,
            icon: e.menuIcon
          }, null) : void 0]);
        }
      });
    }), yt({
      isFocused: f,
      menu: S,
      select: z
    }, l);
  }
}), Ju = (e, n, t) => {
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
function er(e, n, t) {
  var s;
  const a = [], l = (t == null ? void 0 : t.default) ?? Ju, o = t != null && t.filterKeys ? Ne(t.filterKeys) : !1, i = Object.keys((t == null ? void 0 : t.customKeyFilter) ?? {}).length;
  if (!(e != null && e.length)) return a;
  e: for (let u = 0; u < e.length; u++) {
    const [c, r = c] = Ne(e[u]), d = {}, m = {};
    let v = -1;
    if ((n || i > 0) && !(t != null && t.noFilter)) {
      if (typeof c == "object") {
        const y = o || Object.keys(r);
        for (const h of y) {
          const g = St(r, h), A = (s = t == null ? void 0 : t.customKeyFilter) == null ? void 0 : s[h];
          if (v = A ? A(g, n, c) : l(g, n, c), v !== -1 && v !== !1)
            A ? d[h] = Da(v, n) : m[h] = Da(v, n);
          else if ((t == null ? void 0 : t.filterMode) === "every")
            continue e;
        }
      } else
        v = l(c, n, c), v !== -1 && v !== !1 && (m.title = Da(v, n));
      const f = Object.keys(m).length, x = Object.keys(d).length;
      if (!f && !x || (t == null ? void 0 : t.filterMode) === "union" && x !== i && !f || (t == null ? void 0 : t.filterMode) === "intersection" && (x !== i || !f)) continue;
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
function ho(e, n, t, a) {
  const l = ee([]), o = ee(/* @__PURE__ */ new Map()), i = I(() => a != null && a.transform ? V(n).map((u) => [u, a.transform(u)]) : V(n));
  et(() => {
    const u = typeof t == "function" ? t() : V(t), c = typeof u != "string" && typeof u != "number" ? "" : String(u), r = er(i.value, c, {
      customKeyFilter: {
        ...e.customKeyFilter,
        ...V(a == null ? void 0 : a.customKeyFilter)
      },
      default: e.customFilter,
      filterKeys: e.filterKeys,
      filterMode: e.filterMode,
      noFilter: e.noFilter
    }), d = V(n), m = [], v = /* @__PURE__ */ new Map();
    r.forEach((f) => {
      let {
        index: x,
        matches: y
      } = f;
      const h = d[x];
      m.push(h), v.set(h.value, y);
    }), l.value = m, o.value = v;
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
function tr(e, n, t) {
  return t == null || !t.length ? n : t.map((a, l) => {
    const o = l === 0 ? 0 : t[l - 1][1], i = [C("span", {
      class: fe(`${e}__unmask`)
    }, [n.slice(o, a[0])]), C("span", {
      class: fe(`${e}__mask`)
    }, [n.slice(a[0], a[1])])];
    return l === t.length - 1 && i.push(C("span", {
      class: fe(`${e}__unmask`)
    }, [n.slice(a[1])])), C(J, null, [i]);
  });
}
const ar = K({
  autoSelectFirst: {
    type: [Boolean, String]
  },
  clearOnSelect: Boolean,
  search: String,
  ...yo({
    filterKeys: ["title"]
  }),
  ...go(),
  ...gt(Sl({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...Wt({
    transition: !1
  })
}, "VAutocomplete"), lr = ne()({
  name: "VAutocomplete",
  props: ar(),
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
    } = ot(), l = q(), o = ee(!1), i = ee(!0), s = ee(!1), u = q(), c = q(), r = ee(-1), {
      items: d,
      transformIn: m,
      transformOut: v
    } = pn(e), {
      textColorClasses: f,
      textColorStyles: x
    } = Kt(() => {
      var N;
      return (N = l.value) == null ? void 0 : N.color;
    }), y = we(e, "search", ""), h = we(e, "modelValue", [], (N) => m(N === null ? [null] : Ne(N)), (N) => {
      const Z = v(N);
      return e.multiple ? Z : Z[0] ?? null;
    }), g = I(() => typeof e.counterValue == "function" ? e.counterValue(h.value) : typeof e.counterValue == "number" ? e.counterValue : h.value.length), A = bl(e), {
      filteredItems: k,
      getMatches: S
    } = ho(e, d, () => i.value ? "" : y.value), w = I(() => e.hideSelected ? k.value.filter((N) => !h.value.some((Z) => Z.value === N.value)) : k.value), P = I(() => !!(e.chips || t.chip)), b = I(() => P.value || !!t.selection), B = I(() => h.value.map((N) => N.props.value)), T = I(() => {
      var Z;
      return (e.autoSelectFirst === !0 || e.autoSelectFirst === "exact" && y.value === ((Z = w.value[0]) == null ? void 0 : Z.title)) && w.value.length > 0 && !i.value && !s.value;
    }), E = I(() => e.hideNoData && !w.value.length || A.isReadonly.value || A.isDisabled.value), R = we(e, "menu"), F = I({
      get: () => R.value,
      set: (N) => {
        var Z;
        R.value && !N && ((Z = u.value) != null && Z.ΨopenChildren.size) || N && E.value || (R.value = N);
      }
    }), z = I(() => F.value ? e.closeText : e.openText), W = q(), G = mo(W, l);
    function te(N) {
      e.openOnClear && (F.value = !0), y.value = "";
    }
    function ae() {
      E.value || (F.value = !0);
    }
    function ue(N) {
      E.value || (o.value && (N.preventDefault(), N.stopPropagation()), F.value = !F.value);
    }
    function _(N) {
      var Z;
      N.key !== " " && aa(N) && ((Z = l.value) == null || Z.focus());
    }
    function $(N) {
      var ge, Ce, Ee, De, Ae;
      if (A.isReadonly.value) return;
      const Z = (ge = l.value) == null ? void 0 : ge.selectionStart, ce = h.value.length;
      if (["Enter", "ArrowDown", "ArrowUp"].includes(N.key) && N.preventDefault(), ["Enter", "ArrowDown"].includes(N.key) && (F.value = !0), ["Escape"].includes(N.key) && (F.value = !1), T.value && ["Enter", "Tab"].includes(N.key) && !h.value.some((Oe) => {
        let {
          value: $e
        } = Oe;
        return $e === w.value[0].value;
      }) && me(w.value[0]), N.key === "ArrowDown" && T.value && ((Ce = W.value) == null || Ce.focus("next")), ["Backspace", "Delete"].includes(N.key)) {
        if (!e.multiple && b.value && h.value.length > 0 && !y.value) return me(h.value[0], !1);
        if (~r.value) {
          N.preventDefault();
          const Oe = r.value;
          me(h.value[r.value], !1), r.value = Oe >= ce - 1 ? ce - 2 : Oe;
        } else N.key === "Backspace" && !y.value && (r.value = ce - 1);
        return;
      }
      if (e.multiple)
        if (N.key === "ArrowLeft") {
          if (r.value < 0 && Z && Z > 0) return;
          const Oe = r.value > -1 ? r.value - 1 : ce - 1;
          if (h.value[Oe])
            r.value = Oe;
          else {
            const $e = ((Ee = y.value) == null ? void 0 : Ee.length) ?? null;
            r.value = -1, (De = l.value) == null || De.setSelectionRange($e, $e);
          }
        } else if (N.key === "ArrowRight") {
          if (r.value < 0) return;
          const Oe = r.value + 1;
          h.value[Oe] ? r.value = Oe : (r.value = -1, (Ae = l.value) == null || Ae.setSelectionRange(0, 0));
        } else ~r.value && aa(N) && (r.value = -1);
    }
    function O(N) {
      if (It(l.value, ":autofill") || It(l.value, ":-webkit-autofill")) {
        const Z = d.value.find((ce) => ce.title === N.target.value);
        Z && me(Z);
      }
    }
    function U() {
      var N;
      e.eager && ((N = c.value) == null || N.calculateVisibleItems());
    }
    function he() {
      var N;
      o.value && (i.value = !0, (N = l.value) == null || N.focus());
    }
    function le(N) {
      o.value = !0, setTimeout(() => {
        s.value = !0;
      });
    }
    function se(N) {
      s.value = !1;
    }
    function X(N) {
      (N == null || N === "" && !e.multiple && !b.value) && (h.value = []);
    }
    const re = ee(!1);
    function me(N) {
      let Z = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!(!N || N.props.disabled))
        if (e.multiple) {
          const ce = h.value.findIndex((Ce) => (e.valueComparator || it)(Ce.value, N.value)), ge = Z ?? !~ce;
          if (~ce) {
            const Ce = ge ? [...h.value, N] : [...h.value];
            Ce.splice(ce, 1), h.value = Ce;
          } else ge && (h.value = [...h.value, N]);
          e.clearOnSelect && (y.value = "");
        } else {
          const ce = Z !== !1;
          h.value = ce ? [N] : [], y.value = ce && !b.value ? N.title : "", Te(() => {
            F.value = !1, i.value = !0;
          });
        }
    }
    return Q(o, (N, Z) => {
      var ce;
      N !== Z && (N ? (re.value = !0, y.value = e.multiple || b.value ? "" : String(((ce = h.value.at(-1)) == null ? void 0 : ce.props.title) ?? ""), i.value = !0, Te(() => re.value = !1)) : (!e.multiple && y.value == null && (h.value = []), F.value = !1, (e.multiple || b.value) && (y.value = ""), r.value = -1));
    }), Q(y, (N) => {
      !o.value || re.value || (N && (F.value = !0), i.value = !N);
    }), Q(F, () => {
      if (!e.hideSelected && F.value && h.value.length) {
        const N = w.value.findIndex((Z) => h.value.some((ce) => Z.value === ce.value));
        He && window.requestAnimationFrame(() => {
          var Z;
          N >= 0 && ((Z = c.value) == null || Z.scrollToIndex(N));
        });
      }
    }), Q(() => e.items, (N, Z) => {
      F.value || o.value && !Z.length && N.length && (F.value = !0);
    }), ie(() => {
      const N = !!(!e.hideNoData || w.value.length || t["prepend-item"] || t["append-item"] || t["no-data"]), Z = h.value.length > 0, ce = rt.filterProps(e);
      return p(rt, L({
        ref: l
      }, ce, {
        modelValue: y.value,
        "onUpdate:modelValue": [(ge) => y.value = ge, X],
        focused: o.value,
        "onUpdate:focused": (ge) => o.value = ge,
        validationValue: h.externalValue,
        counterValue: g.value,
        dirty: Z,
        onChange: O,
        class: ["v-autocomplete", `v-autocomplete--${e.multiple ? "multiple" : "single"}`, {
          "v-autocomplete--active-menu": F.value,
          "v-autocomplete--chips": !!e.chips,
          "v-autocomplete--selection-slot": !!b.value,
          "v-autocomplete--selecting-index": r.value > -1
        }, e.class],
        style: e.style,
        readonly: A.isReadonly.value,
        placeholder: Z ? void 0 : e.placeholder,
        "onClick:clear": te,
        "onMousedown:control": ae,
        onKeydown: $
      }), {
        ...t,
        default: () => C(J, null, [p(wl, L({
          ref: u,
          modelValue: F.value,
          "onUpdate:modelValue": (ge) => F.value = ge,
          activator: "parent",
          contentClass: "v-autocomplete__content",
          disabled: E.value,
          eager: e.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: e.transition,
          onAfterEnter: U,
          onAfterLeave: he
        }, e.menuProps), {
          default: () => [N && p(ut, L({
            ref: W,
            selected: B.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: (ge) => ge.preventDefault(),
            onKeydown: _,
            onFocusin: le,
            onFocusout: se,
            tabindex: "-1",
            "aria-live": "polite",
            color: e.itemColor ?? e.color
          }, G, e.listProps), {
            default: () => {
              var ge, Ce, Ee;
              return [(ge = t["prepend-item"]) == null ? void 0 : ge.call(t), !w.value.length && !e.hideNoData && (((Ce = t["no-data"]) == null ? void 0 : Ce.call(t)) ?? p(Ye, {
                key: "no-data",
                title: a(e.noDataText)
              }, null)), p(fo, {
                ref: c,
                renderless: !0,
                items: w.value,
                itemKey: "value"
              }, {
                default: (De) => {
                  var Al;
                  let {
                    item: Ae,
                    index: Oe,
                    itemRef: $e
                  } = De;
                  const Il = L(Ae.props, {
                    ref: $e,
                    key: Ae.value,
                    active: T.value && Oe === 0 ? !0 : void 0,
                    onClick: () => me(Ae, null)
                  });
                  return ((Al = t.item) == null ? void 0 : Al.call(t, {
                    item: Ae,
                    index: Oe,
                    props: Il
                  })) ?? p(Ye, L(Il, {
                    role: "option"
                  }), {
                    prepend: (Yt) => {
                      let {
                        isSelected: li
                      } = Yt;
                      return C(J, null, [e.multiple && !e.hideSelected ? p(pt, {
                        key: Ae.value,
                        modelValue: li,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, Ae.props.prependAvatar && p(Pt, {
                        image: Ae.props.prependAvatar
                      }, null), Ae.props.prependIcon && p(ke, {
                        icon: Ae.props.prependIcon
                      }, null)]);
                    },
                    title: () => {
                      var Yt;
                      return i.value ? Ae.title : tr("v-autocomplete", Ae.title, (Yt = S(Ae)) == null ? void 0 : Yt.title);
                    }
                  });
                }
              }), (Ee = t["append-item"]) == null ? void 0 : Ee.call(t)];
            }
          })]
        }), h.value.map((ge, Ce) => {
          function Ee($e) {
            $e.stopPropagation(), $e.preventDefault(), me(ge, !1);
          }
          const De = {
            "onClick:close": Ee,
            onKeydown($e) {
              $e.key !== "Enter" && $e.key !== " " || ($e.preventDefault(), $e.stopPropagation(), Ee($e));
            },
            onMousedown($e) {
              $e.preventDefault(), $e.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, Ae = P.value ? !!t.chip : !!t.selection, Oe = Ae ? In(P.value ? t.chip({
            item: ge,
            index: Ce,
            props: De
          }) : t.selection({
            item: ge,
            index: Ce
          })) : void 0;
          if (!(Ae && !Oe))
            return C("div", {
              key: ge.value,
              class: fe(["v-autocomplete__selection", Ce === r.value && ["v-autocomplete__selection--selected", f.value]]),
              style: Ve(Ce === r.value ? x.value : {})
            }, [P.value ? t.chip ? p(Fe, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: e.closableChips,
                  size: "small",
                  text: ge.title
                }
              }
            }, {
              default: () => [Oe]
            }) : p(pl, L({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: ge.title,
              disabled: ge.props.disabled
            }, De), null) : Oe ?? C("span", {
              class: "v-autocomplete__selection-text"
            }, [ge.title, e.multiple && Ce < h.value.length - 1 && C("span", {
              class: "v-autocomplete__selection-comma"
            }, [Pe(",")])])]);
        })]),
        "append-inner": function() {
          var De, Ae;
          for (var ge = arguments.length, Ce = new Array(ge), Ee = 0; Ee < ge; Ee++)
            Ce[Ee] = arguments[Ee];
          return C(J, null, [(De = t["append-inner"]) == null ? void 0 : De.call(t, ...Ce), e.menuIcon ? p(ke, {
            class: "v-autocomplete__menu-icon",
            color: (Ae = l.value) == null ? void 0 : Ae.fieldIconColor,
            icon: e.menuIcon,
            onMousedown: ue,
            onClick: ji,
            "aria-label": a(z.value),
            title: a(z.value),
            tabindex: "-1"
          }, null) : void 0]);
        }
      });
    }), yt({
      isFocused: o,
      isPristine: i,
      menu: F,
      search: y,
      filteredItems: k,
      select: me
    }, l);
  }
}), nr = ["name", "value"], or = /* @__PURE__ */ Ge({
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
  setup(e) {
    const n = vt(), t = el(e, "modelValue"), a = q(""), l = e, o = ga(), i = ve("repos"), { state: s, query: u, fetch: c } = bi(l.repo, i, { save: !1 }), r = Qe([]), d = q([]);
    async function m(h) {
      const g = h && v(h);
      if (g != null && g.length) {
        const A = await c({ id: g });
        r.splice(0, 0, ...A.entities);
      }
      f(h);
    }
    function v(h) {
      if (!Array.isArray(h))
        return r.findIndex((A) => A.id == h) == -1 ? [h] : null;
      const g = new Set(r.map((A) => A.id));
      return h.filter((A) => !g.has(A));
    }
    function f(h) {
      Array.isArray(h) ? d.value = r.filter((g) => h.includes(g.id)) : h ? d.value = [r.find((g) => g.id == h)] : d.value = [];
    }
    let x = null;
    const y = _a.debounce(async ({ reset: h = !1 } = {}) => {
      if (s.isProcessing)
        return;
      const g = a.value != "<empty string>" && a.value || "";
      if (!h && g == x)
        return;
      x = g;
      const A = { ...l.filters, page_size: 20 };
      A[l.lookup] = g;
      let k = await c({ params: A });
      const S = d.value ? _a.unionBy(k.entities, d.value, (w) => w.id) : k.entities;
      r.splice(0, r.length, ...S), h || (a.value = g);
    }, 500);
    return Ze(async () => {
      await y(), t.value && await m(t.value);
    }), Q(() => l.filters, (h, g) => {
      _a.isEqual(La(h), La(g)) || y({ reset: !0 });
    }), Q(a, (h) => {
      h != "<empty string>" && h != x && y({ q: h });
    }), Q(t, (h, g) => {
      h != g && f(h);
    }), (h, g) => (D(), pe(J, null, [
      l.name ? (D(), pe("input", {
        key: 0,
        type: "hidden",
        name: l.name,
        value: t.value
      }, null, 8, nr)) : de("", !0),
      p(V(lr), L(V(o), {
        items: r,
        loading: V(s).isProcessing,
        modelValue: t.value,
        "onUpdate:modelValue": g[0] || (g[0] = (A) => t.value = A),
        search: a.value,
        "onUpdate:search": g[1] || (g[1] = (A) => a.value = A)
      }), kt({ _: 2 }, [
        Me(V(n), (A, k) => ({
          name: k,
          fn: M((S) => [
            j(h.$slots, k, _e(Be(S)))
          ])
        }))
      ]), 1040, ["items", "loading", "modelValue", "search"])
    ], 64));
  }
}), ir = {
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
      n.value = pi(e.src, t.value);
    }
    return Q(() => e.src, a), a(), () => ci(n.value, e);
  }
}, sr = K({
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
  ...ka(),
  ...xl()
}, "VTextarea"), ur = ne()({
  name: "VTextarea",
  directives: {
    vIntersect: ta
  },
  inheritAttrs: !1,
  props: sr(),
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
    } = Sa(e), c = I(() => typeof e.counterValue == "function" ? e.counterValue(o.value) : (o.value || "").toString().length), r = I(() => {
      if (t.maxlength) return t.maxlength;
      if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string"))
        return e.counter;
    });
    function d(E, R) {
      var F, z;
      !e.autofocus || !E || (z = (F = R[0].target) == null ? void 0 : F.focus) == null || z.call(F);
    }
    const m = q(), v = q(), f = ee(""), x = q(), y = I(() => e.persistentPlaceholder || i.value || e.active);
    function h() {
      var E;
      x.value !== document.activeElement && ((E = x.value) == null || E.focus()), i.value || s();
    }
    function g(E) {
      h(), a("click:control", E);
    }
    function A(E) {
      a("mousedown:control", E);
    }
    function k(E) {
      E.stopPropagation(), h(), Te(() => {
        o.value = "", dl(e["onClick:clear"], E);
      });
    }
    function S(E) {
      var F;
      const R = E.target;
      if (o.value = R.value, (F = e.modelModifiers) != null && F.trim) {
        const z = [R.selectionStart, R.selectionEnd];
        Te(() => {
          R.selectionStart = z[0], R.selectionEnd = z[1];
        });
      }
    }
    const w = q(), P = q(Number(e.rows)), b = I(() => ["plain", "underlined"].includes(e.variant));
    et(() => {
      e.autoGrow || (P.value = Number(e.rows));
    });
    function B() {
      e.autoGrow && Te(() => {
        if (!w.value || !v.value) return;
        const E = getComputedStyle(w.value), R = getComputedStyle(v.value.$el), F = parseFloat(E.getPropertyValue("--v-field-padding-top")) + parseFloat(E.getPropertyValue("--v-input-padding-top")) + parseFloat(E.getPropertyValue("--v-field-padding-bottom")), z = w.value.scrollHeight, W = parseFloat(E.lineHeight), G = Math.max(parseFloat(e.rows) * W + F, parseFloat(R.getPropertyValue("--v-input-control-height"))), te = parseFloat(e.maxRows) * W + F || 1 / 0, ae = Je(z ?? 0, G, te);
        P.value = Math.floor((ae - F) / W), f.value = ye(ae);
      });
    }
    Ze(B), Q(o, B), Q(() => e.rows, B), Q(() => e.maxRows, B), Q(() => e.density, B);
    let T;
    return Q(w, (E) => {
      E ? (T = new ResizeObserver(B), T.observe(w.value)) : T == null || T.disconnect();
    }), dt(() => {
      T == null || T.disconnect();
    }), ie(() => {
      const E = !!(l.counter || e.counter || e.counterValue), R = !!(E || l.details), [F, z] = xa(t), {
        modelValue: W,
        ...G
      } = At.filterProps(e), te = ra.filterProps(e);
      return p(At, L({
        ref: m,
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
      }, F, G, {
        centerAffix: P.value === 1 && !b.value,
        focused: i.value
      }), {
        ...l,
        default: (ae) => {
          let {
            id: ue,
            isDisabled: _,
            isDirty: $,
            isReadonly: O,
            isValid: U
          } = ae;
          return p(ra, L({
            ref: v,
            style: {
              "--v-textarea-control-height": f.value
            },
            onClick: g,
            onMousedown: A,
            "onClick:clear": k,
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"]
          }, te, {
            id: ue.value,
            active: y.value || $.value,
            centerAffix: P.value === 1 && !b.value,
            dirty: $.value || e.dirty,
            disabled: _.value,
            focused: i.value,
            error: U.value === !1
          }), {
            ...l,
            default: (he) => {
              let {
                props: {
                  class: le,
                  ...se
                }
              } = he;
              return C(J, null, [e.prefix && C("span", {
                class: "v-text-field__prefix"
              }, [e.prefix]), Ke(C("textarea", L({
                ref: x,
                class: le,
                value: o.value,
                onInput: S,
                autofocus: e.autofocus,
                readonly: O.value,
                disabled: _.value,
                placeholder: e.placeholder,
                rows: e.rows,
                name: e.name,
                onFocus: h,
                onBlur: u
              }, se, z), null), [[ta, {
                handler: d
              }, null, {
                once: !0
              }]]), e.autoGrow && Ke(C("textarea", {
                class: fe([le, "v-textarea__sizer"]),
                id: `${se.id}-sizer`,
                "onUpdate:modelValue": (X) => o.value = X,
                ref: w,
                readonly: !0,
                "aria-hidden": "true"
              }, null), [[di, o.value]]), e.suffix && C("span", {
                class: "v-text-field__suffix"
              }, [e.suffix])]);
            }
          });
        },
        details: R ? (ae) => {
          var ue;
          return C(J, null, [(ue = l.details) == null ? void 0 : ue.call(l, ae), E && C(J, null, [C("span", null, null), p(vo, {
            active: e.persistentCounter || i.value,
            value: c.value,
            max: r.value,
            disabled: e.disabled
          }, l.counter)])]);
        } : void 0
      });
    }), yt({}, m, v, x);
  }
}), rr = /* @__PURE__ */ Ge({
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
     * - any other value: `v-text-field` with supplied type;
     */
    type: String,
    rules: Array
  },
  setup(e) {
    const n = ga(), t = e, a = I(() => {
      const l = `fields.${t.name}.help`, o = {
        name: t.name,
        label: oe(`fields.${t.name}`),
        "aria-label": oe(`fields.${t.name}`),
        "error-messages": t.editor.error(t.name),
        rules: t.rules || [],
        ...n
      };
      return wi(l) && (o.hint = oe(l), o["aria-description"] = oe(l)), t.required && o.rules.push(xi.required), o;
    });
    return (l, o) => {
      const i = ln("v-date-input");
      return j(l.$slots, "default", {
        props: a.value,
        editor: t.editor
      }, () => [
        t.type == "select" ? (D(), Y(kl, L({ key: 0 }, a.value, {
          modelValue: t.editor.value[t.name],
          "onUpdate:modelValue": o[0] || (o[0] = (s) => t.editor.value[t.name] = s)
        }), null, 16, ["modelValue"])) : t.type == "textarea" ? (D(), Y(ur, L({ key: 1 }, a.value, {
          modelValue: t.editor.value[t.name],
          "onUpdate:modelValue": o[1] || (o[1] = (s) => t.editor.value[t.name] = s)
        }), null, 16, ["modelValue"])) : t.type == "checkbox" ? (D(), Y(Ru, L({ key: 2 }, a.value, {
          modelValue: t.editor.value[t.name],
          "onUpdate:modelValue": o[2] || (o[2] = (s) => t.editor.value[t.name] = s)
        }), null, 16, ["modelValue"])) : t.type == "date" ? (D(), Y(i, L({ key: 3 }, a.value, {
          modelValue: t.editor.value[t.name],
          "onUpdate:modelValue": o[3] || (o[3] = (s) => t.editor.value[t.name] = s)
        }), null, 16, ["modelValue"])) : (D(), Y(rt, L({ key: 4 }, a.value, {
          modelValue: t.editor.value[t.name],
          "onUpdate:modelValue": o[4] || (o[4] = (s) => t.editor.value[t.name] = s),
          type: t.type
        }), null, 16, ["modelValue", "type"]))
      ]);
    };
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
        ([u, c]) => !u.startsWith("page") && !u.startsWith("ordering") && !!c
      );
    }), o = I(() => l.value ? "mdi-filter-check" : "mdi-filter-outline");
    function i() {
      t.filters = {}, t.load();
    }
    return n({ icon: o, hasFilters: l, reset: i }), (s, u) => (D(), pe("form", {
      onSubmit: u[2] || (u[2] = Ie((c) => V(t).load(), ["prevent"])),
      class: "ox-list-filters width-full"
    }, [
      p(Wa, {
        dense: "",
        color: "transparent"
      }, {
        default: M(() => [
          p(Hn, {
            icon: o.value,
            readonly: ""
          }, null, 8, ["icon"]),
          a.search && V(t).filters ? (D(), Y(rt, {
            key: 0,
            label: V(oe)("filters.search"),
            density: "compact",
            class: "ml-2",
            modelValue: V(t).filters[a.search],
            "onUpdate:modelValue": u[0] || (u[0] = (c) => V(t).filters[a.search] = c),
            "hide-details": ""
          }, null, 8, ["label", "modelValue"])) : de("", !0),
          j(s.$slots, "default", {
            list: V(t),
            filters: V(t).filters
          }),
          p(be, {
            onClick: u[1] || (u[1] = Ie((c) => V(t).load(), ["stop"])),
            class: "ml-2",
            icon: "mdi-check",
            "aria-label": s.$t("filters.apply"),
            title: V(oe)("filters.apply")
          }, null, 8, ["aria-label", "title"]),
          l.value ? (D(), Y(be, {
            key: 1,
            onClick: Ie(i, ["stop"]),
            icon: "mdi-backspace",
            "aria-label": V(oe)("filters.reset"),
            title: V(oe)("filters.reset")
          }, null, 8, ["aria-label", "title"])) : de("", !0)
        ]),
        _: 3
      })
    ], 32));
  }
}, cr = K({
  ...Se(),
  ...Tu()
}, "VForm"), Za = ne()({
  name: "VForm",
  props: cr(),
  emits: {
    "update:modelValue": (e) => !0,
    submit: (e) => !0
  },
  setup(e, n) {
    let {
      slots: t,
      emit: a
    } = n;
    const l = _u(e), o = q();
    function i(u) {
      u.preventDefault(), l.reset();
    }
    function s(u) {
      const c = u, r = l.validate();
      c.then = r.then.bind(r), c.catch = r.catch.bind(r), c.finally = r.finally.bind(r), a("submit", c), c.defaultPrevented || r.then((d) => {
        var v;
        let {
          valid: m
        } = d;
        m && ((v = o.value) == null || v.submit());
      }), c.preventDefault();
    }
    return ie(() => {
      var u;
      return C("form", {
        ref: o,
        class: fe(["v-form", e.class]),
        style: Ve(e.style),
        novalidate: !0,
        onReset: i,
        onSubmit: s
      }, [(u = t.default) == null ? void 0 : u.call(t, l)]);
    }), yt(l, o);
  }
}), dr = { class: "flex-row justify-right" }, vr = /* @__PURE__ */ Ge({
  __name: "OxFormList",
  props: /* @__PURE__ */ Ja({
    useModel: Function,
    editable: Boolean
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    var c;
    const n = el(e, "modelValue"), t = ve("user"), a = q({}), l = e, o = I(() => ({
      add: l.editable && t.can([l.useModel, "add"]),
      change: l.editable && t.can([l.useModel, "change"]),
      delete: l.editable && t.can([l.useModel, "delete"])
    })), i = q([]);
    (c = n.value) != null && c.length || i.value.push(-1);
    function s() {
      n.value.push(a.value), a.value = {};
    }
    function u(r) {
      confirm(oe("actions.delete.confirm")) && l.delete && n.value.splice(r);
    }
    return (r, d) => (D(), Y(ut, {
      opened: i.value,
      "onUpdate:opened": d[3] || (d[3] = (m) => i.value = m)
    }, {
      default: M(() => {
        var m;
        return [
          (m = n.value) != null && m.length ? (D(!0), pe(J, { key: 0 }, Me(n.value, (v, f) => (D(), Y(Ha, {
            key: f,
            value: f
          }, {
            activator: M(({ props: x }) => [
              p(Ye, L({ ref_for: !0 }, x), {
                append: M(() => [
                  C("div", {
                    onClick: d[0] || (d[0] = Ie(() => {
                    }, ["stop"]))
                  }, [
                    j(r.$slots, "item.actions", L({
                      item: v,
                      index: f
                    }, { ref_for: !0 }, x)),
                    o.value.delete ? (D(), Y(be, {
                      key: 0,
                      type: "button",
                      class: "ml-2",
                      size: "small",
                      onClick: Ie((y) => u(f), ["stop", "prevent"]),
                      color: "error",
                      "aria-label": V(oe)("actions.remove"),
                      title: V(oe)("actions.remove"),
                      icon: "mdi-delete"
                    }, null, 8, ["onClick", "aria-label", "title"])) : de("", !0)
                  ])
                ]),
                default: M(() => [
                  p(Ei, null, {
                    default: M(() => [
                      j(r.$slots, "item.title", { item: v })
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1040)
            ]),
            default: M(() => [
              p(Za, {
                disabled: !o.value.change
              }, {
                default: M(() => [
                  j(r.$slots, "item", {
                    item: v,
                    index: f,
                    editable: o.value.change
                  })
                ]),
                _: 2
              }, 1032, ["disabled"])
            ]),
            _: 2
          }, 1032, ["value"]))), 128)) : (D(), Y(Ye, {
            key: 1,
            title: V(oe)("lists.empty")
          }, null, 8, ["title"])),
          o.value.add ? (D(), pe(J, { key: 2 }, [
            n.value.length ? (D(), Y(Dt, { key: 0 })) : de("", !0),
            p(Ha, { value: -1 }, {
              activator: M(({ props: v }) => [
                p(Ye, L(v, {
                  title: V(oe)("actions.add_item"),
                  "prepend-icon": "mdi-plus"
                }), null, 16, ["title"])
              ]),
              default: M(() => [
                p(Za, null, {
                  default: M(() => [
                    j(r.$slots, "item", {
                      item: a.value,
                      edit: !0
                    })
                  ]),
                  _: 3
                }),
                a.value ? (D(), Y(Ye, { key: 0 }, {
                  default: M(() => [
                    C("div", dr, [
                      a.value ? (D(), Y(be, {
                        key: 0,
                        size: "small",
                        onClick: d[1] || (d[1] = (v) => a.value = {}),
                        color: "secondary",
                        "prepend-icon": "mdi-backspace",
                        "aria-label": V(oe)("actions.discard")
                      }, {
                        default: M(() => [
                          Pe(Re(V(oe)("actions.discard")), 1)
                        ]),
                        _: 1
                      }, 8, ["aria-label"])) : de("", !0),
                      a.value ? (D(), Y(be, {
                        key: 1,
                        size: "small",
                        onClick: d[2] || (d[2] = (v) => s()),
                        color: "primary",
                        "prepend-icon": "mdi-plus",
                        "aria-label": V(oe)("actions.add")
                      }, {
                        default: M(() => [
                          Pe(Re(V(oe)("actions.add")), 1)
                        ]),
                        _: 1
                      }, 8, ["aria-label"])) : de("", !0)
                    ])
                  ]),
                  _: 1
                })) : de("", !0)
              ]),
              _: 3
            })
          ], 64)) : de("", !0)
        ];
      }),
      _: 3
    }, 8, ["opened"]));
  }
}), fr = ne()({
  name: "VCardActions",
  props: Se(),
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
}), mr = K({
  opacity: [Number, String],
  ...Se(),
  ...Ue()
}, "VCardSubtitle"), gr = ne()({
  name: "VCardSubtitle",
  props: mr(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    return ie(() => p(e.tag, {
      class: fe(["v-card-subtitle", e.class]),
      style: Ve([{
        "--v-card-subtitle-opacity": e.opacity
      }, e.style])
    }, t)), {};
  }
}), po = $i("v-card-title"), yr = K({
  appendAvatar: String,
  appendIcon: xe,
  prependAvatar: String,
  prependIcon: xe,
  subtitle: {
    type: [String, Number, Boolean],
    default: void 0
  },
  title: {
    type: [String, Number, Boolean],
    default: void 0
  },
  ...Se(),
  ...ft()
}, "VCardItem"), hr = ne()({
  name: "VCardItem",
  props: yr(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    return ie(() => {
      var c;
      const a = !!(e.prependAvatar || e.prependIcon), l = !!(a || t.prepend), o = !!(e.appendAvatar || e.appendIcon), i = !!(o || t.append), s = !!(e.title != null || t.title), u = !!(e.subtitle != null || t.subtitle);
      return C("div", {
        class: fe(["v-card-item", e.class]),
        style: Ve(e.style)
      }, [l && C("div", {
        key: "prepend",
        class: "v-card-item__prepend"
      }, [t.prepend ? p(Fe, {
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
      }, t.prepend) : C(J, null, [e.prependAvatar && p(Pt, {
        key: "prepend-avatar",
        density: e.density,
        image: e.prependAvatar
      }, null), e.prependIcon && p(ke, {
        key: "prepend-icon",
        density: e.density,
        icon: e.prependIcon
      }, null)])]), C("div", {
        class: "v-card-item__content"
      }, [s && p(po, {
        key: "title"
      }, {
        default: () => {
          var r;
          return [((r = t.title) == null ? void 0 : r.call(t)) ?? Re(e.title)];
        }
      }), u && p(gr, {
        key: "subtitle"
      }, {
        default: () => {
          var r;
          return [((r = t.subtitle) == null ? void 0 : r.call(t)) ?? Re(e.subtitle)];
        }
      }), (c = t.default) == null ? void 0 : c.call(t)]), i && C("div", {
        key: "append",
        class: "v-card-item__append"
      }, [t.append ? p(Fe, {
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
      }, t.append) : C(J, null, [e.appendIcon && p(ke, {
        key: "append-icon",
        density: e.density,
        icon: e.appendIcon
      }, null), e.appendAvatar && p(Pt, {
        key: "append-avatar",
        density: e.density,
        image: e.appendAvatar
      }, null)])])]);
    }), {};
  }
}), br = K({
  opacity: [Number, String],
  ...Se(),
  ...Ue()
}, "VCardText"), pr = ne()({
  name: "VCardText",
  props: br(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    return ie(() => p(e.tag, {
      class: fe(["v-card-text", e.class]),
      style: Ve([{
        "--v-card-text-opacity": e.opacity
      }, e.style])
    }, t)), {};
  }
}), wr = K({
  appendAvatar: String,
  appendIcon: xe,
  disabled: Boolean,
  flat: Boolean,
  hover: Boolean,
  image: String,
  link: {
    type: Boolean,
    default: void 0
  },
  prependAvatar: String,
  prependIcon: xe,
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
  ...Nt(),
  ...Se(),
  ...ft(),
  ...zt(),
  ...Lt(),
  ...rl(),
  ...vn(),
  ...dn(),
  ...wt(),
  ...bn(),
  ...Ue(),
  ...Le(),
  ...Ut({
    variant: "elevated"
  })
}, "VCard"), xr = ne()({
  name: "VCard",
  directives: {
    vRipple: Ct
  },
  props: wr(),
  setup(e, n) {
    let {
      attrs: t,
      slots: a
    } = n;
    const {
      themeClasses: l
    } = je(e), {
      borderClasses: o
    } = ya(e), {
      colorClasses: i,
      colorStyles: s,
      variantClasses: u
    } = al(e), {
      densityClasses: c
    } = Bt(e), {
      dimensionStyles: r
    } = Ht(e), {
      elevationClasses: d
    } = ha(e), {
      loaderClasses: m
    } = sl(e), {
      locationStyles: v
    } = Oi(e), {
      positionClasses: f
    } = cn(e), {
      roundedClasses: x
    } = _t(e), y = gn(e, t);
    return ie(() => {
      const h = e.link !== !1 && y.isLink.value, g = !e.disabled && e.link !== !1 && (e.link || y.isClickable.value), A = h ? "a" : e.tag, k = !!(a.title || e.title != null), S = !!(a.subtitle || e.subtitle != null), w = k || S, P = !!(a.append || e.appendAvatar || e.appendIcon), b = !!(a.prepend || e.prependAvatar || e.prependIcon), B = !!(a.image || e.image), T = w || b || P, E = !!(a.text || e.text != null);
      return Ke(p(A, L({
        class: ["v-card", {
          "v-card--disabled": e.disabled,
          "v-card--flat": e.flat,
          "v-card--hover": e.hover && !(e.disabled || e.flat),
          "v-card--link": g
        }, l.value, o.value, i.value, c.value, d.value, m.value, f.value, x.value, u.value, e.class],
        style: [s.value, r.value, v.value, e.style],
        onClick: g && y.navigate,
        tabindex: e.disabled ? -1 : void 0
      }, y.linkProps), {
        default: () => {
          var R;
          return [B && C("div", {
            key: "image",
            class: "v-card__image"
          }, [a.image ? p(Fe, {
            key: "image-defaults",
            disabled: !e.image,
            defaults: {
              VImg: {
                cover: !0,
                src: e.image
              }
            }
          }, a.image) : p(pa, {
            key: "image-img",
            cover: !0,
            src: e.image
          }, null)]), p(ul, {
            name: "v-card",
            active: !!e.loading,
            color: typeof e.loading == "boolean" ? void 0 : e.loading
          }, {
            default: a.loader
          }), T && p(hr, {
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
          }), E && p(pr, {
            key: "text"
          }, {
            default: () => {
              var F;
              return [((F = a.text) == null ? void 0 : F.call(a)) ?? e.text];
            }
          }), (R = a.default) == null ? void 0 : R.call(a), a.actions && p(fr, null, {
            default: a.actions
          }), ll(g, "v-card")];
        }
      }), [[Ct, g && e.ripple]]);
    }), {};
  }
}), Sr = ne()({
  name: "VSlideGroupItem",
  props: ol(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = il(e, to);
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
}), kr = {
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
    function i(u, c, r) {
      u[r] ? !u[r].includes(c) && u[r].push(c) : u[r] = [c];
    }
    const s = I(() => {
      const u = {};
      if (a.value)
        for (var c of a.value) {
          const d = c[l.field];
          if (Array.isArray(d))
            if (d.length)
              for (var r of d)
                i(u, c, r);
            else
              i(u, c, null);
          else
            i(u, c, d);
        }
      return u;
    });
    return (u, c) => (D(), Y(wn, null, {
      default: M(() => [
        p(Mt, null, {
          default: M(() => [
            (D(!0), pe(J, null, Me(l.headers, (r, d) => (D(), Y(Sr, {
              key: r.value
            }, {
              default: M(({ selectedClass: m }) => [
                p(xr, {
                  width: "400",
                  class: fe(["ma-3", m]),
                  color: o(d),
                  lines: "two"
                }, {
                  default: M(() => [
                    p(po, null, {
                      default: M(() => [
                        Pe(Re(r.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    p(ut, {
                      "bg-color": o(d)
                    }, {
                      default: M(() => [
                        s.value && s.value[r.value] ? (D(!0), pe(J, { key: 0 }, Me(s.value[r.value], (v) => j(u.$slots, "item", {
                          key: v.id,
                          header: r,
                          item: v
                        }, () => [
                          p(Ye, {
                            title: v[l.itemTitle],
                            value: l.itemValue && v[l.itemValue],
                            onClick: (f) => t("click", v)
                          }, {
                            append: M(() => [
                              j(u.$slots, "item.action")
                            ]),
                            _: 2
                          }, 1032, ["title", "value", "onClick"])
                        ])), 128)) : de("", !0)
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
function Vr() {
  const e = q([]);
  vi(() => e.value = []);
  function n(t, a) {
    e.value[a] = t;
  }
  return {
    refs: e,
    updateRef: n
  };
}
const Cr = K({
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
    type: xe,
    default: "$first"
  },
  prevIcon: {
    type: xe,
    default: "$prev"
  },
  nextIcon: {
    type: xe,
    default: "$next"
  },
  lastIcon: {
    type: xe,
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
  ...Nt(),
  ...Se(),
  ...ft(),
  ...Lt(),
  ...wt(),
  ...hn(),
  ...Ue({
    tag: "nav"
  }),
  ...Le(),
  ...Ut({
    variant: "text"
  })
}, "VPagination"), en = ne()({
  name: "VPagination",
  props: Cr(),
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
    } = ot(), {
      isRtl: s
    } = nt(), {
      themeClasses: u
    } = je(e), {
      width: c
    } = mt(), r = ee(-1);
    at(void 0, {
      scoped: !0
    });
    const {
      resizeRef: d
    } = Vt((b) => {
      if (!b.length) return;
      const {
        target: B,
        contentRect: T
      } = b[0], E = B.querySelector(".v-pagination__list > *");
      if (!E) return;
      const R = T.width, F = E.offsetWidth + parseFloat(getComputedStyle(E).marginRight) * 2;
      r.value = x(R, F);
    }), m = I(() => parseInt(e.length, 10)), v = I(() => parseInt(e.start, 10)), f = I(() => e.totalVisible != null ? parseInt(e.totalVisible, 10) : r.value >= 0 ? r.value : x(c.value, 58));
    function x(b, B) {
      const T = e.showFirstLastPage ? 5 : 3;
      return Math.max(0, Math.floor(
        // Round to two decimal places to avoid floating point errors
        Number(((b - B * T) / B).toFixed(2))
      ));
    }
    const y = I(() => {
      if (m.value <= 0 || isNaN(m.value) || m.value > Number.MAX_SAFE_INTEGER) return [];
      if (f.value <= 0) return [];
      if (f.value === 1) return [l.value];
      if (m.value <= f.value)
        return qt(m.value, v.value);
      const b = f.value % 2 === 0, B = b ? f.value / 2 : Math.floor(f.value / 2), T = b ? B : B + 1, E = m.value - B;
      if (T - l.value >= 0)
        return [...qt(Math.max(1, f.value - 1), v.value), e.ellipsis, m.value];
      if (l.value - E >= (b ? 1 : 0)) {
        const R = f.value - 1, F = m.value - R + v.value;
        return [v.value, e.ellipsis, ...qt(R, F)];
      } else {
        const R = Math.max(1, f.value - 2), F = R === 1 ? l.value : l.value - Math.ceil(R / 2) + v.value;
        return [v.value, e.ellipsis, ...qt(R, F), e.ellipsis, m.value];
      }
    });
    function h(b, B, T) {
      b.preventDefault(), l.value = B, T && a(T, B);
    }
    const {
      refs: g,
      updateRef: A
    } = Vr();
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
    const k = I(() => y.value.map((b, B) => {
      const T = (E) => A(E, B);
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
        const E = b === l.value;
        return {
          isActive: E,
          key: b,
          page: i(b),
          props: {
            ref: T,
            ellipsis: !1,
            icon: !0,
            disabled: !!e.disabled || Number(e.length) < 2,
            color: E ? e.activeColor : e.color,
            "aria-current": E,
            "aria-label": o(E ? e.currentPageAriaLabel : e.pageAriaLabel, b),
            onClick: (R) => h(R, b)
          }
        };
      }
    })), S = I(() => {
      const b = !!e.disabled || l.value <= v.value, B = !!e.disabled || l.value >= v.value + m.value - 1;
      return {
        first: e.showFirstLastPage ? {
          icon: s.value ? e.lastIcon : e.firstIcon,
          onClick: (T) => h(T, v.value, "first"),
          disabled: b,
          "aria-label": o(e.firstAriaLabel),
          "aria-disabled": b
        } : void 0,
        prev: {
          icon: s.value ? e.nextIcon : e.prevIcon,
          onClick: (T) => h(T, l.value - 1, "prev"),
          disabled: b,
          "aria-label": o(e.previousAriaLabel),
          "aria-disabled": b
        },
        next: {
          icon: s.value ? e.prevIcon : e.nextIcon,
          onClick: (T) => h(T, l.value + 1, "next"),
          disabled: B,
          "aria-label": o(e.nextAriaLabel),
          "aria-disabled": B
        },
        last: e.showFirstLastPage ? {
          icon: s.value ? e.firstIcon : e.lastIcon,
          onClick: (T) => h(T, v.value + m.value - 1, "last"),
          disabled: B,
          "aria-label": o(e.lastAriaLabel),
          "aria-disabled": B
        } : void 0
      };
    });
    function w() {
      var B;
      const b = l.value - v.value;
      (B = g.value[b]) == null || B.$el.focus();
    }
    function P(b) {
      b.key === Ml.left && !e.disabled && l.value > Number(e.start) ? (l.value = l.value - 1, Te(w)) : b.key === Ml.right && !e.disabled && l.value < v.value + m.value - 1 && (l.value = l.value + 1, Te(w));
    }
    return ie(() => p(e.tag, {
      ref: d,
      class: fe(["v-pagination", u.value, e.class]),
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
      }, [t.first ? t.first(S.value.first) : p(be, L({
        _as: "VPaginationBtn"
      }, S.value.first), null)]), C("li", {
        key: "prev",
        class: "v-pagination__prev",
        "data-test": "v-pagination-prev"
      }, [t.prev ? t.prev(S.value.prev) : p(be, L({
        _as: "VPaginationBtn"
      }, S.value.prev), null)]), k.value.map((b, B) => C("li", {
        key: b.key,
        class: fe(["v-pagination__item", {
          "v-pagination__item--is-active": b.isActive
        }]),
        "data-test": "v-pagination-item"
      }, [t.item ? t.item(b) : p(be, L({
        _as: "VPaginationBtn"
      }, b.props), {
        default: () => [b.page]
      })])), C("li", {
        key: "next",
        class: "v-pagination__next",
        "data-test": "v-pagination-next"
      }, [t.next ? t.next(S.value.next) : p(be, L({
        _as: "VPaginationBtn"
      }, S.value.next), null)]), e.showFirstLastPage && C("li", {
        key: "last",
        class: "v-pagination__last",
        "data-test": "v-pagination-last"
      }, [t.last ? t.last(S.value.last) : p(be, L({
        _as: "VPaginationBtn"
      }, S.value.last), null)])])]
    })), {};
  }
}), wo = K({
  page: {
    type: [Number, String],
    default: 1
  },
  itemsPerPage: {
    type: [Number, String],
    default: 10
  }
}, "DataTable-paginate"), xo = Symbol.for("vuetify:data-table-pagination");
function So(e) {
  const n = we(e, "page", void 0, (a) => Number(a ?? 1)), t = we(e, "itemsPerPage", void 0, (a) => Number(a ?? 10));
  return {
    page: n,
    itemsPerPage: t
  };
}
function ko(e) {
  const {
    page: n,
    itemsPerPage: t,
    itemsLength: a
  } = e, l = I(() => t.value === -1 ? 0 : t.value * (n.value - 1)), o = I(() => t.value === -1 ? a.value : Math.min(a.value, l.value + t.value)), i = I(() => t.value === -1 || a.value === 0 ? 1 : Math.ceil(a.value / t.value));
  Q([n, i], () => {
    n.value > i.value && (n.value = i.value);
  });
  function s(m) {
    t.value = m, n.value = 1;
  }
  function u() {
    n.value = Je(n.value + 1, 1, i.value);
  }
  function c() {
    n.value = Je(n.value - 1, 1, i.value);
  }
  function r(m) {
    n.value = Je(m, 1, i.value);
  }
  const d = {
    page: n,
    itemsPerPage: t,
    startIndex: l,
    stopIndex: o,
    pageCount: i,
    itemsLength: a,
    nextPage: u,
    prevPage: c,
    setPage: r,
    setItemsPerPage: s
  };
  return ze(xo, d), d;
}
function Pr() {
  const e = ve(xo);
  if (!e) throw new Error("Missing pagination!");
  return e;
}
function Ir(e) {
  const n = lt("usePaginatedItems"), {
    items: t,
    startIndex: a,
    stopIndex: l,
    itemsPerPage: o
  } = e, i = I(() => o.value <= 0 ? t.value : t.value.slice(a.value, l.value));
  return Q(i, (s) => {
    n.emit("update:currentItems", s);
  }, {
    immediate: !0
  }), {
    paginatedItems: i
  };
}
const Vl = K({
  prevIcon: {
    type: xe,
    default: "$prev"
  },
  nextIcon: {
    type: xe,
    default: "$next"
  },
  firstIcon: {
    type: xe,
    default: "$first"
  },
  lastIcon: {
    type: xe,
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
}, "VDataTableFooter"), ca = ne()({
  name: "VDataTableFooter",
  props: Vl(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const {
      t: a
    } = ot(), {
      page: l,
      pageCount: o,
      startIndex: i,
      stopIndex: s,
      itemsLength: u,
      itemsPerPage: c,
      setItemsPerPage: r
    } = Pr(), d = I(() => e.itemsPerPageOptions.map((m) => typeof m == "number" ? {
      value: m,
      title: m === -1 ? a("$vuetify.dataFooter.itemsPerPageAll") : String(m)
    } : {
      ...m,
      title: isNaN(Number(m.title)) ? a(m.title) : m.title
    }));
    return ie(() => {
      var v;
      const m = en.filterProps(e);
      return C("div", {
        class: "v-data-table-footer"
      }, [(v = t.prepend) == null ? void 0 : v.call(t), C("div", {
        class: "v-data-table-footer__items-per-page"
      }, [C("span", {
        "aria-label": a(e.itemsPerPageText)
      }, [a(e.itemsPerPageText)]), p(kl, {
        items: d.value,
        modelValue: c.value,
        "onUpdate:modelValue": (f) => r(Number(f)),
        density: "compact",
        variant: "outlined",
        "hide-details": !0
      }, null)]), C("div", {
        class: "v-data-table-footer__info"
      }, [C("div", null, [a(e.pageText, u.value ? i.value + 1 : 0, s.value, u.value)])]), C("div", {
        class: "v-data-table-footer__pagination"
      }, [p(en, L({
        modelValue: l.value,
        "onUpdate:modelValue": (f) => l.value = f,
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
      }, m), null)])]);
    }), {};
  }
}), da = Yi({
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
  return p(a, {
    tabindex: "0",
    class: fe(["v-data-table__td", {
      "v-data-table-column--fixed": e.fixed,
      "v-data-table-column--last-fixed": e.lastFixed,
      "v-data-table-column--no-padding": e.noPadding,
      "v-data-table-column--nowrap": e.nowrap
    }, `v-data-table-column--align-${e.align}`]),
    style: {
      height: ye(e.height),
      width: ye(e.width),
      maxWidth: ye(e.maxWidth),
      left: ye(e.fixedOffset || null)
    }
  }, {
    default: () => {
      var l;
      return [(l = t.default) == null ? void 0 : l.call(t)];
    }
  });
}), Ar = K({
  headers: Array
}, "DataTable-header"), Vo = Symbol.for("vuetify:data-table-headers"), Co = {
  title: "",
  sortable: !1
}, Tr = {
  ...Co,
  width: 48
};
function _r() {
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
function Qa(e) {
  let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  if (!e.children)
    n.push(e);
  else
    for (const t of e.children)
      Qa(t, n);
  return n;
}
function Po(e) {
  let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : /* @__PURE__ */ new Set();
  for (const t of e)
    t.key && n.add(t.key), t.children && Po(t.children, n);
  return n;
}
function Br(e) {
  if (e.key) {
    if (e.key === "data-table-group") return Co;
    if (["data-table-expand", "data-table-select"].includes(e.key)) return Tr;
  }
}
function Cl(e) {
  let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return e.children ? Math.max(n, ...e.children.map((t) => Cl(t, n + 1))) : n;
}
function Er(e) {
  let n = !1;
  function t(o) {
    let i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (o)
      if (i && (o.fixed = !0), o.fixed)
        if (o.children)
          for (let s = o.children.length - 1; s >= 0; s--)
            t(o.children[s], !0);
        else
          n ? isNaN(Number(o.width)) ? Vn(`Multiple fixed columns should have a static width (key: ${o.key})`) : o.minWidth = Math.max(Number(o.width) || 0, Number(o.minWidth) || 0) : o.lastFixed = !0, n = !0;
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
function $r(e, n) {
  const t = [];
  let a = 0;
  const l = _r(e);
  for (; l.size() > 0; ) {
    let i = l.count();
    const s = [];
    let u = 1;
    for (; i > 0; ) {
      const {
        element: c,
        priority: r
      } = l.dequeue(), d = n - a - Cl(c);
      if (s.push({
        ...c,
        rowspan: d ?? 1,
        colspan: c.children ? Qa(c).length : 1
      }), c.children)
        for (const m of c.children) {
          const v = r % 1 + u / Math.pow(10, a + 2);
          l.enqueue(m, a + d + v);
        }
      u += 1, i -= 1;
    }
    a += 1, t.push(s);
  }
  return {
    columns: e.map((i) => Qa(i)).flat(),
    headers: t
  };
}
function Io(e) {
  const n = [];
  for (const t of e) {
    const a = {
      ...Br(t),
      ...t
    }, l = a.key ?? (typeof a.value == "string" ? a.value : null), o = a.value ?? l ?? null, i = {
      ...a,
      key: l,
      value: o,
      sortable: a.sortable ?? (a.key != null || !!a.sort),
      children: a.children ? Io(a.children) : void 0
    };
    n.push(i);
  }
  return n;
}
function Ao(e, n) {
  const t = q([]), a = q([]), l = q({}), o = q({}), i = q({});
  et(() => {
    var x, y, h;
    const c = (e.headers || Object.keys(e.items[0] ?? {}).map((g) => ({
      key: g,
      title: fi(g)
    }))).slice(), r = Po(c);
    (x = n == null ? void 0 : n.groupBy) != null && x.value.length && !r.has("data-table-group") && c.unshift({
      key: "data-table-group",
      title: "Group"
    }), (y = n == null ? void 0 : n.showSelect) != null && y.value && !r.has("data-table-select") && c.unshift({
      key: "data-table-select"
    }), (h = n == null ? void 0 : n.showExpand) != null && h.value && !r.has("data-table-expand") && c.push({
      key: "data-table-expand"
    });
    const d = Io(c);
    Er(d);
    const m = Math.max(...d.map((g) => Cl(g))) + 1, v = $r(d, m);
    t.value = v.headers, a.value = v.columns;
    const f = v.headers.flat(1);
    for (const g of f)
      g.key && (g.sortable && (g.sort && (l.value[g.key] = g.sort), g.sortRaw && (o.value[g.key] = g.sortRaw)), g.filter && (i.value[g.key] = g.filter));
  });
  const s = {
    headers: t,
    columns: a,
    sortFunctions: l,
    sortRawFunctions: o,
    filterFunctions: i
  };
  return ze(Vo, s), s;
}
function Va() {
  const e = ve(Vo);
  if (!e) throw new Error("Missing headers!");
  return e;
}
const Or = {
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
}, To = {
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
    return To.select({
      items: t,
      value: n,
      selected: a
    });
  }
}, _o = {
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
    return _o.select({
      items: t,
      value: n,
      selected: a
    });
  }
}, Fr = K({
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
    default: it
  }
}, "DataTable-select"), Bo = Symbol.for("vuetify:data-table-selection");
function Eo(e, n) {
  let {
    allItems: t,
    currentPage: a
  } = n;
  const l = we(e, "modelValue", e.modelValue, (g) => new Set(Ne(g).map((A) => {
    var k;
    return ((k = t.value.find((S) => e.valueComparator(A, S.value))) == null ? void 0 : k.value) ?? A;
  })), (g) => [...g.values()]), o = I(() => t.value.filter((g) => g.selectable)), i = I(() => a.value.filter((g) => g.selectable)), s = I(() => {
    if (typeof e.selectStrategy == "object") return e.selectStrategy;
    switch (e.selectStrategy) {
      case "single":
        return Or;
      case "all":
        return _o;
      case "page":
      default:
        return To;
    }
  }), u = ee(null);
  function c(g) {
    return Ne(g).every((A) => l.value.has(A.value));
  }
  function r(g) {
    return Ne(g).some((A) => l.value.has(A.value));
  }
  function d(g, A) {
    const k = s.value.select({
      items: g,
      value: A,
      selected: new Set(l.value)
    });
    l.value = k;
  }
  function m(g, A, k) {
    const S = [];
    if (A = A ?? a.value.findIndex((w) => w.value === g.value), e.selectStrategy !== "single" && (k != null && k.shiftKey) && u.value !== null) {
      const [w, P] = [u.value, A].sort((b, B) => b - B);
      S.push(...a.value.slice(w, P + 1).filter((b) => b.selectable));
    } else
      S.push(g), u.value = A;
    d(S, !c([g]));
  }
  function v(g) {
    const A = s.value.selectAll({
      value: g,
      allItems: o.value,
      currentPage: i.value,
      selected: new Set(l.value)
    });
    l.value = A;
  }
  const f = I(() => l.value.size > 0), x = I(() => {
    const g = s.value.allSelected({
      allItems: o.value,
      currentPage: i.value
    });
    return !!g.length && c(g);
  }), y = H(() => s.value.showSelectAll), h = {
    toggleSelect: m,
    select: d,
    selectAll: v,
    isSelected: c,
    isSomeSelected: r,
    someSelected: f,
    allSelected: x,
    showSelectAll: y,
    lastSelectedIndex: u,
    selectStrategy: s
  };
  return ze(Bo, h), h;
}
function Ca() {
  const e = ve(Bo);
  if (!e) throw new Error("Missing selection!");
  return e;
}
const Rr = K({
  sortBy: {
    type: Array,
    default: () => []
  },
  customKeySort: Object,
  multiSort: Boolean,
  mustSort: Boolean
}, "DataTable-sort"), $o = Symbol.for("vuetify:data-table-sort");
function Oo(e) {
  const n = we(e, "sortBy"), t = H(() => e.mustSort), a = H(() => e.multiSort);
  return {
    sortBy: n,
    mustSort: t,
    multiSort: a
  };
}
function Fo(e) {
  const {
    sortBy: n,
    mustSort: t,
    multiSort: a,
    page: l
  } = e, o = (u) => {
    if (u.key == null) return;
    let c = n.value.map((d) => ({
      ...d
    })) ?? [];
    const r = c.find((d) => d.key === u.key);
    r ? r.order === "desc" ? t.value && c.length === 1 ? r.order = "asc" : c = c.filter((d) => d.key !== u.key) : r.order = "desc" : a.value ? c.push({
      key: u.key,
      order: "asc"
    }) : c = [{
      key: u.key,
      order: "asc"
    }], n.value = c, l && (l.value = 1);
  };
  function i(u) {
    return !!n.value.find((c) => c.key === u.key);
  }
  const s = {
    sortBy: n,
    toggleSort: o,
    isSorted: i
  };
  return ze($o, s), s;
}
function Ro() {
  const e = ve($o);
  if (!e) throw new Error("Missing sort!");
  return e;
}
function Mr(e, n, t, a) {
  const l = ot();
  return {
    sortedItems: I(() => {
      var i, s;
      return t.value.length ? Dr(n.value, t.value, l.current.value, {
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
function Dr(e, n, t, a) {
  const l = new Intl.Collator(t, {
    sensitivity: "accent",
    usage: "sort"
  });
  return e.map((i) => [i, a != null && a.transform ? a.transform(i) : i]).sort((i, s) => {
    var u, c;
    for (let r = 0; r < n.length; r++) {
      let d = !1;
      const m = n[r].key, v = n[r].order ?? "asc";
      if (v === !1) continue;
      let f = la(i[1], m), x = la(s[1], m), y = i[0].raw, h = s[0].raw;
      if (v === "desc" && ([f, x] = [x, f], [y, h] = [h, y]), (u = a == null ? void 0 : a.sortRawFunctions) != null && u[m]) {
        const g = a.sortRawFunctions[m](y, h);
        if (g == null) continue;
        if (d = !0, g) return g;
      }
      if ((c = a == null ? void 0 : a.sortFunctions) != null && c[m]) {
        const g = a.sortFunctions[m](f, x);
        if (g == null) continue;
        if (d = !0, g) return g;
      }
      if (!d) {
        if (f instanceof Date && x instanceof Date)
          return f.getTime() - x.getTime();
        if ([f, x] = [f, x].map((g) => g != null ? g.toString().toLocaleLowerCase() : g), f !== x)
          return Xt(f) && Xt(x) ? 0 : Xt(f) ? -1 : Xt(x) ? 1 : !isNaN(f) && !isNaN(x) ? Number(f) - Number(x) : l.compare(f, x);
      }
    }
    return 0;
  }).map((i) => {
    let [s] = i;
    return s;
  });
}
const Mo = K({
  color: String,
  disableSort: Boolean,
  fixedHeader: Boolean,
  multiSort: Boolean,
  sortAscIcon: {
    type: xe,
    default: "$sortAsc"
  },
  sortDescIcon: {
    type: xe,
    default: "$sortDesc"
  },
  headerProps: {
    type: Object
  },
  /** @deprecated */
  sticky: Boolean,
  ...Gt(),
  ...rl()
}, "VDataTableHeaders"), va = ne()({
  name: "VDataTableHeaders",
  props: Mo(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const {
      t: a
    } = ot(), {
      toggleSort: l,
      sortBy: o,
      isSorted: i
    } = Ro(), {
      someSelected: s,
      allSelected: u,
      selectAll: c,
      showSelectAll: r
    } = Ca(), {
      columns: d,
      headers: m
    } = Va(), {
      loaderClasses: v
    } = sl(e);
    function f(B, T) {
      if (!(!(e.sticky || e.fixedHeader) && !B.fixed))
        return {
          position: "sticky",
          left: B.fixed ? ye(B.fixedOffset) : void 0,
          top: e.sticky || e.fixedHeader ? `calc(var(--v-table-header-height) * ${T})` : void 0
        };
    }
    function x(B, T) {
      B.key === "Enter" && !e.disableSort && l(T);
    }
    function y(B) {
      const T = o.value.find((E) => E.key === B.key);
      return T ? T.order === "asc" ? e.sortAscIcon : e.sortDescIcon : e.sortAscIcon;
    }
    const {
      backgroundColorClasses: h,
      backgroundColorStyles: g
    } = st(() => e.color), {
      displayClasses: A,
      mobile: k
    } = mt(e), S = I(() => ({
      headers: m.value,
      columns: d.value,
      toggleSort: l,
      isSorted: i,
      sortBy: o.value,
      someSelected: s.value,
      allSelected: u.value,
      selectAll: c,
      getSortIcon: y
    })), w = I(() => ["v-data-table__th", {
      "v-data-table__th--sticky": e.sticky || e.fixedHeader
    }, A.value, v.value]), P = (B) => {
      let {
        column: T,
        x: E,
        y: R
      } = B;
      const F = T.key === "data-table-select" || T.key === "data-table-expand", z = L(e.headerProps ?? {}, T.headerProps ?? {});
      return p(da, L({
        tag: "th",
        align: T.align,
        class: [{
          "v-data-table__th--sortable": T.sortable && !e.disableSort,
          "v-data-table__th--sorted": i(T),
          "v-data-table__th--fixed": T.fixed
        }, ...w.value],
        style: {
          width: ye(T.width),
          minWidth: ye(T.minWidth),
          maxWidth: ye(T.maxWidth),
          ...f(T, R)
        },
        colspan: T.colspan,
        rowspan: T.rowspan,
        onClick: T.sortable ? () => l(T) : void 0,
        fixed: T.fixed,
        nowrap: T.nowrap,
        lastFixed: T.lastFixed,
        noPadding: F
      }, z, {
        onKeydown: (W) => T.sortable && x(W, T)
      }), {
        default: () => {
          var te;
          const W = `header.${T.key}`, G = {
            column: T,
            selectAll: c,
            isSorted: i,
            toggleSort: l,
            sortBy: o.value,
            someSelected: s.value,
            allSelected: u.value,
            getSortIcon: y
          };
          return t[W] ? t[W](G) : T.key === "data-table-select" ? ((te = t["header.data-table-select"]) == null ? void 0 : te.call(t, G)) ?? (r.value && p(pt, {
            modelValue: u.value,
            indeterminate: s.value && !u.value,
            "onUpdate:modelValue": c
          }, null)) : C("div", {
            class: "v-data-table-header__content"
          }, [C("span", null, [T.title]), T.sortable && !e.disableSort && p(ke, {
            key: "icon",
            class: "v-data-table-header__sort-icon",
            icon: y(T)
          }, null), e.multiSort && i(T) && C("div", {
            key: "badge",
            class: fe(["v-data-table-header__sort-badge", ...h.value]),
            style: Ve(g.value)
          }, [o.value.findIndex((ae) => ae.key === T.key) + 1])]);
        }
      });
    }, b = () => {
      const B = I(() => d.value.filter((E) => (E == null ? void 0 : E.sortable) && !e.disableSort)), T = I(() => {
        if (d.value.find((R) => R.key === "data-table-select") != null)
          return u.value ? "$checkboxOn" : s.value ? "$checkboxIndeterminate" : "$checkboxOff";
      });
      return p(da, L({
        tag: "th",
        class: [...w.value],
        colspan: m.value.length + 1
      }, e.headerProps), {
        default: () => [C("div", {
          class: "v-data-table-header__content"
        }, [p(kl, {
          chips: !0,
          class: "v-data-table__td-sort-select",
          clearable: !0,
          density: "default",
          items: B.value,
          label: a("$vuetify.dataTable.sortBy"),
          multiple: e.multiSort,
          variant: "underlined",
          "onClick:clear": () => o.value = [],
          appendIcon: T.value,
          "onClick:append": () => c(!u.value)
        }, {
          ...t,
          chip: (E) => {
            var R;
            return p(pl, {
              onClick: (R = E.item.raw) != null && R.sortable ? () => l(E.item.raw) : void 0,
              onMousedown: (F) => {
                F.preventDefault(), F.stopPropagation();
              }
            }, {
              default: () => [E.item.title, p(ke, {
                class: fe(["v-data-table__td-sort-icon", i(E.item.raw) && "v-data-table__td-sort-icon-active"]),
                icon: y(E.item.raw),
                size: "small"
              }, null)]
            });
          }
        })])]
      });
    };
    ie(() => k.value ? C("tr", null, [p(b, null, null)]) : C(J, null, [t.headers ? t.headers(S.value) : m.value.map((B, T) => C("tr", null, [B.map((E, R) => p(P, {
      column: E,
      x: R,
      y: T
    }, null))])), e.loading && C("tr", {
      class: "v-data-table-progress"
    }, [C("th", {
      colspan: d.value.length
    }, [p(ul, {
      name: "v-data-table-progress",
      absolute: !0,
      active: !0,
      color: typeof e.loading == "boolean" ? void 0 : e.loading,
      indeterminate: !0
    }, {
      default: t.loader
    })])])]));
  }
}), Lr = K({
  groupBy: {
    type: Array,
    default: () => []
  }
}, "DataTable-group"), Do = Symbol.for("vuetify:data-table-group");
function Lo(e) {
  return {
    groupBy: we(e, "groupBy")
  };
}
function No(e) {
  const {
    disableSort: n,
    groupBy: t,
    sortBy: a
  } = e, l = q(/* @__PURE__ */ new Set()), o = I(() => t.value.map((r) => ({
    ...r,
    order: r.order ?? !1
  })).concat(n != null && n.value ? [] : a.value));
  function i(r) {
    return l.value.has(r.id);
  }
  function s(r) {
    const d = new Set(l.value);
    i(r) ? d.delete(r.id) : d.add(r.id), l.value = d;
  }
  function u(r) {
    function d(m) {
      const v = [];
      for (const f of m.items)
        "type" in f && f.type === "group" ? v.push(...d(f)) : v.push(f);
      return [...new Set(v)];
    }
    return d({
      items: r
    });
  }
  const c = {
    sortByWithGroups: o,
    toggleGroup: s,
    opened: l,
    groupBy: t,
    extractRows: u,
    isGroupOpen: i
  };
  return ze(Do, c), c;
}
function Ho() {
  const e = ve(Do);
  if (!e) throw new Error("Missing group!");
  return e;
}
function Nr(e, n) {
  if (!e.length) return [];
  const t = /* @__PURE__ */ new Map();
  for (const a of e) {
    const l = la(a.raw, n);
    t.has(l) || t.set(l, []), t.get(l).push(a);
  }
  return t;
}
function zo(e, n) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "root";
  if (!n.length) return [];
  const l = Nr(e, n[0]), o = [], i = n.slice(1);
  return l.forEach((s, u) => {
    const c = n[0], r = `${a}_${c}_${u}`;
    o.push({
      depth: t,
      id: r,
      key: c,
      value: u,
      items: i.length ? zo(s, i, t + 1, r) : s,
      type: "group"
    });
  }), o;
}
function Wo(e, n) {
  const t = [];
  for (const a of e)
    "type" in a && a.type === "group" ? (a.value != null && t.push(a), (n.has(a.id) || a.value == null) && t.push(...Wo(a.items, n))) : t.push(a);
  return t;
}
function Uo(e, n, t) {
  return {
    flatItems: I(() => {
      if (!n.value.length) return e.value;
      const l = zo(e.value, n.value.map((o) => o.key));
      return Wo(l, t.value);
    })
  };
}
const Hr = K({
  item: {
    type: Object,
    required: !0
  }
}, "VDataTableGroupHeaderRow"), zr = ne()({
  name: "VDataTableGroupHeaderRow",
  props: Hr(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const {
      isGroupOpen: a,
      toggleGroup: l,
      extractRows: o
    } = Ho(), {
      isSelected: i,
      isSomeSelected: s,
      select: u
    } = Ca(), {
      columns: c
    } = Va(), r = I(() => o([e.item]));
    return () => C("tr", {
      class: "v-data-table-group-header-row",
      style: {
        "--v-data-table-group-header-row-depth": e.item.depth
      }
    }, [c.value.map((d) => {
      var m, v;
      if (d.key === "data-table-group") {
        const f = a(e.item) ? "$expand" : "$next", x = () => l(e.item);
        return ((m = t["data-table-group"]) == null ? void 0 : m.call(t, {
          item: e.item,
          count: r.value.length,
          props: {
            icon: f,
            onClick: x
          }
        })) ?? p(da, {
          class: "v-data-table-group-header-row__column"
        }, {
          default: () => [p(be, {
            size: "small",
            variant: "text",
            icon: f,
            onClick: x
          }, null), C("span", null, [e.item.value]), C("span", null, [Pe("("), r.value.length, Pe(")")])]
        });
      }
      if (d.key === "data-table-select") {
        const f = i(r.value), x = s(r.value) && !f, y = (h) => u(r.value, h);
        return ((v = t["data-table-select"]) == null ? void 0 : v.call(t, {
          props: {
            modelValue: f,
            indeterminate: x,
            "onUpdate:modelValue": y
          }
        })) ?? C("td", null, [p(pt, {
          modelValue: f,
          indeterminate: x,
          "onUpdate:modelValue": y
        }, null)]);
      }
      return C("td", null, null);
    })]);
  }
}), Wr = K({
  expandOnClick: Boolean,
  showExpand: Boolean,
  expanded: {
    type: Array,
    default: () => []
  }
}, "DataTable-expand"), Ko = Symbol.for("vuetify:datatable:expanded");
function Go(e) {
  const n = H(() => e.expandOnClick), t = we(e, "expanded", e.expanded, (s) => new Set(s), (s) => [...s.values()]);
  function a(s, u) {
    const c = new Set(t.value);
    u ? c.add(s.value) : c.delete(s.value), t.value = c;
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
  return ze(Ko, i), i;
}
function jo() {
  const e = ve(Ko);
  if (!e) throw new Error("foo");
  return e;
}
const Ur = K({
  index: Number,
  item: Object,
  cellProps: [Object, Function],
  onClick: Xe(),
  onContextmenu: Xe(),
  onDblclick: Xe(),
  ...Gt()
}, "VDataTableRow"), Kr = ne()({
  name: "VDataTableRow",
  props: Ur(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const {
      displayClasses: a,
      mobile: l
    } = mt(e, "v-data-table__tr"), {
      isSelected: o,
      toggleSelect: i,
      someSelected: s,
      allSelected: u,
      selectAll: c
    } = Ca(), {
      isExpanded: r,
      toggleExpand: d
    } = jo(), {
      toggleSort: m,
      sortBy: v,
      isSorted: f
    } = Ro(), {
      columns: x
    } = Va();
    ie(() => C("tr", {
      class: fe(["v-data-table__tr", {
        "v-data-table__tr--clickable": !!(e.onClick || e.onContextmenu || e.onDblclick)
      }, a.value]),
      onClick: e.onClick,
      onContextmenu: e.onContextmenu,
      onDblclick: e.onDblclick
    }, [e.item && x.value.map((y, h) => {
      const g = e.item, A = `item.${y.key}`, k = `header.${y.key}`, S = {
        index: e.index,
        item: g.raw,
        internalItem: g,
        value: la(g.columns, y.key),
        column: y,
        isSelected: o,
        toggleSelect: i,
        isExpanded: r,
        toggleExpand: d
      }, w = {
        column: y,
        selectAll: c,
        isSorted: f,
        toggleSort: m,
        sortBy: v.value,
        someSelected: s.value,
        allSelected: u.value,
        getSortIcon: () => ""
      }, P = typeof e.cellProps == "function" ? e.cellProps({
        index: S.index,
        item: S.item,
        internalItem: S.internalItem,
        value: S.value,
        column: y
      }) : e.cellProps, b = typeof y.cellProps == "function" ? y.cellProps({
        index: S.index,
        item: S.item,
        internalItem: S.internalItem,
        value: S.value
      }) : y.cellProps;
      return p(da, L({
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
          var T, E, R, F;
          if (y.key === "data-table-select")
            return ((T = t["item.data-table-select"]) == null ? void 0 : T.call(t, {
              ...S,
              props: {
                disabled: !g.selectable,
                modelValue: o([g]),
                onClick: Ie(() => i(g), ["stop"])
              }
            })) ?? p(pt, {
              disabled: !g.selectable,
              modelValue: o([g]),
              onClick: Ie((z) => i(g, e.index, z), ["stop"])
            }, null);
          if (y.key === "data-table-expand")
            return ((E = t["item.data-table-expand"]) == null ? void 0 : E.call(t, {
              ...S,
              props: {
                icon: r(g) ? "$collapse" : "$expand",
                size: "small",
                variant: "text",
                onClick: Ie(() => d(g), ["stop"])
              }
            })) ?? p(be, {
              icon: r(g) ? "$collapse" : "$expand",
              size: "small",
              variant: "text",
              onClick: Ie(() => d(g), ["stop"])
            }, null);
          if (t[A] && !l.value) return t[A](S);
          const B = Re(S.value);
          return l.value ? C(J, null, [C("div", {
            class: "v-data-table__td-title"
          }, [((R = t[k]) == null ? void 0 : R.call(t, w)) ?? y.title]), C("div", {
            class: "v-data-table__td-value"
          }, [((F = t[A]) == null ? void 0 : F.call(t, S)) ?? B])]) : B;
        }
      });
    })]));
  }
}), Yo = K({
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
  ...Gt()
}, "VDataTableRows"), fa = ne()({
  name: "VDataTableRows",
  inheritAttrs: !1,
  props: Yo(),
  setup(e, n) {
    let {
      attrs: t,
      slots: a
    } = n;
    const {
      columns: l
    } = Va(), {
      expandOnClick: o,
      toggleExpand: i,
      isExpanded: s
    } = jo(), {
      isSelected: u,
      toggleSelect: c
    } = Ca(), {
      toggleGroup: r,
      isGroupOpen: d
    } = Ho(), {
      t: m
    } = ot(), {
      mobile: v
    } = mt(e);
    return ie(() => {
      var f, x;
      return e.loading && (!e.items.length || a.loading) ? C("tr", {
        class: "v-data-table-rows-loading",
        key: "loading"
      }, [C("td", {
        colspan: l.value.length
      }, [((f = a.loading) == null ? void 0 : f.call(a)) ?? m(e.loadingText)])]) : !e.loading && !e.items.length && !e.hideNoData ? C("tr", {
        class: "v-data-table-rows-no-data",
        key: "no-data"
      }, [C("td", {
        colspan: l.value.length
      }, [((x = a["no-data"]) == null ? void 0 : x.call(a)) ?? m(e.noDataText)])]) : C(J, null, [e.items.map((y, h) => {
        var k;
        if (y.type === "group") {
          const S = {
            index: h,
            item: y,
            columns: l.value,
            isExpanded: s,
            toggleExpand: i,
            isSelected: u,
            toggleSelect: c,
            toggleGroup: r,
            isGroupOpen: d
          };
          return a["group-header"] ? a["group-header"](S) : p(zr, L({
            key: `group-header_${y.id}`,
            item: y
          }, Ll(t, ":group-header", () => S)), a);
        }
        const g = {
          index: h,
          item: y.raw,
          internalItem: y,
          columns: l.value,
          isExpanded: s,
          toggleExpand: i,
          isSelected: u,
          toggleSelect: c
        }, A = {
          ...g,
          props: L({
            key: `item_${y.key ?? y.index}`,
            onClick: o.value ? () => {
              i(y);
            } : void 0,
            index: h,
            item: y,
            cellProps: e.cellProps,
            mobile: v.value
          }, Ll(t, ":row", () => g), typeof e.rowProps == "function" ? e.rowProps({
            item: g.item,
            index: g.index,
            internalItem: g.internalItem
          }) : e.rowProps)
        };
        return C(J, {
          key: A.props.key
        }, [a.item ? a.item(A) : p(Kr, A.props, a), s(y) && ((k = a["expanded-row"]) == null ? void 0 : k.call(a, g))]);
      })]);
    }), {};
  }
}), qo = K({
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  height: [Number, String],
  hover: Boolean,
  ...Se(),
  ...ft(),
  ...Ue(),
  ...Le()
}, "VTable"), ma = ne()({
  name: "VTable",
  props: qo(),
  setup(e, n) {
    let {
      slots: t,
      emit: a
    } = n;
    const {
      themeClasses: l
    } = je(e), {
      densityClasses: o
    } = Bt(e);
    return ie(() => p(e.tag, {
      class: fe(["v-table", {
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
            height: ye(e.height)
          }
        }, [C("table", null, [t.default()])]) : (s = t.wrapper) == null ? void 0 : s.call(t), (u = t.bottom) == null ? void 0 : u.call(t)];
      }
    })), {};
  }
}), Gr = K({
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
function jr(e, n, t, a) {
  const l = e.returnObject ? n : St(n, e.itemValue), o = St(n, e.itemSelectable, !0), i = a.reduce((s, u) => (u.key != null && (s[u.key] = St(n, u.value)), s), {});
  return {
    type: "item",
    key: e.returnObject ? St(n, e.itemValue) : l,
    index: t,
    value: l,
    selectable: o,
    columns: i,
    raw: n
  };
}
function Yr(e, n, t) {
  return n.map((a, l) => jr(e, a, l, t));
}
function Xo(e, n) {
  return {
    items: I(() => Yr(e, e.items, n.value))
  };
}
function Zo(e) {
  let {
    page: n,
    itemsPerPage: t,
    sortBy: a,
    groupBy: l,
    search: o
  } = e;
  const i = lt("VDataTable"), s = () => ({
    page: n.value,
    itemsPerPage: t.value,
    sortBy: a.value,
    groupBy: l.value,
    search: o.value
  });
  let u = null;
  Q(s, (c) => {
    it(u, c) || (u && u.search !== c.search && (n.value = 1), i.emit("update:options", c), u = c);
  }, {
    deep: !0,
    immediate: !0
  });
}
const Qo = K({
  ...Yo(),
  hideDefaultBody: Boolean,
  hideDefaultFooter: Boolean,
  hideDefaultHeader: Boolean,
  width: [String, Number],
  search: String,
  ...Wr(),
  ...Lr(),
  ...Ar(),
  ...Gr(),
  ...Fr(),
  ...Rr(),
  ...Mo(),
  ...qo()
}, "DataTable"), qr = K({
  ...wo(),
  ...Qo(),
  ...yo(),
  ...Vl()
}, "VDataTable");
ne()({
  name: "VDataTable",
  props: qr(),
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
    } = Lo(e), {
      sortBy: o,
      multiSort: i,
      mustSort: s
    } = Oo(e), {
      page: u,
      itemsPerPage: c
    } = So(e), {
      disableSort: r
    } = tl(e), {
      columns: d,
      headers: m,
      sortFunctions: v,
      sortRawFunctions: f,
      filterFunctions: x
    } = Ao(e, {
      groupBy: l,
      showSelect: H(() => e.showSelect),
      showExpand: H(() => e.showExpand)
    }), {
      items: y
    } = Xo(e, d), h = H(() => e.search), {
      filteredItems: g
    } = ho(e, y, h, {
      transform: (X) => X.columns,
      customKeyFilter: x
    }), {
      toggleSort: A
    } = Fo({
      sortBy: o,
      multiSort: i,
      mustSort: s,
      page: u
    }), {
      sortByWithGroups: k,
      opened: S,
      extractRows: w,
      isGroupOpen: P,
      toggleGroup: b
    } = No({
      groupBy: l,
      sortBy: o,
      disableSort: r
    }), {
      sortedItems: B
    } = Mr(e, g, k, {
      transform: (X) => ({
        ...X.raw,
        ...X.columns
      }),
      sortFunctions: v,
      sortRawFunctions: f
    }), {
      flatItems: T
    } = Uo(B, l, S), E = I(() => T.value.length), {
      startIndex: R,
      stopIndex: F,
      pageCount: z,
      setItemsPerPage: W
    } = ko({
      page: u,
      itemsPerPage: c,
      itemsLength: E
    }), {
      paginatedItems: G
    } = Ir({
      items: T,
      startIndex: R,
      stopIndex: F,
      itemsPerPage: c
    }), te = I(() => w(G.value)), {
      isSelected: ae,
      select: ue,
      selectAll: _,
      toggleSelect: $,
      someSelected: O,
      allSelected: U
    } = Eo(e, {
      allItems: y,
      currentPage: te
    }), {
      isExpanded: he,
      toggleExpand: le
    } = Go(e);
    Zo({
      page: u,
      itemsPerPage: c,
      sortBy: o,
      groupBy: l,
      search: h
    }), at({
      VDataTableRows: {
        hideNoData: H(() => e.hideNoData),
        noDataText: H(() => e.noDataText),
        loading: H(() => e.loading),
        loadingText: H(() => e.loadingText)
      }
    });
    const se = I(() => ({
      page: u.value,
      itemsPerPage: c.value,
      sortBy: o.value,
      pageCount: z.value,
      toggleSort: A,
      setItemsPerPage: W,
      someSelected: O.value,
      allSelected: U.value,
      isSelected: ae,
      select: ue,
      selectAll: _,
      toggleSelect: $,
      isExpanded: he,
      toggleExpand: le,
      isGroupOpen: P,
      toggleGroup: b,
      items: te.value.map((X) => X.raw),
      internalItems: te.value,
      groupedItems: G.value,
      columns: d.value,
      headers: m.value
    }));
    return ie(() => {
      const X = ca.filterProps(e), re = va.filterProps(e), me = fa.filterProps(e), N = ma.filterProps(e);
      return p(ma, L({
        class: ["v-data-table", {
          "v-data-table--show-select": e.showSelect,
          "v-data-table--loading": e.loading
        }, e.class],
        style: e.style
      }, N, {
        fixedHeader: e.fixedHeader || e.sticky
      }), {
        top: () => {
          var Z;
          return (Z = a.top) == null ? void 0 : Z.call(a, se.value);
        },
        default: () => {
          var Z, ce, ge, Ce, Ee, De;
          return a.default ? a.default(se.value) : C(J, null, [(Z = a.colgroup) == null ? void 0 : Z.call(a, se.value), !e.hideDefaultHeader && C("thead", {
            key: "thead"
          }, [p(va, re, a)]), (ce = a.thead) == null ? void 0 : ce.call(a, se.value), !e.hideDefaultBody && C("tbody", null, [(ge = a["body.prepend"]) == null ? void 0 : ge.call(a, se.value), a.body ? a.body(se.value) : p(fa, L(t, me, {
            items: G.value
          }), a), (Ce = a["body.append"]) == null ? void 0 : Ce.call(a, se.value)]), (Ee = a.tbody) == null ? void 0 : Ee.call(a, se.value), (De = a.tfoot) == null ? void 0 : De.call(a, se.value)]);
        },
        bottom: () => a.bottom ? a.bottom(se.value) : !e.hideDefaultFooter && C(J, null, [p(Dt, null, null), p(ca, X, {
          prepend: a["footer.prepend"]
        })])
      });
    }), {};
  }
});
const Xr = K({
  itemsLength: {
    type: [Number, String],
    required: !0
  },
  ...wo(),
  ...Qo(),
  ...Vl()
}, "VDataTableServer"), Zr = ne()({
  name: "VDataTableServer",
  props: Xr(),
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
    } = Lo(e), {
      sortBy: o,
      multiSort: i,
      mustSort: s
    } = Oo(e), {
      page: u,
      itemsPerPage: c
    } = So(e), {
      disableSort: r
    } = tl(e), d = I(() => parseInt(e.itemsLength, 10)), {
      columns: m,
      headers: v
    } = Ao(e, {
      groupBy: l,
      showSelect: H(() => e.showSelect),
      showExpand: H(() => e.showExpand)
    }), {
      items: f
    } = Xo(e, m), {
      toggleSort: x
    } = Fo({
      sortBy: o,
      multiSort: i,
      mustSort: s,
      page: u
    }), {
      opened: y,
      isGroupOpen: h,
      toggleGroup: g,
      extractRows: A
    } = No({
      groupBy: l,
      sortBy: o,
      disableSort: r
    }), {
      pageCount: k,
      setItemsPerPage: S
    } = ko({
      page: u,
      itemsPerPage: c,
      itemsLength: d
    }), {
      flatItems: w
    } = Uo(f, l, y), {
      isSelected: P,
      select: b,
      selectAll: B,
      toggleSelect: T,
      someSelected: E,
      allSelected: R
    } = Eo(e, {
      allItems: f,
      currentPage: f
    }), {
      isExpanded: F,
      toggleExpand: z
    } = Go(e), W = I(() => A(f.value));
    Zo({
      page: u,
      itemsPerPage: c,
      sortBy: o,
      groupBy: l,
      search: H(() => e.search)
    }), ze("v-data-table", {
      toggleSort: x,
      sortBy: o
    }), at({
      VDataTableRows: {
        hideNoData: H(() => e.hideNoData),
        noDataText: H(() => e.noDataText),
        loading: H(() => e.loading),
        loadingText: H(() => e.loadingText)
      }
    });
    const G = I(() => ({
      page: u.value,
      itemsPerPage: c.value,
      sortBy: o.value,
      pageCount: k.value,
      toggleSort: x,
      setItemsPerPage: S,
      someSelected: E.value,
      allSelected: R.value,
      isSelected: P,
      select: b,
      selectAll: B,
      toggleSelect: T,
      isExpanded: F,
      toggleExpand: z,
      isGroupOpen: h,
      toggleGroup: g,
      items: W.value.map((te) => te.raw),
      internalItems: W.value,
      groupedItems: w.value,
      columns: m.value,
      headers: v.value
    }));
    ie(() => {
      const te = ca.filterProps(e), ae = va.filterProps(e), ue = fa.filterProps(e), _ = ma.filterProps(e);
      return p(ma, L({
        class: ["v-data-table", {
          "v-data-table--loading": e.loading
        }, e.class],
        style: e.style
      }, _, {
        fixedHeader: e.fixedHeader || e.sticky
      }), {
        top: () => {
          var $;
          return ($ = a.top) == null ? void 0 : $.call(a, G.value);
        },
        default: () => {
          var $, O, U, he, le, se;
          return a.default ? a.default(G.value) : C(J, null, [($ = a.colgroup) == null ? void 0 : $.call(a, G.value), !e.hideDefaultHeader && C("thead", {
            key: "thead",
            class: "v-data-table__thead",
            role: "rowgroup"
          }, [p(va, ae, a)]), (O = a.thead) == null ? void 0 : O.call(a, G.value), !e.hideDefaultBody && C("tbody", {
            class: "v-data-table__tbody",
            role: "rowgroup"
          }, [(U = a["body.prepend"]) == null ? void 0 : U.call(a, G.value), a.body ? a.body(G.value) : p(fa, L(t, ue, {
            items: w.value
          }), a), (he = a["body.append"]) == null ? void 0 : he.call(a, G.value)]), (le = a.tbody) == null ? void 0 : le.call(a, G.value), (se = a.tfoot) == null ? void 0 : se.call(a, G.value)]);
        },
        bottom: () => a.bottom ? a.bottom(G.value) : !e.hideDefaultFooter && C(J, null, [p(Dt, null, null), p(ca, te, {
          prepend: a["footer.prepend"]
        })])
      });
    });
  }
}), Jo = /* @__PURE__ */ Ge({
  __name: "OxListTable",
  props: {
    // list: Object,
    /** Table headers */
    headers: Array,
    /** If True, display edit/view button */
    edit: Boolean
  },
  setup(e) {
    const n = vt(), t = Xi(n, "item.", { exclude: ["item.actions"] }), a = ve("panel"), l = ve("list"), o = ve("items"), i = ve("user"), s = e, u = I(() => s.headers.reduce((d, m) => (d.push(
      typeof m == "string" ? { key: m, title: oe(Si.field(m)) } : { key: m.key, title: oe(m.title) }
    ), d), []));
    function c(d) {
      const m = {
        ...l.filters,
        page: d.page,
        page_size: d.itemsPerPage,
        ordering: d.sortBy.map(({ key: v, order: f }) => f == "asc" ? v : `-${v}`)
      };
      l.page_size = d.itemsPerPage, l.load({ params: m });
    }
    function r(d, m) {
      a.show({ view: "detail.edit", value: m });
    }
    return (d, m) => {
      var v;
      return D(), Y(Zr, {
        items: V(o),
        "item-index": "id",
        "items-length": V(l).count || V(o).length,
        "items-per-page": s.itemsPerPage,
        loading: (v = V(l).state) == null ? void 0 : v.isProcessing,
        headers: u.value,
        "no-data-text": V(oe)("lists.empty"),
        class: "align-top-table",
        "onUpdate:options": c
      }, kt({
        "item.actions": M(({ item: f }) => [
          s.edit && V(i).can([f.constructor, "change"], f) ? (D(), Y(oa, {
            key: 0,
            icon: "mdi-pencil",
            button: "",
            title: V(oe)("actions.edit"),
            item: f,
            run: r
          }, null, 8, ["title", "item"])) : s.edit && V(i).can([f.constructor, "view"], f) ? (D(), Y(oa, {
            key: 1,
            icon: "mdi-eye-outline",
            button: "",
            title: V(oe)("actions.view"),
            item: f,
            run: r
          }, null, 8, ["title", "item"])) : de("", !0),
          j(d.$slots, "item.actions", {
            value: f,
            dense: !0,
            button: !0
          })
        ]),
        _: 2
      }, [
        Me(V(t), (f, x) => ({
          name: x,
          fn: M((y) => [
            j(d.$slots, x, _e(Be(y)))
          ])
        }))
      ]), 1032, ["items", "items-length", "items-per-page", "loading", "headers", "no-data-text"]);
    };
  }
}), Pa = {
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
    const n = vt(), t = e;
    let a = q(!1);
    Q(() => t.state.state, (i) => {
      t.delay && i == Zi.PROCESSING && (a.value = !1, window.setTimeout(() => {
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
    return (i, s) => (D(), pe(J, null, [
      t.state.isNone && V(n).none ? (D(), Y(V($t), {
        key: 0,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        state: e.state,
        title: e.noneTitle
      }, {
        default: M(() => [
          j(i.$slots, "none", { state: e.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : l.value ? (D(), Y(V($t), {
        key: 1,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: e.state,
        title: e.processingTitle
      }, {
        default: M(() => [
          j(i.$slots, "processing", { state: e.state }, () => [
            s[0] || (s[0] = Pe(" Data are being sent to server, please be patient. If this message persist you might wan't to retry. "))
          ])
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isError ? (D(), Y(V($t), {
        key: 2,
        type: "error",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: e.state,
        title: e.errorTitle
      }, {
        default: M(() => [
          j(i.$slots, "error", { state: e.state }, () => [
            s[1] || (s[1] = Pe(" Oups... something wrong happened. "))
          ]),
          j(i.$slots, "error-detail", { state: e.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isOk ? (D(), Y(V($t), {
        key: 3,
        type: "success",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: e.state,
        title: e.okTitle
      }, {
        default: M(() => [
          j(i.$slots, "ok", { state: e.state }, () => [
            s[2] || (s[2] = C("p", null, "Congrats! Data have been updated.", -1))
          ]),
          o.value ? (D(), pe(J, { key: 0 }, [
            p(Dt),
            (D(!0), pe(J, null, Me(o.value, (u) => (D(), pe("p", null, Re(u), 1))), 256))
          ], 64)) : de("", !0),
          j(i.$slots, "ok-detail", { state: e.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : de("", !0),
      j(i.$slots, "default", {
        state: t.state
      })
    ], 64));
  }
}, Qr = { class: "text-right" }, Pl = {
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
    return (l, o) => (D(), pe("div", Qr, [
      p(be, {
        color: "error",
        class: "me-2",
        "prepend-icon": a.resetIcon,
        onClick: o[0] || (o[0] = (i) => t("reset")),
        disabled: a.disabled
      }, {
        default: M(() => [
          j(l.$slots, "discard", {}, () => [
            Pe(Re(a.resetLabel || V(Ba)("actions.discard")), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]),
      a.state.isSending || a.state.isProcessing ? (D(), Y(be, {
        key: 0,
        color: "primary",
        "prepend-icon": a.processingIcon,
        disabled: ""
      }, {
        default: M(() => [
          j(l.$slots, "processing", {}, () => [
            Pe(Re(a.processingLabel || V(Ba)("actions.saving")), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon"])) : (D(), Y(be, {
        key: 1,
        color: "primary",
        "prepend-icon": a.validateIcon,
        onClick: o[1] || (o[1] = (i) => t("validate")),
        disabled: a.disabled || a.validateDisabled
      }, {
        default: M(() => [
          j(l.$slots, "validate", {}, () => [
            Pe(Re(a.validateLabel || V(Ba)("actions.save")), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]))
    ]));
  }
}, Jr = { key: 0 }, ec = { class: "text-right mt-3" }, tc = {
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
    }), o = q(!1), i = Qe(new Qi());
    function s(c = !0) {
      es(l, { username: "", password: "" }), c && i.none();
    }
    async function u() {
      i.processing();
      try {
        const c = await fetch(a.url, {
          method: "POST",
          headers: Ji.axiosConfig.headers,
          body: JSON.stringify(l)
        });
        c.status == 200 ? (l.credentials = "", l.password = "", i.ok(await c.json()), a.next && (window.location.href = a.next)) : i.error(await c.json());
      } catch (c) {
        i.ok((c == null ? void 0 : c.message) || c);
      }
    }
    return (c, r) => (D(), pe(J, null, [
      p(V(Pa), { state: i }, {
        none: M(({ state: d }) => r[7] || (r[7] = [
          C("p", null, "Please enter your credentials in order too proceed...", -1)
        ])),
        "ok-detail": M(({ state: d }) => [
          a.next ? (D(), pe("p", Jr, [
            r[8] || (r[8] = Pe("You soon will be redirected to ")),
            C("i", null, Re(a.next), 1)
          ])) : de("", !0)
        ]),
        _: 1
      }, 8, ["state"]),
      i.isOk ? de("", !0) : (D(), pe(J, { key: 0 }, [
        p(rt, {
          variant: "underlined",
          label: "Enter login",
          modelValue: l.username,
          "onUpdate:modelValue": r[0] || (r[0] = (d) => l.username = d),
          onKeyup: r[1] || (r[1] = _l(Ie((d) => t.value.focus(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue"]),
        p(rt, {
          variant: "underlined",
          ref: "password",
          label: "Enter password",
          modelValue: l.password,
          "onUpdate:modelValue": r[2] || (r[2] = (d) => l.password = d),
          type: o.value ? "text" : "password",
          "append-icon": o.value ? "mdi-eye" : "mdi-eye-off",
          "onClick:append": r[3] || (r[3] = (d) => o.value = !o.value),
          onKeyup: r[4] || (r[4] = _l(Ie((d) => u(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue", "type", "append-icon"]),
        C("div", ec, [
          j(c.$slots, "default", {
            value: l.password
          }, () => [
            l.username && l.password ? (D(), Y(Pl, {
              key: 0,
              "validate-label": "Login!",
              onValidate: r[5] || (r[5] = (d) => u()),
              onReset: r[6] || (r[6] = (d) => s()),
              state: i
            }, null, 8, ["state"])) : de("", !0)
          ])
        ])
      ], 64))
    ], 64));
  }
}, ei = /* @__PURE__ */ Ge({
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
    const n = vt(), t = e, a = bt(n, "views."), l = q(!1);
    Ze(() => {
      l.value = !0;
    }), mi(() => {
      l.value = !1;
    });
    const o = ve("panels"), i = ve("panel");
    return (s, u) => (D(), pe(J, null, [
      t.state ? (D(), Y(Pa, {
        key: 0,
        state: t.state,
        delay: ""
      }, null, 8, ["state"])) : de("", !0),
      V(n).prepend && V(o).panel == V(i).name ? j(s.$slots, "prepend", { key: 1 }) : de("", !0),
      p(wn, { class: "ma-4" }, {
        default: M(() => [
          (D(), Y(Na, {
            to: "#app-bar-sheet-title",
            disabled: !l.value || V(o).panel != t.name
          }, [
            t.icon ? (D(), Y(ke, {
              key: 0,
              icon: t.icon
            }, null, 8, ["icon"])) : de("", !0),
            Pe(" " + Re(t.title) + " ", 1),
            j(s.$slots, "append-title")
          ], 8, ["disabled"])),
          (D(), Y(Na, {
            to: "#app-bar-right",
            disabled: !l.value || V(o).panel != t.name
          }, [
            j(s.$slots, "app-bar-right"),
            t.help ? (D(), Y(be, {
              key: 0,
              class: "ml-3",
              href: t.help,
              panels: "new",
              icon: "mdi-information-outline"
            }, null, 8, ["href"])) : de("", !0)
          ], 8, ["disabled"])),
          j(s.$slots, "top"),
          j(s.$slots, "default", {}, () => [
            V(a) ? (D(), Y(qa, {
              key: 0,
              modelValue: V(i).view,
              "onUpdate:modelValue": u[0] || (u[0] = (c) => V(i).view = c)
            }, {
              default: M(() => [
                (D(!0), pe(J, null, Me(V(a), (c, r) => (D(), Y(Xa, {
                  key: c,
                  value: c
                }, {
                  default: M(() => [
                    j(s.$slots, r)
                  ]),
                  _: 2
                }, 1032, ["value"]))), 128))
              ]),
              _: 3
            }, 8, ["modelValue"])) : de("", !0)
          ]),
          j(s.$slots, "bottom")
        ]),
        _: 3
      }),
      V(n).append && V(o).panel == V(i).name ? j(s.$slots, "append", { key: 2 }) : de("", !0)
    ], 64));
  }
}), ti = /* @__PURE__ */ Ge({
  __name: "OxView",
  props: {
    /** default tab title */
    title: String
  },
  setup(e) {
    const n = e, t = q(null), a = vt(), l = bt(a, "tab.", { exclude: ["tab.default"] }), o = bt(a, "window.");
    return (i, s) => V(l) && Object.keys(V(l)).length ? (D(), pe(J, { key: 0 }, [
      p(xu, {
        modelValue: t.value,
        "onUpdate:modelValue": s[0] || (s[0] = (u) => t.value = u)
      }, {
        default: M(() => [
          V(a).default ? j(i.$slots, "tab", { key: 0 }, () => [
            p(ja, {
              text: n == null ? void 0 : n.title,
              value: "default"
            }, null, 8, ["text"])
          ]) : de("", !0),
          (D(!0), pe(J, null, Me(V(l), (u, c) => (D(), Y(ja, { value: u }, {
            default: M(() => [
              j(i.$slots, c)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"]),
      p(yl, {
        modelValue: t.value,
        "onUpdate:modelValue": s[1] || (s[1] = (u) => t.value = u)
      }, {
        default: M(() => [
          V(a).default ? (D(), Y(ua, {
            key: 0,
            value: "default"
          }, {
            default: M(() => [
              j(i.$slots, "default")
            ]),
            _: 3
          })) : de("", !0),
          (D(!0), pe(J, null, Me(V(o), (u, c) => (D(), Y(ua, { value: u }, {
            default: M(() => [
              j(i.$slots, c)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"])
    ], 64)) : j(i.$slots, "default", { key: 1 });
  }
}), ai = /* @__PURE__ */ Ge({
  __name: "OxModelEditor",
  props: {
    repo: {},
    initial: {},
    name: {},
    url: {},
    saved: { type: Function }
  },
  setup(e, { expose: n }) {
    const t = q(null), a = ve("user"), l = e, { editor: o, edited: i } = ki({ props: l }), s = I(() => a.can([o.repo.use, "change", l.initial])), u = I(() => ({
      editor: o,
      edited: i.value,
      form: t.value,
      editable: s.value,
      disabled: !s.value,
      value: o.value,
      model: o.repo.use
    }));
    return Q(() => o.errors && Object.values(o.errors), () => t.value.validate()), n({ editor: o, edited: i, form: t, editable: s }), (c, r) => (D(), pe(J, null, [
      j(c.$slots, "prepend", _e(Be(u.value))),
      p(Za, {
        ref_key: "form",
        ref: t,
        modelValue: V(o).valid,
        "onUpdate:modelValue": r[0] || (r[0] = (d) => V(o).valid = d),
        disabled: !s.value
      }, {
        default: M(() => [
          j(c.$slots, "default", _e(Be(u.value)))
        ]),
        _: 3
      }, 8, ["modelValue", "disabled"]),
      j(c.$slots, "append", _e(Be(u.value)))
    ], 64));
  }
}), ac = {
  key: 0,
  class: "mb-3"
}, lc = /* @__PURE__ */ Ge({
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
    const a = t, l = e, o = q(null);
    function i() {
      o.value.editor.reset(l.initial);
    }
    async function s() {
      const u = o.value, c = l.sendFormData ? await u.editor.save(new FormData(u.form.$el)) : await u.editor.save();
      return a("saved", o.value.editor), c;
    }
    return n({ modelEditor: o, save: s, reset: i }), (u, c) => {
      var r;
      return D(), pe(J, null, [
        (r = o.value) != null && r.editor ? (D(), Y(Pa, {
          key: 0,
          state: o.value.editor.state
        }, null, 8, ["state"])) : de("", !0),
        p(Fi, { class: "ox-model-edit" }, {
          default: M(() => [
            p(V(ai), L({
              ref_key: "modelEditor",
              ref: o
            }, l), {
              prepend: M((d) => [
                l.hideValidationBtn ? de("", !0) : (D(), pe("div", ac, [
                  j(u.$slots, "prepend", L(d, {
                    save: s,
                    reset: i
                  }), () => [
                    d.editable && d.edited ? (D(), Y(Pl, {
                      key: 0,
                      onValidate: c[0] || (c[0] = (m) => s()),
                      onReset: c[1] || (c[1] = (m) => i()),
                      state: d.editor.state,
                      "validate-disabled": d.editor.valid === !1
                    }, null, 8, ["state", "validate-disabled"])) : de("", !0)
                  ])
                ]))
              ]),
              default: M((d) => [
                j(u.$slots, "default", L(d, {
                  save: s,
                  reset: i
                }))
              ]),
              append: M((d) => [
                j(u.$slots, "append", L(d, {
                  save: s,
                  reset: i
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
}), nc = /* @__PURE__ */ Ge({
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
  setup(e, { expose: n }) {
    const t = vt(), a = bt(t, "views.list."), l = bt(t, "item."), o = bt(t, "views.detail.edit."), i = I(() => !!Object.keys(o).length), s = sn("filters"), u = e, c = ve("context"), r = ve("user"), { panel: d, list: m, items: v, next: f, prev: x } = ve("panel") ?? Vi({ props: u }), y = d.panels;
    I(() => {
      var S;
      return c.user.can([d.model, (S = d.value) != null && S.id ? "change" : "add"]);
    });
    const { showFilters: h } = tl(d), g = I(() => [
      ...u.headers,
      { key: "actions", title: oe("actions") }
    ]);
    function A(S) {
      S = new u.repo.use(S), d.show({ view: d.view, value: S }), m.load();
    }
    const k = I(() => ({
      panel: d,
      panels: y,
      list: m,
      items: v,
      context: c,
      saved: A,
      value: d.value
    }));
    return Q(() => Object.values(m.filters), () => m.load()), n({ list: m, panel: d, items: v, next: f, prev: x }), (S, w) => (D(), Y(ei, {
      name: u.name,
      title: V(d).title,
      icon: V(d).icon,
      state: V(m).state,
      index: u.index
    }, kt({
      "app-bar-right": M(() => [
        j(S.$slots, "app-bar-right", _e(Be(k.value))),
        V(d).view.startsWith("list.") ? (D(), Y(Fl, {
          key: 0,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: M(() => [
            j(S.$slots, "nav.list", _e(Be(k.value))),
            p(be, {
              title: V(oe)("actions.list.reload"),
              "aria-label": V(oe)("actions.list.reload"),
              onClick: w[0] || (w[0] = (P) => V(m).load())
            }, {
              default: M(() => [
                p(ke, null, {
                  default: M(() => w[10] || (w[10] = [
                    Pe("mdi-reload")
                  ])),
                  _: 1,
                  __: [10]
                })
              ]),
              _: 1
            }, 8, ["title", "aria-label"]),
            s.value ? (D(), Y(be, {
              key: 0,
              title: V(h) ? V(oe)("filters.hide") : V(oe)("filters.show"),
              "aria-label": V(h) ? V(oe)("filters.hide") : V(oe)("filters.show"),
              onClick: w[1] || (w[1] = (P) => h.value = !V(h)),
              active: V(h)
            }, {
              default: M(() => [
                p(ke, {
                  icon: s.value.icon
                }, null, 8, ["icon"])
              ]),
              _: 1
            }, 8, ["title", "aria-label", "active"])) : de("", !0)
          ]),
          _: 3
        })) : V(d).view.startsWith("detail.") && V(d).value ? (D(), Y(Fl, {
          key: 1,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: M(() => [
            j(S.$slots, "nav.detail", _e(Be(k.value))),
            V(d).view == "detail.edit" && V(d).value ? (D(), Y(wl, { key: 0 }, {
              activator: M(({ props: P }) => [
                p(be, L({ "prepend-icon": "mdi-dots-vertical" }, P), {
                  default: M(() => [
                    Pe(Re(V(oe)("actions")), 1)
                  ]),
                  _: 2
                }, 1040)
              ]),
              default: M(() => [
                p(ut, null, {
                  default: M(() => [
                    j(S.$slots, "item.actions", {
                      value: V(d).value
                    })
                  ]),
                  _: 3
                })
              ]),
              _: 3
            })) : de("", !0),
            p(be, {
              disabled: !V(x),
              title: V(oe)("prev"),
              "aria-label": V(oe)("prev"),
              onClick: w[2] || (w[2] = Ie((P) => V(d).show({ view: V(d).view, value: V(x) }), ["stop"]))
            }, {
              default: M(() => [
                p(ke, { icon: "mdi-chevron-left" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"]),
            p(be, {
              disabled: !V(f),
              title: V(oe)("next"),
              "aria-label": V(oe)("next"),
              onClick: w[3] || (w[3] = Ie((P) => V(d).show({ view: V(d).view, value: V(f) }), ["stop"]))
            }, {
              default: M(() => [
                p(ke, { icon: "mdi-chevron-right" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"])
          ]),
          _: 3
        })) : de("", !0),
        p(Ri, {
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal",
          mandatory: "",
          modelValue: V(d).view,
          "onUpdate:modelValue": w[9] || (w[9] = (P) => V(d).view = P)
        }, {
          default: M(() => {
            var P;
            return [
              p(be, {
                value: "list.table",
                onClickCapture: w[4] || (w[4] = Ie((b) => V(d).show({ view: "list.table" }), ["stop"])),
                title: V(oe)("panels.nav.table"),
                "aria-label": V(oe)("panels.nav.table")
              }, {
                default: M(() => [
                  p(ke, null, {
                    default: M(() => w[11] || (w[11] = [
                      Pe("mdi-table")
                    ])),
                    _: 1,
                    __: [11]
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"]),
              V(t)["views.list.cards"] ? (D(), Y(be, {
                key: 0,
                value: "list.cards",
                onClickCapture: w[5] || (w[5] = Ie((b) => V(d).show({ view: "list.cards" }), ["stop"])),
                title: V(oe)("panels.nav.cards"),
                "aria-label": V(oe)("panels.nav.cards")
              }, {
                default: M(() => [
                  p(ke, null, {
                    default: M(() => w[12] || (w[12] = [
                      Pe("mdi-card-account-details")
                    ])),
                    _: 1,
                    __: [12]
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : de("", !0),
              V(t)["views.list.kanban"] ? (D(), Y(be, {
                key: 1,
                value: "list.kanban",
                onClickCapture: w[6] || (w[6] = Ie((b) => V(d).show({ view: "list.kanban" }), ["stop"])),
                title: V(oe)("panels.nav.kanban"),
                "aria-label": V(oe)("panels.nav.kanban")
              }, {
                default: M(() => [
                  p(ke, null, {
                    default: M(() => w[13] || (w[13] = [
                      Pe("mdi-view-column")
                    ])),
                    _: 1,
                    __: [13]
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : de("", !0),
              i.value ? (D(), Y(be, {
                key: 2,
                value: "detail.edit",
                onClickCapture: w[7] || (w[7] = Ie((b) => V(d).show({ view: "detail.edit", value: V(d).value }), ["stop"])),
                disabled: !((P = V(d).value) != null && P.id) && V(d).view != "detail.edit",
                title: V(oe)("panels.nav.edit"),
                "aria-label": V(oe)("panels.nav.edit")
              }, {
                default: M(() => [
                  V(r).can([V(d).model, "change"]) ? (D(), Y(ke, { key: 0 }, {
                    default: M(() => w[14] || (w[14] = [
                      Pe("mdi-pencil")
                    ])),
                    _: 1,
                    __: [14]
                  })) : (D(), Y(ke, { key: 1 }, {
                    default: M(() => w[15] || (w[15] = [
                      Pe("mdi-eye")
                    ])),
                    _: 1,
                    __: [15]
                  }))
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"])) : de("", !0),
              i.value && V(r).can([V(d).model, "add"]) ? (D(), Y(be, {
                key: 3,
                value: "detail.add",
                onClickCapture: w[8] || (w[8] = Ie((b) => V(d).create(), ["stop"])),
                title: V(oe)("panels.nav.add"),
                "aria-label": V(oe)("panels.nav.add")
              }, {
                default: M(() => [
                  p(ke, null, {
                    default: M(() => w[16] || (w[16] = [
                      Pe("mdi-plus-box")
                    ])),
                    _: 1,
                    __: [16]
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : de("", !0),
              j(S.$slots, "nav.views", _e(Be(k.value)))
            ];
          }),
          _: 3
        }, 8, ["modelValue"]),
        j(S.$slots, "app-bar-end", _e(Be(k.value)))
      ]),
      top: M(() => [
        u.warning ? (D(), Y($t, {
          key: 0,
          type: "warning",
          variant: "tonal",
          text: u.warning
        }, null, 8, ["text"])) : de("", !0),
        j(S.$slots, "top"),
        Ke(p(bo, {
          ref_key: "filters",
          ref: s,
          search: u.search,
          "teleport-to": "#panel-list-actions"
        }, {
          default: M((P) => [
            j(S.$slots, "list.filters", _e(Be(P)))
          ]),
          _: 3
        }, 8, ["search"]), [
          [Tt, V(d).view.startsWith("list.") && V(h)]
        ])
      ]),
      _: 2
    }, [
      V(t)["append-title"] ? {
        name: "append-title",
        fn: M(() => [
          j(S.$slots, "append-title", _e(Be(k.value)))
        ]),
        key: "0"
      } : void 0,
      V(t).prepend ? {
        name: "prepend",
        fn: M(() => [
          j(S.$slots, "prepend", _e(Be(k.value)))
        ]),
        key: "1"
      } : void 0,
      V(t).append ? {
        name: "append",
        fn: M(() => [
          j(S.$slots, "append", _e(Be(k.value)))
        ]),
        key: "2"
      } : void 0,
      V(t)["views.list.table"] ? void 0 : {
        name: "views.list.table",
        fn: M(() => [
          p(Jo, {
            headers: g.value,
            edit: i.value
          }, kt({ _: 2 }, [
            Me(V(l), (P, b) => ({
              name: b,
              fn: M((B) => [
                j(S.$slots, b, _e(Be(B)))
              ])
            }))
          ]), 1032, ["headers", "edit"])
        ]),
        key: "3"
      },
      Me(V(a), (P, b) => ({
        name: b,
        fn: M(() => [
          j(S.$slots, b, _e(Be(k.value)))
        ])
      })),
      i.value ? {
        name: "views.detail.edit",
        fn: M(() => [
          p(V(ti), {
            title: V(oe)(`models.${V(d).model.entity}`)
          }, kt({ _: 2 }, [
            Me(V(o), (P, b) => ({
              name: P,
              fn: M(() => [
                j(S.$slots, b, _e(Be(k.value)))
              ])
            }))
          ]), 1032, ["title"])
        ]),
        key: "4"
      } : void 0
    ]), 1032, ["name", "title", "icon", "state", "index"]));
  }
}), oc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OxAction: oa,
  OxActionModelDelete: fs,
  OxActions: ms,
  OxApp: ku,
  OxAutocomplete: or,
  OxComponent: ir,
  OxField: rr,
  OxFormList: vr,
  OxListFilters: bo,
  OxListKanban: kr,
  OxListTable: Jo,
  OxLogin: tc,
  OxModelEdit: lc,
  OxModelEditor: ai,
  OxModelPanel: nc,
  OxPanel: ei,
  OxStateAlert: Pa,
  OxValidationBtn: Pl,
  OxView: ti
}, Symbol.toStringTag, { value: "Module" })), fc = {
  el: "#app",
  delimiters: ["[[", "]]"],
  components: { ...oc, ...ts }
};
export {
  fc as App,
  oa as OxAction,
  fs as OxActionModelDelete,
  ms as OxActions,
  ku as OxApp,
  or as OxAutocomplete,
  ir as OxComponent,
  rr as OxField,
  vr as OxFormList,
  bo as OxListFilters,
  kr as OxListKanban,
  Jo as OxListTable,
  tc as OxLogin,
  lc as OxModelEdit,
  ai as OxModelEditor,
  nc as OxModelPanel,
  ei as OxPanel,
  Pa as OxStateAlert,
  Pl as OxValidationBtn,
  ti as OxView
};
//# sourceMappingURL=components.js.map
