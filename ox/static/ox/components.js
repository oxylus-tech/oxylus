import { defineComponent as j, inject as T, createElementBlock as $, createCommentVNode as g, unref as e, openBlock as r, Fragment as P, createBlock as y, withModifiers as L, useSlots as K, renderSlot as b, normalizeProps as F, guardReactiveProps as E, ref as G, shallowRef as te, watch as H, onMounted as de, computed as _, onScopeDispose as De, nextTick as Fe, watchEffect as Ee, createVNode as c, mergeProps as J, reactive as ne, onErrorCaptured as Ne, withCtx as i, createTextVNode as h, toDisplayString as N, createElementVNode as W, createSlots as X, h as Ue, renderList as M, mergeModels as je, useModel as Re, toRefs as ce, normalizeClass as Ge, useTemplateRef as Oe, withKeys as be, onUnmounted as We, Teleport as ye, withDirectives as Ke, vShow as ze } from "vue";
import { useAction as Ye, t as k, useAppContext as qe, usePanels as He, defineAsyncComponent as Je, tKeys as Qe, filterSlots as Y, useModelEditor as Xe, useModelPanel as Ze } from "ox";
import { V as x, a as q, u as et, b as tt, c as at, d as lt, e as st, f as nt, g as ot, m as it, h as rt, i as ut, j as dt, k as ct, l as pt, n as ke, o as mt, p as vt, q as ft, r as bt, s as yt, t as ge, v as kt, w as oe, x as gt, y as wt, z as Vt, A as xe, B as U, C as $t, D as ie, E as pe, F as we, G as St, H as he, I as Ot, J as xt, K as ht, L as Ce, M as Ct, N as Pt, O as Tt, P as At, Q as Lt, R as ee, S as re, T as _t, U as Bt, W as It, X as Ve, Y as Mt, Z as $e, _ as Dt, $ as Ft } from "./VAlert-Lr6GntXp.js";
import { l as Pe, n as Et, u as Nt, o as Ut, q as jt, r as Rt, s as Gt, t as Wt } from "./theme-BRckZ9DD.js";
import { x as Kt, d as zt, t as Yt, S as qt, j as Ht, r as Jt } from "./auth-Caqqy9CD.js";
import { components as Qt } from "ox/vendor";
const me = /* @__PURE__ */ j({
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
  setup(n, { emit: u }) {
    const t = n, s = u, a = T("context"), { run: m, processing: o, allowed: d } = Ye({ user: a.user, emits: s, props: t });
    return (l, p) => e(d) ? (r(), $(P, { key: 0 }, [
      t.button ? (r(), y(x, {
        key: 0,
        variant: "text",
        disabled: e(o),
        color: t.color,
        icon: t.icon,
        title: t.title,
        "aria-label": t.title,
        onClick: L(e(m), ["stop"])
      }, null, 8, ["disabled", "color", "icon", "title", "aria-label", "onClick"])) : (r(), y(q, {
        key: 1,
        title: t.title,
        "base-color": t.color,
        "prepend-icon": t.icon,
        disabled: e(o),
        onClick: L(e(m), ["stop"])
      }, null, 8, ["title", "base-color", "prepend-icon", "disabled", "onClick"]))
    ], 64)) : g("", !0);
  }
}), Xt = /* @__PURE__ */ j({
  __name: "OxActionModelDelete",
  props: {
    item: {},
    button: { type: Boolean }
  },
  setup(n) {
    const u = T("panel"), t = T("repos"), s = n;
    async function a(m, o) {
      return await t[o.constructor.entity].api().delete(o.$url(), { delete: s.item.id });
    }
    return (m, o) => (r(), y(me, {
      item: s.item,
      button: s.button,
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
}), Zt = {
  __name: "OxActions",
  props: {
    // Action's Props
    value: Object,
    dense: { type: Boolean, default: !1 },
    button: { type: Boolean, default: !1 },
    exclude: { type: Array }
  },
  setup(n) {
    K();
    const u = n;
    return (t, s) => (r(), $(P, null, [
      b(t.$slots, "before", F(E(u))),
      b(t.$slots, "default", F(E(u))),
      b(t.$slots, "after", F(E(u)))
    ], 64));
  }
};
function ea(n) {
  const u = te(n());
  let t = -1;
  function s() {
    clearInterval(t);
  }
  function a() {
    s(), Fe(() => u.value = n());
  }
  function m(o) {
    const d = o ? getComputedStyle(o) : {
      transitionDuration: 0.2
    }, l = parseFloat(d.transitionDuration) * 1e3 || 200;
    if (s(), u.value <= 0) return;
    const p = performance.now();
    t = window.setInterval(() => {
      const v = performance.now() - p + l;
      u.value = Math.max(n() - v, 0), u.value <= 0 && s();
    }, l);
  }
  return De(s), {
    clear: s,
    time: u,
    start: m,
    reset: a
  };
}
const ta = Et({
  multiLine: Boolean,
  text: String,
  timer: [Boolean, String],
  timeout: {
    type: [Number, String],
    default: 5e3
  },
  vertical: Boolean,
  ...dt({
    location: "bottom"
  }),
  ...ut(),
  ...rt(),
  ...it(),
  ...Wt(),
  ...Gt(ct({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
}, "VSnackbar"), aa = Pe()({
  name: "VSnackbar",
  props: ta(),
  emits: {
    "update:modelValue": (n) => !0
  },
  setup(n, u) {
    let {
      slots: t
    } = u;
    const s = Nt(n, "modelValue"), {
      positionClasses: a
    } = et(n), {
      scopeId: m
    } = tt(), {
      themeClasses: o
    } = Ut(n), {
      colorClasses: d,
      colorStyles: l,
      variantClasses: p
    } = at(n), {
      roundedClasses: v
    } = lt(n), f = ea(() => Number(n.timeout)), w = G(), S = G(), B = te(!1), I = te(0), z = G(), le = T(st, void 0);
    jt(() => !!le, () => {
      const A = pt();
      Ee(() => {
        z.value = A.mainStyles.value;
      });
    }), H(s, O), H(() => n.timeout, O), de(() => {
      s.value && O();
    });
    let R = -1;
    function O() {
      f.reset(), window.clearTimeout(R);
      const A = Number(n.timeout);
      if (!s.value || A === -1) return;
      const Q = Rt(S.value);
      f.start(Q), R = window.setTimeout(() => {
        s.value = !1;
      }, A);
    }
    function V() {
      f.reset(), window.clearTimeout(R);
    }
    function C() {
      B.value = !0, V();
    }
    function D() {
      B.value = !1, O();
    }
    function se(A) {
      I.value = A.touches[0].clientY;
    }
    function Be(A) {
      Math.abs(I.value - A.changedTouches[0].clientY) > 50 && (s.value = !1);
    }
    function Ie() {
      B.value && D();
    }
    const Me = _(() => n.location.split(" ").reduce((A, Q) => (A[`v-snackbar--${Q}`] = !0, A), {}));
    return nt(() => {
      const A = ke.filterProps(n), Q = !!(t.default || t.text || n.text);
      return c(ke, J({
        ref: w,
        class: ["v-snackbar", {
          "v-snackbar--active": s.value,
          "v-snackbar--multi-line": n.multiLine && !n.vertical,
          "v-snackbar--timer": !!n.timer,
          "v-snackbar--vertical": n.vertical
        }, Me.value, a.value, n.class],
        style: [z.value, n.style]
      }, A, {
        modelValue: s.value,
        "onUpdate:modelValue": (Z) => s.value = Z,
        contentProps: J({
          class: ["v-snackbar__wrapper", o.value, d.value, v.value, p.value],
          style: [l.value],
          onPointerenter: C,
          onPointerleave: D
        }, A.contentProps),
        persistent: !0,
        noClickAnimation: !0,
        scrim: !1,
        scrollStrategy: "none",
        _disableGlobalStack: !0,
        onTouchstartPassive: se,
        onTouchend: Be,
        onAfterLeave: Ie
      }, m), {
        default: () => {
          var Z, fe;
          return [mt(!1, "v-snackbar"), n.timer && !B.value && c("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [c(vt, {
            ref: S,
            color: typeof n.timer == "string" ? n.timer : "info",
            max: n.timeout,
            "model-value": f.time.value
          }, null)]), Q && c("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((Z = t.text) == null ? void 0 : Z.call(t)) ?? n.text, (fe = t.default) == null ? void 0 : fe.call(t)]), t.actions && c(ft, {
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
              isActive: s
            })])]
          })];
        },
        activator: t.activator
      });
    }), ot({}, w);
  }
}), la = { class: "nav-home" };
var Se;
const sa = /* @__PURE__ */ j({
  __name: "OxApp",
  props: {
    apiUrl: {},
    logo: {},
    dataEl: { default: (Se = document.body.dataset) == null ? void 0 : Se.appData },
    models: {},
    data: {}
  },
  setup(n) {
    const u = K(), t = n, s = ne({ drawer: !0 }), a = qe(t), m = He();
    return de(() => {
      m.panel = a.data.panel;
    }), H(() => [a.state.state, a.state.data], () => {
      a.showState = !0;
    }), Ne((o, d, l) => {
      a.state.error(`${o}`);
    }), (o, d) => (r(), y(bt, null, {
      default: i(() => [
        c(aa, {
          modelValue: e(a).showState,
          "onUpdate:modelValue": d[0] || (d[0] = (l) => e(a).showState = l),
          color: e(a).state.color,
          "multi-line": ""
        }, {
          default: i(() => [
            h(N(e(a).state.data), 1)
          ]),
          _: 1
        }, 8, ["modelValue", "color"]),
        c(yt, { color: "primary" }, {
          prepend: i(() => [
            c(oe, {
              icon: "mdi-apps",
              title: e(k)("nav.panels"),
              "aria-label": e(k)("nav.panels"),
              onClick: d[1] || (d[1] = L((l) => s.drawer = !s.drawer, ["stop"]))
            }, null, 8, ["title", "aria-label"]),
            e(u)["app-nav"] && !s.drawer2 ? (r(), y(oe, {
              key: 0,
              icon: "mdi-menu",
              onClick: d[2] || (d[2] = (l) => {
                s.drawer2 = !0, s.drawer = !1;
              })
            })) : g("", !0)
          ]),
          default: i(() => [
            c(ge, { id: "app-bar-sheet-title" }),
            c(ge, { id: "app-bar-title" }, {
              default: i(() => [
                b(o.$slots, "title", { context: e(a) })
              ]),
              _: 3
            }),
            c(kt),
            b(o.$slots, "app-bar-left", { context: e(a) }),
            d[5] || (d[5] = W("div", {
              id: "app-bar-right",
              class: "mr-3"
            }, null, -1)),
            b(o.$slots, "app-bar-right", { context: e(a) })
          ]),
          _: 3
        }),
        c(gt, {
          theme: "dark",
          modelValue: s.drawer,
          "onUpdate:modelValue": d[3] || (d[3] = (l) => s.drawer = l)
        }, X({
          default: i(() => [
            W("a", la, [
              o.logo ? (r(), y(wt, {
                key: 0,
                src: o.logo,
                class: "logo"
              }, null, 8, ["src"])) : g("", !0)
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
        c(Vt, null, {
          default: i(() => [
            b(o.$slots, "main", {}, () => [
              c(xe, {
                modelValue: e(m).panel,
                "onUpdate:modelValue": d[4] || (d[4] = (l) => e(m).panel = l)
              }, {
                default: i((l) => [
                  b(o.$slots, "default", J(l, { context: e(a) }))
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
  setup(n) {
    const u = te(null), t = _(() => {
      if (n.is)
        return n.is;
      let a = n.src.substring(n.src.lastIndexOf("/") + 1);
      if (a && (a = a.substring(0, a.indexOf("."))), !a)
        throw Error(
          "`is` not provided and could not be deducted from `src`."
        );
      return a;
    });
    function s() {
      u.value = Je(n.src, t.value);
    }
    return H(() => n.src, s), s(), () => Ue(u.value, n);
  }
}, oa = { class: "text-error" }, ue = {
  __name: "OxFieldDetails",
  props: {
    state: Object,
    errors: Array
  },
  setup(n) {
    const u = n;
    return (t, s) => u.errors ? (r(!0), $(P, { key: 0 }, M(u.errors, (a) => (r(), $("div", oa, [
      c(U, { icon: "mdi-alert-circle-outline" }),
      h(" " + N(a), 1)
    ]))), 256)) : g("", !0);
  }
}, Te = {
  __name: "OxListFilters",
  props: {
    search: String
  },
  setup(n, { expose: u }) {
    const t = T("list"), s = n, a = _(() => {
      const d = t.filters;
      return d && Object.entries(d).some(
        ([l, p]) => !l.startsWith("page") && !l.startsWith("ordering") && !!p
      );
    }), m = _(() => a.value ? "mdi-filter-check" : "mdi-filter-outline");
    function o() {
      t.filters = {}, t.load();
    }
    return H(() => Object.values(t.filters), () => t.load()), u({ icon: m, hasFilters: a, reset: o }), (d, l) => (r(), $("form", {
      onSubmit: l[2] || (l[2] = L((p) => e(t).load(), ["prevent"])),
      class: "width-full"
    }, [
      c($t, {
        dense: "",
        color: "transparent"
      }, {
        default: i(() => [
          c(oe, {
            icon: m.value,
            readonly: ""
          }, null, 8, ["icon"]),
          s.search && e(t).filters ? (r(), y(ie, {
            key: 0,
            label: e(k)("filters.search"),
            density: "compact",
            class: "ml-2",
            modelValue: e(t).filters[s.search],
            "onUpdate:modelValue": l[0] || (l[0] = (p) => e(t).filters[s.search] = p),
            "hide-details": ""
          }, null, 8, ["label", "modelValue"])) : g("", !0),
          b(d.$slots, "default", {
            list: e(t),
            filters: e(t).filters
          }),
          c(x, {
            onClick: l[1] || (l[1] = L((p) => e(t).load(), ["stop"])),
            class: "ml-2",
            icon: "mdi-check",
            "aria-label": d.$t("filters.apply"),
            title: e(k)("filters.apply")
          }, null, 8, ["aria-label", "title"]),
          a.value ? (r(), y(x, {
            key: 1,
            onClick: L(o, ["stop"]),
            icon: "mdi-backspace",
            "aria-label": e(k)("filters.reset"),
            title: e(k)("filters.reset")
          }, null, 8, ["aria-label", "title"])) : g("", !0)
        ]),
        _: 3
      })
    ], 32));
  }
}, ia = { class: "flex-row justify-right" }, ra = /* @__PURE__ */ j({
  __name: "OxFormList",
  props: /* @__PURE__ */ je({
    /** Allow to add and edit items */
    editable: { type: Boolean, default: !0 }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(n) {
    var l;
    const u = Re(n, "modelValue"), t = G({}), s = n, { editable: a } = ce(s), m = G([]);
    (l = u.value) != null && l.length || m.value.push(-1);
    function o() {
      u.value.push(t.value), t.value = {};
    }
    function d(p) {
      confirm(k("actions.delete.confirm")) && s.editable && u.value.splice(p);
    }
    return (p, v) => (r(), y(pe, {
      opened: m.value,
      "onUpdate:opened": v[3] || (v[3] = (f) => m.value = f)
    }, {
      default: i(() => [
        (r(!0), $(P, null, M(u.value, (f, w) => (r(), y(we, {
          key: w,
          value: w
        }, {
          activator: i(({ props: S }) => [
            c(q, J({ ref_for: !0 }, S), {
              append: i(() => [
                W("div", {
                  onClick: v[0] || (v[0] = L(() => {
                  }, ["stop"]))
                }, [
                  b(p.$slots, "item.actions", {
                    item: f,
                    index: w,
                    editable: e(a)
                  }),
                  e(a) ? (r(), y(x, {
                    key: 0,
                    type: "button",
                    class: "ml-2",
                    size: "small",
                    onClick: L((B) => d(w), ["stop", "prevent"]),
                    color: "error",
                    "aria-label": e(k)("actions.remove"),
                    title: e(k)("actions.remove"),
                    icon: "mdi-delete"
                  }, null, 8, ["onClick", "aria-label", "title"])) : g("", !0)
                ])
              ]),
              default: i(() => [
                c(St, null, {
                  default: i(() => [
                    b(p.$slots, "item.title", { item: f })
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 2
            }, 1040)
          ]),
          default: i(() => [
            b(p.$slots, "item", {
              item: f,
              index: w
            })
          ]),
          _: 2
        }, 1032, ["value"]))), 128)),
        u.value.length ? (r(), y(he, { key: 0 })) : g("", !0),
        e(a) ? (r(), y(we, {
          key: 1,
          value: -1
        }, {
          activator: i(({ props: f }) => [
            c(q, J(f, {
              title: e(k)("actions.add_item"),
              "prepend-icon": "mdi-plus"
            }), null, 16, ["title"])
          ]),
          default: i(() => [
            b(p.$slots, "item", {
              item: t.value,
              edit: !0
            }),
            t.value ? (r(), y(q, { key: 0 }, {
              default: i(() => [
                W("div", ia, [
                  t.value ? (r(), y(x, {
                    key: 0,
                    size: "small",
                    onClick: v[1] || (v[1] = (f) => t.value = {}),
                    color: "secondary",
                    "prepend-icon": "mdi-backspace",
                    "aria-label": e(k)("actions.discard")
                  }, {
                    default: i(() => [
                      h(N(e(k)("actions.discard")), 1)
                    ]),
                    _: 1
                  }, 8, ["aria-label"])) : g("", !0),
                  t.value ? (r(), y(x, {
                    key: 1,
                    size: "small",
                    onClick: v[2] || (v[2] = (f) => o()),
                    color: "primary",
                    "prepend-icon": "mdi-plus",
                    "aria-label": e(k)("actions.add")
                  }, {
                    default: i(() => [
                      h(N(e(k)("actions.add")), 1)
                    ]),
                    _: 1
                  }, 8, ["aria-label"])) : g("", !0)
                ])
              ]),
              _: 1
            })) : g("", !0)
          ]),
          _: 3
        })) : g("", !0)
      ]),
      _: 3
    }, 8, ["opened"]));
  }
}), ua = Pe()({
  name: "VSlideGroupItem",
  props: Ot(),
  emits: {
    "group:selected": (n) => !0
  },
  setup(n, u) {
    let {
      slots: t
    } = u;
    const s = xt(n, ht);
    return () => {
      var a;
      return (a = t.default) == null ? void 0 : a.call(t, {
        isSelected: s.isSelected.value,
        select: s.select,
        toggle: s.toggle,
        selectedClass: s.selectedClass.value
      });
    };
  }
}), da = {
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
  setup(n, { emit: u }) {
    const t = u;
    T("list");
    const s = T("items"), a = n;
    function m(l) {
      return l = l % a.colors.length, a.colorVariant ? a.colors[l] + "-" + a.colorVariant : a.colors[l];
    }
    function o(l, p, v) {
      l[v] ? !l[v].includes(p) && l[v].push(p) : l[v] = [p];
    }
    const d = _(() => {
      const l = {};
      if (s.value)
        for (var p of s.value) {
          const f = p[a.field];
          if (Array.isArray(f))
            if (f.length)
              for (var v of f)
                o(l, p, v);
            else
              o(l, p, null);
          else
            o(l, p, f);
        }
      return l;
    });
    return (l, p) => (r(), y(Ce, null, {
      default: i(() => [
        c(Ct, null, {
          default: i(() => [
            (r(!0), $(P, null, M(a.headers, (v, f) => (r(), y(ua, {
              key: v.value
            }, {
              default: i(({ selectedClass: w }) => [
                c(Pt, {
                  width: "400",
                  class: Ge(["ma-3", w]),
                  color: m(f),
                  lines: "two"
                }, {
                  default: i(() => [
                    c(Tt, null, {
                      default: i(() => [
                        h(N(v.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    c(pe, {
                      "bg-color": m(f)
                    }, {
                      default: i(() => [
                        d.value && d.value[v.value] ? (r(!0), $(P, { key: 0 }, M(d.value[v.value], (S) => b(l.$slots, "item", {
                          key: S.id,
                          header: v,
                          item: S
                        }, () => [
                          c(q, {
                            title: S[a.itemTitle],
                            value: a.itemValue && S[a.itemValue],
                            onClick: (B) => t("click", S)
                          }, {
                            append: i(() => [
                              b(l.$slots, "item.action")
                            ]),
                            _: 2
                          }, 1032, ["title", "value", "onClick"])
                        ])), 128)) : g("", !0)
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
}, Ae = /* @__PURE__ */ j({
  __name: "OxListTable",
  props: {
    // list: Object,
    headers: Array,
    edit: Boolean
  },
  setup(n) {
    const u = K(), t = Kt(u, "item.", { exclude: ["item.actions"] }), s = T("panel"), a = T("list"), m = T("items"), o = new zt(["change"]), d = n, l = _(() => d.headers.reduce((f, w) => (f.push(
      typeof w == "string" ? { key: w, title: k(Qe.field(w)) } : w
    ), f), []));
    function p(f) {
      a.filters.page = f.page, a.filters.page_size = f.itemsPerPage, a.filters.ordering = f.sortBy.map(({ key: w, order: S }) => S == "asc" ? w : `-${w}`);
    }
    function v(f, w) {
      s.show({ view: "detail.edit", value: w });
    }
    return (f, w) => {
      var S;
      return r(), y(At, {
        items: e(m),
        "item-index": "id",
        "items-length": e(a).count || e(m).length,
        loading: (S = e(a).state) == null ? void 0 : S.isProcessing,
        headers: l.value,
        class: "align-top-table",
        "onUpdate:options": p
      }, X({
        loading: i(() => [
          c(Lt, { type: "table-row@10" })
        ]),
        "item.actions": i(({ item: B }) => [
          n.edit ? (r(), y(me, {
            key: 0,
            icon: "mdi-pencil",
            button: "",
            title: e(k)("actions.edit"),
            permissions: e(o),
            item: B,
            run: v
          }, null, 8, ["title", "permissions", "item"])) : g("", !0),
          b(f.$slots, "item.actions", {
            value: B,
            dense: !0,
            button: !0
          })
        ]),
        _: 2
      }, [
        M(e(t), (B, I) => ({
          name: I,
          fn: i((z) => [
            b(f.$slots, I, F(E(z)))
          ])
        }))
      ]), 1032, ["items", "items-length", "loading", "headers"]);
    };
  }
}), ae = {
  __name: "OxStateAlert",
  props: {
    state: Object,
    delay: { type: Boolean, default: !1 },
    okTitle: { type: String, default: "" },
    noneTitle: { type: String, default: "" },
    errorTitle: { type: String, default: "Oups..." },
    processingTitle: { type: String, default: "Processing..." }
  },
  setup(n) {
    const u = K(), t = n;
    let s = G(!1);
    H(() => t.state.state, (o) => {
      t.delay && o == Yt.PROCESSING && (s.value = !1, window.setTimeout(() => {
        s.value = !0;
      }, 5e3));
    });
    const a = _(() => {
      var o;
      return ((o = t.state) == null ? void 0 : o.isProcessing) && (!t.delay || s.value);
    }), m = _(() => {
      var o, d;
      return (d = (o = t.state) == null ? void 0 : o.data) == null ? void 0 : d.messages;
    });
    return (o, d) => (r(), $(P, null, [
      t.state.isNone && e(u).none ? (r(), y(e(ee), {
        key: 0,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        state: n.state,
        title: n.noneTitle
      }, {
        default: i(() => [
          b(o.$slots, "none", { state: n.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : a.value ? (r(), y(e(ee), {
        key: 1,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: n.state,
        title: n.processingTitle
      }, {
        default: i(() => [
          b(o.$slots, "processing", { state: n.state }, () => [
            d[0] || (d[0] = h(" Data are being sent to server, please be patient. If this message persist you might wan't to retry. "))
          ])
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isError ? (r(), y(e(ee), {
        key: 2,
        type: "error",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: n.state,
        title: n.errorTitle
      }, {
        default: i(() => [
          b(o.$slots, "error", { state: n.state }, () => [
            d[1] || (d[1] = h(" Oups... something wrong happened. "))
          ]),
          b(o.$slots, "error-detail", { state: n.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isOk ? (r(), y(e(ee), {
        key: 3,
        type: "success",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: n.state,
        title: n.okTitle
      }, {
        default: i(() => [
          b(o.$slots, "ok", { state: n.state }, () => [
            d[2] || (d[2] = W("p", null, "Congrats! Data have been updated.", -1))
          ]),
          m.value ? (r(), $(P, { key: 0 }, [
            c(he),
            (r(!0), $(P, null, M(m.value, (l) => (r(), $("p", null, N(l), 1))), 256))
          ], 64)) : g("", !0),
          b(o.$slots, "ok-detail", { state: n.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : g("", !0),
      b(o.$slots, "default", {
        state: t.state
      })
    ], 64));
  }
}, ca = { class: "text-right" }, ve = {
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
  setup(n, { emit: u }) {
    const t = u, s = n;
    return (a, m) => (r(), $("div", ca, [
      c(e(x), {
        color: "error",
        class: "me-2",
        "prepend-icon": s.resetIcon,
        onClick: m[0] || (m[0] = (o) => t("reset")),
        disabled: s.disabled
      }, {
        default: i(() => [
          b(a.$slots, "reset", {}, () => [
            h(N(s.resetLabel), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]),
      s.state.isSending ? (r(), y(e(x), {
        key: 0,
        color: "primary",
        "prepend-icon": "mdi-content-save",
        disabled: ""
      }, {
        default: i(() => m[2] || (m[2] = [
          h(" Saving ")
        ])),
        _: 1
      })) : (r(), y(e(x), {
        key: 1,
        color: "primary",
        "prepend-icon": s.validateIcon,
        onClick: m[1] || (m[1] = (o) => t("validate")),
        disabled: s.disabled || s.validateDisabled
      }, {
        default: i(() => [
          b(a.$slots, "validate", {}, () => [
            h(N(s.validateLabel), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]))
    ]));
  }
}, pa = { key: 0 }, ma = { class: "text-right mt-3" }, va = {
  __name: "OxLogin",
  props: {
    next: { type: String },
    url: { type: String }
  },
  emits: ["save", "saved"],
  setup(n, { emit: u }) {
    const t = Oe("password"), s = n, a = ne({
      username: "",
      password: ""
    }), m = G(!1), o = ne(new qt());
    function d(p = !0) {
      Jt(a, { username: "", password: "" }), p && o.none();
    }
    async function l() {
      o.processing();
      try {
        const p = await fetch(s.url, {
          method: "POST",
          headers: Ht.axiosConfig.headers,
          body: JSON.stringify(a)
        });
        p.status == 200 ? (a.credentials = "", a.password = "", o.ok(await p.json()), s.next && (window.location.href = s.next)) : o.error(await p.json());
      } catch (p) {
        o.ok((p == null ? void 0 : p.message) || p);
      }
    }
    return (p, v) => (r(), $(P, null, [
      c(e(ae), { state: o }, {
        none: i(({ state: f }) => v[7] || (v[7] = [
          W("p", null, "Please enter your credentials in order too proceed...", -1)
        ])),
        "ok-detail": i(({ state: f }) => [
          s.next ? (r(), $("p", pa, [
            v[8] || (v[8] = h("You soon will be redirected to ")),
            W("i", null, N(s.next), 1)
          ])) : g("", !0)
        ]),
        error: i(({ state: f }) => {
          var w, S;
          return [
            c(ue, {
              errors: (w = f.data) == null ? void 0 : w.username
            }, null, 8, ["errors"]),
            c(ue, {
              errors: (S = f.data) == null ? void 0 : S.password
            }, null, 8, ["errors"])
          ];
        }),
        _: 1
      }, 8, ["state"]),
      o.isOk ? g("", !0) : (r(), $(P, { key: 0 }, [
        c(ie, {
          variant: "underlined",
          label: "Enter login",
          modelValue: a.username,
          "onUpdate:modelValue": v[0] || (v[0] = (f) => a.username = f),
          onKeyup: v[1] || (v[1] = be(L((f) => e(t).focus(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue"]),
        c(ie, {
          variant: "underlined",
          ref: "password",
          label: "Enter password",
          modelValue: a.password,
          "onUpdate:modelValue": v[2] || (v[2] = (f) => a.password = f),
          type: m.value ? "text" : "password",
          "append-icon": m.value ? "mdi-eye" : "mdi-eye-off",
          "onClick:append": v[3] || (v[3] = (f) => m.value = !m.value),
          onKeyup: v[4] || (v[4] = be(L((f) => l(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue", "type", "append-icon"]),
        W("div", ma, [
          b(p.$slots, "default", {
            value: a.password
          }, () => [
            a.username && a.password ? (r(), y(ve, {
              key: 0,
              "validate-label": "Login!",
              onValidate: v[5] || (v[5] = (f) => l()),
              onReset: v[6] || (v[6] = (f) => d()),
              state: o
            }, null, 8, ["state"])) : g("", !0)
          ])
        ])
      ], 64))
    ], 64));
  }
}, Le = /* @__PURE__ */ j({
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
  setup(n) {
    const u = K(), t = n, s = Y(u, "views."), a = G(!1);
    de(() => {
      a.value = !0;
    }), We(() => {
      a.value = !1;
    });
    const m = T("panels"), o = T("panel");
    return (d, l) => (r(), y(re, {
      value: t.name
    }, {
      default: i(() => [
        t.state ? (r(), y(ae, {
          key: 0,
          state: t.state,
          delay: ""
        }, null, 8, ["state"])) : g("", !0),
        c(Ce, { class: "ma-4" }, {
          default: i(() => [
            (r(), y(ye, {
              to: "#app-bar-sheet-title",
              disabled: !a.value || e(m).panel != t.name
            }, [
              t.icon ? (r(), y(U, {
                key: 0,
                icon: t.icon
              }, null, 8, ["icon"])) : g("", !0),
              h(" " + N(t.title), 1)
            ], 8, ["disabled"])),
            (r(), y(ye, {
              to: "#app-bar-right",
              disabled: !a.value || e(m).panel != t.name
            }, [
              b(d.$slots, "append-title"),
              t.help ? (r(), y(x, {
                key: 0,
                class: "ml-3",
                href: t.help,
                panels: "new",
                icon: "mdi-information-outline"
              }, null, 8, ["href"])) : g("", !0)
            ], 8, ["disabled"])),
            b(d.$slots, "top"),
            b(d.$slots, "default", {}, () => [
              e(s) ? (r(), y(_t, {
                key: 0,
                modelValue: e(o).view,
                "onUpdate:modelValue": l[0] || (l[0] = (p) => e(o).view = p)
              }, {
                default: i(() => [
                  (r(!0), $(P, null, M(e(s), (p, v) => (r(), y(Bt, {
                    key: p,
                    value: p
                  }, {
                    default: i(() => [
                      b(d.$slots, v)
                    ]),
                    _: 2
                  }, 1032, ["value"]))), 128))
                ]),
                _: 3
              }, 8, ["modelValue"])) : g("", !0)
            ]),
            b(d.$slots, "bottom")
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["value"]));
  }
}), _e = /* @__PURE__ */ j({
  __name: "OxView",
  props: {
    /** default tab title */
    title: String
  },
  setup(n) {
    const u = n, t = G(null), s = K(), a = Y(s, "tab.", { exclude: "tab.default" }), m = Y(s, "window.");
    return (o, d) => e(a) && Object.keys(e(a)).length ? (r(), $(P, { key: 0 }, [
      c(It, {
        modelValue: t.value,
        "onUpdate:modelValue": d[0] || (d[0] = (l) => t.value = l)
      }, {
        default: i(() => [
          e(s).default ? b(o.$slots, "tab", { key: 0 }, () => [
            c(Ve, {
              text: u == null ? void 0 : u.title,
              value: "default"
            }, null, 8, ["text"])
          ]) : g("", !0),
          (r(!0), $(P, null, M(e(a), (l, p) => (r(), y(Ve, { value: l }, {
            default: i(() => [
              b(o.$slots, p)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"]),
      c(xe, {
        modelValue: t.value,
        "onUpdate:modelValue": d[1] || (d[1] = (l) => t.value = l)
      }, {
        default: i(() => [
          e(s).default ? (r(), y(re, {
            key: 0,
            value: "default"
          }, {
            default: i(() => [
              b(o.$slots, "default")
            ]),
            _: 3
          })) : g("", !0),
          (r(!0), $(P, null, M(e(m), (l, p) => (r(), y(re, { value: l }, {
            default: i(() => [
              b(o.$slots, p)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"])
    ], 64)) : b(o.$slots, "default", { key: 1 });
  }
}), fa = { class: "mb-3" }, ba = /* @__PURE__ */ j({
  __name: "OxModelEdit",
  props: {
    repo: {},
    empty: {},
    initial: {},
    name: {},
    url: {},
    saved: { type: Function }
  },
  setup(n, { expose: u }) {
    const t = n, { editor: s, edited: a } = Xe({ props: t });
    _(() => s.repo.use);
    const { value: m } = ce(s);
    return u({ editor: s, edited: a, value: m }), (o, d) => (r(), $(P, null, [
      c(ae, {
        state: e(s).state
      }, null, 8, ["state"]),
      W("div", fa, [
        e(a) ? (r(), y(ve, {
          key: 0,
          onValidate: d[0] || (d[0] = (l) => e(s).save()),
          onReset: d[1] || (d[1] = (l) => e(s).discard()),
          state: e(s).state,
          "validate-disabled": !e(s).valid
        }, null, 8, ["state", "validate-disabled"])) : g("", !0)
      ]),
      c(Mt, null, {
        default: i(() => [
          b(o.$slots, "default", {
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
}), ya = /* @__PURE__ */ j({
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
  setup(n) {
    const u = K(), t = Y(u, "views.list."), s = Y(u, "item."), a = Y(u, "views.detail.edit."), m = Oe("filters"), o = n, d = T("context"), { panel: l, list: p, items: v, next: f, prev: w } = T("panel") ?? Ze({ props: o }), S = l.panels, B = _(() => {
      var O;
      return d.user.can([l.model, (O = l.value) != null && O.id ? "change" : "add"]);
    }), { showFilters: I } = ce(l), z = _(() => [
      ...o.headers,
      { key: "actions", title: k("actions") }
    ]);
    function le(O) {
      l.value.value = O;
    }
    const R = _(() => ({
      panel: l,
      panels: S,
      list: p,
      items: v,
      context: d,
      value: l.value
    }));
    return (O, V) => (r(), y(Le, {
      name: o.name,
      title: e(l).title,
      icon: e(l).icon,
      state: e(p).state,
      index: o.index
    }, X({
      "append-title": i(() => [
        b(O.$slots, "append-title", F(E(R.value))),
        e(l).view.startsWith("list.") ? (r(), y($e, {
          key: 0,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: i(() => [
            b(O.$slots, "nav.list", F(E(R.value))),
            e(m) ? (r(), y(x, {
              key: 0,
              title: e(I) ? e(k)("filters.hide") : e(k)("filters.show"),
              "aria-label": e(I) ? e(k)("filters.hide") : e(k)("filters.show"),
              onClick: V[0] || (V[0] = (C) => I.value = !e(I)),
              active: e(I)
            }, {
              default: i(() => [
                c(U, {
                  icon: e(m).icon
                }, null, 8, ["icon"])
              ]),
              _: 1
            }, 8, ["title", "aria-label", "active"])) : g("", !0)
          ]),
          _: 3
        })) : e(l).view.startsWith("detail.") && e(l).value ? (r(), y($e, {
          key: 1,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: i(() => [
            b(O.$slots, "nav.detail", F(E(R.value))),
            e(l).view == "detail.edit" && e(l).value ? (r(), y(Dt, { key: 0 }, {
              activator: i(({ props: C }) => [
                c(x, J({ "prepend-icon": "mdi-dots-vertical" }, C), {
                  default: i(() => [
                    h(N(e(k)("actions")), 1)
                  ]),
                  _: 2
                }, 1040)
              ]),
              default: i(() => [
                c(pe, null, {
                  default: i(() => [
                    b(O.$slots, "item.actions", {
                      value: e(l).value
                    })
                  ]),
                  _: 3
                })
              ]),
              _: 3
            })) : g("", !0),
            c(x, {
              disabled: !e(w),
              title: e(k)("prev"),
              "aria-label": e(k)("prev"),
              onClick: V[1] || (V[1] = L((C) => e(l).show({ value: e(w) }), ["stop"]))
            }, {
              default: i(() => [
                c(U, { icon: "mdi-chevron-left" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"]),
            c(x, {
              disabled: !e(f),
              title: e(k)("next"),
              "aria-label": e(k)("next"),
              onClick: V[2] || (V[2] = L((C) => e(l).show({ value: e(f) }), ["stop"]))
            }, {
              default: i(() => [
                c(U, { icon: "mdi-chevron-right" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"])
          ]),
          _: 3
        })) : g("", !0),
        c(Ft, {
          class: "ml-3",
          color: "secondary",
          modelValue: e(l).view,
          "onUpdate:modelValue": V[4] || (V[4] = (C) => e(l).view = C),
          density: "compact",
          variant: "tonal",
          mandatory: ""
        }, {
          default: i(() => {
            var C;
            return [
              c(x, {
                value: "list.table",
                title: e(k)("panels.nav.table"),
                "aria-label": e(k)("panels.nav.table")
              }, {
                default: i(() => [
                  c(U, null, {
                    default: i(() => V[5] || (V[5] = [
                      h("mdi-table")
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
                      h("mdi-card-account-details")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : g("", !0),
              e(u)["views.list.kanban"] ? (r(), y(x, {
                key: 1,
                value: "list.kanban",
                title: e(k)("panels.nav.kanban"),
                "aria-label": e(k)("panels.nav.kanban")
              }, {
                default: i(() => [
                  c(U, null, {
                    default: i(() => V[7] || (V[7] = [
                      h("mdi-view-column")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : g("", !0),
              e(a) ? (r(), y(x, {
                key: 2,
                value: "detail.add",
                onClick: V[3] || (V[3] = L((D) => e(l).create(), ["stop"])),
                title: e(k)("panels.nav.add"),
                "aria-label": e(k)("panels.nav.add")
              }, {
                default: i(() => [
                  c(U, null, {
                    default: i(() => V[8] || (V[8] = [
                      h("mdi-plus-box")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : g("", !0),
              e(u)["views.detail.edit"] || e(a) ? (r(), y(x, {
                key: 3,
                value: "detail.edit",
                disabled: !((C = e(l).value) != null && C.id),
                title: e(k)("panels.nav.edit"),
                "aria-label": e(k)("panels.nav.edit")
              }, {
                default: i(() => [
                  c(U, null, {
                    default: i(() => V[9] || (V[9] = [
                      h("mdi-pencil")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"])) : g("", !0),
              b(O.$slots, "nav.views", F(E(R.value)))
            ];
          }),
          _: 3
        }, 8, ["modelValue"])
      ]),
      top: i(() => [
        Ke(c(Te, {
          ref_key: "filters",
          ref: m,
          search: o.search,
          "teleport-to": "#panel-list-actions"
        }, {
          default: i((C) => [
            b(O.$slots, "list.filters", F(E(C)))
          ]),
          _: 3
        }, 8, ["search"]), [
          [ze, e(l).view.startsWith("list.") && e(I)]
        ])
      ]),
      _: 2
    }, [
      e(u)["views.list.table"] ? void 0 : {
        name: "views.list.table",
        fn: i(() => [
          c(Ae, {
            headers: z.value,
            edit: ""
          }, X({ _: 2 }, [
            M(e(s), (C, D) => ({
              name: D,
              fn: i((se) => [
                b(O.$slots, D, F(E(se)))
              ])
            }))
          ]), 1032, ["headers"])
        ]),
        key: "0"
      },
      M(e(t), (C, D) => ({
        name: D,
        fn: i(() => [
          b(O.$slots, D, F(E(R.value)))
        ])
      })),
      (e(u)["views.detail.edit"] || e(a)) && B.value ? {
        name: "views.detail.edit",
        fn: i(() => [
          c(e(_e), {
            title: e(k)(`models.${e(l).model.entity}`)
          }, X({ _: 2 }, [
            M(e(a), (C, D) => ({
              name: C,
              fn: i(() => [
                b(O.$slots, D, {
                  saved: le,
                  value: e(l).value
                })
              ])
            }))
          ]), 1032, ["title"])
        ]),
        key: "1"
      } : void 0
    ]), 1032, ["name", "title", "icon", "state", "index"]));
  }
}), ka = /* @__PURE__ */ j({
  __name: "OxPanelNav",
  props: {
    title: {},
    icon: {},
    panel: {},
    href: {},
    auto: { type: Boolean }
  },
  setup(n) {
    const u = n, t = T("panels");
    return _(() => !u.auto || panel.name == u.name), (s, a) => (r(), y(q, {
      active: e(t).panel == u.panel,
      "prepend-icon": u.icon,
      title: u.title,
      onClick: a[0] || (a[0] = L((m) => e(t).show(u), ["stop"]))
    }, null, 8, ["active", "prepend-icon", "title"]));
  }
}), ga = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OxAction: me,
  OxActionModelDelete: Xt,
  OxActions: Zt,
  OxApp: sa,
  OxComponent: na,
  OxFieldDetails: ue,
  OxFormList: ra,
  OxListFilters: Te,
  OxListKanban: da,
  OxListTable: Ae,
  OxLogin: va,
  OxModelEdit: ba,
  OxModelPanel: ya,
  OxPanel: Le,
  OxPanelNav: ka,
  OxStateAlert: ae,
  OxValidationBtn: ve,
  OxView: _e
}, Symbol.toStringTag, { value: "Module" })), ha = {
  el: "#app",
  delimiters: ["[[", "]]"],
  components: { ...ga, ...Qt }
};
export {
  ha as App,
  me as OxAction,
  Xt as OxActionModelDelete,
  Zt as OxActions,
  sa as OxApp,
  na as OxComponent,
  ue as OxFieldDetails,
  ra as OxFormList,
  Te as OxListFilters,
  da as OxListKanban,
  Ae as OxListTable,
  va as OxLogin,
  ba as OxModelEdit,
  ya as OxModelPanel,
  Le as OxPanel,
  ka as OxPanelNav,
  ae as OxStateAlert,
  ve as OxValidationBtn,
  _e as OxView
};
//# sourceMappingURL=components.js.map
