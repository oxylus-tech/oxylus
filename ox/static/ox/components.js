import { defineComponent as j, inject as _, unref as e, openBlock as c, createElementBlock as S, Fragment as C, createBlock as w, withModifiers as I, createCommentVNode as V, useSlots as F, renderSlot as b, normalizeProps as T, guardReactiveProps as L, ref as U, shallowRef as Q, watch as W, onMounted as be, computed as B, onScopeDispose as _e, createVNode as f, mergeProps as N, nextTick as Me, watchEffect as De, reactive as ee, onErrorCaptured as Ee, withCtx as o, createTextVNode as h, toDisplayString as E, createElementVNode as G, createSlots as z, h as Ne, renderList as M, normalizeClass as Ue, useTemplateRef as ye, withKeys as de, resolveComponent as je, Teleport as ce, mergeModels as Fe, useModel as Re, toRefs as Ge, withDirectives as We, vShow as Ke } from "vue";
import { useAction as ze, useI18n as X, useAppContext as Ye, usePanels as qe, defineAsyncComponent as He, tKeys as Je, filterSlots as J, useModelPanel as Qe, t as x } from "ox";
import { V as P, a as oe, m as Xe, b as Ze, c as et, d as tt, e as at, u as lt, f as st, g as nt, h as ot, i as it, j as rt, k as ut, l as pe, n as dt, o as ct, p as pt, q as mt, r as vt, s as ft, t as te, v as me, w as bt, x as yt, y as wt, z as we, A as D, B as gt, C as ae, D as kt, E as Vt, F as $t, G as ge, H as St, I as xt, J as Ot, K as ke, L as ht, M as Pt, N as H, O as Ct, P as le, Q as Tt, R as At, S as Lt, T as Bt, U as ve, W as It, X as _t } from "./VAlert-CTpFsU7b.js";
import { j as Mt, y as se, c as Dt, v as Et, S as Nt, r as Ut, h as jt } from "./vue-i18n-DJtD-m_6.js";
import { n as Ft, o as Rt, q as Gt, r as Ve, u as Wt, s as Kt, t as zt, v as Yt } from "./theme-CVupjJDc.js";
import { components as qt } from "ox/vendor";
const ie = /* @__PURE__ */ j({
  __name: "OxAction",
  props: {
    item: {},
    title: {},
    icon: {},
    color: {},
    button: { type: Boolean },
    confirm: {},
    permissions: {},
    run: {}
  },
  emits: ["completed"],
  setup(a, { emit: d }) {
    const t = a, n = d, l = _("context"), i = ze({ user: l.user, emits: n }, t);
    async function r(...p) {
      await i.run(...p);
    }
    return (p, u) => e(i).allowed ? (c(), S(C, { key: 0 }, [
      t.button ? (c(), w(P, {
        key: 0,
        variant: "text",
        color: t.color,
        icon: t.icon,
        title: t.title,
        "aria-label": t.title,
        onClick: I(r, ["stop"])
      }, null, 8, ["color", "icon", "title", "aria-label"])) : (c(), w(oe, {
        key: 1,
        title: t.title,
        "base-color": t.color,
        "prepend-icon": t.icon,
        onClick: I(r, ["stop"])
      }, null, 8, ["title", "base-color", "prepend-icon"]))
    ], 64)) : V("", !0);
  }
}), Ht = /* @__PURE__ */ j({
  __name: "OxActionModelDelete",
  props: {
    item: {},
    button: { type: Boolean }
  },
  setup(a) {
    const { t: d } = Mt(), t = _("panels"), n = _("repos"), l = a;
    async function i(r, p) {
      return await n[p.constructor.entity].api().delete(p.$url(), { delete: l.item.id });
    }
    return (r, p) => (c(), w(ie, {
      item: l.item,
      button: l.button,
      icon: "mdi-delete",
      color: "error",
      title: e(d)("actions.delete"),
      confirm: e(d)("actions.delete.confirm"),
      permissions: ["delete", (u, s) => s.id],
      run: i,
      onCompleted: p[0] || (p[0] = (u) => {
        var s;
        return (s = e(t)) == null ? void 0 : s.show();
      })
    }, null, 8, ["item", "button", "title", "confirm", "permissions"]));
  }
}), Jt = {
  __name: "OxActions",
  props: {
    // Action's Props
    value: Object,
    dense: { type: Boolean, default: !1 },
    button: { type: Boolean, default: !1 },
    exclude: { type: Array }
  },
  setup(a) {
    F();
    const d = a;
    return (t, n) => (c(), S(C, null, [
      b(t.$slots, "before", T(L(d))),
      b(t.$slots, "default", T(L(d))),
      b(t.$slots, "after", T(L(d)))
    ], 64));
  }
};
function Qt(a) {
  const d = Q(a());
  let t = -1;
  function n() {
    clearInterval(t);
  }
  function l() {
    n(), Me(() => d.value = a());
  }
  function i(r) {
    const p = r ? getComputedStyle(r) : {
      transitionDuration: 0.2
    }, u = parseFloat(p.transitionDuration) * 1e3 || 200;
    if (n(), d.value <= 0) return;
    const s = performance.now();
    t = window.setInterval(() => {
      const v = performance.now() - s + u;
      d.value = Math.max(a() - v, 0), d.value <= 0 && n();
    }, u);
  }
  return _e(n), {
    clear: n,
    time: d,
    start: i,
    reset: l
  };
}
const Xt = Ft({
  multiLine: Boolean,
  text: String,
  timer: [Boolean, String],
  timeout: {
    type: [Number, String],
    default: 5e3
  },
  vertical: Boolean,
  ...Xe({
    location: "bottom"
  }),
  ...Ze(),
  ...et(),
  ...tt(),
  ...Rt(),
  ...Gt(at({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
}, "VSnackbar"), Zt = Ve()({
  name: "VSnackbar",
  props: Xt(),
  emits: {
    "update:modelValue": (a) => !0
  },
  setup(a, d) {
    let {
      slots: t
    } = d;
    const n = Wt(a, "modelValue"), {
      positionClasses: l
    } = lt(a), {
      scopeId: i
    } = st(), {
      themeClasses: r
    } = Kt(a), {
      colorClasses: p,
      colorStyles: u,
      variantClasses: s
    } = nt(a), {
      roundedClasses: v
    } = ot(a), m = Qt(() => Number(a.timeout)), g = U(), k = U(), y = Q(!1), O = Q(0), $ = U(), R = _(it, void 0);
    zt(() => !!R, () => {
      const A = mt();
      De(() => {
        $.value = A.mainStyles.value;
      });
    }), W(n, Y), W(() => a.timeout, Y), be(() => {
      n.value && Y();
    });
    let Z = -1;
    function Y() {
      m.reset(), window.clearTimeout(Z);
      const A = Number(a.timeout);
      if (!n.value || A === -1) return;
      const K = Yt(k.value);
      m.start(K), Z = window.setTimeout(() => {
        n.value = !1;
      }, A);
    }
    function Ce() {
      m.reset(), window.clearTimeout(Z);
    }
    function Te() {
      y.value = !0, Ce();
    }
    function re() {
      y.value = !1, Y();
    }
    function Ae(A) {
      O.value = A.touches[0].clientY;
    }
    function Le(A) {
      Math.abs(O.value - A.changedTouches[0].clientY) > 50 && (n.value = !1);
    }
    function Be() {
      y.value && re();
    }
    const Ie = B(() => a.location.split(" ").reduce((A, K) => (A[`v-snackbar--${K}`] = !0, A), {}));
    return rt(() => {
      const A = pe.filterProps(a), K = !!(t.default || t.text || a.text);
      return f(pe, N({
        ref: g,
        class: ["v-snackbar", {
          "v-snackbar--active": n.value,
          "v-snackbar--multi-line": a.multiLine && !a.vertical,
          "v-snackbar--timer": !!a.timer,
          "v-snackbar--vertical": a.vertical
        }, Ie.value, l.value, a.class],
        style: [$.value, a.style]
      }, A, {
        modelValue: n.value,
        "onUpdate:modelValue": (q) => n.value = q,
        contentProps: N({
          class: ["v-snackbar__wrapper", r.value, p.value, v.value, s.value],
          style: [u.value],
          onPointerenter: Te,
          onPointerleave: re
        }, A.contentProps),
        persistent: !0,
        noClickAnimation: !0,
        scrim: !1,
        scrollStrategy: "none",
        _disableGlobalStack: !0,
        onTouchstartPassive: Ae,
        onTouchend: Le,
        onAfterLeave: Be
      }, i), {
        default: () => {
          var q, ue;
          return [dt(!1, "v-snackbar"), a.timer && !y.value && f("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [f(ct, {
            ref: k,
            color: typeof a.timer == "string" ? a.timer : "info",
            max: a.timeout,
            "model-value": m.time.value
          }, null)]), K && f("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((q = t.text) == null ? void 0 : q.call(t)) ?? a.text, (ue = t.default) == null ? void 0 : ue.call(t)]), t.actions && f(pt, {
            defaults: {
              VBtn: {
                variant: "text",
                ripple: !1,
                slim: !0
              }
            }
          }, {
            default: () => [f("div", {
              class: "v-snackbar__actions"
            }, [t.actions({
              isActive: n
            })])]
          })];
        },
        activator: t.activator
      });
    }), ut({}, g);
  }
});
var fe;
const ea = /* @__PURE__ */ j({
  __name: "OxApp",
  props: {
    apiUrl: {},
    dataEl: { default: (fe = document.body.dataset) == null ? void 0 : fe.appData },
    models: {},
    data: {}
  },
  setup(a) {
    const { t: d } = X(), t = F(), n = a, l = ee({ drawer: !0 }), i = Ye(n), r = qe();
    return W(() => [i.state.state, i.state.data], () => {
      i.showState = !0;
    }), Ee((p, u, s) => {
      i.state.error(`${p}`);
    }), (p, u) => (c(), w(vt, null, {
      default: o(() => [
        f(Zt, {
          modelValue: e(i).showState,
          "onUpdate:modelValue": u[0] || (u[0] = (s) => e(i).showState = s),
          color: e(i).state.color,
          "multi-line": ""
        }, {
          default: o(() => [
            h(E(e(i).state.data), 1)
          ]),
          _: 1
        }, 8, ["modelValue", "color"]),
        f(ft, { color: "primary" }, {
          prepend: o(() => [
            f(te, {
              icon: "mdi-apps",
              title: e(d)("nav.panels"),
              "aria-label": e(d)("nav.panels"),
              onClick: u[1] || (u[1] = I((s) => l.drawer = !l.drawer, ["stop"]))
            }, null, 8, ["title", "aria-label"]),
            e(t)["app-nav"] && !l.drawer2 ? (c(), w(te, {
              key: 0,
              icon: "mdi-menu",
              onClick: u[2] || (u[2] = (s) => {
                l.drawer2 = !0, l.drawer = !1;
              })
            })) : V("", !0)
          ]),
          default: o(() => [
            f(me, { id: "app-bar-sheet-title" }),
            f(me, { id: "app-bar-title" }, {
              default: o(() => [
                b(p.$slots, "title", { context: e(i) })
              ]),
              _: 3
            }),
            f(bt),
            u[5] || (u[5] = G("div", {
              id: "app-bar-right",
              class: "mr-3"
            }, null, -1)),
            b(p.$slots, "app-bar-right", { context: e(i) })
          ]),
          _: 3
        }),
        e(t)["nav-list"] ? (c(), w(yt, {
          key: 0,
          theme: "dark",
          modelValue: l.drawer,
          "onUpdate:modelValue": u[3] || (u[3] = (s) => l.drawer = s)
        }, z({
          default: o(() => [
            b(p.$slots, "nav-start", { context: e(i) }),
            b(p.$slots, "nav-list", { context: e(i) }),
            b(p.$slots, "nav-end", { context: e(i) })
          ]),
          _: 2
        }, [
          e(t)["app-nav"] ? {
            name: "append",
            fn: o(() => [
              u[6] || (u[6] = G("div", { class: "text-right pa-3" }, null, -1))
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue"])) : V("", !0),
        f(wt, null, {
          default: o(() => [
            b(p.$slots, "main", {}, () => [
              f(we, {
                modelValue: e(r).panel,
                "onUpdate:modelValue": u[4] || (u[4] = (s) => e(r).panel = s)
              }, {
                default: o((s) => [
                  b(p.$slots, "default", N(s, { context: e(i) }))
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
}), ta = {
  props: {
    src: String,
    is: String
  },
  setup(a) {
    const d = Q(null), t = B(() => {
      if (a.is)
        return a.is;
      let l = a.src.substring(a.src.lastIndexOf("/") + 1);
      if (l && (l = l.substring(0, l.indexOf("."))), !l)
        throw Error(
          "`is` not provided and could not be deducted from `src`."
        );
      return l;
    });
    function n() {
      d.value = He(a.src, t.value);
    }
    return W(() => a.src, n), n(), () => Ne(d.value, a);
  }
}, aa = { class: "password-error" }, ne = {
  __name: "OxFieldDetails",
  props: {
    state: Object,
    errors: Array
  },
  setup(a) {
    const d = a;
    return (t, n) => d.errors ? (c(!0), S(C, { key: 0 }, M(d.errors, (l) => (c(), S("div", aa, [
      f(D, { icon: "mdi-alert-circle-outline" }),
      h(" " + E(l), 1)
    ]))), 256)) : V("", !0);
  }
}, $e = {
  __name: "OxListFilters",
  props: {
    search: String
  },
  setup(a, { expose: d }) {
    const { t } = X(), n = _("list"), l = a, i = B(() => {
      const u = n.filters;
      return u && Object.entries(u).some(
        ([s, v]) => !s.startsWith("page") && !s.startsWith("ordering") && !!v
      );
    }), r = B(() => i.value ? "mdi-filter-check" : "mdi-filter-outline");
    function p() {
      n.filters = {}, n.fetch();
    }
    return d({ icon: r, hasFilters: i, reset: p }), (u, s) => (c(), S("form", {
      onSubmit: s[2] || (s[2] = I((v) => e(n).fetch(), ["prevent"])),
      class: "width-full"
    }, [
      f(gt, {
        dense: "",
        color: "transparent"
      }, {
        default: o(() => [
          f(te, {
            icon: r.value,
            readonly: ""
          }, null, 8, ["icon"]),
          l.search && e(n).filters ? (c(), w(ae, {
            key: 0,
            label: e(t)("filters.search"),
            density: "compact",
            class: "ml-2",
            modelValue: e(n).filters[l.search],
            "onUpdate:modelValue": s[0] || (s[0] = (v) => e(n).filters[l.search] = v),
            "hide-details": ""
          }, null, 8, ["label", "modelValue"])) : V("", !0),
          b(u.$slots, "default", {
            list: e(n),
            filters: e(n).filters
          }),
          f(P, {
            onClick: s[1] || (s[1] = I((v) => e(n).fetch(), ["stop"])),
            class: "ml-2",
            icon: "mdi-check",
            "aria-label": u.$t("filters.apply"),
            title: e(t)("filters.apply")
          }, null, 8, ["aria-label", "title"]),
          i.value ? (c(), w(P, {
            key: 1,
            onClick: I(p, ["stop"]),
            icon: "mdi-backspace",
            "aria-label": e(t)("filters.reset"),
            title: e(t)("filters.reset")
          }, null, 8, ["aria-label", "title"])) : V("", !0)
        ]),
        _: 3
      })
    ], 32));
  }
}, la = Ve()({
  name: "VSlideGroupItem",
  props: kt(),
  emits: {
    "group:selected": (a) => !0
  },
  setup(a, d) {
    let {
      slots: t
    } = d;
    const n = Vt(a, $t);
    return () => {
      var l;
      return (l = t.default) == null ? void 0 : l.call(t, {
        isSelected: n.isSelected.value,
        select: n.select,
        toggle: n.toggle,
        selectedClass: n.selectedClass.value
      });
    };
  }
}), sa = {
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
  setup(a, { emit: d }) {
    const t = d, n = _("list"), l = a, i = B(() => n.items);
    function r(s) {
      return s = s % l.colors.length, l.colorVariant ? l.colors[s] + "-" + l.colorVariant : l.colors[s];
    }
    function p(s, v, m) {
      s[m] ? !s[m].includes(v) && s[m].push(v) : s[m] = [v];
    }
    const u = B(() => {
      const s = {};
      if (i.value)
        for (var v of i.value) {
          const g = v[l.field];
          if (Array.isArray(g))
            if (g.length)
              for (var m of g)
                p(s, v, m);
            else
              p(s, v, null);
          else
            p(s, v, g);
        }
      return s;
    });
    return (s, v) => (c(), w(ge, null, {
      default: o(() => [
        f(St, null, {
          default: o(() => [
            (c(!0), S(C, null, M(l.headers, (m, g) => (c(), w(la, {
              key: m.value
            }, {
              default: o(({ selectedClass: k }) => [
                f(xt, {
                  width: "400",
                  class: Ue(["ma-3", k]),
                  color: r(g),
                  lines: "two"
                }, {
                  default: o(() => [
                    f(Ot, null, {
                      default: o(() => [
                        h(E(m.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    f(ke, {
                      "bg-color": r(g)
                    }, {
                      default: o(() => [
                        u.value && u.value[m.value] ? (c(!0), S(C, { key: 0 }, M(u.value[m.value], (y) => b(s.$slots, "item", {
                          key: y.id,
                          header: m,
                          item: y
                        }, () => [
                          f(oe, {
                            title: y[l.itemTitle],
                            value: l.itemValue && y[l.itemValue],
                            onClick: (O) => t("click", y)
                          }, {
                            append: o(() => [
                              b(s.$slots, "item.action")
                            ]),
                            _: 2
                          }, 1032, ["title", "value", "onClick"])
                        ])), 128)) : V("", !0)
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
}, Se = /* @__PURE__ */ j({
  __name: "OxListTable",
  props: {
    // list: Object,
    headers: Array,
    edit: Boolean
  },
  setup(a) {
    const { t: d } = X(), t = F(), n = se(t, "item.", { exclude: ["item.actions"] }), l = _("panels"), i = _("list"), r = new Dt("change"), p = a, u = B(() => p.headers.reduce((m, g) => (m.push(
      typeof g == "string" ? { key: g, title: d(Je.field(g)) } : g
    ), m), []));
    function s(m) {
      return i.fetch({
        filters: {
          page: m.page,
          page_size: m.itemsPerPage,
          ordering: m.sortBy.map(({ key: g, order: k }) => k == "asc" ? g : `-${g}`)
        }
      });
    }
    function v(m, g) {
      l.show({ view: "detail.edit", value: g });
    }
    return (m, g) => {
      var k;
      return c(), w(ht, {
        items: e(i).items,
        "item-index": "id",
        "items-length": e(i).count || e(i).items.length,
        loading: (k = e(i).state) == null ? void 0 : k.isProcessing,
        headers: u.value,
        "onUpdate:options": s
      }, z({
        loading: o(() => [
          f(Pt, { type: "table-row@10" })
        ]),
        "item.actions": o(({ item: y }) => [
          a.edit ? (c(), w(ie, {
            key: 0,
            icon: "mdi-pencil",
            button: "",
            title: e(d)("actions.edit"),
            permissions: e(r),
            item: y,
            run: v
          }, null, 8, ["title", "permissions", "item"])) : V("", !0),
          b(m.$slots, "item.actions", {
            value: y,
            dense: !0,
            button: !0
          })
        ]),
        _: 2
      }, [
        M(e(n), (y, O) => ({
          name: O,
          fn: o(($) => [
            b(m.$slots, O, T(L($)))
          ])
        }))
      ]), 1032, ["items", "items-length", "loading", "headers"]);
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
  setup(a) {
    const d = F(), t = a;
    let n = U(!1);
    W(() => t.state.state, (r) => {
      t.delay && r == Et.PROCESSING && (n.value = !1, window.setTimeout(() => {
        n.value = !0;
      }, 5e3));
    });
    const l = B(() => {
      var r;
      return ((r = t.state) == null ? void 0 : r.isProcessing) && (!t.delay || n.value);
    }), i = B(() => {
      var r, p;
      return (p = (r = t.state) == null ? void 0 : r.data) == null ? void 0 : p.messages;
    });
    return (r, p) => (c(), S(C, null, [
      t.state.isNone && e(d).none ? (c(), w(e(H), {
        key: 0,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        state: a.state,
        title: a.noneTitle
      }, {
        default: o(() => [
          b(r.$slots, "none", { state: a.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : l.value ? (c(), w(e(H), {
        key: 1,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: a.state,
        title: a.processingTitle
      }, {
        default: o(() => [
          b(r.$slots, "processing", { state: a.state }, () => [
            p[0] || (p[0] = h(" Data are being sent to server, please be patient. If this message persist you might wan't to retry. "))
          ])
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isError ? (c(), w(e(H), {
        key: 2,
        type: "error",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: a.state,
        title: a.errorTitle
      }, {
        default: o(() => [
          b(r.$slots, "error", { state: a.state }, () => [
            p[1] || (p[1] = h(" Oups... something wrong happened. "))
          ]),
          b(r.$slots, "error-detail", { state: a.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isOk ? (c(), w(e(H), {
        key: 3,
        type: "success",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: a.state,
        title: a.okTitle
      }, {
        default: o(() => [
          b(r.$slots, "ok", { state: a.state }, () => [
            p[2] || (p[2] = G("p", null, "Congrats! Data have been updated.", -1))
          ]),
          i.value ? (c(), S(C, { key: 0 }, [
            f(Ct),
            (c(!0), S(C, null, M(i.value, (u) => (c(), S("p", null, E(u), 1))), 256))
          ], 64)) : V("", !0),
          b(r.$slots, "ok-detail", { state: a.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : V("", !0),
      b(r.$slots, "default", {
        state: t.state
      })
    ], 64));
  }
}, na = { class: "text-right" }, Oe = {
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
  setup(a, { emit: d }) {
    const t = d, n = a;
    return (l, i) => (c(), S("div", na, [
      f(e(P), {
        color: "error",
        class: "me-2",
        "prepend-icon": n.resetIcon,
        onClick: i[0] || (i[0] = (r) => t("reset")),
        disabled: n.disabled
      }, {
        default: o(() => [
          b(l.$slots, "reset", {}, () => [
            h(E(n.resetLabel), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]),
      n.state.isSending ? (c(), w(e(P), {
        key: 0,
        color: "primary",
        "prepend-icon": "mdi-content-save",
        disabled: ""
      }, {
        default: o(() => i[2] || (i[2] = [
          h(" Saving ")
        ])),
        _: 1
      })) : (c(), w(e(P), {
        key: 1,
        color: "primary",
        "prepend-icon": n.validateIcon,
        onClick: i[1] || (i[1] = (r) => t("validate")),
        disabled: n.disabled || n.validateDisabled
      }, {
        default: o(() => [
          b(l.$slots, "validate", {}, () => [
            h(E(n.validateLabel), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]))
    ]));
  }
}, oa = { key: 0 }, ia = { class: "text-right mt-3" }, ra = {
  __name: "OxLogin",
  props: {
    next: { type: String },
    url: { type: String }
  },
  emits: ["save", "saved"],
  setup(a, { emit: d }) {
    const t = ye("password"), n = a, l = ee({
      username: "",
      password: ""
    }), i = U(!1), r = ee(new Nt());
    function p(s = !0) {
      Ut(l, { username: "", password: "" }), s && r.none();
    }
    async function u() {
      r.processing();
      try {
        const s = await fetch(n.url, {
          method: "POST",
          headers: jt.axiosConfig.headers,
          body: JSON.stringify(l)
        });
        s.status == 200 ? (l.credentials = "", l.password = "", r.ok(await s.json()), n.next && (window.location.href = n.next)) : r.error(await s.json());
      } catch (s) {
        r.ok((s == null ? void 0 : s.message) || s);
      }
    }
    return (s, v) => (c(), S(C, null, [
      f(e(xe), { state: r }, {
        none: o(({ state: m }) => v[7] || (v[7] = [
          G("p", null, "Please enter your credentials in order too proceed...", -1)
        ])),
        "ok-detail": o(({ state: m }) => [
          n.next ? (c(), S("p", oa, [
            v[8] || (v[8] = h("You soon will be redirected to ")),
            G("i", null, E(n.next), 1)
          ])) : V("", !0)
        ]),
        error: o(({ state: m }) => {
          var g, k;
          return [
            f(ne, {
              errors: (g = m.data) == null ? void 0 : g.username
            }, null, 8, ["errors"]),
            f(ne, {
              errors: (k = m.data) == null ? void 0 : k.password
            }, null, 8, ["errors"])
          ];
        }),
        _: 1
      }, 8, ["state"]),
      r.isOk ? V("", !0) : (c(), S(C, { key: 0 }, [
        f(ae, {
          variant: "underlined",
          label: "Enter login",
          modelValue: l.username,
          "onUpdate:modelValue": v[0] || (v[0] = (m) => l.username = m),
          onKeyup: v[1] || (v[1] = de(I((m) => e(t).focus(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue"]),
        f(ae, {
          variant: "underlined",
          ref: "password",
          label: "Enter password",
          modelValue: l.password,
          "onUpdate:modelValue": v[2] || (v[2] = (m) => l.password = m),
          type: i.value ? "text" : "password",
          "append-icon": i.value ? "mdi-eye" : "mdi-eye-off",
          "onClick:append": v[3] || (v[3] = (m) => i.value = !i.value),
          onKeyup: v[4] || (v[4] = de(I((m) => u(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue", "type", "append-icon"]),
        G("div", ia, [
          b(s.$slots, "default", {
            value: l.password
          }, () => [
            l.username && l.password ? (c(), w(Oe, {
              key: 0,
              "validate-label": "Login!",
              onValidate: v[5] || (v[5] = (m) => u()),
              onReset: v[6] || (v[6] = (m) => p()),
              state: r
            }, null, 8, ["state"])) : V("", !0)
          ])
        ])
      ], 64))
    ], 64));
  }
}, he = /* @__PURE__ */ j({
  __name: "OxPanel",
  props: {
    index: {},
    state: {},
    help: {},
    name: {},
    title: {},
    icon: {}
  },
  setup(a) {
    const d = F(), t = a, n = J(d, "views."), l = U(!1);
    be(() => {
      l.value = !0;
    });
    const i = _("panels");
    return (r, p) => {
      const u = je("ox-state-alert");
      return c(), w(le, {
        value: t.name
      }, {
        default: o(() => [
          t.state ? (c(), w(u, {
            key: 0,
            state: t.state,
            delay: ""
          }, null, 8, ["state"])) : V("", !0),
          f(ge, { class: "ma-4" }, {
            default: o(() => [
              (c(), w(ce, {
                to: "#app-bar-sheet-title",
                disabled: !l.value || e(i).panel != t.name
              }, [
                t.icon ? (c(), w(D, {
                  key: 0,
                  icon: t.icon
                }, null, 8, ["icon"])) : V("", !0),
                h(" " + E(t.title), 1)
              ], 8, ["disabled"])),
              (c(), w(ce, {
                to: "#app-bar-right",
                disabled: !l.value || e(i).panel != t.name
              }, [
                b(r.$slots, "append-title"),
                t.help ? (c(), w(P, {
                  key: 0,
                  class: "ml-3",
                  href: t.help,
                  panels: "new",
                  icon: "mdi-information-outline"
                }, null, 8, ["href"])) : V("", !0)
              ], 8, ["disabled"])),
              b(r.$slots, "top"),
              b(r.$slots, "default", {}, () => [
                e(n) ? (c(), w(Tt, {
                  key: 0,
                  modelValue: e(i).view,
                  "onUpdate:modelValue": p[0] || (p[0] = (s) => e(i).view = s)
                }, {
                  default: o(() => [
                    (c(!0), S(C, null, M(e(n), (s, v) => (c(), w(At, {
                      key: s,
                      value: s
                    }, {
                      default: o(() => [
                        b(r.$slots, v)
                      ]),
                      _: 2
                    }, 1032, ["value"]))), 128))
                  ]),
                  _: 3
                }, 8, ["modelValue"])) : V("", !0)
              ]),
              b(r.$slots, "bottom")
            ]),
            _: 3
          })
        ]),
        _: 3
      }, 8, ["value"]);
    };
  }
}), Pe = {
  __name: "OxModelEdit",
  props: /* @__PURE__ */ Fe({
    subtitle: String
  }, {
    value: {
      type: Object,
      default: () => null
    },
    valueModifiers: {}
  }),
  emits: ["update:value"],
  setup(a) {
    const { t: d } = X();
    _("context");
    const t = Re(a, "value"), n = B(() => {
      var m;
      return (m = t.value) == null ? void 0 : m.constructor;
    }), l = _("panels");
    function i(m) {
      l.value && m && (l.value.title = `Edit ${m.$title}`);
    }
    i(t.value), W(t, i);
    const r = U(null), p = F(), u = se(p, "tab.", { exclude: "tab.default" }), s = se(p, "window.", { exclude: "window.default" }), v = B(() => ({
      panels: l,
      value: t.value,
      model: n.value
    }));
    return (m, g) => t.value ? (c(), S(C, { key: 0 }, [
      e(u) && Object.keys(e(u)).length ? (c(), S(C, { key: 0 }, [
        f(Lt, {
          modelValue: r.value,
          "onUpdate:modelValue": g[0] || (g[0] = (k) => r.value = k)
        }, {
          default: o(() => [
            b(m.$slots, "tab.default", T(L(v.value)), () => [
              f(Bt, {
                text: e(d)(`models.${n.value.entity}`),
                value: "model"
              }, null, 8, ["text"])
            ]),
            (c(!0), S(C, null, M(e(u), (k, y) => b(m.$slots, y, N({ ref_for: !0 }, v.value))), 256))
          ]),
          _: 3
        }, 8, ["modelValue"]),
        f(we, {
          modelValue: r.value,
          "onUpdate:modelValue": g[1] || (g[1] = (k) => r.value = k)
        }, {
          default: o(() => [
            f(le, { value: "model" }, {
              default: o(() => [
                b(m.$slots, "window.default", T(L(v.value)))
              ]),
              _: 3
            }),
            (c(!0), S(C, null, M(e(s), (k, y) => (c(), w(le, { value: k }, {
              default: o(() => [
                b(m.$slots, y, N({ ref_for: !0 }, v.value))
              ]),
              _: 2
            }, 1032, ["value"]))), 256))
          ]),
          _: 3
        }, 8, ["modelValue"])
      ], 64)) : b(m.$slots, "window.default", T(N({ key: 1 }, v.value)))
    ], 64)) : (c(), S(C, { key: 1 }, [
      h(" Nothing to edit ")
    ], 64));
  }
}, ua = /* @__PURE__ */ j({
  __name: "OxModelPanel",
  props: {
    index: { default: "list.table" },
    state: {},
    help: {},
    name: {},
    title: {},
    icon: {},
    repo: {},
    search: {},
    view: {},
    headers: {}
  },
  setup(a) {
    const d = F(), t = J(d, "views.list."), n = J(d, "item."), l = J(d, "views.detail.edit."), i = ye("filters"), r = a, p = Qe({ props: r }), u = p.panels, s = p.list, { showFilters: v } = Ge(p), m = B(() => [
      ...r.headers,
      { key: "actions", title: x("actions") }
    ]), g = B(() => ({
      panel: p,
      panels: u,
      list: s,
      value: u.value
    }));
    return (k, y) => (c(), w(he, {
      name: r.name,
      title: e(p).title,
      icon: e(p).icon,
      state: e(s).state,
      index: r.index
    }, z({
      "append-title": o(() => {
        var O;
        return [
          b(k.$slots, "append-title", T(L(g.value))),
          e(u).view.startsWith("list.") ? (c(), w(ve, {
            key: 0,
            class: "ml-3",
            color: "secondary",
            density: "compact",
            variant: "tonal"
          }, {
            default: o(() => [
              b(k.$slots, "nav.list", T(L(g.value))),
              e(i) ? (c(), w(P, {
                key: 0,
                title: e(v) ? e(x)("filters.hide") : e(x)("filters.show"),
                "aria-label": e(v) ? e(x)("filters.hide") : e(x)("filters.show"),
                onClick: y[0] || (y[0] = ($) => v.value = !e(v)),
                active: e(v)
              }, {
                default: o(() => [
                  f(D, {
                    icon: e(i).icon
                  }, null, 8, ["icon"])
                ]),
                _: 1
              }, 8, ["title", "aria-label", "active"])) : V("", !0)
            ]),
            _: 3
          })) : e(u).view.startsWith("detail.") && ((O = e(u).value) != null && O.id) ? (c(), w(ve, {
            key: 1,
            class: "ml-3",
            color: "secondary",
            density: "compact",
            variant: "tonal"
          }, {
            default: o(() => [
              b(k.$slots, "nav.detail", T(L(g.value))),
              e(u).view == "detail.edit" && e(u).value ? (c(), w(It, { key: 0 }, {
                activator: o(({ props: $ }) => [
                  f(P, N({ "prepend-icon": "mdi-dots-vertical" }, $), {
                    default: o(() => [
                      h(E(e(x)("actions")), 1)
                    ]),
                    _: 2
                  }, 1040)
                ]),
                default: o(() => [
                  f(ke, null, {
                    default: o(() => [
                      b(k.$slots, "item.actions", {
                        value: e(u).value
                      })
                    ]),
                    _: 3
                  })
                ]),
                _: 3
              })) : V("", !0),
              f(P, {
                disabled: !e(s).prev,
                title: e(x)("prev"),
                "aria-label": e(x)("prev"),
                onClick: y[1] || (y[1] = I(($) => e(u).value = e(s).prev, ["stop"]))
              }, {
                default: o(() => [
                  f(D, { icon: "mdi-chevron-left" })
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"]),
              f(P, {
                disabled: !e(s).next,
                title: e(x)("next"),
                "aria-label": e(x)("next"),
                onClick: y[2] || (y[2] = I(($) => e(u).value = e(s).next, ["stop"]))
              }, {
                default: o(() => [
                  f(D, { icon: "mdi-chevron-right" })
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"])
            ]),
            _: 3
          })) : V("", !0),
          f(_t, {
            class: "ml-3",
            color: "secondary",
            modelValue: e(u).view,
            "onUpdate:modelValue": y[4] || (y[4] = ($) => e(u).view = $),
            density: "compact",
            variant: "tonal"
          }, {
            default: o(() => {
              var $;
              return [
                f(P, {
                  value: "list.table",
                  title: e(x)("panels.nav.table"),
                  "aria-label": e(x)("panels.nav.table")
                }, {
                  default: o(() => [
                    f(D, null, {
                      default: o(() => y[6] || (y[6] = [
                        h("mdi-table")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["title", "aria-label"]),
                e(d)["views.list.cards"] ? (c(), w(P, {
                  key: 0,
                  value: "list.cards",
                  title: e(x)("panels.nav.cards"),
                  "aria-label": e(x)("panels.nav.cards")
                }, {
                  default: o(() => [
                    f(D, null, {
                      default: o(() => y[7] || (y[7] = [
                        h("mdi-card-account-details")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["title", "aria-label"])) : V("", !0),
                e(d)["views.list.kanban"] ? (c(), w(P, {
                  key: 1,
                  value: "list.kanban",
                  title: e(x)("panels.nav.kanban"),
                  "aria-label": e(x)("panels.nav.kanban")
                }, {
                  default: o(() => [
                    f(D, null, {
                      default: o(() => y[8] || (y[8] = [
                        h("mdi-view-column")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["title", "aria-label"])) : V("", !0),
                e(d)["views.detail.add"] ? (c(), w(P, {
                  key: 2,
                  value: "detail.add",
                  onClick: y[3] || (y[3] = I((R) => e(p).create(), ["stop"])),
                  title: e(x)("panels.nav.add"),
                  "aria-label": e(x)("panels.nav.add")
                }, {
                  default: o(() => [
                    f(D, null, {
                      default: o(() => y[9] || (y[9] = [
                        h("mdi-plus-box")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["title", "aria-label"])) : V("", !0),
                e(d)["views.detail.edit"] || e(l) ? (c(), w(P, {
                  key: 3,
                  value: "detail.edit",
                  disabled: !(($ = e(u).value) != null && $.id),
                  title: e(x)("panels.nav.edit"),
                  "aria-label": e(x)("panels.nav.edit")
                }, {
                  default: o(() => [
                    f(D, null, {
                      default: o(() => y[10] || (y[10] = [
                        h("mdi-pencil")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["disabled", "title", "aria-label"])) : V("", !0),
                b(k.$slots, "nav.views", T(L(g.value)))
              ];
            }),
            _: 3
          }, 8, ["modelValue"])
        ];
      }),
      top: o(() => [
        We(f($e, {
          ref_key: "filters",
          ref: i,
          search: r.search,
          "teleport-to": "#panel-list-actions"
        }, {
          default: o((O) => [
            b(k.$slots, "list.filters", T(L(O)))
          ]),
          _: 3
        }, 8, ["search"]), [
          [Ke, e(u).view.startsWith("list.") && e(v)]
        ])
      ]),
      _: 2
    }, [
      e(d)["views.list.table"] ? void 0 : {
        name: "views.list.table",
        fn: o(() => [
          f(Se, {
            headers: m.value,
            edit: ""
          }, z({ _: 2 }, [
            M(e(n), (O, $) => ({
              name: $,
              fn: o((R) => [
                b(k.$slots, $, T(L(R)))
              ])
            }))
          ]), 1032, ["headers"])
        ]),
        key: "0"
      },
      M(e(t), (O, $) => ({
        name: $,
        fn: o(() => [
          b(k.$slots, $, T(L(g.value)))
        ])
      })),
      e(d)["views.detail.edit"] || e(l) ? {
        name: "views.detail.edit",
        fn: o(() => [
          f(Pe, {
            value: e(u).value,
            "onUpdate:value": y[5] || (y[5] = (O) => e(u).value = O)
          }, z({ _: 2 }, [
            M(e(l), (O, $) => ({
              name: O,
              fn: o((R) => [
                b(k.$slots, $, T(L(R)))
              ])
            }))
          ]), 1032, ["value"])
        ]),
        key: "1"
      } : void 0,
      e(d)["views.detail.add"] ? {
        name: "views.detail.add",
        fn: o(() => [
          b(k.$slots, "views.detail.add", N(g.value, {
            saved: (O) => e(p).created(O)
          }))
        ]),
        key: "2"
      } : void 0
    ]), 1032, ["name", "title", "icon", "state", "index"]));
  }
}), da = /* @__PURE__ */ j({
  __name: "OxPanelNav",
  props: {
    name: {},
    title: {},
    icon: {},
    panel: {},
    view: {},
    value: {},
    href: {},
    auto: { type: Boolean }
  },
  setup(a) {
    const d = a, t = _("panels");
    return B(() => !d.auto || panel.name == d.name), (n, l) => (c(), w(oe, {
      active: e(t).panel == d.name,
      "prepend-icon": d.icon,
      title: d.title,
      onClick: l[0] || (l[0] = I((i) => e(t).show(d), ["stop"]))
    }, null, 8, ["active", "prepend-icon", "title"]));
  }
}), ca = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OxAction: ie,
  OxActionModelDelete: Ht,
  OxActions: Jt,
  OxApp: ea,
  OxComponent: ta,
  OxFieldDetails: ne,
  OxListFilters: $e,
  OxListKanban: sa,
  OxListTable: Se,
  OxLogin: ra,
  OxModelEdit: Pe,
  OxModelPanel: ua,
  OxPanel: he,
  OxPanelNav: da,
  OxStateAlert: xe,
  OxValidationBtn: Oe
}, Symbol.toStringTag, { value: "Module" })), wa = {
  el: "#app",
  delimiters: ["[[", "]]"],
  components: { ...ca, ...qt }
};
export {
  wa as App,
  ie as OxAction,
  Ht as OxActionModelDelete,
  Jt as OxActions,
  ea as OxApp,
  ta as OxComponent,
  ne as OxFieldDetails,
  $e as OxListFilters,
  sa as OxListKanban,
  Se as OxListTable,
  ra as OxLogin,
  Pe as OxModelEdit,
  ua as OxModelPanel,
  he as OxPanel,
  da as OxPanelNav,
  xe as OxStateAlert,
  Oe as OxValidationBtn
};
//# sourceMappingURL=components.js.map
