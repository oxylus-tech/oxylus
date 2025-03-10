import { defineComponent as N, inject as _, unref as e, openBlock as d, createElementBlock as S, Fragment as C, createBlock as w, withModifiers as I, createCommentVNode as $, useSlots as j, renderSlot as y, normalizeProps as P, guardReactiveProps as A, ref as F, shallowRef as Q, watch as Y, onMounted as ye, computed as L, onScopeDispose as _e, createVNode as p, mergeProps as U, nextTick as De, watchEffect as Me, reactive as te, onErrorCaptured as Ee, withCtx as i, createTextVNode as h, toDisplayString as E, createElementVNode as R, createSlots as z, h as Ne, renderList as D, normalizeClass as Fe, useTemplateRef as we, withKeys as ce, onUnmounted as Ue, Teleport as pe, toRefs as ge, withDirectives as Re, vShow as je } from "vue";
import { useAction as Ge, useI18n as X, useAppContext as We, usePanels as Ke, defineAsyncComponent as ze, tKeys as Ye, filterSlots as G, useModelEditor as qe, useModelPanel as He, t as O } from "ox";
import { V as x, a as oe, m as Je, b as Qe, c as Xe, d as Ze, e as et, u as tt, f as at, g as lt, h as st, i as nt, j as ot, k as it, l as me, n as rt, o as ut, p as dt, q as ct, r as pt, s as mt, t as ae, v as ve, w as vt, x as ft, y as bt, z as ke, A as M, B as yt, C as le, D as wt, E as gt, F as kt, G as Ve, H as Vt, I as $t, J as St, K as $e, L as Ot, M as xt, N as J, O as ht, P as se, Q as Pt, R as Ct, S as Tt, T as At, U as fe, W as Lt, X as Bt } from "./VAlert-CTpFsU7b.js";
import { l as It, z as _t, d as Dt, w as Mt, S as Et, r as Nt, j as Ft } from "./vue-i18n-D0Iw2Ip6.js";
import { n as Ut, o as Rt, q as jt, r as Se, u as Gt, s as Wt, t as Kt, v as zt } from "./theme-CVupjJDc.js";
import { components as Yt } from "ox/vendor";
const ie = /* @__PURE__ */ N({
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
  setup(a, { emit: u }) {
    const l = a, s = u, n = _("context"), r = Ge({ user: n.user, emits: s }, l);
    async function c(...t) {
      await r.run(...t);
    }
    return (t, f) => e(r).allowed ? (d(), S(C, { key: 0 }, [
      l.button ? (d(), w(x, {
        key: 0,
        variant: "text",
        color: l.color,
        icon: l.icon,
        title: l.title,
        "aria-label": l.title,
        onClick: I(c, ["stop"])
      }, null, 8, ["color", "icon", "title", "aria-label"])) : (d(), w(oe, {
        key: 1,
        title: l.title,
        "base-color": l.color,
        "prepend-icon": l.icon,
        onClick: I(c, ["stop"])
      }, null, 8, ["title", "base-color", "prepend-icon"]))
    ], 64)) : $("", !0);
  }
}), qt = /* @__PURE__ */ N({
  __name: "OxActionModelDelete",
  props: {
    item: {},
    button: { type: Boolean }
  },
  setup(a) {
    const { t: u } = It(), l = _("panel"), s = _("repos"), n = a;
    async function r(c, t) {
      return await s[t.constructor.entity].api().delete(t.$url(), { delete: n.item.id });
    }
    return (c, t) => (d(), w(ie, {
      item: n.item,
      button: n.button,
      icon: "mdi-delete",
      color: "error",
      title: e(u)("actions.delete"),
      confirm: e(u)("actions.delete.confirm"),
      permissions: ["delete", (f, o) => o.id],
      run: r,
      onCompleted: t[0] || (t[0] = (f) => {
        var o;
        return (o = e(l)) == null ? void 0 : o.show();
      })
    }, null, 8, ["item", "button", "title", "confirm", "permissions"]));
  }
}), Ht = {
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
    const u = a;
    return (l, s) => (d(), S(C, null, [
      y(l.$slots, "before", P(A(u))),
      y(l.$slots, "default", P(A(u))),
      y(l.$slots, "after", P(A(u)))
    ], 64));
  }
};
function Jt(a) {
  const u = Q(a());
  let l = -1;
  function s() {
    clearInterval(l);
  }
  function n() {
    s(), De(() => u.value = a());
  }
  function r(c) {
    const t = c ? getComputedStyle(c) : {
      transitionDuration: 0.2
    }, f = parseFloat(t.transitionDuration) * 1e3 || 200;
    if (s(), u.value <= 0) return;
    const o = performance.now();
    l = window.setInterval(() => {
      const m = performance.now() - o + f;
      u.value = Math.max(a() - m, 0), u.value <= 0 && s();
    }, f);
  }
  return _e(s), {
    clear: s,
    time: u,
    start: r,
    reset: n
  };
}
const Qt = Ut({
  multiLine: Boolean,
  text: String,
  timer: [Boolean, String],
  timeout: {
    type: [Number, String],
    default: 5e3
  },
  vertical: Boolean,
  ...Je({
    location: "bottom"
  }),
  ...Qe(),
  ...Xe(),
  ...Ze(),
  ...Rt(),
  ...jt(et({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
}, "VSnackbar"), Xt = Se()({
  name: "VSnackbar",
  props: Qt(),
  emits: {
    "update:modelValue": (a) => !0
  },
  setup(a, u) {
    let {
      slots: l
    } = u;
    const s = Gt(a, "modelValue"), {
      positionClasses: n
    } = tt(a), {
      scopeId: r
    } = at(), {
      themeClasses: c
    } = Wt(a), {
      colorClasses: t,
      colorStyles: f,
      variantClasses: o
    } = lt(a), {
      roundedClasses: m
    } = st(a), v = Jt(() => Number(a.timeout)), g = F(), k = F(), b = Q(!1), V = Q(0), B = F(), W = _(nt, void 0);
    Kt(() => !!W, () => {
      const T = ct();
      Me(() => {
        B.value = T.mainStyles.value;
      });
    }), Y(s, q), Y(() => a.timeout, q), ye(() => {
      s.value && q();
    });
    let ee = -1;
    function q() {
      v.reset(), window.clearTimeout(ee);
      const T = Number(a.timeout);
      if (!s.value || T === -1) return;
      const K = zt(k.value);
      v.start(K), ee = window.setTimeout(() => {
        s.value = !1;
      }, T);
    }
    function Ce() {
      v.reset(), window.clearTimeout(ee);
    }
    function Te() {
      b.value = !0, Ce();
    }
    function ue() {
      b.value = !1, q();
    }
    function Ae(T) {
      V.value = T.touches[0].clientY;
    }
    function Le(T) {
      Math.abs(V.value - T.changedTouches[0].clientY) > 50 && (s.value = !1);
    }
    function Be() {
      b.value && ue();
    }
    const Ie = L(() => a.location.split(" ").reduce((T, K) => (T[`v-snackbar--${K}`] = !0, T), {}));
    return ot(() => {
      const T = me.filterProps(a), K = !!(l.default || l.text || a.text);
      return p(me, U({
        ref: g,
        class: ["v-snackbar", {
          "v-snackbar--active": s.value,
          "v-snackbar--multi-line": a.multiLine && !a.vertical,
          "v-snackbar--timer": !!a.timer,
          "v-snackbar--vertical": a.vertical
        }, Ie.value, n.value, a.class],
        style: [B.value, a.style]
      }, T, {
        modelValue: s.value,
        "onUpdate:modelValue": (H) => s.value = H,
        contentProps: U({
          class: ["v-snackbar__wrapper", c.value, t.value, m.value, o.value],
          style: [f.value],
          onPointerenter: Te,
          onPointerleave: ue
        }, T.contentProps),
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
          var H, de;
          return [rt(!1, "v-snackbar"), a.timer && !b.value && p("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [p(ut, {
            ref: k,
            color: typeof a.timer == "string" ? a.timer : "info",
            max: a.timeout,
            "model-value": v.time.value
          }, null)]), K && p("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((H = l.text) == null ? void 0 : H.call(l)) ?? a.text, (de = l.default) == null ? void 0 : de.call(l)]), l.actions && p(dt, {
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
    }), it({}, g);
  }
}), Zt = { class: "nav-home" }, ea = ["src"];
var be;
const ta = /* @__PURE__ */ N({
  __name: "OxApp",
  props: {
    apiUrl: {},
    logo: {},
    dataEl: { default: (be = document.body.dataset) == null ? void 0 : be.appData },
    models: {},
    data: {}
  },
  setup(a) {
    const { t: u } = X(), l = j(), s = a, n = te({ drawer: !0 }), r = We(s), c = Ke();
    return Y(() => [r.state.state, r.state.data], () => {
      r.showState = !0;
    }), Ee((t, f, o) => {
      r.state.error(`${t}`);
    }), (t, f) => (d(), w(pt, null, {
      default: i(() => [
        p(Xt, {
          modelValue: e(r).showState,
          "onUpdate:modelValue": f[0] || (f[0] = (o) => e(r).showState = o),
          color: e(r).state.color,
          "multi-line": ""
        }, {
          default: i(() => [
            h(E(e(r).state.data), 1)
          ]),
          _: 1
        }, 8, ["modelValue", "color"]),
        p(mt, { color: "primary" }, {
          prepend: i(() => [
            p(ae, {
              icon: "mdi-apps",
              title: e(u)("nav.panels"),
              "aria-label": e(u)("nav.panels"),
              onClick: f[1] || (f[1] = I((o) => n.drawer = !n.drawer, ["stop"]))
            }, null, 8, ["title", "aria-label"]),
            e(l)["app-nav"] && !n.drawer2 ? (d(), w(ae, {
              key: 0,
              icon: "mdi-menu",
              onClick: f[2] || (f[2] = (o) => {
                n.drawer2 = !0, n.drawer = !1;
              })
            })) : $("", !0)
          ]),
          default: i(() => [
            p(ve, { id: "app-bar-sheet-title" }),
            p(ve, { id: "app-bar-title" }, {
              default: i(() => [
                y(t.$slots, "title", { context: e(r) })
              ]),
              _: 3
            }),
            p(vt),
            f[5] || (f[5] = R("div", {
              id: "app-bar-right",
              class: "mr-3"
            }, null, -1)),
            y(t.$slots, "app-bar-right", { context: e(r) })
          ]),
          _: 3
        }),
        p(ft, {
          theme: "dark",
          modelValue: n.drawer,
          "onUpdate:modelValue": f[3] || (f[3] = (o) => n.drawer = o)
        }, z({
          default: i(() => [
            R("a", Zt, [
              t.logo ? (d(), S("img", {
                key: 0,
                src: t.logo,
                class: "logo"
              }, null, 8, ea)) : $("", !0)
            ]),
            y(t.$slots, "nav-start", { context: e(r) }),
            y(t.$slots, "nav-list", { context: e(r) })
          ]),
          _: 2
        }, [
          e(l)["nav-end"] ? {
            name: "append",
            fn: i(() => [
              y(t.$slots, "nav-end", { context: e(r) })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue"]),
        p(bt, null, {
          default: i(() => [
            y(t.$slots, "main", {}, () => [
              p(ke, {
                modelValue: e(c).panel,
                "onUpdate:modelValue": f[4] || (f[4] = (o) => e(c).panel = o)
              }, {
                default: i((o) => [
                  y(t.$slots, "default", U(o, { context: e(r) }))
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
}), aa = {
  props: {
    src: String,
    is: String
  },
  setup(a) {
    const u = Q(null), l = L(() => {
      if (a.is)
        return a.is;
      let n = a.src.substring(a.src.lastIndexOf("/") + 1);
      if (n && (n = n.substring(0, n.indexOf("."))), !n)
        throw Error(
          "`is` not provided and could not be deducted from `src`."
        );
      return n;
    });
    function s() {
      u.value = ze(a.src, l.value);
    }
    return Y(() => a.src, s), s(), () => Ne(u.value, a);
  }
}, la = { class: "password-error" }, ne = {
  __name: "OxFieldDetails",
  props: {
    state: Object,
    errors: Array
  },
  setup(a) {
    const u = a;
    return (l, s) => u.errors ? (d(!0), S(C, { key: 0 }, D(u.errors, (n) => (d(), S("div", la, [
      p(M, { icon: "mdi-alert-circle-outline" }),
      h(" " + E(n), 1)
    ]))), 256)) : $("", !0);
  }
}, Oe = {
  __name: "OxListFilters",
  props: {
    search: String
  },
  setup(a, { expose: u }) {
    const { t: l } = X(), s = _("list"), n = a, r = L(() => {
      const f = s.filters;
      return f && Object.entries(f).some(
        ([o, m]) => !o.startsWith("page") && !o.startsWith("ordering") && !!m
      );
    }), c = L(() => r.value ? "mdi-filter-check" : "mdi-filter-outline");
    function t() {
      s.filters = {}, s.load();
    }
    return u({ icon: c, hasFilters: r, reset: t }), (f, o) => (d(), S("form", {
      onSubmit: o[2] || (o[2] = I((m) => e(s).fetch(), ["prevent"])),
      class: "width-full"
    }, [
      p(yt, {
        dense: "",
        color: "transparent"
      }, {
        default: i(() => [
          p(ae, {
            icon: c.value,
            readonly: ""
          }, null, 8, ["icon"]),
          n.search && e(s).filters ? (d(), w(le, {
            key: 0,
            label: e(l)("filters.search"),
            density: "compact",
            class: "ml-2",
            modelValue: e(s).filters[n.search],
            "onUpdate:modelValue": o[0] || (o[0] = (m) => e(s).filters[n.search] = m),
            "hide-details": ""
          }, null, 8, ["label", "modelValue"])) : $("", !0),
          y(f.$slots, "default", {
            list: e(s),
            filters: e(s).filters
          }),
          p(x, {
            onClick: o[1] || (o[1] = I((m) => e(s).load(), ["stop"])),
            class: "ml-2",
            icon: "mdi-check",
            "aria-label": f.$t("filters.apply"),
            title: e(l)("filters.apply")
          }, null, 8, ["aria-label", "title"]),
          r.value ? (d(), w(x, {
            key: 1,
            onClick: I(t, ["stop"]),
            icon: "mdi-backspace",
            "aria-label": e(l)("filters.reset"),
            title: e(l)("filters.reset")
          }, null, 8, ["aria-label", "title"])) : $("", !0)
        ]),
        _: 3
      })
    ], 32));
  }
}, sa = Se()({
  name: "VSlideGroupItem",
  props: wt(),
  emits: {
    "group:selected": (a) => !0
  },
  setup(a, u) {
    let {
      slots: l
    } = u;
    const s = gt(a, kt);
    return () => {
      var n;
      return (n = l.default) == null ? void 0 : n.call(l, {
        isSelected: s.isSelected.value,
        select: s.select,
        toggle: s.toggle,
        selectedClass: s.selectedClass.value
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
  setup(a, { emit: u }) {
    const l = u, s = _("list"), n = a, r = L(() => s.items);
    function c(o) {
      return o = o % n.colors.length, n.colorVariant ? n.colors[o] + "-" + n.colorVariant : n.colors[o];
    }
    function t(o, m, v) {
      o[v] ? !o[v].includes(m) && o[v].push(m) : o[v] = [m];
    }
    const f = L(() => {
      const o = {};
      if (r.value)
        for (var m of r.value) {
          const g = m[n.field];
          if (Array.isArray(g))
            if (g.length)
              for (var v of g)
                t(o, m, v);
            else
              t(o, m, null);
          else
            t(o, m, g);
        }
      return o;
    });
    return (o, m) => (d(), w(Ve, null, {
      default: i(() => [
        p(Vt, null, {
          default: i(() => [
            (d(!0), S(C, null, D(n.headers, (v, g) => (d(), w(sa, {
              key: v.value
            }, {
              default: i(({ selectedClass: k }) => [
                p($t, {
                  width: "400",
                  class: Fe(["ma-3", k]),
                  color: c(g),
                  lines: "two"
                }, {
                  default: i(() => [
                    p(St, null, {
                      default: i(() => [
                        h(E(v.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    p($e, {
                      "bg-color": c(g)
                    }, {
                      default: i(() => [
                        f.value && f.value[v.value] ? (d(!0), S(C, { key: 0 }, D(f.value[v.value], (b) => y(o.$slots, "item", {
                          key: b.id,
                          header: v,
                          item: b
                        }, () => [
                          p(oe, {
                            title: b[n.itemTitle],
                            value: n.itemValue && b[n.itemValue],
                            onClick: (V) => l("click", b)
                          }, {
                            append: i(() => [
                              y(o.$slots, "item.action")
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
    const { t: u } = X(), l = j(), s = _t(l, "item.", { exclude: ["item.actions"] }), n = _("panel"), r = _("list"), c = new Dt("change"), t = a, f = L(() => t.headers.reduce((v, g) => (v.push(
      typeof g == "string" ? { key: g, title: u(Ye.field(g)) } : g
    ), v), []));
    function o(v) {
      return r.fetch({
        filters: {
          page: v.page,
          page_size: v.itemsPerPage,
          ordering: v.sortBy.map(({ key: g, order: k }) => k == "asc" ? g : `-${g}`)
        }
      });
    }
    function m(v, g) {
      n.show({ view: "detail.edit", value: g });
    }
    return (v, g) => {
      var k;
      return d(), w(Ot, {
        items: e(r).items,
        "item-index": "id",
        "items-length": e(r).count || e(r).items.length,
        loading: (k = e(r).state) == null ? void 0 : k.isProcessing,
        headers: f.value,
        "onUpdate:options": o
      }, z({
        loading: i(() => [
          p(xt, { type: "table-row@10" })
        ]),
        "item.actions": i(({ item: b }) => [
          a.edit ? (d(), w(ie, {
            key: 0,
            icon: "mdi-pencil",
            button: "",
            title: e(u)("actions.edit"),
            permissions: e(c),
            item: b,
            run: m
          }, null, 8, ["title", "permissions", "item"])) : $("", !0),
          y(v.$slots, "item.actions", {
            value: b,
            dense: !0,
            button: !0
          })
        ]),
        _: 2
      }, [
        D(e(s), (b, V) => ({
          name: V,
          fn: i((B) => [
            y(v.$slots, V, P(A(B)))
          ])
        }))
      ]), 1032, ["items", "items-length", "loading", "headers"]);
    };
  }
}), Z = {
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
    const u = j(), l = a;
    let s = F(!1);
    Y(() => l.state.state, (c) => {
      l.delay && c == Mt.PROCESSING && (s.value = !1, window.setTimeout(() => {
        s.value = !0;
      }, 5e3));
    });
    const n = L(() => {
      var c;
      return ((c = l.state) == null ? void 0 : c.isProcessing) && (!l.delay || s.value);
    }), r = L(() => {
      var c, t;
      return (t = (c = l.state) == null ? void 0 : c.data) == null ? void 0 : t.messages;
    });
    return (c, t) => (d(), S(C, null, [
      l.state.isNone && e(u).none ? (d(), w(e(J), {
        key: 0,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        state: a.state,
        title: a.noneTitle
      }, {
        default: i(() => [
          y(c.$slots, "none", { state: a.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : n.value ? (d(), w(e(J), {
        key: 1,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: a.state,
        title: a.processingTitle
      }, {
        default: i(() => [
          y(c.$slots, "processing", { state: a.state }, () => [
            t[0] || (t[0] = h(" Data are being sent to server, please be patient. If this message persist you might wan't to retry. "))
          ])
        ]),
        _: 3
      }, 8, ["state", "title"])) : l.state.isError ? (d(), w(e(J), {
        key: 2,
        type: "error",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: a.state,
        title: a.errorTitle
      }, {
        default: i(() => [
          y(c.$slots, "error", { state: a.state }, () => [
            t[1] || (t[1] = h(" Oups... something wrong happened. "))
          ]),
          y(c.$slots, "error-detail", { state: a.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : l.state.isOk ? (d(), w(e(J), {
        key: 3,
        type: "success",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: a.state,
        title: a.okTitle
      }, {
        default: i(() => [
          y(c.$slots, "ok", { state: a.state }, () => [
            t[2] || (t[2] = R("p", null, "Congrats! Data have been updated.", -1))
          ]),
          r.value ? (d(), S(C, { key: 0 }, [
            p(ht),
            (d(!0), S(C, null, D(r.value, (f) => (d(), S("p", null, E(f), 1))), 256))
          ], 64)) : $("", !0),
          y(c.$slots, "ok-detail", { state: a.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : $("", !0),
      y(c.$slots, "default", {
        state: l.state
      })
    ], 64));
  }
}, oa = { class: "text-right" }, re = {
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
  setup(a, { emit: u }) {
    const l = u, s = a;
    return (n, r) => (d(), S("div", oa, [
      p(e(x), {
        color: "error",
        class: "me-2",
        "prepend-icon": s.resetIcon,
        onClick: r[0] || (r[0] = (c) => l("reset")),
        disabled: s.disabled
      }, {
        default: i(() => [
          y(n.$slots, "reset", {}, () => [
            h(E(s.resetLabel), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]),
      s.state.isSending ? (d(), w(e(x), {
        key: 0,
        color: "primary",
        "prepend-icon": "mdi-content-save",
        disabled: ""
      }, {
        default: i(() => r[2] || (r[2] = [
          h(" Saving ")
        ])),
        _: 1
      })) : (d(), w(e(x), {
        key: 1,
        color: "primary",
        "prepend-icon": s.validateIcon,
        onClick: r[1] || (r[1] = (c) => l("validate")),
        disabled: s.disabled || s.validateDisabled
      }, {
        default: i(() => [
          y(n.$slots, "validate", {}, () => [
            h(E(s.validateLabel), 1)
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
  setup(a, { emit: u }) {
    const l = we("password"), s = a, n = te({
      username: "",
      password: ""
    }), r = F(!1), c = te(new Et());
    function t(o = !0) {
      Nt(n, { username: "", password: "" }), o && c.none();
    }
    async function f() {
      c.processing();
      try {
        const o = await fetch(s.url, {
          method: "POST",
          headers: Ft.axiosConfig.headers,
          body: JSON.stringify(n)
        });
        o.status == 200 ? (n.credentials = "", n.password = "", c.ok(await o.json()), s.next && (window.location.href = s.next)) : c.error(await o.json());
      } catch (o) {
        c.ok((o == null ? void 0 : o.message) || o);
      }
    }
    return (o, m) => (d(), S(C, null, [
      p(e(Z), { state: c }, {
        none: i(({ state: v }) => m[7] || (m[7] = [
          R("p", null, "Please enter your credentials in order too proceed...", -1)
        ])),
        "ok-detail": i(({ state: v }) => [
          s.next ? (d(), S("p", ia, [
            m[8] || (m[8] = h("You soon will be redirected to ")),
            R("i", null, E(s.next), 1)
          ])) : $("", !0)
        ]),
        error: i(({ state: v }) => {
          var g, k;
          return [
            p(ne, {
              errors: (g = v.data) == null ? void 0 : g.username
            }, null, 8, ["errors"]),
            p(ne, {
              errors: (k = v.data) == null ? void 0 : k.password
            }, null, 8, ["errors"])
          ];
        }),
        _: 1
      }, 8, ["state"]),
      c.isOk ? $("", !0) : (d(), S(C, { key: 0 }, [
        p(le, {
          variant: "underlined",
          label: "Enter login",
          modelValue: n.username,
          "onUpdate:modelValue": m[0] || (m[0] = (v) => n.username = v),
          onKeyup: m[1] || (m[1] = ce(I((v) => e(l).focus(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue"]),
        p(le, {
          variant: "underlined",
          ref: "password",
          label: "Enter password",
          modelValue: n.password,
          "onUpdate:modelValue": m[2] || (m[2] = (v) => n.password = v),
          type: r.value ? "text" : "password",
          "append-icon": r.value ? "mdi-eye" : "mdi-eye-off",
          "onClick:append": m[3] || (m[3] = (v) => r.value = !r.value),
          onKeyup: m[4] || (m[4] = ce(I((v) => f(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue", "type", "append-icon"]),
        R("div", ra, [
          y(o.$slots, "default", {
            value: n.password
          }, () => [
            n.username && n.password ? (d(), w(re, {
              key: 0,
              "validate-label": "Login!",
              onValidate: m[5] || (m[5] = (v) => f()),
              onReset: m[6] || (m[6] = (v) => t()),
              state: c
            }, null, 8, ["state"])) : $("", !0)
          ])
        ])
      ], 64))
    ], 64));
  }
}, he = /* @__PURE__ */ N({
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
  setup(a) {
    const u = j(), l = a, s = G(u, "views."), n = F(!1);
    ye(() => {
      n.value = !0;
    }), Ue(() => {
      n.value = !1;
    });
    const r = _("panels"), c = _("panel");
    return (t, f) => (d(), w(se, {
      value: l.name
    }, {
      default: i(() => [
        l.state ? (d(), w(Z, {
          key: 0,
          state: l.state,
          delay: ""
        }, null, 8, ["state"])) : $("", !0),
        p(Ve, { class: "ma-4" }, {
          default: i(() => [
            (d(), w(pe, {
              to: "#app-bar-sheet-title",
              disabled: !n.value || e(r).panel != l.name
            }, [
              l.icon ? (d(), w(M, {
                key: 0,
                icon: l.icon
              }, null, 8, ["icon"])) : $("", !0),
              h(" " + E(l.title), 1)
            ], 8, ["disabled"])),
            (d(), w(pe, {
              to: "#app-bar-right",
              disabled: !n.value || e(r).panel != l.name
            }, [
              y(t.$slots, "append-title"),
              l.help ? (d(), w(x, {
                key: 0,
                class: "ml-3",
                href: l.help,
                panels: "new",
                icon: "mdi-information-outline"
              }, null, 8, ["href"])) : $("", !0)
            ], 8, ["disabled"])),
            y(t.$slots, "top"),
            y(t.$slots, "default", {}, () => [
              e(s) ? (d(), w(Pt, {
                key: 0,
                modelValue: e(c).view,
                "onUpdate:modelValue": f[0] || (f[0] = (o) => e(c).view = o)
              }, {
                default: i(() => [
                  (d(!0), S(C, null, D(e(s), (o, m) => (d(), w(Ct, {
                    key: o,
                    value: o
                  }, {
                    default: i(() => [
                      y(t.$slots, m)
                    ]),
                    _: 2
                  }, 1032, ["value"]))), 128))
                ]),
                _: 3
              }, 8, ["modelValue"])) : $("", !0)
            ]),
            y(t.$slots, "bottom")
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["value"]));
  }
}), da = { class: "mb-3" }, Pe = /* @__PURE__ */ N({
  __name: "OxModelEdit",
  props: {
    repo: {},
    initial: {},
    name: {},
    url: {},
    saved: { type: Function }
  },
  setup(a) {
    const { t: u } = X(), s = qe({ props: a }), n = L(() => s.repo.model), { value: r, edited: c } = ge(s), t = F(null), f = j(), o = G(f, "tab.", { exclude: "tab.default" }), m = G(f, "window.", { exclude: "window.default" }), v = L(() => ({
      value: r.value,
      model: n.value
    }));
    return (g, k) => (d(), S(C, null, [
      p(Z, {
        state: e(s).state
      }, null, 8, ["state"]),
      R("div", da, [
        e(c) ? (d(), w(re, {
          key: 0,
          onValidate: k[0] || (k[0] = (b) => e(s).save()),
          onReset: k[1] || (k[1] = (b) => e(s).discard()),
          state: e(s).state,
          "validate-disabled": !e(s).valid
        }, null, 8, ["state", "validate-disabled"])) : $("", !0)
      ]),
      e(o) && Object.keys(e(o)).length ? (d(), S(C, { key: 0 }, [
        p(Tt, {
          modelValue: t.value,
          "onUpdate:modelValue": k[2] || (k[2] = (b) => t.value = b)
        }, {
          default: i(() => [
            y(g.$slots, "tab.default", P(A(v.value)), () => [
              p(At, {
                text: e(u)(`models.${n.value.entity}`),
                value: "model"
              }, null, 8, ["text"])
            ]),
            (d(!0), S(C, null, D(e(o), (b, V) => y(g.$slots, V, U({ ref_for: !0 }, v.value))), 256))
          ]),
          _: 3
        }, 8, ["modelValue"]),
        p(ke, {
          modelValue: t.value,
          "onUpdate:modelValue": k[3] || (k[3] = (b) => t.value = b)
        }, {
          default: i(() => [
            p(se, { value: "model" }, {
              default: i(() => [
                y(g.$slots, "window.default", P(A(v.value)))
              ]),
              _: 3
            }),
            (d(!0), S(C, null, D(e(m), (b, V) => (d(), w(se, { value: b }, {
              default: i(() => [
                y(g.$slots, V, U({ ref_for: !0 }, v.value))
              ]),
              _: 2
            }, 1032, ["value"]))), 256))
          ]),
          _: 3
        }, 8, ["modelValue"])
      ], 64)) : y(g.$slots, "window.default", P(U({ key: 1 }, v.value)))
    ], 64));
  }
}), ca = /* @__PURE__ */ N({
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
  setup(a) {
    const u = j(), l = G(u, "views.list."), s = G(u, "item."), n = G(u, "views.detail.edit."), r = we("filters"), c = a, t = _("panel") ?? He({ props: c }), f = t.panels, o = t.list, { showFilters: m } = ge(t), v = L(() => [
      ...c.headers,
      { key: "actions", title: O("actions") }
    ]), g = L(() => ({
      panel: t,
      panels: f,
      list: o,
      value: t.value
    }));
    return (k, b) => (d(), w(he, {
      name: c.name,
      title: e(t).title,
      icon: e(t).icon,
      state: e(o).state,
      index: c.index
    }, z({
      "append-title": i(() => [
        y(k.$slots, "append-title", P(A(g.value))),
        e(t).view.startsWith("list.") ? (d(), w(fe, {
          key: 0,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: i(() => [
            y(k.$slots, "nav.list", P(A(g.value))),
            e(r) ? (d(), w(x, {
              key: 0,
              title: e(m) ? e(O)("filters.hide") : e(O)("filters.show"),
              "aria-label": e(m) ? e(O)("filters.hide") : e(O)("filters.show"),
              onClick: b[0] || (b[0] = (V) => m.value = !e(m)),
              active: e(m)
            }, {
              default: i(() => [
                p(M, {
                  icon: e(r).icon
                }, null, 8, ["icon"])
              ]),
              _: 1
            }, 8, ["title", "aria-label", "active"])) : $("", !0)
          ]),
          _: 3
        })) : e(t).view.startsWith("detail.") && e(t).value ? (d(), w(fe, {
          key: 1,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: i(() => [
            y(k.$slots, "nav.detail", P(A(g.value))),
            e(t).view == "detail.edit" && e(t).value ? (d(), w(Lt, { key: 0 }, {
              activator: i(({ props: V }) => [
                p(x, U({ "prepend-icon": "mdi-dots-vertical" }, V), {
                  default: i(() => [
                    h(E(e(O)("actions")), 1)
                  ]),
                  _: 2
                }, 1040)
              ]),
              default: i(() => [
                p($e, null, {
                  default: i(() => [
                    y(k.$slots, "item.actions", {
                      value: e(t).value
                    })
                  ]),
                  _: 3
                })
              ]),
              _: 3
            })) : $("", !0),
            p(x, {
              disabled: !e(t).prev,
              title: e(O)("prev"),
              "aria-label": e(O)("prev"),
              onClick: b[1] || (b[1] = I((V) => e(t).show({ value: e(t).prev }), ["stop"]))
            }, {
              default: i(() => [
                p(M, { icon: "mdi-chevron-left" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"]),
            p(x, {
              disabled: !e(t).next,
              title: e(O)("next"),
              "aria-label": e(O)("next"),
              onClick: b[2] || (b[2] = I((V) => e(t).show({ value: e(t).next }), ["stop"]))
            }, {
              default: i(() => [
                p(M, { icon: "mdi-chevron-right" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"])
          ]),
          _: 3
        })) : $("", !0),
        p(Bt, {
          class: "ml-3",
          color: "secondary",
          modelValue: e(t).view,
          "onUpdate:modelValue": b[4] || (b[4] = (V) => e(t).view = V),
          density: "compact",
          variant: "tonal"
        }, {
          default: i(() => {
            var V;
            return [
              p(x, {
                value: "list.table",
                title: e(O)("panels.nav.table"),
                "aria-label": e(O)("panels.nav.table")
              }, {
                default: i(() => [
                  p(M, null, {
                    default: i(() => b[5] || (b[5] = [
                      h("mdi-table")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"]),
              e(u)["views.list.cards"] ? (d(), w(x, {
                key: 0,
                value: "list.cards",
                title: e(O)("panels.nav.cards"),
                "aria-label": e(O)("panels.nav.cards")
              }, {
                default: i(() => [
                  p(M, null, {
                    default: i(() => b[6] || (b[6] = [
                      h("mdi-card-account-details")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : $("", !0),
              e(u)["views.list.kanban"] ? (d(), w(x, {
                key: 1,
                value: "list.kanban",
                title: e(O)("panels.nav.kanban"),
                "aria-label": e(O)("panels.nav.kanban")
              }, {
                default: i(() => [
                  p(M, null, {
                    default: i(() => b[7] || (b[7] = [
                      h("mdi-view-column")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : $("", !0),
              e(n) ? (d(), w(x, {
                key: 2,
                value: "detail.add",
                onClick: b[3] || (b[3] = I((B) => e(t).create(), ["stop"])),
                title: e(O)("panels.nav.add"),
                "aria-label": e(O)("panels.nav.add")
              }, {
                default: i(() => [
                  p(M, null, {
                    default: i(() => b[8] || (b[8] = [
                      h("mdi-plus-box")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : $("", !0),
              e(u)["views.detail.edit"] || e(n) ? (d(), w(x, {
                key: 3,
                value: "detail.edit",
                disabled: !((V = e(t).value) != null && V.id),
                title: e(O)("panels.nav.edit"),
                "aria-label": e(O)("panels.nav.edit")
              }, {
                default: i(() => [
                  p(M, null, {
                    default: i(() => b[9] || (b[9] = [
                      h("mdi-pencil")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"])) : $("", !0),
              y(k.$slots, "nav.views", P(A(g.value)))
            ];
          }),
          _: 3
        }, 8, ["modelValue"])
      ]),
      top: i(() => [
        Re(p(Oe, {
          ref_key: "filters",
          ref: r,
          search: c.search,
          "teleport-to": "#panel-list-actions"
        }, {
          default: i((V) => [
            y(k.$slots, "list.filters", P(A(V)))
          ]),
          _: 3
        }, 8, ["search"]), [
          [je, e(t).view.startsWith("list.") && e(m)]
        ])
      ]),
      _: 2
    }, [
      e(u)["views.list.table"] ? void 0 : {
        name: "views.list.table",
        fn: i(() => [
          p(xe, {
            headers: v.value,
            edit: ""
          }, z({ _: 2 }, [
            D(e(s), (V, B) => ({
              name: B,
              fn: i((W) => [
                y(k.$slots, B, P(A(W)))
              ])
            }))
          ]), 1032, ["headers"])
        ]),
        key: "0"
      },
      D(e(l), (V, B) => ({
        name: B,
        fn: i(() => [
          y(k.$slots, B, P(A(g.value)))
        ])
      })),
      e(u)["views.detail.edit"] || e(n) ? {
        name: "views.detail.edit",
        fn: i(() => [
          p(Pe, {
            repo: e(t).repo,
            initial: e(t).value,
            name: `${e(t).model.entity}-edit`,
            saved: (V) => e(t).value = V
          }, z({ _: 2 }, [
            D(e(n), (V, B) => ({
              name: V,
              fn: i((W) => [
                y(k.$slots, B, P(A(W)))
              ])
            }))
          ]), 1032, ["repo", "initial", "name", "saved"])
        ]),
        key: "1"
      } : void 0
    ]), 1032, ["name", "title", "icon", "state", "index"]));
  }
}), pa = /* @__PURE__ */ N({
  __name: "OxPanelNav",
  props: {
    title: {},
    icon: {},
    panel: {},
    href: {},
    auto: { type: Boolean }
  },
  setup(a) {
    const u = a, l = _("panels");
    return L(() => !u.auto || panel.name == u.name), (s, n) => (d(), w(oe, {
      active: e(l).panel == u.name,
      "prepend-icon": u.icon,
      title: u.title,
      onClick: n[0] || (n[0] = I((r) => e(l).show(u), ["stop"]))
    }, null, 8, ["active", "prepend-icon", "title"]));
  }
}), ma = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OxAction: ie,
  OxActionModelDelete: qt,
  OxActions: Ht,
  OxApp: ta,
  OxComponent: aa,
  OxFieldDetails: ne,
  OxListFilters: Oe,
  OxListKanban: na,
  OxListTable: xe,
  OxLogin: ua,
  OxModelEdit: Pe,
  OxModelPanel: ca,
  OxPanel: he,
  OxPanelNav: pa,
  OxStateAlert: Z,
  OxValidationBtn: re
}, Symbol.toStringTag, { value: "Module" })), ka = {
  el: "#app",
  delimiters: ["[[", "]]"],
  components: { ...ma, ...Yt }
};
export {
  ka as App,
  ie as OxAction,
  qt as OxActionModelDelete,
  Ht as OxActions,
  ta as OxApp,
  aa as OxComponent,
  ne as OxFieldDetails,
  Oe as OxListFilters,
  na as OxListKanban,
  xe as OxListTable,
  ua as OxLogin,
  Pe as OxModelEdit,
  ca as OxModelPanel,
  he as OxPanel,
  pa as OxPanelNav,
  Z as OxStateAlert,
  re as OxValidationBtn
};
//# sourceMappingURL=components.js.map
