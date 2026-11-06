/**
 * ============================================================================
 *  Bad Piggies Online 2018 - Flash Player (Ruffle wrapper)
 *  Deobfuscated / cleaned version of main.js
 * ============================================================================
 *
 * Original: heavily minified + string-table obfuscated H5 game shell.
 * Purpose: load main.swf via native Flash or Ruffle, with optional portal ads.
 *
 * === Modifications (ad removal + local Ruffle) ===
 *
 * 1. CDN removed
 *    - No longer falls back to https://unpkg.com/@ruffle-rs/ruffle
 *    - Expects Ruffle to be preloaded via:
 *        <script src="../@ruffle-rs/ruffle@0.6.0/ruffle.js"></script>
 *
 * 2. Ad show() stubbed
 *    - midgame.reward.show() / ad show path always resolves success immediately
 *    - Game will think the ad finished and continue
 *
 * 3. Remote ad SDK injector DISABLED (the real backdoor)
 *    - Function `ve`: originally built URL like https://{portal}/v2/ and
 *      injected a <script> to load 360 / 4399 / other portal ad SDKs
 *    - Forced to never run (if(false))
 *
 * 4. Remote enable check DISABLED
 *    - Function `ce`: originally returned true if g_remote_enable or domain matched
 *    - Now always returns false
 *
 * 5. Portal / placement identifiers neutralized
 *    - iaa360, h4399, midgame, moregames, interstitial, shopwindow,
 *      recommend, capsule → renamed to DISABLED_*
 *
 * 6. Domain whitelist emptied
 *    - Large base64 JSON mapping 360.cn / 4399.com / ... → {}
 *
 * === High-level structure ===
 *
 * - Helpers: defineProperty, class extends, Object.assign, Promise/generator runtime
 * - Base64+JSON config decoder (function u / Di)
 * - Event / hook system (Wn, Gu, etc.)
 * - App / element / meta / pipeline management
 * - Midgame / reward ad subsystem (now inert)
 * - Remote script loader for portal SDKs (now inert)
 * - Flash detect (ActiveX / plugins) + Ruffle fallback
 * - SWF loader (main.swf ~6.3MB) into #container
 *
 * Game config (decoded):
 *   info.id        = BadPiggiesOnline2018
 *   info.name      = BadPiggiesOnline
 *   info.version   = 8.0.4
 *   element.container = #container
 *   app.size.main.swf = 6315070
 *   app.flashframe = 2
 *
 * ============================================================================
 */

