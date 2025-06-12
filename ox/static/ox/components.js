import { inject as de, computed as I, ref as X, reactive as Xe, toRef as N, shallowRef as Q, onMounted as Qe, provide as ze, useId as gt, onDeactivated as Zl, onActivated as ai, onBeforeUnmount as yt, createVNode as h, Transition as Jt, mergeProps as H, defineComponent as qe, useAttrs as Ga, createElementBlock as be, createCommentVNode as ce, unref as x, openBlock as L, Fragment as J, createBlock as Z, withModifiers as Ie, useSlots as ut, renderSlot as j, normalizeProps as Ae, guardReactiveProps as _e, resolveComponent as li, withCtx as F, createTextVNode as Pe, toDisplayString as Fe, renderList as De, watch as ee, watchEffect as tt, onScopeDispose as We, readonly as Ql, createElementVNode as P, nextTick as $e, mergeModels as Ya, useModel as qa, normalizeStyle as Ve, normalizeClass as ve, effectScope as Jl, toValue as Sl, toRaw as Ea, warn as ni, Teleport as $a, withDirectives as Ze, vShow as It, onErrorCaptured as oi, createSlots as xt, markRaw as ii, onBeforeMount as si, cloneVNode as ri, h as ui, onBeforeUpdate as ci, capitalize as di, toRefs as Xa, useTemplateRef as en, withKeys as xl, onUnmounted as vi } from "vue";
import { useAction as fi, t as ie, filterSlots as ft, useAppContext as mi, usePanels as gi, useQuery as yi, defineAsyncComponent as hi, tKeys as bi, useModelEditor as pi, useModelPanel as wi } from "ox";
import { u as kt, V as pe, a as je, b as Si, c as Oa, d as Dt, e as va, f as st, g as fa, h as Tt, i as tn, j as ma, t as xi, k as ne, l as ga, m as Le, n as Ue, o as ht, p as Lt, q as Se, r as Mt, s as rt, v as ki, w as an, x as Rt, y as Nt, z as kl, A as wa, B as Sa, C as Vl, D as Cl, E as Ht, F as Vi, M as ya, G as ln, H as Za, I as zt, J as nn, K as on, L as Qa, N as Ci, O as Wt, P as Ja, Q as el, R as tl, S as Pl, T as xe, U as sn, W as At, X as ct, Y as Vt, Z as rn, _ as Pi, $ as un, a0 as cn, a1 as Ct, a2 as dn, a3 as vn, a4 as al, a5 as ll, a6 as nl, a7 as Il, a8 as Ii, a9 as fn, aa as Ti, ab as Ai, ac as _i, ad as mn, ae as Bt, af as Bi, ag as Tl, ah as Ei } from "./VContainer-mAdd3mcq.js";
import { k as ol, l as gn, n as U, o as ye, q as lt, r as $i, s as le, C as yn, u as Ge, t as Je, v as Oi, w as nt, x as Ke, y as dt, z as ke, A as at, B as Re, E as Ut, F as hn, G as Fi, H as it, J as bn, i as He, K as Al, M as Pt, N as Di, O as bt, P as pn, Q as ot, R as we, S as Fa, U as Li, V as Ye, W as wn, X as Ne, Y as Sn, Z as xn, _ as Mi, $ as Ri, a0 as xa, a1 as Ni, a2 as Hi, a3 as St, a4 as zi, a5 as kn, a6 as ea, a7 as Wi, c as Yt, a8 as _l, a9 as Ui, aa as ta, ab as qt } from "./theme-BVAWnHOc.js";
import { T as Ki, l as ka, O as ji, F as Gi, t as Va, S as Yi, o as qi, r as Xi } from "./i18n-LUmMpxv0.js";
import "axios";
import { components as Zi } from "ox/vendor";
class et {
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
function Bl(e, l) {
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
function Vn(e) {
  return Array.isArray(e) ? new et({
    x: e[0],
    y: e[1],
    width: 0,
    height: 0
  }) : e.getBoundingClientRect();
}
function Qi(e) {
  if (e === document.documentElement)
    return visualViewport ? new et({
      x: visualViewport.scale > 1 ? 0 : visualViewport.offsetLeft,
      y: visualViewport.scale > 1 ? 0 : visualViewport.offsetTop,
      width: visualViewport.width * visualViewport.scale,
      height: visualViewport.height * visualViewport.scale
    }) : new et({
      x: 0,
      y: 0,
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });
  {
    const l = e.getBoundingClientRect();
    return new et({
      x: l.x,
      y: l.y,
      width: e.clientWidth,
      height: e.clientHeight
    });
  }
}
function il(e) {
  const l = e.getBoundingClientRect(), t = getComputedStyle(e), a = t.transform;
  if (a) {
    let n, o, i, s, r;
    if (a.startsWith("matrix3d("))
      n = a.slice(9, -1).split(/, /), o = Number(n[0]), i = Number(n[5]), s = Number(n[12]), r = Number(n[13]);
    else if (a.startsWith("matrix("))
      n = a.slice(7, -1).split(/, /), o = Number(n[0]), i = Number(n[3]), s = Number(n[4]), r = Number(n[5]);
    else
      return new et(l);
    const c = t.transformOrigin, u = l.x - s - (1 - o) * parseFloat(c), d = l.y - r - (1 - i) * parseFloat(c.slice(c.indexOf(" ") + 1)), m = o ? l.width / o : e.offsetWidth + 1, v = i ? l.height / i : e.offsetHeight + 1;
    return new et({
      x: u,
      y: d,
      width: m,
      height: v
    });
  } else
    return new et(l);
}
function vt(e, l, t) {
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
const Zt = /* @__PURE__ */ new WeakMap();
function Ji(e, l) {
  Object.keys(l).forEach((t) => {
    if (ol(t)) {
      const a = gn(t), n = Zt.get(e);
      if (l[t] == null)
        n == null || n.forEach((o) => {
          const [i, s] = o;
          i === a && (e.removeEventListener(a, s), n.delete(o));
        });
      else if (!n || ![...n].some((o) => o[0] === a && o[1] === l[t])) {
        e.addEventListener(a, l[t]);
        const o = n || /* @__PURE__ */ new Set();
        o.add([a, l[t]]), Zt.has(e) || Zt.set(e, o);
      }
    } else
      l[t] == null ? e.removeAttribute(t) : e.setAttribute(t, l[t]);
  });
}
function es(e, l) {
  Object.keys(l).forEach((t) => {
    if (ol(t)) {
      const a = gn(t), n = Zt.get(e);
      n == null || n.forEach((o) => {
        const [i, s] = o;
        i === a && (e.removeEventListener(a, s), n.delete(o));
      });
    } else
      e.removeAttribute(t);
  });
}
function Cn(e) {
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
function El(e, l, t) {
  return Object.keys(e).filter((a) => ol(a) && a.endsWith(l)).reduce((a, n) => (a[n.slice(0, -l.length)] = (o) => e[n](o, t(o)), a), {});
}
function Pn(e) {
  let l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  for (; e; ) {
    if (l ? ls(e) : sl(e)) return e;
    e = e.parentElement;
  }
  return document.scrollingElement;
}
function aa(e, l) {
  const t = [];
  if (l && e && !l.contains(e)) return t;
  for (; e && (sl(e) && t.push(e), e !== l); )
    e = e.parentElement;
  return t;
}
function sl(e) {
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
const $t = Symbol.for("vuetify:layout"), In = Symbol.for("vuetify:layout-item"), $l = 1e3, os = U({
  overlaps: {
    type: Array,
    default: () => []
  },
  fullHeight: Boolean
}, "layout"), Tn = U({
  name: {
    type: String
  },
  order: {
    type: [Number, String],
    default: 0
  },
  absolute: Boolean
}, "layout-item");
function An() {
  const e = de($t);
  if (!e) throw new Error("[Vuetify] Could not find injected layout");
  return {
    getLayoutItem: e.getLayoutItem,
    mainRect: e.mainRect,
    mainStyles: e.mainStyles
  };
}
function _n(e) {
  const l = de($t);
  if (!l) throw new Error("[Vuetify] Could not find injected layout");
  const t = e.id ?? `layout-item-${gt()}`, a = lt("useLayoutItem");
  ze(In, {
    id: t
  });
  const n = Q(!1);
  Zl(() => n.value = !0), ai(() => n.value = !1);
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
    const s = l.get(i), r = t.get(i), c = a.get(i);
    if (!s || !r || !c) continue;
    const u = {
      ...n,
      [s.value]: parseInt(n[s.value], 10) + (c.value ? parseInt(r.value, 10) : 0)
    };
    o.push({
      id: i,
      layer: u
    }), n = u;
  }
  return o;
};
function ss(e) {
  const l = de($t, null), t = I(() => l ? l.rootZIndex.value - 100 : $l), a = X([]), n = Xe(/* @__PURE__ */ new Map()), o = Xe(/* @__PURE__ */ new Map()), i = Xe(/* @__PURE__ */ new Map()), s = Xe(/* @__PURE__ */ new Map()), r = Xe(/* @__PURE__ */ new Map()), {
    resizeRef: c,
    contentRect: u
  } = kt(), d = I(() => {
    const k = /* @__PURE__ */ new Map(), T = e.overlaps ?? [];
    for (const b of T.filter((B) => B.includes(":"))) {
      const [B, _] = b.split(":");
      if (!a.value.includes(B) || !a.value.includes(_)) continue;
      const $ = n.get(B), M = n.get(_), D = o.get(B), K = o.get(_);
      !$ || !M || !D || !K || (k.set(_, {
        position: $.value,
        amount: parseInt(D.value, 10)
      }), k.set(B, {
        position: M.value,
        amount: -parseInt(K.value, 10)
      }));
    }
    return k;
  }), m = I(() => {
    const k = [...new Set([...i.values()].map((b) => b.value))].sort((b, B) => b - B), T = [];
    for (const b of k) {
      const B = a.value.filter((_) => {
        var $;
        return (($ = i.get(_)) == null ? void 0 : $.value) === b;
      });
      T.push(...B);
    }
    return is(T, n, o, s);
  }), v = I(() => !Array.from(r.values()).some((k) => k.value)), f = I(() => m.value[m.value.length - 1].layer), V = N(() => ({
    "--v-layout-left": ye(f.value.left),
    "--v-layout-right": ye(f.value.right),
    "--v-layout-top": ye(f.value.top),
    "--v-layout-bottom": ye(f.value.bottom),
    ...v.value ? void 0 : {
      transition: "none"
    }
  })), y = I(() => m.value.slice(1).map((k, T) => {
    let {
      id: b
    } = k;
    const {
      layer: B
    } = m.value[T], _ = o.get(b), $ = n.get(b);
    return {
      id: b,
      ...B,
      size: Number(_.value),
      position: $.value
    };
  })), w = (k) => y.value.find((T) => T.id === k), g = lt("createLayout"), C = Q(!1);
  Qe(() => {
    C.value = !0;
  }), ze($t, {
    register: (k, T) => {
      let {
        id: b,
        order: B,
        position: _,
        layoutSize: $,
        elementSize: M,
        active: D,
        disableTransitions: K,
        absolute: W
      } = T;
      i.set(b, B), n.set(b, _), o.set(b, $), s.set(b, D), K && r.set(b, K);
      const ae = $i(In, g == null ? void 0 : g.vnode).indexOf(k);
      ae > -1 ? a.value.splice(ae, 0, b) : a.value.push(b);
      const oe = I(() => y.value.findIndex((O) => O.id === b)), fe = I(() => t.value + m.value.length * 2 - oe.value * 2), A = I(() => {
        const O = _.value === "left" || _.value === "right", z = _.value === "right", he = _.value === "bottom", te = M.value ?? $.value, ue = te === 0 ? "%" : "px", q = {
          [_.value]: 0,
          zIndex: fe.value,
          transform: `translate${O ? "X" : "Y"}(${(D.value ? 0 : -(te === 0 ? 100 : te)) * (z || he ? -1 : 1)}${ue})`,
          position: W.value || t.value !== $l ? "absolute" : "fixed",
          ...v.value ? void 0 : {
            transition: "none"
          }
        };
        if (!C.value) return q;
        const se = y.value[oe.value];
        if (!se) throw new Error(`[Vuetify] Could not find layout item "${b}"`);
        const me = d.value.get(b);
        return me && (se[me.position] += me.amount), {
          ...q,
          height: O ? `calc(100% - ${se.top}px - ${se.bottom}px)` : M.value ? `${M.value}px` : void 0,
          left: z ? void 0 : `${se.left}px`,
          right: z ? `${se.right}px` : void 0,
          top: _.value !== "bottom" ? `${se.top}px` : void 0,
          bottom: _.value !== "top" ? `${se.bottom}px` : void 0,
          width: O ? M.value ? `${M.value}px` : void 0 : `calc(100% - ${se.left}px - ${se.right}px)`
        };
      }), E = I(() => ({
        zIndex: fe.value - 1
      }));
      return {
        layoutItemStyles: A,
        layoutItemScrimStyles: E,
        zIndex: fe
      };
    },
    unregister: (k) => {
      i.delete(k), n.delete(k), o.delete(k), s.delete(k), r.delete(k), a.value = a.value.filter((T) => T !== k);
    },
    mainRect: f,
    mainStyles: V,
    getLayoutItem: w,
    items: y,
    layoutRect: u,
    rootZIndex: t
  });
  const S = N(() => ["v-layout", {
    "v-layout--full-height": e.fullHeight
  }]), p = N(() => ({
    zIndex: l ? t.value : void 0,
    position: l ? "relative" : void 0,
    overflow: l ? "hidden" : void 0
  }));
  return {
    layoutClasses: S,
    layoutStyles: p,
    getLayoutItem: w,
    items: y,
    layoutRect: u,
    layoutRef: c
  };
}
const rs = U({
  target: [Object, Array]
}, "v-dialog-transition"), Ca = /* @__PURE__ */ new WeakMap(), Bn = le()({
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
        var v;
        await new Promise((f) => requestAnimationFrame(f)), await new Promise((f) => requestAnimationFrame(f)), n.style.visibility = "";
        const i = Fl(e.target, n), {
          x: s,
          y: r,
          sx: c,
          sy: u,
          speed: d
        } = i;
        Ca.set(n, i);
        const m = vt(n, [{
          transform: `translate(${s}px, ${r}px) scale(${c}, ${u})`,
          opacity: 0
        }, {}], {
          duration: 225 * d,
          easing: ts
        });
        (v = Ol(n)) == null || v.forEach((f) => {
          vt(f, [{
            opacity: 0
          }, {
            opacity: 0,
            offset: 0.33
          }, {}], {
            duration: 225 * 2 * d,
            easing: Et
          });
        }), m.finished.then(() => o());
      },
      onAfterEnter(n) {
        n.style.removeProperty("pointer-events");
      },
      onBeforeLeave(n) {
        n.style.pointerEvents = "none";
      },
      async onLeave(n, o) {
        var v;
        await new Promise((f) => requestAnimationFrame(f));
        let i;
        !Ca.has(n) || Array.isArray(e.target) || e.target.offsetParent || e.target.getClientRects().length ? i = Fl(e.target, n) : i = Ca.get(n);
        const {
          x: s,
          y: r,
          sx: c,
          sy: u,
          speed: d
        } = i;
        vt(n, [{}, {
          transform: `translate(${s}px, ${r}px) scale(${c}, ${u})`,
          opacity: 0
        }], {
          duration: 125 * d,
          easing: as
        }).finished.then(() => o()), (v = Ol(n)) == null || v.forEach((f) => {
          vt(f, [{}, {
            opacity: 0,
            offset: 0.2
          }, {
            opacity: 0
          }], {
            duration: 125 * 2 * d,
            easing: Et
          });
        });
      },
      onAfterLeave(n) {
        n.style.removeProperty("pointer-events");
      }
    };
    return () => e.target ? h(Jt, H({
      name: "dialog-transition"
    }, a, {
      css: !1
    }), t) : h(Jt, {
      name: "dialog-transition"
    }, t);
  }
});
function Ol(e) {
  var t;
  const l = (t = e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")) == null ? void 0 : t.children;
  return l && [...l];
}
function Fl(e, l) {
  const t = Vn(e), a = il(l), [n, o] = getComputedStyle(l).transformOrigin.split(" ").map((w) => parseFloat(w)), [i, s] = getComputedStyle(l).getPropertyValue("--v-overlay-anchor-origin").split(" ");
  let r = t.left + t.width / 2;
  i === "left" || s === "left" ? r -= t.width / 2 : (i === "right" || s === "right") && (r += t.width / 2);
  let c = t.top + t.height / 2;
  i === "top" || s === "top" ? c -= t.height / 2 : (i === "bottom" || s === "bottom") && (c += t.height / 2);
  const u = t.width / a.width, d = t.height / a.height, m = Math.max(1, u, d), v = u / m || 0, f = d / m || 0, V = a.width * a.height / (window.innerWidth * window.innerHeight), y = V > 0.12 ? Math.min(1.5, (V - 0.12) * 10 + 1) : 1;
  return {
    x: r - (n + a.left),
    y: c - (o + a.top),
    sx: v,
    sy: f,
    speed: y
  };
}
const la = /* @__PURE__ */ qe({
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
    const t = e, a = Ga(), n = l, o = de("user"), { run: i, processing: s, allowed: r } = fi({ user: o, emits: n, props: t });
    return (c, u) => x(r) ? (L(), be(J, { key: 0 }, [
      t.button ? (L(), Z(pe, H({
        key: 0,
        variant: "text"
      }, x(a), {
        disabled: x(s),
        color: t.color,
        icon: t.icon,
        title: t.title,
        "aria-label": t.title,
        onClick: Ie(x(i), ["stop"])
      }), null, 16, ["disabled", "color", "icon", "title", "aria-label", "onClick"])) : (L(), Z(je, H({ key: 1 }, x(a), {
        title: t.title,
        "base-color": t.color,
        "prepend-icon": t.icon,
        disabled: x(s),
        onClick: Ie(x(i), ["stop"])
      }), null, 16, ["title", "base-color", "prepend-icon", "disabled", "onClick"]))
    ], 64)) : ce("", !0);
  }
}), us = /* @__PURE__ */ qe({
  __name: "OxActionModelDelete",
  props: {
    item: {}
  },
  setup(e) {
    const l = de("panel"), t = de("repos"), a = Ga(), n = e;
    async function o(i, s) {
      return await t[s.constructor.entity].api().delete(s.$url(), { delete: n.item.id });
    }
    return (i, s) => (L(), Z(la, H(x(a), {
      item: n.item,
      icon: "mdi-delete",
      color: "error",
      title: x(ie)("actions.delete"),
      confirm: x(ie)("actions.delete.confirm"),
      permission: [n.item.constructor, "delete"],
      run: o,
      onCompleted: s[0] || (s[0] = (r) => {
        var c;
        return (c = x(l)) == null ? void 0 : c.show({ view: x(l).index });
      })
    }), null, 16, ["item", "title", "confirm", "permission"]));
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
    ut();
    const l = e;
    return (t, a) => (L(), be(J, null, [
      j(t.$slots, "before", Ae(_e(l))),
      j(t.$slots, "default", Ae(_e(l))),
      j(t.$slots, "after", Ae(_e(l)))
    ], 64));
  }
}, ds = /* @__PURE__ */ qe({
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
    X(null);
    const t = de("user"), a = de("panels");
    I(() => !l.auto || panel.name == l.name);
    function n(i) {
      return i.permissions && !t.can(i.permissions) ? !1 : i.items ? i.items.some((s) => n(s)) : !0;
    }
    function o() {
      const i = { panel: l.name, href: l.url };
      a.show(i);
    }
    return (i, s) => {
      const r = li("ox-app-nav-item", !0);
      return n(l) ? (L(), be(J, { key: 0 }, [
        l.type == "subheader" ? (L(), be(J, { key: 0 }, [
          h(Si, null, {
            default: F(() => [
              Pe(Fe(l.title), 1)
            ]),
            _: 1
          }),
          l.items ? (L(!0), be(J, { key: 0 }, De(l.items, (c) => (L(), Z(r, H({ ref_for: !0 }, c), null, 16))), 256)) : ce("", !0)
        ], 64)) : l.type == "group" ? (L(), Z(Oa, {
          key: 1,
          value: l.name
        }, {
          activator: F(({ props: c }) => [
            h(je, H(c, {
              title: l.title,
              "prepend-icon": l.icon
            }), null, 16, ["title", "prepend-icon"])
          ]),
          default: F(() => [
            (L(!0), be(J, null, De(l.items, (c, u) => (L(), Z(r, H({
              key: u,
              ref_for: !0
            }, c), null, 16))), 128))
          ]),
          _: 1
        }, 8, ["value"])) : l.type == "divider" ? (L(), Z(Dt, { key: 2 })) : (L(), Z(je, {
          key: 3,
          active: x(a).panel == l.name,
          value: l.name,
          "prepend-icon": l.icon,
          title: l.title,
          onClick: Ie(o, ["stop"])
        }, null, 8, ["active", "value", "prepend-icon", "title"]))
      ], 64)) : ce("", !0);
    };
  }
});
function vs(e) {
  let {
    rootEl: l,
    isSticky: t,
    layoutItemStyles: a
  } = e;
  const n = Q(!1), o = Q(0), i = I(() => {
    const c = typeof n.value == "boolean" ? "top" : n.value;
    return [t.value ? {
      top: "auto",
      bottom: "auto",
      height: void 0
    } : void 0, n.value ? {
      [c]: ye(o.value)
    } : {
      top: a.value.top
    }];
  });
  Qe(() => {
    ee(t, (c) => {
      c ? window.addEventListener("scroll", r, {
        passive: !0
      }) : window.removeEventListener("scroll", r);
    }, {
      immediate: !0
    });
  }), yt(() => {
    window.removeEventListener("scroll", r);
  });
  let s = 0;
  function r() {
    const c = s > window.scrollY ? "up" : "down", u = l.value.getBoundingClientRect(), d = parseFloat(a.value.top ?? 0), m = window.scrollY - Math.max(0, o.value - d), v = u.height + Math.max(o.value, d) - window.scrollY - window.innerHeight, f = parseFloat(getComputedStyle(l.value).getPropertyValue("--v-body-scroll-y")) || 0;
    u.height < window.innerHeight - d ? (n.value = "top", o.value = d) : c === "up" && n.value === "bottom" || c === "down" && n.value === "top" ? (o.value = window.scrollY + u.top - f, n.value = !0) : c === "down" && v <= 0 ? (o.value = 0, n.value = "bottom") : c === "up" && m <= 0 && (f ? n.value !== "top" && (o.value = -m + f + d, n.value = "top") : (o.value = u.top + m, n.value = "top")), s = window.scrollY;
  }
  return {
    isStuck: n,
    stickyStyles: i
  };
}
const fs = 100, ms = 20;
function Dl(e) {
  return (e < 0 ? -1 : 1) * Math.sqrt(Math.abs(e)) * 1.41421356237;
}
function Ll(e) {
  if (e.length < 2)
    return 0;
  if (e.length === 2)
    return e[1].t === e[0].t ? 0 : (e[1].d - e[0].d) / (e[1].t - e[0].t);
  let l = 0;
  for (let t = e.length - 1; t > 0; t--) {
    if (e[t].t === e[t - 1].t)
      continue;
    const a = Dl(l), n = (e[t].d - e[t - 1].d) / (e[t].t - e[t - 1].t);
    l += (n - a) * Math.abs(n), t === e.length - 1 && (l *= 0.5);
  }
  return Dl(l) * 1e3;
}
function gs() {
  const e = {};
  function l(n) {
    Array.from(n.changedTouches).forEach((o) => {
      (e[o.identifier] ?? (e[o.identifier] = new yn(ms))).push([n.timeStamp, o]);
    });
  }
  function t(n) {
    Array.from(n.changedTouches).forEach((o) => {
      delete e[o.identifier];
    });
  }
  function a(n) {
    var c;
    const o = (c = e[n]) == null ? void 0 : c.values().reverse();
    if (!o)
      throw new Error(`No samples for touch id ${n}`);
    const i = o[0], s = [], r = [];
    for (const u of o) {
      if (i[0] - u[0] > fs) break;
      s.push({
        t: u[0],
        d: u[1].clientX
      }), r.push({
        t: u[0],
        d: u[1].clientY
      });
    }
    return {
      x: Ll(s),
      y: Ll(r),
      get direction() {
        const {
          x: u,
          y: d
        } = this, [m, v] = [Math.abs(u), Math.abs(d)];
        return m > v && u >= 0 ? "right" : m > v && u <= 0 ? "left" : v > m && d >= 0 ? "down" : v > m && d <= 0 ? "up" : ys();
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
  Qe(() => {
    window.addEventListener("touchstart", g, {
      passive: !0
    }), window.addEventListener("touchmove", C, {
      passive: !1
    }), window.addEventListener("touchend", S, {
      passive: !0
    });
  }), yt(() => {
    window.removeEventListener("touchstart", g), window.removeEventListener("touchmove", C), window.removeEventListener("touchend", S);
  });
  const s = I(() => ["left", "right"].includes(i.value)), {
    addMovement: r,
    endTouch: c,
    getVelocity: u
  } = gs();
  let d = !1;
  const m = Q(!1), v = Q(0), f = Q(0);
  let V;
  function y(k, T) {
    return (i.value === "left" ? k : i.value === "right" ? document.documentElement.clientWidth - k : i.value === "top" ? k : i.value === "bottom" ? document.documentElement.clientHeight - k : wt()) - (T ? n.value : 0);
  }
  function w(k) {
    let T = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    const b = i.value === "left" ? (k - f.value) / n.value : i.value === "right" ? (document.documentElement.clientWidth - k - f.value) / n.value : i.value === "top" ? (k - f.value) / n.value : i.value === "bottom" ? (document.documentElement.clientHeight - k - f.value) / n.value : wt();
    return T ? Je(b) : b;
  }
  function g(k) {
    if (o.value) return;
    const T = k.changedTouches[0].clientX, b = k.changedTouches[0].clientY, B = 25, _ = i.value === "left" ? T < B : i.value === "right" ? T > document.documentElement.clientWidth - B : i.value === "top" ? b < B : i.value === "bottom" ? b > document.documentElement.clientHeight - B : wt(), $ = t.value && (i.value === "left" ? T < n.value : i.value === "right" ? T > document.documentElement.clientWidth - n.value : i.value === "top" ? b < n.value : i.value === "bottom" ? b > document.documentElement.clientHeight - n.value : wt());
    (_ || $ || t.value && a.value) && (V = [T, b], f.value = y(s.value ? T : b, t.value), v.value = w(s.value ? T : b), d = f.value > -20 && f.value < 80, c(k), r(k));
  }
  function C(k) {
    const T = k.changedTouches[0].clientX, b = k.changedTouches[0].clientY;
    if (d) {
      if (!k.cancelable) {
        d = !1;
        return;
      }
      const _ = Math.abs(T - V[0]), $ = Math.abs(b - V[1]);
      (s.value ? _ > $ && _ > 3 : $ > _ && $ > 3) ? (m.value = !0, d = !1) : (s.value ? $ : _) > 3 && (d = !1);
    }
    if (!m.value) return;
    k.preventDefault(), r(k);
    const B = w(s.value ? T : b, !1);
    v.value = Math.max(0, Math.min(1, B)), B > 1 ? f.value = y(s.value ? T : b, !0) : B < 0 && (f.value = y(s.value ? T : b, !1));
  }
  function S(k) {
    if (d = !1, !m.value) return;
    r(k), m.value = !1;
    const T = u(k.changedTouches[0].identifier), b = Math.abs(T.x), B = Math.abs(T.y);
    (s.value ? b > B && b > 400 : B > b && B > 3) ? t.value = T.direction === ({
      left: "right",
      right: "left",
      top: "down",
      bottom: "up"
    }[i.value] || wt()) : t.value = v.value > 0.5;
  }
  const p = I(() => m.value ? {
    transform: i.value === "left" ? `translateX(calc(-100% + ${v.value * n.value}px))` : i.value === "right" ? `translateX(calc(100% - ${v.value * n.value}px))` : i.value === "top" ? `translateY(calc(-100% + ${v.value * n.value}px))` : i.value === "bottom" ? `translateY(calc(100% - ${v.value * n.value}px))` : wt(),
    transition: "none"
  } : void 0);
  return Ge(m, () => {
    var b, B;
    const k = ((b = l.value) == null ? void 0 : b.style.transform) ?? null, T = ((B = l.value) == null ? void 0 : B.style.transition) ?? null;
    tt(() => {
      var _, $, M, D;
      ($ = l.value) == null || $.style.setProperty("transform", ((_ = p.value) == null ? void 0 : _.transform) || "none"), (D = l.value) == null || D.style.setProperty("transition", ((M = p.value) == null ? void 0 : M.transition) || null);
    }), We(() => {
      var _, $;
      (_ = l.value) == null || _.style.setProperty("transform", k), ($ = l.value) == null || $.style.setProperty("transition", T);
    });
  }), {
    isDragging: m,
    dragProgress: v,
    dragStyles: p
  };
}
function wt() {
  throw new Error();
}
const En = U({
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
      t = Oi(s, () => {
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
function Kt() {
  const l = lt("useScopeId").vnode.scopeId;
  return {
    scopeId: l ? {
      [l]: ""
    } : void 0
  };
}
const bs = ["start", "end", "left", "right", "top", "bottom"], ps = U({
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
  ...Mt(),
  ...Se(),
  ...En(),
  ...Ut({
    mobile: null
  }),
  ...Lt(),
  ...Tn(),
  ...ht(),
  ...Ue({
    tag: "nav"
  }),
  ...Re()
}, "VNavigationDrawer"), ws = le()({
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
    } = nt(), {
      themeClasses: i
    } = Ke(e), {
      borderClasses: s
    } = va(e), {
      backgroundColorClasses: r,
      backgroundColorStyles: c
    } = st(() => e.color), {
      elevationClasses: u
    } = fa(e), {
      displayClasses: d,
      mobile: m
    } = dt(e), {
      roundedClasses: v
    } = Tt(e), f = tn(), V = ke(e, "modelValue", null, (A) => !!A), {
      ssrBootStyles: y
    } = ma(), {
      scopeId: w
    } = Kt(), g = X(), C = Q(!1), {
      runOpenDelay: S,
      runCloseDelay: p
    } = $n(e, (A) => {
      C.value = A;
    }), k = I(() => e.rail && e.expandOnHover && C.value ? Number(e.width) : Number(e.rail ? e.railWidth : e.width)), T = I(() => xi(e.location, o.value)), b = N(() => e.persistent), B = I(() => !e.permanent && (m.value || e.temporary)), _ = I(() => e.sticky && !B.value && T.value !== "bottom");
    Ge(() => e.expandOnHover && e.rail != null, () => {
      ee(C, (A) => a("update:rail", !A));
    }), Ge(() => !e.disableResizeWatcher, () => {
      ee(B, (A) => !e.permanent && $e(() => V.value = !A));
    }), Ge(() => !e.disableRouteWatcher && !!f, () => {
      ee(f.currentRoute, () => B.value && (V.value = !1));
    }), ee(() => e.permanent, (A) => {
      A && (V.value = !0);
    }), e.modelValue == null && !B.value && (V.value = e.permanent || !m.value);
    const {
      isDragging: $,
      dragProgress: M
    } = hs({
      el: g,
      isActive: V,
      isTemporary: B,
      width: k,
      touchless: N(() => e.touchless),
      position: T
    }), D = I(() => {
      const A = B.value ? 0 : e.rail && e.expandOnHover ? Number(e.railWidth) : k.value;
      return $.value ? A * M.value : A;
    }), {
      layoutItemStyles: K,
      layoutItemScrimStyles: W
    } = _n({
      id: e.name,
      order: I(() => parseInt(e.order, 10)),
      position: T,
      layoutSize: D,
      elementSize: k,
      active: Ql(V),
      disableTransitions: N(() => $.value),
      absolute: I(() => (
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        e.absolute || _.value && typeof G.value != "string"
      ))
    }), {
      isStuck: G,
      stickyStyles: ae
    } = vs({
      rootEl: g,
      isSticky: _,
      layoutItemStyles: K
    }), oe = st(() => typeof e.scrim == "string" ? e.scrim : null), fe = I(() => ({
      ...$.value ? {
        opacity: M.value * 0.2,
        transition: "none"
      } : void 0,
      ...W.value
    }));
    return at({
      VList: {
        bgColor: "transparent"
      }
    }), ne(() => {
      const A = n.image || e.image;
      return P(J, null, [h(e.tag, H({
        ref: g,
        onMouseenter: S,
        onMouseleave: p,
        class: ["v-navigation-drawer", `v-navigation-drawer--${T.value}`, {
          "v-navigation-drawer--expand-on-hover": e.expandOnHover,
          "v-navigation-drawer--floating": e.floating,
          "v-navigation-drawer--is-hovering": C.value,
          "v-navigation-drawer--rail": e.rail,
          "v-navigation-drawer--temporary": B.value,
          "v-navigation-drawer--persistent": b.value,
          "v-navigation-drawer--active": V.value,
          "v-navigation-drawer--sticky": _.value
        }, i.value, r.value, s.value, d.value, u.value, v.value, e.class],
        style: [c.value, K.value, y.value, ae.value, e.style]
      }, w, t), {
        default: () => {
          var E, O, z;
          return [A && P("div", {
            key: "image",
            class: "v-navigation-drawer__img"
          }, [n.image ? h(Le, {
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
          }, n.image) : h(ga, {
            key: "image-img",
            alt: "",
            cover: !0,
            height: "inherit",
            src: e.image
          }, null)]), n.prepend && P("div", {
            class: "v-navigation-drawer__prepend"
          }, [(E = n.prepend) == null ? void 0 : E.call(n)]), P("div", {
            class: "v-navigation-drawer__content"
          }, [(O = n.default) == null ? void 0 : O.call(n)]), n.append && P("div", {
            class: "v-navigation-drawer__append"
          }, [(z = n.append) == null ? void 0 : z.call(n)])];
        }
      }), h(Jt, {
        name: "fade-transition"
      }, {
        default: () => [B.value && ($.value || V.value) && !!e.scrim && P("div", H({
          class: ["v-navigation-drawer__scrim", oe.backgroundColorClasses.value],
          style: [fe.value, oe.backgroundColorStyles.value],
          onClick: () => {
            b.value || (V.value = !1);
          }
        }, w), null)]
      })]);
    }), {
      isStuck: G
    };
  }
}), Ss = {
  __name: "OxAppNav",
  props: /* @__PURE__ */ Ya({
    items: Array
  }, {
    drawer: {},
    drawerModifiers: {}
  }),
  emits: ["update:drawer"],
  setup(e) {
    de("context");
    const l = de("panels"), t = qa(e, "drawer"), a = X([]), n = e, o = I(() => (i(n.items), n.items));
    function i(r) {
      a.value = s(r);
    }
    function s(r) {
      if (l.panel) {
        for (const c of r)
          if (c.items) {
            const u = s(c.items);
            if (u)
              return [u, c.name];
          } else if (c.name == l.panel)
            return [c.name];
      }
    }
    return (r, c) => (L(), Z(ws, {
      modelValue: t.value,
      "onUpdate:modelValue": c[1] || (c[1] = (u) => t.value = u),
      theme: "dark"
    }, {
      append: F(() => [
        h(rt, null, {
          default: F(() => [
            j(r.$slots, "append")
          ]),
          _: 3
        })
      ]),
      default: F(() => [
        j(r.$slots, "prepend"),
        h(rt, {
          opened: a.value,
          "onUpdate:opened": c[0] || (c[0] = (u) => a.value = u),
          density: "compact"
        }, {
          default: F(() => [
            (L(!0), be(J, null, De(o.value, (u, d) => (L(), Z(x(ds), H({
              key: d,
              ref_for: !0
            }, u), null, 16))), 128))
          ]),
          _: 1
        }, 8, ["opened"])
      ]),
      _: 3
    }, 8, ["modelValue"]));
  }
}, xs = U({
  ...Se(),
  ...os({
    fullHeight: !0
  }),
  ...Re()
}, "VApp"), ks = le()({
  name: "VApp",
  props: xs(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = Ke(e), {
      layoutClasses: n,
      getLayoutItem: o,
      items: i,
      layoutRef: s
    } = ss(e), {
      rtlClasses: r
    } = nt();
    return ne(() => {
      var c;
      return P("div", {
        ref: s,
        class: ve(["v-application", a.themeClasses.value, n.value, r.value, e.class]),
        style: Ve([e.style])
      }, [P("div", {
        class: "v-application__wrap"
      }, [(c = t.default) == null ? void 0 : c.call(t)])]);
    }), {
      getLayoutItem: o,
      items: i,
      theme: a
    };
  }
}), On = U({
  text: String,
  ...Se(),
  ...Ue()
}, "VToolbarTitle"), Fn = le()({
  name: "VToolbarTitle",
  props: On(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    return ne(() => {
      const a = !!(t.default || t.text || e.text);
      return h(e.tag, {
        class: ve(["v-toolbar-title", e.class]),
        style: Ve(e.style)
      }, {
        default: () => {
          var n;
          return [a && P("div", {
            class: "v-toolbar-title__placeholder"
          }, [t.text ? t.text() : e.text, (n = t.default) == null ? void 0 : n.call(t)])];
        }
      });
    }), {};
  }
}), Vs = [null, "prominent", "default", "comfortable", "compact"], Dn = U({
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
  ...Mt(),
  ...Se(),
  ...Lt(),
  ...ht(),
  ...Ue({
    tag: "header"
  }),
  ...Re()
}, "VToolbar"), Da = le()({
  name: "VToolbar",
  props: Dn(),
  setup(e, l) {
    var v;
    let {
      slots: t
    } = l;
    const {
      backgroundColorClasses: a,
      backgroundColorStyles: n
    } = st(() => e.color), {
      borderClasses: o
    } = va(e), {
      elevationClasses: i
    } = fa(e), {
      roundedClasses: s
    } = Tt(e), {
      themeClasses: r
    } = Ke(e), {
      rtlClasses: c
    } = nt(), u = Q(!!(e.extended || (v = t.extension) != null && v.call(t))), d = I(() => parseInt(Number(e.height) + (e.density === "prominent" ? Number(e.height) : 0) - (e.density === "comfortable" ? 8 : 0) - (e.density === "compact" ? 16 : 0), 10)), m = I(() => u.value ? parseInt(Number(e.extensionHeight) + (e.density === "prominent" ? Number(e.extensionHeight) : 0) - (e.density === "comfortable" ? 4 : 0) - (e.density === "compact" ? 8 : 0), 10) : 0);
    return at({
      VBtn: {
        variant: "text"
      }
    }), ne(() => {
      var w;
      const f = !!(e.title || t.title), V = !!(t.image || e.image), y = (w = t.extension) == null ? void 0 : w.call(t);
      return u.value = !!(e.extended || y), h(e.tag, {
        class: ve(["v-toolbar", {
          "v-toolbar--absolute": e.absolute,
          "v-toolbar--collapse": e.collapse,
          "v-toolbar--flat": e.flat,
          "v-toolbar--floating": e.floating,
          [`v-toolbar--density-${e.density}`]: !0
        }, a.value, o.value, i.value, s.value, r.value, c.value, e.class]),
        style: Ve([n.value, e.style])
      }, {
        default: () => [V && P("div", {
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
        }, t.image) : h(ga, {
          key: "image-img",
          cover: !0,
          src: e.image
        }, null)]), h(Le, {
          defaults: {
            VTabs: {
              height: ye(d.value)
            }
          }
        }, {
          default: () => {
            var g, C, S;
            return [P("div", {
              class: "v-toolbar__content",
              style: {
                height: ye(d.value)
              }
            }, [t.prepend && P("div", {
              class: "v-toolbar__prepend"
            }, [(g = t.prepend) == null ? void 0 : g.call(t)]), f && h(Fn, {
              key: "title",
              text: e.title
            }, {
              text: t.title
            }), (C = t.default) == null ? void 0 : C.call(t), t.append && P("div", {
              class: "v-toolbar__append"
            }, [(S = t.append) == null ? void 0 : S.call(t)])])];
          }
        }), h(Le, {
          defaults: {
            VTabs: {
              height: ye(m.value)
            }
          }
        }, {
          default: () => [h(ki, null, {
            default: () => [u.value && P("div", {
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
}), Cs = U({
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
  const o = X(null), i = Q(0), s = Q(0), r = Q(0), c = Q(!1), u = Q(!1), d = I(() => Number(e.scrollThreshold)), m = I(() => Je((d.value - i.value) / d.value || 0)), v = () => {
    const f = o.value;
    if (!f || t && !t.value) return;
    a = i.value, i.value = "window" in f ? f.pageYOffset : f.scrollTop;
    const V = f instanceof Window ? document.documentElement.scrollHeight : f.scrollHeight;
    if (n !== V) {
      n = V;
      return;
    }
    u.value = i.value < a, r.value = Math.abs(i.value - d.value);
  };
  return ee(u, () => {
    s.value = s.value || i.value;
  }), ee(c, () => {
    s.value = 0;
  }), Qe(() => {
    ee(() => e.scrollTarget, (f) => {
      var y;
      const V = f ? document.querySelector(f) : window;
      if (!V) {
        hn(`Unable to locate element with identifier ${f}`);
        return;
      }
      V !== o.value && ((y = o.value) == null || y.removeEventListener("scroll", v), o.value = V, o.value.addEventListener("scroll", v, {
        passive: !0
      }));
    }, {
      immediate: !0
    });
  }), yt(() => {
    var f;
    (f = o.value) == null || f.removeEventListener("scroll", v);
  }), t && ee(t, v, {
    immediate: !0
  }), {
    scrollThreshold: d,
    currentScroll: i,
    currentThreshold: r,
    isScrollActive: c,
    scrollRatio: m,
    // required only for testing
    // probably can be removed
    // later (2 chars chlng)
    isScrollingUp: u,
    savedScroll: s
  };
}
const Is = U({
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
  ...Dn(),
  ...Tn(),
  ...Cs(),
  height: {
    type: [Number, String],
    default: 64
  }
}, "VAppBar"), Ts = le()({
  name: "VAppBar",
  props: Is(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = X(), n = ke(e, "modelValue"), o = I(() => {
      var C;
      const g = new Set(((C = e.scrollBehavior) == null ? void 0 : C.split(" ")) ?? []);
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
      !n.value;
    }), {
      currentScroll: s,
      scrollThreshold: r,
      isScrollingUp: c,
      scrollRatio: u
    } = Ps(e, {
      canScroll: i
    }), d = N(() => o.value.hide || o.value.fullyHide), m = I(() => e.collapse || o.value.collapse && (o.value.inverted ? u.value > 0 : u.value === 0)), v = I(() => e.flat || o.value.fullyHide && !n.value || o.value.elevate && (o.value.inverted ? s.value > 0 : s.value === 0)), f = I(() => o.value.fadeImage ? o.value.inverted ? 1 - u.value : u.value : void 0), V = I(() => {
      var S, p;
      if (o.value.hide && o.value.inverted) return 0;
      const g = ((S = a.value) == null ? void 0 : S.contentHeight) ?? 0, C = ((p = a.value) == null ? void 0 : p.extensionHeight) ?? 0;
      return d.value ? s.value < r.value || o.value.fullyHide ? g + C : g : g + C;
    });
    Ge(() => !!e.scrollBehavior, () => {
      tt(() => {
        d.value ? o.value.inverted ? n.value = s.value > r.value : n.value = c.value || s.value < r.value : n.value = !0;
      });
    });
    const {
      ssrBootStyles: y
    } = ma(), {
      layoutItemStyles: w
    } = _n({
      id: e.name,
      order: I(() => parseInt(e.order, 10)),
      position: N(() => e.location),
      layoutSize: V,
      elementSize: Q(void 0),
      active: n,
      absolute: N(() => e.absolute)
    });
    return ne(() => {
      const g = Da.filterProps(e);
      return h(Da, H({
        ref: a,
        class: ["v-app-bar", {
          "v-app-bar--bottom": e.location === "bottom"
        }, e.class],
        style: [{
          ...w.value,
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
}), As = U({
  ...an({
    icon: "$menu",
    variant: "text"
  })
}, "VAppBarNavIcon"), Ln = le()({
  name: "VAppBarNavIcon",
  props: As(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    return ne(() => h(pe, H(e, {
      class: ["v-app-bar-nav-icon"]
    }), t)), {};
  }
}), Ml = le()({
  name: "VAppBarTitle",
  props: On(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    return ne(() => h(Fn, H(e, {
      class: "v-app-bar-title"
    }), t)), {};
  }
}), _s = U({
  scrollable: Boolean,
  ...Se(),
  ...Nt(),
  ...Ue({
    tag: "main"
  })
}, "VMain"), Bs = le()({
  name: "VMain",
  props: _s(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    const {
      dimensionStyles: a
    } = Rt(e), {
      mainStyles: n
    } = An(), {
      ssrBootStyles: o
    } = ma();
    return ne(() => h(e.tag, {
      class: ve(["v-main", {
        "v-main--scrollable": e.scrollable
      }, e.class]),
      style: Ve([n.value, o.value, a.value, e.style])
    }, {
      default: () => {
        var i, s;
        return [e.scrollable ? P("div", {
          class: "v-main__scroller"
        }, [(i = t.default) == null ? void 0 : i.call(t)]) : (s = t.default) == null ? void 0 : s.call(t)];
      }
    })), {};
  }
});
function Pa(e, l) {
  return {
    x: e.x + l.x,
    y: e.y + l.y
  };
}
function Es(e, l) {
  return {
    x: e.x - l.x,
    y: e.y - l.y
  };
}
function Rl(e, l) {
  if (e.side === "top" || e.side === "bottom") {
    const {
      side: t,
      align: a
    } = e, n = a === "left" ? 0 : a === "center" ? l.width / 2 : a === "right" ? l.width : a, o = t === "top" ? 0 : t === "bottom" ? l.height : t;
    return Pa({
      x: n,
      y: o
    }, l);
  } else if (e.side === "left" || e.side === "right") {
    const {
      side: t,
      align: a
    } = e, n = t === "left" ? 0 : t === "right" ? l.width : t, o = a === "top" ? 0 : a === "center" ? l.height / 2 : a === "bottom" ? l.height : a;
    return Pa({
      x: n,
      y: o
    }, l);
  }
  return Pa({
    x: l.width / 2,
    y: l.height / 2
  }, l);
}
const Mn = {
  static: Fs,
  // specific viewport position, usually centered
  connected: Ls
  // connected to a certain element
}, $s = U({
  locationStrategy: {
    type: [String, Function],
    default: "static",
    validator: (e) => typeof e == "function" || e in Mn
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
  const t = X({}), a = X();
  He && Ge(() => !!(l.isActive.value && e.locationStrategy), (s) => {
    var r, c;
    ee(() => e.locationStrategy, s), We(() => {
      window.removeEventListener("resize", n), visualViewport == null || visualViewport.removeEventListener("resize", o), visualViewport == null || visualViewport.removeEventListener("scroll", i), a.value = void 0;
    }), window.addEventListener("resize", n, {
      passive: !0
    }), visualViewport == null || visualViewport.addEventListener("resize", o, {
      passive: !0
    }), visualViewport == null || visualViewport.addEventListener("scroll", i, {
      passive: !0
    }), typeof e.locationStrategy == "function" ? a.value = (r = e.locationStrategy(l, e, t)) == null ? void 0 : r.updateLocation : a.value = (c = Mn[e.locationStrategy](l, e, t)) == null ? void 0 : c.updateLocation;
  });
  function n(s) {
    var r;
    (r = a.value) == null || r.call(a, s);
  }
  function o(s) {
    var r;
    (r = a.value) == null || r.call(a, s);
  }
  function i(s) {
    var r;
    (r = a.value) == null || r.call(a, s);
  }
  return {
    contentStyles: t,
    updateLocation: a
  };
}
function Fs() {
}
function Ds(e, l) {
  const t = il(e);
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
  } = Fi(() => {
    const w = kl(l.location, e.isRtl.value), g = l.origin === "overlap" ? w : l.origin === "auto" ? wa(w) : kl(l.origin, e.isRtl.value);
    return w.side === g.side && w.align === Sa(g).align ? {
      preferredAnchor: Vl(w),
      preferredOrigin: Vl(g)
    } : {
      preferredAnchor: w,
      preferredOrigin: g
    };
  }), [i, s, r, c] = ["minWidth", "minHeight", "maxWidth", "maxHeight"].map((w) => I(() => {
    const g = parseFloat(l[w]);
    return isNaN(g) ? 1 / 0 : g;
  })), u = I(() => {
    if (Array.isArray(l.offset))
      return l.offset;
    if (typeof l.offset == "string") {
      const w = l.offset.split(" ").map(parseFloat);
      return w.length < 2 && w.push(0), w;
    }
    return typeof l.offset == "number" ? [l.offset, 0] : [0, 0];
  });
  let d = !1, m = -1;
  const v = new yn(4), f = new ResizeObserver(() => {
    if (!d) return;
    if (requestAnimationFrame((g) => {
      g !== m && v.clear(), requestAnimationFrame((C) => {
        m = C;
      });
    }), v.isFull) {
      const g = v.values();
      if (it(g.at(-1), g.at(-3)))
        return;
    }
    const w = y();
    w && v.push(w.flipped);
  });
  ee([e.target, e.contentEl], (w, g) => {
    let [C, S] = w, [p, k] = g;
    p && !Array.isArray(p) && f.unobserve(p), C && !Array.isArray(C) && f.observe(C), k && f.unobserve(k), S && f.observe(S);
  }, {
    immediate: !0
  }), We(() => {
    f.disconnect();
  });
  let V = new et({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  function y() {
    if (d = !1, requestAnimationFrame(() => d = !0), !e.target.value || !e.contentEl.value) return;
    (Array.isArray(e.target.value) || e.target.value.offsetParent || e.target.value.getClientRects().length) && (V = Vn(e.target.value));
    const w = Ds(e.contentEl.value, e.isRtl.value), g = aa(e.contentEl.value), C = 12;
    g.length || (g.push(document.documentElement), e.contentEl.value.style.top && e.contentEl.value.style.left || (w.x -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0), w.y -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0)));
    const S = g.reduce((D, K) => {
      const W = Qi(K);
      return D ? new et({
        x: Math.max(D.left, W.left),
        y: Math.max(D.top, W.top),
        width: Math.min(D.right, W.right) - Math.max(D.left, W.left),
        height: Math.min(D.bottom, W.bottom) - Math.max(D.top, W.top)
      }) : W;
    }, void 0);
    S.x += C, S.y += C, S.width -= C * 2, S.height -= C * 2;
    let p = {
      anchor: n.value,
      origin: o.value
    };
    function k(D) {
      const K = new et(w), W = Rl(D.anchor, V), G = Rl(D.origin, K);
      let {
        x: ae,
        y: oe
      } = Es(W, G);
      switch (D.anchor.side) {
        case "top":
          oe -= u.value[0];
          break;
        case "bottom":
          oe += u.value[0];
          break;
        case "left":
          ae -= u.value[0];
          break;
        case "right":
          ae += u.value[0];
          break;
      }
      switch (D.anchor.align) {
        case "top":
          oe -= u.value[1];
          break;
        case "bottom":
          oe += u.value[1];
          break;
        case "left":
          ae -= u.value[1];
          break;
        case "right":
          ae += u.value[1];
          break;
      }
      return K.x += ae, K.y += oe, K.width = Math.min(K.width, r.value), K.height = Math.min(K.height, c.value), {
        overflows: Bl(K, S),
        x: ae,
        y: oe
      };
    }
    let T = 0, b = 0;
    const B = {
      x: 0,
      y: 0
    }, _ = {
      x: !1,
      y: !1
    };
    let $ = -1;
    for (; ; ) {
      if ($++ > 10) {
        bn("Infinite loop detected in connectedLocationStrategy");
        break;
      }
      const {
        x: D,
        y: K,
        overflows: W
      } = k(p);
      T += D, b += K, w.x += D, w.y += K;
      {
        const G = Cl(p.anchor), ae = W.x.before || W.x.after, oe = W.y.before || W.y.after;
        let fe = !1;
        if (["x", "y"].forEach((A) => {
          if (A === "x" && ae && !_.x || A === "y" && oe && !_.y) {
            const E = {
              anchor: {
                ...p.anchor
              },
              origin: {
                ...p.origin
              }
            }, O = A === "x" ? G === "y" ? Sa : wa : G === "y" ? wa : Sa;
            E.anchor = O(E.anchor), E.origin = O(E.origin);
            const {
              overflows: z
            } = k(E);
            (z[A].before <= W[A].before && z[A].after <= W[A].after || z[A].before + z[A].after < (W[A].before + W[A].after) / 2) && (p = E, fe = _[A] = !0);
          }
        }), fe) continue;
      }
      W.x.before && (T += W.x.before, w.x += W.x.before), W.x.after && (T -= W.x.after, w.x -= W.x.after), W.y.before && (b += W.y.before, w.y += W.y.before), W.y.after && (b -= W.y.after, w.y -= W.y.after);
      {
        const G = Bl(w, S);
        B.x = S.width - G.x.before - G.x.after, B.y = S.height - G.y.before - G.y.after, T += G.x.before, w.x += G.x.before, b += G.y.before, w.y += G.y.before;
      }
      break;
    }
    const M = Cl(p.anchor);
    return Object.assign(t.value, {
      "--v-overlay-anchor-origin": `${p.anchor.side} ${p.anchor.align}`,
      transformOrigin: `${p.origin.side} ${p.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: ye(Ia(b)),
      left: e.isRtl.value ? void 0 : ye(Ia(T)),
      right: e.isRtl.value ? ye(Ia(-T)) : void 0,
      minWidth: ye(M === "y" ? Math.min(i.value, V.width) : i.value),
      maxWidth: ye(Nl(Je(B.x, i.value === 1 / 0 ? 0 : i.value, r.value))),
      maxHeight: ye(Nl(Je(B.y, s.value === 1 / 0 ? 0 : s.value, c.value)))
    }), {
      available: B,
      contentBox: w,
      flipped: _
    };
  }
  return ee(() => [n.value, o.value, l.offset, l.minWidth, l.minHeight, l.maxWidth, l.maxHeight], () => y()), $e(() => {
    const w = y();
    if (!w) return;
    const {
      available: g,
      contentBox: C
    } = w;
    C.height > g.y && requestAnimationFrame(() => {
      y(), requestAnimationFrame(() => {
        y();
      });
    });
  }), {
    updateLocation: y
  };
}
function Ia(e) {
  return Math.round(e * devicePixelRatio) / devicePixelRatio;
}
function Nl(e) {
  return Math.ceil(e * devicePixelRatio) / devicePixelRatio;
}
let La = !0;
const na = [];
function Ms(e) {
  !La || na.length ? (na.push(e), Ma()) : (La = !1, e(), Ma());
}
let Hl = -1;
function Ma() {
  cancelAnimationFrame(Hl), Hl = requestAnimationFrame(() => {
    const e = na.shift();
    e && e(), na.length ? Ma() : La = !0;
  });
}
const Qt = {
  none: null,
  close: Hs,
  block: zs,
  reposition: Ws
}, Rs = U({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (e) => typeof e == "function" || e in Qt
  }
}, "VOverlay-scroll-strategies");
function Ns(e, l) {
  if (!He) return;
  let t;
  tt(async () => {
    t == null || t.stop(), l.isActive.value && e.scrollStrategy && (t = Jl(), await new Promise((a) => setTimeout(a)), t.active && t.run(() => {
      var a;
      typeof e.scrollStrategy == "function" ? e.scrollStrategy(l, e, t) : (a = Qt[e.scrollStrategy]) == null || a.call(Qt, l, e, t);
    }));
  }), We(() => {
    t == null || t.stop();
  });
}
function Hs(e) {
  function l(t) {
    e.isActive.value = !1;
  }
  Rn(e.targetEl.value ?? e.contentEl.value, l);
}
function zs(e, l) {
  var i;
  const t = (i = e.root.value) == null ? void 0 : i.offsetParent, a = [.../* @__PURE__ */ new Set([...aa(e.targetEl.value, l.contained ? t : void 0), ...aa(e.contentEl.value, l.contained ? t : void 0)])].filter((s) => !s.classList.contains("v-overlay-scroll-blocked")), n = window.innerWidth - document.documentElement.offsetWidth, o = ((s) => sl(s) && s)(t || document.documentElement);
  o && e.root.value.classList.add("v-overlay--scroll-blocked"), a.forEach((s, r) => {
    s.style.setProperty("--v-body-scroll-x", ye(-s.scrollLeft)), s.style.setProperty("--v-body-scroll-y", ye(-s.scrollTop)), s !== document.documentElement && s.style.setProperty("--v-scrollbar-offset", ye(n)), s.classList.add("v-overlay-scroll-blocked");
  }), We(() => {
    a.forEach((s, r) => {
      const c = parseFloat(s.style.getPropertyValue("--v-body-scroll-x")), u = parseFloat(s.style.getPropertyValue("--v-body-scroll-y")), d = s.style.scrollBehavior;
      s.style.scrollBehavior = "auto", s.style.removeProperty("--v-body-scroll-x"), s.style.removeProperty("--v-body-scroll-y"), s.style.removeProperty("--v-scrollbar-offset"), s.classList.remove("v-overlay-scroll-blocked"), s.scrollLeft = -c, s.scrollTop = -u, s.style.scrollBehavior = d;
    }), o && e.root.value.classList.remove("v-overlay--scroll-blocked");
  });
}
function Ws(e, l, t) {
  let a = !1, n = -1, o = -1;
  function i(s) {
    Ms(() => {
      var u, d;
      const r = performance.now();
      (d = (u = e.updateLocation).value) == null || d.call(u, s), a = (performance.now() - r) / (1e3 / 60) > 2;
    });
  }
  o = (typeof requestIdleCallback > "u" ? (s) => s() : requestIdleCallback)(() => {
    t.run(() => {
      Rn(e.targetEl.value ?? e.contentEl.value, (s) => {
        a ? (cancelAnimationFrame(n), n = requestAnimationFrame(() => {
          n = requestAnimationFrame(() => {
            i(s);
          });
        })) : i(s);
      });
    });
  }), We(() => {
    typeof cancelIdleCallback < "u" && cancelIdleCallback(o), cancelAnimationFrame(n);
  });
}
function Rn(e, l) {
  const t = [document, ...aa(e)];
  t.forEach((a) => {
    a.addEventListener("scroll", l, {
      passive: !0
    });
  }), We(() => {
    t.forEach((a) => {
      a.removeEventListener("scroll", l);
    });
  });
}
const Ra = Symbol.for("vuetify:v-menu"), Us = U({
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
  ...En()
}, "VOverlay-activator");
function Ks(e, l) {
  let {
    isActive: t,
    isTop: a,
    contentEl: n
  } = l;
  const o = lt("useActivator"), i = X();
  let s = !1, r = !1, c = !0;
  const u = I(() => e.openOnFocus || e.openOnFocus == null && e.openOnHover), d = I(() => e.openOnClick || e.openOnClick == null && !e.openOnHover && !u.value), {
    runOpenDelay: m,
    runCloseDelay: v
  } = $n(e, (b) => {
    b === (e.openOnHover && s || u.value && r) && !(e.openOnHover && t.value && !a.value) && (t.value !== b && (c = !0), t.value = b);
  }), f = X(), V = {
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
      Pt(b.target, ":focus-visible") !== !1 && (r = !0, b.stopPropagation(), i.value = b.currentTarget || b.target, m());
    },
    onBlur: (b) => {
      r = !1, b.stopPropagation(), v();
    }
  }, y = I(() => {
    const b = {};
    return d.value && (b.onClick = V.onClick), e.openOnHover && (b.onMouseenter = V.onMouseenter, b.onMouseleave = V.onMouseleave), u.value && (b.onFocus = V.onFocus, b.onBlur = V.onBlur), b;
  }), w = I(() => {
    const b = {};
    if (e.openOnHover && (b.onMouseenter = () => {
      s = !0, m();
    }, b.onMouseleave = () => {
      s = !1, v();
    }), u.value && (b.onFocusin = () => {
      r = !0, m();
    }, b.onFocusout = () => {
      r = !1, v();
    }), e.closeOnContentClick) {
      const B = de(Ra, null);
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
  ee(a, (b) => {
    var B;
    b && (e.openOnHover && !s && (!u.value || !r) || u.value && !r && (!e.openOnHover || !s)) && !((B = n.value) != null && B.contains(document.activeElement)) && (t.value = !1);
  }), ee(t, (b) => {
    b || setTimeout(() => {
      f.value = void 0;
    });
  }, {
    flush: "post"
  });
  const C = Al();
  tt(() => {
    C.value && $e(() => {
      i.value = C.el;
    });
  });
  const S = Al(), p = I(() => e.target === "cursor" && f.value ? f.value : S.value ? S.el : Nn(e.target, o) || i.value), k = I(() => Array.isArray(p.value) ? void 0 : p.value);
  let T;
  return ee(() => !!e.activator, (b) => {
    b && He ? (T = Jl(), T.run(() => {
      js(e, o, {
        activatorEl: i,
        activatorEvents: y
      });
    })) : T && T.stop();
  }, {
    flush: "post",
    immediate: !0
  }), We(() => {
    T == null || T.stop();
  }), {
    activatorEl: i,
    activatorRef: C,
    target: p,
    targetEl: k,
    targetRef: S,
    activatorEvents: y,
    contentEvents: w,
    scrimEvents: g
  };
}
function js(e, l, t) {
  let {
    activatorEl: a,
    activatorEvents: n
  } = t;
  ee(() => e.activator, (r, c) => {
    if (c && r !== c) {
      const u = s(c);
      u && i(u);
    }
    r && $e(() => o());
  }, {
    immediate: !0
  }), ee(() => e.activatorProps, () => {
    o();
  }), We(() => {
    i();
  });
  function o() {
    let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : s(), c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    r && Ji(r, H(n.value, c));
  }
  function i() {
    let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : s(), c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    r && es(r, H(n.value, c));
  }
  function s() {
    let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : e.activator;
    const c = Nn(r, l);
    return a.value = (c == null ? void 0 : c.nodeType) === Node.ELEMENT_NODE ? c : void 0, a.value;
  }
}
function Nn(e, l) {
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
  if (!He) return Q(!1);
  const {
    ssr: e
  } = dt();
  if (e) {
    const l = Q(!1);
    return Qe(() => {
      l.value = !0;
    }), l;
  } else
    return Q(!0);
}
const Hn = U({
  eager: Boolean
}, "lazy");
function zn(e, l) {
  const t = Q(!1), a = N(() => t.value || e.eager || l.value);
  ee(l, () => t.value = !0);
  function n() {
    e.eager || (t.value = !1);
  }
  return {
    isBooted: t,
    hasContent: a,
    onAfterLeave: n
  };
}
const zl = Symbol.for("vuetify:stack"), _t = Xe([]);
function Ys(e, l, t) {
  const a = lt("useStack"), n = !t, o = de(zl, void 0), i = Xe({
    activeChildren: /* @__PURE__ */ new Set()
  });
  ze(zl, i);
  const s = Q(Number(Sl(l)));
  Ge(e, () => {
    var d;
    const u = (d = _t.at(-1)) == null ? void 0 : d[1];
    s.value = u ? u + 10 : Number(Sl(l)), n && _t.push([a.uid, s.value]), o == null || o.activeChildren.add(a.uid), We(() => {
      if (n) {
        const m = Ea(_t).findIndex((v) => v[0] === a.uid);
        _t.splice(m, 1);
      }
      o == null || o.activeChildren.delete(a.uid);
    });
  });
  const r = Q(!0);
  n && tt(() => {
    var d;
    const u = ((d = _t.at(-1)) == null ? void 0 : d[0]) === a.uid;
    setTimeout(() => r.value = u);
  });
  const c = N(() => !i.activeChildren.size);
  return {
    globalTop: Ql(r),
    localTop: c,
    stackStyles: N(() => ({
      zIndex: s.value
    }))
  };
}
function qs(e) {
  return {
    teleportTarget: I(() => {
      const t = e();
      if (t === !0 || !He) return;
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
function Wn(e, l, t) {
  if (!e || Un(e, t) === !1) return !1;
  const a = Cn(l);
  if (typeof ShadowRoot < "u" && a instanceof ShadowRoot && a.host === e.target) return !1;
  const n = (typeof t.value == "object" && t.value.include || (() => []))();
  return n.push(l), !n.some((o) => o == null ? void 0 : o.contains(e.target));
}
function Un(e, l) {
  return (typeof l.value == "object" && l.value.closeConditional || Xs)(e);
}
function Zs(e, l, t) {
  const a = typeof t.value == "function" ? t.value : t.value.handler;
  e.shadowTarget = e.target, l._clickOutside.lastMousedownWasOutside && Wn(e, l, t) && setTimeout(() => {
    Un(e, t) && a && a(e);
  }, 0);
}
function Wl(e, l) {
  const t = Cn(e);
  l(document), typeof ShadowRoot < "u" && t instanceof ShadowRoot && l(t);
}
const Ul = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(e, l) {
    const t = (n) => Zs(n, e, l), a = (n) => {
      e._clickOutside.lastMousedownWasOutside = Wn(n, e, l);
    };
    Wl(e, (n) => {
      n.addEventListener("click", t, !0), n.addEventListener("mousedown", a, !0);
    }), e._clickOutside || (e._clickOutside = {
      lastMousedownWasOutside: !1
    }), e._clickOutside[l.instance.$.uid] = {
      onClick: t,
      onMousedown: a
    };
  },
  beforeUnmount(e, l) {
    e._clickOutside && (Wl(e, (t) => {
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
function Qs(e) {
  const {
    modelValue: l,
    color: t,
    ...a
  } = e;
  return h(Jt, {
    name: "fade-transition",
    appear: !0
  }, {
    default: () => [e.modelValue && P("div", H({
      class: ["v-overlay__scrim", e.color.backgroundColorClasses.value],
      style: e.color.backgroundColorStyles.value
    }, a), null)]
  });
}
const rl = U({
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
  ...Se(),
  ...Nt(),
  ...Hn(),
  ...$s(),
  ...Rs(),
  ...Re(),
  ...Ht()
}, "VOverlay"), oa = le()({
  name: "VOverlay",
  directives: {
    vClickOutside: Ul
  },
  inheritAttrs: !1,
  props: {
    _disableGlobalStack: Boolean,
    ...rl()
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
    const o = lt("VOverlay"), i = X(), s = X(), r = X(), c = ke(e, "modelValue"), u = I({
      get: () => c.value,
      set: (q) => {
        q && e.disabled || (c.value = q);
      }
    }), {
      themeClasses: d
    } = Ke(e), {
      rtlClasses: m,
      isRtl: v
    } = nt(), {
      hasContent: f,
      onAfterLeave: V
    } = zn(e, u), y = st(() => typeof e.scrim == "string" ? e.scrim : null), {
      globalTop: w,
      localTop: g,
      stackStyles: C
    } = Ys(u, () => e.zIndex, e._disableGlobalStack), {
      activatorEl: S,
      activatorRef: p,
      target: k,
      targetEl: T,
      targetRef: b,
      activatorEvents: B,
      contentEvents: _,
      scrimEvents: $
    } = Ks(e, {
      isActive: u,
      isTop: g,
      contentEl: r
    }), {
      teleportTarget: M
    } = qs(() => {
      var me, R, Y;
      const q = e.attach || e.contained;
      if (q) return q;
      const se = ((me = S == null ? void 0 : S.value) == null ? void 0 : me.getRootNode()) || ((Y = (R = o.proxy) == null ? void 0 : R.$el) == null ? void 0 : Y.getRootNode());
      return se instanceof ShadowRoot ? se : !1;
    }), {
      dimensionStyles: D
    } = Rt(e), K = Gs(), {
      scopeId: W
    } = Kt();
    ee(() => e.disabled, (q) => {
      q && (u.value = !1);
    });
    const {
      contentStyles: G,
      updateLocation: ae
    } = Os(e, {
      isRtl: v,
      contentEl: r,
      target: k,
      isActive: u
    });
    Ns(e, {
      root: i,
      contentEl: r,
      targetEl: T,
      isActive: u,
      updateLocation: ae
    });
    function oe(q) {
      n("click:outside", q), e.persistent ? he() : u.value = !1;
    }
    function fe(q) {
      return u.value && w.value && // If using scrim, only close if clicking on it rather than anything opened on top
      (!e.scrim || q.target === s.value || q instanceof MouseEvent && q.shadowTarget === s.value);
    }
    He && ee(u, (q) => {
      q ? window.addEventListener("keydown", A) : window.removeEventListener("keydown", A);
    }, {
      immediate: !0
    }), yt(() => {
      He && window.removeEventListener("keydown", A);
    });
    function A(q) {
      var se, me, R;
      q.key === "Escape" && w.value && ((se = r.value) != null && se.contains(document.activeElement) || n("keydown", q), e.persistent ? he() : (u.value = !1, (me = r.value) != null && me.contains(document.activeElement) && ((R = S.value) == null || R.focus())));
    }
    function E(q) {
      q.key === "Escape" && !w.value || n("keydown", q);
    }
    const O = tn();
    Ge(() => e.closeOnBack, () => {
      Vi(O, (q) => {
        w.value && u.value ? (q(!1), e.persistent ? he() : u.value = !1) : q();
      });
    });
    const z = X();
    ee(() => u.value && (e.absolute || e.contained) && M.value == null, (q) => {
      if (q) {
        const se = Pn(i.value);
        se && se !== document.scrollingElement && (z.value = se.scrollTop);
      }
    });
    function he() {
      e.noClickAnimation || r.value && vt(r.value, [{
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
    function te() {
      n("afterEnter");
    }
    function ue() {
      V(), n("afterLeave");
    }
    return ne(() => {
      var q;
      return P(J, null, [(q = t.activator) == null ? void 0 : q.call(t, {
        isActive: u.value,
        targetRef: b,
        props: H({
          ref: p
        }, B.value, e.activatorProps)
      }), K.value && f.value && h($a, {
        disabled: !M.value,
        to: M.value
      }, {
        default: () => [P("div", H({
          class: ["v-overlay", {
            "v-overlay--absolute": e.absolute || e.contained,
            "v-overlay--active": u.value,
            "v-overlay--contained": e.contained
          }, d.value, m.value, e.class],
          style: [C.value, {
            "--v-overlay-opacity": e.opacity,
            top: ye(z.value)
          }, e.style],
          ref: i,
          onKeydown: E
        }, W, a), [h(Qs, H({
          color: y,
          modelValue: u.value && !!e.scrim,
          ref: s
        }, $.value), null), h(ya, {
          appear: !0,
          persisted: !0,
          transition: e.transition,
          target: k.value,
          onAfterEnter: te,
          onAfterLeave: ue
        }, {
          default: () => {
            var se;
            return [Ze(P("div", H({
              ref: r,
              class: ["v-overlay__content", e.contentClass],
              style: [D.value, G.value]
            }, _.value, e.contentProps), [(se = t.default) == null ? void 0 : se.call(t, {
              isActive: u
            })]), [[It, u.value], [Ul, {
              handler: oe,
              closeConditional: fe,
              include: () => [S.value]
            }]])];
          }
        })])]
      })]);
    }), {
      activatorEl: S,
      scrimEl: s,
      target: k,
      animateClick: he,
      contentEl: r,
      globalTop: w,
      localTop: g,
      updateLocation: ae
    };
  }
}), Ta = Symbol("Forwarded refs");
function Aa(e, l) {
  let t = e;
  for (; t; ) {
    const a = Reflect.getOwnPropertyDescriptor(t, l);
    if (a) return a;
    t = Object.getPrototypeOf(t);
  }
}
function pt(e) {
  for (var l = arguments.length, t = new Array(l > 1 ? l - 1 : 0), a = 1; a < l; a++)
    t[a - 1] = arguments[a];
  return e[Ta] = t, new Proxy(e, {
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
          const c = Aa(r.value, o) ?? ("_" in r.value ? Aa((s = r.value._) == null ? void 0 : s.setupState, o) : void 0);
          if (c) return c;
        }
        for (const r of t) {
          const c = r.value && r.value[Ta];
          if (!c) continue;
          const u = c.slice();
          for (; u.length; ) {
            const d = u.shift(), m = Aa(d.value, o);
            if (m) return m;
            const v = d.value && d.value[Ta];
            v && u.push(...v);
          }
        }
      }
    }
  });
}
function Js(e) {
  const l = Q(e());
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
    const c = performance.now();
    t = window.setInterval(() => {
      const u = performance.now() - c + r;
      l.value = Math.max(e() - u, 0), l.value <= 0 && a();
    }, r);
  }
  return We(a), {
    clear: a,
    time: l,
    start: o,
    reset: n
  };
}
const er = U({
  multiLine: Boolean,
  text: String,
  timer: [Boolean, String],
  timeout: {
    type: [Number, String],
    default: 5e3
  },
  vertical: Boolean,
  ...on({
    location: "bottom"
  }),
  ...nn(),
  ...ht(),
  ...zt(),
  ...Re(),
  ...bt(rl({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
}, "VSnackbar"), tr = le()({
  name: "VSnackbar",
  props: er(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = ke(e, "modelValue"), {
      positionClasses: n
    } = ln(e), {
      scopeId: o
    } = Kt(), {
      themeClasses: i
    } = Ke(e), {
      colorClasses: s,
      colorStyles: r,
      variantClasses: c
    } = Za(e), {
      roundedClasses: u
    } = Tt(e), d = Js(() => Number(e.timeout)), m = X(), v = X(), f = Q(!1), V = Q(0), y = X(), w = de($t, void 0);
    Ge(() => !!w, () => {
      const $ = An();
      tt(() => {
        y.value = $.mainStyles.value;
      });
    }), ee(a, C), ee(() => e.timeout, C), Qe(() => {
      a.value && C();
    });
    let g = -1;
    function C() {
      d.reset(), window.clearTimeout(g);
      const $ = Number(e.timeout);
      if (!a.value || $ === -1) return;
      const M = Di(v.value);
      d.start(M), g = window.setTimeout(() => {
        a.value = !1;
      }, $);
    }
    function S() {
      d.reset(), window.clearTimeout(g);
    }
    function p() {
      f.value = !0, S();
    }
    function k() {
      f.value = !1, C();
    }
    function T($) {
      V.value = $.touches[0].clientY;
    }
    function b($) {
      Math.abs(V.value - $.changedTouches[0].clientY) > 50 && (a.value = !1);
    }
    function B() {
      f.value && k();
    }
    const _ = I(() => e.location.split(" ").reduce(($, M) => ($[`v-snackbar--${M}`] = !0, $), {}));
    return ne(() => {
      const $ = oa.filterProps(e), M = !!(t.default || t.text || e.text);
      return h(oa, H({
        ref: m,
        class: ["v-snackbar", {
          "v-snackbar--active": a.value,
          "v-snackbar--multi-line": e.multiLine && !e.vertical,
          "v-snackbar--timer": !!e.timer,
          "v-snackbar--vertical": e.vertical
        }, _.value, n.value, e.class],
        style: [y.value, e.style]
      }, $, {
        modelValue: a.value,
        "onUpdate:modelValue": (D) => a.value = D,
        contentProps: H({
          class: ["v-snackbar__wrapper", i.value, s.value, u.value, c.value],
          style: [r.value],
          onPointerenter: p,
          onPointerleave: k
        }, $.contentProps),
        persistent: !0,
        noClickAnimation: !0,
        scrim: !1,
        scrollStrategy: "none",
        _disableGlobalStack: !0,
        onTouchstartPassive: T,
        onTouchend: b,
        onAfterLeave: B
      }, o), {
        default: () => {
          var D, K;
          return [Qa(!1, "v-snackbar"), e.timer && !f.value && P("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [h(Ci, {
            ref: v,
            color: typeof e.timer == "string" ? e.timer : "info",
            max: e.timeout,
            "model-value": d.time.value
          }, null)]), M && P("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((D = t.text) == null ? void 0 : D.call(t)) ?? e.text, (K = t.default) == null ? void 0 : K.call(t)]), t.actions && h(Le, {
            defaults: {
              VBtn: {
                variant: "text",
                ripple: !1,
                slim: !0
              }
            }
          }, {
            default: () => [P("div", {
              class: "v-snackbar__actions"
            }, [t.actions({
              isActive: a
            })])]
          })];
        },
        activator: t.activator
      });
    }), pt({}, m);
  }
}), ul = Symbol.for("vuetify:v-tabs"), ar = U({
  fixed: Boolean,
  sliderColor: String,
  hideSlider: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ...bt(an({
    selectedClass: "v-tab--selected",
    variant: "text"
  }), ["active", "block", "flat", "location", "position", "symbol"])
}, "VTab"), Na = le()({
  name: "VTab",
  props: ar(),
  setup(e, l) {
    let {
      slots: t,
      attrs: a
    } = l;
    const {
      textColorClasses: n,
      textColorStyles: o
    } = Wt(() => e.sliderColor), i = X(), s = X(), r = I(() => e.direction === "horizontal"), c = I(() => {
      var d, m;
      return ((m = (d = i.value) == null ? void 0 : d.group) == null ? void 0 : m.isSelected.value) ?? !1;
    });
    function u(d) {
      var v, f;
      let {
        value: m
      } = d;
      if (m) {
        const V = (f = (v = i.value) == null ? void 0 : v.$el.parentElement) == null ? void 0 : f.querySelector(".v-tab--selected .v-tab__slider"), y = s.value;
        if (!V || !y) return;
        const w = getComputedStyle(V).color, g = V.getBoundingClientRect(), C = y.getBoundingClientRect(), S = r.value ? "x" : "y", p = r.value ? "X" : "Y", k = r.value ? "right" : "bottom", T = r.value ? "width" : "height", b = g[S], B = C[S], _ = b > B ? g[k] - C[k] : g[S] - C[S], $ = Math.sign(_) > 0 ? r.value ? "right" : "bottom" : Math.sign(_) < 0 ? r.value ? "left" : "top" : "center", D = (Math.abs(_) + (Math.sign(_) < 0 ? g[T] : C[T])) / Math.max(g[T], C[T]) || 0, K = g[T] / C[T] || 0, W = 1.5;
        vt(y, {
          backgroundColor: [w, "currentcolor"],
          transform: [`translate${p}(${_}px) scale${p}(${K})`, `translate${p}(${_ / W}px) scale${p}(${(D - 1) / W + 1})`, "none"],
          transformOrigin: Array(3).fill($)
        }, {
          duration: 225,
          easing: Et
        });
      }
    }
    return ne(() => {
      const d = pe.filterProps(e);
      return h(pe, H({
        symbol: ul,
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
        "onGroup:selected": u
      }), {
        ...t,
        default: () => {
          var m;
          return P(J, null, [((m = t.default) == null ? void 0 : m.call(t)) ?? e.text, !e.hideSlider && P("div", {
            ref: s,
            class: ve(["v-tab__slider", n.value]),
            style: Ve(o.value)
          }, null)]);
        }
      });
    }), pt({}, i);
  }
}), lr = (e) => {
  const {
    touchstartX: l,
    touchendX: t,
    touchstartY: a,
    touchendY: n
  } = e, o = 0.5, i = 16;
  e.offsetX = t - l, e.offsetY = n - a, Math.abs(e.offsetY) < o * Math.abs(e.offsetX) && (e.left && t < l - i && e.left(e), e.right && t > l + i && e.right(e)), Math.abs(e.offsetX) < o * Math.abs(e.offsetY) && (e.up && n < a - i && e.up(e), e.down && n > a + i && e.down(e));
};
function nr(e, l) {
  var a;
  const t = e.changedTouches[0];
  l.touchstartX = t.clientX, l.touchstartY = t.clientY, (a = l.start) == null || a.call(l, {
    originalEvent: e,
    ...l
  });
}
function or(e, l) {
  var a;
  const t = e.changedTouches[0];
  l.touchendX = t.clientX, l.touchendY = t.clientY, (a = l.end) == null || a.call(l, {
    originalEvent: e,
    ...l
  }), lr(l);
}
function ir(e, l) {
  var a;
  const t = e.changedTouches[0];
  l.touchmoveX = t.clientX, l.touchmoveY = t.clientY, (a = l.move) == null || a.call(l, {
    originalEvent: e,
    ...l
  });
}
function sr() {
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
    touchstart: (t) => nr(t, l),
    touchend: (t) => or(t, l),
    touchmove: (t) => ir(t, l)
  };
}
function rr(e, l) {
  var s;
  const t = l.value, a = t != null && t.parent ? e.parentElement : e, n = (t == null ? void 0 : t.options) ?? {
    passive: !0
  }, o = (s = l.instance) == null ? void 0 : s.$.uid;
  if (!a || !o) return;
  const i = sr(l.value);
  a._touchHandlers = a._touchHandlers ?? /* @__PURE__ */ Object.create(null), a._touchHandlers[o] = i, pn(i).forEach((r) => {
    a.addEventListener(r, i[r], n);
  });
}
function ur(e, l) {
  var o, i;
  const t = (o = l.value) != null && o.parent ? e.parentElement : e, a = (i = l.instance) == null ? void 0 : i.$.uid;
  if (!(t != null && t._touchHandlers) || !a) return;
  const n = t._touchHandlers[a];
  pn(n).forEach((s) => {
    t.removeEventListener(s, n[s]);
  }), delete t._touchHandlers[a];
}
const Ha = {
  mounted: rr,
  unmounted: ur
}, Kn = Symbol.for("vuetify:v-window"), jn = Symbol.for("vuetify:v-window-group"), Gn = U({
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
  ...Re()
}, "VWindow"), za = le()({
  name: "VWindow",
  directives: {
    vTouch: Ha
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
    } = Ke(e), {
      isRtl: n
    } = nt(), {
      t: o
    } = ot(), i = Ja(e, jn), s = X(), r = I(() => n.value ? !e.reverse : e.reverse), c = Q(!1), u = I(() => {
      const S = e.direction === "vertical" ? "y" : "x", k = (r.value ? !c.value : c.value) ? "-reverse" : "";
      return `v-window-${S}${k}-transition`;
    }), d = Q(0), m = X(void 0), v = I(() => i.items.value.findIndex((S) => i.selected.value.includes(S.id)));
    ee(v, (S, p) => {
      const k = i.items.value.length, T = k - 1;
      k <= 2 ? c.value = S < p : S === T && p === 0 ? c.value = !0 : S === 0 && p === T ? c.value = !1 : c.value = S < p;
    }), ze(Kn, {
      transition: u,
      isReversed: c,
      transitionCount: d,
      transitionHeight: m,
      rootRef: s
    });
    const f = N(() => e.continuous || v.value !== 0), V = N(() => e.continuous || v.value !== i.items.value.length - 1);
    function y() {
      f.value && i.prev();
    }
    function w() {
      V.value && i.next();
    }
    const g = I(() => {
      const S = [], p = {
        icon: n.value ? e.nextIcon : e.prevIcon,
        class: `v-window__${r.value ? "right" : "left"}`,
        onClick: i.prev,
        "aria-label": o("$vuetify.carousel.prev")
      };
      S.push(f.value ? t.prev ? t.prev({
        props: p
      }) : h(pe, p, null) : P("div", null, null));
      const k = {
        icon: n.value ? e.prevIcon : e.nextIcon,
        class: `v-window__${r.value ? "left" : "right"}`,
        onClick: i.next,
        "aria-label": o("$vuetify.carousel.next")
      };
      return S.push(V.value ? t.next ? t.next({
        props: k
      }) : h(pe, k, null) : P("div", null, null)), S;
    }), C = I(() => e.touch === !1 ? e.touch : {
      ...{
        left: () => {
          r.value ? y() : w();
        },
        right: () => {
          r.value ? w() : y();
        },
        start: (p) => {
          let {
            originalEvent: k
          } = p;
          k.stopPropagation();
        }
      },
      ...e.touch === !0 ? {} : e.touch
    });
    return ne(() => Ze(h(e.tag, {
      ref: s,
      class: ve(["v-window", {
        "v-window--show-arrows-on-hover": e.showArrows === "hover"
      }, a.value, e.class]),
      style: Ve(e.style)
    }, {
      default: () => {
        var S, p;
        return [P("div", {
          class: "v-window__container",
          style: {
            height: m.value
          }
        }, [(S = t.default) == null ? void 0 : S.call(t, {
          group: i
        }), e.showArrows !== !1 && P("div", {
          class: "v-window__controls"
        }, [g.value])]), (p = t.additional) == null ? void 0 : p.call(t, {
          group: i
        })];
      }
    }), [[Ha, C.value]])), {
      group: i
    };
  }
}), cr = U({
  ...bt(Gn(), ["continuous", "nextIcon", "prevIcon", "showArrows", "touch", "mandatory"])
}, "VTabsWindow"), cl = le()({
  name: "VTabsWindow",
  props: cr(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = de(ul, null), n = ke(e, "modelValue"), o = I({
      get() {
        var i;
        return n.value != null || !a ? n.value : (i = a.items.value.find((s) => a.selected.value.includes(s.id))) == null ? void 0 : i.value;
      },
      set(i) {
        n.value = i;
      }
    });
    return ne(() => {
      const i = za.filterProps(e);
      return h(za, H({
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
}), Yn = U({
  reverseTransition: {
    type: [Boolean, String],
    default: void 0
  },
  transition: {
    type: [Boolean, String],
    default: void 0
  },
  ...Se(),
  ...el(),
  ...Hn()
}, "VWindowItem"), Wa = le()({
  name: "VWindowItem",
  directives: {
    vTouch: Ha
  },
  props: Yn(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = de(Kn), n = tl(e, jn), {
      isBooted: o
    } = ma();
    if (!a || !n) throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const i = Q(!1), s = I(() => o.value && (a.isReversed.value ? e.reverseTransition !== !1 : e.transition !== !1));
    function r() {
      !i.value || !a || (i.value = !1, a.transitionCount.value > 0 && (a.transitionCount.value -= 1, a.transitionCount.value === 0 && (a.transitionHeight.value = void 0)));
    }
    function c() {
      var f;
      i.value || !a || (i.value = !0, a.transitionCount.value === 0 && (a.transitionHeight.value = ye((f = a.rootRef.value) == null ? void 0 : f.clientHeight)), a.transitionCount.value += 1);
    }
    function u() {
      r();
    }
    function d(f) {
      i.value && $e(() => {
        !s.value || !i.value || !a || (a.transitionHeight.value = ye(f.clientHeight));
      });
    }
    const m = I(() => {
      const f = a.isReversed.value ? e.reverseTransition : e.transition;
      return s.value ? {
        name: typeof f != "string" ? a.transition.value : f,
        onBeforeEnter: c,
        onAfterEnter: r,
        onEnterCancelled: u,
        onBeforeLeave: c,
        onAfterLeave: r,
        onLeaveCancelled: u,
        onEnter: d
      } : !1;
    }), {
      hasContent: v
    } = zn(e, n.isSelected);
    return ne(() => h(ya, {
      transition: m.value,
      disabled: !o.value
    }, {
      default: () => {
        var f;
        return [Ze(P("div", {
          class: ve(["v-window-item", n.selectedClass.value, e.class]),
          style: Ve(e.style)
        }, [v.value && ((f = t.default) == null ? void 0 : f.call(t))]), [[It, n.isSelected.value]])];
      }
    })), {
      groupItem: n
    };
  }
}), dr = U({
  ...Yn()
}, "VTabsWindowItem"), ia = le()({
  name: "VTabsWindowItem",
  props: dr(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    return ne(() => {
      const a = Wa.filterProps(e);
      return h(Wa, H({
        _as: "VTabsWindowItem"
      }, a, {
        class: ["v-tabs-window-item", e.class],
        style: e.style
      }), t);
    }), {};
  }
});
function vr(e) {
  let {
    selectedElement: l,
    containerElement: t,
    isRtl: a,
    isHorizontal: n
  } = e;
  const o = Ot(n, t), i = qn(n, a, t), s = Ot(n, l), r = Xn(n, l), c = s * 0.4;
  return i > r ? r - c : i + o < r + s ? r - o + s + c : i;
}
function fr(e) {
  let {
    selectedElement: l,
    containerElement: t,
    isHorizontal: a
  } = e;
  const n = Ot(a, t), o = Xn(a, l), i = Ot(a, l);
  return o - n / 2 + i / 2;
}
function Kl(e, l) {
  const t = e ? "scrollWidth" : "scrollHeight";
  return (l == null ? void 0 : l[t]) || 0;
}
function mr(e, l) {
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
function Ot(e, l) {
  const t = e ? "offsetWidth" : "offsetHeight";
  return (l == null ? void 0 : l[t]) || 0;
}
function Xn(e, l) {
  const t = e ? "offsetLeft" : "offsetTop";
  return (l == null ? void 0 : l[t]) || 0;
}
const Zn = Symbol.for("vuetify:v-slide-group"), dl = U({
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
    type: we,
    default: "$next"
  },
  prevIcon: {
    type: we,
    default: "$prev"
  },
  showArrows: {
    type: [Boolean, String],
    validator: (e) => typeof e == "boolean" || ["always", "desktop", "mobile"].includes(e)
  },
  ...Se(),
  ...Ut({
    mobile: null
  }),
  ...Ue(),
  ...sn({
    selectedClass: "v-slide-group-item--active"
  })
}, "VSlideGroup"), Ft = le()({
  name: "VSlideGroup",
  props: dl(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, l) {
    let {
      slots: t
    } = l;
    const {
      isRtl: a
    } = nt(), {
      displayClasses: n,
      mobile: o
    } = dt(e), i = Ja(e, e.symbol), s = Q(!1), r = Q(0), c = Q(0), u = Q(0), d = I(() => e.direction === "horizontal"), {
      resizeRef: m,
      contentRect: v
    } = kt(), {
      resizeRef: f,
      contentRect: V
    } = kt(), y = Ki(), w = I(() => ({
      container: m.el,
      duration: 200,
      easing: "easeOutQuart"
    })), g = I(() => i.selected.value.length ? i.items.value.findIndex((E) => E.id === i.selected.value[0]) : -1), C = I(() => i.selected.value.length ? i.items.value.findIndex((E) => E.id === i.selected.value[i.selected.value.length - 1]) : -1);
    if (He) {
      let E = -1;
      ee(() => [i.selected.value, v.value, V.value, d.value], () => {
        cancelAnimationFrame(E), E = requestAnimationFrame(() => {
          if (v.value && V.value) {
            const O = d.value ? "width" : "height";
            c.value = v.value[O], u.value = V.value[O], s.value = c.value + 1 < u.value;
          }
          if (g.value >= 0 && f.el) {
            const O = f.el.children[C.value];
            p(O, e.centerActive);
          }
        });
      });
    }
    const S = Q(!1);
    function p(E, O) {
      let z = 0;
      O ? z = fr({
        containerElement: m.el,
        isHorizontal: d.value,
        selectedElement: E
      }) : z = vr({
        containerElement: m.el,
        isHorizontal: d.value,
        isRtl: a.value,
        selectedElement: E
      }), k(z);
    }
    function k(E) {
      if (!He || !m.el) return;
      const O = Ot(d.value, m.el), z = qn(d.value, a.value, m.el);
      if (!(Kl(d.value, m.el) <= O || // Prevent scrolling by only a couple of pixels, which doesn't look smooth
      Math.abs(E - z) < 16)) {
        if (d.value && a.value && m.el) {
          const {
            scrollWidth: te,
            offsetWidth: ue
          } = m.el;
          E = te - ue - E;
        }
        d.value ? y.horizontal(E, w.value) : y(E, w.value);
      }
    }
    function T(E) {
      const {
        scrollTop: O,
        scrollLeft: z
      } = E.target;
      r.value = d.value ? z : O;
    }
    function b(E) {
      if (S.value = !0, !(!s.value || !f.el)) {
        for (const O of E.composedPath())
          for (const z of f.el.children)
            if (z === O) {
              p(z);
              return;
            }
      }
    }
    function B(E) {
      S.value = !1;
    }
    let _ = !1;
    function $(E) {
      var O;
      !_ && !S.value && !(E.relatedTarget && ((O = f.el) != null && O.contains(E.relatedTarget))) && W(), _ = !1;
    }
    function M() {
      _ = !0;
    }
    function D(E) {
      if (!f.el) return;
      function O(z) {
        E.preventDefault(), W(z);
      }
      d.value ? E.key === "ArrowRight" ? O(a.value ? "prev" : "next") : E.key === "ArrowLeft" && O(a.value ? "next" : "prev") : E.key === "ArrowDown" ? O("next") : E.key === "ArrowUp" && O("prev"), E.key === "Home" ? O("first") : E.key === "End" && O("last");
    }
    function K(E, O) {
      if (!E) return;
      let z = E;
      do
        z = z == null ? void 0 : z[O === "next" ? "nextElementSibling" : "previousElementSibling"];
      while (z != null && z.hasAttribute("disabled"));
      return z;
    }
    function W(E) {
      if (!f.el) return;
      let O;
      if (!E)
        O = Fa(f.el)[0];
      else if (E === "next") {
        if (O = K(f.el.querySelector(":focus"), E), !O) return W("first");
      } else if (E === "prev") {
        if (O = K(f.el.querySelector(":focus"), E), !O) return W("last");
      } else E === "first" ? (O = f.el.firstElementChild, O != null && O.hasAttribute("disabled") && (O = K(O, "next"))) : E === "last" && (O = f.el.lastElementChild, O != null && O.hasAttribute("disabled") && (O = K(O, "prev")));
      O && O.focus({
        preventScroll: !0
      });
    }
    function G(E) {
      const O = d.value && a.value ? -1 : 1, z = (E === "prev" ? -O : O) * c.value;
      let he = r.value + z;
      if (d.value && a.value && m.el) {
        const {
          scrollWidth: te,
          offsetWidth: ue
        } = m.el;
        he += te - ue;
      }
      k(he);
    }
    const ae = I(() => ({
      next: i.next,
      prev: i.prev,
      select: i.select,
      isSelected: i.isSelected
    })), oe = I(() => {
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
    }), fe = I(() => Math.abs(r.value) > 1), A = I(() => {
      if (!m.value) return !1;
      const E = Kl(d.value, m.el), O = mr(d.value, m.el);
      return E - O - Math.abs(r.value) > 1;
    });
    return ne(() => h(e.tag, {
      class: ve(["v-slide-group", {
        "v-slide-group--vertical": !d.value,
        "v-slide-group--has-affixes": oe.value,
        "v-slide-group--is-overflowing": s.value
      }, n.value, e.class]),
      style: Ve(e.style),
      tabindex: S.value || i.selected.value.length ? -1 : 0,
      onFocus: $
    }, {
      default: () => {
        var E, O, z;
        return [oe.value && P("div", {
          key: "prev",
          class: ve(["v-slide-group__prev", {
            "v-slide-group__prev--disabled": !fe.value
          }]),
          onMousedown: M,
          onClick: () => fe.value && G("prev")
        }, [((E = t.prev) == null ? void 0 : E.call(t, ae.value)) ?? h(Pl, null, {
          default: () => [h(xe, {
            icon: a.value ? e.nextIcon : e.prevIcon
          }, null)]
        })]), P("div", {
          key: "container",
          ref: m,
          class: "v-slide-group__container",
          onScroll: T
        }, [P("div", {
          ref: f,
          class: "v-slide-group__content",
          onFocusin: b,
          onFocusout: B,
          onKeydown: D
        }, [(O = t.default) == null ? void 0 : O.call(t, ae.value)])]), oe.value && P("div", {
          key: "next",
          class: ve(["v-slide-group__next", {
            "v-slide-group__next--disabled": !A.value
          }]),
          onMousedown: M,
          onClick: () => A.value && G("next")
        }, [((z = t.next) == null ? void 0 : z.call(t, ae.value)) ?? h(Pl, null, {
          default: () => [h(xe, {
            icon: a.value ? e.prevIcon : e.nextIcon
          }, null)]
        })])];
      }
    })), {
      selected: i.selected,
      scrollTo: G,
      scrollOffset: r,
      focus: W,
      hasPrev: fe,
      hasNext: A
    };
  }
});
function gr(e) {
  return e ? e.map((l) => Li(l) ? l : {
    text: l,
    value: l
  }) : [];
}
const yr = U({
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
  ...dl({
    mandatory: "force",
    selectedClass: "v-tab-item--selected"
  }),
  ...ct(),
  ...Ue()
}, "VTabs"), hr = le()({
  name: "VTabs",
  props: yr(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, l) {
    let {
      attrs: t,
      slots: a
    } = l;
    const n = ke(e, "modelValue"), o = I(() => gr(e.items)), {
      densityClasses: i
    } = At(e), {
      backgroundColorClasses: s,
      backgroundColorStyles: r
    } = st(() => e.bgColor), {
      scopeId: c
    } = Kt();
    return at({
      VTab: {
        color: N(() => e.color),
        direction: N(() => e.direction),
        stacked: N(() => e.stacked),
        fixed: N(() => e.fixedTabs),
        sliderColor: N(() => e.sliderColor),
        hideSlider: N(() => e.hideSlider)
      }
    }), ne(() => {
      const u = Ft.filterProps(e), d = !!(a.window || e.items.length > 0);
      return P(J, null, [h(Ft, H(u, {
        modelValue: n.value,
        "onUpdate:modelValue": (m) => n.value = m,
        class: ["v-tabs", `v-tabs--${e.direction}`, `v-tabs--align-tabs-${e.alignTabs}`, {
          "v-tabs--fixed-tabs": e.fixedTabs,
          "v-tabs--grow": e.grow,
          "v-tabs--stacked": e.stacked
        }, i.value, s.value, e.class],
        style: [{
          "--v-tabs-height": ye(e.height)
        }, r.value, e.style],
        role: "tablist",
        symbol: ul
      }, c, t), {
        default: () => {
          var m;
          return [((m = a.default) == null ? void 0 : m.call(a)) ?? o.value.map((v) => {
            var f;
            return ((f = a.tab) == null ? void 0 : f.call(a, {
              item: v
            })) ?? h(Na, H(v, {
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
      }), d && h(cl, H({
        modelValue: n.value,
        "onUpdate:modelValue": (m) => n.value = m,
        key: "tabs-window"
      }, c), {
        default: () => {
          var m;
          return [o.value.map((v) => {
            var f;
            return ((f = a.item) == null ? void 0 : f.call(a, {
              item: v
            })) ?? h(ia, {
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
}), br = { class: "nav-home" };
var Xl;
const pr = /* @__PURE__ */ qe({
  __name: "OxApp",
  props: {
    apiUrl: {},
    logo: {},
    dataEl: { default: (Xl = document.body.dataset) == null ? void 0 : Xl.appData },
    models: {},
    data: {}
  },
  setup(e) {
    const l = ut(), t = ft(l, "panels."), a = e, n = Xe({ drawer: !0 }), o = mi(a), i = gi();
    return Qe(() => {
      i.panel = o.data.panel;
    }), ee(() => [o.state.state, o.state.data], () => {
      o.showState = !0;
    }), oi((s, r, c) => {
      o.state.error(`${s}`);
    }), (s, r) => (L(), Z(ks, null, {
      default: F(() => [
        h(tr, {
          modelValue: x(o).showState,
          "onUpdate:modelValue": r[0] || (r[0] = (c) => x(o).showState = c),
          color: x(o).state.color,
          "multi-line": ""
        }, {
          default: F(() => [
            Pe(Fe(x(o).state.data), 1)
          ]),
          _: 1
        }, 8, ["modelValue", "color"]),
        h(Ts, { color: "primary" }, {
          prepend: F(() => [
            h(Ln, {
              icon: "mdi-apps",
              title: x(ie)("nav.panels"),
              "aria-label": x(ie)("nav.panels"),
              onClick: r[1] || (r[1] = Ie((c) => n.drawer = !n.drawer, ["stop"]))
            }, null, 8, ["title", "aria-label"])
          ]),
          default: F(() => [
            h(Ml, { id: "app-bar-sheet-title" }),
            h(Ml, { id: "app-bar-title" }, {
              default: F(() => [
                j(s.$slots, "title", { context: x(o) })
              ]),
              _: 3
            }),
            j(s.$slots, "app-bar-left", { context: x(o) }),
            r[5] || (r[5] = P("div", {
              id: "app-bar-right",
              class: "mr-3"
            }, null, -1)),
            j(s.$slots, "app-bar-right", { context: x(o) })
          ]),
          _: 3,
          __: [5]
        }),
        h(x(Ss), {
          drawer: n.drawer,
          "onUpdate:drawer": r[3] || (r[3] = (c) => n.drawer = c),
          items: x(o).data.nav
        }, xt({
          prepend: F(() => [
            P("a", br, [
              s.logo ? (L(), Z(ga, {
                key: 0,
                src: s.logo,
                class: "logo"
              }, null, 8, ["src"])) : ce("", !0)
            ]),
            j(s.$slots, "nav-start", { context: x(o) })
          ]),
          _: 2
        }, [
          x(l)["nav-end"] ? {
            name: "append",
            fn: F(() => [
              h(rt, {
                opened: n.opened,
                "onUpdate:opened": r[2] || (r[2] = (c) => n.opened = c)
              }, {
                default: F(() => [
                  j(s.$slots, "nav-end", { context: x(o) })
                ]),
                _: 3
              }, 8, ["opened"])
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["drawer", "items"]),
        h(Bs, null, {
          default: F(() => [
            j(s.$slots, "main", {}, () => [
              h(cl, {
                modelValue: x(i).panel,
                "onUpdate:modelValue": r[4] || (r[4] = (c) => x(i).panel = c)
              }, {
                default: F((c) => [
                  j(s.$slots, "default", H(c, { context: x(o) })),
                  (L(!0), be(J, null, De(x(t), (u, d) => (L(), Z(ia, {
                    key: d,
                    value: u
                  }, {
                    default: F(() => [
                      j(s.$slots, d, H({ ref_for: !0 }, c, { context: x(o) }))
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
}), wr = U({
  text: String,
  onClick: Ye(),
  ...Se(),
  ...Re()
}, "VLabel"), Qn = le()({
  name: "VLabel",
  props: wr(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    return ne(() => {
      var a;
      return P("label", {
        class: ve(["v-label", {
          "v-label--clickable": !!e.onClick
        }, e.class]),
        style: Ve(e.style),
        onClick: e.onClick
      }, [e.text, (a = t.default) == null ? void 0 : a.call(t)]);
    }), {};
  }
}), Jn = Symbol.for("vuetify:selection-control-group"), eo = U({
  color: String,
  disabled: {
    type: Boolean,
    default: null
  },
  defaultsTarget: String,
  error: Boolean,
  id: String,
  inline: Boolean,
  falseIcon: we,
  trueIcon: we,
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
  ...ct(),
  ...Re()
}, "SelectionControlGroup"), Sr = U({
  ...eo({
    defaultsTarget: "VSelectionControl"
  })
}, "VSelectionControlGroup");
le()({
  name: "VSelectionControlGroup",
  props: Sr(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = ke(e, "modelValue"), n = gt(), o = N(() => e.id || `v-selection-control-group-${n}`), i = N(() => e.name || o.value), s = /* @__PURE__ */ new Set();
    return ze(Jn, {
      modelValue: a,
      forceUpdate: () => {
        s.forEach((r) => r());
      },
      onForceUpdate: (r) => {
        s.add(r), We(() => {
          s.delete(r);
        });
      }
    }), at({
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
    }), ne(() => {
      var r;
      return P("div", {
        class: ve(["v-selection-control-group", {
          "v-selection-control-group--inline": e.inline
        }, e.class]),
        style: Ve(e.style),
        role: e.type === "radio" ? "radiogroup" : void 0
      }, [(r = t.default) == null ? void 0 : r.call(t)]);
    }), {};
  }
});
const to = U({
  label: String,
  baseColor: String,
  trueValue: null,
  falseValue: null,
  value: null,
  ...Se(),
  ...eo()
}, "VSelectionControl");
function xr(e) {
  const l = de(Jn, void 0), {
    densityClasses: t
  } = At(e), a = ke(e, "modelValue"), n = I(() => e.trueValue !== void 0 ? e.trueValue : e.value !== void 0 ? e.value : !0), o = I(() => e.falseValue !== void 0 ? e.falseValue : !1), i = I(() => !!e.multiple || e.multiple == null && Array.isArray(a.value)), s = I({
    get() {
      const v = l ? l.modelValue.value : a.value;
      return i.value ? Ne(v).some((f) => e.valueComparator(f, n.value)) : e.valueComparator(v, n.value);
    },
    set(v) {
      if (e.readonly) return;
      const f = v ? n.value : o.value;
      let V = f;
      i.value && (V = v ? [...Ne(a.value), f] : Ne(a.value).filter((y) => !e.valueComparator(y, n.value))), l ? l.modelValue.value = V : a.value = V;
    }
  }), {
    textColorClasses: r,
    textColorStyles: c
  } = Wt(() => {
    if (!(e.error || e.disabled))
      return s.value ? e.color : e.baseColor;
  }), {
    backgroundColorClasses: u,
    backgroundColorStyles: d
  } = st(() => s.value && !e.error && !e.disabled ? e.color : e.baseColor), m = I(() => s.value ? e.trueIcon : e.falseIcon);
  return {
    group: l,
    densityClasses: t,
    trueValue: n,
    falseValue: o,
    model: s,
    textColorClasses: r,
    textColorStyles: c,
    backgroundColorClasses: u,
    backgroundColorStyles: d,
    icon: m
  };
}
const jl = le()({
  name: "VSelectionControl",
  directives: {
    vRipple: Vt
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
      textColorStyles: c,
      backgroundColorClasses: u,
      backgroundColorStyles: d,
      trueValue: m
    } = xr(e), v = gt(), f = Q(!1), V = Q(!1), y = X(), w = N(() => e.id || `input-${v}`), g = N(() => !e.disabled && !e.readonly);
    n == null || n.onForceUpdate(() => {
      y.value && (y.value.checked = s.value);
    });
    function C(T) {
      g.value && (f.value = !0, Pt(T.target, ":focus-visible") !== !1 && (V.value = !0));
    }
    function S() {
      f.value = !1, V.value = !1;
    }
    function p(T) {
      T.stopPropagation();
    }
    function k(T) {
      if (!g.value) {
        y.value && (y.value.checked = s.value);
        return;
      }
      e.readonly && n && $e(() => n.forceUpdate()), s.value = T.target.checked;
    }
    return ne(() => {
      var $, M;
      const T = a.label ? a.label({
        label: e.label,
        props: {
          for: w.value
        }
      }) : e.label, [b, B] = wn(t), _ = P("input", H({
        ref: y,
        checked: s.value,
        disabled: !!e.disabled,
        id: w.value,
        onBlur: S,
        onFocus: C,
        onInput: k,
        "aria-disabled": !!e.disabled,
        "aria-label": e.label,
        type: e.type,
        value: m.value,
        name: e.name,
        "aria-checked": e.type === "checkbox" ? s.value : void 0
      }, B), null);
      return P("div", H({
        class: ["v-selection-control", {
          "v-selection-control--dirty": s.value,
          "v-selection-control--disabled": e.disabled,
          "v-selection-control--error": e.error,
          "v-selection-control--focused": f.value,
          "v-selection-control--focus-visible": V.value,
          "v-selection-control--inline": e.inline
        }, o.value, e.class]
      }, b, {
        style: e.style
      }), [P("div", {
        class: ve(["v-selection-control__wrapper", r.value]),
        style: Ve(c.value)
      }, [($ = a.default) == null ? void 0 : $.call(a, {
        backgroundColorClasses: u,
        backgroundColorStyles: d
      }), Ze(P("div", {
        class: ve(["v-selection-control__input"])
      }, [((M = a.input) == null ? void 0 : M.call(a, {
        model: s,
        textColorClasses: r,
        textColorStyles: c,
        backgroundColorClasses: u,
        backgroundColorStyles: d,
        inputNode: _,
        icon: i.value,
        props: {
          onFocus: C,
          onBlur: S,
          id: w.value
        }
      })) ?? P(J, null, [i.value && h(xe, {
        key: "icon",
        icon: i.value
      }, null), _])]), [[Vt, e.ripple && [!e.disabled && !e.readonly, null, ["center", "circle"]]]])]), T && h(Qn, {
        for: w.value,
        onClick: p
      }, {
        default: () => [T]
      })]);
    }), {
      isFocused: f,
      input: y
    };
  }
}), kr = U({
  indeterminate: Boolean,
  indeterminateIcon: {
    type: we,
    default: "$checkboxIndeterminate"
  },
  ...to({
    falseIcon: "$checkboxOff",
    trueIcon: "$checkboxOn"
  })
}, "VCheckboxBtn"), jt = le()({
  name: "VCheckboxBtn",
  props: kr(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:indeterminate": (e) => !0
  },
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = ke(e, "indeterminate"), n = ke(e, "modelValue");
    function o(r) {
      a.value && (a.value = !1);
    }
    const i = N(() => a.value ? e.indeterminateIcon : e.falseIcon), s = N(() => a.value ? e.indeterminateIcon : e.trueIcon);
    return ne(() => {
      const r = bt(jl.filterProps(e), ["modelValue"]);
      return h(jl, H(r, {
        modelValue: n.value,
        "onUpdate:modelValue": [(c) => n.value = c, o],
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
  } = ot();
  function t(a) {
    let {
      name: n,
      color: o,
      ...i
    } = a;
    const s = {
      prepend: "prependAction",
      prependInner: "prependAction",
      append: "appendAction",
      appendInner: "appendAction",
      clear: "clear"
    }[n], r = e[`onClick:${n}`];
    function c(d) {
      d.key !== "Enter" && d.key !== " " || (d.preventDefault(), d.stopPropagation(), Sn(r, new PointerEvent("click", d)));
    }
    const u = r && s ? l(`$vuetify.input.${s}`, e.label ?? "") : void 0;
    return h(xe, H({
      icon: e[`${n}Icon`],
      "aria-label": u,
      onClick: r,
      onKeydown: c,
      color: o
    }, i), null);
  }
  return {
    InputIcon: t
  };
}
const Vr = U({
  active: Boolean,
  color: String,
  messages: {
    type: [Array, String],
    default: () => []
  },
  ...Se(),
  ...Ht({
    transition: {
      component: rn,
      leaveAbsolute: !0,
      group: !0
    }
  })
}, "VMessages"), Cr = le()({
  name: "VMessages",
  props: Vr(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = I(() => Ne(e.messages)), {
      textColorClasses: n,
      textColorStyles: o
    } = Wt(() => e.color);
    return ne(() => h(ya, {
      transition: e.transition,
      tag: "div",
      class: ve(["v-messages", n.value, e.class]),
      style: Ve([o.value, e.style])
    }, {
      default: () => [e.active && a.value.map((i, s) => P("div", {
        class: "v-messages__message",
        key: `${s}-${a.value}`
      }, [t.message ? t.message({
        message: i
      }) : i]))]
    })), {};
  }
}), lo = U({
  focused: Boolean,
  "onUpdate:focused": Ye()
}, "focus");
function no(e) {
  let l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : xn();
  const t = ke(e, "focused"), a = N(() => ({
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
const oo = Symbol.for("vuetify:form"), Pr = U({
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
function Ir(e) {
  const l = ke(e, "modelValue"), t = N(() => e.disabled), a = N(() => e.readonly), n = Q(!1), o = X([]), i = X([]);
  async function s() {
    const u = [];
    let d = !0;
    i.value = [], n.value = !0;
    for (const m of o.value) {
      const v = await m.validate();
      if (v.length > 0 && (d = !1, u.push({
        id: m.id,
        errorMessages: v
      })), !d && e.fastFail) break;
    }
    return i.value = u, n.value = !1, {
      valid: d,
      errors: i.value
    };
  }
  function r() {
    o.value.forEach((u) => u.reset());
  }
  function c() {
    o.value.forEach((u) => u.resetValidation());
  }
  return ee(o, () => {
    let u = 0, d = 0;
    const m = [];
    for (const v of o.value)
      v.isValid === !1 ? (d++, m.push({
        id: v.id,
        errorMessages: v.errorMessages
      })) : v.isValid === !0 && u++;
    i.value = m, l.value = d > 0 ? !1 : u === o.value.length ? !0 : null;
  }, {
    deep: !0,
    flush: "post"
  }), ze(oo, {
    register: (u) => {
      let {
        id: d,
        vm: m,
        validate: v,
        reset: f,
        resetValidation: V
      } = u;
      o.value.some((y) => y.id === d) && hn(`Duplicate input name "${d}"`), o.value.push({
        id: d,
        validate: v,
        reset: f,
        resetValidation: V,
        vm: ii(m),
        isValid: null,
        errorMessages: []
      });
    },
    unregister: (u) => {
      o.value = o.value.filter((d) => d.id !== u);
    },
    update: (u, d, m) => {
      const v = o.value.find((f) => f.id === u);
      v && (v.isValid = d, v.errorMessages = m);
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
    resetValidation: c
  };
}
function vl(e) {
  const l = de(oo, null);
  return {
    ...l,
    isReadonly: I(() => !!((e == null ? void 0 : e.readonly) ?? (l == null ? void 0 : l.isReadonly.value))),
    isDisabled: I(() => !!((e == null ? void 0 : e.disabled) ?? (l == null ? void 0 : l.isDisabled.value)))
  };
}
const Tr = Symbol.for("vuetify:rules");
function Ar(e) {
  const l = de(Tr, null);
  return l ? l(e) : N(e);
}
const _r = U({
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
  ...lo()
}, "validation");
function Br(e) {
  let l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : xn(), t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : gt();
  const a = ke(e, "modelValue"), n = I(() => e.validationValue === void 0 ? a.value : e.validationValue), o = vl(e), i = Ar(() => e.rules), s = X([]), r = Q(!0), c = I(() => !!(Ne(a.value === "" ? null : a.value).length || Ne(n.value === "" ? null : n.value).length)), u = I(() => {
    var S;
    return (S = e.errorMessages) != null && S.length ? Ne(e.errorMessages).concat(s.value).slice(0, Math.max(0, Number(e.maxErrors))) : s.value;
  }), d = I(() => {
    var k;
    let S = (e.validateOn ?? ((k = o.validateOn) == null ? void 0 : k.value)) || "input";
    S === "lazy" && (S = "input lazy"), S === "eager" && (S = "input eager");
    const p = new Set((S == null ? void 0 : S.split(" ")) ?? []);
    return {
      input: p.has("input"),
      blur: p.has("blur") || p.has("input") || p.has("invalid-input"),
      invalidInput: p.has("invalid-input"),
      lazy: p.has("lazy"),
      eager: p.has("eager")
    };
  }), m = I(() => {
    var S;
    return e.error || (S = e.errorMessages) != null && S.length ? !1 : e.rules.length ? r.value ? s.value.length || d.value.lazy ? null : !0 : !s.value.length : !0;
  }), v = Q(!1), f = I(() => ({
    [`${l}--error`]: m.value === !1,
    [`${l}--dirty`]: c.value,
    [`${l}--disabled`]: o.isDisabled.value,
    [`${l}--readonly`]: o.isReadonly.value
  })), V = lt("validation"), y = I(() => e.name ?? x(t));
  si(() => {
    var S;
    (S = o.register) == null || S.call(o, {
      id: y.value,
      vm: V,
      validate: C,
      reset: w,
      resetValidation: g
    });
  }), yt(() => {
    var S;
    (S = o.unregister) == null || S.call(o, y.value);
  }), Qe(async () => {
    var S;
    d.value.lazy || await C(!d.value.eager), (S = o.update) == null || S.call(o, y.value, m.value, u.value);
  }), Ge(() => d.value.input || d.value.invalidInput && m.value === !1, () => {
    ee(n, () => {
      if (n.value != null)
        C();
      else if (e.focused) {
        const S = ee(() => e.focused, (p) => {
          p || C(), S();
        });
      }
    });
  }), Ge(() => d.value.blur, () => {
    ee(() => e.focused, (S) => {
      S || C();
    });
  }), ee([m, u], () => {
    var S;
    (S = o.update) == null || S.call(o, y.value, m.value, u.value);
  });
  async function w() {
    a.value = null, await $e(), await g();
  }
  async function g() {
    r.value = !0, d.value.lazy ? s.value = [] : await C(!d.value.eager);
  }
  async function C() {
    let S = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    const p = [];
    v.value = !0;
    for (const k of i.value) {
      if (p.length >= Number(e.maxErrors ?? 1))
        break;
      const b = await (typeof k == "function" ? k : () => k)(n.value);
      if (b !== !0) {
        if (b !== !1 && typeof b != "string") {
          console.warn(`${b} is not a valid value. Rule functions must return boolean true or a string.`);
          continue;
        }
        p.push(b || "");
      }
    }
    return s.value = p, v.value = !1, r.value = S, s.value;
  }
  return {
    errorMessages: u,
    isDirty: c,
    isDisabled: o.isDisabled,
    isReadonly: o.isReadonly,
    isPristine: r,
    isValid: m,
    isValidating: v,
    reset: w,
    resetValidation: g,
    validate: C,
    validationClasses: f
  };
}
const io = U({
  id: String,
  appendIcon: we,
  baseColor: String,
  centerAffix: {
    type: Boolean,
    default: !0
  },
  color: String,
  glow: Boolean,
  iconColor: [Boolean, String],
  prependIcon: we,
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
  "onClick:prepend": Ye(),
  "onClick:append": Ye(),
  ...Se(),
  ...ct(),
  ...Mi(Nt(), ["maxWidth", "minWidth", "width"]),
  ...Re(),
  ..._r()
}, "VInput"), Gl = le()({
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
    } = At(e), {
      dimensionStyles: i
    } = Rt(e), {
      themeClasses: s
    } = Ke(e), {
      rtlClasses: r
    } = nt(), {
      InputIcon: c
    } = ao(e), u = gt(), d = I(() => e.id || `input-${u}`), m = I(() => `${d.value}-messages`), {
      errorMessages: v,
      isDirty: f,
      isDisabled: V,
      isReadonly: y,
      isPristine: w,
      isValid: g,
      isValidating: C,
      reset: S,
      resetValidation: p,
      validate: k,
      validationClasses: T
    } = Br(e, "v-input", d), b = I(() => ({
      id: d,
      messagesId: m,
      isDirty: f,
      isDisabled: V,
      isReadonly: y,
      isPristine: w,
      isValid: g,
      isValidating: C,
      reset: S,
      resetValidation: p,
      validate: k
    })), B = N(() => e.error || e.disabled ? void 0 : e.focused ? e.color : e.baseColor), _ = N(() => {
      if (e.iconColor)
        return e.iconColor === !0 ? B.value : e.iconColor;
    }), $ = I(() => {
      var M;
      return (M = e.errorMessages) != null && M.length || !w.value && v.value.length ? v.value : e.hint && (e.persistentHint || e.focused) ? e.hint : e.messages;
    });
    return ne(() => {
      var G, ae, oe, fe;
      const M = !!(a.prepend || e.prependIcon), D = !!(a.append || e.appendIcon), K = $.value.length > 0, W = !e.hideDetails || e.hideDetails === "auto" && (K || !!a.details);
      return P("div", {
        class: ve(["v-input", `v-input--${e.direction}`, {
          "v-input--center-affix": e.centerAffix,
          "v-input--focused": e.focused,
          "v-input--glow": e.glow,
          "v-input--hide-spin-buttons": e.hideSpinButtons
        }, o.value, s.value, r.value, T.value, e.class]),
        style: Ve([i.value, e.style])
      }, [M && P("div", {
        key: "prepend",
        class: "v-input__prepend"
      }, [(G = a.prepend) == null ? void 0 : G.call(a, b.value), e.prependIcon && h(c, {
        key: "prepend-icon",
        name: "prepend",
        color: _.value
      }, null)]), a.default && P("div", {
        class: "v-input__control"
      }, [(ae = a.default) == null ? void 0 : ae.call(a, b.value)]), D && P("div", {
        key: "append",
        class: "v-input__append"
      }, [e.appendIcon && h(c, {
        key: "append-icon",
        name: "append",
        color: _.value
      }, null), (oe = a.append) == null ? void 0 : oe.call(a, b.value)]), W && P("div", {
        id: m.value,
        class: "v-input__details",
        role: "alert",
        "aria-live": "polite"
      }, [h(Cr, {
        active: K,
        messages: $.value
      }, {
        message: a.message
      }), (fe = a.details) == null ? void 0 : fe.call(a, b.value)])]);
    }), {
      reset: S,
      resetValidation: p,
      validate: k,
      isValid: g,
      errorMessages: v
    };
  }
}), so = Symbol.for("vuetify:v-chip-group"), Er = U({
  baseColor: String,
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: it
  },
  ...dl(),
  ...Se(),
  ...sn({
    selectedClass: "v-chip--selected"
  }),
  ...Ue(),
  ...Re(),
  ...zt({
    variant: "tonal"
  })
}, "VChipGroup");
le()({
  name: "VChipGroup",
  props: Er(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, l) {
    let {
      slots: t
    } = l;
    const {
      themeClasses: a
    } = Ke(e), {
      isSelected: n,
      select: o,
      next: i,
      prev: s,
      selected: r
    } = Ja(e, so);
    return at({
      VChip: {
        baseColor: N(() => e.baseColor),
        color: N(() => e.color),
        disabled: N(() => e.disabled),
        filter: N(() => e.filter),
        variant: N(() => e.variant)
      }
    }), ne(() => {
      const c = Ft.filterProps(e);
      return h(Ft, H(c, {
        class: ["v-chip-group", {
          "v-chip-group--column": e.column
        }, a.value, e.class],
        style: e.style
      }), {
        default: () => {
          var u;
          return [(u = t.default) == null ? void 0 : u.call(t, {
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
const $r = U({
  activeClass: String,
  appendAvatar: String,
  appendIcon: we,
  baseColor: String,
  closable: Boolean,
  closeIcon: {
    type: we,
    default: "$delete"
  },
  closeLabel: {
    type: String,
    default: "$vuetify.close"
  },
  draggable: Boolean,
  filter: Boolean,
  filterIcon: {
    type: we,
    default: "$complete"
  },
  label: Boolean,
  link: {
    type: Boolean,
    default: void 0
  },
  pill: Boolean,
  prependAvatar: String,
  prependIcon: we,
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
  onClick: Ye(),
  onClickOnce: Ye(),
  ...Mt(),
  ...Se(),
  ...ct(),
  ...Lt(),
  ...el(),
  ...ht(),
  ...vn(),
  ...dn(),
  ...Ue({
    tag: "span"
  }),
  ...Re(),
  ...zt({
    variant: "tonal"
  })
}, "VChip"), fl = le()({
  name: "VChip",
  directives: {
    vRipple: Vt
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
    } = ot(), {
      borderClasses: i
    } = va(e), {
      densityClasses: s
    } = At(e), {
      elevationClasses: r
    } = fa(e), {
      roundedClasses: c
    } = Tt(e), {
      sizeClasses: u
    } = Pi(e), {
      themeClasses: d
    } = Ke(e), m = ke(e, "modelValue"), v = tl(e, so, !1), f = un(e, t), V = N(() => e.link !== !1 && f.isLink.value), y = I(() => !e.disabled && e.link !== !1 && (!!v || e.link || f.isClickable.value)), w = N(() => ({
      "aria-label": o(e.closeLabel),
      disabled: e.disabled,
      onClick(T) {
        T.preventDefault(), T.stopPropagation(), m.value = !1, a("click:close", T);
      }
    })), {
      colorClasses: g,
      colorStyles: C,
      variantClasses: S
    } = Za(() => ({
      color: !v || v.isSelected.value ? e.color ?? e.baseColor : e.baseColor,
      variant: e.variant
    }));
    function p(T) {
      var b;
      a("click", T), y.value && ((b = f.navigate) == null || b.call(f, T), v == null || v.toggle());
    }
    function k(T) {
      (T.key === "Enter" || T.key === " ") && (T.preventDefault(), p(T));
    }
    return () => {
      var K;
      const T = f.isLink.value ? "a" : e.tag, b = !!(e.appendIcon || e.appendAvatar), B = !!(b || n.append), _ = !!(n.close || e.closable), $ = !!(n.filter || e.filter) && v, M = !!(e.prependIcon || e.prependAvatar), D = !!(M || n.prepend);
      return m.value && Ze(h(T, H({
        class: ["v-chip", {
          "v-chip--disabled": e.disabled,
          "v-chip--label": e.label,
          "v-chip--link": y.value,
          "v-chip--filter": $,
          "v-chip--pill": e.pill,
          [`${e.activeClass}`]: e.activeClass && ((K = f.isActive) == null ? void 0 : K.value)
        }, d.value, i.value, g.value, s.value, r.value, c.value, u.value, S.value, v == null ? void 0 : v.selectedClass.value, e.class],
        style: [C.value, e.style],
        disabled: e.disabled || void 0,
        draggable: e.draggable,
        tabindex: y.value ? 0 : void 0,
        onClick: p,
        onKeydown: y.value && !V.value && k
      }, f.linkProps), {
        default: () => {
          var W;
          return [Qa(y.value, "v-chip"), $ && h(cn, {
            key: "filter"
          }, {
            default: () => [Ze(P("div", {
              class: "v-chip__filter"
            }, [n.filter ? h(Le, {
              key: "filter-defaults",
              disabled: !e.filterIcon,
              defaults: {
                VIcon: {
                  icon: e.filterIcon
                }
              }
            }, n.filter) : h(xe, {
              key: "filter-icon",
              icon: e.filterIcon
            }, null)]), [[It, v.isSelected.value]])]
          }), D && P("div", {
            key: "prepend",
            class: "v-chip__prepend"
          }, [n.prepend ? h(Le, {
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
          }, n.prepend) : P(J, null, [e.prependIcon && h(xe, {
            key: "prepend-icon",
            icon: e.prependIcon,
            start: !0
          }, null), e.prependAvatar && h(Ct, {
            key: "prepend-avatar",
            image: e.prependAvatar,
            start: !0
          }, null)])]), P("div", {
            class: "v-chip__content",
            "data-no-activator": ""
          }, [((W = n.default) == null ? void 0 : W.call(n, {
            isSelected: v == null ? void 0 : v.isSelected.value,
            selectedClass: v == null ? void 0 : v.selectedClass.value,
            select: v == null ? void 0 : v.select,
            toggle: v == null ? void 0 : v.toggle,
            value: v == null ? void 0 : v.value.value,
            disabled: e.disabled
          })) ?? Fe(e.text)]), B && P("div", {
            key: "append",
            class: "v-chip__append"
          }, [n.append ? h(Le, {
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
          }, n.append) : P(J, null, [e.appendIcon && h(xe, {
            key: "append-icon",
            end: !0,
            icon: e.appendIcon
          }, null), e.appendAvatar && h(Ct, {
            key: "append-avatar",
            end: !0,
            image: e.appendAvatar
          }, null)])]), _ && P("button", H({
            key: "close",
            class: "v-chip__close",
            type: "button",
            "data-testid": "close-chip"
          }, w.value), [n.close ? h(Le, {
            key: "close-defaults",
            defaults: {
              VIcon: {
                icon: e.closeIcon,
                size: "x-small"
              }
            }
          }, n.close) : h(xe, {
            key: "close-icon",
            icon: e.closeIcon,
            size: "x-small"
          }, null)])];
        }
      }), [[Vt, y.value && e.ripple, null]]);
    };
  }
}), Or = U({
  // TODO
  // disableKeys: Boolean,
  id: String,
  submenu: Boolean,
  ...bt(rl({
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
}, "VMenu"), ml = le()({
  name: "VMenu",
  props: Or(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = ke(e, "modelValue"), {
      scopeId: n
    } = Kt(), {
      isRtl: o
    } = nt(), i = gt(), s = N(() => e.id || `v-menu-${i}`), r = X(), c = de(Ra, null), u = Q(/* @__PURE__ */ new Set());
    ze(Ra, {
      register() {
        u.value.add(i);
      },
      unregister() {
        u.value.delete(i);
      },
      closeParents(y) {
        setTimeout(() => {
          var w;
          !u.value.size && !e.persistent && (y == null || (w = r.value) != null && w.contentEl && !Ri(y, r.value.contentEl)) && (a.value = !1, c == null || c.closeParents());
        }, 40);
      }
    }), yt(() => {
      c == null || c.unregister(), document.removeEventListener("focusin", d);
    }), Zl(() => a.value = !1);
    async function d(y) {
      var C, S, p;
      const w = y.relatedTarget, g = y.target;
      await $e(), a.value && w !== g && ((C = r.value) != null && C.contentEl) && // We're the topmost menu
      ((S = r.value) != null && S.globalTop) && // It isn't the document or the menu body
      ![document, r.value.contentEl].includes(g) && // It isn't inside the menu body
      !r.value.contentEl.contains(g) && ((p = Fa(r.value.contentEl)[0]) == null || p.focus());
    }
    ee(a, (y) => {
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
      var w, g, C, S, p;
      if (!e.disabled)
        if (y.key === "Tab" || y.key === "Enter" && !e.closeOnContentClick) {
          if (y.key === "Enter" && (y.target instanceof HTMLTextAreaElement || y.target instanceof HTMLInputElement && y.target.closest("form"))) return;
          y.key === "Enter" && y.preventDefault(), Ni(Fa((w = r.value) == null ? void 0 : w.contentEl, !1), y.shiftKey ? "prev" : "next", (T) => T.tabIndex >= 0) || (a.value = !1, (C = (g = r.value) == null ? void 0 : g.activatorEl) == null || C.focus());
        } else e.submenu && y.key === (o.value ? "ArrowRight" : "ArrowLeft") && (a.value = !1, (p = (S = r.value) == null ? void 0 : S.activatorEl) == null || p.focus());
    }
    function f(y) {
      var g;
      if (e.disabled) return;
      const w = (g = r.value) == null ? void 0 : g.contentEl;
      w && a.value ? y.key === "ArrowDown" ? (y.preventDefault(), y.stopImmediatePropagation(), xa(w, "next")) : y.key === "ArrowUp" ? (y.preventDefault(), y.stopImmediatePropagation(), xa(w, "prev")) : e.submenu && (y.key === (o.value ? "ArrowRight" : "ArrowLeft") ? a.value = !1 : y.key === (o.value ? "ArrowLeft" : "ArrowRight") && (y.preventDefault(), xa(w, "first"))) : (e.submenu ? y.key === (o.value ? "ArrowLeft" : "ArrowRight") : ["ArrowDown", "ArrowUp"].includes(y.key)) && (a.value = !0, y.preventDefault(), setTimeout(() => setTimeout(() => f(y))));
    }
    const V = I(() => H({
      "aria-haspopup": "menu",
      "aria-expanded": String(a.value),
      "aria-controls": s.value,
      onKeydown: f
    }, e.activatorProps));
    return ne(() => {
      const y = oa.filterProps(e);
      return h(oa, H({
        ref: r,
        id: s.value,
        class: ["v-menu", e.class],
        style: e.style
      }, y, {
        modelValue: a.value,
        "onUpdate:modelValue": (w) => a.value = w,
        absolute: !0,
        activatorProps: V.value,
        location: e.location ?? (e.submenu ? "end" : "bottom"),
        "onClick:outside": m,
        onKeydown: v
      }, n), {
        activator: t.activator,
        default: function() {
          for (var w = arguments.length, g = new Array(w), C = 0; C < w; C++)
            g[C] = arguments[C];
          return h(Le, {
            root: "VMenu"
          }, {
            default: () => {
              var S;
              return [(S = t.default) == null ? void 0 : S.call(t, ...g)];
            }
          });
        }
      });
    }), pt({
      id: s,
      ΨopenChildren: u
    }, r);
  }
}), Fr = U({
  active: Boolean,
  disabled: Boolean,
  max: [Number, String],
  value: {
    type: [Number, String],
    default: 0
  },
  ...Se(),
  ...Ht({
    transition: {
      component: rn
    }
  })
}, "VCounter"), Dr = le()({
  name: "VCounter",
  functional: !0,
  props: Fr(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = N(() => e.max ? `${e.value} / ${e.max}` : String(e.value));
    return ne(() => h(ya, {
      transition: e.transition
    }, {
      default: () => [Ze(P("div", {
        class: ve(["v-counter", {
          "text-error": e.max && !e.disabled && parseFloat(e.value) > parseFloat(e.max)
        }, e.class]),
        style: Ve(e.style)
      }, [t.default ? t.default({
        counter: a.value,
        max: e.max,
        value: e.value
      }) : a.value]), [[It, e.active]])]
    })), {};
  }
}), Lr = U({
  floating: Boolean,
  ...Se()
}, "VFieldLabel"), Xt = le()({
  name: "VFieldLabel",
  props: Lr(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    return ne(() => h(Qn, {
      class: ve(["v-field-label", {
        "v-field-label--floating": e.floating
      }, e.class]),
      style: Ve(e.style),
      "aria-hidden": e.floating || void 0
    }, t)), {};
  }
}), Mr = ["underlined", "outlined", "filled", "solo", "solo-inverted", "solo-filled", "plain"], ro = U({
  appendInnerIcon: we,
  bgColor: String,
  clearable: Boolean,
  clearIcon: {
    type: we,
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
  prependInnerIcon: we,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {
    type: String,
    default: "filled",
    validator: (e) => Mr.includes(e)
  },
  "onClick:clear": Ye(),
  "onClick:appendInner": Ye(),
  "onClick:prependInner": Ye(),
  ...Se(),
  ...nl(),
  ...ht(),
  ...Re()
}, "VField"), Yl = le()({
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
    } = Ke(e), {
      loaderClasses: i
    } = al(e), {
      focusClasses: s,
      isFocused: r,
      focus: c,
      blur: u
    } = no(e), {
      InputIcon: d
    } = ao(e), {
      roundedClasses: m
    } = Tt(e), {
      rtlClasses: v
    } = nt(), f = N(() => e.dirty || e.active), V = N(() => !!(e.label || n.label)), y = N(() => !e.singleLine && V.value), w = gt(), g = I(() => e.id || `input-${w}`), C = N(() => `${g.value}-messages`), S = X(), p = X(), k = X(), T = I(() => ["plain", "underlined"].includes(e.variant)), b = I(() => e.error || e.disabled ? void 0 : f.value && r.value ? e.color : e.baseColor), B = I(() => {
      if (!(!e.iconColor || e.glow && !r.value))
        return e.iconColor === !0 ? b.value : e.iconColor;
    }), {
      backgroundColorClasses: _,
      backgroundColorStyles: $
    } = st(() => e.bgColor), {
      textColorClasses: M,
      textColorStyles: D
    } = Wt(b);
    ee(f, (G) => {
      if (y.value) {
        const ae = S.value.$el, oe = p.value.$el;
        requestAnimationFrame(() => {
          const fe = il(ae), A = oe.getBoundingClientRect(), E = A.x - fe.x, O = A.y - fe.y - (fe.height / 2 - A.height / 2), z = A.width / 0.75, he = Math.abs(z - fe.width) > 1 ? {
            maxWidth: ye(z)
          } : void 0, te = getComputedStyle(ae), ue = getComputedStyle(oe), q = parseFloat(te.transitionDuration) * 1e3 || 150, se = parseFloat(ue.getPropertyValue("--v-field-label-scale")), me = ue.getPropertyValue("color");
          ae.style.visibility = "visible", oe.style.visibility = "hidden", vt(ae, {
            transform: `translate(${E}px, ${O}px) scale(${se})`,
            color: me,
            ...he
          }, {
            duration: q,
            easing: Et,
            direction: G ? "normal" : "reverse"
          }).finished.then(() => {
            ae.style.removeProperty("visibility"), oe.style.removeProperty("visibility");
          });
        });
      }
    }, {
      flush: "post"
    });
    const K = I(() => ({
      isActive: f,
      isFocused: r,
      controlRef: k,
      blur: u,
      focus: c
    }));
    function W(G) {
      G.target !== document.activeElement && G.preventDefault();
    }
    return ne(() => {
      var E, O, z;
      const G = e.variant === "outlined", ae = !!(n["prepend-inner"] || e.prependInnerIcon), oe = !!(e.clearable || n.clear) && !e.disabled, fe = !!(n["append-inner"] || e.appendInnerIcon || oe), A = () => n.label ? n.label({
        ...K.value,
        label: e.label,
        props: {
          for: g.value
        }
      }) : e.label;
      return P("div", H({
        class: ["v-field", {
          "v-field--active": f.value,
          "v-field--appended": fe,
          "v-field--center-affix": e.centerAffix ?? !T.value,
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
          "v-field--no-label": !A(),
          [`v-field--variant-${e.variant}`]: !0
        }, o.value, _.value, s.value, i.value, m.value, v.value, e.class],
        style: [$.value, e.style],
        onClick: W
      }, t), [P("div", {
        class: "v-field__overlay"
      }, null), h(ll, {
        name: "v-field",
        active: !!e.loading,
        color: e.error ? "error" : typeof e.loading == "string" ? e.loading : e.color
      }, {
        default: n.loader
      }), ae && P("div", {
        key: "prepend",
        class: "v-field__prepend-inner"
      }, [e.prependInnerIcon && h(d, {
        key: "prepend-icon",
        name: "prependInner",
        color: B.value
      }, null), (E = n["prepend-inner"]) == null ? void 0 : E.call(n, K.value)]), P("div", {
        class: "v-field__field",
        "data-no-activator": ""
      }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(e.variant) && y.value && h(Xt, {
        key: "floating-label",
        ref: p,
        class: ve([M.value]),
        floating: !0,
        for: g.value,
        style: Ve(D.value)
      }, {
        default: () => [A()]
      }), V.value && h(Xt, {
        key: "label",
        ref: S,
        for: g.value
      }, {
        default: () => [A()]
      }), ((O = n.default) == null ? void 0 : O.call(n, {
        ...K.value,
        props: {
          id: g.value,
          class: "v-field__input",
          "aria-describedby": C.value
        },
        focus: c,
        blur: u
      })) ?? P("div", {
        id: g.value,
        class: "v-field__input",
        "aria-describedby": C.value
      }, null)]), oe && h(cn, {
        key: "clear"
      }, {
        default: () => [Ze(P("div", {
          class: "v-field__clearable",
          onMousedown: (he) => {
            he.preventDefault(), he.stopPropagation();
          }
        }, [h(Le, {
          defaults: {
            VIcon: {
              icon: e.clearIcon
            }
          }
        }, {
          default: () => [n.clear ? n.clear({
            ...K.value,
            props: {
              onFocus: c,
              onBlur: u,
              onClick: e["onClick:clear"],
              tabindex: -1
            }
          }) : h(d, {
            name: "clear",
            onFocus: c,
            onBlur: u,
            tabindex: -1
          }, null)]
        })]), [[It, e.dirty]])]
      }), fe && P("div", {
        key: "append",
        class: "v-field__append-inner"
      }, [(z = n["append-inner"]) == null ? void 0 : z.call(n, K.value), e.appendInnerIcon && h(d, {
        key: "append-icon",
        name: "appendInner",
        color: B.value
      }, null)]), P("div", {
        class: ve(["v-field__outline", M.value]),
        style: Ve(D.value)
      }, [G && P(J, null, [P("div", {
        class: "v-field__outline__start"
      }, null), y.value && P("div", {
        class: "v-field__outline__notch"
      }, [h(Xt, {
        ref: p,
        floating: !0,
        for: g.value
      }, {
        default: () => [A()]
      })]), P("div", {
        class: "v-field__outline__end"
      }, null)]), T.value && y.value && h(Xt, {
        ref: p,
        floating: !0,
        for: g.value
      }, {
        default: () => [A()]
      })])]);
    }), {
      controlRef: k,
      fieldIconColor: B
    };
  }
}), Rr = ["color", "file", "time", "date", "datetime-local", "week", "month"], gl = U({
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
}, "VTextField"), mt = le()({
  name: "VTextField",
  directives: {
    vIntersect: Il
  },
  inheritAttrs: !1,
  props: gl(),
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
    const o = ke(e, "modelValue"), {
      isFocused: i,
      focus: s,
      blur: r
    } = no(e), c = I(() => typeof e.counterValue == "function" ? e.counterValue(o.value) : typeof e.counterValue == "number" ? e.counterValue : (o.value ?? "").toString().length), u = I(() => {
      if (t.maxlength) return t.maxlength;
      if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string"))
        return e.counter;
    }), d = I(() => ["plain", "underlined"].includes(e.variant));
    function m(k, T) {
      var b, B;
      !e.autofocus || !k || (B = (b = T[0].target) == null ? void 0 : b.focus) == null || B.call(b);
    }
    const v = X(), f = X(), V = X(), y = I(() => Rr.includes(e.type) || e.persistentPlaceholder || i.value || e.active);
    function w() {
      i.value || s(), $e(() => {
        var k;
        V.value !== document.activeElement && ((k = V.value) == null || k.focus());
      });
    }
    function g(k) {
      a("mousedown:control", k), k.target !== V.value && (w(), k.preventDefault());
    }
    function C(k) {
      a("click:control", k);
    }
    function S(k, T) {
      k.stopPropagation(), w(), $e(() => {
        o.value = null, T(), Sn(e["onClick:clear"], k);
      });
    }
    function p(k) {
      var b;
      const T = k.target;
      if (o.value = T.value, (b = e.modelModifiers) != null && b.trim && ["text", "search", "password", "tel", "url"].includes(e.type)) {
        const B = [T.selectionStart, T.selectionEnd];
        $e(() => {
          T.selectionStart = B[0], T.selectionEnd = B[1];
        });
      }
    }
    return ne(() => {
      const k = !!(n.counter || e.counter !== !1 && e.counter != null), T = !!(k || n.details), [b, B] = wn(t), {
        modelValue: _,
        ...$
      } = Gl.filterProps(e), M = Yl.filterProps(e);
      return h(Gl, H({
        ref: v,
        modelValue: o.value,
        "onUpdate:modelValue": (D) => o.value = D,
        class: ["v-text-field", {
          "v-text-field--prefixed": e.prefix,
          "v-text-field--suffixed": e.suffix,
          "v-input--plain-underlined": d.value
        }, e.class],
        style: e.style
      }, b, $, {
        centerAffix: !d.value,
        focused: i.value
      }), {
        ...n,
        default: (D) => {
          let {
            id: K,
            isDisabled: W,
            isDirty: G,
            isReadonly: ae,
            isValid: oe,
            reset: fe
          } = D;
          return h(Yl, H({
            ref: f,
            onMousedown: g,
            onClick: C,
            "onClick:clear": (A) => S(A, fe),
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"],
            role: e.role
          }, M, {
            id: K.value,
            active: y.value || G.value,
            dirty: G.value || e.dirty,
            disabled: W.value,
            focused: i.value,
            error: oe.value === !1
          }), {
            ...n,
            default: (A) => {
              let {
                props: {
                  class: E,
                  ...O
                }
              } = A;
              const z = Ze(P("input", H({
                ref: V,
                value: o.value,
                onInput: p,
                autofocus: e.autofocus,
                readonly: ae.value,
                disabled: W.value,
                name: e.name,
                placeholder: e.placeholder,
                size: 1,
                type: e.type,
                onFocus: w,
                onBlur: r
              }, O, B), null), [[Il, {
                handler: m
              }, null, {
                once: !0
              }]]);
              return P(J, null, [e.prefix && P("span", {
                class: "v-text-field__prefix"
              }, [P("span", {
                class: "v-text-field__prefix__text"
              }, [e.prefix])]), n.default ? P("div", {
                class: ve(E),
                "data-no-activator": ""
              }, [n.default(), z]) : ri(z, {
                class: E
              }), e.suffix && P("span", {
                class: "v-text-field__suffix"
              }, [P("span", {
                class: "v-text-field__suffix__text"
              }, [e.suffix])])]);
            }
          });
        },
        details: T ? (D) => {
          var K;
          return P(J, null, [(K = n.details) == null ? void 0 : K.call(n, D), k && P(J, null, [P("span", null, null), h(Dr, {
            active: e.persistentCounter || i.value,
            value: c.value,
            max: u.value,
            disabled: e.disabled
          }, n.counter)])]);
        } : void 0
      });
    }), pt({}, v, f, V);
  }
}), Nr = U({
  renderless: Boolean,
  ...Se()
}, "VVirtualScrollItem"), Hr = le()({
  name: "VVirtualScrollItem",
  inheritAttrs: !1,
  props: Nr(),
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
    } = kt(void 0, "border");
    ee(() => {
      var s;
      return (s = i.value) == null ? void 0 : s.height;
    }, (s) => {
      s != null && a("update:height", s);
    }), ne(() => {
      var s, r;
      return e.renderless ? P(J, null, [(s = n.default) == null ? void 0 : s.call(n, {
        itemRef: o
      })]) : P("div", H({
        ref: o,
        class: ["v-virtual-scroll__item", e.class],
        style: e.style
      }, t), [(r = n.default) == null ? void 0 : r.call(n)]);
    });
  }
}), zr = -1, Wr = 1, _a = 100, Ur = U({
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
function Kr(e, l) {
  const t = dt(), a = Q(0);
  tt(() => {
    a.value = parseFloat(e.itemHeight || 0);
  });
  const n = Q(0), o = Q(Math.ceil(
    // Assume 16px items filling the entire screen height if
    // not provided. This is probably incorrect but it minimises
    // the chance of ending up with empty space at the bottom.
    // The default value is set here to avoid poisoning getSize()
    (parseInt(e.height) || t.height.value) / (a.value || 16)
  ) || 1), i = Q(0), s = Q(0), r = X(), c = X();
  let u = 0;
  const {
    resizeRef: d,
    contentRect: m
  } = kt();
  tt(() => {
    d.value = r.value;
  });
  const v = I(() => {
    var A;
    return r.value === document.documentElement ? t.height.value : ((A = m.value) == null ? void 0 : A.height) || parseInt(e.height) || 0;
  }), f = I(() => !!(r.value && c.value && v.value && a.value));
  let V = Array.from({
    length: l.value.length
  }), y = Array.from({
    length: l.value.length
  });
  const w = Q(0);
  let g = -1;
  function C(A) {
    return V[A] || a.value;
  }
  const S = Hi(() => {
    const A = performance.now();
    y[0] = 0;
    const E = l.value.length;
    for (let O = 1; O <= E - 1; O++)
      y[O] = (y[O - 1] || 0) + C(O - 1);
    w.value = Math.max(w.value, performance.now() - A);
  }, w), p = ee(f, (A) => {
    A && (p(), u = c.value.offsetTop, S.immediate(), G(), ~g && $e(() => {
      He && window.requestAnimationFrame(() => {
        oe(g), g = -1;
      });
    }));
  });
  We(() => {
    S.clear();
  });
  function k(A, E) {
    const O = V[A], z = a.value;
    a.value = z ? Math.min(a.value, E) : E, (O !== E || z !== a.value) && (V[A] = E, S());
  }
  function T(A) {
    return A = Je(A, 0, l.value.length - 1), y[A] || 0;
  }
  function b(A) {
    return jr(y, A);
  }
  let B = 0, _ = 0, $ = 0;
  ee(v, (A, E) => {
    E && (G(), A < E && requestAnimationFrame(() => {
      _ = 0, G();
    }));
  });
  let M = -1;
  function D() {
    if (!r.value || !c.value) return;
    const A = r.value.scrollTop, E = performance.now();
    E - $ > 500 ? (_ = Math.sign(A - B), u = c.value.offsetTop) : _ = A - B, B = A, $ = E, window.clearTimeout(M), M = window.setTimeout(K, 500), G();
  }
  function K() {
    !r.value || !c.value || (_ = 0, $ = 0, window.clearTimeout(M), G());
  }
  let W = -1;
  function G() {
    cancelAnimationFrame(W), W = requestAnimationFrame(ae);
  }
  function ae() {
    if (!r.value || !v.value) return;
    const A = B - u, E = Math.sign(_), O = Math.max(0, A - _a), z = Je(b(O), 0, l.value.length), he = A + v.value + _a, te = Je(b(he) + 1, z + 1, l.value.length);
    if (
      // Only update the side we're scrolling towards,
      // the other side will be updated incidentally
      (E !== zr || z < n.value) && (E !== Wr || te > o.value)
    ) {
      const ue = T(n.value) - T(z), q = T(te) - T(o.value);
      Math.max(ue, q) > _a ? (n.value = z, o.value = te) : (z <= 0 && (n.value = z), te >= l.value.length && (o.value = te));
    }
    i.value = T(n.value), s.value = T(l.value.length) - T(o.value);
  }
  function oe(A) {
    const E = T(A);
    !r.value || A && !E ? g = A : r.value.scrollTop = E;
  }
  const fe = I(() => l.value.slice(n.value, o.value).map((A, E) => {
    const O = E + n.value;
    return {
      raw: A,
      index: O,
      key: St(A, e.itemKey, O)
    };
  }));
  return ee(l, () => {
    V = Array.from({
      length: l.value.length
    }), y = Array.from({
      length: l.value.length
    }), S.immediate(), G();
  }, {
    deep: 1
  }), {
    calculateVisibleItems: G,
    containerRef: r,
    markerRef: c,
    computedItems: fe,
    paddingTop: i,
    paddingBottom: s,
    scrollToIndex: oe,
    handleScroll: D,
    handleScrollend: K,
    handleItemResize: k
  };
}
function jr(e, l) {
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
const Gr = U({
  items: {
    type: Array,
    default: () => []
  },
  renderless: Boolean,
  ...Ur(),
  ...Se(),
  ...Nt()
}, "VVirtualScroll"), uo = le()({
  name: "VVirtualScroll",
  props: Gr(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = lt("VVirtualScroll"), {
      dimensionStyles: n
    } = Rt(e), {
      calculateVisibleItems: o,
      containerRef: i,
      markerRef: s,
      handleScroll: r,
      handleScrollend: c,
      handleItemResize: u,
      scrollToIndex: d,
      paddingTop: m,
      paddingBottom: v,
      computedItems: f
    } = Kr(e, N(() => e.items));
    return Ge(() => e.renderless, () => {
      function V() {
        var g, C;
        const w = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1) ? "addEventListener" : "removeEventListener";
        i.value === document.documentElement ? (document[w]("scroll", r, {
          passive: !0
        }), document[w]("scrollend", c)) : ((g = i.value) == null || g[w]("scroll", r, {
          passive: !0
        }), (C = i.value) == null || C[w]("scrollend", c));
      }
      Qe(() => {
        i.value = Pn(a.vnode.el, !0), V(!0);
      }), We(V);
    }), ne(() => {
      const V = f.value.map((y) => h(Hr, {
        key: y.key,
        renderless: e.renderless,
        "onUpdate:height": (w) => u(y.index, w)
      }, {
        default: (w) => {
          var g;
          return (g = t.default) == null ? void 0 : g.call(t, {
            item: y.raw,
            index: y.index,
            ...w
          });
        }
      }));
      return e.renderless ? P(J, null, [P("div", {
        ref: s,
        class: "v-virtual-scroll__spacer",
        style: {
          paddingTop: ye(m.value)
        }
      }, null), V, P("div", {
        class: "v-virtual-scroll__spacer",
        style: {
          paddingBottom: ye(v.value)
        }
      }, null)]) : P("div", {
        ref: i,
        class: ve(["v-virtual-scroll", e.class]),
        onScrollPassive: r,
        onScrollend: c,
        style: Ve([n.value, e.style])
      }, [P("div", {
        ref: s,
        class: "v-virtual-scroll__container",
        style: {
          paddingTop: ye(m.value),
          paddingBottom: ye(v.value)
        }
      }, [V])]);
    }), {
      calculateVisibleItems: o,
      scrollToIndex: d
    };
  }
});
function co(e, l) {
  const t = Q(!1);
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
        const r = ee(t, () => {
          r(), s();
        });
      } else s();
    });
  }
  async function i(s) {
    var u, d;
    if (s.key === "Tab" && ((u = l.value) == null || u.focus()), !["PageDown", "PageUp", "Home", "End"].includes(s.key)) return;
    const r = (d = e.value) == null ? void 0 : d.$el;
    if (!r) return;
    (s.key === "Home" || s.key === "End") && r.scrollTo({
      top: s.key === "Home" ? 0 : r.scrollHeight,
      behavior: "smooth"
    }), await o();
    const c = r.querySelectorAll(":scope > :not(.v-virtual-scroll__spacer)");
    if (s.key === "PageDown" || s.key === "Home") {
      const m = r.getBoundingClientRect().top;
      for (const v of c)
        if (v.getBoundingClientRect().top >= m) {
          v.focus();
          break;
        }
    } else {
      const m = r.getBoundingClientRect().bottom;
      for (const v of [...c].reverse())
        if (v.getBoundingClientRect().bottom <= m) {
          v.focus();
          break;
        }
    }
  }
  return {
    onScrollPassive: n,
    onKeydown: i
  };
}
const vo = U({
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
    type: we,
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
  ...Ii({
    itemChildren: !1
  })
}, "Select"), Yr = U({
  ...vo(),
  ...bt(gl({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...Ht({
    transition: {
      component: Bn
    }
  })
}, "VSelect"), fo = le()({
  name: "VSelect",
  props: Yr(),
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
    } = ot(), n = X(), o = X(), i = X(), {
      items: s,
      transformIn: r,
      transformOut: c
    } = fn(e), u = ke(e, "modelValue", [], (A) => r(A === null ? [null] : Ne(A)), (A) => {
      const E = c(A);
      return e.multiple ? E : E[0] ?? null;
    }), d = I(() => typeof e.counterValue == "function" ? e.counterValue(u.value) : typeof e.counterValue == "number" ? e.counterValue : u.value.length), m = vl(e), v = I(() => u.value.map((A) => A.value)), f = Q(!1);
    let V = "", y = -1, w;
    const g = I(() => e.hideSelected ? s.value.filter((A) => !u.value.some((E) => (e.valueComparator || it)(E, A))) : s.value), C = I(() => e.hideNoData && !g.value.length || m.isReadonly.value || m.isDisabled.value), S = ke(e, "menu"), p = I({
      get: () => S.value,
      set: (A) => {
        var E;
        S.value && !A && ((E = o.value) != null && E.ΨopenChildren.size) || A && C.value || (S.value = A);
      }
    }), k = N(() => p.value ? e.closeText : e.openText), T = I(() => {
      var A;
      return {
        ...e.menuProps,
        activatorProps: {
          ...((A = e.menuProps) == null ? void 0 : A.activatorProps) || {},
          "aria-haspopup": "listbox"
          // Set aria-haspopup to 'listbox'
        }
      };
    }), b = X(), B = co(b, n);
    function _(A) {
      e.openOnClear && (p.value = !0);
    }
    function $() {
      C.value || (p.value = !p.value);
    }
    function M(A) {
      ea(A) && D(A);
    }
    function D(A) {
      var me, R, Y;
      if (!A.key || m.isReadonly.value) return;
      ["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(A.key) && A.preventDefault(), ["Enter", "ArrowDown", " "].includes(A.key) && (p.value = !0), ["Escape", "Tab"].includes(A.key) && (p.value = !1), A.key === "Home" ? (me = b.value) == null || me.focus("first") : A.key === "End" && ((R = b.value) == null || R.focus("last"));
      const E = 1e3;
      if (!ea(A)) return;
      const O = performance.now();
      O - w > E && (V = "", y = -1), V += A.key.toLowerCase(), w = O;
      const z = g.value;
      function he() {
        let re = te();
        return re || V.at(-1) === V.at(-2) && (V = V.slice(0, -1), re = te(), re) || (y = -1, re = te(), re) ? re : (V = A.key.toLowerCase(), te());
      }
      function te() {
        for (let re = y + 1; re < z.length; re++) {
          const ge = z[re];
          if (ge.title.toLowerCase().startsWith(V))
            return [ge, re];
        }
      }
      const ue = he();
      if (!ue) return;
      const [q, se] = ue;
      y = se, (Y = b.value) == null || Y.focus(se), e.multiple || (u.value = [q]);
    }
    function K(A) {
      let E = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!A.props.disabled)
        if (e.multiple) {
          const O = u.value.findIndex((he) => (e.valueComparator || it)(he.value, A.value)), z = E ?? !~O;
          if (~O) {
            const he = z ? [...u.value, A] : [...u.value];
            he.splice(O, 1), u.value = he;
          } else z && (u.value = [...u.value, A]);
        } else {
          const O = E !== !1;
          u.value = O ? [A] : [], $e(() => {
            p.value = !1;
          });
        }
    }
    function W(A) {
      var E;
      (E = b.value) != null && E.$el.contains(A.relatedTarget) || (p.value = !1);
    }
    function G() {
      var A;
      e.eager && ((A = i.value) == null || A.calculateVisibleItems());
    }
    function ae() {
      var A;
      f.value && ((A = n.value) == null || A.focus());
    }
    function oe(A) {
      f.value = !0;
    }
    function fe(A) {
      if (A == null) u.value = [];
      else if (Pt(n.value, ":autofill") || Pt(n.value, ":-webkit-autofill")) {
        const E = s.value.find((O) => O.title === A);
        E && K(E);
      } else n.value && (n.value.value = "");
    }
    return ee(p, () => {
      if (!e.hideSelected && p.value && u.value.length) {
        const A = g.value.findIndex((E) => u.value.some((O) => (e.valueComparator || it)(O.value, E.value)));
        He && window.requestAnimationFrame(() => {
          var E;
          A >= 0 && ((E = i.value) == null || E.scrollToIndex(A));
        });
      }
    }), ee(() => e.items, (A, E) => {
      p.value || f.value && !E.length && A.length && (p.value = !0);
    }), ne(() => {
      const A = !!(e.chips || t.chip), E = !!(!e.hideNoData || g.value.length || t["prepend-item"] || t["append-item"] || t["no-data"]), O = u.value.length > 0, z = mt.filterProps(e), he = O || !f.value && e.label && !e.persistentPlaceholder ? void 0 : e.placeholder;
      return h(mt, H({
        ref: n
      }, z, {
        modelValue: u.value.map((te) => te.props.value).join(", "),
        "onUpdate:modelValue": fe,
        focused: f.value,
        "onUpdate:focused": (te) => f.value = te,
        validationValue: u.externalValue,
        counterValue: d.value,
        dirty: O,
        class: ["v-select", {
          "v-select--active-menu": p.value,
          "v-select--chips": !!e.chips,
          [`v-select--${e.multiple ? "multiple" : "single"}`]: !0,
          "v-select--selected": u.value.length,
          "v-select--selection-slot": !!t.selection
        }, e.class],
        style: e.style,
        inputmode: "none",
        placeholder: he,
        "onClick:clear": _,
        "onMousedown:control": $,
        onBlur: W,
        onKeydown: D,
        "aria-label": a(k.value),
        title: a(k.value)
      }), {
        ...t,
        default: () => P(J, null, [h(ml, H({
          ref: o,
          modelValue: p.value,
          "onUpdate:modelValue": (te) => p.value = te,
          activator: "parent",
          contentClass: "v-select__content",
          disabled: C.value,
          eager: e.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: e.transition,
          onAfterEnter: G,
          onAfterLeave: ae
        }, T.value), {
          default: () => [E && h(rt, H({
            ref: b,
            selected: v.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: (te) => te.preventDefault(),
            onKeydown: M,
            onFocusin: oe,
            tabindex: "-1",
            "aria-live": "polite",
            "aria-label": `${e.label}-list`,
            color: e.itemColor ?? e.color
          }, B, e.listProps), {
            default: () => {
              var te, ue, q;
              return [(te = t["prepend-item"]) == null ? void 0 : te.call(t), !g.value.length && !e.hideNoData && (((ue = t["no-data"]) == null ? void 0 : ue.call(t)) ?? h(je, {
                key: "no-data",
                title: a(e.noDataText)
              }, null)), h(uo, {
                ref: i,
                renderless: !0,
                items: g.value,
                itemKey: "value"
              }, {
                default: (se) => {
                  var Ce;
                  let {
                    item: me,
                    index: R,
                    itemRef: Y
                  } = se;
                  const re = zi(me.props), ge = H(me.props, {
                    ref: Y,
                    key: me.value,
                    onClick: () => K(me, null)
                  });
                  return ((Ce = t.item) == null ? void 0 : Ce.call(t, {
                    item: me,
                    index: R,
                    props: ge
                  })) ?? h(je, H(ge, {
                    role: "option"
                  }), {
                    prepend: (Be) => {
                      let {
                        isSelected: Me
                      } = Be;
                      return P(J, null, [e.multiple && !e.hideSelected ? h(jt, {
                        key: me.value,
                        modelValue: Me,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, re.prependAvatar && h(Ct, {
                        image: re.prependAvatar
                      }, null), re.prependIcon && h(xe, {
                        icon: re.prependIcon
                      }, null)]);
                    }
                  });
                }
              }), (q = t["append-item"]) == null ? void 0 : q.call(t)];
            }
          })]
        }), u.value.map((te, ue) => {
          function q(Y) {
            Y.stopPropagation(), Y.preventDefault(), K(te, !1);
          }
          const se = {
            "onClick:close": q,
            onKeydown(Y) {
              Y.key !== "Enter" && Y.key !== " " || (Y.preventDefault(), Y.stopPropagation(), q(Y));
            },
            onMousedown(Y) {
              Y.preventDefault(), Y.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, me = A ? !!t.chip : !!t.selection, R = me ? kn(A ? t.chip({
            item: te,
            index: ue,
            props: se
          }) : t.selection({
            item: te,
            index: ue
          })) : void 0;
          if (!(me && !R))
            return P("div", {
              key: te.value,
              class: "v-select__selection"
            }, [A ? t.chip ? h(Le, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: e.closableChips,
                  size: "small",
                  text: te.title
                }
              }
            }, {
              default: () => [R]
            }) : h(fl, H({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: te.title,
              disabled: te.props.disabled
            }, se), null) : R ?? P("span", {
              class: "v-select__selection-text"
            }, [te.title, e.multiple && ue < u.value.length - 1 && P("span", {
              class: "v-select__selection-comma"
            }, [Pe(",")])])]);
        })]),
        "append-inner": function() {
          var se, me;
          for (var te = arguments.length, ue = new Array(te), q = 0; q < te; q++)
            ue[q] = arguments[q];
          return P(J, null, [(se = t["append-inner"]) == null ? void 0 : se.call(t, ...ue), e.menuIcon ? h(xe, {
            class: "v-select__menu-icon",
            color: (me = n.value) == null ? void 0 : me.fieldIconColor,
            icon: e.menuIcon
          }, null) : void 0]);
        }
      });
    }), pt({
      isFocused: f,
      menu: p,
      select: K
    }, n);
  }
}), qr = (e, l, t) => {
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
const mo = U({
  customFilter: Function,
  customKeyFilter: Object,
  filterKeys: [Array, String],
  filterMode: {
    type: String,
    default: "intersection"
  },
  noFilter: Boolean
}, "filter");
function Xr(e, l, t) {
  var s;
  const a = [], n = (t == null ? void 0 : t.default) ?? qr, o = t != null && t.filterKeys ? Ne(t.filterKeys) : !1, i = Object.keys((t == null ? void 0 : t.customKeyFilter) ?? {}).length;
  if (!(e != null && e.length)) return a;
  e: for (let r = 0; r < e.length; r++) {
    const [c, u = c] = Ne(e[r]), d = {}, m = {};
    let v = -1;
    if ((l || i > 0) && !(t != null && t.noFilter)) {
      if (typeof c == "object") {
        const y = o || Object.keys(u);
        for (const w of y) {
          const g = St(u, w), C = (s = t == null ? void 0 : t.customKeyFilter) == null ? void 0 : s[w];
          if (v = C ? C(g, l, c) : n(g, l, c), v !== -1 && v !== !1)
            C ? d[w] = Ba(v, l) : m[w] = Ba(v, l);
          else if ((t == null ? void 0 : t.filterMode) === "every")
            continue e;
        }
      } else
        v = n(c, l, c), v !== -1 && v !== !1 && (m.title = Ba(v, l));
      const f = Object.keys(m).length, V = Object.keys(d).length;
      if (!f && !V || (t == null ? void 0 : t.filterMode) === "union" && V !== i && !f || (t == null ? void 0 : t.filterMode) === "intersection" && (V !== i || !f)) continue;
    }
    a.push({
      index: r,
      matches: {
        ...m,
        ...d
      }
    });
  }
  return a;
}
function go(e, l, t, a) {
  const n = Q([]), o = Q(/* @__PURE__ */ new Map()), i = I(() => a != null && a.transform ? x(l).map((r) => [r, a.transform(r)]) : x(l));
  tt(() => {
    const r = typeof t == "function" ? t() : x(t), c = typeof r != "string" && typeof r != "number" ? "" : String(r), u = Xr(i.value, c, {
      customKeyFilter: {
        ...e.customKeyFilter,
        ...x(a == null ? void 0 : a.customKeyFilter)
      },
      default: e.customFilter,
      filterKeys: e.filterKeys,
      filterMode: e.filterMode,
      noFilter: e.noFilter
    }), d = x(l), m = [], v = /* @__PURE__ */ new Map();
    u.forEach((f) => {
      let {
        index: V,
        matches: y
      } = f;
      const w = d[V];
      m.push(w), v.set(w.value, y);
    }), n.value = m, o.value = v;
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
function Zr(e, l, t) {
  return t == null || !t.length ? l : t.map((a, n) => {
    const o = n === 0 ? 0 : t[n - 1][1], i = [P("span", {
      class: ve(`${e}__unmask`)
    }, [l.slice(o, a[0])]), P("span", {
      class: ve(`${e}__mask`)
    }, [l.slice(a[0], a[1])])];
    return n === t.length - 1 && i.push(P("span", {
      class: ve(`${e}__unmask`)
    }, [l.slice(a[1])])), P(J, null, [i]);
  });
}
const Qr = U({
  autoSelectFirst: {
    type: [Boolean, String]
  },
  clearOnSelect: Boolean,
  search: String,
  ...mo({
    filterKeys: ["title"]
  }),
  ...vo(),
  ...bt(gl({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...Ht({
    transition: !1
  })
}, "VAutocomplete"), Jr = le()({
  name: "VAutocomplete",
  props: Qr(),
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
    } = ot(), n = X(), o = Q(!1), i = Q(!0), s = Q(!1), r = X(), c = X(), u = Q(-1), {
      items: d,
      transformIn: m,
      transformOut: v
    } = fn(e), {
      textColorClasses: f,
      textColorStyles: V
    } = Wt(() => {
      var R;
      return (R = n.value) == null ? void 0 : R.color;
    }), y = ke(e, "search", ""), w = ke(e, "modelValue", [], (R) => m(R === null ? [null] : Ne(R)), (R) => {
      const Y = v(R);
      return e.multiple ? Y : Y[0] ?? null;
    }), g = I(() => typeof e.counterValue == "function" ? e.counterValue(w.value) : typeof e.counterValue == "number" ? e.counterValue : w.value.length), C = vl(e), {
      filteredItems: S,
      getMatches: p
    } = go(e, d, () => i.value ? "" : y.value), k = I(() => e.hideSelected ? S.value.filter((R) => !w.value.some((Y) => Y.value === R.value)) : S.value), T = I(() => !!(e.chips || t.chip)), b = I(() => T.value || !!t.selection), B = I(() => w.value.map((R) => R.props.value)), _ = I(() => {
      var Y;
      return (e.autoSelectFirst === !0 || e.autoSelectFirst === "exact" && y.value === ((Y = k.value[0]) == null ? void 0 : Y.title)) && k.value.length > 0 && !i.value && !s.value;
    }), $ = I(() => e.hideNoData && !k.value.length || C.isReadonly.value || C.isDisabled.value), M = ke(e, "menu"), D = I({
      get: () => M.value,
      set: (R) => {
        var Y;
        M.value && !R && ((Y = r.value) != null && Y.ΨopenChildren.size) || R && $.value || (M.value = R);
      }
    }), K = I(() => D.value ? e.closeText : e.openText), W = X(), G = co(W, n);
    function ae(R) {
      e.openOnClear && (D.value = !0), y.value = "";
    }
    function oe() {
      $.value || (D.value = !0);
    }
    function fe(R) {
      $.value || (o.value && (R.preventDefault(), R.stopPropagation()), D.value = !D.value);
    }
    function A(R) {
      var Y;
      R.key !== " " && ea(R) && ((Y = n.value) == null || Y.focus());
    }
    function E(R) {
      var ge, Ce, Be, Me, Te;
      if (C.isReadonly.value) return;
      const Y = (ge = n.value) == null ? void 0 : ge.selectionStart, re = w.value.length;
      if (["Enter", "ArrowDown", "ArrowUp"].includes(R.key) && R.preventDefault(), ["Enter", "ArrowDown"].includes(R.key) && (D.value = !0), ["Escape"].includes(R.key) && (D.value = !1), _.value && ["Enter", "Tab"].includes(R.key) && !w.value.some((Oe) => {
        let {
          value: Ee
        } = Oe;
        return Ee === k.value[0].value;
      }) && me(k.value[0]), R.key === "ArrowDown" && _.value && ((Ce = W.value) == null || Ce.focus("next")), ["Backspace", "Delete"].includes(R.key)) {
        if (!e.multiple && b.value && w.value.length > 0 && !y.value) return me(w.value[0], !1);
        if (~u.value) {
          R.preventDefault();
          const Oe = u.value;
          me(w.value[u.value], !1), u.value = Oe >= re - 1 ? re - 2 : Oe;
        } else R.key === "Backspace" && !y.value && (u.value = re - 1);
        return;
      }
      if (e.multiple)
        if (R.key === "ArrowLeft") {
          if (u.value < 0 && Y && Y > 0) return;
          const Oe = u.value > -1 ? u.value - 1 : re - 1;
          if (w.value[Oe])
            u.value = Oe;
          else {
            const Ee = ((Be = y.value) == null ? void 0 : Be.length) ?? null;
            u.value = -1, (Me = n.value) == null || Me.setSelectionRange(Ee, Ee);
          }
        } else if (R.key === "ArrowRight") {
          if (u.value < 0) return;
          const Oe = u.value + 1;
          w.value[Oe] ? u.value = Oe : (u.value = -1, (Te = n.value) == null || Te.setSelectionRange(0, 0));
        } else ~u.value && ea(R) && (u.value = -1);
    }
    function O(R) {
      if (Pt(n.value, ":autofill") || Pt(n.value, ":-webkit-autofill")) {
        const Y = d.value.find((re) => re.title === R.target.value);
        Y && me(Y);
      }
    }
    function z() {
      var R;
      e.eager && ((R = c.value) == null || R.calculateVisibleItems());
    }
    function he() {
      var R;
      o.value && (i.value = !0, (R = n.value) == null || R.focus());
    }
    function te(R) {
      o.value = !0, setTimeout(() => {
        s.value = !0;
      });
    }
    function ue(R) {
      s.value = !1;
    }
    function q(R) {
      (R == null || R === "" && !e.multiple && !b.value) && (w.value = []);
    }
    const se = Q(!1);
    function me(R) {
      let Y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!(!R || R.props.disabled))
        if (e.multiple) {
          const re = w.value.findIndex((Ce) => (e.valueComparator || it)(Ce.value, R.value)), ge = Y ?? !~re;
          if (~re) {
            const Ce = ge ? [...w.value, R] : [...w.value];
            Ce.splice(re, 1), w.value = Ce;
          } else ge && (w.value = [...w.value, R]);
          e.clearOnSelect && (y.value = "");
        } else {
          const re = Y !== !1;
          w.value = re ? [R] : [], y.value = re && !b.value ? R.title : "", $e(() => {
            D.value = !1, i.value = !0;
          });
        }
    }
    return ee(o, (R, Y) => {
      var re;
      R !== Y && (R ? (se.value = !0, y.value = e.multiple || b.value ? "" : String(((re = w.value.at(-1)) == null ? void 0 : re.props.title) ?? ""), i.value = !0, $e(() => se.value = !1)) : (!e.multiple && y.value == null && (w.value = []), D.value = !1, (e.multiple || b.value) && (y.value = ""), u.value = -1));
    }), ee(y, (R) => {
      !o.value || se.value || (R && (D.value = !0), i.value = !R);
    }), ee(D, () => {
      if (!e.hideSelected && D.value && w.value.length) {
        const R = k.value.findIndex((Y) => w.value.some((re) => Y.value === re.value));
        He && window.requestAnimationFrame(() => {
          var Y;
          R >= 0 && ((Y = c.value) == null || Y.scrollToIndex(R));
        });
      }
    }), ee(() => e.items, (R, Y) => {
      D.value || o.value && !Y.length && R.length && (D.value = !0);
    }), ne(() => {
      const R = !!(!e.hideNoData || k.value.length || t["prepend-item"] || t["append-item"] || t["no-data"]), Y = w.value.length > 0, re = mt.filterProps(e);
      return h(mt, H({
        ref: n
      }, re, {
        modelValue: y.value,
        "onUpdate:modelValue": [(ge) => y.value = ge, q],
        focused: o.value,
        "onUpdate:focused": (ge) => o.value = ge,
        validationValue: w.externalValue,
        counterValue: g.value,
        dirty: Y,
        onChange: O,
        class: ["v-autocomplete", `v-autocomplete--${e.multiple ? "multiple" : "single"}`, {
          "v-autocomplete--active-menu": D.value,
          "v-autocomplete--chips": !!e.chips,
          "v-autocomplete--selection-slot": !!b.value,
          "v-autocomplete--selecting-index": u.value > -1
        }, e.class],
        style: e.style,
        readonly: C.isReadonly.value,
        placeholder: Y ? void 0 : e.placeholder,
        "onClick:clear": ae,
        "onMousedown:control": oe,
        onKeydown: E
      }), {
        ...t,
        default: () => P(J, null, [h(ml, H({
          ref: r,
          modelValue: D.value,
          "onUpdate:modelValue": (ge) => D.value = ge,
          activator: "parent",
          contentClass: "v-autocomplete__content",
          disabled: $.value,
          eager: e.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: e.transition,
          onAfterEnter: z,
          onAfterLeave: he
        }, e.menuProps), {
          default: () => [R && h(rt, H({
            ref: W,
            selected: B.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: (ge) => ge.preventDefault(),
            onKeydown: A,
            onFocusin: te,
            onFocusout: ue,
            tabindex: "-1",
            "aria-live": "polite",
            color: e.itemColor ?? e.color
          }, G, e.listProps), {
            default: () => {
              var ge, Ce, Be;
              return [(ge = t["prepend-item"]) == null ? void 0 : ge.call(t), !k.value.length && !e.hideNoData && (((Ce = t["no-data"]) == null ? void 0 : Ce.call(t)) ?? h(je, {
                key: "no-data",
                title: a(e.noDataText)
              }, null)), h(uo, {
                ref: c,
                renderless: !0,
                items: k.value,
                itemKey: "value"
              }, {
                default: (Me) => {
                  var wl;
                  let {
                    item: Te,
                    index: Oe,
                    itemRef: Ee
                  } = Me;
                  const pl = H(Te.props, {
                    ref: Ee,
                    key: Te.value,
                    active: _.value && Oe === 0 ? !0 : void 0,
                    onClick: () => me(Te, null)
                  });
                  return ((wl = t.item) == null ? void 0 : wl.call(t, {
                    item: Te,
                    index: Oe,
                    props: pl
                  })) ?? h(je, H(pl, {
                    role: "option"
                  }), {
                    prepend: (Gt) => {
                      let {
                        isSelected: ti
                      } = Gt;
                      return P(J, null, [e.multiple && !e.hideSelected ? h(jt, {
                        key: Te.value,
                        modelValue: ti,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, Te.props.prependAvatar && h(Ct, {
                        image: Te.props.prependAvatar
                      }, null), Te.props.prependIcon && h(xe, {
                        icon: Te.props.prependIcon
                      }, null)]);
                    },
                    title: () => {
                      var Gt;
                      return i.value ? Te.title : Zr("v-autocomplete", Te.title, (Gt = p(Te)) == null ? void 0 : Gt.title);
                    }
                  });
                }
              }), (Be = t["append-item"]) == null ? void 0 : Be.call(t)];
            }
          })]
        }), w.value.map((ge, Ce) => {
          function Be(Ee) {
            Ee.stopPropagation(), Ee.preventDefault(), me(ge, !1);
          }
          const Me = {
            "onClick:close": Be,
            onKeydown(Ee) {
              Ee.key !== "Enter" && Ee.key !== " " || (Ee.preventDefault(), Ee.stopPropagation(), Be(Ee));
            },
            onMousedown(Ee) {
              Ee.preventDefault(), Ee.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, Te = T.value ? !!t.chip : !!t.selection, Oe = Te ? kn(T.value ? t.chip({
            item: ge,
            index: Ce,
            props: Me
          }) : t.selection({
            item: ge,
            index: Ce
          })) : void 0;
          if (!(Te && !Oe))
            return P("div", {
              key: ge.value,
              class: ve(["v-autocomplete__selection", Ce === u.value && ["v-autocomplete__selection--selected", f.value]]),
              style: Ve(Ce === u.value ? V.value : {})
            }, [T.value ? t.chip ? h(Le, {
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
            }) : h(fl, H({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: ge.title,
              disabled: ge.props.disabled
            }, Me), null) : Oe ?? P("span", {
              class: "v-autocomplete__selection-text"
            }, [ge.title, e.multiple && Ce < w.value.length - 1 && P("span", {
              class: "v-autocomplete__selection-comma"
            }, [Pe(",")])])]);
        })]),
        "append-inner": function() {
          var Me, Te;
          for (var ge = arguments.length, Ce = new Array(ge), Be = 0; Be < ge; Be++)
            Ce[Be] = arguments[Be];
          return P(J, null, [(Me = t["append-inner"]) == null ? void 0 : Me.call(t, ...Ce), e.menuIcon ? h(xe, {
            class: "v-autocomplete__menu-icon",
            color: (Te = n.value) == null ? void 0 : Te.fieldIconColor,
            icon: e.menuIcon,
            onMousedown: fe,
            onClick: Wi,
            "aria-label": a(K.value),
            title: a(K.value),
            tabindex: "-1"
          }, null) : void 0]);
        }
      });
    }), pt({
      isFocused: o,
      isPristine: i,
      menu: D,
      search: y,
      filteredItems: S,
      select: me
    }, n);
  }
}), eu = ["name", "value"], tu = /* @__PURE__ */ qe({
  __name: "OxAutocomplete",
  props: /* @__PURE__ */ Ya({
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
    const l = ut(), t = qa(e, "modelValue"), a = X(null), n = X(""), o = e, i = Ga(), s = de("repos"), { state: r, query: c, fetch: u } = yi(o.repo, s, { save: !1 }), d = Xe([]);
    var m = null;
    async function v(g) {
      if (g) {
        const C = d.findIndex((S) => S.id == g);
        if (C != -1)
          a.value = d[C];
        else if (m != g) {
          m = g;
          const p = (await u({ id: g })).entities[0];
          p.id == g ? (d.splice(0, 0, p), a.value = p) : a.value = null;
        }
      } else
        a.value = null;
      return a;
    }
    let f = null;
    const V = ka.debounce(async ({ reset: g = !1 } = {}) => {
      if (r.isProcessing)
        return;
      const C = n.value != "<empty string>" && n.value || "";
      if (!g && C == f)
        return;
      f = C;
      const S = { ...o.filters, page_size: 20 };
      S[o.lookup] = C;
      let p = await u({ params: S });
      a.value ? d.splice(0, d.length, ...ka.unionBy([a.value], p.entities)) : d.splice(0, d.length, ...p.entities), g || (!a.value && await v(t.value), n.value = C);
    }, 500);
    function y(g) {
      V({ reset: !0 });
    }
    function w(g) {
      g != "<empty string>" && g != f && V({ q: g });
    }
    return Qe(() => {
      V();
    }), ee(() => o.filters, (g, C) => {
      ka.isEqual(Ea(g), Ea(C)) || y();
    }), ee(n, w), ee(t, (g, C) => g != C && v(g)), (g, C) => (L(), be(J, null, [
      o.name ? (L(), be("input", {
        key: 0,
        type: "hidden",
        name: o.name,
        value: t.value
      }, null, 8, eu)) : ce("", !0),
      h(x(Jr), H(x(i), {
        items: d,
        loading: x(r).isProcessing,
        modelValue: t.value,
        "onUpdate:modelValue": C[0] || (C[0] = (S) => t.value = S),
        search: n.value,
        "onUpdate:search": C[1] || (C[1] = (S) => n.value = S)
      }), xt({ _: 2 }, [
        De(x(l), (S, p) => ({
          name: p,
          fn: F((k) => [
            j(g.$slots, p, Ae(_e(k)))
          ])
        }))
      ]), 1040, ["items", "loading", "modelValue", "search"])
    ], 64));
  }
}), au = {
  props: {
    src: String,
    is: String
  },
  setup(e) {
    const l = Q(null), t = I(() => {
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
      l.value = hi(e.src, t.value);
    }
    return ee(() => e.src, a), a(), () => ui(l.value, e);
  }
}, lu = { class: "text-error" }, Ua = {
  __name: "OxFieldDetails",
  props: {
    state: Object,
    errors: Array
  },
  setup(e) {
    const l = e;
    return (t, a) => l.errors ? (L(!0), be(J, { key: 0 }, De(l.errors, (n) => (L(), be("div", lu, [
      h(xe, { icon: "mdi-alert-circle-outline" }),
      Pe(" " + Fe(n), 1)
    ]))), 256)) : ce("", !0);
  }
}, yo = {
  __name: "OxListFilters",
  props: {
    search: String
  },
  setup(e, { expose: l }) {
    const t = de("list"), a = e, n = I(() => {
      const s = t.filters;
      return s && Object.entries(s).some(
        ([r, c]) => !r.startsWith("page") && !r.startsWith("ordering") && !!c
      );
    }), o = I(() => n.value ? "mdi-filter-check" : "mdi-filter-outline");
    function i() {
      t.filters = {}, t.load();
    }
    return l({ icon: o, hasFilters: n, reset: i }), (s, r) => (L(), be("form", {
      onSubmit: r[2] || (r[2] = Ie((c) => x(t).load(), ["prevent"])),
      class: "ox-list-filters width-full"
    }, [
      h(Da, {
        dense: "",
        color: "transparent"
      }, {
        default: F(() => [
          h(Ln, {
            icon: o.value,
            readonly: ""
          }, null, 8, ["icon"]),
          a.search && x(t).filters ? (L(), Z(mt, {
            key: 0,
            label: x(ie)("filters.search"),
            density: "compact",
            class: "ml-2",
            modelValue: x(t).filters[a.search],
            "onUpdate:modelValue": r[0] || (r[0] = (c) => x(t).filters[a.search] = c),
            "hide-details": ""
          }, null, 8, ["label", "modelValue"])) : ce("", !0),
          j(s.$slots, "default", {
            list: x(t),
            filters: x(t).filters
          }),
          h(pe, {
            onClick: r[1] || (r[1] = Ie((c) => x(t).load(), ["stop"])),
            class: "ml-2",
            icon: "mdi-check",
            "aria-label": s.$t("filters.apply"),
            title: x(ie)("filters.apply")
          }, null, 8, ["aria-label", "title"]),
          n.value ? (L(), Z(pe, {
            key: 1,
            onClick: Ie(i, ["stop"]),
            icon: "mdi-backspace",
            "aria-label": x(ie)("filters.reset"),
            title: x(ie)("filters.reset")
          }, null, 8, ["aria-label", "title"])) : ce("", !0)
        ]),
        _: 3
      })
    ], 32));
  }
}, nu = U({
  ...Se(),
  ...Pr()
}, "VForm"), Ka = le()({
  name: "VForm",
  props: nu(),
  emits: {
    "update:modelValue": (e) => !0,
    submit: (e) => !0
  },
  setup(e, l) {
    let {
      slots: t,
      emit: a
    } = l;
    const n = Ir(e), o = X();
    function i(r) {
      r.preventDefault(), n.reset();
    }
    function s(r) {
      const c = r, u = n.validate();
      c.then = u.then.bind(u), c.catch = u.catch.bind(u), c.finally = u.finally.bind(u), a("submit", c), c.defaultPrevented || u.then((d) => {
        var v;
        let {
          valid: m
        } = d;
        m && ((v = o.value) == null || v.submit());
      }), c.preventDefault();
    }
    return ne(() => {
      var r;
      return P("form", {
        ref: o,
        class: ve(["v-form", e.class]),
        style: Ve(e.style),
        novalidate: !0,
        onReset: i,
        onSubmit: s
      }, [(r = t.default) == null ? void 0 : r.call(t, n)]);
    }), pt(n, o);
  }
}), ou = { class: "flex-row justify-right" }, iu = /* @__PURE__ */ qe({
  __name: "OxFormList",
  props: /* @__PURE__ */ Ya({
    useModel: Function,
    editable: Boolean
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    var c;
    const l = qa(e, "modelValue"), t = de("user"), a = X({}), n = e, o = I(() => ({
      add: n.editable && t.can([n.useModel, "add"]),
      change: n.editable && t.can([n.useModel, "change"]),
      delete: n.editable && t.can([n.useModel, "delete"])
    })), i = X([]);
    (c = l.value) != null && c.length || i.value.push(-1);
    function s() {
      l.value.push(a.value), a.value = {};
    }
    function r(u) {
      confirm(ie("actions.delete.confirm")) && n.delete && l.value.splice(u);
    }
    return (u, d) => (L(), Z(rt, {
      opened: i.value,
      "onUpdate:opened": d[3] || (d[3] = (m) => i.value = m)
    }, {
      default: F(() => {
        var m;
        return [
          (m = l.value) != null && m.length ? (L(!0), be(J, { key: 0 }, De(l.value, (v, f) => (L(), Z(Oa, {
            key: f,
            value: f
          }, {
            activator: F(({ props: V }) => [
              h(je, H({ ref_for: !0 }, V), {
                append: F(() => [
                  P("div", {
                    onClick: d[0] || (d[0] = Ie(() => {
                    }, ["stop"]))
                  }, [
                    j(u.$slots, "item.actions", H({
                      item: v,
                      index: f
                    }, { ref_for: !0 }, V)),
                    o.value.delete ? (L(), Z(pe, {
                      key: 0,
                      type: "button",
                      class: "ml-2",
                      size: "small",
                      onClick: Ie((y) => r(f), ["stop", "prevent"]),
                      color: "error",
                      "aria-label": x(ie)("actions.remove"),
                      title: x(ie)("actions.remove"),
                      icon: "mdi-delete"
                    }, null, 8, ["onClick", "aria-label", "title"])) : ce("", !0)
                  ])
                ]),
                default: F(() => [
                  h(Ti, null, {
                    default: F(() => [
                      j(u.$slots, "item.title", { item: v })
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1040)
            ]),
            default: F(() => [
              h(Ka, {
                disabled: !o.value.change
              }, {
                default: F(() => [
                  j(u.$slots, "item", {
                    item: v,
                    index: f,
                    editable: o.value.change
                  })
                ]),
                _: 2
              }, 1032, ["disabled"])
            ]),
            _: 2
          }, 1032, ["value"]))), 128)) : (L(), Z(je, {
            key: 1,
            title: x(ie)("lists.empty")
          }, null, 8, ["title"])),
          o.value.add ? (L(), be(J, { key: 2 }, [
            l.value.length ? (L(), Z(Dt, { key: 0 })) : ce("", !0),
            h(Oa, { value: -1 }, {
              activator: F(({ props: v }) => [
                h(je, H(v, {
                  title: x(ie)("actions.add_item"),
                  "prepend-icon": "mdi-plus"
                }), null, 16, ["title"])
              ]),
              default: F(() => [
                h(Ka, null, {
                  default: F(() => [
                    j(u.$slots, "item", {
                      item: a.value,
                      edit: !0
                    })
                  ]),
                  _: 3
                }),
                a.value ? (L(), Z(je, { key: 0 }, {
                  default: F(() => [
                    P("div", ou, [
                      a.value ? (L(), Z(pe, {
                        key: 0,
                        size: "small",
                        onClick: d[1] || (d[1] = (v) => a.value = {}),
                        color: "secondary",
                        "prepend-icon": "mdi-backspace",
                        "aria-label": x(ie)("actions.discard")
                      }, {
                        default: F(() => [
                          Pe(Fe(x(ie)("actions.discard")), 1)
                        ]),
                        _: 1
                      }, 8, ["aria-label"])) : ce("", !0),
                      a.value ? (L(), Z(pe, {
                        key: 1,
                        size: "small",
                        onClick: d[2] || (d[2] = (v) => s()),
                        color: "primary",
                        "prepend-icon": "mdi-plus",
                        "aria-label": x(ie)("actions.add")
                      }, {
                        default: F(() => [
                          Pe(Fe(x(ie)("actions.add")), 1)
                        ]),
                        _: 1
                      }, 8, ["aria-label"])) : ce("", !0)
                    ])
                  ]),
                  _: 1
                })) : ce("", !0)
              ]),
              _: 3
            })
          ], 64)) : ce("", !0)
        ];
      }),
      _: 3
    }, 8, ["opened"]));
  }
}), su = le()({
  name: "VCardActions",
  props: Se(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    return at({
      VBtn: {
        slim: !0,
        variant: "text"
      }
    }), ne(() => {
      var a;
      return P("div", {
        class: ve(["v-card-actions", e.class]),
        style: Ve(e.style)
      }, [(a = t.default) == null ? void 0 : a.call(t)]);
    }), {};
  }
}), ru = U({
  opacity: [Number, String],
  ...Se(),
  ...Ue()
}, "VCardSubtitle"), uu = le()({
  name: "VCardSubtitle",
  props: ru(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    return ne(() => h(e.tag, {
      class: ve(["v-card-subtitle", e.class]),
      style: Ve([{
        "--v-card-subtitle-opacity": e.opacity
      }, e.style])
    }, t)), {};
  }
}), ho = Ai("v-card-title"), cu = U({
  appendAvatar: String,
  appendIcon: we,
  prependAvatar: String,
  prependIcon: we,
  subtitle: {
    type: [String, Number, Boolean],
    default: void 0
  },
  title: {
    type: [String, Number, Boolean],
    default: void 0
  },
  ...Se(),
  ...ct()
}, "VCardItem"), du = le()({
  name: "VCardItem",
  props: cu(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    return ne(() => {
      var c;
      const a = !!(e.prependAvatar || e.prependIcon), n = !!(a || t.prepend), o = !!(e.appendAvatar || e.appendIcon), i = !!(o || t.append), s = !!(e.title != null || t.title), r = !!(e.subtitle != null || t.subtitle);
      return P("div", {
        class: ve(["v-card-item", e.class]),
        style: Ve(e.style)
      }, [n && P("div", {
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
      }, t.prepend) : P(J, null, [e.prependAvatar && h(Ct, {
        key: "prepend-avatar",
        density: e.density,
        image: e.prependAvatar
      }, null), e.prependIcon && h(xe, {
        key: "prepend-icon",
        density: e.density,
        icon: e.prependIcon
      }, null)])]), P("div", {
        class: "v-card-item__content"
      }, [s && h(ho, {
        key: "title"
      }, {
        default: () => {
          var u;
          return [((u = t.title) == null ? void 0 : u.call(t)) ?? Fe(e.title)];
        }
      }), r && h(uu, {
        key: "subtitle"
      }, {
        default: () => {
          var u;
          return [((u = t.subtitle) == null ? void 0 : u.call(t)) ?? Fe(e.subtitle)];
        }
      }), (c = t.default) == null ? void 0 : c.call(t)]), i && P("div", {
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
      }, t.append) : P(J, null, [e.appendIcon && h(xe, {
        key: "append-icon",
        density: e.density,
        icon: e.appendIcon
      }, null), e.appendAvatar && h(Ct, {
        key: "append-avatar",
        density: e.density,
        image: e.appendAvatar
      }, null)])])]);
    }), {};
  }
}), vu = U({
  opacity: [Number, String],
  ...Se(),
  ...Ue()
}, "VCardText"), fu = le()({
  name: "VCardText",
  props: vu(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    return ne(() => h(e.tag, {
      class: ve(["v-card-text", e.class]),
      style: Ve([{
        "--v-card-text-opacity": e.opacity
      }, e.style])
    }, t)), {};
  }
}), mu = U({
  appendAvatar: String,
  appendIcon: we,
  disabled: Boolean,
  flat: Boolean,
  hover: Boolean,
  image: String,
  link: {
    type: Boolean,
    default: void 0
  },
  prependAvatar: String,
  prependIcon: we,
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
  ...Mt(),
  ...Se(),
  ...ct(),
  ...Nt(),
  ...Lt(),
  ...nl(),
  ...on(),
  ...nn(),
  ...ht(),
  ...vn(),
  ...Ue(),
  ...Re(),
  ...zt({
    variant: "elevated"
  })
}, "VCard"), gu = le()({
  name: "VCard",
  directives: {
    vRipple: Vt
  },
  props: mu(),
  setup(e, l) {
    let {
      attrs: t,
      slots: a
    } = l;
    const {
      themeClasses: n
    } = Ke(e), {
      borderClasses: o
    } = va(e), {
      colorClasses: i,
      colorStyles: s,
      variantClasses: r
    } = Za(e), {
      densityClasses: c
    } = At(e), {
      dimensionStyles: u
    } = Rt(e), {
      elevationClasses: d
    } = fa(e), {
      loaderClasses: m
    } = al(e), {
      locationStyles: v
    } = _i(e), {
      positionClasses: f
    } = ln(e), {
      roundedClasses: V
    } = Tt(e), y = un(e, t);
    return ne(() => {
      const w = e.link !== !1 && y.isLink.value, g = !e.disabled && e.link !== !1 && (e.link || y.isClickable.value), C = w ? "a" : e.tag, S = !!(a.title || e.title != null), p = !!(a.subtitle || e.subtitle != null), k = S || p, T = !!(a.append || e.appendAvatar || e.appendIcon), b = !!(a.prepend || e.prependAvatar || e.prependIcon), B = !!(a.image || e.image), _ = k || b || T, $ = !!(a.text || e.text != null);
      return Ze(h(C, H({
        class: ["v-card", {
          "v-card--disabled": e.disabled,
          "v-card--flat": e.flat,
          "v-card--hover": e.hover && !(e.disabled || e.flat),
          "v-card--link": g
        }, n.value, o.value, i.value, c.value, d.value, m.value, f.value, V.value, r.value, e.class],
        style: [s.value, u.value, v.value, e.style],
        onClick: g && y.navigate,
        tabindex: e.disabled ? -1 : void 0
      }, y.linkProps), {
        default: () => {
          var M;
          return [B && P("div", {
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
          }, a.image) : h(ga, {
            key: "image-img",
            cover: !0,
            src: e.image
          }, null)]), h(ll, {
            name: "v-card",
            active: !!e.loading,
            color: typeof e.loading == "boolean" ? void 0 : e.loading
          }, {
            default: a.loader
          }), _ && h(du, {
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
          }), $ && h(fu, {
            key: "text"
          }, {
            default: () => {
              var D;
              return [((D = a.text) == null ? void 0 : D.call(a)) ?? e.text];
            }
          }), (M = a.default) == null ? void 0 : M.call(a), a.actions && h(su, null, {
            default: a.actions
          }), Qa(g, "v-card")];
        }
      }), [[Vt, g && e.ripple]]);
    }), {};
  }
}), yu = le()({
  name: "VSlideGroupItem",
  props: el(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, l) {
    let {
      slots: t
    } = l;
    const a = tl(e, Zn);
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
}), hu = {
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
    function i(r, c, u) {
      r[u] ? !r[u].includes(c) && r[u].push(c) : r[u] = [c];
    }
    const s = I(() => {
      const r = {};
      if (a.value)
        for (var c of a.value) {
          const d = c[n.field];
          if (Array.isArray(d))
            if (d.length)
              for (var u of d)
                i(r, c, u);
            else
              i(r, c, null);
          else
            i(r, c, d);
        }
      return r;
    });
    return (r, c) => (L(), Z(mn, null, {
      default: F(() => [
        h(Ft, null, {
          default: F(() => [
            (L(!0), be(J, null, De(n.headers, (u, d) => (L(), Z(yu, {
              key: u.value
            }, {
              default: F(({ selectedClass: m }) => [
                h(gu, {
                  width: "400",
                  class: ve(["ma-3", m]),
                  color: o(d),
                  lines: "two"
                }, {
                  default: F(() => [
                    h(ho, null, {
                      default: F(() => [
                        Pe(Fe(u.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    h(rt, {
                      "bg-color": o(d)
                    }, {
                      default: F(() => [
                        s.value && s.value[u.value] ? (L(!0), be(J, { key: 0 }, De(s.value[u.value], (v) => j(r.$slots, "item", {
                          key: v.id,
                          header: u,
                          item: v
                        }, () => [
                          h(je, {
                            title: v[n.itemTitle],
                            value: n.itemValue && v[n.itemValue],
                            onClick: (f) => t("click", v)
                          }, {
                            append: F(() => [
                              j(r.$slots, "item.action")
                            ]),
                            _: 2
                          }, 1032, ["title", "value", "onClick"])
                        ])), 128)) : ce("", !0)
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
function bu() {
  const e = X([]);
  ci(() => e.value = []);
  function l(t, a) {
    e.value[a] = t;
  }
  return {
    refs: e,
    updateRef: l
  };
}
const pu = U({
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
    type: we,
    default: "$first"
  },
  prevIcon: {
    type: we,
    default: "$prev"
  },
  nextIcon: {
    type: we,
    default: "$next"
  },
  lastIcon: {
    type: we,
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
  ...Mt(),
  ...Se(),
  ...ct(),
  ...Lt(),
  ...ht(),
  ...dn(),
  ...Ue({
    tag: "nav"
  }),
  ...Re(),
  ...zt({
    variant: "text"
  })
}, "VPagination"), ql = le()({
  name: "VPagination",
  props: pu(),
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
    const n = ke(e, "modelValue"), {
      t: o,
      n: i
    } = ot(), {
      isRtl: s
    } = nt(), {
      themeClasses: r
    } = Ke(e), {
      width: c
    } = dt(), u = Q(-1);
    at(void 0, {
      scoped: !0
    });
    const {
      resizeRef: d
    } = kt((b) => {
      if (!b.length) return;
      const {
        target: B,
        contentRect: _
      } = b[0], $ = B.querySelector(".v-pagination__list > *");
      if (!$) return;
      const M = _.width, D = $.offsetWidth + parseFloat(getComputedStyle($).marginRight) * 2;
      u.value = V(M, D);
    }), m = I(() => parseInt(e.length, 10)), v = I(() => parseInt(e.start, 10)), f = I(() => e.totalVisible != null ? parseInt(e.totalVisible, 10) : u.value >= 0 ? u.value : V(c.value, 58));
    function V(b, B) {
      const _ = e.showFirstLastPage ? 5 : 3;
      return Math.max(0, Math.floor(
        // Round to two decimal places to avoid floating point errors
        Number(((b - B * _) / B).toFixed(2))
      ));
    }
    const y = I(() => {
      if (m.value <= 0 || isNaN(m.value) || m.value > Number.MAX_SAFE_INTEGER) return [];
      if (f.value <= 0) return [];
      if (f.value === 1) return [n.value];
      if (m.value <= f.value)
        return Yt(m.value, v.value);
      const b = f.value % 2 === 0, B = b ? f.value / 2 : Math.floor(f.value / 2), _ = b ? B : B + 1, $ = m.value - B;
      if (_ - n.value >= 0)
        return [...Yt(Math.max(1, f.value - 1), v.value), e.ellipsis, m.value];
      if (n.value - $ >= (b ? 1 : 0)) {
        const M = f.value - 1, D = m.value - M + v.value;
        return [v.value, e.ellipsis, ...Yt(M, D)];
      } else {
        const M = Math.max(1, f.value - 2), D = M === 1 ? n.value : n.value - Math.ceil(M / 2) + v.value;
        return [v.value, e.ellipsis, ...Yt(M, D), e.ellipsis, m.value];
      }
    });
    function w(b, B, _) {
      b.preventDefault(), n.value = B, _ && a(_, B);
    }
    const {
      refs: g,
      updateRef: C
    } = bu();
    at({
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
    const S = I(() => y.value.map((b, B) => {
      const _ = ($) => C($, B);
      if (typeof b == "string")
        return {
          isActive: !1,
          key: `ellipsis-${B}`,
          page: b,
          props: {
            ref: _,
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
            ref: _,
            ellipsis: !1,
            icon: !0,
            disabled: !!e.disabled || Number(e.length) < 2,
            color: $ ? e.activeColor : e.color,
            "aria-current": $,
            "aria-label": o($ ? e.currentPageAriaLabel : e.pageAriaLabel, b),
            onClick: (M) => w(M, b)
          }
        };
      }
    })), p = I(() => {
      const b = !!e.disabled || n.value <= v.value, B = !!e.disabled || n.value >= v.value + m.value - 1;
      return {
        first: e.showFirstLastPage ? {
          icon: s.value ? e.lastIcon : e.firstIcon,
          onClick: (_) => w(_, v.value, "first"),
          disabled: b,
          "aria-label": o(e.firstAriaLabel),
          "aria-disabled": b
        } : void 0,
        prev: {
          icon: s.value ? e.nextIcon : e.prevIcon,
          onClick: (_) => w(_, n.value - 1, "prev"),
          disabled: b,
          "aria-label": o(e.previousAriaLabel),
          "aria-disabled": b
        },
        next: {
          icon: s.value ? e.prevIcon : e.nextIcon,
          onClick: (_) => w(_, n.value + 1, "next"),
          disabled: B,
          "aria-label": o(e.nextAriaLabel),
          "aria-disabled": B
        },
        last: e.showFirstLastPage ? {
          icon: s.value ? e.firstIcon : e.lastIcon,
          onClick: (_) => w(_, v.value + m.value - 1, "last"),
          disabled: B,
          "aria-label": o(e.lastAriaLabel),
          "aria-disabled": B
        } : void 0
      };
    });
    function k() {
      var B;
      const b = n.value - v.value;
      (B = g.value[b]) == null || B.$el.focus();
    }
    function T(b) {
      b.key === _l.left && !e.disabled && n.value > Number(e.start) ? (n.value = n.value - 1, $e(k)) : b.key === _l.right && !e.disabled && n.value < v.value + m.value - 1 && (n.value = n.value + 1, $e(k));
    }
    return ne(() => h(e.tag, {
      ref: d,
      class: ve(["v-pagination", r.value, e.class]),
      style: Ve(e.style),
      role: "navigation",
      "aria-label": o(e.ariaLabel),
      onKeydown: T,
      "data-test": "v-pagination-root"
    }, {
      default: () => [P("ul", {
        class: "v-pagination__list"
      }, [e.showFirstLastPage && P("li", {
        key: "first",
        class: "v-pagination__first",
        "data-test": "v-pagination-first"
      }, [t.first ? t.first(p.value.first) : h(pe, H({
        _as: "VPaginationBtn"
      }, p.value.first), null)]), P("li", {
        key: "prev",
        class: "v-pagination__prev",
        "data-test": "v-pagination-prev"
      }, [t.prev ? t.prev(p.value.prev) : h(pe, H({
        _as: "VPaginationBtn"
      }, p.value.prev), null)]), S.value.map((b, B) => P("li", {
        key: b.key,
        class: ve(["v-pagination__item", {
          "v-pagination__item--is-active": b.isActive
        }]),
        "data-test": "v-pagination-item"
      }, [t.item ? t.item(b) : h(pe, H({
        _as: "VPaginationBtn"
      }, b.props), {
        default: () => [b.page]
      })])), P("li", {
        key: "next",
        class: "v-pagination__next",
        "data-test": "v-pagination-next"
      }, [t.next ? t.next(p.value.next) : h(pe, H({
        _as: "VPaginationBtn"
      }, p.value.next), null)]), e.showFirstLastPage && P("li", {
        key: "last",
        class: "v-pagination__last",
        "data-test": "v-pagination-last"
      }, [t.last ? t.last(p.value.last) : h(pe, H({
        _as: "VPaginationBtn"
      }, p.value.last), null)])])]
    })), {};
  }
}), bo = U({
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
  const l = ke(e, "page", void 0, (a) => Number(a ?? 1)), t = ke(e, "itemsPerPage", void 0, (a) => Number(a ?? 10));
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
  } = e, n = I(() => t.value === -1 ? 0 : t.value * (l.value - 1)), o = I(() => t.value === -1 ? a.value : Math.min(a.value, n.value + t.value)), i = I(() => t.value === -1 || a.value === 0 ? 1 : Math.ceil(a.value / t.value));
  ee([l, i], () => {
    l.value > i.value && (l.value = i.value);
  });
  function s(m) {
    t.value = m, l.value = 1;
  }
  function r() {
    l.value = Je(l.value + 1, 1, i.value);
  }
  function c() {
    l.value = Je(l.value - 1, 1, i.value);
  }
  function u(m) {
    l.value = Je(m, 1, i.value);
  }
  const d = {
    page: l,
    itemsPerPage: t,
    startIndex: n,
    stopIndex: o,
    pageCount: i,
    itemsLength: a,
    nextPage: r,
    prevPage: c,
    setPage: u,
    setItemsPerPage: s
  };
  return ze(po, d), d;
}
function wu() {
  const e = de(po);
  if (!e) throw new Error("Missing pagination!");
  return e;
}
function Su(e) {
  const l = lt("usePaginatedItems"), {
    items: t,
    startIndex: a,
    stopIndex: n,
    itemsPerPage: o
  } = e, i = I(() => o.value <= 0 ? t.value : t.value.slice(a.value, n.value));
  return ee(i, (s) => {
    l.emit("update:currentItems", s);
  }, {
    immediate: !0
  }), {
    paginatedItems: i
  };
}
const yl = U({
  prevIcon: {
    type: we,
    default: "$prev"
  },
  nextIcon: {
    type: we,
    default: "$next"
  },
  firstIcon: {
    type: we,
    default: "$first"
  },
  lastIcon: {
    type: we,
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
}, "VDataTableFooter"), sa = le()({
  name: "VDataTableFooter",
  props: yl(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    const {
      t: a
    } = ot(), {
      page: n,
      pageCount: o,
      startIndex: i,
      stopIndex: s,
      itemsLength: r,
      itemsPerPage: c,
      setItemsPerPage: u
    } = wu(), d = I(() => e.itemsPerPageOptions.map((m) => typeof m == "number" ? {
      value: m,
      title: m === -1 ? a("$vuetify.dataFooter.itemsPerPageAll") : String(m)
    } : {
      ...m,
      title: isNaN(Number(m.title)) ? a(m.title) : m.title
    }));
    return ne(() => {
      var v;
      const m = ql.filterProps(e);
      return P("div", {
        class: "v-data-table-footer"
      }, [(v = t.prepend) == null ? void 0 : v.call(t), P("div", {
        class: "v-data-table-footer__items-per-page"
      }, [P("span", {
        "aria-label": a(e.itemsPerPageText)
      }, [a(e.itemsPerPageText)]), h(fo, {
        items: d.value,
        modelValue: c.value,
        "onUpdate:modelValue": (f) => u(Number(f)),
        density: "compact",
        variant: "outlined",
        "hide-details": !0
      }, null)]), P("div", {
        class: "v-data-table-footer__info"
      }, [P("div", null, [a(e.pageText, r.value ? i.value + 1 : 0, s.value, r.value)])]), P("div", {
        class: "v-data-table-footer__pagination"
      }, [h(ql, H({
        modelValue: n.value,
        "onUpdate:modelValue": (f) => n.value = f,
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
}), ra = Ui({
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
  return h(a, {
    tabindex: "0",
    class: ve(["v-data-table__td", {
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
      var n;
      return [(n = t.default) == null ? void 0 : n.call(t)];
    }
  });
}), xu = U({
  headers: Array
}, "DataTable-header"), xo = Symbol.for("vuetify:data-table-headers"), ko = {
  title: "",
  sortable: !1
}, ku = {
  ...ko,
  width: 48
};
function Vu() {
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
function ja(e) {
  let l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  if (!e.children)
    l.push(e);
  else
    for (const t of e.children)
      ja(t, l);
  return l;
}
function Vo(e) {
  let l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : /* @__PURE__ */ new Set();
  for (const t of e)
    t.key && l.add(t.key), t.children && Vo(t.children, l);
  return l;
}
function Cu(e) {
  if (e.key) {
    if (e.key === "data-table-group") return ko;
    if (["data-table-expand", "data-table-select"].includes(e.key)) return ku;
  }
}
function hl(e) {
  let l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return e.children ? Math.max(l, ...e.children.map((t) => hl(t, l + 1))) : l;
}
function Pu(e) {
  let l = !1;
  function t(o) {
    let i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (o)
      if (i && (o.fixed = !0), o.fixed)
        if (o.children)
          for (let s = o.children.length - 1; s >= 0; s--)
            t(o.children[s], !0);
        else
          l ? isNaN(Number(o.width)) ? bn(`Multiple fixed columns should have a static width (key: ${o.key})`) : o.minWidth = Math.max(Number(o.width) || 0, Number(o.minWidth) || 0) : o.lastFixed = !0, l = !0;
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
function Iu(e, l) {
  const t = [];
  let a = 0;
  const n = Vu(e);
  for (; n.size() > 0; ) {
    let i = n.count();
    const s = [];
    let r = 1;
    for (; i > 0; ) {
      const {
        element: c,
        priority: u
      } = n.dequeue(), d = l - a - hl(c);
      if (s.push({
        ...c,
        rowspan: d ?? 1,
        colspan: c.children ? ja(c).length : 1
      }), c.children)
        for (const m of c.children) {
          const v = u % 1 + r / Math.pow(10, a + 2);
          n.enqueue(m, a + d + v);
        }
      r += 1, i -= 1;
    }
    a += 1, t.push(s);
  }
  return {
    columns: e.map((i) => ja(i)).flat(),
    headers: t
  };
}
function Co(e) {
  const l = [];
  for (const t of e) {
    const a = {
      ...Cu(t),
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
  const t = X([]), a = X([]), n = X({}), o = X({}), i = X({});
  tt(() => {
    var V, y, w;
    const c = (e.headers || Object.keys(e.items[0] ?? {}).map((g) => ({
      key: g,
      title: di(g)
    }))).slice(), u = Vo(c);
    (V = l == null ? void 0 : l.groupBy) != null && V.value.length && !u.has("data-table-group") && c.unshift({
      key: "data-table-group",
      title: "Group"
    }), (y = l == null ? void 0 : l.showSelect) != null && y.value && !u.has("data-table-select") && c.unshift({
      key: "data-table-select"
    }), (w = l == null ? void 0 : l.showExpand) != null && w.value && !u.has("data-table-expand") && c.push({
      key: "data-table-expand"
    });
    const d = Co(c);
    Pu(d);
    const m = Math.max(...d.map((g) => hl(g))) + 1, v = Iu(d, m);
    t.value = v.headers, a.value = v.columns;
    const f = v.headers.flat(1);
    for (const g of f)
      g.key && (g.sortable && (g.sort && (n.value[g.key] = g.sort), g.sortRaw && (o.value[g.key] = g.sortRaw)), g.filter && (i.value[g.key] = g.filter));
  });
  const s = {
    headers: t,
    columns: a,
    sortFunctions: n,
    sortRawFunctions: o,
    filterFunctions: i
  };
  return ze(xo, s), s;
}
function ha() {
  const e = de(xo);
  if (!e) throw new Error("Missing headers!");
  return e;
}
const Tu = {
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
}, Au = U({
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
}, "DataTable-select"), Ao = Symbol.for("vuetify:data-table-selection");
function _o(e, l) {
  let {
    allItems: t,
    currentPage: a
  } = l;
  const n = ke(e, "modelValue", e.modelValue, (g) => new Set(Ne(g).map((C) => {
    var S;
    return ((S = t.value.find((p) => e.valueComparator(C, p.value))) == null ? void 0 : S.value) ?? C;
  })), (g) => [...g.values()]), o = I(() => t.value.filter((g) => g.selectable)), i = I(() => a.value.filter((g) => g.selectable)), s = I(() => {
    if (typeof e.selectStrategy == "object") return e.selectStrategy;
    switch (e.selectStrategy) {
      case "single":
        return Tu;
      case "all":
        return To;
      case "page":
      default:
        return Io;
    }
  }), r = Q(null);
  function c(g) {
    return Ne(g).every((C) => n.value.has(C.value));
  }
  function u(g) {
    return Ne(g).some((C) => n.value.has(C.value));
  }
  function d(g, C) {
    const S = s.value.select({
      items: g,
      value: C,
      selected: new Set(n.value)
    });
    n.value = S;
  }
  function m(g, C, S) {
    const p = [];
    if (C = C ?? a.value.findIndex((k) => k.value === g.value), e.selectStrategy !== "single" && (S != null && S.shiftKey) && r.value !== null) {
      const [k, T] = [r.value, C].sort((b, B) => b - B);
      p.push(...a.value.slice(k, T + 1).filter((b) => b.selectable));
    } else
      p.push(g), r.value = C;
    d(p, !c([g]));
  }
  function v(g) {
    const C = s.value.selectAll({
      value: g,
      allItems: o.value,
      currentPage: i.value,
      selected: new Set(n.value)
    });
    n.value = C;
  }
  const f = I(() => n.value.size > 0), V = I(() => {
    const g = s.value.allSelected({
      allItems: o.value,
      currentPage: i.value
    });
    return !!g.length && c(g);
  }), y = N(() => s.value.showSelectAll), w = {
    toggleSelect: m,
    select: d,
    selectAll: v,
    isSelected: c,
    isSomeSelected: u,
    someSelected: f,
    allSelected: V,
    showSelectAll: y,
    lastSelectedIndex: r,
    selectStrategy: s
  };
  return ze(Ao, w), w;
}
function ba() {
  const e = de(Ao);
  if (!e) throw new Error("Missing selection!");
  return e;
}
const _u = U({
  sortBy: {
    type: Array,
    default: () => []
  },
  customKeySort: Object,
  multiSort: Boolean,
  mustSort: Boolean
}, "DataTable-sort"), Bo = Symbol.for("vuetify:data-table-sort");
function Eo(e) {
  const l = ke(e, "sortBy"), t = N(() => e.mustSort), a = N(() => e.multiSort);
  return {
    sortBy: l,
    mustSort: t,
    multiSort: a
  };
}
function $o(e) {
  const {
    sortBy: l,
    mustSort: t,
    multiSort: a,
    page: n
  } = e, o = (r) => {
    if (r.key == null) return;
    let c = l.value.map((d) => ({
      ...d
    })) ?? [];
    const u = c.find((d) => d.key === r.key);
    u ? u.order === "desc" ? t.value && c.length === 1 ? u.order = "asc" : c = c.filter((d) => d.key !== r.key) : u.order = "desc" : a.value ? c.push({
      key: r.key,
      order: "asc"
    }) : c = [{
      key: r.key,
      order: "asc"
    }], l.value = c, n && (n.value = 1);
  };
  function i(r) {
    return !!l.value.find((c) => c.key === r.key);
  }
  const s = {
    sortBy: l,
    toggleSort: o,
    isSorted: i
  };
  return ze(Bo, s), s;
}
function Oo() {
  const e = de(Bo);
  if (!e) throw new Error("Missing sort!");
  return e;
}
function Bu(e, l, t, a) {
  const n = ot();
  return {
    sortedItems: I(() => {
      var i, s;
      return t.value.length ? Eu(l.value, t.value, n.current.value, {
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
function Eu(e, l, t, a) {
  const n = new Intl.Collator(t, {
    sensitivity: "accent",
    usage: "sort"
  });
  return e.map((i) => [i, a != null && a.transform ? a.transform(i) : i]).sort((i, s) => {
    var r, c;
    for (let u = 0; u < l.length; u++) {
      let d = !1;
      const m = l[u].key, v = l[u].order ?? "asc";
      if (v === !1) continue;
      let f = ta(i[1], m), V = ta(s[1], m), y = i[0].raw, w = s[0].raw;
      if (v === "desc" && ([f, V] = [V, f], [y, w] = [w, y]), (r = a == null ? void 0 : a.sortRawFunctions) != null && r[m]) {
        const g = a.sortRawFunctions[m](y, w);
        if (g == null) continue;
        if (d = !0, g) return g;
      }
      if ((c = a == null ? void 0 : a.sortFunctions) != null && c[m]) {
        const g = a.sortFunctions[m](f, V);
        if (g == null) continue;
        if (d = !0, g) return g;
      }
      if (!d) {
        if (f instanceof Date && V instanceof Date)
          return f.getTime() - V.getTime();
        if ([f, V] = [f, V].map((g) => g != null ? g.toString().toLocaleLowerCase() : g), f !== V)
          return qt(f) && qt(V) ? 0 : qt(f) ? -1 : qt(V) ? 1 : !isNaN(f) && !isNaN(V) ? Number(f) - Number(V) : n.compare(f, V);
      }
    }
    return 0;
  }).map((i) => {
    let [s] = i;
    return s;
  });
}
const Fo = U({
  color: String,
  disableSort: Boolean,
  fixedHeader: Boolean,
  multiSort: Boolean,
  sortAscIcon: {
    type: we,
    default: "$sortAsc"
  },
  sortDescIcon: {
    type: we,
    default: "$sortDesc"
  },
  headerProps: {
    type: Object
  },
  /** @deprecated */
  sticky: Boolean,
  ...Ut(),
  ...nl()
}, "VDataTableHeaders"), ua = le()({
  name: "VDataTableHeaders",
  props: Fo(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    const {
      t: a
    } = ot(), {
      toggleSort: n,
      sortBy: o,
      isSorted: i
    } = Oo(), {
      someSelected: s,
      allSelected: r,
      selectAll: c,
      showSelectAll: u
    } = ba(), {
      columns: d,
      headers: m
    } = ha(), {
      loaderClasses: v
    } = al(e);
    function f(B, _) {
      if (!(!(e.sticky || e.fixedHeader) && !B.fixed))
        return {
          position: "sticky",
          left: B.fixed ? ye(B.fixedOffset) : void 0,
          top: e.sticky || e.fixedHeader ? `calc(var(--v-table-header-height) * ${_})` : void 0
        };
    }
    function V(B, _) {
      B.key === "Enter" && !e.disableSort && n(_);
    }
    function y(B) {
      const _ = o.value.find(($) => $.key === B.key);
      return _ ? _.order === "asc" ? e.sortAscIcon : e.sortDescIcon : e.sortAscIcon;
    }
    const {
      backgroundColorClasses: w,
      backgroundColorStyles: g
    } = st(() => e.color), {
      displayClasses: C,
      mobile: S
    } = dt(e), p = I(() => ({
      headers: m.value,
      columns: d.value,
      toggleSort: n,
      isSorted: i,
      sortBy: o.value,
      someSelected: s.value,
      allSelected: r.value,
      selectAll: c,
      getSortIcon: y
    })), k = I(() => ["v-data-table__th", {
      "v-data-table__th--sticky": e.sticky || e.fixedHeader
    }, C.value, v.value]), T = (B) => {
      let {
        column: _,
        x: $,
        y: M
      } = B;
      const D = _.key === "data-table-select" || _.key === "data-table-expand", K = H(e.headerProps ?? {}, _.headerProps ?? {});
      return h(ra, H({
        tag: "th",
        align: _.align,
        class: [{
          "v-data-table__th--sortable": _.sortable && !e.disableSort,
          "v-data-table__th--sorted": i(_),
          "v-data-table__th--fixed": _.fixed
        }, ...k.value],
        style: {
          width: ye(_.width),
          minWidth: ye(_.minWidth),
          maxWidth: ye(_.maxWidth),
          ...f(_, M)
        },
        colspan: _.colspan,
        rowspan: _.rowspan,
        onClick: _.sortable ? () => n(_) : void 0,
        fixed: _.fixed,
        nowrap: _.nowrap,
        lastFixed: _.lastFixed,
        noPadding: D
      }, K, {
        onKeydown: (W) => _.sortable && V(W, _)
      }), {
        default: () => {
          var ae;
          const W = `header.${_.key}`, G = {
            column: _,
            selectAll: c,
            isSorted: i,
            toggleSort: n,
            sortBy: o.value,
            someSelected: s.value,
            allSelected: r.value,
            getSortIcon: y
          };
          return t[W] ? t[W](G) : _.key === "data-table-select" ? ((ae = t["header.data-table-select"]) == null ? void 0 : ae.call(t, G)) ?? (u.value && h(jt, {
            modelValue: r.value,
            indeterminate: s.value && !r.value,
            "onUpdate:modelValue": c
          }, null)) : P("div", {
            class: "v-data-table-header__content"
          }, [P("span", null, [_.title]), _.sortable && !e.disableSort && h(xe, {
            key: "icon",
            class: "v-data-table-header__sort-icon",
            icon: y(_)
          }, null), e.multiSort && i(_) && P("div", {
            key: "badge",
            class: ve(["v-data-table-header__sort-badge", ...w.value]),
            style: Ve(g.value)
          }, [o.value.findIndex((oe) => oe.key === _.key) + 1])]);
        }
      });
    }, b = () => {
      const B = I(() => d.value.filter(($) => ($ == null ? void 0 : $.sortable) && !e.disableSort)), _ = I(() => {
        if (d.value.find((M) => M.key === "data-table-select") != null)
          return r.value ? "$checkboxOn" : s.value ? "$checkboxIndeterminate" : "$checkboxOff";
      });
      return h(ra, H({
        tag: "th",
        class: [...k.value],
        colspan: m.value.length + 1
      }, e.headerProps), {
        default: () => [P("div", {
          class: "v-data-table-header__content"
        }, [h(fo, {
          chips: !0,
          class: "v-data-table__td-sort-select",
          clearable: !0,
          density: "default",
          items: B.value,
          label: a("$vuetify.dataTable.sortBy"),
          multiple: e.multiSort,
          variant: "underlined",
          "onClick:clear": () => o.value = [],
          appendIcon: _.value,
          "onClick:append": () => c(!r.value)
        }, {
          ...t,
          chip: ($) => {
            var M;
            return h(fl, {
              onClick: (M = $.item.raw) != null && M.sortable ? () => n($.item.raw) : void 0,
              onMousedown: (D) => {
                D.preventDefault(), D.stopPropagation();
              }
            }, {
              default: () => [$.item.title, h(xe, {
                class: ve(["v-data-table__td-sort-icon", i($.item.raw) && "v-data-table__td-sort-icon-active"]),
                icon: y($.item.raw),
                size: "small"
              }, null)]
            });
          }
        })])]
      });
    };
    ne(() => S.value ? P("tr", null, [h(b, null, null)]) : P(J, null, [t.headers ? t.headers(p.value) : m.value.map((B, _) => P("tr", null, [B.map(($, M) => h(T, {
      column: $,
      x: M,
      y: _
    }, null))])), e.loading && P("tr", {
      class: "v-data-table-progress"
    }, [P("th", {
      colspan: d.value.length
    }, [h(ll, {
      name: "v-data-table-progress",
      absolute: !0,
      active: !0,
      color: typeof e.loading == "boolean" ? void 0 : e.loading,
      indeterminate: !0
    }, {
      default: t.loader
    })])])]));
  }
}), $u = U({
  groupBy: {
    type: Array,
    default: () => []
  }
}, "DataTable-group"), Do = Symbol.for("vuetify:data-table-group");
function Lo(e) {
  return {
    groupBy: ke(e, "groupBy")
  };
}
function Mo(e) {
  const {
    disableSort: l,
    groupBy: t,
    sortBy: a
  } = e, n = X(/* @__PURE__ */ new Set()), o = I(() => t.value.map((u) => ({
    ...u,
    order: u.order ?? !1
  })).concat(l != null && l.value ? [] : a.value));
  function i(u) {
    return n.value.has(u.id);
  }
  function s(u) {
    const d = new Set(n.value);
    i(u) ? d.delete(u.id) : d.add(u.id), n.value = d;
  }
  function r(u) {
    function d(m) {
      const v = [];
      for (const f of m.items)
        "type" in f && f.type === "group" ? v.push(...d(f)) : v.push(f);
      return [...new Set(v)];
    }
    return d({
      items: u
    });
  }
  const c = {
    sortByWithGroups: o,
    toggleGroup: s,
    opened: n,
    groupBy: t,
    extractRows: r,
    isGroupOpen: i
  };
  return ze(Do, c), c;
}
function Ro() {
  const e = de(Do);
  if (!e) throw new Error("Missing group!");
  return e;
}
function Ou(e, l) {
  if (!e.length) return [];
  const t = /* @__PURE__ */ new Map();
  for (const a of e) {
    const n = ta(a.raw, l);
    t.has(n) || t.set(n, []), t.get(n).push(a);
  }
  return t;
}
function No(e, l) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "root";
  if (!l.length) return [];
  const n = Ou(e, l[0]), o = [], i = l.slice(1);
  return n.forEach((s, r) => {
    const c = l[0], u = `${a}_${c}_${r}`;
    o.push({
      depth: t,
      id: u,
      key: c,
      value: r,
      items: i.length ? No(s, i, t + 1, u) : s,
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
    flatItems: I(() => {
      if (!l.value.length) return e.value;
      const n = No(e.value, l.value.map((o) => o.key));
      return Ho(n, t.value);
    })
  };
}
const Fu = U({
  item: {
    type: Object,
    required: !0
  }
}, "VDataTableGroupHeaderRow"), Du = le()({
  name: "VDataTableGroupHeaderRow",
  props: Fu(),
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
    } = ba(), {
      columns: c
    } = ha(), u = I(() => o([e.item]));
    return () => P("tr", {
      class: "v-data-table-group-header-row",
      style: {
        "--v-data-table-group-header-row-depth": e.item.depth
      }
    }, [c.value.map((d) => {
      var m, v;
      if (d.key === "data-table-group") {
        const f = a(e.item) ? "$expand" : "$next", V = () => n(e.item);
        return ((m = t["data-table-group"]) == null ? void 0 : m.call(t, {
          item: e.item,
          count: u.value.length,
          props: {
            icon: f,
            onClick: V
          }
        })) ?? h(ra, {
          class: "v-data-table-group-header-row__column"
        }, {
          default: () => [h(pe, {
            size: "small",
            variant: "text",
            icon: f,
            onClick: V
          }, null), P("span", null, [e.item.value]), P("span", null, [Pe("("), u.value.length, Pe(")")])]
        });
      }
      if (d.key === "data-table-select") {
        const f = i(u.value), V = s(u.value) && !f, y = (w) => r(u.value, w);
        return ((v = t["data-table-select"]) == null ? void 0 : v.call(t, {
          props: {
            modelValue: f,
            indeterminate: V,
            "onUpdate:modelValue": y
          }
        })) ?? P("td", null, [h(jt, {
          modelValue: f,
          indeterminate: V,
          "onUpdate:modelValue": y
        }, null)]);
      }
      return P("td", null, null);
    })]);
  }
}), Lu = U({
  expandOnClick: Boolean,
  showExpand: Boolean,
  expanded: {
    type: Array,
    default: () => []
  }
}, "DataTable-expand"), Wo = Symbol.for("vuetify:datatable:expanded");
function Uo(e) {
  const l = N(() => e.expandOnClick), t = ke(e, "expanded", e.expanded, (s) => new Set(s), (s) => [...s.values()]);
  function a(s, r) {
    const c = new Set(t.value);
    r ? c.add(s.value) : c.delete(s.value), t.value = c;
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
  return ze(Wo, i), i;
}
function Ko() {
  const e = de(Wo);
  if (!e) throw new Error("foo");
  return e;
}
const Mu = U({
  index: Number,
  item: Object,
  cellProps: [Object, Function],
  onClick: Ye(),
  onContextmenu: Ye(),
  onDblclick: Ye(),
  ...Ut()
}, "VDataTableRow"), Ru = le()({
  name: "VDataTableRow",
  props: Mu(),
  setup(e, l) {
    let {
      slots: t
    } = l;
    const {
      displayClasses: a,
      mobile: n
    } = dt(e, "v-data-table__tr"), {
      isSelected: o,
      toggleSelect: i,
      someSelected: s,
      allSelected: r,
      selectAll: c
    } = ba(), {
      isExpanded: u,
      toggleExpand: d
    } = Ko(), {
      toggleSort: m,
      sortBy: v,
      isSorted: f
    } = Oo(), {
      columns: V
    } = ha();
    ne(() => P("tr", {
      class: ve(["v-data-table__tr", {
        "v-data-table__tr--clickable": !!(e.onClick || e.onContextmenu || e.onDblclick)
      }, a.value]),
      onClick: e.onClick,
      onContextmenu: e.onContextmenu,
      onDblclick: e.onDblclick
    }, [e.item && V.value.map((y, w) => {
      const g = e.item, C = `item.${y.key}`, S = `header.${y.key}`, p = {
        index: e.index,
        item: g.raw,
        internalItem: g,
        value: ta(g.columns, y.key),
        column: y,
        isSelected: o,
        toggleSelect: i,
        isExpanded: u,
        toggleExpand: d
      }, k = {
        column: y,
        selectAll: c,
        isSorted: f,
        toggleSort: m,
        sortBy: v.value,
        someSelected: s.value,
        allSelected: r.value,
        getSortIcon: () => ""
      }, T = typeof e.cellProps == "function" ? e.cellProps({
        index: p.index,
        item: p.item,
        internalItem: p.internalItem,
        value: p.value,
        column: y
      }) : e.cellProps, b = typeof y.cellProps == "function" ? y.cellProps({
        index: p.index,
        item: p.item,
        internalItem: p.internalItem,
        value: p.value
      }) : y.cellProps;
      return h(ra, H({
        align: y.align,
        class: {
          "v-data-table__td--expanded-row": y.key === "data-table-expand",
          "v-data-table__td--select-row": y.key === "data-table-select"
        },
        fixed: y.fixed,
        fixedOffset: y.fixedOffset,
        lastFixed: y.lastFixed,
        maxWidth: n.value ? void 0 : y.maxWidth,
        noPadding: y.key === "data-table-select" || y.key === "data-table-expand",
        nowrap: y.nowrap,
        width: n.value ? void 0 : y.width
      }, T, b), {
        default: () => {
          var _, $, M, D;
          if (y.key === "data-table-select")
            return ((_ = t["item.data-table-select"]) == null ? void 0 : _.call(t, {
              ...p,
              props: {
                disabled: !g.selectable,
                modelValue: o([g]),
                onClick: Ie(() => i(g), ["stop"])
              }
            })) ?? h(jt, {
              disabled: !g.selectable,
              modelValue: o([g]),
              onClick: Ie((K) => i(g, e.index, K), ["stop"])
            }, null);
          if (y.key === "data-table-expand")
            return (($ = t["item.data-table-expand"]) == null ? void 0 : $.call(t, {
              ...p,
              props: {
                icon: u(g) ? "$collapse" : "$expand",
                size: "small",
                variant: "text",
                onClick: Ie(() => d(g), ["stop"])
              }
            })) ?? h(pe, {
              icon: u(g) ? "$collapse" : "$expand",
              size: "small",
              variant: "text",
              onClick: Ie(() => d(g), ["stop"])
            }, null);
          if (t[C] && !n.value) return t[C](p);
          const B = Fe(p.value);
          return n.value ? P(J, null, [P("div", {
            class: "v-data-table__td-title"
          }, [((M = t[S]) == null ? void 0 : M.call(t, k)) ?? y.title]), P("div", {
            class: "v-data-table__td-value"
          }, [((D = t[C]) == null ? void 0 : D.call(t, p)) ?? B])]) : B;
        }
      });
    })]));
  }
}), jo = U({
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
  ...Ut()
}, "VDataTableRows"), ca = le()({
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
    } = ha(), {
      expandOnClick: o,
      toggleExpand: i,
      isExpanded: s
    } = Ko(), {
      isSelected: r,
      toggleSelect: c
    } = ba(), {
      toggleGroup: u,
      isGroupOpen: d
    } = Ro(), {
      t: m
    } = ot(), {
      mobile: v
    } = dt(e);
    return ne(() => {
      var f, V;
      return e.loading && (!e.items.length || a.loading) ? P("tr", {
        class: "v-data-table-rows-loading",
        key: "loading"
      }, [P("td", {
        colspan: n.value.length
      }, [((f = a.loading) == null ? void 0 : f.call(a)) ?? m(e.loadingText)])]) : !e.loading && !e.items.length && !e.hideNoData ? P("tr", {
        class: "v-data-table-rows-no-data",
        key: "no-data"
      }, [P("td", {
        colspan: n.value.length
      }, [((V = a["no-data"]) == null ? void 0 : V.call(a)) ?? m(e.noDataText)])]) : P(J, null, [e.items.map((y, w) => {
        var S;
        if (y.type === "group") {
          const p = {
            index: w,
            item: y,
            columns: n.value,
            isExpanded: s,
            toggleExpand: i,
            isSelected: r,
            toggleSelect: c,
            toggleGroup: u,
            isGroupOpen: d
          };
          return a["group-header"] ? a["group-header"](p) : h(Du, H({
            key: `group-header_${y.id}`,
            item: y
          }, El(t, ":group-header", () => p)), a);
        }
        const g = {
          index: w,
          item: y.raw,
          internalItem: y,
          columns: n.value,
          isExpanded: s,
          toggleExpand: i,
          isSelected: r,
          toggleSelect: c
        }, C = {
          ...g,
          props: H({
            key: `item_${y.key ?? y.index}`,
            onClick: o.value ? () => {
              i(y);
            } : void 0,
            index: w,
            item: y,
            cellProps: e.cellProps,
            mobile: v.value
          }, El(t, ":row", () => g), typeof e.rowProps == "function" ? e.rowProps({
            item: g.item,
            index: g.index,
            internalItem: g.internalItem
          }) : e.rowProps)
        };
        return P(J, {
          key: C.props.key
        }, [a.item ? a.item(C) : h(Ru, C.props, a), s(y) && ((S = a["expanded-row"]) == null ? void 0 : S.call(a, g))]);
      })]);
    }), {};
  }
}), Go = U({
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  height: [Number, String],
  hover: Boolean,
  ...Se(),
  ...ct(),
  ...Ue(),
  ...Re()
}, "VTable"), da = le()({
  name: "VTable",
  props: Go(),
  setup(e, l) {
    let {
      slots: t,
      emit: a
    } = l;
    const {
      themeClasses: n
    } = Ke(e), {
      densityClasses: o
    } = At(e);
    return ne(() => h(e.tag, {
      class: ve(["v-table", {
        "v-table--fixed-height": !!e.height,
        "v-table--fixed-header": e.fixedHeader,
        "v-table--fixed-footer": e.fixedFooter,
        "v-table--has-top": !!t.top,
        "v-table--has-bottom": !!t.bottom,
        "v-table--hover": e.hover
      }, n.value, o.value, e.class]),
      style: Ve(e.style)
    }, {
      default: () => {
        var i, s, r;
        return [(i = t.top) == null ? void 0 : i.call(t), t.default ? P("div", {
          class: "v-table__wrapper",
          style: {
            height: ye(e.height)
          }
        }, [P("table", null, [t.default()])]) : (s = t.wrapper) == null ? void 0 : s.call(t), (r = t.bottom) == null ? void 0 : r.call(t)];
      }
    })), {};
  }
}), Nu = U({
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
function Hu(e, l, t, a) {
  const n = e.returnObject ? l : St(l, e.itemValue), o = St(l, e.itemSelectable, !0), i = a.reduce((s, r) => (r.key != null && (s[r.key] = St(l, r.value)), s), {});
  return {
    type: "item",
    key: e.returnObject ? St(l, e.itemValue) : n,
    index: t,
    value: n,
    selectable: o,
    columns: i,
    raw: l
  };
}
function zu(e, l, t) {
  return l.map((a, n) => Hu(e, a, n, t));
}
function Yo(e, l) {
  return {
    items: I(() => zu(e, e.items, l.value))
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
  const i = lt("VDataTable"), s = () => ({
    page: l.value,
    itemsPerPage: t.value,
    sortBy: a.value,
    groupBy: n.value,
    search: o.value
  });
  let r = null;
  ee(s, (c) => {
    it(r, c) || (r && r.search !== c.search && (l.value = 1), i.emit("update:options", c), r = c);
  }, {
    deep: !0,
    immediate: !0
  });
}
const Xo = U({
  ...jo(),
  hideDefaultBody: Boolean,
  hideDefaultFooter: Boolean,
  hideDefaultHeader: Boolean,
  width: [String, Number],
  search: String,
  ...Lu(),
  ...$u(),
  ...xu(),
  ...Nu(),
  ...Au(),
  ..._u(),
  ...Fo(),
  ...Go()
}, "DataTable"), Wu = U({
  ...bo(),
  ...Xo(),
  ...mo(),
  ...yl()
}, "VDataTable");
le()({
  name: "VDataTable",
  props: Wu(),
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
    } = Eo(e), {
      page: r,
      itemsPerPage: c
    } = wo(e), {
      disableSort: u
    } = Xa(e), {
      columns: d,
      headers: m,
      sortFunctions: v,
      sortRawFunctions: f,
      filterFunctions: V
    } = Po(e, {
      groupBy: n,
      showSelect: N(() => e.showSelect),
      showExpand: N(() => e.showExpand)
    }), {
      items: y
    } = Yo(e, d), w = N(() => e.search), {
      filteredItems: g
    } = go(e, y, w, {
      transform: (q) => q.columns,
      customKeyFilter: V
    }), {
      toggleSort: C
    } = $o({
      sortBy: o,
      multiSort: i,
      mustSort: s,
      page: r
    }), {
      sortByWithGroups: S,
      opened: p,
      extractRows: k,
      isGroupOpen: T,
      toggleGroup: b
    } = Mo({
      groupBy: n,
      sortBy: o,
      disableSort: u
    }), {
      sortedItems: B
    } = Bu(e, g, S, {
      transform: (q) => ({
        ...q.raw,
        ...q.columns
      }),
      sortFunctions: v,
      sortRawFunctions: f
    }), {
      flatItems: _
    } = zo(B, n, p), $ = I(() => _.value.length), {
      startIndex: M,
      stopIndex: D,
      pageCount: K,
      setItemsPerPage: W
    } = So({
      page: r,
      itemsPerPage: c,
      itemsLength: $
    }), {
      paginatedItems: G
    } = Su({
      items: _,
      startIndex: M,
      stopIndex: D,
      itemsPerPage: c
    }), ae = I(() => k(G.value)), {
      isSelected: oe,
      select: fe,
      selectAll: A,
      toggleSelect: E,
      someSelected: O,
      allSelected: z
    } = _o(e, {
      allItems: y,
      currentPage: ae
    }), {
      isExpanded: he,
      toggleExpand: te
    } = Uo(e);
    qo({
      page: r,
      itemsPerPage: c,
      sortBy: o,
      groupBy: n,
      search: w
    }), at({
      VDataTableRows: {
        hideNoData: N(() => e.hideNoData),
        noDataText: N(() => e.noDataText),
        loading: N(() => e.loading),
        loadingText: N(() => e.loadingText)
      }
    });
    const ue = I(() => ({
      page: r.value,
      itemsPerPage: c.value,
      sortBy: o.value,
      pageCount: K.value,
      toggleSort: C,
      setItemsPerPage: W,
      someSelected: O.value,
      allSelected: z.value,
      isSelected: oe,
      select: fe,
      selectAll: A,
      toggleSelect: E,
      isExpanded: he,
      toggleExpand: te,
      isGroupOpen: T,
      toggleGroup: b,
      items: ae.value.map((q) => q.raw),
      internalItems: ae.value,
      groupedItems: G.value,
      columns: d.value,
      headers: m.value
    }));
    return ne(() => {
      const q = sa.filterProps(e), se = ua.filterProps(e), me = ca.filterProps(e), R = da.filterProps(e);
      return h(da, H({
        class: ["v-data-table", {
          "v-data-table--show-select": e.showSelect,
          "v-data-table--loading": e.loading
        }, e.class],
        style: e.style
      }, R, {
        fixedHeader: e.fixedHeader || e.sticky
      }), {
        top: () => {
          var Y;
          return (Y = a.top) == null ? void 0 : Y.call(a, ue.value);
        },
        default: () => {
          var Y, re, ge, Ce, Be, Me;
          return a.default ? a.default(ue.value) : P(J, null, [(Y = a.colgroup) == null ? void 0 : Y.call(a, ue.value), !e.hideDefaultHeader && P("thead", {
            key: "thead"
          }, [h(ua, se, a)]), (re = a.thead) == null ? void 0 : re.call(a, ue.value), !e.hideDefaultBody && P("tbody", null, [(ge = a["body.prepend"]) == null ? void 0 : ge.call(a, ue.value), a.body ? a.body(ue.value) : h(ca, H(t, me, {
            items: G.value
          }), a), (Ce = a["body.append"]) == null ? void 0 : Ce.call(a, ue.value)]), (Be = a.tbody) == null ? void 0 : Be.call(a, ue.value), (Me = a.tfoot) == null ? void 0 : Me.call(a, ue.value)]);
        },
        bottom: () => a.bottom ? a.bottom(ue.value) : !e.hideDefaultFooter && P(J, null, [h(Dt, null, null), h(sa, q, {
          prepend: a["footer.prepend"]
        })])
      });
    }), {};
  }
});
const Uu = U({
  itemsLength: {
    type: [Number, String],
    required: !0
  },
  ...bo(),
  ...Xo(),
  ...yl()
}, "VDataTableServer"), Ku = le()({
  name: "VDataTableServer",
  props: Uu(),
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
    } = Eo(e), {
      page: r,
      itemsPerPage: c
    } = wo(e), {
      disableSort: u
    } = Xa(e), d = I(() => parseInt(e.itemsLength, 10)), {
      columns: m,
      headers: v
    } = Po(e, {
      groupBy: n,
      showSelect: N(() => e.showSelect),
      showExpand: N(() => e.showExpand)
    }), {
      items: f
    } = Yo(e, m), {
      toggleSort: V
    } = $o({
      sortBy: o,
      multiSort: i,
      mustSort: s,
      page: r
    }), {
      opened: y,
      isGroupOpen: w,
      toggleGroup: g,
      extractRows: C
    } = Mo({
      groupBy: n,
      sortBy: o,
      disableSort: u
    }), {
      pageCount: S,
      setItemsPerPage: p
    } = So({
      page: r,
      itemsPerPage: c,
      itemsLength: d
    }), {
      flatItems: k
    } = zo(f, n, y), {
      isSelected: T,
      select: b,
      selectAll: B,
      toggleSelect: _,
      someSelected: $,
      allSelected: M
    } = _o(e, {
      allItems: f,
      currentPage: f
    }), {
      isExpanded: D,
      toggleExpand: K
    } = Uo(e), W = I(() => C(f.value));
    qo({
      page: r,
      itemsPerPage: c,
      sortBy: o,
      groupBy: n,
      search: N(() => e.search)
    }), ze("v-data-table", {
      toggleSort: V,
      sortBy: o
    }), at({
      VDataTableRows: {
        hideNoData: N(() => e.hideNoData),
        noDataText: N(() => e.noDataText),
        loading: N(() => e.loading),
        loadingText: N(() => e.loadingText)
      }
    });
    const G = I(() => ({
      page: r.value,
      itemsPerPage: c.value,
      sortBy: o.value,
      pageCount: S.value,
      toggleSort: V,
      setItemsPerPage: p,
      someSelected: $.value,
      allSelected: M.value,
      isSelected: T,
      select: b,
      selectAll: B,
      toggleSelect: _,
      isExpanded: D,
      toggleExpand: K,
      isGroupOpen: w,
      toggleGroup: g,
      items: W.value.map((ae) => ae.raw),
      internalItems: W.value,
      groupedItems: k.value,
      columns: m.value,
      headers: v.value
    }));
    ne(() => {
      const ae = sa.filterProps(e), oe = ua.filterProps(e), fe = ca.filterProps(e), A = da.filterProps(e);
      return h(da, H({
        class: ["v-data-table", {
          "v-data-table--loading": e.loading
        }, e.class],
        style: e.style
      }, A, {
        fixedHeader: e.fixedHeader || e.sticky
      }), {
        top: () => {
          var E;
          return (E = a.top) == null ? void 0 : E.call(a, G.value);
        },
        default: () => {
          var E, O, z, he, te, ue;
          return a.default ? a.default(G.value) : P(J, null, [(E = a.colgroup) == null ? void 0 : E.call(a, G.value), !e.hideDefaultHeader && P("thead", {
            key: "thead",
            class: "v-data-table__thead",
            role: "rowgroup"
          }, [h(ua, oe, a)]), (O = a.thead) == null ? void 0 : O.call(a, G.value), !e.hideDefaultBody && P("tbody", {
            class: "v-data-table__tbody",
            role: "rowgroup"
          }, [(z = a["body.prepend"]) == null ? void 0 : z.call(a, G.value), a.body ? a.body(G.value) : h(ca, H(t, fe, {
            items: k.value
          }), a), (he = a["body.append"]) == null ? void 0 : he.call(a, G.value)]), (te = a.tbody) == null ? void 0 : te.call(a, G.value), (ue = a.tfoot) == null ? void 0 : ue.call(a, G.value)]);
        },
        bottom: () => a.bottom ? a.bottom(G.value) : !e.hideDefaultFooter && P(J, null, [h(Dt, null, null), h(sa, ae, {
          prepend: a["footer.prepend"]
        })])
      });
    });
  }
}), Zo = /* @__PURE__ */ qe({
  __name: "OxListTable",
  props: {
    // list: Object,
    /** Table headers */
    headers: Array,
    /** If True, allow user to edit (display edit button) */
    edit: Boolean
  },
  setup(e) {
    const l = ut(), t = ji(l, "item.", { exclude: ["item.actions"] }), a = de("panel"), n = de("list"), o = de("items"), i = de("user"), s = e, r = I(() => s.headers.reduce((d, m) => (d.push(
      typeof m == "string" ? { key: m, title: ie(bi.field(m)) } : { key: m.key, title: ie(m.title) }
    ), d), []));
    function c(d) {
      const m = {
        ...n.filters,
        page: d.page,
        page_size: d.itemsPerPage,
        ordering: d.sortBy.map(({ key: v, order: f }) => f == "asc" ? v : `-${v}`)
      };
      n.page_size = d.itemsPerPage, n.load({ params: m });
    }
    function u(d, m) {
      a.show({ view: "detail.edit", value: m });
    }
    return (d, m) => {
      var v;
      return L(), Z(Ku, {
        items: x(o),
        "item-index": "id",
        "items-length": x(n).count || x(o).length,
        "items-per-page": s.itemsPerPage,
        loading: (v = x(n).state) == null ? void 0 : v.isProcessing,
        headers: r.value,
        "no-data-text": x(ie)("lists.empty"),
        class: "align-top-table",
        "onUpdate:options": c
      }, xt({
        "item.actions": F(({ item: f }) => [
          x(i).can([f.constructor, "change"], f) ? (L(), Z(la, {
            key: 0,
            icon: "mdi-pencil",
            button: "",
            title: x(ie)("actions.edit"),
            item: f,
            run: u
          }, null, 8, ["title", "item"])) : x(i).can([f.constructor, "view"], f) ? (L(), Z(la, {
            key: 1,
            icon: "mdi-eye-outline",
            button: "",
            title: x(ie)("actions.edit"),
            item: f,
            run: u
          }, null, 8, ["title", "item"])) : ce("", !0),
          j(d.$slots, "item.actions", {
            value: f,
            dense: !0,
            button: !0
          })
        ]),
        _: 2
      }, [
        De(x(t), (f, V) => ({
          name: V,
          fn: F((y) => [
            j(d.$slots, V, Ae(_e(y)))
          ])
        }))
      ]), 1032, ["items", "items-length", "items-per-page", "loading", "headers", "no-data-text"]);
    };
  }
}), pa = {
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
    const l = ut(), t = e;
    let a = X(!1);
    ee(() => t.state.state, (i) => {
      t.delay && i == Gi.PROCESSING && (a.value = !1, window.setTimeout(() => {
        a.value = !0;
      }, 5e3));
    });
    const n = I(() => {
      var i;
      return ((i = t.state) == null ? void 0 : i.isProcessing) && (!t.delay || a.value);
    }), o = I(() => {
      var i, s;
      return (s = (i = t.state) == null ? void 0 : i.data) == null ? void 0 : s.messages;
    });
    return (i, s) => (L(), be(J, null, [
      t.state.isNone && x(l).none ? (L(), Z(x(Bt), {
        key: 0,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        state: e.state,
        title: e.noneTitle
      }, {
        default: F(() => [
          j(i.$slots, "none", { state: e.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : n.value ? (L(), Z(x(Bt), {
        key: 1,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: e.state,
        title: e.processingTitle
      }, {
        default: F(() => [
          j(i.$slots, "processing", { state: e.state }, () => [
            s[0] || (s[0] = Pe(" Data are being sent to server, please be patient. If this message persist you might wan't to retry. "))
          ])
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isError ? (L(), Z(x(Bt), {
        key: 2,
        type: "error",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: e.state,
        title: e.errorTitle
      }, {
        default: F(() => [
          j(i.$slots, "error", { state: e.state }, () => [
            s[1] || (s[1] = Pe(" Oups... something wrong happened. "))
          ]),
          j(i.$slots, "error-detail", { state: e.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isOk ? (L(), Z(x(Bt), {
        key: 3,
        type: "success",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: e.state,
        title: e.okTitle
      }, {
        default: F(() => [
          j(i.$slots, "ok", { state: e.state }, () => [
            s[2] || (s[2] = P("p", null, "Congrats! Data have been updated.", -1))
          ]),
          o.value ? (L(), be(J, { key: 0 }, [
            h(Dt),
            (L(!0), be(J, null, De(o.value, (r) => (L(), be("p", null, Fe(r), 1))), 256))
          ], 64)) : ce("", !0),
          j(i.$slots, "ok-detail", { state: e.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : ce("", !0),
      j(i.$slots, "default", {
        state: t.state
      })
    ], 64));
  }
}, ju = { class: "text-right" }, bl = {
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
    return (n, o) => (L(), be("div", ju, [
      h(pe, {
        color: "error",
        class: "me-2",
        "prepend-icon": a.resetIcon,
        onClick: o[0] || (o[0] = (i) => t("reset")),
        disabled: a.disabled
      }, {
        default: F(() => [
          j(n.$slots, "discard", {}, () => [
            Pe(Fe(a.resetLabel || x(Va)("actions.discard")), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]),
      a.state.isSending || a.state.isProcessing ? (L(), Z(pe, {
        key: 0,
        color: "primary",
        "prepend-icon": a.processingIcon,
        disabled: ""
      }, {
        default: F(() => [
          j(n.$slots, "processing", {}, () => [
            Pe(Fe(a.processingLabel || x(Va)("actions.saving")), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon"])) : (L(), Z(pe, {
        key: 1,
        color: "primary",
        "prepend-icon": a.validateIcon,
        onClick: o[1] || (o[1] = (i) => t("validate")),
        disabled: a.disabled || a.validateDisabled
      }, {
        default: F(() => [
          j(n.$slots, "validate", {}, () => [
            Pe(Fe(a.validateLabel || x(Va)("actions.save")), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]))
    ]));
  }
}, Gu = { key: 0 }, Yu = { class: "text-right mt-3" }, qu = {
  __name: "OxLogin",
  props: {
    next: { type: String },
    url: { type: String }
  },
  emits: ["save", "saved"],
  setup(e, { emit: l }) {
    const t = en("password"), a = e, n = Xe({
      username: "",
      password: ""
    }), o = X(!1), i = Xe(new Yi());
    function s(c = !0) {
      Xi(n, { username: "", password: "" }), c && i.none();
    }
    async function r() {
      i.processing();
      try {
        const c = await fetch(a.url, {
          method: "POST",
          headers: qi.axiosConfig.headers,
          body: JSON.stringify(n)
        });
        c.status == 200 ? (n.credentials = "", n.password = "", i.ok(await c.json()), a.next && (window.location.href = a.next)) : i.error(await c.json());
      } catch (c) {
        i.ok((c == null ? void 0 : c.message) || c);
      }
    }
    return (c, u) => (L(), be(J, null, [
      h(x(pa), { state: i }, {
        none: F(({ state: d }) => u[7] || (u[7] = [
          P("p", null, "Please enter your credentials in order too proceed...", -1)
        ])),
        "ok-detail": F(({ state: d }) => [
          a.next ? (L(), be("p", Gu, [
            u[8] || (u[8] = Pe("You soon will be redirected to ")),
            P("i", null, Fe(a.next), 1)
          ])) : ce("", !0)
        ]),
        error: F(({ state: d }) => {
          var m, v;
          return [
            h(Ua, {
              errors: (m = d.data) == null ? void 0 : m.username
            }, null, 8, ["errors"]),
            h(Ua, {
              errors: (v = d.data) == null ? void 0 : v.password
            }, null, 8, ["errors"])
          ];
        }),
        _: 1
      }, 8, ["state"]),
      i.isOk ? ce("", !0) : (L(), be(J, { key: 0 }, [
        h(mt, {
          variant: "underlined",
          label: "Enter login",
          modelValue: n.username,
          "onUpdate:modelValue": u[0] || (u[0] = (d) => n.username = d),
          onKeyup: u[1] || (u[1] = xl(Ie((d) => t.value.focus(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue"]),
        h(mt, {
          variant: "underlined",
          ref: "password",
          label: "Enter password",
          modelValue: n.password,
          "onUpdate:modelValue": u[2] || (u[2] = (d) => n.password = d),
          type: o.value ? "text" : "password",
          "append-icon": o.value ? "mdi-eye" : "mdi-eye-off",
          "onClick:append": u[3] || (u[3] = (d) => o.value = !o.value),
          onKeyup: u[4] || (u[4] = xl(Ie((d) => r(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue", "type", "append-icon"]),
        P("div", Yu, [
          j(c.$slots, "default", {
            value: n.password
          }, () => [
            n.username && n.password ? (L(), Z(bl, {
              key: 0,
              "validate-label": "Login!",
              onValidate: u[5] || (u[5] = (d) => r()),
              onReset: u[6] || (u[6] = (d) => s()),
              state: i
            }, null, 8, ["state"])) : ce("", !0)
          ])
        ])
      ], 64))
    ], 64));
  }
}, Qo = /* @__PURE__ */ qe({
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
    const l = ut(), t = e, a = ft(l, "views."), n = X(!1);
    Qe(() => {
      n.value = !0;
    }), vi(() => {
      n.value = !1;
    });
    const o = de("panels"), i = de("panel");
    return (s, r) => (L(), be(J, null, [
      t.state ? (L(), Z(pa, {
        key: 0,
        state: t.state,
        delay: ""
      }, null, 8, ["state"])) : ce("", !0),
      x(l).prepend && x(o).panel == x(i).name ? j(s.$slots, "prepend", { key: 1 }) : ce("", !0),
      h(mn, { class: "ma-4" }, {
        default: F(() => [
          (L(), Z($a, {
            to: "#app-bar-sheet-title",
            disabled: !n.value || x(o).panel != t.name
          }, [
            t.icon ? (L(), Z(xe, {
              key: 0,
              icon: t.icon
            }, null, 8, ["icon"])) : ce("", !0),
            Pe(" " + Fe(t.title) + " ", 1),
            j(s.$slots, "append-title")
          ], 8, ["disabled"])),
          (L(), Z($a, {
            to: "#app-bar-right",
            disabled: !n.value || x(o).panel != t.name
          }, [
            j(s.$slots, "app-bar-right"),
            t.help ? (L(), Z(pe, {
              key: 0,
              class: "ml-3",
              href: t.help,
              panels: "new",
              icon: "mdi-information-outline"
            }, null, 8, ["href"])) : ce("", !0)
          ], 8, ["disabled"])),
          j(s.$slots, "top"),
          j(s.$slots, "default", {}, () => [
            x(a) ? (L(), Z(za, {
              key: 0,
              modelValue: x(i).view,
              "onUpdate:modelValue": r[0] || (r[0] = (c) => x(i).view = c)
            }, {
              default: F(() => [
                (L(!0), be(J, null, De(x(a), (c, u) => (L(), Z(Wa, {
                  key: c,
                  value: c
                }, {
                  default: F(() => [
                    j(s.$slots, u)
                  ]),
                  _: 2
                }, 1032, ["value"]))), 128))
              ]),
              _: 3
            }, 8, ["modelValue"])) : ce("", !0)
          ]),
          j(s.$slots, "bottom")
        ]),
        _: 3
      }),
      x(l).append && x(o).panel == x(i).name ? j(s.$slots, "append", { key: 2 }) : ce("", !0)
    ], 64));
  }
}), Jo = /* @__PURE__ */ qe({
  __name: "OxView",
  props: {
    /** default tab title */
    title: String
  },
  setup(e) {
    const l = e, t = X(null), a = ut(), n = ft(a, "tab.", { exclude: ["tab.default"] }), o = ft(a, "window.");
    return (i, s) => x(n) && Object.keys(x(n)).length ? (L(), be(J, { key: 0 }, [
      h(hr, {
        modelValue: t.value,
        "onUpdate:modelValue": s[0] || (s[0] = (r) => t.value = r)
      }, {
        default: F(() => [
          x(a).default ? j(i.$slots, "tab", { key: 0 }, () => [
            h(Na, {
              text: l == null ? void 0 : l.title,
              value: "default"
            }, null, 8, ["text"])
          ]) : ce("", !0),
          (L(!0), be(J, null, De(x(n), (r, c) => (L(), Z(Na, { value: r }, {
            default: F(() => [
              j(i.$slots, c)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"]),
      h(cl, {
        modelValue: t.value,
        "onUpdate:modelValue": s[1] || (s[1] = (r) => t.value = r)
      }, {
        default: F(() => [
          x(a).default ? (L(), Z(ia, {
            key: 0,
            value: "default"
          }, {
            default: F(() => [
              j(i.$slots, "default")
            ]),
            _: 3
          })) : ce("", !0),
          (L(!0), be(J, null, De(x(o), (r, c) => (L(), Z(ia, { value: r }, {
            default: F(() => [
              j(i.$slots, c)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"])
    ], 64)) : j(i.$slots, "default", { key: 1 });
  }
}), ei = /* @__PURE__ */ qe({
  __name: "OxModelEditor",
  props: {
    repo: {},
    initial: {},
    name: {},
    url: {},
    saved: { type: Function }
  },
  setup(e, { expose: l }) {
    const t = X(null), a = de("user"), n = e, { editor: o, edited: i } = pi({ props: n }), s = I(() => a.can([o.repo.use, "change", n.initial])), r = I(() => ({
      editor: o,
      edited: i.value,
      form: t.value,
      editable: s.value,
      disabled: !s.value,
      value: o.value,
      model: o.repo.use
    }));
    return ee(() => o.errors && Object.values(o.errors), () => t.value.validate()), l({ editor: o, edited: i, form: t, editable: s }), (c, u) => (L(), be(J, null, [
      j(c.$slots, "prepend", Ae(_e(r.value))),
      h(Ka, {
        ref_key: "form",
        ref: t,
        modelValue: x(o).valid,
        "onUpdate:modelValue": u[0] || (u[0] = (d) => x(o).valid = d),
        disabled: !s.value
      }, {
        default: F(() => [
          j(c.$slots, "default", Ae(_e(r.value)))
        ]),
        _: 3
      }, 8, ["modelValue", "disabled"]),
      j(c.$slots, "append", Ae(_e(r.value)))
    ], 64));
  }
}), Xu = {
  key: 0,
  class: "mb-3"
}, Zu = /* @__PURE__ */ qe({
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
    const t = e, a = X(null);
    function n() {
      a.value.editor.reset(t.initial);
    }
    function o() {
      const i = a.value;
      return t.sendFormData ? i.editor.save(new FormData(i.form.$el)) : i.editor.save();
    }
    return l({ modelEditor: a, save: o, reset: n }), (i, s) => {
      var r;
      return L(), be(J, null, [
        (r = a.value) != null && r.editor ? (L(), Z(pa, {
          key: 0,
          state: a.value.editor.state
        }, null, 8, ["state"])) : ce("", !0),
        h(Bi, { class: "ox-model-edit" }, {
          default: F(() => [
            h(x(ei), H({
              ref_key: "modelEditor",
              ref: a
            }, t), {
              prepend: F((c) => [
                t.hideValidationBtn ? ce("", !0) : (L(), be("div", Xu, [
                  j(i.$slots, "prepend", H(c, {
                    save: o,
                    reset: n
                  }), () => [
                    c.editable && c.edited ? (L(), Z(bl, {
                      key: 0,
                      onValidate: s[0] || (s[0] = (u) => o()),
                      onReset: s[1] || (s[1] = (u) => n()),
                      state: c.editor.state,
                      "validate-disabled": c.editor.valid === !1
                    }, null, 8, ["state", "validate-disabled"])) : ce("", !0)
                  ])
                ]))
              ]),
              default: F((c) => [
                j(i.$slots, "default", H(c, {
                  save: o,
                  reset: n
                }))
              ]),
              append: F((c) => [
                j(i.$slots, "append", H(c, {
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
}), Qu = /* @__PURE__ */ qe({
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
    const t = ut(), a = ft(t, "views.list."), n = ft(t, "item."), o = ft(t, "views.detail.edit."), i = en("filters"), s = e, r = de("context"), c = de("user"), { panel: u, list: d, items: m, next: v, prev: f } = de("panel") ?? wi({ props: s }), V = u.panels;
    I(() => {
      var S;
      return r.user.can([u.model, (S = u.value) != null && S.id ? "change" : "add"]);
    });
    const { showFilters: y } = Xa(u), w = I(() => [
      ...s.headers,
      { key: "actions", title: ie("actions") }
    ]);
    function g(S) {
      S != null && S.id ? u.value = u.repo.whereId(S.id).first() : u.value = S, d.load();
    }
    const C = I(() => ({
      panel: u,
      panels: V,
      list: d,
      items: m,
      context: r,
      saved: g,
      value: u.value
    }));
    return ee(() => Object.values(d.filters), () => d.load()), l({ list: d, panel: u, items: m, next: v, prev: f }), (S, p) => (L(), Z(Qo, {
      name: s.name,
      title: x(u).title,
      icon: x(u).icon,
      state: x(d).state,
      index: s.index
    }, xt({
      "app-bar-right": F(() => [
        j(S.$slots, "app-bar-right", Ae(_e(C.value))),
        x(u).view.startsWith("list.") ? (L(), Z(Tl, {
          key: 0,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: F(() => [
            j(S.$slots, "nav.list", Ae(_e(C.value))),
            h(pe, {
              title: x(ie)("actions.list.reload"),
              "aria-label": x(ie)("actions.list.reload"),
              onClick: p[0] || (p[0] = (k) => x(d).load())
            }, {
              default: F(() => [
                h(xe, null, {
                  default: F(() => p[10] || (p[10] = [
                    Pe("mdi-reload")
                  ])),
                  _: 1,
                  __: [10]
                })
              ]),
              _: 1
            }, 8, ["title", "aria-label"]),
            i.value ? (L(), Z(pe, {
              key: 0,
              title: x(y) ? x(ie)("filters.hide") : x(ie)("filters.show"),
              "aria-label": x(y) ? x(ie)("filters.hide") : x(ie)("filters.show"),
              onClick: p[1] || (p[1] = (k) => y.value = !x(y)),
              active: x(y)
            }, {
              default: F(() => [
                h(xe, {
                  icon: i.value.icon
                }, null, 8, ["icon"])
              ]),
              _: 1
            }, 8, ["title", "aria-label", "active"])) : ce("", !0)
          ]),
          _: 3
        })) : x(u).view.startsWith("detail.") && x(u).value ? (L(), Z(Tl, {
          key: 1,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: F(() => [
            j(S.$slots, "nav.detail", Ae(_e(C.value))),
            x(u).view == "detail.edit" && x(u).value ? (L(), Z(ml, { key: 0 }, {
              activator: F(({ props: k }) => [
                h(pe, H({ "prepend-icon": "mdi-dots-vertical" }, k), {
                  default: F(() => [
                    Pe(Fe(x(ie)("actions")), 1)
                  ]),
                  _: 2
                }, 1040)
              ]),
              default: F(() => [
                h(rt, null, {
                  default: F(() => [
                    j(S.$slots, "item.actions", {
                      value: x(u).value
                    })
                  ]),
                  _: 3
                })
              ]),
              _: 3
            })) : ce("", !0),
            h(pe, {
              disabled: !x(f),
              title: x(ie)("prev"),
              "aria-label": x(ie)("prev"),
              onClick: p[2] || (p[2] = Ie((k) => x(u).show({ view: x(u).view, value: x(f) }), ["stop"]))
            }, {
              default: F(() => [
                h(xe, { icon: "mdi-chevron-left" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"]),
            h(pe, {
              disabled: !x(v),
              title: x(ie)("next"),
              "aria-label": x(ie)("next"),
              onClick: p[3] || (p[3] = Ie((k) => x(u).show({ view: x(u).view, value: x(v) }), ["stop"]))
            }, {
              default: F(() => [
                h(xe, { icon: "mdi-chevron-right" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"])
          ]),
          _: 3
        })) : ce("", !0),
        h(Ei, {
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal",
          mandatory: "",
          modelValue: x(u).view,
          "onUpdate:modelValue": p[9] || (p[9] = (k) => x(u).view = k)
        }, {
          default: F(() => {
            var k;
            return [
              h(pe, {
                value: "list.table",
                onClickCapture: p[4] || (p[4] = Ie((T) => x(u).show({ view: "list.table" }), ["stop"])),
                title: x(ie)("panels.nav.table"),
                "aria-label": x(ie)("panels.nav.table")
              }, {
                default: F(() => [
                  h(xe, null, {
                    default: F(() => p[11] || (p[11] = [
                      Pe("mdi-table")
                    ])),
                    _: 1,
                    __: [11]
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"]),
              x(t)["views.list.cards"] ? (L(), Z(pe, {
                key: 0,
                value: "list.cards",
                onClickCapture: p[5] || (p[5] = Ie((T) => x(u).show({ view: "list.cards" }), ["stop"])),
                title: x(ie)("panels.nav.cards"),
                "aria-label": x(ie)("panels.nav.cards")
              }, {
                default: F(() => [
                  h(xe, null, {
                    default: F(() => p[12] || (p[12] = [
                      Pe("mdi-card-account-details")
                    ])),
                    _: 1,
                    __: [12]
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : ce("", !0),
              x(t)["views.list.kanban"] ? (L(), Z(pe, {
                key: 1,
                value: "list.kanban",
                onClickCapture: p[6] || (p[6] = Ie((T) => x(u).show({ view: "list.kanban" }), ["stop"])),
                title: x(ie)("panels.nav.kanban"),
                "aria-label": x(ie)("panels.nav.kanban")
              }, {
                default: F(() => [
                  h(xe, null, {
                    default: F(() => p[13] || (p[13] = [
                      Pe("mdi-view-column")
                    ])),
                    _: 1,
                    __: [13]
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : ce("", !0),
              x(t)["views.detail.edit"] || x(o) ? (L(), Z(pe, {
                key: 2,
                value: "detail.edit",
                onClickCapture: p[7] || (p[7] = Ie((T) => x(u).show({ view: "detail.edit", value: x(u).value }), ["stop"])),
                disabled: !((k = x(u).value) != null && k.id) && x(u).view != "detail.edit",
                title: x(ie)("panels.nav.edit"),
                "aria-label": x(ie)("panels.nav.edit")
              }, {
                default: F(() => [
                  x(c).can([x(u).model, "change"]) ? (L(), Z(xe, { key: 0 }, {
                    default: F(() => p[14] || (p[14] = [
                      Pe("mdi-pencil")
                    ])),
                    _: 1,
                    __: [14]
                  })) : (L(), Z(xe, { key: 1 }, {
                    default: F(() => p[15] || (p[15] = [
                      Pe("mdi-eye")
                    ])),
                    _: 1,
                    __: [15]
                  }))
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"])) : ce("", !0),
              x(o) && x(c).can([x(u).model, "add"]) ? (L(), Z(pe, {
                key: 3,
                value: "detail.add",
                onClickCapture: p[8] || (p[8] = Ie((T) => x(u).create(), ["stop"])),
                title: x(ie)("panels.nav.add"),
                "aria-label": x(ie)("panels.nav.add")
              }, {
                default: F(() => [
                  h(xe, null, {
                    default: F(() => p[16] || (p[16] = [
                      Pe("mdi-plus-box")
                    ])),
                    _: 1,
                    __: [16]
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : ce("", !0),
              j(S.$slots, "nav.views", Ae(_e(C.value)))
            ];
          }),
          _: 3
        }, 8, ["modelValue"]),
        j(S.$slots, "app-bar-end", Ae(_e(C.value)))
      ]),
      top: F(() => [
        s.warning ? (L(), Z(Bt, {
          key: 0,
          type: "warning",
          variant: "tonal",
          text: s.warning
        }, null, 8, ["text"])) : ce("", !0),
        j(S.$slots, "top"),
        Ze(h(yo, {
          ref_key: "filters",
          ref: i,
          search: s.search,
          "teleport-to": "#panel-list-actions"
        }, {
          default: F((k) => [
            j(S.$slots, "list.filters", Ae(_e(k)))
          ]),
          _: 3
        }, 8, ["search"]), [
          [It, x(u).view.startsWith("list.") && x(y)]
        ])
      ]),
      _: 2
    }, [
      x(t)["append-title"] ? {
        name: "append-title",
        fn: F(() => [
          j(S.$slots, "append-title", Ae(_e(C.value)))
        ]),
        key: "0"
      } : void 0,
      x(t).prepend ? {
        name: "prepend",
        fn: F(() => [
          j(S.$slots, "prepend", Ae(_e(C.value)))
        ]),
        key: "1"
      } : void 0,
      x(t).append ? {
        name: "append",
        fn: F(() => [
          j(S.$slots, "append", Ae(_e(C.value)))
        ]),
        key: "2"
      } : void 0,
      x(t)["views.list.table"] ? void 0 : {
        name: "views.list.table",
        fn: F(() => [
          h(Zo, { headers: w.value }, xt({ _: 2 }, [
            De(x(n), (k, T) => ({
              name: T,
              fn: F((b) => [
                j(S.$slots, T, Ae(_e(b)))
              ])
            }))
          ]), 1032, ["headers"])
        ]),
        key: "3"
      },
      De(x(a), (k, T) => ({
        name: T,
        fn: F(() => [
          j(S.$slots, T, Ae(_e(C.value)))
        ])
      })),
      x(t)["views.detail.edit"] || x(o) ? {
        name: "views.detail.edit",
        fn: F(() => [
          h(x(Jo), {
            title: x(ie)(`models.${x(u).model.entity}`)
          }, xt({ _: 2 }, [
            De(x(o), (k, T) => ({
              name: k,
              fn: F(() => [
                j(S.$slots, T, Ae(_e(C.value)))
              ])
            }))
          ]), 1032, ["title"])
        ]),
        key: "4"
      } : void 0
    ]), 1032, ["name", "title", "icon", "state", "index"]));
  }
}), Ju = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OxAction: la,
  OxActionModelDelete: us,
  OxActions: cs,
  OxApp: pr,
  OxAutocomplete: tu,
  OxComponent: au,
  OxFieldDetails: Ua,
  OxFormList: iu,
  OxListFilters: yo,
  OxListKanban: hu,
  OxListTable: Zo,
  OxLogin: qu,
  OxModelEdit: Zu,
  OxModelEditor: ei,
  OxModelPanel: Qu,
  OxPanel: Qo,
  OxStateAlert: pa,
  OxValidationBtn: bl,
  OxView: Jo
}, Symbol.toStringTag, { value: "Module" })), sc = {
  el: "#app",
  delimiters: ["[[", "]]"],
  components: { ...Ju, ...Zi }
};
export {
  sc as App,
  la as OxAction,
  us as OxActionModelDelete,
  cs as OxActions,
  pr as OxApp,
  tu as OxAutocomplete,
  au as OxComponent,
  Ua as OxFieldDetails,
  iu as OxFormList,
  yo as OxListFilters,
  hu as OxListKanban,
  Zo as OxListTable,
  qu as OxLogin,
  Zu as OxModelEdit,
  ei as OxModelEditor,
  Qu as OxModelPanel,
  Qo as OxPanel,
  pa as OxStateAlert,
  bl as OxValidationBtn,
  Jo as OxView
};
//# sourceMappingURL=components.js.map
