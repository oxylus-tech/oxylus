import { defineComponent as R, inject as B, unref as e, openBlock as u, createElementBlock as $, Fragment as O, createBlock as b, withModifiers as I, createCommentVNode as w, useSlots as E, renderSlot as v, normalizeProps as T, guardReactiveProps as _, reactive as Y, withCtx as i, createVNode as m, createTextVNode as A, toDisplayString as D, createElementVNode as N, createSlots as W, shallowRef as Ve, computed as P, watch as G, h as Se, renderList as L, normalizeClass as Oe, ref as z, onMounted as xe, Teleport as he, useModel as Ce, mergeProps as U, toRefs as Ae, useTemplateRef as Pe, withDirectives as Te, vShow as _e } from "vue";
import { al as Be, J as C, _ as le, aN as ae, am as Le, at as ue, ao as Ie, B as je, E as De, F as q, H as Me, Y as j, a6 as Ee, a2 as Ne, a0 as Ue, a9 as de, aj as Fe, aO as We, ab as Q, w as Ge, aP as Re, aQ as ze, aR as Ke, a4 as pe, aS as He, K as Je, aT as Xe, Z as ce, aM as F, W as Ye, a5 as qe, b as Qe, aL as Ze, V as H, X as et, S as tt, r as lt, ad as at, aE as me, aa as Z, a8 as st, a7 as nt, ax as ie, aH as it, ay as ot, aU as oe, a1 as rt, aV as ut, aW as dt, aX as J, aD as pt } from "./index-D-l-KBZO.js";
import "axios";
const se = /* @__PURE__ */ R({
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
  setup(d, { emit: s }) {
    const t = d, l = s, o = B("context"), { processing: p, permissions: r, allowed: n, run: a } = Be(t, { user: o.user, emits: l });
    return (c, f) => e(n) ? (u(), $(O, { key: 0 }, [
      t.button ? (u(), b(C, {
        key: 0,
        variant: "text",
        color: t.color,
        icon: t.icon,
        title: t.title,
        "aria-label": t.title,
        onClick: I(e(a), ["stop"])
      }, null, 8, ["color", "icon", "title", "aria-label", "onClick"])) : (u(), b(le, {
        key: 1,
        title: t.title,
        "base-color": t.color,
        "prepend-icon": t.icon,
        onClick: I(e(a), ["stop"])
      }, null, 8, ["title", "base-color", "prepend-icon", "onClick"]))
    ], 64)) : w("", !0);
  }
}), ct = /* @__PURE__ */ R({
  __name: "OxActionModelDelete",
  props: {
    item: {},
    button: { type: Boolean }
  },
  setup(d) {
    const { t: s } = ae(), t = B("panel"), l = B("repos"), o = d, p = Le({
      repo: l[o.item.constructor.entity],
      method: "delete",
      options: (r, n) => ({ delete: o.item.id })
    });
    return (r, n) => (u(), b(se, {
      item: o.item,
      button: o.button,
      icon: "mdi-delete",
      color: "error",
      title: e(s)("actions.delete"),
      confirm: e(s)("actions.delete.confirm"),
      permissions: ["delete", (a, c) => c.id],
      run: e(p),
      onCompleted: n[0] || (n[0] = (a) => {
        var c;
        return (c = e(t)) == null ? void 0 : c.reset("");
      })
    }, null, 8, ["item", "button", "title", "confirm", "permissions", "run"]));
  }
}), mt = {
  __name: "OxActions",
  props: {
    // Action's Props
    value: Object,
    dense: { type: Boolean, default: !1 },
    button: { type: Boolean, default: !1 },
    exclude: { type: Array }
  },
  setup(d) {
    E();
    const s = d;
    return (t, l) => (u(), $(O, null, [
      v(t.$slots, "before", T(_(s))),
      v(t.$slots, "default", T(_(s))),
      v(t.$slots, "after", T(_(s)))
    ], 64));
  }
};
var re;
const vt = /* @__PURE__ */ R({
  __name: "OxApp",
  props: {
    apiUrl: {},
    dataEl: { default: (re = document.body.dataset) == null ? void 0 : re.appData },
    models: {},
    data: {}
  },
  setup(d) {
    const { t: s } = ue(), t = E(), l = d, o = Y({
      drawer: !0
    }), p = Ie(l);
    return (r, n) => (u(), b(je, null, {
      default: i(() => [
        m(De, { color: "primary" }, {
          prepend: i(() => [
            m(q, {
              icon: "mdi-apps",
              title: e(s)("nav.panels"),
              "aria-label": e(s)("nav.panels"),
              onClick: n[0] || (n[0] = I((a) => o.drawer = !o.drawer, ["stop"]))
            }, null, 8, ["title", "aria-label"]),
            e(t)["app-nav"] && !o.drawer2 ? (u(), b(q, {
              key: 0,
              icon: "mdi-menu",
              onClick: n[1] || (n[1] = (a) => {
                o.drawer2 = !0, o.drawer = !1;
              })
            })) : w("", !0)
          ]),
          default: i(() => [
            m(Me, null, {
              default: i(() => {
                var a;
                return [
                  (a = e(p).panel) != null && a.title ? (u(), $(O, { key: 0 }, [
                    e(p).panel.icon ? (u(), b(j, {
                      key: 0,
                      icon: e(p).panel.icon
                    }, null, 8, ["icon"])) : w("", !0),
                    A(" " + D(e(p).panel.title), 1)
                  ], 64)) : v(r.$slots, "title", {
                    key: 1,
                    context: e(p)
                  })
                ];
              }),
              _: 3
            }),
            m(Ee),
            n[4] || (n[4] = N("div", {
              id: "app-bar-right",
              class: "mr-3"
            }, null, -1)),
            v(r.$slots, "app-bar-right", { context: e(p) })
          ]),
          _: 3
        }),
        e(t)["nav-list"] ? (u(), b(Ne, {
          key: 0,
          theme: "dark",
          modelValue: o.drawer,
          "onUpdate:modelValue": n[2] || (n[2] = (a) => o.drawer = a)
        }, W({
          default: i(() => [
            v(r.$slots, "nav-start", { context: e(p) }),
            v(r.$slots, "nav-list", { context: e(p) }),
            v(r.$slots, "nav-end", { context: e(p) })
          ]),
          _: 2
        }, [
          e(t)["app-nav"] ? {
            name: "append",
            fn: i(() => [
              n[5] || (n[5] = N("div", { class: "text-right pa-3" }, null, -1))
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue"])) : w("", !0),
        m(Ue, null, {
          default: i(() => [
            m(de, {
              modelValue: e(p).panel.name,
              "onUpdate:modelValue": n[3] || (n[3] = (a) => e(p).panel.name = a)
            }, {
              default: i(() => [
                v(r.$slots, "default", { context: e(p) })
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
}), ft = {
  props: {
    src: String,
    is: String
  },
  setup(d) {
    const s = Ve(null), t = P(() => {
      if (d.is)
        return d.is;
      let o = d.src.substring(d.src.lastIndexOf("/") + 1);
      if (o && (o = o.substring(0, o.indexOf("."))), !o)
        throw Error(
          "`is` not provided and could not be deducted from `src`."
        );
      return o;
    });
    function l() {
      s.value = Fe(d.src, t.value);
    }
    return G(() => d.src, l), l(), () => Se(s.value, d);
  }
}, bt = { class: "password-error" }, ee = {
  __name: "OxFieldDetails",
  props: {
    state: Object,
    errors: Array
  },
  setup(d) {
    const s = d;
    return (t, l) => s.errors ? (u(!0), $(O, { key: 0 }, L(s.errors, (o) => (u(), $("div", bt, [
      m(j, { icon: "mdi-alert-circle-outline" }),
      A(" " + D(o), 1)
    ]))), 256)) : w("", !0);
  }
}, ve = {
  __name: "OxListFilters",
  props: {
    search: String,
    list: Object
  },
  setup(d, { expose: s }) {
    const { t } = ue(), l = d, o = P(() => l.list.filters && Object.entries(l.list.filters).some(([n, a]) => !n.startsWith("page") && !n.startsWith("ordering") && !!a)), p = P(() => o.value ? "mdi-filter-check" : "mdi-filter-outline");
    function r() {
      l.list.filters = {}, l.list.fetch();
    }
    return s({ icon: p, hasFilters: o, reset: r }), (n, a) => (u(), $("form", {
      onSubmit: a[2] || (a[2] = I((c) => d.list.fetch(), ["prevent"])),
      class: "width-full"
    }, [
      m(We, {
        dense: "",
        color: "transparent"
      }, {
        default: i(() => [
          m(q, {
            icon: p.value,
            readonly: ""
          }, null, 8, ["icon"]),
          l.search && l.list.filters ? (u(), b(Q, {
            key: 0,
            label: e(t)("filters.search"),
            density: "compact",
            class: "ml-2",
            modelValue: l.list.filters[l.search],
            "onUpdate:modelValue": a[0] || (a[0] = (c) => l.list.filters[l.search] = c),
            "hide-details": ""
          }, null, 8, ["label", "modelValue"])) : w("", !0),
          v(n.$slots, "default", {
            list: d.list,
            filters: d.list.filters
          }),
          m(C, {
            onClick: a[1] || (a[1] = I((c) => d.list.fetch(), ["stop"])),
            class: "ml-2",
            icon: "mdi-check",
            "aria-label": n.$t("filters.apply"),
            title: e(t)("filters.apply")
          }, null, 8, ["aria-label", "title"]),
          o.value ? (u(), b(C, {
            key: 1,
            onClick: I(r, ["stop"]),
            icon: "mdi-backspace",
            "aria-label": e(t)("filters.reset"),
            title: e(t)("filters.reset")
          }, null, 8, ["aria-label", "title"])) : w("", !0)
        ]),
        _: 3
      })
    ], 32));
  }
}, yt = Ge()({
  name: "VSlideGroupItem",
  props: Re(),
  emits: {
    "group:selected": (d) => !0
  },
  setup(d, s) {
    let {
      slots: t
    } = s;
    const l = ze(d, Ke);
    return () => {
      var o;
      return (o = t.default) == null ? void 0 : o.call(t, {
        isSelected: l.isSelected.value,
        select: l.select,
        toggle: l.toggle,
        selectedClass: l.selectedClass.value
      });
    };
  }
}), gt = {
  __name: "OxListKanban",
  props: {
    items: Array,
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
  setup(d, { emit: s }) {
    const t = s, l = d;
    function o(n) {
      return n = n % l.colors.length, l.colorVariant ? l.colors[n] + "-" + l.colorVariant : l.colors[n];
    }
    function p(n, a, c) {
      n[c] ? !n[c].includes(a) && n[c].push(a) : n[c] = [a];
    }
    const r = P(() => {
      const n = {};
      if (l.items)
        for (var a of l.items) {
          const f = a[l.field];
          if (Array.isArray(f))
            if (f.length)
              for (var c of f)
                p(n, a, c);
            else
              p(n, a, null);
          else
            p(n, a, f);
        }
      return n;
    });
    return (n, a) => (u(), b(pe, null, {
      default: i(() => [
        m(He, null, {
          default: i(() => [
            (u(!0), $(O, null, L(l.headers, (c, f) => (u(), b(yt, {
              key: c.value
            }, {
              default: i(({ selectedClass: x }) => [
                m(Je, {
                  width: "400",
                  class: Oe(["ma-3", x]),
                  color: o(f),
                  lines: "two"
                }, {
                  default: i(() => [
                    m(Xe, null, {
                      default: i(() => [
                        A(D(c.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    m(ce, {
                      "bg-color": o(f)
                    }, {
                      default: i(() => [
                        r.value && r.value[c.value] ? (u(!0), $(O, { key: 0 }, L(r.value[c.value], (y) => v(n.$slots, "item", {
                          key: y.id,
                          header: c,
                          item: y
                        }, () => [
                          m(le, {
                            title: y[l.itemTitle],
                            value: l.itemValue && y[l.itemValue],
                            onClick: (V) => t("click", y)
                          }, {
                            append: i(() => [
                              v(n.$slots, "item.action")
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
}, fe = /* @__PURE__ */ R({
  __name: "OxListTable",
  props: {
    list: Object,
    headers: Array,
    edit: Boolean
  },
  setup(d) {
    const { t: s } = ae(), t = E(), l = F(t, "item.", { exclude: ["item.actions"] }), o = B("panel"), p = new Qe("change"), r = d;
    function n(c) {
      return r.list.fetch({
        filters: {
          page: c.page,
          page_size: c.itemsPerPage,
          ordering: c.sortBy.map(({ key: f, order: x }) => x == "asc" ? f : `-${f}`)
        }
      });
    }
    function a(c, f) {
      o.reset(".edit", f);
    }
    return (c, f) => {
      var x;
      return u(), b(Ye, {
        items: r.list.items,
        "item-index": "id",
        "items-length": r.list.count || r.list.items.length,
        loading: (x = r.list.state) == null ? void 0 : x.isProcessing,
        headers: r.headers,
        "onUpdate:options": n
      }, W({
        loading: i(() => [
          m(qe, { type: "table-row@10" })
        ]),
        "item.actions": i(({ item: y }) => [
          d.edit ? (u(), b(se, {
            key: 0,
            icon: "mdi-pencil",
            button: "",
            title: e(s)("actions.edit"),
            onClick: I((V) => e(o).reset(".edit", y), ["stop"]),
            permissions: e(p),
            item: y,
            run: a
          }, null, 8, ["title", "onClick", "permissions", "item"])) : w("", !0),
          v(c.$slots, "item.actions", {
            value: y,
            dense: !0,
            button: !0
          })
        ]),
        _: 2
      }, [
        L(e(l), (y, V) => ({
          name: V,
          fn: i((X) => [
            v(c.$slots, V, T(_(X)))
          ])
        }))
      ]), 1032, ["items", "items-length", "loading", "headers"]);
    };
  }
}), ne = {
  __name: "OxStateAlert",
  props: {
    state: Object,
    delay: { type: Boolean, default: !1 },
    okTitle: { type: String, default: "" },
    noneTitle: { type: String, default: "" },
    errorTitle: { type: String, default: "Oups..." },
    processingTitle: { type: String, default: "Processing..." }
  },
  setup(d) {
    const s = E(), t = d;
    let l = z(!1);
    G(() => t.state.state, (r) => {
      t.delay && r == Ze.PROCESSING && (l.value = !1, window.setTimeout(() => {
        l.value = !0;
      }, 5e3));
    });
    const o = P(() => {
      var r;
      return ((r = t.state) == null ? void 0 : r.isProcessing) && (!t.delay || l.value);
    }), p = P(() => {
      var r, n;
      return (n = (r = t.state) == null ? void 0 : r.data) == null ? void 0 : n.messages;
    });
    return (r, n) => (u(), $(O, null, [
      t.state.isNone && e(s).none ? (u(), b(e(H), {
        key: 0,
        type: "info",
        variant: "outline",
        class: "mb-3",
        state: d.state,
        title: d.noneTitle
      }, {
        default: i(() => [
          v(r.$slots, "none", { state: d.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : o.value ? (u(), b(e(H), {
        key: 1,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: d.state,
        title: d.processingTitle
      }, {
        default: i(() => [
          v(r.$slots, "processing", { state: d.state }, () => [
            n[0] || (n[0] = A(" Data are being sent to server, please be patient. If this message persist you might wan't to retry. "))
          ])
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isError ? (u(), b(e(H), {
        key: 2,
        type: "error",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: d.state,
        title: d.errorTitle
      }, {
        default: i(() => [
          v(r.$slots, "error", { state: d.state }, () => [
            n[1] || (n[1] = A(" Oups... something wrong happened. "))
          ]),
          v(r.$slots, "error-detail", { state: d.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isOk ? (u(), b(e(H), {
        key: 3,
        type: "success",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: d.state,
        title: d.okTitle
      }, {
        default: i(() => [
          v(r.$slots, "ok", { state: d.state }, () => [
            n[2] || (n[2] = N("p", null, "Congrats! Data have been updated.", -1))
          ]),
          p.value ? (u(), $(O, { key: 0 }, [
            m(et),
            (u(!0), $(O, null, L(p.value, (a) => (u(), $("p", null, D(a), 1))), 256))
          ], 64)) : w("", !0),
          v(r.$slots, "ok-detail", { state: d.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : w("", !0),
      v(r.$slots, "default", {
        state: t.state
      })
    ], 64));
  }
}, wt = { class: "text-right" }, be = {
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
  setup(d, { emit: s }) {
    const t = s, l = d;
    return (o, p) => (u(), $("div", wt, [
      m(e(C), {
        color: "error",
        class: "me-2",
        "prepend-icon": l.resetIcon,
        onClick: p[0] || (p[0] = (r) => t("reset")),
        disabled: l.disabled
      }, {
        default: i(() => [
          v(o.$slots, "reset", {}, () => [
            A(D(l.resetLabel), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]),
      l.state.isSending ? (u(), b(e(C), {
        key: 0,
        color: "primary",
        "prepend-icon": "mdi-content-save",
        disabled: ""
      }, {
        default: i(() => p[2] || (p[2] = [
          A(" Saving ")
        ])),
        _: 1
      })) : (u(), b(e(C), {
        key: 1,
        color: "primary",
        "prepend-icon": l.validateIcon,
        onClick: p[1] || (p[1] = (r) => t("validate")),
        disabled: l.disabled || l.validateDisabled
      }, {
        default: i(() => [
          v(o.$slots, "validate", {}, () => [
            A(D(l.validateLabel), 1)
          ])
        ]),
        _: 3
      }, 8, ["prepend-icon", "disabled"]))
    ]));
  }
}, kt = { key: 0 }, $t = { class: "text-right mt-3" }, Vt = {
  __name: "OxLogin",
  props: {
    next: { type: String }
  },
  emits: ["save", "saved"],
  setup(d, { emit: s }) {
    B("repos");
    const t = d, l = Y({
      username: "",
      password: ""
    }), o = z(!1), p = Y(new tt());
    function r(a = !0) {
      lt(l, { username: "", password: "" }), a && p.none();
    }
    async function n() {
      p.processing();
      try {
        const a = await fetch("/api/ox/core/account/login/", {
          method: "POST",
          headers: at.axiosConfig.headers,
          body: JSON.stringify(l)
        });
        a.status == 200 ? (l.credentials = "", l.password = "", p.ok(await a.json()), t.next && (window.location.href = t.next)) : p.error(await a.json());
      } catch (a) {
        p.ok((a == null ? void 0 : a.message) || a);
      }
    }
    return (a, c) => (u(), $(O, null, [
      m(e(ne), { state: p }, {
        none: i(({ state: f }) => c[5] || (c[5] = [
          N("p", null, "Please enter your credentials in order too proceed...", -1)
        ])),
        "ok-detail": i(({ state: f }) => [
          t.next ? (u(), $("p", kt, [
            c[6] || (c[6] = A("You soon will be redirected to ")),
            N("i", null, D(t.next), 1)
          ])) : w("", !0)
        ]),
        error: i(({ state: f }) => {
          var x, y;
          return [
            m(ee, {
              errors: (x = f.data) == null ? void 0 : x.username
            }, null, 8, ["errors"]),
            m(ee, {
              errors: (y = f.data) == null ? void 0 : y.password
            }, null, 8, ["errors"])
          ];
        }),
        _: 1
      }, 8, ["state"]),
      p.isOk ? w("", !0) : (u(), $(O, { key: 0 }, [
        m(Q, {
          variant: "underlined",
          label: "Enter login",
          modelValue: l.username,
          "onUpdate:modelValue": c[0] || (c[0] = (f) => l.username = f)
        }, null, 8, ["modelValue"]),
        m(Q, {
          variant: "underlined",
          label: "Enter password",
          modelValue: l.password,
          "onUpdate:modelValue": c[1] || (c[1] = (f) => l.password = f),
          type: o.value ? "text" : "password",
          "append-icon": o.value ? "mdi-eye" : "mdi-eye-off",
          "onClick:append": c[2] || (c[2] = (f) => o.value = !o.value)
        }, null, 8, ["modelValue", "type", "append-icon"]),
        N("div", $t, [
          v(a.$slots, "default", {
            value: l.password
          }, () => [
            l.username && l.password ? (u(), b(be, {
              key: 0,
              "validate-label": "Login!",
              onValidate: c[3] || (c[3] = (f) => n()),
              onReset: c[4] || (c[4] = (f) => r()),
              state: p
            }, null, 8, ["state"])) : w("", !0)
          ])
        ])
      ], 64))
    ], 64));
  }
}, te = {
  __name: "OxPanelSheet",
  props: {
    name: String,
    title: String,
    icon: String,
    help: String
  },
  setup(d) {
    const s = d, t = z(!1);
    xe(() => {
      t.value = !0;
    });
    const l = B("panel");
    return G(() => s == null ? void 0 : s.title, (o) => {
      l.name == s.name && (l.title = o);
    }), G(() => s == null ? void 0 : s.icon, (o) => {
      l.name == s.name && (l.icon = o);
    }), (o, p) => (u(), b(pe, { class: "ma-4" }, {
      default: i(() => [
        t.value && e(l).name == s.name ? (u(), b(he, {
          key: 0,
          to: "#app-bar-right"
        }, [
          v(o.$slots, "append-title"),
          s.help ? (u(), b(C, {
            key: 0,
            class: "ml-3",
            href: s.help,
            target: "new",
            icon: "mdi-information-outline"
          }, null, 8, ["href"])) : w("", !0)
        ])) : w("", !0),
        v(o.$slots, "default")
      ]),
      _: 3
    }));
  }
}, ye = {
  __name: "OxPanel",
  props: {
    ...me,
    state: { type: Object, default: null }
  },
  setup(d) {
    const s = E(), t = d, l = B("context"), o = B("panel");
    return (p, r) => (u(), $(O, null, [
      t.state ? (u(), b(ne, {
        key: 0,
        state: t.state,
        delay: ""
      }, null, 8, ["state"])) : w("", !0),
      t.tabbed ? (u(), b(Z, {
        key: 1,
        value: t.name
      }, {
        default: i(() => [
          v(p.$slots, "sheet", {
            context: e(l),
            panel: e(o)
          }, () => [
            m(te, {
              name: t.name,
              title: t.title,
              icon: t.icon
            }, W({ _: 2 }, [
              L(e(s), (n, a) => ({
                name: a,
                fn: i(() => [
                  v(p.$slots, a, {
                    context: e(l),
                    panel: e(o)
                  })
                ])
              }))
            ]), 1032, ["name", "title", "icon"])
          ])
        ]),
        _: 3
      }, 8, ["value"])) : v(p.$slots, "sheet", {
        key: 2,
        context: e(l),
        panel: e(o)
      }, () => [
        m(te, {
          name: t.name,
          title: t.title,
          icon: t.icon
        }, W({ _: 2 }, [
          L(e(s), (n, a) => ({
            name: a,
            fn: i(() => [
              v(p.$slots, a, {
                context: e(l),
                panel: e(o)
              })
            ])
          }))
        ]), 1032, ["name", "title", "icon"])
      ])
    ], 64));
  }
}, ge = {
  __name: "OxModelEdit",
  props: {
    value: {
      type: Object,
      default: () => null
    },
    valueModifiers: {}
  },
  emits: ["update:value"],
  setup(d) {
    B("context");
    const s = Ce(d, "value"), t = P(() => {
      var f;
      return (f = s.value) == null ? void 0 : f.constructor;
    }), l = B("panel");
    function o(f) {
      l.value && f && (l.value.title = `Edit ${f.$title}`);
    }
    o(s.value), G(s, o);
    const p = z(null), r = E(), n = F(r, "tab.", { exclude: "tab.default" }), a = F(r, "window.", { exclude: "window.default" }), c = P(() => ({
      panel: l,
      value: s.value,
      model: t.value
    }));
    return (f, x) => s.value ? (u(), $(O, { key: 0 }, [
      e(n) && Object.keys(e(n)).length ? (u(), $(O, { key: 0 }, [
        m(st, {
          modelValue: p.value,
          "onUpdate:modelValue": x[0] || (x[0] = (y) => p.value = y)
        }, {
          default: i(() => [
            v(f.$slots, "tab.default", T(_(c.value)), () => {
              var y, V;
              return [
                m(nt, {
                  text: (V = (y = t.value) == null ? void 0 : y.meta) == null ? void 0 : V.verbose,
                  value: "model"
                }, null, 8, ["text"])
              ];
            }),
            (u(!0), $(O, null, L(e(n), (y, V) => v(f.$slots, V, U({ ref_for: !0 }, c.value))), 256))
          ]),
          _: 3
        }, 8, ["modelValue"]),
        m(de, {
          modelValue: p.value,
          "onUpdate:modelValue": x[1] || (x[1] = (y) => p.value = y)
        }, {
          default: i(() => [
            m(Z, { value: "model" }, {
              default: i(() => [
                v(f.$slots, "window.default", T(_(c.value)))
              ]),
              _: 3
            }),
            (u(!0), $(O, null, L(e(a), (y, V) => (u(), b(Z, { value: y }, {
              default: i(() => [
                v(f.$slots, V, U({ ref_for: !0 }, c.value))
              ]),
              _: 2
            }, 1032, ["value"]))), 256))
          ]),
          _: 3
        }, 8, ["modelValue"])
      ], 64)) : v(f.$slots, "window.default", T(U({ key: 1 }, c.value)))
    ], 64)) : (u(), $(O, { key: 1 }, [
      A(" Nothing to edit ")
    ], 64));
  }
}, St = /* @__PURE__ */ R({
  __name: "OxModelPanel",
  props: {
    ...ie(),
    ...me,
    search: String,
    view: String,
    headers: Array,
    showFilters: { type: Boolean, default: !1 }
  },
  setup(d) {
    const { t: s } = ae(), t = E(), l = F(t, "views.list."), o = F(t, "item."), p = F(t, "views.edit."), r = d, n = B("repos"), a = B("panel"), { value: c } = Ae(a), f = Pe("filters"), x = P(() => it(ie(), r)), y = P(() => ot(
      { ...x.value, value: c },
      { repos: n }
    ));
    P(() => {
      var k;
      return ((k = y.value) == null ? void 0 : k.items) || [];
    });
    const V = z(r.showFilters);
    G(() => a.view, (k) => {
      k || (a.view = r.view || "list.table");
    });
    function X(k = ".add") {
      a.reset(k, new r.repo.use());
    }
    function we(k) {
      var g;
      a.reset(".edit", k, { force: !0 }), (g = y.value) == null || g.fetch();
    }
    const ke = P(() => {
      if (r.title)
        return r.title;
      const k = e(y).repo.use;
      if (k === null)
        return "";
      if (a.view.startsWith("list."))
        return s(`models.${k.entity}`, 3);
      if (!a.value)
        return "";
      const g = a.value.$title;
      if (g)
        return g;
      const S = s(`models.${k.entity}`);
      return a.value.id ? s("models._.title", { model: S, id: a.value.id }) : s("models._.title.new", { model: S });
    }), $e = P(
      () => {
        var k, g;
        return r.icon ? r.icon : ((g = (k = r.repo.use) == null ? void 0 : k.meta) == null ? void 0 : g.icon) || null;
      }
    ), M = P(() => ({
      panel: a,
      list: e(y),
      items: e(y).items,
      value: a.value
    }));
    return (k, g) => (u(), b(ye, {
      name: r.name,
      title: ke.value,
      icon: $e.value,
      state: y.value.state,
      tabbed: r.tabbed
    }, {
      "append-title": i(() => {
        var S;
        return [
          v(k.$slots, "append-title", T(_(M.value))),
          e(a).view.startsWith("list.") ? (u(), b(oe, {
            key: 0,
            class: "ml-3",
            color: "secondary",
            density: "compact",
            variant: "tonal"
          }, {
            default: i(() => [
              v(k.$slots, "nav.list", T(_(M.value))),
              e(f) ? (u(), b(C, {
                key: 0,
                title: V.value ? e(s)("filters.hide") : e(s)("filters.show"),
                "aria-label": V.value ? e(s)("filters.hide") : e(s)("filters.show"),
                onClick: g[0] || (g[0] = (h) => V.value = !V.value),
                active: V.value
              }, {
                default: i(() => [
                  m(j, {
                    icon: e(f).icon
                  }, null, 8, ["icon"])
                ]),
                _: 1
              }, 8, ["title", "aria-label", "active"])) : w("", !0)
            ]),
            _: 3
          })) : (S = e(a).value) != null && S.id ? (u(), b(oe, {
            key: 1,
            class: "ml-3",
            color: "secondary",
            density: "compact",
            variant: "tonal"
          }, {
            default: i(() => [
              v(k.$slots, "nav.item", T(_(M.value))),
              e(a).view == "edit" ? (u(), b(rt, { key: 0 }, {
                activator: i(({ props: h }) => [
                  m(C, U({ "prepend-icon": "mdi-dots-vertical" }, h), {
                    default: i(() => [
                      A(D(e(s)("actions")), 1)
                    ]),
                    _: 2
                  }, 1040)
                ]),
                default: i(() => [
                  m(ce, null, {
                    default: i(() => [
                      v(k.$slots, "item.actions", T(_(M.value)))
                    ]),
                    _: 3
                  })
                ]),
                _: 3
              })) : w("", !0),
              m(C, {
                disabled: !y.value.prev,
                title: e(s)("prev"),
                "aria-label": e(s)("prev"),
                onClick: g[1] || (g[1] = I((h) => e(a).value = y.value.prev, ["stop"]))
              }, {
                default: i(() => [
                  m(j, { icon: "mdi-chevron-left" })
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"]),
              m(C, {
                disabled: !y.value.next,
                title: e(s)("next"),
                "aria-label": e(s)("next"),
                onClick: g[2] || (g[2] = I((h) => e(a).value = y.value.next, ["stop"]))
              }, {
                default: i(() => [
                  m(j, { icon: "mdi-chevron-right" })
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"])
            ]),
            _: 3
          })) : w("", !0),
          m(ut, {
            class: "ml-3",
            color: "secondary",
            modelValue: e(a).view,
            "onUpdate:modelValue": g[4] || (g[4] = (h) => e(a).view = h),
            density: "compact",
            variant: "tonal"
          }, {
            default: i(() => {
              var h;
              return [
                m(C, {
                  value: "list.table",
                  title: e(s)("panels.nav.table"),
                  "aria-label": e(s)("panels.nav.table")
                }, {
                  default: i(() => [
                    m(j, null, {
                      default: i(() => g[7] || (g[7] = [
                        A("mdi-table")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["title", "aria-label"]),
                e(t)["views.list.cards"] ? (u(), b(C, {
                  key: 0,
                  value: "list.cards",
                  title: e(s)("panels.nav.cards"),
                  "aria-label": e(s)("panels.nav.cards")
                }, {
                  default: i(() => [
                    m(j, null, {
                      default: i(() => g[8] || (g[8] = [
                        A("mdi-card-account-details")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["title", "aria-label"])) : w("", !0),
                e(t)["views.list.kanban"] ? (u(), b(C, {
                  key: 1,
                  value: "list.kanban",
                  title: e(s)("panels.nav.kanban"),
                  "aria-label": e(s)("panels.nav.kanban")
                }, {
                  default: i(() => [
                    m(j, null, {
                      default: i(() => g[9] || (g[9] = [
                        A("mdi-view-column")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["title", "aria-label"])) : w("", !0),
                e(t)["views.add"] ? (u(), b(C, {
                  key: 2,
                  value: "add",
                  onClick: g[3] || (g[3] = I((K) => X(), ["stop"])),
                  title: e(s)("panels.nav.add"),
                  "aria-label": e(s)("panels.nav.add")
                }, {
                  default: i(() => [
                    m(j, null, {
                      default: i(() => g[10] || (g[10] = [
                        A("mdi-plus-box")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["title", "aria-label"])) : w("", !0),
                e(t)["views.edit"] || e(p) ? (u(), b(C, {
                  key: 3,
                  value: "edit",
                  disabled: !((h = e(a).value) != null && h.id),
                  title: e(s)("panels.nav.edit"),
                  "aria-label": e(s)("panels.nav.edit")
                }, {
                  default: i(() => [
                    m(j, null, {
                      default: i(() => g[11] || (g[11] = [
                        A("mdi-pencil")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["disabled", "title", "aria-label"])) : w("", !0),
                v(k.$slots, "nav.views", T(_(M.value)))
              ];
            }),
            _: 3
          }, 8, ["modelValue"])
        ];
      }),
      default: i(() => [
        Te(m(ve, {
          ref_key: "filters",
          ref: f,
          list: y.value,
          search: r.search,
          "teleport-to": "#panel-list-actions"
        }, {
          default: i((S) => [
            v(k.$slots, "list.filters", T(_(S)))
          ]),
          _: 3
        }, 8, ["list", "search"]), [
          [_e, e(a).view.startsWith("list.") && V.value]
        ]),
        m(dt, {
          modelValue: e(a).view,
          "onUpdate:modelValue": g[6] || (g[6] = (S) => e(a).view = S)
        }, {
          default: i(() => [
            e(t)["views.list.table"] ? w("", !0) : (u(), b(J, {
              key: 0,
              value: "list.table"
            }, {
              default: i(() => [
                m(fe, {
                  list: y.value,
                  headers: d.headers,
                  edit: ""
                }, W({ _: 2 }, [
                  L(e(o), (S, h) => ({
                    name: h,
                    fn: i((K) => [
                      v(k.$slots, h, T(_(K)))
                    ])
                  }))
                ]), 1032, ["list", "headers"])
              ]),
              _: 3
            })),
            (u(!0), $(O, null, L(e(l), (S, h) => (u(), b(J, {
              value: "list." + S
            }, {
              default: i(() => [
                v(k.$slots, h, U({ ref_for: !0 }, M.value))
              ]),
              _: 2
            }, 1032, ["value"]))), 256)),
            e(t)["views.edit"] || e(p) ? (u(), b(J, {
              key: 1,
              value: "edit"
            }, {
              default: i(() => [
                m(ge, {
                  value: e(a).value,
                  "onUpdate:value": g[5] || (g[5] = (S) => e(a).value = S)
                }, W({ _: 2 }, [
                  L(e(p), (S, h) => ({
                    name: S,
                    fn: i((K) => [
                      v(k.$slots, h, T(_(K)))
                    ])
                  }))
                ]), 1032, ["value"])
              ]),
              _: 3
            })) : w("", !0),
            e(t)["views.add"] ? (u(), b(J, {
              key: 2,
              value: "add"
            }, {
              default: i(() => [
                v(k.$slots, "views.add", U(M.value, {
                  saved: (S) => we(S)
                }))
              ]),
              _: 3
            })) : w("", !0)
          ]),
          _: 3
        }, 8, ["modelValue"])
      ]),
      _: 3
    }, 8, ["name", "title", "icon", "state", "tabbed"]));
  }
}), Ot = {
  __name: "OxPanelNav",
  props: pt,
  setup(d, { expose: s }) {
    const t = d, l = B("panel"), o = P(() => !t.auto || l.name == t.name), p = P(() => {
      const r = l.name == t.name && l.edited ? "*" : "";
      return t.title + r;
    });
    return s({ title: p, name: t.name }), (r, n) => o.value ? (u(), b(le, {
      key: 0,
      active: e(l).name == t.name,
      "prepend-icon": t.icon,
      title: t.title,
      onClick: n[0] || (n[0] = I((a) => e(l).reset(t.name, t.data, t), ["stop"]))
    }, null, 8, ["active", "prepend-icon", "title"])) : w("", !0);
  }
}, At = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OxAction: se,
  OxActionModelDelete: ct,
  OxActions: mt,
  OxApp: vt,
  OxComponent: ft,
  OxFieldDetails: ee,
  OxListFilters: ve,
  OxListKanban: gt,
  OxListTable: fe,
  OxLogin: Vt,
  OxModelEdit: ge,
  OxModelPanel: St,
  OxPanel: ye,
  OxPanelNav: Ot,
  OxPanelSheet: te,
  OxStateAlert: ne,
  OxValidationBtn: be
}, Symbol.toStringTag, { value: "Module" }));
export {
  se as _,
  ct as a,
  mt as b,
  At as c,
  vt as d,
  ft as e,
  ee as f,
  ve as g,
  gt as h,
  fe as i,
  Vt as j,
  St as k,
  ye as l,
  te as m,
  Ot as n,
  ge as o,
  ne as p,
  be as q
};
//# sourceMappingURL=index-C46C7V8D.js.map
