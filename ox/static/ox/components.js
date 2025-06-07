import { defineComponent as ae, inject as E, createElementBlock as P, createCommentVNode as $, unref as e, openBlock as v, Fragment as A, createBlock as g, withModifiers as J, useSlots as ce, renderSlot as y, normalizeProps as K, guardReactiveProps as j, ref as G, computed as D, resolveComponent as Ot, createVNode as m, withCtx as d, createTextVNode as U, toDisplayString as le, renderList as X, mergeProps as B, mergeModels as Be, useModel as Ee, shallowRef as re, watch as Z, onMounted as $e, onScopeDispose as Pt, nextTick as Ie, watchEffect as At, reactive as Fe, onErrorCaptured as Tt, createElementVNode as de, createSlots as fe, useAttrs as It, toRaw as Ae, h as Ft, normalizeClass as _t, useTemplateRef as lt, withKeys as We, onUnmounted as Lt, Teleport as qe, toRefs as Dt, withDirectives as Mt, vShow as Bt } from "vue";
import { useAction as Et, t as w, filterSlots as pe, useAppContext as Rt, usePanels as Ut, excludeValues as Nt, useModelList as Kt, query as jt, defineAsyncComponent as zt, tKeys as Gt, useModelEditor as Wt, useModelPanel as qt } from "ox";
import { V as z, a as se, b as Yt, c as _e, d as Re, e as Ht, f as me, u as Jt, g as Qt, h as Xt, i as Zt, j as el, k as Ue, l as Ne, m as tl, n as ll, o as al, p as nl, q as sl, r as ol, s as Ye, t as il, v as rl, w as at, x as ul, y as dl, z as He, A as nt, B as cl, C as vl, D as st, E as Le, F as pl, G as ml, H as fl, I as yl, J as bl, K as ke, L as te, M as ot, N as gl, O as kl, P as wl, Q as Vl, R as hl, S as $l, T as Sl, U as xl, W as Cl, X as Ol, Y as Pl, Z as Al, _ as Tl, $ as Il, a0 as Fl, a1 as _l, a2 as Ll, a3 as it, a4 as Dl, a5 as Ml, a6 as Bl, a7 as El, a8 as Rl, a9 as ge, aa as Ul, ab as Nl, ac as Kl, ad as Je, ae as jl, af as Qe, ag as zl } from "./VContainer-DjsfP5l2.js";
import { l as Se, n as Ke, u as Ve, o as Gl, q as Wl, r as ql, s as rt, t as Yl, v as Hl, w as Jl, j as Ql, x as Xl, y as Zl, z as Xe, A as Ze, B as ea } from "./theme-BrdPdMMA.js";
import { p as et, N as ta, E as la, t as Te, S as aa, m as na, r as sa } from "./lodash-CPuQ84dU.js";
import "axios";
import { components as oa } from "ox/vendor";
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
  setup(t, { emit: p }) {
    const l = t, s = p, n = E("user"), { run: o, processing: i, allowed: c } = Et({ user: n, emits: s, props: l });
    return (u, a) => e(c) ? (v(), P(A, { key: 0 }, [
      l.button ? (v(), g(z, {
        key: 0,
        variant: "text",
        disabled: e(i),
        color: l.color,
        icon: l.icon,
        title: l.title,
        "aria-label": l.title,
        onClick: J(e(o), ["stop"])
      }, null, 8, ["disabled", "color", "icon", "title", "aria-label", "onClick"])) : (v(), g(se, {
        key: 1,
        title: l.title,
        "base-color": l.color,
        "prepend-icon": l.icon,
        disabled: e(i),
        onClick: J(e(o), ["stop"])
      }, null, 8, ["title", "base-color", "prepend-icon", "disabled", "onClick"]))
    ], 64)) : $("", !0);
  }
}), ia = /* @__PURE__ */ ae({
  __name: "OxActionModelDelete",
  props: {
    item: {},
    button: { type: Boolean }
  },
  setup(t) {
    const p = E("panel"), l = E("repos"), s = t;
    async function n(o, i) {
      return await l[i.constructor.entity].api().delete(i.$url(), { delete: s.item.id });
    }
    return (o, i) => (v(), g(he, {
      item: s.item,
      button: s.button,
      icon: "mdi-delete",
      color: "error",
      title: e(w)("actions.delete"),
      confirm: e(w)("actions.delete.confirm"),
      permission: [s.item.constructor, "delete"],
      run: n,
      onCompleted: i[0] || (i[0] = (c) => {
        var u;
        return (u = e(p)) == null ? void 0 : u.show({ view: e(p).index });
      })
    }, null, 8, ["item", "button", "title", "confirm", "permission"]));
  }
}), ra = {
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
    const p = t;
    return (l, s) => (v(), P(A, null, [
      y(l.$slots, "before", K(j(p))),
      y(l.$slots, "default", K(j(p))),
      y(l.$slots, "after", K(j(p)))
    ], 64));
  }
}, ua = /* @__PURE__ */ ae({
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
    const p = t;
    G(null);
    const l = E("user"), s = E("panels");
    D(() => !p.auto || panel.name == p.name);
    function n(i) {
      return i.permissions && !l.can(i.permissions) ? !1 : i.items ? i.items.some((c) => n(c)) : !0;
    }
    function o() {
      const i = { panel: p.name, href: p.url };
      s.show(i);
    }
    return (i, c) => {
      const u = Ot("ox-app-nav-item", !0);
      return n(p) ? (v(), P(A, { key: 0 }, [
        p.type == "subheader" ? (v(), P(A, { key: 0 }, [
          m(Yt, null, {
            default: d(() => [
              U(le(p.title), 1)
            ]),
            _: 1
          }),
          p.items ? (v(!0), P(A, { key: 0 }, X(p.items, (a) => (v(), g(u, B({ ref_for: !0 }, a), null, 16))), 256)) : $("", !0)
        ], 64)) : p.type == "group" ? (v(), g(_e, {
          key: 1,
          value: p.name
        }, {
          activator: d(({ props: a }) => [
            m(se, B(a, {
              title: p.title,
              "prepend-icon": p.icon
            }), null, 16, ["title", "prepend-icon"])
          ]),
          default: d(() => [
            (v(!0), P(A, null, X(p.items, (a, r) => (v(), g(u, B({
              key: r,
              ref_for: !0
            }, a), null, 16))), 128))
          ]),
          _: 1
        }, 8, ["value"])) : p.type == "divider" ? (v(), g(Re, { key: 2 })) : (v(), g(se, {
          key: 3,
          active: e(s).panel == p.name,
          value: p.name,
          "prepend-icon": p.icon,
          title: p.title,
          onClick: J(o, ["stop"])
        }, null, 8, ["active", "value", "prepend-icon", "title"]))
      ], 64)) : $("", !0);
    };
  }
}), da = {
  __name: "OxAppNav",
  props: /* @__PURE__ */ Be({
    items: Array
  }, {
    drawer: {},
    drawerModifiers: {}
  }),
  emits: ["update:drawer"],
  setup(t) {
    E("context");
    const p = E("panels"), l = Ee(t, "drawer"), s = G([]), n = t, o = D(() => (i(n.items), n.items));
    function i(u) {
      s.value = c(u);
    }
    function c(u) {
      if (p.panel) {
        for (const a of u)
          if (a.items) {
            const r = c(a.items);
            if (r)
              return [r, a.name];
          } else if (a.name == p.panel)
            return [a.name];
      }
    }
    return (u, a) => (v(), g(Ht, {
      modelValue: l.value,
      "onUpdate:modelValue": a[1] || (a[1] = (r) => l.value = r),
      theme: "dark"
    }, {
      append: d(() => [
        m(me, null, {
          default: d(() => [
            y(u.$slots, "append")
          ]),
          _: 3
        })
      ]),
      default: d(() => [
        y(u.$slots, "prepend"),
        m(me, {
          opened: s.value,
          "onUpdate:opened": a[0] || (a[0] = (r) => s.value = r),
          density: "compact"
        }, {
          default: d(() => [
            (v(!0), P(A, null, X(o.value, (r, b) => (v(), g(e(ua), B({
              key: b,
              ref_for: !0
            }, r), null, 16))), 128))
          ]),
          _: 1
        }, 8, ["opened"])
      ]),
      _: 3
    }, 8, ["modelValue"]));
  }
};
function ca(t) {
  const p = re(t());
  let l = -1;
  function s() {
    clearInterval(l);
  }
  function n() {
    s(), Ie(() => p.value = t());
  }
  function o(i) {
    const c = i ? getComputedStyle(i) : {
      transitionDuration: 0.2
    }, u = parseFloat(c.transitionDuration) * 1e3 || 200;
    if (s(), p.value <= 0) return;
    const a = performance.now();
    l = window.setInterval(() => {
      const r = performance.now() - a + u;
      p.value = Math.max(t() - r, 0), p.value <= 0 && s();
    }, u);
  }
  return Pt(s), {
    clear: s,
    time: p,
    start: o,
    reset: n
  };
}
const va = Ke({
  multiLine: Boolean,
  text: String,
  timer: [Boolean, String],
  timeout: {
    type: [Number, String],
    default: 5e3
  },
  vertical: Boolean,
  ...nl({
    location: "bottom"
  }),
  ...al(),
  ...ll(),
  ...tl(),
  ...Yl(),
  ...rt(sl({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
}, "VSnackbar"), pa = Se()({
  name: "VSnackbar",
  props: va(),
  emits: {
    "update:modelValue": (t) => !0
  },
  setup(t, p) {
    let {
      slots: l
    } = p;
    const s = Ve(t, "modelValue"), {
      positionClasses: n
    } = Jt(t), {
      scopeId: o
    } = Qt(), {
      themeClasses: i
    } = Gl(t), {
      colorClasses: c,
      colorStyles: u,
      variantClasses: a
    } = Xt(t), {
      roundedClasses: r
    } = Zt(t), b = ca(() => Number(t.timeout)), C = G(), x = G(), I = re(!1), W = re(0), _ = G(), O = E(el, void 0);
    Wl(() => !!O, () => {
      const q = ol();
      At(() => {
        _.value = q.mainStyles.value;
      });
    }), Z(s, k), Z(() => t.timeout, k), $e(() => {
      s.value && k();
    });
    let h = -1;
    function k() {
      b.reset(), window.clearTimeout(h);
      const q = Number(t.timeout);
      if (!s.value || q === -1) return;
      const ie = ql(x.value);
      b.start(ie), h = window.setTimeout(() => {
        s.value = !1;
      }, q);
    }
    function V() {
      b.reset(), window.clearTimeout(h);
    }
    function L() {
      I.value = !0, V();
    }
    function F() {
      I.value = !1, k();
    }
    function ue(q) {
      W.value = q.touches[0].clientY;
    }
    function oe(q) {
      Math.abs(W.value - q.changedTouches[0].clientY) > 50 && (s.value = !1);
    }
    function Ce() {
      I.value && F();
    }
    const ye = D(() => t.location.split(" ").reduce((q, ie) => (q[`v-snackbar--${ie}`] = !0, q), {}));
    return Ue(() => {
      const q = Ye.filterProps(t), ie = !!(l.default || l.text || t.text);
      return m(Ye, B({
        ref: C,
        class: ["v-snackbar", {
          "v-snackbar--active": s.value,
          "v-snackbar--multi-line": t.multiLine && !t.vertical,
          "v-snackbar--timer": !!t.timer,
          "v-snackbar--vertical": t.vertical
        }, ye.value, n.value, t.class],
        style: [_.value, t.style]
      }, q, {
        modelValue: s.value,
        "onUpdate:modelValue": (M) => s.value = M,
        contentProps: B({
          class: ["v-snackbar__wrapper", i.value, c.value, r.value, a.value],
          style: [u.value],
          onPointerenter: L,
          onPointerleave: F
        }, q.contentProps),
        persistent: !0,
        noClickAnimation: !0,
        scrim: !1,
        scrollStrategy: "none",
        _disableGlobalStack: !0,
        onTouchstartPassive: ue,
        onTouchend: oe,
        onAfterLeave: Ce
      }, o), {
        default: () => {
          var M, be;
          return [il(!1, "v-snackbar"), t.timer && !I.value && m("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [m(rl, {
            ref: x,
            color: typeof t.timer == "string" ? t.timer : "info",
            max: t.timeout,
            "model-value": b.time.value
          }, null)]), ie && m("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((M = l.text) == null ? void 0 : M.call(l)) ?? t.text, (be = l.default) == null ? void 0 : be.call(l)]), l.actions && m(at, {
            defaults: {
              VBtn: {
                variant: "text",
                ripple: !1,
                slim: !0
              }
            }
          }, {
            default: () => [m("div", {
              class: "v-snackbar__actions"
            }, [l.actions({
              isActive: s
            })])]
          })];
        },
        activator: l.activator
      });
    }), Ne({}, C);
  }
}), ma = { class: "nav-home" };
var tt;
const fa = /* @__PURE__ */ ae({
  __name: "OxApp",
  props: {
    apiUrl: {},
    logo: {},
    dataEl: { default: (tt = document.body.dataset) == null ? void 0 : tt.appData },
    models: {},
    data: {}
  },
  setup(t) {
    const p = ce(), l = pe(p, "panels."), s = t, n = Fe({ drawer: !0 }), o = Rt(s), i = Ut();
    return $e(() => {
      i.panel = o.data.panel;
    }), Z(() => [o.state.state, o.state.data], () => {
      o.showState = !0;
    }), Tt((c, u, a) => {
      o.state.error(`${c}`);
    }), (c, u) => (v(), g(ul, null, {
      default: d(() => [
        m(pa, {
          modelValue: e(o).showState,
          "onUpdate:modelValue": u[0] || (u[0] = (a) => e(o).showState = a),
          color: e(o).state.color,
          "multi-line": ""
        }, {
          default: d(() => [
            U(le(e(o).state.data), 1)
          ]),
          _: 1
        }, 8, ["modelValue", "color"]),
        m(dl, { color: "primary" }, {
          prepend: d(() => [
            m(nt, {
              icon: "mdi-apps",
              title: e(w)("nav.panels"),
              "aria-label": e(w)("nav.panels"),
              onClick: u[1] || (u[1] = J((a) => n.drawer = !n.drawer, ["stop"]))
            }, null, 8, ["title", "aria-label"])
          ]),
          default: d(() => [
            m(He, { id: "app-bar-sheet-title" }),
            m(He, { id: "app-bar-title" }, {
              default: d(() => [
                y(c.$slots, "title", { context: e(o) })
              ]),
              _: 3
            }),
            y(c.$slots, "app-bar-left", { context: e(o) }),
            u[5] || (u[5] = de("div", {
              id: "app-bar-right",
              class: "mr-3"
            }, null, -1)),
            y(c.$slots, "app-bar-right", { context: e(o) })
          ]),
          _: 3
        }),
        m(e(da), {
          drawer: n.drawer,
          "onUpdate:drawer": u[3] || (u[3] = (a) => n.drawer = a),
          items: e(o).data.nav
        }, fe({
          prepend: d(() => [
            de("a", ma, [
              c.logo ? (v(), g(cl, {
                key: 0,
                src: c.logo,
                class: "logo"
              }, null, 8, ["src"])) : $("", !0)
            ]),
            y(c.$slots, "nav-start", { context: e(o) })
          ]),
          _: 2
        }, [
          e(p)["nav-end"] ? {
            name: "append",
            fn: d(() => [
              m(me, {
                opened: n.opened,
                "onUpdate:opened": u[2] || (u[2] = (a) => n.opened = a)
              }, {
                default: d(() => [
                  y(c.$slots, "nav-end", { context: e(o) })
                ]),
                _: 3
              }, 8, ["opened"])
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["drawer", "items"]),
        m(vl, null, {
          default: d(() => [
            y(c.$slots, "main", {}, () => [
              m(st, {
                modelValue: e(i).panel,
                "onUpdate:modelValue": u[4] || (u[4] = (a) => e(i).panel = a)
              }, {
                default: d((a) => [
                  y(c.$slots, "default", B(a, { context: e(o) })),
                  (v(!0), P(A, null, X(e(l), (r, b) => (v(), g(Le, {
                    key: b,
                    value: r
                  }, {
                    default: d(() => [
                      y(c.$slots, b, B({ ref_for: !0 }, a, { context: e(o) }))
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
}), ya = Ke({
  autoSelectFirst: {
    type: [Boolean, String]
  },
  clearOnSelect: Boolean,
  search: String,
  ...xl({
    filterKeys: ["title"]
  }),
  ...Sl(),
  ...rt(Cl({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...$l({
    transition: !1
  })
}, "VAutocomplete"), ba = Se()({
  name: "VAutocomplete",
  props: ya(),
  emits: {
    "update:focused": (t) => !0,
    "update:search": (t) => !0,
    "update:modelValue": (t) => !0,
    "update:menu": (t) => !0
  },
  setup(t, p) {
    let {
      slots: l
    } = p;
    const {
      t: s
    } = Hl(), n = G(), o = re(!1), i = re(!0), c = re(!1), u = G(), a = G(), r = re(-1), {
      items: b,
      transformIn: C,
      transformOut: x
    } = pl(t), {
      textColorClasses: I,
      textColorStyles: W
    } = ml(() => {
      var f;
      return (f = n.value) == null ? void 0 : f.color;
    }), _ = Ve(t, "search", ""), O = Ve(t, "modelValue", [], (f) => C(f === null ? [null] : Jl(f)), (f) => {
      const S = x(f);
      return t.multiple ? S : S[0] ?? null;
    }), h = D(() => typeof t.counterValue == "function" ? t.counterValue(O.value) : typeof t.counterValue == "number" ? t.counterValue : O.value.length), k = fl(t), {
      filteredItems: V,
      getMatches: L
    } = yl(t, b, () => i.value ? "" : _.value), F = D(() => t.hideSelected ? V.value.filter((f) => !O.value.some((S) => S.value === f.value)) : V.value), ue = D(() => !!(t.chips || l.chip)), oe = D(() => ue.value || !!l.selection), Ce = D(() => O.value.map((f) => f.props.value)), ye = D(() => {
      var S;
      return (t.autoSelectFirst === !0 || t.autoSelectFirst === "exact" && _.value === ((S = F.value[0]) == null ? void 0 : S.title)) && F.value.length > 0 && !i.value && !c.value;
    }), q = D(() => t.hideNoData && !F.value.length || k.isReadonly.value || k.isDisabled.value), ie = Ve(t, "menu"), M = D({
      get: () => ie.value,
      set: (f) => {
        var S;
        ie.value && !f && ((S = u.value) != null && S.ΨopenChildren.size) || f && q.value || (ie.value = f);
      }
    }), be = D(() => M.value ? t.closeText : t.openText), Oe = G(), mt = bl(Oe, n);
    function ft(f) {
      t.openOnClear && (M.value = !0), _.value = "";
    }
    function yt() {
      q.value || (M.value = !0);
    }
    function bt(f) {
      q.value || (o.value && (f.preventDefault(), f.stopPropagation()), M.value = !M.value);
    }
    function gt(f) {
      var S;
      f.key !== " " && Xe(f) && ((S = n.value) == null || S.focus());
    }
    function kt(f) {
      var T, Y, ee, ne, R;
      if (k.isReadonly.value) return;
      const S = (T = n.value) == null ? void 0 : T.selectionStart, N = O.value.length;
      if (["Enter", "ArrowDown", "ArrowUp"].includes(f.key) && f.preventDefault(), ["Enter", "ArrowDown"].includes(f.key) && (M.value = !0), ["Escape"].includes(f.key) && (M.value = !1), ye.value && ["Enter", "Tab"].includes(f.key) && !O.value.some((Q) => {
        let {
          value: H
        } = Q;
        return H === F.value[0].value;
      }) && ve(F.value[0]), f.key === "ArrowDown" && ye.value && ((Y = Oe.value) == null || Y.focus("next")), ["Backspace", "Delete"].includes(f.key)) {
        if (!t.multiple && oe.value && O.value.length > 0 && !_.value) return ve(O.value[0], !1);
        if (~r.value) {
          f.preventDefault();
          const Q = r.value;
          ve(O.value[r.value], !1), r.value = Q >= N - 1 ? N - 2 : Q;
        } else f.key === "Backspace" && !_.value && (r.value = N - 1);
        return;
      }
      if (t.multiple)
        if (f.key === "ArrowLeft") {
          if (r.value < 0 && S && S > 0) return;
          const Q = r.value > -1 ? r.value - 1 : N - 1;
          if (O.value[Q])
            r.value = Q;
          else {
            const H = ((ee = _.value) == null ? void 0 : ee.length) ?? null;
            r.value = -1, (ne = n.value) == null || ne.setSelectionRange(H, H);
          }
        } else if (f.key === "ArrowRight") {
          if (r.value < 0) return;
          const Q = r.value + 1;
          O.value[Q] ? r.value = Q : (r.value = -1, (R = n.value) == null || R.setSelectionRange(0, 0));
        } else ~r.value && Xe(f) && (r.value = -1);
    }
    function wt(f) {
      if (Ze(n.value, ":autofill") || Ze(n.value, ":-webkit-autofill")) {
        const S = b.value.find((N) => N.title === f.target.value);
        S && ve(S);
      }
    }
    function Vt() {
      var f;
      t.eager && ((f = a.value) == null || f.calculateVisibleItems());
    }
    function ht() {
      var f;
      o.value && (i.value = !0, (f = n.value) == null || f.focus());
    }
    function $t(f) {
      o.value = !0, setTimeout(() => {
        c.value = !0;
      });
    }
    function St(f) {
      c.value = !1;
    }
    function xt(f) {
      (f == null || f === "" && !t.multiple && !oe.value) && (O.value = []);
    }
    const Pe = re(!1);
    function ve(f) {
      let S = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!(!f || f.props.disabled))
        if (t.multiple) {
          const N = O.value.findIndex((Y) => (t.valueComparator || ea)(Y.value, f.value)), T = S ?? !~N;
          if (~N) {
            const Y = T ? [...O.value, f] : [...O.value];
            Y.splice(N, 1), O.value = Y;
          } else T && (O.value = [...O.value, f]);
          t.clearOnSelect && (_.value = "");
        } else {
          const N = S !== !1;
          O.value = N ? [f] : [], _.value = N && !oe.value ? f.title : "", Ie(() => {
            M.value = !1, i.value = !0;
          });
        }
    }
    return Z(o, (f, S) => {
      var N;
      f !== S && (f ? (Pe.value = !0, _.value = t.multiple || oe.value ? "" : String(((N = O.value.at(-1)) == null ? void 0 : N.props.title) ?? ""), i.value = !0, Ie(() => Pe.value = !1)) : (!t.multiple && _.value == null && (O.value = []), M.value = !1, (t.multiple || oe.value) && (_.value = ""), r.value = -1));
    }), Z(_, (f) => {
      !o.value || Pe.value || (f && (M.value = !0), i.value = !f);
    }), Z(M, () => {
      if (!t.hideSelected && M.value && O.value.length) {
        const f = F.value.findIndex((S) => O.value.some((N) => S.value === N.value));
        Ql && window.requestAnimationFrame(() => {
          var S;
          f >= 0 && ((S = a.value) == null || S.scrollToIndex(f));
        });
      }
    }), Z(() => t.items, (f, S) => {
      M.value || o.value && !S.length && f.length && (M.value = !0);
    }), Z(O, (f) => {
      var S;
      !t.multiple && !oe.value && (_.value = ((S = f[0]) == null ? void 0 : S.title) ?? "");
    }), Ue(() => {
      const f = !!(!t.hideNoData || F.value.length || l["prepend-item"] || l["append-item"] || l["no-data"]), S = O.value.length > 0, N = ke.filterProps(t);
      return m(ke, B({
        ref: n
      }, N, {
        modelValue: _.value,
        "onUpdate:modelValue": [(T) => _.value = T, xt],
        focused: o.value,
        "onUpdate:focused": (T) => o.value = T,
        validationValue: O.externalValue,
        counterValue: h.value,
        dirty: S,
        onChange: wt,
        class: ["v-autocomplete", `v-autocomplete--${t.multiple ? "multiple" : "single"}`, {
          "v-autocomplete--active-menu": M.value,
          "v-autocomplete--chips": !!t.chips,
          "v-autocomplete--selection-slot": !!oe.value,
          "v-autocomplete--selecting-index": r.value > -1
        }, t.class],
        style: t.style,
        readonly: k.isReadonly.value,
        placeholder: S ? void 0 : t.placeholder,
        "onClick:clear": ft,
        "onMousedown:control": yt,
        onKeydown: kt
      }), {
        ...l,
        default: () => m(A, null, [m(ot, B({
          ref: u,
          modelValue: M.value,
          "onUpdate:modelValue": (T) => M.value = T,
          activator: "parent",
          contentClass: "v-autocomplete__content",
          disabled: q.value,
          eager: t.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: t.transition,
          onAfterEnter: Vt,
          onAfterLeave: ht
        }, t.menuProps), {
          default: () => [f && m(me, B({
            ref: Oe,
            selected: Ce.value,
            selectStrategy: t.multiple ? "independent" : "single-independent",
            onMousedown: (T) => T.preventDefault(),
            onKeydown: gt,
            onFocusin: $t,
            onFocusout: St,
            tabindex: "-1",
            "aria-live": "polite",
            color: t.itemColor ?? t.color
          }, mt, t.listProps), {
            default: () => {
              var T, Y, ee;
              return [(T = l["prepend-item"]) == null ? void 0 : T.call(l), !F.value.length && !t.hideNoData && (((Y = l["no-data"]) == null ? void 0 : Y.call(l)) ?? m(se, {
                key: "no-data",
                title: s(t.noDataText)
              }, null)), m(gl, {
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
                  const ze = B(R.props, {
                    ref: H,
                    key: R.value,
                    active: ye.value && Q === 0 ? !0 : void 0,
                    onClick: () => ve(R, null)
                  });
                  return ((Ge = l.item) == null ? void 0 : Ge.call(l, {
                    item: R,
                    index: Q,
                    props: ze
                  })) ?? m(se, B(ze, {
                    role: "option"
                  }), {
                    prepend: (we) => {
                      let {
                        isSelected: Ct
                      } = we;
                      return m(A, null, [t.multiple && !t.hideSelected ? m(wl, {
                        key: R.value,
                        modelValue: Ct,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, R.props.prependAvatar && m(Vl, {
                        image: R.props.prependAvatar
                      }, null), R.props.prependIcon && m(te, {
                        icon: R.props.prependIcon
                      }, null)]);
                    },
                    title: () => {
                      var we;
                      return i.value ? R.title : kl("v-autocomplete", R.title, (we = L(R)) == null ? void 0 : we.title);
                    }
                  });
                }
              }), (ee = l["append-item"]) == null ? void 0 : ee.call(l)];
            }
          })]
        }), O.value.map((T, Y) => {
          function ee(H) {
            H.stopPropagation(), H.preventDefault(), ve(T, !1);
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
          }, R = ue.value ? !!l.chip : !!l.selection, Q = R ? Zl(ue.value ? l.chip({
            item: T,
            index: Y,
            props: ne
          }) : l.selection({
            item: T,
            index: Y
          })) : void 0;
          if (!(R && !Q))
            return m("div", {
              key: T.value,
              class: ["v-autocomplete__selection", Y === r.value && ["v-autocomplete__selection--selected", I.value]],
              style: Y === r.value ? W.value : {}
            }, [ue.value ? l.chip ? m(at, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: t.closableChips,
                  size: "small",
                  text: T.title
                }
              }
            }, {
              default: () => [Q]
            }) : m(hl, B({
              key: "chip",
              closable: t.closableChips,
              size: "small",
              text: T.title,
              disabled: T.props.disabled
            }, ne), null) : Q ?? m("span", {
              class: "v-autocomplete__selection-text"
            }, [T.title, t.multiple && Y < O.value.length - 1 && m("span", {
              class: "v-autocomplete__selection-comma"
            }, [U(",")])])]);
        })]),
        "append-inner": function() {
          var ne, R;
          for (var T = arguments.length, Y = new Array(T), ee = 0; ee < T; ee++)
            Y[ee] = arguments[ee];
          return m(A, null, [(ne = l["append-inner"]) == null ? void 0 : ne.call(l, ...Y), t.menuIcon ? m(te, {
            class: "v-autocomplete__menu-icon",
            color: (R = n.value) == null ? void 0 : R.fieldIconColor,
            icon: t.menuIcon,
            onMousedown: bt,
            onClick: Xl,
            "aria-label": s(be.value),
            title: s(be.value),
            tabindex: "-1"
          }, null) : void 0]);
        }
      });
    }), Ne({
      isFocused: o,
      isPristine: i,
      menu: M,
      search: _,
      filteredItems: V,
      select: ve
    }, n);
  }
}), ga = ["name", "value"], ka = /* @__PURE__ */ ae({
  __name: "OxAutocomplete",
  props: /* @__PURE__ */ Be({
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
    const p = ce(), l = Ee(t, "modelValue"), s = G(null), n = G(""), o = t, i = It(), c = E("repos"), u = Nt(o, ["repo", "search"]), { list: a, items: r } = Kt({
      ...(O = u.value) == null ? void 0 : O[1],
      filters: o.filters || {},
      save: !1,
      query: jt(o.repo, c)
    });
    var b = null;
    async function C(h) {
      if (h) {
        const k = a.findIndex(h);
        if (k != -1)
          s.value = a.items[k];
        else if (b != h) {
          b = h;
          const L = (await a.load({ id: h, append: 0 })).entities[0];
          s.value = L.id == h ? L : null;
        }
      } else
        s.value = null;
      return s;
    }
    let x = null;
    const I = et.debounce(async ({ reset: h = !1 } = {}) => {
      if (a.state.isProcessing)
        return;
      const k = n.value != "<empty string>" && n.value || "";
      !h && k == x || (x = k, a.filters = { ...o.filters }, a.filters[o.lookup] = k, console.log(">>> load", k), await a.load(), console.log(">>> load", k, n.value), s.value && a.add(s.value, 0), h || (!s.value && await C(l.value), n.value = k));
    }, 500);
    function W(h) {
      const k = { ...Ae(a.filters) };
      delete k[o.lookup], et.isEqual(Ae(k), Ae(h)) || I({ reset: !0 });
    }
    function _(h) {
      h != "<empty string>" && h != x && I({ q: h });
    }
    return $e(() => {
      var h;
      (h = a.load()) == null || h.then(() => C(l.value));
    }), Z(() => o.filters, (h) => W(h)), Z(n, _), Z(l, (h, k) => h != k && C(h)), (h, k) => (v(), P(A, null, [
      o.name ? (v(), P("input", {
        key: 0,
        type: "hidden",
        name: o.name,
        value: l.value
      }, null, 8, ga)) : $("", !0),
      m(e(ba), B(e(i), {
        items: e(r),
        loading: e(a).state.isProcessing,
        modelValue: l.value,
        "onUpdate:modelValue": k[0] || (k[0] = (V) => l.value = V),
        search: n.value,
        "onUpdate:search": k[1] || (k[1] = (V) => n.value = V)
      }), fe({ _: 2 }, [
        X(e(p), (V, L) => ({
          name: L,
          fn: d((F) => [
            y(h.$slots, L, K(j(F)))
          ])
        }))
      ]), 1040, ["items", "loading", "modelValue", "search"])
    ], 64));
  }
}), wa = {
  props: {
    src: String,
    is: String
  },
  setup(t) {
    const p = re(null), l = D(() => {
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
      p.value = zt(t.src, l.value);
    }
    return Z(() => t.src, s), s(), () => Ft(p.value, t);
  }
}, Va = { class: "text-error" }, De = {
  __name: "OxFieldDetails",
  props: {
    state: Object,
    errors: Array
  },
  setup(t) {
    const p = t;
    return (l, s) => p.errors ? (v(!0), P(A, { key: 0 }, X(p.errors, (n) => (v(), P("div", Va, [
      m(te, { icon: "mdi-alert-circle-outline" }),
      U(" " + le(n), 1)
    ]))), 256)) : $("", !0);
  }
}, ut = {
  __name: "OxListFilters",
  props: {
    search: String
  },
  setup(t, { expose: p }) {
    const l = E("list"), s = t, n = D(() => {
      const c = l.filters;
      return c && Object.entries(c).some(
        ([u, a]) => !u.startsWith("page") && !u.startsWith("ordering") && !!a
      );
    }), o = D(() => n.value ? "mdi-filter-check" : "mdi-filter-outline");
    function i() {
      l.filters = {}, l.load();
    }
    return p({ icon: o, hasFilters: n, reset: i }), (c, u) => (v(), P("form", {
      onSubmit: u[2] || (u[2] = J((a) => e(l).load(), ["prevent"])),
      class: "ox-list-filters width-full"
    }, [
      m(Ol, {
        dense: "",
        color: "transparent"
      }, {
        default: d(() => [
          m(nt, {
            icon: o.value,
            readonly: ""
          }, null, 8, ["icon"]),
          s.search && e(l).filters ? (v(), g(ke, {
            key: 0,
            label: e(w)("filters.search"),
            density: "compact",
            class: "ml-2",
            modelValue: e(l).filters[s.search],
            "onUpdate:modelValue": u[0] || (u[0] = (a) => e(l).filters[s.search] = a),
            "hide-details": ""
          }, null, 8, ["label", "modelValue"])) : $("", !0),
          y(c.$slots, "default", {
            list: e(l),
            filters: e(l).filters
          }),
          m(z, {
            onClick: u[1] || (u[1] = J((a) => e(l).load(), ["stop"])),
            class: "ml-2",
            icon: "mdi-check",
            "aria-label": c.$t("filters.apply"),
            title: e(w)("filters.apply")
          }, null, 8, ["aria-label", "title"]),
          n.value ? (v(), g(z, {
            key: 1,
            onClick: J(i, ["stop"]),
            icon: "mdi-backspace",
            "aria-label": e(w)("filters.reset"),
            title: e(w)("filters.reset")
          }, null, 8, ["aria-label", "title"])) : $("", !0)
        ]),
        _: 3
      })
    ], 32));
  }
}, ha = Ke({
  ...Tl(),
  ...Al()
}, "VForm"), Me = Se()({
  name: "VForm",
  props: ha(),
  emits: {
    "update:modelValue": (t) => !0,
    submit: (t) => !0
  },
  setup(t, p) {
    let {
      slots: l,
      emit: s
    } = p;
    const n = Pl(t), o = G();
    function i(u) {
      u.preventDefault(), n.reset();
    }
    function c(u) {
      const a = u, r = n.validate();
      a.then = r.then.bind(r), a.catch = r.catch.bind(r), a.finally = r.finally.bind(r), s("submit", a), a.defaultPrevented || r.then((b) => {
        var x;
        let {
          valid: C
        } = b;
        C && ((x = o.value) == null || x.submit());
      }), a.preventDefault();
    }
    return Ue(() => {
      var u;
      return m("form", {
        ref: o,
        class: ["v-form", t.class],
        style: t.style,
        novalidate: !0,
        onReset: i,
        onSubmit: c
      }, [(u = l.default) == null ? void 0 : u.call(l, n)]);
    }), Ne(n, o);
  }
}), $a = { class: "flex-row justify-right" }, Sa = /* @__PURE__ */ ae({
  __name: "OxFormList",
  props: /* @__PURE__ */ Be({
    useModel: Function,
    editable: Boolean
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(t) {
    var a;
    const p = Ee(t, "modelValue"), l = E("user"), s = G({}), n = t, o = D(() => ({
      add: n.editable && l.can([n.useModel, "add"]),
      change: n.editable && l.can([n.useModel, "change"]),
      delete: n.editable && l.can([n.useModel, "delete"])
    })), i = G([]);
    (a = p.value) != null && a.length || i.value.push(-1);
    function c() {
      p.value.push(s.value), s.value = {};
    }
    function u(r) {
      confirm(w("actions.delete.confirm")) && n.delete && p.value.splice(r);
    }
    return (r, b) => (v(), g(me, {
      opened: i.value,
      "onUpdate:opened": b[3] || (b[3] = (C) => i.value = C)
    }, {
      default: d(() => {
        var C;
        return [
          (C = p.value) != null && C.length ? (v(!0), P(A, { key: 0 }, X(p.value, (x, I) => (v(), g(_e, {
            key: I,
            value: I
          }, {
            activator: d(({ props: W }) => [
              m(se, B({ ref_for: !0 }, W), {
                append: d(() => [
                  de("div", {
                    onClick: b[0] || (b[0] = J(() => {
                    }, ["stop"]))
                  }, [
                    y(r.$slots, "item.actions", B({
                      item: x,
                      index: I,
                      ref_for: !0
                    }, W)),
                    o.value.delete ? (v(), g(z, {
                      key: 0,
                      type: "button",
                      class: "ml-2",
                      size: "small",
                      onClick: J((_) => u(I), ["stop", "prevent"]),
                      color: "error",
                      "aria-label": e(w)("actions.remove"),
                      title: e(w)("actions.remove"),
                      icon: "mdi-delete"
                    }, null, 8, ["onClick", "aria-label", "title"])) : $("", !0)
                  ])
                ]),
                default: d(() => [
                  m(Il, null, {
                    default: d(() => [
                      y(r.$slots, "item.title", { item: x })
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1040)
            ]),
            default: d(() => [
              m(Me, {
                disabled: !o.value.change
              }, {
                default: d(() => [
                  y(r.$slots, "item", {
                    item: x,
                    index: I,
                    editable: o.value.change
                  })
                ]),
                _: 2
              }, 1032, ["disabled"])
            ]),
            _: 2
          }, 1032, ["value"]))), 128)) : (v(), g(se, {
            key: 1,
            title: e(w)("lists.empty")
          }, null, 8, ["title"])),
          o.value.add ? (v(), P(A, { key: 2 }, [
            p.value.length ? (v(), g(Re, { key: 0 })) : $("", !0),
            m(_e, { value: -1 }, {
              activator: d(({ props: x }) => [
                m(se, B(x, {
                  title: e(w)("actions.add_item"),
                  "prepend-icon": "mdi-plus"
                }), null, 16, ["title"])
              ]),
              default: d(() => [
                m(Me, null, {
                  default: d(() => [
                    y(r.$slots, "item", {
                      item: s.value,
                      edit: !0
                    })
                  ]),
                  _: 3
                }),
                s.value ? (v(), g(se, { key: 0 }, {
                  default: d(() => [
                    de("div", $a, [
                      s.value ? (v(), g(z, {
                        key: 0,
                        size: "small",
                        onClick: b[1] || (b[1] = (x) => s.value = {}),
                        color: "secondary",
                        "prepend-icon": "mdi-backspace",
                        "aria-label": e(w)("actions.discard")
                      }, {
                        default: d(() => [
                          U(le(e(w)("actions.discard")), 1)
                        ]),
                        _: 1
                      }, 8, ["aria-label"])) : $("", !0),
                      s.value ? (v(), g(z, {
                        key: 1,
                        size: "small",
                        onClick: b[2] || (b[2] = (x) => c()),
                        color: "primary",
                        "prepend-icon": "mdi-plus",
                        "aria-label": e(w)("actions.add")
                      }, {
                        default: d(() => [
                          U(le(e(w)("actions.add")), 1)
                        ]),
                        _: 1
                      }, 8, ["aria-label"])) : $("", !0)
                    ])
                  ]),
                  _: 1
                })) : $("", !0)
              ]),
              _: 3
            })
          ], 64)) : $("", !0)
        ];
      }),
      _: 3
    }, 8, ["opened"]));
  }
}), xa = Se()({
  name: "VSlideGroupItem",
  props: Fl(),
  emits: {
    "group:selected": (t) => !0
  },
  setup(t, p) {
    let {
      slots: l
    } = p;
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
}), Ca = {
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
  setup(t, { emit: p }) {
    const l = p;
    E("list");
    const s = E("items"), n = t;
    function o(u) {
      return u = u % n.colors.length, n.colorVariant ? n.colors[u] + "-" + n.colorVariant : n.colors[u];
    }
    function i(u, a, r) {
      u[r] ? !u[r].includes(a) && u[r].push(a) : u[r] = [a];
    }
    const c = D(() => {
      const u = {};
      if (s.value)
        for (var a of s.value) {
          const b = a[n.field];
          if (Array.isArray(b))
            if (b.length)
              for (var r of b)
                i(u, a, r);
            else
              i(u, a, null);
          else
            i(u, a, b);
        }
      return u;
    });
    return (u, a) => (v(), g(it, null, {
      default: d(() => [
        m(Dl, null, {
          default: d(() => [
            (v(!0), P(A, null, X(n.headers, (r, b) => (v(), g(xa, {
              key: r.value
            }, {
              default: d(({ selectedClass: C }) => [
                m(Ml, {
                  width: "400",
                  class: _t(["ma-3", C]),
                  color: o(b),
                  lines: "two"
                }, {
                  default: d(() => [
                    m(Bl, null, {
                      default: d(() => [
                        U(le(r.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    m(me, {
                      "bg-color": o(b)
                    }, {
                      default: d(() => [
                        c.value && c.value[r.value] ? (v(!0), P(A, { key: 0 }, X(c.value[r.value], (x) => y(u.$slots, "item", {
                          key: x.id,
                          header: r,
                          item: x
                        }, () => [
                          m(se, {
                            title: x[n.itemTitle],
                            value: n.itemValue && x[n.itemValue],
                            onClick: (I) => l("click", x)
                          }, {
                            append: d(() => [
                              y(u.$slots, "item.action")
                            ]),
                            _: 2
                          }, 1032, ["title", "value", "onClick"])
                        ])), 128)) : $("", !0)
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
    const p = ce(), l = ta(p, "item.", { exclude: ["item.actions"] }), s = E("panel"), n = E("list"), o = E("items"), i = E("user"), c = t, u = D(() => c.headers.reduce((b, C) => (b.push(
      typeof C == "string" ? { key: C, title: w(Gt.field(C)) } : { key: C.key, title: w(C.title) }
    ), b), []));
    function a(b) {
      n.filters.page = b.page, n.filters.page_size = b.itemsPerPage, n.filters.ordering = b.sortBy.map(({ key: C, order: x }) => x == "asc" ? C : `-${C}`);
    }
    function r(b, C) {
      s.show({ view: "detail.edit", value: C });
    }
    return (b, C) => {
      var x;
      return v(), g(El, {
        items: e(o),
        "item-index": "id",
        "items-length": e(n).count || e(o).length,
        "items-per-page": c.itemsPerPage,
        loading: (x = e(n).state) == null ? void 0 : x.isProcessing,
        headers: u.value,
        "no-data-text": e(w)("lists.empty"),
        class: "align-top-table",
        "onUpdate:options": a
      }, fe({
        "item.actions": d(({ item: I }) => [
          e(i).can([I.constructor, "change"], I) ? (v(), g(he, {
            key: 0,
            icon: "mdi-pencil",
            button: "",
            title: e(w)("actions.edit"),
            item: I,
            run: r
          }, null, 8, ["title", "item"])) : e(i).can([I.constructor, "view"], I) ? (v(), g(he, {
            key: 1,
            icon: "mdi-eye-outline",
            button: "",
            title: e(w)("actions.edit"),
            item: I,
            run: r
          }, null, 8, ["title", "item"])) : $("", !0),
          y(b.$slots, "item.actions", {
            value: I,
            dense: !0,
            button: !0
          })
        ]),
        _: 2
      }, [
        e(o).length ? void 0 : {
          name: "loading",
          fn: d(() => [
            m(Rl, { type: "table-row@10" })
          ]),
          key: "0"
        },
        X(e(l), (I, W) => ({
          name: W,
          fn: d((_) => [
            y(b.$slots, W, K(j(_)))
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
    const p = ce(), l = t;
    let s = G(!1);
    Z(() => l.state.state, (i) => {
      l.delay && i == la.PROCESSING && (s.value = !1, window.setTimeout(() => {
        s.value = !0;
      }, 5e3));
    });
    const n = D(() => {
      var i;
      return ((i = l.state) == null ? void 0 : i.isProcessing) && (!l.delay || s.value);
    }), o = D(() => {
      var i, c;
      return (c = (i = l.state) == null ? void 0 : i.data) == null ? void 0 : c.messages;
    });
    return (i, c) => (v(), P(A, null, [
      l.state.isNone && e(p).none ? (v(), g(e(ge), {
        key: 0,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        state: t.state,
        title: t.noneTitle
      }, {
        default: d(() => [
          y(i.$slots, "none", { state: t.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : n.value ? (v(), g(e(ge), {
        key: 1,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: t.state,
        title: t.processingTitle
      }, {
        default: d(() => [
          y(i.$slots, "processing", { state: t.state }, () => [
            c[0] || (c[0] = U(" Data are being sent to server, please be patient. If this message persist you might wan't to retry. "))
          ])
        ]),
        _: 3
      }, 8, ["state", "title"])) : l.state.isError ? (v(), g(e(ge), {
        key: 2,
        type: "error",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: t.state,
        title: t.errorTitle
      }, {
        default: d(() => [
          y(i.$slots, "error", { state: t.state }, () => [
            c[1] || (c[1] = U(" Oups... something wrong happened. "))
          ]),
          y(i.$slots, "error-detail", { state: t.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : l.state.isOk ? (v(), g(e(ge), {
        key: 3,
        type: "success",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: t.state,
        title: t.okTitle
      }, {
        default: d(() => [
          y(i.$slots, "ok", { state: t.state }, () => [
            c[2] || (c[2] = de("p", null, "Congrats! Data have been updated.", -1))
          ]),
          o.value ? (v(), P(A, { key: 0 }, [
            m(Re),
            (v(!0), P(A, null, X(o.value, (u) => (v(), P("p", null, le(u), 1))), 256))
          ], 64)) : $("", !0),
          y(i.$slots, "ok-detail", { state: t.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : $("", !0),
      y(i.$slots, "default", {
        state: l.state
      })
    ], 64));
  }
}, Oa = { class: "text-right" }, je = {
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
  setup(t, { emit: p }) {
    const l = p, s = t;
    return (n, o) => (v(), P("div", Oa, [
      m(z, {
        color: "error",
        class: "me-2",
        "prepend-icon": s.resetIcon,
        onClick: o[0] || (o[0] = (i) => l("reset")),
        disabled: s.disabled
      }, {
        default: d(() => [
          y(n.$slots, "discard", {}, () => [
            U(le(s.resetLabel || e(Te)("actions.discard")), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]),
      s.state.isSending || s.state.isProcessing ? (v(), g(z, {
        key: 0,
        color: "primary",
        "prepend-icon": s.processingIcon,
        disabled: ""
      }, {
        default: d(() => [
          y(n.$slots, "processing", {}, () => [
            U(le(s.processingLabel || e(Te)("actions.saving")), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon"])) : (v(), g(z, {
        key: 1,
        color: "primary",
        "prepend-icon": s.validateIcon,
        onClick: o[1] || (o[1] = (i) => l("validate")),
        disabled: s.disabled || s.validateDisabled
      }, {
        default: d(() => [
          y(n.$slots, "validate", {}, () => [
            U(le(s.validateLabel || e(Te)("actions.save")), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]))
    ]));
  }
}, Pa = { key: 0 }, Aa = { class: "text-right mt-3" }, Ta = {
  __name: "OxLogin",
  props: {
    next: { type: String },
    url: { type: String }
  },
  emits: ["save", "saved"],
  setup(t, { emit: p }) {
    const l = lt("password"), s = t, n = Fe({
      username: "",
      password: ""
    }), o = G(!1), i = Fe(new aa());
    function c(a = !0) {
      sa(n, { username: "", password: "" }), a && i.none();
    }
    async function u() {
      i.processing();
      try {
        const a = await fetch(s.url, {
          method: "POST",
          headers: na.axiosConfig.headers,
          body: JSON.stringify(n)
        });
        a.status == 200 ? (n.credentials = "", n.password = "", i.ok(await a.json()), s.next && (window.location.href = s.next)) : i.error(await a.json());
      } catch (a) {
        i.ok((a == null ? void 0 : a.message) || a);
      }
    }
    return (a, r) => (v(), P(A, null, [
      m(e(xe), { state: i }, {
        none: d(({ state: b }) => r[7] || (r[7] = [
          de("p", null, "Please enter your credentials in order too proceed...", -1)
        ])),
        "ok-detail": d(({ state: b }) => [
          s.next ? (v(), P("p", Pa, [
            r[8] || (r[8] = U("You soon will be redirected to ")),
            de("i", null, le(s.next), 1)
          ])) : $("", !0)
        ]),
        error: d(({ state: b }) => {
          var C, x;
          return [
            m(De, {
              errors: (C = b.data) == null ? void 0 : C.username
            }, null, 8, ["errors"]),
            m(De, {
              errors: (x = b.data) == null ? void 0 : x.password
            }, null, 8, ["errors"])
          ];
        }),
        _: 1
      }, 8, ["state"]),
      i.isOk ? $("", !0) : (v(), P(A, { key: 0 }, [
        m(ke, {
          variant: "underlined",
          label: "Enter login",
          modelValue: n.username,
          "onUpdate:modelValue": r[0] || (r[0] = (b) => n.username = b),
          onKeyup: r[1] || (r[1] = We(J((b) => e(l).focus(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue"]),
        m(ke, {
          variant: "underlined",
          ref: "password",
          label: "Enter password",
          modelValue: n.password,
          "onUpdate:modelValue": r[2] || (r[2] = (b) => n.password = b),
          type: o.value ? "text" : "password",
          "append-icon": o.value ? "mdi-eye" : "mdi-eye-off",
          "onClick:append": r[3] || (r[3] = (b) => o.value = !o.value),
          onKeyup: r[4] || (r[4] = We(J((b) => u(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue", "type", "append-icon"]),
        de("div", Aa, [
          y(a.$slots, "default", {
            value: n.password
          }, () => [
            n.username && n.password ? (v(), g(je, {
              key: 0,
              "validate-label": "Login!",
              onValidate: r[5] || (r[5] = (b) => u()),
              onReset: r[6] || (r[6] = (b) => c()),
              state: i
            }, null, 8, ["state"])) : $("", !0)
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
    const p = ce(), l = t, s = pe(p, "views."), n = G(!1);
    $e(() => {
      n.value = !0;
    }), Lt(() => {
      n.value = !1;
    });
    const o = E("panels"), i = E("panel");
    return (c, u) => (v(), P(A, null, [
      l.state ? (v(), g(xe, {
        key: 0,
        state: l.state,
        delay: ""
      }, null, 8, ["state"])) : $("", !0),
      e(p).prepend && e(o).panel == e(i).name ? y(c.$slots, "prepend", { key: 1 }) : $("", !0),
      m(it, { class: "ma-4" }, {
        default: d(() => [
          (v(), g(qe, {
            to: "#app-bar-sheet-title",
            disabled: !n.value || e(o).panel != l.name
          }, [
            l.icon ? (v(), g(te, {
              key: 0,
              icon: l.icon
            }, null, 8, ["icon"])) : $("", !0),
            U(" " + le(l.title) + " ", 1),
            y(c.$slots, "append-title")
          ], 8, ["disabled"])),
          (v(), g(qe, {
            to: "#app-bar-right",
            disabled: !n.value || e(o).panel != l.name
          }, [
            y(c.$slots, "app-bar-right"),
            l.help ? (v(), g(z, {
              key: 0,
              class: "ml-3",
              href: l.help,
              panels: "new",
              icon: "mdi-information-outline"
            }, null, 8, ["href"])) : $("", !0)
          ], 8, ["disabled"])),
          y(c.$slots, "top"),
          y(c.$slots, "default", {}, () => [
            e(s) ? (v(), g(Ul, {
              key: 0,
              modelValue: e(i).view,
              "onUpdate:modelValue": u[0] || (u[0] = (a) => e(i).view = a)
            }, {
              default: d(() => [
                (v(!0), P(A, null, X(e(s), (a, r) => (v(), g(Nl, {
                  key: a,
                  value: a
                }, {
                  default: d(() => [
                    y(c.$slots, r)
                  ]),
                  _: 2
                }, 1032, ["value"]))), 128))
              ]),
              _: 3
            }, 8, ["modelValue"])) : $("", !0)
          ]),
          y(c.$slots, "bottom")
        ]),
        _: 3
      }),
      e(p).append && e(o).panel == e(i).name ? y(c.$slots, "append", { key: 2 }) : $("", !0)
    ], 64));
  }
}), vt = /* @__PURE__ */ ae({
  __name: "OxView",
  props: {
    /** default tab title */
    title: String
  },
  setup(t) {
    const p = t, l = G(null), s = ce(), n = pe(s, "tab.", { exclude: ["tab.default"] }), o = pe(s, "window.");
    return (i, c) => e(n) && Object.keys(e(n)).length ? (v(), P(A, { key: 0 }, [
      m(Kl, {
        modelValue: l.value,
        "onUpdate:modelValue": c[0] || (c[0] = (u) => l.value = u)
      }, {
        default: d(() => [
          e(s).default ? y(i.$slots, "tab", { key: 0 }, () => [
            m(Je, {
              text: p == null ? void 0 : p.title,
              value: "default"
            }, null, 8, ["text"])
          ]) : $("", !0),
          (v(!0), P(A, null, X(e(n), (u, a) => (v(), g(Je, { value: u }, {
            default: d(() => [
              y(i.$slots, a)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"]),
      m(st, {
        modelValue: l.value,
        "onUpdate:modelValue": c[1] || (c[1] = (u) => l.value = u)
      }, {
        default: d(() => [
          e(s).default ? (v(), g(Le, {
            key: 0,
            value: "default"
          }, {
            default: d(() => [
              y(i.$slots, "default")
            ]),
            _: 3
          })) : $("", !0),
          (v(!0), P(A, null, X(e(o), (u, a) => (v(), g(Le, { value: u }, {
            default: d(() => [
              y(i.$slots, a)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"])
    ], 64)) : y(i.$slots, "default", { key: 1 });
  }
}), pt = /* @__PURE__ */ ae({
  __name: "OxModelEditor",
  props: {
    repo: {},
    initial: {},
    name: {},
    url: {},
    saved: { type: Function }
  },
  setup(t, { expose: p }) {
    const l = G(null), s = E("user"), n = t, { editor: o, edited: i } = Wt({ props: n }), c = D(() => s.can([o.repo.use, "change", n.initial])), u = D(() => ({
      editor: o,
      edited: i,
      form: l.value,
      editable: c.value,
      disabled: !c.value,
      value: o.value,
      model: o.repo.use
    }));
    return Z(() => o.errors && Object.values(o.errors), () => l.value.validate()), p({ editor: o, edited: i, form: l, editable: c }), (a, r) => (v(), P(A, null, [
      y(a.$slots, "prepend", K(j(u.value))),
      m(Me, {
        ref_key: "form",
        ref: l,
        modelValue: e(o).valid,
        "onUpdate:modelValue": r[0] || (r[0] = (b) => e(o).valid = b),
        disabled: !c.value
      }, {
        default: d(() => [
          y(a.$slots, "default", K(j(u.value)))
        ]),
        _: 3
      }, 8, ["modelValue", "disabled"]),
      y(a.$slots, "append", K(j(u.value)))
    ], 64));
  }
}), Ia = {
  key: 0,
  class: "mb-3"
}, Fa = /* @__PURE__ */ ae({
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
  setup(t, { expose: p }) {
    const l = t, s = G(null);
    function n() {
      s.value.editor.reset(l.initial);
    }
    function o() {
      const i = s.value;
      return l.sendFormData ? i.editor.save(new FormData(i.form.value.$el)) : i.editor.save();
    }
    return p({ modelEditor: s, save: o, reset: n }), (i, c) => {
      var u;
      return v(), P(A, null, [
        (u = s.value) != null && u.editor ? (v(), g(xe, {
          key: 0,
          state: s.value.editor.state
        }, null, 8, ["state"])) : $("", !0),
        m(jl, { class: "ox-model-edit" }, {
          default: d(() => [
            m(e(pt), B({
              ref_key: "modelEditor",
              ref: s
            }, l), {
              prepend: d((a) => [
                l.hideValidationBtn ? $("", !0) : (v(), P("div", Ia, [
                  y(i.$slots, "prepend", B(a, {
                    save: o,
                    reset: n
                  }), () => [
                    a.editable && a.edited ? (v(), g(je, {
                      key: 0,
                      onValidate: c[0] || (c[0] = (r) => o()),
                      onReset: c[1] || (c[1] = (r) => n()),
                      state: a.editor.state,
                      "validate-disabled": a.editor.valid === !1
                    }, null, 8, ["state", "validate-disabled"])) : $("", !0)
                  ])
                ]))
              ]),
              default: d((a) => [
                y(i.$slots, "default", B(a, {
                  save: o,
                  reset: n
                }))
              ]),
              append: d((a) => [
                y(i.$slots, "append", B(a, {
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
}), _a = /* @__PURE__ */ ae({
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
  setup(t, { expose: p }) {
    const l = ce(), s = pe(l, "views.list."), n = pe(l, "item."), o = pe(l, "views.detail.edit."), i = lt("filters"), c = t, u = E("context"), { panel: a, list: r, items: b, next: C, prev: x } = E("panel") ?? qt({ props: c }), I = a.panels;
    D(() => {
      var k;
      return u.user.can([a.model, (k = a.value) != null && k.id ? "change" : "add"]);
    });
    const { showFilters: W } = Dt(a), _ = D(() => [
      ...c.headers,
      { key: "actions", title: w("actions") }
    ]);
    function O(k) {
      k != null && k.id ? a.value = a.repo.whereId(k.id).first() : a.value = k, r.load();
    }
    const h = D(() => ({
      panel: a,
      panels: I,
      list: r,
      items: b,
      context: u,
      saved: O,
      value: a.value
    }));
    return Z(() => Object.values(r.filters), () => r.load()), p({ list: r, panel: a, items: b, next: C, prev: x }), (k, V) => (v(), g(ct, {
      name: c.name,
      title: e(a).title,
      icon: e(a).icon,
      state: e(r).state,
      index: c.index
    }, fe({
      "app-bar-right": d(() => [
        y(k.$slots, "app-bar-right", K(j(h.value))),
        e(a).view.startsWith("list.") ? (v(), g(Qe, {
          key: 0,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: d(() => [
            y(k.$slots, "nav.list", K(j(h.value))),
            m(z, {
              title: e(w)("actions.list.reload"),
              "aria-label": e(w)("actions.list.reload"),
              onClick: V[0] || (V[0] = (L) => e(r).load())
            }, {
              default: d(() => [
                m(te, null, {
                  default: d(() => V[10] || (V[10] = [
                    U("mdi-reload")
                  ])),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["title", "aria-label"]),
            e(i) ? (v(), g(z, {
              key: 0,
              title: e(W) ? e(w)("filters.hide") : e(w)("filters.show"),
              "aria-label": e(W) ? e(w)("filters.hide") : e(w)("filters.show"),
              onClick: V[1] || (V[1] = (L) => W.value = !e(W)),
              active: e(W)
            }, {
              default: d(() => [
                m(te, {
                  icon: e(i).icon
                }, null, 8, ["icon"])
              ]),
              _: 1
            }, 8, ["title", "aria-label", "active"])) : $("", !0)
          ]),
          _: 3
        })) : e(a).view.startsWith("detail.") && e(a).value ? (v(), g(Qe, {
          key: 1,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: d(() => [
            y(k.$slots, "nav.detail", K(j(h.value))),
            e(a).view == "detail.edit" && e(a).value ? (v(), g(ot, { key: 0 }, {
              activator: d(({ props: L }) => [
                m(z, B({ "prepend-icon": "mdi-dots-vertical" }, L), {
                  default: d(() => [
                    U(le(e(w)("actions")), 1)
                  ]),
                  _: 2
                }, 1040)
              ]),
              default: d(() => [
                m(me, null, {
                  default: d(() => [
                    y(k.$slots, "item.actions", {
                      value: e(a).value
                    })
                  ]),
                  _: 3
                })
              ]),
              _: 3
            })) : $("", !0),
            m(z, {
              disabled: !e(x),
              title: e(w)("prev"),
              "aria-label": e(w)("prev"),
              onClick: V[2] || (V[2] = J((L) => e(a).show({ view: e(a).view, value: e(x) }), ["stop"]))
            }, {
              default: d(() => [
                m(te, { icon: "mdi-chevron-left" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"]),
            m(z, {
              disabled: !e(C),
              title: e(w)("next"),
              "aria-label": e(w)("next"),
              onClick: V[3] || (V[3] = J((L) => e(a).show({ view: e(a).view, value: e(C) }), ["stop"]))
            }, {
              default: d(() => [
                m(te, { icon: "mdi-chevron-right" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"])
          ]),
          _: 3
        })) : $("", !0),
        m(zl, {
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal",
          mandatory: "",
          modelValue: e(a).view,
          "onUpdate:modelValue": V[9] || (V[9] = (L) => e(a).view = L)
        }, {
          default: d(() => {
            var L;
            return [
              m(z, {
                value: "list.table",
                onClickCapture: V[4] || (V[4] = J((F) => e(a).show({ view: "list.table" }), ["stop"])),
                title: e(w)("panels.nav.table"),
                "aria-label": e(w)("panels.nav.table")
              }, {
                default: d(() => [
                  m(te, null, {
                    default: d(() => V[11] || (V[11] = [
                      U("mdi-table")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"]),
              e(l)["views.list.cards"] ? (v(), g(z, {
                key: 0,
                value: "list.cards",
                onClickCapture: V[5] || (V[5] = J((F) => e(a).show({ view: "list.cards" }), ["stop"])),
                title: e(w)("panels.nav.cards"),
                "aria-label": e(w)("panels.nav.cards")
              }, {
                default: d(() => [
                  m(te, null, {
                    default: d(() => V[12] || (V[12] = [
                      U("mdi-card-account-details")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : $("", !0),
              e(l)["views.list.kanban"] ? (v(), g(z, {
                key: 1,
                value: "list.kanban",
                onClickCapture: V[6] || (V[6] = J((F) => e(a).show({ view: "list.kanban" }), ["stop"])),
                title: e(w)("panels.nav.kanban"),
                "aria-label": e(w)("panels.nav.kanban")
              }, {
                default: d(() => [
                  m(te, null, {
                    default: d(() => V[13] || (V[13] = [
                      U("mdi-view-column")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : $("", !0),
              e(l)["views.detail.edit"] || e(o) ? (v(), g(z, {
                key: 2,
                value: "detail.edit",
                onClickCapture: V[7] || (V[7] = J((F) => e(a).show({ view: "detail.edit", value: e(a).value }), ["stop"])),
                disabled: !((L = e(a).value) != null && L.id) && e(a).view != "detail.edit",
                title: e(w)("panels.nav.edit"),
                "aria-label": e(w)("panels.nav.edit")
              }, {
                default: d(() => [
                  m(te, null, {
                    default: d(() => V[14] || (V[14] = [
                      U("mdi-pencil")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"])) : $("", !0),
              e(o) ? (v(), g(z, {
                key: 3,
                value: "detail.add",
                onClickCapture: V[8] || (V[8] = J((F) => e(a).create(), ["stop"])),
                title: e(w)("panels.nav.add"),
                "aria-label": e(w)("panels.nav.add")
              }, {
                default: d(() => [
                  m(te, null, {
                    default: d(() => V[15] || (V[15] = [
                      U("mdi-plus-box")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : $("", !0),
              y(k.$slots, "nav.views", K(j(h.value)))
            ];
          }),
          _: 3
        }, 8, ["modelValue"]),
        y(k.$slots, "app-bar-end", K(j(h.value)))
      ]),
      top: d(() => [
        c.warning ? (v(), g(ge, {
          key: 0,
          type: "warning",
          variant: "tonal",
          text: c.warning
        }, null, 8, ["text"])) : $("", !0),
        y(k.$slots, "top"),
        Mt(m(ut, {
          ref_key: "filters",
          ref: i,
          search: c.search,
          "teleport-to": "#panel-list-actions"
        }, {
          default: d((L) => [
            y(k.$slots, "list.filters", K(j(L)))
          ]),
          _: 3
        }, 8, ["search"]), [
          [Bt, e(a).view.startsWith("list.") && e(W)]
        ])
      ]),
      _: 2
    }, [
      e(l)["append-title"] ? {
        name: "append-title",
        fn: d(() => [
          y(k.$slots, "append-title", K(j(h.value)))
        ]),
        key: "0"
      } : void 0,
      e(l).prepend ? {
        name: "prepend",
        fn: d(() => [
          y(k.$slots, "prepend", K(j(h.value)))
        ]),
        key: "1"
      } : void 0,
      e(l).append ? {
        name: "append",
        fn: d(() => [
          y(k.$slots, "append", K(j(h.value)))
        ]),
        key: "2"
      } : void 0,
      e(l)["views.list.table"] ? void 0 : {
        name: "views.list.table",
        fn: d(() => [
          m(dt, { headers: _.value }, fe({ _: 2 }, [
            X(e(n), (L, F) => ({
              name: F,
              fn: d((ue) => [
                y(k.$slots, F, K(j(ue)))
              ])
            }))
          ]), 1032, ["headers"])
        ]),
        key: "3"
      },
      X(e(s), (L, F) => ({
        name: F,
        fn: d(() => [
          y(k.$slots, F, K(j(h.value)))
        ])
      })),
      e(l)["views.detail.edit"] || e(o) ? {
        name: "views.detail.edit",
        fn: d(() => [
          m(e(vt), {
            title: e(w)(`models.${e(a).model.entity}`)
          }, fe({ _: 2 }, [
            X(e(o), (L, F) => ({
              name: L,
              fn: d(() => [
                y(k.$slots, F, K(j(h.value)))
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
  OxActionModelDelete: ia,
  OxActions: ra,
  OxApp: fa,
  OxAutocomplete: ka,
  OxComponent: wa,
  OxFieldDetails: De,
  OxFormList: Sa,
  OxListFilters: ut,
  OxListKanban: Ca,
  OxListTable: dt,
  OxLogin: Ta,
  OxModelEdit: Fa,
  OxModelEditor: pt,
  OxModelPanel: _a,
  OxPanel: ct,
  OxStateAlert: xe,
  OxValidationBtn: je,
  OxView: vt
}, Symbol.toStringTag, { value: "Module" })), Ka = {
  el: "#app",
  delimiters: ["[[", "]]"],
  components: { ...La, ...oa }
};
export {
  Ka as App,
  he as OxAction,
  ia as OxActionModelDelete,
  ra as OxActions,
  fa as OxApp,
  ka as OxAutocomplete,
  wa as OxComponent,
  De as OxFieldDetails,
  Sa as OxFormList,
  ut as OxListFilters,
  Ca as OxListKanban,
  dt as OxListTable,
  Ta as OxLogin,
  Fa as OxModelEdit,
  pt as OxModelEditor,
  _a as OxModelPanel,
  ct as OxPanel,
  xe as OxStateAlert,
  je as OxValidationBtn,
  vt as OxView
};
//# sourceMappingURL=components.js.map
