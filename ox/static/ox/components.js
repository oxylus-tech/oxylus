import { defineComponent as ae, inject as M, createElementBlock as P, createCommentVNode as x, unref as e, openBlock as p, Fragment as T, createBlock as g, withModifiers as J, useSlots as ce, renderSlot as b, normalizeProps as G, guardReactiveProps as W, ref as Y, computed as _, resolveComponent as Ct, createVNode as v, withCtx as d, createTextVNode as U, toDisplayString as le, renderList as X, mergeProps as q, mergeModels as Me, useModel as Re, shallowRef as re, watch as Z, onMounted as $e, onScopeDispose as Ot, nextTick as Ie, watchEffect as Pt, reactive as Fe, onErrorCaptured as At, createElementVNode as de, createSlots as fe, useAttrs as Tt, toRaw as Ae, h as It, normalizeClass as Ft, useTemplateRef as lt, withKeys as We, onUnmounted as Lt, Teleport as qe, toRefs as Dt, withDirectives as _t, vShow as Bt } from "vue";
import { useAction as Mt, t as V, filterSlots as pe, useAppContext as Rt, usePanels as Ut, excludeValues as Et, useModelList as Nt, query as Kt, defineAsyncComponent as jt, tKeys as zt, useModelEditor as Gt, useModelPanel as Wt } from "ox";
import { V as N, a as se, b as qt, c as Le, d as Ue, e as Yt, f as me, u as Ht, g as Jt, h as Qt, i as Xt, j as Zt, k as Ee, l as Ne, m as el, n as tl, o as ll, p as al, q as nl, r as sl, s as Ye, t as ol, v as il, w as at, x as rl, y as ul, z as He, A as nt, B as dl, C as cl, D as st, E as De, F as vl, G as pl, H as ml, I as fl, J as yl, K as ke, L as te, M as ot, N as bl, O as gl, P as kl, Q as wl, R as Vl, S as hl, T as $l, U as Sl, W as xl, X as Cl, Y as Ol, Z as Pl, _ as Al, $ as Tl, a0 as Il, a1 as Fl, a2 as Ll, a3 as it, a4 as Dl, a5 as _l, a6 as Bl, a7 as Ml, a8 as Rl, a9 as ge, aa as Ul, ab as El, ac as Nl, ad as Je, ae as Kl, af as Qe, ag as jl } from "./VContainer-DjsfP5l2.js";
import { l as Se, n as Ke, u as Ve, o as zl, q as Gl, r as Wl, s as rt, t as ql, v as Yl, w as Hl, j as Jl, x as Ql, y as Xl, z as Xe, A as Ze, B as Zl } from "./theme-BrdPdMMA.js";
import { p as et, N as ea, E as ta, t as Te, S as la, m as aa, r as na } from "./lodash-CYqq84l7.js";
import "axios";
import { components as sa } from "ox/vendor";
const he = /* @__PURE__ */ ae({
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
  setup(t, { emit: m }) {
    const l = t, o = m, n = M("user"), { run: s, processing: r, allowed: c } = Mt({ user: n, emits: o, props: l });
    return (u, a) => e(c) ? (p(), P(T, { key: 0 }, [
      l.button ? (p(), g(N, {
        key: 0,
        variant: "text",
        disabled: e(r),
        color: l.color,
        icon: l.icon,
        title: l.title,
        "aria-label": l.title,
        onClick: J(e(s), ["stop"])
      }, null, 8, ["disabled", "color", "icon", "title", "aria-label", "onClick"])) : (p(), g(se, {
        key: 1,
        title: l.title,
        "base-color": l.color,
        "prepend-icon": l.icon,
        disabled: e(r),
        onClick: J(e(s), ["stop"])
      }, null, 8, ["title", "base-color", "prepend-icon", "disabled", "onClick"]))
    ], 64)) : x("", !0);
  }
}), oa = /* @__PURE__ */ ae({
  __name: "OxActionModelDelete",
  props: {
    item: {},
    button: { type: Boolean }
  },
  setup(t) {
    const m = M("panel"), l = M("repos"), o = t;
    async function n(s, r) {
      return await l[r.constructor.entity].api().delete(r.$url(), { delete: o.item.id });
    }
    return (s, r) => (p(), g(he, {
      item: o.item,
      button: o.button,
      icon: "mdi-delete",
      color: "error",
      title: e(V)("actions.delete"),
      confirm: e(V)("actions.delete.confirm"),
      permission: [o.item.constructor, "delete"],
      run: n,
      onCompleted: r[0] || (r[0] = (c) => {
        var u;
        return (u = e(m)) == null ? void 0 : u.show({ view: e(m).index });
      })
    }, null, 8, ["item", "button", "title", "confirm", "permission"]));
  }
}), ia = {
  __name: "OxActions",
  props: {
    // Action's Props
    value: Object,
    dense: { type: Boolean, default: !1 },
    button: { type: Boolean, default: !1 },
    exclude: { type: Array }
  },
  setup(t) {
    ce();
    const m = t;
    return (l, o) => (p(), P(T, null, [
      b(l.$slots, "before", G(W(m))),
      b(l.$slots, "default", G(W(m))),
      b(l.$slots, "after", G(W(m)))
    ], 64));
  }
}, ra = /* @__PURE__ */ ae({
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
  setup(t) {
    const m = t;
    Y(null);
    const l = M("user"), o = M("panels");
    _(() => !m.auto || panel.name == m.name);
    function n(r) {
      return r.permissions && !l.can(r.permissions) ? !1 : r.items ? r.items.some((c) => n(c)) : !0;
    }
    function s() {
      const r = { panel: m.name, href: m.url };
      o.show(r);
    }
    return (r, c) => {
      const u = Ct("ox-app-nav-item", !0);
      return n(m) ? (p(), P(T, { key: 0 }, [
        m.type == "subheader" ? (p(), P(T, { key: 0 }, [
          v(qt, null, {
            default: d(() => [
              U(le(m.title), 1)
            ]),
            _: 1
          }),
          m.items ? (p(!0), P(T, { key: 0 }, X(m.items, (a) => (p(), g(u, q({ ref_for: !0 }, a), null, 16))), 256)) : x("", !0)
        ], 64)) : m.type == "group" ? (p(), g(Le, {
          key: 1,
          value: m.name
        }, {
          activator: d(({ props: a }) => [
            v(se, q(a, {
              title: m.title,
              "prepend-icon": m.icon
            }), null, 16, ["title", "prepend-icon"])
          ]),
          default: d(() => [
            (p(!0), P(T, null, X(m.items, (a, i) => (p(), g(u, q({
              key: i,
              ref_for: !0
            }, a), null, 16))), 128))
          ]),
          _: 1
        }, 8, ["value"])) : m.type == "divider" ? (p(), g(Ue, { key: 2 })) : (p(), g(se, {
          key: 3,
          active: e(o).panel == m.name,
          value: m.name,
          "prepend-icon": m.icon,
          title: m.title,
          onClick: J(s, ["stop"])
        }, null, 8, ["active", "value", "prepend-icon", "title"]))
      ], 64)) : x("", !0);
    };
  }
}), ua = {
  __name: "OxAppNav",
  props: /* @__PURE__ */ Me({
    items: Array
  }, {
    drawer: {},
    drawerModifiers: {}
  }),
  emits: ["update:drawer"],
  setup(t) {
    M("context");
    const m = M("panels"), l = Re(t, "drawer"), o = Y([]), n = t, s = _(() => (r(n.items), n.items));
    function r(u) {
      o.value = c(u);
    }
    function c(u) {
      if (m.panel) {
        for (const a of u)
          if (a.items) {
            const i = c(a.items);
            if (i)
              return [i, a.name];
          } else if (a.name == m.panel)
            return [a.name];
      }
    }
    return (u, a) => (p(), g(Yt, {
      modelValue: l.value,
      "onUpdate:modelValue": a[1] || (a[1] = (i) => l.value = i),
      theme: "dark"
    }, {
      append: d(() => [
        v(me, null, {
          default: d(() => [
            b(u.$slots, "append")
          ]),
          _: 3
        })
      ]),
      default: d(() => [
        b(u.$slots, "prepend"),
        v(me, {
          opened: o.value,
          "onUpdate:opened": a[0] || (a[0] = (i) => o.value = i),
          density: "compact"
        }, {
          default: d(() => [
            (p(!0), P(T, null, X(s.value, (i, y) => (p(), g(e(ra), q({
              key: y,
              ref_for: !0
            }, i), null, 16))), 128))
          ]),
          _: 1
        }, 8, ["opened"])
      ]),
      _: 3
    }, 8, ["modelValue"]));
  }
};
function da(t) {
  const m = re(t());
  let l = -1;
  function o() {
    clearInterval(l);
  }
  function n() {
    o(), Ie(() => m.value = t());
  }
  function s(r) {
    const c = r ? getComputedStyle(r) : {
      transitionDuration: 0.2
    }, u = parseFloat(c.transitionDuration) * 1e3 || 200;
    if (o(), m.value <= 0) return;
    const a = performance.now();
    l = window.setInterval(() => {
      const i = performance.now() - a + u;
      m.value = Math.max(t() - i, 0), m.value <= 0 && o();
    }, u);
  }
  return Ot(o), {
    clear: o,
    time: m,
    start: s,
    reset: n
  };
}
const ca = Ke({
  multiLine: Boolean,
  text: String,
  timer: [Boolean, String],
  timeout: {
    type: [Number, String],
    default: 5e3
  },
  vertical: Boolean,
  ...al({
    location: "bottom"
  }),
  ...ll(),
  ...tl(),
  ...el(),
  ...ql(),
  ...rt(nl({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
}, "VSnackbar"), va = Se()({
  name: "VSnackbar",
  props: ca(),
  emits: {
    "update:modelValue": (t) => !0
  },
  setup(t, m) {
    let {
      slots: l
    } = m;
    const o = Ve(t, "modelValue"), {
      positionClasses: n
    } = Ht(t), {
      scopeId: s
    } = Jt(), {
      themeClasses: r
    } = zl(t), {
      colorClasses: c,
      colorStyles: u,
      variantClasses: a
    } = Qt(t), {
      roundedClasses: i
    } = Xt(t), y = da(() => Number(t.timeout)), h = Y(), $ = Y(), I = re(!1), K = re(0), L = Y(), O = M(Zt, void 0);
    Gl(() => !!O, () => {
      const j = sl();
      Pt(() => {
        L.value = j.mainStyles.value;
      });
    }), Z(o, k), Z(() => t.timeout, k), $e(() => {
      o.value && k();
    });
    let S = -1;
    function k() {
      y.reset(), window.clearTimeout(S);
      const j = Number(t.timeout);
      if (!o.value || j === -1) return;
      const ie = Wl($.value);
      y.start(ie), S = window.setTimeout(() => {
        o.value = !1;
      }, j);
    }
    function w() {
      y.reset(), window.clearTimeout(S);
    }
    function D() {
      I.value = !0, w();
    }
    function F() {
      I.value = !1, k();
    }
    function ue(j) {
      K.value = j.touches[0].clientY;
    }
    function oe(j) {
      Math.abs(K.value - j.changedTouches[0].clientY) > 50 && (o.value = !1);
    }
    function Ce() {
      I.value && F();
    }
    const ye = _(() => t.location.split(" ").reduce((j, ie) => (j[`v-snackbar--${ie}`] = !0, j), {}));
    return Ee(() => {
      const j = Ye.filterProps(t), ie = !!(l.default || l.text || t.text);
      return v(Ye, q({
        ref: h,
        class: ["v-snackbar", {
          "v-snackbar--active": o.value,
          "v-snackbar--multi-line": t.multiLine && !t.vertical,
          "v-snackbar--timer": !!t.timer,
          "v-snackbar--vertical": t.vertical
        }, ye.value, n.value, t.class],
        style: [L.value, t.style]
      }, j, {
        modelValue: o.value,
        "onUpdate:modelValue": (B) => o.value = B,
        contentProps: q({
          class: ["v-snackbar__wrapper", r.value, c.value, i.value, a.value],
          style: [u.value],
          onPointerenter: D,
          onPointerleave: F
        }, j.contentProps),
        persistent: !0,
        noClickAnimation: !0,
        scrim: !1,
        scrollStrategy: "none",
        _disableGlobalStack: !0,
        onTouchstartPassive: ue,
        onTouchend: oe,
        onAfterLeave: Ce
      }, s), {
        default: () => {
          var B, be;
          return [ol(!1, "v-snackbar"), t.timer && !I.value && v("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [v(il, {
            ref: $,
            color: typeof t.timer == "string" ? t.timer : "info",
            max: t.timeout,
            "model-value": y.time.value
          }, null)]), ie && v("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((B = l.text) == null ? void 0 : B.call(l)) ?? t.text, (be = l.default) == null ? void 0 : be.call(l)]), l.actions && v(at, {
            defaults: {
              VBtn: {
                variant: "text",
                ripple: !1,
                slim: !0
              }
            }
          }, {
            default: () => [v("div", {
              class: "v-snackbar__actions"
            }, [l.actions({
              isActive: o
            })])]
          })];
        },
        activator: l.activator
      });
    }), Ne({}, h);
  }
}), pa = { class: "nav-home" };
var tt;
const ma = /* @__PURE__ */ ae({
  __name: "OxApp",
  props: {
    apiUrl: {},
    logo: {},
    dataEl: { default: (tt = document.body.dataset) == null ? void 0 : tt.appData },
    models: {},
    data: {}
  },
  setup(t) {
    const m = ce(), l = pe(m, "panels."), o = t, n = Fe({ drawer: !0 }), s = Rt(o), r = Ut();
    return $e(() => {
      r.panel = s.data.panel;
    }), Z(() => [s.state.state, s.state.data], () => {
      s.showState = !0;
    }), At((c, u, a) => {
      s.state.error(`${c}`);
    }), (c, u) => (p(), g(rl, null, {
      default: d(() => [
        v(va, {
          modelValue: e(s).showState,
          "onUpdate:modelValue": u[0] || (u[0] = (a) => e(s).showState = a),
          color: e(s).state.color,
          "multi-line": ""
        }, {
          default: d(() => [
            U(le(e(s).state.data), 1)
          ]),
          _: 1
        }, 8, ["modelValue", "color"]),
        v(ul, { color: "primary" }, {
          prepend: d(() => [
            v(nt, {
              icon: "mdi-apps",
              title: e(V)("nav.panels"),
              "aria-label": e(V)("nav.panels"),
              onClick: u[1] || (u[1] = J((a) => n.drawer = !n.drawer, ["stop"]))
            }, null, 8, ["title", "aria-label"])
          ]),
          default: d(() => [
            v(He, { id: "app-bar-sheet-title" }),
            v(He, { id: "app-bar-title" }, {
              default: d(() => [
                b(c.$slots, "title", { context: e(s) })
              ]),
              _: 3
            }),
            b(c.$slots, "app-bar-left", { context: e(s) }),
            u[5] || (u[5] = de("div", {
              id: "app-bar-right",
              class: "mr-3"
            }, null, -1)),
            b(c.$slots, "app-bar-right", { context: e(s) })
          ]),
          _: 3
        }),
        v(e(ua), {
          drawer: n.drawer,
          "onUpdate:drawer": u[3] || (u[3] = (a) => n.drawer = a),
          items: e(s).data.nav
        }, fe({
          prepend: d(() => [
            de("a", pa, [
              c.logo ? (p(), g(dl, {
                key: 0,
                src: c.logo,
                class: "logo"
              }, null, 8, ["src"])) : x("", !0)
            ]),
            b(c.$slots, "nav-start", { context: e(s) })
          ]),
          _: 2
        }, [
          e(m)["nav-end"] ? {
            name: "append",
            fn: d(() => [
              v(me, {
                opened: n.opened,
                "onUpdate:opened": u[2] || (u[2] = (a) => n.opened = a)
              }, {
                default: d(() => [
                  b(c.$slots, "nav-end", { context: e(s) })
                ]),
                _: 3
              }, 8, ["opened"])
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["drawer", "items"]),
        v(cl, null, {
          default: d(() => [
            b(c.$slots, "main", {}, () => [
              v(st, {
                modelValue: e(r).panel,
                "onUpdate:modelValue": u[4] || (u[4] = (a) => e(r).panel = a)
              }, {
                default: d((a) => [
                  b(c.$slots, "default", q(a, { context: e(s) })),
                  (p(!0), P(T, null, X(e(l), (i, y) => (p(), g(De, {
                    key: y,
                    value: i
                  }, {
                    default: d(() => [
                      b(c.$slots, y, q({ ref_for: !0 }, a, { context: e(s) }))
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
}), fa = Ke({
  autoSelectFirst: {
    type: [Boolean, String]
  },
  clearOnSelect: Boolean,
  search: String,
  ...Sl({
    filterKeys: ["title"]
  }),
  ...$l(),
  ...rt(xl({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...hl({
    transition: !1
  })
}, "VAutocomplete"), ya = Se()({
  name: "VAutocomplete",
  props: fa(),
  emits: {
    "update:focused": (t) => !0,
    "update:search": (t) => !0,
    "update:modelValue": (t) => !0,
    "update:menu": (t) => !0
  },
  setup(t, m) {
    let {
      slots: l
    } = m;
    const {
      t: o
    } = Yl(), n = Y(), s = re(!1), r = re(!0), c = re(!1), u = Y(), a = Y(), i = re(-1), {
      items: y,
      transformIn: h,
      transformOut: $
    } = vl(t), {
      textColorClasses: I,
      textColorStyles: K
    } = pl(() => {
      var f;
      return (f = n.value) == null ? void 0 : f.color;
    }), L = Ve(t, "search", ""), O = Ve(t, "modelValue", [], (f) => h(f === null ? [null] : Hl(f)), (f) => {
      const C = $(f);
      return t.multiple ? C : C[0] ?? null;
    }), S = _(() => typeof t.counterValue == "function" ? t.counterValue(O.value) : typeof t.counterValue == "number" ? t.counterValue : O.value.length), k = ml(t), {
      filteredItems: w,
      getMatches: D
    } = fl(t, y, () => r.value ? "" : L.value), F = _(() => t.hideSelected ? w.value.filter((f) => !O.value.some((C) => C.value === f.value)) : w.value), ue = _(() => !!(t.chips || l.chip)), oe = _(() => ue.value || !!l.selection), Ce = _(() => O.value.map((f) => f.props.value)), ye = _(() => {
      var C;
      return (t.autoSelectFirst === !0 || t.autoSelectFirst === "exact" && L.value === ((C = F.value[0]) == null ? void 0 : C.title)) && F.value.length > 0 && !r.value && !c.value;
    }), j = _(() => t.hideNoData && !F.value.length || k.isReadonly.value || k.isDisabled.value), ie = Ve(t, "menu"), B = _({
      get: () => ie.value,
      set: (f) => {
        var C;
        ie.value && !f && ((C = u.value) != null && C.ΨopenChildren.size) || f && j.value || (ie.value = f);
      }
    }), be = _(() => B.value ? t.closeText : t.openText), Oe = Y(), pt = yl(Oe, n);
    function mt(f) {
      t.openOnClear && (B.value = !0), L.value = "";
    }
    function ft() {
      j.value || (B.value = !0);
    }
    function yt(f) {
      j.value || (s.value && (f.preventDefault(), f.stopPropagation()), B.value = !B.value);
    }
    function bt(f) {
      var C;
      f.key !== " " && Xe(f) && ((C = n.value) == null || C.focus());
    }
    function gt(f) {
      var A, z, ee, ne, R;
      if (k.isReadonly.value) return;
      const C = (A = n.value) == null ? void 0 : A.selectionStart, E = O.value.length;
      if (["Enter", "ArrowDown", "ArrowUp"].includes(f.key) && f.preventDefault(), ["Enter", "ArrowDown"].includes(f.key) && (B.value = !0), ["Escape"].includes(f.key) && (B.value = !1), ye.value && ["Enter", "Tab"].includes(f.key) && !O.value.some((Q) => {
        let {
          value: H
        } = Q;
        return H === F.value[0].value;
      }) && ve(F.value[0]), f.key === "ArrowDown" && ye.value && ((z = Oe.value) == null || z.focus("next")), ["Backspace", "Delete"].includes(f.key)) {
        if (!t.multiple && oe.value && O.value.length > 0 && !L.value) return ve(O.value[0], !1);
        if (~i.value) {
          f.preventDefault();
          const Q = i.value;
          ve(O.value[i.value], !1), i.value = Q >= E - 1 ? E - 2 : Q;
        } else f.key === "Backspace" && !L.value && (i.value = E - 1);
        return;
      }
      if (t.multiple)
        if (f.key === "ArrowLeft") {
          if (i.value < 0 && C && C > 0) return;
          const Q = i.value > -1 ? i.value - 1 : E - 1;
          if (O.value[Q])
            i.value = Q;
          else {
            const H = ((ee = L.value) == null ? void 0 : ee.length) ?? null;
            i.value = -1, (ne = n.value) == null || ne.setSelectionRange(H, H);
          }
        } else if (f.key === "ArrowRight") {
          if (i.value < 0) return;
          const Q = i.value + 1;
          O.value[Q] ? i.value = Q : (i.value = -1, (R = n.value) == null || R.setSelectionRange(0, 0));
        } else ~i.value && Xe(f) && (i.value = -1);
    }
    function kt(f) {
      if (Ze(n.value, ":autofill") || Ze(n.value, ":-webkit-autofill")) {
        const C = y.value.find((E) => E.title === f.target.value);
        C && ve(C);
      }
    }
    function wt() {
      var f;
      t.eager && ((f = a.value) == null || f.calculateVisibleItems());
    }
    function Vt() {
      var f;
      s.value && (r.value = !0, (f = n.value) == null || f.focus());
    }
    function ht(f) {
      s.value = !0, setTimeout(() => {
        c.value = !0;
      });
    }
    function $t(f) {
      c.value = !1;
    }
    function St(f) {
      (f == null || f === "" && !t.multiple && !oe.value) && (O.value = []);
    }
    const Pe = re(!1);
    function ve(f) {
      let C = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!(!f || f.props.disabled))
        if (t.multiple) {
          const E = O.value.findIndex((z) => (t.valueComparator || Zl)(z.value, f.value)), A = C ?? !~E;
          if (~E) {
            const z = A ? [...O.value, f] : [...O.value];
            z.splice(E, 1), O.value = z;
          } else A && (O.value = [...O.value, f]);
          t.clearOnSelect && (L.value = "");
        } else {
          const E = C !== !1;
          O.value = E ? [f] : [], L.value = E && !oe.value ? f.title : "", Ie(() => {
            B.value = !1, r.value = !0;
          });
        }
    }
    return Z(s, (f, C) => {
      var E;
      f !== C && (f ? (Pe.value = !0, L.value = t.multiple || oe.value ? "" : String(((E = O.value.at(-1)) == null ? void 0 : E.props.title) ?? ""), r.value = !0, Ie(() => Pe.value = !1)) : (!t.multiple && L.value == null && (O.value = []), B.value = !1, (t.multiple || oe.value) && (L.value = ""), i.value = -1));
    }), Z(L, (f) => {
      !s.value || Pe.value || (f && (B.value = !0), r.value = !f);
    }), Z(B, () => {
      if (!t.hideSelected && B.value && O.value.length) {
        const f = F.value.findIndex((C) => O.value.some((E) => C.value === E.value));
        Jl && window.requestAnimationFrame(() => {
          var C;
          f >= 0 && ((C = a.value) == null || C.scrollToIndex(f));
        });
      }
    }), Z(() => t.items, (f, C) => {
      B.value || s.value && !C.length && f.length && (B.value = !0);
    }), Z(O, (f) => {
      var C;
      !t.multiple && !oe.value && (L.value = ((C = f[0]) == null ? void 0 : C.title) ?? "");
    }), Ee(() => {
      const f = !!(!t.hideNoData || F.value.length || l["prepend-item"] || l["append-item"] || l["no-data"]), C = O.value.length > 0, E = ke.filterProps(t);
      return v(ke, q({
        ref: n
      }, E, {
        modelValue: L.value,
        "onUpdate:modelValue": [(A) => L.value = A, St],
        focused: s.value,
        "onUpdate:focused": (A) => s.value = A,
        validationValue: O.externalValue,
        counterValue: S.value,
        dirty: C,
        onChange: kt,
        class: ["v-autocomplete", `v-autocomplete--${t.multiple ? "multiple" : "single"}`, {
          "v-autocomplete--active-menu": B.value,
          "v-autocomplete--chips": !!t.chips,
          "v-autocomplete--selection-slot": !!oe.value,
          "v-autocomplete--selecting-index": i.value > -1
        }, t.class],
        style: t.style,
        readonly: k.isReadonly.value,
        placeholder: C ? void 0 : t.placeholder,
        "onClick:clear": mt,
        "onMousedown:control": ft,
        onKeydown: gt
      }), {
        ...l,
        default: () => v(T, null, [v(ot, q({
          ref: u,
          modelValue: B.value,
          "onUpdate:modelValue": (A) => B.value = A,
          activator: "parent",
          contentClass: "v-autocomplete__content",
          disabled: j.value,
          eager: t.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: t.transition,
          onAfterEnter: wt,
          onAfterLeave: Vt
        }, t.menuProps), {
          default: () => [f && v(me, q({
            ref: Oe,
            selected: Ce.value,
            selectStrategy: t.multiple ? "independent" : "single-independent",
            onMousedown: (A) => A.preventDefault(),
            onKeydown: bt,
            onFocusin: ht,
            onFocusout: $t,
            tabindex: "-1",
            "aria-live": "polite",
            color: t.itemColor ?? t.color
          }, pt, t.listProps), {
            default: () => {
              var A, z, ee;
              return [(A = l["prepend-item"]) == null ? void 0 : A.call(l), !F.value.length && !t.hideNoData && (((z = l["no-data"]) == null ? void 0 : z.call(l)) ?? v(se, {
                key: "no-data",
                title: o(t.noDataText)
              }, null)), v(bl, {
                ref: a,
                renderless: !0,
                items: F.value,
                itemKey: "value"
              }, {
                default: (ne) => {
                  var Ge;
                  let {
                    item: R,
                    index: Q,
                    itemRef: H
                  } = ne;
                  const ze = q(R.props, {
                    ref: H,
                    key: R.value,
                    active: ye.value && Q === 0 ? !0 : void 0,
                    onClick: () => ve(R, null)
                  });
                  return ((Ge = l.item) == null ? void 0 : Ge.call(l, {
                    item: R,
                    index: Q,
                    props: ze
                  })) ?? v(se, q(ze, {
                    role: "option"
                  }), {
                    prepend: (we) => {
                      let {
                        isSelected: xt
                      } = we;
                      return v(T, null, [t.multiple && !t.hideSelected ? v(kl, {
                        key: R.value,
                        modelValue: xt,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, R.props.prependAvatar && v(wl, {
                        image: R.props.prependAvatar
                      }, null), R.props.prependIcon && v(te, {
                        icon: R.props.prependIcon
                      }, null)]);
                    },
                    title: () => {
                      var we;
                      return r.value ? R.title : gl("v-autocomplete", R.title, (we = D(R)) == null ? void 0 : we.title);
                    }
                  });
                }
              }), (ee = l["append-item"]) == null ? void 0 : ee.call(l)];
            }
          })]
        }), O.value.map((A, z) => {
          function ee(H) {
            H.stopPropagation(), H.preventDefault(), ve(A, !1);
          }
          const ne = {
            "onClick:close": ee,
            onKeydown(H) {
              H.key !== "Enter" && H.key !== " " || (H.preventDefault(), H.stopPropagation(), ee(H));
            },
            onMousedown(H) {
              H.preventDefault(), H.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, R = ue.value ? !!l.chip : !!l.selection, Q = R ? Xl(ue.value ? l.chip({
            item: A,
            index: z,
            props: ne
          }) : l.selection({
            item: A,
            index: z
          })) : void 0;
          if (!(R && !Q))
            return v("div", {
              key: A.value,
              class: ["v-autocomplete__selection", z === i.value && ["v-autocomplete__selection--selected", I.value]],
              style: z === i.value ? K.value : {}
            }, [ue.value ? l.chip ? v(at, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: t.closableChips,
                  size: "small",
                  text: A.title
                }
              }
            }, {
              default: () => [Q]
            }) : v(Vl, q({
              key: "chip",
              closable: t.closableChips,
              size: "small",
              text: A.title,
              disabled: A.props.disabled
            }, ne), null) : Q ?? v("span", {
              class: "v-autocomplete__selection-text"
            }, [A.title, t.multiple && z < O.value.length - 1 && v("span", {
              class: "v-autocomplete__selection-comma"
            }, [U(",")])])]);
        })]),
        "append-inner": function() {
          var ne, R;
          for (var A = arguments.length, z = new Array(A), ee = 0; ee < A; ee++)
            z[ee] = arguments[ee];
          return v(T, null, [(ne = l["append-inner"]) == null ? void 0 : ne.call(l, ...z), t.menuIcon ? v(te, {
            class: "v-autocomplete__menu-icon",
            color: (R = n.value) == null ? void 0 : R.fieldIconColor,
            icon: t.menuIcon,
            onMousedown: yt,
            onClick: Ql,
            "aria-label": o(be.value),
            title: o(be.value),
            tabindex: "-1"
          }, null) : void 0]);
        }
      });
    }), Ne({
      isFocused: s,
      isPristine: r,
      menu: B,
      search: L,
      filteredItems: w,
      select: ve
    }, n);
  }
}), ba = ["name", "value"], ga = /* @__PURE__ */ ae({
  __name: "OxAutocomplete",
  props: /* @__PURE__ */ Me({
    repo: {},
    lookup: { default: "search" },
    name: {},
    filters: {},
    prevKey: {},
    nextKey: {},
    countKey: {},
    dataKey: {},
    query: {},
    relations: {},
    url: {},
    fetchRelations: { type: Boolean },
    save: { type: Boolean }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(t) {
    var O;
    const m = ce(), l = Re(t, "modelValue"), o = Y(null), n = Y(""), s = t, r = Tt(), c = M("repos"), u = Et(s, ["repo", "search"]), { list: a, items: i } = Nt({
      ...(O = u.value) == null ? void 0 : O[1],
      filters: s.filters || {},
      save: !1,
      query: Kt(s.repo, c)
    });
    var y = null;
    async function h(S) {
      if (S) {
        const k = a.findIndex(S);
        if (k != -1)
          o.value = a.items[k];
        else if (y != S) {
          y = S;
          const D = (await a.load({ id: S, append: 0 })).entities[0];
          o.value = D.id == S ? D : null;
        }
      } else
        o.value = null;
      return o;
    }
    let $ = null;
    const I = et.debounce(async ({ reset: S = !1 } = {}) => {
      if (a.state.isProcessing)
        return;
      const k = n.value != "<empty string>" && n.value || "";
      if (!S && k == $)
        return;
      $ = k, a.filters = { ...s.filters }, a.filters[s.lookup] = k;
      let w = await a.load();
      return o.value && a.add(o.value, 0), S || (!o.value && await h(l.value), (!n.value || n.value == "<empty string>") && (n.value = k)), w;
    }, 300);
    function K(S) {
      const k = { ...Ae(a.filters) };
      delete k[s.lookup], et.isEqual(Ae(k), Ae(S)) || I({ reset: !0 });
    }
    function L(S) {
      S != "<empty string>" && S != $ && I({ q: S });
    }
    return $e(() => {
      var S;
      (S = a.load()) == null || S.then(() => h(l.value));
    }), Z(() => s.filters, (S) => K(S)), Z(n, L), Z(l, (S, k) => S != k && h(S)), (S, k) => (p(), P(T, null, [
      s.name ? (p(), P("input", {
        key: 0,
        type: "hidden",
        name: s.name,
        value: l.value
      }, null, 8, ba)) : x("", !0),
      v(e(ya), q(e(r), {
        items: e(i),
        loading: e(a).state.isProcessing,
        modelValue: l.value,
        "onUpdate:modelValue": k[0] || (k[0] = (w) => l.value = w),
        search: n.value,
        "onUpdate:search": k[1] || (k[1] = (w) => n.value = w)
      }), fe({ _: 2 }, [
        X(e(m), (w, D) => ({
          name: D,
          fn: d((F) => [
            b(S.$slots, D, G(W(F)))
          ])
        }))
      ]), 1040, ["items", "loading", "modelValue", "search"])
    ], 64));
  }
}), ka = {
  props: {
    src: String,
    is: String
  },
  setup(t) {
    const m = re(null), l = _(() => {
      if (t.is)
        return t.is;
      let n = t.src.substring(t.src.lastIndexOf("/") + 1);
      if (n && (n = n.substring(0, n.indexOf("."))), !n)
        throw Error(
          "`is` not provided and could not be deducted from `src`."
        );
      return n;
    });
    function o() {
      m.value = jt(t.src, l.value);
    }
    return Z(() => t.src, o), o(), () => It(m.value, t);
  }
}, wa = { class: "text-error" }, _e = {
  __name: "OxFieldDetails",
  props: {
    state: Object,
    errors: Array
  },
  setup(t) {
    const m = t;
    return (l, o) => m.errors ? (p(!0), P(T, { key: 0 }, X(m.errors, (n) => (p(), P("div", wa, [
      v(te, { icon: "mdi-alert-circle-outline" }),
      U(" " + le(n), 1)
    ]))), 256)) : x("", !0);
  }
}, ut = {
  __name: "OxListFilters",
  props: {
    search: String
  },
  setup(t, { expose: m }) {
    const l = M("list"), o = t, n = _(() => {
      const c = l.filters;
      return c && Object.entries(c).some(
        ([u, a]) => !u.startsWith("page") && !u.startsWith("ordering") && !!a
      );
    }), s = _(() => n.value ? "mdi-filter-check" : "mdi-filter-outline");
    function r() {
      l.filters = {}, l.load();
    }
    return m({ icon: s, hasFilters: n, reset: r }), (c, u) => (p(), P("form", {
      onSubmit: u[2] || (u[2] = J((a) => e(l).load(), ["prevent"])),
      class: "ox-list-filters width-full"
    }, [
      v(Cl, {
        dense: "",
        color: "transparent"
      }, {
        default: d(() => [
          v(nt, {
            icon: s.value,
            readonly: ""
          }, null, 8, ["icon"]),
          o.search && e(l).filters ? (p(), g(ke, {
            key: 0,
            label: e(V)("filters.search"),
            density: "compact",
            class: "ml-2",
            modelValue: e(l).filters[o.search],
            "onUpdate:modelValue": u[0] || (u[0] = (a) => e(l).filters[o.search] = a),
            "hide-details": ""
          }, null, 8, ["label", "modelValue"])) : x("", !0),
          b(c.$slots, "default", {
            list: e(l),
            filters: e(l).filters
          }),
          v(N, {
            onClick: u[1] || (u[1] = J((a) => e(l).load(), ["stop"])),
            class: "ml-2",
            icon: "mdi-check",
            "aria-label": c.$t("filters.apply"),
            title: e(V)("filters.apply")
          }, null, 8, ["aria-label", "title"]),
          n.value ? (p(), g(N, {
            key: 1,
            onClick: J(r, ["stop"]),
            icon: "mdi-backspace",
            "aria-label": e(V)("filters.reset"),
            title: e(V)("filters.reset")
          }, null, 8, ["aria-label", "title"])) : x("", !0)
        ]),
        _: 3
      })
    ], 32));
  }
}, Va = Ke({
  ...Al(),
  ...Pl()
}, "VForm"), Be = Se()({
  name: "VForm",
  props: Va(),
  emits: {
    "update:modelValue": (t) => !0,
    submit: (t) => !0
  },
  setup(t, m) {
    let {
      slots: l,
      emit: o
    } = m;
    const n = Ol(t), s = Y();
    function r(u) {
      u.preventDefault(), n.reset();
    }
    function c(u) {
      const a = u, i = n.validate();
      a.then = i.then.bind(i), a.catch = i.catch.bind(i), a.finally = i.finally.bind(i), o("submit", a), a.defaultPrevented || i.then((y) => {
        var $;
        let {
          valid: h
        } = y;
        h && (($ = s.value) == null || $.submit());
      }), a.preventDefault();
    }
    return Ee(() => {
      var u;
      return v("form", {
        ref: s,
        class: ["v-form", t.class],
        style: t.style,
        novalidate: !0,
        onReset: r,
        onSubmit: c
      }, [(u = l.default) == null ? void 0 : u.call(l, n)]);
    }), Ne(n, s);
  }
}), ha = { class: "flex-row justify-right" }, $a = /* @__PURE__ */ ae({
  __name: "OxFormList",
  props: /* @__PURE__ */ Me({
    useModel: Function,
    editable: Boolean
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(t) {
    var a;
    const m = Re(t, "modelValue"), l = M("user"), o = Y({}), n = t, s = _(() => ({
      add: n.editable && l.can([n.useModel, "add"]),
      change: n.editable && l.can([n.useModel, "change"]),
      delete: n.editable && l.can([n.useModel, "delete"])
    })), r = Y([]);
    (a = m.value) != null && a.length || r.value.push(-1);
    function c() {
      m.value.push(o.value), o.value = {};
    }
    function u(i) {
      confirm(V("actions.delete.confirm")) && n.delete && m.value.splice(i);
    }
    return (i, y) => (p(), g(me, {
      opened: r.value,
      "onUpdate:opened": y[3] || (y[3] = (h) => r.value = h)
    }, {
      default: d(() => {
        var h;
        return [
          (h = m.value) != null && h.length ? (p(!0), P(T, { key: 0 }, X(m.value, ($, I) => (p(), g(Le, {
            key: I,
            value: I
          }, {
            activator: d(({ props: K }) => [
              v(se, q({ ref_for: !0 }, K), {
                append: d(() => [
                  de("div", {
                    onClick: y[0] || (y[0] = J(() => {
                    }, ["stop"]))
                  }, [
                    b(i.$slots, "item.actions", q({
                      item: $,
                      index: I,
                      ref_for: !0
                    }, K)),
                    s.value.delete ? (p(), g(N, {
                      key: 0,
                      type: "button",
                      class: "ml-2",
                      size: "small",
                      onClick: J((L) => u(I), ["stop", "prevent"]),
                      color: "error",
                      "aria-label": e(V)("actions.remove"),
                      title: e(V)("actions.remove"),
                      icon: "mdi-delete"
                    }, null, 8, ["onClick", "aria-label", "title"])) : x("", !0)
                  ])
                ]),
                default: d(() => [
                  v(Tl, null, {
                    default: d(() => [
                      b(i.$slots, "item.title", { item: $ })
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1040)
            ]),
            default: d(() => [
              v(Be, {
                disabled: !s.value.change
              }, {
                default: d(() => [
                  b(i.$slots, "item", {
                    item: $,
                    index: I,
                    editable: s.value.change
                  })
                ]),
                _: 2
              }, 1032, ["disabled"])
            ]),
            _: 2
          }, 1032, ["value"]))), 128)) : (p(), g(se, {
            key: 1,
            title: e(V)("lists.empty")
          }, null, 8, ["title"])),
          s.value.add ? (p(), P(T, { key: 2 }, [
            m.value.length ? (p(), g(Ue, { key: 0 })) : x("", !0),
            v(Le, { value: -1 }, {
              activator: d(({ props: $ }) => [
                v(se, q($, {
                  title: e(V)("actions.add_item"),
                  "prepend-icon": "mdi-plus"
                }), null, 16, ["title"])
              ]),
              default: d(() => [
                v(Be, null, {
                  default: d(() => [
                    b(i.$slots, "item", {
                      item: o.value,
                      edit: !0
                    })
                  ]),
                  _: 3
                }),
                o.value ? (p(), g(se, { key: 0 }, {
                  default: d(() => [
                    de("div", ha, [
                      o.value ? (p(), g(N, {
                        key: 0,
                        size: "small",
                        onClick: y[1] || (y[1] = ($) => o.value = {}),
                        color: "secondary",
                        "prepend-icon": "mdi-backspace",
                        "aria-label": e(V)("actions.discard")
                      }, {
                        default: d(() => [
                          U(le(e(V)("actions.discard")), 1)
                        ]),
                        _: 1
                      }, 8, ["aria-label"])) : x("", !0),
                      o.value ? (p(), g(N, {
                        key: 1,
                        size: "small",
                        onClick: y[2] || (y[2] = ($) => c()),
                        color: "primary",
                        "prepend-icon": "mdi-plus",
                        "aria-label": e(V)("actions.add")
                      }, {
                        default: d(() => [
                          U(le(e(V)("actions.add")), 1)
                        ]),
                        _: 1
                      }, 8, ["aria-label"])) : x("", !0)
                    ])
                  ]),
                  _: 1
                })) : x("", !0)
              ]),
              _: 3
            })
          ], 64)) : x("", !0)
        ];
      }),
      _: 3
    }, 8, ["opened"]));
  }
}), Sa = Se()({
  name: "VSlideGroupItem",
  props: Il(),
  emits: {
    "group:selected": (t) => !0
  },
  setup(t, m) {
    let {
      slots: l
    } = m;
    const o = Fl(t, Ll);
    return () => {
      var n;
      return (n = l.default) == null ? void 0 : n.call(l, {
        isSelected: o.isSelected.value,
        select: o.select,
        toggle: o.toggle,
        selectedClass: o.selectedClass.value
      });
    };
  }
}), xa = {
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
  setup(t, { emit: m }) {
    const l = m;
    M("list");
    const o = M("items"), n = t;
    function s(u) {
      return u = u % n.colors.length, n.colorVariant ? n.colors[u] + "-" + n.colorVariant : n.colors[u];
    }
    function r(u, a, i) {
      u[i] ? !u[i].includes(a) && u[i].push(a) : u[i] = [a];
    }
    const c = _(() => {
      const u = {};
      if (o.value)
        for (var a of o.value) {
          const y = a[n.field];
          if (Array.isArray(y))
            if (y.length)
              for (var i of y)
                r(u, a, i);
            else
              r(u, a, null);
          else
            r(u, a, y);
        }
      return u;
    });
    return (u, a) => (p(), g(it, null, {
      default: d(() => [
        v(Dl, null, {
          default: d(() => [
            (p(!0), P(T, null, X(n.headers, (i, y) => (p(), g(Sa, {
              key: i.value
            }, {
              default: d(({ selectedClass: h }) => [
                v(_l, {
                  width: "400",
                  class: Ft(["ma-3", h]),
                  color: s(y),
                  lines: "two"
                }, {
                  default: d(() => [
                    v(Bl, null, {
                      default: d(() => [
                        U(le(i.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    v(me, {
                      "bg-color": s(y)
                    }, {
                      default: d(() => [
                        c.value && c.value[i.value] ? (p(!0), P(T, { key: 0 }, X(c.value[i.value], ($) => b(u.$slots, "item", {
                          key: $.id,
                          header: i,
                          item: $
                        }, () => [
                          v(se, {
                            title: $[n.itemTitle],
                            value: n.itemValue && $[n.itemValue],
                            onClick: (I) => l("click", $)
                          }, {
                            append: d(() => [
                              b(u.$slots, "item.action")
                            ]),
                            _: 2
                          }, 1032, ["title", "value", "onClick"])
                        ])), 128)) : x("", !0)
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
}, dt = /* @__PURE__ */ ae({
  __name: "OxListTable",
  props: {
    // list: Object,
    /** Table headers */
    headers: Array,
    /** If True, allow user to edit (display edit button) */
    edit: Boolean
  },
  setup(t) {
    const m = ce(), l = ea(m, "item.", { exclude: ["item.actions"] }), o = M("panel"), n = M("list"), s = M("items"), r = M("user"), c = t, u = _(() => c.headers.reduce((y, h) => (y.push(
      typeof h == "string" ? { key: h, title: V(zt.field(h)) } : { key: h.key, title: V(h.title) }
    ), y), []));
    function a(y) {
      n.filters.page = y.page, n.filters.page_size = y.itemsPerPage, n.filters.ordering = y.sortBy.map(({ key: h, order: $ }) => $ == "asc" ? h : `-${h}`);
    }
    function i(y, h) {
      o.show({ view: "detail.edit", value: h });
    }
    return (y, h) => {
      var $;
      return p(), g(Ml, {
        items: e(s),
        "item-index": "id",
        "items-length": e(n).count || e(s).length,
        "items-per-page": c.itemsPerPage,
        loading: ($ = e(n).state) == null ? void 0 : $.isProcessing,
        headers: u.value,
        "no-data-text": e(V)("lists.empty"),
        class: "align-top-table",
        "onUpdate:options": a
      }, fe({
        loading: d(() => [
          v(Rl, { type: "table-row@10" })
        ]),
        "item.actions": d(({ item: I }) => [
          e(r).can([I.constructor, "change"], I) ? (p(), g(he, {
            key: 0,
            icon: "mdi-pencil",
            button: "",
            title: e(V)("actions.edit"),
            item: I,
            run: i
          }, null, 8, ["title", "item"])) : e(r).can([I.constructor, "view"], I) ? (p(), g(he, {
            key: 1,
            icon: "mdi-eye-outline",
            button: "",
            title: e(V)("actions.edit"),
            item: I,
            run: i
          }, null, 8, ["title", "item"])) : x("", !0),
          b(y.$slots, "item.actions", {
            value: I,
            dense: !0,
            button: !0
          })
        ]),
        _: 2
      }, [
        X(e(l), (I, K) => ({
          name: K,
          fn: d((L) => [
            b(y.$slots, K, G(W(L)))
          ])
        }))
      ]), 1032, ["items", "items-length", "items-per-page", "loading", "headers", "no-data-text"]);
    };
  }
}), xe = {
  __name: "OxStateAlert",
  props: {
    state: Object,
    delay: { type: Boolean, default: !1 },
    okTitle: { type: String, default: "" },
    noneTitle: { type: String, default: "" },
    errorTitle: { type: String, default: "Oups..." },
    processingTitle: { type: String, default: "Processing..." }
  },
  setup(t) {
    const m = ce(), l = t;
    let o = Y(!1);
    Z(() => l.state.state, (r) => {
      l.delay && r == ta.PROCESSING && (o.value = !1, window.setTimeout(() => {
        o.value = !0;
      }, 5e3));
    });
    const n = _(() => {
      var r;
      return ((r = l.state) == null ? void 0 : r.isProcessing) && (!l.delay || o.value);
    }), s = _(() => {
      var r, c;
      return (c = (r = l.state) == null ? void 0 : r.data) == null ? void 0 : c.messages;
    });
    return (r, c) => (p(), P(T, null, [
      l.state.isNone && e(m).none ? (p(), g(e(ge), {
        key: 0,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        state: t.state,
        title: t.noneTitle
      }, {
        default: d(() => [
          b(r.$slots, "none", { state: t.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : n.value ? (p(), g(e(ge), {
        key: 1,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: t.state,
        title: t.processingTitle
      }, {
        default: d(() => [
          b(r.$slots, "processing", { state: t.state }, () => [
            c[0] || (c[0] = U(" Data are being sent to server, please be patient. If this message persist you might wan't to retry. "))
          ])
        ]),
        _: 3
      }, 8, ["state", "title"])) : l.state.isError ? (p(), g(e(ge), {
        key: 2,
        type: "error",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: t.state,
        title: t.errorTitle
      }, {
        default: d(() => [
          b(r.$slots, "error", { state: t.state }, () => [
            c[1] || (c[1] = U(" Oups... something wrong happened. "))
          ]),
          b(r.$slots, "error-detail", { state: t.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : l.state.isOk ? (p(), g(e(ge), {
        key: 3,
        type: "success",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: t.state,
        title: t.okTitle
      }, {
        default: d(() => [
          b(r.$slots, "ok", { state: t.state }, () => [
            c[2] || (c[2] = de("p", null, "Congrats! Data have been updated.", -1))
          ]),
          s.value ? (p(), P(T, { key: 0 }, [
            v(Ue),
            (p(!0), P(T, null, X(s.value, (u) => (p(), P("p", null, le(u), 1))), 256))
          ], 64)) : x("", !0),
          b(r.$slots, "ok-detail", { state: t.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : x("", !0),
      b(r.$slots, "default", {
        state: l.state
      })
    ], 64));
  }
}, Ca = { class: "text-right" }, je = {
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
  setup(t, { emit: m }) {
    const l = m, o = t;
    return (n, s) => (p(), P("div", Ca, [
      v(N, {
        color: "error",
        class: "me-2",
        "prepend-icon": o.resetIcon,
        onClick: s[0] || (s[0] = (r) => l("reset")),
        disabled: o.disabled
      }, {
        default: d(() => [
          b(n.$slots, "discard", {}, () => [
            U(le(o.resetLabel || e(Te)("actions.discard")), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]),
      o.state.isSending || o.state.isProcessing ? (p(), g(N, {
        key: 0,
        color: "primary",
        "prepend-icon": o.processingIcon,
        disabled: ""
      }, {
        default: d(() => [
          b(n.$slots, "processing", {}, () => [
            U(le(o.processingLabel || e(Te)("actions.saving")), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon"])) : (p(), g(N, {
        key: 1,
        color: "primary",
        "prepend-icon": o.validateIcon,
        onClick: s[1] || (s[1] = (r) => l("validate")),
        disabled: o.disabled || o.validateDisabled
      }, {
        default: d(() => [
          b(n.$slots, "validate", {}, () => [
            U(le(o.validateLabel || e(Te)("actions.save")), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]))
    ]));
  }
}, Oa = { key: 0 }, Pa = { class: "text-right mt-3" }, Aa = {
  __name: "OxLogin",
  props: {
    next: { type: String },
    url: { type: String }
  },
  emits: ["save", "saved"],
  setup(t, { emit: m }) {
    const l = lt("password"), o = t, n = Fe({
      username: "",
      password: ""
    }), s = Y(!1), r = Fe(new la());
    function c(a = !0) {
      na(n, { username: "", password: "" }), a && r.none();
    }
    async function u() {
      r.processing();
      try {
        const a = await fetch(o.url, {
          method: "POST",
          headers: aa.axiosConfig.headers,
          body: JSON.stringify(n)
        });
        a.status == 200 ? (n.credentials = "", n.password = "", r.ok(await a.json()), o.next && (window.location.href = o.next)) : r.error(await a.json());
      } catch (a) {
        r.ok((a == null ? void 0 : a.message) || a);
      }
    }
    return (a, i) => (p(), P(T, null, [
      v(e(xe), { state: r }, {
        none: d(({ state: y }) => i[7] || (i[7] = [
          de("p", null, "Please enter your credentials in order too proceed...", -1)
        ])),
        "ok-detail": d(({ state: y }) => [
          o.next ? (p(), P("p", Oa, [
            i[8] || (i[8] = U("You soon will be redirected to ")),
            de("i", null, le(o.next), 1)
          ])) : x("", !0)
        ]),
        error: d(({ state: y }) => {
          var h, $;
          return [
            v(_e, {
              errors: (h = y.data) == null ? void 0 : h.username
            }, null, 8, ["errors"]),
            v(_e, {
              errors: ($ = y.data) == null ? void 0 : $.password
            }, null, 8, ["errors"])
          ];
        }),
        _: 1
      }, 8, ["state"]),
      r.isOk ? x("", !0) : (p(), P(T, { key: 0 }, [
        v(ke, {
          variant: "underlined",
          label: "Enter login",
          modelValue: n.username,
          "onUpdate:modelValue": i[0] || (i[0] = (y) => n.username = y),
          onKeyup: i[1] || (i[1] = We(J((y) => e(l).focus(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue"]),
        v(ke, {
          variant: "underlined",
          ref: "password",
          label: "Enter password",
          modelValue: n.password,
          "onUpdate:modelValue": i[2] || (i[2] = (y) => n.password = y),
          type: s.value ? "text" : "password",
          "append-icon": s.value ? "mdi-eye" : "mdi-eye-off",
          "onClick:append": i[3] || (i[3] = (y) => s.value = !s.value),
          onKeyup: i[4] || (i[4] = We(J((y) => u(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue", "type", "append-icon"]),
        de("div", Pa, [
          b(a.$slots, "default", {
            value: n.password
          }, () => [
            n.username && n.password ? (p(), g(je, {
              key: 0,
              "validate-label": "Login!",
              onValidate: i[5] || (i[5] = (y) => u()),
              onReset: i[6] || (i[6] = (y) => c()),
              state: r
            }, null, 8, ["state"])) : x("", !0)
          ])
        ])
      ], 64))
    ], 64));
  }
}, ct = /* @__PURE__ */ ae({
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
  setup(t) {
    const m = ce(), l = t, o = pe(m, "views."), n = Y(!1);
    $e(() => {
      n.value = !0;
    }), Lt(() => {
      n.value = !1;
    });
    const s = M("panels"), r = M("panel");
    return (c, u) => (p(), P(T, null, [
      l.state ? (p(), g(xe, {
        key: 0,
        state: l.state,
        delay: ""
      }, null, 8, ["state"])) : x("", !0),
      e(m).prepend && e(s).panel == e(r).name ? b(c.$slots, "prepend", { key: 1 }) : x("", !0),
      v(it, { class: "ma-4" }, {
        default: d(() => [
          (p(), g(qe, {
            to: "#app-bar-sheet-title",
            disabled: !n.value || e(s).panel != l.name
          }, [
            l.icon ? (p(), g(te, {
              key: 0,
              icon: l.icon
            }, null, 8, ["icon"])) : x("", !0),
            U(" " + le(l.title) + " ", 1),
            b(c.$slots, "append-title")
          ], 8, ["disabled"])),
          (p(), g(qe, {
            to: "#app-bar-right",
            disabled: !n.value || e(s).panel != l.name
          }, [
            b(c.$slots, "app-bar-right"),
            l.help ? (p(), g(N, {
              key: 0,
              class: "ml-3",
              href: l.help,
              panels: "new",
              icon: "mdi-information-outline"
            }, null, 8, ["href"])) : x("", !0)
          ], 8, ["disabled"])),
          b(c.$slots, "top"),
          b(c.$slots, "default", {}, () => [
            e(o) ? (p(), g(Ul, {
              key: 0,
              modelValue: e(r).view,
              "onUpdate:modelValue": u[0] || (u[0] = (a) => e(r).view = a)
            }, {
              default: d(() => [
                (p(!0), P(T, null, X(e(o), (a, i) => (p(), g(El, {
                  key: a,
                  value: a
                }, {
                  default: d(() => [
                    b(c.$slots, i)
                  ]),
                  _: 2
                }, 1032, ["value"]))), 128))
              ]),
              _: 3
            }, 8, ["modelValue"])) : x("", !0)
          ]),
          b(c.$slots, "bottom")
        ]),
        _: 3
      }),
      e(m).append && e(s).panel == e(r).name ? b(c.$slots, "append", { key: 2 }) : x("", !0)
    ], 64));
  }
}), vt = /* @__PURE__ */ ae({
  __name: "OxView",
  props: {
    /** default tab title */
    title: String
  },
  setup(t) {
    const m = t, l = Y(null), o = ce(), n = pe(o, "tab.", { exclude: "tab.default" }), s = pe(o, "window.");
    return (r, c) => e(n) && Object.keys(e(n)).length ? (p(), P(T, { key: 0 }, [
      v(Nl, {
        modelValue: l.value,
        "onUpdate:modelValue": c[0] || (c[0] = (u) => l.value = u)
      }, {
        default: d(() => [
          e(o).default ? b(r.$slots, "tab", { key: 0 }, () => [
            v(Je, {
              text: m == null ? void 0 : m.title,
              value: "default"
            }, null, 8, ["text"])
          ]) : x("", !0),
          (p(!0), P(T, null, X(e(n), (u, a) => (p(), g(Je, { value: u }, {
            default: d(() => [
              b(r.$slots, a)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"]),
      v(st, {
        modelValue: l.value,
        "onUpdate:modelValue": c[1] || (c[1] = (u) => l.value = u)
      }, {
        default: d(() => [
          e(o).default ? (p(), g(De, {
            key: 0,
            value: "default"
          }, {
            default: d(() => [
              b(r.$slots, "default")
            ]),
            _: 3
          })) : x("", !0),
          (p(!0), P(T, null, X(e(s), (u, a) => (p(), g(De, { value: u }, {
            default: d(() => [
              b(r.$slots, a)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"])
    ], 64)) : b(r.$slots, "default", { key: 1 });
  }
}), Ta = {
  key: 0,
  class: "mb-3"
}, Ia = /* @__PURE__ */ ae({
  __name: "OxModelEdit",
  props: {
    sendFormData: {},
    hideValidationBtn: {},
    repo: {},
    initial: {},
    name: {},
    url: {},
    saved: { type: Function }
  },
  setup(t, { expose: m }) {
    const l = Y(null), o = M("context"), n = t, { editor: s, edited: r } = Gt({ props: n }), c = _(() => o.user.can([s.repo.use, "change"])), u = _(() => ({
      editor: s,
      edited: r,
      save: i,
      reset: a,
      form: l.value,
      editable: c.value,
      disabled: !c.value,
      value: s.value,
      model: s.repo.use
    }));
    Z(() => s.errors && Object.values(s.errors), () => l.value.validate());
    function a() {
      s.reset();
    }
    function i() {
      return n.sendFormData ? s.save(new FormData(l.value.$el)) : s.save();
    }
    return m({ editor: s, edited: r, save: i, reset: a }), (y, h) => (p(), P(T, null, [
      v(xe, {
        state: e(s).state
      }, null, 8, ["state"]),
      v(Kl, { class: "ox-model-edit" }, {
        default: d(() => [
          n.hideValidationBtn ? x("", !0) : (p(), P("div", Ta, [
            b(y.$slots, "prepend", G(W(u.value)), () => [
              c.value && e(r) ? (p(), g(je, {
                key: 0,
                onValidate: h[0] || (h[0] = ($) => i()),
                onReset: h[1] || (h[1] = ($) => a()),
                state: e(s).state,
                "validate-disabled": e(s).valid === !1
              }, null, 8, ["state", "validate-disabled"])) : x("", !0)
            ])
          ])),
          v(Be, {
            ref_key: "form",
            ref: l,
            modelValue: e(s).valid,
            "onUpdate:modelValue": h[2] || (h[2] = ($) => e(s).valid = $),
            disabled: !c.value
          }, {
            default: d(() => [
              b(y.$slots, "default", G(W(u.value)))
            ]),
            _: 3
          }, 8, ["modelValue", "disabled"]),
          b(y.$slots, "append", G(W(u.value)))
        ]),
        _: 3
      })
    ], 64));
  }
}), Fa = /* @__PURE__ */ ae({
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
  setup(t, { expose: m }) {
    const l = ce(), o = pe(l, "views.list."), n = pe(l, "item."), s = pe(l, "views.detail.edit."), r = lt("filters"), c = t, u = M("context"), { panel: a, list: i, items: y, next: h, prev: $ } = M("panel") ?? Wt({ props: c }), I = a.panels;
    _(() => {
      var k;
      return u.user.can([a.model, (k = a.value) != null && k.id ? "change" : "add"]);
    });
    const { showFilters: K } = Dt(a), L = _(() => [
      ...c.headers,
      { key: "actions", title: V("actions") }
    ]);
    function O(k) {
      k != null && k.id ? a.value = a.repo.whereId(k.id).first() : a.value = k, i.load();
    }
    const S = _(() => ({
      panel: a,
      panels: I,
      list: i,
      items: y,
      context: u,
      value: a.value
    }));
    return Z(() => Object.values(i.filters), () => i.load()), m({ list: i, panel: a, items: y, next: h, prev: $ }), (k, w) => (p(), g(ct, {
      name: c.name,
      title: e(a).title,
      icon: e(a).icon,
      state: e(i).state,
      index: c.index
    }, fe({
      "app-bar-right": d(() => [
        b(k.$slots, "app-bar-right", G(W(S.value))),
        e(a).view.startsWith("list.") ? (p(), g(Qe, {
          key: 0,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: d(() => [
            b(k.$slots, "nav.list", G(W(S.value))),
            v(N, {
              title: e(V)("actions.list.reload"),
              "aria-label": e(V)("actions.list.reload"),
              onClick: w[0] || (w[0] = (D) => e(i).load())
            }, {
              default: d(() => [
                v(te, null, {
                  default: d(() => w[10] || (w[10] = [
                    U("mdi-reload")
                  ])),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["title", "aria-label"]),
            e(r) ? (p(), g(N, {
              key: 0,
              title: e(K) ? e(V)("filters.hide") : e(V)("filters.show"),
              "aria-label": e(K) ? e(V)("filters.hide") : e(V)("filters.show"),
              onClick: w[1] || (w[1] = (D) => K.value = !e(K)),
              active: e(K)
            }, {
              default: d(() => [
                v(te, {
                  icon: e(r).icon
                }, null, 8, ["icon"])
              ]),
              _: 1
            }, 8, ["title", "aria-label", "active"])) : x("", !0)
          ]),
          _: 3
        })) : e(a).view.startsWith("detail.") && e(a).value ? (p(), g(Qe, {
          key: 1,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: d(() => [
            b(k.$slots, "nav.detail", G(W(S.value))),
            e(a).view == "detail.edit" && e(a).value ? (p(), g(ot, { key: 0 }, {
              activator: d(({ props: D }) => [
                v(N, q({ "prepend-icon": "mdi-dots-vertical" }, D), {
                  default: d(() => [
                    U(le(e(V)("actions")), 1)
                  ]),
                  _: 2
                }, 1040)
              ]),
              default: d(() => [
                v(me, null, {
                  default: d(() => [
                    b(k.$slots, "item.actions", {
                      value: e(a).value
                    })
                  ]),
                  _: 3
                })
              ]),
              _: 3
            })) : x("", !0),
            v(N, {
              disabled: !e($),
              title: e(V)("prev"),
              "aria-label": e(V)("prev"),
              onClick: w[2] || (w[2] = J((D) => e(a).show({ view: e(a).view, value: e($) }), ["stop"]))
            }, {
              default: d(() => [
                v(te, { icon: "mdi-chevron-left" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"]),
            v(N, {
              disabled: !e(h),
              title: e(V)("next"),
              "aria-label": e(V)("next"),
              onClick: w[3] || (w[3] = J((D) => e(a).show({ view: e(a).view, value: e(h) }), ["stop"]))
            }, {
              default: d(() => [
                v(te, { icon: "mdi-chevron-right" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"])
          ]),
          _: 3
        })) : x("", !0),
        v(jl, {
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal",
          mandatory: "",
          modelValue: e(a).view,
          "onUpdate:modelValue": w[9] || (w[9] = (D) => e(a).view = D)
        }, {
          default: d(() => {
            var D;
            return [
              v(N, {
                value: "list.table",
                onClickCapture: w[4] || (w[4] = J((F) => e(a).show({ view: "list.table" }), ["stop"])),
                title: e(V)("panels.nav.table"),
                "aria-label": e(V)("panels.nav.table")
              }, {
                default: d(() => [
                  v(te, null, {
                    default: d(() => w[11] || (w[11] = [
                      U("mdi-table")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"]),
              e(l)["views.list.cards"] ? (p(), g(N, {
                key: 0,
                value: "list.cards",
                onClickCapture: w[5] || (w[5] = J((F) => e(a).show({ view: "list.cards" }), ["stop"])),
                title: e(V)("panels.nav.cards"),
                "aria-label": e(V)("panels.nav.cards")
              }, {
                default: d(() => [
                  v(te, null, {
                    default: d(() => w[12] || (w[12] = [
                      U("mdi-card-account-details")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : x("", !0),
              e(l)["views.list.kanban"] ? (p(), g(N, {
                key: 1,
                value: "list.kanban",
                onClickCapture: w[6] || (w[6] = J((F) => e(a).show({ view: "list.kanban" }), ["stop"])),
                title: e(V)("panels.nav.kanban"),
                "aria-label": e(V)("panels.nav.kanban")
              }, {
                default: d(() => [
                  v(te, null, {
                    default: d(() => w[13] || (w[13] = [
                      U("mdi-view-column")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : x("", !0),
              e(l)["views.detail.edit"] || e(s) ? (p(), g(N, {
                key: 2,
                value: "detail.edit",
                onClickCapture: w[7] || (w[7] = J((F) => e(a).show({ view: "detail.edit", value: e(a).value }), ["stop"])),
                disabled: !((D = e(a).value) != null && D.id) && e(a).view != "detail.edit",
                title: e(V)("panels.nav.edit"),
                "aria-label": e(V)("panels.nav.edit")
              }, {
                default: d(() => [
                  v(te, null, {
                    default: d(() => w[14] || (w[14] = [
                      U("mdi-pencil")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"])) : x("", !0),
              e(s) ? (p(), g(N, {
                key: 3,
                value: "detail.add",
                onClickCapture: w[8] || (w[8] = J((F) => e(a).create(), ["stop"])),
                title: e(V)("panels.nav.add"),
                "aria-label": e(V)("panels.nav.add")
              }, {
                default: d(() => [
                  v(te, null, {
                    default: d(() => w[15] || (w[15] = [
                      U("mdi-plus-box")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : x("", !0),
              b(k.$slots, "nav.views", G(W(S.value)))
            ];
          }),
          _: 3
        }, 8, ["modelValue"]),
        b(k.$slots, "app-bar-end", G(W(S.value)))
      ]),
      top: d(() => [
        c.warning ? (p(), g(ge, {
          key: 0,
          type: "warning",
          variant: "tonal",
          text: c.warning
        }, null, 8, ["text"])) : x("", !0),
        b(k.$slots, "top"),
        _t(v(ut, {
          ref_key: "filters",
          ref: r,
          search: c.search,
          "teleport-to": "#panel-list-actions"
        }, {
          default: d((D) => [
            b(k.$slots, "list.filters", G(W(D)))
          ]),
          _: 3
        }, 8, ["search"]), [
          [Bt, e(a).view.startsWith("list.") && e(K)]
        ])
      ]),
      _: 2
    }, [
      e(l)["append-title"] ? {
        name: "append-title",
        fn: d(() => [
          b(k.$slots, "append-title", G(W(S.value)))
        ]),
        key: "0"
      } : void 0,
      e(l).prepend ? {
        name: "prepend",
        fn: d(() => [
          b(k.$slots, "prepend", G(W(S.value)))
        ]),
        key: "1"
      } : void 0,
      e(l).append ? {
        name: "append",
        fn: d(() => [
          b(k.$slots, "append", G(W(S.value)))
        ]),
        key: "2"
      } : void 0,
      e(l)["views.list.table"] ? void 0 : {
        name: "views.list.table",
        fn: d(() => [
          v(dt, { headers: L.value }, fe({ _: 2 }, [
            X(e(n), (D, F) => ({
              name: F,
              fn: d((ue) => [
                b(k.$slots, F, G(W(ue)))
              ])
            }))
          ]), 1032, ["headers"])
        ]),
        key: "3"
      },
      X(e(o), (D, F) => ({
        name: F,
        fn: d(() => [
          b(k.$slots, F, G(W(S.value)))
        ])
      })),
      e(l)["views.detail.edit"] || e(s) ? {
        name: "views.detail.edit",
        fn: d(() => [
          v(e(vt), {
            title: e(V)(`models.${e(a).model.entity}`)
          }, fe({ _: 2 }, [
            X(e(s), (D, F) => ({
              name: D,
              fn: d(() => [
                b(k.$slots, F, {
                  saved: O,
                  value: e(a).value
                })
              ])
            }))
          ]), 1032, ["title"])
        ]),
        key: "4"
      } : void 0
    ]), 1032, ["name", "title", "icon", "state", "index"]));
  }
}), La = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OxAction: he,
  OxActionModelDelete: oa,
  OxActions: ia,
  OxApp: ma,
  OxAutocomplete: ga,
  OxComponent: ka,
  OxFieldDetails: _e,
  OxFormList: $a,
  OxListFilters: ut,
  OxListKanban: xa,
  OxListTable: dt,
  OxLogin: Aa,
  OxModelEdit: Ia,
  OxModelPanel: Fa,
  OxPanel: ct,
  OxStateAlert: xe,
  OxValidationBtn: je,
  OxView: vt
}, Symbol.toStringTag, { value: "Module" })), Na = {
  el: "#app",
  delimiters: ["[[", "]]"],
  components: { ...La, ...sa }
};
export {
  Na as App,
  he as OxAction,
  oa as OxActionModelDelete,
  ia as OxActions,
  ma as OxApp,
  ga as OxAutocomplete,
  ka as OxComponent,
  _e as OxFieldDetails,
  $a as OxFormList,
  ut as OxListFilters,
  xa as OxListKanban,
  dt as OxListTable,
  Aa as OxLogin,
  Ia as OxModelEdit,
  Fa as OxModelPanel,
  ct as OxPanel,
  xe as OxStateAlert,
  je as OxValidationBtn,
  vt as OxView
};
//# sourceMappingURL=components.js.map
