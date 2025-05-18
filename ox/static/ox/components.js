import { defineComponent as ae, inject as j, createElementBlock as I, createCommentVNode as h, unref as t, openBlock as m, Fragment as F, createBlock as g, withModifiers as q, useSlots as ce, renderSlot as b, normalizeProps as X, guardReactiveProps as Z, ref as W, shallowRef as ie, watch as ee, onMounted as Ie, computed as T, onScopeDispose as St, nextTick as Oe, watchEffect as $t, createVNode as u, mergeProps as H, reactive as Ce, onErrorCaptured as xt, withCtx as r, createTextVNode as B, toDisplayString as te, createElementVNode as re, createSlots as me, mergeModels as Ye, useModel as He, renderList as J, h as Ot, toRefs as Le, normalizeClass as Ct, useTemplateRef as Je, withKeys as Ee, onUnmounted as Pt, Teleport as Re, withDirectives as At, vShow as Tt } from "vue";
import { useAction as It, t as k, useAppContext as Lt, usePanels as Dt, filterValues as _t, useModelList as Bt, query as Ft, excludeValues as Mt, defineAsyncComponent as Et, tKeys as Rt, filterSlots as pe, useModelEditor as Ut, useModelPanel as Kt } from "ox";
import { V as U, a as de, u as Nt, b as jt, c as zt, d as Gt, e as Wt, f as Qe, g as Xe, m as qt, h as Yt, i as Ht, j as Jt, k as Qt, l as Xt, n as Ue, o as Zt, p as el, q as Ze, r as tl, s as ll, t as Ke, v as al, w as Pe, x as nl, y as sl, z as ol, A as et, B as il, C as rl, D as ul, E as dl, F as cl, G as be, H as Q, I as tt, J as we, K as vl, L as ml, M as pl, N as fl, O as yl, P as bl, Q as gl, R as kl, S as Vl, T as wl, U as Ne, W as hl, X as lt, Y as Sl, Z as $l, _ as xl, $ as at, a0 as Ol, a1 as Cl, a2 as Pl, a3 as Al, a4 as Tl, a5 as ke, a6 as Ae, a7 as Il, a8 as Ll, a9 as Dl, aa as je, ab as _l, ac as ze, ad as Bl } from "./VAlert-BZrwFrwh.js";
import { l as De, n as nt, u as Ve, o as Fl, q as Ml, r as El, s as st, t as Rl, v as Ul, w as Kl, j as Nl, x as jl, y as zl, z as Ge, A as We, B as Gl } from "./theme-ByO8YRYk.js";
import { z as Wl, t as ql, S as Yl, j as Hl, r as Jl } from "./auth-DxLJIxaq.js";
import { components as Ql } from "ox/vendor";
const _e = /* @__PURE__ */ ae({
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
  setup(e, { emit: c }) {
    const l = e, s = c, a = j("context"), { run: p, processing: o, allowed: d } = It({ user: a.user, emits: s, props: l });
    return (n, y) => t(d) ? (m(), I(F, { key: 0 }, [
      l.button ? (m(), g(U, {
        key: 0,
        variant: "text",
        disabled: t(o),
        color: l.color,
        icon: l.icon,
        title: l.title,
        "aria-label": l.title,
        onClick: q(t(p), ["stop"])
      }, null, 8, ["disabled", "color", "icon", "title", "aria-label", "onClick"])) : (m(), g(de, {
        key: 1,
        title: l.title,
        "base-color": l.color,
        "prepend-icon": l.icon,
        disabled: t(o),
        onClick: q(t(p), ["stop"])
      }, null, 8, ["title", "base-color", "prepend-icon", "disabled", "onClick"]))
    ], 64)) : h("", !0);
  }
}), Xl = /* @__PURE__ */ ae({
  __name: "OxActionModelDelete",
  props: {
    item: {},
    button: { type: Boolean }
  },
  setup(e) {
    const c = j("panel"), l = j("repos"), s = e;
    async function a(p, o) {
      return await l[o.constructor.entity].api().delete(o.$url(), { delete: s.item.id });
    }
    return (p, o) => (m(), g(_e, {
      item: s.item,
      button: s.button,
      icon: "mdi-delete",
      color: "error",
      title: t(k)("actions.delete"),
      confirm: t(k)("actions.delete.confirm"),
      permissions: ["delete", (d, n) => n.id],
      run: a,
      onCompleted: o[0] || (o[0] = (d) => {
        var n;
        return (n = t(c)) == null ? void 0 : n.show({ view: t(c).index });
      })
    }, null, 8, ["item", "button", "title", "confirm", "permissions"]));
  }
}), Zl = {
  __name: "OxActions",
  props: {
    // Action's Props
    value: Object,
    dense: { type: Boolean, default: !1 },
    button: { type: Boolean, default: !1 },
    exclude: { type: Array }
  },
  setup(e) {
    ce();
    const c = e;
    return (l, s) => (m(), I(F, null, [
      b(l.$slots, "before", X(Z(c))),
      b(l.$slots, "default", X(Z(c))),
      b(l.$slots, "after", X(Z(c)))
    ], 64));
  }
};
function ea(e) {
  const c = ie(e());
  let l = -1;
  function s() {
    clearInterval(l);
  }
  function a() {
    s(), Oe(() => c.value = e());
  }
  function p(o) {
    const d = o ? getComputedStyle(o) : {
      transitionDuration: 0.2
    }, n = parseFloat(d.transitionDuration) * 1e3 || 200;
    if (s(), c.value <= 0) return;
    const y = performance.now();
    l = window.setInterval(() => {
      const i = performance.now() - y + n;
      c.value = Math.max(e() - i, 0), c.value <= 0 && s();
    }, n);
  }
  return St(s), {
    clear: s,
    time: c,
    start: p,
    reset: a
  };
}
const ta = nt({
  multiLine: Boolean,
  text: String,
  timer: [Boolean, String],
  timeout: {
    type: [Number, String],
    default: 5e3
  },
  vertical: Boolean,
  ...Jt({
    location: "bottom"
  }),
  ...Ht(),
  ...Yt(),
  ...qt(),
  ...Rl(),
  ...st(Qt({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
}, "VSnackbar"), la = De()({
  name: "VSnackbar",
  props: ta(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, c) {
    let {
      slots: l
    } = c;
    const s = Ve(e, "modelValue"), {
      positionClasses: a
    } = Nt(e), {
      scopeId: p
    } = jt(), {
      themeClasses: o
    } = Fl(e), {
      colorClasses: d,
      colorStyles: n,
      variantClasses: y
    } = zt(e), {
      roundedClasses: i
    } = Gt(e), f = ea(() => Number(e.timeout)), w = W(), O = W(), z = ie(!1), G = ie(0), P = W(), S = j(Wt, void 0);
    Ml(() => !!S, () => {
      const E = Xt();
      $t(() => {
        P.value = E.mainStyles.value;
      });
    }), ee(s, C), ee(() => e.timeout, C), Ie(() => {
      s.value && C();
    });
    let le = -1;
    function C() {
      f.reset(), window.clearTimeout(le);
      const E = Number(e.timeout);
      if (!s.value || E === -1) return;
      const oe = El(O.value);
      f.start(oe), le = window.setTimeout(() => {
        s.value = !1;
      }, E);
    }
    function x() {
      f.reset(), window.clearTimeout(le);
    }
    function M() {
      z.value = !0, x();
    }
    function L() {
      z.value = !1, C();
    }
    function ue(E) {
      G.value = E.touches[0].clientY;
    }
    function se(E) {
      Math.abs(G.value - E.changedTouches[0].clientY) > 50 && (s.value = !1);
    }
    function Se() {
      z.value && L();
    }
    const fe = T(() => e.location.split(" ").reduce((E, oe) => (E[`v-snackbar--${oe}`] = !0, E), {}));
    return Qe(() => {
      const E = Ue.filterProps(e), oe = !!(l.default || l.text || e.text);
      return u(Ue, H({
        ref: w,
        class: ["v-snackbar", {
          "v-snackbar--active": s.value,
          "v-snackbar--multi-line": e.multiLine && !e.vertical,
          "v-snackbar--timer": !!e.timer,
          "v-snackbar--vertical": e.vertical
        }, fe.value, a.value, e.class],
        style: [P.value, e.style]
      }, E, {
        modelValue: s.value,
        "onUpdate:modelValue": (A) => s.value = A,
        contentProps: H({
          class: ["v-snackbar__wrapper", o.value, d.value, i.value, y.value],
          style: [n.value],
          onPointerenter: M,
          onPointerleave: L
        }, E.contentProps),
        persistent: !0,
        noClickAnimation: !0,
        scrim: !1,
        scrollStrategy: "none",
        _disableGlobalStack: !0,
        onTouchstartPassive: ue,
        onTouchend: se,
        onAfterLeave: Se
      }, p), {
        default: () => {
          var A, ye;
          return [Zt(!1, "v-snackbar"), e.timer && !z.value && u("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [u(el, {
            ref: O,
            color: typeof e.timer == "string" ? e.timer : "info",
            max: e.timeout,
            "model-value": f.time.value
          }, null)]), oe && u("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((A = l.text) == null ? void 0 : A.call(l)) ?? e.text, (ye = l.default) == null ? void 0 : ye.call(l)]), l.actions && u(Ze, {
            defaults: {
              VBtn: {
                variant: "text",
                ripple: !1,
                slim: !0
              }
            }
          }, {
            default: () => [u("div", {
              class: "v-snackbar__actions"
            }, [l.actions({
              isActive: s
            })])]
          })];
        },
        activator: l.activator
      });
    }), Xe({}, w);
  }
}), aa = { class: "nav-home" };
var qe;
const na = /* @__PURE__ */ ae({
  __name: "OxApp",
  props: {
    apiUrl: {},
    logo: {},
    dataEl: { default: (qe = document.body.dataset) == null ? void 0 : qe.appData },
    models: {},
    data: {}
  },
  setup(e) {
    const c = ce(), l = e, s = Ce({ drawer: !0 }), a = Lt(l), p = Dt();
    return Ie(() => {
      p.panel = a.data.panel;
    }), ee(() => [a.state.state, a.state.data], () => {
      a.showState = !0;
    }), xt((o, d, n) => {
      a.state.error(`${o}`);
    }), (o, d) => (m(), g(tl, null, {
      default: r(() => [
        u(la, {
          modelValue: t(a).showState,
          "onUpdate:modelValue": d[0] || (d[0] = (n) => t(a).showState = n),
          color: t(a).state.color,
          "multi-line": ""
        }, {
          default: r(() => [
            B(te(t(a).state.data), 1)
          ]),
          _: 1
        }, 8, ["modelValue", "color"]),
        u(ll, { color: "primary" }, {
          prepend: r(() => [
            u(Pe, {
              icon: "mdi-apps",
              title: t(k)("nav.panels"),
              "aria-label": t(k)("nav.panels"),
              onClick: d[1] || (d[1] = q((n) => s.drawer = !s.drawer, ["stop"]))
            }, null, 8, ["title", "aria-label"]),
            t(c)["app-nav"] && !s.drawer2 ? (m(), g(Pe, {
              key: 0,
              icon: "mdi-menu",
              onClick: d[2] || (d[2] = (n) => {
                s.drawer2 = !0, s.drawer = !1;
              })
            })) : h("", !0)
          ]),
          default: r(() => [
            u(Ke, { id: "app-bar-sheet-title" }),
            u(Ke, { id: "app-bar-title" }, {
              default: r(() => [
                b(o.$slots, "title", { context: t(a) })
              ]),
              _: 3
            }),
            u(al),
            b(o.$slots, "app-bar-left", { context: t(a) }),
            d[5] || (d[5] = re("div", {
              id: "app-bar-right",
              class: "mr-3"
            }, null, -1)),
            b(o.$slots, "app-bar-right", { context: t(a) })
          ]),
          _: 3
        }),
        u(nl, {
          theme: "dark",
          modelValue: s.drawer,
          "onUpdate:modelValue": d[3] || (d[3] = (n) => s.drawer = n)
        }, me({
          default: r(() => [
            re("a", aa, [
              o.logo ? (m(), g(sl, {
                key: 0,
                src: o.logo,
                class: "logo"
              }, null, 8, ["src"])) : h("", !0)
            ]),
            b(o.$slots, "nav-start", { context: t(a) }),
            b(o.$slots, "nav-list", { context: t(a) })
          ]),
          _: 2
        }, [
          t(c)["nav-end"] ? {
            name: "append",
            fn: r(() => [
              b(o.$slots, "nav-end", { context: t(a) })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue"]),
        u(ol, null, {
          default: r(() => [
            b(o.$slots, "main", {}, () => [
              u(et, {
                modelValue: t(p).panel,
                "onUpdate:modelValue": d[4] || (d[4] = (n) => t(p).panel = n)
              }, {
                default: r((n) => [
                  b(o.$slots, "default", H(n, { context: t(a) }))
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
}), sa = nt({
  autoSelectFirst: {
    type: [Boolean, String]
  },
  clearOnSelect: Boolean,
  search: String,
  ...kl({
    filterKeys: ["title"]
  }),
  ...gl(),
  ...st(Vl({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...bl({
    transition: !1
  })
}, "VAutocomplete"), oa = De()({
  name: "VAutocomplete",
  props: sa(),
  emits: {
    "update:focused": (e) => !0,
    "update:search": (e) => !0,
    "update:modelValue": (e) => !0,
    "update:menu": (e) => !0
  },
  setup(e, c) {
    let {
      slots: l
    } = c;
    const {
      t: s
    } = Ul(), a = W(), p = ie(!1), o = ie(!0), d = ie(!1), n = W(), y = W(), i = ie(-1), {
      items: f,
      transformIn: w,
      transformOut: O
    } = il(e), {
      textColorClasses: z,
      textColorStyles: G
    } = rl(() => {
      var v;
      return (v = a.value) == null ? void 0 : v.color;
    }), P = Ve(e, "search", ""), S = Ve(e, "modelValue", [], (v) => w(v === null ? [null] : Kl(v)), (v) => {
      const V = O(v);
      return e.multiple ? V : V[0] ?? null;
    }), le = T(() => typeof e.counterValue == "function" ? e.counterValue(S.value) : typeof e.counterValue == "number" ? e.counterValue : S.value.length), C = ul(e), {
      filteredItems: x,
      getMatches: M
    } = dl(e, f, () => o.value ? "" : P.value), L = T(() => e.hideSelected ? x.value.filter((v) => !S.value.some((V) => V.value === v.value)) : x.value), ue = T(() => !!(e.chips || l.chip)), se = T(() => ue.value || !!l.selection), Se = T(() => S.value.map((v) => v.props.value)), fe = T(() => {
      var V;
      return (e.autoSelectFirst === !0 || e.autoSelectFirst === "exact" && P.value === ((V = L.value[0]) == null ? void 0 : V.title)) && L.value.length > 0 && !o.value && !d.value;
    }), E = T(() => e.hideNoData && !L.value.length || C.isReadonly.value || C.isDisabled.value), oe = Ve(e, "menu"), A = T({
      get: () => oe.value,
      set: (v) => {
        var V;
        oe.value && !v && ((V = n.value) != null && V.ΨopenChildren.size) || v && E.value || (oe.value = v);
      }
    }), ye = T(() => A.value ? e.closeText : e.openText), $e = W(), dt = cl($e, a);
    function ct(v) {
      e.openOnClear && (A.value = !0), P.value = "";
    }
    function vt() {
      E.value || (A.value = !0);
    }
    function mt(v) {
      E.value || (p.value && (v.preventDefault(), v.stopPropagation()), A.value = !A.value);
    }
    function pt(v) {
      var V;
      v.key !== " " && Ge(v) && ((V = a.value) == null || V.focus());
    }
    function ft(v) {
      var $, R, Y, ne, D;
      if (C.isReadonly.value) return;
      const V = ($ = a.value) == null ? void 0 : $.selectionStart, _ = S.value.length;
      if (["Enter", "ArrowDown", "ArrowUp"].includes(v.key) && v.preventDefault(), ["Enter", "ArrowDown"].includes(v.key) && (A.value = !0), ["Escape"].includes(v.key) && (A.value = !1), fe.value && ["Enter", "Tab"].includes(v.key) && !S.value.some((N) => {
        let {
          value: K
        } = N;
        return K === L.value[0].value;
      }) && ve(L.value[0]), v.key === "ArrowDown" && fe.value && ((R = $e.value) == null || R.focus("next")), ["Backspace", "Delete"].includes(v.key)) {
        if (!e.multiple && se.value && S.value.length > 0 && !P.value) return ve(S.value[0], !1);
        if (~i.value) {
          v.preventDefault();
          const N = i.value;
          ve(S.value[i.value], !1), i.value = N >= _ - 1 ? _ - 2 : N;
        } else v.key === "Backspace" && !P.value && (i.value = _ - 1);
        return;
      }
      if (e.multiple)
        if (v.key === "ArrowLeft") {
          if (i.value < 0 && V && V > 0) return;
          const N = i.value > -1 ? i.value - 1 : _ - 1;
          if (S.value[N])
            i.value = N;
          else {
            const K = ((Y = P.value) == null ? void 0 : Y.length) ?? null;
            i.value = -1, (ne = a.value) == null || ne.setSelectionRange(K, K);
          }
        } else if (v.key === "ArrowRight") {
          if (i.value < 0) return;
          const N = i.value + 1;
          S.value[N] ? i.value = N : (i.value = -1, (D = a.value) == null || D.setSelectionRange(0, 0));
        } else ~i.value && Ge(v) && (i.value = -1);
    }
    function yt(v) {
      if (We(a.value, ":autofill") || We(a.value, ":-webkit-autofill")) {
        const V = f.value.find((_) => _.title === v.target.value);
        V && ve(V);
      }
    }
    function bt() {
      var v;
      e.eager && ((v = y.value) == null || v.calculateVisibleItems());
    }
    function gt() {
      var v;
      p.value && (o.value = !0, (v = a.value) == null || v.focus());
    }
    function kt(v) {
      p.value = !0, setTimeout(() => {
        d.value = !0;
      });
    }
    function Vt(v) {
      d.value = !1;
    }
    function wt(v) {
      (v == null || v === "" && !e.multiple && !se.value) && (S.value = []);
    }
    const xe = ie(!1);
    function ve(v) {
      let V = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!(!v || v.props.disabled))
        if (e.multiple) {
          const _ = S.value.findIndex((R) => (e.valueComparator || Gl)(R.value, v.value)), $ = V ?? !~_;
          if (~_) {
            const R = $ ? [...S.value, v] : [...S.value];
            R.splice(_, 1), S.value = R;
          } else $ && (S.value = [...S.value, v]);
          e.clearOnSelect && (P.value = "");
        } else {
          const _ = V !== !1;
          S.value = _ ? [v] : [], P.value = _ && !se.value ? v.title : "", Oe(() => {
            A.value = !1, o.value = !0;
          });
        }
    }
    return ee(p, (v, V) => {
      var _;
      v !== V && (v ? (xe.value = !0, P.value = e.multiple || se.value ? "" : String(((_ = S.value.at(-1)) == null ? void 0 : _.props.title) ?? ""), o.value = !0, Oe(() => xe.value = !1)) : (!e.multiple && P.value == null && (S.value = []), A.value = !1, (e.multiple || se.value) && (P.value = ""), i.value = -1));
    }), ee(P, (v) => {
      !p.value || xe.value || (v && (A.value = !0), o.value = !v);
    }), ee(A, () => {
      if (!e.hideSelected && A.value && S.value.length) {
        const v = L.value.findIndex((V) => S.value.some((_) => V.value === _.value));
        Nl && window.requestAnimationFrame(() => {
          var V;
          v >= 0 && ((V = y.value) == null || V.scrollToIndex(v));
        });
      }
    }), ee(() => e.items, (v, V) => {
      A.value || p.value && !V.length && v.length && (A.value = !0);
    }), ee(S, (v) => {
      var V;
      !e.multiple && !se.value && (P.value = ((V = v[0]) == null ? void 0 : V.title) ?? "");
    }), Qe(() => {
      const v = !!(!e.hideNoData || L.value.length || l["prepend-item"] || l["append-item"] || l["no-data"]), V = S.value.length > 0, _ = be.filterProps(e);
      return u(be, H({
        ref: a
      }, _, {
        modelValue: P.value,
        "onUpdate:modelValue": [($) => P.value = $, wt],
        focused: p.value,
        "onUpdate:focused": ($) => p.value = $,
        validationValue: S.externalValue,
        counterValue: le.value,
        dirty: V,
        onChange: yt,
        class: ["v-autocomplete", `v-autocomplete--${e.multiple ? "multiple" : "single"}`, {
          "v-autocomplete--active-menu": A.value,
          "v-autocomplete--chips": !!e.chips,
          "v-autocomplete--selection-slot": !!se.value,
          "v-autocomplete--selecting-index": i.value > -1
        }, e.class],
        style: e.style,
        readonly: C.isReadonly.value,
        placeholder: V ? void 0 : e.placeholder,
        "onClick:clear": ct,
        "onMousedown:control": vt,
        onKeydown: ft
      }), {
        ...l,
        default: () => u(F, null, [u(tt, H({
          ref: n,
          modelValue: A.value,
          "onUpdate:modelValue": ($) => A.value = $,
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
          default: () => [v && u(we, H({
            ref: $e,
            selected: Se.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: ($) => $.preventDefault(),
            onKeydown: pt,
            onFocusin: kt,
            onFocusout: Vt,
            tabindex: "-1",
            "aria-live": "polite",
            color: e.itemColor ?? e.color
          }, dt, e.listProps), {
            default: () => {
              var $, R, Y;
              return [($ = l["prepend-item"]) == null ? void 0 : $.call(l), !L.value.length && !e.hideNoData && (((R = l["no-data"]) == null ? void 0 : R.call(l)) ?? u(de, {
                key: "no-data",
                title: s(e.noDataText)
              }, null)), u(vl, {
                ref: y,
                renderless: !0,
                items: L.value,
                itemKey: "value"
              }, {
                default: (ne) => {
                  var Me;
                  let {
                    item: D,
                    index: N,
                    itemRef: K
                  } = ne;
                  const Fe = H(D.props, {
                    ref: K,
                    key: D.value,
                    active: fe.value && N === 0 ? !0 : void 0,
                    onClick: () => ve(D, null)
                  });
                  return ((Me = l.item) == null ? void 0 : Me.call(l, {
                    item: D,
                    index: N,
                    props: Fe
                  })) ?? u(de, H(Fe, {
                    role: "option"
                  }), {
                    prepend: (ge) => {
                      let {
                        isSelected: ht
                      } = ge;
                      return u(F, null, [e.multiple && !e.hideSelected ? u(pl, {
                        key: D.value,
                        modelValue: ht,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, D.props.prependAvatar && u(fl, {
                        image: D.props.prependAvatar
                      }, null), D.props.prependIcon && u(Q, {
                        icon: D.props.prependIcon
                      }, null)]);
                    },
                    title: () => {
                      var ge;
                      return o.value ? D.title : ml("v-autocomplete", D.title, (ge = M(D)) == null ? void 0 : ge.title);
                    }
                  });
                }
              }), (Y = l["append-item"]) == null ? void 0 : Y.call(l)];
            }
          })]
        }), S.value.map(($, R) => {
          function Y(K) {
            K.stopPropagation(), K.preventDefault(), ve($, !1);
          }
          const ne = {
            "onClick:close": Y,
            onKeydown(K) {
              K.key !== "Enter" && K.key !== " " || (K.preventDefault(), K.stopPropagation(), Y(K));
            },
            onMousedown(K) {
              K.preventDefault(), K.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, D = ue.value ? !!l.chip : !!l.selection, N = D ? zl(ue.value ? l.chip({
            item: $,
            index: R,
            props: ne
          }) : l.selection({
            item: $,
            index: R
          })) : void 0;
          if (!(D && !N))
            return u("div", {
              key: $.value,
              class: ["v-autocomplete__selection", R === i.value && ["v-autocomplete__selection--selected", z.value]],
              style: R === i.value ? G.value : {}
            }, [ue.value ? l.chip ? u(Ze, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: e.closableChips,
                  size: "small",
                  text: $.title
                }
              }
            }, {
              default: () => [N]
            }) : u(yl, H({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: $.title,
              disabled: $.props.disabled
            }, ne), null) : N ?? u("span", {
              class: "v-autocomplete__selection-text"
            }, [$.title, e.multiple && R < S.value.length - 1 && u("span", {
              class: "v-autocomplete__selection-comma"
            }, [B(",")])])]);
        })]),
        "append-inner": function() {
          var ne, D;
          for (var $ = arguments.length, R = new Array($), Y = 0; Y < $; Y++)
            R[Y] = arguments[Y];
          return u(F, null, [(ne = l["append-inner"]) == null ? void 0 : ne.call(l, ...R), e.menuIcon ? u(Q, {
            class: "v-autocomplete__menu-icon",
            color: (D = a.value) == null ? void 0 : D.fieldIconColor,
            icon: e.menuIcon,
            onMousedown: mt,
            onClick: jl,
            "aria-label": s(ye.value),
            title: s(ye.value),
            tabindex: "-1"
          }, null) : void 0]);
        }
      });
    }), Xe({
      isFocused: p,
      isPristine: o,
      menu: A,
      search: P,
      filteredItems: x,
      select: ve
    }, a);
  }
}), ia = /* @__PURE__ */ ae({
  __name: "OxAutocomplete",
  props: /* @__PURE__ */ Ye({
    repo: {},
    lookup: { default: "search" },
    label: {},
    name: {},
    multiple: { type: Boolean },
    hideDetails: { type: Boolean },
    density: {},
    itemTitle: {},
    itemValue: {},
    filters: {},
    prevKey: {},
    nextKey: {},
    countKey: {},
    dataKey: {},
    query: {},
    relations: {},
    url: {},
    fetchRelations: { type: Boolean }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    console.log("SETUP");
    const c = ce(), l = He(e, "modelValue"), s = W(""), a = e, p = j("repos"), o = ["label", "name", "multiple", "hideDetails", "density", "itemTitle", "itemValue"], d = T(() => _t(a, o)), { list: n, items: y } = Bt({
      ...Mt(a, ["repo", "search", ...o]),
      filters: a.filters || {},
      query: Ft(a.repo, p)
    });
    return n.load(), ee(s, (i) => {
      const f = n.filters[a.lookup];
      n.nextUrl, i && i != "<empty string>" && i != f && (!f || !f.startsWith(i) || !n.nextUrl) && (n.filters[a.lookup] = i, n.load().then((z) => {
        s.value = i;
      }));
    }), (i, f) => (m(), I(F, null, [
      B(te(t(c)) + " ", 1),
      u(oa, H(d.value, {
        items: t(y),
        modelValue: l.value,
        "onUpdate:modelValue": f[0] || (f[0] = (w) => l.value = w),
        search: s.value,
        "onUpdate:search": f[1] || (f[1] = (w) => s.value = w)
      }), me({ _: 2 }, [
        J(t(c), (w) => ({
          name: w,
          fn: r((O) => [
            b(i.$slots, w, X(Z(O)))
          ])
        }))
      ]), 1040, ["items", "modelValue", "search"])
    ], 64));
  }
}), ra = {
  props: {
    src: String,
    is: String
  },
  setup(e) {
    const c = ie(null), l = T(() => {
      if (e.is)
        return e.is;
      let a = e.src.substring(e.src.lastIndexOf("/") + 1);
      if (a && (a = a.substring(0, a.indexOf("."))), !a)
        throw Error(
          "`is` not provided and could not be deducted from `src`."
        );
      return a;
    });
    function s() {
      c.value = Et(e.src, l.value);
    }
    return ee(() => e.src, s), s(), () => Ot(c.value, e);
  }
}, ua = { class: "text-error" }, Te = {
  __name: "OxFieldDetails",
  props: {
    state: Object,
    errors: Array
  },
  setup(e) {
    const c = e;
    return (l, s) => c.errors ? (m(!0), I(F, { key: 0 }, J(c.errors, (a) => (m(), I("div", ua, [
      u(Q, { icon: "mdi-alert-circle-outline" }),
      B(" " + te(a), 1)
    ]))), 256)) : h("", !0);
  }
}, ot = {
  __name: "OxListFilters",
  props: {
    search: String
  },
  setup(e, { expose: c }) {
    const l = j("list"), s = e, a = T(() => {
      const d = l.filters;
      return d && Object.entries(d).some(
        ([n, y]) => !n.startsWith("page") && !n.startsWith("ordering") && !!y
      );
    }), p = T(() => a.value ? "mdi-filter-check" : "mdi-filter-outline");
    function o() {
      l.filters = {}, l.load();
    }
    return ee(() => Object.values(l.filters), () => l.load()), c({ icon: p, hasFilters: a, reset: o }), (d, n) => (m(), I("form", {
      onSubmit: n[2] || (n[2] = q((y) => t(l).load(), ["prevent"])),
      class: "width-full"
    }, [
      u(wl, {
        dense: "",
        color: "transparent"
      }, {
        default: r(() => [
          u(Pe, {
            icon: p.value,
            readonly: ""
          }, null, 8, ["icon"]),
          s.search && t(l).filters ? (m(), g(be, {
            key: 0,
            label: t(k)("filters.search"),
            density: "compact",
            class: "ml-2",
            modelValue: t(l).filters[s.search],
            "onUpdate:modelValue": n[0] || (n[0] = (y) => t(l).filters[s.search] = y),
            "hide-details": ""
          }, null, 8, ["label", "modelValue"])) : h("", !0),
          b(d.$slots, "default", {
            list: t(l),
            filters: t(l).filters
          }),
          u(U, {
            onClick: n[1] || (n[1] = q((y) => t(l).load(), ["stop"])),
            class: "ml-2",
            icon: "mdi-check",
            "aria-label": d.$t("filters.apply"),
            title: t(k)("filters.apply")
          }, null, 8, ["aria-label", "title"]),
          a.value ? (m(), g(U, {
            key: 1,
            onClick: q(o, ["stop"]),
            icon: "mdi-backspace",
            "aria-label": t(k)("filters.reset"),
            title: t(k)("filters.reset")
          }, null, 8, ["aria-label", "title"])) : h("", !0)
        ]),
        _: 3
      })
    ], 32));
  }
}, da = { class: "flex-row justify-right" }, ca = /* @__PURE__ */ ae({
  __name: "OxFormList",
  props: /* @__PURE__ */ Ye({
    /** Allow to add and edit items */
    editable: { type: Boolean, default: !0 }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    var n;
    const c = He(e, "modelValue"), l = W({}), s = e, { editable: a } = Le(s), p = W([]);
    (n = c.value) != null && n.length || p.value.push(-1);
    function o() {
      c.value.push(l.value), l.value = {};
    }
    function d(y) {
      confirm(k("actions.delete.confirm")) && s.editable && c.value.splice(y);
    }
    return (y, i) => (m(), g(we, {
      opened: p.value,
      "onUpdate:opened": i[3] || (i[3] = (f) => p.value = f)
    }, {
      default: r(() => [
        (m(!0), I(F, null, J(c.value, (f, w) => (m(), g(Ne, {
          key: w,
          value: w
        }, {
          activator: r(({ props: O }) => [
            u(de, H({ ref_for: !0 }, O), {
              append: r(() => [
                re("div", {
                  onClick: i[0] || (i[0] = q(() => {
                  }, ["stop"]))
                }, [
                  b(y.$slots, "item.actions", {
                    item: f,
                    index: w,
                    editable: t(a)
                  }),
                  t(a) ? (m(), g(U, {
                    key: 0,
                    type: "button",
                    class: "ml-2",
                    size: "small",
                    onClick: q((z) => d(w), ["stop", "prevent"]),
                    color: "error",
                    "aria-label": t(k)("actions.remove"),
                    title: t(k)("actions.remove"),
                    icon: "mdi-delete"
                  }, null, 8, ["onClick", "aria-label", "title"])) : h("", !0)
                ])
              ]),
              default: r(() => [
                u(hl, null, {
                  default: r(() => [
                    b(y.$slots, "item.title", { item: f })
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 2
            }, 1040)
          ]),
          default: r(() => [
            b(y.$slots, "item", {
              item: f,
              index: w
            })
          ]),
          _: 2
        }, 1032, ["value"]))), 128)),
        c.value.length ? (m(), g(lt, { key: 0 })) : h("", !0),
        t(a) ? (m(), g(Ne, {
          key: 1,
          value: -1
        }, {
          activator: r(({ props: f }) => [
            u(de, H(f, {
              title: t(k)("actions.add_item"),
              "prepend-icon": "mdi-plus"
            }), null, 16, ["title"])
          ]),
          default: r(() => [
            b(y.$slots, "item", {
              item: l.value,
              edit: !0
            }),
            l.value ? (m(), g(de, { key: 0 }, {
              default: r(() => [
                re("div", da, [
                  l.value ? (m(), g(U, {
                    key: 0,
                    size: "small",
                    onClick: i[1] || (i[1] = (f) => l.value = {}),
                    color: "secondary",
                    "prepend-icon": "mdi-backspace",
                    "aria-label": t(k)("actions.discard")
                  }, {
                    default: r(() => [
                      B(te(t(k)("actions.discard")), 1)
                    ]),
                    _: 1
                  }, 8, ["aria-label"])) : h("", !0),
                  l.value ? (m(), g(U, {
                    key: 1,
                    size: "small",
                    onClick: i[2] || (i[2] = (f) => o()),
                    color: "primary",
                    "prepend-icon": "mdi-plus",
                    "aria-label": t(k)("actions.add")
                  }, {
                    default: r(() => [
                      B(te(t(k)("actions.add")), 1)
                    ]),
                    _: 1
                  }, 8, ["aria-label"])) : h("", !0)
                ])
              ]),
              _: 1
            })) : h("", !0)
          ]),
          _: 3
        })) : h("", !0)
      ]),
      _: 3
    }, 8, ["opened"]));
  }
}), va = De()({
  name: "VSlideGroupItem",
  props: Sl(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, c) {
    let {
      slots: l
    } = c;
    const s = $l(e, xl);
    return () => {
      var a;
      return (a = l.default) == null ? void 0 : a.call(l, {
        isSelected: s.isSelected.value,
        select: s.select,
        toggle: s.toggle,
        selectedClass: s.selectedClass.value
      });
    };
  }
}), ma = {
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
  setup(e, { emit: c }) {
    const l = c;
    j("list");
    const s = j("items"), a = e;
    function p(n) {
      return n = n % a.colors.length, a.colorVariant ? a.colors[n] + "-" + a.colorVariant : a.colors[n];
    }
    function o(n, y, i) {
      n[i] ? !n[i].includes(y) && n[i].push(y) : n[i] = [y];
    }
    const d = T(() => {
      const n = {};
      if (s.value)
        for (var y of s.value) {
          const f = y[a.field];
          if (Array.isArray(f))
            if (f.length)
              for (var i of f)
                o(n, y, i);
            else
              o(n, y, null);
          else
            o(n, y, f);
        }
      return n;
    });
    return (n, y) => (m(), g(at, null, {
      default: r(() => [
        u(Ol, null, {
          default: r(() => [
            (m(!0), I(F, null, J(a.headers, (i, f) => (m(), g(va, {
              key: i.value
            }, {
              default: r(({ selectedClass: w }) => [
                u(Cl, {
                  width: "400",
                  class: Ct(["ma-3", w]),
                  color: p(f),
                  lines: "two"
                }, {
                  default: r(() => [
                    u(Pl, null, {
                      default: r(() => [
                        B(te(i.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    u(we, {
                      "bg-color": p(f)
                    }, {
                      default: r(() => [
                        d.value && d.value[i.value] ? (m(!0), I(F, { key: 0 }, J(d.value[i.value], (O) => b(n.$slots, "item", {
                          key: O.id,
                          header: i,
                          item: O
                        }, () => [
                          u(de, {
                            title: O[a.itemTitle],
                            value: a.itemValue && O[a.itemValue],
                            onClick: (z) => l("click", O)
                          }, {
                            append: r(() => [
                              b(n.$slots, "item.action")
                            ]),
                            _: 2
                          }, 1032, ["title", "value", "onClick"])
                        ])), 128)) : h("", !0)
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
    const c = ce(), l = Wl(c, "item.", { exclude: ["item.actions"] }), s = j("panel"), a = j("list"), p = j("items"), o = ["change"], d = e, n = T(() => d.headers.reduce((f, w) => (f.push(
      typeof w == "string" ? { key: w, title: k(Rt.field(w)) } : w
    ), f), []));
    function y(f) {
      a.filters.page = f.page, a.filters.page_size = f.itemsPerPage, a.filters.ordering = f.sortBy.map(({ key: w, order: O }) => O == "asc" ? w : `-${w}`);
    }
    function i(f, w) {
      s.show({ view: "detail.edit", value: w });
    }
    return (f, w) => {
      var O;
      return m(), g(Al, {
        items: t(p),
        "item-index": "id",
        "items-length": t(a).count || t(p).length,
        "items-per-page": d.itemsPerPage,
        loading: (O = t(a).state) == null ? void 0 : O.isProcessing,
        headers: n.value,
        class: "align-top-table",
        "onUpdate:options": y
      }, me({
        loading: r(() => [
          u(Tl, { type: "table-row@10" })
        ]),
        "item.actions": r(({ item: z }) => [
          e.edit ? (m(), g(_e, {
            key: 0,
            icon: "mdi-pencil",
            button: "",
            title: t(k)("actions.edit"),
            permissions: o,
            item: z,
            run: i
          }, null, 8, ["title", "item"])) : h("", !0),
          b(f.$slots, "item.actions", {
            value: z,
            dense: !0,
            button: !0
          })
        ]),
        _: 2
      }, [
        J(t(l), (z, G) => ({
          name: G,
          fn: r((P) => [
            b(f.$slots, G, X(Z(P)))
          ])
        }))
      ]), 1032, ["items", "items-length", "items-per-page", "loading", "headers"]);
    };
  }
}), he = {
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
    const c = ce(), l = e;
    let s = W(!1);
    ee(() => l.state.state, (o) => {
      l.delay && o == ql.PROCESSING && (s.value = !1, window.setTimeout(() => {
        s.value = !0;
      }, 5e3));
    });
    const a = T(() => {
      var o;
      return ((o = l.state) == null ? void 0 : o.isProcessing) && (!l.delay || s.value);
    }), p = T(() => {
      var o, d;
      return (d = (o = l.state) == null ? void 0 : o.data) == null ? void 0 : d.messages;
    });
    return (o, d) => (m(), I(F, null, [
      l.state.isNone && t(c).none ? (m(), g(t(ke), {
        key: 0,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        state: e.state,
        title: e.noneTitle
      }, {
        default: r(() => [
          b(o.$slots, "none", { state: e.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : a.value ? (m(), g(t(ke), {
        key: 1,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: e.state,
        title: e.processingTitle
      }, {
        default: r(() => [
          b(o.$slots, "processing", { state: e.state }, () => [
            d[0] || (d[0] = B(" Data are being sent to server, please be patient. If this message persist you might wan't to retry. "))
          ])
        ]),
        _: 3
      }, 8, ["state", "title"])) : l.state.isError ? (m(), g(t(ke), {
        key: 2,
        type: "error",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: e.state,
        title: e.errorTitle
      }, {
        default: r(() => [
          b(o.$slots, "error", { state: e.state }, () => [
            d[1] || (d[1] = B(" Oups... something wrong happened. "))
          ]),
          b(o.$slots, "error-detail", { state: e.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : l.state.isOk ? (m(), g(t(ke), {
        key: 3,
        type: "success",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: e.state,
        title: e.okTitle
      }, {
        default: r(() => [
          b(o.$slots, "ok", { state: e.state }, () => [
            d[2] || (d[2] = re("p", null, "Congrats! Data have been updated.", -1))
          ]),
          p.value ? (m(), I(F, { key: 0 }, [
            u(lt),
            (m(!0), I(F, null, J(p.value, (n) => (m(), I("p", null, te(n), 1))), 256))
          ], 64)) : h("", !0),
          b(o.$slots, "ok-detail", { state: e.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : h("", !0),
      b(o.$slots, "default", {
        state: l.state
      })
    ], 64));
  }
}, pa = { class: "text-right" }, Be = {
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
  setup(e, { emit: c }) {
    const l = c, s = e;
    return (a, p) => (m(), I("div", pa, [
      u(t(U), {
        color: "error",
        class: "me-2",
        "prepend-icon": s.resetIcon,
        onClick: p[0] || (p[0] = (o) => l("reset")),
        disabled: s.disabled
      }, {
        default: r(() => [
          b(a.$slots, "reset", {}, () => [
            B(te(s.resetLabel), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]),
      s.state.isSending ? (m(), g(t(U), {
        key: 0,
        color: "primary",
        "prepend-icon": "mdi-content-save",
        disabled: ""
      }, {
        default: r(() => p[2] || (p[2] = [
          B(" Saving ")
        ])),
        _: 1
      })) : (m(), g(t(U), {
        key: 1,
        color: "primary",
        "prepend-icon": s.validateIcon,
        onClick: p[1] || (p[1] = (o) => l("validate")),
        disabled: s.disabled || s.validateDisabled
      }, {
        default: r(() => [
          b(a.$slots, "validate", {}, () => [
            B(te(s.validateLabel), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]))
    ]));
  }
}, fa = { key: 0 }, ya = { class: "text-right mt-3" }, ba = {
  __name: "OxLogin",
  props: {
    next: { type: String },
    url: { type: String }
  },
  emits: ["save", "saved"],
  setup(e, { emit: c }) {
    const l = Je("password"), s = e, a = Ce({
      username: "",
      password: ""
    }), p = W(!1), o = Ce(new Yl());
    function d(y = !0) {
      Jl(a, { username: "", password: "" }), y && o.none();
    }
    async function n() {
      o.processing();
      try {
        const y = await fetch(s.url, {
          method: "POST",
          headers: Hl.axiosConfig.headers,
          body: JSON.stringify(a)
        });
        y.status == 200 ? (a.credentials = "", a.password = "", o.ok(await y.json()), s.next && (window.location.href = s.next)) : o.error(await y.json());
      } catch (y) {
        o.ok((y == null ? void 0 : y.message) || y);
      }
    }
    return (y, i) => (m(), I(F, null, [
      u(t(he), { state: o }, {
        none: r(({ state: f }) => i[7] || (i[7] = [
          re("p", null, "Please enter your credentials in order too proceed...", -1)
        ])),
        "ok-detail": r(({ state: f }) => [
          s.next ? (m(), I("p", fa, [
            i[8] || (i[8] = B("You soon will be redirected to ")),
            re("i", null, te(s.next), 1)
          ])) : h("", !0)
        ]),
        error: r(({ state: f }) => {
          var w, O;
          return [
            u(Te, {
              errors: (w = f.data) == null ? void 0 : w.username
            }, null, 8, ["errors"]),
            u(Te, {
              errors: (O = f.data) == null ? void 0 : O.password
            }, null, 8, ["errors"])
          ];
        }),
        _: 1
      }, 8, ["state"]),
      o.isOk ? h("", !0) : (m(), I(F, { key: 0 }, [
        u(be, {
          variant: "underlined",
          label: "Enter login",
          modelValue: a.username,
          "onUpdate:modelValue": i[0] || (i[0] = (f) => a.username = f),
          onKeyup: i[1] || (i[1] = Ee(q((f) => t(l).focus(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue"]),
        u(be, {
          variant: "underlined",
          ref: "password",
          label: "Enter password",
          modelValue: a.password,
          "onUpdate:modelValue": i[2] || (i[2] = (f) => a.password = f),
          type: p.value ? "text" : "password",
          "append-icon": p.value ? "mdi-eye" : "mdi-eye-off",
          "onClick:append": i[3] || (i[3] = (f) => p.value = !p.value),
          onKeyup: i[4] || (i[4] = Ee(q((f) => n(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue", "type", "append-icon"]),
        re("div", ya, [
          b(y.$slots, "default", {
            value: a.password
          }, () => [
            a.username && a.password ? (m(), g(Be, {
              key: 0,
              "validate-label": "Login!",
              onValidate: i[5] || (i[5] = (f) => n()),
              onReset: i[6] || (i[6] = (f) => d()),
              state: o
            }, null, 8, ["state"])) : h("", !0)
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
    const c = ce(), l = e, s = pe(c, "views."), a = W(!1);
    Ie(() => {
      a.value = !0;
    }), Pt(() => {
      a.value = !1;
    });
    const p = j("panels"), o = j("panel");
    return (d, n) => (m(), g(Ae, {
      value: l.name
    }, {
      default: r(() => [
        l.state ? (m(), g(he, {
          key: 0,
          state: l.state,
          delay: ""
        }, null, 8, ["state"])) : h("", !0),
        u(at, { class: "ma-4" }, {
          default: r(() => [
            (m(), g(Re, {
              to: "#app-bar-sheet-title",
              disabled: !a.value || t(p).panel != l.name
            }, [
              l.icon ? (m(), g(Q, {
                key: 0,
                icon: l.icon
              }, null, 8, ["icon"])) : h("", !0),
              B(" " + te(l.title), 1)
            ], 8, ["disabled"])),
            (m(), g(Re, {
              to: "#app-bar-right",
              disabled: !a.value || t(p).panel != l.name
            }, [
              b(d.$slots, "append-title"),
              l.help ? (m(), g(U, {
                key: 0,
                class: "ml-3",
                href: l.help,
                panels: "new",
                icon: "mdi-information-outline"
              }, null, 8, ["href"])) : h("", !0)
            ], 8, ["disabled"])),
            b(d.$slots, "top"),
            b(d.$slots, "default", {}, () => [
              t(s) ? (m(), g(Il, {
                key: 0,
                modelValue: t(o).view,
                "onUpdate:modelValue": n[0] || (n[0] = (y) => t(o).view = y)
              }, {
                default: r(() => [
                  (m(!0), I(F, null, J(t(s), (y, i) => (m(), g(Ll, {
                    key: y,
                    value: y
                  }, {
                    default: r(() => [
                      b(d.$slots, i)
                    ]),
                    _: 2
                  }, 1032, ["value"]))), 128))
                ]),
                _: 3
              }, 8, ["modelValue"])) : h("", !0)
            ]),
            b(d.$slots, "bottom")
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
    const c = e, l = W(null), s = ce(), a = pe(s, "tab.", { exclude: "tab.default" }), p = pe(s, "window.");
    return (o, d) => t(a) && Object.keys(t(a)).length ? (m(), I(F, { key: 0 }, [
      u(Dl, {
        modelValue: l.value,
        "onUpdate:modelValue": d[0] || (d[0] = (n) => l.value = n)
      }, {
        default: r(() => [
          t(s).default ? b(o.$slots, "tab", { key: 0 }, () => [
            u(je, {
              text: c == null ? void 0 : c.title,
              value: "default"
            }, null, 8, ["text"])
          ]) : h("", !0),
          (m(!0), I(F, null, J(t(a), (n, y) => (m(), g(je, { value: n }, {
            default: r(() => [
              b(o.$slots, y)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"]),
      u(et, {
        modelValue: l.value,
        "onUpdate:modelValue": d[1] || (d[1] = (n) => l.value = n)
      }, {
        default: r(() => [
          t(s).default ? (m(), g(Ae, {
            key: 0,
            value: "default"
          }, {
            default: r(() => [
              b(o.$slots, "default")
            ]),
            _: 3
          })) : h("", !0),
          (m(!0), I(F, null, J(t(p), (n, y) => (m(), g(Ae, { value: n }, {
            default: r(() => [
              b(o.$slots, y)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"])
    ], 64)) : b(o.$slots, "default", { key: 1 });
  }
}), ga = { class: "mb-3" }, ka = /* @__PURE__ */ ae({
  __name: "OxModelEdit",
  props: {
    repo: {},
    empty: {},
    initial: {},
    name: {},
    url: {},
    saved: { type: Function }
  },
  setup(e, { expose: c }) {
    const l = e, { editor: s, edited: a } = Ut({ props: l });
    T(() => s.repo.use);
    const { value: p } = Le(s);
    return c({ editor: s, edited: a, value: p }), (o, d) => (m(), I(F, null, [
      u(he, {
        state: t(s).state
      }, null, 8, ["state"]),
      re("div", ga, [
        t(a) ? (m(), g(Be, {
          key: 0,
          onValidate: d[0] || (d[0] = (n) => t(s).save()),
          onReset: d[1] || (d[1] = (n) => t(s).discard()),
          state: t(s).state,
          "validate-disabled": !t(s).valid
        }, null, 8, ["state", "validate-disabled"])) : h("", !0)
      ]),
      u(_l, null, {
        default: r(() => [
          b(o.$slots, "default", {
            editor: t(s),
            edited: t(a),
            value: t(p),
            model: t(s).repo.use
          })
        ]),
        _: 3
      })
    ], 64));
  }
}), Va = /* @__PURE__ */ ae({
  __name: "OxModelPanel",
  props: {
    repo: {},
    search: {},
    view: {},
    headers: {},
    relations: {},
    showFilters: { type: Boolean },
    name: {},
    index: { default: "list.table" },
    value: {},
    state: {},
    help: {},
    title: {},
    icon: {}
  },
  setup(e) {
    const c = ce(), l = pe(c, "views.list."), s = pe(c, "item."), a = pe(c, "views.detail.edit."), p = Je("filters"), o = e, d = j("context"), { panel: n, list: y, items: i, next: f, prev: w } = j("panel") ?? Kt({ props: o }), O = n.panels, z = T(() => {
      var C;
      return d.user.can([n.model, (C = n.value) != null && C.id ? "change" : "add"]);
    }), { showFilters: G } = Le(n), P = T(() => [
      ...o.headers,
      { key: "actions", title: k("actions") }
    ]);
    function S(C) {
      n.value.value = C;
    }
    const le = T(() => ({
      panel: n,
      panels: O,
      list: y,
      items: i,
      context: d,
      value: n.value
    }));
    return (C, x) => (m(), g(rt, {
      name: o.name,
      title: t(n).title,
      icon: t(n).icon,
      state: t(y).state,
      index: o.index
    }, me({
      "append-title": r(() => [
        b(C.$slots, "append-title", X(Z(le.value))),
        t(n).view.startsWith("list.") ? (m(), g(ze, {
          key: 0,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: r(() => [
            b(C.$slots, "nav.list", X(Z(le.value))),
            t(p) ? (m(), g(U, {
              key: 0,
              title: t(G) ? t(k)("filters.hide") : t(k)("filters.show"),
              "aria-label": t(G) ? t(k)("filters.hide") : t(k)("filters.show"),
              onClick: x[0] || (x[0] = (M) => G.value = !t(G)),
              active: t(G)
            }, {
              default: r(() => [
                u(Q, {
                  icon: t(p).icon
                }, null, 8, ["icon"])
              ]),
              _: 1
            }, 8, ["title", "aria-label", "active"])) : h("", !0)
          ]),
          _: 3
        })) : t(n).view.startsWith("detail.") && t(n).value ? (m(), g(ze, {
          key: 1,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: r(() => [
            b(C.$slots, "nav.detail", X(Z(le.value))),
            t(n).view == "detail.edit" && t(n).value ? (m(), g(tt, { key: 0 }, {
              activator: r(({ props: M }) => [
                u(U, H({ "prepend-icon": "mdi-dots-vertical" }, M), {
                  default: r(() => [
                    B(te(t(k)("actions")), 1)
                  ]),
                  _: 2
                }, 1040)
              ]),
              default: r(() => [
                u(we, null, {
                  default: r(() => [
                    b(C.$slots, "item.actions", {
                      value: t(n).value
                    })
                  ]),
                  _: 3
                })
              ]),
              _: 3
            })) : h("", !0),
            u(U, {
              disabled: !t(w),
              title: t(k)("prev"),
              "aria-label": t(k)("prev"),
              onClick: x[1] || (x[1] = q((M) => t(n).show({ value: t(w) }), ["stop"]))
            }, {
              default: r(() => [
                u(Q, { icon: "mdi-chevron-left" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"]),
            u(U, {
              disabled: !t(f),
              title: t(k)("next"),
              "aria-label": t(k)("next"),
              onClick: x[2] || (x[2] = q((M) => t(n).show({ value: t(f) }), ["stop"]))
            }, {
              default: r(() => [
                u(Q, { icon: "mdi-chevron-right" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"])
          ]),
          _: 3
        })) : h("", !0),
        u(Bl, {
          class: "ml-3",
          color: "secondary",
          modelValue: t(n).view,
          "onUpdate:modelValue": x[4] || (x[4] = (M) => t(n).view = M),
          density: "compact",
          variant: "tonal",
          mandatory: ""
        }, {
          default: r(() => {
            var M;
            return [
              u(U, {
                value: "list.table",
                title: t(k)("panels.nav.table"),
                "aria-label": t(k)("panels.nav.table")
              }, {
                default: r(() => [
                  u(Q, null, {
                    default: r(() => x[5] || (x[5] = [
                      B("mdi-table")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"]),
              t(c)["views.list.cards"] ? (m(), g(U, {
                key: 0,
                value: "list.cards",
                title: t(k)("panels.nav.cards"),
                "aria-label": t(k)("panels.nav.cards")
              }, {
                default: r(() => [
                  u(Q, null, {
                    default: r(() => x[6] || (x[6] = [
                      B("mdi-card-account-details")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : h("", !0),
              t(c)["views.list.kanban"] ? (m(), g(U, {
                key: 1,
                value: "list.kanban",
                title: t(k)("panels.nav.kanban"),
                "aria-label": t(k)("panels.nav.kanban")
              }, {
                default: r(() => [
                  u(Q, null, {
                    default: r(() => x[7] || (x[7] = [
                      B("mdi-view-column")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : h("", !0),
              t(a) ? (m(), g(U, {
                key: 2,
                value: "detail.add",
                onClick: x[3] || (x[3] = q((L) => t(n).create(), ["stop"])),
                title: t(k)("panels.nav.add"),
                "aria-label": t(k)("panels.nav.add")
              }, {
                default: r(() => [
                  u(Q, null, {
                    default: r(() => x[8] || (x[8] = [
                      B("mdi-plus-box")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : h("", !0),
              t(c)["views.detail.edit"] || t(a) ? (m(), g(U, {
                key: 3,
                value: "detail.edit",
                disabled: !((M = t(n).value) != null && M.id),
                title: t(k)("panels.nav.edit"),
                "aria-label": t(k)("panels.nav.edit")
              }, {
                default: r(() => [
                  u(Q, null, {
                    default: r(() => x[9] || (x[9] = [
                      B("mdi-pencil")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"])) : h("", !0),
              b(C.$slots, "nav.views", X(Z(le.value)))
            ];
          }),
          _: 3
        }, 8, ["modelValue"])
      ]),
      top: r(() => [
        At(u(ot, {
          ref_key: "filters",
          ref: p,
          search: o.search,
          "teleport-to": "#panel-list-actions"
        }, {
          default: r((M) => [
            b(C.$slots, "list.filters", X(Z(M)))
          ]),
          _: 3
        }, 8, ["search"]), [
          [Tt, t(n).view.startsWith("list.") && t(G)]
        ])
      ]),
      _: 2
    }, [
      t(c)["views.list.table"] ? void 0 : {
        name: "views.list.table",
        fn: r(() => [
          u(it, {
            headers: P.value,
            edit: ""
          }, me({ _: 2 }, [
            J(t(s), (M, L) => ({
              name: L,
              fn: r((ue) => [
                b(C.$slots, L, X(Z(ue)))
              ])
            }))
          ]), 1032, ["headers"])
        ]),
        key: "0"
      },
      J(t(l), (M, L) => ({
        name: L,
        fn: r(() => [
          b(C.$slots, L, X(Z(le.value)))
        ])
      })),
      (t(c)["views.detail.edit"] || t(a)) && z.value ? {
        name: "views.detail.edit",
        fn: r(() => [
          u(t(ut), {
            title: t(k)(`models.${t(n).model.entity}`)
          }, me({ _: 2 }, [
            J(t(a), (M, L) => ({
              name: M,
              fn: r(() => [
                b(C.$slots, L, {
                  saved: S,
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
}), wa = /* @__PURE__ */ ae({
  __name: "OxPanelNav",
  props: {
    title: {},
    icon: {},
    panel: {},
    href: {},
    auto: { type: Boolean }
  },
  setup(e) {
    const c = e, l = j("panels");
    return T(() => !c.auto || panel.name == c.name), (s, a) => (m(), g(de, {
      active: t(l).panel == c.panel,
      "prepend-icon": c.icon,
      title: c.title,
      onClick: a[0] || (a[0] = q((p) => t(l).show(c), ["stop"]))
    }, null, 8, ["active", "prepend-icon", "title"]));
  }
}), ha = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OxAction: _e,
  OxActionModelDelete: Xl,
  OxActions: Zl,
  OxApp: na,
  OxAutocomplete: ia,
  OxComponent: ra,
  OxFieldDetails: Te,
  OxFormList: ca,
  OxListFilters: ot,
  OxListKanban: ma,
  OxListTable: it,
  OxLogin: ba,
  OxModelEdit: ka,
  OxModelPanel: Va,
  OxPanel: rt,
  OxPanelNav: wa,
  OxStateAlert: he,
  OxValidationBtn: Be,
  OxView: ut
}, Symbol.toStringTag, { value: "Module" })), Aa = {
  el: "#app",
  delimiters: ["[[", "]]"],
  components: { ...ha, ...Ql }
};
export {
  Aa as App,
  _e as OxAction,
  Xl as OxActionModelDelete,
  Zl as OxActions,
  na as OxApp,
  ia as OxAutocomplete,
  ra as OxComponent,
  Te as OxFieldDetails,
  ca as OxFormList,
  ot as OxListFilters,
  ma as OxListKanban,
  it as OxListTable,
  ba as OxLogin,
  ka as OxModelEdit,
  Va as OxModelPanel,
  rt as OxPanel,
  wa as OxPanelNav,
  he as OxStateAlert,
  Be as OxValidationBtn,
  ut as OxView
};
//# sourceMappingURL=components.js.map
