import { defineComponent as ae, inject as M, createElementBlock as P, createCommentVNode as C, unref as e, openBlock as c, Fragment as T, createBlock as g, withModifiers as J, useSlots as ce, renderSlot as b, normalizeProps as Y, guardReactiveProps as H, ref as W, computed as D, resolveComponent as Ot, createVNode as p, withCtx as d, createTextVNode as E, toDisplayString as te, renderList as X, mergeProps as G, mergeModels as Me, useModel as Re, shallowRef as re, watch as Z, onMounted as $e, onScopeDispose as Pt, nextTick as Ie, watchEffect as At, reactive as Fe, onErrorCaptured as Tt, createElementVNode as de, createSlots as fe, useAttrs as It, toRaw as Ae, h as Ft, normalizeClass as _t, useTemplateRef as lt, withKeys as We, onUnmounted as Lt, Teleport as qe, toRefs as Dt, withDirectives as Bt, vShow as Mt } from "vue";
import { useAction as Rt, t as V, filterSlots as pe, useAppContext as Ut, usePanels as Et, excludeValues as Nt, useModelList as Kt, query as jt, defineAsyncComponent as zt, tKeys as Gt, useModelEditor as Wt, useModelPanel as qt } from "ox";
import { V as z, a as se, b as Yt, c as _e, d as Ue, e as at, f as me, u as Ht, g as Jt, h as Qt, i as Xt, j as Zt, k as Ee, l as Ne, m as el, n as tl, o as ll, p as al, q as nl, r as sl, s as Ye, t as ol, v as il, w as nt, x as rl, y as ul, z as He, A as st, B as dl, C as cl, D as ot, E as Le, F as vl, G as pl, H as ml, I as fl, J as yl, K as ke, L as le, M as it, N as bl, O as gl, P as kl, Q as wl, R as Vl, S as hl, T as $l, U as Sl, W as xl, X as Cl, Y as Ol, Z as Pl, _ as Al, $ as Tl, a0 as Il, a1 as Fl, a2 as _l, a3 as rt, a4 as Ll, a5 as Dl, a6 as Bl, a7 as Ml, a8 as Rl, a9 as ge, aa as Ul, ab as El, ac as Nl, ad as Je, ae as Kl, af as Qe, ag as jl } from "./VContainer-DjsfP5l2.js";
import { l as Se, n as Ke, u as Ve, o as zl, q as Gl, r as Wl, s as ut, t as ql, v as Yl, w as Hl, j as Jl, x as Ql, y as Xl, z as Xe, A as Ze, B as Zl } from "./theme-BrdPdMMA.js";
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
    permissions: { type: [String, Function, Array] },
    run: {},
    href: {}
  },
  emits: ["completed"],
  setup(t, { emit: m }) {
    const l = t, o = m, n = M("context"), { run: s, processing: u, allowed: v } = Rt({ user: n.user, emits: o, props: l });
    return (r, a) => e(v) ? (c(), P(T, { key: 0 }, [
      l.button ? (c(), g(z, {
        key: 0,
        variant: "text",
        disabled: e(u),
        color: l.color,
        icon: l.icon,
        title: l.title,
        "aria-label": l.title,
        onClick: J(e(s), ["stop"])
      }, null, 8, ["disabled", "color", "icon", "title", "aria-label", "onClick"])) : (c(), g(se, {
        key: 1,
        title: l.title,
        "base-color": l.color,
        "prepend-icon": l.icon,
        disabled: e(u),
        onClick: J(e(s), ["stop"])
      }, null, 8, ["title", "base-color", "prepend-icon", "disabled", "onClick"]))
    ], 64)) : C("", !0);
  }
}), oa = /* @__PURE__ */ ae({
  __name: "OxActionModelDelete",
  props: {
    item: {},
    button: { type: Boolean }
  },
  setup(t) {
    const m = M("panel"), l = M("repos"), o = t;
    async function n(s, u) {
      return await l[u.constructor.entity].api().delete(u.$url(), { delete: o.item.id });
    }
    return (s, u) => (c(), g(he, {
      item: o.item,
      button: o.button,
      icon: "mdi-delete",
      color: "error",
      title: e(V)("actions.delete"),
      confirm: e(V)("actions.delete.confirm"),
      permissions: ["delete", (v, r) => r.id],
      run: n,
      onCompleted: u[0] || (u[0] = (v) => {
        var r;
        return (r = e(m)) == null ? void 0 : r.show({ view: e(m).index });
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
    const m = t;
    return (l, o) => (c(), P(T, null, [
      b(l.$slots, "before", Y(H(m))),
      b(l.$slots, "default", Y(H(m))),
      b(l.$slots, "after", Y(H(m)))
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
    W(null);
    const l = M("user"), o = M("panels");
    D(() => !m.auto || panel.name == m.name);
    function n(u) {
      return u.permissions && !l.can(u.permissions) ? !1 : u.items ? u.items.some((v) => n(v)) : !0;
    }
    function s() {
      const u = { panel: m.name, href: m.url };
      o.show(u);
    }
    return (u, v) => {
      const r = Ot("ox-app-nav-item", !0);
      return n(m) ? (c(), P(T, { key: 0 }, [
        m.type == "subheader" ? (c(), P(T, { key: 0 }, [
          p(Yt, null, {
            default: d(() => [
              E(te(m.title), 1)
            ]),
            _: 1
          }),
          m.items ? (c(!0), P(T, { key: 0 }, X(m.items, (a) => (c(), g(r, G({ ref_for: !0 }, a), null, 16))), 256)) : C("", !0)
        ], 64)) : m.type == "group" ? (c(), g(_e, {
          key: 1,
          value: m.name
        }, {
          activator: d(({ props: a }) => [
            p(se, G(a, {
              title: m.title,
              "prepend-icon": m.icon
            }), null, 16, ["title", "prepend-icon"])
          ]),
          default: d(() => [
            (c(!0), P(T, null, X(m.items, (a, i) => (c(), g(r, G({
              key: i,
              ref_for: !0
            }, a), null, 16))), 128))
          ]),
          _: 1
        }, 8, ["value"])) : m.type == "divider" ? (c(), g(Ue, { key: 2 })) : (c(), g(se, {
          key: 3,
          active: e(o).panel == m.name,
          value: m.name,
          "prepend-icon": m.icon,
          title: m.title,
          onClick: J(s, ["stop"])
        }, null, 8, ["active", "value", "prepend-icon", "title"]))
      ], 64)) : C("", !0);
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
    const m = M("panels"), l = Re(t, "drawer"), o = W([]), n = t, s = D(() => (u(n.items), n.items));
    function u(r) {
      o.value = v(r);
    }
    function v(r) {
      if (m.panel) {
        for (const a of r)
          if (a.items) {
            const i = v(a.items);
            if (i)
              return [i, a.name];
          } else if (a.name == m.panel)
            return [a.name];
      }
    }
    return (r, a) => (c(), g(at, {
      modelValue: l.value,
      "onUpdate:modelValue": a[1] || (a[1] = (i) => l.value = i),
      theme: "dark"
    }, {
      append: d(() => [
        p(me, null, {
          default: d(() => [
            b(r.$slots, "append")
          ]),
          _: 3
        })
      ]),
      default: d(() => [
        b(r.$slots, "prepend"),
        p(me, {
          opened: o.value,
          "onUpdate:opened": a[0] || (a[0] = (i) => o.value = i),
          density: "compact"
        }, {
          default: d(() => [
            (c(!0), P(T, null, X(s.value, (i, y) => (c(), g(e(ra), G({
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
  function s(u) {
    const v = u ? getComputedStyle(u) : {
      transitionDuration: 0.2
    }, r = parseFloat(v.transitionDuration) * 1e3 || 200;
    if (o(), m.value <= 0) return;
    const a = performance.now();
    l = window.setInterval(() => {
      const i = performance.now() - a + r;
      m.value = Math.max(t() - i, 0), m.value <= 0 && o();
    }, r);
  }
  return Pt(o), {
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
  ...ut(nl({
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
      themeClasses: u
    } = zl(t), {
      colorClasses: v,
      colorStyles: r,
      variantClasses: a
    } = Qt(t), {
      roundedClasses: i
    } = Xt(t), y = da(() => Number(t.timeout)), w = W(), h = W(), I = re(!1), N = re(0), _ = W(), O = M(Zt, void 0);
    Gl(() => !!O, () => {
      const K = sl();
      At(() => {
        _.value = K.mainStyles.value;
      });
    }), Z(o, k), Z(() => t.timeout, k), $e(() => {
      o.value && k();
    });
    let S = -1;
    function k() {
      y.reset(), window.clearTimeout(S);
      const K = Number(t.timeout);
      if (!o.value || K === -1) return;
      const ie = Wl(h.value);
      y.start(ie), S = window.setTimeout(() => {
        o.value = !1;
      }, K);
    }
    function $() {
      y.reset(), window.clearTimeout(S);
    }
    function L() {
      I.value = !0, $();
    }
    function F() {
      I.value = !1, k();
    }
    function ue(K) {
      N.value = K.touches[0].clientY;
    }
    function oe(K) {
      Math.abs(N.value - K.changedTouches[0].clientY) > 50 && (o.value = !1);
    }
    function Ce() {
      I.value && F();
    }
    const ye = D(() => t.location.split(" ").reduce((K, ie) => (K[`v-snackbar--${ie}`] = !0, K), {}));
    return Ee(() => {
      const K = Ye.filterProps(t), ie = !!(l.default || l.text || t.text);
      return p(Ye, G({
        ref: w,
        class: ["v-snackbar", {
          "v-snackbar--active": o.value,
          "v-snackbar--multi-line": t.multiLine && !t.vertical,
          "v-snackbar--timer": !!t.timer,
          "v-snackbar--vertical": t.vertical
        }, ye.value, n.value, t.class],
        style: [_.value, t.style]
      }, K, {
        modelValue: o.value,
        "onUpdate:modelValue": (B) => o.value = B,
        contentProps: G({
          class: ["v-snackbar__wrapper", u.value, v.value, i.value, a.value],
          style: [r.value],
          onPointerenter: L,
          onPointerleave: F
        }, K.contentProps),
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
          return [ol(!1, "v-snackbar"), t.timer && !I.value && p("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [p(il, {
            ref: h,
            color: typeof t.timer == "string" ? t.timer : "info",
            max: t.timeout,
            "model-value": y.time.value
          }, null)]), ie && p("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((B = l.text) == null ? void 0 : B.call(l)) ?? t.text, (be = l.default) == null ? void 0 : be.call(l)]), l.actions && p(nt, {
            defaults: {
              VBtn: {
                variant: "text",
                ripple: !1,
                slim: !0
              }
            }
          }, {
            default: () => [p("div", {
              class: "v-snackbar__actions"
            }, [l.actions({
              isActive: o
            })])]
          })];
        },
        activator: l.activator
      });
    }), Ne({}, w);
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
    const m = ce(), l = pe(m, "panels."), o = t, n = Fe({ drawer: !0 }), s = Ut(o), u = Et();
    return $e(() => {
      u.panel = s.data.panel;
    }), Z(() => [s.state.state, s.state.data], () => {
      s.showState = !0;
    }), Tt((v, r, a) => {
      s.state.error(`${v}`);
    }), (v, r) => (c(), g(rl, null, {
      default: d(() => [
        p(va, {
          modelValue: e(s).showState,
          "onUpdate:modelValue": r[0] || (r[0] = (a) => e(s).showState = a),
          color: e(s).state.color,
          "multi-line": ""
        }, {
          default: d(() => [
            E(te(e(s).state.data), 1)
          ]),
          _: 1
        }, 8, ["modelValue", "color"]),
        p(ul, { color: "primary" }, {
          prepend: d(() => [
            p(st, {
              icon: "mdi-apps",
              title: e(V)("nav.panels"),
              "aria-label": e(V)("nav.panels"),
              onClick: r[1] || (r[1] = J((a) => n.drawer = !n.drawer, ["stop"]))
            }, null, 8, ["title", "aria-label"])
          ]),
          default: d(() => [
            p(He, { id: "app-bar-sheet-title" }),
            p(He, { id: "app-bar-title" }, {
              default: d(() => [
                b(v.$slots, "title", { context: e(s) })
              ]),
              _: 3
            }),
            b(v.$slots, "app-bar-left", { context: e(s) }),
            r[5] || (r[5] = de("div", {
              id: "app-bar-right",
              class: "mr-3"
            }, null, -1)),
            b(v.$slots, "app-bar-right", { context: e(s) })
          ]),
          _: 3
        }),
        p(e(ua), {
          drawer: n.drawer,
          "onUpdate:drawer": r[3] || (r[3] = (a) => n.drawer = a),
          items: e(s).data.nav
        }, fe({
          prepend: d(() => [
            de("a", pa, [
              v.logo ? (c(), g(dl, {
                key: 0,
                src: v.logo,
                class: "logo"
              }, null, 8, ["src"])) : C("", !0)
            ]),
            b(v.$slots, "nav-start", { context: e(s) })
          ]),
          _: 2
        }, [
          e(m)["nav-end"] ? {
            name: "append",
            fn: d(() => [
              p(me, {
                opened: n.opened,
                "onUpdate:opened": r[2] || (r[2] = (a) => n.opened = a)
              }, {
                default: d(() => [
                  b(v.$slots, "nav-end", { context: e(s) })
                ]),
                _: 3
              }, 8, ["opened"])
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["drawer", "items"]),
        p(cl, null, {
          default: d(() => [
            b(v.$slots, "main", {}, () => [
              p(ot, {
                modelValue: e(u).panel,
                "onUpdate:modelValue": r[4] || (r[4] = (a) => e(u).panel = a)
              }, {
                default: d((a) => [
                  b(v.$slots, "default", G(a, { context: e(s) })),
                  (c(!0), P(T, null, X(e(l), (i, y) => (c(), g(Le, {
                    key: y,
                    value: i
                  }, {
                    default: d(() => [
                      b(v.$slots, y, G({ ref_for: !0 }, a, { context: e(s) }))
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
  ...ut(xl({
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
    } = Yl(), n = W(), s = re(!1), u = re(!0), v = re(!1), r = W(), a = W(), i = re(-1), {
      items: y,
      transformIn: w,
      transformOut: h
    } = vl(t), {
      textColorClasses: I,
      textColorStyles: N
    } = pl(() => {
      var f;
      return (f = n.value) == null ? void 0 : f.color;
    }), _ = Ve(t, "search", ""), O = Ve(t, "modelValue", [], (f) => w(f === null ? [null] : Hl(f)), (f) => {
      const x = h(f);
      return t.multiple ? x : x[0] ?? null;
    }), S = D(() => typeof t.counterValue == "function" ? t.counterValue(O.value) : typeof t.counterValue == "number" ? t.counterValue : O.value.length), k = ml(t), {
      filteredItems: $,
      getMatches: L
    } = fl(t, y, () => u.value ? "" : _.value), F = D(() => t.hideSelected ? $.value.filter((f) => !O.value.some((x) => x.value === f.value)) : $.value), ue = D(() => !!(t.chips || l.chip)), oe = D(() => ue.value || !!l.selection), Ce = D(() => O.value.map((f) => f.props.value)), ye = D(() => {
      var x;
      return (t.autoSelectFirst === !0 || t.autoSelectFirst === "exact" && _.value === ((x = F.value[0]) == null ? void 0 : x.title)) && F.value.length > 0 && !u.value && !v.value;
    }), K = D(() => t.hideNoData && !F.value.length || k.isReadonly.value || k.isDisabled.value), ie = Ve(t, "menu"), B = D({
      get: () => ie.value,
      set: (f) => {
        var x;
        ie.value && !f && ((x = r.value) != null && x.ΨopenChildren.size) || f && K.value || (ie.value = f);
      }
    }), be = D(() => B.value ? t.closeText : t.openText), Oe = W(), mt = yl(Oe, n);
    function ft(f) {
      t.openOnClear && (B.value = !0), _.value = "";
    }
    function yt() {
      K.value || (B.value = !0);
    }
    function bt(f) {
      K.value || (s.value && (f.preventDefault(), f.stopPropagation()), B.value = !B.value);
    }
    function gt(f) {
      var x;
      f.key !== " " && Xe(f) && ((x = n.value) == null || x.focus());
    }
    function kt(f) {
      var A, j, ee, ne, R;
      if (k.isReadonly.value) return;
      const x = (A = n.value) == null ? void 0 : A.selectionStart, U = O.value.length;
      if (["Enter", "ArrowDown", "ArrowUp"].includes(f.key) && f.preventDefault(), ["Enter", "ArrowDown"].includes(f.key) && (B.value = !0), ["Escape"].includes(f.key) && (B.value = !1), ye.value && ["Enter", "Tab"].includes(f.key) && !O.value.some((Q) => {
        let {
          value: q
        } = Q;
        return q === F.value[0].value;
      }) && ve(F.value[0]), f.key === "ArrowDown" && ye.value && ((j = Oe.value) == null || j.focus("next")), ["Backspace", "Delete"].includes(f.key)) {
        if (!t.multiple && oe.value && O.value.length > 0 && !_.value) return ve(O.value[0], !1);
        if (~i.value) {
          f.preventDefault();
          const Q = i.value;
          ve(O.value[i.value], !1), i.value = Q >= U - 1 ? U - 2 : Q;
        } else f.key === "Backspace" && !_.value && (i.value = U - 1);
        return;
      }
      if (t.multiple)
        if (f.key === "ArrowLeft") {
          if (i.value < 0 && x && x > 0) return;
          const Q = i.value > -1 ? i.value - 1 : U - 1;
          if (O.value[Q])
            i.value = Q;
          else {
            const q = ((ee = _.value) == null ? void 0 : ee.length) ?? null;
            i.value = -1, (ne = n.value) == null || ne.setSelectionRange(q, q);
          }
        } else if (f.key === "ArrowRight") {
          if (i.value < 0) return;
          const Q = i.value + 1;
          O.value[Q] ? i.value = Q : (i.value = -1, (R = n.value) == null || R.setSelectionRange(0, 0));
        } else ~i.value && Xe(f) && (i.value = -1);
    }
    function wt(f) {
      if (Ze(n.value, ":autofill") || Ze(n.value, ":-webkit-autofill")) {
        const x = y.value.find((U) => U.title === f.target.value);
        x && ve(x);
      }
    }
    function Vt() {
      var f;
      t.eager && ((f = a.value) == null || f.calculateVisibleItems());
    }
    function ht() {
      var f;
      s.value && (u.value = !0, (f = n.value) == null || f.focus());
    }
    function $t(f) {
      s.value = !0, setTimeout(() => {
        v.value = !0;
      });
    }
    function St(f) {
      v.value = !1;
    }
    function xt(f) {
      (f == null || f === "" && !t.multiple && !oe.value) && (O.value = []);
    }
    const Pe = re(!1);
    function ve(f) {
      let x = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!(!f || f.props.disabled))
        if (t.multiple) {
          const U = O.value.findIndex((j) => (t.valueComparator || Zl)(j.value, f.value)), A = x ?? !~U;
          if (~U) {
            const j = A ? [...O.value, f] : [...O.value];
            j.splice(U, 1), O.value = j;
          } else A && (O.value = [...O.value, f]);
          t.clearOnSelect && (_.value = "");
        } else {
          const U = x !== !1;
          O.value = U ? [f] : [], _.value = U && !oe.value ? f.title : "", Ie(() => {
            B.value = !1, u.value = !0;
          });
        }
    }
    return Z(s, (f, x) => {
      var U;
      f !== x && (f ? (Pe.value = !0, _.value = t.multiple || oe.value ? "" : String(((U = O.value.at(-1)) == null ? void 0 : U.props.title) ?? ""), u.value = !0, Ie(() => Pe.value = !1)) : (!t.multiple && _.value == null && (O.value = []), B.value = !1, (t.multiple || oe.value) && (_.value = ""), i.value = -1));
    }), Z(_, (f) => {
      !s.value || Pe.value || (f && (B.value = !0), u.value = !f);
    }), Z(B, () => {
      if (!t.hideSelected && B.value && O.value.length) {
        const f = F.value.findIndex((x) => O.value.some((U) => x.value === U.value));
        Jl && window.requestAnimationFrame(() => {
          var x;
          f >= 0 && ((x = a.value) == null || x.scrollToIndex(f));
        });
      }
    }), Z(() => t.items, (f, x) => {
      B.value || s.value && !x.length && f.length && (B.value = !0);
    }), Z(O, (f) => {
      var x;
      !t.multiple && !oe.value && (_.value = ((x = f[0]) == null ? void 0 : x.title) ?? "");
    }), Ee(() => {
      const f = !!(!t.hideNoData || F.value.length || l["prepend-item"] || l["append-item"] || l["no-data"]), x = O.value.length > 0, U = ke.filterProps(t);
      return p(ke, G({
        ref: n
      }, U, {
        modelValue: _.value,
        "onUpdate:modelValue": [(A) => _.value = A, xt],
        focused: s.value,
        "onUpdate:focused": (A) => s.value = A,
        validationValue: O.externalValue,
        counterValue: S.value,
        dirty: x,
        onChange: wt,
        class: ["v-autocomplete", `v-autocomplete--${t.multiple ? "multiple" : "single"}`, {
          "v-autocomplete--active-menu": B.value,
          "v-autocomplete--chips": !!t.chips,
          "v-autocomplete--selection-slot": !!oe.value,
          "v-autocomplete--selecting-index": i.value > -1
        }, t.class],
        style: t.style,
        readonly: k.isReadonly.value,
        placeholder: x ? void 0 : t.placeholder,
        "onClick:clear": ft,
        "onMousedown:control": yt,
        onKeydown: kt
      }), {
        ...l,
        default: () => p(T, null, [p(it, G({
          ref: r,
          modelValue: B.value,
          "onUpdate:modelValue": (A) => B.value = A,
          activator: "parent",
          contentClass: "v-autocomplete__content",
          disabled: K.value,
          eager: t.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: t.transition,
          onAfterEnter: Vt,
          onAfterLeave: ht
        }, t.menuProps), {
          default: () => [f && p(me, G({
            ref: Oe,
            selected: Ce.value,
            selectStrategy: t.multiple ? "independent" : "single-independent",
            onMousedown: (A) => A.preventDefault(),
            onKeydown: gt,
            onFocusin: $t,
            onFocusout: St,
            tabindex: "-1",
            "aria-live": "polite",
            color: t.itemColor ?? t.color
          }, mt, t.listProps), {
            default: () => {
              var A, j, ee;
              return [(A = l["prepend-item"]) == null ? void 0 : A.call(l), !F.value.length && !t.hideNoData && (((j = l["no-data"]) == null ? void 0 : j.call(l)) ?? p(se, {
                key: "no-data",
                title: o(t.noDataText)
              }, null)), p(bl, {
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
                    itemRef: q
                  } = ne;
                  const ze = G(R.props, {
                    ref: q,
                    key: R.value,
                    active: ye.value && Q === 0 ? !0 : void 0,
                    onClick: () => ve(R, null)
                  });
                  return ((Ge = l.item) == null ? void 0 : Ge.call(l, {
                    item: R,
                    index: Q,
                    props: ze
                  })) ?? p(se, G(ze, {
                    role: "option"
                  }), {
                    prepend: (we) => {
                      let {
                        isSelected: Ct
                      } = we;
                      return p(T, null, [t.multiple && !t.hideSelected ? p(kl, {
                        key: R.value,
                        modelValue: Ct,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, R.props.prependAvatar && p(wl, {
                        image: R.props.prependAvatar
                      }, null), R.props.prependIcon && p(le, {
                        icon: R.props.prependIcon
                      }, null)]);
                    },
                    title: () => {
                      var we;
                      return u.value ? R.title : gl("v-autocomplete", R.title, (we = L(R)) == null ? void 0 : we.title);
                    }
                  });
                }
              }), (ee = l["append-item"]) == null ? void 0 : ee.call(l)];
            }
          })]
        }), O.value.map((A, j) => {
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
          }, R = ue.value ? !!l.chip : !!l.selection, Q = R ? Xl(ue.value ? l.chip({
            item: A,
            index: j,
            props: ne
          }) : l.selection({
            item: A,
            index: j
          })) : void 0;
          if (!(R && !Q))
            return p("div", {
              key: A.value,
              class: ["v-autocomplete__selection", j === i.value && ["v-autocomplete__selection--selected", I.value]],
              style: j === i.value ? N.value : {}
            }, [ue.value ? l.chip ? p(nt, {
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
            }) : p(Vl, G({
              key: "chip",
              closable: t.closableChips,
              size: "small",
              text: A.title,
              disabled: A.props.disabled
            }, ne), null) : Q ?? p("span", {
              class: "v-autocomplete__selection-text"
            }, [A.title, t.multiple && j < O.value.length - 1 && p("span", {
              class: "v-autocomplete__selection-comma"
            }, [E(",")])])]);
        })]),
        "append-inner": function() {
          var ne, R;
          for (var A = arguments.length, j = new Array(A), ee = 0; ee < A; ee++)
            j[ee] = arguments[ee];
          return p(T, null, [(ne = l["append-inner"]) == null ? void 0 : ne.call(l, ...j), t.menuIcon ? p(le, {
            class: "v-autocomplete__menu-icon",
            color: (R = n.value) == null ? void 0 : R.fieldIconColor,
            icon: t.menuIcon,
            onMousedown: bt,
            onClick: Ql,
            "aria-label": o(be.value),
            title: o(be.value),
            tabindex: "-1"
          }, null) : void 0]);
        }
      });
    }), Ne({
      isFocused: s,
      isPristine: u,
      menu: B,
      search: _,
      filteredItems: $,
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
    const m = ce(), l = Re(t, "modelValue"), o = W(null), n = W(""), s = t, u = It(), v = M("repos"), r = Nt(s, ["repo", "search"]), { list: a, items: i } = Kt({
      ...(O = r.value) == null ? void 0 : O[1],
      filters: s.filters || {},
      save: !1,
      query: jt(s.repo, v)
    });
    var y = null;
    async function w(S) {
      if (S) {
        const k = a.findIndex(S);
        if (k != -1)
          o.value = a.items[k];
        else if (y != S) {
          y = S;
          const L = (await a.load({ id: S, append: 0 })).entities[0];
          o.value = L.id == S ? L : null;
        }
      } else
        o.value = null;
      return o;
    }
    let h = null;
    const I = et.debounce(async ({ reset: S = !1 } = {}) => {
      const k = n.value != "<empty string>" && n.value || "";
      if (!S && k == h)
        return;
      h = k, a.filters = { ...s.filters }, a.filters[s.lookup] = k;
      let $ = await a.load();
      return o.value && a.add(o.value, 0), S || (!o.value && await w(l.value), (!n.value || n.value == "<empty string>") && (n.value = k)), $;
    }, 300);
    function N(S) {
      const k = { ...Ae(a.filters) };
      delete k[s.lookup], et.isEqual(Ae(k), Ae(S)) || I({ reset: !0 });
    }
    function _(S) {
      S != "<empty string>" && S != h && (console.log("search updated >", `"${S}"`, h), I({ q: S }));
    }
    return $e(() => {
      var S;
      (S = a.load()) == null || S.then(() => w(l.value));
    }), Z(() => s.filters, (S) => N(S)), Z(n, _), Z(l, (S, k) => S != k && w(S)), (S, k) => (c(), P(T, null, [
      s.name ? (c(), P("input", {
        key: 0,
        type: "hidden",
        name: s.name,
        value: l.value
      }, null, 8, ba)) : C("", !0),
      p(e(ya), G(e(u), {
        items: e(i),
        loading: e(a).state.isProcessing,
        modelValue: l.value,
        "onUpdate:modelValue": k[0] || (k[0] = ($) => l.value = $),
        search: n.value,
        "onUpdate:search": k[1] || (k[1] = ($) => n.value = $)
      }), fe({ _: 2 }, [
        X(e(m), ($, L) => ({
          name: L,
          fn: d((F) => [
            b(S.$slots, L, Y(H(F)))
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
    const m = re(null), l = D(() => {
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
      m.value = zt(t.src, l.value);
    }
    return Z(() => t.src, o), o(), () => Ft(m.value, t);
  }
}, wa = { class: "text-error" }, De = {
  __name: "OxFieldDetails",
  props: {
    state: Object,
    errors: Array
  },
  setup(t) {
    const m = t;
    return (l, o) => m.errors ? (c(!0), P(T, { key: 0 }, X(m.errors, (n) => (c(), P("div", wa, [
      p(le, { icon: "mdi-alert-circle-outline" }),
      E(" " + te(n), 1)
    ]))), 256)) : C("", !0);
  }
}, dt = {
  __name: "OxListFilters",
  props: {
    search: String
  },
  setup(t, { expose: m }) {
    const l = M("list"), o = t, n = D(() => {
      const v = l.filters;
      return v && Object.entries(v).some(
        ([r, a]) => !r.startsWith("page") && !r.startsWith("ordering") && !!a
      );
    }), s = D(() => n.value ? "mdi-filter-check" : "mdi-filter-outline");
    function u() {
      l.filters = {}, l.load();
    }
    return m({ icon: s, hasFilters: n, reset: u }), (v, r) => (c(), P("form", {
      onSubmit: r[2] || (r[2] = J((a) => e(l).load(), ["prevent"])),
      class: "ox-list-filters width-full"
    }, [
      p(Cl, {
        dense: "",
        color: "transparent"
      }, {
        default: d(() => [
          p(st, {
            icon: s.value,
            readonly: ""
          }, null, 8, ["icon"]),
          o.search && e(l).filters ? (c(), g(ke, {
            key: 0,
            label: e(V)("filters.search"),
            density: "compact",
            class: "ml-2",
            modelValue: e(l).filters[o.search],
            "onUpdate:modelValue": r[0] || (r[0] = (a) => e(l).filters[o.search] = a),
            "hide-details": ""
          }, null, 8, ["label", "modelValue"])) : C("", !0),
          b(v.$slots, "default", {
            list: e(l),
            filters: e(l).filters
          }),
          p(z, {
            onClick: r[1] || (r[1] = J((a) => e(l).load(), ["stop"])),
            class: "ml-2",
            icon: "mdi-check",
            "aria-label": v.$t("filters.apply"),
            title: e(V)("filters.apply")
          }, null, 8, ["aria-label", "title"]),
          n.value ? (c(), g(z, {
            key: 1,
            onClick: J(u, ["stop"]),
            icon: "mdi-backspace",
            "aria-label": e(V)("filters.reset"),
            title: e(V)("filters.reset")
          }, null, 8, ["aria-label", "title"])) : C("", !0)
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
    const n = Ol(t), s = W();
    function u(r) {
      r.preventDefault(), n.reset();
    }
    function v(r) {
      const a = r, i = n.validate();
      a.then = i.then.bind(i), a.catch = i.catch.bind(i), a.finally = i.finally.bind(i), o("submit", a), a.defaultPrevented || i.then((y) => {
        var h;
        let {
          valid: w
        } = y;
        w && ((h = s.value) == null || h.submit());
      }), a.preventDefault();
    }
    return Ee(() => {
      var r;
      return p("form", {
        ref: s,
        class: ["v-form", t.class],
        style: t.style,
        novalidate: !0,
        onReset: u,
        onSubmit: v
      }, [(r = l.default) == null ? void 0 : r.call(l, n)]);
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
    const m = Re(t, "modelValue"), l = M("user"), o = W({}), n = t, s = D(() => ({
      add: n.editable && l.can([n.useModel, "add"]),
      change: n.editable && l.can([n.useModel, "change"]),
      delete: n.editable && l.can([n.useModel, "delete"])
    })), u = W([]);
    (a = m.value) != null && a.length || u.value.push(-1);
    function v() {
      m.value.push(o.value), o.value = {};
    }
    function r(i) {
      confirm(V("actions.delete.confirm")) && n.delete && m.value.splice(i);
    }
    return (i, y) => (c(), g(me, {
      opened: u.value,
      "onUpdate:opened": y[3] || (y[3] = (w) => u.value = w)
    }, {
      default: d(() => {
        var w;
        return [
          (w = m.value) != null && w.length ? (c(!0), P(T, { key: 0 }, X(m.value, (h, I) => (c(), g(_e, {
            key: I,
            value: I
          }, {
            activator: d(({ props: N }) => [
              p(se, G({ ref_for: !0 }, N), {
                append: d(() => [
                  de("div", {
                    onClick: y[0] || (y[0] = J(() => {
                    }, ["stop"]))
                  }, [
                    b(i.$slots, "item.actions", G({
                      item: h,
                      index: I,
                      ref_for: !0
                    }, N)),
                    s.value.delete ? (c(), g(z, {
                      key: 0,
                      type: "button",
                      class: "ml-2",
                      size: "small",
                      onClick: J((_) => r(I), ["stop", "prevent"]),
                      color: "error",
                      "aria-label": e(V)("actions.remove"),
                      title: e(V)("actions.remove"),
                      icon: "mdi-delete"
                    }, null, 8, ["onClick", "aria-label", "title"])) : C("", !0)
                  ])
                ]),
                default: d(() => [
                  p(Tl, null, {
                    default: d(() => [
                      b(i.$slots, "item.title", { item: h })
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1040)
            ]),
            default: d(() => [
              p(Be, {
                disabled: !s.value.change
              }, {
                default: d(() => [
                  b(i.$slots, "item", {
                    item: h,
                    index: I,
                    editable: s.value.change
                  })
                ]),
                _: 2
              }, 1032, ["disabled"])
            ]),
            _: 2
          }, 1032, ["value"]))), 128)) : (c(), g(se, {
            key: 1,
            title: e(V)("lists.empty")
          }, null, 8, ["title"])),
          s.value.add ? (c(), P(T, { key: 2 }, [
            m.value.length ? (c(), g(Ue, { key: 0 })) : C("", !0),
            p(_e, { value: -1 }, {
              activator: d(({ props: h }) => [
                p(se, G(h, {
                  title: e(V)("actions.add_item"),
                  "prepend-icon": "mdi-plus"
                }), null, 16, ["title"])
              ]),
              default: d(() => [
                p(Be, null, {
                  default: d(() => [
                    b(i.$slots, "item", {
                      item: o.value,
                      edit: !0
                    })
                  ]),
                  _: 3
                }),
                o.value ? (c(), g(se, { key: 0 }, {
                  default: d(() => [
                    de("div", ha, [
                      o.value ? (c(), g(z, {
                        key: 0,
                        size: "small",
                        onClick: y[1] || (y[1] = (h) => o.value = {}),
                        color: "secondary",
                        "prepend-icon": "mdi-backspace",
                        "aria-label": e(V)("actions.discard")
                      }, {
                        default: d(() => [
                          E(te(e(V)("actions.discard")), 1)
                        ]),
                        _: 1
                      }, 8, ["aria-label"])) : C("", !0),
                      o.value ? (c(), g(z, {
                        key: 1,
                        size: "small",
                        onClick: y[2] || (y[2] = (h) => v()),
                        color: "primary",
                        "prepend-icon": "mdi-plus",
                        "aria-label": e(V)("actions.add")
                      }, {
                        default: d(() => [
                          E(te(e(V)("actions.add")), 1)
                        ]),
                        _: 1
                      }, 8, ["aria-label"])) : C("", !0)
                    ])
                  ]),
                  _: 1
                })) : C("", !0)
              ]),
              _: 3
            })
          ], 64)) : C("", !0)
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
    const o = Fl(t, _l);
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
    function s(r) {
      return r = r % n.colors.length, n.colorVariant ? n.colors[r] + "-" + n.colorVariant : n.colors[r];
    }
    function u(r, a, i) {
      r[i] ? !r[i].includes(a) && r[i].push(a) : r[i] = [a];
    }
    const v = D(() => {
      const r = {};
      if (o.value)
        for (var a of o.value) {
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
    return (r, a) => (c(), g(rt, null, {
      default: d(() => [
        p(Ll, null, {
          default: d(() => [
            (c(!0), P(T, null, X(n.headers, (i, y) => (c(), g(Sa, {
              key: i.value
            }, {
              default: d(({ selectedClass: w }) => [
                p(Dl, {
                  width: "400",
                  class: _t(["ma-3", w]),
                  color: s(y),
                  lines: "two"
                }, {
                  default: d(() => [
                    p(Bl, null, {
                      default: d(() => [
                        E(te(i.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    p(me, {
                      "bg-color": s(y)
                    }, {
                      default: d(() => [
                        v.value && v.value[i.value] ? (c(!0), P(T, { key: 0 }, X(v.value[i.value], (h) => b(r.$slots, "item", {
                          key: h.id,
                          header: i,
                          item: h
                        }, () => [
                          p(se, {
                            title: h[n.itemTitle],
                            value: n.itemValue && h[n.itemValue],
                            onClick: (I) => l("click", h)
                          }, {
                            append: d(() => [
                              b(r.$slots, "item.action")
                            ]),
                            _: 2
                          }, 1032, ["title", "value", "onClick"])
                        ])), 128)) : C("", !0)
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
}, ct = /* @__PURE__ */ ae({
  __name: "OxListTable",
  props: {
    // list: Object,
    /** Table headers */
    headers: Array,
    /** If True, allow user to edit (display edit button) */
    edit: Boolean
  },
  setup(t) {
    const m = ce(), l = ea(m, "item.", { exclude: ["item.actions"] }), o = M("panel"), n = M("list"), s = M("items"), u = M("user"), v = t, r = D(() => v.headers.reduce((y, w) => (y.push(
      typeof w == "string" ? { key: w, title: V(Gt.field(w)) } : { key: w.key, title: V(w.title) }
    ), y), []));
    function a(y) {
      n.filters.page = y.page, n.filters.page_size = y.itemsPerPage, n.filters.ordering = y.sortBy.map(({ key: w, order: h }) => h == "asc" ? w : `-${w}`);
    }
    function i(y, w) {
      o.show({ view: "detail.edit", value: w });
    }
    return (y, w) => {
      var h;
      return c(), g(Ml, {
        items: e(s),
        "item-index": "id",
        "items-length": e(n).count || e(s).length,
        "items-per-page": v.itemsPerPage,
        loading: (h = e(n).state) == null ? void 0 : h.isProcessing,
        headers: r.value,
        "no-data-text": e(V)("lists.empty"),
        class: "align-top-table",
        "onUpdate:options": a
      }, fe({
        loading: d(() => [
          p(Rl, { type: "table-row@10" })
        ]),
        "item.actions": d(({ item: I }) => [
          e(u).can([I.constructor, "change"], I) ? (c(), g(he, {
            key: 0,
            icon: "mdi-pencil",
            button: "",
            title: e(V)("actions.edit"),
            item: I,
            run: i
          }, null, 8, ["title", "item"])) : e(u).can([I.constructor, "view"], I) ? (c(), g(he, {
            key: 1,
            icon: "mdi-eye-outline",
            button: "",
            title: e(V)("actions.edit"),
            item: I,
            run: i
          }, null, 8, ["title", "item"])) : C("", !0),
          b(y.$slots, "item.actions", {
            value: I,
            dense: !0,
            button: !0
          })
        ]),
        _: 2
      }, [
        X(e(l), (I, N) => ({
          name: N,
          fn: d((_) => [
            b(y.$slots, N, Y(H(_)))
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
    let o = W(!1);
    Z(() => l.state.state, (u) => {
      l.delay && u == ta.PROCESSING && (o.value = !1, window.setTimeout(() => {
        o.value = !0;
      }, 5e3));
    });
    const n = D(() => {
      var u;
      return ((u = l.state) == null ? void 0 : u.isProcessing) && (!l.delay || o.value);
    }), s = D(() => {
      var u, v;
      return (v = (u = l.state) == null ? void 0 : u.data) == null ? void 0 : v.messages;
    });
    return (u, v) => (c(), P(T, null, [
      l.state.isNone && e(m).none ? (c(), g(e(ge), {
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
      }, 8, ["state", "title"])) : n.value ? (c(), g(e(ge), {
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
            v[0] || (v[0] = E(" Data are being sent to server, please be patient. If this message persist you might wan't to retry. "))
          ])
        ]),
        _: 3
      }, 8, ["state", "title"])) : l.state.isError ? (c(), g(e(ge), {
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
            v[1] || (v[1] = E(" Oups... something wrong happened. "))
          ]),
          b(u.$slots, "error-detail", { state: t.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : l.state.isOk ? (c(), g(e(ge), {
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
            v[2] || (v[2] = de("p", null, "Congrats! Data have been updated.", -1))
          ]),
          s.value ? (c(), P(T, { key: 0 }, [
            p(Ue),
            (c(!0), P(T, null, X(s.value, (r) => (c(), P("p", null, te(r), 1))), 256))
          ], 64)) : C("", !0),
          b(u.$slots, "ok-detail", { state: t.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : C("", !0),
      b(u.$slots, "default", {
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
    return (n, s) => (c(), P("div", Ca, [
      p(z, {
        color: "error",
        class: "me-2",
        "prepend-icon": o.resetIcon,
        onClick: s[0] || (s[0] = (u) => l("reset")),
        disabled: o.disabled
      }, {
        default: d(() => [
          b(n.$slots, "discard", {}, () => [
            E(te(o.resetLabel || e(Te)("actions.discard")), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]),
      o.state.isSending || o.state.isProcessing ? (c(), g(z, {
        key: 0,
        color: "primary",
        "prepend-icon": o.processingIcon,
        disabled: ""
      }, {
        default: d(() => [
          b(n.$slots, "processing", {}, () => [
            E(te(o.processingLabel || e(Te)("actions.saving")), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon"])) : (c(), g(z, {
        key: 1,
        color: "primary",
        "prepend-icon": o.validateIcon,
        onClick: s[1] || (s[1] = (u) => l("validate")),
        disabled: o.disabled || o.validateDisabled
      }, {
        default: d(() => [
          b(n.$slots, "validate", {}, () => [
            E(te(o.validateLabel || e(Te)("actions.save")), 1)
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
    }), s = W(!1), u = Fe(new la());
    function v(a = !0) {
      na(n, { username: "", password: "" }), a && u.none();
    }
    async function r() {
      u.processing();
      try {
        const a = await fetch(o.url, {
          method: "POST",
          headers: aa.axiosConfig.headers,
          body: JSON.stringify(n)
        });
        a.status == 200 ? (n.credentials = "", n.password = "", u.ok(await a.json()), o.next && (window.location.href = o.next)) : u.error(await a.json());
      } catch (a) {
        u.ok((a == null ? void 0 : a.message) || a);
      }
    }
    return (a, i) => (c(), P(T, null, [
      p(e(xe), { state: u }, {
        none: d(({ state: y }) => i[7] || (i[7] = [
          de("p", null, "Please enter your credentials in order too proceed...", -1)
        ])),
        "ok-detail": d(({ state: y }) => [
          o.next ? (c(), P("p", Oa, [
            i[8] || (i[8] = E("You soon will be redirected to ")),
            de("i", null, te(o.next), 1)
          ])) : C("", !0)
        ]),
        error: d(({ state: y }) => {
          var w, h;
          return [
            p(De, {
              errors: (w = y.data) == null ? void 0 : w.username
            }, null, 8, ["errors"]),
            p(De, {
              errors: (h = y.data) == null ? void 0 : h.password
            }, null, 8, ["errors"])
          ];
        }),
        _: 1
      }, 8, ["state"]),
      u.isOk ? C("", !0) : (c(), P(T, { key: 0 }, [
        p(ke, {
          variant: "underlined",
          label: "Enter login",
          modelValue: n.username,
          "onUpdate:modelValue": i[0] || (i[0] = (y) => n.username = y),
          onKeyup: i[1] || (i[1] = We(J((y) => e(l).focus(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue"]),
        p(ke, {
          variant: "underlined",
          ref: "password",
          label: "Enter password",
          modelValue: n.password,
          "onUpdate:modelValue": i[2] || (i[2] = (y) => n.password = y),
          type: s.value ? "text" : "password",
          "append-icon": s.value ? "mdi-eye" : "mdi-eye-off",
          "onClick:append": i[3] || (i[3] = (y) => s.value = !s.value),
          onKeyup: i[4] || (i[4] = We(J((y) => r(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue", "type", "append-icon"]),
        de("div", Pa, [
          b(a.$slots, "default", {
            value: n.password
          }, () => [
            n.username && n.password ? (c(), g(je, {
              key: 0,
              "validate-label": "Login!",
              onValidate: i[5] || (i[5] = (y) => r()),
              onReset: i[6] || (i[6] = (y) => v()),
              state: u
            }, null, 8, ["state"])) : C("", !0)
          ])
        ])
      ], 64))
    ], 64));
  }
}, vt = /* @__PURE__ */ ae({
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
    const m = ce(), l = t, o = pe(m, "views."), n = W(!1);
    $e(() => {
      n.value = !0;
    }), Lt(() => {
      n.value = !1;
    });
    const s = M("panels"), u = M("panel");
    return (v, r) => (c(), P(T, null, [
      l.state ? (c(), g(xe, {
        key: 0,
        state: l.state,
        delay: ""
      }, null, 8, ["state"])) : C("", !0),
      e(m).side && e(s).panel == e(u).name ? (c(), g(at, {
        key: 1,
        persistent: ""
      }, {
        default: d(() => [
          b(v.$slots, "side")
        ]),
        _: 3
      })) : C("", !0),
      p(rt, { class: "ma-4" }, {
        default: d(() => [
          (c(), g(qe, {
            to: "#app-bar-sheet-title",
            disabled: !n.value || e(s).panel != l.name
          }, [
            l.icon ? (c(), g(le, {
              key: 0,
              icon: l.icon
            }, null, 8, ["icon"])) : C("", !0),
            E(" " + te(l.title) + " ", 1),
            b(v.$slots, "append-title")
          ], 8, ["disabled"])),
          (c(), g(qe, {
            to: "#app-bar-right",
            disabled: !n.value || e(s).panel != l.name
          }, [
            b(v.$slots, "app-bar-right"),
            l.help ? (c(), g(z, {
              key: 0,
              class: "ml-3",
              href: l.help,
              panels: "new",
              icon: "mdi-information-outline"
            }, null, 8, ["href"])) : C("", !0)
          ], 8, ["disabled"])),
          b(v.$slots, "top"),
          b(v.$slots, "default", {}, () => [
            e(o) ? (c(), g(Ul, {
              key: 0,
              modelValue: e(u).view,
              "onUpdate:modelValue": r[0] || (r[0] = (a) => e(u).view = a)
            }, {
              default: d(() => [
                (c(!0), P(T, null, X(e(o), (a, i) => (c(), g(El, {
                  key: a,
                  value: a
                }, {
                  default: d(() => [
                    b(v.$slots, i)
                  ]),
                  _: 2
                }, 1032, ["value"]))), 128))
              ]),
              _: 3
            }, 8, ["modelValue"])) : C("", !0)
          ]),
          b(v.$slots, "bottom")
        ]),
        _: 3
      })
    ], 64));
  }
}), pt = /* @__PURE__ */ ae({
  __name: "OxView",
  props: {
    /** default tab title */
    title: String
  },
  setup(t) {
    const m = t, l = W(null), o = ce(), n = pe(o, "tab.", { exclude: "tab.default" }), s = pe(o, "window.");
    return (u, v) => e(n) && Object.keys(e(n)).length ? (c(), P(T, { key: 0 }, [
      p(Nl, {
        modelValue: l.value,
        "onUpdate:modelValue": v[0] || (v[0] = (r) => l.value = r)
      }, {
        default: d(() => [
          e(o).default ? b(u.$slots, "tab", { key: 0 }, () => [
            p(Je, {
              text: m == null ? void 0 : m.title,
              value: "default"
            }, null, 8, ["text"])
          ]) : C("", !0),
          (c(!0), P(T, null, X(e(n), (r, a) => (c(), g(Je, { value: r }, {
            default: d(() => [
              b(u.$slots, a)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"]),
      p(ot, {
        modelValue: l.value,
        "onUpdate:modelValue": v[1] || (v[1] = (r) => l.value = r)
      }, {
        default: d(() => [
          e(o).default ? (c(), g(Le, {
            key: 0,
            value: "default"
          }, {
            default: d(() => [
              b(u.$slots, "default")
            ]),
            _: 3
          })) : C("", !0),
          (c(!0), P(T, null, X(e(s), (r, a) => (c(), g(Le, { value: r }, {
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
    const l = W(null), o = M("context"), n = t, { editor: s, edited: u } = Wt({ props: n }), v = D(() => o.user.can([s.repo.use, "change"])), r = D(() => ({
      editor: s,
      edited: u,
      save: i,
      reset: a,
      form: l.value,
      editable: v.value,
      disabled: !v.value,
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
    return m({ editor: s, edited: u, save: i, reset: a }), (y, w) => (c(), P(T, null, [
      p(xe, {
        state: e(s).state
      }, null, 8, ["state"]),
      p(Kl, { class: "ox-model-edit" }, {
        default: d(() => [
          n.hideValidationBtn ? C("", !0) : (c(), P("div", Ta, [
            b(y.$slots, "prepend", Y(H(r.value)), () => [
              v.value && e(u) ? (c(), g(je, {
                key: 0,
                onValidate: w[0] || (w[0] = (h) => i()),
                onReset: w[1] || (w[1] = (h) => a()),
                state: e(s).state,
                "validate-disabled": e(s).valid === !1
              }, null, 8, ["state", "validate-disabled"])) : C("", !0)
            ])
          ])),
          p(Be, {
            ref_key: "form",
            ref: l,
            modelValue: e(s).valid,
            "onUpdate:modelValue": w[2] || (w[2] = (h) => e(s).valid = h),
            disabled: !v.value
          }, {
            default: d(() => [
              b(y.$slots, "default", Y(H(r.value)))
            ]),
            _: 3
          }, 8, ["modelValue", "disabled"]),
          b(y.$slots, "append", Y(H(r.value)))
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
    const l = ce(), o = pe(l, "views.list."), n = pe(l, "item."), s = pe(l, "views.detail.edit."), u = lt("filters"), v = t, r = M("context"), { panel: a, list: i, items: y, next: w, prev: h } = M("panel") ?? qt({ props: v }), I = a.panels;
    D(() => {
      var k;
      return r.user.can([a.model, (k = a.value) != null && k.id ? "change" : "add"]);
    });
    const { showFilters: N } = Dt(a), _ = D(() => [
      ...v.headers,
      { key: "actions", title: V("actions") }
    ]);
    function O(k) {
      k != null && k.id ? a.value = a.repo.whereId(k.id).first() : a.value = k, i.load();
    }
    const S = D(() => ({
      panel: a,
      panels: I,
      list: i,
      items: y,
      context: r,
      value: a.value
    }));
    return Z(() => Object.values(i.filters), () => i.load()), m({ list: i, panel: a, items: y, next: w, prev: h }), (k, $) => (c(), g(vt, {
      name: v.name,
      title: e(a).title,
      icon: e(a).icon,
      state: e(i).state,
      index: v.index
    }, fe({
      "app-bar-right": d(() => [
        b(k.$slots, "app-bar-right", Y(H(S.value))),
        e(a).view.startsWith("list.") ? (c(), g(Qe, {
          key: 0,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: d(() => [
            b(k.$slots, "nav.list", Y(H(S.value))),
            e(u) ? (c(), g(z, {
              key: 0,
              title: e(N) ? e(V)("filters.hide") : e(V)("filters.show"),
              "aria-label": e(N) ? e(V)("filters.hide") : e(V)("filters.show"),
              onClick: $[0] || ($[0] = (L) => N.value = !e(N)),
              active: e(N)
            }, {
              default: d(() => [
                p(le, {
                  icon: e(u).icon
                }, null, 8, ["icon"])
              ]),
              _: 1
            }, 8, ["title", "aria-label", "active"])) : C("", !0)
          ]),
          _: 3
        })) : e(a).view.startsWith("detail.") && e(a).value ? (c(), g(Qe, {
          key: 1,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: d(() => [
            b(k.$slots, "nav.detail", Y(H(S.value))),
            e(a).view == "detail.edit" && e(a).value ? (c(), g(it, { key: 0 }, {
              activator: d(({ props: L }) => [
                p(z, G({ "prepend-icon": "mdi-dots-vertical" }, L), {
                  default: d(() => [
                    E(te(e(V)("actions")), 1)
                  ]),
                  _: 2
                }, 1040)
              ]),
              default: d(() => [
                p(me, null, {
                  default: d(() => [
                    b(k.$slots, "item.actions", {
                      value: e(a).value
                    })
                  ]),
                  _: 3
                })
              ]),
              _: 3
            })) : C("", !0),
            p(z, {
              disabled: !e(h),
              title: e(V)("prev"),
              "aria-label": e(V)("prev"),
              onClick: $[1] || ($[1] = J((L) => e(a).show({ view: e(a).view, value: e(h) }), ["stop"]))
            }, {
              default: d(() => [
                p(le, { icon: "mdi-chevron-left" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"]),
            p(z, {
              disabled: !e(w),
              title: e(V)("next"),
              "aria-label": e(V)("next"),
              onClick: $[2] || ($[2] = J((L) => e(a).show({ view: e(a).view, value: e(w) }), ["stop"]))
            }, {
              default: d(() => [
                p(le, { icon: "mdi-chevron-right" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"])
          ]),
          _: 3
        })) : C("", !0),
        p(jl, {
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal",
          mandatory: "",
          modelValue: e(a).view,
          "onUpdate:modelValue": $[8] || ($[8] = (L) => e(a).view = L)
        }, {
          default: d(() => {
            var L;
            return [
              p(z, {
                value: "list.table",
                onClickCapture: $[3] || ($[3] = J((F) => e(a).show({ view: "list.table" }), ["stop"])),
                title: e(V)("panels.nav.table"),
                "aria-label": e(V)("panels.nav.table")
              }, {
                default: d(() => [
                  p(le, null, {
                    default: d(() => $[9] || ($[9] = [
                      E("mdi-table")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"]),
              e(l)["views.list.cards"] ? (c(), g(z, {
                key: 0,
                value: "list.cards",
                onClickCapture: $[4] || ($[4] = J((F) => e(a).show({ view: "list.cards" }), ["stop"])),
                title: e(V)("panels.nav.cards"),
                "aria-label": e(V)("panels.nav.cards")
              }, {
                default: d(() => [
                  p(le, null, {
                    default: d(() => $[10] || ($[10] = [
                      E("mdi-card-account-details")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : C("", !0),
              e(l)["views.list.kanban"] ? (c(), g(z, {
                key: 1,
                value: "list.kanban",
                onClickCapture: $[5] || ($[5] = J((F) => e(a).show({ view: "list.kanban" }), ["stop"])),
                title: e(V)("panels.nav.kanban"),
                "aria-label": e(V)("panels.nav.kanban")
              }, {
                default: d(() => [
                  p(le, null, {
                    default: d(() => $[11] || ($[11] = [
                      E("mdi-view-column")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : C("", !0),
              e(l)["views.detail.edit"] || e(s) ? (c(), g(z, {
                key: 2,
                value: "detail.edit",
                onClickCapture: $[6] || ($[6] = J((F) => e(a).show({ view: "detail.edit", value: e(a).value }), ["stop"])),
                disabled: !((L = e(a).value) != null && L.id) && e(a).view != "detail.edit",
                title: e(V)("panels.nav.edit"),
                "aria-label": e(V)("panels.nav.edit")
              }, {
                default: d(() => [
                  p(le, null, {
                    default: d(() => $[12] || ($[12] = [
                      E("mdi-pencil")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"])) : C("", !0),
              e(s) ? (c(), g(z, {
                key: 3,
                value: "detail.add",
                onClickCapture: $[7] || ($[7] = J((F) => e(a).create(), ["stop"])),
                title: e(V)("panels.nav.add"),
                "aria-label": e(V)("panels.nav.add")
              }, {
                default: d(() => [
                  p(le, null, {
                    default: d(() => $[13] || ($[13] = [
                      E("mdi-plus-box")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : C("", !0),
              b(k.$slots, "nav.views", Y(H(S.value)))
            ];
          }),
          _: 3
        }, 8, ["modelValue"]),
        b(k.$slots, "app-bar-end", Y(H(S.value)))
      ]),
      top: d(() => [
        v.warning ? (c(), g(ge, {
          key: 0,
          type: "warning",
          variant: "tonal",
          text: v.warning
        }, null, 8, ["text"])) : C("", !0),
        b(k.$slots, "top"),
        Bt(p(dt, {
          ref_key: "filters",
          ref: u,
          search: v.search,
          "teleport-to": "#panel-list-actions"
        }, {
          default: d((L) => [
            b(k.$slots, "list.filters", Y(H(L)))
          ]),
          _: 3
        }, 8, ["search"]), [
          [Mt, e(a).view.startsWith("list.") && e(N)]
        ])
      ]),
      _: 2
    }, [
      e(l)["append-title"] ? {
        name: "append-title",
        fn: d(() => [
          b(k.$slots, "append-title", Y(H(S.value)))
        ]),
        key: "0"
      } : void 0,
      e(l).side ? {
        name: "side",
        fn: d(() => [
          b(k.$slots, "side", Y(H(S.value)))
        ]),
        key: "1"
      } : void 0,
      e(l)["views.list.table"] ? void 0 : {
        name: "views.list.table",
        fn: d(() => [
          p(ct, { headers: _.value }, fe({ _: 2 }, [
            X(e(n), (L, F) => ({
              name: F,
              fn: d((ue) => [
                b(k.$slots, F, Y(H(ue)))
              ])
            }))
          ]), 1032, ["headers"])
        ]),
        key: "2"
      },
      X(e(o), (L, F) => ({
        name: F,
        fn: d(() => [
          b(k.$slots, F, Y(H(S.value)))
        ])
      })),
      e(l)["views.detail.edit"] || e(s) ? {
        name: "views.detail.edit",
        fn: d(() => [
          p(e(pt), {
            title: e(V)(`models.${e(a).model.entity}`)
          }, fe({ _: 2 }, [
            X(e(s), (L, F) => ({
              name: L,
              fn: d(() => [
                b(k.$slots, F, {
                  saved: O,
                  value: e(a).value
                })
              ])
            }))
          ]), 1032, ["title"])
        ]),
        key: "3"
      } : void 0
    ]), 1032, ["name", "title", "icon", "state", "index"]));
  }
}), _a = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OxAction: he,
  OxActionModelDelete: oa,
  OxActions: ia,
  OxApp: ma,
  OxAutocomplete: ga,
  OxComponent: ka,
  OxFieldDetails: De,
  OxFormList: $a,
  OxListFilters: dt,
  OxListKanban: xa,
  OxListTable: ct,
  OxLogin: Aa,
  OxModelEdit: Ia,
  OxModelPanel: Fa,
  OxPanel: vt,
  OxStateAlert: xe,
  OxValidationBtn: je,
  OxView: pt
}, Symbol.toStringTag, { value: "Module" })), Na = {
  el: "#app",
  delimiters: ["[[", "]]"],
  components: { ..._a, ...sa }
};
export {
  Na as App,
  he as OxAction,
  oa as OxActionModelDelete,
  ia as OxActions,
  ma as OxApp,
  ga as OxAutocomplete,
  ka as OxComponent,
  De as OxFieldDetails,
  $a as OxFormList,
  dt as OxListFilters,
  xa as OxListKanban,
  ct as OxListTable,
  Aa as OxLogin,
  Ia as OxModelEdit,
  Fa as OxModelPanel,
  vt as OxPanel,
  xe as OxStateAlert,
  je as OxValidationBtn,
  pt as OxView
};
//# sourceMappingURL=components.js.map
