import { defineComponent as ae, inject as M, createElementBlock as A, createCommentVNode as x, unref as e, openBlock as d, Fragment as _, createBlock as b, withModifiers as Q, useSlots as ce, renderSlot as g, normalizeProps as ee, guardReactiveProps as te, computed as P, resolveComponent as $t, createVNode as p, withCtx as r, createTextVNode as F, toDisplayString as le, renderList as H, mergeProps as q, mergeModels as Le, useModel as Be, ref as J, onMounted as we, watch as Y, shallowRef as re, onScopeDispose as St, nextTick as Ce, watchEffect as Ot, reactive as Pe, onErrorCaptured as Ct, createElementVNode as ue, createSlots as me, h as Pt, toRefs as De, normalizeClass as At, useTemplateRef as Xe, withKeys as Ke, onUnmounted as Tt, Teleport as je, withDirectives as _t, vShow as It } from "vue";
import { useAction as Lt, t as V, useAppContext as Bt, usePanels as Dt, splitValues as Ft, excludeValues as Mt, useModelList as Et, query as Rt, defineAsyncComponent as Ut, tKeys as Nt, filterSlots as fe, useModelEditor as Kt, useModelPanel as jt } from "ox";
import { V as N, a as se, b as zt, c as Ae, d as Fe, e as Gt, f as pe, u as Wt, g as qt, h as Yt, i as Ht, j as Jt, k as Ze, l as et, m as Qt, n as Xt, o as Zt, p as el, q as tl, r as ll, s as ze, t as al, v as nl, w as tt, x as sl, y as ol, z as Ge, A as il, B as Te, C as rl, D as ul, E as lt, F as dl, G as cl, H as vl, I as pl, J as ml, K as ke, L as Z, M as at, N as fl, O as yl, P as bl, Q as gl, R as kl, S as wl, T as Vl, U as hl, W as xl, X as $l, Y as Sl, Z as Ol, _ as Cl, $ as Pl, a0 as nt, a1 as Al, a2 as Tl, a3 as _l, a4 as Il, a5 as Ll, a6 as ge, a7 as _e, a8 as Bl, a9 as Dl, aa as Fl, ab as We, ac as Ml, ad as qe, ae as El } from "./VAlert-5sdOu7mH.js";
import { l as Me, n as st, u as he, o as Rl, q as Ul, r as Nl, s as ot, t as Kl, v as jl, w as zl, j as Gl, x as Wl, y as ql, z as Ye, A as He, B as Yl } from "./theme-BrdPdMMA.js";
import { o as Hl, D as Jl, v as Ql, S as Xl, j as Zl, r as ea } from "./lodash-BWLCdQPa.js";
import { components as ta } from "ox/vendor";
const Ee = /* @__PURE__ */ ae({
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
  setup(t, { emit: o }) {
    const l = t, s = o, a = M("context"), { run: m, processing: i, allowed: c } = Lt({ user: a.user, emits: s, props: l });
    return (n, u) => e(c) ? (d(), A(_, { key: 0 }, [
      l.button ? (d(), b(N, {
        key: 0,
        variant: "text",
        disabled: e(i),
        color: l.color,
        icon: l.icon,
        title: l.title,
        "aria-label": l.title,
        onClick: Q(e(m), ["stop"])
      }, null, 8, ["disabled", "color", "icon", "title", "aria-label", "onClick"])) : (d(), b(se, {
        key: 1,
        title: l.title,
        "base-color": l.color,
        "prepend-icon": l.icon,
        disabled: e(i),
        onClick: Q(e(m), ["stop"])
      }, null, 8, ["title", "base-color", "prepend-icon", "disabled", "onClick"]))
    ], 64)) : x("", !0);
  }
}), la = /* @__PURE__ */ ae({
  __name: "OxActionModelDelete",
  props: {
    item: {},
    button: { type: Boolean }
  },
  setup(t) {
    const o = M("panel"), l = M("repos"), s = t;
    async function a(m, i) {
      return await l[i.constructor.entity].api().delete(i.$url(), { delete: s.item.id });
    }
    return (m, i) => (d(), b(Ee, {
      item: s.item,
      button: s.button,
      icon: "mdi-delete",
      color: "error",
      title: e(V)("actions.delete"),
      confirm: e(V)("actions.delete.confirm"),
      permissions: ["delete", (c, n) => n.id],
      run: a,
      onCompleted: i[0] || (i[0] = (c) => {
        var n;
        return (n = e(o)) == null ? void 0 : n.show({ view: e(o).index });
      })
    }, null, 8, ["item", "button", "title", "confirm", "permissions"]));
  }
}), aa = {
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
    const o = t;
    return (l, s) => (d(), A(_, null, [
      g(l.$slots, "before", ee(te(o))),
      g(l.$slots, "default", ee(te(o))),
      g(l.$slots, "after", ee(te(o)))
    ], 64));
  }
}, na = /* @__PURE__ */ ae({
  __name: "OxAppNavItem",
  props: {
    title: {},
    icon: {},
    value: {},
    url: {},
    permissions: {},
    type: {},
    items: {}
  },
  setup(t) {
    const o = t, l = M("context"), s = M("panels");
    P(() => !o.auto || panel.name == o.name);
    function a() {
      const m = { panel: o.value, href: o.url };
      console.log(o, m), s.show(m);
    }
    return (m, i) => {
      const c = $t("ox-app-nav-item", !0);
      return o.type == "subheader" ? (d(), A(_, { key: 0 }, [
        p(zt, null, {
          default: r(() => [
            F(le(o.title), 1)
          ]),
          _: 1
        }),
        o.items ? (d(!0), A(_, { key: 0 }, H(o.items, (n) => (d(), b(c, q({ ref_for: !0 }, n), null, 16))), 256)) : x("", !0)
      ], 64)) : o.type == "group" ? (d(), A(_, { key: 1 }, [
        !o.permissions || e(l).user.can(o.permissions) ? (d(), b(Ae, {
          key: 0,
          value: o.value
        }, {
          activator: r(({ props: n }) => [
            p(se, q(n, {
              title: o.title,
              "prepend-icon": o.icon
            }), null, 16, ["title", "prepend-icon"])
          ]),
          default: r(() => [
            (d(!0), A(_, null, H(o.items, (n, u) => (d(), b(c, q({
              key: u,
              ref_for: !0
            }, n), null, 16))), 128))
          ]),
          _: 1
        }, 8, ["value"])) : x("", !0)
      ], 64)) : o.type == "divider" ? (d(), b(Fe, { key: 2 })) : !o.permissions || e(l).user.can(o.permissions) ? (d(), b(se, {
        key: 3,
        active: e(s).panel == o.value,
        value: o.value,
        "prepend-icon": o.icon,
        title: o.title,
        onClick: Q(a, ["stop"])
      }, null, 8, ["active", "value", "prepend-icon", "title"])) : x("", !0);
    };
  }
}), sa = {
  __name: "OxAppNav",
  props: /* @__PURE__ */ Le({
    items: Array
  }, {
    drawer: {},
    drawerModifiers: {}
  }),
  emits: ["update:drawer"],
  setup(t) {
    M("context");
    const o = M("panels"), l = Be(t, "drawer"), s = J([]), a = t, m = P(() => a.items);
    function i(n) {
      if (o.panel) {
        for (const u of n)
          if (u.items) {
            const v = i(u.items);
            if (v)
              return [v, u.value];
          } else if (u.value == o.panel)
            return [u.value];
      }
    }
    function c() {
      s.value = i(m.value);
    }
    return we(c), Y(m, c), Y(() => o.panel, c), (n, u) => (d(), b(Gt, {
      modelValue: l.value,
      "onUpdate:modelValue": u[1] || (u[1] = (v) => l.value = v),
      theme: "dark"
    }, {
      append: r(() => [
        p(pe, null, {
          default: r(() => [
            g(n.$slots, "append")
          ]),
          _: 3
        })
      ]),
      default: r(() => [
        g(n.$slots, "prepend"),
        p(pe, {
          opened: s.value,
          "onUpdate:opened": u[0] || (u[0] = (v) => s.value = v),
          density: "compact"
        }, {
          default: r(() => [
            (d(!0), A(_, null, H(m.value, (v, y) => (d(), b(e(na), q({
              key: y,
              ref_for: !0
            }, v), null, 16))), 128))
          ]),
          _: 1
        }, 8, ["opened"])
      ]),
      _: 3
    }, 8, ["modelValue"]));
  }
};
function oa(t) {
  const o = re(t());
  let l = -1;
  function s() {
    clearInterval(l);
  }
  function a() {
    s(), Ce(() => o.value = t());
  }
  function m(i) {
    const c = i ? getComputedStyle(i) : {
      transitionDuration: 0.2
    }, n = parseFloat(c.transitionDuration) * 1e3 || 200;
    if (s(), o.value <= 0) return;
    const u = performance.now();
    l = window.setInterval(() => {
      const v = performance.now() - u + n;
      o.value = Math.max(t() - v, 0), o.value <= 0 && s();
    }, n);
  }
  return St(s), {
    clear: s,
    time: o,
    start: m,
    reset: a
  };
}
const ia = st({
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
  ...Kl(),
  ...ot(tl({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
}, "VSnackbar"), ra = Me()({
  name: "VSnackbar",
  props: ia(),
  emits: {
    "update:modelValue": (t) => !0
  },
  setup(t, o) {
    let {
      slots: l
    } = o;
    const s = he(t, "modelValue"), {
      positionClasses: a
    } = Wt(t), {
      scopeId: m
    } = qt(), {
      themeClasses: i
    } = Rl(t), {
      colorClasses: c,
      colorStyles: n,
      variantClasses: u
    } = Yt(t), {
      roundedClasses: v
    } = Ht(t), y = oa(() => Number(t.timeout)), $ = J(), T = J(), j = re(!1), z = re(0), k = J(), w = M(Jt, void 0);
    Ul(() => !!w, () => {
      const R = ll();
      Ot(() => {
        k.value = R.mainStyles.value;
      });
    }), Y(s, S), Y(() => t.timeout, S), we(() => {
      s.value && S();
    });
    let G = -1;
    function S() {
      y.reset(), window.clearTimeout(G);
      const R = Number(t.timeout);
      if (!s.value || R === -1) return;
      const ie = Nl(T.value);
      y.start(ie), G = window.setTimeout(() => {
        s.value = !1;
      }, R);
    }
    function O() {
      y.reset(), window.clearTimeout(G);
    }
    function E() {
      j.value = !0, O();
    }
    function L() {
      j.value = !1, S();
    }
    function de(R) {
      z.value = R.touches[0].clientY;
    }
    function oe(R) {
      Math.abs(z.value - R.changedTouches[0].clientY) > 50 && (s.value = !1);
    }
    function $e() {
      j.value && L();
    }
    const ye = P(() => t.location.split(" ").reduce((R, ie) => (R[`v-snackbar--${ie}`] = !0, R), {}));
    return Ze(() => {
      const R = ze.filterProps(t), ie = !!(l.default || l.text || t.text);
      return p(ze, q({
        ref: $,
        class: ["v-snackbar", {
          "v-snackbar--active": s.value,
          "v-snackbar--multi-line": t.multiLine && !t.vertical,
          "v-snackbar--timer": !!t.timer,
          "v-snackbar--vertical": t.vertical
        }, ye.value, a.value, t.class],
        style: [k.value, t.style]
      }, R, {
        modelValue: s.value,
        "onUpdate:modelValue": (I) => s.value = I,
        contentProps: q({
          class: ["v-snackbar__wrapper", i.value, c.value, v.value, u.value],
          style: [n.value],
          onPointerenter: E,
          onPointerleave: L
        }, R.contentProps),
        persistent: !0,
        noClickAnimation: !0,
        scrim: !1,
        scrollStrategy: "none",
        _disableGlobalStack: !0,
        onTouchstartPassive: de,
        onTouchend: oe,
        onAfterLeave: $e
      }, m), {
        default: () => {
          var I, be;
          return [al(!1, "v-snackbar"), t.timer && !j.value && p("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [p(nl, {
            ref: T,
            color: typeof t.timer == "string" ? t.timer : "info",
            max: t.timeout,
            "model-value": y.time.value
          }, null)]), ie && p("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((I = l.text) == null ? void 0 : I.call(l)) ?? t.text, (be = l.default) == null ? void 0 : be.call(l)]), l.actions && p(tt, {
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
              isActive: s
            })])]
          })];
        },
        activator: l.activator
      });
    }), et({}, $);
  }
}), ua = { class: "nav-home" };
var Qe;
const da = /* @__PURE__ */ ae({
  __name: "OxApp",
  props: {
    apiUrl: {},
    logo: {},
    dataEl: { default: (Qe = document.body.dataset) == null ? void 0 : Qe.appData },
    models: {},
    data: {}
  },
  setup(t) {
    const o = ce(), l = t, s = Pe({ drawer: !0 }), a = Bt(l), m = Dt();
    return we(() => {
      m.panel = a.data.panel;
    }), Y(() => [a.state.state, a.state.data], () => {
      a.showState = !0;
    }), Ct((i, c, n) => {
      a.state.error(`${i}`);
    }), (i, c) => (d(), b(sl, null, {
      default: r(() => [
        p(ra, {
          modelValue: e(a).showState,
          "onUpdate:modelValue": c[0] || (c[0] = (n) => e(a).showState = n),
          color: e(a).state.color,
          "multi-line": ""
        }, {
          default: r(() => [
            F(le(e(a).state.data), 1)
          ]),
          _: 1
        }, 8, ["modelValue", "color"]),
        p(ol, { color: "primary" }, {
          prepend: r(() => [
            p(Te, {
              icon: "mdi-apps",
              title: e(V)("nav.panels"),
              "aria-label": e(V)("nav.panels"),
              onClick: c[1] || (c[1] = Q((n) => s.drawer = !s.drawer, ["stop"]))
            }, null, 8, ["title", "aria-label"]),
            e(o)["app-nav"] && !s.drawer2 ? (d(), b(Te, {
              key: 0,
              icon: "mdi-menu",
              onClick: c[2] || (c[2] = (n) => {
                s.drawer2 = !0, s.drawer = !1;
              })
            })) : x("", !0)
          ]),
          default: r(() => [
            p(Ge, { id: "app-bar-sheet-title" }),
            p(Ge, { id: "app-bar-title" }, {
              default: r(() => [
                g(i.$slots, "title", { context: e(a) })
              ]),
              _: 3
            }),
            p(il),
            g(i.$slots, "app-bar-left", { context: e(a) }),
            c[6] || (c[6] = ue("div", {
              id: "app-bar-right",
              class: "mr-3"
            }, null, -1)),
            g(i.$slots, "app-bar-right", { context: e(a) })
          ]),
          _: 3
        }),
        p(e(sa), {
          drawer: s.drawer,
          "onUpdate:drawer": c[4] || (c[4] = (n) => s.drawer = n),
          items: e(a).data.nav
        }, me({
          prepend: r(() => [
            ue("a", ua, [
              i.logo ? (d(), b(rl, {
                key: 0,
                src: i.logo,
                class: "logo"
              }, null, 8, ["src"])) : x("", !0)
            ]),
            g(i.$slots, "nav-start", { context: e(a) })
          ]),
          _: 2
        }, [
          e(o)["nav-end"] ? {
            name: "append",
            fn: r(() => [
              p(pe, {
                opened: s.opened,
                "onUpdate:opened": c[3] || (c[3] = (n) => s.opened = n)
              }, {
                default: r(() => [
                  g(i.$slots, "nav-end", { context: e(a) })
                ]),
                _: 3
              }, 8, ["opened"])
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["drawer", "items"]),
        p(ul, null, {
          default: r(() => [
            g(i.$slots, "main", {}, () => [
              p(lt, {
                modelValue: e(m).panel,
                "onUpdate:modelValue": c[5] || (c[5] = (n) => e(m).panel = n)
              }, {
                default: r((n) => [
                  g(i.$slots, "default", q(n, { context: e(a) }))
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
}), ca = st({
  autoSelectFirst: {
    type: [Boolean, String]
  },
  clearOnSelect: Boolean,
  search: String,
  ...hl({
    filterKeys: ["title"]
  }),
  ...Vl(),
  ...ot(xl({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...wl({
    transition: !1
  })
}, "VAutocomplete"), Je = Me()({
  name: "VAutocomplete",
  props: ca(),
  emits: {
    "update:focused": (t) => !0,
    "update:search": (t) => !0,
    "update:modelValue": (t) => !0,
    "update:menu": (t) => !0
  },
  setup(t, o) {
    let {
      slots: l
    } = o;
    const {
      t: s
    } = jl(), a = J(), m = re(!1), i = re(!0), c = re(!1), n = J(), u = J(), v = re(-1), {
      items: y,
      transformIn: $,
      transformOut: T
    } = dl(t), {
      textColorClasses: j,
      textColorStyles: z
    } = cl(() => {
      var f;
      return (f = a.value) == null ? void 0 : f.color;
    }), k = he(t, "search", ""), w = he(t, "modelValue", [], (f) => $(f === null ? [null] : zl(f)), (f) => {
      const h = T(f);
      return t.multiple ? h : h[0] ?? null;
    }), G = P(() => typeof t.counterValue == "function" ? t.counterValue(w.value) : typeof t.counterValue == "number" ? t.counterValue : w.value.length), S = vl(t), {
      filteredItems: O,
      getMatches: E
    } = pl(t, y, () => i.value ? "" : k.value), L = P(() => t.hideSelected ? O.value.filter((f) => !w.value.some((h) => h.value === f.value)) : O.value), de = P(() => !!(t.chips || l.chip)), oe = P(() => de.value || !!l.selection), $e = P(() => w.value.map((f) => f.props.value)), ye = P(() => {
      var h;
      return (t.autoSelectFirst === !0 || t.autoSelectFirst === "exact" && k.value === ((h = L.value[0]) == null ? void 0 : h.title)) && L.value.length > 0 && !i.value && !c.value;
    }), R = P(() => t.hideNoData && !L.value.length || S.isReadonly.value || S.isDisabled.value), ie = he(t, "menu"), I = P({
      get: () => ie.value,
      set: (f) => {
        var h;
        ie.value && !f && ((h = n.value) != null && h.ΨopenChildren.size) || f && R.value || (ie.value = f);
      }
    }), be = P(() => I.value ? t.closeText : t.openText), Se = J(), ct = ml(Se, a);
    function vt(f) {
      t.openOnClear && (I.value = !0), k.value = "";
    }
    function pt() {
      R.value || (I.value = !0);
    }
    function mt(f) {
      R.value || (m.value && (f.preventDefault(), f.stopPropagation()), I.value = !I.value);
    }
    function ft(f) {
      var h;
      f.key !== " " && Ye(f) && ((h = a.value) == null || h.focus());
    }
    function yt(f) {
      var C, U, X, ne, B;
      if (S.isReadonly.value) return;
      const h = (C = a.value) == null ? void 0 : C.selectionStart, D = w.value.length;
      if (["Enter", "ArrowDown", "ArrowUp"].includes(f.key) && f.preventDefault(), ["Enter", "ArrowDown"].includes(f.key) && (I.value = !0), ["Escape"].includes(f.key) && (I.value = !1), ye.value && ["Enter", "Tab"].includes(f.key) && !w.value.some((W) => {
        let {
          value: K
        } = W;
        return K === L.value[0].value;
      }) && ve(L.value[0]), f.key === "ArrowDown" && ye.value && ((U = Se.value) == null || U.focus("next")), ["Backspace", "Delete"].includes(f.key)) {
        if (!t.multiple && oe.value && w.value.length > 0 && !k.value) return ve(w.value[0], !1);
        if (~v.value) {
          f.preventDefault();
          const W = v.value;
          ve(w.value[v.value], !1), v.value = W >= D - 1 ? D - 2 : W;
        } else f.key === "Backspace" && !k.value && (v.value = D - 1);
        return;
      }
      if (t.multiple)
        if (f.key === "ArrowLeft") {
          if (v.value < 0 && h && h > 0) return;
          const W = v.value > -1 ? v.value - 1 : D - 1;
          if (w.value[W])
            v.value = W;
          else {
            const K = ((X = k.value) == null ? void 0 : X.length) ?? null;
            v.value = -1, (ne = a.value) == null || ne.setSelectionRange(K, K);
          }
        } else if (f.key === "ArrowRight") {
          if (v.value < 0) return;
          const W = v.value + 1;
          w.value[W] ? v.value = W : (v.value = -1, (B = a.value) == null || B.setSelectionRange(0, 0));
        } else ~v.value && Ye(f) && (v.value = -1);
    }
    function bt(f) {
      if (He(a.value, ":autofill") || He(a.value, ":-webkit-autofill")) {
        const h = y.value.find((D) => D.title === f.target.value);
        h && ve(h);
      }
    }
    function gt() {
      var f;
      t.eager && ((f = u.value) == null || f.calculateVisibleItems());
    }
    function kt() {
      var f;
      m.value && (i.value = !0, (f = a.value) == null || f.focus());
    }
    function wt(f) {
      m.value = !0, setTimeout(() => {
        c.value = !0;
      });
    }
    function Vt(f) {
      c.value = !1;
    }
    function ht(f) {
      (f == null || f === "" && !t.multiple && !oe.value) && (w.value = []);
    }
    const Oe = re(!1);
    function ve(f) {
      let h = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!(!f || f.props.disabled))
        if (t.multiple) {
          const D = w.value.findIndex((U) => (t.valueComparator || Yl)(U.value, f.value)), C = h ?? !~D;
          if (~D) {
            const U = C ? [...w.value, f] : [...w.value];
            U.splice(D, 1), w.value = U;
          } else C && (w.value = [...w.value, f]);
          t.clearOnSelect && (k.value = "");
        } else {
          const D = h !== !1;
          w.value = D ? [f] : [], k.value = D && !oe.value ? f.title : "", Ce(() => {
            I.value = !1, i.value = !0;
          });
        }
    }
    return Y(m, (f, h) => {
      var D;
      f !== h && (f ? (Oe.value = !0, k.value = t.multiple || oe.value ? "" : String(((D = w.value.at(-1)) == null ? void 0 : D.props.title) ?? ""), i.value = !0, Ce(() => Oe.value = !1)) : (!t.multiple && k.value == null && (w.value = []), I.value = !1, (t.multiple || oe.value) && (k.value = ""), v.value = -1));
    }), Y(k, (f) => {
      !m.value || Oe.value || (f && (I.value = !0), i.value = !f);
    }), Y(I, () => {
      if (!t.hideSelected && I.value && w.value.length) {
        const f = L.value.findIndex((h) => w.value.some((D) => h.value === D.value));
        Gl && window.requestAnimationFrame(() => {
          var h;
          f >= 0 && ((h = u.value) == null || h.scrollToIndex(f));
        });
      }
    }), Y(() => t.items, (f, h) => {
      I.value || m.value && !h.length && f.length && (I.value = !0);
    }), Y(w, (f) => {
      var h;
      !t.multiple && !oe.value && (k.value = ((h = f[0]) == null ? void 0 : h.title) ?? "");
    }), Ze(() => {
      const f = !!(!t.hideNoData || L.value.length || l["prepend-item"] || l["append-item"] || l["no-data"]), h = w.value.length > 0, D = ke.filterProps(t);
      return p(ke, q({
        ref: a
      }, D, {
        modelValue: k.value,
        "onUpdate:modelValue": [(C) => k.value = C, ht],
        focused: m.value,
        "onUpdate:focused": (C) => m.value = C,
        validationValue: w.externalValue,
        counterValue: G.value,
        dirty: h,
        onChange: bt,
        class: ["v-autocomplete", `v-autocomplete--${t.multiple ? "multiple" : "single"}`, {
          "v-autocomplete--active-menu": I.value,
          "v-autocomplete--chips": !!t.chips,
          "v-autocomplete--selection-slot": !!oe.value,
          "v-autocomplete--selecting-index": v.value > -1
        }, t.class],
        style: t.style,
        readonly: S.isReadonly.value,
        placeholder: h ? void 0 : t.placeholder,
        "onClick:clear": vt,
        "onMousedown:control": pt,
        onKeydown: yt
      }), {
        ...l,
        default: () => p(_, null, [p(at, q({
          ref: n,
          modelValue: I.value,
          "onUpdate:modelValue": (C) => I.value = C,
          activator: "parent",
          contentClass: "v-autocomplete__content",
          disabled: R.value,
          eager: t.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: t.transition,
          onAfterEnter: gt,
          onAfterLeave: kt
        }, t.menuProps), {
          default: () => [f && p(pe, q({
            ref: Se,
            selected: $e.value,
            selectStrategy: t.multiple ? "independent" : "single-independent",
            onMousedown: (C) => C.preventDefault(),
            onKeydown: ft,
            onFocusin: wt,
            onFocusout: Vt,
            tabindex: "-1",
            "aria-live": "polite",
            color: t.itemColor ?? t.color
          }, ct, t.listProps), {
            default: () => {
              var C, U, X;
              return [(C = l["prepend-item"]) == null ? void 0 : C.call(l), !L.value.length && !t.hideNoData && (((U = l["no-data"]) == null ? void 0 : U.call(l)) ?? p(se, {
                key: "no-data",
                title: s(t.noDataText)
              }, null)), p(fl, {
                ref: u,
                renderless: !0,
                items: L.value,
                itemKey: "value"
              }, {
                default: (ne) => {
                  var Ne;
                  let {
                    item: B,
                    index: W,
                    itemRef: K
                  } = ne;
                  const Ue = q(B.props, {
                    ref: K,
                    key: B.value,
                    active: ye.value && W === 0 ? !0 : void 0,
                    onClick: () => ve(B, null)
                  });
                  return ((Ne = l.item) == null ? void 0 : Ne.call(l, {
                    item: B,
                    index: W,
                    props: Ue
                  })) ?? p(se, q(Ue, {
                    role: "option"
                  }), {
                    prepend: (Ve) => {
                      let {
                        isSelected: xt
                      } = Ve;
                      return p(_, null, [t.multiple && !t.hideSelected ? p(bl, {
                        key: B.value,
                        modelValue: xt,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, B.props.prependAvatar && p(gl, {
                        image: B.props.prependAvatar
                      }, null), B.props.prependIcon && p(Z, {
                        icon: B.props.prependIcon
                      }, null)]);
                    },
                    title: () => {
                      var Ve;
                      return i.value ? B.title : yl("v-autocomplete", B.title, (Ve = E(B)) == null ? void 0 : Ve.title);
                    }
                  });
                }
              }), (X = l["append-item"]) == null ? void 0 : X.call(l)];
            }
          })]
        }), w.value.map((C, U) => {
          function X(K) {
            K.stopPropagation(), K.preventDefault(), ve(C, !1);
          }
          const ne = {
            "onClick:close": X,
            onKeydown(K) {
              K.key !== "Enter" && K.key !== " " || (K.preventDefault(), K.stopPropagation(), X(K));
            },
            onMousedown(K) {
              K.preventDefault(), K.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, B = de.value ? !!l.chip : !!l.selection, W = B ? ql(de.value ? l.chip({
            item: C,
            index: U,
            props: ne
          }) : l.selection({
            item: C,
            index: U
          })) : void 0;
          if (!(B && !W))
            return p("div", {
              key: C.value,
              class: ["v-autocomplete__selection", U === v.value && ["v-autocomplete__selection--selected", j.value]],
              style: U === v.value ? z.value : {}
            }, [de.value ? l.chip ? p(tt, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: t.closableChips,
                  size: "small",
                  text: C.title
                }
              }
            }, {
              default: () => [W]
            }) : p(kl, q({
              key: "chip",
              closable: t.closableChips,
              size: "small",
              text: C.title,
              disabled: C.props.disabled
            }, ne), null) : W ?? p("span", {
              class: "v-autocomplete__selection-text"
            }, [C.title, t.multiple && U < w.value.length - 1 && p("span", {
              class: "v-autocomplete__selection-comma"
            }, [F(",")])])]);
        })]),
        "append-inner": function() {
          var ne, B;
          for (var C = arguments.length, U = new Array(C), X = 0; X < C; X++)
            U[X] = arguments[X];
          return p(_, null, [(ne = l["append-inner"]) == null ? void 0 : ne.call(l, ...U), t.menuIcon ? p(Z, {
            class: "v-autocomplete__menu-icon",
            color: (B = a.value) == null ? void 0 : B.fieldIconColor,
            icon: t.menuIcon,
            onMousedown: mt,
            onClick: Wl,
            "aria-label": s(be.value),
            title: s(be.value),
            tabindex: "-1"
          }, null) : void 0]);
        }
      });
    }), et({
      isFocused: m,
      isPristine: i,
      menu: I,
      search: k,
      filteredItems: O,
      select: ve
    }, a);
  }
}), va = /* @__PURE__ */ ae({
  __name: "OxAutocomplete",
  props: /* @__PURE__ */ Le({
    repo: {},
    lookup: { default: "search" },
    label: {},
    name: {},
    disabled: { type: Boolean },
    multiple: { type: Boolean },
    hideDetails: { type: Boolean },
    density: {},
    itemTitle: {},
    itemValue: {},
    customFilter: {},
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
    var z;
    const o = ce(), l = Be(t, "modelValue"), s = J(""), a = t, m = M("repos"), i = P(() => Ft(a, Je.props)), c = P(() => i.value[0]), n = Mt(i.value[1], ["repo", "search"]), { list: u, items: v } = Et({
      ...(z = n.value) == null ? void 0 : z[1],
      filters: a.filters || {},
      save: !1,
      query: Rt(a.repo, m)
    });
    function y(k) {
      k[a.lookup] = s.value, Hl.isEqual(u.filters, k) || (u.filters = { ...a.filters }, u.filters[a.lookup] = s.value, u.load());
    }
    function $(k) {
      const w = u.filters[a.lookup];
      u.nextUrl, k && k != "<empty string>" && k != w && (u.filters[a.lookup] = k, u.load().then((G) => {
        s.value = k;
      }));
    }
    var T = null;
    function j(k) {
      !k || u.findIndex(k) != -1 || u.findIndex(k) == -1 && T != k && (T = k, u.load({ id: k, append: 0 }));
    }
    return we(() => {
      a.filters && Object.values(a.filters).length ? y(a.filters) : u.load(), j(l.value);
    }), Y(() => a.filters, (k) => y(k)), Y(s, $), Y(l, (k, w) => k != w && j(k)), (k, w) => (d(), b(e(Je), q(c.value, {
      items: e(v),
      loading: e(u).state.isProcessing,
      modelValue: l.value,
      "onUpdate:modelValue": w[0] || (w[0] = (G) => l.value = G),
      search: s.value,
      "onUpdate:search": w[1] || (w[1] = (G) => s.value = G)
    }), me({ _: 2 }, [
      H(e(o), (G, S) => ({
        name: S,
        fn: r((O) => [
          g(k.$slots, S, ee(te(O)))
        ])
      }))
    ]), 1040, ["items", "loading", "modelValue", "search"]));
  }
}), pa = {
  props: {
    src: String,
    is: String
  },
  setup(t) {
    const o = re(null), l = P(() => {
      if (t.is)
        return t.is;
      let a = t.src.substring(t.src.lastIndexOf("/") + 1);
      if (a && (a = a.substring(0, a.indexOf("."))), !a)
        throw Error(
          "`is` not provided and could not be deducted from `src`."
        );
      return a;
    });
    function s() {
      o.value = Ut(t.src, l.value);
    }
    return Y(() => t.src, s), s(), () => Pt(o.value, t);
  }
}, ma = { class: "text-error" }, Ie = {
  __name: "OxFieldDetails",
  props: {
    state: Object,
    errors: Array
  },
  setup(t) {
    const o = t;
    return (l, s) => o.errors ? (d(!0), A(_, { key: 0 }, H(o.errors, (a) => (d(), A("div", ma, [
      p(Z, { icon: "mdi-alert-circle-outline" }),
      F(" " + le(a), 1)
    ]))), 256)) : x("", !0);
  }
}, it = {
  __name: "OxListFilters",
  props: {
    search: String
  },
  setup(t, { expose: o }) {
    const l = M("list"), s = t, a = P(() => {
      const c = l.filters;
      return c && Object.entries(c).some(
        ([n, u]) => !n.startsWith("page") && !n.startsWith("ordering") && !!u
      );
    }), m = P(() => a.value ? "mdi-filter-check" : "mdi-filter-outline");
    function i() {
      l.filters = {}, l.load();
    }
    return o({ icon: m, hasFilters: a, reset: i }), (c, n) => (d(), A("form", {
      onSubmit: n[2] || (n[2] = Q((u) => e(l).load(), ["prevent"])),
      class: "width-full"
    }, [
      p($l, {
        dense: "",
        color: "transparent"
      }, {
        default: r(() => [
          p(Te, {
            icon: m.value,
            readonly: ""
          }, null, 8, ["icon"]),
          s.search && e(l).filters ? (d(), b(ke, {
            key: 0,
            label: e(V)("filters.search"),
            density: "compact",
            class: "ml-2",
            modelValue: e(l).filters[s.search],
            "onUpdate:modelValue": n[0] || (n[0] = (u) => e(l).filters[s.search] = u),
            "hide-details": ""
          }, null, 8, ["label", "modelValue"])) : x("", !0),
          g(c.$slots, "default", {
            list: e(l),
            filters: e(l).filters
          }),
          p(N, {
            onClick: n[1] || (n[1] = Q((u) => e(l).load(), ["stop"])),
            class: "ml-2",
            icon: "mdi-check",
            "aria-label": c.$t("filters.apply"),
            title: e(V)("filters.apply")
          }, null, 8, ["aria-label", "title"]),
          a.value ? (d(), b(N, {
            key: 1,
            onClick: Q(i, ["stop"]),
            icon: "mdi-backspace",
            "aria-label": e(V)("filters.reset"),
            title: e(V)("filters.reset")
          }, null, 8, ["aria-label", "title"])) : x("", !0)
        ]),
        _: 3
      })
    ], 32));
  }
}, fa = { class: "flex-row justify-right" }, ya = /* @__PURE__ */ ae({
  __name: "OxFormList",
  props: /* @__PURE__ */ Le({
    /** Allow to add and edit items */
    editable: { type: Boolean, default: !0 }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(t) {
    var n;
    const o = Be(t, "modelValue"), l = J({}), s = t, { editable: a } = De(s), m = J([]);
    (n = o.value) != null && n.length || m.value.push(-1);
    function i() {
      o.value.push(l.value), l.value = {};
    }
    function c(u) {
      confirm(V("actions.delete.confirm")) && s.editable && o.value.splice(u);
    }
    return (u, v) => (d(), b(pe, {
      opened: m.value,
      "onUpdate:opened": v[3] || (v[3] = (y) => m.value = y)
    }, {
      default: r(() => [
        (d(!0), A(_, null, H(o.value, (y, $) => (d(), b(Ae, {
          key: $,
          value: $
        }, {
          activator: r(({ props: T }) => [
            p(se, q({ ref_for: !0 }, T), {
              append: r(() => [
                ue("div", {
                  onClick: v[0] || (v[0] = Q(() => {
                  }, ["stop"]))
                }, [
                  g(u.$slots, "item.actions", {
                    item: y,
                    index: $,
                    editable: e(a)
                  }),
                  e(a) ? (d(), b(N, {
                    key: 0,
                    type: "button",
                    class: "ml-2",
                    size: "small",
                    onClick: Q((j) => c($), ["stop", "prevent"]),
                    color: "error",
                    "aria-label": e(V)("actions.remove"),
                    title: e(V)("actions.remove"),
                    icon: "mdi-delete"
                  }, null, 8, ["onClick", "aria-label", "title"])) : x("", !0)
                ])
              ]),
              default: r(() => [
                p(Sl, null, {
                  default: r(() => [
                    g(u.$slots, "item.title", { item: y })
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 2
            }, 1040)
          ]),
          default: r(() => [
            g(u.$slots, "item", {
              item: y,
              index: $
            })
          ]),
          _: 2
        }, 1032, ["value"]))), 128)),
        o.value.length ? (d(), b(Fe, { key: 0 })) : x("", !0),
        e(a) ? (d(), b(Ae, {
          key: 1,
          value: -1
        }, {
          activator: r(({ props: y }) => [
            p(se, q(y, {
              title: e(V)("actions.add_item"),
              "prepend-icon": "mdi-plus"
            }), null, 16, ["title"])
          ]),
          default: r(() => [
            g(u.$slots, "item", {
              item: l.value,
              edit: !0
            }),
            l.value ? (d(), b(se, { key: 0 }, {
              default: r(() => [
                ue("div", fa, [
                  l.value ? (d(), b(N, {
                    key: 0,
                    size: "small",
                    onClick: v[1] || (v[1] = (y) => l.value = {}),
                    color: "secondary",
                    "prepend-icon": "mdi-backspace",
                    "aria-label": e(V)("actions.discard")
                  }, {
                    default: r(() => [
                      F(le(e(V)("actions.discard")), 1)
                    ]),
                    _: 1
                  }, 8, ["aria-label"])) : x("", !0),
                  l.value ? (d(), b(N, {
                    key: 1,
                    size: "small",
                    onClick: v[2] || (v[2] = (y) => i()),
                    color: "primary",
                    "prepend-icon": "mdi-plus",
                    "aria-label": e(V)("actions.add")
                  }, {
                    default: r(() => [
                      F(le(e(V)("actions.add")), 1)
                    ]),
                    _: 1
                  }, 8, ["aria-label"])) : x("", !0)
                ])
              ]),
              _: 1
            })) : x("", !0)
          ]),
          _: 3
        })) : x("", !0)
      ]),
      _: 3
    }, 8, ["opened"]));
  }
}), ba = Me()({
  name: "VSlideGroupItem",
  props: Ol(),
  emits: {
    "group:selected": (t) => !0
  },
  setup(t, o) {
    let {
      slots: l
    } = o;
    const s = Cl(t, Pl);
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
}), ga = {
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
  setup(t, { emit: o }) {
    const l = o;
    M("list");
    const s = M("items"), a = t;
    function m(n) {
      return n = n % a.colors.length, a.colorVariant ? a.colors[n] + "-" + a.colorVariant : a.colors[n];
    }
    function i(n, u, v) {
      n[v] ? !n[v].includes(u) && n[v].push(u) : n[v] = [u];
    }
    const c = P(() => {
      const n = {};
      if (s.value)
        for (var u of s.value) {
          const y = u[a.field];
          if (Array.isArray(y))
            if (y.length)
              for (var v of y)
                i(n, u, v);
            else
              i(n, u, null);
          else
            i(n, u, y);
        }
      return n;
    });
    return (n, u) => (d(), b(nt, null, {
      default: r(() => [
        p(Al, null, {
          default: r(() => [
            (d(!0), A(_, null, H(a.headers, (v, y) => (d(), b(ba, {
              key: v.value
            }, {
              default: r(({ selectedClass: $ }) => [
                p(Tl, {
                  width: "400",
                  class: At(["ma-3", $]),
                  color: m(y),
                  lines: "two"
                }, {
                  default: r(() => [
                    p(_l, null, {
                      default: r(() => [
                        F(le(v.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    p(pe, {
                      "bg-color": m(y)
                    }, {
                      default: r(() => [
                        c.value && c.value[v.value] ? (d(!0), A(_, { key: 0 }, H(c.value[v.value], (T) => g(n.$slots, "item", {
                          key: T.id,
                          header: v,
                          item: T
                        }, () => [
                          p(se, {
                            title: T[a.itemTitle],
                            value: a.itemValue && T[a.itemValue],
                            onClick: (j) => l("click", T)
                          }, {
                            append: r(() => [
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
}, rt = /* @__PURE__ */ ae({
  __name: "OxListTable",
  props: {
    // list: Object,
    /** Table headers */
    headers: Array,
    /** If True, allow user to edit (display edit button) */
    edit: Boolean
  },
  setup(t) {
    const o = ce(), l = Jl(o, "item.", { exclude: ["item.actions"] }), s = M("panel"), a = M("list"), m = M("items"), i = ["change"], c = t, n = P(() => c.headers.reduce((y, $) => (y.push(
      typeof $ == "string" ? { key: $, title: V(Nt.field($)) } : $
    ), y), []));
    function u(y) {
      a.filters.page = y.page, a.filters.page_size = y.itemsPerPage, a.filters.ordering = y.sortBy.map(({ key: $, order: T }) => T == "asc" ? $ : `-${$}`);
    }
    function v(y, $) {
      s.show({ view: "detail.edit", value: $ });
    }
    return (y, $) => {
      var T;
      return d(), b(Il, {
        items: e(m),
        "item-index": "id",
        "items-length": e(a).count || e(m).length,
        "items-per-page": c.itemsPerPage,
        loading: (T = e(a).state) == null ? void 0 : T.isProcessing,
        headers: n.value,
        class: "align-top-table",
        "onUpdate:options": u
      }, me({
        loading: r(() => [
          p(Ll, { type: "table-row@10" })
        ]),
        "item.actions": r(({ item: j }) => [
          t.edit ? (d(), b(Ee, {
            key: 0,
            icon: "mdi-pencil",
            button: "",
            title: e(V)("actions.edit"),
            permissions: i,
            item: j,
            run: v
          }, null, 8, ["title", "item"])) : x("", !0),
          g(y.$slots, "item.actions", {
            value: j,
            dense: !0,
            button: !0
          })
        ]),
        _: 2
      }, [
        H(e(l), (j, z) => ({
          name: z,
          fn: r((k) => [
            g(y.$slots, z, ee(te(k)))
          ])
        }))
      ]), 1032, ["items", "items-length", "items-per-page", "loading", "headers"]);
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
    const o = ce(), l = t;
    let s = J(!1);
    Y(() => l.state.state, (i) => {
      l.delay && i == Ql.PROCESSING && (s.value = !1, window.setTimeout(() => {
        s.value = !0;
      }, 5e3));
    });
    const a = P(() => {
      var i;
      return ((i = l.state) == null ? void 0 : i.isProcessing) && (!l.delay || s.value);
    }), m = P(() => {
      var i, c;
      return (c = (i = l.state) == null ? void 0 : i.data) == null ? void 0 : c.messages;
    });
    return (i, c) => (d(), A(_, null, [
      l.state.isNone && e(o).none ? (d(), b(e(ge), {
        key: 0,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        state: t.state,
        title: t.noneTitle
      }, {
        default: r(() => [
          g(i.$slots, "none", { state: t.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : a.value ? (d(), b(e(ge), {
        key: 1,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: t.state,
        title: t.processingTitle
      }, {
        default: r(() => [
          g(i.$slots, "processing", { state: t.state }, () => [
            c[0] || (c[0] = F(" Data are being sent to server, please be patient. If this message persist you might wan't to retry. "))
          ])
        ]),
        _: 3
      }, 8, ["state", "title"])) : l.state.isError ? (d(), b(e(ge), {
        key: 2,
        type: "error",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: t.state,
        title: t.errorTitle
      }, {
        default: r(() => [
          g(i.$slots, "error", { state: t.state }, () => [
            c[1] || (c[1] = F(" Oups... something wrong happened. "))
          ]),
          g(i.$slots, "error-detail", { state: t.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : l.state.isOk ? (d(), b(e(ge), {
        key: 3,
        type: "success",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: t.state,
        title: t.okTitle
      }, {
        default: r(() => [
          g(i.$slots, "ok", { state: t.state }, () => [
            c[2] || (c[2] = ue("p", null, "Congrats! Data have been updated.", -1))
          ]),
          m.value ? (d(), A(_, { key: 0 }, [
            p(Fe),
            (d(!0), A(_, null, H(m.value, (n) => (d(), A("p", null, le(n), 1))), 256))
          ], 64)) : x("", !0),
          g(i.$slots, "ok-detail", { state: t.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : x("", !0),
      g(i.$slots, "default", {
        state: l.state
      })
    ], 64));
  }
}, ka = { class: "text-right" }, Re = {
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
  setup(t, { emit: o }) {
    const l = o, s = t;
    return (a, m) => (d(), A("div", ka, [
      p(e(N), {
        color: "error",
        class: "me-2",
        "prepend-icon": s.resetIcon,
        onClick: m[0] || (m[0] = (i) => l("reset")),
        disabled: s.disabled
      }, {
        default: r(() => [
          g(a.$slots, "reset", {}, () => [
            F(le(s.resetLabel), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]),
      s.state.isSending ? (d(), b(e(N), {
        key: 0,
        color: "primary",
        "prepend-icon": "mdi-content-save",
        disabled: ""
      }, {
        default: r(() => m[2] || (m[2] = [
          F(" Saving ")
        ])),
        _: 1
      })) : (d(), b(e(N), {
        key: 1,
        color: "primary",
        "prepend-icon": s.validateIcon,
        onClick: m[1] || (m[1] = (i) => l("validate")),
        disabled: s.disabled || s.validateDisabled
      }, {
        default: r(() => [
          g(a.$slots, "validate", {}, () => [
            F(le(s.validateLabel), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]))
    ]));
  }
}, wa = { key: 0 }, Va = { class: "text-right mt-3" }, ha = {
  __name: "OxLogin",
  props: {
    next: { type: String },
    url: { type: String }
  },
  emits: ["save", "saved"],
  setup(t, { emit: o }) {
    const l = Xe("password"), s = t, a = Pe({
      username: "",
      password: ""
    }), m = J(!1), i = Pe(new Xl());
    function c(u = !0) {
      ea(a, { username: "", password: "" }), u && i.none();
    }
    async function n() {
      i.processing();
      try {
        const u = await fetch(s.url, {
          method: "POST",
          headers: Zl.axiosConfig.headers,
          body: JSON.stringify(a)
        });
        u.status == 200 ? (a.credentials = "", a.password = "", i.ok(await u.json()), s.next && (window.location.href = s.next)) : i.error(await u.json());
      } catch (u) {
        i.ok((u == null ? void 0 : u.message) || u);
      }
    }
    return (u, v) => (d(), A(_, null, [
      p(e(xe), { state: i }, {
        none: r(({ state: y }) => v[7] || (v[7] = [
          ue("p", null, "Please enter your credentials in order too proceed...", -1)
        ])),
        "ok-detail": r(({ state: y }) => [
          s.next ? (d(), A("p", wa, [
            v[8] || (v[8] = F("You soon will be redirected to ")),
            ue("i", null, le(s.next), 1)
          ])) : x("", !0)
        ]),
        error: r(({ state: y }) => {
          var $, T;
          return [
            p(Ie, {
              errors: ($ = y.data) == null ? void 0 : $.username
            }, null, 8, ["errors"]),
            p(Ie, {
              errors: (T = y.data) == null ? void 0 : T.password
            }, null, 8, ["errors"])
          ];
        }),
        _: 1
      }, 8, ["state"]),
      i.isOk ? x("", !0) : (d(), A(_, { key: 0 }, [
        p(ke, {
          variant: "underlined",
          label: "Enter login",
          modelValue: a.username,
          "onUpdate:modelValue": v[0] || (v[0] = (y) => a.username = y),
          onKeyup: v[1] || (v[1] = Ke(Q((y) => e(l).focus(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue"]),
        p(ke, {
          variant: "underlined",
          ref: "password",
          label: "Enter password",
          modelValue: a.password,
          "onUpdate:modelValue": v[2] || (v[2] = (y) => a.password = y),
          type: m.value ? "text" : "password",
          "append-icon": m.value ? "mdi-eye" : "mdi-eye-off",
          "onClick:append": v[3] || (v[3] = (y) => m.value = !m.value),
          onKeyup: v[4] || (v[4] = Ke(Q((y) => n(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue", "type", "append-icon"]),
        ue("div", Va, [
          g(u.$slots, "default", {
            value: a.password
          }, () => [
            a.username && a.password ? (d(), b(Re, {
              key: 0,
              "validate-label": "Login!",
              onValidate: v[5] || (v[5] = (y) => n()),
              onReset: v[6] || (v[6] = (y) => c()),
              state: i
            }, null, 8, ["state"])) : x("", !0)
          ])
        ])
      ], 64))
    ], 64));
  }
}, ut = /* @__PURE__ */ ae({
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
    const o = ce(), l = t, s = fe(o, "views."), a = J(!1);
    we(() => {
      a.value = !0;
    }), Tt(() => {
      a.value = !1;
    });
    const m = M("panels"), i = M("panel");
    return (c, n) => (d(), b(_e, {
      value: l.name
    }, {
      default: r(() => [
        l.state ? (d(), b(xe, {
          key: 0,
          state: l.state,
          delay: ""
        }, null, 8, ["state"])) : x("", !0),
        p(nt, { class: "ma-4" }, {
          default: r(() => [
            (d(), b(je, {
              to: "#app-bar-sheet-title",
              disabled: !a.value || e(m).panel != l.name
            }, [
              l.icon ? (d(), b(Z, {
                key: 0,
                icon: l.icon
              }, null, 8, ["icon"])) : x("", !0),
              F(" " + le(l.title), 1)
            ], 8, ["disabled"])),
            (d(), b(je, {
              to: "#app-bar-right",
              disabled: !a.value || e(m).panel != l.name
            }, [
              g(c.$slots, "append-title"),
              l.help ? (d(), b(N, {
                key: 0,
                class: "ml-3",
                href: l.help,
                panels: "new",
                icon: "mdi-information-outline"
              }, null, 8, ["href"])) : x("", !0)
            ], 8, ["disabled"])),
            g(c.$slots, "top"),
            g(c.$slots, "default", {}, () => [
              e(s) ? (d(), b(Bl, {
                key: 0,
                modelValue: e(i).view,
                "onUpdate:modelValue": n[0] || (n[0] = (u) => e(i).view = u)
              }, {
                default: r(() => [
                  (d(!0), A(_, null, H(e(s), (u, v) => (d(), b(Dl, {
                    key: u,
                    value: u
                  }, {
                    default: r(() => [
                      g(c.$slots, v)
                    ]),
                    _: 2
                  }, 1032, ["value"]))), 128))
                ]),
                _: 3
              }, 8, ["modelValue"])) : x("", !0)
            ]),
            g(c.$slots, "bottom")
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["value"]));
  }
}), dt = /* @__PURE__ */ ae({
  __name: "OxView",
  props: {
    /** default tab title */
    title: String
  },
  setup(t) {
    const o = t, l = J(null), s = ce(), a = fe(s, "tab.", { exclude: "tab.default" }), m = fe(s, "window.");
    return (i, c) => e(a) && Object.keys(e(a)).length ? (d(), A(_, { key: 0 }, [
      p(Fl, {
        modelValue: l.value,
        "onUpdate:modelValue": c[0] || (c[0] = (n) => l.value = n)
      }, {
        default: r(() => [
          e(s).default ? g(i.$slots, "tab", { key: 0 }, () => [
            p(We, {
              text: o == null ? void 0 : o.title,
              value: "default"
            }, null, 8, ["text"])
          ]) : x("", !0),
          (d(!0), A(_, null, H(e(a), (n, u) => (d(), b(We, { value: n }, {
            default: r(() => [
              g(i.$slots, u)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"]),
      p(lt, {
        modelValue: l.value,
        "onUpdate:modelValue": c[1] || (c[1] = (n) => l.value = n)
      }, {
        default: r(() => [
          e(s).default ? (d(), b(_e, {
            key: 0,
            value: "default"
          }, {
            default: r(() => [
              g(i.$slots, "default")
            ]),
            _: 3
          })) : x("", !0),
          (d(!0), A(_, null, H(e(m), (n, u) => (d(), b(_e, { value: n }, {
            default: r(() => [
              g(i.$slots, u)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"])
    ], 64)) : g(i.$slots, "default", { key: 1 });
  }
}), xa = { class: "mb-3" }, $a = /* @__PURE__ */ ae({
  __name: "OxModelEdit",
  props: {
    repo: {},
    empty: {},
    initial: {},
    name: {},
    url: {},
    saved: { type: Function }
  },
  setup(t, { expose: o }) {
    const l = t, { editor: s, edited: a } = Kt({ props: l });
    P(() => s.repo.use);
    const { value: m } = De(s);
    return o({ editor: s, edited: a, value: m }), (i, c) => (d(), A(_, null, [
      p(xe, {
        state: e(s).state
      }, null, 8, ["state"]),
      ue("div", xa, [
        e(a) ? (d(), b(Re, {
          key: 0,
          onValidate: c[0] || (c[0] = (n) => e(s).save()),
          onReset: c[1] || (c[1] = (n) => e(s).discard()),
          state: e(s).state,
          "validate-disabled": !e(s).valid
        }, null, 8, ["state", "validate-disabled"])) : x("", !0)
      ]),
      p(Ml, null, {
        default: r(() => [
          g(i.$slots, "default", {
            editor: e(s),
            edited: e(a),
            value: e(m),
            model: e(s).repo.use
          })
        ]),
        _: 3
      })
    ], 64));
  }
}), Sa = /* @__PURE__ */ ae({
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
    const o = ce(), l = fe(o, "views.list."), s = fe(o, "item."), a = fe(o, "views.detail.edit."), m = Xe("filters"), i = t, c = M("context"), { panel: n, list: u, items: v, next: y, prev: $ } = M("panel") ?? jt({ props: i }), T = n.panels, j = P(() => {
      var S;
      return c.user.can([n.model, (S = n.value) != null && S.id ? "change" : "add"]);
    }), { showFilters: z } = De(n), k = P(() => [
      ...i.headers,
      { key: "actions", title: V("actions") }
    ]);
    function w(S) {
      n.value.value = S;
    }
    const G = P(() => ({
      panel: n,
      panels: T,
      list: u,
      items: v,
      context: c,
      value: n.value
    }));
    return Y(() => Object.values(u.filters), () => u.load()), (S, O) => (d(), b(ut, {
      name: i.name,
      title: e(n).title,
      icon: e(n).icon,
      state: e(u).state,
      index: i.index
    }, me({
      "append-title": r(() => [
        g(S.$slots, "append-title", ee(te(G.value))),
        e(n).view.startsWith("list.") ? (d(), b(qe, {
          key: 0,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: r(() => [
            g(S.$slots, "nav.list", ee(te(G.value))),
            e(m) ? (d(), b(N, {
              key: 0,
              title: e(z) ? e(V)("filters.hide") : e(V)("filters.show"),
              "aria-label": e(z) ? e(V)("filters.hide") : e(V)("filters.show"),
              onClick: O[0] || (O[0] = (E) => z.value = !e(z)),
              active: e(z)
            }, {
              default: r(() => [
                p(Z, {
                  icon: e(m).icon
                }, null, 8, ["icon"])
              ]),
              _: 1
            }, 8, ["title", "aria-label", "active"])) : x("", !0)
          ]),
          _: 3
        })) : e(n).view.startsWith("detail.") && e(n).value ? (d(), b(qe, {
          key: 1,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: r(() => [
            g(S.$slots, "nav.detail", ee(te(G.value))),
            e(n).view == "detail.edit" && e(n).value ? (d(), b(at, { key: 0 }, {
              activator: r(({ props: E }) => [
                p(N, q({ "prepend-icon": "mdi-dots-vertical" }, E), {
                  default: r(() => [
                    F(le(e(V)("actions")), 1)
                  ]),
                  _: 2
                }, 1040)
              ]),
              default: r(() => [
                p(pe, null, {
                  default: r(() => [
                    g(S.$slots, "item.actions", {
                      value: e(n).value
                    })
                  ]),
                  _: 3
                })
              ]),
              _: 3
            })) : x("", !0),
            p(N, {
              disabled: !e($),
              title: e(V)("prev"),
              "aria-label": e(V)("prev"),
              onClick: O[1] || (O[1] = Q((E) => e(n).show({ value: e($) }), ["stop"]))
            }, {
              default: r(() => [
                p(Z, { icon: "mdi-chevron-left" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"]),
            p(N, {
              disabled: !e(y),
              title: e(V)("next"),
              "aria-label": e(V)("next"),
              onClick: O[2] || (O[2] = Q((E) => e(n).show({ value: e(y) }), ["stop"]))
            }, {
              default: r(() => [
                p(Z, { icon: "mdi-chevron-right" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"])
          ]),
          _: 3
        })) : x("", !0),
        p(El, {
          class: "ml-3",
          color: "secondary",
          modelValue: e(n).view,
          "onUpdate:modelValue": O[4] || (O[4] = (E) => e(n).view = E),
          density: "compact",
          variant: "tonal",
          mandatory: ""
        }, {
          default: r(() => {
            var E;
            return [
              p(N, {
                value: "list.table",
                title: e(V)("panels.nav.table"),
                "aria-label": e(V)("panels.nav.table")
              }, {
                default: r(() => [
                  p(Z, null, {
                    default: r(() => O[5] || (O[5] = [
                      F("mdi-table")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"]),
              e(o)["views.list.cards"] ? (d(), b(N, {
                key: 0,
                value: "list.cards",
                title: e(V)("panels.nav.cards"),
                "aria-label": e(V)("panels.nav.cards")
              }, {
                default: r(() => [
                  p(Z, null, {
                    default: r(() => O[6] || (O[6] = [
                      F("mdi-card-account-details")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : x("", !0),
              e(o)["views.list.kanban"] ? (d(), b(N, {
                key: 1,
                value: "list.kanban",
                title: e(V)("panels.nav.kanban"),
                "aria-label": e(V)("panels.nav.kanban")
              }, {
                default: r(() => [
                  p(Z, null, {
                    default: r(() => O[7] || (O[7] = [
                      F("mdi-view-column")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : x("", !0),
              e(a) ? (d(), b(N, {
                key: 2,
                value: "detail.add",
                onClick: O[3] || (O[3] = Q((L) => e(n).create(), ["stop"])),
                title: e(V)("panels.nav.add"),
                "aria-label": e(V)("panels.nav.add")
              }, {
                default: r(() => [
                  p(Z, null, {
                    default: r(() => O[8] || (O[8] = [
                      F("mdi-plus-box")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : x("", !0),
              e(o)["views.detail.edit"] || e(a) ? (d(), b(N, {
                key: 3,
                value: "detail.edit",
                disabled: !((E = e(n).value) != null && E.id),
                title: e(V)("panels.nav.edit"),
                "aria-label": e(V)("panels.nav.edit")
              }, {
                default: r(() => [
                  p(Z, null, {
                    default: r(() => O[9] || (O[9] = [
                      F("mdi-pencil")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"])) : x("", !0),
              g(S.$slots, "nav.views", ee(te(G.value)))
            ];
          }),
          _: 3
        }, 8, ["modelValue"])
      ]),
      top: r(() => [
        i.warning ? (d(), b(ge, {
          key: 0,
          type: "warning",
          variant: "tonal",
          text: i.warning
        }, null, 8, ["text"])) : x("", !0),
        g(S.$slots, "top"),
        _t(p(it, {
          ref_key: "filters",
          ref: m,
          search: i.search,
          "teleport-to": "#panel-list-actions"
        }, {
          default: r((E) => [
            g(S.$slots, "list.filters", ee(te(E)))
          ]),
          _: 3
        }, 8, ["search"]), [
          [It, e(n).view.startsWith("list.") && e(z)]
        ])
      ]),
      _: 2
    }, [
      e(o)["views.list.table"] ? void 0 : {
        name: "views.list.table",
        fn: r(() => [
          p(rt, {
            headers: k.value,
            edit: ""
          }, me({ _: 2 }, [
            H(e(s), (E, L) => ({
              name: L,
              fn: r((de) => [
                g(S.$slots, L, ee(te(de)))
              ])
            }))
          ]), 1032, ["headers"])
        ]),
        key: "0"
      },
      H(e(l), (E, L) => ({
        name: L,
        fn: r(() => [
          g(S.$slots, L, ee(te(G.value)))
        ])
      })),
      (e(o)["views.detail.edit"] || e(a)) && j.value ? {
        name: "views.detail.edit",
        fn: r(() => [
          p(e(dt), {
            title: e(V)(`models.${e(n).model.entity}`)
          }, me({ _: 2 }, [
            H(e(a), (E, L) => ({
              name: E,
              fn: r(() => [
                g(S.$slots, L, {
                  saved: w,
                  value: e(n).value
                })
              ])
            }))
          ]), 1032, ["title"])
        ]),
        key: "1"
      } : void 0
    ]), 1032, ["name", "title", "icon", "state", "index"]));
  }
}), Oa = /* @__PURE__ */ ae({
  __name: "OxPanelNav",
  props: {
    title: {},
    icon: {},
    value: {},
    url: {},
    permissions: {},
    type: {},
    items: {}
  },
  setup(t) {
    const o = t, l = M("panels");
    return P(() => !o.auto || panel.name == o.name), (s, a) => (d(), b(se, {
      value: o.panel,
      active: e(l).panel == o.panel,
      "prepend-icon": o.icon,
      title: o.title,
      onClick: a[0] || (a[0] = Q((m) => e(l).show(o), ["stop"]))
    }, null, 8, ["value", "active", "prepend-icon", "title"]));
  }
}), Ca = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OxAction: Ee,
  OxActionModelDelete: la,
  OxActions: aa,
  OxApp: da,
  OxAutocomplete: va,
  OxComponent: pa,
  OxFieldDetails: Ie,
  OxFormList: ya,
  OxListFilters: it,
  OxListKanban: ga,
  OxListTable: rt,
  OxLogin: ha,
  OxModelEdit: $a,
  OxModelPanel: Sa,
  OxPanel: ut,
  OxPanelNav: Oa,
  OxStateAlert: xe,
  OxValidationBtn: Re,
  OxView: dt
}, Symbol.toStringTag, { value: "Module" })), Ba = {
  el: "#app",
  delimiters: ["[[", "]]"],
  components: { ...Ca, ...ta }
};
export {
  Ba as App,
  Ee as OxAction,
  la as OxActionModelDelete,
  aa as OxActions,
  da as OxApp,
  va as OxAutocomplete,
  pa as OxComponent,
  Ie as OxFieldDetails,
  ya as OxFormList,
  it as OxListFilters,
  ga as OxListKanban,
  rt as OxListTable,
  ha as OxLogin,
  $a as OxModelEdit,
  Sa as OxModelPanel,
  ut as OxPanel,
  Oa as OxPanelNav,
  xe as OxStateAlert,
  Re as OxValidationBtn,
  dt as OxView
};
//# sourceMappingURL=components.js.map
