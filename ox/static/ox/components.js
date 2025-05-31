import { defineComponent as ae, inject as D, createElementBlock as P, createCommentVNode as x, unref as e, openBlock as p, Fragment as _, createBlock as g, withModifiers as W, useSlots as de, renderSlot as k, normalizeProps as X, guardReactiveProps as Z, ref as j, computed as L, resolveComponent as St, createVNode as v, withCtx as c, createTextVNode as R, toDisplayString as le, renderList as Y, mergeProps as N, mergeModels as De, useModel as Me, shallowRef as re, watch as H, onMounted as $e, onScopeDispose as Ct, nextTick as Ae, watchEffect as Ot, reactive as Te, onErrorCaptured as Pt, createElementVNode as ue, createSlots as me, useAttrs as At, toRaw as ze, h as Tt, normalizeClass as It, useTemplateRef as tt, withKeys as Ge, onUnmounted as _t, Teleport as We, toRefs as Lt, withDirectives as Ft, vShow as Dt } from "vue";
import { useAction as Mt, t as V, filterSlots as ve, useAppContext as Bt, usePanels as Rt, excludeValues as Ut, useModelList as Et, query as Kt, defineAsyncComponent as Nt, tKeys as jt, useModelEditor as zt, useModelPanel as Gt } from "ox";
import { V as K, a as se, b as Wt, c as Ie, d as Be, e as qt, f as pe, u as Yt, g as Ht, h as Jt, i as Qt, j as Xt, k as Re, l as Ue, m as Zt, n as el, o as tl, p as ll, q as al, r as nl, s as qe, t as sl, v as ol, w as lt, x as il, y as rl, z as Ye, A as ul, B as at, C as dl, D as cl, E as nt, F as _e, G as vl, H as pl, I as fl, J as ml, K as yl, L as ke, M as te, N as st, O as bl, P as gl, Q as kl, R as wl, S as Vl, T as hl, U as $l, W as xl, X as Sl, Y as Cl, Z as Ol, _ as Pl, $ as Al, a0 as Tl, a1 as Il, a2 as _l, a3 as Ll, a4 as ot, a5 as Fl, a6 as Dl, a7 as Ml, a8 as Bl, a9 as Rl, aa as ge, ab as Ul, ac as El, ad as Kl, ae as He, af as Nl, ag as Je, ah as jl } from "./VAlert-HvIugEXk.js";
import { l as xe, n as Ee, u as Ve, o as zl, q as Gl, r as Wl, s as it, t as ql, v as Yl, w as Hl, j as Jl, x as Ql, y as Xl, z as Qe, A as Xe, B as Zl } from "./theme-BrdPdMMA.js";
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
  setup(t, { emit: d }) {
    const l = t, r = d, n = D("context"), { run: s, processing: i, allowed: f } = Mt({ user: n.user, emits: r, props: l });
    return (a, o) => e(f) ? (p(), P(_, { key: 0 }, [
      l.button ? (p(), g(K, {
        key: 0,
        variant: "text",
        disabled: e(i),
        color: l.color,
        icon: l.icon,
        title: l.title,
        "aria-label": l.title,
        onClick: W(e(s), ["stop"])
      }, null, 8, ["disabled", "color", "icon", "title", "aria-label", "onClick"])) : (p(), g(se, {
        key: 1,
        title: l.title,
        "base-color": l.color,
        "prepend-icon": l.icon,
        disabled: e(i),
        onClick: W(e(s), ["stop"])
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
    const d = D("panel"), l = D("repos"), r = t;
    async function n(s, i) {
      return await l[i.constructor.entity].api().delete(i.$url(), { delete: r.item.id });
    }
    return (s, i) => (p(), g(he, {
      item: r.item,
      button: r.button,
      icon: "mdi-delete",
      color: "error",
      title: e(V)("actions.delete"),
      confirm: e(V)("actions.delete.confirm"),
      permissions: ["delete", (f, a) => a.id],
      run: n,
      onCompleted: i[0] || (i[0] = (f) => {
        var a;
        return (a = e(d)) == null ? void 0 : a.show({ view: e(d).index });
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
    de();
    const d = t;
    return (l, r) => (p(), P(_, null, [
      k(l.$slots, "before", X(Z(d))),
      k(l.$slots, "default", X(Z(d))),
      k(l.$slots, "after", X(Z(d)))
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
    const d = t;
    j(null);
    const l = D("user"), r = D("panels");
    L(() => !d.auto || panel.name == d.name);
    function n(i) {
      return i.permissions && !l.can(i.permissions) ? !1 : i.items ? i.items.some((f) => n(f)) : !0;
    }
    function s() {
      const i = { panel: d.name, href: d.url };
      console.log(d, i), r.show(i);
    }
    return (i, f) => {
      const a = St("ox-app-nav-item", !0);
      return n(d) ? (p(), P(_, { key: 0 }, [
        d.type == "subheader" ? (p(), P(_, { key: 0 }, [
          v(Wt, null, {
            default: c(() => [
              R(le(d.title), 1)
            ]),
            _: 1
          }),
          d.items ? (p(!0), P(_, { key: 0 }, Y(d.items, (o) => (p(), g(a, N({ ref_for: !0 }, o), null, 16))), 256)) : x("", !0)
        ], 64)) : d.type == "group" ? (p(), g(Ie, {
          key: 1,
          value: d.name
        }, {
          activator: c(({ props: o }) => [
            v(se, N(o, {
              title: d.title,
              "prepend-icon": d.icon
            }), null, 16, ["title", "prepend-icon"])
          ]),
          default: c(() => [
            (p(!0), P(_, null, Y(d.items, (o, u) => (p(), g(a, N({
              key: u,
              ref_for: !0
            }, o), null, 16))), 128))
          ]),
          _: 1
        }, 8, ["value"])) : d.type == "divider" ? (p(), g(Be, { key: 2 })) : (p(), g(se, {
          key: 3,
          active: e(r).panel == d.name,
          value: d.name,
          "prepend-icon": d.icon,
          title: d.title,
          onClick: W(s, ["stop"])
        }, null, 8, ["active", "value", "prepend-icon", "title"]))
      ], 64)) : x("", !0);
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
    D("context");
    const d = D("panels"), l = Me(t, "drawer"), r = j([]), n = t, s = L(() => (i(n.items), n.items));
    function i(a) {
      r.value = f(a);
    }
    function f(a) {
      if (d.panel) {
        for (const o of a)
          if (o.items) {
            const u = f(o.items);
            if (u)
              return [u, o.name];
          } else if (o.name == d.panel)
            return [o.name];
      }
    }
    return (a, o) => (p(), g(qt, {
      modelValue: l.value,
      "onUpdate:modelValue": o[1] || (o[1] = (u) => l.value = u),
      theme: "dark"
    }, {
      append: c(() => [
        v(pe, null, {
          default: c(() => [
            k(a.$slots, "append")
          ]),
          _: 3
        })
      ]),
      default: c(() => [
        k(a.$slots, "prepend"),
        v(pe, {
          opened: r.value,
          "onUpdate:opened": o[0] || (o[0] = (u) => r.value = u),
          density: "compact"
        }, {
          default: c(() => [
            (p(!0), P(_, null, Y(s.value, (u, y) => (p(), g(e(ra), N({
              key: y,
              ref_for: !0
            }, u), null, 16))), 128))
          ]),
          _: 1
        }, 8, ["opened"])
      ]),
      _: 3
    }, 8, ["modelValue"]));
  }
};
function da(t) {
  const d = re(t());
  let l = -1;
  function r() {
    clearInterval(l);
  }
  function n() {
    r(), Ae(() => d.value = t());
  }
  function s(i) {
    const f = i ? getComputedStyle(i) : {
      transitionDuration: 0.2
    }, a = parseFloat(f.transitionDuration) * 1e3 || 200;
    if (r(), d.value <= 0) return;
    const o = performance.now();
    l = window.setInterval(() => {
      const u = performance.now() - o + a;
      d.value = Math.max(t() - u, 0), d.value <= 0 && r();
    }, a);
  }
  return Ct(r), {
    clear: r,
    time: d,
    start: s,
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
}, "VSnackbar"), va = xe()({
  name: "VSnackbar",
  props: ca(),
  emits: {
    "update:modelValue": (t) => !0
  },
  setup(t, d) {
    let {
      slots: l
    } = d;
    const r = Ve(t, "modelValue"), {
      positionClasses: n
    } = Yt(t), {
      scopeId: s
    } = Ht(), {
      themeClasses: i
    } = zl(t), {
      colorClasses: f,
      colorStyles: a,
      variantClasses: o
    } = Jt(t), {
      roundedClasses: u
    } = Qt(t), y = da(() => Number(t.timeout)), S = j(), C = j(), O = re(!1), J = re(0), T = j(), b = D(Xt, void 0);
    Gl(() => !!b, () => {
      const U = nl();
      Ot(() => {
        T.value = U.mainStyles.value;
      });
    }), H(r, w), H(() => t.timeout, w), $e(() => {
      r.value && w();
    });
    let $ = -1;
    function w() {
      y.reset(), window.clearTimeout($);
      const U = Number(t.timeout);
      if (!r.value || U === -1) return;
      const ie = Wl(C.value);
      y.start(ie), $ = window.setTimeout(() => {
        r.value = !1;
      }, U);
    }
    function I() {
      y.reset(), window.clearTimeout($);
    }
    function z() {
      O.value = !0, I();
    }
    function Q() {
      O.value = !1, w();
    }
    function fe(U) {
      J.value = U.touches[0].clientY;
    }
    function oe(U) {
      Math.abs(J.value - U.changedTouches[0].clientY) > 50 && (r.value = !1);
    }
    function Ce() {
      O.value && Q();
    }
    const ye = L(() => t.location.split(" ").reduce((U, ie) => (U[`v-snackbar--${ie}`] = !0, U), {}));
    return Re(() => {
      const U = qe.filterProps(t), ie = !!(l.default || l.text || t.text);
      return v(qe, N({
        ref: S,
        class: ["v-snackbar", {
          "v-snackbar--active": r.value,
          "v-snackbar--multi-line": t.multiLine && !t.vertical,
          "v-snackbar--timer": !!t.timer,
          "v-snackbar--vertical": t.vertical
        }, ye.value, n.value, t.class],
        style: [T.value, t.style]
      }, U, {
        modelValue: r.value,
        "onUpdate:modelValue": (F) => r.value = F,
        contentProps: N({
          class: ["v-snackbar__wrapper", i.value, f.value, u.value, o.value],
          style: [a.value],
          onPointerenter: z,
          onPointerleave: Q
        }, U.contentProps),
        persistent: !0,
        noClickAnimation: !0,
        scrim: !1,
        scrollStrategy: "none",
        _disableGlobalStack: !0,
        onTouchstartPassive: fe,
        onTouchend: oe,
        onAfterLeave: Ce
      }, s), {
        default: () => {
          var F, be;
          return [sl(!1, "v-snackbar"), t.timer && !O.value && v("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [v(ol, {
            ref: C,
            color: typeof t.timer == "string" ? t.timer : "info",
            max: t.timeout,
            "model-value": y.time.value
          }, null)]), ie && v("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((F = l.text) == null ? void 0 : F.call(l)) ?? t.text, (be = l.default) == null ? void 0 : be.call(l)]), l.actions && v(lt, {
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
              isActive: r
            })])]
          })];
        },
        activator: l.activator
      });
    }), Ue({}, S);
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
    const d = de(), l = ve(d, "panels."), r = t, n = Te({ drawer: !0 }), s = Bt(r), i = Rt();
    return $e(() => {
      i.panel = s.data.panel;
    }), H(() => [s.state.state, s.state.data], () => {
      s.showState = !0;
    }), Pt((f, a, o) => {
      s.state.error(`${f}`);
    }), (f, a) => (p(), g(il, null, {
      default: c(() => [
        v(va, {
          modelValue: e(s).showState,
          "onUpdate:modelValue": a[0] || (a[0] = (o) => e(s).showState = o),
          color: e(s).state.color,
          "multi-line": ""
        }, {
          default: c(() => [
            R(le(e(s).state.data), 1)
          ]),
          _: 1
        }, 8, ["modelValue", "color"]),
        v(rl, { color: "primary" }, {
          prepend: c(() => [
            v(at, {
              icon: "mdi-apps",
              title: e(V)("nav.panels"),
              "aria-label": e(V)("nav.panels"),
              onClick: a[1] || (a[1] = W((o) => n.drawer = !n.drawer, ["stop"]))
            }, null, 8, ["title", "aria-label"])
          ]),
          default: c(() => [
            v(Ye, { id: "app-bar-sheet-title" }),
            v(Ye, { id: "app-bar-title" }, {
              default: c(() => [
                k(f.$slots, "title", { context: e(s) })
              ]),
              _: 3
            }),
            v(ul),
            k(f.$slots, "app-bar-left", { context: e(s) }),
            a[5] || (a[5] = ue("div", {
              id: "app-bar-right",
              class: "mr-3"
            }, null, -1)),
            k(f.$slots, "app-bar-right", { context: e(s) })
          ]),
          _: 3
        }),
        v(e(ua), {
          drawer: n.drawer,
          "onUpdate:drawer": a[3] || (a[3] = (o) => n.drawer = o),
          items: e(s).data.nav
        }, me({
          prepend: c(() => [
            ue("a", pa, [
              f.logo ? (p(), g(dl, {
                key: 0,
                src: f.logo,
                class: "logo"
              }, null, 8, ["src"])) : x("", !0)
            ]),
            k(f.$slots, "nav-start", { context: e(s) })
          ]),
          _: 2
        }, [
          e(d)["nav-end"] ? {
            name: "append",
            fn: c(() => [
              v(pe, {
                opened: n.opened,
                "onUpdate:opened": a[2] || (a[2] = (o) => n.opened = o)
              }, {
                default: c(() => [
                  k(f.$slots, "nav-end", { context: e(s) })
                ]),
                _: 3
              }, 8, ["opened"])
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["drawer", "items"]),
        v(cl, null, {
          default: c(() => [
            k(f.$slots, "main", {}, () => [
              v(nt, {
                modelValue: e(i).panel,
                "onUpdate:modelValue": a[4] || (a[4] = (o) => e(i).panel = o)
              }, {
                default: c((o) => [
                  k(f.$slots, "default", N(o, { context: e(s) })),
                  (p(!0), P(_, null, Y(e(l), (u, y) => (p(), g(_e, {
                    key: y,
                    value: u
                  }, {
                    default: c(() => [
                      k(f.$slots, y, N({ ref_for: !0 }, o, { context: e(s) }))
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
  ...xl({
    filterKeys: ["title"]
  }),
  ...$l(),
  ...it(Sl({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...hl({
    transition: !1
  })
}, "VAutocomplete"), ya = xe()({
  name: "VAutocomplete",
  props: ma(),
  emits: {
    "update:focused": (t) => !0,
    "update:search": (t) => !0,
    "update:modelValue": (t) => !0,
    "update:menu": (t) => !0
  },
  setup(t, d) {
    let {
      slots: l
    } = d;
    const {
      t: r
    } = Yl(), n = j(), s = re(!1), i = re(!0), f = re(!1), a = j(), o = j(), u = re(-1), {
      items: y,
      transformIn: S,
      transformOut: C
    } = vl(t), {
      textColorClasses: O,
      textColorStyles: J
    } = pl(() => {
      var m;
      return (m = n.value) == null ? void 0 : m.color;
    }), T = Ve(t, "search", ""), b = Ve(t, "modelValue", [], (m) => S(m === null ? [null] : Hl(m)), (m) => {
      const h = C(m);
      return t.multiple ? h : h[0] ?? null;
    }), $ = L(() => typeof t.counterValue == "function" ? t.counterValue(b.value) : typeof t.counterValue == "number" ? t.counterValue : b.value.length), w = fl(t), {
      filteredItems: I,
      getMatches: z
    } = ml(t, y, () => i.value ? "" : T.value), Q = L(() => t.hideSelected ? I.value.filter((m) => !b.value.some((h) => h.value === m.value)) : I.value), fe = L(() => !!(t.chips || l.chip)), oe = L(() => fe.value || !!l.selection), Ce = L(() => b.value.map((m) => m.props.value)), ye = L(() => {
      var h;
      return (t.autoSelectFirst === !0 || t.autoSelectFirst === "exact" && T.value === ((h = Q.value[0]) == null ? void 0 : h.title)) && Q.value.length > 0 && !i.value && !f.value;
    }), U = L(() => t.hideNoData && !Q.value.length || w.isReadonly.value || w.isDisabled.value), ie = Ve(t, "menu"), F = L({
      get: () => ie.value,
      set: (m) => {
        var h;
        ie.value && !m && ((h = a.value) != null && h.ΨopenChildren.size) || m && U.value || (ie.value = m);
      }
    }), be = L(() => F.value ? t.closeText : t.openText), Oe = j(), vt = yl(Oe, n);
    function pt(m) {
      t.openOnClear && (F.value = !0), T.value = "";
    }
    function ft() {
      U.value || (F.value = !0);
    }
    function mt(m) {
      U.value || (s.value && (m.preventDefault(), m.stopPropagation()), F.value = !F.value);
    }
    function yt(m) {
      var h;
      m.key !== " " && Qe(m) && ((h = n.value) == null || h.focus());
    }
    function bt(m) {
      var A, E, ee, ne, M;
      if (w.isReadonly.value) return;
      const h = (A = n.value) == null ? void 0 : A.selectionStart, B = b.value.length;
      if (["Enter", "ArrowDown", "ArrowUp"].includes(m.key) && m.preventDefault(), ["Enter", "ArrowDown"].includes(m.key) && (F.value = !0), ["Escape"].includes(m.key) && (F.value = !1), ye.value && ["Enter", "Tab"].includes(m.key) && !b.value.some((q) => {
        let {
          value: G
        } = q;
        return G === Q.value[0].value;
      }) && ce(Q.value[0]), m.key === "ArrowDown" && ye.value && ((E = Oe.value) == null || E.focus("next")), ["Backspace", "Delete"].includes(m.key)) {
        if (!t.multiple && oe.value && b.value.length > 0 && !T.value) return ce(b.value[0], !1);
        if (~u.value) {
          m.preventDefault();
          const q = u.value;
          ce(b.value[u.value], !1), u.value = q >= B - 1 ? B - 2 : q;
        } else m.key === "Backspace" && !T.value && (u.value = B - 1);
        return;
      }
      if (t.multiple)
        if (m.key === "ArrowLeft") {
          if (u.value < 0 && h && h > 0) return;
          const q = u.value > -1 ? u.value - 1 : B - 1;
          if (b.value[q])
            u.value = q;
          else {
            const G = ((ee = T.value) == null ? void 0 : ee.length) ?? null;
            u.value = -1, (ne = n.value) == null || ne.setSelectionRange(G, G);
          }
        } else if (m.key === "ArrowRight") {
          if (u.value < 0) return;
          const q = u.value + 1;
          b.value[q] ? u.value = q : (u.value = -1, (M = n.value) == null || M.setSelectionRange(0, 0));
        } else ~u.value && Qe(m) && (u.value = -1);
    }
    function gt(m) {
      if (Xe(n.value, ":autofill") || Xe(n.value, ":-webkit-autofill")) {
        const h = y.value.find((B) => B.title === m.target.value);
        h && ce(h);
      }
    }
    function kt() {
      var m;
      t.eager && ((m = o.value) == null || m.calculateVisibleItems());
    }
    function wt() {
      var m;
      s.value && (i.value = !0, (m = n.value) == null || m.focus());
    }
    function Vt(m) {
      s.value = !0, setTimeout(() => {
        f.value = !0;
      });
    }
    function ht(m) {
      f.value = !1;
    }
    function $t(m) {
      (m == null || m === "" && !t.multiple && !oe.value) && (b.value = []);
    }
    const Pe = re(!1);
    function ce(m) {
      let h = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!(!m || m.props.disabled))
        if (t.multiple) {
          const B = b.value.findIndex((E) => (t.valueComparator || Zl)(E.value, m.value)), A = h ?? !~B;
          if (~B) {
            const E = A ? [...b.value, m] : [...b.value];
            E.splice(B, 1), b.value = E;
          } else A && (b.value = [...b.value, m]);
          t.clearOnSelect && (T.value = "");
        } else {
          const B = h !== !1;
          b.value = B ? [m] : [], T.value = B && !oe.value ? m.title : "", Ae(() => {
            F.value = !1, i.value = !0;
          });
        }
    }
    return H(s, (m, h) => {
      var B;
      m !== h && (m ? (Pe.value = !0, T.value = t.multiple || oe.value ? "" : String(((B = b.value.at(-1)) == null ? void 0 : B.props.title) ?? ""), i.value = !0, Ae(() => Pe.value = !1)) : (!t.multiple && T.value == null && (b.value = []), F.value = !1, (t.multiple || oe.value) && (T.value = ""), u.value = -1));
    }), H(T, (m) => {
      !s.value || Pe.value || (m && (F.value = !0), i.value = !m);
    }), H(F, () => {
      if (!t.hideSelected && F.value && b.value.length) {
        const m = Q.value.findIndex((h) => b.value.some((B) => h.value === B.value));
        Jl && window.requestAnimationFrame(() => {
          var h;
          m >= 0 && ((h = o.value) == null || h.scrollToIndex(m));
        });
      }
    }), H(() => t.items, (m, h) => {
      F.value || s.value && !h.length && m.length && (F.value = !0);
    }), H(b, (m) => {
      var h;
      !t.multiple && !oe.value && (T.value = ((h = m[0]) == null ? void 0 : h.title) ?? "");
    }), Re(() => {
      const m = !!(!t.hideNoData || Q.value.length || l["prepend-item"] || l["append-item"] || l["no-data"]), h = b.value.length > 0, B = ke.filterProps(t);
      return v(ke, N({
        ref: n
      }, B, {
        modelValue: T.value,
        "onUpdate:modelValue": [(A) => T.value = A, $t],
        focused: s.value,
        "onUpdate:focused": (A) => s.value = A,
        validationValue: b.externalValue,
        counterValue: $.value,
        dirty: h,
        onChange: gt,
        class: ["v-autocomplete", `v-autocomplete--${t.multiple ? "multiple" : "single"}`, {
          "v-autocomplete--active-menu": F.value,
          "v-autocomplete--chips": !!t.chips,
          "v-autocomplete--selection-slot": !!oe.value,
          "v-autocomplete--selecting-index": u.value > -1
        }, t.class],
        style: t.style,
        readonly: w.isReadonly.value,
        placeholder: h ? void 0 : t.placeholder,
        "onClick:clear": pt,
        "onMousedown:control": ft,
        onKeydown: bt
      }), {
        ...l,
        default: () => v(_, null, [v(st, N({
          ref: a,
          modelValue: F.value,
          "onUpdate:modelValue": (A) => F.value = A,
          activator: "parent",
          contentClass: "v-autocomplete__content",
          disabled: U.value,
          eager: t.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: t.transition,
          onAfterEnter: kt,
          onAfterLeave: wt
        }, t.menuProps), {
          default: () => [m && v(pe, N({
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
              var A, E, ee;
              return [(A = l["prepend-item"]) == null ? void 0 : A.call(l), !Q.value.length && !t.hideNoData && (((E = l["no-data"]) == null ? void 0 : E.call(l)) ?? v(se, {
                key: "no-data",
                title: r(t.noDataText)
              }, null)), v(bl, {
                ref: o,
                renderless: !0,
                items: Q.value,
                itemKey: "value"
              }, {
                default: (ne) => {
                  var je;
                  let {
                    item: M,
                    index: q,
                    itemRef: G
                  } = ne;
                  const Ne = N(M.props, {
                    ref: G,
                    key: M.value,
                    active: ye.value && q === 0 ? !0 : void 0,
                    onClick: () => ce(M, null)
                  });
                  return ((je = l.item) == null ? void 0 : je.call(l, {
                    item: M,
                    index: q,
                    props: Ne
                  })) ?? v(se, N(Ne, {
                    role: "option"
                  }), {
                    prepend: (we) => {
                      let {
                        isSelected: xt
                      } = we;
                      return v(_, null, [t.multiple && !t.hideSelected ? v(kl, {
                        key: M.value,
                        modelValue: xt,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, M.props.prependAvatar && v(wl, {
                        image: M.props.prependAvatar
                      }, null), M.props.prependIcon && v(te, {
                        icon: M.props.prependIcon
                      }, null)]);
                    },
                    title: () => {
                      var we;
                      return i.value ? M.title : gl("v-autocomplete", M.title, (we = z(M)) == null ? void 0 : we.title);
                    }
                  });
                }
              }), (ee = l["append-item"]) == null ? void 0 : ee.call(l)];
            }
          })]
        }), b.value.map((A, E) => {
          function ee(G) {
            G.stopPropagation(), G.preventDefault(), ce(A, !1);
          }
          const ne = {
            "onClick:close": ee,
            onKeydown(G) {
              G.key !== "Enter" && G.key !== " " || (G.preventDefault(), G.stopPropagation(), ee(G));
            },
            onMousedown(G) {
              G.preventDefault(), G.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, M = fe.value ? !!l.chip : !!l.selection, q = M ? Xl(fe.value ? l.chip({
            item: A,
            index: E,
            props: ne
          }) : l.selection({
            item: A,
            index: E
          })) : void 0;
          if (!(M && !q))
            return v("div", {
              key: A.value,
              class: ["v-autocomplete__selection", E === u.value && ["v-autocomplete__selection--selected", O.value]],
              style: E === u.value ? J.value : {}
            }, [fe.value ? l.chip ? v(lt, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: t.closableChips,
                  size: "small",
                  text: A.title
                }
              }
            }, {
              default: () => [q]
            }) : v(Vl, N({
              key: "chip",
              closable: t.closableChips,
              size: "small",
              text: A.title,
              disabled: A.props.disabled
            }, ne), null) : q ?? v("span", {
              class: "v-autocomplete__selection-text"
            }, [A.title, t.multiple && E < b.value.length - 1 && v("span", {
              class: "v-autocomplete__selection-comma"
            }, [R(",")])])]);
        })]),
        "append-inner": function() {
          var ne, M;
          for (var A = arguments.length, E = new Array(A), ee = 0; ee < A; ee++)
            E[ee] = arguments[ee];
          return v(_, null, [(ne = l["append-inner"]) == null ? void 0 : ne.call(l, ...E), t.menuIcon ? v(te, {
            class: "v-autocomplete__menu-icon",
            color: (M = n.value) == null ? void 0 : M.fieldIconColor,
            icon: t.menuIcon,
            onMousedown: mt,
            onClick: Ql,
            "aria-label": r(be.value),
            title: r(be.value),
            tabindex: "-1"
          }, null) : void 0]);
        }
      });
    }), Ue({
      isFocused: s,
      isPristine: i,
      menu: F,
      search: T,
      filteredItems: I,
      select: ce
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
    var T;
    const d = de(), l = Me(t, "modelValue"), r = j(null), n = j(""), s = t, i = At(), f = D("repos"), a = Ut(s, ["repo", "search"]), { list: o, items: u } = Et({
      ...(T = a.value) == null ? void 0 : T[1],
      filters: s.filters || {},
      save: !1,
      query: Kt(s.repo, f)
    });
    var y = null;
    async function S(b) {
      if (b) {
        const $ = o.findIndex(b);
        if ($ != -1)
          r.value = o.items[$];
        else if (y != b) {
          y = b;
          const I = (await o.load({ id: b, append: 0 })).entities[0];
          r.value = I.id == b ? I : null;
        }
      } else
        r.value = null;
      return r;
    }
    const C = Ze.debounce(
      async () => {
        const b = await o.load();
        return r.value && o.add(r.value), b;
      },
      200
    );
    function O(b) {
      b[s.lookup] = n.value, Ze.isEqual(ze(o.filters), ze(b)) || (o.filters = { ...s.filters }, o.filters[s.lookup] = n.value, C());
    }
    function J(b) {
      const $ = o.filters[s.lookup];
      b && b != "<empty string>" && b != $ && (o.filters[s.lookup] = b, C().then((w) => {
        S(l.value), n.value = b;
      }));
    }
    return $e(() => {
      s.filters && Object.values(s.filters).length ? O(s.filters) : o.load(), S(l.value);
    }), H(() => s.filters, (b) => O(b)), H(n, J), H(l, (b, $) => b != $ && S(b)), (b, $) => (p(), g(e(ya), N(e(i), {
      items: e(u),
      loading: e(o).state.isProcessing,
      modelValue: l.value,
      "onUpdate:modelValue": $[0] || ($[0] = (w) => l.value = w),
      search: n.value,
      "onUpdate:search": $[1] || ($[1] = (w) => n.value = w)
    }), me({ _: 2 }, [
      Y(e(d), (w, I) => ({
        name: I,
        fn: c((z) => [
          k(b.$slots, I, X(Z(z)))
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
    const d = re(null), l = L(() => {
      if (t.is)
        return t.is;
      let n = t.src.substring(t.src.lastIndexOf("/") + 1);
      if (n && (n = n.substring(0, n.indexOf("."))), !n)
        throw Error(
          "`is` not provided and could not be deducted from `src`."
        );
      return n;
    });
    function r() {
      d.value = Nt(t.src, l.value);
    }
    return H(() => t.src, r), r(), () => Tt(d.value, t);
  }
}, ka = { class: "text-error" }, Le = {
  __name: "OxFieldDetails",
  props: {
    state: Object,
    errors: Array
  },
  setup(t) {
    const d = t;
    return (l, r) => d.errors ? (p(!0), P(_, { key: 0 }, Y(d.errors, (n) => (p(), P("div", ka, [
      v(te, { icon: "mdi-alert-circle-outline" }),
      R(" " + le(n), 1)
    ]))), 256)) : x("", !0);
  }
}, rt = {
  __name: "OxListFilters",
  props: {
    search: String
  },
  setup(t, { expose: d }) {
    const l = D("list"), r = t, n = L(() => {
      const f = l.filters;
      return f && Object.entries(f).some(
        ([a, o]) => !a.startsWith("page") && !a.startsWith("ordering") && !!o
      );
    }), s = L(() => n.value ? "mdi-filter-check" : "mdi-filter-outline");
    function i() {
      l.filters = {}, l.load();
    }
    return d({ icon: s, hasFilters: n, reset: i }), (f, a) => (p(), P("form", {
      onSubmit: a[2] || (a[2] = W((o) => e(l).load(), ["prevent"])),
      class: "width-full"
    }, [
      v(Cl, {
        dense: "",
        color: "transparent"
      }, {
        default: c(() => [
          v(at, {
            icon: s.value,
            readonly: ""
          }, null, 8, ["icon"]),
          r.search && e(l).filters ? (p(), g(ke, {
            key: 0,
            label: e(V)("filters.search"),
            density: "compact",
            class: "ml-2",
            modelValue: e(l).filters[r.search],
            "onUpdate:modelValue": a[0] || (a[0] = (o) => e(l).filters[r.search] = o),
            "hide-details": ""
          }, null, 8, ["label", "modelValue"])) : x("", !0),
          k(f.$slots, "default", {
            list: e(l),
            filters: e(l).filters
          }),
          v(K, {
            onClick: a[1] || (a[1] = W((o) => e(l).load(), ["stop"])),
            class: "ml-2",
            icon: "mdi-check",
            "aria-label": f.$t("filters.apply"),
            title: e(V)("filters.apply")
          }, null, 8, ["aria-label", "title"]),
          n.value ? (p(), g(K, {
            key: 1,
            onClick: W(i, ["stop"]),
            icon: "mdi-backspace",
            "aria-label": e(V)("filters.reset"),
            title: e(V)("filters.reset")
          }, null, 8, ["aria-label", "title"])) : x("", !0)
        ]),
        _: 3
      })
    ], 32));
  }
}, wa = Ee({
  ...Al(),
  ...Pl()
}, "VForm"), Fe = xe()({
  name: "VForm",
  props: wa(),
  emits: {
    "update:modelValue": (t) => !0,
    submit: (t) => !0
  },
  setup(t, d) {
    let {
      slots: l,
      emit: r
    } = d;
    const n = Ol(t), s = j();
    function i(a) {
      a.preventDefault(), n.reset();
    }
    function f(a) {
      const o = a, u = n.validate();
      o.then = u.then.bind(u), o.catch = u.catch.bind(u), o.finally = u.finally.bind(u), r("submit", o), o.defaultPrevented || u.then((y) => {
        var C;
        let {
          valid: S
        } = y;
        S && ((C = s.value) == null || C.submit());
      }), o.preventDefault();
    }
    return Re(() => {
      var a;
      return v("form", {
        ref: s,
        class: ["v-form", t.class],
        style: t.style,
        novalidate: !0,
        onReset: i,
        onSubmit: f
      }, [(a = l.default) == null ? void 0 : a.call(l, n)]);
    }), Ue(n, s);
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
    var o;
    const d = Me(t, "modelValue"), l = D("user"), r = j({}), n = t, s = L(() => ({
      add: n.editable && l.can([n.useModel, "add"]),
      change: n.editable && l.can([n.useModel, "change"]),
      delete: n.editable && l.can([n.useModel, "delete"])
    })), i = j([]);
    (o = d.value) != null && o.length || i.value.push(-1);
    function f() {
      d.value.push(r.value), r.value = {};
    }
    function a(u) {
      confirm(V("actions.delete.confirm")) && n.delete && d.value.splice(u);
    }
    return (u, y) => (p(), g(pe, {
      opened: i.value,
      "onUpdate:opened": y[3] || (y[3] = (S) => i.value = S)
    }, {
      default: c(() => {
        var S;
        return [
          (S = d.value) != null && S.length ? (p(!0), P(_, { key: 0 }, Y(d.value, (C, O) => (p(), g(Ie, {
            key: O,
            value: O
          }, {
            activator: c(({ props: J }) => [
              v(se, N({ ref_for: !0 }, J), {
                append: c(() => [
                  ue("div", {
                    onClick: y[0] || (y[0] = W(() => {
                    }, ["stop"]))
                  }, [
                    k(u.$slots, "item.actions", N({
                      item: C,
                      index: O,
                      ref_for: !0
                    }, J)),
                    s.value.delete ? (p(), g(K, {
                      key: 0,
                      type: "button",
                      class: "ml-2",
                      size: "small",
                      onClick: W((T) => a(O), ["stop", "prevent"]),
                      color: "error",
                      "aria-label": e(V)("actions.remove"),
                      title: e(V)("actions.remove"),
                      icon: "mdi-delete"
                    }, null, 8, ["onClick", "aria-label", "title"])) : x("", !0)
                  ])
                ]),
                default: c(() => [
                  v(Tl, null, {
                    default: c(() => [
                      k(u.$slots, "item.title", { item: C })
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1040)
            ]),
            default: c(() => [
              v(Fe, {
                disabled: !s.value.change
              }, {
                default: c(() => [
                  k(u.$slots, "item", {
                    item: C,
                    index: O,
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
          s.value.add ? (p(), P(_, { key: 2 }, [
            d.value.length ? (p(), g(Be, { key: 0 })) : x("", !0),
            v(Ie, { value: -1 }, {
              activator: c(({ props: C }) => [
                v(se, N(C, {
                  title: e(V)("actions.add_item"),
                  "prepend-icon": "mdi-plus"
                }), null, 16, ["title"])
              ]),
              default: c(() => [
                v(Fe, null, {
                  default: c(() => [
                    k(u.$slots, "item", {
                      item: r.value,
                      edit: !0
                    })
                  ]),
                  _: 3
                }),
                r.value ? (p(), g(se, { key: 0 }, {
                  default: c(() => [
                    ue("div", Va, [
                      r.value ? (p(), g(K, {
                        key: 0,
                        size: "small",
                        onClick: y[1] || (y[1] = (C) => r.value = {}),
                        color: "secondary",
                        "prepend-icon": "mdi-backspace",
                        "aria-label": e(V)("actions.discard")
                      }, {
                        default: c(() => [
                          R(le(e(V)("actions.discard")), 1)
                        ]),
                        _: 1
                      }, 8, ["aria-label"])) : x("", !0),
                      r.value ? (p(), g(K, {
                        key: 1,
                        size: "small",
                        onClick: y[2] || (y[2] = (C) => f()),
                        color: "primary",
                        "prepend-icon": "mdi-plus",
                        "aria-label": e(V)("actions.add")
                      }, {
                        default: c(() => [
                          R(le(e(V)("actions.add")), 1)
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
}), $a = xe()({
  name: "VSlideGroupItem",
  props: Il(),
  emits: {
    "group:selected": (t) => !0
  },
  setup(t, d) {
    let {
      slots: l
    } = d;
    const r = _l(t, Ll);
    return () => {
      var n;
      return (n = l.default) == null ? void 0 : n.call(l, {
        isSelected: r.isSelected.value,
        select: r.select,
        toggle: r.toggle,
        selectedClass: r.selectedClass.value
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
  setup(t, { emit: d }) {
    const l = d;
    D("list");
    const r = D("items"), n = t;
    function s(a) {
      return a = a % n.colors.length, n.colorVariant ? n.colors[a] + "-" + n.colorVariant : n.colors[a];
    }
    function i(a, o, u) {
      a[u] ? !a[u].includes(o) && a[u].push(o) : a[u] = [o];
    }
    const f = L(() => {
      const a = {};
      if (r.value)
        for (var o of r.value) {
          const y = o[n.field];
          if (Array.isArray(y))
            if (y.length)
              for (var u of y)
                i(a, o, u);
            else
              i(a, o, null);
          else
            i(a, o, y);
        }
      return a;
    });
    return (a, o) => (p(), g(ot, null, {
      default: c(() => [
        v(Fl, null, {
          default: c(() => [
            (p(!0), P(_, null, Y(n.headers, (u, y) => (p(), g($a, {
              key: u.value
            }, {
              default: c(({ selectedClass: S }) => [
                v(Dl, {
                  width: "400",
                  class: It(["ma-3", S]),
                  color: s(y),
                  lines: "two"
                }, {
                  default: c(() => [
                    v(Ml, null, {
                      default: c(() => [
                        R(le(u.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    v(pe, {
                      "bg-color": s(y)
                    }, {
                      default: c(() => [
                        f.value && f.value[u.value] ? (p(!0), P(_, { key: 0 }, Y(f.value[u.value], (C) => k(a.$slots, "item", {
                          key: C.id,
                          header: u,
                          item: C
                        }, () => [
                          v(se, {
                            title: C[n.itemTitle],
                            value: n.itemValue && C[n.itemValue],
                            onClick: (O) => l("click", C)
                          }, {
                            append: c(() => [
                              k(a.$slots, "item.action")
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
    const d = de(), l = ea(d, "item.", { exclude: ["item.actions"] }), r = D("panel"), n = D("list"), s = D("items"), i = D("user"), f = t, a = L(() => f.headers.reduce((y, S) => (y.push(
      typeof S == "string" ? { key: S, title: V(jt.field(S)) } : S
    ), y), []));
    function o(y) {
      n.filters.page = y.page, n.filters.page_size = y.itemsPerPage, n.filters.ordering = y.sortBy.map(({ key: S, order: C }) => C == "asc" ? S : `-${S}`);
    }
    function u(y, S) {
      r.show({ view: "detail.edit", value: S });
    }
    return (y, S) => {
      var C;
      return p(), g(Bl, {
        items: e(s),
        "item-index": "id",
        "items-length": e(n).count || e(s).length,
        "items-per-page": f.itemsPerPage,
        loading: (C = e(n).state) == null ? void 0 : C.isProcessing,
        headers: a.value,
        "no-data-text": e(V)("lists.empty"),
        class: "align-top-table",
        "onUpdate:options": o
      }, me({
        loading: c(() => [
          v(Rl, { type: "table-row@10" })
        ]),
        "item.actions": c(({ item: O }) => [
          e(i).can([O.constructor, "change"]) ? (p(), g(he, {
            key: 0,
            icon: "mdi-pencil",
            button: "",
            title: e(V)("actions.edit"),
            item: O,
            run: u
          }, null, 8, ["title", "item"])) : e(i).can([O.constructor, "view"]) ? (p(), g(he, {
            key: 1,
            icon: "mdi-eye-outline",
            button: "",
            title: e(V)("actions.edit"),
            item: O,
            run: u
          }, null, 8, ["title", "item"])) : x("", !0),
          k(y.$slots, "item.actions", {
            value: O,
            dense: !0,
            button: !0
          })
        ]),
        _: 2
      }, [
        Y(e(l), (O, J) => ({
          name: J,
          fn: c((T) => [
            k(y.$slots, J, X(Z(T)))
          ])
        }))
      ]), 1032, ["items", "items-length", "items-per-page", "loading", "headers", "no-data-text"]);
    };
  }
}), Se = {
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
    const d = de(), l = t;
    let r = j(!1);
    H(() => l.state.state, (i) => {
      l.delay && i == ta.PROCESSING && (r.value = !1, window.setTimeout(() => {
        r.value = !0;
      }, 5e3));
    });
    const n = L(() => {
      var i;
      return ((i = l.state) == null ? void 0 : i.isProcessing) && (!l.delay || r.value);
    }), s = L(() => {
      var i, f;
      return (f = (i = l.state) == null ? void 0 : i.data) == null ? void 0 : f.messages;
    });
    return (i, f) => (p(), P(_, null, [
      l.state.isNone && e(d).none ? (p(), g(e(ge), {
        key: 0,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        state: t.state,
        title: t.noneTitle
      }, {
        default: c(() => [
          k(i.$slots, "none", { state: t.state })
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
        default: c(() => [
          k(i.$slots, "processing", { state: t.state }, () => [
            f[0] || (f[0] = R(" Data are being sent to server, please be patient. If this message persist you might wan't to retry. "))
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
        default: c(() => [
          k(i.$slots, "error", { state: t.state }, () => [
            f[1] || (f[1] = R(" Oups... something wrong happened. "))
          ]),
          k(i.$slots, "error-detail", { state: t.state })
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
        default: c(() => [
          k(i.$slots, "ok", { state: t.state }, () => [
            f[2] || (f[2] = ue("p", null, "Congrats! Data have been updated.", -1))
          ]),
          s.value ? (p(), P(_, { key: 0 }, [
            v(Be),
            (p(!0), P(_, null, Y(s.value, (a) => (p(), P("p", null, le(a), 1))), 256))
          ], 64)) : x("", !0),
          k(i.$slots, "ok-detail", { state: t.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : x("", !0),
      k(i.$slots, "default", {
        state: l.state
      })
    ], 64));
  }
}, Sa = { class: "text-right" }, Ke = {
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
  setup(t, { emit: d }) {
    const l = d, r = t;
    return (n, s) => (p(), P("div", Sa, [
      v(e(K), {
        color: "error",
        class: "me-2",
        "prepend-icon": r.resetIcon,
        onClick: s[0] || (s[0] = (i) => l("reset")),
        disabled: r.disabled
      }, {
        default: c(() => [
          k(n.$slots, "reset", {}, () => [
            R(le(r.resetLabel), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]),
      r.state.isSending || r.state.isProcessing ? (p(), g(e(K), {
        key: 0,
        color: "primary",
        "prepend-icon": "mdi-content-save",
        disabled: ""
      }, {
        default: c(() => s[2] || (s[2] = [
          R(" Saving ")
        ])),
        _: 1
      })) : (p(), g(e(K), {
        key: 1,
        color: "primary",
        "prepend-icon": r.validateIcon,
        onClick: s[1] || (s[1] = (i) => l("validate")),
        disabled: r.disabled || r.validateDisabled
      }, {
        default: c(() => [
          k(n.$slots, "validate", {}, () => [
            R(le(r.validateLabel), 1)
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
  setup(t, { emit: d }) {
    const l = tt("password"), r = t, n = Te({
      username: "",
      password: ""
    }), s = j(!1), i = Te(new la());
    function f(o = !0) {
      na(n, { username: "", password: "" }), o && i.none();
    }
    async function a() {
      i.processing();
      try {
        const o = await fetch(r.url, {
          method: "POST",
          headers: aa.axiosConfig.headers,
          body: JSON.stringify(n)
        });
        o.status == 200 ? (n.credentials = "", n.password = "", i.ok(await o.json()), r.next && (window.location.href = r.next)) : i.error(await o.json());
      } catch (o) {
        i.ok((o == null ? void 0 : o.message) || o);
      }
    }
    return (o, u) => (p(), P(_, null, [
      v(e(Se), { state: i }, {
        none: c(({ state: y }) => u[7] || (u[7] = [
          ue("p", null, "Please enter your credentials in order too proceed...", -1)
        ])),
        "ok-detail": c(({ state: y }) => [
          r.next ? (p(), P("p", Ca, [
            u[8] || (u[8] = R("You soon will be redirected to ")),
            ue("i", null, le(r.next), 1)
          ])) : x("", !0)
        ]),
        error: c(({ state: y }) => {
          var S, C;
          return [
            v(Le, {
              errors: (S = y.data) == null ? void 0 : S.username
            }, null, 8, ["errors"]),
            v(Le, {
              errors: (C = y.data) == null ? void 0 : C.password
            }, null, 8, ["errors"])
          ];
        }),
        _: 1
      }, 8, ["state"]),
      i.isOk ? x("", !0) : (p(), P(_, { key: 0 }, [
        v(ke, {
          variant: "underlined",
          label: "Enter login",
          modelValue: n.username,
          "onUpdate:modelValue": u[0] || (u[0] = (y) => n.username = y),
          onKeyup: u[1] || (u[1] = Ge(W((y) => e(l).focus(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue"]),
        v(ke, {
          variant: "underlined",
          ref: "password",
          label: "Enter password",
          modelValue: n.password,
          "onUpdate:modelValue": u[2] || (u[2] = (y) => n.password = y),
          type: s.value ? "text" : "password",
          "append-icon": s.value ? "mdi-eye" : "mdi-eye-off",
          "onClick:append": u[3] || (u[3] = (y) => s.value = !s.value),
          onKeyup: u[4] || (u[4] = Ge(W((y) => a(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue", "type", "append-icon"]),
        ue("div", Oa, [
          k(o.$slots, "default", {
            value: n.password
          }, () => [
            n.username && n.password ? (p(), g(Ke, {
              key: 0,
              "validate-label": "Login!",
              onValidate: u[5] || (u[5] = (y) => a()),
              onReset: u[6] || (u[6] = (y) => f()),
              state: i
            }, null, 8, ["state"])) : x("", !0)
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
    const d = de(), l = t, r = ve(d, "views."), n = j(!1);
    $e(() => {
      n.value = !0;
    }), _t(() => {
      n.value = !1;
    });
    const s = D("panels"), i = D("panel");
    return (f, a) => (p(), P(_, null, [
      l.state ? (p(), g(Se, {
        key: 0,
        state: l.state,
        delay: ""
      }, null, 8, ["state"])) : x("", !0),
      v(ot, { class: "ma-4" }, {
        default: c(() => [
          (p(), g(We, {
            to: "#app-bar-sheet-title",
            disabled: !n.value || e(s).panel != l.name
          }, [
            l.icon ? (p(), g(te, {
              key: 0,
              icon: l.icon
            }, null, 8, ["icon"])) : x("", !0),
            R(" " + le(l.title), 1)
          ], 8, ["disabled"])),
          (p(), g(We, {
            to: "#app-bar-right",
            disabled: !n.value || e(s).panel != l.name
          }, [
            k(f.$slots, "append-title"),
            l.help ? (p(), g(K, {
              key: 0,
              class: "ml-3",
              href: l.help,
              panels: "new",
              icon: "mdi-information-outline"
            }, null, 8, ["href"])) : x("", !0)
          ], 8, ["disabled"])),
          k(f.$slots, "top"),
          k(f.$slots, "default", {}, () => [
            e(r) ? (p(), g(Ul, {
              key: 0,
              modelValue: e(i).view,
              "onUpdate:modelValue": a[0] || (a[0] = (o) => e(i).view = o)
            }, {
              default: c(() => [
                (p(!0), P(_, null, Y(e(r), (o, u) => (p(), g(El, {
                  key: o,
                  value: o
                }, {
                  default: c(() => [
                    k(f.$slots, u)
                  ]),
                  _: 2
                }, 1032, ["value"]))), 128))
              ]),
              _: 3
            }, 8, ["modelValue"])) : x("", !0)
          ]),
          k(f.$slots, "bottom")
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
    const d = t, l = j(null), r = de(), n = ve(r, "tab.", { exclude: "tab.default" }), s = ve(r, "window.");
    return (i, f) => e(n) && Object.keys(e(n)).length ? (p(), P(_, { key: 0 }, [
      v(Kl, {
        modelValue: l.value,
        "onUpdate:modelValue": f[0] || (f[0] = (a) => l.value = a)
      }, {
        default: c(() => [
          e(r).default ? k(i.$slots, "tab", { key: 0 }, () => [
            v(He, {
              text: d == null ? void 0 : d.title,
              value: "default"
            }, null, 8, ["text"])
          ]) : x("", !0),
          (p(!0), P(_, null, Y(e(n), (a, o) => (p(), g(He, { value: a }, {
            default: c(() => [
              k(i.$slots, o)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"]),
      v(nt, {
        modelValue: l.value,
        "onUpdate:modelValue": f[1] || (f[1] = (a) => l.value = a)
      }, {
        default: c(() => [
          e(r).default ? (p(), g(_e, {
            key: 0,
            value: "default"
          }, {
            default: c(() => [
              k(i.$slots, "default")
            ]),
            _: 3
          })) : x("", !0),
          (p(!0), P(_, null, Y(e(s), (a, o) => (p(), g(_e, { value: a }, {
            default: c(() => [
              k(i.$slots, o)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"])
    ], 64)) : k(i.$slots, "default", { key: 1 });
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
  setup(t, { expose: d }) {
    const l = j(null), r = D("context"), n = t, { editor: s, edited: i } = zt({ props: n }), f = L(() => r.user.can([s.repo.use, "change"])), a = L(() => ({
      editor: s,
      edited: i,
      editable: f.value,
      disabled: !f.value,
      value: s.value,
      model: s.repo.use
    }));
    return H(() => s.errors && Object.values(s.errors), () => l.value.validate()), d({ editor: s, edited: i }), (o, u) => (p(), P(_, null, [
      v(Se, {
        state: e(s).state
      }, null, 8, ["state"]),
      ue("div", Aa, [
        f.value && e(i) ? (p(), g(Ke, {
          key: 0,
          onValidate: u[0] || (u[0] = (y) => e(s).save()),
          onReset: u[1] || (u[1] = (y) => e(s).discard()),
          state: e(s).state,
          "validate-disabled": e(s).valid === !1
        }, null, 8, ["state", "validate-disabled"])) : x("", !0)
      ]),
      v(Nl, { class: "ox-model-edit" }, {
        default: c(() => [
          v(Fe, {
            ref_key: "form",
            ref: l,
            modelValue: e(s).valid,
            "onUpdate:modelValue": u[2] || (u[2] = (y) => e(s).valid = y),
            disabled: !f.value
          }, {
            default: c(() => [
              k(o.$slots, "default", X(Z(a.value)))
            ]),
            _: 3
          }, 8, ["modelValue", "disabled"]),
          k(o.$slots, "append", X(Z(a.value)))
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
  setup(t) {
    const d = de(), l = ve(d, "views.list."), r = ve(d, "item."), n = ve(d, "views.detail.edit."), s = tt("filters"), i = t, f = D("context"), { panel: a, list: o, items: u, next: y, prev: S } = D("panel") ?? Gt({ props: i }), C = a.panels;
    L(() => {
      var $;
      return f.user.can([a.model, ($ = a.value) != null && $.id ? "change" : "add"]);
    });
    const { showFilters: O } = Lt(a), J = L(() => [
      ...i.headers,
      { key: "actions", title: V("actions") }
    ]);
    function T($) {
      $ != null && $.id ? a.value = a.repo.whereId($.id).first() : a.value = $, o.load();
    }
    const b = L(() => ({
      panel: a,
      panels: C,
      list: o,
      items: u,
      context: f,
      value: a.value
    }));
    return H(() => Object.values(o.filters), () => o.load()), ($, w) => (p(), g(dt, {
      name: i.name,
      title: e(a).title,
      icon: e(a).icon,
      state: e(o).state,
      index: i.index
    }, me({
      "append-title": c(() => [
        k($.$slots, "append-title", X(Z(b.value))),
        e(a).view.startsWith("list.") ? (p(), g(Je, {
          key: 0,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: c(() => [
            k($.$slots, "nav.list", X(Z(b.value))),
            e(s) ? (p(), g(K, {
              key: 0,
              title: e(O) ? e(V)("filters.hide") : e(V)("filters.show"),
              "aria-label": e(O) ? e(V)("filters.hide") : e(V)("filters.show"),
              onClick: w[0] || (w[0] = (I) => O.value = !e(O)),
              active: e(O)
            }, {
              default: c(() => [
                v(te, {
                  icon: e(s).icon
                }, null, 8, ["icon"])
              ]),
              _: 1
            }, 8, ["title", "aria-label", "active"])) : x("", !0)
          ]),
          _: 3
        })) : e(a).view.startsWith("detail.") && e(a).value ? (p(), g(Je, {
          key: 1,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: c(() => [
            k($.$slots, "nav.detail", X(Z(b.value))),
            e(a).view == "detail.edit" && e(a).value ? (p(), g(st, { key: 0 }, {
              activator: c(({ props: I }) => [
                v(K, N({ "prepend-icon": "mdi-dots-vertical" }, I), {
                  default: c(() => [
                    R(le(e(V)("actions")), 1)
                  ]),
                  _: 2
                }, 1040)
              ]),
              default: c(() => [
                v(pe, null, {
                  default: c(() => [
                    k($.$slots, "item.actions", {
                      value: e(a).value
                    })
                  ]),
                  _: 3
                })
              ]),
              _: 3
            })) : x("", !0),
            v(K, {
              disabled: !e(S),
              title: e(V)("prev"),
              "aria-label": e(V)("prev"),
              onClick: w[1] || (w[1] = W((I) => e(a).show({ view: e(a).view, value: e(S) }), ["stop"]))
            }, {
              default: c(() => [
                v(te, { icon: "mdi-chevron-left" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"]),
            v(K, {
              disabled: !e(y),
              title: e(V)("next"),
              "aria-label": e(V)("next"),
              onClick: w[2] || (w[2] = W((I) => e(a).show({ view: e(a).view, value: e(y) }), ["stop"]))
            }, {
              default: c(() => [
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
          "onUpdate:modelValue": w[8] || (w[8] = (I) => e(a).view = I)
        }, {
          default: c(() => {
            var I;
            return [
              v(K, {
                value: "list.table",
                onClick: w[3] || (w[3] = W((z) => e(a).show({ view: "list.table" }), ["stop"])),
                title: e(V)("panels.nav.table"),
                "aria-label": e(V)("panels.nav.table")
              }, {
                default: c(() => [
                  v(te, null, {
                    default: c(() => w[9] || (w[9] = [
                      R("mdi-table")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"]),
              e(d)["views.list.cards"] ? (p(), g(K, {
                key: 0,
                value: "list.cards",
                onClick: w[4] || (w[4] = W((z) => e(a).show({ view: "list.cards" }), ["stop"])),
                title: e(V)("panels.nav.cards"),
                "aria-label": e(V)("panels.nav.cards")
              }, {
                default: c(() => [
                  v(te, null, {
                    default: c(() => w[10] || (w[10] = [
                      R("mdi-card-account-details")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : x("", !0),
              e(d)["views.list.kanban"] ? (p(), g(K, {
                key: 1,
                value: "list.kanban",
                onClick: w[5] || (w[5] = W((z) => e(a).show({ view: "list.kanban" }), ["stop"])),
                title: e(V)("panels.nav.kanban"),
                "aria-label": e(V)("panels.nav.kanban")
              }, {
                default: c(() => [
                  v(te, null, {
                    default: c(() => w[11] || (w[11] = [
                      R("mdi-view-column")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : x("", !0),
              e(n) ? (p(), g(K, {
                key: 2,
                value: "detail.add",
                onClick: w[6] || (w[6] = W((z) => e(a).create(), ["stop"])),
                title: e(V)("panels.nav.add"),
                "aria-label": e(V)("panels.nav.add")
              }, {
                default: c(() => [
                  v(te, null, {
                    default: c(() => w[12] || (w[12] = [
                      R("mdi-plus-box")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : x("", !0),
              e(d)["views.detail.edit"] || e(n) ? (p(), g(K, {
                key: 3,
                value: "detail.edit",
                onClick: w[7] || (w[7] = W((z) => e(a).show({ view: "detail.edit", value: e(a).value }), ["stop"])),
                disabled: !((I = e(a).value) != null && I.id),
                title: e(V)("panels.nav.edit"),
                "aria-label": e(V)("panels.nav.edit")
              }, {
                default: c(() => [
                  v(te, null, {
                    default: c(() => w[13] || (w[13] = [
                      R("mdi-pencil")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"])) : x("", !0),
              k($.$slots, "nav.views", X(Z(b.value)))
            ];
          }),
          _: 3
        }, 8, ["modelValue"])
      ]),
      top: c(() => [
        i.warning ? (p(), g(ge, {
          key: 0,
          type: "warning",
          variant: "tonal",
          text: i.warning
        }, null, 8, ["text"])) : x("", !0),
        k($.$slots, "top"),
        Ft(v(rt, {
          ref_key: "filters",
          ref: s,
          search: i.search,
          "teleport-to": "#panel-list-actions"
        }, {
          default: c((I) => [
            k($.$slots, "list.filters", X(Z(I)))
          ]),
          _: 3
        }, 8, ["search"]), [
          [Dt, e(a).view.startsWith("list.") && e(O)]
        ])
      ]),
      _: 2
    }, [
      e(d)["views.list.table"] ? void 0 : {
        name: "views.list.table",
        fn: c(() => [
          v(ut, { headers: J.value }, me({ _: 2 }, [
            Y(e(r), (I, z) => ({
              name: z,
              fn: c((Q) => [
                k($.$slots, z, X(Z(Q)))
              ])
            }))
          ]), 1032, ["headers"])
        ]),
        key: "0"
      },
      Y(e(l), (I, z) => ({
        name: z,
        fn: c(() => [
          k($.$slots, z, X(Z(b.value)))
        ])
      })),
      e(d)["views.detail.edit"] || e(n) ? {
        name: "views.detail.edit",
        fn: c(() => [
          v(e(ct), {
            title: e(V)(`models.${e(a).model.entity}`)
          }, me({ _: 2 }, [
            Y(e(n), (I, z) => ({
              name: I,
              fn: c(() => [
                k($.$slots, z, {
                  saved: T,
                  value: e(a).value
                })
              ])
            }))
          ]), 1032, ["title"])
        ]),
        key: "1"
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
  OxListKanban: xa,
  OxListTable: ut,
  OxLogin: Pa,
  OxModelEdit: Ta,
  OxModelPanel: Ia,
  OxPanel: dt,
  OxStateAlert: Se,
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
  xa as OxListKanban,
  ut as OxListTable,
  Pa as OxLogin,
  Ta as OxModelEdit,
  Ia as OxModelPanel,
  dt as OxPanel,
  Se as OxStateAlert,
  Ke as OxValidationBtn,
  ct as OxView
};
//# sourceMappingURL=components.js.map
