import { inject as ve, computed as A, ref as q, reactive as Qe, toRef as H, shallowRef as ee, onMounted as Ze, provide as We, useId as ct, onDeactivated as ln, onActivated as ni, onBeforeUnmount as dt, createVNode as b, Transition as ta, mergeProps as L, defineComponent as Le, useAttrs as Tt, createElementBlock as be, createCommentVNode as de, unref as S, openBlock as D, Fragment as J, createBlock as Y, withModifiers as Ie, resolveComponent as oi, withCtx as R, renderList as Fe, createTextVNode as Pe, toDisplayString as Me, watch as Q, watchEffect as et, onScopeDispose as Ue, readonly as nn, createElementVNode as C, nextTick as Te, mergeModels as Ja, useModel as el, renderSlot as G, normalizeStyle as Ve, normalizeClass as fe, effectScope as on, toValue as Tl, toRaw as La, warn as ii, Teleport as Na, withDirectives as Ke, vShow as Bt, useSlots as pt, onErrorCaptured as si, createSlots as kt, markRaw as ui, onBeforeMount as ri, cloneVNode as ci, normalizeProps as Ee, guardReactiveProps as $e, h as di, vModelText as vi, defineAsyncComponent as fi, onBeforeUpdate as mi, capitalize as gi, toRefs as tl, useTemplateRef as sn, withKeys as Bl, onUnmounted as yi } from "vue";
import { useAction as hi, t as oe, filterSlots as ht, useAppContext as bi, usePanels as pi, useQuery as wi, defineAsyncComponent as xi, rules as Si, tKeys as ki, useModelEditor as Vi, useModelPanel as Ci } from "ox";
import { u as Vt, V as pe, a as Ye, b as Ha, c as Pi, d as ga, e as st, f as ya, g as _t, h as un, i as ha, t as Ii, j as ie, k as ba, l as Re, m as je, n as wt, o as Nt, p as Se, q as Ht, r as ut, s as Ai, v as rn, w as zt, x as Wt, y as _l, z as Ia, A as Aa, B as El, C as $l, D as Ut, E as Ti, M as pa, F as cn, G as al, H as jt, I as dn, J as vn, K as ll, L as Bi, N as Kt, O as nl, P as ol, Q as il, R as Ol, S as ke, T as fn, U as Et, W as vt, X as Ct, Y as mn, Z as _i, _ as gn, $ as yn, a0 as Pt, a1 as hn, a2 as bn, a3 as sl, a4 as ul, a5 as rl, a6 as aa, a7 as pn, a8 as Ei, a9 as $i, aa as wa, ab as Oi, ac as Fi, ad as wn, ae as Ot, af as Ri, ag as Fl, ah as Mi } from "./VContainer-J3xpqopn.js";
import { k as cl, l as xn, n as j, o as ye, q as lt, r as Di, s as ne, C as Sn, u as qe, t as Je, v as Li, w as nt, x as Ge, y as ft, z as we, A as at, B as Ne, E as Gt, F as kn, G as Ni, H as it, J as Vn, i as ze, K as Rl, M as It, N as Hi, O as mt, P as Cn, Q as ot, R as xe, S as za, U as zi, V as Xe, W as xa, X as He, Y as dl, Z as Pn, _ as Wi, $ as Ui, a0 as Ta, a1 as ji, a2 as Ki, a3 as St, a4 as Gi, a5 as In, a6 as la, a7 as Yi, c as Xt, a8 as Ml, a9 as qi, aa as na, ab as Zt } from "./theme-BVAWnHOc.js";
import { Q as Xi, l as Ba, N as Zi, E as Qi, t as _a, S as Ji, o as es, r as ts } from "./index-RW8_cbtd.js";
import "axios";
import { components as as } from "ox/vendor";
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
function ls(e) {
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
    const r = t.transformOrigin, c = n.x - s - (1 - o) * parseFloat(r), d = n.y - u - (1 - i) * parseFloat(r.slice(r.indexOf(" ") + 1)), m = o ? n.width / o : e.offsetWidth + 1, v = i ? n.height / i : e.offsetHeight + 1;
    return new tt({
      x: c,
      y: d,
      width: m,
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
const Jt = /* @__PURE__ */ new WeakMap();
function ns(e, n) {
  Object.keys(n).forEach((t) => {
    if (cl(t)) {
      const a = xn(t), l = Jt.get(e);
      if (n[t] == null)
        l == null || l.forEach((o) => {
          const [i, s] = o;
          i === a && (e.removeEventListener(a, s), l.delete(o));
        });
      else if (!l || ![...l].some((o) => o[0] === a && o[1] === n[t])) {
        e.addEventListener(a, n[t]);
        const o = l || /* @__PURE__ */ new Set();
        o.add([a, n[t]]), Jt.has(e) || Jt.set(e, o);
      }
    } else
      n[t] == null ? e.removeAttribute(t) : e.setAttribute(t, n[t]);
  });
}
function os(e, n) {
  Object.keys(n).forEach((t) => {
    if (cl(t)) {
      const a = xn(t), l = Jt.get(e);
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
const Ft = "cubic-bezier(0.4, 0, 0.2, 1)", is = "cubic-bezier(0.0, 0, 0.2, 1)", ss = "cubic-bezier(0.4, 0, 1, 1)";
function Ll(e, n, t) {
  return Object.keys(e).filter((a) => cl(a) && a.endsWith(n)).reduce((a, l) => (a[l.slice(0, -n.length)] = (o) => e[l](o, t(o)), a), {});
}
function Bn(e) {
  let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  for (; e; ) {
    if (n ? us(e) : fl(e)) return e;
    e = e.parentElement;
  }
  return document.scrollingElement;
}
function oa(e, n) {
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
function us(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const n = window.getComputedStyle(e);
  return ["scroll", "auto"].includes(n.overflowY);
}
function rs(e) {
  for (; e; ) {
    if (window.getComputedStyle(e).position === "fixed")
      return !0;
    e = e.offsetParent;
  }
  return !1;
}
const Rt = Symbol.for("vuetify:layout"), _n = Symbol.for("vuetify:layout-item"), Nl = 1e3, cs = j({
  overlaps: {
    type: Array,
    default: () => []
  },
  fullHeight: Boolean
}, "layout"), En = j({
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
  const e = ve(Rt);
  if (!e) throw new Error("[Vuetify] Could not find injected layout");
  return {
    getLayoutItem: e.getLayoutItem,
    mainRect: e.mainRect,
    mainStyles: e.mainStyles
  };
}
function On(e) {
  const n = ve(Rt);
  if (!n) throw new Error("[Vuetify] Could not find injected layout");
  const t = e.id ?? `layout-item-${ct()}`, a = lt("useLayoutItem");
  We(_n, {
    id: t
  });
  const l = ee(!1);
  ln(() => l.value = !0), ni(() => l.value = !1);
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
const ds = (e, n, t, a) => {
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
function vs(e) {
  const n = ve(Rt, null), t = A(() => n ? n.rootZIndex.value - 100 : Nl), a = q([]), l = Qe(/* @__PURE__ */ new Map()), o = Qe(/* @__PURE__ */ new Map()), i = Qe(/* @__PURE__ */ new Map()), s = Qe(/* @__PURE__ */ new Map()), u = Qe(/* @__PURE__ */ new Map()), {
    resizeRef: r,
    contentRect: c
  } = Vt(), d = A(() => {
    const w = /* @__PURE__ */ new Map(), P = e.overlaps ?? [];
    for (const h of P.filter((_) => _.includes(":"))) {
      const [_, T] = h.split(":");
      if (!a.value.includes(_) || !a.value.includes(T)) continue;
      const E = l.get(_), M = l.get(T), F = o.get(_), z = o.get(T);
      !E || !M || !F || !z || (w.set(T, {
        position: E.value,
        amount: parseInt(F.value, 10)
      }), w.set(_, {
        position: M.value,
        amount: -parseInt(z.value, 10)
      }));
    }
    return w;
  }), m = A(() => {
    const w = [...new Set([...i.values()].map((h) => h.value))].sort((h, _) => h - _), P = [];
    for (const h of w) {
      const _ = a.value.filter((T) => {
        var E;
        return ((E = i.get(T)) == null ? void 0 : E.value) === h;
      });
      P.push(..._);
    }
    return ds(P, l, o, s);
  }), v = A(() => !Array.from(u.values()).some((w) => w.value)), f = A(() => m.value[m.value.length - 1].layer), k = H(() => ({
    "--v-layout-left": ye(f.value.left),
    "--v-layout-right": ye(f.value.right),
    "--v-layout-top": ye(f.value.top),
    "--v-layout-bottom": ye(f.value.bottom),
    ...v.value ? void 0 : {
      transition: "none"
    }
  })), y = A(() => m.value.slice(1).map((w, P) => {
    let {
      id: h
    } = w;
    const {
      layer: _
    } = m.value[P], T = o.get(h), E = l.get(h);
    return {
      id: h,
      ..._,
      size: Number(T.value),
      position: E.value
    };
  })), p = (w) => y.value.find((P) => P.id === w), g = lt("createLayout"), I = ee(!1);
  Ze(() => {
    I.value = !0;
  }), We(Rt, {
    register: (w, P) => {
      let {
        id: h,
        order: _,
        position: T,
        layoutSize: E,
        elementSize: M,
        active: F,
        disableTransitions: z,
        absolute: W
      } = P;
      i.set(h, _), l.set(h, T), o.set(h, E), s.set(h, F), z && u.set(h, z);
      const te = Di(_n, g == null ? void 0 : g.vnode).indexOf(w);
      te > -1 ? a.value.splice(te, 0, h) : a.value.push(h);
      const ae = A(() => y.value.findIndex((O) => O.id === h)), ue = A(() => t.value + m.value.length * 2 - ae.value * 2), B = A(() => {
        const O = T.value === "left" || T.value === "right", U = T.value === "right", he = T.value === "bottom", le = M.value ?? E.value, se = le === 0 ? "%" : "px", X = {
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
          height: O ? `calc(100% - ${re.top}px - ${re.bottom}px)` : M.value ? `${M.value}px` : void 0,
          left: U ? void 0 : `${re.left}px`,
          right: U ? `${re.right}px` : void 0,
          top: T.value !== "bottom" ? `${re.top}px` : void 0,
          bottom: T.value !== "top" ? `${re.bottom}px` : void 0,
          width: O ? M.value ? `${M.value}px` : void 0 : `calc(100% - ${re.left}px - ${re.right}px)`
        };
      }), $ = A(() => ({
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
    mainStyles: k,
    getLayoutItem: p,
    items: y,
    layoutRect: c,
    rootZIndex: t
  });
  const x = H(() => ["v-layout", {
    "v-layout--full-height": e.fullHeight
  }]), V = H(() => ({
    zIndex: n ? t.value : void 0,
    position: n ? "relative" : void 0,
    overflow: n ? "hidden" : void 0
  }));
  return {
    layoutClasses: x,
    layoutStyles: V,
    getLayoutItem: p,
    items: y,
    layoutRect: c,
    layoutRef: r
  };
}
const fs = j({
  target: [Object, Array]
}, "v-dialog-transition"), Ea = /* @__PURE__ */ new WeakMap(), Fn = ne()({
  name: "VDialogTransition",
  props: fs(),
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
          sx: r,
          sy: c,
          speed: d
        } = i;
        Ea.set(l, i);
        const m = yt(l, [{
          transform: `translate(${s}px, ${u}px) scale(${r}, ${c})`,
          opacity: 0
        }, {}], {
          duration: 225 * d,
          easing: is
        });
        (v = Hl(l)) == null || v.forEach((f) => {
          yt(f, [{
            opacity: 0
          }, {
            opacity: 0,
            offset: 0.33
          }, {}], {
            duration: 225 * 2 * d,
            easing: Ft
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
          sx: r,
          sy: c,
          speed: d
        } = i;
        yt(l, [{}, {
          transform: `translate(${s}px, ${u}px) scale(${r}, ${c})`,
          opacity: 0
        }], {
          duration: 125 * d,
          easing: ss
        }).finished.then(() => o()), (v = Hl(l)) == null || v.forEach((f) => {
          yt(f, [{}, {
            opacity: 0,
            offset: 0.2
          }, {
            opacity: 0
          }], {
            duration: 125 * 2 * d,
            easing: Ft
          });
        });
      },
      onAfterLeave(l) {
        l.style.removeProperty("pointer-events");
      }
    };
    return () => e.target ? b(ta, L({
      name: "dialog-transition"
    }, a, {
      css: !1
    }), t) : b(ta, {
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
  let r = t.top + t.height / 2;
  i === "top" || s === "top" ? r -= t.height / 2 : (i === "bottom" || s === "bottom") && (r += t.height / 2);
  const c = t.width / a.width, d = t.height / a.height, m = Math.max(1, c, d), v = c / m || 0, f = d / m || 0, k = a.width * a.height / (window.innerWidth * window.innerHeight), y = k > 0.12 ? Math.min(1.5, (k - 0.12) * 10 + 1) : 1;
  return {
    x: u - (l + a.left),
    y: r - (o + a.top),
    sx: v,
    sy: f,
    speed: y
  };
}
const Mt = /* @__PURE__ */ Le({
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
    const t = e, a = Tt(), l = n, o = ve("user"), { run: i, processing: s, allowed: u } = hi({ user: o, emits: l, props: t });
    return (r, c) => S(u) ? (D(), be(J, { key: 0 }, [
      t.button ? (D(), Y(pe, L({
        key: 0,
        variant: "text"
      }, S(a), {
        disabled: S(s),
        color: t.color,
        icon: t.icon,
        title: t.title,
        "aria-label": t.title,
        onClick: Ie(S(i), ["stop"])
      }), null, 16, ["disabled", "color", "icon", "title", "aria-label", "onClick"])) : (D(), Y(Ye, L({ key: 1 }, S(a), {
        title: t.title,
        "base-color": t.color,
        "prepend-icon": t.icon,
        disabled: S(s),
        onClick: Ie(S(i), ["stop"])
      }), null, 16, ["title", "base-color", "prepend-icon", "disabled", "onClick"]))
    ], 64)) : de("", !0);
  }
}), ms = /* @__PURE__ */ Le({
  __name: "OxActionModelDelete",
  props: {
    item: {}
  },
  setup(e) {
    const n = ve("panel"), t = ve("repos"), a = Tt(), l = e;
    async function o(i, s) {
      return await t[s.constructor.entity].api().delete(s.$url(), { delete: l.item.id });
    }
    return (i, s) => (D(), Y(Mt, L(S(a), {
      item: l.item,
      icon: "mdi-delete",
      color: "error",
      title: S(oe)("actions.delete"),
      confirm: S(oe)("actions.delete.confirm"),
      permission: [l.item.constructor, "delete"],
      run: o,
      onCompleted: s[0] || (s[0] = (u) => {
        var r;
        return (r = S(n)) == null ? void 0 : r.show({ view: S(n).index });
      })
    }), null, 16, ["item", "title", "confirm", "permission"]));
  }
}), gs = /* @__PURE__ */ Le({
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
    const n = Tt(), t = e;
    async function a(l, o) {
      const i = t.repo.api();
      return await i[t.method].apply(i, [o.$url(t.path), t.data, t.options]);
    }
    return (l, o) => (D(), Y(S(Mt), L(S(n), { run: a }), null, 16));
  }
}), ys = /* @__PURE__ */ Le({
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
    function l(i) {
      return i.permission && !t.can(i.permission) ? !1 : i.items ? i.items.some((s) => l(s)) : !0;
    }
    function o() {
      const i = { panel: n.name, href: n.url };
      a.show(i);
    }
    return (i, s) => {
      const u = oi("ox-app-nav-item", !0);
      return l(n) ? (D(), be(J, { key: 0 }, [
        n.type == "group" ? (D(), Y(Ha, {
          key: 0,
          value: n.name
        }, {
          activator: R(({ props: r }) => [
            b(Ye, L(r, {
              title: n.title,
              "prepend-icon": n.icon
            }), null, 16, ["title", "prepend-icon"])
          ]),
          default: R(() => [
            (D(!0), be(J, null, Fe(n.items, (r, c) => (D(), Y(u, L({
              key: c,
              ref_for: !0
            }, r, {
              type: r.type == "group" ? "subheader" : r.type
            }), null, 16, ["type"]))), 128))
          ]),
          _: 1
        }, 8, ["value"])) : n.type == "subheader" ? (D(), be(J, { key: 1 }, [
          b(Pi, null, {
            default: R(() => [
              Pe(Me(n.title), 1)
            ]),
            _: 1
          }),
          n.items ? (D(!0), be(J, { key: 0 }, Fe(n.items, (r) => (D(), Y(u, L({ ref_for: !0 }, r), null, 16))), 256)) : de("", !0)
        ], 64)) : (D(), Y(Ye, {
          key: 2,
          active: S(a).panel == n.name,
          value: n.name,
          "prepend-icon": n.icon,
          title: n.title,
          onClick: Ie(o, ["stop"])
        }, null, 8, ["active", "value", "prepend-icon", "title"]))
      ], 64)) : de("", !0);
    };
  }
});
function hs(e) {
  let {
    rootEl: n,
    isSticky: t,
    layoutItemStyles: a
  } = e;
  const l = ee(!1), o = ee(0), i = A(() => {
    const r = typeof l.value == "boolean" ? "top" : l.value;
    return [t.value ? {
      top: "auto",
      bottom: "auto",
      height: void 0
    } : void 0, l.value ? {
      [r]: ye(o.value)
    } : {
      top: a.value.top
    }];
  });
  Ze(() => {
    Q(t, (r) => {
      r ? window.addEventListener("scroll", u, {
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
    const r = s > window.scrollY ? "up" : "down", c = n.value.getBoundingClientRect(), d = parseFloat(a.value.top ?? 0), m = window.scrollY - Math.max(0, o.value - d), v = c.height + Math.max(o.value, d) - window.scrollY - window.innerHeight, f = parseFloat(getComputedStyle(n.value).getPropertyValue("--v-body-scroll-y")) || 0;
    c.height < window.innerHeight - d ? (l.value = "top", o.value = d) : r === "up" && l.value === "bottom" || r === "down" && l.value === "top" ? (o.value = window.scrollY + c.top - f, l.value = !0) : r === "down" && v <= 0 ? (o.value = 0, l.value = "bottom") : r === "up" && m <= 0 && (f ? l.value !== "top" && (o.value = -m + f + d, l.value = "top") : (o.value = c.top + m, l.value = "top")), s = window.scrollY;
  }
  return {
    isStuck: l,
    stickyStyles: i
  };
}
const bs = 100, ps = 20;
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
function ws() {
  const e = {};
  function n(l) {
    Array.from(l.changedTouches).forEach((o) => {
      (e[o.identifier] ?? (e[o.identifier] = new Sn(ps))).push([l.timeStamp, o]);
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
      if (i[0] - c[0] > bs) break;
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
        } = this, [m, v] = [Math.abs(c), Math.abs(d)];
        return m > v && c >= 0 ? "right" : m > v && c <= 0 ? "left" : v > m && d >= 0 ? "down" : v > m && d <= 0 ? "up" : xs();
      }
    };
  }
  return {
    addMovement: n,
    endTouch: t,
    getVelocity: a
  };
}
function xs() {
  throw new Error();
}
function Ss(e) {
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
    endTouch: r,
    getVelocity: c
  } = ws();
  let d = !1;
  const m = ee(!1), v = ee(0), f = ee(0);
  let k;
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
    const P = w.changedTouches[0].clientX, h = w.changedTouches[0].clientY, _ = 25, T = i.value === "left" ? P < _ : i.value === "right" ? P > document.documentElement.clientWidth - _ : i.value === "top" ? h < _ : i.value === "bottom" ? h > document.documentElement.clientHeight - _ : xt(), E = t.value && (i.value === "left" ? P < l.value : i.value === "right" ? P > document.documentElement.clientWidth - l.value : i.value === "top" ? h < l.value : i.value === "bottom" ? h > document.documentElement.clientHeight - l.value : xt());
    (T || E || t.value && a.value) && (k = [P, h], f.value = y(s.value ? P : h, t.value), v.value = p(s.value ? P : h), d = f.value > -20 && f.value < 80, r(w), u(w));
  }
  function I(w) {
    const P = w.changedTouches[0].clientX, h = w.changedTouches[0].clientY;
    if (d) {
      if (!w.cancelable) {
        d = !1;
        return;
      }
      const T = Math.abs(P - k[0]), E = Math.abs(h - k[1]);
      (s.value ? T > E && T > 3 : E > T && E > 3) ? (m.value = !0, d = !1) : (s.value ? E : T) > 3 && (d = !1);
    }
    if (!m.value) return;
    w.preventDefault(), u(w);
    const _ = p(s.value ? P : h, !1);
    v.value = Math.max(0, Math.min(1, _)), _ > 1 ? f.value = y(s.value ? P : h, !0) : _ < 0 && (f.value = y(s.value ? P : h, !1));
  }
  function x(w) {
    if (d = !1, !m.value) return;
    u(w), m.value = !1;
    const P = c(w.changedTouches[0].identifier), h = Math.abs(P.x), _ = Math.abs(P.y);
    (s.value ? h > _ && h > 400 : _ > h && _ > 3) ? t.value = P.direction === ({
      left: "right",
      right: "left",
      top: "down",
      bottom: "up"
    }[i.value] || xt()) : t.value = v.value > 0.5;
  }
  const V = A(() => m.value ? {
    transform: i.value === "left" ? `translateX(calc(-100% + ${v.value * l.value}px))` : i.value === "right" ? `translateX(calc(100% - ${v.value * l.value}px))` : i.value === "top" ? `translateY(calc(-100% + ${v.value * l.value}px))` : i.value === "bottom" ? `translateY(calc(100% - ${v.value * l.value}px))` : xt(),
    transition: "none"
  } : void 0);
  return qe(m, () => {
    var h, _;
    const w = ((h = n.value) == null ? void 0 : h.style.transform) ?? null, P = ((_ = n.value) == null ? void 0 : _.style.transition) ?? null;
    et(() => {
      var T, E, M, F;
      (E = n.value) == null || E.style.setProperty("transform", ((T = V.value) == null ? void 0 : T.transform) || "none"), (F = n.value) == null || F.style.setProperty("transition", ((M = V.value) == null ? void 0 : M.transition) || null);
    }), Ue(() => {
      var T, E;
      (T = n.value) == null || T.style.setProperty("transform", w), (E = n.value) == null || E.style.setProperty("transition", P);
    });
  }), {
    isDragging: m,
    dragProgress: v,
    dragStyles: V
  };
}
function xt() {
  throw new Error();
}
const Rn = j({
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
      t = Li(s, () => {
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
function Yt() {
  const n = lt("useScopeId").vnode.scopeId;
  return {
    scopeId: n ? {
      [n]: ""
    } : void 0
  };
}
const ks = ["start", "end", "left", "right", "top", "bottom"], Vs = j({
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
    validator: (e) => ks.includes(e)
  },
  sticky: Boolean,
  ...Ht(),
  ...Se(),
  ...Rn(),
  ...Gt({
    mobile: null
  }),
  ...Nt(),
  ...En(),
  ...wt(),
  ...je({
    tag: "nav"
  }),
  ...Ne()
}, "VNavigationDrawer"), Cs = ne()({
  name: "VNavigationDrawer",
  props: Vs(),
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
    } = ga(e), {
      backgroundColorClasses: u,
      backgroundColorStyles: r
    } = st(() => e.color), {
      elevationClasses: c
    } = ya(e), {
      displayClasses: d,
      mobile: m
    } = ft(e), {
      roundedClasses: v
    } = _t(e), f = un(), k = we(e, "modelValue", null, (B) => !!B), {
      ssrBootStyles: y
    } = ha(), {
      scopeId: p
    } = Yt(), g = q(), I = ee(!1), {
      runOpenDelay: x,
      runCloseDelay: V
    } = Mn(e, (B) => {
      I.value = B;
    }), w = A(() => e.rail && e.expandOnHover && I.value ? Number(e.width) : Number(e.rail ? e.railWidth : e.width)), P = A(() => Ii(e.location, o.value)), h = H(() => e.persistent), _ = A(() => !e.permanent && (m.value || e.temporary)), T = A(() => e.sticky && !_.value && P.value !== "bottom");
    qe(() => e.expandOnHover && e.rail != null, () => {
      Q(I, (B) => a("update:rail", !B));
    }), qe(() => !e.disableResizeWatcher, () => {
      Q(_, (B) => !e.permanent && Te(() => k.value = !B));
    }), qe(() => !e.disableRouteWatcher && !!f, () => {
      Q(f.currentRoute, () => _.value && (k.value = !1));
    }), Q(() => e.permanent, (B) => {
      B && (k.value = !0);
    }), e.modelValue == null && !_.value && (k.value = e.permanent || !m.value);
    const {
      isDragging: E,
      dragProgress: M
    } = Ss({
      el: g,
      isActive: k,
      isTemporary: _,
      width: w,
      touchless: H(() => e.touchless),
      position: P
    }), F = A(() => {
      const B = _.value ? 0 : e.rail && e.expandOnHover ? Number(e.railWidth) : w.value;
      return E.value ? B * M.value : B;
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
        e.absolute || T.value && typeof K.value != "string"
      ))
    }), {
      isStuck: K,
      stickyStyles: te
    } = hs({
      rootEl: g,
      isSticky: T,
      layoutItemStyles: z
    }), ae = st(() => typeof e.scrim == "string" ? e.scrim : null), ue = A(() => ({
      ...E.value ? {
        opacity: M.value * 0.2,
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
        onMouseenter: x,
        onMouseleave: V,
        class: ["v-navigation-drawer", `v-navigation-drawer--${P.value}`, {
          "v-navigation-drawer--expand-on-hover": e.expandOnHover,
          "v-navigation-drawer--floating": e.floating,
          "v-navigation-drawer--is-hovering": I.value,
          "v-navigation-drawer--rail": e.rail,
          "v-navigation-drawer--temporary": _.value,
          "v-navigation-drawer--persistent": h.value,
          "v-navigation-drawer--active": k.value,
          "v-navigation-drawer--sticky": T.value
        }, i.value, u.value, s.value, d.value, c.value, v.value, e.class],
        style: [r.value, z.value, y.value, te.value, e.style]
      }, p, t), {
        default: () => {
          var $, O, U;
          return [B && C("div", {
            key: "image",
            class: "v-navigation-drawer__img"
          }, [l.image ? b(Re, {
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
          }, l.image) : b(ba, {
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
      }), b(ta, {
        name: "fade-transition"
      }, {
        default: () => [_.value && (E.value || k.value) && !!e.scrim && C("div", L({
          class: ["v-navigation-drawer__scrim", ae.backgroundColorClasses.value],
          style: [ue.value, ae.backgroundColorStyles.value],
          onClick: () => {
            h.value || (k.value = !1);
          }
        }, p), null)]
      })]);
    }), {
      isStuck: K
    };
  }
}), Ps = {
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
        for (const r of u)
          if (r.items) {
            const c = s(r.items);
            if (c)
              return [c, r.name];
          } else if (r.name == n.panel)
            return [r.name];
      }
    }
    return (u, r) => (D(), Y(Cs, {
      modelValue: t.value,
      "onUpdate:modelValue": r[1] || (r[1] = (c) => t.value = c),
      theme: "dark"
    }, {
      append: R(() => [
        b(ut, null, {
          default: R(() => [
            G(u.$slots, "append")
          ]),
          _: 3
        })
      ]),
      default: R(() => [
        G(u.$slots, "prepend"),
        b(ut, {
          opened: a.value,
          "onUpdate:opened": r[0] || (r[0] = (c) => a.value = c),
          density: "compact"
        }, {
          default: R(() => [
            (D(!0), be(J, null, Fe(o.value, (c, d) => (D(), Y(S(ys), L({
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
}, Is = j({
  ...Se(),
  ...cs({
    fullHeight: !0
  }),
  ...Ne()
}, "VApp"), As = ne()({
  name: "VApp",
  props: Is(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = Ge(e), {
      layoutClasses: l,
      getLayoutItem: o,
      items: i,
      layoutRef: s
    } = vs(e), {
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
      getLayoutItem: o,
      items: i,
      theme: a
    };
  }
}), Dn = j({
  text: String,
  ...Se(),
  ...je()
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
}), Ts = [null, "prominent", "default", "comfortable", "compact"], Nn = j({
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
  ...Ht(),
  ...Se(),
  ...Nt(),
  ...wt(),
  ...je({
    tag: "header"
  }),
  ...Ne()
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
    } = ga(e), {
      elevationClasses: i
    } = ya(e), {
      roundedClasses: s
    } = _t(e), {
      themeClasses: u
    } = Ge(e), {
      rtlClasses: r
    } = nt(), c = ee(!!(e.extended || (v = t.extension) != null && v.call(t))), d = A(() => parseInt(Number(e.height) + (e.density === "prominent" ? Number(e.height) : 0) - (e.density === "comfortable" ? 8 : 0) - (e.density === "compact" ? 16 : 0), 10)), m = A(() => c.value ? parseInt(Number(e.extensionHeight) + (e.density === "prominent" ? Number(e.extensionHeight) : 0) - (e.density === "comfortable" ? 4 : 0) - (e.density === "compact" ? 8 : 0), 10) : 0);
    return at({
      VBtn: {
        variant: "text"
      }
    }), ie(() => {
      var p;
      const f = !!(e.title || t.title), k = !!(t.image || e.image), y = (p = t.extension) == null ? void 0 : p.call(t);
      return c.value = !!(e.extended || y), b(e.tag, {
        class: fe(["v-toolbar", {
          "v-toolbar--absolute": e.absolute,
          "v-toolbar--collapse": e.collapse,
          "v-toolbar--flat": e.flat,
          "v-toolbar--floating": e.floating,
          [`v-toolbar--density-${e.density}`]: !0
        }, a.value, o.value, i.value, s.value, u.value, r.value, e.class]),
        style: Ve([l.value, e.style])
      }, {
        default: () => [k && C("div", {
          key: "image",
          class: "v-toolbar__image"
        }, [t.image ? b(Re, {
          key: "image-defaults",
          disabled: !e.image,
          defaults: {
            VImg: {
              cover: !0,
              src: e.image
            }
          }
        }, t.image) : b(ba, {
          key: "image-img",
          cover: !0,
          src: e.image
        }, null)]), b(Re, {
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
            }, [(g = t.prepend) == null ? void 0 : g.call(t)]), f && b(Ln, {
              key: "title",
              text: e.title
            }, {
              text: t.title
            }), (I = t.default) == null ? void 0 : I.call(t), t.append && C("div", {
              class: "v-toolbar__append"
            }, [(x = t.append) == null ? void 0 : x.call(t)])])];
          }
        }), b(Re, {
          defaults: {
            VTabs: {
              height: ye(m.value)
            }
          }
        }, {
          default: () => [b(Ai, null, {
            default: () => [c.value && C("div", {
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
}), Bs = j({
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
  const o = q(null), i = ee(0), s = ee(0), u = ee(0), r = ee(!1), c = ee(!1), d = A(() => Number(e.scrollThreshold)), m = A(() => Je((d.value - i.value) / d.value || 0)), v = () => {
    const f = o.value;
    if (!f || t && !t.value) return;
    a = i.value, i.value = "window" in f ? f.pageYOffset : f.scrollTop;
    const k = f instanceof Window ? document.documentElement.scrollHeight : f.scrollHeight;
    if (l !== k) {
      l = k;
      return;
    }
    c.value = i.value < a, u.value = Math.abs(i.value - d.value);
  };
  return Q(c, () => {
    s.value = s.value || i.value;
  }), Q(r, () => {
    s.value = 0;
  }), Ze(() => {
    Q(() => e.scrollTarget, (f) => {
      var y;
      const k = f ? document.querySelector(f) : window;
      if (!k) {
        kn(`Unable to locate element with identifier ${f}`);
        return;
      }
      k !== o.value && ((y = o.value) == null || y.removeEventListener("scroll", v), o.value = k, o.value.addEventListener("scroll", v, {
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
    isScrollActive: r,
    scrollRatio: m,
    // required only for testing
    // probably can be removed
    // later (2 chars chlng)
    isScrollingUp: c,
    savedScroll: s
  };
}
const Es = j({
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
  ...Bs(),
  height: {
    type: [Number, String],
    default: 64
  }
}, "VAppBar"), $s = ne()({
  name: "VAppBar",
  props: Es(),
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
      isScrollingUp: r,
      scrollRatio: c
    } = _s(e, {
      canScroll: i
    }), d = H(() => o.value.hide || o.value.fullyHide), m = A(() => e.collapse || o.value.collapse && (o.value.inverted ? c.value > 0 : c.value === 0)), v = A(() => e.flat || o.value.fullyHide && !l.value || o.value.elevate && (o.value.inverted ? s.value > 0 : s.value === 0)), f = A(() => o.value.fadeImage ? o.value.inverted ? 1 - c.value : c.value : void 0), k = A(() => {
      var x, V;
      if (o.value.hide && o.value.inverted) return 0;
      const g = ((x = a.value) == null ? void 0 : x.contentHeight) ?? 0, I = ((V = a.value) == null ? void 0 : V.extensionHeight) ?? 0;
      return d.value ? s.value < u.value || o.value.fullyHide ? g + I : g : g + I;
    });
    qe(() => !!e.scrollBehavior, () => {
      et(() => {
        d.value ? o.value.inverted ? l.value = s.value > u.value : l.value = r.value || s.value < u.value : l.value = !0;
      });
    });
    const {
      ssrBootStyles: y
    } = ha(), {
      layoutItemStyles: p
    } = On({
      id: e.name,
      order: A(() => parseInt(e.order, 10)),
      position: H(() => e.location),
      layoutSize: k,
      elementSize: ee(void 0),
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
}), Os = j({
  ...rn({
    icon: "$menu",
    variant: "text"
  })
}, "VAppBarNavIcon"), Hn = ne()({
  name: "VAppBarNavIcon",
  props: Os(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    return ie(() => b(pe, L(e, {
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
    return ie(() => b(Ln, L(e, {
      class: "v-app-bar-title"
    }), t)), {};
  }
}), Fs = j({
  scrollable: Boolean,
  ...Se(),
  ...Wt(),
  ...je({
    tag: "main"
  })
}, "VMain"), Rs = ne()({
  name: "VMain",
  props: Fs(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const {
      dimensionStyles: a
    } = zt(e), {
      mainStyles: l
    } = $n(), {
      ssrBootStyles: o
    } = ha();
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
function Ms(e, n) {
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
  static: Ns,
  // specific viewport position, usually centered
  connected: zs
  // connected to a certain element
}, Ds = j({
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
function Ls(e, n) {
  const t = q({}), a = q();
  ze && qe(() => !!(n.isActive.value && e.locationStrategy), (s) => {
    var u, r;
    Q(() => e.locationStrategy, s), Ue(() => {
      window.removeEventListener("resize", l), visualViewport == null || visualViewport.removeEventListener("resize", o), visualViewport == null || visualViewport.removeEventListener("scroll", i), a.value = void 0;
    }), window.addEventListener("resize", l, {
      passive: !0
    }), visualViewport == null || visualViewport.addEventListener("resize", o, {
      passive: !0
    }), visualViewport == null || visualViewport.addEventListener("scroll", i, {
      passive: !0
    }), typeof e.locationStrategy == "function" ? a.value = (u = e.locationStrategy(n, e, t)) == null ? void 0 : u.updateLocation : a.value = (r = zn[e.locationStrategy](n, e, t)) == null ? void 0 : r.updateLocation;
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
function Ns() {
}
function Hs(e, n) {
  const t = vl(e);
  return n ? t.x += parseFloat(e.style.right || 0) : t.x -= parseFloat(e.style.left || 0), t.y -= parseFloat(e.style.top || 0), t;
}
function zs(e, n, t) {
  (Array.isArray(e.target.value) || rs(e.target.value)) && Object.assign(t.value, {
    position: "fixed",
    top: 0,
    [e.isRtl.value ? "right" : "left"]: 0
  });
  const {
    preferredAnchor: l,
    preferredOrigin: o
  } = Ni(() => {
    const p = _l(n.location, e.isRtl.value), g = n.origin === "overlap" ? p : n.origin === "auto" ? Ia(p) : _l(n.origin, e.isRtl.value);
    return p.side === g.side && p.align === Aa(g).align ? {
      preferredAnchor: El(p),
      preferredOrigin: El(g)
    } : {
      preferredAnchor: p,
      preferredOrigin: g
    };
  }), [i, s, u, r] = ["minWidth", "minHeight", "maxWidth", "maxHeight"].map((p) => A(() => {
    const g = parseFloat(n[p]);
    return isNaN(g) ? 1 / 0 : g;
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
  const v = new Sn(4), f = new ResizeObserver(() => {
    if (!d) return;
    if (requestAnimationFrame((g) => {
      g !== m && v.clear(), requestAnimationFrame((I) => {
        m = I;
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
    let [I, x] = p, [V, w] = g;
    V && !Array.isArray(V) && f.unobserve(V), I && !Array.isArray(I) && f.observe(I), w && f.unobserve(w), x && f.observe(x);
  }, {
    immediate: !0
  }), Ue(() => {
    f.disconnect();
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
    const p = Hs(e.contentEl.value, e.isRtl.value), g = oa(e.contentEl.value), I = 12;
    g.length || (g.push(document.documentElement), e.contentEl.value.style.top && e.contentEl.value.style.left || (p.x -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0), p.y -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0)));
    const x = g.reduce((F, z) => {
      const W = ls(z);
      return F ? new tt({
        x: Math.max(F.left, W.left),
        y: Math.max(F.top, W.top),
        width: Math.min(F.right, W.right) - Math.max(F.left, W.left),
        height: Math.min(F.bottom, W.bottom) - Math.max(F.top, W.top)
      }) : W;
    }, void 0);
    x.x += I, x.y += I, x.width -= I * 2, x.height -= I * 2;
    let V = {
      anchor: l.value,
      origin: o.value
    };
    function w(F) {
      const z = new tt(p), W = Kl(F.anchor, k), K = Kl(F.origin, z);
      let {
        x: te,
        y: ae
      } = Ms(W, K);
      switch (F.anchor.side) {
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
      switch (F.anchor.align) {
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
        overflows: Dl(z, x),
        x: te,
        y: ae
      };
    }
    let P = 0, h = 0;
    const _ = {
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
      } = w(V);
      P += F, h += z, p.x += F, p.y += z;
      {
        const K = $l(V.anchor), te = W.x.before || W.x.after, ae = W.y.before || W.y.after;
        let ue = !1;
        if (["x", "y"].forEach((B) => {
          if (B === "x" && te && !T.x || B === "y" && ae && !T.y) {
            const $ = {
              anchor: {
                ...V.anchor
              },
              origin: {
                ...V.origin
              }
            }, O = B === "x" ? K === "y" ? Aa : Ia : K === "y" ? Ia : Aa;
            $.anchor = O($.anchor), $.origin = O($.origin);
            const {
              overflows: U
            } = w($);
            (U[B].before <= W[B].before && U[B].after <= W[B].after || U[B].before + U[B].after < (W[B].before + W[B].after) / 2) && (V = $, ue = T[B] = !0);
          }
        }), ue) continue;
      }
      W.x.before && (P += W.x.before, p.x += W.x.before), W.x.after && (P -= W.x.after, p.x -= W.x.after), W.y.before && (h += W.y.before, p.y += W.y.before), W.y.after && (h -= W.y.after, p.y -= W.y.after);
      {
        const K = Dl(p, x);
        _.x = x.width - K.x.before - K.x.after, _.y = x.height - K.y.before - K.y.after, P += K.x.before, p.x += K.x.before, h += K.y.before, p.y += K.y.before;
      }
      break;
    }
    const M = $l(V.anchor);
    return Object.assign(t.value, {
      "--v-overlay-anchor-origin": `${V.anchor.side} ${V.anchor.align}`,
      transformOrigin: `${V.origin.side} ${V.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: ye(Oa(h)),
      left: e.isRtl.value ? void 0 : ye(Oa(P)),
      right: e.isRtl.value ? ye(Oa(-P)) : void 0,
      minWidth: ye(M === "y" ? Math.min(i.value, k.width) : i.value),
      maxWidth: ye(Gl(Je(_.x, i.value === 1 / 0 ? 0 : i.value, u.value))),
      maxHeight: ye(Gl(Je(_.y, s.value === 1 / 0 ? 0 : s.value, r.value)))
    }), {
      available: _,
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
const ia = [];
function Ws(e) {
  !Ua || ia.length ? (ia.push(e), ja()) : (Ua = !1, e(), ja());
}
let Yl = -1;
function ja() {
  cancelAnimationFrame(Yl), Yl = requestAnimationFrame(() => {
    const e = ia.shift();
    e && e(), ia.length ? ja() : Ua = !0;
  });
}
const ea = {
  none: null,
  close: Ks,
  block: Gs,
  reposition: Ys
}, Us = j({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (e) => typeof e == "function" || e in ea
  }
}, "VOverlay-scroll-strategies");
function js(e, n) {
  if (!ze) return;
  let t;
  et(async () => {
    t == null || t.stop(), n.isActive.value && e.scrollStrategy && (t = on(), await new Promise((a) => setTimeout(a)), t.active && t.run(() => {
      var a;
      typeof e.scrollStrategy == "function" ? e.scrollStrategy(n, e, t) : (a = ea[e.scrollStrategy]) == null || a.call(ea, n, e, t);
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
function Gs(e, n) {
  var i;
  const t = (i = e.root.value) == null ? void 0 : i.offsetParent, a = [.../* @__PURE__ */ new Set([...oa(e.targetEl.value, n.contained ? t : void 0), ...oa(e.contentEl.value, n.contained ? t : void 0)])].filter((s) => !s.classList.contains("v-overlay-scroll-blocked")), l = window.innerWidth - document.documentElement.offsetWidth, o = ((s) => fl(s) && s)(t || document.documentElement);
  o && e.root.value.classList.add("v-overlay--scroll-blocked"), a.forEach((s, u) => {
    s.style.setProperty("--v-body-scroll-x", ye(-s.scrollLeft)), s.style.setProperty("--v-body-scroll-y", ye(-s.scrollTop)), s !== document.documentElement && s.style.setProperty("--v-scrollbar-offset", ye(l)), s.classList.add("v-overlay-scroll-blocked");
  }), Ue(() => {
    a.forEach((s, u) => {
      const r = parseFloat(s.style.getPropertyValue("--v-body-scroll-x")), c = parseFloat(s.style.getPropertyValue("--v-body-scroll-y")), d = s.style.scrollBehavior;
      s.style.scrollBehavior = "auto", s.style.removeProperty("--v-body-scroll-x"), s.style.removeProperty("--v-body-scroll-y"), s.style.removeProperty("--v-scrollbar-offset"), s.classList.remove("v-overlay-scroll-blocked"), s.scrollLeft = -r, s.scrollTop = -c, s.style.scrollBehavior = d;
    }), o && e.root.value.classList.remove("v-overlay--scroll-blocked");
  });
}
function Ys(e, n, t) {
  let a = !1, l = -1, o = -1;
  function i(s) {
    Ws(() => {
      var c, d;
      const u = performance.now();
      (d = (c = e.updateLocation).value) == null || d.call(c, s), a = (performance.now() - u) / (1e3 / 60) > 2;
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
  const t = [document, ...oa(e)];
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
const Ka = Symbol.for("vuetify:v-menu"), qs = j({
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
function Xs(e, n) {
  let {
    isActive: t,
    isTop: a,
    contentEl: l
  } = n;
  const o = lt("useActivator"), i = q();
  let s = !1, u = !1, r = !0;
  const c = A(() => e.openOnFocus || e.openOnFocus == null && e.openOnHover), d = A(() => e.openOnClick || e.openOnClick == null && !e.openOnHover && !c.value), {
    runOpenDelay: m,
    runCloseDelay: v
  } = Mn(e, (h) => {
    h === (e.openOnHover && s || c.value && u) && !(e.openOnHover && t.value && !a.value) && (t.value !== h && (r = !0), t.value = h);
  }), f = q(), k = {
    onClick: (h) => {
      h.stopPropagation(), i.value = h.currentTarget || h.target, t.value || (f.value = [h.clientX, h.clientY]), t.value = !t.value;
    },
    onMouseenter: (h) => {
      var _;
      (_ = h.sourceCapabilities) != null && _.firesTouchEvents || (s = !0, i.value = h.currentTarget || h.target, m());
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
  }, y = A(() => {
    const h = {};
    return d.value && (h.onClick = k.onClick), e.openOnHover && (h.onMouseenter = k.onMouseenter, h.onMouseleave = k.onMouseleave), c.value && (h.onFocus = k.onFocus, h.onBlur = k.onBlur), h;
  }), p = A(() => {
    const h = {};
    if (e.openOnHover && (h.onMouseenter = () => {
      s = !0, m();
    }, h.onMouseleave = () => {
      s = !1, v();
    }), c.value && (h.onFocusin = () => {
      u = !0, m();
    }, h.onFocusout = () => {
      u = !1, v();
    }), e.closeOnContentClick) {
      const _ = ve(Ka, null);
      h.onClick = () => {
        t.value = !1, _ == null || _.closeParents();
      };
    }
    return h;
  }), g = A(() => {
    const h = {};
    return e.openOnHover && (h.onMouseenter = () => {
      r && (s = !0, r = !1, m());
    }, h.onMouseleave = () => {
      s = !1, v();
    }), h;
  });
  Q(a, (h) => {
    var _;
    h && (e.openOnHover && !s && (!c.value || !u) || c.value && !u && (!e.openOnHover || !s)) && !((_ = l.value) != null && _.contains(document.activeElement)) && (t.value = !1);
  }), Q(t, (h) => {
    h || setTimeout(() => {
      f.value = void 0;
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
  const x = Rl(), V = A(() => e.target === "cursor" && f.value ? f.value : x.value ? x.el : Un(e.target, o) || i.value), w = A(() => Array.isArray(V.value) ? void 0 : V.value);
  let P;
  return Q(() => !!e.activator, (h) => {
    h && ze ? (P = on(), P.run(() => {
      Zs(e, o, {
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
    target: V,
    targetEl: w,
    targetRef: x,
    activatorEvents: y,
    contentEvents: p,
    scrimEvents: g
  };
}
function Zs(e, n, t) {
  let {
    activatorEl: a,
    activatorEvents: l
  } = t;
  Q(() => e.activator, (u, r) => {
    if (r && u !== r) {
      const c = s(r);
      c && i(c);
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
    let u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : s(), r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    u && ns(u, L(l.value, r));
  }
  function i() {
    let u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : s(), r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    u && os(u, L(l.value, r));
  }
  function s() {
    let u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : e.activator;
    const r = Un(u, n);
    return a.value = (r == null ? void 0 : r.nodeType) === Node.ELEMENT_NODE ? r : void 0, a.value;
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
function Qs() {
  if (!ze) return ee(!1);
  const {
    ssr: e
  } = ft();
  if (e) {
    const n = ee(!1);
    return Ze(() => {
      n.value = !0;
    }), n;
  } else
    return ee(!0);
}
const jn = j({
  eager: Boolean
}, "lazy");
function Kn(e, n) {
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
const ql = Symbol.for("vuetify:stack"), $t = Qe([]);
function Js(e, n, t) {
  const a = lt("useStack"), l = !t, o = ve(ql, void 0), i = Qe({
    activeChildren: /* @__PURE__ */ new Set()
  });
  We(ql, i);
  const s = ee(Number(Tl(n)));
  qe(e, () => {
    var d;
    const c = (d = $t.at(-1)) == null ? void 0 : d[1];
    s.value = c ? c + 10 : Number(Tl(n)), l && $t.push([a.uid, s.value]), o == null || o.activeChildren.add(a.uid), Ue(() => {
      if (l) {
        const m = La($t).findIndex((v) => v[0] === a.uid);
        $t.splice(m, 1);
      }
      o == null || o.activeChildren.delete(a.uid);
    });
  });
  const u = ee(!0);
  l && et(() => {
    var d;
    const c = ((d = $t.at(-1)) == null ? void 0 : d[0]) === a.uid;
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
function eu(e) {
  return {
    teleportTarget: A(() => {
      const t = e();
      if (t === !0 || !ze) return;
      const a = t === !1 ? document.body : typeof t == "string" ? document.querySelector(t) : t;
      if (a == null) {
        ii(`Unable to locate target ${t}`);
        return;
      }
      let l = [...a.children].find((o) => o.matches(".v-overlay-container"));
      return l || (l = document.createElement("div"), l.className = "v-overlay-container", a.appendChild(l)), l;
    })
  };
}
function tu() {
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
  return (typeof n.value == "object" && n.value.closeConditional || tu)(e);
}
function au(e, n, t) {
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
    const t = (l) => au(l, e, n), a = (l) => {
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
function lu(e) {
  const {
    modelValue: n,
    color: t,
    ...a
  } = e;
  return b(ta, {
    name: "fade-transition",
    appear: !0
  }, {
    default: () => [e.modelValue && C("div", L({
      class: ["v-overlay__scrim", e.color.backgroundColorClasses.value],
      style: e.color.backgroundColorStyles.value
    }, a), null)]
  });
}
const ml = j({
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
  ...qs(),
  ...Se(),
  ...Wt(),
  ...jn(),
  ...Ds(),
  ...Us(),
  ...Ne(),
  ...Ut()
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
    const o = lt("VOverlay"), i = q(), s = q(), u = q(), r = we(e, "modelValue"), c = A({
      get: () => r.value,
      set: (X) => {
        X && e.disabled || (r.value = X);
      }
    }), {
      themeClasses: d
    } = Ge(e), {
      rtlClasses: m,
      isRtl: v
    } = nt(), {
      hasContent: f,
      onAfterLeave: k
    } = Kn(e, c), y = st(() => typeof e.scrim == "string" ? e.scrim : null), {
      globalTop: p,
      localTop: g,
      stackStyles: I
    } = Js(c, () => e.zIndex, e._disableGlobalStack), {
      activatorEl: x,
      activatorRef: V,
      target: w,
      targetEl: P,
      targetRef: h,
      activatorEvents: _,
      contentEvents: T,
      scrimEvents: E
    } = Xs(e, {
      isActive: c,
      isTop: g,
      contentEl: u
    }), {
      teleportTarget: M
    } = eu(() => {
      var me, N, Z;
      const X = e.attach || e.contained;
      if (X) return X;
      const re = ((me = x == null ? void 0 : x.value) == null ? void 0 : me.getRootNode()) || ((Z = (N = o.proxy) == null ? void 0 : N.$el) == null ? void 0 : Z.getRootNode());
      return re instanceof ShadowRoot ? re : !1;
    }), {
      dimensionStyles: F
    } = zt(e), z = Qs(), {
      scopeId: W
    } = Yt();
    Q(() => e.disabled, (X) => {
      X && (c.value = !1);
    });
    const {
      contentStyles: K,
      updateLocation: te
    } = Ls(e, {
      isRtl: v,
      contentEl: u,
      target: w,
      isActive: c
    });
    js(e, {
      root: i,
      contentEl: u,
      targetEl: P,
      isActive: c,
      updateLocation: te
    });
    function ae(X) {
      l("click:outside", X), e.persistent ? he() : c.value = !1;
    }
    function ue(X) {
      return c.value && p.value && // If using scrim, only close if clicking on it rather than anything opened on top
      (!e.scrim || X.target === s.value || X instanceof MouseEvent && X.shadowTarget === s.value);
    }
    ze && Q(c, (X) => {
      X ? window.addEventListener("keydown", B) : window.removeEventListener("keydown", B);
    }, {
      immediate: !0
    }), dt(() => {
      ze && window.removeEventListener("keydown", B);
    });
    function B(X) {
      var re, me, N;
      X.key === "Escape" && p.value && ((re = u.value) != null && re.contains(document.activeElement) || l("keydown", X), e.persistent ? he() : (c.value = !1, (me = u.value) != null && me.contains(document.activeElement) && ((N = x.value) == null || N.focus())));
    }
    function $(X) {
      X.key === "Escape" && !p.value || l("keydown", X);
    }
    const O = un();
    qe(() => e.closeOnBack, () => {
      Ti(O, (X) => {
        p.value && c.value ? (X(!1), e.persistent ? he() : c.value = !1) : X();
      });
    });
    const U = q();
    Q(() => c.value && (e.absolute || e.contained) && M.value == null, (X) => {
      if (X) {
        const re = Bn(i.value);
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
        easing: Ft
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
      return C(J, null, [(X = t.activator) == null ? void 0 : X.call(t, {
        isActive: c.value,
        targetRef: h,
        props: L({
          ref: V
        }, _.value, e.activatorProps)
      }), z.value && f.value && b(Na, {
        disabled: !M.value,
        to: M.value
      }, {
        default: () => [C("div", L({
          class: ["v-overlay", {
            "v-overlay--absolute": e.absolute || e.contained,
            "v-overlay--active": c.value,
            "v-overlay--contained": e.contained
          }, d.value, m.value, e.class],
          style: [I.value, {
            "--v-overlay-opacity": e.opacity,
            top: ye(U.value)
          }, e.style],
          ref: i,
          onKeydown: $
        }, W, a), [b(lu, L({
          color: y,
          modelValue: c.value && !!e.scrim,
          ref: s
        }, E.value), null), b(pa, {
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
              style: [F.value, K.value]
            }, T.value, e.contentProps), [(re = t.default) == null ? void 0 : re.call(t, {
              isActive: c
            })]), [[Bt, c.value], [Zl, {
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
          const r = Ra(u.value, o) ?? ("_" in u.value ? Ra((s = u.value._) == null ? void 0 : s.setupState, o) : void 0);
          if (r) return r;
        }
        for (const u of t) {
          const r = u.value && u.value[Fa];
          if (!r) continue;
          const c = r.slice();
          for (; c.length; ) {
            const d = c.shift(), m = Ra(d.value, o);
            if (m) return m;
            const v = d.value && d.value[Fa];
            v && c.push(...v);
          }
        }
      }
    }
  });
}
function nu(e) {
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
    const r = performance.now();
    t = window.setInterval(() => {
      const c = performance.now() - r + u;
      n.value = Math.max(e() - c, 0), n.value <= 0 && a();
    }, u);
  }
  return Ue(a), {
    clear: a,
    time: n,
    start: o,
    reset: l
  };
}
const ou = j({
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
  ...Ne(),
  ...mt(ml({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
}, "VSnackbar"), iu = ne()({
  name: "VSnackbar",
  props: ou(),
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
    } = Yt(), {
      themeClasses: i
    } = Ge(e), {
      colorClasses: s,
      colorStyles: u,
      variantClasses: r
    } = al(e), {
      roundedClasses: c
    } = _t(e), d = nu(() => Number(e.timeout)), m = q(), v = q(), f = ee(!1), k = ee(0), y = q(), p = ve(Rt, void 0);
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
      const M = Hi(v.value);
      d.start(M), g = window.setTimeout(() => {
        a.value = !1;
      }, E);
    }
    function x() {
      d.reset(), window.clearTimeout(g);
    }
    function V() {
      f.value = !0, x();
    }
    function w() {
      f.value = !1, I();
    }
    function P(E) {
      k.value = E.touches[0].clientY;
    }
    function h(E) {
      Math.abs(k.value - E.changedTouches[0].clientY) > 50 && (a.value = !1);
    }
    function _() {
      f.value && w();
    }
    const T = A(() => e.location.split(" ").reduce((E, M) => (E[`v-snackbar--${M}`] = !0, E), {}));
    return ie(() => {
      const E = sa.filterProps(e), M = !!(t.default || t.text || e.text);
      return b(sa, L({
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
          class: ["v-snackbar__wrapper", i.value, s.value, c.value, r.value],
          style: [u.value],
          onPointerenter: V,
          onPointerleave: w
        }, E.contentProps),
        persistent: !0,
        noClickAnimation: !0,
        scrim: !1,
        scrollStrategy: "none",
        _disableGlobalStack: !0,
        onTouchstartPassive: P,
        onTouchend: h,
        onAfterLeave: _
      }, o), {
        default: () => {
          var F, z;
          return [ll(!1, "v-snackbar"), e.timer && !f.value && C("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [b(Bi, {
            ref: v,
            color: typeof e.timer == "string" ? e.timer : "info",
            max: e.timeout,
            "model-value": d.time.value
          }, null)]), M && C("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((F = t.text) == null ? void 0 : F.call(t)) ?? e.text, (z = t.default) == null ? void 0 : z.call(t)]), t.actions && b(Re, {
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
    }), gt({}, m);
  }
}), gl = Symbol.for("vuetify:v-tabs"), su = j({
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
  props: su(),
  setup(e, n) {
    let {
      slots: t,
      attrs: a
    } = n;
    const {
      textColorClasses: l,
      textColorStyles: o
    } = Kt(() => e.sliderColor), i = q(), s = q(), u = A(() => e.direction === "horizontal"), r = A(() => {
      var d, m;
      return ((m = (d = i.value) == null ? void 0 : d.group) == null ? void 0 : m.isSelected.value) ?? !1;
    });
    function c(d) {
      var v, f;
      let {
        value: m
      } = d;
      if (m) {
        const k = (f = (v = i.value) == null ? void 0 : v.$el.parentElement) == null ? void 0 : f.querySelector(".v-tab--selected .v-tab__slider"), y = s.value;
        if (!k || !y) return;
        const p = getComputedStyle(k).color, g = k.getBoundingClientRect(), I = y.getBoundingClientRect(), x = u.value ? "x" : "y", V = u.value ? "X" : "Y", w = u.value ? "right" : "bottom", P = u.value ? "width" : "height", h = g[x], _ = I[x], T = h > _ ? g[w] - I[w] : g[x] - I[x], E = Math.sign(T) > 0 ? u.value ? "right" : "bottom" : Math.sign(T) < 0 ? u.value ? "left" : "top" : "center", F = (Math.abs(T) + (Math.sign(T) < 0 ? g[P] : I[P])) / Math.max(g[P], I[P]) || 0, z = g[P] / I[P] || 0, W = 1.5;
        yt(y, {
          backgroundColor: [p, "currentcolor"],
          transform: [`translate${V}(${T}px) scale${V}(${z})`, `translate${V}(${T / W}px) scale${V}(${(F - 1) / W + 1})`, "none"],
          transformOrigin: Array(3).fill(E)
        }, {
          duration: 225,
          easing: Ft
        });
      }
    }
    return ie(() => {
      const d = pe.filterProps(e);
      return b(pe, L({
        symbol: gl,
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
          var m;
          return C(J, null, [((m = t.default) == null ? void 0 : m.call(t)) ?? e.text, !e.hideSlider && C("div", {
            ref: s,
            class: fe(["v-tab__slider", l.value]),
            style: Ve(o.value)
          }, null)]);
        }
      });
    }), gt({}, i);
  }
}), uu = (e) => {
  const {
    touchstartX: n,
    touchendX: t,
    touchstartY: a,
    touchendY: l
  } = e, o = 0.5, i = 16;
  e.offsetX = t - n, e.offsetY = l - a, Math.abs(e.offsetY) < o * Math.abs(e.offsetX) && (e.left && t < n - i && e.left(e), e.right && t > n + i && e.right(e)), Math.abs(e.offsetX) < o * Math.abs(e.offsetY) && (e.up && l < a - i && e.up(e), e.down && l > a + i && e.down(e));
};
function ru(e, n) {
  var a;
  const t = e.changedTouches[0];
  n.touchstartX = t.clientX, n.touchstartY = t.clientY, (a = n.start) == null || a.call(n, {
    originalEvent: e,
    ...n
  });
}
function cu(e, n) {
  var a;
  const t = e.changedTouches[0];
  n.touchendX = t.clientX, n.touchendY = t.clientY, (a = n.end) == null || a.call(n, {
    originalEvent: e,
    ...n
  }), uu(n);
}
function du(e, n) {
  var a;
  const t = e.changedTouches[0];
  n.touchmoveX = t.clientX, n.touchmoveY = t.clientY, (a = n.move) == null || a.call(n, {
    originalEvent: e,
    ...n
  });
}
function vu() {
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
    touchstart: (t) => ru(t, n),
    touchend: (t) => cu(t, n),
    touchmove: (t) => du(t, n)
  };
}
function fu(e, n) {
  var s;
  const t = n.value, a = t != null && t.parent ? e.parentElement : e, l = (t == null ? void 0 : t.options) ?? {
    passive: !0
  }, o = (s = n.instance) == null ? void 0 : s.$.uid;
  if (!a || !o) return;
  const i = vu(n.value);
  a._touchHandlers = a._touchHandlers ?? /* @__PURE__ */ Object.create(null), a._touchHandlers[o] = i, Cn(i).forEach((u) => {
    a.addEventListener(u, i[u], l);
  });
}
function mu(e, n) {
  var o, i;
  const t = (o = n.value) != null && o.parent ? e.parentElement : e, a = (i = n.instance) == null ? void 0 : i.$.uid;
  if (!(t != null && t._touchHandlers) || !a) return;
  const l = t._touchHandlers[a];
  Cn(l).forEach((s) => {
    t.removeEventListener(s, l[s]);
  }), delete t._touchHandlers[a];
}
const Ya = {
  mounted: fu,
  unmounted: mu
}, qn = Symbol.for("vuetify:v-window"), Xn = Symbol.for("vuetify:v-window-group"), Zn = j({
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
  ...je(),
  ...Ne()
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
    } = ot(), i = nl(e, Xn), s = q(), u = A(() => l.value ? !e.reverse : e.reverse), r = ee(!1), c = A(() => {
      const x = e.direction === "vertical" ? "y" : "x", w = (u.value ? !r.value : r.value) ? "-reverse" : "";
      return `v-window-${x}${w}-transition`;
    }), d = ee(0), m = q(void 0), v = A(() => i.items.value.findIndex((x) => i.selected.value.includes(x.id)));
    Q(v, (x, V) => {
      const w = i.items.value.length, P = w - 1;
      w <= 2 ? r.value = x < V : x === P && V === 0 ? r.value = !0 : x === 0 && V === P ? r.value = !1 : r.value = x < V;
    }), We(qn, {
      transition: c,
      isReversed: r,
      transitionCount: d,
      transitionHeight: m,
      rootRef: s
    });
    const f = H(() => e.continuous || v.value !== 0), k = H(() => e.continuous || v.value !== i.items.value.length - 1);
    function y() {
      f.value && i.prev();
    }
    function p() {
      k.value && i.next();
    }
    const g = A(() => {
      const x = [], V = {
        icon: l.value ? e.nextIcon : e.prevIcon,
        class: `v-window__${u.value ? "right" : "left"}`,
        onClick: i.prev,
        "aria-label": o("$vuetify.carousel.prev")
      };
      x.push(f.value ? t.prev ? t.prev({
        props: V
      }) : b(pe, V, null) : C("div", null, null));
      const w = {
        icon: l.value ? e.prevIcon : e.nextIcon,
        class: `v-window__${u.value ? "left" : "right"}`,
        onClick: i.next,
        "aria-label": o("$vuetify.carousel.next")
      };
      return x.push(k.value ? t.next ? t.next({
        props: w
      }) : b(pe, w, null) : C("div", null, null)), x;
    }), I = A(() => e.touch === !1 ? e.touch : {
      ...{
        left: () => {
          u.value ? y() : p();
        },
        right: () => {
          u.value ? p() : y();
        },
        start: (V) => {
          let {
            originalEvent: w
          } = V;
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
        var x, V;
        return [C("div", {
          class: "v-window__container",
          style: {
            height: m.value
          }
        }, [(x = t.default) == null ? void 0 : x.call(t, {
          group: i
        }), e.showArrows !== !1 && C("div", {
          class: "v-window__controls"
        }, [g.value])]), (V = t.additional) == null ? void 0 : V.call(t, {
          group: i
        })];
      }
    }), [[Ya, I.value]])), {
      group: i
    };
  }
}), gu = j({
  ...mt(Zn(), ["continuous", "nextIcon", "prevIcon", "showArrows", "touch", "mandatory"])
}, "VTabsWindow"), yl = ne()({
  name: "VTabsWindow",
  props: gu(),
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
}), Qn = j({
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
  ...jn()
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
    } = ha();
    if (!a || !l) throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const i = ee(!1), s = A(() => o.value && (a.isReversed.value ? e.reverseTransition !== !1 : e.transition !== !1));
    function u() {
      !i.value || !a || (i.value = !1, a.transitionCount.value > 0 && (a.transitionCount.value -= 1, a.transitionCount.value === 0 && (a.transitionHeight.value = void 0)));
    }
    function r() {
      var f;
      i.value || !a || (i.value = !0, a.transitionCount.value === 0 && (a.transitionHeight.value = ye((f = a.rootRef.value) == null ? void 0 : f.clientHeight)), a.transitionCount.value += 1);
    }
    function c() {
      u();
    }
    function d(f) {
      i.value && Te(() => {
        !s.value || !i.value || !a || (a.transitionHeight.value = ye(f.clientHeight));
      });
    }
    const m = A(() => {
      const f = a.isReversed.value ? e.reverseTransition : e.transition;
      return s.value ? {
        name: typeof f != "string" ? a.transition.value : f,
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
    } = Kn(e, l.isSelected);
    return ie(() => b(pa, {
      transition: m.value,
      disabled: !o.value
    }, {
      default: () => {
        var f;
        return [Ke(C("div", {
          class: fe(["v-window-item", l.selectedClass.value, e.class]),
          style: Ve(e.style)
        }, [v.value && ((f = t.default) == null ? void 0 : f.call(t))]), [[Bt, l.isSelected.value]])];
      }
    })), {
      groupItem: l
    };
  }
}), yu = j({
  ...Qn()
}, "VTabsWindowItem"), ua = ne()({
  name: "VTabsWindowItem",
  props: yu(),
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
function hu(e) {
  let {
    selectedElement: n,
    containerElement: t,
    isRtl: a,
    isHorizontal: l
  } = e;
  const o = Dt(l, t), i = Jn(l, a, t), s = Dt(l, n), u = eo(l, n), r = s * 0.4;
  return i > u ? u - r : i + o < u + s ? u - o + s + r : i;
}
function bu(e) {
  let {
    selectedElement: n,
    containerElement: t,
    isHorizontal: a
  } = e;
  const l = Dt(a, t), o = eo(a, n), i = Dt(a, n);
  return o - l / 2 + i / 2;
}
function Ql(e, n) {
  const t = e ? "scrollWidth" : "scrollHeight";
  return (n == null ? void 0 : n[t]) || 0;
}
function pu(e, n) {
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
function Dt(e, n) {
  const t = e ? "offsetWidth" : "offsetHeight";
  return (n == null ? void 0 : n[t]) || 0;
}
function eo(e, n) {
  const t = e ? "offsetLeft" : "offsetTop";
  return (n == null ? void 0 : n[t]) || 0;
}
const to = Symbol.for("vuetify:v-slide-group"), hl = j({
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
  ...je(),
  ...fn({
    selectedClass: "v-slide-group-item--active"
  })
}, "VSlideGroup"), Lt = ne()({
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
    } = ft(e), i = nl(e, e.symbol), s = ee(!1), u = ee(0), r = ee(0), c = ee(0), d = A(() => e.direction === "horizontal"), {
      resizeRef: m,
      contentRect: v
    } = Vt(), {
      resizeRef: f,
      contentRect: k
    } = Vt(), y = Xi(), p = A(() => ({
      container: m.el,
      duration: 200,
      easing: "easeOutQuart"
    })), g = A(() => i.selected.value.length ? i.items.value.findIndex(($) => $.id === i.selected.value[0]) : -1), I = A(() => i.selected.value.length ? i.items.value.findIndex(($) => $.id === i.selected.value[i.selected.value.length - 1]) : -1);
    if (ze) {
      let $ = -1;
      Q(() => [i.selected.value, v.value, k.value, d.value], () => {
        cancelAnimationFrame($), $ = requestAnimationFrame(() => {
          if (v.value && k.value) {
            const O = d.value ? "width" : "height";
            r.value = v.value[O], c.value = k.value[O], s.value = r.value + 1 < c.value;
          }
          if (g.value >= 0 && f.el) {
            const O = f.el.children[I.value];
            V(O, e.centerActive);
          }
        });
      });
    }
    const x = ee(!1);
    function V($, O) {
      let U = 0;
      O ? U = bu({
        containerElement: m.el,
        isHorizontal: d.value,
        selectedElement: $
      }) : U = hu({
        containerElement: m.el,
        isHorizontal: d.value,
        isRtl: a.value,
        selectedElement: $
      }), w(U);
    }
    function w($) {
      if (!ze || !m.el) return;
      const O = Dt(d.value, m.el), U = Jn(d.value, a.value, m.el);
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
      if (x.value = !0, !(!s.value || !f.el)) {
        for (const O of $.composedPath())
          for (const U of f.el.children)
            if (U === O) {
              V(U);
              return;
            }
      }
    }
    function _($) {
      x.value = !1;
    }
    let T = !1;
    function E($) {
      var O;
      !T && !x.value && !($.relatedTarget && ((O = f.el) != null && O.contains($.relatedTarget))) && W(), T = !1;
    }
    function M() {
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
    function K($) {
      const O = d.value && a.value ? -1 : 1, U = ($ === "prev" ? -O : O) * r.value;
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
    }), ue = A(() => Math.abs(u.value) > 1), B = A(() => {
      if (!m.value) return !1;
      const $ = Ql(d.value, m.el), O = pu(d.value, m.el);
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
          onMousedown: M,
          onClick: () => ue.value && K("prev")
        }, [(($ = t.prev) == null ? void 0 : $.call(t, te.value)) ?? b(Ol, null, {
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
          onFocusout: _,
          onKeydown: F
        }, [(O = t.default) == null ? void 0 : O.call(t, te.value)])]), ae.value && C("div", {
          key: "next",
          class: fe(["v-slide-group__next", {
            "v-slide-group__next--disabled": !B.value
          }]),
          onMousedown: M,
          onClick: () => B.value && K("next")
        }, [((U = t.next) == null ? void 0 : U.call(t, te.value)) ?? b(Ol, null, {
          default: () => [b(ke, {
            icon: a.value ? e.prevIcon : e.nextIcon
          }, null)]
        })])];
      }
    })), {
      selected: i.selected,
      scrollTo: K,
      scrollOffset: u,
      focus: W,
      hasPrev: ue,
      hasNext: B
    };
  }
});
function wu(e) {
  return e ? e.map((n) => zi(n) ? n : {
    text: n,
    value: n
  }) : [];
}
const xu = j({
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
  ...je()
}, "VTabs"), Su = ne()({
  name: "VTabs",
  props: xu(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, n) {
    let {
      attrs: t,
      slots: a
    } = n;
    const l = we(e, "modelValue"), o = A(() => wu(e.items)), {
      densityClasses: i
    } = Et(e), {
      backgroundColorClasses: s,
      backgroundColorStyles: u
    } = st(() => e.bgColor), {
      scopeId: r
    } = Yt();
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
      const c = Lt.filterProps(e), d = !!(a.window || e.items.length > 0);
      return C(J, null, [b(Lt, L(c, {
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
      }, r, t), {
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
        "onUpdate:modelValue": (m) => l.value = m,
        key: "tabs-window"
      }, r), {
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
                var k;
                return (k = a[`item.${v.value}`]) == null ? void 0 : k.call(a, {
                  item: v
                });
              }
            });
          }), (m = a.window) == null ? void 0 : m.call(a)];
        }
      })]);
    }), {};
  }
}), ku = {
  class: "nav-home",
  href: "/"
};
var an;
const Vu = /* @__PURE__ */ Le({
  __name: "OxApp",
  props: {
    apiUrl: {},
    logo: {},
    dataEl: { default: (an = document.body.dataset) == null ? void 0 : an.appData },
    models: {},
    data: {}
  },
  setup(e) {
    const n = pt(), t = ht(n, "panels."), a = e, l = Qe({ drawer: !0 }), o = bi(a), i = pi();
    return Ze(() => {
      i.panel = o.data.panel;
    }), Q(() => [o.state.state, o.state.data], () => {
      o.showState = !0;
    }), si((s, u, r) => {
      o.state.error(`${s}`);
    }), (s, u) => (D(), Y(As, null, {
      default: R(() => [
        b(iu, {
          modelValue: S(o).showState,
          "onUpdate:modelValue": u[0] || (u[0] = (r) => S(o).showState = r),
          color: S(o).state.color,
          "multi-line": ""
        }, {
          default: R(() => [
            Pe(Me(S(o).state.toString()), 1)
          ]),
          _: 1
        }, 8, ["modelValue", "color"]),
        b($s, { color: "primary" }, {
          prepend: R(() => [
            S(n)["nav-start"] || S(n)["nav-end"] ? (D(), Y(Hn, {
              key: 0,
              icon: "mdi-apps",
              title: S(oe)("nav.panels"),
              "aria-label": S(oe)("nav.panels"),
              onClick: u[1] || (u[1] = Ie((r) => l.drawer = !l.drawer, ["stop"]))
            }, null, 8, ["title", "aria-label"])) : de("", !0)
          ]),
          default: R(() => [
            b(jl, { id: "app-bar-sheet-title" }),
            b(jl, { id: "app-bar-title" }, {
              default: R(() => [
                G(s.$slots, "title")
              ]),
              _: 3
            }),
            G(s.$slots, "app-bar-left"),
            u[5] || (u[5] = C("div", {
              id: "app-bar-right",
              class: "mr-3"
            }, null, -1)),
            G(s.$slots, "app-bar-right")
          ]),
          _: 3,
          __: [5]
        }),
        S(n)["nav-start"] || S(n)["nav-end"] ? (D(), Y(S(Ps), {
          key: 0,
          drawer: l.drawer,
          "onUpdate:drawer": u[3] || (u[3] = (r) => l.drawer = r),
          items: S(o).data.nav
        }, kt({
          prepend: R(() => [
            C("a", ku, [
              s.logo ? (D(), Y(ba, {
                key: 0,
                src: s.logo,
                class: "logo"
              }, null, 8, ["src"])) : de("", !0)
            ]),
            G(s.$slots, "nav-start", { context: S(o) })
          ]),
          _: 2
        }, [
          S(n)["nav-end"] ? {
            name: "append",
            fn: R(() => [
              b(ut, {
                opened: l.opened,
                "onUpdate:opened": u[2] || (u[2] = (r) => l.opened = r)
              }, {
                default: R(() => [
                  G(s.$slots, "nav-end", { context: S(o) })
                ]),
                _: 3
              }, 8, ["opened"])
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["drawer", "items"])) : de("", !0),
        b(Rs, null, {
          default: R(() => [
            G(s.$slots, "main", {}, () => [
              b(yl, {
                modelValue: S(i).panel,
                "onUpdate:modelValue": u[4] || (u[4] = (r) => S(i).panel = r)
              }, {
                default: R((r) => [
                  G(s.$slots, "default", L(r, { context: S(o) })),
                  (D(!0), be(J, null, Fe(S(t), (c, d) => (D(), Y(ua, {
                    key: d,
                    value: c
                  }, {
                    default: R(() => [
                      G(s.$slots, d, L({ ref_for: !0 }, r, { context: S(o) }))
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
}), Cu = j({
  text: String,
  onClick: Xe(),
  ...Se(),
  ...Ne()
}, "VLabel"), ao = ne()({
  name: "VLabel",
  props: Cu(),
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
}), lo = Symbol.for("vuetify:selection-control-group"), no = j({
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
  ...Ne()
}, "SelectionControlGroup"), Pu = j({
  ...no({
    defaultsTarget: "VSelectionControl"
  })
}, "VSelectionControlGroup");
ne()({
  name: "VSelectionControlGroup",
  props: Pu(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = we(e, "modelValue"), l = ct(), o = H(() => e.id || `v-selection-control-group-${l}`), i = H(() => e.name || o.value), s = /* @__PURE__ */ new Set();
    return We(lo, {
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
const oo = j({
  label: String,
  baseColor: String,
  trueValue: null,
  falseValue: null,
  value: null,
  ...Se(),
  ...no()
}, "VSelectionControl");
function Iu(e) {
  const n = ve(lo, void 0), {
    densityClasses: t
  } = Et(e), a = we(e, "modelValue"), l = A(() => e.trueValue !== void 0 ? e.trueValue : e.value !== void 0 ? e.value : !0), o = A(() => e.falseValue !== void 0 ? e.falseValue : !1), i = A(() => !!e.multiple || e.multiple == null && Array.isArray(a.value)), s = A({
    get() {
      const v = n ? n.modelValue.value : a.value;
      return i.value ? He(v).some((f) => e.valueComparator(f, l.value)) : e.valueComparator(v, l.value);
    },
    set(v) {
      if (e.readonly) return;
      const f = v ? l.value : o.value;
      let k = f;
      i.value && (k = v ? [...He(a.value), f] : He(a.value).filter((y) => !e.valueComparator(y, l.value))), n ? n.modelValue.value = k : a.value = k;
    }
  }), {
    textColorClasses: u,
    textColorStyles: r
  } = Kt(() => {
    if (!(e.error || e.disabled))
      return s.value ? e.color : e.baseColor;
  }), {
    backgroundColorClasses: c,
    backgroundColorStyles: d
  } = st(() => s.value && !e.error && !e.disabled ? e.color : e.baseColor), m = A(() => s.value ? e.trueIcon : e.falseIcon);
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
      textColorStyles: r,
      backgroundColorClasses: c,
      backgroundColorStyles: d,
      trueValue: m
    } = Iu(e), v = ct(), f = ee(!1), k = ee(!1), y = q(), p = H(() => e.id || `input-${v}`), g = H(() => !e.disabled && !e.readonly);
    l == null || l.onForceUpdate(() => {
      y.value && (y.value.checked = s.value);
    });
    function I(P) {
      g.value && (f.value = !0, It(P.target, ":focus-visible") !== !1 && (k.value = !0));
    }
    function x() {
      f.value = !1, k.value = !1;
    }
    function V(P) {
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
      var E, M;
      const P = a.label ? a.label({
        label: e.label,
        props: {
          for: p.value
        }
      }) : e.label, [h, _] = xa(t), T = C("input", L({
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
      }, _), null);
      return C("div", L({
        class: ["v-selection-control", {
          "v-selection-control--dirty": s.value,
          "v-selection-control--disabled": e.disabled,
          "v-selection-control--error": e.error,
          "v-selection-control--focused": f.value,
          "v-selection-control--focus-visible": k.value,
          "v-selection-control--inline": e.inline
        }, o.value, e.class]
      }, h, {
        style: e.style
      }), [C("div", {
        class: fe(["v-selection-control__wrapper", u.value]),
        style: Ve(r.value)
      }, [(E = a.default) == null ? void 0 : E.call(a, {
        backgroundColorClasses: c,
        backgroundColorStyles: d
      }), Ke(C("div", {
        class: fe(["v-selection-control__input"])
      }, [((M = a.input) == null ? void 0 : M.call(a, {
        model: s,
        textColorClasses: u,
        textColorStyles: r,
        backgroundColorClasses: c,
        backgroundColorStyles: d,
        inputNode: T,
        icon: i.value,
        props: {
          onFocus: I,
          onBlur: x,
          id: p.value
        }
      })) ?? C(J, null, [i.value && b(ke, {
        key: "icon",
        icon: i.value
      }, null), T])]), [[Ct, e.ripple && [!e.disabled && !e.readonly, null, ["center", "circle"]]]])]), P && b(ao, {
        for: p.value,
        onClick: V
      }, {
        default: () => [P]
      })]);
    }), {
      isFocused: f,
      input: y
    };
  }
}), io = j({
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
    function r(d) {
      d.key !== "Enter" && d.key !== " " || (d.preventDefault(), d.stopPropagation(), dl(u, new PointerEvent("click", d)));
    }
    const c = u && s ? n(`$vuetify.input.${s}`, e.label ?? "") : void 0;
    return b(ke, L({
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
const Au = j({
  active: Boolean,
  color: String,
  messages: {
    type: [Array, String],
    default: () => []
  },
  ...Se(),
  ...Ut({
    transition: {
      component: mn,
      leaveAbsolute: !0,
      group: !0
    }
  })
}, "VMessages"), Tu = ne()({
  name: "VMessages",
  props: Au(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = A(() => He(e.messages)), {
      textColorClasses: l,
      textColorStyles: o
    } = Kt(() => e.color);
    return ie(() => b(pa, {
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
}), uo = j({
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
const ro = Symbol.for("vuetify:form"), Bu = j({
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
    const c = [];
    let d = !0;
    i.value = [], l.value = !0;
    for (const m of o.value) {
      const v = await m.validate();
      if (v.length > 0 && (d = !1, c.push({
        id: m.id,
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
  return Q(o, () => {
    let c = 0, d = 0;
    const m = [];
    for (const v of o.value)
      v.isValid === !1 ? (d++, m.push({
        id: v.id,
        errorMessages: v.errorMessages
      })) : v.isValid === !0 && c++;
    i.value = m, n.value = d > 0 ? !1 : c === o.value.length ? !0 : null;
  }, {
    deep: !0,
    flush: "post"
  }), We(ro, {
    register: (c) => {
      let {
        id: d,
        vm: m,
        validate: v,
        reset: f,
        resetValidation: k
      } = c;
      o.value.some((y) => y.id === d) && kn(`Duplicate input name "${d}"`), o.value.push({
        id: d,
        validate: v,
        reset: f,
        resetValidation: k,
        vm: ui(m),
        isValid: null,
        errorMessages: []
      });
    },
    unregister: (c) => {
      o.value = o.value.filter((d) => d.id !== c);
    },
    update: (c, d, m) => {
      const v = o.value.find((f) => f.id === c);
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
    resetValidation: r
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
const Eu = Symbol.for("vuetify:rules");
function $u(e) {
  const n = ve(Eu, null);
  return n ? n(e) : H(e);
}
const Ou = j({
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
function Fu(e) {
  let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Pn(), t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ct();
  const a = we(e, "modelValue"), l = A(() => e.validationValue === void 0 ? a.value : e.validationValue), o = bl(e), i = $u(() => e.rules), s = q([]), u = ee(!0), r = A(() => !!(He(a.value === "" ? null : a.value).length || He(l.value === "" ? null : l.value).length)), c = A(() => {
    var x;
    return (x = e.errorMessages) != null && x.length ? He(e.errorMessages).concat(s.value).slice(0, Math.max(0, Number(e.maxErrors))) : s.value;
  }), d = A(() => {
    var w;
    let x = (e.validateOn ?? ((w = o.validateOn) == null ? void 0 : w.value)) || "input";
    x === "lazy" && (x = "input lazy"), x === "eager" && (x = "input eager");
    const V = new Set((x == null ? void 0 : x.split(" ")) ?? []);
    return {
      input: V.has("input"),
      blur: V.has("blur") || V.has("input") || V.has("invalid-input"),
      invalidInput: V.has("invalid-input"),
      lazy: V.has("lazy"),
      eager: V.has("eager")
    };
  }), m = A(() => {
    var x;
    return e.error || (x = e.errorMessages) != null && x.length ? !1 : e.rules.length ? u.value ? s.value.length || d.value.lazy ? null : !0 : !s.value.length : !0;
  }), v = ee(!1), f = A(() => ({
    [`${n}--error`]: m.value === !1,
    [`${n}--dirty`]: r.value,
    [`${n}--disabled`]: o.isDisabled.value,
    [`${n}--readonly`]: o.isReadonly.value
  })), k = lt("validation"), y = A(() => e.name ?? S(t));
  ri(() => {
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
    d.value.lazy || await I(!d.value.eager), (x = o.update) == null || x.call(o, y.value, m.value, c.value);
  }), qe(() => d.value.input || d.value.invalidInput && m.value === !1, () => {
    Q(l, () => {
      if (l.value != null)
        I();
      else if (e.focused) {
        const x = Q(() => e.focused, (V) => {
          V || I(), x();
        });
      }
    });
  }), qe(() => d.value.blur, () => {
    Q(() => e.focused, (x) => {
      x || I();
    });
  }), Q([m, c], () => {
    var x;
    (x = o.update) == null || x.call(o, y.value, m.value, c.value);
  });
  async function p() {
    a.value = null, await Te(), await g();
  }
  async function g() {
    u.value = !0, d.value.lazy ? s.value = [] : await I(!d.value.eager);
  }
  async function I() {
    let x = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    const V = [];
    v.value = !0;
    for (const w of i.value) {
      if (V.length >= Number(e.maxErrors ?? 1))
        break;
      const h = await (typeof w == "function" ? w : () => w)(l.value);
      if (h !== !0) {
        if (h !== !1 && typeof h != "string") {
          console.warn(`${h} is not a valid value. Rule functions must return boolean true or a string.`);
          continue;
        }
        V.push(h || "");
      }
    }
    return s.value = V, v.value = !1, u.value = x, s.value;
  }
  return {
    errorMessages: c,
    isDirty: r,
    isDisabled: o.isDisabled,
    isReadonly: o.isReadonly,
    isPristine: u,
    isValid: m,
    isValidating: v,
    reset: p,
    resetValidation: g,
    validate: I,
    validationClasses: f
  };
}
const ka = j({
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
  ...Wi(Wt(), ["maxWidth", "minWidth", "width"]),
  ...Ne(),
  ...Ou()
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
    } = Et(e), {
      dimensionStyles: i
    } = zt(e), {
      themeClasses: s
    } = Ge(e), {
      rtlClasses: u
    } = nt(), {
      InputIcon: r
    } = so(e), c = ct(), d = A(() => e.id || `input-${c}`), m = A(() => `${d.value}-messages`), {
      errorMessages: v,
      isDirty: f,
      isDisabled: k,
      isReadonly: y,
      isPristine: p,
      isValid: g,
      isValidating: I,
      reset: x,
      resetValidation: V,
      validate: w,
      validationClasses: P
    } = Fu(e, "v-input", d), h = A(() => ({
      id: d,
      messagesId: m,
      isDirty: f,
      isDisabled: k,
      isReadonly: y,
      isPristine: p,
      isValid: g,
      isValidating: I,
      reset: x,
      resetValidation: V,
      validate: w
    })), _ = H(() => e.error || e.disabled ? void 0 : e.focused ? e.color : e.baseColor), T = H(() => {
      if (e.iconColor)
        return e.iconColor === !0 ? _.value : e.iconColor;
    }), E = A(() => {
      var M;
      return (M = e.errorMessages) != null && M.length || !p.value && v.value.length ? v.value : e.hint && (e.persistentHint || e.focused) ? e.hint : e.messages;
    });
    return ie(() => {
      var K, te, ae, ue;
      const M = !!(a.prepend || e.prependIcon), F = !!(a.append || e.appendIcon), z = E.value.length > 0, W = !e.hideDetails || e.hideDetails === "auto" && (z || !!a.details);
      return C("div", {
        class: fe(["v-input", `v-input--${e.direction}`, {
          "v-input--center-affix": e.centerAffix,
          "v-input--focused": e.focused,
          "v-input--glow": e.glow,
          "v-input--hide-spin-buttons": e.hideSpinButtons
        }, o.value, s.value, u.value, P.value, e.class]),
        style: Ve([i.value, e.style])
      }, [M && C("div", {
        key: "prepend",
        class: "v-input__prepend"
      }, [(K = a.prepend) == null ? void 0 : K.call(a, h.value), e.prependIcon && b(r, {
        key: "prepend-icon",
        name: "prepend",
        color: T.value
      }, null)]), a.default && C("div", {
        class: "v-input__control"
      }, [(te = a.default) == null ? void 0 : te.call(a, h.value)]), F && C("div", {
        key: "append",
        class: "v-input__append"
      }, [e.appendIcon && b(r, {
        key: "append-icon",
        name: "append",
        color: T.value
      }, null), (ae = a.append) == null ? void 0 : ae.call(a, h.value)]), W && C("div", {
        id: m.value,
        class: "v-input__details",
        role: "alert",
        "aria-live": "polite"
      }, [b(Tu, {
        active: z,
        messages: E.value
      }, {
        message: a.message
      }), (ue = a.details) == null ? void 0 : ue.call(a, h.value)])]);
    }), {
      reset: x,
      resetValidation: V,
      validate: w,
      isValid: g,
      errorMessages: v
    };
  }
}), Ru = j({
  ...ka(),
  ...mt(io(), ["inline"])
}, "VCheckbox"), Mu = ne()({
  name: "VCheckbox",
  inheritAttrs: !1,
  props: Ru(),
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
      const [r, c] = xa(t), d = At.filterProps(e), m = bt.filterProps(e);
      return b(At, L({
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
            id: f,
            messagesId: k,
            isDisabled: y,
            isReadonly: p,
            isValid: g
          } = v;
          return b(bt, L(m, {
            id: f.value,
            "aria-describedby": k.value,
            disabled: y.value,
            readonly: p.value
          }, c, {
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
}), co = Symbol.for("vuetify:v-chip-group"), Du = j({
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
  ...je(),
  ...Ne(),
  ...jt({
    variant: "tonal"
  })
}, "VChipGroup");
ne()({
  name: "VChipGroup",
  props: Du(),
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
      const r = Lt.filterProps(e);
      return b(Lt, L(r, {
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
const Lu = j({
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
  ...Ht(),
  ...Se(),
  ...vt(),
  ...Nt(),
  ...ol(),
  ...wt(),
  ...bn(),
  ...hn(),
  ...je({
    tag: "span"
  }),
  ...Ne(),
  ...jt({
    variant: "tonal"
  })
}, "VChip"), pl = ne()({
  name: "VChip",
  directives: {
    vRipple: Ct
  },
  props: Lu(),
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
    } = ga(e), {
      densityClasses: s
    } = Et(e), {
      elevationClasses: u
    } = ya(e), {
      roundedClasses: r
    } = _t(e), {
      sizeClasses: c
    } = _i(e), {
      themeClasses: d
    } = Ge(e), m = we(e, "modelValue"), v = il(e, co, !1), f = gn(e, t), k = H(() => e.link !== !1 && f.isLink.value), y = A(() => !e.disabled && e.link !== !1 && (!!v || e.link || f.isClickable.value)), p = H(() => ({
      "aria-label": o(e.closeLabel),
      disabled: e.disabled,
      onClick(P) {
        P.preventDefault(), P.stopPropagation(), m.value = !1, a("click:close", P);
      }
    })), {
      colorClasses: g,
      colorStyles: I,
      variantClasses: x
    } = al(() => ({
      color: !v || v.isSelected.value ? e.color ?? e.baseColor : e.baseColor,
      variant: e.variant
    }));
    function V(P) {
      var h;
      a("click", P), y.value && ((h = f.navigate) == null || h.call(f, P), v == null || v.toggle());
    }
    function w(P) {
      (P.key === "Enter" || P.key === " ") && (P.preventDefault(), V(P));
    }
    return () => {
      var z;
      const P = f.isLink.value ? "a" : e.tag, h = !!(e.appendIcon || e.appendAvatar), _ = !!(h || l.append), T = !!(l.close || e.closable), E = !!(l.filter || e.filter) && v, M = !!(e.prependIcon || e.prependAvatar), F = !!(M || l.prepend);
      return m.value && Ke(b(P, L({
        class: ["v-chip", {
          "v-chip--disabled": e.disabled,
          "v-chip--label": e.label,
          "v-chip--link": y.value,
          "v-chip--filter": E,
          "v-chip--pill": e.pill,
          [`${e.activeClass}`]: e.activeClass && ((z = f.isActive) == null ? void 0 : z.value)
        }, d.value, i.value, g.value, s.value, u.value, r.value, c.value, x.value, v == null ? void 0 : v.selectedClass.value, e.class],
        style: [I.value, e.style],
        disabled: e.disabled || void 0,
        draggable: e.draggable,
        tabindex: y.value ? 0 : void 0,
        onClick: V,
        onKeydown: y.value && !k.value && w
      }, f.linkProps), {
        default: () => {
          var W;
          return [ll(y.value, "v-chip"), E && b(yn, {
            key: "filter"
          }, {
            default: () => [Ke(C("div", {
              class: "v-chip__filter"
            }, [l.filter ? b(Re, {
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
            }, null)]), [[Bt, v.isSelected.value]])]
          }), F && C("div", {
            key: "prepend",
            class: "v-chip__prepend"
          }, [l.prepend ? b(Re, {
            key: "prepend-defaults",
            disabled: !M,
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
          })) ?? Me(e.text)]), _ && C("div", {
            key: "append",
            class: "v-chip__append"
          }, [l.append ? b(Re, {
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
          }, null)])]), T && C("button", L({
            key: "close",
            class: "v-chip__close",
            type: "button",
            "data-testid": "close-chip"
          }, p.value), [l.close ? b(Re, {
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
}), Nu = j({
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
  props: Nu(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = we(e, "modelValue"), {
      scopeId: l
    } = Yt(), {
      isRtl: o
    } = nt(), i = ct(), s = H(() => e.id || `v-menu-${i}`), u = q(), r = ve(Ka, null), c = ee(/* @__PURE__ */ new Set());
    We(Ka, {
      register() {
        c.value.add(i);
      },
      unregister() {
        c.value.delete(i);
      },
      closeParents(y) {
        setTimeout(() => {
          var p;
          !c.value.size && !e.persistent && (y == null || (p = u.value) != null && p.contentEl && !Ui(y, u.value.contentEl)) && (a.value = !1, r == null || r.closeParents());
        }, 40);
      }
    }), dt(() => {
      r == null || r.unregister(), document.removeEventListener("focusin", d);
    }), ln(() => a.value = !1);
    async function d(y) {
      var I, x, V;
      const p = y.relatedTarget, g = y.target;
      await Te(), a.value && p !== g && ((I = u.value) != null && I.contentEl) && // We're the topmost menu
      ((x = u.value) != null && x.globalTop) && // It isn't the document or the menu body
      ![document, u.value.contentEl].includes(g) && // It isn't inside the menu body
      !u.value.contentEl.contains(g) && ((V = za(u.value.contentEl)[0]) == null || V.focus());
    }
    Q(a, (y) => {
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
      var p, g, I, x, V;
      if (!e.disabled)
        if (y.key === "Tab" || y.key === "Enter" && !e.closeOnContentClick) {
          if (y.key === "Enter" && (y.target instanceof HTMLTextAreaElement || y.target instanceof HTMLInputElement && y.target.closest("form"))) return;
          y.key === "Enter" && y.preventDefault(), ji(za((p = u.value) == null ? void 0 : p.contentEl, !1), y.shiftKey ? "prev" : "next", (P) => P.tabIndex >= 0) || (a.value = !1, (I = (g = u.value) == null ? void 0 : g.activatorEl) == null || I.focus());
        } else e.submenu && y.key === (o.value ? "ArrowRight" : "ArrowLeft") && (a.value = !1, (V = (x = u.value) == null ? void 0 : x.activatorEl) == null || V.focus());
    }
    function f(y) {
      var g;
      if (e.disabled) return;
      const p = (g = u.value) == null ? void 0 : g.contentEl;
      p && a.value ? y.key === "ArrowDown" ? (y.preventDefault(), y.stopImmediatePropagation(), Ta(p, "next")) : y.key === "ArrowUp" ? (y.preventDefault(), y.stopImmediatePropagation(), Ta(p, "prev")) : e.submenu && (y.key === (o.value ? "ArrowRight" : "ArrowLeft") ? a.value = !1 : y.key === (o.value ? "ArrowLeft" : "ArrowRight") && (y.preventDefault(), Ta(p, "first"))) : (e.submenu ? y.key === (o.value ? "ArrowLeft" : "ArrowRight") : ["ArrowDown", "ArrowUp"].includes(y.key)) && (a.value = !0, y.preventDefault(), setTimeout(() => setTimeout(() => f(y))));
    }
    const k = A(() => L({
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
        activatorProps: k.value,
        location: e.location ?? (e.submenu ? "end" : "bottom"),
        "onClick:outside": m,
        onKeydown: v
      }, l), {
        activator: t.activator,
        default: function() {
          for (var p = arguments.length, g = new Array(p), I = 0; I < p; I++)
            g[I] = arguments[I];
          return b(Re, {
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
      ΨopenChildren: c
    }, u);
  }
}), Hu = j({
  active: Boolean,
  disabled: Boolean,
  max: [Number, String],
  value: {
    type: [Number, String],
    default: 0
  },
  ...Se(),
  ...Ut({
    transition: {
      component: mn
    }
  })
}, "VCounter"), vo = ne()({
  name: "VCounter",
  functional: !0,
  props: Hu(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = H(() => e.max ? `${e.value} / ${e.max}` : String(e.value));
    return ie(() => b(pa, {
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
      }) : a.value]), [[Bt, e.active]])]
    })), {};
  }
}), zu = j({
  floating: Boolean,
  ...Se()
}, "VFieldLabel"), Qt = ne()({
  name: "VFieldLabel",
  props: zu(),
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
}), Wu = ["underlined", "outlined", "filled", "solo", "solo-inverted", "solo-filled", "plain"], xl = j({
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
    validator: (e) => Wu.includes(e)
  },
  "onClick:clear": Xe(),
  "onClick:appendInner": Xe(),
  "onClick:prependInner": Xe(),
  ...Se(),
  ...rl(),
  ...wt(),
  ...Ne()
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
    } = Ge(e), {
      loaderClasses: i
    } = sl(e), {
      focusClasses: s,
      isFocused: u,
      focus: r,
      blur: c
    } = Sa(e), {
      InputIcon: d
    } = so(e), {
      roundedClasses: m
    } = _t(e), {
      rtlClasses: v
    } = nt(), f = H(() => e.dirty || e.active), k = H(() => !!(e.label || l.label)), y = H(() => !e.singleLine && k.value), p = ct(), g = A(() => e.id || `input-${p}`), I = H(() => `${g.value}-messages`), x = q(), V = q(), w = q(), P = A(() => ["plain", "underlined"].includes(e.variant)), h = A(() => e.error || e.disabled ? void 0 : f.value && u.value ? e.color : e.baseColor), _ = A(() => {
      if (!(!e.iconColor || e.glow && !u.value))
        return e.iconColor === !0 ? h.value : e.iconColor;
    }), {
      backgroundColorClasses: T,
      backgroundColorStyles: E
    } = st(() => e.bgColor), {
      textColorClasses: M,
      textColorStyles: F
    } = Kt(h);
    Q(f, (K) => {
      if (y.value) {
        const te = x.value.$el, ae = V.value.$el;
        requestAnimationFrame(() => {
          const ue = vl(te), B = ae.getBoundingClientRect(), $ = B.x - ue.x, O = B.y - ue.y - (ue.height / 2 - B.height / 2), U = B.width / 0.75, he = Math.abs(U - ue.width) > 1 ? {
            maxWidth: ye(U)
          } : void 0, le = getComputedStyle(te), se = getComputedStyle(ae), X = parseFloat(le.transitionDuration) * 1e3 || 150, re = parseFloat(se.getPropertyValue("--v-field-label-scale")), me = se.getPropertyValue("color");
          te.style.visibility = "visible", ae.style.visibility = "hidden", yt(te, {
            transform: `translate(${$}px, ${O}px) scale(${re})`,
            color: me,
            ...he
          }, {
            duration: X,
            easing: Ft,
            direction: K ? "normal" : "reverse"
          }).finished.then(() => {
            te.style.removeProperty("visibility"), ae.style.removeProperty("visibility");
          });
        });
      }
    }, {
      flush: "post"
    });
    const z = A(() => ({
      isActive: f,
      isFocused: u,
      controlRef: w,
      blur: c,
      focus: r
    }));
    function W(K) {
      K.target !== document.activeElement && K.preventDefault();
    }
    return ie(() => {
      var $, O, U;
      const K = e.variant === "outlined", te = !!(l["prepend-inner"] || e.prependInnerIcon), ae = !!(e.clearable || l.clear) && !e.disabled, ue = !!(l["append-inner"] || e.appendInnerIcon || ae), B = () => l.label ? l.label({
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
        }, o.value, T.value, s.value, i.value, m.value, v.value, e.class],
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
        color: _.value
      }, null), ($ = l["prepend-inner"]) == null ? void 0 : $.call(l, z.value)]), C("div", {
        class: "v-field__field",
        "data-no-activator": ""
      }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(e.variant) && y.value && b(Qt, {
        key: "floating-label",
        ref: V,
        class: fe([M.value]),
        floating: !0,
        for: g.value,
        style: Ve(F.value)
      }, {
        default: () => [B()]
      }), k.value && b(Qt, {
        key: "label",
        ref: x,
        for: g.value
      }, {
        default: () => [B()]
      }), ((O = l.default) == null ? void 0 : O.call(l, {
        ...z.value,
        props: {
          id: g.value,
          class: "v-field__input",
          "aria-describedby": I.value
        },
        focus: r,
        blur: c
      })) ?? C("div", {
        id: g.value,
        class: "v-field__input",
        "aria-describedby": I.value
      }, null)]), ae && b(yn, {
        key: "clear"
      }, {
        default: () => [Ke(C("div", {
          class: "v-field__clearable",
          onMousedown: (he) => {
            he.preventDefault(), he.stopPropagation();
          }
        }, [b(Re, {
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
          }) : b(d, {
            name: "clear",
            onFocus: r,
            onBlur: c,
            tabindex: -1
          }, null)]
        })]), [[Bt, e.dirty]])]
      }), ue && C("div", {
        key: "append",
        class: "v-field__append-inner"
      }, [(U = l["append-inner"]) == null ? void 0 : U.call(l, z.value), e.appendInnerIcon && b(d, {
        key: "append-icon",
        name: "appendInner",
        color: _.value
      }, null)]), C("div", {
        class: fe(["v-field__outline", M.value]),
        style: Ve(F.value)
      }, [K && C(J, null, [C("div", {
        class: "v-field__outline__start"
      }, null), y.value && C("div", {
        class: "v-field__outline__notch"
      }, [b(Qt, {
        ref: V,
        floating: !0,
        for: g.value
      }, {
        default: () => [B()]
      })]), C("div", {
        class: "v-field__outline__end"
      }, null)]), P.value && y.value && b(Qt, {
        ref: V,
        floating: !0,
        for: g.value
      }, {
        default: () => [B()]
      })])]);
    }), {
      controlRef: w,
      fieldIconColor: _
    };
  }
}), Uu = ["color", "file", "time", "date", "datetime-local", "week", "month"], Sl = j({
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
    vIntersect: aa
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
    } = Sa(e), r = A(() => typeof e.counterValue == "function" ? e.counterValue(o.value) : typeof e.counterValue == "number" ? e.counterValue : (o.value ?? "").toString().length), c = A(() => {
      if (t.maxlength) return t.maxlength;
      if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string"))
        return e.counter;
    }), d = A(() => ["plain", "underlined"].includes(e.variant));
    function m(w, P) {
      var h, _;
      !e.autofocus || !w || (_ = (h = P[0].target) == null ? void 0 : h.focus) == null || _.call(h);
    }
    const v = q(), f = q(), k = q(), y = A(() => Uu.includes(e.type) || e.persistentPlaceholder || i.value || e.active);
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
    function V(w) {
      var h;
      const P = w.target;
      if (o.value = P.value, (h = e.modelModifiers) != null && h.trim && ["text", "search", "password", "tel", "url"].includes(e.type)) {
        const _ = [P.selectionStart, P.selectionEnd];
        Te(() => {
          P.selectionStart = _[0], P.selectionEnd = _[1];
        });
      }
    }
    return ie(() => {
      const w = !!(l.counter || e.counter !== !1 && e.counter != null), P = !!(w || l.details), [h, _] = xa(t), {
        modelValue: T,
        ...E
      } = At.filterProps(e), M = ra.filterProps(e);
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
            isDirty: K,
            isReadonly: te,
            isValid: ae,
            reset: ue
          } = F;
          return b(ra, L({
            ref: f,
            onMousedown: g,
            onClick: I,
            "onClick:clear": (B) => x(B, ue),
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"],
            role: e.role
          }, M, {
            id: z.value,
            active: y.value || K.value,
            dirty: K.value || e.dirty,
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
                ref: k,
                value: o.value,
                onInput: V,
                autofocus: e.autofocus,
                readonly: te.value,
                disabled: W.value,
                name: e.name,
                placeholder: e.placeholder,
                size: 1,
                type: e.type,
                onFocus: p,
                onBlur: u
              }, O, _), null), [[aa, {
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
              }, [l.default(), U]) : ci(U, {
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
            value: r.value,
            max: c.value,
            disabled: e.disabled
          }, l.counter)])]);
        } : void 0
      });
    }), gt({}, v, f, k);
  }
}), ju = j({
  renderless: Boolean,
  ...Se()
}, "VVirtualScrollItem"), Ku = ne()({
  name: "VVirtualScrollItem",
  inheritAttrs: !1,
  props: ju(),
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
}), Gu = -1, Yu = 1, Ma = 100, qu = j({
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
function Xu(e, n) {
  const t = ft(), a = ee(0);
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
    contentRect: m
  } = Vt();
  et(() => {
    d.value = u.value;
  });
  const v = A(() => {
    var B;
    return u.value === document.documentElement ? t.height.value : ((B = m.value) == null ? void 0 : B.height) || parseInt(e.height) || 0;
  }), f = A(() => !!(u.value && r.value && v.value && a.value));
  let k = Array.from({
    length: n.value.length
  }), y = Array.from({
    length: n.value.length
  });
  const p = ee(0);
  let g = -1;
  function I(B) {
    return k[B] || a.value;
  }
  const x = Ki(() => {
    const B = performance.now();
    y[0] = 0;
    const $ = n.value.length;
    for (let O = 1; O <= $ - 1; O++)
      y[O] = (y[O - 1] || 0) + I(O - 1);
    p.value = Math.max(p.value, performance.now() - B);
  }, p), V = Q(f, (B) => {
    B && (V(), c = r.value.offsetTop, x.immediate(), K(), ~g && Te(() => {
      ze && window.requestAnimationFrame(() => {
        ae(g), g = -1;
      });
    }));
  });
  Ue(() => {
    x.clear();
  });
  function w(B, $) {
    const O = k[B], U = a.value;
    a.value = U ? Math.min(a.value, $) : $, (O !== $ || U !== a.value) && (k[B] = $, x());
  }
  function P(B) {
    return B = Je(B, 0, n.value.length - 1), y[B] || 0;
  }
  function h(B) {
    return Zu(y, B);
  }
  let _ = 0, T = 0, E = 0;
  Q(v, (B, $) => {
    $ && (K(), B < $ && requestAnimationFrame(() => {
      T = 0, K();
    }));
  });
  let M = -1;
  function F() {
    if (!u.value || !r.value) return;
    const B = u.value.scrollTop, $ = performance.now();
    $ - E > 500 ? (T = Math.sign(B - _), c = r.value.offsetTop) : T = B - _, _ = B, E = $, window.clearTimeout(M), M = window.setTimeout(z, 500), K();
  }
  function z() {
    !u.value || !r.value || (T = 0, E = 0, window.clearTimeout(M), K());
  }
  let W = -1;
  function K() {
    cancelAnimationFrame(W), W = requestAnimationFrame(te);
  }
  function te() {
    if (!u.value || !v.value) return;
    const B = _ - c, $ = Math.sign(T), O = Math.max(0, B - Ma), U = Je(h(O), 0, n.value.length), he = B + v.value + Ma, le = Je(h(he) + 1, U + 1, n.value.length);
    if (
      // Only update the side we're scrolling towards,
      // the other side will be updated incidentally
      ($ !== Gu || U < l.value) && ($ !== Yu || le > o.value)
    ) {
      const se = P(l.value) - P(U), X = P(le) - P(o.value);
      Math.max(se, X) > Ma ? (l.value = U, o.value = le) : (U <= 0 && (l.value = U), le >= n.value.length && (o.value = le));
    }
    i.value = P(l.value), s.value = P(n.value.length) - P(o.value);
  }
  function ae(B) {
    const $ = P(B);
    !u.value || B && !$ ? g = B : u.value.scrollTop = $;
  }
  const ue = A(() => n.value.slice(l.value, o.value).map((B, $) => {
    const O = $ + l.value;
    return {
      raw: B,
      index: O,
      key: St(B, e.itemKey, O)
    };
  }));
  return Q(n, () => {
    k = Array.from({
      length: n.value.length
    }), y = Array.from({
      length: n.value.length
    }), x.immediate(), K();
  }, {
    deep: 1
  }), {
    calculateVisibleItems: K,
    containerRef: u,
    markerRef: r,
    computedItems: ue,
    paddingTop: i,
    paddingBottom: s,
    scrollToIndex: ae,
    handleScroll: F,
    handleScrollend: z,
    handleItemResize: w
  };
}
function Zu(e, n) {
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
const Qu = j({
  items: {
    type: Array,
    default: () => []
  },
  renderless: Boolean,
  ...qu(),
  ...Se(),
  ...Wt()
}, "VVirtualScroll"), fo = ne()({
  name: "VVirtualScroll",
  props: Qu(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const a = lt("VVirtualScroll"), {
      dimensionStyles: l
    } = zt(e), {
      calculateVisibleItems: o,
      containerRef: i,
      markerRef: s,
      handleScroll: u,
      handleScrollend: r,
      handleItemResize: c,
      scrollToIndex: d,
      paddingTop: m,
      paddingBottom: v,
      computedItems: f
    } = Xu(e, H(() => e.items));
    return qe(() => e.renderless, () => {
      function k() {
        var g, I;
        const p = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1) ? "addEventListener" : "removeEventListener";
        i.value === document.documentElement ? (document[p]("scroll", u, {
          passive: !0
        }), document[p]("scrollend", r)) : ((g = i.value) == null || g[p]("scroll", u, {
          passive: !0
        }), (I = i.value) == null || I[p]("scrollend", r));
      }
      Ze(() => {
        i.value = Bn(a.vnode.el, !0), k(!0);
      }), Ue(k);
    }), ie(() => {
      const k = f.value.map((y) => b(Ku, {
        key: y.key,
        renderless: e.renderless,
        "onUpdate:height": (p) => c(y.index, p)
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
      }, null), k, C("div", {
        class: "v-virtual-scroll__spacer",
        style: {
          paddingBottom: ye(v.value)
        }
      }, null)]) : C("div", {
        ref: i,
        class: fe(["v-virtual-scroll", e.class]),
        onScrollPassive: u,
        onScrollend: r,
        style: Ve([l.value, e.style])
      }, [C("div", {
        ref: s,
        class: "v-virtual-scroll__container",
        style: {
          paddingTop: ye(m.value),
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
    onKeydown: i
  };
}
const go = j({
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
}, "Select"), Ju = j({
  ...go(),
  ...mt(Sl({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...Ut({
    transition: {
      component: Fn
    }
  })
}, "VSelect"), kl = ne()({
  name: "VSelect",
  props: Ju(),
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
      transformOut: r
    } = pn(e), c = we(e, "modelValue", [], (B) => u(B === null ? [null] : He(B)), (B) => {
      const $ = r(B);
      return e.multiple ? $ : $[0] ?? null;
    }), d = A(() => typeof e.counterValue == "function" ? e.counterValue(c.value) : typeof e.counterValue == "number" ? e.counterValue : c.value.length), m = bl(e), v = A(() => c.value.map((B) => B.value)), f = ee(!1);
    let k = "", y = -1, p;
    const g = A(() => e.hideSelected ? s.value.filter((B) => !c.value.some(($) => (e.valueComparator || it)($, B))) : s.value), I = A(() => e.hideNoData && !g.value.length || m.isReadonly.value || m.isDisabled.value), x = we(e, "menu"), V = A({
      get: () => x.value,
      set: (B) => {
        var $;
        x.value && !B && (($ = o.value) != null && $.ΨopenChildren.size) || B && I.value || (x.value = B);
      }
    }), w = H(() => V.value ? e.closeText : e.openText), P = A(() => {
      var B;
      return {
        ...e.menuProps,
        activatorProps: {
          ...((B = e.menuProps) == null ? void 0 : B.activatorProps) || {},
          "aria-haspopup": "listbox"
          // Set aria-haspopup to 'listbox'
        }
      };
    }), h = q(), _ = mo(h, l);
    function T(B) {
      e.openOnClear && (V.value = !0);
    }
    function E() {
      I.value || (V.value = !V.value);
    }
    function M(B) {
      la(B) && F(B);
    }
    function F(B) {
      var me, N, Z;
      if (!B.key || m.isReadonly.value) return;
      ["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(B.key) && B.preventDefault(), ["Enter", "ArrowDown", " "].includes(B.key) && (V.value = !0), ["Escape", "Tab"].includes(B.key) && (V.value = !1), B.key === "Home" ? (me = h.value) == null || me.focus("first") : B.key === "End" && ((N = h.value) == null || N.focus("last"));
      const $ = 1e3;
      if (!la(B)) return;
      const O = performance.now();
      O - p > $ && (k = "", y = -1), k += B.key.toLowerCase(), p = O;
      const U = g.value;
      function he() {
        let ce = le();
        return ce || k.at(-1) === k.at(-2) && (k = k.slice(0, -1), ce = le(), ce) || (y = -1, ce = le(), ce) ? ce : (k = B.key.toLowerCase(), le());
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
      y = re, (Z = h.value) == null || Z.focus(re), e.multiple || (c.value = [X]);
    }
    function z(B) {
      let $ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!B.props.disabled)
        if (e.multiple) {
          const O = c.value.findIndex((he) => (e.valueComparator || it)(he.value, B.value)), U = $ ?? !~O;
          if (~O) {
            const he = U ? [...c.value, B] : [...c.value];
            he.splice(O, 1), c.value = he;
          } else U && (c.value = [...c.value, B]);
        } else {
          const O = $ !== !1;
          c.value = O ? [B] : [], Te(() => {
            V.value = !1;
          });
        }
    }
    function W(B) {
      var $;
      ($ = h.value) != null && $.$el.contains(B.relatedTarget) || (V.value = !1);
    }
    function K() {
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
      if (B == null) c.value = [];
      else if (It(l.value, ":autofill") || It(l.value, ":-webkit-autofill")) {
        const $ = s.value.find((O) => O.title === B);
        $ && z($);
      } else l.value && (l.value.value = "");
    }
    return Q(V, () => {
      if (!e.hideSelected && V.value && c.value.length) {
        const B = g.value.findIndex(($) => c.value.some((O) => (e.valueComparator || it)(O.value, $.value)));
        ze && window.requestAnimationFrame(() => {
          var $;
          B >= 0 && (($ = i.value) == null || $.scrollToIndex(B));
        });
      }
    }), Q(() => e.items, (B, $) => {
      V.value || f.value && !$.length && B.length && (V.value = !0);
    }), ie(() => {
      const B = !!(e.chips || t.chip), $ = !!(!e.hideNoData || g.value.length || t["prepend-item"] || t["append-item"] || t["no-data"]), O = c.value.length > 0, U = rt.filterProps(e), he = O || !f.value && e.label && !e.persistentPlaceholder ? void 0 : e.placeholder;
      return b(rt, L({
        ref: l
      }, U, {
        modelValue: c.value.map((le) => le.props.value).join(", "),
        "onUpdate:modelValue": ue,
        focused: f.value,
        "onUpdate:focused": (le) => f.value = le,
        validationValue: c.externalValue,
        counterValue: d.value,
        dirty: O,
        class: ["v-select", {
          "v-select--active-menu": V.value,
          "v-select--chips": !!e.chips,
          [`v-select--${e.multiple ? "multiple" : "single"}`]: !0,
          "v-select--selected": c.value.length,
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
        default: () => C(J, null, [b(wl, L({
          ref: o,
          modelValue: V.value,
          "onUpdate:modelValue": (le) => V.value = le,
          activator: "parent",
          contentClass: "v-select__content",
          disabled: I.value,
          eager: e.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: e.transition,
          onAfterEnter: K,
          onAfterLeave: te
        }, P.value), {
          default: () => [$ && b(ut, L({
            ref: h,
            selected: v.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: (le) => le.preventDefault(),
            onKeydown: M,
            onFocusin: ae,
            tabindex: "-1",
            "aria-live": "polite",
            "aria-label": `${e.label}-list`,
            color: e.itemColor ?? e.color
          }, _, e.listProps), {
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
                    prepend: (Be) => {
                      let {
                        isSelected: De
                      } = Be;
                      return C(J, null, [e.multiple && !e.hideSelected ? b(bt, {
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
        }), c.value.map((le, se) => {
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
            }, [B ? t.chip ? b(Re, {
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
            }, [le.title, e.multiple && se < c.value.length - 1 && C("span", {
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
    }), gt({
      isFocused: f,
      menu: V,
      select: z
    }, l);
  }
}), er = (e, n, t) => {
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
const yo = j({
  customFilter: Function,
  customKeyFilter: Object,
  filterKeys: [Array, String],
  filterMode: {
    type: String,
    default: "intersection"
  },
  noFilter: Boolean
}, "filter");
function tr(e, n, t) {
  var s;
  const a = [], l = (t == null ? void 0 : t.default) ?? er, o = t != null && t.filterKeys ? He(t.filterKeys) : !1, i = Object.keys((t == null ? void 0 : t.customKeyFilter) ?? {}).length;
  if (!(e != null && e.length)) return a;
  e: for (let u = 0; u < e.length; u++) {
    const [r, c = r] = He(e[u]), d = {}, m = {};
    let v = -1;
    if ((n || i > 0) && !(t != null && t.noFilter)) {
      if (typeof r == "object") {
        const y = o || Object.keys(c);
        for (const p of y) {
          const g = St(c, p), I = (s = t == null ? void 0 : t.customKeyFilter) == null ? void 0 : s[p];
          if (v = I ? I(g, n, r) : l(g, n, r), v !== -1 && v !== !1)
            I ? d[p] = Da(v, n) : m[p] = Da(v, n);
          else if ((t == null ? void 0 : t.filterMode) === "every")
            continue e;
        }
      } else
        v = l(r, n, r), v !== -1 && v !== !1 && (m.title = Da(v, n));
      const f = Object.keys(m).length, k = Object.keys(d).length;
      if (!f && !k || (t == null ? void 0 : t.filterMode) === "union" && k !== i && !f || (t == null ? void 0 : t.filterMode) === "intersection" && (k !== i || !f)) continue;
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
  const l = ee([]), o = ee(/* @__PURE__ */ new Map()), i = A(() => a != null && a.transform ? S(n).map((u) => [u, a.transform(u)]) : S(n));
  et(() => {
    const u = typeof t == "function" ? t() : S(t), r = typeof u != "string" && typeof u != "number" ? "" : String(u), c = tr(i.value, r, {
      customKeyFilter: {
        ...e.customKeyFilter,
        ...S(a == null ? void 0 : a.customKeyFilter)
      },
      default: e.customFilter,
      filterKeys: e.filterKeys,
      filterMode: e.filterMode,
      noFilter: e.noFilter
    }), d = S(n), m = [], v = /* @__PURE__ */ new Map();
    c.forEach((f) => {
      let {
        index: k,
        matches: y
      } = f;
      const p = d[k];
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
function ar(e, n, t) {
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
const lr = j({
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
  ...Ut({
    transition: !1
  })
}, "VAutocomplete"), nr = ne()({
  name: "VAutocomplete",
  props: lr(),
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
    } = ot(), l = q(), o = ee(!1), i = ee(!0), s = ee(!1), u = q(), r = q(), c = ee(-1), {
      items: d,
      transformIn: m,
      transformOut: v
    } = pn(e), {
      textColorClasses: f,
      textColorStyles: k
    } = Kt(() => {
      var N;
      return (N = l.value) == null ? void 0 : N.color;
    }), y = we(e, "search", ""), p = we(e, "modelValue", [], (N) => m(N === null ? [null] : He(N)), (N) => {
      const Z = v(N);
      return e.multiple ? Z : Z[0] ?? null;
    }), g = A(() => typeof e.counterValue == "function" ? e.counterValue(p.value) : typeof e.counterValue == "number" ? e.counterValue : p.value.length), I = bl(e), {
      filteredItems: x,
      getMatches: V
    } = ho(e, d, () => i.value ? "" : y.value), w = A(() => e.hideSelected ? x.value.filter((N) => !p.value.some((Z) => Z.value === N.value)) : x.value), P = A(() => !!(e.chips || t.chip)), h = A(() => P.value || !!t.selection), _ = A(() => p.value.map((N) => N.props.value)), T = A(() => {
      var Z;
      return (e.autoSelectFirst === !0 || e.autoSelectFirst === "exact" && y.value === ((Z = w.value[0]) == null ? void 0 : Z.title)) && w.value.length > 0 && !i.value && !s.value;
    }), E = A(() => e.hideNoData && !w.value.length || I.isReadonly.value || I.isDisabled.value), M = we(e, "menu"), F = A({
      get: () => M.value,
      set: (N) => {
        var Z;
        M.value && !N && ((Z = u.value) != null && Z.ΨopenChildren.size) || N && E.value || (M.value = N);
      }
    }), z = A(() => F.value ? e.closeText : e.openText), W = q(), K = mo(W, l);
    function te(N) {
      e.openOnClear && (F.value = !0), y.value = "";
    }
    function ae() {
      E.value || (F.value = !0);
    }
    function ue(N) {
      E.value || (o.value && (N.preventDefault(), N.stopPropagation()), F.value = !F.value);
    }
    function B(N) {
      var Z;
      N.key !== " " && la(N) && ((Z = l.value) == null || Z.focus());
    }
    function $(N) {
      var ge, Ce, Be, De, Ae;
      if (I.isReadonly.value) return;
      const Z = (ge = l.value) == null ? void 0 : ge.selectionStart, ce = p.value.length;
      if (["Enter", "ArrowDown", "ArrowUp"].includes(N.key) && N.preventDefault(), ["Enter", "ArrowDown"].includes(N.key) && (F.value = !0), ["Escape"].includes(N.key) && (F.value = !1), T.value && ["Enter", "Tab"].includes(N.key) && !p.value.some((Oe) => {
        let {
          value: _e
        } = Oe;
        return _e === w.value[0].value;
      }) && me(w.value[0]), N.key === "ArrowDown" && T.value && ((Ce = W.value) == null || Ce.focus("next")), ["Backspace", "Delete"].includes(N.key)) {
        if (!e.multiple && h.value && p.value.length > 0 && !y.value) return me(p.value[0], !1);
        if (~c.value) {
          N.preventDefault();
          const Oe = c.value;
          me(p.value[c.value], !1), c.value = Oe >= ce - 1 ? ce - 2 : Oe;
        } else N.key === "Backspace" && !y.value && (c.value = ce - 1);
        return;
      }
      if (e.multiple)
        if (N.key === "ArrowLeft") {
          if (c.value < 0 && Z && Z > 0) return;
          const Oe = c.value > -1 ? c.value - 1 : ce - 1;
          if (p.value[Oe])
            c.value = Oe;
          else {
            const _e = ((Be = y.value) == null ? void 0 : Be.length) ?? null;
            c.value = -1, (De = l.value) == null || De.setSelectionRange(_e, _e);
          }
        } else if (N.key === "ArrowRight") {
          if (c.value < 0) return;
          const Oe = c.value + 1;
          p.value[Oe] ? c.value = Oe : (c.value = -1, (Ae = l.value) == null || Ae.setSelectionRange(0, 0));
        } else ~c.value && la(N) && (c.value = -1);
    }
    function O(N) {
      if (It(l.value, ":autofill") || It(l.value, ":-webkit-autofill")) {
        const Z = d.value.find((ce) => ce.title === N.target.value);
        Z && me(Z);
      }
    }
    function U() {
      var N;
      e.eager && ((N = r.value) == null || N.calculateVisibleItems());
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
          p.value = ce ? [N] : [], y.value = ce && !h.value ? N.title : "", Te(() => {
            F.value = !1, i.value = !0;
          });
        }
    }
    return Q(o, (N, Z) => {
      var ce;
      N !== Z && (N ? (re.value = !0, y.value = e.multiple || h.value ? "" : String(((ce = p.value.at(-1)) == null ? void 0 : ce.props.title) ?? ""), i.value = !0, Te(() => re.value = !1)) : (!e.multiple && y.value == null && (p.value = []), F.value = !1, (e.multiple || h.value) && (y.value = ""), c.value = -1));
    }), Q(y, (N) => {
      !o.value || re.value || (N && (F.value = !0), i.value = !N);
    }), Q(F, () => {
      if (!e.hideSelected && F.value && p.value.length) {
        const N = w.value.findIndex((Z) => p.value.some((ce) => Z.value === ce.value));
        ze && window.requestAnimationFrame(() => {
          var Z;
          N >= 0 && ((Z = r.value) == null || Z.scrollToIndex(N));
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
          "v-autocomplete--selecting-index": c.value > -1
        }, e.class],
        style: e.style,
        readonly: I.isReadonly.value,
        placeholder: Z ? void 0 : e.placeholder,
        "onClick:clear": te,
        "onMousedown:control": ae,
        onKeydown: $
      }), {
        ...t,
        default: () => C(J, null, [b(wl, L({
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
            selected: _.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: (ge) => ge.preventDefault(),
            onKeydown: B,
            onFocusin: le,
            onFocusout: se,
            tabindex: "-1",
            "aria-live": "polite",
            color: e.itemColor ?? e.color
          }, K, e.listProps), {
            default: () => {
              var ge, Ce, Be;
              return [(ge = t["prepend-item"]) == null ? void 0 : ge.call(t), !w.value.length && !e.hideNoData && (((Ce = t["no-data"]) == null ? void 0 : Ce.call(t)) ?? b(Ye, {
                key: "no-data",
                title: a(e.noDataText)
              }, null)), b(fo, {
                ref: r,
                renderless: !0,
                items: w.value,
                itemKey: "value"
              }, {
                default: (De) => {
                  var Al;
                  let {
                    item: Ae,
                    index: Oe,
                    itemRef: _e
                  } = De;
                  const Il = L(Ae.props, {
                    ref: _e,
                    key: Ae.value,
                    active: T.value && Oe === 0 ? !0 : void 0,
                    onClick: () => me(Ae, null)
                  });
                  return ((Al = t.item) == null ? void 0 : Al.call(t, {
                    item: Ae,
                    index: Oe,
                    props: Il
                  })) ?? b(Ye, L(Il, {
                    role: "option"
                  }), {
                    prepend: (qt) => {
                      let {
                        isSelected: li
                      } = qt;
                      return C(J, null, [e.multiple && !e.hideSelected ? b(bt, {
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
                      var qt;
                      return i.value ? Ae.title : ar("v-autocomplete", Ae.title, (qt = V(Ae)) == null ? void 0 : qt.title);
                    }
                  });
                }
              }), (Be = t["append-item"]) == null ? void 0 : Be.call(t)];
            }
          })]
        }), p.value.map((ge, Ce) => {
          function Be(_e) {
            _e.stopPropagation(), _e.preventDefault(), me(ge, !1);
          }
          const De = {
            "onClick:close": Be,
            onKeydown(_e) {
              _e.key !== "Enter" && _e.key !== " " || (_e.preventDefault(), _e.stopPropagation(), Be(_e));
            },
            onMousedown(_e) {
              _e.preventDefault(), _e.stopPropagation();
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
              class: fe(["v-autocomplete__selection", Ce === c.value && ["v-autocomplete__selection--selected", f.value]]),
              style: Ve(Ce === c.value ? k.value : {})
            }, [P.value ? t.chip ? b(Re, {
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
            }) : b(pl, L({
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
          var De, Ae;
          for (var ge = arguments.length, Ce = new Array(ge), Be = 0; Be < ge; Be++)
            Ce[Be] = arguments[Be];
          return C(J, null, [(De = t["append-inner"]) == null ? void 0 : De.call(t, ...Ce), e.menuIcon ? b(ke, {
            class: "v-autocomplete__menu-icon",
            color: (Ae = l.value) == null ? void 0 : Ae.fieldIconColor,
            icon: e.menuIcon,
            onMousedown: ue,
            onClick: Yi,
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
}), or = ["name", "value"], ir = /* @__PURE__ */ Le({
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
    const t = pt(), a = el(e, "modelValue"), l = q(""), o = e, i = Tt(), s = ve("repos"), { state: u, query: r, fetch: c } = wi(o.repo, s, { save: !1 }), d = Qe([]), m = q([]);
    async function v(g) {
      const I = g && f(g);
      if (I != null && I.length) {
        const x = await c({ id: I });
        d.splice(0, 0, ...x.entities);
      }
      k(g);
    }
    function f(g) {
      if (!Array.isArray(g))
        return d.findIndex((x) => x.id == g) == -1 ? [g] : null;
      const I = new Set(d.map((x) => x.id));
      return g.filter((x) => !I.has(x));
    }
    function k(g) {
      Array.isArray(g) ? m.value = d.filter((I) => g.includes(I.id)) : g ? m.value = [d.find((I) => I.id == g)] : m.value = [];
    }
    let y = null;
    const p = Ba.debounce(async ({ reset: g = !1 } = {}) => {
      if (u.isProcessing)
        return;
      const I = l.value != "<empty string>" && l.value || "";
      if (!g && I == y)
        return;
      y = I;
      const x = { ...o.filters, page_size: 20 };
      x[o.lookup] = I;
      let V = await c({ params: x });
      const w = m.value ? Ba.unionBy(V.entities, m.value, (P) => P.id) : V.entities;
      d.splice(0, d.length, ...w), g || (l.value = I);
    }, 500);
    return Ze(async () => {
      await p(), a.value && await v(a.value);
    }), Q(() => o.filters, (g, I) => {
      Ba.isEqual(La(g), La(I)) || p({ reset: !0 });
    }), Q(l, (g) => {
      g != "<empty string>" && g != y && p({ q: g });
    }), Q(a, (g, I) => {
      g != I && k(g);
    }), n({ value: a, selected: m, load: p, items: d }), (g, I) => (D(), be(J, null, [
      o.name ? (D(), be("input", {
        key: 0,
        type: "hidden",
        name: o.name,
        value: a.value
      }, null, 8, or)) : de("", !0),
      b(S(nr), L(S(i), {
        items: d,
        loading: S(u).isProcessing,
        modelValue: a.value,
        "onUpdate:modelValue": I[0] || (I[0] = (x) => a.value = x),
        search: l.value,
        "onUpdate:search": I[1] || (I[1] = (x) => l.value = x)
      }), kt({ _: 2 }, [
        Fe(S(t), (x, V) => ({
          name: V,
          fn: R((w) => [
            G(g.$slots, V, Ee($e(w)))
          ])
        }))
      ]), 1040, ["items", "loading", "modelValue", "search"])
    ], 64));
  }
}), sr = {
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
      n.value = xi(e.src, t.value);
    }
    return Q(() => e.src, a), a(), () => di(n.value, e);
  }
}, ur = j({
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
}, "VTextarea"), rr = ne()({
  name: "VTextarea",
  directives: {
    vIntersect: aa
  },
  inheritAttrs: !1,
  props: ur(),
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
    } = Sa(e), r = A(() => typeof e.counterValue == "function" ? e.counterValue(o.value) : (o.value || "").toString().length), c = A(() => {
      if (t.maxlength) return t.maxlength;
      if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string"))
        return e.counter;
    });
    function d(E, M) {
      var F, z;
      !e.autofocus || !E || (z = (F = M[0].target) == null ? void 0 : F.focus) == null || z.call(F);
    }
    const m = q(), v = q(), f = ee(""), k = q(), y = A(() => e.persistentPlaceholder || i.value || e.active);
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
    function V(E) {
      var F;
      const M = E.target;
      if (o.value = M.value, (F = e.modelModifiers) != null && F.trim) {
        const z = [M.selectionStart, M.selectionEnd];
        Te(() => {
          M.selectionStart = z[0], M.selectionEnd = z[1];
        });
      }
    }
    const w = q(), P = q(Number(e.rows)), h = A(() => ["plain", "underlined"].includes(e.variant));
    et(() => {
      e.autoGrow || (P.value = Number(e.rows));
    });
    function _() {
      e.autoGrow && Te(() => {
        if (!w.value || !v.value) return;
        const E = getComputedStyle(w.value), M = getComputedStyle(v.value.$el), F = parseFloat(E.getPropertyValue("--v-field-padding-top")) + parseFloat(E.getPropertyValue("--v-input-padding-top")) + parseFloat(E.getPropertyValue("--v-field-padding-bottom")), z = w.value.scrollHeight, W = parseFloat(E.lineHeight), K = Math.max(parseFloat(e.rows) * W + F, parseFloat(M.getPropertyValue("--v-input-control-height"))), te = parseFloat(e.maxRows) * W + F || 1 / 0, ae = Je(z ?? 0, K, te);
        P.value = Math.floor((ae - F) / W), f.value = ye(ae);
      });
    }
    Ze(_), Q(o, _), Q(() => e.rows, _), Q(() => e.maxRows, _), Q(() => e.density, _);
    let T;
    return Q(w, (E) => {
      E ? (T = new ResizeObserver(_), T.observe(w.value)) : T == null || T.disconnect();
    }), dt(() => {
      T == null || T.disconnect();
    }), ie(() => {
      const E = !!(l.counter || e.counter || e.counterValue), M = !!(E || l.details), [F, z] = xa(t), {
        modelValue: W,
        ...K
      } = At.filterProps(e), te = ra.filterProps(e);
      return b(At, L({
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
      }, F, K, {
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
            onMousedown: I,
            "onClick:clear": x,
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
                ref: k,
                class: le,
                value: o.value,
                onInput: V,
                autofocus: e.autofocus,
                readonly: O.value,
                disabled: B.value,
                placeholder: e.placeholder,
                rows: e.rows,
                name: e.name,
                onFocus: p,
                onBlur: u
              }, se, z), null), [[aa, {
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
              }, null), [[vi, o.value]]), e.suffix && C("span", {
                class: "v-text-field__suffix"
              }, [e.suffix])]);
            }
          });
        },
        details: M ? (ae) => {
          var ue;
          return C(J, null, [(ue = l.details) == null ? void 0 : ue.call(l, ae), E && C(J, null, [C("span", null, null), b(vo, {
            active: e.persistentCounter || i.value,
            value: r.value,
            max: c.value,
            disabled: e.disabled
          }, l.counter)])]);
        } : void 0
      });
    }), gt({}, m, v, k);
  }
}), cr = /* @__PURE__ */ Le({
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
  emits: ["update:modelValue"],
  setup(e, { emit: n }) {
    const t = fi(() => import("./OxAutocomplete-RRyWhOH0.js")), a = n, l = Tt(), o = e, i = A(() => {
      const s = `fields.${o.name}.help`, u = {
        name: o.name,
        label: oe(`fields.${o.name}`),
        "aria-label": oe(`fields.${o.name}`),
        "error-messages": o.editor.error(o.name),
        rules: o.rules || [],
        ...l
      };
      return oe(s) != s && (u.hint = oe(s), u["aria-description"] = oe(s)), o.required && u.rules.push(Si.required), u;
    });
    return (s, u) => G(s.$slots, "default", {
      props: i.value,
      editor: o.editor
    }, () => [
      o.type == "select" ? (D(), Y(kl, L({ key: 0 }, i.value, {
        modelValue: o.editor.value[o.name],
        "onUpdate:modelValue": [
          u[0] || (u[0] = (r) => o.editor.value[o.name] = r),
          u[1] || (u[1] = (r) => a("update:modelValue", r))
        ]
      }), null, 16, ["modelValue"])) : o.type == "textarea" ? (D(), Y(rr, L({ key: 1 }, i.value, {
        modelValue: o.editor.value[o.name],
        "onUpdate:modelValue": [
          u[2] || (u[2] = (r) => o.editor.value[o.name] = r),
          u[3] || (u[3] = (r) => a("update:modelValue", r))
        ]
      }), null, 16, ["modelValue"])) : o.type == "checkbox" ? (D(), Y(Mu, L({ key: 2 }, i.value, {
        modelValue: o.editor.value[o.name],
        "onUpdate:modelValue": [
          u[4] || (u[4] = (r) => o.editor.value[o.name] = r),
          u[5] || (u[5] = (r) => a("update:modelValue", r))
        ]
      }), null, 16, ["modelValue"])) : o.type == "autocomplete" ? (D(), Y(S(t), L({ key: 3 }, i.value, {
        modelValue: o.editor.value[o.name],
        "onUpdate:modelValue": [
          u[6] || (u[6] = (r) => o.editor.value[o.name] = r),
          u[7] || (u[7] = (r) => a("update:modelValue", r))
        ]
      }), null, 16, ["modelValue"])) : (D(), Y(rt, L({ key: 4 }, i.value, {
        type: o.type,
        modelValue: o.editor.value[o.name],
        "onUpdate:modelValue": [
          u[8] || (u[8] = (r) => o.editor.value[o.name] = r),
          u[9] || (u[9] = (r) => a("update:modelValue", r))
        ]
      }), null, 16, ["type", "modelValue"]))
    ]);
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
        ([u, r]) => !u.startsWith("page") && !u.startsWith("ordering") && !!r
      );
    }), o = A(() => l.value ? "mdi-filter-check" : "mdi-filter-outline");
    function i() {
      t.filters = {}, t.load();
    }
    return n({ icon: o, hasFilters: l, reset: i }), (s, u) => (D(), be("form", {
      onSubmit: u[2] || (u[2] = Ie((r) => S(t).load(), ["prevent"])),
      class: "ox-list-filters width-full"
    }, [
      b(Wa, {
        dense: "",
        color: "transparent"
      }, {
        default: R(() => [
          b(Hn, {
            icon: o.value,
            readonly: ""
          }, null, 8, ["icon"]),
          a.search && S(t).filters ? (D(), Y(rt, {
            key: 0,
            label: S(oe)("filters.search"),
            density: "compact",
            class: "ml-2",
            modelValue: S(t).filters[a.search],
            "onUpdate:modelValue": u[0] || (u[0] = (r) => S(t).filters[a.search] = r),
            "hide-details": ""
          }, null, 8, ["label", "modelValue"])) : de("", !0),
          G(s.$slots, "default", {
            list: S(t),
            filters: S(t).filters
          }),
          b(pe, {
            onClick: u[1] || (u[1] = Ie((r) => S(t).load(), ["stop"])),
            class: "ml-2",
            icon: "mdi-check",
            "aria-label": s.$t("filters.apply"),
            title: S(oe)("filters.apply")
          }, null, 8, ["aria-label", "title"]),
          l.value ? (D(), Y(pe, {
            key: 1,
            onClick: Ie(i, ["stop"]),
            icon: "mdi-backspace",
            "aria-label": S(oe)("filters.reset"),
            title: S(oe)("filters.reset")
          }, null, 8, ["aria-label", "title"])) : de("", !0)
        ]),
        _: 3
      })
    ], 32));
  }
}, en = /* @__PURE__ */ Le({
  __name: "OxFormListItem",
  props: {
    /** Item being displayed. **/
    item: Object,
    /** Display remove button. **/
    remove: Boolean
  },
  emits: "remove",
  setup(e, { emit: n }) {
    const t = e, a = n, l = Tt();
    return (o, i) => (D(), Y(Ye, Ee($e(S(l))), {
      append: R(() => [
        C("div", {
          onClick: i[1] || (i[1] = Ie(() => {
          }, ["stop"]))
        }, [
          G(o.$slots, "actions", { item: e.item }),
          t.remove ? (D(), Y(pe, {
            key: 0,
            type: "button",
            class: "ml-2",
            size: "small",
            onClick: i[0] || (i[0] = Ie((s) => a("remove", o.$events), ["stop", "prevent"])),
            color: "error",
            "aria-label": S(oe)("actions.remove"),
            title: S(oe)("actions.remove"),
            icon: "mdi-delete"
          }, null, 8, ["aria-label", "title"])) : de("", !0)
        ])
      ]),
      default: R(() => [
        b($i, null, {
          default: R(() => [
            G(o.$slots, "default", { item: e.item })
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 16));
  }
}), dr = j({
  ...Se(),
  ...Bu()
}, "VForm"), Za = ne()({
  name: "VForm",
  props: dr(),
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
      const r = u, c = l.validate();
      r.then = c.then.bind(c), r.catch = c.catch.bind(c), r.finally = c.finally.bind(c), a("submit", r), r.defaultPrevented || c.then((d) => {
        var v;
        let {
          valid: m
        } = d;
        m && ((v = o.value) == null || v.submit());
      }), r.preventDefault();
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
}), vr = {
  key: 0,
  class: "flex-row justify-right"
}, fr = /* @__PURE__ */ Le({
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
    const n = el(e, "modelValue"), t = ve("user"), a = q({}), l = e, o = A(() => ({
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
    return (c, d) => (D(), Y(ut, {
      opened: i.value,
      "onUpdate:opened": d[2] || (d[2] = (m) => i.value = m)
    }, {
      default: R(() => {
        var m;
        return [
          (m = n.value) != null && m.length ? (D(), be(J, { key: 0 }, [
            o.value.change ? (D(!0), be(J, { key: 0 }, Fe(n.value, (v, f) => (D(), Y(Ha, {
              key: f,
              value: f
            }, {
              activator: R(({ props: k }) => [
                b(S(en), L({ item: v }, { ref_for: !0 }, k, {
                  remove: o.value.delete,
                  onRemove: (y) => u(f)
                }), {
                  default: R(({ item: y }) => [
                    G(c.$slots, "item", {
                      item: y,
                      index: f
                    })
                  ]),
                  actions: R(({ item: y }) => [
                    G(c.$slots, "item.actions", {
                      item: y,
                      index: f
                    })
                  ]),
                  _: 2
                }, 1040, ["item", "remove", "onRemove"])
              ]),
              default: R(() => [
                b(Za, {
                  disabled: !o.value.change
                }, {
                  default: R(() => [
                    G(c.$slots, "item.form", {
                      item: v,
                      index: f,
                      editable: o.value.change
                    })
                  ]),
                  _: 2
                }, 1032, ["disabled"])
              ]),
              _: 2
            }, 1032, ["value"]))), 128)) : (D(!0), be(J, { key: 1 }, Fe(n.value, (v, f) => (D(), Y(S(en), L({
              key: f,
              item: v
            }, { ref_for: !0 }, l, {
              value: f,
              remove: o.value.delete,
              onRemove: (k) => u(f)
            }), {
              default: R(({ item: k }) => [
                G(c.$slots, "item", {
                  item: k,
                  index: f
                })
              ]),
              actions: R(({ item: k }) => [
                G(c.$slots, "item.actions", {
                  item: k,
                  index: f
                })
              ]),
              _: 2
            }, 1040, ["item", "value", "remove", "onRemove"]))), 128))
          ], 64)) : (D(), Y(Ye, {
            key: 1,
            title: S(oe)("lists.empty")
          }, null, 8, ["title"])),
          o.value.add ? (D(), be(J, { key: 2 }, [
            n.value.length ? (D(), Y(wa, { key: 0 })) : de("", !0),
            b(Ha, { value: -1 }, {
              activator: R(({ props: v }) => [
                b(Ye, L(v, {
                  title: S(oe)("actions.add_item"),
                  "prepend-icon": "mdi-plus"
                }), null, 16, ["title"])
              ]),
              default: R(() => [
                b(Za, null, {
                  default: R(() => [
                    G(c.$slots, "item.form", {
                      item: a.value,
                      edit: !0
                    })
                  ]),
                  _: 3
                }),
                a.value ? (D(), Y(Ye, { key: 0 }, {
                  default: R(() => [
                    Object.values(a.value).length ? (D(), be("div", vr, [
                      b(pe, {
                        size: "small",
                        color: "secondary",
                        "prepend-icon": "mdi-backspace",
                        onClick: d[0] || (d[0] = (v) => a.value = {}),
                        "aria-label": S(oe)("actions.discard")
                      }, {
                        default: R(() => [
                          Pe(Me(S(oe)("actions.discard")), 1)
                        ]),
                        _: 1
                      }, 8, ["aria-label"]),
                      b(pe, {
                        size: "small",
                        color: "primary",
                        "prepend-icon": "mdi-plus",
                        class: "ml-2",
                        onClick: d[1] || (d[1] = (v) => s()),
                        "aria-label": S(oe)("actions.add")
                      }, {
                        default: R(() => [
                          Pe(Me(S(oe)("actions.add")), 1)
                        ]),
                        _: 1
                      }, 8, ["aria-label"])
                    ])) : de("", !0)
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
}), mr = ne()({
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
}), gr = j({
  opacity: [Number, String],
  ...Se(),
  ...je()
}, "VCardSubtitle"), yr = ne()({
  name: "VCardSubtitle",
  props: gr(),
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
}), po = Oi("v-card-title"), hr = j({
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
}, "VCardItem"), br = ne()({
  name: "VCardItem",
  props: hr(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    return ie(() => {
      var r;
      const a = !!(e.prependAvatar || e.prependIcon), l = !!(a || t.prepend), o = !!(e.appendAvatar || e.appendIcon), i = !!(o || t.append), s = !!(e.title != null || t.title), u = !!(e.subtitle != null || t.subtitle);
      return C("div", {
        class: fe(["v-card-item", e.class]),
        style: Ve(e.style)
      }, [l && C("div", {
        key: "prepend",
        class: "v-card-item__prepend"
      }, [t.prepend ? b(Re, {
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
          var c;
          return [((c = t.title) == null ? void 0 : c.call(t)) ?? Me(e.title)];
        }
      }), u && b(yr, {
        key: "subtitle"
      }, {
        default: () => {
          var c;
          return [((c = t.subtitle) == null ? void 0 : c.call(t)) ?? Me(e.subtitle)];
        }
      }), (r = t.default) == null ? void 0 : r.call(t)]), i && C("div", {
        key: "append",
        class: "v-card-item__append"
      }, [t.append ? b(Re, {
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
}), pr = j({
  opacity: [Number, String],
  ...Se(),
  ...je()
}, "VCardText"), wr = ne()({
  name: "VCardText",
  props: pr(),
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
}), xr = j({
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
  ...Ht(),
  ...Se(),
  ...vt(),
  ...Wt(),
  ...Nt(),
  ...rl(),
  ...vn(),
  ...dn(),
  ...wt(),
  ...bn(),
  ...je(),
  ...Ne(),
  ...jt({
    variant: "elevated"
  })
}, "VCard"), Sr = ne()({
  name: "VCard",
  directives: {
    vRipple: Ct
  },
  props: xr(),
  setup(e, n) {
    let {
      attrs: t,
      slots: a
    } = n;
    const {
      themeClasses: l
    } = Ge(e), {
      borderClasses: o
    } = ga(e), {
      colorClasses: i,
      colorStyles: s,
      variantClasses: u
    } = al(e), {
      densityClasses: r
    } = Et(e), {
      dimensionStyles: c
    } = zt(e), {
      elevationClasses: d
    } = ya(e), {
      loaderClasses: m
    } = sl(e), {
      locationStyles: v
    } = Fi(e), {
      positionClasses: f
    } = cn(e), {
      roundedClasses: k
    } = _t(e), y = gn(e, t);
    return ie(() => {
      const p = e.link !== !1 && y.isLink.value, g = !e.disabled && e.link !== !1 && (e.link || y.isClickable.value), I = p ? "a" : e.tag, x = !!(a.title || e.title != null), V = !!(a.subtitle || e.subtitle != null), w = x || V, P = !!(a.append || e.appendAvatar || e.appendIcon), h = !!(a.prepend || e.prependAvatar || e.prependIcon), _ = !!(a.image || e.image), T = w || h || P, E = !!(a.text || e.text != null);
      return Ke(b(I, L({
        class: ["v-card", {
          "v-card--disabled": e.disabled,
          "v-card--flat": e.flat,
          "v-card--hover": e.hover && !(e.disabled || e.flat),
          "v-card--link": g
        }, l.value, o.value, i.value, r.value, d.value, m.value, f.value, k.value, u.value, e.class],
        style: [s.value, c.value, v.value, e.style],
        onClick: g && y.navigate,
        tabindex: e.disabled ? -1 : void 0
      }, y.linkProps), {
        default: () => {
          var M;
          return [_ && C("div", {
            key: "image",
            class: "v-card__image"
          }, [a.image ? b(Re, {
            key: "image-defaults",
            disabled: !e.image,
            defaults: {
              VImg: {
                cover: !0,
                src: e.image
              }
            }
          }, a.image) : b(ba, {
            key: "image-img",
            cover: !0,
            src: e.image
          }, null)]), b(ul, {
            name: "v-card",
            active: !!e.loading,
            color: typeof e.loading == "boolean" ? void 0 : e.loading
          }, {
            default: a.loader
          }), T && b(br, {
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
          }), E && b(wr, {
            key: "text"
          }, {
            default: () => {
              var F;
              return [((F = a.text) == null ? void 0 : F.call(a)) ?? e.text];
            }
          }), (M = a.default) == null ? void 0 : M.call(a), a.actions && b(mr, null, {
            default: a.actions
          }), ll(g, "v-card")];
        }
      }), [[Ct, g && e.ripple]]);
    }), {};
  }
}), kr = ne()({
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
}), Vr = {
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
    const s = A(() => {
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
    return (u, r) => (D(), Y(wn, null, {
      default: R(() => [
        b(Lt, null, {
          default: R(() => [
            (D(!0), be(J, null, Fe(l.headers, (c, d) => (D(), Y(kr, {
              key: c.value
            }, {
              default: R(({ selectedClass: m }) => [
                b(Sr, {
                  width: "400",
                  class: fe(["ma-3", m]),
                  color: o(d),
                  lines: "two"
                }, {
                  default: R(() => [
                    b(po, null, {
                      default: R(() => [
                        Pe(Me(c.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    b(ut, {
                      "bg-color": o(d)
                    }, {
                      default: R(() => [
                        s.value && s.value[c.value] ? (D(!0), be(J, { key: 0 }, Fe(s.value[c.value], (v) => G(u.$slots, "item", {
                          key: v.id,
                          header: c,
                          item: v
                        }, () => [
                          b(Ye, {
                            title: v[l.itemTitle],
                            value: l.itemValue && v[l.itemValue],
                            onClick: (f) => t("click", v)
                          }, {
                            append: R(() => [
                              G(u.$slots, "item.action")
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
function Cr() {
  const e = q([]);
  mi(() => e.value = []);
  function n(t, a) {
    e.value[a] = t;
  }
  return {
    refs: e,
    updateRef: n
  };
}
const Pr = j({
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
  ...Ht(),
  ...Se(),
  ...vt(),
  ...Nt(),
  ...wt(),
  ...hn(),
  ...je({
    tag: "nav"
  }),
  ...Ne(),
  ...jt({
    variant: "text"
  })
}, "VPagination"), tn = ne()({
  name: "VPagination",
  props: Pr(),
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
      width: r
    } = ft(), c = ee(-1);
    at(void 0, {
      scoped: !0
    });
    const {
      resizeRef: d
    } = Vt((h) => {
      if (!h.length) return;
      const {
        target: _,
        contentRect: T
      } = h[0], E = _.querySelector(".v-pagination__list > *");
      if (!E) return;
      const M = T.width, F = E.offsetWidth + parseFloat(getComputedStyle(E).marginRight) * 2;
      c.value = k(M, F);
    }), m = A(() => parseInt(e.length, 10)), v = A(() => parseInt(e.start, 10)), f = A(() => e.totalVisible != null ? parseInt(e.totalVisible, 10) : c.value >= 0 ? c.value : k(r.value, 58));
    function k(h, _) {
      const T = e.showFirstLastPage ? 5 : 3;
      return Math.max(0, Math.floor(
        // Round to two decimal places to avoid floating point errors
        Number(((h - _ * T) / _).toFixed(2))
      ));
    }
    const y = A(() => {
      if (m.value <= 0 || isNaN(m.value) || m.value > Number.MAX_SAFE_INTEGER) return [];
      if (f.value <= 0) return [];
      if (f.value === 1) return [l.value];
      if (m.value <= f.value)
        return Xt(m.value, v.value);
      const h = f.value % 2 === 0, _ = h ? f.value / 2 : Math.floor(f.value / 2), T = h ? _ : _ + 1, E = m.value - _;
      if (T - l.value >= 0)
        return [...Xt(Math.max(1, f.value - 1), v.value), e.ellipsis, m.value];
      if (l.value - E >= (h ? 1 : 0)) {
        const M = f.value - 1, F = m.value - M + v.value;
        return [v.value, e.ellipsis, ...Xt(M, F)];
      } else {
        const M = Math.max(1, f.value - 2), F = M === 1 ? l.value : l.value - Math.ceil(M / 2) + v.value;
        return [v.value, e.ellipsis, ...Xt(M, F), e.ellipsis, m.value];
      }
    });
    function p(h, _, T) {
      h.preventDefault(), l.value = _, T && a(T, _);
    }
    const {
      refs: g,
      updateRef: I
    } = Cr();
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
    const x = A(() => y.value.map((h, _) => {
      const T = (E) => I(E, _);
      if (typeof h == "string")
        return {
          isActive: !1,
          key: `ellipsis-${_}`,
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
            onClick: (M) => p(M, h)
          }
        };
      }
    })), V = A(() => {
      const h = !!e.disabled || l.value <= v.value, _ = !!e.disabled || l.value >= v.value + m.value - 1;
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
          disabled: _,
          "aria-label": o(e.nextAriaLabel),
          "aria-disabled": _
        },
        last: e.showFirstLastPage ? {
          icon: s.value ? e.firstIcon : e.lastIcon,
          onClick: (T) => p(T, v.value + m.value - 1, "last"),
          disabled: _,
          "aria-label": o(e.lastAriaLabel),
          "aria-disabled": _
        } : void 0
      };
    });
    function w() {
      var _;
      const h = l.value - v.value;
      (_ = g.value[h]) == null || _.$el.focus();
    }
    function P(h) {
      h.key === Ml.left && !e.disabled && l.value > Number(e.start) ? (l.value = l.value - 1, Te(w)) : h.key === Ml.right && !e.disabled && l.value < v.value + m.value - 1 && (l.value = l.value + 1, Te(w));
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
      }, [t.first ? t.first(V.value.first) : b(pe, L({
        _as: "VPaginationBtn"
      }, V.value.first), null)]), C("li", {
        key: "prev",
        class: "v-pagination__prev",
        "data-test": "v-pagination-prev"
      }, [t.prev ? t.prev(V.value.prev) : b(pe, L({
        _as: "VPaginationBtn"
      }, V.value.prev), null)]), x.value.map((h, _) => C("li", {
        key: h.key,
        class: fe(["v-pagination__item", {
          "v-pagination__item--is-active": h.isActive
        }]),
        "data-test": "v-pagination-item"
      }, [t.item ? t.item(h) : b(pe, L({
        _as: "VPaginationBtn"
      }, h.props), {
        default: () => [h.page]
      })])), C("li", {
        key: "next",
        class: "v-pagination__next",
        "data-test": "v-pagination-next"
      }, [t.next ? t.next(V.value.next) : b(pe, L({
        _as: "VPaginationBtn"
      }, V.value.next), null)]), e.showFirstLastPage && C("li", {
        key: "last",
        class: "v-pagination__last",
        "data-test": "v-pagination-last"
      }, [t.last ? t.last(V.value.last) : b(pe, L({
        _as: "VPaginationBtn"
      }, V.value.last), null)])])]
    })), {};
  }
}), wo = j({
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
  function s(m) {
    t.value = m, n.value = 1;
  }
  function u() {
    n.value = Je(n.value + 1, 1, i.value);
  }
  function r() {
    n.value = Je(n.value - 1, 1, i.value);
  }
  function c(m) {
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
    prevPage: r,
    setPage: c,
    setItemsPerPage: s
  };
  return We(xo, d), d;
}
function Ir() {
  const e = ve(xo);
  if (!e) throw new Error("Missing pagination!");
  return e;
}
function Ar(e) {
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
const Vl = j({
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
      itemsPerPage: r,
      setItemsPerPage: c
    } = Ir(), d = A(() => e.itemsPerPageOptions.map((m) => typeof m == "number" ? {
      value: m,
      title: m === -1 ? a("$vuetify.dataFooter.itemsPerPageAll") : String(m)
    } : {
      ...m,
      title: isNaN(Number(m.title)) ? a(m.title) : m.title
    }));
    return ie(() => {
      var v;
      const m = tn.filterProps(e);
      return C("div", {
        class: "v-data-table-footer"
      }, [(v = t.prepend) == null ? void 0 : v.call(t), C("div", {
        class: "v-data-table-footer__items-per-page"
      }, [C("span", {
        "aria-label": a(e.itemsPerPageText)
      }, [a(e.itemsPerPageText)]), b(kl, {
        items: d.value,
        modelValue: r.value,
        "onUpdate:modelValue": (f) => c(Number(f)),
        density: "compact",
        variant: "outlined",
        "hide-details": !0
      }, null)]), C("div", {
        class: "v-data-table-footer__info"
      }, [C("div", null, [a(e.pageText, u.value ? i.value + 1 : 0, s.value, u.value)])]), C("div", {
        class: "v-data-table-footer__pagination"
      }, [b(tn, L({
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
}), da = qi({
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
}), Tr = j({
  headers: Array
}, "DataTable-header"), Vo = Symbol.for("vuetify:data-table-headers"), Co = {
  title: "",
  sortable: !1
}, Br = {
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
function Er(e) {
  if (e.key) {
    if (e.key === "data-table-group") return Co;
    if (["data-table-expand", "data-table-select"].includes(e.key)) return Br;
  }
}
function Cl(e) {
  let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return e.children ? Math.max(n, ...e.children.map((t) => Cl(t, n + 1))) : n;
}
function $r(e) {
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
function Or(e, n) {
  const t = [];
  let a = 0;
  const l = _r(e);
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
        colspan: r.children ? Qa(r).length : 1
      }), r.children)
        for (const m of r.children) {
          const v = c % 1 + u / Math.pow(10, a + 2);
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
function Ao(e, n) {
  const t = q([]), a = q([]), l = q({}), o = q({}), i = q({});
  et(() => {
    var k, y, p;
    const r = (e.headers || Object.keys(e.items[0] ?? {}).map((g) => ({
      key: g,
      title: gi(g)
    }))).slice(), c = Po(r);
    (k = n == null ? void 0 : n.groupBy) != null && k.value.length && !c.has("data-table-group") && r.unshift({
      key: "data-table-group",
      title: "Group"
    }), (y = n == null ? void 0 : n.showSelect) != null && y.value && !c.has("data-table-select") && r.unshift({
      key: "data-table-select"
    }), (p = n == null ? void 0 : n.showExpand) != null && p.value && !c.has("data-table-expand") && r.push({
      key: "data-table-expand"
    });
    const d = Io(r);
    $r(d);
    const m = Math.max(...d.map((g) => Cl(g))) + 1, v = Or(d, m);
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
  return We(Vo, s), s;
}
function Va() {
  const e = ve(Vo);
  if (!e) throw new Error("Missing headers!");
  return e;
}
const Fr = {
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
}, Rr = j({
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
}, "DataTable-select"), _o = Symbol.for("vuetify:data-table-selection");
function Eo(e, n) {
  let {
    allItems: t,
    currentPage: a
  } = n;
  const l = we(e, "modelValue", e.modelValue, (g) => new Set(He(g).map((I) => {
    var x;
    return ((x = t.value.find((V) => e.valueComparator(I, V.value))) == null ? void 0 : x.value) ?? I;
  })), (g) => [...g.values()]), o = A(() => t.value.filter((g) => g.selectable)), i = A(() => a.value.filter((g) => g.selectable)), s = A(() => {
    if (typeof e.selectStrategy == "object") return e.selectStrategy;
    switch (e.selectStrategy) {
      case "single":
        return Fr;
      case "all":
        return Bo;
      case "page":
      default:
        return To;
    }
  }), u = ee(null);
  function r(g) {
    return He(g).every((I) => l.value.has(I.value));
  }
  function c(g) {
    return He(g).some((I) => l.value.has(I.value));
  }
  function d(g, I) {
    const x = s.value.select({
      items: g,
      value: I,
      selected: new Set(l.value)
    });
    l.value = x;
  }
  function m(g, I, x) {
    const V = [];
    if (I = I ?? a.value.findIndex((w) => w.value === g.value), e.selectStrategy !== "single" && (x != null && x.shiftKey) && u.value !== null) {
      const [w, P] = [u.value, I].sort((h, _) => h - _);
      V.push(...a.value.slice(w, P + 1).filter((h) => h.selectable));
    } else
      V.push(g), u.value = I;
    d(V, !r([g]));
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
  const f = A(() => l.value.size > 0), k = A(() => {
    const g = s.value.allSelected({
      allItems: o.value,
      currentPage: i.value
    });
    return !!g.length && r(g);
  }), y = H(() => s.value.showSelectAll), p = {
    toggleSelect: m,
    select: d,
    selectAll: v,
    isSelected: r,
    isSomeSelected: c,
    someSelected: f,
    allSelected: k,
    showSelectAll: y,
    lastSelectedIndex: u,
    selectStrategy: s
  };
  return We(_o, p), p;
}
function Ca() {
  const e = ve(_o);
  if (!e) throw new Error("Missing selection!");
  return e;
}
const Mr = j({
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
  return We($o, s), s;
}
function Ro() {
  const e = ve($o);
  if (!e) throw new Error("Missing sort!");
  return e;
}
function Dr(e, n, t, a) {
  const l = ot();
  return {
    sortedItems: A(() => {
      var i, s;
      return t.value.length ? Lr(n.value, t.value, l.current.value, {
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
function Lr(e, n, t, a) {
  const l = new Intl.Collator(t, {
    sensitivity: "accent",
    usage: "sort"
  });
  return e.map((i) => [i, a != null && a.transform ? a.transform(i) : i]).sort((i, s) => {
    var u, r;
    for (let c = 0; c < n.length; c++) {
      let d = !1;
      const m = n[c].key, v = n[c].order ?? "asc";
      if (v === !1) continue;
      let f = na(i[1], m), k = na(s[1], m), y = i[0].raw, p = s[0].raw;
      if (v === "desc" && ([f, k] = [k, f], [y, p] = [p, y]), (u = a == null ? void 0 : a.sortRawFunctions) != null && u[m]) {
        const g = a.sortRawFunctions[m](y, p);
        if (g == null) continue;
        if (d = !0, g) return g;
      }
      if ((r = a == null ? void 0 : a.sortFunctions) != null && r[m]) {
        const g = a.sortFunctions[m](f, k);
        if (g == null) continue;
        if (d = !0, g) return g;
      }
      if (!d) {
        if (f instanceof Date && k instanceof Date)
          return f.getTime() - k.getTime();
        if ([f, k] = [f, k].map((g) => g != null ? g.toString().toLocaleLowerCase() : g), f !== k)
          return Zt(f) && Zt(k) ? 0 : Zt(f) ? -1 : Zt(k) ? 1 : !isNaN(f) && !isNaN(k) ? Number(f) - Number(k) : l.compare(f, k);
      }
    }
    return 0;
  }).map((i) => {
    let [s] = i;
    return s;
  });
}
const Mo = j({
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
      selectAll: r,
      showSelectAll: c
    } = Ca(), {
      columns: d,
      headers: m
    } = Va(), {
      loaderClasses: v
    } = sl(e);
    function f(_, T) {
      if (!(!(e.sticky || e.fixedHeader) && !_.fixed))
        return {
          position: "sticky",
          left: _.fixed ? ye(_.fixedOffset) : void 0,
          top: e.sticky || e.fixedHeader ? `calc(var(--v-table-header-height) * ${T})` : void 0
        };
    }
    function k(_, T) {
      _.key === "Enter" && !e.disableSort && l(T);
    }
    function y(_) {
      const T = o.value.find((E) => E.key === _.key);
      return T ? T.order === "asc" ? e.sortAscIcon : e.sortDescIcon : e.sortAscIcon;
    }
    const {
      backgroundColorClasses: p,
      backgroundColorStyles: g
    } = st(() => e.color), {
      displayClasses: I,
      mobile: x
    } = ft(e), V = A(() => ({
      headers: m.value,
      columns: d.value,
      toggleSort: l,
      isSorted: i,
      sortBy: o.value,
      someSelected: s.value,
      allSelected: u.value,
      selectAll: r,
      getSortIcon: y
    })), w = A(() => ["v-data-table__th", {
      "v-data-table__th--sticky": e.sticky || e.fixedHeader
    }, I.value, v.value]), P = (_) => {
      let {
        column: T,
        x: E,
        y: M
      } = _;
      const F = T.key === "data-table-select" || T.key === "data-table-expand", z = L(e.headerProps ?? {}, T.headerProps ?? {});
      return b(da, L({
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
          ...f(T, M)
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
          const W = `header.${T.key}`, K = {
            column: T,
            selectAll: r,
            isSorted: i,
            toggleSort: l,
            sortBy: o.value,
            someSelected: s.value,
            allSelected: u.value,
            getSortIcon: y
          };
          return t[W] ? t[W](K) : T.key === "data-table-select" ? ((te = t["header.data-table-select"]) == null ? void 0 : te.call(t, K)) ?? (c.value && b(bt, {
            modelValue: u.value,
            indeterminate: s.value && !u.value,
            "onUpdate:modelValue": r
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
      const _ = A(() => d.value.filter((E) => (E == null ? void 0 : E.sortable) && !e.disableSort)), T = A(() => {
        if (d.value.find((M) => M.key === "data-table-select") != null)
          return u.value ? "$checkboxOn" : s.value ? "$checkboxIndeterminate" : "$checkboxOff";
      });
      return b(da, L({
        tag: "th",
        class: [...w.value],
        colspan: m.value.length + 1
      }, e.headerProps), {
        default: () => [C("div", {
          class: "v-data-table-header__content"
        }, [b(kl, {
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
          "onClick:append": () => r(!u.value)
        }, {
          ...t,
          chip: (E) => {
            var M;
            return b(pl, {
              onClick: (M = E.item.raw) != null && M.sortable ? () => l(E.item.raw) : void 0,
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
    ie(() => x.value ? C("tr", null, [b(h, null, null)]) : C(J, null, [t.headers ? t.headers(V.value) : m.value.map((_, T) => C("tr", null, [_.map((E, M) => b(P, {
      column: E,
      x: M,
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
}), Nr = j({
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
  } = e, l = q(/* @__PURE__ */ new Set()), o = A(() => t.value.map((c) => ({
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
    function d(m) {
      const v = [];
      for (const f of m.items)
        "type" in f && f.type === "group" ? v.push(...d(f)) : v.push(f);
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
  return We(Do, r), r;
}
function Ho() {
  const e = ve(Do);
  if (!e) throw new Error("Missing group!");
  return e;
}
function Hr(e, n) {
  if (!e.length) return [];
  const t = /* @__PURE__ */ new Map();
  for (const a of e) {
    const l = na(a.raw, n);
    t.has(l) || t.set(l, []), t.get(l).push(a);
  }
  return t;
}
function zo(e, n) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "root";
  if (!n.length) return [];
  const l = Hr(e, n[0]), o = [], i = n.slice(1);
  return l.forEach((s, u) => {
    const r = n[0], c = `${a}_${r}_${u}`;
    o.push({
      depth: t,
      id: c,
      key: r,
      value: u,
      items: i.length ? zo(s, i, t + 1, c) : s,
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
const zr = j({
  item: {
    type: Object,
    required: !0
  }
}, "VDataTableGroupHeaderRow"), Wr = ne()({
  name: "VDataTableGroupHeaderRow",
  props: zr(),
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
      columns: r
    } = Va(), c = A(() => o([e.item]));
    return () => C("tr", {
      class: "v-data-table-group-header-row",
      style: {
        "--v-data-table-group-header-row-depth": e.item.depth
      }
    }, [r.value.map((d) => {
      var m, v;
      if (d.key === "data-table-group") {
        const f = a(e.item) ? "$expand" : "$next", k = () => l(e.item);
        return ((m = t["data-table-group"]) == null ? void 0 : m.call(t, {
          item: e.item,
          count: c.value.length,
          props: {
            icon: f,
            onClick: k
          }
        })) ?? b(da, {
          class: "v-data-table-group-header-row__column"
        }, {
          default: () => [b(pe, {
            size: "small",
            variant: "text",
            icon: f,
            onClick: k
          }, null), C("span", null, [e.item.value]), C("span", null, [Pe("("), c.value.length, Pe(")")])]
        });
      }
      if (d.key === "data-table-select") {
        const f = i(c.value), k = s(c.value) && !f, y = (p) => u(c.value, p);
        return ((v = t["data-table-select"]) == null ? void 0 : v.call(t, {
          props: {
            modelValue: f,
            indeterminate: k,
            "onUpdate:modelValue": y
          }
        })) ?? C("td", null, [b(bt, {
          modelValue: f,
          indeterminate: k,
          "onUpdate:modelValue": y
        }, null)]);
      }
      return C("td", null, null);
    })]);
  }
}), Ur = j({
  expandOnClick: Boolean,
  showExpand: Boolean,
  expanded: {
    type: Array,
    default: () => []
  }
}, "DataTable-expand"), jo = Symbol.for("vuetify:datatable:expanded");
function Ko(e) {
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
  return We(jo, i), i;
}
function Go() {
  const e = ve(jo);
  if (!e) throw new Error("foo");
  return e;
}
const jr = j({
  index: Number,
  item: Object,
  cellProps: [Object, Function],
  onClick: Xe(),
  onContextmenu: Xe(),
  onDblclick: Xe(),
  ...Gt()
}, "VDataTableRow"), Kr = ne()({
  name: "VDataTableRow",
  props: jr(),
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
      selectAll: r
    } = Ca(), {
      isExpanded: c,
      toggleExpand: d
    } = Go(), {
      toggleSort: m,
      sortBy: v,
      isSorted: f
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
      const g = e.item, I = `item.${y.key}`, x = `header.${y.key}`, V = {
        index: e.index,
        item: g.raw,
        internalItem: g,
        value: na(g.columns, y.key),
        column: y,
        isSelected: o,
        toggleSelect: i,
        isExpanded: c,
        toggleExpand: d
      }, w = {
        column: y,
        selectAll: r,
        isSorted: f,
        toggleSort: m,
        sortBy: v.value,
        someSelected: s.value,
        allSelected: u.value,
        getSortIcon: () => ""
      }, P = typeof e.cellProps == "function" ? e.cellProps({
        index: V.index,
        item: V.item,
        internalItem: V.internalItem,
        value: V.value,
        column: y
      }) : e.cellProps, h = typeof y.cellProps == "function" ? y.cellProps({
        index: V.index,
        item: V.item,
        internalItem: V.internalItem,
        value: V.value
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
          var T, E, M, F;
          if (y.key === "data-table-select")
            return ((T = t["item.data-table-select"]) == null ? void 0 : T.call(t, {
              ...V,
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
              ...V,
              props: {
                icon: c(g) ? "$collapse" : "$expand",
                size: "small",
                variant: "text",
                onClick: Ie(() => d(g), ["stop"])
              }
            })) ?? b(pe, {
              icon: c(g) ? "$collapse" : "$expand",
              size: "small",
              variant: "text",
              onClick: Ie(() => d(g), ["stop"])
            }, null);
          if (t[I] && !l.value) return t[I](V);
          const _ = Me(V.value);
          return l.value ? C(J, null, [C("div", {
            class: "v-data-table__td-title"
          }, [((M = t[x]) == null ? void 0 : M.call(t, w)) ?? y.title]), C("div", {
            class: "v-data-table__td-value"
          }, [((F = t[I]) == null ? void 0 : F.call(t, V)) ?? _])]) : _;
        }
      });
    })]));
  }
}), Yo = j({
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
    } = Go(), {
      isSelected: u,
      toggleSelect: r
    } = Ca(), {
      toggleGroup: c,
      isGroupOpen: d
    } = Ho(), {
      t: m
    } = ot(), {
      mobile: v
    } = ft(e);
    return ie(() => {
      var f, k;
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
      }, [((k = a["no-data"]) == null ? void 0 : k.call(a)) ?? m(e.noDataText)])]) : C(J, null, [e.items.map((y, p) => {
        var x;
        if (y.type === "group") {
          const V = {
            index: p,
            item: y,
            columns: l.value,
            isExpanded: s,
            toggleExpand: i,
            isSelected: u,
            toggleSelect: r,
            toggleGroup: c,
            isGroupOpen: d
          };
          return a["group-header"] ? a["group-header"](V) : b(Wr, L({
            key: `group-header_${y.id}`,
            item: y
          }, Ll(t, ":group-header", () => V)), a);
        }
        const g = {
          index: p,
          item: y.raw,
          internalItem: y,
          columns: l.value,
          isExpanded: s,
          toggleExpand: i,
          isSelected: u,
          toggleSelect: r
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
        return C(J, {
          key: I.props.key
        }, [a.item ? a.item(I) : b(Kr, I.props, a), s(y) && ((x = a["expanded-row"]) == null ? void 0 : x.call(a, g))]);
      })]);
    }), {};
  }
}), qo = j({
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  height: [Number, String],
  hover: Boolean,
  ...Se(),
  ...vt(),
  ...je(),
  ...Ne()
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
    } = Ge(e), {
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
}), Gr = j({
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
function Yr(e, n, t, a) {
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
function qr(e, n, t) {
  return n.map((a, l) => Yr(e, a, l, t));
}
function Xo(e, n) {
  return {
    items: A(() => qr(e, e.items, n.value))
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
  Q(s, (r) => {
    it(u, r) || (u && u.search !== r.search && (n.value = 1), i.emit("update:options", r), u = r);
  }, {
    deep: !0,
    immediate: !0
  });
}
const Qo = j({
  ...Yo(),
  hideDefaultBody: Boolean,
  hideDefaultFooter: Boolean,
  hideDefaultHeader: Boolean,
  width: [String, Number],
  search: String,
  ...Ur(),
  ...Nr(),
  ...Tr(),
  ...Gr(),
  ...Rr(),
  ...Mr(),
  ...Mo(),
  ...qo()
}, "DataTable"), Xr = j({
  ...wo(),
  ...Qo(),
  ...yo(),
  ...Vl()
}, "VDataTable");
ne()({
  name: "VDataTable",
  props: Xr(),
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
      itemsPerPage: r
    } = So(e), {
      disableSort: c
    } = tl(e), {
      columns: d,
      headers: m,
      sortFunctions: v,
      sortRawFunctions: f,
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
      opened: V,
      extractRows: w,
      isGroupOpen: P,
      toggleGroup: h
    } = No({
      groupBy: l,
      sortBy: o,
      disableSort: c
    }), {
      sortedItems: _
    } = Dr(e, g, x, {
      transform: (X) => ({
        ...X.raw,
        ...X.columns
      }),
      sortFunctions: v,
      sortRawFunctions: f
    }), {
      flatItems: T
    } = Uo(_, l, V), E = A(() => T.value.length), {
      startIndex: M,
      stopIndex: F,
      pageCount: z,
      setItemsPerPage: W
    } = ko({
      page: u,
      itemsPerPage: r,
      itemsLength: E
    }), {
      paginatedItems: K
    } = Ar({
      items: T,
      startIndex: M,
      stopIndex: F,
      itemsPerPage: r
    }), te = A(() => w(K.value)), {
      isSelected: ae,
      select: ue,
      selectAll: B,
      toggleSelect: $,
      someSelected: O,
      allSelected: U
    } = Eo(e, {
      allItems: y,
      currentPage: te
    }), {
      isExpanded: he,
      toggleExpand: le
    } = Ko(e);
    Zo({
      page: u,
      itemsPerPage: r,
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
      itemsPerPage: r.value,
      sortBy: o.value,
      pageCount: z.value,
      toggleSort: I,
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
      groupedItems: K.value,
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
          var Z, ce, ge, Ce, Be, De;
          return a.default ? a.default(se.value) : C(J, null, [(Z = a.colgroup) == null ? void 0 : Z.call(a, se.value), !e.hideDefaultHeader && C("thead", {
            key: "thead"
          }, [b(va, re, a)]), (ce = a.thead) == null ? void 0 : ce.call(a, se.value), !e.hideDefaultBody && C("tbody", null, [(ge = a["body.prepend"]) == null ? void 0 : ge.call(a, se.value), a.body ? a.body(se.value) : b(fa, L(t, me, {
            items: K.value
          }), a), (Ce = a["body.append"]) == null ? void 0 : Ce.call(a, se.value)]), (Be = a.tbody) == null ? void 0 : Be.call(a, se.value), (De = a.tfoot) == null ? void 0 : De.call(a, se.value)]);
        },
        bottom: () => a.bottom ? a.bottom(se.value) : !e.hideDefaultFooter && C(J, null, [b(wa, null, null), b(ca, X, {
          prepend: a["footer.prepend"]
        })])
      });
    }), {};
  }
});
const Zr = j({
  itemsLength: {
    type: [Number, String],
    required: !0
  },
  ...wo(),
  ...Qo(),
  ...Vl()
}, "VDataTableServer"), Qr = ne()({
  name: "VDataTableServer",
  props: Zr(),
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
      itemsPerPage: r
    } = So(e), {
      disableSort: c
    } = tl(e), d = A(() => parseInt(e.itemsLength, 10)), {
      columns: m,
      headers: v
    } = Ao(e, {
      groupBy: l,
      showSelect: H(() => e.showSelect),
      showExpand: H(() => e.showExpand)
    }), {
      items: f
    } = Xo(e, m), {
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
      disableSort: c
    }), {
      pageCount: x,
      setItemsPerPage: V
    } = ko({
      page: u,
      itemsPerPage: r,
      itemsLength: d
    }), {
      flatItems: w
    } = Uo(f, l, y), {
      isSelected: P,
      select: h,
      selectAll: _,
      toggleSelect: T,
      someSelected: E,
      allSelected: M
    } = Eo(e, {
      allItems: f,
      currentPage: f
    }), {
      isExpanded: F,
      toggleExpand: z
    } = Ko(e), W = A(() => I(f.value));
    Zo({
      page: u,
      itemsPerPage: r,
      sortBy: o,
      groupBy: l,
      search: H(() => e.search)
    }), We("v-data-table", {
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
    const K = A(() => ({
      page: u.value,
      itemsPerPage: r.value,
      sortBy: o.value,
      pageCount: x.value,
      toggleSort: k,
      setItemsPerPage: V,
      someSelected: E.value,
      allSelected: M.value,
      isSelected: P,
      select: h,
      selectAll: _,
      toggleSelect: T,
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
          return ($ = a.top) == null ? void 0 : $.call(a, K.value);
        },
        default: () => {
          var $, O, U, he, le, se;
          return a.default ? a.default(K.value) : C(J, null, [($ = a.colgroup) == null ? void 0 : $.call(a, K.value), !e.hideDefaultHeader && C("thead", {
            key: "thead",
            class: "v-data-table__thead",
            role: "rowgroup"
          }, [b(va, ae, a)]), (O = a.thead) == null ? void 0 : O.call(a, K.value), !e.hideDefaultBody && C("tbody", {
            class: "v-data-table__tbody",
            role: "rowgroup"
          }, [(U = a["body.prepend"]) == null ? void 0 : U.call(a, K.value), a.body ? a.body(K.value) : b(fa, L(t, ue, {
            items: w.value
          }), a), (he = a["body.append"]) == null ? void 0 : he.call(a, K.value)]), (le = a.tbody) == null ? void 0 : le.call(a, K.value), (se = a.tfoot) == null ? void 0 : se.call(a, K.value)]);
        },
        bottom: () => a.bottom ? a.bottom(K.value) : !e.hideDefaultFooter && C(J, null, [b(wa, null, null), b(ca, te, {
          prepend: a["footer.prepend"]
        })])
      });
    });
  }
}), Jo = /* @__PURE__ */ Le({
  __name: "OxListTable",
  props: {
    // list: Object,
    /** Table headers */
    headers: Array,
    /** If True, display edit/view button */
    edit: Boolean
  },
  setup(e) {
    const n = pt(), t = Zi(n, "item.", { exclude: ["item.actions"] }), a = ve("panel"), l = ve("list"), o = ve("items"), i = ve("user"), s = e, u = A(() => s.headers.reduce((d, m) => (d.push(
      typeof m == "string" ? { key: m, title: oe(ki.field(m)) } : { key: m.key, title: oe(m.title) }
    ), d), []));
    function r(d) {
      const m = {
        ...l.filters,
        page: d.page,
        page_size: d.itemsPerPage,
        ordering: d.sortBy.map(({ key: v, order: f }) => f == "asc" ? v : `-${v}`)
      };
      l.page_size = d.itemsPerPage, l.load({ params: m });
    }
    function c(d, m) {
      a.show({ view: "detail.edit", value: m });
    }
    return (d, m) => {
      var v;
      return D(), Y(Qr, {
        items: S(o),
        "item-index": "id",
        "items-length": S(l).count || S(o).length,
        "items-per-page": S(l).page_size,
        "hide-default-footer": (S(l).count || S(o).length || 0) < S(l).page_size,
        loading: (v = S(l).state) == null ? void 0 : v.isProcessing,
        headers: u.value,
        "no-data-text": S(oe)("lists.empty"),
        class: "align-top-table",
        "onUpdate:options": r
      }, kt({
        "item.actions": R(({ item: f }) => [
          s.edit && S(i).can([f.constructor, "change"], f) ? (D(), Y(Mt, {
            key: 0,
            icon: "mdi-pencil",
            button: "",
            title: S(oe)("actions.edit"),
            item: f,
            run: c
          }, null, 8, ["title", "item"])) : s.edit && S(i).can([f.constructor, "view"], f) ? (D(), Y(Mt, {
            key: 1,
            icon: "mdi-eye-outline",
            button: "",
            title: S(oe)("actions.view"),
            item: f,
            run: c
          }, null, 8, ["title", "item"])) : de("", !0),
          G(d.$slots, "item.actions", {
            item: f,
            dense: !0,
            button: !0
          })
        ]),
        _: 2
      }, [
        Fe(S(t), (f, k) => ({
          name: k,
          fn: R((y) => [
            G(d.$slots, k, Ee($e(y)))
          ])
        }))
      ]), 1032, ["items", "items-length", "items-per-page", "hide-default-footer", "loading", "headers", "no-data-text"]);
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
      t.delay && i == Qi.PROCESSING && (a.value = !1, window.setTimeout(() => {
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
    return (i, s) => (D(), be(J, null, [
      t.state.isNone && S(n).none ? (D(), Y(S(Ot), {
        key: 0,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        state: e.state,
        title: e.noneTitle
      }, {
        default: R(() => [
          G(i.$slots, "none", { state: e.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : l.value ? (D(), Y(S(Ot), {
        key: 1,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: e.state,
        title: e.processingTitle
      }, {
        default: R(() => [
          G(i.$slots, "processing", { state: e.state }, () => [
            s[0] || (s[0] = Pe(" Data are being sent to server, please be patient. If this message persist you might wan't to retry. "))
          ])
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isError ? (D(), Y(S(Ot), {
        key: 2,
        type: "error",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: e.state,
        title: e.errorTitle
      }, {
        default: R(() => [
          G(i.$slots, "error", { state: e.state }, () => [
            s[1] || (s[1] = Pe(" Oups... something wrong happened. "))
          ]),
          G(i.$slots, "error-detail", { state: e.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isOk ? (D(), Y(S(Ot), {
        key: 3,
        type: "success",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: e.state,
        title: e.okTitle
      }, {
        default: R(() => [
          G(i.$slots, "ok", { state: e.state }, () => [
            s[2] || (s[2] = C("p", null, "Congrats! Data have been updated.", -1))
          ]),
          o.value ? (D(), be(J, { key: 0 }, [
            b(wa),
            (D(!0), be(J, null, Fe(o.value, (u) => (D(), be("p", null, Me(u), 1))), 256))
          ], 64)) : de("", !0),
          G(i.$slots, "ok-detail", { state: e.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : de("", !0),
      G(i.$slots, "default", {
        state: t.state
      })
    ], 64));
  }
}, Jr = { class: "text-right" }, Pl = {
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
    return (l, o) => (D(), be("div", Jr, [
      b(pe, {
        color: "error",
        class: "me-2",
        "prepend-icon": a.resetIcon,
        onClick: o[0] || (o[0] = (i) => t("reset")),
        disabled: a.disabled
      }, {
        default: R(() => [
          G(l.$slots, "discard", {}, () => [
            Pe(Me(a.resetLabel || S(_a)("actions.discard")), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]),
      a.state.isSending || a.state.isProcessing ? (D(), Y(pe, {
        key: 0,
        color: "primary",
        "prepend-icon": a.processingIcon,
        disabled: ""
      }, {
        default: R(() => [
          G(l.$slots, "processing", {}, () => [
            Pe(Me(a.processingLabel || S(_a)("actions.saving")), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon"])) : (D(), Y(pe, {
        key: 1,
        color: "primary",
        "prepend-icon": a.validateIcon,
        onClick: o[1] || (o[1] = (i) => t("validate")),
        disabled: a.disabled || a.validateDisabled
      }, {
        default: R(() => [
          G(l.$slots, "validate", {}, () => [
            Pe(Me(a.validateLabel || S(_a)("actions.save")), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]))
    ]));
  }
}, ec = { key: 0 }, tc = { class: "text-right mt-3" }, ac = {
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
    }), o = q(!1), i = Qe(new Ji());
    function s(r = !0) {
      ts(l, { username: "", password: "" }), r && i.none();
    }
    async function u() {
      i.processing();
      try {
        const r = await fetch(a.url, {
          method: "POST",
          headers: es.axiosConfig.headers,
          body: JSON.stringify(l)
        });
        r.status == 200 ? (l.credentials = "", l.password = "", i.ok(await r.json()), a.next && (window.location.href = a.next)) : i.error(await r.json());
      } catch (r) {
        i.ok((r == null ? void 0 : r.message) || r);
      }
    }
    return (r, c) => (D(), be(J, null, [
      b(S(Pa), { state: i }, {
        none: R(({ state: d }) => c[7] || (c[7] = [
          C("p", null, "Please enter your credentials in order too proceed...", -1)
        ])),
        "ok-detail": R(({ state: d }) => [
          a.next ? (D(), be("p", ec, [
            c[8] || (c[8] = Pe("You soon will be redirected to ")),
            C("i", null, Me(a.next), 1)
          ])) : de("", !0)
        ]),
        _: 1
      }, 8, ["state"]),
      i.isOk ? de("", !0) : (D(), be(J, { key: 0 }, [
        b(rt, {
          variant: "underlined",
          label: "Enter login",
          modelValue: l.username,
          "onUpdate:modelValue": c[0] || (c[0] = (d) => l.username = d),
          onKeyup: c[1] || (c[1] = Bl(Ie((d) => t.value.focus(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue"]),
        b(rt, {
          variant: "underlined",
          ref: "password",
          label: "Enter password",
          modelValue: l.password,
          "onUpdate:modelValue": c[2] || (c[2] = (d) => l.password = d),
          type: o.value ? "text" : "password",
          "append-icon": o.value ? "mdi-eye" : "mdi-eye-off",
          "onClick:append": c[3] || (c[3] = (d) => o.value = !o.value),
          onKeyup: c[4] || (c[4] = Bl(Ie((d) => u(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue", "type", "append-icon"]),
        C("div", tc, [
          G(r.$slots, "default", {
            value: l.password
          }, () => [
            l.username && l.password ? (D(), Y(Pl, {
              key: 0,
              "validate-label": "Login!",
              onValidate: c[5] || (c[5] = (d) => u()),
              onReset: c[6] || (c[6] = (d) => s()),
              state: i
            }, null, 8, ["state"])) : de("", !0)
          ])
        ])
      ], 64))
    ], 64));
  }
}, ei = /* @__PURE__ */ Le({
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
    const n = pt(), t = e, a = ht(n, "views."), l = q(!1);
    Ze(() => {
      l.value = !0;
    }), yi(() => {
      l.value = !1;
    });
    const o = ve("panels"), i = ve("panel");
    return (s, u) => (D(), be(J, null, [
      t.state ? (D(), Y(Pa, {
        key: 0,
        state: t.state,
        delay: ""
      }, null, 8, ["state"])) : de("", !0),
      S(n).prepend && S(o).panel == S(i).name ? G(s.$slots, "prepend", { key: 1 }) : de("", !0),
      b(wn, { class: "ma-4" }, {
        default: R(() => [
          (D(), Y(Na, {
            to: "#app-bar-sheet-title",
            disabled: !l.value || S(o).panel != t.name
          }, [
            t.icon ? (D(), Y(ke, {
              key: 0,
              icon: t.icon
            }, null, 8, ["icon"])) : de("", !0),
            Pe(" " + Me(t.title) + " ", 1),
            G(s.$slots, "append-title")
          ], 8, ["disabled"])),
          (D(), Y(Na, {
            to: "#app-bar-right",
            disabled: !l.value || S(o).panel != t.name
          }, [
            G(s.$slots, "app-bar-right"),
            t.help ? (D(), Y(pe, {
              key: 0,
              class: "ml-3",
              href: t.help,
              panels: "new",
              icon: "mdi-information-outline"
            }, null, 8, ["href"])) : de("", !0)
          ], 8, ["disabled"])),
          G(s.$slots, "top"),
          G(s.$slots, "default", {}, () => [
            S(a) ? (D(), Y(qa, {
              key: 0,
              modelValue: S(i).view,
              "onUpdate:modelValue": u[0] || (u[0] = (r) => S(i).view = r)
            }, {
              default: R(() => [
                (D(!0), be(J, null, Fe(S(a), (r, c) => (D(), Y(Xa, {
                  key: r,
                  value: r
                }, {
                  default: R(() => [
                    G(s.$slots, c)
                  ]),
                  _: 2
                }, 1032, ["value"]))), 128))
              ]),
              _: 3
            }, 8, ["modelValue"])) : de("", !0)
          ]),
          G(s.$slots, "bottom")
        ]),
        _: 3
      }),
      S(n).append && S(o).panel == S(i).name ? G(s.$slots, "append", { key: 2 }) : de("", !0)
    ], 64));
  }
}), ti = /* @__PURE__ */ Le({
  __name: "OxView",
  props: {
    /** default tab title */
    title: String
  },
  setup(e) {
    const n = e, t = q(null), a = pt(), l = ht(a, "tab.", { exclude: ["tab.default"] }), o = ht(a, "window.");
    return (i, s) => S(l) && Object.keys(S(l)).length ? (D(), be(J, { key: 0 }, [
      b(Su, {
        modelValue: t.value,
        "onUpdate:modelValue": s[0] || (s[0] = (u) => t.value = u)
      }, {
        default: R(() => [
          S(a).default ? G(i.$slots, "tab", { key: 0 }, () => [
            b(Ga, {
              text: n == null ? void 0 : n.title,
              value: "default"
            }, null, 8, ["text"])
          ]) : de("", !0),
          (D(!0), be(J, null, Fe(S(l), (u, r) => (D(), Y(Ga, { value: u }, {
            default: R(() => [
              G(i.$slots, r)
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
        default: R(() => [
          S(a).default ? (D(), Y(ua, {
            key: 0,
            value: "default"
          }, {
            default: R(() => [
              G(i.$slots, "default")
            ]),
            _: 3
          })) : de("", !0),
          (D(!0), be(J, null, Fe(S(o), (u, r) => (D(), Y(ua, { value: u }, {
            default: R(() => [
              G(i.$slots, r)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"])
    ], 64)) : G(i.$slots, "default", { key: 1 });
  }
}), ai = /* @__PURE__ */ Le({
  __name: "OxModelEditor",
  props: {
    repo: {},
    initial: {},
    name: {},
    url: {},
    saved: { type: Function }
  },
  setup(e, { expose: n }) {
    const t = q(null), a = ve("user"), l = e, { editor: o, edited: i } = Vi({ props: l }), s = A(() => a.can([o.repo.use, "change", l.initial])), u = A(() => ({
      editor: o,
      edited: i.value,
      form: t.value,
      editable: s.value,
      disabled: !s.value,
      value: o.value,
      model: o.repo.use
    }));
    return Q(() => o.errors && Object.values(o.errors), () => t.value.validate()), n({ editor: o, edited: i, form: t, editable: s }), (r, c) => (D(), be(J, null, [
      G(r.$slots, "prepend", Ee($e(u.value))),
      b(Za, {
        ref_key: "form",
        ref: t,
        modelValue: S(o).valid,
        "onUpdate:modelValue": c[0] || (c[0] = (d) => S(o).valid = d),
        disabled: !s.value
      }, {
        default: R(() => [
          G(r.$slots, "default", Ee($e(u.value)))
        ]),
        _: 3
      }, 8, ["modelValue", "disabled"]),
      G(r.$slots, "append", Ee($e(u.value)))
    ], 64));
  }
}), lc = {
  key: 0,
  class: "mb-3"
}, nc = /* @__PURE__ */ Le({
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
      const u = o.value, r = l.sendFormData ? await u.editor.save(new FormData(u.form.$el)) : await u.editor.save();
      return a("saved", o.value.editor), r;
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
    }), (u, r) => {
      var c;
      return D(), be(J, null, [
        (c = o.value) != null && c.editor ? (D(), Y(Pa, {
          key: 0,
          state: o.value.editor.state
        }, null, 8, ["state"])) : de("", !0),
        b(Ri, { class: "ox-model-edit" }, {
          default: R(() => [
            b(S(ai), L({
              ref_key: "modelEditor",
              ref: o
            }, l), {
              prepend: R((d) => [
                l.hideValidationBtn ? de("", !0) : (D(), be("div", lc, [
                  G(u.$slots, "prepend", L(d, {
                    save: s,
                    reset: i
                  }), () => [
                    d.editable && d.edited ? (D(), Y(Pl, {
                      key: 0,
                      onValidate: r[0] || (r[0] = (m) => s()),
                      onReset: r[1] || (r[1] = (m) => i()),
                      state: d.editor.state,
                      "validate-disabled": d.editor.valid === !1
                    }, null, 8, ["state", "validate-disabled"])) : de("", !0)
                  ])
                ]))
              ]),
              default: R((d) => [
                G(u.$slots, "default", L(d, {
                  save: s,
                  reset: i
                }))
              ]),
              append: R((d) => [
                G(u.$slots, "append", L(d, {
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
}), oc = /* @__PURE__ */ Le({
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
    const t = pt(), a = ht(t, "views.list."), l = ht(t, "item."), o = ht(t, "views.detail.edit."), i = A(() => !!Object.keys(o).length), s = sn("filters"), u = e, r = ve("context"), c = ve("user"), { panel: d, list: m, items: v, next: f, prev: k } = ve("panel") ?? Ci({ props: u }), y = d.panels;
    A(() => {
      var V;
      return r.user.can([d.model, (V = d.value) != null && V.id ? "change" : "add"]);
    });
    const { showFilters: p } = tl(d), g = A(() => [
      ...u.headers,
      { key: "actions", title: oe("actions") }
    ]);
    function I(V) {
      V = new u.repo.use(V), d.show({ view: d.view, value: V }), m.load();
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
    return Q(() => Object.values(m.filters), () => m.load()), n({ list: m, panel: d, items: v, next: f, prev: k }), (V, w) => (D(), Y(ei, {
      name: u.name,
      title: S(d).title,
      icon: S(d).icon,
      state: S(m).state,
      index: u.index
    }, kt({
      "app-bar-right": R(() => [
        G(V.$slots, "app-bar-right", Ee($e(x.value))),
        S(d).view.startsWith("list.") ? (D(), Y(Fl, {
          key: 0,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: R(() => [
            G(V.$slots, "nav.list", Ee($e(x.value))),
            b(pe, {
              title: S(oe)("actions.list.reload"),
              "aria-label": S(oe)("actions.list.reload"),
              onClick: w[0] || (w[0] = (P) => S(m).load())
            }, {
              default: R(() => [
                b(ke, null, {
                  default: R(() => w[10] || (w[10] = [
                    Pe("mdi-reload")
                  ])),
                  _: 1,
                  __: [10]
                })
              ]),
              _: 1
            }, 8, ["title", "aria-label"]),
            s.value ? (D(), Y(pe, {
              key: 0,
              title: S(p) ? S(oe)("filters.hide") : S(oe)("filters.show"),
              "aria-label": S(p) ? S(oe)("filters.hide") : S(oe)("filters.show"),
              onClick: w[1] || (w[1] = (P) => p.value = !S(p)),
              active: S(p)
            }, {
              default: R(() => [
                b(ke, {
                  icon: s.value.icon
                }, null, 8, ["icon"])
              ]),
              _: 1
            }, 8, ["title", "aria-label", "active"])) : de("", !0)
          ]),
          _: 3
        })) : S(d).view.startsWith("detail.") && S(d).value ? (D(), Y(Fl, {
          key: 1,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: R(() => [
            G(V.$slots, "nav.detail", Ee($e(x.value))),
            S(d).view == "detail.edit" && S(d).value ? (D(), Y(wl, { key: 0 }, {
              activator: R(({ props: P }) => [
                b(pe, L({ "prepend-icon": "mdi-dots-vertical" }, P), {
                  default: R(() => [
                    Pe(Me(S(oe)("actions")), 1)
                  ]),
                  _: 2
                }, 1040)
              ]),
              default: R(() => [
                b(ut, null, {
                  default: R(() => [
                    G(V.$slots, "item.actions", {
                      item: S(d).value
                    })
                  ]),
                  _: 3
                })
              ]),
              _: 3
            })) : de("", !0),
            b(pe, {
              disabled: !S(k),
              title: S(oe)("prev"),
              "aria-label": S(oe)("prev"),
              onClick: w[2] || (w[2] = Ie((P) => S(d).show({ view: S(d).view, value: S(k) }), ["stop"]))
            }, {
              default: R(() => [
                b(ke, { icon: "mdi-chevron-left" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"]),
            b(pe, {
              disabled: !S(f),
              title: S(oe)("next"),
              "aria-label": S(oe)("next"),
              onClick: w[3] || (w[3] = Ie((P) => S(d).show({ view: S(d).view, value: S(f) }), ["stop"]))
            }, {
              default: R(() => [
                b(ke, { icon: "mdi-chevron-right" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"])
          ]),
          _: 3
        })) : de("", !0),
        b(Mi, {
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal",
          mandatory: "",
          modelValue: S(d).view,
          "onUpdate:modelValue": w[9] || (w[9] = (P) => S(d).view = P)
        }, {
          default: R(() => {
            var P;
            return [
              b(pe, {
                value: "list.table",
                onClickCapture: w[4] || (w[4] = Ie((h) => S(d).show({ view: "list.table" }), ["stop"])),
                title: S(oe)("panels.nav.table"),
                "aria-label": S(oe)("panels.nav.table")
              }, {
                default: R(() => [
                  b(ke, null, {
                    default: R(() => w[11] || (w[11] = [
                      Pe("mdi-table")
                    ])),
                    _: 1,
                    __: [11]
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"]),
              S(t)["views.list.cards"] ? (D(), Y(pe, {
                key: 0,
                value: "list.cards",
                onClickCapture: w[5] || (w[5] = Ie((h) => S(d).show({ view: "list.cards" }), ["stop"])),
                title: S(oe)("panels.nav.cards"),
                "aria-label": S(oe)("panels.nav.cards")
              }, {
                default: R(() => [
                  b(ke, null, {
                    default: R(() => w[12] || (w[12] = [
                      Pe("mdi-card-account-details")
                    ])),
                    _: 1,
                    __: [12]
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : de("", !0),
              S(t)["views.list.kanban"] ? (D(), Y(pe, {
                key: 1,
                value: "list.kanban",
                onClickCapture: w[6] || (w[6] = Ie((h) => S(d).show({ view: "list.kanban" }), ["stop"])),
                title: S(oe)("panels.nav.kanban"),
                "aria-label": S(oe)("panels.nav.kanban")
              }, {
                default: R(() => [
                  b(ke, null, {
                    default: R(() => w[13] || (w[13] = [
                      Pe("mdi-view-column")
                    ])),
                    _: 1,
                    __: [13]
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : de("", !0),
              i.value ? (D(), Y(pe, {
                key: 2,
                value: "detail.edit",
                onClickCapture: w[7] || (w[7] = Ie((h) => S(d).show({ view: "detail.edit", value: S(d).value }), ["stop"])),
                disabled: !((P = S(d).value) != null && P.id) && S(d).view != "detail.edit",
                title: S(oe)("panels.nav.edit"),
                "aria-label": S(oe)("panels.nav.edit")
              }, {
                default: R(() => [
                  S(c).can([S(d).model, "change"]) ? (D(), Y(ke, { key: 0 }, {
                    default: R(() => w[14] || (w[14] = [
                      Pe("mdi-pencil")
                    ])),
                    _: 1,
                    __: [14]
                  })) : (D(), Y(ke, { key: 1 }, {
                    default: R(() => w[15] || (w[15] = [
                      Pe("mdi-eye")
                    ])),
                    _: 1,
                    __: [15]
                  }))
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"])) : de("", !0),
              i.value && S(c).can([S(d).model, "add"]) ? (D(), Y(pe, {
                key: 3,
                value: "detail.add",
                onClickCapture: w[8] || (w[8] = Ie((h) => S(d).create(), ["stop"])),
                title: S(oe)("panels.nav.add"),
                "aria-label": S(oe)("panels.nav.add")
              }, {
                default: R(() => [
                  b(ke, null, {
                    default: R(() => w[16] || (w[16] = [
                      Pe("mdi-plus-box")
                    ])),
                    _: 1,
                    __: [16]
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : de("", !0),
              G(V.$slots, "nav.views", Ee($e(x.value)))
            ];
          }),
          _: 3
        }, 8, ["modelValue"]),
        G(V.$slots, "app-bar-end", Ee($e(x.value)))
      ]),
      top: R(() => [
        u.warning ? (D(), Y(Ot, {
          key: 0,
          type: "warning",
          variant: "tonal",
          text: u.warning
        }, null, 8, ["text"])) : de("", !0),
        G(V.$slots, "top"),
        Ke(b(bo, {
          ref_key: "filters",
          ref: s,
          search: u.search,
          "teleport-to": "#panel-list-actions"
        }, {
          default: R((P) => [
            G(V.$slots, "list.filters", Ee($e(P)))
          ]),
          _: 3
        }, 8, ["search"]), [
          [Bt, S(d).view.startsWith("list.") && S(p)]
        ])
      ]),
      _: 2
    }, [
      S(t)["append-title"] ? {
        name: "append-title",
        fn: R(() => [
          G(V.$slots, "append-title", Ee($e(x.value)))
        ]),
        key: "0"
      } : void 0,
      S(t).prepend ? {
        name: "prepend",
        fn: R(() => [
          G(V.$slots, "prepend", Ee($e(x.value)))
        ]),
        key: "1"
      } : void 0,
      S(t).append ? {
        name: "append",
        fn: R(() => [
          G(V.$slots, "append", Ee($e(x.value)))
        ]),
        key: "2"
      } : void 0,
      S(t)["views.list.table"] ? void 0 : {
        name: "views.list.table",
        fn: R(() => [
          b(Jo, {
            headers: g.value,
            edit: i.value
          }, kt({ _: 2 }, [
            Fe(S(l), (P, h) => ({
              name: h,
              fn: R((_) => [
                G(V.$slots, h, Ee($e(_)))
              ])
            }))
          ]), 1032, ["headers", "edit"])
        ]),
        key: "3"
      },
      Fe(S(a), (P, h) => ({
        name: h,
        fn: R(() => [
          G(V.$slots, h, Ee($e(x.value)))
        ])
      })),
      i.value ? {
        name: "views.detail.edit",
        fn: R(() => [
          b(S(ti), {
            title: S(oe)(`models.${S(d).model.entity}`)
          }, kt({ _: 2 }, [
            Fe(S(o), (P, h) => ({
              name: P,
              fn: R(() => [
                G(V.$slots, h, Ee($e(x.value)))
              ])
            }))
          ]), 1032, ["title"])
        ]),
        key: "4"
      } : void 0
    ]), 1032, ["name", "title", "icon", "state", "index"]));
  }
}), ic = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OxAction: Mt,
  OxActionModelDelete: ms,
  OxActionPost: gs,
  OxApp: Vu,
  OxAutocomplete: ir,
  OxComponent: sr,
  OxField: cr,
  OxFormList: fr,
  OxListFilters: bo,
  OxListKanban: Vr,
  OxListTable: Jo,
  OxLogin: ac,
  OxModelEdit: nc,
  OxModelEditor: ai,
  OxModelPanel: oc,
  OxPanel: ei,
  OxStateAlert: Pa,
  OxValidationBtn: Pl,
  OxView: ti
}, Symbol.toStringTag, { value: "Module" })), mc = {
  el: "#app",
  delimiters: ["[[", "]]"],
  components: { ...ic, ...as }
};
export {
  mc as App,
  Mt as OxAction,
  ms as OxActionModelDelete,
  gs as OxActionPost,
  Vu as OxApp,
  ir as OxAutocomplete,
  sr as OxComponent,
  cr as OxField,
  fr as OxFormList,
  bo as OxListFilters,
  Vr as OxListKanban,
  Jo as OxListTable,
  ac as OxLogin,
  nc as OxModelEdit,
  ai as OxModelEditor,
  oc as OxModelPanel,
  ei as OxPanel,
  Pa as OxStateAlert,
  Pl as OxValidationBtn,
  ti as OxView
};
//# sourceMappingURL=components.js.map
