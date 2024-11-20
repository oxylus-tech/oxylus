import { defineComponent as R, inject as _, unref as e, openBlock as u, createElementBlock as $, Fragment as S, createBlock as b, withModifiers as j, createCommentVNode as w, useSlots as N, renderSlot as f, normalizeProps as T, guardReactiveProps as B, reactive as Q, withCtx as i, createVNode as m, createTextVNode as A, toDisplayString as D, createElementVNode as E, createSlots as G, shallowRef as Ve, computed as P, watch as W, h as Se, renderList as L, normalizeClass as Oe, ref as z, onMounted as xe, Teleport as he, useModel as Ce, mergeProps as U, toRefs as Ae, useTemplateRef as Pe, withDirectives as Te, vShow as Be } from "vue";
import { B as _e, ap as C, az as le, aN as ae, E as Le, Q as ue, H as Ie, al as je, am as De, an as X, ao as Me, ax as I, aH as Ne, aD as Ee, aB as Ue, aK as de, z as Fe, aO as Ge, aM as Y, af as We, aP as Re, aQ as ze, aR as Ke, aF as pe, aS as qe, aq as He, aT as Je, ay as ce, aa as F, av as Qe, aG as Xe, b as Ye, a9 as Ze, ak as q, aw as et, S as tt, r as lt, t as at, a2 as me, aL as Z, aJ as st, aI as nt, X as ie, a5 as it, Y as ot, aU as oe, aC as rt, aV as ut, aW as dt, aX as H, a1 as pt } from "./index-DDlGN9Dw.js";
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
    const t = d, l = s, o = _("context"), { processing: p, permissions: r, allowed: n, run: a } = _e(t, { user: o.user, emits: l });
    return (c, v) => e(n) ? (u(), $(S, { key: 0 }, [
      t.button ? (u(), b(C, {
        key: 0,
        variant: "text",
        color: t.color,
        icon: t.icon,
        title: t.title,
        "aria-label": t.title,
        onClick: j(e(a), ["stop"])
      }, null, 8, ["color", "icon", "title", "aria-label", "onClick"])) : (u(), b(le, {
        key: 1,
        title: t.title,
        "base-color": t.color,
        "prepend-icon": t.icon,
        onClick: j(e(a), ["stop"])
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
    const { t: s } = ae(), t = _("panel"), l = _("repos"), o = d, p = Le({
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
    N();
    const s = d;
    return (t, l) => (u(), $(S, null, [
      f(t.$slots, "before", T(B(s))),
      f(t.$slots, "default", T(B(s))),
      f(t.$slots, "after", T(B(s)))
    ], 64));
  }
};
var re;
const ft = /* @__PURE__ */ R({
  __name: "OxApp",
  props: {
    apiUrl: {},
    dataEl: { default: (re = document.body.dataset) == null ? void 0 : re.appData },
    models: {},
    data: {}
  },
  setup(d) {
    const { t: s } = ue(), t = N(), l = d, o = Q({
      drawer: !0
    }), p = Ie(l);
    return (r, n) => (u(), b(je, null, {
      default: i(() => [
        m(De, { color: "primary" }, {
          prepend: i(() => [
            m(X, {
              icon: "mdi-apps",
              title: e(s)("nav.panels"),
              "aria-label": e(s)("nav.panels"),
              onClick: n[0] || (n[0] = j((a) => o.drawer = !o.drawer, ["stop"]))
            }, null, 8, ["title", "aria-label"]),
            e(t)["app-nav"] && !o.drawer2 ? (u(), b(X, {
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
                  (a = e(p).panel) != null && a.title ? (u(), $(S, { key: 0 }, [
                    e(p).panel.icon ? (u(), b(I, {
                      key: 0,
                      icon: e(p).panel.icon
                    }, null, 8, ["icon"])) : w("", !0),
                    A(" " + D(e(p).panel.title), 1)
                  ], 64)) : f(r.$slots, "title", {
                    key: 1,
                    context: e(p)
                  })
                ];
              }),
              _: 3
            }),
            m(Ne),
            n[4] || (n[4] = E("div", {
              id: "app-bar-right",
              class: "mr-3"
            }, null, -1)),
            f(r.$slots, "app-bar-right", { context: e(p) })
          ]),
          _: 3
        }),
        e(t)["nav-list"] ? (u(), b(Ee, {
          key: 0,
          theme: "dark",
          modelValue: o.drawer,
          "onUpdate:modelValue": n[2] || (n[2] = (a) => o.drawer = a)
        }, G({
          default: i(() => [
            f(r.$slots, "nav-start", { context: e(p) }),
            f(r.$slots, "nav-list", { context: e(p) }),
            f(r.$slots, "nav-end", { context: e(p) })
          ]),
          _: 2
        }, [
          e(t)["app-nav"] ? {
            name: "append",
            fn: i(() => [
              n[5] || (n[5] = E("div", { class: "text-right pa-3" }, null, -1))
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
                f(r.$slots, "default", { context: e(p) })
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
}), vt = {
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
    return W(() => d.src, l), l(), () => Se(s.value, d);
  }
}, bt = { class: "password-error" }, ee = {
  __name: "OxFieldDetails",
  props: {
    state: Object,
    errors: Array
  },
  setup(d) {
    const s = d;
    return (t, l) => s.errors ? (u(!0), $(S, { key: 0 }, L(s.errors, (o) => (u(), $("div", bt, [
      m(I, { icon: "mdi-alert-circle-outline" }),
      A(" " + D(o), 1)
    ]))), 256)) : w("", !0);
  }
}, fe = {
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
      onSubmit: a[2] || (a[2] = j((c) => d.list.fetch(), ["prevent"])),
      class: "width-full"
    }, [
      m(Ge, {
        dense: "",
        color: "transparent"
      }, {
        default: i(() => [
          m(X, {
            icon: p.value,
            readonly: ""
          }, null, 8, ["icon"]),
          l.search && l.list.filters ? (u(), b(Y, {
            key: 0,
            label: e(t)("filters.search"),
            density: "compact",
            class: "ml-2",
            modelValue: l.list.filters[l.search],
            "onUpdate:modelValue": a[0] || (a[0] = (c) => l.list.filters[l.search] = c),
            "hide-details": ""
          }, null, 8, ["label", "modelValue"])) : w("", !0),
          f(n.$slots, "default", {
            list: d.list,
            filters: d.list.filters
          }),
          m(C, {
            onClick: a[1] || (a[1] = j((c) => d.list.fetch(), ["stop"])),
            class: "ml-2",
            icon: "mdi-check",
            "aria-label": n.$t("filters.apply"),
            title: e(t)("filters.apply")
          }, null, 8, ["aria-label", "title"]),
          o.value ? (u(), b(C, {
            key: 1,
            onClick: j(r, ["stop"]),
            icon: "mdi-backspace",
            "aria-label": e(t)("filters.reset"),
            title: e(t)("filters.reset")
          }, null, 8, ["aria-label", "title"])) : w("", !0)
        ]),
        _: 3
      })
    ], 32));
  }
}, yt = We()({
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
          const v = a[l.field];
          if (Array.isArray(v))
            if (v.length)
              for (var c of v)
                p(n, a, c);
            else
              p(n, a, null);
          else
            p(n, a, v);
        }
      return n;
    });
    return (n, a) => (u(), b(pe, null, {
      default: i(() => [
        m(qe, null, {
          default: i(() => [
            (u(!0), $(S, null, L(l.headers, (c, v) => (u(), b(yt, {
              key: c.value
            }, {
              default: i(({ selectedClass: x }) => [
                m(He, {
                  width: "400",
                  class: Oe(["ma-3", x]),
                  color: o(v),
                  lines: "two"
                }, {
                  default: i(() => [
                    m(Je, null, {
                      default: i(() => [
                        A(D(c.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    m(ce, {
                      "bg-color": o(v)
                    }, {
                      default: i(() => [
                        r.value && r.value[c.value] ? (u(!0), $(S, { key: 0 }, L(r.value[c.value], (y) => f(n.$slots, "item", {
                          key: y.id,
                          header: c,
                          item: y
                        }, () => [
                          m(le, {
                            title: y[l.itemTitle],
                            value: l.itemValue && y[l.itemValue],
                            onClick: (O) => t("click", y)
                          }, {
                            append: i(() => [
                              f(n.$slots, "item.action")
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
}, ve = /* @__PURE__ */ R({
  __name: "OxListTable",
  props: {
    list: Object,
    headers: Array,
    edit: Boolean
  },
  setup(d) {
    const { t: s } = ae(), t = N(), l = F(t, "item.", { exclude: ["item.actions"] }), o = _("panel"), p = new Ye("change"), r = d;
    function n(c) {
      return r.list.fetch({
        filters: {
          page: c.page,
          page_size: c.itemsPerPage,
          ordering: c.sortBy.map(({ key: v, order: x }) => x == "asc" ? v : `-${v}`)
        }
      });
    }
    function a(c, v) {
      o.reset(".edit", v);
    }
    return (c, v) => {
      var x;
      return u(), b(Qe, {
        items: r.list.items,
        "item-index": "id",
        "items-length": r.list.count || r.list.items.length,
        loading: (x = r.list.state) == null ? void 0 : x.isProcessing,
        headers: r.headers,
        "onUpdate:options": n
      }, G({
        loading: i(() => [
          m(Xe, { type: "table-row@10" })
        ]),
        "item.actions": i(({ item: y }) => [
          d.edit ? (u(), b(se, {
            key: 0,
            icon: "mdi-pencil",
            button: "",
            title: e(s)("actions.edit"),
            permissions: e(p),
            item: y,
            run: a
          }, null, 8, ["title", "permissions", "item"])) : w("", !0),
          f(c.$slots, "item.actions", {
            value: y,
            dense: !0,
            button: !0
          })
        ]),
        _: 2
      }, [
        L(e(l), (y, O) => ({
          name: O,
          fn: i((J) => [
            f(c.$slots, O, T(B(J)))
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
    const s = N(), t = d;
    let l = z(!1);
    W(() => t.state.state, (r) => {
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
    return (r, n) => (u(), $(S, null, [
      t.state.isNone && e(s).none ? (u(), b(e(q), {
        key: 0,
        type: "info",
        variant: "outline",
        class: "mb-3",
        state: d.state,
        title: d.noneTitle
      }, {
        default: i(() => [
          f(r.$slots, "none", { state: d.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : o.value ? (u(), b(e(q), {
        key: 1,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: d.state,
        title: d.processingTitle
      }, {
        default: i(() => [
          f(r.$slots, "processing", { state: d.state }, () => [
            n[0] || (n[0] = A(" Data are being sent to server, please be patient. If this message persist you might wan't to retry. "))
          ])
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isError ? (u(), b(e(q), {
        key: 2,
        type: "error",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: d.state,
        title: d.errorTitle
      }, {
        default: i(() => [
          f(r.$slots, "error", { state: d.state }, () => [
            n[1] || (n[1] = A(" Oups... something wrong happened. "))
          ]),
          f(r.$slots, "error-detail", { state: d.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : t.state.isOk ? (u(), b(e(q), {
        key: 3,
        type: "success",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: d.state,
        title: d.okTitle
      }, {
        default: i(() => [
          f(r.$slots, "ok", { state: d.state }, () => [
            n[2] || (n[2] = E("p", null, "Congrats! Data have been updated.", -1))
          ]),
          p.value ? (u(), $(S, { key: 0 }, [
            m(et),
            (u(!0), $(S, null, L(p.value, (a) => (u(), $("p", null, D(a), 1))), 256))
          ], 64)) : w("", !0),
          f(r.$slots, "ok-detail", { state: d.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : w("", !0),
      f(r.$slots, "default", {
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
          f(o.$slots, "reset", {}, () => [
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
          f(o.$slots, "validate", {}, () => [
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
    _("repos");
    const t = d, l = Q({
      username: "",
      password: ""
    }), o = z(!1), p = Q(new tt());
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
    return (a, c) => (u(), $(S, null, [
      m(e(ne), { state: p }, {
        none: i(({ state: v }) => c[5] || (c[5] = [
          E("p", null, "Please enter your credentials in order too proceed...", -1)
        ])),
        "ok-detail": i(({ state: v }) => [
          t.next ? (u(), $("p", kt, [
            c[6] || (c[6] = A("You soon will be redirected to ")),
            E("i", null, D(t.next), 1)
          ])) : w("", !0)
        ]),
        error: i(({ state: v }) => {
          var x, y;
          return [
            m(ee, {
              errors: (x = v.data) == null ? void 0 : x.username
            }, null, 8, ["errors"]),
            m(ee, {
              errors: (y = v.data) == null ? void 0 : y.password
            }, null, 8, ["errors"])
          ];
        }),
        _: 1
      }, 8, ["state"]),
      p.isOk ? w("", !0) : (u(), $(S, { key: 0 }, [
        m(Y, {
          variant: "underlined",
          label: "Enter login",
          modelValue: l.username,
          "onUpdate:modelValue": c[0] || (c[0] = (v) => l.username = v)
        }, null, 8, ["modelValue"]),
        m(Y, {
          variant: "underlined",
          label: "Enter password",
          modelValue: l.password,
          "onUpdate:modelValue": c[1] || (c[1] = (v) => l.password = v),
          type: o.value ? "text" : "password",
          "append-icon": o.value ? "mdi-eye" : "mdi-eye-off",
          "onClick:append": c[2] || (c[2] = (v) => o.value = !o.value)
        }, null, 8, ["modelValue", "type", "append-icon"]),
        E("div", $t, [
          f(a.$slots, "default", {
            value: l.password
          }, () => [
            l.username && l.password ? (u(), b(be, {
              key: 0,
              "validate-label": "Login!",
              onValidate: c[3] || (c[3] = (v) => n()),
              onReset: c[4] || (c[4] = (v) => r()),
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
    const l = _("panel");
    return W(() => s == null ? void 0 : s.title, (o) => {
      l.name == s.name && (l.title = o);
    }), W(() => s == null ? void 0 : s.icon, (o) => {
      l.name == s.name && (l.icon = o);
    }), (o, p) => (u(), b(pe, { class: "ma-4" }, {
      default: i(() => [
        t.value && e(l).name == s.name ? (u(), b(he, {
          key: 0,
          to: "#app-bar-right"
        }, [
          f(o.$slots, "append-title"),
          s.help ? (u(), b(C, {
            key: 0,
            class: "ml-3",
            href: s.help,
            target: "new",
            icon: "mdi-information-outline"
          }, null, 8, ["href"])) : w("", !0)
        ])) : w("", !0),
        f(o.$slots, "default")
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
    const s = N(), t = d, l = _("context"), o = _("panel");
    return (p, r) => (u(), $(S, null, [
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
          f(p.$slots, "sheet", {
            context: e(l),
            panel: e(o)
          }, () => [
            m(te, {
              name: t.name,
              title: t.title,
              icon: t.icon
            }, G({ _: 2 }, [
              L(e(s), (n, a) => ({
                name: a,
                fn: i(() => [
                  f(p.$slots, a, {
                    context: e(l),
                    panel: e(o)
                  })
                ])
              }))
            ]), 1032, ["name", "title", "icon"])
          ])
        ]),
        _: 3
      }, 8, ["value"])) : f(p.$slots, "sheet", {
        key: 2,
        context: e(l),
        panel: e(o)
      }, () => [
        m(te, {
          name: t.name,
          title: t.title,
          icon: t.icon
        }, G({ _: 2 }, [
          L(e(s), (n, a) => ({
            name: a,
            fn: i(() => [
              f(p.$slots, a, {
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
    _("context");
    const s = Ce(d, "value"), t = P(() => {
      var v;
      return (v = s.value) == null ? void 0 : v.constructor;
    }), l = _("panel");
    function o(v) {
      l.value && v && (l.value.title = `Edit ${v.$title}`);
    }
    o(s.value), W(s, o);
    const p = z(null), r = N(), n = F(r, "tab.", { exclude: "tab.default" }), a = F(r, "window.", { exclude: "window.default" }), c = P(() => ({
      panel: l,
      value: s.value,
      model: t.value
    }));
    return (v, x) => s.value ? (u(), $(S, { key: 0 }, [
      e(n) && Object.keys(e(n)).length ? (u(), $(S, { key: 0 }, [
        m(st, {
          modelValue: p.value,
          "onUpdate:modelValue": x[0] || (x[0] = (y) => p.value = y)
        }, {
          default: i(() => [
            f(v.$slots, "tab.default", T(B(c.value)), () => {
              var y, O;
              return [
                m(nt, {
                  text: (O = (y = t.value) == null ? void 0 : y.meta) == null ? void 0 : O.verbose,
                  value: "model"
                }, null, 8, ["text"])
              ];
            }),
            (u(!0), $(S, null, L(e(n), (y, O) => f(v.$slots, O, U({ ref_for: !0 }, c.value))), 256))
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
                f(v.$slots, "window.default", T(B(c.value)))
              ]),
              _: 3
            }),
            (u(!0), $(S, null, L(e(a), (y, O) => (u(), b(Z, { value: y }, {
              default: i(() => [
                f(v.$slots, O, U({ ref_for: !0 }, c.value))
              ]),
              _: 2
            }, 1032, ["value"]))), 256))
          ]),
          _: 3
        }, 8, ["modelValue"])
      ], 64)) : f(v.$slots, "window.default", T(U({ key: 1 }, c.value)))
    ], 64)) : (u(), $(S, { key: 1 }, [
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
    const { t: s } = ae(), t = N(), l = F(t, "views.list."), o = F(t, "item."), p = F(t, "views.edit."), r = d, n = _("repos"), a = _("panel"), { value: c } = Ae(a), v = Pe("filters"), x = P(() => it(ie(), r)), y = P(() => ot(
      { ...x.value, value: c },
      { repos: n }
    ));
    P(() => {
      var k;
      return ((k = y.value) == null ? void 0 : k.items) || [];
    });
    const O = z(r.showFilters);
    W(() => a.view, (k) => {
      k || (a.view = r.view || "list.table");
    });
    function J(k = ".add") {
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
      const V = s(`models.${k.entity}`);
      return a.value.id ? s("models._.title", { model: V, id: a.value.id }) : s("models._.title.new", { model: V });
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
        var V;
        return [
          f(k.$slots, "append-title", T(B(M.value))),
          e(a).view.startsWith("list.") ? (u(), b(oe, {
            key: 0,
            class: "ml-3",
            color: "secondary",
            density: "compact",
            variant: "tonal"
          }, {
            default: i(() => [
              f(k.$slots, "nav.list", T(B(M.value))),
              e(v) ? (u(), b(C, {
                key: 0,
                title: O.value ? e(s)("filters.hide") : e(s)("filters.show"),
                "aria-label": O.value ? e(s)("filters.hide") : e(s)("filters.show"),
                onClick: g[0] || (g[0] = (h) => O.value = !O.value),
                active: O.value
              }, {
                default: i(() => [
                  m(I, {
                    icon: e(v).icon
                  }, null, 8, ["icon"])
                ]),
                _: 1
              }, 8, ["title", "aria-label", "active"])) : w("", !0)
            ]),
            _: 3
          })) : (V = e(a).value) != null && V.id ? (u(), b(oe, {
            key: 1,
            class: "ml-3",
            color: "secondary",
            density: "compact",
            variant: "tonal"
          }, {
            default: i(() => [
              f(k.$slots, "nav.item", T(B(M.value))),
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
                      f(k.$slots, "item.actions", T(B(M.value)))
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
                onClick: g[1] || (g[1] = j((h) => e(a).value = y.value.prev, ["stop"]))
              }, {
                default: i(() => [
                  m(I, { icon: "mdi-chevron-left" })
                ]),
                _: 1
              }, 8, ["disabled", "title", "aria-label"]),
              m(C, {
                disabled: !y.value.next,
                title: e(s)("next"),
                "aria-label": e(s)("next"),
                onClick: g[2] || (g[2] = j((h) => e(a).value = y.value.next, ["stop"]))
              }, {
                default: i(() => [
                  m(I, { icon: "mdi-chevron-right" })
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
                    m(I, null, {
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
                    m(I, null, {
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
                    m(I, null, {
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
                  onClick: g[3] || (g[3] = j((K) => J(), ["stop"])),
                  title: e(s)("panels.nav.add"),
                  "aria-label": e(s)("panels.nav.add")
                }, {
                  default: i(() => [
                    m(I, null, {
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
                    m(I, null, {
                      default: i(() => g[11] || (g[11] = [
                        A("mdi-pencil")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["disabled", "title", "aria-label"])) : w("", !0),
                f(k.$slots, "nav.views", T(B(M.value)))
              ];
            }),
            _: 3
          }, 8, ["modelValue"])
        ];
      }),
      default: i(() => [
        Te(m(fe, {
          ref_key: "filters",
          ref: v,
          list: y.value,
          search: r.search,
          "teleport-to": "#panel-list-actions"
        }, {
          default: i((V) => [
            f(k.$slots, "list.filters", T(B(V)))
          ]),
          _: 3
        }, 8, ["list", "search"]), [
          [Be, e(a).view.startsWith("list.") && O.value]
        ]),
        m(dt, {
          modelValue: e(a).view,
          "onUpdate:modelValue": g[6] || (g[6] = (V) => e(a).view = V)
        }, {
          default: i(() => [
            e(t)["views.list.table"] ? w("", !0) : (u(), b(H, {
              key: 0,
              value: "list.table"
            }, {
              default: i(() => [
                m(ve, {
                  list: y.value,
                  headers: d.headers,
                  edit: ""
                }, G({ _: 2 }, [
                  L(e(o), (V, h) => ({
                    name: h,
                    fn: i((K) => [
                      f(k.$slots, h, T(B(K)))
                    ])
                  }))
                ]), 1032, ["list", "headers"])
              ]),
              _: 3
            })),
            (u(!0), $(S, null, L(e(l), (V, h) => (u(), b(H, {
              value: "list." + V
            }, {
              default: i(() => [
                f(k.$slots, h, U({ ref_for: !0 }, M.value))
              ]),
              _: 2
            }, 1032, ["value"]))), 256)),
            e(t)["views.edit"] || e(p) ? (u(), b(H, {
              key: 1,
              value: "edit"
            }, {
              default: i(() => [
                m(ge, {
                  value: e(a).value,
                  "onUpdate:value": g[5] || (g[5] = (V) => e(a).value = V)
                }, G({ _: 2 }, [
                  L(e(p), (V, h) => ({
                    name: V,
                    fn: i((K) => [
                      f(k.$slots, h, T(B(K)))
                    ])
                  }))
                ]), 1032, ["value"])
              ]),
              _: 3
            })) : w("", !0),
            e(t)["views.add"] ? (u(), b(H, {
              key: 2,
              value: "add"
            }, {
              default: i(() => [
                f(k.$slots, "views.add", U(M.value, {
                  saved: (V) => we(V)
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
    const t = d, l = _("panel"), o = P(() => !t.auto || l.name == t.name), p = P(() => {
      const r = l.name == t.name && l.edited ? "*" : "";
      return t.title + r;
    });
    return s({ title: p, name: t.name }), (r, n) => o.value ? (u(), b(le, {
      key: 0,
      active: e(l).name == t.name,
      "prepend-icon": t.icon,
      title: t.title,
      onClick: n[0] || (n[0] = j((a) => e(l).reset(t.name, t.data, t), ["stop"]))
    }, null, 8, ["active", "prepend-icon", "title"])) : w("", !0);
  }
}, At = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OxAction: se,
  OxActionModelDelete: ct,
  OxActions: mt,
  OxApp: ft,
  OxComponent: vt,
  OxFieldDetails: ee,
  OxListFilters: fe,
  OxListKanban: gt,
  OxListTable: ve,
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
  ft as d,
  vt as e,
  ee as f,
  fe as g,
  gt as h,
  ve as i,
  Vt as j,
  St as k,
  ye as l,
  te as m,
  Ot as n,
  ge as o,
  ne as p,
  be as q
};
//# sourceMappingURL=index-LgL6uci2.js.map
