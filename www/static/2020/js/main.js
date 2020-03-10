!function(e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e);
    } : t(e);
}("undefined" != typeof window ? window : this, function(T, e) {
    "use strict";
    var t = [], k = T.document, r = Object.getPrototypeOf, s = t.slice, m = t.concat, u = t.push, i = t.indexOf, n = {}, o = n.toString, h = n.hasOwnProperty, a = h.toString, l = a.call(Object), g = {};
    function v(e, t) {
        var n = (t = t || k).createElement("script");
        n.text = e, t.head.appendChild(n).parentNode.removeChild(n);
    }
    function c(e, t) {
        return t.toUpperCase();
    }
    var f = "3.1.1", E = function(e, t) {
        return new E.fn.init(e, t);
    }, d = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, p = /^-ms-/, y = /-([a-z])/g;
    function b(e) {
        var t = !!e && "length" in e && e.length, n = E.type(e);
        return "function" !== n && !E.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e);
    }
    E.fn = E.prototype = {
        jquery: f,
        constructor: E,
        length: 0,
        toArray: function() {
            return s.call(this);
        },
        get: function(e) {
            return null == e ? s.call(this) : e < 0 ? this[e + this.length] : this[e];
        },
        pushStack: function(e) {
            var t = E.merge(this.constructor(), e);
            return t.prevObject = this, t;
        },
        each: function(e) {
            return E.each(this, e);
        },
        map: function(n) {
            return this.pushStack(E.map(this, function(e, t) {
                return n.call(e, t, e);
            }));
        },
        slice: function() {
            return this.pushStack(s.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(e) {
            var t = this.length, n = +e + (e < 0 ? t : 0);
            return this.pushStack(0 <= n && n < t ? [ this[n] ] : []);
        },
        end: function() {
            return this.prevObject || this.constructor();
        },
        push: u,
        sort: t.sort,
        splice: t.splice
    }, E.extend = E.fn.extend = function() {
        var e, t, n, r, i, o, a = arguments[0] || {}, s = 1, u = arguments.length, l = !1;
        for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == typeof a || E.isFunction(a) || (a = {}), 
        s === u && (a = this, s--); s < u; s++) if (null != (e = arguments[s])) for (t in e) n = a[t], 
        a !== (r = e[t]) && (l && r && (E.isPlainObject(r) || (i = E.isArray(r))) ? (o = i ? (i = !1, 
        n && E.isArray(n) ? n : []) : n && E.isPlainObject(n) ? n : {}, a[t] = E.extend(l, o, r)) : void 0 !== r && (a[t] = r));
        return a;
    }, E.extend({
        expando: "jQuery" + (f + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e);
        },
        noop: function() {},
        isFunction: function(e) {
            return "function" === E.type(e);
        },
        isArray: Array.isArray,
        isWindow: function(e) {
            return null != e && e === e.window;
        },
        isNumeric: function(e) {
            var t = E.type(e);
            return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e));
        },
        isPlainObject: function(e) {
            var t, n;
            return !(!e || "[object Object]" !== o.call(e)) && (!(t = r(e)) || "function" == typeof (n = h.call(t, "constructor") && t.constructor) && a.call(n) === l);
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0;
        },
        type: function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? n[o.call(e)] || "object" : typeof e;
        },
        globalEval: function(e) {
            v(e);
        },
        camelCase: function(e) {
            return e.replace(p, "ms-").replace(y, c);
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
        },
        each: function(e, t) {
            var n, r = 0;
            if (b(e)) for (n = e.length; r < n && !1 !== t.call(e[r], r, e[r]); r++) ; else for (r in e) if (!1 === t.call(e[r], r, e[r])) break;
            return e;
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(d, "");
        },
        makeArray: function(e, t) {
            var n = t || [];
            return null != e && (b(Object(e)) ? E.merge(n, "string" == typeof e ? [ e ] : e) : u.call(n, e)), 
            n;
        },
        inArray: function(e, t, n) {
            return null == t ? -1 : i.call(t, e, n);
        },
        merge: function(e, t) {
            for (var n = +t.length, r = 0, i = e.length; r < n; r++) e[i++] = t[r];
            return e.length = i, e;
        },
        grep: function(e, t, n) {
            for (var r = [], i = 0, o = e.length, a = !n; i < o; i++) !t(e[i], i) != a && r.push(e[i]);
            return r;
        },
        map: function(e, t, n) {
            var r, i, o = 0, a = [];
            if (b(e)) for (r = e.length; o < r; o++) null != (i = t(e[o], o, n)) && a.push(i); else for (o in e) null != (i = t(e[o], o, n)) && a.push(i);
            return m.apply([], a);
        },
        guid: 1,
        proxy: function(e, t) {
            var n, r, i;
            if ("string" == typeof t && (n = e[t], t = e, e = n), E.isFunction(e)) return r = s.call(arguments, 2), 
            (i = function() {
                return e.apply(t || this, r.concat(s.call(arguments)));
            }).guid = e.guid = e.guid || E.guid++, i;
        },
        now: Date.now,
        support: g
    }), "function" == typeof Symbol && (E.fn[Symbol.iterator] = t[Symbol.iterator]), 
    E.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
        n["[object " + t + "]"] = t.toLowerCase();
    });
    var x = function(n) {
        function f(e, t, n) {
            var r = "0x" + t - 65536;
            return r != r || n ? t : r < 0 ? String.fromCharCode(65536 + r) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320);
        }
        function i() {
            C();
        }
        var e, p, x, o, a, h, d, m, w, u, l, C, T, s, k, g, c, v, y, E = "sizzle" + 1 * new Date(), b = n.document, N = 0, r = 0, S = ae(), F = ae(), j = ae(), D = function(e, t) {
            return e === t && (l = !0), 0;
        }, A = {}.hasOwnProperty, t = [], $ = t.pop, L = t.push, q = t.push, O = t.slice, H = function(e, t) {
            for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return n;
            return -1;
        }, I = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", R = "[\\x20\\t\\r\\n\\f]", P = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+", M = "\\[" + R + "*(" + P + ")(?:" + R + "*([*^$|!~]?=)" + R + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + P + "))|)" + R + "*\\]", W = ":(" + P + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + M + ")*)|.*)\\)|)", B = new RegExp(R + "+", "g"), z = new RegExp("^" + R + "+|((?:^|[^\\\\])(?:\\\\.)*)" + R + "+$", "g"), _ = new RegExp("^" + R + "*," + R + "*"), V = new RegExp("^" + R + "*([>+~]|" + R + ")" + R + "*"), U = new RegExp("=" + R + "*([^\\]'\"]*?)" + R + "*\\]", "g"), X = new RegExp(W), G = new RegExp("^" + P + "$"), J = {
            ID: new RegExp("^#(" + P + ")"),
            CLASS: new RegExp("^\\.(" + P + ")"),
            TAG: new RegExp("^(" + P + "|[*])"),
            ATTR: new RegExp("^" + M),
            PSEUDO: new RegExp("^" + W),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + R + "*(even|odd|(([+-]|)(\\d*)n|)" + R + "*(?:([+-]|)" + R + "*(\\d+)|))" + R + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + I + ")$", "i"),
            needsContext: new RegExp("^" + R + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + R + "*((?:-\\d)?\\d*)" + R + "*\\)|)(?=[^-]|$)", "i")
        }, Y = /^(?:input|select|textarea|button)$/i, Q = /^h\d$/i, K = /^[^{]+\{\s*\[native \w/, Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ee = /[+~]/, te = new RegExp("\\\\([\\da-f]{1,6}" + R + "?|(" + R + ")|.)", "ig"), ne = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, re = function(e, t) {
            return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e;
        }, ie = ye(function(e) {
            return !0 === e.disabled && ("form" in e || "label" in e);
        }, {
            dir: "parentNode",
            next: "legend"
        });
        try {
            q.apply(t = O.call(b.childNodes), b.childNodes), t[b.childNodes.length].nodeType;
        } catch (e) {
            q = {
                apply: t.length ? function(e, t) {
                    L.apply(e, O.call(t));
                } : function(e, t) {
                    for (var n = e.length, r = 0; e[n++] = t[r++]; ) ;
                    e.length = n - 1;
                }
            };
        }
        function oe(e, t, n, r) {
            var i, o, a, s, u, l, c, f = t && t.ownerDocument, d = t ? t.nodeType : 9;
            if (n = n || [], "string" != typeof e || !e || 1 !== d && 9 !== d && 11 !== d) return n;
            if (!r && ((t ? t.ownerDocument || t : b) !== T && C(t), t = t || T, k)) {
                if (11 !== d && (u = Z.exec(e))) if (i = u[1]) {
                    if (9 === d) {
                        if (!(a = t.getElementById(i))) return n;
                        if (a.id === i) return n.push(a), n;
                    } else if (f && (a = f.getElementById(i)) && y(t, a) && a.id === i) return n.push(a), 
                    n;
                } else {
                    if (u[2]) return q.apply(n, t.getElementsByTagName(e)), n;
                    if ((i = u[3]) && p.getElementsByClassName && t.getElementsByClassName) return q.apply(n, t.getElementsByClassName(i)), 
                    n;
                }
                if (p.qsa && !j[e + " "] && (!g || !g.test(e))) {
                    if (1 !== d) f = t, c = e; else if ("object" !== t.nodeName.toLowerCase()) {
                        for ((s = t.getAttribute("id")) ? s = s.replace(ne, re) : t.setAttribute("id", s = E), 
                        o = (l = h(e)).length; o--; ) l[o] = "#" + s + " " + ve(l[o]);
                        c = l.join(","), f = ee.test(e) && me(t.parentNode) || t;
                    }
                    if (c) try {
                        return q.apply(n, f.querySelectorAll(c)), n;
                    } catch (e) {} finally {
                        s === E && t.removeAttribute("id");
                    }
                }
            }
            return m(e.replace(z, "$1"), t, n, r);
        }
        function ae() {
            var r = [];
            return function e(t, n) {
                return r.push(t + " ") > x.cacheLength && delete e[r.shift()], e[t + " "] = n;
            };
        }
        function se(e) {
            return e[E] = !0, e;
        }
        function ue(e) {
            var t = T.createElement("fieldset");
            try {
                return !!e(t);
            } catch (e) {
                return !1;
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null;
            }
        }
        function le(e, t) {
            for (var n = e.split("|"), r = n.length; r--; ) x.attrHandle[n[r]] = t;
        }
        function ce(e, t) {
            var n = t && e, r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
            if (r) return r;
            if (n) for (;n = n.nextSibling; ) if (n === t) return -1;
            return e ? 1 : -1;
        }
        function fe(t) {
            return function(e) {
                return "input" === e.nodeName.toLowerCase() && e.type === t;
            };
        }
        function de(n) {
            return function(e) {
                var t = e.nodeName.toLowerCase();
                return ("input" === t || "button" === t) && e.type === n;
            };
        }
        function pe(t) {
            return function(e) {
                return "form" in e ? e.parentNode && !1 === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && ie(e) === t : e.disabled === t : "label" in e && e.disabled === t;
            };
        }
        function he(a) {
            return se(function(o) {
                return o = +o, se(function(e, t) {
                    for (var n, r = a([], e.length, o), i = r.length; i--; ) e[n = r[i]] && (e[n] = !(t[n] = e[n]));
                });
            });
        }
        function me(e) {
            return e && void 0 !== e.getElementsByTagName && e;
        }
        for (e in p = oe.support = {}, a = oe.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return !!t && "HTML" !== t.nodeName;
        }, C = oe.setDocument = function(e) {
            var t, n, r = e ? e.ownerDocument || e : b;
            return r !== T && 9 === r.nodeType && r.documentElement && (s = (T = r).documentElement, 
            k = !a(T), b !== T && (n = T.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", i, !1) : n.attachEvent && n.attachEvent("onunload", i)), 
            p.attributes = ue(function(e) {
                return e.className = "i", !e.getAttribute("className");
            }), p.getElementsByTagName = ue(function(e) {
                return e.appendChild(T.createComment("")), !e.getElementsByTagName("*").length;
            }), p.getElementsByClassName = K.test(T.getElementsByClassName), p.getById = ue(function(e) {
                return s.appendChild(e).id = E, !T.getElementsByName || !T.getElementsByName(E).length;
            }), p.getById ? (x.filter.ID = function(e) {
                var t = e.replace(te, f);
                return function(e) {
                    return e.getAttribute("id") === t;
                };
            }, x.find.ID = function(e, t) {
                if (void 0 !== t.getElementById && k) {
                    var n = t.getElementById(e);
                    return n ? [ n ] : [];
                }
            }) : (x.filter.ID = function(e) {
                var n = e.replace(te, f);
                return function(e) {
                    var t = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                    return t && t.value === n;
                };
            }, x.find.ID = function(e, t) {
                if (void 0 !== t.getElementById && k) {
                    var n, r, i, o = t.getElementById(e);
                    if (o) {
                        if ((n = o.getAttributeNode("id")) && n.value === e) return [ o ];
                        for (i = t.getElementsByName(e), r = 0; o = i[r++]; ) if ((n = o.getAttributeNode("id")) && n.value === e) return [ o ];
                    }
                    return [];
                }
            }), x.find.TAG = p.getElementsByTagName ? function(e, t) {
                return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : p.qsa ? t.querySelectorAll(e) : void 0;
            } : function(e, t) {
                var n, r = [], i = 0, o = t.getElementsByTagName(e);
                if ("*" !== e) return o;
                for (;n = o[i++]; ) 1 === n.nodeType && r.push(n);
                return r;
            }, x.find.CLASS = p.getElementsByClassName && function(e, t) {
                if (void 0 !== t.getElementsByClassName && k) return t.getElementsByClassName(e);
            }, c = [], g = [], (p.qsa = K.test(T.querySelectorAll)) && (ue(function(e) {
                s.appendChild(e).innerHTML = "<a id='" + E + "'></a><select id='" + E + "-\r\\' msallowcapture=''><option selected=''></option></select>", 
                e.querySelectorAll("[msallowcapture^='']").length && g.push("[*^$]=" + R + "*(?:''|\"\")"), 
                e.querySelectorAll("[selected]").length || g.push("\\[" + R + "*(?:value|" + I + ")"), 
                e.querySelectorAll("[id~=" + E + "-]").length || g.push("~="), e.querySelectorAll(":checked").length || g.push(":checked"), 
                e.querySelectorAll("a#" + E + "+*").length || g.push(".#.+[+~]");
            }), ue(function(e) {
                e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var t = T.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && g.push("name" + R + "*[*^$|!~]?="), 
                2 !== e.querySelectorAll(":enabled").length && g.push(":enabled", ":disabled"), 
                s.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && g.push(":enabled", ":disabled"), 
                e.querySelectorAll("*,:x"), g.push(",.*:");
            })), (p.matchesSelector = K.test(v = s.matches || s.webkitMatchesSelector || s.mozMatchesSelector || s.oMatchesSelector || s.msMatchesSelector)) && ue(function(e) {
                p.disconnectedMatch = v.call(e, "*"), v.call(e, "[s!='']:x"), c.push("!=", W);
            }), g = g.length && new RegExp(g.join("|")), c = c.length && new RegExp(c.join("|")), 
            t = K.test(s.compareDocumentPosition), y = t || K.test(s.contains) ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e, r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)));
            } : function(e, t) {
                if (t) for (;t = t.parentNode; ) if (t === e) return !0;
                return !1;
            }, D = t ? function(e, t) {
                if (e === t) return l = !0, 0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n || (1 & (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !p.sortDetached && t.compareDocumentPosition(e) === n ? e === T || e.ownerDocument === b && y(b, e) ? -1 : t === T || t.ownerDocument === b && y(b, t) ? 1 : u ? H(u, e) - H(u, t) : 0 : 4 & n ? -1 : 1);
            } : function(e, t) {
                if (e === t) return l = !0, 0;
                var n, r = 0, i = e.parentNode, o = t.parentNode, a = [ e ], s = [ t ];
                if (!i || !o) return e === T ? -1 : t === T ? 1 : i ? -1 : o ? 1 : u ? H(u, e) - H(u, t) : 0;
                if (i === o) return ce(e, t);
                for (n = e; n = n.parentNode; ) a.unshift(n);
                for (n = t; n = n.parentNode; ) s.unshift(n);
                for (;a[r] === s[r]; ) r++;
                return r ? ce(a[r], s[r]) : a[r] === b ? -1 : s[r] === b ? 1 : 0;
            }), T;
        }, oe.matches = function(e, t) {
            return oe(e, null, null, t);
        }, oe.matchesSelector = function(e, t) {
            if ((e.ownerDocument || e) !== T && C(e), t = t.replace(U, "='$1']"), p.matchesSelector && k && !j[t + " "] && (!c || !c.test(t)) && (!g || !g.test(t))) try {
                var n = v.call(e, t);
                if (n || p.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n;
            } catch (e) {}
            return 0 < oe(t, T, null, [ e ]).length;
        }, oe.contains = function(e, t) {
            return (e.ownerDocument || e) !== T && C(e), y(e, t);
        }, oe.attr = function(e, t) {
            (e.ownerDocument || e) !== T && C(e);
            var n = x.attrHandle[t.toLowerCase()], r = n && A.call(x.attrHandle, t.toLowerCase()) ? n(e, t, !k) : void 0;
            return void 0 !== r ? r : p.attributes || !k ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null;
        }, oe.escape = function(e) {
            return (e + "").replace(ne, re);
        }, oe.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e);
        }, oe.uniqueSort = function(e) {
            var t, n = [], r = 0, i = 0;
            if (l = !p.detectDuplicates, u = !p.sortStable && e.slice(0), e.sort(D), l) {
                for (;t = e[i++]; ) t === e[i] && (r = n.push(i));
                for (;r--; ) e.splice(n[r], 1);
            }
            return u = null, e;
        }, o = oe.getText = function(e) {
            var t, n = "", r = 0, i = e.nodeType;
            if (i) {
                if (1 === i || 9 === i || 11 === i) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += o(e);
                } else if (3 === i || 4 === i) return e.nodeValue;
            } else for (;t = e[r++]; ) n += o(t);
            return n;
        }, (x = oe.selectors = {
            cacheLength: 50,
            createPseudo: se,
            match: J,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(te, f), e[3] = (e[3] || e[4] || e[5] || "").replace(te, f), 
                    "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || oe.error(e[0]), 
                    e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && oe.error(e[0]), 
                    e;
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return J.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && X.test(n) && (t = h(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), 
                    e[2] = n.slice(0, t)), e.slice(0, 3));
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(te, f).toLowerCase();
                    return "*" === e ? function() {
                        return !0;
                    } : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t;
                    };
                },
                CLASS: function(e) {
                    var t = S[e + " "];
                    return t || (t = new RegExp("(^|" + R + ")" + e + "(" + R + "|$)")) && S(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "");
                    });
                },
                ATTR: function(n, r, i) {
                    return function(e) {
                        var t = oe.attr(e, n);
                        return null == t ? "!=" === r : !r || (t += "", "=" === r ? t === i : "!=" === r ? t !== i : "^=" === r ? i && 0 === t.indexOf(i) : "*=" === r ? i && -1 < t.indexOf(i) : "$=" === r ? i && t.slice(-i.length) === i : "~=" === r ? -1 < (" " + t.replace(B, " ") + " ").indexOf(i) : "|=" === r && (t === i || t.slice(0, i.length + 1) === i + "-"));
                    };
                },
                CHILD: function(h, e, t, m, g) {
                    var v = "nth" !== h.slice(0, 3), y = "last" !== h.slice(-4), b = "of-type" === e;
                    return 1 === m && 0 === g ? function(e) {
                        return !!e.parentNode;
                    } : function(e, t, n) {
                        var r, i, o, a, s, u, l = v != y ? "nextSibling" : "previousSibling", c = e.parentNode, f = b && e.nodeName.toLowerCase(), d = !n && !b, p = !1;
                        if (c) {
                            if (v) {
                                for (;l; ) {
                                    for (a = e; a = a[l]; ) if (b ? a.nodeName.toLowerCase() === f : 1 === a.nodeType) return !1;
                                    u = l = "only" === h && !u && "nextSibling";
                                }
                                return !0;
                            }
                            if (u = [ y ? c.firstChild : c.lastChild ], y && d) {
                                for (p = (s = (r = (i = (o = (a = c)[E] || (a[E] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === N && r[1]) && r[2], 
                                a = s && c.childNodes[s]; a = ++s && a && a[l] || (p = s = 0) || u.pop(); ) if (1 === a.nodeType && ++p && a === e) {
                                    i[h] = [ N, s, p ];
                                    break;
                                }
                            } else if (d && (p = s = (r = (i = (o = (a = e)[E] || (a[E] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === N && r[1]), 
                            !1 === p) for (;(a = ++s && a && a[l] || (p = s = 0) || u.pop()) && ((b ? a.nodeName.toLowerCase() !== f : 1 !== a.nodeType) || !++p || (d && ((i = (o = a[E] || (a[E] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] = [ N, p ]), 
                            a !== e)); ) ;
                            return (p -= g) === m || p % m == 0 && 0 <= p / m;
                        }
                    };
                },
                PSEUDO: function(e, o) {
                    var t, a = x.pseudos[e] || x.setFilters[e.toLowerCase()] || oe.error("unsupported pseudo: " + e);
                    return a[E] ? a(o) : 1 < a.length ? (t = [ e, e, "", o ], x.setFilters.hasOwnProperty(e.toLowerCase()) ? se(function(e, t) {
                        for (var n, r = a(e, o), i = r.length; i--; ) e[n = H(e, r[i])] = !(t[n] = r[i]);
                    }) : function(e) {
                        return a(e, 0, t);
                    }) : a;
                }
            },
            pseudos: {
                not: se(function(e) {
                    var r = [], i = [], s = d(e.replace(z, "$1"));
                    return s[E] ? se(function(e, t, n, r) {
                        for (var i, o = s(e, null, r, []), a = e.length; a--; ) (i = o[a]) && (e[a] = !(t[a] = i));
                    }) : function(e, t, n) {
                        return r[0] = e, s(r, null, n, i), r[0] = null, !i.pop();
                    };
                }),
                has: se(function(t) {
                    return function(e) {
                        return 0 < oe(t, e).length;
                    };
                }),
                contains: se(function(t) {
                    return t = t.replace(te, f), function(e) {
                        return -1 < (e.textContent || e.innerText || o(e)).indexOf(t);
                    };
                }),
                lang: se(function(n) {
                    return G.test(n || "") || oe.error("unsupported lang: " + n), n = n.replace(te, f).toLowerCase(), 
                    function(e) {
                        var t;
                        do {
                            if (t = k ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-");
                        } while ((e = e.parentNode) && 1 === e.nodeType);
                        return !1;
                    };
                }),
                target: function(e) {
                    var t = n.location && n.location.hash;
                    return t && t.slice(1) === e.id;
                },
                root: function(e) {
                    return e === s;
                },
                focus: function(e) {
                    return e === T.activeElement && (!T.hasFocus || T.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
                },
                enabled: pe(!1),
                disabled: pe(!0),
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected;
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected;
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return !1;
                    return !0;
                },
                parent: function(e) {
                    return !x.pseudos.empty(e);
                },
                header: function(e) {
                    return Q.test(e.nodeName);
                },
                input: function(e) {
                    return Y.test(e.nodeName);
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t;
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase());
                },
                first: he(function() {
                    return [ 0 ];
                }),
                last: he(function(e, t) {
                    return [ t - 1 ];
                }),
                eq: he(function(e, t, n) {
                    return [ n < 0 ? n + t : n ];
                }),
                even: he(function(e, t) {
                    for (var n = 0; n < t; n += 2) e.push(n);
                    return e;
                }),
                odd: he(function(e, t) {
                    for (var n = 1; n < t; n += 2) e.push(n);
                    return e;
                }),
                lt: he(function(e, t, n) {
                    for (var r = n < 0 ? n + t : n; 0 <= --r; ) e.push(r);
                    return e;
                }),
                gt: he(function(e, t, n) {
                    for (var r = n < 0 ? n + t : n; ++r < t; ) e.push(r);
                    return e;
                })
            }
        }).pseudos.nth = x.pseudos.eq, {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) x.pseudos[e] = fe(e);
        for (e in {
            submit: !0,
            reset: !0
        }) x.pseudos[e] = de(e);
        function ge() {}
        function ve(e) {
            for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
            return r;
        }
        function ye(s, e, t) {
            var u = e.dir, l = e.next, c = l || u, f = t && "parentNode" === c, d = r++;
            return e.first ? function(e, t, n) {
                for (;e = e[u]; ) if (1 === e.nodeType || f) return s(e, t, n);
                return !1;
            } : function(e, t, n) {
                var r, i, o, a = [ N, d ];
                if (n) {
                    for (;e = e[u]; ) if ((1 === e.nodeType || f) && s(e, t, n)) return !0;
                } else for (;e = e[u]; ) if (1 === e.nodeType || f) if (i = (o = e[E] || (e[E] = {}))[e.uniqueID] || (o[e.uniqueID] = {}), 
                l && l === e.nodeName.toLowerCase()) e = e[u] || e; else {
                    if ((r = i[c]) && r[0] === N && r[1] === d) return a[2] = r[2];
                    if ((i[c] = a)[2] = s(e, t, n)) return !0;
                }
                return !1;
            };
        }
        function be(i) {
            return 1 < i.length ? function(e, t, n) {
                for (var r = i.length; r--; ) if (!i[r](e, t, n)) return !1;
                return !0;
            } : i[0];
        }
        function xe(e, t, n, r, i) {
            for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++) (o = e[s]) && (n && !n(o, r, i) || (a.push(o), 
            l && t.push(s)));
            return a;
        }
        function we(p, h, m, g, v, e) {
            return g && !g[E] && (g = we(g)), v && !v[E] && (v = we(v, e)), se(function(e, t, n, r) {
                var i, o, a, s = [], u = [], l = t.length, c = e || function(e, t, n) {
                    for (var r = 0, i = t.length; r < i; r++) oe(e, t[r], n);
                    return n;
                }(h || "*", n.nodeType ? [ n ] : n, []), f = !p || !e && h ? c : xe(c, s, p, n, r), d = m ? v || (e ? p : l || g) ? [] : t : f;
                if (m && m(f, d, n, r), g) for (i = xe(d, u), g(i, [], n, r), o = i.length; o--; ) (a = i[o]) && (d[u[o]] = !(f[u[o]] = a));
                if (e) {
                    if (v || p) {
                        if (v) {
                            for (i = [], o = d.length; o--; ) (a = d[o]) && i.push(f[o] = a);
                            v(null, d = [], i, r);
                        }
                        for (o = d.length; o--; ) (a = d[o]) && -1 < (i = v ? H(e, a) : s[o]) && (e[i] = !(t[i] = a));
                    }
                } else d = xe(d === t ? d.splice(l, d.length) : d), v ? v(null, t, d, r) : q.apply(t, d);
            });
        }
        function Ce(e) {
            for (var i, t, n, r = e.length, o = x.relative[e[0].type], a = o || x.relative[" "], s = o ? 1 : 0, u = ye(function(e) {
                return e === i;
            }, a, !0), l = ye(function(e) {
                return -1 < H(i, e);
            }, a, !0), c = [ function(e, t, n) {
                var r = !o && (n || t !== w) || ((i = t).nodeType ? u(e, t, n) : l(e, t, n));
                return i = null, r;
            } ]; s < r; s++) if (t = x.relative[e[s].type]) c = [ ye(be(c), t) ]; else {
                if ((t = x.filter[e[s].type].apply(null, e[s].matches))[E]) {
                    for (n = ++s; n < r && !x.relative[e[n].type]; n++) ;
                    return we(1 < s && be(c), 1 < s && ve(e.slice(0, s - 1).concat({
                        value: " " === e[s - 2].type ? "*" : ""
                    })).replace(z, "$1"), t, s < n && Ce(e.slice(s, n)), n < r && Ce(e = e.slice(n)), n < r && ve(e));
                }
                c.push(t);
            }
            return be(c);
        }
        return ge.prototype = x.filters = x.pseudos, x.setFilters = new ge(), h = oe.tokenize = function(e, t) {
            var n, r, i, o, a, s, u, l = F[e + " "];
            if (l) return t ? 0 : l.slice(0);
            for (a = e, s = [], u = x.preFilter; a; ) {
                for (o in n && !(r = _.exec(a)) || (r && (a = a.slice(r[0].length) || a), s.push(i = [])), 
                n = !1, (r = V.exec(a)) && (n = r.shift(), i.push({
                    value: n,
                    type: r[0].replace(z, " ")
                }), a = a.slice(n.length)), x.filter) !(r = J[o].exec(a)) || u[o] && !(r = u[o](r)) || (n = r.shift(), 
                i.push({
                    value: n,
                    type: o,
                    matches: r
                }), a = a.slice(n.length));
                if (!n) break;
            }
            return t ? a.length : a ? oe.error(e) : F(e, s).slice(0);
        }, d = oe.compile = function(e, t) {
            var n, r = [], i = [], o = j[e + " "];
            if (!o) {
                for (n = (t = t || h(e)).length; n--; ) (o = Ce(t[n]))[E] ? r.push(o) : i.push(o);
                (o = j(e, function(g, v) {
                    function e(e, t, n, r, i) {
                        var o, a, s, u = 0, l = "0", c = e && [], f = [], d = w, p = e || b && x.find.TAG("*", i), h = N += null == d ? 1 : Math.random() || .1, m = p.length;
                        for (i && (w = t === T || t || i); l !== m && null != (o = p[l]); l++) {
                            if (b && o) {
                                for (a = 0, t || o.ownerDocument === T || (C(o), n = !k); s = g[a++]; ) if (s(o, t || T, n)) {
                                    r.push(o);
                                    break;
                                }
                                i && (N = h);
                            }
                            y && ((o = !s && o) && u--, e && c.push(o));
                        }
                        if (u += l, y && l !== u) {
                            for (a = 0; s = v[a++]; ) s(c, f, t, n);
                            if (e) {
                                if (0 < u) for (;l--; ) c[l] || f[l] || (f[l] = $.call(r));
                                f = xe(f);
                            }
                            q.apply(r, f), i && !e && 0 < f.length && 1 < u + v.length && oe.uniqueSort(r);
                        }
                        return i && (N = h, w = d), c;
                    }
                    var y = 0 < v.length, b = 0 < g.length;
                    return y ? se(e) : e;
                }(i, r))).selector = e;
            }
            return o;
        }, m = oe.select = function(e, t, n, r) {
            var i, o, a, s, u, l = "function" == typeof e && e, c = !r && h(e = l.selector || e);
            if (n = n || [], 1 === c.length) {
                if (2 < (o = c[0] = c[0].slice(0)).length && "ID" === (a = o[0]).type && 9 === t.nodeType && k && x.relative[o[1].type]) {
                    if (!(t = (x.find.ID(a.matches[0].replace(te, f), t) || [])[0])) return n;
                    l && (t = t.parentNode), e = e.slice(o.shift().value.length);
                }
                for (i = J.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i], !x.relative[s = a.type]); ) if ((u = x.find[s]) && (r = u(a.matches[0].replace(te, f), ee.test(o[0].type) && me(t.parentNode) || t))) {
                    if (o.splice(i, 1), !(e = r.length && ve(o))) return q.apply(n, r), n;
                    break;
                }
            }
            return (l || d(e, c))(r, t, !k, n, !t || ee.test(e) && me(t.parentNode) || t), n;
        }, p.sortStable = E.split("").sort(D).join("") === E, p.detectDuplicates = !!l, 
        C(), p.sortDetached = ue(function(e) {
            return 1 & e.compareDocumentPosition(T.createElement("fieldset"));
        }), ue(function(e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href");
        }) || le("type|href|height|width", function(e, t, n) {
            if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
        }), p.attributes && ue(function(e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
        }) || le("value", function(e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue;
        }), ue(function(e) {
            return null == e.getAttribute("disabled");
        }) || le(I, function(e, t, n) {
            var r;
            if (!n) return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null;
        }), oe;
    }(T);
    E.find = x, E.expr = x.selectors, E.expr[":"] = E.expr.pseudos, E.uniqueSort = E.unique = x.uniqueSort, 
    E.text = x.getText, E.isXMLDoc = x.isXML, E.contains = x.contains, E.escapeSelector = x.escape;
    function w(e, t, n) {
        for (var r = [], i = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; ) if (1 === e.nodeType) {
            if (i && E(e).is(n)) break;
            r.push(e);
        }
        return r;
    }
    function C(e, t) {
        for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
        return n;
    }
    var N = E.expr.match.needsContext, S = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i, F = /^.[^:#\[\.,]*$/;
    function j(e, n, r) {
        return E.isFunction(n) ? E.grep(e, function(e, t) {
            return !!n.call(e, t, e) !== r;
        }) : n.nodeType ? E.grep(e, function(e) {
            return e === n !== r;
        }) : "string" != typeof n ? E.grep(e, function(e) {
            return -1 < i.call(n, e) !== r;
        }) : F.test(n) ? E.filter(n, e, r) : (n = E.filter(n, e), E.grep(e, function(e) {
            return -1 < i.call(n, e) !== r && 1 === e.nodeType;
        }));
    }
    E.filter = function(e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? E.find.matchesSelector(r, e) ? [ r ] : [] : E.find.matches(e, E.grep(t, function(e) {
            return 1 === e.nodeType;
        }));
    }, E.fn.extend({
        find: function(e) {
            var t, n, r = this.length, i = this;
            if ("string" != typeof e) return this.pushStack(E(e).filter(function() {
                for (t = 0; t < r; t++) if (E.contains(i[t], this)) return !0;
            }));
            for (n = this.pushStack([]), t = 0; t < r; t++) E.find(e, i[t], n);
            return 1 < r ? E.uniqueSort(n) : n;
        },
        filter: function(e) {
            return this.pushStack(j(this, e || [], !1));
        },
        not: function(e) {
            return this.pushStack(j(this, e || [], !0));
        },
        is: function(e) {
            return !!j(this, "string" == typeof e && N.test(e) ? E(e) : e || [], !1).length;
        }
    });
    var D, A = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (E.fn.init = function(e, t, n) {
        var r, i;
        if (!e) return this;
        if (n = n || D, "string" != typeof e) return e.nodeType ? (this[0] = e, this.length = 1, 
        this) : E.isFunction(e) ? void 0 !== n.ready ? n.ready(e) : e(E) : E.makeArray(e, this);
        if (!(r = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [ null, e, null ] : A.exec(e)) || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
        if (r[1]) {
            if (t = t instanceof E ? t[0] : t, E.merge(this, E.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : k, !0)), 
            S.test(r[1]) && E.isPlainObject(t)) for (r in t) E.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
            return this;
        }
        return (i = k.getElementById(r[2])) && (this[0] = i, this.length = 1), this;
    }).prototype = E.fn, D = E(k);
    var $ = /^(?:parents|prev(?:Until|All))/, L = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    function q(e, t) {
        for (;(e = e[t]) && 1 !== e.nodeType; ) ;
        return e;
    }
    E.fn.extend({
        has: function(e) {
            var t = E(e, this), n = t.length;
            return this.filter(function() {
                for (var e = 0; e < n; e++) if (E.contains(this, t[e])) return !0;
            });
        },
        closest: function(e, t) {
            var n, r = 0, i = this.length, o = [], a = "string" != typeof e && E(e);
            if (!N.test(e)) for (;r < i; r++) for (n = this[r]; n && n !== t; n = n.parentNode) if (n.nodeType < 11 && (a ? -1 < a.index(n) : 1 === n.nodeType && E.find.matchesSelector(n, e))) {
                o.push(n);
                break;
            }
            return this.pushStack(1 < o.length ? E.uniqueSort(o) : o);
        },
        index: function(e) {
            return e ? "string" == typeof e ? i.call(E(e), this[0]) : i.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function(e, t) {
            return this.pushStack(E.uniqueSort(E.merge(this.get(), E(e, t))));
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
        }
    }), E.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null;
        },
        parents: function(e) {
            return w(e, "parentNode");
        },
        parentsUntil: function(e, t, n) {
            return w(e, "parentNode", n);
        },
        next: function(e) {
            return q(e, "nextSibling");
        },
        prev: function(e) {
            return q(e, "previousSibling");
        },
        nextAll: function(e) {
            return w(e, "nextSibling");
        },
        prevAll: function(e) {
            return w(e, "previousSibling");
        },
        nextUntil: function(e, t, n) {
            return w(e, "nextSibling", n);
        },
        prevUntil: function(e, t, n) {
            return w(e, "previousSibling", n);
        },
        siblings: function(e) {
            return C((e.parentNode || {}).firstChild, e);
        },
        children: function(e) {
            return C(e.firstChild);
        },
        contents: function(e) {
            return e.contentDocument || E.merge([], e.childNodes);
        }
    }, function(r, i) {
        E.fn[r] = function(e, t) {
            var n = E.map(this, i, e);
            return "Until" !== r.slice(-5) && (t = e), t && "string" == typeof t && (n = E.filter(t, n)), 
            1 < this.length && (L[r] || E.uniqueSort(n), $.test(r) && n.reverse()), this.pushStack(n);
        };
    });
    var O = /[^\x20\t\r\n\f]+/g;
    function H(e) {
        return e;
    }
    function I(e) {
        throw e;
    }
    function R(e, t, n) {
        var r;
        try {
            e && E.isFunction(r = e.promise) ? r.call(e).done(t).fail(n) : e && E.isFunction(r = e.then) ? r.call(e, t, n) : t.call(void 0, e);
        } catch (e) {
            n.call(void 0, e);
        }
    }
    E.Callbacks = function(r) {
        r = "string" == typeof r ? function(e) {
            var n = {};
            return E.each(e.match(O) || [], function(e, t) {
                n[t] = !0;
            }), n;
        }(r) : E.extend({}, r);
        function n() {
            for (o = r.once, t = i = !0; s.length; u = -1) for (e = s.shift(); ++u < a.length; ) !1 === a[u].apply(e[0], e[1]) && r.stopOnFalse && (u = a.length, 
            e = !1);
            r.memory || (e = !1), i = !1, o && (a = e ? [] : "");
        }
        var i, e, t, o, a = [], s = [], u = -1, l = {
            add: function() {
                return a && (e && !i && (u = a.length - 1, s.push(e)), function n(e) {
                    E.each(e, function(e, t) {
                        E.isFunction(t) ? r.unique && l.has(t) || a.push(t) : t && t.length && "string" !== E.type(t) && n(t);
                    });
                }(arguments), e && !i && n()), this;
            },
            remove: function() {
                return E.each(arguments, function(e, t) {
                    for (var n; -1 < (n = E.inArray(t, a, n)); ) a.splice(n, 1), n <= u && u--;
                }), this;
            },
            has: function(e) {
                return e ? -1 < E.inArray(e, a) : 0 < a.length;
            },
            empty: function() {
                return a = a && [], this;
            },
            disable: function() {
                return o = s = [], a = e = "", this;
            },
            disabled: function() {
                return !a;
            },
            lock: function() {
                return o = s = [], e || i || (a = e = ""), this;
            },
            locked: function() {
                return !!o;
            },
            fireWith: function(e, t) {
                return o || (t = [ e, (t = t || []).slice ? t.slice() : t ], s.push(t), i || n()), 
                this;
            },
            fire: function() {
                return l.fireWith(this, arguments), this;
            },
            fired: function() {
                return !!t;
            }
        };
        return l;
    }, E.extend({
        Deferred: function(e) {
            var o = [ [ "notify", "progress", E.Callbacks("memory"), E.Callbacks("memory"), 2 ], [ "resolve", "done", E.Callbacks("once memory"), E.Callbacks("once memory"), 0, "resolved" ], [ "reject", "fail", E.Callbacks("once memory"), E.Callbacks("once memory"), 1, "rejected" ] ], i = "pending", a = {
                state: function() {
                    return i;
                },
                always: function() {
                    return s.done(arguments).fail(arguments), this;
                },
                catch: function(e) {
                    return a.then(null, e);
                },
                pipe: function() {
                    var i = arguments;
                    return E.Deferred(function(r) {
                        E.each(o, function(e, t) {
                            var n = E.isFunction(i[t[4]]) && i[t[4]];
                            s[t[1]](function() {
                                var e = n && n.apply(this, arguments);
                                e && E.isFunction(e.promise) ? e.promise().progress(r.notify).done(r.resolve).fail(r.reject) : r[t[0] + "With"](this, n ? [ e ] : arguments);
                            });
                        }), i = null;
                    }).promise();
                },
                then: function(t, n, r) {
                    var u = 0;
                    function l(i, o, a, s) {
                        return function() {
                            function e() {
                                var e, t;
                                if (!(i < u)) {
                                    if ((e = a.apply(n, r)) === o.promise()) throw new TypeError("Thenable self-resolution");
                                    t = e && ("object" == typeof e || "function" == typeof e) && e.then, E.isFunction(t) ? s ? t.call(e, l(u, o, H, s), l(u, o, I, s)) : (u++, 
                                    t.call(e, l(u, o, H, s), l(u, o, I, s), l(u, o, H, o.notifyWith))) : (a !== H && (n = void 0, 
                                    r = [ e ]), (s || o.resolveWith)(n, r));
                                }
                            }
                            var n = this, r = arguments, t = s ? e : function() {
                                try {
                                    e();
                                } catch (e) {
                                    E.Deferred.exceptionHook && E.Deferred.exceptionHook(e, t.stackTrace), u <= i + 1 && (a !== I && (n = void 0, 
                                    r = [ e ]), o.rejectWith(n, r));
                                }
                            };
                            i ? t() : (E.Deferred.getStackHook && (t.stackTrace = E.Deferred.getStackHook()), 
                            T.setTimeout(t));
                        };
                    }
                    return E.Deferred(function(e) {
                        o[0][3].add(l(0, e, E.isFunction(r) ? r : H, e.notifyWith)), o[1][3].add(l(0, e, E.isFunction(t) ? t : H)), 
                        o[2][3].add(l(0, e, E.isFunction(n) ? n : I));
                    }).promise();
                },
                promise: function(e) {
                    return null != e ? E.extend(e, a) : a;
                }
            }, s = {};
            return E.each(o, function(e, t) {
                var n = t[2], r = t[5];
                a[t[1]] = n.add, r && n.add(function() {
                    i = r;
                }, o[3 - e][2].disable, o[0][2].lock), n.add(t[3].fire), s[t[0]] = function() {
                    return s[t[0] + "With"](this === s ? void 0 : this, arguments), this;
                }, s[t[0] + "With"] = n.fireWith;
            }), a.promise(s), e && e.call(s, s), s;
        },
        when: function(e) {
            function t(t) {
                return function(e) {
                    i[t] = this, o[t] = 1 < arguments.length ? s.call(arguments) : e, --n || a.resolveWith(i, o);
                };
            }
            var n = arguments.length, r = n, i = Array(r), o = s.call(arguments), a = E.Deferred();
            if (n <= 1 && (R(e, a.done(t(r)).resolve, a.reject), "pending" === a.state() || E.isFunction(o[r] && o[r].then))) return a.then();
            for (;r--; ) R(o[r], t(r), a.reject);
            return a.promise();
        }
    });
    var P = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    E.Deferred.exceptionHook = function(e, t) {
        T.console && T.console.warn && e && P.test(e.name) && T.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t);
    }, E.readyException = function(e) {
        T.setTimeout(function() {
            throw e;
        });
    };
    var M = E.Deferred();
    function W() {
        k.removeEventListener("DOMContentLoaded", W), T.removeEventListener("load", W), 
        E.ready();
    }
    E.fn.ready = function(e) {
        return M.then(e).catch(function(e) {
            E.readyException(e);
        }), this;
    }, E.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? E.readyWait++ : E.ready(!0);
        },
        ready: function(e) {
            (!0 === e ? --E.readyWait : E.isReady) || (E.isReady = !0) !== e && 0 < --E.readyWait || M.resolveWith(k, [ E ]);
        }
    }), E.ready.then = M.then, "complete" === k.readyState || "loading" !== k.readyState && !k.documentElement.doScroll ? T.setTimeout(E.ready) : (k.addEventListener("DOMContentLoaded", W), 
    T.addEventListener("load", W));
    function B(e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
    }
    var z = function(e, t, n, r, i, o, a) {
        var s = 0, u = e.length, l = null == n;
        if ("object" === E.type(n)) for (s in i = !0, n) z(e, t, s, n[s], !0, o, a); else if (void 0 !== r && (i = !0, 
        E.isFunction(r) || (a = !0), l && (t = a ? (t.call(e, r), null) : (l = t, function(e, t, n) {
            return l.call(E(e), n);
        })), t)) for (;s < u; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
        return i ? e : l ? t.call(e) : u ? t(e[0], n) : o;
    };
    function _() {
        this.expando = E.expando + _.uid++;
    }
    _.uid = 1, _.prototype = {
        cache: function(e) {
            var t = e[this.expando];
            return t || (t = {}, B(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))), t;
        },
        set: function(e, t, n) {
            var r, i = this.cache(e);
            if ("string" == typeof t) i[E.camelCase(t)] = n; else for (r in t) i[E.camelCase(r)] = t[r];
            return i;
        },
        get: function(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][E.camelCase(t)];
        },
        access: function(e, t, n) {
            return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), 
            void 0 !== n ? n : t);
        },
        remove: function(e, t) {
            var n, r = e[this.expando];
            if (void 0 !== r) {
                if (void 0 !== t) {
                    n = (t = E.isArray(t) ? t.map(E.camelCase) : (t = E.camelCase(t)) in r ? [ t ] : t.match(O) || []).length;
                    for (;n--; ) delete r[t[n]];
                }
                void 0 !== t && !E.isEmptyObject(r) || (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando]);
            }
        },
        hasData: function(e) {
            var t = e[this.expando];
            return void 0 !== t && !E.isEmptyObject(t);
        }
    };
    var V = new _(), U = new _(), X = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, G = /[A-Z]/g;
    function J(e, t, n) {
        var r;
        if (void 0 === n && 1 === e.nodeType) if (r = "data-" + t.replace(G, "-$&").toLowerCase(), 
        "string" == typeof (n = e.getAttribute(r))) {
            try {
                n = function(e) {
                    return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : X.test(e) ? JSON.parse(e) : e);
                }(n);
            } catch (e) {}
            U.set(e, t, n);
        } else n = void 0;
        return n;
    }
    E.extend({
        hasData: function(e) {
            return U.hasData(e) || V.hasData(e);
        },
        data: function(e, t, n) {
            return U.access(e, t, n);
        },
        removeData: function(e, t) {
            U.remove(e, t);
        },
        _data: function(e, t, n) {
            return V.access(e, t, n);
        },
        _removeData: function(e, t) {
            V.remove(e, t);
        }
    }), E.fn.extend({
        data: function(n, e) {
            var t, r, i, o = this[0], a = o && o.attributes;
            if (void 0 !== n) return "object" == typeof n ? this.each(function() {
                U.set(this, n);
            }) : z(this, function(e) {
                var t;
                if (o && void 0 === e) return void 0 !== (t = U.get(o, n)) ? t : void 0 !== (t = J(o, n)) ? t : void 0;
                this.each(function() {
                    U.set(this, n, e);
                });
            }, null, e, 1 < arguments.length, null, !0);
            if (this.length && (i = U.get(o), 1 === o.nodeType && !V.get(o, "hasDataAttrs"))) {
                for (t = a.length; t--; ) a[t] && 0 === (r = a[t].name).indexOf("data-") && (r = E.camelCase(r.slice(5)), 
                J(o, r, i[r]));
                V.set(o, "hasDataAttrs", !0);
            }
            return i;
        },
        removeData: function(e) {
            return this.each(function() {
                U.remove(this, e);
            });
        }
    }), E.extend({
        queue: function(e, t, n) {
            var r;
            if (e) return t = (t || "fx") + "queue", r = V.get(e, t), n && (!r || E.isArray(n) ? r = V.access(e, t, E.makeArray(n)) : r.push(n)), 
            r || [];
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = E.queue(e, t), r = n.length, i = n.shift(), o = E._queueHooks(e, t);
            "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), 
            delete o.stop, i.call(e, function() {
                E.dequeue(e, t);
            }, o)), !r && o && o.empty.fire();
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return V.get(e, n) || V.access(e, n, {
                empty: E.Callbacks("once memory").add(function() {
                    V.remove(e, [ t + "queue", n ]);
                })
            });
        }
    }), E.fn.extend({
        queue: function(t, n) {
            var e = 2;
            return "string" != typeof t && (n = t, t = "fx", e--), arguments.length < e ? E.queue(this[0], t) : void 0 === n ? this : this.each(function() {
                var e = E.queue(this, t, n);
                E._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && E.dequeue(this, t);
            });
        },
        dequeue: function(e) {
            return this.each(function() {
                E.dequeue(this, e);
            });
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", []);
        },
        promise: function(e, t) {
            function n() {
                --i || o.resolveWith(a, [ a ]);
            }
            var r, i = 1, o = E.Deferred(), a = this, s = this.length;
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; s--; ) (r = V.get(a[s], e + "queueHooks")) && r.empty && (i++, 
            r.empty.add(n));
            return n(), o.promise(t);
        }
    });
    function Y(e, t, n, r) {
        var i, o, a = {};
        for (o in t) a[o] = e.style[o], e.style[o] = t[o];
        for (o in i = n.apply(e, r || []), t) e.style[o] = a[o];
        return i;
    }
    var Q = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, K = new RegExp("^(?:([+-])=|)(" + Q + ")([a-z%]*)$", "i"), Z = [ "Top", "Right", "Bottom", "Left" ], ee = function(e, t) {
        return "none" === (e = t || e).style.display || "" === e.style.display && E.contains(e.ownerDocument, e) && "none" === E.css(e, "display");
    };
    function te(e, t, n, r) {
        var i, o = 1, a = 20, s = r ? function() {
            return r.cur();
        } : function() {
            return E.css(e, t, "");
        }, u = s(), l = n && n[3] || (E.cssNumber[t] ? "" : "px"), c = (E.cssNumber[t] || "px" !== l && +u) && K.exec(E.css(e, t));
        if (c && c[3] !== l) for (l = l || c[3], n = n || [], c = +u || 1; c /= o = o || ".5", 
        E.style(e, t, c + l), o !== (o = s() / u) && 1 !== o && --a; ) ;
        return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, 
        r.start = c, r.end = i)), i;
    }
    var ne = {};
    function re(e, t) {
        for (var n, r, i, o, a, s, u, l = [], c = 0, f = e.length; c < f; c++) (r = e[c]).style && (n = r.style.display, 
        t ? ("none" === n && (l[c] = V.get(r, "display") || null, l[c] || (r.style.display = "")), 
        "" === r.style.display && ee(r) && (l[c] = (u = a = o = void 0, a = (i = r).ownerDocument, 
        s = i.nodeName, (u = ne[s]) || (o = a.body.appendChild(a.createElement(s)), u = E.css(o, "display"), 
        o.parentNode.removeChild(o), "none" === u && (u = "block"), ne[s] = u)))) : "none" !== n && (l[c] = "none", 
        V.set(r, "display", n)));
        for (c = 0; c < f; c++) null != l[c] && (e[c].style.display = l[c]);
        return e;
    }
    E.fn.extend({
        show: function() {
            return re(this, !0);
        },
        hide: function() {
            return re(this);
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                ee(this) ? E(this).show() : E(this).hide();
            });
        }
    });
    var ie = /^(?:checkbox|radio)$/i, oe = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i, ae = /^$|\/(?:java|ecma)script/i, se = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        thead: [ 1, "<table>", "</table>" ],
        col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: [ 0, "", "" ]
    };
    function ue(e, t) {
        var n;
        return n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [], 
        void 0 === t || t && E.nodeName(e, t) ? E.merge([ e ], n) : n;
    }
    function le(e, t) {
        for (var n = 0, r = e.length; n < r; n++) V.set(e[n], "globalEval", !t || V.get(t[n], "globalEval"));
    }
    se.optgroup = se.option, se.tbody = se.tfoot = se.colgroup = se.caption = se.thead, 
    se.th = se.td;
    var ce, fe, de = /<|&#?\w+;/;
    function pe(e, t, n, r, i) {
        for (var o, a, s, u, l, c, f = t.createDocumentFragment(), d = [], p = 0, h = e.length; p < h; p++) if ((o = e[p]) || 0 === o) if ("object" === E.type(o)) E.merge(d, o.nodeType ? [ o ] : o); else if (de.test(o)) {
            for (a = a || f.appendChild(t.createElement("div")), s = (oe.exec(o) || [ "", "" ])[1].toLowerCase(), 
            u = se[s] || se._default, a.innerHTML = u[1] + E.htmlPrefilter(o) + u[2], c = u[0]; c--; ) a = a.lastChild;
            E.merge(d, a.childNodes), (a = f.firstChild).textContent = "";
        } else d.push(t.createTextNode(o));
        for (f.textContent = "", p = 0; o = d[p++]; ) if (r && -1 < E.inArray(o, r)) i && i.push(o); else if (l = E.contains(o.ownerDocument, o), 
        a = ue(f.appendChild(o), "script"), l && le(a), n) for (c = 0; o = a[c++]; ) ae.test(o.type || "") && n.push(o);
        return f;
    }
    ce = k.createDocumentFragment().appendChild(k.createElement("div")), (fe = k.createElement("input")).setAttribute("type", "radio"), 
    fe.setAttribute("checked", "checked"), fe.setAttribute("name", "t"), ce.appendChild(fe), 
    g.checkClone = ce.cloneNode(!0).cloneNode(!0).lastChild.checked, ce.innerHTML = "<textarea>x</textarea>", 
    g.noCloneChecked = !!ce.cloneNode(!0).lastChild.defaultValue;
    var he = k.documentElement, me = /^key/, ge = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, ve = /^([^.]*)(?:\.(.+)|)/;
    function ye() {
        return !0;
    }
    function be() {
        return !1;
    }
    function xe() {
        try {
            return k.activeElement;
        } catch (e) {}
    }
    function we(e, t, n, r, i, o) {
        var a, s;
        if ("object" == typeof t) {
            for (s in "string" != typeof n && (r = r || n, n = void 0), t) we(e, s, n, r, t[s], o);
            return e;
        }
        if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, 
        r = void 0) : (i = r, r = n, n = void 0)), !1 === i) i = be; else if (!i) return e;
        return 1 === o && (a = i, (i = function(e) {
            return E().off(e), a.apply(this, arguments);
        }).guid = a.guid || (a.guid = E.guid++)), e.each(function() {
            E.event.add(this, t, i, r, n);
        });
    }
    E.event = {
        global: {},
        add: function(t, e, n, r, i) {
            var o, a, s, u, l, c, f, d, p, h, m, g = V.get(t);
            if (g) for (n.handler && (n = (o = n).handler, i = o.selector), i && E.find.matchesSelector(he, i), 
            n.guid || (n.guid = E.guid++), (u = g.events) || (u = g.events = {}), (a = g.handle) || (a = g.handle = function(e) {
                return void 0 !== E && E.event.triggered !== e.type ? E.event.dispatch.apply(t, arguments) : void 0;
            }), l = (e = (e || "").match(O) || [ "" ]).length; l--; ) p = m = (s = ve.exec(e[l]) || [])[1], 
            h = (s[2] || "").split(".").sort(), p && (f = E.event.special[p] || {}, p = (i ? f.delegateType : f.bindType) || p, 
            f = E.event.special[p] || {}, c = E.extend({
                type: p,
                origType: m,
                data: r,
                handler: n,
                guid: n.guid,
                selector: i,
                needsContext: i && E.expr.match.needsContext.test(i),
                namespace: h.join(".")
            }, o), (d = u[p]) || ((d = u[p] = []).delegateCount = 0, f.setup && !1 !== f.setup.call(t, r, h, a) || t.addEventListener && t.addEventListener(p, a)), 
            f.add && (f.add.call(t, c), c.handler.guid || (c.handler.guid = n.guid)), i ? d.splice(d.delegateCount++, 0, c) : d.push(c), 
            E.event.global[p] = !0);
        },
        remove: function(e, t, n, r, i) {
            var o, a, s, u, l, c, f, d, p, h, m, g = V.hasData(e) && V.get(e);
            if (g && (u = g.events)) {
                for (l = (t = (t || "").match(O) || [ "" ]).length; l--; ) if (p = m = (s = ve.exec(t[l]) || [])[1], 
                h = (s[2] || "").split(".").sort(), p) {
                    for (f = E.event.special[p] || {}, d = u[p = (r ? f.delegateType : f.bindType) || p] || [], 
                    s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = d.length; o--; ) c = d[o], 
                    !i && m !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (d.splice(o, 1), 
                    c.selector && d.delegateCount--, f.remove && f.remove.call(e, c));
                    a && !d.length && (f.teardown && !1 !== f.teardown.call(e, h, g.handle) || E.removeEvent(e, p, g.handle), 
                    delete u[p]);
                } else for (p in u) E.event.remove(e, p + t[l], n, r, !0);
                E.isEmptyObject(u) && V.remove(e, "handle events");
            }
        },
        dispatch: function(e) {
            var t, n, r, i, o, a, s = E.event.fix(e), u = new Array(arguments.length), l = (V.get(this, "events") || {})[s.type] || [], c = E.event.special[s.type] || {};
            for (u[0] = s, t = 1; t < arguments.length; t++) u[t] = arguments[t];
            if (s.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, s)) {
                for (a = E.event.handlers.call(this, s, l), t = 0; (i = a[t++]) && !s.isPropagationStopped(); ) for (s.currentTarget = i.elem, 
                n = 0; (o = i.handlers[n++]) && !s.isImmediatePropagationStopped(); ) s.rnamespace && !s.rnamespace.test(o.namespace) || (s.handleObj = o, 
                s.data = o.data, void 0 !== (r = ((E.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, u)) && !1 === (s.result = r) && (s.preventDefault(), 
                s.stopPropagation()));
                return c.postDispatch && c.postDispatch.call(this, s), s.result;
            }
        },
        handlers: function(e, t) {
            var n, r, i, o, a, s = [], u = t.delegateCount, l = e.target;
            if (u && l.nodeType && !("click" === e.type && 1 <= e.button)) for (;l !== this; l = l.parentNode || this) if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
                for (o = [], a = {}, n = 0; n < u; n++) void 0 === a[i = (r = t[n]).selector + " "] && (a[i] = r.needsContext ? -1 < E(i, this).index(l) : E.find(i, this, null, [ l ]).length), 
                a[i] && o.push(r);
                o.length && s.push({
                    elem: l,
                    handlers: o
                });
            }
            return l = this, u < t.length && s.push({
                elem: l,
                handlers: t.slice(u)
            }), s;
        },
        addProp: function(t, e) {
            Object.defineProperty(E.Event.prototype, t, {
                enumerable: !0,
                configurable: !0,
                get: E.isFunction(e) ? function() {
                    if (this.originalEvent) return e(this.originalEvent);
                } : function() {
                    if (this.originalEvent) return this.originalEvent[t];
                },
                set: function(e) {
                    Object.defineProperty(this, t, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: e
                    });
                }
            });
        },
        fix: function(e) {
            return e[E.expando] ? e : new E.Event(e);
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== xe() && this.focus) return this.focus(), !1;
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === xe() && this.blur) return this.blur(), !1;
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if ("checkbox" === this.type && this.click && E.nodeName(this, "input")) return this.click(), 
                    !1;
                },
                _default: function(e) {
                    return E.nodeName(e.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result);
                }
            }
        }
    }, E.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n);
    }, E.Event = function(e, t) {
        if (!(this instanceof E.Event)) return new E.Event(e, t);
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? ye : be, 
        this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, 
        this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, 
        t && E.extend(this, t), this.timeStamp = e && e.timeStamp || E.now(), this[E.expando] = !0;
    }, E.Event.prototype = {
        constructor: E.Event,
        isDefaultPrevented: be,
        isPropagationStopped: be,
        isImmediatePropagationStopped: be,
        isSimulated: !1,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = ye, e && !this.isSimulated && e.preventDefault();
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = ye, e && !this.isSimulated && e.stopPropagation();
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = ye, e && !this.isSimulated && e.stopImmediatePropagation(), 
            this.stopPropagation();
        }
    }, E.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function(e) {
            var t = e.button;
            return null == e.which && me.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && ge.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which;
        }
    }, E.event.addProp), E.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, i) {
        E.event.special[e] = {
            delegateType: i,
            bindType: i,
            handle: function(e) {
                var t, n = e.relatedTarget, r = e.handleObj;
                return n && (n === this || E.contains(this, n)) || (e.type = r.origType, t = r.handler.apply(this, arguments), 
                e.type = i), t;
            }
        };
    }), E.fn.extend({
        on: function(e, t, n, r) {
            return we(this, e, t, n, r);
        },
        one: function(e, t, n, r) {
            return we(this, e, t, n, r, 1);
        },
        off: function(e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj) return r = e.handleObj, E(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), 
            this;
            if ("object" != typeof e) return !1 !== t && "function" != typeof t || (n = t, t = void 0), 
            !1 === n && (n = be), this.each(function() {
                E.event.remove(this, e, n, t);
            });
            for (i in e) this.off(i, t, e[i]);
            return this;
        }
    });
    var Ce = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi, Te = /<script|<style|<link/i, ke = /checked\s*(?:[^=]|=\s*.checked.)/i, Ee = /^true\/(.*)/, Ne = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    function Se(e, t) {
        return E.nodeName(e, "table") && E.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") && e.getElementsByTagName("tbody")[0] || e;
    }
    function Fe(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e;
    }
    function je(e) {
        var t = Ee.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e;
    }
    function De(e, t) {
        var n, r, i, o, a, s, u, l;
        if (1 === t.nodeType) {
            if (V.hasData(e) && (o = V.access(e), a = V.set(t, o), l = o.events)) for (i in delete a.handle, 
            a.events = {}, l) for (n = 0, r = l[i].length; n < r; n++) E.event.add(t, i, l[i][n]);
            U.hasData(e) && (s = U.access(e), u = E.extend({}, s), U.set(t, u));
        }
    }
    function Ae(n, r, i, o) {
        r = m.apply([], r);
        var e, t, a, s, u, l, c = 0, f = n.length, d = f - 1, p = r[0], h = E.isFunction(p);
        if (h || 1 < f && "string" == typeof p && !g.checkClone && ke.test(p)) return n.each(function(e) {
            var t = n.eq(e);
            h && (r[0] = p.call(this, e, t.html())), Ae(t, r, i, o);
        });
        if (f && (t = (e = pe(r, n[0].ownerDocument, !1, n, o)).firstChild, 1 === e.childNodes.length && (e = t), 
        t || o)) {
            for (s = (a = E.map(ue(e, "script"), Fe)).length; c < f; c++) u = e, c !== d && (u = E.clone(u, !0, !0), 
            s && E.merge(a, ue(u, "script"))), i.call(n[c], u, c);
            if (s) for (l = a[a.length - 1].ownerDocument, E.map(a, je), c = 0; c < s; c++) u = a[c], 
            ae.test(u.type || "") && !V.access(u, "globalEval") && E.contains(l, u) && (u.src ? E._evalUrl && E._evalUrl(u.src) : v(u.textContent.replace(Ne, ""), l));
        }
        return n;
    }
    function $e(e, t, n) {
        for (var r, i = t ? E.filter(t, e) : e, o = 0; null != (r = i[o]); o++) n || 1 !== r.nodeType || E.cleanData(ue(r)), 
        r.parentNode && (n && E.contains(r.ownerDocument, r) && le(ue(r, "script")), r.parentNode.removeChild(r));
        return e;
    }
    E.extend({
        htmlPrefilter: function(e) {
            return e.replace(Ce, "<$1></$2>");
        },
        clone: function(e, t, n) {
            var r, i, o, a, s, u, l, c = e.cloneNode(!0), f = E.contains(e.ownerDocument, e);
            if (!(g.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || E.isXMLDoc(e))) for (a = ue(c), 
            r = 0, i = (o = ue(e)).length; r < i; r++) s = o[r], u = a[r], void 0, "input" === (l = u.nodeName.toLowerCase()) && ie.test(s.type) ? u.checked = s.checked : "input" !== l && "textarea" !== l || (u.defaultValue = s.defaultValue);
            if (t) if (n) for (o = o || ue(e), a = a || ue(c), r = 0, i = o.length; r < i; r++) De(o[r], a[r]); else De(e, c);
            return 0 < (a = ue(c, "script")).length && le(a, !f && ue(e, "script")), c;
        },
        cleanData: function(e) {
            for (var t, n, r, i = E.event.special, o = 0; void 0 !== (n = e[o]); o++) if (B(n)) {
                if (t = n[V.expando]) {
                    if (t.events) for (r in t.events) i[r] ? E.event.remove(n, r) : E.removeEvent(n, r, t.handle);
                    n[V.expando] = void 0;
                }
                n[U.expando] && (n[U.expando] = void 0);
            }
        }
    }), E.fn.extend({
        detach: function(e) {
            return $e(this, e, !0);
        },
        remove: function(e) {
            return $e(this, e);
        },
        text: function(e) {
            return z(this, function(e) {
                return void 0 === e ? E.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e);
                });
            }, null, e, arguments.length);
        },
        append: function() {
            return Ae(this, arguments, function(e) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Se(this, e).appendChild(e);
            });
        },
        prepend: function() {
            return Ae(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = Se(this, e);
                    t.insertBefore(e, t.firstChild);
                }
            });
        },
        before: function() {
            return Ae(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this);
            });
        },
        after: function() {
            return Ae(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
            });
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (E.cleanData(ue(e, !1)), 
            e.textContent = "");
            return this;
        },
        clone: function(e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function() {
                return E.clone(this, e, t);
            });
        },
        html: function(e) {
            return z(this, function(e) {
                var t = this[0] || {}, n = 0, r = this.length;
                if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof e && !Te.test(e) && !se[(oe.exec(e) || [ "", "" ])[1].toLowerCase()]) {
                    e = E.htmlPrefilter(e);
                    try {
                        for (;n < r; n++) 1 === (t = this[n] || {}).nodeType && (E.cleanData(ue(t, !1)), 
                        t.innerHTML = e);
                        t = 0;
                    } catch (e) {}
                }
                t && this.empty().append(e);
            }, null, e, arguments.length);
        },
        replaceWith: function() {
            var n = [];
            return Ae(this, arguments, function(e) {
                var t = this.parentNode;
                E.inArray(this, n) < 0 && (E.cleanData(ue(this)), t && t.replaceChild(e, this));
            }, n);
        }
    }), E.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, a) {
        E.fn[e] = function(e) {
            for (var t, n = [], r = E(e), i = r.length - 1, o = 0; o <= i; o++) t = o === i ? this : this.clone(!0), 
            E(r[o])[a](t), u.apply(n, t.get());
            return this.pushStack(n);
        };
    });
    var Le, qe, Oe, He, Ie, Re, Pe = /^margin/, Me = new RegExp("^(" + Q + ")(?!px)[a-z%]+$", "i"), We = function(e) {
        var t = e.ownerDocument.defaultView;
        return t && t.opener || (t = T), t.getComputedStyle(e);
    };
    function Be() {
        if (Re) {
            Re.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", 
            Re.innerHTML = "", he.appendChild(Ie);
            var e = T.getComputedStyle(Re);
            Le = "1%" !== e.top, He = "2px" === e.marginLeft, qe = "4px" === e.width, Re.style.marginRight = "50%", 
            Oe = "4px" === e.marginRight, he.removeChild(Ie), Re = null;
        }
    }
    function ze(e, t, n) {
        var r, i, o, a, s = e.style;
        return (n = n || We(e)) && ("" !== (a = n.getPropertyValue(t) || n[t]) || E.contains(e.ownerDocument, e) || (a = E.style(e, t)), 
        !g.pixelMarginRight() && Me.test(a) && Pe.test(t) && (r = s.width, i = s.minWidth, 
        o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, 
        s.minWidth = i, s.maxWidth = o)), void 0 !== a ? a + "" : a;
    }
    function _e(e, t) {
        return {
            get: function() {
                if (!e()) return (this.get = t).apply(this, arguments);
                delete this.get;
            }
        };
    }
    Ie = k.createElement("div"), (Re = k.createElement("div")).style && (Re.style.backgroundClip = "content-box", 
    Re.cloneNode(!0).style.backgroundClip = "", g.clearCloneStyle = "content-box" === Re.style.backgroundClip, 
    Ie.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", 
    Ie.appendChild(Re), E.extend(g, {
        pixelPosition: function() {
            return Be(), Le;
        },
        boxSizingReliable: function() {
            return Be(), qe;
        },
        pixelMarginRight: function() {
            return Be(), Oe;
        },
        reliableMarginLeft: function() {
            return Be(), He;
        }
    }));
    var Ve = /^(none|table(?!-c[ea]).+)/, Ue = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, Xe = {
        letterSpacing: "0",
        fontWeight: "400"
    }, Ge = [ "Webkit", "Moz", "ms" ], Je = k.createElement("div").style;
    function Ye(e) {
        if (e in Je) return e;
        for (var t = e[0].toUpperCase() + e.slice(1), n = Ge.length; n--; ) if ((e = Ge[n] + t) in Je) return e;
    }
    function Qe(e, t, n) {
        var r = K.exec(t);
        return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t;
    }
    function Ke(e, t, n, r, i) {
        var o, a = 0;
        for (o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0; o < 4; o += 2) "margin" === n && (a += E.css(e, n + Z[o], !0, i)), 
        r ? ("content" === n && (a -= E.css(e, "padding" + Z[o], !0, i)), "margin" !== n && (a -= E.css(e, "border" + Z[o] + "Width", !0, i))) : (a += E.css(e, "padding" + Z[o], !0, i), 
        "padding" !== n && (a += E.css(e, "border" + Z[o] + "Width", !0, i)));
        return a;
    }
    function Ze(e, t, n) {
        var r, i = !0, o = We(e), a = "border-box" === E.css(e, "boxSizing", !1, o);
        if (e.getClientRects().length && (r = e.getBoundingClientRect()[t]), r <= 0 || null == r) {
            if (((r = ze(e, t, o)) < 0 || null == r) && (r = e.style[t]), Me.test(r)) return r;
            i = a && (g.boxSizingReliable() || r === e.style[t]), r = parseFloat(r) || 0;
        }
        return r + Ke(e, t, n || (a ? "border" : "content"), i, o) + "px";
    }
    function et(e, t, n, r, i) {
        return new et.prototype.init(e, t, n, r, i);
    }
    E.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = ze(e, "opacity");
                        return "" === n ? "1" : n;
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            float: "cssFloat"
        },
        style: function(e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, o, a, s = E.camelCase(t), u = e.style;
                if (t = E.cssProps[s] || (E.cssProps[s] = Ye(s) || s), a = E.cssHooks[t] || E.cssHooks[s], 
                void 0 === n) return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : u[t];
                "string" === (o = typeof n) && (i = K.exec(n)) && i[1] && (n = te(e, t, i), o = "number"), 
                null != n && n == n && ("number" === o && (n += i && i[3] || (E.cssNumber[s] ? "" : "px")), 
                g.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"), 
                a && "set" in a && void 0 === (n = a.set(e, n, r)) || (u[t] = n));
            }
        },
        css: function(e, t, n, r) {
            var i, o, a, s = E.camelCase(t);
            return t = E.cssProps[s] || (E.cssProps[s] = Ye(s) || s), (a = E.cssHooks[t] || E.cssHooks[s]) && "get" in a && (i = a.get(e, !0, n)), 
            void 0 === i && (i = ze(e, t, r)), "normal" === i && t in Xe && (i = Xe[t]), "" === n || n ? (o = parseFloat(i), 
            !0 === n || isFinite(o) ? o || 0 : i) : i;
        }
    }), E.each([ "height", "width" ], function(e, a) {
        E.cssHooks[a] = {
            get: function(e, t, n) {
                if (t) return !Ve.test(E.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? Ze(e, a, n) : Y(e, Ue, function() {
                    return Ze(e, a, n);
                });
            },
            set: function(e, t, n) {
                var r, i = n && We(e), o = n && Ke(e, a, n, "border-box" === E.css(e, "boxSizing", !1, i), i);
                return o && (r = K.exec(t)) && "px" !== (r[3] || "px") && (e.style[a] = t, t = E.css(e, a)), 
                Qe(0, t, o);
            }
        };
    }), E.cssHooks.marginLeft = _e(g.reliableMarginLeft, function(e, t) {
        if (t) return (parseFloat(ze(e, "marginLeft")) || e.getBoundingClientRect().left - Y(e, {
            marginLeft: 0
        }, function() {
            return e.getBoundingClientRect().left;
        })) + "px";
    }), E.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(i, o) {
        E.cssHooks[i + o] = {
            expand: function(e) {
                for (var t = 0, n = {}, r = "string" == typeof e ? e.split(" ") : [ e ]; t < 4; t++) n[i + Z[t] + o] = r[t] || r[t - 2] || r[0];
                return n;
            }
        }, Pe.test(i) || (E.cssHooks[i + o].set = Qe);
    }), E.fn.extend({
        css: function(e, t) {
            return z(this, function(e, t, n) {
                var r, i, o = {}, a = 0;
                if (E.isArray(t)) {
                    for (r = We(e), i = t.length; a < i; a++) o[t[a]] = E.css(e, t[a], !1, r);
                    return o;
                }
                return void 0 !== n ? E.style(e, t, n) : E.css(e, t);
            }, e, t, 1 < arguments.length);
        }
    }), ((E.Tween = et).prototype = {
        constructor: et,
        init: function(e, t, n, r, i, o) {
            this.elem = e, this.prop = n, this.easing = i || E.easing._default, this.options = t, 
            this.start = this.now = this.cur(), this.end = r, this.unit = o || (E.cssNumber[n] ? "" : "px");
        },
        cur: function() {
            var e = et.propHooks[this.prop];
            return e && e.get ? e.get(this) : et.propHooks._default.get(this);
        },
        run: function(e) {
            var t, n = et.propHooks[this.prop];
            return this.options.duration ? this.pos = t = E.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, 
            this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
            n && n.set ? n.set(this) : et.propHooks._default.set(this), this;
        }
    }).init.prototype = et.prototype, (et.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = E.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0;
            },
            set: function(e) {
                E.fx.step[e.prop] ? E.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[E.cssProps[e.prop]] && !E.cssHooks[e.prop] ? e.elem[e.prop] = e.now : E.style(e.elem, e.prop, e.now + e.unit);
            }
        }
    }).scrollTop = et.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
        }
    }, E.easing = {
        linear: function(e) {
            return e;
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2;
        },
        _default: "swing"
    }, E.fx = et.prototype.init, E.fx.step = {};
    var tt, nt, rt, it, ot = /^(?:toggle|show|hide)$/, at = /queueHooks$/;
    function st() {
        nt && (T.requestAnimationFrame(st), E.fx.tick());
    }
    function ut() {
        return T.setTimeout(function() {
            tt = void 0;
        }), tt = E.now();
    }
    function lt(e, t) {
        var n, r = 0, i = {
            height: e
        };
        for (t = t ? 1 : 0; r < 4; r += 2 - t) i["margin" + (n = Z[r])] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e), i;
    }
    function ct(e, t, n) {
        for (var r, i = (ft.tweeners[t] || []).concat(ft.tweeners["*"]), o = 0, a = i.length; o < a; o++) if (r = i[o].call(n, t, e)) return r;
    }
    function ft(o, e, t) {
        var n, a, r = 0, i = ft.prefilters.length, s = E.Deferred().always(function() {
            delete u.elem;
        }), u = function() {
            if (a) return !1;
            for (var e = tt || ut(), t = Math.max(0, l.startTime + l.duration - e), n = 1 - (t / l.duration || 0), r = 0, i = l.tweens.length; r < i; r++) l.tweens[r].run(n);
            return s.notifyWith(o, [ l, n, t ]), n < 1 && i ? t : (s.resolveWith(o, [ l ]), 
            !1);
        }, l = s.promise({
            elem: o,
            props: E.extend({}, e),
            opts: E.extend(!0, {
                specialEasing: {},
                easing: E.easing._default
            }, t),
            originalProperties: e,
            originalOptions: t,
            startTime: tt || ut(),
            duration: t.duration,
            tweens: [],
            createTween: function(e, t) {
                var n = E.Tween(o, l.opts, e, t, l.opts.specialEasing[e] || l.opts.easing);
                return l.tweens.push(n), n;
            },
            stop: function(e) {
                var t = 0, n = e ? l.tweens.length : 0;
                if (a) return this;
                for (a = !0; t < n; t++) l.tweens[t].run(1);
                return e ? (s.notifyWith(o, [ l, 1, 0 ]), s.resolveWith(o, [ l, e ])) : s.rejectWith(o, [ l, e ]), 
                this;
            }
        }), c = l.props;
        for (!function(e, t) {
            var n, r, i, o, a;
            for (n in e) if (i = t[r = E.camelCase(n)], o = e[n], E.isArray(o) && (i = o[1], 
            o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), (a = E.cssHooks[r]) && "expand" in a) for (n in o = a.expand(o), 
            delete e[r], o) n in e || (e[n] = o[n], t[n] = i); else t[r] = i;
        }(c, l.opts.specialEasing); r < i; r++) if (n = ft.prefilters[r].call(l, o, c, l.opts)) return E.isFunction(n.stop) && (E._queueHooks(l.elem, l.opts.queue).stop = E.proxy(n.stop, n)), 
        n;
        return E.map(c, ct, l), E.isFunction(l.opts.start) && l.opts.start.call(o, l), E.fx.timer(E.extend(u, {
            elem: o,
            anim: l,
            queue: l.opts.queue
        })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always);
    }
    E.Animation = E.extend(ft, {
        tweeners: {
            "*": [ function(e, t) {
                var n = this.createTween(e, t);
                return te(n.elem, e, K.exec(t), n), n;
            } ]
        },
        tweener: function(e, t) {
            for (var n, r = 0, i = (e = E.isFunction(e) ? (t = e, [ "*" ]) : e.match(O)).length; r < i; r++) n = e[r], 
            ft.tweeners[n] = ft.tweeners[n] || [], ft.tweeners[n].unshift(t);
        },
        prefilters: [ function(e, t, n) {
            var r, i, o, a, s, u, l, c, f = "width" in t || "height" in t, d = this, p = {}, h = e.style, m = e.nodeType && ee(e), g = V.get(e, "fxshow");
            for (r in n.queue || (null == (a = E._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, 
            s = a.empty.fire, a.empty.fire = function() {
                a.unqueued || s();
            }), a.unqueued++, d.always(function() {
                d.always(function() {
                    a.unqueued--, E.queue(e, "fx").length || a.empty.fire();
                });
            })), t) if (i = t[r], ot.test(i)) {
                if (delete t[r], o = o || "toggle" === i, i === (m ? "hide" : "show")) {
                    if ("show" !== i || !g || void 0 === g[r]) continue;
                    m = !0;
                }
                p[r] = g && g[r] || E.style(e, r);
            }
            if ((u = !E.isEmptyObject(t)) || !E.isEmptyObject(p)) for (r in f && 1 === e.nodeType && (n.overflow = [ h.overflow, h.overflowX, h.overflowY ], 
            null == (l = g && g.display) && (l = V.get(e, "display")), "none" === (c = E.css(e, "display")) && (l ? c = l : (re([ e ], !0), 
            l = e.style.display || l, c = E.css(e, "display"), re([ e ]))), ("inline" === c || "inline-block" === c && null != l) && "none" === E.css(e, "float") && (u || (d.done(function() {
                h.display = l;
            }), null == l && (c = h.display, l = "none" === c ? "" : c)), h.display = "inline-block")), 
            n.overflow && (h.overflow = "hidden", d.always(function() {
                h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2];
            })), u = !1, p) u || (g ? "hidden" in g && (m = g.hidden) : g = V.access(e, "fxshow", {
                display: l
            }), o && (g.hidden = !m), m && re([ e ], !0), d.done(function() {
                for (r in m || re([ e ]), V.remove(e, "fxshow"), p) E.style(e, r, p[r]);
            })), u = ct(m ? g[r] : 0, r, d), r in g || (g[r] = u.start, m && (u.end = u.start, 
            u.start = 0));
        } ],
        prefilter: function(e, t) {
            t ? ft.prefilters.unshift(e) : ft.prefilters.push(e);
        }
    }), E.speed = function(e, t, n) {
        var r = e && "object" == typeof e ? E.extend({}, e) : {
            complete: n || !n && t || E.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !E.isFunction(t) && t
        };
        return E.fx.off || k.hidden ? r.duration = 0 : "number" != typeof r.duration && (r.duration in E.fx.speeds ? r.duration = E.fx.speeds[r.duration] : r.duration = E.fx.speeds._default), 
        null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function() {
            E.isFunction(r.old) && r.old.call(this), r.queue && E.dequeue(this, r.queue);
        }, r;
    }, E.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(ee).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r);
        },
        animate: function(t, e, n, r) {
            function i() {
                var e = ft(this, E.extend({}, t), a);
                (o || V.get(this, "finish")) && e.stop(!0);
            }
            var o = E.isEmptyObject(t), a = E.speed(e, n, r);
            return i.finish = i, o || !1 === a.queue ? this.each(i) : this.queue(a.queue, i);
        },
        stop: function(i, e, o) {
            function a(e) {
                var t = e.stop;
                delete e.stop, t(o);
            }
            return "string" != typeof i && (o = e, e = i, i = void 0), e && !1 !== i && this.queue(i || "fx", []), 
            this.each(function() {
                var e = !0, t = null != i && i + "queueHooks", n = E.timers, r = V.get(this);
                if (t) r[t] && r[t].stop && a(r[t]); else for (t in r) r[t] && r[t].stop && at.test(t) && a(r[t]);
                for (t = n.length; t--; ) n[t].elem !== this || null != i && n[t].queue !== i || (n[t].anim.stop(o), 
                e = !1, n.splice(t, 1));
                !e && o || E.dequeue(this, i);
            });
        },
        finish: function(a) {
            return !1 !== a && (a = a || "fx"), this.each(function() {
                var e, t = V.get(this), n = t[a + "queue"], r = t[a + "queueHooks"], i = E.timers, o = n ? n.length : 0;
                for (t.finish = !0, E.queue(this, a, []), r && r.stop && r.stop.call(this, !0), 
                e = i.length; e--; ) i[e].elem === this && i[e].queue === a && (i[e].anim.stop(!0), 
                i.splice(e, 1));
                for (e = 0; e < o; e++) n[e] && n[e].finish && n[e].finish.call(this);
                delete t.finish;
            });
        }
    }), E.each([ "toggle", "show", "hide" ], function(e, r) {
        var i = E.fn[r];
        E.fn[r] = function(e, t, n) {
            return null == e || "boolean" == typeof e ? i.apply(this, arguments) : this.animate(lt(r, !0), e, t, n);
        };
    }), E.each({
        slideDown: lt("show"),
        slideUp: lt("hide"),
        slideToggle: lt("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, r) {
        E.fn[e] = function(e, t, n) {
            return this.animate(r, e, t, n);
        };
    }), E.timers = [], E.fx.tick = function() {
        var e, t = 0, n = E.timers;
        for (tt = E.now(); t < n.length; t++) (e = n[t])() || n[t] !== e || n.splice(t--, 1);
        n.length || E.fx.stop(), tt = void 0;
    }, E.fx.timer = function(e) {
        E.timers.push(e), e() ? E.fx.start() : E.timers.pop();
    }, E.fx.interval = 13, E.fx.start = function() {
        nt = nt || (T.requestAnimationFrame ? T.requestAnimationFrame(st) : T.setInterval(E.fx.tick, E.fx.interval));
    }, E.fx.stop = function() {
        T.cancelAnimationFrame ? T.cancelAnimationFrame(nt) : T.clearInterval(nt), nt = null;
    }, E.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, E.fn.delay = function(r, e) {
        return r = E.fx && E.fx.speeds[r] || r, e = e || "fx", this.queue(e, function(e, t) {
            var n = T.setTimeout(e, r);
            t.stop = function() {
                T.clearTimeout(n);
            };
        });
    }, rt = k.createElement("input"), it = k.createElement("select").appendChild(k.createElement("option")), 
    rt.type = "checkbox", g.checkOn = "" !== rt.value, g.optSelected = it.selected, 
    (rt = k.createElement("input")).value = "t", rt.type = "radio", g.radioValue = "t" === rt.value;
    var dt, pt = E.expr.attrHandle;
    E.fn.extend({
        attr: function(e, t) {
            return z(this, E.attr, e, t, 1 < arguments.length);
        },
        removeAttr: function(e) {
            return this.each(function() {
                E.removeAttr(this, e);
            });
        }
    }), E.extend({
        attr: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o) return void 0 === e.getAttribute ? E.prop(e, t, n) : (1 === o && E.isXMLDoc(e) || (i = E.attrHooks[t.toLowerCase()] || (E.expr.match.bool.test(t) ? dt : void 0)), 
            void 0 !== n ? null === n ? void E.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), 
            n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : null == (r = E.find.attr(e, t)) ? void 0 : r);
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!g.radioValue && "radio" === t && E.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t;
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var n, r = 0, i = t && t.match(O);
            if (i && 1 === e.nodeType) for (;n = i[r++]; ) e.removeAttribute(n);
        }
    }), dt = {
        set: function(e, t, n) {
            return !1 === t ? E.removeAttr(e, n) : e.setAttribute(n, n), n;
        }
    }, E.each(E.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var a = pt[t] || E.find.attr;
        pt[t] = function(e, t, n) {
            var r, i, o = t.toLowerCase();
            return n || (i = pt[o], pt[o] = r, r = null != a(e, t, n) ? o : null, pt[o] = i), 
            r;
        };
    });
    var ht = /^(?:input|select|textarea|button)$/i, mt = /^(?:a|area)$/i;
    function gt(e) {
        return (e.match(O) || []).join(" ");
    }
    function vt(e) {
        return e.getAttribute && e.getAttribute("class") || "";
    }
    E.fn.extend({
        prop: function(e, t) {
            return z(this, E.prop, e, t, 1 < arguments.length);
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[E.propFix[e] || e];
            });
        }
    }), E.extend({
        prop: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o) return 1 === o && E.isXMLDoc(e) || (t = E.propFix[t] || t, 
            i = E.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t];
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = E.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : ht.test(e.nodeName) || mt.test(e.nodeName) && e.href ? 0 : -1;
                }
            }
        },
        propFix: {
            for: "htmlFor",
            class: "className"
        }
    }), g.optSelected || (E.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null;
        },
        set: function(e) {
            var t = e.parentNode;
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
        }
    }), E.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
        E.propFix[this.toLowerCase()] = this;
    }), E.fn.extend({
        addClass: function(t) {
            var e, n, r, i, o, a, s, u = 0;
            if (E.isFunction(t)) return this.each(function(e) {
                E(this).addClass(t.call(this, e, vt(this)));
            });
            if ("string" == typeof t && t) for (e = t.match(O) || []; n = this[u++]; ) if (i = vt(n), 
            r = 1 === n.nodeType && " " + gt(i) + " ") {
                for (a = 0; o = e[a++]; ) r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                i !== (s = gt(r)) && n.setAttribute("class", s);
            }
            return this;
        },
        removeClass: function(t) {
            var e, n, r, i, o, a, s, u = 0;
            if (E.isFunction(t)) return this.each(function(e) {
                E(this).removeClass(t.call(this, e, vt(this)));
            });
            if (!arguments.length) return this.attr("class", "");
            if ("string" == typeof t && t) for (e = t.match(O) || []; n = this[u++]; ) if (i = vt(n), 
            r = 1 === n.nodeType && " " + gt(i) + " ") {
                for (a = 0; o = e[a++]; ) for (;-1 < r.indexOf(" " + o + " "); ) r = r.replace(" " + o + " ", " ");
                i !== (s = gt(r)) && n.setAttribute("class", s);
            }
            return this;
        },
        toggleClass: function(i, t) {
            var o = typeof i;
            return "boolean" == typeof t && "string" == o ? t ? this.addClass(i) : this.removeClass(i) : E.isFunction(i) ? this.each(function(e) {
                E(this).toggleClass(i.call(this, e, vt(this), t), t);
            }) : this.each(function() {
                var e, t, n, r;
                if ("string" == o) for (t = 0, n = E(this), r = i.match(O) || []; e = r[t++]; ) n.hasClass(e) ? n.removeClass(e) : n.addClass(e); else void 0 !== i && "boolean" != o || ((e = vt(this)) && V.set(this, "__className__", e), 
                this.setAttribute && this.setAttribute("class", e || !1 === i ? "" : V.get(this, "__className__") || ""));
            });
        },
        hasClass: function(e) {
            var t, n, r = 0;
            for (t = " " + e + " "; n = this[r++]; ) if (1 === n.nodeType && -1 < (" " + gt(vt(n)) + " ").indexOf(t)) return !0;
            return !1;
        }
    });
    var yt = /\r/g;
    E.fn.extend({
        val: function(n) {
            var r, e, i, t = this[0];
            return arguments.length ? (i = E.isFunction(n), this.each(function(e) {
                var t;
                1 === this.nodeType && (null == (t = i ? n.call(this, e, E(this).val()) : n) ? t = "" : "number" == typeof t ? t += "" : E.isArray(t) && (t = E.map(t, function(e) {
                    return null == e ? "" : e + "";
                })), (r = E.valHooks[this.type] || E.valHooks[this.nodeName.toLowerCase()]) && "set" in r && void 0 !== r.set(this, t, "value") || (this.value = t));
            })) : t ? (r = E.valHooks[t.type] || E.valHooks[t.nodeName.toLowerCase()]) && "get" in r && void 0 !== (e = r.get(t, "value")) ? e : "string" == typeof (e = t.value) ? e.replace(yt, "") : null == e ? "" : e : void 0;
        }
    }), E.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = E.find.attr(e, "value");
                    return null != t ? t : gt(E.text(e));
                }
            },
            select: {
                get: function(e) {
                    var t, n, r, i = e.options, o = e.selectedIndex, a = "select-one" === e.type, s = a ? null : [], u = a ? o + 1 : i.length;
                    for (r = o < 0 ? u : a ? o : 0; r < u; r++) if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !E.nodeName(n.parentNode, "optgroup"))) {
                        if (t = E(n).val(), a) return t;
                        s.push(t);
                    }
                    return s;
                },
                set: function(e, t) {
                    for (var n, r, i = e.options, o = E.makeArray(t), a = i.length; a--; ) ((r = i[a]).selected = -1 < E.inArray(E.valHooks.option.get(r), o)) && (n = !0);
                    return n || (e.selectedIndex = -1), o;
                }
            }
        }
    }), E.each([ "radio", "checkbox" ], function() {
        E.valHooks[this] = {
            set: function(e, t) {
                if (E.isArray(t)) return e.checked = -1 < E.inArray(E(e).val(), t);
            }
        }, g.checkOn || (E.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value;
        });
    });
    var bt = /^(?:focusinfocus|focusoutblur)$/;
    E.extend(E.event, {
        trigger: function(e, t, n, r) {
            var i, o, a, s, u, l, c, f = [ n || k ], d = h.call(e, "type") ? e.type : e, p = h.call(e, "namespace") ? e.namespace.split(".") : [];
            if (o = a = n = n || k, 3 !== n.nodeType && 8 !== n.nodeType && !bt.test(d + E.event.triggered) && (-1 < d.indexOf(".") && (d = (p = d.split(".")).shift(), 
            p.sort()), u = d.indexOf(":") < 0 && "on" + d, (e = e[E.expando] ? e : new E.Event(d, "object" == typeof e && e)).isTrigger = r ? 2 : 3, 
            e.namespace = p.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
            e.result = void 0, e.target || (e.target = n), t = null == t ? [ e ] : E.makeArray(t, [ e ]), 
            c = E.event.special[d] || {}, r || !c.trigger || !1 !== c.trigger.apply(n, t))) {
                if (!r && !c.noBubble && !E.isWindow(n)) {
                    for (s = c.delegateType || d, bt.test(s + d) || (o = o.parentNode); o; o = o.parentNode) f.push(o), 
                    a = o;
                    a === (n.ownerDocument || k) && f.push(a.defaultView || a.parentWindow || T);
                }
                for (i = 0; (o = f[i++]) && !e.isPropagationStopped(); ) e.type = 1 < i ? s : c.bindType || d, 
                (l = (V.get(o, "events") || {})[e.type] && V.get(o, "handle")) && l.apply(o, t), 
                (l = u && o[u]) && l.apply && B(o) && (e.result = l.apply(o, t), !1 === e.result && e.preventDefault());
                return e.type = d, r || e.isDefaultPrevented() || c._default && !1 !== c._default.apply(f.pop(), t) || !B(n) || u && E.isFunction(n[d]) && !E.isWindow(n) && ((a = n[u]) && (n[u] = null), 
                n[E.event.triggered = d](), E.event.triggered = void 0, a && (n[u] = a)), e.result;
            }
        },
        simulate: function(e, t, n) {
            var r = E.extend(new E.Event(), n, {
                type: e,
                isSimulated: !0
            });
            E.event.trigger(r, null, t);
        }
    }), E.fn.extend({
        trigger: function(e, t) {
            return this.each(function() {
                E.event.trigger(e, t, this);
            });
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            if (n) return E.event.trigger(e, t, n, !0);
        }
    }), E.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, n) {
        E.fn[n] = function(e, t) {
            return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n);
        };
    }), E.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e);
        }
    }), g.focusin = "onfocusin" in T, g.focusin || E.each({
        focus: "focusin",
        blur: "focusout"
    }, function(n, r) {
        function i(e) {
            E.event.simulate(r, e.target, E.event.fix(e));
        }
        E.event.special[r] = {
            setup: function() {
                var e = this.ownerDocument || this, t = V.access(e, r);
                t || e.addEventListener(n, i, !0), V.access(e, r, (t || 0) + 1);
            },
            teardown: function() {
                var e = this.ownerDocument || this, t = V.access(e, r) - 1;
                t ? V.access(e, r, t) : (e.removeEventListener(n, i, !0), V.remove(e, r));
            }
        };
    });
    var xt = T.location, wt = E.now(), Ct = /\?/;
    E.parseXML = function(e) {
        var t;
        if (!e || "string" != typeof e) return null;
        try {
            t = new T.DOMParser().parseFromString(e, "text/xml");
        } catch (e) {
            t = void 0;
        }
        return t && !t.getElementsByTagName("parsererror").length || E.error("Invalid XML: " + e), 
        t;
    };
    var Tt = /\[\]$/, kt = /\r?\n/g, Et = /^(?:submit|button|image|reset|file)$/i, Nt = /^(?:input|select|textarea|keygen)/i;
    function St(n, e, r, i) {
        var t;
        if (E.isArray(e)) E.each(e, function(e, t) {
            r || Tt.test(n) ? i(n, t) : St(n + "[" + ("object" == typeof t && null != t ? e : "") + "]", t, r, i);
        }); else if (r || "object" !== E.type(e)) i(n, e); else for (t in e) St(n + "[" + t + "]", e[t], r, i);
    }
    E.param = function(e, t) {
        function n(e, t) {
            var n = E.isFunction(t) ? t() : t;
            i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n);
        }
        var r, i = [];
        if (E.isArray(e) || e.jquery && !E.isPlainObject(e)) E.each(e, function() {
            n(this.name, this.value);
        }); else for (r in e) St(r, e[r], t, n);
        return i.join("&");
    }, E.fn.extend({
        serialize: function() {
            return E.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var e = E.prop(this, "elements");
                return e ? E.makeArray(e) : this;
            }).filter(function() {
                var e = this.type;
                return this.name && !E(this).is(":disabled") && Nt.test(this.nodeName) && !Et.test(e) && (this.checked || !ie.test(e));
            }).map(function(e, t) {
                var n = E(this).val();
                return null == n ? null : E.isArray(n) ? E.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(kt, "\r\n")
                    };
                }) : {
                    name: t.name,
                    value: n.replace(kt, "\r\n")
                };
            }).get();
        }
    });
    var Ft = /%20/g, jt = /#.*$/, Dt = /([?&])_=[^&]*/, At = /^(.*?):[ \t]*([^\r\n]*)$/gm, $t = /^(?:GET|HEAD)$/, Lt = /^\/\//, qt = {}, Ot = {}, Ht = "*/".concat("*"), It = k.createElement("a");
    function Rt(o) {
        return function(e, t) {
            "string" != typeof e && (t = e, e = "*");
            var n, r = 0, i = e.toLowerCase().match(O) || [];
            if (E.isFunction(t)) for (;n = i[r++]; ) "+" === n[0] ? (n = n.slice(1) || "*", 
            (o[n] = o[n] || []).unshift(t)) : (o[n] = o[n] || []).push(t);
        };
    }
    function Pt(t, i, o, a) {
        var s = {}, u = t === Ot;
        function l(e) {
            var r;
            return s[e] = !0, E.each(t[e] || [], function(e, t) {
                var n = t(i, o, a);
                return "string" != typeof n || u || s[n] ? u ? !(r = n) : void 0 : (i.dataTypes.unshift(n), 
                l(n), !1);
            }), r;
        }
        return l(i.dataTypes[0]) || !s["*"] && l("*");
    }
    function Mt(e, t) {
        var n, r, i = E.ajaxSettings.flatOptions || {};
        for (n in t) void 0 !== t[n] && ((i[n] ? e : r = r || {})[n] = t[n]);
        return r && E.extend(!0, e, r), e;
    }
    It.href = xt.href, E.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: xt.href,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(xt.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Ht,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": E.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? Mt(Mt(e, E.ajaxSettings), t) : Mt(E.ajaxSettings, e);
        },
        ajaxPrefilter: Rt(qt),
        ajaxTransport: Rt(Ot),
        ajax: function(e, t) {
            "object" == typeof e && (t = e, e = void 0), t = t || {};
            var c, f, d, n, p, r, h, m, i, o, g = E.ajaxSetup({}, t), v = g.context || g, y = g.context && (v.nodeType || v.jquery) ? E(v) : E.event, b = E.Deferred(), x = E.Callbacks("once memory"), w = g.statusCode || {}, a = {}, s = {}, u = "canceled", C = {
                readyState: 0,
                getResponseHeader: function(e) {
                    var t;
                    if (h) {
                        if (!n) for (n = {}; t = At.exec(d); ) n[t[1].toLowerCase()] = t[2];
                        t = n[e.toLowerCase()];
                    }
                    return null == t ? null : t;
                },
                getAllResponseHeaders: function() {
                    return h ? d : null;
                },
                setRequestHeader: function(e, t) {
                    return null == h && (e = s[e.toLowerCase()] = s[e.toLowerCase()] || e, a[e] = t), 
                    this;
                },
                overrideMimeType: function(e) {
                    return null == h && (g.mimeType = e), this;
                },
                statusCode: function(e) {
                    var t;
                    if (e) if (h) C.always(e[C.status]); else for (t in e) w[t] = [ w[t], e[t] ];
                    return this;
                },
                abort: function(e) {
                    var t = e || u;
                    return c && c.abort(t), l(0, t), this;
                }
            };
            if (b.promise(C), g.url = ((e || g.url || xt.href) + "").replace(Lt, xt.protocol + "//"), 
            g.type = t.method || t.type || g.method || g.type, g.dataTypes = (g.dataType || "*").toLowerCase().match(O) || [ "" ], 
            null == g.crossDomain) {
                r = k.createElement("a");
                try {
                    r.href = g.url, r.href = r.href, g.crossDomain = It.protocol + "//" + It.host != r.protocol + "//" + r.host;
                } catch (e) {
                    g.crossDomain = !0;
                }
            }
            if (g.data && g.processData && "string" != typeof g.data && (g.data = E.param(g.data, g.traditional)), 
            Pt(qt, g, t, C), h) return C;
            for (i in (m = E.event && g.global) && 0 == E.active++ && E.event.trigger("ajaxStart"), 
            g.type = g.type.toUpperCase(), g.hasContent = !$t.test(g.type), f = g.url.replace(jt, ""), 
            g.hasContent ? g.data && g.processData && 0 === (g.contentType || "").indexOf("application/x-www-form-urlencoded") && (g.data = g.data.replace(Ft, "+")) : (o = g.url.slice(f.length), 
            g.data && (f += (Ct.test(f) ? "&" : "?") + g.data, delete g.data), !1 === g.cache && (f = f.replace(Dt, "$1"), 
            o = (Ct.test(f) ? "&" : "?") + "_=" + wt++ + o), g.url = f + o), g.ifModified && (E.lastModified[f] && C.setRequestHeader("If-Modified-Since", E.lastModified[f]), 
            E.etag[f] && C.setRequestHeader("If-None-Match", E.etag[f])), (g.data && g.hasContent && !1 !== g.contentType || t.contentType) && C.setRequestHeader("Content-Type", g.contentType), 
            C.setRequestHeader("Accept", g.dataTypes[0] && g.accepts[g.dataTypes[0]] ? g.accepts[g.dataTypes[0]] + ("*" !== g.dataTypes[0] ? ", " + Ht + "; q=0.01" : "") : g.accepts["*"]), 
            g.headers) C.setRequestHeader(i, g.headers[i]);
            if (g.beforeSend && (!1 === g.beforeSend.call(v, C, g) || h)) return C.abort();
            if (u = "abort", x.add(g.complete), C.done(g.success), C.fail(g.error), c = Pt(Ot, g, t, C)) {
                if (C.readyState = 1, m && y.trigger("ajaxSend", [ C, g ]), h) return C;
                g.async && 0 < g.timeout && (p = T.setTimeout(function() {
                    C.abort("timeout");
                }, g.timeout));
                try {
                    h = !1, c.send(a, l);
                } catch (e) {
                    if (h) throw e;
                    l(-1, e);
                }
            } else l(-1, "No Transport");
            function l(e, t, n, r) {
                var i, o, a, s, u, l = t;
                h || (h = !0, p && T.clearTimeout(p), c = void 0, d = r || "", C.readyState = 0 < e ? 4 : 0, 
                i = 200 <= e && e < 300 || 304 === e, n && (s = function(e, t, n) {
                    for (var r, i, o, a, s = e.contents, u = e.dataTypes; "*" === u[0]; ) u.shift(), 
                    void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
                    if (r) for (i in s) if (s[i] && s[i].test(r)) {
                        u.unshift(i);
                        break;
                    }
                    if (u[0] in n) o = u[0]; else {
                        for (i in n) {
                            if (!u[0] || e.converters[i + " " + u[0]]) {
                                o = i;
                                break;
                            }
                            a = a || i;
                        }
                        o = o || a;
                    }
                    if (o) return o !== u[0] && u.unshift(o), n[o];
                }(g, C, n)), s = function(e, t, n, r) {
                    var i, o, a, s, u, l = {}, c = e.dataTypes.slice();
                    if (c[1]) for (a in e.converters) l[a.toLowerCase()] = e.converters[a];
                    for (o = c.shift(); o; ) if (e.responseFields[o] && (n[e.responseFields[o]] = t), 
                    !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift()) if ("*" === o) o = u; else if ("*" !== u && u !== o) {
                        if (!(a = l[u + " " + o] || l["* " + o])) for (i in l) if ((s = i.split(" "))[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                            !0 === a ? a = l[i] : !0 !== l[i] && (o = s[0], c.unshift(s[1]));
                            break;
                        }
                        if (!0 !== a) if (a && e.throws) t = a(t); else try {
                            t = a(t);
                        } catch (e) {
                            return {
                                state: "parsererror",
                                error: a ? e : "No conversion from " + u + " to " + o
                            };
                        }
                    }
                    return {
                        state: "success",
                        data: t
                    };
                }(g, s, C, i), i ? (g.ifModified && ((u = C.getResponseHeader("Last-Modified")) && (E.lastModified[f] = u), 
                (u = C.getResponseHeader("etag")) && (E.etag[f] = u)), 204 === e || "HEAD" === g.type ? l = "nocontent" : 304 === e ? l = "notmodified" : (l = s.state, 
                o = s.data, i = !(a = s.error))) : (a = l, !e && l || (l = "error", e < 0 && (e = 0))), 
                C.status = e, C.statusText = (t || l) + "", i ? b.resolveWith(v, [ o, l, C ]) : b.rejectWith(v, [ C, l, a ]), 
                C.statusCode(w), w = void 0, m && y.trigger(i ? "ajaxSuccess" : "ajaxError", [ C, g, i ? o : a ]), 
                x.fireWith(v, [ C, l ]), m && (y.trigger("ajaxComplete", [ C, g ]), --E.active || E.event.trigger("ajaxStop")));
            }
            return C;
        },
        getJSON: function(e, t, n) {
            return E.get(e, t, n, "json");
        },
        getScript: function(e, t) {
            return E.get(e, void 0, t, "script");
        }
    }), E.each([ "get", "post" ], function(e, i) {
        E[i] = function(e, t, n, r) {
            return E.isFunction(t) && (r = r || n, n = t, t = void 0), E.ajax(E.extend({
                url: e,
                type: i,
                dataType: r,
                data: t,
                success: n
            }, E.isPlainObject(e) && e));
        };
    }), E._evalUrl = function(e) {
        return E.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            throws: !0
        });
    }, E.fn.extend({
        wrapAll: function(e) {
            var t;
            return this[0] && (E.isFunction(e) && (e = e.call(this[0])), t = E(e, this[0].ownerDocument).eq(0).clone(!0), 
            this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                for (var e = this; e.firstElementChild; ) e = e.firstElementChild;
                return e;
            }).append(this)), this;
        },
        wrapInner: function(n) {
            return E.isFunction(n) ? this.each(function(e) {
                E(this).wrapInner(n.call(this, e));
            }) : this.each(function() {
                var e = E(this), t = e.contents();
                t.length ? t.wrapAll(n) : e.append(n);
            });
        },
        wrap: function(t) {
            var n = E.isFunction(t);
            return this.each(function(e) {
                E(this).wrapAll(n ? t.call(this, e) : t);
            });
        },
        unwrap: function(e) {
            return this.parent(e).not("body").each(function() {
                E(this).replaceWith(this.childNodes);
            }), this;
        }
    }), E.expr.pseudos.hidden = function(e) {
        return !E.expr.pseudos.visible(e);
    }, E.expr.pseudos.visible = function(e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
    }, E.ajaxSettings.xhr = function() {
        try {
            return new T.XMLHttpRequest();
        } catch (e) {}
    };
    var Wt = {
        0: 200,
        1223: 204
    }, Bt = E.ajaxSettings.xhr();
    g.cors = !!Bt && "withCredentials" in Bt, g.ajax = Bt = !!Bt, E.ajaxTransport(function(i) {
        var o, a;
        if (g.cors || Bt && !i.crossDomain) return {
            send: function(e, t) {
                var n, r = i.xhr();
                if (r.open(i.type, i.url, i.async, i.username, i.password), i.xhrFields) for (n in i.xhrFields) r[n] = i.xhrFields[n];
                for (n in i.mimeType && r.overrideMimeType && r.overrideMimeType(i.mimeType), i.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"), 
                e) r.setRequestHeader(n, e[n]);
                o = function(e) {
                    return function() {
                        o && (o = a = r.onload = r.onerror = r.onabort = r.onreadystatechange = null, "abort" === e ? r.abort() : "error" === e ? "number" != typeof r.status ? t(0, "error") : t(r.status, r.statusText) : t(Wt[r.status] || r.status, r.statusText, "text" !== (r.responseType || "text") || "string" != typeof r.responseText ? {
                            binary: r.response
                        } : {
                            text: r.responseText
                        }, r.getAllResponseHeaders()));
                    };
                }, r.onload = o(), a = r.onerror = o("error"), void 0 !== r.onabort ? r.onabort = a : r.onreadystatechange = function() {
                    4 === r.readyState && T.setTimeout(function() {
                        o && a();
                    });
                }, o = o("abort");
                try {
                    r.send(i.hasContent && i.data || null);
                } catch (e) {
                    if (o) throw e;
                }
            },
            abort: function() {
                o && o();
            }
        };
    }), E.ajaxPrefilter(function(e) {
        e.crossDomain && (e.contents.script = !1);
    }), E.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return E.globalEval(e), e;
            }
        }
    }), E.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
    }), E.ajaxTransport("script", function(n) {
        var r, i;
        if (n.crossDomain) return {
            send: function(e, t) {
                r = E("<script>").prop({
                    charset: n.scriptCharset,
                    src: n.url
                }).on("load error", i = function(e) {
                    r.remove(), i = null, e && t("error" === e.type ? 404 : 200, e.type);
                }), k.head.appendChild(r[0]);
            },
            abort: function() {
                i && i();
            }
        };
    });
    var zt, _t = [], Vt = /(=)\?(?=&|$)|\?\?/;
    function Ut(e) {
        return E.isWindow(e) ? e : 9 === e.nodeType && e.defaultView;
    }
    E.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = _t.pop() || E.expando + "_" + wt++;
            return this[e] = !0, e;
        }
    }), E.ajaxPrefilter("json jsonp", function(e, t, n) {
        var r, i, o, a = !1 !== e.jsonp && (Vt.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Vt.test(e.data) && "data");
        if (a || "jsonp" === e.dataTypes[0]) return r = e.jsonpCallback = E.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, 
        a ? e[a] = e[a].replace(Vt, "$1" + r) : !1 !== e.jsonp && (e.url += (Ct.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), 
        e.converters["script json"] = function() {
            return o || E.error(r + " was not called"), o[0];
        }, e.dataTypes[0] = "json", i = T[r], T[r] = function() {
            o = arguments;
        }, n.always(function() {
            void 0 === i ? E(T).removeProp(r) : T[r] = i, e[r] && (e.jsonpCallback = t.jsonpCallback, 
            _t.push(r)), o && E.isFunction(i) && i(o[0]), o = i = void 0;
        }), "script";
    }), g.createHTMLDocument = ((zt = k.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 
    2 === zt.childNodes.length), E.parseHTML = function(e, t, n) {
        return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (g.createHTMLDocument ? ((r = (t = k.implementation.createHTMLDocument("")).createElement("base")).href = k.location.href, 
        t.head.appendChild(r)) : t = k), o = !n && [], (i = S.exec(e)) ? [ t.createElement(i[1]) ] : (i = pe([ e ], t, o), 
        o && o.length && E(o).remove(), E.merge([], i.childNodes)));
        var r, i, o;
    }, E.fn.load = function(e, t, n) {
        var r, i, o, a = this, s = e.indexOf(" ");
        return -1 < s && (r = gt(e.slice(s)), e = e.slice(0, s)), E.isFunction(t) ? (n = t, 
        t = void 0) : t && "object" == typeof t && (i = "POST"), 0 < a.length && E.ajax({
            url: e,
            type: i || "GET",
            dataType: "html",
            data: t
        }).done(function(e) {
            o = arguments, a.html(r ? E("<div>").append(E.parseHTML(e)).find(r) : e);
        }).always(n && function(e, t) {
            a.each(function() {
                n.apply(this, o || [ e.responseText, t, e ]);
            });
        }), this;
    }, E.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(e, t) {
        E.fn[t] = function(e) {
            return this.on(t, e);
        };
    }), E.expr.pseudos.animated = function(t) {
        return E.grep(E.timers, function(e) {
            return t === e.elem;
        }).length;
    }, E.offset = {
        setOffset: function(e, t, n) {
            var r, i, o, a, s, u, l = E.css(e, "position"), c = E(e), f = {};
            "static" === l && (e.style.position = "relative"), s = c.offset(), o = E.css(e, "top"), 
            u = E.css(e, "left"), i = ("absolute" === l || "fixed" === l) && -1 < (o + u).indexOf("auto") ? (a = (r = c.position()).top, 
            r.left) : (a = parseFloat(o) || 0, parseFloat(u) || 0), E.isFunction(t) && (t = t.call(e, n, E.extend({}, s))), 
            null != t.top && (f.top = t.top - s.top + a), null != t.left && (f.left = t.left - s.left + i), 
            "using" in t ? t.using.call(e, f) : c.css(f);
        }
    }, E.fn.extend({
        offset: function(t) {
            if (arguments.length) return void 0 === t ? this : this.each(function(e) {
                E.offset.setOffset(this, t, e);
            });
            var e, n, r, i, o = this[0];
            return o ? o.getClientRects().length ? (r = o.getBoundingClientRect()).width || r.height ? (n = Ut(i = o.ownerDocument), 
            e = i.documentElement, {
                top: r.top + n.pageYOffset - e.clientTop,
                left: r.left + n.pageXOffset - e.clientLeft
            }) : r : {
                top: 0,
                left: 0
            } : void 0;
        },
        position: function() {
            if (this[0]) {
                var e, t, n = this[0], r = {
                    top: 0,
                    left: 0
                };
                return "fixed" === E.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), 
                t = this.offset(), E.nodeName(e[0], "html") || (r = e.offset()), r = {
                    top: r.top + E.css(e[0], "borderTopWidth", !0),
                    left: r.left + E.css(e[0], "borderLeftWidth", !0)
                }), {
                    top: t.top - r.top - E.css(n, "marginTop", !0),
                    left: t.left - r.left - E.css(n, "marginLeft", !0)
                };
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent; e && "static" === E.css(e, "position"); ) e = e.offsetParent;
                return e || he;
            });
        }
    }), E.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, i) {
        var o = "pageYOffset" === i;
        E.fn[t] = function(e) {
            return z(this, function(e, t, n) {
                var r = Ut(e);
                if (void 0 === n) return r ? r[i] : e[t];
                r ? r.scrollTo(o ? r.pageXOffset : n, o ? n : r.pageYOffset) : e[t] = n;
            }, t, e, arguments.length);
        };
    }), E.each([ "top", "left" ], function(e, n) {
        E.cssHooks[n] = _e(g.pixelPosition, function(e, t) {
            if (t) return t = ze(e, n), Me.test(t) ? E(e).position()[n] + "px" : t;
        });
    }), E.each({
        Height: "height",
        Width: "width"
    }, function(a, s) {
        E.each({
            padding: "inner" + a,
            content: s,
            "": "outer" + a
        }, function(r, o) {
            E.fn[o] = function(e, t) {
                var n = arguments.length && (r || "boolean" != typeof e), i = r || (!0 === e || !0 === t ? "margin" : "border");
                return z(this, function(e, t, n) {
                    var r;
                    return E.isWindow(e) ? 0 === o.indexOf("outer") ? e["inner" + a] : e.document.documentElement["client" + a] : 9 === e.nodeType ? (r = e.documentElement, 
                    Math.max(e.body["scroll" + a], r["scroll" + a], e.body["offset" + a], r["offset" + a], r["client" + a])) : void 0 === n ? E.css(e, t, i) : E.style(e, t, n, i);
                }, s, n ? e : void 0, n);
            };
        });
    }), E.fn.extend({
        bind: function(e, t, n) {
            return this.on(e, null, t, n);
        },
        unbind: function(e, t) {
            return this.off(e, null, t);
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r);
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
        }
    }), E.parseJSON = JSON.parse, "function" == typeof define && define.amd && define("jquery", [], function() {
        return E;
    });
    var Xt = T.jQuery, Gt = T.$;
    return E.noConflict = function(e) {
        return T.$ === E && (T.$ = Gt), e && T.jQuery === E && (T.jQuery = Xt), E;
    }, e || (T.jQuery = T.$ = E), E;
}), function(e, t) {
    if (e.JSON) if ("function" == typeof define && define.amd) define(function() {
        return t(e);
    }); else if ("object" == typeof module && "object" == typeof module.exports) module.exports = t(e); else {
        var n = !e.Nette || !e.Nette.noInit;
        e.Nette = t(e), n && e.Nette.initOnLoad();
    }
}("undefined" != typeof window ? window : this, function(s) {
    "use strict";
    var y = {}, i = {}, b = {};
    return y.formErrors = [], y.version = "3.0", y.onDocumentReady = function(e) {
        "loading" !== document.readyState ? e.call(this) : document.addEventListener("DOMContentLoaded", e);
    }, y.getValue = function(e) {
        var t;
        if (e) {
            if (e.tagName) {
                if ("radio" === e.type) {
                    var n = e.form.elements;
                    for (t = 0; t < n.length; t++) if (n[t].name === e.name && n[t].checked) return n[t].value;
                    return null;
                }
                if ("file" === e.type) return e.files || e.value;
                if ("select" === e.tagName.toLowerCase()) {
                    var r = e.selectedIndex, i = e.options, o = [];
                    if ("select-one" === e.type) return r < 0 ? null : i[r].value;
                    for (t = 0; t < i.length; t++) i[t].selected && o.push(i[t].value);
                    return o;
                }
                if (e.name && e.name.match(/\[\]$/)) {
                    for (n = e.form.elements[e.name].tagName ? [ e ] : e.form.elements[e.name], o = [], 
                    t = 0; t < n.length; t++) "checkbox" === n[t].type && !n[t].checked || o.push(n[t].value);
                    return o;
                }
                return "checkbox" === e.type ? e.checked : "textarea" === e.tagName.toLowerCase() ? e.value.replace("\r", "") : e.value.replace("\r", "").replace(/^\s+|\s+$/g, "");
            }
            return e[0] ? y.getValue(e[0]) : null;
        }
        return null;
    }, y.getEffectiveValue = function(e, t) {
        var n = y.getValue(e);
        if (e.getAttribute && n === e.getAttribute("data-nette-empty-value") && (n = ""), 
        t && void 0 === i[e.name]) {
            i[e.name] = !0;
            var r = {
                value: n
            };
            y.validateControl(e, null, !0, r), n = r.value, delete i[e.name];
        }
        return n;
    }, y.validateControl = function(n, e, t, r, i) {
        n = n.tagName ? n : n[0], e = e || JSON.parse(n.getAttribute("data-nette-rules") || "[]"), 
        r = void 0 === r ? {
            value: y.getEffectiveValue(n)
        } : r, i = i || !y.validateRule(n, ":filled", null, r);
        for (var o = 0, a = e.length; o < a; o++) {
            var s = e[o], u = s.op.match(/(~)?([^?]+)/), l = s.control ? n.form.elements.namedItem(s.control) : n;
            if (s.neg = u[1], s.op = u[2], s.condition = !!s.rules, l && (!i || s.condition || ":filled" === s.op)) {
                l = l.tagName ? l : l[0];
                var c = y.validateRule(l, s.op, s.arg, n === l ? r : void 0);
                if (null !== c) if (s.neg && (c = !c), s.condition && c) {
                    if (!y.validateControl(n, s.rules, t, r, ":blank" !== s.op && i)) return !1;
                } else if (!s.condition && !c) {
                    if (y.isDisabled(l)) continue;
                    if (!t) {
                        var f = Array.isArray(s.arg) ? s.arg : [ s.arg ], d = s.msg.replace(/%(value|\d+)/g, function(e, t) {
                            return y.getValue("value" === t ? l : n.form.elements.namedItem(f[t].control));
                        });
                        y.addError(l, d);
                    }
                    return !1;
                }
            }
        }
        return !("number" === n.type && !n.validity.valid) || (t || y.addError(n, "Please enter a valid value."), 
        !1);
    }, y.validateForm = function(e, t) {
        var n = e.form || e, r = !1;
        if (y.formErrors = [], n["nette-submittedBy"] && null !== n["nette-submittedBy"].getAttribute("formnovalidate")) {
            var i = JSON.parse(n["nette-submittedBy"].getAttribute("data-nette-validation-scope") || "[]");
            if (!i.length) return y.showFormErrors(n, []), !0;
            r = new RegExp("^(" + i.join("-|") + "-)");
        }
        var o, a, s = {};
        for (o = 0; o < n.elements.length; o++) if (!(a = n.elements[o]).tagName || a.tagName.toLowerCase() in {
            input: 1,
            select: 1,
            textarea: 1,
            button: 1
        }) {
            if ("radio" === a.type) {
                if (s[a.name]) continue;
                s[a.name] = !0;
            }
            if (!(r && !a.name.replace(/]\[|\[|]|$/g, "-").match(r) || y.isDisabled(a) || y.validateControl(a, null, t) || y.formErrors.length)) return !1;
        }
        var u = !y.formErrors.length;
        return y.showFormErrors(n, y.formErrors), u;
    }, y.isDisabled = function(e) {
        if ("radio" !== e.type) return e.disabled;
        for (var t = 0, n = e.form.elements; t < n.length; t++) if (n[t].name === e.name && !n[t].disabled) return !1;
        return !0;
    }, y.addError = function(e, t) {
        y.formErrors.push({
            element: e,
            message: t
        });
    }, y.showFormErrors = function(e, t) {
        for (var n, r = [], i = 0; i < t.length; i++) {
            var o = t[i].element, a = t[i].message;
            r.indexOf(a) < 0 && (r.push(a), !n && o.focus && (n = o));
        }
        r.length && (alert(r.join("\n")), n && n.focus());
    }, y.validateRule = function(e, t, n, r) {
        r = void 0 === r ? {
            value: y.getEffectiveValue(e, !0)
        } : r, ":" === t.charAt(0) && (t = t.substr(1)), t = (t = t.replace("::", "_")).replace(/\\/g, "");
        for (var i = Array.isArray(n) ? n.slice(0) : [ n ], o = 0, a = i.length; o < a; o++) if (i[o] && i[o].control) {
            var s = e.form.elements.namedItem(i[o].control);
            i[o] = s === e ? r.value : y.getEffectiveValue(s, !0);
        }
        return y.validators[t] ? y.validators[t](e, Array.isArray(n) ? i : i[0], r.value, r) : null;
    }, y.validators = {
        filled: function(e, t, n) {
            return !("number" !== e.type || !e.validity.badInput) || "" !== n && !1 !== n && null !== n && (!Array.isArray(n) || !!n.length) && (!s.FileList || !(n instanceof s.FileList) || n.length);
        },
        blank: function(e, t, n) {
            return !y.validators.filled(e, t, n);
        },
        valid: function(e) {
            return y.validateControl(e, null, !0);
        },
        equal: function(e, t, n) {
            if (void 0 === t) return null;
            function r(e) {
                return "number" == typeof e || "string" == typeof e ? "" + e : !0 === e ? "1" : "";
            }
            n = Array.isArray(n) ? n : [ n ], t = Array.isArray(t) ? t : [ t ];
            e: for (var i = 0, o = n.length; i < o; i++) {
                for (var a = 0, s = t.length; a < s; a++) if (r(n[i]) === r(t[a])) continue e;
                return !1;
            }
            return !0;
        },
        notEqual: function(e, t, n) {
            return void 0 === t ? null : !y.validators.equal(e, t, n);
        },
        minLength: function(e, t, n) {
            if ("number" === e.type) {
                if (e.validity.tooShort) return !1;
                if (e.validity.badInput) return null;
            }
            return n.length >= t;
        },
        maxLength: function(e, t, n) {
            if ("number" === e.type) {
                if (e.validity.tooLong) return !1;
                if (e.validity.badInput) return null;
            }
            return n.length <= t;
        },
        length: function(e, t, n) {
            if ("number" === e.type) {
                if (e.validity.tooShort || e.validity.tooLong) return !1;
                if (e.validity.badInput) return null;
            }
            return (null === (t = Array.isArray(t) ? t : [ t, t ])[0] || n.length >= t[0]) && (null === t[1] || n.length <= t[1]);
        },
        email: function(e, t, n) {
            return /^("([ !#-[\]-~]|\\[ -~])+"|[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*)@([0-9a-z\u00C0-\u02FF\u0370-\u1EFF]([-0-9a-z\u00C0-\u02FF\u0370-\u1EFF]{0,61}[0-9a-z\u00C0-\u02FF\u0370-\u1EFF])?\.)+[a-z\u00C0-\u02FF\u0370-\u1EFF]([-0-9a-z\u00C0-\u02FF\u0370-\u1EFF]{0,17}[a-z\u00C0-\u02FF\u0370-\u1EFF])?$/i.test(n);
        },
        url: function(e, t, n, r) {
            return /^[a-z\d+.-]+:/.test(n) || (n = "http://" + n), !!/^https?:\/\/((([-_0-9a-z\u00C0-\u02FF\u0370-\u1EFF]+\.)*[0-9a-z\u00C0-\u02FF\u0370-\u1EFF]([-0-9a-z\u00C0-\u02FF\u0370-\u1EFF]{0,61}[0-9a-z\u00C0-\u02FF\u0370-\u1EFF])?\.)?[a-z\u00C0-\u02FF\u0370-\u1EFF]([-0-9a-z\u00C0-\u02FF\u0370-\u1EFF]{0,17}[a-z\u00C0-\u02FF\u0370-\u1EFF])?|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\[[0-9a-f:]{3,39}\])(:\d{1,5})?(\/\S*)?$/i.test(n) && (r.value = n, 
            !0);
        },
        regexp: function(e, t, n) {
            var r = "string" == typeof t && t.match(/^\/(.*)\/([imu]*)$/);
            try {
                return r && new RegExp(r[1], r[2].replace("u", "")).test(n);
            } catch (e) {}
        },
        pattern: function(e, t, n, r, i) {
            if ("string" != typeof t) return null;
            try {
                try {
                    var o = new RegExp("^(?:" + t + ")$", i ? "ui" : "u");
                } catch (e) {
                    o = new RegExp("^(?:" + t + ")$", i ? "i" : "");
                }
                if (s.FileList && n instanceof FileList) {
                    for (var a = 0; a < n.length; a++) if (!o.test(n[a].name)) return !1;
                    return !0;
                }
                return o.test(n);
            } catch (e) {}
        },
        patternCaseInsensitive: function(e, t, n) {
            return y.validators.pattern(e, t, n, null, !0);
        },
        numeric: function(e, t, n) {
            return ("number" !== e.type || !e.validity.badInput) && /^[0-9]+$/.test(n);
        },
        integer: function(e, t, n) {
            return ("number" !== e.type || !e.validity.badInput) && /^-?[0-9]+$/.test(n);
        },
        float: function(e, t, n, r) {
            return ("number" !== e.type || !e.validity.badInput) && (n = n.replace(/ +/g, "").replace(/,/g, "."), 
            !!/^-?[0-9]*\.?[0-9]+$/.test(n) && (r.value = n, !0));
        },
        min: function(e, t, n) {
            if ("number" === e.type) {
                if (e.validity.rangeUnderflow) return !1;
                if (e.validity.badInput) return null;
            }
            return null === t || parseFloat(n) >= t;
        },
        max: function(e, t, n) {
            if ("number" === e.type) {
                if (e.validity.rangeOverflow) return !1;
                if (e.validity.badInput) return null;
            }
            return null === t || parseFloat(n) <= t;
        },
        range: function(e, t, n) {
            if ("number" === e.type) {
                if (e.validity.rangeUnderflow || e.validity.rangeOverflow) return !1;
                if (e.validity.badInput) return null;
            }
            return Array.isArray(t) ? (null === t[0] || parseFloat(n) >= t[0]) && (null === t[1] || parseFloat(n) <= t[1]) : null;
        },
        submitted: function(e) {
            return e.form["nette-submittedBy"] === e;
        },
        fileSize: function(e, t, n) {
            if (s.FileList) for (var r = 0; r < n.length; r++) if (n[r].size > t) return !1;
            return !0;
        },
        image: function(e, t, n) {
            if (s.FileList && n instanceof s.FileList) for (var r = 0; r < n.length; r++) {
                var i = n[r].type;
                if (i && "image/gif" !== i && "image/png" !== i && "image/jpeg" !== i) return !1;
            }
            return !0;
        },
        static: function(e, t) {
            return t;
        }
    }, y.toggleForm = function(e, t) {
        var n;
        for (b = {}, n = 0; n < e.elements.length; n++) e.elements[n].tagName.toLowerCase() in {
            input: 1,
            select: 1,
            textarea: 1,
            button: 1
        } && y.toggleControl(e.elements[n], null, null, !t);
        for (n in b) y.toggle(n, b[n], t);
    }, y.toggleControl = function(e, t, n, r, i) {
        t = t || JSON.parse(e.getAttribute("data-nette-rules") || "[]"), i = void 0 === i ? {
            value: y.getEffectiveValue(e)
        } : i;
        for (var o, a = !1, s = [], u = function() {
            y.toggleForm(e.form, e);
        }, l = 0, c = t.length; l < c; l++) {
            var f = t[l], d = f.op.match(/(~)?([^?]+)/), p = f.control ? e.form.elements.namedItem(f.control) : e;
            if (p) {
                if (!1 !== (o = n)) {
                    if (f.neg = d[1], f.op = d[2], null === (o = y.validateRule(p, f.op, f.arg, e === p ? i : void 0))) continue;
                    f.neg && (o = !o), f.rules || (n = o);
                }
                if (f.rules && y.toggleControl(e, f.rules, o, r, i) || f.toggle) {
                    if (a = !0, r) for (var h = p.tagName ? p.name : p[0].name, m = p.tagName ? p.form.elements : p, g = 0; g < m.length; g++) m[g].name === h && s.indexOf(m[g]) < 0 && (m[g].addEventListener("change", u), 
                    s.push(m[g]));
                    for (var v in f.toggle || []) Object.prototype.hasOwnProperty.call(f.toggle, v) && (b[v] = b[v] || (f.toggle[v] ? o : !o));
                }
            }
        }
        return a;
    }, y.toggle = function(e, t, n) {
        /^\w[\w.:-]*$/.test(e) && (e = "#" + e);
        for (var r = document.querySelectorAll(e), i = 0; i < r.length; i++) r[i].hidden = !t;
    }, y.initForm = function(t) {
        y.toggleForm(t), t.noValidate || (t.noValidate = !0, t.addEventListener("submit", function(e) {
            y.validateForm(t) || (e.stopPropagation(), e.preventDefault());
        }));
    }, y.initOnLoad = function() {
        y.onDocumentReady(function() {
            for (var e = 0; e < document.forms.length; e++) for (var t = document.forms[e], n = 0; n < t.elements.length; n++) if (t.elements[n].getAttribute("data-nette-rules")) {
                y.initForm(t);
                break;
            }
            document.body.addEventListener("click", function(e) {
                for (var t = e.target; t; ) {
                    if (t.form && t.type in {
                        submit: 1,
                        image: 1
                    }) {
                        t.form["nette-submittedBy"] = t;
                        break;
                    }
                    t = t.parentNode;
                }
            });
        });
    }, y.webalize = function(e) {
        e = e.toLowerCase();
        var t, n = "";
        for (t = 0; t < e.length; t++) n += y.webalizeTable[e.charAt(t)] || e.charAt(t);
        return n.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    }, y.webalizeTable = {
        "á": "a",
        "ä": "a",
        "č": "c",
        "ď": "d",
        "é": "e",
        "ě": "e",
        "í": "i",
        "ľ": "l",
        "ň": "n",
        "ó": "o",
        "ô": "o",
        "ř": "r",
        "š": "s",
        "ť": "t",
        "ú": "u",
        "ů": "u",
        "ý": "y",
        "ž": "z"
    }, y;
});

var viewportWidth, barcamp = barcamp || {};

barcamp.viewportWidth = function() {
    viewportWidth = Math.max($(window).width(), window.innerWidth);
}, barcamp.imageFailover = function() {
    $("img.failover").each(function() {
        function e(e) {
            e.src = "/img/logo-icon-96.png";
        }
        this.complete ? 0 === this.naturalHeight && e(this) : $(this).on("error", function() {
            e(this);
        });
    });
}, barcamp.openNav = function() {
    $(".btn-mobile-menu-open-container").click(function() {
        $(".header-nav").slideToggle(200), $(this).find(".btn-mobile-menu-open").toggleClass("active"), 
        $(this).find(".item-text").text(function(e, t) {
            return "Menu" === t ? "Zavřít" : "Menu";
        });
    });
}, barcamp.slider = function() {
    $(".hero-slider").slick({
        dots: !1,
        arrows: !1,
        infinite: !0,
        draggable: !1,
        fade: !0,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: !0,
        autoplay: !0,
        autoplaySpeed: 5e3
    });
}, barcamp.accordion = function() {
    $(".accordion-list .accordion-content").hide(), $(".accordion-heading").click(function() {
        $(this).parent().toggleClass("accordion-open").find(".accordion-content").slideToggle(200);
    });
}, barcamp.smoothScroll = function() {
    $(".scrollto").click(function(e) {
        var t = $(this).attr("href"), n = $(t);
        if (0 !== n.length) {
            e.preventDefault();
            var r = n.offset().top;
            $("body, html").animate({
                scrollTop: r
            }, 1e3);
        }
    });
}, barcamp.schedule = function() {
    var o = $("#schedule"), e = $("#schedule-scroll-point");
    if (o.length) {
        var i = barcamp.scheduleConfig;
        if (i) {
            function t() {
                return e.offset().top + e.outerHeight() - $(window).height() < $(this).scrollTop() && !o.hasClass("animate") && (o.addClass("animate"), 
                $(".schedule", o).addClass("animate"), !0);
            }
            function a(e, t) {
                e.css({
                    width: t[0] + "%",
                    height: t[1] + "%"
                });
            }
            var n = function() {
                t() && $(window).off("scroll", "", n);
            }, s = function(e) {
                if (0 !== e.length) {
                    var t = function() {
                        var e = new Date(i.dates.scheduleBegin).getTime(), t = new Date(i.dates.scheduleEnd).getTime(), n = new Date().getTime(), r = !1;
                        return [ e, t, n ].forEach(function(e) {
                            isNaN(e) && (r = !0);
                        }), r || t <= e || n < e ? 0 : t < n ? 1 : (n - e) / (t - e);
                    }(), n = l(e), r = [ n.min[0] + (n.max[0] - n.min[0]) * t, n.min[1] + (n.max[1] - n.min[1]) * t ];
                    a(e, r);
                }
            }, r = function(e) {
                if (0 !== e.length) {
                    var t = l(e);
                    a(e, t.empty);
                }
            }, u = function(e) {
                if (0 !== e.length) {
                    var t = l(e);
                    a(e, t.full);
                }
            }, l = function(e) {
                var t = e.data("visualLimits").split(";").map(parseFloat);
                return {
                    empty: [ t[0], t[1] ],
                    min: [ t[2], t[3] ],
                    max: [ t[4], t[5] ],
                    full: [ t[6], t[7] ]
                };
            };
            t() || $(window).on("scroll", "", n), $("li", o).removeClass("item-active item-done"), 
            $("div.progress", o).each(function() {
                var e = $(this);
                r(e), e.removeClass("active");
            }), i.steps.forEach(function(e) {
                var t = e.key, n = $('li[data-step-name="' + t + '"]', o), r = $("div.progress-before", n), i = $("div.progress-after", n);
                e.isCurrent && (n.addClass("item-active"), u(r), i.addClass("active"), s(i)), e.isDone && (n.addClass("item-done"), 
                u(r), u(i)), e.isNext && (r.addClass("active"), s(r));
            });
        } else console.warn && console.warn("Unable to config Schedule, no config available");
    }
}, barcamp.lectures = function() {
    var e, t = 0, n = 0;
    $(".js-lecture-control").click(function() {
        $(this).closest("li").hasClass("open") ? ($(this).parent().parent().parent().find(".show-full, .item-content-full").fadeOut(200, function() {
            $(this).parent().parent().find(".item-content-perex").fadeIn(200);
        }), $(this).parent().parent().parent().removeClass("open").animate({
            height: 110
        }, 200)) : ($(this).parent().parent().parent().find(".open").each(function() {
            $(this).find(".item-content-full, .show-full").fadeOut(200, function() {
                $(this).parent().find(".item-content-perex").fadeIn(200);
            }), $(this).removeClass("open").animate({
                height: 110
            }, 200);
        }), $(this).fadeOut(200, function() {
            $(this).parent().parent().find(".item-content-full, .show-full").fadeIn(200);
        }), $(this).parent().parent().find(".item-content-full").show(), t = $(this).parent().parent().find(".item-content-full").height(), 
        $(this).parent().parent().find(".item-content-full").hide(), e = $(this).parent().parent(), 
        n = 568 < viewportWidth ? 200 : 0, $(this).parent().parent().animate({
            height: t + 51
        }, 100, function() {
            setTimeout(function() {
                e.addClass("open");
            }, 200);
        }), setTimeout(function() {
            $("body, html").animate({
                scrollTop: e.offset().top - n
            }, 800);
        }, 500));
    });
}, barcamp.tabs = function() {
    $("#program").tabs();
}, barcamp.program = function() {
    var e, t = "";
    function n() {
        if (viewportWidth <= 768) {
            var e = $(".program-header"), t = $(".program");
            if (0 == e.length || 0 == t.length) return;
            var n = e.offset().top, r = t.offset().top, i = 0;
            $(window).scroll(function() {
                i = $(window).scrollTop() - r, $(window).scrollTop() >= n ? (e.hasClass("fixed") || e.addClass("fixed"), 
                e.css("top", i + "px")) : e.hasClass("fixed") && e.removeClass("fixed");
            });
        }
    }
    $(".js-program-filter input").change(function() {
        t = "", "*" == $(this).val() && $(this).is(":checked") ? $(".js-program-filter input:not(.check-all)").each(function() {
            $(this).prop("checked", !1);
        }) : "*" != $(this).val() && $(".js-program-filter input.check-all").prop("checked", !1), 
        $(".js-program-filter input:checked").each(function() {
            e = $(this).val(), t += "." + e + ",";
        }), "*" == e || "" == t ? ($(".js-program-filter input.check-all").prop("checked", !0), 
        t = "", $(this).parent().parent().parent().find(".program-item").removeClass("active inactive")) : ($(this).parent().parent().parent().find(".program-item").removeClass("active").addClass("inactive"), 
        $(this).parent().parent().parent().find(t.slice(0, -1)).removeClass("inactive").addClass("active"));
    }), n(), viewportWidth <= 768 && $(".program-container").scrollLeft(100), $(window).on("orientationchange", function() {
        n();
    }), $(window).on("resize", function() {
        n();
    });
}, barcamp.avatarUploader = function() {
    var e = $("#avatar-upload-button");
    if (0 !== e.length) {
        var t = $("#avatar-upload-input"), n = $("#avatar"), r = e.attr("href");
        e.click(function(e) {
            e.preventDefault(), t.click();
        }), t.change(function() {
            n.addClass("pulse");
            var e = this.files[0], t = new FormData();
            t.append("file", e), i(t);
        });
        var i = function(e) {
            $.ajax({
                url: r,
                method: "POST",
                data: e,
                contentType: !1,
                processData: !1,
                dataType: "json"
            }).done(function(e) {
                n.removeClass("pulse");
                var t = "url('" + e.avatarUrl + "')";
                n.css("background-image", t);
            }).fail(function(e) {
                n.removeClass("pulse"), alert("Tento obrázek není možné načíst, zkuste jej prosím zmenšit."), 
                console.log(e);
            });
        };
    }
}, barcamp.talkVote = function() {
    var e = $(".lectures-list,.talk-detail");
    0 !== e.length && e.on("click", ".vote-ajax", function(e) {
        e.preventDefault();
        var t = $(this);
        t.addClass("disabled");
        var n = t.closest(".item-vote-box"), r = t.attr("href"), i = !!n.closest(".talk-detail").length;
        dataLayer.push({
            event: "bck-talk-vote",
            action: i ? "vote-detail" : "vote-list",
            label: t.data("id"),
            value: "unvote" === t.data("dir") ? -1 : 1
        }), $.ajax({
            url: r,
            dataType: "json"
        }).done(function(e) {
            t.removeClass("disabled"), $(".item-count", n).text(e.votes), $(".is-voted,.is-not-voted", n).toggle();
        }).fail(function(e) {
            alert("Váš hlas se nepovedlo uložit. Omlouváme se. Zkuste to prosím znovu."), console.log(e);
        });
    });
}, barcamp.disabledLinks = function() {
    $("a.disabled").click(function(e) {
        e.preventDefault(), console.log("Clicked to disabled link");
    }), $('a[href^="https://example.com"]').click(function(e) {
        e.preventDefault(), console.log("Clicked to placeholder link"), alert("Omlouváme se, tato funkce ještě není dostupná");
    });
}, barcamp.netteInit = function() {
    $.nette.init();
}, barcamp.init = function() {
    barcamp.netteInit(), barcamp.imageFailover(), barcamp.viewportWidth(), barcamp.openNav(), 
    barcamp.slider(), barcamp.accordion(), barcamp.smoothScroll(), barcamp.schedule(), 
    barcamp.lectures(), barcamp.program(), barcamp.avatarUploader(), barcamp.talkVote(), 
    barcamp.disabledLinks();
}, $(document).ready(function() {
    barcamp.init(), $("body").removeClass("preload").removeClass("no-js");
}), $(window).on("orientationchange", function() {
    barcamp.viewportWidth();
}), $(window).on("resize", function() {
    barcamp.viewportWidth();
});