! function () {
  var n, t = function (n, t, r) {
    return Object.defineProperty(n, t, r)
  };
  try {
    t({}, "any", {
      value: 0
    })
  } catch (Gn) {
    n = function () {
      if ("undefined" != typeof document) {
        var n = document.documentMode;
        if ("number" == typeof n) return "ie" + n
      }
      return "unknow"
    }(), t = function (t, r, u) {
      console.log(n, t, r, u)
    }
  }

  function r(n, r, u) {
    return t(n, r, {
      get: u,
      configurable: !0
    })
  }

  function u(n) {
    return t = function (n) {
      if ("undefined" != typeof atob) return atob(n);
      for (var t = [
          [65, 90],
          [97, 122],
          [48, 57]
        ], r = "", u = 0; u < t.length; u++)
        for (var i = t[u], o = i[0]; o <= i[1]; o++) r += String.fromCharCode(o);
      r += "+/=";
      var e = String(n).replace(/[=]+$/, "");
      if (e.length % 4 == 1) throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
      for (var f, c, a = 0, s = 0, v = ""; c = e.charAt(s++); ~c && (f = a % 4 ? 64 * f + c : c, a++ % 4) ? v += String.fromCharCode(255 & f >> (-2 * a & 6)) : 0) c = r.indexOf(c);
      return v
    }(n), "undefined" != typeof JSON ? JSON.parse(t, r) : new Function("return " + t)();
    var t, r
  }
  var i = "prototype";

  function o(n, t) {
    return null != t && "undefined" != typeof Symbol && t[Symbol.hasInstance] ? !!t[Symbol.hasInstance](n) : n instanceof t
  }
  var e = function (n, t) {
    return e = Object.setPrototypeOf || o({
      __proto__: []
    }, Array) && function (n, t) {
      n.__proto__ = t
    } || function (n, t) {
      for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r])
    }, e(n, t)
  };

  function f(n, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

    function r() {
      this.constructor = n
    }
    e(n, t), n.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
  }
  var c = function () {
    return c = Object.assign || function (n) {
      for (var t, r = 1, u = arguments.length; r < u; r++)
        for (var i in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i]);
      return n
    }, c.apply(this, arguments)
  };

  function a(n, t) {
    var r = {};
    for (var u in n) Object.prototype.hasOwnProperty.call(n, u) && t.indexOf(u) < 0 && (r[u] = n[u]);
    if (null != n && "function" == typeof Object.getOwnPropertySymbols) {
      var i = 0;
      for (u = Object.getOwnPropertySymbols(n); i < u.length; i++) t.indexOf(u[i]) < 0 && Object.prototype.propertyIsEnumerable.call(n, u[i]) && (r[u[i]] = n[u[i]])
    }
    return r
  }

  function s(n, t, r, u) {
    return new(r || (r = Promise))((function (i, e) {
      function f(n) {
        try {
          a(u.next(n))
        } catch (t) {
          e(t)
        }
      }

      function c(n) {
        try {
          a(u["throw"](n))
        } catch (t) {
          e(t)
        }
      }

      function a(n) {
        n.done ? i(n.value) : function (n) {
          return o(n, r) ? n : new r((function (t) {
            t(n)
          }))
        }(n.value).then(f, c)
      }
      a((u = u.apply(n, t || [])).next())
    }))
  }

  function v(n, t) {
    var r, u, i, o, e = {
      label: 0,
      sent: function () {
        if (1 & i[0]) throw i[1];
        return i[1]
      },
      trys: [],
      ops: []
    };
    return o = {
      next: f(0),
      "throw": f(1),
      "return": f(2)
    }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
      return this
    }), o;

    function f(o) {
      return function (f) {
        return function (o) {
          if (r) throw new TypeError("Generator is already executing.");
          for (; e;) try {
            if (r = 1, u && (i = 2 & o[0] ? u["return"] : o[0] ? u["throw"] || ((i = u["return"]) && i.call(u), 0) : u.next) && !(i = i.call(u, o[1])).done) return i;
            switch (u = 0, i && (o = [2 & o[0], i.value]), o[0]) {
            case 0:
            case 1:
              i = o;
              break;
            case 4:
              return e.label++, {
                value: o[1],
                done: !1
              };
            case 5:
              e.label++, u = o[1], o = [0];
              continue;
            case 7:
              o = e.ops.pop(), e.trys.pop();
              continue;
            default:
              if (!((i = (i = e.trys).length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                e = 0;
                continue
              }
              if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                e.label = o[1];
                break
              }
              if (6 === o[0] && e.label < i[1]) {
                e.label = i[1], i = o;
                break
              }
              if (i && e.label < i[2]) {
                e.label = i[2], e.ops.push(o);
                break
              }
              i[2] && e.ops.pop(), e.trys.pop();
              continue
            }
            o = t.call(n, e)
          } catch (f) {
            o = [6, f], u = 0
          } finally {
            r = i = 0
          }
          if (5 & o[0]) throw o[1];
          return {
            value: o[0] ? o[1] : void 0,
            done: !0
          }
        }([o, f])
      }
    }
  }

  function l(n, t) {
    var r = "function" == typeof Symbol && n[Symbol.iterator];
    if (!r) return n;
    var u, i, o = r.call(n),
      e = [];
    try {
      for (;
        (void 0 === t || t-- > 0) && !(u = o.next()).done;) e.push(u.value)
    } catch (Gn) {
      i = {
        error: Gn
      }
    } finally {
      try {
        u && !u.done && (r = o["return"]) && r.call(o)
      } finally {
        if (i) throw i.error
      }
    }
    return e
  }

  function h(n, t, r) {
    if (r || 2 === arguments.length)
      for (var u, i = 0, o = t.length; i < o; i++) !u && i in t || (u || (u = Array.prototype.slice.call(t, 0, i)), u[i] = t[i]);
    return n.concat(u || Array.prototype.slice.call(t))
  }
  var d = "return",
    b = "undefined";

  function m(n, t) {
    return function (n) {
      return typeof n
    }(n) === t
  }

  function w(n) {
    return m(n, "string")
  }

  function y(n) {
    return m(n, "boolean")
  }

  function p(n) {
    return m(n, "number")
  }

  function I(n) {
    return m(n, "function")
  }

  function j(n) {
    return function (n, t, r) {
      return new n(t, r)
    }(TypeError, n)
  }

  function g(n) {
    if (!I(n)) throw j(n + " is not a function")
  }

  function O(n, t, r) {
    return n.apply(t, r)
  }

  function W(n, t) {
    for (var r = [], u = 2; u < arguments.length; u++) r[u - 2] = arguments[u];
    return O(n, t, r)
  }

  function L(n, t, r) {
    for (var u = [], i = 3; i < arguments.length; i++) u[i - 3] = arguments[i];
    return O(n || r, t, u)
  }

  function k(n, t, r) {
    for (var u, i = [], o = 3; o < arguments.length; o++) i[o - 3] = arguments[o];
    return n ? u = n : (u = r, i.unshift(t)), O(u, t, i)
  }

  function S(n, t) {
    return L(Object.hasOwn, Object, N, n, t)
  }

  function N(n, t) {
    return W(Object[i].hasOwnProperty, n, t)
  }

  function Y(n, t) {
    g(t);
    for (var r = 0, u = n.length; r < u; r++) S(n, r) && t(n[r], r, n)
  }

  function Z(n, t) {
    var r = [];
    return r.length = n.length, Y(n, (function (u, i) {
      r[i] = t(u, i, n)
    })), r
  }

  function M(n, t) {
    return k(n.map, n, Z, t)
  }

  function J(n) {
    return !! function (n, t) {
      try {
        return n(t)
      } catch (r) {}
      return undefined
    }(C, n)
  }

  function C(n) {
    return n.apply
  }

  function X(n) {
    return "return " + n
  }

  function z(n, t) {
    for (var r = [], u = 2; u < arguments.length; u++) r[u - 2] = arguments[u];
    var i = M(t, (function (n, t) {
      return "p" + t
    }));
    return i.push(X(n + "(" + i.join(",") + ");")), i.unshift.apply(i, h([], l(r), !1)), i
  }

  function F(n) {
    return n.constructor
  }

  function A() {
    for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
    return O(F(A), null, n)
  }

  function T(n, t) {
    return O(J(n) ? n : A.apply(void 0, h([], l(z("f", t)), !1)), undefined, t)
  }

  function R(n) {
    for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
    return M(n, (function (n) {
      return T(n, t)
    }))
  }

  function V(n, t) {
    return t < 0 && (t += n.length), n[t]
  }

  function D(n, t) {
    return k(n.at, n, V, t)
  }

  function G(n) {
    for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
    return T(n, t.length > 0 ? t.slice(0, -1).concat(D(t, -1)) : [])
  }

  function P(n, t, r) {
    try {
      return n(t, r)
    } catch (u) {}
    return undefined
  }

  function E(n) {
    for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
    return P(T, n, t)
  }

  function x(n) {
    return L(Number.isNaN, Number, H, n)
  }

  function H(n) {
    return p(n) && isNaN(n)
  }

  function q(n) {
    return -0 === n && function (n) {
      return 1 / n == -Infinity
    }(n)
  }

  function Q(n) {
    return 0 === n && function (n) {
      return 1 / n === Infinity
    }(n)
  }

  function B(n, t) {
    return L(Object.is, Object, U, n, t)
  }

  function U(n, t) {
    return n === t ? !(Q(n) && q(t) || q(n) && Q(t)) : x(n) && x(t)
  }

  function $(n) {
    for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
    return n.assign.apply(n, h([], l(t), !1))
  }

  function _(n, t, r) {
    return n.set(t, r)
  }

  function K(n, t) {
    return n.get(t)
  }

  function nn(n, t) {
    return n.getAll(t)
  }

  function tn(n, t) {
    return n["for"](t)
  }

  function rn(n, t, r) {
    return B(K(n, t), r)
  }

  function un(n, t) {
    for (var r = [], u = 2; u < arguments.length; u++) r[u - 2] = arguments[u];
    return E(T, K(n, t), r)
  }

  function on(n, t) {
    for (var r = [], u = 2; u < arguments.length; u++) r[u - 2] = arguments[u];
    E(G, R, nn(n, t), r)
  }

  function en(n, t) {
    for (var r = 0, u = n.length; r < u; r++)
      if (t(n[r], r, n)) return r;
    return -1
  }

  function fn(n, t) {
    return k(n.findIndex, n, en, t)
  }

  function cn(n, t, r) {
    for (var u = r || 0, i = n.length; u < i; u++)
      if (S(n, u) && n[u] === t) return u;
    return -1
  }

  function an(n, t, r) {
    return k(n.indexOf, n, cn, t, r)
  }

  function sn(n, t) {
    return function (n, t) {
      return t > -1 && t < n.length
    }(n, t) ? n.splice(t, 1)[0] : undefined
  }

  function vn(n, t) {
    return n === t
  }

  function ln(n) {
    return vn(n, undefined)
  }

  function hn(n) {
    return vn(n, null) || ln(n)
  }

  function dn(n) {
    if (hn(n)) throw j("Cannot convert undefined or null to object")
  }

  function bn(n) {
    return L(Object.keys, Object, mn, n)
  }

  function mn(n) {
    dn(n);
    var t = [];
    for (var r in n) S(n, r) && t.push(r);
    if (!{
        toString: null
      }.propertyIsEnumerable("toString"))
      for (var u = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], i = 0, o = u.length; i < o; i++) S(n, u[i]) && t.push(u[i]);
    return t
  }

  function wn(n, t) {
    return k(n.forEach, n, Y, t)
  }

  function yn(n, t) {
    return fn(n, (function (n) {
      return B(n.callee, t)
    }))
  }

  function pn(n) {
    var t, r;
    null === (t = n.dispose) || void 0 === t || t.call(n), wn(bn(r = n), (function (n) {
      delete r[n]
    }))
  }

  function In(n, t) {
    var r = an(n, t);
    r > -1 && pn(sn(n, r))
  }
  var jn = function (n) {
      function t() {
        var t, r = n.call(this) || this;
        return r.u = (t = r.o, function (n, r) {
          if (!(yn(t, n) > -1)) {
            var u = function (n, t) {
              var r;
              return {
                callee: n,
                once: null !== (r = null == t ? void 0 : t.once) && void 0 !== r && r,
                context: null == t ? void 0 : t.context,
                when: null == t ? void 0 : t.when,
                dispose: null
              }
            }(n, r);
            t.push(u);
            var i = null == r ? void 0 : r.unhook;
            if (i) {
              var o = function () {
                return In(t, u)
              };
              i.on(o), u.dispose = function () {
                i.off(o)
              }
            }
          }
        }), r.v = function (n) {
          return function (t) {
            var r = yn(n, t);
            r > -1 && pn(sn(n, r))
          }
        }(r.o), r
      }
      return f(t, n), t[i].on = function (n, t) {
        this.u(n, t)
      }, t[i].once = function (n, t) {
        this.u(n, c(c({}, t), {
          once: !0
        }))
      }, t[i].off = function (n) {
        this.v(n)
      }, t
    }((function () {
      this.o = []
    })),
    gn = function (n) {
      function t() {
        var t, r = n.call(this) || this;
        return r.l = (t = r.o, function () {
          for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
          for (var u = t.concat(), i = 0, o = u.length; i < o; i++) {
            var e = u[i],
              f = e.callee;
            if (f) {
              var c = e.context,
                a = e.when;
              a && !O(a, c, n) || (e.once && In(t, e), O(f, c, n))
            }
          }
        }), r
      }
      return f(t, n), t
    }(jn),
    On = function (n) {
      function t() {
        return n.call(this) || this
      }
      return f(t, n), t[i].emit = function () {
        for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
        this.l.apply(this, h([], l(n), !1))
      }, t
    }(gn),
    Wn = function (n) {
      function t() {
        return n.call(this) || this
      }
      return f(t, n), t[i].pipe = function (n) {
        var t = this,
          r = function () {
            for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
            return n.emit.apply(n, h([], l(t), !1))
          };
        return this.on(r), {
          revoke: function () {
            return t.off(r)
          }
        }
      }, t
    }(On),
    Ln = new Wn,
    kn = "activated",
    Sn = "ad",
    Nn = "app",
    Yn = "auto";

  function Zn() {
    for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
    var r = "";
    return O(r.concat, r, n)
  }
  var Mn = "n".concat("am"),
    Jn = "".concat(Mn, "e"),
    Cn = Zn("cache", Jn),
    Xn = "call",
    zn = "callbacks",
    Fn = "content",
    An = "document",
    Tn = Zn(An, "last", "modified"),
    Rn = "element",
    Vn = "enable",
    Dn = Zn(Vn, "d"),
    Gn = "error",
    Pn = "fetch",
    En = Zn(Pn, "Priority"),
    xn = "get",
    Hn = "label",
    qn = "load",
    Qn = "".concat(qn, "ing"),
    Bn = "message",
    Un = "meta",
    $n = "".concat(Un, "s"),
    _n = "DISABLED_MIDGAME",
    Kn = "DISABLED_MOREGAMES",
    nt = "policy",
    tt = "process",
    rt = "progress",
    ut = "r".concat("am"),
    it = "rcsp",
    ot = "ready",
    et = ("".concat("referrer", "Policy"), "reward"),
    ft = "roll",
    ct = "security",
    at = "set",
    st = "setting",
    vt = "state",
    lt = "sw",
    ht = "trigger",
    dt = Zn(ht, "s"),
    bt = "version",
    mt = "view",
    wt = "_",
    yt = Zn(wt, "blank");

  function pt(n, t) {
    return n[t]
  }

  function It() {
    return window
  }

  function jt(n) {
    return n !== b
  }

  function gt() {
    return jt(typeof globalThis) ? globalThis : jt(typeof window) ? It() : jt(typeof global) ? global : jt(typeof self) ? self : function () {
      return this
    }()
  }

  function Ot(n) {
    var t = gt();
    return t ? pt(t, n) : undefined
  }

  function Wt() {
    return jt(typeof Promise)
  }
  var Lt = "fulfilled",
    kt = "pending",
    St = "rejected";

  function Nt(n, t) {
    for (; n.length > 0;) t(n.shift())
  }

  function Yt(n, t) {
    return t in n
  }

  function Zt(n) {
    return function (n) {
      return m(n, "object")
    }(n) && null !== n
  }

  function Mt(n, t, r, u) {
    return function (n, t, r, u) {
      return t(n) ? r(n) : u(n)
    }(n, t, (function (n) {
      return r(n), !0
    }), (function (n) {
      return null == u || u(n), !1
    }))
  }

  function Jt(n, t, r) {
    return Mt(n, (function (n) {
      return !hn(n)
    }), t, r)
  }

  function Ct() {
    return jt(typeof Symbol)
  }

  function Xt(n, t, r) {
    if (null == n) throw j("Array.from requires an array-like object or iterator - not null or undefined");
    var u = function (n) {
      return I(n) || "[object Function]" === W(Object[i].toString, n)
    };
    if (t && !u(t)) throw j("Array.from: when provided, the second argument must be a function");
    var o = function (n, u) {
        e[n] = t ? m(r, b) ? t(u, n) : W(t, r, u, n) : u
      },
      e = [];
    if (Ct() && u(n[Symbol.iterator]))
      for (var f = (a = n)[Symbol.iterator](), c = f.next(); !c.done; c = f.next()) o(e.length, c.value);
    else
      for (var a, s = 0, v = function (n) {
          var t, r = Number(n);
          return isNaN(r) || r <= 0 ? 0 : Math.min(r, null !== (t = Number.MAX_SAFE_INTEGER) && void 0 !== t ? t : Math.pow(2, 53) - 1)
        }((a = n).length); s < v; s++) o(s, a[s]);
    return e
  }

  function zt() {
    for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
    return G(L, Array.from, Array, Xt, n)
  }

  function Ft(n, t) {
    return new n(t)
  }

  function At(n) {
    var t, r, u, i, o, e, f;
    null !== (t = n.resolve) && void 0 !== t || (n.resolve = function (t) {
      return function (n, t) {
        return Ft(n, (function (n, r) {
          return n(t)
        }))
      }(n, t)
    }), null !== (r = n.reject) && void 0 !== r || (n.reject = function (t) {
      return r = t, Ft(n, (function (n, t) {
        return t(r)
      }));
      var r
    }), null !== (u = n.race) && void 0 !== u || (n.race = function (t) {
      return function (n, t) {
        return Ft(n, (function (n, r) {
          try {
            wn(zt(t), (function (t) {
              t.then(n, r)
            }))
          } catch (Gn) {
            r(Gn)
          }
        }))
      }(n, t)
    }), null !== (i = n.all) && void 0 !== i || (n.all = function (t) {
      return function (n, t) {
        return Ft(n, (function (n, r) {
          try {
            var u = zt(t),
              i = [],
              o = 0;
            wn(u, (function (t, e) {
              t.then((function (t) {
                i[e] = t, ++o == u.length && n(i)
              }), r)
            }))
          } catch (Gn) {
            r(Gn)
          }
        }))
      }(n, t)
    }), null !== (o = n.allSettled) && void 0 !== o || (n.allSettled = function (t) {
      return function (n, t) {
        return Ft(n, (function (n, r) {
          try {
            var u = zt(t),
              i = [],
              o = 0,
              e = function () {
                ++o === u.length && n(i)
              };
            wn(u, (function (n, t) {
              n.then((function (n) {
                i[t] = {
                  status: Lt,
                  value: n
                }, e()
              }), (function (n) {
                i[t] = {
                  status: St,
                  reason: n
                }, e()
              }))
            }))
          } catch (Gn) {
            r(Gn)
          }
        }))
      }(n, t)
    }), null !== (e = n.any) && void 0 !== e || (n.any = function (t) {
      return function (n, t) {
        return Ft(n, (function (n, r) {
          try {
            var u = zt(t),
              i = 0;
            wn(u, (function (t, o) {
              var e = [];
              t.then((function (t) {
                n(t)
              }), (function (n) {
                if (e[o] = n, ++i == u.length) {
                  var t = "All promises were rejected",
                    f = "undefined" != typeof AggregateError ? new AggregateError(e, t) : function () {
                      var n = new Error(t);
                      return n.name = "AggregateError", n.errors = e, n
                    }();
                  r(f)
                }
              }))
            }))
          } catch (Gn) {
            r(Gn)
          }
        }))
      }(n, t)
    }), null !== (f = n.withResolvers) && void 0 !== f || (n.withResolvers = function () {
      return function (n) {
        var t, r;
        return {
          promise: Ft(n, (function (n, u) {
            t = n, r = u
          })),
          resolve: t,
          reject: r
        }
      }(n)
    })
  }

  function Tt(n) {
    var t, r, u;
    return null !== (r = (t = n[i])["catch"]) && void 0 !== r || (t["catch"] = function (n) {
      return this.then(null, n)
    }), null !== (u = t["finally"]) && void 0 !== u || (t["finally"] = function (n) {
      var t = function () {
        I(n) && n()
      };
      return this.then(t, t)
    }), Ct() && Jt(Symbol.toStringTag, (function (n) {
      var r;
      null !== (r = t[n]) && void 0 !== r || (t[n] = "Promise")
    })), At(n), n
  }

  function Rt(n) {
    setTimeout(n, 0)
  }
  var Vt = function () {
    function n(n) {
      var t = this;
      this.h = kt, this.m = [];
      var r = !1,
        u = function (n) {
          r || (Zt(n) && Yt(n, "then") && I(n.then) ? n.then(u, i) : (r = !0, Rt((function () {
            t.h = Lt, t.p = n, t.I()
          }))))
        },
        i = function (n) {
          r || (r = !0, Rt((function () {
            t.h = St, t.p = n, t.I()
          })))
        };
      try {
        n(u, i)
      } catch (Gn) {
        i(Gn)
      }
    }
    return n[i].I = function () {
      Nt(this.m, (function (n) {
        return n()
      }))
    }, n[i].then = function (t, r) {
      var u = this;
      return new n((function (n, i) {
        var o = function () {
          switch (u.h) {
          case Lt:
            Rt((function () {
              I(t) ? n(t(u.p)) : n(u.p)
            }));
            break;
          case St:
            Rt((function () {
              I(r) ? n(r(u.p)) : i(u.p)
            }))
          }
        };
        u.h == kt ? u.m.push(o) : o()
      }))
    }, n
  }();

  function Dt(n, t) {
    for (var r = [], u = 2; u < arguments.length; u++) r[u - 2] = arguments[u];
    var i = n[t];
    if (J(i)) return O(i, n, r);
    var o = A.apply(void 0, h([], l(z("c[n]", r, "c", "n")), !1));
    return G(o, n, t, r)
  }

  function Gt(n) {
    return n.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
  }

  function Pt(n, t) {
    return n.join(t)
  }

  function Et() {
    for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
    return Pt(n, ".")
  }

  function xt() {
    for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
    return Pt(n, " ")
  }

  function Ht() {
    for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
    return Pt(n, "-")
  }

  function qt(n) {
    return n.length > 0 ? function (n) {
      return n.toUpperCase()
    }(n.charAt(0)) + n.slice(1) : n
  }

  function Qt(n, t) {
    return n instanceof t
  }

  function Bt() {
    return jt(typeof ServiceWorkerGlobalScope) && Qt(gt(), ServiceWorkerGlobalScope)
  }

  function Ut(n) {
    var t = n.document;
    if (t) {
      var r = n.location;
      if (r && r.replace) return [n, t, r]
    }
    return null
  }

  function $t() {
    var n = E(It);
    return n ? Ut(n) : null
  }

  function _t(n) {
    return M(bn(n), (function (t) {
      return [t, n[t]]
    }))
  }

  function Kt(n, t) {
    wn(function (n) {
      return L(Object.entries, Object, _t, n)
    }(n), (function (r) {
      return t(r[1], r[0], n)
    }))
  }

  function nr(n) {
    return Object(n)
  }

  function tr() {
    for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
    return rr(n)
  }

  function rr(n) {
    return G(L, Object.assign, Object, ur, n)
  }

  function ur() {
    for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
    var r = l(n),
      u = r[0],
      i = r.slice(1);
    dn(u);
    var o = nr(u);
    return wn(i, (function (n) {
      var t;
      hn(n) || (Kt(n, (function (n, t) {
        o[t] = n
      })), null === (t = Object.getOwnPropertySymbols) || void 0 === t || t.call(Object, n).forEach((function (t) {
        o[t] = n[t]
      })))
    })), o
  }

  function ir(n, t, r) {
    n.setAttribute(t, r)
  }

  function or(n, t) {
    for (var r in t) ir(n, r, t[r])
  }

  function er(n, t) {
    return n.appendChild(t)
  }

  function fr(n) {
    return n.ownerDocument
  }

  function cr(n, t) {
    return w(t) ? function (n, t) {
      return n.createTextNode(t)
    }(n, t) : t
  }

  function ar(n) {
    for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
    return G(k, n.append, n, sr, t)
  }

  function sr(n) {
    for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
    wn(t, (function (t) {
      return er(n, cr(fr(n), t))
    }))
  }

  function vr(n) {
    for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
    return function () {
      return n.apply(void 0, h([], l(t), !1))
    }
  }

  function lr() {}

  function hr() {
    return !0
  }

  function dr(n, t, r) {
    n[t] = r
  }
  Tt(Vt),
    function () {
      function n(n) {
        this.j = n
      }
      n[i].toString = function () {
        return I(this.j) ? this.j() : this.j
      }
    }();
  var br = {};

  function mr(n, t, r) {
    var u = function (n) {
        return n.style
      }(n),
      i = br[t];
    i || (br[t] = i = w(pt(u, t)) ? dr : function (n, t) {
      var r = qt(t),
        u = M(["ms", "Moz", "webkit"], (function (n) {
          return Zn(n, r)
        })),
        i = fn(u, (function (t) {
          return w(pt(n, t))
        }));
      if (i > -1) {
        var o = u[i];
        return function (n, t, r) {
          return dr(n, o, r)
        }
      }
      return lr
    }(u, t)), i(u, t, r)
  }

  function wr(n, t) {
    for (var r in t) mr(n, r, t[r])
  }

  function yr(n, t, r, u) {
    var i, o, e, f = null !== (e = null !== (i = n.head) && void 0 !== i ? i : null === (o = n.getElementsByTagName("head")) || void 0 === o ? void 0 : o[0]) && void 0 !== e ? e : n.documentElement,
      c = n.createElement("link");
    c.rel = "preload", c.as = r, c.href = t;
    var a = "high";
    if (c.importance = a, c.fetchPriority = a, u)
      for (var s in u) c[s] = u[s];
    return f.appendChild(c), c
  }

  function pr(n) {
    return k(n.remove, n, Ir)
  }

  function Ir(n) {
    var t;
    null === (t = n.parentNode) || void 0 === t || t.removeChild(n)
  }

  function jr(n) {
    E(pr, n.target)
  }

  function gr(n, t) {
    g(t);
    for (var r = 0, u = n.length; r < u; r++)
      if (S(n, r) && t(n[r], r, n)) return !0;
    return !1
  }

  function Or(n, t) {
    return k(n.some, n, gr, t)
  }

  function Wr(n, t) {
    var r = n.split("."),
      u = t.split(".");
    if (r.length < u.length) return !1;
    for (var i = r.slice(r.length - u.length), o = u.length - 1; o >= 0; o--)
      if (i[o] !== u[o]) return !1;
    return !0
  }

  function Lr(n, t, r) {
    return !(!n || !Or(t, (function (t) {
      return !!(r && Yt(r, t) && Or(r[t], (function (t) {
        return Wr(n, t)
      }))) || Wr(n, t)
    })))
  }
  var kr = function () {
    function n(n, t) {
      this.g = n, this.O = t
    }
    return r(n[i], "value", (function () {
      return this.g
    })), n[i].is = function () {
      for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
      return Lr(this.g, n, this.O)
    }, n[i].isnot = function () {
      for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
      return !!this.g && !this.is.apply(this, h([], l(n), !1))
    }, n
  }();

  function Sr(n) {
    for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
    var u, i = 0;
    t.length > 1 && (u = t[1], i++);
    for (var o = t[0], e = 0, f = n.length; e < f; e++)
      if (S(n, e)) {
        var c = n[e];
        u = i++ > 0 ? o(u, c, e, n) : c
      } return u
  }

  function Nr(n) {
    for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
    return G(k, n.reduce, n, Sr, t)
  }

  function Yr(n) {
    return n.toLowerCase()
  }

  function Zr(n, t, r, u, i, o, e, f, c, a, s) {
    return {
      href: n,
      protocol: t,
      username: r,
      password: u,
      host: i,
      origin: o,
      hostname: e,
      port: f,
      pathname: c,
      search: a,
      hash: s
    }
  }

  function Mr(n) {
    var t, r, u = n.match(/^(\w{2,}\:)([^\?\#]*)?(\?[^#]+)?(#.+)?$/);
    if (u) return Zr(u[0], Yr(u[1]), "", "", "", "null", "", "", u[2] || "", null !== (t = u[3]) && void 0 !== t ? t : "", null !== (r = u[4]) && void 0 !== r ? r : "");
    throw new Error("".concat(n, " is not a uri"))
  }

  function Jr(n) {
    switch (function (n) {
        var t = null == n ? void 0 : n.match(/(\w+\:)\S+/);
        return t ? Yr(t[1]) : null
      }(n)) {
    case "https:":
    case "http:":
    case "ws:":
    case "wss:":
    case "ftp:":
    case "sftp:":
      return function (n, t) {
        var r, u, i, o, e, f, c, a, s = n.match(/^(\w{2,}\:)((\/*)((([\w\.]+)(\:([\w\.]+)?)?)@)?(([\w\.\-]+)(\:(\d+)?)?))?(\/[^\?\#]*)?(\?[^#]*)?(#.*)?$/);
        if (s) {
          var v = "",
            l = Yr(s[1]);
          v += l;
          var h = null !== (r = s[6]) && void 0 !== r ? r : "",
            d = null !== (u = s[8]) && void 0 !== u ? u : "";
          if (v += "//", null === (i = null == t ? void 0 : t.authentication) || void 0 === i || i) {
            var b = "".concat(h).concat(d ? ":" + d : "");
            v += b ? b + "@" : ""
          }
          var m = Yr(null !== (o = s[10]) && void 0 !== o ? o : ""),
            w = null !== (e = s[12]) && void 0 !== e ? e : "",
            y = m + ((null === (f = null == t ? void 0 : t.port) || void 0 === f || f) && w ? ":" + w : ""),
            p = y ? l + "//" + y : "null";
          v += "".concat(y);
          var I = s[13] || "/",
            j = null !== (c = s[14]) && void 0 !== c ? c : "",
            g = null !== (a = s[15]) && void 0 !== a ? a : "";
          return Zr(v += "".concat(I).concat(j).concat(g), l, h, d, y, p, m, w, I, "?" === j ? "" : j, "#" === g ? "" : g)
        }
        try {
          var O = new URL(n);
          return console.warn("url is not parsed: " + n), O
        } catch (Gn) {
          throw Gn
        }
      }(n);
    case "file:":
      return function (n) {
        var t, r, u, i = n.match(/^(\w{2,}\:)(\/*)([^\?\#]*)?(\?[^#]+)?(#.+)?$/);
        if (i) {
          var o = i[0],
            e = Yr(i[1]);
          return Zr(o, e, "", "", "", e + "//", "", "", "/".concat(null !== (t = i[3]) && void 0 !== t ? t : ""), null !== (r = i[4]) && void 0 !== r ? r : "", null !== (u = i[5]) && void 0 !== u ? u : "")
        }
        throw new Error("".concat(n, " is not a file uri"))
      }(n);
    case "blob":
      var t = Mr(n);
      return c(c({}, t), {
        origin: Jr(t.pathname).origin
      });
    default:
      return Mr(n)
    }
  }

  function Cr(n, t) {
    return Nr(n, (function (n, r) {
      var u = c({}, r);
      return u.url && (u.parsed = function (n) {
        if (n.accessible) {
          var t = n.window.location;
          if (t.origin) return t
        }
        return Jr(n.url)
      }(u), u.domain = new kr(u.parsed.hostname, t), n.push(u)), n
    }), [])
  }
  var Xr = Et(Sn, Dn, ft),
    zr = Et(Sn, Dn, tt),
    Fr = Et(Sn, Dn, et),
    Ar = Et(Sn, _n, "before"),
    Tr = Et(Sn, _n, "after"),
    Rr = Et(Sn, _n, "post"),
    Vr = Et(Sn, ht, ft),
    Dr = Et(Sn, ht, tt),
    Gr = Et(Sn, ht, et),
    Pr = Et(Nn, Cn),
    Er = Et(Nn, An),
    xr = Et(Nn, Tn),
    Hr = Et(Nn, "slient"),
    qr = Et(Rn, "main"),
    Qr = Et(Qn, rt),
    Br = Et(Qn, Hn),
    Ur = Et(Qn, vt),
    $r = Et(Mn, "loc"),
    _r = Et(Mn, bt),
    Kr = Et(Mn, "history"),
    nu = Et(Mn, dt),
    tu = Et(ut, Dn),
    ru = Et(ut, vt),
    uu = Et(ut, Yn),
    iu = Et(ot, "waiting"),
    ou = Et(ot, vt),
    eu = Et(ot, "closings"),
    fu = Et(ot, zn),
    cu = Et(lt, Dn),
    au = Et(lt, Zn("script", "url")),
    su = Et(lt, vt),
    vu = Et(lt, it),
    lu = Et(lt, Yn),
    hu = Et(ht, Kn),
    du = Et(ht, qn),
    bu = Et(ht, Zn(Mn, "init")),
    mu = Et(mt, Jn);

  function wu(n, t) {
    return k(n.filter, n, yu, t)
  }

  function yu(n, t) {
    var r = [];
    return wn(n, (function (u, i) {
      t(u, i, n) && r.push(u)
    })), r
  }

  function pu(n, t) {
    var r = en(n, t);
    return r > -1 ? n[r] : undefined
  }

  function Iu(n, t) {
    return k(n.find, n, pu, t)
  }

  function ju(n, t) {
    return x(t) || ln(t) ? fn(n, (function (n) {
      return vn(r = t, u = n) || x(r) && x(u);
      var r, u
    })) : an(n, t)
  }

  function gu(n, t) {
    return k(n.includes, n, Ou, t)
  }

  function Ou(n, t) {
    return ju(n, t) > -1
  }
  var Wu, Lu = function () {
    function n() {
      this.W = []
    }
    return n[i].create = function (n) {
      var t = new n;
      return this.L(t), t
    }, n[i].append = function (n) {
      return gu(this.W, n) || this.L(n), n
    }, n[i].L = function (n) {
      this.W.push(n), n.attach(this)
    }, n[i].get = function (n) {
      return Iu(this.W, (function (t) {
        return Qt(t, n)
      }))
    }, n[i].getAll = function (n) {
      return wu(this.W, (function (t) {
        return Qt(t, n)
      }))
    }, n[i]["for"] = function (n) {
      return this.get(n) || this.create(n)
    }, n[i].locate = function (n, t) {
      var r = this.get(n);
      return r && t(r)
    }, n
  }();

  function ku(n) {
    return n.getTime()
  }

  function Su() {
    return new Date
  }

  function Nu() {
    return Date.now ? Date.now() : ku(Su())
  }

  function Yu() {
    for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
    var r = n.pop();
    return T(r, n)
  }

  function Zu(n) {
    Wu || (Wu = jt(typeof queueMicrotask) ? queueMicrotask : Wt() && Promise.resolve ? function (n) {
      return Promise.resolve().then(n)
    } : function (n) {
      return setTimeout(n, 0)
    }), Wu(n)
  }

  function Mu(n) {
    var t = !0,
      r = function () {
        t = !1
      };
    return Zu((function () {
        t && (r(), n())
      })),
      function (n) {
        return {
          revoke: n
        }
      }(r)
  }

  function Ju(n) {
    for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
    return Mu((function () {
      return n.apply(void 0, h([], l(t), !1))
    }))
  }

  function Cu(n, t) {
    return function () {
      return n.off(t)
    }
  }

  function Xu(n, t, r) {
    return n.on(t, r), Cu(n, t)
  }
  var zu = function () {
    function n(n) {
      var t, r, u = this;
      this.k = [], null !== (t = (r = this.k).at) && void 0 !== t || (r.at = function (n) {
        return V(u.k, n)
      }), this.S = tr({
        name: null,
        maxLength: Infinity
      }, n), this.N = {
        before: new Wn,
        change: new Wn
      }
    }
    return r(n[i], "hooks", (function () {
      return this.N
    })), r(n[i], "options", (function () {
      return this.S
    })), n[i].append = function () {
      for (var n, t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
      this.N.before.emit(t);
      var u = t.length;
      if (u > 0) {
        (n = this.k).push.apply(n, h([], l(t), !1));
        var i = this.k.length,
          o = this.S.maxLength;
        i > o && this.k.splice(o, i - o), this.N.change.emit({
          last: t[u - 1].value,
          records: t
        })
      }
    }, n[i].set = function (n) {
      this.append(Fu(n, Nu()))
    }, n[i].observe = function (n) {
      var t, r = this,
        u = [],
        i = function (i) {
          u.push.apply(u, h([], l(i), !1)), t || (t = Ju((function () {
            t = null, n(r, u.splice(0, u.length))
          })))
        };
      return this.k.length > 0 && i([]), {
        revoke: Xu(this.N.change, (function (n) {
          return i(n.records)
        }))
      }
    }, n[i].assert = function (n, t) {
      var r = this.observe((function (u, i) {
        n(u, i) && (r.revoke(), t(u, i))
      }));
      return r
    }, r(n[i], "current", (function () {
      return this.at(-1)
    })), r(n[i], "previous", (function () {
      return this.at(-2)
    })), n[i].at = function (n) {
      var t;
      return null === (t = D(this.k, n)) || void 0 === t ? void 0 : t.value
    }, r(n[i], "records", (function () {
      return this.k
    })), n
  }();

  function Fu(n, t) {
    return void 0 === t && (t = Nu()), {
      value: n,
      timestamp: t
    }
  }
  var Au = function () {
    function n() {}
    return n[i].attach = function (n) {
      this.Y = n
    }, n[i].detach = function () {
      this.Y = null
    }, r(n[i], "host", (function () {
      return this.Y
    })), n
  }();

  function Tu(n, t) {
    g(t);
    for (var r = 0, u = n.length; r < u; r++)
      if (S(n, r) && !t(n[r], r, n)) return !1;
    return !0
  }

  function Ru(n, t) {
    return k(n.every, n, Tu, t)
  }
  var Vu = function () {
      function n() {
        this.Z = new Wn, this.M = function () {
          var n;
          return {
            get: function () {
              return n
            },
            set: function (t) {
              n = t
            }
          }
        }()
      }
      return r(n[i], "hook", (function () {
        return this.Z
      })), n[i].render = function (n) {
        for (var t, r = [], u = 1; u < arguments.length; u++) r[u - 1] = arguments[u];
        var i = this.M.get();
        B(n, i) || (this.M.set(n), (t = this.Z).emit.apply(t, h([n, i], l(r), !1)))
      }, r(n[i], "getter", (function () {
        return this.M.get
      })), n
    }(),
    Du = function () {
      function n(n) {
        var t = this;
        this.J = n, this.C = [], this.X = new Vu, this.F = function () {
          return t.X.render(t.value, t)
        }
      }
      return n[i].render = function () {
        this.F()
      }, n[i].append = function () {
        for (var n, t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
        (n = this.C).push.apply(n, h([], l(t), !1)), this.A(t, [])
      }, n[i].appendAt = function (n, t) {
        this.T(function (n, t) {
          for (var r = [], u = 2; u < arguments.length; u++) r[u - 2] = arguments[u];
          return n.splice.apply(n, h([t, 0], l(r), !1)), r
        }(this.C, t, n))
      }, n[i].removeAt = function (n) {
        this.R([sn(this.C, n)])
      }, n[i].clear = function () {
        this.R(this.C)
      }, n[i].at = function (n) {
        return D(this.C, n)
      }, r(n[i], "value", (function () {
        return this.J(this.C)
      })), r(n[i], "length", (function () {
        return this.C.length
      })), r(n[i], "hook", (function () {
        return this.X.hook
      })), n[i].v = function (n) {
        var t = this;
        wn(n, (function (n) {
          return n.hook.off(t.F)
        }))
      }, n[i].u = function (n) {
        var t = this;
        wn(n, (function (n) {
          return n.hook.on(t.F)
        }))
      }, n[i].R = function (n) {
        this.v(n), this.F()
      }, n[i].T = function (n) {
        this.u(n), this.F()
      }, n[i].A = function (n, t) {
        this.v(t), this.u(n), this.F()
      }, n
    }(),
    Gu = function (n) {
      function t() {
        return n.call(this, (function (n) {
          return Ru(n, (function (n) {
            return n.value
          }))
        })) || this
      }
      return f(t, n), t
    }(Du),
    Pu = function () {
      function n(n, t) {
        this.V = n, this.D = t
      }
      return r(n[i], "enabled", (function () {
        var n, t = this.V.current;
        return y(t) ? t : null !== (n = null == t ? void 0 : t()) && void 0 !== n && n
      })), n[i].show = function (n) {
        // AD DISABLED: was portal interstitial / rewarded video
        return Promise.resolve({
          ok: true,
          isTrusted: true,
          hadPrevented: false
        });
      }, n
    }(),
    Eu = function () {
      function n(n) {
        var t = this;
        this.N = {
          before: new Wn,
          after: new Wn,
          post: new Wn
        }, _(n, Ar, (function () {
          for (var n, r = [], u = 0; u < arguments.length; u++) r[u] = arguments[u];
          return (n = t.N.before).emit.apply(n, h([], l(r), !1))
        })), _(n, Tr, (function () {
          for (var n, r = [], u = 0; u < arguments.length; u++) r[u] = arguments[u];
          return (n = t.N.after).emit.apply(n, h([], l(r), !1))
        })), _(n, Rr, (function () {
          for (var n, r = [], u = 0; u < arguments.length; u++) r[u] = arguments[u];
          return (n = t.N.post).emit.apply(n, h([], l(r), !1))
        })), this.G = new Pu(tn(n, Xr), tn(n, Vr)), this.P = new Pu(tn(n, zr), tn(n, Dr)), this.H = new Pu(tn(n, Fr), tn(n, Gr))
      }
      return r(n[i], "hooks", (function () {
        return this.N
      })), r(n[i], "roll", (function () {
        return this.G
      })), r(n[i], "process", (function () {
        return this.P
      })), r(n[i], "reward", (function () {
        return this.H
      })), n
    }();

  function xu(n, t) {
    return function (n, t, r) {
      return Nr(bn(n), (function (r, u) {
        return S(n, u) ? t(r, n[u], u, n) : r
      }), r)
    }(n, (function (r, u, i) {
      return r[i] = t(u, i, n), r
    }), {})
  }
  var Hu, qu = function () {
      function n() {
        this.q = {}, this.N = {
          create: new Wn
        }
      }
      return n[i].forEach = function (n) {
        Kt(this.q, (function (t, r) {
          return n(t, r)
        }))
      }, r(n[i], "hooks", (function () {
        return this.N
      })), n[i].get = function (n) {
        return this.q[n]
      }, n[i].has = function (n) {
        return n in this.q
      }, n[i].create = function (n) {
        var t = new zu({
          name: n
        });
        return this.q[n] = t, this.N.create.emit(t), t
      }, n[i]["for"] = function (n) {
        return this.get(n) || this.create(n)
      }, n[i].pick = function () {
        for (var n = this, t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
        return Nr(t, (function (t, r) {
          if (n.has(r)) {
            var u = n.get(r);
            u.records.length > 0 && (t[r] = u.current)
          }
          return t
        }), {})
      }, n[i].map = function (n) {
        var t = this;
        return xu(n, (function (n, r) {
          var u = t["for"](r);
          return u.set(n), u
        }))
      }, n[i].assign = function () {
        for (var n = this, t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
        wn(t, (function (t) {
          Kt(t, (function (t, r) {
            n["for"](r).set(t)
          }))
        }))
      }, n
    }(),
    Qu = function () {
      function n() {
        this.B = new qu
      }
      return r(n[i], "owner", (function () {
        return this.B
      })), n[i]["for"] = function (n) {
        return this.B["for"](n)
      }, n[i].once = function (n, t) {
        var r = this;
        return new Promise((function (u) {
          var i = r["for"](n);
          i.records.length > 0 && t(i.current) ? u() : i.assert((function () {
            return t(i.current)
          }), (function () {
            return u()
          }))
        }))
      }, n[i].U = function (n) {
        return this.B.get(n)
      }, n[i].set = function (n, t) {
        this["for"](n).set(t)
      }, n[i].has = function (n) {
        return this.B.has(n) && this.U(n).records.length > 0
      }, n[i].get = function (n) {
        var t;
        return null === (t = this.U(n)) || void 0 === t ? void 0 : t.current
      }, n[i].locate = function (n, t) {
        this.has(n) && t(this.get(n))
      }, n[i].getAll = function (n) {
        var t = [],
          r = this.U(n);
        return r && Nr(r.records, (function (n, t) {
          return n.push(t.value), n
        }), t), t
      }, n[i].scan = function (n, t) {
        if (this.has(n)) {
          var r = this.U(n);
          wn(r.records, (function (u) {
            return t(u.value, n, r)
          }))
        }
      }, n[i].assign = function () {
        for (var n, t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
        (n = this.B).assign.apply(n, h([], l(wu(t, (function (n) {
          return Zt(n)
        }))), !1))
      }, n
    }(),
    Bu = function () {
      function n(n) {
        this.$ = n, this._ = !1
      }
      return r(n[i], "value", (function () {
        return this.$
      })), r(n[i], "prevented", (function () {
        return this._
      })), n[i].prevent = function () {
        this._ = !0
      }, n
    }();

  function Uu(n, t, r, u) {
    var i = new Bu(r);
    t.emit(i), i.prevented || n.set(u ? u(i.value) : i.value)
  }

  function $u(n) {
    return t = function (n) {
      return 24 * n * 3600
    }(n), 1e3 * t;
    var t
  }

  function _u(n) {
    var t = Ku(n);
    if (x(t)) {
      var r = n.split(" ");
      if (r.length > 0) {
        var u = r[0];
        if (/^\d+\-\d+\-\d+$/.test(u)) {
          var i = u.split("-");
          i.push(i.shift()), r[0] = i.join("/"), t = Ku(r.join(" "))
        }
      }
    }
    return t
  }

  function Ku(n) {
    return Date.parse ? Date.parse(n) : ku(new Date(n))
  }

  function ni(n) {
    var t;
    if (p(n)) return n;
    if (w(n)) return _u(n);
    var r = null === (t = null == n ? void 0 : n.getTime) || void 0 === t ? void 0 : t.call(n);
    return p(r) ? r : NaN
  }

  function ti(n) {
    return Qt(n, Date) ? n : new Date(w(n) ? _u(n) : n)
  }

  function ri(n) {
    return n.getDate()
  }

  function ui(n) {
    return n.getHours()
  }

  function ii(n) {
    return n.getMinutes()
  }

  function oi(n) {
    return n.getMonth()
  }

  function ei(n) {
    return n.getSeconds()
  }

  function fi(n) {
    return n.getFullYear()
  }

  function ci(n, t) {
    return fi(n) === fi(t) && oi(n) === oi(t) && ri(n) === ri(t)
  }

  function ai(n, t) {
    var r = ti(n),
      u = ti(t);
    return ci(r, u) && function (n, t) {
      return ui(n) === ui(t) && ii(n) === ii(t) && ei(n) === ei(t)
    }(r, u)
  }

  function si(n, t) {
    return r = ni(n), ni(t) - r;
    var r
  }

  function vi(n) {
    return function (n, t) {
      return si(n, t) > 0
    }(n, Nu())
  }

  function li(n) {
    return function (n, t) {
      return si(n, t) < 0
    }(n, Nu())
  }

  function hi(n, t, r, u) {
    var i, o;
    Uu(n, t, (o = n.current, c(c({}, i = r), {
      temp: u,
      repeat: o && o.name === i.name ? o.repeat + 1 : 0,
      timestamp: Nu()
    })))
  }! function (n) {
    n.DEFAULT = "yyyy-MM-dd HH:mm:ss.SSS", n.yyyyMMddHHmmss = "yyyy-MM-dd HH:mm:ss", n.yyyyMMdd = "yyyy-MM-dd", n.HHmmss = "HH:mm:ss"
  }(Hu || (Hu = {})), jt(typeof performance) ? NaN : Nu();
  var di = function (n) {
      function t() {
        return n.call(this) || this
      }
      return f(t, n), t[i].observe = function (n) {
        var t, r = this,
          u = function () {
            t || (t = Ju((function () {
              t = null, n(r)
            })))
          };
        return this.k.length > 0 && u(), this.N.change.on(u), {
          revoke: function () {
            r.N.change.off(u), null == t || t.revoke()
          }
        }
      }, t
    }(function () {
      function n() {
        this.k = [], this.K = -1, this.N = {
          change: new Wn
        }
      }
      return r(n[i], "hooks", (function () {
        return this.N
      })), r(n[i], "length", (function () {
        return this.K + 1
      })), n[i].set = function (n) {
        this.K++, this.k.splice(this.K, this.k.length + 1 - this.K, n), this.nn()
      }, n[i].nn = function () {
        this.N.change.emit(this.current, this)
      }, r(n[i], "previous", (function () {
        return this.k[this.K - 1]
      })), r(n[i], "current", (function () {
        return this.k[this.K]
      })), n[i].at = function (n) {
        return this.k[this.K + n]
      }, n
    }()),
    bi = function (n) {
      function t() {
        return n.call(this) || this
      }
      return f(t, n), t[i].go = function (n) {
        var t = this.K + n;
        t > -1 && t < this.k.length && (this.K = t, this.nn())
      }, t[i].forward = function () {
        this.go(1)
      }, t[i].back = function () {
        this.go(-1)
      }, t
    }(di),
    mi = function () {
      function n() {
        this.N = {
          l2m: new Wn,
          m2l: new Wn,
          merge: new Wn
        }, this.tn = new di, this.rn = new bi, this.un = []
      }
      return r(n[i], "local", (function () {
        return this.rn
      })), r(n[i], "merged", (function () {
        return this.tn
      })), n[i].set = function (n, t) {
        this.rn.set({
          name: n,
          options: t
        })
      }, r(n[i], "hooks", (function () {
        return this.N
      })), r(n[i], "locked", (function () {
        return this.un.length > 0
      })), n[i].lock = function (n) {
        gu(this.un, n) || (this.un.push(n), hi(this.tn, this.N.merge, {
          name: n
        }, !0))
      }, n[i].unlock = function (n) {
        var t = this;
        Mt(an(this.un, n), (function (n) {
          return n > -1
        }), (function (n) {
          sn(t.un, n), t.locked ? hi(t.tn, t.N.merge, {
            name: D(t.un, -1)
          }, !0) : t.rn.length > 0 && hi(t.tn, t.N.merge, t.rn.current, !1)
        }))
      }, n
    }(),
    wi = function (n) {
      function t() {
        var t = n.call(this) || this;
        return t.en = new Gu, t.fn = new Qu, t.cn = new Eu(t.fn), t.an = new mi, t.sn = new Gu, Yu(t.fn, t.an, t.cn.hooks, t.sn, (function (n, t, r, u) {
          ! function (n, t) {
            var r = function (t) {
                n.locked || hi(n.merged, n.hooks.merge, t, !1)
              },
              u = n.local,
              i = n.hooks;
            ! function () {
              for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
              tr.apply(void 0, h([{}], l(n), !1))
            }(Xu(t.hooks.change, Yu((function (n) {
              var o = u.current;
              if (!o || n[0] != o.name || n[1] != o.options) {
                var e = {
                  name: n[0],
                  options: n[1],
                  from: t
                };
                Uu(u, i.m2l, e), r(e)
              }
            }), (function (n) {
              return wn(t.records, (function (t) {
                  return n(t.value)
                })),
                function (t) {
                  return n(t.last)
                }
            }))), Xu(u.hooks.change, (function (n) {
              if (n.from != t) {
                var u = t.current;
                u && n.name == u[0] && n.options == u[1] || (Uu(t, i.l2m, n, (function (n) {
                  return [n.name, n.options]
                })), r(n))
              }
            })))
          }(t, tn(n, mu)),
          function (n, t) {
            n.hook.on((function (n) {
              return t.set(n)
            }))
          }(u, tn(n, iu));
          var i = r.post;
          r.before.on((function (n) {
            var r, u, o = Et(n, "at", null !== (u = null === (r = t.local.current) || void 0 === r ? void 0 : r.name) && void 0 !== u ? u : "unknow");
            t.lock(o), i.once((function () {
              return t.unlock(o)
            }))
          }))
        })), t
      }
      return f(t, n), r(t[i], "waiting", (function () {
        return this.sn
      })), r(t[i], "visible", (function () {
        return this.en
      })), r(t[i], "metas", (function () {
        return this.fn
      })), r(t[i], "DISABLED_MIDGAME", (function () {
        return this.cn
      })), r(t[i], "pipeline", (function () {
        return this.an
      })), t
    }(Au);

  function yi(n) {
    n.length = 0
  }

  function pi(n) {
    for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
    yi(n), n.push.apply(n, h([], l(t), !1))
  }

  function Ii(n) {
    return n.top === n
  }

  function ji(n) {
    try {
      return !!n.toString
    } catch (Gn) {
      return !1
    }
  }

  function gi(n, t) {
    var r = ji(n);
    return {
      window: n,
      accessible: r,
      url: r ? n.location.href : t
    }
  }

  function Oi(n) {
    return function (n) {
      return n.referrer
    }(n.document)
  }

  function Wi(n) {
    return n.location.ancestorOrigins
  }

  function Li(n, t, r) {
    var u, i, o = ji(n);
    if (0 === r) {
      if (o && (e = Oi(n)) && (!(f = Wi(n)) || Jr(e).origin === f[0])) return e
    } else {
      var e, f, c = r - 1,
        a = t[c],
        s = a.window;
      if (a.accessible && (e = Oi(s)) && (!(f = Wi(s)) || Jr(e).origin == f[0])) return e;
      for (var v = c; v >= 0; v--) {
        var l = t[v];
        if (l.accessible) return null === (u = Wi(l.window)) || void 0 === u ? void 0 : u[c - v]
      }
    }
    return o ? null === (i = Wi(n)) || void 0 === i ? void 0 : i[r] : null
  }

  function ki(n) {
    for (var t, r, u = M(function (n) {
        var t = [];
        if (!Ii(n))
          for (var r = n.parent; r && (t.push(r), !Ii(r)); r = r.parent);
        return t
      }(n), (function (n) {
        return gi(n)
      })), i = 0, o = u.length; i < o; i++) null !== (t = (r = u[i]).url) && void 0 !== t || (r.url = Li(n, u, i));
    return u
  }
  var Si = function () {
      function n() {
        this.O = {}
      }
      return r(n[i], "alias", (function () {
        return this.O
      })), n[i].create = function (n) {
        return new kr(n, this.O)
      }, n
    }(),
    Ni = function () {
      function n() {
        this.vn = new Si, this.ln = [], this.hn = [], this.dn = [], this.bn = []
      }
      return n[i].refresh = function (n) {
        var t = this;
        Yu(this.ln, this.hn, this.dn, this.bn, (function (r, u, i, o) {
          G(pi, r, function (n) {
            return h([gi(n)], l(ki(n)), !1)
          }(n)), G(pi, u, Cr(r, t.vn.alias)), G(pi, i, wu(u, (function (n) {
            return n.accessible
          }))), o.length = 0;
          for (var e = 0, f = r.length; e < f && r[e].accessible; e++) o[e] = u[e]
        }))
      }, r(n[i], "builder", (function () {
        return this.vn
      })), r(n[i], "all", (function () {
        return this.ln
      })), r(n[i], "valids", (function () {
        return this.hn
      })), r(n[i], "accessibleValids", (function () {
        return this.dn
      })), r(n[i], "continuousAccessibles", (function () {
        return this.bn
      })), n
    }(),
    Yi = u("e30="),
    Zi = function (n) {
      function t() {
        var t = n.call(this) || this;
        return t.mn = new Ni, tr(t.mn.builder.alias, Yi), t
      }
      return f(t, n), r(t[i], "website", (function () {
        return this.mn
      })), t
    }(Au);

  function Mi(n) {
    return n.get(wi)
  }

  function Ji(n) {
    return n.get(Zi)
  }

  function Ci(n) {
    return Mi(n).DISABLED_MIDGAME
  }

  function Xi(n) {
    return Ci(n).reward
  }

  /** AD DISABLED - midgame.reward.show() helper */
  function zi(n) {
    return Promise.resolve({
      ok: true,
      isTrusted: true,
      hadPrevented: false
    });
  }

  function Fi(n) {
    return n.metas
  }

  function Ai(n) {
    return Fi(Mi(n))
  }

  function Ti(n) {
    return function (n) {
      return Mi(n).pipeline
    }(n).local
  }
  var Ri = "4.8.1",
    Vi = function (n) {
      function t() {
        var t = n.call(this) || this;
        return t.wn = [],
          function (n, t, r, u) {
            Yu(t.push, (function (r) {
              t.push = function () {
                for (var u = [], i = 0; i < arguments.length; i++) u[i] = arguments[i];
                var o = O(r, t, u);
                return wn(u, (function (r) {
                  r.from !== n && n["for"](r.name).append(c(c({}, r), {
                    from: t
                  }))
                })), o
              }
            })), r && wn(t, (function (t) {
              n["for"](t.name).append(t)
            }));
            var i = function (r, u) {
              var i = wu(u, (function (n) {
                return n.from !== t
              }));
              if (i.length > 0) {
                var o = M(i, (function (t) {
                  return c(c({}, t), {
                    name: r,
                    from: n
                  })
                }));
                O(t.push, t, o)
              }
            };
            Yu((function (n) {
              n.hooks.change.on((function (t) {
                return i(n.options.name, t.records)
              }))
            }), (function (t) {
              u && n.forEach((function (n) {
                return i(n.options.name, n.records)
              })), n.forEach((function (n) {
                return t(n)
              })), n.hooks.create.on((function (n) {
                return t(n)
              }))
            }))
          }(Fi(t["for"](wi)).owner, t.wn, !1, !0), t
      }
      return f(t, n), r(t[i], bt, (function () {
        return Ri
      })), r(t[i], "data", (function () {
        return this.wn
      })), t
    }(Lu),
    Di = u("eyJuIjoibmF0aXZlQXBwTWFuYWdlciIsInRhZyI6InNjcmlwdCIsImdyZSI6ImdfcmVtb3RlX2VuYWJsZSIsImlkIjoiaW5mby5kYXRlIiwiYXMiOiJhcHAuc2xpZW50IiwibG0iOiJhcHAuZG9jdW1lbnRsYXN0bW9kaWZpZWQiLCJkbSI6ImRvbWFpbiIsInJ1IjpbImRhdGEiLFtbInYiLCJzIl0sMTAzLCJvIiwiZCJdLFsidyIsImkiLCJuIl1dLCJwcm90byI6InByb3RvY29sIiwic2VjdXJlIjoiaHR0cHM6IiwiZW1zIjoiY2FudmFzLG9iamVjdCxlbWJlZCIsInBhdGgiOiJ2Mi8ifQ=="),
    Gi = Di.n,
    Pi = Di.path,
    Ei = Di.dm,
    xi = Di.gre,
    Hi = Di.tag,
    qi = Di.secure,
    Qi = Di.id,
    Bi = Di.as,
    Ui = Di.lm,
    $i = Di.ru,
    _i = Di.ems;

  function Ki(n) {
    return L(Array.isArray, Array, no, n)
  }

  function no(n) {
    return Qt(n, Array)
  }

  function to(n, t) {
    return n.getElementsByTagName(t)
  }

  function ro(n) {
    var t, r;
    return null !== (t = n.body) && void 0 !== t ? t : null === (r = to(n, "body")) || void 0 === r ? void 0 : r[0]
  }

  function uo(n) {
    return function (n) {
      var t, r;
      return null !== (t = n.head) && void 0 !== t ? t : null === (r = to(n, "head")) || void 0 === r ? void 0 : r[0]
    }(n) || ro(n) || function (n) {
      return n.documentElement
    }(n)
  }

  function io(n) {
    return (new DOMParser).parseFromString(n, function () {
      for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
      return Pt(n, "/")
    }("text", "html"))
  }

  function oo(n) {
    return n && jt(typeof XMLSerializer) ? (new XMLSerializer).serializeToString(n) : ""
  }

  function eo(n) {
    for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
    return n.createElement.apply(n, h([], l(t), !1))
  }

  function fo(n, t) {
    var r;
    return null === (r = n.querySelector) || void 0 === r ? void 0 : r.call(n, t)
  }
  var co = Zn("http", "-", "equiv"),
    ao = Zn(Fn, "-", ct, "-", nt);

  function so(n) {
    return Zn("[", n, "]")
  }

  function vo(n, t) {
    return zt(to(n, t))
  }

  function lo(n, t, r) {
    return fo(n, Zn(Un, so(Zn(t, "=", xt(r, "i")))))
  }

  function ho(n, t, r) {
    return Iu(vo(n, Un), (function (n) {
      return n.hasAttribute(t) && Yr(n.getAttribute(t)) === r
    }))
  }

  function bo(n, t, r) {
    return function (n, t) {
      for (var r = [], u = 2; u < arguments.length; u++) r[u - 2] = arguments[u];
      try {
        return T(n, r)
      } catch (i) {
        return null == t ? void 0 : t(i)
      }
    }(vr(lo, n, t, r), vr(ho, n, t, r))
  }

  function mo(n) {
    return bo(n, co, ao)
  }

  function wo(n, t) {
    for (var r = [], u = 2; u < arguments.length; u++) r[u - 2] = arguments[u];
    return G(k, n.bind, n, yo, h([t], l(r), !1))
  }

  function yo(n, t) {
    for (var r = [], u = 2; u < arguments.length; u++) r[u - 2] = arguments[u];
    return function () {
      for (var u = [], i = 0; i < arguments.length; i++) u[i] = arguments[i];
      return O(n, t, h(h([], l(r), !1), l(u), !1))
    }
  }

  function po(n, t) {
    return new(wo.apply(void 0, h([n, void 0], l(t), !1)))
  }

  function Io(n) {
    for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
    return Oo(n, t)
  }
  var jo, go = 0;

  function Oo(n, t) {
    switch (go) {
    case 1:
      return Reflect.construct(n, t);
    case 2:
      return po(n, t);
    case 3:
      return function (n, t) {
        return G(A.apply(void 0, h([], l(z("new c", t, "c")), !1)), n, t)
      }(n, t);
    default:
      return go = jt(typeof Reflect) || Qt(po(Date, []), Date) ? 1 : 2, Oo(n, t)
    }
  }

  function Wo(n) {
    var t, r = F(n);
    try {
      if (Io(r, xt(d, "true"))) {
        var u = n.toString(),
          i = u.indexOf("("),
          o = u.indexOf(")", i),
          e = u.slice(i + 1, o),
          f = (t = u.slice(o + 1), k(t.trim, t, Gt)).slice(1, -1);
        return Io.apply(void 0, h(h([r], l(e.split(",")), !1), [f], !1))
      }
    } catch (c) {}
    return n
  }

  function Lo(n, t, r) {
    var u;
    return tr(n, ((u = {})[Zn("on", qn)] = t, u[Zn("on", Gn)] = r, u)), n
  }
  var ko, So = [];

  function No() {
    jo || (jo = Ju((function () {
      jo = null, Nt(So, (function (n) {
        n.shift().apply(void 0, h([], l(n), !1))
      }))
    })))
  }

  function Yo(n) {
    for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
    So.push(h([n], l(t), !1)), No()
  }

  function Zo() {
    for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
    var r = p(n[0]) ? n : n[0],
      u = "".constructor;
    return O(u.fromCharCode, u, r)
  }

  function Mo() {
    for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
    return T(Zn, M(n, (function (n) {
      return "number" == typeof n ? Zo(n) : Ki(n) ? Mo.apply(void 0, h([], l(n), !1)) : n
    })))
  }

  function Jo(n, t) {
    ! function (n, t) {
      tr(n, {
        src: t,
        async: !0
      })
    }(n, t),
    function (n) {
      return !!Yt(n, En) && (dr(n, En, "high"), !0)
    }(n) || function (n, t) {
      var r = Lo({}, jr, jr);
      Yo(Wo(yr), n, t, Hi, r)
    }(fr(n), t)
  }

  function Co(n, t) {
    return new Promise((function (r, u) {
      var i = eo(n, Hi);
      i.async && (i.async = !1),
        function (n) {
          for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
          wn(t, (function (t) {
            var r = t.attributes,
              u = t.style,
              i = t.children,
              o = a(t, ["attributes", "style", "children"]);
            r && or(n, r), u && wr(n, u), i && ar.apply(void 0, h([n], l(i), !1)), tr(n, o)
          }))
        }(i, w(t) ? {
          src: t
        } : t), Lo(i, r, u), er(ro(n), i)
    }))
  }

  function Xo(n, t, r) {
    return Mt(n, (function (n) {
      return !!n
    }), t, r)
  }

  function zo(n) {
    for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
    return function () {
      for (var r = [], u = 0; u < arguments.length; u++) r[u] = arguments[u];
      return O(n, this, h(h([], l(t), !1), l(r), !1))
    }
  }

  function Fo(n) {
    var t = n.pathname;
    return t.substring(0, t.lastIndexOf("/") + 1)
  }

  function Ao(n) {
    console.warn(n),
      function (n) {
        switch (n) {
        case "localhost":
        case "[::1]":
          return !0;
        default:
          return /^127(\.\d+){3}$/.test(n)
        }
      }(location.hostname) && alert(n)
  }

  function To(n) {
    Ao("".concat(n, " should be called in app loading."))
  }

  function Ro(n) {
    ko = n
  }

  function Vo() {
    return Mi(ko)
  }

  function Do() {
    return Fi(Vo())
  }

  function Go() {
    for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
    return $.apply(void 0, h([Do()], l(n), !1))
  }

  function Po(n, t) {
    return _(Do(), n, t)
  }

  function Eo(n) {
    return K(Do(), n)
  }

  function xo(n, t) {
    return rn(Do(), n, t)
  }

  function Ho(n) {
    for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
    return un.apply(void 0, h([Do(), n], l(t), !1))
  }

  function qo(n) {
    Uo() ? Po(Qr, n) : To(rt)
  }

  function Qo(n) {
    Uo() ? Po(Br, n) : To(Hn)
  }

  function Bo() {
    ! function (n) {
      Po(Ur, n)
    }(3)
  }

  function Uo() {
    return xo(ou, 0)
  }

  function $o() {
    for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
    return Or(n, (function (n) {
      return n()
    }))
  }

  function _o(n) {
    return function () {
      return $o.apply(void 0, h([], l(n), !1))
    }
  }
  var Ko = function (n) {
      function t(t) {
        var r = n.call(this) || this;
        return t(r.l), r
      }
      return f(t, n), t
    }(gn),
    ne = function () {
      function n() {
        for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
        var r = this;
        this.X = new Vu, this.Z = new Ko((function (n) {
          r.X.hook.on((function (t, r, u) {
            return n(t, r, u)
          }))
        })), n.length > 0 && this.set(n[0])
      }
      return n[i].set = function (n) {
        this.X.render(n, this)
      }, r(n[i], "value", (function () {
        return this.getter()
      })), r(n[i], "getter", (function () {
        return this.X.getter
      })), r(n[i], "hook", (function () {
        return this.Z
      })), n
    }(),
    te = function (n) {
      function t(t) {
        return n.call(this, t) || this
      }
      return f(t, n), t[i].watch = function (n) {
        var t = this;
        n(this.value, this);
        var r = function (r) {
          return n(r, t)
        };
        return this.X.hook.on(r), {
          revoke: function () {
            return t.X.hook.off(r)
          }
        }
      }, t[i].until = function (n, t) {
        var r = this,
          u = this.value;
        if (n(u)) return t(u, this), null;
        var i = function () {
            return r.X.hook.off(o)
          },
          o = function (u, o) {
            n(u, o) && (i(), t(u, r))
          };
        return this.X.hook.on(o), {
          revoke: i
        }
      }, t[i].untilIs = function (n, t) {
        return this.until((function (t) {
          return B(t, n)
        }), t)
      }, t
    }(ne);

  function re() {
    for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
    return Ru(n, (function (n) {
      return n()
    }))
  }

  function ue(n) {
    return function (n, t, r) {
      var u = [];
      if (n.records.length > 0) {
        var i = ni(n.current);
        if (!x(i) && r.records.length > 0) {
          var o = r.current;
          o > 0 && Yu((function (n) {
            return vi(n + o)
          }), (function (n) {
            if (u.push(vr(n, i)), t.records.length > 0 && li(i + $u(100))) {
              var r = ni(t.current);
              !x(r) && u.push(vr(n, r))
            }
          }))
        }
      }
      return T(re, u)
    }(tn(n, Qi), tn(n, Ui), tn(n, Bi))
  }

  function ie(n) {
    return function (n) {
      for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
      return Or(n, (function (n) {
        var r;
        return (r = n[Ei]).is.apply(r, h([], l(t), !1))
      }))
    }(n, "debug")
  }

  function oe(n) {
    return n.accessibleValids
  }

  function ee(n) {
    return n.valids
  }

  function fe(n) {
    return n.website
  }

  /**
   * DISABLED - Remote enable check
   * Originally: return true if window.g_remote_enable or domain matched portal whitelist
   * This controlled whether the remote ad SDK injector would run.
   */
  function ce(n) {
    return false;
  }

  function ae(n, t) {
    _(n, tu, t)
  }

  function se(n, t) {
    return function () {
      for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
      return _o(n)
    }(vr(ce, ee(t)), vr(ue, n))
  }

  /**
   * DISABLED - Remote Ad SDK Injector (the main hidden backdoor)
   *
   * Original behavior:
   *   1. Check if remote loading is allowed (ce / g_remote_enable)
   *   2. Detect current domain against portal whitelist (360 / 4399 / ...)
   *   3. Construct URL:  https://{matched-domain}/v2/
   *   4. Dynamically create <script src="..."> and inject into page
   *   5. That script was the real portal ad SDK (interstitials, more-games, etc.)
   *
   * Now forced to never execute.
   */
  function ve(n) {
    /* AD SDK REMOTE DISABLED - always continue init pipeline immediately */
    n();
  }

  function le(n, t) {
    !K(n, iu) && rn(n, ou, 1) && (n.scan(fu, (function (n) {
      n(null != t ? t : {
        ok: !1,
        isTrusted: !1,
        hadPrevented: !1
      })
    })), _(n, ou, 2))
  }

  function he() {
    ! function (n) {
      Po(uu, vr(ve, n))
    }(function () {
      for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
      return zo(R, n)
    }((function () {
      xo(Ur, 0) && Bo()
    }), vr(le, Do())))
  }

  function de(n) {
    for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
    return T(n, t)
  }

  function be(n, t, r, u) {
    n.addEventListener(t, r, u)
  }
  var me = Ht(it, "callback"),
    we = Ht(Fn, ct, nt),
    ye = Ht(we, "report", "only");

  function pe(n, t) {
    n.postMessage(t)
  }

  function Ie(n, t) {
    pe(n, ge(it, t))
  }

  function je(n, t) {
    pe(n, ge(me, t))
  }

  function ge(n, t) {
    return {
      type: n,
      data: t
    }
  }

  function Oe(n, t) {
    return new Promise((function (r, u) {
      Yu((function (t) {
        _(n, su, 0), u(t)
      }), (function (u) {
        var i;
        if (K(n, cu) && function () {
            var n;
            return I(null === (n = navigator.serviceWorker) || void 0 === n ? void 0 : n.register)
          }()) {
          var o = K(n, au);
          if (o) return _(n, su, 1), void
          function (n, t, r) {
            return new Promise((function (u, i) {
              var o = {
                  ok: !1,
                  rc: !1
                },
                e = function () {
                  u(o)
                },
                f = navigator.serviceWorker;
              de((function (u) {
                de((function (n) {
                  Mt(f.controller, (function (n) {
                    return n && n.scriptURL != t
                  }), (function (n) {
                    i("skip")
                  }), (function () {
                    f.register(t).then((function (t) {
                      var r = t.active || t.installing || t.waiting;
                      o.ok = !0, de((function (n) {
                        n() || be(r, "statechange", n)
                      }), (function () {
                        return r.state == kn && (n(r), !0)
                      }))
                    }), (function (n) {
                      e()
                    }))
                  }))
                }), (function (t) {
                  if (r && mo(n)) return be(f, Bn, (function (n) {
                    var r = n.data;
                    switch (null == r ? void 0 : r.type) {
                    case it:
                      var i = io(r.data);
                      E(pr, mo(i)), je(t, function (n) {
                        var t, r = n.documentElement;
                        return "".concat(oo(n.doctype)).concat(null !== (t = r.outerHTML) && void 0 !== t ? t : oo(r))
                      }(i));
                      break;
                    case me:
                      r.data == it && u.reload()
                    }
                  })), void Ie(t, u.href);
                  o.rc = !0, e()
                }))
              }), n.location)
            }))
          }(t, o, null !== (i = K(n, vu)) && void 0 !== i ? i : un(n, tu)).then((function (t) {
            _(n, su, t.ok ? 2 : 0), r(t)
          }), u)
        }
        u(xt(lt, "unabled"))
      }))
    }))
  }

  function We() {
    for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
    return Yu(Ji(ko), (function (t) {
      var r;
      if (t) {
        var u = ee(fe(t));
        if (u.length > 0) return (r = u[0][Ei]).is.apply(r, h([], l(n), !1))
      }
      return !1
    }))
  }

  function Le(n) {
    return E(Eo(du), n)
  }

  function ke() {
    Ho(hu)
  }

  function Se() {
    return n = Ur, t = function (n) {
        return n >= 2
      },
      function (n, t, r) {
        return n.once(t, r)
      }(Do(), n, t);
    var n, t
  }

  function Ne(n) {
    return new Promise((function (t, r) {
      if (!Uo()) {
        var u = "This function can only be called once.";
        return Ao(u), void r(u)
      }
      I(n) && Po(eu, n), Po(fu, t), Po(ou, 1), le(Ai(ko))
    }))
  }

  function Ye() {
    for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
    if (n.length > 0) {
      var r = n[0],
        u = Ti(ko);
      p(r) ? u.go(r) : u.set({
        name: r,
        options: n[1]
      })
    }
  }

  function Ze() {
    return Xi(ko).enabled
  }

  function Me() {
    return zi(Xi(ko))
  }

  function Je() {
    return zi(function (n) {
      return Ci(n).roll
    }(ko))
  }

  function Ce() {
    return zi(function (n) {
      return Ci(n).process
    }(ko))
  }

  function Xe() {
    ko.locate(Zi, (function (n) {
      var t = D(oe(n.website), -1),
        r = null == t ? void 0 : t.window;
      r && Dt(r, "open", t.parsed.origin, yt)
    }))
  }

  function ze(n) {
    Mt(Ot(Zn("global", qt(Nn), qt(st))), Zt, Go), Po(_r, Ri), Po(ou, 0), Po(ru, 0), Po(su, 0), Po(Ur, 0), Yu({}, (function (t) {
      Po(bu, (function () {
        Kt(t, (function (n, t) {
          (function (n) {
            return function (n, t) {
              return n.has(t)
            }(Do(), n)
          })(t) || Po(t, n)
        }))
      })), Yu((function (n, r) {
        return dr(t, n, r)
      }), (function (t) {
        t(Hr, $u(30)), t(hu, Xe), Jt($t(), (function (r) {
          var u = l(r, 2),
            i = u[0],
            o = u[1];
          t(qr, _i), Po(Er, o), Po(du, zo(Co, o)), Xo(function (n) {
            return n.lastModified
          }(o), (function (n) {
            ai(Su(), ti(n)) || Po(xr, n)
          }));
          var e = fe(ko["for"](Zi));
          e.refresh(i), Po(tu, se(Do(), e)), Po(Pr, Fo(oe(e)[0].parsed)), Po(lu, vr(Oe, Do(), o)), he(), Xo(function (n) {
            var t;
            return null === (t = n.currentScript) || void 0 === t ? void 0 : t.src
          }(o), (function (t) {
            Po($r, t), n && Po(au, t)
          })), Po(bu, (function () {
            var n, t;
            null === (t = null === (n = Ho(lu)) || void 0 === n ? void 0 : n["catch"]) || void 0 === t || t.call(n, lr), Ho(uu)
          }))
        }), (function () {
          Po(bu, (function () {
            Bo()
          }))
        }))
      }))
    })), Go("{{metas}}", u("eyJpbmZvLmlkIjoiQmFkUGlnZ2llc09ubGluZTIwMTgiLCJpbmZvLmRldmVsb3BlciI6ImciLCJpbmZvLm5hbWUiOiJCYWRQaWdnaWVzT25saW5lIiwiaW5mby52ZXJzaW9uIjoiOC4wLjQiLCJpbmZvLmRhdGUiOiIyMDI1LTEyLTIwIDE3OjI2OjExIiwiZWxlbWVudC5jb250YWluZXIiOiIjY29udGFpbmVyIiwiYXBwLnNpemUiOnsibWFpbi5zd2YiOjYzMTUwNzB9LCJhcHAuZmxhc2hmcmFtZSI6Mn0="))
  }
  var Fe = "value";

  function Ae(n, t, r) {
    return L(Object.defineProperty, Object, Te, n, t, r)
  }

  function Te(n, t, r) {
    if (Yt(r, Fe)) {
      if (Yt(r, xn) || Yt(r, at)) throw j("Invalid property descriptor. Cannot both specify accessors and a value or writable attribute");
      return dr(n, t, r.value), n
    }
    return Yt(r, xn) && Re("getter", pt(r, xn)), Yt(r, at) && Re("setter", pt(r, at)), n
  }

  function Re(n, t) {
    if (!B(t, undefined)) {
      if (!I(t)) throw j("".concat(qt(n), " must be a function: ").concat(t));
      throw j("no shim for ".concat(n))
    }
  }

  function Ve(n, t) {
    for (var r = [], u = 2; u < arguments.length; u++) r[u - 2] = arguments[u];
    return E(T, n[t], r)
  }

  function De() {
    Yu({}, (function (n) {
      Po(nu, n), Yu((function (t, r) {
          return function (n, t, r) {
            I(r) ? n[t] = r : function (n, t) {
              delete n[t]
            }(n, t)
          }(n, t, r)
        }), (function (n) {
          n(Et($n, at), Po), n(Et($n, xn), Eo), n(qn, Le), n("is", We), n(Kn, ke), n(ot, Se), n(Et(Qn, rt), qo), n(Et(Qn, Hn), Qo), n("launch", Ne), n(et, Me), n(Et(et, Vn), Ze), n(ft, Je), n(tt, Ce), n("go", Ye)
        })),
        function (n, t, r, u) {
          Ae(n, t, c(c({}, u), {
            value: r
          }))
        }(ko, Xn, (function (t) {
          for (var r = [], u = 1; u < arguments.length; u++) r[u - 1] = arguments[u];
          return G(Ve, n, t, r)
        }))
    }))
  }
  var Ge = !1;

  function Pe(n) {
    if (!Ge) {
      Ge = !0;
      var t = gt();
      if (function (n) {
          void 0 === n && (n = gt()), Wt() ? Tt(Promise) : n.Promise = Vt
        }(t), Bt()) null == n || n(t);
      else {
        var r = Mo(Gi);
        Jt(t[r], (function (n) {
          Ro(n), E(Dt, n, Xn, Et($n, at), Kr, Ri)
        }), (function () {
          Ro(new Vi), ze(!!n), De(), t[r] = ko, Ln.emit(ko),
            function (n) {
              for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
              on.apply(void 0, h([Do(), n], l(t), !1))
            }(bu)
        }))
      }
    }
  }

  function Ee(n, t, r) {
    return s(this, void 0, void 0, (function () {
      var u;
      return v(this, (function (i) {
        switch (i.label) {
        case 0:
          return (u = new URL(t instanceof Request ? t.url : t)).search = "", [4, n.put(u, r)];
        case 1:
          return i.sent(), [2]
        }
      }))
    }))
  }

  function xe(n, t) {
    return s(this, void 0, void 0, (function () {
      var r, u = this;
      return v(this, (function (i) {
        switch (i.label) {
        case 0:
          return [4, n.match(t, {
            ignoreSearch: !0
          })];
        case 1:
          return (r = i.sent()) ? [3, 3] : [4, fetch(t).then((function (r) {
            return s(u, void 0, void 0, (function () {
              return v(this, (function (u) {
                switch (u.label) {
                case 0:
                  return [4, Ee(n, t, r.clone())];
                case 1:
                  return u.sent(), [2, r]
                }
              }))
            }))
          }))];
        case 2:
          r = i.sent(), i.label = 3;
        case 3:
          return [2, r]
        }
      }))
    }))
  }
  var He = {};

  function qe(n) {
    var t, r = this,
      u = Fo(new URL(n.registration.scope));
    be(n, "install", (function () {
      caches["delete"](u), n.skipWaiting()
    }));
    var i = function () {
      return s(r, void 0, void 0, (function () {
        return v(this, (function (n) {
          switch (n.label) {
          case 0:
            return null == t ? [3, 1] : [3, 3];
          case 1:
            return [4, caches.open(u)];
          case 2:
            t = n.sent(), n.label = 3;
          case 3:
            return [2, t]
          }
        }))
      }))
    };
    be(n, Bn, (function (n) {
      return s(r, void 0, void 0, (function () {
        var r, u, o, e, f, c, a, d, b, m = this;
        return v(this, (function (w) {
          switch (w.label) {
          case 0:
            switch (r = n.source, o = function () {
                je(r, it)
              }, null == (u = n.data) ? void 0 : u.type) {
            case "eval":
              return [3, 1];
            case it:
              return [3, 2];
            case me:
              return [3, 5]
            }
            return [3, 7];
          case 1:
            return E(A("send", u.data), zo(pe, r)), [3, 7];
          case 2:
            return He[r.id] = f = {
              i: e = u.data,
              hs: []
            }, a = xe, [4, i()];
          case 3:
            return [4, a.apply(void 0, [w.sent(), e])];
          case 4:
            return Yu((c = w.sent()).headers, (function (n) {
              return s(m, void 0, void 0, (function () {
                var t;
                return v(this, (function (u) {
                  switch (u.label) {
                  case 0:
                    return n.has(it) ? (o(), [3, 3]) : [3, 1];
                  case 1:
                    return n.forEach((function (n, t) {
                      t != we && t != ye && f.hs.push([t, n])
                    })), [4, c.clone().text()];
                  case 2:
                    t = u.sent(), Ie(r, t), u.label = 3;
                  case 3:
                    return [2]
                  }
                }))
              }))
            })), [3, 7];
          case 5:
            return d = He[r.id], b = new Response(u.data, {
              headers: h(h([], l(d.hs), !1), [
                [it, "true"]
              ], !1)
            }), [4, Ee(t, d.i, b)];
          case 6:
            return w.sent(), o(), [3, 7];
          case 7:
            return [2]
          }
        }))
      }))
    })), be(n, Pn, (function (t) {
      var u = t.request;
      new URL(u.url).origin == n.location.origin && t.respondWith(de((function () {
        return s(r, void 0, void 0, (function () {
          var n, t;
          return v(this, (function (r) {
            switch (r.label) {
            case 0:
              return t = xe, [4, i()];
            case 1:
              return [4, t.apply(void 0, [r.sent(), u])];
            case 2:
              return [2, (n = r.sent()).body.locked ? n.clone() : n]
            }
          }))
        }))
      })))
    }))
  }
  Ln.once((function (n) {
    _(Ai(n), Bi, -1),
      function (n) {
        ae(n, hr)
      }(Ai(n))
  })), Pe(qe), typeof ko != typeof undefined && ko.call("ready").then((function () {
    var n, t = function (n, t, r) {
      return Object.defineProperty(n, t, r)
    };
    try {
      t({}, "any", {
        value: 0
      })
    } catch (Gn) {
      n = function () {
        if ("undefined" != typeof document) {
          var n = document.documentMode;
          if ("number" == typeof n) return "ie" + n
        }
        return "unknow"
      }(), t = function (t, r, u) {
        console.log(n, t, r, u)
      }
    }
    var r = "ad",
      u = "app",
      i = "auto";

    function o(n, t, r) {
      return n.apply(t, r)
    }

    function e() {
      for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
      var r = "";
      return o(r.concat, r, n)
    }
    var f = "n".concat("am"),
      c = "".concat(f, "e"),
      a = e("cache", c),
      s = "callbacks",
      v = "container",
      l = "document",
      h = "modified",
      d = e(l, "last", h),
      b = "element",
      m = e("enable", "d"),
      w = "flash",
      y = "get",
      p = "hidden",
      I = "info",
      j = "label",
      g = "load",
      O = "".concat(g, "ing"),
      W = "main",
      L = "manager",
      k = "meta",
      S = "".concat(k, "s"),
      N = "DISABLED_MIDGAME",
      Y = e("module", "require"),
      Z = "movie",
      M = "opacity",
      J = "param",
      C = "process",
      X = "r".concat("am"),
      z = "ready",
      F = (e("".concat("referrer", "Policy")), "reward"),
      A = "roll",
      T = "ruffle",
      R = "script",
      V = "set",
      D = "shockwave",
      G = "size",
      P = "state",
      E = "sw",
      x = "trigger",
      H = e(x, "s"),
      q = e("unity", "instance"),
      Q = "version",
      B = "view",
      U = "100%";

    function $(n, t) {
      return n.join(t)
    }

    function _() {
      for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
      return $(n, ".")
    }

    function K() {
      for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
      return $(n, " ")
    }

    function nn() {
      for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
      return $(n, "/")
    }
    var tn, rn, un = nn("application", function () {
        for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
        return $(n, "-")
      }("x", D, w)),
      on = (nn("text", "javascript"), "undefined");

    function en(n) {
      return n !== on
    }

    function fn(n) {
      return tn || (tn = en(typeof cancelAnimationFrame) ? cancelAnimationFrame : clearTimeout), tn(n)
    }

    function cn(n, t) {
      for (var r = [], u = 2; u < arguments.length; u++) r[u - 2] = arguments[u];
      return o(n, t, r)
    }

    function an() {
      return performance
    }

    function sn() {
      return en(typeof performance)
    }

    function vn(n, t) {
      return function (n) {
        return typeof n
      }(n) === t
    }

    function ln(n) {
      return vn(n, "string")
    }

    function hn(n) {
      return vn(n, "number")
    }

    function dn(n) {
      return vn(n, "function")
    }

    function bn() {
      return Date.now ? Date.now() : function (n) {
        return n.getTime()
      }(new Date)
    }! function (n) {
      n.DEFAULT = "yyyy-MM-dd HH:mm:ss.SSS", n.yyyyMMddHHmmss = "yyyy-MM-dd HH:mm:ss", n.yyyyMMdd = "yyyy-MM-dd", n.HHmmss = "HH:mm:ss"
    }(rn || (rn = {}));
    var mn, wn = sn() ? NaN : bn();

    function yn() {
      return an().now
    }

    function pn() {
      var n, t;
      if (sn()) {
        var r = null !== (n = an().timeOrigin) && void 0 !== n ? n : null === (t = an().timing) || void 0 === t ? void 0 : t.navigationStart;
        if (hn(r)) return r
      }
      return wn
    }

    function In() {
      return sn() && yn() ? cn(yn(), an()) : function (n) {
        return function (n, t) {
          return t - n
        }(n, bn())
      }(pn())
    }

    function jn(n) {
      return mn || (mn = en(typeof requestAnimationFrame) ? requestAnimationFrame : gn), mn(n)
    }

    function gn(n) {
      return setTimeout((function () {
        var t = In();
        n(t)
      }), 1e3 / 60)
    }

    function On(n, t, r) {
      void 0 === t && (t = null), void 0 === r && (r = !1);
      var u = function () {
        return t && t()
      };
      if (r && n()) return u(), null;
      var i = function (t) {
          n() ? u() : o = jn(i)
        },
        o = jn(i);
      return {
        revoke: function () {
          fn(o)
        }
      }
    }

    function Wn(n) {
      return function (n, t, r) {
        return new n(t, r)
      }(TypeError, n)
    }

    function Ln(n) {
      if (!dn(n)) throw Wn(n + " is not a function")
    }

    function kn(n, t, r) {
      for (var u = [], i = 3; i < arguments.length; i++) u[i - 3] = arguments[i];
      return o(n || r, t, u)
    }

    function Sn(n, t, r) {
      for (var u, i = [], e = 3; e < arguments.length; e++) i[e - 3] = arguments[e];
      return n ? u = n : (u = r, i.unshift(t)), o(u, t, i)
    }

    function Nn(n, t) {
      return kn(Object.hasOwn, Object, Yn, n, t)
    }

    function Yn(n, t) {
      return cn(Object.prototype.hasOwnProperty, n, t)
    }

    function Zn(n, t) {
      Ln(t);
      for (var r = 0, u = n.length; r < u; r++) Nn(n, r) && t(n[r], r, n)
    }

    function Mn(n, t) {
      return Sn(n.forEach, n, Zn, t)
    }
    var Jn = function () {
      return Jn = Object.assign || function (n) {
        for (var t, r = 1, u = arguments.length; r < u; r++)
          for (var i in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i]);
        return n
      }, Jn.apply(this, arguments)
    };

    function Cn(n, t) {
      var r = {};
      for (var u in n) Object.prototype.hasOwnProperty.call(n, u) && t.indexOf(u) < 0 && (r[u] = n[u]);
      if (null != n && "function" == typeof Object.getOwnPropertySymbols) {
        var i = 0;
        for (u = Object.getOwnPropertySymbols(n); i < u.length; i++) t.indexOf(u[i]) < 0 && Object.prototype.propertyIsEnumerable.call(n, u[i]) && (r[u[i]] = n[u[i]])
      }
      return r
    }

    function Xn(n, t, r) {
      if (r || 2 === arguments.length)
        for (var u, i = 0, o = t.length; i < o; i++) !u && i in t || (u || (u = Array.prototype.slice.call(t, 0, i)), u[i] = t[i]);
      return n.concat(u || Array.prototype.slice.call(t))
    }

    function zn(n, t, r) {
      return null != r || (r = n.length), r > n.length && (r = n.length), n.substring(r - t.length, r) === t
    }

    function Fn(n) {
      return n.toUpperCase()
    }

    function An(n) {
      return n.length > 0 ? Fn(n.charAt(0)) + n.slice(1) : n
    }

    function Tn(n, t) {
      return n === t
    }

    function Rn(n) {
      return function (n) {
        return Tn(n, null)
      }(n) || function (n) {
        return Tn(n, undefined)
      }(n)
    }

    function Vn(n) {
      if (Rn(n)) throw Wn("Cannot convert undefined or null to object")
    }

    function Dn(n, t) {
      return t < 0 && (t += n.length), n[t]
    }

    function Pn(n, t) {
      return Sn(n.at, n, Dn, t)
    }

    function En(n) {
      return !! function (n, t) {
        try {
          return n(t)
        } catch (r) {}
        return undefined
      }(xn, n)
    }

    function xn(n) {
      return n.apply
    }

    function Hn(n, t) {
      var r = [];
      return r.length = n.length, Zn(n, (function (u, i) {
        r[i] = t(u, i, n)
      })), r
    }

    function qn(n, t) {
      return Sn(n.map, n, Hn, t)
    }

    function Qn(n) {
      return "return " + n
    }

    function Bn(n) {
      return n.constructor
    }

    function Un() {
      for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
      return o(Bn(Un), null, n)
    }

    function $n(n, t) {
      return o(En(n) ? n : Un.apply(void 0, function (n, t) {
        for (var r = [], u = 2; u < arguments.length; u++) r[u - 2] = arguments[u];
        var i = qn(t, (function (n, t) {
          return "p" + t
        }));
        return i.push(Qn(n + "(" + i.join(",") + ");")), i.unshift.apply(i, r), i
      }("f", t)), undefined, t)
    }

    function _n(n) {
      for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
      return $n(n, t.length > 0 ? t.slice(0, -1).concat(Pn(t, -1)) : [])
    }

    function Kn(n) {
      return kn(Object.keys, Object, nt, n)
    }

    function nt(n) {
      Vn(n);
      var t = [];
      for (var r in n) Nn(n, r) && t.push(r);
      if (!{
          toString: null
        }.propertyIsEnumerable("toString"))
        for (var u = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], i = 0, o = u.length; i < o; i++) Nn(n, u[i]) && t.push(u[i]);
      return t
    }

    function tt(n) {
      return kn(Object.entries, Object, rt, n)
    }

    function rt(n) {
      return qn(Kn(n), (function (t) {
        return [t, n[t]]
      }))
    }

    function ut(n, t) {
      Mn(tt(n), (function (r) {
        return t(r[1], r[0], n)
      }))
    }

    function it(n) {
      return Object(n)
    }

    function ot() {
      for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
      return et(n)
    }

    function et(n) {
      return _n(kn, Object.assign, Object, ft, n)
    }

    function ft() {
      for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
      var r = n[0],
        u = n.slice(1);
      Vn(r);
      var i = it(r);
      return Mn(u, (function (n) {
        var t;
        Rn(n) || (ut(n, (function (n, t) {
          i[t] = n
        })), null === (t = Object.getOwnPropertySymbols) || void 0 === t || t.call(Object, n).forEach((function (t) {
          i[t] = n[t]
        })))
      })), i
    }

    function ct() {
      for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
      return ot.apply(void 0, Xn([{}], n, !1))
    }

    function at(n, t) {
      return {
        width: n,
        height: t
      }
    }

    function st() {
      return at(U, U)
    }

    function vt(n, t) {
      for (var r = 0, u = n.length; r < u; r++)
        if (t(n[r], r, n)) return r;
      return -1
    }

    function lt(n, t) {
      return Sn(n.findIndex, n, vt, t)
    }

    function ht(n, t, r) {
      n.setAttribute(t, r)
    }

    function dt(n, t) {
      for (var r in t) ht(n, r, t[r])
    }

    function bt(n, t) {
      return n.appendChild(t)
    }

    function mt(n) {
      return n.ownerDocument
    }

    function wt(n, t) {
      return n.createTextNode(t)
    }

    function yt(n, t) {
      return ln(t) ? wt(n, t) : t
    }

    function pt(n) {
      for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
      return _n(Sn, n.append, n, It, t)
    }

    function It(n) {
      for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
      Mn(t, (function (t) {
        return bt(n, yt(mt(n), t))
      }))
    }

    function jt() {}

    function gt(n, t) {
      return n[t]
    }

    function Ot(n, t, r) {
      n[t] = r
    }

    function Wt(n) {
      return n.style
    }! function () {
      function n(n) {
        this.t = n
      }
      n.prototype.toString = function () {
        return dn(this.t) ? this.t() : this.t
      }
    }();
    var Lt = {};

    function kt(n, t, r) {
      var u = Wt(n),
        i = Lt[t];
      i || (Lt[t] = i = ln(gt(u, t)) ? Ot : function (n, t) {
        var r = An(t),
          u = qn(["ms", "Moz", "webkit"], (function (n) {
            return e(n, r)
          })),
          i = lt(u, (function (t) {
            return ln(gt(n, t))
          }));
        if (i > -1) {
          var o = u[i];
          return function (n, t, r) {
            return Ot(n, o, r)
          }
        }
        return jt
      }(u, t)), i(u, t, r)
    }

    function St(n, t) {
      for (var r in t) kt(n, r, t[r])
    }

    function Nt(n) {
      for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
      var u = n.childNodes[0];
      Mn(t, (function (t) {
        return n.insertBefore(yt(mt(n), t), u)
      }))
    }

    function Yt(n) {
      return Sn(n.remove, n, Zt)
    }

    function Zt(n) {
      var t;
      null === (t = n.parentNode) || void 0 === t || t.removeChild(n)
    }

    function Mt(n, t, r) {
      try {
        return n(t, r)
      } catch (u) {}
      return undefined
    }

    function Jt(n) {
      for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
      return Mt($n, n, t)
    }

    function Ct(n, t) {
      return n.getElementsByTagName(t)
    }

    function Xt(n) {
      return kn(Number.isNaN, Number, zt, n)
    }

    function zt(n) {
      return hn(n) && isNaN(n)
    }

    function Ft(n) {
      return -0 === n && function (n) {
        return 1 / n == -Infinity
      }(n)
    }

    function At(n) {
      return 0 === n && function (n) {
        return 1 / n === Infinity
      }(n)
    }

    function Tt(n, t) {
      return kn(Object.is, Object, Rt, n, t)
    }

    function Rt(n, t) {
      return n === t ? !(At(n) && Ft(t) || Ft(n) && At(t)) : Xt(n) && Xt(t)
    }

    function Vt(n, t) {
      return n.getElementById(t)
    }

    function Dt(n, t) {
      return n.removeChild(t)
    }

    function Gt(n, t) {
      switch (n.nodeType) {
      case 4:
      case 8:
      case 7:
      case 3:
        n.nodeValue = t;
      case 9:
      case 10:
        return
      }
      var r = n.childNodes,
        u = r.length;
      if (u > 0) {
        var i = r[0];
        if (function (n) {
            return 3 === n.nodeType
          }(i)) {
          i.data = t;
          for (var o = u - 1; o > 0; o--) Yt(r[o]);
          return
        }! function (n) {
          for (var t; t = n.lastChild;) Dt(n, t)
        }(n)
      }
      pt(n, t)
    }

    function Pt(n, t, r) {
      var u = function (n) {
        for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        return n.createElement.apply(n, t)
      }(n, t);
      if (r) {
        var i = r.children,
          o = Cn(r, ["children"]);
        ! function (n) {
          for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
          Mn(t, (function (t) {
            var r = t.attributes,
              u = t.style,
              i = t.children,
              o = Cn(t, ["attributes", "style", "children"]);
            r && dt(n, r), u && St(n, u), i && pt.apply(void 0, Xn([n], i, !1)), ot(n, o)
          }))
        }(u, i ? Jn(Jn({}, o), {
          children: qn(i, (function (t) {
            if (dn(t)) return t(u);
            var r = t.tagName,
              i = Cn(t, ["tagName"]);
            return Pt(n, r, i)
          }))
        }) : o)
      }
      return u
    }

    function Et(n, t, r) {
      var u = Pt(mt(n), t, r);
      return pt(n, u), u
    }

    function xt() {
      for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
      var r = n.pop();
      return $n(r, n)
    }

    function Ht(n, t) {
      return t in n
    }
    e("http", "-", "equiv"), e("content", "-", "security", "-", "policy");
    var qt = "value";

    function Qt(n, t, r) {
      return kn(Object.defineProperty, Object, Bt, n, t, r)
    }

    function Bt(n, t, r) {
      if (Ht(r, qt)) {
        if (Ht(r, y) || Ht(r, V)) throw Wn("Invalid property descriptor. Cannot both specify accessors and a value or writable attribute");
        return Ot(n, t, r.value), n
      }
      return Ht(r, y) && Ut("getter", gt(r, y)), Ht(r, V) && Ut("setter", gt(r, V)), n
    }

    function Ut(n, t) {
      if (!Tt(t, undefined)) {
        if (!dn(t)) throw Wn("".concat(An(n), " must be a function: ").concat(t));
        throw Wn("no shim for ".concat(n))
      }
    }

    function $t() {
      return en(typeof globalThis) ? globalThis : en(typeof window) ? window : en(typeof global) ? global : en(typeof self) ? self : function () {
        return this
      }()
    }

    function _t(n) {
      return function (n) {
        var t, r;
        return null !== (t = n.head) && void 0 !== t ? t : null === (r = Ct(n, "head")) || void 0 === r ? void 0 : r[0]
      }(n) || function (n) {
        var t, r;
        return null !== (t = n.body) && void 0 !== t ? t : null === (r = Ct(n, "body")) || void 0 === r ? void 0 : r[0]
      }(n) || function (n) {
        return n.documentElement
      }(n)
    }
    _(r, m, A), _(r, m, C), _(r, m, F), _(r, N, "before"), _(r, N, "after"), _(r, N, "post"), _(r, x, A), _(r, x, C), _(r, x, F), _(r, B, "setting");
    var Kt = "DISABLED_IAA",
      nr = (_(u, Kt, "DISABLED_SHOPWINDOW"), _(u, Kt, F), "DISABLED_PORTAL"),
      tr = (_(u, nr, "DISABLED_RECOMMEND"), _(u, nr, L), _(u, nr, "DISABLED_INTERSTITIAL"), _(u, L), _(u, q), _(u, e(w, Z))),
      rr = (_(u, Y), _(u, a), _(u, l), _(u, d), _(u, G)),
      ur = _(u, e(T, "js")),
      ir = (_(u, "slient"), _(u, "DISABLED_CAPSULE"), _(u, "logo"), _(u, "newversion"), _(u, e(T, "config"))),
      or = _(u, e(w, "frame")),
      er = (_(b, e("stop", "event")), _(b, v), _(b, W)),
      fr = (_(b, "overlay"), _(I, "id"), _(I, "developer"), _(I, c), _(I, Q), _(I, "channel"), _(I, "date"), _(I, "orientation"), _(O, "progress")),
      cr = _(O, j),
      ar = (_(O, "priority"), _(O, P), _(f, "loc"), _(f, Q), _(f, "history"), _(f, H), _(X, m), _(X, P), _(X, i), _(X, s), _(z, "waiting"), _(z, P), _(z, "closings"), _(z, s), _(E, m), _(E, e(R, "url")), _(E, P), _(E, "rcsp"), _(E, i), _(x, "fullscreen"), _(x, "DISABLED_MOREGAMES"), _(x, "menu"), _(x, g), _(x, e(f, "init")), _(B, c), _(B, G), function () {
        for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
        return $n(ko.call, n)
      }),
      sr = An(D),
      vr = An(w),
      lr = e(sr, vr);

    function hr() {
      dr("".concat(Fn(O), "..."))
    }

    function dr(n) {
      ar(cr, n), Yr && Gt(Yr, n)
    }

    function br(n) {
      ar(fr, n)
    }

    function mr(n, t) {
      gr(e(n.type, ": ", t))
    }

    function wr(n) {
      ar(z).then(n)
    }

    function yr(n) {
      return ar(_(S, y), n)
    }

    function pr() {
      var n;
      return null !== (n = yr(tr)) && void 0 !== n ? n : _(W, "swf")
    }

    function Ir(n, t) {
      xt(n, "PercentLoaded", "TGetProperty", "TotalFrames", (function (t) {
        return kt(n, M, t + "")
      }), (function () {
        return Yt(t)
      }), (function (n, t, r, u, i, o) {
        i(0), On((function () {
          return Ht(n, t) && n[t]() > 0
        }), (function () {
          kt(n, "transition", K(M, "0.5s")), i(1), Ht(n, r) && Ht(n, u) && (hn(n[u]) ? n[u] : n[u]()) > 1 ? (hr(), xt(function () {
            var n;
            return null !== (n = yr(or)) && void 0 !== n ? n : 1
          }(), (function (u) {
            var i;
            On((function () {
              var o = n[t]();
              return i !== o && br((i = o) / 100), +n[r]("/", 12) >= u - 1
            }), o, !0)
          }))) : o()
        }), !0)
      }))
    }

    function jr(n) {
      (function (n) {
        for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        _n(Sn, n.prepend, n, Nt, t)
      })(Sr, n),
      function (n, t) {
        ar(_(S, V), n, t)
      }(er, n), Ir(n, Nr)
    }

    function gr(n) {
      dr(n)
    }

    function Or(n, t) {
      dr(K(Fn(g), Fn(T) + "...")),
        function (n, t, r) {
          Et(_t(n), R, Jn(Jn({}, r), {
            src: t
          }))
        }(kr, n, {
          onload: t,
          onerror: function (t) {
            return mr(t, n)
          }
        })
    }

    function Wr() {
      var n = RufflePlayer.newest().createPlayer();
      St(n, st()), Qt(n, "nodeName", {
        get: function () {
          return Fn("embed")
        }
      }), Mn(tt({
        allowFullScreen: "true",
        allowScriptAccess: "always",
        allowNetworking: "all",
        wmode: "opaque"
      }), (function (t) {
        ht(n, t[0], t[1])
      })), jr(n), wr((function () {
        var t = pr();
        if (en(typeof XMLHttpRequest)) {
          var r = new XMLHttpRequest;
          r.responseType = "arraybuffer", r.open(Fn(y), t, !0), hr();
          var u = yr(rr),
            i = null == u ? void 0 : u[t];
          r.onprogress = function (n) {
            var t, r = n.loaded;
            (null !== (t = n.lengthComputable) && void 0 !== t ? t : n.total > 0) ? br(r / n.total): i > 0 ? br(r / i) : dr("".concat(Fn(O), " (").concat(r, ")"))
          }, r.onload = function () {
            var t = r.status;
            if (t >= 200 && t < 300) {
              var u = r.response;
              i > 0 && i !== u.byteLength ? gr(K("data", h)) : Lr(n, {
                data: u
              })
            } else gr(K(t, r.statusText))
          }, r.onabort = r.onerror = r.ontimeout = function (n) {
            mr(n, t)
          }, r.send()
        } else Lr(n, {
          url: t
        })
      }))
    }

    function Lr(n, t) {
      dr(K(Fn(g), e(Fn("player"), "..."))), (n.ruffle ? n.ruffle(1) : n).load(ct(yr(ir), t, {
        allowFullscreen: !0,
        allowNetworking: "all",
        allowScriptAccess: !0,
        polyfills: !1,
        autoplay: "on",
        unmuteOverlay: p,
        deviceFontRenderer: "canvas",
        splashScreen: !1,
        preloader: !1
      })).then((function () {
        dr(e(Fn(z), "..."))
      }), (function (n) {
        gr(K(n))
      }))
    }
    var kr = document,
      Sr = Vt(kr, v),
      Nr = Vt(kr, O),
      Yr = Vt(kr, j),
      Zr = Jt((function () {
        var n, t = null === (n = navigator.plugins) || void 0 === n ? void 0 : n.namedItem(K(sr, vr));
        return !!t && function (n, t, r) {
          return Sn(n.endsWith, n, zn, t, r)
        }(t.filename, ".dll")
      })) ? 1 : Jt((function () {
        return !!new ActiveXObject(_(lr, lr))
      })) ? 2 : 0;
    (function () {
      var n, t, r, u;
      ot(null !== (t = (u = null !== (n = (r = $t()).RufflePlayer) && void 0 !== n ? n : r.RufflePlayer = {}).config) && void 0 !== t ? t : u.config = {}, {
        polyfills: !1
      })
    })(), Zr > 0 ? function () {
      var n = Pt(kr, "object", {
        attributes: {
          id: W,
          type: un,
          width: U,
          height: U
        }
      });
      Mn(tt({
        allowFullScreen: "true",
        allowScriptAccess: "always",
        allowNetworking: "all",
        wmode: "opaque"
      }), (function (t) {
        Et(n, J, {
          attributes: {
            name: t[0],
            value: t[1]
          }
        })
      })), 2 === Zr && function (n) {
        return n.documentMode
      }(kr) < 11 && (n = n.cloneNode(!0)), jr(n), wr((function () {
        var t = pr();
        Et(n, J, {
          attributes: {
            name: Z,
            value: t
          }
        }), 2 === Zr && (n.movie = t)
      }))
    }() : en(typeof RufflePlayer) && RufflePlayer.newest ? Wr() : wr((function () {
      ! function () {
        try {
          return !!Un("(a)=>(a??={...a})")
        } catch (n) {
          return !1
        }
      }() ? gr("No support ".concat(w, " or ").concat(T)): gr("Ruffle not found. Make sure ../@ruffle-rs/ruffle@0.6.0/ruffle.js is loaded before main.js")
    }))
  }))
}();