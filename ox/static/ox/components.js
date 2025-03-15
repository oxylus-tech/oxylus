import { defineComponent as R, inject as _, unref as e, openBlock as u, createElementBlock as x, Fragment as T, createBlock as y, withModifiers as M, createCommentVNode as V, useSlots as K, renderSlot as b, normalizeProps as P, guardReactiveProps as B, ref as j, shallowRef as Z, watch as J, onMounted as ye, computed as D, onScopeDispose as _e, createVNode as c, mergeProps as G, nextTick as Ie, watchEffect as De, reactive as te, onErrorCaptured as Me, withCtx as r, createTextVNode as h, toDisplayString as U, createElementVNode as W, createSlots as H, h as Ee, renderList as N, normalizeClass as Ne, useTemplateRef as we, withKeys as ce, onUnmounted as Fe, Teleport as pe, toRefs as ge, withDirectives as Ue, vShow as Re } from "vue";
import { useAction as je, t as g, useAppContext as Ge, usePanels as We, defineAsyncComponent as Ke, tKeys as ze, filterSlots as z, useModelEditor as Ye, useModelPanel as qe } from "ox";
import { V as O, a as oe, m as He, b as Je, c as Qe, d as Xe, e as Ze, u as et, f as tt, g as at, h as lt, i as st, j as nt, k as ot, l as me, n as it, o as rt, p as ut, q as dt, r as ct, s as pt, t as ae, v as ve, w as mt, x as vt, y as ft, z as ke, A as F, B as bt, C as le, D as yt, E as wt, F as gt, G as Ve, H as kt, I as Vt, J as $t, K as $e, L as St, M as xt, N as X, O as Ot, P as se, Q as ht, R as Ct, S as Pt, T as Tt, U as fe, W as At, X as Lt } from "./VAlert-CTpFsU7b.js";
import { n as Bt, o as _t, q as It, r as Se, u as Dt, s as Mt, t as Et, v as Nt } from "./theme-CVupjJDc.js";
import { x as Ft, d as Ut, t as Rt, S as jt, r as Gt, j as Wt } from "./auth-fH0JwUpa.js";
import { components as Kt } from "ox/vendor";
const ie = /* @__PURE__ */ R({
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
  setup(l, { emit: d }) {
    const t = l, n = d, a = _("context"), { run: v, processing: o, allowed: s } = je({ user: a.user, emits: n, props: t });
    return (i, f) => e(s) ? (u(), x(T, { key: 0 }, [
      t.button ? (u(), y(O, {
        key: 0,
        variant: "text",
        disabled: e(o),
        color: t.color,
        icon: t.icon,
        title: t.title,
        "aria-label": t.title,
        onClick: M(e(v), ["stop"])
      }, null, 8, ["disabled", "color", "icon", "title", "aria-label", "onClick"])) : (u(), y(oe, {
        key: 1,
        title: t.title,
        "base-color": t.color,
        "prepend-icon": t.icon,
        disabled: e(o),
        onClick: M(e(v), ["stop"])
      }, null, 8, ["title", "base-color", "prepend-icon", "disabled", "onClick"]))
    ], 64)) : V("", !0);
  }
}), zt = /* @__PURE__ */ R({
  __name: "OxActionModelDelete",
  props: {
    item: {},
    button: { type: Boolean }
  },
  setup(l) {
    const d = _("panel"), t = _("repos"), n = l;
    async function a(v, o) {
      return await t[o.constructor.entity].api().delete(o.$url(), { delete: n.item.id });
    }
    return (v, o) => (u(), y(ie, {
      item: n.item,
      button: n.button,
      icon: "mdi-delete",
      color: "error",
      title: e(g)("actions.delete"),
      confirm: e(g)("actions.delete.confirm"),
      permissions: ["delete", (s, i) => i.id],
      run: a,
      onCompleted: o[0] || (o[0] = (s) => {
        var i;
        return (i = e(d)) == null ? void 0 : i.show({ view: e(d).index });
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
  setup(l) {
    K();
    const d = l;
    return (t, n) => (u(), x(T, null, [
      b(t.$slots, "before", P(B(d))),
      b(t.$slots, "default", P(B(d))),
      b(t.$slots, "after", P(B(d)))
    ], 64));
  }
};
function qt(l) {
  const d = Z(l());
  let t = -1;
  function n() {
    clearInterval(t);
  }
  function a() {
    n(), Ie(() => d.value = l());
  }
  function v(o) {
    const s = o ? getComputedStyle(o) : {
      transitionDuration: 0.2
    }, i = parseFloat(s.transitionDuration) * 1e3 || 200;
    if (n(), d.value <= 0) return;
    const f = performance.now();
    t = window.setInterval(() => {
      const p = performance.now() - f + i;
      d.value = Math.max(l() - p, 0), d.value <= 0 && n();
    }, i);
  }
  return _e(n), {
    clear: n,
    time: d,
    start: v,
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
}, "VSnackbar"), Jt = Se()({
  name: "VSnackbar",
  props: Ht(),
  emits: {
    "update:modelValue": (l) => !0
  },
  setup(l, d) {
    let {
      slots: t
    } = d;
    const n = Dt(l, "modelValue"), {
      positionClasses: a
    } = et(l), {
      scopeId: v
    } = tt(), {
      themeClasses: o
    } = Mt(l), {
      colorClasses: s,
      colorStyles: i,
      variantClasses: f
    } = at(l), {
      roundedClasses: p
    } = lt(l), m = qt(() => Number(l.timeout)), k = j(), w = j(), C = Z(!1), E = Z(0), A = j(), $ = _(st, void 0);
    Et(() => !!$, () => {
      const L = dt();
      De(() => {
        A.value = L.mainStyles.value;
      });
    }), J(n, I), J(() => l.timeout, I), ye(() => {
      n.value && I();
    });
    let S = -1;
    function I() {
      m.reset(), window.clearTimeout(S);
      const L = Number(l.timeout);
      if (!n.value || L === -1) return;
      const q = Nt(w.value);
      m.start(q), S = window.setTimeout(() => {
        n.value = !1;
      }, L);
    }
    function Y() {
      m.reset(), window.clearTimeout(S);
    }
    function Pe() {
      C.value = !0, Y();
    }
    function ue() {
      C.value = !1, I();
    }
    function Te(L) {
      E.value = L.touches[0].clientY;
    }
    function Ae(L) {
      Math.abs(E.value - L.changedTouches[0].clientY) > 50 && (n.value = !1);
    }
    function Le() {
      C.value && ue();
    }
    const Be = D(() => l.location.split(" ").reduce((L, q) => (L[`v-snackbar--${q}`] = !0, L), {}));
    return nt(() => {
      const L = me.filterProps(l), q = !!(t.default || t.text || l.text);
      return c(me, G({
        ref: k,
        class: ["v-snackbar", {
          "v-snackbar--active": n.value,
          "v-snackbar--multi-line": l.multiLine && !l.vertical,
          "v-snackbar--timer": !!l.timer,
          "v-snackbar--vertical": l.vertical
        }, Be.value, a.value, l.class],
        style: [A.value, l.style]
      }, L, {
        modelValue: n.value,
        "onUpdate:modelValue": (Q) => n.value = Q,
        contentProps: G({
          class: ["v-snackbar__wrapper", o.value, s.value, p.value, f.value],
          style: [i.value],
          onPointerenter: Pe,
          onPointerleave: ue
        }, L.contentProps),
        persistent: !0,
        noClickAnimation: !0,
        scrim: !1,
        scrollStrategy: "none",
        _disableGlobalStack: !0,
        onTouchstartPassive: Te,
        onTouchend: Ae,
        onAfterLeave: Le
      }, v), {
        default: () => {
          var Q, de;
          return [it(!1, "v-snackbar"), l.timer && !C.value && c("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [c(rt, {
            ref: w,
            color: typeof l.timer == "string" ? l.timer : "info",
            max: l.timeout,
            "model-value": m.time.value
          }, null)]), q && c("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((Q = t.text) == null ? void 0 : Q.call(t)) ?? l.text, (de = t.default) == null ? void 0 : de.call(t)]), t.actions && c(ut, {
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
    }), ot({}, k);
  }
}), Qt = { class: "nav-home" }, Xt = ["src"];
var be;
const Zt = /* @__PURE__ */ R({
  __name: "OxApp",
  props: {
    apiUrl: {},
    logo: {},
    dataEl: { default: (be = document.body.dataset) == null ? void 0 : be.appData },
    models: {},
    data: {}
  },
  setup(l) {
    const d = K(), t = l, n = te({ drawer: !0 }), a = Ge(t), v = We();
    return J(() => [a.state.state, a.state.data], () => {
      a.showState = !0;
    }), Me((o, s, i) => {
      a.state.error(`${o}`);
    }), (o, s) => (u(), y(ct, null, {
      default: r(() => [
        c(Jt, {
          modelValue: e(a).showState,
          "onUpdate:modelValue": s[0] || (s[0] = (i) => e(a).showState = i),
          color: e(a).state.color,
          "multi-line": ""
        }, {
          default: r(() => [
            h(U(e(a).state.data), 1)
          ]),
          _: 1
        }, 8, ["modelValue", "color"]),
        c(pt, { color: "primary" }, {
          prepend: r(() => [
            c(ae, {
              icon: "mdi-apps",
              title: e(g)("nav.panels"),
              "aria-label": e(g)("nav.panels"),
              onClick: s[1] || (s[1] = M((i) => n.drawer = !n.drawer, ["stop"]))
            }, null, 8, ["title", "aria-label"]),
            e(d)["app-nav"] && !n.drawer2 ? (u(), y(ae, {
              key: 0,
              icon: "mdi-menu",
              onClick: s[2] || (s[2] = (i) => {
                n.drawer2 = !0, n.drawer = !1;
              })
            })) : V("", !0)
          ]),
          default: r(() => [
            c(ve, { id: "app-bar-sheet-title" }),
            c(ve, { id: "app-bar-title" }, {
              default: r(() => [
                b(o.$slots, "title", { context: e(a) })
              ]),
              _: 3
            }),
            c(mt),
            s[5] || (s[5] = W("div", {
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
          "onUpdate:modelValue": s[3] || (s[3] = (i) => n.drawer = i)
        }, H({
          default: r(() => [
            W("a", Qt, [
              o.logo ? (u(), x("img", {
                key: 0,
                src: o.logo,
                class: "logo"
              }, null, 8, Xt)) : V("", !0)
            ]),
            b(o.$slots, "nav-start", { context: e(a) }),
            b(o.$slots, "nav-list", { context: e(a) })
          ]),
          _: 2
        }, [
          e(d)["nav-end"] ? {
            name: "append",
            fn: r(() => [
              b(o.$slots, "nav-end", { context: e(a) })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue"]),
        c(ft, null, {
          default: r(() => [
            b(o.$slots, "main", {}, () => [
              c(ke, {
                modelValue: e(v).panel,
                "onUpdate:modelValue": s[4] || (s[4] = (i) => e(v).panel = i)
              }, {
                default: r((i) => [
                  b(o.$slots, "default", G(i, { context: e(a) }))
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
  setup(l) {
    const d = Z(null), t = D(() => {
      if (l.is)
        return l.is;
      let a = l.src.substring(l.src.lastIndexOf("/") + 1);
      if (a && (a = a.substring(0, a.indexOf("."))), !a)
        throw Error(
          "`is` not provided and could not be deducted from `src`."
        );
      return a;
    });
    function n() {
      d.value = Ke(l.src, t.value);
    }
    return J(() => l.src, n), n(), () => Ee(d.value, l);
  }
}, ta = { class: "password-error" }, ne = {
  __name: "OxFieldDetails",
  props: {
    state: Object,
    errors: Array
  },
  setup(l) {
    const d = l;
    return (t, n) => d.errors ? (u(!0), x(T, { key: 0 }, N(d.errors, (a) => (u(), x("div", ta, [
      c(F, { icon: "mdi-alert-circle-outline" }),
      h(" " + U(a), 1)
    ]))), 256)) : V("", !0);
  }
}, xe = {
  __name: "OxListFilters",
  props: {
    search: String
  },
  setup(l, { expose: d }) {
    const t = _("list"), n = l, a = D(() => {
      const s = t.filters;
      return s && Object.entries(s).some(
        ([i, f]) => !i.startsWith("page") && !i.startsWith("ordering") && !!f
      );
    }), v = D(() => a.value ? "mdi-filter-check" : "mdi-filter-outline");
    function o() {
      t.filters = {}, t.load();
    }
    return d({ icon: v, hasFilters: a, reset: o }), (s, i) => (u(), x("form", {
      onSubmit: i[2] || (i[2] = M((f) => e(t).load(), ["prevent"])),
      class: "width-full"
    }, [
      c(bt, {
        dense: "",
        color: "transparent"
      }, {
        default: r(() => [
          c(ae, {
            icon: v.value,
            readonly: ""
          }, null, 8, ["icon"]),
          n.search && e(t).filters ? (u(), y(le, {
            key: 0,
            label: e(g)("filters.search"),
            density: "compact",
            class: "ml-2",
            modelValue: e(t).filters[n.search],
            "onUpdate:modelValue": i[0] || (i[0] = (f) => e(t).filters[n.search] = f),
            "hide-details": ""
          }, null, 8, ["label", "modelValue"])) : V("", !0),
          b(s.$slots, "default", {
            list: e(t),
            filters: e(t).filters
          }),
          c(O, {
            onClick: i[1] || (i[1] = M((f) => e(t).load(), ["stop"])),
            class: "ml-2",
            icon: "mdi-check",
            "aria-label": s.$t("filters.apply"),
            title: e(g)("filters.apply")
          }, null, 8, ["aria-label", "title"]),
          a.value ? (u(), y(O, {
            key: 1,
            onClick: M(o, ["stop"]),
            icon: "mdi-backspace",
            "aria-label": e(g)("filters.reset"),
            title: e(g)("filters.reset")
          }, null, 8, ["aria-label", "title"])) : V("", !0)
        ]),
        _: 3
      })
    ], 32));
  }
}, aa = Se()({
  name: "VSlideGroupItem",
  props: yt(),
  emits: {
    "group:selected": (l) => !0
  },
  setup(l, d) {
    let {
      slots: t
    } = d;
    const n = wt(l, gt);
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
  setup(l, { emit: d }) {
    const t = d;
    _("list");
    const n = _("items"), a = l;
    function v(i) {
      return i = i % a.colors.length, a.colorVariant ? a.colors[i] + "-" + a.colorVariant : a.colors[i];
    }
    function o(i, f, p) {
      i[p] ? !i[p].includes(f) && i[p].push(f) : i[p] = [f];
    }
    const s = D(() => {
      const i = {};
      if (n.value)
        for (var f of n.value) {
          const m = f[a.field];
          if (Array.isArray(m))
            if (m.length)
              for (var p of m)
                o(i, f, p);
            else
              o(i, f, null);
          else
            o(i, f, m);
        }
      return i;
    });
    return (i, f) => (u(), y(Ve, null, {
      default: r(() => [
        c(kt, null, {
          default: r(() => [
            (u(!0), x(T, null, N(a.headers, (p, m) => (u(), y(aa, {
              key: p.value
            }, {
              default: r(({ selectedClass: k }) => [
                c(Vt, {
                  width: "400",
                  class: Ne(["ma-3", k]),
                  color: v(m),
                  lines: "two"
                }, {
                  default: r(() => [
                    c($t, null, {
                      default: r(() => [
                        h(U(p.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    c($e, {
                      "bg-color": v(m)
                    }, {
                      default: r(() => [
                        s.value && s.value[p.value] ? (u(!0), x(T, { key: 0 }, N(s.value[p.value], (w) => b(i.$slots, "item", {
                          key: w.id,
                          header: p,
                          item: w
                        }, () => [
                          c(oe, {
                            title: w[a.itemTitle],
                            value: a.itemValue && w[a.itemValue],
                            onClick: (C) => t("click", w)
                          }, {
                            append: r(() => [
                              b(i.$slots, "item.action")
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
}, Oe = /* @__PURE__ */ R({
  __name: "OxListTable",
  props: {
    // list: Object,
    headers: Array,
    edit: Boolean
  },
  setup(l) {
    const d = K(), t = Ft(d, "item.", { exclude: ["item.actions"] }), n = _("panel"), a = _("list"), v = _("items"), o = new Ut("change"), s = l, i = D(() => s.headers.reduce((m, k) => (m.push(
      typeof k == "string" ? { key: k, title: g(ze.field(k)) } : k
    ), m), []));
    function f(m) {
      return a.fetch({
        filters: {
          page: m.page,
          page_size: m.itemsPerPage,
          ordering: m.sortBy.map(({ key: k, order: w }) => w == "asc" ? k : `-${k}`)
        }
      });
    }
    function p(m, k) {
      n.show({ view: "detail.edit", value: k });
    }
    return (m, k) => {
      var w;
      return u(), y(St, {
        items: e(v),
        "item-index": "id",
        "items-length": e(a).count || e(v).length,
        loading: (w = e(a).state) == null ? void 0 : w.isProcessing,
        headers: i.value,
        "onUpdate:options": f
      }, H({
        loading: r(() => [
          c(xt, { type: "table-row@10" })
        ]),
        "item.actions": r(({ item: C }) => [
          l.edit ? (u(), y(ie, {
            key: 0,
            icon: "mdi-pencil",
            button: "",
            title: e(g)("actions.edit"),
            permissions: e(o),
            item: C,
            run: p
          }, null, 8, ["title", "permissions", "item"])) : V("", !0),
          b(m.$slots, "item.actions", {
            value: C,
            dense: !0,
            button: !0
          })
        ]),
        _: 2
      }, [
        N(e(t), (C, E) => ({
          name: E,
          fn: r((A) => [
            b(m.$slots, E, P(B(A)))
          ])
        }))
      ]), 1032, ["items", "items-length", "loading", "headers"]);
    };
  }
}), ee = {
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
    const d = K(), t = l;
    let n = j(!1);
    J(() => t.state.state, (o) => {
      t.delay && o == Rt.PROCESSING && (n.value = !1, window.setTimeout(() => {
        n.value = !0;
      }, 5e3));
    });
    const a = D(() => {
      var o;
      return ((o = t.state) == null ? void 0 : o.isProcessing) && (!t.delay || n.value);
    }), v = D(() => {
      var o, s;
      return (s = (o = t.state) == null ? void 0 : o.data) == null ? void 0 : s.messages;
    });
    return (o, s) => (u(), x(T, null, [
      t.state.isNone && e(d).none ? (u(), y(e(X), {
        key: 0,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        state: l.state,
        title: l.noneTitle
      }, {
        default: r(() => [
          b(o.$slots, "none", { state: l.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : a.value ? (u(), y(e(X), {
        key: 1,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: l.state,
        title: l.processingTitle
      }, {
        default: r(() => [
          b(o.$slots, "processing", { state: l.state }, () => [
            s[0] || (s[0] = h(" Data are being sent to server, please be patient. If this message persist you might wan't to retry. "))
          ])
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isError ? (u(), y(e(X), {
        key: 2,
        type: "error",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: l.state,
        title: l.errorTitle
      }, {
        default: r(() => [
          b(o.$slots, "error", { state: l.state }, () => [
            s[1] || (s[1] = h(" Oups... something wrong happened. "))
          ]),
          b(o.$slots, "error-detail", { state: l.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isOk ? (u(), y(e(X), {
        key: 3,
        type: "success",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: l.state,
        title: l.okTitle
      }, {
        default: r(() => [
          b(o.$slots, "ok", { state: l.state }, () => [
            s[2] || (s[2] = W("p", null, "Congrats! Data have been updated.", -1))
          ]),
          v.value ? (u(), x(T, { key: 0 }, [
            c(Ot),
            (u(!0), x(T, null, N(v.value, (i) => (u(), x("p", null, U(i), 1))), 256))
          ], 64)) : V("", !0),
          b(o.$slots, "ok-detail", { state: l.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : V("", !0),
      b(o.$slots, "default", {
        state: t.state
      })
    ], 64));
  }
}, sa = { class: "text-right" }, re = {
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
  setup(l, { emit: d }) {
    const t = d, n = l;
    return (a, v) => (u(), x("div", sa, [
      c(e(O), {
        color: "error",
        class: "me-2",
        "prepend-icon": n.resetIcon,
        onClick: v[0] || (v[0] = (o) => t("reset")),
        disabled: n.disabled
      }, {
        default: r(() => [
          b(a.$slots, "reset", {}, () => [
            h(U(n.resetLabel), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]),
      n.state.isSending ? (u(), y(e(O), {
        key: 0,
        color: "primary",
        "prepend-icon": "mdi-content-save",
        disabled: ""
      }, {
        default: r(() => v[2] || (v[2] = [
          h(" Saving ")
        ])),
        _: 1
      })) : (u(), y(e(O), {
        key: 1,
        color: "primary",
        "prepend-icon": n.validateIcon,
        onClick: v[1] || (v[1] = (o) => t("validate")),
        disabled: n.disabled || n.validateDisabled
      }, {
        default: r(() => [
          b(a.$slots, "validate", {}, () => [
            h(U(n.validateLabel), 1)
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
  setup(l, { emit: d }) {
    const t = we("password"), n = l, a = te({
      username: "",
      password: ""
    }), v = j(!1), o = te(new jt());
    function s(f = !0) {
      Gt(a, { username: "", password: "" }), f && o.none();
    }
    async function i() {
      o.processing();
      try {
        const f = await fetch(n.url, {
          method: "POST",
          headers: Wt.axiosConfig.headers,
          body: JSON.stringify(a)
        });
        f.status == 200 ? (a.credentials = "", a.password = "", o.ok(await f.json()), n.next && (window.location.href = n.next)) : o.error(await f.json());
      } catch (f) {
        o.ok((f == null ? void 0 : f.message) || f);
      }
    }
    return (f, p) => (u(), x(T, null, [
      c(e(ee), { state: o }, {
        none: r(({ state: m }) => p[7] || (p[7] = [
          W("p", null, "Please enter your credentials in order too proceed...", -1)
        ])),
        "ok-detail": r(({ state: m }) => [
          n.next ? (u(), x("p", na, [
            p[8] || (p[8] = h("You soon will be redirected to ")),
            W("i", null, U(n.next), 1)
          ])) : V("", !0)
        ]),
        error: r(({ state: m }) => {
          var k, w;
          return [
            c(ne, {
              errors: (k = m.data) == null ? void 0 : k.username
            }, null, 8, ["errors"]),
            c(ne, {
              errors: (w = m.data) == null ? void 0 : w.password
            }, null, 8, ["errors"])
          ];
        }),
        _: 1
      }, 8, ["state"]),
      o.isOk ? V("", !0) : (u(), x(T, { key: 0 }, [
        c(le, {
          variant: "underlined",
          label: "Enter login",
          modelValue: a.username,
          "onUpdate:modelValue": p[0] || (p[0] = (m) => a.username = m),
          onKeyup: p[1] || (p[1] = ce(M((m) => e(t).focus(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue"]),
        c(le, {
          variant: "underlined",
          ref: "password",
          label: "Enter password",
          modelValue: a.password,
          "onUpdate:modelValue": p[2] || (p[2] = (m) => a.password = m),
          type: v.value ? "text" : "password",
          "append-icon": v.value ? "mdi-eye" : "mdi-eye-off",
          "onClick:append": p[3] || (p[3] = (m) => v.value = !v.value),
          onKeyup: p[4] || (p[4] = ce(M((m) => i(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue", "type", "append-icon"]),
        W("div", oa, [
          b(f.$slots, "default", {
            value: a.password
          }, () => [
            a.username && a.password ? (u(), y(re, {
              key: 0,
              "validate-label": "Login!",
              onValidate: p[5] || (p[5] = (m) => i()),
              onReset: p[6] || (p[6] = (m) => s()),
              state: o
            }, null, 8, ["state"])) : V("", !0)
          ])
        ])
      ], 64))
    ], 64));
  }
}, he = /* @__PURE__ */ R({
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
  setup(l) {
    const d = K(), t = l, n = z(d, "views."), a = j(!1);
    ye(() => {
      a.value = !0;
    }), Fe(() => {
      a.value = !1;
    });
    const v = _("panels"), o = _("panel");
    return (s, i) => (u(), y(se, {
      value: t.name
    }, {
      default: r(() => [
        t.state ? (u(), y(ee, {
          key: 0,
          state: t.state,
          delay: ""
        }, null, 8, ["state"])) : V("", !0),
        c(Ve, { class: "ma-4" }, {
          default: r(() => [
            (u(), y(pe, {
              to: "#app-bar-sheet-title",
              disabled: !a.value || e(v).panel != t.name
            }, [
              t.icon ? (u(), y(F, {
                key: 0,
                icon: t.icon
              }, null, 8, ["icon"])) : V("", !0),
              h(" " + U(t.title), 1)
            ], 8, ["disabled"])),
            (u(), y(pe, {
              to: "#app-bar-right",
              disabled: !a.value || e(v).panel != t.name
            }, [
              b(s.$slots, "append-title"),
              t.help ? (u(), y(O, {
                key: 0,
                class: "ml-3",
                href: t.help,
                panels: "new",
                icon: "mdi-information-outline"
              }, null, 8, ["href"])) : V("", !0)
            ], 8, ["disabled"])),
            b(s.$slots, "top"),
            b(s.$slots, "default", {}, () => [
              e(n) ? (u(), y(ht, {
                key: 0,
                modelValue: e(o).view,
                "onUpdate:modelValue": i[0] || (i[0] = (f) => e(o).view = f)
              }, {
                default: r(() => [
                  (u(!0), x(T, null, N(e(n), (f, p) => (u(), y(Ct, {
                    key: f,
                    value: f
                  }, {
                    default: r(() => [
                      b(s.$slots, p)
                    ]),
                    _: 2
                  }, 1032, ["value"]))), 128))
                ]),
                _: 3
              }, 8, ["modelValue"])) : V("", !0)
            ]),
            b(s.$slots, "bottom")
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["value"]));
  }
}), ra = { class: "mb-3" }, Ce = /* @__PURE__ */ R({
  __name: "OxModelEdit",
  props: {
    repo: {},
    initial: {},
    name: {},
    url: {},
    saved: { type: Function }
  },
  setup(l) {
    const d = l, { editor: t, edited: n } = Ye({ props: d }), a = D(() => t.repo.use), { value: v } = ge(t), o = j(null), s = K(), i = z(s, "tab.", { exclude: "tab.default" }), f = z(s, "window.", { exclude: "window.default" }), p = D(() => ({
      value: v.value,
      model: a.value
    }));
    return (m, k) => (u(), x(T, null, [
      c(ee, {
        state: e(t).state
      }, null, 8, ["state"]),
      W("div", ra, [
        e(n) ? (u(), y(re, {
          key: 0,
          onValidate: k[0] || (k[0] = (w) => e(t).save()),
          onReset: k[1] || (k[1] = (w) => e(t).discard()),
          state: e(t).state,
          "validate-disabled": !e(t).valid
        }, null, 8, ["state", "validate-disabled"])) : V("", !0)
      ]),
      e(i) && Object.keys(e(i)).length ? (u(), x(T, { key: 0 }, [
        c(Pt, {
          modelValue: o.value,
          "onUpdate:modelValue": k[2] || (k[2] = (w) => o.value = w)
        }, {
          default: r(() => [
            b(m.$slots, "tab.default", P(B(p.value)), () => [
              c(Tt, {
                text: e(g)(`models.${a.value.entity}`),
                value: "model"
              }, null, 8, ["text"])
            ]),
            (u(!0), x(T, null, N(e(i), (w, C) => b(m.$slots, C, G({ ref_for: !0 }, p.value))), 256))
          ]),
          _: 3
        }, 8, ["modelValue"]),
        c(ke, {
          modelValue: o.value,
          "onUpdate:modelValue": k[3] || (k[3] = (w) => o.value = w)
        }, {
          default: r(() => [
            c(se, { value: "model" }, {
              default: r(() => [
                b(m.$slots, "window.default", P(B(p.value)))
              ]),
              _: 3
            }),
            (u(!0), x(T, null, N(e(f), (w, C) => (u(), y(se, { value: w }, {
              default: r(() => [
                b(m.$slots, C, G({ ref_for: !0 }, p.value))
              ]),
              _: 2
            }, 1032, ["value"]))), 256))
          ]),
          _: 3
        }, 8, ["modelValue"])
      ], 64)) : b(m.$slots, "window.default", P(G({ key: 1 }, p.value)))
    ], 64));
  }
}), ua = /* @__PURE__ */ R({
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
  setup(l) {
    const d = K(), t = z(d, "views.list."), n = z(d, "item."), a = z(d, "views.detail.edit."), v = we("filters"), o = l, { panel: s, list: i, items: f, next: p, prev: m } = _("panel") ?? qe({ props: o }), k = s.panels, { showFilters: w } = ge(s), C = D(() => [
      ...o.headers,
      { key: "actions", title: g("actions") }
    ]), E = D(() => ({
      panel: s,
      panels: k,
      list: i,
      items: f,
      value: s.value
    }));
    return (A, $) => (u(), y(he, {
      name: o.name,
      title: e(s).title,
      icon: e(s).icon,
      state: e(i).state,
      index: o.index
    }, H({
      "append-title": r(() => [
        b(A.$slots, "append-title", P(B(E.value))),
        e(s).view.startsWith("list.") ? (u(), y(fe, {
          key: 0,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: r(() => [
            b(A.$slots, "nav.list", P(B(E.value))),
            e(v) ? (u(), y(O, {
              key: 0,
              title: e(w) ? e(g)("filters.hide") : e(g)("filters.show"),
              "aria-label": e(w) ? e(g)("filters.hide") : e(g)("filters.show"),
              onClick: $[0] || ($[0] = (S) => w.value = !e(w)),
              active: e(w)
            }, {
              default: r(() => [
                c(F, {
                  icon: e(v).icon
                }, null, 8, ["icon"])
              ]),
              _: 1
            }, 8, ["title", "aria-label", "active"])) : V("", !0)
          ]),
          _: 3
        })) : e(s).view.startsWith("detail.") && e(s).value ? (u(), y(fe, {
          key: 1,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: r(() => [
            b(A.$slots, "nav.detail", P(B(E.value))),
            e(s).view == "detail.edit" && e(s).value ? (u(), y(At, { key: 0 }, {
              activator: r(({ props: S }) => [
                c(O, G({ "prepend-icon": "mdi-dots-vertical" }, S), {
                  default: r(() => [
                    h(U(e(g)("actions")), 1)
                  ]),
                  _: 2
                }, 1040)
              ]),
              default: r(() => [
                c($e, null, {
                  default: r(() => [
                    b(A.$slots, "item.actions", {
                      value: e(s).value
                    })
                  ]),
                  _: 3
                })
              ]),
              _: 3
            })) : V("", !0),
            c(O, {
              disabled: !e(m),
              title: e(g)("prev"),
              "aria-label": e(g)("prev"),
              onClick: $[1] || ($[1] = M((S) => e(s).show({ value: e(m) }), ["stop"]))
            }, {
              default: r(() => [
                c(F, { icon: "mdi-chevron-left" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"]),
            c(O, {
              disabled: !e(p),
              title: e(g)("next"),
              "aria-label": e(g)("next"),
              onClick: $[2] || ($[2] = M((S) => e(s).show({ value: e(p) }), ["stop"]))
            }, {
              default: r(() => [
                c(F, { icon: "mdi-chevron-right" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"])
          ]),
          _: 3
        })) : V("", !0),
        c(Lt, {
          class: "ml-3",
          color: "secondary",
          modelValue: e(s).view,
          "onUpdate:modelValue": $[4] || ($[4] = (S) => e(s).view = S),
          density: "compact",
          variant: "tonal",
          mandatory: ""
        }, {
          default: r(() => {
            var S;
            return [
              c(O, {
                value: "list.table",
                title: e(g)("panels.nav.table"),
                "aria-label": e(g)("panels.nav.table")
              }, {
                default: r(() => [
                  c(F, null, {
                    default: r(() => $[5] || ($[5] = [
                      h("mdi-table")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"]),
              e(d)["views.list.cards"] ? (u(), y(O, {
                key: 0,
                value: "list.cards",
                title: e(g)("panels.nav.cards"),
                "aria-label": e(g)("panels.nav.cards")
              }, {
                default: r(() => [
                  c(F, null, {
                    default: r(() => $[6] || ($[6] = [
                      h("mdi-card-account-details")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : V("", !0),
              e(d)["views.list.kanban"] ? (u(), y(O, {
                key: 1,
                value: "list.kanban",
                title: e(g)("panels.nav.kanban"),
                "aria-label": e(g)("panels.nav.kanban")
              }, {
                default: r(() => [
                  c(F, null, {
                    default: r(() => $[7] || ($[7] = [
                      h("mdi-view-column")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : V("", !0),
              e(a) ? (u(), y(O, {
                key: 2,
                value: "detail.add",
                onClick: $[3] || ($[3] = M((I) => e(s).create(), ["stop"])),
                title: e(g)("panels.nav.add"),
                "aria-label": e(g)("panels.nav.add")
              }, {
                default: r(() => [
                  c(F, null, {
                    default: r(() => $[8] || ($[8] = [
                      h("mdi-plus-box")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : V("", !0),
              e(d)["views.detail.edit"] || e(a) ? (u(), y(O, {
                key: 3,
                value: "detail.edit",
                disabled: !((S = e(s).value) != null && S.id),
                title: e(g)("panels.nav.edit"),
                "aria-label": e(g)("panels.nav.edit")
              }, {
                default: r(() => [
                  c(F, null, {
                    default: r(() => $[9] || ($[9] = [
                      h("mdi-pencil")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"])) : V("", !0),
              b(A.$slots, "nav.views", P(B(E.value)))
            ];
          }),
          _: 3
        }, 8, ["modelValue"])
      ]),
      top: r(() => [
        Ue(c(xe, {
          ref_key: "filters",
          ref: v,
          search: o.search,
          "teleport-to": "#panel-list-actions"
        }, {
          default: r((S) => [
            b(A.$slots, "list.filters", P(B(S)))
          ]),
          _: 3
        }, 8, ["search"]), [
          [Re, e(s).view.startsWith("list.") && e(w)]
        ])
      ]),
      _: 2
    }, [
      e(d)["views.list.table"] ? void 0 : {
        name: "views.list.table",
        fn: r(() => [
          c(Oe, {
            headers: C.value,
            edit: ""
          }, H({ _: 2 }, [
            N(e(n), (S, I) => ({
              name: I,
              fn: r((Y) => [
                b(A.$slots, I, P(B(Y)))
              ])
            }))
          ]), 1032, ["headers"])
        ]),
        key: "0"
      },
      N(e(t), (S, I) => ({
        name: I,
        fn: r(() => [
          b(A.$slots, I, P(B(E.value)))
        ])
      })),
      e(d)["views.detail.edit"] || e(a) ? {
        name: "views.detail.edit",
        fn: r(() => [
          c(Ce, {
            repo: e(s).repo,
            initial: e(s).value,
            name: `${e(s).model.entity}-edit`,
            saved: (S) => e(s).value = S
          }, H({ _: 2 }, [
            N(e(a), (S, I) => ({
              name: S,
              fn: r((Y) => [
                b(A.$slots, I, P(B(Y)))
              ])
            }))
          ]), 1032, ["repo", "initial", "name", "saved"])
        ]),
        key: "1"
      } : void 0
    ]), 1032, ["name", "title", "icon", "state", "index"]));
  }
}), da = /* @__PURE__ */ R({
  __name: "OxPanelNav",
  props: {
    title: {},
    icon: {},
    panel: {},
    href: {},
    auto: { type: Boolean }
  },
  setup(l) {
    const d = l, t = _("panels");
    return D(() => !d.auto || panel.name == d.name), (n, a) => (u(), y(oe, {
      active: e(t).panel == d.name,
      "prepend-icon": d.icon,
      title: d.title,
      onClick: a[0] || (a[0] = M((v) => e(t).show(d), ["stop"]))
    }, null, 8, ["active", "prepend-icon", "title"]));
  }
}), ca = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OxAction: ie,
  OxActionModelDelete: zt,
  OxActions: Yt,
  OxApp: Zt,
  OxComponent: ea,
  OxFieldDetails: ne,
  OxListFilters: xe,
  OxListKanban: la,
  OxListTable: Oe,
  OxLogin: ia,
  OxModelEdit: Ce,
  OxModelPanel: ua,
  OxPanel: he,
  OxPanelNav: da,
  OxStateAlert: ee,
  OxValidationBtn: re
}, Symbol.toStringTag, { value: "Module" })), wa = {
  el: "#app",
  delimiters: ["[[", "]]"],
  components: { ...ca, ...Kt }
};
export {
  wa as App,
  ie as OxAction,
  zt as OxActionModelDelete,
  Yt as OxActions,
  Zt as OxApp,
  ea as OxComponent,
  ne as OxFieldDetails,
  xe as OxListFilters,
  la as OxListKanban,
  Oe as OxListTable,
  ia as OxLogin,
  Ce as OxModelEdit,
  ua as OxModelPanel,
  he as OxPanel,
  da as OxPanelNav,
  ee as OxStateAlert,
  re as OxValidationBtn
};
//# sourceMappingURL=components.js.map
