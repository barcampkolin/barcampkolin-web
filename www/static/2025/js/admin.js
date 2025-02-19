!function(e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e);
    } : t(e);
}("undefined" != typeof window ? window : this, function(T, e) {
    function t(e, t) {
        return t.toUpperCase();
    }
    var n = [], D = T.document, u = n.slice, g = n.concat, a = n.push, o = n.indexOf, i = {}, r = i.toString, p = i.hasOwnProperty, m = {}, s = "2.2.4", k = function(e, t) {
        return new k.fn.init(e, t);
    }, l = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, c = /^-ms-/, d = /-([\da-z])/gi;
    function h(e) {
        var t = !!e && "length" in e && e.length, n = k.type(e);
        return "function" !== n && !k.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e);
    }
    k.fn = k.prototype = {
        jquery: s,
        constructor: k,
        selector: "",
        length: 0,
        toArray: function() {
            return u.call(this);
        },
        get: function(e) {
            return null != e ? e < 0 ? this[e + this.length] : this[e] : u.call(this);
        },
        pushStack: function(e) {
            var t = k.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t;
        },
        each: function(e) {
            return k.each(this, e);
        },
        map: function(n) {
            return this.pushStack(k.map(this, function(e, t) {
                return n.call(e, t, e);
            }));
        },
        slice: function() {
            return this.pushStack(u.apply(this, arguments));
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
        push: a,
        sort: n.sort,
        splice: n.splice
    }, k.extend = k.fn.extend = function() {
        var e, t, n, i, o, r, s = arguments[0] || {}, a = 1, l = arguments.length, c = !1;
        for ("boolean" == typeof s && (c = s, s = arguments[a] || {}, a++), "object" == typeof s || k.isFunction(s) || (s = {}), 
        a === l && (s = this, a--); a < l; a++) if (null != (e = arguments[a])) for (t in e) n = s[t], 
        s !== (i = e[t]) && (c && i && (k.isPlainObject(i) || (o = k.isArray(i))) ? (r = o ? (o = !1, 
        n && k.isArray(n) ? n : []) : n && k.isPlainObject(n) ? n : {}, s[t] = k.extend(c, r, i)) : void 0 !== i && (s[t] = i));
        return s;
    }, k.extend({
        expando: "jQuery" + (s + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e);
        },
        noop: function() {},
        isFunction: function(e) {
            return "function" === k.type(e);
        },
        isArray: Array.isArray,
        isWindow: function(e) {
            return null != e && e === e.window;
        },
        isNumeric: function(e) {
            var t = e && e.toString();
            return !k.isArray(e) && 0 <= t - parseFloat(t) + 1;
        },
        isPlainObject: function(e) {
            var t;
            if ("object" !== k.type(e) || e.nodeType || k.isWindow(e)) return !1;
            if (e.constructor && !p.call(e, "constructor") && !p.call(e.constructor.prototype || {}, "isPrototypeOf")) return !1;
            for (t in e) ;
            return void 0 === t || p.call(e, t);
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0;
        },
        type: function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? i[r.call(e)] || "object" : typeof e;
        },
        globalEval: function(e) {
            var t, n = eval;
            (e = k.trim(e)) && (1 === e.indexOf("use strict") ? ((t = D.createElement("script")).text = e, 
            D.head.appendChild(t).parentNode.removeChild(t)) : n(e));
        },
        camelCase: function(e) {
            return e.replace(c, "ms-").replace(d, t);
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
        },
        each: function(e, t) {
            var n, i = 0;
            if (h(e)) for (n = e.length; i < n && !1 !== t.call(e[i], i, e[i]); i++) ; else for (i in e) if (!1 === t.call(e[i], i, e[i])) break;
            return e;
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(l, "");
        },
        makeArray: function(e, t) {
            var n = t || [];
            return null != e && (h(Object(e)) ? k.merge(n, "string" == typeof e ? [ e ] : e) : a.call(n, e)), 
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
            for (var i = [], o = 0, r = e.length, s = !n; o < r; o++) !t(e[o], o) != s && i.push(e[o]);
            return i;
        },
        map: function(e, t, n) {
            var i, o, r = 0, s = [];
            if (h(e)) for (i = e.length; r < i; r++) null != (o = t(e[r], r, n)) && s.push(o); else for (r in e) null != (o = t(e[r], r, n)) && s.push(o);
            return g.apply([], s);
        },
        guid: 1,
        proxy: function(e, t) {
            var n, i, o;
            if ("string" == typeof t && (n = e[t], t = e, e = n), k.isFunction(e)) return i = u.call(arguments, 2), 
            (o = function() {
                return e.apply(t || this, i.concat(u.call(arguments)));
            }).guid = e.guid = e.guid || k.guid++, o;
        },
        now: Date.now,
        support: m
    }), "function" == typeof Symbol && (k.fn[Symbol.iterator] = n[Symbol.iterator]), 
    k.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
        i["[object " + t + "]"] = t.toLowerCase();
    });
    var f = function(n) {
        function d(e, t, n) {
            var i = "0x" + t - 65536;
            return i != i || n ? t : i < 0 ? String.fromCharCode(65536 + i) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320);
        }
        function o() {
            C();
        }
        var e, p, w, r, s, g, h, m, x, l, c, C, T, a, D, v, u, f, b, k = "sizzle" + 1 * new Date(), y = n.document, S = 0, i = 0, _ = oe(), A = oe(), N = oe(), E = function(e, t) {
            return e === t && (c = !0), 0;
        }, I = {}.hasOwnProperty, t = [], $ = t.pop, O = t.push, F = t.push, P = t.slice, M = function(e, t) {
            for (var n = 0, i = e.length; n < i; n++) if (e[n] === t) return n;
            return -1;
        }, L = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", j = "[\\x20\\t\\r\\n\\f]", R = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", q = "\\[" + j + "*(" + R + ")(?:" + j + "*([*^$|!~]?=)" + j + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + R + "))|)" + j + "*\\]", H = ":(" + R + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + q + ")*)|.*)\\)|)", U = new RegExp(j + "+", "g"), W = new RegExp("^" + j + "+|((?:^|[^\\\\])(?:\\\\.)*)" + j + "+$", "g"), V = new RegExp("^" + j + "*," + j + "*"), z = new RegExp("^" + j + "*([>+~]|" + j + ")" + j + "*"), B = new RegExp("=" + j + "*([^\\]'\"]*?)" + j + "*\\]", "g"), Y = new RegExp(H), Q = new RegExp("^" + R + "$"), X = {
            ID: new RegExp("^#(" + R + ")"),
            CLASS: new RegExp("^\\.(" + R + ")"),
            TAG: new RegExp("^(" + R + "|[*])"),
            ATTR: new RegExp("^" + q),
            PSEUDO: new RegExp("^" + H),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + j + "*(even|odd|(([+-]|)(\\d*)n|)" + j + "*(?:([+-]|)" + j + "*(\\d+)|))" + j + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + L + ")$", "i"),
            needsContext: new RegExp("^" + j + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + j + "*((?:-\\d)?\\d*)" + j + "*\\)|)(?=[^-]|$)", "i")
        }, K = /^(?:input|select|textarea|button)$/i, G = /^h\d$/i, J = /^[^{]+\{\s*\[native \w/, Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ee = /[+~]/, te = /'|\\/g, ne = new RegExp("\\\\([\\da-f]{1,6}" + j + "?|(" + j + ")|.)", "ig");
        try {
            F.apply(t = P.call(y.childNodes), y.childNodes), t[y.childNodes.length].nodeType;
        } catch (e) {
            F = {
                apply: t.length ? function(e, t) {
                    O.apply(e, P.call(t));
                } : function(e, t) {
                    for (var n = e.length, i = 0; e[n++] = t[i++]; ) ;
                    e.length = n - 1;
                }
            };
        }
        function ie(e, t, n, i) {
            var o, r, s, a, l, c, u, d, h = t && t.ownerDocument, f = t ? t.nodeType : 9;
            if (n = n || [], "string" != typeof e || !e || 1 !== f && 9 !== f && 11 !== f) return n;
            if (!i && ((t ? t.ownerDocument || t : y) !== T && C(t), t = t || T, D)) {
                if (11 !== f && (c = Z.exec(e))) if (o = c[1]) {
                    if (9 === f) {
                        if (!(s = t.getElementById(o))) return n;
                        if (s.id === o) return n.push(s), n;
                    } else if (h && (s = h.getElementById(o)) && b(t, s) && s.id === o) return n.push(s), 
                    n;
                } else {
                    if (c[2]) return F.apply(n, t.getElementsByTagName(e)), n;
                    if ((o = c[3]) && p.getElementsByClassName && t.getElementsByClassName) return F.apply(n, t.getElementsByClassName(o)), 
                    n;
                }
                if (p.qsa && !N[e + " "] && (!v || !v.test(e))) {
                    if (1 !== f) h = t, d = e; else if ("object" !== t.nodeName.toLowerCase()) {
                        for ((a = t.getAttribute("id")) ? a = a.replace(te, "\\$&") : t.setAttribute("id", a = k), 
                        r = (u = g(e)).length, l = Q.test(a) ? "#" + a : "[id='" + a + "']"; r--; ) u[r] = l + " " + pe(u[r]);
                        d = u.join(","), h = ee.test(e) && he(t.parentNode) || t;
                    }
                    if (d) try {
                        return F.apply(n, h.querySelectorAll(d)), n;
                    } catch (e) {} finally {
                        a === k && t.removeAttribute("id");
                    }
                }
            }
            return m(e.replace(W, "$1"), t, n, i);
        }
        function oe() {
            var i = [];
            return function e(t, n) {
                return i.push(t + " ") > w.cacheLength && delete e[i.shift()], e[t + " "] = n;
            };
        }
        function re(e) {
            return e[k] = !0, e;
        }
        function se(e) {
            var t = T.createElement("div");
            try {
                return !!e(t);
            } catch (e) {
                return !1;
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null;
            }
        }
        function ae(e, t) {
            for (var n = e.split("|"), i = n.length; i--; ) w.attrHandle[n[i]] = t;
        }
        function le(e, t) {
            var n = t && e, i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || 1 << 31) - (~e.sourceIndex || 1 << 31);
            if (i) return i;
            if (n) for (;n = n.nextSibling; ) if (n === t) return -1;
            return e ? 1 : -1;
        }
        function ce(t) {
            return function(e) {
                return "input" === e.nodeName.toLowerCase() && e.type === t;
            };
        }
        function ue(n) {
            return function(e) {
                var t = e.nodeName.toLowerCase();
                return ("input" === t || "button" === t) && e.type === n;
            };
        }
        function de(s) {
            return re(function(r) {
                return r = +r, re(function(e, t) {
                    for (var n, i = s([], e.length, r), o = i.length; o--; ) e[n = i[o]] && (e[n] = !(t[n] = e[n]));
                });
            });
        }
        function he(e) {
            return e && void 0 !== e.getElementsByTagName && e;
        }
        for (e in p = ie.support = {}, s = ie.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return !!t && "HTML" !== t.nodeName;
        }, C = ie.setDocument = function(e) {
            var t, n, i = e ? e.ownerDocument || e : y;
            return i !== T && 9 === i.nodeType && i.documentElement && (a = (T = i).documentElement, 
            D = !s(T), (n = T.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", o, !1) : n.attachEvent && n.attachEvent("onunload", o)), 
            p.attributes = se(function(e) {
                return e.className = "i", !e.getAttribute("className");
            }), p.getElementsByTagName = se(function(e) {
                return e.appendChild(T.createComment("")), !e.getElementsByTagName("*").length;
            }), p.getElementsByClassName = J.test(T.getElementsByClassName), p.getById = se(function(e) {
                return a.appendChild(e).id = k, !T.getElementsByName || !T.getElementsByName(k).length;
            }), p.getById ? (w.find.ID = function(e, t) {
                if (void 0 !== t.getElementById && D) {
                    var n = t.getElementById(e);
                    return n ? [ n ] : [];
                }
            }, w.filter.ID = function(e) {
                var t = e.replace(ne, d);
                return function(e) {
                    return e.getAttribute("id") === t;
                };
            }) : (delete w.find.ID, w.filter.ID = function(e) {
                var n = e.replace(ne, d);
                return function(e) {
                    var t = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                    return t && t.value === n;
                };
            }), w.find.TAG = p.getElementsByTagName ? function(e, t) {
                return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : p.qsa ? t.querySelectorAll(e) : void 0;
            } : function(e, t) {
                var n, i = [], o = 0, r = t.getElementsByTagName(e);
                if ("*" !== e) return r;
                for (;n = r[o++]; ) 1 === n.nodeType && i.push(n);
                return i;
            }, w.find.CLASS = p.getElementsByClassName && function(e, t) {
                if (void 0 !== t.getElementsByClassName && D) return t.getElementsByClassName(e);
            }, u = [], v = [], (p.qsa = J.test(T.querySelectorAll)) && (se(function(e) {
                a.appendChild(e).innerHTML = "<a id='" + k + "'></a><select id='" + k + "-\r\\' msallowcapture=''><option selected=''></option></select>", 
                e.querySelectorAll("[msallowcapture^='']").length && v.push("[*^$]=" + j + "*(?:''|\"\")"), 
                e.querySelectorAll("[selected]").length || v.push("\\[" + j + "*(?:value|" + L + ")"), 
                e.querySelectorAll("[id~=" + k + "-]").length || v.push("~="), e.querySelectorAll(":checked").length || v.push(":checked"), 
                e.querySelectorAll("a#" + k + "+*").length || v.push(".#.+[+~]");
            }), se(function(e) {
                var t = T.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && v.push("name" + j + "*[*^$|!~]?="), 
                e.querySelectorAll(":enabled").length || v.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), 
                v.push(",.*:");
            })), (p.matchesSelector = J.test(f = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.msMatchesSelector)) && se(function(e) {
                p.disconnectedMatch = f.call(e, "div"), f.call(e, "[s!='']:x"), u.push("!=", H);
            }), v = v.length && new RegExp(v.join("|")), u = u.length && new RegExp(u.join("|")), 
            t = J.test(a.compareDocumentPosition), b = t || J.test(a.contains) ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e, i = t && t.parentNode;
                return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)));
            } : function(e, t) {
                if (t) for (;t = t.parentNode; ) if (t === e) return !0;
                return !1;
            }, E = t ? function(e, t) {
                if (e === t) return c = !0, 0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n || (1 & (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !p.sortDetached && t.compareDocumentPosition(e) === n ? e === T || e.ownerDocument === y && b(y, e) ? -1 : t === T || t.ownerDocument === y && b(y, t) ? 1 : l ? M(l, e) - M(l, t) : 0 : 4 & n ? -1 : 1);
            } : function(e, t) {
                if (e === t) return c = !0, 0;
                var n, i = 0, o = e.parentNode, r = t.parentNode, s = [ e ], a = [ t ];
                if (!o || !r) return e === T ? -1 : t === T ? 1 : o ? -1 : r ? 1 : l ? M(l, e) - M(l, t) : 0;
                if (o === r) return le(e, t);
                for (n = e; n = n.parentNode; ) s.unshift(n);
                for (n = t; n = n.parentNode; ) a.unshift(n);
                for (;s[i] === a[i]; ) i++;
                return i ? le(s[i], a[i]) : s[i] === y ? -1 : a[i] === y ? 1 : 0;
            }), T;
        }, ie.matches = function(e, t) {
            return ie(e, null, null, t);
        }, ie.matchesSelector = function(e, t) {
            if ((e.ownerDocument || e) !== T && C(e), t = t.replace(B, "='$1']"), p.matchesSelector && D && !N[t + " "] && (!u || !u.test(t)) && (!v || !v.test(t))) try {
                var n = f.call(e, t);
                if (n || p.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n;
            } catch (e) {}
            return 0 < ie(t, T, null, [ e ]).length;
        }, ie.contains = function(e, t) {
            return (e.ownerDocument || e) !== T && C(e), b(e, t);
        }, ie.attr = function(e, t) {
            (e.ownerDocument || e) !== T && C(e);
            var n = w.attrHandle[t.toLowerCase()], i = n && I.call(w.attrHandle, t.toLowerCase()) ? n(e, t, !D) : void 0;
            return void 0 !== i ? i : p.attributes || !D ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null;
        }, ie.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e);
        }, ie.uniqueSort = function(e) {
            var t, n = [], i = 0, o = 0;
            if (c = !p.detectDuplicates, l = !p.sortStable && e.slice(0), e.sort(E), c) {
                for (;t = e[o++]; ) t === e[o] && (i = n.push(o));
                for (;i--; ) e.splice(n[i], 1);
            }
            return l = null, e;
        }, r = ie.getText = function(e) {
            var t, n = "", i = 0, o = e.nodeType;
            if (o) {
                if (1 === o || 9 === o || 11 === o) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += r(e);
                } else if (3 === o || 4 === o) return e.nodeValue;
            } else for (;t = e[i++]; ) n += r(t);
            return n;
        }, (w = ie.selectors = {
            cacheLength: 50,
            createPseudo: re,
            match: X,
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
                    return e[1] = e[1].replace(ne, d), e[3] = (e[3] || e[4] || e[5] || "").replace(ne, d), 
                    "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || ie.error(e[0]), 
                    e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && ie.error(e[0]), 
                    e;
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return X.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && Y.test(n) && (t = g(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), 
                    e[2] = n.slice(0, t)), e.slice(0, 3));
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(ne, d).toLowerCase();
                    return "*" === e ? function() {
                        return !0;
                    } : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t;
                    };
                },
                CLASS: function(e) {
                    var t = _[e + " "];
                    return t || (t = new RegExp("(^|" + j + ")" + e + "(" + j + "|$)")) && _(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "");
                    });
                },
                ATTR: function(n, i, o) {
                    return function(e) {
                        var t = ie.attr(e, n);
                        return null == t ? "!=" === i : !i || (t += "", "=" === i ? t === o : "!=" === i ? t !== o : "^=" === i ? o && 0 === t.indexOf(o) : "*=" === i ? o && -1 < t.indexOf(o) : "$=" === i ? o && t.slice(-o.length) === o : "~=" === i ? -1 < (" " + t.replace(U, " ") + " ").indexOf(o) : "|=" === i && (t === o || t.slice(0, o.length + 1) === o + "-"));
                    };
                },
                CHILD: function(p, e, t, g, m) {
                    var v = "nth" !== p.slice(0, 3), b = "last" !== p.slice(-4), y = "of-type" === e;
                    return 1 === g && 0 === m ? function(e) {
                        return !!e.parentNode;
                    } : function(e, t, n) {
                        var i, o, r, s, a, l, c = v != b ? "nextSibling" : "previousSibling", u = e.parentNode, d = y && e.nodeName.toLowerCase(), h = !n && !y, f = !1;
                        if (u) {
                            if (v) {
                                for (;c; ) {
                                    for (s = e; s = s[c]; ) if (y ? s.nodeName.toLowerCase() === d : 1 === s.nodeType) return !1;
                                    l = c = "only" === p && !l && "nextSibling";
                                }
                                return !0;
                            }
                            if (l = [ b ? u.firstChild : u.lastChild ], b && h) {
                                for (f = (a = (i = (o = (r = (s = u)[k] || (s[k] = {}))[s.uniqueID] || (r[s.uniqueID] = {}))[p] || [])[0] === S && i[1]) && i[2], 
                                s = a && u.childNodes[a]; s = ++a && s && s[c] || (f = a = 0) || l.pop(); ) if (1 === s.nodeType && ++f && s === e) {
                                    o[p] = [ S, a, f ];
                                    break;
                                }
                            } else if (h && (f = a = (i = (o = (r = (s = e)[k] || (s[k] = {}))[s.uniqueID] || (r[s.uniqueID] = {}))[p] || [])[0] === S && i[1]), 
                            !1 === f) for (;(s = ++a && s && s[c] || (f = a = 0) || l.pop()) && ((y ? s.nodeName.toLowerCase() !== d : 1 !== s.nodeType) || !++f || (h && ((o = (r = s[k] || (s[k] = {}))[s.uniqueID] || (r[s.uniqueID] = {}))[p] = [ S, f ]), 
                            s !== e)); ) ;
                            return (f -= m) === g || f % g == 0 && 0 <= f / g;
                        }
                    };
                },
                PSEUDO: function(e, r) {
                    var t, s = w.pseudos[e] || w.setFilters[e.toLowerCase()] || ie.error("unsupported pseudo: " + e);
                    return s[k] ? s(r) : 1 < s.length ? (t = [ e, e, "", r ], w.setFilters.hasOwnProperty(e.toLowerCase()) ? re(function(e, t) {
                        for (var n, i = s(e, r), o = i.length; o--; ) e[n = M(e, i[o])] = !(t[n] = i[o]);
                    }) : function(e) {
                        return s(e, 0, t);
                    }) : s;
                }
            },
            pseudos: {
                not: re(function(e) {
                    var i = [], o = [], a = h(e.replace(W, "$1"));
                    return a[k] ? re(function(e, t, n, i) {
                        for (var o, r = a(e, null, i, []), s = e.length; s--; ) (o = r[s]) && (e[s] = !(t[s] = o));
                    }) : function(e, t, n) {
                        return i[0] = e, a(i, null, n, o), i[0] = null, !o.pop();
                    };
                }),
                has: re(function(t) {
                    return function(e) {
                        return 0 < ie(t, e).length;
                    };
                }),
                contains: re(function(t) {
                    return t = t.replace(ne, d), function(e) {
                        return -1 < (e.textContent || e.innerText || r(e)).indexOf(t);
                    };
                }),
                lang: re(function(n) {
                    return Q.test(n || "") || ie.error("unsupported lang: " + n), n = n.replace(ne, d).toLowerCase(), 
                    function(e) {
                        var t;
                        do {
                            if (t = D ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-");
                        } while ((e = e.parentNode) && 1 === e.nodeType);
                        return !1;
                    };
                }),
                target: function(e) {
                    var t = n.location && n.location.hash;
                    return t && t.slice(1) === e.id;
                },
                root: function(e) {
                    return e === a;
                },
                focus: function(e) {
                    return e === T.activeElement && (!T.hasFocus || T.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
                },
                enabled: function(e) {
                    return !1 === e.disabled;
                },
                disabled: function(e) {
                    return !0 === e.disabled;
                },
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
                    return G.test(e.nodeName);
                },
                input: function(e) {
                    return K.test(e.nodeName);
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t;
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase());
                },
                first: de(function() {
                    return [ 0 ];
                }),
                last: de(function(e, t) {
                    return [ t - 1 ];
                }),
                eq: de(function(e, t, n) {
                    return [ n < 0 ? n + t : n ];
                }),
                even: de(function(e, t) {
                    for (var n = 0; n < t; n += 2) e.push(n);
                    return e;
                }),
                odd: de(function(e, t) {
                    for (var n = 1; n < t; n += 2) e.push(n);
                    return e;
                }),
                lt: de(function(e, t, n) {
                    for (var i = n < 0 ? n + t : n; 0 <= --i; ) e.push(i);
                    return e;
                }),
                gt: de(function(e, t, n) {
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
        }) w.pseudos[e] = ce(e);
        for (e in {
            submit: !0,
            reset: !0
        }) w.pseudos[e] = ue(e);
        function fe() {}
        function pe(e) {
            for (var t = 0, n = e.length, i = ""; t < n; t++) i += e[t].value;
            return i;
        }
        function ge(a, e, t) {
            var l = e.dir, c = t && "parentNode" === l, u = i++;
            return e.first ? function(e, t, n) {
                for (;e = e[l]; ) if (1 === e.nodeType || c) return a(e, t, n);
            } : function(e, t, n) {
                var i, o, r, s = [ S, u ];
                if (n) {
                    for (;e = e[l]; ) if ((1 === e.nodeType || c) && a(e, t, n)) return !0;
                } else for (;e = e[l]; ) if (1 === e.nodeType || c) {
                    if ((i = (o = (r = e[k] || (e[k] = {}))[e.uniqueID] || (r[e.uniqueID] = {}))[l]) && i[0] === S && i[1] === u) return s[2] = i[2];
                    if ((o[l] = s)[2] = a(e, t, n)) return !0;
                }
            };
        }
        function me(o) {
            return 1 < o.length ? function(e, t, n) {
                for (var i = o.length; i--; ) if (!o[i](e, t, n)) return !1;
                return !0;
            } : o[0];
        }
        function ve(e, t, n, i, o) {
            for (var r, s = [], a = 0, l = e.length, c = null != t; a < l; a++) (r = e[a]) && (n && !n(r, i, o) || (s.push(r), 
            c && t.push(a)));
            return s;
        }
        function be(f, p, g, m, v, e) {
            return m && !m[k] && (m = be(m)), v && !v[k] && (v = be(v, e)), re(function(e, t, n, i) {
                var o, r, s, a = [], l = [], c = t.length, u = e || function(e, t, n) {
                    for (var i = 0, o = t.length; i < o; i++) ie(e, t[i], n);
                    return n;
                }(p || "*", n.nodeType ? [ n ] : n, []), d = !f || !e && p ? u : ve(u, a, f, n, i), h = g ? v || (e ? f : c || m) ? [] : t : d;
                if (g && g(d, h, n, i), m) for (o = ve(h, l), m(o, [], n, i), r = o.length; r--; ) (s = o[r]) && (h[l[r]] = !(d[l[r]] = s));
                if (e) {
                    if (v || f) {
                        if (v) {
                            for (o = [], r = h.length; r--; ) (s = h[r]) && o.push(d[r] = s);
                            v(null, h = [], o, i);
                        }
                        for (r = h.length; r--; ) (s = h[r]) && -1 < (o = v ? M(e, s) : a[r]) && (e[o] = !(t[o] = s));
                    }
                } else h = ve(h === t ? h.splice(c, h.length) : h), v ? v(null, t, h, i) : F.apply(t, h);
            });
        }
        function ye(e) {
            for (var o, t, n, i = e.length, r = w.relative[e[0].type], s = r || w.relative[" "], a = r ? 1 : 0, l = ge(function(e) {
                return e === o;
            }, s, !0), c = ge(function(e) {
                return -1 < M(o, e);
            }, s, !0), u = [ function(e, t, n) {
                var i = !r && (n || t !== x) || ((o = t).nodeType ? l(e, t, n) : c(e, t, n));
                return o = null, i;
            } ]; a < i; a++) if (t = w.relative[e[a].type]) u = [ ge(me(u), t) ]; else {
                if ((t = w.filter[e[a].type].apply(null, e[a].matches))[k]) {
                    for (n = ++a; n < i && !w.relative[e[n].type]; n++) ;
                    return be(1 < a && me(u), 1 < a && pe(e.slice(0, a - 1).concat({
                        value: " " === e[a - 2].type ? "*" : ""
                    })).replace(W, "$1"), t, a < n && ye(e.slice(a, n)), n < i && ye(e = e.slice(n)), n < i && pe(e));
                }
                u.push(t);
            }
            return me(u);
        }
        return fe.prototype = w.filters = w.pseudos, w.setFilters = new fe(), g = ie.tokenize = function(e, t) {
            var n, i, o, r, s, a, l, c = A[e + " "];
            if (c) return t ? 0 : c.slice(0);
            for (s = e, a = [], l = w.preFilter; s; ) {
                for (r in n && !(i = V.exec(s)) || (i && (s = s.slice(i[0].length) || s), a.push(o = [])), 
                n = !1, (i = z.exec(s)) && (n = i.shift(), o.push({
                    value: n,
                    type: i[0].replace(W, " ")
                }), s = s.slice(n.length)), w.filter) !(i = X[r].exec(s)) || l[r] && !(i = l[r](i)) || (n = i.shift(), 
                o.push({
                    value: n,
                    type: r,
                    matches: i
                }), s = s.slice(n.length));
                if (!n) break;
            }
            return t ? s.length : s ? ie.error(e) : A(e, a).slice(0);
        }, h = ie.compile = function(e, t) {
            var n, i = [], o = [], r = N[e + " "];
            if (!r) {
                for (n = (t = t || g(e)).length; n--; ) (r = ye(t[n]))[k] ? i.push(r) : o.push(r);
                (r = N(e, function(m, v) {
                    function e(e, t, n, i, o) {
                        var r, s, a, l = 0, c = "0", u = e && [], d = [], h = x, f = e || y && w.find.TAG("*", o), p = S += null == h ? 1 : Math.random() || .1, g = f.length;
                        for (o && (x = t === T || t || o); c !== g && null != (r = f[c]); c++) {
                            if (y && r) {
                                for (s = 0, t || r.ownerDocument === T || (C(r), n = !D); a = m[s++]; ) if (a(r, t || T, n)) {
                                    i.push(r);
                                    break;
                                }
                                o && (S = p);
                            }
                            b && ((r = !a && r) && l--, e && u.push(r));
                        }
                        if (l += c, b && c !== l) {
                            for (s = 0; a = v[s++]; ) a(u, d, t, n);
                            if (e) {
                                if (0 < l) for (;c--; ) u[c] || d[c] || (d[c] = $.call(i));
                                d = ve(d);
                            }
                            F.apply(i, d), o && !e && 0 < d.length && 1 < l + v.length && ie.uniqueSort(i);
                        }
                        return o && (S = p, x = h), u;
                    }
                    var b = 0 < v.length, y = 0 < m.length;
                    return b ? re(e) : e;
                }(o, i))).selector = e;
            }
            return r;
        }, m = ie.select = function(e, t, n, i) {
            var o, r, s, a, l, c = "function" == typeof e && e, u = !i && g(e = c.selector || e);
            if (n = n || [], 1 === u.length) {
                if (2 < (r = u[0] = u[0].slice(0)).length && "ID" === (s = r[0]).type && p.getById && 9 === t.nodeType && D && w.relative[r[1].type]) {
                    if (!(t = (w.find.ID(s.matches[0].replace(ne, d), t) || [])[0])) return n;
                    c && (t = t.parentNode), e = e.slice(r.shift().value.length);
                }
                for (o = X.needsContext.test(e) ? 0 : r.length; o-- && (s = r[o], !w.relative[a = s.type]); ) if ((l = w.find[a]) && (i = l(s.matches[0].replace(ne, d), ee.test(r[0].type) && he(t.parentNode) || t))) {
                    if (r.splice(o, 1), !(e = i.length && pe(r))) return F.apply(n, i), n;
                    break;
                }
            }
            return (c || h(e, u))(i, t, !D, n, !t || ee.test(e) && he(t.parentNode) || t), n;
        }, p.sortStable = k.split("").sort(E).join("") === k, p.detectDuplicates = !!c, 
        C(), p.sortDetached = se(function(e) {
            return 1 & e.compareDocumentPosition(T.createElement("div"));
        }), se(function(e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href");
        }) || ae("type|href|height|width", function(e, t, n) {
            if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
        }), p.attributes && se(function(e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
        }) || ae("value", function(e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue;
        }), se(function(e) {
            return null == e.getAttribute("disabled");
        }) || ae(L, function(e, t, n) {
            var i;
            if (!n) return !0 === e[t] ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null;
        }), ie;
    }(T);
    k.find = f, k.expr = f.selectors, k.expr[":"] = k.expr.pseudos, k.uniqueSort = k.unique = f.uniqueSort, 
    k.text = f.getText, k.isXMLDoc = f.isXML, k.contains = f.contains;
    function v(e, t, n) {
        for (var i = [], o = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; ) if (1 === e.nodeType) {
            if (o && k(e).is(n)) break;
            i.push(e);
        }
        return i;
    }
    function b(e, t) {
        for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
        return n;
    }
    var y = k.expr.match.needsContext, w = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/, x = /^.[^:#\[\.,]*$/;
    function C(e, n, i) {
        if (k.isFunction(n)) return k.grep(e, function(e, t) {
            return !!n.call(e, t, e) !== i;
        });
        if (n.nodeType) return k.grep(e, function(e) {
            return e === n !== i;
        });
        if ("string" == typeof n) {
            if (x.test(n)) return k.filter(n, e, i);
            n = k.filter(n, e);
        }
        return k.grep(e, function(e) {
            return -1 < o.call(n, e) !== i;
        });
    }
    k.filter = function(e, t, n) {
        var i = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? k.find.matchesSelector(i, e) ? [ i ] : [] : k.find.matches(e, k.grep(t, function(e) {
            return 1 === e.nodeType;
        }));
    }, k.fn.extend({
        find: function(e) {
            var t, n = this.length, i = [], o = this;
            if ("string" != typeof e) return this.pushStack(k(e).filter(function() {
                for (t = 0; t < n; t++) if (k.contains(o[t], this)) return !0;
            }));
            for (t = 0; t < n; t++) k.find(e, o[t], i);
            return (i = this.pushStack(1 < n ? k.unique(i) : i)).selector = this.selector ? this.selector + " " + e : e, 
            i;
        },
        filter: function(e) {
            return this.pushStack(C(this, e || [], !1));
        },
        not: function(e) {
            return this.pushStack(C(this, e || [], !0));
        },
        is: function(e) {
            return !!C(this, "string" == typeof e && y.test(e) ? k(e) : e || [], !1).length;
        }
    });
    var S, _ = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
    (k.fn.init = function(e, t, n) {
        var i, o;
        if (!e) return this;
        if (n = n || S, "string" != typeof e) return e.nodeType ? (this.context = this[0] = e, 
        this.length = 1, this) : k.isFunction(e) ? void 0 !== n.ready ? n.ready(e) : e(k) : (void 0 !== e.selector && (this.selector = e.selector, 
        this.context = e.context), k.makeArray(e, this));
        if (!(i = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [ null, e, null ] : _.exec(e)) || !i[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
        if (i[1]) {
            if (t = t instanceof k ? t[0] : t, k.merge(this, k.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : D, !0)), 
            w.test(i[1]) && k.isPlainObject(t)) for (i in t) k.isFunction(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
            return this;
        }
        return (o = D.getElementById(i[2])) && o.parentNode && (this.length = 1, this[0] = o), 
        this.context = D, this.selector = e, this;
    }).prototype = k.fn, S = k(D);
    var A = /^(?:parents|prev(?:Until|All))/, N = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    function E(e, t) {
        for (;(e = e[t]) && 1 !== e.nodeType; ) ;
        return e;
    }
    k.fn.extend({
        has: function(e) {
            var t = k(e, this), n = t.length;
            return this.filter(function() {
                for (var e = 0; e < n; e++) if (k.contains(this, t[e])) return !0;
            });
        },
        closest: function(e, t) {
            for (var n, i = 0, o = this.length, r = [], s = y.test(e) || "string" != typeof e ? k(e, t || this.context) : 0; i < o; i++) for (n = this[i]; n && n !== t; n = n.parentNode) if (n.nodeType < 11 && (s ? -1 < s.index(n) : 1 === n.nodeType && k.find.matchesSelector(n, e))) {
                r.push(n);
                break;
            }
            return this.pushStack(1 < r.length ? k.uniqueSort(r) : r);
        },
        index: function(e) {
            return e ? "string" == typeof e ? o.call(k(e), this[0]) : o.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function(e, t) {
            return this.pushStack(k.uniqueSort(k.merge(this.get(), k(e, t))));
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
        }
    }), k.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null;
        },
        parents: function(e) {
            return v(e, "parentNode");
        },
        parentsUntil: function(e, t, n) {
            return v(e, "parentNode", n);
        },
        next: function(e) {
            return E(e, "nextSibling");
        },
        prev: function(e) {
            return E(e, "previousSibling");
        },
        nextAll: function(e) {
            return v(e, "nextSibling");
        },
        prevAll: function(e) {
            return v(e, "previousSibling");
        },
        nextUntil: function(e, t, n) {
            return v(e, "nextSibling", n);
        },
        prevUntil: function(e, t, n) {
            return v(e, "previousSibling", n);
        },
        siblings: function(e) {
            return b((e.parentNode || {}).firstChild, e);
        },
        children: function(e) {
            return b(e.firstChild);
        },
        contents: function(e) {
            return e.contentDocument || k.merge([], e.childNodes);
        }
    }, function(i, o) {
        k.fn[i] = function(e, t) {
            var n = k.map(this, o, e);
            return "Until" !== i.slice(-5) && (t = e), t && "string" == typeof t && (n = k.filter(t, n)), 
            1 < this.length && (N[i] || k.uniqueSort(n), A.test(i) && n.reverse()), this.pushStack(n);
        };
    });
    var I, $ = /\S+/g;
    function O() {
        D.removeEventListener("DOMContentLoaded", O), T.removeEventListener("load", O), 
        k.ready();
    }
    k.Callbacks = function(i) {
        i = "string" == typeof i ? function(e) {
            var n = {};
            return k.each(e.match($) || [], function(e, t) {
                n[t] = !0;
            }), n;
        }(i) : k.extend({}, i);
        function n() {
            for (r = i.once, t = o = !0; a.length; l = -1) for (e = a.shift(); ++l < s.length; ) !1 === s[l].apply(e[0], e[1]) && i.stopOnFalse && (l = s.length, 
            e = !1);
            i.memory || (e = !1), o = !1, r && (s = e ? [] : "");
        }
        var o, e, t, r, s = [], a = [], l = -1, c = {
            add: function() {
                return s && (e && !o && (l = s.length - 1, a.push(e)), function n(e) {
                    k.each(e, function(e, t) {
                        k.isFunction(t) ? i.unique && c.has(t) || s.push(t) : t && t.length && "string" !== k.type(t) && n(t);
                    });
                }(arguments), e && !o && n()), this;
            },
            remove: function() {
                return k.each(arguments, function(e, t) {
                    for (var n; -1 < (n = k.inArray(t, s, n)); ) s.splice(n, 1), n <= l && l--;
                }), this;
            },
            has: function(e) {
                return e ? -1 < k.inArray(e, s) : 0 < s.length;
            },
            empty: function() {
                return s = s && [], this;
            },
            disable: function() {
                return r = a = [], s = e = "", this;
            },
            disabled: function() {
                return !s;
            },
            lock: function() {
                return r = a = [], e || (s = e = ""), this;
            },
            locked: function() {
                return !!r;
            },
            fireWith: function(e, t) {
                return r || (t = [ e, (t = t || []).slice ? t.slice() : t ], a.push(t), o || n()), 
                this;
            },
            fire: function() {
                return c.fireWith(this, arguments), this;
            },
            fired: function() {
                return !!t;
            }
        };
        return c;
    }, k.extend({
        Deferred: function(e) {
            var r = [ [ "resolve", "done", k.Callbacks("once memory"), "resolved" ], [ "reject", "fail", k.Callbacks("once memory"), "rejected" ], [ "notify", "progress", k.Callbacks("memory") ] ], o = "pending", s = {
                state: function() {
                    return o;
                },
                always: function() {
                    return a.done(arguments).fail(arguments), this;
                },
                then: function() {
                    var o = arguments;
                    return k.Deferred(function(i) {
                        k.each(r, function(e, t) {
                            var n = k.isFunction(o[e]) && o[e];
                            a[t[1]](function() {
                                var e = n && n.apply(this, arguments);
                                e && k.isFunction(e.promise) ? e.promise().progress(i.notify).done(i.resolve).fail(i.reject) : i[t[0] + "With"](this === s ? i.promise() : this, n ? [ e ] : arguments);
                            });
                        }), o = null;
                    }).promise();
                },
                promise: function(e) {
                    return null != e ? k.extend(e, s) : s;
                }
            }, a = {};
            return s.pipe = s.then, k.each(r, function(e, t) {
                var n = t[2], i = t[3];
                s[t[1]] = n.add, i && n.add(function() {
                    o = i;
                }, r[1 ^ e][2].disable, r[2][2].lock), a[t[0]] = function() {
                    return a[t[0] + "With"](this === a ? s : this, arguments), this;
                }, a[t[0] + "With"] = n.fireWith;
            }), s.promise(a), e && e.call(a, a), a;
        },
        when: function(e) {
            function t(t, n, i) {
                return function(e) {
                    n[t] = this, i[t] = 1 < arguments.length ? u.call(arguments) : e, i === o ? c.notifyWith(n, i) : --l || c.resolveWith(n, i);
                };
            }
            var o, n, i, r = 0, s = u.call(arguments), a = s.length, l = 1 !== a || e && k.isFunction(e.promise) ? a : 0, c = 1 === l ? e : k.Deferred();
            if (1 < a) for (o = new Array(a), n = new Array(a), i = new Array(a); r < a; r++) s[r] && k.isFunction(s[r].promise) ? s[r].promise().progress(t(r, n, o)).done(t(r, i, s)).fail(c.reject) : --l;
            return l || c.resolveWith(i, s), c.promise();
        }
    }), k.fn.ready = function(e) {
        return k.ready.promise().done(e), this;
    }, k.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? k.readyWait++ : k.ready(!0);
        },
        ready: function(e) {
            (!0 === e ? --k.readyWait : k.isReady) || (k.isReady = !0) !== e && 0 < --k.readyWait || (I.resolveWith(D, [ k ]), 
            k.fn.triggerHandler && (k(D).triggerHandler("ready"), k(D).off("ready")));
        }
    }), k.ready.promise = function(e) {
        return I || (I = k.Deferred(), "complete" === D.readyState || "loading" !== D.readyState && !D.documentElement.doScroll ? T.setTimeout(k.ready) : (D.addEventListener("DOMContentLoaded", O), 
        T.addEventListener("load", O))), I.promise(e);
    }, k.ready.promise();
    function F(e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
    }
    var P = function(e, t, n, i, o, r, s) {
        var a = 0, l = e.length, c = null == n;
        if ("object" === k.type(n)) for (a in o = !0, n) P(e, t, a, n[a], !0, r, s); else if (void 0 !== i && (o = !0, 
        k.isFunction(i) || (s = !0), c && (t = s ? (t.call(e, i), null) : (c = t, function(e, t, n) {
            return c.call(k(e), n);
        })), t)) for (;a < l; a++) t(e[a], n, s ? i : i.call(e[a], a, t(e[a], n)));
        return o ? e : c ? t.call(e) : l ? t(e[0], n) : r;
    };
    function M() {
        this.expando = k.expando + M.uid++;
    }
    M.uid = 1, M.prototype = {
        register: function(e, t) {
            var n = t || {};
            return e.nodeType ? e[this.expando] = n : Object.defineProperty(e, this.expando, {
                value: n,
                writable: !0,
                configurable: !0
            }), e[this.expando];
        },
        cache: function(e) {
            if (!F(e)) return {};
            var t = e[this.expando];
            return t || (t = {}, F(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))), t;
        },
        set: function(e, t, n) {
            var i, o = this.cache(e);
            if ("string" == typeof t) o[t] = n; else for (i in t) o[i] = t[i];
            return o;
        },
        get: function(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][t];
        },
        access: function(e, t, n) {
            var i;
            return void 0 === t || t && "string" == typeof t && void 0 === n ? void 0 !== (i = this.get(e, t)) ? i : this.get(e, k.camelCase(t)) : (this.set(e, t, n), 
            void 0 !== n ? n : t);
        },
        remove: function(e, t) {
            var n, i, o, r = e[this.expando];
            if (void 0 !== r) {
                if (void 0 === t) this.register(e); else {
                    n = (i = k.isArray(t) ? t.concat(t.map(k.camelCase)) : (o = k.camelCase(t), t in r ? [ t, o ] : (i = o) in r ? [ i ] : i.match($) || [])).length;
                    for (;n--; ) delete r[i[n]];
                }
                void 0 !== t && !k.isEmptyObject(r) || (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando]);
            }
        },
        hasData: function(e) {
            var t = e[this.expando];
            return void 0 !== t && !k.isEmptyObject(t);
        }
    };
    var L = new M(), j = new M(), R = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, q = /[A-Z]/g;
    function H(e, t, n) {
        var i;
        if (void 0 === n && 1 === e.nodeType) if (i = "data-" + t.replace(q, "-$&").toLowerCase(), 
        "string" == typeof (n = e.getAttribute(i))) {
            try {
                n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : R.test(n) ? k.parseJSON(n) : n);
            } catch (e) {}
            j.set(e, t, n);
        } else n = void 0;
        return n;
    }
    k.extend({
        hasData: function(e) {
            return j.hasData(e) || L.hasData(e);
        },
        data: function(e, t, n) {
            return j.access(e, t, n);
        },
        removeData: function(e, t) {
            j.remove(e, t);
        },
        _data: function(e, t, n) {
            return L.access(e, t, n);
        },
        _removeData: function(e, t) {
            L.remove(e, t);
        }
    }), k.fn.extend({
        data: function(i, e) {
            var t, n, o, r = this[0], s = r && r.attributes;
            if (void 0 !== i) return "object" == typeof i ? this.each(function() {
                j.set(this, i);
            }) : P(this, function(t) {
                var e, n;
                if (r && void 0 === t) return void 0 !== (e = j.get(r, i) || j.get(r, i.replace(q, "-$&").toLowerCase())) ? e : (n = k.camelCase(i), 
                void 0 !== (e = j.get(r, n)) ? e : void 0 !== (e = H(r, n, void 0)) ? e : void 0);
                n = k.camelCase(i), this.each(function() {
                    var e = j.get(this, n);
                    j.set(this, n, t), -1 < i.indexOf("-") && void 0 !== e && j.set(this, i, t);
                });
            }, null, e, 1 < arguments.length, null, !0);
            if (this.length && (o = j.get(r), 1 === r.nodeType && !L.get(r, "hasDataAttrs"))) {
                for (t = s.length; t--; ) s[t] && 0 === (n = s[t].name).indexOf("data-") && (n = k.camelCase(n.slice(5)), 
                H(r, n, o[n]));
                L.set(r, "hasDataAttrs", !0);
            }
            return o;
        },
        removeData: function(e) {
            return this.each(function() {
                j.remove(this, e);
            });
        }
    }), k.extend({
        queue: function(e, t, n) {
            var i;
            if (e) return t = (t || "fx") + "queue", i = L.get(e, t), n && (!i || k.isArray(n) ? i = L.access(e, t, k.makeArray(n)) : i.push(n)), 
            i || [];
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = k.queue(e, t), i = n.length, o = n.shift(), r = k._queueHooks(e, t);
            "inprogress" === o && (o = n.shift(), i--), o && ("fx" === t && n.unshift("inprogress"), 
            delete r.stop, o.call(e, function() {
                k.dequeue(e, t);
            }, r)), !i && r && r.empty.fire();
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return L.get(e, n) || L.access(e, n, {
                empty: k.Callbacks("once memory").add(function() {
                    L.remove(e, [ t + "queue", n ]);
                })
            });
        }
    }), k.fn.extend({
        queue: function(t, n) {
            var e = 2;
            return "string" != typeof t && (n = t, t = "fx", e--), arguments.length < e ? k.queue(this[0], t) : void 0 === n ? this : this.each(function() {
                var e = k.queue(this, t, n);
                k._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && k.dequeue(this, t);
            });
        },
        dequeue: function(e) {
            return this.each(function() {
                k.dequeue(this, e);
            });
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", []);
        },
        promise: function(e, t) {
            function n() {
                --o || r.resolveWith(s, [ s ]);
            }
            var i, o = 1, r = k.Deferred(), s = this, a = this.length;
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--; ) (i = L.get(s[a], e + "queueHooks")) && i.empty && (o++, 
            i.empty.add(n));
            return n(), r.promise(t);
        }
    });
    function U(e, t) {
        return e = t || e, "none" === k.css(e, "display") || !k.contains(e.ownerDocument, e);
    }
    var W = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, V = new RegExp("^(?:([+-])=|)(" + W + ")([a-z%]*)$", "i"), z = [ "Top", "Right", "Bottom", "Left" ];
    function B(e, t, n, i) {
        var o, r = 1, s = 20, a = i ? function() {
            return i.cur();
        } : function() {
            return k.css(e, t, "");
        }, l = a(), c = n && n[3] || (k.cssNumber[t] ? "" : "px"), u = (k.cssNumber[t] || "px" !== c && +l) && V.exec(k.css(e, t));
        if (u && u[3] !== c) for (c = c || u[3], n = n || [], u = +l || 1; u /= r = r || ".5", 
        k.style(e, t, u + c), r !== (r = a() / l) && 1 !== r && --s; ) ;
        return n && (u = +u || +l || 0, o = n[1] ? u + (n[1] + 1) * n[2] : +n[2], i && (i.unit = c, 
        i.start = u, i.end = o)), o;
    }
    var Y = /^(?:checkbox|radio)$/i, Q = /<([\w:-]+)/, X = /^$|\/(?:java|ecma)script/i, K = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        thead: [ 1, "<table>", "</table>" ],
        col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: [ 0, "", "" ]
    };
    function G(e, t) {
        var n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
        return void 0 === t || t && k.nodeName(e, t) ? k.merge([ e ], n) : n;
    }
    function J(e, t) {
        for (var n = 0, i = e.length; n < i; n++) L.set(e[n], "globalEval", !t || L.get(t[n], "globalEval"));
    }
    K.optgroup = K.option, K.tbody = K.tfoot = K.colgroup = K.caption = K.thead, K.th = K.td;
    var Z, ee, te = /<|&#?\w+;/;
    function ne(e, t, n, i, o) {
        for (var r, s, a, l, c, u, d = t.createDocumentFragment(), h = [], f = 0, p = e.length; f < p; f++) if ((r = e[f]) || 0 === r) if ("object" === k.type(r)) k.merge(h, r.nodeType ? [ r ] : r); else if (te.test(r)) {
            for (s = s || d.appendChild(t.createElement("div")), a = (Q.exec(r) || [ "", "" ])[1].toLowerCase(), 
            l = K[a] || K._default, s.innerHTML = l[1] + k.htmlPrefilter(r) + l[2], u = l[0]; u--; ) s = s.lastChild;
            k.merge(h, s.childNodes), (s = d.firstChild).textContent = "";
        } else h.push(t.createTextNode(r));
        for (d.textContent = "", f = 0; r = h[f++]; ) if (i && -1 < k.inArray(r, i)) o && o.push(r); else if (c = k.contains(r.ownerDocument, r), 
        s = G(d.appendChild(r), "script"), c && J(s), n) for (u = 0; r = s[u++]; ) X.test(r.type || "") && n.push(r);
        return d;
    }
    Z = D.createDocumentFragment().appendChild(D.createElement("div")), (ee = D.createElement("input")).setAttribute("type", "radio"), 
    ee.setAttribute("checked", "checked"), ee.setAttribute("name", "t"), Z.appendChild(ee), 
    m.checkClone = Z.cloneNode(!0).cloneNode(!0).lastChild.checked, Z.innerHTML = "<textarea>x</textarea>", 
    m.noCloneChecked = !!Z.cloneNode(!0).lastChild.defaultValue;
    var ie = /^key/, oe = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, re = /^([^.]*)(?:\.(.+)|)/;
    function se() {
        return !0;
    }
    function ae() {
        return !1;
    }
    function le() {
        try {
            return D.activeElement;
        } catch (e) {}
    }
    function ce(e, t, n, i, o, r) {
        var s, a;
        if ("object" == typeof t) {
            for (a in "string" != typeof n && (i = i || n, n = void 0), t) ce(e, a, n, i, t[a], r);
            return e;
        }
        if (null == i && null == o ? (o = n, i = n = void 0) : null == o && ("string" == typeof n ? (o = i, 
        i = void 0) : (o = i, i = n, n = void 0)), !1 === o) o = ae; else if (!o) return e;
        return 1 === r && (s = o, (o = function(e) {
            return k().off(e), s.apply(this, arguments);
        }).guid = s.guid || (s.guid = k.guid++)), e.each(function() {
            k.event.add(this, t, o, i, n);
        });
    }
    k.event = {
        global: {},
        add: function(t, e, n, i, o) {
            var r, s, a, l, c, u, d, h, f, p, g, m = L.get(t);
            if (m) for (n.handler && (n = (r = n).handler, o = r.selector), n.guid || (n.guid = k.guid++), 
            (l = m.events) || (l = m.events = {}), (s = m.handle) || (s = m.handle = function(e) {
                return void 0 !== k && k.event.triggered !== e.type ? k.event.dispatch.apply(t, arguments) : void 0;
            }), c = (e = (e || "").match($) || [ "" ]).length; c--; ) f = g = (a = re.exec(e[c]) || [])[1], 
            p = (a[2] || "").split(".").sort(), f && (d = k.event.special[f] || {}, f = (o ? d.delegateType : d.bindType) || f, 
            d = k.event.special[f] || {}, u = k.extend({
                type: f,
                origType: g,
                data: i,
                handler: n,
                guid: n.guid,
                selector: o,
                needsContext: o && k.expr.match.needsContext.test(o),
                namespace: p.join(".")
            }, r), (h = l[f]) || ((h = l[f] = []).delegateCount = 0, d.setup && !1 !== d.setup.call(t, i, p, s) || t.addEventListener && t.addEventListener(f, s)), 
            d.add && (d.add.call(t, u), u.handler.guid || (u.handler.guid = n.guid)), o ? h.splice(h.delegateCount++, 0, u) : h.push(u), 
            k.event.global[f] = !0);
        },
        remove: function(e, t, n, i, o) {
            var r, s, a, l, c, u, d, h, f, p, g, m = L.hasData(e) && L.get(e);
            if (m && (l = m.events)) {
                for (c = (t = (t || "").match($) || [ "" ]).length; c--; ) if (f = g = (a = re.exec(t[c]) || [])[1], 
                p = (a[2] || "").split(".").sort(), f) {
                    for (d = k.event.special[f] || {}, h = l[f = (i ? d.delegateType : d.bindType) || f] || [], 
                    a = a[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = r = h.length; r--; ) u = h[r], 
                    !o && g !== u.origType || n && n.guid !== u.guid || a && !a.test(u.namespace) || i && i !== u.selector && ("**" !== i || !u.selector) || (h.splice(r, 1), 
                    u.selector && h.delegateCount--, d.remove && d.remove.call(e, u));
                    s && !h.length && (d.teardown && !1 !== d.teardown.call(e, p, m.handle) || k.removeEvent(e, f, m.handle), 
                    delete l[f]);
                } else for (f in l) k.event.remove(e, f + t[c], n, i, !0);
                k.isEmptyObject(l) && L.remove(e, "handle events");
            }
        },
        dispatch: function(e) {
            e = k.event.fix(e);
            var t, n, i, o, r, s, a = u.call(arguments), l = (L.get(this, "events") || {})[e.type] || [], c = k.event.special[e.type] || {};
            if ((a[0] = e).delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, e)) {
                for (s = k.event.handlers.call(this, e, l), t = 0; (o = s[t++]) && !e.isPropagationStopped(); ) for (e.currentTarget = o.elem, 
                n = 0; (r = o.handlers[n++]) && !e.isImmediatePropagationStopped(); ) e.rnamespace && !e.rnamespace.test(r.namespace) || (e.handleObj = r, 
                e.data = r.data, void 0 !== (i = ((k.event.special[r.origType] || {}).handle || r.handler).apply(o.elem, a)) && !1 === (e.result = i) && (e.preventDefault(), 
                e.stopPropagation()));
                return c.postDispatch && c.postDispatch.call(this, e), e.result;
            }
        },
        handlers: function(e, t) {
            var n, i, o, r, s = [], a = t.delegateCount, l = e.target;
            if (a && l.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1)) for (;l !== this; l = l.parentNode || this) if (1 === l.nodeType && (!0 !== l.disabled || "click" !== e.type)) {
                for (i = [], n = 0; n < a; n++) void 0 === i[o = (r = t[n]).selector + " "] && (i[o] = r.needsContext ? -1 < k(o, this).index(l) : k.find(o, this, null, [ l ]).length), 
                i[o] && i.push(r);
                i.length && s.push({
                    elem: l,
                    handlers: i
                });
            }
            return a < t.length && s.push({
                elem: this,
                handlers: t.slice(a)
            }), s;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), 
                e;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, t) {
                var n, i, o, r = t.button;
                return null == e.pageX && null != t.clientX && (i = (n = e.target.ownerDocument || D).documentElement, 
                o = n.body, e.pageX = t.clientX + (i && i.scrollLeft || o && o.scrollLeft || 0) - (i && i.clientLeft || o && o.clientLeft || 0), 
                e.pageY = t.clientY + (i && i.scrollTop || o && o.scrollTop || 0) - (i && i.clientTop || o && o.clientTop || 0)), 
                e.which || void 0 === r || (e.which = 1 & r ? 1 : 2 & r ? 3 : 4 & r ? 2 : 0), e;
            }
        },
        fix: function(e) {
            if (e[k.expando]) return e;
            var t, n, i, o = e.type, r = e, s = this.fixHooks[o];
            for (s || (this.fixHooks[o] = s = oe.test(o) ? this.mouseHooks : ie.test(o) ? this.keyHooks : {}), 
            i = s.props ? this.props.concat(s.props) : this.props, e = new k.Event(r), t = i.length; t--; ) e[n = i[t]] = r[n];
            return e.target || (e.target = D), 3 === e.target.nodeType && (e.target = e.target.parentNode), 
            s.filter ? s.filter(e, r) : e;
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== le() && this.focus) return this.focus(), !1;
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === le() && this.blur) return this.blur(), !1;
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if ("checkbox" === this.type && this.click && k.nodeName(this, "input")) return this.click(), 
                    !1;
                },
                _default: function(e) {
                    return k.nodeName(e.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result);
                }
            }
        }
    }, k.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n);
    }, k.Event = function(e, t) {
        if (!(this instanceof k.Event)) return new k.Event(e, t);
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? se : ae) : this.type = e, 
        t && k.extend(this, t), this.timeStamp = e && e.timeStamp || k.now(), this[k.expando] = !0;
    }, k.Event.prototype = {
        constructor: k.Event,
        isDefaultPrevented: ae,
        isPropagationStopped: ae,
        isImmediatePropagationStopped: ae,
        isSimulated: !1,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = se, e && !this.isSimulated && e.preventDefault();
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = se, e && !this.isSimulated && e.stopPropagation();
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = se, e && !this.isSimulated && e.stopImmediatePropagation(), 
            this.stopPropagation();
        }
    }, k.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, o) {
        k.event.special[e] = {
            delegateType: o,
            bindType: o,
            handle: function(e) {
                var t, n = e.relatedTarget, i = e.handleObj;
                return n && (n === this || k.contains(this, n)) || (e.type = i.origType, t = i.handler.apply(this, arguments), 
                e.type = o), t;
            }
        };
    }), k.fn.extend({
        on: function(e, t, n, i) {
            return ce(this, e, t, n, i);
        },
        one: function(e, t, n, i) {
            return ce(this, e, t, n, i, 1);
        },
        off: function(e, t, n) {
            var i, o;
            if (e && e.preventDefault && e.handleObj) return i = e.handleObj, k(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), 
            this;
            if ("object" != typeof e) return !1 !== t && "function" != typeof t || (n = t, t = void 0), 
            !1 === n && (n = ae), this.each(function() {
                k.event.remove(this, e, n, t);
            });
            for (o in e) this.off(o, t, e[o]);
            return this;
        }
    });
    var ue = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi, de = /<script|<style|<link/i, he = /checked\s*(?:[^=]|=\s*.checked.)/i, fe = /^true\/(.*)/, pe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    function ge(e, t) {
        return k.nodeName(e, "table") && k.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e;
    }
    function me(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e;
    }
    function ve(e) {
        var t = fe.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e;
    }
    function be(e, t) {
        var n, i, o, r, s, a, l, c;
        if (1 === t.nodeType) {
            if (L.hasData(e) && (r = L.access(e), s = L.set(t, r), c = r.events)) for (o in delete s.handle, 
            s.events = {}, c) for (n = 0, i = c[o].length; n < i; n++) k.event.add(t, o, c[o][n]);
            j.hasData(e) && (a = j.access(e), l = k.extend({}, a), j.set(t, l));
        }
    }
    function ye(n, i, o, r) {
        i = g.apply([], i);
        var e, t, s, a, l, c, u = 0, d = n.length, h = d - 1, f = i[0], p = k.isFunction(f);
        if (p || 1 < d && "string" == typeof f && !m.checkClone && he.test(f)) return n.each(function(e) {
            var t = n.eq(e);
            p && (i[0] = f.call(this, e, t.html())), ye(t, i, o, r);
        });
        if (d && (t = (e = ne(i, n[0].ownerDocument, !1, n, r)).firstChild, 1 === e.childNodes.length && (e = t), 
        t || r)) {
            for (a = (s = k.map(G(e, "script"), me)).length; u < d; u++) l = e, u !== h && (l = k.clone(l, !0, !0), 
            a && k.merge(s, G(l, "script"))), o.call(n[u], l, u);
            if (a) for (c = s[s.length - 1].ownerDocument, k.map(s, ve), u = 0; u < a; u++) l = s[u], 
            X.test(l.type || "") && !L.access(l, "globalEval") && k.contains(c, l) && (l.src ? k._evalUrl && k._evalUrl(l.src) : k.globalEval(l.textContent.replace(pe, "")));
        }
        return n;
    }
    function we(e, t, n) {
        for (var i, o = t ? k.filter(t, e) : e, r = 0; null != (i = o[r]); r++) n || 1 !== i.nodeType || k.cleanData(G(i)), 
        i.parentNode && (n && k.contains(i.ownerDocument, i) && J(G(i, "script")), i.parentNode.removeChild(i));
        return e;
    }
    k.extend({
        htmlPrefilter: function(e) {
            return e.replace(ue, "<$1></$2>");
        },
        clone: function(e, t, n) {
            var i, o, r, s, a, l, c, u = e.cloneNode(!0), d = k.contains(e.ownerDocument, e);
            if (!(m.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || k.isXMLDoc(e))) for (s = G(u), 
            i = 0, o = (r = G(e)).length; i < o; i++) a = r[i], l = s[i], void 0, "input" === (c = l.nodeName.toLowerCase()) && Y.test(a.type) ? l.checked = a.checked : "input" !== c && "textarea" !== c || (l.defaultValue = a.defaultValue);
            if (t) if (n) for (r = r || G(e), s = s || G(u), i = 0, o = r.length; i < o; i++) be(r[i], s[i]); else be(e, u);
            return 0 < (s = G(u, "script")).length && J(s, !d && G(e, "script")), u;
        },
        cleanData: function(e) {
            for (var t, n, i, o = k.event.special, r = 0; void 0 !== (n = e[r]); r++) if (F(n)) {
                if (t = n[L.expando]) {
                    if (t.events) for (i in t.events) o[i] ? k.event.remove(n, i) : k.removeEvent(n, i, t.handle);
                    n[L.expando] = void 0;
                }
                n[j.expando] && (n[j.expando] = void 0);
            }
        }
    }), k.fn.extend({
        domManip: ye,
        detach: function(e) {
            return we(this, e, !0);
        },
        remove: function(e) {
            return we(this, e);
        },
        text: function(e) {
            return P(this, function(e) {
                return void 0 === e ? k.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e);
                });
            }, null, e, arguments.length);
        },
        append: function() {
            return ye(this, arguments, function(e) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || ge(this, e).appendChild(e);
            });
        },
        prepend: function() {
            return ye(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = ge(this, e);
                    t.insertBefore(e, t.firstChild);
                }
            });
        },
        before: function() {
            return ye(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this);
            });
        },
        after: function() {
            return ye(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
            });
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (k.cleanData(G(e, !1)), 
            e.textContent = "");
            return this;
        },
        clone: function(e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function() {
                return k.clone(this, e, t);
            });
        },
        html: function(e) {
            return P(this, function(e) {
                var t = this[0] || {}, n = 0, i = this.length;
                if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof e && !de.test(e) && !K[(Q.exec(e) || [ "", "" ])[1].toLowerCase()]) {
                    e = k.htmlPrefilter(e);
                    try {
                        for (;n < i; n++) 1 === (t = this[n] || {}).nodeType && (k.cleanData(G(t, !1)), 
                        t.innerHTML = e);
                        t = 0;
                    } catch (e) {}
                }
                t && this.empty().append(e);
            }, null, e, arguments.length);
        },
        replaceWith: function() {
            var n = [];
            return ye(this, arguments, function(e) {
                var t = this.parentNode;
                k.inArray(this, n) < 0 && (k.cleanData(G(this)), t && t.replaceChild(e, this));
            }, n);
        }
    }), k.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, s) {
        k.fn[e] = function(e) {
            for (var t, n = [], i = k(e), o = i.length - 1, r = 0; r <= o; r++) t = r === o ? this : this.clone(!0), 
            k(i[r])[s](t), a.apply(n, t.get());
            return this.pushStack(n);
        };
    });
    var xe, Ce = {
        HTML: "block",
        BODY: "block"
    };
    function Te(e, t) {
        var n = k(t.createElement(e)).appendTo(t.body), i = k.css(n[0], "display");
        return n.detach(), i;
    }
    function De(e) {
        var t = D, n = Ce[e];
        return n || ("none" !== (n = Te(e, t)) && n || ((t = (xe = (xe || k("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement))[0].contentDocument).write(), 
        t.close(), n = Te(e, t), xe.detach()), Ce[e] = n), n;
    }
    function ke(e, t, n, i) {
        var o, r, s = {};
        for (r in t) s[r] = e.style[r], e.style[r] = t[r];
        for (r in o = n.apply(e, i || []), t) e.style[r] = s[r];
        return o;
    }
    var Se, _e, Ae, Ne, Ee, Ie, $e = /^margin/, Oe = new RegExp("^(" + W + ")(?!px)[a-z%]+$", "i"), Fe = function(e) {
        var t = e.ownerDocument.defaultView;
        return t && t.opener || (t = T), t.getComputedStyle(e);
    }, Pe = D.documentElement;
    function Me() {
        Ie.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", 
        Ie.innerHTML = "", Pe.appendChild(Ee);
        var e = T.getComputedStyle(Ie);
        Se = "1%" !== e.top, Ne = "2px" === e.marginLeft, _e = "4px" === e.width, Ie.style.marginRight = "50%", 
        Ae = "4px" === e.marginRight, Pe.removeChild(Ee);
    }
    function Le(e, t, n) {
        var i, o, r, s, a = e.style;
        return "" !== (s = (n = n || Fe(e)) ? n.getPropertyValue(t) || n[t] : void 0) && void 0 !== s || k.contains(e.ownerDocument, e) || (s = k.style(e, t)), 
        n && !m.pixelMarginRight() && Oe.test(s) && $e.test(t) && (i = a.width, o = a.minWidth, 
        r = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, a.width = i, 
        a.minWidth = o, a.maxWidth = r), void 0 !== s ? s + "" : s;
    }
    function je(e, t) {
        return {
            get: function() {
                if (!e()) return (this.get = t).apply(this, arguments);
                delete this.get;
            }
        };
    }
    Ee = D.createElement("div"), (Ie = D.createElement("div")).style && (Ie.style.backgroundClip = "content-box", 
    Ie.cloneNode(!0).style.backgroundClip = "", m.clearCloneStyle = "content-box" === Ie.style.backgroundClip, 
    Ee.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", 
    Ee.appendChild(Ie), k.extend(m, {
        pixelPosition: function() {
            return Me(), Se;
        },
        boxSizingReliable: function() {
            return null == _e && Me(), _e;
        },
        pixelMarginRight: function() {
            return null == _e && Me(), Ae;
        },
        reliableMarginLeft: function() {
            return null == _e && Me(), Ne;
        },
        reliableMarginRight: function() {
            var e, t = Ie.appendChild(D.createElement("div"));
            return t.style.cssText = Ie.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", 
            t.style.marginRight = t.style.width = "0", Ie.style.width = "1px", Pe.appendChild(Ee), 
            e = !parseFloat(T.getComputedStyle(t).marginRight), Pe.removeChild(Ee), Ie.removeChild(t), 
            e;
        }
    }));
    var Re = /^(none|table(?!-c[ea]).+)/, qe = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, He = {
        letterSpacing: "0",
        fontWeight: "400"
    }, Ue = [ "Webkit", "O", "Moz", "ms" ], We = D.createElement("div").style;
    function Ve(e) {
        if (e in We) return e;
        for (var t = e[0].toUpperCase() + e.slice(1), n = Ue.length; n--; ) if ((e = Ue[n] + t) in We) return e;
    }
    function ze(e, t, n) {
        var i = V.exec(t);
        return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : t;
    }
    function Be(e, t, n, i, o) {
        for (var r = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, s = 0; r < 4; r += 2) "margin" === n && (s += k.css(e, n + z[r], !0, o)), 
        i ? ("content" === n && (s -= k.css(e, "padding" + z[r], !0, o)), "margin" !== n && (s -= k.css(e, "border" + z[r] + "Width", !0, o))) : (s += k.css(e, "padding" + z[r], !0, o), 
        "padding" !== n && (s += k.css(e, "border" + z[r] + "Width", !0, o)));
        return s;
    }
    function Ye(e, t, n) {
        var i = !0, o = "width" === t ? e.offsetWidth : e.offsetHeight, r = Fe(e), s = "border-box" === k.css(e, "boxSizing", !1, r);
        if (o <= 0 || null == o) {
            if (((o = Le(e, t, r)) < 0 || null == o) && (o = e.style[t]), Oe.test(o)) return o;
            i = s && (m.boxSizingReliable() || o === e.style[t]), o = parseFloat(o) || 0;
        }
        return o + Be(e, t, n || (s ? "border" : "content"), i, r) + "px";
    }
    function Qe(e, t) {
        for (var n, i, o, r = [], s = 0, a = e.length; s < a; s++) (i = e[s]).style && (r[s] = L.get(i, "olddisplay"), 
        n = i.style.display, t ? (r[s] || "none" !== n || (i.style.display = ""), "" === i.style.display && U(i) && (r[s] = L.access(i, "olddisplay", De(i.nodeName)))) : (o = U(i), 
        "none" === n && o || L.set(i, "olddisplay", o ? n : k.css(i, "display"))));
        for (s = 0; s < a; s++) (i = e[s]).style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? r[s] || "" : "none"));
        return e;
    }
    function Xe(e, t, n, i, o) {
        return new Xe.prototype.init(e, t, n, i, o);
    }
    k.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = Le(e, "opacity");
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
                var o, r, s, a = k.camelCase(t), l = e.style;
                if (t = k.cssProps[a] || (k.cssProps[a] = Ve(a) || a), s = k.cssHooks[t] || k.cssHooks[a], 
                void 0 === n) return s && "get" in s && void 0 !== (o = s.get(e, !1, i)) ? o : l[t];
                "string" === (r = typeof n) && (o = V.exec(n)) && o[1] && (n = B(e, t, o), r = "number"), 
                null != n && n == n && ("number" === r && (n += o && o[3] || (k.cssNumber[a] ? "" : "px")), 
                m.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), 
                s && "set" in s && void 0 === (n = s.set(e, n, i)) || (l[t] = n));
            }
        },
        css: function(e, t, n, i) {
            var o, r, s, a = k.camelCase(t);
            return t = k.cssProps[a] || (k.cssProps[a] = Ve(a) || a), (s = k.cssHooks[t] || k.cssHooks[a]) && "get" in s && (o = s.get(e, !0, n)), 
            void 0 === o && (o = Le(e, t, i)), "normal" === o && t in He && (o = He[t]), "" === n || n ? (r = parseFloat(o), 
            !0 === n || isFinite(r) ? r || 0 : o) : o;
        }
    }), k.each([ "height", "width" ], function(e, s) {
        k.cssHooks[s] = {
            get: function(e, t, n) {
                if (t) return Re.test(k.css(e, "display")) && 0 === e.offsetWidth ? ke(e, qe, function() {
                    return Ye(e, s, n);
                }) : Ye(e, s, n);
            },
            set: function(e, t, n) {
                var i, o = n && Fe(e), r = n && Be(e, s, n, "border-box" === k.css(e, "boxSizing", !1, o), o);
                return r && (i = V.exec(t)) && "px" !== (i[3] || "px") && (e.style[s] = t, t = k.css(e, s)), 
                ze(0, t, r);
            }
        };
    }), k.cssHooks.marginLeft = je(m.reliableMarginLeft, function(e, t) {
        if (t) return (parseFloat(Le(e, "marginLeft")) || e.getBoundingClientRect().left - ke(e, {
            marginLeft: 0
        }, function() {
            return e.getBoundingClientRect().left;
        })) + "px";
    }), k.cssHooks.marginRight = je(m.reliableMarginRight, function(e, t) {
        if (t) return ke(e, {
            display: "inline-block"
        }, Le, [ e, "marginRight" ]);
    }), k.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(o, r) {
        k.cssHooks[o + r] = {
            expand: function(e) {
                for (var t = 0, n = {}, i = "string" == typeof e ? e.split(" ") : [ e ]; t < 4; t++) n[o + z[t] + r] = i[t] || i[t - 2] || i[0];
                return n;
            }
        }, $e.test(o) || (k.cssHooks[o + r].set = ze);
    }), k.fn.extend({
        css: function(e, t) {
            return P(this, function(e, t, n) {
                var i, o, r = {}, s = 0;
                if (k.isArray(t)) {
                    for (i = Fe(e), o = t.length; s < o; s++) r[t[s]] = k.css(e, t[s], !1, i);
                    return r;
                }
                return void 0 !== n ? k.style(e, t, n) : k.css(e, t);
            }, e, t, 1 < arguments.length);
        },
        show: function() {
            return Qe(this, !0);
        },
        hide: function() {
            return Qe(this);
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                U(this) ? k(this).show() : k(this).hide();
            });
        }
    }), ((k.Tween = Xe).prototype = {
        constructor: Xe,
        init: function(e, t, n, i, o, r) {
            this.elem = e, this.prop = n, this.easing = o || k.easing._default, this.options = t, 
            this.start = this.now = this.cur(), this.end = i, this.unit = r || (k.cssNumber[n] ? "" : "px");
        },
        cur: function() {
            var e = Xe.propHooks[this.prop];
            return e && e.get ? e.get(this) : Xe.propHooks._default.get(this);
        },
        run: function(e) {
            var t, n = Xe.propHooks[this.prop];
            return this.options.duration ? this.pos = t = k.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, 
            this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
            n && n.set ? n.set(this) : Xe.propHooks._default.set(this), this;
        }
    }).init.prototype = Xe.prototype, (Xe.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = k.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0;
            },
            set: function(e) {
                k.fx.step[e.prop] ? k.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[k.cssProps[e.prop]] && !k.cssHooks[e.prop] ? e.elem[e.prop] = e.now : k.style(e.elem, e.prop, e.now + e.unit);
            }
        }
    }).scrollTop = Xe.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
        }
    }, k.easing = {
        linear: function(e) {
            return e;
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2;
        },
        _default: "swing"
    }, k.fx = Xe.prototype.init, k.fx.step = {};
    var Ke, Ge, Je, Ze, et, tt = /^(?:toggle|show|hide)$/, nt = /queueHooks$/;
    function it() {
        return T.setTimeout(function() {
            Ke = void 0;
        }), Ke = k.now();
    }
    function ot(e, t) {
        var n, i = 0, o = {
            height: e
        };
        for (t = t ? 1 : 0; i < 4; i += 2 - t) o["margin" + (n = z[i])] = o["padding" + n] = e;
        return t && (o.opacity = o.width = e), o;
    }
    function rt(e, t, n) {
        for (var i, o = (st.tweeners[t] || []).concat(st.tweeners["*"]), r = 0, s = o.length; r < s; r++) if (i = o[r].call(n, t, e)) return i;
    }
    function st(r, e, t) {
        var n, s, i = 0, o = st.prefilters.length, a = k.Deferred().always(function() {
            delete l.elem;
        }), l = function() {
            if (s) return !1;
            for (var e = Ke || it(), t = Math.max(0, c.startTime + c.duration - e), n = 1 - (t / c.duration || 0), i = 0, o = c.tweens.length; i < o; i++) c.tweens[i].run(n);
            return a.notifyWith(r, [ c, n, t ]), n < 1 && o ? t : (a.resolveWith(r, [ c ]), 
            !1);
        }, c = a.promise({
            elem: r,
            props: k.extend({}, e),
            opts: k.extend(!0, {
                specialEasing: {},
                easing: k.easing._default
            }, t),
            originalProperties: e,
            originalOptions: t,
            startTime: Ke || it(),
            duration: t.duration,
            tweens: [],
            createTween: function(e, t) {
                var n = k.Tween(r, c.opts, e, t, c.opts.specialEasing[e] || c.opts.easing);
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
            for (n in e) if (o = t[i = k.camelCase(n)], r = e[n], k.isArray(r) && (o = r[1], 
            r = e[n] = r[0]), n !== i && (e[i] = r, delete e[n]), (s = k.cssHooks[i]) && "expand" in s) for (n in r = s.expand(r), 
            delete e[i], r) n in e || (e[n] = r[n], t[n] = o); else t[i] = o;
        }(u, c.opts.specialEasing); i < o; i++) if (n = st.prefilters[i].call(c, r, u, c.opts)) return k.isFunction(n.stop) && (k._queueHooks(c.elem, c.opts.queue).stop = k.proxy(n.stop, n)), 
        n;
        return k.map(u, rt, c), k.isFunction(c.opts.start) && c.opts.start.call(r, c), k.fx.timer(k.extend(l, {
            elem: r,
            anim: c,
            queue: c.opts.queue
        })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always);
    }
    k.Animation = k.extend(st, {
        tweeners: {
            "*": [ function(e, t) {
                var n = this.createTween(e, t);
                return B(n.elem, e, V.exec(t), n), n;
            } ]
        },
        tweener: function(e, t) {
            for (var n, i = 0, o = (e = k.isFunction(e) ? (t = e, [ "*" ]) : e.match($)).length; i < o; i++) n = e[i], 
            st.tweeners[n] = st.tweeners[n] || [], st.tweeners[n].unshift(t);
        },
        prefilters: [ function(t, e, n) {
            var i, o, r, s, a, l, c, u = this, d = {}, h = t.style, f = t.nodeType && U(t), p = L.get(t, "fxshow");
            for (i in n.queue || (null == (a = k._queueHooks(t, "fx")).unqueued && (a.unqueued = 0, 
            l = a.empty.fire, a.empty.fire = function() {
                a.unqueued || l();
            }), a.unqueued++, u.always(function() {
                u.always(function() {
                    a.unqueued--, k.queue(t, "fx").length || a.empty.fire();
                });
            })), 1 === t.nodeType && ("height" in e || "width" in e) && (n.overflow = [ h.overflow, h.overflowX, h.overflowY ], 
            "inline" === ("none" === (c = k.css(t, "display")) ? L.get(t, "olddisplay") || De(t.nodeName) : c) && "none" === k.css(t, "float") && (h.display = "inline-block")), 
            n.overflow && (h.overflow = "hidden", u.always(function() {
                h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2];
            })), e) if (o = e[i], tt.exec(o)) {
                if (delete e[i], r = r || "toggle" === o, o === (f ? "hide" : "show")) {
                    if ("show" !== o || !p || void 0 === p[i]) continue;
                    f = !0;
                }
                d[i] = p && p[i] || k.style(t, i);
            } else c = void 0;
            if (k.isEmptyObject(d)) "inline" === ("none" === c ? De(t.nodeName) : c) && (h.display = c); else for (i in p ? "hidden" in p && (f = p.hidden) : p = L.access(t, "fxshow", {}), 
            r && (p.hidden = !f), f ? k(t).show() : u.done(function() {
                k(t).hide();
            }), u.done(function() {
                var e;
                for (e in L.remove(t, "fxshow"), d) k.style(t, e, d[e]);
            }), d) s = rt(f ? p[i] : 0, i, u), i in p || (p[i] = s.start, f && (s.end = s.start, 
            s.start = "width" === i || "height" === i ? 1 : 0));
        } ],
        prefilter: function(e, t) {
            t ? st.prefilters.unshift(e) : st.prefilters.push(e);
        }
    }), k.speed = function(e, t, n) {
        var i = e && "object" == typeof e ? k.extend({}, e) : {
            complete: n || !n && t || k.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !k.isFunction(t) && t
        };
        return i.duration = k.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in k.fx.speeds ? k.fx.speeds[i.duration] : k.fx.speeds._default, 
        null != i.queue && !0 !== i.queue || (i.queue = "fx"), i.old = i.complete, i.complete = function() {
            k.isFunction(i.old) && i.old.call(this), i.queue && k.dequeue(this, i.queue);
        }, i;
    }, k.fn.extend({
        fadeTo: function(e, t, n, i) {
            return this.filter(U).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, i);
        },
        animate: function(t, e, n, i) {
            function o() {
                var e = st(this, k.extend({}, t), s);
                (r || L.get(this, "finish")) && e.stop(!0);
            }
            var r = k.isEmptyObject(t), s = k.speed(e, n, i);
            return o.finish = o, r || !1 === s.queue ? this.each(o) : this.queue(s.queue, o);
        },
        stop: function(o, e, r) {
            function s(e) {
                var t = e.stop;
                delete e.stop, t(r);
            }
            return "string" != typeof o && (r = e, e = o, o = void 0), e && !1 !== o && this.queue(o || "fx", []), 
            this.each(function() {
                var e = !0, t = null != o && o + "queueHooks", n = k.timers, i = L.get(this);
                if (t) i[t] && i[t].stop && s(i[t]); else for (t in i) i[t] && i[t].stop && nt.test(t) && s(i[t]);
                for (t = n.length; t--; ) n[t].elem !== this || null != o && n[t].queue !== o || (n[t].anim.stop(r), 
                e = !1, n.splice(t, 1));
                !e && r || k.dequeue(this, o);
            });
        },
        finish: function(s) {
            return !1 !== s && (s = s || "fx"), this.each(function() {
                var e, t = L.get(this), n = t[s + "queue"], i = t[s + "queueHooks"], o = k.timers, r = n ? n.length : 0;
                for (t.finish = !0, k.queue(this, s, []), i && i.stop && i.stop.call(this, !0), 
                e = o.length; e--; ) o[e].elem === this && o[e].queue === s && (o[e].anim.stop(!0), 
                o.splice(e, 1));
                for (e = 0; e < r; e++) n[e] && n[e].finish && n[e].finish.call(this);
                delete t.finish;
            });
        }
    }), k.each([ "toggle", "show", "hide" ], function(e, i) {
        var o = k.fn[i];
        k.fn[i] = function(e, t, n) {
            return null == e || "boolean" == typeof e ? o.apply(this, arguments) : this.animate(ot(i, !0), e, t, n);
        };
    }), k.each({
        slideDown: ot("show"),
        slideUp: ot("hide"),
        slideToggle: ot("toggle"),
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
        k.fn[e] = function(e, t, n) {
            return this.animate(i, e, t, n);
        };
    }), k.timers = [], k.fx.tick = function() {
        var e, t = 0, n = k.timers;
        for (Ke = k.now(); t < n.length; t++) (e = n[t])() || n[t] !== e || n.splice(t--, 1);
        n.length || k.fx.stop(), Ke = void 0;
    }, k.fx.timer = function(e) {
        k.timers.push(e), e() ? k.fx.start() : k.timers.pop();
    }, k.fx.interval = 13, k.fx.start = function() {
        Ge = Ge || T.setInterval(k.fx.tick, k.fx.interval);
    }, k.fx.stop = function() {
        T.clearInterval(Ge), Ge = null;
    }, k.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, k.fn.delay = function(i, e) {
        return i = k.fx && k.fx.speeds[i] || i, e = e || "fx", this.queue(e, function(e, t) {
            var n = T.setTimeout(e, i);
            t.stop = function() {
                T.clearTimeout(n);
            };
        });
    }, Je = D.createElement("input"), Ze = D.createElement("select"), et = Ze.appendChild(D.createElement("option")), 
    Je.type = "checkbox", m.checkOn = "" !== Je.value, m.optSelected = et.selected, 
    Ze.disabled = !0, m.optDisabled = !et.disabled, (Je = D.createElement("input")).value = "t", 
    Je.type = "radio", m.radioValue = "t" === Je.value;
    var at, lt = k.expr.attrHandle;
    k.fn.extend({
        attr: function(e, t) {
            return P(this, k.attr, e, t, 1 < arguments.length);
        },
        removeAttr: function(e) {
            return this.each(function() {
                k.removeAttr(this, e);
            });
        }
    }), k.extend({
        attr: function(e, t, n) {
            var i, o, r = e.nodeType;
            if (3 !== r && 8 !== r && 2 !== r) return void 0 === e.getAttribute ? k.prop(e, t, n) : (1 === r && k.isXMLDoc(e) || (t = t.toLowerCase(), 
            o = k.attrHooks[t] || (k.expr.match.bool.test(t) ? at : void 0)), void 0 !== n ? null === n ? void k.removeAttr(e, t) : o && "set" in o && void 0 !== (i = o.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), 
            n) : o && "get" in o && null !== (i = o.get(e, t)) ? i : null == (i = k.find.attr(e, t)) ? void 0 : i);
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!m.radioValue && "radio" === t && k.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t;
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var n, i, o = 0, r = t && t.match($);
            if (r && 1 === e.nodeType) for (;n = r[o++]; ) i = k.propFix[n] || n, k.expr.match.bool.test(n) && (e[i] = !1), 
            e.removeAttribute(n);
        }
    }), at = {
        set: function(e, t, n) {
            return !1 === t ? k.removeAttr(e, n) : e.setAttribute(n, n), n;
        }
    }, k.each(k.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var r = lt[t] || k.find.attr;
        lt[t] = function(e, t, n) {
            var i, o;
            return n || (o = lt[t], lt[t] = i, i = null != r(e, t, n) ? t.toLowerCase() : null, 
            lt[t] = o), i;
        };
    });
    var ct = /^(?:input|select|textarea|button)$/i, ut = /^(?:a|area)$/i;
    k.fn.extend({
        prop: function(e, t) {
            return P(this, k.prop, e, t, 1 < arguments.length);
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[k.propFix[e] || e];
            });
        }
    }), k.extend({
        prop: function(e, t, n) {
            var i, o, r = e.nodeType;
            if (3 !== r && 8 !== r && 2 !== r) return 1 === r && k.isXMLDoc(e) || (t = k.propFix[t] || t, 
            o = k.propHooks[t]), void 0 !== n ? o && "set" in o && void 0 !== (i = o.set(e, n, t)) ? i : e[t] = n : o && "get" in o && null !== (i = o.get(e, t)) ? i : e[t];
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = k.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : ct.test(e.nodeName) || ut.test(e.nodeName) && e.href ? 0 : -1;
                }
            }
        },
        propFix: {
            for: "htmlFor",
            class: "className"
        }
    }), m.optSelected || (k.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null;
        },
        set: function(e) {
            var t = e.parentNode;
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
        }
    }), k.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
        k.propFix[this.toLowerCase()] = this;
    });
    var dt = /[\t\r\n\f]/g;
    function ht(e) {
        return e.getAttribute && e.getAttribute("class") || "";
    }
    k.fn.extend({
        addClass: function(t) {
            var e, n, i, o, r, s, a, l = 0;
            if (k.isFunction(t)) return this.each(function(e) {
                k(this).addClass(t.call(this, e, ht(this)));
            });
            if ("string" == typeof t && t) for (e = t.match($) || []; n = this[l++]; ) if (o = ht(n), 
            i = 1 === n.nodeType && (" " + o + " ").replace(dt, " ")) {
                for (s = 0; r = e[s++]; ) i.indexOf(" " + r + " ") < 0 && (i += r + " ");
                o !== (a = k.trim(i)) && n.setAttribute("class", a);
            }
            return this;
        },
        removeClass: function(t) {
            var e, n, i, o, r, s, a, l = 0;
            if (k.isFunction(t)) return this.each(function(e) {
                k(this).removeClass(t.call(this, e, ht(this)));
            });
            if (!arguments.length) return this.attr("class", "");
            if ("string" == typeof t && t) for (e = t.match($) || []; n = this[l++]; ) if (o = ht(n), 
            i = 1 === n.nodeType && (" " + o + " ").replace(dt, " ")) {
                for (s = 0; r = e[s++]; ) for (;-1 < i.indexOf(" " + r + " "); ) i = i.replace(" " + r + " ", " ");
                o !== (a = k.trim(i)) && n.setAttribute("class", a);
            }
            return this;
        },
        toggleClass: function(o, t) {
            var r = typeof o;
            return "boolean" == typeof t && "string" == r ? t ? this.addClass(o) : this.removeClass(o) : k.isFunction(o) ? this.each(function(e) {
                k(this).toggleClass(o.call(this, e, ht(this), t), t);
            }) : this.each(function() {
                var e, t, n, i;
                if ("string" == r) for (t = 0, n = k(this), i = o.match($) || []; e = i[t++]; ) n.hasClass(e) ? n.removeClass(e) : n.addClass(e); else void 0 !== o && "boolean" != r || ((e = ht(this)) && L.set(this, "__className__", e), 
                this.setAttribute && this.setAttribute("class", e || !1 === o ? "" : L.get(this, "__className__") || ""));
            });
        },
        hasClass: function(e) {
            var t, n, i = 0;
            for (t = " " + e + " "; n = this[i++]; ) if (1 === n.nodeType && -1 < (" " + ht(n) + " ").replace(dt, " ").indexOf(t)) return !0;
            return !1;
        }
    });
    var ft = /\r/g, pt = /[\x20\t\r\n\f]+/g;
    k.fn.extend({
        val: function(n) {
            var i, e, o, t = this[0];
            return arguments.length ? (o = k.isFunction(n), this.each(function(e) {
                var t;
                1 === this.nodeType && (null == (t = o ? n.call(this, e, k(this).val()) : n) ? t = "" : "number" == typeof t ? t += "" : k.isArray(t) && (t = k.map(t, function(e) {
                    return null == e ? "" : e + "";
                })), (i = k.valHooks[this.type] || k.valHooks[this.nodeName.toLowerCase()]) && "set" in i && void 0 !== i.set(this, t, "value") || (this.value = t));
            })) : t ? (i = k.valHooks[t.type] || k.valHooks[t.nodeName.toLowerCase()]) && "get" in i && void 0 !== (e = i.get(t, "value")) ? e : "string" == typeof (e = t.value) ? e.replace(ft, "") : null == e ? "" : e : void 0;
        }
    }), k.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = k.find.attr(e, "value");
                    return null != t ? t : k.trim(k.text(e)).replace(pt, " ");
                }
            },
            select: {
                get: function(e) {
                    for (var t, n, i = e.options, o = e.selectedIndex, r = "select-one" === e.type || o < 0, s = r ? null : [], a = r ? o + 1 : i.length, l = o < 0 ? a : r ? o : 0; l < a; l++) if (((n = i[l]).selected || l === o) && (m.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !k.nodeName(n.parentNode, "optgroup"))) {
                        if (t = k(n).val(), r) return t;
                        s.push(t);
                    }
                    return s;
                },
                set: function(e, t) {
                    for (var n, i, o = e.options, r = k.makeArray(t), s = o.length; s--; ) ((i = o[s]).selected = -1 < k.inArray(k.valHooks.option.get(i), r)) && (n = !0);
                    return n || (e.selectedIndex = -1), r;
                }
            }
        }
    }), k.each([ "radio", "checkbox" ], function() {
        k.valHooks[this] = {
            set: function(e, t) {
                if (k.isArray(t)) return e.checked = -1 < k.inArray(k(e).val(), t);
            }
        }, m.checkOn || (k.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value;
        });
    });
    var gt = /^(?:focusinfocus|focusoutblur)$/;
    k.extend(k.event, {
        trigger: function(e, t, n, i) {
            var o, r, s, a, l, c, u, d = [ n || D ], h = p.call(e, "type") ? e.type : e, f = p.call(e, "namespace") ? e.namespace.split(".") : [];
            if (r = s = n = n || D, 3 !== n.nodeType && 8 !== n.nodeType && !gt.test(h + k.event.triggered) && (-1 < h.indexOf(".") && (h = (f = h.split(".")).shift(), 
            f.sort()), l = h.indexOf(":") < 0 && "on" + h, (e = e[k.expando] ? e : new k.Event(h, "object" == typeof e && e)).isTrigger = i ? 2 : 3, 
            e.namespace = f.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
            e.result = void 0, e.target || (e.target = n), t = null == t ? [ e ] : k.makeArray(t, [ e ]), 
            u = k.event.special[h] || {}, i || !u.trigger || !1 !== u.trigger.apply(n, t))) {
                if (!i && !u.noBubble && !k.isWindow(n)) {
                    for (a = u.delegateType || h, gt.test(a + h) || (r = r.parentNode); r; r = r.parentNode) d.push(r), 
                    s = r;
                    s === (n.ownerDocument || D) && d.push(s.defaultView || s.parentWindow || T);
                }
                for (o = 0; (r = d[o++]) && !e.isPropagationStopped(); ) e.type = 1 < o ? a : u.bindType || h, 
                (c = (L.get(r, "events") || {})[e.type] && L.get(r, "handle")) && c.apply(r, t), 
                (c = l && r[l]) && c.apply && F(r) && (e.result = c.apply(r, t), !1 === e.result && e.preventDefault());
                return e.type = h, i || e.isDefaultPrevented() || u._default && !1 !== u._default.apply(d.pop(), t) || !F(n) || l && k.isFunction(n[h]) && !k.isWindow(n) && ((s = n[l]) && (n[l] = null), 
                n[k.event.triggered = h](), k.event.triggered = void 0, s && (n[l] = s)), e.result;
            }
        },
        simulate: function(e, t, n) {
            var i = k.extend(new k.Event(), n, {
                type: e,
                isSimulated: !0
            });
            k.event.trigger(i, null, t);
        }
    }), k.fn.extend({
        trigger: function(e, t) {
            return this.each(function() {
                k.event.trigger(e, t, this);
            });
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            if (n) return k.event.trigger(e, t, n, !0);
        }
    }), k.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, n) {
        k.fn[n] = function(e, t) {
            return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n);
        };
    }), k.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e);
        }
    }), m.focusin = "onfocusin" in T, m.focusin || k.each({
        focus: "focusin",
        blur: "focusout"
    }, function(n, i) {
        function o(e) {
            k.event.simulate(i, e.target, k.event.fix(e));
        }
        k.event.special[i] = {
            setup: function() {
                var e = this.ownerDocument || this, t = L.access(e, i);
                t || e.addEventListener(n, o, !0), L.access(e, i, (t || 0) + 1);
            },
            teardown: function() {
                var e = this.ownerDocument || this, t = L.access(e, i) - 1;
                t ? L.access(e, i, t) : (e.removeEventListener(n, o, !0), L.remove(e, i));
            }
        };
    });
    var mt = T.location, vt = k.now(), bt = /\?/;
    k.parseJSON = function(e) {
        return JSON.parse(e + "");
    }, k.parseXML = function(e) {
        var t;
        if (!e || "string" != typeof e) return null;
        try {
            t = new T.DOMParser().parseFromString(e, "text/xml");
        } catch (e) {
            t = void 0;
        }
        return t && !t.getElementsByTagName("parsererror").length || k.error("Invalid XML: " + e), 
        t;
    };
    var yt = /#.*$/, wt = /([?&])_=[^&]*/, xt = /^(.*?):[ \t]*([^\r\n]*)$/gm, Ct = /^(?:GET|HEAD)$/, Tt = /^\/\//, Dt = {}, kt = {}, St = "*/".concat("*"), _t = D.createElement("a");
    function At(r) {
        return function(e, t) {
            "string" != typeof e && (t = e, e = "*");
            var n, i = 0, o = e.toLowerCase().match($) || [];
            if (k.isFunction(t)) for (;n = o[i++]; ) "+" === n[0] ? (n = n.slice(1) || "*", 
            (r[n] = r[n] || []).unshift(t)) : (r[n] = r[n] || []).push(t);
        };
    }
    function Nt(t, o, r, s) {
        var a = {}, l = t === kt;
        function c(e) {
            var i;
            return a[e] = !0, k.each(t[e] || [], function(e, t) {
                var n = t(o, r, s);
                return "string" != typeof n || l || a[n] ? l ? !(i = n) : void 0 : (o.dataTypes.unshift(n), 
                c(n), !1);
            }), i;
        }
        return c(o.dataTypes[0]) || !a["*"] && c("*");
    }
    function Et(e, t) {
        var n, i, o = k.ajaxSettings.flatOptions || {};
        for (n in t) void 0 !== t[n] && ((o[n] ? e : i = i || {})[n] = t[n]);
        return i && k.extend(!0, e, i), e;
    }
    _t.href = mt.href, k.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: mt.href,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(mt.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": St,
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
                "text json": k.parseJSON,
                "text xml": k.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? Et(Et(e, k.ajaxSettings), t) : Et(k.ajaxSettings, e);
        },
        ajaxPrefilter: At(Dt),
        ajaxTransport: At(kt),
        ajax: function(e, t) {
            "object" == typeof e && (t = e, e = void 0), t = t || {};
            var u, d, h, n, f, i, p, o, g = k.ajaxSetup({}, t), m = g.context || g, v = g.context && (m.nodeType || m.jquery) ? k(m) : k.event, b = k.Deferred(), y = k.Callbacks("once memory"), w = g.statusCode || {}, r = {}, s = {}, x = 0, a = "canceled", C = {
                readyState: 0,
                getResponseHeader: function(e) {
                    var t;
                    if (2 === x) {
                        if (!n) for (n = {}; t = xt.exec(h); ) n[t[1].toLowerCase()] = t[2];
                        t = n[e.toLowerCase()];
                    }
                    return null == t ? null : t;
                },
                getAllResponseHeaders: function() {
                    return 2 === x ? h : null;
                },
                setRequestHeader: function(e, t) {
                    var n = e.toLowerCase();
                    return x || (e = s[n] = s[n] || e, r[e] = t), this;
                },
                overrideMimeType: function(e) {
                    return x || (g.mimeType = e), this;
                },
                statusCode: function(e) {
                    var t;
                    if (e) if (x < 2) for (t in e) w[t] = [ w[t], e[t] ]; else C.always(e[C.status]);
                    return this;
                },
                abort: function(e) {
                    var t = e || a;
                    return u && u.abort(t), l(0, t), this;
                }
            };
            if (b.promise(C).complete = y.add, C.success = C.done, C.error = C.fail, g.url = ((e || g.url || mt.href) + "").replace(yt, "").replace(Tt, mt.protocol + "//"), 
            g.type = t.method || t.type || g.method || g.type, g.dataTypes = k.trim(g.dataType || "*").toLowerCase().match($) || [ "" ], 
            null == g.crossDomain) {
                i = D.createElement("a");
                try {
                    i.href = g.url, i.href = i.href, g.crossDomain = _t.protocol + "//" + _t.host != i.protocol + "//" + i.host;
                } catch (e) {
                    g.crossDomain = !0;
                }
            }
            if (g.data && g.processData && "string" != typeof g.data && (g.data = k.param(g.data, g.traditional)), 
            Nt(Dt, g, t, C), 2 === x) return C;
            for (o in (p = k.event && g.global) && 0 == k.active++ && k.event.trigger("ajaxStart"), 
            g.type = g.type.toUpperCase(), g.hasContent = !Ct.test(g.type), d = g.url, g.hasContent || (g.data && (d = g.url += (bt.test(d) ? "&" : "?") + g.data, 
            delete g.data), !1 === g.cache && (g.url = wt.test(d) ? d.replace(wt, "$1_=" + vt++) : d + (bt.test(d) ? "&" : "?") + "_=" + vt++)), 
            g.ifModified && (k.lastModified[d] && C.setRequestHeader("If-Modified-Since", k.lastModified[d]), 
            k.etag[d] && C.setRequestHeader("If-None-Match", k.etag[d])), (g.data && g.hasContent && !1 !== g.contentType || t.contentType) && C.setRequestHeader("Content-Type", g.contentType), 
            C.setRequestHeader("Accept", g.dataTypes[0] && g.accepts[g.dataTypes[0]] ? g.accepts[g.dataTypes[0]] + ("*" !== g.dataTypes[0] ? ", " + St + "; q=0.01" : "") : g.accepts["*"]), 
            g.headers) C.setRequestHeader(o, g.headers[o]);
            if (g.beforeSend && (!1 === g.beforeSend.call(m, C, g) || 2 === x)) return C.abort();
            for (o in a = "abort", {
                success: 1,
                error: 1,
                complete: 1
            }) C[o](g[o]);
            if (u = Nt(kt, g, t, C)) {
                if (C.readyState = 1, p && v.trigger("ajaxSend", [ C, g ]), 2 === x) return C;
                g.async && 0 < g.timeout && (f = T.setTimeout(function() {
                    C.abort("timeout");
                }, g.timeout));
                try {
                    x = 1, u.send(r, l);
                } catch (e) {
                    if (!(x < 2)) throw e;
                    l(-1, e);
                }
            } else l(-1, "No Transport");
            function l(e, t, n, i) {
                var o, r, s, a, l, c = t;
                2 !== x && (x = 2, f && T.clearTimeout(f), u = void 0, h = i || "", C.readyState = 0 < e ? 4 : 0, 
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
                            s = s || o;
                        }
                        r = r || s;
                    }
                    if (r) return r !== l[0] && l.unshift(r), n[r];
                }(g, C, n)), a = function(e, t, n, i) {
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
                }(g, a, C, o), o ? (g.ifModified && ((l = C.getResponseHeader("Last-Modified")) && (k.lastModified[d] = l), 
                (l = C.getResponseHeader("etag")) && (k.etag[d] = l)), 204 === e || "HEAD" === g.type ? c = "nocontent" : 304 === e ? c = "notmodified" : (c = a.state, 
                r = a.data, o = !(s = a.error))) : (s = c, !e && c || (c = "error", e < 0 && (e = 0))), 
                C.status = e, C.statusText = (t || c) + "", o ? b.resolveWith(m, [ r, c, C ]) : b.rejectWith(m, [ C, c, s ]), 
                C.statusCode(w), w = void 0, p && v.trigger(o ? "ajaxSuccess" : "ajaxError", [ C, g, o ? r : s ]), 
                y.fireWith(m, [ C, c ]), p && (v.trigger("ajaxComplete", [ C, g ]), --k.active || k.event.trigger("ajaxStop")));
            }
            return C;
        },
        getJSON: function(e, t, n) {
            return k.get(e, t, n, "json");
        },
        getScript: function(e, t) {
            return k.get(e, void 0, t, "script");
        }
    }), k.each([ "get", "post" ], function(e, o) {
        k[o] = function(e, t, n, i) {
            return k.isFunction(t) && (i = i || n, n = t, t = void 0), k.ajax(k.extend({
                url: e,
                type: o,
                dataType: i,
                data: t,
                success: n
            }, k.isPlainObject(e) && e));
        };
    }), k._evalUrl = function(e) {
        return k.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            throws: !0
        });
    }, k.fn.extend({
        wrapAll: function(t) {
            var e;
            return k.isFunction(t) ? this.each(function(e) {
                k(this).wrapAll(t.call(this, e));
            }) : (this[0] && (e = k(t, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), 
            e.map(function() {
                for (var e = this; e.firstElementChild; ) e = e.firstElementChild;
                return e;
            }).append(this)), this);
        },
        wrapInner: function(n) {
            return k.isFunction(n) ? this.each(function(e) {
                k(this).wrapInner(n.call(this, e));
            }) : this.each(function() {
                var e = k(this), t = e.contents();
                t.length ? t.wrapAll(n) : e.append(n);
            });
        },
        wrap: function(t) {
            var n = k.isFunction(t);
            return this.each(function(e) {
                k(this).wrapAll(n ? t.call(this, e) : t);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                k.nodeName(this, "body") || k(this).replaceWith(this.childNodes);
            }).end();
        }
    }), k.expr.filters.hidden = function(e) {
        return !k.expr.filters.visible(e);
    }, k.expr.filters.visible = function(e) {
        return 0 < e.offsetWidth || 0 < e.offsetHeight || 0 < e.getClientRects().length;
    };
    var It = /%20/g, $t = /\[\]$/, Ot = /\r?\n/g, Ft = /^(?:submit|button|image|reset|file)$/i, Pt = /^(?:input|select|textarea|keygen)/i;
    function Mt(n, e, i, o) {
        var t;
        if (k.isArray(e)) k.each(e, function(e, t) {
            i || $t.test(n) ? o(n, t) : Mt(n + "[" + ("object" == typeof t && null != t ? e : "") + "]", t, i, o);
        }); else if (i || "object" !== k.type(e)) o(n, e); else for (t in e) Mt(n + "[" + t + "]", e[t], i, o);
    }
    k.param = function(e, t) {
        function n(e, t) {
            t = k.isFunction(t) ? t() : null == t ? "" : t, o[o.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t);
        }
        var i, o = [];
        if (void 0 === t && (t = k.ajaxSettings && k.ajaxSettings.traditional), k.isArray(e) || e.jquery && !k.isPlainObject(e)) k.each(e, function() {
            n(this.name, this.value);
        }); else for (i in e) Mt(i, e[i], t, n);
        return o.join("&").replace(It, "+");
    }, k.fn.extend({
        serialize: function() {
            return k.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var e = k.prop(this, "elements");
                return e ? k.makeArray(e) : this;
            }).filter(function() {
                var e = this.type;
                return this.name && !k(this).is(":disabled") && Pt.test(this.nodeName) && !Ft.test(e) && (this.checked || !Y.test(e));
            }).map(function(e, t) {
                var n = k(this).val();
                return null == n ? null : k.isArray(n) ? k.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(Ot, "\r\n")
                    };
                }) : {
                    name: t.name,
                    value: n.replace(Ot, "\r\n")
                };
            }).get();
        }
    }), k.ajaxSettings.xhr = function() {
        try {
            return new T.XMLHttpRequest();
        } catch (e) {}
    };
    var Lt = {
        0: 200,
        1223: 204
    }, jt = k.ajaxSettings.xhr();
    m.cors = !!jt && "withCredentials" in jt, m.ajax = jt = !!jt, k.ajaxTransport(function(o) {
        var r, s;
        if (m.cors || jt && !o.crossDomain) return {
            send: function(e, t) {
                var n, i = o.xhr();
                if (i.open(o.type, o.url, o.async, o.username, o.password), o.xhrFields) for (n in o.xhrFields) i[n] = o.xhrFields[n];
                for (n in o.mimeType && i.overrideMimeType && i.overrideMimeType(o.mimeType), o.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"), 
                e) i.setRequestHeader(n, e[n]);
                r = function(e) {
                    return function() {
                        r && (r = s = i.onload = i.onerror = i.onabort = i.onreadystatechange = null, "abort" === e ? i.abort() : "error" === e ? "number" != typeof i.status ? t(0, "error") : t(i.status, i.statusText) : t(Lt[i.status] || i.status, i.statusText, "text" !== (i.responseType || "text") || "string" != typeof i.responseText ? {
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
    }), k.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return k.globalEval(e), e;
            }
        }
    }), k.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
    }), k.ajaxTransport("script", function(n) {
        var i, o;
        if (n.crossDomain) return {
            send: function(e, t) {
                i = k("<script>").prop({
                    charset: n.scriptCharset,
                    src: n.url
                }).on("load error", o = function(e) {
                    i.remove(), o = null, e && t("error" === e.type ? 404 : 200, e.type);
                }), D.head.appendChild(i[0]);
            },
            abort: function() {
                o && o();
            }
        };
    });
    var Rt = [], qt = /(=)\?(?=&|$)|\?\?/;
    k.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Rt.pop() || k.expando + "_" + vt++;
            return this[e] = !0, e;
        }
    }), k.ajaxPrefilter("json jsonp", function(e, t, n) {
        var i, o, r, s = !1 !== e.jsonp && (qt.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && qt.test(e.data) && "data");
        if (s || "jsonp" === e.dataTypes[0]) return i = e.jsonpCallback = k.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, 
        s ? e[s] = e[s].replace(qt, "$1" + i) : !1 !== e.jsonp && (e.url += (bt.test(e.url) ? "&" : "?") + e.jsonp + "=" + i), 
        e.converters["script json"] = function() {
            return r || k.error(i + " was not called"), r[0];
        }, e.dataTypes[0] = "json", o = T[i], T[i] = function() {
            r = arguments;
        }, n.always(function() {
            void 0 === o ? k(T).removeProp(i) : T[i] = o, e[i] && (e.jsonpCallback = t.jsonpCallback, 
            Rt.push(i)), r && k.isFunction(o) && o(r[0]), r = o = void 0;
        }), "script";
    }), k.parseHTML = function(e, t, n) {
        if (!e || "string" != typeof e) return null;
        "boolean" == typeof t && (n = t, t = !1), t = t || D;
        var i = w.exec(e), o = !n && [];
        return i ? [ t.createElement(i[1]) ] : (i = ne([ e ], t, o), o && o.length && k(o).remove(), 
        k.merge([], i.childNodes));
    };
    var Ht = k.fn.load;
    function Ut(e) {
        return k.isWindow(e) ? e : 9 === e.nodeType && e.defaultView;
    }
    k.fn.load = function(e, t, n) {
        if ("string" != typeof e && Ht) return Ht.apply(this, arguments);
        var i, o, r, s = this, a = e.indexOf(" ");
        return -1 < a && (i = k.trim(e.slice(a)), e = e.slice(0, a)), k.isFunction(t) ? (n = t, 
        t = void 0) : t && "object" == typeof t && (o = "POST"), 0 < s.length && k.ajax({
            url: e,
            type: o || "GET",
            dataType: "html",
            data: t
        }).done(function(e) {
            r = arguments, s.html(i ? k("<div>").append(k.parseHTML(e)).find(i) : e);
        }).always(n && function(e, t) {
            s.each(function() {
                n.apply(this, r || [ e.responseText, t, e ]);
            });
        }), this;
    }, k.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(e, t) {
        k.fn[t] = function(e) {
            return this.on(t, e);
        };
    }), k.expr.filters.animated = function(t) {
        return k.grep(k.timers, function(e) {
            return t === e.elem;
        }).length;
    }, k.offset = {
        setOffset: function(e, t, n) {
            var i, o, r, s, a, l, c = k.css(e, "position"), u = k(e), d = {};
            "static" === c && (e.style.position = "relative"), a = u.offset(), r = k.css(e, "top"), 
            l = k.css(e, "left"), o = ("absolute" === c || "fixed" === c) && -1 < (r + l).indexOf("auto") ? (s = (i = u.position()).top, 
            i.left) : (s = parseFloat(r) || 0, parseFloat(l) || 0), k.isFunction(t) && (t = t.call(e, n, k.extend({}, a))), 
            null != t.top && (d.top = t.top - a.top + s), null != t.left && (d.left = t.left - a.left + o), 
            "using" in t ? t.using.call(e, d) : u.css(d);
        }
    }, k.fn.extend({
        offset: function(t) {
            if (arguments.length) return void 0 === t ? this : this.each(function(e) {
                k.offset.setOffset(this, t, e);
            });
            var e, n, i = this[0], o = {
                top: 0,
                left: 0
            }, r = i && i.ownerDocument;
            return r ? (e = r.documentElement, k.contains(e, i) ? (o = i.getBoundingClientRect(), 
            n = Ut(r), {
                top: o.top + n.pageYOffset - e.clientTop,
                left: o.left + n.pageXOffset - e.clientLeft
            }) : o) : void 0;
        },
        position: function() {
            if (this[0]) {
                var e, t, n = this[0], i = {
                    top: 0,
                    left: 0
                };
                return "fixed" === k.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), 
                t = this.offset(), k.nodeName(e[0], "html") || (i = e.offset()), i.top += k.css(e[0], "borderTopWidth", !0), 
                i.left += k.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - i.top - k.css(n, "marginTop", !0),
                    left: t.left - i.left - k.css(n, "marginLeft", !0)
                };
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent; e && "static" === k.css(e, "position"); ) e = e.offsetParent;
                return e || Pe;
            });
        }
    }), k.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, o) {
        var r = "pageYOffset" === o;
        k.fn[t] = function(e) {
            return P(this, function(e, t, n) {
                var i = Ut(e);
                if (void 0 === n) return i ? i[o] : e[t];
                i ? i.scrollTo(r ? i.pageXOffset : n, r ? n : i.pageYOffset) : e[t] = n;
            }, t, e, arguments.length);
        };
    }), k.each([ "top", "left" ], function(e, n) {
        k.cssHooks[n] = je(m.pixelPosition, function(e, t) {
            if (t) return t = Le(e, n), Oe.test(t) ? k(e).position()[n] + "px" : t;
        });
    }), k.each({
        Height: "height",
        Width: "width"
    }, function(r, s) {
        k.each({
            padding: "inner" + r,
            content: s,
            "": "outer" + r
        }, function(i, e) {
            k.fn[e] = function(e, t) {
                var n = arguments.length && (i || "boolean" != typeof e), o = i || (!0 === e || !0 === t ? "margin" : "border");
                return P(this, function(e, t, n) {
                    var i;
                    return k.isWindow(e) ? e.document.documentElement["client" + r] : 9 === e.nodeType ? (i = e.documentElement, 
                    Math.max(e.body["scroll" + r], i["scroll" + r], e.body["offset" + r], i["offset" + r], i["client" + r])) : void 0 === n ? k.css(e, t, o) : k.style(e, t, n, o);
                }, s, n ? e : void 0, n, null);
            };
        });
    }), k.fn.extend({
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
        },
        size: function() {
            return this.length;
        }
    }), k.fn.andSelf = k.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return k;
    });
    var Wt = T.jQuery, Vt = T.$;
    return k.noConflict = function(e) {
        return T.$ === k && (T.$ = Vt), e && T.jQuery === k && (T.jQuery = Wt), k;
    }, e || (T.jQuery = T.$ = k), k;
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
        "DOMContentLoaded" === t && "loading" !== e.readyState ? n.call(this) : e.addEventListener ? e.addEventListener(t, n) : "DOMContentLoaded" === t ? e.attachEvent("onreadystatechange", function() {
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
                    for (n = e.form.elements[e.name].tagName ? [ e ] : e.form.elements[e.name], r = [], 
                    t = 0; t < n.length; t++) "checkbox" === n[t].type && !n[t].checked || r.push(n[t].value);
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
                            var h = Nette.isArray(a.arg) ? a.arg : [ a.arg ], f = a.msg.replace(/%(value|\d+)/g, function(e, t) {
                                return Nette.getValue("value" === t ? c : n.form.elements.namedItem(h[t].control));
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
            return /^("([ !#-[\]-~]|\\[ -~])+"|[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*)@([0-9a-z\u00C0-\u02FF\u0370-\u1EFF]([-0-9a-z\u00C0-\u02FF\u0370-\u1EFF]{0,61}[0-9a-z\u00C0-\u02FF\u0370-\u1EFF])?\.)+[a-z\u00C0-\u02FF\u0370-\u1EFF]([-0-9a-z\u00C0-\u02FF\u0370-\u1EFF]{0,17}[a-z\u00C0-\u02FF\u0370-\u1EFF])?$/i.test(n);
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
        pattern: function(e, t, n, i, o) {
            if ("string" != typeof t) return null;
            try {
                try {
                    var r = new RegExp("^(?:" + t + ")$", o ? "ui" : "u");
                } catch (e) {
                    r = new RegExp("^(?:" + t + ")$", o ? "i" : "");
                }
                if (window.FileList && n instanceof FileList) {
                    for (var s = 0; s < n.length; s++) if (!r.test(n[s].name)) return !1;
                    return !0;
                }
                return r.test(n);
            } catch (e) {}
        },
        patternCaseInsensitive: function(e, t, n) {
            return Nette.validators.pattern(e, t, n, null, !0);
        },
        integer: function(e, t, n) {
            return ("number" !== e.type || !e.validity.badInput) && /^-?[0-9]+$/.test(n);
        },
        float: function(e, t, n, i) {
            return ("number" !== e.type || !e.validity.badInput) && (n = n.replace(/ +/g, "").replace(/,/g, "."), 
            !!/^-?[0-9]*\.?[0-9]+$/.test(n) && (i.value = n, !0));
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
        static: function(e, t) {
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
            var d = t[c], h = d.op.match(/(~)?([^?]+)/), f = d.control ? e.form.elements.namedItem(d.control) : e;
            if (f) {
                if (!1 !== (r = n)) {
                    d.neg = h[1], d.op = h[2];
                    var p = e === f ? o : {
                        value: Nette.getEffectiveValue(f)
                    };
                    if (null === (r = Nette.validateRule(f, d.op, d.arg, p))) continue;
                    d.neg && (r = !r), d.rules || (n = r);
                }
                if (d.rules && Nette.toggleControl(e, d.rules, r, i, o) || d.toggle) {
                    if (s = !0, i) for (var g = !document.addEventListener, m = f.tagName ? f.name : f[0].name, v = f.tagName ? f.form.elements : f, b = 0; b < v.length; b++) v[b].name !== m || Nette.inArray(a, v[b]) || (Nette.addEvent(v[b], g && v[b].type in {
                        checkbox: 1,
                        radio: 1
                    } ? "click" : "change", l), a.push(v[b]));
                    for (var y in d.toggle || []) Object.prototype.hasOwnProperty.call(d.toggle, y) && (Nette.toggles[y] = Nette.toggles[y] || (d.toggle[y] ? r : !r));
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
}), function(d, h, f) {
    if ("function" != typeof h) return console.error("nette.ajax.js: jQuery is missing, load it please");
    h.nette = new (h.extend(function() {
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
                return o.push(a.self), h.each(a.on[t], function(e, t) {
                    if (t === f || -1 !== h.inArray(e, r)) return !0;
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
                h.each(e, function(e, t) {
                    a.on[e][n] = t;
                }), a.contexts[n] = h.extend(t || {}, {
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
                } else h.each([ "init", "load", "prepare", "before", "start", "success", "complete", "error" ], function(e, t) {
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
            if ("string" === h.type(e) && (e = {
                url: e
            }), !e.nette && t && n) {
                var i, o = h(t), r = e.nette = {
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
                    "string" == typeof e.off && (e.off = [ e.off ]), e.off = h.grep(h.each(e.off, function(e) {
                        return h.trim(e);
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
            }, this.handleXHR(h.ajax(e), e);
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
    }, h.nette ? h.nette : {}))(), h.fn.netteAjax = function(e, t) {
        return h.nette.ajax(t || {}, this[0], e);
    }, h.fn.netteAjaxOff = function() {
        return this.off(".nette");
    }, h.nette.ext("validation", {
        before: function(e, t) {
            if (!t.nette) return !0;
            var n = t.nette, i = n.e, o = h.extend(this.defaults, t.validate || function() {
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
    }), h.nette.ext("forms", {
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
                } else "string" != typeof i && (i = h.param(i)), o = h.param(o), e.data = t.form.serialize() + (o ? "&" + o : "") + "&" + i;
            }
        }
    }), h.nette.ext("snippets", {
        success: function(e) {
            e.snippets && this.updateSnippets(e.snippets);
        }
    }, {
        beforeQueue: h.Callbacks(),
        afterQueue: h.Callbacks(),
        completeQueue: h.Callbacks(),
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
            h(i).promise().done(function() {
                n.completeQueue.fire();
            });
        },
        updateSnippet: function(e, t, n) {
            e.is("title") ? document.title = t : (this.beforeQueue.fire(e), this.applySnippet(e, t, n), 
            this.afterQueue.fire(e));
        },
        getElement: function(e) {
            return h("#" + this.escapeSelector(e));
        },
        applySnippet: function(e, t, n) {
            !n && e.is("[data-ajax-append]") ? e.append(t) : !n && e.is("[data-ajax-prepend]") ? e.prepend(t) : e.html() == t && !/<[^>]*script/.test(t) || e.html(t);
        },
        escapeSelector: function(e) {
            return e.replace(/[\!"#\$%&'\(\)\*\+,\.\/:;<=>\?@\[\\\]\^`\{\|\}~]/g, "\\$&");
        }
    }), h.nette.ext("redirect", {
        success: function(e) {
            if (e.redirect) return d.location.href = e.redirect, !1;
        }
    }), h.nette.ext("state", {
        success: function(e) {
            e.state && (this.state = e.state);
        }
    }, {
        state: null
    }), h.nette.ext("unique", {
        start: function(e) {
            this.xhr && this.xhr.abort(), this.xhr = e;
        },
        complete: function() {
            this.xhr = null;
        }
    }, {
        xhr: null
    }), h.nette.ext("abort", {
        init: function() {
            h("body").keydown(h.proxy(function(e) {
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
    }), h.nette.ext("load", {
        success: function() {
            h.nette.load();
        }
    }), h.nette.ext("init", {
        load: function(e) {
            h(this.linkSelector).off("click.nette", e).on("click.nette", e), h(this.formSelector).off("submit.nette", e).on("submit.nette", e).off("click.nette", ":image", e).on("click.nette", ":image", e).off("click.nette", ":submit", e).on("click.nette", ":submit", e), 
            h(this.buttonSelector).closest("form").off("click.nette", this.buttonSelector, e).on("click.nette", this.buttonSelector, e);
        }
    }, {
        linkSelector: "a.ajax",
        formSelector: "form.ajax",
        buttonSelector: 'input.ajax[type="submit"], button.ajax[type="submit"], input.ajax[type="image"]'
    });
}(window, window.jQuery), function(e) {
    "function" == typeof define && define.amd ? define([ "jquery" ], e) : "object" == typeof exports ? e(require("jquery")) : e(jQuery);
}(function(A, N) {
    function E() {
        return new Date(Date.UTC.apply(Date, arguments));
    }
    function I() {
        var e = new Date();
        return E(e.getFullYear(), e.getMonth(), e.getDate());
    }
    function r(e, t) {
        return e.getUTCFullYear() === t.getUTCFullYear() && e.getUTCMonth() === t.getUTCMonth() && e.getUTCDate() === t.getUTCDate();
    }
    function e(e, t) {
        return function() {
            return t !== N && A.fn.datepicker.deprecated(t), this[e].apply(this, arguments);
        };
    }
    function x(e, t) {
        A.data(e, "datepicker", this), this._events = [], this._secondaryEvents = [], this._process_options(t), 
        this.dates = new n(), this.viewDate = this.o.defaultViewDate, this.focusDate = null, 
        this.element = A(e), this.isInput = this.element.is("input"), this.inputField = this.isInput ? this.element : this.element.find("input"), 
        this.component = !!this.element.hasClass("date") && this.element.find(".add-on, .input-group-addon, .input-group-append, .input-group-prepend, .btn"), 
        this.component && 0 === this.component.length && (this.component = !1), null === this.o.isInline ? this.isInline = !this.component && !this.isInput : this.isInline = this.o.isInline, 
        this.picker = A(O.template), this._check_template(this.o.templates.leftArrow) && this.picker.find(".prev").html(this.o.templates.leftArrow), 
        this._check_template(this.o.templates.rightArrow) && this.picker.find(".next").html(this.o.templates.rightArrow), 
        this._buildEvents(), this._attachEvents(), this.isInline ? this.picker.addClass("datepicker-inline").appendTo(this.element) : this.picker.addClass("datepicker-dropdown dropdown-menu"), 
        this.o.rtl && this.picker.addClass("datepicker-rtl"), this.o.calendarWeeks && this.picker.find(".datepicker-days .datepicker-switch, thead .datepicker-title, tfoot .today, tfoot .clear").attr("colspan", function(e, t) {
            return Number(t) + 1;
        }), this._process_options({
            startDate: this._o.startDate,
            endDate: this._o.endDate,
            daysOfWeekDisabled: this.o.daysOfWeekDisabled,
            daysOfWeekHighlighted: this.o.daysOfWeekHighlighted,
            datesDisabled: this.o.datesDisabled
        }), this._allow_update = !1, this.setViewMode(this.o.startView), this._allow_update = !0, 
        this.fillDow(), this.fillMonths(), this.update(), this.isInline && this.show();
    }
    var t, n = (t = {
        get: function(e) {
            return this.slice(e)[0];
        },
        contains: function(e) {
            for (var t = e && e.valueOf(), n = 0, i = this.length; n < i; n++) if (0 <= this[n].valueOf() - t && this[n].valueOf() - t < 864e5) return n;
            return -1;
        },
        remove: function(e) {
            this.splice(e, 1);
        },
        replace: function(e) {
            e && (Array.isArray(e) || (e = [ e ]), this.clear(), this.push.apply(this, e));
        },
        clear: function() {
            this.length = 0;
        },
        copy: function() {
            var e = new n();
            return e.replace(this), e;
        }
    }, function() {
        var e = [];
        return e.push.apply(e, arguments), A.extend(e, t), e;
    });
    x.prototype = {
        constructor: x,
        _resolveViewName: function(n) {
            return A.each(O.viewModes, function(e, t) {
                if (n === e || -1 !== A.inArray(n, t.names)) return n = e, !1;
            }), n;
        },
        _resolveDaysOfWeek: function(e) {
            return Array.isArray(e) || (e = e.split(/[,\s]*/)), A.map(e, Number);
        },
        _check_template: function(e) {
            try {
                return e !== N && "" !== e && ((e.match(/[<>]/g) || []).length <= 0 || 0 < A(e).length);
            } catch (e) {
                return !1;
            }
        },
        _process_options: function(e) {
            this._o = A.extend({}, this._o, e);
            var t = this.o = A.extend({}, this._o), n = t.language;
            $[n] || (n = n.split("-")[0], $[n] || (n = u.language)), t.language = n, t.startView = this._resolveViewName(t.startView), 
            t.minViewMode = this._resolveViewName(t.minViewMode), t.maxViewMode = this._resolveViewName(t.maxViewMode), 
            t.startView = Math.max(this.o.minViewMode, Math.min(this.o.maxViewMode, t.startView)), 
            !0 !== t.multidate && (t.multidate = Number(t.multidate) || !1, !1 !== t.multidate && (t.multidate = Math.max(0, t.multidate))), 
            t.multidateSeparator = String(t.multidateSeparator), t.weekStart %= 7, t.weekEnd = (t.weekStart + 6) % 7;
            var i = O.parseFormat(t.format);
            t.startDate !== -1 / 0 && (t.startDate ? t.startDate instanceof Date ? t.startDate = this._local_to_utc(this._zero_time(t.startDate)) : t.startDate = O.parseDate(t.startDate, i, t.language, t.assumeNearbyYear) : t.startDate = -1 / 0), 
            t.endDate !== 1 / 0 && (t.endDate ? t.endDate instanceof Date ? t.endDate = this._local_to_utc(this._zero_time(t.endDate)) : t.endDate = O.parseDate(t.endDate, i, t.language, t.assumeNearbyYear) : t.endDate = 1 / 0), 
            t.daysOfWeekDisabled = this._resolveDaysOfWeek(t.daysOfWeekDisabled || []), t.daysOfWeekHighlighted = this._resolveDaysOfWeek(t.daysOfWeekHighlighted || []), 
            t.datesDisabled = t.datesDisabled || [], Array.isArray(t.datesDisabled) || (t.datesDisabled = t.datesDisabled.split(",")), 
            t.datesDisabled = A.map(t.datesDisabled, function(e) {
                return O.parseDate(e, i, t.language, t.assumeNearbyYear);
            });
            var o = String(t.orientation).toLowerCase().split(/\s+/g), r = t.orientation.toLowerCase();
            if (o = A.grep(o, function(e) {
                return /^auto|left|right|top|bottom$/.test(e);
            }), t.orientation = {
                x: "auto",
                y: "auto"
            }, r && "auto" !== r) if (1 === o.length) switch (o[0]) {
              case "top":
              case "bottom":
                t.orientation.y = o[0];
                break;

              case "left":
              case "right":
                t.orientation.x = o[0];
            } else r = A.grep(o, function(e) {
                return /^left|right$/.test(e);
            }), t.orientation.x = r[0] || "auto", r = A.grep(o, function(e) {
                return /^top|bottom$/.test(e);
            }), t.orientation.y = r[0] || "auto"; else ;
            if (t.defaultViewDate instanceof Date || "string" == typeof t.defaultViewDate) t.defaultViewDate = O.parseDate(t.defaultViewDate, i, t.language, t.assumeNearbyYear); else if (t.defaultViewDate) {
                var s = t.defaultViewDate.year || new Date().getFullYear(), a = t.defaultViewDate.month || 0, l = t.defaultViewDate.day || 1;
                t.defaultViewDate = E(s, a, l);
            } else t.defaultViewDate = I();
        },
        _applyEvents: function(e) {
            for (var t, n, i, o = 0; o < e.length; o++) t = e[o][0], 2 === e[o].length ? (n = N, 
            i = e[o][1]) : 3 === e[o].length && (n = e[o][1], i = e[o][2]), t.on(i, n);
        },
        _unapplyEvents: function(e) {
            for (var t, n, i, o = 0; o < e.length; o++) t = e[o][0], 2 === e[o].length ? (i = N, 
            n = e[o][1]) : 3 === e[o].length && (i = e[o][1], n = e[o][2]), t.off(n, i);
        },
        _buildEvents: function() {
            var e = {
                keyup: A.proxy(function(e) {
                    -1 === A.inArray(e.keyCode, [ 27, 37, 39, 38, 40, 32, 13, 9 ]) && this.update();
                }, this),
                keydown: A.proxy(this.keydown, this),
                paste: A.proxy(this.paste, this)
            };
            !0 === this.o.showOnFocus && (e.focus = A.proxy(this.show, this)), this.isInput ? this._events = [ [ this.element, e ] ] : this.component && this.inputField.length ? this._events = [ [ this.inputField, e ], [ this.component, {
                click: A.proxy(this.show, this)
            } ] ] : this._events = [ [ this.element, {
                click: A.proxy(this.show, this),
                keydown: A.proxy(this.keydown, this)
            } ] ], this._events.push([ this.element, "*", {
                blur: A.proxy(function(e) {
                    this._focused_from = e.target;
                }, this)
            } ], [ this.element, {
                blur: A.proxy(function(e) {
                    this._focused_from = e.target;
                }, this)
            } ]), this.o.immediateUpdates && this._events.push([ this.element, {
                "changeYear changeMonth": A.proxy(function(e) {
                    this.update(e.date);
                }, this)
            } ]), this._secondaryEvents = [ [ this.picker, {
                click: A.proxy(this.click, this)
            } ], [ this.picker, ".prev, .next", {
                click: A.proxy(this.navArrowsClick, this)
            } ], [ this.picker, ".day:not(.disabled)", {
                click: A.proxy(this.dayCellClick, this)
            } ], [ A(window), {
                resize: A.proxy(this.place, this)
            } ], [ A(document), {
                "mousedown touchstart": A.proxy(function(e) {
                    this.element.is(e.target) || this.element.find(e.target).length || this.picker.is(e.target) || this.picker.find(e.target).length || this.isInline || this.hide();
                }, this)
            } ] ];
        },
        _attachEvents: function() {
            this._detachEvents(), this._applyEvents(this._events);
        },
        _detachEvents: function() {
            this._unapplyEvents(this._events);
        },
        _attachSecondaryEvents: function() {
            this._detachSecondaryEvents(), this._applyEvents(this._secondaryEvents);
        },
        _detachSecondaryEvents: function() {
            this._unapplyEvents(this._secondaryEvents);
        },
        _trigger: function(e, t) {
            var n = t || this.dates.get(-1), i = this._utc_to_local(n);
            this.element.trigger({
                type: e,
                date: i,
                viewMode: this.viewMode,
                dates: A.map(this.dates, this._utc_to_local),
                format: A.proxy(function(e, t) {
                    0 === arguments.length ? (e = this.dates.length - 1, t = this.o.format) : "string" == typeof e && (t = e, 
                    e = this.dates.length - 1), t = t || this.o.format;
                    var n = this.dates.get(e);
                    return O.formatDate(n, t, this.o.language);
                }, this)
            });
        },
        show: function() {
            if (!(this.inputField.is(":disabled") || this.inputField.prop("readonly") && !1 === this.o.enableOnReadonly)) return this.isInline || this.picker.appendTo(this.o.container), 
            this.place(), this.picker.show(), this._attachSecondaryEvents(), this._trigger("show"), 
            (window.navigator.msMaxTouchPoints || "ontouchstart" in document) && this.o.disableTouchKeyboard && A(this.element).blur(), 
            this;
        },
        hide: function() {
            return this.isInline || !this.picker.is(":visible") || (this.focusDate = null, this.picker.hide().detach(), 
            this._detachSecondaryEvents(), this.setViewMode(this.o.startView), this.o.forceParse && this.inputField.val() && this.setValue(), 
            this._trigger("hide")), this;
        },
        destroy: function() {
            return this.hide(), this._detachEvents(), this._detachSecondaryEvents(), this.picker.remove(), 
            delete this.element.data().datepicker, this.isInput || delete this.element.data().date, 
            this;
        },
        paste: function(e) {
            var t;
            if (e.originalEvent.clipboardData && e.originalEvent.clipboardData.types && -1 !== A.inArray("text/plain", e.originalEvent.clipboardData.types)) t = e.originalEvent.clipboardData.getData("text/plain"); else {
                if (!window.clipboardData) return;
                t = window.clipboardData.getData("Text");
            }
            this.setDate(t), this.update(), e.preventDefault();
        },
        _utc_to_local: function(e) {
            if (!e) return e;
            var t = new Date(e.getTime() + 6e4 * e.getTimezoneOffset());
            return t.getTimezoneOffset() !== e.getTimezoneOffset() && (t = new Date(e.getTime() + 6e4 * t.getTimezoneOffset())), 
            t;
        },
        _local_to_utc: function(e) {
            return e && new Date(e.getTime() - 6e4 * e.getTimezoneOffset());
        },
        _zero_time: function(e) {
            return e && new Date(e.getFullYear(), e.getMonth(), e.getDate());
        },
        _zero_utc_time: function(e) {
            return e && E(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate());
        },
        getDates: function() {
            return A.map(this.dates, this._utc_to_local);
        },
        getUTCDates: function() {
            return A.map(this.dates, function(e) {
                return new Date(e);
            });
        },
        getDate: function() {
            return this._utc_to_local(this.getUTCDate());
        },
        getUTCDate: function() {
            var e = this.dates.get(-1);
            return e !== N ? new Date(e) : null;
        },
        clearDates: function() {
            this.inputField.val(""), this._trigger("changeDate"), this.update(), this.o.autoclose && this.hide();
        },
        setDates: function() {
            var e = Array.isArray(arguments[0]) ? arguments[0] : arguments;
            return this.update.apply(this, e), this._trigger("changeDate"), this.setValue(), 
            this;
        },
        setUTCDates: function() {
            var e = Array.isArray(arguments[0]) ? arguments[0] : arguments;
            return this.setDates.apply(this, A.map(e, this._utc_to_local)), this;
        },
        setDate: e("setDates"),
        setUTCDate: e("setUTCDates"),
        remove: e("destroy", "Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead"),
        setValue: function() {
            var e = this.getFormattedDate();
            return this.inputField.val(e), this;
        },
        getFormattedDate: function(t) {
            t === N && (t = this.o.format);
            var n = this.o.language;
            return A.map(this.dates, function(e) {
                return O.formatDate(e, t, n);
            }).join(this.o.multidateSeparator);
        },
        getStartDate: function() {
            return this.o.startDate;
        },
        setStartDate: function(e) {
            return this._process_options({
                startDate: e
            }), this.update(), this.updateNavArrows(), this;
        },
        getEndDate: function() {
            return this.o.endDate;
        },
        setEndDate: function(e) {
            return this._process_options({
                endDate: e
            }), this.update(), this.updateNavArrows(), this;
        },
        setDaysOfWeekDisabled: function(e) {
            return this._process_options({
                daysOfWeekDisabled: e
            }), this.update(), this;
        },
        setDaysOfWeekHighlighted: function(e) {
            return this._process_options({
                daysOfWeekHighlighted: e
            }), this.update(), this;
        },
        setDatesDisabled: function(e) {
            return this._process_options({
                datesDisabled: e
            }), this.update(), this;
        },
        place: function() {
            if (this.isInline) return this;
            var e = this.picker.outerWidth(), t = this.picker.outerHeight(), n = A(this.o.container), i = n.width(), o = "body" === this.o.container ? A(document).scrollTop() : n.scrollTop(), r = n.offset(), s = [ 0 ];
            this.element.parents().each(function() {
                var e = A(this).css("z-index");
                "auto" !== e && 0 !== Number(e) && s.push(Number(e));
            });
            var a = Math.max.apply(Math, s) + this.o.zIndexOffset, l = this.component ? this.component.parent().offset() : this.element.offset(), c = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!1), u = this.component ? this.component.outerWidth(!0) : this.element.outerWidth(!1), d = l.left - r.left, h = l.top - r.top;
            "body" !== this.o.container && (h += o), this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"), 
            "auto" !== this.o.orientation.x ? (this.picker.addClass("datepicker-orient-" + this.o.orientation.x), 
            "right" === this.o.orientation.x && (d -= e - u)) : l.left < 0 ? (this.picker.addClass("datepicker-orient-left"), 
            d -= l.left - 10) : i < d + e ? (this.picker.addClass("datepicker-orient-right"), 
            d += u - e) : this.o.rtl ? this.picker.addClass("datepicker-orient-right") : this.picker.addClass("datepicker-orient-left");
            var f = this.o.orientation.y;
            if ("auto" === f && (f = -o + h - t < 0 ? "bottom" : "top"), this.picker.addClass("datepicker-orient-" + f), 
            "top" === f ? h -= t + parseInt(this.picker.css("padding-top")) : h += c, this.o.rtl) {
                var p = i - (d + u);
                this.picker.css({
                    top: h,
                    right: p,
                    zIndex: a
                });
            } else this.picker.css({
                top: h,
                left: d,
                zIndex: a
            });
            return this;
        },
        _allow_update: !0,
        update: function() {
            if (!this._allow_update) return this;
            var e = this.dates.copy(), n = [], t = !1;
            return arguments.length ? (A.each(arguments, A.proxy(function(e, t) {
                t instanceof Date && (t = this._local_to_utc(t)), n.push(t);
            }, this)), t = !0) : (n = (n = this.isInput ? this.element.val() : this.element.data("date") || this.inputField.val()) && this.o.multidate ? n.split(this.o.multidateSeparator) : [ n ], 
            delete this.element.data().date), n = A.map(n, A.proxy(function(e) {
                return O.parseDate(e, this.o.format, this.o.language, this.o.assumeNearbyYear);
            }, this)), n = A.grep(n, A.proxy(function(e) {
                return !this.dateWithinRange(e) || !e;
            }, this), !0), this.dates.replace(n), this.o.updateViewDate && (this.dates.length ? this.viewDate = new Date(this.dates.get(-1)) : this.viewDate < this.o.startDate ? this.viewDate = new Date(this.o.startDate) : this.viewDate > this.o.endDate ? this.viewDate = new Date(this.o.endDate) : this.viewDate = this.o.defaultViewDate), 
            t ? (this.setValue(), this.element.change()) : this.dates.length && String(e) !== String(this.dates) && t && (this._trigger("changeDate"), 
            this.element.change()), !this.dates.length && e.length && (this._trigger("clearDate"), 
            this.element.change()), this.fill(), this;
        },
        fillDow: function() {
            if (this.o.showWeekDays) {
                var e = this.o.weekStart, t = "<tr>";
                for (this.o.calendarWeeks && (t += '<th class="cw">&#160;</th>'); e < this.o.weekStart + 7; ) t += '<th class="dow', 
                -1 !== A.inArray(e, this.o.daysOfWeekDisabled) && (t += " disabled"), t += '">' + $[this.o.language].daysMin[e++ % 7] + "</th>";
                t += "</tr>", this.picker.find(".datepicker-days thead").append(t);
            }
        },
        fillMonths: function() {
            for (var e = this._utc_to_local(this.viewDate), t = "", n = 0; n < 12; n++) t += '<span class="month' + (e && e.getMonth() === n ? " focused" : "") + '">' + $[this.o.language].monthsShort[n] + "</span>";
            this.picker.find(".datepicker-months td").html(t);
        },
        setRange: function(e) {
            e && e.length ? this.range = A.map(e, function(e) {
                return e.valueOf();
            }) : delete this.range, this.fill();
        },
        getClassNames: function(e) {
            var t = [], n = this.viewDate.getUTCFullYear(), i = this.viewDate.getUTCMonth(), o = I();
            return e.getUTCFullYear() < n || e.getUTCFullYear() === n && e.getUTCMonth() < i ? t.push("old") : (e.getUTCFullYear() > n || e.getUTCFullYear() === n && e.getUTCMonth() > i) && t.push("new"), 
            this.focusDate && e.valueOf() === this.focusDate.valueOf() && t.push("focused"), 
            this.o.todayHighlight && r(e, o) && t.push("today"), -1 !== this.dates.contains(e) && t.push("active"), 
            this.dateWithinRange(e) || t.push("disabled"), this.dateIsDisabled(e) && t.push("disabled", "disabled-date"), 
            -1 !== A.inArray(e.getUTCDay(), this.o.daysOfWeekHighlighted) && t.push("highlighted"), 
            this.range && (e > this.range[0] && e < this.range[this.range.length - 1] && t.push("range"), 
            -1 !== A.inArray(e.valueOf(), this.range) && t.push("selected"), e.valueOf() === this.range[0] && t.push("range-start"), 
            e.valueOf() === this.range[this.range.length - 1] && t.push("range-end")), t;
        },
        _fill_yearsView: function(e, t, n, i, o, r, s) {
            for (var a, l, c, u = "", d = n / 10, h = this.picker.find(e), f = Math.floor(i / n) * n, p = f + 9 * d, g = Math.floor(this.viewDate.getFullYear() / d) * d, m = A.map(this.dates, function(e) {
                return Math.floor(e.getUTCFullYear() / d) * d;
            }), v = f - d; v <= p + d; v += d) a = [ t ], l = null, v === f - d ? a.push("old") : v === p + d && a.push("new"), 
            -1 !== A.inArray(v, m) && a.push("active"), (v < o || r < v) && a.push("disabled"), 
            v === g && a.push("focused"), s !== A.noop && ((c = s(new Date(v, 0, 1))) === N ? c = {} : "boolean" == typeof c ? c = {
                enabled: c
            } : "string" == typeof c && (c = {
                classes: c
            }), !1 === c.enabled && a.push("disabled"), c.classes && (a = a.concat(c.classes.split(/\s+/))), 
            c.tooltip && (l = c.tooltip)), u += '<span class="' + a.join(" ") + '"' + (l ? ' title="' + l + '"' : "") + ">" + v + "</span>";
            h.find(".datepicker-switch").text(f + "-" + p), h.find("td").html(u);
        },
        fill: function() {
            var e, t, n = new Date(this.viewDate), o = n.getUTCFullYear(), i = n.getUTCMonth(), r = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCFullYear() : -1 / 0, s = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCMonth() : -1 / 0, a = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCFullYear() : 1 / 0, l = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCMonth() : 1 / 0, c = $[this.o.language].today || $.en.today || "", u = $[this.o.language].clear || $.en.clear || "", d = $[this.o.language].titleFormat || $.en.titleFormat, h = I(), f = (!0 === this.o.todayBtn || "linked" === this.o.todayBtn) && h >= this.o.startDate && h <= this.o.endDate && !this.weekOfDateIsDisabled(h);
            if (!isNaN(o) && !isNaN(i)) {
                this.picker.find(".datepicker-days .datepicker-switch").text(O.formatDate(n, d, this.o.language)), 
                this.picker.find("tfoot .today").text(c).css("display", f ? "table-cell" : "none"), 
                this.picker.find("tfoot .clear").text(u).css("display", !0 === this.o.clearBtn ? "table-cell" : "none"), 
                this.picker.find("thead .datepicker-title").text(this.o.title).css("display", "string" == typeof this.o.title && "" !== this.o.title ? "table-cell" : "none"), 
                this.updateNavArrows(), this.fillMonths();
                var p = E(o, i, 0), g = p.getUTCDate();
                p.setUTCDate(g - (p.getUTCDay() - this.o.weekStart + 7) % 7);
                var m = new Date(p);
                p.getUTCFullYear() < 100 && m.setUTCFullYear(p.getUTCFullYear()), m.setUTCDate(m.getUTCDate() + 42), 
                m = m.valueOf();
                for (var v, b, y = []; p.valueOf() < m; ) {
                    if ((v = p.getUTCDay()) === this.o.weekStart && (y.push("<tr>"), this.o.calendarWeeks)) {
                        var w = new Date(+p + (this.o.weekStart - v - 7) % 7 * 864e5), x = new Date(Number(w) + (11 - w.getUTCDay()) % 7 * 864e5), C = new Date(Number(C = E(x.getUTCFullYear(), 0, 1)) + (11 - C.getUTCDay()) % 7 * 864e5), T = (x - C) / 864e5 / 7 + 1;
                        y.push('<td class="cw">' + T + "</td>");
                    }
                    (b = this.getClassNames(p)).push("day");
                    var D = p.getUTCDate();
                    this.o.beforeShowDay !== A.noop && ((t = this.o.beforeShowDay(this._utc_to_local(p))) === N ? t = {} : "boolean" == typeof t ? t = {
                        enabled: t
                    } : "string" == typeof t && (t = {
                        classes: t
                    }), !1 === t.enabled && b.push("disabled"), t.classes && (b = b.concat(t.classes.split(/\s+/))), 
                    t.tooltip && (e = t.tooltip), t.content && (D = t.content)), b = "function" == typeof A.uniqueSort ? A.uniqueSort(b) : A.unique(b), 
                    y.push('<td class="' + b.join(" ") + '"' + (e ? ' title="' + e + '"' : "") + ' data-date="' + p.getTime().toString() + '">' + D + "</td>"), 
                    e = null, v === this.o.weekEnd && y.push("</tr>"), p.setUTCDate(p.getUTCDate() + 1);
                }
                this.picker.find(".datepicker-days tbody").html(y.join(""));
                var k = $[this.o.language].monthsTitle || $.en.monthsTitle || "Months", S = this.picker.find(".datepicker-months").find(".datepicker-switch").text(this.o.maxViewMode < 2 ? k : o).end().find("tbody span").removeClass("active");
                if (A.each(this.dates, function(e, t) {
                    t.getUTCFullYear() === o && S.eq(t.getUTCMonth()).addClass("active");
                }), (o < r || a < o) && S.addClass("disabled"), o === r && S.slice(0, s).addClass("disabled"), 
                o === a && S.slice(l + 1).addClass("disabled"), this.o.beforeShowMonth !== A.noop) {
                    var _ = this;
                    A.each(S, function(e, t) {
                        var n = new Date(o, e, 1), i = _.o.beforeShowMonth(n);
                        i === N ? i = {} : "boolean" == typeof i ? i = {
                            enabled: i
                        } : "string" == typeof i && (i = {
                            classes: i
                        }), !1 !== i.enabled || A(t).hasClass("disabled") || A(t).addClass("disabled"), 
                        i.classes && A(t).addClass(i.classes), i.tooltip && A(t).prop("title", i.tooltip);
                    });
                }
                this._fill_yearsView(".datepicker-years", "year", 10, o, r, a, this.o.beforeShowYear), 
                this._fill_yearsView(".datepicker-decades", "decade", 100, o, r, a, this.o.beforeShowDecade), 
                this._fill_yearsView(".datepicker-centuries", "century", 1e3, o, r, a, this.o.beforeShowCentury);
            }
        },
        updateNavArrows: function() {
            if (this._allow_update) {
                var e, t, n = new Date(this.viewDate), i = n.getUTCFullYear(), o = n.getUTCMonth(), r = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCFullYear() : -1 / 0, s = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCMonth() : -1 / 0, a = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCFullYear() : 1 / 0, l = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCMonth() : 1 / 0, c = 1;
                switch (this.viewMode) {
                  case 4:
                    c *= 10;

                  case 3:
                    c *= 10;

                  case 2:
                    c *= 10;

                  case 1:
                    e = Math.floor(i / c) * c <= r, t = Math.floor(i / c) * c + c > a;
                    break;

                  case 0:
                    e = i <= r && o <= s, t = a <= i && l <= o;
                }
                this.picker.find(".prev").toggleClass("disabled", e), this.picker.find(".next").toggleClass("disabled", t);
            }
        },
        click: function(e) {
            var t, n, i;
            e.preventDefault(), e.stopPropagation(), (t = A(e.target)).hasClass("datepicker-switch") && this.viewMode !== this.o.maxViewMode && this.setViewMode(this.viewMode + 1), 
            t.hasClass("today") && !t.hasClass("day") && (this.setViewMode(0), this._setDate(I(), "linked" === this.o.todayBtn ? null : "view")), 
            t.hasClass("clear") && this.clearDates(), t.hasClass("disabled") || (t.hasClass("month") || t.hasClass("year") || t.hasClass("decade") || t.hasClass("century")) && (this.viewDate.setUTCDate(1), 
            1 === this.viewMode ? (i = t.parent().find("span").index(t), n = this.viewDate.getUTCFullYear(), 
            this.viewDate.setUTCMonth(i)) : (i = 0, n = Number(t.text()), this.viewDate.setUTCFullYear(n)), 
            this._trigger(O.viewModes[this.viewMode - 1].e, this.viewDate), this.viewMode === this.o.minViewMode ? this._setDate(E(n, i, 1)) : (this.setViewMode(this.viewMode - 1), 
            this.fill())), this.picker.is(":visible") && this._focused_from && this._focused_from.focus(), 
            delete this._focused_from;
        },
        dayCellClick: function(e) {
            var t = A(e.currentTarget).data("date"), n = new Date(t);
            this.o.updateViewDate && (n.getUTCFullYear() !== this.viewDate.getUTCFullYear() && this._trigger("changeYear", this.viewDate), 
            n.getUTCMonth() !== this.viewDate.getUTCMonth() && this._trigger("changeMonth", this.viewDate)), 
            this._setDate(n);
        },
        navArrowsClick: function(e) {
            var t = A(e.currentTarget).hasClass("prev") ? -1 : 1;
            0 !== this.viewMode && (t *= 12 * O.viewModes[this.viewMode].navStep), this.viewDate = this.moveMonth(this.viewDate, t), 
            this._trigger(O.viewModes[this.viewMode].e, this.viewDate), this.fill();
        },
        _toggle_multidate: function(e) {
            var t = this.dates.contains(e);
            if (e || this.dates.clear(), -1 !== t ? (!0 === this.o.multidate || 1 < this.o.multidate || this.o.toggleActive) && this.dates.remove(t) : (!1 === this.o.multidate && this.dates.clear(), 
            this.dates.push(e)), "number" == typeof this.o.multidate) for (;this.dates.length > this.o.multidate; ) this.dates.remove(0);
        },
        _setDate: function(e, t) {
            t && "date" !== t || this._toggle_multidate(e && new Date(e)), (!t && this.o.updateViewDate || "view" === t) && (this.viewDate = e && new Date(e)), 
            this.fill(), this.setValue(), t && "view" === t || this._trigger("changeDate"), 
            this.inputField.trigger("change"), !this.o.autoclose || t && "date" !== t || this.hide();
        },
        moveDay: function(e, t) {
            var n = new Date(e);
            return n.setUTCDate(e.getUTCDate() + t), n;
        },
        moveWeek: function(e, t) {
            return this.moveDay(e, 7 * t);
        },
        moveMonth: function(e, t) {
            if (!function(e) {
                return e && !isNaN(e.getTime());
            }(e)) return this.o.defaultViewDate;
            if (!t) return e;
            var n, i, o = new Date(e.valueOf()), r = o.getUTCDate(), s = o.getUTCMonth(), a = Math.abs(t);
            if (t = 0 < t ? 1 : -1, 1 === a) i = -1 === t ? function() {
                return o.getUTCMonth() === s;
            } : function() {
                return o.getUTCMonth() !== n;
            }, n = s + t, o.setUTCMonth(n), n = (n + 12) % 12; else {
                for (var l = 0; l < a; l++) o = this.moveMonth(o, t);
                n = o.getUTCMonth(), o.setUTCDate(r), i = function() {
                    return n !== o.getUTCMonth();
                };
            }
            for (;i(); ) o.setUTCDate(--r), o.setUTCMonth(n);
            return o;
        },
        moveYear: function(e, t) {
            return this.moveMonth(e, 12 * t);
        },
        moveAvailableDate: function(e, t, n) {
            do {
                if (e = this[n](e, t), !this.dateWithinRange(e)) return !1;
                n = "moveDay";
            } while (this.dateIsDisabled(e));
            return e;
        },
        weekOfDateIsDisabled: function(e) {
            return -1 !== A.inArray(e.getUTCDay(), this.o.daysOfWeekDisabled);
        },
        dateIsDisabled: function(t) {
            return this.weekOfDateIsDisabled(t) || 0 < A.grep(this.o.datesDisabled, function(e) {
                return r(t, e);
            }).length;
        },
        dateWithinRange: function(e) {
            return e >= this.o.startDate && e <= this.o.endDate;
        },
        keydown: function(e) {
            if (this.picker.is(":visible")) {
                var t, n, i = !1, o = this.focusDate || this.viewDate;
                switch (e.keyCode) {
                  case 27:
                    this.focusDate ? (this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, 
                    this.fill()) : this.hide(), e.preventDefault(), e.stopPropagation();
                    break;

                  case 37:
                  case 38:
                  case 39:
                  case 40:
                    if (!this.o.keyboardNavigation || 7 === this.o.daysOfWeekDisabled.length) break;
                    t = 37 === e.keyCode || 38 === e.keyCode ? -1 : 1, 0 === this.viewMode ? e.ctrlKey ? (n = this.moveAvailableDate(o, t, "moveYear")) && this._trigger("changeYear", this.viewDate) : e.shiftKey ? (n = this.moveAvailableDate(o, t, "moveMonth")) && this._trigger("changeMonth", this.viewDate) : 37 === e.keyCode || 39 === e.keyCode ? n = this.moveAvailableDate(o, t, "moveDay") : this.weekOfDateIsDisabled(o) || (n = this.moveAvailableDate(o, t, "moveWeek")) : 1 === this.viewMode ? (38 !== e.keyCode && 40 !== e.keyCode || (t *= 4), 
                    n = this.moveAvailableDate(o, t, "moveMonth")) : 2 === this.viewMode && (38 !== e.keyCode && 40 !== e.keyCode || (t *= 4), 
                    n = this.moveAvailableDate(o, t, "moveYear")), n && (this.focusDate = this.viewDate = n, 
                    this.setValue(), this.fill(), e.preventDefault());
                    break;

                  case 13:
                    if (!this.o.forceParse) break;
                    o = this.focusDate || this.dates.get(-1) || this.viewDate, this.o.keyboardNavigation && (this._toggle_multidate(o), 
                    i = !0), this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, 
                    this.setValue(), this.fill(), this.picker.is(":visible") && (e.preventDefault(), 
                    e.stopPropagation(), this.o.autoclose && this.hide());
                    break;

                  case 9:
                    this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill(), 
                    this.hide();
                }
                i && (this.dates.length ? this._trigger("changeDate") : this._trigger("clearDate"), 
                this.inputField.trigger("change"));
            } else 40 !== e.keyCode && 27 !== e.keyCode || (this.show(), e.stopPropagation());
        },
        setViewMode: function(e) {
            this.viewMode = e, this.picker.children("div").hide().filter(".datepicker-" + O.viewModes[this.viewMode].clsName).show(), 
            this.updateNavArrows(), this._trigger("changeViewMode", new Date(this.viewDate));
        }
    };
    function c(e, t) {
        A.data(e, "datepicker", this), this.element = A(e), this.inputs = A.map(t.inputs, function(e) {
            return e.jquery ? e[0] : e;
        }), delete t.inputs, this.keepEmptyValues = t.keepEmptyValues, delete t.keepEmptyValues, 
        o.call(A(this.inputs), t).on("changeDate", A.proxy(this.dateUpdated, this)), this.pickers = A.map(this.inputs, function(e) {
            return A.data(e, "datepicker");
        }), this.updateDates();
    }
    c.prototype = {
        updateDates: function() {
            this.dates = A.map(this.pickers, function(e) {
                return e.getUTCDate();
            }), this.updateRanges();
        },
        updateRanges: function() {
            var n = A.map(this.dates, function(e) {
                return e.valueOf();
            });
            A.each(this.pickers, function(e, t) {
                t.setRange(n);
            });
        },
        clearDates: function() {
            A.each(this.pickers, function(e, t) {
                t.clearDates();
            });
        },
        dateUpdated: function(e) {
            if (!this.updating) {
                this.updating = !0;
                var n = A.data(e.target, "datepicker");
                if (n !== N) {
                    var i = n.getUTCDate(), o = this.keepEmptyValues, t = A.inArray(e.target, this.inputs), r = t - 1, s = t + 1, a = this.inputs.length;
                    if (-1 !== t) {
                        if (A.each(this.pickers, function(e, t) {
                            t.getUTCDate() || t !== n && o || t.setUTCDate(i);
                        }), i < this.dates[r]) for (;0 <= r && i < this.dates[r] && 0 < (this.pickers[r].element.val() || "").length; ) this.pickers[r--].setUTCDate(i); else if (i > this.dates[s]) for (;s < a && i > this.dates[s] && 0 < (this.pickers[s].element.val() || "").length; ) this.pickers[s++].setUTCDate(i);
                        this.updateDates(), delete this.updating;
                    }
                }
            }
        },
        destroy: function() {
            A.map(this.pickers, function(e) {
                e.destroy();
            }), A(this.inputs).off("changeDate", this.dateUpdated), delete this.element.data().datepicker;
        },
        remove: e("destroy", "Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead")
    };
    var i = A.fn.datepicker, o = function(s) {
        var a, l = Array.apply(null, arguments);
        if (l.shift(), this.each(function() {
            var e = A(this), t = e.data("datepicker"), n = "object" == typeof s && s;
            if (!t) {
                var i = function(e, t) {
                    var n = A(e).data(), i = {}, o = new RegExp("^" + t.toLowerCase() + "([A-Z])");
                    function r(e, t) {
                        return t.toLowerCase();
                    }
                    for (var s in t = new RegExp("^" + t.toLowerCase()), n) t.test(s) && (i[s.replace(o, r)] = n[s]);
                    return i;
                }(this, "date"), o = function(e) {
                    var n = {};
                    if ($[e] || (e = e.split("-")[0], $[e])) {
                        var i = $[e];
                        return A.each(d, function(e, t) {
                            t in i && (n[t] = i[t]);
                        }), n;
                    }
                }(A.extend({}, u, i, n).language), r = A.extend({}, u, o, i, n);
                t = e.hasClass("input-daterange") || r.inputs ? (A.extend(r, {
                    inputs: r.inputs || e.find("input").toArray()
                }), new c(this, r)) : new x(this, r), e.data("datepicker", t);
            }
            "string" == typeof s && "function" == typeof t[s] && (a = t[s].apply(t, l));
        }), a === N || a instanceof x || a instanceof c) return this;
        if (1 < this.length) throw new Error("Using only allowed for the collection of a single element (" + s + " function)");
        return a;
    };
    A.fn.datepicker = o;
    var u = A.fn.datepicker.defaults = {
        assumeNearbyYear: !1,
        autoclose: !1,
        beforeShowDay: A.noop,
        beforeShowMonth: A.noop,
        beforeShowYear: A.noop,
        beforeShowDecade: A.noop,
        beforeShowCentury: A.noop,
        calendarWeeks: !1,
        clearBtn: !1,
        toggleActive: !1,
        daysOfWeekDisabled: [],
        daysOfWeekHighlighted: [],
        datesDisabled: [],
        endDate: 1 / 0,
        forceParse: !0,
        format: "mm/dd/yyyy",
        isInline: null,
        keepEmptyValues: !1,
        keyboardNavigation: !0,
        language: "en",
        minViewMode: 0,
        maxViewMode: 4,
        multidate: !1,
        multidateSeparator: ",",
        orientation: "auto",
        rtl: !1,
        startDate: -1 / 0,
        startView: 0,
        todayBtn: !1,
        todayHighlight: !1,
        updateViewDate: !0,
        weekStart: 0,
        disableTouchKeyboard: !1,
        enableOnReadonly: !0,
        showOnFocus: !0,
        zIndexOffset: 10,
        container: "body",
        immediateUpdates: !1,
        title: "",
        templates: {
            leftArrow: "&#x00AB;",
            rightArrow: "&#x00BB;"
        },
        showWeekDays: !0
    }, d = A.fn.datepicker.locale_opts = [ "format", "rtl", "weekStart" ];
    A.fn.datepicker.Constructor = x;
    var $ = A.fn.datepicker.dates = {
        en: {
            days: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
            daysShort: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
            daysMin: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],
            months: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
            monthsShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
            today: "Today",
            clear: "Clear",
            titleFormat: "MM yyyy"
        }
    }, O = {
        viewModes: [ {
            names: [ "days", "month" ],
            clsName: "days",
            e: "changeMonth"
        }, {
            names: [ "months", "year" ],
            clsName: "months",
            e: "changeYear",
            navStep: 1
        }, {
            names: [ "years", "decade" ],
            clsName: "years",
            e: "changeDecade",
            navStep: 10
        }, {
            names: [ "decades", "century" ],
            clsName: "decades",
            e: "changeCentury",
            navStep: 100
        }, {
            names: [ "centuries", "millennium" ],
            clsName: "centuries",
            e: "changeMillennium",
            navStep: 1e3
        } ],
        validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
        nonpunctuation: /[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,
        parseFormat: function(e) {
            if ("function" == typeof e.toValue && "function" == typeof e.toDisplay) return e;
            var t = e.replace(this.validParts, "\0").split("\0"), n = e.match(this.validParts);
            if (!t || !t.length || !n || 0 === n.length) throw new Error("Invalid date format.");
            return {
                separators: t,
                parts: n
            };
        },
        parseDate: function(e, t, n, i) {
            if (!e) return N;
            if (e instanceof Date) return e;
            if ("string" == typeof t && (t = O.parseFormat(t)), t.toValue) return t.toValue(e, t, n);
            var o, r, s, a, l, c = {
                d: "moveDay",
                m: "moveMonth",
                w: "moveWeek",
                y: "moveYear"
            }, u = {
                yesterday: "-1d",
                today: "+0d",
                tomorrow: "+1d"
            };
            if (e in u && (e = u[e]), /^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/i.test(e)) {
                for (o = e.match(/([\-+]\d+)([dmwy])/gi), e = new Date(), a = 0; a < o.length; a++) r = o[a].match(/([\-+]\d+)([dmwy])/i), 
                s = Number(r[1]), l = c[r[2].toLowerCase()], e = x.prototype[l](e, s);
                return x.prototype._zero_utc_time(e);
            }
            o = e && e.match(this.nonpunctuation) || [];
            var d, h, f = {}, p = [ "yyyy", "yy", "M", "MM", "m", "mm", "d", "dd" ], g = {
                yyyy: function(e, t) {
                    return e.setUTCFullYear(i ? function(e, t) {
                        return !0 === t && (t = 10), e < 100 && (e += 2e3) > new Date().getFullYear() + t && (e -= 100), 
                        e;
                    }(t, i) : t);
                },
                m: function(e, t) {
                    if (isNaN(e)) return e;
                    for (t -= 1; t < 0; ) t += 12;
                    for (t %= 12, e.setUTCMonth(t); e.getUTCMonth() !== t; ) e.setUTCDate(e.getUTCDate() - 1);
                    return e;
                },
                d: function(e, t) {
                    return e.setUTCDate(t);
                }
            };
            g.yy = g.yyyy, g.M = g.MM = g.mm = g.m, g.dd = g.d, e = I();
            var m = t.parts.slice();
            function v() {
                var e = this.slice(0, o[a].length), t = o[a].slice(0, e.length);
                return e.toLowerCase() === t.toLowerCase();
            }
            if (o.length !== m.length && (m = A(m).filter(function(e, t) {
                return -1 !== A.inArray(t, p);
            }).toArray()), o.length === m.length) {
                var b, y, w;
                for (a = 0, b = m.length; a < b; a++) {
                    if (d = parseInt(o[a], 10), r = m[a], isNaN(d)) switch (r) {
                      case "MM":
                        h = A($[n].months).filter(v), d = A.inArray(h[0], $[n].months) + 1;
                        break;

                      case "M":
                        h = A($[n].monthsShort).filter(v), d = A.inArray(h[0], $[n].monthsShort) + 1;
                    }
                    f[r] = d;
                }
                for (a = 0; a < p.length; a++) (w = p[a]) in f && !isNaN(f[w]) && (y = new Date(e), 
                g[w](y, f[w]), isNaN(y) || (e = y));
            }
            return e;
        },
        formatDate: function(e, t, n) {
            if (!e) return "";
            if ("string" == typeof t && (t = O.parseFormat(t)), t.toDisplay) return t.toDisplay(e, t, n);
            var i = {
                d: e.getUTCDate(),
                D: $[n].daysShort[e.getUTCDay()],
                DD: $[n].days[e.getUTCDay()],
                m: e.getUTCMonth() + 1,
                M: $[n].monthsShort[e.getUTCMonth()],
                MM: $[n].months[e.getUTCMonth()],
                yy: e.getUTCFullYear().toString().substring(2),
                yyyy: e.getUTCFullYear()
            };
            i.dd = (i.d < 10 ? "0" : "") + i.d, i.mm = (i.m < 10 ? "0" : "") + i.m, e = [];
            for (var o = A.extend([], t.separators), r = 0, s = t.parts.length; r <= s; r++) o.length && e.push(o.shift()), 
            e.push(i[t.parts[r]]);
            return e.join("");
        },
        headTemplate: '<thead><tr><th colspan="7" class="datepicker-title"></th></tr><tr><th class="prev">' + u.templates.leftArrow + '</th><th colspan="5" class="datepicker-switch"></th><th class="next">' + u.templates.rightArrow + "</th></tr></thead>",
        contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
        footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'
    };
    O.template = '<div class="datepicker"><div class="datepicker-days"><table class="table-condensed">' + O.headTemplate + "<tbody></tbody>" + O.footTemplate + '</table></div><div class="datepicker-months"><table class="table-condensed">' + O.headTemplate + O.contTemplate + O.footTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + O.headTemplate + O.contTemplate + O.footTemplate + '</table></div><div class="datepicker-decades"><table class="table-condensed">' + O.headTemplate + O.contTemplate + O.footTemplate + '</table></div><div class="datepicker-centuries"><table class="table-condensed">' + O.headTemplate + O.contTemplate + O.footTemplate + "</table></div></div>", 
    A.fn.datepicker.DPGlobal = O, A.fn.datepicker.noConflict = function() {
        return A.fn.datepicker = i, this;
    }, A.fn.datepicker.version = "1.10.0", A.fn.datepicker.deprecated = function(e) {
        var t = window.console;
        t && t.warn && t.warn("DEPRECATED: " + e);
    }, A(document).on("focus.datepicker.data-api click.datepicker.data-api", '[data-provide="datepicker"]', function(e) {
        var t = A(this);
        t.data("datepicker") || (e.preventDefault(), o.call(t, "show"));
    }), A(function() {
        o.call(A('[data-provide="datepicker-inline"]'));
    });
}), function(a) {
    var e, t, n = 0, i = /^ui-id-\d+$/;
    function o(e, t) {
        var n, i, o, r = e.nodeName.toLowerCase();
        return "area" === r ? (i = (n = e.parentNode).name, !(!e.href || !i || "map" !== n.nodeName.toLowerCase()) && (!!(o = a("img[usemap=#" + i + "]")[0]) && s(o))) : (/input|select|textarea|button|object/.test(r) ? !e.disabled : "a" === r && e.href || t) && s(e);
    }
    function s(e) {
        return a.expr.filters.visible(e) && !a(e).parents().addBack().filter(function() {
            return "hidden" === a.css(this, "visibility");
        }).length;
    }
    a.ui = a.ui || {}, a.extend(a.ui, {
        version: "1.10.3",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }), a.fn.extend({
        focus: (e = a.fn.focus, function(t, n) {
            return "number" == typeof t ? this.each(function() {
                var e = this;
                setTimeout(function() {
                    a(e).focus(), n && n.call(e);
                }, t);
            }) : e.apply(this, arguments);
        }),
        scrollParent: function() {
            var e;
            return e = a.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                return /(relative|absolute|fixed)/.test(a.css(this, "position")) && /(auto|scroll)/.test(a.css(this, "overflow") + a.css(this, "overflow-y") + a.css(this, "overflow-x"));
            }).eq(0) : this.parents().filter(function() {
                return /(auto|scroll)/.test(a.css(this, "overflow") + a.css(this, "overflow-y") + a.css(this, "overflow-x"));
            }).eq(0), /fixed/.test(this.css("position")) || !e.length ? a(document) : e;
        },
        zIndex: function(e) {
            if (void 0 !== e) return this.css("zIndex", e);
            if (this.length) for (var t, n, i = a(this[0]); i.length && i[0] !== document; ) {
                if (("absolute" === (t = i.css("position")) || "relative" === t || "fixed" === t) && (n = parseInt(i.css("zIndex"), 10), 
                !isNaN(n) && 0 !== n)) return n;
                i = i.parent();
            }
            return 0;
        },
        uniqueId: function() {
            return this.each(function() {
                this.id || (this.id = "ui-id-" + ++n);
            });
        },
        removeUniqueId: function() {
            return this.each(function() {
                i.test(this.id) && a(this).removeAttr("id");
            });
        }
    }), a.extend(a.expr[":"], {
        data: a.expr.createPseudo ? a.expr.createPseudo(function(t) {
            return function(e) {
                return !!a.data(e, t);
            };
        }) : function(e, t, n) {
            return !!a.data(e, n[3]);
        },
        focusable: function(e) {
            return o(e, !isNaN(a.attr(e, "tabindex")));
        },
        tabbable: function(e) {
            var t = a.attr(e, "tabindex"), n = isNaN(t);
            return (n || 0 <= t) && o(e, !n);
        }
    }), a("<a>").outerWidth(1).jquery || a.each([ "Width", "Height" ], function(e, n) {
        var o = "Width" === n ? [ "Left", "Right" ] : [ "Top", "Bottom" ], i = n.toLowerCase(), r = {
            innerWidth: a.fn.innerWidth,
            innerHeight: a.fn.innerHeight,
            outerWidth: a.fn.outerWidth,
            outerHeight: a.fn.outerHeight
        };
        function s(e, t, n, i) {
            return a.each(o, function() {
                t -= parseFloat(a.css(e, "padding" + this)) || 0, n && (t -= parseFloat(a.css(e, "border" + this + "Width")) || 0), 
                i && (t -= parseFloat(a.css(e, "margin" + this)) || 0);
            }), t;
        }
        a.fn["inner" + n] = function(e) {
            return void 0 === e ? r["inner" + n].call(this) : this.each(function() {
                a(this).css(i, s(this, e) + "px");
            });
        }, a.fn["outer" + n] = function(e, t) {
            return "number" != typeof e ? r["outer" + n].call(this, e) : this.each(function() {
                a(this).css(i, s(this, e, !0, t) + "px");
            });
        };
    }), a.fn.addBack || (a.fn.addBack = function(e) {
        return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
    }), a("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (a.fn.removeData = (t = a.fn.removeData, 
    function(e) {
        return arguments.length ? t.call(this, a.camelCase(e)) : t.call(this);
    })), a.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), a.support.selectstart = "onselectstart" in document.createElement("div"), 
    a.fn.extend({
        disableSelection: function() {
            return this.bind((a.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(e) {
                e.preventDefault();
            });
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection");
        }
    }), a.extend(a.ui, {
        plugin: {
            add: function(e, t, n) {
                var i, o = a.ui[e].prototype;
                for (i in n) o.plugins[i] = o.plugins[i] || [], o.plugins[i].push([ t, n[i] ]);
            },
            call: function(e, t, n) {
                var i, o = e.plugins[t];
                if (o && e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType) for (i = 0; i < o.length; i++) e.options[o[i][0]] && o[i][1].apply(e.element, n);
            }
        },
        hasScroll: function(e, t) {
            if ("hidden" === a(e).css("overflow")) return !1;
            var n, i = t && "left" === t ? "scrollLeft" : "scrollTop";
            return 0 < e[i] || (e[i] = 1, n = 0 < e[i], e[i] = 0, n);
        }
    });
}(jQuery), function(u, a) {
    var n = 0, l = Array.prototype.slice, i = u.cleanData;
    u.cleanData = function(e) {
        for (var t, n = 0; null != (t = e[n]); n++) try {
            u(t).triggerHandler("remove");
        } catch (e) {}
        i(e);
    }, u.widget = function(e, n, t) {
        var i, o, r, s, a = {}, l = e.split(".")[0];
        e = e.split(".")[1], i = l + "-" + e, t || (t = n, n = u.Widget), u.expr[":"][i.toLowerCase()] = function(e) {
            return !!u.data(e, i);
        }, u[l] = u[l] || {}, o = u[l][e], r = u[l][e] = function(e, t) {
            if (!this._createWidget) return new r(e, t);
            arguments.length && this._createWidget(e, t);
        }, u.extend(r, o, {
            version: t.version,
            _proto: u.extend({}, t),
            _childConstructors: []
        }), (s = new n()).options = u.widget.extend({}, s.options), u.each(t, function(t, i) {
            function o() {
                return n.prototype[t].apply(this, arguments);
            }
            function r(e) {
                return n.prototype[t].apply(this, e);
            }
            u.isFunction(i) ? a[t] = function() {
                var e, t = this._super, n = this._superApply;
                return this._super = o, this._superApply = r, e = i.apply(this, arguments), this._super = t, 
                this._superApply = n, e;
            } : a[t] = i;
        }), r.prototype = u.widget.extend(s, {
            widgetEventPrefix: o ? s.widgetEventPrefix : e
        }, a, {
            constructor: r,
            namespace: l,
            widgetName: e,
            widgetFullName: i
        }), o ? (u.each(o._childConstructors, function(e, t) {
            var n = t.prototype;
            u.widget(n.namespace + "." + n.widgetName, r, t._proto);
        }), delete o._childConstructors) : n._childConstructors.push(r), u.widget.bridge(e, r);
    }, u.widget.extend = function(e) {
        for (var t, n, i = l.call(arguments, 1), o = 0, r = i.length; o < r; o++) for (t in i[o]) n = i[o][t], 
        i[o].hasOwnProperty(t) && n !== a && (u.isPlainObject(n) ? e[t] = u.isPlainObject(e[t]) ? u.widget.extend({}, e[t], n) : u.widget.extend({}, n) : e[t] = n);
        return e;
    }, u.widget.bridge = function(r, t) {
        var s = t.prototype.widgetFullName || r;
        u.fn[r] = function(n) {
            var e = "string" == typeof n, i = l.call(arguments, 1), o = this;
            return n = !e && i.length ? u.widget.extend.apply(null, [ n ].concat(i)) : n, e ? this.each(function() {
                var e, t = u.data(this, s);
                return t ? u.isFunction(t[n]) && "_" !== n.charAt(0) ? (e = t[n].apply(t, i)) !== t && e !== a ? (o = e && e.jquery ? o.pushStack(e.get()) : e, 
                !1) : void 0 : u.error("no such method '" + n + "' for " + r + " widget instance") : u.error("cannot call methods on " + r + " prior to initialization; attempted to call method '" + n + "'");
            }) : this.each(function() {
                var e = u.data(this, s);
                e ? e.option(n || {})._init() : u.data(this, s, new t(n, this));
            }), o;
        };
    }, u.Widget = function() {}, u.Widget._childConstructors = [], u.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(e, t) {
            t = u(t || this.defaultElement || this)[0], this.element = u(t), this.uuid = n++, 
            this.eventNamespace = "." + this.widgetName + this.uuid, this.options = u.widget.extend({}, this.options, this._getCreateOptions(), e), 
            this.bindings = u(), this.hoverable = u(), this.focusable = u(), t !== this && (u.data(t, this.widgetFullName, this), 
            this._on(!0, this.element, {
                remove: function(e) {
                    e.target === t && this.destroy();
                }
            }), this.document = u(t.style ? t.ownerDocument : t.document || t), this.window = u(this.document[0].defaultView || this.document[0].parentWindow)), 
            this._create(), this._trigger("create", null, this._getCreateEventData()), this._init();
        },
        _getCreateOptions: u.noop,
        _getCreateEventData: u.noop,
        _create: u.noop,
        _init: u.noop,
        destroy: function() {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(u.camelCase(this.widgetFullName)), 
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), 
            this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), 
            this.focusable.removeClass("ui-state-focus");
        },
        _destroy: u.noop,
        widget: function() {
            return this.element;
        },
        option: function(e, t) {
            var n, i, o, r = e;
            if (0 === arguments.length) return u.widget.extend({}, this.options);
            if ("string" == typeof e) if (r = {}, e = (n = e.split(".")).shift(), n.length) {
                for (i = r[e] = u.widget.extend({}, this.options[e]), o = 0; o < n.length - 1; o++) i[n[o]] = i[n[o]] || {}, 
                i = i[n[o]];
                if (e = n.pop(), t === a) return i[e] === a ? null : i[e];
                i[e] = t;
            } else {
                if (t === a) return this.options[e] === a ? null : this.options[e];
                r[e] = t;
            }
            return this._setOptions(r), this;
        },
        _setOptions: function(e) {
            var t;
            for (t in e) this._setOption(t, e[t]);
            return this;
        },
        _setOption: function(e, t) {
            return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!t).attr("aria-disabled", t), 
            this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), 
            this;
        },
        enable: function() {
            return this._setOption("disabled", !1);
        },
        disable: function() {
            return this._setOption("disabled", !0);
        },
        _on: function(s, a, e) {
            var l, c = this;
            "boolean" != typeof s && (e = a, a = s, s = !1), e ? (a = l = u(a), this.bindings = this.bindings.add(a)) : (e = a, 
            a = this.element, l = this.widget()), u.each(e, function(e, t) {
                function n() {
                    if (s || !0 !== c.options.disabled && !u(this).hasClass("ui-state-disabled")) return ("string" == typeof t ? c[t] : t).apply(c, arguments);
                }
                "string" != typeof t && (n.guid = t.guid = t.guid || n.guid || u.guid++);
                var i = e.match(/^(\w+)\s*(.*)$/), o = i[1] + c.eventNamespace, r = i[2];
                r ? l.delegate(r, o, n) : a.bind(o, n);
            });
        },
        _off: function(e, t) {
            t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, 
            e.unbind(t).undelegate(t);
        },
        _delay: function(e, t) {
            var n = this;
            return setTimeout(function() {
                return ("string" == typeof e ? n[e] : e).apply(n, arguments);
            }, t || 0);
        },
        _hoverable: function(e) {
            this.hoverable = this.hoverable.add(e), this._on(e, {
                mouseenter: function(e) {
                    u(e.currentTarget).addClass("ui-state-hover");
                },
                mouseleave: function(e) {
                    u(e.currentTarget).removeClass("ui-state-hover");
                }
            });
        },
        _focusable: function(e) {
            this.focusable = this.focusable.add(e), this._on(e, {
                focusin: function(e) {
                    u(e.currentTarget).addClass("ui-state-focus");
                },
                focusout: function(e) {
                    u(e.currentTarget).removeClass("ui-state-focus");
                }
            });
        },
        _trigger: function(e, t, n) {
            var i, o, r = this.options[e];
            if (n = n || {}, (t = u.Event(t)).type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), 
            t.target = this.element[0], o = t.originalEvent) for (i in o) i in t || (t[i] = o[i]);
            return this.element.trigger(t, n), !(u.isFunction(r) && !1 === r.apply(this.element[0], [ t ].concat(n)) || t.isDefaultPrevented());
        }
    }, u.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(r, s) {
        u.Widget.prototype["_" + r] = function(t, e, n) {
            "string" == typeof e && (e = {
                effect: e
            });
            var i, o = e ? !0 === e || "number" == typeof e ? s : e.effect || s : r;
            "number" == typeof (e = e || {}) && (e = {
                duration: e
            }), i = !u.isEmptyObject(e), e.complete = n, e.delay && t.delay(e.delay), i && u.effects && u.effects.effect[o] ? t[r](e) : o !== r && t[o] ? t[o](e.duration, e.easing, n) : t.queue(function(e) {
                u(this)[r](), n && n.call(t[0]), e();
            });
        };
    });
}(jQuery), function(o) {
    var r = !1;
    o(document).mouseup(function() {
        r = !1;
    }), o.widget("ui.mouse", {
        version: "1.10.3",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var t = this;
            this.element.bind("mousedown." + this.widgetName, function(e) {
                return t._mouseDown(e);
            }).bind("click." + this.widgetName, function(e) {
                if (!0 === o.data(e.target, t.widgetName + ".preventClickEvent")) return o.removeData(e.target, t.widgetName + ".preventClickEvent"), 
                e.stopImmediatePropagation(), !1;
            }), this.started = !1;
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && o(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
        },
        _mouseDown: function(e) {
            if (!r) {
                this._mouseStarted && this._mouseUp(e), this._mouseDownEvent = e;
                var t = this, n = 1 === e.which, i = !("string" != typeof this.options.cancel || !e.target.nodeName) && o(e.target).closest(this.options.cancel).length;
                return !(n && !i && this._mouseCapture(e)) || (this.mouseDelayMet = !this.options.delay, 
                this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    t.mouseDelayMet = !0;
                }, this.options.delay)), this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = !1 !== this._mouseStart(e), 
                !this._mouseStarted) ? (e.preventDefault(), !0) : (!0 === o.data(e.target, this.widgetName + ".preventClickEvent") && o.removeData(e.target, this.widgetName + ".preventClickEvent"), 
                this._mouseMoveDelegate = function(e) {
                    return t._mouseMove(e);
                }, this._mouseUpDelegate = function(e) {
                    return t._mouseUp(e);
                }, o(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), 
                e.preventDefault(), r = !0));
            }
        },
        _mouseMove: function(e) {
            return o.ui.ie && (!document.documentMode || document.documentMode < 9) && !e.button ? this._mouseUp(e) : this._mouseStarted ? (this._mouseDrag(e), 
            e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, e), 
            this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted);
        },
        _mouseUp: function(e) {
            return o(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), 
            this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && o.data(e.target, this.widgetName + ".preventClickEvent", !0), 
            this._mouseStop(e)), !1;
        },
        _mouseDistanceMet: function(e) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance;
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet;
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return !0;
        }
    });
}(jQuery), function(f) {
    function p(e, t, n) {
        return t < e && e < t + n;
    }
    function g(e) {
        return /left|right/.test(e.css("float")) || /inline|table-cell/.test(e.css("display"));
    }
    f.widget("ui.sortable", f.ui.mouse, {
        version: "1.10.3",
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
            appendTo: "parent",
            axis: !1,
            connectWith: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            dropOnEmpty: !0,
            forcePlaceholderSize: !1,
            forceHelperSize: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            items: "> *",
            opacity: !1,
            placeholder: !1,
            revert: !1,
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1e3,
            activate: null,
            beforeStop: null,
            change: null,
            deactivate: null,
            out: null,
            over: null,
            receive: null,
            remove: null,
            sort: null,
            start: null,
            stop: null,
            update: null
        },
        _create: function() {
            var e = this.options;
            this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), 
            this.floating = !!this.items.length && ("x" === e.axis || g(this.items[0].item)), 
            this.offset = this.element.offset(), this._mouseInit(), this.ready = !0;
        },
        _destroy: function() {
            this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
            for (var e = this.items.length - 1; 0 <= e; e--) this.items[e].item.removeData(this.widgetName + "-item");
            return this;
        },
        _setOption: function(e, t) {
            "disabled" === e ? (this.options[e] = t, this.widget().toggleClass("ui-sortable-disabled", !!t)) : f.Widget.prototype._setOption.apply(this, arguments);
        },
        _mouseCapture: function(e, t) {
            var n = null, i = !1, o = this;
            return !this.reverting && (!this.options.disabled && "static" !== this.options.type && (this._refreshItems(e), 
            f(e.target).parents().each(function() {
                if (f.data(this, o.widgetName + "-item") === o) return n = f(this), !1;
            }), f.data(e.target, o.widgetName + "-item") === o && (n = f(e.target)), !!n && (!(this.options.handle && !t && (f(this.options.handle, n).find("*").addBack().each(function() {
                this === e.target && (i = !0);
            }), !i)) && (this.currentItem = n, this._removeCurrentsFromItems(), !0))));
        },
        _mouseStart: function(e, t, n) {
            var i, o, r = this.options;
            if ((this.currentContainer = this).refreshPositions(), this.helper = this._createHelper(e), 
            this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), 
            this.offset = this.currentItem.offset(), this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            }, f.extend(this.offset, {
                click: {
                    left: e.pageX - this.offset.left,
                    top: e.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), 
            this.originalPosition = this._generatePosition(e), this.originalPageX = e.pageX, 
            this.originalPageY = e.pageY, r.cursorAt && this._adjustOffsetFromHelper(r.cursorAt), 
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), 
            r.containment && this._setContainment(), r.cursor && "auto" !== r.cursor && (o = this.document.find("body"), 
            this.storedCursor = o.css("cursor"), o.css("cursor", r.cursor), this.storedStylesheet = f("<style>*{ cursor: " + r.cursor + " !important; }</style>").appendTo(o)), 
            r.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), 
            this.helper.css("opacity", r.opacity)), r.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), 
            this.helper.css("zIndex", r.zIndex)), this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), 
            this._trigger("start", e, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), 
            !n) for (i = this.containers.length - 1; 0 <= i; i--) this.containers[i]._trigger("activate", e, this._uiHash(this));
            return f.ui.ddmanager && (f.ui.ddmanager.current = this), f.ui.ddmanager && !r.dropBehaviour && f.ui.ddmanager.prepareOffsets(this, e), 
            this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(e), 
            !0;
        },
        _mouseDrag: function(e) {
            var t, n, i, o, r = this.options, s = !1;
            for (this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), 
            this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e.pageY < r.scrollSensitivity ? this.scrollParent[0].scrollTop = s = this.scrollParent[0].scrollTop + r.scrollSpeed : e.pageY - this.overflowOffset.top < r.scrollSensitivity && (this.scrollParent[0].scrollTop = s = this.scrollParent[0].scrollTop - r.scrollSpeed), 
            this.overflowOffset.left + this.scrollParent[0].offsetWidth - e.pageX < r.scrollSensitivity ? this.scrollParent[0].scrollLeft = s = this.scrollParent[0].scrollLeft + r.scrollSpeed : e.pageX - this.overflowOffset.left < r.scrollSensitivity && (this.scrollParent[0].scrollLeft = s = this.scrollParent[0].scrollLeft - r.scrollSpeed)) : (e.pageY - f(document).scrollTop() < r.scrollSensitivity ? s = f(document).scrollTop(f(document).scrollTop() - r.scrollSpeed) : f(window).height() - (e.pageY - f(document).scrollTop()) < r.scrollSensitivity && (s = f(document).scrollTop(f(document).scrollTop() + r.scrollSpeed)), 
            e.pageX - f(document).scrollLeft() < r.scrollSensitivity ? s = f(document).scrollLeft(f(document).scrollLeft() - r.scrollSpeed) : f(window).width() - (e.pageX - f(document).scrollLeft()) < r.scrollSensitivity && (s = f(document).scrollLeft(f(document).scrollLeft() + r.scrollSpeed))), 
            !1 !== s && f.ui.ddmanager && !r.dropBehaviour && f.ui.ddmanager.prepareOffsets(this, e)), 
            this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), 
            this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), 
            t = this.items.length - 1; 0 <= t; t--) if (i = (n = this.items[t]).item[0], (o = this._intersectsWithPointer(n)) && n.instance === this.currentContainer && !(i === this.currentItem[0] || this.placeholder[1 === o ? "next" : "prev"]()[0] === i || f.contains(this.placeholder[0], i) || "semi-dynamic" === this.options.type && f.contains(this.element[0], i))) {
                if (this.direction = 1 === o ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(n)) break;
                this._rearrange(e, n), this._trigger("change", e, this._uiHash());
                break;
            }
            return this._contactContainers(e), f.ui.ddmanager && f.ui.ddmanager.drag(this, e), 
            this._trigger("sort", e, this._uiHash()), this.lastPositionAbs = this.positionAbs, 
            !1;
        },
        _mouseStop: function(e, t) {
            if (e) {
                if (f.ui.ddmanager && !this.options.dropBehaviour && f.ui.ddmanager.drop(this, e), 
                this.options.revert) {
                    var n = this, i = this.placeholder.offset(), o = this.options.axis, r = {};
                    o && "x" !== o || (r.left = i.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)), 
                    o && "y" !== o || (r.top = i.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)), 
                    this.reverting = !0, f(this.helper).animate(r, parseInt(this.options.revert, 10) || 500, function() {
                        n._clear(e);
                    });
                } else this._clear(e, t);
                return !1;
            }
        },
        cancel: function() {
            if (this.dragging) {
                this._mouseUp({
                    target: null
                }), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                for (var e = this.containers.length - 1; 0 <= e; e--) this.containers[e]._trigger("deactivate", null, this._uiHash(this)), 
                this.containers[e].containerCache.over && (this.containers[e]._trigger("out", null, this._uiHash(this)), 
                this.containers[e].containerCache.over = 0);
            }
            return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), 
            "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), 
            f.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null
            }), this.domPosition.prev ? f(this.domPosition.prev).after(this.currentItem) : f(this.domPosition.parent).prepend(this.currentItem)), 
            this;
        },
        serialize: function(t) {
            var e = this._getItemsAsjQuery(t && t.connected), n = [];
            return t = t || {}, f(e).each(function() {
                var e = (f(t.item || this).attr(t.attribute || "id") || "").match(t.expression || /(.+)[\-=_](.+)/);
                e && n.push((t.key || e[1] + "[]") + "=" + (t.key && t.expression ? e[1] : e[2]));
            }), !n.length && t.key && n.push(t.key + "="), n.join("&");
        },
        toArray: function(e) {
            var t = this._getItemsAsjQuery(e && e.connected), n = [];
            return e = e || {}, t.each(function() {
                n.push(f(e.item || this).attr(e.attribute || "id") || "");
            }), n;
        },
        _intersectsWith: function(e) {
            var t = this.positionAbs.left, n = t + this.helperProportions.width, i = this.positionAbs.top, o = i + this.helperProportions.height, r = e.left, s = r + e.width, a = e.top, l = a + e.height, c = this.offset.click.top, u = this.offset.click.left, d = "x" === this.options.axis || a < i + c && i + c < l, h = "y" === this.options.axis || r < t + u && t + u < s, f = d && h;
            return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > e[this.floating ? "width" : "height"] ? f : r < t + this.helperProportions.width / 2 && n - this.helperProportions.width / 2 < s && a < i + this.helperProportions.height / 2 && o - this.helperProportions.height / 2 < l;
        },
        _intersectsWithPointer: function(e) {
            var t = "x" === this.options.axis || p(this.positionAbs.top + this.offset.click.top, e.top, e.height), n = "y" === this.options.axis || p(this.positionAbs.left + this.offset.click.left, e.left, e.width), i = t && n, o = this._getDragVerticalDirection(), r = this._getDragHorizontalDirection();
            return !!i && (this.floating ? r && "right" === r || "down" === o ? 2 : 1 : o && ("down" === o ? 2 : 1));
        },
        _intersectsWithSides: function(e) {
            var t = p(this.positionAbs.top + this.offset.click.top, e.top + e.height / 2, e.height), n = p(this.positionAbs.left + this.offset.click.left, e.left + e.width / 2, e.width), i = this._getDragVerticalDirection(), o = this._getDragHorizontalDirection();
            return this.floating && o ? "right" === o && n || "left" === o && !n : i && ("down" === i && t || "up" === i && !t);
        },
        _getDragVerticalDirection: function() {
            var e = this.positionAbs.top - this.lastPositionAbs.top;
            return 0 != e && (0 < e ? "down" : "up");
        },
        _getDragHorizontalDirection: function() {
            var e = this.positionAbs.left - this.lastPositionAbs.left;
            return 0 != e && (0 < e ? "right" : "left");
        },
        refresh: function(e) {
            return this._refreshItems(e), this.refreshPositions(), this;
        },
        _connectWith: function() {
            var e = this.options;
            return e.connectWith.constructor === String ? [ e.connectWith ] : e.connectWith;
        },
        _getItemsAsjQuery: function(e) {
            var t, n, i, o, r = [], s = [], a = this._connectWith();
            if (a && e) for (t = a.length - 1; 0 <= t; t--) for (n = (i = f(a[t])).length - 1; 0 <= n; n--) (o = f.data(i[n], this.widgetFullName)) && o !== this && !o.options.disabled && s.push([ f.isFunction(o.options.items) ? o.options.items.call(o.element) : f(o.options.items, o.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), o ]);
            for (s.push([ f.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : f(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this ]), 
            t = s.length - 1; 0 <= t; t--) s[t][0].each(function() {
                r.push(this);
            });
            return f(r);
        },
        _removeCurrentsFromItems: function() {
            var n = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = f.grep(this.items, function(e) {
                for (var t = 0; t < n.length; t++) if (n[t] === e.item[0]) return !1;
                return !0;
            });
        },
        _refreshItems: function(e) {
            this.items = [], this.containers = [ this ];
            var t, n, i, o, r, s, a, l, c = this.items, u = [ [ f.isFunction(this.options.items) ? this.options.items.call(this.element[0], e, {
                item: this.currentItem
            }) : f(this.options.items, this.element), this ] ], d = this._connectWith();
            if (d && this.ready) for (t = d.length - 1; 0 <= t; t--) for (n = (i = f(d[t])).length - 1; 0 <= n; n--) (o = f.data(i[n], this.widgetFullName)) && o !== this && !o.options.disabled && (u.push([ f.isFunction(o.options.items) ? o.options.items.call(o.element[0], e, {
                item: this.currentItem
            }) : f(o.options.items, o.element), o ]), this.containers.push(o));
            for (t = u.length - 1; 0 <= t; t--) for (r = u[t][1], n = 0, l = (s = u[t][0]).length; n < l; n++) (a = f(s[n])).data(this.widgetName + "-item", r), 
            c.push({
                item: a,
                instance: r,
                width: 0,
                height: 0,
                left: 0,
                top: 0
            });
        },
        refreshPositions: function(e) {
            var t, n, i, o;
            for (this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset()), 
            t = this.items.length - 1; 0 <= t; t--) (n = this.items[t]).instance !== this.currentContainer && this.currentContainer && n.item[0] !== this.currentItem[0] || (i = this.options.toleranceElement ? f(this.options.toleranceElement, n.item) : n.item, 
            e || (n.width = i.outerWidth(), n.height = i.outerHeight()), o = i.offset(), n.left = o.left, 
            n.top = o.top);
            if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this); else for (t = this.containers.length - 1; 0 <= t; t--) o = this.containers[t].element.offset(), 
            this.containers[t].containerCache.left = o.left, this.containers[t].containerCache.top = o.top, 
            this.containers[t].containerCache.width = this.containers[t].element.outerWidth(), 
            this.containers[t].containerCache.height = this.containers[t].element.outerHeight();
            return this;
        },
        _createPlaceholder: function(n) {
            var i, o = (n = n || this).options;
            o.placeholder && o.placeholder.constructor !== String || (i = o.placeholder, o.placeholder = {
                element: function() {
                    var e = n.currentItem[0].nodeName.toLowerCase(), t = f("<" + e + ">", n.document[0]).addClass(i || n.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                    return "tr" === e ? n.currentItem.children().each(function() {
                        f("<td>&#160;</td>", n.document[0]).attr("colspan", f(this).attr("colspan") || 1).appendTo(t);
                    }) : "img" === e && t.attr("src", n.currentItem.attr("src")), i || t.css("visibility", "hidden"), 
                    t;
                },
                update: function(e, t) {
                    i && !o.forcePlaceholderSize || (t.height() || t.height(n.currentItem.innerHeight() - parseInt(n.currentItem.css("paddingTop") || 0, 10) - parseInt(n.currentItem.css("paddingBottom") || 0, 10)), 
                    t.width() || t.width(n.currentItem.innerWidth() - parseInt(n.currentItem.css("paddingLeft") || 0, 10) - parseInt(n.currentItem.css("paddingRight") || 0, 10)));
                }
            }), n.placeholder = f(o.placeholder.element.call(n.element, n.currentItem)), n.currentItem.after(n.placeholder), 
            o.placeholder.update(n, n.placeholder);
        },
        _contactContainers: function(e) {
            var t, n, i, o, r, s, a, l, c, u, d = null, h = null;
            for (t = this.containers.length - 1; 0 <= t; t--) if (!f.contains(this.currentItem[0], this.containers[t].element[0])) if (this._intersectsWith(this.containers[t].containerCache)) {
                if (d && f.contains(this.containers[t].element[0], d.element[0])) continue;
                d = this.containers[t], h = t;
            } else this.containers[t].containerCache.over && (this.containers[t]._trigger("out", e, this._uiHash(this)), 
            this.containers[t].containerCache.over = 0);
            if (d) if (1 === this.containers.length) this.containers[h].containerCache.over || (this.containers[h]._trigger("over", e, this._uiHash(this)), 
            this.containers[h].containerCache.over = 1); else {
                for (i = 1e4, o = null, r = (u = d.floating || g(this.currentItem)) ? "left" : "top", 
                s = u ? "width" : "height", a = this.positionAbs[r] + this.offset.click[r], n = this.items.length - 1; 0 <= n; n--) f.contains(this.containers[h].element[0], this.items[n].item[0]) && this.items[n].item[0] !== this.currentItem[0] && (u && !p(this.positionAbs.top + this.offset.click.top, this.items[n].top, this.items[n].height) || (l = this.items[n].item.offset()[r], 
                c = !1, Math.abs(l - a) > Math.abs(l + this.items[n][s] - a) && (c = !0, l += this.items[n][s]), 
                Math.abs(l - a) < i && (i = Math.abs(l - a), o = this.items[n], this.direction = c ? "up" : "down")));
                if (!o && !this.options.dropOnEmpty) return;
                if (this.currentContainer === this.containers[h]) return;
                o ? this._rearrange(e, o, null, !0) : this._rearrange(e, null, this.containers[h].element, !0), 
                this._trigger("change", e, this._uiHash()), this.containers[h]._trigger("change", e, this._uiHash(this)), 
                this.currentContainer = this.containers[h], this.options.placeholder.update(this.currentContainer, this.placeholder), 
                this.containers[h]._trigger("over", e, this._uiHash(this)), this.containers[h].containerCache.over = 1;
            }
        },
        _createHelper: function(e) {
            var t = this.options, n = f.isFunction(t.helper) ? f(t.helper.apply(this.element[0], [ e, this.currentItem ])) : "clone" === t.helper ? this.currentItem.clone() : this.currentItem;
            return n.parents("body").length || f("parent" !== t.appendTo ? t.appendTo : this.currentItem[0].parentNode)[0].appendChild(n[0]), 
            n[0] === this.currentItem[0] && (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            }), n[0].style.width && !t.forceHelperSize || n.width(this.currentItem.width()), 
            n[0].style.height && !t.forceHelperSize || n.height(this.currentItem.height()), 
            n;
        },
        _adjustOffsetFromHelper: function(e) {
            "string" == typeof e && (e = e.split(" ")), f.isArray(e) && (e = {
                left: +e[0],
                top: +e[1] || 0
            }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), 
            "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top);
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var e = this.offsetParent.offset();
            return "absolute" === this.cssPosition && this.scrollParent[0] !== document && f.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), 
            e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && f.ui.ie) && (e = {
                top: 0,
                left: 0
            }), {
                top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            };
        },
        _getRelativeOffset: function() {
            if ("relative" !== this.cssPosition) return {
                top: 0,
                left: 0
            };
            var e = this.currentItem.position();
            return {
                top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
            };
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            };
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            };
        },
        _setContainment: function() {
            var e, t, n, i = this.options;
            "parent" === i.containment && (i.containment = this.helper[0].parentNode), "document" !== i.containment && "window" !== i.containment || (this.containment = [ 0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, f("document" === i.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (f("document" === i.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top ]), 
            /^(document|window|parent)$/.test(i.containment) || (e = f(i.containment)[0], t = f(i.containment).offset(), 
            n = "hidden" !== f(e).css("overflow"), this.containment = [ t.left + (parseInt(f(e).css("borderLeftWidth"), 10) || 0) + (parseInt(f(e).css("paddingLeft"), 10) || 0) - this.margins.left, t.top + (parseInt(f(e).css("borderTopWidth"), 10) || 0) + (parseInt(f(e).css("paddingTop"), 10) || 0) - this.margins.top, t.left + (n ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(f(e).css("borderLeftWidth"), 10) || 0) - (parseInt(f(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, t.top + (n ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(f(e).css("borderTopWidth"), 10) || 0) - (parseInt(f(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top ]);
        },
        _convertPositionTo: function(e, t) {
            t = t || this.position;
            var n = "absolute" === e ? 1 : -1, i = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && f.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, o = /(html|body)/i.test(i[0].tagName);
            return {
                top: t.top + this.offset.relative.top * n + this.offset.parent.top * n - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : o ? 0 : i.scrollTop()) * n,
                left: t.left + this.offset.relative.left * n + this.offset.parent.left * n - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : o ? 0 : i.scrollLeft()) * n
            };
        },
        _generatePosition: function(e) {
            var t, n, i = this.options, o = e.pageX, r = e.pageY, s = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && f.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, a = /(html|body)/i.test(s[0].tagName);
            return "relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), 
            this.originalPosition && (this.containment && (e.pageX - this.offset.click.left < this.containment[0] && (o = this.containment[0] + this.offset.click.left), 
            e.pageY - this.offset.click.top < this.containment[1] && (r = this.containment[1] + this.offset.click.top), 
            e.pageX - this.offset.click.left > this.containment[2] && (o = this.containment[2] + this.offset.click.left), 
            e.pageY - this.offset.click.top > this.containment[3] && (r = this.containment[3] + this.offset.click.top)), 
            i.grid && (t = this.originalPageY + Math.round((r - this.originalPageY) / i.grid[1]) * i.grid[1], 
            r = this.containment ? t - this.offset.click.top >= this.containment[1] && t - this.offset.click.top <= this.containment[3] ? t : t - this.offset.click.top >= this.containment[1] ? t - i.grid[1] : t + i.grid[1] : t, 
            n = this.originalPageX + Math.round((o - this.originalPageX) / i.grid[0]) * i.grid[0], 
            o = this.containment ? n - this.offset.click.left >= this.containment[0] && n - this.offset.click.left <= this.containment[2] ? n : n - this.offset.click.left >= this.containment[0] ? n - i.grid[0] : n + i.grid[0] : n)), 
            {
                top: r - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : a ? 0 : s.scrollTop()),
                left: o - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : a ? 0 : s.scrollLeft())
            };
        },
        _rearrange: function(e, t, n, i) {
            n ? n[0].appendChild(this.placeholder[0]) : t.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? t.item[0] : t.item[0].nextSibling), 
            this.counter = this.counter ? ++this.counter : 1;
            var o = this.counter;
            this._delay(function() {
                o === this.counter && this.refreshPositions(!i);
            });
        },
        _clear: function(e, t) {
            this.reverting = !1;
            var n, i = [];
            if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), 
            this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                for (n in this._storedCSS) "auto" !== this._storedCSS[n] && "static" !== this._storedCSS[n] || (this._storedCSS[n] = "");
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
            } else this.currentItem.show();
            for (this.fromOutside && !t && i.push(function(e) {
                this._trigger("receive", e, this._uiHash(this.fromOutside));
            }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || t || i.push(function(e) {
                this._trigger("update", e, this._uiHash());
            }), this !== this.currentContainer && (t || (i.push(function(e) {
                this._trigger("remove", e, this._uiHash());
            }), i.push(function(t) {
                return function(e) {
                    t._trigger("receive", e, this._uiHash(this));
                };
            }.call(this, this.currentContainer)), i.push(function(t) {
                return function(e) {
                    t._trigger("update", e, this._uiHash(this));
                };
            }.call(this, this.currentContainer)))), n = this.containers.length - 1; 0 <= n; n--) t || i.push(function(t) {
                return function(e) {
                    t._trigger("deactivate", e, this._uiHash(this));
                };
            }.call(this, this.containers[n])), this.containers[n].containerCache.over && (i.push(function(t) {
                return function(e) {
                    t._trigger("out", e, this._uiHash(this));
                };
            }.call(this, this.containers[n])), this.containers[n].containerCache.over = 0);
            if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), 
            this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), 
            this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), 
            this.dragging = !1, this.cancelHelperRemoval) {
                if (!t) {
                    for (this._trigger("beforeStop", e, this._uiHash()), n = 0; n < i.length; n++) i[n].call(this, e);
                    this._trigger("stop", e, this._uiHash());
                }
                return this.fromOutside = !1;
            }
            if (t || this._trigger("beforeStop", e, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), 
            this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null, 
            !t) {
                for (n = 0; n < i.length; n++) i[n].call(this, e);
                this._trigger("stop", e, this._uiHash());
            }
            return !(this.fromOutside = !1);
        },
        _trigger: function() {
            !1 === f.Widget.prototype._trigger.apply(this, arguments) && this.cancel();
        },
        _uiHash: function(e) {
            var t = e || this;
            return {
                helper: t.helper,
                placeholder: t.placeholder || f([]),
                position: t.position,
                originalPosition: t.originalPosition,
                offset: t.positionAbs,
                item: t.currentItem,
                sender: e ? e.element : null
            };
        }
    });
}(jQuery);

var datagridFitlerMultiSelect, datagridGroupActionMultiSelect, datagridShiftGroupSelection, datagridSortable, datagridSortableTree, getEventDomPath, indexOf = [].indexOf || function(e) {
    for (var t = 0, n = this.length; t < n; t++) if (t in this && this[t] === e) return t;
    return -1;
};

if ($(document).on("click", "[data-datagrid-confirm]:not(.ajax)", function(e) {
    if (!confirm($(e.target).closest("a").attr("data-datagrid-confirm"))) return e.stopPropagation(), 
    e.preventDefault();
}), $.nette.ext("datagrid.confirm", {
    before: function(e, t) {
        var n;
        if (t.nette && (n = t.nette.el.data("datagrid-confirm"))) return confirm(n);
    }
}), $(document).on("change", "select[data-autosubmit-per-page]", function() {
    var e;
    return 0 === (e = $(this).parent().find("input[type=submit]")).length && (e = $(this).parent().find("button[type=submit]")), 
    e.click();
}).on("change", "select[data-autosubmit]", function() {
    return $(this).closest("form").first().submit();
}).on("change", "input[data-autosubmit][data-autosubmit-change]", function(e) {
    var t;
    return e.which || e.keyCode || 0, clearTimeout(window.datagrid_autosubmit_timer), 
    t = $(this), window.datagrid_autosubmit_timer = setTimeout(function() {
        return t.closest("form").first().submit();
    }, 200);
}).on("keyup", "input[data-autosubmit]", function(e) {
    var t, n;
    if (13 === (n = e.which || e.keyCode || 0) || !(9 <= n && n <= 40 || 112 <= n && n <= 123)) return clearTimeout(window.datagrid_autosubmit_timer), 
    t = $(this), window.datagrid_autosubmit_timer = setTimeout(function() {
        return t.closest("form").first().submit();
    }, 200);
}).on("keydown", ".datagrid-inline-edit input", function(e) {
    if (13 === (e.which || e.keyCode || 0)) return e.stopPropagation(), e.preventDefault(), 
    $(this).closest("tr").find('.col-action-inline-edit [name="inline_edit[submit]"]').click();
}), $(document).on("keydown", "input[data-datagrid-manualsubmit]", function(e) {
    if (13 === (e.which || e.keyCode || 0)) return e.stopPropagation(), e.preventDefault(), 
    $(this).closest("form").first().submit();
}), getEventDomPath = function(e) {
    var t, n;
    if (0 <= indexOf.call(e, n)) return e.path;
    for (n = [], t = e.target; t !== document.body && null !== t; ) n.push(t), t = t.parentNode;
    return n;
}, datagridShiftGroupSelection = function() {
    var b;
    return b = null, document.addEventListener("click", function(e) {
        var t, n, i, o, r, s, a, l, c, u, d, h, f, p, g, m, v;
        for (r = 0, u = (f = getEventDomPath(e)).length; r < u; r++) if (i = f[r], $(i).is(".col-checkbox") && b && e.shiftKey) {
            if (n = $(i).closest("tr"), t = (c = b.closest("tr")).closest("tbody").find("tr").toArray(), 
            n.index() > c.index() ? v = t.slice(c.index(), n.index()) : n.index() < c.index() && (v = t.slice(n.index() + 1, c.index())), 
            !v) return;
            for (a = 0, d = v.length; a < d; a++) m = v[a], (s = $(m).find(".col-checkbox input[type=checkbox]")[0]) && (s.checked = !0, 
            window.navigator.userAgent.indexOf("MSIE ") ? (o = document.createEvent("Event")).initEvent("change", !0, !0) : o = new Event("change", {
                bubbles: !0
            }), s.dispatchEvent(o));
        }
        for (g = [], l = 0, h = (p = getEventDomPath(e)).length; l < h; l++) i = p[l], $(i).is(".col-checkbox") ? g.push(b = $(i)) : g.push(void 0);
        return g;
    });
}, datagridShiftGroupSelection(), document.addEventListener("change", function(e) {
    var t, n, i, o, r, s, a, l, c, u, d;
    if ((o = e.target.getAttribute("data-check")) && (t = document.querySelectorAll("input[data-check-all-" + o + "]:checked"), 
    (u = document.querySelector(".datagrid-" + o + ' select[name="group_action[group_action]"]')) && (n = document.querySelector(".datagrid-" + o + " .datagrid-selected-rows-count"), 
    t.length ? (u.disabled = !1, d = document.querySelectorAll("input[data-check-all-" + o + "]").length, 
    n && (n.innerHTML = t.length + "/" + d)) : (u.disabled = !0, u.value = "", n && (n.innerHTML = ""))), 
    window.navigator.userAgent.indexOf("MSIE ") ? (i = document.createEvent("Event")).initEvent("change", !0, !0) : i = new Event("change", {
        bubbles: !0
    }), u && u.dispatchEvent(i)), o = e.target.getAttribute("data-check-all")) {
        for (c = [], r = 0, l = (a = document.querySelectorAll("input[type=checkbox][data-check-all-" + o + "]")).length; r < l; r++) (s = a[r]).checked = e.target.checked, 
        window.navigator.userAgent.indexOf("MSIE ") ? (i = document.createEvent("Event")).initEvent("change", !0, !0) : i = new Event("change", {
            bubbles: !0
        }), c.push(s.dispatchEvent(i));
        return c;
    }
}), window.datagridSerializeUrl = function(e, t) {
    var n = [];
    for (var i in e) if (e.hasOwnProperty(i)) {
        var o = t ? t + "[" + i + "]" : i, r = e[i];
        if (null !== r && "" !== r) if ("object" == typeof r) {
            var s = window.datagridSerializeUrl(r, o);
            s && n.push(s);
        } else n.push(encodeURIComponent(o) + "=" + encodeURIComponent(r));
    }
    return n.join("&");
}, datagridSortable = function() {
    if (void 0 !== $.fn.sortable) return $(".datagrid [data-sortable]").sortable({
        handle: ".handle-sort",
        items: "tr",
        axis: "y",
        update: function(e, t) {
            var n, i, o, r, s, a, l;
            return o = (a = t.item.closest("tr[data-id]")).data("id"), r = s = null, a.prev().length && (s = a.prev().data("id")), 
            a.next().length && (r = a.next().data("id")), l = $(this).data("sortable-url"), 
            (i = {})[((n = a.closest(".datagrid").find("tbody").attr("data-sortable-parent-path")) + "-item_id").replace(/^-/, "")] = o, 
            i[(n + "-prev_id").replace(/^-/, "")] = s, i[(n + "-next_id").replace(/^-/, "")] = r, 
            $.nette.ajax({
                type: "GET",
                url: l,
                data: i,
                error: function(e, t, n) {
                    return alert(e.statusText);
                }
            });
        },
        helper: function(e, t) {
            return t.children().each(function() {
                return $(this).width($(this).width());
            }), t;
        }
    });
}, $(function() {
    return datagridSortable();
}), void 0 === datagridSortableTree && (datagridSortableTree = function() {
    if (void 0 !== $(".datagrid-tree-item-children").sortable) return $(".datagrid-tree-item-children").sortable({
        handle: ".handle-sort",
        items: ".datagrid-tree-item:not(.datagrid-tree-header)",
        toleranceElement: "> .datagrid-tree-item-content",
        connectWith: ".datagrid-tree-item-children",
        update: function(e, t) {
            var n, i, o, r, s, a, l, c, u;
            if ($(".toggle-tree-to-delete").remove(), o = (c = t.item.closest(".datagrid-tree-item[data-id]")).data("id"), 
            a = r = l = null, c.prev().length && (l = c.prev().data("id")), c.next().length && (r = c.next().data("id")), 
            (s = c.parent().closest(".datagrid-tree-item")).length && (s.find(".datagrid-tree-item-children").first().css({
                display: "block"
            }), s.addClass("has-children"), a = s.data("id")), u = $(this).data("sortable-url")) return s.find("[data-toggle-tree]").first().removeClass("hidden"), 
            (i = {})[((n = c.closest(".datagrid-tree").attr("data-sortable-parent-path")) + "-item_id").replace(/^-/, "")] = o, 
            i[(n + "-prev_id").replace(/^-/, "")] = l, i[(n + "-next_id").replace(/^-/, "")] = r, 
            i[(n + "-parent_id").replace(/^-/, "")] = a, $.nette.ajax({
                type: "GET",
                url: u,
                data: i,
                error: function(e, t, n) {
                    if ("abort" !== n) return alert(e.statusText);
                }
            });
        },
        stop: function(e, t) {
            return $(".toggle-tree-to-delete").removeClass("toggle-tree-to-delete");
        },
        start: function(e, t) {
            var n;
            if ((n = t.item.parent().closest(".datagrid-tree-item")).length && 2 === n.find(".datagrid-tree-item").length) return n.find("[data-toggle-tree]").addClass("toggle-tree-to-delete");
        }
    });
}), $(function() {
    return datagridSortableTree();
}), $.nette.ext("datagrid.happy", {
    success: function() {
        var e, t, n, i, o, r, s, a, l, c, u;
        for (window.happy && window.happy.reset(), u = [], r = 0, l = (o = $(".datagrid")).length; r < l; r++) {
            for (t = "", a = 0, c = (n = o[r].classList).length; a < c; a++) t = t + "." + n[a];
            1 === (e = document.querySelectorAll(t + " input[data-check]:checked")).length && "toggle-all" === e[0].getAttribute("name") && (s = document.querySelector(t + " input[name=toggle-all]")) ? (s.checked = !1, 
            window.navigator.userAgent.indexOf("MSIE ") ? (i = document.createEvent("Event")).initEvent("change", !0, !0) : i = new Event("change", {
                bubbles: !0
            }), u.push(s.dispatchEvent(i))) : u.push(void 0);
        }
        return u;
    }
}), $.nette.ext("datagrid.sortable", {
    success: function() {
        return datagridSortable();
    }
}), $.nette.ext("datagrid.forms", {
    success: function() {
        return $(".datagrid").find("form").each(function() {
            return window.Nette.initForm(this);
        });
    }
}), $.nette.ext("datagrid.url", {
    success: function(e) {
        var t, n, i, o;
        if (e._datagrid_url && window.history.pushState && (t = window.location.protocol + "//" + window.location.host, 
        n = window.location.pathname, o = (i = window.datagridSerializeUrl(e.state).replace(/&+$/gm, "")) ? t + n + "?" + i.replace(/\&*$/, "") : t + n, 
        o += window.location.hash, window.location.href !== o)) return window.history.pushState({
            path: o
        }, "", o);
    }
}), $.nette.ext("datagrid.sort", {
    success: function(e) {
        var t, n, i, o;
        if (e._datagrid_sort) {
            for (n in o = [], i = e._datagrid_sort) t = i[n], o.push($("#datagrid-sort-" + n).attr("href", t));
            return o;
        }
    }
}), $.nette.ext("datargid.item_detail", {
    before: function(e, t) {
        var n, i;
        if (t.nette && t.nette.el.attr("data-toggle-detail")) return n = t.nette.el.attr("data-toggle-detail"), 
        (i = $(".item-detail-" + n)).hasClass("loaded") ? i.find(".item-detail-content").length ? (i.hasClass("toggled") ? i.find(".item-detail-content").slideToggle("fast", function() {
            return i.toggleClass("toggled");
        }) : (i.toggleClass("toggled"), i.find(".item-detail-content").slideToggle("fast")), 
        !1) : (i.removeClass("toggled"), !0) : i.addClass("loaded");
    },
    success: function(e) {
        var t, n;
        if (e._datagrid_toggle_detail) return t = e._datagrid_toggle_detail, (n = $(".item-detail-" + t)).toggleClass("toggled"), 
        n.find(".item-detail-content").slideToggle("fast");
    }
}), $.nette.ext("datagrid.tree", {
    before: function(e, t) {
        var n;
        return !(t.nette && t.nette.el.attr("data-toggle-tree") && (t.nette.el.toggleClass("toggle-rotate"), 
        (n = t.nette.el.closest(".datagrid-tree-item").find(".datagrid-tree-item-children").first()).hasClass("loaded"))) || (n.slideToggle("fast"), 
        !1);
    },
    success: function(e) {
        var t, n, i, o, r, s, a;
        if (e._datagrid_tree) {
            for (o in i = e._datagrid_tree, (t = $('.datagrid-tree-item[data-id="' + i + '"]').find(".datagrid-tree-item-children").first()).addClass("loaded"), 
            r = e.snippets) s = r[o], n = $(s), (a = $('<div class="datagrid-tree-item" id="' + o + '">')).attr("data-id", n.attr("data-id")), 
            a.append(n), n.data("has-children") && a.addClass("has-children"), t.append(a);
            t.addClass("loaded"), t.slideToggle("fast"), $.nette.load();
        }
        return datagridSortableTree();
    }
}), $(document).on("click", "[data-datagrid-editable-url]", function(e) {
    var t, n, i, o, r, s, a, l, c, u;
    if (o = $(this), "a" !== e.target.tagName.toLowerCase() && !o.hasClass("datagrid-inline-edit") && !o.hasClass("editing")) {
        for (t in o.addClass("editing"), r = o.html().trim().replace("<br>", "\n"), u = o.data("datagrid-editable-value") ? o.data("datagrid-editable-value") : r, 
        o.data("originalValue", r), o.data("valueToEdit", u), "textarea" === o.data("datagrid-editable-type") ? (l = $("<textarea>" + u + "</textarea>"), 
        a = parseInt(o.css("padding").replace(/[^-\d\.]/g, ""), 10), s = (o.outerHeight() - 2 * a) / Math.round(parseFloat(o.css("line-height"))), 
        l.attr("rows", Math.round(s))) : "select" === o.data("datagrid-editable-type") ? (l = $(o.data("datagrid-editable-element"))).find("option").each(function() {
            if ($(this).text() === u) return l.find("option[value='" + u + "']").prop("selected", !0);
        }) : (l = $('<input type="' + o.data("datagrid-editable-type") + '">')).val(u), 
        i = o.data("datagrid-editable-attrs")) n = i[t], l.attr(t, n);
        return o.removeClass("edited"), o.html(l), c = function(t, e) {
            var n;
            return (n = e.val()) !== t.data("valueToEdit") ? $.nette.ajax({
                url: t.data("datagrid-editable-url"),
                data: {
                    value: n
                },
                method: "POST",
                success: function(e) {
                    return "select" === t.data("datagrid-editable-type") ? t.html(l.find("option[value='" + n + "']").html()) : (e._datagrid_editable_new_value && (n = e._datagrid_editable_new_value), 
                    t.html(n)), t.addClass("edited");
                },
                error: function() {
                    return t.html(t.data("originalValue")), t.addClass("edited-error");
                }
            }) : t.html(t.data("originalValue")), setTimeout(function() {
                return t.removeClass("editing");
            }, 1200);
        }, o.find("input,textarea,select").focus().on("blur", function() {
            return c(o, $(this));
        }).on("keydown", function(e) {
            return "textarea" !== o.data("datagrid-editable-type") && 13 === e.which ? (e.stopPropagation(), 
            e.preventDefault(), c(o, $(this))) : 27 === e.which ? (e.stopPropagation(), e.preventDefault(), 
            o.removeClass("editing"), o.html(o.data("originalValue"))) : void 0;
        }), o.find("select").on("change", function() {
            return c(o, $(this));
        });
    }
}), $.nette.ext("datagrid.after_inline_edit", {
    success: function(e) {
        var t;
        return t = $(".datagrid-" + e._datagrid_name), e._datagrid_inline_edited ? (t.find("tr[data-id=" + e._datagrid_inline_edited + "] > td").addClass("edited"), 
        t.find(".datagrid-inline-edit-trigger").removeClass("hidden")) : e._datagrid_inline_edit_cancel ? t.find(".datagrid-inline-edit-trigger").removeClass("hidden") : void 0;
    }
}), $(document).on("click", "[data-datagrid-toggle-inline-add]", function(e) {
    var t;
    return e.stopPropagation(), e.preventDefault(), (t = $(this).closest(".datagrid").find(".datagrid-row-inline-add")).hasClass("datagrid-row-inline-add-hidden") && t.removeClass("datagrid-row-inline-add-hidden"), 
    t.find("input:not([readonly]),textarea:not([readonly])").first().focus();
}), $(document).on("mouseup", "[data-datagrid-cancel-inline-add]", function(e) {
    if (1 === (e.which || e.keyCode || 0)) return e.stopPropagation(), e.preventDefault(), 
    $(".datagrid-row-inline-add").addClass("datagrid-row-inline-add-hidden");
}), $.nette.ext("datagrid-toggle-inline-add", {
    success: function(e) {
        if (e._datagrid_inline_added) return $(".datagrid-row-inline-add").find("textarea").html(""), 
        $(".datagrid-row-inline-add").find("input[type!=submit]").val(""), $(".datagrid-row-inline-add").addClass("datagrid-row-inline-add-hidden");
    }
}), datagridFitlerMultiSelect = function() {
    var e;
    if (e = $(".selectpicker").first(), $.fn.selectpicker) return $.fn.selectpicker.defaults = {
        countSelectedText: e.data("i18n-selected"),
        iconBase: "",
        tickIcon: e.data("selected-icon-check")
    };
}, $(function() {
    return datagridFitlerMultiSelect();
}), datagridGroupActionMultiSelect = function() {
    if ($.fn.selectpicker) return $("[data-datagrid-multiselect-id]").each(function() {
        var t;
        if ($(this).hasClass("selectpicker")) return $(this).removeAttr("id"), t = $(this).data("datagrid-multiselect-id"), 
        $(this).on("loaded.bs.select", function(e) {
            return $(this).parent().attr("style", "display:none;"), $(this).parent().find(".hidden").removeClass("hidden").addClass("btn-default");
        }), $(this).on("rendered.bs.select", function(e) {
            return $(this).parent().attr("id", t);
        });
    });
}, $(function() {
    return datagridGroupActionMultiSelect();
}), $.nette.ext("datagrid.fitlerMultiSelect", {
    success: function() {
        if (datagridFitlerMultiSelect(), $.fn.selectpicker) return $(".selectpicker").selectpicker({
            iconBase: "fa"
        });
    }
}), $.nette.ext("datagrid.groupActionMultiSelect", {
    success: function() {
        return datagridGroupActionMultiSelect();
    }
}), $.nette.ext("datagrid.inline-editing", {
    success: function(e) {
        if (e._datagrid_inline_editing) return $(".datagrid-" + e._datagrid_name).find(".datagrid-inline-edit-trigger").addClass("hidden");
    }
}), $.nette.ext("datagrid.redraw-item", {
    success: function(e) {
        if (e._datagrid_redraw_item_class) return $("tr[data-id=" + e._datagrid_redraw_item_id + "]").attr("class", e._datagrid_redraw_item_class);
    }
}), $.nette.ext("datagrid.reset-filter-by-column", {
    success: function(t) {
        var e, n, i, o, r, s;
        if (t._datagrid_name && ((e = $(".datagrid-" + t._datagrid_name)).find("[data-datagrid-reset-filter-by-column]").addClass("hidden"), 
        t.non_empty_filters && t.non_empty_filters.length)) {
            for (i = 0, r = (s = t.non_empty_filters).length; i < r; i++) o = s[i], e.find("[data-datagrid-reset-filter-by-column=" + o + "]").removeClass("hidden");
            return n = e.find(".reset-filter").attr("href"), e.find("[data-datagrid-reset-filter-by-column]").each(function() {
                var e;
                return o = $(this).attr("data-datagrid-reset-filter-by-column"), e = n.replace("do=" + t._datagrid_name + "-resetFilter", "do=" + t._datagrid_name + "-resetColumnFilter"), 
                e += "&" + t._datagrid_name + "-key=" + o, $(this).attr("href", e);
            });
        }
    }
}), $(function() {
    if ($(".datagrid").length) return $.nette.ajax({
        type: "GET",
        url: $(".datagrid").first().data("refresh-state")
    });
}), $.nette.ext("ublaboo-spinners", {
    before: function(e, t) {
        var n, i, o;
        if (t.nette) {
            if (n = t.nette.el, o = $('<div class="ublaboo-spinner ublaboo-spinner-small"><i></i><i></i><i></i><i></i></div>'), 
            n.is('.datagrid [name="group_action[submit]"]')) return n.after(o);
            if (n.is(".datagrid a") && n.data("toggle-detail")) {
                if (i = t.nette.el.attr("data-toggle-detail"), !$(".item-detail-" + i).hasClass("loaded")) return n.addClass("ublaboo-spinner-icon");
            } else {
                if (n.is(".datagrid .col-pagination a")) return n.closest(".row-grid-bottom").find(".col-per-page").prepend(o);
                if (n.is(".datagrid .datagrid-per-page-submit")) return n.closest(".row-grid-bottom").find(".col-per-page").prepend(o);
                if (n.is(".datagrid .reset-filter")) return n.closest(".row-grid-bottom").find(".col-per-page").prepend(o);
            }
        }
    },
    complete: function() {
        return $(".ublaboo-spinner").remove(), $(".ublaboo-spinner-icon").removeClass("ublaboo-spinner-icon");
    }
}), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");

!function() {
    "use strict";
    var e = jQuery.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1 || 3 < e[0]) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4");
}(), function(i) {
    "use strict";
    i.fn.emulateTransitionEnd = function(e) {
        var t = !1, n = this;
        i(this).one("bsTransitionEnd", function() {
            t = !0;
        });
        return setTimeout(function() {
            t || i(n).trigger(i.support.transition.end);
        }, e), this;
    }, i(function() {
        i.support.transition = function() {
            var e = document.createElement("bootstrap"), t = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
            for (var n in t) if (void 0 !== e.style[n]) return {
                end: t[n]
            };
            return !1;
        }(), i.support.transition && (i.event.special.bsTransitionEnd = {
            bindType: i.support.transition.end,
            delegateType: i.support.transition.end,
            handle: function(e) {
                if (i(e.target).is(this)) return e.handleObj.handler.apply(this, arguments);
            }
        });
    });
}(jQuery), function(r) {
    "use strict";
    function s(e) {
        r(e).on("click", t, this.close);
    }
    var t = '[data-dismiss="alert"]';
    s.VERSION = "3.4.1", s.TRANSITION_DURATION = 150, s.prototype.close = function(e) {
        var t = r(this), n = t.attr("data-target");
        n = "#" === (n = n || (n = t.attr("href")) && n.replace(/.*(?=#[^\s]*$)/, "")) ? [] : n;
        var i = r(document).find(n);
        function o() {
            i.detach().trigger("closed.bs.alert").remove();
        }
        e && e.preventDefault(), i.length || (i = t.closest(".alert")), i.trigger(e = r.Event("close.bs.alert")), 
        e.isDefaultPrevented() || (i.removeClass("in"), r.support.transition && i.hasClass("fade") ? i.one("bsTransitionEnd", o).emulateTransitionEnd(s.TRANSITION_DURATION) : o());
    };
    var e = r.fn.alert;
    r.fn.alert = function(n) {
        return this.each(function() {
            var e = r(this), t = e.data("bs.alert");
            t || e.data("bs.alert", t = new s(this)), "string" == typeof n && t[n].call(e);
        });
    }, r.fn.alert.Constructor = s, r.fn.alert.noConflict = function() {
        return r.fn.alert = e, this;
    }, r(document).on("click.bs.alert.data-api", t, s.prototype.close);
}(jQuery), function(r) {
    "use strict";
    var o = function(e, t) {
        this.$element = r(e), this.options = r.extend({}, o.DEFAULTS, t), this.isLoading = !1;
    };
    function n(i) {
        return this.each(function() {
            var e = r(this), t = e.data("bs.button"), n = "object" == typeof i && i;
            t || e.data("bs.button", t = new o(this, n)), "toggle" == i ? t.toggle() : i && t.setState(i);
        });
    }
    o.VERSION = "3.4.1", o.DEFAULTS = {
        loadingText: "loading..."
    }, o.prototype.setState = function(e) {
        var t = "disabled", n = this.$element, i = n.is("input") ? "val" : "html", o = n.data();
        e += "Text", null == o.resetText && n.data("resetText", n[i]()), setTimeout(r.proxy(function() {
            n[i](null == o[e] ? this.options[e] : o[e]), "loadingText" == e ? (this.isLoading = !0, 
            n.addClass(t).attr(t, t).prop(t, !0)) : this.isLoading && (this.isLoading = !1, 
            n.removeClass(t).removeAttr(t).prop(t, !1));
        }, this), 0);
    }, o.prototype.toggle = function() {
        var e = !0, t = this.$element.closest('[data-toggle="buttons"]');
        if (t.length) {
            var n = this.$element.find("input");
            "radio" == n.prop("type") ? (n.prop("checked") && (e = !1), t.find(".active").removeClass("active"), 
            this.$element.addClass("active")) : "checkbox" == n.prop("type") && (n.prop("checked") !== this.$element.hasClass("active") && (e = !1), 
            this.$element.toggleClass("active")), n.prop("checked", this.$element.hasClass("active")), 
            e && n.trigger("change");
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active");
    };
    var e = r.fn.button;
    r.fn.button = n, r.fn.button.Constructor = o, r.fn.button.noConflict = function() {
        return r.fn.button = e, this;
    }, r(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(e) {
        var t = r(e.target).closest(".btn");
        n.call(t, "toggle"), r(e.target).is('input[type="radio"], input[type="checkbox"]') || (e.preventDefault(), 
        t.is("input,button") ? t.trigger("focus") : t.find("input:visible,button:visible").first().trigger("focus"));
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) {
        r(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type));
    });
}(jQuery), function(d) {
    "use strict";
    function h(e, t) {
        this.$element = d(e), this.$indicators = this.$element.find(".carousel-indicators"), 
        this.options = t, this.paused = null, this.sliding = null, this.interval = null, 
        this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", d.proxy(this.keydown, this)), 
        "hover" != this.options.pause || "ontouchstart" in document.documentElement || this.$element.on("mouseenter.bs.carousel", d.proxy(this.pause, this)).on("mouseleave.bs.carousel", d.proxy(this.cycle, this));
    }
    function a(o) {
        return this.each(function() {
            var e = d(this), t = e.data("bs.carousel"), n = d.extend({}, h.DEFAULTS, e.data(), "object" == typeof o && o), i = "string" == typeof o ? o : n.slide;
            t || e.data("bs.carousel", t = new h(this, n)), "number" == typeof o ? t.to(o) : i ? t[i]() : n.interval && t.pause().cycle();
        });
    }
    h.VERSION = "3.4.1", h.TRANSITION_DURATION = 600, h.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, h.prototype.keydown = function(e) {
        if (!/input|textarea/i.test(e.target.tagName)) {
            switch (e.which) {
              case 37:
                this.prev();
                break;

              case 39:
                this.next();
                break;

              default:
                return;
            }
            e.preventDefault();
        }
    }, h.prototype.cycle = function(e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(d.proxy(this.next, this), this.options.interval)), 
        this;
    }, h.prototype.getItemIndex = function(e) {
        return this.$items = e.parent().children(".item"), this.$items.index(e || this.$active);
    }, h.prototype.getItemForDirection = function(e, t) {
        var n = this.getItemIndex(t);
        if (("prev" == e && 0 === n || "next" == e && n == this.$items.length - 1) && !this.options.wrap) return t;
        var i = (n + ("prev" == e ? -1 : 1)) % this.$items.length;
        return this.$items.eq(i);
    }, h.prototype.to = function(e) {
        var t = this, n = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (!(e > this.$items.length - 1 || e < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function() {
            t.to(e);
        }) : n == e ? this.pause().cycle() : this.slide(n < e ? "next" : "prev", this.$items.eq(e));
    }, h.prototype.pause = function(e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && d.support.transition && (this.$element.trigger(d.support.transition.end), 
        this.cycle(!0)), this.interval = clearInterval(this.interval), this;
    }, h.prototype.next = function() {
        if (!this.sliding) return this.slide("next");
    }, h.prototype.prev = function() {
        if (!this.sliding) return this.slide("prev");
    }, h.prototype.slide = function(e, t) {
        var n = this.$element.find(".item.active"), i = t || this.getItemForDirection(e, n), o = this.interval, r = "next" == e ? "left" : "right", s = this;
        if (i.hasClass("active")) return this.sliding = !1;
        var a = i[0], l = d.Event("slide.bs.carousel", {
            relatedTarget: a,
            direction: r
        });
        if (this.$element.trigger(l), !l.isDefaultPrevented()) {
            if (this.sliding = !0, o && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var c = d(this.$indicators.children()[this.getItemIndex(i)]);
                c && c.addClass("active");
            }
            var u = d.Event("slid.bs.carousel", {
                relatedTarget: a,
                direction: r
            });
            return d.support.transition && this.$element.hasClass("slide") ? (i.addClass(e), 
            "object" == typeof i && i.length && i[0].offsetWidth, n.addClass(r), i.addClass(r), 
            n.one("bsTransitionEnd", function() {
                i.removeClass([ e, r ].join(" ")).addClass("active"), n.removeClass([ "active", r ].join(" ")), 
                s.sliding = !1, setTimeout(function() {
                    s.$element.trigger(u);
                }, 0);
            }).emulateTransitionEnd(h.TRANSITION_DURATION)) : (n.removeClass("active"), i.addClass("active"), 
            this.sliding = !1, this.$element.trigger(u)), o && this.cycle(), this;
        }
    };
    var e = d.fn.carousel;
    d.fn.carousel = a, d.fn.carousel.Constructor = h, d.fn.carousel.noConflict = function() {
        return d.fn.carousel = e, this;
    };
    function t(e) {
        var t = d(this), n = t.attr("href");
        n = n && n.replace(/.*(?=#[^\s]+$)/, "");
        var i = t.attr("data-target") || n, o = d(document).find(i);
        if (o.hasClass("carousel")) {
            var r = d.extend({}, o.data(), t.data()), s = t.attr("data-slide-to");
            s && (r.interval = !1), a.call(o, r), s && o.data("bs.carousel").to(s), e.preventDefault();
        }
    }
    d(document).on("click.bs.carousel.data-api", "[data-slide]", t).on("click.bs.carousel.data-api", "[data-slide-to]", t), 
    d(window).on("load", function() {
        d('[data-ride="carousel"]').each(function() {
            var e = d(this);
            a.call(e, e.data());
        });
    });
}(jQuery), function(s) {
    "use strict";
    var a = function(e, t) {
        this.$element = s(e), this.options = s.extend({}, a.DEFAULTS, t), this.$trigger = s('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'), 
        this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), 
        this.options.toggle && this.toggle();
    };
    function o(e) {
        var t, n = e.attr("data-target") || (t = e.attr("href")) && t.replace(/.*(?=#[^\s]+$)/, "");
        return s(document).find(n);
    }
    function l(i) {
        return this.each(function() {
            var e = s(this), t = e.data("bs.collapse"), n = s.extend({}, a.DEFAULTS, e.data(), "object" == typeof i && i);
            !t && n.toggle && /show|hide/.test(i) && (n.toggle = !1), t || e.data("bs.collapse", t = new a(this, n)), 
            "string" == typeof i && t[i]();
        });
    }
    a.VERSION = "3.4.1", a.TRANSITION_DURATION = 350, a.DEFAULTS = {
        toggle: !0
    }, a.prototype.dimension = function() {
        return this.$element.hasClass("width") ? "width" : "height";
    }, a.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e, t = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(t && t.length && (e = t.data("bs.collapse")) && e.transitioning)) {
                var n = s.Event("show.bs.collapse");
                if (this.$element.trigger(n), !n.isDefaultPrevented()) {
                    t && t.length && (l.call(t, "hide"), e || t.data("bs.collapse", null));
                    var i = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[i](0).attr("aria-expanded", !0), 
                    this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var o = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[i](""), this.transitioning = 0, 
                        this.$element.trigger("shown.bs.collapse");
                    };
                    if (!s.support.transition) return o.call(this);
                    var r = s.camelCase([ "scroll", i ].join("-"));
                    this.$element.one("bsTransitionEnd", s.proxy(o, this)).emulateTransitionEnd(a.TRANSITION_DURATION)[i](this.$element[0][r]);
                }
            }
        }
    }, a.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = s.Event("hide.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var t = this.dimension();
                this.$element[t](this.$element[t]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), 
                this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var n = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
                };
                if (!s.support.transition) return n.call(this);
                this.$element[t](0).one("bsTransitionEnd", s.proxy(n, this)).emulateTransitionEnd(a.TRANSITION_DURATION);
            }
        }
    }, a.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
    }, a.prototype.getParent = function() {
        return s(document).find(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(s.proxy(function(e, t) {
            var n = s(t);
            this.addAriaAndCollapsedClass(o(n), n);
        }, this)).end();
    }, a.prototype.addAriaAndCollapsedClass = function(e, t) {
        var n = e.hasClass("in");
        e.attr("aria-expanded", n), t.toggleClass("collapsed", !n).attr("aria-expanded", n);
    };
    var e = s.fn.collapse;
    s.fn.collapse = l, s.fn.collapse.Constructor = a, s.fn.collapse.noConflict = function() {
        return s.fn.collapse = e, this;
    }, s(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(e) {
        var t = s(this);
        t.attr("data-target") || e.preventDefault();
        var n = o(t), i = n.data("bs.collapse") ? "toggle" : t.data();
        l.call(n, i);
    });
}(jQuery), function(s) {
    "use strict";
    function i(e) {
        s(e).on("click.bs.dropdown", this.toggle);
    }
    var a = '[data-toggle="dropdown"]';
    function l(e) {
        var t = e.attr("data-target"), n = "#" !== (t = t || (t = e.attr("href")) && /#[A-Za-z]/.test(t) && t.replace(/.*(?=#[^\s]*$)/, "")) ? s(document).find(t) : null;
        return n && n.length ? n : e.parent();
    }
    function r(i) {
        i && 3 === i.which || (s(".dropdown-backdrop").remove(), s(a).each(function() {
            var e = s(this), t = l(e), n = {
                relatedTarget: this
            };
            t.hasClass("open") && (i && "click" == i.type && /input|textarea/i.test(i.target.tagName) && s.contains(t[0], i.target) || (t.trigger(i = s.Event("hide.bs.dropdown", n)), 
            i.isDefaultPrevented() || (e.attr("aria-expanded", "false"), t.removeClass("open").trigger(s.Event("hidden.bs.dropdown", n)))));
        }));
    }
    i.VERSION = "3.4.1", i.prototype.toggle = function(e) {
        var t = s(this);
        if (!t.is(".disabled, :disabled")) {
            var n = l(t), i = n.hasClass("open");
            if (r(), !i) {
                "ontouchstart" in document.documentElement && !n.closest(".navbar-nav").length && s(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(s(this)).on("click", r);
                var o = {
                    relatedTarget: this
                };
                if (n.trigger(e = s.Event("show.bs.dropdown", o)), e.isDefaultPrevented()) return;
                t.trigger("focus").attr("aria-expanded", "true"), n.toggleClass("open").trigger(s.Event("shown.bs.dropdown", o));
            }
            return !1;
        }
    }, i.prototype.keydown = function(e) {
        if (/(38|40|27|32)/.test(e.which) && !/input|textarea/i.test(e.target.tagName)) {
            var t = s(this);
            if (e.preventDefault(), e.stopPropagation(), !t.is(".disabled, :disabled")) {
                var n = l(t), i = n.hasClass("open");
                if (!i && 27 != e.which || i && 27 == e.which) return 27 == e.which && n.find(a).trigger("focus"), 
                t.trigger("click");
                var o = n.find(".dropdown-menu li:not(.disabled):visible a");
                if (o.length) {
                    var r = o.index(e.target);
                    38 == e.which && 0 < r && r--, 40 == e.which && r < o.length - 1 && r++, ~r || (r = 0), 
                    o.eq(r).trigger("focus");
                }
            }
        }
    };
    var e = s.fn.dropdown;
    s.fn.dropdown = function(n) {
        return this.each(function() {
            var e = s(this), t = e.data("bs.dropdown");
            t || e.data("bs.dropdown", t = new i(this)), "string" == typeof n && t[n].call(e);
        });
    }, s.fn.dropdown.Constructor = i, s.fn.dropdown.noConflict = function() {
        return s.fn.dropdown = e, this;
    }, s(document).on("click.bs.dropdown.data-api", r).on("click.bs.dropdown.data-api", ".dropdown form", function(e) {
        e.stopPropagation();
    }).on("click.bs.dropdown.data-api", a, i.prototype.toggle).on("keydown.bs.dropdown.data-api", a, i.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", i.prototype.keydown);
}(jQuery), function(s) {
    "use strict";
    function r(e, t) {
        this.options = t, this.$body = s(document.body), this.$element = s(e), this.$dialog = this.$element.find(".modal-dialog"), 
        this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, 
        this.ignoreBackdropClick = !1, this.fixedContent = ".navbar-fixed-top, .navbar-fixed-bottom", 
        this.options.remote && this.$element.find(".modal-content").load(this.options.remote, s.proxy(function() {
            this.$element.trigger("loaded.bs.modal");
        }, this));
    }
    function a(i, o) {
        return this.each(function() {
            var e = s(this), t = e.data("bs.modal"), n = s.extend({}, r.DEFAULTS, e.data(), "object" == typeof i && i);
            t || e.data("bs.modal", t = new r(this, n)), "string" == typeof i ? t[i](o) : n.show && t.show(o);
        });
    }
    r.VERSION = "3.4.1", r.TRANSITION_DURATION = 300, r.BACKDROP_TRANSITION_DURATION = 150, 
    r.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, r.prototype.toggle = function(e) {
        return this.isShown ? this.hide() : this.show(e);
    }, r.prototype.show = function(n) {
        var i = this, e = s.Event("show.bs.modal", {
            relatedTarget: n
        });
        this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, 
        this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), 
        this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', s.proxy(this.hide, this)), 
        this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            i.$element.one("mouseup.dismiss.bs.modal", function(e) {
                s(e.target).is(i.$element) && (i.ignoreBackdropClick = !0);
            });
        }), this.backdrop(function() {
            var e = s.support.transition && i.$element.hasClass("fade");
            i.$element.parent().length || i.$element.appendTo(i.$body), i.$element.show().scrollTop(0), 
            i.adjustDialog(), e && i.$element[0].offsetWidth, i.$element.addClass("in"), i.enforceFocus();
            var t = s.Event("shown.bs.modal", {
                relatedTarget: n
            });
            e ? i.$dialog.one("bsTransitionEnd", function() {
                i.$element.trigger("focus").trigger(t);
            }).emulateTransitionEnd(r.TRANSITION_DURATION) : i.$element.trigger("focus").trigger(t);
        }));
    }, r.prototype.hide = function(e) {
        e && e.preventDefault(), e = s.Event("hide.bs.modal"), this.$element.trigger(e), 
        this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), 
        s(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), 
        this.$dialog.off("mousedown.dismiss.bs.modal"), s.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", s.proxy(this.hideModal, this)).emulateTransitionEnd(r.TRANSITION_DURATION) : this.hideModal());
    }, r.prototype.enforceFocus = function() {
        s(document).off("focusin.bs.modal").on("focusin.bs.modal", s.proxy(function(e) {
            document === e.target || this.$element[0] === e.target || this.$element.has(e.target).length || this.$element.trigger("focus");
        }, this));
    }, r.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", s.proxy(function(e) {
            27 == e.which && this.hide();
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal");
    }, r.prototype.resize = function() {
        this.isShown ? s(window).on("resize.bs.modal", s.proxy(this.handleUpdate, this)) : s(window).off("resize.bs.modal");
    }, r.prototype.hideModal = function() {
        var e = this;
        this.$element.hide(), this.backdrop(function() {
            e.$body.removeClass("modal-open"), e.resetAdjustments(), e.resetScrollbar(), e.$element.trigger("hidden.bs.modal");
        });
    }, r.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null;
    }, r.prototype.backdrop = function(e) {
        var t = this, n = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var i = s.support.transition && n;
            if (this.$backdrop = s(document.createElement("div")).addClass("modal-backdrop " + n).appendTo(this.$body), 
            this.$element.on("click.dismiss.bs.modal", s.proxy(function(e) {
                this.ignoreBackdropClick ? this.ignoreBackdropClick = !1 : e.target === e.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide());
            }, this)), i && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
            i ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(r.BACKDROP_TRANSITION_DURATION) : e();
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var o = function() {
                t.removeBackdrop(), e && e();
            };
            s.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", o).emulateTransitionEnd(r.BACKDROP_TRANSITION_DURATION) : o();
        } else e && e();
    }, r.prototype.handleUpdate = function() {
        this.adjustDialog();
    }, r.prototype.adjustDialog = function() {
        var e = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && e ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !e ? this.scrollbarWidth : ""
        });
    }, r.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        });
    }, r.prototype.checkScrollbar = function() {
        var e = window.innerWidth;
        if (!e) {
            var t = document.documentElement.getBoundingClientRect();
            e = t.right - Math.abs(t.left);
        }
        this.bodyIsOverflowing = document.body.clientWidth < e, this.scrollbarWidth = this.measureScrollbar();
    }, r.prototype.setScrollbar = function() {
        var e = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "";
        var o = this.scrollbarWidth;
        this.bodyIsOverflowing && (this.$body.css("padding-right", e + o), s(this.fixedContent).each(function(e, t) {
            var n = t.style.paddingRight, i = s(t).css("padding-right");
            s(t).data("padding-right", n).css("padding-right", parseFloat(i) + o + "px");
        }));
    }, r.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad), s(this.fixedContent).each(function(e, t) {
            var n = s(t).data("padding-right");
            s(t).removeData("padding-right"), t.style.paddingRight = n || "";
        });
    }, r.prototype.measureScrollbar = function() {
        var e = document.createElement("div");
        e.className = "modal-scrollbar-measure", this.$body.append(e);
        var t = e.offsetWidth - e.clientWidth;
        return this.$body[0].removeChild(e), t;
    };
    var e = s.fn.modal;
    s.fn.modal = a, s.fn.modal.Constructor = r, s.fn.modal.noConflict = function() {
        return s.fn.modal = e, this;
    }, s(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(e) {
        var t = s(this), n = t.attr("href"), i = t.attr("data-target") || n && n.replace(/.*(?=#[^\s]+$)/, ""), o = s(document).find(i), r = o.data("bs.modal") ? "toggle" : s.extend({
            remote: !/#/.test(n) && n
        }, o.data(), t.data());
        t.is("a") && e.preventDefault(), o.one("show.bs.modal", function(e) {
            e.isDefaultPrevented() || o.one("hidden.bs.modal", function() {
                t.is(":visible") && t.trigger("focus");
            });
        }), a.call(o, r, this);
    });
}(jQuery), function(g) {
    "use strict";
    var i = [ "sanitize", "whiteList", "sanitizeFn" ], s = [ "background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href" ], e = {
        "*": [ "class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i ],
        a: [ "target", "href", "title", "rel" ],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: [ "src", "alt", "title", "width", "height" ],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: []
    }, a = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi, l = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;
    function p(e, t) {
        var n = e.nodeName.toLowerCase();
        if (-1 !== g.inArray(n, t)) return -1 === g.inArray(n, s) || Boolean(e.nodeValue.match(a) || e.nodeValue.match(l));
        for (var i = g(t).filter(function(e, t) {
            return t instanceof RegExp;
        }), o = 0, r = i.length; o < r; o++) if (n.match(i[o])) return !0;
        return !1;
    }
    function o(e, t, n) {
        if (0 === e.length) return e;
        if (n && "function" == typeof n) return n(e);
        if (!document.implementation || !document.implementation.createHTMLDocument) return e;
        var i = document.implementation.createHTMLDocument("sanitization");
        i.body.innerHTML = e;
        for (var o = g.map(t, function(e, t) {
            return t;
        }), r = g(i.body).find("*"), s = 0, a = r.length; s < a; s++) {
            var l = r[s], c = l.nodeName.toLowerCase();
            if (-1 !== g.inArray(c, o)) for (var u = g.map(l.attributes, function(e) {
                return e;
            }), d = [].concat(t["*"] || [], t[c] || []), h = 0, f = u.length; h < f; h++) p(u[h], d) || l.removeAttribute(u[h].nodeName); else l.parentNode.removeChild(l);
        }
        return i.body.innerHTML;
    }
    function m(e, t) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, 
        this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", e, t);
    }
    m.VERSION = "3.4.1", m.TRANSITION_DURATION = 150, m.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        },
        sanitize: !0,
        sanitizeFn: null,
        whiteList: e
    }, m.prototype.init = function(e, t, n) {
        if (this.enabled = !0, this.type = e, this.$element = g(t), this.options = this.getOptions(n), 
        this.$viewport = this.options.viewport && g(document).find(g.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), 
        this.inState = {
            click: !1,
            hover: !1,
            focus: !1
        }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var i = this.options.trigger.split(" "), o = i.length; o--; ) {
            var r = i[o];
            if ("click" == r) this.$element.on("click." + this.type, this.options.selector, g.proxy(this.toggle, this)); else if ("manual" != r) {
                var s = "hover" == r ? "mouseenter" : "focusin", a = "hover" == r ? "mouseleave" : "focusout";
                this.$element.on(s + "." + this.type, this.options.selector, g.proxy(this.enter, this)), 
                this.$element.on(a + "." + this.type, this.options.selector, g.proxy(this.leave, this));
            }
        }
        this.options.selector ? this._options = g.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle();
    }, m.prototype.getDefaults = function() {
        return m.DEFAULTS;
    }, m.prototype.getOptions = function(e) {
        var t = this.$element.data();
        for (var n in t) t.hasOwnProperty(n) && -1 !== g.inArray(n, i) && delete t[n];
        return (e = g.extend({}, this.getDefaults(), t, e)).delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }), e.sanitize && (e.template = o(e.template, e.whiteList, e.sanitizeFn)), e;
    }, m.prototype.getDelegateOptions = function() {
        var n = {}, i = this.getDefaults();
        return this._options && g.each(this._options, function(e, t) {
            i[e] != t && (n[e] = t);
        }), n;
    }, m.prototype.enter = function(e) {
        var t = e instanceof this.constructor ? e : g(e.currentTarget).data("bs." + this.type);
        if (t || (t = new this.constructor(e.currentTarget, this.getDelegateOptions()), 
        g(e.currentTarget).data("bs." + this.type, t)), e instanceof g.Event && (t.inState["focusin" == e.type ? "focus" : "hover"] = !0), 
        t.tip().hasClass("in") || "in" == t.hoverState) t.hoverState = "in"; else {
            if (clearTimeout(t.timeout), t.hoverState = "in", !t.options.delay || !t.options.delay.show) return t.show();
            t.timeout = setTimeout(function() {
                "in" == t.hoverState && t.show();
            }, t.options.delay.show);
        }
    }, m.prototype.isInStateTrue = function() {
        for (var e in this.inState) if (this.inState[e]) return !0;
        return !1;
    }, m.prototype.leave = function(e) {
        var t = e instanceof this.constructor ? e : g(e.currentTarget).data("bs." + this.type);
        if (t || (t = new this.constructor(e.currentTarget, this.getDelegateOptions()), 
        g(e.currentTarget).data("bs." + this.type, t)), e instanceof g.Event && (t.inState["focusout" == e.type ? "focus" : "hover"] = !1), 
        !t.isInStateTrue()) {
            if (clearTimeout(t.timeout), t.hoverState = "out", !t.options.delay || !t.options.delay.hide) return t.hide();
            t.timeout = setTimeout(function() {
                "out" == t.hoverState && t.hide();
            }, t.options.delay.hide);
        }
    }, m.prototype.show = function() {
        var e = g.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var t = g.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !t) return;
            var n = this, i = this.tip(), o = this.getUID(this.type);
            this.setContent(), i.attr("id", o), this.$element.attr("aria-describedby", o), this.options.animation && i.addClass("fade");
            var r = "function" == typeof this.options.placement ? this.options.placement.call(this, i[0], this.$element[0]) : this.options.placement, s = /\s?auto?\s?/i, a = s.test(r);
            a && (r = r.replace(s, "") || "top"), i.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(r).data("bs." + this.type, this), this.options.container ? i.appendTo(g(document).find(this.options.container)) : i.insertAfter(this.$element), 
            this.$element.trigger("inserted.bs." + this.type);
            var l = this.getPosition(), c = i[0].offsetWidth, u = i[0].offsetHeight;
            if (a) {
                var d = r, h = this.getPosition(this.$viewport);
                r = "bottom" == r && l.bottom + u > h.bottom ? "top" : "top" == r && l.top - u < h.top ? "bottom" : "right" == r && l.right + c > h.width ? "left" : "left" == r && l.left - c < h.left ? "right" : r, 
                i.removeClass(d).addClass(r);
            }
            var f = this.getCalculatedOffset(r, l, c, u);
            this.applyPlacement(f, r);
            var p = function() {
                var e = n.hoverState;
                n.$element.trigger("shown.bs." + n.type), n.hoverState = null, "out" == e && n.leave(n);
            };
            g.support.transition && this.$tip.hasClass("fade") ? i.one("bsTransitionEnd", p).emulateTransitionEnd(m.TRANSITION_DURATION) : p();
        }
    }, m.prototype.applyPlacement = function(e, t) {
        var n = this.tip(), i = n[0].offsetWidth, o = n[0].offsetHeight, r = parseInt(n.css("margin-top"), 10), s = parseInt(n.css("margin-left"), 10);
        isNaN(r) && (r = 0), isNaN(s) && (s = 0), e.top += r, e.left += s, g.offset.setOffset(n[0], g.extend({
            using: function(e) {
                n.css({
                    top: Math.round(e.top),
                    left: Math.round(e.left)
                });
            }
        }, e), 0), n.addClass("in");
        var a = n[0].offsetWidth, l = n[0].offsetHeight;
        "top" == t && l != o && (e.top = e.top + o - l);
        var c = this.getViewportAdjustedDelta(t, e, a, l);
        c.left ? e.left += c.left : e.top += c.top;
        var u = /top|bottom/.test(t), d = u ? 2 * c.left - i + a : 2 * c.top - o + l, h = u ? "offsetWidth" : "offsetHeight";
        n.offset(e), this.replaceArrow(d, n[0][h], u);
    }, m.prototype.replaceArrow = function(e, t, n) {
        this.arrow().css(n ? "left" : "top", 50 * (1 - e / t) + "%").css(n ? "top" : "left", "");
    }, m.prototype.setContent = function() {
        var e = this.tip(), t = this.getTitle();
        this.options.html ? (this.options.sanitize && (t = o(t, this.options.whiteList, this.options.sanitizeFn)), 
        e.find(".tooltip-inner").html(t)) : e.find(".tooltip-inner").text(t), e.removeClass("fade in top bottom left right");
    }, m.prototype.hide = function(e) {
        var t = this, n = g(this.$tip), i = g.Event("hide.bs." + this.type);
        function o() {
            "in" != t.hoverState && n.detach(), t.$element && t.$element.removeAttr("aria-describedby").trigger("hidden.bs." + t.type), 
            e && e();
        }
        if (this.$element.trigger(i), !i.isDefaultPrevented()) return n.removeClass("in"), 
        g.support.transition && n.hasClass("fade") ? n.one("bsTransitionEnd", o).emulateTransitionEnd(m.TRANSITION_DURATION) : o(), 
        this.hoverState = null, this;
    }, m.prototype.fixTitle = function() {
        var e = this.$element;
        !e.attr("title") && "string" == typeof e.attr("data-original-title") || e.attr("data-original-title", e.attr("title") || "").attr("title", "");
    }, m.prototype.hasContent = function() {
        return this.getTitle();
    }, m.prototype.getPosition = function(e) {
        var t = (e = e || this.$element)[0], n = "BODY" == t.tagName, i = t.getBoundingClientRect();
        null == i.width && (i = g.extend({}, i, {
            width: i.right - i.left,
            height: i.bottom - i.top
        }));
        var o = window.SVGElement && t instanceof window.SVGElement, r = n ? {
            top: 0,
            left: 0
        } : o ? null : e.offset(), s = {
            scroll: n ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()
        }, a = n ? {
            width: g(window).width(),
            height: g(window).height()
        } : null;
        return g.extend({}, i, s, a, r);
    }, m.prototype.getCalculatedOffset = function(e, t, n, i) {
        return "bottom" == e ? {
            top: t.top + t.height,
            left: t.left + t.width / 2 - n / 2
        } : "top" == e ? {
            top: t.top - i,
            left: t.left + t.width / 2 - n / 2
        } : "left" == e ? {
            top: t.top + t.height / 2 - i / 2,
            left: t.left - n
        } : {
            top: t.top + t.height / 2 - i / 2,
            left: t.left + t.width
        };
    }, m.prototype.getViewportAdjustedDelta = function(e, t, n, i) {
        var o = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return o;
        var r = this.options.viewport && this.options.viewport.padding || 0, s = this.getPosition(this.$viewport);
        if (/right|left/.test(e)) {
            var a = t.top - r - s.scroll, l = t.top + r - s.scroll + i;
            a < s.top ? o.top = s.top - a : l > s.top + s.height && (o.top = s.top + s.height - l);
        } else {
            var c = t.left - r, u = t.left + r + n;
            c < s.left ? o.left = s.left - c : u > s.right && (o.left = s.left + s.width - u);
        }
        return o;
    }, m.prototype.getTitle = function() {
        var e = this.$element, t = this.options;
        return e.attr("data-original-title") || ("function" == typeof t.title ? t.title.call(e[0]) : t.title);
    }, m.prototype.getUID = function(e) {
        for (;e += ~~(1e6 * Math.random()), document.getElementById(e); ) ;
        return e;
    }, m.prototype.tip = function() {
        if (!this.$tip && (this.$tip = g(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip;
    }, m.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
    }, m.prototype.enable = function() {
        this.enabled = !0;
    }, m.prototype.disable = function() {
        this.enabled = !1;
    }, m.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled;
    }, m.prototype.toggle = function(e) {
        var t = this;
        e && ((t = g(e.currentTarget).data("bs." + this.type)) || (t = new this.constructor(e.currentTarget, this.getDelegateOptions()), 
        g(e.currentTarget).data("bs." + this.type, t))), e ? (t.inState.click = !t.inState.click, 
        t.isInStateTrue() ? t.enter(t) : t.leave(t)) : t.tip().hasClass("in") ? t.leave(t) : t.enter(t);
    }, m.prototype.destroy = function() {
        var e = this;
        clearTimeout(this.timeout), this.hide(function() {
            e.$element.off("." + e.type).removeData("bs." + e.type), e.$tip && e.$tip.detach(), 
            e.$tip = null, e.$arrow = null, e.$viewport = null, e.$element = null;
        });
    }, m.prototype.sanitizeHtml = function(e) {
        return o(e, this.options.whiteList, this.options.sanitizeFn);
    };
    var t = g.fn.tooltip;
    g.fn.tooltip = function(i) {
        return this.each(function() {
            var e = g(this), t = e.data("bs.tooltip"), n = "object" == typeof i && i;
            !t && /destroy|hide/.test(i) || (t || e.data("bs.tooltip", t = new m(this, n)), 
            "string" == typeof i && t[i]());
        });
    }, g.fn.tooltip.Constructor = m, g.fn.tooltip.noConflict = function() {
        return g.fn.tooltip = t, this;
    };
}(jQuery), function(o) {
    "use strict";
    function r(e, t) {
        this.init("popover", e, t);
    }
    if (!o.fn.tooltip) throw new Error("Popover requires tooltip.js");
    r.VERSION = "3.4.1", r.DEFAULTS = o.extend({}, o.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), ((r.prototype = o.extend({}, o.fn.tooltip.Constructor.prototype)).constructor = r).prototype.getDefaults = function() {
        return r.DEFAULTS;
    }, r.prototype.setContent = function() {
        var e = this.tip(), t = this.getTitle(), n = this.getContent();
        if (this.options.html) {
            var i = typeof n;
            this.options.sanitize && (t = this.sanitizeHtml(t), "string" == i && (n = this.sanitizeHtml(n))), 
            e.find(".popover-title").html(t), e.find(".popover-content").children().detach().end()["string" == i ? "html" : "append"](n);
        } else e.find(".popover-title").text(t), e.find(".popover-content").children().detach().end().text(n);
        e.removeClass("fade top bottom left right in"), e.find(".popover-title").html() || e.find(".popover-title").hide();
    }, r.prototype.hasContent = function() {
        return this.getTitle() || this.getContent();
    }, r.prototype.getContent = function() {
        var e = this.$element, t = this.options;
        return e.attr("data-content") || ("function" == typeof t.content ? t.content.call(e[0]) : t.content);
    }, r.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow");
    };
    var e = o.fn.popover;
    o.fn.popover = function(i) {
        return this.each(function() {
            var e = o(this), t = e.data("bs.popover"), n = "object" == typeof i && i;
            !t && /destroy|hide/.test(i) || (t || e.data("bs.popover", t = new r(this, n)), 
            "string" == typeof i && t[i]());
        });
    }, o.fn.popover.Constructor = r, o.fn.popover.noConflict = function() {
        return o.fn.popover = e, this;
    };
}(jQuery), function(r) {
    "use strict";
    function o(e, t) {
        this.$body = r(document.body), this.$scrollElement = r(e).is(document.body) ? r(window) : r(e), 
        this.options = r.extend({}, o.DEFAULTS, t), this.selector = (this.options.target || "") + " .nav li > a", 
        this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, 
        this.$scrollElement.on("scroll.bs.scrollspy", r.proxy(this.process, this)), this.refresh(), 
        this.process();
    }
    function t(i) {
        return this.each(function() {
            var e = r(this), t = e.data("bs.scrollspy"), n = "object" == typeof i && i;
            t || e.data("bs.scrollspy", t = new o(this, n)), "string" == typeof i && t[i]();
        });
    }
    o.VERSION = "3.4.1", o.DEFAULTS = {
        offset: 10
    }, o.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
    }, o.prototype.refresh = function() {
        var e = this, i = "offset", o = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), 
        r.isWindow(this.$scrollElement[0]) || (i = "position", o = this.$scrollElement.scrollTop()), 
        this.$body.find(this.selector).map(function() {
            var e = r(this), t = e.data("target") || e.attr("href"), n = /^#./.test(t) && r(t);
            return n && n.length && n.is(":visible") && [ [ n[i]().top + o, t ] ] || null;
        }).sort(function(e, t) {
            return e[0] - t[0];
        }).each(function() {
            e.offsets.push(this[0]), e.targets.push(this[1]);
        });
    }, o.prototype.process = function() {
        var e, t = this.$scrollElement.scrollTop() + this.options.offset, n = this.getScrollHeight(), i = this.options.offset + n - this.$scrollElement.height(), o = this.offsets, r = this.targets, s = this.activeTarget;
        if (this.scrollHeight != n && this.refresh(), i <= t) return s != (e = r[r.length - 1]) && this.activate(e);
        if (s && t < o[0]) return this.activeTarget = null, this.clear();
        for (e = o.length; e--; ) s != r[e] && t >= o[e] && (void 0 === o[e + 1] || t < o[e + 1]) && this.activate(r[e]);
    }, o.prototype.activate = function(e) {
        this.activeTarget = e, this.clear();
        var t = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]', n = r(t).parents("li").addClass("active");
        n.parent(".dropdown-menu").length && (n = n.closest("li.dropdown").addClass("active")), 
        n.trigger("activate.bs.scrollspy");
    }, o.prototype.clear = function() {
        r(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
    };
    var e = r.fn.scrollspy;
    r.fn.scrollspy = t, r.fn.scrollspy.Constructor = o, r.fn.scrollspy.noConflict = function() {
        return r.fn.scrollspy = e, this;
    }, r(window).on("load.bs.scrollspy.data-api", function() {
        r('[data-spy="scroll"]').each(function() {
            var e = r(this);
            t.call(e, e.data());
        });
    });
}(jQuery), function(a) {
    "use strict";
    function s(e) {
        this.element = a(e);
    }
    function t(n) {
        return this.each(function() {
            var e = a(this), t = e.data("bs.tab");
            t || e.data("bs.tab", t = new s(this)), "string" == typeof n && t[n]();
        });
    }
    s.VERSION = "3.4.1", s.TRANSITION_DURATION = 150, s.prototype.show = function() {
        var e = this.element, t = e.closest("ul:not(.dropdown-menu)"), n = e.data("target");
        if (n = n || (n = e.attr("href")) && n.replace(/.*(?=#[^\s]*$)/, ""), !e.parent("li").hasClass("active")) {
            var i = t.find(".active:last a"), o = a.Event("hide.bs.tab", {
                relatedTarget: e[0]
            }), r = a.Event("show.bs.tab", {
                relatedTarget: i[0]
            });
            if (i.trigger(o), e.trigger(r), !r.isDefaultPrevented() && !o.isDefaultPrevented()) {
                var s = a(document).find(n);
                this.activate(e.closest("li"), t), this.activate(s, s.parent(), function() {
                    i.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: e[0]
                    }), e.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: i[0]
                    });
                });
            }
        }
    }, s.prototype.activate = function(e, t, n) {
        var i = t.find("> .active"), o = n && a.support.transition && (i.length && i.hasClass("fade") || !!t.find("> .fade").length);
        function r() {
            i.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), 
            e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), o ? (e[0].offsetWidth, 
            e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu").length && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), 
            n && n();
        }
        i.length && o ? i.one("bsTransitionEnd", r).emulateTransitionEnd(s.TRANSITION_DURATION) : r(), 
        i.removeClass("in");
    };
    var e = a.fn.tab;
    a.fn.tab = t, a.fn.tab.Constructor = s, a.fn.tab.noConflict = function() {
        return a.fn.tab = e, this;
    };
    function n(e) {
        e.preventDefault(), t.call(a(this), "show");
    }
    a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', n).on("click.bs.tab.data-api", '[data-toggle="pill"]', n);
}(jQuery), function(l) {
    "use strict";
    var c = function(e, t) {
        this.options = l.extend({}, c.DEFAULTS, t);
        var n = this.options.target === c.DEFAULTS.target ? l(this.options.target) : l(document).find(this.options.target);
        this.$target = n.on("scroll.bs.affix.data-api", l.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", l.proxy(this.checkPositionWithEventLoop, this)), 
        this.$element = l(e), this.affixed = null, this.unpin = null, this.pinnedOffset = null, 
        this.checkPosition();
    };
    function n(i) {
        return this.each(function() {
            var e = l(this), t = e.data("bs.affix"), n = "object" == typeof i && i;
            t || e.data("bs.affix", t = new c(this, n)), "string" == typeof i && t[i]();
        });
    }
    c.VERSION = "3.4.1", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
        offset: 0,
        target: window
    }, c.prototype.getState = function(e, t, n, i) {
        var o = this.$target.scrollTop(), r = this.$element.offset(), s = this.$target.height();
        if (null != n && "top" == this.affixed) return o < n && "top";
        if ("bottom" == this.affixed) return null != n ? !(o + this.unpin <= r.top) && "bottom" : !(o + s <= e - i) && "bottom";
        var a = null == this.affixed, l = a ? o : r.top;
        return null != n && o <= n ? "top" : null != i && e - i <= l + (a ? s : t) && "bottom";
    }, c.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(c.RESET).addClass("affix");
        var e = this.$target.scrollTop(), t = this.$element.offset();
        return this.pinnedOffset = t.top - e;
    }, c.prototype.checkPositionWithEventLoop = function() {
        setTimeout(l.proxy(this.checkPosition, this), 1);
    }, c.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var e = this.$element.height(), t = this.options.offset, n = t.top, i = t.bottom, o = Math.max(l(document).height(), l(document.body).height());
            "object" != typeof t && (i = n = t), "function" == typeof n && (n = t.top(this.$element)), 
            "function" == typeof i && (i = t.bottom(this.$element));
            var r = this.getState(o, e, n, i);
            if (this.affixed != r) {
                null != this.unpin && this.$element.css("top", "");
                var s = "affix" + (r ? "-" + r : ""), a = l.Event(s + ".bs.affix");
                if (this.$element.trigger(a), a.isDefaultPrevented()) return;
                this.affixed = r, this.unpin = "bottom" == r ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(s).trigger(s.replace("affix", "affixed") + ".bs.affix");
            }
            "bottom" == r && this.$element.offset({
                top: o - e - i
            });
        }
    };
    var e = l.fn.affix;
    l.fn.affix = n, l.fn.affix.Constructor = c, l.fn.affix.noConflict = function() {
        return l.fn.affix = e, this;
    }, l(window).on("load", function() {
        l('[data-spy="affix"]').each(function() {
            var e = l(this), t = e.data();
            t.offset = t.offset || {}, null != t.offsetBottom && (t.offset.bottom = t.offsetBottom), 
            null != t.offsetTop && (t.offset.top = t.offsetTop), n.call(e, t);
        });
    });
}(jQuery), function(x, e, C, T) {
    "use strict";
    e = void 0 !== e && e.Math == Math ? e : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), 
    x.fn.transition = function() {
        var c, s = x(this), p = s.selector || "", g = new Date().getTime(), m = [], v = arguments, b = v[0], y = [].slice.call(arguments, 1), w = "string" == typeof b;
        e.requestAnimationFrame || e.mozRequestAnimationFrame || e.webkitRequestAnimationFrame || e.msRequestAnimationFrame;
        return s.each(function(i) {
            var u, a, t, d, n, o, e, r, h, f = x(this), l = this;
            (h = {
                initialize: function() {
                    u = h.get.settings.apply(l, v), d = u.className, t = u.error, n = u.metadata, r = "." + u.namespace, 
                    e = "module-" + u.namespace, a = f.data(e) || h, o = h.get.animationEndEvent(), 
                    !1 === (w = w && h.invoke(b)) && (h.verbose("Converted arguments into settings object", u), 
                    u.interval ? h.delay(u.animate) : h.animate(), h.instantiate());
                },
                instantiate: function() {
                    h.verbose("Storing instance of module", h), a = h, f.data(e, a);
                },
                destroy: function() {
                    h.verbose("Destroying previous module for", l), f.removeData(e);
                },
                refresh: function() {
                    h.verbose("Refreshing display type on next animation"), delete h.displayType;
                },
                forceRepaint: function() {
                    h.verbose("Forcing element repaint");
                    var e = f.parent(), t = f.next();
                    0 === t.length ? f.detach().appendTo(e) : f.detach().insertBefore(t);
                },
                repaint: function() {
                    h.verbose("Repainting element");
                    l.offsetWidth;
                },
                delay: function(e) {
                    var t, n = h.get.animationDirection();
                    n = n || (h.can.transition() ? h.get.direction() : "static"), e = e !== T ? e : u.interval, 
                    t = "auto" == u.reverse && n == d.outward || 1 == u.reverse ? (s.length - i) * u.interval : i * u.interval, 
                    h.debug("Delaying animation by", t), setTimeout(h.animate, t);
                },
                animate: function(e) {
                    if (u = e || u, !h.is.supported()) return h.error(t.support), !1;
                    if (h.debug("Preparing animation", u.animation), h.is.animating()) {
                        if (u.queue) return !u.allowRepeats && h.has.direction() && h.is.occurring() && !0 !== h.queuing ? h.debug("Animation is currently occurring, preventing queueing same animation", u.animation) : h.queue(u.animation), 
                        !1;
                        if (!u.allowRepeats && h.is.occurring()) return h.debug("Animation is already occurring, will not execute repeated animation", u.animation), 
                        !1;
                        h.debug("New animation started, completing previous early", u.animation), a.complete();
                    }
                    h.can.animate() ? h.set.animating(u.animation) : h.error(t.noAnimation, u.animation, l);
                },
                reset: function() {
                    h.debug("Resetting animation to beginning conditions"), h.remove.animationCallbacks(), 
                    h.restore.conditions(), h.remove.animating();
                },
                queue: function(e) {
                    h.debug("Queueing animation of", e), h.queuing = !0, f.one(o + ".queue" + r, function() {
                        h.queuing = !1, h.repaint(), h.animate.apply(this, u);
                    });
                },
                complete: function(e) {
                    h.debug("Animation complete", u.animation), h.remove.completeCallback(), h.remove.failSafe(), 
                    h.is.looping() || (h.is.outward() ? (h.verbose("Animation is outward, hiding element"), 
                    h.restore.conditions(), h.hide()) : h.is.inward() ? (h.verbose("Animation is outward, showing element"), 
                    h.restore.conditions(), h.show()) : (h.verbose("Static animation completed"), h.restore.conditions(), 
                    u.onComplete.call(l)));
                },
                force: {
                    visible: function() {
                        var e = f.attr("style"), t = h.get.userStyle(), n = h.get.displayType(), i = t + "display: " + n + " !important;", o = f.css("display"), r = e === T || "" === e;
                        o !== n ? (h.verbose("Overriding default display to show element", n), f.attr("style", i)) : r && f.removeAttr("style");
                    },
                    hidden: function() {
                        var e = f.attr("style"), t = f.css("display"), n = e === T || "" === e;
                        "none" === t || h.is.hidden() ? n && f.removeAttr("style") : (h.verbose("Overriding default display to hide element"), 
                        f.css("display", "none"));
                    }
                },
                has: {
                    direction: function(e) {
                        var n = !1;
                        return "string" == typeof (e = e || u.animation) && (e = e.split(" "), x.each(e, function(e, t) {
                            t !== d.inward && t !== d.outward || (n = !0);
                        })), n;
                    },
                    inlineDisplay: function() {
                        var e = f.attr("style") || "";
                        return x.isArray(e.match(/display.*?;/, ""));
                    }
                },
                set: {
                    animating: function(e) {
                        var t;
                        h.remove.completeCallback(), e = e || u.animation, t = h.get.animationClass(e), 
                        h.save.animation(t), h.force.visible(), h.remove.hidden(), h.remove.direction(), 
                        h.start.animation(t);
                    },
                    duration: function(e, t) {
                        !(t = "number" == typeof (t = t || u.duration) ? t + "ms" : t) && 0 !== t || (h.verbose("Setting animation duration", t), 
                        f.css({
                            "animation-duration": t
                        }));
                    },
                    direction: function(e) {
                        (e = e || h.get.direction()) == d.inward ? h.set.inward() : h.set.outward();
                    },
                    looping: function() {
                        h.debug("Transition set to loop"), f.addClass(d.looping);
                    },
                    hidden: function() {
                        f.addClass(d.transition).addClass(d.hidden);
                    },
                    inward: function() {
                        h.debug("Setting direction to inward"), f.removeClass(d.outward).addClass(d.inward);
                    },
                    outward: function() {
                        h.debug("Setting direction to outward"), f.removeClass(d.inward).addClass(d.outward);
                    },
                    visible: function() {
                        f.addClass(d.transition).addClass(d.visible);
                    }
                },
                start: {
                    animation: function(e) {
                        e = e || h.get.animationClass(), h.debug("Starting tween", e), f.addClass(e).one(o + ".complete" + r, h.complete), 
                        u.useFailSafe && h.add.failSafe(), h.set.duration(u.duration), u.onStart.call(l);
                    }
                },
                save: {
                    animation: function(e) {
                        h.cache || (h.cache = {}), h.cache.animation = e;
                    },
                    displayType: function(e) {
                        "none" !== e && f.data(n.displayType, e);
                    },
                    transitionExists: function(e, t) {
                        x.fn.transition.exists[e] = t, h.verbose("Saving existence of transition", e, t);
                    }
                },
                restore: {
                    conditions: function() {
                        var e = h.get.currentAnimation();
                        e && (f.removeClass(e), h.verbose("Removing animation class", h.cache)), h.remove.duration();
                    }
                },
                add: {
                    failSafe: function() {
                        var e = h.get.duration();
                        h.timer = setTimeout(function() {
                            f.triggerHandler(o);
                        }, e + u.failSafeDelay), h.verbose("Adding fail safe timer", h.timer);
                    }
                },
                remove: {
                    animating: function() {
                        f.removeClass(d.animating);
                    },
                    animationCallbacks: function() {
                        h.remove.queueCallback(), h.remove.completeCallback();
                    },
                    queueCallback: function() {
                        f.off(".queue" + r);
                    },
                    completeCallback: function() {
                        f.off(".complete" + r);
                    },
                    display: function() {
                        f.css("display", "");
                    },
                    direction: function() {
                        f.removeClass(d.inward).removeClass(d.outward);
                    },
                    duration: function() {
                        f.css("animation-duration", "");
                    },
                    failSafe: function() {
                        h.verbose("Removing fail safe timer", h.timer), h.timer && clearTimeout(h.timer);
                    },
                    hidden: function() {
                        f.removeClass(d.hidden);
                    },
                    visible: function() {
                        f.removeClass(d.visible);
                    },
                    looping: function() {
                        h.debug("Transitions are no longer looping"), h.is.looping() && (h.reset(), f.removeClass(d.looping));
                    },
                    transition: function() {
                        f.removeClass(d.visible).removeClass(d.hidden);
                    }
                },
                get: {
                    settings: function(e, t, n) {
                        return "object" == typeof e ? x.extend(!0, {}, x.fn.transition.settings, e) : "function" == typeof n ? x.extend({}, x.fn.transition.settings, {
                            animation: e,
                            onComplete: n,
                            duration: t
                        }) : "string" == typeof t || "number" == typeof t ? x.extend({}, x.fn.transition.settings, {
                            animation: e,
                            duration: t
                        }) : "object" == typeof t ? x.extend({}, x.fn.transition.settings, t, {
                            animation: e
                        }) : "function" == typeof t ? x.extend({}, x.fn.transition.settings, {
                            animation: e,
                            onComplete: t
                        }) : x.extend({}, x.fn.transition.settings, {
                            animation: e
                        });
                    },
                    animationClass: function(e) {
                        var t = e || u.animation, n = h.can.transition() && !h.has.direction() ? h.get.direction() + " " : "";
                        return d.animating + " " + d.transition + " " + n + t;
                    },
                    currentAnimation: function() {
                        return !(!h.cache || h.cache.animation === T) && h.cache.animation;
                    },
                    currentDirection: function() {
                        return h.is.inward() ? d.inward : d.outward;
                    },
                    direction: function() {
                        return h.is.hidden() || !h.is.visible() ? d.inward : d.outward;
                    },
                    animationDirection: function(e) {
                        var n;
                        return "string" == typeof (e = e || u.animation) && (e = e.split(" "), x.each(e, function(e, t) {
                            t === d.inward ? n = d.inward : t === d.outward && (n = d.outward);
                        })), n || !1;
                    },
                    duration: function(e) {
                        return !1 === (e = e || u.duration) && (e = f.css("animation-duration") || 0), "string" == typeof e ? -1 < e.indexOf("ms") ? parseFloat(e) : 1e3 * parseFloat(e) : e;
                    },
                    displayType: function(e) {
                        return e = e === T || e, u.displayType ? u.displayType : (e && f.data(n.displayType) === T && h.can.transition(!0), 
                        f.data(n.displayType));
                    },
                    userStyle: function(e) {
                        return (e = e || f.attr("style") || "").replace(/display.*?;/, "");
                    },
                    transitionExists: function(e) {
                        return x.fn.transition.exists[e];
                    },
                    animationStartEvent: function() {
                        var e, t = C.createElement("div"), n = {
                            animation: "animationstart",
                            OAnimation: "oAnimationStart",
                            MozAnimation: "mozAnimationStart",
                            WebkitAnimation: "webkitAnimationStart"
                        };
                        for (e in n) if (t.style[e] !== T) return n[e];
                        return !1;
                    },
                    animationEndEvent: function() {
                        var e, t = C.createElement("div"), n = {
                            animation: "animationend",
                            OAnimation: "oAnimationEnd",
                            MozAnimation: "mozAnimationEnd",
                            WebkitAnimation: "webkitAnimationEnd"
                        };
                        for (e in n) if (t.style[e] !== T) return n[e];
                        return !1;
                    }
                },
                can: {
                    transition: function(e) {
                        var t, n, i, o, r, s, a = u.animation, l = h.get.transitionExists(a), c = h.get.displayType(!1);
                        if (l === T || e) {
                            if (h.verbose("Determining whether animation exists"), t = f.attr("class"), n = f.prop("tagName"), 
                            o = (i = x("<" + n + " />").addClass(t).insertAfter(f)).addClass(a).removeClass(d.inward).removeClass(d.outward).addClass(d.animating).addClass(d.transition).css("animationName"), 
                            r = i.addClass(d.inward).css("animationName"), c || (c = i.attr("class", t).removeAttr("style").removeClass(d.hidden).removeClass(d.visible).show().css("display"), 
                            h.verbose("Determining final display state", c), h.save.displayType(c)), i.remove(), 
                            o != r) h.debug("Direction exists for animation", a), s = !0; else {
                                if ("none" == o || !o) return void h.debug("No animation defined in css", a);
                                h.debug("Static animation found", a, c), s = !1;
                            }
                            h.save.transitionExists(a, s);
                        }
                        return l !== T ? l : s;
                    },
                    animate: function() {
                        return h.can.transition() !== T;
                    }
                },
                is: {
                    animating: function() {
                        return f.hasClass(d.animating);
                    },
                    inward: function() {
                        return f.hasClass(d.inward);
                    },
                    outward: function() {
                        return f.hasClass(d.outward);
                    },
                    looping: function() {
                        return f.hasClass(d.looping);
                    },
                    occurring: function(e) {
                        return e = "." + (e = e || u.animation).replace(" ", "."), 0 < f.filter(e).length;
                    },
                    visible: function() {
                        return f.is(":visible");
                    },
                    hidden: function() {
                        return "hidden" === f.css("visibility");
                    },
                    supported: function() {
                        return !1 !== o;
                    }
                },
                hide: function() {
                    h.verbose("Hiding element"), h.is.animating() && h.reset(), l.blur(), h.remove.display(), 
                    h.remove.visible(), h.set.hidden(), h.force.hidden(), u.onHide.call(l), u.onComplete.call(l);
                },
                show: function(e) {
                    h.verbose("Showing element", e), h.remove.hidden(), h.set.visible(), h.force.visible(), 
                    u.onShow.call(l), u.onComplete.call(l);
                },
                toggle: function() {
                    h.is.visible() ? h.hide() : h.show();
                },
                stop: function() {
                    h.debug("Stopping current animation"), f.triggerHandler(o);
                },
                stopAll: function() {
                    h.debug("Stopping all animation"), h.remove.queueCallback(), f.triggerHandler(o);
                },
                clear: {
                    queue: function() {
                        h.debug("Clearing animation queue"), h.remove.queueCallback();
                    }
                },
                enable: function() {
                    h.verbose("Starting animation"), f.removeClass(d.disabled);
                },
                disable: function() {
                    h.debug("Stopping animation"), f.addClass(d.disabled);
                },
                setting: function(e, t) {
                    if (h.debug("Changing setting", e, t), x.isPlainObject(e)) x.extend(!0, u, e); else {
                        if (t === T) return u[e];
                        x.isPlainObject(u[e]) ? x.extend(!0, u[e], t) : u[e] = t;
                    }
                },
                internal: function(e, t) {
                    if (x.isPlainObject(e)) x.extend(!0, h, e); else {
                        if (t === T) return h[e];
                        h[e] = t;
                    }
                },
                debug: function() {
                    !u.silent && u.debug && (u.performance ? h.performance.log(arguments) : (h.debug = Function.prototype.bind.call(console.info, console, u.name + ":"), 
                    h.debug.apply(console, arguments)));
                },
                verbose: function() {
                    !u.silent && u.verbose && u.debug && (u.performance ? h.performance.log(arguments) : (h.verbose = Function.prototype.bind.call(console.info, console, u.name + ":"), 
                    h.verbose.apply(console, arguments)));
                },
                error: function() {
                    u.silent || (h.error = Function.prototype.bind.call(console.error, console, u.name + ":"), 
                    h.error.apply(console, arguments));
                },
                performance: {
                    log: function(e) {
                        var t, n;
                        u.performance && (n = (t = new Date().getTime()) - (g || t), g = t, m.push({
                            Name: e[0],
                            Arguments: [].slice.call(e, 1) || "",
                            Element: l,
                            "Execution Time": n
                        })), clearTimeout(h.performance.timer), h.performance.timer = setTimeout(h.performance.display, 500);
                    },
                    display: function() {
                        var e = u.name + ":", n = 0;
                        g = !1, clearTimeout(h.performance.timer), x.each(m, function(e, t) {
                            n += t["Execution Time"];
                        }), e += " " + n + "ms", p && (e += " '" + p + "'"), 1 < s.length && (e += " (" + s.length + ")"), 
                        (console.group !== T || console.table !== T) && 0 < m.length && (console.groupCollapsed(e), 
                        console.table ? console.table(m) : x.each(m, function(e, t) {
                            console.log(t.Name + ": " + t["Execution Time"] + "ms");
                        }), console.groupEnd()), m = [];
                    }
                },
                invoke: function(i, e, t) {
                    var o, r, n, s = a;
                    return e = e || y, t = l || t, "string" == typeof i && s !== T && (i = i.split(/[\. ]/), 
                    o = i.length - 1, x.each(i, function(e, t) {
                        var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
                        if (x.isPlainObject(s[n]) && e != o) s = s[n]; else {
                            if (s[n] !== T) return r = s[n], !1;
                            if (!x.isPlainObject(s[t]) || e == o) return s[t] !== T && (r = s[t]), !1;
                            s = s[t];
                        }
                    })), x.isFunction(r) ? n = r.apply(t, e) : r !== T && (n = r), x.isArray(c) ? c.push(n) : c !== T ? c = [ c, n ] : n !== T && (c = n), 
                    r !== T && r;
                }
            }).initialize();
        }), c !== T ? c : this;
    }, x.fn.transition.exists = {}, x.fn.transition.settings = {
        name: "Transition",
        silent: !1,
        debug: !1,
        verbose: !1,
        performance: !0,
        namespace: "transition",
        interval: 0,
        reverse: "auto",
        onStart: function() {},
        onComplete: function() {},
        onShow: function() {},
        onHide: function() {},
        useFailSafe: !0,
        failSafeDelay: 100,
        allowRepeats: !1,
        displayType: !1,
        animation: "fade",
        duration: !1,
        queue: !0,
        metadata: {
            displayType: "display"
        },
        className: {
            animating: "animating",
            disabled: "disabled",
            hidden: "hidden",
            inward: "in",
            loading: "loading",
            looping: "looping",
            outward: "out",
            transition: "transition",
            visible: "visible"
        },
        error: {
            noAnimation: "Element is no longer attached to DOM. Unable to animate.  Use silent setting to surpress this warning in production.",
            repeated: "That animation is already occurring, cancelling repeated animation",
            method: "The method you called is not defined",
            support: "This browser does not support CSS animations"
        }
    };
}(jQuery, window, document), function(Q, X, K, G) {
    "use strict";
    X = void 0 !== X && X.Math == Math ? X : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), 
    Q.fn.dropdown = function(L) {
        var j, R = Q(this), q = Q(K), H = R.selector || "", U = "ontouchstart" in K.documentElement, W = new Date().getTime(), V = [], z = L, B = "string" == typeof z, Y = [].slice.call(arguments, 1);
        return R.each(function(n) {
            var e, t, i, o, r, s, a, p, g = Q.isPlainObject(L) ? Q.extend(!0, {}, Q.fn.dropdown.settings, L) : Q.extend({}, Q.fn.dropdown.settings), m = g.className, c = g.message, l = g.fields, v = g.keys, b = g.metadata, u = g.namespace, d = g.regExp, y = g.selector, h = g.error, f = g.templates, w = "." + u, x = "module-" + u, C = Q(this), T = Q(g.context), D = C.find(y.text), k = C.find(y.search), S = C.find(y.sizer), _ = C.find(y.input), A = C.find(y.icon), N = 0 < C.prev().find(y.text).length ? C.prev().find(y.text) : C.prev(), E = C.children(y.menu), I = E.find(y.item), $ = !1, O = !1, F = !1, P = this, M = C.data(x);
            p = {
                initialize: function() {
                    p.debug("Initializing dropdown", g), p.is.alreadySetup() ? p.setup.reference() : (p.setup.layout(), 
                    g.values && p.change.values(g.values), p.refreshData(), p.save.defaults(), p.restore.selected(), 
                    p.create.id(), p.bind.events(), p.observeChanges(), p.instantiate());
                },
                instantiate: function() {
                    p.verbose("Storing instance of dropdown", p), M = p, C.data(x, p);
                },
                destroy: function() {
                    p.verbose("Destroying previous dropdown", C), p.remove.tabbable(), C.off(w).removeData(x), 
                    E.off(w), q.off(o), p.disconnect.menuObserver(), p.disconnect.selectObserver();
                },
                observeChanges: function() {
                    "MutationObserver" in X && (s = new MutationObserver(p.event.select.mutation), a = new MutationObserver(p.event.menu.mutation), 
                    p.debug("Setting up mutation observer", s, a), p.observe.select(), p.observe.menu());
                },
                disconnect: {
                    menuObserver: function() {
                        a && a.disconnect();
                    },
                    selectObserver: function() {
                        s && s.disconnect();
                    }
                },
                observe: {
                    select: function() {
                        p.has.input() && s.observe(C[0], {
                            childList: !0,
                            subtree: !0
                        });
                    },
                    menu: function() {
                        p.has.menu() && a.observe(E[0], {
                            childList: !0,
                            subtree: !0
                        });
                    }
                },
                create: {
                    id: function() {
                        r = (Math.random().toString(16) + "000000000").substr(2, 8), o = "." + r, p.verbose("Creating unique id for element", r);
                    },
                    userChoice: function(e) {
                        var n, i, o;
                        return !!(e = e || p.get.userValues()) && (e = Q.isArray(e) ? e : [ e ], Q.each(e, function(e, t) {
                            !1 === p.get.item(t) && (o = g.templates.addition(p.add.variables(c.addResult, t)), 
                            i = Q("<div />").html(o).attr("data-" + b.value, t).attr("data-" + b.text, t).addClass(m.addition).addClass(m.item), 
                            g.hideAdditions && i.addClass(m.hidden), n = n === G ? i : n.add(i), p.verbose("Creating user choices for value", t, i));
                        }), n);
                    },
                    userLabels: function(e) {
                        var t = p.get.userValues();
                        t && (p.debug("Adding user labels", t), Q.each(t, function(e, t) {
                            p.verbose("Adding custom user value"), p.add.label(t, t);
                        }));
                    },
                    menu: function() {
                        E = Q("<div />").addClass(m.menu).appendTo(C);
                    },
                    sizer: function() {
                        S = Q("<span />").addClass(m.sizer).insertAfter(k);
                    }
                },
                search: function(e) {
                    e = e !== G ? e : p.get.query(), p.verbose("Searching for query", e), p.has.minCharacters(e) ? p.filter(e) : p.hide();
                },
                select: {
                    firstUnfiltered: function() {
                        p.verbose("Selecting first non-filtered element"), p.remove.selectedItem(), I.not(y.unselectable).not(y.addition + y.hidden).eq(0).addClass(m.selected);
                    },
                    nextAvailable: function(e) {
                        var t = (e = e.eq(0)).nextAll(y.item).not(y.unselectable).eq(0), n = e.prevAll(y.item).not(y.unselectable).eq(0);
                        0 < t.length ? (p.verbose("Moving selection to", t), t.addClass(m.selected)) : (p.verbose("Moving selection to", n), 
                        n.addClass(m.selected));
                    }
                },
                setup: {
                    api: function() {
                        var e = {
                            debug: g.debug,
                            urlData: {
                                value: p.get.value(),
                                query: p.get.query()
                            },
                            on: !1
                        };
                        p.verbose("First request, initializing API"), C.api(e);
                    },
                    layout: function() {
                        C.is("select") && (p.setup.select(), p.setup.returnedObject()), p.has.menu() || p.create.menu(), 
                        p.is.search() && !p.has.search() && (p.verbose("Adding search input"), k = Q("<input />").addClass(m.search).prop("autocomplete", "off").insertBefore(D)), 
                        p.is.multiple() && p.is.searchSelection() && !p.has.sizer() && p.create.sizer(), 
                        g.allowTab && p.set.tabbable();
                    },
                    select: function() {
                        var e = p.get.selectValues();
                        p.debug("Dropdown initialized on a select", e), C.is("select") && (_ = C), 0 < _.parent(y.dropdown).length ? (p.debug("UI dropdown already exists. Creating dropdown menu only"), 
                        C = _.closest(y.dropdown), p.has.menu() || p.create.menu(), E = C.children(y.menu), 
                        p.setup.menu(e)) : (p.debug("Creating entire dropdown from select"), C = Q("<div />").attr("class", _.attr("class")).addClass(m.selection).addClass(m.dropdown).html(f.dropdown(e)).insertBefore(_), 
                        _.hasClass(m.multiple) && !1 === _.prop("multiple") && (p.error(h.missingMultiple), 
                        _.prop("multiple", !0)), _.is("[multiple]") && p.set.multiple(), _.prop("disabled") && (p.debug("Disabling dropdown"), 
                        C.addClass(m.disabled)), _.removeAttr("class").detach().prependTo(C)), p.refresh();
                    },
                    menu: function(e) {
                        E.html(f.menu(e, l)), I = E.find(y.item);
                    },
                    reference: function() {
                        p.debug("Dropdown behavior was called on select, replacing with closest dropdown"), 
                        C = C.parent(y.dropdown), M = C.data(x), P = C.get(0), p.refresh(), p.setup.returnedObject();
                    },
                    returnedObject: function() {
                        var e = R.slice(0, n), t = R.slice(n + 1);
                        R = e.add(C).add(t);
                    }
                },
                refresh: function() {
                    p.refreshSelectors(), p.refreshData();
                },
                refreshItems: function() {
                    I = E.find(y.item);
                },
                refreshSelectors: function() {
                    p.verbose("Refreshing selector cache"), D = C.find(y.text), k = C.find(y.search), 
                    _ = C.find(y.input), A = C.find(y.icon), N = 0 < C.prev().find(y.text).length ? C.prev().find(y.text) : C.prev(), 
                    E = C.children(y.menu), I = E.find(y.item);
                },
                refreshData: function() {
                    p.verbose("Refreshing cached metadata"), I.removeData(b.text).removeData(b.value);
                },
                clearData: function() {
                    p.verbose("Clearing metadata"), I.removeData(b.text).removeData(b.value), C.removeData(b.defaultText).removeData(b.defaultValue).removeData(b.placeholderText);
                },
                toggle: function() {
                    p.verbose("Toggling menu visibility"), p.is.active() ? p.hide() : p.show();
                },
                show: function(e) {
                    if (e = Q.isFunction(e) ? e : function() {}, !p.can.show() && p.is.remote() && (p.debug("No API results retrieved, searching before show"), 
                    p.queryRemote(p.get.query(), p.show)), p.can.show() && !p.is.active()) {
                        if (p.debug("Showing dropdown"), !p.has.message() || p.has.maxSelections() || p.has.allResultsFiltered() || p.remove.message(), 
                        p.is.allFiltered()) return !0;
                        !1 !== g.onShow.call(P) && p.animate.show(function() {
                            p.can.click() && p.bind.intent(), p.has.menuSearch() && p.focusSearch(), p.set.visible(), 
                            e.call(P);
                        });
                    }
                },
                hide: function(e) {
                    e = Q.isFunction(e) ? e : function() {}, p.is.active() && !p.is.animatingOutward() && (p.debug("Hiding dropdown"), 
                    !1 !== g.onHide.call(P) && p.animate.hide(function() {
                        p.remove.visible(), e.call(P);
                    }));
                },
                hideOthers: function() {
                    p.verbose("Finding other dropdowns to hide"), R.not(C).has(y.menu + "." + m.visible).dropdown("hide");
                },
                hideMenu: function() {
                    p.verbose("Hiding menu  instantaneously"), p.remove.active(), p.remove.visible(), 
                    E.transition("hide");
                },
                hideSubMenus: function() {
                    var e = E.children(y.item).find(y.menu);
                    p.verbose("Hiding sub menus", e), e.transition("hide");
                },
                bind: {
                    events: function() {
                        U && p.bind.touchEvents(), p.bind.keyboardEvents(), p.bind.inputEvents(), p.bind.mouseEvents();
                    },
                    touchEvents: function() {
                        p.debug("Touch device detected binding additional touch events"), p.is.searchSelection() || p.is.single() && C.on("touchstart" + w, p.event.test.toggle), 
                        E.on("touchstart" + w, y.item, p.event.item.mouseenter);
                    },
                    keyboardEvents: function() {
                        p.verbose("Binding keyboard events"), C.on("keydown" + w, p.event.keydown), p.has.search() && C.on(p.get.inputEvent() + w, y.search, p.event.input), 
                        p.is.multiple() && q.on("keydown" + o, p.event.document.keydown);
                    },
                    inputEvents: function() {
                        p.verbose("Binding input change events"), C.on("change" + w, y.input, p.event.change);
                    },
                    mouseEvents: function() {
                        p.verbose("Binding mouse events"), p.is.multiple() && C.on("click" + w, y.label, p.event.label.click).on("click" + w, y.remove, p.event.remove.click), 
                        p.is.searchSelection() ? (C.on("mousedown" + w, p.event.mousedown).on("mouseup" + w, p.event.mouseup).on("mousedown" + w, y.menu, p.event.menu.mousedown).on("mouseup" + w, y.menu, p.event.menu.mouseup).on("click" + w, y.icon, p.event.icon.click).on("focus" + w, y.search, p.event.search.focus).on("click" + w, y.search, p.event.search.focus).on("blur" + w, y.search, p.event.search.blur).on("click" + w, y.text, p.event.text.focus), 
                        p.is.multiple() && C.on("click" + w, p.event.click)) : ("click" == g.on ? C.on("click" + w, p.event.test.toggle) : "hover" == g.on ? C.on("mouseenter" + w, p.delay.show).on("mouseleave" + w, p.delay.hide) : C.on(g.on + w, p.toggle), 
                        C.on("click" + w, y.icon, p.event.icon.click).on("mousedown" + w, p.event.mousedown).on("mouseup" + w, p.event.mouseup).on("focus" + w, p.event.focus), 
                        p.has.menuSearch() ? C.on("blur" + w, y.search, p.event.search.blur) : C.on("blur" + w, p.event.blur)), 
                        E.on("mouseenter" + w, y.item, p.event.item.mouseenter).on("mouseleave" + w, y.item, p.event.item.mouseleave).on("click" + w, y.item, p.event.item.click);
                    },
                    intent: function() {
                        p.verbose("Binding hide intent event to document"), U && q.on("touchstart" + o, p.event.test.touch).on("touchmove" + o, p.event.test.touch), 
                        q.on("click" + o, p.event.test.hide);
                    }
                },
                unbind: {
                    intent: function() {
                        p.verbose("Removing hide intent event from document"), U && q.off("touchstart" + o).off("touchmove" + o), 
                        q.off("click" + o);
                    }
                },
                filter: function(e) {
                    function t() {
                        p.is.multiple() && p.filterActive(), (e || !e && 0 == p.get.activeItem().length) && p.select.firstUnfiltered(), 
                        p.has.allResultsFiltered() ? g.onNoResults.call(P, n) ? g.allowAdditions ? g.hideAdditions && (p.verbose("User addition with no menu, setting empty style"), 
                        p.set.empty(), p.hideMenu()) : (p.verbose("All items filtered, showing message", n), 
                        p.add.message(c.noResults)) : (p.verbose("All items filtered, hiding dropdown", n), 
                        p.hideMenu()) : (p.remove.empty(), p.remove.message()), g.allowAdditions && p.add.userSuggestion(e), 
                        p.is.searchSelection() && p.can.show() && p.is.focusedOnSearch() && p.show();
                    }
                    var n = e !== G ? e : p.get.query();
                    g.useLabels && p.has.maxSelections() || (g.apiSettings ? p.can.useAPI() ? p.queryRemote(n, function() {
                        g.filterRemoteData && p.filterItems(n), t();
                    }) : p.error(h.noAPI) : (p.filterItems(n), t()));
                },
                queryRemote: function(e, n) {
                    var t = {
                        errorDuration: !1,
                        cache: "local",
                        throttle: g.throttle,
                        urlData: {
                            query: e
                        },
                        onError: function() {
                            p.add.message(c.serverError), n();
                        },
                        onFailure: function() {
                            p.add.message(c.serverError), n();
                        },
                        onSuccess: function(e) {
                            var t = e[l.remoteValues];
                            Q.isArray(t) && 0 < t.length ? (p.remove.message(), p.setup.menu({
                                values: e[l.remoteValues]
                            })) : p.add.message(c.noResults), n();
                        }
                    };
                    C.api("get request") || p.setup.api(), t = Q.extend(!0, {}, t, g.apiSettings), C.api("setting", t).api("query");
                },
                filterItems: function(e) {
                    var i = e !== G ? e : p.get.query(), o = null, t = p.escape.string(i), r = new RegExp("^" + t, "igm");
                    p.has.query() && (o = [], p.verbose("Searching for matching values", i), I.each(function() {
                        var e, t, n = Q(this);
                        if ("both" == g.match || "text" == g.match) {
                            if (-1 !== (e = String(p.get.choiceText(n, !1))).search(r)) return o.push(this), 
                            !0;
                            if ("exact" === g.fullTextSearch && p.exactSearch(i, e)) return o.push(this), !0;
                            if (!0 === g.fullTextSearch && p.fuzzySearch(i, e)) return o.push(this), !0;
                        }
                        if ("both" == g.match || "value" == g.match) {
                            if (-1 !== (t = String(p.get.choiceValue(n, e))).search(r)) return o.push(this), 
                            !0;
                            if ("exact" === g.fullTextSearch && p.exactSearch(i, t)) return o.push(this), !0;
                            if (!0 === g.fullTextSearch && p.fuzzySearch(i, t)) return o.push(this), !0;
                        }
                    })), p.debug("Showing only matched items", i), p.remove.filteredItem(), o && I.not(o).addClass(m.filtered);
                },
                fuzzySearch: function(e, t) {
                    var n = t.length, i = e.length;
                    if (e = e.toLowerCase(), t = t.toLowerCase(), n < i) return !1;
                    if (i === n) return e === t;
                    e: for (var o = 0, r = 0; o < i; o++) {
                        for (var s = e.charCodeAt(o); r < n; ) if (t.charCodeAt(r++) === s) continue e;
                        return !1;
                    }
                    return !0;
                },
                exactSearch: function(e, t) {
                    return e = e.toLowerCase(), -1 < (t = t.toLowerCase()).indexOf(e);
                },
                filterActive: function() {
                    g.useLabels && I.filter("." + m.active).addClass(m.filtered);
                },
                focusSearch: function(e) {
                    p.has.search() && !p.is.focusedOnSearch() && (e ? (C.off("focus" + w, y.search), 
                    k.focus(), C.on("focus" + w, y.search, p.event.search.focus)) : k.focus());
                },
                forceSelection: function() {
                    var e = I.not(m.filtered).filter("." + m.selected).eq(0), t = I.not(m.filtered).filter("." + m.active).eq(0), n = 0 < e.length ? e : t;
                    if (0 < n.length && !p.is.multiple()) return p.debug("Forcing partial selection to selected item", n), 
                    void p.event.item.click.call(n, {}, !0);
                    g.allowAdditions && p.set.selected(p.get.query()), p.remove.searchTerm();
                },
                change: {
                    values: function(e) {
                        g.allowAdditions || p.clear(), p.debug("Creating dropdown with specified values", e), 
                        p.setup.menu({
                            values: e
                        }), Q.each(e, function(e, t) {
                            if (1 == t.selected) return p.debug("Setting initial selection to", t.value), p.set.selected(t.value), 
                            !0;
                        });
                    }
                },
                event: {
                    change: function() {
                        F || (p.debug("Input changed, updating selection"), p.set.selected());
                    },
                    focus: function() {
                        g.showOnFocus && !$ && p.is.hidden() && !t && p.show();
                    },
                    blur: function(e) {
                        t = K.activeElement === this, $ || t || (p.remove.activeLabel(), p.hide());
                    },
                    mousedown: function() {
                        p.is.searchSelection() ? i = !0 : $ = !0;
                    },
                    mouseup: function() {
                        p.is.searchSelection() ? i = !1 : $ = !1;
                    },
                    click: function(e) {
                        Q(e.target).is(C) && (p.is.focusedOnSearch() ? p.show() : p.focusSearch());
                    },
                    search: {
                        focus: function() {
                            $ = !0, p.is.multiple() && p.remove.activeLabel(), g.showOnFocus && p.search();
                        },
                        blur: function(e) {
                            t = K.activeElement === this, p.is.searchSelection() && !i && (O || t || (g.forceSelection && p.forceSelection(), 
                            p.hide())), i = !1;
                        }
                    },
                    icon: {
                        click: function(e) {
                            A.hasClass(m.clear) ? p.clear() : p.can.click() && p.toggle();
                        }
                    },
                    text: {
                        focus: function(e) {
                            $ = !0, p.focusSearch();
                        }
                    },
                    input: function(e) {
                        (p.is.multiple() || p.is.searchSelection()) && p.set.filtered(), clearTimeout(p.timer), 
                        p.timer = setTimeout(p.search, g.delay.search);
                    },
                    label: {
                        click: function(e) {
                            var t = Q(this), n = C.find(y.label), i = n.filter("." + m.active), o = t.nextAll("." + m.active), r = t.prevAll("." + m.active), s = 0 < o.length ? t.nextUntil(o).add(i).add(t) : t.prevUntil(r).add(i).add(t);
                            e.shiftKey ? (i.removeClass(m.active), s.addClass(m.active)) : e.ctrlKey ? t.toggleClass(m.active) : (i.removeClass(m.active), 
                            t.addClass(m.active)), g.onLabelSelect.apply(this, n.filter("." + m.active));
                        }
                    },
                    remove: {
                        click: function() {
                            var e = Q(this).parent();
                            e.hasClass(m.active) ? p.remove.activeLabels() : p.remove.activeLabels(e);
                        }
                    },
                    test: {
                        toggle: function(e) {
                            var t = p.is.multiple() ? p.show : p.toggle;
                            p.is.bubbledLabelClick(e) || p.is.bubbledIconClick(e) || p.determine.eventOnElement(e, t) && e.preventDefault();
                        },
                        touch: function(e) {
                            p.determine.eventOnElement(e, function() {
                                "touchstart" == e.type ? p.timer = setTimeout(function() {
                                    p.hide();
                                }, g.delay.touch) : "touchmove" == e.type && clearTimeout(p.timer);
                            }), e.stopPropagation();
                        },
                        hide: function(e) {
                            p.determine.eventInModule(e, p.hide);
                        }
                    },
                    select: {
                        mutation: function(e) {
                            p.debug("<select> modified, recreating menu");
                            var n = !1;
                            Q.each(e, function(e, t) {
                                if (Q(t.target).is("select") || Q(t.addedNodes).is("select")) return n = !0;
                            }), n && (p.disconnect.selectObserver(), p.refresh(), p.setup.select(), p.set.selected(), 
                            p.observe.select());
                        }
                    },
                    menu: {
                        mutation: function(e) {
                            var t = e[0], n = t.addedNodes ? Q(t.addedNodes[0]) : Q(!1), i = t.removedNodes ? Q(t.removedNodes[0]) : Q(!1), o = n.add(i), r = o.is(y.addition) || 0 < o.closest(y.addition).length, s = o.is(y.message) || 0 < o.closest(y.message).length;
                            r || s ? (p.debug("Updating item selector cache"), p.refreshItems()) : (p.debug("Menu modified, updating selector cache"), 
                            p.refresh());
                        },
                        mousedown: function() {
                            O = !0;
                        },
                        mouseup: function() {
                            O = !1;
                        }
                    },
                    item: {
                        mouseenter: function(e) {
                            var t = Q(e.target), n = Q(this), i = n.children(y.menu), o = n.siblings(y.item).children(y.menu), r = 0 < i.length;
                            0 < i.find(t).length || !r || (clearTimeout(p.itemTimer), p.itemTimer = setTimeout(function() {
                                p.verbose("Showing sub-menu", i), Q.each(o, function() {
                                    p.animate.hide(!1, Q(this));
                                }), p.animate.show(!1, i);
                            }, g.delay.show), e.preventDefault());
                        },
                        mouseleave: function(e) {
                            var t = Q(this).children(y.menu);
                            0 < t.length && (clearTimeout(p.itemTimer), p.itemTimer = setTimeout(function() {
                                p.verbose("Hiding sub-menu", t), p.animate.hide(!1, t);
                            }, g.delay.hide));
                        },
                        click: function(e, t) {
                            var n = Q(this), i = Q(e ? e.target : ""), o = n.find(y.menu), r = p.get.choiceText(n), s = p.get.choiceValue(n, r), a = 0 < o.length, l = 0 < o.find(i).length;
                            p.has.menuSearch() && Q(K.activeElement).blur(), l || a && !g.allowCategorySelection || (p.is.searchSelection() && (g.allowAdditions && p.remove.userAddition(), 
                            p.remove.searchTerm(), p.is.focusedOnSearch() || 1 == t || p.focusSearch(!0)), g.useLabels || (p.remove.filteredItem(), 
                            p.set.scrollPosition(n)), p.determine.selectAction.call(this, r, s));
                        }
                    },
                    document: {
                        keydown: function(e) {
                            var t = e.which;
                            if (p.is.inObject(t, v)) {
                                var n = C.find(y.label), i = n.filter("." + m.active), o = (i.data(b.value), n.index(i)), r = n.length, s = 0 < i.length, a = 1 < i.length, l = 0 === o, c = o + 1 == r, u = p.is.searchSelection(), d = p.is.focusedOnSearch(), h = p.is.focused(), f = d && 0 === p.get.caretPosition();
                                if (u && !s && !d) return;
                                t == v.leftArrow ? !h && !f || s ? s && (e.shiftKey ? p.verbose("Adding previous label to selection") : (p.verbose("Selecting previous label"), 
                                n.removeClass(m.active)), l && !a ? i.addClass(m.active) : i.prev(y.siblingLabel).addClass(m.active).end(), 
                                e.preventDefault()) : (p.verbose("Selecting previous label"), n.last().addClass(m.active)) : t == v.rightArrow ? (h && !s && n.first().addClass(m.active), 
                                s && (e.shiftKey ? p.verbose("Adding next label to selection") : (p.verbose("Selecting next label"), 
                                n.removeClass(m.active)), c ? u ? d ? n.removeClass(m.active) : p.focusSearch() : a ? i.next(y.siblingLabel).addClass(m.active) : i.addClass(m.active) : i.next(y.siblingLabel).addClass(m.active), 
                                e.preventDefault())) : t == v.deleteKey || t == v.backspace ? s ? (p.verbose("Removing active labels"), 
                                c && u && !d && p.focusSearch(), i.last().next(y.siblingLabel).addClass(m.active), 
                                p.remove.activeLabels(i), e.preventDefault()) : f && !s && t == v.backspace && (p.verbose("Removing last label on input backspace"), 
                                i = n.last().addClass(m.active), p.remove.activeLabels(i)) : i.removeClass(m.active);
                            }
                        }
                    },
                    keydown: function(e) {
                        var t = e.which;
                        if (p.is.inObject(t, v)) {
                            var n, i = I.not(y.unselectable).filter("." + m.selected).eq(0), o = E.children("." + m.active).eq(0), r = 0 < i.length ? i : o, s = 0 < r.length ? r.siblings(":not(." + m.filtered + ")").addBack() : E.children(":not(." + m.filtered + ")"), a = r.children(y.menu), l = r.closest(y.menu), c = l.hasClass(m.visible) || l.hasClass(m.animating) || 0 < l.parent(y.menu).length, u = 0 < a.length, d = 0 < r.length, h = 0 < r.not(y.unselectable).length, f = t == v.delimiter && g.allowAdditions && p.is.multiple();
                            if (g.allowAdditions && g.hideAdditions && (t == v.enter || f) && h && (p.verbose("Selecting item from keyboard shortcut", r), 
                            p.event.item.click.call(r, e), p.is.searchSelection() && p.remove.searchTerm()), 
                            p.is.visible()) {
                                if (t != v.enter && !f || (t == v.enter && d && u && !g.allowCategorySelection ? (p.verbose("Pressed enter on unselectable category, opening sub menu"), 
                                t = v.rightArrow) : h && (p.verbose("Selecting item from keyboard shortcut", r), 
                                p.event.item.click.call(r, e), p.is.searchSelection() && p.remove.searchTerm()), 
                                e.preventDefault()), d && (t == v.leftArrow && l[0] !== E[0] && (p.verbose("Left key pressed, closing sub-menu"), 
                                p.animate.hide(!1, l), r.removeClass(m.selected), l.closest(y.item).addClass(m.selected), 
                                e.preventDefault()), t == v.rightArrow && u && (p.verbose("Right key pressed, opening sub-menu"), 
                                p.animate.show(!1, a), r.removeClass(m.selected), a.find(y.item).eq(0).addClass(m.selected), 
                                e.preventDefault())), t == v.upArrow) {
                                    if (n = d && c ? r.prevAll(y.item + ":not(" + y.unselectable + ")").eq(0) : I.eq(0), 
                                    s.index(n) < 0) return p.verbose("Up key pressed but reached top of current menu"), 
                                    void e.preventDefault();
                                    p.verbose("Up key pressed, changing active item"), r.removeClass(m.selected), n.addClass(m.selected), 
                                    p.set.scrollPosition(n), g.selectOnKeydown && p.is.single() && p.set.selectedItem(n), 
                                    e.preventDefault();
                                }
                                if (t == v.downArrow) {
                                    if (0 === (n = d && c ? n = r.nextAll(y.item + ":not(" + y.unselectable + ")").eq(0) : I.eq(0)).length) return p.verbose("Down key pressed but reached bottom of current menu"), 
                                    void e.preventDefault();
                                    p.verbose("Down key pressed, changing active item"), I.removeClass(m.selected), 
                                    n.addClass(m.selected), p.set.scrollPosition(n), g.selectOnKeydown && p.is.single() && p.set.selectedItem(n), 
                                    e.preventDefault();
                                }
                                t == v.pageUp && (p.scrollPage("up"), e.preventDefault()), t == v.pageDown && (p.scrollPage("down"), 
                                e.preventDefault()), t == v.escape && (p.verbose("Escape key pressed, closing dropdown"), 
                                p.hide());
                            } else f && e.preventDefault(), t != v.downArrow || p.is.visible() || (p.verbose("Down key pressed, showing dropdown"), 
                            p.show(), e.preventDefault());
                        } else p.has.search() || p.set.selectedLetter(String.fromCharCode(t));
                    }
                },
                trigger: {
                    change: function() {
                        var e = K.createEvent("HTMLEvents"), t = _[0];
                        t && (p.verbose("Triggering native change event"), e.initEvent("change", !0, !1), 
                        t.dispatchEvent(e));
                    }
                },
                determine: {
                    selectAction: function(e, t) {
                        p.verbose("Determining action", g.action), Q.isFunction(p.action[g.action]) ? (p.verbose("Triggering preset action", g.action, e, t), 
                        p.action[g.action].call(P, e, t, this)) : Q.isFunction(g.action) ? (p.verbose("Triggering user action", g.action, e, t), 
                        g.action.call(P, e, t, this)) : p.error(h.action, g.action);
                    },
                    eventInModule: function(e, t) {
                        var n = Q(e.target), i = 0 < n.closest(K.documentElement).length, o = 0 < n.closest(C).length;
                        return t = Q.isFunction(t) ? t : function() {}, i && !o ? (p.verbose("Triggering event", t), 
                        t(), !0) : (p.verbose("Event occurred in dropdown, canceling callback"), !1);
                    },
                    eventOnElement: function(e, t) {
                        var n = Q(e.target), i = n.closest(y.siblingLabel), o = K.body.contains(e.target), r = 0 === C.find(i).length, s = 0 === n.closest(E).length;
                        return t = Q.isFunction(t) ? t : function() {}, o && r && s ? (p.verbose("Triggering event", t), 
                        t(), !0) : (p.verbose("Event occurred in dropdown menu, canceling callback"), !1);
                    }
                },
                action: {
                    nothing: function() {},
                    activate: function(e, t, n) {
                        if (t = t !== G ? t : e, p.can.activate(Q(n))) {
                            if (p.set.selected(t, Q(n)), p.is.multiple() && !p.is.allFiltered()) return;
                            p.hideAndClear();
                        }
                    },
                    select: function(e, t, n) {
                        if (t = t !== G ? t : e, p.can.activate(Q(n))) {
                            if (p.set.value(t, e, Q(n)), p.is.multiple() && !p.is.allFiltered()) return;
                            p.hideAndClear();
                        }
                    },
                    combo: function(e, t, n) {
                        t = t !== G ? t : e, p.set.selected(t, Q(n)), p.hideAndClear();
                    },
                    hide: function(e, t, n) {
                        p.set.value(t, e, Q(n)), p.hideAndClear();
                    }
                },
                get: {
                    id: function() {
                        return r;
                    },
                    defaultText: function() {
                        return C.data(b.defaultText);
                    },
                    defaultValue: function() {
                        return C.data(b.defaultValue);
                    },
                    placeholderText: function() {
                        return "auto" != g.placeholder && "string" == typeof g.placeholder ? g.placeholder : C.data(b.placeholderText) || "";
                    },
                    text: function() {
                        return D.text();
                    },
                    query: function() {
                        return Q.trim(k.val());
                    },
                    searchWidth: function(e) {
                        return e = e !== G ? e : k.val(), S.text(e), Math.ceil(S.width() + 1);
                    },
                    selectionCount: function() {
                        var e = p.get.values();
                        return p.is.multiple() ? Q.isArray(e) ? e.length : 0 : "" !== p.get.value() ? 1 : 0;
                    },
                    transition: function(e) {
                        return "auto" == g.transition ? p.is.upward(e) ? "slide up" : "slide down" : g.transition;
                    },
                    userValues: function() {
                        var e = p.get.values();
                        return !!e && (e = Q.isArray(e) ? e : [ e ], Q.grep(e, function(e) {
                            return !1 === p.get.item(e);
                        }));
                    },
                    uniqueArray: function(n) {
                        return Q.grep(n, function(e, t) {
                            return Q.inArray(e, n) === t;
                        });
                    },
                    caretPosition: function() {
                        var e, t, n = k.get(0);
                        return "selectionStart" in n ? n.selectionStart : K.selection ? (n.focus(), t = (e = K.selection.createRange()).text.length, 
                        e.moveStart("character", -n.value.length), e.text.length - t) : void 0;
                    },
                    value: function() {
                        var e = 0 < _.length ? _.val() : C.data(b.value), t = Q.isArray(e) && 1 === e.length && "" === e[0];
                        return e === G || t ? "" : e;
                    },
                    values: function() {
                        var e = p.get.value();
                        return "" === e ? "" : !p.has.selectInput() && p.is.multiple() ? "string" == typeof e ? e.split(g.delimiter) : "" : e;
                    },
                    remoteValues: function() {
                        var e = p.get.values(), i = !1;
                        return e && ("string" == typeof e && (e = [ e ]), Q.each(e, function(e, t) {
                            var n = p.read.remoteData(t);
                            p.verbose("Restoring value from session data", n, t), n && ((i = i || {})[t] = n);
                        })), i;
                    },
                    choiceText: function(e, t) {
                        if (t = t !== G ? t : g.preserveHTML, e) return 0 < e.find(y.menu).length && (p.verbose("Retrieving text of element with sub-menu"), 
                        (e = e.clone()).find(y.menu).remove(), e.find(y.menuIcon).remove()), e.data(b.text) !== G ? e.data(b.text) : t ? Q.trim(e.html()) : Q.trim(e.text());
                    },
                    choiceValue: function(e, t) {
                        return t = t || p.get.choiceText(e), !!e && (e.data(b.value) !== G ? String(e.data(b.value)) : "string" == typeof t ? Q.trim(t.toLowerCase()) : String(t));
                    },
                    inputEvent: function() {
                        var e = k[0];
                        return !!e && (e.oninput !== G ? "input" : e.onpropertychange !== G ? "propertychange" : "keyup");
                    },
                    selectValues: function() {
                        var o = {
                            values: []
                        };
                        return C.find("option").each(function() {
                            var e = Q(this), t = e.html(), n = e.attr("disabled"), i = e.attr("value") !== G ? e.attr("value") : t;
                            "auto" === g.placeholder && "" === i ? o.placeholder = t : o.values.push({
                                name: t,
                                value: i,
                                disabled: n
                            });
                        }), g.placeholder && "auto" !== g.placeholder && (p.debug("Setting placeholder value to", g.placeholder), 
                        o.placeholder = g.placeholder), g.sortSelect ? (o.values.sort(function(e, t) {
                            return e.name > t.name ? 1 : -1;
                        }), p.debug("Retrieved and sorted values from select", o)) : p.debug("Retrieved values from select", o), 
                        o;
                    },
                    activeItem: function() {
                        return I.filter("." + m.active);
                    },
                    selectedItem: function() {
                        var e = I.not(y.unselectable).filter("." + m.selected);
                        return 0 < e.length ? e : I.eq(0);
                    },
                    itemWithAdditions: function(e) {
                        var t = p.get.item(e), n = p.create.userChoice(e);
                        return n && 0 < n.length && (t = 0 < t.length ? t.add(n) : n), t;
                    },
                    item: function(i, o) {
                        var e, r, s = !1;
                        return i = i !== G ? i : p.get.values() !== G ? p.get.values() : p.get.text(), e = r ? 0 < i.length : i !== G && null !== i, 
                        r = p.is.multiple() && Q.isArray(i), o = "" === i || 0 === i || (o || !1), e && I.each(function() {
                            var e = Q(this), t = p.get.choiceText(e), n = p.get.choiceValue(e, t);
                            if (null !== n && n !== G) if (r) -1 === Q.inArray(String(n), i) && -1 === Q.inArray(t, i) || (s = s ? s.add(e) : e); else if (o) {
                                if (p.verbose("Ambiguous dropdown value using strict type check", e, i), n === i || t === i) return s = e, 
                                !0;
                            } else if (String(n) == String(i) || t == i) return p.verbose("Found select item by value", n, i), 
                            s = e, !0;
                        }), s;
                    }
                },
                check: {
                    maxSelections: function(e) {
                        return !g.maxSelections || ((e = e !== G ? e : p.get.selectionCount()) >= g.maxSelections ? (p.debug("Maximum selection count reached"), 
                        g.useLabels && (I.addClass(m.filtered), p.add.message(c.maxSelections)), !0) : (p.verbose("No longer at maximum selection count"), 
                        p.remove.message(), p.remove.filteredItem(), p.is.searchSelection() && p.filterItems(), 
                        !1));
                    }
                },
                restore: {
                    defaults: function() {
                        p.clear(), p.restore.defaultText(), p.restore.defaultValue();
                    },
                    defaultText: function() {
                        var e = p.get.defaultText();
                        e === p.get.placeholderText ? (p.debug("Restoring default placeholder text", e), 
                        p.set.placeholderText(e)) : (p.debug("Restoring default text", e), p.set.text(e));
                    },
                    placeholderText: function() {
                        p.set.placeholderText();
                    },
                    defaultValue: function() {
                        var e = p.get.defaultValue();
                        e !== G && (p.debug("Restoring default value", e), "" !== e ? (p.set.value(e), p.set.selected()) : (p.remove.activeItem(), 
                        p.remove.selectedItem()));
                    },
                    labels: function() {
                        g.allowAdditions && (g.useLabels || (p.error(h.labels), g.useLabels = !0), p.debug("Restoring selected values"), 
                        p.create.userLabels()), p.check.maxSelections();
                    },
                    selected: function() {
                        p.restore.values(), p.is.multiple() ? (p.debug("Restoring previously selected values and labels"), 
                        p.restore.labels()) : p.debug("Restoring previously selected values");
                    },
                    values: function() {
                        p.set.initialLoad(), g.apiSettings && g.saveRemoteData && p.get.remoteValues() ? p.restore.remoteValues() : p.set.selected(), 
                        p.remove.initialLoad();
                    },
                    remoteValues: function() {
                        var e = p.get.remoteValues();
                        p.debug("Recreating selected from session data", e), e && (p.is.single() ? Q.each(e, function(e, t) {
                            p.set.text(t);
                        }) : Q.each(e, function(e, t) {
                            p.add.label(e, t);
                        }));
                    }
                },
                read: {
                    remoteData: function(e) {
                        var t;
                        if (X.Storage !== G) return (t = sessionStorage.getItem(e)) !== G && t;
                        p.error(h.noStorage);
                    }
                },
                save: {
                    defaults: function() {
                        p.save.defaultText(), p.save.placeholderText(), p.save.defaultValue();
                    },
                    defaultValue: function() {
                        var e = p.get.value();
                        p.verbose("Saving default value as", e), C.data(b.defaultValue, e);
                    },
                    defaultText: function() {
                        var e = p.get.text();
                        p.verbose("Saving default text as", e), C.data(b.defaultText, e);
                    },
                    placeholderText: function() {
                        var e;
                        !1 !== g.placeholder && D.hasClass(m.placeholder) && (e = p.get.text(), p.verbose("Saving placeholder text as", e), 
                        C.data(b.placeholderText, e));
                    },
                    remoteData: function(e, t) {
                        X.Storage !== G ? (p.verbose("Saving remote data to session storage", t, e), sessionStorage.setItem(t, e)) : p.error(h.noStorage);
                    }
                },
                clear: function() {
                    p.is.multiple() && g.useLabels ? p.remove.labels() : (p.remove.activeItem(), p.remove.selectedItem()), 
                    p.set.placeholderText(), p.clearValue();
                },
                clearValue: function() {
                    p.set.value("");
                },
                scrollPage: function(e, t) {
                    var n, i, o = t || p.get.selectedItem(), r = o.closest(y.menu), s = r.outerHeight(), a = r.scrollTop(), l = I.eq(0).outerHeight(), c = Math.floor(s / l), u = (r.prop("scrollHeight"), 
                    "up" == e ? a - l * c : a + l * c), d = I.not(y.unselectable);
                    i = "up" == e ? d.index(o) - c : d.index(o) + c, 0 < (n = ("up" == e ? 0 <= i : i < d.length) ? d.eq(i) : "up" == e ? d.first() : d.last()).length && (p.debug("Scrolling page", e, n), 
                    o.removeClass(m.selected), n.addClass(m.selected), g.selectOnKeydown && p.is.single() && p.set.selectedItem(n), 
                    r.scrollTop(u));
                },
                set: {
                    filtered: function() {
                        var e = p.is.multiple(), t = p.is.searchSelection(), n = e && t, i = t ? p.get.query() : "", o = "string" == typeof i && 0 < i.length, r = p.get.searchWidth(), s = "" !== i;
                        e && o && (p.verbose("Adjusting input width", r, g.glyphWidth), k.css("width", r)), 
                        o || n && s ? (p.verbose("Hiding placeholder text"), D.addClass(m.filtered)) : e && (!n || s) || (p.verbose("Showing placeholder text"), 
                        D.removeClass(m.filtered));
                    },
                    empty: function() {
                        C.addClass(m.empty);
                    },
                    loading: function() {
                        C.addClass(m.loading);
                    },
                    placeholderText: function(e) {
                        e = e || p.get.placeholderText(), p.debug("Setting placeholder text", e), p.set.text(e), 
                        D.addClass(m.placeholder);
                    },
                    tabbable: function() {
                        p.is.searchSelection() ? (p.debug("Added tabindex to searchable dropdown"), k.val("").attr("tabindex", 0), 
                        E.attr("tabindex", -1)) : (p.debug("Added tabindex to dropdown"), C.attr("tabindex") === G && (C.attr("tabindex", 0), 
                        E.attr("tabindex", -1)));
                    },
                    initialLoad: function() {
                        p.verbose("Setting initial load"), e = !0;
                    },
                    activeItem: function(e) {
                        g.allowAdditions && 0 < e.filter(y.addition).length ? e.addClass(m.filtered) : e.addClass(m.active);
                    },
                    partialSearch: function(e) {
                        var t = p.get.query().length;
                        k.val(e.substr(0, t));
                    },
                    scrollPosition: function(e, t) {
                        var n, i, o, r, s, a;
                        n = (e = e || p.get.selectedItem()).closest(y.menu), i = e && 0 < e.length, t = t !== G && t, 
                        e && 0 < n.length && i && (e.position().top, n.addClass(m.loading), o = (r = n.scrollTop()) - n.offset().top + e.offset().top, 
                        t || (a = r + n.height() < o + 5, s = o - 5 < r), p.debug("Scrolling to active item", o), 
                        (t || s || a) && n.scrollTop(o), n.removeClass(m.loading));
                    },
                    text: function(e) {
                        "select" !== g.action && ("combo" == g.action ? (p.debug("Changing combo button text", e, N), 
                        g.preserveHTML ? N.html(e) : N.text(e)) : (e !== p.get.placeholderText() && D.removeClass(m.placeholder), 
                        p.debug("Changing text", e, D), D.removeClass(m.filtered), g.preserveHTML ? D.html(e) : D.text(e)));
                    },
                    selectedItem: function(e) {
                        var t = p.get.choiceValue(e), n = p.get.choiceText(e, !1), i = p.get.choiceText(e, !0);
                        p.debug("Setting user selection to item", e), p.remove.activeItem(), p.set.partialSearch(n), 
                        p.set.activeItem(e), p.set.selected(t, e), p.set.text(i);
                    },
                    selectedLetter: function(e) {
                        var t, n = I.filter("." + m.selected), i = 0 < n.length && p.has.firstLetter(n, e), o = !1;
                        i && (t = n.nextAll(I).eq(0), p.has.firstLetter(t, e) && (o = t)), o || I.each(function() {
                            if (p.has.firstLetter(Q(this), e)) return o = Q(this), !1;
                        }), o && (p.verbose("Scrolling to next value with letter", e), p.set.scrollPosition(o), 
                        n.removeClass(m.selected), o.addClass(m.selected), g.selectOnKeydown && p.is.single() && p.set.selectedItem(o));
                    },
                    direction: function(e) {
                        "auto" == g.direction ? (p.remove.upward(), p.can.openDownward(e) ? p.remove.upward(e) : p.set.upward(e), 
                        p.is.leftward(e) || p.can.openRightward(e) || p.set.leftward(e)) : "upward" == g.direction && p.set.upward(e);
                    },
                    upward: function(e) {
                        (e || C).addClass(m.upward);
                    },
                    leftward: function(e) {
                        (e || E).addClass(m.leftward);
                    },
                    value: function(e, t, n) {
                        var i = p.escape.value(e), o = 0 < _.length, r = p.get.values(), s = e !== G ? String(e) : e;
                        if (o) {
                            if (!g.allowReselection && s == r && (p.verbose("Skipping value update already same value", e, r), 
                            !p.is.initialLoad())) return;
                            p.is.single() && p.has.selectInput() && p.can.extendSelect() && (p.debug("Adding user option", e), 
                            p.add.optionValue(e)), p.debug("Updating input value", i, r), F = !0, _.val(i), 
                            !1 === g.fireOnInit && p.is.initialLoad() ? p.debug("Input native change event ignored on initial load") : p.trigger.change(), 
                            F = !1;
                        } else p.verbose("Storing value in metadata", i, _), i !== r && C.data(b.value, s);
                        p.is.single() && g.clearable && (i ? p.set.clearable() : p.remove.clearable()), 
                        !1 === g.fireOnInit && p.is.initialLoad() ? p.verbose("No callback on initial load", g.onChange) : g.onChange.call(P, e, t, n);
                    },
                    active: function() {
                        C.addClass(m.active);
                    },
                    multiple: function() {
                        C.addClass(m.multiple);
                    },
                    visible: function() {
                        C.addClass(m.visible);
                    },
                    exactly: function(e, t) {
                        p.debug("Setting selected to exact values"), p.clear(), p.set.selected(e, t);
                    },
                    selected: function(e, a) {
                        var l = p.is.multiple();
                        (a = g.allowAdditions ? a || p.get.itemWithAdditions(e) : a || p.get.item(e)) && (p.debug("Setting selected menu item to", a), 
                        p.is.multiple() && p.remove.searchWidth(), p.is.single() ? (p.remove.activeItem(), 
                        p.remove.selectedItem()) : g.useLabels && p.remove.selectedItem(), a.each(function() {
                            var e = Q(this), t = p.get.choiceText(e), n = p.get.choiceValue(e, t), i = e.hasClass(m.filtered), o = e.hasClass(m.active), r = e.hasClass(m.addition), s = l && 1 == a.length;
                            l ? !o || r ? (g.apiSettings && g.saveRemoteData && p.save.remoteData(t, n), g.useLabels ? (p.add.label(n, t, s), 
                            p.add.value(n, t, e), p.set.activeItem(e), p.filterActive(), p.select.nextAvailable(a)) : (p.add.value(n, t, e), 
                            p.set.text(p.add.variables(c.count)), p.set.activeItem(e))) : i || (p.debug("Selected active value, removing label"), 
                            p.remove.selected(n)) : (g.apiSettings && g.saveRemoteData && p.save.remoteData(t, n), 
                            p.set.text(t), p.set.value(n, t, e), e.addClass(m.active).addClass(m.selected));
                        }));
                    },
                    clearable: function() {
                        A.addClass(m.clear);
                    }
                },
                add: {
                    label: function(e, t, n) {
                        var i, o = p.is.searchSelection() ? k : D, r = p.escape.value(e);
                        g.ignoreCase && (r = r.toLowerCase()), i = Q("<a />").addClass(m.label).attr("data-" + b.value, r).html(f.label(r, t)), 
                        i = g.onLabelCreate.call(i, r, t), p.has.label(e) ? p.debug("User selection already exists, skipping", r) : (g.label.variation && i.addClass(g.label.variation), 
                        !0 === n ? (p.debug("Animating in label", i), i.addClass(m.hidden).insertBefore(o).transition(g.label.transition, g.label.duration)) : (p.debug("Adding selection label", i), 
                        i.insertBefore(o)));
                    },
                    message: function(e) {
                        var t = E.children(y.message), n = g.templates.message(p.add.variables(e));
                        0 < t.length ? t.html(n) : t = Q("<div/>").html(n).addClass(m.message).appendTo(E);
                    },
                    optionValue: function(e) {
                        var t = p.escape.value(e);
                        0 < _.find('option[value="' + p.escape.string(t) + '"]').length || (p.disconnect.selectObserver(), 
                        p.is.single() && (p.verbose("Removing previous user addition"), _.find("option." + m.addition).remove()), 
                        Q("<option/>").prop("value", t).addClass(m.addition).html(e).appendTo(_), p.verbose("Adding user addition as an <option>", e), 
                        p.observe.select());
                    },
                    userSuggestion: function(e) {
                        var t, n = E.children(y.addition), i = p.get.item(e), o = i && i.not(y.addition).length, r = 0 < n.length;
                        g.useLabels && p.has.maxSelections() || ("" === e || o ? n.remove() : (r ? (n.data(b.value, e).data(b.text, e).attr("data-" + b.value, e).attr("data-" + b.text, e).removeClass(m.filtered), 
                        g.hideAdditions || (t = g.templates.addition(p.add.variables(c.addResult, e)), n.html(t)), 
                        p.verbose("Replacing user suggestion with new value", n)) : ((n = p.create.userChoice(e)).prependTo(E), 
                        p.verbose("Adding item choice to menu corresponding with user choice addition", n)), 
                        g.hideAdditions && !p.is.allFiltered() || n.addClass(m.selected).siblings().removeClass(m.selected), 
                        p.refreshItems()));
                    },
                    variables: function(e, t) {
                        var n, i, o = -1 !== e.search("{count}"), r = -1 !== e.search("{maxCount}"), s = -1 !== e.search("{term}");
                        return p.verbose("Adding templated variables to message", e), o && (n = p.get.selectionCount(), 
                        e = e.replace("{count}", n)), r && (n = p.get.selectionCount(), e = e.replace("{maxCount}", g.maxSelections)), 
                        s && (i = t || p.get.query(), e = e.replace("{term}", i)), e;
                    },
                    value: function(e, t, n) {
                        var i, o = p.get.values();
                        p.has.value(e) ? p.debug("Value already selected") : "" !== e ? (i = Q.isArray(o) ? (i = o.concat([ e ]), 
                        p.get.uniqueArray(i)) : [ e ], p.has.selectInput() ? p.can.extendSelect() && (p.debug("Adding value to select", e, i, _), 
                        p.add.optionValue(e)) : (i = i.join(g.delimiter), p.debug("Setting hidden input to delimited value", i, _)), 
                        !1 === g.fireOnInit && p.is.initialLoad() ? p.verbose("Skipping onadd callback on initial load", g.onAdd) : g.onAdd.call(P, e, t, n), 
                        p.set.value(i, e, t, n), p.check.maxSelections()) : p.debug("Cannot select blank values from multiselect");
                    }
                },
                remove: {
                    active: function() {
                        C.removeClass(m.active);
                    },
                    activeLabel: function() {
                        C.find(y.label).removeClass(m.active);
                    },
                    empty: function() {
                        C.removeClass(m.empty);
                    },
                    loading: function() {
                        C.removeClass(m.loading);
                    },
                    initialLoad: function() {
                        e = !1;
                    },
                    upward: function(e) {
                        (e || C).removeClass(m.upward);
                    },
                    leftward: function(e) {
                        (e || E).removeClass(m.leftward);
                    },
                    visible: function() {
                        C.removeClass(m.visible);
                    },
                    activeItem: function() {
                        I.removeClass(m.active);
                    },
                    filteredItem: function() {
                        g.useLabels && p.has.maxSelections() || (g.useLabels && p.is.multiple() ? I.not("." + m.active).removeClass(m.filtered) : I.removeClass(m.filtered), 
                        p.remove.empty());
                    },
                    optionValue: function(e) {
                        var t = p.escape.value(e), n = _.find('option[value="' + p.escape.string(t) + '"]');
                        0 < n.length && n.hasClass(m.addition) && (s && (s.disconnect(), p.verbose("Temporarily disconnecting mutation observer")), 
                        n.remove(), p.verbose("Removing user addition as an <option>", t), s && s.observe(_[0], {
                            childList: !0,
                            subtree: !0
                        }));
                    },
                    message: function() {
                        E.children(y.message).remove();
                    },
                    searchWidth: function() {
                        k.css("width", "");
                    },
                    searchTerm: function() {
                        p.verbose("Cleared search term"), k.val(""), p.set.filtered();
                    },
                    userAddition: function() {
                        I.filter(y.addition).remove();
                    },
                    selected: function(e, t) {
                        if (!(t = g.allowAdditions ? t || p.get.itemWithAdditions(e) : t || p.get.item(e))) return !1;
                        t.each(function() {
                            var e = Q(this), t = p.get.choiceText(e), n = p.get.choiceValue(e, t);
                            p.is.multiple() ? g.useLabels ? (p.remove.value(n, t, e), p.remove.label(n)) : (p.remove.value(n, t, e), 
                            0 === p.get.selectionCount() ? p.set.placeholderText() : p.set.text(p.add.variables(c.count))) : p.remove.value(n, t, e), 
                            e.removeClass(m.filtered).removeClass(m.active), g.useLabels && e.removeClass(m.selected);
                        });
                    },
                    selectedItem: function() {
                        I.removeClass(m.selected);
                    },
                    value: function(e, t, n) {
                        var i, o = p.get.values();
                        p.has.selectInput() ? (p.verbose("Input is <select> removing selected option", e), 
                        i = p.remove.arrayValue(e, o), p.remove.optionValue(e)) : (p.verbose("Removing from delimited values", e), 
                        i = (i = p.remove.arrayValue(e, o)).join(g.delimiter)), !1 === g.fireOnInit && p.is.initialLoad() ? p.verbose("No callback on initial load", g.onRemove) : g.onRemove.call(P, e, t, n), 
                        p.set.value(i, t, n), p.check.maxSelections();
                    },
                    arrayValue: function(t, e) {
                        return Q.isArray(e) || (e = [ e ]), e = Q.grep(e, function(e) {
                            return t != e;
                        }), p.verbose("Removed value from delimited string", t, e), e;
                    },
                    label: function(e, t) {
                        var n = C.find(y.label).filter("[data-" + b.value + '="' + p.escape.string(e) + '"]');
                        p.verbose("Removing label", n), n.remove();
                    },
                    activeLabels: function(e) {
                        e = e || C.find(y.label).filter("." + m.active), p.verbose("Removing active label selections", e), 
                        p.remove.labels(e);
                    },
                    labels: function(e) {
                        e = e || C.find(y.label), p.verbose("Removing labels", e), e.each(function() {
                            var e = Q(this), t = e.data(b.value), n = t !== G ? String(t) : t, i = p.is.userValue(n);
                            !1 !== g.onLabelRemove.call(e, t) ? (p.remove.message(), i ? (p.remove.value(n), 
                            p.remove.label(n)) : p.remove.selected(n)) : p.debug("Label remove callback cancelled removal");
                        });
                    },
                    tabbable: function() {
                        p.is.searchSelection() ? (p.debug("Searchable dropdown initialized"), k.removeAttr("tabindex")) : (p.debug("Simple selection dropdown initialized"), 
                        C.removeAttr("tabindex")), E.removeAttr("tabindex");
                    },
                    clearable: function() {
                        A.removeClass(m.clear);
                    }
                },
                has: {
                    menuSearch: function() {
                        return p.has.search() && 0 < k.closest(E).length;
                    },
                    search: function() {
                        return 0 < k.length;
                    },
                    sizer: function() {
                        return 0 < S.length;
                    },
                    selectInput: function() {
                        return _.is("select");
                    },
                    minCharacters: function(e) {
                        return !g.minCharacters || (e = e !== G ? String(e) : String(p.get.query())).length >= g.minCharacters;
                    },
                    firstLetter: function(e, t) {
                        var n;
                        return !(!e || 0 === e.length || "string" != typeof t) && (n = p.get.choiceText(e, !1), 
                        (t = t.toLowerCase()) == String(n).charAt(0).toLowerCase());
                    },
                    input: function() {
                        return 0 < _.length;
                    },
                    items: function() {
                        return 0 < I.length;
                    },
                    menu: function() {
                        return 0 < E.length;
                    },
                    message: function() {
                        return 0 !== E.children(y.message).length;
                    },
                    label: function(e) {
                        var t = p.escape.value(e), n = C.find(y.label);
                        return g.ignoreCase && (t = t.toLowerCase()), 0 < n.filter("[data-" + b.value + '="' + p.escape.string(t) + '"]').length;
                    },
                    maxSelections: function() {
                        return g.maxSelections && p.get.selectionCount() >= g.maxSelections;
                    },
                    allResultsFiltered: function() {
                        var e = I.not(y.addition);
                        return e.filter(y.unselectable).length === e.length;
                    },
                    userSuggestion: function() {
                        return 0 < E.children(y.addition).length;
                    },
                    query: function() {
                        return "" !== p.get.query();
                    },
                    value: function(e) {
                        return g.ignoreCase ? p.has.valueIgnoringCase(e) : p.has.valueMatchingCase(e);
                    },
                    valueMatchingCase: function(e) {
                        var t = p.get.values();
                        return !!(Q.isArray(t) ? t && -1 !== Q.inArray(e, t) : t == e);
                    },
                    valueIgnoringCase: function(n) {
                        var e = p.get.values(), i = !1;
                        return Q.isArray(e) || (e = [ e ]), Q.each(e, function(e, t) {
                            if (String(n).toLowerCase() == String(t).toLowerCase()) return !(i = !0);
                        }), i;
                    }
                },
                is: {
                    active: function() {
                        return C.hasClass(m.active);
                    },
                    animatingInward: function() {
                        return E.transition("is inward");
                    },
                    animatingOutward: function() {
                        return E.transition("is outward");
                    },
                    bubbledLabelClick: function(e) {
                        return Q(e.target).is("select, input") && 0 < C.closest("label").length;
                    },
                    bubbledIconClick: function(e) {
                        return 0 < Q(e.target).closest(A).length;
                    },
                    alreadySetup: function() {
                        return C.is("select") && C.parent(y.dropdown).data(x) !== G && 0 === C.prev().length;
                    },
                    animating: function(e) {
                        return e ? e.transition && e.transition("is animating") : E.transition && E.transition("is animating");
                    },
                    leftward: function(e) {
                        return (e || E).hasClass(m.leftward);
                    },
                    disabled: function() {
                        return C.hasClass(m.disabled);
                    },
                    focused: function() {
                        return K.activeElement === C[0];
                    },
                    focusedOnSearch: function() {
                        return K.activeElement === k[0];
                    },
                    allFiltered: function() {
                        return (p.is.multiple() || p.has.search()) && !(0 == g.hideAdditions && p.has.userSuggestion()) && !p.has.message() && p.has.allResultsFiltered();
                    },
                    hidden: function(e) {
                        return !p.is.visible(e);
                    },
                    initialLoad: function() {
                        return e;
                    },
                    inObject: function(n, e) {
                        var i = !1;
                        return Q.each(e, function(e, t) {
                            if (t == n) return i = !0;
                        }), i;
                    },
                    multiple: function() {
                        return C.hasClass(m.multiple);
                    },
                    remote: function() {
                        return g.apiSettings && p.can.useAPI();
                    },
                    single: function() {
                        return !p.is.multiple();
                    },
                    selectMutation: function(e) {
                        var n = !1;
                        return Q.each(e, function(e, t) {
                            if (t.target && Q(t.target).is("select")) return n = !0;
                        }), n;
                    },
                    search: function() {
                        return C.hasClass(m.search);
                    },
                    searchSelection: function() {
                        return p.has.search() && 1 === k.parent(y.dropdown).length;
                    },
                    selection: function() {
                        return C.hasClass(m.selection);
                    },
                    userValue: function(e) {
                        return -1 !== Q.inArray(e, p.get.userValues());
                    },
                    upward: function(e) {
                        return (e || C).hasClass(m.upward);
                    },
                    visible: function(e) {
                        return e ? e.hasClass(m.visible) : E.hasClass(m.visible);
                    },
                    verticallyScrollableContext: function() {
                        var e = T.get(0) !== X && T.css("overflow-y");
                        return "auto" == e || "scroll" == e;
                    },
                    horizontallyScrollableContext: function() {
                        var e = T.get(0) !== X && T.css("overflow-X");
                        return "auto" == e || "scroll" == e;
                    }
                },
                can: {
                    activate: function(e) {
                        return !!g.useLabels || (!p.has.maxSelections() || !(!p.has.maxSelections() || !e.hasClass(m.active)));
                    },
                    openDownward: function(e) {
                        var t, n, i = e || E, o = !0;
                        return i.addClass(m.loading), n = {
                            context: {
                                offset: T.get(0) === X ? {
                                    top: 0,
                                    left: 0
                                } : T.offset(),
                                scrollTop: T.scrollTop(),
                                height: T.outerHeight()
                            },
                            menu: {
                                offset: i.offset(),
                                height: i.outerHeight()
                            }
                        }, p.is.verticallyScrollableContext() && (n.menu.offset.top += n.context.scrollTop), 
                        o = (t = {
                            above: n.context.scrollTop <= n.menu.offset.top - n.context.offset.top - n.menu.height,
                            below: n.context.scrollTop + n.context.height >= n.menu.offset.top - n.context.offset.top + n.menu.height
                        }).below ? (p.verbose("Dropdown can fit in context downward", t), !0) : t.below || t.above ? (p.verbose("Dropdown cannot fit below, opening upward", t), 
                        !1) : (p.verbose("Dropdown cannot fit in either direction, favoring downward", t), 
                        !0), i.removeClass(m.loading), o;
                    },
                    openRightward: function(e) {
                        var t, n, i = e || E, o = !0;
                        return i.addClass(m.loading), n = {
                            context: {
                                offset: T.get(0) === X ? {
                                    top: 0,
                                    left: 0
                                } : T.offset(),
                                scrollLeft: T.scrollLeft(),
                                width: T.outerWidth()
                            },
                            menu: {
                                offset: i.offset(),
                                width: i.outerWidth()
                            }
                        }, p.is.horizontallyScrollableContext() && (n.menu.offset.left += n.context.scrollLeft), 
                        (t = n.menu.offset.left - n.context.offset.left + n.menu.width >= n.context.scrollLeft + n.context.width) && (p.verbose("Dropdown cannot fit in context rightward", t), 
                        o = !1), i.removeClass(m.loading), o;
                    },
                    click: function() {
                        return U || "click" == g.on;
                    },
                    extendSelect: function() {
                        return g.allowAdditions || g.apiSettings;
                    },
                    show: function() {
                        return !p.is.disabled() && (p.has.items() || p.has.message());
                    },
                    useAPI: function() {
                        return Q.fn.api !== G;
                    }
                },
                animate: {
                    show: function(e, t) {
                        var n, i = t || E, o = t ? function() {} : function() {
                            p.hideSubMenus(), p.hideOthers(), p.set.active();
                        };
                        e = Q.isFunction(e) ? e : function() {}, p.verbose("Doing menu show animation", i), 
                        p.set.direction(t), n = p.get.transition(t), p.is.selection() && p.set.scrollPosition(p.get.selectedItem(), !0), 
                        (p.is.hidden(i) || p.is.animating(i)) && ("none" == n ? (o(), i.transition("show"), 
                        e.call(P)) : Q.fn.transition !== G && C.transition("is supported") ? i.transition({
                            animation: n + " in",
                            debug: g.debug,
                            verbose: g.verbose,
                            duration: g.duration,
                            queue: !0,
                            onStart: o,
                            onComplete: function() {
                                e.call(P);
                            }
                        }) : p.error(h.noTransition, n));
                    },
                    hide: function(e, t) {
                        var n = t || E, i = (t ? g.duration : g.duration, t ? function() {} : function() {
                            p.can.click() && p.unbind.intent(), p.remove.active();
                        }), o = p.get.transition(t);
                        e = Q.isFunction(e) ? e : function() {}, (p.is.visible(n) || p.is.animating(n)) && (p.verbose("Doing menu hide animation", n), 
                        "none" == o ? (i(), n.transition("hide"), e.call(P)) : Q.fn.transition !== G && C.transition("is supported") ? n.transition({
                            animation: o + " out",
                            duration: g.duration,
                            debug: g.debug,
                            verbose: g.verbose,
                            queue: !1,
                            onStart: i,
                            onComplete: function() {
                                e.call(P);
                            }
                        }) : p.error(h.transition));
                    }
                },
                hideAndClear: function() {
                    p.remove.searchTerm(), p.has.maxSelections() || (p.has.search() ? p.hide(function() {
                        p.remove.filteredItem();
                    }) : p.hide());
                },
                delay: {
                    show: function() {
                        p.verbose("Delaying show event to ensure user intent"), clearTimeout(p.timer), p.timer = setTimeout(p.show, g.delay.show);
                    },
                    hide: function() {
                        p.verbose("Delaying hide event to ensure user intent"), clearTimeout(p.timer), p.timer = setTimeout(p.hide, g.delay.hide);
                    }
                },
                escape: {
                    value: function(e) {
                        var t = Q.isArray(e), n = "string" == typeof e, i = !n && !t, o = n && -1 !== e.search(d.quote), r = [];
                        return i || !o ? e : (p.debug("Encoding quote values for use in select", e), t ? (Q.each(e, function(e, t) {
                            r.push(t.replace(d.quote, "&quot;"));
                        }), r) : e.replace(d.quote, "&quot;"));
                    },
                    string: function(e) {
                        return (e = String(e)).replace(d.escape, "\\$&");
                    }
                },
                setting: function(e, t) {
                    if (p.debug("Changing setting", e, t), Q.isPlainObject(e)) Q.extend(!0, g, e); else {
                        if (t === G) return g[e];
                        Q.isPlainObject(g[e]) ? Q.extend(!0, g[e], t) : g[e] = t;
                    }
                },
                internal: function(e, t) {
                    if (Q.isPlainObject(e)) Q.extend(!0, p, e); else {
                        if (t === G) return p[e];
                        p[e] = t;
                    }
                },
                debug: function() {
                    !g.silent && g.debug && (g.performance ? p.performance.log(arguments) : (p.debug = Function.prototype.bind.call(console.info, console, g.name + ":"), 
                    p.debug.apply(console, arguments)));
                },
                verbose: function() {
                    !g.silent && g.verbose && g.debug && (g.performance ? p.performance.log(arguments) : (p.verbose = Function.prototype.bind.call(console.info, console, g.name + ":"), 
                    p.verbose.apply(console, arguments)));
                },
                error: function() {
                    g.silent || (p.error = Function.prototype.bind.call(console.error, console, g.name + ":"), 
                    p.error.apply(console, arguments));
                },
                performance: {
                    log: function(e) {
                        var t, n;
                        g.performance && (n = (t = new Date().getTime()) - (W || t), W = t, V.push({
                            Name: e[0],
                            Arguments: [].slice.call(e, 1) || "",
                            Element: P,
                            "Execution Time": n
                        })), clearTimeout(p.performance.timer), p.performance.timer = setTimeout(p.performance.display, 500);
                    },
                    display: function() {
                        var e = g.name + ":", n = 0;
                        W = !1, clearTimeout(p.performance.timer), Q.each(V, function(e, t) {
                            n += t["Execution Time"];
                        }), e += " " + n + "ms", H && (e += " '" + H + "'"), (console.group !== G || console.table !== G) && 0 < V.length && (console.groupCollapsed(e), 
                        console.table ? console.table(V) : Q.each(V, function(e, t) {
                            console.log(t.Name + ": " + t["Execution Time"] + "ms");
                        }), console.groupEnd()), V = [];
                    }
                },
                invoke: function(i, e, t) {
                    var o, r, n, s = M;
                    return e = e || Y, t = P || t, "string" == typeof i && s !== G && (i = i.split(/[\. ]/), 
                    o = i.length - 1, Q.each(i, function(e, t) {
                        var n = e != o ? t + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
                        if (Q.isPlainObject(s[n]) && e != o) s = s[n]; else {
                            if (s[n] !== G) return r = s[n], !1;
                            if (!Q.isPlainObject(s[t]) || e == o) return s[t] !== G ? r = s[t] : p.error(h.method, i), 
                            !1;
                            s = s[t];
                        }
                    })), Q.isFunction(r) ? n = r.apply(t, e) : r !== G && (n = r), Q.isArray(j) ? j.push(n) : j !== G ? j = [ j, n ] : n !== G && (j = n), 
                    r;
                }
            }, B ? (M === G && p.initialize(), p.invoke(z)) : (M !== G && M.invoke("destroy"), 
            p.initialize());
        }), j !== G ? j : R;
    }, Q.fn.dropdown.settings = {
        silent: !1,
        debug: !1,
        verbose: !1,
        performance: !0,
        on: "click",
        action: "activate",
        values: !1,
        clearable: !1,
        apiSettings: !1,
        selectOnKeydown: !0,
        minCharacters: 0,
        filterRemoteData: !1,
        saveRemoteData: !0,
        throttle: 200,
        context: X,
        direction: "auto",
        keepOnScreen: !0,
        match: "both",
        fullTextSearch: !1,
        placeholder: "auto",
        preserveHTML: !0,
        sortSelect: !1,
        forceSelection: !0,
        allowAdditions: !1,
        ignoreCase: !1,
        hideAdditions: !0,
        maxSelections: !1,
        useLabels: !0,
        delimiter: ",",
        showOnFocus: !0,
        allowReselection: !1,
        allowTab: !0,
        allowCategorySelection: !1,
        fireOnInit: !1,
        transition: "auto",
        duration: 200,
        glyphWidth: 1.037,
        label: {
            transition: "scale",
            duration: 200,
            variation: !1
        },
        delay: {
            hide: 300,
            show: 200,
            search: 20,
            touch: 50
        },
        onChange: function(e, t, n) {},
        onAdd: function(e, t, n) {},
        onRemove: function(e, t, n) {},
        onLabelSelect: function(e) {},
        onLabelCreate: function(e, t) {
            return Q(this);
        },
        onLabelRemove: function(e) {
            return !0;
        },
        onNoResults: function(e) {
            return !0;
        },
        onShow: function() {},
        onHide: function() {},
        name: "Dropdown",
        namespace: "dropdown",
        message: {
            addResult: "Add <b>{term}</b>",
            count: "{count} selected",
            maxSelections: "Max {maxCount} selections",
            noResults: "No results found.",
            serverError: "There was an error contacting the server"
        },
        error: {
            action: "You called a dropdown action that was not defined",
            alreadySetup: "Once a select has been initialized behaviors must be called on the created ui dropdown",
            labels: "Allowing user additions currently requires the use of labels.",
            missingMultiple: "<select> requires multiple property to be set to correctly preserve multiple values",
            method: "The method you called is not defined.",
            noAPI: "The API module is required to load resources remotely",
            noStorage: "Saving remote data requires session storage",
            noTransition: "This module requires ui transitions <https://github.com/Semantic-Org/UI-Transition>"
        },
        regExp: {
            escape: /[-[\]{}()*+?.,\\^$|#\s]/g,
            quote: /"/g
        },
        metadata: {
            defaultText: "defaultText",
            defaultValue: "defaultValue",
            placeholderText: "placeholder",
            text: "text",
            value: "value"
        },
        fields: {
            remoteValues: "results",
            values: "values",
            disabled: "disabled",
            name: "name",
            value: "value",
            text: "text"
        },
        keys: {
            backspace: 8,
            delimiter: 188,
            deleteKey: 46,
            enter: 13,
            escape: 27,
            pageUp: 33,
            pageDown: 34,
            leftArrow: 37,
            upArrow: 38,
            rightArrow: 39,
            downArrow: 40
        },
        selector: {
            addition: ".addition",
            dropdown: ".ui.dropdown",
            hidden: ".hidden",
            icon: "> .dropdown.icon",
            input: '> input[type="hidden"], > select',
            item: ".item",
            label: "> .label",
            remove: "> .label > .delete.icon",
            siblingLabel: ".label",
            menu: ".menu",
            message: ".message",
            menuIcon: ".dropdown.icon",
            search: "input.search, .menu > .search > input, .menu input.search",
            sizer: "> input.sizer",
            text: "> .text:not(.icon)",
            unselectable: ".disabled, .filtered"
        },
        className: {
            active: "active",
            addition: "addition",
            animating: "animating",
            clear: "clear",
            disabled: "disabled",
            empty: "empty",
            dropdown: "ui dropdown",
            filtered: "filtered",
            hidden: "hidden transition",
            item: "item",
            label: "ui label",
            loading: "loading",
            menu: "menu",
            message: "message",
            multiple: "multiple",
            placeholder: "default",
            sizer: "sizer",
            search: "search",
            selected: "selected",
            selection: "selection",
            upward: "upward",
            leftward: "left",
            visible: "visible"
        }
    }, Q.fn.dropdown.settings.templates = {
        dropdown: function(e) {
            var t = e.placeholder || !1, n = (e.values, "");
            return n += '<i class="dropdown icon"></i>', e.placeholder ? n += '<div class="default text">' + t + "</div>" : n += '<div class="text"></div>', 
            n += '<div class="menu">', Q.each(e.values, function(e, t) {
                n += t.disabled ? '<div class="disabled item" data-value="' + t.value + '">' + t.name + "</div>" : '<div class="item" data-value="' + t.value + '">' + t.name + "</div>";
            }), n += "</div>";
        },
        menu: function(e, o) {
            var t = e[o.values] || {}, r = "";
            return Q.each(t, function(e, t) {
                var n = t[o.text] ? 'data-text="' + t[o.text] + '"' : "", i = t[o.disabled] ? "disabled " : "";
                r += '<div class="' + i + 'item" data-value="' + t[o.value] + '"' + n + ">", r += t[o.name], 
                r += "</div>";
            }), r;
        },
        label: function(e, t) {
            return t + '<i class="delete icon"></i>';
        },
        message: function(e) {
            return e;
        },
        addition: function(e) {
            return e;
        }
    };
}(jQuery, window, document), $(document).ready(function() {
    $(".ui.dropdown").dropdown({
        ignoreCase: !0,
        match: "text",
        fullTextSearch: !0
    }), function() {
        var e = $("#buldSenderSend");
        if (0 !== e.length) {
            var s = $("#buldSenderRecipients"), a = $("#buldSenderTable"), l = e.data("endpoint");
            e.click(function() {
                var e = s.val().split("\n"), t = [];
                for (var n in e) {
                    var i = $("<td>Čeká…</td>"), o = {
                        email: e[n],
                        statusField: i,
                        row: $("<tr><td>" + e[n] + "</td></tr>").append(i)
                    };
                    t.push(o), o.row.appendTo(a);
                }
                var r = function() {
                    var e = t.shift();
                    void 0 !== e && (e.statusField.text("Zpracovávám…"), fetch(function(e) {
                        return l.replace(encodeURIComponent("{{recipient}}"), encodeURIComponent(e));
                    }(e.email)).then(function() {
                        e.statusField.text("Hotovo"), setTimeout(r, 500);
                    }));
                };
                r();
            });
        }
    }();
});