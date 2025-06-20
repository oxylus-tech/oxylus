import { inject as ve, computed as A, ref as q, reactive as Qe, toRef as H, shallowRef as J, onMounted as Ze, provide as ze, useId as ct, onDeactivated as an, onActivated as ni, onBeforeUnmount as dt, createVNode as b, Transition as aa, mergeProps as L, defineComponent as We, useAttrs as Lt, createElementBlock as pe, createCommentVNode as de, unref as V, openBlock as D, Fragment as ee, createBlock as G, withModifiers as Ie, resolveComponent as ln, withCtx as M, createTextVNode as Pe, toDisplayString as Re, renderList as Me, watch as Q, watchEffect as et, onScopeDispose as Ue, readonly as nn, createElementVNode as C, nextTick as Te, mergeModels as Ja, useModel as el, renderSlot as Y, normalizeStyle as Ve, normalizeClass as fe, effectScope as on, toValue as Tl, toRaw as La, warn as oi, Teleport as Na, withDirectives as je, vShow as Tt, useSlots as pt, onErrorCaptured as ii, createSlots as kt, markRaw as si, onBeforeMount as ui, cloneVNode as ri, normalizeProps as $e, guardReactiveProps as Oe, h as ci, vModelText as di, onBeforeUpdate as vi, capitalize as fi, toRefs as tl, useTemplateRef as sn, withKeys as _l, onUnmounted as mi } from "vue";
import { useAction as gi, t as oe, filterSlots as ht, useAppContext as yi, usePanels as hi, useQuery as bi, defineAsyncComponent as pi, te as wi, rules as xi, tKeys as Si, useModelEditor as ki, useModelPanel as Vi } from "ox";
import { u as Vt, V as be, a as Ye, b as Ci, c as Ha, d as Nt, e as ya, f as st, g as ha, h as _t, i as un, j as ba, t as Pi, k as ie, l as pa, m as Fe, n as Ke, o as wt, p as Ht, q as Se, r as zt, s as ut, v as Ii, w as rn, x as Wt, y as Ut, z as Bl, A as Ia, B as Aa, C as El, D as $l, E as Kt, F as Ai, M as wa, G as cn, H as al, I as jt, J as dn, K as vn, L as ll, N as Ti, O as Gt, P as nl, Q as ol, R as il, S as Ol, T as ke, U as fn, W as Bt, X as vt, Y as Ct, Z as mn, _ as _i, $ as gn, a0 as yn, a1 as Pt, a2 as hn, a3 as bn, a4 as sl, a5 as ul, a6 as rl, a7 as la, a8 as pn, a9 as Bi, aa as Ei, ab as $i, ac as Oi, ad as wn, ae as $t, af as Fi, ag as Fl, ah as Ri } from "./VContainer-DbJPgM9n.js";
import { k as cl, l as xn, n as K, o as ye, q as lt, r as Mi, s as ne, C as Sn, u as qe, t as Je, v as Di, w as nt, x as Ge, y as ft, z as we, A as at, B as Le, E as Yt, F as kn, G as Li, H as it, J as Vn, i as He, K as Rl, M as It, N as Ni, O as mt, P as Cn, Q as ot, R as xe, S as za, U as Hi, V as Xe, W as xa, X as Ne, Y as dl, Z as Pn, _ as zi, $ as Wi, a0 as Ta, a1 as Ui, a2 as Ki, a3 as St, a4 as ji, a5 as In, a6 as na, a7 as Gi, c as Zt, a8 as Ml, a9 as Yi, aa as oa, ab as Qt } from "./theme-BVAWnHOc.js";
import { Q as qi, l as _a, N as Xi, E as Zi, t as Ba, S as Qi, o as Ji, r as es } from "./index-RW8_cbtd.js";
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
    const c = t.transformOrigin, r = n.x - s - (1 - o) * parseFloat(c), d = n.y - u - (1 - i) * parseFloat(c.slice(c.indexOf(" ") + 1)), f = o ? n.width / o : e.offsetWidth + 1, v = i ? n.height / i : e.offsetHeight + 1;
    return new tt({
      x: r,
      y: d,
      width: f,
      height: v
    });
  } else
    return new tt(n);
}
function yt(e, n, t) {
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
function ls(e, n) {
  Object.keys(n).forEach((t) => {
    if (cl(t)) {
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
function ns(e, n) {
  Object.keys(n).forEach((t) => {
    if (cl(t)) {
      const a = xn(t), l = ea.get(e);
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
function ia(e, n) {
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
  const l = J(!1);
  an(() => l.value = !0), ni(() => l.value = !1);
  const {
    layoutItemStyles: o,
    layoutItemScrimStyles: i
  } = n.register(a, {
    ...e,
    active: A(() => l.value ? !1 : e.active.value),
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
  const n = ve(Ft, null), t = A(() => n ? n.rootZIndex.value - 100 : Nl), a = q([]), l = Qe(/* @__PURE__ */ new Map()), o = Qe(/* @__PURE__ */ new Map()), i = Qe(/* @__PURE__ */ new Map()), s = Qe(/* @__PURE__ */ new Map()), u = Qe(/* @__PURE__ */ new Map()), {
    resizeRef: c,
    contentRect: r
  } = Vt(), d = A(() => {
    const w = /* @__PURE__ */ new Map(), P = e.overlaps ?? [];
    for (const h of P.filter((B) => B.includes(":"))) {
      const [B, T] = h.split(":");
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
  }), f = A(() => {
    const w = [...new Set([...i.values()].map((h) => h.value))].sort((h, B) => h - B), P = [];
    for (const h of w) {
      const B = a.value.filter((T) => {
        var E;
        return ((E = i.get(T)) == null ? void 0 : E.value) === h;
      });
      P.push(...B);
    }
    return cs(P, l, o, s);
  }), v = A(() => !Array.from(u.values()).some((w) => w.value)), m = A(() => f.value[f.value.length - 1].layer), k = H(() => ({
    "--v-layout-left": ye(m.value.left),
    "--v-layout-right": ye(m.value.right),
    "--v-layout-top": ye(m.value.top),
    "--v-layout-bottom": ye(m.value.bottom),
    ...v.value ? void 0 : {
      transition: "none"
    }
  })), y = A(() => f.value.slice(1).map((w, P) => {
    let {
      id: h
    } = w;
    const {
      layer: B
    } = f.value[P], T = o.get(h), E = l.get(h);
    return {
      id: h,
      ...B,
      size: Number(T.value),
      position: E.value
    };
  })), p = (w) => y.value.find((P) => P.id === w), g = lt("createLayout"), I = J(!1);
  Ze(() => {
    I.value = !0;
  }), ze(Ft, {
    register: (w, P) => {
      let {
        id: h,
        order: B,
        position: T,
        layoutSize: E,
        elementSize: R,
        active: F,
        disableTransitions: z,
        absolute: W
      } = P;
      i.set(h, B), l.set(h, T), o.set(h, E), s.set(h, F), z && u.set(h, z);
      const te = Mi(Bn, g == null ? void 0 : g.vnode).indexOf(w);
      te > -1 ? a.value.splice(te, 0, h) : a.value.push(h);
      const ae = A(() => y.value.findIndex((O) => O.id === h)), ue = A(() => t.value + f.value.length * 2 - ae.value * 2), _ = A(() => {
        const O = T.value === "left" || T.value === "right", U = T.value === "right", he = T.value === "bottom", le = R.value ?? E.value, se = le === 0 ? "%" : "px", X = {
          [T.value]: 0,
          zIndex: ue.value,
          transform: `translate${O ? "X" : "Y"}(${(F.value ? 0 : -(le === 0 ? 100 : le)) * (U || he ? -1 : 1)}${se})`,
          position: W.value || t.value !== Nl ? "absolute" : "fixed",
          ...v.value ? void 0 : {
            transition: "none"
          }
        };
        if (!I.value) return X;
        const re = y.value[ae.value];
        if (!re) throw new Error(`[Vuetify] Could not find layout item "${h}"`);
        const me = d.value.get(h);
        return me && (re[me.position] += me.amount), {
          ...X,
          height: O ? `calc(100% - ${re.top}px - ${re.bottom}px)` : R.value ? `${R.value}px` : void 0,
          left: U ? void 0 : `${re.left}px`,
          right: U ? `${re.right}px` : void 0,
          top: T.value !== "bottom" ? `${re.top}px` : void 0,
          bottom: T.value !== "top" ? `${re.bottom}px` : void 0,
          width: O ? R.value ? `${R.value}px` : void 0 : `calc(100% - ${re.left}px - ${re.right}px)`
        };
      }), $ = A(() => ({
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
    mainRect: m,
    mainStyles: k,
    getLayoutItem: p,
    items: y,
    layoutRect: r,
    rootZIndex: t
  });
  const x = H(() => ["v-layout", {
    "v-layout--full-height": e.fullHeight
  }]), S = H(() => ({
    zIndex: n ? t.value : void 0,
    position: n ? "relative" : void 0,
    overflow: n ? "hidden" : void 0
  }));
  return {
    layoutClasses: x,
    layoutStyles: S,
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
        await new Promise((m) => requestAnimationFrame(m)), await new Promise((m) => requestAnimationFrame(m)), l.style.visibility = "";
        const i = zl(e.target, l), {
          x: s,
          y: u,
          sx: c,
          sy: r,
          speed: d
        } = i;
        Ea.set(l, i);
        const f = yt(l, [{
          transform: `translate(${s}px, ${u}px) scale(${c}, ${r})`,
          opacity: 0
        }, {}], {
          duration: 225 * d,
          easing: os
        });
        (v = Hl(l)) == null || v.forEach((m) => {
          yt(m, [{
            opacity: 0
          }, {
            opacity: 0,
            offset: 0.33
          }, {}], {
            duration: 225 * 2 * d,
            easing: Ot
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
        await new Promise((m) => requestAnimationFrame(m));
        let i;
        !Ea.has(l) || Array.isArray(e.target) || e.target.offsetParent || e.target.getClientRects().length ? i = zl(e.target, l) : i = Ea.get(l);
        const {
          x: s,
          y: u,
          sx: c,
          sy: r,
          speed: d
        } = i;
        yt(l, [{}, {
          transform: `translate(${s}px, ${u}px) scale(${c}, ${r})`,
          opacity: 0
        }], {
          duration: 125 * d,
          easing: is
        }).finished.then(() => o()), (v = Hl(l)) == null || v.forEach((m) => {
          yt(m, [{}, {
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
    return () => e.target ? b(aa, L({
      name: "dialog-transition"
    }, a, {
      css: !1
    }), t) : b(aa, {
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
  const t = An(e), a = vl(n), [l, o] = getComputedStyle(n).transformOrigin.split(" ").map((p) => parseFloat(p)), [i, s] = getComputedStyle(n).getPropertyValue("--v-overlay-anchor-origin").split(" ");
  let u = t.left + t.width / 2;
  i === "left" || s === "left" ? u -= t.width / 2 : (i === "right" || s === "right") && (u += t.width / 2);
  let c = t.top + t.height / 2;
  i === "top" || s === "top" ? c -= t.height / 2 : (i === "bottom" || s === "bottom") && (c += t.height / 2);
  const r = t.width / a.width, d = t.height / a.height, f = Math.max(1, r, d), v = r / f || 0, m = d / f || 0, k = a.width * a.height / (window.innerWidth * window.innerHeight), y = k > 0.12 ? Math.min(1.5, (k - 0.12) * 10 + 1) : 1;
  return {
    x: u - (l + a.left),
    y: c - (o + a.top),
    sx: v,
    sy: m,
    speed: y
  };
}
const Rt = /* @__PURE__ */ We({
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
    const t = e, a = Lt(), l = n, o = ve("user"), { run: i, processing: s, allowed: u } = gi({ user: o, emits: l, props: t });
    return (c, r) => V(u) ? (D(), pe(ee, { key: 0 }, [
      t.button ? (D(), G(be, L({
        key: 0,
        variant: "text"
      }, V(a), {
        disabled: V(s),
        color: t.color,
        icon: t.icon,
        title: t.title,
        "aria-label": t.title,
        onClick: Ie(V(i), ["stop"])
      }), null, 16, ["disabled", "color", "icon", "title", "aria-label", "onClick"])) : (D(), G(Ye, L({ key: 1 }, V(a), {
        title: t.title,
        "base-color": t.color,
        "prepend-icon": t.icon,
        disabled: V(s),
        onClick: Ie(V(i), ["stop"])
      }), null, 16, ["title", "base-color", "prepend-icon", "disabled", "onClick"]))
    ], 64)) : de("", !0);
  }
}), fs = /* @__PURE__ */ We({
  __name: "OxActionModelDelete",
  props: {
    item: {}
  },
  setup(e) {
    const n = ve("panel"), t = ve("repos"), a = Lt(), l = e;
    async function o(i, s) {
      return await t[s.constructor.entity].api().delete(s.$url(), { delete: l.item.id });
    }
    return (i, s) => (D(), G(Rt, L(V(a), {
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
}), ms = /* @__PURE__ */ We({
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
    const n = Lt(), t = e;
    async function a(l, o) {
      const i = t.repo.api();
      return await i[t.method].apply(i, [o.$url(t.path), t.data, t.options]);
    }
    return (l, o) => (D(), G(V(Rt), L(V(n), { run: a }), null, 16));
  }
}), gs = /* @__PURE__ */ We({
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
    A(() => !n.auto || panel.name == n.name);
    function l(i) {
      return i.permissions && !t.can(i.permissions) ? !1 : i.items ? i.items.some((s) => l(s)) : !0;
    }
    function o() {
      const i = { panel: n.name, href: n.url };
      a.show(i);
    }
    return (i, s) => {
      const u = ln("ox-app-nav-item", !0);
      return l(n) ? (D(), pe(ee, { key: 0 }, [
        n.type == "subheader" ? (D(), pe(ee, { key: 0 }, [
          b(Ci, null, {
            default: M(() => [
              Pe(Re(n.title), 1)
            ]),
            _: 1
          }),
          n.items ? (D(!0), pe(ee, { key: 0 }, Me(n.items, (c) => (D(), G(u, L({ ref_for: !0 }, c), null, 16))), 256)) : de("", !0)
        ], 64)) : n.type == "group" ? (D(), G(Ha, {
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
            (D(!0), pe(ee, null, Me(n.items, (c, r) => (D(), G(u, L({
              key: r,
              ref_for: !0
            }, c), null, 16))), 128))
          ]),
          _: 1
        }, 8, ["value"])) : n.type == "divider" ? (D(), G(Nt, { key: 2 })) : (D(), G(Ye, {
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
  const l = J(!1), o = J(0), i = A(() => {
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
    const c = s > window.scrollY ? "up" : "down", r = n.value.getBoundingClientRect(), d = parseFloat(a.value.top ?? 0), f = window.scrollY - Math.max(0, o.value - d), v = r.height + Math.max(o.value, d) - window.scrollY - window.innerHeight, m = parseFloat(getComputedStyle(n.value).getPropertyValue("--v-body-scroll-y")) || 0;
    r.height < window.innerHeight - d ? (l.value = "top", o.value = d) : c === "up" && l.value === "bottom" || c === "down" && l.value === "top" ? (o.value = window.scrollY + r.top - m, l.value = !0) : c === "down" && v <= 0 ? (o.value = 0, l.value = "bottom") : c === "up" && f <= 0 && (m ? l.value !== "top" && (o.value = -f + m + d, l.value = "top") : (o.value = r.top + f, l.value = "top")), s = window.scrollY;
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
        } = this, [f, v] = [Math.abs(r), Math.abs(d)];
        return f > v && r >= 0 ? "right" : f > v && r <= 0 ? "left" : v > f && d >= 0 ? "down" : v > f && d <= 0 ? "up" : ws();
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
    }), window.addEventListener("touchmove", I, {
      passive: !1
    }), window.addEventListener("touchend", x, {
      passive: !0
    });
  }), dt(() => {
    window.removeEventListener("touchstart", g), window.removeEventListener("touchmove", I), window.removeEventListener("touchend", x);
  });
  const s = A(() => ["left", "right"].includes(i.value)), {
    addMovement: u,
    endTouch: c,
    getVelocity: r
  } = ps();
  let d = !1;
  const f = J(!1), v = J(0), m = J(0);
  let k;
  function y(w, P) {
    return (i.value === "left" ? w : i.value === "right" ? document.documentElement.clientWidth - w : i.value === "top" ? w : i.value === "bottom" ? document.documentElement.clientHeight - w : xt()) - (P ? l.value : 0);
  }
  function p(w) {
    let P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    const h = i.value === "left" ? (w - m.value) / l.value : i.value === "right" ? (document.documentElement.clientWidth - w - m.value) / l.value : i.value === "top" ? (w - m.value) / l.value : i.value === "bottom" ? (document.documentElement.clientHeight - w - m.value) / l.value : xt();
    return P ? Je(h) : h;
  }
  function g(w) {
    if (o.value) return;
    const P = w.changedTouches[0].clientX, h = w.changedTouches[0].clientY, B = 25, T = i.value === "left" ? P < B : i.value === "right" ? P > document.documentElement.clientWidth - B : i.value === "top" ? h < B : i.value === "bottom" ? h > document.documentElement.clientHeight - B : xt(), E = t.value && (i.value === "left" ? P < l.value : i.value === "right" ? P > document.documentElement.clientWidth - l.value : i.value === "top" ? h < l.value : i.value === "bottom" ? h > document.documentElement.clientHeight - l.value : xt());
    (T || E || t.value && a.value) && (k = [P, h], m.value = y(s.value ? P : h, t.value), v.value = p(s.value ? P : h), d = m.value > -20 && m.value < 80, c(w), u(w));
  }
  function I(w) {
    const P = w.changedTouches[0].clientX, h = w.changedTouches[0].clientY;
    if (d) {
      if (!w.cancelable) {
        d = !1;
        return;
      }
      const T = Math.abs(P - k[0]), E = Math.abs(h - k[1]);
      (s.value ? T > E && T > 3 : E > T && E > 3) ? (f.value = !0, d = !1) : (s.value ? E : T) > 3 && (d = !1);
    }
    if (!f.value) return;
    w.preventDefault(), u(w);
    const B = p(s.value ? P : h, !1);
    v.value = Math.max(0, Math.min(1, B)), B > 1 ? m.value = y(s.value ? P : h, !0) : B < 0 && (m.value = y(s.value ? P : h, !1));
  }
  function x(w) {
    if (d = !1, !f.value) return;
    u(w), f.value = !1;
    const P = r(w.changedTouches[0].identifier), h = Math.abs(P.x), B = Math.abs(P.y);
    (s.value ? h > B && h > 400 : B > h && B > 3) ? t.value = P.direction === ({
      left: "right",
      right: "left",
      top: "down",
      bottom: "up"
    }[i.value] || xt()) : t.value = v.value > 0.5;
  }
  const S = A(() => f.value ? {
    transform: i.value === "left" ? `translateX(calc(-100% + ${v.value * l.value}px))` : i.value === "right" ? `translateX(calc(100% - ${v.value * l.value}px))` : i.value === "top" ? `translateY(calc(-100% + ${v.value * l.value}px))` : i.value === "bottom" ? `translateY(calc(100% - ${v.value * l.value}px))` : xt(),
    transition: "none"
  } : void 0);
  return qe(f, () => {
    var h, B;
    const w = ((h = n.value) == null ? void 0 : h.style.transform) ?? null, P = ((B = n.value) == null ? void 0 : B.style.transition) ?? null;
    et(() => {
      var T, E, R, F;
      (E = n.value) == null || E.style.setProperty("transform", ((T = S.value) == null ? void 0 : T.transform) || "none"), (F = n.value) == null || F.style.setProperty("transition", ((R = S.value) == null ? void 0 : R.transition) || null);
    }), Ue(() => {
      var T, E;
      (T = n.value) == null || T.style.setProperty("transform", w), (E = n.value) == null || E.style.setProperty("transition", P);
    });
  }), {
    isDragging: f,
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
function qt() {
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
  ...zt(),
  ...Se(),
  ...Rn(),
  ...Yt({
    mobile: null
  }),
  ...Ht(),
  ...En(),
  ...wt(),
  ...Ke({
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
    } = Ge(e), {
      borderClasses: s
    } = ya(e), {
      backgroundColorClasses: u,
      backgroundColorStyles: c
    } = st(() => e.color), {
      elevationClasses: r
    } = ha(e), {
      displayClasses: d,
      mobile: f
    } = ft(e), {
      roundedClasses: v
    } = _t(e), m = un(), k = we(e, "modelValue", null, (_) => !!_), {
      ssrBootStyles: y
    } = ba(), {
      scopeId: p
    } = qt(), g = q(), I = J(!1), {
      runOpenDelay: x,
      runCloseDelay: S
    } = Mn(e, (_) => {
      I.value = _;
    }), w = A(() => e.rail && e.expandOnHover && I.value ? Number(e.width) : Number(e.rail ? e.railWidth : e.width)), P = A(() => Pi(e.location, o.value)), h = H(() => e.persistent), B = A(() => !e.permanent && (f.value || e.temporary)), T = A(() => e.sticky && !B.value && P.value !== "bottom");
    qe(() => e.expandOnHover && e.rail != null, () => {
      Q(I, (_) => a("update:rail", !_));
    }), qe(() => !e.disableResizeWatcher, () => {
      Q(B, (_) => !e.permanent && Te(() => k.value = !_));
    }), qe(() => !e.disableRouteWatcher && !!m, () => {
      Q(m.currentRoute, () => B.value && (k.value = !1));
    }), Q(() => e.permanent, (_) => {
      _ && (k.value = !0);
    }), e.modelValue == null && !B.value && (k.value = e.permanent || !f.value);
    const {
      isDragging: E,
      dragProgress: R
    } = xs({
      el: g,
      isActive: k,
      isTemporary: B,
      width: w,
      touchless: H(() => e.touchless),
      position: P
    }), F = A(() => {
      const _ = B.value ? 0 : e.rail && e.expandOnHover ? Number(e.railWidth) : w.value;
      return E.value ? _ * R.value : _;
    }), {
      layoutItemStyles: z,
      layoutItemScrimStyles: W
    } = On({
      id: e.name,
      order: A(() => parseInt(e.order, 10)),
      position: P,
      layoutSize: F,
      elementSize: w,
      active: nn(k),
      disableTransitions: H(() => E.value),
      absolute: A(() => (
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        e.absolute || T.value && typeof j.value != "string"
      ))
    }), {
      isStuck: j,
      stickyStyles: te
    } = ys({
      rootEl: g,
      isSticky: T,
      layoutItemStyles: z
    }), ae = st(() => typeof e.scrim == "string" ? e.scrim : null), ue = A(() => ({
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
      return C(ee, null, [b(e.tag, L({
        ref: g,
        onMouseenter: x,
        onMouseleave: S,
        class: ["v-navigation-drawer", `v-navigation-drawer--${P.value}`, {
          "v-navigation-drawer--expand-on-hover": e.expandOnHover,
          "v-navigation-drawer--floating": e.floating,
          "v-navigation-drawer--is-hovering": I.value,
          "v-navigation-drawer--rail": e.rail,
          "v-navigation-drawer--temporary": B.value,
          "v-navigation-drawer--persistent": h.value,
          "v-navigation-drawer--active": k.value,
          "v-navigation-drawer--sticky": T.value
        }, i.value, u.value, s.value, d.value, r.value, v.value, e.class],
        style: [c.value, z.value, y.value, te.value, e.style]
      }, p, t), {
        default: () => {
          var $, O, U;
          return [_ && C("div", {
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
      }), b(aa, {
        name: "fade-transition"
      }, {
        default: () => [B.value && (E.value || k.value) && !!e.scrim && C("div", L({
          class: ["v-navigation-drawer__scrim", ae.backgroundColorClasses.value],
          style: [ue.value, ae.backgroundColorStyles.value],
          onClick: () => {
            h.value || (k.value = !1);
          }
        }, p), null)]
      })]);
    }), {
      isStuck: j
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
    const n = ve("panels"), t = el(e, "drawer"), a = q([]), l = e, o = A(() => (i(l.items), l.items));
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
    return (u, c) => (D(), G(Vs, {
      modelValue: t.value,
      "onUpdate:modelValue": c[1] || (c[1] = (r) => t.value = r),
      theme: "dark"
    }, {
      append: M(() => [
        b(ut, null, {
          default: M(() => [
            Y(u.$slots, "append")
          ]),
          _: 3
        })
      ]),
      default: M(() => [
        Y(u.$slots, "prepend"),
        b(ut, {
          opened: a.value,
          "onUpdate:opened": c[0] || (c[0] = (r) => a.value = r),
          density: "compact"
        }, {
          default: M(() => [
            (D(!0), pe(ee, null, Me(o.value, (r, d) => (D(), G(V(gs), L({
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
    const a = Ge(e), {
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
  ...Ke()
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
  ...zt(),
  ...Se(),
  ...Ht(),
  ...wt(),
  ...Ke({
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
    } = Ge(e), {
      rtlClasses: c
    } = nt(), r = J(!!(e.extended || (v = t.extension) != null && v.call(t))), d = A(() => parseInt(Number(e.height) + (e.density === "prominent" ? Number(e.height) : 0) - (e.density === "comfortable" ? 8 : 0) - (e.density === "compact" ? 16 : 0), 10)), f = A(() => r.value ? parseInt(Number(e.extensionHeight) + (e.density === "prominent" ? Number(e.extensionHeight) : 0) - (e.density === "comfortable" ? 4 : 0) - (e.density === "compact" ? 8 : 0), 10) : 0);
    return at({
      VBtn: {
        variant: "text"
      }
    }), ie(() => {
      var p;
      const m = !!(e.title || t.title), k = !!(t.image || e.image), y = (p = t.extension) == null ? void 0 : p.call(t);
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
        default: () => [k && C("div", {
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
            var g, I, x;
            return [C("div", {
              class: "v-toolbar__content",
              style: {
                height: ye(d.value)
              }
            }, [t.prepend && C("div", {
              class: "v-toolbar__prepend"
            }, [(g = t.prepend) == null ? void 0 : g.call(t)]), m && b(Ln, {
              key: "title",
              text: e.title
            }, {
              text: t.title
            }), (I = t.default) == null ? void 0 : I.call(t), t.append && C("div", {
              class: "v-toolbar__append"
            }, [(x = t.append) == null ? void 0 : x.call(t)])])];
          }
        }), b(Fe, {
          defaults: {
            VTabs: {
              height: ye(f.value)
            }
          }
        }, {
          default: () => [b(Ii, null, {
            default: () => [r.value && C("div", {
              class: "v-toolbar__extension",
              style: {
                height: ye(f.value)
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
  const o = q(null), i = J(0), s = J(0), u = J(0), c = J(!1), r = J(!1), d = A(() => Number(e.scrollThreshold)), f = A(() => Je((d.value - i.value) / d.value || 0)), v = () => {
    const m = o.value;
    if (!m || t && !t.value) return;
    a = i.value, i.value = "window" in m ? m.pageYOffset : m.scrollTop;
    const k = m instanceof Window ? document.documentElement.scrollHeight : m.scrollHeight;
    if (l !== k) {
      l = k;
      return;
    }
    r.value = i.value < a, u.value = Math.abs(i.value - d.value);
  };
  return Q(r, () => {
    s.value = s.value || i.value;
  }), Q(c, () => {
    s.value = 0;
  }), Ze(() => {
    Q(() => e.scrollTarget, (m) => {
      var y;
      const k = m ? document.querySelector(m) : window;
      if (!k) {
        kn(`Unable to locate element with identifier ${m}`);
        return;
      }
      k !== o.value && ((y = o.value) == null || y.removeEventListener("scroll", v), o.value = k, o.value.addEventListener("scroll", v, {
        passive: !0
      }));
    }, {
      immediate: !0
    });
  }), dt(() => {
    var m;
    (m = o.value) == null || m.removeEventListener("scroll", v);
  }), t && Q(t, v, {
    immediate: !0
  }), {
    scrollThreshold: d,
    currentScroll: i,
    currentThreshold: u,
    isScrollActive: c,
    scrollRatio: f,
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
    const a = q(), l = we(e, "modelValue"), o = A(() => {
      var I;
      const g = new Set(((I = e.scrollBehavior) == null ? void 0 : I.split(" ")) ?? []);
      return {
        hide: g.has("hide"),
        fullyHide: g.has("fully-hide"),
        inverted: g.has("inverted"),
        collapse: g.has("collapse"),
        elevate: g.has("elevate"),
        fadeImage: g.has("fade-image")
        // shrink: behavior.has('shrink'),
      };
    }), i = A(() => {
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
    }), d = H(() => o.value.hide || o.value.fullyHide), f = A(() => e.collapse || o.value.collapse && (o.value.inverted ? r.value > 0 : r.value === 0)), v = A(() => e.flat || o.value.fullyHide && !l.value || o.value.elevate && (o.value.inverted ? s.value > 0 : s.value === 0)), m = A(() => o.value.fadeImage ? o.value.inverted ? 1 - r.value : r.value : void 0), k = A(() => {
      var x, S;
      if (o.value.hide && o.value.inverted) return 0;
      const g = ((x = a.value) == null ? void 0 : x.contentHeight) ?? 0, I = ((S = a.value) == null ? void 0 : S.extensionHeight) ?? 0;
      return d.value ? s.value < u.value || o.value.fullyHide ? g + I : g : g + I;
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
      order: A(() => parseInt(e.order, 10)),
      position: H(() => e.location),
      layoutSize: k,
      elementSize: J(void 0),
      active: l,
      absolute: H(() => e.absolute)
    });
    return ie(() => {
      const g = Wa.filterProps(e);
      return b(Wa, L({
        ref: a,
        class: ["v-app-bar", {
          "v-app-bar--bottom": e.location === "bottom"
        }, e.class],
        style: [{
          ...p.value,
          "--v-toolbar-image-opacity": m.value,
          height: void 0,
          ...y.value
        }, e.style]
      }, g, {
        collapse: f.value,
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
  ...Ut(),
  ...Ke({
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
    } = Wt(e), {
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
function jl(e, n) {
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
    Q(() => e.locationStrategy, s), Ue(() => {
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
    const p = Bl(n.location, e.isRtl.value), g = n.origin === "overlap" ? p : n.origin === "auto" ? Ia(p) : Bl(n.origin, e.isRtl.value);
    return p.side === g.side && p.align === Aa(g).align ? {
      preferredAnchor: El(p),
      preferredOrigin: El(g)
    } : {
      preferredAnchor: p,
      preferredOrigin: g
    };
  }), [i, s, u, c] = ["minWidth", "minHeight", "maxWidth", "maxHeight"].map((p) => A(() => {
    const g = parseFloat(n[p]);
    return isNaN(g) ? 1 / 0 : g;
  })), r = A(() => {
    if (Array.isArray(n.offset))
      return n.offset;
    if (typeof n.offset == "string") {
      const p = n.offset.split(" ").map(parseFloat);
      return p.length < 2 && p.push(0), p;
    }
    return typeof n.offset == "number" ? [n.offset, 0] : [0, 0];
  });
  let d = !1, f = -1;
  const v = new Sn(4), m = new ResizeObserver(() => {
    if (!d) return;
    if (requestAnimationFrame((g) => {
      g !== f && v.clear(), requestAnimationFrame((I) => {
        f = I;
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
    let [I, x] = p, [S, w] = g;
    S && !Array.isArray(S) && m.unobserve(S), I && !Array.isArray(I) && m.observe(I), w && m.unobserve(w), x && m.observe(x);
  }, {
    immediate: !0
  }), Ue(() => {
    m.disconnect();
  });
  let k = new tt({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  function y() {
    if (d = !1, requestAnimationFrame(() => d = !0), !e.target.value || !e.contentEl.value) return;
    (Array.isArray(e.target.value) || e.target.value.offsetParent || e.target.value.getClientRects().length) && (k = An(e.target.value));
    const p = Ns(e.contentEl.value, e.isRtl.value), g = ia(e.contentEl.value), I = 12;
    g.length || (g.push(document.documentElement), e.contentEl.value.style.top && e.contentEl.value.style.left || (p.x -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0), p.y -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0)));
    const x = g.reduce((F, z) => {
      const W = as(z);
      return F ? new tt({
        x: Math.max(F.left, W.left),
        y: Math.max(F.top, W.top),
        width: Math.min(F.right, W.right) - Math.max(F.left, W.left),
        height: Math.min(F.bottom, W.bottom) - Math.max(F.top, W.top)
      }) : W;
    }, void 0);
    x.x += I, x.y += I, x.width -= I * 2, x.height -= I * 2;
    let S = {
      anchor: l.value,
      origin: o.value
    };
    function w(F) {
      const z = new tt(p), W = jl(F.anchor, k), j = jl(F.origin, z);
      let {
        x: te,
        y: ae
      } = Rs(W, j);
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
        overflows: Dl(z, x),
        x: te,
        y: ae
      };
    }
    let P = 0, h = 0;
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
      P += F, h += z, p.x += F, p.y += z;
      {
        const j = $l(S.anchor), te = W.x.before || W.x.after, ae = W.y.before || W.y.after;
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
            }, O = _ === "x" ? j === "y" ? Aa : Ia : j === "y" ? Ia : Aa;
            $.anchor = O($.anchor), $.origin = O($.origin);
            const {
              overflows: U
            } = w($);
            (U[_].before <= W[_].before && U[_].after <= W[_].after || U[_].before + U[_].after < (W[_].before + W[_].after) / 2) && (S = $, ue = T[_] = !0);
          }
        }), ue) continue;
      }
      W.x.before && (P += W.x.before, p.x += W.x.before), W.x.after && (P -= W.x.after, p.x -= W.x.after), W.y.before && (h += W.y.before, p.y += W.y.before), W.y.after && (h -= W.y.after, p.y -= W.y.after);
      {
        const j = Dl(p, x);
        B.x = x.width - j.x.before - j.x.after, B.y = x.height - j.y.before - j.y.after, P += j.x.before, p.x += j.x.before, h += j.y.before, p.y += j.y.before;
      }
      break;
    }
    const R = $l(S.anchor);
    return Object.assign(t.value, {
      "--v-overlay-anchor-origin": `${S.anchor.side} ${S.anchor.align}`,
      transformOrigin: `${S.origin.side} ${S.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: ye(Oa(h)),
      left: e.isRtl.value ? void 0 : ye(Oa(P)),
      right: e.isRtl.value ? ye(Oa(-P)) : void 0,
      minWidth: ye(R === "y" ? Math.min(i.value, k.width) : i.value),
      maxWidth: ye(Gl(Je(B.x, i.value === 1 / 0 ? 0 : i.value, u.value))),
      maxHeight: ye(Gl(Je(B.y, s.value === 1 / 0 ? 0 : s.value, c.value)))
    }), {
      available: B,
      contentBox: p,
      flipped: T
    };
  }
  return Q(() => [l.value, o.value, n.offset, n.minWidth, n.minHeight, n.maxWidth, n.maxHeight], () => y()), Te(() => {
    const p = y();
    if (!p) return;
    const {
      available: g,
      contentBox: I
    } = p;
    I.height > g.y && requestAnimationFrame(() => {
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
function Gl(e) {
  return Math.ceil(e * devicePixelRatio) / devicePixelRatio;
}
let Ua = !0;
const sa = [];
function zs(e) {
  !Ua || sa.length ? (sa.push(e), Ka()) : (Ua = !1, e(), Ka());
}
let Yl = -1;
function Ka() {
  cancelAnimationFrame(Yl), Yl = requestAnimationFrame(() => {
    const e = sa.shift();
    e && e(), sa.length ? Ka() : Ua = !0;
  });
}
const ta = {
  none: null,
  close: Ks,
  block: js,
  reposition: Gs
}, Ws = K({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (e) => typeof e == "function" || e in ta
  }
}, "VOverlay-scroll-strategies");
function Us(e, n) {
  if (!He) return;
  let t;
  et(async () => {
    t == null || t.stop(), n.isActive.value && e.scrollStrategy && (t = on(), await new Promise((a) => setTimeout(a)), t.active && t.run(() => {
      var a;
      typeof e.scrollStrategy == "function" ? e.scrollStrategy(n, e, t) : (a = ta[e.scrollStrategy]) == null || a.call(ta, n, e, t);
    }));
  }), Ue(() => {
    t == null || t.stop();
  });
}
function Ks(e) {
  function n(t) {
    e.isActive.value = !1;
  }
  Wn(e.targetEl.value ?? e.contentEl.value, n);
}
function js(e, n) {
  var i;
  const t = (i = e.root.value) == null ? void 0 : i.offsetParent, a = [.../* @__PURE__ */ new Set([...ia(e.targetEl.value, n.contained ? t : void 0), ...ia(e.contentEl.value, n.contained ? t : void 0)])].filter((s) => !s.classList.contains("v-overlay-scroll-blocked")), l = window.innerWidth - document.documentElement.offsetWidth, o = ((s) => fl(s) && s)(t || document.documentElement);
  o && e.root.value.classList.add("v-overlay--scroll-blocked"), a.forEach((s, u) => {
    s.style.setProperty("--v-body-scroll-x", ye(-s.scrollLeft)), s.style.setProperty("--v-body-scroll-y", ye(-s.scrollTop)), s !== document.documentElement && s.style.setProperty("--v-scrollbar-offset", ye(l)), s.classList.add("v-overlay-scroll-blocked");
  }), Ue(() => {
    a.forEach((s, u) => {
      const c = parseFloat(s.style.getPropertyValue("--v-body-scroll-x")), r = parseFloat(s.style.getPropertyValue("--v-body-scroll-y")), d = s.style.scrollBehavior;
      s.style.scrollBehavior = "auto", s.style.removeProperty("--v-body-scroll-x"), s.style.removeProperty("--v-body-scroll-y"), s.style.removeProperty("--v-scrollbar-offset"), s.classList.remove("v-overlay-scroll-blocked"), s.scrollLeft = -c, s.scrollTop = -r, s.style.scrollBehavior = d;
    }), o && e.root.value.classList.remove("v-overlay--scroll-blocked");
  });
}
function Gs(e, n, t) {
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
  }), Ue(() => {
    typeof cancelIdleCallback < "u" && cancelIdleCallback(o), cancelAnimationFrame(l);
  });
}
function Wn(e, n) {
  const t = [document, ...ia(e)];
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
const ja = Symbol.for("vuetify:v-menu"), Ys = K({
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
  const r = A(() => e.openOnFocus || e.openOnFocus == null && e.openOnHover), d = A(() => e.openOnClick || e.openOnClick == null && !e.openOnHover && !r.value), {
    runOpenDelay: f,
    runCloseDelay: v
  } = Mn(e, (h) => {
    h === (e.openOnHover && s || r.value && u) && !(e.openOnHover && t.value && !a.value) && (t.value !== h && (c = !0), t.value = h);
  }), m = q(), k = {
    onClick: (h) => {
      h.stopPropagation(), i.value = h.currentTarget || h.target, t.value || (m.value = [h.clientX, h.clientY]), t.value = !t.value;
    },
    onMouseenter: (h) => {
      var B;
      (B = h.sourceCapabilities) != null && B.firesTouchEvents || (s = !0, i.value = h.currentTarget || h.target, f());
    },
    onMouseleave: (h) => {
      s = !1, v();
    },
    onFocus: (h) => {
      It(h.target, ":focus-visible") !== !1 && (u = !0, h.stopPropagation(), i.value = h.currentTarget || h.target, f());
    },
    onBlur: (h) => {
      u = !1, h.stopPropagation(), v();
    }
  }, y = A(() => {
    const h = {};
    return d.value && (h.onClick = k.onClick), e.openOnHover && (h.onMouseenter = k.onMouseenter, h.onMouseleave = k.onMouseleave), r.value && (h.onFocus = k.onFocus, h.onBlur = k.onBlur), h;
  }), p = A(() => {
    const h = {};
    if (e.openOnHover && (h.onMouseenter = () => {
      s = !0, f();
    }, h.onMouseleave = () => {
      s = !1, v();
    }), r.value && (h.onFocusin = () => {
      u = !0, f();
    }, h.onFocusout = () => {
      u = !1, v();
    }), e.closeOnContentClick) {
      const B = ve(ja, null);
      h.onClick = () => {
        t.value = !1, B == null || B.closeParents();
      };
    }
    return h;
  }), g = A(() => {
    const h = {};
    return e.openOnHover && (h.onMouseenter = () => {
      c && (s = !0, c = !1, f());
    }, h.onMouseleave = () => {
      s = !1, v();
    }), h;
  });
  Q(a, (h) => {
    var B;
    h && (e.openOnHover && !s && (!r.value || !u) || r.value && !u && (!e.openOnHover || !s)) && !((B = l.value) != null && B.contains(document.activeElement)) && (t.value = !1);
  }), Q(t, (h) => {
    h || setTimeout(() => {
      m.value = void 0;
    });
  }, {
    flush: "post"
  });
  const I = Rl();
  et(() => {
    I.value && Te(() => {
      i.value = I.el;
    });
  });
  const x = Rl(), S = A(() => e.target === "cursor" && m.value ? m.value : x.value ? x.el : Un(e.target, o) || i.value), w = A(() => Array.isArray(S.value) ? void 0 : S.value);
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
  }), Ue(() => {
    P == null || P.stop();
  }), {
    activatorEl: i,
    activatorRef: I,
    target: S,
    targetEl: w,
    targetRef: x,
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
    u && Te(() => o());
  }, {
    immediate: !0
  }), Q(() => e.activatorProps, () => {
    o();
  }), Ue(() => {
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
  if (!He) return J(!1);
  const {
    ssr: e
  } = ft();
  if (e) {
    const n = J(!1);
    return Ze(() => {
      n.value = !0;
    }), n;
  } else
    return J(!0);
}
const Kn = K({
  eager: Boolean
}, "lazy");
function jn(e, n) {
  const t = J(!1), a = H(() => t.value || e.eager || n.value);
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
  const s = J(Number(Tl(n)));
  qe(e, () => {
    var d;
    const r = (d = Et.at(-1)) == null ? void 0 : d[1];
    s.value = r ? r + 10 : Number(Tl(n)), l && Et.push([a.uid, s.value]), o == null || o.activeChildren.add(a.uid), Ue(() => {
      if (l) {
        const f = La(Et).findIndex((v) => v[0] === a.uid);
        Et.splice(f, 1);
      }
      o == null || o.activeChildren.delete(a.uid);
    });
  });
  const u = J(!0);
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
    teleportTarget: A(() => {
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
function Gn(e, n, t) {
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
  e.shadowTarget = e.target, n._clickOutside.lastMousedownWasOutside && Gn(e, n, t) && setTimeout(() => {
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
      e._clickOutside.lastMousedownWasOutside = Gn(l, e, n);
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
  return b(aa, {
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
  ...Ut(),
  ...Kn(),
  ...Ms(),
  ...Ws(),
  ...Le(),
  ...Kt()
}, "VOverlay"), ua = ne()({
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
    const o = lt("VOverlay"), i = q(), s = q(), u = q(), c = we(e, "modelValue"), r = A({
      get: () => c.value,
      set: (X) => {
        X && e.disabled || (c.value = X);
      }
    }), {
      themeClasses: d
    } = Ge(e), {
      rtlClasses: f,
      isRtl: v
    } = nt(), {
      hasContent: m,
      onAfterLeave: k
    } = jn(e, r), y = st(() => typeof e.scrim == "string" ? e.scrim : null), {
      globalTop: p,
      localTop: g,
      stackStyles: I
    } = Qs(r, () => e.zIndex, e._disableGlobalStack), {
      activatorEl: x,
      activatorRef: S,
      target: w,
      targetEl: P,
      targetRef: h,
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
      const re = ((me = x == null ? void 0 : x.value) == null ? void 0 : me.getRootNode()) || ((Z = (N = o.proxy) == null ? void 0 : N.$el) == null ? void 0 : Z.getRootNode());
      return re instanceof ShadowRoot ? re : !1;
    }), {
      dimensionStyles: F
    } = Wt(e), z = Zs(), {
      scopeId: W
    } = qt();
    Q(() => e.disabled, (X) => {
      X && (r.value = !1);
    });
    const {
      contentStyles: j,
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
      X ? window.addEventListener("keydown", _) : window.removeEventListener("keydown", _);
    }, {
      immediate: !0
    }), dt(() => {
      He && window.removeEventListener("keydown", _);
    });
    function _(X) {
      var re, me, N;
      X.key === "Escape" && p.value && ((re = u.value) != null && re.contains(document.activeElement) || l("keydown", X), e.persistent ? he() : (r.value = !1, (me = u.value) != null && me.contains(document.activeElement) && ((N = x.value) == null || N.focus())));
    }
    function $(X) {
      X.key === "Escape" && !p.value || l("keydown", X);
    }
    const O = un();
    qe(() => e.closeOnBack, () => {
      Ai(O, (X) => {
        p.value && r.value ? (X(!1), e.persistent ? he() : r.value = !1) : X();
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
      e.noClickAnimation || u.value && yt(u.value, [{
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
      k(), l("afterLeave");
    }
    return ie(() => {
      var X;
      return C(ee, null, [(X = t.activator) == null ? void 0 : X.call(t, {
        isActive: r.value,
        targetRef: h,
        props: L({
          ref: S
        }, B.value, e.activatorProps)
      }), z.value && m.value && b(Na, {
        disabled: !R.value,
        to: R.value
      }, {
        default: () => [C("div", L({
          class: ["v-overlay", {
            "v-overlay--absolute": e.absolute || e.contained,
            "v-overlay--active": r.value,
            "v-overlay--contained": e.contained
          }, d.value, f.value, e.class],
          style: [I.value, {
            "--v-overlay-opacity": e.opacity,
            top: ye(U.value)
          }, e.style],
          ref: i,
          onKeydown: $
        }, W, a), [b(au, L({
          color: y,
          modelValue: r.value && !!e.scrim,
          ref: s
        }, E.value), null), b(wa, {
          appear: !0,
          persisted: !0,
          transition: e.transition,
          target: w.value,
          onAfterEnter: le,
          onAfterLeave: se
        }, {
          default: () => {
            var re;
            return [je(C("div", L({
              ref: u,
              class: ["v-overlay__content", e.contentClass],
              style: [F.value, j.value]
            }, T.value, e.contentProps), [(re = t.default) == null ? void 0 : re.call(t, {
              isActive: r
            })]), [[Tt, r.value], [Zl, {
              handler: ae,
              closeConditional: ue,
              include: () => [x.value]
            }]])];
          }
        })])]
      })]);
    }), {
      activatorEl: x,
      scrimEl: s,
      target: w,
      animateClick: he,
      contentEl: u,
      globalTop: p,
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
function gt(e) {
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
            const d = r.shift(), f = Ra(d.value, o);
            if (f) return f;
            const v = d.value && d.value[Fa];
            v && r.push(...v);
          }
        }
      }
    }
  });
}
function lu(e) {
  const n = J(e());
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
  return Ue(a), {
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
  ...jt(),
  ...Le(),
  ...mt(ml({
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
    } = qt(), {
      themeClasses: i
    } = Ge(e), {
      colorClasses: s,
      colorStyles: u,
      variantClasses: c
    } = al(e), {
      roundedClasses: r
    } = _t(e), d = lu(() => Number(e.timeout)), f = q(), v = q(), m = J(!1), k = J(0), y = q(), p = ve(Ft, void 0);
    qe(() => !!p, () => {
      const E = $n();
      et(() => {
        y.value = E.mainStyles.value;
      });
    }), Q(a, I), Q(() => e.timeout, I), Ze(() => {
      a.value && I();
    });
    let g = -1;
    function I() {
      d.reset(), window.clearTimeout(g);
      const E = Number(e.timeout);
      if (!a.value || E === -1) return;
      const R = Ni(v.value);
      d.start(R), g = window.setTimeout(() => {
        a.value = !1;
      }, E);
    }
    function x() {
      d.reset(), window.clearTimeout(g);
    }
    function S() {
      m.value = !0, x();
    }
    function w() {
      m.value = !1, I();
    }
    function P(E) {
      k.value = E.touches[0].clientY;
    }
    function h(E) {
      Math.abs(k.value - E.changedTouches[0].clientY) > 50 && (a.value = !1);
    }
    function B() {
      m.value && w();
    }
    const T = A(() => e.location.split(" ").reduce((E, R) => (E[`v-snackbar--${R}`] = !0, E), {}));
    return ie(() => {
      const E = ua.filterProps(e), R = !!(t.default || t.text || e.text);
      return b(ua, L({
        ref: f,
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
        onTouchend: h,
        onAfterLeave: B
      }, o), {
        default: () => {
          var F, z;
          return [ll(!1, "v-snackbar"), e.timer && !m.value && C("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [b(Ti, {
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
    }), gt({}, f);
  }
}), gl = Symbol.for("vuetify:v-tabs"), iu = K({
  fixed: Boolean,
  sliderColor: String,
  hideSlider: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ...mt(rn({
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
    } = Gt(() => e.sliderColor), i = q(), s = q(), u = A(() => e.direction === "horizontal"), c = A(() => {
      var d, f;
      return ((f = (d = i.value) == null ? void 0 : d.group) == null ? void 0 : f.isSelected.value) ?? !1;
    });
    function r(d) {
      var v, m;
      let {
        value: f
      } = d;
      if (f) {
        const k = (m = (v = i.value) == null ? void 0 : v.$el.parentElement) == null ? void 0 : m.querySelector(".v-tab--selected .v-tab__slider"), y = s.value;
        if (!k || !y) return;
        const p = getComputedStyle(k).color, g = k.getBoundingClientRect(), I = y.getBoundingClientRect(), x = u.value ? "x" : "y", S = u.value ? "X" : "Y", w = u.value ? "right" : "bottom", P = u.value ? "width" : "height", h = g[x], B = I[x], T = h > B ? g[w] - I[w] : g[x] - I[x], E = Math.sign(T) > 0 ? u.value ? "right" : "bottom" : Math.sign(T) < 0 ? u.value ? "left" : "top" : "center", F = (Math.abs(T) + (Math.sign(T) < 0 ? g[P] : I[P])) / Math.max(g[P], I[P]) || 0, z = g[P] / I[P] || 0, W = 1.5;
        yt(y, {
          backgroundColor: [p, "currentcolor"],
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
      return b(be, L({
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
          var f;
          return C(ee, null, [((f = t.default) == null ? void 0 : f.call(t)) ?? e.text, !e.hideSlider && C("div", {
            ref: s,
            class: fe(["v-tab__slider", l.value]),
            style: Ve(o.value)
          }, null)]);
        }
      });
    }), gt({}, i);
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
  ...Ke(),
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
    } = Ge(e), {
      isRtl: l
    } = nt(), {
      t: o
    } = ot(), i = nl(e, Xn), s = q(), u = A(() => l.value ? !e.reverse : e.reverse), c = J(!1), r = A(() => {
      const x = e.direction === "vertical" ? "y" : "x", w = (u.value ? !c.value : c.value) ? "-reverse" : "";
      return `v-window-${x}${w}-transition`;
    }), d = J(0), f = q(void 0), v = A(() => i.items.value.findIndex((x) => i.selected.value.includes(x.id)));
    Q(v, (x, S) => {
      const w = i.items.value.length, P = w - 1;
      w <= 2 ? c.value = x < S : x === P && S === 0 ? c.value = !0 : x === 0 && S === P ? c.value = !1 : c.value = x < S;
    }), ze(qn, {
      transition: r,
      isReversed: c,
      transitionCount: d,
      transitionHeight: f,
      rootRef: s
    });
    const m = H(() => e.continuous || v.value !== 0), k = H(() => e.continuous || v.value !== i.items.value.length - 1);
    function y() {
      m.value && i.prev();
    }
    function p() {
      k.value && i.next();
    }
    const g = A(() => {
      const x = [], S = {
        icon: l.value ? e.nextIcon : e.prevIcon,
        class: `v-window__${u.value ? "right" : "left"}`,
        onClick: i.prev,
        "aria-label": o("$vuetify.carousel.prev")
      };
      x.push(m.value ? t.prev ? t.prev({
        props: S
      }) : b(be, S, null) : C("div", null, null));
      const w = {
        icon: l.value ? e.prevIcon : e.nextIcon,
        class: `v-window__${u.value ? "left" : "right"}`,
        onClick: i.next,
        "aria-label": o("$vuetify.carousel.next")
      };
      return x.push(k.value ? t.next ? t.next({
        props: w
      }) : b(be, w, null) : C("div", null, null)), x;
    }), I = A(() => e.touch === !1 ? e.touch : {
      ...{
        left: () => {
          u.value ? y() : p();
        },
        right: () => {
          u.value ? p() : y();
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
    return ie(() => je(b(e.tag, {
      ref: s,
      class: fe(["v-window", {
        "v-window--show-arrows-on-hover": e.showArrows === "hover"
      }, a.value, e.class]),
      style: Ve(e.style)
    }, {
      default: () => {
        var x, S;
        return [C("div", {
          class: "v-window__container",
          style: {
            height: f.value
          }
        }, [(x = t.default) == null ? void 0 : x.call(t, {
          group: i
        }), e.showArrows !== !1 && C("div", {
          class: "v-window__controls"
        }, [g.value])]), (S = t.additional) == null ? void 0 : S.call(t, {
          group: i
        })];
      }
    }), [[Ya, I.value]])), {
      group: i
    };
  }
}), mu = K({
  ...mt(Zn(), ["continuous", "nextIcon", "prevIcon", "showArrows", "touch", "mandatory"])
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
    const a = ve(gl, null), l = we(e, "modelValue"), o = A({
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
      return b(qa, L({
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
    const i = J(!1), s = A(() => o.value && (a.isReversed.value ? e.reverseTransition !== !1 : e.transition !== !1));
    function u() {
      !i.value || !a || (i.value = !1, a.transitionCount.value > 0 && (a.transitionCount.value -= 1, a.transitionCount.value === 0 && (a.transitionHeight.value = void 0)));
    }
    function c() {
      var m;
      i.value || !a || (i.value = !0, a.transitionCount.value === 0 && (a.transitionHeight.value = ye((m = a.rootRef.value) == null ? void 0 : m.clientHeight)), a.transitionCount.value += 1);
    }
    function r() {
      u();
    }
    function d(m) {
      i.value && Te(() => {
        !s.value || !i.value || !a || (a.transitionHeight.value = ye(m.clientHeight));
      });
    }
    const f = A(() => {
      const m = a.isReversed.value ? e.reverseTransition : e.transition;
      return s.value ? {
        name: typeof m != "string" ? a.transition.value : m,
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
    } = jn(e, l.isSelected);
    return ie(() => b(wa, {
      transition: f.value,
      disabled: !o.value
    }, {
      default: () => {
        var m;
        return [je(C("div", {
          class: fe(["v-window-item", l.selectedClass.value, e.class]),
          style: Ve(e.style)
        }, [v.value && ((m = t.default) == null ? void 0 : m.call(t))]), [[Tt, l.isSelected.value]])];
      }
    })), {
      groupItem: l
    };
  }
}), gu = K({
  ...Qn()
}, "VTabsWindowItem"), ra = ne()({
  name: "VTabsWindowItem",
  props: gu(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    return ie(() => {
      const a = Xa.filterProps(e);
      return b(Xa, L({
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
  const o = Mt(l, t), i = Jn(l, a, t), s = Mt(l, n), u = eo(l, n), c = s * 0.4;
  return i > u ? u - c : i + o < u + s ? u - o + s + c : i;
}
function hu(e) {
  let {
    selectedElement: n,
    containerElement: t,
    isHorizontal: a
  } = e;
  const l = Mt(a, t), o = eo(a, n), i = Mt(a, n);
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
function Mt(e, n) {
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
  ...Yt({
    mobile: null
  }),
  ...Ke(),
  ...fn({
    selectedClass: "v-slide-group-item--active"
  })
}, "VSlideGroup"), Dt = ne()({
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
    } = ft(e), i = nl(e, e.symbol), s = J(!1), u = J(0), c = J(0), r = J(0), d = A(() => e.direction === "horizontal"), {
      resizeRef: f,
      contentRect: v
    } = Vt(), {
      resizeRef: m,
      contentRect: k
    } = Vt(), y = qi(), p = A(() => ({
      container: f.el,
      duration: 200,
      easing: "easeOutQuart"
    })), g = A(() => i.selected.value.length ? i.items.value.findIndex(($) => $.id === i.selected.value[0]) : -1), I = A(() => i.selected.value.length ? i.items.value.findIndex(($) => $.id === i.selected.value[i.selected.value.length - 1]) : -1);
    if (He) {
      let $ = -1;
      Q(() => [i.selected.value, v.value, k.value, d.value], () => {
        cancelAnimationFrame($), $ = requestAnimationFrame(() => {
          if (v.value && k.value) {
            const O = d.value ? "width" : "height";
            c.value = v.value[O], r.value = k.value[O], s.value = c.value + 1 < r.value;
          }
          if (g.value >= 0 && m.el) {
            const O = m.el.children[I.value];
            S(O, e.centerActive);
          }
        });
      });
    }
    const x = J(!1);
    function S($, O) {
      let U = 0;
      O ? U = hu({
        containerElement: f.el,
        isHorizontal: d.value,
        selectedElement: $
      }) : U = yu({
        containerElement: f.el,
        isHorizontal: d.value,
        isRtl: a.value,
        selectedElement: $
      }), w(U);
    }
    function w($) {
      if (!He || !f.el) return;
      const O = Mt(d.value, f.el), U = Jn(d.value, a.value, f.el);
      if (!(Ql(d.value, f.el) <= O || // Prevent scrolling by only a couple of pixels, which doesn't look smooth
      Math.abs($ - U) < 16)) {
        if (d.value && a.value && f.el) {
          const {
            scrollWidth: le,
            offsetWidth: se
          } = f.el;
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
      if (x.value = !0, !(!s.value || !m.el)) {
        for (const O of $.composedPath())
          for (const U of m.el.children)
            if (U === O) {
              S(U);
              return;
            }
      }
    }
    function B($) {
      x.value = !1;
    }
    let T = !1;
    function E($) {
      var O;
      !T && !x.value && !($.relatedTarget && ((O = m.el) != null && O.contains($.relatedTarget))) && W(), T = !1;
    }
    function R() {
      T = !0;
    }
    function F($) {
      if (!m.el) return;
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
      if (!m.el) return;
      let O;
      if (!$)
        O = za(m.el)[0];
      else if ($ === "next") {
        if (O = z(m.el.querySelector(":focus"), $), !O) return W("first");
      } else if ($ === "prev") {
        if (O = z(m.el.querySelector(":focus"), $), !O) return W("last");
      } else $ === "first" ? (O = m.el.firstElementChild, O != null && O.hasAttribute("disabled") && (O = z(O, "next"))) : $ === "last" && (O = m.el.lastElementChild, O != null && O.hasAttribute("disabled") && (O = z(O, "prev")));
      O && O.focus({
        preventScroll: !0
      });
    }
    function j($) {
      const O = d.value && a.value ? -1 : 1, U = ($ === "prev" ? -O : O) * c.value;
      let he = u.value + U;
      if (d.value && a.value && f.el) {
        const {
          scrollWidth: le,
          offsetWidth: se
        } = f.el;
        he += le - se;
      }
      w(he);
    }
    const te = A(() => ({
      next: i.next,
      prev: i.prev,
      select: i.select,
      isSelected: i.isSelected
    })), ae = A(() => {
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
    }), ue = A(() => Math.abs(u.value) > 1), _ = A(() => {
      if (!f.value) return !1;
      const $ = Ql(d.value, f.el), O = bu(d.value, f.el);
      return $ - O - Math.abs(u.value) > 1;
    });
    return ie(() => b(e.tag, {
      class: fe(["v-slide-group", {
        "v-slide-group--vertical": !d.value,
        "v-slide-group--has-affixes": ae.value,
        "v-slide-group--is-overflowing": s.value
      }, l.value, e.class]),
      style: Ve(e.style),
      tabindex: x.value || i.selected.value.length ? -1 : 0,
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
          onClick: () => ue.value && j("prev")
        }, [(($ = t.prev) == null ? void 0 : $.call(t, te.value)) ?? b(Ol, null, {
          default: () => [b(ke, {
            icon: a.value ? e.nextIcon : e.prevIcon
          }, null)]
        })]), C("div", {
          key: "container",
          ref: f,
          class: "v-slide-group__container",
          onScroll: P
        }, [C("div", {
          ref: m,
          class: "v-slide-group__content",
          onFocusin: h,
          onFocusout: B,
          onKeydown: F
        }, [(O = t.default) == null ? void 0 : O.call(t, te.value)])]), ae.value && C("div", {
          key: "next",
          class: fe(["v-slide-group__next", {
            "v-slide-group__next--disabled": !_.value
          }]),
          onMousedown: R,
          onClick: () => _.value && j("next")
        }, [((U = t.next) == null ? void 0 : U.call(t, te.value)) ?? b(Ol, null, {
          default: () => [b(ke, {
            icon: a.value ? e.prevIcon : e.nextIcon
          }, null)]
        })])];
      }
    })), {
      selected: i.selected,
      scrollTo: j,
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
  ...vt(),
  ...Ke()
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
    const l = we(e, "modelValue"), o = A(() => pu(e.items)), {
      densityClasses: i
    } = Bt(e), {
      backgroundColorClasses: s,
      backgroundColorStyles: u
    } = st(() => e.bgColor), {
      scopeId: c
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
      const r = Dt.filterProps(e), d = !!(a.window || e.items.length > 0);
      return C(ee, null, [b(Dt, L(r, {
        modelValue: l.value,
        "onUpdate:modelValue": (f) => l.value = f,
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
          var f;
          return [((f = a.default) == null ? void 0 : f.call(a)) ?? o.value.map((v) => {
            var m;
            return ((m = a.tab) == null ? void 0 : m.call(a, {
              item: v
            })) ?? b(Ga, L(v, {
              key: v.text,
              value: v.value
            }), {
              default: a[`tab.${v.value}`] ? () => {
                var k;
                return (k = a[`tab.${v.value}`]) == null ? void 0 : k.call(a, {
                  item: v
                });
              } : void 0
            });
          })];
        }
      }), d && b(yl, L({
        modelValue: l.value,
        "onUpdate:modelValue": (f) => l.value = f,
        key: "tabs-window"
      }, c), {
        default: () => {
          var f;
          return [o.value.map((v) => {
            var m;
            return ((m = a.item) == null ? void 0 : m.call(a, {
              item: v
            })) ?? b(ra, {
              value: v.value
            }, {
              default: () => {
                var k;
                return (k = a[`item.${v.value}`]) == null ? void 0 : k.call(a, {
                  item: v
                });
              }
            });
          }), (f = a.window) == null ? void 0 : f.call(a)];
        }
      })]);
    }), {};
  }
}), Su = {
  class: "nav-home",
  href: "/"
};
var tn;
const ku = /* @__PURE__ */ We({
  __name: "OxApp",
  props: {
    apiUrl: {},
    logo: {},
    dataEl: { default: (tn = document.body.dataset) == null ? void 0 : tn.appData },
    models: {},
    data: {}
  },
  setup(e) {
    const n = pt(), t = ht(n, "panels."), a = e, l = Qe({ drawer: !0 }), o = yi(a), i = hi();
    return Ze(() => {
      i.panel = o.data.panel;
    }), Q(() => [o.state.state, o.state.data], () => {
      o.showState = !0;
    }), ii((s, u, c) => {
      o.state.error(`${s}`);
    }), (s, u) => (D(), G(Is, null, {
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
        b(Es, { color: "primary" }, {
          prepend: M(() => [
            V(n)["nav-start"] || V(n)["nav-end"] ? (D(), G(Hn, {
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
                Y(s.$slots, "title")
              ]),
              _: 3
            }),
            Y(s.$slots, "app-bar-left"),
            u[5] || (u[5] = C("div", {
              id: "app-bar-right",
              class: "mr-3"
            }, null, -1)),
            Y(s.$slots, "app-bar-right")
          ]),
          _: 3,
          __: [5]
        }),
        V(n)["nav-start"] || V(n)["nav-end"] ? (D(), G(V(Cs), {
          key: 0,
          drawer: l.drawer,
          "onUpdate:drawer": u[3] || (u[3] = (c) => l.drawer = c),
          items: V(o).data.nav
        }, kt({
          prepend: M(() => [
            C("a", Su, [
              s.logo ? (D(), G(pa, {
                key: 0,
                src: s.logo,
                class: "logo"
              }, null, 8, ["src"])) : de("", !0)
            ]),
            Y(s.$slots, "nav-start", { context: V(o) })
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
                  Y(s.$slots, "nav-end", { context: V(o) })
                ]),
                _: 3
              }, 8, ["opened"])
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["drawer", "items"])) : de("", !0),
        b(Fs, null, {
          default: M(() => [
            Y(s.$slots, "main", {}, () => [
              b(yl, {
                modelValue: V(i).panel,
                "onUpdate:modelValue": u[4] || (u[4] = (c) => V(i).panel = c)
              }, {
                default: M((c) => [
                  Y(s.$slots, "default", L(c, { context: V(o) })),
                  (D(!0), pe(ee, null, Me(V(t), (r, d) => (D(), G(ra, {
                    key: d,
                    value: r
                  }, {
                    default: M(() => [
                      Y(s.$slots, d, L({ ref_for: !0 }, c, { context: V(o) }))
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
  ...vt(),
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
  } = Bt(e), a = we(e, "modelValue"), l = A(() => e.trueValue !== void 0 ? e.trueValue : e.value !== void 0 ? e.value : !0), o = A(() => e.falseValue !== void 0 ? e.falseValue : !1), i = A(() => !!e.multiple || e.multiple == null && Array.isArray(a.value)), s = A({
    get() {
      const v = n ? n.modelValue.value : a.value;
      return i.value ? Ne(v).some((m) => e.valueComparator(m, l.value)) : e.valueComparator(v, l.value);
    },
    set(v) {
      if (e.readonly) return;
      const m = v ? l.value : o.value;
      let k = m;
      i.value && (k = v ? [...Ne(a.value), m] : Ne(a.value).filter((y) => !e.valueComparator(y, l.value))), n ? n.modelValue.value = k : a.value = k;
    }
  }), {
    textColorClasses: u,
    textColorStyles: c
  } = Gt(() => {
    if (!(e.error || e.disabled))
      return s.value ? e.color : e.baseColor;
  }), {
    backgroundColorClasses: r,
    backgroundColorStyles: d
  } = st(() => s.value && !e.error && !e.disabled ? e.color : e.baseColor), f = A(() => s.value ? e.trueIcon : e.falseIcon);
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
    icon: f
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
      trueValue: f
    } = Pu(e), v = ct(), m = J(!1), k = J(!1), y = q(), p = H(() => e.id || `input-${v}`), g = H(() => !e.disabled && !e.readonly);
    l == null || l.onForceUpdate(() => {
      y.value && (y.value.checked = s.value);
    });
    function I(P) {
      g.value && (m.value = !0, It(P.target, ":focus-visible") !== !1 && (k.value = !0));
    }
    function x() {
      m.value = !1, k.value = !1;
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
          for: p.value
        }
      }) : e.label, [h, B] = xa(t), T = C("input", L({
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
        value: f.value,
        name: e.name,
        "aria-checked": e.type === "checkbox" ? s.value : void 0
      }, B), null);
      return C("div", L({
        class: ["v-selection-control", {
          "v-selection-control--dirty": s.value,
          "v-selection-control--disabled": e.disabled,
          "v-selection-control--error": e.error,
          "v-selection-control--focused": m.value,
          "v-selection-control--focus-visible": k.value,
          "v-selection-control--inline": e.inline
        }, o.value, e.class]
      }, h, {
        style: e.style
      }), [C("div", {
        class: fe(["v-selection-control__wrapper", u.value]),
        style: Ve(c.value)
      }, [(E = a.default) == null ? void 0 : E.call(a, {
        backgroundColorClasses: r,
        backgroundColorStyles: d
      }), je(C("div", {
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
          onFocus: I,
          onBlur: x,
          id: p.value
        }
      })) ?? C(ee, null, [i.value && b(ke, {
        key: "icon",
        icon: i.value
      }, null), T])]), [[Ct, e.ripple && [!e.disabled && !e.readonly, null, ["center", "circle"]]]])]), P && b(ao, {
        for: p.value,
        onClick: S
      }, {
        default: () => [P]
      })]);
    }), {
      isFocused: m,
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
}, "VCheckboxBtn"), bt = ne()({
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
      const u = mt(Jl.filterProps(e), ["modelValue"]);
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
      d.key !== "Enter" && d.key !== " " || (d.preventDefault(), d.stopPropagation(), dl(u, new PointerEvent("click", d)));
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
  ...Kt({
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
    const a = A(() => Ne(e.messages)), {
      textColorClasses: l,
      textColorStyles: o
    } = Gt(() => e.color);
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
  const n = we(e, "modelValue"), t = H(() => e.disabled), a = H(() => e.readonly), l = J(!1), o = q([]), i = q([]);
  async function s() {
    const r = [];
    let d = !0;
    i.value = [], l.value = !0;
    for (const f of o.value) {
      const v = await f.validate();
      if (v.length > 0 && (d = !1, r.push({
        id: f.id,
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
    const f = [];
    for (const v of o.value)
      v.isValid === !1 ? (d++, f.push({
        id: v.id,
        errorMessages: v.errorMessages
      })) : v.isValid === !0 && r++;
    i.value = f, n.value = d > 0 ? !1 : r === o.value.length ? !0 : null;
  }, {
    deep: !0,
    flush: "post"
  }), ze(ro, {
    register: (r) => {
      let {
        id: d,
        vm: f,
        validate: v,
        reset: m,
        resetValidation: k
      } = r;
      o.value.some((y) => y.id === d) && kn(`Duplicate input name "${d}"`), o.value.push({
        id: d,
        validate: v,
        reset: m,
        resetValidation: k,
        vm: si(f),
        isValid: null,
        errorMessages: []
      });
    },
    unregister: (r) => {
      o.value = o.value.filter((d) => d.id !== r);
    },
    update: (r, d, f) => {
      const v = o.value.find((m) => m.id === r);
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
    resetValidation: c
  };
}
function bl(e) {
  const n = ve(ro, null);
  return {
    ...n,
    isReadonly: A(() => !!((e == null ? void 0 : e.readonly) ?? (n == null ? void 0 : n.isReadonly.value))),
    isDisabled: A(() => !!((e == null ? void 0 : e.disabled) ?? (n == null ? void 0 : n.isDisabled.value)))
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
  const a = we(e, "modelValue"), l = A(() => e.validationValue === void 0 ? a.value : e.validationValue), o = bl(e), i = Eu(() => e.rules), s = q([]), u = J(!0), c = A(() => !!(Ne(a.value === "" ? null : a.value).length || Ne(l.value === "" ? null : l.value).length)), r = A(() => {
    var x;
    return (x = e.errorMessages) != null && x.length ? Ne(e.errorMessages).concat(s.value).slice(0, Math.max(0, Number(e.maxErrors))) : s.value;
  }), d = A(() => {
    var w;
    let x = (e.validateOn ?? ((w = o.validateOn) == null ? void 0 : w.value)) || "input";
    x === "lazy" && (x = "input lazy"), x === "eager" && (x = "input eager");
    const S = new Set((x == null ? void 0 : x.split(" ")) ?? []);
    return {
      input: S.has("input"),
      blur: S.has("blur") || S.has("input") || S.has("invalid-input"),
      invalidInput: S.has("invalid-input"),
      lazy: S.has("lazy"),
      eager: S.has("eager")
    };
  }), f = A(() => {
    var x;
    return e.error || (x = e.errorMessages) != null && x.length ? !1 : e.rules.length ? u.value ? s.value.length || d.value.lazy ? null : !0 : !s.value.length : !0;
  }), v = J(!1), m = A(() => ({
    [`${n}--error`]: f.value === !1,
    [`${n}--dirty`]: c.value,
    [`${n}--disabled`]: o.isDisabled.value,
    [`${n}--readonly`]: o.isReadonly.value
  })), k = lt("validation"), y = A(() => e.name ?? V(t));
  ui(() => {
    var x;
    (x = o.register) == null || x.call(o, {
      id: y.value,
      vm: k,
      validate: I,
      reset: p,
      resetValidation: g
    });
  }), dt(() => {
    var x;
    (x = o.unregister) == null || x.call(o, y.value);
  }), Ze(async () => {
    var x;
    d.value.lazy || await I(!d.value.eager), (x = o.update) == null || x.call(o, y.value, f.value, r.value);
  }), qe(() => d.value.input || d.value.invalidInput && f.value === !1, () => {
    Q(l, () => {
      if (l.value != null)
        I();
      else if (e.focused) {
        const x = Q(() => e.focused, (S) => {
          S || I(), x();
        });
      }
    });
  }), qe(() => d.value.blur, () => {
    Q(() => e.focused, (x) => {
      x || I();
    });
  }), Q([f, r], () => {
    var x;
    (x = o.update) == null || x.call(o, y.value, f.value, r.value);
  });
  async function p() {
    a.value = null, await Te(), await g();
  }
  async function g() {
    u.value = !0, d.value.lazy ? s.value = [] : await I(!d.value.eager);
  }
  async function I() {
    let x = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    const S = [];
    v.value = !0;
    for (const w of i.value) {
      if (S.length >= Number(e.maxErrors ?? 1))
        break;
      const h = await (typeof w == "function" ? w : () => w)(l.value);
      if (h !== !0) {
        if (h !== !1 && typeof h != "string") {
          console.warn(`${h} is not a valid value. Rule functions must return boolean true or a string.`);
          continue;
        }
        S.push(h || "");
      }
    }
    return s.value = S, v.value = !1, u.value = x, s.value;
  }
  return {
    errorMessages: r,
    isDirty: c,
    isDisabled: o.isDisabled,
    isReadonly: o.isReadonly,
    isPristine: u,
    isValid: f,
    isValidating: v,
    reset: p,
    resetValidation: g,
    validate: I,
    validationClasses: m
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
  ...vt(),
  ...zi(Ut(), ["maxWidth", "minWidth", "width"]),
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
    } = Wt(e), {
      themeClasses: s
    } = Ge(e), {
      rtlClasses: u
    } = nt(), {
      InputIcon: c
    } = so(e), r = ct(), d = A(() => e.id || `input-${r}`), f = A(() => `${d.value}-messages`), {
      errorMessages: v,
      isDirty: m,
      isDisabled: k,
      isReadonly: y,
      isPristine: p,
      isValid: g,
      isValidating: I,
      reset: x,
      resetValidation: S,
      validate: w,
      validationClasses: P
    } = Ou(e, "v-input", d), h = A(() => ({
      id: d,
      messagesId: f,
      isDirty: m,
      isDisabled: k,
      isReadonly: y,
      isPristine: p,
      isValid: g,
      isValidating: I,
      reset: x,
      resetValidation: S,
      validate: w
    })), B = H(() => e.error || e.disabled ? void 0 : e.focused ? e.color : e.baseColor), T = H(() => {
      if (e.iconColor)
        return e.iconColor === !0 ? B.value : e.iconColor;
    }), E = A(() => {
      var R;
      return (R = e.errorMessages) != null && R.length || !p.value && v.value.length ? v.value : e.hint && (e.persistentHint || e.focused) ? e.hint : e.messages;
    });
    return ie(() => {
      var j, te, ae, ue;
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
      }, [(j = a.prepend) == null ? void 0 : j.call(a, h.value), e.prependIcon && b(c, {
        key: "prepend-icon",
        name: "prepend",
        color: T.value
      }, null)]), a.default && C("div", {
        class: "v-input__control"
      }, [(te = a.default) == null ? void 0 : te.call(a, h.value)]), F && C("div", {
        key: "append",
        class: "v-input__append"
      }, [e.appendIcon && b(c, {
        key: "append-icon",
        name: "append",
        color: T.value
      }, null), (ae = a.append) == null ? void 0 : ae.call(a, h.value)]), W && C("div", {
        id: f.value,
        class: "v-input__details",
        role: "alert",
        "aria-live": "polite"
      }, [b(Au, {
        active: z,
        messages: E.value
      }, {
        message: a.message
      }), (ue = a.details) == null ? void 0 : ue.call(a, h.value)])]);
    }), {
      reset: x,
      resetValidation: S,
      validate: w,
      isValid: g,
      errorMessages: v
    };
  }
}), Fu = K({
  ...ka(),
  ...mt(io(), ["inline"])
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
      const [c, r] = xa(t), d = At.filterProps(e), f = bt.filterProps(e);
      return b(At, L({
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
            id: m,
            messagesId: k,
            isDisabled: y,
            isReadonly: p,
            isValid: g
          } = v;
          return b(bt, L(f, {
            id: m.value,
            "aria-describedby": k.value,
            disabled: y.value,
            readonly: p.value
          }, r, {
            error: g.value === !1,
            modelValue: l.value,
            "onUpdate:modelValue": (I) => l.value = I,
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
  ...Ke(),
  ...Le(),
  ...jt({
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
    } = Ge(e), {
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
      const c = Dt.filterProps(e);
      return b(Dt, L(c, {
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
  ...zt(),
  ...Se(),
  ...vt(),
  ...Ht(),
  ...ol(),
  ...wt(),
  ...bn(),
  ...hn(),
  ...Ke({
    tag: "span"
  }),
  ...Le(),
  ...jt({
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
    } = Ge(e), f = we(e, "modelValue"), v = il(e, co, !1), m = gn(e, t), k = H(() => e.link !== !1 && m.isLink.value), y = A(() => !e.disabled && e.link !== !1 && (!!v || e.link || m.isClickable.value)), p = H(() => ({
      "aria-label": o(e.closeLabel),
      disabled: e.disabled,
      onClick(P) {
        P.preventDefault(), P.stopPropagation(), f.value = !1, a("click:close", P);
      }
    })), {
      colorClasses: g,
      colorStyles: I,
      variantClasses: x
    } = al(() => ({
      color: !v || v.isSelected.value ? e.color ?? e.baseColor : e.baseColor,
      variant: e.variant
    }));
    function S(P) {
      var h;
      a("click", P), y.value && ((h = m.navigate) == null || h.call(m, P), v == null || v.toggle());
    }
    function w(P) {
      (P.key === "Enter" || P.key === " ") && (P.preventDefault(), S(P));
    }
    return () => {
      var z;
      const P = m.isLink.value ? "a" : e.tag, h = !!(e.appendIcon || e.appendAvatar), B = !!(h || l.append), T = !!(l.close || e.closable), E = !!(l.filter || e.filter) && v, R = !!(e.prependIcon || e.prependAvatar), F = !!(R || l.prepend);
      return f.value && je(b(P, L({
        class: ["v-chip", {
          "v-chip--disabled": e.disabled,
          "v-chip--label": e.label,
          "v-chip--link": y.value,
          "v-chip--filter": E,
          "v-chip--pill": e.pill,
          [`${e.activeClass}`]: e.activeClass && ((z = m.isActive) == null ? void 0 : z.value)
        }, d.value, i.value, g.value, s.value, u.value, c.value, r.value, x.value, v == null ? void 0 : v.selectedClass.value, e.class],
        style: [I.value, e.style],
        disabled: e.disabled || void 0,
        draggable: e.draggable,
        tabindex: y.value ? 0 : void 0,
        onClick: S,
        onKeydown: y.value && !k.value && w
      }, m.linkProps), {
        default: () => {
          var W;
          return [ll(y.value, "v-chip"), E && b(yn, {
            key: "filter"
          }, {
            default: () => [je(C("div", {
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
            }, null)]), [[Tt, v.isSelected.value]])]
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
          }, l.prepend) : C(ee, null, [e.prependIcon && b(ke, {
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
          })) ?? Re(e.text)]), B && C("div", {
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
          }, l.append) : C(ee, null, [e.appendIcon && b(ke, {
            key: "append-icon",
            end: !0,
            icon: e.appendIcon
          }, null), e.appendAvatar && b(Pt, {
            key: "append-avatar",
            end: !0,
            image: e.appendAvatar
          }, null)])]), T && C("button", L({
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
  ...mt(ml({
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
    } = qt(), {
      isRtl: o
    } = nt(), i = ct(), s = H(() => e.id || `v-menu-${i}`), u = q(), c = ve(ja, null), r = J(/* @__PURE__ */ new Set());
    ze(ja, {
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
      var I, x, S;
      const p = y.relatedTarget, g = y.target;
      await Te(), a.value && p !== g && ((I = u.value) != null && I.contentEl) && // We're the topmost menu
      ((x = u.value) != null && x.globalTop) && // It isn't the document or the menu body
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
    function f(y) {
      c == null || c.closeParents(y);
    }
    function v(y) {
      var p, g, I, x, S;
      if (!e.disabled)
        if (y.key === "Tab" || y.key === "Enter" && !e.closeOnContentClick) {
          if (y.key === "Enter" && (y.target instanceof HTMLTextAreaElement || y.target instanceof HTMLInputElement && y.target.closest("form"))) return;
          y.key === "Enter" && y.preventDefault(), Ui(za((p = u.value) == null ? void 0 : p.contentEl, !1), y.shiftKey ? "prev" : "next", (P) => P.tabIndex >= 0) || (a.value = !1, (I = (g = u.value) == null ? void 0 : g.activatorEl) == null || I.focus());
        } else e.submenu && y.key === (o.value ? "ArrowRight" : "ArrowLeft") && (a.value = !1, (S = (x = u.value) == null ? void 0 : x.activatorEl) == null || S.focus());
    }
    function m(y) {
      var g;
      if (e.disabled) return;
      const p = (g = u.value) == null ? void 0 : g.contentEl;
      p && a.value ? y.key === "ArrowDown" ? (y.preventDefault(), y.stopImmediatePropagation(), Ta(p, "next")) : y.key === "ArrowUp" ? (y.preventDefault(), y.stopImmediatePropagation(), Ta(p, "prev")) : e.submenu && (y.key === (o.value ? "ArrowRight" : "ArrowLeft") ? a.value = !1 : y.key === (o.value ? "ArrowLeft" : "ArrowRight") && (y.preventDefault(), Ta(p, "first"))) : (e.submenu ? y.key === (o.value ? "ArrowLeft" : "ArrowRight") : ["ArrowDown", "ArrowUp"].includes(y.key)) && (a.value = !0, y.preventDefault(), setTimeout(() => setTimeout(() => m(y))));
    }
    const k = A(() => L({
      "aria-haspopup": "menu",
      "aria-expanded": String(a.value),
      "aria-controls": s.value,
      onKeydown: m
    }, e.activatorProps));
    return ie(() => {
      const y = ua.filterProps(e);
      return b(ua, L({
        ref: u,
        id: s.value,
        class: ["v-menu", e.class],
        style: e.style
      }, y, {
        modelValue: a.value,
        "onUpdate:modelValue": (p) => a.value = p,
        absolute: !0,
        activatorProps: k.value,
        location: e.location ?? (e.submenu ? "end" : "bottom"),
        "onClick:outside": f,
        onKeydown: v
      }, l), {
        activator: t.activator,
        default: function() {
          for (var p = arguments.length, g = new Array(p), I = 0; I < p; I++)
            g[I] = arguments[I];
          return b(Fe, {
            root: "VMenu"
          }, {
            default: () => {
              var x;
              return [(x = t.default) == null ? void 0 : x.call(t, ...g)];
            }
          });
        }
      });
    }), gt({
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
  ...Kt({
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
      default: () => [je(C("div", {
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
}, "VFieldLabel"), Jt = ne()({
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
}, "VField"), ca = ne()({
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
    } = Ge(e), {
      loaderClasses: i
    } = sl(e), {
      focusClasses: s,
      isFocused: u,
      focus: c,
      blur: r
    } = Sa(e), {
      InputIcon: d
    } = so(e), {
      roundedClasses: f
    } = _t(e), {
      rtlClasses: v
    } = nt(), m = H(() => e.dirty || e.active), k = H(() => !!(e.label || l.label)), y = H(() => !e.singleLine && k.value), p = ct(), g = A(() => e.id || `input-${p}`), I = H(() => `${g.value}-messages`), x = q(), S = q(), w = q(), P = A(() => ["plain", "underlined"].includes(e.variant)), h = A(() => e.error || e.disabled ? void 0 : m.value && u.value ? e.color : e.baseColor), B = A(() => {
      if (!(!e.iconColor || e.glow && !u.value))
        return e.iconColor === !0 ? h.value : e.iconColor;
    }), {
      backgroundColorClasses: T,
      backgroundColorStyles: E
    } = st(() => e.bgColor), {
      textColorClasses: R,
      textColorStyles: F
    } = Gt(h);
    Q(m, (j) => {
      if (y.value) {
        const te = x.value.$el, ae = S.value.$el;
        requestAnimationFrame(() => {
          const ue = vl(te), _ = ae.getBoundingClientRect(), $ = _.x - ue.x, O = _.y - ue.y - (ue.height / 2 - _.height / 2), U = _.width / 0.75, he = Math.abs(U - ue.width) > 1 ? {
            maxWidth: ye(U)
          } : void 0, le = getComputedStyle(te), se = getComputedStyle(ae), X = parseFloat(le.transitionDuration) * 1e3 || 150, re = parseFloat(se.getPropertyValue("--v-field-label-scale")), me = se.getPropertyValue("color");
          te.style.visibility = "visible", ae.style.visibility = "hidden", yt(te, {
            transform: `translate(${$}px, ${O}px) scale(${re})`,
            color: me,
            ...he
          }, {
            duration: X,
            easing: Ot,
            direction: j ? "normal" : "reverse"
          }).finished.then(() => {
            te.style.removeProperty("visibility"), ae.style.removeProperty("visibility");
          });
        });
      }
    }, {
      flush: "post"
    });
    const z = A(() => ({
      isActive: m,
      isFocused: u,
      controlRef: w,
      blur: r,
      focus: c
    }));
    function W(j) {
      j.target !== document.activeElement && j.preventDefault();
    }
    return ie(() => {
      var $, O, U;
      const j = e.variant === "outlined", te = !!(l["prepend-inner"] || e.prependInnerIcon), ae = !!(e.clearable || l.clear) && !e.disabled, ue = !!(l["append-inner"] || e.appendInnerIcon || ae), _ = () => l.label ? l.label({
        ...z.value,
        label: e.label,
        props: {
          for: g.value
        }
      }) : e.label;
      return C("div", L({
        class: ["v-field", {
          "v-field--active": m.value,
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
        }, o.value, T.value, s.value, i.value, f.value, v.value, e.class],
        style: [E.value, e.style],
        onClick: W
      }, t), [C("div", {
        class: "v-field__overlay"
      }, null), b(ul, {
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
        color: B.value
      }, null), ($ = l["prepend-inner"]) == null ? void 0 : $.call(l, z.value)]), C("div", {
        class: "v-field__field",
        "data-no-activator": ""
      }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(e.variant) && y.value && b(Jt, {
        key: "floating-label",
        ref: S,
        class: fe([R.value]),
        floating: !0,
        for: g.value,
        style: Ve(F.value)
      }, {
        default: () => [_()]
      }), k.value && b(Jt, {
        key: "label",
        ref: x,
        for: g.value
      }, {
        default: () => [_()]
      }), ((O = l.default) == null ? void 0 : O.call(l, {
        ...z.value,
        props: {
          id: g.value,
          class: "v-field__input",
          "aria-describedby": I.value
        },
        focus: c,
        blur: r
      })) ?? C("div", {
        id: g.value,
        class: "v-field__input",
        "aria-describedby": I.value
      }, null)]), ae && b(yn, {
        key: "clear"
      }, {
        default: () => [je(C("div", {
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
        })]), [[Tt, e.dirty]])]
      }), ue && C("div", {
        key: "append",
        class: "v-field__append-inner"
      }, [(U = l["append-inner"]) == null ? void 0 : U.call(l, z.value), e.appendInnerIcon && b(d, {
        key: "append-icon",
        name: "appendInner",
        color: B.value
      }, null)]), C("div", {
        class: fe(["v-field__outline", R.value]),
        style: Ve(F.value)
      }, [j && C(ee, null, [C("div", {
        class: "v-field__outline__start"
      }, null), y.value && C("div", {
        class: "v-field__outline__notch"
      }, [b(Jt, {
        ref: S,
        floating: !0,
        for: g.value
      }, {
        default: () => [_()]
      })]), C("div", {
        class: "v-field__outline__end"
      }, null)]), P.value && y.value && b(Jt, {
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
    vIntersect: la
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
    } = Sa(e), c = A(() => typeof e.counterValue == "function" ? e.counterValue(o.value) : typeof e.counterValue == "number" ? e.counterValue : (o.value ?? "").toString().length), r = A(() => {
      if (t.maxlength) return t.maxlength;
      if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string"))
        return e.counter;
    }), d = A(() => ["plain", "underlined"].includes(e.variant));
    function f(w, P) {
      var h, B;
      !e.autofocus || !w || (B = (h = P[0].target) == null ? void 0 : h.focus) == null || B.call(h);
    }
    const v = q(), m = q(), k = q(), y = A(() => Wu.includes(e.type) || e.persistentPlaceholder || i.value || e.active);
    function p() {
      i.value || s(), Te(() => {
        var w;
        k.value !== document.activeElement && ((w = k.value) == null || w.focus());
      });
    }
    function g(w) {
      a("mousedown:control", w), w.target !== k.value && (p(), w.preventDefault());
    }
    function I(w) {
      a("click:control", w);
    }
    function x(w, P) {
      w.stopPropagation(), p(), Te(() => {
        o.value = null, P(), dl(e["onClick:clear"], w);
      });
    }
    function S(w) {
      var h;
      const P = w.target;
      if (o.value = P.value, (h = e.modelModifiers) != null && h.trim && ["text", "search", "password", "tel", "url"].includes(e.type)) {
        const B = [P.selectionStart, P.selectionEnd];
        Te(() => {
          P.selectionStart = B[0], P.selectionEnd = B[1];
        });
      }
    }
    return ie(() => {
      const w = !!(l.counter || e.counter !== !1 && e.counter != null), P = !!(w || l.details), [h, B] = xa(t), {
        modelValue: T,
        ...E
      } = At.filterProps(e), R = ca.filterProps(e);
      return b(At, L({
        ref: v,
        modelValue: o.value,
        "onUpdate:modelValue": (F) => o.value = F,
        class: ["v-text-field", {
          "v-text-field--prefixed": e.prefix,
          "v-text-field--suffixed": e.suffix,
          "v-input--plain-underlined": d.value
        }, e.class],
        style: e.style
      }, h, E, {
        centerAffix: !d.value,
        focused: i.value
      }), {
        ...l,
        default: (F) => {
          let {
            id: z,
            isDisabled: W,
            isDirty: j,
            isReadonly: te,
            isValid: ae,
            reset: ue
          } = F;
          return b(ca, L({
            ref: m,
            onMousedown: g,
            onClick: I,
            "onClick:clear": (_) => x(_, ue),
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"],
            role: e.role
          }, R, {
            id: z.value,
            active: y.value || j.value,
            dirty: j.value || e.dirty,
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
              const U = je(C("input", L({
                ref: k,
                value: o.value,
                onInput: S,
                autofocus: e.autofocus,
                readonly: te.value,
                disabled: W.value,
                name: e.name,
                placeholder: e.placeholder,
                size: 1,
                type: e.type,
                onFocus: p,
                onBlur: u
              }, O, B), null), [[la, {
                handler: f
              }, null, {
                once: !0
              }]]);
              return C(ee, null, [e.prefix && C("span", {
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
          return C(ee, null, [(z = l.details) == null ? void 0 : z.call(l, F), w && C(ee, null, [C("span", null, null), b(vo, {
            active: e.persistentCounter || i.value,
            value: c.value,
            max: r.value,
            disabled: e.disabled
          }, l.counter)])]);
        } : void 0
      });
    }), gt({}, v, m, k);
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
      return e.renderless ? C(ee, null, [(s = l.default) == null ? void 0 : s.call(l, {
        itemRef: o
      })]) : C("div", L({
        ref: o,
        class: ["v-virtual-scroll__item", e.class],
        style: e.style
      }, t), [(u = l.default) == null ? void 0 : u.call(l)]);
    });
  }
}), ju = -1, Gu = 1, Ma = 100, Yu = K({
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
  const t = ft(), a = J(0);
  et(() => {
    a.value = parseFloat(e.itemHeight || 0);
  });
  const l = J(0), o = J(Math.ceil(
    // Assume 16px items filling the entire screen height if
    // not provided. This is probably incorrect but it minimises
    // the chance of ending up with empty space at the bottom.
    // The default value is set here to avoid poisoning getSize()
    (parseInt(e.height) || t.height.value) / (a.value || 16)
  ) || 1), i = J(0), s = J(0), u = q(), c = q();
  let r = 0;
  const {
    resizeRef: d,
    contentRect: f
  } = Vt();
  et(() => {
    d.value = u.value;
  });
  const v = A(() => {
    var _;
    return u.value === document.documentElement ? t.height.value : ((_ = f.value) == null ? void 0 : _.height) || parseInt(e.height) || 0;
  }), m = A(() => !!(u.value && c.value && v.value && a.value));
  let k = Array.from({
    length: n.value.length
  }), y = Array.from({
    length: n.value.length
  });
  const p = J(0);
  let g = -1;
  function I(_) {
    return k[_] || a.value;
  }
  const x = Ki(() => {
    const _ = performance.now();
    y[0] = 0;
    const $ = n.value.length;
    for (let O = 1; O <= $ - 1; O++)
      y[O] = (y[O - 1] || 0) + I(O - 1);
    p.value = Math.max(p.value, performance.now() - _);
  }, p), S = Q(m, (_) => {
    _ && (S(), r = c.value.offsetTop, x.immediate(), j(), ~g && Te(() => {
      He && window.requestAnimationFrame(() => {
        ae(g), g = -1;
      });
    }));
  });
  Ue(() => {
    x.clear();
  });
  function w(_, $) {
    const O = k[_], U = a.value;
    a.value = U ? Math.min(a.value, $) : $, (O !== $ || U !== a.value) && (k[_] = $, x());
  }
  function P(_) {
    return _ = Je(_, 0, n.value.length - 1), y[_] || 0;
  }
  function h(_) {
    return Xu(y, _);
  }
  let B = 0, T = 0, E = 0;
  Q(v, (_, $) => {
    $ && (j(), _ < $ && requestAnimationFrame(() => {
      T = 0, j();
    }));
  });
  let R = -1;
  function F() {
    if (!u.value || !c.value) return;
    const _ = u.value.scrollTop, $ = performance.now();
    $ - E > 500 ? (T = Math.sign(_ - B), r = c.value.offsetTop) : T = _ - B, B = _, E = $, window.clearTimeout(R), R = window.setTimeout(z, 500), j();
  }
  function z() {
    !u.value || !c.value || (T = 0, E = 0, window.clearTimeout(R), j());
  }
  let W = -1;
  function j() {
    cancelAnimationFrame(W), W = requestAnimationFrame(te);
  }
  function te() {
    if (!u.value || !v.value) return;
    const _ = B - r, $ = Math.sign(T), O = Math.max(0, _ - Ma), U = Je(h(O), 0, n.value.length), he = _ + v.value + Ma, le = Je(h(he) + 1, U + 1, n.value.length);
    if (
      // Only update the side we're scrolling towards,
      // the other side will be updated incidentally
      ($ !== ju || U < l.value) && ($ !== Gu || le > o.value)
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
  const ue = A(() => n.value.slice(l.value, o.value).map((_, $) => {
    const O = $ + l.value;
    return {
      raw: _,
      index: O,
      key: St(_, e.itemKey, O)
    };
  }));
  return Q(n, () => {
    k = Array.from({
      length: n.value.length
    }), y = Array.from({
      length: n.value.length
    }), x.immediate(), j();
  }, {
    deep: 1
  }), {
    calculateVisibleItems: j,
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
  ...Ut()
}, "VVirtualScroll"), fo = ne()({
  name: "VVirtualScroll",
  props: Zu(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = lt("VVirtualScroll"), {
      dimensionStyles: l
    } = Wt(e), {
      calculateVisibleItems: o,
      containerRef: i,
      markerRef: s,
      handleScroll: u,
      handleScrollend: c,
      handleItemResize: r,
      scrollToIndex: d,
      paddingTop: f,
      paddingBottom: v,
      computedItems: m
    } = qu(e, H(() => e.items));
    return qe(() => e.renderless, () => {
      function k() {
        var g, I;
        const p = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1) ? "addEventListener" : "removeEventListener";
        i.value === document.documentElement ? (document[p]("scroll", u, {
          passive: !0
        }), document[p]("scrollend", c)) : ((g = i.value) == null || g[p]("scroll", u, {
          passive: !0
        }), (I = i.value) == null || I[p]("scrollend", c));
      }
      Ze(() => {
        i.value = _n(a.vnode.el, !0), k(!0);
      }), Ue(k);
    }), ie(() => {
      const k = m.value.map((y) => b(Ku, {
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
      return e.renderless ? C(ee, null, [C("div", {
        ref: s,
        class: "v-virtual-scroll__spacer",
        style: {
          paddingTop: ye(f.value)
        }
      }, null), k, C("div", {
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
          paddingTop: ye(f.value),
          paddingBottom: ye(v.value)
        }
      }, [k])]);
    }), {
      calculateVisibleItems: o,
      scrollToIndex: d
    };
  }
});
function mo(e, n) {
  const t = J(!1);
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
      const f = u.getBoundingClientRect().top;
      for (const v of c)
        if (v.getBoundingClientRect().top >= f) {
          v.focus();
          break;
        }
    } else {
      const f = u.getBoundingClientRect().bottom;
      for (const v of [...c].reverse())
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
  ...mt(Sl({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...Kt({
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
    }), d = A(() => typeof e.counterValue == "function" ? e.counterValue(r.value) : typeof e.counterValue == "number" ? e.counterValue : r.value.length), f = bl(e), v = A(() => r.value.map((_) => _.value)), m = J(!1);
    let k = "", y = -1, p;
    const g = A(() => e.hideSelected ? s.value.filter((_) => !r.value.some(($) => (e.valueComparator || it)($, _))) : s.value), I = A(() => e.hideNoData && !g.value.length || f.isReadonly.value || f.isDisabled.value), x = we(e, "menu"), S = A({
      get: () => x.value,
      set: (_) => {
        var $;
        x.value && !_ && (($ = o.value) != null && $.ΨopenChildren.size) || _ && I.value || (x.value = _);
      }
    }), w = H(() => S.value ? e.closeText : e.openText), P = A(() => {
      var _;
      return {
        ...e.menuProps,
        activatorProps: {
          ...((_ = e.menuProps) == null ? void 0 : _.activatorProps) || {},
          "aria-haspopup": "listbox"
          // Set aria-haspopup to 'listbox'
        }
      };
    }), h = q(), B = mo(h, l);
    function T(_) {
      e.openOnClear && (S.value = !0);
    }
    function E() {
      I.value || (S.value = !S.value);
    }
    function R(_) {
      na(_) && F(_);
    }
    function F(_) {
      var me, N, Z;
      if (!_.key || f.isReadonly.value) return;
      ["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(_.key) && _.preventDefault(), ["Enter", "ArrowDown", " "].includes(_.key) && (S.value = !0), ["Escape", "Tab"].includes(_.key) && (S.value = !1), _.key === "Home" ? (me = h.value) == null || me.focus("first") : _.key === "End" && ((N = h.value) == null || N.focus("last"));
      const $ = 1e3;
      if (!na(_)) return;
      const O = performance.now();
      O - p > $ && (k = "", y = -1), k += _.key.toLowerCase(), p = O;
      const U = g.value;
      function he() {
        let ce = le();
        return ce || k.at(-1) === k.at(-2) && (k = k.slice(0, -1), ce = le(), ce) || (y = -1, ce = le(), ce) ? ce : (k = _.key.toLowerCase(), le());
      }
      function le() {
        for (let ce = y + 1; ce < U.length; ce++) {
          const ge = U[ce];
          if (ge.title.toLowerCase().startsWith(k))
            return [ge, ce];
        }
      }
      const se = he();
      if (!se) return;
      const [X, re] = se;
      y = re, (Z = h.value) == null || Z.focus(re), e.multiple || (r.value = [X]);
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
      ($ = h.value) != null && $.$el.contains(_.relatedTarget) || (S.value = !1);
    }
    function j() {
      var _;
      e.eager && ((_ = i.value) == null || _.calculateVisibleItems());
    }
    function te() {
      var _;
      m.value && ((_ = l.value) == null || _.focus());
    }
    function ae(_) {
      m.value = !0;
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
      S.value || m.value && !$.length && _.length && (S.value = !0);
    }), ie(() => {
      const _ = !!(e.chips || t.chip), $ = !!(!e.hideNoData || g.value.length || t["prepend-item"] || t["append-item"] || t["no-data"]), O = r.value.length > 0, U = rt.filterProps(e), he = O || !m.value && e.label && !e.persistentPlaceholder ? void 0 : e.placeholder;
      return b(rt, L({
        ref: l
      }, U, {
        modelValue: r.value.map((le) => le.props.value).join(", "),
        "onUpdate:modelValue": ue,
        focused: m.value,
        "onUpdate:focused": (le) => m.value = le,
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
        default: () => C(ee, null, [b(wl, L({
          ref: o,
          modelValue: S.value,
          "onUpdate:modelValue": (le) => S.value = le,
          activator: "parent",
          contentClass: "v-select__content",
          disabled: I.value,
          eager: e.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: e.transition,
          onAfterEnter: j,
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
          }, B, e.listProps), {
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
                  const ce = ji(me.props), ge = L(me.props, {
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
                      return C(ee, null, [e.multiple && !e.hideSelected ? b(bt, {
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
            }, [_ ? t.chip ? b(Fe, {
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
            }) : b(pl, L({
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
          return C(ee, null, [(re = t["append-inner"]) == null ? void 0 : re.call(t, ...se), e.menuIcon ? b(ke, {
            class: "v-select__menu-icon",
            color: (me = l.value) == null ? void 0 : me.fieldIconColor,
            icon: e.menuIcon
          }, null) : void 0]);
        }
      });
    }), gt({
      isFocused: m,
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
    const [c, r = c] = Ne(e[u]), d = {}, f = {};
    let v = -1;
    if ((n || i > 0) && !(t != null && t.noFilter)) {
      if (typeof c == "object") {
        const y = o || Object.keys(r);
        for (const p of y) {
          const g = St(r, p), I = (s = t == null ? void 0 : t.customKeyFilter) == null ? void 0 : s[p];
          if (v = I ? I(g, n, c) : l(g, n, c), v !== -1 && v !== !1)
            I ? d[p] = Da(v, n) : f[p] = Da(v, n);
          else if ((t == null ? void 0 : t.filterMode) === "every")
            continue e;
        }
      } else
        v = l(c, n, c), v !== -1 && v !== !1 && (f.title = Da(v, n));
      const m = Object.keys(f).length, k = Object.keys(d).length;
      if (!m && !k || (t == null ? void 0 : t.filterMode) === "union" && k !== i && !m || (t == null ? void 0 : t.filterMode) === "intersection" && (k !== i || !m)) continue;
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
  const l = J([]), o = J(/* @__PURE__ */ new Map()), i = A(() => a != null && a.transform ? V(n).map((u) => [u, a.transform(u)]) : V(n));
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
    }), d = V(n), f = [], v = /* @__PURE__ */ new Map();
    r.forEach((m) => {
      let {
        index: k,
        matches: y
      } = m;
      const p = d[k];
      f.push(p), v.set(p.value, y);
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
function tr(e, n, t) {
  return t == null || !t.length ? n : t.map((a, l) => {
    const o = l === 0 ? 0 : t[l - 1][1], i = [C("span", {
      class: fe(`${e}__unmask`)
    }, [n.slice(o, a[0])]), C("span", {
      class: fe(`${e}__mask`)
    }, [n.slice(a[0], a[1])])];
    return l === t.length - 1 && i.push(C("span", {
      class: fe(`${e}__unmask`)
    }, [n.slice(a[1])])), C(ee, null, [i]);
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
  ...mt(Sl({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...Kt({
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
    } = ot(), l = q(), o = J(!1), i = J(!0), s = J(!1), u = q(), c = q(), r = J(-1), {
      items: d,
      transformIn: f,
      transformOut: v
    } = pn(e), {
      textColorClasses: m,
      textColorStyles: k
    } = Gt(() => {
      var N;
      return (N = l.value) == null ? void 0 : N.color;
    }), y = we(e, "search", ""), p = we(e, "modelValue", [], (N) => f(N === null ? [null] : Ne(N)), (N) => {
      const Z = v(N);
      return e.multiple ? Z : Z[0] ?? null;
    }), g = A(() => typeof e.counterValue == "function" ? e.counterValue(p.value) : typeof e.counterValue == "number" ? e.counterValue : p.value.length), I = bl(e), {
      filteredItems: x,
      getMatches: S
    } = ho(e, d, () => i.value ? "" : y.value), w = A(() => e.hideSelected ? x.value.filter((N) => !p.value.some((Z) => Z.value === N.value)) : x.value), P = A(() => !!(e.chips || t.chip)), h = A(() => P.value || !!t.selection), B = A(() => p.value.map((N) => N.props.value)), T = A(() => {
      var Z;
      return (e.autoSelectFirst === !0 || e.autoSelectFirst === "exact" && y.value === ((Z = w.value[0]) == null ? void 0 : Z.title)) && w.value.length > 0 && !i.value && !s.value;
    }), E = A(() => e.hideNoData && !w.value.length || I.isReadonly.value || I.isDisabled.value), R = we(e, "menu"), F = A({
      get: () => R.value,
      set: (N) => {
        var Z;
        R.value && !N && ((Z = u.value) != null && Z.ΨopenChildren.size) || N && E.value || (R.value = N);
      }
    }), z = A(() => F.value ? e.closeText : e.openText), W = q(), j = mo(W, l);
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
      N.key !== " " && na(N) && ((Z = l.value) == null || Z.focus());
    }
    function $(N) {
      var ge, Ce, _e, De, Ae;
      if (I.isReadonly.value) return;
      const Z = (ge = l.value) == null ? void 0 : ge.selectionStart, ce = p.value.length;
      if (["Enter", "ArrowDown", "ArrowUp"].includes(N.key) && N.preventDefault(), ["Enter", "ArrowDown"].includes(N.key) && (F.value = !0), ["Escape"].includes(N.key) && (F.value = !1), T.value && ["Enter", "Tab"].includes(N.key) && !p.value.some((Ee) => {
        let {
          value: Be
        } = Ee;
        return Be === w.value[0].value;
      }) && me(w.value[0]), N.key === "ArrowDown" && T.value && ((Ce = W.value) == null || Ce.focus("next")), ["Backspace", "Delete"].includes(N.key)) {
        if (!e.multiple && h.value && p.value.length > 0 && !y.value) return me(p.value[0], !1);
        if (~r.value) {
          N.preventDefault();
          const Ee = r.value;
          me(p.value[r.value], !1), r.value = Ee >= ce - 1 ? ce - 2 : Ee;
        } else N.key === "Backspace" && !y.value && (r.value = ce - 1);
        return;
      }
      if (e.multiple)
        if (N.key === "ArrowLeft") {
          if (r.value < 0 && Z && Z > 0) return;
          const Ee = r.value > -1 ? r.value - 1 : ce - 1;
          if (p.value[Ee])
            r.value = Ee;
          else {
            const Be = ((_e = y.value) == null ? void 0 : _e.length) ?? null;
            r.value = -1, (De = l.value) == null || De.setSelectionRange(Be, Be);
          }
        } else if (N.key === "ArrowRight") {
          if (r.value < 0) return;
          const Ee = r.value + 1;
          p.value[Ee] ? r.value = Ee : (r.value = -1, (Ae = l.value) == null || Ae.setSelectionRange(0, 0));
        } else ~r.value && na(N) && (r.value = -1);
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
    const re = J(!1);
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
          p.value = ce ? [N] : [], y.value = ce && !h.value ? N.title : "", Te(() => {
            F.value = !1, i.value = !0;
          });
        }
    }
    return Q(o, (N, Z) => {
      var ce;
      N !== Z && (N ? (re.value = !0, y.value = e.multiple || h.value ? "" : String(((ce = p.value.at(-1)) == null ? void 0 : ce.props.title) ?? ""), i.value = !0, Te(() => re.value = !1)) : (!e.multiple && y.value == null && (p.value = []), F.value = !1, (e.multiple || h.value) && (y.value = ""), r.value = -1));
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
        readonly: I.isReadonly.value,
        placeholder: Z ? void 0 : e.placeholder,
        "onClick:clear": te,
        "onMousedown:control": ae,
        onKeydown: $
      }), {
        ...t,
        default: () => C(ee, null, [b(wl, L({
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
          default: () => [N && b(ut, L({
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
          }, j, e.listProps), {
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
                  var Al;
                  let {
                    item: Ae,
                    index: Ee,
                    itemRef: Be
                  } = De;
                  const Il = L(Ae.props, {
                    ref: Be,
                    key: Ae.value,
                    active: T.value && Ee === 0 ? !0 : void 0,
                    onClick: () => me(Ae, null)
                  });
                  return ((Al = t.item) == null ? void 0 : Al.call(t, {
                    item: Ae,
                    index: Ee,
                    props: Il
                  })) ?? b(Ye, L(Il, {
                    role: "option"
                  }), {
                    prepend: (Xt) => {
                      let {
                        isSelected: li
                      } = Xt;
                      return C(ee, null, [e.multiple && !e.hideSelected ? b(bt, {
                        key: Ae.value,
                        modelValue: li,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, Ae.props.prependAvatar && b(Pt, {
                        image: Ae.props.prependAvatar
                      }, null), Ae.props.prependIcon && b(ke, {
                        icon: Ae.props.prependIcon
                      }, null)]);
                    },
                    title: () => {
                      var Xt;
                      return i.value ? Ae.title : tr("v-autocomplete", Ae.title, (Xt = S(Ae)) == null ? void 0 : Xt.title);
                    }
                  });
                }
              }), (_e = t["append-item"]) == null ? void 0 : _e.call(t)];
            }
          })]
        }), p.value.map((ge, Ce) => {
          function _e(Be) {
            Be.stopPropagation(), Be.preventDefault(), me(ge, !1);
          }
          const De = {
            "onClick:close": _e,
            onKeydown(Be) {
              Be.key !== "Enter" && Be.key !== " " || (Be.preventDefault(), Be.stopPropagation(), _e(Be));
            },
            onMousedown(Be) {
              Be.preventDefault(), Be.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, Ae = P.value ? !!t.chip : !!t.selection, Ee = Ae ? In(P.value ? t.chip({
            item: ge,
            index: Ce,
            props: De
          }) : t.selection({
            item: ge,
            index: Ce
          })) : void 0;
          if (!(Ae && !Ee))
            return C("div", {
              key: ge.value,
              class: fe(["v-autocomplete__selection", Ce === r.value && ["v-autocomplete__selection--selected", m.value]]),
              style: Ve(Ce === r.value ? k.value : {})
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
              default: () => [Ee]
            }) : b(pl, L({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: ge.title,
              disabled: ge.props.disabled
            }, De), null) : Ee ?? C("span", {
              class: "v-autocomplete__selection-text"
            }, [ge.title, e.multiple && Ce < p.value.length - 1 && C("span", {
              class: "v-autocomplete__selection-comma"
            }, [Pe(",")])])]);
        })]),
        "append-inner": function() {
          var De, Ae;
          for (var ge = arguments.length, Ce = new Array(ge), _e = 0; _e < ge; _e++)
            Ce[_e] = arguments[_e];
          return C(ee, null, [(De = t["append-inner"]) == null ? void 0 : De.call(t, ...Ce), e.menuIcon ? b(ke, {
            class: "v-autocomplete__menu-icon",
            color: (Ae = l.value) == null ? void 0 : Ae.fieldIconColor,
            icon: e.menuIcon,
            onMousedown: ue,
            onClick: Gi,
            "aria-label": a(z.value),
            title: a(z.value),
            tabindex: "-1"
          }, null) : void 0]);
        }
      });
    }), gt({
      isFocused: o,
      isPristine: i,
      menu: F,
      search: y,
      filteredItems: x,
      select: me
    }, l);
  }
}), nr = ["name", "value"], or = /* @__PURE__ */ We({
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
    const t = pt(), a = el(e, "modelValue"), l = q(""), o = e, i = Lt(), s = ve("repos"), { state: u, query: c, fetch: r } = bi(o.repo, s, { save: !1 }), d = Qe([]), f = q([]);
    async function v(g) {
      const I = g && m(g);
      if (I != null && I.length) {
        const x = await r({ id: I });
        d.splice(0, 0, ...x.entities);
      }
      k(g);
    }
    function m(g) {
      if (!Array.isArray(g))
        return d.findIndex((x) => x.id == g) == -1 ? [g] : null;
      const I = new Set(d.map((x) => x.id));
      return g.filter((x) => !I.has(x));
    }
    function k(g) {
      Array.isArray(g) ? f.value = d.filter((I) => g.includes(I.id)) : g ? (f.value = [d.find((I) => I.id == g)], console.log("updated", g, d, f.value)) : f.value = [];
    }
    let y = null;
    const p = _a.debounce(async ({ reset: g = !1 } = {}) => {
      if (u.isProcessing)
        return;
      const I = l.value != "<empty string>" && l.value || "";
      if (!g && I == y)
        return;
      y = I;
      const x = { ...o.filters, page_size: 20 };
      x[o.lookup] = I;
      let S = await r({ params: x });
      const w = f.value ? _a.unionBy(S.entities, f.value, (P) => P.id) : S.entities;
      d.splice(0, d.length, ...w), g || (l.value = I);
    }, 500);
    return Ze(async () => {
      await p(), a.value && await v(a.value);
    }), Q(() => o.filters, (g, I) => {
      _a.isEqual(La(g), La(I)) || p({ reset: !0 });
    }), Q(l, (g) => {
      g != "<empty string>" && g != y && p({ q: g });
    }), Q(a, (g, I) => {
      g != I && k(g);
    }), n({ value: a, selected: f, load: p, items: d }), (g, I) => (D(), pe(ee, null, [
      o.name ? (D(), pe("input", {
        key: 0,
        type: "hidden",
        name: o.name,
        value: a.value
      }, null, 8, nr)) : de("", !0),
      b(V(lr), L(V(i), {
        items: d,
        loading: V(u).isProcessing,
        modelValue: a.value,
        "onUpdate:modelValue": I[0] || (I[0] = (x) => a.value = x),
        search: l.value,
        "onUpdate:search": I[1] || (I[1] = (x) => l.value = x)
      }), kt({ _: 2 }, [
        Me(V(t), (x, S) => ({
          name: S,
          fn: M((w) => [
            Y(g.$slots, S, $e(Oe(w)))
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
    const n = J(null), t = A(() => {
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
    vIntersect: la
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
    } = Sa(e), c = A(() => typeof e.counterValue == "function" ? e.counterValue(o.value) : (o.value || "").toString().length), r = A(() => {
      if (t.maxlength) return t.maxlength;
      if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string"))
        return e.counter;
    });
    function d(E, R) {
      var F, z;
      !e.autofocus || !E || (z = (F = R[0].target) == null ? void 0 : F.focus) == null || z.call(F);
    }
    const f = q(), v = q(), m = J(""), k = q(), y = A(() => e.persistentPlaceholder || i.value || e.active);
    function p() {
      var E;
      k.value !== document.activeElement && ((E = k.value) == null || E.focus()), i.value || s();
    }
    function g(E) {
      p(), a("click:control", E);
    }
    function I(E) {
      a("mousedown:control", E);
    }
    function x(E) {
      E.stopPropagation(), p(), Te(() => {
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
    const w = q(), P = q(Number(e.rows)), h = A(() => ["plain", "underlined"].includes(e.variant));
    et(() => {
      e.autoGrow || (P.value = Number(e.rows));
    });
    function B() {
      e.autoGrow && Te(() => {
        if (!w.value || !v.value) return;
        const E = getComputedStyle(w.value), R = getComputedStyle(v.value.$el), F = parseFloat(E.getPropertyValue("--v-field-padding-top")) + parseFloat(E.getPropertyValue("--v-input-padding-top")) + parseFloat(E.getPropertyValue("--v-field-padding-bottom")), z = w.value.scrollHeight, W = parseFloat(E.lineHeight), j = Math.max(parseFloat(e.rows) * W + F, parseFloat(R.getPropertyValue("--v-input-control-height"))), te = parseFloat(e.maxRows) * W + F || 1 / 0, ae = Je(z ?? 0, j, te);
        P.value = Math.floor((ae - F) / W), m.value = ye(ae);
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
        ...j
      } = At.filterProps(e), te = ca.filterProps(e);
      return b(At, L({
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
          "v-input--plain-underlined": h.value
        }, e.class],
        style: e.style
      }, F, j, {
        centerAffix: P.value === 1 && !h.value,
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
          return b(ca, L({
            ref: v,
            style: {
              "--v-textarea-control-height": m.value
            },
            onClick: g,
            onMousedown: I,
            "onClick:clear": x,
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"]
          }, te, {
            id: ue.value,
            active: y.value || $.value,
            centerAffix: P.value === 1 && !h.value,
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
              return C(ee, null, [e.prefix && C("span", {
                class: "v-text-field__prefix"
              }, [e.prefix]), je(C("textarea", L({
                ref: k,
                class: le,
                value: o.value,
                onInput: S,
                autofocus: e.autofocus,
                readonly: O.value,
                disabled: _.value,
                placeholder: e.placeholder,
                rows: e.rows,
                name: e.name,
                onFocus: p,
                onBlur: u
              }, se, z), null), [[la, {
                handler: d
              }, null, {
                once: !0
              }]]), e.autoGrow && je(C("textarea", {
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
          return C(ee, null, [(ue = l.details) == null ? void 0 : ue.call(l, ae), E && C(ee, null, [C("span", null, null), b(vo, {
            active: e.persistentCounter || i.value,
            value: c.value,
            max: r.value,
            disabled: e.disabled
          }, l.counter)])]);
        } : void 0
      });
    }), gt({}, f, v, k);
  }
}), rr = /* @__PURE__ */ We({
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
    const n = Lt(), t = e, a = A(() => {
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
      return Y(l.$slots, "default", {
        props: a.value,
        editor: t.editor
      }, () => [
        t.type == "select" ? (D(), G(kl, L({ key: 0 }, a.value, {
          modelValue: t.editor.value[t.name],
          "onUpdate:modelValue": o[0] || (o[0] = (s) => t.editor.value[t.name] = s)
        }), null, 16, ["modelValue"])) : t.type == "textarea" ? (D(), G(ur, L({ key: 1 }, a.value, {
          modelValue: t.editor.value[t.name],
          "onUpdate:modelValue": o[1] || (o[1] = (s) => t.editor.value[t.name] = s)
        }), null, 16, ["modelValue"])) : t.type == "checkbox" ? (D(), G(Ru, L({ key: 2 }, a.value, {
          modelValue: t.editor.value[t.name],
          "onUpdate:modelValue": o[2] || (o[2] = (s) => t.editor.value[t.name] = s)
        }), null, 16, ["modelValue"])) : t.type == "date" ? (D(), G(i, L({ key: 3 }, a.value, {
          modelValue: t.editor.value[t.name],
          "onUpdate:modelValue": o[3] || (o[3] = (s) => t.editor.value[t.name] = s)
        }), null, 16, ["modelValue"])) : (D(), G(rt, L({ key: 4 }, a.value, {
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
    const t = ve("list"), a = e, l = A(() => {
      const s = t.filters;
      return s && Object.entries(s).some(
        ([u, c]) => !u.startsWith("page") && !u.startsWith("ordering") && !!c
      );
    }), o = A(() => l.value ? "mdi-filter-check" : "mdi-filter-outline");
    function i() {
      t.filters = {}, t.load();
    }
    return n({ icon: o, hasFilters: l, reset: i }), (s, u) => (D(), pe("form", {
      onSubmit: u[2] || (u[2] = Ie((c) => V(t).load(), ["prevent"])),
      class: "ox-list-filters width-full"
    }, [
      b(Wa, {
        dense: "",
        color: "transparent"
      }, {
        default: M(() => [
          b(Hn, {
            icon: o.value,
            readonly: ""
          }, null, 8, ["icon"]),
          a.search && V(t).filters ? (D(), G(rt, {
            key: 0,
            label: V(oe)("filters.search"),
            density: "compact",
            class: "ml-2",
            modelValue: V(t).filters[a.search],
            "onUpdate:modelValue": u[0] || (u[0] = (c) => V(t).filters[a.search] = c),
            "hide-details": ""
          }, null, 8, ["label", "modelValue"])) : de("", !0),
          Y(s.$slots, "default", {
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
          l.value ? (D(), G(be, {
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
          valid: f
        } = d;
        f && ((v = o.value) == null || v.submit());
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
    }), gt(l, o);
  }
}), dr = { class: "flex-row justify-right" }, vr = /* @__PURE__ */ We({
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
    const n = el(e, "modelValue"), t = ve("user"), a = q({}), l = e, o = A(() => ({
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
    return (r, d) => (D(), G(ut, {
      opened: i.value,
      "onUpdate:opened": d[3] || (d[3] = (f) => i.value = f)
    }, {
      default: M(() => {
        var f;
        return [
          (f = n.value) != null && f.length ? (D(!0), pe(ee, { key: 0 }, Me(n.value, (v, m) => (D(), G(Ha, {
            key: m,
            value: m
          }, {
            activator: M(({ props: k }) => [
              b(Ye, L({ ref_for: !0 }, k), {
                append: M(() => [
                  C("div", {
                    onClick: d[0] || (d[0] = Ie(() => {
                    }, ["stop"]))
                  }, [
                    Y(r.$slots, "item.actions", L({
                      item: v,
                      index: m
                    }, { ref_for: !0 }, k)),
                    o.value.delete ? (D(), G(be, {
                      key: 0,
                      type: "button",
                      class: "ml-2",
                      size: "small",
                      onClick: Ie((y) => u(m), ["stop", "prevent"]),
                      color: "error",
                      "aria-label": V(oe)("actions.remove"),
                      title: V(oe)("actions.remove"),
                      icon: "mdi-delete"
                    }, null, 8, ["onClick", "aria-label", "title"])) : de("", !0)
                  ])
                ]),
                default: M(() => [
                  b(Ei, null, {
                    default: M(() => [
                      Y(r.$slots, "item.title", { item: v })
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1040)
            ]),
            default: M(() => [
              b(Za, {
                disabled: !o.value.change
              }, {
                default: M(() => [
                  Y(r.$slots, "item", {
                    item: v,
                    index: m,
                    editable: o.value.change
                  })
                ]),
                _: 2
              }, 1032, ["disabled"])
            ]),
            _: 2
          }, 1032, ["value"]))), 128)) : (D(), G(Ye, {
            key: 1,
            title: V(oe)("lists.empty")
          }, null, 8, ["title"])),
          o.value.add ? (D(), pe(ee, { key: 2 }, [
            n.value.length ? (D(), G(Nt, { key: 0 })) : de("", !0),
            b(Ha, { value: -1 }, {
              activator: M(({ props: v }) => [
                b(Ye, L(v, {
                  title: V(oe)("actions.add_item"),
                  "prepend-icon": "mdi-plus"
                }), null, 16, ["title"])
              ]),
              default: M(() => [
                b(Za, null, {
                  default: M(() => [
                    Y(r.$slots, "item", {
                      item: a.value,
                      edit: !0
                    })
                  ]),
                  _: 3
                }),
                a.value ? (D(), G(Ye, { key: 0 }, {
                  default: M(() => [
                    C("div", dr, [
                      a.value ? (D(), G(be, {
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
                      a.value ? (D(), G(be, {
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
  ...Ke()
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
  ...vt()
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
      }, t.prepend) : C(ee, null, [e.prependAvatar && b(Pt, {
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
      }, t.append) : C(ee, null, [e.appendIcon && b(ke, {
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
  ...Ke()
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
  ...zt(),
  ...Se(),
  ...vt(),
  ...Ut(),
  ...Ht(),
  ...rl(),
  ...vn(),
  ...dn(),
  ...wt(),
  ...bn(),
  ...Ke(),
  ...Le(),
  ...jt({
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
    } = Ge(e), {
      borderClasses: o
    } = ya(e), {
      colorClasses: i,
      colorStyles: s,
      variantClasses: u
    } = al(e), {
      densityClasses: c
    } = Bt(e), {
      dimensionStyles: r
    } = Wt(e), {
      elevationClasses: d
    } = ha(e), {
      loaderClasses: f
    } = sl(e), {
      locationStyles: v
    } = Oi(e), {
      positionClasses: m
    } = cn(e), {
      roundedClasses: k
    } = _t(e), y = gn(e, t);
    return ie(() => {
      const p = e.link !== !1 && y.isLink.value, g = !e.disabled && e.link !== !1 && (e.link || y.isClickable.value), I = p ? "a" : e.tag, x = !!(a.title || e.title != null), S = !!(a.subtitle || e.subtitle != null), w = x || S, P = !!(a.append || e.appendAvatar || e.appendIcon), h = !!(a.prepend || e.prependAvatar || e.prependIcon), B = !!(a.image || e.image), T = w || h || P, E = !!(a.text || e.text != null);
      return je(b(I, L({
        class: ["v-card", {
          "v-card--disabled": e.disabled,
          "v-card--flat": e.flat,
          "v-card--hover": e.hover && !(e.disabled || e.flat),
          "v-card--link": g
        }, l.value, o.value, i.value, c.value, d.value, f.value, m.value, k.value, u.value, e.class],
        style: [s.value, r.value, v.value, e.style],
        onClick: g && y.navigate,
        tabindex: e.disabled ? -1 : void 0
      }, y.linkProps), {
        default: () => {
          var R;
          return [B && C("div", {
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
          }, null)]), b(ul, {
            name: "v-card",
            active: !!e.loading,
            color: typeof e.loading == "boolean" ? void 0 : e.loading
          }, {
            default: a.loader
          }), T && b(hr, {
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
          }), E && b(pr, {
            key: "text"
          }, {
            default: () => {
              var F;
              return [((F = a.text) == null ? void 0 : F.call(a)) ?? e.text];
            }
          }), (R = a.default) == null ? void 0 : R.call(a), a.actions && b(fr, null, {
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
    const s = A(() => {
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
    return (u, c) => (D(), G(wn, null, {
      default: M(() => [
        b(Dt, null, {
          default: M(() => [
            (D(!0), pe(ee, null, Me(l.headers, (r, d) => (D(), G(Sr, {
              key: r.value
            }, {
              default: M(({ selectedClass: f }) => [
                b(xr, {
                  width: "400",
                  class: fe(["ma-3", f]),
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
                        s.value && s.value[r.value] ? (D(!0), pe(ee, { key: 0 }, Me(s.value[r.value], (v) => Y(u.$slots, "item", {
                          key: v.id,
                          header: r,
                          item: v
                        }, () => [
                          b(Ye, {
                            title: v[l.itemTitle],
                            value: l.itemValue && v[l.itemValue],
                            onClick: (m) => t("click", v)
                          }, {
                            append: M(() => [
                              Y(u.$slots, "item.action")
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
  ...zt(),
  ...Se(),
  ...vt(),
  ...Ht(),
  ...wt(),
  ...hn(),
  ...Ke({
    tag: "nav"
  }),
  ...Le(),
  ...jt({
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
    } = Ge(e), {
      width: c
    } = ft(), r = J(-1);
    at(void 0, {
      scoped: !0
    });
    const {
      resizeRef: d
    } = Vt((h) => {
      if (!h.length) return;
      const {
        target: B,
        contentRect: T
      } = h[0], E = B.querySelector(".v-pagination__list > *");
      if (!E) return;
      const R = T.width, F = E.offsetWidth + parseFloat(getComputedStyle(E).marginRight) * 2;
      r.value = k(R, F);
    }), f = A(() => parseInt(e.length, 10)), v = A(() => parseInt(e.start, 10)), m = A(() => e.totalVisible != null ? parseInt(e.totalVisible, 10) : r.value >= 0 ? r.value : k(c.value, 58));
    function k(h, B) {
      const T = e.showFirstLastPage ? 5 : 3;
      return Math.max(0, Math.floor(
        // Round to two decimal places to avoid floating point errors
        Number(((h - B * T) / B).toFixed(2))
      ));
    }
    const y = A(() => {
      if (f.value <= 0 || isNaN(f.value) || f.value > Number.MAX_SAFE_INTEGER) return [];
      if (m.value <= 0) return [];
      if (m.value === 1) return [l.value];
      if (f.value <= m.value)
        return Zt(f.value, v.value);
      const h = m.value % 2 === 0, B = h ? m.value / 2 : Math.floor(m.value / 2), T = h ? B : B + 1, E = f.value - B;
      if (T - l.value >= 0)
        return [...Zt(Math.max(1, m.value - 1), v.value), e.ellipsis, f.value];
      if (l.value - E >= (h ? 1 : 0)) {
        const R = m.value - 1, F = f.value - R + v.value;
        return [v.value, e.ellipsis, ...Zt(R, F)];
      } else {
        const R = Math.max(1, m.value - 2), F = R === 1 ? l.value : l.value - Math.ceil(R / 2) + v.value;
        return [v.value, e.ellipsis, ...Zt(R, F), e.ellipsis, f.value];
      }
    });
    function p(h, B, T) {
      h.preventDefault(), l.value = B, T && a(T, B);
    }
    const {
      refs: g,
      updateRef: I
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
    const x = A(() => y.value.map((h, B) => {
      const T = (E) => I(E, B);
      if (typeof h == "string")
        return {
          isActive: !1,
          key: `ellipsis-${B}`,
          page: h,
          props: {
            ref: T,
            ellipsis: !0,
            icon: !0,
            disabled: !0
          }
        };
      {
        const E = h === l.value;
        return {
          isActive: E,
          key: h,
          page: i(h),
          props: {
            ref: T,
            ellipsis: !1,
            icon: !0,
            disabled: !!e.disabled || Number(e.length) < 2,
            color: E ? e.activeColor : e.color,
            "aria-current": E,
            "aria-label": o(E ? e.currentPageAriaLabel : e.pageAriaLabel, h),
            onClick: (R) => p(R, h)
          }
        };
      }
    })), S = A(() => {
      const h = !!e.disabled || l.value <= v.value, B = !!e.disabled || l.value >= v.value + f.value - 1;
      return {
        first: e.showFirstLastPage ? {
          icon: s.value ? e.lastIcon : e.firstIcon,
          onClick: (T) => p(T, v.value, "first"),
          disabled: h,
          "aria-label": o(e.firstAriaLabel),
          "aria-disabled": h
        } : void 0,
        prev: {
          icon: s.value ? e.nextIcon : e.prevIcon,
          onClick: (T) => p(T, l.value - 1, "prev"),
          disabled: h,
          "aria-label": o(e.previousAriaLabel),
          "aria-disabled": h
        },
        next: {
          icon: s.value ? e.prevIcon : e.nextIcon,
          onClick: (T) => p(T, l.value + 1, "next"),
          disabled: B,
          "aria-label": o(e.nextAriaLabel),
          "aria-disabled": B
        },
        last: e.showFirstLastPage ? {
          icon: s.value ? e.firstIcon : e.lastIcon,
          onClick: (T) => p(T, v.value + f.value - 1, "last"),
          disabled: B,
          "aria-label": o(e.lastAriaLabel),
          "aria-disabled": B
        } : void 0
      };
    });
    function w() {
      var B;
      const h = l.value - v.value;
      (B = g.value[h]) == null || B.$el.focus();
    }
    function P(h) {
      h.key === Ml.left && !e.disabled && l.value > Number(e.start) ? (l.value = l.value - 1, Te(w)) : h.key === Ml.right && !e.disabled && l.value < v.value + f.value - 1 && (l.value = l.value + 1, Te(w));
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
      }, [t.first ? t.first(S.value.first) : b(be, L({
        _as: "VPaginationBtn"
      }, S.value.first), null)]), C("li", {
        key: "prev",
        class: "v-pagination__prev",
        "data-test": "v-pagination-prev"
      }, [t.prev ? t.prev(S.value.prev) : b(be, L({
        _as: "VPaginationBtn"
      }, S.value.prev), null)]), x.value.map((h, B) => C("li", {
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
      }, [t.next ? t.next(S.value.next) : b(be, L({
        _as: "VPaginationBtn"
      }, S.value.next), null)]), e.showFirstLastPage && C("li", {
        key: "last",
        class: "v-pagination__last",
        "data-test": "v-pagination-last"
      }, [t.last ? t.last(S.value.last) : b(be, L({
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
  } = e, l = A(() => t.value === -1 ? 0 : t.value * (n.value - 1)), o = A(() => t.value === -1 ? a.value : Math.min(a.value, l.value + t.value)), i = A(() => t.value === -1 || a.value === 0 ? 1 : Math.ceil(a.value / t.value));
  Q([n, i], () => {
    n.value > i.value && (n.value = i.value);
  });
  function s(f) {
    t.value = f, n.value = 1;
  }
  function u() {
    n.value = Je(n.value + 1, 1, i.value);
  }
  function c() {
    n.value = Je(n.value - 1, 1, i.value);
  }
  function r(f) {
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
  } = e, i = A(() => o.value <= 0 ? t.value : t.value.slice(a.value, l.value));
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
}, "VDataTableFooter"), da = ne()({
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
    } = Pr(), d = A(() => e.itemsPerPageOptions.map((f) => typeof f == "number" ? {
      value: f,
      title: f === -1 ? a("$vuetify.dataFooter.itemsPerPageAll") : String(f)
    } : {
      ...f,
      title: isNaN(Number(f.title)) ? a(f.title) : f.title
    }));
    return ie(() => {
      var v;
      const f = en.filterProps(e);
      return C("div", {
        class: "v-data-table-footer"
      }, [(v = t.prepend) == null ? void 0 : v.call(t), C("div", {
        class: "v-data-table-footer__items-per-page"
      }, [C("span", {
        "aria-label": a(e.itemsPerPageText)
      }, [a(e.itemsPerPageText)]), b(kl, {
        items: d.value,
        modelValue: c.value,
        "onUpdate:modelValue": (m) => r(Number(m)),
        density: "compact",
        variant: "outlined",
        "hide-details": !0
      }, null)]), C("div", {
        class: "v-data-table-footer__info"
      }, [C("div", null, [a(e.pageText, u.value ? i.value + 1 : 0, s.value, u.value)])]), C("div", {
        class: "v-data-table-footer__pagination"
      }, [b(en, L({
        modelValue: l.value,
        "onUpdate:modelValue": (m) => l.value = m,
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
}), va = Yi({
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
        for (const f of c.children) {
          const v = r % 1 + u / Math.pow(10, a + 2);
          l.enqueue(f, a + d + v);
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
    var k, y, p;
    const c = (e.headers || Object.keys(e.items[0] ?? {}).map((g) => ({
      key: g,
      title: fi(g)
    }))).slice(), r = Po(c);
    (k = n == null ? void 0 : n.groupBy) != null && k.value.length && !r.has("data-table-group") && c.unshift({
      key: "data-table-group",
      title: "Group"
    }), (y = n == null ? void 0 : n.showSelect) != null && y.value && !r.has("data-table-select") && c.unshift({
      key: "data-table-select"
    }), (p = n == null ? void 0 : n.showExpand) != null && p.value && !r.has("data-table-expand") && c.push({
      key: "data-table-expand"
    });
    const d = Io(c);
    Er(d);
    const f = Math.max(...d.map((g) => Cl(g))) + 1, v = $r(d, f);
    t.value = v.headers, a.value = v.columns;
    const m = v.headers.flat(1);
    for (const g of m)
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
  const l = we(e, "modelValue", e.modelValue, (g) => new Set(Ne(g).map((I) => {
    var x;
    return ((x = t.value.find((S) => e.valueComparator(I, S.value))) == null ? void 0 : x.value) ?? I;
  })), (g) => [...g.values()]), o = A(() => t.value.filter((g) => g.selectable)), i = A(() => a.value.filter((g) => g.selectable)), s = A(() => {
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
  }), u = J(null);
  function c(g) {
    return Ne(g).every((I) => l.value.has(I.value));
  }
  function r(g) {
    return Ne(g).some((I) => l.value.has(I.value));
  }
  function d(g, I) {
    const x = s.value.select({
      items: g,
      value: I,
      selected: new Set(l.value)
    });
    l.value = x;
  }
  function f(g, I, x) {
    const S = [];
    if (I = I ?? a.value.findIndex((w) => w.value === g.value), e.selectStrategy !== "single" && (x != null && x.shiftKey) && u.value !== null) {
      const [w, P] = [u.value, I].sort((h, B) => h - B);
      S.push(...a.value.slice(w, P + 1).filter((h) => h.selectable));
    } else
      S.push(g), u.value = I;
    d(S, !c([g]));
  }
  function v(g) {
    const I = s.value.selectAll({
      value: g,
      allItems: o.value,
      currentPage: i.value,
      selected: new Set(l.value)
    });
    l.value = I;
  }
  const m = A(() => l.value.size > 0), k = A(() => {
    const g = s.value.allSelected({
      allItems: o.value,
      currentPage: i.value
    });
    return !!g.length && c(g);
  }), y = H(() => s.value.showSelectAll), p = {
    toggleSelect: f,
    select: d,
    selectAll: v,
    isSelected: c,
    isSomeSelected: r,
    someSelected: m,
    allSelected: k,
    showSelectAll: y,
    lastSelectedIndex: u,
    selectStrategy: s
  };
  return ze(Bo, p), p;
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
    sortedItems: A(() => {
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
      const f = n[r].key, v = n[r].order ?? "asc";
      if (v === !1) continue;
      let m = oa(i[1], f), k = oa(s[1], f), y = i[0].raw, p = s[0].raw;
      if (v === "desc" && ([m, k] = [k, m], [y, p] = [p, y]), (u = a == null ? void 0 : a.sortRawFunctions) != null && u[f]) {
        const g = a.sortRawFunctions[f](y, p);
        if (g == null) continue;
        if (d = !0, g) return g;
      }
      if ((c = a == null ? void 0 : a.sortFunctions) != null && c[f]) {
        const g = a.sortFunctions[f](m, k);
        if (g == null) continue;
        if (d = !0, g) return g;
      }
      if (!d) {
        if (m instanceof Date && k instanceof Date)
          return m.getTime() - k.getTime();
        if ([m, k] = [m, k].map((g) => g != null ? g.toString().toLocaleLowerCase() : g), m !== k)
          return Qt(m) && Qt(k) ? 0 : Qt(m) ? -1 : Qt(k) ? 1 : !isNaN(m) && !isNaN(k) ? Number(m) - Number(k) : l.compare(m, k);
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
  ...Yt(),
  ...rl()
}, "VDataTableHeaders"), fa = ne()({
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
      headers: f
    } = Va(), {
      loaderClasses: v
    } = sl(e);
    function m(B, T) {
      if (!(!(e.sticky || e.fixedHeader) && !B.fixed))
        return {
          position: "sticky",
          left: B.fixed ? ye(B.fixedOffset) : void 0,
          top: e.sticky || e.fixedHeader ? `calc(var(--v-table-header-height) * ${T})` : void 0
        };
    }
    function k(B, T) {
      B.key === "Enter" && !e.disableSort && l(T);
    }
    function y(B) {
      const T = o.value.find((E) => E.key === B.key);
      return T ? T.order === "asc" ? e.sortAscIcon : e.sortDescIcon : e.sortAscIcon;
    }
    const {
      backgroundColorClasses: p,
      backgroundColorStyles: g
    } = st(() => e.color), {
      displayClasses: I,
      mobile: x
    } = ft(e), S = A(() => ({
      headers: f.value,
      columns: d.value,
      toggleSort: l,
      isSorted: i,
      sortBy: o.value,
      someSelected: s.value,
      allSelected: u.value,
      selectAll: c,
      getSortIcon: y
    })), w = A(() => ["v-data-table__th", {
      "v-data-table__th--sticky": e.sticky || e.fixedHeader
    }, I.value, v.value]), P = (B) => {
      let {
        column: T,
        x: E,
        y: R
      } = B;
      const F = T.key === "data-table-select" || T.key === "data-table-expand", z = L(e.headerProps ?? {}, T.headerProps ?? {});
      return b(va, L({
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
          ...m(T, R)
        },
        colspan: T.colspan,
        rowspan: T.rowspan,
        onClick: T.sortable ? () => l(T) : void 0,
        fixed: T.fixed,
        nowrap: T.nowrap,
        lastFixed: T.lastFixed,
        noPadding: F
      }, z, {
        onKeydown: (W) => T.sortable && k(W, T)
      }), {
        default: () => {
          var te;
          const W = `header.${T.key}`, j = {
            column: T,
            selectAll: c,
            isSorted: i,
            toggleSort: l,
            sortBy: o.value,
            someSelected: s.value,
            allSelected: u.value,
            getSortIcon: y
          };
          return t[W] ? t[W](j) : T.key === "data-table-select" ? ((te = t["header.data-table-select"]) == null ? void 0 : te.call(t, j)) ?? (r.value && b(bt, {
            modelValue: u.value,
            indeterminate: s.value && !u.value,
            "onUpdate:modelValue": c
          }, null)) : C("div", {
            class: "v-data-table-header__content"
          }, [C("span", null, [T.title]), T.sortable && !e.disableSort && b(ke, {
            key: "icon",
            class: "v-data-table-header__sort-icon",
            icon: y(T)
          }, null), e.multiSort && i(T) && C("div", {
            key: "badge",
            class: fe(["v-data-table-header__sort-badge", ...p.value]),
            style: Ve(g.value)
          }, [o.value.findIndex((ae) => ae.key === T.key) + 1])]);
        }
      });
    }, h = () => {
      const B = A(() => d.value.filter((E) => (E == null ? void 0 : E.sortable) && !e.disableSort)), T = A(() => {
        if (d.value.find((R) => R.key === "data-table-select") != null)
          return u.value ? "$checkboxOn" : s.value ? "$checkboxIndeterminate" : "$checkboxOff";
      });
      return b(va, L({
        tag: "th",
        class: [...w.value],
        colspan: f.value.length + 1
      }, e.headerProps), {
        default: () => [C("div", {
          class: "v-data-table-header__content"
        }, [b(kl, {
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
            return b(pl, {
              onClick: (R = E.item.raw) != null && R.sortable ? () => l(E.item.raw) : void 0,
              onMousedown: (F) => {
                F.preventDefault(), F.stopPropagation();
              }
            }, {
              default: () => [E.item.title, b(ke, {
                class: fe(["v-data-table__td-sort-icon", i(E.item.raw) && "v-data-table__td-sort-icon-active"]),
                icon: y(E.item.raw),
                size: "small"
              }, null)]
            });
          }
        })])]
      });
    };
    ie(() => x.value ? C("tr", null, [b(h, null, null)]) : C(ee, null, [t.headers ? t.headers(S.value) : f.value.map((B, T) => C("tr", null, [B.map((E, R) => b(P, {
      column: E,
      x: R,
      y: T
    }, null))])), e.loading && C("tr", {
      class: "v-data-table-progress"
    }, [C("th", {
      colspan: d.value.length
    }, [b(ul, {
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
  } = e, l = q(/* @__PURE__ */ new Set()), o = A(() => t.value.map((r) => ({
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
    function d(f) {
      const v = [];
      for (const m of f.items)
        "type" in m && m.type === "group" ? v.push(...d(m)) : v.push(m);
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
    const l = oa(a.raw, n);
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
    flatItems: A(() => {
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
    } = Va(), r = A(() => o([e.item]));
    return () => C("tr", {
      class: "v-data-table-group-header-row",
      style: {
        "--v-data-table-group-header-row-depth": e.item.depth
      }
    }, [c.value.map((d) => {
      var f, v;
      if (d.key === "data-table-group") {
        const m = a(e.item) ? "$expand" : "$next", k = () => l(e.item);
        return ((f = t["data-table-group"]) == null ? void 0 : f.call(t, {
          item: e.item,
          count: r.value.length,
          props: {
            icon: m,
            onClick: k
          }
        })) ?? b(va, {
          class: "v-data-table-group-header-row__column"
        }, {
          default: () => [b(be, {
            size: "small",
            variant: "text",
            icon: m,
            onClick: k
          }, null), C("span", null, [e.item.value]), C("span", null, [Pe("("), r.value.length, Pe(")")])]
        });
      }
      if (d.key === "data-table-select") {
        const m = i(r.value), k = s(r.value) && !m, y = (p) => u(r.value, p);
        return ((v = t["data-table-select"]) == null ? void 0 : v.call(t, {
          props: {
            modelValue: m,
            indeterminate: k,
            "onUpdate:modelValue": y
          }
        })) ?? C("td", null, [b(bt, {
          modelValue: m,
          indeterminate: k,
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
function jo(e) {
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
function Go() {
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
  ...Yt()
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
    } = ft(e, "v-data-table__tr"), {
      isSelected: o,
      toggleSelect: i,
      someSelected: s,
      allSelected: u,
      selectAll: c
    } = Ca(), {
      isExpanded: r,
      toggleExpand: d
    } = Go(), {
      toggleSort: f,
      sortBy: v,
      isSorted: m
    } = Ro(), {
      columns: k
    } = Va();
    ie(() => C("tr", {
      class: fe(["v-data-table__tr", {
        "v-data-table__tr--clickable": !!(e.onClick || e.onContextmenu || e.onDblclick)
      }, a.value]),
      onClick: e.onClick,
      onContextmenu: e.onContextmenu,
      onDblclick: e.onDblclick
    }, [e.item && k.value.map((y, p) => {
      const g = e.item, I = `item.${y.key}`, x = `header.${y.key}`, S = {
        index: e.index,
        item: g.raw,
        internalItem: g,
        value: oa(g.columns, y.key),
        column: y,
        isSelected: o,
        toggleSelect: i,
        isExpanded: r,
        toggleExpand: d
      }, w = {
        column: y,
        selectAll: c,
        isSorted: m,
        toggleSort: f,
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
      }) : e.cellProps, h = typeof y.cellProps == "function" ? y.cellProps({
        index: S.index,
        item: S.item,
        internalItem: S.internalItem,
        value: S.value
      }) : y.cellProps;
      return b(va, L({
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
          var T, E, R, F;
          if (y.key === "data-table-select")
            return ((T = t["item.data-table-select"]) == null ? void 0 : T.call(t, {
              ...S,
              props: {
                disabled: !g.selectable,
                modelValue: o([g]),
                onClick: Ie(() => i(g), ["stop"])
              }
            })) ?? b(bt, {
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
            })) ?? b(be, {
              icon: r(g) ? "$collapse" : "$expand",
              size: "small",
              variant: "text",
              onClick: Ie(() => d(g), ["stop"])
            }, null);
          if (t[I] && !l.value) return t[I](S);
          const B = Re(S.value);
          return l.value ? C(ee, null, [C("div", {
            class: "v-data-table__td-title"
          }, [((R = t[x]) == null ? void 0 : R.call(t, w)) ?? y.title]), C("div", {
            class: "v-data-table__td-value"
          }, [((F = t[I]) == null ? void 0 : F.call(t, S)) ?? B])]) : B;
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
  ...Yt()
}, "VDataTableRows"), ma = ne()({
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
    } = Go(), {
      isSelected: u,
      toggleSelect: c
    } = Ca(), {
      toggleGroup: r,
      isGroupOpen: d
    } = Ho(), {
      t: f
    } = ot(), {
      mobile: v
    } = ft(e);
    return ie(() => {
      var m, k;
      return e.loading && (!e.items.length || a.loading) ? C("tr", {
        class: "v-data-table-rows-loading",
        key: "loading"
      }, [C("td", {
        colspan: l.value.length
      }, [((m = a.loading) == null ? void 0 : m.call(a)) ?? f(e.loadingText)])]) : !e.loading && !e.items.length && !e.hideNoData ? C("tr", {
        class: "v-data-table-rows-no-data",
        key: "no-data"
      }, [C("td", {
        colspan: l.value.length
      }, [((k = a["no-data"]) == null ? void 0 : k.call(a)) ?? f(e.noDataText)])]) : C(ee, null, [e.items.map((y, p) => {
        var x;
        if (y.type === "group") {
          const S = {
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
          return a["group-header"] ? a["group-header"](S) : b(zr, L({
            key: `group-header_${y.id}`,
            item: y
          }, Ll(t, ":group-header", () => S)), a);
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
        }, I = {
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
        return C(ee, {
          key: I.props.key
        }, [a.item ? a.item(I) : b(Kr, I.props, a), s(y) && ((x = a["expanded-row"]) == null ? void 0 : x.call(a, g))]);
      })]);
    }), {};
  }
}), qo = K({
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  height: [Number, String],
  hover: Boolean,
  ...Se(),
  ...vt(),
  ...Ke(),
  ...Le()
}, "VTable"), ga = ne()({
  name: "VTable",
  props: qo(),
  setup(e, n) {
    let {
      slots: t,
      emit: a
    } = n;
    const {
      themeClasses: l
    } = Ge(e), {
      densityClasses: o
    } = Bt(e);
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
}), jr = K({
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
function Gr(e, n, t, a) {
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
  return n.map((a, l) => Gr(e, a, l, t));
}
function Xo(e, n) {
  return {
    items: A(() => Yr(e, e.items, n.value))
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
  ...jr(),
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
      headers: f,
      sortFunctions: v,
      sortRawFunctions: m,
      filterFunctions: k
    } = Ao(e, {
      groupBy: l,
      showSelect: H(() => e.showSelect),
      showExpand: H(() => e.showExpand)
    }), {
      items: y
    } = Xo(e, d), p = H(() => e.search), {
      filteredItems: g
    } = ho(e, y, p, {
      transform: (X) => X.columns,
      customKeyFilter: k
    }), {
      toggleSort: I
    } = Fo({
      sortBy: o,
      multiSort: i,
      mustSort: s,
      page: u
    }), {
      sortByWithGroups: x,
      opened: S,
      extractRows: w,
      isGroupOpen: P,
      toggleGroup: h
    } = No({
      groupBy: l,
      sortBy: o,
      disableSort: r
    }), {
      sortedItems: B
    } = Mr(e, g, x, {
      transform: (X) => ({
        ...X.raw,
        ...X.columns
      }),
      sortFunctions: v,
      sortRawFunctions: m
    }), {
      flatItems: T
    } = Uo(B, l, S), E = A(() => T.value.length), {
      startIndex: R,
      stopIndex: F,
      pageCount: z,
      setItemsPerPage: W
    } = ko({
      page: u,
      itemsPerPage: c,
      itemsLength: E
    }), {
      paginatedItems: j
    } = Ir({
      items: T,
      startIndex: R,
      stopIndex: F,
      itemsPerPage: c
    }), te = A(() => w(j.value)), {
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
    } = jo(e);
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
    const se = A(() => ({
      page: u.value,
      itemsPerPage: c.value,
      sortBy: o.value,
      pageCount: z.value,
      toggleSort: I,
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
      toggleGroup: h,
      items: te.value.map((X) => X.raw),
      internalItems: te.value,
      groupedItems: j.value,
      columns: d.value,
      headers: f.value
    }));
    return ie(() => {
      const X = da.filterProps(e), re = fa.filterProps(e), me = ma.filterProps(e), N = ga.filterProps(e);
      return b(ga, L({
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
          return a.default ? a.default(se.value) : C(ee, null, [(Z = a.colgroup) == null ? void 0 : Z.call(a, se.value), !e.hideDefaultHeader && C("thead", {
            key: "thead"
          }, [b(fa, re, a)]), (ce = a.thead) == null ? void 0 : ce.call(a, se.value), !e.hideDefaultBody && C("tbody", null, [(ge = a["body.prepend"]) == null ? void 0 : ge.call(a, se.value), a.body ? a.body(se.value) : b(ma, L(t, me, {
            items: j.value
          }), a), (Ce = a["body.append"]) == null ? void 0 : Ce.call(a, se.value)]), (_e = a.tbody) == null ? void 0 : _e.call(a, se.value), (De = a.tfoot) == null ? void 0 : De.call(a, se.value)]);
        },
        bottom: () => a.bottom ? a.bottom(se.value) : !e.hideDefaultFooter && C(ee, null, [b(Nt, null, null), b(da, X, {
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
    } = tl(e), d = A(() => parseInt(e.itemsLength, 10)), {
      columns: f,
      headers: v
    } = Ao(e, {
      groupBy: l,
      showSelect: H(() => e.showSelect),
      showExpand: H(() => e.showExpand)
    }), {
      items: m
    } = Xo(e, f), {
      toggleSort: k
    } = Fo({
      sortBy: o,
      multiSort: i,
      mustSort: s,
      page: u
    }), {
      opened: y,
      isGroupOpen: p,
      toggleGroup: g,
      extractRows: I
    } = No({
      groupBy: l,
      sortBy: o,
      disableSort: r
    }), {
      pageCount: x,
      setItemsPerPage: S
    } = ko({
      page: u,
      itemsPerPage: c,
      itemsLength: d
    }), {
      flatItems: w
    } = Uo(m, l, y), {
      isSelected: P,
      select: h,
      selectAll: B,
      toggleSelect: T,
      someSelected: E,
      allSelected: R
    } = Eo(e, {
      allItems: m,
      currentPage: m
    }), {
      isExpanded: F,
      toggleExpand: z
    } = jo(e), W = A(() => I(m.value));
    Zo({
      page: u,
      itemsPerPage: c,
      sortBy: o,
      groupBy: l,
      search: H(() => e.search)
    }), ze("v-data-table", {
      toggleSort: k,
      sortBy: o
    }), at({
      VDataTableRows: {
        hideNoData: H(() => e.hideNoData),
        noDataText: H(() => e.noDataText),
        loading: H(() => e.loading),
        loadingText: H(() => e.loadingText)
      }
    });
    const j = A(() => ({
      page: u.value,
      itemsPerPage: c.value,
      sortBy: o.value,
      pageCount: x.value,
      toggleSort: k,
      setItemsPerPage: S,
      someSelected: E.value,
      allSelected: R.value,
      isSelected: P,
      select: h,
      selectAll: B,
      toggleSelect: T,
      isExpanded: F,
      toggleExpand: z,
      isGroupOpen: p,
      toggleGroup: g,
      items: W.value.map((te) => te.raw),
      internalItems: W.value,
      groupedItems: w.value,
      columns: f.value,
      headers: v.value
    }));
    ie(() => {
      const te = da.filterProps(e), ae = fa.filterProps(e), ue = ma.filterProps(e), _ = ga.filterProps(e);
      return b(ga, L({
        class: ["v-data-table", {
          "v-data-table--loading": e.loading
        }, e.class],
        style: e.style
      }, _, {
        fixedHeader: e.fixedHeader || e.sticky
      }), {
        top: () => {
          var $;
          return ($ = a.top) == null ? void 0 : $.call(a, j.value);
        },
        default: () => {
          var $, O, U, he, le, se;
          return a.default ? a.default(j.value) : C(ee, null, [($ = a.colgroup) == null ? void 0 : $.call(a, j.value), !e.hideDefaultHeader && C("thead", {
            key: "thead",
            class: "v-data-table__thead",
            role: "rowgroup"
          }, [b(fa, ae, a)]), (O = a.thead) == null ? void 0 : O.call(a, j.value), !e.hideDefaultBody && C("tbody", {
            class: "v-data-table__tbody",
            role: "rowgroup"
          }, [(U = a["body.prepend"]) == null ? void 0 : U.call(a, j.value), a.body ? a.body(j.value) : b(ma, L(t, ue, {
            items: w.value
          }), a), (he = a["body.append"]) == null ? void 0 : he.call(a, j.value)]), (le = a.tbody) == null ? void 0 : le.call(a, j.value), (se = a.tfoot) == null ? void 0 : se.call(a, j.value)]);
        },
        bottom: () => a.bottom ? a.bottom(j.value) : !e.hideDefaultFooter && C(ee, null, [b(Nt, null, null), b(da, te, {
          prepend: a["footer.prepend"]
        })])
      });
    });
  }
}), Jo = /* @__PURE__ */ We({
  __name: "OxListTable",
  props: {
    // list: Object,
    /** Table headers */
    headers: Array,
    /** If True, display edit/view button */
    edit: Boolean
  },
  setup(e) {
    const n = pt(), t = Xi(n, "item.", { exclude: ["item.actions"] }), a = ve("panel"), l = ve("list"), o = ve("items"), i = ve("user"), s = e, u = A(() => s.headers.reduce((d, f) => (d.push(
      typeof f == "string" ? { key: f, title: oe(Si.field(f)) } : { key: f.key, title: oe(f.title) }
    ), d), []));
    function c(d) {
      const f = {
        ...l.filters,
        page: d.page,
        page_size: d.itemsPerPage,
        ordering: d.sortBy.map(({ key: v, order: m }) => m == "asc" ? v : `-${v}`)
      };
      l.page_size = d.itemsPerPage, l.load({ params: f });
    }
    function r(d, f) {
      a.show({ view: "detail.edit", value: f });
    }
    return (d, f) => {
      var v;
      return D(), G(Zr, {
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
        "item.actions": M(({ item: m }) => [
          s.edit && V(i).can([m.constructor, "change"], m) ? (D(), G(Rt, {
            key: 0,
            icon: "mdi-pencil",
            button: "",
            title: V(oe)("actions.edit"),
            item: m,
            run: r
          }, null, 8, ["title", "item"])) : s.edit && V(i).can([m.constructor, "view"], m) ? (D(), G(Rt, {
            key: 1,
            icon: "mdi-eye-outline",
            button: "",
            title: V(oe)("actions.view"),
            item: m,
            run: r
          }, null, 8, ["title", "item"])) : de("", !0),
          Y(d.$slots, "item.actions", {
            item: m,
            dense: !0,
            button: !0
          })
        ]),
        _: 2
      }, [
        Me(V(t), (m, k) => ({
          name: k,
          fn: M((y) => [
            Y(d.$slots, k, $e(Oe(y)))
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
    const n = pt(), t = e;
    let a = q(!1);
    Q(() => t.state.state, (i) => {
      t.delay && i == Zi.PROCESSING && (a.value = !1, window.setTimeout(() => {
        a.value = !0;
      }, 5e3));
    });
    const l = A(() => {
      var i;
      return ((i = t.state) == null ? void 0 : i.isProcessing) && (!t.delay || a.value);
    }), o = A(() => {
      var i, s;
      return (s = (i = t.state) == null ? void 0 : i.data) == null ? void 0 : s.messages;
    });
    return (i, s) => (D(), pe(ee, null, [
      t.state.isNone && V(n).none ? (D(), G(V($t), {
        key: 0,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        state: e.state,
        title: e.noneTitle
      }, {
        default: M(() => [
          Y(i.$slots, "none", { state: e.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : l.value ? (D(), G(V($t), {
        key: 1,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: e.state,
        title: e.processingTitle
      }, {
        default: M(() => [
          Y(i.$slots, "processing", { state: e.state }, () => [
            s[0] || (s[0] = Pe(" Data are being sent to server, please be patient. If this message persist you might wan't to retry. "))
          ])
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isError ? (D(), G(V($t), {
        key: 2,
        type: "error",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: e.state,
        title: e.errorTitle
      }, {
        default: M(() => [
          Y(i.$slots, "error", { state: e.state }, () => [
            s[1] || (s[1] = Pe(" Oups... something wrong happened. "))
          ]),
          Y(i.$slots, "error-detail", { state: e.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isOk ? (D(), G(V($t), {
        key: 3,
        type: "success",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: e.state,
        title: e.okTitle
      }, {
        default: M(() => [
          Y(i.$slots, "ok", { state: e.state }, () => [
            s[2] || (s[2] = C("p", null, "Congrats! Data have been updated.", -1))
          ]),
          o.value ? (D(), pe(ee, { key: 0 }, [
            b(Nt),
            (D(!0), pe(ee, null, Me(o.value, (u) => (D(), pe("p", null, Re(u), 1))), 256))
          ], 64)) : de("", !0),
          Y(i.$slots, "ok-detail", { state: e.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : de("", !0),
      Y(i.$slots, "default", {
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
      b(be, {
        color: "error",
        class: "me-2",
        "prepend-icon": a.resetIcon,
        onClick: o[0] || (o[0] = (i) => t("reset")),
        disabled: a.disabled
      }, {
        default: M(() => [
          Y(l.$slots, "discard", {}, () => [
            Pe(Re(a.resetLabel || V(Ba)("actions.discard")), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]),
      a.state.isSending || a.state.isProcessing ? (D(), G(be, {
        key: 0,
        color: "primary",
        "prepend-icon": a.processingIcon,
        disabled: ""
      }, {
        default: M(() => [
          Y(l.$slots, "processing", {}, () => [
            Pe(Re(a.processingLabel || V(Ba)("actions.saving")), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon"])) : (D(), G(be, {
        key: 1,
        color: "primary",
        "prepend-icon": a.validateIcon,
        onClick: o[1] || (o[1] = (i) => t("validate")),
        disabled: a.disabled || a.validateDisabled
      }, {
        default: M(() => [
          Y(l.$slots, "validate", {}, () => [
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
    return (c, r) => (D(), pe(ee, null, [
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
      i.isOk ? de("", !0) : (D(), pe(ee, { key: 0 }, [
        b(rt, {
          variant: "underlined",
          label: "Enter login",
          modelValue: l.username,
          "onUpdate:modelValue": r[0] || (r[0] = (d) => l.username = d),
          onKeyup: r[1] || (r[1] = _l(Ie((d) => t.value.focus(), ["stop"]), ["enter"]))
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
          onKeyup: r[4] || (r[4] = _l(Ie((d) => u(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue", "type", "append-icon"]),
        C("div", ec, [
          Y(c.$slots, "default", {
            value: l.password
          }, () => [
            l.username && l.password ? (D(), G(Pl, {
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
}, ei = /* @__PURE__ */ We({
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
    const n = pt(), t = e, a = ht(n, "views."), l = q(!1);
    Ze(() => {
      l.value = !0;
    }), mi(() => {
      l.value = !1;
    });
    const o = ve("panels"), i = ve("panel");
    return (s, u) => (D(), pe(ee, null, [
      t.state ? (D(), G(Pa, {
        key: 0,
        state: t.state,
        delay: ""
      }, null, 8, ["state"])) : de("", !0),
      V(n).prepend && V(o).panel == V(i).name ? Y(s.$slots, "prepend", { key: 1 }) : de("", !0),
      b(wn, { class: "ma-4" }, {
        default: M(() => [
          (D(), G(Na, {
            to: "#app-bar-sheet-title",
            disabled: !l.value || V(o).panel != t.name
          }, [
            t.icon ? (D(), G(ke, {
              key: 0,
              icon: t.icon
            }, null, 8, ["icon"])) : de("", !0),
            Pe(" " + Re(t.title) + " ", 1),
            Y(s.$slots, "append-title")
          ], 8, ["disabled"])),
          (D(), G(Na, {
            to: "#app-bar-right",
            disabled: !l.value || V(o).panel != t.name
          }, [
            Y(s.$slots, "app-bar-right"),
            t.help ? (D(), G(be, {
              key: 0,
              class: "ml-3",
              href: t.help,
              panels: "new",
              icon: "mdi-information-outline"
            }, null, 8, ["href"])) : de("", !0)
          ], 8, ["disabled"])),
          Y(s.$slots, "top"),
          Y(s.$slots, "default", {}, () => [
            V(a) ? (D(), G(qa, {
              key: 0,
              modelValue: V(i).view,
              "onUpdate:modelValue": u[0] || (u[0] = (c) => V(i).view = c)
            }, {
              default: M(() => [
                (D(!0), pe(ee, null, Me(V(a), (c, r) => (D(), G(Xa, {
                  key: c,
                  value: c
                }, {
                  default: M(() => [
                    Y(s.$slots, r)
                  ]),
                  _: 2
                }, 1032, ["value"]))), 128))
              ]),
              _: 3
            }, 8, ["modelValue"])) : de("", !0)
          ]),
          Y(s.$slots, "bottom")
        ]),
        _: 3
      }),
      V(n).append && V(o).panel == V(i).name ? Y(s.$slots, "append", { key: 2 }) : de("", !0)
    ], 64));
  }
}), ti = /* @__PURE__ */ We({
  __name: "OxView",
  props: {
    /** default tab title */
    title: String
  },
  setup(e) {
    const n = e, t = q(null), a = pt(), l = ht(a, "tab.", { exclude: ["tab.default"] }), o = ht(a, "window.");
    return (i, s) => V(l) && Object.keys(V(l)).length ? (D(), pe(ee, { key: 0 }, [
      b(xu, {
        modelValue: t.value,
        "onUpdate:modelValue": s[0] || (s[0] = (u) => t.value = u)
      }, {
        default: M(() => [
          V(a).default ? Y(i.$slots, "tab", { key: 0 }, () => [
            b(Ga, {
              text: n == null ? void 0 : n.title,
              value: "default"
            }, null, 8, ["text"])
          ]) : de("", !0),
          (D(!0), pe(ee, null, Me(V(l), (u, c) => (D(), G(Ga, { value: u }, {
            default: M(() => [
              Y(i.$slots, c)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"]),
      b(yl, {
        modelValue: t.value,
        "onUpdate:modelValue": s[1] || (s[1] = (u) => t.value = u)
      }, {
        default: M(() => [
          V(a).default ? (D(), G(ra, {
            key: 0,
            value: "default"
          }, {
            default: M(() => [
              Y(i.$slots, "default")
            ]),
            _: 3
          })) : de("", !0),
          (D(!0), pe(ee, null, Me(V(o), (u, c) => (D(), G(ra, { value: u }, {
            default: M(() => [
              Y(i.$slots, c)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"])
    ], 64)) : Y(i.$slots, "default", { key: 1 });
  }
}), ai = /* @__PURE__ */ We({
  __name: "OxModelEditor",
  props: {
    repo: {},
    initial: {},
    name: {},
    url: {},
    saved: { type: Function }
  },
  setup(e, { expose: n }) {
    const t = q(null), a = ve("user"), l = e, { editor: o, edited: i } = ki({ props: l }), s = A(() => a.can([o.repo.use, "change", l.initial])), u = A(() => ({
      editor: o,
      edited: i.value,
      form: t.value,
      editable: s.value,
      disabled: !s.value,
      value: o.value,
      model: o.repo.use
    }));
    return Q(() => o.errors && Object.values(o.errors), () => t.value.validate()), n({ editor: o, edited: i, form: t, editable: s }), (c, r) => (D(), pe(ee, null, [
      Y(c.$slots, "prepend", $e(Oe(u.value))),
      b(Za, {
        ref_key: "form",
        ref: t,
        modelValue: V(o).valid,
        "onUpdate:modelValue": r[0] || (r[0] = (d) => V(o).valid = d),
        disabled: !s.value
      }, {
        default: M(() => [
          Y(c.$slots, "default", $e(Oe(u.value)))
        ]),
        _: 3
      }, 8, ["modelValue", "disabled"]),
      Y(c.$slots, "append", $e(Oe(u.value)))
    ], 64));
  }
}), ac = {
  key: 0,
  class: "mb-3"
}, lc = /* @__PURE__ */ We({
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
    return n({
      save: s,
      reset: i,
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
      var r;
      return D(), pe(ee, null, [
        (r = o.value) != null && r.editor ? (D(), G(Pa, {
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
                  Y(u.$slots, "prepend", L(d, {
                    save: s,
                    reset: i
                  }), () => [
                    d.editable && d.edited ? (D(), G(Pl, {
                      key: 0,
                      onValidate: c[0] || (c[0] = (f) => s()),
                      onReset: c[1] || (c[1] = (f) => i()),
                      state: d.editor.state,
                      "validate-disabled": d.editor.valid === !1
                    }, null, 8, ["state", "validate-disabled"])) : de("", !0)
                  ])
                ]))
              ]),
              default: M((d) => [
                Y(u.$slots, "default", L(d, {
                  save: s,
                  reset: i
                }))
              ]),
              append: M((d) => [
                Y(u.$slots, "append", L(d, {
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
}), nc = /* @__PURE__ */ We({
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
    const t = pt(), a = ht(t, "views.list."), l = ht(t, "item."), o = ht(t, "views.detail.edit."), i = A(() => !!Object.keys(o).length), s = sn("filters"), u = e, c = ve("context"), r = ve("user"), { panel: d, list: f, items: v, next: m, prev: k } = ve("panel") ?? Vi({ props: u }), y = d.panels;
    A(() => {
      var S;
      return c.user.can([d.model, (S = d.value) != null && S.id ? "change" : "add"]);
    });
    const { showFilters: p } = tl(d), g = A(() => [
      ...u.headers,
      { key: "actions", title: oe("actions") }
    ]);
    function I(S) {
      S = new u.repo.use(S), d.show({ view: d.view, value: S }), f.load();
    }
    const x = A(() => ({
      panel: d,
      panels: y,
      list: f,
      items: v,
      context: c,
      saved: I,
      value: d.value
    }));
    return Q(() => Object.values(f.filters), () => f.load()), n({ list: f, panel: d, items: v, next: m, prev: k }), (S, w) => (D(), G(ei, {
      name: u.name,
      title: V(d).title,
      icon: V(d).icon,
      state: V(f).state,
      index: u.index
    }, kt({
      "app-bar-right": M(() => [
        Y(S.$slots, "app-bar-right", $e(Oe(x.value))),
        V(d).view.startsWith("list.") ? (D(), G(Fl, {
          key: 0,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: M(() => [
            Y(S.$slots, "nav.list", $e(Oe(x.value))),
            b(be, {
              title: V(oe)("actions.list.reload"),
              "aria-label": V(oe)("actions.list.reload"),
              onClick: w[0] || (w[0] = (P) => V(f).load())
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
            s.value ? (D(), G(be, {
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
        })) : V(d).view.startsWith("detail.") && V(d).value ? (D(), G(Fl, {
          key: 1,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: M(() => [
            Y(S.$slots, "nav.detail", $e(Oe(x.value))),
            V(d).view == "detail.edit" && V(d).value ? (D(), G(wl, { key: 0 }, {
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
                    Y(S.$slots, "item.actions", {
                      item: V(d).value
                    })
                  ]),
                  _: 3
                })
              ]),
              _: 3
            })) : de("", !0),
            b(be, {
              disabled: !V(k),
              title: V(oe)("prev"),
              "aria-label": V(oe)("prev"),
              onClick: w[2] || (w[2] = Ie((P) => V(d).show({ view: V(d).view, value: V(k) }), ["stop"]))
            }, {
              default: M(() => [
                b(ke, { icon: "mdi-chevron-left" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"]),
            b(be, {
              disabled: !V(m),
              title: V(oe)("next"),
              "aria-label": V(oe)("next"),
              onClick: w[3] || (w[3] = Ie((P) => V(d).show({ view: V(d).view, value: V(m) }), ["stop"]))
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
              V(t)["views.list.cards"] ? (D(), G(be, {
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
              V(t)["views.list.kanban"] ? (D(), G(be, {
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
              i.value ? (D(), G(be, {
                key: 2,
                value: "detail.edit",
                onClickCapture: w[7] || (w[7] = Ie((h) => V(d).show({ view: "detail.edit", value: V(d).value }), ["stop"])),
                disabled: !((P = V(d).value) != null && P.id) && V(d).view != "detail.edit",
                title: V(oe)("panels.nav.edit"),
                "aria-label": V(oe)("panels.nav.edit")
              }, {
                default: M(() => [
                  V(r).can([V(d).model, "change"]) ? (D(), G(ke, { key: 0 }, {
                    default: M(() => w[14] || (w[14] = [
                      Pe("mdi-pencil")
                    ])),
                    _: 1,
                    __: [14]
                  })) : (D(), G(ke, { key: 1 }, {
                    default: M(() => w[15] || (w[15] = [
                      Pe("mdi-eye")
                    ])),
                    _: 1,
                    __: [15]
                  }))
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"])) : de("", !0),
              i.value && V(r).can([V(d).model, "add"]) ? (D(), G(be, {
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
              Y(S.$slots, "nav.views", $e(Oe(x.value)))
            ];
          }),
          _: 3
        }, 8, ["modelValue"]),
        Y(S.$slots, "app-bar-end", $e(Oe(x.value)))
      ]),
      top: M(() => [
        u.warning ? (D(), G($t, {
          key: 0,
          type: "warning",
          variant: "tonal",
          text: u.warning
        }, null, 8, ["text"])) : de("", !0),
        Y(S.$slots, "top"),
        je(b(bo, {
          ref_key: "filters",
          ref: s,
          search: u.search,
          "teleport-to": "#panel-list-actions"
        }, {
          default: M((P) => [
            Y(S.$slots, "list.filters", $e(Oe(P)))
          ]),
          _: 3
        }, 8, ["search"]), [
          [Tt, V(d).view.startsWith("list.") && V(p)]
        ])
      ]),
      _: 2
    }, [
      V(t)["append-title"] ? {
        name: "append-title",
        fn: M(() => [
          Y(S.$slots, "append-title", $e(Oe(x.value)))
        ]),
        key: "0"
      } : void 0,
      V(t).prepend ? {
        name: "prepend",
        fn: M(() => [
          Y(S.$slots, "prepend", $e(Oe(x.value)))
        ]),
        key: "1"
      } : void 0,
      V(t).append ? {
        name: "append",
        fn: M(() => [
          Y(S.$slots, "append", $e(Oe(x.value)))
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
              fn: M((B) => [
                Y(S.$slots, h, $e(Oe(B)))
              ])
            }))
          ]), 1032, ["headers", "edit"])
        ]),
        key: "3"
      },
      Me(V(a), (P, h) => ({
        name: h,
        fn: M(() => [
          Y(S.$slots, h, $e(Oe(x.value)))
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
                Y(S.$slots, h, $e(Oe(x.value)))
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
  OxAction: Rt,
  OxActionModelDelete: fs,
  OxActionPost: ms,
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
  Rt as OxAction,
  fs as OxActionModelDelete,
  ms as OxActionPost,
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
