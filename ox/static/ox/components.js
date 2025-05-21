import { defineComponent as ae, inject as D, createElementBlock as T, createCommentVNode as x, unref as t, openBlock as v, Fragment as I, createBlock as b, withModifiers as X, useSlots as de, renderSlot as g, normalizeProps as J, guardReactiveProps as Q, ref as W, computed as _, resolveComponent as xt, createVNode as c, withCtx as u, createTextVNode as U, toDisplayString as ee, renderList as Y, mergeProps as z, mergeModels as De, useModel as Me, onMounted as we, watch as q, shallowRef as ie, onScopeDispose as St, nextTick as Ae, watchEffect as $t, reactive as Te, onErrorCaptured as Ot, createElementVNode as re, createSlots as fe, useAttrs as Ct, h as Pt, normalizeClass as At, useTemplateRef as Ze, withKeys as ze, onUnmounted as Tt, Teleport as Ge, toRefs as _t, withDirectives as It, vShow as Lt } from "vue";
import { useAction as Ft, t as w, useAppContext as Dt, usePanels as Mt, excludeValues as Bt, useModelList as Rt, query as Ut, defineAsyncComponent as Et, tKeys as Kt, filterSlots as me, useModelEditor as Nt, useModelPanel as jt } from "ox";
import { V as N, a as ue, b as zt, c as _e, d as Be, e as Gt, f as ve, u as Wt, g as qt, h as Yt, i as Ht, j as Jt, k as Re, l as Ue, m as Qt, n as Xt, o as Zt, p as el, q as tl, r as ll, s as We, t as al, v as nl, w as et, x as sl, y as ol, z as qe, A as il, B as Ie, C as rl, D as ul, E as tt, F as dl, G as cl, H as vl, I as pl, J as fl, K as ke, L as le, M as lt, N as ml, O as yl, P as bl, Q as gl, R as kl, S as wl, T as Vl, U as hl, W as xl, X as Sl, Y as $l, Z as Ol, _ as Cl, $ as Pl, a0 as Al, a1 as Tl, a2 as _l, a3 as at, a4 as Il, a5 as Ll, a6 as Fl, a7 as Dl, a8 as Ml, a9 as ge, aa as Le, ab as Bl, ac as Rl, ad as Ul, ae as Ye, af as El, ag as He, ah as Kl } from "./VAlert-CWfqeBu5.js";
import { l as Se, n as Ee, u as he, o as Nl, q as jl, r as zl, s as nt, t as Gl, v as Wl, w as ql, j as Yl, x as Hl, y as Jl, z as Je, A as Qe, B as Ql } from "./theme-BrdPdMMA.js";
import { o as Xl, D as Zl, v as ea, S as ta, j as la, r as aa } from "./lodash-9f3mbMbV.js";
import { components as na } from "ox/vendor";
const xe = /* @__PURE__ */ ae({
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
  setup(e, { emit: r }) {
    const a = e, o = r, l = D("context"), { run: f, processing: s, allowed: p } = Ft({ user: l.user, emits: o, props: a });
    return (n, d) => t(p) ? (v(), T(I, { key: 0 }, [
      a.button ? (v(), b(N, {
        key: 0,
        variant: "text",
        disabled: t(s),
        color: a.color,
        icon: a.icon,
        title: a.title,
        "aria-label": a.title,
        onClick: X(t(f), ["stop"])
      }, null, 8, ["disabled", "color", "icon", "title", "aria-label", "onClick"])) : (v(), b(ue, {
        key: 1,
        title: a.title,
        "base-color": a.color,
        "prepend-icon": a.icon,
        disabled: t(s),
        onClick: X(t(f), ["stop"])
      }, null, 8, ["title", "base-color", "prepend-icon", "disabled", "onClick"]))
    ], 64)) : x("", !0);
  }
}), sa = /* @__PURE__ */ ae({
  __name: "OxActionModelDelete",
  props: {
    item: {},
    button: { type: Boolean }
  },
  setup(e) {
    const r = D("panel"), a = D("repos"), o = e;
    async function l(f, s) {
      return await a[s.constructor.entity].api().delete(s.$url(), { delete: o.item.id });
    }
    return (f, s) => (v(), b(xe, {
      item: o.item,
      button: o.button,
      icon: "mdi-delete",
      color: "error",
      title: t(w)("actions.delete"),
      confirm: t(w)("actions.delete.confirm"),
      permissions: ["delete", (p, n) => n.id],
      run: l,
      onCompleted: s[0] || (s[0] = (p) => {
        var n;
        return (n = t(r)) == null ? void 0 : n.show({ view: t(r).index });
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
  setup(e) {
    de();
    const r = e;
    return (a, o) => (v(), T(I, null, [
      g(a.$slots, "before", J(Q(r))),
      g(a.$slots, "default", J(Q(r))),
      g(a.$slots, "after", J(Q(r)))
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
  setup(e) {
    const r = e;
    W(null);
    const a = D("user"), o = D("panels");
    _(() => !r.auto || panel.name == r.name);
    function l(s) {
      return s.permissions && !a.can(s.permissions) ? !1 : s.items ? s.items.some((p) => l(p)) : !0;
    }
    function f() {
      const s = { panel: r.value, href: r.url };
      console.log(r, s), o.show(s);
    }
    return (s, p) => {
      const n = xt("ox-app-nav-item", !0);
      return l(r) ? (v(), T(I, { key: 0 }, [
        r.type == "subheader" ? (v(), T(I, { key: 0 }, [
          c(zt, null, {
            default: u(() => [
              U(ee(r.title), 1)
            ]),
            _: 1
          }),
          r.items ? (v(!0), T(I, { key: 0 }, Y(r.items, (d) => (v(), b(n, z({ ref_for: !0 }, d), null, 16))), 256)) : x("", !0)
        ], 64)) : r.type == "group" ? (v(), b(_e, {
          key: 1,
          value: r.value
        }, {
          activator: u(({ props: d }) => [
            c(ue, z(d, {
              title: r.title,
              "prepend-icon": r.icon
            }), null, 16, ["title", "prepend-icon"])
          ]),
          default: u(() => [
            (v(!0), T(I, null, Y(r.items, (d, i) => (v(), b(n, z({
              key: i,
              ref_for: !0
            }, d), null, 16))), 128))
          ]),
          _: 1
        }, 8, ["value"])) : r.type == "divider" ? (v(), b(Be, { key: 2 })) : (v(), b(ue, {
          key: 3,
          active: t(o).panel == r.value,
          value: r.value,
          "prepend-icon": r.icon,
          title: r.title,
          onClick: X(f, ["stop"])
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
  setup(e) {
    D("context");
    const r = D("panels"), a = Me(e, "drawer"), o = W([]), l = e, f = _(() => l.items);
    function s(n) {
      if (r.panel) {
        for (const d of n)
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
    return we(p), q(f, p), q(() => r.panel, p), (n, d) => (v(), b(Gt, {
      modelValue: a.value,
      "onUpdate:modelValue": d[1] || (d[1] = (i) => a.value = i),
      theme: "dark"
    }, {
      append: u(() => [
        c(ve, null, {
          default: u(() => [
            g(n.$slots, "append")
          ]),
          _: 3
        })
      ]),
      default: u(() => [
        g(n.$slots, "prepend"),
        c(ve, {
          opened: o.value,
          "onUpdate:opened": d[0] || (d[0] = (i) => o.value = i),
          density: "compact"
        }, {
          default: u(() => [
            (v(!0), T(I, null, Y(f.value, (i, y) => (v(), b(t(ia), z({
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
function ua(e) {
  const r = ie(e());
  let a = -1;
  function o() {
    clearInterval(a);
  }
  function l() {
    o(), Ae(() => r.value = e());
  }
  function f(s) {
    const p = s ? getComputedStyle(s) : {
      transitionDuration: 0.2
    }, n = parseFloat(p.transitionDuration) * 1e3 || 200;
    if (o(), r.value <= 0) return;
    const d = performance.now();
    a = window.setInterval(() => {
      const i = performance.now() - d + n;
      r.value = Math.max(e() - i, 0), r.value <= 0 && o();
    }, n);
  }
  return St(o), {
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
}, "VSnackbar"), ca = Se()({
  name: "VSnackbar",
  props: da(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, r) {
    let {
      slots: a
    } = r;
    const o = he(e, "modelValue"), {
      positionClasses: l
    } = Wt(e), {
      scopeId: f
    } = qt(), {
      themeClasses: s
    } = Nl(e), {
      colorClasses: p,
      colorStyles: n,
      variantClasses: d
    } = Yt(e), {
      roundedClasses: i
    } = Ht(e), y = ua(() => Number(e.timeout)), C = W(), h = W(), P = ie(!1), S = ie(0), $ = W(), k = D(Jt, void 0);
    jl(() => !!k, () => {
      const E = ll();
      $t(() => {
        $.value = E.mainStyles.value;
      });
    }), q(o, O), q(() => e.timeout, O), we(() => {
      o.value && O();
    });
    let L = -1;
    function O() {
      y.reset(), window.clearTimeout(L);
      const E = Number(e.timeout);
      if (!o.value || E === -1) return;
      const oe = zl(h.value);
      y.start(oe), L = window.setTimeout(() => {
        o.value = !1;
      }, E);
    }
    function M() {
      y.reset(), window.clearTimeout(L);
    }
    function te() {
      P.value = !0, M();
    }
    function H() {
      P.value = !1, O();
    }
    function pe(E) {
      S.value = E.touches[0].clientY;
    }
    function se(E) {
      Math.abs(S.value - E.changedTouches[0].clientY) > 50 && (o.value = !1);
    }
    function Oe() {
      P.value && H();
    }
    const ye = _(() => e.location.split(" ").reduce((E, oe) => (E[`v-snackbar--${oe}`] = !0, E), {}));
    return Re(() => {
      const E = We.filterProps(e), oe = !!(a.default || a.text || e.text);
      return c(We, z({
        ref: C,
        class: ["v-snackbar", {
          "v-snackbar--active": o.value,
          "v-snackbar--multi-line": e.multiLine && !e.vertical,
          "v-snackbar--timer": !!e.timer,
          "v-snackbar--vertical": e.vertical
        }, ye.value, l.value, e.class],
        style: [$.value, e.style]
      }, E, {
        modelValue: o.value,
        "onUpdate:modelValue": (F) => o.value = F,
        contentProps: z({
          class: ["v-snackbar__wrapper", s.value, p.value, i.value, d.value],
          style: [n.value],
          onPointerenter: te,
          onPointerleave: H
        }, E.contentProps),
        persistent: !0,
        noClickAnimation: !0,
        scrim: !1,
        scrollStrategy: "none",
        _disableGlobalStack: !0,
        onTouchstartPassive: pe,
        onTouchend: se,
        onAfterLeave: Oe
      }, f), {
        default: () => {
          var F, be;
          return [al(!1, "v-snackbar"), e.timer && !P.value && c("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [c(nl, {
            ref: h,
            color: typeof e.timer == "string" ? e.timer : "info",
            max: e.timeout,
            "model-value": y.time.value
          }, null)]), oe && c("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((F = a.text) == null ? void 0 : F.call(a)) ?? e.text, (be = a.default) == null ? void 0 : be.call(a)]), a.actions && c(et, {
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
            }, [a.actions({
              isActive: o
            })])]
          })];
        },
        activator: a.activator
      });
    }), Ue({}, C);
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
  setup(e) {
    const r = de(), a = e, o = Te({ drawer: !0 }), l = Dt(a), f = Mt();
    return we(() => {
      f.panel = l.data.panel;
    }), q(() => [l.state.state, l.state.data], () => {
      l.showState = !0;
    }), Ot((s, p, n) => {
      l.state.error(`${s}`);
    }), (s, p) => (v(), b(sl, null, {
      default: u(() => [
        c(ca, {
          modelValue: t(l).showState,
          "onUpdate:modelValue": p[0] || (p[0] = (n) => t(l).showState = n),
          color: t(l).state.color,
          "multi-line": ""
        }, {
          default: u(() => [
            U(ee(t(l).state.data), 1)
          ]),
          _: 1
        }, 8, ["modelValue", "color"]),
        c(ol, { color: "primary" }, {
          prepend: u(() => [
            c(Ie, {
              icon: "mdi-apps",
              title: t(w)("nav.panels"),
              "aria-label": t(w)("nav.panels"),
              onClick: p[1] || (p[1] = X((n) => o.drawer = !o.drawer, ["stop"]))
            }, null, 8, ["title", "aria-label"]),
            t(r)["app-nav"] && !o.drawer2 ? (v(), b(Ie, {
              key: 0,
              icon: "mdi-menu",
              onClick: p[2] || (p[2] = (n) => {
                o.drawer2 = !0, o.drawer = !1;
              })
            })) : x("", !0)
          ]),
          default: u(() => [
            c(qe, { id: "app-bar-sheet-title" }),
            c(qe, { id: "app-bar-title" }, {
              default: u(() => [
                g(s.$slots, "title", { context: t(l) })
              ]),
              _: 3
            }),
            c(il),
            g(s.$slots, "app-bar-left", { context: t(l) }),
            p[6] || (p[6] = re("div", {
              id: "app-bar-right",
              class: "mr-3"
            }, null, -1)),
            g(s.$slots, "app-bar-right", { context: t(l) })
          ]),
          _: 3
        }),
        c(t(ra), {
          drawer: o.drawer,
          "onUpdate:drawer": p[4] || (p[4] = (n) => o.drawer = n),
          items: t(l).data.nav
        }, fe({
          prepend: u(() => [
            re("a", va, [
              s.logo ? (v(), b(rl, {
                key: 0,
                src: s.logo,
                class: "logo"
              }, null, 8, ["src"])) : x("", !0)
            ]),
            g(s.$slots, "nav-start", { context: t(l) })
          ]),
          _: 2
        }, [
          t(r)["nav-end"] ? {
            name: "append",
            fn: u(() => [
              c(ve, {
                opened: o.opened,
                "onUpdate:opened": p[3] || (p[3] = (n) => o.opened = n)
              }, {
                default: u(() => [
                  g(s.$slots, "nav-end", { context: t(l) })
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
                modelValue: t(f).panel,
                "onUpdate:modelValue": p[5] || (p[5] = (n) => t(f).panel = n)
              }, {
                default: u((n) => [
                  g(s.$slots, "default", z(n, { context: t(l) }))
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
  ...nt(xl({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...wl({
    transition: !1
  })
}, "VAutocomplete"), ma = Se()({
  name: "VAutocomplete",
  props: fa(),
  emits: {
    "update:focused": (e) => !0,
    "update:search": (e) => !0,
    "update:modelValue": (e) => !0,
    "update:menu": (e) => !0
  },
  setup(e, r) {
    let {
      slots: a
    } = r;
    const {
      t: o
    } = Wl(), l = W(), f = ie(!1), s = ie(!0), p = ie(!1), n = W(), d = W(), i = ie(-1), {
      items: y,
      transformIn: C,
      transformOut: h
    } = dl(e), {
      textColorClasses: P,
      textColorStyles: S
    } = cl(() => {
      var m;
      return (m = l.value) == null ? void 0 : m.color;
    }), $ = he(e, "search", ""), k = he(e, "modelValue", [], (m) => C(m === null ? [null] : ql(m)), (m) => {
      const V = h(m);
      return e.multiple ? V : V[0] ?? null;
    }), L = _(() => typeof e.counterValue == "function" ? e.counterValue(k.value) : typeof e.counterValue == "number" ? e.counterValue : k.value.length), O = vl(e), {
      filteredItems: M,
      getMatches: te
    } = pl(e, y, () => s.value ? "" : $.value), H = _(() => e.hideSelected ? M.value.filter((m) => !k.value.some((V) => V.value === m.value)) : M.value), pe = _(() => !!(e.chips || a.chip)), se = _(() => pe.value || !!a.selection), Oe = _(() => k.value.map((m) => m.props.value)), ye = _(() => {
      var V;
      return (e.autoSelectFirst === !0 || e.autoSelectFirst === "exact" && $.value === ((V = H.value[0]) == null ? void 0 : V.title)) && H.value.length > 0 && !s.value && !p.value;
    }), E = _(() => e.hideNoData && !H.value.length || O.isReadonly.value || O.isDisabled.value), oe = he(e, "menu"), F = _({
      get: () => oe.value,
      set: (m) => {
        var V;
        oe.value && !m && ((V = n.value) != null && V.ΨopenChildren.size) || m && E.value || (oe.value = m);
      }
    }), be = _(() => F.value ? e.closeText : e.openText), Ce = W(), dt = fl(Ce, l);
    function ct(m) {
      e.openOnClear && (F.value = !0), $.value = "";
    }
    function vt() {
      E.value || (F.value = !0);
    }
    function pt(m) {
      E.value || (f.value && (m.preventDefault(), m.stopPropagation()), F.value = !F.value);
    }
    function ft(m) {
      var V;
      m.key !== " " && Je(m) && ((V = l.value) == null || V.focus());
    }
    function mt(m) {
      var A, K, Z, ne, B;
      if (O.isReadonly.value) return;
      const V = (A = l.value) == null ? void 0 : A.selectionStart, R = k.value.length;
      if (["Enter", "ArrowDown", "ArrowUp"].includes(m.key) && m.preventDefault(), ["Enter", "ArrowDown"].includes(m.key) && (F.value = !0), ["Escape"].includes(m.key) && (F.value = !1), ye.value && ["Enter", "Tab"].includes(m.key) && !k.value.some((G) => {
        let {
          value: j
        } = G;
        return j === H.value[0].value;
      }) && ce(H.value[0]), m.key === "ArrowDown" && ye.value && ((K = Ce.value) == null || K.focus("next")), ["Backspace", "Delete"].includes(m.key)) {
        if (!e.multiple && se.value && k.value.length > 0 && !$.value) return ce(k.value[0], !1);
        if (~i.value) {
          m.preventDefault();
          const G = i.value;
          ce(k.value[i.value], !1), i.value = G >= R - 1 ? R - 2 : G;
        } else m.key === "Backspace" && !$.value && (i.value = R - 1);
        return;
      }
      if (e.multiple)
        if (m.key === "ArrowLeft") {
          if (i.value < 0 && V && V > 0) return;
          const G = i.value > -1 ? i.value - 1 : R - 1;
          if (k.value[G])
            i.value = G;
          else {
            const j = ((Z = $.value) == null ? void 0 : Z.length) ?? null;
            i.value = -1, (ne = l.value) == null || ne.setSelectionRange(j, j);
          }
        } else if (m.key === "ArrowRight") {
          if (i.value < 0) return;
          const G = i.value + 1;
          k.value[G] ? i.value = G : (i.value = -1, (B = l.value) == null || B.setSelectionRange(0, 0));
        } else ~i.value && Je(m) && (i.value = -1);
    }
    function yt(m) {
      if (Qe(l.value, ":autofill") || Qe(l.value, ":-webkit-autofill")) {
        const V = y.value.find((R) => R.title === m.target.value);
        V && ce(V);
      }
    }
    function bt() {
      var m;
      e.eager && ((m = d.value) == null || m.calculateVisibleItems());
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
      (m == null || m === "" && !e.multiple && !se.value) && (k.value = []);
    }
    const Pe = ie(!1);
    function ce(m) {
      let V = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!(!m || m.props.disabled))
        if (e.multiple) {
          const R = k.value.findIndex((K) => (e.valueComparator || Ql)(K.value, m.value)), A = V ?? !~R;
          if (~R) {
            const K = A ? [...k.value, m] : [...k.value];
            K.splice(R, 1), k.value = K;
          } else A && (k.value = [...k.value, m]);
          e.clearOnSelect && ($.value = "");
        } else {
          const R = V !== !1;
          k.value = R ? [m] : [], $.value = R && !se.value ? m.title : "", Ae(() => {
            F.value = !1, s.value = !0;
          });
        }
    }
    return q(f, (m, V) => {
      var R;
      m !== V && (m ? (Pe.value = !0, $.value = e.multiple || se.value ? "" : String(((R = k.value.at(-1)) == null ? void 0 : R.props.title) ?? ""), s.value = !0, Ae(() => Pe.value = !1)) : (!e.multiple && $.value == null && (k.value = []), F.value = !1, (e.multiple || se.value) && ($.value = ""), i.value = -1));
    }), q($, (m) => {
      !f.value || Pe.value || (m && (F.value = !0), s.value = !m);
    }), q(F, () => {
      if (!e.hideSelected && F.value && k.value.length) {
        const m = H.value.findIndex((V) => k.value.some((R) => V.value === R.value));
        Yl && window.requestAnimationFrame(() => {
          var V;
          m >= 0 && ((V = d.value) == null || V.scrollToIndex(m));
        });
      }
    }), q(() => e.items, (m, V) => {
      F.value || f.value && !V.length && m.length && (F.value = !0);
    }), q(k, (m) => {
      var V;
      !e.multiple && !se.value && ($.value = ((V = m[0]) == null ? void 0 : V.title) ?? "");
    }), Re(() => {
      const m = !!(!e.hideNoData || H.value.length || a["prepend-item"] || a["append-item"] || a["no-data"]), V = k.value.length > 0, R = ke.filterProps(e);
      return c(ke, z({
        ref: l
      }, R, {
        modelValue: $.value,
        "onUpdate:modelValue": [(A) => $.value = A, Vt],
        focused: f.value,
        "onUpdate:focused": (A) => f.value = A,
        validationValue: k.externalValue,
        counterValue: L.value,
        dirty: V,
        onChange: yt,
        class: ["v-autocomplete", `v-autocomplete--${e.multiple ? "multiple" : "single"}`, {
          "v-autocomplete--active-menu": F.value,
          "v-autocomplete--chips": !!e.chips,
          "v-autocomplete--selection-slot": !!se.value,
          "v-autocomplete--selecting-index": i.value > -1
        }, e.class],
        style: e.style,
        readonly: O.isReadonly.value,
        placeholder: V ? void 0 : e.placeholder,
        "onClick:clear": ct,
        "onMousedown:control": vt,
        onKeydown: mt
      }), {
        ...a,
        default: () => c(I, null, [c(lt, z({
          ref: n,
          modelValue: F.value,
          "onUpdate:modelValue": (A) => F.value = A,
          activator: "parent",
          contentClass: "v-autocomplete__content",
          disabled: E.value,
          eager: e.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: e.transition,
          onAfterEnter: bt,
          onAfterLeave: gt
        }, e.menuProps), {
          default: () => [m && c(ve, z({
            ref: Ce,
            selected: Oe.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: (A) => A.preventDefault(),
            onKeydown: ft,
            onFocusin: kt,
            onFocusout: wt,
            tabindex: "-1",
            "aria-live": "polite",
            color: e.itemColor ?? e.color
          }, dt, e.listProps), {
            default: () => {
              var A, K, Z;
              return [(A = a["prepend-item"]) == null ? void 0 : A.call(a), !H.value.length && !e.hideNoData && (((K = a["no-data"]) == null ? void 0 : K.call(a)) ?? c(ue, {
                key: "no-data",
                title: o(e.noDataText)
              }, null)), c(ml, {
                ref: d,
                renderless: !0,
                items: H.value,
                itemKey: "value"
              }, {
                default: (ne) => {
                  var je;
                  let {
                    item: B,
                    index: G,
                    itemRef: j
                  } = ne;
                  const Ne = z(B.props, {
                    ref: j,
                    key: B.value,
                    active: ye.value && G === 0 ? !0 : void 0,
                    onClick: () => ce(B, null)
                  });
                  return ((je = a.item) == null ? void 0 : je.call(a, {
                    item: B,
                    index: G,
                    props: Ne
                  })) ?? c(ue, z(Ne, {
                    role: "option"
                  }), {
                    prepend: (Ve) => {
                      let {
                        isSelected: ht
                      } = Ve;
                      return c(I, null, [e.multiple && !e.hideSelected ? c(bl, {
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
                      return s.value ? B.title : yl("v-autocomplete", B.title, (Ve = te(B)) == null ? void 0 : Ve.title);
                    }
                  });
                }
              }), (Z = a["append-item"]) == null ? void 0 : Z.call(a)];
            }
          })]
        }), k.value.map((A, K) => {
          function Z(j) {
            j.stopPropagation(), j.preventDefault(), ce(A, !1);
          }
          const ne = {
            "onClick:close": Z,
            onKeydown(j) {
              j.key !== "Enter" && j.key !== " " || (j.preventDefault(), j.stopPropagation(), Z(j));
            },
            onMousedown(j) {
              j.preventDefault(), j.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, B = pe.value ? !!a.chip : !!a.selection, G = B ? Jl(pe.value ? a.chip({
            item: A,
            index: K,
            props: ne
          }) : a.selection({
            item: A,
            index: K
          })) : void 0;
          if (!(B && !G))
            return c("div", {
              key: A.value,
              class: ["v-autocomplete__selection", K === i.value && ["v-autocomplete__selection--selected", P.value]],
              style: K === i.value ? S.value : {}
            }, [pe.value ? a.chip ? c(et, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: e.closableChips,
                  size: "small",
                  text: A.title
                }
              }
            }, {
              default: () => [G]
            }) : c(kl, z({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: A.title,
              disabled: A.props.disabled
            }, ne), null) : G ?? c("span", {
              class: "v-autocomplete__selection-text"
            }, [A.title, e.multiple && K < k.value.length - 1 && c("span", {
              class: "v-autocomplete__selection-comma"
            }, [U(",")])])]);
        })]),
        "append-inner": function() {
          var ne, B;
          for (var A = arguments.length, K = new Array(A), Z = 0; Z < A; Z++)
            K[Z] = arguments[Z];
          return c(I, null, [(ne = a["append-inner"]) == null ? void 0 : ne.call(a, ...K), e.menuIcon ? c(le, {
            class: "v-autocomplete__menu-icon",
            color: (B = l.value) == null ? void 0 : B.fieldIconColor,
            icon: e.menuIcon,
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
      search: $,
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
  setup(e) {
    var P;
    const r = de(), a = Me(e, "modelValue"), o = W(""), l = e, f = Ct(), s = D("repos"), p = Bt(l, ["repo", "search"]), { list: n, items: d } = Rt({
      ...(P = p.value) == null ? void 0 : P[1],
      filters: l.filters || {},
      save: !1,
      query: Ut(l.repo, s)
    });
    function i(S) {
      S[l.lookup] = o.value, Xl.isEqual(n.filters, S) || (n.filters = { ...l.filters }, n.filters[l.lookup] = o.value, n.load());
    }
    function y(S) {
      const $ = n.filters[l.lookup];
      n.nextUrl, S && S != "<empty string>" && S != $ && (n.filters[l.lookup] = S, n.load().then((k) => {
        o.value = S;
      }));
    }
    var C = null;
    function h(S) {
      !S || n.findIndex(S) != -1 || n.findIndex(S) == -1 && C != S && (C = S, n.load({ id: S, append: 0 }));
    }
    return we(() => {
      l.filters && Object.values(l.filters).length ? i(l.filters) : n.load(), h(a.value);
    }), q(() => l.filters, (S) => i(S)), q(o, y), q(a, (S, $) => S != $ && h(S)), (S, $) => (v(), b(t(ma), z(t(f), {
      items: t(d),
      loading: t(n).state.isProcessing,
      modelValue: a.value,
      "onUpdate:modelValue": $[0] || ($[0] = (k) => a.value = k),
      search: o.value,
      "onUpdate:search": $[1] || ($[1] = (k) => o.value = k)
    }), fe({ _: 2 }, [
      Y(t(r), (k, L) => ({
        name: L,
        fn: u((O) => [
          g(S.$slots, L, J(Q(O)))
        ])
      }))
    ]), 1040, ["items", "loading", "modelValue", "search"]));
  }
}), ba = {
  props: {
    src: String,
    is: String
  },
  setup(e) {
    const r = ie(null), a = _(() => {
      if (e.is)
        return e.is;
      let l = e.src.substring(e.src.lastIndexOf("/") + 1);
      if (l && (l = l.substring(0, l.indexOf("."))), !l)
        throw Error(
          "`is` not provided and could not be deducted from `src`."
        );
      return l;
    });
    function o() {
      r.value = Et(e.src, a.value);
    }
    return q(() => e.src, o), o(), () => Pt(r.value, e);
  }
}, ga = { class: "text-error" }, Fe = {
  __name: "OxFieldDetails",
  props: {
    state: Object,
    errors: Array
  },
  setup(e) {
    const r = e;
    return (a, o) => r.errors ? (v(!0), T(I, { key: 0 }, Y(r.errors, (l) => (v(), T("div", ga, [
      c(le, { icon: "mdi-alert-circle-outline" }),
      U(" " + ee(l), 1)
    ]))), 256)) : x("", !0);
  }
}, st = {
  __name: "OxListFilters",
  props: {
    search: String
  },
  setup(e, { expose: r }) {
    const a = D("list"), o = e, l = _(() => {
      const p = a.filters;
      return p && Object.entries(p).some(
        ([n, d]) => !n.startsWith("page") && !n.startsWith("ordering") && !!d
      );
    }), f = _(() => l.value ? "mdi-filter-check" : "mdi-filter-outline");
    function s() {
      a.filters = {}, a.load();
    }
    return r({ icon: f, hasFilters: l, reset: s }), (p, n) => (v(), T("form", {
      onSubmit: n[2] || (n[2] = X((d) => t(a).load(), ["prevent"])),
      class: "width-full"
    }, [
      c(Sl, {
        dense: "",
        color: "transparent"
      }, {
        default: u(() => [
          c(Ie, {
            icon: f.value,
            readonly: ""
          }, null, 8, ["icon"]),
          o.search && t(a).filters ? (v(), b(ke, {
            key: 0,
            label: t(w)("filters.search"),
            density: "compact",
            class: "ml-2",
            modelValue: t(a).filters[o.search],
            "onUpdate:modelValue": n[0] || (n[0] = (d) => t(a).filters[o.search] = d),
            "hide-details": ""
          }, null, 8, ["label", "modelValue"])) : x("", !0),
          g(p.$slots, "default", {
            list: t(a),
            filters: t(a).filters
          }),
          c(N, {
            onClick: n[1] || (n[1] = X((d) => t(a).load(), ["stop"])),
            class: "ml-2",
            icon: "mdi-check",
            "aria-label": p.$t("filters.apply"),
            title: t(w)("filters.apply")
          }, null, 8, ["aria-label", "title"]),
          l.value ? (v(), b(N, {
            key: 1,
            onClick: X(s, ["stop"]),
            icon: "mdi-backspace",
            "aria-label": t(w)("filters.reset"),
            title: t(w)("filters.reset")
          }, null, 8, ["aria-label", "title"])) : x("", !0)
        ]),
        _: 3
      })
    ], 32));
  }
}, ka = Ee({
  ...Cl(),
  ...Ol()
}, "VForm"), ot = Se()({
  name: "VForm",
  props: ka(),
  emits: {
    "update:modelValue": (e) => !0,
    submit: (e) => !0
  },
  setup(e, r) {
    let {
      slots: a,
      emit: o
    } = r;
    const l = $l(e), f = W();
    function s(n) {
      n.preventDefault(), l.reset();
    }
    function p(n) {
      const d = n, i = l.validate();
      d.then = i.then.bind(i), d.catch = i.catch.bind(i), d.finally = i.finally.bind(i), o("submit", d), d.defaultPrevented || i.then((y) => {
        var h;
        let {
          valid: C
        } = y;
        C && ((h = f.value) == null || h.submit());
      }), d.preventDefault();
    }
    return Re(() => {
      var n;
      return c("form", {
        ref: f,
        class: ["v-form", e.class],
        style: e.style,
        novalidate: !0,
        onReset: s,
        onSubmit: p
      }, [(n = a.default) == null ? void 0 : n.call(a, l)]);
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
  setup(e) {
    var d;
    const r = Me(e, "modelValue"), a = D("user"), o = W({}), l = e, f = _(() => ({
      add: l.editable && a.can([l.useModel, "add"]),
      change: l.editable && a.can([l.useModel, "change"]),
      delete: l.editable && a.can([l.useModel, "delete"])
    })), s = W([]);
    (d = r.value) != null && d.length || s.value.push(-1);
    function p() {
      r.value.push(o.value), o.value = {};
    }
    function n(i) {
      confirm(w("actions.delete.confirm")) && l.delete && r.value.splice(i);
    }
    return (i, y) => {
      var C;
      return (C = r.value) != null && C.length ? (v(), b(ve, {
        key: 0,
        opened: s.value,
        "onUpdate:opened": y[3] || (y[3] = (h) => s.value = h)
      }, {
        default: u(() => [
          (v(!0), T(I, null, Y(r.value, (h, P) => (v(), b(_e, {
            key: P,
            value: P
          }, {
            activator: u(({ props: S }) => [
              c(ue, z({ ref_for: !0 }, S), {
                append: u(() => [
                  re("div", {
                    onClick: y[0] || (y[0] = X(() => {
                    }, ["stop"]))
                  }, [
                    g(i.$slots, "item.actions", z({
                      item: h,
                      index: P,
                      ref_for: !0
                    }, S)),
                    f.value.delete ? (v(), b(N, {
                      key: 0,
                      type: "button",
                      class: "ml-2",
                      size: "small",
                      onClick: X(($) => n(P), ["stop", "prevent"]),
                      color: "error",
                      "aria-label": t(w)("actions.remove"),
                      title: t(w)("actions.remove"),
                      icon: "mdi-delete"
                    }, null, 8, ["onClick", "aria-label", "title"])) : x("", !0)
                  ])
                ]),
                default: u(() => [
                  c(Pl, null, {
                    default: u(() => [
                      g(i.$slots, "item.title", { item: h })
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
                    item: h,
                    index: P,
                    editable: f.value.change
                  })
                ]),
                _: 2
              }, 1032, ["disabled"])
            ]),
            _: 2
          }, 1032, ["value"]))), 128)),
          f.value.add ? (v(), T(I, { key: 0 }, [
            r.value.length ? (v(), b(Be, { key: 0 })) : x("", !0),
            c(_e, { value: -1 }, {
              activator: u(({ props: h }) => [
                c(ue, z(h, {
                  title: t(w)("actions.add_item"),
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
                        onClick: y[1] || (y[1] = (h) => o.value = {}),
                        color: "secondary",
                        "prepend-icon": "mdi-backspace",
                        "aria-label": t(w)("actions.discard")
                      }, {
                        default: u(() => [
                          U(ee(t(w)("actions.discard")), 1)
                        ]),
                        _: 1
                      }, 8, ["aria-label"])) : x("", !0),
                      o.value ? (v(), b(N, {
                        key: 1,
                        size: "small",
                        onClick: y[2] || (y[2] = (h) => p()),
                        color: "primary",
                        "prepend-icon": "mdi-plus",
                        "aria-label": t(w)("actions.add")
                      }, {
                        default: u(() => [
                          U(ee(t(w)("actions.add")), 1)
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
      }, 8, ["opened"])) : (v(), T("div", Va, ee(t(w)("lists.empty")), 1));
    };
  }
}), xa = Se()({
  name: "VSlideGroupItem",
  props: Al(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, r) {
    let {
      slots: a
    } = r;
    const o = Tl(e, _l);
    return () => {
      var l;
      return (l = a.default) == null ? void 0 : l.call(a, {
        isSelected: o.isSelected.value,
        select: o.select,
        toggle: o.toggle,
        selectedClass: o.selectedClass.value
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
  setup(e, { emit: r }) {
    const a = r;
    D("list");
    const o = D("items"), l = e;
    function f(n) {
      return n = n % l.colors.length, l.colorVariant ? l.colors[n] + "-" + l.colorVariant : l.colors[n];
    }
    function s(n, d, i) {
      n[i] ? !n[i].includes(d) && n[i].push(d) : n[i] = [d];
    }
    const p = _(() => {
      const n = {};
      if (o.value)
        for (var d of o.value) {
          const y = d[l.field];
          if (Array.isArray(y))
            if (y.length)
              for (var i of y)
                s(n, d, i);
            else
              s(n, d, null);
          else
            s(n, d, y);
        }
      return n;
    });
    return (n, d) => (v(), b(at, null, {
      default: u(() => [
        c(Il, null, {
          default: u(() => [
            (v(!0), T(I, null, Y(l.headers, (i, y) => (v(), b(xa, {
              key: i.value
            }, {
              default: u(({ selectedClass: C }) => [
                c(Ll, {
                  width: "400",
                  class: At(["ma-3", C]),
                  color: f(y),
                  lines: "two"
                }, {
                  default: u(() => [
                    c(Fl, null, {
                      default: u(() => [
                        U(ee(i.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    c(ve, {
                      "bg-color": f(y)
                    }, {
                      default: u(() => [
                        p.value && p.value[i.value] ? (v(!0), T(I, { key: 0 }, Y(p.value[i.value], (h) => g(n.$slots, "item", {
                          key: h.id,
                          header: i,
                          item: h
                        }, () => [
                          c(ue, {
                            title: h[l.itemTitle],
                            value: l.itemValue && h[l.itemValue],
                            onClick: (P) => a("click", h)
                          }, {
                            append: u(() => [
                              g(n.$slots, "item.action")
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
  setup(e) {
    const r = de(), a = Zl(r, "item.", { exclude: ["item.actions"] }), o = D("panel"), l = D("list"), f = D("items"), s = D("user"), p = e, n = _(() => p.headers.reduce((y, C) => (y.push(
      typeof C == "string" ? { key: C, title: w(Kt.field(C)) } : C
    ), y), []));
    function d(y) {
      l.filters.page = y.page, l.filters.page_size = y.itemsPerPage, l.filters.ordering = y.sortBy.map(({ key: C, order: h }) => h == "asc" ? C : `-${C}`);
    }
    function i(y, C) {
      o.show({ view: "detail.edit", value: C });
    }
    return (y, C) => {
      var h;
      return v(), b(Dl, {
        items: t(f),
        "item-index": "id",
        "items-length": t(l).count || t(f).length,
        "items-per-page": p.itemsPerPage,
        loading: (h = t(l).state) == null ? void 0 : h.isProcessing,
        headers: n.value,
        "no-data-text": t(w)("lists.empty"),
        class: "align-top-table",
        "onUpdate:options": d
      }, fe({
        loading: u(() => [
          c(Ml, { type: "table-row@10" })
        ]),
        "item.actions": u(({ item: P }) => [
          t(s).can([P.constructor, "change"]) ? (v(), b(xe, {
            key: 0,
            icon: "mdi-pencil",
            button: "",
            title: t(w)("actions.edit"),
            item: P,
            run: i
          }, null, 8, ["title", "item"])) : t(s).can([P.constructor, "view"]) ? (v(), b(xe, {
            key: 1,
            icon: "mdi-eye-outline",
            button: "",
            title: t(w)("actions.edit"),
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
        Y(t(a), (P, S) => ({
          name: S,
          fn: u(($) => [
            g(y.$slots, S, J(Q($)))
          ])
        }))
      ]), 1032, ["items", "items-length", "items-per-page", "loading", "headers", "no-data-text"]);
    };
  }
}), $e = {
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
    const r = de(), a = e;
    let o = W(!1);
    q(() => a.state.state, (s) => {
      a.delay && s == ea.PROCESSING && (o.value = !1, window.setTimeout(() => {
        o.value = !0;
      }, 5e3));
    });
    const l = _(() => {
      var s;
      return ((s = a.state) == null ? void 0 : s.isProcessing) && (!a.delay || o.value);
    }), f = _(() => {
      var s, p;
      return (p = (s = a.state) == null ? void 0 : s.data) == null ? void 0 : p.messages;
    });
    return (s, p) => (v(), T(I, null, [
      a.state.isNone && t(r).none ? (v(), b(t(ge), {
        key: 0,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        state: e.state,
        title: e.noneTitle
      }, {
        default: u(() => [
          g(s.$slots, "none", { state: e.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : l.value ? (v(), b(t(ge), {
        key: 1,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: e.state,
        title: e.processingTitle
      }, {
        default: u(() => [
          g(s.$slots, "processing", { state: e.state }, () => [
            p[0] || (p[0] = U(" Data are being sent to server, please be patient. If this message persist you might wan't to retry. "))
          ])
        ]),
        _: 3
      }, 8, ["state", "title"])) : a.state.isError ? (v(), b(t(ge), {
        key: 2,
        type: "error",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: e.state,
        title: e.errorTitle
      }, {
        default: u(() => [
          g(s.$slots, "error", { state: e.state }, () => [
            p[1] || (p[1] = U(" Oups... something wrong happened. "))
          ]),
          g(s.$slots, "error-detail", { state: e.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : a.state.isOk ? (v(), b(t(ge), {
        key: 3,
        type: "success",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: e.state,
        title: e.okTitle
      }, {
        default: u(() => [
          g(s.$slots, "ok", { state: e.state }, () => [
            p[2] || (p[2] = re("p", null, "Congrats! Data have been updated.", -1))
          ]),
          f.value ? (v(), T(I, { key: 0 }, [
            c(Be),
            (v(!0), T(I, null, Y(f.value, (n) => (v(), T("p", null, ee(n), 1))), 256))
          ], 64)) : x("", !0),
          g(s.$slots, "ok-detail", { state: e.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : x("", !0),
      g(s.$slots, "default", {
        state: a.state
      })
    ], 64));
  }
}, $a = { class: "text-right" }, Ke = {
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
  setup(e, { emit: r }) {
    const a = r, o = e;
    return (l, f) => (v(), T("div", $a, [
      c(t(N), {
        color: "error",
        class: "me-2",
        "prepend-icon": o.resetIcon,
        onClick: f[0] || (f[0] = (s) => a("reset")),
        disabled: o.disabled
      }, {
        default: u(() => [
          g(l.$slots, "reset", {}, () => [
            U(ee(o.resetLabel), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]),
      o.state.isSending ? (v(), b(t(N), {
        key: 0,
        color: "primary",
        "prepend-icon": "mdi-content-save",
        disabled: ""
      }, {
        default: u(() => f[2] || (f[2] = [
          U(" Saving ")
        ])),
        _: 1
      })) : (v(), b(t(N), {
        key: 1,
        color: "primary",
        "prepend-icon": o.validateIcon,
        onClick: f[1] || (f[1] = (s) => a("validate")),
        disabled: o.disabled || o.validateDisabled
      }, {
        default: u(() => [
          g(l.$slots, "validate", {}, () => [
            U(ee(o.validateLabel), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]))
    ]));
  }
}, Oa = { key: 0 }, Ca = { class: "text-right mt-3" }, Pa = {
  __name: "OxLogin",
  props: {
    next: { type: String },
    url: { type: String }
  },
  emits: ["save", "saved"],
  setup(e, { emit: r }) {
    const a = Ze("password"), o = e, l = Te({
      username: "",
      password: ""
    }), f = W(!1), s = Te(new ta());
    function p(d = !0) {
      aa(l, { username: "", password: "" }), d && s.none();
    }
    async function n() {
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
    return (d, i) => (v(), T(I, null, [
      c(t($e), { state: s }, {
        none: u(({ state: y }) => i[7] || (i[7] = [
          re("p", null, "Please enter your credentials in order too proceed...", -1)
        ])),
        "ok-detail": u(({ state: y }) => [
          o.next ? (v(), T("p", Oa, [
            i[8] || (i[8] = U("You soon will be redirected to ")),
            re("i", null, ee(o.next), 1)
          ])) : x("", !0)
        ]),
        error: u(({ state: y }) => {
          var C, h;
          return [
            c(Fe, {
              errors: (C = y.data) == null ? void 0 : C.username
            }, null, 8, ["errors"]),
            c(Fe, {
              errors: (h = y.data) == null ? void 0 : h.password
            }, null, 8, ["errors"])
          ];
        }),
        _: 1
      }, 8, ["state"]),
      s.isOk ? x("", !0) : (v(), T(I, { key: 0 }, [
        c(ke, {
          variant: "underlined",
          label: "Enter login",
          modelValue: l.username,
          "onUpdate:modelValue": i[0] || (i[0] = (y) => l.username = y),
          onKeyup: i[1] || (i[1] = ze(X((y) => t(a).focus(), ["stop"]), ["enter"]))
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
          onKeyup: i[4] || (i[4] = ze(X((y) => n(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue", "type", "append-icon"]),
        re("div", Ca, [
          g(d.$slots, "default", {
            value: l.password
          }, () => [
            l.username && l.password ? (v(), b(Ke, {
              key: 0,
              "validate-label": "Login!",
              onValidate: i[5] || (i[5] = (y) => n()),
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
  setup(e) {
    const r = de(), a = e, o = me(r, "views."), l = W(!1);
    we(() => {
      l.value = !0;
    }), Tt(() => {
      l.value = !1;
    });
    const f = D("panels"), s = D("panel");
    return (p, n) => (v(), b(Le, {
      value: a.name
    }, {
      default: u(() => [
        a.state ? (v(), b($e, {
          key: 0,
          state: a.state,
          delay: ""
        }, null, 8, ["state"])) : x("", !0),
        c(at, { class: "ma-4" }, {
          default: u(() => [
            (v(), b(Ge, {
              to: "#app-bar-sheet-title",
              disabled: !l.value || t(f).panel != a.name
            }, [
              a.icon ? (v(), b(le, {
                key: 0,
                icon: a.icon
              }, null, 8, ["icon"])) : x("", !0),
              U(" " + ee(a.title), 1)
            ], 8, ["disabled"])),
            (v(), b(Ge, {
              to: "#app-bar-right",
              disabled: !l.value || t(f).panel != a.name
            }, [
              g(p.$slots, "append-title"),
              a.help ? (v(), b(N, {
                key: 0,
                class: "ml-3",
                href: a.help,
                panels: "new",
                icon: "mdi-information-outline"
              }, null, 8, ["href"])) : x("", !0)
            ], 8, ["disabled"])),
            g(p.$slots, "top"),
            g(p.$slots, "default", {}, () => [
              t(o) ? (v(), b(Bl, {
                key: 0,
                modelValue: t(s).view,
                "onUpdate:modelValue": n[0] || (n[0] = (d) => t(s).view = d)
              }, {
                default: u(() => [
                  (v(!0), T(I, null, Y(t(o), (d, i) => (v(), b(Rl, {
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
  setup(e) {
    const r = e, a = W(null), o = de(), l = me(o, "tab.", { exclude: "tab.default" }), f = me(o, "window.");
    return (s, p) => t(l) && Object.keys(t(l)).length ? (v(), T(I, { key: 0 }, [
      c(Ul, {
        modelValue: a.value,
        "onUpdate:modelValue": p[0] || (p[0] = (n) => a.value = n)
      }, {
        default: u(() => [
          t(o).default ? g(s.$slots, "tab", { key: 0 }, () => [
            c(Ye, {
              text: r == null ? void 0 : r.title,
              value: "default"
            }, null, 8, ["text"])
          ]) : x("", !0),
          (v(!0), T(I, null, Y(t(l), (n, d) => (v(), b(Ye, { value: n }, {
            default: u(() => [
              g(s.$slots, d)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"]),
      c(tt, {
        modelValue: a.value,
        "onUpdate:modelValue": p[1] || (p[1] = (n) => a.value = n)
      }, {
        default: u(() => [
          t(o).default ? (v(), b(Le, {
            key: 0,
            value: "default"
          }, {
            default: u(() => [
              g(s.$slots, "default")
            ]),
            _: 3
          })) : x("", !0),
          (v(!0), T(I, null, Y(t(f), (n, d) => (v(), b(Le, { value: n }, {
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
  setup(e, { expose: r }) {
    const a = D("context"), o = e, { editor: l, edited: f } = Nt({ props: o }), s = _(() => a.user.can([l.repo.use, "change"])), p = _(() => ({
      editor: l,
      edited: f,
      editable: s.value,
      value: l.value,
      model: l.repo.use
    }));
    return r({ editor: l, edited: f }), (n, d) => (v(), T(I, null, [
      c($e, {
        state: t(l).state
      }, null, 8, ["state"]),
      re("div", Aa, [
        s.value && t(f) ? (v(), b(Ke, {
          key: 0,
          onValidate: d[0] || (d[0] = (i) => t(l).save()),
          onReset: d[1] || (d[1] = (i) => t(l).discard()),
          state: t(l).state,
          "validate-disabled": !t(l).valid
        }, null, 8, ["state", "validate-disabled"])) : x("", !0)
      ]),
      c(El, { class: "ox-model-edit" }, {
        default: u(() => [
          c(ot, {
            modelValue: t(l).valid,
            "onUpdate:modelValue": d[2] || (d[2] = (i) => t(l).valid = i),
            disabled: !s.value
          }, {
            default: u(() => [
              g(n.$slots, "default", J(Q(p.value)))
            ]),
            _: 3
          }, 8, ["modelValue", "disabled"]),
          g(n.$slots, "append", J(Q(p.value)))
        ]),
        _: 3
      })
    ], 64));
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
  setup(e) {
    const r = de(), a = me(r, "views.list."), o = me(r, "item."), l = me(r, "views.detail.edit."), f = Ze("filters"), s = e, p = D("context"), { panel: n, list: d, items: i, next: y, prev: C } = D("panel") ?? jt({ props: s }), h = n.panels;
    _(() => {
      var L;
      return p.user.can([n.model, (L = n.value) != null && L.id ? "change" : "add"]);
    });
    const { showFilters: P } = _t(n), S = _(() => [
      ...s.headers,
      { key: "actions", title: w("actions") }
    ]);
    function $(L) {
      n.value.value = L;
    }
    const k = _(() => ({
      panel: n,
      panels: h,
      list: d,
      items: i,
      context: p,
      value: n.value
    }));
    return q(() => Object.values(d.filters), () => d.load()), (L, O) => (v(), b(rt, {
      name: s.name,
      title: t(n).title,
      icon: t(n).icon,
      state: t(d).state,
      index: s.index
    }, fe({
      "append-title": u(() => [
        g(L.$slots, "append-title", J(Q(k.value))),
        t(n).view.startsWith("list.") ? (v(), b(He, {
          key: 0,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: u(() => [
            g(L.$slots, "nav.list", J(Q(k.value))),
            t(f) ? (v(), b(N, {
              key: 0,
              title: t(P) ? t(w)("filters.hide") : t(w)("filters.show"),
              "aria-label": t(P) ? t(w)("filters.hide") : t(w)("filters.show"),
              onClick: O[0] || (O[0] = (M) => P.value = !t(P)),
              active: t(P)
            }, {
              default: u(() => [
                c(le, {
                  icon: t(f).icon
                }, null, 8, ["icon"])
              ]),
              _: 1
            }, 8, ["title", "aria-label", "active"])) : x("", !0)
          ]),
          _: 3
        })) : t(n).view.startsWith("detail.") && t(n).value ? (v(), b(He, {
          key: 1,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: u(() => [
            g(L.$slots, "nav.detail", J(Q(k.value))),
            t(n).view == "detail.edit" && t(n).value ? (v(), b(lt, { key: 0 }, {
              activator: u(({ props: M }) => [
                c(N, z({ "prepend-icon": "mdi-dots-vertical" }, M), {
                  default: u(() => [
                    U(ee(t(w)("actions")), 1)
                  ]),
                  _: 2
                }, 1040)
              ]),
              default: u(() => [
                c(ve, null, {
                  default: u(() => [
                    g(L.$slots, "item.actions", {
                      value: t(n).value
                    })
                  ]),
                  _: 3
                })
              ]),
              _: 3
            })) : x("", !0),
            c(N, {
              disabled: !t(C),
              title: t(w)("prev"),
              "aria-label": t(w)("prev"),
              onClick: O[1] || (O[1] = X((M) => t(n).show({ value: t(C) }), ["stop"]))
            }, {
              default: u(() => [
                c(le, { icon: "mdi-chevron-left" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"]),
            c(N, {
              disabled: !t(y),
              title: t(w)("next"),
              "aria-label": t(w)("next"),
              onClick: O[2] || (O[2] = X((M) => t(n).show({ value: t(y) }), ["stop"]))
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
          modelValue: t(n).view,
          "onUpdate:modelValue": O[4] || (O[4] = (M) => t(n).view = M),
          density: "compact",
          variant: "tonal",
          mandatory: ""
        }, {
          default: u(() => {
            var M;
            return [
              c(N, {
                value: "list.table",
                title: t(w)("panels.nav.table"),
                "aria-label": t(w)("panels.nav.table")
              }, {
                default: u(() => [
                  c(le, null, {
                    default: u(() => O[5] || (O[5] = [
                      U("mdi-table")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"]),
              t(r)["views.list.cards"] ? (v(), b(N, {
                key: 0,
                value: "list.cards",
                title: t(w)("panels.nav.cards"),
                "aria-label": t(w)("panels.nav.cards")
              }, {
                default: u(() => [
                  c(le, null, {
                    default: u(() => O[6] || (O[6] = [
                      U("mdi-card-account-details")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : x("", !0),
              t(r)["views.list.kanban"] ? (v(), b(N, {
                key: 1,
                value: "list.kanban",
                title: t(w)("panels.nav.kanban"),
                "aria-label": t(w)("panels.nav.kanban")
              }, {
                default: u(() => [
                  c(le, null, {
                    default: u(() => O[7] || (O[7] = [
                      U("mdi-view-column")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : x("", !0),
              t(l) ? (v(), b(N, {
                key: 2,
                value: "detail.add",
                onClick: O[3] || (O[3] = X((te) => t(n).create(), ["stop"])),
                title: t(w)("panels.nav.add"),
                "aria-label": t(w)("panels.nav.add")
              }, {
                default: u(() => [
                  c(le, null, {
                    default: u(() => O[8] || (O[8] = [
                      U("mdi-plus-box")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : x("", !0),
              t(r)["views.detail.edit"] || t(l) ? (v(), b(N, {
                key: 3,
                value: "detail.edit",
                disabled: !((M = t(n).value) != null && M.id),
                title: t(w)("panels.nav.edit"),
                "aria-label": t(w)("panels.nav.edit")
              }, {
                default: u(() => [
                  c(le, null, {
                    default: u(() => O[9] || (O[9] = [
                      U("mdi-pencil")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"])) : x("", !0),
              g(L.$slots, "nav.views", J(Q(k.value)))
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
        It(c(st, {
          ref_key: "filters",
          ref: f,
          search: s.search,
          "teleport-to": "#panel-list-actions"
        }, {
          default: u((M) => [
            g(L.$slots, "list.filters", J(Q(M)))
          ]),
          _: 3
        }, 8, ["search"]), [
          [Lt, t(n).view.startsWith("list.") && t(P)]
        ])
      ]),
      _: 2
    }, [
      t(r)["views.list.table"] ? void 0 : {
        name: "views.list.table",
        fn: u(() => [
          c(it, { headers: S.value }, fe({ _: 2 }, [
            Y(t(o), (M, te) => ({
              name: te,
              fn: u((H) => [
                g(L.$slots, te, J(Q(H)))
              ])
            }))
          ]), 1032, ["headers"])
        ]),
        key: "0"
      },
      Y(t(a), (M, te) => ({
        name: te,
        fn: u(() => [
          g(L.$slots, te, J(Q(k.value)))
        ])
      })),
      t(r)["views.detail.edit"] || t(l) ? {
        name: "views.detail.edit",
        fn: u(() => [
          c(t(ut), {
            title: t(w)(`models.${t(n).model.entity}`)
          }, fe({ _: 2 }, [
            Y(t(l), (M, te) => ({
              name: M,
              fn: u(() => [
                g(L.$slots, te, {
                  saved: $,
                  value: t(n).value
                })
              ])
            }))
          ]), 1032, ["title"])
        ]),
        key: "1"
      } : void 0
    ]), 1032, ["name", "title", "icon", "state", "index"]));
  }
}), Ia = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OxAction: xe,
  OxActionModelDelete: sa,
  OxActions: oa,
  OxApp: pa,
  OxAutocomplete: ya,
  OxComponent: ba,
  OxFieldDetails: Fe,
  OxFormList: ha,
  OxListFilters: st,
  OxListKanban: Sa,
  OxListTable: it,
  OxLogin: Pa,
  OxModelEdit: Ta,
  OxModelPanel: _a,
  OxPanel: rt,
  OxStateAlert: $e,
  OxValidationBtn: Ke,
  OxView: ut
}, Symbol.toStringTag, { value: "Module" })), Ua = {
  el: "#app",
  delimiters: ["[[", "]]"],
  components: { ...Ia, ...na }
};
export {
  Ua as App,
  xe as OxAction,
  sa as OxActionModelDelete,
  oa as OxActions,
  pa as OxApp,
  ya as OxAutocomplete,
  ba as OxComponent,
  Fe as OxFieldDetails,
  ha as OxFormList,
  st as OxListFilters,
  Sa as OxListKanban,
  it as OxListTable,
  Pa as OxLogin,
  Ta as OxModelEdit,
  _a as OxModelPanel,
  rt as OxPanel,
  $e as OxStateAlert,
  Ke as OxValidationBtn,
  ut as OxView
};
//# sourceMappingURL=components.js.map
