import { defineComponent as D, useAttrs as ee, inject as L, createElementBlock as $, createCommentVNode as k, unref as e, openBlock as d, Fragment as O, createBlock as y, mergeProps as C, withModifiers as U, ref as q, computed as j, resolveComponent as Ue, withCtx as n, renderList as M, createVNode as b, createTextVNode as I, toDisplayString as R, mergeModels as ie, useModel as re, renderSlot as v, useSlots as J, reactive as ne, onMounted as se, watch as Q, onErrorCaptured as De, createElementVNode as H, createSlots as Y, normalizeProps as P, guardReactiveProps as T, shallowRef as ze, h as Ne, defineAsyncComponent as Re, normalizeClass as qe, useTemplateRef as Se, withKeys as ge, onUnmounted as Ke, Teleport as ke, toRefs as We, withDirectives as Ge, vShow as Qe } from "vue";
import { useAction as He, t as g, filterSlots as Z, useAppContext as Je, usePanels as Ye, useQuery as Xe, ifNotEqualFn as Ze, defineAsyncComponent as et, rules as tt, useModelList as lt, Query as at, ifNotEqual as st, tKeys as nt, useModelEditor as ot, useModelPanel as it } from "@oxylus/core";
import { V as B, b as X, d as me, e as rt, f as ut, g as te, h as dt, i as pt, j as mt, k as $e, l as xe, n as ye, o as ct, p as Ce, q as ce, r as vt, s as ft, t as yt, u as bt, v as oe, w as gt, x as kt, y as ve, z as Ae, A as _e, B as $t, C as wt, D as Le, E as Vt, F as Ot, G as Me, H as ht, I as St, J as xt, K as Ct, L as le, M as W, N as At, O as _t, P as Lt, Q as we, R as Ve, S as Mt, T as Pt } from "./vuetify.js";
import { l as fe, I as Tt, D as Bt, t as pe, S as It, m as jt, r as Et } from "./index2.js";
import "axios";
import { components as Ft } from "@oxylus/core/vendor";
const ae = /* @__PURE__ */ D({
  __name: "OxAction",
  props: {
    item: {},
    title: {},
    icon: {},
    color: {},
    button: { type: Boolean },
    confirm: {},
    permission: {},
    run: { type: Function },
    href: {}
  },
  emits: ["completed"],
  setup(f, { emit: c }) {
    const r = f, o = ee(), s = c, i = L("user"), { run: t, processing: u, allowed: l } = He({ user: i, emits: s, props: r });
    return (a, p) => e(l) ? (d(), $(O, { key: 0 }, [
      r.button ? (d(), y(B, C({
        key: 0,
        variant: "text"
      }, e(o), {
        disabled: e(u),
        color: r.color,
        icon: r.icon,
        title: r.title,
        "aria-label": r.title,
        onClick: U(e(t), ["stop"])
      }), null, 16, ["disabled", "color", "icon", "title", "aria-label", "onClick"])) : (d(), y(X, C({ key: 1 }, e(o), {
        title: r.title,
        "base-color": r.color,
        "prepend-icon": r.icon,
        disabled: e(u),
        onClick: U(e(t), ["stop"])
      }), null, 16, ["title", "base-color", "prepend-icon", "disabled", "onClick"]))
    ], 64)) : k("", !0);
  }
}), Ut = /* @__PURE__ */ D({
  __name: "OxActionModelDelete",
  props: {
    item: {}
  },
  setup(f) {
    const c = L("panel"), r = L("repos"), o = ee(), s = f;
    async function i(t, u) {
      return await r[u.constructor.entity].api().delete(u.$url(), { delete: s.item.id });
    }
    return (t, u) => (d(), y(ae, C(e(o), {
      item: s.item,
      icon: "mdi-delete",
      color: "error",
      title: e(g)("actions.delete"),
      confirm: e(g)("actions.delete.confirm"),
      permission: [s.item.constructor, "delete"],
      run: i,
      onCompleted: u[0] || (u[0] = (l) => {
        var a;
        return (a = e(c)) == null ? void 0 : a.show({ view: e(c).index });
      })
    }), null, 16, ["item", "title", "confirm", "permission"]));
  }
}), Dt = /* @__PURE__ */ D({
  __name: "OxActionPost",
  props: {
    /**
     * URL path to append to item's url. Should be provided.
     */
    path: String,
    /**
     * HTTP method to use (upper or lower cased)
     */
    method: { type: String, default: "post" },
    /** Model repository to use */
    repo: Object,
    /** POST data to send (optional) */
    data: Object,
    /** Pinia-Orm AXIOS options */
    options: Object
  },
  setup(f) {
    const c = ee(), r = f;
    async function o(s, i) {
      const t = r.repo.api();
      return await t[r.method].apply(t, [i.$url(r.path), r.data, r.options]);
    }
    return (s, i) => (d(), y(e(ae), C(e(c), { run: o }), null, 16));
  }
}), zt = /* @__PURE__ */ D({
  __name: "OxAppNavItem",
  props: {
    name: {},
    url: {},
    permission: {},
    type: {},
    items: {},
    order: {},
    title: {},
    icon: {}
  },
  setup(f) {
    const c = f;
    q(null);
    const r = L("user"), o = L("panels");
    j(() => !c.auto || panel.name == c.name);
    function s(t) {
      return t.permission && !r.can(t.permission) ? !1 : t.items ? t.items.some((u) => s(u)) : !0;
    }
    function i() {
      const t = { panel: c.name, href: c.url };
      o.show(t);
    }
    return (t, u) => {
      const l = Ue("ox-app-nav-item", !0);
      return s(c) ? (d(), $(O, { key: 0 }, [
        c.type == "group" ? (d(), y(me, {
          key: 0,
          value: c.name
        }, {
          activator: n(({ props: a }) => [
            b(X, C(a, {
              title: c.title,
              "prepend-icon": c.icon
            }), null, 16, ["title", "prepend-icon"])
          ]),
          default: n(() => [
            (d(!0), $(O, null, M(c.items, (a, p) => (d(), y(l, C({
              key: p,
              ref_for: !0
            }, a, {
              type: a.type == "group" ? "subheader" : a.type
            }), null, 16, ["type"]))), 128))
          ]),
          _: 1
        }, 8, ["value"])) : c.type == "subheader" ? (d(), $(O, { key: 1 }, [
          b(rt, null, {
            default: n(() => [
              I(R(c.title), 1)
            ]),
            _: 1
          }),
          c.items ? (d(!0), $(O, { key: 0 }, M(c.items, (a) => (d(), y(l, C({ ref_for: !0 }, a), null, 16))), 256)) : k("", !0)
        ], 64)) : (d(), y(X, {
          key: 2,
          active: e(o).panel == c.name,
          value: c.name,
          "prepend-icon": c.icon,
          title: c.title,
          onClick: U(i, ["stop"])
        }, null, 8, ["active", "value", "prepend-icon", "title"]))
      ], 64)) : k("", !0);
    };
  }
}), Nt = {
  __name: "OxAppNav",
  props: /* @__PURE__ */ ie({
    items: Array
  }, {
    drawer: {},
    drawerModifiers: {}
  }),
  emits: ["update:drawer"],
  setup(f) {
    L("context");
    const c = L("panels"), r = re(f, "drawer"), o = q([]), s = f, i = j(() => (t(s.items), s.items));
    function t(l) {
      o.value = u(l);
    }
    function u(l) {
      if (c.panel) {
        for (const a of l)
          if (a.items) {
            const p = u(a.items);
            if (p)
              return [p, a.name];
          } else if (a.name == c.panel)
            return [a.name];
      }
    }
    return (l, a) => (d(), y(ut, {
      modelValue: r.value,
      "onUpdate:modelValue": a[1] || (a[1] = (p) => r.value = p),
      theme: "dark"
    }, {
      append: n(() => [
        b(te, null, {
          default: n(() => [
            v(l.$slots, "append")
          ]),
          _: 3
        })
      ]),
      default: n(() => [
        v(l.$slots, "prepend"),
        b(te, {
          opened: o.value,
          "onUpdate:opened": a[0] || (a[0] = (p) => o.value = p),
          density: "compact"
        }, {
          default: n(() => [
            (d(!0), $(O, null, M(i.value, (p, m) => (d(), y(e(zt), C({
              key: m,
              ref_for: !0
            }, p), null, 16))), 128))
          ]),
          _: 1
        }, 8, ["opened"])
      ]),
      _: 3
    }, 8, ["modelValue"]));
  }
}, Rt = {
  class: "nav-home",
  href: "/"
};
var he;
const qt = /* @__PURE__ */ D({
  __name: "OxApp",
  props: {
    apiUrl: {},
    logo: {},
    dataEl: { default: (he = document.body.dataset) == null ? void 0 : he.appData },
    models: {},
    data: {}
  },
  setup(f) {
    const c = J(), r = Z(c, "panels."), o = f, s = ne({ drawer: !0 }), i = Je(o), t = Ye();
    return se(() => {
      t.panel = i.data.panel;
    }), Q(() => [i.state.state, i.state.data], () => {
      i.showState = !0;
    }), De((u, l, a) => {
      i.state.error(`${u}`);
    }), (u, l) => (d(), y(dt, null, {
      default: n(() => [
        b(pt, {
          modelValue: e(i).showState,
          "onUpdate:modelValue": l[0] || (l[0] = (a) => e(i).showState = a),
          color: e(i).state.color,
          "multi-line": ""
        }, {
          default: n(() => [
            I(R(e(i).state.toString()), 1)
          ]),
          _: 1
        }, 8, ["modelValue", "color"]),
        b(mt, { color: "primary" }, {
          prepend: n(() => [
            e(c)["nav-start"] || e(c)["nav-end"] ? (d(), y(xe, {
              key: 0,
              icon: "mdi-apps",
              title: e(g)("nav.panels"),
              "aria-label": e(g)("nav.panels"),
              onClick: l[1] || (l[1] = U((a) => s.drawer = !s.drawer, ["stop"]))
            }, null, 8, ["title", "aria-label"])) : k("", !0)
          ]),
          default: n(() => [
            b($e, { id: "app-bar-sheet-title" }),
            b($e, { id: "app-bar-title" }, {
              default: n(() => [
                v(u.$slots, "title")
              ]),
              _: 3
            }),
            v(u.$slots, "app-bar-left"),
            l[5] || (l[5] = H("div", {
              id: "app-bar-right",
              class: "mr-3"
            }, null, -1)),
            v(u.$slots, "app-bar-right")
          ]),
          _: 3
        }),
        e(c)["nav-start"] || e(c)["nav-end"] ? (d(), y(e(Nt), {
          key: 0,
          drawer: s.drawer,
          "onUpdate:drawer": l[3] || (l[3] = (a) => s.drawer = a),
          items: e(i).data.nav
        }, Y({
          prepend: n(() => [
            H("a", Rt, [
              u.logo ? (d(), y(ye, {
                key: 0,
                src: u.logo,
                class: "logo"
              }, null, 8, ["src"])) : k("", !0)
            ]),
            v(u.$slots, "nav-start", { context: e(i) })
          ]),
          _: 2
        }, [
          e(c)["nav-end"] ? {
            name: "append",
            fn: n(() => [
              b(te, {
                opened: s.opened,
                "onUpdate:opened": l[2] || (l[2] = (a) => s.opened = a)
              }, {
                default: n(() => [
                  v(u.$slots, "nav-end", { context: e(i) })
                ]),
                _: 3
              }, 8, ["opened"])
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["drawer", "items"])) : k("", !0),
        b(ct, null, {
          default: n(() => [
            v(u.$slots, "main", {}, () => [
              b(Ce, {
                modelValue: e(t).panel,
                "onUpdate:modelValue": l[4] || (l[4] = (a) => e(t).panel = a)
              }, {
                default: n((a) => [
                  v(u.$slots, "default", C(a, { context: e(i) })),
                  (d(!0), $(O, null, M(e(r), (p, m) => (d(), y(ce, {
                    key: m,
                    value: p
                  }, {
                    default: n(() => [
                      v(u.$slots, m, C({ ref_for: !0 }, a, { context: e(i) }))
                    ]),
                    _: 2
                  }, 1032, ["value"]))), 128))
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
}), Kt = ["name", "value"], Wt = /* @__PURE__ */ D({
  __name: "OxAutocomplete",
  props: /* @__PURE__ */ ie({
    repo: {},
    lookup: { default: "search" },
    name: {},
    filters: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(f, { expose: c }) {
    const r = J(), o = re(f, "modelValue"), s = q(""), i = f, t = ee(), u = L("repos"), { state: l, query: a, fetch: p } = Xe(i.repo, u, { save: !1 }), m = ne([]), V = q([]);
    async function _(S) {
      const A = S && E(S);
      if (A != null && A.length) {
        const x = await p({ id: A });
        m.splice(0, 0, ...x.entities);
      }
      N(S);
    }
    function E(S) {
      if (!Array.isArray(S))
        return m.findIndex((x) => x.id == S) == -1 ? [S] : null;
      const A = new Set(m.map((x) => x.id));
      return S.filter((x) => !A.has(x));
    }
    function N(S) {
      Array.isArray(S) ? V.value = m.filter((A) => S.includes(A.id)) : S ? V.value = [m.find((A) => A.id == S)] : V.value = [];
    }
    let G = null;
    const K = fe.debounce(async ({ reset: S = !1 } = {}) => {
      if (l.isProcessing)
        return;
      const A = s.value != "<empty string>" && s.value || "";
      if (!S && A == G)
        return;
      G = A;
      const x = { ...i.filters, page_size: 20 };
      x[i.lookup] = A;
      let h = await p({ params: x });
      const w = V.value ? fe.unionBy(h.entities, V.value, (F) => F.id) : h.entities;
      m.splice(0, m.length, ...w), S || (s.value = A);
    }, 500);
    return se(async () => {
      await K(), o.value && await _(o.value);
    }), Q(() => i.filters, Ze(() => K({ reset: !0 }))), Q(s, (S) => {
      S != "<empty string>" && S != G && K({ q: S });
    }), Q(o, (S, A) => {
      S != A && N(S);
    }), c({ value: o, selected: V, load: K, items: m }), (S, A) => (d(), $(O, null, [
      i.name ? (d(), $("input", {
        key: 0,
        type: "hidden",
        name: i.name,
        value: o.value
      }, null, 8, Kt)) : k("", !0),
      b(e(vt), C(e(t), {
        items: m,
        loading: e(l).isProcessing,
        modelValue: o.value,
        "onUpdate:modelValue": A[0] || (A[0] = (x) => o.value = x),
        search: s.value,
        "onUpdate:search": A[1] || (A[1] = (x) => s.value = x)
      }), Y({ _: 2 }, [
        M(e(r), (x, h) => ({
          name: h,
          fn: n((w) => [
            v(S.$slots, h, P(T(w)))
          ])
        }))
      ]), 1040, ["items", "loading", "modelValue", "search"])
    ], 64));
  }
}), Gt = {
  props: {
    src: String,
    is: String
  },
  setup(f) {
    const c = ze(null), r = j(() => {
      if (f.is)
        return f.is;
      let s = f.src.substring(f.src.lastIndexOf("/") + 1);
      if (s && (s = s.substring(0, s.indexOf("."))), !s)
        throw Error(
          "`is` not provided and could not be deducted from `src`."
        );
      return s;
    });
    function o() {
      c.value = et(f.src, r.value);
    }
    return Q(() => f.src, o), o(), () => Ne(c.value, f);
  }
}, Qt = /* @__PURE__ */ D({
  __name: "OxField",
  props: {
    /** Field or attribute name */
    name: String,
    /** Editor to use **/
    editor: Object,
    /** If true, add a required rule */
    required: Boolean,
    /**
     * If provided, will by default generate a field depending on the value:
     *
     * - `textarea`: creates a `v-textarea`;
     * - `select`: creates a `v-select`;
     * - `checkbox`: create a `v-checkbox`;
     * - `date`: create a `v-date-input`;
     * - `autocomplete`: create a `ox-autocomplete`;
     * - any other value: `v-text-field` with supplied type;
     */
    type: String,
    /**
     * Field rules as provided to Vuetify field inputs.
     */
    rules: Array
  },
  emits: ["update:modelValue"],
  setup(f, { emit: c }) {
    const r = Re(() => import("./OxAutocomplete.js")), o = c, s = ee(), i = J(), t = f, u = j(() => {
      const l = `fields.${t.name}.help`, a = {
        name: t.name,
        label: g(`fields.${t.name}`),
        "aria-label": g(`fields.${t.name}`),
        "error-messages": t.editor.error(t.name),
        rules: t.rules || [],
        "onUpdate:modelValue": (...m) => o("update:modelValue", ...m),
        ...s
      }, p = g(l);
      return p != l && (a.hint = p, a["aria-description"] = p), t.required && a.rules.push(tt.required), a;
    });
    return (l, a) => v(l.$slots, "default", {
      props: u.value,
      editor: t.editor
    }, () => [
      t.type == "select" ? (d(), y(ft, C({ key: 0 }, u.value, {
        modelValue: t.editor.value[t.name],
        "onUpdate:modelValue": a[0] || (a[0] = (p) => t.editor.value[t.name] = p)
      }), null, 16, ["modelValue"])) : t.type == "textarea" ? (d(), y(yt, C({ key: 1 }, u.value, {
        modelValue: t.editor.value[t.name],
        "onUpdate:modelValue": a[1] || (a[1] = (p) => t.editor.value[t.name] = p)
      }), null, 16, ["modelValue"])) : t.type == "checkbox" ? (d(), y(bt, C({ key: 2 }, u.value, {
        modelValue: t.editor.value[t.name],
        "onUpdate:modelValue": a[2] || (a[2] = (p) => t.editor.value[t.name] = p)
      }), null, 16, ["modelValue"])) : t.type == "autocomplete" ? (d(), y(e(r), C({ key: 3 }, u.value, {
        modelValue: t.editor.value[t.name],
        "onUpdate:modelValue": a[3] || (a[3] = (p) => t.editor.value[t.name] = p)
      }), Y({ _: 2 }, [
        M(e(i), (p, m) => ({
          name: m,
          fn: n((V) => [
            v(l.$slots, m, P(T(V)))
          ])
        }))
      ]), 1040, ["modelValue"])) : (d(), y(oe, C({ key: 4 }, u.value, {
        type: t.type,
        modelValue: t.editor.value[t.name],
        "onUpdate:modelValue": a[4] || (a[4] = (p) => t.editor.value[t.name] = p)
      }), null, 16, ["type", "modelValue"]))
    ]);
  }
}), Ht = /* @__PURE__ */ D({
  __name: "OxModelList",
  props: /* @__PURE__ */ ie({
    /**
     * The model repository to use.
     */
    repo: Object,
    /**
     * Allow to remove items from the list.
     */
    editable: Boolean
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(f, { expose: c }) {
    const r = re(f, "modelValue");
    J();
    const o = f, s = ee(), { list: i, items: t } = lt({
      query: new at(o.repo)
    });
    function u(l) {
      i.remove(l), r.value = [...i.ids];
    }
    return se(() => r.value.length && i.load({ id: r.value })), Q(r, (l) => l.length && st(l, i.ids, (a) => a.length && i.load({ id: a }))), Q(() => i.ids, (l) => r.value = [...l]), c({ list: i, items: t }), (l, a) => v(l.$slots, "default", {
      list: e(i),
      items: e(t)
    }, () => [
      b(te, P(T(e(s))), {
        default: n(() => [
          v(l.$slots, "list", {
            list: e(i),
            items: e(t)
          }, () => [
            (d(!0), $(O, null, M(e(t), (p) => (d(), y(X, {
              key: p.id
            }, {
              append: n(() => [
                v(l.$slots, "item.actions", {
                  list: e(i),
                  item: p
                }),
                o.editable ? (d(), y(B, {
                  key: 0,
                  type: "button",
                  class: "ml-2",
                  size: "small",
                  color: "error",
                  onClick: U((m) => u(p.id), ["stop", "prevent"]),
                  "aria-label": e(g)("actions.remove"),
                  title: e(g)("actions.remove"),
                  icon: "mdi-delete"
                }, null, 8, ["onClick", "aria-label", "title"])) : k("", !0)
              ]),
              default: n(() => [
                v(l.$slots, "item", {
                  list: e(i),
                  item: p
                })
              ]),
              _: 2
            }, 1024))), 128))
          ])
        ]),
        _: 3
      }, 16)
    ]);
  }
}), Pe = {
  __name: "OxListFilters",
  props: {
    search: String
  },
  setup(f, { expose: c }) {
    const r = L("list"), o = f, s = j(() => {
      const u = r.filters;
      return u && Object.entries(u).some(
        ([l, a]) => !l.startsWith("page") && !l.startsWith("ordering") && !!a
      );
    }), i = j(() => s.value ? "mdi-filter-check" : "mdi-filter-outline");
    function t() {
      r.filters = {}, r.load();
    }
    return c({ icon: i, hasFilters: s, reset: t }), (u, l) => (d(), $("form", {
      onSubmit: l[2] || (l[2] = U((a) => e(r).load(), ["prevent"])),
      class: "ox-list-filters width-full"
    }, [
      b(gt, {
        dense: "",
        color: "transparent"
      }, {
        default: n(() => [
          b(xe, {
            icon: i.value,
            readonly: ""
          }, null, 8, ["icon"]),
          o.search && e(r).filters ? (d(), y(oe, {
            key: 0,
            label: e(g)("filters.search"),
            density: "compact",
            class: "ml-2",
            modelValue: e(r).filters[o.search],
            "onUpdate:modelValue": l[0] || (l[0] = (a) => e(r).filters[o.search] = a),
            "hide-details": ""
          }, null, 8, ["label", "modelValue"])) : k("", !0),
          v(u.$slots, "default", {
            list: e(r),
            filters: e(r).filters
          }),
          b(B, {
            onClick: l[1] || (l[1] = U((a) => e(r).load(), ["stop"])),
            class: "ml-2",
            icon: "mdi-check",
            "aria-label": u.$t("filters.apply"),
            title: e(g)("filters.apply")
          }, null, 8, ["aria-label", "title"]),
          s.value ? (d(), y(B, {
            key: 1,
            onClick: U(t, ["stop"]),
            icon: "mdi-backspace",
            "aria-label": e(g)("filters.reset"),
            title: e(g)("filters.reset")
          }, null, 8, ["aria-label", "title"])) : k("", !0)
        ]),
        _: 3
      })
    ], 32));
  }
}, Oe = /* @__PURE__ */ D({
  __name: "OxFormListItem",
  props: {
    /** Item being displayed. **/
    item: Object,
    /** Display remove button. **/
    remove: Boolean
  },
  emits: "remove",
  setup(f, { emit: c }) {
    const r = f, o = c, s = ee();
    return (i, t) => (d(), y(X, P(T(e(s))), {
      append: n(() => [
        H("div", {
          onClick: t[1] || (t[1] = U(() => {
          }, ["stop"]))
        }, [
          v(i.$slots, "actions", { item: f.item }),
          r.remove ? (d(), y(B, {
            key: 0,
            type: "button",
            class: "ml-2",
            size: "small",
            onClick: t[0] || (t[0] = U((u) => o("remove", i.$events), ["stop", "prevent"])),
            color: "error",
            "aria-label": e(g)("actions.remove"),
            title: e(g)("actions.remove"),
            icon: "mdi-delete"
          }, null, 8, ["aria-label", "title"])) : k("", !0)
        ])
      ]),
      default: n(() => [
        b(kt, null, {
          default: n(() => [
            v(i.$slots, "default", { item: f.item })
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 16));
  }
}), Jt = {
  key: 0,
  class: "flex-row justify-right"
}, Yt = /* @__PURE__ */ D({
  __name: "OxFormList",
  props: /* @__PURE__ */ ie({
    /** Use this model **/
    useModel: Function,
    /** Content is editable **/
    editable: Boolean
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(f) {
    var a;
    const c = re(f, "modelValue"), r = L("user"), o = q({}), s = f, i = j(() => ({
      add: s.editable && r.can([s.useModel, "add"]),
      change: s.editable && r.can([s.useModel, "change"]),
      delete: s.editable && r.can([s.useModel, "delete"])
    })), t = q([]);
    (a = c.value) != null && a.length || t.value.push(-1);
    function u() {
      c.value.push(o.value), o.value = {};
    }
    function l(p) {
      confirm(g("actions.delete.confirm")) && c.value.splice(p, 1);
    }
    return (p, m) => (d(), y(te, {
      opened: t.value,
      "onUpdate:opened": m[2] || (m[2] = (V) => t.value = V)
    }, {
      default: n(() => {
        var V;
        return [
          (V = c.value) != null && V.length ? (d(), $(O, { key: 0 }, [
            i.value.change ? (d(!0), $(O, { key: 0 }, M(c.value, (_, E) => (d(), y(me, {
              key: E,
              value: E
            }, {
              activator: n(({ props: N }) => [
                b(e(Oe), C({ item: _ }, { ref_for: !0 }, N, {
                  remove: i.value.delete,
                  onRemove: (G) => l(E)
                }), {
                  default: n(({ item: G }) => [
                    v(p.$slots, "item", {
                      item: G,
                      index: E
                    })
                  ]),
                  actions: n(({ item: G }) => [
                    v(p.$slots, "item.actions", {
                      item: G,
                      index: E
                    })
                  ]),
                  _: 2
                }, 1040, ["item", "remove", "onRemove"])
              ]),
              default: n(() => [
                b(ve, {
                  disabled: !i.value.change
                }, {
                  default: n(() => [
                    v(p.$slots, "item.form", {
                      item: _,
                      index: E,
                      editable: i.value.change
                    })
                  ]),
                  _: 2
                }, 1032, ["disabled"])
              ]),
              _: 2
            }, 1032, ["value"]))), 128)) : (d(!0), $(O, { key: 1 }, M(c.value, (_, E) => (d(), y(e(Oe), C({
              key: E,
              item: _
            }, { ref_for: !0 }, s, {
              value: E,
              remove: i.value.delete,
              onRemove: (N) => l(E)
            }), {
              default: n(({ item: N }) => [
                v(p.$slots, "item", {
                  item: N,
                  index: E
                })
              ]),
              actions: n(({ item: N }) => [
                v(p.$slots, "item.actions", {
                  item: N,
                  index: E
                })
              ]),
              _: 2
            }, 1040, ["item", "value", "remove", "onRemove"]))), 128))
          ], 64)) : (d(), y(X, {
            key: 1,
            title: e(g)("lists.empty")
          }, null, 8, ["title"])),
          i.value.add ? (d(), $(O, { key: 2 }, [
            c.value.length ? (d(), y(Ae, { key: 0 })) : k("", !0),
            b(me, { value: -1 }, {
              activator: n(({ props: _ }) => [
                b(X, C(_, {
                  title: e(g)("actions.add_item"),
                  "prepend-icon": "mdi-plus"
                }), null, 16, ["title"])
              ]),
              default: n(() => [
                b(ve, null, {
                  default: n(() => [
                    v(p.$slots, "item.form", {
                      item: o.value,
                      edit: !0
                    })
                  ]),
                  _: 3
                }),
                o.value ? (d(), y(X, { key: 0 }, {
                  default: n(() => [
                    Object.values(o.value).length ? (d(), $("div", Jt, [
                      b(B, {
                        size: "small",
                        color: "secondary",
                        "prepend-icon": "mdi-backspace",
                        onClick: m[0] || (m[0] = (_) => o.value = {}),
                        "aria-label": e(g)("actions.discard")
                      }, {
                        default: n(() => [
                          I(R(e(g)("actions.discard")), 1)
                        ]),
                        _: 1
                      }, 8, ["aria-label"]),
                      b(B, {
                        size: "small",
                        color: "primary",
                        "prepend-icon": "mdi-plus",
                        class: "ml-2",
                        onClick: m[1] || (m[1] = (_) => u()),
                        "aria-label": e(g)("actions.add")
                      }, {
                        default: n(() => [
                          I(R(e(g)("actions.add")), 1)
                        ]),
                        _: 1
                      }, 8, ["aria-label"])
                    ])) : k("", !0)
                  ]),
                  _: 1
                })) : k("", !0)
              ]),
              _: 3
            })
          ], 64)) : k("", !0)
        ];
      }),
      _: 3
    }, 8, ["opened"]));
  }
}), Xt = {
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
  setup(f, { emit: c }) {
    const r = c;
    L("list");
    const o = L("items"), s = f;
    function i(l) {
      return l = l % s.colors.length, s.colorVariant ? s.colors[l] + "-" + s.colorVariant : s.colors[l];
    }
    function t(l, a, p) {
      l[p] ? !l[p].includes(a) && l[p].push(a) : l[p] = [a];
    }
    const u = j(() => {
      const l = {};
      if (o.value)
        for (var a of o.value) {
          const m = a[s.field];
          if (Array.isArray(m))
            if (m.length)
              for (var p of m)
                t(l, a, p);
            else
              t(l, a, null);
          else
            t(l, a, m);
        }
      return l;
    });
    return (l, a) => (d(), y(_e, null, {
      default: n(() => [
        b($t, null, {
          default: n(() => [
            (d(!0), $(O, null, M(s.headers, (p, m) => (d(), y(wt, {
              key: p.value
            }, {
              default: n(({ selectedClass: V }) => [
                b(Le, {
                  width: "400",
                  class: qe(["ma-3", V]),
                  color: i(m),
                  lines: "two"
                }, {
                  default: n(() => [
                    b(Vt, null, {
                      default: n(() => [
                        I(R(p.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    b(te, {
                      "bg-color": i(m)
                    }, {
                      default: n(() => [
                        u.value && u.value[p.value] ? (d(!0), $(O, { key: 0 }, M(u.value[p.value], (_) => v(l.$slots, "item", {
                          key: _.id,
                          header: p,
                          item: _
                        }, () => [
                          b(X, {
                            title: _[s.itemTitle],
                            value: s.itemValue && _[s.itemValue],
                            onClick: (E) => r("click", _)
                          }, {
                            append: n(() => [
                              v(l.$slots, "item.action")
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
}, Te = /* @__PURE__ */ D({
  __name: "OxActionEdit",
  props: {
    item: {},
    edit: {}
  },
  setup(f) {
    const c = L("panel");
    L("repos");
    const r = L("user"), o = ee(), s = f;
    function i(t, u) {
      c.show({ view: "detail.edit", value: u });
    }
    return (t, u) => s.edit && e(r).can([t.item.constructor, "change"], t.item) ? (d(), y(ae, C({ key: 0 }, e(o), {
      icon: "mdi-pencil",
      title: e(g)("actions.edit"),
      item: t.item,
      run: i
    }), null, 16, ["title", "item"])) : s.edit && e(r).can([t.item.constructor, "view"], t.item) ? (d(), y(ae, C({ key: 1 }, e(o), {
      icon: "mdi-eye-outline",
      title: e(g)("actions.view"),
      item: t.item,
      run: i
    }), null, 16, ["title", "item"])) : k("", !0);
  }
}), Be = /* @__PURE__ */ D({
  __name: "OxListTable",
  props: {
    /** ModelList used to display objects **/
    list: Object,
    /** List items (cf. {@link useModelList}) **/
    items: Array,
    /** Table headers **/
    headers: Array,
    /** If True, display edit/view button **/
    edit: Boolean,
    /** If provided, use this item field as image **/
    image: String
  },
  setup(f) {
    const c = J(), r = Tt(c, "item.", { exclude: ["item.actions", "item.image"] });
    L("panel"), L("user");
    const o = f, s = j(() => {
      const t = [];
      return (o.image || c["item.image"]) && t.push({ key: "image", title: "" }), t.concat(
        o.headers.reduce((u, l) => (u.push(
          typeof l == "string" ? { key: l, title: g(nt.field(l)) } : { key: l.key, title: g(l.title) }
        ), u), [])
      );
    });
    function i(t) {
      const u = {
        ...o.list.filters,
        page: t.page,
        page_size: t.itemsPerPage,
        ordering: t.sortBy.map(({ key: l, order: a }) => a == "asc" ? l : `-${l}`)
      };
      o.list.page_size = t.itemsPerPage, o.list.load({ params: u });
    }
    return (t, u) => {
      var l;
      return d(), y(Ot, {
        items: o.items,
        "item-index": "id",
        "items-length": o.list.count || o.items.length,
        "items-per-page": o.list.page_size,
        "hide-default-footer": (o.list.count || o.items.length || 0) < o.list.page_size,
        loading: (l = o.list.state) == null ? void 0 : l.isProcessing,
        headers: s.value,
        "no-data-text": e(g)("lists.empty"),
        class: "align-top-table",
        "onUpdate:options": i
      }, Y({
        "item.actions": n(({ item: a }) => [
          b(e(Te), {
            button: "",
            item: a,
            edit: o.edit
          }, null, 8, ["item", "edit"]),
          v(t.$slots, "item.actions", {
            item: a,
            dense: !0,
            button: !0
          })
        ]),
        _: 2
      }, [
        e(c)["item.image"] ? {
          name: "item.image",
          fn: n(({ item: a }) => [
            v(t.$slots, "item.image", { item: a }, () => [
              a[o.image] ? (d(), y(ye, {
                key: 0,
                src: a[o.image],
                class: "preview",
                cover: "",
                "max-height": "200"
              }, null, 8, ["src"])) : k("", !0)
            ])
          ]),
          key: "0"
        } : void 0,
        M(e(r), (a, p) => ({
          name: p,
          fn: n((m) => [
            v(t.$slots, p, P(T(m)))
          ])
        }))
      ]), 1032, ["items", "items-length", "items-per-page", "hide-default-footer", "loading", "headers", "no-data-text"]);
    };
  }
}), Zt = { class: "d-flex flex-no-wrap justify-space-between" }, el = { key: 0 }, tl = { key: 0 }, ll = /* @__PURE__ */ D({
  __name: "OxListCard",
  props: {
    /** ModelList used to display objects **/
    list: Object,
    /** List items (cf. {@link useModelList}) **/
    items: Array,
    /** Displayed fields, where the first value is set as title **/
    headers: Array,
    /** If True, display edit/view button **/
    edit: Boolean,
    /** Field name used as image **/
    image: String
  },
  setup(f) {
    const c = J(), r = Z(c, "item.", { exclude: ["item.actions", "item.image"] }), o = f, s = j(() => {
      if (!o.headers)
        return [];
      const t = [];
      for (var u of o.headers)
        u = typeof u == "string" ? { key: u, title: g("fields." + u) } : { ...u }, u.slot = `item.${u.key}`, t.push(u);
      return t;
    }), i = j(() => {
      var t;
      return /* @__PURE__ */ new Set([
        s.value[0].key,
        (t = s.value[1]) == null ? void 0 : t.key,
        o.image
      ]);
    });
    return se(() => !o.list.length && o.list.load()), (t, u) => (d(), y(Me, { class: "card-grid" }, {
      default: n(() => [
        (d(!0), $(O, null, M(o.items, (l) => {
          var a, p;
          return d(), y(Le, {
            key: l.id,
            density: "compact",
            title: s.value[0].key && l[s.value[0].key],
            subtitle: ((a = s.value[1]) == null ? void 0 : a.key) && l[s.value[1].key]
          }, Y({
            default: n(() => [
              H("div", Zt, [
                e(c)["item.image"] || o.image ? (d(), $("div", el, [
                  b(ht, {
                    rounded: "0",
                    size: "125"
                  }, {
                    default: n(() => [
                      v(t.$slots, "item.image", { item: l }, () => [
                        b(ye, {
                          src: o.image
                        }, null, 8, ["src"])
                      ], !0)
                    ]),
                    _: 2
                  }, 1024)
                ])) : k("", !0),
                H("div", null, [
                  !e(c)["item.default"] && (s.value.length > 2 || e(r).length) ? (d(), y(St, { key: 0 }, {
                    default: n(() => [
                      H("div", null, [
                        (d(!0), $(O, null, M(s.value, (m) => (d(), $(O, null, [
                          i.value.has(m.key) ? k("", !0) : (d(), $("div", tl, [
                            b(xt, {
                              text: m.title + ":",
                              class: "mr-2"
                            }, null, 8, ["text"]),
                            v(t.$slots, m.slot, { item: l }, () => [
                              e(fe.isEmpty)(l[m.key]) ? k("", !0) : (d(), $(O, { key: 0 }, [
                                I(R(l[m.key]), 1)
                              ], 64))
                            ], !0)
                          ]))
                        ], 64))), 256))
                      ])
                    ]),
                    _: 2
                  }, 1024)) : k("", !0),
                  b(Ct, null, {
                    default: n(() => [
                      b(e(Te), {
                        button: "",
                        item: l,
                        edit: o.edit,
                        size: "small"
                      }, null, 8, ["item", "edit"]),
                      v(t.$slots, "item.actions", {
                        item: l,
                        button: !0,
                        size: "small"
                      }, void 0, !0)
                    ]),
                    _: 2
                  }, 1024)
                ])
              ])
            ]),
            _: 2
          }, [
            e(c)[s.value[0].slot] ? {
              name: "title",
              fn: n(() => [
                v(t.$slots, s.value[0].slot, { item: l }, void 0, !0)
              ]),
              key: "0"
            } : void 0,
            e(c)[(p = s.value[1]) == null ? void 0 : p.slot] ? {
              name: "subtitle",
              fn: n(() => [
                v(t.$slots, s.value[1].slot, { item: l }, void 0, !0)
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["title", "subtitle"]);
        }), 128))
      ]),
      _: 3
    }));
  }
}), al = (f, c) => {
  const r = f.__vccOpts || f;
  for (const [o, s] of c)
    r[o] = s;
  return r;
}, Ie = /* @__PURE__ */ al(ll, [["__scopeId", "data-v-bea1c707"]]), ue = {
  __name: "OxStateAlert",
  props: {
    state: Object,
    delay: { type: Boolean, default: !1 },
    okTitle: { type: String, default: "" },
    noneTitle: { type: String, default: "" },
    errorTitle: { type: String, default: "Oups..." },
    processingTitle: { type: String, default: "Processing..." }
  },
  setup(f) {
    const c = J(), r = f;
    let o = q(!1);
    Q(() => r.state.state, (t) => {
      r.delay && t == Bt.PROCESSING && (o.value = !1, window.setTimeout(() => {
        o.value = !0;
      }, 5e3));
    });
    const s = j(() => {
      var t;
      return ((t = r.state) == null ? void 0 : t.isProcessing) && (!r.delay || o.value);
    }), i = j(() => {
      var t, u;
      return (u = (t = r.state) == null ? void 0 : t.data) == null ? void 0 : u.messages;
    });
    return (t, u) => (d(), $(O, null, [
      r.state.isNone && e(c).none ? (d(), y(e(le), {
        key: 0,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        state: f.state,
        title: f.noneTitle
      }, {
        default: n(() => [
          v(t.$slots, "none", { state: f.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : s.value ? (d(), y(e(le), {
        key: 1,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: f.state,
        title: f.processingTitle
      }, {
        default: n(() => [
          v(t.$slots, "processing", { state: f.state }, () => [
            u[0] || (u[0] = I(" Data are being sent to server, please be patient. If this message persist you might wan't to retry. ", -1))
          ])
        ]),
        _: 3
      }, 8, ["state", "title"])) : r.state.isError ? (d(), y(e(le), {
        key: 2,
        type: "error",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: f.state,
        title: f.errorTitle
      }, {
        default: n(() => [
          v(t.$slots, "error", { state: f.state }, () => [
            u[1] || (u[1] = I(" Oups... something wrong happened. ", -1))
          ]),
          v(t.$slots, "error-detail", { state: f.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : r.state.isOk ? (d(), y(e(le), {
        key: 3,
        type: "success",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: f.state,
        title: f.okTitle
      }, {
        default: n(() => [
          v(t.$slots, "ok", { state: f.state }, () => [
            u[2] || (u[2] = H("p", null, "Congrats! Data have been updated.", -1))
          ]),
          i.value ? (d(), $(O, { key: 0 }, [
            b(Ae),
            (d(!0), $(O, null, M(i.value, (l) => (d(), $("p", null, R(l), 1))), 256))
          ], 64)) : k("", !0),
          v(t.$slots, "ok-detail", { state: f.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : k("", !0),
      v(t.$slots, "default", {
        state: r.state
      })
    ], 64));
  }
}, sl = { class: "text-right" }, be = {
  __name: "OxValidationBtn",
  props: {
    resetLabel: String,
    resetIcon: { type: String, default: "mdi-close-circle" },
    validateLabel: String,
    validateIcon: { type: String, default: "mdi-content-save" },
    processingLabel: String,
    processingIcon: { type: String, default: "mdi-content-save" },
    disabled: { type: Boolean, default: !1 },
    state: { type: Object, default: () => State.none() },
    validateDisabled: { type: Boolean, default: !1 }
  },
  emits: ["validate", "reset"],
  setup(f, { emit: c }) {
    const r = c, o = f;
    return (s, i) => (d(), $("div", sl, [
      b(B, {
        color: "error",
        class: "me-2",
        "prepend-icon": o.resetIcon,
        onClick: i[0] || (i[0] = (t) => r("reset")),
        disabled: o.disabled
      }, {
        default: n(() => [
          v(s.$slots, "discard", {}, () => [
            I(R(o.resetLabel || e(pe)("actions.discard")), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]),
      o.state.isSending || o.state.isProcessing ? (d(), y(B, {
        key: 0,
        color: "primary",
        "prepend-icon": o.processingIcon,
        disabled: ""
      }, {
        default: n(() => [
          v(s.$slots, "processing", {}, () => [
            I(R(o.processingLabel || e(pe)("actions.saving")), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon"])) : (d(), y(B, {
        key: 1,
        color: "primary",
        "prepend-icon": o.validateIcon,
        onClick: i[1] || (i[1] = (t) => r("validate")),
        disabled: o.disabled || o.validateDisabled
      }, {
        default: n(() => [
          v(s.$slots, "validate", {}, () => [
            I(R(o.validateLabel || e(pe)("actions.save")), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]))
    ]));
  }
}, nl = { key: 0 }, ol = { class: "text-right mt-3" }, il = {
  __name: "OxLogin",
  props: {
    next: { type: String },
    url: { type: String }
  },
  emits: ["save", "saved"],
  setup(f, { emit: c }) {
    const r = Se("password"), o = f, s = ne({
      username: "",
      password: ""
    }), i = q(!1), t = ne(new It());
    function u(a = !0) {
      Et(s, { username: "", password: "" }), a && t.none();
    }
    async function l() {
      t.processing();
      try {
        const a = await fetch(o.url, {
          method: "POST",
          headers: jt.axiosConfig.headers,
          body: JSON.stringify(s)
        });
        a.status == 200 ? (s.credentials = "", s.password = "", t.ok(await a.json()), o.next && (window.location.href = o.next)) : t.error(await a.json());
      } catch (a) {
        t.ok((a == null ? void 0 : a.message) || a);
      }
    }
    return (a, p) => (d(), $(O, null, [
      b(e(ue), { state: t }, {
        none: n(({ state: m }) => [...p[7] || (p[7] = [
          H("p", null, "Please enter your credentials in order too proceed...", -1)
        ])]),
        "ok-detail": n(({ state: m }) => [
          o.next ? (d(), $("p", nl, [
            p[8] || (p[8] = I("You soon will be redirected to ", -1)),
            H("i", null, R(o.next), 1)
          ])) : k("", !0)
        ]),
        _: 1
      }, 8, ["state"]),
      t.isOk ? k("", !0) : (d(), $(O, { key: 0 }, [
        b(oe, {
          variant: "underlined",
          label: "Enter login",
          modelValue: s.username,
          "onUpdate:modelValue": p[0] || (p[0] = (m) => s.username = m),
          onKeyup: p[1] || (p[1] = ge(U((m) => r.value.focus(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue"]),
        b(oe, {
          variant: "underlined",
          ref: "password",
          label: "Enter password",
          modelValue: s.password,
          "onUpdate:modelValue": p[2] || (p[2] = (m) => s.password = m),
          type: i.value ? "text" : "password",
          "append-icon": i.value ? "mdi-eye" : "mdi-eye-off",
          "onClick:append": p[3] || (p[3] = (m) => i.value = !i.value),
          onKeyup: p[4] || (p[4] = ge(U((m) => l(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue", "type", "append-icon"]),
        H("div", ol, [
          v(a.$slots, "default", {
            value: s.password
          }, () => [
            s.username && s.password ? (d(), y(be, {
              key: 0,
              "validate-label": "Login!",
              onValidate: p[5] || (p[5] = (m) => l()),
              onReset: p[6] || (p[6] = (m) => u()),
              state: t
            }, null, 8, ["state"])) : k("", !0)
          ])
        ])
      ], 64))
    ], 64));
  }
}, je = /* @__PURE__ */ D({
  __name: "OxPanel",
  props: {
    index: {},
    view: {},
    value: {},
    state: {},
    help: {},
    name: {},
    title: {},
    icon: {}
  },
  setup(f) {
    const c = J(), r = f, o = Z(c, "views."), s = q(!1);
    se(() => {
      s.value = !0;
    }), Ke(() => {
      s.value = !1;
    });
    const i = L("panels"), t = L("panel");
    return (u, l) => (d(), $(O, null, [
      r.state ? (d(), y(ue, {
        key: 0,
        state: r.state,
        delay: ""
      }, null, 8, ["state"])) : k("", !0),
      e(c).prepend && e(i).panel == e(t).name ? v(u.$slots, "prepend", { key: 1 }) : k("", !0),
      b(_e, { class: "ma-4" }, {
        default: n(() => [
          (d(), y(ke, {
            to: "#app-bar-sheet-title",
            disabled: !s.value || e(i).panel != r.name
          }, [
            r.icon ? (d(), y(W, {
              key: 0,
              icon: r.icon
            }, null, 8, ["icon"])) : k("", !0),
            I(" " + R(r.title) + " ", 1),
            v(u.$slots, "append-title")
          ], 8, ["disabled"])),
          (d(), y(ke, {
            to: "#app-bar-right",
            disabled: !s.value || e(i).panel != r.name
          }, [
            v(u.$slots, "app-bar-right"),
            r.help ? (d(), y(B, {
              key: 0,
              class: "ml-3",
              href: r.help,
              panels: "new",
              icon: "mdi-information-outline"
            }, null, 8, ["href"])) : k("", !0)
          ], 8, ["disabled"])),
          v(u.$slots, "top"),
          v(u.$slots, "default", {}, () => [
            e(o) ? (d(), y(At, {
              key: 0,
              modelValue: e(t).view,
              "onUpdate:modelValue": l[0] || (l[0] = (a) => e(t).view = a)
            }, {
              default: n(() => [
                (d(!0), $(O, null, M(e(o), (a, p) => (d(), y(_t, {
                  key: a,
                  value: a
                }, {
                  default: n(() => [
                    v(u.$slots, p)
                  ]),
                  _: 2
                }, 1032, ["value"]))), 128))
              ]),
              _: 3
            }, 8, ["modelValue"])) : k("", !0)
          ]),
          v(u.$slots, "bottom")
        ]),
        _: 3
      }),
      e(c).append && e(i).panel == e(t).name ? v(u.$slots, "append", { key: 2 }) : k("", !0)
    ], 64));
  }
}), Ee = /* @__PURE__ */ D({
  __name: "OxView",
  props: {
    /** default tab title */
    title: String
  },
  setup(f) {
    const c = f, r = q(null), o = J(), s = Z(o, "tab.", { exclude: ["tab.default"] }), i = Z(o, "window.");
    return (t, u) => e(s) && Object.keys(e(s)).length ? (d(), $(O, { key: 0 }, [
      b(Lt, {
        modelValue: r.value,
        "onUpdate:modelValue": u[0] || (u[0] = (l) => r.value = l)
      }, {
        default: n(() => [
          e(o).default ? v(t.$slots, "tab", { key: 0 }, () => [
            b(we, {
              text: c == null ? void 0 : c.title,
              value: "default"
            }, null, 8, ["text"])
          ]) : k("", !0),
          (d(!0), $(O, null, M(e(s), (l, a) => (d(), y(we, { value: l }, {
            default: n(() => [
              v(t.$slots, a)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"]),
      b(Ce, {
        modelValue: r.value,
        "onUpdate:modelValue": u[1] || (u[1] = (l) => r.value = l)
      }, {
        default: n(() => [
          e(o).default ? (d(), y(ce, {
            key: 0,
            value: "default"
          }, {
            default: n(() => [
              v(t.$slots, "default")
            ]),
            _: 3
          })) : k("", !0),
          (d(!0), $(O, null, M(e(i), (l, a) => (d(), y(ce, { value: l }, {
            default: n(() => [
              v(t.$slots, a)
            ]),
            _: 2
          }, 1032, ["value"]))), 256))
        ]),
        _: 3
      }, 8, ["modelValue"])
    ], 64)) : v(t.$slots, "default", { key: 1 });
  }
}), Fe = /* @__PURE__ */ D({
  __name: "OxModelEditor",
  props: {
    repo: {},
    initial: {},
    name: {},
    url: {},
    saved: { type: Function }
  },
  setup(f, { expose: c }) {
    const r = q(null), o = L("user"), s = f, { editor: i, edited: t } = ot({ props: s }), u = j(() => o.can([i.repo.use, "change", s.initial])), l = j(() => ({
      editor: i,
      edited: t.value,
      form: r.value,
      editable: u.value,
      disabled: !u.value,
      value: i.value,
      model: i.repo.use
    }));
    return Q(() => i.errors && Object.values(i.errors), () => r.value.validate()), c({ editor: i, edited: t, form: r, editable: u }), (a, p) => (d(), $(O, null, [
      v(a.$slots, "prepend", P(T(l.value))),
      b(ve, {
        ref_key: "form",
        ref: r,
        modelValue: e(i).valid,
        "onUpdate:modelValue": p[0] || (p[0] = (m) => e(i).valid = m),
        disabled: !u.value
      }, {
        default: n(() => [
          v(a.$slots, "default", P(T(l.value)))
        ]),
        _: 3
      }, 8, ["modelValue", "disabled"]),
      v(a.$slots, "append", P(T(l.value)))
    ], 64));
  }
}), rl = { key: 0 }, ul = /* @__PURE__ */ D({
  __name: "OxModelEdit",
  props: {
    sendFormData: { type: Boolean },
    hideValidationBtn: { type: Boolean },
    repo: {},
    initial: {},
    name: {},
    url: {},
    saved: { type: Function }
  },
  emits: "saved",
  setup(f, { expose: c, emit: r }) {
    const o = r, s = f, i = q(null), t = j(() => {
      const { sendFormData: a, hideValidationBtn: p, ...m } = s;
      return m;
    });
    function u() {
      i.value.editor.reset(s.initial);
    }
    async function l() {
      const a = i.value, p = s.sendFormData ? await a.editor.save(new FormData(a.form.$el)) : await a.editor.save();
      return o("saved", i.value.editor), p;
    }
    return c({
      save: l,
      reset: u,
      get editor() {
        return i.value.editor;
      },
      get edited() {
        return i.value.edited;
      },
      get editable() {
        return i.value.editable;
      },
      get form() {
        return i.value.form;
      }
    }), (a, p) => {
      var m;
      return d(), $(O, null, [
        (m = i.value) != null && m.editor ? (d(), y(ue, {
          key: 0,
          state: i.value.editor.state
        }, null, 8, ["state"])) : k("", !0),
        b(Me, { class: "ox-model-edit" }, {
          default: n(() => [
            b(e(Fe), C({
              ref_key: "modelEditor",
              ref: i
            }, t.value), {
              prepend: n((V) => [
                s.hideValidationBtn ? k("", !0) : (d(), $("div", rl, [
                  v(a.$slots, "prepend", C(V, {
                    save: l,
                    reset: u
                  }), () => [
                    V.editable && V.edited ? (d(), y(be, {
                      key: 0,
                      onValidate: p[0] || (p[0] = (_) => l()),
                      onReset: p[1] || (p[1] = (_) => u()),
                      state: V.editor.state,
                      "validate-disabled": V.editor.valid === !1
                    }, null, 8, ["state", "validate-disabled"])) : k("", !0)
                  ])
                ]))
              ]),
              default: n((V) => [
                v(a.$slots, "default", C(V, {
                  save: l,
                  reset: u
                }))
              ]),
              append: n((V) => [
                v(a.$slots, "append", C(V, {
                  save: l,
                  reset: u
                }))
              ]),
              _: 3
            }, 16)
          ]),
          _: 3
        })
      ], 64);
    };
  }
}), dl = /* @__PURE__ */ D({
  __name: "OxModelPanel",
  props: {
    repo: {},
    view: {},
    headers: {},
    relations: {},
    showFilters: { type: Boolean },
    fetchRelations: { type: Boolean, default: !0 },
    search: { default: "search" },
    warning: {},
    index: { default: "list.table" },
    value: {},
    state: {},
    help: {},
    name: {},
    title: {},
    icon: {}
  },
  setup(f, { expose: c }) {
    const r = J(), o = Z(r, "views.list."), s = Z(r, "item."), i = Z(r, "views.detail.edit."), t = j(() => !!Object.keys(i).length), u = Se("filters"), l = f, a = L("context"), p = L("user"), { panel: m, list: V, items: _, next: E, prev: N } = L("panel") ?? it({ props: l }), G = m.panels;
    j(() => {
      var h;
      return a.user.can([m.model, (h = m.value) != null && h.id ? "change" : "add"]);
    });
    const { showFilters: K } = We(m), S = j(() => [
      ...l.headers,
      { key: "actions", title: g("actions") }
    ]);
    function A(h) {
      h = new l.repo.use(h), m.show({ view: m.view, value: h }), V.load();
    }
    const x = j(() => ({
      panel: m,
      panels: G,
      list: V,
      items: _,
      context: a,
      saved: A,
      value: m.value
    }));
    return Q(() => Object.values(V.filters), () => V.load()), c({ list: V, panel: m, items: _, next: E, prev: N }), (h, w) => (d(), y(e(je), {
      name: l.name,
      title: e(m).title,
      icon: e(m).icon,
      state: e(V).state,
      index: l.index
    }, Y({
      "app-bar-right": n(() => [
        v(h.$slots, "app-bar-right", P(T(x.value))),
        e(m).view.startsWith("list.") ? (d(), y(Ve, {
          key: 0,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: n(() => [
            v(h.$slots, "nav.list", P(T(x.value))),
            b(B, {
              title: e(g)("actions.list.reload"),
              "aria-label": e(g)("actions.list.reload"),
              onClick: w[0] || (w[0] = (F) => e(V).load())
            }, {
              default: n(() => [
                b(W, null, {
                  default: n(() => [...w[10] || (w[10] = [
                    I("mdi-reload", -1)
                  ])]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["title", "aria-label"]),
            u.value ? (d(), y(B, {
              key: 0,
              title: e(K) ? e(g)("filters.hide") : e(g)("filters.show"),
              "aria-label": e(K) ? e(g)("filters.hide") : e(g)("filters.show"),
              onClick: w[1] || (w[1] = (F) => K.value = !e(K)),
              active: e(K)
            }, {
              default: n(() => [
                b(W, {
                  icon: u.value.icon
                }, null, 8, ["icon"])
              ]),
              _: 1
            }, 8, ["title", "aria-label", "active"])) : k("", !0)
          ]),
          _: 3
        })) : e(m).view.startsWith("detail.") && e(m).value ? (d(), y(Ve, {
          key: 1,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal"
        }, {
          default: n(() => [
            v(h.$slots, "nav.detail", P(T(x.value))),
            e(m).view == "detail.edit" && e(m).value ? (d(), y(Mt, { key: 0 }, {
              activator: n(({ props: F }) => [
                b(B, C({ "prepend-icon": "mdi-dots-vertical" }, F), {
                  default: n(() => [
                    I(R(e(g)("actions")), 1)
                  ]),
                  _: 2
                }, 1040)
              ]),
              default: n(() => [
                b(te, null, {
                  default: n(() => [
                    v(h.$slots, "item.actions", {
                      item: e(m).value
                    })
                  ]),
                  _: 3
                })
              ]),
              _: 3
            })) : k("", !0),
            b(B, {
              disabled: !e(N),
              title: e(g)("prev"),
              "aria-label": e(g)("prev"),
              onClick: w[2] || (w[2] = U((F) => e(m).show({ view: e(m).view, value: e(N) }), ["stop"]))
            }, {
              default: n(() => [
                b(W, { icon: "mdi-chevron-left" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"]),
            b(B, {
              disabled: !e(E),
              title: e(g)("next"),
              "aria-label": e(g)("next"),
              onClick: w[3] || (w[3] = U((F) => e(m).show({ view: e(m).view, value: e(E) }), ["stop"]))
            }, {
              default: n(() => [
                b(W, { icon: "mdi-chevron-right" })
              ]),
              _: 1
            }, 8, ["disabled", "title", "aria-label"])
          ]),
          _: 3
        })) : k("", !0),
        b(Pt, {
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal",
          mandatory: "",
          modelValue: e(m).view,
          "onUpdate:modelValue": w[9] || (w[9] = (F) => e(m).view = F)
        }, {
          default: n(() => {
            var F;
            return [
              b(B, {
                value: "list.table",
                onClickCapture: w[4] || (w[4] = U((z) => e(m).show({ view: "list.table" }), ["stop"])),
                title: e(g)("panels.nav.table"),
                "aria-label": e(g)("panels.nav.table")
              }, {
                default: n(() => [
                  b(W, null, {
                    default: n(() => [...w[11] || (w[11] = [
                      I("mdi-table", -1)
                    ])]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"]),
              b(B, {
                value: "list.cards",
                onClickCapture: w[5] || (w[5] = U((z) => e(m).show({ view: "list.cards" }), ["stop"])),
                title: e(g)("panels.nav.cards"),
                "aria-label": e(g)("panels.nav.cards")
              }, {
                default: n(() => [
                  b(W, null, {
                    default: n(() => [...w[12] || (w[12] = [
                      I("mdi-view-grid", -1)
                    ])]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"]),
              e(r)["views.list.kanban"] ? (d(), y(B, {
                key: 0,
                value: "list.kanban",
                onClickCapture: w[6] || (w[6] = U((z) => e(m).show({ view: "list.kanban" }), ["stop"])),
                title: e(g)("panels.nav.kanban"),
                "aria-label": e(g)("panels.nav.kanban")
              }, {
                default: n(() => [
                  b(W, null, {
                    default: n(() => [...w[13] || (w[13] = [
                      I("mdi-view-column", -1)
                    ])]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : k("", !0),
              t.value ? (d(), y(B, {
                key: 1,
                value: "detail.edit",
                onClickCapture: w[7] || (w[7] = U((z) => e(m).show({ view: "detail.edit", value: e(m).value }), ["stop"])),
                disabled: !((F = e(m).value) != null && F.id) && e(m).view != "detail.edit",
                title: e(g)("panels.nav.edit"),
                "aria-label": e(g)("panels.nav.edit")
              }, {
                default: n(() => [
                  e(p).can([e(m).model, "change"]) ? (d(), y(W, { key: 0 }, {
                    default: n(() => [...w[14] || (w[14] = [
                      I("mdi-pencil", -1)
                    ])]),
                    _: 1
                  })) : (d(), y(W, { key: 1 }, {
                    default: n(() => [...w[15] || (w[15] = [
                      I("mdi-eye", -1)
                    ])]),
                    _: 1
                  }))
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"])) : k("", !0),
              t.value && e(p).can([e(m).model, "add"]) ? (d(), y(B, {
                key: 2,
                value: "detail.add",
                onClickCapture: w[8] || (w[8] = U((z) => e(m).create(), ["stop"])),
                title: e(g)("panels.nav.add"),
                "aria-label": e(g)("panels.nav.add")
              }, {
                default: n(() => [
                  b(W, null, {
                    default: n(() => [...w[16] || (w[16] = [
                      I("mdi-plus-box", -1)
                    ])]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title", "aria-label"])) : k("", !0),
              v(h.$slots, "nav.views", P(T(x.value)))
            ];
          }),
          _: 3
        }, 8, ["modelValue"]),
        v(h.$slots, "app-bar-end", P(T(x.value)))
      ]),
      top: n(() => [
        l.warning ? (d(), y(le, {
          key: 0,
          type: "warning",
          variant: "tonal",
          text: l.warning
        }, null, 8, ["text"])) : k("", !0),
        v(h.$slots, "top"),
        Ge(b(e(Pe), {
          ref_key: "filters",
          ref: u,
          search: l.search,
          "teleport-to": "#panel-list-actions"
        }, {
          default: n((F) => [
            v(h.$slots, "list.filters", P(T(F)))
          ]),
          _: 3
        }, 8, ["search"]), [
          [Qe, e(m).view.startsWith("list.") && e(K)]
        ])
      ]),
      _: 2
    }, [
      e(r)["append-title"] ? {
        name: "append-title",
        fn: n(() => [
          v(h.$slots, "append-title", P(T(x.value)))
        ]),
        key: "0"
      } : void 0,
      e(r).prepend ? {
        name: "prepend",
        fn: n(() => [
          v(h.$slots, "prepend", P(T(x.value)))
        ]),
        key: "1"
      } : void 0,
      e(r).append ? {
        name: "append",
        fn: n(() => [
          v(h.$slots, "append", P(T(x.value)))
        ]),
        key: "2"
      } : void 0,
      e(r)["views.list.table"] ? void 0 : {
        name: "views.list.table",
        fn: n(() => [
          b(e(Be), {
            list: e(V),
            items: e(_),
            headers: S.value,
            edit: t.value
          }, Y({ _: 2 }, [
            M(e(s), (F, z) => ({
              name: z,
              fn: n((de) => [
                v(h.$slots, z, P(T(de)))
              ])
            }))
          ]), 1032, ["list", "items", "headers", "edit"])
        ]),
        key: "3"
      },
      e(r)["views.list.cards"] ? void 0 : {
        name: "views.list.cards",
        fn: n(() => [
          b(e(Ie), {
            list: e(V),
            items: e(_),
            edit: t.value,
            headers: l.headers
          }, Y({ _: 2 }, [
            M(e(s), (F, z) => ({
              name: z,
              fn: n((de) => [
                v(h.$slots, z, P(T(de)))
              ])
            }))
          ]), 1032, ["list", "items", "edit", "headers"])
        ]),
        key: "4"
      },
      M(e(o), (F, z) => ({
        name: z,
        fn: n(() => [
          v(h.$slots, z, P(T(x.value)))
        ])
      })),
      t.value ? {
        name: "views.detail.edit",
        fn: n(() => [
          b(e(Ee), {
            title: e(g)(`models.${e(m).model.entity}`)
          }, Y({ _: 2 }, [
            M(e(i), (F, z) => ({
              name: F,
              fn: n(() => [
                v(h.$slots, z, P(T(x.value)))
              ])
            }))
          ]), 1032, ["title"])
        ]),
        key: "5"
      } : void 0
    ]), 1032, ["name", "title", "icon", "state", "index"]));
  }
}), pl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OxAction: ae,
  OxActionModelDelete: Ut,
  OxActionPost: Dt,
  OxApp: qt,
  OxAutocomplete: Wt,
  OxComponent: Gt,
  OxField: Qt,
  OxFormList: Yt,
  OxListCard: Ie,
  OxListFilters: Pe,
  OxListKanban: Xt,
  OxListTable: Be,
  OxLogin: il,
  OxModelEdit: ul,
  OxModelEditor: Fe,
  OxModelList: Ht,
  OxModelPanel: dl,
  OxPanel: je,
  OxStateAlert: ue,
  OxValidationBtn: be,
  OxView: Ee
}, Symbol.toStringTag, { value: "Module" })), gl = {
  el: "#app",
  delimiters: ["[[", "]]"],
  components: { ...pl, ...Ft }
};
export {
  gl as App,
  ae as OxAction,
  Ut as OxActionModelDelete,
  Dt as OxActionPost,
  qt as OxApp,
  Wt as OxAutocomplete,
  Gt as OxComponent,
  Qt as OxField,
  Yt as OxFormList,
  Ie as OxListCard,
  Pe as OxListFilters,
  Xt as OxListKanban,
  Be as OxListTable,
  il as OxLogin,
  ul as OxModelEdit,
  Fe as OxModelEditor,
  Ht as OxModelList,
  dl as OxModelPanel,
  je as OxPanel,
  ue as OxStateAlert,
  be as OxValidationBtn,
  Ee as OxView
};
//# sourceMappingURL=components.js.map
