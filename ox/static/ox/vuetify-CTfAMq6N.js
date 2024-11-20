import { ab as u, ac as f, ad as B, ae as d, af as V, ag as I, ah as _, ai as p, aj as c, ak as O, al as M, am as D, an as G, ao as R, ap as x, aq as F, ar as U, as as K, at as z, au as W, av as J, aw as q, ax as H, ay as Y, az as Q, aA as X, aB as Z, aC as ee, aD as te, aE as ae, aF as ne, aG as se, aH as le, aI as oe, aJ as re, aK as ie, aL as ce, aM as ue } from "./index-DbpIZtCO.js";
import { createVNode as fe, capitalize as g, computed as v, h as k } from "vue";
const de = u({
  fluid: {
    type: Boolean,
    default: !1
  },
  ...f(),
  ...B(),
  ...d()
}, "VContainer"), Ve = V()({
  name: "VContainer",
  props: de(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const {
      rtlClasses: s
    } = I(), {
      dimensionStyles: a
    } = _(e);
    return p(() => fe(e.tag, {
      class: ["v-container", {
        "v-container--fluid": e.fluid
      }, s.value, e.class],
      style: [a.value, e.style]
    }, t)), {};
  }
}), N = c.reduce((e, n) => (e[n] = {
  type: [Boolean, String, Number],
  default: !1
}, e), {}), j = c.reduce((e, n) => {
  const t = "offset" + g(n);
  return e[t] = {
    type: [String, Number],
    default: null
  }, e;
}, {}), L = c.reduce((e, n) => {
  const t = "order" + g(n);
  return e[t] = {
    type: [String, Number],
    default: null
  }, e;
}, {}), b = {
  col: Object.keys(N),
  offset: Object.keys(j),
  order: Object.keys(L)
};
function ge(e, n, t) {
  let s = e;
  if (!(t == null || t === !1)) {
    if (n) {
      const a = n.replace(e, "");
      s += `-${a}`;
    }
    return e === "col" && (s = "v-" + s), e === "col" && (t === "" || t === !0) || (s += `-${t}`), s.toLowerCase();
  }
}
const ye = ["auto", "start", "end", "center", "baseline", "stretch"], me = u({
  cols: {
    type: [Boolean, String, Number],
    default: !1
  },
  ...N,
  offset: {
    type: [String, Number],
    default: null
  },
  ...j,
  order: {
    type: [String, Number],
    default: null
  },
  ...L,
  alignSelf: {
    type: String,
    default: null,
    validator: (e) => ye.includes(e)
  },
  ...f(),
  ...d()
}, "VCol"), Ce = V()({
  name: "VCol",
  props: me(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const s = v(() => {
      const a = [];
      let l;
      for (l in b)
        b[l].forEach((o) => {
          const i = e[o], C = ge(l, o, i);
          C && a.push(C);
        });
      const r = a.some((o) => o.startsWith("v-col-"));
      return a.push({
        // Default to .v-col if no other col-{bp}-* classes generated nor `cols` specified.
        "v-col": !r || !e.cols,
        [`v-col-${e.cols}`]: e.cols,
        [`offset-${e.offset}`]: e.offset,
        [`order-${e.order}`]: e.order,
        [`align-self-${e.alignSelf}`]: e.alignSelf
      }), a;
    });
    return () => {
      var a;
      return k(e.tag, {
        class: [s.value, e.class],
        style: e.style
      }, (a = t.default) == null ? void 0 : a.call(t));
    };
  }
}), y = ["start", "end", "center"], h = ["space-between", "space-around", "space-evenly"];
function m(e, n) {
  return c.reduce((t, s) => {
    const a = e + g(s);
    return t[a] = n(), t;
  }, {});
}
const be = [...y, "baseline", "stretch"], w = (e) => be.includes(e), A = m("align", () => ({
  type: String,
  default: null,
  validator: w
})), Se = [...y, ...h], P = (e) => Se.includes(e), T = m("justify", () => ({
  type: String,
  default: null,
  validator: P
})), ve = [...y, ...h, "stretch"], $ = (e) => ve.includes(e), E = m("alignContent", () => ({
  type: String,
  default: null,
  validator: $
})), S = {
  align: Object.keys(A),
  justify: Object.keys(T),
  alignContent: Object.keys(E)
}, ke = {
  align: "align",
  justify: "justify",
  alignContent: "align-content"
};
function Ne(e, n, t) {
  let s = ke[e];
  if (t != null) {
    if (n) {
      const a = n.replace(e, "");
      s += `-${a}`;
    }
    return s += `-${t}`, s.toLowerCase();
  }
}
const je = u({
  dense: Boolean,
  noGutters: Boolean,
  align: {
    type: String,
    default: null,
    validator: w
  },
  ...A,
  justify: {
    type: String,
    default: null,
    validator: P
  },
  ...T,
  alignContent: {
    type: String,
    default: null,
    validator: $
  },
  ...E,
  ...f(),
  ...d()
}, "VRow"), Le = V()({
  name: "VRow",
  props: je(),
  setup(e, n) {
    let {
      slots: t
    } = n;
    const s = v(() => {
      const a = [];
      let l;
      for (l in S)
        S[l].forEach((r) => {
          const o = e[r], i = Ne(l, r, o);
          i && a.push(i);
        });
      return a.push({
        "v-row--no-gutters": e.noGutters,
        "v-row--dense": e.dense,
        [`align-${e.align}`]: e.align,
        [`justify-${e.justify}`]: e.justify,
        [`align-content-${e.alignContent}`]: e.alignContent
      }), a;
    });
    return () => {
      var a;
      return k(e.tag, {
        class: ["v-row", s.value, e.class],
        style: e.style
      }, (a = t.default) == null ? void 0 : a.call(t));
    };
  }
}), Ae = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  VAlert: O,
  VApp: M,
  VAppBar: D,
  VAppBarNavIcon: G,
  VAppBarTitle: R,
  VBtn: x,
  VCard: F,
  VCardActions: U,
  VCardText: K,
  VChip: z,
  VCol: Ce,
  VContainer: Ve,
  VDataTable: W,
  VDataTableServer: J,
  VDivider: q,
  VIcon: H,
  VList: Y,
  VListItem: Q,
  VListSubheader: X,
  VMain: Z,
  VMenu: ee,
  VNavigationDrawer: te,
  VPagination: ae,
  VRow: Le,
  VSheet: ne,
  VSkeletonLoader: se,
  VSpacer: le,
  VTab: oe,
  VTabs: re,
  VTabsWindow: ie,
  VTabsWindowItem: ce,
  VTextField: ue
}, Symbol.toStringTag, { value: "Module" }));
export {
  Ae as v
};
//# sourceMappingURL=vuetify-CTfAMq6N.js.map
