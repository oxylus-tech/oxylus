import { defineComponent as N, inject as _, unref as e, openBlock as r, createElementBlock as x, Fragment as C, createBlock as w, withModifiers as B, createCommentVNode as $, useSlots as j, renderSlot as b, normalizeProps as P, guardReactiveProps as A, ref as F, shallowRef as Q, watch as Y, onMounted as be, computed as L, onScopeDispose as _e, createVNode as c, mergeProps as U, nextTick as Ie, watchEffect as De, reactive as ee, onErrorCaptured as Me, withCtx as i, createTextVNode as h, toDisplayString as E, createElementVNode as R, createSlots as z, h as Ee, renderList as D, normalizeClass as Ne, useTemplateRef as ye, withKeys as de, onUnmounted as Fe, Teleport as ce, toRefs as we, withDirectives as Ue, vShow as Re } from "vue";
import { useAction as je, t as k, useAppContext as Ge, usePanels as We, defineAsyncComponent as Ke, tKeys as ze, filterSlots as G, useModelEditor as Ye, useModelPanel as qe } from "ox";
import { V as O, a as ne, m as He, b as Je, c as Qe, d as Xe, e as Ze, u as et, f as tt, g as at, h as lt, i as st, j as nt, k as ot, l as pe, n as it, o as rt, p as ut, q as dt, r as ct, s as pt, t as te, v as me, w as mt, x as vt, y as ft, z as ge, A as M, B as bt, C as ae, D as yt, E as wt, F as gt, G as ke, H as kt, I as Vt, J as $t, K as Ve, L as St, M as xt, N as J, O as Ot, P as le, Q as ht, R as Pt, S as Ct, T as Tt, U as ve, W as At, X as Lt } from "./VAlert-CTpFsU7b.js";
import { n as Bt, o as _t, q as It, r as $e, u as Dt, s as Mt, t as Et, v as Nt } from "./theme-CVupjJDc.js";
import { x as Ft, d as Ut, t as Rt, S as jt, r as Gt, j as Wt } from "./auth-fH0JwUpa.js";
import { components as Kt } from "ox/vendor";
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
  setup(s, { emit: d }) {
    const t = s, n = d, a = _("context"), f = je({ user: a.user, emits: n }, t);
    async function o(...l) {
      await f.run(...l);
    }
    return (l, m) => e(f).allowed ? (r(), x(C, { key: 0 }, [
      t.button ? (r(), w(O, {
        key: 0,
        variant: "text",
        color: t.color,
        icon: t.icon,
        title: t.title,
        "aria-label": t.title,
        onClick: B(o, ["stop"])
      }, null, 8, ["color", "icon", "title", "aria-label"])) : (r(), w(ne, {
        key: 1,
        title: t.title,
        "base-color": t.color,
        "prepend-icon": t.icon,
        onClick: B(o, ["stop"])
      }, null, 8, ["title", "base-color", "prepend-icon"]))
    ], 64)) : $("", !0);
  }
}), zt = /* @__PURE__ */ N({
  __name: "OxActionModelDelete",
  props: {
    item: {},
    button: { type: Boolean }
  },
  setup(s) {
    const d = _("panel"), t = _("repos"), n = s;
    async function a(f, o) {
      return await t[o.constructor.entity].api().delete(o.$url(), { delete: n.item.id });
    }
    return (f, o) => (r(), w(oe, {
      item: n.item,
      button: n.button,
      icon: "mdi-delete",
      color: "error",
      title: e(k)("actions.delete"),
      confirm: e(k)("actions.delete.confirm"),
      permissions: ["delete", (l, m) => m.id],
      run: a,
      onCompleted: o[0] || (o[0] = (l) => {
        var m;
        return (m = e(d)) == null ? void 0 : m.show();
      })
    }, null, 8, ["item", "button", "title", "confirm", "permissions"]));
  }
}), Yt = {
  __name: "OxActions",
  props: {
    // Action's Props
    value: Object,
    dense: { type: Boolean, default: !1 },
    button: { type: Boolean, default: !1 },
    exclude: { type: Array }
  },
  setup(s) {
    j();
    const d = s;
    return (t, n) => (r(), x(C, null, [
      b(t.$slots, "before", P(A(d))),
      b(t.$slots, "default", P(A(d))),
      b(t.$slots, "after", P(A(d)))
    ], 64));
  }
};
function qt(s) {
  const d = Q(s());
  let t = -1;
  function n() {
    clearInterval(t);
  }
  function a() {
    n(), Ie(() => d.value = s());
  }
  function f(o) {
    const l = o ? getComputedStyle(o) : {
      transitionDuration: 0.2
    }, m = parseFloat(l.transitionDuration) * 1e3 || 200;
    if (n(), d.value <= 0) return;
    const p = performance.now();
    t = window.setInterval(() => {
      const u = performance.now() - p + m;
      d.value = Math.max(s() - u, 0), d.value <= 0 && n();
    }, m);
  }
  return _e(n), {
    clear: n,
    time: d,
    start: f,
    reset: a
  };
}
const Ht = Bt({
  multiLine: Boolean,
  text: String,
  timer: [Boolean, String],
  timeout: {
    type: [Number, String],
    default: 5e3
  },
  vertical: Boolean,
  ...He({
    location: "bottom"
  }),
  ...Je(),
  ...Qe(),
  ...Xe(),
  ..._t(),
  ...It(Ze({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
}, "VSnackbar"), Jt = $e()({
  name: "VSnackbar",
  props: Ht(),
  emits: {
    "update:modelValue": (s) => !0
  },
  setup(s, d) {
    let {
      slots: t
    } = d;
    const n = Dt(s, "modelValue"), {
      positionClasses: a
    } = et(s), {
      scopeId: f
    } = tt(), {
      themeClasses: o
    } = Mt(s), {
      colorClasses: l,
      colorStyles: m,
      variantClasses: p
    } = at(s), {
      roundedClasses: u
    } = lt(s), v = qt(() => Number(s.timeout)), g = F(), V = F(), y = Q(!1), S = Q(0), I = F(), W = _(st, void 0);
    Et(() => !!W, () => {
      const T = dt();
      De(() => {
        I.value = T.mainStyles.value;
      });
    }), Y(n, q), Y(() => s.timeout, q), be(() => {
      n.value && q();
    });
    let Z = -1;
    function q() {
      v.reset(), window.clearTimeout(Z);
      const T = Number(s.timeout);
      if (!n.value || T === -1) return;
      const K = Nt(V.value);
      v.start(K), Z = window.setTimeout(() => {
        n.value = !1;
      }, T);
    }
    function Pe() {
      v.reset(), window.clearTimeout(Z);
    }
    function Ce() {
      y.value = !0, Pe();
    }
    function re() {
      y.value = !1, q();
    }
    function Te(T) {
      S.value = T.touches[0].clientY;
    }
    function Ae(T) {
      Math.abs(S.value - T.changedTouches[0].clientY) > 50 && (n.value = !1);
    }
    function Le() {
      y.value && re();
    }
    const Be = L(() => s.location.split(" ").reduce((T, K) => (T[`v-snackbar--${K}`] = !0, T), {}));
    return nt(() => {
      const T = pe.filterProps(s), K = !!(t.default || t.text || s.text);
      return c(pe, U({
        ref: g,
        class: ["v-snackbar", {
          "v-snackbar--active": n.value,
          "v-snackbar--multi-line": s.multiLine && !s.vertical,
          "v-snackbar--timer": !!s.timer,
          "v-snackbar--vertical": s.vertical
        }, Be.value, a.value, s.class],
        style: [I.value, s.style]
      }, T, {
        modelValue: n.value,
        "onUpdate:modelValue": (H) => n.value = H,
        contentProps: U({
          class: ["v-snackbar__wrapper", o.value, l.value, u.value, p.value],
          style: [m.value],
          onPointerenter: Ce,
          onPointerleave: re
        }, T.contentProps),
        persistent: !0,
        noClickAnimation: !0,
        scrim: !1,
        scrollStrategy: "none",
        _disableGlobalStack: !0,
        onTouchstartPassive: Te,
        onTouchend: Ae,
        onAfterLeave: Le
      }, f), {
        default: () => {
          var H, ue;
          return [it(!1, "v-snackbar"), s.timer && !y.value && c("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [c(rt, {
            ref: V,
            color: typeof s.timer == "string" ? s.timer : "info",
            max: s.timeout,
            "model-value": v.time.value
          }, null)]), K && c("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((H = t.text) == null ? void 0 : H.call(t)) ?? s.text, (ue = t.default) == null ? void 0 : ue.call(t)]), t.actions && c(ut, {
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
            }, [t.actions({
              isActive: n
            })])]
          })];
        },
        activator: t.activator
      });
    }), ot({}, g);
  }
}), Qt = { class: "nav-home" }, Xt = ["src"];
var fe;
const Zt = /* @__PURE__ */ N({
  __name: "OxApp",
  props: {
    apiUrl: {},
    logo: {},
    dataEl: { default: (fe = document.body.dataset) == null ? void 0 : fe.appData },
    models: {},
    data: {}
  },
  setup(s) {
    const d = j(), t = s, n = ee({ drawer: !0 }), a = Ge(t), f = We();
    return Y(() => [a.state.state, a.state.data], () => {
      a.showState = !0;
    }), Me((o, l, m) => {
      a.state.error(`${o}`);
    }), (o, l) => (r(), w(ct, null, {
      default: i(() => [
        c(Jt, {
          modelValue: e(a).showState,
          "onUpdate:modelValue": l[0] || (l[0] = (m) => e(a).showState = m),
          color: e(a).state.color,
          "multi-line": ""
        }, {
          default: i(() => [
            h(E(e(a).state.data), 1)
          ]),
          _: 1
        }, 8, ["modelValue", "color"]),
        c(pt, { color: "primary" }, {
          prepend: i(() => [
            c(te, {
              icon: "mdi-apps",
              title: e(k)("nav.panels"),
              "aria-label": e(k)("nav.panels"),
              onClick: l[1] || (l[1] = B((m) => n.drawer = !n.drawer, ["stop"]))
            }, null, 8, ["title", "aria-label"]),
            e(d)["app-nav"] && !n.drawer2 ? (r(), w(te, {
              key: 0,
              icon: "mdi-menu",
              onClick: l[2] || (l[2] = (m) => {
                n.drawer2 = !0, n.drawer = !1;
              })
            })) : $("", !0)
          ]),
          default: i(() => [
            c(me, { id: "app-bar-sheet-title" }),
            c(me, { id: "app-bar-title" }, {
              default: i(() => [
                b(o.$slots, "title", { context: e(a) })
              ]),
              _: 3
            }),
            c(mt),
            l[5] || (l[5] = R("div", {
              id: "app-bar-right",
              class: "mr-3"
            }, null, -1)),
            b(o.$slots, "app-bar-right", { context: e(a) })
          ]),
          _: 3
        }),
        c(vt, {
          theme: "dark",
          modelValue: n.drawer,
          "onUpdate:modelValue": l[3] || (l[3] = (m) => n.drawer = m)
        }, z({
          default: i(() => [
            R("a", Qt, [
              o.logo ? (r(), x("img", {
                key: 0,
                src: o.logo,
                class: "logo"
              }, null, 8, Xt)) : $("", !0)
            ]),
            b(o.$slots, "nav-start", { context: e(a) }),
            b(o.$slots, "nav-list", { context: e(a) })
          ]),
          _: 2
        }, [
          e(d)["nav-end"] ? {
            name: "append",
            fn: i(() => [
              b(o.$slots, "nav-end", { context: e(a) })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue"]),
        c(ft, null, {
          default: i(() => [
            b(o.$slots, "main", {}, () => [
              c(ge, {
                modelValue: e(f).panel,
                "onUpdate:modelValue": l[4] || (l[4] = (m) => e(f).panel = m)
              }, {
                default: i((m) => [
                  b(o.$slots, "default", U(m, { context: e(a) }))
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
}), ea = {
  props: {
    src: String,
    is: String
  },
  setup(s) {
    const d = Q(null), t = L(() => {
      if (s.is)
        return s.is;
      let a = s.src.substring(s.src.lastIndexOf("/") + 1);
      if (a && (a = a.substring(0, a.indexOf("."))), !a)
        throw Error(
          "`is` not provided and could not be deducted from `src`."
        );
      return a;
    });
    function n() {
      d.value = Ke(s.src, t.value);
    }
    return Y(() => s.src, n), n(), () => Ee(d.value, s);
  }
}, ta = { class: "password-error" }, se = {
  __name: "OxFieldDetails",
  props: {
    state: Object,
    errors: Array
  },
  setup(s) {
    const d = s;
    return (t, n) => d.errors ? (r(!0), x(C, { key: 0 }, D(d.errors, (a) => (r(), x("div", ta, [
      c(M, { icon: "mdi-alert-circle-outline" }),
      h(" " + E(a), 1)
    ]))), 256)) : $("", !0);
  }
}, Se = {
  __name: "OxListFilters",
  props: {
    search: String
  },
  setup(s, { expose: d }) {
    const t = _("list"), n = s, a = L(() => {
      const l = t.filters;
      return l && Object.entries(l).some(
        ([m, p]) => !m.startsWith("page") && !m.startsWith("ordering") && !!p
      );
    }), f = L(() => a.value ? "mdi-filter-check" : "mdi-filter-outline");
    function o() {
      t.filters = {}, t.load();
    }
    return d({ icon: f, hasFilters: a, reset: o }), (l, m) => (r(), x("form", {
      onSubmit: m[2] || (m[2] = B((p) => e(t).fetch(), ["prevent"])),
      class: "width-full"
    }, [
      c(bt, {
        dense: "",
        color: "transparent"
      }, {
        default: i(() => [
          c(te, {
            icon: f.value,
            readonly: ""
          }, null, 8, ["icon"]),
          n.search && e(t).filters ? (r(), w(ae, {
            key: 0,
            label: e(k)("filters.search"),
            density: "compact",
            class: "ml-2",
            modelValue: e(t).filters[n.search],
            "onUpdate:modelValue": m[0] || (m[0] = (p) => e(t).filters[n.search] = p),
            "hide-details": ""
          }, null, 8, ["label", "modelValue"])) : $("", !0),
          b(l.$slots, "default", {
            list: e(t),
            filters: e(t).filters
          }),
          c(O, {
            onClick: m[1] || (m[1] = B((p) => e(t).load(), ["stop"])),
            class: "ml-2",
            icon: "mdi-check",
            "aria-label": l.$t("filters.apply"),
            title: e(k)("filters.apply")
          }, null, 8, ["aria-label", "title"]),
          a.value ? (r(), w(O, {
            key: 1,
            onClick: B(o, ["stop"]),
            icon: "mdi-backspace",
            "aria-label": e(k)("filters.reset"),
            title: e(k)("filters.reset")
          }, null, 8, ["aria-label", "title"])) : $("", !0)
        ]),
        _: 3
      })
    ], 32));
  }
}, aa = $e()({
  name: "VSlideGroupItem",
  props: yt(),
  emits: {
    "group:selected": (s) => !0
  },
  setup(s, d) {
    let {
      slots: t
    } = d;
    const n = wt(s, gt);
    return () => {
      var a;
      return (a = t.default) == null ? void 0 : a.call(t, {
        isSelected: n.isSelected.value,
        select: n.select,
        toggle: n.toggle,
        selectedClass: n.selectedClass.value
      });
    };
  }
}), la = {
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
  setup(s, { emit: d }) {
    const t = d, n = _("list"), a = s, f = L(() => n.items);
    function o(p) {
      return p = p % a.colors.length, a.colorVariant ? a.colors[p] + "-" + a.colorVariant : a.colors[p];
    }
    function l(p, u, v) {
      p[v] ? !p[v].includes(u) && p[v].push(u) : p[v] = [u];
    }
    const m = L(() => {
      const p = {};
      if (f.value)
        for (var u of f.value) {
          const g = u[a.field];
          if (Array.isArray(g))
            if (g.length)
              for (var v of g)
                l(p, u, v);
            else
              l(p, u, null);
          else
            l(p, u, g);
        }
      return p;
    });
    return (p, u) => (r(), w(ke, null, {
      default: i(() => [
        c(kt, null, {
          default: i(() => [
            (r(!0), x(C, null, D(a.headers, (v, g) => (r(), w(aa, {
              key: v.value
            }, {
              default: i(({ selectedClass: V }) => [
                c(Vt, {
                  width: "400",
                  class: Ne(["ma-3", V]),
                  color: o(g),
                  lines: "two"
                }, {
                  default: i(() => [
                    c($t, null, {
                      default: i(() => [
                        h(E(v.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    c(Ve, {
                      "bg-color": o(g)
                    }, {
                      default: i(() => [
                        m.value && m.value[v.value] ? (r(!0), x(C, { key: 0 }, D(m.value[v.value], (y) => b(p.$slots, "item", {
                          key: y.id,
                          header: v,
                          item: y
                        }, () => [
                          c(ne, {
                            title: y[a.itemTitle],
                            value: a.itemValue && y[a.itemValue],
                            onClick: (S) => t("click", y)
                          }, {
                            append: i(() => [
                              b(p.$slots, "item.action")
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
  setup(s) {
    const d = j(), t = Ft(d, "item.", { exclude: ["item.actions"] }), n = _("panel"), a = _("list"), f = new Ut("change"), o = s, l = L(() => o.headers.reduce((u, v) => (u.push(
      typeof v == "string" ? { key: v, title: k(ze.field(v)) } : v
    ), u), []));
    function m(u) {
      return a.fetch({
        filters: {
          page: u.page,
          page_size: u.itemsPerPage,
          ordering: u.sortBy.map(({ key: v, order: g }) => g == "asc" ? v : `-${v}`)
        }
      });
    }
    function p(u, v) {
      n.show({ view: "detail.edit", value: v });
    }
    return (u, v) => {
      var g;
      return r(), w(St, {
        items: e(a).items,
        "item-index": "id",
        "items-length": e(a).count || e(a).items.length,
        loading: (g = e(a).state) == null ? void 0 : g.isProcessing,
        headers: l.value,
        "onUpdate:options": m
      }, z({
        loading: i(() => [
          c(xt, { type: "table-row@10" })
        ]),
        "item.actions": i(({ item: V }) => [
          s.edit ? (r(), w(oe, {
            key: 0,
            icon: "mdi-pencil",
            button: "",
            title: e(k)("actions.edit"),
            permissions: e(f),
            item: V,
            run: p
          }, null, 8, ["title", "permissions", "item"])) : $("", !0),
          b(u.$slots, "item.actions", {
            value: V,
            dense: !0,
            button: !0
          })
        ]),
        _: 2
      }, [
        D(e(t), (V, y) => ({
          name: y,
          fn: i((S) => [
            b(u.$slots, y, P(A(S)))
          ])
        }))
      ]), 1032, ["items", "items-length", "loading", "headers"]);
    };
  }
}), X = {
  __name: "OxStateAlert",
  props: {
    state: Object,
    delay: { type: Boolean, default: !1 },
    okTitle: { type: String, default: "" },
    noneTitle: { type: String, default: "" },
    errorTitle: { type: String, default: "Oups..." },
    processingTitle: { type: String, default: "Processing..." }
  },
  setup(s) {
    const d = j(), t = s;
    let n = F(!1);
    Y(() => t.state.state, (o) => {
      t.delay && o == Rt.PROCESSING && (n.value = !1, window.setTimeout(() => {
        n.value = !0;
      }, 5e3));
    });
    const a = L(() => {
      var o;
      return ((o = t.state) == null ? void 0 : o.isProcessing) && (!t.delay || n.value);
    }), f = L(() => {
      var o, l;
      return (l = (o = t.state) == null ? void 0 : o.data) == null ? void 0 : l.messages;
    });
    return (o, l) => (r(), x(C, null, [
      t.state.isNone && e(d).none ? (r(), w(e(J), {
        key: 0,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        state: s.state,
        title: s.noneTitle
      }, {
        default: i(() => [
          b(o.$slots, "none", { state: s.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : a.value ? (r(), w(e(J), {
        key: 1,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: s.state,
        title: s.processingTitle
      }, {
        default: i(() => [
          b(o.$slots, "processing", { state: s.state }, () => [
            l[0] || (l[0] = h(" Data are being sent to server, please be patient. If this message persist you might wan't to retry. "))
          ])
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isError ? (r(), w(e(J), {
        key: 2,
        type: "error",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: s.state,
        title: s.errorTitle
      }, {
        default: i(() => [
          b(o.$slots, "error", { state: s.state }, () => [
            l[1] || (l[1] = h(" Oups... something wrong happened. "))
          ]),
          b(o.$slots, "error-detail", { state: s.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isOk ? (r(), w(e(J), {
        key: 3,
        type: "success",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: s.state,
        title: s.okTitle
      }, {
        default: i(() => [
          b(o.$slots, "ok", { state: s.state }, () => [
            l[2] || (l[2] = R("p", null, "Congrats! Data have been updated.", -1))
          ]),
          f.value ? (r(), x(C, { key: 0 }, [
            c(Ot),
            (r(!0), x(C, null, D(f.value, (m) => (r(), x("p", null, E(m), 1))), 256))
          ], 64)) : $("", !0),
          b(o.$slots, "ok-detail", { state: s.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : $("", !0),
      b(o.$slots, "default", {
        state: t.state
      })
    ], 64));
  }
}, sa = { class: "text-right" }, ie = {
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
  setup(s, { emit: d }) {
    const t = d, n = s;
    return (a, f) => (r(), x("div", sa, [
      c(e(O), {
        color: "error",
        class: "me-2",
        "prepend-icon": n.resetIcon,
        onClick: f[0] || (f[0] = (o) => t("reset")),
        disabled: n.disabled
      }, {
        default: i(() => [
          b(a.$slots, "reset", {}, () => [
            h(E(n.resetLabel), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]),
      n.state.isSending ? (r(), w(e(O), {
        key: 0,
        color: "primary",
        "prepend-icon": "mdi-content-save",
        disabled: ""
      }, {
        default: i(() => f[2] || (f[2] = [
          h(" Saving ")
        ])),
        _: 1
      })) : (r(), w(e(O), {
        key: 1,
        color: "primary",
        "prepend-icon": n.validateIcon,
        onClick: f[1] || (f[1] = (o) => t("validate")),
        disabled: n.disabled || n.validateDisabled
      }, {
        default: i(() => [
          b(a.$slots, "validate", {}, () => [
            h(E(n.validateLabel), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]))
    ]));
  }
}, na = { key: 0 }, oa = { class: "text-right mt-3" }, ia = {
  __name: "OxLogin",
  props: {
    next: { type: String },
    url: { type: String }
  },
  emits: ["save", "saved"],
  setup(s, { emit: d }) {
    const t = ye("password"), n = s, a = ee({
      username: "",
      password: ""
    }), f = F(!1), o = ee(new jt());
    function l(p = !0) {
      Gt(a, { username: "", password: "" }), p && o.none();
    }
    async function m() {
      o.processing();
      try {
        const p = await fetch(n.url, {
          method: "POST",
          headers: Wt.axiosConfig.headers,
          body: JSON.stringify(a)
        });
        p.status == 200 ? (a.credentials = "", a.password = "", o.ok(await p.json()), n.next && (window.location.href = n.next)) : o.error(await p.json());
      } catch (p) {
        o.ok((p == null ? void 0 : p.message) || p);
      }
    }
    return (p, u) => (r(), x(C, null, [
      c(e(X), { state: o }, {
        none: i(({ state: v }) => u[7] || (u[7] = [
          R("p", null, "Please enter your credentials in order too proceed...", -1)
        ])),
        "ok-detail": i(({ state: v }) => [
          n.next ? (r(), x("p", na, [
            u[8] || (u[8] = h("You soon will be redirected to ")),
            R("i", null, E(n.next), 1)
          ])) : $("", !0)
        ]),
        error: i(({ state: v }) => {
          var g, V;
          return [
            c(se, {
              errors: (g = v.data) == null ? void 0 : g.username
            }, null, 8, ["errors"]),
            c(se, {
              errors: (V = v.data) == null ? void 0 : V.password
            }, null, 8, ["errors"])
          ];
        }),
        _: 1
      }, 8, ["state"]),
      o.isOk ? $("", !0) : (r(), x(C, { key: 0 }, [
        c(ae, {
          variant: "underlined",
          label: "Enter login",
          modelValue: a.username,
          "onUpdate:modelValue": u[0] || (u[0] = (v) => a.username = v),
          onKeyup: u[1] || (u[1] = de(B((v) => e(t).focus(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue"]),
        c(ae, {
          variant: "underlined",
          ref: "password",
          label: "Enter password",
          modelValue: a.password,
          "onUpdate:modelValue": u[2] || (u[2] = (v) => a.password = v),
          type: f.value ? "text" : "password",
          "append-icon": f.value ? "mdi-eye" : "mdi-eye-off",
          "onClick:append": u[3] || (u[3] = (v) => f.value = !f.value),
          onKeyup: u[4] || (u[4] = de(B((v) => m(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue", "type", "append-icon"]),
        R("div", oa, [
          b(p.$slots, "default", {
            value: a.password
          }, () => [
            a.username && a.password ? (r(), w(ie, {
              key: 0,
              "validate-label": "Login!",
              onValidate: u[5] || (u[5] = (v) => m()),
              onReset: u[6] || (u[6] = (v) => l()),
              state: o
            }, null, 8, ["state"])) : $("", !0)
          ])
        ])
      ], 64))
    ], 64));
  }
}, Oe = /* @__PURE__ */ N({
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
  setup(s) {
    const d = j(), t = s, n = G(d, "views."), a = F(!1);
    be(() => {
      a.value = !0;
    }), Fe(() => {
      a.value = !1;
    });
    const f = _("panels"), o = _("panel");
    return (l, m) => (r(), w(le, {
      value: t.name
    }, {
      default: i(() => [
        t.state ? (r(), w(X, {
          key: 0,
          state: t.state,
          delay: ""
        }, null, 8, ["state"])) : $("", !0),
        c(ke, { class: "ma-4" }, {
          default: i(() => [
            (r(), w(ce, {
              to: "#app-bar-sheet-title",
              disabled: !a.value || e(f).panel != t.name
            }, [
              t.icon ? (r(), w(M, {
                key: 0,
                icon: t.icon
              }, null, 8, ["icon"])) : $("", !0),
              h(" " + E(t.title), 1)
            ], 8, ["disabled"])),
            (r(), w(ce, {
              to: "#app-bar-right",
              disabled: !a.value || e(f).panel != t.name
            }, [
              b(l.$slots, "append-title"),
              t.help ? (r(), w(O, {
                key: 0,
                class: "ml-3",
                href: t.help,
                panels: "new",
                icon: "mdi-information-outline"
              }, null, 8, ["href"])) : $("", !0)
            ], 8, ["disabled"])),
            b(l.$slots, "top"),
            b(l.$slots, "default", {}, () => [
              e(n) ? (r(), w(ht, {
                key: 0,
                modelValue: e(o).view,
                "onUpdate:modelValue": m[0] || (m[0] = (p) => e(o).view = p)
              }, {
                default: i(() => [
                  (r(!0), x(C, null, D(e(n), (p, u) => (r(), w(Pt, {
                    key: p,
                    value: p
                  }, {
                    default: i(() => [
                      b(l.$slots, u)
                    ]),
                    _: 2
                  }, 1032, ["value"]))), 128))
                ]),
                _: 3
              }, 8, ["modelValue"])) : $("", !0)
            ]),
            b(l.$slots, "bottom")
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["value"]));
  }
}), ra = { class: "mb-3" }, he = /* @__PURE__ */ N({
  __name: "OxModelEdit",
  props: {
    repo: {},
    initial: {},
    name: {},
    url: {},
    saved: { type: Function }
  },
  setup(s) {
    const t = Ye({ props: s }), n = L(() => t.repo.use), { value: a, edited: f } = we(t), o = F(null), l = j(), m = G(l, "tab.", { exclude: "tab.default" }), p = G(l, "window.", { exclude: "window.default" }), u = L(() => ({
      value: a.value,
      model: n.value
    }));
    return (v, g) => (r(), x(C, null, [
      c(X, {
        state: e(t).state
      }, null, 8, ["state"]),
      R("div", ra, [
        e(f) ? (r(), w(ie, {
          key: 0,
          onValidate: g[0] || (g[0] = (V) => e(t).save()),
          onReset: g[1] || (g[1] = (V) => e(t).discard()),
          state: e(t).state,
          "validate-disabled": !e(t).valid
        }, null, 8, ["state", "validate-disabled"])) : $("", !0)
      ]),
      e(m) && Object.keys(e(m)).length ? (r(), x(C, { key: 0 }, [
        c(Ct, {
          modelValue: o.value,
          "onUpdate:modelValue": g[2] || (g[2] = (V) => o.value = V)
        }, {
          default: i(() => [
            b(v.$slots, "tab.default", P(A(u.value)), () => [
              c(Tt, {
                text: e(k)(`models.${n.value.entity}`),
                value: "model"
              }, null, 8, ["text"])
            ]),
            (r(!0), x(C, null, D(e(m), (V, y) => b(v.$slots, y, U({ ref_for: !0 }, u.value))), 256))
          ]),
          _: 3
        }, 8, ["modelValue"]),
        c(ge, {
          modelValue: o.value,
          "onUpdate:modelValue": g[3] || (g[3] = (V) => o.value = V)
        }, {
          default: i(() => [
            c(le, { value: "model" }, {
              default: i(() => [
                b(v.$slots, "window.default", P(A(u.value)))
              ]),
              _: 3
            }),
            (r(!0), x(C, null, D(e(p), (V, y) => (r(), w(le, { value: V }, {
              default: i(() => [
                b(v.$slots, y, U({ ref_for: !0 }, u.value))
              ]),
              _: 2
            }, 1032, ["value"]))), 256))
          ]),
          _: 3
        }, 8, ["modelValue"])
      ], 64)) : b(v.$slots, "window.default", P(U({ key: 1 }, u.value)))
    ], 64));
  }
}), ua = /* @__PURE__ */ N({
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
  setup(s) {
    const d = j(), t = G(d, "views.list."), n = G(d, "item."), a = G(d, "views.detail.edit."), f = ye("filters"), o = s, l = _("panel") ?? qe({ props: o }), m = l.panels, p = l.list, { showFilters: u } = we(l), v = L(() => [
      ...o.headers,
      { key: "actions", title: k("actions") }
    ]), g = L(() => ({
      panel: l,
      panels: m,
      list: p,
      value: l.value
    }));
    return (V, y) => (r(), w(Oe, {
      name: o.name,
      title: e(l).title,
      icon: e(l).icon,
      state: e(p).state,
      index: o.index
    }, z({
      "append-title": i(() => [
        b(V.$slots, "append-title", P(A(g.value))),
        e(l).view.startsWith("list.") ? (r(), w(ve, {
          key: 0,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: i(() => [
            b(V.$slots, "nav.list", P(A(g.value))),
            e(f) ? (r(), w(O, {
              key: 0,
              title: e(u) ? e(k)("filters.hide") : e(k)("filters.show"),
              "aria-label": e(u) ? e(k)("filters.hide") : e(k)("filters.show"),
              onClick: y[0] || (y[0] = (S) => u.value = !e(u)),
              active: e(u)
            }, {
              default: i(() => [
                c(M, {
                  icon: e(f).icon
                }, null, 8, ["icon"])
              ]),
              _: 1
            }, 8, ["title", "aria-label", "active"])) : $("", !0)
          ]),
          _: 3
        })) : e(l).view.startsWith("detail.") && e(l).value ? (r(), w(ve, {
          key: 1,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: i(() => [
            b(V.$slots, "nav.detail", P(A(g.value))),
            e(l).view == "detail.edit" && e(l).value ? (r(), w(At, { key: 0 }, {
              activator: i(({ props: S }) => [
                c(O, U({ "prepend-icon": "mdi-dots-vertical" }, S), {
                  default: i(() => [
                    h(E(e(k)("actions")), 1)
                  ]),
                  _: 2
                }, 1040)
              ]),
              default: i(() => [
                c(Ve, null, {
                  default: i(() => [
                    b(V.$slots, "item.actions", {
                      value: e(l).value
                    })
                  ]),
                  _: 3
                })
              ]),
              _: 3
            })) : $("", !0),
            c(O, {
              disabled: !e(l).prev,
              title: e(k)("prev"),
              "aria-label": e(k)("prev"),
              onClick: y[1] || (y[1] = B((S) => e(l).show({ value: e(l).prev }), ["stop"]))
            }, {
              default: i(() => [
                c(M, { icon: "mdi-chevron-left" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"]),
            c(O, {
              disabled: !e(l).next,
              title: e(k)("next"),
              "aria-label": e(k)("next"),
              onClick: y[2] || (y[2] = B((S) => e(l).show({ value: e(l).next }), ["stop"]))
            }, {
              default: i(() => [
                c(M, { icon: "mdi-chevron-right" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"])
          ]),
          _: 3
        })) : $("", !0),
        c(Lt, {
          class: "ml-3",
          color: "secondary",
          modelValue: e(l).view,
          "onUpdate:modelValue": y[4] || (y[4] = (S) => e(l).view = S),
          density: "compact",
          variant: "tonal",
          mandatory: ""
        }, {
          default: i(() => {
            var S;
            return [
              c(O, {
                value: "list.table",
                title: e(k)("panels.nav.table"),
                "aria-label": e(k)("panels.nav.table")
              }, {
                default: i(() => [
                  c(M, null, {
                    default: i(() => y[5] || (y[5] = [
                      h("mdi-table")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"]),
              e(d)["views.list.cards"] ? (r(), w(O, {
                key: 0,
                value: "list.cards",
                title: e(k)("panels.nav.cards"),
                "aria-label": e(k)("panels.nav.cards")
              }, {
                default: i(() => [
                  c(M, null, {
                    default: i(() => y[6] || (y[6] = [
                      h("mdi-card-account-details")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : $("", !0),
              e(d)["views.list.kanban"] ? (r(), w(O, {
                key: 1,
                value: "list.kanban",
                title: e(k)("panels.nav.kanban"),
                "aria-label": e(k)("panels.nav.kanban")
              }, {
                default: i(() => [
                  c(M, null, {
                    default: i(() => y[7] || (y[7] = [
                      h("mdi-view-column")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : $("", !0),
              e(a) ? (r(), w(O, {
                key: 2,
                value: "detail.add",
                onClick: y[3] || (y[3] = B((I) => e(l).create(), ["stop"])),
                title: e(k)("panels.nav.add"),
                "aria-label": e(k)("panels.nav.add")
              }, {
                default: i(() => [
                  c(M, null, {
                    default: i(() => y[8] || (y[8] = [
                      h("mdi-plus-box")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : $("", !0),
              e(d)["views.detail.edit"] || e(a) ? (r(), w(O, {
                key: 3,
                value: "detail.edit",
                disabled: !((S = e(l).value) != null && S.id),
                title: e(k)("panels.nav.edit"),
                "aria-label": e(k)("panels.nav.edit")
              }, {
                default: i(() => [
                  c(M, null, {
                    default: i(() => y[9] || (y[9] = [
                      h("mdi-pencil")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"])) : $("", !0),
              b(V.$slots, "nav.views", P(A(g.value)))
            ];
          }),
          _: 3
        }, 8, ["modelValue"])
      ]),
      top: i(() => [
        Ue(c(Se, {
          ref_key: "filters",
          ref: f,
          search: o.search,
          "teleport-to": "#panel-list-actions"
        }, {
          default: i((S) => [
            b(V.$slots, "list.filters", P(A(S)))
          ]),
          _: 3
        }, 8, ["search"]), [
          [Re, e(l).view.startsWith("list.") && e(u)]
        ])
      ]),
      _: 2
    }, [
      e(d)["views.list.table"] ? void 0 : {
        name: "views.list.table",
        fn: i(() => [
          c(xe, {
            headers: v.value,
            edit: ""
          }, z({ _: 2 }, [
            D(e(n), (S, I) => ({
              name: I,
              fn: i((W) => [
                b(V.$slots, I, P(A(W)))
              ])
            }))
          ]), 1032, ["headers"])
        ]),
        key: "0"
      },
      D(e(t), (S, I) => ({
        name: I,
        fn: i(() => [
          b(V.$slots, I, P(A(g.value)))
        ])
      })),
      e(d)["views.detail.edit"] || e(a) ? {
        name: "views.detail.edit",
        fn: i(() => [
          c(he, {
            repo: e(l).repo,
            initial: e(l).value,
            name: `${e(l).model.entity}-edit`,
            saved: (S) => e(l).value = S
          }, z({ _: 2 }, [
            D(e(a), (S, I) => ({
              name: S,
              fn: i((W) => [
                b(V.$slots, I, P(A(W)))
              ])
            }))
          ]), 1032, ["repo", "initial", "name", "saved"])
        ]),
        key: "1"
      } : void 0
    ]), 1032, ["name", "title", "icon", "state", "index"]));
  }
}), da = /* @__PURE__ */ N({
  __name: "OxPanelNav",
  props: {
    title: {},
    icon: {},
    panel: {},
    href: {},
    auto: { type: Boolean }
  },
  setup(s) {
    const d = s, t = _("panels");
    return L(() => !d.auto || panel.name == d.name), (n, a) => (r(), w(ne, {
      active: e(t).panel == d.name,
      "prepend-icon": d.icon,
      title: d.title,
      onClick: a[0] || (a[0] = B((f) => e(t).show(d), ["stop"]))
    }, null, 8, ["active", "prepend-icon", "title"]));
  }
}), ca = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OxAction: oe,
  OxActionModelDelete: zt,
  OxActions: Yt,
  OxApp: Zt,
  OxComponent: ea,
  OxFieldDetails: se,
  OxListFilters: Se,
  OxListKanban: la,
  OxListTable: xe,
  OxLogin: ia,
  OxModelEdit: he,
  OxModelPanel: ua,
  OxPanel: Oe,
  OxPanelNav: da,
  OxStateAlert: X,
  OxValidationBtn: ie
}, Symbol.toStringTag, { value: "Module" })), wa = {
  el: "#app",
  delimiters: ["[[", "]]"],
  components: { ...ca, ...Kt }
};
export {
  wa as App,
  oe as OxAction,
  zt as OxActionModelDelete,
  Yt as OxActions,
  Zt as OxApp,
  ea as OxComponent,
  se as OxFieldDetails,
  Se as OxListFilters,
  la as OxListKanban,
  xe as OxListTable,
  ia as OxLogin,
  he as OxModelEdit,
  ua as OxModelPanel,
  Oe as OxPanel,
  da as OxPanelNav,
  X as OxStateAlert,
  ie as OxValidationBtn
};
//# sourceMappingURL=components.js.map
