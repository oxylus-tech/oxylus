import { defineComponent as ae, inject as D, createElementBlock as T, createCommentVNode as x, unref as e, openBlock as v, Fragment as _, createBlock as b, withModifiers as z, useSlots as de, renderSlot as g, normalizeProps as X, guardReactiveProps as Z, ref as q, computed as I, resolveComponent as $t, createVNode as c, withCtx as u, createTextVNode as U, toDisplayString as te, renderList as J, mergeProps as G, mergeModels as De, useModel as Me, onMounted as we, watch as H, shallowRef as ie, onScopeDispose as xt, nextTick as Ae, watchEffect as St, reactive as Te, onErrorCaptured as Ct, createElementVNode as re, createSlots as fe, useAttrs as Ot, h as Pt, normalizeClass as At, useTemplateRef as Ze, withKeys as ze, onUnmounted as Tt, Teleport as Ge, toRefs as It, withDirectives as _t, vShow as Lt } from "vue";
import { useAction as Ft, t as w, useAppContext as Dt, usePanels as Mt, excludeValues as Bt, useModelList as Rt, query as Ut, defineAsyncComponent as Et, tKeys as Kt, filterSlots as me, useModelEditor as Nt, useModelPanel as jt } from "ox";
import { V as N, a as ue, b as zt, c as Ie, d as Be, e as Gt, f as ve, u as Wt, g as qt, h as Yt, i as Ht, j as Jt, k as Re, l as Ue, m as Qt, n as Xt, o as Zt, p as el, q as tl, r as ll, s as We, t as al, v as nl, w as et, x as sl, y as ol, z as qe, A as il, B as _e, C as rl, D as ul, E as tt, F as dl, G as cl, H as vl, I as pl, J as fl, K as ke, L as le, M as lt, N as ml, O as yl, P as bl, Q as gl, R as kl, S as wl, T as Vl, U as hl, W as $l, X as xl, Y as Sl, Z as Cl, _ as Ol, $ as Pl, a0 as Al, a1 as Tl, a2 as Il, a3 as at, a4 as _l, a5 as Ll, a6 as Fl, a7 as Dl, a8 as Ml, a9 as ge, aa as Le, ab as Bl, ac as Rl, ad as Ul, ae as Ye, af as El, ag as He, ah as Kl } from "./VAlert-CWfqeBu5.js";
import { l as xe, n as Ee, u as he, o as Nl, q as jl, r as zl, s as nt, t as Gl, v as Wl, w as ql, j as Yl, x as Hl, y as Jl, z as Je, A as Qe, B as Ql } from "./theme-BrdPdMMA.js";
import { o as Xl, D as Zl, v as ea, S as ta, j as la, r as aa } from "./lodash-9f3mbMbV.js";
import { components as na } from "ox/vendor";
const $e = /* @__PURE__ */ ae({
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
  setup(t, { emit: r }) {
    const n = t, o = r, l = D("context"), { run: f, processing: s, allowed: p } = Ft({ user: l.user, emits: o, props: n });
    return (a, d) => e(p) ? (v(), T(_, { key: 0 }, [
      n.button ? (v(), b(N, {
        key: 0,
        variant: "text",
        disabled: e(s),
        color: n.color,
        icon: n.icon,
        title: n.title,
        "aria-label": n.title,
        onClick: z(e(f), ["stop"])
      }, null, 8, ["disabled", "color", "icon", "title", "aria-label", "onClick"])) : (v(), b(ue, {
        key: 1,
        title: n.title,
        "base-color": n.color,
        "prepend-icon": n.icon,
        disabled: e(s),
        onClick: z(e(f), ["stop"])
      }, null, 8, ["title", "base-color", "prepend-icon", "disabled", "onClick"]))
    ], 64)) : x("", !0);
  }
}), sa = /* @__PURE__ */ ae({
  __name: "OxActionModelDelete",
  props: {
    item: {},
    button: { type: Boolean }
  },
  setup(t) {
    const r = D("panel"), n = D("repos"), o = t;
    async function l(f, s) {
      return await n[s.constructor.entity].api().delete(s.$url(), { delete: o.item.id });
    }
    return (f, s) => (v(), b($e, {
      item: o.item,
      button: o.button,
      icon: "mdi-delete",
      color: "error",
      title: e(w)("actions.delete"),
      confirm: e(w)("actions.delete.confirm"),
      permissions: ["delete", (p, a) => a.id],
      run: l,
      onCompleted: s[0] || (s[0] = (p) => {
        var a;
        return (a = e(r)) == null ? void 0 : a.show({ view: e(r).index });
      })
    }, null, 8, ["item", "button", "title", "confirm", "permissions"]));
  }
}), oa = {
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
    const r = t;
    return (n, o) => (v(), T(_, null, [
      g(n.$slots, "before", X(Z(r))),
      g(n.$slots, "default", X(Z(r))),
      g(n.$slots, "after", X(Z(r)))
    ], 64));
  }
}, ia = /* @__PURE__ */ ae({
  __name: "OxAppNavItem",
  props: {
    title: {},
    icon: {},
    value: {},
    url: {},
    permissions: {},
    type: {},
    items: {},
    order: {}
  },
  setup(t) {
    const r = t;
    q(null);
    const n = D("user"), o = D("panels");
    I(() => !r.auto || panel.name == r.name);
    function l(s) {
      return s.permissions && !n.can(s.permissions) ? !1 : s.items ? s.items.some((p) => l(p)) : !0;
    }
    function f() {
      const s = { panel: r.value, href: r.url };
      console.log(r, s), o.show(s);
    }
    return (s, p) => {
      const a = $t("ox-app-nav-item", !0);
      return l(r) ? (v(), T(_, { key: 0 }, [
        r.type == "subheader" ? (v(), T(_, { key: 0 }, [
          c(zt, null, {
            default: u(() => [
              U(te(r.title), 1)
            ]),
            _: 1
          }),
          r.items ? (v(!0), T(_, { key: 0 }, J(r.items, (d) => (v(), b(a, G({ ref_for: !0 }, d), null, 16))), 256)) : x("", !0)
        ], 64)) : r.type == "group" ? (v(), b(Ie, {
          key: 1,
          value: r.value
        }, {
          activator: u(({ props: d }) => [
            c(ue, G(d, {
              title: r.title,
              "prepend-icon": r.icon
            }), null, 16, ["title", "prepend-icon"])
          ]),
          default: u(() => [
            (v(!0), T(_, null, J(r.items, (d, i) => (v(), b(a, G({
              key: i,
              ref_for: !0
            }, d), null, 16))), 128))
          ]),
          _: 1
        }, 8, ["value"])) : r.type == "divider" ? (v(), b(Be, { key: 2 })) : (v(), b(ue, {
          key: 3,
          active: e(o).panel == r.value,
          value: r.value,
          "prepend-icon": r.icon,
          title: r.title,
          onClick: z(f, ["stop"])
        }, null, 8, ["active", "value", "prepend-icon", "title"]))
      ], 64)) : x("", !0);
    };
  }
}), ra = {
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
    const r = D("panels"), n = Me(t, "drawer"), o = q([]), l = t, f = I(() => l.items);
    function s(a) {
      if (r.panel) {
        for (const d of a)
          if (d.items) {
            const i = s(d.items);
            if (i)
              return [i, d.value];
          } else if (d.value == r.panel)
            return [d.value];
      }
    }
    function p() {
      o.value = s(f.value);
    }
    return we(p), H(f, p), H(() => r.panel, p), (a, d) => (v(), b(Gt, {
      modelValue: n.value,
      "onUpdate:modelValue": d[1] || (d[1] = (i) => n.value = i),
      theme: "dark"
    }, {
      append: u(() => [
        c(ve, null, {
          default: u(() => [
            g(a.$slots, "append")
          ]),
          _: 3
        })
      ]),
      default: u(() => [
        g(a.$slots, "prepend"),
        c(ve, {
          opened: o.value,
          "onUpdate:opened": d[0] || (d[0] = (i) => o.value = i),
          density: "compact"
        }, {
          default: u(() => [
            (v(!0), T(_, null, J(f.value, (i, y) => (v(), b(e(ia), G({
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
function ua(t) {
  const r = ie(t());
  let n = -1;
  function o() {
    clearInterval(n);
  }
  function l() {
    o(), Ae(() => r.value = t());
  }
  function f(s) {
    const p = s ? getComputedStyle(s) : {
      transitionDuration: 0.2
    }, a = parseFloat(p.transitionDuration) * 1e3 || 200;
    if (o(), r.value <= 0) return;
    const d = performance.now();
    n = window.setInterval(() => {
      const i = performance.now() - d + a;
      r.value = Math.max(t() - i, 0), r.value <= 0 && o();
    }, a);
  }
  return xt(o), {
    clear: o,
    time: r,
    start: f,
    reset: l
  };
}
const da = Ee({
  multiLine: Boolean,
  text: String,
  timer: [Boolean, String],
  timeout: {
    type: [Number, String],
    default: 5e3
  },
  vertical: Boolean,
  ...el({
    location: "bottom"
  }),
  ...Zt(),
  ...Xt(),
  ...Qt(),
  ...Gl(),
  ...nt(tl({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
}, "VSnackbar"), ca = xe()({
  name: "VSnackbar",
  props: da(),
  emits: {
    "update:modelValue": (t) => !0
  },
  setup(t, r) {
    let {
      slots: n
    } = r;
    const o = he(t, "modelValue"), {
      positionClasses: l
    } = Wt(t), {
      scopeId: f
    } = qt(), {
      themeClasses: s
    } = Nl(t), {
      colorClasses: p,
      colorStyles: a,
      variantClasses: d
    } = Yt(t), {
      roundedClasses: i
    } = Ht(t), y = ua(() => Number(t.timeout)), O = q(), $ = q(), P = ie(!1), S = ie(0), C = q(), k = D(Jt, void 0);
    jl(() => !!k, () => {
      const E = ll();
      St(() => {
        C.value = E.mainStyles.value;
      });
    }), H(o, V), H(() => t.timeout, V), we(() => {
      o.value && V();
    });
    let L = -1;
    function V() {
      y.reset(), window.clearTimeout(L);
      const E = Number(t.timeout);
      if (!o.value || E === -1) return;
      const oe = zl($.value);
      y.start(oe), L = window.setTimeout(() => {
        o.value = !1;
      }, E);
    }
    function M() {
      y.reset(), window.clearTimeout(L);
    }
    function Y() {
      P.value = !0, M();
    }
    function Q() {
      P.value = !1, V();
    }
    function pe(E) {
      S.value = E.touches[0].clientY;
    }
    function se(E) {
      Math.abs(S.value - E.changedTouches[0].clientY) > 50 && (o.value = !1);
    }
    function Ce() {
      P.value && Q();
    }
    const ye = I(() => t.location.split(" ").reduce((E, oe) => (E[`v-snackbar--${oe}`] = !0, E), {}));
    return Re(() => {
      const E = We.filterProps(t), oe = !!(n.default || n.text || t.text);
      return c(We, G({
        ref: O,
        class: ["v-snackbar", {
          "v-snackbar--active": o.value,
          "v-snackbar--multi-line": t.multiLine && !t.vertical,
          "v-snackbar--timer": !!t.timer,
          "v-snackbar--vertical": t.vertical
        }, ye.value, l.value, t.class],
        style: [C.value, t.style]
      }, E, {
        modelValue: o.value,
        "onUpdate:modelValue": (F) => o.value = F,
        contentProps: G({
          class: ["v-snackbar__wrapper", s.value, p.value, i.value, d.value],
          style: [a.value],
          onPointerenter: Y,
          onPointerleave: Q
        }, E.contentProps),
        persistent: !0,
        noClickAnimation: !0,
        scrim: !1,
        scrollStrategy: "none",
        _disableGlobalStack: !0,
        onTouchstartPassive: pe,
        onTouchend: se,
        onAfterLeave: Ce
      }, f), {
        default: () => {
          var F, be;
          return [al(!1, "v-snackbar"), t.timer && !P.value && c("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [c(nl, {
            ref: $,
            color: typeof t.timer == "string" ? t.timer : "info",
            max: t.timeout,
            "model-value": y.time.value
          }, null)]), oe && c("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((F = n.text) == null ? void 0 : F.call(n)) ?? t.text, (be = n.default) == null ? void 0 : be.call(n)]), n.actions && c(et, {
            defaults: {
              VBtn: {
                variant: "text",
                ripple: !1,
                slim: !0
              }
            }
          }, {
            default: () => [c("div", {
              class: "v-snackbar__actions"
            }, [n.actions({
              isActive: o
            })])]
          })];
        },
        activator: n.activator
      });
    }), Ue({}, O);
  }
}), va = { class: "nav-home" };
var Xe;
const pa = /* @__PURE__ */ ae({
  __name: "OxApp",
  props: {
    apiUrl: {},
    logo: {},
    dataEl: { default: (Xe = document.body.dataset) == null ? void 0 : Xe.appData },
    models: {},
    data: {}
  },
  setup(t) {
    const r = de(), n = t, o = Te({ drawer: !0 }), l = Dt(n), f = Mt();
    return we(() => {
      f.panel = l.data.panel;
    }), H(() => [l.state.state, l.state.data], () => {
      l.showState = !0;
    }), Ct((s, p, a) => {
      l.state.error(`${s}`);
    }), (s, p) => (v(), b(sl, null, {
      default: u(() => [
        c(ca, {
          modelValue: e(l).showState,
          "onUpdate:modelValue": p[0] || (p[0] = (a) => e(l).showState = a),
          color: e(l).state.color,
          "multi-line": ""
        }, {
          default: u(() => [
            U(te(e(l).state.data), 1)
          ]),
          _: 1
        }, 8, ["modelValue", "color"]),
        c(ol, { color: "primary" }, {
          prepend: u(() => [
            c(_e, {
              icon: "mdi-apps",
              title: e(w)("nav.panels"),
              "aria-label": e(w)("nav.panels"),
              onClick: p[1] || (p[1] = z((a) => o.drawer = !o.drawer, ["stop"]))
            }, null, 8, ["title", "aria-label"]),
            e(r)["app-nav"] && !o.drawer2 ? (v(), b(_e, {
              key: 0,
              icon: "mdi-menu",
              onClick: p[2] || (p[2] = (a) => {
                o.drawer2 = !0, o.drawer = !1;
              })
            })) : x("", !0)
          ]),
          default: u(() => [
            c(qe, { id: "app-bar-sheet-title" }),
            c(qe, { id: "app-bar-title" }, {
              default: u(() => [
                g(s.$slots, "title", { context: e(l) })
              ]),
              _: 3
            }),
            c(il),
            g(s.$slots, "app-bar-left", { context: e(l) }),
            p[6] || (p[6] = re("div", {
              id: "app-bar-right",
              class: "mr-3"
            }, null, -1)),
            g(s.$slots, "app-bar-right", { context: e(l) })
          ]),
          _: 3
        }),
        c(e(ra), {
          drawer: o.drawer,
          "onUpdate:drawer": p[4] || (p[4] = (a) => o.drawer = a),
          items: e(l).data.nav
        }, fe({
          prepend: u(() => [
            re("a", va, [
              s.logo ? (v(), b(rl, {
                key: 0,
                src: s.logo,
                class: "logo"
              }, null, 8, ["src"])) : x("", !0)
            ]),
            g(s.$slots, "nav-start", { context: e(l) })
          ]),
          _: 2
        }, [
          e(r)["nav-end"] ? {
            name: "append",
            fn: u(() => [
              c(ve, {
                opened: o.opened,
                "onUpdate:opened": p[3] || (p[3] = (a) => o.opened = a)
              }, {
                default: u(() => [
                  g(s.$slots, "nav-end", { context: e(l) })
                ]),
                _: 3
              }, 8, ["opened"])
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["drawer", "items"]),
        c(ul, null, {
          default: u(() => [
            g(s.$slots, "main", {}, () => [
              c(tt, {
                modelValue: e(f).panel,
                "onUpdate:modelValue": p[5] || (p[5] = (a) => e(f).panel = a)
              }, {
                default: u((a) => [
                  g(s.$slots, "default", G(a, { context: e(l) }))
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
}), fa = Ee({
  autoSelectFirst: {
    type: [Boolean, String]
  },
  clearOnSelect: Boolean,
  search: String,
  ...hl({
    filterKeys: ["title"]
  }),
  ...Vl(),
  ...nt($l({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...wl({
    transition: !1
  })
}, "VAutocomplete"), ma = xe()({
  name: "VAutocomplete",
  props: fa(),
  emits: {
    "update:focused": (t) => !0,
    "update:search": (t) => !0,
    "update:modelValue": (t) => !0,
    "update:menu": (t) => !0
  },
  setup(t, r) {
    let {
      slots: n
    } = r;
    const {
      t: o
    } = Wl(), l = q(), f = ie(!1), s = ie(!0), p = ie(!1), a = q(), d = q(), i = ie(-1), {
      items: y,
      transformIn: O,
      transformOut: $
    } = dl(t), {
      textColorClasses: P,
      textColorStyles: S
    } = cl(() => {
      var m;
      return (m = l.value) == null ? void 0 : m.color;
    }), C = he(t, "search", ""), k = he(t, "modelValue", [], (m) => O(m === null ? [null] : ql(m)), (m) => {
      const h = $(m);
      return t.multiple ? h : h[0] ?? null;
    }), L = I(() => typeof t.counterValue == "function" ? t.counterValue(k.value) : typeof t.counterValue == "number" ? t.counterValue : k.value.length), V = vl(t), {
      filteredItems: M,
      getMatches: Y
    } = pl(t, y, () => s.value ? "" : C.value), Q = I(() => t.hideSelected ? M.value.filter((m) => !k.value.some((h) => h.value === m.value)) : M.value), pe = I(() => !!(t.chips || n.chip)), se = I(() => pe.value || !!n.selection), Ce = I(() => k.value.map((m) => m.props.value)), ye = I(() => {
      var h;
      return (t.autoSelectFirst === !0 || t.autoSelectFirst === "exact" && C.value === ((h = Q.value[0]) == null ? void 0 : h.title)) && Q.value.length > 0 && !s.value && !p.value;
    }), E = I(() => t.hideNoData && !Q.value.length || V.isReadonly.value || V.isDisabled.value), oe = he(t, "menu"), F = I({
      get: () => oe.value,
      set: (m) => {
        var h;
        oe.value && !m && ((h = a.value) != null && h.ΨopenChildren.size) || m && E.value || (oe.value = m);
      }
    }), be = I(() => F.value ? t.closeText : t.openText), Oe = q(), dt = fl(Oe, l);
    function ct(m) {
      t.openOnClear && (F.value = !0), C.value = "";
    }
    function vt() {
      E.value || (F.value = !0);
    }
    function pt(m) {
      E.value || (f.value && (m.preventDefault(), m.stopPropagation()), F.value = !F.value);
    }
    function ft(m) {
      var h;
      m.key !== " " && Je(m) && ((h = l.value) == null || h.focus());
    }
    function mt(m) {
      var A, K, ee, ne, B;
      if (V.isReadonly.value) return;
      const h = (A = l.value) == null ? void 0 : A.selectionStart, R = k.value.length;
      if (["Enter", "ArrowDown", "ArrowUp"].includes(m.key) && m.preventDefault(), ["Enter", "ArrowDown"].includes(m.key) && (F.value = !0), ["Escape"].includes(m.key) && (F.value = !1), ye.value && ["Enter", "Tab"].includes(m.key) && !k.value.some((W) => {
        let {
          value: j
        } = W;
        return j === Q.value[0].value;
      }) && ce(Q.value[0]), m.key === "ArrowDown" && ye.value && ((K = Oe.value) == null || K.focus("next")), ["Backspace", "Delete"].includes(m.key)) {
        if (!t.multiple && se.value && k.value.length > 0 && !C.value) return ce(k.value[0], !1);
        if (~i.value) {
          m.preventDefault();
          const W = i.value;
          ce(k.value[i.value], !1), i.value = W >= R - 1 ? R - 2 : W;
        } else m.key === "Backspace" && !C.value && (i.value = R - 1);
        return;
      }
      if (t.multiple)
        if (m.key === "ArrowLeft") {
          if (i.value < 0 && h && h > 0) return;
          const W = i.value > -1 ? i.value - 1 : R - 1;
          if (k.value[W])
            i.value = W;
          else {
            const j = ((ee = C.value) == null ? void 0 : ee.length) ?? null;
            i.value = -1, (ne = l.value) == null || ne.setSelectionRange(j, j);
          }
        } else if (m.key === "ArrowRight") {
          if (i.value < 0) return;
          const W = i.value + 1;
          k.value[W] ? i.value = W : (i.value = -1, (B = l.value) == null || B.setSelectionRange(0, 0));
        } else ~i.value && Je(m) && (i.value = -1);
    }
    function yt(m) {
      if (Qe(l.value, ":autofill") || Qe(l.value, ":-webkit-autofill")) {
        const h = y.value.find((R) => R.title === m.target.value);
        h && ce(h);
      }
    }
    function bt() {
      var m;
      t.eager && ((m = d.value) == null || m.calculateVisibleItems());
    }
    function gt() {
      var m;
      f.value && (s.value = !0, (m = l.value) == null || m.focus());
    }
    function kt(m) {
      f.value = !0, setTimeout(() => {
        p.value = !0;
      });
    }
    function wt(m) {
      p.value = !1;
    }
    function Vt(m) {
      (m == null || m === "" && !t.multiple && !se.value) && (k.value = []);
    }
    const Pe = ie(!1);
    function ce(m) {
      let h = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!(!m || m.props.disabled))
        if (t.multiple) {
          const R = k.value.findIndex((K) => (t.valueComparator || Ql)(K.value, m.value)), A = h ?? !~R;
          if (~R) {
            const K = A ? [...k.value, m] : [...k.value];
            K.splice(R, 1), k.value = K;
          } else A && (k.value = [...k.value, m]);
          t.clearOnSelect && (C.value = "");
        } else {
          const R = h !== !1;
          k.value = R ? [m] : [], C.value = R && !se.value ? m.title : "", Ae(() => {
            F.value = !1, s.value = !0;
          });
        }
    }
    return H(f, (m, h) => {
      var R;
      m !== h && (m ? (Pe.value = !0, C.value = t.multiple || se.value ? "" : String(((R = k.value.at(-1)) == null ? void 0 : R.props.title) ?? ""), s.value = !0, Ae(() => Pe.value = !1)) : (!t.multiple && C.value == null && (k.value = []), F.value = !1, (t.multiple || se.value) && (C.value = ""), i.value = -1));
    }), H(C, (m) => {
      !f.value || Pe.value || (m && (F.value = !0), s.value = !m);
    }), H(F, () => {
      if (!t.hideSelected && F.value && k.value.length) {
        const m = Q.value.findIndex((h) => k.value.some((R) => h.value === R.value));
        Yl && window.requestAnimationFrame(() => {
          var h;
          m >= 0 && ((h = d.value) == null || h.scrollToIndex(m));
        });
      }
    }), H(() => t.items, (m, h) => {
      F.value || f.value && !h.length && m.length && (F.value = !0);
    }), H(k, (m) => {
      var h;
      !t.multiple && !se.value && (C.value = ((h = m[0]) == null ? void 0 : h.title) ?? "");
    }), Re(() => {
      const m = !!(!t.hideNoData || Q.value.length || n["prepend-item"] || n["append-item"] || n["no-data"]), h = k.value.length > 0, R = ke.filterProps(t);
      return c(ke, G({
        ref: l
      }, R, {
        modelValue: C.value,
        "onUpdate:modelValue": [(A) => C.value = A, Vt],
        focused: f.value,
        "onUpdate:focused": (A) => f.value = A,
        validationValue: k.externalValue,
        counterValue: L.value,
        dirty: h,
        onChange: yt,
        class: ["v-autocomplete", `v-autocomplete--${t.multiple ? "multiple" : "single"}`, {
          "v-autocomplete--active-menu": F.value,
          "v-autocomplete--chips": !!t.chips,
          "v-autocomplete--selection-slot": !!se.value,
          "v-autocomplete--selecting-index": i.value > -1
        }, t.class],
        style: t.style,
        readonly: V.isReadonly.value,
        placeholder: h ? void 0 : t.placeholder,
        "onClick:clear": ct,
        "onMousedown:control": vt,
        onKeydown: mt
      }), {
        ...n,
        default: () => c(_, null, [c(lt, G({
          ref: a,
          modelValue: F.value,
          "onUpdate:modelValue": (A) => F.value = A,
          activator: "parent",
          contentClass: "v-autocomplete__content",
          disabled: E.value,
          eager: t.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: t.transition,
          onAfterEnter: bt,
          onAfterLeave: gt
        }, t.menuProps), {
          default: () => [m && c(ve, G({
            ref: Oe,
            selected: Ce.value,
            selectStrategy: t.multiple ? "independent" : "single-independent",
            onMousedown: (A) => A.preventDefault(),
            onKeydown: ft,
            onFocusin: kt,
            onFocusout: wt,
            tabindex: "-1",
            "aria-live": "polite",
            color: t.itemColor ?? t.color
          }, dt, t.listProps), {
            default: () => {
              var A, K, ee;
              return [(A = n["prepend-item"]) == null ? void 0 : A.call(n), !Q.value.length && !t.hideNoData && (((K = n["no-data"]) == null ? void 0 : K.call(n)) ?? c(ue, {
                key: "no-data",
                title: o(t.noDataText)
              }, null)), c(ml, {
                ref: d,
                renderless: !0,
                items: Q.value,
                itemKey: "value"
              }, {
                default: (ne) => {
                  var je;
                  let {
                    item: B,
                    index: W,
                    itemRef: j
                  } = ne;
                  const Ne = G(B.props, {
                    ref: j,
                    key: B.value,
                    active: ye.value && W === 0 ? !0 : void 0,
                    onClick: () => ce(B, null)
                  });
                  return ((je = n.item) == null ? void 0 : je.call(n, {
                    item: B,
                    index: W,
                    props: Ne
                  })) ?? c(ue, G(Ne, {
                    role: "option"
                  }), {
                    prepend: (Ve) => {
                      let {
                        isSelected: ht
                      } = Ve;
                      return c(_, null, [t.multiple && !t.hideSelected ? c(bl, {
                        key: B.value,
                        modelValue: ht,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, B.props.prependAvatar && c(gl, {
                        image: B.props.prependAvatar
                      }, null), B.props.prependIcon && c(le, {
                        icon: B.props.prependIcon
                      }, null)]);
                    },
                    title: () => {
                      var Ve;
                      return s.value ? B.title : yl("v-autocomplete", B.title, (Ve = Y(B)) == null ? void 0 : Ve.title);
                    }
                  });
                }
              }), (ee = n["append-item"]) == null ? void 0 : ee.call(n)];
            }
          })]
        }), k.value.map((A, K) => {
          function ee(j) {
            j.stopPropagation(), j.preventDefault(), ce(A, !1);
          }
          const ne = {
            "onClick:close": ee,
            onKeydown(j) {
              j.key !== "Enter" && j.key !== " " || (j.preventDefault(), j.stopPropagation(), ee(j));
            },
            onMousedown(j) {
              j.preventDefault(), j.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, B = pe.value ? !!n.chip : !!n.selection, W = B ? Jl(pe.value ? n.chip({
            item: A,
            index: K,
            props: ne
          }) : n.selection({
            item: A,
            index: K
          })) : void 0;
          if (!(B && !W))
            return c("div", {
              key: A.value,
              class: ["v-autocomplete__selection", K === i.value && ["v-autocomplete__selection--selected", P.value]],
              style: K === i.value ? S.value : {}
            }, [pe.value ? n.chip ? c(et, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: t.closableChips,
                  size: "small",
                  text: A.title
                }
              }
            }, {
              default: () => [W]
            }) : c(kl, G({
              key: "chip",
              closable: t.closableChips,
              size: "small",
              text: A.title,
              disabled: A.props.disabled
            }, ne), null) : W ?? c("span", {
              class: "v-autocomplete__selection-text"
            }, [A.title, t.multiple && K < k.value.length - 1 && c("span", {
              class: "v-autocomplete__selection-comma"
            }, [U(",")])])]);
        })]),
        "append-inner": function() {
          var ne, B;
          for (var A = arguments.length, K = new Array(A), ee = 0; ee < A; ee++)
            K[ee] = arguments[ee];
          return c(_, null, [(ne = n["append-inner"]) == null ? void 0 : ne.call(n, ...K), t.menuIcon ? c(le, {
            class: "v-autocomplete__menu-icon",
            color: (B = l.value) == null ? void 0 : B.fieldIconColor,
            icon: t.menuIcon,
            onMousedown: pt,
            onClick: Hl,
            "aria-label": o(be.value),
            title: o(be.value),
            tabindex: "-1"
          }, null) : void 0]);
        }
      });
    }), Ue({
      isFocused: f,
      isPristine: s,
      menu: F,
      search: C,
      filteredItems: M,
      select: ce
    }, l);
  }
}), ya = /* @__PURE__ */ ae({
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
    var P;
    const r = de(), n = Me(t, "modelValue"), o = q(""), l = t, f = Ot(), s = D("repos"), p = Bt(l, ["repo", "search"]), { list: a, items: d } = Rt({
      ...(P = p.value) == null ? void 0 : P[1],
      filters: l.filters || {},
      save: !1,
      query: Ut(l.repo, s)
    });
    function i(S) {
      S[l.lookup] = o.value, Xl.isEqual(a.filters, S) || (a.filters = { ...l.filters }, a.filters[l.lookup] = o.value, a.load());
    }
    function y(S) {
      const C = a.filters[l.lookup];
      a.nextUrl, S && S != "<empty string>" && S != C && (a.filters[l.lookup] = S, a.load().then((k) => {
        o.value = S;
      }));
    }
    var O = null;
    function $(S) {
      !S || a.findIndex(S) != -1 || a.findIndex(S) == -1 && O != S && (O = S, a.load({ id: S, append: 0 }));
    }
    return we(() => {
      l.filters && Object.values(l.filters).length ? i(l.filters) : a.load(), $(n.value);
    }), H(() => l.filters, (S) => i(S)), H(o, y), H(n, (S, C) => S != C && $(S)), (S, C) => (v(), b(e(ma), G(e(f), {
      items: e(d),
      loading: e(a).state.isProcessing,
      modelValue: n.value,
      "onUpdate:modelValue": C[0] || (C[0] = (k) => n.value = k),
      search: o.value,
      "onUpdate:search": C[1] || (C[1] = (k) => o.value = k)
    }), fe({ _: 2 }, [
      J(e(r), (k, L) => ({
        name: L,
        fn: u((V) => [
          g(S.$slots, L, X(Z(V)))
        ])
      }))
    ]), 1040, ["items", "loading", "modelValue", "search"]));
  }
}), ba = {
  props: {
    src: String,
    is: String
  },
  setup(t) {
    const r = ie(null), n = I(() => {
      if (t.is)
        return t.is;
      let l = t.src.substring(t.src.lastIndexOf("/") + 1);
      if (l && (l = l.substring(0, l.indexOf("."))), !l)
        throw Error(
          "`is` not provided and could not be deducted from `src`."
        );
      return l;
    });
    function o() {
      r.value = Et(t.src, n.value);
    }
    return H(() => t.src, o), o(), () => Pt(r.value, t);
  }
}, ga = { class: "text-error" }, Fe = {
  __name: "OxFieldDetails",
  props: {
    state: Object,
    errors: Array
  },
  setup(t) {
    const r = t;
    return (n, o) => r.errors ? (v(!0), T(_, { key: 0 }, J(r.errors, (l) => (v(), T("div", ga, [
      c(le, { icon: "mdi-alert-circle-outline" }),
      U(" " + te(l), 1)
    ]))), 256)) : x("", !0);
  }
}, st = {
  __name: "OxListFilters",
  props: {
    search: String
  },
  setup(t, { expose: r }) {
    const n = D("list"), o = t, l = I(() => {
      const p = n.filters;
      return p && Object.entries(p).some(
        ([a, d]) => !a.startsWith("page") && !a.startsWith("ordering") && !!d
      );
    }), f = I(() => l.value ? "mdi-filter-check" : "mdi-filter-outline");
    function s() {
      n.filters = {}, n.load();
    }
    return r({ icon: f, hasFilters: l, reset: s }), (p, a) => (v(), T("form", {
      onSubmit: a[2] || (a[2] = z((d) => e(n).load(), ["prevent"])),
      class: "width-full"
    }, [
      c(xl, {
        dense: "",
        color: "transparent"
      }, {
        default: u(() => [
          c(_e, {
            icon: f.value,
            readonly: ""
          }, null, 8, ["icon"]),
          o.search && e(n).filters ? (v(), b(ke, {
            key: 0,
            label: e(w)("filters.search"),
            density: "compact",
            class: "ml-2",
            modelValue: e(n).filters[o.search],
            "onUpdate:modelValue": a[0] || (a[0] = (d) => e(n).filters[o.search] = d),
            "hide-details": ""
          }, null, 8, ["label", "modelValue"])) : x("", !0),
          g(p.$slots, "default", {
            list: e(n),
            filters: e(n).filters
          }),
          c(N, {
            onClick: a[1] || (a[1] = z((d) => e(n).load(), ["stop"])),
            class: "ml-2",
            icon: "mdi-check",
            "aria-label": p.$t("filters.apply"),
            title: e(w)("filters.apply")
          }, null, 8, ["aria-label", "title"]),
          l.value ? (v(), b(N, {
            key: 1,
            onClick: z(s, ["stop"]),
            icon: "mdi-backspace",
            "aria-label": e(w)("filters.reset"),
            title: e(w)("filters.reset")
          }, null, 8, ["aria-label", "title"])) : x("", !0)
        ]),
        _: 3
      })
    ], 32));
  }
}, ka = Ee({
  ...Ol(),
  ...Cl()
}, "VForm"), ot = xe()({
  name: "VForm",
  props: ka(),
  emits: {
    "update:modelValue": (t) => !0,
    submit: (t) => !0
  },
  setup(t, r) {
    let {
      slots: n,
      emit: o
    } = r;
    const l = Sl(t), f = q();
    function s(a) {
      a.preventDefault(), l.reset();
    }
    function p(a) {
      const d = a, i = l.validate();
      d.then = i.then.bind(i), d.catch = i.catch.bind(i), d.finally = i.finally.bind(i), o("submit", d), d.defaultPrevented || i.then((y) => {
        var $;
        let {
          valid: O
        } = y;
        O && (($ = f.value) == null || $.submit());
      }), d.preventDefault();
    }
    return Re(() => {
      var a;
      return c("form", {
        ref: f,
        class: ["v-form", t.class],
        style: t.style,
        novalidate: !0,
        onReset: s,
        onSubmit: p
      }, [(a = n.default) == null ? void 0 : a.call(n, l)]);
    }), Ue(l, f);
  }
}), wa = { class: "flex-row justify-right" }, Va = { key: 1 }, ha = /* @__PURE__ */ ae({
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
    var d;
    const r = Me(t, "modelValue"), n = D("user"), o = q({}), l = t, f = I(() => ({
      add: l.editable && n.can([l.useModel, "add"]),
      change: l.editable && n.can([l.useModel, "change"]),
      delete: l.editable && n.can([l.useModel, "delete"])
    })), s = q([]);
    (d = r.value) != null && d.length || s.value.push(-1);
    function p() {
      r.value.push(o.value), o.value = {};
    }
    function a(i) {
      confirm(w("actions.delete.confirm")) && l.delete && r.value.splice(i);
    }
    return (i, y) => {
      var O;
      return (O = r.value) != null && O.length ? (v(), b(ve, {
        key: 0,
        opened: s.value,
        "onUpdate:opened": y[3] || (y[3] = ($) => s.value = $)
      }, {
        default: u(() => [
          (v(!0), T(_, null, J(r.value, ($, P) => (v(), b(Ie, {
            key: P,
            value: P
          }, {
            activator: u(({ props: S }) => [
              c(ue, G({ ref_for: !0 }, S), {
                append: u(() => [
                  re("div", {
                    onClick: y[0] || (y[0] = z(() => {
                    }, ["stop"]))
                  }, [
                    g(i.$slots, "item.actions", G({
                      item: $,
                      index: P,
                      ref_for: !0
                    }, S)),
                    f.value.delete ? (v(), b(N, {
                      key: 0,
                      type: "button",
                      class: "ml-2",
                      size: "small",
                      onClick: z((C) => a(P), ["stop", "prevent"]),
                      color: "error",
                      "aria-label": e(w)("actions.remove"),
                      title: e(w)("actions.remove"),
                      icon: "mdi-delete"
                    }, null, 8, ["onClick", "aria-label", "title"])) : x("", !0)
                  ])
                ]),
                default: u(() => [
                  c(Pl, null, {
                    default: u(() => [
                      g(i.$slots, "item.title", { item: $ })
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1040)
            ]),
            default: u(() => [
              c(ot, {
                disabled: !f.value.change
              }, {
                default: u(() => [
                  g(i.$slots, "item", {
                    item: $,
                    index: P,
                    editable: f.value.change
                  })
                ]),
                _: 2
              }, 1032, ["disabled"])
            ]),
            _: 2
          }, 1032, ["value"]))), 128)),
          f.value.add ? (v(), T(_, { key: 0 }, [
            r.value.length ? (v(), b(Be, { key: 0 })) : x("", !0),
            c(Ie, { value: -1 }, {
              activator: u(({ props: $ }) => [
                c(ue, G($, {
                  title: e(w)("actions.add_item"),
                  "prepend-icon": "mdi-plus"
                }), null, 16, ["title"])
              ]),
              default: u(() => [
                g(i.$slots, "item", {
                  item: o.value,
                  edit: !0
                }),
                o.value ? (v(), b(ue, { key: 0 }, {
                  default: u(() => [
                    re("div", wa, [
                      o.value ? (v(), b(N, {
                        key: 0,
                        size: "small",
                        onClick: y[1] || (y[1] = ($) => o.value = {}),
                        color: "secondary",
                        "prepend-icon": "mdi-backspace",
                        "aria-label": e(w)("actions.discard")
                      }, {
                        default: u(() => [
                          U(te(e(w)("actions.discard")), 1)
                        ]),
                        _: 1
                      }, 8, ["aria-label"])) : x("", !0),
                      o.value ? (v(), b(N, {
                        key: 1,
                        size: "small",
                        onClick: y[2] || (y[2] = ($) => p()),
                        color: "primary",
                        "prepend-icon": "mdi-plus",
                        "aria-label": e(w)("actions.add")
                      }, {
                        default: u(() => [
                          U(te(e(w)("actions.add")), 1)
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
        ]),
        _: 3
      }, 8, ["opened"])) : (v(), T("div", Va, te(e(w)("lists.empty")), 1));
    };
  }
}), $a = xe()({
  name: "VSlideGroupItem",
  props: Al(),
  emits: {
    "group:selected": (t) => !0
  },
  setup(t, r) {
    let {
      slots: n
    } = r;
    const o = Tl(t, Il);
    return () => {
      var l;
      return (l = n.default) == null ? void 0 : l.call(n, {
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
  setup(t, { emit: r }) {
    const n = r;
    D("list");
    const o = D("items"), l = t;
    function f(a) {
      return a = a % l.colors.length, l.colorVariant ? l.colors[a] + "-" + l.colorVariant : l.colors[a];
    }
    function s(a, d, i) {
      a[i] ? !a[i].includes(d) && a[i].push(d) : a[i] = [d];
    }
    const p = I(() => {
      const a = {};
      if (o.value)
        for (var d of o.value) {
          const y = d[l.field];
          if (Array.isArray(y))
            if (y.length)
              for (var i of y)
                s(a, d, i);
            else
              s(a, d, null);
          else
            s(a, d, y);
        }
      return a;
    });
    return (a, d) => (v(), b(at, null, {
      default: u(() => [
        c(_l, null, {
          default: u(() => [
            (v(!0), T(_, null, J(l.headers, (i, y) => (v(), b($a, {
              key: i.value
            }, {
              default: u(({ selectedClass: O }) => [
                c(Ll, {
                  width: "400",
                  class: At(["ma-3", O]),
                  color: f(y),
                  lines: "two"
                }, {
                  default: u(() => [
                    c(Fl, null, {
                      default: u(() => [
                        U(te(i.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    c(ve, {
                      "bg-color": f(y)
                    }, {
                      default: u(() => [
                        p.value && p.value[i.value] ? (v(!0), T(_, { key: 0 }, J(p.value[i.value], ($) => g(a.$slots, "item", {
                          key: $.id,
                          header: i,
                          item: $
                        }, () => [
                          c(ue, {
                            title: $[l.itemTitle],
                            value: l.itemValue && $[l.itemValue],
                            onClick: (P) => n("click", $)
                          }, {
                            append: u(() => [
                              g(a.$slots, "item.action")
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
}, it = /* @__PURE__ */ ae({
  __name: "OxListTable",
  props: {
    // list: Object,
    /** Table headers */
    headers: Array,
    /** If True, allow user to edit (display edit button) */
    edit: Boolean
  },
  setup(t) {
    const r = de(), n = Zl(r, "item.", { exclude: ["item.actions"] }), o = D("panel"), l = D("list"), f = D("items"), s = D("user"), p = t, a = I(() => p.headers.reduce((y, O) => (y.push(
      typeof O == "string" ? { key: O, title: w(Kt.field(O)) } : O
    ), y), []));
    function d(y) {
      l.filters.page = y.page, l.filters.page_size = y.itemsPerPage, l.filters.ordering = y.sortBy.map(({ key: O, order: $ }) => $ == "asc" ? O : `-${O}`);
    }
    function i(y, O) {
      o.show({ view: "detail.edit", value: O });
    }
    return (y, O) => {
      var $;
      return v(), b(Dl, {
        items: e(f),
        "item-index": "id",
        "items-length": e(l).count || e(f).length,
        "items-per-page": p.itemsPerPage,
        loading: ($ = e(l).state) == null ? void 0 : $.isProcessing,
        headers: a.value,
        "no-data-text": e(w)("lists.empty"),
        class: "align-top-table",
        "onUpdate:options": d
      }, fe({
        loading: u(() => [
          c(Ml, { type: "table-row@10" })
        ]),
        "item.actions": u(({ item: P }) => [
          e(s).can([P.constructor, "change"]) ? (v(), b($e, {
            key: 0,
            icon: "mdi-pencil",
            button: "",
            title: e(w)("actions.edit"),
            item: P,
            run: i
          }, null, 8, ["title", "item"])) : e(s).can([P.constructor, "view"]) ? (v(), b($e, {
            key: 1,
            icon: "mdi-eye-outline",
            button: "",
            title: e(w)("actions.edit"),
            item: P,
            run: i
          }, null, 8, ["title", "item"])) : x("", !0),
          g(y.$slots, "item.actions", {
            value: P,
            dense: !0,
            button: !0
          })
        ]),
        _: 2
      }, [
        J(e(n), (P, S) => ({
          name: S,
          fn: u((C) => [
            g(y.$slots, S, X(Z(C)))
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
    const r = de(), n = t;
    let o = q(!1);
    H(() => n.state.state, (s) => {
      n.delay && s == ea.PROCESSING && (o.value = !1, window.setTimeout(() => {
        o.value = !0;
      }, 5e3));
    });
    const l = I(() => {
      var s;
      return ((s = n.state) == null ? void 0 : s.isProcessing) && (!n.delay || o.value);
    }), f = I(() => {
      var s, p;
      return (p = (s = n.state) == null ? void 0 : s.data) == null ? void 0 : p.messages;
    });
    return (s, p) => (v(), T(_, null, [
      n.state.isNone && e(r).none ? (v(), b(e(ge), {
        key: 0,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        state: t.state,
        title: t.noneTitle
      }, {
        default: u(() => [
          g(s.$slots, "none", { state: t.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : l.value ? (v(), b(e(ge), {
        key: 1,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: t.state,
        title: t.processingTitle
      }, {
        default: u(() => [
          g(s.$slots, "processing", { state: t.state }, () => [
            p[0] || (p[0] = U(" Data are being sent to server, please be patient. If this message persist you might wan't to retry. "))
          ])
        ]),
        _: 3
      }, 8, ["state", "title"])) : n.state.isError ? (v(), b(e(ge), {
        key: 2,
        type: "error",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: t.state,
        title: t.errorTitle
      }, {
        default: u(() => [
          g(s.$slots, "error", { state: t.state }, () => [
            p[1] || (p[1] = U(" Oups... something wrong happened. "))
          ]),
          g(s.$slots, "error-detail", { state: t.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : n.state.isOk ? (v(), b(e(ge), {
        key: 3,
        type: "success",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: t.state,
        title: t.okTitle
      }, {
        default: u(() => [
          g(s.$slots, "ok", { state: t.state }, () => [
            p[2] || (p[2] = re("p", null, "Congrats! Data have been updated.", -1))
          ]),
          f.value ? (v(), T(_, { key: 0 }, [
            c(Be),
            (v(!0), T(_, null, J(f.value, (a) => (v(), T("p", null, te(a), 1))), 256))
          ], 64)) : x("", !0),
          g(s.$slots, "ok-detail", { state: t.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : x("", !0),
      g(s.$slots, "default", {
        state: n.state
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
  setup(t, { emit: r }) {
    const n = r, o = t;
    return (l, f) => (v(), T("div", Sa, [
      c(e(N), {
        color: "error",
        class: "me-2",
        "prepend-icon": o.resetIcon,
        onClick: f[0] || (f[0] = (s) => n("reset")),
        disabled: o.disabled
      }, {
        default: u(() => [
          g(l.$slots, "reset", {}, () => [
            U(te(o.resetLabel), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]),
      o.state.isSending ? (v(), b(e(N), {
        key: 0,
        color: "primary",
        "prepend-icon": "mdi-content-save",
        disabled: ""
      }, {
        default: u(() => f[2] || (f[2] = [
          U(" Saving ")
        ])),
        _: 1
      })) : (v(), b(e(N), {
        key: 1,
        color: "primary",
        "prepend-icon": o.validateIcon,
        onClick: f[1] || (f[1] = (s) => n("validate")),
        disabled: o.disabled || o.validateDisabled
      }, {
        default: u(() => [
          g(l.$slots, "validate", {}, () => [
            U(te(o.validateLabel), 1)
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
  setup(t, { emit: r }) {
    const n = Ze("password"), o = t, l = Te({
      username: "",
      password: ""
    }), f = q(!1), s = Te(new ta());
    function p(d = !0) {
      aa(l, { username: "", password: "" }), d && s.none();
    }
    async function a() {
      s.processing();
      try {
        const d = await fetch(o.url, {
          method: "POST",
          headers: la.axiosConfig.headers,
          body: JSON.stringify(l)
        });
        d.status == 200 ? (l.credentials = "", l.password = "", s.ok(await d.json()), o.next && (window.location.href = o.next)) : s.error(await d.json());
      } catch (d) {
        s.ok((d == null ? void 0 : d.message) || d);
      }
    }
    return (d, i) => (v(), T(_, null, [
      c(e(Se), { state: s }, {
        none: u(({ state: y }) => i[7] || (i[7] = [
          re("p", null, "Please enter your credentials in order too proceed...", -1)
        ])),
        "ok-detail": u(({ state: y }) => [
          o.next ? (v(), T("p", Ca, [
            i[8] || (i[8] = U("You soon will be redirected to ")),
            re("i", null, te(o.next), 1)
          ])) : x("", !0)
        ]),
        error: u(({ state: y }) => {
          var O, $;
          return [
            c(Fe, {
              errors: (O = y.data) == null ? void 0 : O.username
            }, null, 8, ["errors"]),
            c(Fe, {
              errors: ($ = y.data) == null ? void 0 : $.password
            }, null, 8, ["errors"])
          ];
        }),
        _: 1
      }, 8, ["state"]),
      s.isOk ? x("", !0) : (v(), T(_, { key: 0 }, [
        c(ke, {
          variant: "underlined",
          label: "Enter login",
          modelValue: l.username,
          "onUpdate:modelValue": i[0] || (i[0] = (y) => l.username = y),
          onKeyup: i[1] || (i[1] = ze(z((y) => e(n).focus(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue"]),
        c(ke, {
          variant: "underlined",
          ref: "password",
          label: "Enter password",
          modelValue: l.password,
          "onUpdate:modelValue": i[2] || (i[2] = (y) => l.password = y),
          type: f.value ? "text" : "password",
          "append-icon": f.value ? "mdi-eye" : "mdi-eye-off",
          "onClick:append": i[3] || (i[3] = (y) => f.value = !f.value),
          onKeyup: i[4] || (i[4] = ze(z((y) => a(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue", "type", "append-icon"]),
        re("div", Oa, [
          g(d.$slots, "default", {
            value: l.password
          }, () => [
            l.username && l.password ? (v(), b(Ke, {
              key: 0,
              "validate-label": "Login!",
              onValidate: i[5] || (i[5] = (y) => a()),
              onReset: i[6] || (i[6] = (y) => p()),
              state: s
            }, null, 8, ["state"])) : x("", !0)
          ])
        ])
      ], 64))
    ], 64));
  }
}, rt = /* @__PURE__ */ ae({
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
    const r = de(), n = t, o = me(r, "views."), l = q(!1);
    we(() => {
      l.value = !0;
    }), Tt(() => {
      l.value = !1;
    });
    const f = D("panels"), s = D("panel");
    return (p, a) => (v(), b(Le, {
      value: n.name
    }, {
      default: u(() => [
        n.state ? (v(), b(Se, {
          key: 0,
          state: n.state,
          delay: ""
        }, null, 8, ["state"])) : x("", !0),
        c(at, { class: "ma-4" }, {
          default: u(() => [
            (v(), b(Ge, {
              to: "#app-bar-sheet-title",
              disabled: !l.value || e(f).panel != n.name
            }, [
              n.icon ? (v(), b(le, {
                key: 0,
                icon: n.icon
              }, null, 8, ["icon"])) : x("", !0),
              U(" " + te(n.title), 1)
            ], 8, ["disabled"])),
            (v(), b(Ge, {
              to: "#app-bar-right",
              disabled: !l.value || e(f).panel != n.name
            }, [
              g(p.$slots, "append-title"),
              n.help ? (v(), b(N, {
                key: 0,
                class: "ml-3",
                href: n.help,
                panels: "new",
                icon: "mdi-information-outline"
              }, null, 8, ["href"])) : x("", !0)
            ], 8, ["disabled"])),
            g(p.$slots, "top"),
            g(p.$slots, "default", {}, () => [
              e(o) ? (v(), b(Bl, {
                key: 0,
                modelValue: e(s).view,
                "onUpdate:modelValue": a[0] || (a[0] = (d) => e(s).view = d)
              }, {
                default: u(() => [
                  (v(!0), T(_, null, J(e(o), (d, i) => (v(), b(Rl, {
                    key: d,
                    value: d
                  }, {
                    default: u(() => [
                      g(p.$slots, i)
                    ]),
                    _: 2
                  }, 1032, ["value"]))), 128))
                ]),
                _: 3
              }, 8, ["modelValue"])) : x("", !0)
            ]),
            g(p.$slots, "bottom")
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["value"]));
  }
}), ut = /* @__PURE__ */ ae({
  __name: "OxView",
  props: {
    /** default tab title */
    title: String
  },
  setup(t) {
    const r = t, n = q(null), o = de(), l = me(o, "tab.", { exclude: "tab.default" }), f = me(o, "window.");
    return (s, p) => e(l) && Object.keys(e(l)).length ? (v(), T(_, { key: 0 }, [
      c(Ul, {
        modelValue: n.value,
        "onUpdate:modelValue": p[0] || (p[0] = (a) => n.value = a)
      }, {
        default: u(() => [
          e(o).default ? g(s.$slots, "tab", { key: 0 }, () => [
            c(Ye, {
              text: r == null ? void 0 : r.title,
              value: "default"
            }, null, 8, ["text"])
          ]) : x("", !0),
          (v(!0), T(_, null, J(e(l), (a, d) => (v(), b(Ye, { value: a }, {
            default: u(() => [
              g(s.$slots, d)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"]),
      c(tt, {
        modelValue: n.value,
        "onUpdate:modelValue": p[1] || (p[1] = (a) => n.value = a)
      }, {
        default: u(() => [
          e(o).default ? (v(), b(Le, {
            key: 0,
            value: "default"
          }, {
            default: u(() => [
              g(s.$slots, "default")
            ]),
            _: 3
          })) : x("", !0),
          (v(!0), T(_, null, J(e(f), (a, d) => (v(), b(Le, { value: a }, {
            default: u(() => [
              g(s.$slots, d)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"])
    ], 64)) : g(s.$slots, "default", { key: 1 });
  }
}), Aa = { class: "mb-3" }, Ta = /* @__PURE__ */ ae({
  __name: "OxModelEdit",
  props: {
    repo: {},
    empty: {},
    initial: {},
    name: {},
    url: {},
    saved: { type: Function }
  },
  setup(t, { expose: r }) {
    const n = D("context"), o = t, { editor: l, edited: f } = Nt({ props: o }), s = I(() => n.user.can([l.repo.use, "change"])), p = I(() => ({
      editor: l,
      edited: f,
      editable: s.value,
      value: l.value,
      model: l.repo.use
    }));
    return r({ editor: l, edited: f }), (a, d) => (v(), T(_, null, [
      c(Se, {
        state: e(l).state
      }, null, 8, ["state"]),
      re("div", Aa, [
        s.value && e(f) ? (v(), b(Ke, {
          key: 0,
          onValidate: d[0] || (d[0] = (i) => e(l).save()),
          onReset: d[1] || (d[1] = (i) => e(l).discard()),
          state: e(l).state,
          "validate-disabled": !e(l).valid,
          disabled: e(l).state.isProcessing
        }, null, 8, ["state", "validate-disabled", "disabled"])) : x("", !0)
      ]),
      c(El, { class: "ox-model-edit" }, {
        default: u(() => [
          c(ot, {
            modelValue: e(l).valid,
            "onUpdate:modelValue": d[2] || (d[2] = (i) => e(l).valid = i),
            disabled: !s.value
          }, {
            default: u(() => [
              g(a.$slots, "default", X(Z(p.value)))
            ]),
            _: 3
          }, 8, ["modelValue", "disabled"]),
          g(a.$slots, "append", X(Z(p.value)))
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
    const r = de(), n = me(r, "views.list."), o = me(r, "item."), l = me(r, "views.detail.edit."), f = Ze("filters"), s = t, p = D("context"), { panel: a, list: d, items: i, next: y, prev: O } = D("panel") ?? jt({ props: s }), $ = a.panels;
    I(() => {
      var L;
      return p.user.can([a.model, (L = a.value) != null && L.id ? "change" : "add"]);
    });
    const { showFilters: P } = It(a), S = I(() => [
      ...s.headers,
      { key: "actions", title: w("actions") }
    ]);
    function C(L) {
      a.value = L;
    }
    const k = I(() => ({
      panel: a,
      panels: $,
      list: d,
      items: i,
      context: p,
      value: a.value
    }));
    return H(() => Object.values(d.filters), () => d.load()), (L, V) => (v(), b(rt, {
      name: s.name,
      title: e(a).title,
      icon: e(a).icon,
      state: e(d).state,
      index: s.index
    }, fe({
      "append-title": u(() => [
        g(L.$slots, "append-title", X(Z(k.value))),
        e(a).view.startsWith("list.") ? (v(), b(He, {
          key: 0,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: u(() => [
            g(L.$slots, "nav.list", X(Z(k.value))),
            e(f) ? (v(), b(N, {
              key: 0,
              title: e(P) ? e(w)("filters.hide") : e(w)("filters.show"),
              "aria-label": e(P) ? e(w)("filters.hide") : e(w)("filters.show"),
              onClick: V[0] || (V[0] = (M) => P.value = !e(P)),
              active: e(P)
            }, {
              default: u(() => [
                c(le, {
                  icon: e(f).icon
                }, null, 8, ["icon"])
              ]),
              _: 1
            }, 8, ["title", "aria-label", "active"])) : x("", !0)
          ]),
          _: 3
        })) : e(a).view.startsWith("detail.") && e(a).value ? (v(), b(He, {
          key: 1,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: u(() => [
            g(L.$slots, "nav.detail", X(Z(k.value))),
            e(a).view == "detail.edit" && e(a).value ? (v(), b(lt, { key: 0 }, {
              activator: u(({ props: M }) => [
                c(N, G({ "prepend-icon": "mdi-dots-vertical" }, M), {
                  default: u(() => [
                    U(te(e(w)("actions")), 1)
                  ]),
                  _: 2
                }, 1040)
              ]),
              default: u(() => [
                c(ve, null, {
                  default: u(() => [
                    g(L.$slots, "item.actions", {
                      value: e(a).value
                    })
                  ]),
                  _: 3
                })
              ]),
              _: 3
            })) : x("", !0),
            c(N, {
              disabled: !e(O),
              title: e(w)("prev"),
              "aria-label": e(w)("prev"),
              onClick: V[1] || (V[1] = z((M) => e(a).show({ view: e(a).view, value: e(O) }), ["stop"]))
            }, {
              default: u(() => [
                c(le, { icon: "mdi-chevron-left" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"]),
            c(N, {
              disabled: !e(y),
              title: e(w)("next"),
              "aria-label": e(w)("next"),
              onClick: V[2] || (V[2] = z((M) => e(a).show({ view: e(a).view, value: e(y) }), ["stop"]))
            }, {
              default: u(() => [
                c(le, { icon: "mdi-chevron-right" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"])
          ]),
          _: 3
        })) : x("", !0),
        c(Kl, {
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal",
          mandatory: "",
          modelValue: e(a).view,
          "onUpdate:modelValue": V[8] || (V[8] = (M) => e(a).view = M)
        }, {
          default: u(() => {
            var M;
            return [
              c(N, {
                value: "list.table",
                onClick: V[3] || (V[3] = z((Y) => e(a).show({ view: "list.table" }), ["stop"])),
                title: e(w)("panels.nav.table"),
                "aria-label": e(w)("panels.nav.table")
              }, {
                default: u(() => [
                  c(le, null, {
                    default: u(() => V[9] || (V[9] = [
                      U("mdi-table")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"]),
              e(r)["views.list.cards"] ? (v(), b(N, {
                key: 0,
                value: "list.cards",
                onClick: V[4] || (V[4] = z((Y) => e(a).show({ view: "list.cards" }), ["stop"])),
                title: e(w)("panels.nav.cards"),
                "aria-label": e(w)("panels.nav.cards")
              }, {
                default: u(() => [
                  c(le, null, {
                    default: u(() => V[10] || (V[10] = [
                      U("mdi-card-account-details")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : x("", !0),
              e(r)["views.list.kanban"] ? (v(), b(N, {
                key: 1,
                value: "list.kanban",
                onClick: V[5] || (V[5] = z((Y) => e(a).show({ view: "list.kanban" }), ["stop"])),
                title: e(w)("panels.nav.kanban"),
                "aria-label": e(w)("panels.nav.kanban")
              }, {
                default: u(() => [
                  c(le, null, {
                    default: u(() => V[11] || (V[11] = [
                      U("mdi-view-column")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : x("", !0),
              e(l) ? (v(), b(N, {
                key: 2,
                value: "detail.add",
                onClick: V[6] || (V[6] = z((Y) => e(a).create(), ["stop"])),
                title: e(w)("panels.nav.add"),
                "aria-label": e(w)("panels.nav.add")
              }, {
                default: u(() => [
                  c(le, null, {
                    default: u(() => V[12] || (V[12] = [
                      U("mdi-plus-box")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : x("", !0),
              e(r)["views.detail.edit"] || e(l) ? (v(), b(N, {
                key: 3,
                value: "detail.edit",
                onClick: V[7] || (V[7] = z((Y) => e(a).show({ view: "detail.edit", value: e(a).value }), ["stop"])),
                disabled: !((M = e(a).value) != null && M.id),
                title: e(w)("panels.nav.edit"),
                "aria-label": e(w)("panels.nav.edit")
              }, {
                default: u(() => [
                  c(le, null, {
                    default: u(() => V[13] || (V[13] = [
                      U("mdi-pencil")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"])) : x("", !0),
              g(L.$slots, "nav.views", X(Z(k.value)))
            ];
          }),
          _: 3
        }, 8, ["modelValue"])
      ]),
      top: u(() => [
        s.warning ? (v(), b(ge, {
          key: 0,
          type: "warning",
          variant: "tonal",
          text: s.warning
        }, null, 8, ["text"])) : x("", !0),
        g(L.$slots, "top"),
        _t(c(st, {
          ref_key: "filters",
          ref: f,
          search: s.search,
          "teleport-to": "#panel-list-actions"
        }, {
          default: u((M) => [
            g(L.$slots, "list.filters", X(Z(M)))
          ]),
          _: 3
        }, 8, ["search"]), [
          [Lt, e(a).view.startsWith("list.") && e(P)]
        ])
      ]),
      _: 2
    }, [
      e(r)["views.list.table"] ? void 0 : {
        name: "views.list.table",
        fn: u(() => [
          c(it, { headers: S.value }, fe({ _: 2 }, [
            J(e(o), (M, Y) => ({
              name: Y,
              fn: u((Q) => [
                g(L.$slots, Y, X(Z(Q)))
              ])
            }))
          ]), 1032, ["headers"])
        ]),
        key: "0"
      },
      J(e(n), (M, Y) => ({
        name: Y,
        fn: u(() => [
          g(L.$slots, Y, X(Z(k.value)))
        ])
      })),
      e(r)["views.detail.edit"] || e(l) ? {
        name: "views.detail.edit",
        fn: u(() => [
          c(e(ut), {
            title: e(w)(`models.${e(a).model.entity}`)
          }, fe({ _: 2 }, [
            J(e(l), (M, Y) => ({
              name: M,
              fn: u(() => [
                g(L.$slots, Y, {
                  saved: C,
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
  OxAction: $e,
  OxActionModelDelete: sa,
  OxActions: oa,
  OxApp: pa,
  OxAutocomplete: ya,
  OxComponent: ba,
  OxFieldDetails: Fe,
  OxFormList: ha,
  OxListFilters: st,
  OxListKanban: xa,
  OxListTable: it,
  OxLogin: Pa,
  OxModelEdit: Ta,
  OxModelPanel: Ia,
  OxPanel: rt,
  OxStateAlert: Se,
  OxValidationBtn: Ke,
  OxView: ut
}, Symbol.toStringTag, { value: "Module" })), Ua = {
  el: "#app",
  delimiters: ["[[", "]]"],
  components: { ..._a, ...na }
};
export {
  Ua as App,
  $e as OxAction,
  sa as OxActionModelDelete,
  oa as OxActions,
  pa as OxApp,
  ya as OxAutocomplete,
  ba as OxComponent,
  Fe as OxFieldDetails,
  ha as OxFormList,
  st as OxListFilters,
  xa as OxListKanban,
  it as OxListTable,
  Pa as OxLogin,
  Ta as OxModelEdit,
  Ia as OxModelPanel,
  rt as OxPanel,
  Se as OxStateAlert,
  Ke as OxValidationBtn,
  ut as OxView
};
//# sourceMappingURL=components.js.map
