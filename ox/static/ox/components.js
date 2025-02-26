import { defineComponent as U, inject as A, unref as e, openBlock as p, createElementBlock as S, Fragment as T, createBlock as b, withModifiers as D, createCommentVNode as $, useSlots as G, renderSlot as y, normalizeProps as L, guardReactiveProps as _, ref as R, shallowRef as X, watch as q, onMounted as be, computed as M, onScopeDispose as De, createVNode as f, mergeProps as F, nextTick as Ee, watchEffect as Ke, reactive as ee, onErrorCaptured as Ne, withCtx as r, createTextVNode as P, toDisplayString as j, createElementVNode as W, createSlots as Y, h as je, renderList as E, toRefs as we, normalizeClass as Fe, useTemplateRef as ge, withKeys as de, resolveComponent as Ue, Teleport as ce, mergeModels as Re, useModel as Ge, withDirectives as We, vShow as qe } from "vue";
import { useAction as ze, useI18n as Z, useAppContext as Ye, useTarget as He, defineAsyncComponent as Je, useList as Qe, tKeys as Xe, filterSlots as Q, injectOrProvide as pe, Query as Ze, List as et, useModelPanel as tt, t as O } from "ox";
import { V as C, a as oe, m as at, b as lt, c as st, d as nt, e as ot, u as it, f as rt, g as ut, h as dt, i as ct, j as pt, k as mt, l as me, n as vt, o as ft, p as yt, q as bt, r as wt, s as gt, t as te, v as ve, w as kt, x as $t, y as Vt, z as ke, A as K, B as xt, C as ae, D as St, E as Ot, F as ht, G as $e, H as Pt, I as Ct, J as Tt, K as Ve, L as At, M as Lt, N as J, O as Bt, P as le, Q as It, R as _t, S as Mt, T as Dt, U as fe, W as Et, X as Kt } from "./VAlert-CTpFsU7b.js";
import { j as Nt, x as se, c as jt, t as Ft, S as Ut, r as Rt, h as Gt } from "./vue-i18n-Bk-v3Oxr.js";
import { n as Wt, o as qt, q as zt, r as xe, u as Yt, s as Ht, t as Jt, v as Qt } from "./theme-CVupjJDc.js";
import { components as Xt } from "ox/vendor";
const ie = /* @__PURE__ */ U({
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
    const t = a, s = d, l = A("context"), o = ze({ user: l.user, emits: s }, t);
    async function i(...v) {
      await o.run(...v);
    }
    return (v, u) => e(o).allowed ? (p(), S(T, { key: 0 }, [
      t.button ? (p(), b(C, {
        key: 0,
        variant: "text",
        color: t.color,
        icon: t.icon,
        title: t.title,
        "aria-label": t.title,
        onClick: D(i, ["stop"])
      }, null, 8, ["color", "icon", "title", "aria-label"])) : (p(), b(oe, {
        key: 1,
        title: t.title,
        "base-color": t.color,
        "prepend-icon": t.icon,
        onClick: D(i, ["stop"])
      }, null, 8, ["title", "base-color", "prepend-icon"]))
    ], 64)) : $("", !0);
  }
}), Zt = /* @__PURE__ */ U({
  __name: "OxActionModelDelete",
  props: {
    item: {},
    button: { type: Boolean }
  },
  setup(a) {
    const { t: d } = Nt(), t = A("panels"), s = A("repos"), l = a;
    async function o(i, v) {
      return await s[v.constructor.entity].api().delete(v.$url(), { delete: l.item.id });
    }
    return (i, v) => (p(), b(ie, {
      item: l.item,
      button: l.button,
      icon: "mdi-delete",
      color: "error",
      title: e(d)("actions.delete"),
      confirm: e(d)("actions.delete.confirm"),
      permissions: ["delete", (u, n) => n.id],
      run: o,
      onCompleted: v[0] || (v[0] = (u) => {
        var n;
        return (n = e(t)) == null ? void 0 : n.show();
      })
    }, null, 8, ["item", "button", "title", "confirm", "permissions"]));
  }
}), ea = {
  __name: "OxActions",
  props: {
    // Action's Props
    value: Object,
    dense: { type: Boolean, default: !1 },
    button: { type: Boolean, default: !1 },
    exclude: { type: Array }
  },
  setup(a) {
    G();
    const d = a;
    return (t, s) => (p(), S(T, null, [
      y(t.$slots, "before", L(_(d))),
      y(t.$slots, "default", L(_(d))),
      y(t.$slots, "after", L(_(d)))
    ], 64));
  }
};
function ta(a) {
  const d = X(a());
  let t = -1;
  function s() {
    clearInterval(t);
  }
  function l() {
    s(), Ee(() => d.value = a());
  }
  function o(i) {
    const v = i ? getComputedStyle(i) : {
      transitionDuration: 0.2
    }, u = parseFloat(v.transitionDuration) * 1e3 || 200;
    if (s(), d.value <= 0) return;
    const n = performance.now();
    t = window.setInterval(() => {
      const m = performance.now() - n + u;
      d.value = Math.max(a() - m, 0), d.value <= 0 && s();
    }, u);
  }
  return De(s), {
    clear: s,
    time: d,
    start: o,
    reset: l
  };
}
const aa = Wt({
  multiLine: Boolean,
  text: String,
  timer: [Boolean, String],
  timeout: {
    type: [Number, String],
    default: 5e3
  },
  vertical: Boolean,
  ...at({
    location: "bottom"
  }),
  ...lt(),
  ...st(),
  ...nt(),
  ...qt(),
  ...zt(ot({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
}, "VSnackbar"), la = xe()({
  name: "VSnackbar",
  props: aa(),
  emits: {
    "update:modelValue": (a) => !0
  },
  setup(a, d) {
    let {
      slots: t
    } = d;
    const s = Yt(a, "modelValue"), {
      positionClasses: l
    } = it(a), {
      scopeId: o
    } = rt(), {
      themeClasses: i
    } = Ht(a), {
      colorClasses: v,
      colorStyles: u,
      variantClasses: n
    } = ut(a), {
      roundedClasses: m
    } = dt(a), c = ta(() => Number(a.timeout)), w = R(), V = R(), k = X(!1), h = X(0), g = R(), B = A(ct, void 0);
    Jt(() => !!B, () => {
      const I = bt();
      Ke(() => {
        g.value = I.mainStyles.value;
      });
    }), q(s, N), q(() => a.timeout, N), be(() => {
      s.value && N();
    });
    let x = -1;
    function N() {
      c.reset(), window.clearTimeout(x);
      const I = Number(a.timeout);
      if (!s.value || I === -1) return;
      const z = Qt(V.value);
      c.start(z), x = window.setTimeout(() => {
        s.value = !1;
      }, I);
    }
    function Ae() {
      c.reset(), window.clearTimeout(x);
    }
    function Le() {
      k.value = !0, Ae();
    }
    function re() {
      k.value = !1, N();
    }
    function Be(I) {
      h.value = I.touches[0].clientY;
    }
    function Ie(I) {
      Math.abs(h.value - I.changedTouches[0].clientY) > 50 && (s.value = !1);
    }
    function _e() {
      k.value && re();
    }
    const Me = M(() => a.location.split(" ").reduce((I, z) => (I[`v-snackbar--${z}`] = !0, I), {}));
    return pt(() => {
      const I = me.filterProps(a), z = !!(t.default || t.text || a.text);
      return f(me, F({
        ref: w,
        class: ["v-snackbar", {
          "v-snackbar--active": s.value,
          "v-snackbar--multi-line": a.multiLine && !a.vertical,
          "v-snackbar--timer": !!a.timer,
          "v-snackbar--vertical": a.vertical
        }, Me.value, l.value, a.class],
        style: [g.value, a.style]
      }, I, {
        modelValue: s.value,
        "onUpdate:modelValue": (H) => s.value = H,
        contentProps: F({
          class: ["v-snackbar__wrapper", i.value, v.value, m.value, n.value],
          style: [u.value],
          onPointerenter: Le,
          onPointerleave: re
        }, I.contentProps),
        persistent: !0,
        noClickAnimation: !0,
        scrim: !1,
        scrollStrategy: "none",
        _disableGlobalStack: !0,
        onTouchstartPassive: Be,
        onTouchend: Ie,
        onAfterLeave: _e
      }, o), {
        default: () => {
          var H, ue;
          return [vt(!1, "v-snackbar"), a.timer && !k.value && f("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [f(ft, {
            ref: V,
            color: typeof a.timer == "string" ? a.timer : "info",
            max: a.timeout,
            "model-value": c.time.value
          }, null)]), z && f("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((H = t.text) == null ? void 0 : H.call(t)) ?? a.text, (ue = t.default) == null ? void 0 : ue.call(t)]), t.actions && f(yt, {
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
              isActive: s
            })])]
          })];
        },
        activator: t.activator
      });
    }), mt({}, w);
  }
});
var ye;
const sa = /* @__PURE__ */ U({
  __name: "OxApp",
  props: {
    apiUrl: {},
    dataEl: { default: (ye = document.body.dataset) == null ? void 0 : ye.appData },
    models: {},
    data: {}
  },
  setup(a) {
    const { t: d } = Z(), t = G(), s = a, l = ee({ drawer: !0 }), o = Ye(s), i = He();
    return q(() => [o.state.state, o.state.data], () => {
      o.showState = !0;
    }), Ne((v, u, n) => {
      o.state.error(`${v}`);
    }), (v, u) => (p(), b(wt, null, {
      default: r(() => [
        f(la, {
          modelValue: e(o).showState,
          "onUpdate:modelValue": u[0] || (u[0] = (n) => e(o).showState = n),
          color: e(o).state.color,
          "multi-line": ""
        }, {
          default: r(() => [
            P(j(e(o).state.data), 1)
          ]),
          _: 1
        }, 8, ["modelValue", "color"]),
        f(gt, { color: "primary" }, {
          prepend: r(() => [
            f(te, {
              icon: "mdi-apps",
              title: e(d)("nav.panels"),
              "aria-label": e(d)("nav.panels"),
              onClick: u[1] || (u[1] = D((n) => l.drawer = !l.drawer, ["stop"]))
            }, null, 8, ["title", "aria-label"]),
            e(t)["app-nav"] && !l.drawer2 ? (p(), b(te, {
              key: 0,
              icon: "mdi-menu",
              onClick: u[2] || (u[2] = (n) => {
                l.drawer2 = !0, l.drawer = !1;
              })
            })) : $("", !0)
          ]),
          default: r(() => [
            f(ve, { id: "app-bar-sheet-title" }),
            f(ve, { id: "app-bar-title" }, {
              default: r(() => [
                y(v.$slots, "title", { context: e(o) })
              ]),
              _: 3
            }),
            f(kt),
            u[5] || (u[5] = W("div", {
              id: "app-bar-right",
              class: "mr-3"
            }, null, -1)),
            y(v.$slots, "app-bar-right", { context: e(o) })
          ]),
          _: 3
        }),
        e(t)["nav-list"] ? (p(), b($t, {
          key: 0,
          theme: "dark",
          modelValue: l.drawer,
          "onUpdate:modelValue": u[3] || (u[3] = (n) => l.drawer = n)
        }, Y({
          default: r(() => [
            y(v.$slots, "nav-start", { context: e(o) }),
            y(v.$slots, "nav-list", { context: e(o) }),
            y(v.$slots, "nav-end", { context: e(o) })
          ]),
          _: 2
        }, [
          e(t)["app-nav"] ? {
            name: "append",
            fn: r(() => [
              u[6] || (u[6] = W("div", { class: "text-right pa-3" }, null, -1))
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue"])) : $("", !0),
        f(Vt, null, {
          default: r(() => [
            y(v.$slots, "main", {}, () => [
              f(ke, {
                modelValue: e(i).panel,
                "onUpdate:modelValue": u[4] || (u[4] = (n) => e(i).panel = n)
              }, {
                default: r((n) => [
                  y(v.$slots, "default", F(n, { context: e(o) }))
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
}), na = {
  props: {
    src: String,
    is: String
  },
  setup(a) {
    const d = X(null), t = M(() => {
      if (a.is)
        return a.is;
      let l = a.src.substring(a.src.lastIndexOf("/") + 1);
      if (l && (l = l.substring(0, l.indexOf("."))), !l)
        throw Error(
          "`is` not provided and could not be deducted from `src`."
        );
      return l;
    });
    function s() {
      d.value = Je(a.src, t.value);
    }
    return q(() => a.src, s), s(), () => je(d.value, a);
  }
}, oa = { class: "password-error" }, ne = {
  __name: "OxFieldDetails",
  props: {
    state: Object,
    errors: Array
  },
  setup(a) {
    const d = a;
    return (t, s) => d.errors ? (p(!0), S(T, { key: 0 }, E(d.errors, (l) => (p(), S("div", oa, [
      f(K, { icon: "mdi-alert-circle-outline" }),
      P(" " + j(l), 1)
    ]))), 256)) : $("", !0);
  }
}, ia = /* @__PURE__ */ U({
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
  setup(a, { expose: d }) {
    const t = a, s = A("query"), l = A("panels"), { value: o } = we(l), i = Qe({ ...t, query: s, value: o });
    return d({ list: i, value: o }), (v, u) => y(v.$slots, "default", {
      list: e(i),
      value: e(o)
    });
  }
}), Se = {
  __name: "OxListFilters",
  props: {
    search: String
  },
  setup(a, { expose: d }) {
    const { t } = Z(), s = A("list"), l = a, o = M(() => {
      const u = s.filters;
      return u && Object.entries(u).some(
        ([n, m]) => !n.startsWith("page") && !n.startsWith("ordering") && !!m
      );
    }), i = M(() => o.value ? "mdi-filter-check" : "mdi-filter-outline");
    function v() {
      s.filters = {}, s.fetch();
    }
    return d({ icon: i, hasFilters: o, reset: v }), (u, n) => (p(), S("form", {
      onSubmit: n[2] || (n[2] = D((m) => e(s).fetch(), ["prevent"])),
      class: "width-full"
    }, [
      f(xt, {
        dense: "",
        color: "transparent"
      }, {
        default: r(() => [
          f(te, {
            icon: i.value,
            readonly: ""
          }, null, 8, ["icon"]),
          l.search && e(s).filters ? (p(), b(ae, {
            key: 0,
            label: e(t)("filters.search"),
            density: "compact",
            class: "ml-2",
            modelValue: e(s).filters[l.search],
            "onUpdate:modelValue": n[0] || (n[0] = (m) => e(s).filters[l.search] = m),
            "hide-details": ""
          }, null, 8, ["label", "modelValue"])) : $("", !0),
          y(u.$slots, "default", {
            list: e(s),
            filters: e(s).filters
          }),
          f(C, {
            onClick: n[1] || (n[1] = D((m) => e(s).fetch(), ["stop"])),
            class: "ml-2",
            icon: "mdi-check",
            "aria-label": u.$t("filters.apply"),
            title: e(t)("filters.apply")
          }, null, 8, ["aria-label", "title"]),
          o.value ? (p(), b(C, {
            key: 1,
            onClick: D(v, ["stop"]),
            icon: "mdi-backspace",
            "aria-label": e(t)("filters.reset"),
            title: e(t)("filters.reset")
          }, null, 8, ["aria-label", "title"])) : $("", !0)
        ]),
        _: 3
      })
    ], 32));
  }
}, ra = xe()({
  name: "VSlideGroupItem",
  props: St(),
  emits: {
    "group:selected": (a) => !0
  },
  setup(a, d) {
    let {
      slots: t
    } = d;
    const s = Ot(a, ht);
    return () => {
      var l;
      return (l = t.default) == null ? void 0 : l.call(t, {
        isSelected: s.isSelected.value,
        select: s.select,
        toggle: s.toggle,
        selectedClass: s.selectedClass.value
      });
    };
  }
}), ua = {
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
    const t = d, s = A("list"), l = a, o = M(() => s.items);
    function i(n) {
      return n = n % l.colors.length, l.colorVariant ? l.colors[n] + "-" + l.colorVariant : l.colors[n];
    }
    function v(n, m, c) {
      n[c] ? !n[c].includes(m) && n[c].push(m) : n[c] = [m];
    }
    const u = M(() => {
      const n = {};
      if (o.value)
        for (var m of o.value) {
          const w = m[l.field];
          if (Array.isArray(w))
            if (w.length)
              for (var c of w)
                v(n, m, c);
            else
              v(n, m, null);
          else
            v(n, m, w);
        }
      return n;
    });
    return (n, m) => (p(), b($e, null, {
      default: r(() => [
        f(Pt, null, {
          default: r(() => [
            (p(!0), S(T, null, E(l.headers, (c, w) => (p(), b(ra, {
              key: c.value
            }, {
              default: r(({ selectedClass: V }) => [
                f(Ct, {
                  width: "400",
                  class: Fe(["ma-3", V]),
                  color: i(w),
                  lines: "two"
                }, {
                  default: r(() => [
                    f(Tt, null, {
                      default: r(() => [
                        P(j(c.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    f(Ve, {
                      "bg-color": i(w)
                    }, {
                      default: r(() => [
                        u.value && u.value[c.value] ? (p(!0), S(T, { key: 0 }, E(u.value[c.value], (k) => y(n.$slots, "item", {
                          key: k.id,
                          header: c,
                          item: k
                        }, () => [
                          f(oe, {
                            title: k[l.itemTitle],
                            value: l.itemValue && k[l.itemValue],
                            onClick: (h) => t("click", k)
                          }, {
                            append: r(() => [
                              y(n.$slots, "item.action")
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
}, Oe = /* @__PURE__ */ U({
  __name: "OxListTable",
  props: {
    // list: Object,
    headers: Array,
    edit: Boolean
  },
  setup(a) {
    const { t: d } = Z(), t = G(), s = se(t, "item.", { exclude: ["item.actions"] }), l = A("panels"), o = A("list"), i = new jt("change"), v = a, u = M(() => v.headers.reduce((c, w) => (c.push(
      typeof w == "string" ? { key: w, title: d(Xe.field(w)) } : w
    ), c), []));
    function n(c) {
      return o.fetch({
        filters: {
          page: c.page,
          page_size: c.itemsPerPage,
          ordering: c.sortBy.map(({ key: w, order: V }) => V == "asc" ? w : `-${w}`)
        }
      });
    }
    function m(c, w) {
      l.show({ view: "detail.edit", value: w });
    }
    return (c, w) => {
      var V;
      return p(), b(At, {
        items: e(o).items,
        "item-index": "id",
        "items-length": e(o).count || e(o).items.length,
        loading: (V = e(o).state) == null ? void 0 : V.isProcessing,
        headers: u.value,
        "onUpdate:options": n
      }, Y({
        loading: r(() => [
          f(Lt, { type: "table-row@10" })
        ]),
        "item.actions": r(({ item: k }) => [
          a.edit ? (p(), b(ie, {
            key: 0,
            icon: "mdi-pencil",
            button: "",
            title: e(d)("actions.edit"),
            permissions: e(i),
            item: k,
            run: m
          }, null, 8, ["title", "permissions", "item"])) : $("", !0),
          y(c.$slots, "item.actions", {
            value: k,
            dense: !0,
            button: !0
          })
        ]),
        _: 2
      }, [
        E(e(s), (k, h) => ({
          name: h,
          fn: r((g) => [
            y(c.$slots, h, L(_(g)))
          ])
        }))
      ]), 1032, ["items", "items-length", "loading", "headers"]);
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
  setup(a) {
    const d = G(), t = a;
    let s = R(!1);
    q(() => t.state.state, (i) => {
      t.delay && i == Ft.PROCESSING && (s.value = !1, window.setTimeout(() => {
        s.value = !0;
      }, 5e3));
    });
    const l = M(() => {
      var i;
      return ((i = t.state) == null ? void 0 : i.isProcessing) && (!t.delay || s.value);
    }), o = M(() => {
      var i, v;
      return (v = (i = t.state) == null ? void 0 : i.data) == null ? void 0 : v.messages;
    });
    return (i, v) => (p(), S(T, null, [
      t.state.isNone && e(d).none ? (p(), b(e(J), {
        key: 0,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        state: a.state,
        title: a.noneTitle
      }, {
        default: r(() => [
          y(i.$slots, "none", { state: a.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : l.value ? (p(), b(e(J), {
        key: 1,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: a.state,
        title: a.processingTitle
      }, {
        default: r(() => [
          y(i.$slots, "processing", { state: a.state }, () => [
            v[0] || (v[0] = P(" Data are being sent to server, please be patient. If this message persist you might wan't to retry. "))
          ])
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isError ? (p(), b(e(J), {
        key: 2,
        type: "error",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: a.state,
        title: a.errorTitle
      }, {
        default: r(() => [
          y(i.$slots, "error", { state: a.state }, () => [
            v[1] || (v[1] = P(" Oups... something wrong happened. "))
          ]),
          y(i.$slots, "error-detail", { state: a.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isOk ? (p(), b(e(J), {
        key: 3,
        type: "success",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: a.state,
        title: a.okTitle
      }, {
        default: r(() => [
          y(i.$slots, "ok", { state: a.state }, () => [
            v[2] || (v[2] = W("p", null, "Congrats! Data have been updated.", -1))
          ]),
          o.value ? (p(), S(T, { key: 0 }, [
            f(Bt),
            (p(!0), S(T, null, E(o.value, (u) => (p(), S("p", null, j(u), 1))), 256))
          ], 64)) : $("", !0),
          y(i.$slots, "ok-detail", { state: a.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : $("", !0),
      y(i.$slots, "default", {
        state: t.state
      })
    ], 64));
  }
}, da = { class: "text-right" }, Pe = {
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
    const t = d, s = a;
    return (l, o) => (p(), S("div", da, [
      f(e(C), {
        color: "error",
        class: "me-2",
        "prepend-icon": s.resetIcon,
        onClick: o[0] || (o[0] = (i) => t("reset")),
        disabled: s.disabled
      }, {
        default: r(() => [
          y(l.$slots, "reset", {}, () => [
            P(j(s.resetLabel), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]),
      s.state.isSending ? (p(), b(e(C), {
        key: 0,
        color: "primary",
        "prepend-icon": "mdi-content-save",
        disabled: ""
      }, {
        default: r(() => o[2] || (o[2] = [
          P(" Saving ")
        ])),
        _: 1
      })) : (p(), b(e(C), {
        key: 1,
        color: "primary",
        "prepend-icon": s.validateIcon,
        onClick: o[1] || (o[1] = (i) => t("validate")),
        disabled: s.disabled || s.validateDisabled
      }, {
        default: r(() => [
          y(l.$slots, "validate", {}, () => [
            P(j(s.validateLabel), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]))
    ]));
  }
}, ca = { key: 0 }, pa = { class: "text-right mt-3" }, ma = {
  __name: "OxLogin",
  props: {
    next: { type: String },
    url: { type: String }
  },
  emits: ["save", "saved"],
  setup(a, { emit: d }) {
    const t = ge("password"), s = a, l = ee({
      username: "",
      password: ""
    }), o = R(!1), i = ee(new Ut());
    function v(n = !0) {
      Rt(l, { username: "", password: "" }), n && i.none();
    }
    async function u() {
      i.processing();
      try {
        const n = await fetch(s.url, {
          method: "POST",
          headers: Gt.axiosConfig.headers,
          body: JSON.stringify(l)
        });
        n.status == 200 ? (l.credentials = "", l.password = "", i.ok(await n.json()), s.next && (window.location.href = s.next)) : i.error(await n.json());
      } catch (n) {
        i.ok((n == null ? void 0 : n.message) || n);
      }
    }
    return (n, m) => (p(), S(T, null, [
      f(e(he), { state: i }, {
        none: r(({ state: c }) => m[7] || (m[7] = [
          W("p", null, "Please enter your credentials in order too proceed...", -1)
        ])),
        "ok-detail": r(({ state: c }) => [
          s.next ? (p(), S("p", ca, [
            m[8] || (m[8] = P("You soon will be redirected to ")),
            W("i", null, j(s.next), 1)
          ])) : $("", !0)
        ]),
        error: r(({ state: c }) => {
          var w, V;
          return [
            f(ne, {
              errors: (w = c.data) == null ? void 0 : w.username
            }, null, 8, ["errors"]),
            f(ne, {
              errors: (V = c.data) == null ? void 0 : V.password
            }, null, 8, ["errors"])
          ];
        }),
        _: 1
      }, 8, ["state"]),
      i.isOk ? $("", !0) : (p(), S(T, { key: 0 }, [
        f(ae, {
          variant: "underlined",
          label: "Enter login",
          modelValue: l.username,
          "onUpdate:modelValue": m[0] || (m[0] = (c) => l.username = c),
          onKeyup: m[1] || (m[1] = de(D((c) => e(t).focus(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue"]),
        f(ae, {
          variant: "underlined",
          ref: "password",
          label: "Enter password",
          modelValue: l.password,
          "onUpdate:modelValue": m[2] || (m[2] = (c) => l.password = c),
          type: o.value ? "text" : "password",
          "append-icon": o.value ? "mdi-eye" : "mdi-eye-off",
          "onClick:append": m[3] || (m[3] = (c) => o.value = !o.value),
          onKeyup: m[4] || (m[4] = de(D((c) => u(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue", "type", "append-icon"]),
        W("div", pa, [
          y(n.$slots, "default", {
            value: l.password
          }, () => [
            l.username && l.password ? (p(), b(Pe, {
              key: 0,
              "validate-label": "Login!",
              onValidate: m[5] || (m[5] = (c) => u()),
              onReset: m[6] || (m[6] = (c) => v()),
              state: i
            }, null, 8, ["state"])) : $("", !0)
          ])
        ])
      ], 64))
    ], 64));
  }
}, Ce = /* @__PURE__ */ U({
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
    const d = G(), t = a, s = Q(d, "views.");
    console.log(s);
    const l = R(!1);
    be(() => {
      l.value = !0;
    });
    const o = A("panels");
    return (i, v) => {
      const u = Ue("ox-state-alert");
      return p(), b(le, {
        value: t.name,
        "onGroup:selected": v[1] || (v[1] = (n) => e(o).reset({ panel: t.name }))
      }, {
        default: r(() => [
          t.state ? (p(), b(u, {
            key: 0,
            state: t.state,
            delay: ""
          }, null, 8, ["state"])) : $("", !0),
          f($e, { class: "ma-4" }, {
            default: r(() => [
              (p(), b(ce, {
                to: "#app-bar-sheet-title",
                disabled: !l.value || e(o).panel != t.name
              }, [
                t.icon ? (p(), b(K, {
                  key: 0,
                  icon: t.icon
                }, null, 8, ["icon"])) : $("", !0),
                P(" " + j(t.title), 1)
              ], 8, ["disabled"])),
              (p(), b(ce, {
                to: "#app-bar-right",
                disabled: !l.value || e(o).panel != t.name
              }, [
                y(i.$slots, "append-title"),
                t.help ? (p(), b(C, {
                  key: 0,
                  class: "ml-3",
                  href: t.help,
                  target: "new",
                  icon: "mdi-information-outline"
                }, null, 8, ["href"])) : $("", !0)
              ], 8, ["disabled"])),
              y(i.$slots, "top"),
              y(i.$slots, "default", {}, () => [
                e(s) ? (p(), b(It, {
                  key: 0,
                  modelValue: e(o).view,
                  "onUpdate:modelValue": v[0] || (v[0] = (n) => e(o).view = n)
                }, {
                  default: r(() => [
                    (p(!0), S(T, null, E(e(s), (n, m) => (p(), b(_t, {
                      key: n,
                      value: n
                    }, {
                      default: r(() => [
                        y(i.$slots, m)
                      ]),
                      _: 2
                    }, 1032, ["value"]))), 128))
                  ]),
                  _: 3
                }, 8, ["modelValue"])) : $("", !0)
              ]),
              y(i.$slots, "bottom")
            ]),
            _: 3
          })
        ]),
        _: 3
      }, 8, ["value"]);
    };
  }
}), Te = {
  __name: "OxModelEdit",
  props: /* @__PURE__ */ Re({
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
    const { t: d } = Z();
    A("context");
    const t = Ge(a, "value"), s = M(() => {
      var c;
      return (c = t.value) == null ? void 0 : c.constructor;
    }), l = A("panels");
    function o(c) {
      l.value && c && (l.value.title = `Edit ${c.$title}`);
    }
    o(t.value), q(t, o);
    const i = R(null), v = G(), u = se(v, "tab.", { exclude: "tab.default" }), n = se(v, "window.", { exclude: "window.default" }), m = M(() => ({
      panels: l,
      value: t.value,
      model: s.value
    }));
    return (c, w) => t.value ? (p(), S(T, { key: 0 }, [
      e(u) && Object.keys(e(u)).length ? (p(), S(T, { key: 0 }, [
        f(Mt, {
          modelValue: i.value,
          "onUpdate:modelValue": w[0] || (w[0] = (V) => i.value = V)
        }, {
          default: r(() => [
            y(c.$slots, "tab.default", L(_(m.value)), () => [
              f(Dt, {
                text: e(d)(`models.${s.value.entity}`),
                value: "model"
              }, null, 8, ["text"])
            ]),
            (p(!0), S(T, null, E(e(u), (V, k) => y(c.$slots, k, F({ ref_for: !0 }, m.value))), 256))
          ]),
          _: 3
        }, 8, ["modelValue"]),
        f(ke, {
          modelValue: i.value,
          "onUpdate:modelValue": w[1] || (w[1] = (V) => i.value = V)
        }, {
          default: r(() => [
            f(le, { value: "model" }, {
              default: r(() => [
                y(c.$slots, "window.default", L(_(m.value)))
              ]),
              _: 3
            }),
            (p(!0), S(T, null, E(e(n), (V, k) => (p(), b(le, { value: V }, {
              default: r(() => [
                y(c.$slots, k, F({ ref_for: !0 }, m.value))
              ]),
              _: 2
            }, 1032, ["value"]))), 256))
          ]),
          _: 3
        }, 8, ["modelValue"])
      ], 64)) : y(c.$slots, "window.default", L(F({ key: 1 }, m.value)))
    ], 64)) : (p(), S(T, { key: 1 }, [
      P(" Nothing to edit ")
    ], 64));
  }
}, va = /* @__PURE__ */ U({
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
    index: { default: "list.table" },
    state: {},
    help: {},
    name: {},
    title: {},
    icon: {},
    search: {},
    view: {},
    headers: {}
  },
  setup(a) {
    const d = G(), t = Q(d, "views.list."), s = Q(d, "item."), l = Q(d, "views.detail.edit."), o = ge("filters"), i = a, v = A("repos"), u = A("panels"), n = pe("query", () => new Ze({ repos: v, repo: i.repo })), m = pe("list", () => new et(n), !0), c = tt({ list: m, query: n, panels: u, props: i }), { showFilters: w } = we(c), V = M(() => [
      ...i.headers,
      { key: "actions", title: O("actions") }
    ]), k = M(() => ({
      panel: c,
      panels: u,
      list: m,
      value: u.value
    }));
    return (h, g) => (p(), b(Ce, {
      name: i.name,
      title: e(c).title,
      icon: e(c).icon,
      state: e(m).state,
      index: i.index
    }, Y({
      "append-title": r(() => {
        var B;
        return [
          y(h.$slots, "append-title", L(_(k.value))),
          e(u).view.startsWith("list.") ? (p(), b(fe, {
            key: 0,
            class: "ml-3",
            color: "secondary",
            density: "compact",
            variant: "tonal"
          }, {
            default: r(() => [
              y(h.$slots, "nav.list", L(_(k.value))),
              e(o) ? (p(), b(C, {
                key: 0,
                title: e(w) ? e(O)("filters.hide") : e(O)("filters.show"),
                "aria-label": e(w) ? e(O)("filters.hide") : e(O)("filters.show"),
                onClick: g[0] || (g[0] = (x) => w.value = !e(w)),
                active: e(w)
              }, {
                default: r(() => [
                  f(K, {
                    icon: e(o).icon
                  }, null, 8, ["icon"])
                ]),
                _: 1
              }, 8, ["title", "aria-label", "active"])) : $("", !0)
            ]),
            _: 3
          })) : e(u).view.startsWith("detail.") && ((B = e(u).value) != null && B.id) ? (p(), b(fe, {
            key: 1,
            class: "ml-3",
            color: "secondary",
            density: "compact",
            variant: "tonal"
          }, {
            default: r(() => [
              y(h.$slots, "nav.detail", L(_(k.value))),
              e(u).view == "detail.edit" && e(u).value ? (p(), b(Et, { key: 0 }, {
                activator: r(({ props: x }) => [
                  f(C, F({ "prepend-icon": "mdi-dots-vertical" }, x), {
                    default: r(() => [
                      P(j(e(O)("actions")), 1)
                    ]),
                    _: 2
                  }, 1040)
                ]),
                default: r(() => [
                  f(Ve, null, {
                    default: r(() => [
                      y(h.$slots, "item.actions", {
                        value: e(u).value
                      })
                    ]),
                    _: 3
                  })
                ]),
                _: 3
              })) : $("", !0),
              f(C, {
                disabled: !e(m).prev,
                title: e(O)("prev"),
                "aria-label": e(O)("prev"),
                onClick: g[1] || (g[1] = D((x) => e(u).value = e(m).prev, ["stop"]))
              }, {
                default: r(() => [
                  f(K, { icon: "mdi-chevron-left" })
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"]),
              f(C, {
                disabled: !e(m).next,
                title: e(O)("next"),
                "aria-label": e(O)("next"),
                onClick: g[2] || (g[2] = D((x) => e(u).value = e(m).next, ["stop"]))
              }, {
                default: r(() => [
                  f(K, { icon: "mdi-chevron-right" })
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"])
            ]),
            _: 3
          })) : $("", !0),
          f(Kt, {
            class: "ml-3",
            color: "secondary",
            modelValue: e(u).view,
            "onUpdate:modelValue": g[4] || (g[4] = (x) => e(u).view = x),
            density: "compact",
            variant: "tonal"
          }, {
            default: r(() => {
              var x;
              return [
                f(C, {
                  value: "list.table",
                  title: e(O)("panels.nav.table"),
                  "aria-label": e(O)("panels.nav.table")
                }, {
                  default: r(() => [
                    f(K, null, {
                      default: r(() => g[6] || (g[6] = [
                        P("mdi-table")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["title", "aria-label"]),
                e(d)["views.list.cards"] ? (p(), b(C, {
                  key: 0,
                  value: "list.cards",
                  title: e(O)("panels.nav.cards"),
                  "aria-label": e(O)("panels.nav.cards")
                }, {
                  default: r(() => [
                    f(K, null, {
                      default: r(() => g[7] || (g[7] = [
                        P("mdi-card-account-details")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["title", "aria-label"])) : $("", !0),
                e(d)["views.list.kanban"] ? (p(), b(C, {
                  key: 1,
                  value: "list.kanban",
                  title: e(O)("panels.nav.kanban"),
                  "aria-label": e(O)("panels.nav.kanban")
                }, {
                  default: r(() => [
                    f(K, null, {
                      default: r(() => g[8] || (g[8] = [
                        P("mdi-view-column")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["title", "aria-label"])) : $("", !0),
                e(d)["views.detail.add"] ? (p(), b(C, {
                  key: 2,
                  value: "detail.add",
                  onClick: g[3] || (g[3] = D((N) => e(c).create(), ["stop"])),
                  title: e(O)("panels.nav.add"),
                  "aria-label": e(O)("panels.nav.add")
                }, {
                  default: r(() => [
                    f(K, null, {
                      default: r(() => g[9] || (g[9] = [
                        P("mdi-plus-box")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["title", "aria-label"])) : $("", !0),
                e(d)["views.detail.edit"] || e(l) ? (p(), b(C, {
                  key: 3,
                  value: "detail.edit",
                  disabled: !((x = e(u).value) != null && x.id),
                  title: e(O)("panels.nav.edit"),
                  "aria-label": e(O)("panels.nav.edit")
                }, {
                  default: r(() => [
                    f(K, null, {
                      default: r(() => g[10] || (g[10] = [
                        P("mdi-pencil")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["disabled", "title", "aria-label"])) : $("", !0),
                y(h.$slots, "nav.views", L(_(k.value)))
              ];
            }),
            _: 3
          }, 8, ["modelValue"])
        ];
      }),
      top: r(() => [
        We(f(Se, {
          ref_key: "filters",
          ref: o,
          search: i.search,
          "teleport-to": "#panel-list-actions"
        }, {
          default: r((B) => [
            y(h.$slots, "list.filters", L(_(B)))
          ]),
          _: 3
        }, 8, ["search"]), [
          [qe, e(u).view.startsWith("list.") && e(w)]
        ])
      ]),
      _: 2
    }, [
      e(d)["views.list.table"] ? void 0 : {
        name: "views.list.table",
        fn: r(() => [
          f(Oe, {
            headers: V.value,
            edit: ""
          }, Y({ _: 2 }, [
            E(e(s), (B, x) => ({
              name: x,
              fn: r((N) => [
                y(h.$slots, x, L(_(N)))
              ])
            }))
          ]), 1032, ["headers"])
        ]),
        key: "0"
      },
      E(e(t), (B, x) => ({
        name: x,
        fn: r(() => [
          y(h.$slots, x, L(_(k.value)))
        ])
      })),
      e(d)["views.detail.edit"] || e(l) ? {
        name: "views.detail.edit",
        fn: r(() => [
          f(Te, {
            value: e(u).value,
            "onUpdate:value": g[5] || (g[5] = (B) => e(u).value = B)
          }, Y({ _: 2 }, [
            E(e(l), (B, x) => ({
              name: B,
              fn: r((N) => [
                y(h.$slots, x, L(_(N)))
              ])
            }))
          ]), 1032, ["value"])
        ]),
        key: "1"
      } : void 0,
      e(d)["views.detail.add"] ? {
        name: "views.detail.add",
        fn: r(() => [
          y(h.$slots, "views.detail.add", F(k.value, {
            saved: (B) => e(c).created(B)
          }))
        ]),
        key: "2"
      } : void 0
    ]), 1032, ["name", "title", "icon", "state", "index"]));
  }
}), fa = /* @__PURE__ */ U({
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
    const d = a, t = A("panels");
    return M(() => !d.auto || panel.name == d.name), (s, l) => (p(), b(oe, {
      active: e(t).panel == d.name,
      "prepend-icon": d.icon,
      title: d.title,
      onClick: l[0] || (l[0] = D((o) => e(t).show(d), ["stop"]))
    }, null, 8, ["active", "prepend-icon", "title"]));
  }
}), ya = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OxAction: ie,
  OxActionModelDelete: Zt,
  OxActions: ea,
  OxApp: sa,
  OxComponent: na,
  OxFieldDetails: ne,
  OxList: ia,
  OxListFilters: Se,
  OxListKanban: ua,
  OxListTable: Oe,
  OxLogin: ma,
  OxModelEdit: Te,
  OxModelPanel: va,
  OxPanel: Ce,
  OxPanelNav: fa,
  OxStateAlert: he,
  OxValidationBtn: Pe
}, Symbol.toStringTag, { value: "Module" })), xa = {
  el: "#app",
  delimiters: ["[[", "]]"],
  components: { ...ya, ...Xt }
};
export {
  xa as App,
  ie as OxAction,
  Zt as OxActionModelDelete,
  ea as OxActions,
  sa as OxApp,
  na as OxComponent,
  ne as OxFieldDetails,
  ia as OxList,
  Se as OxListFilters,
  ua as OxListKanban,
  Oe as OxListTable,
  ma as OxLogin,
  Te as OxModelEdit,
  va as OxModelPanel,
  Ce as OxPanel,
  fa as OxPanelNav,
  he as OxStateAlert,
  Pe as OxValidationBtn
};
//# sourceMappingURL=components.js.map
