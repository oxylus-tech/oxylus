import { defineComponent as N, inject as C, unref as e, openBlock as c, createElementBlock as S, Fragment as P, createBlock as w, withModifiers as I, createCommentVNode as $, useSlots as j, renderSlot as b, normalizeProps as A, guardReactiveProps as B, ref as F, shallowRef as Q, watch as G, onMounted as be, computed as _, onScopeDispose as Me, createVNode as f, mergeProps as K, nextTick as De, watchEffect as Ee, reactive as ee, onErrorCaptured as Ke, resolveComponent as ye, withCtx as r, createTextVNode as h, toDisplayString as E, createElementVNode as R, createSlots as z, h as Ne, renderList as M, toRefs as we, normalizeClass as Fe, useTemplateRef as ge, withKeys as ue, Teleport as de, mergeModels as je, useModel as Ue, withDirectives as Re, vShow as Ge } from "vue";
import { useAction as We, useI18n as X, useAppContext as ze, defineAsyncComponent as Ye, useList as qe, tKeys as He, filterSlots as J, panels as Je, t as O } from "ox";
import { V as T, a as ne, m as Qe, b as Xe, c as Ze, d as et, e as tt, u as at, f as lt, g as st, h as nt, i as ot, j as it, k as rt, l as ce, n as ut, o as dt, p as ct, q as pt, r as mt, s as vt, t as te, v as pe, w as ft, x as bt, y as yt, z as D, A as wt, B as ae, C as gt, D as kt, E as $t, F as ke, G as Vt, H as St, I as xt, J as $e, K as Ot, L as ht, M as H, N as Pt, O as Tt, P as Ct, Q as At, R as Lt, S as Bt, T as me, U as ve, W as _t, X as It } from "./VTabs-96SkQp52.js";
import { j as Mt, x as le, c as Dt, v as Et, S as Kt, r as Nt, h as Ft } from "./vue-i18n-BYedKuo6.js";
import { n as jt, o as Ut, q as Rt, r as Ve, u as Gt, s as Wt, t as zt, v as Yt } from "./theme-CVaNJMoW.js";
import { components as qt } from "ox/vendor";
const oe = /* @__PURE__ */ N({
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
  setup(a, { emit: p }) {
    const t = a, l = p, s = C("context"), i = We({ user: s.user, emits: l }, t);
    async function n(...d) {
      await i.run(...d);
    }
    return (d, v) => e(i).allowed ? (c(), S(P, { key: 0 }, [
      t.button ? (c(), w(T, {
        key: 0,
        variant: "text",
        color: t.color,
        icon: t.icon,
        title: t.title,
        "aria-label": t.title,
        onClick: I(n, ["stop"])
      }, null, 8, ["color", "icon", "title", "aria-label"])) : (c(), w(ne, {
        key: 1,
        title: t.title,
        "base-color": t.color,
        "prepend-icon": t.icon,
        onClick: I(n, ["stop"])
      }, null, 8, ["title", "base-color", "prepend-icon"]))
    ], 64)) : $("", !0);
  }
}), Ht = /* @__PURE__ */ N({
  __name: "OxActionModelDelete",
  props: {
    item: {},
    button: { type: Boolean }
  },
  setup(a) {
    const { t: p } = Mt(), t = C("panel"), l = C("repos"), s = a;
    async function i(n, d) {
      return await l[d.constructor.entity].api().delete(d.$url(), { delete: s.item.id });
    }
    return (n, d) => (c(), w(oe, {
      item: s.item,
      button: s.button,
      icon: "mdi-delete",
      color: "error",
      title: e(p)("actions.delete"),
      confirm: e(p)("actions.delete.confirm"),
      permissions: ["delete", (v, o) => o.id],
      run: i,
      onCompleted: d[0] || (d[0] = (v) => {
        var o;
        return (o = e(t)) == null ? void 0 : o.show();
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
    j();
    const p = a;
    return (t, l) => (c(), S(P, null, [
      b(t.$slots, "before", A(B(p))),
      b(t.$slots, "default", A(B(p))),
      b(t.$slots, "after", A(B(p)))
    ], 64));
  }
};
function Qt(a) {
  const p = Q(a());
  let t = -1;
  function l() {
    clearInterval(t);
  }
  function s() {
    l(), De(() => p.value = a());
  }
  function i(n) {
    const d = n ? getComputedStyle(n) : {
      transitionDuration: 0.2
    }, v = parseFloat(d.transitionDuration) * 1e3 || 200;
    if (l(), p.value <= 0) return;
    const o = performance.now();
    t = window.setInterval(() => {
      const m = performance.now() - o + v;
      p.value = Math.max(a() - m, 0), p.value <= 0 && l();
    }, v);
  }
  return Me(l), {
    clear: l,
    time: p,
    start: i,
    reset: s
  };
}
const Xt = jt({
  multiLine: Boolean,
  text: String,
  timer: [Boolean, String],
  timeout: {
    type: [Number, String],
    default: 5e3
  },
  vertical: Boolean,
  ...Qe({
    location: "bottom"
  }),
  ...Xe(),
  ...Ze(),
  ...et(),
  ...Ut(),
  ...Rt(tt({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
}, "VSnackbar"), Zt = Ve()({
  name: "VSnackbar",
  props: Xt(),
  emits: {
    "update:modelValue": (a) => !0
  },
  setup(a, p) {
    let {
      slots: t
    } = p;
    const l = Gt(a, "modelValue"), {
      positionClasses: s
    } = at(a), {
      scopeId: i
    } = lt(), {
      themeClasses: n
    } = Wt(a), {
      colorClasses: d,
      colorStyles: v,
      variantClasses: o
    } = st(a), {
      roundedClasses: m
    } = nt(a), u = Qt(() => Number(a.timeout)), g = F(), k = F(), y = Q(!1), x = Q(0), V = F(), U = C(ot, void 0);
    zt(() => !!U, () => {
      const L = pt();
      Ee(() => {
        V.value = L.mainStyles.value;
      });
    }), G(l, Y), G(() => a.timeout, Y), be(() => {
      l.value && Y();
    });
    let Z = -1;
    function Y() {
      u.reset(), window.clearTimeout(Z);
      const L = Number(a.timeout);
      if (!l.value || L === -1) return;
      const W = Yt(k.value);
      u.start(W), Z = window.setTimeout(() => {
        l.value = !1;
      }, L);
    }
    function Ce() {
      u.reset(), window.clearTimeout(Z);
    }
    function Ae() {
      y.value = !0, Ce();
    }
    function ie() {
      y.value = !1, Y();
    }
    function Le(L) {
      x.value = L.touches[0].clientY;
    }
    function Be(L) {
      Math.abs(x.value - L.changedTouches[0].clientY) > 50 && (l.value = !1);
    }
    function _e() {
      y.value && ie();
    }
    const Ie = _(() => a.location.split(" ").reduce((L, W) => (L[`v-snackbar--${W}`] = !0, L), {}));
    return it(() => {
      const L = ce.filterProps(a), W = !!(t.default || t.text || a.text);
      return f(ce, K({
        ref: g,
        class: ["v-snackbar", {
          "v-snackbar--active": l.value,
          "v-snackbar--multi-line": a.multiLine && !a.vertical,
          "v-snackbar--timer": !!a.timer,
          "v-snackbar--vertical": a.vertical
        }, Ie.value, s.value, a.class],
        style: [V.value, a.style]
      }, L, {
        modelValue: l.value,
        "onUpdate:modelValue": (q) => l.value = q,
        contentProps: K({
          class: ["v-snackbar__wrapper", n.value, d.value, m.value, o.value],
          style: [v.value],
          onPointerenter: Ae,
          onPointerleave: ie
        }, L.contentProps),
        persistent: !0,
        noClickAnimation: !0,
        scrim: !1,
        scrollStrategy: "none",
        _disableGlobalStack: !0,
        onTouchstartPassive: Le,
        onTouchend: Be,
        onAfterLeave: _e
      }, i), {
        default: () => {
          var q, re;
          return [ut(!1, "v-snackbar"), a.timer && !y.value && f("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [f(dt, {
            ref: k,
            color: typeof a.timer == "string" ? a.timer : "info",
            max: a.timeout,
            "model-value": u.time.value
          }, null)]), W && f("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((q = t.text) == null ? void 0 : q.call(t)) ?? a.text, (re = t.default) == null ? void 0 : re.call(t)]), t.actions && f(ct, {
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
              isActive: l
            })])]
          })];
        },
        activator: t.activator
      });
    }), rt({}, g);
  }
});
var fe;
const ea = /* @__PURE__ */ N({
  __name: "OxApp",
  props: {
    apiUrl: {},
    dataEl: { default: (fe = document.body.dataset) == null ? void 0 : fe.appData },
    models: {},
    data: {}
  },
  setup(a) {
    const { t: p } = X(), t = j(), l = a, s = ee({
      drawer: !0
    }), i = ze(l);
    return G(() => [i.state.state, i.state.data], () => {
      i.showState = !0;
    }), Ke((n, d, v) => {
      i.state.error(`${n}`);
    }), (n, d) => {
      const v = ye("ox-panels");
      return c(), w(mt, null, {
        default: r(() => [
          f(Zt, {
            modelValue: e(i).showState,
            "onUpdate:modelValue": d[0] || (d[0] = (o) => e(i).showState = o),
            color: e(i).state.color,
            "multi-line": ""
          }, {
            default: r(() => [
              h(E(e(i).state.data), 1)
            ]),
            _: 1
          }, 8, ["modelValue", "color"]),
          f(vt, { color: "primary" }, {
            prepend: r(() => [
              f(te, {
                icon: "mdi-apps",
                title: e(p)("nav.panels"),
                "aria-label": e(p)("nav.panels"),
                onClick: d[1] || (d[1] = I((o) => s.drawer = !s.drawer, ["stop"]))
              }, null, 8, ["title", "aria-label"]),
              e(t)["app-nav"] && !s.drawer2 ? (c(), w(te, {
                key: 0,
                icon: "mdi-menu",
                onClick: d[2] || (d[2] = (o) => {
                  s.drawer2 = !0, s.drawer = !1;
                })
              })) : $("", !0)
            ]),
            default: r(() => [
              f(pe, { id: "app-bar-sheet-title" }),
              f(pe, { id: "app-bar-title" }, {
                default: r(() => [
                  b(n.$slots, "title", { context: e(i) })
                ]),
                _: 3
              }),
              f(ft),
              d[4] || (d[4] = R("div", {
                id: "app-bar-right",
                class: "mr-3"
              }, null, -1)),
              b(n.$slots, "app-bar-right", { context: e(i) })
            ]),
            _: 3
          }),
          e(t)["nav-list"] ? (c(), w(bt, {
            key: 0,
            theme: "dark",
            modelValue: s.drawer,
            "onUpdate:modelValue": d[3] || (d[3] = (o) => s.drawer = o)
          }, z({
            default: r(() => [
              b(n.$slots, "nav-start", { context: e(i) }),
              b(n.$slots, "nav-list", { context: e(i) }),
              b(n.$slots, "nav-end", { context: e(i) })
            ]),
            _: 2
          }, [
            e(t)["app-nav"] ? {
              name: "append",
              fn: r(() => [
                d[5] || (d[5] = R("div", { class: "text-right pa-3" }, null, -1))
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["modelValue"])) : $("", !0),
          f(yt, null, {
            default: r(() => [
              b(n.$slots, "main", {}, () => [
                f(v, null, {
                  default: r((o) => [
                    b(n.$slots, "default", K(o, { context: e(i) }))
                  ]),
                  _: 3
                })
              ])
            ]),
            _: 3
          })
        ]),
        _: 3
      });
    };
  }
}), ta = {
  props: {
    src: String,
    is: String
  },
  setup(a) {
    const p = Q(null), t = _(() => {
      if (a.is)
        return a.is;
      let s = a.src.substring(a.src.lastIndexOf("/") + 1);
      if (s && (s = s.substring(0, s.indexOf("."))), !s)
        throw Error(
          "`is` not provided and could not be deducted from `src`."
        );
      return s;
    });
    function l() {
      p.value = Ye(a.src, t.value);
    }
    return G(() => a.src, l), l(), () => Ne(p.value, a);
  }
}, aa = { class: "password-error" }, se = {
  __name: "OxFieldDetails",
  props: {
    state: Object,
    errors: Array
  },
  setup(a) {
    const p = a;
    return (t, l) => p.errors ? (c(!0), S(P, { key: 0 }, M(p.errors, (s) => (c(), S("div", aa, [
      f(D, { icon: "mdi-alert-circle-outline" }),
      h(" " + E(s), 1)
    ]))), 256)) : $("", !0);
  }
}, la = /* @__PURE__ */ N({
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
  setup(a, { expose: p }) {
    const t = a, l = C("repos"), s = C("panel"), { value: i } = we(s), n = qe({ ...t, value: i, repos: l });
    return p({ list: n, value: i }), (d, v) => b(d.$slots, "default", {
      list: e(n),
      value: e(i)
    });
  }
}), Se = {
  __name: "OxListFilters",
  props: {
    search: String
  },
  setup(a, { expose: p }) {
    const { t } = X(), l = C("list"), s = a, i = _(() => {
      const v = l.filters;
      return v && Object.entries(v).some(
        ([o, m]) => !o.startsWith("page") && !o.startsWith("ordering") && !!m
      );
    }), n = _(() => i.value ? "mdi-filter-check" : "mdi-filter-outline");
    function d() {
      l.filters = {}, l.fetch();
    }
    return p({ icon: n, hasFilters: i, reset: d }), (v, o) => (c(), S("form", {
      onSubmit: o[2] || (o[2] = I((m) => e(l).fetch(), ["prevent"])),
      class: "width-full"
    }, [
      f(wt, {
        dense: "",
        color: "transparent"
      }, {
        default: r(() => [
          f(te, {
            icon: n.value,
            readonly: ""
          }, null, 8, ["icon"]),
          s.search && e(l).filters ? (c(), w(ae, {
            key: 0,
            label: e(t)("filters.search"),
            density: "compact",
            class: "ml-2",
            modelValue: e(l).filters[s.search],
            "onUpdate:modelValue": o[0] || (o[0] = (m) => e(l).filters[s.search] = m),
            "hide-details": ""
          }, null, 8, ["label", "modelValue"])) : $("", !0),
          b(v.$slots, "default", {
            list: e(l),
            filters: e(l).filters
          }),
          f(T, {
            onClick: o[1] || (o[1] = I((m) => e(l).fetch(), ["stop"])),
            class: "ml-2",
            icon: "mdi-check",
            "aria-label": v.$t("filters.apply"),
            title: e(t)("filters.apply")
          }, null, 8, ["aria-label", "title"]),
          i.value ? (c(), w(T, {
            key: 1,
            onClick: I(d, ["stop"]),
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
  props: gt(),
  emits: {
    "group:selected": (a) => !0
  },
  setup(a, p) {
    let {
      slots: t
    } = p;
    const l = kt(a, $t);
    return () => {
      var s;
      return (s = t.default) == null ? void 0 : s.call(t, {
        isSelected: l.isSelected.value,
        select: l.select,
        toggle: l.toggle,
        selectedClass: l.selectedClass.value
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
  setup(a, { emit: p }) {
    const t = p, l = C("list"), s = a, i = _(() => l.items);
    function n(o) {
      return o = o % s.colors.length, s.colorVariant ? s.colors[o] + "-" + s.colorVariant : s.colors[o];
    }
    function d(o, m, u) {
      o[u] ? !o[u].includes(m) && o[u].push(m) : o[u] = [m];
    }
    const v = _(() => {
      const o = {};
      if (i.value)
        for (var m of i.value) {
          const g = m[s.field];
          if (Array.isArray(g))
            if (g.length)
              for (var u of g)
                d(o, m, u);
            else
              d(o, m, null);
          else
            d(o, m, g);
        }
      return o;
    });
    return (o, m) => (c(), w(ke, null, {
      default: r(() => [
        f(Vt, null, {
          default: r(() => [
            (c(!0), S(P, null, M(s.headers, (u, g) => (c(), w(sa, {
              key: u.value
            }, {
              default: r(({ selectedClass: k }) => [
                f(St, {
                  width: "400",
                  class: Fe(["ma-3", k]),
                  color: n(g),
                  lines: "two"
                }, {
                  default: r(() => [
                    f(xt, null, {
                      default: r(() => [
                        h(E(u.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    f($e, {
                      "bg-color": n(g)
                    }, {
                      default: r(() => [
                        v.value && v.value[u.value] ? (c(!0), S(P, { key: 0 }, M(v.value[u.value], (y) => b(o.$slots, "item", {
                          key: y.id,
                          header: u,
                          item: y
                        }, () => [
                          f(ne, {
                            title: y[s.itemTitle],
                            value: s.itemValue && y[s.itemValue],
                            onClick: (x) => t("click", y)
                          }, {
                            append: r(() => [
                              b(o.$slots, "item.action")
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
}, xe = /* @__PURE__ */ N({
  __name: "OxListTable",
  props: {
    // list: Object,
    headers: Array,
    edit: Boolean
  },
  setup(a) {
    const { t: p } = X(), t = j(), l = le(t, "item.", { exclude: ["item.actions"] }), s = C("panel"), i = C("list"), n = new Dt("change"), d = a, v = _(() => d.headers.reduce((u, g) => (u.push(
      typeof g == "string" ? { key: g, title: p(He.field(g)) } : g
    ), u), []));
    function o(u) {
      return i.fetch({
        filters: {
          page: u.page,
          page_size: u.itemsPerPage,
          ordering: u.sortBy.map(({ key: g, order: k }) => k == "asc" ? g : `-${g}`)
        }
      });
    }
    function m(u, g) {
      s.show({ path: ".detail.edit", value: g });
    }
    return (u, g) => {
      var k;
      return c(), w(Ot, {
        items: e(i).items,
        "item-index": "id",
        "items-length": e(i).count || e(i).items.length,
        loading: (k = e(i).state) == null ? void 0 : k.isProcessing,
        headers: v.value,
        "onUpdate:options": o
      }, z({
        loading: r(() => [
          f(ht, { type: "table-row@10" })
        ]),
        "item.actions": r(({ item: y }) => [
          a.edit ? (c(), w(oe, {
            key: 0,
            icon: "mdi-pencil",
            button: "",
            title: e(p)("actions.edit"),
            permissions: e(n),
            item: y,
            run: m
          }, null, 8, ["title", "permissions", "item"])) : $("", !0),
          b(u.$slots, "item.actions", {
            value: y,
            dense: !0,
            button: !0
          })
        ]),
        _: 2
      }, [
        M(e(l), (y, x) => ({
          name: x,
          fn: r((V) => [
            b(u.$slots, x, A(B(V)))
          ])
        }))
      ]), 1032, ["items", "items-length", "loading", "headers"]);
    };
  }
}), Oe = {
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
    const p = j(), t = a;
    let l = F(!1);
    G(() => t.state.state, (n) => {
      t.delay && n == Et.PROCESSING && (l.value = !1, window.setTimeout(() => {
        l.value = !0;
      }, 5e3));
    });
    const s = _(() => {
      var n;
      return ((n = t.state) == null ? void 0 : n.isProcessing) && (!t.delay || l.value);
    }), i = _(() => {
      var n, d;
      return (d = (n = t.state) == null ? void 0 : n.data) == null ? void 0 : d.messages;
    });
    return (n, d) => (c(), S(P, null, [
      t.state.isNone && e(p).none ? (c(), w(e(H), {
        key: 0,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        state: a.state,
        title: a.noneTitle
      }, {
        default: r(() => [
          b(n.$slots, "none", { state: a.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : s.value ? (c(), w(e(H), {
        key: 1,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: a.state,
        title: a.processingTitle
      }, {
        default: r(() => [
          b(n.$slots, "processing", { state: a.state }, () => [
            d[0] || (d[0] = h(" Data are being sent to server, please be patient. If this message persist you might wan't to retry. "))
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
        default: r(() => [
          b(n.$slots, "error", { state: a.state }, () => [
            d[1] || (d[1] = h(" Oups... something wrong happened. "))
          ]),
          b(n.$slots, "error-detail", { state: a.state })
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
        default: r(() => [
          b(n.$slots, "ok", { state: a.state }, () => [
            d[2] || (d[2] = R("p", null, "Congrats! Data have been updated.", -1))
          ]),
          i.value ? (c(), S(P, { key: 0 }, [
            f(Pt),
            (c(!0), S(P, null, M(i.value, (v) => (c(), S("p", null, E(v), 1))), 256))
          ], 64)) : $("", !0),
          b(n.$slots, "ok-detail", { state: a.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : $("", !0),
      b(n.$slots, "default", {
        state: t.state
      })
    ], 64));
  }
}, oa = { class: "text-right" }, he = {
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
  setup(a, { emit: p }) {
    const t = p, l = a;
    return (s, i) => (c(), S("div", oa, [
      f(e(T), {
        color: "error",
        class: "me-2",
        "prepend-icon": l.resetIcon,
        onClick: i[0] || (i[0] = (n) => t("reset")),
        disabled: l.disabled
      }, {
        default: r(() => [
          b(s.$slots, "reset", {}, () => [
            h(E(l.resetLabel), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]),
      l.state.isSending ? (c(), w(e(T), {
        key: 0,
        color: "primary",
        "prepend-icon": "mdi-content-save",
        disabled: ""
      }, {
        default: r(() => i[2] || (i[2] = [
          h(" Saving ")
        ])),
        _: 1
      })) : (c(), w(e(T), {
        key: 1,
        color: "primary",
        "prepend-icon": l.validateIcon,
        onClick: i[1] || (i[1] = (n) => t("validate")),
        disabled: l.disabled || l.validateDisabled
      }, {
        default: r(() => [
          b(s.$slots, "validate", {}, () => [
            h(E(l.validateLabel), 1)
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
  setup(a, { emit: p }) {
    const t = ge("password"), l = a, s = ee({
      username: "",
      password: ""
    }), i = F(!1), n = ee(new Kt());
    function d(o = !0) {
      Nt(s, { username: "", password: "" }), o && n.none();
    }
    async function v() {
      n.processing();
      try {
        const o = await fetch(l.url, {
          method: "POST",
          headers: Ft.axiosConfig.headers,
          body: JSON.stringify(s)
        });
        o.status == 200 ? (s.credentials = "", s.password = "", n.ok(await o.json()), l.next && (window.location.href = l.next)) : n.error(await o.json());
      } catch (o) {
        n.ok((o == null ? void 0 : o.message) || o);
      }
    }
    return (o, m) => (c(), S(P, null, [
      f(e(Oe), { state: n }, {
        none: r(({ state: u }) => m[7] || (m[7] = [
          R("p", null, "Please enter your credentials in order too proceed...", -1)
        ])),
        "ok-detail": r(({ state: u }) => [
          l.next ? (c(), S("p", ia, [
            m[8] || (m[8] = h("You soon will be redirected to ")),
            R("i", null, E(l.next), 1)
          ])) : $("", !0)
        ]),
        error: r(({ state: u }) => {
          var g, k;
          return [
            f(se, {
              errors: (g = u.data) == null ? void 0 : g.username
            }, null, 8, ["errors"]),
            f(se, {
              errors: (k = u.data) == null ? void 0 : k.password
            }, null, 8, ["errors"])
          ];
        }),
        _: 1
      }, 8, ["state"]),
      n.isOk ? $("", !0) : (c(), S(P, { key: 0 }, [
        f(ae, {
          variant: "underlined",
          label: "Enter login",
          modelValue: s.username,
          "onUpdate:modelValue": m[0] || (m[0] = (u) => s.username = u),
          onKeyup: m[1] || (m[1] = ue(I((u) => e(t).focus(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue"]),
        f(ae, {
          variant: "underlined",
          ref: "password",
          label: "Enter password",
          modelValue: s.password,
          "onUpdate:modelValue": m[2] || (m[2] = (u) => s.password = u),
          type: i.value ? "text" : "password",
          "append-icon": i.value ? "mdi-eye" : "mdi-eye-off",
          "onClick:append": m[3] || (m[3] = (u) => i.value = !i.value),
          onKeyup: m[4] || (m[4] = ue(I((u) => v(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue", "type", "append-icon"]),
        R("div", ra, [
          b(o.$slots, "default", {
            value: s.password
          }, () => [
            s.username && s.password ? (c(), w(he, {
              key: 0,
              "validate-label": "Login!",
              onValidate: m[5] || (m[5] = (u) => v()),
              onReset: m[6] || (m[6] = (u) => d()),
              state: n
            }, null, 8, ["state"])) : $("", !0)
          ])
        ])
      ], 64))
    ], 64));
  }
}, Pe = /* @__PURE__ */ N({
  __name: "OxPanel",
  props: {
    state: {},
    help: {},
    name: {},
    title: {},
    icon: {}
  },
  setup(a) {
    const p = j(), t = a, l = J(p, "views."), s = F(!1);
    be(() => {
      s.value = !0;
    });
    const i = C("panelTarget");
    return (n, d) => {
      const v = ye("ox-state-alert");
      return c(), S(P, null, [
        t.state ? (c(), w(v, {
          key: 0,
          state: t.state,
          delay: ""
        }, null, 8, ["state"])) : $("", !0),
        f(ke, { class: "ma-4" }, {
          default: r(() => [
            (c(), w(de, {
              to: "#app-bar-sheet-title",
              disabled: !s.value || n.panel.name != t.name
            }, [
              t.icon ? (c(), w(D, {
                key: 0,
                icon: t.icon
              }, null, 8, ["icon"])) : $("", !0),
              h(" " + E(t.title), 1)
            ], 8, ["disabled"])),
            (c(), w(de, {
              to: "#app-bar-right",
              disabled: !s.value || n.panel.name != t.name
            }, [
              b(n.$slots, "append-title"),
              t.help ? (c(), w(T, {
                key: 0,
                class: "ml-3",
                href: t.help,
                target: "new",
                icon: "mdi-information-outline"
              }, null, 8, ["href"])) : $("", !0)
            ], 8, ["disabled"])),
            b(n.$slots, "top"),
            b(n.$slots, "default", {}, () => [
              n.viewSlots ? (c(), w(Tt, {
                key: 0,
                modelValue: e(i).view,
                "onUpdate:modelValue": d[0] || (d[0] = (o) => e(i).view = o)
              }, {
                default: r(() => [
                  (c(!0), S(P, null, M(e(l), (o, m) => (c(), w(Ct, {
                    key: o,
                    value: o
                  }, {
                    default: r(() => [
                      b(n.$slots, m)
                    ]),
                    _: 2
                  }, 1032, ["value"]))), 128))
                ]),
                _: 3
              }, 8, ["modelValue"])) : $("", !0)
            ]),
            b(n.$slots, "bottom")
          ]),
          _: 3
        })
      ], 64);
    };
  }
}), Te = {
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
  setup(a) {
    const { t: p } = X();
    C("context");
    const t = Ue(a, "value"), l = _(() => {
      var u;
      return (u = t.value) == null ? void 0 : u.constructor;
    }), s = C("panel");
    function i(u) {
      s.value && u && (s.value.title = `Edit ${u.$title}`);
    }
    i(t.value), G(t, i);
    const n = F(null), d = j(), v = le(d, "tab.", { exclude: "tab.default" }), o = le(d, "window.", { exclude: "window.default" }), m = _(() => ({
      panel: s,
      value: t.value,
      model: l.value
    }));
    return (u, g) => t.value ? (c(), S(P, { key: 0 }, [
      e(v) && Object.keys(e(v)).length ? (c(), S(P, { key: 0 }, [
        f(At, {
          modelValue: n.value,
          "onUpdate:modelValue": g[0] || (g[0] = (k) => n.value = k)
        }, {
          default: r(() => [
            b(u.$slots, "tab.default", A(B(m.value)), () => [
              f(Lt, {
                text: e(p)(`models.${l.value.entity}`),
                value: "model"
              }, null, 8, ["text"])
            ]),
            (c(!0), S(P, null, M(e(v), (k, y) => b(u.$slots, y, K({ ref_for: !0 }, m.value))), 256))
          ]),
          _: 3
        }, 8, ["modelValue"]),
        f(Bt, {
          modelValue: n.value,
          "onUpdate:modelValue": g[1] || (g[1] = (k) => n.value = k)
        }, {
          default: r(() => [
            f(me, { value: "model" }, {
              default: r(() => [
                b(u.$slots, "window.default", A(B(m.value)))
              ]),
              _: 3
            }),
            (c(!0), S(P, null, M(e(o), (k, y) => (c(), w(me, { value: k }, {
              default: r(() => [
                b(u.$slots, y, K({ ref_for: !0 }, m.value))
              ]),
              _: 2
            }, 1032, ["value"]))), 256))
          ]),
          _: 3
        }, 8, ["modelValue"])
      ], 64)) : b(u.$slots, "window.default", A(K({ key: 1 }, m.value)))
    ], 64)) : (c(), S(P, { key: 1 }, [
      h(" Nothing to edit ")
    ], 64));
  }
}, da = /* @__PURE__ */ N({
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
    help: {},
    name: {},
    title: {},
    icon: {},
    search: {},
    view: {},
    headers: {}
  },
  setup(a) {
    const p = j(), t = J(p, "views.list."), l = J(p, "item."), s = J(p, "views.detail.edit."), i = ge("filters"), n = a, d = C("repos"), v = C("panelTarget"), o = Je.useModelPanel({ repos: d, target: v, props: n }), { list: m, showFilters: u } = we(o), g = _(() => ({
      target: v,
      list: m,
      value: panel.value
    }));
    return (k, y) => (c(), w(Pe, {
      name: n.name,
      title: e(o).title,
      icon: e(o).icon,
      state: e(m).state
    }, z({
      "append-title": r(() => {
        var x;
        return [
          b(k.$slots, "append-title", A(B(g.value))),
          e(v).view.startsWith("list.") ? (c(), w(ve, {
            key: 0,
            class: "ml-3",
            color: "secondary",
            density: "compact",
            variant: "tonal"
          }, {
            default: r(() => [
              b(k.$slots, "nav.list", A(B(g.value))),
              e(i) ? (c(), w(T, {
                key: 0,
                title: e(u) ? e(O)("filters.hide") : e(O)("filters.show"),
                "aria-label": e(u) ? e(O)("filters.hide") : e(O)("filters.show"),
                onClick: y[0] || (y[0] = (V) => u.value = !e(u)),
                active: e(u)
              }, {
                default: r(() => [
                  f(D, {
                    icon: e(i).icon
                  }, null, 8, ["icon"])
                ]),
                _: 1
              }, 8, ["title", "aria-label", "active"])) : $("", !0)
            ]),
            _: 3
          })) : e(v).view.startsWith("detail.") && ((x = e(v).value) != null && x.id) ? (c(), w(ve, {
            key: 1,
            class: "ml-3",
            color: "secondary",
            density: "compact",
            variant: "tonal"
          }, {
            default: r(() => [
              b(k.$slots, "nav.detail", A(B(g.value))),
              e(v).view == "detail.edit" && e(v).value ? (c(), w(_t, { key: 0 }, {
                activator: r(({ props: V }) => [
                  f(T, K({ "prepend-icon": "mdi-dots-vertical" }, V), {
                    default: r(() => [
                      h(E(e(O)("actions")), 1)
                    ]),
                    _: 2
                  }, 1040)
                ]),
                default: r(() => [
                  f($e, null, {
                    default: r(() => [
                      b(k.$slots, "item.actions", {
                        value: e(v).value
                      })
                    ]),
                    _: 3
                  })
                ]),
                _: 3
              })) : $("", !0),
              f(T, {
                disabled: !e(m).prev,
                title: e(O)("prev"),
                "aria-label": e(O)("prev"),
                onClick: y[1] || (y[1] = I((V) => e(v).value = e(m).prev, ["stop"]))
              }, {
                default: r(() => [
                  f(D, { icon: "mdi-chevron-left" })
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"]),
              f(T, {
                disabled: !e(m).next,
                title: e(O)("next"),
                "aria-label": e(O)("next"),
                onClick: y[2] || (y[2] = I((V) => e(v).value = e(m).next, ["stop"]))
              }, {
                default: r(() => [
                  f(D, { icon: "mdi-chevron-right" })
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"])
            ]),
            _: 3
          })) : $("", !0),
          f(It, {
            class: "ml-3",
            color: "secondary",
            modelValue: e(v).view,
            "onUpdate:modelValue": y[4] || (y[4] = (V) => e(v).view = V),
            density: "compact",
            variant: "tonal"
          }, {
            default: r(() => {
              var V;
              return [
                f(T, {
                  value: "list.table",
                  title: e(O)("panels.nav.table"),
                  "aria-label": e(O)("panels.nav.table")
                }, {
                  default: r(() => [
                    f(D, null, {
                      default: r(() => y[6] || (y[6] = [
                        h("mdi-table")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["title", "aria-label"]),
                e(p)["views.list.cards"] ? (c(), w(T, {
                  key: 0,
                  value: "list.cards",
                  title: e(O)("panels.nav.cards"),
                  "aria-label": e(O)("panels.nav.cards")
                }, {
                  default: r(() => [
                    f(D, null, {
                      default: r(() => y[7] || (y[7] = [
                        h("mdi-card-account-details")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["title", "aria-label"])) : $("", !0),
                e(p)["views.list.kanban"] ? (c(), w(T, {
                  key: 1,
                  value: "list.kanban",
                  title: e(O)("panels.nav.kanban"),
                  "aria-label": e(O)("panels.nav.kanban")
                }, {
                  default: r(() => [
                    f(D, null, {
                      default: r(() => y[8] || (y[8] = [
                        h("mdi-view-column")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["title", "aria-label"])) : $("", !0),
                e(p)["views.detail.add"] ? (c(), w(T, {
                  key: 2,
                  value: "detail.add",
                  onClick: y[3] || (y[3] = I((U) => e(o).create(), ["stop"])),
                  title: e(O)("panels.nav.add"),
                  "aria-label": e(O)("panels.nav.add")
                }, {
                  default: r(() => [
                    f(D, null, {
                      default: r(() => y[9] || (y[9] = [
                        h("mdi-plus-box")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["title", "aria-label"])) : $("", !0),
                e(p)["views.detail.edit"] || e(s) ? (c(), w(T, {
                  key: 3,
                  value: "detail.edit",
                  disabled: !((V = e(v).value) != null && V.id),
                  title: e(O)("panels.nav.edit"),
                  "aria-label": e(O)("panels.nav.edit")
                }, {
                  default: r(() => [
                    f(D, null, {
                      default: r(() => y[10] || (y[10] = [
                        h("mdi-pencil")
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
      top: r(() => [
        Re(f(Se, {
          ref_key: "filters",
          ref: i,
          search: n.search,
          "teleport-to": "#panel-list-actions"
        }, {
          default: r((x) => [
            b(k.$slots, "list.filters", A(B(x)))
          ]),
          _: 3
        }, 8, ["search"]), [
          [Ge, e(v).view.startsWith("list.") && e(u)]
        ])
      ]),
      _: 2
    }, [
      e(p)["views.list.table"] ? void 0 : {
        name: "views.list.table",
        fn: r(() => [
          f(xe, {
            headers: k.headers,
            edit: ""
          }, z({ _: 2 }, [
            M(e(l), (x, V) => ({
              name: V,
              fn: r((U) => [
                b(k.$slots, V, A(B(U)))
              ])
            }))
          ]), 1032, ["headers"])
        ]),
        key: "0"
      },
      M(e(t), (x, V) => ({
        name: V,
        fn: r(() => [
          b(k.$slots, V, A(B(g.value)))
        ])
      })),
      e(p)["views.detail.edit"] || e(s) ? {
        name: "views.detail.edit",
        fn: r(() => [
          f(Te, {
            value: e(v).value,
            "onUpdate:value": y[5] || (y[5] = (x) => e(v).value = x)
          }, z({ _: 2 }, [
            M(e(s), (x, V) => ({
              name: x,
              fn: r((U) => [
                b(k.$slots, V, A(B(U)))
              ])
            }))
          ]), 1032, ["value"])
        ]),
        key: "1"
      } : void 0,
      e(p)["views.detail.add"] ? {
        name: "views.detail.add",
        fn: r(() => [
          b(k.$slots, "views.detail.add", K(g.value, {
            saved: (x) => e(o).created(x)
          }))
        ]),
        key: "2"
      } : void 0
    ]), 1032, ["name", "title", "icon", "state"]));
  }
}), ca = /* @__PURE__ */ N({
  __name: "OxPanelNav",
  props: {
    name: {},
    title: {},
    icon: {},
    panel: {},
    view: {},
    value: {},
    auto: { type: Boolean }
  },
  setup(a, { expose: p }) {
    const t = a, l = C("panel"), s = _(() => !t.auto || l.name == t.name), i = _(() => {
      const n = l.name == t.name && l.edited ? "*" : "";
      return t.title + n;
    });
    return p({ title: i, name: t.name }), (n, d) => s.value ? (c(), w(ne, {
      key: 0,
      active: e(l).name == t.name,
      "prepend-icon": t.icon,
      title: t.title,
      onClick: d[0] || (d[0] = I((v) => e(l).show({ path: t.path ?? t.name }), ["stop"]))
    }, null, 8, ["active", "prepend-icon", "title"])) : $("", !0);
  }
}), pa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OxAction: oe,
  OxActionModelDelete: Ht,
  OxActions: Jt,
  OxApp: ea,
  OxComponent: ta,
  OxFieldDetails: se,
  OxList: la,
  OxListFilters: Se,
  OxListKanban: na,
  OxListTable: xe,
  OxLogin: ua,
  OxModelEdit: Te,
  OxModelPanel: da,
  OxPanel: Pe,
  OxPanelNav: ca,
  OxStateAlert: Oe,
  OxValidationBtn: he
}, Symbol.toStringTag, { value: "Module" })), ga = {
  el: "#app",
  delimiters: ["[[", "]]"],
  components: { ...pa, ...qt }
};
export {
  ga as App,
  oe as OxAction,
  Ht as OxActionModelDelete,
  Jt as OxActions,
  ea as OxApp,
  ta as OxComponent,
  se as OxFieldDetails,
  la as OxList,
  Se as OxListFilters,
  na as OxListKanban,
  xe as OxListTable,
  ua as OxLogin,
  Te as OxModelEdit,
  da as OxModelPanel,
  Pe as OxPanel,
  ca as OxPanelNav,
  Oe as OxStateAlert,
  he as OxValidationBtn
};
//# sourceMappingURL=components.js.map
