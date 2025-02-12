import { defineComponent as K, inject as h, unref as e, openBlock as p, createElementBlock as S, Fragment as C, createBlock as w, withModifiers as I, createCommentVNode as $, useSlots as U, renderSlot as b, normalizeProps as A, guardReactiveProps as B, ref as N, shallowRef as Q, watch as G, onMounted as ye, computed as _, onScopeDispose as Me, createVNode as v, mergeProps as F, nextTick as De, watchEffect as Ee, reactive as ee, onErrorCaptured as Ke, withCtx as i, createTextVNode as P, toDisplayString as E, createElementVNode as R, createSlots as z, h as Ne, renderList as M, toRefs as Fe, normalizeClass as Ue, useTemplateRef as we, withKeys as ce, Teleport as pe, mergeModels as je, useModel as Re, withDirectives as Ge, vShow as We } from "vue";
import { useAction as ze, useI18n as X, useAppContext as Ye, defineAsyncComponent as qe, useList as He, tKeys as Je, filterSlots as J, useModelPanel as Qe, t as O } from "ox";
import { V as T, a as oe, m as Xe, b as Ze, c as et, d as tt, e as at, u as lt, f as st, g as nt, h as ot, i as it, j as rt, k as ut, l as me, n as dt, o as ct, p as pt, q as mt, r as vt, s as ft, t as te, v as ve, w as bt, x as yt, y as wt, z as ge, A as D, B as gt, C as ae, D as kt, E as $t, F as Vt, G as ke, H as St, I as xt, J as Ot, K as $e, L as ht, M as Pt, N as H, O as Ct, P as le, Q as Tt, R as At, S as Lt, T as Bt, U as fe, W as _t, X as It } from "./VAlert-CTpFsU7b.js";
import { j as Mt, x as se, b as Dt, w as Et, S as Kt, r as Nt, h as Ft } from "./vue-i18n-CcErOqM_.js";
import { n as Ut, o as jt, q as Rt, r as Ve, u as Gt, s as Wt, t as zt, v as Yt } from "./theme-CVupjJDc.js";
import { components as qt } from "ox/vendor";
const ie = /* @__PURE__ */ K({
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
  setup(l, { emit: r }) {
    const t = l, a = r, s = h("context"), o = ze({ user: s.user, emits: a }, t);
    async function n(...u) {
      await o.run(...u);
    }
    return (u, c) => e(o).allowed ? (p(), S(C, { key: 0 }, [
      t.button ? (p(), w(T, {
        key: 0,
        variant: "text",
        color: t.color,
        icon: t.icon,
        title: t.title,
        "aria-label": t.title,
        onClick: I(n, ["stop"])
      }, null, 8, ["color", "icon", "title", "aria-label"])) : (p(), w(oe, {
        key: 1,
        title: t.title,
        "base-color": t.color,
        "prepend-icon": t.icon,
        onClick: I(n, ["stop"])
      }, null, 8, ["title", "base-color", "prepend-icon"]))
    ], 64)) : $("", !0);
  }
}), Ht = /* @__PURE__ */ K({
  __name: "OxActionModelDelete",
  props: {
    item: {},
    button: { type: Boolean }
  },
  setup(l) {
    const { t: r } = Mt(), t = h("panel"), a = h("repos"), s = l;
    async function o(n, u) {
      return await a[u.constructor.entity].api().delete(u.$url(), { delete: s.item.id });
    }
    return (n, u) => (p(), w(ie, {
      item: s.item,
      button: s.button,
      icon: "mdi-delete",
      color: "error",
      title: e(r)("actions.delete"),
      confirm: e(r)("actions.delete.confirm"),
      permissions: ["delete", (c, m) => m.id],
      run: o,
      onCompleted: u[0] || (u[0] = (c) => {
        var m;
        return (m = e(t)) == null ? void 0 : m.show();
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
  setup(l) {
    U();
    const r = l;
    return (t, a) => (p(), S(C, null, [
      b(t.$slots, "before", A(B(r))),
      b(t.$slots, "default", A(B(r))),
      b(t.$slots, "after", A(B(r)))
    ], 64));
  }
};
function Qt(l) {
  const r = Q(l());
  let t = -1;
  function a() {
    clearInterval(t);
  }
  function s() {
    a(), De(() => r.value = l());
  }
  function o(n) {
    const u = n ? getComputedStyle(n) : {
      transitionDuration: 0.2
    }, c = parseFloat(u.transitionDuration) * 1e3 || 200;
    if (a(), r.value <= 0) return;
    const m = performance.now();
    t = window.setInterval(() => {
      const f = performance.now() - m + c;
      r.value = Math.max(l() - f, 0), r.value <= 0 && a();
    }, c);
  }
  return Me(a), {
    clear: a,
    time: r,
    start: o,
    reset: s
  };
}
const Xt = Ut({
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
  ...jt(),
  ...Rt(at({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
}, "VSnackbar"), Zt = Ve()({
  name: "VSnackbar",
  props: Xt(),
  emits: {
    "update:modelValue": (l) => !0
  },
  setup(l, r) {
    let {
      slots: t
    } = r;
    const a = Gt(l, "modelValue"), {
      positionClasses: s
    } = lt(l), {
      scopeId: o
    } = st(), {
      themeClasses: n
    } = Wt(l), {
      colorClasses: u,
      colorStyles: c,
      variantClasses: m
    } = nt(l), {
      roundedClasses: f
    } = ot(l), d = Qt(() => Number(l.timeout)), g = N(), k = N(), y = Q(!1), x = Q(0), V = N(), j = h(it, void 0);
    zt(() => !!j, () => {
      const L = mt();
      Ee(() => {
        V.value = L.mainStyles.value;
      });
    }), G(a, Y), G(() => l.timeout, Y), ye(() => {
      a.value && Y();
    });
    let Z = -1;
    function Y() {
      d.reset(), window.clearTimeout(Z);
      const L = Number(l.timeout);
      if (!a.value || L === -1) return;
      const W = Yt(k.value);
      d.start(W), Z = window.setTimeout(() => {
        a.value = !1;
      }, L);
    }
    function Te() {
      d.reset(), window.clearTimeout(Z);
    }
    function Ae() {
      y.value = !0, Te();
    }
    function ue() {
      y.value = !1, Y();
    }
    function Le(L) {
      x.value = L.touches[0].clientY;
    }
    function Be(L) {
      Math.abs(x.value - L.changedTouches[0].clientY) > 50 && (a.value = !1);
    }
    function _e() {
      y.value && ue();
    }
    const Ie = _(() => l.location.split(" ").reduce((L, W) => (L[`v-snackbar--${W}`] = !0, L), {}));
    return rt(() => {
      const L = me.filterProps(l), W = !!(t.default || t.text || l.text);
      return v(me, F({
        ref: g,
        class: ["v-snackbar", {
          "v-snackbar--active": a.value,
          "v-snackbar--multi-line": l.multiLine && !l.vertical,
          "v-snackbar--timer": !!l.timer,
          "v-snackbar--vertical": l.vertical
        }, Ie.value, s.value, l.class],
        style: [V.value, l.style]
      }, L, {
        modelValue: a.value,
        "onUpdate:modelValue": (q) => a.value = q,
        contentProps: F({
          class: ["v-snackbar__wrapper", n.value, u.value, f.value, m.value],
          style: [c.value],
          onPointerenter: Ae,
          onPointerleave: ue
        }, L.contentProps),
        persistent: !0,
        noClickAnimation: !0,
        scrim: !1,
        scrollStrategy: "none",
        _disableGlobalStack: !0,
        onTouchstartPassive: Le,
        onTouchend: Be,
        onAfterLeave: _e
      }, o), {
        default: () => {
          var q, de;
          return [dt(!1, "v-snackbar"), l.timer && !y.value && v("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [v(ct, {
            ref: k,
            color: typeof l.timer == "string" ? l.timer : "info",
            max: l.timeout,
            "model-value": d.time.value
          }, null)]), W && v("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((q = t.text) == null ? void 0 : q.call(t)) ?? l.text, (de = t.default) == null ? void 0 : de.call(t)]), t.actions && v(pt, {
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
            }, [t.actions({
              isActive: a
            })])]
          })];
        },
        activator: t.activator
      });
    }), ut({}, g);
  }
});
var be;
const ea = /* @__PURE__ */ K({
  __name: "OxApp",
  props: {
    apiUrl: {},
    dataEl: { default: (be = document.body.dataset) == null ? void 0 : be.appData },
    models: {},
    data: {}
  },
  setup(l) {
    const { t: r } = X(), t = U(), a = l, s = ee({
      drawer: !0
    }), o = Ye(a);
    return G(() => [o.state.state, o.state.data], () => {
      o.showState = !0;
    }), Ke((n, u, c) => {
      o.state.error(`${n}`);
    }), (n, u) => (p(), w(vt, null, {
      default: i(() => [
        v(Zt, {
          modelValue: e(o).showState,
          "onUpdate:modelValue": u[0] || (u[0] = (c) => e(o).showState = c),
          color: e(o).state.color,
          "multi-line": ""
        }, {
          default: i(() => [
            P(E(e(o).state.data), 1)
          ]),
          _: 1
        }, 8, ["modelValue", "color"]),
        v(ft, { color: "primary" }, {
          prepend: i(() => [
            v(te, {
              icon: "mdi-apps",
              title: e(r)("nav.panels"),
              "aria-label": e(r)("nav.panels"),
              onClick: u[1] || (u[1] = I((c) => s.drawer = !s.drawer, ["stop"]))
            }, null, 8, ["title", "aria-label"]),
            e(t)["app-nav"] && !s.drawer2 ? (p(), w(te, {
              key: 0,
              icon: "mdi-menu",
              onClick: u[2] || (u[2] = (c) => {
                s.drawer2 = !0, s.drawer = !1;
              })
            })) : $("", !0)
          ]),
          default: i(() => [
            v(ve, { id: "app-bar-sheet-title" }),
            v(ve, { id: "app-bar-title" }, {
              default: i(() => [
                b(n.$slots, "title", { context: e(o) })
              ]),
              _: 3
            }),
            v(bt),
            u[5] || (u[5] = R("div", {
              id: "app-bar-right",
              class: "mr-3"
            }, null, -1)),
            b(n.$slots, "app-bar-right", { context: e(o) })
          ]),
          _: 3
        }),
        e(t)["nav-list"] ? (p(), w(yt, {
          key: 0,
          theme: "dark",
          modelValue: s.drawer,
          "onUpdate:modelValue": u[3] || (u[3] = (c) => s.drawer = c)
        }, z({
          default: i(() => [
            b(n.$slots, "nav-start", { context: e(o) }),
            b(n.$slots, "nav-list", { context: e(o) }),
            b(n.$slots, "nav-end", { context: e(o) })
          ]),
          _: 2
        }, [
          e(t)["app-nav"] ? {
            name: "append",
            fn: i(() => [
              u[6] || (u[6] = R("div", { class: "text-right pa-3" }, null, -1))
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue"])) : $("", !0),
        v(wt, null, {
          default: i(() => [
            v(ge, {
              modelValue: e(o).panel.name,
              "onUpdate:modelValue": u[4] || (u[4] = (c) => e(o).panel.name = c)
            }, {
              default: i(() => [
                b(n.$slots, "default", { context: e(o) })
              ]),
              _: 3
            }, 8, ["modelValue"])
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
  setup(l) {
    const r = Q(null), t = _(() => {
      if (l.is)
        return l.is;
      let s = l.src.substring(l.src.lastIndexOf("/") + 1);
      if (s && (s = s.substring(0, s.indexOf("."))), !s)
        throw Error(
          "`is` not provided and could not be deducted from `src`."
        );
      return s;
    });
    function a() {
      r.value = qe(l.src, t.value);
    }
    return G(() => l.src, a), a(), () => Ne(r.value, l);
  }
}, aa = { class: "password-error" }, ne = {
  __name: "OxFieldDetails",
  props: {
    state: Object,
    errors: Array
  },
  setup(l) {
    const r = l;
    return (t, a) => r.errors ? (p(!0), S(C, { key: 0 }, M(r.errors, (s) => (p(), S("div", aa, [
      v(D, { icon: "mdi-alert-circle-outline" }),
      P(" " + E(s), 1)
    ]))), 256)) : $("", !0);
  }
}, la = /* @__PURE__ */ K({
  __name: "OxList",
  props: {
    repo: {},
    url: {},
    relations: {},
    dataKey: {},
    prevKey: {},
    nextKey: {},
    countKey: {},
    showFilters: { type: Boolean }
  },
  setup(l, { expose: r }) {
    const t = l, a = h("repos"), s = h("panel"), { value: o } = Fe(s), n = He({ ...t, value: o, repos: a });
    return r({ list: n, value: o }), (u, c) => b(u.$slots, "default", {
      list: e(n),
      value: e(o)
    });
  }
}), Se = {
  __name: "OxListFilters",
  props: {
    search: String
  },
  setup(l, { expose: r }) {
    const { t } = X(), a = h("list"), s = l, o = _(() => {
      const c = a.filters;
      return c && Object.entries(c).some(
        ([m, f]) => !m.startsWith("page") && !m.startsWith("ordering") && !!f
      );
    }), n = _(() => o.value ? "mdi-filter-check" : "mdi-filter-outline");
    function u() {
      a.filters = {}, a.fetch();
    }
    return r({ icon: n, hasFilters: o, reset: u }), (c, m) => (p(), S("form", {
      onSubmit: m[2] || (m[2] = I((f) => e(a).fetch(), ["prevent"])),
      class: "width-full"
    }, [
      v(gt, {
        dense: "",
        color: "transparent"
      }, {
        default: i(() => [
          v(te, {
            icon: n.value,
            readonly: ""
          }, null, 8, ["icon"]),
          s.search && e(a).filters ? (p(), w(ae, {
            key: 0,
            label: e(t)("filters.search"),
            density: "compact",
            class: "ml-2",
            modelValue: e(a).filters[s.search],
            "onUpdate:modelValue": m[0] || (m[0] = (f) => e(a).filters[s.search] = f),
            "hide-details": ""
          }, null, 8, ["label", "modelValue"])) : $("", !0),
          b(c.$slots, "default", {
            list: e(a),
            filters: e(a).filters
          }),
          v(T, {
            onClick: m[1] || (m[1] = I((f) => e(a).fetch(), ["stop"])),
            class: "ml-2",
            icon: "mdi-check",
            "aria-label": c.$t("filters.apply"),
            title: e(t)("filters.apply")
          }, null, 8, ["aria-label", "title"]),
          o.value ? (p(), w(T, {
            key: 1,
            onClick: I(u, ["stop"]),
            icon: "mdi-backspace",
            "aria-label": e(t)("filters.reset"),
            title: e(t)("filters.reset")
          }, null, 8, ["aria-label", "title"])) : $("", !0)
        ]),
        _: 3
      })
    ], 32));
  }
}, sa = Ve()({
  name: "VSlideGroupItem",
  props: kt(),
  emits: {
    "group:selected": (l) => !0
  },
  setup(l, r) {
    let {
      slots: t
    } = r;
    const a = $t(l, Vt);
    return () => {
      var s;
      return (s = t.default) == null ? void 0 : s.call(t, {
        isSelected: a.isSelected.value,
        select: a.select,
        toggle: a.toggle,
        selectedClass: a.selectedClass.value
      });
    };
  }
}), na = {
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
  setup(l, { emit: r }) {
    const t = r, a = h("list"), s = l, o = _(() => a.items);
    function n(m) {
      return m = m % s.colors.length, s.colorVariant ? s.colors[m] + "-" + s.colorVariant : s.colors[m];
    }
    function u(m, f, d) {
      m[d] ? !m[d].includes(f) && m[d].push(f) : m[d] = [f];
    }
    const c = _(() => {
      const m = {};
      if (o.value)
        for (var f of o.value) {
          const g = f[s.field];
          if (Array.isArray(g))
            if (g.length)
              for (var d of g)
                u(m, f, d);
            else
              u(m, f, null);
          else
            u(m, f, g);
        }
      return m;
    });
    return (m, f) => (p(), w(ke, null, {
      default: i(() => [
        v(St, null, {
          default: i(() => [
            (p(!0), S(C, null, M(s.headers, (d, g) => (p(), w(sa, {
              key: d.value
            }, {
              default: i(({ selectedClass: k }) => [
                v(xt, {
                  width: "400",
                  class: Ue(["ma-3", k]),
                  color: n(g),
                  lines: "two"
                }, {
                  default: i(() => [
                    v(Ot, null, {
                      default: i(() => [
                        P(E(d.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    v($e, {
                      "bg-color": n(g)
                    }, {
                      default: i(() => [
                        c.value && c.value[d.value] ? (p(!0), S(C, { key: 0 }, M(c.value[d.value], (y) => b(m.$slots, "item", {
                          key: y.id,
                          header: d,
                          item: y
                        }, () => [
                          v(oe, {
                            title: y[s.itemTitle],
                            value: s.itemValue && y[s.itemValue],
                            onClick: (x) => t("click", y)
                          }, {
                            append: i(() => [
                              b(m.$slots, "item.action")
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
}, xe = /* @__PURE__ */ K({
  __name: "OxListTable",
  props: {
    // list: Object,
    headers: Array,
    edit: Boolean
  },
  setup(l) {
    const { t: r } = X(), t = U(), a = se(t, "item.", { exclude: ["item.actions"] }), s = h("panel"), o = h("list"), n = new Dt("change"), u = l, c = _(() => u.headers.reduce((d, g) => (d.push(
      typeof g == "string" ? { key: g, title: r(Je.field(g)) } : g
    ), d), []));
    function m(d) {
      return o.fetch({
        filters: {
          page: d.page,
          page_size: d.itemsPerPage,
          ordering: d.sortBy.map(({ key: g, order: k }) => k == "asc" ? g : `-${g}`)
        }
      });
    }
    function f(d, g) {
      s.show({ path: ".detail.edit", value: g });
    }
    return (d, g) => {
      var k;
      return p(), w(ht, {
        items: e(o).items,
        "item-index": "id",
        "items-length": e(o).count || e(o).items.length,
        loading: (k = e(o).state) == null ? void 0 : k.isProcessing,
        headers: c.value,
        "onUpdate:options": m
      }, z({
        loading: i(() => [
          v(Pt, { type: "table-row@10" })
        ]),
        "item.actions": i(({ item: y }) => [
          l.edit ? (p(), w(ie, {
            key: 0,
            icon: "mdi-pencil",
            button: "",
            title: e(r)("actions.edit"),
            permissions: e(n),
            item: y,
            run: f
          }, null, 8, ["title", "permissions", "item"])) : $("", !0),
          b(d.$slots, "item.actions", {
            value: y,
            dense: !0,
            button: !0
          })
        ]),
        _: 2
      }, [
        M(e(a), (y, x) => ({
          name: x,
          fn: i((V) => [
            b(d.$slots, x, A(B(V)))
          ])
        }))
      ]), 1032, ["items", "items-length", "loading", "headers"]);
    };
  }
}), re = {
  __name: "OxStateAlert",
  props: {
    state: Object,
    delay: { type: Boolean, default: !1 },
    okTitle: { type: String, default: "" },
    noneTitle: { type: String, default: "" },
    errorTitle: { type: String, default: "Oups..." },
    processingTitle: { type: String, default: "Processing..." }
  },
  setup(l) {
    const r = U(), t = l;
    let a = N(!1);
    G(() => t.state.state, (n) => {
      t.delay && n == Et.PROCESSING && (a.value = !1, window.setTimeout(() => {
        a.value = !0;
      }, 5e3));
    });
    const s = _(() => {
      var n;
      return ((n = t.state) == null ? void 0 : n.isProcessing) && (!t.delay || a.value);
    }), o = _(() => {
      var n, u;
      return (u = (n = t.state) == null ? void 0 : n.data) == null ? void 0 : u.messages;
    });
    return (n, u) => (p(), S(C, null, [
      t.state.isNone && e(r).none ? (p(), w(e(H), {
        key: 0,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        state: l.state,
        title: l.noneTitle
      }, {
        default: i(() => [
          b(n.$slots, "none", { state: l.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : s.value ? (p(), w(e(H), {
        key: 1,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: l.state,
        title: l.processingTitle
      }, {
        default: i(() => [
          b(n.$slots, "processing", { state: l.state }, () => [
            u[0] || (u[0] = P(" Data are being sent to server, please be patient. If this message persist you might wan't to retry. "))
          ])
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isError ? (p(), w(e(H), {
        key: 2,
        type: "error",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: l.state,
        title: l.errorTitle
      }, {
        default: i(() => [
          b(n.$slots, "error", { state: l.state }, () => [
            u[1] || (u[1] = P(" Oups... something wrong happened. "))
          ]),
          b(n.$slots, "error-detail", { state: l.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isOk ? (p(), w(e(H), {
        key: 3,
        type: "success",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: l.state,
        title: l.okTitle
      }, {
        default: i(() => [
          b(n.$slots, "ok", { state: l.state }, () => [
            u[2] || (u[2] = R("p", null, "Congrats! Data have been updated.", -1))
          ]),
          o.value ? (p(), S(C, { key: 0 }, [
            v(Ct),
            (p(!0), S(C, null, M(o.value, (c) => (p(), S("p", null, E(c), 1))), 256))
          ], 64)) : $("", !0),
          b(n.$slots, "ok-detail", { state: l.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : $("", !0),
      b(n.$slots, "default", {
        state: t.state
      })
    ], 64));
  }
}, oa = { class: "text-right" }, Oe = {
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
  setup(l, { emit: r }) {
    const t = r, a = l;
    return (s, o) => (p(), S("div", oa, [
      v(e(T), {
        color: "error",
        class: "me-2",
        "prepend-icon": a.resetIcon,
        onClick: o[0] || (o[0] = (n) => t("reset")),
        disabled: a.disabled
      }, {
        default: i(() => [
          b(s.$slots, "reset", {}, () => [
            P(E(a.resetLabel), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]),
      a.state.isSending ? (p(), w(e(T), {
        key: 0,
        color: "primary",
        "prepend-icon": "mdi-content-save",
        disabled: ""
      }, {
        default: i(() => o[2] || (o[2] = [
          P(" Saving ")
        ])),
        _: 1
      })) : (p(), w(e(T), {
        key: 1,
        color: "primary",
        "prepend-icon": a.validateIcon,
        onClick: o[1] || (o[1] = (n) => t("validate")),
        disabled: a.disabled || a.validateDisabled
      }, {
        default: i(() => [
          b(s.$slots, "validate", {}, () => [
            P(E(a.validateLabel), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]))
    ]));
  }
}, ia = { key: 0 }, ra = { class: "text-right mt-3" }, ua = {
  __name: "OxLogin",
  props: {
    next: { type: String },
    url: { type: String }
  },
  emits: ["save", "saved"],
  setup(l, { emit: r }) {
    const t = we("password"), a = l, s = ee({
      username: "",
      password: ""
    }), o = N(!1), n = ee(new Kt());
    function u(m = !0) {
      Nt(s, { username: "", password: "" }), m && n.none();
    }
    async function c() {
      n.processing();
      try {
        const m = await fetch(a.url, {
          method: "POST",
          headers: Ft.axiosConfig.headers,
          body: JSON.stringify(s)
        });
        m.status == 200 ? (s.credentials = "", s.password = "", n.ok(await m.json()), a.next && (window.location.href = a.next)) : n.error(await m.json());
      } catch (m) {
        n.ok((m == null ? void 0 : m.message) || m);
      }
    }
    return (m, f) => (p(), S(C, null, [
      v(e(re), { state: n }, {
        none: i(({ state: d }) => f[7] || (f[7] = [
          R("p", null, "Please enter your credentials in order too proceed...", -1)
        ])),
        "ok-detail": i(({ state: d }) => [
          a.next ? (p(), S("p", ia, [
            f[8] || (f[8] = P("You soon will be redirected to ")),
            R("i", null, E(a.next), 1)
          ])) : $("", !0)
        ]),
        error: i(({ state: d }) => {
          var g, k;
          return [
            v(ne, {
              errors: (g = d.data) == null ? void 0 : g.username
            }, null, 8, ["errors"]),
            v(ne, {
              errors: (k = d.data) == null ? void 0 : k.password
            }, null, 8, ["errors"])
          ];
        }),
        _: 1
      }, 8, ["state"]),
      n.isOk ? $("", !0) : (p(), S(C, { key: 0 }, [
        v(ae, {
          variant: "underlined",
          label: "Enter login",
          modelValue: s.username,
          "onUpdate:modelValue": f[0] || (f[0] = (d) => s.username = d),
          onKeyup: f[1] || (f[1] = ce(I((d) => e(t).focus(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue"]),
        v(ae, {
          variant: "underlined",
          ref: "password",
          label: "Enter password",
          modelValue: s.password,
          "onUpdate:modelValue": f[2] || (f[2] = (d) => s.password = d),
          type: o.value ? "text" : "password",
          "append-icon": o.value ? "mdi-eye" : "mdi-eye-off",
          "onClick:append": f[3] || (f[3] = (d) => o.value = !o.value),
          onKeyup: f[4] || (f[4] = ce(I((d) => c(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue", "type", "append-icon"]),
        R("div", ra, [
          b(m.$slots, "default", {
            value: s.password
          }, () => [
            s.username && s.password ? (p(), w(Oe, {
              key: 0,
              "validate-label": "Login!",
              onValidate: f[5] || (f[5] = (d) => c()),
              onReset: f[6] || (f[6] = (d) => u()),
              state: n
            }, null, 8, ["state"])) : $("", !0)
          ])
        ])
      ], 64))
    ], 64));
  }
}, he = /* @__PURE__ */ K({
  __name: "OxPanelSheet",
  props: {
    help: {},
    name: {},
    title: {},
    icon: {}
  },
  setup(l) {
    const r = l, t = N(!1);
    ye(() => {
      t.value = !0;
    });
    const a = h("panel");
    return (s, o) => (p(), w(ke, { class: "ma-4" }, {
      default: i(() => [
        (p(), w(pe, {
          to: "#app-bar-sheet-title",
          disabled: !t.value || e(a).name != r.name
        }, [
          r.icon ? (p(), w(D, {
            key: 0,
            icon: r.icon
          }, null, 8, ["icon"])) : $("", !0),
          P(" " + E(r.title), 1)
        ], 8, ["disabled"])),
        (p(), w(pe, {
          to: "#app-bar-right",
          disabled: !t.value || e(a).name != r.name
        }, [
          b(s.$slots, "append-title"),
          r.help ? (p(), w(T, {
            key: 0,
            class: "ml-3",
            href: r.help,
            target: "new",
            icon: "mdi-information-outline"
          }, null, 8, ["href"])) : $("", !0)
        ], 8, ["disabled"])),
        b(s.$slots, "default")
      ]),
      _: 3
    }));
  }
}), Pe = /* @__PURE__ */ K({
  __name: "OxPanel",
  props: {
    state: {},
    name: {},
    title: {},
    icon: {}
  },
  setup(l) {
    const r = U(), t = J(r, "views.", {
      exclude: ["views.before", "views.after"]
    }), a = l;
    h("context");
    const s = h("panel");
    return (o, n) => (p(), S(C, null, [
      a.state ? (p(), w(re, {
        key: 0,
        state: a.state,
        delay: ""
      }, null, 8, ["state"])) : $("", !0),
      v(le, {
        value: a.name,
        "onGroup:selected": n[1] || (n[1] = (u) => e(s).reset(a, a.name))
      }, {
        default: i(() => [
          v(he, {
            name: a.name,
            title: a.title,
            icon: a.icon
          }, {
            "append-title": i(() => [
              b(o.$slots, "append-title")
            ]),
            default: i(() => [
              b(o.$slots, "views.before"),
              v(Tt, {
                modelValue: e(s).view,
                "onUpdate:modelValue": n[0] || (n[0] = (u) => e(s).view = u)
              }, {
                default: i(() => [
                  (p(!0), S(C, null, M(e(t), (u, c) => (p(), w(At, {
                    key: u,
                    value: u
                  }, {
                    default: i(() => [
                      b(o.$slots, c)
                    ]),
                    _: 2
                  }, 1032, ["value"]))), 128))
                ]),
                _: 3
              }, 8, ["modelValue"]),
              b(o.$slots, "views.after")
            ]),
            _: 3
          }, 8, ["name", "title", "icon"])
        ]),
        _: 3
      }, 8, ["value"])
    ], 64));
  }
}), Ce = {
  __name: "OxModelEdit",
  props: /* @__PURE__ */ je({
    subtitle: String
  }, {
    value: {
      type: Object,
      default: () => null
    },
    valueModifiers: {}
  }),
  emits: ["update:value"],
  setup(l) {
    const { t: r } = X();
    h("context");
    const t = Re(l, "value"), a = _(() => {
      var d;
      return (d = t.value) == null ? void 0 : d.constructor;
    }), s = h("panel");
    function o(d) {
      s.value && d && (s.value.title = `Edit ${d.$title}`);
    }
    o(t.value), G(t, o);
    const n = N(null), u = U(), c = se(u, "tab.", { exclude: "tab.default" }), m = se(u, "window.", { exclude: "window.default" }), f = _(() => ({
      panel: s,
      value: t.value,
      model: a.value
    }));
    return (d, g) => t.value ? (p(), S(C, { key: 0 }, [
      e(c) && Object.keys(e(c)).length ? (p(), S(C, { key: 0 }, [
        v(Lt, {
          modelValue: n.value,
          "onUpdate:modelValue": g[0] || (g[0] = (k) => n.value = k)
        }, {
          default: i(() => [
            b(d.$slots, "tab.default", A(B(f.value)), () => [
              v(Bt, {
                text: e(r)(`models.${a.value.entity}`),
                value: "model"
              }, null, 8, ["text"])
            ]),
            (p(!0), S(C, null, M(e(c), (k, y) => b(d.$slots, y, F({ ref_for: !0 }, f.value))), 256))
          ]),
          _: 3
        }, 8, ["modelValue"]),
        v(ge, {
          modelValue: n.value,
          "onUpdate:modelValue": g[1] || (g[1] = (k) => n.value = k)
        }, {
          default: i(() => [
            v(le, { value: "model" }, {
              default: i(() => [
                b(d.$slots, "window.default", A(B(f.value)))
              ]),
              _: 3
            }),
            (p(!0), S(C, null, M(e(m), (k, y) => (p(), w(le, { value: k }, {
              default: i(() => [
                b(d.$slots, y, F({ ref_for: !0 }, f.value))
              ]),
              _: 2
            }, 1032, ["value"]))), 256))
          ]),
          _: 3
        }, 8, ["modelValue"])
      ], 64)) : b(d.$slots, "window.default", A(F({ key: 1 }, f.value)))
    ], 64)) : (p(), S(C, { key: 1 }, [
      P(" Nothing to edit ")
    ], 64));
  }
}, da = /* @__PURE__ */ K({
  __name: "OxModelPanel",
  props: {
    repo: {},
    url: {},
    relations: {},
    dataKey: {},
    prevKey: {},
    nextKey: {},
    countKey: {},
    showFilters: { type: Boolean },
    state: {},
    name: {},
    title: {},
    icon: {},
    search: {},
    view: {},
    headers: {}
  },
  setup(l) {
    const r = U(), t = J(r, "views.list."), a = J(r, "item."), s = J(r, "views.detail.edit."), o = we("filters"), n = l, u = h("repos"), c = h("panel"), m = Qe({ repos: u, panel: c, props: n }), { list: f, showFilters: d } = m, g = _(() => ({
      panel: c,
      list: f,
      value: c.value
    }));
    return (k, y) => (p(), w(Pe, {
      name: n.name,
      title: e(m).title,
      icon: e(m).icon,
      state: e(f).state
    }, z({
      "append-title": i(() => {
        var x;
        return [
          b(k.$slots, "append-title", A(B(g.value))),
          e(c).view.startsWith("list.") ? (p(), w(fe, {
            key: 0,
            class: "ml-3",
            color: "secondary",
            density: "compact",
            variant: "tonal"
          }, {
            default: i(() => [
              b(k.$slots, "nav.list", A(B(g.value))),
              e(o) ? (p(), w(T, {
                key: 0,
                title: e(d) ? e(O)("filters.hide") : e(O)("filters.show"),
                "aria-label": e(d) ? e(O)("filters.hide") : e(O)("filters.show"),
                onClick: y[0] || (y[0] = (V) => d.value = !e(d)),
                active: e(d)
              }, {
                default: i(() => [
                  v(D, {
                    icon: e(o).icon
                  }, null, 8, ["icon"])
                ]),
                _: 1
              }, 8, ["title", "aria-label", "active"])) : $("", !0)
            ]),
            _: 3
          })) : e(c).view.startsWith("detail.") && ((x = e(c).value) != null && x.id) ? (p(), w(fe, {
            key: 1,
            class: "ml-3",
            color: "secondary",
            density: "compact",
            variant: "tonal"
          }, {
            default: i(() => [
              b(k.$slots, "nav.detail", A(B(g.value))),
              e(c).view == "detail.edit" && e(c).value ? (p(), w(_t, { key: 0 }, {
                activator: i(({ props: V }) => [
                  v(T, F({ "prepend-icon": "mdi-dots-vertical" }, V), {
                    default: i(() => [
                      P(E(e(O)("actions")), 1)
                    ]),
                    _: 2
                  }, 1040)
                ]),
                default: i(() => [
                  v($e, null, {
                    default: i(() => [
                      b(k.$slots, "item.actions", {
                        value: e(c).value
                      })
                    ]),
                    _: 3
                  })
                ]),
                _: 3
              })) : $("", !0),
              v(T, {
                disabled: !e(f).prev,
                title: e(O)("prev"),
                "aria-label": e(O)("prev"),
                onClick: y[1] || (y[1] = I((V) => e(c).value = e(f).prev, ["stop"]))
              }, {
                default: i(() => [
                  v(D, { icon: "mdi-chevron-left" })
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"]),
              v(T, {
                disabled: !e(f).next,
                title: e(O)("next"),
                "aria-label": e(O)("next"),
                onClick: y[2] || (y[2] = I((V) => e(c).value = e(f).next, ["stop"]))
              }, {
                default: i(() => [
                  v(D, { icon: "mdi-chevron-right" })
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"])
            ]),
            _: 3
          })) : $("", !0),
          v(It, {
            class: "ml-3",
            color: "secondary",
            modelValue: e(c).view,
            "onUpdate:modelValue": y[4] || (y[4] = (V) => e(c).view = V),
            density: "compact",
            variant: "tonal"
          }, {
            default: i(() => {
              var V;
              return [
                v(T, {
                  value: "list.table",
                  title: e(O)("panels.nav.table"),
                  "aria-label": e(O)("panels.nav.table")
                }, {
                  default: i(() => [
                    v(D, null, {
                      default: i(() => y[6] || (y[6] = [
                        P("mdi-table")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["title", "aria-label"]),
                e(r)["views.list.cards"] ? (p(), w(T, {
                  key: 0,
                  value: "list.cards",
                  title: e(O)("panels.nav.cards"),
                  "aria-label": e(O)("panels.nav.cards")
                }, {
                  default: i(() => [
                    v(D, null, {
                      default: i(() => y[7] || (y[7] = [
                        P("mdi-card-account-details")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["title", "aria-label"])) : $("", !0),
                e(r)["views.list.kanban"] ? (p(), w(T, {
                  key: 1,
                  value: "list.kanban",
                  title: e(O)("panels.nav.kanban"),
                  "aria-label": e(O)("panels.nav.kanban")
                }, {
                  default: i(() => [
                    v(D, null, {
                      default: i(() => y[8] || (y[8] = [
                        P("mdi-view-column")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["title", "aria-label"])) : $("", !0),
                e(r)["views.detail.add"] ? (p(), w(T, {
                  key: 2,
                  value: "detail.add",
                  onClick: y[3] || (y[3] = I((j) => k.create(), ["stop"])),
                  title: e(O)("panels.nav.add"),
                  "aria-label": e(O)("panels.nav.add")
                }, {
                  default: i(() => [
                    v(D, null, {
                      default: i(() => y[9] || (y[9] = [
                        P("mdi-plus-box")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["title", "aria-label"])) : $("", !0),
                e(r)["views.detail.edit"] || e(s) ? (p(), w(T, {
                  key: 3,
                  value: "detail.edit",
                  disabled: !((V = e(c).value) != null && V.id),
                  title: e(O)("panels.nav.edit"),
                  "aria-label": e(O)("panels.nav.edit")
                }, {
                  default: i(() => [
                    v(D, null, {
                      default: i(() => y[10] || (y[10] = [
                        P("mdi-pencil")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["disabled", "title", "aria-label"])) : $("", !0),
                b(k.$slots, "nav.views", A(B(g.value)))
              ];
            }),
            _: 3
          }, 8, ["modelValue"])
        ];
      }),
      "views.before": i(() => [
        Ge(v(Se, {
          ref_key: "filters",
          ref: o,
          search: n.search,
          "teleport-to": "#panel-list-actions"
        }, {
          default: i((x) => [
            b(k.$slots, "list.filters", A(B(x)))
          ]),
          _: 3
        }, 8, ["search"]), [
          [We, e(c).view.startsWith("list.") && e(d)]
        ])
      ]),
      _: 2
    }, [
      e(r)["views.list.table"] ? void 0 : {
        name: "views.list.table",
        fn: i(() => [
          v(xe, {
            headers: k.headers,
            edit: ""
          }, z({ _: 2 }, [
            M(e(a), (x, V) => ({
              name: V,
              fn: i((j) => [
                b(k.$slots, V, A(B(j)))
              ])
            }))
          ]), 1032, ["headers"])
        ]),
        key: "0"
      },
      M(e(t), (x, V) => ({
        name: V,
        fn: i(() => [
          b(k.$slots, V, A(B(g.value)))
        ])
      })),
      e(r)["views.detail.edit"] || e(s) ? {
        name: "views.detail.edit",
        fn: i(() => [
          v(Ce, {
            value: e(c).value,
            "onUpdate:value": y[5] || (y[5] = (x) => e(c).value = x)
          }, z({ _: 2 }, [
            M(e(s), (x, V) => ({
              name: x,
              fn: i((j) => [
                b(k.$slots, V, A(B(j)))
              ])
            }))
          ]), 1032, ["value"])
        ]),
        key: "1"
      } : void 0,
      e(r)["views.detail.add"] ? {
        name: "views.detail.add",
        fn: i(() => [
          b(k.$slots, "views.detail.add", F(g.value, {
            saved: (x) => k.model_panel.created(x)
          }))
        ]),
        key: "2"
      } : void 0
    ]), 1032, ["name", "title", "icon", "state"]));
  }
}), ca = /* @__PURE__ */ K({
  __name: "OxPanelNav",
  props: {
    name: {},
    title: {},
    icon: {},
    path: {},
    href: {},
    value: {},
    force: { type: Boolean },
    auto: { type: Boolean }
  },
  setup(l, { expose: r }) {
    const t = l, a = h("panel"), s = _(() => !t.auto || a.name == t.name), o = _(() => {
      const n = a.name == t.name && a.edited ? "*" : "";
      return t.title + n;
    });
    return r({ title: o, name: t.name }), (n, u) => s.value ? (p(), w(oe, {
      key: 0,
      active: e(a).name == t.name,
      "prepend-icon": t.icon,
      title: t.title,
      onClick: u[0] || (u[0] = I((c) => e(a).show({ path: t.path ?? t.name }), ["stop"]))
    }, null, 8, ["active", "prepend-icon", "title"])) : $("", !0);
  }
}), pa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OxAction: ie,
  OxActionModelDelete: Ht,
  OxActions: Jt,
  OxApp: ea,
  OxComponent: ta,
  OxFieldDetails: ne,
  OxList: la,
  OxListFilters: Se,
  OxListKanban: na,
  OxListTable: xe,
  OxLogin: ua,
  OxModelEdit: Ce,
  OxModelPanel: da,
  OxPanel: Pe,
  OxPanelNav: ca,
  OxPanelSheet: he,
  OxStateAlert: re,
  OxValidationBtn: Oe
}, Symbol.toStringTag, { value: "Module" })), ga = {
  el: "#app",
  delimiters: ["[[", "]]"],
  components: { ...pa, ...qt }
};
export {
  ga as App,
  ie as OxAction,
  Ht as OxActionModelDelete,
  Jt as OxActions,
  ea as OxApp,
  ta as OxComponent,
  ne as OxFieldDetails,
  la as OxList,
  Se as OxListFilters,
  na as OxListKanban,
  xe as OxListTable,
  ua as OxLogin,
  Ce as OxModelEdit,
  da as OxModelPanel,
  Pe as OxPanel,
  ca as OxPanelNav,
  he as OxPanelSheet,
  re as OxStateAlert,
  Oe as OxValidationBtn
};
//# sourceMappingURL=components.js.map
