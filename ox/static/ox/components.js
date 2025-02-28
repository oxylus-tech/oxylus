import { defineComponent as F, inject as D, unref as e, openBlock as p, createElementBlock as S, Fragment as P, createBlock as w, withModifiers as I, createCommentVNode as k, useSlots as R, renderSlot as b, normalizeProps as T, guardReactiveProps as L, ref as U, shallowRef as Q, watch as z, onMounted as be, computed as B, onScopeDispose as _e, createVNode as v, mergeProps as E, nextTick as Me, watchEffect as De, reactive as ee, onErrorCaptured as Ne, withCtx as o, createTextVNode as h, toDisplayString as N, createElementVNode as j, createSlots as K, h as Ee, renderList as _, normalizeClass as Ue, useTemplateRef as ye, withKeys as de, resolveComponent as je, Teleport as ce, mergeModels as Fe, useModel as Re, toRefs as Ge, withDirectives as We, vShow as Ke } from "vue";
import { useAction as ze, useI18n as X, useAppContext as Ye, usePanels as qe, defineAsyncComponent as He, tKeys as Je, filterSlots as J, useModelPanel as Qe, t as x } from "ox";
import { V as C, a as oe, m as Xe, b as Ze, c as et, d as tt, e as at, u as lt, f as st, g as nt, h as ot, i as it, j as rt, k as ut, l as pe, n as dt, o as ct, p as pt, q as mt, r as vt, s as ft, t as te, v as me, w as bt, x as yt, y as wt, z as we, A as M, B as gt, C as ae, D as kt, E as Vt, F as $t, G as ge, H as St, I as xt, J as Ot, K as ke, L as ht, M as Ct, N as H, O as Pt, P as le, Q as Tt, R as At, S as Lt, T as Bt, U as ve, W as It, X as _t } from "./VAlert-CTpFsU7b.js";
import { j as Mt, y as se, c as Dt, v as Nt, S as Et, r as Ut, h as jt } from "./vue-i18n-DJtD-m_6.js";
import { n as Ft, o as Rt, q as Gt, r as Ve, u as Wt, s as Kt, t as zt, v as Yt } from "./theme-CVupjJDc.js";
import { components as qt } from "ox/vendor";
const ie = /* @__PURE__ */ F({
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
    const t = a, n = d, s = D("context"), r = ze({ user: s.user, emits: n }, t);
    async function u(...c) {
      await r.run(...c);
    }
    return (c, i) => e(r).allowed ? (p(), S(P, { key: 0 }, [
      t.button ? (p(), w(C, {
        key: 0,
        variant: "text",
        color: t.color,
        icon: t.icon,
        title: t.title,
        "aria-label": t.title,
        onClick: I(u, ["stop"])
      }, null, 8, ["color", "icon", "title", "aria-label"])) : (p(), w(oe, {
        key: 1,
        title: t.title,
        "base-color": t.color,
        "prepend-icon": t.icon,
        onClick: I(u, ["stop"])
      }, null, 8, ["title", "base-color", "prepend-icon"]))
    ], 64)) : k("", !0);
  }
}), Ht = /* @__PURE__ */ F({
  __name: "OxActionModelDelete",
  props: {
    item: {},
    button: { type: Boolean }
  },
  setup(a) {
    const { t: d } = Mt(), t = D("panels"), n = D("repos"), s = a;
    async function r(u, c) {
      return await n[c.constructor.entity].api().delete(c.$url(), { delete: s.item.id });
    }
    return (u, c) => (p(), w(ie, {
      item: s.item,
      button: s.button,
      icon: "mdi-delete",
      color: "error",
      title: e(d)("actions.delete"),
      confirm: e(d)("actions.delete.confirm"),
      permissions: ["delete", (i, l) => l.id],
      run: r,
      onCompleted: c[0] || (c[0] = (i) => {
        var l;
        return (l = e(t)) == null ? void 0 : l.show();
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
    R();
    const d = a;
    return (t, n) => (p(), S(P, null, [
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
  function s() {
    n(), Me(() => d.value = a());
  }
  function r(u) {
    const c = u ? getComputedStyle(u) : {
      transitionDuration: 0.2
    }, i = parseFloat(c.transitionDuration) * 1e3 || 200;
    if (n(), d.value <= 0) return;
    const l = performance.now();
    t = window.setInterval(() => {
      const m = performance.now() - l + i;
      d.value = Math.max(a() - m, 0), d.value <= 0 && n();
    }, i);
  }
  return _e(n), {
    clear: n,
    time: d,
    start: r,
    reset: s
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
      positionClasses: s
    } = lt(a), {
      scopeId: r
    } = st(), {
      themeClasses: u
    } = Kt(a), {
      colorClasses: c,
      colorStyles: i,
      variantClasses: l
    } = nt(a), {
      roundedClasses: m
    } = ot(a), f = Qt(() => Number(a.timeout)), g = U(), V = U(), y = Q(!1), O = Q(0), $ = U(), G = D(it, void 0);
    zt(() => !!G, () => {
      const A = mt();
      De(() => {
        $.value = A.mainStyles.value;
      });
    }), z(n, Y), z(() => a.timeout, Y), be(() => {
      n.value && Y();
    });
    let Z = -1;
    function Y() {
      f.reset(), window.clearTimeout(Z);
      const A = Number(a.timeout);
      if (!n.value || A === -1) return;
      const W = Yt(V.value);
      f.start(W), Z = window.setTimeout(() => {
        n.value = !1;
      }, A);
    }
    function Pe() {
      f.reset(), window.clearTimeout(Z);
    }
    function Te() {
      y.value = !0, Pe();
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
    const Ie = B(() => a.location.split(" ").reduce((A, W) => (A[`v-snackbar--${W}`] = !0, A), {}));
    return rt(() => {
      const A = pe.filterProps(a), W = !!(t.default || t.text || a.text);
      return v(pe, E({
        ref: g,
        class: ["v-snackbar", {
          "v-snackbar--active": n.value,
          "v-snackbar--multi-line": a.multiLine && !a.vertical,
          "v-snackbar--timer": !!a.timer,
          "v-snackbar--vertical": a.vertical
        }, Ie.value, s.value, a.class],
        style: [$.value, a.style]
      }, A, {
        modelValue: n.value,
        "onUpdate:modelValue": (q) => n.value = q,
        contentProps: E({
          class: ["v-snackbar__wrapper", u.value, c.value, m.value, l.value],
          style: [i.value],
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
      }, r), {
        default: () => {
          var q, ue;
          return [dt(!1, "v-snackbar"), a.timer && !y.value && v("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [v(ct, {
            ref: V,
            color: typeof a.timer == "string" ? a.timer : "info",
            max: a.timeout,
            "model-value": f.time.value
          }, null)]), W && v("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((q = t.text) == null ? void 0 : q.call(t)) ?? a.text, (ue = t.default) == null ? void 0 : ue.call(t)]), t.actions && v(pt, {
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
              isActive: n
            })])]
          })];
        },
        activator: t.activator
      });
    }), ut({}, g);
  }
}), ea = { class: "nav-home" }, ta = ["src"];
var fe;
const aa = /* @__PURE__ */ F({
  __name: "OxApp",
  props: {
    apiUrl: {},
    logo: {},
    dataEl: { default: (fe = document.body.dataset) == null ? void 0 : fe.appData },
    models: {},
    data: {}
  },
  setup(a) {
    const { t: d } = X(), t = R(), n = a, s = ee({ drawer: !0 }), r = Ye(n), u = qe();
    return z(() => [r.state.state, r.state.data], () => {
      r.showState = !0;
    }), Ne((c, i, l) => {
      r.state.error(`${c}`);
    }), (c, i) => (p(), w(vt, null, {
      default: o(() => [
        v(Zt, {
          modelValue: e(r).showState,
          "onUpdate:modelValue": i[0] || (i[0] = (l) => e(r).showState = l),
          color: e(r).state.color,
          "multi-line": ""
        }, {
          default: o(() => [
            h(N(e(r).state.data), 1)
          ]),
          _: 1
        }, 8, ["modelValue", "color"]),
        v(ft, { color: "primary" }, {
          prepend: o(() => [
            v(te, {
              icon: "mdi-apps",
              title: e(d)("nav.panels"),
              "aria-label": e(d)("nav.panels"),
              onClick: i[1] || (i[1] = I((l) => s.drawer = !s.drawer, ["stop"]))
            }, null, 8, ["title", "aria-label"]),
            e(t)["app-nav"] && !s.drawer2 ? (p(), w(te, {
              key: 0,
              icon: "mdi-menu",
              onClick: i[2] || (i[2] = (l) => {
                s.drawer2 = !0, s.drawer = !1;
              })
            })) : k("", !0)
          ]),
          default: o(() => [
            v(me, { id: "app-bar-sheet-title" }),
            v(me, { id: "app-bar-title" }, {
              default: o(() => [
                b(c.$slots, "title", { context: e(r) })
              ]),
              _: 3
            }),
            v(bt),
            i[5] || (i[5] = j("div", {
              id: "app-bar-right",
              class: "mr-3"
            }, null, -1)),
            b(c.$slots, "app-bar-right", { context: e(r) })
          ]),
          _: 3
        }),
        v(yt, {
          theme: "dark",
          modelValue: s.drawer,
          "onUpdate:modelValue": i[3] || (i[3] = (l) => s.drawer = l)
        }, K({
          default: o(() => [
            j("a", ea, [
              c.logo ? (p(), S("img", {
                key: 0,
                src: c.logo,
                class: "logo"
              }, null, 8, ta)) : k("", !0)
            ]),
            b(c.$slots, "nav-start", { context: e(r) }),
            b(c.$slots, "nav-list", { context: e(r) }),
            b(c.$slots, "nav-end", { context: e(r) })
          ]),
          _: 2
        }, [
          e(t)["app-nav"] ? {
            name: "append",
            fn: o(() => [
              i[6] || (i[6] = j("div", { class: "text-right pa-3" }, null, -1))
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue"]),
        v(wt, null, {
          default: o(() => [
            b(c.$slots, "main", {}, () => [
              v(we, {
                modelValue: e(u).panel,
                "onUpdate:modelValue": i[4] || (i[4] = (l) => e(u).panel = l)
              }, {
                default: o((l) => [
                  b(c.$slots, "default", E(l, { context: e(r) }))
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
}), la = {
  props: {
    src: String,
    is: String
  },
  setup(a) {
    const d = Q(null), t = B(() => {
      if (a.is)
        return a.is;
      let s = a.src.substring(a.src.lastIndexOf("/") + 1);
      if (s && (s = s.substring(0, s.indexOf("."))), !s)
        throw Error(
          "`is` not provided and could not be deducted from `src`."
        );
      return s;
    });
    function n() {
      d.value = He(a.src, t.value);
    }
    return z(() => a.src, n), n(), () => Ee(d.value, a);
  }
}, sa = { class: "password-error" }, ne = {
  __name: "OxFieldDetails",
  props: {
    state: Object,
    errors: Array
  },
  setup(a) {
    const d = a;
    return (t, n) => d.errors ? (p(!0), S(P, { key: 0 }, _(d.errors, (s) => (p(), S("div", sa, [
      v(M, { icon: "mdi-alert-circle-outline" }),
      h(" " + N(s), 1)
    ]))), 256)) : k("", !0);
  }
}, $e = {
  __name: "OxListFilters",
  props: {
    search: String
  },
  setup(a, { expose: d }) {
    const { t } = X(), n = D("list"), s = a, r = B(() => {
      const i = n.filters;
      return i && Object.entries(i).some(
        ([l, m]) => !l.startsWith("page") && !l.startsWith("ordering") && !!m
      );
    }), u = B(() => r.value ? "mdi-filter-check" : "mdi-filter-outline");
    function c() {
      n.filters = {}, n.fetch();
    }
    return d({ icon: u, hasFilters: r, reset: c }), (i, l) => (p(), S("form", {
      onSubmit: l[2] || (l[2] = I((m) => e(n).fetch(), ["prevent"])),
      class: "width-full"
    }, [
      v(gt, {
        dense: "",
        color: "transparent"
      }, {
        default: o(() => [
          v(te, {
            icon: u.value,
            readonly: ""
          }, null, 8, ["icon"]),
          s.search && e(n).filters ? (p(), w(ae, {
            key: 0,
            label: e(t)("filters.search"),
            density: "compact",
            class: "ml-2",
            modelValue: e(n).filters[s.search],
            "onUpdate:modelValue": l[0] || (l[0] = (m) => e(n).filters[s.search] = m),
            "hide-details": ""
          }, null, 8, ["label", "modelValue"])) : k("", !0),
          b(i.$slots, "default", {
            list: e(n),
            filters: e(n).filters
          }),
          v(C, {
            onClick: l[1] || (l[1] = I((m) => e(n).fetch(), ["stop"])),
            class: "ml-2",
            icon: "mdi-check",
            "aria-label": i.$t("filters.apply"),
            title: e(t)("filters.apply")
          }, null, 8, ["aria-label", "title"]),
          r.value ? (p(), w(C, {
            key: 1,
            onClick: I(c, ["stop"]),
            icon: "mdi-backspace",
            "aria-label": e(t)("filters.reset"),
            title: e(t)("filters.reset")
          }, null, 8, ["aria-label", "title"])) : k("", !0)
        ]),
        _: 3
      })
    ], 32));
  }
}, na = Ve()({
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
      var s;
      return (s = t.default) == null ? void 0 : s.call(t, {
        isSelected: n.isSelected.value,
        select: n.select,
        toggle: n.toggle,
        selectedClass: n.selectedClass.value
      });
    };
  }
}), oa = {
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
    const t = d, n = D("list"), s = a, r = B(() => n.items);
    function u(l) {
      return l = l % s.colors.length, s.colorVariant ? s.colors[l] + "-" + s.colorVariant : s.colors[l];
    }
    function c(l, m, f) {
      l[f] ? !l[f].includes(m) && l[f].push(m) : l[f] = [m];
    }
    const i = B(() => {
      const l = {};
      if (r.value)
        for (var m of r.value) {
          const g = m[s.field];
          if (Array.isArray(g))
            if (g.length)
              for (var f of g)
                c(l, m, f);
            else
              c(l, m, null);
          else
            c(l, m, g);
        }
      return l;
    });
    return (l, m) => (p(), w(ge, null, {
      default: o(() => [
        v(St, null, {
          default: o(() => [
            (p(!0), S(P, null, _(s.headers, (f, g) => (p(), w(na, {
              key: f.value
            }, {
              default: o(({ selectedClass: V }) => [
                v(xt, {
                  width: "400",
                  class: Ue(["ma-3", V]),
                  color: u(g),
                  lines: "two"
                }, {
                  default: o(() => [
                    v(Ot, null, {
                      default: o(() => [
                        h(N(f.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    v(ke, {
                      "bg-color": u(g)
                    }, {
                      default: o(() => [
                        i.value && i.value[f.value] ? (p(!0), S(P, { key: 0 }, _(i.value[f.value], (y) => b(l.$slots, "item", {
                          key: y.id,
                          header: f,
                          item: y
                        }, () => [
                          v(oe, {
                            title: y[s.itemTitle],
                            value: s.itemValue && y[s.itemValue],
                            onClick: (O) => t("click", y)
                          }, {
                            append: o(() => [
                              b(l.$slots, "item.action")
                            ]),
                            _: 2
                          }, 1032, ["title", "value", "onClick"])
                        ])), 128)) : k("", !0)
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
}, Se = /* @__PURE__ */ F({
  __name: "OxListTable",
  props: {
    // list: Object,
    headers: Array,
    edit: Boolean
  },
  setup(a) {
    const { t: d } = X(), t = R(), n = se(t, "item.", { exclude: ["item.actions"] }), s = D("panels"), r = D("list"), u = new Dt("change"), c = a, i = B(() => c.headers.reduce((f, g) => (f.push(
      typeof g == "string" ? { key: g, title: d(Je.field(g)) } : g
    ), f), []));
    function l(f) {
      return r.fetch({
        filters: {
          page: f.page,
          page_size: f.itemsPerPage,
          ordering: f.sortBy.map(({ key: g, order: V }) => V == "asc" ? g : `-${g}`)
        }
      });
    }
    function m(f, g) {
      s.show({ view: "detail.edit", value: g.id });
    }
    return (f, g) => {
      var V;
      return p(), w(ht, {
        items: e(r).items,
        "item-index": "id",
        "items-length": e(r).count || e(r).items.length,
        loading: (V = e(r).state) == null ? void 0 : V.isProcessing,
        headers: i.value,
        "onUpdate:options": l
      }, K({
        loading: o(() => [
          v(Ct, { type: "table-row@10" })
        ]),
        "item.actions": o(({ item: y }) => [
          a.edit ? (p(), w(ie, {
            key: 0,
            icon: "mdi-pencil",
            button: "",
            title: e(d)("actions.edit"),
            permissions: e(u),
            item: y,
            run: m
          }, null, 8, ["title", "permissions", "item"])) : k("", !0),
          b(f.$slots, "item.actions", {
            value: y,
            dense: !0,
            button: !0
          })
        ]),
        _: 2
      }, [
        _(e(n), (y, O) => ({
          name: O,
          fn: o(($) => [
            b(f.$slots, O, T(L($)))
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
    const d = R(), t = a;
    let n = U(!1);
    z(() => t.state.state, (u) => {
      t.delay && u == Nt.PROCESSING && (n.value = !1, window.setTimeout(() => {
        n.value = !0;
      }, 5e3));
    });
    const s = B(() => {
      var u;
      return ((u = t.state) == null ? void 0 : u.isProcessing) && (!t.delay || n.value);
    }), r = B(() => {
      var u, c;
      return (c = (u = t.state) == null ? void 0 : u.data) == null ? void 0 : c.messages;
    });
    return (u, c) => (p(), S(P, null, [
      t.state.isNone && e(d).none ? (p(), w(e(H), {
        key: 0,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        state: a.state,
        title: a.noneTitle
      }, {
        default: o(() => [
          b(u.$slots, "none", { state: a.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : s.value ? (p(), w(e(H), {
        key: 1,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: a.state,
        title: a.processingTitle
      }, {
        default: o(() => [
          b(u.$slots, "processing", { state: a.state }, () => [
            c[0] || (c[0] = h(" Data are being sent to server, please be patient. If this message persist you might wan't to retry. "))
          ])
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isError ? (p(), w(e(H), {
        key: 2,
        type: "error",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: a.state,
        title: a.errorTitle
      }, {
        default: o(() => [
          b(u.$slots, "error", { state: a.state }, () => [
            c[1] || (c[1] = h(" Oups... something wrong happened. "))
          ]),
          b(u.$slots, "error-detail", { state: a.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isOk ? (p(), w(e(H), {
        key: 3,
        type: "success",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: a.state,
        title: a.okTitle
      }, {
        default: o(() => [
          b(u.$slots, "ok", { state: a.state }, () => [
            c[2] || (c[2] = j("p", null, "Congrats! Data have been updated.", -1))
          ]),
          r.value ? (p(), S(P, { key: 0 }, [
            v(Pt),
            (p(!0), S(P, null, _(r.value, (i) => (p(), S("p", null, N(i), 1))), 256))
          ], 64)) : k("", !0),
          b(u.$slots, "ok-detail", { state: a.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : k("", !0),
      b(u.$slots, "default", {
        state: t.state
      })
    ], 64));
  }
}, ia = { class: "text-right" }, Oe = {
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
    return (s, r) => (p(), S("div", ia, [
      v(e(C), {
        color: "error",
        class: "me-2",
        "prepend-icon": n.resetIcon,
        onClick: r[0] || (r[0] = (u) => t("reset")),
        disabled: n.disabled
      }, {
        default: o(() => [
          b(s.$slots, "reset", {}, () => [
            h(N(n.resetLabel), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]),
      n.state.isSending ? (p(), w(e(C), {
        key: 0,
        color: "primary",
        "prepend-icon": "mdi-content-save",
        disabled: ""
      }, {
        default: o(() => r[2] || (r[2] = [
          h(" Saving ")
        ])),
        _: 1
      })) : (p(), w(e(C), {
        key: 1,
        color: "primary",
        "prepend-icon": n.validateIcon,
        onClick: r[1] || (r[1] = (u) => t("validate")),
        disabled: n.disabled || n.validateDisabled
      }, {
        default: o(() => [
          b(s.$slots, "validate", {}, () => [
            h(N(n.validateLabel), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]))
    ]));
  }
}, ra = { key: 0 }, ua = { class: "text-right mt-3" }, da = {
  __name: "OxLogin",
  props: {
    next: { type: String },
    url: { type: String }
  },
  emits: ["save", "saved"],
  setup(a, { emit: d }) {
    const t = ye("password"), n = a, s = ee({
      username: "",
      password: ""
    }), r = U(!1), u = ee(new Et());
    function c(l = !0) {
      Ut(s, { username: "", password: "" }), l && u.none();
    }
    async function i() {
      u.processing();
      try {
        const l = await fetch(n.url, {
          method: "POST",
          headers: jt.axiosConfig.headers,
          body: JSON.stringify(s)
        });
        l.status == 200 ? (s.credentials = "", s.password = "", u.ok(await l.json()), n.next && (window.location.href = n.next)) : u.error(await l.json());
      } catch (l) {
        u.ok((l == null ? void 0 : l.message) || l);
      }
    }
    return (l, m) => (p(), S(P, null, [
      v(e(xe), { state: u }, {
        none: o(({ state: f }) => m[7] || (m[7] = [
          j("p", null, "Please enter your credentials in order too proceed...", -1)
        ])),
        "ok-detail": o(({ state: f }) => [
          n.next ? (p(), S("p", ra, [
            m[8] || (m[8] = h("You soon will be redirected to ")),
            j("i", null, N(n.next), 1)
          ])) : k("", !0)
        ]),
        error: o(({ state: f }) => {
          var g, V;
          return [
            v(ne, {
              errors: (g = f.data) == null ? void 0 : g.username
            }, null, 8, ["errors"]),
            v(ne, {
              errors: (V = f.data) == null ? void 0 : V.password
            }, null, 8, ["errors"])
          ];
        }),
        _: 1
      }, 8, ["state"]),
      u.isOk ? k("", !0) : (p(), S(P, { key: 0 }, [
        v(ae, {
          variant: "underlined",
          label: "Enter login",
          modelValue: s.username,
          "onUpdate:modelValue": m[0] || (m[0] = (f) => s.username = f),
          onKeyup: m[1] || (m[1] = de(I((f) => e(t).focus(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue"]),
        v(ae, {
          variant: "underlined",
          ref: "password",
          label: "Enter password",
          modelValue: s.password,
          "onUpdate:modelValue": m[2] || (m[2] = (f) => s.password = f),
          type: r.value ? "text" : "password",
          "append-icon": r.value ? "mdi-eye" : "mdi-eye-off",
          "onClick:append": m[3] || (m[3] = (f) => r.value = !r.value),
          onKeyup: m[4] || (m[4] = de(I((f) => i(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue", "type", "append-icon"]),
        j("div", ua, [
          b(l.$slots, "default", {
            value: s.password
          }, () => [
            s.username && s.password ? (p(), w(Oe, {
              key: 0,
              "validate-label": "Login!",
              onValidate: m[5] || (m[5] = (f) => i()),
              onReset: m[6] || (m[6] = (f) => c()),
              state: u
            }, null, 8, ["state"])) : k("", !0)
          ])
        ])
      ], 64))
    ], 64));
  }
}, he = /* @__PURE__ */ F({
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
    const d = R(), t = a, n = J(d, "views."), s = U(!1);
    be(() => {
      s.value = !0;
    });
    const r = D("panels");
    return (u, c) => {
      const i = je("ox-state-alert");
      return p(), w(le, {
        value: t.name
      }, {
        default: o(() => [
          t.state ? (p(), w(i, {
            key: 0,
            state: t.state,
            delay: ""
          }, null, 8, ["state"])) : k("", !0),
          v(ge, { class: "ma-4" }, {
            default: o(() => [
              (p(), w(ce, {
                to: "#app-bar-sheet-title",
                disabled: !s.value || e(r).panel != t.name
              }, [
                t.icon ? (p(), w(M, {
                  key: 0,
                  icon: t.icon
                }, null, 8, ["icon"])) : k("", !0),
                h(" " + N(t.title), 1)
              ], 8, ["disabled"])),
              (p(), w(ce, {
                to: "#app-bar-right",
                disabled: !s.value || e(r).panel != t.name
              }, [
                b(u.$slots, "append-title"),
                t.help ? (p(), w(C, {
                  key: 0,
                  class: "ml-3",
                  href: t.help,
                  panels: "new",
                  icon: "mdi-information-outline"
                }, null, 8, ["href"])) : k("", !0)
              ], 8, ["disabled"])),
              b(u.$slots, "top"),
              b(u.$slots, "default", {}, () => [
                e(n) ? (p(), w(Tt, {
                  key: 0,
                  modelValue: e(r).view,
                  "onUpdate:modelValue": c[0] || (c[0] = (l) => e(r).view = l)
                }, {
                  default: o(() => [
                    (p(!0), S(P, null, _(e(n), (l, m) => (p(), w(At, {
                      key: l,
                      value: l
                    }, {
                      default: o(() => [
                        b(u.$slots, m)
                      ]),
                      _: 2
                    }, 1032, ["value"]))), 128))
                  ]),
                  _: 3
                }, 8, ["modelValue"])) : k("", !0)
              ]),
              b(u.$slots, "bottom")
            ]),
            _: 3
          })
        ]),
        _: 3
      }, 8, ["value"]);
    };
  }
}), Ce = {
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
    const { t: d } = X(), t = Re(a, "value"), n = B(() => {
      var l;
      return (l = t.value) == null ? void 0 : l.constructor;
    }), s = U(null), r = R(), u = se(r, "tab.", { exclude: "tab.default" }), c = se(r, "window.", { exclude: "window.default" }), i = B(() => ({
      value: t.value,
      model: n.value
    }));
    return (l, m) => t.value ? (p(), S(P, { key: 0 }, [
      e(u) && Object.keys(e(u)).length ? (p(), S(P, { key: 0 }, [
        v(Lt, {
          modelValue: s.value,
          "onUpdate:modelValue": m[0] || (m[0] = (f) => s.value = f)
        }, {
          default: o(() => [
            b(l.$slots, "tab.default", T(L(i.value)), () => [
              v(Bt, {
                text: e(d)(`models.${n.value.entity}`),
                value: "model"
              }, null, 8, ["text"])
            ]),
            (p(!0), S(P, null, _(e(u), (f, g) => b(l.$slots, g, E({ ref_for: !0 }, i.value))), 256))
          ]),
          _: 3
        }, 8, ["modelValue"]),
        v(we, {
          modelValue: s.value,
          "onUpdate:modelValue": m[1] || (m[1] = (f) => s.value = f)
        }, {
          default: o(() => [
            v(le, { value: "model" }, {
              default: o(() => [
                b(l.$slots, "window.default", T(L(i.value)))
              ]),
              _: 3
            }),
            (p(!0), S(P, null, _(e(c), (f, g) => (p(), w(le, { value: f }, {
              default: o(() => [
                b(l.$slots, g, E({ ref_for: !0 }, i.value))
              ]),
              _: 2
            }, 1032, ["value"]))), 256))
          ]),
          _: 3
        }, 8, ["modelValue"])
      ], 64)) : b(l.$slots, "window.default", T(E({ key: 1 }, i.value)))
    ], 64)) : (p(), S(P, { key: 1 }, [
      h(" Nothing to edit ")
    ], 64));
  }
}, ca = /* @__PURE__ */ F({
  __name: "OxModelPanel",
  props: {
    repo: {},
    search: {},
    view: {},
    headers: {},
    showFilters: { type: Boolean },
    index: { default: "list.table" },
    state: {},
    help: {},
    name: {},
    title: {},
    icon: {}
  },
  setup(a) {
    const d = R(), t = J(d, "views.list."), n = J(d, "item."), s = J(d, "views.detail.edit."), r = ye("filters"), u = a, c = Qe({ props: u }), i = c.panels, l = c.list, { showFilters: m } = Ge(c), f = B(() => [
      ...u.headers,
      { key: "actions", title: x("actions") }
    ]), g = B(() => ({
      panel: c,
      panels: i,
      list: l,
      value: i.value
    }));
    return (V, y) => (p(), w(he, {
      name: u.name,
      title: e(c).title,
      icon: e(c).icon,
      state: e(l).state,
      index: u.index
    }, K({
      "append-title": o(() => {
        var O;
        return [
          b(V.$slots, "append-title", T(L(g.value))),
          e(i).view.startsWith("list.") ? (p(), w(ve, {
            key: 0,
            class: "ml-3",
            color: "secondary",
            density: "compact",
            variant: "tonal"
          }, {
            default: o(() => [
              b(V.$slots, "nav.list", T(L(g.value))),
              e(r) ? (p(), w(C, {
                key: 0,
                title: e(m) ? e(x)("filters.hide") : e(x)("filters.show"),
                "aria-label": e(m) ? e(x)("filters.hide") : e(x)("filters.show"),
                onClick: y[0] || (y[0] = ($) => m.value = !e(m)),
                active: e(m)
              }, {
                default: o(() => [
                  v(M, {
                    icon: e(r).icon
                  }, null, 8, ["icon"])
                ]),
                _: 1
              }, 8, ["title", "aria-label", "active"])) : k("", !0)
            ]),
            _: 3
          })) : e(i).view.startsWith("detail.") && ((O = e(i).value) != null && O.id) ? (p(), w(ve, {
            key: 1,
            class: "ml-3",
            color: "secondary",
            density: "compact",
            variant: "tonal"
          }, {
            default: o(() => [
              b(V.$slots, "nav.detail", T(L(g.value))),
              e(i).view == "detail.edit" && e(i).value ? (p(), w(It, { key: 0 }, {
                activator: o(({ props: $ }) => [
                  v(C, E({ "prepend-icon": "mdi-dots-vertical" }, $), {
                    default: o(() => [
                      h(N(e(x)("actions")), 1)
                    ]),
                    _: 2
                  }, 1040)
                ]),
                default: o(() => [
                  v(ke, null, {
                    default: o(() => [
                      b(V.$slots, "item.actions", {
                        value: e(i).value
                      })
                    ]),
                    _: 3
                  })
                ]),
                _: 3
              })) : k("", !0),
              v(C, {
                disabled: !e(l).prev,
                title: e(x)("prev"),
                "aria-label": e(x)("prev"),
                onClick: y[1] || (y[1] = I(($) => e(i).value = e(l).prev, ["stop"]))
              }, {
                default: o(() => [
                  v(M, { icon: "mdi-chevron-left" })
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"]),
              v(C, {
                disabled: !e(l).next,
                title: e(x)("next"),
                "aria-label": e(x)("next"),
                onClick: y[2] || (y[2] = I(($) => e(i).value = e(l).next, ["stop"]))
              }, {
                default: o(() => [
                  v(M, { icon: "mdi-chevron-right" })
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"])
            ]),
            _: 3
          })) : k("", !0),
          v(_t, {
            class: "ml-3",
            color: "secondary",
            modelValue: e(i).view,
            "onUpdate:modelValue": y[4] || (y[4] = ($) => e(i).view = $),
            density: "compact",
            variant: "tonal"
          }, {
            default: o(() => {
              var $;
              return [
                v(C, {
                  value: "list.table",
                  title: e(x)("panels.nav.table"),
                  "aria-label": e(x)("panels.nav.table")
                }, {
                  default: o(() => [
                    v(M, null, {
                      default: o(() => y[6] || (y[6] = [
                        h("mdi-table")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["title", "aria-label"]),
                e(d)["views.list.cards"] ? (p(), w(C, {
                  key: 0,
                  value: "list.cards",
                  title: e(x)("panels.nav.cards"),
                  "aria-label": e(x)("panels.nav.cards")
                }, {
                  default: o(() => [
                    v(M, null, {
                      default: o(() => y[7] || (y[7] = [
                        h("mdi-card-account-details")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["title", "aria-label"])) : k("", !0),
                e(d)["views.list.kanban"] ? (p(), w(C, {
                  key: 1,
                  value: "list.kanban",
                  title: e(x)("panels.nav.kanban"),
                  "aria-label": e(x)("panels.nav.kanban")
                }, {
                  default: o(() => [
                    v(M, null, {
                      default: o(() => y[8] || (y[8] = [
                        h("mdi-view-column")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["title", "aria-label"])) : k("", !0),
                e(d)["views.detail.add"] ? (p(), w(C, {
                  key: 2,
                  value: "detail.add",
                  onClick: y[3] || (y[3] = I((G) => e(c).create(), ["stop"])),
                  title: e(x)("panels.nav.add"),
                  "aria-label": e(x)("panels.nav.add")
                }, {
                  default: o(() => [
                    v(M, null, {
                      default: o(() => y[9] || (y[9] = [
                        h("mdi-plus-box")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["title", "aria-label"])) : k("", !0),
                e(d)["views.detail.edit"] || e(s) ? (p(), w(C, {
                  key: 3,
                  value: "detail.edit",
                  disabled: !(($ = e(i).value) != null && $.id),
                  title: e(x)("panels.nav.edit"),
                  "aria-label": e(x)("panels.nav.edit")
                }, {
                  default: o(() => [
                    v(M, null, {
                      default: o(() => y[10] || (y[10] = [
                        h("mdi-pencil")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["disabled", "title", "aria-label"])) : k("", !0),
                b(V.$slots, "nav.views", T(L(g.value)))
              ];
            }),
            _: 3
          }, 8, ["modelValue"])
        ];
      }),
      top: o(() => [
        We(v($e, {
          ref_key: "filters",
          ref: r,
          search: u.search,
          "teleport-to": "#panel-list-actions"
        }, {
          default: o((O) => [
            b(V.$slots, "list.filters", T(L(O)))
          ]),
          _: 3
        }, 8, ["search"]), [
          [Ke, e(i).view.startsWith("list.") && e(m)]
        ])
      ]),
      _: 2
    }, [
      e(d)["views.list.table"] ? void 0 : {
        name: "views.list.table",
        fn: o(() => [
          v(Se, {
            headers: f.value,
            edit: ""
          }, K({ _: 2 }, [
            _(e(n), (O, $) => ({
              name: $,
              fn: o((G) => [
                b(V.$slots, $, T(L(G)))
              ])
            }))
          ]), 1032, ["headers"])
        ]),
        key: "0"
      },
      _(e(t), (O, $) => ({
        name: $,
        fn: o(() => [
          b(V.$slots, $, T(L(g.value)))
        ])
      })),
      e(d)["views.detail.edit"] || e(s) ? {
        name: "views.detail.edit",
        fn: o(() => [
          v(Ce, {
            value: e(i).value,
            "onUpdate:value": y[5] || (y[5] = (O) => e(i).value = O)
          }, K({ _: 2 }, [
            _(e(s), (O, $) => ({
              name: O,
              fn: o((G) => [
                b(V.$slots, $, T(L(G)))
              ])
            }))
          ]), 1032, ["value"])
        ]),
        key: "1"
      } : void 0,
      e(d)["views.detail.add"] ? {
        name: "views.detail.add",
        fn: o(() => [
          b(V.$slots, "views.detail.add", E(g.value, {
            saved: (O) => e(c).created(O)
          }))
        ]),
        key: "2"
      } : void 0
    ]), 1032, ["name", "title", "icon", "state", "index"]));
  }
}), pa = /* @__PURE__ */ F({
  __name: "OxPanelNav",
  props: {
    name: {},
    title: {},
    icon: {},
    href: {},
    auto: { type: Boolean }
  },
  setup(a) {
    const d = a, t = D("panels");
    return B(() => !d.auto || panel.name == d.name), (n, s) => (p(), w(oe, {
      active: e(t).panel == d.name,
      "prepend-icon": d.icon,
      title: d.title,
      onClick: s[0] || (s[0] = I((r) => e(t).show(d), ["stop"]))
    }, null, 8, ["active", "prepend-icon", "title"]));
  }
}), ma = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OxAction: ie,
  OxActionModelDelete: Ht,
  OxActions: Jt,
  OxApp: aa,
  OxComponent: la,
  OxFieldDetails: ne,
  OxListFilters: $e,
  OxListKanban: oa,
  OxListTable: Se,
  OxLogin: da,
  OxModelEdit: Ce,
  OxModelPanel: ca,
  OxPanel: he,
  OxPanelNav: pa,
  OxStateAlert: xe,
  OxValidationBtn: Oe
}, Symbol.toStringTag, { value: "Module" })), ka = {
  el: "#app",
  delimiters: ["[[", "]]"],
  components: { ...ma, ...qt }
};
export {
  ka as App,
  ie as OxAction,
  Ht as OxActionModelDelete,
  Jt as OxActions,
  aa as OxApp,
  la as OxComponent,
  ne as OxFieldDetails,
  $e as OxListFilters,
  oa as OxListKanban,
  Se as OxListTable,
  da as OxLogin,
  Ce as OxModelEdit,
  ca as OxModelPanel,
  he as OxPanel,
  pa as OxPanelNav,
  xe as OxStateAlert,
  Oe as OxValidationBtn
};
//# sourceMappingURL=components.js.map
