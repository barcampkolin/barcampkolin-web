!function(e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e);
    } : t(e);
}("undefined" != typeof window ? window : this, function(T, e) {
    "use strict";
    var t = [], S = T.document, i = Object.getPrototypeOf, a = t.slice, v = t.concat, l = t.push, o = t.indexOf, n = {}, r = n.toString, h = n.hasOwnProperty, s = h.toString, c = s.call(Object), g = {};
    function m(e, t) {
        var n = (t = t || S).createElement("script");
        n.text = e, t.head.appendChild(n).parentNode.removeChild(n);
    }
    var u = "3.1.1", C = function(e, t) {
        return new C.fn.init(e, t);
    }, d = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, p = /^-ms-/, f = /-([a-z])/g, y = function(e, t) {
        return t.toUpperCase();
    };
    function b(e) {
        var t = !!e && "length" in e && e.length, n = C.type(e);
        return "function" !== n && !C.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e);
    }
    C.fn = C.prototype = {
        jquery: u,
        constructor: C,
        length: 0,
        toArray: function() {
            return a.call(this);
        },
        get: function(e) {
            return null == e ? a.call(this) : e < 0 ? this[e + this.length] : this[e];
        },
        pushStack: function(e) {
            var t = C.merge(this.constructor(), e);
            return t.prevObject = this, t;
        },
        each: function(e) {
            return C.each(this, e);
        },
        map: function(n) {
            return this.pushStack(C.map(this, function(e, t) {
                return n.call(e, t, e);
            }));
        },
        slice: function() {
            return this.pushStack(a.apply(this, arguments));
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
        push: l,
        sort: t.sort,
        splice: t.splice
    }, C.extend = C.fn.extend = function() {
        var e, t, n, i, o, r, s = arguments[0] || {}, a = 1, l = arguments.length, c = !1;
        for ("boolean" == typeof s && (c = s, s = arguments[a] || {}, a++), "object" == typeof s || C.isFunction(s) || (s = {}), 
        a === l && (s = this, a--); a < l; a++) if (null != (e = arguments[a])) for (t in e) n = s[t], 
        s !== (i = e[t]) && (c && i && (C.isPlainObject(i) || (o = C.isArray(i))) ? (r = o ? (o = !1, 
        n && C.isArray(n) ? n : []) : n && C.isPlainObject(n) ? n : {}, s[t] = C.extend(c, r, i)) : void 0 !== i && (s[t] = i));
        return s;
    }, C.extend({
        expando: "jQuery" + (u + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e);
        },
        noop: function() {},
        isFunction: function(e) {
            return "function" === C.type(e);
        },
        isArray: Array.isArray,
        isWindow: function(e) {
            return null != e && e === e.window;
        },
        isNumeric: function(e) {
            var t = C.type(e);
            return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e));
        },
        isPlainObject: function(e) {
            var t, n;
            return !(!e || "[object Object]" !== r.call(e)) && (!(t = i(e)) || "function" == typeof (n = h.call(t, "constructor") && t.constructor) && s.call(n) === c);
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0;
        },
        type: function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? n[r.call(e)] || "object" : typeof e;
        },
        globalEval: function(e) {
            m(e);
        },
        camelCase: function(e) {
            return e.replace(p, "ms-").replace(f, y);
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
        },
        each: function(e, t) {
            var n, i = 0;
            if (b(e)) for (n = e.length; i < n && !1 !== t.call(e[i], i, e[i]); i++) ; else for (i in e) if (!1 === t.call(e[i], i, e[i])) break;
            return e;
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(d, "");
        },
        makeArray: function(e, t) {
            var n = t || [];
            return null != e && (b(Object(e)) ? C.merge(n, "string" == typeof e ? [ e ] : e) : l.call(n, e)), 
            n;
        },
        inArray: function(e, t, n) {
            return null == t ? -1 : o.call(t, e, n);
        },
        merge: function(e, t) {
            for (var n = +t.length, i = 0, o = e.length; i < n; i++) e[o++] = t[i];
            return e.length = o, e;
        },
        grep: function(e, t, n) {
            for (var i = [], o = 0, r = e.length, s = !n; o < r; o++) !t(e[o], o) !== s && i.push(e[o]);
            return i;
        },
        map: function(e, t, n) {
            var i, o, r = 0, s = [];
            if (b(e)) for (i = e.length; r < i; r++) null != (o = t(e[r], r, n)) && s.push(o); else for (r in e) null != (o = t(e[r], r, n)) && s.push(o);
            return v.apply([], s);
        },
        guid: 1,
        proxy: function(e, t) {
            var n, i, o;
            if ("string" == typeof t && (n = e[t], t = e, e = n), C.isFunction(e)) return i = a.call(arguments, 2), 
            (o = function() {
                return e.apply(t || this, i.concat(a.call(arguments)));
            }).guid = e.guid = e.guid || C.guid++, o;
        },
        now: Date.now,
        support: g
    }), "function" == typeof Symbol && (C.fn[Symbol.iterator] = t[Symbol.iterator]), 
    C.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
        n["[object " + t + "]"] = t.toLowerCase();
    });
    var w = function(n) {
        var e, f, w, r, o, h, d, v, x, l, c, k, T, s, S, g, a, u, m, C = "sizzle" + 1 * new Date(), y = n.document, $ = 0, i = 0, p = se(), b = se(), N = se(), E = function(e, t) {
            return e === t && (c = !0), 0;
        }, A = {}.hasOwnProperty, t = [], j = t.pop, D = t.push, F = t.push, L = t.slice, O = function(e, t) {
            for (var n = 0, i = e.length; n < i; n++) if (e[n] === t) return n;
            return -1;
        }, H = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", P = "[\\x20\\t\\r\\n\\f]", q = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+", z = "\\[" + P + "*(" + q + ")(?:" + P + "*([*^$|!~]?=)" + P + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + q + "))|)" + P + "*\\]", M = ":(" + q + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + z + ")*)|.*)\\)|)", I = new RegExp(P + "+", "g"), W = new RegExp("^" + P + "+|((?:^|[^\\\\])(?:\\\\.)*)" + P + "+$", "g"), R = new RegExp("^" + P + "*," + P + "*"), B = new RegExp("^" + P + "*([>+~]|" + P + ")" + P + "*"), U = new RegExp("=" + P + "*([^\\]'\"]*?)" + P + "*\\]", "g"), X = new RegExp(M), _ = new RegExp("^" + q + "$"), V = {
            ID: new RegExp("^#(" + q + ")"),
            CLASS: new RegExp("^\\.(" + q + ")"),
            TAG: new RegExp("^(" + q + "|[*])"),
            ATTR: new RegExp("^" + z),
            PSEUDO: new RegExp("^" + M),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + P + "*(even|odd|(([+-]|)(\\d*)n|)" + P + "*(?:([+-]|)" + P + "*(\\d+)|))" + P + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + H + ")$", "i"),
            needsContext: new RegExp("^" + P + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + P + "*((?:-\\d)?\\d*)" + P + "*\\)|)(?=[^-]|$)", "i")
        }, Y = /^(?:input|select|textarea|button)$/i, Q = /^h\d$/i, G = /^[^{]+\{\s*\[native \w/, J = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, K = /[+~]/, Z = new RegExp("\\\\([\\da-f]{1,6}" + P + "?|(" + P + ")|.)", "ig"), ee = function(e, t, n) {
            var i = "0x" + t - 65536;
            return i != i || n ? t : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320);
        }, te = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, ne = function(e, t) {
            return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e;
        }, ie = function() {
            k();
        }, oe = ye(function(e) {
            return !0 === e.disabled && ("form" in e || "label" in e);
        }, {
            dir: "parentNode",
            next: "legend"
        });
        try {
            F.apply(t = L.call(y.childNodes), y.childNodes), t[y.childNodes.length].nodeType;
        } catch (e) {
            F = {
                apply: t.length ? function(e, t) {
                    D.apply(e, L.call(t));
                } : function(e, t) {
                    for (var n = e.length, i = 0; e[n++] = t[i++]; ) ;
                    e.length = n - 1;
                }
            };
        }
        function re(e, t, n, i) {
            var o, r, s, a, l, c, u, d = t && t.ownerDocument, p = t ? t.nodeType : 9;
            if (n = n || [], "string" != typeof e || !e || 1 !== p && 9 !== p && 11 !== p) return n;
            if (!i && ((t ? t.ownerDocument || t : y) !== T && k(t), t = t || T, S)) {
                if (11 !== p && (l = J.exec(e))) if (o = l[1]) {
                    if (9 === p) {
                        if (!(s = t.getElementById(o))) return n;
                        if (s.id === o) return n.push(s), n;
                    } else if (d && (s = d.getElementById(o)) && m(t, s) && s.id === o) return n.push(s), 
                    n;
                } else {
                    if (l[2]) return F.apply(n, t.getElementsByTagName(e)), n;
                    if ((o = l[3]) && f.getElementsByClassName && t.getElementsByClassName) return F.apply(n, t.getElementsByClassName(o)), 
                    n;
                }
                if (f.qsa && !N[e + " "] && (!g || !g.test(e))) {
                    if (1 !== p) d = t, u = e; else if ("object" !== t.nodeName.toLowerCase()) {
                        for ((a = t.getAttribute("id")) ? a = a.replace(te, ne) : t.setAttribute("id", a = C), 
                        r = (c = h(e)).length; r--; ) c[r] = "#" + a + " " + me(c[r]);
                        u = c.join(","), d = K.test(e) && ve(t.parentNode) || t;
                    }
                    if (u) try {
                        return F.apply(n, d.querySelectorAll(u)), n;
                    } catch (e) {} finally {
                        a === C && t.removeAttribute("id");
                    }
                }
            }
            return v(e.replace(W, "$1"), t, n, i);
        }
        function se() {
            var i = [];
            return function e(t, n) {
                return i.push(t + " ") > w.cacheLength && delete e[i.shift()], e[t + " "] = n;
            };
        }
        function ae(e) {
            return e[C] = !0, e;
        }
        function le(e) {
            var t = T.createElement("fieldset");
            try {
                return !!e(t);
            } catch (e) {
                return !1;
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null;
            }
        }
        function ce(e, t) {
            for (var n = e.split("|"), i = n.length; i--; ) w.attrHandle[n[i]] = t;
        }
        function ue(e, t) {
            var n = t && e, i = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
            if (i) return i;
            if (n) for (;n = n.nextSibling; ) if (n === t) return -1;
            return e ? 1 : -1;
        }
        function de(t) {
            return function(e) {
                return "input" === e.nodeName.toLowerCase() && e.type === t;
            };
        }
        function pe(n) {
            return function(e) {
                var t = e.nodeName.toLowerCase();
                return ("input" === t || "button" === t) && e.type === n;
            };
        }
        function fe(t) {
            return function(e) {
                return "form" in e ? e.parentNode && !1 === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && oe(e) === t : e.disabled === t : "label" in e && e.disabled === t;
            };
        }
        function he(s) {
            return ae(function(r) {
                return r = +r, ae(function(e, t) {
                    for (var n, i = s([], e.length, r), o = i.length; o--; ) e[n = i[o]] && (e[n] = !(t[n] = e[n]));
                });
            });
        }
        function ve(e) {
            return e && void 0 !== e.getElementsByTagName && e;
        }
        for (e in f = re.support = {}, o = re.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return !!t && "HTML" !== t.nodeName;
        }, k = re.setDocument = function(e) {
            var t, n, i = e ? e.ownerDocument || e : y;
            return i !== T && 9 === i.nodeType && i.documentElement && (s = (T = i).documentElement, 
            S = !o(T), y !== T && (n = T.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", ie, !1) : n.attachEvent && n.attachEvent("onunload", ie)), 
            f.attributes = le(function(e) {
                return e.className = "i", !e.getAttribute("className");
            }), f.getElementsByTagName = le(function(e) {
                return e.appendChild(T.createComment("")), !e.getElementsByTagName("*").length;
            }), f.getElementsByClassName = G.test(T.getElementsByClassName), f.getById = le(function(e) {
                return s.appendChild(e).id = C, !T.getElementsByName || !T.getElementsByName(C).length;
            }), f.getById ? (w.filter.ID = function(e) {
                var t = e.replace(Z, ee);
                return function(e) {
                    return e.getAttribute("id") === t;
                };
            }, w.find.ID = function(e, t) {
                if (void 0 !== t.getElementById && S) {
                    var n = t.getElementById(e);
                    return n ? [ n ] : [];
                }
            }) : (w.filter.ID = function(e) {
                var n = e.replace(Z, ee);
                return function(e) {
                    var t = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                    return t && t.value === n;
                };
            }, w.find.ID = function(e, t) {
                if (void 0 !== t.getElementById && S) {
                    var n, i, o, r = t.getElementById(e);
                    if (r) {
                        if ((n = r.getAttributeNode("id")) && n.value === e) return [ r ];
                        for (o = t.getElementsByName(e), i = 0; r = o[i++]; ) if ((n = r.getAttributeNode("id")) && n.value === e) return [ r ];
                    }
                    return [];
                }
            }), w.find.TAG = f.getElementsByTagName ? function(e, t) {
                return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : f.qsa ? t.querySelectorAll(e) : void 0;
            } : function(e, t) {
                var n, i = [], o = 0, r = t.getElementsByTagName(e);
                if ("*" !== e) return r;
                for (;n = r[o++]; ) 1 === n.nodeType && i.push(n);
                return i;
            }, w.find.CLASS = f.getElementsByClassName && function(e, t) {
                if (void 0 !== t.getElementsByClassName && S) return t.getElementsByClassName(e);
            }, a = [], g = [], (f.qsa = G.test(T.querySelectorAll)) && (le(function(e) {
                s.appendChild(e).innerHTML = "<a id='" + C + "'></a><select id='" + C + "-\r\\' msallowcapture=''><option selected=''></option></select>", 
                e.querySelectorAll("[msallowcapture^='']").length && g.push("[*^$]=" + P + "*(?:''|\"\")"), 
                e.querySelectorAll("[selected]").length || g.push("\\[" + P + "*(?:value|" + H + ")"), 
                e.querySelectorAll("[id~=" + C + "-]").length || g.push("~="), e.querySelectorAll(":checked").length || g.push(":checked"), 
                e.querySelectorAll("a#" + C + "+*").length || g.push(".#.+[+~]");
            }), le(function(e) {
                e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var t = T.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && g.push("name" + P + "*[*^$|!~]?="), 
                2 !== e.querySelectorAll(":enabled").length && g.push(":enabled", ":disabled"), 
                s.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && g.push(":enabled", ":disabled"), 
                e.querySelectorAll("*,:x"), g.push(",.*:");
            })), (f.matchesSelector = G.test(u = s.matches || s.webkitMatchesSelector || s.mozMatchesSelector || s.oMatchesSelector || s.msMatchesSelector)) && le(function(e) {
                f.disconnectedMatch = u.call(e, "*"), u.call(e, "[s!='']:x"), a.push("!=", M);
            }), g = g.length && new RegExp(g.join("|")), a = a.length && new RegExp(a.join("|")), 
            t = G.test(s.compareDocumentPosition), m = t || G.test(s.contains) ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e, i = t && t.parentNode;
                return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)));
            } : function(e, t) {
                if (t) for (;t = t.parentNode; ) if (t === e) return !0;
                return !1;
            }, E = t ? function(e, t) {
                if (e === t) return c = !0, 0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n || (1 & (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !f.sortDetached && t.compareDocumentPosition(e) === n ? e === T || e.ownerDocument === y && m(y, e) ? -1 : t === T || t.ownerDocument === y && m(y, t) ? 1 : l ? O(l, e) - O(l, t) : 0 : 4 & n ? -1 : 1);
            } : function(e, t) {
                if (e === t) return c = !0, 0;
                var n, i = 0, o = e.parentNode, r = t.parentNode, s = [ e ], a = [ t ];
                if (!o || !r) return e === T ? -1 : t === T ? 1 : o ? -1 : r ? 1 : l ? O(l, e) - O(l, t) : 0;
                if (o === r) return ue(e, t);
                for (n = e; n = n.parentNode; ) s.unshift(n);
                for (n = t; n = n.parentNode; ) a.unshift(n);
                for (;s[i] === a[i]; ) i++;
                return i ? ue(s[i], a[i]) : s[i] === y ? -1 : a[i] === y ? 1 : 0;
            }), T;
        }, re.matches = function(e, t) {
            return re(e, null, null, t);
        }, re.matchesSelector = function(e, t) {
            if ((e.ownerDocument || e) !== T && k(e), t = t.replace(U, "='$1']"), f.matchesSelector && S && !N[t + " "] && (!a || !a.test(t)) && (!g || !g.test(t))) try {
                var n = u.call(e, t);
                if (n || f.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n;
            } catch (e) {}
            return 0 < re(t, T, null, [ e ]).length;
        }, re.contains = function(e, t) {
            return (e.ownerDocument || e) !== T && k(e), m(e, t);
        }, re.attr = function(e, t) {
            (e.ownerDocument || e) !== T && k(e);
            var n = w.attrHandle[t.toLowerCase()], i = n && A.call(w.attrHandle, t.toLowerCase()) ? n(e, t, !S) : void 0;
            return void 0 !== i ? i : f.attributes || !S ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null;
        }, re.escape = function(e) {
            return (e + "").replace(te, ne);
        }, re.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e);
        }, re.uniqueSort = function(e) {
            var t, n = [], i = 0, o = 0;
            if (c = !f.detectDuplicates, l = !f.sortStable && e.slice(0), e.sort(E), c) {
                for (;t = e[o++]; ) t === e[o] && (i = n.push(o));
                for (;i--; ) e.splice(n[i], 1);
            }
            return l = null, e;
        }, r = re.getText = function(e) {
            var t, n = "", i = 0, o = e.nodeType;
            if (o) {
                if (1 === o || 9 === o || 11 === o) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += r(e);
                } else if (3 === o || 4 === o) return e.nodeValue;
            } else for (;t = e[i++]; ) n += r(t);
            return n;
        }, (w = re.selectors = {
            cacheLength: 50,
            createPseudo: ae,
            match: V,
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
                    return e[1] = e[1].replace(Z, ee), e[3] = (e[3] || e[4] || e[5] || "").replace(Z, ee), 
                    "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || re.error(e[0]), 
                    e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && re.error(e[0]), 
                    e;
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return V.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && X.test(n) && (t = h(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), 
                    e[2] = n.slice(0, t)), e.slice(0, 3));
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(Z, ee).toLowerCase();
                    return "*" === e ? function() {
                        return !0;
                    } : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t;
                    };
                },
                CLASS: function(e) {
                    var t = p[e + " "];
                    return t || (t = new RegExp("(^|" + P + ")" + e + "(" + P + "|$)")) && p(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "");
                    });
                },
                ATTR: function(n, i, o) {
                    return function(e) {
                        var t = re.attr(e, n);
                        return null == t ? "!=" === i : !i || (t += "", "=" === i ? t === o : "!=" === i ? t !== o : "^=" === i ? o && 0 === t.indexOf(o) : "*=" === i ? o && -1 < t.indexOf(o) : "$=" === i ? o && t.slice(-o.length) === o : "~=" === i ? -1 < (" " + t.replace(I, " ") + " ").indexOf(o) : "|=" === i && (t === o || t.slice(0, o.length + 1) === o + "-"));
                    };
                },
                CHILD: function(h, e, t, v, g) {
                    var m = "nth" !== h.slice(0, 3), y = "last" !== h.slice(-4), b = "of-type" === e;
                    return 1 === v && 0 === g ? function(e) {
                        return !!e.parentNode;
                    } : function(e, t, n) {
                        var i, o, r, s, a, l, c = m !== y ? "nextSibling" : "previousSibling", u = e.parentNode, d = b && e.nodeName.toLowerCase(), p = !n && !b, f = !1;
                        if (u) {
                            if (m) {
                                for (;c; ) {
                                    for (s = e; s = s[c]; ) if (b ? s.nodeName.toLowerCase() === d : 1 === s.nodeType) return !1;
                                    l = c = "only" === h && !l && "nextSibling";
                                }
                                return !0;
                            }
                            if (l = [ y ? u.firstChild : u.lastChild ], y && p) {
                                for (f = (a = (i = (o = (r = (s = u)[C] || (s[C] = {}))[s.uniqueID] || (r[s.uniqueID] = {}))[h] || [])[0] === $ && i[1]) && i[2], 
                                s = a && u.childNodes[a]; s = ++a && s && s[c] || (f = a = 0) || l.pop(); ) if (1 === s.nodeType && ++f && s === e) {
                                    o[h] = [ $, a, f ];
                                    break;
                                }
                            } else if (p && (f = a = (i = (o = (r = (s = e)[C] || (s[C] = {}))[s.uniqueID] || (r[s.uniqueID] = {}))[h] || [])[0] === $ && i[1]), 
                            !1 === f) for (;(s = ++a && s && s[c] || (f = a = 0) || l.pop()) && ((b ? s.nodeName.toLowerCase() !== d : 1 !== s.nodeType) || !++f || (p && ((o = (r = s[C] || (s[C] = {}))[s.uniqueID] || (r[s.uniqueID] = {}))[h] = [ $, f ]), 
                            s !== e)); ) ;
                            return (f -= g) === v || f % v == 0 && 0 <= f / v;
                        }
                    };
                },
                PSEUDO: function(e, r) {
                    var t, s = w.pseudos[e] || w.setFilters[e.toLowerCase()] || re.error("unsupported pseudo: " + e);
                    return s[C] ? s(r) : 1 < s.length ? (t = [ e, e, "", r ], w.setFilters.hasOwnProperty(e.toLowerCase()) ? ae(function(e, t) {
                        for (var n, i = s(e, r), o = i.length; o--; ) e[n = O(e, i[o])] = !(t[n] = i[o]);
                    }) : function(e) {
                        return s(e, 0, t);
                    }) : s;
                }
            },
            pseudos: {
                not: ae(function(e) {
                    var i = [], o = [], a = d(e.replace(W, "$1"));
                    return a[C] ? ae(function(e, t, n, i) {
                        for (var o, r = a(e, null, i, []), s = e.length; s--; ) (o = r[s]) && (e[s] = !(t[s] = o));
                    }) : function(e, t, n) {
                        return i[0] = e, a(i, null, n, o), i[0] = null, !o.pop();
                    };
                }),
                has: ae(function(t) {
                    return function(e) {
                        return 0 < re(t, e).length;
                    };
                }),
                contains: ae(function(t) {
                    return t = t.replace(Z, ee), function(e) {
                        return -1 < (e.textContent || e.innerText || r(e)).indexOf(t);
                    };
                }),
                lang: ae(function(n) {
                    return _.test(n || "") || re.error("unsupported lang: " + n), n = n.replace(Z, ee).toLowerCase(), 
                    function(e) {
                        var t;
                        do {
                            if (t = S ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-");
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
                enabled: fe(!1),
                disabled: fe(!0),
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
                    return !w.pseudos.empty(e);
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
                    for (var i = n < 0 ? n + t : n; 0 <= --i; ) e.push(i);
                    return e;
                }),
                gt: he(function(e, t, n) {
                    for (var i = n < 0 ? n + t : n; ++i < t; ) e.push(i);
                    return e;
                })
            }
        }).pseudos.nth = w.pseudos.eq, {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) w.pseudos[e] = de(e);
        for (e in {
            submit: !0,
            reset: !0
        }) w.pseudos[e] = pe(e);
        function ge() {}
        function me(e) {
            for (var t = 0, n = e.length, i = ""; t < n; t++) i += e[t].value;
            return i;
        }
        function ye(a, e, t) {
            var l = e.dir, c = e.next, u = c || l, d = t && "parentNode" === u, p = i++;
            return e.first ? function(e, t, n) {
                for (;e = e[l]; ) if (1 === e.nodeType || d) return a(e, t, n);
                return !1;
            } : function(e, t, n) {
                var i, o, r, s = [ $, p ];
                if (n) {
                    for (;e = e[l]; ) if ((1 === e.nodeType || d) && a(e, t, n)) return !0;
                } else for (;e = e[l]; ) if (1 === e.nodeType || d) if (o = (r = e[C] || (e[C] = {}))[e.uniqueID] || (r[e.uniqueID] = {}), 
                c && c === e.nodeName.toLowerCase()) e = e[l] || e; else {
                    if ((i = o[u]) && i[0] === $ && i[1] === p) return s[2] = i[2];
                    if ((o[u] = s)[2] = a(e, t, n)) return !0;
                }
                return !1;
            };
        }
        function be(o) {
            return 1 < o.length ? function(e, t, n) {
                for (var i = o.length; i--; ) if (!o[i](e, t, n)) return !1;
                return !0;
            } : o[0];
        }
        function we(e, t, n, i, o) {
            for (var r, s = [], a = 0, l = e.length, c = null != t; a < l; a++) (r = e[a]) && (n && !n(r, i, o) || (s.push(r), 
            c && t.push(a)));
            return s;
        }
        function xe(f, h, v, g, m, e) {
            return g && !g[C] && (g = xe(g)), m && !m[C] && (m = xe(m, e)), ae(function(e, t, n, i) {
                var o, r, s, a = [], l = [], c = t.length, u = e || function(e, t, n) {
                    for (var i = 0, o = t.length; i < o; i++) re(e, t[i], n);
                    return n;
                }(h || "*", n.nodeType ? [ n ] : n, []), d = !f || !e && h ? u : we(u, a, f, n, i), p = v ? m || (e ? f : c || g) ? [] : t : d;
                if (v && v(d, p, n, i), g) for (o = we(p, l), g(o, [], n, i), r = o.length; r--; ) (s = o[r]) && (p[l[r]] = !(d[l[r]] = s));
                if (e) {
                    if (m || f) {
                        if (m) {
                            for (o = [], r = p.length; r--; ) (s = p[r]) && o.push(d[r] = s);
                            m(null, p = [], o, i);
                        }
                        for (r = p.length; r--; ) (s = p[r]) && -1 < (o = m ? O(e, s) : a[r]) && (e[o] = !(t[o] = s));
                    }
                } else p = we(p === t ? p.splice(c, p.length) : p), m ? m(null, t, p, i) : F.apply(t, p);
            });
        }
        function ke(e) {
            for (var o, t, n, i = e.length, r = w.relative[e[0].type], s = r || w.relative[" "], a = r ? 1 : 0, l = ye(function(e) {
                return e === o;
            }, s, !0), c = ye(function(e) {
                return -1 < O(o, e);
            }, s, !0), u = [ function(e, t, n) {
                var i = !r && (n || t !== x) || ((o = t).nodeType ? l(e, t, n) : c(e, t, n));
                return o = null, i;
            } ]; a < i; a++) if (t = w.relative[e[a].type]) u = [ ye(be(u), t) ]; else {
                if ((t = w.filter[e[a].type].apply(null, e[a].matches))[C]) {
                    for (n = ++a; n < i && !w.relative[e[n].type]; n++) ;
                    return xe(1 < a && be(u), 1 < a && me(e.slice(0, a - 1).concat({
                        value: " " === e[a - 2].type ? "*" : ""
                    })).replace(W, "$1"), t, a < n && ke(e.slice(a, n)), n < i && ke(e = e.slice(n)), n < i && me(e));
                }
                u.push(t);
            }
            return be(u);
        }
        return ge.prototype = w.filters = w.pseudos, w.setFilters = new ge(), h = re.tokenize = function(e, t) {
            var n, i, o, r, s, a, l, c = b[e + " "];
            if (c) return t ? 0 : c.slice(0);
            for (s = e, a = [], l = w.preFilter; s; ) {
                for (r in n && !(i = R.exec(s)) || (i && (s = s.slice(i[0].length) || s), a.push(o = [])), 
                n = !1, (i = B.exec(s)) && (n = i.shift(), o.push({
                    value: n,
                    type: i[0].replace(W, " ")
                }), s = s.slice(n.length)), w.filter) !(i = V[r].exec(s)) || l[r] && !(i = l[r](i)) || (n = i.shift(), 
                o.push({
                    value: n,
                    type: r,
                    matches: i
                }), s = s.slice(n.length));
                if (!n) break;
            }
            return t ? s.length : s ? re.error(e) : b(e, a).slice(0);
        }, d = re.compile = function(e, t) {
            var n, g, m, y, b, i, o = [], r = [], s = N[e + " "];
            if (!s) {
                for (t || (t = h(e)), n = t.length; n--; ) (s = ke(t[n]))[C] ? o.push(s) : r.push(s);
                (s = N(e, (g = r, y = 0 < (m = o).length, b = 0 < g.length, i = function(e, t, n, i, o) {
                    var r, s, a, l = 0, c = "0", u = e && [], d = [], p = x, f = e || b && w.find.TAG("*", o), h = $ += null == p ? 1 : Math.random() || .1, v = f.length;
                    for (o && (x = t === T || t || o); c !== v && null != (r = f[c]); c++) {
                        if (b && r) {
                            for (s = 0, t || r.ownerDocument === T || (k(r), n = !S); a = g[s++]; ) if (a(r, t || T, n)) {
                                i.push(r);
                                break;
                            }
                            o && ($ = h);
                        }
                        y && ((r = !a && r) && l--, e && u.push(r));
                    }
                    if (l += c, y && c !== l) {
                        for (s = 0; a = m[s++]; ) a(u, d, t, n);
                        if (e) {
                            if (0 < l) for (;c--; ) u[c] || d[c] || (d[c] = j.call(i));
                            d = we(d);
                        }
                        F.apply(i, d), o && !e && 0 < d.length && 1 < l + m.length && re.uniqueSort(i);
                    }
                    return o && ($ = h, x = p), u;
                }, y ? ae(i) : i))).selector = e;
            }
            return s;
        }, v = re.select = function(e, t, n, i) {
            var o, r, s, a, l, c = "function" == typeof e && e, u = !i && h(e = c.selector || e);
            if (n = n || [], 1 === u.length) {
                if (2 < (r = u[0] = u[0].slice(0)).length && "ID" === (s = r[0]).type && 9 === t.nodeType && S && w.relative[r[1].type]) {
                    if (!(t = (w.find.ID(s.matches[0].replace(Z, ee), t) || [])[0])) return n;
                    c && (t = t.parentNode), e = e.slice(r.shift().value.length);
                }
                for (o = V.needsContext.test(e) ? 0 : r.length; o-- && (s = r[o], !w.relative[a = s.type]); ) if ((l = w.find[a]) && (i = l(s.matches[0].replace(Z, ee), K.test(r[0].type) && ve(t.parentNode) || t))) {
                    if (r.splice(o, 1), !(e = i.length && me(r))) return F.apply(n, i), n;
                    break;
                }
            }
            return (c || d(e, u))(i, t, !S, n, !t || K.test(e) && ve(t.parentNode) || t), n;
        }, f.sortStable = C.split("").sort(E).join("") === C, f.detectDuplicates = !!c, 
        k(), f.sortDetached = le(function(e) {
            return 1 & e.compareDocumentPosition(T.createElement("fieldset"));
        }), le(function(e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href");
        }) || ce("type|href|height|width", function(e, t, n) {
            if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
        }), f.attributes && le(function(e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
        }) || ce("value", function(e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue;
        }), le(function(e) {
            return null == e.getAttribute("disabled");
        }) || ce(H, function(e, t, n) {
            var i;
            if (!n) return !0 === e[t] ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null;
        }), re;
    }(T);
    C.find = w, C.expr = w.selectors, C.expr[":"] = C.expr.pseudos, C.uniqueSort = C.unique = w.uniqueSort, 
    C.text = w.getText, C.isXMLDoc = w.isXML, C.contains = w.contains, C.escapeSelector = w.escape;
    var x = function(e, t, n) {
        for (var i = [], o = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; ) if (1 === e.nodeType) {
            if (o && C(e).is(n)) break;
            i.push(e);
        }
        return i;
    }, k = function(e, t) {
        for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
        return n;
    }, $ = C.expr.match.needsContext, N = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i, E = /^.[^:#\[\.,]*$/;
    function A(e, n, i) {
        return C.isFunction(n) ? C.grep(e, function(e, t) {
            return !!n.call(e, t, e) !== i;
        }) : n.nodeType ? C.grep(e, function(e) {
            return e === n !== i;
        }) : "string" != typeof n ? C.grep(e, function(e) {
            return -1 < o.call(n, e) !== i;
        }) : E.test(n) ? C.filter(n, e, i) : (n = C.filter(n, e), C.grep(e, function(e) {
            return -1 < o.call(n, e) !== i && 1 === e.nodeType;
        }));
    }
    C.filter = function(e, t, n) {
        var i = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? C.find.matchesSelector(i, e) ? [ i ] : [] : C.find.matches(e, C.grep(t, function(e) {
            return 1 === e.nodeType;
        }));
    }, C.fn.extend({
        find: function(e) {
            var t, n, i = this.length, o = this;
            if ("string" != typeof e) return this.pushStack(C(e).filter(function() {
                for (t = 0; t < i; t++) if (C.contains(o[t], this)) return !0;
            }));
            for (n = this.pushStack([]), t = 0; t < i; t++) C.find(e, o[t], n);
            return 1 < i ? C.uniqueSort(n) : n;
        },
        filter: function(e) {
            return this.pushStack(A(this, e || [], !1));
        },
        not: function(e) {
            return this.pushStack(A(this, e || [], !0));
        },
        is: function(e) {
            return !!A(this, "string" == typeof e && $.test(e) ? C(e) : e || [], !1).length;
        }
    });
    var j, D = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (C.fn.init = function(e, t, n) {
        var i, o;
        if (!e) return this;
        if (n = n || j, "string" != typeof e) return e.nodeType ? (this[0] = e, this.length = 1, 
        this) : C.isFunction(e) ? void 0 !== n.ready ? n.ready(e) : e(C) : C.makeArray(e, this);
        if (!(i = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [ null, e, null ] : D.exec(e)) || !i[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
        if (i[1]) {
            if (t = t instanceof C ? t[0] : t, C.merge(this, C.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : S, !0)), 
            N.test(i[1]) && C.isPlainObject(t)) for (i in t) C.isFunction(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
            return this;
        }
        return (o = S.getElementById(i[2])) && (this[0] = o, this.length = 1), this;
    }).prototype = C.fn, j = C(S);
    var F = /^(?:parents|prev(?:Until|All))/, L = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    function O(e, t) {
        for (;(e = e[t]) && 1 !== e.nodeType; ) ;
        return e;
    }
    C.fn.extend({
        has: function(e) {
            var t = C(e, this), n = t.length;
            return this.filter(function() {
                for (var e = 0; e < n; e++) if (C.contains(this, t[e])) return !0;
            });
        },
        closest: function(e, t) {
            var n, i = 0, o = this.length, r = [], s = "string" != typeof e && C(e);
            if (!$.test(e)) for (;i < o; i++) for (n = this[i]; n && n !== t; n = n.parentNode) if (n.nodeType < 11 && (s ? -1 < s.index(n) : 1 === n.nodeType && C.find.matchesSelector(n, e))) {
                r.push(n);
                break;
            }
            return this.pushStack(1 < r.length ? C.uniqueSort(r) : r);
        },
        index: function(e) {
            return e ? "string" == typeof e ? o.call(C(e), this[0]) : o.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function(e, t) {
            return this.pushStack(C.uniqueSort(C.merge(this.get(), C(e, t))));
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
        }
    }), C.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null;
        },
        parents: function(e) {
            return x(e, "parentNode");
        },
        parentsUntil: function(e, t, n) {
            return x(e, "parentNode", n);
        },
        next: function(e) {
            return O(e, "nextSibling");
        },
        prev: function(e) {
            return O(e, "previousSibling");
        },
        nextAll: function(e) {
            return x(e, "nextSibling");
        },
        prevAll: function(e) {
            return x(e, "previousSibling");
        },
        nextUntil: function(e, t, n) {
            return x(e, "nextSibling", n);
        },
        prevUntil: function(e, t, n) {
            return x(e, "previousSibling", n);
        },
        siblings: function(e) {
            return k((e.parentNode || {}).firstChild, e);
        },
        children: function(e) {
            return k(e.firstChild);
        },
        contents: function(e) {
            return e.contentDocument || C.merge([], e.childNodes);
        }
    }, function(i, o) {
        C.fn[i] = function(e, t) {
            var n = C.map(this, o, e);
            return "Until" !== i.slice(-5) && (t = e), t && "string" == typeof t && (n = C.filter(t, n)), 
            1 < this.length && (L[i] || C.uniqueSort(n), F.test(i) && n.reverse()), this.pushStack(n);
        };
    });
    var H = /[^\x20\t\r\n\f]+/g;
    function P(e) {
        return e;
    }
    function q(e) {
        throw e;
    }
    function z(e, t, n) {
        var i;
        try {
            e && C.isFunction(i = e.promise) ? i.call(e).done(t).fail(n) : e && C.isFunction(i = e.then) ? i.call(e, t, n) : t.call(void 0, e);
        } catch (e) {
            n.call(void 0, e);
        }
    }
    C.Callbacks = function(i) {
        var e, n;
        i = "string" == typeof i ? (e = i, n = {}, C.each(e.match(H) || [], function(e, t) {
            n[t] = !0;
        }), n) : C.extend({}, i);
        var o, t, r, s, a = [], l = [], c = -1, u = function() {
            for (s = i.once, r = o = !0; l.length; c = -1) for (t = l.shift(); ++c < a.length; ) !1 === a[c].apply(t[0], t[1]) && i.stopOnFalse && (c = a.length, 
            t = !1);
            i.memory || (t = !1), o = !1, s && (a = t ? [] : "");
        }, d = {
            add: function() {
                return a && (t && !o && (c = a.length - 1, l.push(t)), function n(e) {
                    C.each(e, function(e, t) {
                        C.isFunction(t) ? i.unique && d.has(t) || a.push(t) : t && t.length && "string" !== C.type(t) && n(t);
                    });
                }(arguments), t && !o && u()), this;
            },
            remove: function() {
                return C.each(arguments, function(e, t) {
                    for (var n; -1 < (n = C.inArray(t, a, n)); ) a.splice(n, 1), n <= c && c--;
                }), this;
            },
            has: function(e) {
                return e ? -1 < C.inArray(e, a) : 0 < a.length;
            },
            empty: function() {
                return a && (a = []), this;
            },
            disable: function() {
                return s = l = [], a = t = "", this;
            },
            disabled: function() {
                return !a;
            },
            lock: function() {
                return s = l = [], t || o || (a = t = ""), this;
            },
            locked: function() {
                return !!s;
            },
            fireWith: function(e, t) {
                return s || (t = [ e, (t = t || []).slice ? t.slice() : t ], l.push(t), o || u()), 
                this;
            },
            fire: function() {
                return d.fireWith(this, arguments), this;
            },
            fired: function() {
                return !!r;
            }
        };
        return d;
    }, C.extend({
        Deferred: function(e) {
            var r = [ [ "notify", "progress", C.Callbacks("memory"), C.Callbacks("memory"), 2 ], [ "resolve", "done", C.Callbacks("once memory"), C.Callbacks("once memory"), 0, "resolved" ], [ "reject", "fail", C.Callbacks("once memory"), C.Callbacks("once memory"), 1, "rejected" ] ], o = "pending", s = {
                state: function() {
                    return o;
                },
                always: function() {
                    return a.done(arguments).fail(arguments), this;
                },
                catch: function(e) {
                    return s.then(null, e);
                },
                pipe: function() {
                    var o = arguments;
                    return C.Deferred(function(i) {
                        C.each(r, function(e, t) {
                            var n = C.isFunction(o[t[4]]) && o[t[4]];
                            a[t[1]](function() {
                                var e = n && n.apply(this, arguments);
                                e && C.isFunction(e.promise) ? e.promise().progress(i.notify).done(i.resolve).fail(i.reject) : i[t[0] + "With"](this, n ? [ e ] : arguments);
                            });
                        }), o = null;
                    }).promise();
                },
                then: function(t, n, i) {
                    var l = 0;
                    function c(o, r, s, a) {
                        return function() {
                            var n = this, i = arguments, e = function() {
                                var e, t;
                                if (!(o < l)) {
                                    if ((e = s.apply(n, i)) === r.promise()) throw new TypeError("Thenable self-resolution");
                                    t = e && ("object" == typeof e || "function" == typeof e) && e.then, C.isFunction(t) ? a ? t.call(e, c(l, r, P, a), c(l, r, q, a)) : (l++, 
                                    t.call(e, c(l, r, P, a), c(l, r, q, a), c(l, r, P, r.notifyWith))) : (s !== P && (n = void 0, 
                                    i = [ e ]), (a || r.resolveWith)(n, i));
                                }
                            }, t = a ? e : function() {
                                try {
                                    e();
                                } catch (e) {
                                    C.Deferred.exceptionHook && C.Deferred.exceptionHook(e, t.stackTrace), l <= o + 1 && (s !== q && (n = void 0, 
                                    i = [ e ]), r.rejectWith(n, i));
                                }
                            };
                            o ? t() : (C.Deferred.getStackHook && (t.stackTrace = C.Deferred.getStackHook()), 
                            T.setTimeout(t));
                        };
                    }
                    return C.Deferred(function(e) {
                        r[0][3].add(c(0, e, C.isFunction(i) ? i : P, e.notifyWith)), r[1][3].add(c(0, e, C.isFunction(t) ? t : P)), 
                        r[2][3].add(c(0, e, C.isFunction(n) ? n : q));
                    }).promise();
                },
                promise: function(e) {
                    return null != e ? C.extend(e, s) : s;
                }
            }, a = {};
            return C.each(r, function(e, t) {
                var n = t[2], i = t[5];
                s[t[1]] = n.add, i && n.add(function() {
                    o = i;
                }, r[3 - e][2].disable, r[0][2].lock), n.add(t[3].fire), a[t[0]] = function() {
                    return a[t[0] + "With"](this === a ? void 0 : this, arguments), this;
                }, a[t[0] + "With"] = n.fireWith;
            }), s.promise(a), e && e.call(a, a), a;
        },
        when: function(e) {
            var n = arguments.length, t = n, i = Array(t), o = a.call(arguments), r = C.Deferred(), s = function(t) {
                return function(e) {
                    i[t] = this, o[t] = 1 < arguments.length ? a.call(arguments) : e, --n || r.resolveWith(i, o);
                };
            };
            if (n <= 1 && (z(e, r.done(s(t)).resolve, r.reject), "pending" === r.state() || C.isFunction(o[t] && o[t].then))) return r.then();
            for (;t--; ) z(o[t], s(t), r.reject);
            return r.promise();
        }
    });
    var M = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    C.Deferred.exceptionHook = function(e, t) {
        T.console && T.console.warn && e && M.test(e.name) && T.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t);
    }, C.readyException = function(e) {
        T.setTimeout(function() {
            throw e;
        });
    };
    var I = C.Deferred();
    function W() {
        S.removeEventListener("DOMContentLoaded", W), T.removeEventListener("load", W), 
        C.ready();
    }
    C.fn.ready = function(e) {
        return I.then(e).catch(function(e) {
            C.readyException(e);
        }), this;
    }, C.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? C.readyWait++ : C.ready(!0);
        },
        ready: function(e) {
            (!0 === e ? --C.readyWait : C.isReady) || (C.isReady = !0) !== e && 0 < --C.readyWait || I.resolveWith(S, [ C ]);
        }
    }), C.ready.then = I.then, "complete" === S.readyState || "loading" !== S.readyState && !S.documentElement.doScroll ? T.setTimeout(C.ready) : (S.addEventListener("DOMContentLoaded", W), 
    T.addEventListener("load", W));
    var R = function(e, t, n, i, o, r, s) {
        var a = 0, l = e.length, c = null == n;
        if ("object" === C.type(n)) for (a in o = !0, n) R(e, t, a, n[a], !0, r, s); else if (void 0 !== i && (o = !0, 
        C.isFunction(i) || (s = !0), c && (t = s ? (t.call(e, i), null) : (c = t, function(e, t, n) {
            return c.call(C(e), n);
        })), t)) for (;a < l; a++) t(e[a], n, s ? i : i.call(e[a], a, t(e[a], n)));
        return o ? e : c ? t.call(e) : l ? t(e[0], n) : r;
    }, B = function(e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
    };
    function U() {
        this.expando = C.expando + U.uid++;
    }
    U.uid = 1, U.prototype = {
        cache: function(e) {
            var t = e[this.expando];
            return t || (t = {}, B(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))), t;
        },
        set: function(e, t, n) {
            var i, o = this.cache(e);
            if ("string" == typeof t) o[C.camelCase(t)] = n; else for (i in t) o[C.camelCase(i)] = t[i];
            return o;
        },
        get: function(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][C.camelCase(t)];
        },
        access: function(e, t, n) {
            return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), 
            void 0 !== n ? n : t);
        },
        remove: function(e, t) {
            var n, i = e[this.expando];
            if (void 0 !== i) {
                if (void 0 !== t) {
                    n = (t = C.isArray(t) ? t.map(C.camelCase) : (t = C.camelCase(t)) in i ? [ t ] : t.match(H) || []).length;
                    for (;n--; ) delete i[t[n]];
                }
                (void 0 === t || C.isEmptyObject(i)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando]);
            }
        },
        hasData: function(e) {
            var t = e[this.expando];
            return void 0 !== t && !C.isEmptyObject(t);
        }
    };
    var X = new U(), _ = new U(), V = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, Y = /[A-Z]/g;
    function Q(e, t, n) {
        var i, o;
        if (void 0 === n && 1 === e.nodeType) if (i = "data-" + t.replace(Y, "-$&").toLowerCase(), 
        "string" == typeof (n = e.getAttribute(i))) {
            try {
                n = "true" === (o = n) || "false" !== o && ("null" === o ? null : o === +o + "" ? +o : V.test(o) ? JSON.parse(o) : o);
            } catch (e) {}
            _.set(e, t, n);
        } else n = void 0;
        return n;
    }
    C.extend({
        hasData: function(e) {
            return _.hasData(e) || X.hasData(e);
        },
        data: function(e, t, n) {
            return _.access(e, t, n);
        },
        removeData: function(e, t) {
            _.remove(e, t);
        },
        _data: function(e, t, n) {
            return X.access(e, t, n);
        },
        _removeData: function(e, t) {
            X.remove(e, t);
        }
    }), C.fn.extend({
        data: function(n, e) {
            var t, i, o, r = this[0], s = r && r.attributes;
            if (void 0 !== n) return "object" == typeof n ? this.each(function() {
                _.set(this, n);
            }) : R(this, function(e) {
                var t;
                if (r && void 0 === e) return void 0 !== (t = _.get(r, n)) ? t : void 0 !== (t = Q(r, n)) ? t : void 0;
                this.each(function() {
                    _.set(this, n, e);
                });
            }, null, e, 1 < arguments.length, null, !0);
            if (this.length && (o = _.get(r), 1 === r.nodeType && !X.get(r, "hasDataAttrs"))) {
                for (t = s.length; t--; ) s[t] && 0 === (i = s[t].name).indexOf("data-") && (i = C.camelCase(i.slice(5)), 
                Q(r, i, o[i]));
                X.set(r, "hasDataAttrs", !0);
            }
            return o;
        },
        removeData: function(e) {
            return this.each(function() {
                _.remove(this, e);
            });
        }
    }), C.extend({
        queue: function(e, t, n) {
            var i;
            if (e) return t = (t || "fx") + "queue", i = X.get(e, t), n && (!i || C.isArray(n) ? i = X.access(e, t, C.makeArray(n)) : i.push(n)), 
            i || [];
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = C.queue(e, t), i = n.length, o = n.shift(), r = C._queueHooks(e, t);
            "inprogress" === o && (o = n.shift(), i--), o && ("fx" === t && n.unshift("inprogress"), 
            delete r.stop, o.call(e, function() {
                C.dequeue(e, t);
            }, r)), !i && r && r.empty.fire();
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return X.get(e, n) || X.access(e, n, {
                empty: C.Callbacks("once memory").add(function() {
                    X.remove(e, [ t + "queue", n ]);
                })
            });
        }
    }), C.fn.extend({
        queue: function(t, n) {
            var e = 2;
            return "string" != typeof t && (n = t, t = "fx", e--), arguments.length < e ? C.queue(this[0], t) : void 0 === n ? this : this.each(function() {
                var e = C.queue(this, t, n);
                C._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && C.dequeue(this, t);
            });
        },
        dequeue: function(e) {
            return this.each(function() {
                C.dequeue(this, e);
            });
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", []);
        },
        promise: function(e, t) {
            var n, i = 1, o = C.Deferred(), r = this, s = this.length, a = function() {
                --i || o.resolveWith(r, [ r ]);
            };
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; s--; ) (n = X.get(r[s], e + "queueHooks")) && n.empty && (i++, 
            n.empty.add(a));
            return a(), o.promise(t);
        }
    });
    var G = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, J = new RegExp("^(?:([+-])=|)(" + G + ")([a-z%]*)$", "i"), K = [ "Top", "Right", "Bottom", "Left" ], Z = function(e, t) {
        return "none" === (e = t || e).style.display || "" === e.style.display && C.contains(e.ownerDocument, e) && "none" === C.css(e, "display");
    }, ee = function(e, t, n, i) {
        var o, r, s = {};
        for (r in t) s[r] = e.style[r], e.style[r] = t[r];
        for (r in o = n.apply(e, i || []), t) e.style[r] = s[r];
        return o;
    };
    function te(e, t, n, i) {
        var o, r = 1, s = 20, a = i ? function() {
            return i.cur();
        } : function() {
            return C.css(e, t, "");
        }, l = a(), c = n && n[3] || (C.cssNumber[t] ? "" : "px"), u = (C.cssNumber[t] || "px" !== c && +l) && J.exec(C.css(e, t));
        if (u && u[3] !== c) for (c = c || u[3], n = n || [], u = +l || 1; u /= r = r || ".5", 
        C.style(e, t, u + c), r !== (r = a() / l) && 1 !== r && --s; ) ;
        return n && (u = +u || +l || 0, o = n[1] ? u + (n[1] + 1) * n[2] : +n[2], i && (i.unit = c, 
        i.start = u, i.end = o)), o;
    }
    var ne = {};
    function ie(e, t) {
        for (var n, i, o, r, s, a, l, c = [], u = 0, d = e.length; u < d; u++) (i = e[u]).style && (n = i.style.display, 
        t ? ("none" === n && (c[u] = X.get(i, "display") || null, c[u] || (i.style.display = "")), 
        "" === i.style.display && Z(i) && (c[u] = (l = s = r = void 0, s = (o = i).ownerDocument, 
        a = o.nodeName, (l = ne[a]) || (r = s.body.appendChild(s.createElement(a)), l = C.css(r, "display"), 
        r.parentNode.removeChild(r), "none" === l && (l = "block"), ne[a] = l)))) : "none" !== n && (c[u] = "none", 
        X.set(i, "display", n)));
        for (u = 0; u < d; u++) null != c[u] && (e[u].style.display = c[u]);
        return e;
    }
    C.fn.extend({
        show: function() {
            return ie(this, !0);
        },
        hide: function() {
            return ie(this);
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                Z(this) ? C(this).show() : C(this).hide();
            });
        }
    });
    var oe = /^(?:checkbox|radio)$/i, re = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i, se = /^$|\/(?:java|ecma)script/i, ae = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        thead: [ 1, "<table>", "</table>" ],
        col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: [ 0, "", "" ]
    };
    function le(e, t) {
        var n;
        return n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [], 
        void 0 === t || t && C.nodeName(e, t) ? C.merge([ e ], n) : n;
    }
    function ce(e, t) {
        for (var n = 0, i = e.length; n < i; n++) X.set(e[n], "globalEval", !t || X.get(t[n], "globalEval"));
    }
    ae.optgroup = ae.option, ae.tbody = ae.tfoot = ae.colgroup = ae.caption = ae.thead, 
    ae.th = ae.td;
    var ue, de, pe = /<|&#?\w+;/;
    function fe(e, t, n, i, o) {
        for (var r, s, a, l, c, u, d = t.createDocumentFragment(), p = [], f = 0, h = e.length; f < h; f++) if ((r = e[f]) || 0 === r) if ("object" === C.type(r)) C.merge(p, r.nodeType ? [ r ] : r); else if (pe.test(r)) {
            for (s = s || d.appendChild(t.createElement("div")), a = (re.exec(r) || [ "", "" ])[1].toLowerCase(), 
            l = ae[a] || ae._default, s.innerHTML = l[1] + C.htmlPrefilter(r) + l[2], u = l[0]; u--; ) s = s.lastChild;
            C.merge(p, s.childNodes), (s = d.firstChild).textContent = "";
        } else p.push(t.createTextNode(r));
        for (d.textContent = "", f = 0; r = p[f++]; ) if (i && -1 < C.inArray(r, i)) o && o.push(r); else if (c = C.contains(r.ownerDocument, r), 
        s = le(d.appendChild(r), "script"), c && ce(s), n) for (u = 0; r = s[u++]; ) se.test(r.type || "") && n.push(r);
        return d;
    }
    ue = S.createDocumentFragment().appendChild(S.createElement("div")), (de = S.createElement("input")).setAttribute("type", "radio"), 
    de.setAttribute("checked", "checked"), de.setAttribute("name", "t"), ue.appendChild(de), 
    g.checkClone = ue.cloneNode(!0).cloneNode(!0).lastChild.checked, ue.innerHTML = "<textarea>x</textarea>", 
    g.noCloneChecked = !!ue.cloneNode(!0).lastChild.defaultValue;
    var he = S.documentElement, ve = /^key/, ge = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, me = /^([^.]*)(?:\.(.+)|)/;
    function ye() {
        return !0;
    }
    function be() {
        return !1;
    }
    function we() {
        try {
            return S.activeElement;
        } catch (e) {}
    }
    function xe(e, t, n, i, o, r) {
        var s, a;
        if ("object" == typeof t) {
            for (a in "string" != typeof n && (i = i || n, n = void 0), t) xe(e, a, n, i, t[a], r);
            return e;
        }
        if (null == i && null == o ? (o = n, i = n = void 0) : null == o && ("string" == typeof n ? (o = i, 
        i = void 0) : (o = i, i = n, n = void 0)), !1 === o) o = be; else if (!o) return e;
        return 1 === r && (s = o, (o = function(e) {
            return C().off(e), s.apply(this, arguments);
        }).guid = s.guid || (s.guid = C.guid++)), e.each(function() {
            C.event.add(this, t, o, i, n);
        });
    }
    C.event = {
        global: {},
        add: function(t, e, n, i, o) {
            var r, s, a, l, c, u, d, p, f, h, v, g = X.get(t);
            if (g) for (n.handler && (n = (r = n).handler, o = r.selector), o && C.find.matchesSelector(he, o), 
            n.guid || (n.guid = C.guid++), (l = g.events) || (l = g.events = {}), (s = g.handle) || (s = g.handle = function(e) {
                return void 0 !== C && C.event.triggered !== e.type ? C.event.dispatch.apply(t, arguments) : void 0;
            }), c = (e = (e || "").match(H) || [ "" ]).length; c--; ) f = v = (a = me.exec(e[c]) || [])[1], 
            h = (a[2] || "").split(".").sort(), f && (d = C.event.special[f] || {}, f = (o ? d.delegateType : d.bindType) || f, 
            d = C.event.special[f] || {}, u = C.extend({
                type: f,
                origType: v,
                data: i,
                handler: n,
                guid: n.guid,
                selector: o,
                needsContext: o && C.expr.match.needsContext.test(o),
                namespace: h.join(".")
            }, r), (p = l[f]) || ((p = l[f] = []).delegateCount = 0, d.setup && !1 !== d.setup.call(t, i, h, s) || t.addEventListener && t.addEventListener(f, s)), 
            d.add && (d.add.call(t, u), u.handler.guid || (u.handler.guid = n.guid)), o ? p.splice(p.delegateCount++, 0, u) : p.push(u), 
            C.event.global[f] = !0);
        },
        remove: function(e, t, n, i, o) {
            var r, s, a, l, c, u, d, p, f, h, v, g = X.hasData(e) && X.get(e);
            if (g && (l = g.events)) {
                for (c = (t = (t || "").match(H) || [ "" ]).length; c--; ) if (f = v = (a = me.exec(t[c]) || [])[1], 
                h = (a[2] || "").split(".").sort(), f) {
                    for (d = C.event.special[f] || {}, p = l[f = (i ? d.delegateType : d.bindType) || f] || [], 
                    a = a[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = r = p.length; r--; ) u = p[r], 
                    !o && v !== u.origType || n && n.guid !== u.guid || a && !a.test(u.namespace) || i && i !== u.selector && ("**" !== i || !u.selector) || (p.splice(r, 1), 
                    u.selector && p.delegateCount--, d.remove && d.remove.call(e, u));
                    s && !p.length && (d.teardown && !1 !== d.teardown.call(e, h, g.handle) || C.removeEvent(e, f, g.handle), 
                    delete l[f]);
                } else for (f in l) C.event.remove(e, f + t[c], n, i, !0);
                C.isEmptyObject(l) && X.remove(e, "handle events");
            }
        },
        dispatch: function(e) {
            var t, n, i, o, r, s, a = C.event.fix(e), l = new Array(arguments.length), c = (X.get(this, "events") || {})[a.type] || [], u = C.event.special[a.type] || {};
            for (l[0] = a, t = 1; t < arguments.length; t++) l[t] = arguments[t];
            if (a.delegateTarget = this, !u.preDispatch || !1 !== u.preDispatch.call(this, a)) {
                for (s = C.event.handlers.call(this, a, c), t = 0; (o = s[t++]) && !a.isPropagationStopped(); ) for (a.currentTarget = o.elem, 
                n = 0; (r = o.handlers[n++]) && !a.isImmediatePropagationStopped(); ) a.rnamespace && !a.rnamespace.test(r.namespace) || (a.handleObj = r, 
                a.data = r.data, void 0 !== (i = ((C.event.special[r.origType] || {}).handle || r.handler).apply(o.elem, l)) && !1 === (a.result = i) && (a.preventDefault(), 
                a.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, a), a.result;
            }
        },
        handlers: function(e, t) {
            var n, i, o, r, s, a = [], l = t.delegateCount, c = e.target;
            if (l && c.nodeType && !("click" === e.type && 1 <= e.button)) for (;c !== this; c = c.parentNode || this) if (1 === c.nodeType && ("click" !== e.type || !0 !== c.disabled)) {
                for (r = [], s = {}, n = 0; n < l; n++) void 0 === s[o = (i = t[n]).selector + " "] && (s[o] = i.needsContext ? -1 < C(o, this).index(c) : C.find(o, this, null, [ c ]).length), 
                s[o] && r.push(i);
                r.length && a.push({
                    elem: c,
                    handlers: r
                });
            }
            return c = this, l < t.length && a.push({
                elem: c,
                handlers: t.slice(l)
            }), a;
        },
        addProp: function(t, e) {
            Object.defineProperty(C.Event.prototype, t, {
                enumerable: !0,
                configurable: !0,
                get: C.isFunction(e) ? function() {
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
            return e[C.expando] ? e : new C.Event(e);
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== we() && this.focus) return this.focus(), !1;
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === we() && this.blur) return this.blur(), !1;
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if ("checkbox" === this.type && this.click && C.nodeName(this, "input")) return this.click(), 
                    !1;
                },
                _default: function(e) {
                    return C.nodeName(e.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result);
                }
            }
        }
    }, C.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n);
    }, C.Event = function(e, t) {
        if (!(this instanceof C.Event)) return new C.Event(e, t);
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? ye : be, 
        this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, 
        this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, 
        t && C.extend(this, t), this.timeStamp = e && e.timeStamp || C.now(), this[C.expando] = !0;
    }, C.Event.prototype = {
        constructor: C.Event,
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
    }, C.each({
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
            return null == e.which && ve.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && ge.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which;
        }
    }, C.event.addProp), C.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, o) {
        C.event.special[e] = {
            delegateType: o,
            bindType: o,
            handle: function(e) {
                var t, n = e.relatedTarget, i = e.handleObj;
                return n && (n === this || C.contains(this, n)) || (e.type = i.origType, t = i.handler.apply(this, arguments), 
                e.type = o), t;
            }
        };
    }), C.fn.extend({
        on: function(e, t, n, i) {
            return xe(this, e, t, n, i);
        },
        one: function(e, t, n, i) {
            return xe(this, e, t, n, i, 1);
        },
        off: function(e, t, n) {
            var i, o;
            if (e && e.preventDefault && e.handleObj) return i = e.handleObj, C(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), 
            this;
            if ("object" != typeof e) return !1 !== t && "function" != typeof t || (n = t, t = void 0), 
            !1 === n && (n = be), this.each(function() {
                C.event.remove(this, e, n, t);
            });
            for (o in e) this.off(o, t, e[o]);
            return this;
        }
    });
    var ke = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi, Te = /<script|<style|<link/i, Se = /checked\s*(?:[^=]|=\s*.checked.)/i, Ce = /^true\/(.*)/, $e = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    function Ne(e, t) {
        return C.nodeName(e, "table") && C.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") && e.getElementsByTagName("tbody")[0] || e;
    }
    function Ee(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e;
    }
    function Ae(e) {
        var t = Ce.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e;
    }
    function je(e, t) {
        var n, i, o, r, s, a, l, c;
        if (1 === t.nodeType) {
            if (X.hasData(e) && (r = X.access(e), s = X.set(t, r), c = r.events)) for (o in delete s.handle, 
            s.events = {}, c) for (n = 0, i = c[o].length; n < i; n++) C.event.add(t, o, c[o][n]);
            _.hasData(e) && (a = _.access(e), l = C.extend({}, a), _.set(t, l));
        }
    }
    function De(n, i, o, r) {
        i = v.apply([], i);
        var e, t, s, a, l, c, u = 0, d = n.length, p = d - 1, f = i[0], h = C.isFunction(f);
        if (h || 1 < d && "string" == typeof f && !g.checkClone && Se.test(f)) return n.each(function(e) {
            var t = n.eq(e);
            h && (i[0] = f.call(this, e, t.html())), De(t, i, o, r);
        });
        if (d && (t = (e = fe(i, n[0].ownerDocument, !1, n, r)).firstChild, 1 === e.childNodes.length && (e = t), 
        t || r)) {
            for (a = (s = C.map(le(e, "script"), Ee)).length; u < d; u++) l = e, u !== p && (l = C.clone(l, !0, !0), 
            a && C.merge(s, le(l, "script"))), o.call(n[u], l, u);
            if (a) for (c = s[s.length - 1].ownerDocument, C.map(s, Ae), u = 0; u < a; u++) l = s[u], 
            se.test(l.type || "") && !X.access(l, "globalEval") && C.contains(c, l) && (l.src ? C._evalUrl && C._evalUrl(l.src) : m(l.textContent.replace($e, ""), c));
        }
        return n;
    }
    function Fe(e, t, n) {
        for (var i, o = t ? C.filter(t, e) : e, r = 0; null != (i = o[r]); r++) n || 1 !== i.nodeType || C.cleanData(le(i)), 
        i.parentNode && (n && C.contains(i.ownerDocument, i) && ce(le(i, "script")), i.parentNode.removeChild(i));
        return e;
    }
    C.extend({
        htmlPrefilter: function(e) {
            return e.replace(ke, "<$1></$2>");
        },
        clone: function(e, t, n) {
            var i, o, r, s, a, l, c, u = e.cloneNode(!0), d = C.contains(e.ownerDocument, e);
            if (!(g.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || C.isXMLDoc(e))) for (s = le(u), 
            i = 0, o = (r = le(e)).length; i < o; i++) a = r[i], l = s[i], void 0, "input" === (c = l.nodeName.toLowerCase()) && oe.test(a.type) ? l.checked = a.checked : "input" !== c && "textarea" !== c || (l.defaultValue = a.defaultValue);
            if (t) if (n) for (r = r || le(e), s = s || le(u), i = 0, o = r.length; i < o; i++) je(r[i], s[i]); else je(e, u);
            return 0 < (s = le(u, "script")).length && ce(s, !d && le(e, "script")), u;
        },
        cleanData: function(e) {
            for (var t, n, i, o = C.event.special, r = 0; void 0 !== (n = e[r]); r++) if (B(n)) {
                if (t = n[X.expando]) {
                    if (t.events) for (i in t.events) o[i] ? C.event.remove(n, i) : C.removeEvent(n, i, t.handle);
                    n[X.expando] = void 0;
                }
                n[_.expando] && (n[_.expando] = void 0);
            }
        }
    }), C.fn.extend({
        detach: function(e) {
            return Fe(this, e, !0);
        },
        remove: function(e) {
            return Fe(this, e);
        },
        text: function(e) {
            return R(this, function(e) {
                return void 0 === e ? C.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e);
                });
            }, null, e, arguments.length);
        },
        append: function() {
            return De(this, arguments, function(e) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Ne(this, e).appendChild(e);
            });
        },
        prepend: function() {
            return De(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = Ne(this, e);
                    t.insertBefore(e, t.firstChild);
                }
            });
        },
        before: function() {
            return De(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this);
            });
        },
        after: function() {
            return De(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
            });
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (C.cleanData(le(e, !1)), 
            e.textContent = "");
            return this;
        },
        clone: function(e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function() {
                return C.clone(this, e, t);
            });
        },
        html: function(e) {
            return R(this, function(e) {
                var t = this[0] || {}, n = 0, i = this.length;
                if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof e && !Te.test(e) && !ae[(re.exec(e) || [ "", "" ])[1].toLowerCase()]) {
                    e = C.htmlPrefilter(e);
                    try {
                        for (;n < i; n++) 1 === (t = this[n] || {}).nodeType && (C.cleanData(le(t, !1)), 
                        t.innerHTML = e);
                        t = 0;
                    } catch (e) {}
                }
                t && this.empty().append(e);
            }, null, e, arguments.length);
        },
        replaceWith: function() {
            var n = [];
            return De(this, arguments, function(e) {
                var t = this.parentNode;
                C.inArray(this, n) < 0 && (C.cleanData(le(this)), t && t.replaceChild(e, this));
            }, n);
        }
    }), C.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, s) {
        C.fn[e] = function(e) {
            for (var t, n = [], i = C(e), o = i.length - 1, r = 0; r <= o; r++) t = r === o ? this : this.clone(!0), 
            C(i[r])[s](t), l.apply(n, t.get());
            return this.pushStack(n);
        };
    });
    var Le = /^margin/, Oe = new RegExp("^(" + G + ")(?!px)[a-z%]+$", "i"), He = function(e) {
        var t = e.ownerDocument.defaultView;
        return t && t.opener || (t = T), t.getComputedStyle(e);
    };
    function Pe(e, t, n) {
        var i, o, r, s, a = e.style;
        return (n = n || He(e)) && ("" !== (s = n.getPropertyValue(t) || n[t]) || C.contains(e.ownerDocument, e) || (s = C.style(e, t)), 
        !g.pixelMarginRight() && Oe.test(s) && Le.test(t) && (i = a.width, o = a.minWidth, 
        r = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, a.width = i, 
        a.minWidth = o, a.maxWidth = r)), void 0 !== s ? s + "" : s;
    }
    function qe(e, t) {
        return {
            get: function() {
                if (!e()) return (this.get = t).apply(this, arguments);
                delete this.get;
            }
        };
    }
    !function() {
        function e() {
            if (s) {
                s.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", 
                s.innerHTML = "", he.appendChild(r);
                var e = T.getComputedStyle(s);
                t = "1%" !== e.top, o = "2px" === e.marginLeft, n = "4px" === e.width, s.style.marginRight = "50%", 
                i = "4px" === e.marginRight, he.removeChild(r), s = null;
            }
        }
        var t, n, i, o, r = S.createElement("div"), s = S.createElement("div");
        s.style && (s.style.backgroundClip = "content-box", s.cloneNode(!0).style.backgroundClip = "", 
        g.clearCloneStyle = "content-box" === s.style.backgroundClip, r.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", 
        r.appendChild(s), C.extend(g, {
            pixelPosition: function() {
                return e(), t;
            },
            boxSizingReliable: function() {
                return e(), n;
            },
            pixelMarginRight: function() {
                return e(), i;
            },
            reliableMarginLeft: function() {
                return e(), o;
            }
        }));
    }();
    var ze = /^(none|table(?!-c[ea]).+)/, Me = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, Ie = {
        letterSpacing: "0",
        fontWeight: "400"
    }, We = [ "Webkit", "Moz", "ms" ], Re = S.createElement("div").style;
    function Be(e) {
        if (e in Re) return e;
        for (var t = e[0].toUpperCase() + e.slice(1), n = We.length; n--; ) if ((e = We[n] + t) in Re) return e;
    }
    function Ue(e, t, n) {
        var i = J.exec(t);
        return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : t;
    }
    function Xe(e, t, n, i, o) {
        var r, s = 0;
        for (r = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0; r < 4; r += 2) "margin" === n && (s += C.css(e, n + K[r], !0, o)), 
        i ? ("content" === n && (s -= C.css(e, "padding" + K[r], !0, o)), "margin" !== n && (s -= C.css(e, "border" + K[r] + "Width", !0, o))) : (s += C.css(e, "padding" + K[r], !0, o), 
        "padding" !== n && (s += C.css(e, "border" + K[r] + "Width", !0, o)));
        return s;
    }
    function _e(e, t, n) {
        var i, o = !0, r = He(e), s = "border-box" === C.css(e, "boxSizing", !1, r);
        if (e.getClientRects().length && (i = e.getBoundingClientRect()[t]), i <= 0 || null == i) {
            if (((i = Pe(e, t, r)) < 0 || null == i) && (i = e.style[t]), Oe.test(i)) return i;
            o = s && (g.boxSizingReliable() || i === e.style[t]), i = parseFloat(i) || 0;
        }
        return i + Xe(e, t, n || (s ? "border" : "content"), o, r) + "px";
    }
    function Ve(e, t, n, i, o) {
        return new Ve.prototype.init(e, t, n, i, o);
    }
    C.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = Pe(e, "opacity");
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
        style: function(e, t, n, i) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var o, r, s, a = C.camelCase(t), l = e.style;
                if (t = C.cssProps[a] || (C.cssProps[a] = Be(a) || a), s = C.cssHooks[t] || C.cssHooks[a], 
                void 0 === n) return s && "get" in s && void 0 !== (o = s.get(e, !1, i)) ? o : l[t];
                "string" === (r = typeof n) && (o = J.exec(n)) && o[1] && (n = te(e, t, o), r = "number"), 
                null != n && n == n && ("number" === r && (n += o && o[3] || (C.cssNumber[a] ? "" : "px")), 
                g.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), 
                s && "set" in s && void 0 === (n = s.set(e, n, i)) || (l[t] = n));
            }
        },
        css: function(e, t, n, i) {
            var o, r, s, a = C.camelCase(t);
            return t = C.cssProps[a] || (C.cssProps[a] = Be(a) || a), (s = C.cssHooks[t] || C.cssHooks[a]) && "get" in s && (o = s.get(e, !0, n)), 
            void 0 === o && (o = Pe(e, t, i)), "normal" === o && t in Ie && (o = Ie[t]), "" === n || n ? (r = parseFloat(o), 
            !0 === n || isFinite(r) ? r || 0 : o) : o;
        }
    }), C.each([ "height", "width" ], function(e, s) {
        C.cssHooks[s] = {
            get: function(e, t, n) {
                if (t) return !ze.test(C.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? _e(e, s, n) : ee(e, Me, function() {
                    return _e(e, s, n);
                });
            },
            set: function(e, t, n) {
                var i, o = n && He(e), r = n && Xe(e, s, n, "border-box" === C.css(e, "boxSizing", !1, o), o);
                return r && (i = J.exec(t)) && "px" !== (i[3] || "px") && (e.style[s] = t, t = C.css(e, s)), 
                Ue(0, t, r);
            }
        };
    }), C.cssHooks.marginLeft = qe(g.reliableMarginLeft, function(e, t) {
        if (t) return (parseFloat(Pe(e, "marginLeft")) || e.getBoundingClientRect().left - ee(e, {
            marginLeft: 0
        }, function() {
            return e.getBoundingClientRect().left;
        })) + "px";
    }), C.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(o, r) {
        C.cssHooks[o + r] = {
            expand: function(e) {
                for (var t = 0, n = {}, i = "string" == typeof e ? e.split(" ") : [ e ]; t < 4; t++) n[o + K[t] + r] = i[t] || i[t - 2] || i[0];
                return n;
            }
        }, Le.test(o) || (C.cssHooks[o + r].set = Ue);
    }), C.fn.extend({
        css: function(e, t) {
            return R(this, function(e, t, n) {
                var i, o, r = {}, s = 0;
                if (C.isArray(t)) {
                    for (i = He(e), o = t.length; s < o; s++) r[t[s]] = C.css(e, t[s], !1, i);
                    return r;
                }
                return void 0 !== n ? C.style(e, t, n) : C.css(e, t);
            }, e, t, 1 < arguments.length);
        }
    }), ((C.Tween = Ve).prototype = {
        constructor: Ve,
        init: function(e, t, n, i, o, r) {
            this.elem = e, this.prop = n, this.easing = o || C.easing._default, this.options = t, 
            this.start = this.now = this.cur(), this.end = i, this.unit = r || (C.cssNumber[n] ? "" : "px");
        },
        cur: function() {
            var e = Ve.propHooks[this.prop];
            return e && e.get ? e.get(this) : Ve.propHooks._default.get(this);
        },
        run: function(e) {
            var t, n = Ve.propHooks[this.prop];
            return this.options.duration ? this.pos = t = C.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, 
            this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
            n && n.set ? n.set(this) : Ve.propHooks._default.set(this), this;
        }
    }).init.prototype = Ve.prototype, (Ve.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = C.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0;
            },
            set: function(e) {
                C.fx.step[e.prop] ? C.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[C.cssProps[e.prop]] && !C.cssHooks[e.prop] ? e.elem[e.prop] = e.now : C.style(e.elem, e.prop, e.now + e.unit);
            }
        }
    }).scrollTop = Ve.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
        }
    }, C.easing = {
        linear: function(e) {
            return e;
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2;
        },
        _default: "swing"
    }, C.fx = Ve.prototype.init, C.fx.step = {};
    var Ye, Qe, Ge, Je, Ke = /^(?:toggle|show|hide)$/, Ze = /queueHooks$/;
    function et() {
        Qe && (T.requestAnimationFrame(et), C.fx.tick());
    }
    function tt() {
        return T.setTimeout(function() {
            Ye = void 0;
        }), Ye = C.now();
    }
    function nt(e, t) {
        var n, i = 0, o = {
            height: e
        };
        for (t = t ? 1 : 0; i < 4; i += 2 - t) o["margin" + (n = K[i])] = o["padding" + n] = e;
        return t && (o.opacity = o.width = e), o;
    }
    function it(e, t, n) {
        for (var i, o = (ot.tweeners[t] || []).concat(ot.tweeners["*"]), r = 0, s = o.length; r < s; r++) if (i = o[r].call(n, t, e)) return i;
    }
    function ot(r, e, t) {
        var n, s, i = 0, o = ot.prefilters.length, a = C.Deferred().always(function() {
            delete l.elem;
        }), l = function() {
            if (s) return !1;
            for (var e = Ye || tt(), t = Math.max(0, c.startTime + c.duration - e), n = 1 - (t / c.duration || 0), i = 0, o = c.tweens.length; i < o; i++) c.tweens[i].run(n);
            return a.notifyWith(r, [ c, n, t ]), n < 1 && o ? t : (a.resolveWith(r, [ c ]), 
            !1);
        }, c = a.promise({
            elem: r,
            props: C.extend({}, e),
            opts: C.extend(!0, {
                specialEasing: {},
                easing: C.easing._default
            }, t),
            originalProperties: e,
            originalOptions: t,
            startTime: Ye || tt(),
            duration: t.duration,
            tweens: [],
            createTween: function(e, t) {
                var n = C.Tween(r, c.opts, e, t, c.opts.specialEasing[e] || c.opts.easing);
                return c.tweens.push(n), n;
            },
            stop: function(e) {
                var t = 0, n = e ? c.tweens.length : 0;
                if (s) return this;
                for (s = !0; t < n; t++) c.tweens[t].run(1);
                return e ? (a.notifyWith(r, [ c, 1, 0 ]), a.resolveWith(r, [ c, e ])) : a.rejectWith(r, [ c, e ]), 
                this;
            }
        }), u = c.props;
        for (!function(e, t) {
            var n, i, o, r, s;
            for (n in e) if (o = t[i = C.camelCase(n)], r = e[n], C.isArray(r) && (o = r[1], 
            r = e[n] = r[0]), n !== i && (e[i] = r, delete e[n]), (s = C.cssHooks[i]) && "expand" in s) for (n in r = s.expand(r), 
            delete e[i], r) n in e || (e[n] = r[n], t[n] = o); else t[i] = o;
        }(u, c.opts.specialEasing); i < o; i++) if (n = ot.prefilters[i].call(c, r, u, c.opts)) return C.isFunction(n.stop) && (C._queueHooks(c.elem, c.opts.queue).stop = C.proxy(n.stop, n)), 
        n;
        return C.map(u, it, c), C.isFunction(c.opts.start) && c.opts.start.call(r, c), C.fx.timer(C.extend(l, {
            elem: r,
            anim: c,
            queue: c.opts.queue
        })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always);
    }
    C.Animation = C.extend(ot, {
        tweeners: {
            "*": [ function(e, t) {
                var n = this.createTween(e, t);
                return te(n.elem, e, J.exec(t), n), n;
            } ]
        },
        tweener: function(e, t) {
            for (var n, i = 0, o = (e = C.isFunction(e) ? (t = e, [ "*" ]) : e.match(H)).length; i < o; i++) n = e[i], 
            ot.tweeners[n] = ot.tweeners[n] || [], ot.tweeners[n].unshift(t);
        },
        prefilters: [ function(e, t, n) {
            var i, o, r, s, a, l, c, u, d = "width" in t || "height" in t, p = this, f = {}, h = e.style, v = e.nodeType && Z(e), g = X.get(e, "fxshow");
            for (i in n.queue || (null == (s = C._queueHooks(e, "fx")).unqueued && (s.unqueued = 0, 
            a = s.empty.fire, s.empty.fire = function() {
                s.unqueued || a();
            }), s.unqueued++, p.always(function() {
                p.always(function() {
                    s.unqueued--, C.queue(e, "fx").length || s.empty.fire();
                });
            })), t) if (o = t[i], Ke.test(o)) {
                if (delete t[i], r = r || "toggle" === o, o === (v ? "hide" : "show")) {
                    if ("show" !== o || !g || void 0 === g[i]) continue;
                    v = !0;
                }
                f[i] = g && g[i] || C.style(e, i);
            }
            if ((l = !C.isEmptyObject(t)) || !C.isEmptyObject(f)) for (i in d && 1 === e.nodeType && (n.overflow = [ h.overflow, h.overflowX, h.overflowY ], 
            null == (c = g && g.display) && (c = X.get(e, "display")), "none" === (u = C.css(e, "display")) && (c ? u = c : (ie([ e ], !0), 
            c = e.style.display || c, u = C.css(e, "display"), ie([ e ]))), ("inline" === u || "inline-block" === u && null != c) && "none" === C.css(e, "float") && (l || (p.done(function() {
                h.display = c;
            }), null == c && (u = h.display, c = "none" === u ? "" : u)), h.display = "inline-block")), 
            n.overflow && (h.overflow = "hidden", p.always(function() {
                h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2];
            })), l = !1, f) l || (g ? "hidden" in g && (v = g.hidden) : g = X.access(e, "fxshow", {
                display: c
            }), r && (g.hidden = !v), v && ie([ e ], !0), p.done(function() {
                for (i in v || ie([ e ]), X.remove(e, "fxshow"), f) C.style(e, i, f[i]);
            })), l = it(v ? g[i] : 0, i, p), i in g || (g[i] = l.start, v && (l.end = l.start, 
            l.start = 0));
        } ],
        prefilter: function(e, t) {
            t ? ot.prefilters.unshift(e) : ot.prefilters.push(e);
        }
    }), C.speed = function(e, t, n) {
        var i = e && "object" == typeof e ? C.extend({}, e) : {
            complete: n || !n && t || C.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !C.isFunction(t) && t
        };
        return C.fx.off || S.hidden ? i.duration = 0 : "number" != typeof i.duration && (i.duration in C.fx.speeds ? i.duration = C.fx.speeds[i.duration] : i.duration = C.fx.speeds._default), 
        null != i.queue && !0 !== i.queue || (i.queue = "fx"), i.old = i.complete, i.complete = function() {
            C.isFunction(i.old) && i.old.call(this), i.queue && C.dequeue(this, i.queue);
        }, i;
    }, C.fn.extend({
        fadeTo: function(e, t, n, i) {
            return this.filter(Z).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, i);
        },
        animate: function(t, e, n, i) {
            var o = C.isEmptyObject(t), r = C.speed(e, n, i), s = function() {
                var e = ot(this, C.extend({}, t), r);
                (o || X.get(this, "finish")) && e.stop(!0);
            };
            return s.finish = s, o || !1 === r.queue ? this.each(s) : this.queue(r.queue, s);
        },
        stop: function(o, e, r) {
            var s = function(e) {
                var t = e.stop;
                delete e.stop, t(r);
            };
            return "string" != typeof o && (r = e, e = o, o = void 0), e && !1 !== o && this.queue(o || "fx", []), 
            this.each(function() {
                var e = !0, t = null != o && o + "queueHooks", n = C.timers, i = X.get(this);
                if (t) i[t] && i[t].stop && s(i[t]); else for (t in i) i[t] && i[t].stop && Ze.test(t) && s(i[t]);
                for (t = n.length; t--; ) n[t].elem !== this || null != o && n[t].queue !== o || (n[t].anim.stop(r), 
                e = !1, n.splice(t, 1));
                !e && r || C.dequeue(this, o);
            });
        },
        finish: function(s) {
            return !1 !== s && (s = s || "fx"), this.each(function() {
                var e, t = X.get(this), n = t[s + "queue"], i = t[s + "queueHooks"], o = C.timers, r = n ? n.length : 0;
                for (t.finish = !0, C.queue(this, s, []), i && i.stop && i.stop.call(this, !0), 
                e = o.length; e--; ) o[e].elem === this && o[e].queue === s && (o[e].anim.stop(!0), 
                o.splice(e, 1));
                for (e = 0; e < r; e++) n[e] && n[e].finish && n[e].finish.call(this);
                delete t.finish;
            });
        }
    }), C.each([ "toggle", "show", "hide" ], function(e, i) {
        var o = C.fn[i];
        C.fn[i] = function(e, t, n) {
            return null == e || "boolean" == typeof e ? o.apply(this, arguments) : this.animate(nt(i, !0), e, t, n);
        };
    }), C.each({
        slideDown: nt("show"),
        slideUp: nt("hide"),
        slideToggle: nt("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, i) {
        C.fn[e] = function(e, t, n) {
            return this.animate(i, e, t, n);
        };
    }), C.timers = [], C.fx.tick = function() {
        var e, t = 0, n = C.timers;
        for (Ye = C.now(); t < n.length; t++) (e = n[t])() || n[t] !== e || n.splice(t--, 1);
        n.length || C.fx.stop(), Ye = void 0;
    }, C.fx.timer = function(e) {
        C.timers.push(e), e() ? C.fx.start() : C.timers.pop();
    }, C.fx.interval = 13, C.fx.start = function() {
        Qe || (Qe = T.requestAnimationFrame ? T.requestAnimationFrame(et) : T.setInterval(C.fx.tick, C.fx.interval));
    }, C.fx.stop = function() {
        T.cancelAnimationFrame ? T.cancelAnimationFrame(Qe) : T.clearInterval(Qe), Qe = null;
    }, C.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, C.fn.delay = function(i, e) {
        return i = C.fx && C.fx.speeds[i] || i, e = e || "fx", this.queue(e, function(e, t) {
            var n = T.setTimeout(e, i);
            t.stop = function() {
                T.clearTimeout(n);
            };
        });
    }, Ge = S.createElement("input"), Je = S.createElement("select").appendChild(S.createElement("option")), 
    Ge.type = "checkbox", g.checkOn = "" !== Ge.value, g.optSelected = Je.selected, 
    (Ge = S.createElement("input")).value = "t", Ge.type = "radio", g.radioValue = "t" === Ge.value;
    var rt, st = C.expr.attrHandle;
    C.fn.extend({
        attr: function(e, t) {
            return R(this, C.attr, e, t, 1 < arguments.length);
        },
        removeAttr: function(e) {
            return this.each(function() {
                C.removeAttr(this, e);
            });
        }
    }), C.extend({
        attr: function(e, t, n) {
            var i, o, r = e.nodeType;
            if (3 !== r && 8 !== r && 2 !== r) return void 0 === e.getAttribute ? C.prop(e, t, n) : (1 === r && C.isXMLDoc(e) || (o = C.attrHooks[t.toLowerCase()] || (C.expr.match.bool.test(t) ? rt : void 0)), 
            void 0 !== n ? null === n ? void C.removeAttr(e, t) : o && "set" in o && void 0 !== (i = o.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), 
            n) : o && "get" in o && null !== (i = o.get(e, t)) ? i : null == (i = C.find.attr(e, t)) ? void 0 : i);
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!g.radioValue && "radio" === t && C.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t;
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var n, i = 0, o = t && t.match(H);
            if (o && 1 === e.nodeType) for (;n = o[i++]; ) e.removeAttribute(n);
        }
    }), rt = {
        set: function(e, t, n) {
            return !1 === t ? C.removeAttr(e, n) : e.setAttribute(n, n), n;
        }
    }, C.each(C.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var s = st[t] || C.find.attr;
        st[t] = function(e, t, n) {
            var i, o, r = t.toLowerCase();
            return n || (o = st[r], st[r] = i, i = null != s(e, t, n) ? r : null, st[r] = o), 
            i;
        };
    });
    var at = /^(?:input|select|textarea|button)$/i, lt = /^(?:a|area)$/i;
    function ct(e) {
        return (e.match(H) || []).join(" ");
    }
    function ut(e) {
        return e.getAttribute && e.getAttribute("class") || "";
    }
    C.fn.extend({
        prop: function(e, t) {
            return R(this, C.prop, e, t, 1 < arguments.length);
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[C.propFix[e] || e];
            });
        }
    }), C.extend({
        prop: function(e, t, n) {
            var i, o, r = e.nodeType;
            if (3 !== r && 8 !== r && 2 !== r) return 1 === r && C.isXMLDoc(e) || (t = C.propFix[t] || t, 
            o = C.propHooks[t]), void 0 !== n ? o && "set" in o && void 0 !== (i = o.set(e, n, t)) ? i : e[t] = n : o && "get" in o && null !== (i = o.get(e, t)) ? i : e[t];
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = C.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : at.test(e.nodeName) || lt.test(e.nodeName) && e.href ? 0 : -1;
                }
            }
        },
        propFix: {
            for: "htmlFor",
            class: "className"
        }
    }), g.optSelected || (C.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null;
        },
        set: function(e) {
            var t = e.parentNode;
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
        }
    }), C.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
        C.propFix[this.toLowerCase()] = this;
    }), C.fn.extend({
        addClass: function(t) {
            var e, n, i, o, r, s, a, l = 0;
            if (C.isFunction(t)) return this.each(function(e) {
                C(this).addClass(t.call(this, e, ut(this)));
            });
            if ("string" == typeof t && t) for (e = t.match(H) || []; n = this[l++]; ) if (o = ut(n), 
            i = 1 === n.nodeType && " " + ct(o) + " ") {
                for (s = 0; r = e[s++]; ) i.indexOf(" " + r + " ") < 0 && (i += r + " ");
                o !== (a = ct(i)) && n.setAttribute("class", a);
            }
            return this;
        },
        removeClass: function(t) {
            var e, n, i, o, r, s, a, l = 0;
            if (C.isFunction(t)) return this.each(function(e) {
                C(this).removeClass(t.call(this, e, ut(this)));
            });
            if (!arguments.length) return this.attr("class", "");
            if ("string" == typeof t && t) for (e = t.match(H) || []; n = this[l++]; ) if (o = ut(n), 
            i = 1 === n.nodeType && " " + ct(o) + " ") {
                for (s = 0; r = e[s++]; ) for (;-1 < i.indexOf(" " + r + " "); ) i = i.replace(" " + r + " ", " ");
                o !== (a = ct(i)) && n.setAttribute("class", a);
            }
            return this;
        },
        toggleClass: function(o, t) {
            var r = typeof o;
            return "boolean" == typeof t && "string" === r ? t ? this.addClass(o) : this.removeClass(o) : C.isFunction(o) ? this.each(function(e) {
                C(this).toggleClass(o.call(this, e, ut(this), t), t);
            }) : this.each(function() {
                var e, t, n, i;
                if ("string" === r) for (t = 0, n = C(this), i = o.match(H) || []; e = i[t++]; ) n.hasClass(e) ? n.removeClass(e) : n.addClass(e); else void 0 !== o && "boolean" !== r || ((e = ut(this)) && X.set(this, "__className__", e), 
                this.setAttribute && this.setAttribute("class", e || !1 === o ? "" : X.get(this, "__className__") || ""));
            });
        },
        hasClass: function(e) {
            var t, n, i = 0;
            for (t = " " + e + " "; n = this[i++]; ) if (1 === n.nodeType && -1 < (" " + ct(ut(n)) + " ").indexOf(t)) return !0;
            return !1;
        }
    });
    var dt = /\r/g;
    C.fn.extend({
        val: function(n) {
            var i, e, o, t = this[0];
            return arguments.length ? (o = C.isFunction(n), this.each(function(e) {
                var t;
                1 === this.nodeType && (null == (t = o ? n.call(this, e, C(this).val()) : n) ? t = "" : "number" == typeof t ? t += "" : C.isArray(t) && (t = C.map(t, function(e) {
                    return null == e ? "" : e + "";
                })), (i = C.valHooks[this.type] || C.valHooks[this.nodeName.toLowerCase()]) && "set" in i && void 0 !== i.set(this, t, "value") || (this.value = t));
            })) : t ? (i = C.valHooks[t.type] || C.valHooks[t.nodeName.toLowerCase()]) && "get" in i && void 0 !== (e = i.get(t, "value")) ? e : "string" == typeof (e = t.value) ? e.replace(dt, "") : null == e ? "" : e : void 0;
        }
    }), C.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = C.find.attr(e, "value");
                    return null != t ? t : ct(C.text(e));
                }
            },
            select: {
                get: function(e) {
                    var t, n, i, o = e.options, r = e.selectedIndex, s = "select-one" === e.type, a = s ? null : [], l = s ? r + 1 : o.length;
                    for (i = r < 0 ? l : s ? r : 0; i < l; i++) if (((n = o[i]).selected || i === r) && !n.disabled && (!n.parentNode.disabled || !C.nodeName(n.parentNode, "optgroup"))) {
                        if (t = C(n).val(), s) return t;
                        a.push(t);
                    }
                    return a;
                },
                set: function(e, t) {
                    for (var n, i, o = e.options, r = C.makeArray(t), s = o.length; s--; ) ((i = o[s]).selected = -1 < C.inArray(C.valHooks.option.get(i), r)) && (n = !0);
                    return n || (e.selectedIndex = -1), r;
                }
            }
        }
    }), C.each([ "radio", "checkbox" ], function() {
        C.valHooks[this] = {
            set: function(e, t) {
                if (C.isArray(t)) return e.checked = -1 < C.inArray(C(e).val(), t);
            }
        }, g.checkOn || (C.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value;
        });
    });
    var pt = /^(?:focusinfocus|focusoutblur)$/;
    C.extend(C.event, {
        trigger: function(e, t, n, i) {
            var o, r, s, a, l, c, u, d = [ n || S ], p = h.call(e, "type") ? e.type : e, f = h.call(e, "namespace") ? e.namespace.split(".") : [];
            if (r = s = n = n || S, 3 !== n.nodeType && 8 !== n.nodeType && !pt.test(p + C.event.triggered) && (-1 < p.indexOf(".") && (p = (f = p.split(".")).shift(), 
            f.sort()), l = p.indexOf(":") < 0 && "on" + p, (e = e[C.expando] ? e : new C.Event(p, "object" == typeof e && e)).isTrigger = i ? 2 : 3, 
            e.namespace = f.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
            e.result = void 0, e.target || (e.target = n), t = null == t ? [ e ] : C.makeArray(t, [ e ]), 
            u = C.event.special[p] || {}, i || !u.trigger || !1 !== u.trigger.apply(n, t))) {
                if (!i && !u.noBubble && !C.isWindow(n)) {
                    for (a = u.delegateType || p, pt.test(a + p) || (r = r.parentNode); r; r = r.parentNode) d.push(r), 
                    s = r;
                    s === (n.ownerDocument || S) && d.push(s.defaultView || s.parentWindow || T);
                }
                for (o = 0; (r = d[o++]) && !e.isPropagationStopped(); ) e.type = 1 < o ? a : u.bindType || p, 
                (c = (X.get(r, "events") || {})[e.type] && X.get(r, "handle")) && c.apply(r, t), 
                (c = l && r[l]) && c.apply && B(r) && (e.result = c.apply(r, t), !1 === e.result && e.preventDefault());
                return e.type = p, i || e.isDefaultPrevented() || u._default && !1 !== u._default.apply(d.pop(), t) || !B(n) || l && C.isFunction(n[p]) && !C.isWindow(n) && ((s = n[l]) && (n[l] = null), 
                n[C.event.triggered = p](), C.event.triggered = void 0, s && (n[l] = s)), e.result;
            }
        },
        simulate: function(e, t, n) {
            var i = C.extend(new C.Event(), n, {
                type: e,
                isSimulated: !0
            });
            C.event.trigger(i, null, t);
        }
    }), C.fn.extend({
        trigger: function(e, t) {
            return this.each(function() {
                C.event.trigger(e, t, this);
            });
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            if (n) return C.event.trigger(e, t, n, !0);
        }
    }), C.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, n) {
        C.fn[n] = function(e, t) {
            return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n);
        };
    }), C.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e);
        }
    }), g.focusin = "onfocusin" in T, g.focusin || C.each({
        focus: "focusin",
        blur: "focusout"
    }, function(n, i) {
        var o = function(e) {
            C.event.simulate(i, e.target, C.event.fix(e));
        };
        C.event.special[i] = {
            setup: function() {
                var e = this.ownerDocument || this, t = X.access(e, i);
                t || e.addEventListener(n, o, !0), X.access(e, i, (t || 0) + 1);
            },
            teardown: function() {
                var e = this.ownerDocument || this, t = X.access(e, i) - 1;
                t ? X.access(e, i, t) : (e.removeEventListener(n, o, !0), X.remove(e, i));
            }
        };
    });
    var ft = T.location, ht = C.now(), vt = /\?/;
    C.parseXML = function(e) {
        var t;
        if (!e || "string" != typeof e) return null;
        try {
            t = new T.DOMParser().parseFromString(e, "text/xml");
        } catch (e) {
            t = void 0;
        }
        return t && !t.getElementsByTagName("parsererror").length || C.error("Invalid XML: " + e), 
        t;
    };
    var gt = /\[\]$/, mt = /\r?\n/g, yt = /^(?:submit|button|image|reset|file)$/i, bt = /^(?:input|select|textarea|keygen)/i;
    function wt(n, e, i, o) {
        var t;
        if (C.isArray(e)) C.each(e, function(e, t) {
            i || gt.test(n) ? o(n, t) : wt(n + "[" + ("object" == typeof t && null != t ? e : "") + "]", t, i, o);
        }); else if (i || "object" !== C.type(e)) o(n, e); else for (t in e) wt(n + "[" + t + "]", e[t], i, o);
    }
    C.param = function(e, t) {
        var n, i = [], o = function(e, t) {
            var n = C.isFunction(t) ? t() : t;
            i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n);
        };
        if (C.isArray(e) || e.jquery && !C.isPlainObject(e)) C.each(e, function() {
            o(this.name, this.value);
        }); else for (n in e) wt(n, e[n], t, o);
        return i.join("&");
    }, C.fn.extend({
        serialize: function() {
            return C.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var e = C.prop(this, "elements");
                return e ? C.makeArray(e) : this;
            }).filter(function() {
                var e = this.type;
                return this.name && !C(this).is(":disabled") && bt.test(this.nodeName) && !yt.test(e) && (this.checked || !oe.test(e));
            }).map(function(e, t) {
                var n = C(this).val();
                return null == n ? null : C.isArray(n) ? C.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(mt, "\r\n")
                    };
                }) : {
                    name: t.name,
                    value: n.replace(mt, "\r\n")
                };
            }).get();
        }
    });
    var xt = /%20/g, kt = /#.*$/, Tt = /([?&])_=[^&]*/, St = /^(.*?):[ \t]*([^\r\n]*)$/gm, Ct = /^(?:GET|HEAD)$/, $t = /^\/\//, Nt = {}, Et = {}, At = "*/".concat("*"), jt = S.createElement("a");
    function Dt(r) {
        return function(e, t) {
            "string" != typeof e && (t = e, e = "*");
            var n, i = 0, o = e.toLowerCase().match(H) || [];
            if (C.isFunction(t)) for (;n = o[i++]; ) "+" === n[0] ? (n = n.slice(1) || "*", 
            (r[n] = r[n] || []).unshift(t)) : (r[n] = r[n] || []).push(t);
        };
    }
    function Ft(t, o, r, s) {
        var a = {}, l = t === Et;
        function c(e) {
            var i;
            return a[e] = !0, C.each(t[e] || [], function(e, t) {
                var n = t(o, r, s);
                return "string" != typeof n || l || a[n] ? l ? !(i = n) : void 0 : (o.dataTypes.unshift(n), 
                c(n), !1);
            }), i;
        }
        return c(o.dataTypes[0]) || !a["*"] && c("*");
    }
    function Lt(e, t) {
        var n, i, o = C.ajaxSettings.flatOptions || {};
        for (n in t) void 0 !== t[n] && ((o[n] ? e : i || (i = {}))[n] = t[n]);
        return i && C.extend(!0, e, i), e;
    }
    jt.href = ft.href, C.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ft.href,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(ft.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": At,
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
                "text xml": C.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? Lt(Lt(e, C.ajaxSettings), t) : Lt(C.ajaxSettings, e);
        },
        ajaxPrefilter: Dt(Nt),
        ajaxTransport: Dt(Et),
        ajax: function(e, t) {
            "object" == typeof e && (t = e, e = void 0), t = t || {};
            var u, d, p, n, f, i, h, v, o, r, g = C.ajaxSetup({}, t), m = g.context || g, y = g.context && (m.nodeType || m.jquery) ? C(m) : C.event, b = C.Deferred(), w = C.Callbacks("once memory"), x = g.statusCode || {}, s = {}, a = {}, l = "canceled", k = {
                readyState: 0,
                getResponseHeader: function(e) {
                    var t;
                    if (h) {
                        if (!n) for (n = {}; t = St.exec(p); ) n[t[1].toLowerCase()] = t[2];
                        t = n[e.toLowerCase()];
                    }
                    return null == t ? null : t;
                },
                getAllResponseHeaders: function() {
                    return h ? p : null;
                },
                setRequestHeader: function(e, t) {
                    return null == h && (e = a[e.toLowerCase()] = a[e.toLowerCase()] || e, s[e] = t), 
                    this;
                },
                overrideMimeType: function(e) {
                    return null == h && (g.mimeType = e), this;
                },
                statusCode: function(e) {
                    var t;
                    if (e) if (h) k.always(e[k.status]); else for (t in e) x[t] = [ x[t], e[t] ];
                    return this;
                },
                abort: function(e) {
                    var t = e || l;
                    return u && u.abort(t), c(0, t), this;
                }
            };
            if (b.promise(k), g.url = ((e || g.url || ft.href) + "").replace($t, ft.protocol + "//"), 
            g.type = t.method || t.type || g.method || g.type, g.dataTypes = (g.dataType || "*").toLowerCase().match(H) || [ "" ], 
            null == g.crossDomain) {
                i = S.createElement("a");
                try {
                    i.href = g.url, i.href = i.href, g.crossDomain = jt.protocol + "//" + jt.host != i.protocol + "//" + i.host;
                } catch (e) {
                    g.crossDomain = !0;
                }
            }
            if (g.data && g.processData && "string" != typeof g.data && (g.data = C.param(g.data, g.traditional)), 
            Ft(Nt, g, t, k), h) return k;
            for (o in (v = C.event && g.global) && 0 == C.active++ && C.event.trigger("ajaxStart"), 
            g.type = g.type.toUpperCase(), g.hasContent = !Ct.test(g.type), d = g.url.replace(kt, ""), 
            g.hasContent ? g.data && g.processData && 0 === (g.contentType || "").indexOf("application/x-www-form-urlencoded") && (g.data = g.data.replace(xt, "+")) : (r = g.url.slice(d.length), 
            g.data && (d += (vt.test(d) ? "&" : "?") + g.data, delete g.data), !1 === g.cache && (d = d.replace(Tt, "$1"), 
            r = (vt.test(d) ? "&" : "?") + "_=" + ht++ + r), g.url = d + r), g.ifModified && (C.lastModified[d] && k.setRequestHeader("If-Modified-Since", C.lastModified[d]), 
            C.etag[d] && k.setRequestHeader("If-None-Match", C.etag[d])), (g.data && g.hasContent && !1 !== g.contentType || t.contentType) && k.setRequestHeader("Content-Type", g.contentType), 
            k.setRequestHeader("Accept", g.dataTypes[0] && g.accepts[g.dataTypes[0]] ? g.accepts[g.dataTypes[0]] + ("*" !== g.dataTypes[0] ? ", " + At + "; q=0.01" : "") : g.accepts["*"]), 
            g.headers) k.setRequestHeader(o, g.headers[o]);
            if (g.beforeSend && (!1 === g.beforeSend.call(m, k, g) || h)) return k.abort();
            if (l = "abort", w.add(g.complete), k.done(g.success), k.fail(g.error), u = Ft(Et, g, t, k)) {
                if (k.readyState = 1, v && y.trigger("ajaxSend", [ k, g ]), h) return k;
                g.async && 0 < g.timeout && (f = T.setTimeout(function() {
                    k.abort("timeout");
                }, g.timeout));
                try {
                    h = !1, u.send(s, c);
                } catch (e) {
                    if (h) throw e;
                    c(-1, e);
                }
            } else c(-1, "No Transport");
            function c(e, t, n, i) {
                var o, r, s, a, l, c = t;
                h || (h = !0, f && T.clearTimeout(f), u = void 0, p = i || "", k.readyState = 0 < e ? 4 : 0, 
                o = 200 <= e && e < 300 || 304 === e, n && (a = function(e, t, n) {
                    for (var i, o, r, s, a = e.contents, l = e.dataTypes; "*" === l[0]; ) l.shift(), 
                    void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
                    if (i) for (o in a) if (a[o] && a[o].test(i)) {
                        l.unshift(o);
                        break;
                    }
                    if (l[0] in n) r = l[0]; else {
                        for (o in n) {
                            if (!l[0] || e.converters[o + " " + l[0]]) {
                                r = o;
                                break;
                            }
                            s || (s = o);
                        }
                        r = r || s;
                    }
                    if (r) return r !== l[0] && l.unshift(r), n[r];
                }(g, k, n)), a = function(e, t, n, i) {
                    var o, r, s, a, l, c = {}, u = e.dataTypes.slice();
                    if (u[1]) for (s in e.converters) c[s.toLowerCase()] = e.converters[s];
                    for (r = u.shift(); r; ) if (e.responseFields[r] && (n[e.responseFields[r]] = t), 
                    !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = r, r = u.shift()) if ("*" === r) r = l; else if ("*" !== l && l !== r) {
                        if (!(s = c[l + " " + r] || c["* " + r])) for (o in c) if ((a = o.split(" "))[1] === r && (s = c[l + " " + a[0]] || c["* " + a[0]])) {
                            !0 === s ? s = c[o] : !0 !== c[o] && (r = a[0], u.unshift(a[1]));
                            break;
                        }
                        if (!0 !== s) if (s && e.throws) t = s(t); else try {
                            t = s(t);
                        } catch (e) {
                            return {
                                state: "parsererror",
                                error: s ? e : "No conversion from " + l + " to " + r
                            };
                        }
                    }
                    return {
                        state: "success",
                        data: t
                    };
                }(g, a, k, o), o ? (g.ifModified && ((l = k.getResponseHeader("Last-Modified")) && (C.lastModified[d] = l), 
                (l = k.getResponseHeader("etag")) && (C.etag[d] = l)), 204 === e || "HEAD" === g.type ? c = "nocontent" : 304 === e ? c = "notmodified" : (c = a.state, 
                r = a.data, o = !(s = a.error))) : (s = c, !e && c || (c = "error", e < 0 && (e = 0))), 
                k.status = e, k.statusText = (t || c) + "", o ? b.resolveWith(m, [ r, c, k ]) : b.rejectWith(m, [ k, c, s ]), 
                k.statusCode(x), x = void 0, v && y.trigger(o ? "ajaxSuccess" : "ajaxError", [ k, g, o ? r : s ]), 
                w.fireWith(m, [ k, c ]), v && (y.trigger("ajaxComplete", [ k, g ]), --C.active || C.event.trigger("ajaxStop")));
            }
            return k;
        },
        getJSON: function(e, t, n) {
            return C.get(e, t, n, "json");
        },
        getScript: function(e, t) {
            return C.get(e, void 0, t, "script");
        }
    }), C.each([ "get", "post" ], function(e, o) {
        C[o] = function(e, t, n, i) {
            return C.isFunction(t) && (i = i || n, n = t, t = void 0), C.ajax(C.extend({
                url: e,
                type: o,
                dataType: i,
                data: t,
                success: n
            }, C.isPlainObject(e) && e));
        };
    }), C._evalUrl = function(e) {
        return C.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            throws: !0
        });
    }, C.fn.extend({
        wrapAll: function(e) {
            var t;
            return this[0] && (C.isFunction(e) && (e = e.call(this[0])), t = C(e, this[0].ownerDocument).eq(0).clone(!0), 
            this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                for (var e = this; e.firstElementChild; ) e = e.firstElementChild;
                return e;
            }).append(this)), this;
        },
        wrapInner: function(n) {
            return C.isFunction(n) ? this.each(function(e) {
                C(this).wrapInner(n.call(this, e));
            }) : this.each(function() {
                var e = C(this), t = e.contents();
                t.length ? t.wrapAll(n) : e.append(n);
            });
        },
        wrap: function(t) {
            var n = C.isFunction(t);
            return this.each(function(e) {
                C(this).wrapAll(n ? t.call(this, e) : t);
            });
        },
        unwrap: function(e) {
            return this.parent(e).not("body").each(function() {
                C(this).replaceWith(this.childNodes);
            }), this;
        }
    }), C.expr.pseudos.hidden = function(e) {
        return !C.expr.pseudos.visible(e);
    }, C.expr.pseudos.visible = function(e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
    }, C.ajaxSettings.xhr = function() {
        try {
            return new T.XMLHttpRequest();
        } catch (e) {}
    };
    var Ot = {
        0: 200,
        1223: 204
    }, Ht = C.ajaxSettings.xhr();
    g.cors = !!Ht && "withCredentials" in Ht, g.ajax = Ht = !!Ht, C.ajaxTransport(function(o) {
        var r, s;
        if (g.cors || Ht && !o.crossDomain) return {
            send: function(e, t) {
                var n, i = o.xhr();
                if (i.open(o.type, o.url, o.async, o.username, o.password), o.xhrFields) for (n in o.xhrFields) i[n] = o.xhrFields[n];
                for (n in o.mimeType && i.overrideMimeType && i.overrideMimeType(o.mimeType), o.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"), 
                e) i.setRequestHeader(n, e[n]);
                r = function(e) {
                    return function() {
                        r && (r = s = i.onload = i.onerror = i.onabort = i.onreadystatechange = null, "abort" === e ? i.abort() : "error" === e ? "number" != typeof i.status ? t(0, "error") : t(i.status, i.statusText) : t(Ot[i.status] || i.status, i.statusText, "text" !== (i.responseType || "text") || "string" != typeof i.responseText ? {
                            binary: i.response
                        } : {
                            text: i.responseText
                        }, i.getAllResponseHeaders()));
                    };
                }, i.onload = r(), s = i.onerror = r("error"), void 0 !== i.onabort ? i.onabort = s : i.onreadystatechange = function() {
                    4 === i.readyState && T.setTimeout(function() {
                        r && s();
                    });
                }, r = r("abort");
                try {
                    i.send(o.hasContent && o.data || null);
                } catch (e) {
                    if (r) throw e;
                }
            },
            abort: function() {
                r && r();
            }
        };
    }), C.ajaxPrefilter(function(e) {
        e.crossDomain && (e.contents.script = !1);
    }), C.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return C.globalEval(e), e;
            }
        }
    }), C.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
    }), C.ajaxTransport("script", function(n) {
        var i, o;
        if (n.crossDomain) return {
            send: function(e, t) {
                i = C("<script>").prop({
                    charset: n.scriptCharset,
                    src: n.url
                }).on("load error", o = function(e) {
                    i.remove(), o = null, e && t("error" === e.type ? 404 : 200, e.type);
                }), S.head.appendChild(i[0]);
            },
            abort: function() {
                o && o();
            }
        };
    });
    var Pt, qt = [], zt = /(=)\?(?=&|$)|\?\?/;
    function Mt(e) {
        return C.isWindow(e) ? e : 9 === e.nodeType && e.defaultView;
    }
    C.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = qt.pop() || C.expando + "_" + ht++;
            return this[e] = !0, e;
        }
    }), C.ajaxPrefilter("json jsonp", function(e, t, n) {
        var i, o, r, s = !1 !== e.jsonp && (zt.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && zt.test(e.data) && "data");
        if (s || "jsonp" === e.dataTypes[0]) return i = e.jsonpCallback = C.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, 
        s ? e[s] = e[s].replace(zt, "$1" + i) : !1 !== e.jsonp && (e.url += (vt.test(e.url) ? "&" : "?") + e.jsonp + "=" + i), 
        e.converters["script json"] = function() {
            return r || C.error(i + " was not called"), r[0];
        }, e.dataTypes[0] = "json", o = T[i], T[i] = function() {
            r = arguments;
        }, n.always(function() {
            void 0 === o ? C(T).removeProp(i) : T[i] = o, e[i] && (e.jsonpCallback = t.jsonpCallback, 
            qt.push(i)), r && C.isFunction(o) && o(r[0]), r = o = void 0;
        }), "script";
    }), g.createHTMLDocument = ((Pt = S.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 
    2 === Pt.childNodes.length), C.parseHTML = function(e, t, n) {
        return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (g.createHTMLDocument ? ((i = (t = S.implementation.createHTMLDocument("")).createElement("base")).href = S.location.href, 
        t.head.appendChild(i)) : t = S), r = !n && [], (o = N.exec(e)) ? [ t.createElement(o[1]) ] : (o = fe([ e ], t, r), 
        r && r.length && C(r).remove(), C.merge([], o.childNodes)));
        var i, o, r;
    }, C.fn.load = function(e, t, n) {
        var i, o, r, s = this, a = e.indexOf(" ");
        return -1 < a && (i = ct(e.slice(a)), e = e.slice(0, a)), C.isFunction(t) ? (n = t, 
        t = void 0) : t && "object" == typeof t && (o = "POST"), 0 < s.length && C.ajax({
            url: e,
            type: o || "GET",
            dataType: "html",
            data: t
        }).done(function(e) {
            r = arguments, s.html(i ? C("<div>").append(C.parseHTML(e)).find(i) : e);
        }).always(n && function(e, t) {
            s.each(function() {
                n.apply(this, r || [ e.responseText, t, e ]);
            });
        }), this;
    }, C.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(e, t) {
        C.fn[t] = function(e) {
            return this.on(t, e);
        };
    }), C.expr.pseudos.animated = function(t) {
        return C.grep(C.timers, function(e) {
            return t === e.elem;
        }).length;
    }, C.offset = {
        setOffset: function(e, t, n) {
            var i, o, r, s, a, l, c = C.css(e, "position"), u = C(e), d = {};
            "static" === c && (e.style.position = "relative"), a = u.offset(), r = C.css(e, "top"), 
            l = C.css(e, "left"), o = ("absolute" === c || "fixed" === c) && -1 < (r + l).indexOf("auto") ? (s = (i = u.position()).top, 
            i.left) : (s = parseFloat(r) || 0, parseFloat(l) || 0), C.isFunction(t) && (t = t.call(e, n, C.extend({}, a))), 
            null != t.top && (d.top = t.top - a.top + s), null != t.left && (d.left = t.left - a.left + o), 
            "using" in t ? t.using.call(e, d) : u.css(d);
        }
    }, C.fn.extend({
        offset: function(t) {
            if (arguments.length) return void 0 === t ? this : this.each(function(e) {
                C.offset.setOffset(this, t, e);
            });
            var e, n, i, o, r = this[0];
            return r ? r.getClientRects().length ? (i = r.getBoundingClientRect()).width || i.height ? (n = Mt(o = r.ownerDocument), 
            e = o.documentElement, {
                top: i.top + n.pageYOffset - e.clientTop,
                left: i.left + n.pageXOffset - e.clientLeft
            }) : i : {
                top: 0,
                left: 0
            } : void 0;
        },
        position: function() {
            if (this[0]) {
                var e, t, n = this[0], i = {
                    top: 0,
                    left: 0
                };
                return "fixed" === C.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), 
                t = this.offset(), C.nodeName(e[0], "html") || (i = e.offset()), i = {
                    top: i.top + C.css(e[0], "borderTopWidth", !0),
                    left: i.left + C.css(e[0], "borderLeftWidth", !0)
                }), {
                    top: t.top - i.top - C.css(n, "marginTop", !0),
                    left: t.left - i.left - C.css(n, "marginLeft", !0)
                };
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent; e && "static" === C.css(e, "position"); ) e = e.offsetParent;
                return e || he;
            });
        }
    }), C.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, o) {
        var r = "pageYOffset" === o;
        C.fn[t] = function(e) {
            return R(this, function(e, t, n) {
                var i = Mt(e);
                if (void 0 === n) return i ? i[o] : e[t];
                i ? i.scrollTo(r ? i.pageXOffset : n, r ? n : i.pageYOffset) : e[t] = n;
            }, t, e, arguments.length);
        };
    }), C.each([ "top", "left" ], function(e, n) {
        C.cssHooks[n] = qe(g.pixelPosition, function(e, t) {
            if (t) return t = Pe(e, n), Oe.test(t) ? C(e).position()[n] + "px" : t;
        });
    }), C.each({
        Height: "height",
        Width: "width"
    }, function(s, a) {
        C.each({
            padding: "inner" + s,
            content: a,
            "": "outer" + s
        }, function(i, r) {
            C.fn[r] = function(e, t) {
                var n = arguments.length && (i || "boolean" != typeof e), o = i || (!0 === e || !0 === t ? "margin" : "border");
                return R(this, function(e, t, n) {
                    var i;
                    return C.isWindow(e) ? 0 === r.indexOf("outer") ? e["inner" + s] : e.document.documentElement["client" + s] : 9 === e.nodeType ? (i = e.documentElement, 
                    Math.max(e.body["scroll" + s], i["scroll" + s], e.body["offset" + s], i["offset" + s], i["client" + s])) : void 0 === n ? C.css(e, t, o) : C.style(e, t, n, o);
                }, a, n ? e : void 0, n);
            };
        });
    }), C.fn.extend({
        bind: function(e, t, n) {
            return this.on(e, null, t, n);
        },
        unbind: function(e, t) {
            return this.off(e, null, t);
        },
        delegate: function(e, t, n, i) {
            return this.on(t, e, n, i);
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
        }
    }), C.parseJSON = JSON.parse, "function" == typeof define && define.amd && define("jquery", [], function() {
        return C;
    });
    var It = T.jQuery, Wt = T.$;
    return C.noConflict = function(e) {
        return T.$ === C && (T.$ = Wt), e && T.jQuery === C && (T.jQuery = It), C;
    }, e || (T.jQuery = T.$ = C), C;
}), function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define([ "jquery" ], e) : "undefined" != typeof exports ? module.exports = e(require("jquery")) : e(jQuery);
}(function(c) {
    "use strict";
    var o, s = window.Slick || {};
    o = 0, (s = function(e, t) {
        var n, i = this;
        i.defaults = {
            accessibility: !0,
            adaptiveHeight: !1,
            appendArrows: c(e),
            appendDots: c(e),
            arrows: !0,
            asNavFor: null,
            prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
            nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
            autoplay: !1,
            autoplaySpeed: 3e3,
            centerMode: !1,
            centerPadding: "50px",
            cssEase: "ease",
            customPaging: function(e, t) {
                return c('<button type="button" />').text(t + 1);
            },
            dots: !1,
            dotsClass: "slick-dots",
            draggable: !0,
            easing: "linear",
            edgeFriction: .35,
            fade: !1,
            focusOnSelect: !1,
            focusOnChange: !1,
            infinite: !0,
            initialSlide: 0,
            lazyLoad: "ondemand",
            mobileFirst: !1,
            pauseOnHover: !0,
            pauseOnFocus: !0,
            pauseOnDotsHover: !1,
            respondTo: "window",
            responsive: null,
            rows: 1,
            rtl: !1,
            slide: "",
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            swipe: !0,
            swipeToSlide: !1,
            touchMove: !0,
            touchThreshold: 5,
            useCSS: !0,
            useTransform: !0,
            variableWidth: !1,
            vertical: !1,
            verticalSwiping: !1,
            waitForAnimate: !0,
            zIndex: 1e3
        }, i.initials = {
            animating: !1,
            dragging: !1,
            autoPlayTimer: null,
            currentDirection: 0,
            currentLeft: null,
            currentSlide: 0,
            direction: 1,
            $dots: null,
            listWidth: null,
            listHeight: null,
            loadIndex: 0,
            $nextArrow: null,
            $prevArrow: null,
            scrolling: !1,
            slideCount: null,
            slideWidth: null,
            $slideTrack: null,
            $slides: null,
            sliding: !1,
            slideOffset: 0,
            swipeLeft: null,
            swiping: !1,
            $list: null,
            touchObject: {},
            transformsEnabled: !1,
            unslicked: !1
        }, c.extend(i, i.initials), i.activeBreakpoint = null, i.animType = null, i.animProp = null, 
        i.breakpoints = [], i.breakpointSettings = [], i.cssTransitions = !1, i.focussed = !1, 
        i.interrupted = !1, i.hidden = "hidden", i.paused = !0, i.positionProp = null, i.respondTo = null, 
        i.rowCount = 1, i.shouldClick = !0, i.$slider = c(e), i.$slidesCache = null, i.transformType = null, 
        i.transitionType = null, i.visibilityChange = "visibilitychange", i.windowWidth = 0, 
        i.windowTimer = null, n = c(e).data("slick") || {}, i.options = c.extend({}, i.defaults, t, n), 
        i.currentSlide = i.options.initialSlide, i.originalSettings = i.options, void 0 !== document.mozHidden ? (i.hidden = "mozHidden", 
        i.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (i.hidden = "webkitHidden", 
        i.visibilityChange = "webkitvisibilitychange"), i.autoPlay = c.proxy(i.autoPlay, i), 
        i.autoPlayClear = c.proxy(i.autoPlayClear, i), i.autoPlayIterator = c.proxy(i.autoPlayIterator, i), 
        i.changeSlide = c.proxy(i.changeSlide, i), i.clickHandler = c.proxy(i.clickHandler, i), 
        i.selectHandler = c.proxy(i.selectHandler, i), i.setPosition = c.proxy(i.setPosition, i), 
        i.swipeHandler = c.proxy(i.swipeHandler, i), i.dragHandler = c.proxy(i.dragHandler, i), 
        i.keyHandler = c.proxy(i.keyHandler, i), i.instanceUid = o++, i.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, 
        i.registerBreakpoints(), i.init(!0);
    }).prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        });
    }, s.prototype.addSlide = s.prototype.slickAdd = function(e, t, n) {
        var i = this;
        if ("boolean" == typeof t) n = t, t = null; else if (t < 0 || t >= i.slideCount) return !1;
        i.unload(), "number" == typeof t ? 0 === t && 0 === i.$slides.length ? c(e).appendTo(i.$slideTrack) : n ? c(e).insertBefore(i.$slides.eq(t)) : c(e).insertAfter(i.$slides.eq(t)) : !0 === n ? c(e).prependTo(i.$slideTrack) : c(e).appendTo(i.$slideTrack), 
        i.$slides = i.$slideTrack.children(this.options.slide), i.$slideTrack.children(this.options.slide).detach(), 
        i.$slideTrack.append(i.$slides), i.$slides.each(function(e, t) {
            c(t).attr("data-slick-index", e);
        }), i.$slidesCache = i.$slides, i.reinit();
    }, s.prototype.animateHeight = function() {
        var e = this;
        if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
            e.$list.animate({
                height: t
            }, e.options.speed);
        }
    }, s.prototype.animateSlide = function(e, t) {
        var n = {}, i = this;
        i.animateHeight(), !0 === i.options.rtl && !1 === i.options.vertical && (e = -e), 
        !1 === i.transformsEnabled ? !1 === i.options.vertical ? i.$slideTrack.animate({
            left: e
        }, i.options.speed, i.options.easing, t) : i.$slideTrack.animate({
            top: e
        }, i.options.speed, i.options.easing, t) : !1 === i.cssTransitions ? (!0 === i.options.rtl && (i.currentLeft = -i.currentLeft), 
        c({
            animStart: i.currentLeft
        }).animate({
            animStart: e
        }, {
            duration: i.options.speed,
            easing: i.options.easing,
            step: function(e) {
                e = Math.ceil(e), !1 === i.options.vertical ? n[i.animType] = "translate(" + e + "px, 0px)" : n[i.animType] = "translate(0px," + e + "px)", 
                i.$slideTrack.css(n);
            },
            complete: function() {
                t && t.call();
            }
        })) : (i.applyTransition(), e = Math.ceil(e), !1 === i.options.vertical ? n[i.animType] = "translate3d(" + e + "px, 0px, 0px)" : n[i.animType] = "translate3d(0px," + e + "px, 0px)", 
        i.$slideTrack.css(n), t && setTimeout(function() {
            i.disableTransition(), t.call();
        }, i.options.speed));
    }, s.prototype.getNavTarget = function() {
        var e = this.options.asNavFor;
        return e && null !== e && (e = c(e).not(this.$slider)), e;
    }, s.prototype.asNavFor = function(t) {
        var e = this.getNavTarget();
        null !== e && "object" == typeof e && e.each(function() {
            var e = c(this).slick("getSlick");
            e.unslicked || e.slideHandler(t, !0);
        });
    }, s.prototype.applyTransition = function(e) {
        var t = this, n = {};
        !1 === t.options.fade ? n[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : n[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase, 
        !1 === t.options.fade ? t.$slideTrack.css(n) : t.$slides.eq(e).css(n);
    }, s.prototype.autoPlay = function() {
        var e = this;
        e.autoPlayClear(), e.slideCount > e.options.slidesToShow && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed));
    }, s.prototype.autoPlayClear = function() {
        this.autoPlayTimer && clearInterval(this.autoPlayTimer);
    }, s.prototype.autoPlayIterator = function() {
        var e = this, t = e.currentSlide + e.options.slidesToScroll;
        e.paused || e.interrupted || e.focussed || (!1 === e.options.infinite && (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1 ? e.direction = 0 : 0 === e.direction && (t = e.currentSlide - e.options.slidesToScroll, 
        e.currentSlide - 1 == 0 && (e.direction = 1))), e.slideHandler(t));
    }, s.prototype.buildArrows = function() {
        var e = this;
        !0 === e.options.arrows && (e.$prevArrow = c(e.options.prevArrow).addClass("slick-arrow"), 
        e.$nextArrow = c(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), 
        e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), 
        e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), 
        !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }));
    }, s.prototype.buildDots = function() {
        var e, t, n = this;
        if (!0 === n.options.dots && n.slideCount > n.options.slidesToShow) {
            for (n.$slider.addClass("slick-dotted"), t = c("<ul />").addClass(n.options.dotsClass), 
            e = 0; e <= n.getDotCount(); e += 1) t.append(c("<li />").append(n.options.customPaging.call(this, n, e)));
            n.$dots = t.appendTo(n.options.appendDots), n.$dots.find("li").first().addClass("slick-active");
        }
    }, s.prototype.buildOut = function() {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), 
        e.slideCount = e.$slides.length, e.$slides.each(function(e, t) {
            c(t).attr("data-slick-index", e).data("originalStyling", c(t).attr("style") || "");
        }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? c('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), 
        e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), 
        !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), 
        c("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), 
        e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), 
        !0 === e.options.draggable && e.$list.addClass("draggable");
    }, s.prototype.buildRows = function() {
        var e, t, n, i, o, r, s, a = this;
        if (i = document.createDocumentFragment(), r = a.$slider.children(), 0 < a.options.rows) {
            for (s = a.options.slidesPerRow * a.options.rows, o = Math.ceil(r.length / s), e = 0; e < o; e++) {
                var l = document.createElement("div");
                for (t = 0; t < a.options.rows; t++) {
                    var c = document.createElement("div");
                    for (n = 0; n < a.options.slidesPerRow; n++) {
                        var u = e * s + (t * a.options.slidesPerRow + n);
                        r.get(u) && c.appendChild(r.get(u));
                    }
                    l.appendChild(c);
                }
                i.appendChild(l);
            }
            a.$slider.empty().append(i), a.$slider.children().children().children().css({
                width: 100 / a.options.slidesPerRow + "%",
                display: "inline-block"
            });
        }
    }, s.prototype.checkResponsive = function(e, t) {
        var n, i, o, r = this, s = !1, a = r.$slider.width(), l = window.innerWidth || c(window).width();
        if ("window" === r.respondTo ? o = l : "slider" === r.respondTo ? o = a : "min" === r.respondTo && (o = Math.min(l, a)), 
        r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
            for (n in i = null, r.breakpoints) r.breakpoints.hasOwnProperty(n) && (!1 === r.originalSettings.mobileFirst ? o < r.breakpoints[n] && (i = r.breakpoints[n]) : o > r.breakpoints[n] && (i = r.breakpoints[n]));
            null !== i ? null !== r.activeBreakpoint ? (i !== r.activeBreakpoint || t) && (r.activeBreakpoint = i, 
            "unslick" === r.breakpointSettings[i] ? r.unslick(i) : (r.options = c.extend({}, r.originalSettings, r.breakpointSettings[i]), 
            !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), s = i) : (r.activeBreakpoint = i, 
            "unslick" === r.breakpointSettings[i] ? r.unslick(i) : (r.options = c.extend({}, r.originalSettings, r.breakpointSettings[i]), 
            !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), s = i) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, 
            r.options = r.originalSettings, !0 === e && (r.currentSlide = r.options.initialSlide), 
            r.refresh(e), s = i), e || !1 === s || r.$slider.trigger("breakpoint", [ r, s ]);
        }
    }, s.prototype.changeSlide = function(e, t) {
        var n, i, o = this, r = c(e.currentTarget);
        switch (r.is("a") && e.preventDefault(), r.is("li") || (r = r.closest("li")), n = o.slideCount % o.options.slidesToScroll != 0 ? 0 : (o.slideCount - o.currentSlide) % o.options.slidesToScroll, 
        e.data.message) {
          case "previous":
            i = 0 === n ? o.options.slidesToScroll : o.options.slidesToShow - n, o.slideCount > o.options.slidesToShow && o.slideHandler(o.currentSlide - i, !1, t);
            break;

          case "next":
            i = 0 === n ? o.options.slidesToScroll : n, o.slideCount > o.options.slidesToShow && o.slideHandler(o.currentSlide + i, !1, t);
            break;

          case "index":
            var s = 0 === e.data.index ? 0 : e.data.index || r.index() * o.options.slidesToScroll;
            o.slideHandler(o.checkNavigable(s), !1, t), r.children().trigger("focus");
            break;

          default:
            return;
        }
    }, s.prototype.checkNavigable = function(e) {
        var t, n;
        if (n = 0, e > (t = this.getNavigableIndexes())[t.length - 1]) e = t[t.length - 1]; else for (var i in t) {
            if (e < t[i]) {
                e = n;
                break;
            }
            n = t[i];
        }
        return e;
    }, s.prototype.cleanUpEvents = function() {
        var e = this;
        e.options.dots && null !== e.$dots && (c("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", c.proxy(e.interrupt, e, !0)).off("mouseleave.slick", c.proxy(e.interrupt, e, !1)), 
        !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), 
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), 
        e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), 
        e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), 
        e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), 
        e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), 
        c(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), 
        !0 === e.options.focusOnSelect && c(e.$slideTrack).children().off("click.slick", e.selectHandler), 
        c(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), 
        c(window).off("resize.slick.slick-" + e.instanceUid, e.resize), c("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), 
        c(window).off("load.slick.slick-" + e.instanceUid, e.setPosition);
    }, s.prototype.cleanUpSlideEvents = function() {
        var e = this;
        e.$list.off("mouseenter.slick", c.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", c.proxy(e.interrupt, e, !1));
    }, s.prototype.cleanUpRows = function() {
        var e;
        0 < this.options.rows && ((e = this.$slides.children().children()).removeAttr("style"), 
        this.$slider.empty().append(e));
    }, s.prototype.clickHandler = function(e) {
        !1 === this.shouldClick && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault());
    }, s.prototype.destroy = function(e) {
        var t = this;
        t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), c(".slick-cloned", t.$slider).detach(), 
        t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), 
        t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), 
        t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            c(this).attr("style", c(this).data("originalStyling"));
        }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), 
        t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), 
        t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), 
        t.unslicked = !0, e || t.$slider.trigger("destroy", [ t ]);
    }, s.prototype.disableTransition = function(e) {
        var t = {};
        t[this.transitionType] = "", !1 === this.options.fade ? this.$slideTrack.css(t) : this.$slides.eq(e).css(t);
    }, s.prototype.fadeSlide = function(e, t) {
        var n = this;
        !1 === n.cssTransitions ? (n.$slides.eq(e).css({
            zIndex: n.options.zIndex
        }), n.$slides.eq(e).animate({
            opacity: 1
        }, n.options.speed, n.options.easing, t)) : (n.applyTransition(e), n.$slides.eq(e).css({
            opacity: 1,
            zIndex: n.options.zIndex
        }), t && setTimeout(function() {
            n.disableTransition(e), t.call();
        }, n.options.speed));
    }, s.prototype.fadeSlideOut = function(e) {
        var t = this;
        !1 === t.cssTransitions ? t.$slides.eq(e).animate({
            opacity: 0,
            zIndex: t.options.zIndex - 2
        }, t.options.speed, t.options.easing) : (t.applyTransition(e), t.$slides.eq(e).css({
            opacity: 0,
            zIndex: t.options.zIndex - 2
        }));
    }, s.prototype.filterSlides = s.prototype.slickFilter = function(e) {
        var t = this;
        null !== e && (t.$slidesCache = t.$slides, t.unload(), t.$slideTrack.children(this.options.slide).detach(), 
        t.$slidesCache.filter(e).appendTo(t.$slideTrack), t.reinit());
    }, s.prototype.focusHandler = function() {
        var n = this;
        n.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(e) {
            e.stopImmediatePropagation();
            var t = c(this);
            setTimeout(function() {
                n.options.pauseOnFocus && (n.focussed = t.is(":focus"), n.autoPlay());
            }, 0);
        });
    }, s.prototype.getCurrent = s.prototype.slickCurrentSlide = function() {
        return this.currentSlide;
    }, s.prototype.getDotCount = function() {
        var e = this, t = 0, n = 0, i = 0;
        if (!0 === e.options.infinite) if (e.slideCount <= e.options.slidesToShow) ++i; else for (;t < e.slideCount; ) ++i, 
        t = n + e.options.slidesToScroll, n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow; else if (!0 === e.options.centerMode) i = e.slideCount; else if (e.options.asNavFor) for (;t < e.slideCount; ) ++i, 
        t = n + e.options.slidesToScroll, n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow; else i = 1 + Math.ceil((e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll);
        return i - 1;
    }, s.prototype.getLeft = function(e) {
        var t, n, i, o, r = this, s = 0;
        return r.slideOffset = 0, n = r.$slides.first().outerHeight(!0), !0 === r.options.infinite ? (r.slideCount > r.options.slidesToShow && (r.slideOffset = r.slideWidth * r.options.slidesToShow * -1, 
        o = -1, !0 === r.options.vertical && !0 === r.options.centerMode && (2 === r.options.slidesToShow ? o = -1.5 : 1 === r.options.slidesToShow && (o = -2)), 
        s = n * r.options.slidesToShow * o), r.slideCount % r.options.slidesToScroll != 0 && e + r.options.slidesToScroll > r.slideCount && r.slideCount > r.options.slidesToShow && (s = e > r.slideCount ? (r.slideOffset = (r.options.slidesToShow - (e - r.slideCount)) * r.slideWidth * -1, 
        (r.options.slidesToShow - (e - r.slideCount)) * n * -1) : (r.slideOffset = r.slideCount % r.options.slidesToScroll * r.slideWidth * -1, 
        r.slideCount % r.options.slidesToScroll * n * -1))) : e + r.options.slidesToShow > r.slideCount && (r.slideOffset = (e + r.options.slidesToShow - r.slideCount) * r.slideWidth, 
        s = (e + r.options.slidesToShow - r.slideCount) * n), r.slideCount <= r.options.slidesToShow && (s = r.slideOffset = 0), 
        !0 === r.options.centerMode && r.slideCount <= r.options.slidesToShow ? r.slideOffset = r.slideWidth * Math.floor(r.options.slidesToShow) / 2 - r.slideWidth * r.slideCount / 2 : !0 === r.options.centerMode && !0 === r.options.infinite ? r.slideOffset += r.slideWidth * Math.floor(r.options.slidesToShow / 2) - r.slideWidth : !0 === r.options.centerMode && (r.slideOffset = 0, 
        r.slideOffset += r.slideWidth * Math.floor(r.options.slidesToShow / 2)), t = !1 === r.options.vertical ? e * r.slideWidth * -1 + r.slideOffset : e * n * -1 + s, 
        !0 === r.options.variableWidth && (i = r.slideCount <= r.options.slidesToShow || !1 === r.options.infinite ? r.$slideTrack.children(".slick-slide").eq(e) : r.$slideTrack.children(".slick-slide").eq(e + r.options.slidesToShow), 
        t = !0 === r.options.rtl ? i[0] ? -1 * (r.$slideTrack.width() - i[0].offsetLeft - i.width()) : 0 : i[0] ? -1 * i[0].offsetLeft : 0, 
        !0 === r.options.centerMode && (i = r.slideCount <= r.options.slidesToShow || !1 === r.options.infinite ? r.$slideTrack.children(".slick-slide").eq(e) : r.$slideTrack.children(".slick-slide").eq(e + r.options.slidesToShow + 1), 
        t = !0 === r.options.rtl ? i[0] ? -1 * (r.$slideTrack.width() - i[0].offsetLeft - i.width()) : 0 : i[0] ? -1 * i[0].offsetLeft : 0, 
        t += (r.$list.width() - i.outerWidth()) / 2)), t;
    }, s.prototype.getOption = s.prototype.slickGetOption = function(e) {
        return this.options[e];
    }, s.prototype.getNavigableIndexes = function() {
        var e, t = this, n = 0, i = 0, o = [];
        for (e = !1 === t.options.infinite ? t.slideCount : (n = -1 * t.options.slidesToScroll, 
        i = -1 * t.options.slidesToScroll, 2 * t.slideCount); n < e; ) o.push(n), n = i + t.options.slidesToScroll, 
        i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
        return o;
    }, s.prototype.getSlick = function() {
        return this;
    }, s.prototype.getSlideCount = function() {
        var n, i, o = this;
        return i = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, 
        !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function(e, t) {
            if (t.offsetLeft - i + c(t).outerWidth() / 2 > -1 * o.swipeLeft) return n = t, !1;
        }), Math.abs(c(n).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll;
    }, s.prototype.goTo = s.prototype.slickGoTo = function(e, t) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(e)
            }
        }, t);
    }, s.prototype.init = function(e) {
        var t = this;
        c(t.$slider).hasClass("slick-initialized") || (c(t.$slider).addClass("slick-initialized"), 
        t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), 
        t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [ t ]), 
        !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, 
        t.autoPlay());
    }, s.prototype.initADA = function() {
        var i = this, n = Math.ceil(i.slideCount / i.options.slidesToShow), o = i.getNavigableIndexes().filter(function(e) {
            return 0 <= e && e < i.slideCount;
        });
        i.$slides.add(i.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), null !== i.$dots && (i.$slides.not(i.$slideTrack.find(".slick-cloned")).each(function(e) {
            var t = o.indexOf(e);
            if (c(this).attr({
                role: "tabpanel",
                id: "slick-slide" + i.instanceUid + e,
                tabindex: -1
            }), -1 !== t) {
                var n = "slick-slide-control" + i.instanceUid + t;
                c("#" + n).length && c(this).attr({
                    "aria-describedby": n
                });
            }
        }), i.$dots.attr("role", "tablist").find("li").each(function(e) {
            var t = o[e];
            c(this).attr({
                role: "presentation"
            }), c(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + i.instanceUid + e,
                "aria-controls": "slick-slide" + i.instanceUid + t,
                "aria-label": e + 1 + " of " + n,
                "aria-selected": null,
                tabindex: "-1"
            });
        }).eq(i.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var e = i.currentSlide, t = e + i.options.slidesToShow; e < t; e++) i.options.focusOnChange ? i.$slides.eq(e).attr({
            tabindex: "0"
        }) : i.$slides.eq(e).removeAttr("tabindex");
        i.activateADA();
    }, s.prototype.initArrowEvents = function() {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, e.changeSlide), e.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow.on("keydown.slick", e.keyHandler), 
        e.$nextArrow.on("keydown.slick", e.keyHandler)));
    }, s.prototype.initDotEvents = function() {
        var e = this;
        !0 === e.options.dots && e.slideCount > e.options.slidesToShow && (c("li", e.$dots).on("click.slick", {
            message: "index"
        }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), 
        !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && e.slideCount > e.options.slidesToShow && c("li", e.$dots).on("mouseenter.slick", c.proxy(e.interrupt, e, !0)).on("mouseleave.slick", c.proxy(e.interrupt, e, !1));
    }, s.prototype.initSlideEvents = function() {
        var e = this;
        e.options.pauseOnHover && (e.$list.on("mouseenter.slick", c.proxy(e.interrupt, e, !0)), 
        e.$list.on("mouseleave.slick", c.proxy(e.interrupt, e, !1)));
    }, s.prototype.initializeEvents = function() {
        var e = this;
        e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), c(document).on(e.visibilityChange, c.proxy(e.visibility, e)), 
        !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && c(e.$slideTrack).children().on("click.slick", e.selectHandler), 
        c(window).on("orientationchange.slick.slick-" + e.instanceUid, c.proxy(e.orientationChange, e)), 
        c(window).on("resize.slick.slick-" + e.instanceUid, c.proxy(e.resize, e)), c("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), 
        c(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), c(e.setPosition);
    }, s.prototype.initUI = function() {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(), 
        e.$nextArrow.show()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.show();
    }, s.prototype.keyHandler = function(e) {
        var t = this;
        e.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === e.keyCode && !0 === t.options.accessibility ? t.changeSlide({
            data: {
                message: !0 === t.options.rtl ? "next" : "previous"
            }
        }) : 39 === e.keyCode && !0 === t.options.accessibility && t.changeSlide({
            data: {
                message: !0 === t.options.rtl ? "previous" : "next"
            }
        }));
    }, s.prototype.lazyLoad = function() {
        var e, t, n, r = this;
        function i(e) {
            c("img[data-lazy]", e).each(function() {
                var e = c(this), t = c(this).attr("data-lazy"), n = c(this).attr("data-srcset"), i = c(this).attr("data-sizes") || r.$slider.attr("data-sizes"), o = document.createElement("img");
                o.onload = function() {
                    e.animate({
                        opacity: 0
                    }, 100, function() {
                        n && (e.attr("srcset", n), i && e.attr("sizes", i)), e.attr("src", t).animate({
                            opacity: 1
                        }, 200, function() {
                            e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading");
                        }), r.$slider.trigger("lazyLoaded", [ r, e, t ]);
                    });
                }, o.onerror = function() {
                    e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), 
                    r.$slider.trigger("lazyLoadError", [ r, e, t ]);
                }, o.src = t;
            });
        }
        if (!0 === r.options.centerMode ? n = !0 === r.options.infinite ? (t = r.currentSlide + (r.options.slidesToShow / 2 + 1)) + r.options.slidesToShow + 2 : (t = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1)), 
        r.options.slidesToShow / 2 + 1 + 2 + r.currentSlide) : (t = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide, 
        n = Math.ceil(t + r.options.slidesToShow), !0 === r.options.fade && (0 < t && t--, 
        n <= r.slideCount && n++)), e = r.$slider.find(".slick-slide").slice(t, n), "anticipated" === r.options.lazyLoad) for (var o = t - 1, s = n, a = r.$slider.find(".slick-slide"), l = 0; l < r.options.slidesToScroll; l++) o < 0 && (o = r.slideCount - 1), 
        e = (e = e.add(a.eq(o))).add(a.eq(s)), o--, s++;
        i(e), r.slideCount <= r.options.slidesToShow ? i(r.$slider.find(".slick-slide")) : r.currentSlide >= r.slideCount - r.options.slidesToShow ? i(r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow)) : 0 === r.currentSlide && i(r.$slider.find(".slick-cloned").slice(-1 * r.options.slidesToShow));
    }, s.prototype.loadSlider = function() {
        var e = this;
        e.setPosition(), e.$slideTrack.css({
            opacity: 1
        }), e.$slider.removeClass("slick-loading"), e.initUI(), "progressive" === e.options.lazyLoad && e.progressiveLazyLoad();
    }, s.prototype.next = s.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        });
    }, s.prototype.orientationChange = function() {
        this.checkResponsive(), this.setPosition();
    }, s.prototype.pause = s.prototype.slickPause = function() {
        this.autoPlayClear(), this.paused = !0;
    }, s.prototype.play = s.prototype.slickPlay = function() {
        var e = this;
        e.autoPlay(), e.options.autoplay = !0, e.paused = !1, e.focussed = !1, e.interrupted = !1;
    }, s.prototype.postSlide = function(e) {
        var t = this;
        t.unslicked || (t.$slider.trigger("afterChange", [ t, e ]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), 
        t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && (t.initADA(), 
        t.options.focusOnChange && c(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()));
    }, s.prototype.prev = s.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        });
    }, s.prototype.preventDefault = function(e) {
        e.preventDefault();
    }, s.prototype.progressiveLazyLoad = function(e) {
        e = e || 1;
        var t, n, i, o, r, s = this, a = c("img[data-lazy]", s.$slider);
        a.length ? (t = a.first(), n = t.attr("data-lazy"), i = t.attr("data-srcset"), o = t.attr("data-sizes") || s.$slider.attr("data-sizes"), 
        (r = document.createElement("img")).onload = function() {
            i && (t.attr("srcset", i), o && t.attr("sizes", o)), t.attr("src", n).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), 
            !0 === s.options.adaptiveHeight && s.setPosition(), s.$slider.trigger("lazyLoaded", [ s, t, n ]), 
            s.progressiveLazyLoad();
        }, r.onerror = function() {
            e < 3 ? setTimeout(function() {
                s.progressiveLazyLoad(e + 1);
            }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), 
            s.$slider.trigger("lazyLoadError", [ s, t, n ]), s.progressiveLazyLoad());
        }, r.src = n) : s.$slider.trigger("allImagesLoaded", [ s ]);
    }, s.prototype.refresh = function(e) {
        var t, n, i = this;
        n = i.slideCount - i.options.slidesToShow, !i.options.infinite && i.currentSlide > n && (i.currentSlide = n), 
        i.slideCount <= i.options.slidesToShow && (i.currentSlide = 0), t = i.currentSlide, 
        i.destroy(!0), c.extend(i, i.initials, {
            currentSlide: t
        }), i.init(), e || i.changeSlide({
            data: {
                message: "index",
                index: t
            }
        }, !1);
    }, s.prototype.registerBreakpoints = function() {
        var e, t, n, i = this, o = i.options.responsive || null;
        if ("array" === c.type(o) && o.length) {
            for (e in i.respondTo = i.options.respondTo || "window", o) if (n = i.breakpoints.length - 1, 
            o.hasOwnProperty(e)) {
                for (t = o[e].breakpoint; 0 <= n; ) i.breakpoints[n] && i.breakpoints[n] === t && i.breakpoints.splice(n, 1), 
                n--;
                i.breakpoints.push(t), i.breakpointSettings[t] = o[e].settings;
            }
            i.breakpoints.sort(function(e, t) {
                return i.options.mobileFirst ? e - t : t - e;
            });
        }
    }, s.prototype.reinit = function() {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, 
        e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), 
        e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), 
        e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), 
        e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), 
        e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && c(e.$slideTrack).children().on("click.slick", e.selectHandler), 
        e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), 
        e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [ e ]);
    }, s.prototype.resize = function() {
        var e = this;
        c(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() {
            e.windowWidth = c(window).width(), e.checkResponsive(), e.unslicked || e.setPosition();
        }, 50));
    }, s.prototype.removeSlide = s.prototype.slickRemove = function(e, t, n) {
        var i = this;
        if (e = "boolean" == typeof e ? !0 === (t = e) ? 0 : i.slideCount - 1 : !0 === t ? --e : e, 
        i.slideCount < 1 || e < 0 || e > i.slideCount - 1) return !1;
        i.unload(), !0 === n ? i.$slideTrack.children().remove() : i.$slideTrack.children(this.options.slide).eq(e).remove(), 
        i.$slides = i.$slideTrack.children(this.options.slide), i.$slideTrack.children(this.options.slide).detach(), 
        i.$slideTrack.append(i.$slides), i.$slidesCache = i.$slides, i.reinit();
    }, s.prototype.setCSS = function(e) {
        var t, n, i = this, o = {};
        !0 === i.options.rtl && (e = -e), t = "left" == i.positionProp ? Math.ceil(e) + "px" : "0px", 
        n = "top" == i.positionProp ? Math.ceil(e) + "px" : "0px", o[i.positionProp] = e, 
        !1 === i.transformsEnabled || (!(o = {}) === i.cssTransitions ? o[i.animType] = "translate(" + t + ", " + n + ")" : o[i.animType] = "translate3d(" + t + ", " + n + ", 0px)"), 
        i.$slideTrack.css(o);
    }, s.prototype.setDimensions = function() {
        var e = this;
        !1 === e.options.vertical ? !0 === e.options.centerMode && e.$list.css({
            padding: "0px " + e.options.centerPadding
        }) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), 
        !0 === e.options.centerMode && e.$list.css({
            padding: e.options.centerPadding + " 0px"
        })), e.listWidth = e.$list.width(), e.listHeight = e.$list.height(), !1 === e.options.vertical && !1 === e.options.variableWidth ? (e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), 
        e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length))) : !0 === e.options.variableWidth ? e.$slideTrack.width(5e3 * e.slideCount) : (e.slideWidth = Math.ceil(e.listWidth), 
        e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length)));
        var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
        !1 === e.options.variableWidth && e.$slideTrack.children(".slick-slide").width(e.slideWidth - t);
    }, s.prototype.setFade = function() {
        var n, i = this;
        i.$slides.each(function(e, t) {
            n = i.slideWidth * e * -1, !0 === i.options.rtl ? c(t).css({
                position: "relative",
                right: n,
                top: 0,
                zIndex: i.options.zIndex - 2,
                opacity: 0
            }) : c(t).css({
                position: "relative",
                left: n,
                top: 0,
                zIndex: i.options.zIndex - 2,
                opacity: 0
            });
        }), i.$slides.eq(i.currentSlide).css({
            zIndex: i.options.zIndex - 1,
            opacity: 1
        });
    }, s.prototype.setHeight = function() {
        var e = this;
        if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
            e.$list.css("height", t);
        }
    }, s.prototype.setOption = s.prototype.slickSetOption = function() {
        var e, t, n, i, o, r = this, s = !1;
        if ("object" === c.type(arguments[0]) ? (n = arguments[0], s = arguments[1], o = "multiple") : "string" === c.type(arguments[0]) && (n = arguments[0], 
        i = arguments[1], s = arguments[2], "responsive" === arguments[0] && "array" === c.type(arguments[1]) ? o = "responsive" : void 0 !== arguments[1] && (o = "single")), 
        "single" === o) r.options[n] = i; else if ("multiple" === o) c.each(n, function(e, t) {
            r.options[e] = t;
        }); else if ("responsive" === o) for (t in i) if ("array" !== c.type(r.options.responsive)) r.options.responsive = [ i[t] ]; else {
            for (e = r.options.responsive.length - 1; 0 <= e; ) r.options.responsive[e].breakpoint === i[t].breakpoint && r.options.responsive.splice(e, 1), 
            e--;
            r.options.responsive.push(i[t]);
        }
        s && (r.unload(), r.reinit());
    }, s.prototype.setPosition = function() {
        var e = this;
        e.setDimensions(), e.setHeight(), !1 === e.options.fade ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(), 
        e.$slider.trigger("setPosition", [ e ]);
    }, s.prototype.setProps = function() {
        var e = this, t = document.body.style;
        e.positionProp = !0 === e.options.vertical ? "top" : "left", "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"), 
        void 0 === t.WebkitTransition && void 0 === t.MozTransition && void 0 === t.msTransition || !0 === e.options.useCSS && (e.cssTransitions = !0), 
        e.options.fade && ("number" == typeof e.options.zIndex ? e.options.zIndex < 3 && (e.options.zIndex = 3) : e.options.zIndex = e.defaults.zIndex), 
        void 0 !== t.OTransform && (e.animType = "OTransform", e.transformType = "-o-transform", 
        e.transitionType = "OTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), 
        void 0 !== t.MozTransform && (e.animType = "MozTransform", e.transformType = "-moz-transform", 
        e.transitionType = "MozTransition", void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)), 
        void 0 !== t.webkitTransform && (e.animType = "webkitTransform", e.transformType = "-webkit-transform", 
        e.transitionType = "webkitTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), 
        void 0 !== t.msTransform && (e.animType = "msTransform", e.transformType = "-ms-transform", 
        e.transitionType = "msTransition", void 0 === t.msTransform && (e.animType = !1)), 
        void 0 !== t.transform && !1 !== e.animType && (e.animType = "transform", e.transformType = "transform", 
        e.transitionType = "transition"), e.transformsEnabled = e.options.useTransform && null !== e.animType && !1 !== e.animType;
    }, s.prototype.setSlideClasses = function(e) {
        var t, n, i, o, r = this;
        if (n = r.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), 
        r.$slides.eq(e).addClass("slick-current"), !0 === r.options.centerMode) {
            var s = r.options.slidesToShow % 2 == 0 ? 1 : 0;
            t = Math.floor(r.options.slidesToShow / 2), !0 === r.options.infinite && (t <= e && e <= r.slideCount - 1 - t ? r.$slides.slice(e - t + s, e + t + 1).addClass("slick-active").attr("aria-hidden", "false") : (i = r.options.slidesToShow + e, 
            n.slice(i - t + 1 + s, i + t + 2).addClass("slick-active").attr("aria-hidden", "false")), 
            0 === e ? n.eq(n.length - 1 - r.options.slidesToShow).addClass("slick-center") : e === r.slideCount - 1 && n.eq(r.options.slidesToShow).addClass("slick-center")), 
            r.$slides.eq(e).addClass("slick-center");
        } else 0 <= e && e <= r.slideCount - r.options.slidesToShow ? r.$slides.slice(e, e + r.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : n.length <= r.options.slidesToShow ? n.addClass("slick-active").attr("aria-hidden", "false") : (o = r.slideCount % r.options.slidesToShow, 
        i = !0 === r.options.infinite ? r.options.slidesToShow + e : e, r.options.slidesToShow == r.options.slidesToScroll && r.slideCount - e < r.options.slidesToShow ? n.slice(i - (r.options.slidesToShow - o), i + o).addClass("slick-active").attr("aria-hidden", "false") : n.slice(i, i + r.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== r.options.lazyLoad && "anticipated" !== r.options.lazyLoad || r.lazyLoad();
    }, s.prototype.setupInfinite = function() {
        var e, t, n, i = this;
        if (!0 === i.options.fade && (i.options.centerMode = !1), !0 === i.options.infinite && !1 === i.options.fade && (t = null, 
        i.slideCount > i.options.slidesToShow)) {
            for (n = !0 === i.options.centerMode ? i.options.slidesToShow + 1 : i.options.slidesToShow, 
            e = i.slideCount; e > i.slideCount - n; e -= 1) t = e - 1, c(i.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - i.slideCount).prependTo(i.$slideTrack).addClass("slick-cloned");
            for (e = 0; e < n + i.slideCount; e += 1) t = e, c(i.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + i.slideCount).appendTo(i.$slideTrack).addClass("slick-cloned");
            i.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                c(this).attr("id", "");
            });
        }
    }, s.prototype.interrupt = function(e) {
        e || this.autoPlay(), this.interrupted = e;
    }, s.prototype.selectHandler = function(e) {
        var t = c(e.target).is(".slick-slide") ? c(e.target) : c(e.target).parents(".slick-slide"), n = parseInt(t.attr("data-slick-index"));
        n || (n = 0), this.slideCount <= this.options.slidesToShow ? this.slideHandler(n, !1, !0) : this.slideHandler(n);
    }, s.prototype.slideHandler = function(e, t, n) {
        var i, o, r, s, a, l, c = this;
        if (t = t || !1, !(!0 === c.animating && !0 === c.options.waitForAnimate || !0 === c.options.fade && c.currentSlide === e)) if (!1 === t && c.asNavFor(e), 
        i = e, a = c.getLeft(i), s = c.getLeft(c.currentSlide), c.currentLeft = null === c.swipeLeft ? s : c.swipeLeft, 
        !1 === c.options.infinite && !1 === c.options.centerMode && (e < 0 || e > c.getDotCount() * c.options.slidesToScroll)) !1 === c.options.fade && (i = c.currentSlide, 
        !0 !== n && c.slideCount > c.options.slidesToShow ? c.animateSlide(s, function() {
            c.postSlide(i);
        }) : c.postSlide(i)); else if (!1 === c.options.infinite && !0 === c.options.centerMode && (e < 0 || e > c.slideCount - c.options.slidesToScroll)) !1 === c.options.fade && (i = c.currentSlide, 
        !0 !== n && c.slideCount > c.options.slidesToShow ? c.animateSlide(s, function() {
            c.postSlide(i);
        }) : c.postSlide(i)); else {
            if (c.options.autoplay && clearInterval(c.autoPlayTimer), o = i < 0 ? c.slideCount % c.options.slidesToScroll != 0 ? c.slideCount - c.slideCount % c.options.slidesToScroll : c.slideCount + i : i >= c.slideCount ? c.slideCount % c.options.slidesToScroll != 0 ? 0 : i - c.slideCount : i, 
            c.animating = !0, c.$slider.trigger("beforeChange", [ c, c.currentSlide, o ]), r = c.currentSlide, 
            c.currentSlide = o, c.setSlideClasses(c.currentSlide), c.options.asNavFor && (l = (l = c.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(c.currentSlide), 
            c.updateDots(), c.updateArrows(), !0 === c.options.fade) return !0 !== n ? (c.fadeSlideOut(r), 
            c.fadeSlide(o, function() {
                c.postSlide(o);
            })) : c.postSlide(o), void c.animateHeight();
            !0 !== n && c.slideCount > c.options.slidesToShow ? c.animateSlide(a, function() {
                c.postSlide(o);
            }) : c.postSlide(o);
        }
    }, s.prototype.startLoad = function() {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(), 
        e.$nextArrow.hide()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.hide(), 
        e.$slider.addClass("slick-loading");
    }, s.prototype.swipeDirection = function() {
        var e, t, n, i, o = this;
        return e = o.touchObject.startX - o.touchObject.curX, t = o.touchObject.startY - o.touchObject.curY, 
        n = Math.atan2(t, e), (i = Math.round(180 * n / Math.PI)) < 0 && (i = 360 - Math.abs(i)), 
        i <= 45 && 0 <= i ? !1 === o.options.rtl ? "left" : "right" : i <= 360 && 315 <= i ? !1 === o.options.rtl ? "left" : "right" : 135 <= i && i <= 225 ? !1 === o.options.rtl ? "right" : "left" : !0 === o.options.verticalSwiping ? 35 <= i && i <= 135 ? "down" : "up" : "vertical";
    }, s.prototype.swipeEnd = function(e) {
        var t, n, i = this;
        if (i.dragging = !1, i.swiping = !1, i.scrolling) return i.scrolling = !1;
        if (i.interrupted = !1, i.shouldClick = !(10 < i.touchObject.swipeLength), void 0 === i.touchObject.curX) return !1;
        if (!0 === i.touchObject.edgeHit && i.$slider.trigger("edge", [ i, i.swipeDirection() ]), 
        i.touchObject.swipeLength >= i.touchObject.minSwipe) {
            switch (n = i.swipeDirection()) {
              case "left":
              case "down":
                t = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide + i.getSlideCount()) : i.currentSlide + i.getSlideCount(), 
                i.currentDirection = 0;
                break;

              case "right":
              case "up":
                t = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide - i.getSlideCount()) : i.currentSlide - i.getSlideCount(), 
                i.currentDirection = 1;
            }
            "vertical" != n && (i.slideHandler(t), i.touchObject = {}, i.$slider.trigger("swipe", [ i, n ]));
        } else i.touchObject.startX !== i.touchObject.curX && (i.slideHandler(i.currentSlide), 
        i.touchObject = {});
    }, s.prototype.swipeHandler = function(e) {
        var t = this;
        if (!(!1 === t.options.swipe || "ontouchend" in document && !1 === t.options.swipe || !1 === t.options.draggable && -1 !== e.type.indexOf("mouse"))) switch (t.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1, 
        t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold, !0 === t.options.verticalSwiping && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold), 
        e.data.action) {
          case "start":
            t.swipeStart(e);
            break;

          case "move":
            t.swipeMove(e);
            break;

          case "end":
            t.swipeEnd(e);
        }
    }, s.prototype.swipeMove = function(e) {
        var t, n, i, o, r, s, a = this;
        return r = void 0 !== e.originalEvent ? e.originalEvent.touches : null, !(!a.dragging || a.scrolling || r && 1 !== r.length) && (t = a.getLeft(a.currentSlide), 
        a.touchObject.curX = void 0 !== r ? r[0].pageX : e.clientX, a.touchObject.curY = void 0 !== r ? r[0].pageY : e.clientY, 
        a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curX - a.touchObject.startX, 2))), 
        s = Math.round(Math.sqrt(Math.pow(a.touchObject.curY - a.touchObject.startY, 2))), 
        !a.options.verticalSwiping && !a.swiping && 4 < s ? !(a.scrolling = !0) : (!0 === a.options.verticalSwiping && (a.touchObject.swipeLength = s), 
        n = a.swipeDirection(), void 0 !== e.originalEvent && 4 < a.touchObject.swipeLength && (a.swiping = !0, 
        e.preventDefault()), o = (!1 === a.options.rtl ? 1 : -1) * (a.touchObject.curX > a.touchObject.startX ? 1 : -1), 
        !0 === a.options.verticalSwiping && (o = a.touchObject.curY > a.touchObject.startY ? 1 : -1), 
        i = a.touchObject.swipeLength, (a.touchObject.edgeHit = !1) === a.options.infinite && (0 === a.currentSlide && "right" === n || a.currentSlide >= a.getDotCount() && "left" === n) && (i = a.touchObject.swipeLength * a.options.edgeFriction, 
        a.touchObject.edgeHit = !0), !1 === a.options.vertical ? a.swipeLeft = t + i * o : a.swipeLeft = t + i * (a.$list.height() / a.listWidth) * o, 
        !0 === a.options.verticalSwiping && (a.swipeLeft = t + i * o), !0 !== a.options.fade && !1 !== a.options.touchMove && (!0 === a.animating ? (a.swipeLeft = null, 
        !1) : void a.setCSS(a.swipeLeft))));
    }, s.prototype.swipeStart = function(e) {
        var t, n = this;
        if (n.interrupted = !0, 1 !== n.touchObject.fingerCount || n.slideCount <= n.options.slidesToShow) return !(n.touchObject = {});
        void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (t = e.originalEvent.touches[0]), 
        n.touchObject.startX = n.touchObject.curX = void 0 !== t ? t.pageX : e.clientX, 
        n.touchObject.startY = n.touchObject.curY = void 0 !== t ? t.pageY : e.clientY, 
        n.dragging = !0;
    }, s.prototype.unfilterSlides = s.prototype.slickUnfilter = function() {
        var e = this;
        null !== e.$slidesCache && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), 
        e.$slidesCache.appendTo(e.$slideTrack), e.reinit());
    }, s.prototype.unload = function() {
        var e = this;
        c(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), 
        e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "");
    }, s.prototype.unslick = function(e) {
        this.$slider.trigger("unslick", [ this, e ]), this.destroy();
    }, s.prototype.updateArrows = function() {
        var e = this;
        Math.floor(e.options.slidesToShow / 2), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 
        e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), 
        e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && !1 === e.options.centerMode ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), 
        e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && !0 === e.options.centerMode && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), 
        e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")));
    }, s.prototype.updateDots = function() {
        var e = this;
        null !== e.$dots && (e.$dots.find("li").removeClass("slick-active").end(), e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active"));
    }, s.prototype.visibility = function() {
        this.options.autoplay && (document[this.hidden] ? this.interrupted = !0 : this.interrupted = !1);
    }, c.fn.slick = function() {
        var e, t, n = this, i = arguments[0], o = Array.prototype.slice.call(arguments, 1), r = n.length;
        for (e = 0; e < r; e++) if ("object" == typeof i || void 0 === i ? n[e].slick = new s(n[e], i) : t = n[e].slick[i].apply(n[e].slick, o), 
        void 0 !== t) return t;
        return n;
    };
}), function(e, t) {
    if (e.JSON) if ("function" == typeof define && define.amd) define(function() {
        return t(e);
    }); else if ("object" == typeof module && "object" == typeof module.exports) module.exports = t(e); else {
        var n = !e.Nette || !e.Nette.noInit;
        e.Nette = t(e), n && e.Nette.initOnLoad();
    }
}("undefined" != typeof window ? window : this, function(window) {
    "use strict";
    var Nette = {};
    function getHandler(t) {
        return function(e) {
            return t.call(this, e);
        };
    }
    Nette.formErrors = [], Nette.version = "2.4", Nette.addEvent = function(e, t, n) {
        e.addEventListener ? e.addEventListener(t, n) : "DOMContentLoaded" === t ? e.attachEvent("onreadystatechange", function() {
            "complete" === e.readyState && n.call(this);
        }) : e.attachEvent("on" + t, getHandler(n));
    }, Nette.getValue = function(e) {
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
                    var i = e.selectedIndex, o = e.options, r = [];
                    if ("select-one" === e.type) return i < 0 ? null : o[i].value;
                    for (t = 0; t < o.length; t++) o[t].selected && r.push(o[t].value);
                    return r;
                }
                if (e.name && e.name.match(/\[\]$/)) {
                    n = e.form.elements[e.name].tagName ? [ e ] : e.form.elements[e.name], r = [];
                    for (t = 0; t < n.length; t++) ("checkbox" !== n[t].type || n[t].checked) && r.push(n[t].value);
                    return r;
                }
                return "checkbox" === e.type ? e.checked : "textarea" === e.tagName.toLowerCase() ? e.value.replace("\r", "") : e.value.replace("\r", "").replace(/^\s+|\s+$/g, "");
            }
            return e[0] ? Nette.getValue(e[0]) : null;
        }
        return null;
    }, Nette.getEffectiveValue = function(e) {
        var t = Nette.getValue(e);
        return e.getAttribute && t === e.getAttribute("data-nette-empty-value") && (t = ""), 
        t;
    }, Nette.validateControl = function(n, e, t, i, o) {
        n = n.tagName ? n : n[0], e = e || Nette.parseJSON(n.getAttribute("data-nette-rules")), 
        i = void 0 === i ? {
            value: Nette.getEffectiveValue(n)
        } : i;
        for (var r = 0, s = e.length; r < s; r++) {
            var a = e[r], l = a.op.match(/(~)?([^?]+)/), c = a.control ? n.form.elements.namedItem(a.control) : n;
            if (a.neg = l[1], a.op = l[2], a.condition = !!a.rules, c) if ("optional" !== a.op) {
                if (!o || a.condition || ":filled" === a.op) {
                    c = c.tagName ? c : c[0];
                    var u = n === c ? i : {
                        value: Nette.getEffectiveValue(c)
                    }, d = Nette.validateRule(c, a.op, a.arg, u);
                    if (null !== d) if (a.neg && (d = !d), a.condition && d) {
                        if (!Nette.validateControl(n, a.rules, t, i, ":blank" !== a.op && o)) return !1;
                    } else if (!a.condition && !d) {
                        if (Nette.isDisabled(c)) continue;
                        if (!t) {
                            var p = Nette.isArray(a.arg) ? a.arg : [ a.arg ], f = a.msg.replace(/%(value|\d+)/g, function(e, t) {
                                return Nette.getValue("value" === t ? c : n.form.elements.namedItem(p[t].control));
                            });
                            Nette.addError(c, f);
                        }
                        return !1;
                    }
                }
            } else o = !Nette.validateRule(n, ":filled", null, i);
        }
        return !("number" === n.type && !n.validity.valid) || (t || Nette.addError(n, "Please enter a valid value."), 
        !1);
    }, Nette.validateForm = function(e, t) {
        var n = e.form || e, i = !1;
        if (Nette.formErrors = [], n["nette-submittedBy"] && null !== n["nette-submittedBy"].getAttribute("formnovalidate")) {
            var o = Nette.parseJSON(n["nette-submittedBy"].getAttribute("data-nette-validation-scope"));
            if (!o.length) return Nette.showFormErrors(n, []), !0;
            i = new RegExp("^(" + o.join("-|") + "-)");
        }
        var r, s, a = {};
        for (r = 0; r < n.elements.length; r++) if (!(s = n.elements[r]).tagName || s.tagName.toLowerCase() in {
            input: 1,
            select: 1,
            textarea: 1,
            button: 1
        }) {
            if ("radio" === s.type) {
                if (a[s.name]) continue;
                a[s.name] = !0;
            }
            if (!(i && !s.name.replace(/]\[|\[|]|$/g, "-").match(i) || Nette.isDisabled(s) || Nette.validateControl(s, null, t) || Nette.formErrors.length)) return !1;
        }
        var l = !Nette.formErrors.length;
        return Nette.showFormErrors(n, Nette.formErrors), l;
    }, Nette.isDisabled = function(e) {
        if ("radio" !== e.type) return e.disabled;
        for (var t = 0, n = e.form.elements; t < n.length; t++) if (n[t].name === e.name && !n[t].disabled) return !1;
        return !0;
    }, Nette.addError = function(e, t) {
        Nette.formErrors.push({
            element: e,
            message: t
        });
    }, Nette.showFormErrors = function(e, t) {
        for (var n, i = [], o = 0; o < t.length; o++) {
            var r = t[o].element, s = t[o].message;
            Nette.inArray(i, s) || (i.push(s), !n && r.focus && (n = r));
        }
        i.length && (alert(i.join("\n")), n && n.focus());
    }, Nette.expandRuleArgument = function(e, t) {
        if (t && t.control) {
            var n = e.elements.namedItem(t.control), i = {
                value: Nette.getEffectiveValue(n)
            };
            Nette.validateControl(n, null, !0, i), t = i.value;
        }
        return t;
    };
    var preventFiltering = !1;
    return Nette.validateRule = function(e, t, n, i) {
        i = void 0 === i ? {
            value: Nette.getEffectiveValue(e)
        } : i, ":" === t.charAt(0) && (t = t.substr(1)), t = (t = t.replace("::", "_")).replace(/\\/g, "");
        var o = Nette.isArray(n) ? n.slice(0) : [ n ];
        if (!preventFiltering) {
            preventFiltering = !0;
            for (var r = 0, s = o.length; r < s; r++) o[r] = Nette.expandRuleArgument(e.form, o[r]);
            preventFiltering = !1;
        }
        return Nette.validators[t] ? Nette.validators[t](e, Nette.isArray(n) ? o : o[0], i.value, i) : null;
    }, Nette.validators = {
        filled: function(e, t, n) {
            return !("number" !== e.type || !e.validity.badInput) || "" !== n && !1 !== n && null !== n && (!Nette.isArray(n) || !!n.length) && (!window.FileList || !(n instanceof window.FileList) || n.length);
        },
        blank: function(e, t, n) {
            return !Nette.validators.filled(e, t, n);
        },
        valid: function(e) {
            return Nette.validateControl(e, null, !0);
        },
        equal: function(e, t, n) {
            if (void 0 === t) return null;
            function i(e) {
                return "number" == typeof e || "string" == typeof e ? "" + e : !0 === e ? "1" : "";
            }
            n = Nette.isArray(n) ? n : [ n ], t = Nette.isArray(t) ? t : [ t ];
            e: for (var o = 0, r = n.length; o < r; o++) {
                for (var s = 0, a = t.length; s < a; s++) if (i(n[o]) === i(t[s])) continue e;
                return !1;
            }
            return !0;
        },
        notEqual: function(e, t, n) {
            return void 0 === t ? null : !Nette.validators.equal(e, t, n);
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
            return (null === (t = Nette.isArray(t) ? t : [ t, t ])[0] || n.length >= t[0]) && (null === t[1] || n.length <= t[1]);
        },
        email: function(e, t, n) {
            return /^("([ !#-[\]-~]|\\[ -~])+"|[-a-z0-9!#$%&'*+\/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+\/=?^_`{|}~]+)*)@([0-9a-z\u00C0-\u02FF\u0370-\u1EFF]([-0-9a-z\u00C0-\u02FF\u0370-\u1EFF]{0,61}[0-9a-z\u00C0-\u02FF\u0370-\u1EFF])?\.)+[a-z\u00C0-\u02FF\u0370-\u1EFF]([-0-9a-z\u00C0-\u02FF\u0370-\u1EFF]{0,17}[a-z\u00C0-\u02FF\u0370-\u1EFF])?$/i.test(n);
        },
        url: function(e, t, n, i) {
            return /^[a-z\d+.-]+:/.test(n) || (n = "http://" + n), !!/^https?:\/\/((([-_0-9a-z\u00C0-\u02FF\u0370-\u1EFF]+\.)*[0-9a-z\u00C0-\u02FF\u0370-\u1EFF]([-0-9a-z\u00C0-\u02FF\u0370-\u1EFF]{0,61}[0-9a-z\u00C0-\u02FF\u0370-\u1EFF])?\.)?[a-z\u00C0-\u02FF\u0370-\u1EFF]([-0-9a-z\u00C0-\u02FF\u0370-\u1EFF]{0,17}[a-z\u00C0-\u02FF\u0370-\u1EFF])?|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\[[0-9a-f:]{3,39}\])(:\d{1,5})?(\/\S*)?$/i.test(n) && (i.value = n, 
            !0);
        },
        regexp: function(e, t, n) {
            var i = "string" == typeof t && t.match(/^\/(.*)\/([imu]*)$/);
            try {
                return i && new RegExp(i[1], i[2].replace("u", "")).test(n);
            } catch (e) {}
        },
        pattern: function(e, t, n) {
            try {
                return "string" == typeof t ? new RegExp("^(?:" + t + ")$").test(n) : null;
            } catch (e) {}
        },
        integer: function(e, t, n) {
            return ("number" !== e.type || !e.validity.badInput) && /^-?[0-9]+$/.test(n);
        },
        float: function(e, t, n, i) {
            return ("number" !== e.type || !e.validity.badInput) && (n = n.replace(" ", "").replace(",", "."), 
            !!/^-?[0-9]*[.,]?[0-9]+$/.test(n) && (i.value = n, !0));
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
            return Nette.isArray(t) ? (null === t[0] || parseFloat(n) >= t[0]) && (null === t[1] || parseFloat(n) <= t[1]) : null;
        },
        submitted: function(e) {
            return e.form["nette-submittedBy"] === e;
        },
        fileSize: function(e, t, n) {
            if (window.FileList) for (var i = 0; i < n.length; i++) if (n[i].size > t) return !1;
            return !0;
        },
        image: function(e, t, n) {
            if (window.FileList && n instanceof window.FileList) for (var i = 0; i < n.length; i++) {
                var o = n[i].type;
                if (o && "image/gif" !== o && "image/png" !== o && "image/jpeg" !== o) return !1;
            }
            return !0;
        },
        static: function(e, t, n) {
            return t;
        }
    }, Nette.toggleForm = function(e, t) {
        var n;
        for (Nette.toggles = {}, n = 0; n < e.elements.length; n++) e.elements[n].tagName.toLowerCase() in {
            input: 1,
            select: 1,
            textarea: 1,
            button: 1
        } && Nette.toggleControl(e.elements[n], null, null, !t);
        for (n in Nette.toggles) Nette.toggle(n, Nette.toggles[n], t);
    }, Nette.toggleControl = function(e, t, n, i, o) {
        t = t || Nette.parseJSON(e.getAttribute("data-nette-rules")), o = void 0 === o ? {
            value: Nette.getEffectiveValue(e)
        } : o;
        for (var r, s = !1, a = [], l = function() {
            Nette.toggleForm(e.form, e);
        }, c = 0, u = t.length; c < u; c++) {
            var d = t[c], p = d.op.match(/(~)?([^?]+)/), f = d.control ? e.form.elements.namedItem(d.control) : e;
            if (f) {
                if (!1 !== (r = n)) {
                    d.neg = p[1], d.op = p[2];
                    var h = e === f ? o : {
                        value: Nette.getEffectiveValue(f)
                    };
                    if (null === (r = Nette.validateRule(f, d.op, d.arg, h))) continue;
                    d.neg && (r = !r), d.rules || (n = r);
                }
                if (d.rules && Nette.toggleControl(e, d.rules, r, i, o) || d.toggle) {
                    if (s = !0, i) for (var v = !document.addEventListener, g = f.tagName ? f.name : f[0].name, m = f.tagName ? f.form.elements : f, y = 0; y < m.length; y++) m[y].name !== g || Nette.inArray(a, m[y]) || (Nette.addEvent(m[y], v && m[y].type in {
                        checkbox: 1,
                        radio: 1
                    } ? "click" : "change", l), a.push(m[y]));
                    for (var b in d.toggle || []) Object.prototype.hasOwnProperty.call(d.toggle, b) && (Nette.toggles[b] = Nette.toggles[b] || (d.toggle[b] ? r : !r));
                }
            }
        }
        return s;
    }, Nette.parseJSON = function(s) {
        return "{op" === (s || "").substr(0, 3) ? eval("[" + s + "]") : JSON.parse(s || "[]");
    }, Nette.toggle = function(e, t, n) {
        var i = document.getElementById(e);
        i && (i.style.display = t ? "" : "none");
    }, Nette.initForm = function(t) {
        Nette.toggleForm(t), t.noValidate || (t.noValidate = !0, Nette.addEvent(t, "submit", function(e) {
            Nette.validateForm(t) || (e && e.stopPropagation ? (e.stopPropagation(), e.preventDefault()) : window.event && (event.cancelBubble = !0, 
            event.returnValue = !1));
        }));
    }, Nette.initOnLoad = function() {
        Nette.addEvent(document, "DOMContentLoaded", function() {
            for (var e = 0; e < document.forms.length; e++) for (var t = document.forms[e], n = 0; n < t.elements.length; n++) if (t.elements[n].getAttribute("data-nette-rules")) {
                Nette.initForm(t);
                break;
            }
            Nette.addEvent(document.body, "click", function(e) {
                for (var t = e.target || e.srcElement; t; ) {
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
    }, Nette.isArray = function(e) {
        return "[object Array]" === Object.prototype.toString.call(e);
    }, Nette.inArray = function(e, t) {
        if ([].indexOf) return -1 < e.indexOf(t);
        for (var n = 0; n < e.length; n++) if (e[n] === t) return !0;
        return !1;
    }, Nette.webalize = function(e) {
        e = e.toLowerCase();
        var t, n = "";
        for (t = 0; t < e.length; t++) n += Nette.webalizeTable[e.charAt(t)] || e.charAt(t);
        return n.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    }, Nette.webalizeTable = {
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
    }, Nette;
}), function(d, p, f) {
    if ("function" != typeof p) return console.error("nette.ajax.js: jQuery is missing, load it please");
    p.nette = new (p.extend(function() {
        var a = {
            self: this,
            initialized: !1,
            contexts: {},
            on: {
                init: {},
                load: {},
                prepare: {},
                before: {},
                start: {},
                success: {},
                complete: {},
                error: {}
            },
            fire: function() {
                var i = !0, o = Array.prototype.slice.call(arguments), e = o.shift(), t = "string" == typeof e ? e : e.name, r = "object" == typeof e && e.off || {};
                return o.push(a.self), p.each(a.on[t], function(e, t) {
                    if (t === f || -1 !== p.inArray(e, r)) return !0;
                    var n = t.apply(a.contexts[e], o);
                    return i = n === f || n;
                }), i;
            },
            requestHandler: function(e) {
                var t = a.self.ajax({}, this, e);
                if (t && t._returnFalse) return !1;
            },
            ext: function(e, t, n) {
                for (;!n; ) n = "ext_" + Math.random(), a.contexts[n] && (n = f);
                p.each(e, function(e, t) {
                    a.on[e][n] = t;
                }), a.contexts[n] = p.extend(t || {}, {
                    name: function() {
                        return n;
                    },
                    ext: function(e, t) {
                        var n = a.contexts[e];
                        if (!n && t) throw "Extension '" + this.name() + "' depends on disabled extension '" + e + "'.";
                        return n;
                    }
                });
            }
        };
        this.ext = function(n, e, t) {
            if ("object" == typeof n) a.ext(n, e); else {
                if (e === f) return a.contexts[n];
                if (e) {
                    if ("string" == typeof n && a.contexts[n] !== f) throw "Cannot override already registered nette-ajax extension '" + n + "'.";
                    a.ext(e, t, n);
                } else p.each([ "init", "load", "prepare", "before", "start", "success", "complete", "error" ], function(e, t) {
                    a.on[t][n] = f;
                }), a.contexts[n] = f;
            }
            return this;
        }, this.init = function(e, t) {
            if (a.initialized) throw "Cannot initialize nette-ajax twice.";
            if ("function" == typeof e) this.ext("init", null), this.ext("init", {
                load: e
            }, t); else if ("object" == typeof e) this.ext("init", null), this.ext("init", e, t); else if (e !== f) throw "Argument of init() can be function or function-hash only.";
            return a.initialized = !0, a.fire("init"), this.load(), this;
        }, this.load = function() {
            return a.fire("load", a.requestHandler), this;
        }, this.ajax = function(e, t, n) {
            if ("string" === p.type(e) && (e = {
                url: e
            }), !e.nette && t && n) {
                var i, o = p(t), r = e.nette = {
                    e: n,
                    ui: t,
                    el: o,
                    isForm: o.is("form"),
                    isSubmit: o.is("input[type=submit]") || o.is("button[type=submit]"),
                    isImage: o.is("input[type=image]"),
                    form: null
                };
                if (r.isSubmit || r.isImage ? r.form = r.el.closest("form") : r.isForm && (r.form = r.el), 
                e.url || (e.url = r.form ? r.form.attr("action") || d.location.pathname + d.location.search : t.href), 
                e.type || (e.type = r.form ? r.form.attr("method") : "get"), o.is("[data-ajax-off]")) {
                    var s = o.attr("data-ajax-off");
                    0 === s.indexOf("[") ? e.off = o.data("ajaxOff") : -1 !== s.indexOf(",") ? e.off = s.split(",") : -1 !== s.indexOf(" ") ? e.off = s.split(" ") : e.off = s, 
                    "string" == typeof e.off && (e.off = [ e.off ]), e.off = p.grep(p.each(e.off, function(e) {
                        return p.trim(e);
                    }), function(e) {
                        return e.length;
                    });
                }
            }
            return a.fire({
                name: "prepare",
                off: e.off || {}
            }, e), e.prepare && e.prepare(e), i = e.beforeSend, e.beforeSend = function(e, t) {
                var n = a.fire({
                    name: "before",
                    off: t.off || {}
                }, e, t);
                return (n || n === f) && i && (n = i(e, t)), n;
            }, this.handleXHR(p.ajax(e), e);
        }, this.handleXHR = function(e, i) {
            return i = i || {}, !e || void 0 !== e.statusText && "canceled" === e.statusText || (e.done(function(e, t, n) {
                a.fire({
                    name: "success",
                    off: i.off || {}
                }, e, t, n, i);
            }).fail(function(e, t, n) {
                a.fire({
                    name: "error",
                    off: i.off || {}
                }, e, t, n, i);
            }).always(function(e, t) {
                a.fire({
                    name: "complete",
                    off: i.off || {}
                }, e, t, i);
            }), a.fire({
                name: "start",
                off: i.off || {}
            }, e, i), i.start && i.start(e, i)), e;
        };
    }, p.nette ? p.nette : {}))(), p.fn.netteAjax = function(e, t) {
        return p.nette.ajax(t || {}, this[0], e);
    }, p.fn.netteAjaxOff = function() {
        return this.off(".nette");
    }, p.nette.ext("validation", {
        before: function(e, t) {
            if (!t.nette) return !0;
            var n = t.nette, i = n.e, o = p.extend(this.defaults, t.validate || function() {
                if (n.el.is("[data-ajax-validate]")) {
                    var e = n.el.data("ajaxValidate");
                    return !1 === e ? {
                        keys: !1,
                        url: !1,
                        form: !1
                    } : "object" == typeof e ? e : void 0;
                }
            }() || {}), r = !1;
            if (n.el.attr("data-ajax-pass") !== f && (r = "bool" != typeof (r = n.el.data("ajaxPass")) || r), 
            o.keys) {
                var s = i.button || i.ctrlKey || i.shiftKey || i.altKey || i.metaKey;
                if (n.form) {
                    if (s && n.isSubmit) return !(this.explicitNoAjax = !0);
                    if (n.isForm && this.explicitNoAjax) return this.explicitNoAjax = !1;
                } else if (s) return !1;
            }
            if (o.form && n.form) {
                var a;
                if ((n.isSubmit || n.isImage) && (n.form.get(0)["nette-submittedBy"] = n.el.get(0)), 
                void 0 === Nette.version || "2.3" == Nette.version) {
                    var l = this.ie();
                    a = n.form.get(0).onsubmit && !1 === n.form.get(0).onsubmit(void 0 !== l && l < 9 ? f : i);
                } else a = !1 === (n.form.get(0).onsubmit ? n.form.triggerHandler("submit") : Nette.validateForm(n.form.get(0)));
                if (a) return i.stopImmediatePropagation(), i.preventDefault(), !1;
            }
            if (o.url) {
                var c = n.form ? t.url : n.el.attr("href");
                if (/(?:^[a-z][a-z0-9+.-]*:|\/\/)/.test(c)) {
                    var u = new URL(c);
                    if (/:|^#/.test(u.pathname + u.search + u.hash)) return !1;
                } else if (/:|^#/.test(c)) return !1;
            }
            return r || (i.stopPropagation(), i.preventDefault(), e._returnFalse = !0), !0;
        }
    }, {
        defaults: {
            keys: !0,
            url: !0,
            form: !0
        },
        explicitNoAjax: !1,
        ie: function(e) {
            for (var t = 3, n = document.createElement("div"), i = n.getElementsByTagName("i"); n.innerHTML = "\x3c!--[if gt IE " + ++t + "]><i></i><![endif]--\x3e", 
            i[0]; ) ;
            return 4 < t ? t : e;
        }
    }), p.nette.ext("forms", {
        init: function() {
            var e;
            d.Nette && (e = this.ext("snippets")) && e.after(function(e) {
                e.find("form").each(function() {
                    d.Nette.initForm(this);
                });
            });
        },
        prepare: function(e) {
            var t = e.nette;
            if (t && t.form) {
                var n = t.e, i = e.data || {}, o = {};
                if (t.isSubmit) o[t.el.attr("name")] = t.el.val() || ""; else if (t.isImage) {
                    var r = t.el.offset(), s = t.el.attr("name"), a = [ Math.max(0, n.pageX - r.left), Math.max(0, n.pageY - r.top) ];
                    -1 !== s.indexOf("[", 0) ? o[s] = a : (o[s + ".x"] = a[0], o[s + ".y"] = a[1]);
                }
                var l = t.form.attr("method");
                if (l && "post" === l.toLowerCase() && "FormData" in d) {
                    var c = new FormData(t.form[0]);
                    for (var u in o) c.append(u, o[u]);
                    if ("string" != typeof i) for (var u in i) c.append(u, i[u]);
                    e.data = c, e.processData = !1, e.contentType = !1;
                } else "string" != typeof i && (i = p.param(i)), o = p.param(o), e.data = t.form.serialize() + (o ? "&" + o : "") + "&" + i;
            }
        }
    }), p.nette.ext("snippets", {
        success: function(e) {
            e.snippets && this.updateSnippets(e.snippets);
        }
    }, {
        beforeQueue: p.Callbacks(),
        afterQueue: p.Callbacks(),
        completeQueue: p.Callbacks(),
        before: function(e) {
            this.beforeQueue.add(e);
        },
        after: function(e) {
            this.afterQueue.add(e);
        },
        complete: function(e) {
            this.completeQueue.add(e);
        },
        updateSnippets: function(e, t) {
            var n = this, i = [];
            for (var o in e) {
                var r = this.getElement(o);
                r.get(0) && i.push(r.get(0)), this.updateSnippet(r, e[o], t);
            }
            p(i).promise().done(function() {
                n.completeQueue.fire();
            });
        },
        updateSnippet: function(e, t, n) {
            e.is("title") ? document.title = t : (this.beforeQueue.fire(e), this.applySnippet(e, t, n), 
            this.afterQueue.fire(e));
        },
        getElement: function(e) {
            return p("#" + this.escapeSelector(e));
        },
        applySnippet: function(e, t, n) {
            !n && e.is("[data-ajax-append]") ? e.append(t) : !n && e.is("[data-ajax-prepend]") ? e.prepend(t) : (e.html() != t || /<[^>]*script/.test(t)) && e.html(t);
        },
        escapeSelector: function(e) {
            return e.replace(/[\!"#\$%&'\(\)\*\+,\.\/:;<=>\?@\[\\\]\^`\{\|\}~]/g, "\\$&");
        }
    }), p.nette.ext("redirect", {
        success: function(e) {
            if (e.redirect) return d.location.href = e.redirect, !1;
        }
    }), p.nette.ext("state", {
        success: function(e) {
            e.state && (this.state = e.state);
        }
    }, {
        state: null
    }), p.nette.ext("unique", {
        start: function(e) {
            this.xhr && this.xhr.abort(), this.xhr = e;
        },
        complete: function() {
            this.xhr = null;
        }
    }, {
        xhr: null
    }), p.nette.ext("abort", {
        init: function() {
            p("body").keydown(p.proxy(function(e) {
                this.xhr && "27" === e.keyCode.toString() && !(e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) && this.xhr.abort();
            }, this));
        },
        start: function(e) {
            this.xhr = e;
        },
        complete: function() {
            this.xhr = null;
        }
    }, {
        xhr: null
    }), p.nette.ext("load", {
        success: function() {
            p.nette.load();
        }
    }), p.nette.ext("init", {
        load: function(e) {
            p(this.linkSelector).off("click.nette", e).on("click.nette", e), p(this.formSelector).off("submit.nette", e).on("submit.nette", e).off("click.nette", ":image", e).on("click.nette", ":image", e).off("click.nette", ":submit", e).on("click.nette", ":submit", e), 
            p(this.buttonSelector).closest("form").off("click.nette", this.buttonSelector, e).on("click.nette", this.buttonSelector, e);
        }
    }, {
        linkSelector: "a.ajax",
        formSelector: "form.ajax",
        buttonSelector: 'input.ajax[type="submit"], button.ajax[type="submit"], input.ajax[type="image"]'
    });
}(window, window.jQuery);

var barcamp = barcamp || {}, viewportWidth;

barcamp.viewportWidth = function() {
    viewportWidth = Math.max($(window).width(), window.innerWidth);
}, barcamp.imageFailover = function() {
    $("img.failover").each(function() {
        var e = function(e) {
            e.src = "/img/logo-icon-96.png";
        };
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
            var i = n.offset().top;
            $("body, html").animate({
                scrollTop: i
            }, 1e3);
        }
    });
}, barcamp.schedule = function() {
    var r = $("#schedule"), e = $("#schedule-scroll-point");
    if (r.length) {
        var l = barcamp.scheduleConfig;
        if (l) {
            var t = function() {
                return e.offset().top + e.outerHeight() - $(window).height() < $(this).scrollTop() && !r.hasClass("animate") && (r.addClass("animate"), 
                $(".schedule", r).addClass("animate"), !0);
            }, n = function() {
                t() && $(window).off("scroll", "", n);
            }, c = function(e, t) {
                e.css({
                    width: t[0] + "%",
                    height: t[1] + "%"
                });
            }, s = function(e) {
                if (0 !== e.length) {
                    var t, n, i, o, r = (t = new Date(l.dates.scheduleBegin).getTime(), n = new Date(l.dates.scheduleEnd).getTime(), 
                    i = new Date().getTime(), o = !1, [ t, n, i ].forEach(function(e) {
                        isNaN(e) && (o = !0);
                    }), o || n <= t || i < t ? 0 : n < i ? 1 : (i - t) / (n - t)), s = u(e), a = [ s.min[0] + (s.max[0] - s.min[0]) * r, s.min[1] + (s.max[1] - s.min[1]) * r ];
                    c(e, a);
                }
            }, i = function(e) {
                if (0 !== e.length) {
                    var t = u(e);
                    c(e, t.empty);
                }
            }, a = function(e) {
                if (0 !== e.length) {
                    var t = u(e);
                    c(e, t.full);
                }
            }, u = function(e) {
                var t = e.data("visualLimits").split(";").map(parseFloat);
                return {
                    empty: [ t[0], t[1] ],
                    min: [ t[2], t[3] ],
                    max: [ t[4], t[5] ],
                    full: [ t[6], t[7] ]
                };
            };
            t() || $(window).on("scroll", "", n), $("li", r).removeClass("item-active item-done"), 
            $("div.progress", r).each(function() {
                var e = $(this);
                i(e), e.removeClass("active");
            }), l.steps.forEach(function(e) {
                var t = e.key, n = $('li[data-step-name="' + t + '"]', r), i = $("div.progress-before", n), o = $("div.progress-after", n);
                e.isCurrent && (n.addClass("item-active"), a(i), o.addClass("active"), s(o)), e.isDone && (n.addClass("item-done"), 
                a(i), a(o)), e.isNext && (i.addClass("active"), s(i));
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
            var n = e.offset().top, i = t.offset().top, o = 0;
            $(window).scroll(function() {
                o = $(window).scrollTop() - i, $(window).scrollTop() >= n ? (e.hasClass("fixed") || e.addClass("fixed"), 
                e.css("top", o + "px")) : e.hasClass("fixed") && e.removeClass("fixed");
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
        var t = $("#avatar-upload-input"), n = $("#avatar"), i = e.attr("href");
        e.click(function(e) {
            e.preventDefault(), t.click();
        }), t.change(function() {
            n.addClass("pulse");
            var e = this.files[0], t = new FormData();
            t.append("file", e), o(t);
        });
        var o = function(e) {
            $.ajax({
                url: i,
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
        var n = t.closest(".item-vote-box"), i = t.attr("href"), o = !!n.closest(".talk-detail").length;
        dataLayer.push({
            event: "bck-talk-vote",
            action: o ? "vote-detail" : "vote-list",
            label: t.data("id"),
            value: "unvote" === t.data("dir") ? -1 : 1
        }), $.ajax({
            url: i,
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