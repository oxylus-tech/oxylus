import { defineComponent as ae, inject as B, createElementBlock as P, createCommentVNode as O, unref as e, openBlock as p, Fragment as I, createBlock as g, withModifiers as Y, useSlots as ce, renderSlot as b, normalizeProps as Q, guardReactiveProps as X, ref as W, computed as D, resolveComponent as xt, createVNode as v, withCtx as d, createTextVNode as K, toDisplayString as le, renderList as J, mergeProps as G, mergeModels as De, useModel as Me, shallowRef as re, watch as Z, onMounted as $e, onScopeDispose as Ct, nextTick as Ae, watchEffect as Ot, reactive as Te, onErrorCaptured as Pt, createElementVNode as ue, createSlots as me, useAttrs as At, toRaw as ze, h as Tt, normalizeClass as It, useTemplateRef as tt, withKeys as Ge, onUnmounted as _t, Teleport as We, toRefs as Lt, withDirectives as Ft, vShow as Dt } from "vue";
import { useAction as Mt, t as h, filterSlots as pe, useAppContext as Bt, usePanels as Rt, excludeValues as Ut, useModelList as Et, query as Kt, defineAsyncComponent as Nt, tKeys as jt, useModelEditor as zt, useModelPanel as Gt } from "ox";
import { V as z, a as se, b as Wt, c as Ie, d as Be, e as qt, f as fe, u as Yt, g as Ht, h as Jt, i as Qt, j as Xt, k as Re, l as Ue, m as Zt, n as el, o as tl, p as ll, q as al, r as nl, s as qe, t as sl, v as ol, w as lt, x as il, y as rl, z as Ye, A as ul, B as at, C as dl, D as cl, E as nt, F as _e, G as vl, H as pl, I as fl, J as ml, K as yl, L as ke, M as te, N as st, O as bl, P as gl, Q as kl, R as wl, S as Vl, T as hl, U as $l, W as Sl, X as xl, Y as Cl, Z as Ol, _ as Pl, $ as Al, a0 as Tl, a1 as Il, a2 as _l, a3 as Ll, a4 as ot, a5 as Fl, a6 as Dl, a7 as Ml, a8 as Bl, a9 as Rl, aa as ge, ab as Ul, ac as El, ad as Kl, ae as He, af as Nl, ag as Je, ah as jl } from "./VAlert-HvIugEXk.js";
import { l as Se, n as Ee, u as Ve, o as zl, q as Gl, r as Wl, s as it, t as ql, v as Yl, w as Hl, j as Jl, x as Ql, y as Xl, z as Qe, A as Xe, B as Zl } from "./theme-BrdPdMMA.js";
import { o as Ze, D as ea, v as ta, S as la, j as aa, r as na } from "./lodash-9f3mbMbV.js";
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
    permissions: { type: [String, Function, Array] },
    run: {},
    href: {}
  },
  emits: ["completed"],
  setup(t, { emit: f }) {
    const l = t, s = f, n = B("context"), { run: o, processing: u, allowed: c } = Mt({ user: n.user, emits: s, props: l });
    return (r, a) => e(c) ? (p(), P(I, { key: 0 }, [
      l.button ? (p(), g(z, {
        key: 0,
        variant: "text",
        disabled: e(u),
        color: l.color,
        icon: l.icon,
        title: l.title,
        "aria-label": l.title,
        onClick: Y(e(o), ["stop"])
      }, null, 8, ["disabled", "color", "icon", "title", "aria-label", "onClick"])) : (p(), g(se, {
        key: 1,
        title: l.title,
        "base-color": l.color,
        "prepend-icon": l.icon,
        disabled: e(u),
        onClick: Y(e(o), ["stop"])
      }, null, 8, ["title", "base-color", "prepend-icon", "disabled", "onClick"]))
    ], 64)) : O("", !0);
  }
}), oa = /* @__PURE__ */ ae({
  __name: "OxActionModelDelete",
  props: {
    item: {},
    button: { type: Boolean }
  },
  setup(t) {
    const f = B("panel"), l = B("repos"), s = t;
    async function n(o, u) {
      return await l[u.constructor.entity].api().delete(u.$url(), { delete: s.item.id });
    }
    return (o, u) => (p(), g(he, {
      item: s.item,
      button: s.button,
      icon: "mdi-delete",
      color: "error",
      title: e(h)("actions.delete"),
      confirm: e(h)("actions.delete.confirm"),
      permissions: ["delete", (c, r) => r.id],
      run: n,
      onCompleted: u[0] || (u[0] = (c) => {
        var r;
        return (r = e(f)) == null ? void 0 : r.show({ view: e(f).index });
      })
    }, null, 8, ["item", "button", "title", "confirm", "permissions"]));
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
    const f = t;
    return (l, s) => (p(), P(I, null, [
      b(l.$slots, "before", Q(X(f))),
      b(l.$slots, "default", Q(X(f))),
      b(l.$slots, "after", Q(X(f)))
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
    const f = t;
    W(null);
    const l = B("user"), s = B("panels");
    D(() => !f.auto || panel.name == f.name);
    function n(u) {
      return u.permissions && !l.can(u.permissions) ? !1 : u.items ? u.items.some((c) => n(c)) : !0;
    }
    function o() {
      const u = { panel: f.name, href: f.url };
      s.show(u);
    }
    return (u, c) => {
      const r = xt("ox-app-nav-item", !0);
      return n(f) ? (p(), P(I, { key: 0 }, [
        f.type == "subheader" ? (p(), P(I, { key: 0 }, [
          v(Wt, null, {
            default: d(() => [
              K(le(f.title), 1)
            ]),
            _: 1
          }),
          f.items ? (p(!0), P(I, { key: 0 }, J(f.items, (a) => (p(), g(r, G({ ref_for: !0 }, a), null, 16))), 256)) : O("", !0)
        ], 64)) : f.type == "group" ? (p(), g(Ie, {
          key: 1,
          value: f.name
        }, {
          activator: d(({ props: a }) => [
            v(se, G(a, {
              title: f.title,
              "prepend-icon": f.icon
            }), null, 16, ["title", "prepend-icon"])
          ]),
          default: d(() => [
            (p(!0), P(I, null, J(f.items, (a, i) => (p(), g(r, G({
              key: i,
              ref_for: !0
            }, a), null, 16))), 128))
          ]),
          _: 1
        }, 8, ["value"])) : f.type == "divider" ? (p(), g(Be, { key: 2 })) : (p(), g(se, {
          key: 3,
          active: e(s).panel == f.name,
          value: f.name,
          "prepend-icon": f.icon,
          title: f.title,
          onClick: Y(o, ["stop"])
        }, null, 8, ["active", "value", "prepend-icon", "title"]))
      ], 64)) : O("", !0);
    };
  }
}), ua = {
  __name: "OxAppNav",
  props: /* @__PURE__ */ De({
    items: Array
  }, {
    drawer: {},
    drawerModifiers: {}
  }),
  emits: ["update:drawer"],
  setup(t) {
    B("context");
    const f = B("panels"), l = Me(t, "drawer"), s = W([]), n = t, o = D(() => (u(n.items), n.items));
    function u(r) {
      s.value = c(r);
    }
    function c(r) {
      if (f.panel) {
        for (const a of r)
          if (a.items) {
            const i = c(a.items);
            if (i)
              return [i, a.name];
          } else if (a.name == f.panel)
            return [a.name];
      }
    }
    return (r, a) => (p(), g(qt, {
      modelValue: l.value,
      "onUpdate:modelValue": a[1] || (a[1] = (i) => l.value = i),
      theme: "dark"
    }, {
      append: d(() => [
        v(fe, null, {
          default: d(() => [
            b(r.$slots, "append")
          ]),
          _: 3
        })
      ]),
      default: d(() => [
        b(r.$slots, "prepend"),
        v(fe, {
          opened: s.value,
          "onUpdate:opened": a[0] || (a[0] = (i) => s.value = i),
          density: "compact"
        }, {
          default: d(() => [
            (p(!0), P(I, null, J(o.value, (i, y) => (p(), g(e(ra), G({
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
  const f = re(t());
  let l = -1;
  function s() {
    clearInterval(l);
  }
  function n() {
    s(), Ae(() => f.value = t());
  }
  function o(u) {
    const c = u ? getComputedStyle(u) : {
      transitionDuration: 0.2
    }, r = parseFloat(c.transitionDuration) * 1e3 || 200;
    if (s(), f.value <= 0) return;
    const a = performance.now();
    l = window.setInterval(() => {
      const i = performance.now() - a + r;
      f.value = Math.max(t() - i, 0), f.value <= 0 && s();
    }, r);
  }
  return Ct(s), {
    clear: s,
    time: f,
    start: o,
    reset: n
  };
}
const ca = Ee({
  multiLine: Boolean,
  text: String,
  timer: [Boolean, String],
  timeout: {
    type: [Number, String],
    default: 5e3
  },
  vertical: Boolean,
  ...ll({
    location: "bottom"
  }),
  ...tl(),
  ...el(),
  ...Zt(),
  ...ql(),
  ...it(al({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
}, "VSnackbar"), va = Se()({
  name: "VSnackbar",
  props: ca(),
  emits: {
    "update:modelValue": (t) => !0
  },
  setup(t, f) {
    let {
      slots: l
    } = f;
    const s = Ve(t, "modelValue"), {
      positionClasses: n
    } = Yt(t), {
      scopeId: o
    } = Ht(), {
      themeClasses: u
    } = zl(t), {
      colorClasses: c,
      colorStyles: r,
      variantClasses: a
    } = Jt(t), {
      roundedClasses: i
    } = Qt(t), y = da(() => Number(t.timeout)), x = W(), $ = W(), L = re(!1), U = re(0), _ = W(), C = B(Xt, void 0);
    Gl(() => !!C, () => {
      const N = nl();
      Ot(() => {
        _.value = N.mainStyles.value;
      });
    }), Z(s, k), Z(() => t.timeout, k), $e(() => {
      s.value && k();
    });
    let w = -1;
    function k() {
      y.reset(), window.clearTimeout(w);
      const N = Number(t.timeout);
      if (!s.value || N === -1) return;
      const ie = Wl($.value);
      y.start(ie), w = window.setTimeout(() => {
        s.value = !1;
      }, N);
    }
    function V() {
      y.reset(), window.clearTimeout(w);
    }
    function F() {
      L.value = !0, V();
    }
    function T() {
      L.value = !1, k();
    }
    function de(N) {
      U.value = N.touches[0].clientY;
    }
    function oe(N) {
      Math.abs(U.value - N.changedTouches[0].clientY) > 50 && (s.value = !1);
    }
    function Ce() {
      L.value && T();
    }
    const ye = D(() => t.location.split(" ").reduce((N, ie) => (N[`v-snackbar--${ie}`] = !0, N), {}));
    return Re(() => {
      const N = qe.filterProps(t), ie = !!(l.default || l.text || t.text);
      return v(qe, G({
        ref: x,
        class: ["v-snackbar", {
          "v-snackbar--active": s.value,
          "v-snackbar--multi-line": t.multiLine && !t.vertical,
          "v-snackbar--timer": !!t.timer,
          "v-snackbar--vertical": t.vertical
        }, ye.value, n.value, t.class],
        style: [_.value, t.style]
      }, N, {
        modelValue: s.value,
        "onUpdate:modelValue": (M) => s.value = M,
        contentProps: G({
          class: ["v-snackbar__wrapper", u.value, c.value, i.value, a.value],
          style: [r.value],
          onPointerenter: F,
          onPointerleave: T
        }, N.contentProps),
        persistent: !0,
        noClickAnimation: !0,
        scrim: !1,
        scrollStrategy: "none",
        _disableGlobalStack: !0,
        onTouchstartPassive: de,
        onTouchend: oe,
        onAfterLeave: Ce
      }, o), {
        default: () => {
          var M, be;
          return [sl(!1, "v-snackbar"), t.timer && !L.value && v("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [v(ol, {
            ref: $,
            color: typeof t.timer == "string" ? t.timer : "info",
            max: t.timeout,
            "model-value": y.time.value
          }, null)]), ie && v("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((M = l.text) == null ? void 0 : M.call(l)) ?? t.text, (be = l.default) == null ? void 0 : be.call(l)]), l.actions && v(lt, {
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
              isActive: s
            })])]
          })];
        },
        activator: l.activator
      });
    }), Ue({}, x);
  }
}), pa = { class: "nav-home" };
var et;
const fa = /* @__PURE__ */ ae({
  __name: "OxApp",
  props: {
    apiUrl: {},
    logo: {},
    dataEl: { default: (et = document.body.dataset) == null ? void 0 : et.appData },
    models: {},
    data: {}
  },
  setup(t) {
    const f = ce(), l = pe(f, "panels."), s = t, n = Te({ drawer: !0 }), o = Bt(s), u = Rt();
    return $e(() => {
      u.panel = o.data.panel;
    }), Z(() => [o.state.state, o.state.data], () => {
      o.showState = !0;
    }), Pt((c, r, a) => {
      o.state.error(`${c}`);
    }), (c, r) => (p(), g(il, null, {
      default: d(() => [
        v(va, {
          modelValue: e(o).showState,
          "onUpdate:modelValue": r[0] || (r[0] = (a) => e(o).showState = a),
          color: e(o).state.color,
          "multi-line": ""
        }, {
          default: d(() => [
            K(le(e(o).state.data), 1)
          ]),
          _: 1
        }, 8, ["modelValue", "color"]),
        v(rl, { color: "primary" }, {
          prepend: d(() => [
            v(at, {
              icon: "mdi-apps",
              title: e(h)("nav.panels"),
              "aria-label": e(h)("nav.panels"),
              onClick: r[1] || (r[1] = Y((a) => n.drawer = !n.drawer, ["stop"]))
            }, null, 8, ["title", "aria-label"])
          ]),
          default: d(() => [
            v(Ye, { id: "app-bar-sheet-title" }),
            v(Ye, { id: "app-bar-title" }, {
              default: d(() => [
                b(c.$slots, "title", { context: e(o) })
              ]),
              _: 3
            }),
            v(ul),
            b(c.$slots, "app-bar-left", { context: e(o) }),
            r[5] || (r[5] = ue("div", {
              id: "app-bar-right",
              class: "mr-3"
            }, null, -1)),
            b(c.$slots, "app-bar-right", { context: e(o) })
          ]),
          _: 3
        }),
        v(e(ua), {
          drawer: n.drawer,
          "onUpdate:drawer": r[3] || (r[3] = (a) => n.drawer = a),
          items: e(o).data.nav
        }, me({
          prepend: d(() => [
            ue("a", pa, [
              c.logo ? (p(), g(dl, {
                key: 0,
                src: c.logo,
                class: "logo"
              }, null, 8, ["src"])) : O("", !0)
            ]),
            b(c.$slots, "nav-start", { context: e(o) })
          ]),
          _: 2
        }, [
          e(f)["nav-end"] ? {
            name: "append",
            fn: d(() => [
              v(fe, {
                opened: n.opened,
                "onUpdate:opened": r[2] || (r[2] = (a) => n.opened = a)
              }, {
                default: d(() => [
                  b(c.$slots, "nav-end", { context: e(o) })
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
              v(nt, {
                modelValue: e(u).panel,
                "onUpdate:modelValue": r[4] || (r[4] = (a) => e(u).panel = a)
              }, {
                default: d((a) => [
                  b(c.$slots, "default", G(a, { context: e(o) })),
                  (p(!0), P(I, null, J(e(l), (i, y) => (p(), g(_e, {
                    key: y,
                    value: i
                  }, {
                    default: d(() => [
                      b(c.$slots, y, G({ ref_for: !0 }, a, { context: e(o) }))
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
}), ma = Ee({
  autoSelectFirst: {
    type: [Boolean, String]
  },
  clearOnSelect: Boolean,
  search: String,
  ...Sl({
    filterKeys: ["title"]
  }),
  ...$l(),
  ...it(xl({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...hl({
    transition: !1
  })
}, "VAutocomplete"), ya = Se()({
  name: "VAutocomplete",
  props: ma(),
  emits: {
    "update:focused": (t) => !0,
    "update:search": (t) => !0,
    "update:modelValue": (t) => !0,
    "update:menu": (t) => !0
  },
  setup(t, f) {
    let {
      slots: l
    } = f;
    const {
      t: s
    } = Yl(), n = W(), o = re(!1), u = re(!0), c = re(!1), r = W(), a = W(), i = re(-1), {
      items: y,
      transformIn: x,
      transformOut: $
    } = vl(t), {
      textColorClasses: L,
      textColorStyles: U
    } = pl(() => {
      var m;
      return (m = n.value) == null ? void 0 : m.color;
    }), _ = Ve(t, "search", ""), C = Ve(t, "modelValue", [], (m) => x(m === null ? [null] : Hl(m)), (m) => {
      const S = $(m);
      return t.multiple ? S : S[0] ?? null;
    }), w = D(() => typeof t.counterValue == "function" ? t.counterValue(C.value) : typeof t.counterValue == "number" ? t.counterValue : C.value.length), k = fl(t), {
      filteredItems: V,
      getMatches: F
    } = ml(t, y, () => u.value ? "" : _.value), T = D(() => t.hideSelected ? V.value.filter((m) => !C.value.some((S) => S.value === m.value)) : V.value), de = D(() => !!(t.chips || l.chip)), oe = D(() => de.value || !!l.selection), Ce = D(() => C.value.map((m) => m.props.value)), ye = D(() => {
      var S;
      return (t.autoSelectFirst === !0 || t.autoSelectFirst === "exact" && _.value === ((S = T.value[0]) == null ? void 0 : S.title)) && T.value.length > 0 && !u.value && !c.value;
    }), N = D(() => t.hideNoData && !T.value.length || k.isReadonly.value || k.isDisabled.value), ie = Ve(t, "menu"), M = D({
      get: () => ie.value,
      set: (m) => {
        var S;
        ie.value && !m && ((S = r.value) != null && S.ΨopenChildren.size) || m && N.value || (ie.value = m);
      }
    }), be = D(() => M.value ? t.closeText : t.openText), Oe = W(), vt = yl(Oe, n);
    function pt(m) {
      t.openOnClear && (M.value = !0), _.value = "";
    }
    function ft() {
      N.value || (M.value = !0);
    }
    function mt(m) {
      N.value || (o.value && (m.preventDefault(), m.stopPropagation()), M.value = !M.value);
    }
    function yt(m) {
      var S;
      m.key !== " " && Qe(m) && ((S = n.value) == null || S.focus());
    }
    function bt(m) {
      var A, j, ee, ne, R;
      if (k.isReadonly.value) return;
      const S = (A = n.value) == null ? void 0 : A.selectionStart, E = C.value.length;
      if (["Enter", "ArrowDown", "ArrowUp"].includes(m.key) && m.preventDefault(), ["Enter", "ArrowDown"].includes(m.key) && (M.value = !0), ["Escape"].includes(m.key) && (M.value = !1), ye.value && ["Enter", "Tab"].includes(m.key) && !C.value.some((H) => {
        let {
          value: q
        } = H;
        return q === T.value[0].value;
      }) && ve(T.value[0]), m.key === "ArrowDown" && ye.value && ((j = Oe.value) == null || j.focus("next")), ["Backspace", "Delete"].includes(m.key)) {
        if (!t.multiple && oe.value && C.value.length > 0 && !_.value) return ve(C.value[0], !1);
        if (~i.value) {
          m.preventDefault();
          const H = i.value;
          ve(C.value[i.value], !1), i.value = H >= E - 1 ? E - 2 : H;
        } else m.key === "Backspace" && !_.value && (i.value = E - 1);
        return;
      }
      if (t.multiple)
        if (m.key === "ArrowLeft") {
          if (i.value < 0 && S && S > 0) return;
          const H = i.value > -1 ? i.value - 1 : E - 1;
          if (C.value[H])
            i.value = H;
          else {
            const q = ((ee = _.value) == null ? void 0 : ee.length) ?? null;
            i.value = -1, (ne = n.value) == null || ne.setSelectionRange(q, q);
          }
        } else if (m.key === "ArrowRight") {
          if (i.value < 0) return;
          const H = i.value + 1;
          C.value[H] ? i.value = H : (i.value = -1, (R = n.value) == null || R.setSelectionRange(0, 0));
        } else ~i.value && Qe(m) && (i.value = -1);
    }
    function gt(m) {
      if (Xe(n.value, ":autofill") || Xe(n.value, ":-webkit-autofill")) {
        const S = y.value.find((E) => E.title === m.target.value);
        S && ve(S);
      }
    }
    function kt() {
      var m;
      t.eager && ((m = a.value) == null || m.calculateVisibleItems());
    }
    function wt() {
      var m;
      o.value && (u.value = !0, (m = n.value) == null || m.focus());
    }
    function Vt(m) {
      o.value = !0, setTimeout(() => {
        c.value = !0;
      });
    }
    function ht(m) {
      c.value = !1;
    }
    function $t(m) {
      (m == null || m === "" && !t.multiple && !oe.value) && (C.value = []);
    }
    const Pe = re(!1);
    function ve(m) {
      let S = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!(!m || m.props.disabled))
        if (t.multiple) {
          const E = C.value.findIndex((j) => (t.valueComparator || Zl)(j.value, m.value)), A = S ?? !~E;
          if (~E) {
            const j = A ? [...C.value, m] : [...C.value];
            j.splice(E, 1), C.value = j;
          } else A && (C.value = [...C.value, m]);
          t.clearOnSelect && (_.value = "");
        } else {
          const E = S !== !1;
          C.value = E ? [m] : [], _.value = E && !oe.value ? m.title : "", Ae(() => {
            M.value = !1, u.value = !0;
          });
        }
    }
    return Z(o, (m, S) => {
      var E;
      m !== S && (m ? (Pe.value = !0, _.value = t.multiple || oe.value ? "" : String(((E = C.value.at(-1)) == null ? void 0 : E.props.title) ?? ""), u.value = !0, Ae(() => Pe.value = !1)) : (!t.multiple && _.value == null && (C.value = []), M.value = !1, (t.multiple || oe.value) && (_.value = ""), i.value = -1));
    }), Z(_, (m) => {
      !o.value || Pe.value || (m && (M.value = !0), u.value = !m);
    }), Z(M, () => {
      if (!t.hideSelected && M.value && C.value.length) {
        const m = T.value.findIndex((S) => C.value.some((E) => S.value === E.value));
        Jl && window.requestAnimationFrame(() => {
          var S;
          m >= 0 && ((S = a.value) == null || S.scrollToIndex(m));
        });
      }
    }), Z(() => t.items, (m, S) => {
      M.value || o.value && !S.length && m.length && (M.value = !0);
    }), Z(C, (m) => {
      var S;
      !t.multiple && !oe.value && (_.value = ((S = m[0]) == null ? void 0 : S.title) ?? "");
    }), Re(() => {
      const m = !!(!t.hideNoData || T.value.length || l["prepend-item"] || l["append-item"] || l["no-data"]), S = C.value.length > 0, E = ke.filterProps(t);
      return v(ke, G({
        ref: n
      }, E, {
        modelValue: _.value,
        "onUpdate:modelValue": [(A) => _.value = A, $t],
        focused: o.value,
        "onUpdate:focused": (A) => o.value = A,
        validationValue: C.externalValue,
        counterValue: w.value,
        dirty: S,
        onChange: gt,
        class: ["v-autocomplete", `v-autocomplete--${t.multiple ? "multiple" : "single"}`, {
          "v-autocomplete--active-menu": M.value,
          "v-autocomplete--chips": !!t.chips,
          "v-autocomplete--selection-slot": !!oe.value,
          "v-autocomplete--selecting-index": i.value > -1
        }, t.class],
        style: t.style,
        readonly: k.isReadonly.value,
        placeholder: S ? void 0 : t.placeholder,
        "onClick:clear": pt,
        "onMousedown:control": ft,
        onKeydown: bt
      }), {
        ...l,
        default: () => v(I, null, [v(st, G({
          ref: r,
          modelValue: M.value,
          "onUpdate:modelValue": (A) => M.value = A,
          activator: "parent",
          contentClass: "v-autocomplete__content",
          disabled: N.value,
          eager: t.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: t.transition,
          onAfterEnter: kt,
          onAfterLeave: wt
        }, t.menuProps), {
          default: () => [m && v(fe, G({
            ref: Oe,
            selected: Ce.value,
            selectStrategy: t.multiple ? "independent" : "single-independent",
            onMousedown: (A) => A.preventDefault(),
            onKeydown: yt,
            onFocusin: Vt,
            onFocusout: ht,
            tabindex: "-1",
            "aria-live": "polite",
            color: t.itemColor ?? t.color
          }, vt, t.listProps), {
            default: () => {
              var A, j, ee;
              return [(A = l["prepend-item"]) == null ? void 0 : A.call(l), !T.value.length && !t.hideNoData && (((j = l["no-data"]) == null ? void 0 : j.call(l)) ?? v(se, {
                key: "no-data",
                title: s(t.noDataText)
              }, null)), v(bl, {
                ref: a,
                renderless: !0,
                items: T.value,
                itemKey: "value"
              }, {
                default: (ne) => {
                  var je;
                  let {
                    item: R,
                    index: H,
                    itemRef: q
                  } = ne;
                  const Ne = G(R.props, {
                    ref: q,
                    key: R.value,
                    active: ye.value && H === 0 ? !0 : void 0,
                    onClick: () => ve(R, null)
                  });
                  return ((je = l.item) == null ? void 0 : je.call(l, {
                    item: R,
                    index: H,
                    props: Ne
                  })) ?? v(se, G(Ne, {
                    role: "option"
                  }), {
                    prepend: (we) => {
                      let {
                        isSelected: St
                      } = we;
                      return v(I, null, [t.multiple && !t.hideSelected ? v(kl, {
                        key: R.value,
                        modelValue: St,
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
                      return u.value ? R.title : gl("v-autocomplete", R.title, (we = F(R)) == null ? void 0 : we.title);
                    }
                  });
                }
              }), (ee = l["append-item"]) == null ? void 0 : ee.call(l)];
            }
          })]
        }), C.value.map((A, j) => {
          function ee(q) {
            q.stopPropagation(), q.preventDefault(), ve(A, !1);
          }
          const ne = {
            "onClick:close": ee,
            onKeydown(q) {
              q.key !== "Enter" && q.key !== " " || (q.preventDefault(), q.stopPropagation(), ee(q));
            },
            onMousedown(q) {
              q.preventDefault(), q.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, R = de.value ? !!l.chip : !!l.selection, H = R ? Xl(de.value ? l.chip({
            item: A,
            index: j,
            props: ne
          }) : l.selection({
            item: A,
            index: j
          })) : void 0;
          if (!(R && !H))
            return v("div", {
              key: A.value,
              class: ["v-autocomplete__selection", j === i.value && ["v-autocomplete__selection--selected", L.value]],
              style: j === i.value ? U.value : {}
            }, [de.value ? l.chip ? v(lt, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: t.closableChips,
                  size: "small",
                  text: A.title
                }
              }
            }, {
              default: () => [H]
            }) : v(Vl, G({
              key: "chip",
              closable: t.closableChips,
              size: "small",
              text: A.title,
              disabled: A.props.disabled
            }, ne), null) : H ?? v("span", {
              class: "v-autocomplete__selection-text"
            }, [A.title, t.multiple && j < C.value.length - 1 && v("span", {
              class: "v-autocomplete__selection-comma"
            }, [K(",")])])]);
        })]),
        "append-inner": function() {
          var ne, R;
          for (var A = arguments.length, j = new Array(A), ee = 0; ee < A; ee++)
            j[ee] = arguments[ee];
          return v(I, null, [(ne = l["append-inner"]) == null ? void 0 : ne.call(l, ...j), t.menuIcon ? v(te, {
            class: "v-autocomplete__menu-icon",
            color: (R = n.value) == null ? void 0 : R.fieldIconColor,
            icon: t.menuIcon,
            onMousedown: mt,
            onClick: Ql,
            "aria-label": s(be.value),
            title: s(be.value),
            tabindex: "-1"
          }, null) : void 0]);
        }
      });
    }), Ue({
      isFocused: o,
      isPristine: u,
      menu: M,
      search: _,
      filteredItems: V,
      select: ve
    }, n);
  }
}), ba = /* @__PURE__ */ ae({
  __name: "OxAutocomplete",
  props: /* @__PURE__ */ De({
    repo: {},
    lookup: { default: "search" },
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
    var C;
    const f = ce(), l = Me(t, "modelValue"), s = W(null), n = W(""), o = t, u = At(), c = B("repos"), r = Ut(o, ["repo", "search"]), { list: a, items: i } = Et({
      ...(C = r.value) == null ? void 0 : C[1],
      filters: o.filters || {},
      save: !1,
      query: Kt(o.repo, c)
    });
    var y = null;
    async function x(w) {
      if (console.log("getitem", w, s.value), w) {
        const k = a.findIndex(w);
        if (console.log("getitem.find", k), k != -1)
          s.value = a.items[k];
        else if (y != w) {
          console.log("getitem.load"), y = w;
          const F = (await a.load({ id: w, append: 0 })).entities[0];
          s.value = F.id == w ? F : null;
        }
      } else
        s.value = null;
      return s;
    }
    let $ = null;
    const L = Ze.debounce(async ({ reset: w = !1 } = {}) => {
      const k = n.value != "<empty string>" && n.value || "";
      if (console.log("load", k, $, s.value), !w && k == $)
        return;
      $ = k, a.filters = { ...o.filters }, a.filters[o.lookup] = k, console.log("load.load", a.filters, s.value);
      let V = await a.load();
      return console.log("load.item.value", s.value), s.value && a.add(s.value, 0), w || (console.log("load.reset", s.value, n.value, k), !s.value && await x(l.value), (!n.value || n.value == "<empty string>") && (n.value = k)), V;
    }, 300);
    function U(w) {
      Ze.isEqual(ze(a.filters), ze(w)) || L({ reset: !0 });
    }
    function _(w) {
      w != "<empty string>" && w != $ && (console.log("search updated >", `"${w}"`, $), L({ q: w }));
    }
    return $e(() => {
      var w;
      o.filters && Object.values(o.filters).length ? U(o.filters) : (w = a.load()) == null || w.then(() => x(l.value));
    }), Z(() => o.filters, (w) => U(w)), Z(n, _), Z(l, (w, k) => {
      console.log("value", w, k), w != k && x(w);
    }), (w, k) => (p(), g(e(ya), G(e(u), {
      items: e(i),
      loading: e(a).state.isProcessing,
      modelValue: l.value,
      "onUpdate:modelValue": k[0] || (k[0] = (V) => l.value = V),
      search: n.value,
      "onUpdate:search": k[1] || (k[1] = (V) => n.value = V)
    }), me({ _: 2 }, [
      J(e(f), (V, F) => ({
        name: F,
        fn: d((T) => [
          b(w.$slots, F, Q(X(T)))
        ])
      }))
    ]), 1040, ["items", "loading", "modelValue", "search"]));
  }
}), ga = {
  props: {
    src: String,
    is: String
  },
  setup(t) {
    const f = re(null), l = D(() => {
      if (t.is)
        return t.is;
      let n = t.src.substring(t.src.lastIndexOf("/") + 1);
      if (n && (n = n.substring(0, n.indexOf("."))), !n)
        throw Error(
          "`is` not provided and could not be deducted from `src`."
        );
      return n;
    });
    function s() {
      f.value = Nt(t.src, l.value);
    }
    return Z(() => t.src, s), s(), () => Tt(f.value, t);
  }
}, ka = { class: "text-error" }, Le = {
  __name: "OxFieldDetails",
  props: {
    state: Object,
    errors: Array
  },
  setup(t) {
    const f = t;
    return (l, s) => f.errors ? (p(!0), P(I, { key: 0 }, J(f.errors, (n) => (p(), P("div", ka, [
      v(te, { icon: "mdi-alert-circle-outline" }),
      K(" " + le(n), 1)
    ]))), 256)) : O("", !0);
  }
}, rt = {
  __name: "OxListFilters",
  props: {
    search: String
  },
  setup(t, { expose: f }) {
    const l = B("list"), s = t, n = D(() => {
      const c = l.filters;
      return c && Object.entries(c).some(
        ([r, a]) => !r.startsWith("page") && !r.startsWith("ordering") && !!a
      );
    }), o = D(() => n.value ? "mdi-filter-check" : "mdi-filter-outline");
    function u() {
      l.filters = {}, l.load();
    }
    return f({ icon: o, hasFilters: n, reset: u }), (c, r) => (p(), P("form", {
      onSubmit: r[2] || (r[2] = Y((a) => e(l).load(), ["prevent"])),
      class: "ox-list-filters width-full"
    }, [
      v(Cl, {
        dense: "",
        color: "transparent"
      }, {
        default: d(() => [
          v(at, {
            icon: o.value,
            readonly: ""
          }, null, 8, ["icon"]),
          s.search && e(l).filters ? (p(), g(ke, {
            key: 0,
            label: e(h)("filters.search"),
            density: "compact",
            class: "ml-2",
            modelValue: e(l).filters[s.search],
            "onUpdate:modelValue": r[0] || (r[0] = (a) => e(l).filters[s.search] = a),
            "hide-details": ""
          }, null, 8, ["label", "modelValue"])) : O("", !0),
          b(c.$slots, "default", {
            list: e(l),
            filters: e(l).filters
          }),
          v(z, {
            onClick: r[1] || (r[1] = Y((a) => e(l).load(), ["stop"])),
            class: "ml-2",
            icon: "mdi-check",
            "aria-label": c.$t("filters.apply"),
            title: e(h)("filters.apply")
          }, null, 8, ["aria-label", "title"]),
          n.value ? (p(), g(z, {
            key: 1,
            onClick: Y(u, ["stop"]),
            icon: "mdi-backspace",
            "aria-label": e(h)("filters.reset"),
            title: e(h)("filters.reset")
          }, null, 8, ["aria-label", "title"])) : O("", !0)
        ]),
        _: 3
      })
    ], 32));
  }
}, wa = Ee({
  ...Al(),
  ...Pl()
}, "VForm"), Fe = Se()({
  name: "VForm",
  props: wa(),
  emits: {
    "update:modelValue": (t) => !0,
    submit: (t) => !0
  },
  setup(t, f) {
    let {
      slots: l,
      emit: s
    } = f;
    const n = Ol(t), o = W();
    function u(r) {
      r.preventDefault(), n.reset();
    }
    function c(r) {
      const a = r, i = n.validate();
      a.then = i.then.bind(i), a.catch = i.catch.bind(i), a.finally = i.finally.bind(i), s("submit", a), a.defaultPrevented || i.then((y) => {
        var $;
        let {
          valid: x
        } = y;
        x && (($ = o.value) == null || $.submit());
      }), a.preventDefault();
    }
    return Re(() => {
      var r;
      return v("form", {
        ref: o,
        class: ["v-form", t.class],
        style: t.style,
        novalidate: !0,
        onReset: u,
        onSubmit: c
      }, [(r = l.default) == null ? void 0 : r.call(l, n)]);
    }), Ue(n, o);
  }
}), Va = { class: "flex-row justify-right" }, ha = /* @__PURE__ */ ae({
  __name: "OxFormList",
  props: /* @__PURE__ */ De({
    useModel: Function,
    editable: Boolean
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(t) {
    var a;
    const f = Me(t, "modelValue"), l = B("user"), s = W({}), n = t, o = D(() => ({
      add: n.editable && l.can([n.useModel, "add"]),
      change: n.editable && l.can([n.useModel, "change"]),
      delete: n.editable && l.can([n.useModel, "delete"])
    })), u = W([]);
    (a = f.value) != null && a.length || u.value.push(-1);
    function c() {
      f.value.push(s.value), s.value = {};
    }
    function r(i) {
      confirm(h("actions.delete.confirm")) && n.delete && f.value.splice(i);
    }
    return (i, y) => (p(), g(fe, {
      opened: u.value,
      "onUpdate:opened": y[3] || (y[3] = (x) => u.value = x)
    }, {
      default: d(() => {
        var x;
        return [
          (x = f.value) != null && x.length ? (p(!0), P(I, { key: 0 }, J(f.value, ($, L) => (p(), g(Ie, {
            key: L,
            value: L
          }, {
            activator: d(({ props: U }) => [
              v(se, G({ ref_for: !0 }, U), {
                append: d(() => [
                  ue("div", {
                    onClick: y[0] || (y[0] = Y(() => {
                    }, ["stop"]))
                  }, [
                    b(i.$slots, "item.actions", G({
                      item: $,
                      index: L,
                      ref_for: !0
                    }, U)),
                    o.value.delete ? (p(), g(z, {
                      key: 0,
                      type: "button",
                      class: "ml-2",
                      size: "small",
                      onClick: Y((_) => r(L), ["stop", "prevent"]),
                      color: "error",
                      "aria-label": e(h)("actions.remove"),
                      title: e(h)("actions.remove"),
                      icon: "mdi-delete"
                    }, null, 8, ["onClick", "aria-label", "title"])) : O("", !0)
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
              v(Fe, {
                disabled: !o.value.change
              }, {
                default: d(() => [
                  b(i.$slots, "item", {
                    item: $,
                    index: L,
                    editable: o.value.change
                  })
                ]),
                _: 2
              }, 1032, ["disabled"])
            ]),
            _: 2
          }, 1032, ["value"]))), 128)) : (p(), g(se, {
            key: 1,
            title: e(h)("lists.empty")
          }, null, 8, ["title"])),
          o.value.add ? (p(), P(I, { key: 2 }, [
            f.value.length ? (p(), g(Be, { key: 0 })) : O("", !0),
            v(Ie, { value: -1 }, {
              activator: d(({ props: $ }) => [
                v(se, G($, {
                  title: e(h)("actions.add_item"),
                  "prepend-icon": "mdi-plus"
                }), null, 16, ["title"])
              ]),
              default: d(() => [
                v(Fe, null, {
                  default: d(() => [
                    b(i.$slots, "item", {
                      item: s.value,
                      edit: !0
                    })
                  ]),
                  _: 3
                }),
                s.value ? (p(), g(se, { key: 0 }, {
                  default: d(() => [
                    ue("div", Va, [
                      s.value ? (p(), g(z, {
                        key: 0,
                        size: "small",
                        onClick: y[1] || (y[1] = ($) => s.value = {}),
                        color: "secondary",
                        "prepend-icon": "mdi-backspace",
                        "aria-label": e(h)("actions.discard")
                      }, {
                        default: d(() => [
                          K(le(e(h)("actions.discard")), 1)
                        ]),
                        _: 1
                      }, 8, ["aria-label"])) : O("", !0),
                      s.value ? (p(), g(z, {
                        key: 1,
                        size: "small",
                        onClick: y[2] || (y[2] = ($) => c()),
                        color: "primary",
                        "prepend-icon": "mdi-plus",
                        "aria-label": e(h)("actions.add")
                      }, {
                        default: d(() => [
                          K(le(e(h)("actions.add")), 1)
                        ]),
                        _: 1
                      }, 8, ["aria-label"])) : O("", !0)
                    ])
                  ]),
                  _: 1
                })) : O("", !0)
              ]),
              _: 3
            })
          ], 64)) : O("", !0)
        ];
      }),
      _: 3
    }, 8, ["opened"]));
  }
}), $a = Se()({
  name: "VSlideGroupItem",
  props: Il(),
  emits: {
    "group:selected": (t) => !0
  },
  setup(t, f) {
    let {
      slots: l
    } = f;
    const s = _l(t, Ll);
    return () => {
      var n;
      return (n = l.default) == null ? void 0 : n.call(l, {
        isSelected: s.isSelected.value,
        select: s.select,
        toggle: s.toggle,
        selectedClass: s.selectedClass.value
      });
    };
  }
}), Sa = {
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
  setup(t, { emit: f }) {
    const l = f;
    B("list");
    const s = B("items"), n = t;
    function o(r) {
      return r = r % n.colors.length, n.colorVariant ? n.colors[r] + "-" + n.colorVariant : n.colors[r];
    }
    function u(r, a, i) {
      r[i] ? !r[i].includes(a) && r[i].push(a) : r[i] = [a];
    }
    const c = D(() => {
      const r = {};
      if (s.value)
        for (var a of s.value) {
          const y = a[n.field];
          if (Array.isArray(y))
            if (y.length)
              for (var i of y)
                u(r, a, i);
            else
              u(r, a, null);
          else
            u(r, a, y);
        }
      return r;
    });
    return (r, a) => (p(), g(ot, null, {
      default: d(() => [
        v(Fl, null, {
          default: d(() => [
            (p(!0), P(I, null, J(n.headers, (i, y) => (p(), g($a, {
              key: i.value
            }, {
              default: d(({ selectedClass: x }) => [
                v(Dl, {
                  width: "400",
                  class: It(["ma-3", x]),
                  color: o(y),
                  lines: "two"
                }, {
                  default: d(() => [
                    v(Ml, null, {
                      default: d(() => [
                        K(le(i.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    v(fe, {
                      "bg-color": o(y)
                    }, {
                      default: d(() => [
                        c.value && c.value[i.value] ? (p(!0), P(I, { key: 0 }, J(c.value[i.value], ($) => b(r.$slots, "item", {
                          key: $.id,
                          header: i,
                          item: $
                        }, () => [
                          v(se, {
                            title: $[n.itemTitle],
                            value: n.itemValue && $[n.itemValue],
                            onClick: (L) => l("click", $)
                          }, {
                            append: d(() => [
                              b(r.$slots, "item.action")
                            ]),
                            _: 2
                          }, 1032, ["title", "value", "onClick"])
                        ])), 128)) : O("", !0)
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
}, ut = /* @__PURE__ */ ae({
  __name: "OxListTable",
  props: {
    // list: Object,
    /** Table headers */
    headers: Array,
    /** If True, allow user to edit (display edit button) */
    edit: Boolean
  },
  setup(t) {
    const f = ce(), l = ea(f, "item.", { exclude: ["item.actions"] }), s = B("panel"), n = B("list"), o = B("items"), u = B("user"), c = t, r = D(() => c.headers.reduce((y, x) => (y.push(
      typeof x == "string" ? { key: x, title: h(jt.field(x)) } : x
    ), y), []));
    function a(y) {
      n.filters.page = y.page, n.filters.page_size = y.itemsPerPage, n.filters.ordering = y.sortBy.map(({ key: x, order: $ }) => $ == "asc" ? x : `-${x}`);
    }
    function i(y, x) {
      s.show({ view: "detail.edit", value: x });
    }
    return (y, x) => {
      var $;
      return p(), g(Bl, {
        items: e(o),
        "item-index": "id",
        "items-length": e(n).count || e(o).length,
        "items-per-page": c.itemsPerPage,
        loading: ($ = e(n).state) == null ? void 0 : $.isProcessing,
        headers: r.value,
        "no-data-text": e(h)("lists.empty"),
        class: "align-top-table",
        "onUpdate:options": a
      }, me({
        loading: d(() => [
          v(Rl, { type: "table-row@10" })
        ]),
        "item.actions": d(({ item: L }) => [
          e(u).can([L.constructor, "change"]) ? (p(), g(he, {
            key: 0,
            icon: "mdi-pencil",
            button: "",
            title: e(h)("actions.edit"),
            item: L,
            run: i
          }, null, 8, ["title", "item"])) : e(u).can([L.constructor, "view"]) ? (p(), g(he, {
            key: 1,
            icon: "mdi-eye-outline",
            button: "",
            title: e(h)("actions.edit"),
            item: L,
            run: i
          }, null, 8, ["title", "item"])) : O("", !0),
          b(y.$slots, "item.actions", {
            value: L,
            dense: !0,
            button: !0
          })
        ]),
        _: 2
      }, [
        J(e(l), (L, U) => ({
          name: U,
          fn: d((_) => [
            b(y.$slots, U, Q(X(_)))
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
    const f = ce(), l = t;
    let s = W(!1);
    Z(() => l.state.state, (u) => {
      l.delay && u == ta.PROCESSING && (s.value = !1, window.setTimeout(() => {
        s.value = !0;
      }, 5e3));
    });
    const n = D(() => {
      var u;
      return ((u = l.state) == null ? void 0 : u.isProcessing) && (!l.delay || s.value);
    }), o = D(() => {
      var u, c;
      return (c = (u = l.state) == null ? void 0 : u.data) == null ? void 0 : c.messages;
    });
    return (u, c) => (p(), P(I, null, [
      l.state.isNone && e(f).none ? (p(), g(e(ge), {
        key: 0,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        state: t.state,
        title: t.noneTitle
      }, {
        default: d(() => [
          b(u.$slots, "none", { state: t.state })
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
          b(u.$slots, "processing", { state: t.state }, () => [
            c[0] || (c[0] = K(" Data are being sent to server, please be patient. If this message persist you might wan't to retry. "))
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
          b(u.$slots, "error", { state: t.state }, () => [
            c[1] || (c[1] = K(" Oups... something wrong happened. "))
          ]),
          b(u.$slots, "error-detail", { state: t.state })
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
          b(u.$slots, "ok", { state: t.state }, () => [
            c[2] || (c[2] = ue("p", null, "Congrats! Data have been updated.", -1))
          ]),
          o.value ? (p(), P(I, { key: 0 }, [
            v(Be),
            (p(!0), P(I, null, J(o.value, (r) => (p(), P("p", null, le(r), 1))), 256))
          ], 64)) : O("", !0),
          b(u.$slots, "ok-detail", { state: t.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : O("", !0),
      b(u.$slots, "default", {
        state: l.state
      })
    ], 64));
  }
}, xa = { class: "text-right" }, Ke = {
  __name: "OxValidationBtn",
  props: {
    resetLabel: { type: String, default: "Reset" },
    resetIcon: { type: String, default: "mdi-close-circle" },
    validateLabel: { type: String, default: "Save" },
    validateIcon: { type: String, default: "mdi-content-save" },
    disabled: { type: Boolean, default: !1 },
    state: { type: Object, default: () => State.none() },
    validateDisabled: { type: Boolean, default: !1 }
  },
  emits: ["validate", "reset"],
  setup(t, { emit: f }) {
    const l = f, s = t;
    return (n, o) => (p(), P("div", xa, [
      v(e(z), {
        color: "error",
        class: "me-2",
        "prepend-icon": s.resetIcon,
        onClick: o[0] || (o[0] = (u) => l("reset")),
        disabled: s.disabled
      }, {
        default: d(() => [
          b(n.$slots, "reset", {}, () => [
            K(le(s.resetLabel), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]),
      s.state.isSending || s.state.isProcessing ? (p(), g(e(z), {
        key: 0,
        color: "primary",
        "prepend-icon": "mdi-content-save",
        disabled: ""
      }, {
        default: d(() => o[2] || (o[2] = [
          K(" Saving ")
        ])),
        _: 1
      })) : (p(), g(e(z), {
        key: 1,
        color: "primary",
        "prepend-icon": s.validateIcon,
        onClick: o[1] || (o[1] = (u) => l("validate")),
        disabled: s.disabled || s.validateDisabled
      }, {
        default: d(() => [
          b(n.$slots, "validate", {}, () => [
            K(le(s.validateLabel), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]))
    ]));
  }
}, Ca = { key: 0 }, Oa = { class: "text-right mt-3" }, Pa = {
  __name: "OxLogin",
  props: {
    next: { type: String },
    url: { type: String }
  },
  emits: ["save", "saved"],
  setup(t, { emit: f }) {
    const l = tt("password"), s = t, n = Te({
      username: "",
      password: ""
    }), o = W(!1), u = Te(new la());
    function c(a = !0) {
      na(n, { username: "", password: "" }), a && u.none();
    }
    async function r() {
      u.processing();
      try {
        const a = await fetch(s.url, {
          method: "POST",
          headers: aa.axiosConfig.headers,
          body: JSON.stringify(n)
        });
        a.status == 200 ? (n.credentials = "", n.password = "", u.ok(await a.json()), s.next && (window.location.href = s.next)) : u.error(await a.json());
      } catch (a) {
        u.ok((a == null ? void 0 : a.message) || a);
      }
    }
    return (a, i) => (p(), P(I, null, [
      v(e(xe), { state: u }, {
        none: d(({ state: y }) => i[7] || (i[7] = [
          ue("p", null, "Please enter your credentials in order too proceed...", -1)
        ])),
        "ok-detail": d(({ state: y }) => [
          s.next ? (p(), P("p", Ca, [
            i[8] || (i[8] = K("You soon will be redirected to ")),
            ue("i", null, le(s.next), 1)
          ])) : O("", !0)
        ]),
        error: d(({ state: y }) => {
          var x, $;
          return [
            v(Le, {
              errors: (x = y.data) == null ? void 0 : x.username
            }, null, 8, ["errors"]),
            v(Le, {
              errors: ($ = y.data) == null ? void 0 : $.password
            }, null, 8, ["errors"])
          ];
        }),
        _: 1
      }, 8, ["state"]),
      u.isOk ? O("", !0) : (p(), P(I, { key: 0 }, [
        v(ke, {
          variant: "underlined",
          label: "Enter login",
          modelValue: n.username,
          "onUpdate:modelValue": i[0] || (i[0] = (y) => n.username = y),
          onKeyup: i[1] || (i[1] = Ge(Y((y) => e(l).focus(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue"]),
        v(ke, {
          variant: "underlined",
          ref: "password",
          label: "Enter password",
          modelValue: n.password,
          "onUpdate:modelValue": i[2] || (i[2] = (y) => n.password = y),
          type: o.value ? "text" : "password",
          "append-icon": o.value ? "mdi-eye" : "mdi-eye-off",
          "onClick:append": i[3] || (i[3] = (y) => o.value = !o.value),
          onKeyup: i[4] || (i[4] = Ge(Y((y) => r(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue", "type", "append-icon"]),
        ue("div", Oa, [
          b(a.$slots, "default", {
            value: n.password
          }, () => [
            n.username && n.password ? (p(), g(Ke, {
              key: 0,
              "validate-label": "Login!",
              onValidate: i[5] || (i[5] = (y) => r()),
              onReset: i[6] || (i[6] = (y) => c()),
              state: u
            }, null, 8, ["state"])) : O("", !0)
          ])
        ])
      ], 64))
    ], 64));
  }
}, dt = /* @__PURE__ */ ae({
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
    const f = ce(), l = t, s = pe(f, "views."), n = W(!1);
    $e(() => {
      n.value = !0;
    }), _t(() => {
      n.value = !1;
    });
    const o = B("panels"), u = B("panel");
    return (c, r) => (p(), P(I, null, [
      l.state ? (p(), g(xe, {
        key: 0,
        state: l.state,
        delay: ""
      }, null, 8, ["state"])) : O("", !0),
      v(ot, { class: "ma-4" }, {
        default: d(() => [
          (p(), g(We, {
            to: "#app-bar-sheet-title",
            disabled: !n.value || e(o).panel != l.name
          }, [
            l.icon ? (p(), g(te, {
              key: 0,
              icon: l.icon
            }, null, 8, ["icon"])) : O("", !0),
            K(" " + le(l.title) + " ", 1),
            b(c.$slots, "append-title")
          ], 8, ["disabled"])),
          (p(), g(We, {
            to: "#app-bar-right",
            disabled: !n.value || e(o).panel != l.name
          }, [
            b(c.$slots, "app-bar-right"),
            l.help ? (p(), g(z, {
              key: 0,
              class: "ml-3",
              href: l.help,
              panels: "new",
              icon: "mdi-information-outline"
            }, null, 8, ["href"])) : O("", !0)
          ], 8, ["disabled"])),
          b(c.$slots, "top"),
          b(c.$slots, "default", {}, () => [
            e(s) ? (p(), g(Ul, {
              key: 0,
              modelValue: e(u).view,
              "onUpdate:modelValue": r[0] || (r[0] = (a) => e(u).view = a)
            }, {
              default: d(() => [
                (p(!0), P(I, null, J(e(s), (a, i) => (p(), g(El, {
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
            }, 8, ["modelValue"])) : O("", !0)
          ]),
          b(c.$slots, "bottom")
        ]),
        _: 3
      })
    ], 64));
  }
}), ct = /* @__PURE__ */ ae({
  __name: "OxView",
  props: {
    /** default tab title */
    title: String
  },
  setup(t) {
    const f = t, l = W(null), s = ce(), n = pe(s, "tab.", { exclude: "tab.default" }), o = pe(s, "window.");
    return (u, c) => e(n) && Object.keys(e(n)).length ? (p(), P(I, { key: 0 }, [
      v(Kl, {
        modelValue: l.value,
        "onUpdate:modelValue": c[0] || (c[0] = (r) => l.value = r)
      }, {
        default: d(() => [
          e(s).default ? b(u.$slots, "tab", { key: 0 }, () => [
            v(He, {
              text: f == null ? void 0 : f.title,
              value: "default"
            }, null, 8, ["text"])
          ]) : O("", !0),
          (p(!0), P(I, null, J(e(n), (r, a) => (p(), g(He, { value: r }, {
            default: d(() => [
              b(u.$slots, a)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"]),
      v(nt, {
        modelValue: l.value,
        "onUpdate:modelValue": c[1] || (c[1] = (r) => l.value = r)
      }, {
        default: d(() => [
          e(s).default ? (p(), g(_e, {
            key: 0,
            value: "default"
          }, {
            default: d(() => [
              b(u.$slots, "default")
            ]),
            _: 3
          })) : O("", !0),
          (p(!0), P(I, null, J(e(o), (r, a) => (p(), g(_e, { value: r }, {
            default: d(() => [
              b(u.$slots, a)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"])
    ], 64)) : b(u.$slots, "default", { key: 1 });
  }
}), Aa = { class: "mb-3" }, Ta = /* @__PURE__ */ ae({
  __name: "OxModelEdit",
  props: {
    repo: {},
    initial: {},
    name: {},
    url: {},
    saved: { type: Function }
  },
  setup(t, { expose: f }) {
    const l = W(null), s = B("context"), n = t, { editor: o, edited: u } = zt({ props: n }), c = D(() => s.user.can([o.repo.use, "change"])), r = D(() => ({
      editor: o,
      edited: u,
      editable: c.value,
      disabled: !c.value,
      value: o.value,
      model: o.repo.use
    }));
    return Z(() => o.errors && Object.values(o.errors), () => l.value.validate()), f({ editor: o, edited: u }), (a, i) => (p(), P(I, null, [
      v(xe, {
        state: e(o).state
      }, null, 8, ["state"]),
      ue("div", Aa, [
        c.value && e(u) ? (p(), g(Ke, {
          key: 0,
          onValidate: i[0] || (i[0] = (y) => e(o).save()),
          onReset: i[1] || (i[1] = (y) => e(o).discard()),
          state: e(o).state,
          "validate-disabled": e(o).valid === !1
        }, null, 8, ["state", "validate-disabled"])) : O("", !0)
      ]),
      v(Nl, { class: "ox-model-edit" }, {
        default: d(() => [
          v(Fe, {
            ref_key: "form",
            ref: l,
            modelValue: e(o).valid,
            "onUpdate:modelValue": i[2] || (i[2] = (y) => e(o).valid = y),
            disabled: !c.value
          }, {
            default: d(() => [
              b(a.$slots, "default", Q(X(r.value)))
            ]),
            _: 3
          }, 8, ["modelValue", "disabled"]),
          b(a.$slots, "append", Q(X(r.value)))
        ]),
        _: 3
      })
    ], 64));
  }
}), Ia = /* @__PURE__ */ ae({
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
  setup(t, { expose: f }) {
    const l = ce(), s = pe(l, "views.list."), n = pe(l, "item."), o = pe(l, "views.detail.edit."), u = tt("filters"), c = t, r = B("context"), { panel: a, list: i, items: y, next: x, prev: $ } = B("panel") ?? Gt({ props: c }), L = a.panels;
    D(() => {
      var k;
      return r.user.can([a.model, (k = a.value) != null && k.id ? "change" : "add"]);
    });
    const { showFilters: U } = Lt(a), _ = D(() => [
      ...c.headers,
      { key: "actions", title: h("actions") }
    ]);
    function C(k) {
      k != null && k.id ? a.value = a.repo.whereId(k.id).first() : a.value = k, i.load();
    }
    const w = D(() => ({
      panel: a,
      panels: L,
      list: i,
      items: y,
      context: r,
      value: a.value
    }));
    return Z(() => Object.values(i.filters), () => i.load()), f({ list: i, panel: a, items: y, next: x, prev: $ }), (k, V) => (p(), g(dt, {
      name: c.name,
      title: e(a).title,
      icon: e(a).icon,
      state: e(i).state,
      index: c.index
    }, me({
      "app-bar-right": d(() => [
        b(k.$slots, "app-bar-right", Q(X(w.value))),
        e(a).view.startsWith("list.") ? (p(), g(Je, {
          key: 0,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: d(() => [
            b(k.$slots, "nav.list", Q(X(w.value))),
            e(u) ? (p(), g(z, {
              key: 0,
              title: e(U) ? e(h)("filters.hide") : e(h)("filters.show"),
              "aria-label": e(U) ? e(h)("filters.hide") : e(h)("filters.show"),
              onClick: V[0] || (V[0] = (F) => U.value = !e(U)),
              active: e(U)
            }, {
              default: d(() => [
                v(te, {
                  icon: e(u).icon
                }, null, 8, ["icon"])
              ]),
              _: 1
            }, 8, ["title", "aria-label", "active"])) : O("", !0)
          ]),
          _: 3
        })) : e(a).view.startsWith("detail.") && e(a).value ? (p(), g(Je, {
          key: 1,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: d(() => [
            b(k.$slots, "nav.detail", Q(X(w.value))),
            e(a).view == "detail.edit" && e(a).value ? (p(), g(st, { key: 0 }, {
              activator: d(({ props: F }) => [
                v(z, G({ "prepend-icon": "mdi-dots-vertical" }, F), {
                  default: d(() => [
                    K(le(e(h)("actions")), 1)
                  ]),
                  _: 2
                }, 1040)
              ]),
              default: d(() => [
                v(fe, null, {
                  default: d(() => [
                    b(k.$slots, "item.actions", {
                      value: e(a).value
                    })
                  ]),
                  _: 3
                })
              ]),
              _: 3
            })) : O("", !0),
            v(z, {
              disabled: !e($),
              title: e(h)("prev"),
              "aria-label": e(h)("prev"),
              onClick: V[1] || (V[1] = Y((F) => e(a).show({ view: e(a).view, value: e($) }), ["stop"]))
            }, {
              default: d(() => [
                v(te, { icon: "mdi-chevron-left" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"]),
            v(z, {
              disabled: !e(x),
              title: e(h)("next"),
              "aria-label": e(h)("next"),
              onClick: V[2] || (V[2] = Y((F) => e(a).show({ view: e(a).view, value: e(x) }), ["stop"]))
            }, {
              default: d(() => [
                v(te, { icon: "mdi-chevron-right" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"])
          ]),
          _: 3
        })) : O("", !0),
        v(jl, {
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal",
          mandatory: "",
          modelValue: e(a).view,
          "onUpdate:modelValue": V[8] || (V[8] = (F) => e(a).view = F)
        }, {
          default: d(() => {
            var F;
            return [
              v(z, {
                value: "list.table",
                onClick: V[3] || (V[3] = Y((T) => e(a).show({ view: "list.table" }), ["stop"])),
                title: e(h)("panels.nav.table"),
                "aria-label": e(h)("panels.nav.table")
              }, {
                default: d(() => [
                  v(te, null, {
                    default: d(() => V[9] || (V[9] = [
                      K("mdi-table")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"]),
              e(l)["views.list.cards"] ? (p(), g(z, {
                key: 0,
                value: "list.cards",
                onClick: V[4] || (V[4] = Y((T) => e(a).show({ view: "list.cards" }), ["stop"])),
                title: e(h)("panels.nav.cards"),
                "aria-label": e(h)("panels.nav.cards")
              }, {
                default: d(() => [
                  v(te, null, {
                    default: d(() => V[10] || (V[10] = [
                      K("mdi-card-account-details")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : O("", !0),
              e(l)["views.list.kanban"] ? (p(), g(z, {
                key: 1,
                value: "list.kanban",
                onClick: V[5] || (V[5] = Y((T) => e(a).show({ view: "list.kanban" }), ["stop"])),
                title: e(h)("panels.nav.kanban"),
                "aria-label": e(h)("panels.nav.kanban")
              }, {
                default: d(() => [
                  v(te, null, {
                    default: d(() => V[11] || (V[11] = [
                      K("mdi-view-column")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : O("", !0),
              e(o) ? (p(), g(z, {
                key: 2,
                value: "detail.add",
                onClick: V[6] || (V[6] = Y((T) => e(a).create(), ["stop"])),
                title: e(h)("panels.nav.add"),
                "aria-label": e(h)("panels.nav.add")
              }, {
                default: d(() => [
                  v(te, null, {
                    default: d(() => V[12] || (V[12] = [
                      K("mdi-plus-box")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : O("", !0),
              e(l)["views.detail.edit"] || e(o) ? (p(), g(z, {
                key: 3,
                value: "detail.edit",
                onClick: V[7] || (V[7] = Y((T) => e(a).show({ view: "detail.edit", value: e(a).value }), ["stop"])),
                disabled: !((F = e(a).value) != null && F.id),
                title: e(h)("panels.nav.edit"),
                "aria-label": e(h)("panels.nav.edit")
              }, {
                default: d(() => [
                  v(te, null, {
                    default: d(() => V[13] || (V[13] = [
                      K("mdi-pencil")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"])) : O("", !0),
              b(k.$slots, "nav.views", Q(X(w.value)))
            ];
          }),
          _: 3
        }, 8, ["modelValue"]),
        b(k.$slots, "app-bar-end", Q(X(w.value)))
      ]),
      top: d(() => [
        c.warning ? (p(), g(ge, {
          key: 0,
          type: "warning",
          variant: "tonal",
          text: c.warning
        }, null, 8, ["text"])) : O("", !0),
        b(k.$slots, "top"),
        Ft(v(rt, {
          ref_key: "filters",
          ref: u,
          search: c.search,
          "teleport-to": "#panel-list-actions"
        }, {
          default: d((F) => [
            b(k.$slots, "list.filters", Q(X(F)))
          ]),
          _: 3
        }, 8, ["search"]), [
          [Dt, e(a).view.startsWith("list.") && e(U)]
        ])
      ]),
      _: 2
    }, [
      e(l)["append-title"] ? {
        name: "append-title",
        fn: d(() => [
          b(k.$slots, "append-title", Q(X(w.value)))
        ]),
        key: "0"
      } : void 0,
      e(l)["views.list.table"] ? void 0 : {
        name: "views.list.table",
        fn: d(() => [
          v(ut, { headers: _.value }, me({ _: 2 }, [
            J(e(n), (F, T) => ({
              name: T,
              fn: d((de) => [
                b(k.$slots, T, Q(X(de)))
              ])
            }))
          ]), 1032, ["headers"])
        ]),
        key: "1"
      },
      J(e(s), (F, T) => ({
        name: T,
        fn: d(() => [
          b(k.$slots, T, Q(X(w.value)))
        ])
      })),
      e(l)["views.detail.edit"] || e(o) ? {
        name: "views.detail.edit",
        fn: d(() => [
          v(e(ct), {
            title: e(h)(`models.${e(a).model.entity}`)
          }, me({ _: 2 }, [
            J(e(o), (F, T) => ({
              name: F,
              fn: d(() => [
                b(k.$slots, T, {
                  saved: C,
                  value: e(a).value
                })
              ])
            }))
          ]), 1032, ["title"])
        ]),
        key: "2"
      } : void 0
    ]), 1032, ["name", "title", "icon", "state", "index"]));
  }
}), _a = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OxAction: he,
  OxActionModelDelete: oa,
  OxActions: ia,
  OxApp: fa,
  OxAutocomplete: ba,
  OxComponent: ga,
  OxFieldDetails: Le,
  OxFormList: ha,
  OxListFilters: rt,
  OxListKanban: Sa,
  OxListTable: ut,
  OxLogin: Pa,
  OxModelEdit: Ta,
  OxModelPanel: Ia,
  OxPanel: dt,
  OxStateAlert: xe,
  OxValidationBtn: Ke,
  OxView: ct
}, Symbol.toStringTag, { value: "Module" })), Ua = {
  el: "#app",
  delimiters: ["[[", "]]"],
  components: { ..._a, ...sa }
};
export {
  Ua as App,
  he as OxAction,
  oa as OxActionModelDelete,
  ia as OxActions,
  fa as OxApp,
  ba as OxAutocomplete,
  ga as OxComponent,
  Le as OxFieldDetails,
  ha as OxFormList,
  rt as OxListFilters,
  Sa as OxListKanban,
  ut as OxListTable,
  Pa as OxLogin,
  Ta as OxModelEdit,
  Ia as OxModelPanel,
  dt as OxPanel,
  xe as OxStateAlert,
  Ke as OxValidationBtn,
  ct as OxView
};
//# sourceMappingURL=components.js.map
