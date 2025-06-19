import { inject as ve, computed as I, ref as q, reactive as Qe, toRef as H, shallowRef as ee, onMounted as Ze, provide as ze, useId as ct, onDeactivated as an, onActivated as ni, onBeforeUnmount as dt, createVNode as b, Transition as ea, mergeProps as L, defineComponent as Ge, useAttrs as ga, createElementBlock as pe, createCommentVNode as de, unref as V, openBlock as D, Fragment as J, createBlock as Y, withModifiers as Ie, useSlots as vt, renderSlot as j, normalizeProps as Be, guardReactiveProps as Ee, resolveComponent as ln, withCtx as M, createTextVNode as Pe, toDisplayString as Re, renderList as Me, watch as Q, watchEffect as et, onScopeDispose as We, readonly as nn, createElementVNode as C, nextTick as Ae, mergeModels as Qa, useModel as Ja, normalizeStyle as Ve, normalizeClass as fe, effectScope as on, toValue as Tl, toRaw as Da, warn as oi, Teleport as La, withDirectives as Ke, vShow as At, onErrorCaptured as ii, createSlots as kt, markRaw as si, onBeforeMount as ui, cloneVNode as ri, h as ci, vModelText as di, onBeforeUpdate as vi, capitalize as fi, toRefs as el, useTemplateRef as sn, withKeys as Al, onUnmounted as mi } from "vue";
import { useAction as gi, t as oe, filterSlots as bt, useAppContext as yi, usePanels as hi, useQuery as bi, defineAsyncComponent as pi, te as wi, rules as xi, tKeys as Si, useModelEditor as ki, useModelPanel as Vi } from "ox";
import { u as Vt, V as be, a as Ye, b as Ci, c as Na, d as Dt, e as ya, f as st, g as ha, h as Bt, i as un, j as ba, t as Pi, k as ie, l as pa, m as Fe, n as Ue, o as wt, p as Lt, q as Se, r as Nt, s as ut, v as Ii, w as rn, x as Ht, y as zt, z as Bl, A as Ia, B as Ta, C as El, D as _l, E as Wt, F as Ti, M as wa, G as cn, H as tl, I as Ut, J as dn, K as vn, L as al, N as Ai, O as Kt, P as ll, Q as nl, R as ol, S as $l, T as ke, U as fn, W as Et, X as ft, Y as Ct, Z as mn, _ as Bi, $ as gn, a0 as yn, a1 as Pt, a2 as hn, a3 as bn, a4 as il, a5 as sl, a6 as ul, a7 as ta, a8 as pn, a9 as Ei, aa as _i, ab as $i, ac as Oi, ad as wn, ae as $t, af as Fi, ag as Ol, ah as Ri } from "./VContainer-DbJPgM9n.js";
import { k as rl, l as xn, n as K, o as ye, q as lt, r as Mi, s as ne, C as Sn, u as qe, t as Je, v as Di, w as nt, x as je, y as mt, z as we, A as at, B as Le, E as Gt, F as kn, G as Li, H as it, J as Vn, i as He, K as Fl, M as It, N as Ni, O as gt, P as Cn, Q as ot, R as xe, S as Ha, U as Hi, V as Xe, W as xa, X as Ne, Y as cl, Z as Pn, _ as zi, $ as Wi, a0 as Aa, a1 as Ui, a2 as Ki, a3 as St, a4 as Gi, a5 as In, a6 as aa, a7 as ji, c as qt, a8 as Rl, a9 as Yi, aa as la, ab as Xt } from "./theme-BVAWnHOc.js";
import { Q as qi, l as Ml, N as Xi, E as Zi, t as Ba, S as Qi, o as Ji, r as es } from "./index-BcsriIRW.js";
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
function Tn(e) {
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
    if (rl(t)) {
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
    if (rl(t)) {
      const a = xn(t), l = Qt.get(e);
      l == null || l.forEach((o) => {
        const [i, s] = o;
        i === a && (e.removeEventListener(a, s), l.delete(o));
      });
    } else
      e.removeAttribute(t);
  });
}
function An(e) {
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
  return Object.keys(e).filter((a) => rl(a) && a.endsWith(n)).reduce((a, l) => (a[l.slice(0, -n.length)] = (o) => e[l](o, t(o)), a), {});
}
function Bn(e) {
  let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  for (; e; ) {
    if (n ? ss(e) : vl(e)) return e;
    e = e.parentElement;
  }
  return document.scrollingElement;
}
function na(e, n) {
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
const Ft = Symbol.for("vuetify:layout"), En = Symbol.for("vuetify:layout-item"), Nl = 1e3, rs = K({
  overlaps: {
    type: Array,
    default: () => []
  },
  fullHeight: Boolean
}, "layout"), _n = K({
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
  ze(En, {
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
    for (const h of P.filter((E) => E.includes(":"))) {
      const [E, A] = h.split(":");
      if (!a.value.includes(E) || !a.value.includes(A)) continue;
      const _ = l.get(E), R = l.get(A), F = o.get(E), z = o.get(A);
      !_ || !R || !F || !z || (w.set(A, {
        position: _.value,
        amount: parseInt(F.value, 10)
      }), w.set(E, {
        position: R.value,
        amount: -parseInt(z.value, 10)
      }));
    }
    return w;
  }), m = I(() => {
    const w = [...new Set([...i.values()].map((h) => h.value))].sort((h, E) => h - E), P = [];
    for (const h of w) {
      const E = a.value.filter((A) => {
        var _;
        return ((_ = i.get(A)) == null ? void 0 : _.value) === h;
      });
      P.push(...E);
    }
    return cs(P, l, o, s);
  }), v = I(() => !Array.from(u.values()).some((w) => w.value)), f = I(() => m.value[m.value.length - 1].layer), S = H(() => ({
    "--v-layout-left": ye(f.value.left),
    "--v-layout-right": ye(f.value.right),
    "--v-layout-top": ye(f.value.top),
    "--v-layout-bottom": ye(f.value.bottom),
    ...v.value ? void 0 : {
      transition: "none"
    }
  })), y = I(() => m.value.slice(1).map((w, P) => {
    let {
      id: h
    } = w;
    const {
      layer: E
    } = m.value[P], A = o.get(h), _ = l.get(h);
    return {
      id: h,
      ...E,
      size: Number(A.value),
      position: _.value
    };
  })), p = (w) => y.value.find((P) => P.id === w), g = lt("createLayout"), T = ee(!1);
  Ze(() => {
    T.value = !0;
  }), ze(Ft, {
    register: (w, P) => {
      let {
        id: h,
        order: E,
        position: A,
        layoutSize: _,
        elementSize: R,
        active: F,
        disableTransitions: z,
        absolute: W
      } = P;
      i.set(h, E), l.set(h, A), o.set(h, _), s.set(h, F), z && u.set(h, z);
      const te = Mi(En, g == null ? void 0 : g.vnode).indexOf(w);
      te > -1 ? a.value.splice(te, 0, h) : a.value.push(h);
      const ae = I(() => y.value.findIndex((O) => O.id === h)), ue = I(() => t.value + m.value.length * 2 - ae.value * 2), B = I(() => {
        const O = A.value === "left" || A.value === "right", U = A.value === "right", he = A.value === "bottom", le = R.value ?? _.value, se = le === 0 ? "%" : "px", X = {
          [A.value]: 0,
          zIndex: ue.value,
          transform: `translate${O ? "X" : "Y"}(${(F.value ? 0 : -(le === 0 ? 100 : le)) * (U || he ? -1 : 1)}${se})`,
          position: W.value || t.value !== Nl ? "absolute" : "fixed",
          ...v.value ? void 0 : {
            transition: "none"
          }
        };
        if (!T.value) return X;
        const re = y.value[ae.value];
        if (!re) throw new Error(`[Vuetify] Could not find layout item "${h}"`);
        const me = d.value.get(h);
        return me && (re[me.position] += me.amount), {
          ...X,
          height: O ? `calc(100% - ${re.top}px - ${re.bottom}px)` : R.value ? `${R.value}px` : void 0,
          left: U ? void 0 : `${re.left}px`,
          right: U ? `${re.right}px` : void 0,
          top: A.value !== "bottom" ? `${re.top}px` : void 0,
          bottom: A.value !== "top" ? `${re.bottom}px` : void 0,
          width: O ? R.value ? `${R.value}px` : void 0 : `calc(100% - ${re.left}px - ${re.right}px)`
        };
      }), $ = I(() => ({
        zIndex: ue.value - 1
      }));
      return {
        layoutItemStyles: B,
        layoutItemScrimStyles: $,
        zIndex: ue
      };
    },
    unregister: (w) => {
      i.delete(w), l.delete(w), o.delete(w), s.delete(w), u.delete(w), a.value = a.value.filter((P) => P !== w);
    },
    mainRect: f,
    mainStyles: S,
    getLayoutItem: p,
    items: y,
    layoutRect: r,
    rootZIndex: t
  });
  const k = H(() => ["v-layout", {
    "v-layout--full-height": e.fullHeight
  }]), x = H(() => ({
    zIndex: n ? t.value : void 0,
    position: n ? "relative" : void 0,
    overflow: n ? "hidden" : void 0
  }));
  return {
    layoutClasses: k,
    layoutStyles: x,
    getLayoutItem: p,
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
    return () => e.target ? b(ea, L({
      name: "dialog-transition"
    }, a, {
      css: !1
    }), t) : b(ea, {
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
  const t = Tn(e), a = dl(n), [l, o] = getComputedStyle(n).transformOrigin.split(" ").map((p) => parseFloat(p)), [i, s] = getComputedStyle(n).getPropertyValue("--v-overlay-anchor-origin").split(" ");
  let u = t.left + t.width / 2;
  i === "left" || s === "left" ? u -= t.width / 2 : (i === "right" || s === "right") && (u += t.width / 2);
  let c = t.top + t.height / 2;
  i === "top" || s === "top" ? c -= t.height / 2 : (i === "bottom" || s === "bottom") && (c += t.height / 2);
  const r = t.width / a.width, d = t.height / a.height, m = Math.max(1, r, d), v = r / m || 0, f = d / m || 0, S = a.width * a.height / (window.innerWidth * window.innerHeight), y = S > 0.12 ? Math.min(1.5, (S - 0.12) * 10 + 1) : 1;
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
      j(t.$slots, "before", Be(Ee(n))),
      j(t.$slots, "default", Be(Ee(n))),
      j(t.$slots, "after", Be(Ee(n)))
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
          b(Ci, null, {
            default: M(() => [
              Pe(Re(n.title), 1)
            ]),
            _: 1
          }),
          n.items ? (D(!0), pe(J, { key: 0 }, Me(n.items, (c) => (D(), Y(u, L({ ref_for: !0 }, c), null, 16))), 256)) : de("", !0)
        ], 64)) : n.type == "group" ? (D(), Y(Na, {
          key: 1,
          value: n.name
        }, {
          activator: M(({ props: c }) => [
            b(Ye, L(c, {
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
    }), window.addEventListener("touchmove", T, {
      passive: !1
    }), window.addEventListener("touchend", k, {
      passive: !0
    });
  }), dt(() => {
    window.removeEventListener("touchstart", g), window.removeEventListener("touchmove", T), window.removeEventListener("touchend", k);
  });
  const s = I(() => ["left", "right"].includes(i.value)), {
    addMovement: u,
    endTouch: c,
    getVelocity: r
  } = ps();
  let d = !1;
  const m = ee(!1), v = ee(0), f = ee(0);
  let S;
  function y(w, P) {
    return (i.value === "left" ? w : i.value === "right" ? document.documentElement.clientWidth - w : i.value === "top" ? w : i.value === "bottom" ? document.documentElement.clientHeight - w : xt()) - (P ? l.value : 0);
  }
  function p(w) {
    let P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    const h = i.value === "left" ? (w - f.value) / l.value : i.value === "right" ? (document.documentElement.clientWidth - w - f.value) / l.value : i.value === "top" ? (w - f.value) / l.value : i.value === "bottom" ? (document.documentElement.clientHeight - w - f.value) / l.value : xt();
    return P ? Je(h) : h;
  }
  function g(w) {
    if (o.value) return;
    const P = w.changedTouches[0].clientX, h = w.changedTouches[0].clientY, E = 25, A = i.value === "left" ? P < E : i.value === "right" ? P > document.documentElement.clientWidth - E : i.value === "top" ? h < E : i.value === "bottom" ? h > document.documentElement.clientHeight - E : xt(), _ = t.value && (i.value === "left" ? P < l.value : i.value === "right" ? P > document.documentElement.clientWidth - l.value : i.value === "top" ? h < l.value : i.value === "bottom" ? h > document.documentElement.clientHeight - l.value : xt());
    (A || _ || t.value && a.value) && (S = [P, h], f.value = y(s.value ? P : h, t.value), v.value = p(s.value ? P : h), d = f.value > -20 && f.value < 80, c(w), u(w));
  }
  function T(w) {
    const P = w.changedTouches[0].clientX, h = w.changedTouches[0].clientY;
    if (d) {
      if (!w.cancelable) {
        d = !1;
        return;
      }
      const A = Math.abs(P - S[0]), _ = Math.abs(h - S[1]);
      (s.value ? A > _ && A > 3 : _ > A && _ > 3) ? (m.value = !0, d = !1) : (s.value ? _ : A) > 3 && (d = !1);
    }
    if (!m.value) return;
    w.preventDefault(), u(w);
    const E = p(s.value ? P : h, !1);
    v.value = Math.max(0, Math.min(1, E)), E > 1 ? f.value = y(s.value ? P : h, !0) : E < 0 && (f.value = y(s.value ? P : h, !1));
  }
  function k(w) {
    if (d = !1, !m.value) return;
    u(w), m.value = !1;
    const P = r(w.changedTouches[0].identifier), h = Math.abs(P.x), E = Math.abs(P.y);
    (s.value ? h > E && h > 400 : E > h && E > 3) ? t.value = P.direction === ({
      left: "right",
      right: "left",
      top: "down",
      bottom: "up"
    }[i.value] || xt()) : t.value = v.value > 0.5;
  }
  const x = I(() => m.value ? {
    transform: i.value === "left" ? `translateX(calc(-100% + ${v.value * l.value}px))` : i.value === "right" ? `translateX(calc(100% - ${v.value * l.value}px))` : i.value === "top" ? `translateY(calc(-100% + ${v.value * l.value}px))` : i.value === "bottom" ? `translateY(calc(100% - ${v.value * l.value}px))` : xt(),
    transition: "none"
  } : void 0);
  return qe(m, () => {
    var h, E;
    const w = ((h = n.value) == null ? void 0 : h.style.transform) ?? null, P = ((E = n.value) == null ? void 0 : E.style.transition) ?? null;
    et(() => {
      var A, _, R, F;
      (_ = n.value) == null || _.style.setProperty("transform", ((A = x.value) == null ? void 0 : A.transform) || "none"), (F = n.value) == null || F.style.setProperty("transition", ((R = x.value) == null ? void 0 : R.transition) || null);
    }), We(() => {
      var A, _;
      (A = n.value) == null || A.style.setProperty("transform", w), (_ = n.value) == null || _.style.setProperty("transition", P);
    });
  }), {
    isDragging: m,
    dragProgress: v,
    dragStyles: x
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
  ..._n(),
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
    } = Bt(e), f = un(), S = we(e, "modelValue", null, (B) => !!B), {
      ssrBootStyles: y
    } = ba(), {
      scopeId: p
    } = jt(), g = q(), T = ee(!1), {
      runOpenDelay: k,
      runCloseDelay: x
    } = Mn(e, (B) => {
      T.value = B;
    }), w = I(() => e.rail && e.expandOnHover && T.value ? Number(e.width) : Number(e.rail ? e.railWidth : e.width)), P = I(() => Pi(e.location, o.value)), h = H(() => e.persistent), E = I(() => !e.permanent && (m.value || e.temporary)), A = I(() => e.sticky && !E.value && P.value !== "bottom");
    qe(() => e.expandOnHover && e.rail != null, () => {
      Q(T, (B) => a("update:rail", !B));
    }), qe(() => !e.disableResizeWatcher, () => {
      Q(E, (B) => !e.permanent && Ae(() => S.value = !B));
    }), qe(() => !e.disableRouteWatcher && !!f, () => {
      Q(f.currentRoute, () => E.value && (S.value = !1));
    }), Q(() => e.permanent, (B) => {
      B && (S.value = !0);
    }), e.modelValue == null && !E.value && (S.value = e.permanent || !m.value);
    const {
      isDragging: _,
      dragProgress: R
    } = xs({
      el: g,
      isActive: S,
      isTemporary: E,
      width: w,
      touchless: H(() => e.touchless),
      position: P
    }), F = I(() => {
      const B = E.value ? 0 : e.rail && e.expandOnHover ? Number(e.railWidth) : w.value;
      return _.value ? B * R.value : B;
    }), {
      layoutItemStyles: z,
      layoutItemScrimStyles: W
    } = On({
      id: e.name,
      order: I(() => parseInt(e.order, 10)),
      position: P,
      layoutSize: F,
      elementSize: w,
      active: nn(S),
      disableTransitions: H(() => _.value),
      absolute: I(() => (
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        e.absolute || A.value && typeof G.value != "string"
      ))
    }), {
      isStuck: G,
      stickyStyles: te
    } = ys({
      rootEl: g,
      isSticky: A,
      layoutItemStyles: z
    }), ae = st(() => typeof e.scrim == "string" ? e.scrim : null), ue = I(() => ({
      ..._.value ? {
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
      const B = l.image || e.image;
      return C(J, null, [b(e.tag, L({
        ref: g,
        onMouseenter: k,
        onMouseleave: x,
        class: ["v-navigation-drawer", `v-navigation-drawer--${P.value}`, {
          "v-navigation-drawer--expand-on-hover": e.expandOnHover,
          "v-navigation-drawer--floating": e.floating,
          "v-navigation-drawer--is-hovering": T.value,
          "v-navigation-drawer--rail": e.rail,
          "v-navigation-drawer--temporary": E.value,
          "v-navigation-drawer--persistent": h.value,
          "v-navigation-drawer--active": S.value,
          "v-navigation-drawer--sticky": A.value
        }, i.value, u.value, s.value, d.value, r.value, v.value, e.class],
        style: [c.value, z.value, y.value, te.value, e.style]
      }, p, t), {
        default: () => {
          var $, O, U;
          return [B && C("div", {
            key: "image",
            class: "v-navigation-drawer__img"
          }, [l.image ? b(Fe, {
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
          }, l.image) : b(pa, {
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
      }), b(ea, {
        name: "fade-transition"
      }, {
        default: () => [E.value && (_.value || S.value) && !!e.scrim && C("div", L({
          class: ["v-navigation-drawer__scrim", ae.backgroundColorClasses.value],
          style: [ue.value, ae.backgroundColorStyles.value],
          onClick: () => {
            h.value || (S.value = !1);
          }
        }, p), null)]
      })]);
    }), {
      isStuck: G
    };
  }
}), Cs = {
  __name: "OxAppNav",
  props: /* @__PURE__ */ Qa({
    items: Array
  }, {
    drawer: {},
    drawerModifiers: {}
  }),
  emits: ["update:drawer"],
  setup(e) {
    ve("context");
    const n = ve("panels"), t = Ja(e, "drawer"), a = q([]), l = e, o = I(() => (i(l.items), l.items));
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
        b(ut, null, {
          default: M(() => [
            j(u.$slots, "append")
          ]),
          _: 3
        })
      ]),
      default: M(() => [
        j(u.$slots, "prepend"),
        b(ut, {
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
      return b(e.tag, {
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
}), Ts = [null, "prominent", "default", "comfortable", "compact"], Nn = K({
  absolute: Boolean,
  collapse: Boolean,
  color: String,
  density: {
    type: String,
    default: "default",
    validator: (e) => Ts.includes(e)
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
}, "VToolbar"), za = ne()({
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
    } = Bt(e), {
      themeClasses: u
    } = je(e), {
      rtlClasses: c
    } = nt(), r = ee(!!(e.extended || (v = t.extension) != null && v.call(t))), d = I(() => parseInt(Number(e.height) + (e.density === "prominent" ? Number(e.height) : 0) - (e.density === "comfortable" ? 8 : 0) - (e.density === "compact" ? 16 : 0), 10)), m = I(() => r.value ? parseInt(Number(e.extensionHeight) + (e.density === "prominent" ? Number(e.extensionHeight) : 0) - (e.density === "comfortable" ? 4 : 0) - (e.density === "compact" ? 8 : 0), 10) : 0);
    return at({
      VBtn: {
        variant: "text"
      }
    }), ie(() => {
      var p;
      const f = !!(e.title || t.title), S = !!(t.image || e.image), y = (p = t.extension) == null ? void 0 : p.call(t);
      return r.value = !!(e.extended || y), b(e.tag, {
        class: fe(["v-toolbar", {
          "v-toolbar--absolute": e.absolute,
          "v-toolbar--collapse": e.collapse,
          "v-toolbar--flat": e.flat,
          "v-toolbar--floating": e.floating,
          [`v-toolbar--density-${e.density}`]: !0
        }, a.value, o.value, i.value, s.value, u.value, c.value, e.class]),
        style: Ve([l.value, e.style])
      }, {
        default: () => [S && C("div", {
          key: "image",
          class: "v-toolbar__image"
        }, [t.image ? b(Fe, {
          key: "image-defaults",
          disabled: !e.image,
          defaults: {
            VImg: {
              cover: !0,
              src: e.image
            }
          }
        }, t.image) : b(pa, {
          key: "image-img",
          cover: !0,
          src: e.image
        }, null)]), b(Fe, {
          defaults: {
            VTabs: {
              height: ye(d.value)
            }
          }
        }, {
          default: () => {
            var g, T, k;
            return [C("div", {
              class: "v-toolbar__content",
              style: {
                height: ye(d.value)
              }
            }, [t.prepend && C("div", {
              class: "v-toolbar__prepend"
            }, [(g = t.prepend) == null ? void 0 : g.call(t)]), f && b(Ln, {
              key: "title",
              text: e.title
            }, {
              text: t.title
            }), (T = t.default) == null ? void 0 : T.call(t), t.append && C("div", {
              class: "v-toolbar__append"
            }, [(k = t.append) == null ? void 0 : k.call(t)])])];
          }
        }), b(Fe, {
          defaults: {
            VTabs: {
              height: ye(m.value)
            }
          }
        }, {
          default: () => [b(Ii, null, {
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
}), As = K({
  scrollTarget: {
    type: String
  },
  scrollThreshold: {
    type: [String, Number],
    default: 300
  }
}, "scroll");
function Bs(e) {
  let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    canScroll: t
  } = n;
  let a = 0, l = 0;
  const o = q(null), i = ee(0), s = ee(0), u = ee(0), c = ee(!1), r = ee(!1), d = I(() => Number(e.scrollThreshold)), m = I(() => Je((d.value - i.value) / d.value || 0)), v = () => {
    const f = o.value;
    if (!f || t && !t.value) return;
    a = i.value, i.value = "window" in f ? f.pageYOffset : f.scrollTop;
    const S = f instanceof Window ? document.documentElement.scrollHeight : f.scrollHeight;
    if (l !== S) {
      l = S;
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
      const S = f ? document.querySelector(f) : window;
      if (!S) {
        kn(`Unable to locate element with identifier ${f}`);
        return;
      }
      S !== o.value && ((y = o.value) == null || y.removeEventListener("scroll", v), o.value = S, o.value.addEventListener("scroll", v, {
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
const Es = K({
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
  ..._n(),
  ...As(),
  height: {
    type: [Number, String],
    default: 64
  }
}, "VAppBar"), _s = ne()({
  name: "VAppBar",
  props: Es(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = q(), l = we(e, "modelValue"), o = I(() => {
      var T;
      const g = new Set(((T = e.scrollBehavior) == null ? void 0 : T.split(" ")) ?? []);
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
    } = Bs(e, {
      canScroll: i
    }), d = H(() => o.value.hide || o.value.fullyHide), m = I(() => e.collapse || o.value.collapse && (o.value.inverted ? r.value > 0 : r.value === 0)), v = I(() => e.flat || o.value.fullyHide && !l.value || o.value.elevate && (o.value.inverted ? s.value > 0 : s.value === 0)), f = I(() => o.value.fadeImage ? o.value.inverted ? 1 - r.value : r.value : void 0), S = I(() => {
      var k, x;
      if (o.value.hide && o.value.inverted) return 0;
      const g = ((k = a.value) == null ? void 0 : k.contentHeight) ?? 0, T = ((x = a.value) == null ? void 0 : x.extensionHeight) ?? 0;
      return d.value ? s.value < u.value || o.value.fullyHide ? g + T : g : g + T;
    });
    qe(() => !!e.scrollBehavior, () => {
      et(() => {
        d.value ? o.value.inverted ? l.value = s.value > u.value : l.value = c.value || s.value < u.value : l.value = !0;
      });
    });
    const {
      ssrBootStyles: y
    } = ba(), {
      layoutItemStyles: p
    } = On({
      id: e.name,
      order: I(() => parseInt(e.order, 10)),
      position: H(() => e.location),
      layoutSize: S,
      elementSize: ee(void 0),
      active: l,
      absolute: H(() => e.absolute)
    });
    return ie(() => {
      const g = za.filterProps(e);
      return b(za, L({
        ref: a,
        class: ["v-app-bar", {
          "v-app-bar--bottom": e.location === "bottom"
        }, e.class],
        style: [{
          ...p.value,
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
    return ie(() => b(be, L(e, {
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
    return ie(() => b(Ln, L(e, {
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
    return ie(() => b(e.tag, {
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
function _a(e, n) {
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
    return _a({
      x: l,
      y: o
    }, n);
  } else if (e.side === "left" || e.side === "right") {
    const {
      side: t,
      align: a
    } = e, l = t === "left" ? 0 : t === "right" ? n.width : t, o = a === "top" ? 0 : a === "center" ? n.height / 2 : a === "bottom" ? n.height : a;
    return _a({
      x: l,
      y: o
    }, n);
  }
  return _a({
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
  const t = dl(e);
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
    const p = Bl(n.location, e.isRtl.value), g = n.origin === "overlap" ? p : n.origin === "auto" ? Ia(p) : Bl(n.origin, e.isRtl.value);
    return p.side === g.side && p.align === Ta(g).align ? {
      preferredAnchor: El(p),
      preferredOrigin: El(g)
    } : {
      preferredAnchor: p,
      preferredOrigin: g
    };
  }), [i, s, u, c] = ["minWidth", "minHeight", "maxWidth", "maxHeight"].map((p) => I(() => {
    const g = parseFloat(n[p]);
    return isNaN(g) ? 1 / 0 : g;
  })), r = I(() => {
    if (Array.isArray(n.offset))
      return n.offset;
    if (typeof n.offset == "string") {
      const p = n.offset.split(" ").map(parseFloat);
      return p.length < 2 && p.push(0), p;
    }
    return typeof n.offset == "number" ? [n.offset, 0] : [0, 0];
  });
  let d = !1, m = -1;
  const v = new Sn(4), f = new ResizeObserver(() => {
    if (!d) return;
    if (requestAnimationFrame((g) => {
      g !== m && v.clear(), requestAnimationFrame((T) => {
        m = T;
      });
    }), v.isFull) {
      const g = v.values();
      if (it(g.at(-1), g.at(-3)))
        return;
    }
    const p = y();
    p && v.push(p.flipped);
  });
  Q([e.target, e.contentEl], (p, g) => {
    let [T, k] = p, [x, w] = g;
    x && !Array.isArray(x) && f.unobserve(x), T && !Array.isArray(T) && f.observe(T), w && f.unobserve(w), k && f.observe(k);
  }, {
    immediate: !0
  }), We(() => {
    f.disconnect();
  });
  let S = new tt({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  function y() {
    if (d = !1, requestAnimationFrame(() => d = !0), !e.target.value || !e.contentEl.value) return;
    (Array.isArray(e.target.value) || e.target.value.offsetParent || e.target.value.getClientRects().length) && (S = Tn(e.target.value));
    const p = Ns(e.contentEl.value, e.isRtl.value), g = na(e.contentEl.value), T = 12;
    g.length || (g.push(document.documentElement), e.contentEl.value.style.top && e.contentEl.value.style.left || (p.x -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0), p.y -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0)));
    const k = g.reduce((F, z) => {
      const W = as(z);
      return F ? new tt({
        x: Math.max(F.left, W.left),
        y: Math.max(F.top, W.top),
        width: Math.min(F.right, W.right) - Math.max(F.left, W.left),
        height: Math.min(F.bottom, W.bottom) - Math.max(F.top, W.top)
      }) : W;
    }, void 0);
    k.x += T, k.y += T, k.width -= T * 2, k.height -= T * 2;
    let x = {
      anchor: l.value,
      origin: o.value
    };
    function w(F) {
      const z = new tt(p), W = Gl(F.anchor, S), G = Gl(F.origin, z);
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
    let P = 0, h = 0;
    const E = {
      x: 0,
      y: 0
    }, A = {
      x: !1,
      y: !1
    };
    let _ = -1;
    for (; ; ) {
      if (_++ > 10) {
        Vn("Infinite loop detected in connectedLocationStrategy");
        break;
      }
      const {
        x: F,
        y: z,
        overflows: W
      } = w(x);
      P += F, h += z, p.x += F, p.y += z;
      {
        const G = _l(x.anchor), te = W.x.before || W.x.after, ae = W.y.before || W.y.after;
        let ue = !1;
        if (["x", "y"].forEach((B) => {
          if (B === "x" && te && !A.x || B === "y" && ae && !A.y) {
            const $ = {
              anchor: {
                ...x.anchor
              },
              origin: {
                ...x.origin
              }
            }, O = B === "x" ? G === "y" ? Ta : Ia : G === "y" ? Ia : Ta;
            $.anchor = O($.anchor), $.origin = O($.origin);
            const {
              overflows: U
            } = w($);
            (U[B].before <= W[B].before && U[B].after <= W[B].after || U[B].before + U[B].after < (W[B].before + W[B].after) / 2) && (x = $, ue = A[B] = !0);
          }
        }), ue) continue;
      }
      W.x.before && (P += W.x.before, p.x += W.x.before), W.x.after && (P -= W.x.after, p.x -= W.x.after), W.y.before && (h += W.y.before, p.y += W.y.before), W.y.after && (h -= W.y.after, p.y -= W.y.after);
      {
        const G = Dl(p, k);
        E.x = k.width - G.x.before - G.x.after, E.y = k.height - G.y.before - G.y.after, P += G.x.before, p.x += G.x.before, h += G.y.before, p.y += G.y.before;
      }
      break;
    }
    const R = _l(x.anchor);
    return Object.assign(t.value, {
      "--v-overlay-anchor-origin": `${x.anchor.side} ${x.anchor.align}`,
      transformOrigin: `${x.origin.side} ${x.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: ye($a(h)),
      left: e.isRtl.value ? void 0 : ye($a(P)),
      right: e.isRtl.value ? ye($a(-P)) : void 0,
      minWidth: ye(R === "y" ? Math.min(i.value, S.width) : i.value),
      maxWidth: ye(jl(Je(E.x, i.value === 1 / 0 ? 0 : i.value, u.value))),
      maxHeight: ye(jl(Je(E.y, s.value === 1 / 0 ? 0 : s.value, c.value)))
    }), {
      available: E,
      contentBox: p,
      flipped: A
    };
  }
  return Q(() => [l.value, o.value, n.offset, n.minWidth, n.minHeight, n.maxWidth, n.maxHeight], () => y()), Ae(() => {
    const p = y();
    if (!p) return;
    const {
      available: g,
      contentBox: T
    } = p;
    T.height > g.y && requestAnimationFrame(() => {
      y(), requestAnimationFrame(() => {
        y();
      });
    });
  }), {
    updateLocation: y
  };
}
function $a(e) {
  return Math.round(e * devicePixelRatio) / devicePixelRatio;
}
function jl(e) {
  return Math.ceil(e * devicePixelRatio) / devicePixelRatio;
}
let Wa = !0;
const ia = [];
function zs(e) {
  !Wa || ia.length ? (ia.push(e), Ua()) : (Wa = !1, e(), Ua());
}
let Yl = -1;
function Ua() {
  cancelAnimationFrame(Yl), Yl = requestAnimationFrame(() => {
    const e = ia.shift();
    e && e(), ia.length ? Ua() : Wa = !0;
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
  const t = (i = e.root.value) == null ? void 0 : i.offsetParent, a = [.../* @__PURE__ */ new Set([...na(e.targetEl.value, n.contained ? t : void 0), ...na(e.contentEl.value, n.contained ? t : void 0)])].filter((s) => !s.classList.contains("v-overlay-scroll-blocked")), l = window.innerWidth - document.documentElement.offsetWidth, o = ((s) => vl(s) && s)(t || document.documentElement);
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
const Ka = Symbol.for("vuetify:v-menu"), Ys = K({
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
  } = Mn(e, (h) => {
    h === (e.openOnHover && s || r.value && u) && !(e.openOnHover && t.value && !a.value) && (t.value !== h && (c = !0), t.value = h);
  }), f = q(), S = {
    onClick: (h) => {
      h.stopPropagation(), i.value = h.currentTarget || h.target, t.value || (f.value = [h.clientX, h.clientY]), t.value = !t.value;
    },
    onMouseenter: (h) => {
      var E;
      (E = h.sourceCapabilities) != null && E.firesTouchEvents || (s = !0, i.value = h.currentTarget || h.target, m());
    },
    onMouseleave: (h) => {
      s = !1, v();
    },
    onFocus: (h) => {
      It(h.target, ":focus-visible") !== !1 && (u = !0, h.stopPropagation(), i.value = h.currentTarget || h.target, m());
    },
    onBlur: (h) => {
      u = !1, h.stopPropagation(), v();
    }
  }, y = I(() => {
    const h = {};
    return d.value && (h.onClick = S.onClick), e.openOnHover && (h.onMouseenter = S.onMouseenter, h.onMouseleave = S.onMouseleave), r.value && (h.onFocus = S.onFocus, h.onBlur = S.onBlur), h;
  }), p = I(() => {
    const h = {};
    if (e.openOnHover && (h.onMouseenter = () => {
      s = !0, m();
    }, h.onMouseleave = () => {
      s = !1, v();
    }), r.value && (h.onFocusin = () => {
      u = !0, m();
    }, h.onFocusout = () => {
      u = !1, v();
    }), e.closeOnContentClick) {
      const E = ve(Ka, null);
      h.onClick = () => {
        t.value = !1, E == null || E.closeParents();
      };
    }
    return h;
  }), g = I(() => {
    const h = {};
    return e.openOnHover && (h.onMouseenter = () => {
      c && (s = !0, c = !1, m());
    }, h.onMouseleave = () => {
      s = !1, v();
    }), h;
  });
  Q(a, (h) => {
    var E;
    h && (e.openOnHover && !s && (!r.value || !u) || r.value && !u && (!e.openOnHover || !s)) && !((E = l.value) != null && E.contains(document.activeElement)) && (t.value = !1);
  }), Q(t, (h) => {
    h || setTimeout(() => {
      f.value = void 0;
    });
  }, {
    flush: "post"
  });
  const T = Fl();
  et(() => {
    T.value && Ae(() => {
      i.value = T.el;
    });
  });
  const k = Fl(), x = I(() => e.target === "cursor" && f.value ? f.value : k.value ? k.el : Un(e.target, o) || i.value), w = I(() => Array.isArray(x.value) ? void 0 : x.value);
  let P;
  return Q(() => !!e.activator, (h) => {
    h && He ? (P = on(), P.run(() => {
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
    activatorRef: T,
    target: x,
    targetEl: w,
    targetRef: k,
    activatorEvents: y,
    contentEvents: p,
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
    u && Ae(() => o());
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
const ql = Symbol.for("vuetify:stack"), _t = Qe([]);
function Qs(e, n, t) {
  const a = lt("useStack"), l = !t, o = ve(ql, void 0), i = Qe({
    activeChildren: /* @__PURE__ */ new Set()
  });
  ze(ql, i);
  const s = ee(Number(Tl(n)));
  qe(e, () => {
    var d;
    const r = (d = _t.at(-1)) == null ? void 0 : d[1];
    s.value = r ? r + 10 : Number(Tl(n)), l && _t.push([a.uid, s.value]), o == null || o.activeChildren.add(a.uid), We(() => {
      if (l) {
        const m = Da(_t).findIndex((v) => v[0] === a.uid);
        _t.splice(m, 1);
      }
      o == null || o.activeChildren.delete(a.uid);
    });
  });
  const u = ee(!0);
  l && et(() => {
    var d;
    const r = ((d = _t.at(-1)) == null ? void 0 : d[0]) === a.uid;
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
  const a = An(n);
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
  const t = An(e);
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
  return b(ea, {
    name: "fade-transition",
    appear: !0
  }, {
    default: () => [e.modelValue && C("div", L({
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
      onAfterLeave: S
    } = Gn(e, r), y = st(() => typeof e.scrim == "string" ? e.scrim : null), {
      globalTop: p,
      localTop: g,
      stackStyles: T
    } = Qs(r, () => e.zIndex, e._disableGlobalStack), {
      activatorEl: k,
      activatorRef: x,
      target: w,
      targetEl: P,
      targetRef: h,
      activatorEvents: E,
      contentEvents: A,
      scrimEvents: _
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
      return r.value && p.value && // If using scrim, only close if clicking on it rather than anything opened on top
      (!e.scrim || X.target === s.value || X instanceof MouseEvent && X.shadowTarget === s.value);
    }
    He && Q(r, (X) => {
      X ? window.addEventListener("keydown", B) : window.removeEventListener("keydown", B);
    }, {
      immediate: !0
    }), dt(() => {
      He && window.removeEventListener("keydown", B);
    });
    function B(X) {
      var re, me, N;
      X.key === "Escape" && p.value && ((re = u.value) != null && re.contains(document.activeElement) || l("keydown", X), e.persistent ? he() : (r.value = !1, (me = u.value) != null && me.contains(document.activeElement) && ((N = k.value) == null || N.focus())));
    }
    function $(X) {
      X.key === "Escape" && !p.value || l("keydown", X);
    }
    const O = un();
    qe(() => e.closeOnBack, () => {
      Ti(O, (X) => {
        p.value && r.value ? (X(!1), e.persistent ? he() : r.value = !1) : X();
      });
    });
    const U = q();
    Q(() => r.value && (e.absolute || e.contained) && R.value == null, (X) => {
      if (X) {
        const re = Bn(i.value);
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
      S(), l("afterLeave");
    }
    return ie(() => {
      var X;
      return C(J, null, [(X = t.activator) == null ? void 0 : X.call(t, {
        isActive: r.value,
        targetRef: h,
        props: L({
          ref: x
        }, E.value, e.activatorProps)
      }), z.value && f.value && b(La, {
        disabled: !R.value,
        to: R.value
      }, {
        default: () => [C("div", L({
          class: ["v-overlay", {
            "v-overlay--absolute": e.absolute || e.contained,
            "v-overlay--active": r.value,
            "v-overlay--contained": e.contained
          }, d.value, m.value, e.class],
          style: [T.value, {
            "--v-overlay-opacity": e.opacity,
            top: ye(U.value)
          }, e.style],
          ref: i,
          onKeydown: $
        }, W, a), [b(au, L({
          color: y,
          modelValue: r.value && !!e.scrim,
          ref: s
        }, _.value), null), b(wa, {
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
            }, A.value, e.contentProps), [(re = t.default) == null ? void 0 : re.call(t, {
              isActive: r
            })]), [[At, r.value], [Zl, {
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
      globalTop: p,
      localTop: g,
      updateLocation: te
    };
  }
}), Oa = Symbol("Forwarded refs");
function Fa(e, n) {
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
  return e[Oa] = t, new Proxy(e, {
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
          const c = Fa(u.value, o) ?? ("_" in u.value ? Fa((s = u.value._) == null ? void 0 : s.setupState, o) : void 0);
          if (c) return c;
        }
        for (const u of t) {
          const c = u.value && u.value[Oa];
          if (!c) continue;
          const r = c.slice();
          for (; r.length; ) {
            const d = r.shift(), m = Fa(d.value, o);
            if (m) return m;
            const v = d.value && d.value[Oa];
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
    a(), Ae(() => n.value = e());
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
  ...gt(fl({
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
    } = tl(e), {
      roundedClasses: r
    } = Bt(e), d = lu(() => Number(e.timeout)), m = q(), v = q(), f = ee(!1), S = ee(0), y = q(), p = ve(Ft, void 0);
    qe(() => !!p, () => {
      const _ = $n();
      et(() => {
        y.value = _.mainStyles.value;
      });
    }), Q(a, T), Q(() => e.timeout, T), Ze(() => {
      a.value && T();
    });
    let g = -1;
    function T() {
      d.reset(), window.clearTimeout(g);
      const _ = Number(e.timeout);
      if (!a.value || _ === -1) return;
      const R = Ni(v.value);
      d.start(R), g = window.setTimeout(() => {
        a.value = !1;
      }, _);
    }
    function k() {
      d.reset(), window.clearTimeout(g);
    }
    function x() {
      f.value = !0, k();
    }
    function w() {
      f.value = !1, T();
    }
    function P(_) {
      S.value = _.touches[0].clientY;
    }
    function h(_) {
      Math.abs(S.value - _.changedTouches[0].clientY) > 50 && (a.value = !1);
    }
    function E() {
      f.value && w();
    }
    const A = I(() => e.location.split(" ").reduce((_, R) => (_[`v-snackbar--${R}`] = !0, _), {}));
    return ie(() => {
      const _ = sa.filterProps(e), R = !!(t.default || t.text || e.text);
      return b(sa, L({
        ref: m,
        class: ["v-snackbar", {
          "v-snackbar--active": a.value,
          "v-snackbar--multi-line": e.multiLine && !e.vertical,
          "v-snackbar--timer": !!e.timer,
          "v-snackbar--vertical": e.vertical
        }, A.value, l.value, e.class],
        style: [y.value, e.style]
      }, _, {
        modelValue: a.value,
        "onUpdate:modelValue": (F) => a.value = F,
        contentProps: L({
          class: ["v-snackbar__wrapper", i.value, s.value, r.value, c.value],
          style: [u.value],
          onPointerenter: x,
          onPointerleave: w
        }, _.contentProps),
        persistent: !0,
        noClickAnimation: !0,
        scrim: !1,
        scrollStrategy: "none",
        _disableGlobalStack: !0,
        onTouchstartPassive: P,
        onTouchend: h,
        onAfterLeave: E
      }, o), {
        default: () => {
          var F, z;
          return [al(!1, "v-snackbar"), e.timer && !f.value && C("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [b(Ai, {
            ref: v,
            color: typeof e.timer == "string" ? e.timer : "info",
            max: e.timeout,
            "model-value": d.time.value
          }, null)]), R && C("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((F = t.text) == null ? void 0 : F.call(t)) ?? e.text, (z = t.default) == null ? void 0 : z.call(t)]), t.actions && b(Fe, {
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
}), ml = Symbol.for("vuetify:v-tabs"), iu = K({
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
}, "VTab"), Ga = ne()({
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
        const S = (f = (v = i.value) == null ? void 0 : v.$el.parentElement) == null ? void 0 : f.querySelector(".v-tab--selected .v-tab__slider"), y = s.value;
        if (!S || !y) return;
        const p = getComputedStyle(S).color, g = S.getBoundingClientRect(), T = y.getBoundingClientRect(), k = u.value ? "x" : "y", x = u.value ? "X" : "Y", w = u.value ? "right" : "bottom", P = u.value ? "width" : "height", h = g[k], E = T[k], A = h > E ? g[w] - T[w] : g[k] - T[k], _ = Math.sign(A) > 0 ? u.value ? "right" : "bottom" : Math.sign(A) < 0 ? u.value ? "left" : "top" : "center", F = (Math.abs(A) + (Math.sign(A) < 0 ? g[P] : T[P])) / Math.max(g[P], T[P]) || 0, z = g[P] / T[P] || 0, W = 1.5;
        ht(y, {
          backgroundColor: [p, "currentcolor"],
          transform: [`translate${x}(${A}px) scale${x}(${z})`, `translate${x}(${A / W}px) scale${x}(${(F - 1) / W + 1})`, "none"],
          transformOrigin: Array(3).fill(_)
        }, {
          duration: 225,
          easing: Ot
        });
      }
    }
    return ie(() => {
      const d = be.filterProps(e);
      return b(be, L({
        symbol: ml,
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
const ja = {
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
}, "VWindow"), Ya = ne()({
  name: "VWindow",
  directives: {
    vTouch: ja
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
    } = ot(), i = ll(e, Xn), s = q(), u = I(() => l.value ? !e.reverse : e.reverse), c = ee(!1), r = I(() => {
      const k = e.direction === "vertical" ? "y" : "x", w = (u.value ? !c.value : c.value) ? "-reverse" : "";
      return `v-window-${k}${w}-transition`;
    }), d = ee(0), m = q(void 0), v = I(() => i.items.value.findIndex((k) => i.selected.value.includes(k.id)));
    Q(v, (k, x) => {
      const w = i.items.value.length, P = w - 1;
      w <= 2 ? c.value = k < x : k === P && x === 0 ? c.value = !0 : k === 0 && x === P ? c.value = !1 : c.value = k < x;
    }), ze(qn, {
      transition: r,
      isReversed: c,
      transitionCount: d,
      transitionHeight: m,
      rootRef: s
    });
    const f = H(() => e.continuous || v.value !== 0), S = H(() => e.continuous || v.value !== i.items.value.length - 1);
    function y() {
      f.value && i.prev();
    }
    function p() {
      S.value && i.next();
    }
    const g = I(() => {
      const k = [], x = {
        icon: l.value ? e.nextIcon : e.prevIcon,
        class: `v-window__${u.value ? "right" : "left"}`,
        onClick: i.prev,
        "aria-label": o("$vuetify.carousel.prev")
      };
      k.push(f.value ? t.prev ? t.prev({
        props: x
      }) : b(be, x, null) : C("div", null, null));
      const w = {
        icon: l.value ? e.prevIcon : e.nextIcon,
        class: `v-window__${u.value ? "left" : "right"}`,
        onClick: i.next,
        "aria-label": o("$vuetify.carousel.next")
      };
      return k.push(S.value ? t.next ? t.next({
        props: w
      }) : b(be, w, null) : C("div", null, null)), k;
    }), T = I(() => e.touch === !1 ? e.touch : {
      ...{
        left: () => {
          u.value ? y() : p();
        },
        right: () => {
          u.value ? p() : y();
        },
        start: (x) => {
          let {
            originalEvent: w
          } = x;
          w.stopPropagation();
        }
      },
      ...e.touch === !0 ? {} : e.touch
    });
    return ie(() => Ke(b(e.tag, {
      ref: s,
      class: fe(["v-window", {
        "v-window--show-arrows-on-hover": e.showArrows === "hover"
      }, a.value, e.class]),
      style: Ve(e.style)
    }, {
      default: () => {
        var k, x;
        return [C("div", {
          class: "v-window__container",
          style: {
            height: m.value
          }
        }, [(k = t.default) == null ? void 0 : k.call(t, {
          group: i
        }), e.showArrows !== !1 && C("div", {
          class: "v-window__controls"
        }, [g.value])]), (x = t.additional) == null ? void 0 : x.call(t, {
          group: i
        })];
      }
    }), [[ja, T.value]])), {
      group: i
    };
  }
}), mu = K({
  ...gt(Zn(), ["continuous", "nextIcon", "prevIcon", "showArrows", "touch", "mandatory"])
}, "VTabsWindow"), gl = ne()({
  name: "VTabsWindow",
  props: mu(),
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
      const i = Ya.filterProps(e);
      return b(Ya, L({
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
  ...nl(),
  ...Kn()
}, "VWindowItem"), qa = ne()({
  name: "VWindowItem",
  directives: {
    vTouch: ja
  },
  props: Qn(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = ve(qn), l = ol(e, Xn), {
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
      i.value && Ae(() => {
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
    return ie(() => b(wa, {
      transition: m.value,
      disabled: !o.value
    }, {
      default: () => {
        var f;
        return [Ke(C("div", {
          class: fe(["v-window-item", l.selectedClass.value, e.class]),
          style: Ve(e.style)
        }, [v.value && ((f = t.default) == null ? void 0 : f.call(t))]), [[At, l.isSelected.value]])];
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
      const a = qa.filterProps(e);
      return b(qa, L({
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
const to = Symbol.for("vuetify:v-slide-group"), yl = K({
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
    } = nt(), {
      displayClasses: l,
      mobile: o
    } = mt(e), i = ll(e, e.symbol), s = ee(!1), u = ee(0), c = ee(0), r = ee(0), d = I(() => e.direction === "horizontal"), {
      resizeRef: m,
      contentRect: v
    } = Vt(), {
      resizeRef: f,
      contentRect: S
    } = Vt(), y = qi(), p = I(() => ({
      container: m.el,
      duration: 200,
      easing: "easeOutQuart"
    })), g = I(() => i.selected.value.length ? i.items.value.findIndex(($) => $.id === i.selected.value[0]) : -1), T = I(() => i.selected.value.length ? i.items.value.findIndex(($) => $.id === i.selected.value[i.selected.value.length - 1]) : -1);
    if (He) {
      let $ = -1;
      Q(() => [i.selected.value, v.value, S.value, d.value], () => {
        cancelAnimationFrame($), $ = requestAnimationFrame(() => {
          if (v.value && S.value) {
            const O = d.value ? "width" : "height";
            c.value = v.value[O], r.value = S.value[O], s.value = c.value + 1 < r.value;
          }
          if (g.value >= 0 && f.el) {
            const O = f.el.children[T.value];
            x(O, e.centerActive);
          }
        });
      });
    }
    const k = ee(!1);
    function x($, O) {
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
        d.value ? y.horizontal($, p.value) : y($, p.value);
      }
    }
    function P($) {
      const {
        scrollTop: O,
        scrollLeft: U
      } = $.target;
      u.value = d.value ? U : O;
    }
    function h($) {
      if (k.value = !0, !(!s.value || !f.el)) {
        for (const O of $.composedPath())
          for (const U of f.el.children)
            if (U === O) {
              x(U);
              return;
            }
      }
    }
    function E($) {
      k.value = !1;
    }
    let A = !1;
    function _($) {
      var O;
      !A && !k.value && !($.relatedTarget && ((O = f.el) != null && O.contains($.relatedTarget))) && W(), A = !1;
    }
    function R() {
      A = !0;
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
        O = Ha(f.el)[0];
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
    }), ue = I(() => Math.abs(u.value) > 1), B = I(() => {
      if (!m.value) return !1;
      const $ = Ql(d.value, m.el), O = bu(d.value, m.el);
      return $ - O - Math.abs(u.value) > 1;
    });
    return ie(() => b(e.tag, {
      class: fe(["v-slide-group", {
        "v-slide-group--vertical": !d.value,
        "v-slide-group--has-affixes": ae.value,
        "v-slide-group--is-overflowing": s.value
      }, l.value, e.class]),
      style: Ve(e.style),
      tabindex: k.value || i.selected.value.length ? -1 : 0,
      onFocus: _
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
        }, [(($ = t.prev) == null ? void 0 : $.call(t, te.value)) ?? b($l, null, {
          default: () => [b(ke, {
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
          onFocusin: h,
          onFocusout: E,
          onKeydown: F
        }, [(O = t.default) == null ? void 0 : O.call(t, te.value)])]), ae.value && C("div", {
          key: "next",
          class: fe(["v-slide-group__next", {
            "v-slide-group__next--disabled": !B.value
          }]),
          onMousedown: R,
          onClick: () => B.value && G("next")
        }, [((U = t.next) == null ? void 0 : U.call(t, te.value)) ?? b($l, null, {
          default: () => [b(ke, {
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
      hasNext: B
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
  ...yl({
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
    } = Et(e), {
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
      return C(J, null, [b(Mt, L(r, {
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
        symbol: ml
      }, c, t), {
        default: () => {
          var m;
          return [((m = a.default) == null ? void 0 : m.call(a)) ?? o.value.map((v) => {
            var f;
            return ((f = a.tab) == null ? void 0 : f.call(a, {
              item: v
            })) ?? b(Ga, L(v, {
              key: v.text,
              value: v.value
            }), {
              default: a[`tab.${v.value}`] ? () => {
                var S;
                return (S = a[`tab.${v.value}`]) == null ? void 0 : S.call(a, {
                  item: v
                });
              } : void 0
            });
          })];
        }
      }), d && b(gl, L({
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
            })) ?? b(ua, {
              value: v.value
            }, {
              default: () => {
                var S;
                return (S = a[`item.${v.value}`]) == null ? void 0 : S.call(a, {
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
        b(ou, {
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
        b(_s, { color: "primary" }, {
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
            b(Kl, { id: "app-bar-sheet-title" }),
            b(Kl, { id: "app-bar-title" }, {
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
              b(ut, {
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
        b(Fs, null, {
          default: M(() => [
            j(s.$slots, "main", {}, () => [
              b(gl, {
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
  } = Et(e), a = we(e, "modelValue"), l = I(() => e.trueValue !== void 0 ? e.trueValue : e.value !== void 0 ? e.value : !0), o = I(() => e.falseValue !== void 0 ? e.falseValue : !1), i = I(() => !!e.multiple || e.multiple == null && Array.isArray(a.value)), s = I({
    get() {
      const v = n ? n.modelValue.value : a.value;
      return i.value ? Ne(v).some((f) => e.valueComparator(f, l.value)) : e.valueComparator(v, l.value);
    },
    set(v) {
      if (e.readonly) return;
      const f = v ? l.value : o.value;
      let S = f;
      i.value && (S = v ? [...Ne(a.value), f] : Ne(a.value).filter((y) => !e.valueComparator(y, l.value))), n ? n.modelValue.value = S : a.value = S;
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
    } = Pu(e), v = ct(), f = ee(!1), S = ee(!1), y = q(), p = H(() => e.id || `input-${v}`), g = H(() => !e.disabled && !e.readonly);
    l == null || l.onForceUpdate(() => {
      y.value && (y.value.checked = s.value);
    });
    function T(P) {
      g.value && (f.value = !0, It(P.target, ":focus-visible") !== !1 && (S.value = !0));
    }
    function k() {
      f.value = !1, S.value = !1;
    }
    function x(P) {
      P.stopPropagation();
    }
    function w(P) {
      if (!g.value) {
        y.value && (y.value.checked = s.value);
        return;
      }
      e.readonly && l && Ae(() => l.forceUpdate()), s.value = P.target.checked;
    }
    return ie(() => {
      var _, R;
      const P = a.label ? a.label({
        label: e.label,
        props: {
          for: p.value
        }
      }) : e.label, [h, E] = xa(t), A = C("input", L({
        ref: y,
        checked: s.value,
        disabled: !!e.disabled,
        id: p.value,
        onBlur: k,
        onFocus: T,
        onInput: w,
        "aria-disabled": !!e.disabled,
        "aria-label": e.label,
        type: e.type,
        value: m.value,
        name: e.name,
        "aria-checked": e.type === "checkbox" ? s.value : void 0
      }, E), null);
      return C("div", L({
        class: ["v-selection-control", {
          "v-selection-control--dirty": s.value,
          "v-selection-control--disabled": e.disabled,
          "v-selection-control--error": e.error,
          "v-selection-control--focused": f.value,
          "v-selection-control--focus-visible": S.value,
          "v-selection-control--inline": e.inline
        }, o.value, e.class]
      }, h, {
        style: e.style
      }), [C("div", {
        class: fe(["v-selection-control__wrapper", u.value]),
        style: Ve(c.value)
      }, [(_ = a.default) == null ? void 0 : _.call(a, {
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
        inputNode: A,
        icon: i.value,
        props: {
          onFocus: T,
          onBlur: k,
          id: p.value
        }
      })) ?? C(J, null, [i.value && b(ke, {
        key: "icon",
        icon: i.value
      }, null), A])]), [[Ct, e.ripple && [!e.disabled && !e.readonly, null, ["center", "circle"]]]])]), P && b(ao, {
        for: p.value,
        onClick: x
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
      return b(Jl, L(u, {
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
      d.key !== "Enter" && d.key !== " " || (d.preventDefault(), d.stopPropagation(), cl(u, new PointerEvent("click", d)));
    }
    const r = u && s ? n(`$vuetify.input.${s}`, e.label ?? "") : void 0;
    return b(ke, L({
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
}, "VMessages"), Tu = ne()({
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
    return ie(() => b(wa, {
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
const ro = Symbol.for("vuetify:form"), Au = K({
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
function Bu(e) {
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
        resetValidation: S
      } = r;
      o.value.some((y) => y.id === d) && kn(`Duplicate input name "${d}"`), o.value.push({
        id: d,
        validate: v,
        reset: f,
        resetValidation: S,
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
function hl(e) {
  const n = ve(ro, null);
  return {
    ...n,
    isReadonly: I(() => !!((e == null ? void 0 : e.readonly) ?? (n == null ? void 0 : n.isReadonly.value))),
    isDisabled: I(() => !!((e == null ? void 0 : e.disabled) ?? (n == null ? void 0 : n.isDisabled.value)))
  };
}
const Eu = Symbol.for("vuetify:rules");
function _u(e) {
  const n = ve(Eu, null);
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
  const a = we(e, "modelValue"), l = I(() => e.validationValue === void 0 ? a.value : e.validationValue), o = hl(e), i = _u(() => e.rules), s = q([]), u = ee(!0), c = I(() => !!(Ne(a.value === "" ? null : a.value).length || Ne(l.value === "" ? null : l.value).length)), r = I(() => {
    var k;
    return (k = e.errorMessages) != null && k.length ? Ne(e.errorMessages).concat(s.value).slice(0, Math.max(0, Number(e.maxErrors))) : s.value;
  }), d = I(() => {
    var w;
    let k = (e.validateOn ?? ((w = o.validateOn) == null ? void 0 : w.value)) || "input";
    k === "lazy" && (k = "input lazy"), k === "eager" && (k = "input eager");
    const x = new Set((k == null ? void 0 : k.split(" ")) ?? []);
    return {
      input: x.has("input"),
      blur: x.has("blur") || x.has("input") || x.has("invalid-input"),
      invalidInput: x.has("invalid-input"),
      lazy: x.has("lazy"),
      eager: x.has("eager")
    };
  }), m = I(() => {
    var k;
    return e.error || (k = e.errorMessages) != null && k.length ? !1 : e.rules.length ? u.value ? s.value.length || d.value.lazy ? null : !0 : !s.value.length : !0;
  }), v = ee(!1), f = I(() => ({
    [`${n}--error`]: m.value === !1,
    [`${n}--dirty`]: c.value,
    [`${n}--disabled`]: o.isDisabled.value,
    [`${n}--readonly`]: o.isReadonly.value
  })), S = lt("validation"), y = I(() => e.name ?? V(t));
  ui(() => {
    var k;
    (k = o.register) == null || k.call(o, {
      id: y.value,
      vm: S,
      validate: T,
      reset: p,
      resetValidation: g
    });
  }), dt(() => {
    var k;
    (k = o.unregister) == null || k.call(o, y.value);
  }), Ze(async () => {
    var k;
    d.value.lazy || await T(!d.value.eager), (k = o.update) == null || k.call(o, y.value, m.value, r.value);
  }), qe(() => d.value.input || d.value.invalidInput && m.value === !1, () => {
    Q(l, () => {
      if (l.value != null)
        T();
      else if (e.focused) {
        const k = Q(() => e.focused, (x) => {
          x || T(), k();
        });
      }
    });
  }), qe(() => d.value.blur, () => {
    Q(() => e.focused, (k) => {
      k || T();
    });
  }), Q([m, r], () => {
    var k;
    (k = o.update) == null || k.call(o, y.value, m.value, r.value);
  });
  async function p() {
    a.value = null, await Ae(), await g();
  }
  async function g() {
    u.value = !0, d.value.lazy ? s.value = [] : await T(!d.value.eager);
  }
  async function T() {
    let k = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    const x = [];
    v.value = !0;
    for (const w of i.value) {
      if (x.length >= Number(e.maxErrors ?? 1))
        break;
      const h = await (typeof w == "function" ? w : () => w)(l.value);
      if (h !== !0) {
        if (h !== !1 && typeof h != "string") {
          console.warn(`${h} is not a valid value. Rule functions must return boolean true or a string.`);
          continue;
        }
        x.push(h || "");
      }
    }
    return s.value = x, v.value = !1, u.value = k, s.value;
  }
  return {
    errorMessages: r,
    isDirty: c,
    isDisabled: o.isDisabled,
    isReadonly: o.isReadonly,
    isPristine: u,
    isValid: m,
    isValidating: v,
    reset: p,
    resetValidation: g,
    validate: T,
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
}, "VInput"), Tt = ne()({
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
    } = Et(e), {
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
      isDisabled: S,
      isReadonly: y,
      isPristine: p,
      isValid: g,
      isValidating: T,
      reset: k,
      resetValidation: x,
      validate: w,
      validationClasses: P
    } = Ou(e, "v-input", d), h = I(() => ({
      id: d,
      messagesId: m,
      isDirty: f,
      isDisabled: S,
      isReadonly: y,
      isPristine: p,
      isValid: g,
      isValidating: T,
      reset: k,
      resetValidation: x,
      validate: w
    })), E = H(() => e.error || e.disabled ? void 0 : e.focused ? e.color : e.baseColor), A = H(() => {
      if (e.iconColor)
        return e.iconColor === !0 ? E.value : e.iconColor;
    }), _ = I(() => {
      var R;
      return (R = e.errorMessages) != null && R.length || !p.value && v.value.length ? v.value : e.hint && (e.persistentHint || e.focused) ? e.hint : e.messages;
    });
    return ie(() => {
      var G, te, ae, ue;
      const R = !!(a.prepend || e.prependIcon), F = !!(a.append || e.appendIcon), z = _.value.length > 0, W = !e.hideDetails || e.hideDetails === "auto" && (z || !!a.details);
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
      }, [(G = a.prepend) == null ? void 0 : G.call(a, h.value), e.prependIcon && b(c, {
        key: "prepend-icon",
        name: "prepend",
        color: A.value
      }, null)]), a.default && C("div", {
        class: "v-input__control"
      }, [(te = a.default) == null ? void 0 : te.call(a, h.value)]), F && C("div", {
        key: "append",
        class: "v-input__append"
      }, [e.appendIcon && b(c, {
        key: "append-icon",
        name: "append",
        color: A.value
      }, null), (ae = a.append) == null ? void 0 : ae.call(a, h.value)]), W && C("div", {
        id: m.value,
        class: "v-input__details",
        role: "alert",
        "aria-live": "polite"
      }, [b(Tu, {
        active: z,
        messages: _.value
      }, {
        message: a.message
      }), (ue = a.details) == null ? void 0 : ue.call(a, h.value)])]);
    }), {
      reset: k,
      resetValidation: x,
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
      const [c, r] = xa(t), d = Tt.filterProps(e), m = pt.filterProps(e);
      return b(Tt, L({
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
            messagesId: S,
            isDisabled: y,
            isReadonly: p,
            isValid: g
          } = v;
          return b(pt, L(m, {
            id: f.value,
            "aria-describedby": S.value,
            disabled: y.value,
            readonly: p.value
          }, r, {
            error: g.value === !1,
            modelValue: l.value,
            "onUpdate:modelValue": (T) => l.value = T,
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
  ...yl(),
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
      const c = Mt.filterProps(e);
      return b(Mt, L(c, {
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
  ...nl(),
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
}, "VChip"), bl = ne()({
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
    } = Et(e), {
      elevationClasses: u
    } = ha(e), {
      roundedClasses: c
    } = Bt(e), {
      sizeClasses: r
    } = Bi(e), {
      themeClasses: d
    } = je(e), m = we(e, "modelValue"), v = ol(e, co, !1), f = gn(e, t), S = H(() => e.link !== !1 && f.isLink.value), y = I(() => !e.disabled && e.link !== !1 && (!!v || e.link || f.isClickable.value)), p = H(() => ({
      "aria-label": o(e.closeLabel),
      disabled: e.disabled,
      onClick(P) {
        P.preventDefault(), P.stopPropagation(), m.value = !1, a("click:close", P);
      }
    })), {
      colorClasses: g,
      colorStyles: T,
      variantClasses: k
    } = tl(() => ({
      color: !v || v.isSelected.value ? e.color ?? e.baseColor : e.baseColor,
      variant: e.variant
    }));
    function x(P) {
      var h;
      a("click", P), y.value && ((h = f.navigate) == null || h.call(f, P), v == null || v.toggle());
    }
    function w(P) {
      (P.key === "Enter" || P.key === " ") && (P.preventDefault(), x(P));
    }
    return () => {
      var z;
      const P = f.isLink.value ? "a" : e.tag, h = !!(e.appendIcon || e.appendAvatar), E = !!(h || l.append), A = !!(l.close || e.closable), _ = !!(l.filter || e.filter) && v, R = !!(e.prependIcon || e.prependAvatar), F = !!(R || l.prepend);
      return m.value && Ke(b(P, L({
        class: ["v-chip", {
          "v-chip--disabled": e.disabled,
          "v-chip--label": e.label,
          "v-chip--link": y.value,
          "v-chip--filter": _,
          "v-chip--pill": e.pill,
          [`${e.activeClass}`]: e.activeClass && ((z = f.isActive) == null ? void 0 : z.value)
        }, d.value, i.value, g.value, s.value, u.value, c.value, r.value, k.value, v == null ? void 0 : v.selectedClass.value, e.class],
        style: [T.value, e.style],
        disabled: e.disabled || void 0,
        draggable: e.draggable,
        tabindex: y.value ? 0 : void 0,
        onClick: x,
        onKeydown: y.value && !S.value && w
      }, f.linkProps), {
        default: () => {
          var W;
          return [al(y.value, "v-chip"), _ && b(yn, {
            key: "filter"
          }, {
            default: () => [Ke(C("div", {
              class: "v-chip__filter"
            }, [l.filter ? b(Fe, {
              key: "filter-defaults",
              disabled: !e.filterIcon,
              defaults: {
                VIcon: {
                  icon: e.filterIcon
                }
              }
            }, l.filter) : b(ke, {
              key: "filter-icon",
              icon: e.filterIcon
            }, null)]), [[At, v.isSelected.value]])]
          }), F && C("div", {
            key: "prepend",
            class: "v-chip__prepend"
          }, [l.prepend ? b(Fe, {
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
          }, l.prepend) : C(J, null, [e.prependIcon && b(ke, {
            key: "prepend-icon",
            icon: e.prependIcon,
            start: !0
          }, null), e.prependAvatar && b(Pt, {
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
          })) ?? Re(e.text)]), E && C("div", {
            key: "append",
            class: "v-chip__append"
          }, [l.append ? b(Fe, {
            key: "append-defaults",
            disabled: !h,
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
          }, l.append) : C(J, null, [e.appendIcon && b(ke, {
            key: "append-icon",
            end: !0,
            icon: e.appendIcon
          }, null), e.appendAvatar && b(Pt, {
            key: "append-avatar",
            end: !0,
            image: e.appendAvatar
          }, null)])]), A && C("button", L({
            key: "close",
            class: "v-chip__close",
            type: "button",
            "data-testid": "close-chip"
          }, p.value), [l.close ? b(Fe, {
            key: "close-defaults",
            defaults: {
              VIcon: {
                icon: e.closeIcon,
                size: "x-small"
              }
            }
          }, l.close) : b(ke, {
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
  ...gt(fl({
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
}, "VMenu"), pl = ne()({
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
    } = nt(), i = ct(), s = H(() => e.id || `v-menu-${i}`), u = q(), c = ve(Ka, null), r = ee(/* @__PURE__ */ new Set());
    ze(Ka, {
      register() {
        r.value.add(i);
      },
      unregister() {
        r.value.delete(i);
      },
      closeParents(y) {
        setTimeout(() => {
          var p;
          !r.value.size && !e.persistent && (y == null || (p = u.value) != null && p.contentEl && !Wi(y, u.value.contentEl)) && (a.value = !1, c == null || c.closeParents());
        }, 40);
      }
    }), dt(() => {
      c == null || c.unregister(), document.removeEventListener("focusin", d);
    }), an(() => a.value = !1);
    async function d(y) {
      var T, k, x;
      const p = y.relatedTarget, g = y.target;
      await Ae(), a.value && p !== g && ((T = u.value) != null && T.contentEl) && // We're the topmost menu
      ((k = u.value) != null && k.globalTop) && // It isn't the document or the menu body
      ![document, u.value.contentEl].includes(g) && // It isn't inside the menu body
      !u.value.contentEl.contains(g) && ((x = Ha(u.value.contentEl)[0]) == null || x.focus());
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
      var p, g, T, k, x;
      if (!e.disabled)
        if (y.key === "Tab" || y.key === "Enter" && !e.closeOnContentClick) {
          if (y.key === "Enter" && (y.target instanceof HTMLTextAreaElement || y.target instanceof HTMLInputElement && y.target.closest("form"))) return;
          y.key === "Enter" && y.preventDefault(), Ui(Ha((p = u.value) == null ? void 0 : p.contentEl, !1), y.shiftKey ? "prev" : "next", (P) => P.tabIndex >= 0) || (a.value = !1, (T = (g = u.value) == null ? void 0 : g.activatorEl) == null || T.focus());
        } else e.submenu && y.key === (o.value ? "ArrowRight" : "ArrowLeft") && (a.value = !1, (x = (k = u.value) == null ? void 0 : k.activatorEl) == null || x.focus());
    }
    function f(y) {
      var g;
      if (e.disabled) return;
      const p = (g = u.value) == null ? void 0 : g.contentEl;
      p && a.value ? y.key === "ArrowDown" ? (y.preventDefault(), y.stopImmediatePropagation(), Aa(p, "next")) : y.key === "ArrowUp" ? (y.preventDefault(), y.stopImmediatePropagation(), Aa(p, "prev")) : e.submenu && (y.key === (o.value ? "ArrowRight" : "ArrowLeft") ? a.value = !1 : y.key === (o.value ? "ArrowLeft" : "ArrowRight") && (y.preventDefault(), Aa(p, "first"))) : (e.submenu ? y.key === (o.value ? "ArrowLeft" : "ArrowRight") : ["ArrowDown", "ArrowUp"].includes(y.key)) && (a.value = !0, y.preventDefault(), setTimeout(() => setTimeout(() => f(y))));
    }
    const S = I(() => L({
      "aria-haspopup": "menu",
      "aria-expanded": String(a.value),
      "aria-controls": s.value,
      onKeydown: f
    }, e.activatorProps));
    return ie(() => {
      const y = sa.filterProps(e);
      return b(sa, L({
        ref: u,
        id: s.value,
        class: ["v-menu", e.class],
        style: e.style
      }, y, {
        modelValue: a.value,
        "onUpdate:modelValue": (p) => a.value = p,
        absolute: !0,
        activatorProps: S.value,
        location: e.location ?? (e.submenu ? "end" : "bottom"),
        "onClick:outside": m,
        onKeydown: v
      }, l), {
        activator: t.activator,
        default: function() {
          for (var p = arguments.length, g = new Array(p), T = 0; T < p; T++)
            g[T] = arguments[T];
          return b(Fe, {
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
    return ie(() => b(wa, {
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
      }) : a.value]), [[At, e.active]])]
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
    return ie(() => b(ao, {
      class: fe(["v-field-label", {
        "v-field-label--floating": e.floating
      }, e.class]),
      style: Ve(e.style),
      "aria-hidden": e.floating || void 0
    }, t)), {};
  }
}), zu = ["underlined", "outlined", "filled", "solo", "solo-inverted", "solo-filled", "plain"], wl = K({
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
  ...ul(),
  ...wt(),
  ...Le()
}, "VField"), ra = ne()({
  name: "VField",
  inheritAttrs: !1,
  props: {
    id: String,
    ...uo(),
    ...wl()
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
    } = il(e), {
      focusClasses: s,
      isFocused: u,
      focus: c,
      blur: r
    } = Sa(e), {
      InputIcon: d
    } = so(e), {
      roundedClasses: m
    } = Bt(e), {
      rtlClasses: v
    } = nt(), f = H(() => e.dirty || e.active), S = H(() => !!(e.label || l.label)), y = H(() => !e.singleLine && S.value), p = ct(), g = I(() => e.id || `input-${p}`), T = H(() => `${g.value}-messages`), k = q(), x = q(), w = q(), P = I(() => ["plain", "underlined"].includes(e.variant)), h = I(() => e.error || e.disabled ? void 0 : f.value && u.value ? e.color : e.baseColor), E = I(() => {
      if (!(!e.iconColor || e.glow && !u.value))
        return e.iconColor === !0 ? h.value : e.iconColor;
    }), {
      backgroundColorClasses: A,
      backgroundColorStyles: _
    } = st(() => e.bgColor), {
      textColorClasses: R,
      textColorStyles: F
    } = Kt(h);
    Q(f, (G) => {
      if (y.value) {
        const te = k.value.$el, ae = x.value.$el;
        requestAnimationFrame(() => {
          const ue = dl(te), B = ae.getBoundingClientRect(), $ = B.x - ue.x, O = B.y - ue.y - (ue.height / 2 - B.height / 2), U = B.width / 0.75, he = Math.abs(U - ue.width) > 1 ? {
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
      const G = e.variant === "outlined", te = !!(l["prepend-inner"] || e.prependInnerIcon), ae = !!(e.clearable || l.clear) && !e.disabled, ue = !!(l["append-inner"] || e.appendInnerIcon || ae), B = () => l.label ? l.label({
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
          "v-field--no-label": !B(),
          [`v-field--variant-${e.variant}`]: !0
        }, o.value, A.value, s.value, i.value, m.value, v.value, e.class],
        style: [_.value, e.style],
        onClick: W
      }, t), [C("div", {
        class: "v-field__overlay"
      }, null), b(sl, {
        name: "v-field",
        active: !!e.loading,
        color: e.error ? "error" : typeof e.loading == "string" ? e.loading : e.color
      }, {
        default: l.loader
      }), te && C("div", {
        key: "prepend",
        class: "v-field__prepend-inner"
      }, [e.prependInnerIcon && b(d, {
        key: "prepend-icon",
        name: "prependInner",
        color: E.value
      }, null), ($ = l["prepend-inner"]) == null ? void 0 : $.call(l, z.value)]), C("div", {
        class: "v-field__field",
        "data-no-activator": ""
      }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(e.variant) && y.value && b(Zt, {
        key: "floating-label",
        ref: x,
        class: fe([R.value]),
        floating: !0,
        for: g.value,
        style: Ve(F.value)
      }, {
        default: () => [B()]
      }), S.value && b(Zt, {
        key: "label",
        ref: k,
        for: g.value
      }, {
        default: () => [B()]
      }), ((O = l.default) == null ? void 0 : O.call(l, {
        ...z.value,
        props: {
          id: g.value,
          class: "v-field__input",
          "aria-describedby": T.value
        },
        focus: c,
        blur: r
      })) ?? C("div", {
        id: g.value,
        class: "v-field__input",
        "aria-describedby": T.value
      }, null)]), ae && b(yn, {
        key: "clear"
      }, {
        default: () => [Ke(C("div", {
          class: "v-field__clearable",
          onMousedown: (he) => {
            he.preventDefault(), he.stopPropagation();
          }
        }, [b(Fe, {
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
          }) : b(d, {
            name: "clear",
            onFocus: c,
            onBlur: r,
            tabindex: -1
          }, null)]
        })]), [[At, e.dirty]])]
      }), ue && C("div", {
        key: "append",
        class: "v-field__append-inner"
      }, [(U = l["append-inner"]) == null ? void 0 : U.call(l, z.value), e.appendInnerIcon && b(d, {
        key: "append-icon",
        name: "appendInner",
        color: E.value
      }, null)]), C("div", {
        class: fe(["v-field__outline", R.value]),
        style: Ve(F.value)
      }, [G && C(J, null, [C("div", {
        class: "v-field__outline__start"
      }, null), y.value && C("div", {
        class: "v-field__outline__notch"
      }, [b(Zt, {
        ref: x,
        floating: !0,
        for: g.value
      }, {
        default: () => [B()]
      })]), C("div", {
        class: "v-field__outline__end"
      }, null)]), P.value && y.value && b(Zt, {
        ref: x,
        floating: !0,
        for: g.value
      }, {
        default: () => [B()]
      })])]);
    }), {
      controlRef: w,
      fieldIconColor: E
    };
  }
}), Wu = ["color", "file", "time", "date", "datetime-local", "week", "month"], xl = K({
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
  ...wl()
}, "VTextField"), rt = ne()({
  name: "VTextField",
  directives: {
    vIntersect: ta
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
    } = Sa(e), c = I(() => typeof e.counterValue == "function" ? e.counterValue(o.value) : typeof e.counterValue == "number" ? e.counterValue : (o.value ?? "").toString().length), r = I(() => {
      if (t.maxlength) return t.maxlength;
      if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string"))
        return e.counter;
    }), d = I(() => ["plain", "underlined"].includes(e.variant));
    function m(w, P) {
      var h, E;
      !e.autofocus || !w || (E = (h = P[0].target) == null ? void 0 : h.focus) == null || E.call(h);
    }
    const v = q(), f = q(), S = q(), y = I(() => Wu.includes(e.type) || e.persistentPlaceholder || i.value || e.active);
    function p() {
      i.value || s(), Ae(() => {
        var w;
        S.value !== document.activeElement && ((w = S.value) == null || w.focus());
      });
    }
    function g(w) {
      a("mousedown:control", w), w.target !== S.value && (p(), w.preventDefault());
    }
    function T(w) {
      a("click:control", w);
    }
    function k(w, P) {
      w.stopPropagation(), p(), Ae(() => {
        o.value = null, P(), cl(e["onClick:clear"], w);
      });
    }
    function x(w) {
      var h;
      const P = w.target;
      if (o.value = P.value, (h = e.modelModifiers) != null && h.trim && ["text", "search", "password", "tel", "url"].includes(e.type)) {
        const E = [P.selectionStart, P.selectionEnd];
        Ae(() => {
          P.selectionStart = E[0], P.selectionEnd = E[1];
        });
      }
    }
    return ie(() => {
      const w = !!(l.counter || e.counter !== !1 && e.counter != null), P = !!(w || l.details), [h, E] = xa(t), {
        modelValue: A,
        ..._
      } = Tt.filterProps(e), R = ra.filterProps(e);
      return b(Tt, L({
        ref: v,
        modelValue: o.value,
        "onUpdate:modelValue": (F) => o.value = F,
        class: ["v-text-field", {
          "v-text-field--prefixed": e.prefix,
          "v-text-field--suffixed": e.suffix,
          "v-input--plain-underlined": d.value
        }, e.class],
        style: e.style
      }, h, _, {
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
          return b(ra, L({
            ref: f,
            onMousedown: g,
            onClick: T,
            "onClick:clear": (B) => k(B, ue),
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
            default: (B) => {
              let {
                props: {
                  class: $,
                  ...O
                }
              } = B;
              const U = Ke(C("input", L({
                ref: S,
                value: o.value,
                onInput: x,
                autofocus: e.autofocus,
                readonly: te.value,
                disabled: W.value,
                name: e.name,
                placeholder: e.placeholder,
                size: 1,
                type: e.type,
                onFocus: p,
                onBlur: u
              }, O, E), null), [[ta, {
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
          return C(J, null, [(z = l.details) == null ? void 0 : z.call(l, F), w && C(J, null, [C("span", null, null), b(vo, {
            active: e.persistentCounter || i.value,
            value: c.value,
            max: r.value,
            disabled: e.disabled
          }, l.counter)])]);
        } : void 0
      });
    }), yt({}, v, f, S);
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
}), Gu = -1, ju = 1, Ra = 100, Yu = K({
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
    var B;
    return u.value === document.documentElement ? t.height.value : ((B = m.value) == null ? void 0 : B.height) || parseInt(e.height) || 0;
  }), f = I(() => !!(u.value && c.value && v.value && a.value));
  let S = Array.from({
    length: n.value.length
  }), y = Array.from({
    length: n.value.length
  });
  const p = ee(0);
  let g = -1;
  function T(B) {
    return S[B] || a.value;
  }
  const k = Ki(() => {
    const B = performance.now();
    y[0] = 0;
    const $ = n.value.length;
    for (let O = 1; O <= $ - 1; O++)
      y[O] = (y[O - 1] || 0) + T(O - 1);
    p.value = Math.max(p.value, performance.now() - B);
  }, p), x = Q(f, (B) => {
    B && (x(), r = c.value.offsetTop, k.immediate(), G(), ~g && Ae(() => {
      He && window.requestAnimationFrame(() => {
        ae(g), g = -1;
      });
    }));
  });
  We(() => {
    k.clear();
  });
  function w(B, $) {
    const O = S[B], U = a.value;
    a.value = U ? Math.min(a.value, $) : $, (O !== $ || U !== a.value) && (S[B] = $, k());
  }
  function P(B) {
    return B = Je(B, 0, n.value.length - 1), y[B] || 0;
  }
  function h(B) {
    return Xu(y, B);
  }
  let E = 0, A = 0, _ = 0;
  Q(v, (B, $) => {
    $ && (G(), B < $ && requestAnimationFrame(() => {
      A = 0, G();
    }));
  });
  let R = -1;
  function F() {
    if (!u.value || !c.value) return;
    const B = u.value.scrollTop, $ = performance.now();
    $ - _ > 500 ? (A = Math.sign(B - E), r = c.value.offsetTop) : A = B - E, E = B, _ = $, window.clearTimeout(R), R = window.setTimeout(z, 500), G();
  }
  function z() {
    !u.value || !c.value || (A = 0, _ = 0, window.clearTimeout(R), G());
  }
  let W = -1;
  function G() {
    cancelAnimationFrame(W), W = requestAnimationFrame(te);
  }
  function te() {
    if (!u.value || !v.value) return;
    const B = E - r, $ = Math.sign(A), O = Math.max(0, B - Ra), U = Je(h(O), 0, n.value.length), he = B + v.value + Ra, le = Je(h(he) + 1, U + 1, n.value.length);
    if (
      // Only update the side we're scrolling towards,
      // the other side will be updated incidentally
      ($ !== Gu || U < l.value) && ($ !== ju || le > o.value)
    ) {
      const se = P(l.value) - P(U), X = P(le) - P(o.value);
      Math.max(se, X) > Ra ? (l.value = U, o.value = le) : (U <= 0 && (l.value = U), le >= n.value.length && (o.value = le));
    }
    i.value = P(l.value), s.value = P(n.value.length) - P(o.value);
  }
  function ae(B) {
    const $ = P(B);
    !u.value || B && !$ ? g = B : u.value.scrollTop = $;
  }
  const ue = I(() => n.value.slice(l.value, o.value).map((B, $) => {
    const O = $ + l.value;
    return {
      raw: B,
      index: O,
      key: St(B, e.itemKey, O)
    };
  }));
  return Q(n, () => {
    S = Array.from({
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
      function S() {
        var g, T;
        const p = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1) ? "addEventListener" : "removeEventListener";
        i.value === document.documentElement ? (document[p]("scroll", u, {
          passive: !0
        }), document[p]("scrollend", c)) : ((g = i.value) == null || g[p]("scroll", u, {
          passive: !0
        }), (T = i.value) == null || T[p]("scrollend", c));
      }
      Ze(() => {
        i.value = Bn(a.vnode.el, !0), S(!0);
      }), We(S);
    }), ie(() => {
      const S = f.value.map((y) => b(Ku, {
        key: y.key,
        renderless: e.renderless,
        "onUpdate:height": (p) => r(y.index, p)
      }, {
        default: (p) => {
          var g;
          return (g = t.default) == null ? void 0 : g.call(t, {
            item: y.raw,
            index: y.index,
            ...p
          });
        }
      }));
      return e.renderless ? C(J, null, [C("div", {
        ref: s,
        class: "v-virtual-scroll__spacer",
        style: {
          paddingTop: ye(m.value)
        }
      }, null), S, C("div", {
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
      }, [S])]);
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
  ...Ei({
    itemChildren: !1
  })
}, "Select"), Qu = K({
  ...go(),
  ...gt(xl({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...Wt({
    transition: {
      component: Fn
    }
  })
}, "VSelect"), Sl = ne()({
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
    } = pn(e), r = we(e, "modelValue", [], (B) => u(B === null ? [null] : Ne(B)), (B) => {
      const $ = c(B);
      return e.multiple ? $ : $[0] ?? null;
    }), d = I(() => typeof e.counterValue == "function" ? e.counterValue(r.value) : typeof e.counterValue == "number" ? e.counterValue : r.value.length), m = hl(e), v = I(() => r.value.map((B) => B.value)), f = ee(!1);
    let S = "", y = -1, p;
    const g = I(() => e.hideSelected ? s.value.filter((B) => !r.value.some(($) => (e.valueComparator || it)($, B))) : s.value), T = I(() => e.hideNoData && !g.value.length || m.isReadonly.value || m.isDisabled.value), k = we(e, "menu"), x = I({
      get: () => k.value,
      set: (B) => {
        var $;
        k.value && !B && (($ = o.value) != null && $.ΨopenChildren.size) || B && T.value || (k.value = B);
      }
    }), w = H(() => x.value ? e.closeText : e.openText), P = I(() => {
      var B;
      return {
        ...e.menuProps,
        activatorProps: {
          ...((B = e.menuProps) == null ? void 0 : B.activatorProps) || {},
          "aria-haspopup": "listbox"
          // Set aria-haspopup to 'listbox'
        }
      };
    }), h = q(), E = mo(h, l);
    function A(B) {
      e.openOnClear && (x.value = !0);
    }
    function _() {
      T.value || (x.value = !x.value);
    }
    function R(B) {
      aa(B) && F(B);
    }
    function F(B) {
      var me, N, Z;
      if (!B.key || m.isReadonly.value) return;
      ["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(B.key) && B.preventDefault(), ["Enter", "ArrowDown", " "].includes(B.key) && (x.value = !0), ["Escape", "Tab"].includes(B.key) && (x.value = !1), B.key === "Home" ? (me = h.value) == null || me.focus("first") : B.key === "End" && ((N = h.value) == null || N.focus("last"));
      const $ = 1e3;
      if (!aa(B)) return;
      const O = performance.now();
      O - p > $ && (S = "", y = -1), S += B.key.toLowerCase(), p = O;
      const U = g.value;
      function he() {
        let ce = le();
        return ce || S.at(-1) === S.at(-2) && (S = S.slice(0, -1), ce = le(), ce) || (y = -1, ce = le(), ce) ? ce : (S = B.key.toLowerCase(), le());
      }
      function le() {
        for (let ce = y + 1; ce < U.length; ce++) {
          const ge = U[ce];
          if (ge.title.toLowerCase().startsWith(S))
            return [ge, ce];
        }
      }
      const se = he();
      if (!se) return;
      const [X, re] = se;
      y = re, (Z = h.value) == null || Z.focus(re), e.multiple || (r.value = [X]);
    }
    function z(B) {
      let $ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!B.props.disabled)
        if (e.multiple) {
          const O = r.value.findIndex((he) => (e.valueComparator || it)(he.value, B.value)), U = $ ?? !~O;
          if (~O) {
            const he = U ? [...r.value, B] : [...r.value];
            he.splice(O, 1), r.value = he;
          } else U && (r.value = [...r.value, B]);
        } else {
          const O = $ !== !1;
          r.value = O ? [B] : [], Ae(() => {
            x.value = !1;
          });
        }
    }
    function W(B) {
      var $;
      ($ = h.value) != null && $.$el.contains(B.relatedTarget) || (x.value = !1);
    }
    function G() {
      var B;
      e.eager && ((B = i.value) == null || B.calculateVisibleItems());
    }
    function te() {
      var B;
      f.value && ((B = l.value) == null || B.focus());
    }
    function ae(B) {
      f.value = !0;
    }
    function ue(B) {
      if (B == null) r.value = [];
      else if (It(l.value, ":autofill") || It(l.value, ":-webkit-autofill")) {
        const $ = s.value.find((O) => O.title === B);
        $ && z($);
      } else l.value && (l.value.value = "");
    }
    return Q(x, () => {
      if (!e.hideSelected && x.value && r.value.length) {
        const B = g.value.findIndex(($) => r.value.some((O) => (e.valueComparator || it)(O.value, $.value)));
        He && window.requestAnimationFrame(() => {
          var $;
          B >= 0 && (($ = i.value) == null || $.scrollToIndex(B));
        });
      }
    }), Q(() => e.items, (B, $) => {
      x.value || f.value && !$.length && B.length && (x.value = !0);
    }), ie(() => {
      const B = !!(e.chips || t.chip), $ = !!(!e.hideNoData || g.value.length || t["prepend-item"] || t["append-item"] || t["no-data"]), O = r.value.length > 0, U = rt.filterProps(e), he = O || !f.value && e.label && !e.persistentPlaceholder ? void 0 : e.placeholder;
      return b(rt, L({
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
          "v-select--active-menu": x.value,
          "v-select--chips": !!e.chips,
          [`v-select--${e.multiple ? "multiple" : "single"}`]: !0,
          "v-select--selected": r.value.length,
          "v-select--selection-slot": !!t.selection
        }, e.class],
        style: e.style,
        inputmode: "none",
        placeholder: he,
        "onClick:clear": A,
        "onMousedown:control": _,
        onBlur: W,
        onKeydown: F,
        "aria-label": a(w.value),
        title: a(w.value)
      }), {
        ...t,
        default: () => C(J, null, [b(pl, L({
          ref: o,
          modelValue: x.value,
          "onUpdate:modelValue": (le) => x.value = le,
          activator: "parent",
          contentClass: "v-select__content",
          disabled: T.value,
          eager: e.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: e.transition,
          onAfterEnter: G,
          onAfterLeave: te
        }, P.value), {
          default: () => [$ && b(ut, L({
            ref: h,
            selected: v.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: (le) => le.preventDefault(),
            onKeydown: R,
            onFocusin: ae,
            tabindex: "-1",
            "aria-live": "polite",
            "aria-label": `${e.label}-list`,
            color: e.itemColor ?? e.color
          }, E, e.listProps), {
            default: () => {
              var le, se, X;
              return [(le = t["prepend-item"]) == null ? void 0 : le.call(t), !g.value.length && !e.hideNoData && (((se = t["no-data"]) == null ? void 0 : se.call(t)) ?? b(Ye, {
                key: "no-data",
                title: a(e.noDataText)
              }, null)), b(fo, {
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
                  })) ?? b(Ye, L(ge, {
                    role: "option"
                  }), {
                    prepend: (_e) => {
                      let {
                        isSelected: De
                      } = _e;
                      return C(J, null, [e.multiple && !e.hideSelected ? b(pt, {
                        key: me.value,
                        modelValue: De,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, ce.prependAvatar && b(Pt, {
                        image: ce.prependAvatar
                      }, null), ce.prependIcon && b(ke, {
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
          }, me = B ? !!t.chip : !!t.selection, N = me ? In(B ? t.chip({
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
            }, [B ? t.chip ? b(Fe, {
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
            }) : b(bl, L({
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
          return C(J, null, [(re = t["append-inner"]) == null ? void 0 : re.call(t, ...se), e.menuIcon ? b(ke, {
            class: "v-select__menu-icon",
            color: (me = l.value) == null ? void 0 : me.fieldIconColor,
            icon: e.menuIcon
          }, null) : void 0]);
        }
      });
    }), yt({
      isFocused: f,
      menu: x,
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
function Ma(e, n) {
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
        for (const p of y) {
          const g = St(r, p), T = (s = t == null ? void 0 : t.customKeyFilter) == null ? void 0 : s[p];
          if (v = T ? T(g, n, c) : l(g, n, c), v !== -1 && v !== !1)
            T ? d[p] = Ma(v, n) : m[p] = Ma(v, n);
          else if ((t == null ? void 0 : t.filterMode) === "every")
            continue e;
        }
      } else
        v = l(c, n, c), v !== -1 && v !== !1 && (m.title = Ma(v, n));
      const f = Object.keys(m).length, S = Object.keys(d).length;
      if (!f && !S || (t == null ? void 0 : t.filterMode) === "union" && S !== i && !f || (t == null ? void 0 : t.filterMode) === "intersection" && (S !== i || !f)) continue;
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
        index: S,
        matches: y
      } = f;
      const p = d[S];
      m.push(p), v.set(p.value, y);
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
  ...gt(xl({
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
      textColorStyles: S
    } = Kt(() => {
      var N;
      return (N = l.value) == null ? void 0 : N.color;
    }), y = we(e, "search", ""), p = we(e, "modelValue", [], (N) => m(N === null ? [null] : Ne(N)), (N) => {
      const Z = v(N);
      return e.multiple ? Z : Z[0] ?? null;
    }), g = I(() => typeof e.counterValue == "function" ? e.counterValue(p.value) : typeof e.counterValue == "number" ? e.counterValue : p.value.length), T = hl(e), {
      filteredItems: k,
      getMatches: x
    } = ho(e, d, () => i.value ? "" : y.value), w = I(() => e.hideSelected ? k.value.filter((N) => !p.value.some((Z) => Z.value === N.value)) : k.value), P = I(() => !!(e.chips || t.chip)), h = I(() => P.value || !!t.selection), E = I(() => p.value.map((N) => N.props.value)), A = I(() => {
      var Z;
      return (e.autoSelectFirst === !0 || e.autoSelectFirst === "exact" && y.value === ((Z = w.value[0]) == null ? void 0 : Z.title)) && w.value.length > 0 && !i.value && !s.value;
    }), _ = I(() => e.hideNoData && !w.value.length || T.isReadonly.value || T.isDisabled.value), R = we(e, "menu"), F = I({
      get: () => R.value,
      set: (N) => {
        var Z;
        R.value && !N && ((Z = u.value) != null && Z.ΨopenChildren.size) || N && _.value || (R.value = N);
      }
    }), z = I(() => F.value ? e.closeText : e.openText), W = q(), G = mo(W, l);
    function te(N) {
      e.openOnClear && (F.value = !0), y.value = "";
    }
    function ae() {
      _.value || (F.value = !0);
    }
    function ue(N) {
      _.value || (o.value && (N.preventDefault(), N.stopPropagation()), F.value = !F.value);
    }
    function B(N) {
      var Z;
      N.key !== " " && aa(N) && ((Z = l.value) == null || Z.focus());
    }
    function $(N) {
      var ge, Ce, _e, De, Te;
      if (T.isReadonly.value) return;
      const Z = (ge = l.value) == null ? void 0 : ge.selectionStart, ce = p.value.length;
      if (["Enter", "ArrowDown", "ArrowUp"].includes(N.key) && N.preventDefault(), ["Enter", "ArrowDown"].includes(N.key) && (F.value = !0), ["Escape"].includes(N.key) && (F.value = !1), A.value && ["Enter", "Tab"].includes(N.key) && !p.value.some((Oe) => {
        let {
          value: $e
        } = Oe;
        return $e === w.value[0].value;
      }) && me(w.value[0]), N.key === "ArrowDown" && A.value && ((Ce = W.value) == null || Ce.focus("next")), ["Backspace", "Delete"].includes(N.key)) {
        if (!e.multiple && h.value && p.value.length > 0 && !y.value) return me(p.value[0], !1);
        if (~r.value) {
          N.preventDefault();
          const Oe = r.value;
          me(p.value[r.value], !1), r.value = Oe >= ce - 1 ? ce - 2 : Oe;
        } else N.key === "Backspace" && !y.value && (r.value = ce - 1);
        return;
      }
      if (e.multiple)
        if (N.key === "ArrowLeft") {
          if (r.value < 0 && Z && Z > 0) return;
          const Oe = r.value > -1 ? r.value - 1 : ce - 1;
          if (p.value[Oe])
            r.value = Oe;
          else {
            const $e = ((_e = y.value) == null ? void 0 : _e.length) ?? null;
            r.value = -1, (De = l.value) == null || De.setSelectionRange($e, $e);
          }
        } else if (N.key === "ArrowRight") {
          if (r.value < 0) return;
          const Oe = r.value + 1;
          p.value[Oe] ? r.value = Oe : (r.value = -1, (Te = l.value) == null || Te.setSelectionRange(0, 0));
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
      (N == null || N === "" && !e.multiple && !h.value) && (p.value = []);
    }
    const re = ee(!1);
    function me(N) {
      let Z = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!(!N || N.props.disabled))
        if (e.multiple) {
          const ce = p.value.findIndex((Ce) => (e.valueComparator || it)(Ce.value, N.value)), ge = Z ?? !~ce;
          if (~ce) {
            const Ce = ge ? [...p.value, N] : [...p.value];
            Ce.splice(ce, 1), p.value = Ce;
          } else ge && (p.value = [...p.value, N]);
          e.clearOnSelect && (y.value = "");
        } else {
          const ce = Z !== !1;
          p.value = ce ? [N] : [], y.value = ce && !h.value ? N.title : "", Ae(() => {
            F.value = !1, i.value = !0;
          });
        }
    }
    return Q(o, (N, Z) => {
      var ce;
      N !== Z && (N ? (re.value = !0, y.value = e.multiple || h.value ? "" : String(((ce = p.value.at(-1)) == null ? void 0 : ce.props.title) ?? ""), i.value = !0, Ae(() => re.value = !1)) : (!e.multiple && y.value == null && (p.value = []), F.value = !1, (e.multiple || h.value) && (y.value = ""), r.value = -1));
    }), Q(y, (N) => {
      !o.value || re.value || (N && (F.value = !0), i.value = !N);
    }), Q(F, () => {
      if (!e.hideSelected && F.value && p.value.length) {
        const N = w.value.findIndex((Z) => p.value.some((ce) => Z.value === ce.value));
        He && window.requestAnimationFrame(() => {
          var Z;
          N >= 0 && ((Z = c.value) == null || Z.scrollToIndex(N));
        });
      }
    }), Q(() => e.items, (N, Z) => {
      F.value || o.value && !Z.length && N.length && (F.value = !0);
    }), ie(() => {
      const N = !!(!e.hideNoData || w.value.length || t["prepend-item"] || t["append-item"] || t["no-data"]), Z = p.value.length > 0, ce = rt.filterProps(e);
      return b(rt, L({
        ref: l
      }, ce, {
        modelValue: y.value,
        "onUpdate:modelValue": [(ge) => y.value = ge, X],
        focused: o.value,
        "onUpdate:focused": (ge) => o.value = ge,
        validationValue: p.externalValue,
        counterValue: g.value,
        dirty: Z,
        onChange: O,
        class: ["v-autocomplete", `v-autocomplete--${e.multiple ? "multiple" : "single"}`, {
          "v-autocomplete--active-menu": F.value,
          "v-autocomplete--chips": !!e.chips,
          "v-autocomplete--selection-slot": !!h.value,
          "v-autocomplete--selecting-index": r.value > -1
        }, e.class],
        style: e.style,
        readonly: T.isReadonly.value,
        placeholder: Z ? void 0 : e.placeholder,
        "onClick:clear": te,
        "onMousedown:control": ae,
        onKeydown: $
      }), {
        ...t,
        default: () => C(J, null, [b(pl, L({
          ref: u,
          modelValue: F.value,
          "onUpdate:modelValue": (ge) => F.value = ge,
          activator: "parent",
          contentClass: "v-autocomplete__content",
          disabled: _.value,
          eager: e.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: e.transition,
          onAfterEnter: U,
          onAfterLeave: he
        }, e.menuProps), {
          default: () => [N && b(ut, L({
            ref: W,
            selected: E.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: (ge) => ge.preventDefault(),
            onKeydown: B,
            onFocusin: le,
            onFocusout: se,
            tabindex: "-1",
            "aria-live": "polite",
            color: e.itemColor ?? e.color
          }, G, e.listProps), {
            default: () => {
              var ge, Ce, _e;
              return [(ge = t["prepend-item"]) == null ? void 0 : ge.call(t), !w.value.length && !e.hideNoData && (((Ce = t["no-data"]) == null ? void 0 : Ce.call(t)) ?? b(Ye, {
                key: "no-data",
                title: a(e.noDataText)
              }, null)), b(fo, {
                ref: c,
                renderless: !0,
                items: w.value,
                itemKey: "value"
              }, {
                default: (De) => {
                  var Il;
                  let {
                    item: Te,
                    index: Oe,
                    itemRef: $e
                  } = De;
                  const Pl = L(Te.props, {
                    ref: $e,
                    key: Te.value,
                    active: A.value && Oe === 0 ? !0 : void 0,
                    onClick: () => me(Te, null)
                  });
                  return ((Il = t.item) == null ? void 0 : Il.call(t, {
                    item: Te,
                    index: Oe,
                    props: Pl
                  })) ?? b(Ye, L(Pl, {
                    role: "option"
                  }), {
                    prepend: (Yt) => {
                      let {
                        isSelected: li
                      } = Yt;
                      return C(J, null, [e.multiple && !e.hideSelected ? b(pt, {
                        key: Te.value,
                        modelValue: li,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, Te.props.prependAvatar && b(Pt, {
                        image: Te.props.prependAvatar
                      }, null), Te.props.prependIcon && b(ke, {
                        icon: Te.props.prependIcon
                      }, null)]);
                    },
                    title: () => {
                      var Yt;
                      return i.value ? Te.title : tr("v-autocomplete", Te.title, (Yt = x(Te)) == null ? void 0 : Yt.title);
                    }
                  });
                }
              }), (_e = t["append-item"]) == null ? void 0 : _e.call(t)];
            }
          })]
        }), p.value.map((ge, Ce) => {
          function _e($e) {
            $e.stopPropagation(), $e.preventDefault(), me(ge, !1);
          }
          const De = {
            "onClick:close": _e,
            onKeydown($e) {
              $e.key !== "Enter" && $e.key !== " " || ($e.preventDefault(), $e.stopPropagation(), _e($e));
            },
            onMousedown($e) {
              $e.preventDefault(), $e.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, Te = P.value ? !!t.chip : !!t.selection, Oe = Te ? In(P.value ? t.chip({
            item: ge,
            index: Ce,
            props: De
          }) : t.selection({
            item: ge,
            index: Ce
          })) : void 0;
          if (!(Te && !Oe))
            return C("div", {
              key: ge.value,
              class: fe(["v-autocomplete__selection", Ce === r.value && ["v-autocomplete__selection--selected", f.value]]),
              style: Ve(Ce === r.value ? S.value : {})
            }, [P.value ? t.chip ? b(Fe, {
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
            }) : b(bl, L({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: ge.title,
              disabled: ge.props.disabled
            }, De), null) : Oe ?? C("span", {
              class: "v-autocomplete__selection-text"
            }, [ge.title, e.multiple && Ce < p.value.length - 1 && C("span", {
              class: "v-autocomplete__selection-comma"
            }, [Pe(",")])])]);
        })]),
        "append-inner": function() {
          var De, Te;
          for (var ge = arguments.length, Ce = new Array(ge), _e = 0; _e < ge; _e++)
            Ce[_e] = arguments[_e];
          return C(J, null, [(De = t["append-inner"]) == null ? void 0 : De.call(t, ...Ce), e.menuIcon ? b(ke, {
            class: "v-autocomplete__menu-icon",
            color: (Te = l.value) == null ? void 0 : Te.fieldIconColor,
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
  props: /* @__PURE__ */ Qa({
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
    const n = vt(), t = Ja(e, "modelValue"), a = q(null), l = q(""), o = e, i = ga(), s = ve("repos"), { state: u, query: c, fetch: r } = bi(o.repo, s, { save: !1 }), d = Qe([]);
    var m = null;
    async function v(g) {
      if (g) {
        const T = d.findIndex((k) => k.id == g);
        if (console.log(g, T), T != -1)
          a.value = d[T];
        else if (m != g) {
          console.log("fetch item..."), m = g;
          const x = (await r({ id: g })).entities[0];
          x.id == g ? (d.splice(0, 0, x), a.value = x) : a.value = null;
        }
      } else
        a.value = null;
      return a;
    }
    let f = null;
    const S = Ml.debounce(async ({ reset: g = !1 } = {}) => {
      if (u.isProcessing)
        return;
      const T = l.value != "<empty string>" && l.value || "";
      if (!g && T == f)
        return;
      f = T;
      const k = { ...o.filters, page_size: 20 };
      k[o.lookup] = T;
      let x = await r({ params: k });
      d.splice(0, d.length, ...x.entities), g || (a.value = null, console.log("item...", a.value, t.value), await v(t.value), l.value = T);
    }, 500);
    function y(g) {
      S({ reset: !0 });
    }
    function p(g) {
      g != "<empty string>" && g != f && S({ q: g });
    }
    return Ze(() => {
      S();
    }), Q(() => o.filters, (g, T) => {
      Ml.isEqual(Da(g), Da(T)) || y();
    }), Q(l, p), Q(t, (g, T) => g != T && v(g)), (g, T) => (D(), pe(J, null, [
      o.name ? (D(), pe("input", {
        key: 0,
        type: "hidden",
        name: o.name,
        value: t.value
      }, null, 8, nr)) : de("", !0),
      b(V(lr), L(V(i), {
        items: d,
        loading: V(u).isProcessing,
        modelValue: t.value,
        "onUpdate:modelValue": T[0] || (T[0] = (k) => t.value = k),
        search: l.value,
        "onUpdate:search": T[1] || (T[1] = (k) => l.value = k)
      }), kt({ _: 2 }, [
        Me(V(n), (k, x) => ({
          name: x,
          fn: M((w) => [
            j(g.$slots, x, Be(Ee(w)))
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
  ...wl()
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
    function d(_, R) {
      var F, z;
      !e.autofocus || !_ || (z = (F = R[0].target) == null ? void 0 : F.focus) == null || z.call(F);
    }
    const m = q(), v = q(), f = ee(""), S = q(), y = I(() => e.persistentPlaceholder || i.value || e.active);
    function p() {
      var _;
      S.value !== document.activeElement && ((_ = S.value) == null || _.focus()), i.value || s();
    }
    function g(_) {
      p(), a("click:control", _);
    }
    function T(_) {
      a("mousedown:control", _);
    }
    function k(_) {
      _.stopPropagation(), p(), Ae(() => {
        o.value = "", cl(e["onClick:clear"], _);
      });
    }
    function x(_) {
      var F;
      const R = _.target;
      if (o.value = R.value, (F = e.modelModifiers) != null && F.trim) {
        const z = [R.selectionStart, R.selectionEnd];
        Ae(() => {
          R.selectionStart = z[0], R.selectionEnd = z[1];
        });
      }
    }
    const w = q(), P = q(Number(e.rows)), h = I(() => ["plain", "underlined"].includes(e.variant));
    et(() => {
      e.autoGrow || (P.value = Number(e.rows));
    });
    function E() {
      e.autoGrow && Ae(() => {
        if (!w.value || !v.value) return;
        const _ = getComputedStyle(w.value), R = getComputedStyle(v.value.$el), F = parseFloat(_.getPropertyValue("--v-field-padding-top")) + parseFloat(_.getPropertyValue("--v-input-padding-top")) + parseFloat(_.getPropertyValue("--v-field-padding-bottom")), z = w.value.scrollHeight, W = parseFloat(_.lineHeight), G = Math.max(parseFloat(e.rows) * W + F, parseFloat(R.getPropertyValue("--v-input-control-height"))), te = parseFloat(e.maxRows) * W + F || 1 / 0, ae = Je(z ?? 0, G, te);
        P.value = Math.floor((ae - F) / W), f.value = ye(ae);
      });
    }
    Ze(E), Q(o, E), Q(() => e.rows, E), Q(() => e.maxRows, E), Q(() => e.density, E);
    let A;
    return Q(w, (_) => {
      _ ? (A = new ResizeObserver(E), A.observe(w.value)) : A == null || A.disconnect();
    }), dt(() => {
      A == null || A.disconnect();
    }), ie(() => {
      const _ = !!(l.counter || e.counter || e.counterValue), R = !!(_ || l.details), [F, z] = xa(t), {
        modelValue: W,
        ...G
      } = Tt.filterProps(e), te = ra.filterProps(e);
      return b(Tt, L({
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
          "v-input--plain-underlined": h.value
        }, e.class],
        style: e.style
      }, F, G, {
        centerAffix: P.value === 1 && !h.value,
        focused: i.value
      }), {
        ...l,
        default: (ae) => {
          let {
            id: ue,
            isDisabled: B,
            isDirty: $,
            isReadonly: O,
            isValid: U
          } = ae;
          return b(ra, L({
            ref: v,
            style: {
              "--v-textarea-control-height": f.value
            },
            onClick: g,
            onMousedown: T,
            "onClick:clear": k,
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"]
          }, te, {
            id: ue.value,
            active: y.value || $.value,
            centerAffix: P.value === 1 && !h.value,
            dirty: $.value || e.dirty,
            disabled: B.value,
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
                ref: S,
                class: le,
                value: o.value,
                onInput: x,
                autofocus: e.autofocus,
                readonly: O.value,
                disabled: B.value,
                placeholder: e.placeholder,
                rows: e.rows,
                name: e.name,
                onFocus: p,
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
          return C(J, null, [(ue = l.details) == null ? void 0 : ue.call(l, ae), _ && C(J, null, [C("span", null, null), b(vo, {
            active: e.persistentCounter || i.value,
            value: c.value,
            max: r.value,
            disabled: e.disabled
          }, l.counter)])]);
        } : void 0
      });
    }), yt({}, m, v, S);
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
        editor: e.editor
      }, () => [
        t.type == "select" ? (D(), Y(Sl, L({ key: 0 }, a.value, {
          modelValue: e.editor.value[t.name],
          "onUpdate:modelValue": o[0] || (o[0] = (s) => e.editor.value[t.name] = s)
        }), null, 16, ["modelValue"])) : t.type == "textarea" ? (D(), Y(ur, L({ key: 1 }, a.value, {
          modelValue: e.editor.value[t.name],
          "onUpdate:modelValue": o[1] || (o[1] = (s) => e.editor.value[t.name] = s)
        }), null, 16, ["modelValue"])) : t.type == "checkbox" ? (D(), Y(Ru, L({ key: 2 }, a.value, {
          modelValue: e.editor.value[t.name],
          "onUpdate:modelValue": o[2] || (o[2] = (s) => e.editor.value[t.name] = s)
        }), null, 16, ["modelValue"])) : t.type == "date" ? (D(), Y(i, L({ key: 3 }, a.value, {
          modelValue: e.editor.value[t.name],
          "onUpdate:modelValue": o[3] || (o[3] = (s) => e.editor.value[t.name] = s)
        }), null, 16, ["modelValue"])) : (D(), Y(rt, L({ key: 4 }, a.value, {
          modelValue: e.editor.value[t.name],
          "onUpdate:modelValue": o[4] || (o[4] = (s) => e.editor.value[t.name] = s),
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
      b(za, {
        dense: "",
        color: "transparent"
      }, {
        default: M(() => [
          b(Hn, {
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
          b(be, {
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
  ...Au()
}, "VForm"), Xa = ne()({
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
    const l = Bu(e), o = q();
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
  props: /* @__PURE__ */ Qa({
    useModel: Function,
    editable: Boolean
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    var c;
    const n = Ja(e, "modelValue"), t = ve("user"), a = q({}), l = e, o = I(() => ({
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
          (m = n.value) != null && m.length ? (D(!0), pe(J, { key: 0 }, Me(n.value, (v, f) => (D(), Y(Na, {
            key: f,
            value: f
          }, {
            activator: M(({ props: S }) => [
              b(Ye, L({ ref_for: !0 }, S), {
                append: M(() => [
                  C("div", {
                    onClick: d[0] || (d[0] = Ie(() => {
                    }, ["stop"]))
                  }, [
                    j(r.$slots, "item.actions", L({
                      item: v,
                      index: f
                    }, { ref_for: !0 }, S)),
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
                  b(_i, null, {
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
              b(Xa, {
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
            b(Na, { value: -1 }, {
              activator: M(({ props: v }) => [
                b(Ye, L(v, {
                  title: V(oe)("actions.add_item"),
                  "prepend-icon": "mdi-plus"
                }), null, 16, ["title"])
              ]),
              default: M(() => [
                b(Xa, null, {
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
    return ie(() => b(e.tag, {
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
      }, [t.prepend ? b(Fe, {
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
      }, t.prepend) : C(J, null, [e.prependAvatar && b(Pt, {
        key: "prepend-avatar",
        density: e.density,
        image: e.prependAvatar
      }, null), e.prependIcon && b(ke, {
        key: "prepend-icon",
        density: e.density,
        icon: e.prependIcon
      }, null)])]), C("div", {
        class: "v-card-item__content"
      }, [s && b(po, {
        key: "title"
      }, {
        default: () => {
          var r;
          return [((r = t.title) == null ? void 0 : r.call(t)) ?? Re(e.title)];
        }
      }), u && b(gr, {
        key: "subtitle"
      }, {
        default: () => {
          var r;
          return [((r = t.subtitle) == null ? void 0 : r.call(t)) ?? Re(e.subtitle)];
        }
      }), (c = t.default) == null ? void 0 : c.call(t)]), i && C("div", {
        key: "append",
        class: "v-card-item__append"
      }, [t.append ? b(Fe, {
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
      }, t.append) : C(J, null, [e.appendIcon && b(ke, {
        key: "append-icon",
        density: e.density,
        icon: e.appendIcon
      }, null), e.appendAvatar && b(Pt, {
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
    return ie(() => b(e.tag, {
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
  ...ul(),
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
    } = tl(e), {
      densityClasses: c
    } = Et(e), {
      dimensionStyles: r
    } = Ht(e), {
      elevationClasses: d
    } = ha(e), {
      loaderClasses: m
    } = il(e), {
      locationStyles: v
    } = Oi(e), {
      positionClasses: f
    } = cn(e), {
      roundedClasses: S
    } = Bt(e), y = gn(e, t);
    return ie(() => {
      const p = e.link !== !1 && y.isLink.value, g = !e.disabled && e.link !== !1 && (e.link || y.isClickable.value), T = p ? "a" : e.tag, k = !!(a.title || e.title != null), x = !!(a.subtitle || e.subtitle != null), w = k || x, P = !!(a.append || e.appendAvatar || e.appendIcon), h = !!(a.prepend || e.prependAvatar || e.prependIcon), E = !!(a.image || e.image), A = w || h || P, _ = !!(a.text || e.text != null);
      return Ke(b(T, L({
        class: ["v-card", {
          "v-card--disabled": e.disabled,
          "v-card--flat": e.flat,
          "v-card--hover": e.hover && !(e.disabled || e.flat),
          "v-card--link": g
        }, l.value, o.value, i.value, c.value, d.value, m.value, f.value, S.value, u.value, e.class],
        style: [s.value, r.value, v.value, e.style],
        onClick: g && y.navigate,
        tabindex: e.disabled ? -1 : void 0
      }, y.linkProps), {
        default: () => {
          var R;
          return [E && C("div", {
            key: "image",
            class: "v-card__image"
          }, [a.image ? b(Fe, {
            key: "image-defaults",
            disabled: !e.image,
            defaults: {
              VImg: {
                cover: !0,
                src: e.image
              }
            }
          }, a.image) : b(pa, {
            key: "image-img",
            cover: !0,
            src: e.image
          }, null)]), b(sl, {
            name: "v-card",
            active: !!e.loading,
            color: typeof e.loading == "boolean" ? void 0 : e.loading
          }, {
            default: a.loader
          }), A && b(hr, {
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
          }), _ && b(pr, {
            key: "text"
          }, {
            default: () => {
              var F;
              return [((F = a.text) == null ? void 0 : F.call(a)) ?? e.text];
            }
          }), (R = a.default) == null ? void 0 : R.call(a), a.actions && b(fr, null, {
            default: a.actions
          }), al(g, "v-card")];
        }
      }), [[Ct, g && e.ripple]]);
    }), {};
  }
}), Sr = ne()({
  name: "VSlideGroupItem",
  props: nl(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = ol(e, to);
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
        b(Mt, null, {
          default: M(() => [
            (D(!0), pe(J, null, Me(l.headers, (r, d) => (D(), Y(Sr, {
              key: r.value
            }, {
              default: M(({ selectedClass: m }) => [
                b(xr, {
                  width: "400",
                  class: fe(["ma-3", m]),
                  color: o(d),
                  lines: "two"
                }, {
                  default: M(() => [
                    b(po, null, {
                      default: M(() => [
                        Pe(Re(r.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    b(ut, {
                      "bg-color": o(d)
                    }, {
                      default: M(() => [
                        s.value && s.value[r.value] ? (D(!0), pe(J, { key: 0 }, Me(s.value[r.value], (v) => j(u.$slots, "item", {
                          key: v.id,
                          header: r,
                          item: v
                        }, () => [
                          b(Ye, {
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
    } = Vt((h) => {
      if (!h.length) return;
      const {
        target: E,
        contentRect: A
      } = h[0], _ = E.querySelector(".v-pagination__list > *");
      if (!_) return;
      const R = A.width, F = _.offsetWidth + parseFloat(getComputedStyle(_).marginRight) * 2;
      r.value = S(R, F);
    }), m = I(() => parseInt(e.length, 10)), v = I(() => parseInt(e.start, 10)), f = I(() => e.totalVisible != null ? parseInt(e.totalVisible, 10) : r.value >= 0 ? r.value : S(c.value, 58));
    function S(h, E) {
      const A = e.showFirstLastPage ? 5 : 3;
      return Math.max(0, Math.floor(
        // Round to two decimal places to avoid floating point errors
        Number(((h - E * A) / E).toFixed(2))
      ));
    }
    const y = I(() => {
      if (m.value <= 0 || isNaN(m.value) || m.value > Number.MAX_SAFE_INTEGER) return [];
      if (f.value <= 0) return [];
      if (f.value === 1) return [l.value];
      if (m.value <= f.value)
        return qt(m.value, v.value);
      const h = f.value % 2 === 0, E = h ? f.value / 2 : Math.floor(f.value / 2), A = h ? E : E + 1, _ = m.value - E;
      if (A - l.value >= 0)
        return [...qt(Math.max(1, f.value - 1), v.value), e.ellipsis, m.value];
      if (l.value - _ >= (h ? 1 : 0)) {
        const R = f.value - 1, F = m.value - R + v.value;
        return [v.value, e.ellipsis, ...qt(R, F)];
      } else {
        const R = Math.max(1, f.value - 2), F = R === 1 ? l.value : l.value - Math.ceil(R / 2) + v.value;
        return [v.value, e.ellipsis, ...qt(R, F), e.ellipsis, m.value];
      }
    });
    function p(h, E, A) {
      h.preventDefault(), l.value = E, A && a(A, E);
    }
    const {
      refs: g,
      updateRef: T
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
    const k = I(() => y.value.map((h, E) => {
      const A = (_) => T(_, E);
      if (typeof h == "string")
        return {
          isActive: !1,
          key: `ellipsis-${E}`,
          page: h,
          props: {
            ref: A,
            ellipsis: !0,
            icon: !0,
            disabled: !0
          }
        };
      {
        const _ = h === l.value;
        return {
          isActive: _,
          key: h,
          page: i(h),
          props: {
            ref: A,
            ellipsis: !1,
            icon: !0,
            disabled: !!e.disabled || Number(e.length) < 2,
            color: _ ? e.activeColor : e.color,
            "aria-current": _,
            "aria-label": o(_ ? e.currentPageAriaLabel : e.pageAriaLabel, h),
            onClick: (R) => p(R, h)
          }
        };
      }
    })), x = I(() => {
      const h = !!e.disabled || l.value <= v.value, E = !!e.disabled || l.value >= v.value + m.value - 1;
      return {
        first: e.showFirstLastPage ? {
          icon: s.value ? e.lastIcon : e.firstIcon,
          onClick: (A) => p(A, v.value, "first"),
          disabled: h,
          "aria-label": o(e.firstAriaLabel),
          "aria-disabled": h
        } : void 0,
        prev: {
          icon: s.value ? e.nextIcon : e.prevIcon,
          onClick: (A) => p(A, l.value - 1, "prev"),
          disabled: h,
          "aria-label": o(e.previousAriaLabel),
          "aria-disabled": h
        },
        next: {
          icon: s.value ? e.prevIcon : e.nextIcon,
          onClick: (A) => p(A, l.value + 1, "next"),
          disabled: E,
          "aria-label": o(e.nextAriaLabel),
          "aria-disabled": E
        },
        last: e.showFirstLastPage ? {
          icon: s.value ? e.firstIcon : e.lastIcon,
          onClick: (A) => p(A, v.value + m.value - 1, "last"),
          disabled: E,
          "aria-label": o(e.lastAriaLabel),
          "aria-disabled": E
        } : void 0
      };
    });
    function w() {
      var E;
      const h = l.value - v.value;
      (E = g.value[h]) == null || E.$el.focus();
    }
    function P(h) {
      h.key === Rl.left && !e.disabled && l.value > Number(e.start) ? (l.value = l.value - 1, Ae(w)) : h.key === Rl.right && !e.disabled && l.value < v.value + m.value - 1 && (l.value = l.value + 1, Ae(w));
    }
    return ie(() => b(e.tag, {
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
      }, [t.first ? t.first(x.value.first) : b(be, L({
        _as: "VPaginationBtn"
      }, x.value.first), null)]), C("li", {
        key: "prev",
        class: "v-pagination__prev",
        "data-test": "v-pagination-prev"
      }, [t.prev ? t.prev(x.value.prev) : b(be, L({
        _as: "VPaginationBtn"
      }, x.value.prev), null)]), k.value.map((h, E) => C("li", {
        key: h.key,
        class: fe(["v-pagination__item", {
          "v-pagination__item--is-active": h.isActive
        }]),
        "data-test": "v-pagination-item"
      }, [t.item ? t.item(h) : b(be, L({
        _as: "VPaginationBtn"
      }, h.props), {
        default: () => [h.page]
      })])), C("li", {
        key: "next",
        class: "v-pagination__next",
        "data-test": "v-pagination-next"
      }, [t.next ? t.next(x.value.next) : b(be, L({
        _as: "VPaginationBtn"
      }, x.value.next), null)]), e.showFirstLastPage && C("li", {
        key: "last",
        class: "v-pagination__last",
        "data-test": "v-pagination-last"
      }, [t.last ? t.last(x.value.last) : b(be, L({
        _as: "VPaginationBtn"
      }, x.value.last), null)])])]
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
const kl = K({
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
  props: kl(),
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
      }, [a(e.itemsPerPageText)]), b(Sl, {
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
      }, [b(en, L({
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
  return b(a, {
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
}), Tr = K({
  headers: Array
}, "DataTable-header"), Vo = Symbol.for("vuetify:data-table-headers"), Co = {
  title: "",
  sortable: !1
}, Ar = {
  ...Co,
  width: 48
};
function Br() {
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
function Za(e) {
  let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  if (!e.children)
    n.push(e);
  else
    for (const t of e.children)
      Za(t, n);
  return n;
}
function Po(e) {
  let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : /* @__PURE__ */ new Set();
  for (const t of e)
    t.key && n.add(t.key), t.children && Po(t.children, n);
  return n;
}
function Er(e) {
  if (e.key) {
    if (e.key === "data-table-group") return Co;
    if (["data-table-expand", "data-table-select"].includes(e.key)) return Ar;
  }
}
function Vl(e) {
  let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return e.children ? Math.max(n, ...e.children.map((t) => Vl(t, n + 1))) : n;
}
function _r(e) {
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
  const l = Br(e);
  for (; l.size() > 0; ) {
    let i = l.count();
    const s = [];
    let u = 1;
    for (; i > 0; ) {
      const {
        element: c,
        priority: r
      } = l.dequeue(), d = n - a - Vl(c);
      if (s.push({
        ...c,
        rowspan: d ?? 1,
        colspan: c.children ? Za(c).length : 1
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
    columns: e.map((i) => Za(i)).flat(),
    headers: t
  };
}
function Io(e) {
  const n = [];
  for (const t of e) {
    const a = {
      ...Er(t),
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
function To(e, n) {
  const t = q([]), a = q([]), l = q({}), o = q({}), i = q({});
  et(() => {
    var S, y, p;
    const c = (e.headers || Object.keys(e.items[0] ?? {}).map((g) => ({
      key: g,
      title: fi(g)
    }))).slice(), r = Po(c);
    (S = n == null ? void 0 : n.groupBy) != null && S.value.length && !r.has("data-table-group") && c.unshift({
      key: "data-table-group",
      title: "Group"
    }), (y = n == null ? void 0 : n.showSelect) != null && y.value && !r.has("data-table-select") && c.unshift({
      key: "data-table-select"
    }), (p = n == null ? void 0 : n.showExpand) != null && p.value && !r.has("data-table-expand") && c.push({
      key: "data-table-expand"
    });
    const d = Io(c);
    _r(d);
    const m = Math.max(...d.map((g) => Vl(g))) + 1, v = $r(d, m);
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
}, Ao = {
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
    return Ao.select({
      items: t,
      value: n,
      selected: a
    });
  }
}, Bo = {
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
    return Bo.select({
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
}, "DataTable-select"), Eo = Symbol.for("vuetify:data-table-selection");
function _o(e, n) {
  let {
    allItems: t,
    currentPage: a
  } = n;
  const l = we(e, "modelValue", e.modelValue, (g) => new Set(Ne(g).map((T) => {
    var k;
    return ((k = t.value.find((x) => e.valueComparator(T, x.value))) == null ? void 0 : k.value) ?? T;
  })), (g) => [...g.values()]), o = I(() => t.value.filter((g) => g.selectable)), i = I(() => a.value.filter((g) => g.selectable)), s = I(() => {
    if (typeof e.selectStrategy == "object") return e.selectStrategy;
    switch (e.selectStrategy) {
      case "single":
        return Or;
      case "all":
        return Bo;
      case "page":
      default:
        return Ao;
    }
  }), u = ee(null);
  function c(g) {
    return Ne(g).every((T) => l.value.has(T.value));
  }
  function r(g) {
    return Ne(g).some((T) => l.value.has(T.value));
  }
  function d(g, T) {
    const k = s.value.select({
      items: g,
      value: T,
      selected: new Set(l.value)
    });
    l.value = k;
  }
  function m(g, T, k) {
    const x = [];
    if (T = T ?? a.value.findIndex((w) => w.value === g.value), e.selectStrategy !== "single" && (k != null && k.shiftKey) && u.value !== null) {
      const [w, P] = [u.value, T].sort((h, E) => h - E);
      x.push(...a.value.slice(w, P + 1).filter((h) => h.selectable));
    } else
      x.push(g), u.value = T;
    d(x, !c([g]));
  }
  function v(g) {
    const T = s.value.selectAll({
      value: g,
      allItems: o.value,
      currentPage: i.value,
      selected: new Set(l.value)
    });
    l.value = T;
  }
  const f = I(() => l.value.size > 0), S = I(() => {
    const g = s.value.allSelected({
      allItems: o.value,
      currentPage: i.value
    });
    return !!g.length && c(g);
  }), y = H(() => s.value.showSelectAll), p = {
    toggleSelect: m,
    select: d,
    selectAll: v,
    isSelected: c,
    isSomeSelected: r,
    someSelected: f,
    allSelected: S,
    showSelectAll: y,
    lastSelectedIndex: u,
    selectStrategy: s
  };
  return ze(Eo, p), p;
}
function Ca() {
  const e = ve(Eo);
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
      let f = la(i[1], m), S = la(s[1], m), y = i[0].raw, p = s[0].raw;
      if (v === "desc" && ([f, S] = [S, f], [y, p] = [p, y]), (u = a == null ? void 0 : a.sortRawFunctions) != null && u[m]) {
        const g = a.sortRawFunctions[m](y, p);
        if (g == null) continue;
        if (d = !0, g) return g;
      }
      if ((c = a == null ? void 0 : a.sortFunctions) != null && c[m]) {
        const g = a.sortFunctions[m](f, S);
        if (g == null) continue;
        if (d = !0, g) return g;
      }
      if (!d) {
        if (f instanceof Date && S instanceof Date)
          return f.getTime() - S.getTime();
        if ([f, S] = [f, S].map((g) => g != null ? g.toString().toLocaleLowerCase() : g), f !== S)
          return Xt(f) && Xt(S) ? 0 : Xt(f) ? -1 : Xt(S) ? 1 : !isNaN(f) && !isNaN(S) ? Number(f) - Number(S) : l.compare(f, S);
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
  ...ul()
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
    } = il(e);
    function f(E, A) {
      if (!(!(e.sticky || e.fixedHeader) && !E.fixed))
        return {
          position: "sticky",
          left: E.fixed ? ye(E.fixedOffset) : void 0,
          top: e.sticky || e.fixedHeader ? `calc(var(--v-table-header-height) * ${A})` : void 0
        };
    }
    function S(E, A) {
      E.key === "Enter" && !e.disableSort && l(A);
    }
    function y(E) {
      const A = o.value.find((_) => _.key === E.key);
      return A ? A.order === "asc" ? e.sortAscIcon : e.sortDescIcon : e.sortAscIcon;
    }
    const {
      backgroundColorClasses: p,
      backgroundColorStyles: g
    } = st(() => e.color), {
      displayClasses: T,
      mobile: k
    } = mt(e), x = I(() => ({
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
    }, T.value, v.value]), P = (E) => {
      let {
        column: A,
        x: _,
        y: R
      } = E;
      const F = A.key === "data-table-select" || A.key === "data-table-expand", z = L(e.headerProps ?? {}, A.headerProps ?? {});
      return b(da, L({
        tag: "th",
        align: A.align,
        class: [{
          "v-data-table__th--sortable": A.sortable && !e.disableSort,
          "v-data-table__th--sorted": i(A),
          "v-data-table__th--fixed": A.fixed
        }, ...w.value],
        style: {
          width: ye(A.width),
          minWidth: ye(A.minWidth),
          maxWidth: ye(A.maxWidth),
          ...f(A, R)
        },
        colspan: A.colspan,
        rowspan: A.rowspan,
        onClick: A.sortable ? () => l(A) : void 0,
        fixed: A.fixed,
        nowrap: A.nowrap,
        lastFixed: A.lastFixed,
        noPadding: F
      }, z, {
        onKeydown: (W) => A.sortable && S(W, A)
      }), {
        default: () => {
          var te;
          const W = `header.${A.key}`, G = {
            column: A,
            selectAll: c,
            isSorted: i,
            toggleSort: l,
            sortBy: o.value,
            someSelected: s.value,
            allSelected: u.value,
            getSortIcon: y
          };
          return t[W] ? t[W](G) : A.key === "data-table-select" ? ((te = t["header.data-table-select"]) == null ? void 0 : te.call(t, G)) ?? (r.value && b(pt, {
            modelValue: u.value,
            indeterminate: s.value && !u.value,
            "onUpdate:modelValue": c
          }, null)) : C("div", {
            class: "v-data-table-header__content"
          }, [C("span", null, [A.title]), A.sortable && !e.disableSort && b(ke, {
            key: "icon",
            class: "v-data-table-header__sort-icon",
            icon: y(A)
          }, null), e.multiSort && i(A) && C("div", {
            key: "badge",
            class: fe(["v-data-table-header__sort-badge", ...p.value]),
            style: Ve(g.value)
          }, [o.value.findIndex((ae) => ae.key === A.key) + 1])]);
        }
      });
    }, h = () => {
      const E = I(() => d.value.filter((_) => (_ == null ? void 0 : _.sortable) && !e.disableSort)), A = I(() => {
        if (d.value.find((R) => R.key === "data-table-select") != null)
          return u.value ? "$checkboxOn" : s.value ? "$checkboxIndeterminate" : "$checkboxOff";
      });
      return b(da, L({
        tag: "th",
        class: [...w.value],
        colspan: m.value.length + 1
      }, e.headerProps), {
        default: () => [C("div", {
          class: "v-data-table-header__content"
        }, [b(Sl, {
          chips: !0,
          class: "v-data-table__td-sort-select",
          clearable: !0,
          density: "default",
          items: E.value,
          label: a("$vuetify.dataTable.sortBy"),
          multiple: e.multiSort,
          variant: "underlined",
          "onClick:clear": () => o.value = [],
          appendIcon: A.value,
          "onClick:append": () => c(!u.value)
        }, {
          ...t,
          chip: (_) => {
            var R;
            return b(bl, {
              onClick: (R = _.item.raw) != null && R.sortable ? () => l(_.item.raw) : void 0,
              onMousedown: (F) => {
                F.preventDefault(), F.stopPropagation();
              }
            }, {
              default: () => [_.item.title, b(ke, {
                class: fe(["v-data-table__td-sort-icon", i(_.item.raw) && "v-data-table__td-sort-icon-active"]),
                icon: y(_.item.raw),
                size: "small"
              }, null)]
            });
          }
        })])]
      });
    };
    ie(() => k.value ? C("tr", null, [b(h, null, null)]) : C(J, null, [t.headers ? t.headers(x.value) : m.value.map((E, A) => C("tr", null, [E.map((_, R) => b(P, {
      column: _,
      x: R,
      y: A
    }, null))])), e.loading && C("tr", {
      class: "v-data-table-progress"
    }, [C("th", {
      colspan: d.value.length
    }, [b(sl, {
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
        const f = a(e.item) ? "$expand" : "$next", S = () => l(e.item);
        return ((m = t["data-table-group"]) == null ? void 0 : m.call(t, {
          item: e.item,
          count: r.value.length,
          props: {
            icon: f,
            onClick: S
          }
        })) ?? b(da, {
          class: "v-data-table-group-header-row__column"
        }, {
          default: () => [b(be, {
            size: "small",
            variant: "text",
            icon: f,
            onClick: S
          }, null), C("span", null, [e.item.value]), C("span", null, [Pe("("), r.value.length, Pe(")")])]
        });
      }
      if (d.key === "data-table-select") {
        const f = i(r.value), S = s(r.value) && !f, y = (p) => u(r.value, p);
        return ((v = t["data-table-select"]) == null ? void 0 : v.call(t, {
          props: {
            modelValue: f,
            indeterminate: S,
            "onUpdate:modelValue": y
          }
        })) ?? C("td", null, [b(pt, {
          modelValue: f,
          indeterminate: S,
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
      columns: S
    } = Va();
    ie(() => C("tr", {
      class: fe(["v-data-table__tr", {
        "v-data-table__tr--clickable": !!(e.onClick || e.onContextmenu || e.onDblclick)
      }, a.value]),
      onClick: e.onClick,
      onContextmenu: e.onContextmenu,
      onDblclick: e.onDblclick
    }, [e.item && S.value.map((y, p) => {
      const g = e.item, T = `item.${y.key}`, k = `header.${y.key}`, x = {
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
        index: x.index,
        item: x.item,
        internalItem: x.internalItem,
        value: x.value,
        column: y
      }) : e.cellProps, h = typeof y.cellProps == "function" ? y.cellProps({
        index: x.index,
        item: x.item,
        internalItem: x.internalItem,
        value: x.value
      }) : y.cellProps;
      return b(da, L({
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
      }, P, h), {
        default: () => {
          var A, _, R, F;
          if (y.key === "data-table-select")
            return ((A = t["item.data-table-select"]) == null ? void 0 : A.call(t, {
              ...x,
              props: {
                disabled: !g.selectable,
                modelValue: o([g]),
                onClick: Ie(() => i(g), ["stop"])
              }
            })) ?? b(pt, {
              disabled: !g.selectable,
              modelValue: o([g]),
              onClick: Ie((z) => i(g, e.index, z), ["stop"])
            }, null);
          if (y.key === "data-table-expand")
            return ((_ = t["item.data-table-expand"]) == null ? void 0 : _.call(t, {
              ...x,
              props: {
                icon: r(g) ? "$collapse" : "$expand",
                size: "small",
                variant: "text",
                onClick: Ie(() => d(g), ["stop"])
              }
            })) ?? b(be, {
              icon: r(g) ? "$collapse" : "$expand",
              size: "small",
              variant: "text",
              onClick: Ie(() => d(g), ["stop"])
            }, null);
          if (t[T] && !l.value) return t[T](x);
          const E = Re(x.value);
          return l.value ? C(J, null, [C("div", {
            class: "v-data-table__td-title"
          }, [((R = t[k]) == null ? void 0 : R.call(t, w)) ?? y.title]), C("div", {
            class: "v-data-table__td-value"
          }, [((F = t[T]) == null ? void 0 : F.call(t, x)) ?? E])]) : E;
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
      var f, S;
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
      }, [((S = a["no-data"]) == null ? void 0 : S.call(a)) ?? m(e.noDataText)])]) : C(J, null, [e.items.map((y, p) => {
        var k;
        if (y.type === "group") {
          const x = {
            index: p,
            item: y,
            columns: l.value,
            isExpanded: s,
            toggleExpand: i,
            isSelected: u,
            toggleSelect: c,
            toggleGroup: r,
            isGroupOpen: d
          };
          return a["group-header"] ? a["group-header"](x) : b(zr, L({
            key: `group-header_${y.id}`,
            item: y
          }, Ll(t, ":group-header", () => x)), a);
        }
        const g = {
          index: p,
          item: y.raw,
          internalItem: y,
          columns: l.value,
          isExpanded: s,
          toggleExpand: i,
          isSelected: u,
          toggleSelect: c
        }, T = {
          ...g,
          props: L({
            key: `item_${y.key ?? y.index}`,
            onClick: o.value ? () => {
              i(y);
            } : void 0,
            index: p,
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
          key: T.props.key
        }, [a.item ? a.item(T) : b(Kr, T.props, a), s(y) && ((k = a["expanded-row"]) == null ? void 0 : k.call(a, g))]);
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
    } = Et(e);
    return ie(() => b(e.tag, {
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
  ...Tr(),
  ...Gr(),
  ...Fr(),
  ...Rr(),
  ...Mo(),
  ...qo()
}, "DataTable"), qr = K({
  ...wo(),
  ...Qo(),
  ...yo(),
  ...kl()
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
    } = el(e), {
      columns: d,
      headers: m,
      sortFunctions: v,
      sortRawFunctions: f,
      filterFunctions: S
    } = To(e, {
      groupBy: l,
      showSelect: H(() => e.showSelect),
      showExpand: H(() => e.showExpand)
    }), {
      items: y
    } = Xo(e, d), p = H(() => e.search), {
      filteredItems: g
    } = ho(e, y, p, {
      transform: (X) => X.columns,
      customKeyFilter: S
    }), {
      toggleSort: T
    } = Fo({
      sortBy: o,
      multiSort: i,
      mustSort: s,
      page: u
    }), {
      sortByWithGroups: k,
      opened: x,
      extractRows: w,
      isGroupOpen: P,
      toggleGroup: h
    } = No({
      groupBy: l,
      sortBy: o,
      disableSort: r
    }), {
      sortedItems: E
    } = Mr(e, g, k, {
      transform: (X) => ({
        ...X.raw,
        ...X.columns
      }),
      sortFunctions: v,
      sortRawFunctions: f
    }), {
      flatItems: A
    } = Uo(E, l, x), _ = I(() => A.value.length), {
      startIndex: R,
      stopIndex: F,
      pageCount: z,
      setItemsPerPage: W
    } = ko({
      page: u,
      itemsPerPage: c,
      itemsLength: _
    }), {
      paginatedItems: G
    } = Ir({
      items: A,
      startIndex: R,
      stopIndex: F,
      itemsPerPage: c
    }), te = I(() => w(G.value)), {
      isSelected: ae,
      select: ue,
      selectAll: B,
      toggleSelect: $,
      someSelected: O,
      allSelected: U
    } = _o(e, {
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
      search: p
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
      toggleSort: T,
      setItemsPerPage: W,
      someSelected: O.value,
      allSelected: U.value,
      isSelected: ae,
      select: ue,
      selectAll: B,
      toggleSelect: $,
      isExpanded: he,
      toggleExpand: le,
      isGroupOpen: P,
      toggleGroup: h,
      items: te.value.map((X) => X.raw),
      internalItems: te.value,
      groupedItems: G.value,
      columns: d.value,
      headers: m.value
    }));
    return ie(() => {
      const X = ca.filterProps(e), re = va.filterProps(e), me = fa.filterProps(e), N = ma.filterProps(e);
      return b(ma, L({
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
          var Z, ce, ge, Ce, _e, De;
          return a.default ? a.default(se.value) : C(J, null, [(Z = a.colgroup) == null ? void 0 : Z.call(a, se.value), !e.hideDefaultHeader && C("thead", {
            key: "thead"
          }, [b(va, re, a)]), (ce = a.thead) == null ? void 0 : ce.call(a, se.value), !e.hideDefaultBody && C("tbody", null, [(ge = a["body.prepend"]) == null ? void 0 : ge.call(a, se.value), a.body ? a.body(se.value) : b(fa, L(t, me, {
            items: G.value
          }), a), (Ce = a["body.append"]) == null ? void 0 : Ce.call(a, se.value)]), (_e = a.tbody) == null ? void 0 : _e.call(a, se.value), (De = a.tfoot) == null ? void 0 : De.call(a, se.value)]);
        },
        bottom: () => a.bottom ? a.bottom(se.value) : !e.hideDefaultFooter && C(J, null, [b(Dt, null, null), b(ca, X, {
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
  ...kl()
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
    } = el(e), d = I(() => parseInt(e.itemsLength, 10)), {
      columns: m,
      headers: v
    } = To(e, {
      groupBy: l,
      showSelect: H(() => e.showSelect),
      showExpand: H(() => e.showExpand)
    }), {
      items: f
    } = Xo(e, m), {
      toggleSort: S
    } = Fo({
      sortBy: o,
      multiSort: i,
      mustSort: s,
      page: u
    }), {
      opened: y,
      isGroupOpen: p,
      toggleGroup: g,
      extractRows: T
    } = No({
      groupBy: l,
      sortBy: o,
      disableSort: r
    }), {
      pageCount: k,
      setItemsPerPage: x
    } = ko({
      page: u,
      itemsPerPage: c,
      itemsLength: d
    }), {
      flatItems: w
    } = Uo(f, l, y), {
      isSelected: P,
      select: h,
      selectAll: E,
      toggleSelect: A,
      someSelected: _,
      allSelected: R
    } = _o(e, {
      allItems: f,
      currentPage: f
    }), {
      isExpanded: F,
      toggleExpand: z
    } = Go(e), W = I(() => T(f.value));
    Zo({
      page: u,
      itemsPerPage: c,
      sortBy: o,
      groupBy: l,
      search: H(() => e.search)
    }), ze("v-data-table", {
      toggleSort: S,
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
      toggleSort: S,
      setItemsPerPage: x,
      someSelected: _.value,
      allSelected: R.value,
      isSelected: P,
      select: h,
      selectAll: E,
      toggleSelect: A,
      isExpanded: F,
      toggleExpand: z,
      isGroupOpen: p,
      toggleGroup: g,
      items: W.value.map((te) => te.raw),
      internalItems: W.value,
      groupedItems: w.value,
      columns: m.value,
      headers: v.value
    }));
    ie(() => {
      const te = ca.filterProps(e), ae = va.filterProps(e), ue = fa.filterProps(e), B = ma.filterProps(e);
      return b(ma, L({
        class: ["v-data-table", {
          "v-data-table--loading": e.loading
        }, e.class],
        style: e.style
      }, B, {
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
          }, [b(va, ae, a)]), (O = a.thead) == null ? void 0 : O.call(a, G.value), !e.hideDefaultBody && C("tbody", {
            class: "v-data-table__tbody",
            role: "rowgroup"
          }, [(U = a["body.prepend"]) == null ? void 0 : U.call(a, G.value), a.body ? a.body(G.value) : b(fa, L(t, ue, {
            items: w.value
          }), a), (he = a["body.append"]) == null ? void 0 : he.call(a, G.value)]), (le = a.tbody) == null ? void 0 : le.call(a, G.value), (se = a.tfoot) == null ? void 0 : se.call(a, G.value)]);
        },
        bottom: () => a.bottom ? a.bottom(G.value) : !e.hideDefaultFooter && C(J, null, [b(Dt, null, null), b(ca, te, {
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
        Me(V(t), (f, S) => ({
          name: S,
          fn: M((y) => [
            j(d.$slots, S, Be(Ee(y)))
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
            b(Dt),
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
}, Qr = { class: "text-right" }, Cl = {
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
      b(be, {
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
      b(V(Pa), { state: i }, {
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
        b(rt, {
          variant: "underlined",
          label: "Enter login",
          modelValue: l.username,
          "onUpdate:modelValue": r[0] || (r[0] = (d) => l.username = d),
          onKeyup: r[1] || (r[1] = Al(Ie((d) => t.value.focus(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue"]),
        b(rt, {
          variant: "underlined",
          ref: "password",
          label: "Enter password",
          modelValue: l.password,
          "onUpdate:modelValue": r[2] || (r[2] = (d) => l.password = d),
          type: o.value ? "text" : "password",
          "append-icon": o.value ? "mdi-eye" : "mdi-eye-off",
          "onClick:append": r[3] || (r[3] = (d) => o.value = !o.value),
          onKeyup: r[4] || (r[4] = Al(Ie((d) => u(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue", "type", "append-icon"]),
        C("div", ec, [
          j(c.$slots, "default", {
            value: l.password
          }, () => [
            l.username && l.password ? (D(), Y(Cl, {
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
      b(wn, { class: "ma-4" }, {
        default: M(() => [
          (D(), Y(La, {
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
          (D(), Y(La, {
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
            V(a) ? (D(), Y(Ya, {
              key: 0,
              modelValue: V(i).view,
              "onUpdate:modelValue": u[0] || (u[0] = (c) => V(i).view = c)
            }, {
              default: M(() => [
                (D(!0), pe(J, null, Me(V(a), (c, r) => (D(), Y(qa, {
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
      b(xu, {
        modelValue: t.value,
        "onUpdate:modelValue": s[0] || (s[0] = (u) => t.value = u)
      }, {
        default: M(() => [
          V(a).default ? j(i.$slots, "tab", { key: 0 }, () => [
            b(Ga, {
              text: n == null ? void 0 : n.title,
              value: "default"
            }, null, 8, ["text"])
          ]) : de("", !0),
          (D(!0), pe(J, null, Me(V(l), (u, c) => (D(), Y(Ga, { value: u }, {
            default: M(() => [
              j(i.$slots, c)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"]),
      b(gl, {
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
      j(c.$slots, "prepend", Be(Ee(u.value))),
      b(Xa, {
        ref_key: "form",
        ref: t,
        modelValue: V(o).valid,
        "onUpdate:modelValue": r[0] || (r[0] = (d) => V(o).valid = d),
        disabled: !s.value
      }, {
        default: M(() => [
          j(c.$slots, "default", Be(Ee(u.value)))
        ]),
        _: 3
      }, 8, ["modelValue", "disabled"]),
      j(c.$slots, "append", Be(Ee(u.value)))
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
        b(Fi, { class: "ox-model-edit" }, {
          default: M(() => [
            b(V(ai), L({
              ref_key: "modelEditor",
              ref: o
            }, l), {
              prepend: M((d) => [
                l.hideValidationBtn ? de("", !0) : (D(), pe("div", ac, [
                  j(u.$slots, "prepend", L(d, {
                    save: s,
                    reset: i
                  }), () => [
                    d.editable && d.edited ? (D(), Y(Cl, {
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
    const t = vt(), a = bt(t, "views.list."), l = bt(t, "item."), o = bt(t, "views.detail.edit."), i = I(() => !!Object.keys(o).length), s = sn("filters"), u = e, c = ve("context"), r = ve("user"), { panel: d, list: m, items: v, next: f, prev: S } = ve("panel") ?? Vi({ props: u }), y = d.panels;
    I(() => {
      var x;
      return c.user.can([d.model, (x = d.value) != null && x.id ? "change" : "add"]);
    });
    const { showFilters: p } = el(d), g = I(() => [
      ...u.headers,
      { key: "actions", title: oe("actions") }
    ]);
    function T(x) {
      x = new u.repo.use(x), d.show({ view: d.view, value: x }), m.load();
    }
    const k = I(() => ({
      panel: d,
      panels: y,
      list: m,
      items: v,
      context: c,
      saved: T,
      value: d.value
    }));
    return Q(() => Object.values(m.filters), () => m.load()), n({ list: m, panel: d, items: v, next: f, prev: S }), (x, w) => (D(), Y(ei, {
      name: u.name,
      title: V(d).title,
      icon: V(d).icon,
      state: V(m).state,
      index: u.index
    }, kt({
      "app-bar-right": M(() => [
        j(x.$slots, "app-bar-right", Be(Ee(k.value))),
        V(d).view.startsWith("list.") ? (D(), Y(Ol, {
          key: 0,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: M(() => [
            j(x.$slots, "nav.list", Be(Ee(k.value))),
            b(be, {
              title: V(oe)("actions.list.reload"),
              "aria-label": V(oe)("actions.list.reload"),
              onClick: w[0] || (w[0] = (P) => V(m).load())
            }, {
              default: M(() => [
                b(ke, null, {
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
              title: V(p) ? V(oe)("filters.hide") : V(oe)("filters.show"),
              "aria-label": V(p) ? V(oe)("filters.hide") : V(oe)("filters.show"),
              onClick: w[1] || (w[1] = (P) => p.value = !V(p)),
              active: V(p)
            }, {
              default: M(() => [
                b(ke, {
                  icon: s.value.icon
                }, null, 8, ["icon"])
              ]),
              _: 1
            }, 8, ["title", "aria-label", "active"])) : de("", !0)
          ]),
          _: 3
        })) : V(d).view.startsWith("detail.") && V(d).value ? (D(), Y(Ol, {
          key: 1,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: M(() => [
            j(x.$slots, "nav.detail", Be(Ee(k.value))),
            V(d).view == "detail.edit" && V(d).value ? (D(), Y(pl, { key: 0 }, {
              activator: M(({ props: P }) => [
                b(be, L({ "prepend-icon": "mdi-dots-vertical" }, P), {
                  default: M(() => [
                    Pe(Re(V(oe)("actions")), 1)
                  ]),
                  _: 2
                }, 1040)
              ]),
              default: M(() => [
                b(ut, null, {
                  default: M(() => [
                    j(x.$slots, "item.actions", {
                      value: V(d).value
                    })
                  ]),
                  _: 3
                })
              ]),
              _: 3
            })) : de("", !0),
            b(be, {
              disabled: !V(S),
              title: V(oe)("prev"),
              "aria-label": V(oe)("prev"),
              onClick: w[2] || (w[2] = Ie((P) => V(d).show({ view: V(d).view, value: V(S) }), ["stop"]))
            }, {
              default: M(() => [
                b(ke, { icon: "mdi-chevron-left" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"]),
            b(be, {
              disabled: !V(f),
              title: V(oe)("next"),
              "aria-label": V(oe)("next"),
              onClick: w[3] || (w[3] = Ie((P) => V(d).show({ view: V(d).view, value: V(f) }), ["stop"]))
            }, {
              default: M(() => [
                b(ke, { icon: "mdi-chevron-right" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"])
          ]),
          _: 3
        })) : de("", !0),
        b(Ri, {
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
              b(be, {
                value: "list.table",
                onClickCapture: w[4] || (w[4] = Ie((h) => V(d).show({ view: "list.table" }), ["stop"])),
                title: V(oe)("panels.nav.table"),
                "aria-label": V(oe)("panels.nav.table")
              }, {
                default: M(() => [
                  b(ke, null, {
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
                onClickCapture: w[5] || (w[5] = Ie((h) => V(d).show({ view: "list.cards" }), ["stop"])),
                title: V(oe)("panels.nav.cards"),
                "aria-label": V(oe)("panels.nav.cards")
              }, {
                default: M(() => [
                  b(ke, null, {
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
                onClickCapture: w[6] || (w[6] = Ie((h) => V(d).show({ view: "list.kanban" }), ["stop"])),
                title: V(oe)("panels.nav.kanban"),
                "aria-label": V(oe)("panels.nav.kanban")
              }, {
                default: M(() => [
                  b(ke, null, {
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
                onClickCapture: w[7] || (w[7] = Ie((h) => V(d).show({ view: "detail.edit", value: V(d).value }), ["stop"])),
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
                onClickCapture: w[8] || (w[8] = Ie((h) => V(d).create(), ["stop"])),
                title: V(oe)("panels.nav.add"),
                "aria-label": V(oe)("panels.nav.add")
              }, {
                default: M(() => [
                  b(ke, null, {
                    default: M(() => w[16] || (w[16] = [
                      Pe("mdi-plus-box")
                    ])),
                    _: 1,
                    __: [16]
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : de("", !0),
              j(x.$slots, "nav.views", Be(Ee(k.value)))
            ];
          }),
          _: 3
        }, 8, ["modelValue"]),
        j(x.$slots, "app-bar-end", Be(Ee(k.value)))
      ]),
      top: M(() => [
        u.warning ? (D(), Y($t, {
          key: 0,
          type: "warning",
          variant: "tonal",
          text: u.warning
        }, null, 8, ["text"])) : de("", !0),
        j(x.$slots, "top"),
        Ke(b(bo, {
          ref_key: "filters",
          ref: s,
          search: u.search,
          "teleport-to": "#panel-list-actions"
        }, {
          default: M((P) => [
            j(x.$slots, "list.filters", Be(Ee(P)))
          ]),
          _: 3
        }, 8, ["search"]), [
          [At, V(d).view.startsWith("list.") && V(p)]
        ])
      ]),
      _: 2
    }, [
      V(t)["append-title"] ? {
        name: "append-title",
        fn: M(() => [
          j(x.$slots, "append-title", Be(Ee(k.value)))
        ]),
        key: "0"
      } : void 0,
      V(t).prepend ? {
        name: "prepend",
        fn: M(() => [
          j(x.$slots, "prepend", Be(Ee(k.value)))
        ]),
        key: "1"
      } : void 0,
      V(t).append ? {
        name: "append",
        fn: M(() => [
          j(x.$slots, "append", Be(Ee(k.value)))
        ]),
        key: "2"
      } : void 0,
      V(t)["views.list.table"] ? void 0 : {
        name: "views.list.table",
        fn: M(() => [
          b(Jo, {
            headers: g.value,
            edit: i.value
          }, kt({ _: 2 }, [
            Me(V(l), (P, h) => ({
              name: h,
              fn: M((E) => [
                j(x.$slots, h, Be(Ee(E)))
              ])
            }))
          ]), 1032, ["headers", "edit"])
        ]),
        key: "3"
      },
      Me(V(a), (P, h) => ({
        name: h,
        fn: M(() => [
          j(x.$slots, h, Be(Ee(k.value)))
        ])
      })),
      i.value ? {
        name: "views.detail.edit",
        fn: M(() => [
          b(V(ti), {
            title: V(oe)(`models.${V(d).model.entity}`)
          }, kt({ _: 2 }, [
            Me(V(o), (P, h) => ({
              name: P,
              fn: M(() => [
                j(x.$slots, h, Be(Ee(k.value)))
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
  OxValidationBtn: Cl,
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
  Cl as OxValidationBtn,
  ti as OxView
};
//# sourceMappingURL=components.js.map
