import { defineComponent as W, inject as L, createElementBlock as S, createCommentVNode as w, unref as e, openBlock as r, Fragment as T, createBlock as y, withModifiers as _, useSlots as z, renderSlot as b, normalizeProps as A, guardReactiveProps as I, ref as j, shallowRef as ae, watch as Q, onMounted as ue, computed as M, onScopeDispose as Me, nextTick as De, watchEffect as Fe, createVNode as c, mergeProps as R, reactive as se, onErrorCaptured as Ee, withCtx as i, createTextVNode as C, toDisplayString as E, createElementVNode as G, createSlots as Z, h as Ne, renderList as F, mergeModels as Ue, useModel as je, toRefs as de, normalizeClass as Re, useTemplateRef as Ve, withKeys as fe, onUnmounted as Ge, Teleport as be, withDirectives as We, vShow as Ke } from "vue";
import { useAction as ze, t as k, useAppContext as Ye, usePanels as qe, defineAsyncComponent as He, tKeys as Je, filterSlots as H, useModelEditor as Qe, useModelPanel as Xe } from "ox";
import { V as x, a as J, u as Ze, b as et, c as tt, d as at, e as lt, f as st, g as nt, m as ot, h as it, i as rt, j as ut, k as dt, l as ct, n as ye, o as pt, p as mt, q as vt, r as ft, s as bt, t as ke, v as yt, w as ne, x as kt, y as gt, z as wt, A as Se, B as U, C as $t, D as oe, E as ce, F as ge, G as Vt, H as Oe, I as St, J as Ot, K as xt, L as xe, M as Ct, N as ht, O as Pt, P as Tt, Q as At, R as te, S as ie, T as Lt, U as Bt, W as It, X as _t, Y as we, Z as Mt, _ as Dt } from "./VAlert-IkYzQSie.js";
import { l as Ce, n as Ft, u as Et, o as Nt, q as Ut, r as jt, s as Rt, t as Gt } from "./theme-9SwWg6i2.js";
import { x as Wt, d as Kt, t as zt, S as Yt, j as qt, r as Ht } from "./auth-Dv_PQqJQ.js";
import { components as Jt } from "ox/vendor";
const pe = /* @__PURE__ */ W({
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
  setup(s, { emit: u }) {
    const t = s, n = u, a = L("context"), { run: f, processing: o, allowed: d } = ze({ user: a.user, emits: n, props: t });
    return (l, v) => e(d) ? (r(), S(T, { key: 0 }, [
      t.button ? (r(), y(x, {
        key: 0,
        variant: "text",
        disabled: e(o),
        color: t.color,
        icon: t.icon,
        title: t.title,
        "aria-label": t.title,
        onClick: _(e(f), ["stop"])
      }, null, 8, ["disabled", "color", "icon", "title", "aria-label", "onClick"])) : (r(), y(J, {
        key: 1,
        title: t.title,
        "base-color": t.color,
        "prepend-icon": t.icon,
        disabled: e(o),
        onClick: _(e(f), ["stop"])
      }, null, 8, ["title", "base-color", "prepend-icon", "disabled", "onClick"]))
    ], 64)) : w("", !0);
  }
}), Qt = /* @__PURE__ */ W({
  __name: "OxActionModelDelete",
  props: {
    item: {},
    button: { type: Boolean }
  },
  setup(s) {
    const u = L("panel"), t = L("repos"), n = s;
    async function a(f, o) {
      return await t[o.constructor.entity].api().delete(o.$url(), { delete: n.item.id });
    }
    return (f, o) => (r(), y(pe, {
      item: n.item,
      button: n.button,
      icon: "mdi-delete",
      color: "error",
      title: e(k)("actions.delete"),
      confirm: e(k)("actions.delete.confirm"),
      permissions: ["delete", (d, l) => l.id],
      run: a,
      onCompleted: o[0] || (o[0] = (d) => {
        var l;
        return (l = e(u)) == null ? void 0 : l.show({ view: e(u).index });
      })
    }, null, 8, ["item", "button", "title", "confirm", "permissions"]));
  }
}), Xt = {
  __name: "OxActions",
  props: {
    // Action's Props
    value: Object,
    dense: { type: Boolean, default: !1 },
    button: { type: Boolean, default: !1 },
    exclude: { type: Array }
  },
  setup(s) {
    z();
    const u = s;
    return (t, n) => (r(), S(T, null, [
      b(t.$slots, "before", A(I(u))),
      b(t.$slots, "default", A(I(u))),
      b(t.$slots, "after", A(I(u)))
    ], 64));
  }
};
function Zt(s) {
  const u = ae(s());
  let t = -1;
  function n() {
    clearInterval(t);
  }
  function a() {
    n(), De(() => u.value = s());
  }
  function f(o) {
    const d = o ? getComputedStyle(o) : {
      transitionDuration: 0.2
    }, l = parseFloat(d.transitionDuration) * 1e3 || 200;
    if (n(), u.value <= 0) return;
    const v = performance.now();
    t = window.setInterval(() => {
      const p = performance.now() - v + l;
      u.value = Math.max(s() - p, 0), u.value <= 0 && n();
    }, l);
  }
  return Me(n), {
    clear: n,
    time: u,
    start: f,
    reset: a
  };
}
const ea = Ft({
  multiLine: Boolean,
  text: String,
  timer: [Boolean, String],
  timeout: {
    type: [Number, String],
    default: 5e3
  },
  vertical: Boolean,
  ...ut({
    location: "bottom"
  }),
  ...rt(),
  ...it(),
  ...ot(),
  ...Gt(),
  ...Rt(dt({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
}, "VSnackbar"), ta = Ce()({
  name: "VSnackbar",
  props: ea(),
  emits: {
    "update:modelValue": (s) => !0
  },
  setup(s, u) {
    let {
      slots: t
    } = u;
    const n = Et(s, "modelValue"), {
      positionClasses: a
    } = Ze(s), {
      scopeId: f
    } = et(), {
      themeClasses: o
    } = Nt(s), {
      colorClasses: d,
      colorStyles: l,
      variantClasses: v
    } = tt(s), {
      roundedClasses: p
    } = at(s), m = Zt(() => Number(s.timeout)), g = j(), $ = j(), h = ae(!1), D = ae(0), Y = j(), K = L(lt, void 0);
    Ut(() => !!K, () => {
      const B = ct();
      Fe(() => {
        Y.value = B.mainStyles.value;
      });
    }), Q(n, V), Q(() => s.timeout, V), ue(() => {
      n.value && V();
    });
    let P = -1;
    function V() {
      m.reset(), window.clearTimeout(P);
      const B = Number(s.timeout);
      if (!n.value || B === -1) return;
      const X = jt($.value);
      m.start(X), P = window.setTimeout(() => {
        n.value = !1;
      }, B);
    }
    function O() {
      m.reset(), window.clearTimeout(P);
    }
    function N() {
      h.value = !0, O();
    }
    function q() {
      h.value = !1, V();
    }
    function Le(B) {
      D.value = B.touches[0].clientY;
    }
    function Be(B) {
      Math.abs(D.value - B.changedTouches[0].clientY) > 50 && (n.value = !1);
    }
    function Ie() {
      h.value && q();
    }
    const _e = M(() => s.location.split(" ").reduce((B, X) => (B[`v-snackbar--${X}`] = !0, B), {}));
    return st(() => {
      const B = ye.filterProps(s), X = !!(t.default || t.text || s.text);
      return c(ye, R({
        ref: g,
        class: ["v-snackbar", {
          "v-snackbar--active": n.value,
          "v-snackbar--multi-line": s.multiLine && !s.vertical,
          "v-snackbar--timer": !!s.timer,
          "v-snackbar--vertical": s.vertical
        }, _e.value, a.value, s.class],
        style: [Y.value, s.style]
      }, B, {
        modelValue: n.value,
        "onUpdate:modelValue": (ee) => n.value = ee,
        contentProps: R({
          class: ["v-snackbar__wrapper", o.value, d.value, p.value, v.value],
          style: [l.value],
          onPointerenter: N,
          onPointerleave: q
        }, B.contentProps),
        persistent: !0,
        noClickAnimation: !0,
        scrim: !1,
        scrollStrategy: "none",
        _disableGlobalStack: !0,
        onTouchstartPassive: Le,
        onTouchend: Be,
        onAfterLeave: Ie
      }, f), {
        default: () => {
          var ee, ve;
          return [pt(!1, "v-snackbar"), s.timer && !h.value && c("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [c(mt, {
            ref: $,
            color: typeof s.timer == "string" ? s.timer : "info",
            max: s.timeout,
            "model-value": m.time.value
          }, null)]), X && c("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((ee = t.text) == null ? void 0 : ee.call(t)) ?? s.text, (ve = t.default) == null ? void 0 : ve.call(t)]), t.actions && c(vt, {
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
    }), nt({}, g);
  }
}), aa = { class: "nav-home" };
var $e;
const la = /* @__PURE__ */ W({
  __name: "OxApp",
  props: {
    apiUrl: {},
    logo: {},
    dataEl: { default: ($e = document.body.dataset) == null ? void 0 : $e.appData },
    models: {},
    data: {}
  },
  setup(s) {
    const u = z(), t = s, n = se({ drawer: !0 }), a = Ye(t), f = qe();
    return ue(() => {
      f.panel = a.data.panel;
    }), Q(() => [a.state.state, a.state.data], () => {
      a.showState = !0;
    }), Ee((o, d, l) => {
      a.state.error(`${o}`);
    }), (o, d) => (r(), y(ft, null, {
      default: i(() => [
        c(ta, {
          modelValue: e(a).showState,
          "onUpdate:modelValue": d[0] || (d[0] = (l) => e(a).showState = l),
          color: e(a).state.color,
          "multi-line": ""
        }, {
          default: i(() => [
            C(E(e(a).state.data), 1)
          ]),
          _: 1
        }, 8, ["modelValue", "color"]),
        c(bt, { color: "primary" }, {
          prepend: i(() => [
            c(ne, {
              icon: "mdi-apps",
              title: e(k)("nav.panels"),
              "aria-label": e(k)("nav.panels"),
              onClick: d[1] || (d[1] = _((l) => n.drawer = !n.drawer, ["stop"]))
            }, null, 8, ["title", "aria-label"]),
            e(u)["app-nav"] && !n.drawer2 ? (r(), y(ne, {
              key: 0,
              icon: "mdi-menu",
              onClick: d[2] || (d[2] = (l) => {
                n.drawer2 = !0, n.drawer = !1;
              })
            })) : w("", !0)
          ]),
          default: i(() => [
            c(ke, { id: "app-bar-sheet-title" }),
            c(ke, { id: "app-bar-title" }, {
              default: i(() => [
                b(o.$slots, "title", { context: e(a) })
              ]),
              _: 3
            }),
            c(yt),
            b(o.$slots, "app-bar-left", { context: e(a) }),
            d[5] || (d[5] = G("div", {
              id: "app-bar-right",
              class: "mr-3"
            }, null, -1)),
            b(o.$slots, "app-bar-right", { context: e(a) })
          ]),
          _: 3
        }),
        c(kt, {
          theme: "dark",
          modelValue: n.drawer,
          "onUpdate:modelValue": d[3] || (d[3] = (l) => n.drawer = l)
        }, Z({
          default: i(() => [
            G("a", aa, [
              o.logo ? (r(), y(gt, {
                key: 0,
                src: o.logo,
                class: "logo"
              }, null, 8, ["src"])) : w("", !0)
            ]),
            b(o.$slots, "nav-start", { context: e(a) }),
            b(o.$slots, "nav-list", { context: e(a) })
          ]),
          _: 2
        }, [
          e(u)["nav-end"] ? {
            name: "append",
            fn: i(() => [
              b(o.$slots, "nav-end", { context: e(a) })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue"]),
        c(wt, null, {
          default: i(() => [
            b(o.$slots, "main", {}, () => [
              c(Se, {
                modelValue: e(f).panel,
                "onUpdate:modelValue": d[4] || (d[4] = (l) => e(f).panel = l)
              }, {
                default: i((l) => [
                  b(o.$slots, "default", R(l, { context: e(a) }))
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
}), sa = {
  props: {
    src: String,
    is: String
  },
  setup(s) {
    const u = ae(null), t = M(() => {
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
      u.value = He(s.src, t.value);
    }
    return Q(() => s.src, n), n(), () => Ne(u.value, s);
  }
}, na = { class: "text-error" }, re = {
  __name: "OxFieldDetails",
  props: {
    state: Object,
    errors: Array
  },
  setup(s) {
    const u = s;
    return (t, n) => u.errors ? (r(!0), S(T, { key: 0 }, F(u.errors, (a) => (r(), S("div", na, [
      c(U, { icon: "mdi-alert-circle-outline" }),
      C(" " + E(a), 1)
    ]))), 256)) : w("", !0);
  }
}, he = {
  __name: "OxListFilters",
  props: {
    search: String
  },
  setup(s, { expose: u }) {
    const t = L("list"), n = s, a = M(() => {
      const d = t.filters;
      return d && Object.entries(d).some(
        ([l, v]) => !l.startsWith("page") && !l.startsWith("ordering") && !!v
      );
    }), f = M(() => a.value ? "mdi-filter-check" : "mdi-filter-outline");
    function o() {
      t.filters = {}, t.load();
    }
    return Q(() => Object.values(t.filters), () => t.load()), u({ icon: f, hasFilters: a, reset: o }), (d, l) => (r(), S("form", {
      onSubmit: l[2] || (l[2] = _((v) => e(t).load(), ["prevent"])),
      class: "width-full"
    }, [
      c($t, {
        dense: "",
        color: "transparent"
      }, {
        default: i(() => [
          c(ne, {
            icon: f.value,
            readonly: ""
          }, null, 8, ["icon"]),
          n.search && e(t).filters ? (r(), y(oe, {
            key: 0,
            label: e(k)("filters.search"),
            density: "compact",
            class: "ml-2",
            modelValue: e(t).filters[n.search],
            "onUpdate:modelValue": l[0] || (l[0] = (v) => e(t).filters[n.search] = v),
            "hide-details": ""
          }, null, 8, ["label", "modelValue"])) : w("", !0),
          b(d.$slots, "default", {
            list: e(t),
            filters: e(t).filters
          }),
          c(x, {
            onClick: l[1] || (l[1] = _((v) => e(t).load(), ["stop"])),
            class: "ml-2",
            icon: "mdi-check",
            "aria-label": d.$t("filters.apply"),
            title: e(k)("filters.apply")
          }, null, 8, ["aria-label", "title"]),
          a.value ? (r(), y(x, {
            key: 1,
            onClick: _(o, ["stop"]),
            icon: "mdi-backspace",
            "aria-label": e(k)("filters.reset"),
            title: e(k)("filters.reset")
          }, null, 8, ["aria-label", "title"])) : w("", !0)
        ]),
        _: 3
      })
    ], 32));
  }
}, oa = { class: "flex-row justify-right" }, ia = /* @__PURE__ */ W({
  __name: "OxFormList",
  props: /* @__PURE__ */ Ue({
    /** Allow to add and edit items */
    editable: { type: Boolean, default: !0 }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(s) {
    var l;
    const u = je(s, "modelValue"), t = j({}), n = s, { editable: a } = de(n), f = j([]);
    (l = u.value) != null && l.length || f.value.push(-1);
    function o() {
      u.value.push(t.value), t.value = {};
    }
    function d(v) {
      confirm(k("actions.delete.confirm")) && n.editable && u.value.splice(v);
    }
    return (v, p) => (r(), y(ce, {
      opened: f.value,
      "onUpdate:opened": p[3] || (p[3] = (m) => f.value = m)
    }, {
      default: i(() => [
        (r(!0), S(T, null, F(u.value, (m, g) => (r(), y(ge, {
          key: g,
          value: g
        }, {
          activator: i(({ props: $ }) => [
            c(J, R({ ref_for: !0 }, $), {
              append: i(() => [
                G("div", {
                  onClick: p[0] || (p[0] = _(() => {
                  }, ["stop"]))
                }, [
                  b(v.$slots, "item.actions", {
                    item: m,
                    index: g,
                    editable: e(a)
                  }),
                  e(a) ? (r(), y(x, {
                    key: 0,
                    type: "button",
                    class: "ml-2",
                    size: "small",
                    onClick: _((h) => d(g), ["stop", "prevent"]),
                    color: "error",
                    "aria-label": e(k)("actions.remove"),
                    title: e(k)("actions.remove"),
                    icon: "mdi-delete"
                  }, null, 8, ["onClick", "aria-label", "title"])) : w("", !0)
                ])
              ]),
              default: i(() => [
                c(Vt, null, {
                  default: i(() => [
                    b(v.$slots, "item.title", { item: m })
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 2
            }, 1040)
          ]),
          default: i(() => [
            b(v.$slots, "item", {
              item: m,
              index: g
            })
          ]),
          _: 2
        }, 1032, ["value"]))), 128)),
        u.value.length ? (r(), y(Oe, { key: 0 })) : w("", !0),
        e(a) ? (r(), y(ge, {
          key: 1,
          value: -1
        }, {
          activator: i(({ props: m }) => [
            c(J, R(m, {
              title: e(k)("actions.add_item"),
              "prepend-icon": "mdi-plus"
            }), null, 16, ["title"])
          ]),
          default: i(() => [
            b(v.$slots, "item", {
              item: t.value,
              edit: !0
            }),
            t.value ? (r(), y(J, { key: 0 }, {
              default: i(() => [
                G("div", oa, [
                  t.value ? (r(), y(x, {
                    key: 0,
                    size: "small",
                    onClick: p[1] || (p[1] = (m) => t.value = {}),
                    color: "secondary",
                    "prepend-icon": "mdi-backspace",
                    "aria-label": e(k)("actions.discard")
                  }, {
                    default: i(() => [
                      C(E(e(k)("actions.discard")), 1)
                    ]),
                    _: 1
                  }, 8, ["aria-label"])) : w("", !0),
                  t.value ? (r(), y(x, {
                    key: 1,
                    size: "small",
                    onClick: p[2] || (p[2] = (m) => o()),
                    color: "primary",
                    "prepend-icon": "mdi-plus",
                    "aria-label": e(k)("actions.add")
                  }, {
                    default: i(() => [
                      C(E(e(k)("actions.add")), 1)
                    ]),
                    _: 1
                  }, 8, ["aria-label"])) : w("", !0)
                ])
              ]),
              _: 1
            })) : w("", !0)
          ]),
          _: 3
        })) : w("", !0)
      ]),
      _: 3
    }, 8, ["opened"]));
  }
}), ra = Ce()({
  name: "VSlideGroupItem",
  props: St(),
  emits: {
    "group:selected": (s) => !0
  },
  setup(s, u) {
    let {
      slots: t
    } = u;
    const n = Ot(s, xt);
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
  setup(s, { emit: u }) {
    const t = u;
    L("list");
    const n = L("items"), a = s;
    function f(l) {
      return l = l % a.colors.length, a.colorVariant ? a.colors[l] + "-" + a.colorVariant : a.colors[l];
    }
    function o(l, v, p) {
      l[p] ? !l[p].includes(v) && l[p].push(v) : l[p] = [v];
    }
    const d = M(() => {
      const l = {};
      if (n.value)
        for (var v of n.value) {
          const m = v[a.field];
          if (Array.isArray(m))
            if (m.length)
              for (var p of m)
                o(l, v, p);
            else
              o(l, v, null);
          else
            o(l, v, m);
        }
      return l;
    });
    return (l, v) => (r(), y(xe, null, {
      default: i(() => [
        c(Ct, null, {
          default: i(() => [
            (r(!0), S(T, null, F(a.headers, (p, m) => (r(), y(ra, {
              key: p.value
            }, {
              default: i(({ selectedClass: g }) => [
                c(ht, {
                  width: "400",
                  class: Re(["ma-3", g]),
                  color: f(m),
                  lines: "two"
                }, {
                  default: i(() => [
                    c(Pt, null, {
                      default: i(() => [
                        C(E(p.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    c(ce, {
                      "bg-color": f(m)
                    }, {
                      default: i(() => [
                        d.value && d.value[p.value] ? (r(!0), S(T, { key: 0 }, F(d.value[p.value], ($) => b(l.$slots, "item", {
                          key: $.id,
                          header: p,
                          item: $
                        }, () => [
                          c(J, {
                            title: $[a.itemTitle],
                            value: a.itemValue && $[a.itemValue],
                            onClick: (h) => t("click", $)
                          }, {
                            append: i(() => [
                              b(l.$slots, "item.action")
                            ]),
                            _: 2
                          }, 1032, ["title", "value", "onClick"])
                        ])), 128)) : w("", !0)
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
}, Pe = /* @__PURE__ */ W({
  __name: "OxListTable",
  props: {
    // list: Object,
    headers: Array,
    edit: Boolean
  },
  setup(s) {
    const u = z(), t = Wt(u, "item.", { exclude: ["item.actions"] }), n = L("panel"), a = L("list"), f = L("items"), o = new Kt(["change"]), d = s, l = M(() => d.headers.reduce((m, g) => (m.push(
      typeof g == "string" ? { key: g, title: k(Je.field(g)) } : g
    ), m), []));
    function v(m) {
      a.filters.page = m.page, a.filters.page_size = m.itemsPerPage, a.filters.ordering = m.sortBy.map(({ key: g, order: $ }) => $ == "asc" ? g : `-${g}`);
    }
    function p(m, g) {
      n.show({ view: "detail.edit", value: g });
    }
    return (m, g) => {
      var $;
      return r(), y(Tt, {
        items: e(f),
        "item-index": "id",
        "items-length": e(a).count || e(f).length,
        loading: ($ = e(a).state) == null ? void 0 : $.isProcessing,
        headers: l.value,
        class: "align-top-table",
        "onUpdate:options": v
      }, Z({
        loading: i(() => [
          c(At, { type: "table-row@10" })
        ]),
        "item.actions": i(({ item: h }) => [
          s.edit ? (r(), y(pe, {
            key: 0,
            icon: "mdi-pencil",
            button: "",
            title: e(k)("actions.edit"),
            permissions: e(o),
            item: h,
            run: p
          }, null, 8, ["title", "permissions", "item"])) : w("", !0),
          b(m.$slots, "item.actions", {
            value: h,
            dense: !0,
            button: !0
          })
        ]),
        _: 2
      }, [
        F(e(t), (h, D) => ({
          name: D,
          fn: i((Y) => [
            b(m.$slots, D, A(I(Y)))
          ])
        }))
      ]), 1032, ["items", "items-length", "loading", "headers"]);
    };
  }
}), le = {
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
    const u = z(), t = s;
    let n = j(!1);
    Q(() => t.state.state, (o) => {
      t.delay && o == zt.PROCESSING && (n.value = !1, window.setTimeout(() => {
        n.value = !0;
      }, 5e3));
    });
    const a = M(() => {
      var o;
      return ((o = t.state) == null ? void 0 : o.isProcessing) && (!t.delay || n.value);
    }), f = M(() => {
      var o, d;
      return (d = (o = t.state) == null ? void 0 : o.data) == null ? void 0 : d.messages;
    });
    return (o, d) => (r(), S(T, null, [
      t.state.isNone && e(u).none ? (r(), y(e(te), {
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
      }, 8, ["state", "title"])) : a.value ? (r(), y(e(te), {
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
            d[0] || (d[0] = C(" Data are being sent to server, please be patient. If this message persist you might wan't to retry. "))
          ])
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isError ? (r(), y(e(te), {
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
            d[1] || (d[1] = C(" Oups... something wrong happened. "))
          ]),
          b(o.$slots, "error-detail", { state: s.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isOk ? (r(), y(e(te), {
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
            d[2] || (d[2] = G("p", null, "Congrats! Data have been updated.", -1))
          ]),
          f.value ? (r(), S(T, { key: 0 }, [
            c(Oe),
            (r(!0), S(T, null, F(f.value, (l) => (r(), S("p", null, E(l), 1))), 256))
          ], 64)) : w("", !0),
          b(o.$slots, "ok-detail", { state: s.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : w("", !0),
      b(o.$slots, "default", {
        state: t.state
      })
    ], 64));
  }
}, da = { class: "text-right" }, me = {
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
  setup(s, { emit: u }) {
    const t = u, n = s;
    return (a, f) => (r(), S("div", da, [
      c(e(x), {
        color: "error",
        class: "me-2",
        "prepend-icon": n.resetIcon,
        onClick: f[0] || (f[0] = (o) => t("reset")),
        disabled: n.disabled
      }, {
        default: i(() => [
          b(a.$slots, "reset", {}, () => [
            C(E(n.resetLabel), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]),
      n.state.isSending ? (r(), y(e(x), {
        key: 0,
        color: "primary",
        "prepend-icon": "mdi-content-save",
        disabled: ""
      }, {
        default: i(() => f[2] || (f[2] = [
          C(" Saving ")
        ])),
        _: 1
      })) : (r(), y(e(x), {
        key: 1,
        color: "primary",
        "prepend-icon": n.validateIcon,
        onClick: f[1] || (f[1] = (o) => t("validate")),
        disabled: n.disabled || n.validateDisabled
      }, {
        default: i(() => [
          b(a.$slots, "validate", {}, () => [
            C(E(n.validateLabel), 1)
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
  setup(s, { emit: u }) {
    const t = Ve("password"), n = s, a = se({
      username: "",
      password: ""
    }), f = j(!1), o = se(new Yt());
    function d(v = !0) {
      Ht(a, { username: "", password: "" }), v && o.none();
    }
    async function l() {
      o.processing();
      try {
        const v = await fetch(n.url, {
          method: "POST",
          headers: qt.axiosConfig.headers,
          body: JSON.stringify(a)
        });
        v.status == 200 ? (a.credentials = "", a.password = "", o.ok(await v.json()), n.next && (window.location.href = n.next)) : o.error(await v.json());
      } catch (v) {
        o.ok((v == null ? void 0 : v.message) || v);
      }
    }
    return (v, p) => (r(), S(T, null, [
      c(e(le), { state: o }, {
        none: i(({ state: m }) => p[7] || (p[7] = [
          G("p", null, "Please enter your credentials in order too proceed...", -1)
        ])),
        "ok-detail": i(({ state: m }) => [
          n.next ? (r(), S("p", ca, [
            p[8] || (p[8] = C("You soon will be redirected to ")),
            G("i", null, E(n.next), 1)
          ])) : w("", !0)
        ]),
        error: i(({ state: m }) => {
          var g, $;
          return [
            c(re, {
              errors: (g = m.data) == null ? void 0 : g.username
            }, null, 8, ["errors"]),
            c(re, {
              errors: ($ = m.data) == null ? void 0 : $.password
            }, null, 8, ["errors"])
          ];
        }),
        _: 1
      }, 8, ["state"]),
      o.isOk ? w("", !0) : (r(), S(T, { key: 0 }, [
        c(oe, {
          variant: "underlined",
          label: "Enter login",
          modelValue: a.username,
          "onUpdate:modelValue": p[0] || (p[0] = (m) => a.username = m),
          onKeyup: p[1] || (p[1] = fe(_((m) => e(t).focus(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue"]),
        c(oe, {
          variant: "underlined",
          ref: "password",
          label: "Enter password",
          modelValue: a.password,
          "onUpdate:modelValue": p[2] || (p[2] = (m) => a.password = m),
          type: f.value ? "text" : "password",
          "append-icon": f.value ? "mdi-eye" : "mdi-eye-off",
          "onClick:append": p[3] || (p[3] = (m) => f.value = !f.value),
          onKeyup: p[4] || (p[4] = fe(_((m) => l(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue", "type", "append-icon"]),
        G("div", pa, [
          b(v.$slots, "default", {
            value: a.password
          }, () => [
            a.username && a.password ? (r(), y(me, {
              key: 0,
              "validate-label": "Login!",
              onValidate: p[5] || (p[5] = (m) => l()),
              onReset: p[6] || (p[6] = (m) => d()),
              state: o
            }, null, 8, ["state"])) : w("", !0)
          ])
        ])
      ], 64))
    ], 64));
  }
}, Te = /* @__PURE__ */ W({
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
    const u = z(), t = s, n = H(u, "views."), a = j(!1);
    ue(() => {
      a.value = !0;
    }), Ge(() => {
      a.value = !1;
    });
    const f = L("panels"), o = L("panel");
    return (d, l) => (r(), y(ie, {
      value: t.name
    }, {
      default: i(() => [
        t.state ? (r(), y(le, {
          key: 0,
          state: t.state,
          delay: ""
        }, null, 8, ["state"])) : w("", !0),
        c(xe, { class: "ma-4" }, {
          default: i(() => [
            (r(), y(be, {
              to: "#app-bar-sheet-title",
              disabled: !a.value || e(f).panel != t.name
            }, [
              t.icon ? (r(), y(U, {
                key: 0,
                icon: t.icon
              }, null, 8, ["icon"])) : w("", !0),
              C(" " + E(t.title), 1)
            ], 8, ["disabled"])),
            (r(), y(be, {
              to: "#app-bar-right",
              disabled: !a.value || e(f).panel != t.name
            }, [
              b(d.$slots, "append-title"),
              t.help ? (r(), y(x, {
                key: 0,
                class: "ml-3",
                href: t.help,
                panels: "new",
                icon: "mdi-information-outline"
              }, null, 8, ["href"])) : w("", !0)
            ], 8, ["disabled"])),
            b(d.$slots, "top"),
            b(d.$slots, "default", {}, () => [
              e(n) ? (r(), y(Lt, {
                key: 0,
                modelValue: e(o).view,
                "onUpdate:modelValue": l[0] || (l[0] = (v) => e(o).view = v)
              }, {
                default: i(() => [
                  (r(!0), S(T, null, F(e(n), (v, p) => (r(), y(Bt, {
                    key: v,
                    value: v
                  }, {
                    default: i(() => [
                      b(d.$slots, p)
                    ]),
                    _: 2
                  }, 1032, ["value"]))), 128))
                ]),
                _: 3
              }, 8, ["modelValue"])) : w("", !0)
            ]),
            b(d.$slots, "bottom")
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["value"]));
  }
}), va = { class: "mb-3" }, Ae = /* @__PURE__ */ W({
  __name: "OxModelEdit",
  props: {
    repo: {},
    empty: {},
    initial: {},
    name: {},
    url: {},
    saved: { type: Function }
  },
  setup(s) {
    const u = s, { editor: t, edited: n } = Qe({ props: u }), a = M(() => t.repo.use), { value: f } = de(t), o = j(null), d = z(), l = H(d, "tab.", { exclude: "tab.default" }), v = H(d, "window.", { exclude: "window.default" }), p = M(() => ({
      value: f.value,
      model: a.value
    }));
    return (m, g) => (r(), S(T, null, [
      c(le, {
        state: e(t).state
      }, null, 8, ["state"]),
      G("div", va, [
        e(n) ? (r(), y(me, {
          key: 0,
          onValidate: g[0] || (g[0] = ($) => e(t).save()),
          onReset: g[1] || (g[1] = ($) => e(t).discard()),
          state: e(t).state,
          "validate-disabled": !e(t).valid
        }, null, 8, ["state", "validate-disabled"])) : w("", !0)
      ]),
      e(l) && Object.keys(e(l)).length ? (r(), S(T, { key: 0 }, [
        c(It, {
          modelValue: o.value,
          "onUpdate:modelValue": g[2] || (g[2] = ($) => o.value = $)
        }, {
          default: i(() => [
            b(m.$slots, "tab.default", A(I(p.value)), () => [
              c(_t, {
                text: e(k)(`models.${a.value.entity}`),
                value: "model"
              }, null, 8, ["text"])
            ]),
            (r(!0), S(T, null, F(e(l), ($, h) => b(m.$slots, h, R({ ref_for: !0 }, p.value))), 256))
          ]),
          _: 3
        }, 8, ["modelValue"]),
        c(Se, {
          modelValue: o.value,
          "onUpdate:modelValue": g[3] || (g[3] = ($) => o.value = $)
        }, {
          default: i(() => [
            c(ie, { value: "model" }, {
              default: i(() => [
                b(m.$slots, "window.default", A(I(p.value)))
              ]),
              _: 3
            }),
            (r(!0), S(T, null, F(e(v), ($, h) => (r(), y(ie, { value: $ }, {
              default: i(() => [
                b(m.$slots, h, R({ ref_for: !0 }, p.value))
              ]),
              _: 2
            }, 1032, ["value"]))), 256))
          ]),
          _: 3
        }, 8, ["modelValue"])
      ], 64)) : b(m.$slots, "window.default", A(R({ key: 1 }, p.value)))
    ], 64));
  }
}), fa = /* @__PURE__ */ W({
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
    const u = z(), t = H(u, "views.list."), n = H(u, "item."), a = H(u, "views.detail.edit."), f = Ve("filters"), o = s, d = L("context"), { panel: l, list: v, items: p, next: m, prev: g } = L("panel") ?? Xe({ props: o }), $ = l.panels, h = M(() => {
      var P;
      return d.user.can([l.model, (P = l.value) != null && P.id ? "change" : "add"]);
    }), { showFilters: D } = de(l), Y = M(() => [
      ...o.headers,
      { key: "actions", title: k("actions") }
    ]), K = M(() => ({
      panel: l,
      panels: $,
      list: v,
      items: p,
      context: d,
      value: l.value
    }));
    return (P, V) => (r(), y(Te, {
      name: o.name,
      title: e(l).title,
      icon: e(l).icon,
      state: e(v).state,
      index: o.index
    }, Z({
      "append-title": i(() => [
        b(P.$slots, "append-title", A(I(K.value))),
        e(l).view.startsWith("list.") ? (r(), y(we, {
          key: 0,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: i(() => [
            b(P.$slots, "nav.list", A(I(K.value))),
            e(f) ? (r(), y(x, {
              key: 0,
              title: e(D) ? e(k)("filters.hide") : e(k)("filters.show"),
              "aria-label": e(D) ? e(k)("filters.hide") : e(k)("filters.show"),
              onClick: V[0] || (V[0] = (O) => D.value = !e(D)),
              active: e(D)
            }, {
              default: i(() => [
                c(U, {
                  icon: e(f).icon
                }, null, 8, ["icon"])
              ]),
              _: 1
            }, 8, ["title", "aria-label", "active"])) : w("", !0)
          ]),
          _: 3
        })) : e(l).view.startsWith("detail.") && e(l).value ? (r(), y(we, {
          key: 1,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: i(() => [
            b(P.$slots, "nav.detail", A(I(K.value))),
            e(l).view == "detail.edit" && e(l).value ? (r(), y(Mt, { key: 0 }, {
              activator: i(({ props: O }) => [
                c(x, R({ "prepend-icon": "mdi-dots-vertical" }, O), {
                  default: i(() => [
                    C(E(e(k)("actions")), 1)
                  ]),
                  _: 2
                }, 1040)
              ]),
              default: i(() => [
                c(ce, null, {
                  default: i(() => [
                    b(P.$slots, "item.actions", {
                      value: e(l).value
                    })
                  ]),
                  _: 3
                })
              ]),
              _: 3
            })) : w("", !0),
            c(x, {
              disabled: !e(g),
              title: e(k)("prev"),
              "aria-label": e(k)("prev"),
              onClick: V[1] || (V[1] = _((O) => e(l).show({ value: e(g) }), ["stop"]))
            }, {
              default: i(() => [
                c(U, { icon: "mdi-chevron-left" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"]),
            c(x, {
              disabled: !e(m),
              title: e(k)("next"),
              "aria-label": e(k)("next"),
              onClick: V[2] || (V[2] = _((O) => e(l).show({ value: e(m) }), ["stop"]))
            }, {
              default: i(() => [
                c(U, { icon: "mdi-chevron-right" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"])
          ]),
          _: 3
        })) : w("", !0),
        c(Dt, {
          class: "ml-3",
          color: "secondary",
          modelValue: e(l).view,
          "onUpdate:modelValue": V[4] || (V[4] = (O) => e(l).view = O),
          density: "compact",
          variant: "tonal",
          mandatory: ""
        }, {
          default: i(() => {
            var O;
            return [
              c(x, {
                value: "list.table",
                title: e(k)("panels.nav.table"),
                "aria-label": e(k)("panels.nav.table")
              }, {
                default: i(() => [
                  c(U, null, {
                    default: i(() => V[5] || (V[5] = [
                      C("mdi-table")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"]),
              e(u)["views.list.cards"] ? (r(), y(x, {
                key: 0,
                value: "list.cards",
                title: e(k)("panels.nav.cards"),
                "aria-label": e(k)("panels.nav.cards")
              }, {
                default: i(() => [
                  c(U, null, {
                    default: i(() => V[6] || (V[6] = [
                      C("mdi-card-account-details")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : w("", !0),
              e(u)["views.list.kanban"] ? (r(), y(x, {
                key: 1,
                value: "list.kanban",
                title: e(k)("panels.nav.kanban"),
                "aria-label": e(k)("panels.nav.kanban")
              }, {
                default: i(() => [
                  c(U, null, {
                    default: i(() => V[7] || (V[7] = [
                      C("mdi-view-column")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : w("", !0),
              e(a) ? (r(), y(x, {
                key: 2,
                value: "detail.add",
                onClick: V[3] || (V[3] = _((N) => e(l).create(), ["stop"])),
                title: e(k)("panels.nav.add"),
                "aria-label": e(k)("panels.nav.add")
              }, {
                default: i(() => [
                  c(U, null, {
                    default: i(() => V[8] || (V[8] = [
                      C("mdi-plus-box")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : w("", !0),
              e(u)["views.detail.edit"] || e(a) ? (r(), y(x, {
                key: 3,
                value: "detail.edit",
                disabled: !((O = e(l).value) != null && O.id),
                title: e(k)("panels.nav.edit"),
                "aria-label": e(k)("panels.nav.edit")
              }, {
                default: i(() => [
                  c(U, null, {
                    default: i(() => V[9] || (V[9] = [
                      C("mdi-pencil")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"])) : w("", !0),
              b(P.$slots, "nav.views", A(I(K.value)))
            ];
          }),
          _: 3
        }, 8, ["modelValue"])
      ]),
      top: i(() => [
        We(c(he, {
          ref_key: "filters",
          ref: f,
          search: o.search,
          "teleport-to": "#panel-list-actions"
        }, {
          default: i((O) => [
            b(P.$slots, "list.filters", A(I(O)))
          ]),
          _: 3
        }, 8, ["search"]), [
          [Ke, e(l).view.startsWith("list.") && e(D)]
        ])
      ]),
      _: 2
    }, [
      e(u)["views.list.table"] ? void 0 : {
        name: "views.list.table",
        fn: i(() => [
          c(Pe, {
            headers: Y.value,
            edit: ""
          }, Z({ _: 2 }, [
            F(e(n), (O, N) => ({
              name: N,
              fn: i((q) => [
                b(P.$slots, N, A(I(q)))
              ])
            }))
          ]), 1032, ["headers"])
        ]),
        key: "0"
      },
      F(e(t), (O, N) => ({
        name: N,
        fn: i(() => [
          b(P.$slots, N, A(I(K.value)))
        ])
      })),
      (e(u)["views.detail.edit"] || e(a)) && h.value ? {
        name: "views.detail.edit",
        fn: i(() => [
          c(Ae, {
            repo: e(l).repo,
            initial: e(l).value,
            name: `${e(l).model.entity}-edit`,
            saved: (O) => e(l).value = O
          }, Z({ _: 2 }, [
            F(e(a), (O, N) => ({
              name: O,
              fn: i((q) => [
                b(P.$slots, N, A(I(q)))
              ])
            }))
          ]), 1032, ["repo", "initial", "name", "saved"])
        ]),
        key: "1"
      } : void 0
    ]), 1032, ["name", "title", "icon", "state", "index"]));
  }
}), ba = /* @__PURE__ */ W({
  __name: "OxPanelNav",
  props: {
    title: {},
    icon: {},
    panel: {},
    href: {},
    auto: { type: Boolean }
  },
  setup(s) {
    const u = s, t = L("panels");
    return M(() => !u.auto || panel.name == u.name), (n, a) => (r(), y(J, {
      active: e(t).panel == u.panel,
      "prepend-icon": u.icon,
      title: u.title,
      onClick: a[0] || (a[0] = _((f) => e(t).show(u), ["stop"]))
    }, null, 8, ["active", "prepend-icon", "title"]));
  }
}), ya = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OxAction: pe,
  OxActionModelDelete: Qt,
  OxActions: Xt,
  OxApp: la,
  OxComponent: sa,
  OxFieldDetails: re,
  OxFormList: ia,
  OxListFilters: he,
  OxListKanban: ua,
  OxListTable: Pe,
  OxLogin: ma,
  OxModelEdit: Ae,
  OxModelPanel: fa,
  OxPanel: Te,
  OxPanelNav: ba,
  OxStateAlert: le,
  OxValidationBtn: me
}, Symbol.toStringTag, { value: "Module" })), Oa = {
  el: "#app",
  delimiters: ["[[", "]]"],
  components: { ...ya, ...Jt }
};
export {
  Oa as App,
  pe as OxAction,
  Qt as OxActionModelDelete,
  Xt as OxActions,
  la as OxApp,
  sa as OxComponent,
  re as OxFieldDetails,
  ia as OxFormList,
  he as OxListFilters,
  ua as OxListKanban,
  Pe as OxListTable,
  ma as OxLogin,
  Ae as OxModelEdit,
  fa as OxModelPanel,
  Te as OxPanel,
  ba as OxPanelNav,
  le as OxStateAlert,
  me as OxValidationBtn
};
//# sourceMappingURL=components.js.map
